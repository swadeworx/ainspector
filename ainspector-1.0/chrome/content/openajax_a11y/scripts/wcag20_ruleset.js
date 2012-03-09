/*
 * Copyright 2011-2012 OpenAjax Alliance
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
/*                       Rulesets                                   */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rulesets
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Information on the rulesets available for evauating documents 
 *
 * @property  {Array}   rulesets - Associative array of rulesets  
 */

OpenAjax.a11y.Rulesets = function() {

  this.rulesets = [];
  
};

/**
 * @method addRuleset
 *
 * @memberOf OpenAjax.a11y.Rulesets
 *
 * @desc Adds a localized version of WCAG 2.0 requirements to the cache 
 *
 * @param  {string}  type        - Type of ruleset (WCAG 2.0 ruleset is the only type currently supported)  
 * @param  {Object}  rulesetdata - JSON object containing the ruleset information
 */

OpenAjax.a11y.Rulesets.prototype.addRuleset = function(type, ruleset_data) {

  switch (type) {
  
  case 'WCAG20':
    var rs = new OpenAjax.a11y.WCAG20Ruleset(ruleset_data);
    
    if (rs)
      this.rulesets.push(rs);
    else
      OpenAjax.a11y.console("  ** Error loading ruleset: " + ruleset_data[id]);
    break;
    
  default:
    OpenAjax.a11y.console("  ** Rule set type: '" + type + "' not supported");
    break;
  }

};

/**
 * @method getRuleset
 *
 * @memberOf OpenAjax.a11y.Rulesets
 *
 * @desc Gets a ruleset with the specified ID  
 *
 * @param  {string}  ruleset_id  - Ruleset id of the ruleset to return
 */

OpenAjax.a11y.Rulesets.prototype.getRuleset = function(ruleset_id) {

  var i;
  
  for (i = 0; i < this.rulesets.length; i++ ) {
     if (this.rulesets[i].id === ruleset_id) return this.rulesets[i]; 
  }

  return null;
};

/**
 * @method getAllRulesets
 *
 * @memberOf OpenAjax.a11y.Rulesets
 *
 * @desc Gets NLS ruleset information for all rulesets  
 *
 * @returns  {Array}  ruleset_id  - Array of objects that contain NLS information about a ruleset
 */

OpenAjax.a11y.Rulesets.prototype.getAllRulesets = function() {

  var i;
  var rulesets = [];
  var ruleset;
  var o;
  
  for (i = 0; i < this.rulesets.length; i++) {
  
    ruleset = this.rulesets[i];
      
    o = new Object();
  
    o.ruleset_id      = ruleset.id;
    o.ruleset_version = ruleset.ruleset_version;

    o.ruleset_title   = ruleset.ruleset_title;
    
    o.ruleset_description = ruleset.ruleset_description;            

    o.author_name = ruleset.ruleset_author_name;
    o.author_url = ruleset.ruleset_author_url;

    rulesets.push(o);
  }

  return rulesets;
};



/* ---------------------------------------------------------------- */
/*                       WCAG20Ruleset                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20Ruleset
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {Object} ruleset_data  -  JSON object representing rule mapping
 *
 * NOTE: The following properties are defined when the ruleset is loaded
 *
 * @property {String} type                 - String representing the type of ruleset (i.e. WCAG20)          
 * @property {String} id                   - id of the ruleset           
 * @property {String} ruleset_title        - NLS localized title of the ruleset           
 * @property {String} ruleset_description  - Description of the ruleset         
 * @property {String} ruleset_author_name  - Name of the author(s) or organization         
 * @property {String} ruleset_author_url   - URL to the author(s) or organization       
 * @property {String} ruleset_updated      - Last time the ruleset was updated     
 * @property {Number} number_of_rules      - number of rules in the rule set
 *
 * @property {WCAG20RulesetPrinciple} ruleset_principles  - Array of WCAG 2.0 ruleset principle objects          
 *
 * NOTE: The following properties are defined after each evaluation
 *
 * @property {String} title  - The title of the last document evaluated
 * @property {String} url    - The url of the last document evaluated
 *
 * @property {Object} doc         - Reference to browser document object model (DOM) that holds the document to be analyzed
 * @property {Object} wcag20_nls  - Reference to WCAG 2.0 NLS object for current language
 * @property {Object} log         - Reference to Log object
 * @property {Object} dom_cache   - Reference to DOMCache object
 * @property {Object} result      - Reference to WCAG20Result object
 *
 * @example
 *
 * function updateProgess(message, percent) {
 *
 *  .....
 *
 * }
 *
 * var url   = window.location.href;
 * var title = window.title;
 * var doc   = window.document;
 *
 * var ruleset = OpenAjax.a11y.all_rulesets.getRuleset('WCAG20_TRANS');
 * var result  = ruleset.evaluate(url, title, doc, updateProgress, true);
 *
 */
 
