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

  function severityLevelFilterManualCheck(result_filter, node_results) {
    var node_results_len = node_results.length;
    var count = 0;
      
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
           
      if (node_result.getRuleCategory() & rule_category) {

        OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("NODE RESULT: " + node_result + " PAGE: " + node_result.isScopePage() + " ELEMENT: " + node_result.isScopeElement() + " FILTER: " + result_filter + " ADD: " + (filter & result_filter));

        if (filter & result_filter) {
          if (result_filter === RESULT_FILTER.PAGE_MANUAL_CHECK && 
              node_result.isScopePage()) { 
            ci_result.node_results.push(node_result);
            count += 1;
//            OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = true;
          }
          else {
            if (result_filter === RESULT_FILTER.ELEMENT_MANUAL_CHECK && 
                node_result.isScopeElement()) { 
              ci_result.node_results.push(node_result);
              count += 1;
//              OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = true;
            }
            else {
            
              ci_result.number_of_node_results_filtered += 1;
            }
          }
        }
//        else {
//          ci_result.number_of_node_results_filtered += 1;
//        }
      }
    }
    
    return count;
    
  } // end function 

  function severityLevelFilter(result_filter, node_results) {
    var node_results_len = node_results.length;
    var count = 0;
      
    for (var i = 0; i < node_results_len; i++) {
      var node_result = node_results[i];
           
      if (node_result.getRuleCategory() & rule_category) {
        if (filter & result_filter) { 
          ci_result.node_results.push(node_result);
          count += 1;
//          OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = true;
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
    
  ci_result.violations_count    += severityLevelFilter(RESULT_FILTER.VIOLATION,            de.rules_violations);
  ci_result.warnings_count      += severityLevelFilter(RESULT_FILTER.WARNING,              de.rules_warnings);
  ci_result.manual_checks_count += severityLevelFilterManualCheck(RESULT_FILTER.PAGE_MANUAL_CHECK,    de.rules_manual_checks);
  ci_result.manual_checks_count += severityLevelFilterManualCheck(RESULT_FILTER.ELEMENT_MANUAL_CHECK, de.rules_manual_checks);
  ci_result.passed_count        += severityLevelFilter(RESULT_FILTER.PASS,                 de.rules_passed);
  ci_result.hidden_count        += severityLevelFilter(RESULT_FILTER.HIDDEN,               de.rules_hidden);

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
  
  this.element_type = OpenAjax.a11y.ELEMENT_TYPE.UNDEFINED;
  this.rule_category = OpenAjax.a11y.RULE_CATEGORIES.ALL;
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
 * @param  {Number}  element_type             - Number representing the element types to be included
 * @param  {Number}  filter        (optional) - Number representing the evaluation results filter (deafult all results)
 * @param  {Number}  rule_category (optional) - Number representing the rule category (default all categories)
 */

 OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.getCacheItemResults = function(element_type, filter, rule_category) {

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("FILTER: " + filter + " RULE CATEGORY: " + rule_category);

  var total;

  var ELEMENT_TYPE = OpenAjax.a11y.ELEMENT_TYPE;

  this.element_type  = rule_category;
  
  if (typeof filter === 'number') this.filter = filter;
  else this.filter = OpenAjax.a11y.RESULT_FILTER.ALL;

  this.cache_item_results = [];
  
  var ci_result = null;
  
  switch (element_type) {
  
  case ELEMENT_TYPE.ALL:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.element_cache.child_dom_elements, true);
    break;

  case ELEMENT_TYPE.AUDIO_VIDEO:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.media_cache.media_elements);
    break;

  case ELEMENT_TYPE.FORM_CONTROLS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, false);    
    break;

  case ELEMENT_TYPE.HEADINGS_LANDMARKS:
    var cache =  this.dom_cache.headings_landmarks_cache;

    if (typeof rule_category != 'number') {
      rule_category = OpenAjax.a11y.RULE_CATEGORIES.HEADINGS;      
      rule_category += OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS;      
    }

    if (cache.title_element) { 
      ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache.title_element, rule_category, this.filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    if (cache.page_element)  { 
      ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache.page_element, rule_category, this.filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }
    
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(cache.child_cache_elements, false);
    
    break;

  case ELEMENT_TYPE.IMAGES:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.images_cache.image_elements);    
    break;

  case ELEMENT_TYPE.LINKS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.links_cache.link_elements);    
    break;

  case ELEMENT_TYPE.LAYOUT_TABLES:

    if (typeof rule_category != 'number') {
      rule_category = OpenAjax.a11y.RULE_CATEGORIES.LAYOUT;      
      rule_category += OpenAjax.a11y.RULE_CATEGORIES.TABLES;      
    }

    if (this.dom_cache.tables_cache.page_element)  { 
      ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(this.dom_cache.tables_cache.page_element, rule_category, this.filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }
    
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.tables_cache.child_cache_elements, false);
    break;

  case ELEMENT_TYPE.TEXT:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromList(this.dom_cache.text_cache.text_nodes);
    break;

  case ELEMENT_TYPE.WIDGETS:
    this.number_of_cache_items_filtered = this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, false);
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
  
  var filtered_count = 0;
  
  for (var i = 0; i < cache_items_len; i++) {
  
    var ci = cache_items[i];
    
//    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = (this.filter === RESULT_FILTER.ALL);

    var ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(ci, this.rule_category, this.filter);

    if (ci_result) this.cache_item_results.push(ci_result);

//    if (ci_result && OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag || this.all_flag) this.cache_item_results.push(ci_result);
//    else filtered_count++;

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI item: " + i  + "  cache item result length: " + this.cache_item_results.length);

  } 
 
  return filtered_count;
};  

  

