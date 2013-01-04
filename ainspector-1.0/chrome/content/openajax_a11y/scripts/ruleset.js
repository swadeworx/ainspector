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
    var rs = new OpenAjax.a11y.Ruleset(ruleset_data);
    
    if (rs)
      this.rulesets.push(rs);
    else
      OpenAjax.a11y.logger.debug("  ** Error loading ruleset: " + ruleset_data[id]);
    break;
    
  default:
    OpenAjax.a11y.logger.debug("  ** Rule set type: '" + type + "' not supported");
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
     if (this.rulesets[i].ruleset_id === ruleset_id) return this.rulesets[i]; 
  }

  // if ruleset_id is not defined, return the first ruleset, if it is defined
  if (this.rulesets[0]) return this.rulesets[0];
  
  return null;
};

/**
 * @method getAllRulesets
 *
 * @memberOf OpenAjax.a11y.Rulesets
 *
 * @desc Gets NLS ruleset information for all rulesets  
 *
 * @returns  {Array} Array of objects that contain NLS information about a ruleset
 */

OpenAjax.a11y.Rulesets.prototype.getAllRulesets = function() {

  var rulesets = [];
  
  for (var i = 0; i < this.rulesets.length; i++) {  
    rulesets.push(this.rulesets[i]);
  }

  return rulesets;
};



/* ---------------------------------------------------------------- */
/*                       Ruleset                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor Ruleset
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {Object} ruleset_data  -  JSON object representing rule mapping
 *
 * NOTE: The following properties are defined when the ruleset is loaded
 *
 * @property {String} type                 - String representing the type of ruleset (i.e. WCAG20)          
 * @property {String} ruleset_id           - id of the ruleset           
 * @property {String} ruleset_title        - NLS localized title of the ruleset           
 * @property {String} ruleset_description  - Description of the ruleset         
 * @property {String} ruleset_author_name  - Name of the author(s) or organization         
 * @property {String} ruleset_author_url   - URL to the author(s) or organization       
 * @property {String} ruleset_updated      - Last time the ruleset was updated     
 * @property {Number} number_of_rules      - number of rules in the rule set
 *
 * @property {Array}  rule_mappings - Array of WCAG20RuleMapping objects          
 *
 * @property {Number}   wcag20_level                      - Level of WCAG 2.0 Success Criteria to evaluate (i.e. A, AA, AAA)
 * @property {Boolean}  recommended_rules_enabled  - If true recommended rules are evaluated
 *
 * NOTE: The following properties are defined after each evaluation
 *
 * @property {String} title  - The title of the last document evaluated
 * @property {String} url    - The url of the last document evaluated
 * @property {String} date   - Date of the evaluation
 *
 * @property {Object} doc          - Reference to browser document object model (DOM) that holds the document to be analyzed
 * @property {Object} wcag20_nls   - Reference to WCAG 2.0 NLS object for current language
 * @property {Object} log          - Reference to Log object
 * @property {Object} dom_cache    - Reference to DOMCache object
 *
 * @property {Array}  rule_results          - Array of rule results 
 * @property {Object} wcag20_results        - Reference to WCAG20Results object
 * @property {Object} rule_category_results - Reference to WCAG20Results object
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
 
OpenAjax.a11y.Ruleset = function (ruleset_data) {

  var i;
 
  this.type = "WCAG20";
  this.ruleset_title = {};
  
  this.ruleset_id      = ruleset_data['ruleset_id'];
  this.ruleset_version = ruleset_data['version'];
  this.wcag20_level    = OpenAjax.a11y.WCAG20_LEVEL.AA;
  
  this.recommended_rules_enabled = true;

  this.rule_results = [];

  // Check for ruleset id

  if (ruleset_data['ruleset_id']) {
    this.ruleset_id  = ruleset_data['ruleset_id'];
    OpenAjax.a11y.logger.debug("Loading ruleset with the id: " + this.ruleset_id);
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing id");
    return null;
  }

  // Check for ruleset version

  if (ruleset_data['version']) {
    this.ruleset_version  = ruleset_data['version'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing version");
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
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing default title");
    return null;
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing last updated date, set to null");
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
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing default description");
    this.ruleset_description = "no description";
  }

  // Check for default and localized ruleset descriptions

  if (ruleset_data.author && ruleset_data.author.name) {
    this.ruleset_author_name = ruleset_data.author.name;
    if (ruleset_data.author.url) this.ruleset_author_url = ruleset_data.author.url;
    else this.ruleset_author_url = "no author url";    
//    OpenAjax.a11y.logger.debug("  Ruleset Author: " + this.ruleset_author_name);
//    OpenAjax.a11y.logger.debug("  Ruleset URL: " + this.ruleset_author_url);
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing author information");
    this.ruleset_author_name = "no author";
    this.ruleset_author_url  = "no author url";
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing last updated date, set to null");
    this.ruleset_updated  = "0000-00-00";
  }


  this.number_of_rules   = 0;

  this.rule_mappings = [];

  var rule_mappings_from_data = ruleset_data['rule_mappings'];
  
  var rm_new;

  if (rule_mappings_from_data) {

    for (var rule_id in rule_mappings_from_data) {
  
      var rule_mapping = rule_mappings_from_data[rule_id];
  
      if (typeof rule_mapping.type === 'number') {
    
        if (typeof rule_mapping.enabled === 'boolean')
          rm_new = new OpenAjax.a11y.WCAG20RuleMapping(rule_id, rule_mapping.type, rule_mapping.enabled);
        else  
          rm_new = new OpenAjax.a11y.WCAG20RuleMapping(rule_id, rule_mapping.type, true);
      
        if (rm_new && rm_new.rule) {
          this.rule_mappings.push(rm_new);
      
          this.number_of_rules++;
          
//          OpenAjax.a11y.logger.debug("  Rule " + rule_id + " has been added");              
        }
      } 
      else {
        OpenAjax.a11y.logger.debug("        ** Ruleset rule " + rule_id + " is missing 'type' property");              
      }    
    } // end loop
  }
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " does not have any rules");
  }
  
  // local references to current NLS information, based on current locale setting
  
  this.wcag20_nls = OpenAjax.a11y.all_wcag20_nls.getNLS();      
  
  // References related to evaluating a document
  // Initial values are null, properties are set with the "newResource' method
  
  this.eval_title = "";
  this.eval_url   = "";
  this.eval_date  = "n/a";
  this.eval_time  = "n/a";
  
  this.doc       = null;
  this.log       = null;
  this.dom_cache = null;        
  this.wcag20_results    = null; 
  
  return this;

};

/**
 * @method setEvaluationLevel
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Enable and disable rules based on the WCAG level 
 *
 * @param  {Number}    level   - Level to success criteria to test
 */
 
