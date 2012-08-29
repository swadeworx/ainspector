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
/*                      FilteredRuleGroupResults                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredRuleGroupResults
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of cache items associated with a rule category 
 *       The cache items returned can be filtered by the tpe of evaluation result 
 *
 * @param  {Object}  ruleset  - ruleset and evaluation results used to generate the filtered results
 *
 * @property  {Boolean} is_tree      - At least one of the FilteredRuleResults contains child items
 * @property  {Object}  dom_cache      - dom cache to use in generating filtered results 
 * 
 * @property  {Array}   cache_item_results        - list of top level cache item results
 * @property  {Number}  number_of_cache_items_filtered  - number of elements in the rule category that were filtered out
 *                                                - of the elements in the cache item results array
 */

 OpenAjax.a11y.cache.FilteredRuleGroupResults = function(ruleset) {

  this.is_tree = false;
  this.ruleset = ruleset;
  this.dom_cache = ruleset.dom_cache;
  this.number_of_cache_items_filtered = 0;
  
  this.cache_item_results = [];
  
  
};

/**
 * @method getFilteredRuleResults
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 *
 * @desc Constructs a data structure of cache items associated with a rule category 
 *       The cache items returned can be filtered by the tpe of evaluation result 
 *          
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 */

 OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.getFilteredRuleResults = function(rule_category, filter) {

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("filter 1: " + filter + " " + rule_category);

  var total;

  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;

  this.cache_item_results = [];
  
  var ci_result = null;
  
  switch (rule_category) {
  
  case RULE_CATEGORIES.AUDIO_VIDEO:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.media_cache.media_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.CONTROLS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, rule_category, filter);    
    break;

  case RULE_CATEGORIES.HEADINGS_LANDMARKS:
    var cache =  this.dom_cache.headings_landmarks_cache;
    
    if (cache.title_element) { 
      ci_result = this.getFilteredFilteredRuleResult(cache.title_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    if (cache.page_element)  { 
      ci_result = this.getFilteredFilteredRuleResult(cache.page_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }
    
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(cache.child_cache_elements, rule_category, filter);

    break;

  case RULE_CATEGORIES.CONTENT_IN_LANDMARKS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.headings_landmarks_cache.elements_with_content, rule_category, filter);
    break;

  case RULE_CATEGORIES.IMAGES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.images_cache.image_elements, rule_category, filter);    
    break;

  case RULE_CATEGORIES.LINKS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.links_cache.link_elements, rule_category, filter);    
    break;

  case RULE_CATEGORIES.TABLES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.tables_cache.child_cache_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.ALL_CATEGORIES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.element_cache.dom_elements, rule_category, filter);
    break;

  default:
    break;  
    

  }
  
};

/**
 * @method getFilteredFilteredRuleResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Object}  cache_item    - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Filter for returning items with node results of a 
 *                                    particular type(s)
 *
 * @return {FilteredRuleResult}  New cache item result
 */
 
OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.getFilteredFilteredRuleResult = function(cache_item, rule_category, filter) {

  function severityLevelFilter(result_filter, node_results) {
    var node_results_len = node_results.length;
    var count = 0;
      
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
           
      if (node_result.getRuleCategory() & rule_category) {
        if (filter & result_filter) { 
          ci_result.node_results.push(node_result);
          count += 1;
          OpenAjax.a11y.cache.FilteredRuleGroupResults.add_flag = true;
        }
        else {
          ci_result.number_of_node_results_filtered += 1;
        }
      }
    }
    
    return count;
    
  } // end function 

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var de = null;
    
  if (typeof cache_item.dom_element  != 'undefined') de = cache_item.dom_element;
  else de = cache_item;
    
  if (!de) return null;
    
  var ci_result = new OpenAjax.a11y.cache.FilteredRuleResult(cache_item);
    
  ci_result.violations_count    += severityLevelFilter(RESULT_FILTER.VIOLATION,    de.rules_violations);
  ci_result.warnings_count      += severityLevelFilter(RESULT_FILTER.WARNING,      de.rules_warnings);
  ci_result.manual_checks_count += severityLevelFilter(RESULT_FILTER.MANUAL_CHECK, de.rules_manual_checks);
  ci_result.passed_count        += severityLevelFilter(RESULT_FILTER.PASS,         de.rules_passed);
  ci_result.hidden_count        += severityLevelFilter(RESULT_FILTER.HIDDEN,       de.rules_hidden);

  return ci_result;
};