/**
 * @method filterCacheItemsByNodeResultsFromTree
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}    cache_items  - Array of cache element items
 * @param  {Boolean}  as_list      - Optional parameter to force result to be a list
 *
 * @return {Number}  Number of cache items that were not included due to filter settings
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.filterCacheItemsByNodeResultsFromTree = function(cache_items, as_list) {

   function traverseCacheItems(cache_item_result, cache_item) {
  
//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI result: " + cache_item_result + "      cache item: " + cache_item );
    
//    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = all_flag;

    var ci_result = OpenAjax.a11y.cache.getFilteredCacheItemResult(cache_item, rule_category, filter);

    if (cache_item_result && !as_list) {
      cache_item_result.addChildCacheItemResult(ci_result);
      is_tree = true;
    } else {
      cache_item_results.push(ci_result);
    } 

    var child_cache_elements     = [];
    var child_cache_elements_len = 0;
    
    if (cache_item.child_cache_elements) child_cache_elements = cache_item.child_cache_elements;
    else if (cache_item.child_dom_elements) child_cache_elements = cache_item.child_dom_elements;

    child_cache_elements_len = child_cache_elements.length;

//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("CI Result: " + ci_result + "   flag: " + OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag + "   children: " + child_cache_elements_len);

    for (var i = 0; i < child_cache_elements_len; i++) {
      var cces = child_cache_elements[i];
//      if (all_flag) traverseCacheItems(ci_result, cces);
//      else traverseCacheItems(null, cces);

      traverseCacheItems(ci_result, cces);
    }
    
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  this.is_tree = false;  
  var is_tree = false;
  
  if (typeof as_list !== 'boolean') as_list = false;
  
  var filtered_count = 0;

  var filter = this.filter;
  var rule_category = OpenAjax.a11y.RULE_CATEGORIES.ALL;
  
  var cache_item_results = this.cache_item_results;

  var cache_items_len = cache_items.length;
  
  var all_flag = (this.filter === RESULT_FILTER.ALL);
  
  for (var i = 0; i < cache_items_len; i++) {
    var ci = cache_items[i];
    traverseCacheItems(null, ci);
  } 
  
  if (is_tree) this.is_tree = true;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("IS TREE: " + this.is_tree);

  return filtered_count;
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

OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.toJSON = function(prefix, element_type_title) {

  var next_prefix = "";

  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";  

  if (typeof  element_type_title !== 'string' ||  element_type_title.length === 0)  element_type_title = "no element title";

  var json = "";

  var ruleset_title   = this.ruleset.ruleset_title;
  var ruleset_version = this.ruleset.ruleset_version;
  var ruleset_id      = this.ruleset.ruleset_id;
  
  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];

  if (typeof eval_title != 'string' && eval_title.length === 0) eval_title = "no evaluation title";

  json += "{";

  json += prefix + "  \"element_type_title\"   : \"" + OpenAjax.a11y.util.escapeForJSON(element_type_title) + "\",";

  json += prefix + "  \"ruleset_title\"   : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_title) + "\",";
  json += prefix + "  \"ruleset_version\" : \"" + OpenAjax.a11y.util.escapeForJSON(ruleset_version) + "\",";
  json += prefix + "  \"ruleset_id\"      : \"" + ruleset_id + "\",";

  json += prefix + "  \"eval_title\"    : \"" + OpenAjax.a11y.util.escapeForJSON(eval_title) + "\",";
  json += prefix + "  \"eval_url\"      : \"" + OpenAjax.a11y.util.escapeForJSON(eval_url) + "\",";
  json += prefix + "  \"eval_date\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_date) + "\",";
  json += prefix + "  \"eval_time\"     : \"" + OpenAjax.a11y.util.escapeForJSON(eval_time) + "\",";


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
  html += OpenAjax.a11y.report_css;
  html += "    <script type='text/javascript'>\n";
  html += "      var OAA_REPORT = {};\n";  
  html += "      OAA_REPORT.element_type_data = " + this.toJSON("\n      ", title) + ";\n\n";
  html += "      OAA_REPORT.ruleset = " + this.ruleset.toJSON("\n      ", this.element_type) + ";\n\n";
  html += "      OAA_REPORT.wcag20  = " + this.ruleset.wcag20_nls.toJSON("\n      ") + ";\n\n";
  html += "    </script>\n";
  html += OpenAjax.a11y.report_element_type_view_js;
  html += "  </head>\n";
  html += OpenAjax.a11y.report_element_type_view_body;
  html += "</html>\n";
  
  return html;
};

/**
 * @method toCSV
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 *
 * @desc Returns an CSV representation of the filtered cache item results 
 *
 * @param  {String}  title  -   Title of the report
 *
 * @return  {String}  String representing the CSV for the report 
 */

OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.toCSV = function(title) {

  var eval_title = this.ruleset.eval_title;
  var eval_url   = this.ruleset.eval_url;
  var date  = this.ruleset.eval_date.split(':');
  var eval_time  = date[1] + ":" + date[2];
  var eval_date  = date[0];
  
  if (eval_title.length > 30) eval_title = eval_title.slice(0,27) + "...";
    
  var csv = title + "\n\n";

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

  var result_items     = this.cache_item_results;
  var result_items_len = result_items.length;

  for (var i = 0; i < result_items_len; i++) {
         
     var position = i+1;
            
     var result_item      = result_items[i];
     var node_results     = result_item.node_results;
     var node_results_len = node_results.length;
            
     for (var j = 0; j < node_results_len; j++) {
            
       var node_result = node_results[j];
       
       var dom_element = result_item.cache_item;
       
       if (typeof result_item.cache_item.dom_element ===  'object') dom_element = result_item.cache_item.dom_element;
       else dom_element = result_item.cache_item;
               
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
  
  this.filtered_children = [];

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
    this.filtered_children.push(cache_item);
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

  if (this.filtered_children.length > 0) {
    json += prefix + "  \"children\" : [";
    
    var children      = this.filtered_children;
    var children_len  = children.length;
    var children_last = children_len - 1;
    
    for (i = 0; i < children_len; i++) {
      json += this.filtered_children[i].toJSON(next_prefix_2);
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
