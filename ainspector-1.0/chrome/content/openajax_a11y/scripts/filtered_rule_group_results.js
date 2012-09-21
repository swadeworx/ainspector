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
 * @param  {String}  group_id  - id used to identify this grouping of rules
 * @param  {String}  title     - Human readible title used 
 *
 * @property  {FilteredRuleResultsGroup}  filtered_rule_results_groups  - array of filtered 
 * 
 */

 OpenAjax.a11y.cache.FilteredRuleResultsGroups = function(group_id, title) {

  this.filtered_rule_results_groups = [];
  
  this.group_id = group_id;
  this.cache_id = group_id;
  
  this.title = title;
  
  this.implementation_level      = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_level_sort = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_percentage = 0;
  this.manual_check_count        = 0;
  
  this.node_results_filtered_out = 0;
  
  this.number_of_required_rules = 0;
  this.number_of_recommended_rules = 0;
  this.number_of_rules_not_included = 0;

  this.number_of_nodes_pass          = 0;
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
    
    if (this.manual_checks_count > 0) {
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
      this.implementation_level_sort =  1.5;
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
 * @param  {String}  group_id  - Group id for rule results group
 * @param  {String}  title     - Title for rule results group
 * @param  {Object}  ruleset   - ruleset and evaluation results used to generate the filtered results
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup = function(group_id, title, ruleset) {

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
 * @desc Returns an JSON representation of the filtered cache item results 
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  JSON string representing the report data 
 */

OpenAjax.a11y.cache.FilteredRuleResultsGroup.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  
  
  var date = new Date();
    
  var json = "";

  return json; 

};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResultsGroup
 *
 * @desc Returns an HTML representation of the filtered cache item results 
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
  html += "    <script type='text/javascript'>\n";
  html += "      result_data = " + this.toJSON("\n      ") + ";\n\n";
  html += "      ruleset = " + this.ruleset.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += "  </head>\n";
  html += "  <body>\n";
  html += "    <h1>" + title + "</h1>\n";
  html += "  </body>\n";
  html += "</html>\n";
  
  return html;
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

  function addNodeResults(node_results) {  
  
    var node_results_len = node_results.length;
    
    for (var i = 0; i < node_results_len; i++) filtered_node_results.push(node_results[i]);
    
    return node_results_len;
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;
  
  var filtered_node_results = this.filtered_node_results;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  if (all_flag || (RESULT_FILTER.VIOLATION    & filter)) this.violations_count    += addNodeResults(this.rule_result.node_results_violations);
  if (all_flag || (RESULT_FILTER.MANUAL_CHECK & filter)) this.manual_checks_count += addNodeResults(this.rule_result.node_results_manual_checks);
  if (all_flag || (RESULT_FILTER.WARNING      & filter)) this.warnings_count      += addNodeResults(this.rule_result.node_results_warnings);
  if (all_flag || (RESULT_FILTER.PASS         & filter)) this.passed_count        += addNodeResults(this.rule_result.node_results_passed);
  if (all_flag || (RESULT_FILTER.HIDDEN       & filter)) this.hidden_count        += addNodeResults(this.rule_result.node_results_hidden);     
  
  this.has_node_results = this.filtered_node_results > 0;

  this.total_count = this.filtered_node_results.length;
  
  this.node_results_filtered_out = this.rule_result.total_count - (this.total_count - this.hidden_count);  // hidden count chould not be included in total

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Rule Result " + this.rule_result.getRuleSummary() + " Total manual checks: " + this.rule_result.node_results_manual_checks.length );  

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
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  String representing the cache item result object
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.toJSON = function(prefix) {

  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else {
    next_prefix = prefix + "  ";  
    next_prefix_2 = next_prefix + "  ";  
  }  

  var i;
  var json = "";
  
  json += prefix + "{ \"rule_id\"       : \"" + this.rule_result.getRule().rule_id + "\",";
  json += prefix + "  \"violations\"    : "  + this.violations_count  + ",";
  json += prefix + "  \"manual_checks\" : "  + this.manual_checks_count  + ",";
  json += prefix + "  \"warnings\"      : "  + this.warnings_count  + ",";
  json += prefix + "  \"passed\"        : "  + this.passed_count  + ",";
  json += prefix + "  \"hidden\"        : "  + this.hidden_count  + ",";
  json += prefix + "  \"total\"         : "  + this.total_count  + ",";
  
  json += prefix + "  \"filtered\"      : "  + this.node_results_filtered_out  + ",";

  if (this.total_count > 0) {
    json += prefix + "  \"node_results\" : [";
    for (i = 0; i < this.total_count; i++) json += this.filtered_node_results[i].toJSON(next_prefix);
    json += prefix + "  ],";
  }
  else {
    json += prefix + "  \"node_results\" : [],";
  }
  
  json += prefix + "}";

  return json;

};
