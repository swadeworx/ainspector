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
/*                      FilteredRuleResultsGroups                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredRuleResultsGroups
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of cache items associated with a rule category 
 *       The cache items returned can be filtered by the tpe of evaluation result 
 *
 * @param  {Object}  ruleset  - ruleset and evaluation results used to generate the filtered results
 * @param  {String}  group_id  - id used to identify this grouping of rules
 * @param  {String}  title     - Human readible title used 
 *
 * @property  {FilteredRuleResultsGroup}  filtered_rule_results_groups  - array of filtered 
 *
 * @property  {String}  this.group_id  - ID to uniquely identify this group among other grouping objects
 * @property  {String}  this.cache_id  - Used in XUL renderings to itentify item in a tree
 *
 * @property  {String}  title          - title of document analyzed
 *
 * @property  {Number} implementation_level      - Constant indicating the level of implementation
 * @property  {Number} implementation_level_sort - Number used in sorting group results from most severe to least severe rule implementtion
 * @property  {Number} implementation_percentage - Percentage of elements that pass (range 0-100);
 *
 * @property  {Number} node_results_filtered_out - number of node results filtered
 *
 * @property  {Number} number_of_required_rules     - Number of required rules in the group
 * @property  {Number} number_of_recommended_rules  - Number of recommended rules in the group
 * @property  {Number} number_of_rules_not_included - Number of deisabled rules
 *
 * @property  {Number} pass_count           - number of node results in the groups that pass
 * @property  {Number} violations_count     - number of node results in the groups that are violations
 * @property  {Number} warnings_count       - number of node results in the groups that are warnings
 * @property  {Number} manual_checks_count  - number of node results in the groups that are manula checks
 * @property  {Number} hidden_count         - number of node results in the groups that are hidden
 * 
 */

 OpenAjax.a11y.cache.FilteredRuleResultsGroups = function(ruleset, group_id, title) {

  this.filtered_rule_results_groups = [];
  
  this.ruleset = ruleset;
  
  this.group_id = group_id;
  this.cache_id = group_id;
  
  this.title = title;
  
  this.implementation_level      = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_level_sort = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_percentage = 0;
  
  this.node_results_filtered_out = 0;
  
  this.number_of_required_rules = 0;
  this.number_of_recommended_rules = 0;
  this.number_of_rules_not_included = 0;

  this.passed_count        = 0;
  this.violations_count    = 0;
  this.warnings_count      = 0;
  this.manual_checks_count = 0;
  this.hidden_count        = 0;
 
}; 

