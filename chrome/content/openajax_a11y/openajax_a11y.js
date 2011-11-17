/**
 * Copyright 2011 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* ---------------------------------------------------------------- */
/*                   OpenAjax High Level APIs                       */ 
/* ---------------------------------------------------------------- */

(function () {

  /**
  * OpenAjax.a11y.console
  *
  * @desc
  * 
  * @param message 
  */
  
  OpenAjax.a11y.console = function (message) {
    if (OpenAjax.a11y.CONSOLE_MESSAGES) {
      var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
      console.logStringMessage(message);
    }   
  };  
  
  /* ---------------------------------------------------------------- */
  /*               Private functions and variables                    */ 
  /* ---------------------------------------------------------------- */
   
  /*
   * varaibles mapping of rule id of a registered rule to that rule
   */
  var private_rule_mapping = {};
    
  /*
   * registered rulesets, keyed by ruleset id
  */
  var private_rulesets = {};
      
  /*
   * NLS mapping
  */
  var private_nls = {};
  var REQUIRED_RULE_PROPERITES     = ['id', 'cacheDependency', 'validate'];
  var REQUIRED_RULESET_PROPERITES  = ['id', 'nameCode', 'requirements'];
  var REQUIRED_NLS_PROPERITES      = ['name', 'requirements', 'rules', 'severities'];    

  /* ---------------------------------------------------------------- */
  /*           Begin definition of OpenAjax.a11y object               */ 
  /* ---------------------------------------------------------------- */
       
  // basic info about version of ruleset and rules
  OpenAjax.a11y.name = "OpenAjax Alliance Accessibility Tools Task Force";
  OpenAjax.a11y.version = "2.0.0";
  OpenAjax.a11y.baseUri = "http://www.openajax.org/member/wiki/Accessibility";
    
  /**
  * OpenAjax.a11y.satisfiesInterface
  *
  * @desc tests whether or not the given object contains the specified   
  *
  * list of required properties
  * @param obj object to be tested
  * @param requiredProps list of required properties
  *
  * @return true if object contains required properties, false otherwise
  *
  * @private
  */
  OpenAjax.a11y.satisfiesInterface = function (obj, required_props) {
    
    var satisfied = true;
    
    for (var p = 0; satisfied && p < required_props.length; ++p) {
      satisfied = !!(obj[required_props[p]]);
    } // end loop
    return satisfied;
  };
    
  /**
  * add an array of rules. Each rule object in the array
  * must implement the rule object interface:
  *  
  * - id: a unique id for the rule
  * - validate: function(context) that is responsible for executing rule logic and that returns a ValidationResult object
  * 
  * 
  * @param rules array of rule objects to be added
  */
  OpenAjax.a11y.addRules = function (rules) {
    OpenAjax.a11y.console( "Adding rules...  ");
    if (!rules || !rules.length) {
      return;
    }
      
    var rules_num = rules.length;
     
    for (var i = 0; i < rules_num; ++i) {
      var rule = rules[i];
      if (OpenAjax.a11y.satisfiesInterface(rule, REQUIRED_RULE_PROPERITES) && 
          typeof private_rule_mapping[rule.id] == "undefined") {
          private_rule_mapping[rule.id] = rule;
      } // interface not satisfied
      else {
        alert('Note to developer - Rule: ' + rule.id + ' could not be added; duplicate ID -OR- missing required properties: ' + REQUIRED_RULE_PROPERITES.toString());
      }
    } // next rule
  };
        
  /**
  * get a rule by its specified rule id, which was registered
  * via addRules
  * 
  * @param ruleId id of desired rule
  * @return rule or null if no rule matches the given id
  */
  OpenAjax.a11y.getRule = function (rule_id) {
    if (!private_rule_mapping[rule_id]) return null;
    return private_rule_mapping[rule_id];
  };
  /**
  * add a ruleset. Each ruleset object
  * must implement the ruleset object interface=
  * 
  * - id: a unique id for the ruleset
  * - nameCode: a localizable key for a human-readable label or name for the ruleset
  * - rules: an associative array keyed by rule ids that defines additional properties 
  * for rules in the ruleset
  * 
  * @param ruleset to be added
  */
  OpenAjax.a11y.addRuleset = function (ruleset) {
    OpenAjax.a11y.console( "Adding ruleset: " + ruleset.id );
    if (ruleset && 
        OpenAjax.a11y.satisfiesInterface(ruleset, REQUIRED_RULESET_PROPERITES) && 
        typeof private_rulesets[ruleset.id] == "undefined") {
      private_rulesets[ruleset.id] = ruleset;
    } else {
      alert('Note to developer - Ruleset: ' + ruleset.id + ' could not be added; duplicate ID -OR- missing required properties: ' + REQUIRED_RULESET_PROPERITES.toString());
    } // endif
  };
    
  /**
  * get a ruleset by id
  * 
  * @param id of desired ruleset
  * @return ruleset with desired id or null
  */
  OpenAjax.a11y.getRuleset = function (rulesetId) {
    if (!private_rulesets[rulesetId]) null;
    
    return private_rulesets[rulesetId];
  };
    
  /**
  * get all registered rulesets as an associative array, keyed by ruleset id
  * 
  * @return id -> ruleset map
  * @see addRuleset
  */
  OpenAjax.a11y.getAllRulesets = function () {
    return private_rulesets;
  };
  /**
  * get number of rules in a rulset
  * 
  * @return number of rules
  * 
  */
  OpenAjax.a11y.getNumberOfRules = function (ruleset) {
    var count = 0;
    var rule_id;
        
    if ( ruleset ) {
      var requirements_num = ruleset.requirements.length;
      for (var i = 0; i < requirements_num; i++ ) {
        for (rule_id in ruleset.requirements[i].rules) {
          count++;
        } // end loop
      } // end loop
    }
    return count;
  };
    
    
  /**
  * add an NLS layer for the specified ruleset. NLS support for a ruleset must contain
  * at least the following properties:
  * 
  * - name: localized name for the ruleset
  * - severities: localized severity levels for the ruleset with defined severity 
  * levels being given by the OAA rules requirements wiki.
  * - requirements: an associative array for each requirement in the ruleset, 
  * keyed by the 'criterionNumber' property of each requirement object in the ruleset. Each entry must contain
  * the property 'label' (a label for the criterionNumber) and may contain the optional properties 'level' 
  * and 'description'.
  * - rules: associative array keyed by ruleIds for each rule in the ruleset and the
  * value of which is an object which must contain the 'message' property (the localized message for that rule) 
  * and optionally may contain a 'label' property (a human-readable label for identifying the rule).
  * 
  * For an example, see nls/wcag20-ruleset_en-us.js. 
  * 
  * @param rulesetId id of ruleset for which NLS is being defined
  * @param locale - locale for which NLS is being defined
  *
  */
  OpenAjax.a11y.addNLSForRuleset = function (rulesetId, locale, nls) {
    OpenAjax.a11y.console( "Adding NLS with id: " + rulesetId + "(" + locale + ")" );
    if (nls && 
        locale && 
        this.satisfiesInterface(nls, REQUIRED_NLS_PROPERITES) && 
        (typeof private_nls[rulesetId] == "undefined" || typeof private_nls[rulesetId][locale] == "undefined")) {          
      var ok = true;
      for (var key in nls.requirements) {
        if (!nls.requirements[key].label) {
          ok = false;
          OpenAjax.a11y.console( key + ": LABEL missing in NLS!" );
          break;
        }
      } // end loop
        
      if (ok) {
        private_nls[rulesetId] = nls[rulesetId] || {};
        private_nls[rulesetId][locale] = nls;
      }
    } 
  };
    
  /**
  * get the native language support for a given ruleset and locale
  * 
  * @param rulesetId - id of ruleset for which NLS is desired
  * @param locale - locale for which support is desired
  * @returns NLS for ruleset with the given id and locale or null if not found
  * @see addNLSForRuleset
  */
  OpenAjax.a11y.getNLSForRuleset = function (rulesetId, locale) {
    return private_nls[rulesetId] ? private_nls[rulesetId][locale] : null;
  };
        
  if (OpenAjax && OpenAjax.hub) {
    OpenAjax.hub.registerLibrary(this.name, this.baseUri, this.version);
  }
    
})();
/**
*
* OpenAjax.a11y.RulesetEvaluation
*
* @desc Constructor function for a ruleset evaluation 
* 
* @param ruleset_id              String    ruleset id to be used in evaluation
* @param language                String    language used to evaluate the document (note: some rules are language dependent)    
* @param url                     String    url of document being analyzed    
* @param title                   String    title of document being analyzed    
* @param doc                     Object    w3c document object to be evaluated    
* @param progessCallBackFunction Function  Call periodically to provie evaluation progress information 
*
*/
OpenAjax.a11y.RulesetEvaluation = function (ruleset_id, language, url, title, doc, callback) {
 
  this.ruleset_id = ruleset_id;
  this.language   = language;
  this.doc = doc;
  this.title = title;
  this.url = url;
  
  var ruleset_nls = OpenAjax.a11y.getNLSForRuleset(ruleset_id, language);      
  this.ruleset_nls = ruleset_nls;      
  
  var ruleset = OpenAjax.a11y.getRuleset(ruleset_id);
  this.ruleset = ruleset;  
  
  var number_of_rules_in_ruleset = OpenAjax.a11y.getNumberOfRules(ruleset);
  this.number_of_rules_in_ruleset = number_of_rules_in_ruleset;
  
  var log = new OpenAjax.a11y.Log(ruleset_id, ruleset_nls['name'], number_of_rules_in_ruleset, callback);
  this.log = log;
   
  var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, language, log);      
  this.dom_cache = dom_cache;
  
  this.ruleset_result = new OpenAjax.a11y.results.RulesetEvaluationResult(ruleset_id, ruleset_nls['name'], ruleset.rulesetUrl, url, title); 
};
 
 
/**
*
* OpenAjax.a11y.RulesetEvaluation
*
* @desc Evaluate a document using the openajax ruleset and return an evaluation object 
*
* @param build_cache Boolean  When true will build all cache in one tranversal of the DOMElements cache
*                             When false specialized caches will be built when they are need by a rule
*
*/
OpenAjax.a11y.RulesetEvaluation.prototype.evaluate = function (build_cache) {
      
  var i;
  var rule_id;  
  var PROGRESS = OpenAjax.a11y.PROGRESS;
  
  this.dom_cache.updateDOMElementCache();
  if (build_cache) { 
     this.dom_cache.updateAllCaches();
  }  
  
  var requirements_length = this.ruleset.requirements.length;
  for (i=0; i<requirements_length; i++) {
   
    var req = this.ruleset.requirements[i];
     
    var req_num      = req.requirementNumber;
    var req_level_id = req.requirementLevel;
    var req_url      = req.requirementURL;
    var req_enabled  = req.enabled;
    
    var req_label   = this.ruleset_nls.requirements[req_num].label;
    var req_desc    = this.ruleset_nls.requirements[req_num].description;
    var req_level   = this.ruleset_nls.levels[req_level_id];
    
    var requirement_result = new OpenAjax.a11y.results.RequirementResult(req_num, req_label, req_desc, req_level, req_url, req_enabled);
    
    this.log.update(PROGRESS.REQUIREMENT, req_label, req_num);
    for (rule_id in req.rules) {       
      var rule = OpenAjax.a11y.getRule(rule_id);      
      if (rule) {
        if (rule.enabled && req_enabled) {
          var rule_severity = req.rules[rule_id].severityCode;        
          var rule_priority = req.rules[rule_id].priorityCode;
          var rule_enabled  = req.rules[rule_id].enabled;
          var rule_status   = req.rules[rule_id].status;
          
          var rule_title    = this.ruleset_nls.rules[rule_id].TITLE;
        
          var rule_result = new OpenAjax.a11y.results.RuleResult(rule_id, rule_title, rule_severity, rule_priority, rule_enabled); 
          if (!build_cache ) {
            var utd = this.dom_cache.isUpToDate(rule.cacheDependency);
            if (utd.exists) {
              if(!utd.up_to_date) this.dom_cache.updateCache(rule.cacheDependency);
            } else {
              this.log.update(PROGRESS.RULE, "Cache " + rulecacheDepedency + " for rule with id=" + rule_id +  " does not exist.");        
            }
          }   
          if (rule.language.length) {
            if (rule.language.indexOf(this.language) >= 0) {
              rule.validate( this.dom_cache, rule_result );
            }            
          }
          else {
            // If empty rule is for all languages
            rule.validate( this.dom_cache, rule_result );
          }  
                
          requirement_result.addRuleResult( rule_result );
        
          this.log.update(PROGRESS.RULE, rule_title, rule_id);
        }
        else {
          this.log.update(PROGRESS.RULE, "Rule with id=" + rule_id + " is disabled");        
        }
      }
      else {
        this.log.update(PROGRESS.RULE, "Rule with id=" + rule_id + " does not exist");        
      }
    } // end loop
    
    this.ruleset_result.addRequirementResult(requirement_result);
  } // end loop
  this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
  return this;
};