/**
 * @method filterCacheItemsByNodeResultsFromList
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}   cache_items    - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Filter for returning items with node results of a 
 *                                    particular type(s)  
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */
 
OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.filterCacheItemsByNodeResultsFromList = function(cache_items, rule_category, filter) {

  this.is_tree = false;

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var cache_items_len = cache_items.length;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  var count = 0;
  
  for (var i = 0; i < cache_items_len; i++) {
  
    var ci = cache_items[i];
    
    OpenAjax.a11y.cache.FilteredRuleGroupResults.add_flag = (filter === RESULT_FILTER.ALL);

    var ci_result = this.getFilteredFilteredRuleResult(ci, rule_category, filter);
    
    if (ci_result && OpenAjax.a11y.cache.FilteredRuleGroupResults.add_flag || all_flag) this.cache_item_results.push(ci_result);
    else count++;
    
  } 

  return count;
};  

/**
 * @method filterCacheItemsByNodeResultsFromTree
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}  cache_items  - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter       - Filter for returning items with node results of a 
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */
 
OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.filterCacheItemsByNodeResultsFromTree = function(cache_items, rule_category, filter) {

  function traverseCacheItems(cache_item_result, cache_item) {
  
//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI result: " + cache_item_result + "      cache item: " + cache_item );
    
    OpenAjax.a11y.cache.FilteredRuleGroupResults.add_flag = all_flag;

    var ci_result = getFilteredFilteredRuleResult(cache_item, rule_category, filter);

    if (OpenAjax.a11y.cache.FilteredRuleGroupResults.add_flag) {
      if (cache_item_result && all_flag) {
        cache_item_result.addChildFilteredRuleResult(ci_result);
        is_tree = true;
      } else {
        cache_items_results.push(ci_result);
      }  
    }
    else {
      filtered_count++;
      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Filtered Count: " + filtered_count);
    }

    var child_cache_elements     = [];
    var child_cache_elements_len = 0;

    if (cache_item.child_cache_elements) child_cache_elements = cache_item.child_cache_elements;
    else if (cache_item.child_dom_elements) child_cache_elements = cache_item.child_dom_elements;

    child_cache_elements_len = child_cache_elements.length;

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("CI Result: " + ci_result + "   flag: " + flag + "   children: " + child_cache_elements_len);

    for (var i = 0; i < child_cache_elements_len; i++) {
      var ci = child_cache_elements[i];
      if (filter === OpenAjax.a11y.RESULT_FILTER.ALL) traverseCacheItems(ci_result, ci);
      else traverseCacheItems(null, ci);
    }
  } // end function


  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  this.is_tree = false;  
  var is_tree = false;
  
  var filtered_count = 0;
  
  var getFilteredFilteredRuleResult = this.getFilteredFilteredRuleResult;

  var cache_items_results = this.cache_item_results;

  var cache_items_len = cache_items.length;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  for (var i = 0; i < cache_items_len; i++) {
    var ci = cache_items[i];
    traverseCacheItems(null, ci);
  } 
  
  if (is_tree) this.is_tree = true;
  
  return filtered_count;
};  

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 *
 * @desc Returns an JSON representation of the filtered cache item results 
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  JSON string representing the report data 
 */

OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  
  
  var date = new Date();
    
  var json = "";

  json += "{";

  json += prefix + "  'url'    : " + this.ruleset.url + ",";
  json += prefix + "  'title'  : " + this.ruleset.title + ",";
  json += prefix + "  'date'   : '" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + "',";
  json += prefix + "  'time'   : '" + date.getHours() + ":" + date.getMinutes() + "',";

  if (this.is_tree) json += prefix + "  'is_tree' : true,";
  else json += prefix + "  'is_tree' : false,";

  json += prefix + "  'filtered'  : " + this.number_of_cache_items_filtered + ",";
  
  json += prefix + "  'results' : [";
  for (var i = 0; i < this.cache_item_results.length; i++) json += this.cache_item_results[i].toJSON(next_prefix);
  json += prefix + "  ]";

  json += prefix + "}";
  
//  this.cache_item_results = [];

  return json; 

};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleGroupResults
 *
 * @desc Returns an HTML representation of the filtered cache item results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the HTML for the report 
 */

OpenAjax.a11y.cache.FilteredRuleGroupResults.prototype.toHTML = function(title) {

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
 * @desc Represents one of the cache items in a cache items filter result object
 *          
 * @param  {CacheItem}  cache_item  - cache item to be included in filtered results
 *
 * @property {Object}  cache_item  - Cache item object
 *
 * @property {Array}  node_results - Filtered node results of the cache item 
 *
 * @property {Number}  has_results          - True if the element has any node results after filtering
 * @property {Number}  total_count          - Total number of rule results
 *
 * @property {Number}  violations_count     - Number of rule results with severity of 'Violation'
 * @property {Number}  manual_checks_count  - Number of rule results with severity of 'Manual Check'
 * @property {Number}  warnings_count       - Number of rule results with severity of 'Warning'
 * @property {Number}  passed_count         - Number of rule results with severity of 'Passed'
 * @property {Number}  hidden _count        - Number of rule results with severity of 'Hidden'
 *
 * @property {Number}  number_of_node_results_filtered  - Number of node results that have been filtered from the list
 *
 * @property {Array}   children             - Array of cache item result objects  
 */

 OpenAjax.a11y.cache.FilteredRuleResult = function(cache_item) {

  this.cache_item = cache_item;
  
  this.node_results     = [];

  this.number_of_node_results_filtered = 0;

  // total_count could be changed to has_results (boolean) 
  this.total_count         = 0;
  this.has_results         = false;
  
  this.violations_count    = 0;
  this.manual_checks_count = 0;
  this.warnings_count      = 0;
  this.passed_count        = 0;
  this.hidden_count        = 0;
  
  this.children = [];

};

/**
 * @method addChildFilteredRuleResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredRuleResult
 *
 * @desc Adds a cache item result to the children list of a cache item result object 
 *          
 * @param  {CacheItem Object}  cache_item  - cache item to be included in filtered results
 */

OpenAjax.a11y.cache.FilteredRuleResult.prototype.addChildFilteredRuleResult = function(cache_item) {

  if (cache_item) { 
    this.children.push(cache_item);
    this.total_count += 1;
    this.has_results = true;
  }  

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
  
  json += prefix + "{ 'cache_item'    : '" + this.cache_item.toString() + "',";
  json += prefix + "  'violations'    : "  + this.violations_count  + ",";
  json += prefix + "  'manual_checks' : "  + this.manual_checks_count  + ",";
  json += prefix + "  'warnings'      : "  + this.warnings_count  + ",";
  json += prefix + "  'passed'        : "  + this.passed_count  + ",";
  json += prefix + "  'hidden'        : "  + this.hidden_count  + ",";
  json += prefix + "  'total'         : "  + this.total_count  + ",";
  
  json += prefix + "  'filtered       : "  + this.number_of_node_results_filtered  + ",";

  if (this.node_results.length > 0) {
    json += prefix + "  'node_results' : [";
    for (i = 0; i < this.node_results.length; i++) json += this.node_results[i].toJSON(next_prefix);
    json += prefix + "  ],";
  }
  else {
    json += prefix + "  'node_results' : [],";
  }

  if (this.children.length > 0) {
    json += prefix + "  'children' : [";
    for (i = 0; i < this.children.length; i++) json += this.children[i].toJSON(next_prefix_2);
    json += prefix + "  ]";
  }
  else {  
    json += prefix + "  'children' : []";
  }
  
  json += prefix + "}";

  return json;

};