/**
 * @method addFilteredRuleResultsGroup
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Adds a filtered rule result group to this group for aggregating results
 *
 * @param  {FilteredRuleResultGroup}  filtered_rule_results_group  - Filtered rule result group object to add
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.addFilteredRuleResultsGroup = function(filtered_rule_results_group) {

  if (filtered_rule_results_group) {
    this.filtered_rule_results_groups.push(filtered_rule_results_group);
  }
  
};

/**
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Adds a rule result to the grouping aggregation of results if the group id has a match in the group
 *
 * @param  {String}      group_id      - id used for matching the rule result object with a filtered rule result group
 * @param  {RuleResult}  rule_result   - Filtered rule result object to aggregate
 * @param  {Number}      wcag20_level  - WCAG 2.0 Success Criteria Level 
 * @param  {Number}      filter        - Filter for node results (bit mapped mask)
 *
 * @return  {FilteredRuleResult | object}  Returns a filtered rule result object if rule set was added to this group, 
 *                                         otherwise an return object with an added property   
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.addRuleResult = function(group_id, rule_result, wcag20_level, filter) {

  var RETURN_VALUE = OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE;

  var groups = this.filtered_rule_results_groups;
  var groups_len = groups.length;

  for (var i = 0; i < groups_len; i++) {
  
     var group = groups[i];
  
     var filtered_rule_result = group.addRuleResult(group_id, rule_result, wcag20_level, filter);
     
     if (filtered_rule_result.added === RETURN_VALUE.ADDED) {

        if (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) this.number_of_required_rules += 1;
        else this.number_of_recommended_rules += 1;

        this.node_results_filtered_out     += filtered_rule_result.node_results_filtered_out;

        this.passed_count        += filtered_rule_result.passed_count;
        this.violations_count    += filtered_rule_result.violations_count;
        this.warnings_count      += filtered_rule_result.warnings_count;
        this.manual_checks_count += filtered_rule_result.manual_checks_count;
        this.hidden_count        += filtered_rule_result.hidden_count;

        this.calculateImplementationLevel();
    
        return filtered_rule_result;
     }

     if (filtered_rule_result.added === RETURN_VALUE.NOT_ADDED) {
     
        this.number_of_rules_not_included += 1;    

        this.calculateImplementationLevel();
    
        return filtered_rule_result;
     }

  }

  var ro = {};
  ro.added = RETURN_VALUE.NO_MATCH;

  this.calculateImplementationLevel();

  return ro; 

};


/**
 * @method getNumberOfRules
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Returns number of rules in this group
 *
 * @return  {Number}  Number of rules in this group 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.getNumberOfRules = function() {

  return this.number_of_required_rules + this.number_of_recommended_rules;

};

/**
 * @method caclulateImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Calculates the level of implementation based on an average of rule implementation of 
 *       the rule results in the list.  
 *
 * @return  {Number}  Constant indicating level implementation
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.calculateImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var groups = this.filtered_rule_results_groups;
  var groups_len = groups.length;
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Number of rule results: " + rule_results_len);  

  var percentage_summation = 0;
  var percentage_count = 0;

  for (var i = 0; i < groups_len; i++ ) {
    
    var group = groups[i];
    
    if (rule_result.rule_evaluated) {
    
      var il = group.implementation_level;
      
      if (il !== IMPLEMENTATION_LEVEL.NOT_APPLICABLE && 
          il !== IMPLEMENTATION_LEVEL.RULE_DISABLED) {

        if (il !== IMPLEMENTATION_LEVEL.MANUAL_CHECKS) { 
          var count = group.number_of_required_rules + group.number_of_recommended_rules;
          percentage_summation += group.implementation_percentage * count;
          percentage_count += count;
        }        
      }
    }    
  }

  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE; 
  var level_sort =  0.5;
  var percentage = 0;

  if (percentage_count > 0) {
  
    percentage = Math.round(percentage_summation / percentage_count);

    level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED; 
      
    if (percentage === 100) level = IMPLEMENTATION_LEVEL.COMPLETE;
    else if (percentage >= 95) level = IMPLEMENTATION_LEVEL.ALMOST_COMPLETE;
      else if (percentage >= 50) level = IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION;
    
    if (this.manual_checks_count >= 1) {
      level += IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      level_sort =  1.5 + Math.round((100 - percentage));
    } 
    else {
      level_sort =  1 + Math.round((100 - percentage));    
    }
  }
  else {
    if (this.manual_check_count > 0) {
      level = IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      level_sort =  1.5;
    }
  }
  
  this.implementation_level      = level;
  this.implementation_level_sort = level_sort;
  this.implementation_percentage = percentage;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  GROUP: " + this.title + " LEVEL: " + this.implementation_level + " PERCENTAGE: " + this.implementation_percentage + "  LEVEL SORT: " + this.implementation_level_sort);  

  return this.implementation_level;
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Returns implementation level of the group
 *
 * @return  {Number}  Number representing the implementation level of the group 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.getImplementationLevel = function() {

  if (this.implementation_level === OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED) this.calculateImplementationLevel();

  return this.implementation_level;
  
};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Returns nls implementation level object representing the implementation level of the groups
 *
 * @return  {Object}  nls object representing the implementation level of the group 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.getNLSImplementationLevel = function() {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;

  var level = this.getImplementationLevel();
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  GROUP: " + this.title + " NLS LEVEL: " + level);  

  var nls_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
  
  if (level !== IMPLEMENTATION_LEVEL.NOT_APPLICABLE && 
      level !== IMPLEMENTATION_LEVEL.RULE_DISABLED) {
    
    if (level !== IMPLEMENTATION_LEVEL.MANUAL_CHECKS) nls_level.label = this.implementation_percentage + "%";
    else nls_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(IMPLEMENTATION_LEVEL.NOT_APPLICABLE);    
  }  
  
  return nls_level;

};


/**
 * @method sortRuleResultsByImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Sorts filtered rule results group items array by rule implementation level
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.sortRuleResultsByImplementationLevel = function() {

  var groups = this.filtered_rule_results_groups;
  var groups_len = groups.length;
  
  do {
    var swapped = false;
    for (var i = 1; i < groups_len; i++) {


      if (groups[i-1].implementation_level_sort < groups[i].implementation_level_sort ||
          (groups[i-1].implementation_level_sort === groups[i].implementation_level_sort &&
           groups[i-1].manual_checks_count < groups[i].manual_checks_count)) {
        // swap the values
        temp = groups[i-1];
        groups[i-1] = groups[i];
        groups[i] = temp;
        swapped = true;
      } 
      
    } // end loop
  } while (swapped);

};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns an JSON representation of the rule summary results 
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  JSON string representing the report data 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  

  var group_title = this.title;
  var group_id    = this.group_id;
  
  var ruleset_title   = this.ruleset.ruleset_title;
  var ruleset_version = this.ruleset.ruleset_version;
  var ruleset_id      = this.ruleset.ruleset_id;
  
  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  var json = "";
  
  var nls_level = this.getNLSImplementationLevel();

  json += prefix + "{";
  
  json += prefix + "  \"group_title\"  : \"" + OpenAjax.a11y.util.escapeForJSON(group_title) + "\",";
  json += prefix + "  \"group_id\"     : \"" + group_id + "\",";
  
  json += prefix + "  \"ruleset_title\"   : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_title) + "\",";
  json += prefix + "  \"ruleset_version\" : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_version) + "\",";
  json += prefix + "  \"ruleset_id\"      : \"" + ruleset_id + "\",";

  json += prefix + "  \"eval_title\"    : \"" + OpenAjax.a11y.util.escapeForJSON(eval_title) + "\",";
  json += prefix + "  \"eval_url\"      : \"" + OpenAjax.a11y.util.escapeForJSON(eval_url) + "\",";
  json += prefix + "  \"eval_date\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_date) + "\",";
  json += prefix + "  \"eval_time\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_time) + "\",";

  json += prefix + "  \"implementation\" : {";
  json += prefix + "    \"abbrev\" : \"" + nls_level.abbrev + "\",";
  json += prefix + "    \"label\"  : \"" + nls_level.label  + "\",";
  json += prefix + "    \"style\"  : \"" + nls_level.style  + "\",";
  json += prefix + "    \"sort\"   : \"" + this.implementation_level_sort  + "\",";
  json += prefix + "    \"pepr\"   : \"" + this.implementation_percentage  + "\"";
  json += prefix + "  },";
  
  json += prefix + "  \"nodes_filtered\"   : \"" + this.node_results_filtered_out + "\",";
  json += prefix + "  \"required_rules\"   : \"" + this.number_of_required_rules + "\",";
  json += prefix + "  \"recommened_rules\" : \"" + this.number_of_recommended_rules + "\",";
  
  json += prefix + "  \"passed_count\"        : \"" + this.passed_count + "\",";
  json += prefix + "  \"violations_count\"    : \"" + this.violations_count + "\",";
  json += prefix + "  \"warnings_count\"      : \"" + this.warnings_count + "\",";
  json += prefix + "  \"manual_checks_count\" : \"" + this.manual_checks_count + "\",";
  json += prefix + "  \"hidden_count\"        : \"" + this.hidden_count + "\",";
  
  json += prefix + "  \"summary_results\" : [";
  
  var results = this.filtered_rule_results_groups;
  var results_len = results.length;
  var results_comma = results_len - 1;
  
  for (var i = 0; i < results_len; i++) {
    json += results[i].toJSON(prefix + "  ", false); 
    if (i < results_comma) json += ","; 
  }  
  
  
  json += prefix + "  ]\n";

  json += prefix + "}";

  return json; 

};


/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Returns an HTML representation of summary results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the HTML for the report 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.toHTML = function(title) {

  var html = "";
  
  html += "<!DOCTYPE html>\n";
  html += "<html lang='en'>\n";
  html += "  <head>\n";
  html += "    <title>" + title + "</title>\n";
  html += "    <meta charset='ISO-8859-1' />\n";
  html += OpenAjax.a11y.report_css;
  html += "    <script type='text/javascript'>\n";
  html += "      var OAA_REPORT = {};\n";  
  html += "      OAA_REPORT.title = '" + OpenAjax.a11y.util.escapeForJSON(title) + "';\n";  
  html += "      OAA_REPORT.rule_summary_data = " + this.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += OpenAjax.a11y.report_rule_summary_view_js;
  html += "  </head>\n";
  html += OpenAjax.a11y.report_rule_summary_view_body;
  html += "</html>\n";
  
  return html;
  
};

/**
 * @method toCSV
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroups
 *
 * @desc Returns an CSV representation of summary results 
 *
 * @param  {String}   title  -   Title of the report
 * @param  {Boolean}  header_flag  -  Optional, set to true if do not want headers for children
 *
 * @return  {String}  String representing the CSV for the report 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroups.prototype.toCSV = function(title, header_flag) {

  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];
  
  if (eval_title.length > 30) eval_title = eval_title.slice(0,27) + "...";
    
  var csv = "";
  
  if ((typeof header_flag !== 'boolean') || header_flag) {
    csv += title + "\n\n";
    csv += "\"OAA ID\"";  
    csv += ",\"Element Description\""; 
    csv += ",\"Element id attribute\""; 
    csv += ",\"Element class attribute\""; 
    csv += ",\"Parent Landmark\""; 
    csv += ",\"Rule ID\"";
    csv += ",\"Type\"";
    csv += ",\"WCAG 2.0 Success Criterion\"";
    csv += ",\"WCAG 2.0 Level\"";
    csv += ",\"Severity\"";
    csv += ",\"Evaluation Result Message\"";
    csv += ",\"Evaluation Date\"";
    csv += ",\"Evaluation Time\"";
    csv += "\"URL Evaluated\"";
    csv += ",\"Title of URL Evaluated\"";
    csv += "\n";
  }  

  var results = this.filtered_rule_results_groups;
  var results_len = results.length;
  var results_comma = results_len - 1;
  
  for (var i = 0; i < results_len; i++) {
    csv += results[i].toCSV(title, false); 
  }  

  return csv;  
};



/* ---------------------------------------------------------------- */
/*                      FilteredRuleResultsGroup                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredRuleResultsGroup
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure to contain a group of rule results
 *
 * @param  {Object}  ruleset   - ruleset and evaluation results used to generate the filtered results
 * @param  {String}  group_id  - Group id for rule results group
 * @param  {String}  title     - Title for rule results group
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup = function(ruleset, group_id, title) {

  this.ruleset = ruleset;

  this.group_id = group_id;
  this.cache_id = group_id;
  
  this.title    = title;

  this.ruleset = ruleset;
  
  this.filtered_rule_results = [];
  
  this.implementation_level      = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_level_sort = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_percentage = 0;
  
  this.node_results_filtered_out = 0;
  
  this.number_of_required_rules = 0;
  this.number_of_recommended_rules = 0;
  this.number_of_rules_not_included = 0;

  this.passed_count        = 0;
  this.violations_count    = 0;
  this.warnings_count      = 0;
  this.manual_checks_count = 0;
  this.hidden_count        = 0;
  
};

/**
 * method addRuleResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Adds a rule result to the grouping aggregation of results if the group id has a match in the group
 *
 * @param  {String}      group_id      - id used for matching the rule result object with a filtered rule result group
 * @param  {RuleResult}  rule_result   - Filtered rule result object to aggregate
 * @param  {Number}      wcag20_level  - WCAG 2.0 Success Criteria Level 
 * @param  {Number}      filter        - Filter for node results (bit mapped mask)
 *
 * @return  {FilteredRuleResult | object}  Returns a filtered rule result object if rule set was added to this group, 
 *                                         otherwise an return object with an added property   
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.addRuleResult = function(group_id, rule_result, wcag20_level, filter) {

  var ro = {};
  
  var RETURN_VALUE = OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE;

  if (this.group_id === group_id || 
      (typeof this.group_id === 'number' && 
       typeof group_id === 'number' && 
       (this.group_id & group_id))) {

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Adding rule result to group: " + rule_result);  

    var rule = rule_result.getRule();
  
    if (rule.getWCAG20Level() <= wcag20_level) {
    
      var filtered_rule_result = new OpenAjax.a11y.cache.FilteredRuleResult(rule_result);
      
      filtered_rule_result.getFilteredNodeResults(filter);

      this.filtered_rule_results.push(filtered_rule_result);
    
      if (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) this.number_of_required_rules += 1;
      else this.number_of_recommended_rules += 1;

      this.node_results_filtered_out     += filtered_rule_result.node_results_filtered_out;

//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug(" Group: " + this.group_id + "  Rule " + rule_result.getRuleSummary() + " Total manual checks: " + this.manual_checks_count + " New Manual Checks:  " + filtered_rule_result.manual_checks_count + " manual checks");  

      this.passed_count        += filtered_rule_result.passed_count;
      this.violations_count    += filtered_rule_result.violations_count;
      this.warnings_count      += filtered_rule_result.warnings_count;
      this.manual_checks_count += filtered_rule_result.manual_checks_count;
      this.hidden_count        += filtered_rule_result.hidden_count;
    
      this.calculateImplementationLevel();
      this.sortRuleResultsByImplementationLevel();
          
//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug(" Total manual checks (new): " + this.manual_checks_count);  

      filtered_rule_result.added = RETURN_VALUE.ADDED;
      return filtered_rule_result;
    }
    else {
      this.number_of_rules_not_included += 1;

//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  NOT Added");  

      ro.added = RETURN_VALUE.NOT_ADDED;
      return ro;
    }
  }


  ro.added = RETURN_VALUE.NO_MATCH; 

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  NO MATCH");  

  return ro;

};

/**
 * @method getNumberOfRules
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns number of rules in this group
 *
 * @return  {Number}  Number of rules in this group 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.getNumberOfRules = function() {

  return this.number_of_required_rules + this.number_of_recommended_rules;

};

/**
 * @method caclulateImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Calculates the level of implementation based on an average of rule implementation of 
 *       the rule results in the list.  
 *
 * @return  {Number}  Constant indicating level implementation
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.calculateImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var filtered_rule_results     = this.filtered_rule_results;
  var filtered_rule_results_len = filtered_rule_results.length;
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Number of rule results in " + this.title + ": " + filtered_rule_results_len);  

  var percentage_summation = 0;
  var percentage_count = 0;

  for (var i = 0; i < filtered_rule_results_len; i++ ) {
    
    var rule_result = filtered_rule_results[i].rule_result;
    
    if (rule_result.rule_evaluated) {
    
      var il = rule_result.implementation_level;
      
      if (il !== IMPLEMENTATION_LEVEL.NOT_APPLICABLE && 
          il !== IMPLEMENTATION_LEVEL.RULE_DISABLED) {

        if (il !== IMPLEMENTATION_LEVEL.MANUAL_CHECKS) { 
          percentage_summation += rule_result.implementation_percentage;
          percentage_count += 1;
        }        
      }
    }    
  }

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Group Implementation Calculation sum: " + percentage_summation + " Count " + percentage_count);  

  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  var level_sort =  0.5;
  var percentage = 0;

  if (percentage_count > 0) {
  
    percentage = Math.round(percentage_summation / percentage_count);

    level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED; 
      
    if (percentage === 100) level = IMPLEMENTATION_LEVEL.COMPLETE;
    else if (percentage >= 95) level = IMPLEMENTATION_LEVEL.ALMOST_COMPLETE;
      else if (percentage >= 50) level = IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION;
    
    if (this.manual_checks_count > 0) {
      level += IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      level_sort =  1.5 + Math.round((100 - percentage));
    } 
    else {
      level_sort =  1 + Math.round((100 - percentage));    
    }
  }
  else {
    if (this.manual_checks_count > 0) {
      level = IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      level_sort =  1.5;
    }
  }
  
  this.implementation_level      = level;
  this.implementation_level_sort = level_sort;
  this.implementation_percentage = percentage;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("    LEVEL: " + this.implementation_level + "  level sort: " + this.implementation_level_sort);  

  return this.implementation_level;
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns implementation level of the group
 *
 * @return  {Number}  Number representing the implementation level of the rule 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.getImplementationLevel = function() {

  if (this.implementation_level === OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED) this.calculateImplementationLevel();

  return this.implementation_level;
  
};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns nls implementation level object for the implementation level of the group
 *
 * @return  {Object}  nls object representing the implementation level of the rule 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.getNLSImplementationLevel = function() {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = this.getImplementationLevel();

  var nls_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
  
  if (level !== IMPLEMENTATION_LEVEL.NOT_APPLICABLE && 
      level !== IMPLEMENTATION_LEVEL.RULE_DISABLED) {
    
    if (level !== IMPLEMENTATION_LEVEL.MANUAL_CHECKS) nls_level.label = this.implementation_percentage + "%";
    else nls_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(IMPLEMENTATION_LEVEL.NOT_APPLICABLE);    
  }  
  
  
  
  return nls_level;

};

/**
 * @method sortRuleResultsByImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Sorts filtered rule results items array by rule implementation level
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.sortRuleResultsByImplementationLevel = function() {

  var rule_results     = this.filtered_rule_results;
  var rule_results_len = rule_results.length;

  do {
    var swapped = false;
    for (var i = 1; i < rule_results_len; i++) {

//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Compare: " + rule_results[i-1].rule_result.implementation_level_sort + " < " + rule_results[i].rule_result.implementation_level_sort);  

      if (rule_results[i-1].rule_result.implementation_level_sort < rule_results[i].rule_result.implementation_level_sort || 
          (rule_results[i-1].rule_result.implementation_level_sort === rule_results[i].rule_result.implementation_level_sort &&
           rule_results[i-1].rule_result.manual_checks_count < rule_results[i].rule_result.manual_checks_count)) {
        // swap the values
        temp = rule_results[i-1];
        rule_results[i-1] = rule_results[i];
        rule_results[i] = temp;
        swapped = true;
      } 
      
    } // end loop
  } while (swapped);

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns an JSON representation of the rule category results 
 *
 * @param {String}  prefix           -  A prefix string typically spaces
 * @param {Boolean} flag (optional)  -  True (default) to include filtered node results, false to not include 
 *
 * @return  {String}  JSON string representing the report data 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.toJSON = function(prefix, flag) {

  if (typeof flag !== 'boolean') flag = true;
    
  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  
  
  var group_title = this.title;
  var group_id    = this.group_id;
  
  var ruleset_title   = this.ruleset.ruleset_title;
  var ruleset_version = this.ruleset.ruleset_version;
  var ruleset_id      = this.ruleset.ruleset_id;
  
  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  var json = "";
  
  var nls_level = this.getNLSImplementationLevel();

  json += prefix + "{";
  
  json += prefix + "  \"group_title\"   : \"" + OpenAjax.a11y.util.escapeForJSON(group_title) + "\",";
  json += prefix + "  \"group_id\"      : \"" + group_id + "\",";
  
  json += prefix + "  \"ruleset_title\"   : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_title) + "\",";
  json += prefix + "  \"ruleset_version\" : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_version) + "\",";
  json += prefix + "  \"ruleset_id\"      : \"" + ruleset_id + "\",";

  json += prefix + "  \"eval_title\"    : \"" + OpenAjax.a11y.util.escapeForJSON(eval_title) + "\",";
  json += prefix + "  \"eval_url\"      : \"" + OpenAjax.a11y.util.escapeForJSON(eval_url) + "\",";
  json += prefix + "  \"eval_date\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_date) + "\",";
  json += prefix + "  \"eval_time\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_time) + "\",";

  json += prefix + "  \"implementation\" : {";
  json += prefix + "    \"abbrev\" : \"" + nls_level.abbrev + "\",";
  json += prefix + "    \"label\"  : \"" + nls_level.label  + "\",";
  json += prefix + "    \"style\"  : \"" + nls_level.style  + "\",";
  json += prefix + "    \"sort\"   : \"" + this.implementation_level_sort  + "\",";
  json += prefix + "    \"pepr\"   : \"" + this.implementation_percentage  + "\"";
  json += prefix + "  },";
  
  json += prefix + "  \"nodes_filtered\"   : \"" + this.node_results_filtered_out + "\",";
  json += prefix + "  \"required_rules\"   : \"" + this.number_of_required_rules + "\",";
  json += prefix + "  \"recommened_rules\" : \"" + this.number_of_recommended_rules + "\",";
  
  json += prefix + "  \"passed_count\"        : \"" + this.passed_count + "\",";
  json += prefix + "  \"violations_count\"    : \"" + this.violations_count + "\",";
  json += prefix + "  \"warnings_count\"      : \"" + this.warnings_count + "\",";
  json += prefix + "  \"manual_checks_count\" : \"" + this.manual_checks_count + "\",";
  json += prefix + "  \"hidden_count\"        : \"" + this.hidden_count + "\",";
  
  json += prefix + "  \"rule_results\" : [";
  
  var results     = this.filtered_rule_results;
  var results_len = results.length;
  var comma_len   = results_len - 1;

  for (var i = 0; i < results_len; i++) {
    json += results[i].toJSON(prefix + "  ", flag); 
    if (i < comma_len) json += ",";
  }  
    
  json += prefix + "  ]\n";

  json += "}";

  return json; 

};


/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns an HTML representation of rule category results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the HTML for the report 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.toHTML = function(title) {

  var html = "";
  
  html += "<!DOCTYPE html>\n";
  html += "<html lang='en'>\n";
  html += "  <head>\n";
  html += "    <title>" + title + "</title>\n";
  html += "    <meta charset='ISO-8859-1' />\n";
  html += OpenAjax.a11y.report_css;
  html += "    <script type='text/javascript'>\n";
  html += "      var OAA_REPORT = {};\n";  
  html += "      OAA_REPORT.title = '" + OpenAjax.a11y.util.escapeForJSON(title) + "';\n";  
  html += "      OAA_REPORT.rule_category_data = " + this.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += OpenAjax.a11y.report_rule_category_view_js;
  html += "  </head>\n";
  html += OpenAjax.a11y.report_rule_category_view_body;
  html += "</html>\n";
  
  return html;
  
};

/**
 * @method toCSV
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns an CSV representation of the filtered cache item results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the CSV for the report 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.toCSV = function(title, header_flag) {

  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];
  
  if (eval_title.length > 30) eval_title = eval_title.slice(0,27) + "...";
    
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Title: " + title + " Header Flag: " + header_flag + " typeof: " + ((typeof header_flag !== 'boolean') || header_flag));  

  var csv = "";
  
  if ((typeof header_flag !== 'boolean') || header_flag) {
    csv += title + "\n\n";
    csv += "\"OAA ID\"";  
    csv += ",\"Element Description\""; 
    csv += ",\"Element id attribute\""; 
    csv += ",\"Element class attribute\""; 
    csv += ",\"Parent Landmark\""; 
    csv += ",\"Rule ID\"";
    csv += ",\"Type\"";
    csv += ",\"WCAG 2.0 Success Criterion\"";
    csv += ",\"WCAG 2.0 Level\"";
    csv += ",\"Severity\"";
    csv += ",\"Evaluation Result Message\"";
    csv += ",\"Evaluation Date\"";
    csv += ",\"Evaluation Time\"";
    csv += "\"URL Evaluated\"";
    csv += ",\"Title of URL Evaluated\"";
    csv += "\n";
  }  

  var results     = this.filtered_rule_results;
  var results_len = results.length;
  var comma_len   = results_len - 1;

  for (var i = 0; i < results_len; i++) {
                  
     var position = i+1;
            
     var result_item      = results[i];
     var node_results     = result_item.filtered_node_results;
     var node_results_len = node_results.length;
            
     for (var j = 0; j < node_results_len; j++) {
            
       var node_result = node_results[j];
       
       var dom_element = node_result.cache_item;
       
       if (typeof node_result.cache_item.dom_element ===  'object') dom_element = node_result.cache_item.dom_element;
       else dom_element = node_result.cache_item;
               
       csv += "\"" + node_result.cache_item.cache_id; 
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(node_result.cache_item.toString()); 
       csv += "\",\"" + dom_element.getId(); 
       csv += "\",\"" + dom_element.getClassName(); 
       csv += "\",\"" + dom_element.getParentLandmark(); 
       csv += "\",\"" + node_result.getNLSRuleId() + ": " + node_result.getRuleSummary();
       csv += "\",\"" + node_result.getNLSRuleType();
       csv += "\",\"" + node_result.getWCAG20SuccessCriterion();
       csv += "\",\"" + node_result.getNLSWCAG20Level();
       csv += "\",\"" + node_result.getNLSSeverityLabel();
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(node_result.getMessage());
       csv += "\",\"" + eval_date;
       csv += "\",\"" + eval_time;
       csv += "\",\"" + OpenAjax.a11y.util.escapeForJSON(eval_title);
       csv += "\",\"" + eval_url;
       csv += "\"\n";
               
    }
  }   

  return csv;
};



/* ---------------------------------------------------------------- */
/*                           FilteredRuleResult                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredRuleResult
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Represents one of the rule result in a group of rule results
 *          
 * @param  {RuleResult}  rule_result  - Rule result object for rule in a group
 *
 * @property {RuleResult}  rule_result           - Rule result object for rule in a group
 * @property {Array}       filtered_node_results - Filtered node results of the rule result object 
 * @property {Boolean}     has_node_results      - Boolean indicating if the rule has an results
 * @property {Number}      filtered_count        - Number of node results that have been filtered from the list
 */

 OpenAjax.a11y.cache.FilteredRuleResult = function(rule_result) {

  this.rule_result = rule_result;
  
  this.cache_id = rule_result.cache_id;
  
  this.filtered_node_results = [];

  this.node_results_filtered_out = 0;
  
  this.violations_count    = 0;
  this.manual_checks_count = 0;
  this.warnings_count      = 0;
  this.passed_count        = 0;
  this.total_count         = 0;  // does not include node results than are hidden
  
  this.hidden_count        = 0;
  
  this.has_node_results = false;

};