OpenAjax.a11y.Ruleset.prototype.setEvaluationLevel = function (level) {

  this.wcag20_level = level;
  
};

/**
 * @method setRecommendedRulesEnabled
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Enable and disable evaluation of recommeneded rules 
 *
 * @param  {Boolean}    enabled   - True to evaluate recommended rules, False if not to evaluated recommeneded rules
 */
 
OpenAjax.a11y.Ruleset.prototype.setRecommendedRulesEnabled = function (enabled) {

  this.recommended_rules_enabled = enabled;
  
};
/**
 * @method setBrokenLinkTesting
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Enable and disable the cache from testing for broken urls 
 *
 * @param  {Boolean}  broken_links   - If true enables cache to test for broken links
 */
 
OpenAjax.a11y.Ruleset.prototype.setBrokenLinkTesting = function (broken_links) {
  
  OpenAjax.a11y.URL_TESTING_ENABLED = broken_links;
  
};

/**
 * @method setDataTableAssumption
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Enable and disable the cache from testing for broken urls 
 *
 * @param  {Boolean}  assumption   - If false asssumes tables are used for layout unless header cells or other indicator of a data table is found
 */
 
OpenAjax.a11y.Ruleset.prototype.setDataTableAssumption = function (assumption) {
  
  OpenAjax.a11y.DATA_TABLE_ASSUMPTION = assumption;
  
};

/**
 * @method evaluate
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Evaluate a document using the OpenAjax ruleset and return an evaluation object 
 *
 * @param  {String}    url     - url of document being analyzed    
 * @param  {String}    title   - Title of document being analyzed    
 * @param  {Object}    doc     - Browser document object model (DOM) to be evaluated    
 *
 * @param  {Function}  progessCallBackFunction Function will be called periodically to provide progress information 
 *
 * @param {Boolean} build_cache When true will build all cache in one tranversal of the DOMElements cache, when false specialized caches will be built when they are need by a rule
 *
 */
 