OpenAjax.a11y.WCAG20Ruleset = function (ruleset_data) {

  var  p_id,  rp_data,  rp_new;  // variables for creating RulesetPrinciple objects
  var  g_id,  rg_data,  rg_new;  // variables for creating RulesetGuideline objects
  var sc_id, rsc_data, rsc_new;  // variables for creating RulesetSuccessCriterion objects
  var  r_id,  rr_data,  rr_new;  // variables for creating RulesetRule objects
 
  this.type = "WCAG20";
  this.ruleset_title = {};

  // Check for ruleset id

  if (ruleset_data['id']) {
    this.id  = ruleset_data['id'];
    OpenAjax.a11y.console("Loading ruleset with the id: " + this.id);
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing id");
    return null;
  }

  // Check for ruleset version

  if (ruleset_data['version']) {
    this.ruleset_version  = ruleset_data['version'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing version");
    return null;
  }

  // Check for default and localized ruleset title

  if (ruleset_data.title && ruleset_data.title['default']) {
    this.ruleset_title = ruleset_data.title['default'];
    
    // get localized name for ruleset
    
    if (ruleset_data.title[OpenAjax.a11y.locale]) {
      this.ruleset_title = ruleset_data.title[OpenAjax.a11y.locale];
    }
    
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing default title");
    return null;
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing last updated date, set to null");
    this.ruleset_updated  = "0000-00-00";
  }

  // Check for default and localized ruleset descriptions

  if (ruleset_data.description && ruleset_data.description['default']) {
    this.ruleset_description = ruleset_data.description['default'];
    
    // get localized name for ruleset
    
    if (ruleset_data.description[OpenAjax.a11y.locale]) {
      this.ruleset_description = ruleset_data.description[OpenAjax.a11y.locale];
    }
    
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing default description");
    this.ruleset_description = "no description";
  }

  // Check for default and localized ruleset descriptions

  if (ruleset_data.author && ruleset_data.author.name) {
    this.ruleset_author_name = ruleset_data.author.name;
    if (ruleset_data.author.url) this.ruleset_author_url = ruleset_data.author.url;
    else this.ruleset_author_url = "no author url";    
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing author information");
    this.ruleset_author_name = "no author";
    this.ruleset_author_url  = "no author url";
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing last updated date, set to null");
    this.ruleset_updated  = "0000-00-00";
  }


  this.number_of_rules   = 0;

  this.ruleset_principles = [];
  
  if (!ruleset_data.principles) { 
    OpenAjax.a11y.console("  ** Principle references are missing");
    return null;
  } 
  else {
  
    for (p_id in ruleset_data.principles) {
    
//      OpenAjax.a11y.console("== Processing Principle: " + p_id );
 
      rp_data = ruleset_data.principles[p_id];
 
      if (rp_data.guidelines) {
      
        if (typeof rp_data.enabled === 'boolean')
          rp_new = new OpenAjax.a11y.WCAG20RulesetPrinciple(p_id, rp_data.enabled);
        else  
          rp_new = new OpenAjax.a11y.WCAG20RulesetPrinciple(p_id, true);

        for (g_id in rp_data.guidelines) {

 //        OpenAjax.a11y.console("==== Processing Guideline: " + g_id );

          rg_data = rp_data.guidelines[g_id];
 
          if (rg_data.success_criteria) {
      
            if (typeof rg_data.enabled == 'boolean')
              rg_new = new OpenAjax.a11y.WCAG20RulesetGuideline(g_id, rg_data.enabled);
            else  
              rg_new = new OpenAjax.a11y.WCAG20RulesetGuideline(g_id, true);
              
            for (sc_id in rg_data.success_criteria) {

//              OpenAjax.a11y.console("====== Processing Success Criteria: " + sc_id );

              sc_data = rg_data.success_criteria[sc_id];
 
              if (sc_data.rules) {
      
                if (typeof rg_data.enabled === 'boolean')
                  rsc_new = new OpenAjax.a11y.WCAG20RulesetSuccessCriterion(sc_id, rg_data.enabled);
                else  
                  rsc_new = new OpenAjax.a11y.WCAG20RulesetSuccessCriterion(sc_id, true);
                  
                for (r_id in sc_data.rules) {
                
//                  OpenAjax.a11y.console("======== Processing Rule: " + r_id );
              
                  rr_data = sc_data.rules[r_id];
                  
                  if (typeof rr_data.type     === 'number' && 
                      typeof rr_data.priority === 'number' && 
                      typeof rr_data.status   === 'number' ) {

                    if (typeof rr_data.enabled === 'boolean')
                      rr_new = new OpenAjax.a11y.WCAG20RulesetRule(r_id, rr_data.type, rr_data.priority, rr_data.status, rr_data.enabled);
                    else  
                      rr_new = new OpenAjax.a11y.WCAG20RulesetRule(r_id, rr_data.type, rr_data.priority, rr_data.status, true);
  
                    rsc_new.addRulesetRule(rr_new);  
                    
                    this.number_of_rules++;
                     
                  }
                  else {
                    OpenAjax.a11y.console("      type: " + rr_data.type);
                    OpenAjax.a11y.console("  priority: " + rr_data.priority);
                    OpenAjax.a11y.console("    status: " + rr_data.status);
                    OpenAjax.a11y.console("        ** Ruleset rule " + r_id + " is missing one of the required properties: type, priority, status");              
                  }
        
                } // end loop
                
                rg_new.addRulesetSuccessCriterion(rsc_new);
                
              }    
              else {
                OpenAjaax.a11y.console("      ** Ruleset Success Criterion " + sc_id + " is missing rules property");
              }
          
            } // end loop
              
            rp_new.addRulesetGuideline(rg_new);
                
          }    
          else {
            OpenAjaax.a11y.console("    ** Ruleset Guideline " + g_id + " is missing success criteria property");
          }
          
        } // end loop

        this.ruleset_principles.push(rp_new);

      }
      else {
        OpenAjaax.a11y.console("  ** Ruleset Principle " + p_id + " is missing guidelines property");
      }
      
    } // end loop
    
  } 
  
  // local references to current NLS information, based on current locale setting
  
  this.wcag20_nls  = OpenAjax.a11y.all_wcag20_nls.getNLS();      
  
  // References related to evaluating a document
  // Initial values are null, properties are set with the "newResource' method
  
  this.title = "";
  this.url   = "";
  
  this.doc       = null;
  this.log       = null;
  this.dom_cache = null;        
  this.result    = null; 
  
  return this;

};

/**
 * @method setEvaluationLevel
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Enable and disable rules based on the WCAG level 
 *
 * @param  {Number}    level   - Level to success criteria to test
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.setEvaluationLevel = function (level) {

  var i, j, k;
  
  var rp;
  var rg;
  var rsc;
  
  for (i = 0; i < this.ruleset_principles.length; i++) {
  
    rp = this.ruleset_principles[i];
    
    for (j = 0; j < rp.ruleset_guidelines.length; j++ ) {
      
      rg = rp.ruleset_guidelines[j];
      
      for (k = 0; k < rg.ruleset_success_criteria.length; k++) {
        rsc = rg.ruleset_success_criteria[k];
        
        if (rsc.level <= level) {
          rsc.enabled = true;
        }
        else {
          rsc.enabled = false;        
        }
      }
    }
  }
};

/**
 * @method setBrokenLinkTesting
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Enable and disable the cache from testing for broken urls 
 *
 * @param  {Boolean}  broken_links   - If true enables cache to test for broken links
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.setBrokenLinkTesting = function (broken_links) {
  
  OpenAjax.a11y.URL_TESTING_ENABLED = broken_links;
  
};

/**
 * @method evaluate
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Evaluate a document using the OpenAjax ruleset and return an evaluation object 
 *
 * @param  {String}    url                     url of document being analyzed    
 * @param  {String}    title                   Title of document being analyzed    
 * @param  {Object}    doc                     Browser document object model (DOM) to be evaluated    
 * @param  {Function}  progessCallBackFunction Function will be called periodically to provide progress information 
 *
 * @param {Boolean} build_cache When true will build all cache in one tranversal of the DOMElements cache, when false specialized caches will be built when they are need by a rule
 *
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.evaluate = function (url, title, doc, progessCallBackFunction, build_cache) {
      
    var i, j, k, l;
    var rp, rps, rps_len;     // Varaibles associated with WCAG20RulesetPrinciples
    var rg, rgs, rgs_len;     // Varaibles associated with WCAG20RulesetGuidelines
    var rsc, rscs, rscs_len;  // Varaibles associated with WCAG20RulesetSuccessCriteria
    
    var ruleset_rule, rule;  // Varaibles associated with WCAG20RulesetRule, Rule, ResultRule
    
    var principle_result, guideline_result, success_criterion_result, rule_result; 
    
    var up_to_date;
    
    var PROGRESS = OpenAjax.a11y.PROGRESS;

    this.doc   = doc;
    this.title = title;
    this.url   = url;
  
//    OpenAjax.a11y.console("Starting evaluation: " + this.id + " " + this.default_name + " " + this.number_of_rules + " rules" );
  
    this.log = new OpenAjax.a11y.Log(this.id, this.default_name, this.number_of_rules, progessCallBackFunction);

//    OpenAjax.a11y.console(this.log);

    this.dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, this.log);      

    this.result = new OpenAjax.a11y.WCAG20Result(this, url, title); 

    this.dom_cache.updateDOMElementCache();
    if (build_cache) { 
      this.dom_cache.updateAllCaches();
    }  
  
    rps     = this.ruleset_principles;
    rps_len = this.ruleset_principles.length;

    for (i = 0; i < rps_len; i++) {
    
      rp = rps[i];
    
      principle_result = new OpenAjax.a11y.WCAG20ResultPrinciple(rps[i]);
      this.result.addPrincipleResult(principle_result);
    
      if (rp && rp.enabled) {

        rgs     = rp.ruleset_guidelines;
        rgs_len = rp.ruleset_guidelines.length;

        for (j = 0; j < rgs_len; j++) {

          rg = rgs[j];
      
          guideline_result = new OpenAjax.a11y.WCAG20ResultGuideline(rgs[j]);
          principle_result.addGuidelineResult(guideline_result);
    
          if (rg && rg.enabled) {

            rscs     = rg.ruleset_success_criteria;
            rscs_len = rg.ruleset_success_criteria.length;
            
            for (k = 0; k < rscs_len; k ++ ) {
            
              rsc = rscs[k];
      
              success_criterion_result = new OpenAjax.a11y.WCAG20ResultSuccessCriterion(rsc);
              guideline_result.addSuccessCriterionResult(success_criterion_result);
              
              this.log.update(PROGRESS.REQUIREMENT, rsc.id, rsc.id);
        
              if (rsc && rsc.enabled) {

                ruleset_rules      = rsc.ruleset_rules;
                ruleset_rules_len  = ruleset_rules.length;
            
                for (l = 0; l < ruleset_rules_len; l ++ ) {
            
                   ruleset_rule = ruleset_rules[l];
                   
                   rule = ruleset_rule.rule;

                   if (rule && ruleset_rule.enabled) {

                     rule_result = new OpenAjax.a11y.ResultRule(ruleset_rule, success_criterion_result); 
           
                     // Check to see if the specialized cache needed for the rule is already 
                     // If not create the specialized cache
                     
                     if (!build_cache ) {
                       up_to_date = this.dom_cache.isUpToDate(rule.cache_dependency);
                       if (up_to_date.exists) {
                         if(!up_to_date.up_to_date) this.dom_cache.updateCache(rule.cache_dependency);
                       } else {
                         this.log.update(PROGRESS.RULE, "Cache " + rule.cache_dependency + " for rule with id=" + rule.rule_id +  " does not exist.");        
                       }
                     } 
                     
                     if (rule.language.length) {
                       if (rule.language.indexOf(OpenAjax.a11y.locale) >= 0) {
                         rule.validate(this.dom_cache, rule_result );
                       }
                       else {
                         this.log.update(PROGRESS.RULE, "Rule with id='" + rule.rule_id + "' does not apply to locale: " + OpenAjax.a11y.locale);                           
                       }
                     }
                     else {
                       // Rules without any language restrictions
                       rule.validate( this.dom_cache, rule_result );
                     }  

                     var rule_title  = rule.getTitle(ruleset_rule.type);
                     
//                     OpenAjax.a11y.console("Validating rule: " + rule.rule_id + "  " + rule_title);

                     this.log.update(PROGRESS.RULE, rule_title, rule.rule_id);
                     
                     if (rule.cache_dependency && this.dom_cache[rule.cache_dependency]) {
                       this.dom_cache[rule.cache_dependency].rule_summary_results.addRuleResult(rule_result);
                     }

                     success_criterion_result.rule_summary_results.addRuleResult(rule_result);
                     guideline_result.rule_summary_results.addRuleResult(rule_result);
                     principle_result.rule_summary_results.addRuleResult(rule_result);
                     this.result.rule_summary_results.addRuleResult(rule_result);
                     
                     switch (rsc.level) {
                     
                     case 'LEVEL_A':
                       this.result.rule_a_summary_results.addRuleResult(rule_result);
                       break;
                     
                     case 'LEVEL_AA':
                       this.result.rule_aa_summary_results.addRuleResult(rule_result);
                       break;
                     
                     case 'LEVEL_AAA':
                       this.result.rule_aaa_summary_results.addRuleResult(rule_result);
                       break;
                       
                     default:
                       break;
                       
                     } // end switch

                   }
                   else {
                     if (rule) 
                       this.log.update(PROGRESS.RULE, " ** Rule with id=" + rule.rule_id + " is disabled");       
                     else
                       this.log.update(PROGRESS.RULE, " ** Rule for success criteria " + rsc.id + " is undefined");                            
                   }

        
                } // end rule loop
              } 
              else {
                this.log.update(PROGRESS.RULE, " ** Success Criterion " + rsc.id + " is disabled");       
              }
            } // end success criteria loop 
          }
          else {
            this.log.update(PROGRESS.RULE, " ** Guideline " + rg.id + " is disabled");       
          }
        } // end guideline loop
      }  
      else {
        this.log.update(PROGRESS.RULE, " ** Principle " + rp.id + " is disabled");       
      }
    } // end principle loop
    
    this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
    return this;
};

/**
 * @method isSameDocument
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Determines is a window document property is the one for this evaluation 
 *
 * @param {Documemnt object} document - Window document to test
 */
 
 OpenAjax.a11y.WCAG20Ruleset.prototype.isSameDocument = function (document) {
    
    return this.doc === document;
    
 };
 



/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetPrinciple                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @param    {Boolean} enabled    - Initial value for the enabled property
 *
 * @property {Boolean} enabled            - If true the rules associated with this principle should be evaluated
 * @property {Array}   ruleset_guidelines - Array of WCAG20RulesetGuideline objects
 */
 
OpenAjax.a11y.WCAG20RulesetPrinciple = function (id, enabled) {
 
   this.id = id;
   
   this.enabled = enabled;
   
   this.ruleset_guidelines = [];

};

/**
 * @method addRulesetGuideline
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetPrinciple
 *
 * @param    {WCAG20RulesetGuideline}  guideline - WCAG 2.0 ruleset guideline object to add
 */
 
OpenAjax.a11y.WCAG20RulesetPrinciple.prototype.addRulesetGuideline = function (guideline) {
 
  this.ruleset_guidelines.push(guideline);
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetGuideline                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @param    {Boolean} enabled    - Initial value for the enabled property
 *
 * @property {Boolean} enabled                   - If true the rules associated with this guideline should be evaluated
 * @property {Array}   ruleset_success_criteria  - Array of WCAG20RulesetSuccessCriteria objects
 */
 
OpenAjax.a11y.WCAG20RulesetGuideline = function (id, enabled) {
 
   this.id = id;
   
   this.enabled = enabled;
   
   this.ruleset_success_criteria = [];

};

/**
 * @method addRulesetSuccessCriterion
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetGuideline
 *
 * @param    {WCAG20RulesetSuccessCriteron}  success_criterion - WCAG 2.0 ruleset success criterion object to add
 */
 
OpenAjax.a11y.WCAG20RulesetGuideline.prototype.addRulesetSuccessCriterion = function (success_criterion) {
 
  this.ruleset_success_criteria.push(success_criterion);
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetSuccessCriterion              */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetSuccessCriterion
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   id       - id of the success criterion
 * @param  {Boolean}  enabled  - Initial value for the enabled property
 *
 * @property {String}   id       - id of the success criterion
 * @property {Boolean}  enabled  - If true the rules associated with this success criterion should be evaluated
 * @property {Array}    rules    - Array of rule objects
 */
 
OpenAjax.a11y.WCAG20RulesetSuccessCriterion = function (id, enabled) {
 
   var wcag20_nls = OpenAjax.a11y.all_wcag20_nls;
 
   this.id  = id;
   
   this.level = wcag20_nls.getNLSItemById(id).level;
   
   this.enabled = enabled;
   this.ruleset_rules = [];

};

/**
 * @method addRulesetRule
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetSuccessCriterion
 *
 * @param  {WCAG20RulesetRule}  ruleset_rule  
 */
 
OpenAjax.a11y.WCAG20RulesetSuccessCriterion.prototype.addRulesetRule = function (ruleset_rule) {
 
  if (ruleset_rule) {
    this.ruleset_rules.push(ruleset_rule);
  }
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetRule                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetRule
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   id        - id of the rule
 * @param  {Number}   severity  - Severity of the rule (NOTE: typically VIOLATION or RECOMMENDATION)
 * @param  {Number}   priority  - Relative priority of this rule compared to other rules for this success criterion
 * @param  {status}   status    - Status of this rule (i.e. accepted, experimential, deprecated)
 * @param  {Boolean}  enabled   - Initial value for the enabled property
 *
 * @param     {String}   rule_id   - id of the rule
 * @property  {Rule}     rule      - Rule object
 * @property  {Number}   severity  - Severity of the rule (NOTE: typically VIOLATION or RECOMMENDATION)
 * @property  {Number}   priority  - Relative priority of this rule compared to other rules for this success criterion
 * @property  {status}   status    - Status of this rule (i.e. accepted, experimential, deprecated)
 * @property  {Boolean}  enabled   - Initial value for the enabled property
 */
 
OpenAjax.a11y.WCAG20RulesetRule = function (id, type, priority, status, enabled) {

   var r = OpenAjax.a11y.all_rules.getRuleByRuleId(id);
   
   this.rule     = null;
   this.rule_id  = id;
   this.type     = type;
   this.prioirty = priority;
   this.status   = status;
   this.enabled  = enabled;

   if (r) 
     this.rule  = r;
   else  
     OpenAjax.a11y.console("  ** Rule with rule id='" + id + "' does not exist!");

};