/**
 * @method getFilteredNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResult
 *
 * @desc Populated the filtered node results array with the nodes defined by the filter  
 *          
 * @param {Number} filter  -  Number representing the types of results to include in the array
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.getFilteredNodeResults = function(filter) {

  function addNodeResultsPage(node_results) {  
  
    var node_results_len = node_results.length;
    var count = 0;
    
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
      if (node_result.isScopePage()) {
        filtered_node_results.push(node_result);
        count++;
      }  
    }
    
    return count;
  }

  function addNodeResultsElement(node_results) {  
  
    var node_results_len = node_results.length;
    var count = 0;
    
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
      if (node_result.isScopeElement()) {
        filtered_node_results.push(node_result);
        count++;
      }  
    }
    
    return count;
  }

  function addNodeResults(node_results) {  
  
    var node_results_len = node_results.length;
    
    for (var i = 0; i < node_results_len; i++) filtered_node_results.push(node_results[i]);
    
    return node_results_len;
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;
  
  var filtered_node_results = this.filtered_node_results;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  if (all_flag || (RESULT_FILTER.VIOLATION    & filter)) this.violations_count    += addNodeResults(this.rule_result.node_results_violations);
  if (all_flag || (RESULT_FILTER.PAGE_MANUAL_CHECK & filter))    this.manual_checks_count += addNodeResultsPage(this.rule_result.node_results_manual_checks);
  if (all_flag || (RESULT_FILTER.ELEMENT_MANUAL_CHECK & filter)) this.manual_checks_count += addNodeResultsElement(this.rule_result.node_results_manual_checks);
  if (all_flag || (RESULT_FILTER.WARNING      & filter)) this.warnings_count      += addNodeResults(this.rule_result.node_results_warnings);
  if (all_flag || (RESULT_FILTER.PASS         & filter)) this.passed_count        += addNodeResults(this.rule_result.node_results_passed);
  if (all_flag || (RESULT_FILTER.HIDDEN       & filter)) this.hidden_count        += addNodeResults(this.rule_result.node_results_hidden);     
  
  this.has_node_results = (filtered_node_results > 0);

  this.total_count = filtered_node_results.length;
  
  this.node_results_filtered_out = this.rule_result.total_count - this.total_count + this.rule_result.node_results_hidden.length;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Rule Result " + this.rule_result.getNLSRuleId() + " Total Manual Results: " + this.manual_checks_count );  

};


/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResult
 *
 * @desc Returns implementation level of the rule result
 *
 * @return  {Object}  nls object representing the implementation level of the rule 
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.getImplementationLevel = function() {

  return this.rule_result.getImplementationLevel();

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResult
 *
 * @desc Returns nls implementation level object for the rule result
 *
 * @return  {Object}  nls object representing the implementation level of the rule result 
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.getNLSImplementationLevel = function() {

  return this.rule_result.getNLSImplementationLevel();

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResult
 *
 * @desc Returns a JSON representation of the cache item 
 *          
 * @param {String}  prefix  -  A prefix string typically spaces
 * @param {Boolean} flag    -  
 *
 * @return  {String}  String representing the cache item result object
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.toJSON = function(prefix, flag) {

  if (typeof flag !== 'boolean') flag = true;

  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else {
    next_prefix = prefix + "  ";  
    next_prefix_2 = next_prefix + "  ";  
  }  

  var i;
  var json = "";
  
  var nls_level = this.getNLSImplementationLevel();
  
  json += prefix + "{ \"rule_id\"         : \""   + this.rule_result.getRule().rule_id + "\",";
  json += prefix + "  \"definition\"      : \"" + OpenAjax.a11y.util.escapeForJSON(this.rule_result.getRuleDefinition()) + "\",";
  json += prefix + "  \"summary\"         : \"" + OpenAjax.a11y.util.escapeForJSON(this.rule_result.getRuleSummary()) + "\",";
  json += prefix + "  \"nls_rule_id\"     : \"" + this.rule_result.getNLSRuleId() + "\",";
  json += prefix + "  \"rule_type\"       : "   + this.rule_result.getRuleType() + ",";
  json += prefix + "  \"nls_rule_type\"   : \"" + this.rule_result.getNLSRuleType() + "\",";
  json += prefix + "  \"wcag_level\"      : \"" + this.rule_result.getNLSWCAG20Level() + "\",";
  json += prefix + "  \"wcag_primary_id\" : \"" + OpenAjax.a11y.util.escapeForJSON(this.rule_result.getWCAG20SuccessCriterion()) + "\",";

  json += prefix + "  \"implementation\" : {";
  json += prefix + "    \"abbrev\" : \"" + nls_level.abbrev + "\",";
  json += prefix + "    \"label\"  : \"" + nls_level.label  + "\",";
  json += prefix + "    \"style\"  : \"" + nls_level.style  + "\",";
  json += prefix + "    \"sort\"   : \"" + this.rule_result.implementation_level_sort  + "\",";
  json += prefix + "    \"pepr\"   : \"" + this.rule_result.implementation_percentage  + "\"";
  json += prefix + "  },";

  json += prefix + "  \"violations\"    : "  + this.violations_count  + ",";
  json += prefix + "  \"manual_checks\" : "  + this.manual_checks_count  + ",";
  json += prefix + "  \"warnings\"      : "  + this.warnings_count  + ",";
  json += prefix + "  \"passed\"        : "  + this.passed_count  + ",";
  json += prefix + "  \"hidden\"        : "  + this.hidden_count  + ",";
  json += prefix + "  \"total\"         : "  + this.total_count  + ",";
  
  
  if (flag) {
    json += prefix + "  \"filtered\"      : "  + this.node_results_filtered_out  + ",";

    var node_results     = this.filtered_node_results;
    var node_results_len = node_results.length;
    var comma_count      = node_results_len - 1;
  
    json += prefix + "  \"node_results\" : [";
    for (i = 0; i < this.total_count; i++) {
      json += this.filtered_node_results[i].toJSON(next_prefix);
      if (i < comma_count) json += ",";
    }  
    json += prefix + "  ]";
  }  
  
  json += prefix + "}";

  return json;

};