OpenAjax.a11y.Ruleset.prototype.evaluate = function (url, title, doc, progessCallBackFunction, build_cache) {
      
  
  var PROGRESS = OpenAjax.a11y.PROGRESS;

  this.doc   = doc;
  
  this.eval_title = title;
  this.eval_url   = url;
  this.eval_date = OpenAjax.a11y.util.getFormattedDate();
  
  OpenAjax.a11y.logger.debug("DATE: " + this.eval_date);
  
  // OpenAjax.a11y.logger.debug("Starting evaluation: " + this.ruleset_id + " " + this.default_name + " " + this.number_of_rules + " rules" );
  
  this.log = new OpenAjax.a11y.Log(this.ruleset_id, this.default_name, this.number_of_rules, progessCallBackFunction);

  // OpenAjax.a11y.logger.debug(this.log);

  this.dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, this.log);      

  this.rule_results = [];

  this.dom_cache.updateDOMElementCache();
  
  if (build_cache) { 
    this.dom_cache.updateAllCaches();
  }  
  
  var rule_mappings = this.rule_mappings;
  var rule_mappings_len = rule_mappings.length;

//  OpenAjax.a11y.logger.debug("Number of rules: " + rule_mappings_len);

  for (var i = 0; i < rule_mappings_len; i++) {
    
    var rule_mapping = rule_mappings[i];
    var rule = rule_mapping.rule;
    var rule_definition  = rule.getNLSDefinition(rule_mapping.type);                     

    if (rule_mapping) {

      rule_result = new OpenAjax.a11y.RuleResult(rule_mapping); 

//      OpenAjax.a11y.logger.debug("Rule: " + rule.rule_id + "  Enabled: " + rule_mapping.enabled  + "  Mapping: " + rule_mapping.type + "  Recommended Rules Evaluated: " + this.recommended_rules_enabled);

      if (rule_mapping.enabled && 
          (rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED ||
           this.recommended_rules_enabled) &&
          (rule && rule_mapping.wcag20_level <= this.wcag20_level)) {      

        this.log.update(PROGRESS.REQUIREMENT, rule_mapping.rule_id, rule.rule_id);   

        rule_result.rule_evaluated = true;

        // Check to see if the specialized cache needed for the rule is already 
        // If not create the specialized cache
                     
        if (!build_cache ) {
          var up_to_date = this.dom_cache.isUpToDate(rule.cache_dependency);
          if (up_to_date.exists) {
            if(!up_to_date.up_to_date) this.dom_cache.updateCache(rule.cache_dependency);
          } else {
            this.log.update(PROGRESS.RULE, "Cache " + rule.cache_dependency + " for rule with id=" + rule.rule_id +  " does not exist.");
            continue;
          }
        } 

        if (rule.language_dependency.length) {
          // Rules with a language restriction
          if (rule.language_dependency.indexOf(OpenAjax.a11y.locale) >= 0) {
            rule.validate(this.dom_cache, rule_result);
          }
          else {
            this.log.update(PROGRESS.RULE, "Rule with id='" + rule.rule_id + "' does not apply to locale: " + OpenAjax.a11y.locale);                           
          }
        }
        else {
          // Rules without any language restrictions
          rule.validate(this.dom_cache, rule_result);
        }   

        this.log.update(PROGRESS.RULE, rule_definition, rule.rule_id);
                     
      }
      else {
        rule_result.setEvaluationLevelToDisabled();
        if (rule) this.log.update(PROGRESS.RULE, " ** Rule with id=" + rule.rule_id + " is disabled");       
        else this.log.update(PROGRESS.RULE, " ** Rule for success criteria " + rsc.ruleset_id + " is undefined");                            
      }

      rule_result.calculateImplementationLevel();
      
      this.rule_results.push(rule_result);
      
      // OpenAjax.a11y.logger.debug("Aggregating rule Results: " + rule_result);

    }                 
  } // end rule loop
    
  this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
  return this;
};

/**
 * @method getCacheItemsByElementType
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of cache items based on the element type and evaluation results
 *
 * @param  {Number}  rule_category  - Number representing the element type
 * @param  {Number}  filter         - Number representing the evaluation results filter
 *
 * @return {FilteredCacheItemResults}  The object containing the set of cache items
 */

OpenAjax.a11y.Ruleset.prototype.getCacheItemsByElementType = function (element_type, filter) {

  var results = new OpenAjax.a11y.cache.FilteredCacheItemResults(this);
  
  if (this.dom_cache) results.getCacheItemResults(element_type, filter);
  
  return results;

};


