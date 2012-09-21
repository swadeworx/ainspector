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
/*    Utility functions for FilteredCacheItemResults object         */
/* ---------------------------------------------------------------- */

/**
 * @method getFilteredCacheItemResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Object}  cache_item    - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 *
 * @return {CacheItemResult}  New cache item result
 */
 
OpenAjax.a11y.cache.getFilteredCacheItemResult = function(cache_item, rule_category, filter) {

  function severityLevelFilter(result_filter, node_results) {
    var node_results_len = node_results.length;
    var count = 0;
      
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
           
      if (node_result.getRuleCategory() & rule_category) {
        if (filter & result_filter) { 
          ci_result.node_results.push(node_result);
          count += 1;
          OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = true;
        }
        else {
          ci_result.number_of_node_results_filtered += 1;
        }
      }
    }
    
    return count;
    
  } // end function 

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;
    
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("CACHE ITEM: " + cache_item + " FILTER: " + filter);
  
  var de = null;
    
  if (typeof cache_item.dom_element  != 'undefined') de = cache_item.dom_element;
  else de = cache_item;
    
  if (!de) return null;
    
  var ci_result = new OpenAjax.a11y.cache.CacheItemResult(cache_item);
    
  ci_result.violations_count    += severityLevelFilter(RESULT_FILTER.VIOLATION,    de.rules_violations);
  ci_result.warnings_count      += severityLevelFilter(RESULT_FILTER.WARNING,      de.rules_warnings);
  ci_result.manual_checks_count += severityLevelFilter(RESULT_FILTER.MANUAL_CHECK, de.rules_manual_checks);
  ci_result.passed_count        += severityLevelFilter(RESULT_FILTER.PASS,         de.rules_passed);
  ci_result.hidden_count        += severityLevelFilter(RESULT_FILTER.HIDDEN,       de.rules_hidden);

  return ci_result;
};

/* ---------------------------------------------------------------- */
/*                      FilteredCacheItemResults                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor FilteredCacheItemResults
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of cache items associated with a rule category 
 *       The cache items returned can be filtered by the tpe of evaluation result 
 *
 * @param  {Object}  ruleset  - ruleset and evaluation results used to generate the filtered results
 *
 * @property  {Boolean} is_tree      - At least one of the CacheItemResults contains child items
 * @property  {Object}  dom_cache      - dom cache to use in generating filtered results 
 * 
 * @property  {Array}   cache_item_results        - list of top level cache item results
 * @property  {Number}  number_of_cache_items_filtered  - number of elements in the rule category that were filtered out
 *                                                - of the elements in the cache item results array
 */

 OpenAjax.a11y.cache.FilteredCacheItemResults = function(ruleset) {

  this.is_tree = false;
  this.ruleset = ruleset;
  this.dom_cache = ruleset.dom_cache;
  this.number_of_cache_items_filtered = 0;
  
  this.rule_category = OpenAjax.a11y.RULE_CATEGORIES.UNDEFINED;
  this.filter = OpenAjax.a11y.RESULT_FILTER.ALL;
  
  this.filter_count = 0;
  
  this.cache_item_results = [];
  
  this.all_flag = false;

};

/**
 * @method getCacheItemResults
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 *
 * @desc Constructs a data structure of cache items associated with a rule category 
 *       The cache items returned can be filtered by the tpe of evaluation result 
 *          
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 */

 OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.getCacheItemResults = function(rule_category, filter) {

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("FILTER: " + filter + " RULE CATEGORY: " + rule_category);

  var total;

  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;

  this.rule_category = rule_category;
  this.filter = filter;

  this.cache_item_results = [];
  
  var ci_result = null;
  
  switch (rule_category) {
  
  case RULE_CATEGORIES.AUDIO_VIDEO:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.media_cache.media_elements);
    break;

  case RULE_CATEGORIES.CONTROLS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.controls_cache.child_cache_elements);    
    break;

  case RULE_CATEGORIES.HEADINGS_LANDMARKS:
    var cache =  this.dom_cache.headings_landmarks_cache;
    
    if (cache.title_element) { 
      ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache.title_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    if (cache.page_element)  { 
      ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache.page_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }
    
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(cache.child_cache_elements);

    break;

  case RULE_CATEGORIES.CONTENT_IN_LANDMARKS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.headings_landmarks_cache.elements_with_content);
    break;

  case RULE_CATEGORIES.IMAGES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.images_cache.image_elements);    
    break;

  case RULE_CATEGORIES.LINKS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.links_cache.link_elements);    
    break;

  case RULE_CATEGORIES.TABLES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.tables_cache.child_cache_elements);
    break;

  case RULE_CATEGORIES.ALL_CATEGORIES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.element_cache.dom_elements);
    break;

  default:
    break;  
    

  }
  
};



