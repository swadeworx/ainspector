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
 * @returns  {Array}  ruleset_id  - Array of objects that contain NLS information about a ruleset
 */

OpenAjax.a11y.Rulesets.prototype.getAllRulesets = function() {

  var rulesets = [];
  
  for (var i = 0; i < this.rulesets.length; i++) {  
    rulesets.push(this.rulesets[i]);
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
 * @property {Number} wcag20_level - Level of WCAG 2.0 Success Criteria to evaluate (i.e. A, AA, AAA)
 *
 * NOTE: The following properties are defined after each evaluation
 *
 * @property {String} title  - The title of the last document evaluated
 * @property {String} url    - The url of the last document evaluated
 *
 * @property {Object} doc          - Reference to browser document object model (DOM) that holds the document to be analyzed
 * @property {Object} wcag20_nls   - Reference to WCAG 2.0 NLS object for current language
 * @property {Object} log          - Reference to Log object
 * @property {Object} dom_cache    - Reference to DOMCache object
 * @property {Object} result       - Reference to WCAG20Result object
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

  var i;
  var  p_id,  rp_data,  rp_new;  // variables for creating RulesetPrinciple objects
  var  g_id,  rg_data,  rg_new;  // variables for creating RulesetGuideline objects
  var sc_id, rsc_data, rsc_new;  // variables for creating RulesetSuccessCriterion objects
  var  r_id,  rr_data,  rr_new;  // variables for creating RulesetRule objects
 
  this.type = "WCAG20";
  this.ruleset_title = {};
  this.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.AA;
  
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
    OpenAjax.a11y.logger.debug("  Ruleset Author: " + this.ruleset_author_name);
    OpenAjax.a11y.logger.debug("  Ruleset URL: " + this.ruleset_author_url);
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
  
  this.title = "";
  this.url   = "";
  
  this.doc       = null;
  this.log       = null;
  this.dom_cache = null;        
  this.wcag20_results    = null; 
  
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

  this.wcag20_level = level;
  
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
 * @method setDataTableAssumption
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Enable and disable the cache from testing for broken urls 
 *
 * @param  {Boolean}  assumption   - If false asssumes tables are used for layout unless header cells or other indicator of a data table is found
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.setDataTableAssumption = function (assumption) {
  
  OpenAjax.a11y.DATA_TABLE_ASSUMPTION = assumption;
  
};

/**
 * @method evaluate
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
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
 
OpenAjax.a11y.WCAG20Ruleset.prototype.evaluate = function (url, title, doc, progessCallBackFunction, build_cache) {
      
  
  var PROGRESS = OpenAjax.a11y.PROGRESS;

  this.doc   = doc;
  this.title = title;
  this.url   = url;
  
  // OpenAjax.a11y.logger.debug("Starting evaluation: " + this.ruleset_id + " " + this.default_name + " " + this.number_of_rules + " rules" );
  
  this.log = new OpenAjax.a11y.Log(this.ruleset_id, this.default_name, this.number_of_rules, progessCallBackFunction);

  // OpenAjax.a11y.logger.debug(this.log);

  this.dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, this.log);      

  this.wcag20_results        = new OpenAjax.a11y.WCAG20Result(this, url, title); 

  this.rule_category_results = new OpenAjax.a11y.RuleCategoryResult(this, url, title); 

  this.dom_cache.updateDOMElementCache();
  
  if (build_cache) { 
    this.dom_cache.updateAllCaches();
  }  
  
  var rule_mappings = this.rule_mappings;
  var rule_mappings_len = rule_mappings.length;

  OpenAjax.a11y.logger.debug("Number of rules: " + rule_mappings_len);

  for (var i = 0; i < rule_mappings_len; i++) {
    
    var rule_mapping = rule_mappings[i];
    var rule = rule_mapping.rule;
    var rule_definition  = rule.getNLSDefinition(rule_mapping.type);                     

    if (rule_mapping) {

      rule_result = new OpenAjax.a11y.RuleResult(rule_mapping); 
      
      if (rule_mapping.enabled) {      

        this.log.update(PROGRESS.REQUIREMENT, rule_mapping.rule_id, rule.rule_id);   

        OpenAjax.a11y.logger.debug("Validating rule " + i + ": " + rule.rule_id + "  " + rule_definition + " level: " + rule_mapping.wcag20_level);

        // Check to see if the rule is defined is of the right level  
        if (rule && rule_mapping.wcag20_level <= this.wcag20_level) {

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
          if (rule) this.log.update(PROGRESS.RULE, " ** Rule with id=" + rule.rule_id + " is disabled");       
          else this.log.update(PROGRESS.RULE, " ** Rule for success criteria " + rsc.ruleset_id + " is undefined");                            
        }
      }   

      this.rule_category_results.addRuleResult(rule_result);
      
      this.wcag20_results.addRuleResult(rule_result);

      OpenAjax.a11y.logger.debug("Aggregating rule Results: " + rule_result);

    }                 
  } // end rule loop
    
  this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
  return this;
};

/**
 * @method getCacheItemsByRuleCategory
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of cache items based on their evaluation results and rule category
 *
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 *
 * @return {FilteredCacheItemResults}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getCacheItemsByRuleCategory = function (rule_category, filter) {

  var results = new OpenAjax.a11y.cache.FilteredCacheItemResults(this.dom_cache);
  
  if (this.dom_cache) results.getCacheItemResults(rule_category, filter);
  
  return results;

};

/**
 * @method getRuleResultsByRuleCategories
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure by rule category
 *
 * @return {RuleResultSummary}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getRuleResultsByRuleCategories = function (wcag20_level) {

  function addRuleCategory(title, aggregation) {
  
    var rule_result_summary_group = new OpenAjax.a11y.cache.RuleResultSummaryGroup(title, aggregation);
    
    var rule_results     = aggregation.rule_results;
    var rule_results_len = rule_results.length;
      
    for (var i = 0; i < rule_results_len ; i++) {
      var rule_result = rule_results[i];
      var rule_wcag20_level = rule_result.rule.getWCAG20Level();
      
      if (rule_wcag20_level <= wcag20_level) rule_result_summary_group.addRuleResultItem(rule_result);
    }
    
    rule_result_summary.addRuleResultItem(rule_result_summary_group);
  
  }

  var rule_category_results = this.rule_category_results;

  var rule_result_summary = new OpenAjax.a11y.cache.RuleResultSummary('Rule Categories');
  
  if (rule_category_results) {
  
//  addRuleCategory('Abbreviation Rules', rule_category_results.abbreviation_rule_results);
    addRuleCategory('Audio Rules', rule_category_results.audio_rule_results);
    addRuleCategory('Color Contrast Rules', rule_category_results.color_contrast_rule_results);
    addRuleCategory('Form Control Rules', rule_category_results.control_rule_results);
    addRuleCategory('Heading Rules', rule_category_results.heading_rule_results);
    addRuleCategory('Image Rules', rule_category_results.image_rule_results);
    addRuleCategory('Landmark Rules', rule_category_results.landmark_rule_results);
//  addRuleCategory('Language Rules', rule_category_results.language_rule_results);
    addRuleCategory('Link Rules', rule_category_results.link_rule_results);
//  addRuleCategory('List Rules', rule_category_results.list_rule_results);
    addRuleCategory('Table Rules', rule_category_results.table_rule_results);
    addRuleCategory('Video Rules', rule_category_results.video_rule_results);
    addRuleCategory('Widget Rules', rule_category_results.widget_rule_results);
    addRuleCategory('Content Rules', rule_category_results.content_rule_results);
    
  }
  
  return rule_result_summary;

};

/**
 * @method getRuleResultsByRuleGrouping
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure based on the grouping parameter
 *
 * @param {Number}  grouping  - Grouping of rules constant
 *
 * @return {RuleResultSummary}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getRuleResultsByRuleGrouping = function (grouping, wcag20_level) {

  var RULE_GROUP = OpenAjax.a11y.RULE_GROUP;
  
  var results = null;

  switch  (grouping) {
  
  case RULE_GROUP.RULE_CATEGORIES:
    results = this.getRuleResultsByRuleCategories(wcag20_level);
    break;
    
  case RULE_GROUP.WCAG20:

  default:
    break;
  }

 return results;
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