/**
 * @method getCacheItemsByRuleCategory
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of cache items based on their evaluation results and rule category
 *
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 *
 * @return {FilteredCacheItemResults}  The object containing the set of cache items
 */

OpenAjax.a11y.Ruleset.prototype.getCacheItemsByRuleCategory = function (rule_category, filter) {

  var results = new OpenAjax.a11y.cache.FilteredCacheItemResults(this);
  
  if (this.dom_cache) results.getCacheItemResults(rule_category, filter);
  
  return results;

};



/**
 * @method getFilteredRuleResultsByWCAG20
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure by WCAG 2.0 Principles, Guidelines and Success Criteria
 *
 * @param {Number}  wcag20_level  -  WCAG 2.0 Success Criteria Level 
 * @param {Number}  filter        -  Filter for node results (bit mapped mask)
 * 
 * @return {FilteredRuleResultsGroups}  The object containing the filtered rule results organized by wcag 2.0 requirements
 */

OpenAjax.a11y.Ruleset.prototype.getFilteredRuleResultsByWCAG20 = function (wcag20_level, filter) {

  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;

  var nls_wcag20 = OpenAjax.a11y.all_wcag20_nls.getNLS();

  var principles;
  var principle;
  var guideline;
  var success_criterion;

  principles = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, RULE_CATEGORIES.ALL_CATEGORIES, 'WCAG 2.0');

  principle         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '1', nls_wcag20.getNLSItemById('1').title, this);
  
  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '1.1', nls_wcag20.getNLSItemById('1.1').title, this);
  
  if (nls_wcag20.getNLSItemById('1.1.1').level <= wcag20_level) {
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.1.1', nls_wcag20.getNLSItemById('1.1.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '1.2', nls_wcag20.getNLSItemById('1.2').title, this);
  
  if (nls_wcag20.getNLSItemById('1.2.1').level <= wcag20_level) {
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.1', nls_wcag20.getNLSItemById('1.2.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.2').level <= wcag20_level) {
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.2', nls_wcag20.getNLSItemById('1.2.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.3', nls_wcag20.getNLSItemById('1.2.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.4', nls_wcag20.getNLSItemById('1.2.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.5', nls_wcag20.getNLSItemById('1.2.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.6').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.6', nls_wcag20.getNLSItemById('1.2.6').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.7').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.7', nls_wcag20.getNLSItemById('1.2.7').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.8').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.8', nls_wcag20.getNLSItemById('1.2.8').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.2.9').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.2.9', nls_wcag20.getNLSItemById('1.2.9').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '1.3', nls_wcag20.getNLSItemById('1.3').title, this);
  
  if (nls_wcag20.getNLSItemById('1.3.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.3.1', nls_wcag20.getNLSItemById('1.3.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.3.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.3.2', nls_wcag20.getNLSItemById('1.3.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.3.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.3.3', nls_wcag20.getNLSItemById('1.3.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '1.4', nls_wcag20.getNLSItemById('1.4').title, this);
  
  if (nls_wcag20.getNLSItemById('1.4.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.1', nls_wcag20.getNLSItemById('1.4.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.2', nls_wcag20.getNLSItemById('1.4.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.3').level <= wcag20_level) {    
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.3', nls_wcag20.getNLSItemById('1.4.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.4', nls_wcag20.getNLSItemById('1.4.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.5', nls_wcag20.getNLSItemById('1.4.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.6').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.6', nls_wcag20.getNLSItemById('1.4.6').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.7').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.7', nls_wcag20.getNLSItemById('1.4.7').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.8').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.8', nls_wcag20.getNLSItemById('1.4.8').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('1.4.9').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '1.4.9', nls_wcag20.getNLSItemById('1.4.9').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  principle.addFilteredRuleResultsGroup(guideline);

  principles.addFilteredRuleResultsGroup(principle);

  principle         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '2', nls_wcag20.getNLSItemById('2').title, this);
  
  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '2.1', nls_wcag20.getNLSItemById('2.1').title, this);
  
  if (nls_wcag20.getNLSItemById('2.1.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.1.1', nls_wcag20.getNLSItemById('2.1.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.1.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.1.2', nls_wcag20.getNLSItemById('2.1.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.1.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.1.3', nls_wcag20.getNLSItemById('2.1.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '2.2', nls_wcag20.getNLSItemById('2.2').title, this);
  
  if (nls_wcag20.getNLSItemById('2.2.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.2.1', nls_wcag20.getNLSItemById('2.2.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('2.2.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.2.2', nls_wcag20.getNLSItemById('2.2.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('2.2.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.2.3', nls_wcag20.getNLSItemById('2.2.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('2.2.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.2.4', nls_wcag20.getNLSItemById('2.2.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);    
  }
  
  if (nls_wcag20.getNLSItemById('2.2.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.2.5', nls_wcag20.getNLSItemById('2.2.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '2.3', nls_wcag20.getNLSItemById('2.3').title, this);
  
  if (nls_wcag20.getNLSItemById('2.3.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.3.1', nls_wcag20.getNLSItemById('2.3.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('2.3.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.3.2', nls_wcag20.getNLSItemById('2.3.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '2.4', nls_wcag20.getNLSItemById('2.4').title, this);
  
  if (nls_wcag20.getNLSItemById('2.4.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.1', nls_wcag20.getNLSItemById('2.4.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.2', nls_wcag20.getNLSItemById('2.4.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('2.4.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.3', nls_wcag20.getNLSItemById('2.4.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.4', nls_wcag20.getNLSItemById('2.4.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.5', nls_wcag20.getNLSItemById('2.4.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.6').level <= wcag20_level) {    
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.6', nls_wcag20.getNLSItemById('2.4.6').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.7').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.7', nls_wcag20.getNLSItemById('2.4.7').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.8').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.8', nls_wcag20.getNLSItemById('2.4.8').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.9').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.9', nls_wcag20.getNLSItemById('2.4.9').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('2.4.10').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '2.4.10', nls_wcag20.getNLSItemById('2.4.10').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  principles.addFilteredRuleResultsGroup(principle);

  principle         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '3', nls_wcag20.getNLSItemById('3').title, this);
  
  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '3.1', nls_wcag20.getNLSItemById('3.1').title, this);
  
  if (nls_wcag20.getNLSItemById('3.1.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.1', nls_wcag20.getNLSItemById('3.1.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('3.1.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.2', nls_wcag20.getNLSItemById('3.1.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.1.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.3', nls_wcag20.getNLSItemById('3.1.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('3.1.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.4', nls_wcag20.getNLSItemById('3.1.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  if (nls_wcag20.getNLSItemById('3.1.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.5', nls_wcag20.getNLSItemById('3.1.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);    
  }  
  
  if (nls_wcag20.getNLSItemById('3.1.6').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.1.6', nls_wcag20.getNLSItemById('3.1.6').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }  
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '3.2', nls_wcag20.getNLSItemById('3.2').title, this);
  
  if (nls_wcag20.getNLSItemById('3.2.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.2.1', nls_wcag20.getNLSItemById('3.2.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.2.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.2.2', nls_wcag20.getNLSItemById('3.2.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.2.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.2.3', nls_wcag20.getNLSItemById('3.2.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.2.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.2.4', nls_wcag20.getNLSItemById('3.2.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.2.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.2.5', nls_wcag20.getNLSItemById('3.2.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '3.3', nls_wcag20.getNLSItemById('3.3').title, this);
  
  if (nls_wcag20.getNLSItemById('3.3.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.1', nls_wcag20.getNLSItemById('3.3.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.3.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.2', nls_wcag20.getNLSItemById('3.3.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.3.3').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.3', nls_wcag20.getNLSItemById('3.3.3').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.3.4').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.4', nls_wcag20.getNLSItemById('3.3.4').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.3.5').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.5', nls_wcag20.getNLSItemById('3.3.5').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('3.3.6').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '3.3.6', nls_wcag20.getNLSItemById('3.3.6').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  principles.addFilteredRuleResultsGroup(principle);

  principle         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '4', nls_wcag20.getNLSItemById('4').title, this);
  
  guideline         = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, '4.1', nls_wcag20.getNLSItemById('4.1').title, this);
  
  if (nls_wcag20.getNLSItemById('4.1.1').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '4.1.1', nls_wcag20.getNLSItemById('4.1.1').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  if (nls_wcag20.getNLSItemById('4.1.2').level <= wcag20_level) {  
    success_criterion = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, '4.1.2', nls_wcag20.getNLSItemById('4.1.2').title, this);
    guideline.addFilteredRuleResultsGroup(success_criterion);  
  }
  
  principle.addFilteredRuleResultsGroup(guideline);

  principles.addFilteredRuleResultsGroup(principle);

  for (var i = 0; i < this.rule_results.length; i++) {
  
     var rule_result = this.rule_results[i];
  
     principles.addRuleResult(rule_result.getRule().wcag_primary_id, rule_result, wcag20_level, filter);
     
  }   
  
  return principles;


};


/**
 * @method getFilteredRuleResultsByRuleCategories
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure by rule category
 *
 * @param {Number}  wcag20_level  -  WCAG 2.0 Success Criteria Level 
 * @param {Number}  filter        -  Filter for node results (bit mapped mask)
 *
 * @return {FilteredRuleResultsGroups}  The object containing the filtered rule results organized by rule categories
 */

OpenAjax.a11y.Ruleset.prototype.getFilteredRuleResultsByRuleCategories = function (wcag20_level, filter) {

  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;

  var groups = new OpenAjax.a11y.cache.FilteredRuleResultsGroups(this, RULE_CATEGORIES.ALL_CATEGORIES, 'All Rule Categories');
  var group;

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.ABBREVIATIONS, 'Abbrevitations', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.AUDIO, 'Audio', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.COLOR, 'Color', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.CONTROLS, 'Form Controls', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.EMBEDED, 'Embeded Applications', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.HEADINGS, 'Headings', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.IMAGES, 'Images', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.LANDMARKS, 'Landmarks', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.LAYOUT, 'Layout', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.LINKS, 'Links', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.LISTS, 'Lists', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.NAVIGATION, 'Navigation', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.SCRIPTING, 'Scripting', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.TABLES, 'Tables', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.TITLE, 'Title', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.TIMING, 'Timing', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.VIDEO, 'Video', this);
  groups.addFilteredRuleResultsGroup(group);

  group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, RULE_CATEGORIES.WIDGETS, 'Widgets', this);
  groups.addFilteredRuleResultsGroup(group);



  for (var i = 0; i < this.rule_results.length; i++) {
  
     var rule_result = this.rule_results[i];
  
     groups.addRuleResult(rule_result.getRule().rule_category, rule_result, wcag20_level, filter);
     
  }   
  
  return groups;

};

/**
 * @method getFilteredRuleResultsByRuleCategory
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of all rule results for a set of rule categories
 *
 * @param {Number}  category      -  Number of bit mask for which rule groups to include in the group 
 * @param {String}  title         -  Title of the rule category 
 * @param {Number}  wcag20_level  -  WCAG 2.0 Success Criteria Level 
 * @param {Number}  filter        -  Filter for node results (bit mapped mask)
 *
 * @return {FilteredRuleResultsGroup}  The object containing the filtered rule results
 */

OpenAjax.a11y.Ruleset.prototype.getFilteredRuleResultsByRuleCategory = function (category, title, wcag20_level, filter) {

  var filtered_rule_results_group = new OpenAjax.a11y.cache.FilteredRuleResultsGroup(this, category, title, this);
  
  for (var i = 0; i < this.rule_results.length; i++) {
  
     var rule_result = this.rule_results[i];
     
     if (rule_result) filtered_rule_results_group.addRuleResult(rule_result.getRule().rule_category, rule_result, wcag20_level, filter);
     
  }   
  
  return filtered_rule_results_group;

};

/**
 * @method getFilteredRuleResultsByRuleSummary
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Returns an object containing a set of all rule results for a set of rule categories
 *
 * @param {Number}  summary       -  Number representing the type of summary 
 * @param {String}  title         -  Title of the rule summary 
 * @param {Number}  wcag20_level  -  WCAG 2.0 Success Criteria Level 
 * @param {Number}  filter        -  Filter for node results (bit mapped mask)
 *
 * @return {FilteredRuleResultsGroup}  The object containing the filtered rule results
 */

OpenAjax.a11y.Ruleset.prototype.getFilteredRuleResultsByRuleSummary = function (summary, title, wcag20_level, filter) {

  switch (summary) {
  
  case OpenAjax.a11y.RULE_SUMMARY.CATEGORIES:
    return this.getFilteredRuleResultsByRuleCategories(wcag20_level, filter);
    break;
  
  case OpenAjax.a11y.RULE_SUMMARY.WCAG20:
    return this.getFilteredRuleResultsByWCAG20(wcag20_level, filter);
    break;
  
  default:
    break;
  
  }
  
  return null;

};



/**
 * @method isSameDocument
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Determines if a window document property is the one for this evaluation 
 *
 * @param {Object}  document  -  Document Object Model (DOM) to be analyzed
 *
 * @param {Boolean}  True if the same document, false if not
 */
 
OpenAjax.a11y.Ruleset.prototype.isSameDocument = function (document) {
    
  return this.doc === document;
    
};
 
/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Creates a JSON representation of the rules in the ruleset 
 *
 * @param  {String}  prefix         - A prefix string typically spaces for formatting output
 * @param  {Number}  rule_category  - Number representing the rule categories to include 
 *
 * @return {String} JSON formatted string representing the ruleset
 */
 
OpenAjax.a11y.Ruleset.prototype.toJSON = function (prefix, rule_category) {
  
  function referencesToJSON(name, refs, last) {
  
    var title = "";
    var url = "";

    var refs_len = refs.length;
    var refs_last = refs_len - 1;
      
    if (refs_len > 0) {
      json += next_prefix + "  \"" + OpenAjax.a11y.util.escapeForJSON(name) + "\" : ["; 
      for (var i = 0; i < refs_len; i++) {
        var ref = refs[i];
        
        if (typeof ref === 'string') {
           title = ref;
           url = "";
        }
        else {
           title = ref.title;
           url = ref.url;
        }
        
        if (i === refs_last) json += next_prefix_2 + "{ \"title\" : \"" + OpenAjax.a11y.util.escapeForJSON(title) + "\", \"url\" : \"" + OpenAjax.a11y.util.escapeForJSON(url) + "\"}";
        else json += next_prefix_2 + "{ \"title\" : \"" + OpenAjax.a11y.util.escapeForJSON(title) + "\", \"url\" : \"" + OpenAjax.a11y.util.escapeForJSON(url) + "\"},";
      }       
      json += next_prefix + "  ]"; 
    }
    else {
      json += next_prefix + "  \"purpose\"    : []";       
    }
    
    if (typeof last === 'undefined' || !last) json += ',';
    
  } // end function
    
  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) {
    prefix = "";
  }  
  else {
    next_prefix   = prefix + "    ";  
    next_prefix_2 = prefix + "        ";  
  }
  
  var json = "";
  
  var i;
  var j;

  var rule_mappings_len = this.rule_mappings.length;
  var rule_mappings_last = rule_mappings_len - 1;

  json += "{";

  json += prefix + "  \"ruleset_id\"          : \"" + this.ruleset_id + "\",";
  json += prefix + "  \"ruleset_title\"       : \"" + OpenAjax.a11y.util.escapeForJSON(this.ruleset_title) + "\",";
  json += prefix + "  \"ruleset_description\" : \"" + OpenAjax.a11y.util.escapeForJSON(this.ruleset_description) + "\",";
  json += prefix + "  \"ruleset_author_name\" : \"" + OpenAjax.a11y.util.escapeForJSON(this.ruleset_author_name) + "\",";
  json += prefix + "  \"ruleset_author_url\"  : \"" + this.ruleset_author_url + "\",";
  json += prefix + "  \"ruleset_updated\"     : \"" + this.ruleset_updated + "\",";
  json += prefix + "  \"wcag20_level\"        : "  + this.wcag20_level + ",";
  json += prefix + "  \"rec_rules_enabled\"   : "  + this.recommended_rules_enabled + ",";

  if (rule_mappings_len > 0) {
    json += prefix + "  \"rules\" : {";
    
    for (i = 0; i < rule_mappings_len; i++) {
      var rm = this.rule_mappings[i];
      var r = rm.rule;
      
      if (r.rule_category & rule_category) {
        json += next_prefix + "\"" + r.rule_id + "\" : {"; 
        json += next_prefix + "  \"enabled\"          : "  + rm.enabled + ","; 
        json += next_prefix + "  \"rule_type\"        : "  + rm.type + ",";
        json += next_prefix + "  \"scope\"            : "  + r.rule_scope + ","; 
        json += next_prefix + "  \"nls_scope\"        : \"" + r.getNLSRuleScope() + "\","; 
        json += next_prefix + "  \"wcag_primary_id\"  : \"" + r.wcag_primary_id + "\","; 
        json += next_prefix + "  \"wcag_related_ids\" : \"" + r.wcag_related_ids + "\","; 
        json += next_prefix + "  \"definition\"       : \"" + OpenAjax.a11y.util.escapeForJSON(r.getNLSDefinition(rm.type)) + "\","; 
        json += next_prefix + "  \"summary\"          : \"" + OpenAjax.a11y.util.escapeForJSON(r.getNLSSummary(rm.type)) + "\","; 
      
        referencesToJSON('purpose', r.getNLSPurpose());
        referencesToJSON('techniques', r.getNLSTechniques());
        referencesToJSON('informational_links', r.getNLSInformationalLinks(), true);

        if (i === rule_mappings_last) json += next_prefix + "}";
        else json += next_prefix + "},";
      }  
      
    }  // end loop
    
   json += prefix + "  }";
   
  }
  else {
    json += prefix + "  \"rules\" : {}";
  }
  
  json += prefix + "}";
 
  return json;
    
};
 

/**
 * @method exportEvaluationResultsToPython
 *
 * @memberOf OpenAjax.a11y.Ruleset
 *
 * @desc Creates a string representing Python (Django) functions to populate a database with rule results for an evaluation
 *
 * @return {String} Returns a string (with line breaks) that include Python (Django) functions to populate a database
 */
 
OpenAjax.a11y.Ruleset.prototype.exportEvaluationResultsToPython = function () {
  
  function formatWidth(str, width) {
  

    for(var i = str.length; i < width; i++) str += " ";

    return str;
  
  }

  function formatNumber(number, width) {
  
    var str = number.toString();

    for(var i = str.length; i < width; i++) str = " " + str;

    return str;
  
  }

  var python_code = "from local import conf, inst, ws\n";
  python_code += "# Conference, Institution, Website, URL, Title, Rule Category, Rule ID, PEPR, Violations, Warnings, Passed, Manual Checks, Hidden\n";
  
  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;
     
  for (var i = 0; i < rule_results_len; i++) {
    
    var rule_result = rule_results[i];
    
    python_code += "addResult(conf, inst, ws";

    python_code += ", \"" + OpenAjax.a11y.util.escapeForJSON(this.eval_url)   + "\"";
    python_code += ", \"" + OpenAjax.a11y.util.escapeForJSON(this.eval_title) + "\"";

    python_code += ", " + formatWidth("\"" + OpenAjax.a11y.all_rules.nls[OpenAjax.a11y.locale].rule_categories[rule_result.getRuleCategory()] + "\"", 12) ;
    python_code += ", " + formatWidth("\"" + rule_result.getRuleId() + "\"", 14);
    
    python_code += ", " + formatNumber(rule_result.implementation_percentage, 4);
    python_code += ", " + formatNumber(rule_result.violations_count, 4);
    python_code += ", " + formatNumber(rule_result.warnings_count, 4);
    python_code += ", " + formatNumber(rule_result.passed_count, 4);
    python_code += ", " + formatNumber(rule_result.manual_checks_count, 4);
    python_code += ", " + formatNumber(rule_result.hidden_count, 4);
    python_code += ", \"" + OpenAjax.a11y.util.escapeForJSON(rule_result.getMessage()) + "\"";

    python_code += ")\n";

  }
  
  return python_code;
    
};
 


/* ---------------------------------------------------------------- */
/*                       WCAG20RuleMapping                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RuleMapping
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   rule_id  - id of the rule
 * @param  {Number}   type     - Severity of the rule (NOTE: typically REQUIRED or RECOMMENDATION)
 * @param  {Boolean}  enabled  - Initial value for the enabled property
 *
 * @property  {Rule}     rule      - Rule object
 * @property  {Number}   type      - Severity of the rule (NOTE: typically REQUIRED or RECOMMENDATION)
 * @property  {Boolean}  enabled   - Initial value for the enabled property
 * 
 * @property {Number}  wcag20_level                    - The WCAG 2.0 level of the success citeria
 * @property {Number}  wcag20_principle_index          - The index of the principle result object for aggregating rule results
 * @property {Number}  wcag20_guideline_index          - The index of the guideline result object for aggregating rule results
 * @property {Number}  wcag20_success_criterion_index  - The index of the success criteria result object for aggregating rule results
 */
 

OpenAjax.a11y.WCAG20RuleMapping = function (rule_id, type, enabled) {

   this.rule         = null;
   this.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.UNKNOWN;
   this.type         = type;
   this.enabled      = enabled;

   var r = OpenAjax.a11y.all_rules.getRuleByRuleId(rule_id);
   if (r) {
     this.rule = r;
     this.wcag20_level                   = r.getWCAG20Level();
     this.wcag20_principle_index         = r.getWCAG20PrincipleIndex(); 
     this.wcag20_guideline_index         = r.getWCAG20GuidelineIndex();
     this.wcag20_success_criterion_index = r.getWCAG20SuccessCriteriaIndex();
   }
   else {
     OpenAjax.a11y.logger.debug("  ** Rule with rule id='" + rule_id + "' does not exist!");   
   }
   
};