/**
 * @method traverseCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns a nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}  cache_items  - Array of cache element items
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.filterCacheItemsByNodeResultsFromList = function(cache_items) {

  this.is_tree = false;

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var cache_items_len = cache_items.length;
  
  this.all_flag = (this.filter === RESULT_FILTER.ALL);
  
  var count = 0;
  
  for (var i = 0; i < cache_items_len; i++) {
  
    var ci = cache_items[i];
    
    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = (this.filter === RESULT_FILTER.ALL);

    var ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(ci, this.rule_category, this.filter);
    
    if (ci_result && OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag || this.all_flag) this.cache_item_results.push(ci_result);
    else count++;

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI item: " + i  + "  cache item result length: " + this.cache_item_results.length);

  } 
 
  return count;
};  

  

/**
 * @method filterCacheItemsByNodeResultsFromTree
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}  cache_items  - Array of cache element items
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.filterCacheItemsByNodeResultsFromTree = function(cache_items) {

   function traverseCacheItems(cache_item_result, cache_item) {
  
//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI result: " + cache_item_result + "      cache item: " + cache_item );
    
    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = all_flag;

    var ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache_item, rule_category, filter);

    if (OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag) {
      if (cache_item_result && this.all_flag) {
        cache_item_result.addChildCacheItemResult(ci_result);
        is_tree = true;
      } else {
        cache_item_results.push(ci_result);
      }  
    }
    else {
      this.filtered_count++;
//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Filtered Count: " + filtered_count);
    }

    var child_cache_elements     = [];
    var child_cache_elements_len = 0;
    
    if (cache_item.child_cache_elements) child_cache_elements = cache_item.child_cache_elements;
    else if (cache_item.child_dom_elements) child_cache_elements = cache_item.child_dom_elements;

    child_cache_elements_len = child_cache_elements.length;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("CI Result: " + ci_result + "   flag: " + flag + "   children: " + child_cache_elements_len);

    for (var i = 0; i < child_cache_elements_len; i++) {
      var ci = child_cache_elements[i];
      if (this.filter === OpenAjax.a11y.RESULT_FILTER.ALL) traverseCacheItems(ci_result, ci);
      else traverseCacheItems(null, ci);
    }
    
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  this.is_tree = false;  
  var is_tree = false;
  
  this.filtered_count = 0;

  var filter = this.filter;
  var rule_category = this.rule_category;
  
  var cache_item_results = this.cache_item_results;

  var cache_items_len = cache_items.length;
  
  var all_flag = (this.filter === RESULT_FILTER.ALL);
  
  for (var i = 0; i < cache_items_len; i++) {
    var ci = cache_items[i];
    traverseCacheItems(null, ci);
  } 
  
  if (is_tree) this.is_tree = true;
  
  return this.filtered_count;
};  

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 *
 * @desc Returns an JSON representation of the filtered cache item results 
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  JSON string representing the report data 
 */

OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.toJSON = function(prefix) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  
  
  var date = new Date();
    
  var json = "";

  json += "{";

  json += prefix + "  \"url\"    : \"" + OpenAjax.a11y.util.escapeForJSON(this.ruleset.url) + "\",";
  json += prefix + "  \"title\"  : \"" + OpenAjax.a11y.util.escapeForJSON(this.ruleset.title) + "\",";
  json += prefix + "  \"date\"   : \"" + date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + "\",";
  json += prefix + "  \"time\"   : \"" + date.getHours() + ":" + date.getMinutes() + "\",";

  if (this.is_tree) json += prefix + "  \"is_tree\" : true,";
  else json += prefix + "  \"is_tree\" : false,";

  json += prefix + "  \"filtered\"  : " + this.number_of_cache_items_filtered + ",";
  
  json += prefix + "  \"results\" : [";
  
  var ci_results = this.cache_item_results;
  var ci_results_len = ci_results.length;
  var ci_results_last = ci_results_len - 1;
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Number of cache results: " + ci_results.length);

  for (var i = 0; i < ci_results_len; i++) {

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  " + i + ": " + ci_results[i].cache_item.cache_id);

    json += ci_results[i].toJSON(next_prefix);
    
    if (i !== ci_results_last) json += ",";
  }  
  json += prefix + "  ]";

  json += prefix + "}";
  
  return json; 

};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 *
 * @desc Returns an HTML representation of the filtered cache item results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the HTML for the report 
 */

OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.toHTML = function(title) {

  var html = "";
  
  html += "<!DOCTYPE html>\n";
  html += "<html xml:lang='en' lang='en'>\n";
  html += "  <head>\n";
  html += "    <title>" + title + "</title>\n";
  html += "    <meta charset='ISO-8859-1' />\n";
  html += OpenAjax.a11y.reportCSS;
  html += "    <script type='text/javascript'>\n";
  html += "      var OAA_REPORT = {};\n";  
  html += "      OAA_REPORT.title = '" + OpenAjax.a11y.util.escapeForJSON(title) + "';\n";  
  html += "      OAA_REPORT.result_data = " + this.toJSON("\n      ") + ";\n\n";
  html += "      OAA_REPORT.ruleset = " + this.ruleset.toJSON("\n      ", this.rule_category) + ";\n\n";
  html += "      OAA_REPORT.wcag20  = " + this.ruleset.wcag20_nls.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += OpenAjax.a11y.reportJS;
  html += "  </head>\n";
  html += OpenAjax.a11y.reportBodyCacheItems;
  html += "</html>\n";
  
  return html;
};


/* ---------------------------------------------------------------- */
/*                           CacheItemResult                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor CacheItemResult
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

 OpenAjax.a11y.cache.CacheItemResult = function(cache_item) {

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
 * @method addChildCacheItemResult
 *
 * @memberOf OpenAjax.a11y.cache.CacheItemResult
 *
 * @desc Adds a cache item result to the children list of a cache item result object 
 *          
 * @param  {CacheItem Object}  cache_item  - cache item to be included in filtered results
 */

OpenAjax.a11y.cache.CacheItemResult.prototype.addChildCacheItemResult = function(cache_item) {

  if (cache_item) { 
    this.children.push(cache_item);
    this.total_count += 1;
    this.has_results = true;
  }  

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.cache.CacheItemResult
 *
 * @desc Returns a JSON representation of the cache item 
 *          
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return  {String}  String representing the cache item result object
 */

OpenAjax.a11y.cache.CacheItemResult.prototype.toJSON = function(prefix) {

  var next_prefix = "";
  var next_prefix_2 = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else {
    next_prefix = prefix + "  ";  
    next_prefix_2 = next_prefix + "  ";  
  }  

  var i;
  var json = "";
  
  json += prefix + "{ \"cache_item\"    : \"" + OpenAjax.a11y.util.escapeForJSON(this.cache_item.toString()) + "\",";
  json += prefix + "  \"cache_id\"      : \"" + this.cache_item.cache_id + "\",";
  json += prefix + "  \"violations\"    : "  + this.violations_count  + ",";
  json += prefix + "  \"manual_checks\" : "  + this.manual_checks_count  + ",";
  json += prefix + "  \"warnings\"      : "  + this.warnings_count  + ",";
  json += prefix + "  \"passed\"        : "  + this.passed_count  + ",";
  json += prefix + "  \"hidden\"        : "  + this.hidden_count  + ",";
  json += prefix + "  \"total\"         : "  + this.total_count  + ",";
  
  json += prefix + "  \"filtered\"      : "  + this.number_of_node_results_filtered  + ",";

  if (this.node_results.length > 0) {
    json += prefix + "  \"node_results\" : [";
    
    var n_results      = this.node_results;
    var n_results_len  = n_results.length;
    var n_results_last = n_results_len - 1;
    
    for (i = 0; i < n_results_len; i++) {
      json += this.node_results[i].toJSON(next_prefix);
      if (i !== n_results_last) json += ","; 
    }  
    json += prefix + "  ],";
  }
  else {
    json += prefix + "  \"node_results\" : [],";
  }

  if (this.children.length > 0) {
    json += prefix + "  \"children\" : [";
    
    var children      = this.children;
    var children_len  = children.length;
    var children_last = children_len - 1;
    
    for (i = 0; i < children_len; i++) {
      json += this.children[i].toJSON(next_prefix_2);
      if (i !== children_last) json += ','; 
    }  
    json += prefix + "  ]";
  }
  else {  
    json += prefix + "  \"children\" : []";
  }
  
  json += prefix + "}";

  return json;

};
