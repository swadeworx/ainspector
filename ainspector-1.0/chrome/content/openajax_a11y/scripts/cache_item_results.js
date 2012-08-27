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
 * @param  {Object}  dom_cache  - dom cache to use in generating filtered results
 *
 * @property  {Boolean} is_a_tree      - At least one of the CacheItemResults contains child items
 * @property  {Object}  dom_cache      - dom cache to use in generating filtered results 
 * 
 * @property  {Array}   cache_item_results  - list of top level cache item results
 */

 OpenAjax.a11y.cache.FilteredCacheItemResults = function(dom_cache) {

  this.is_a_tree = false;
  this.dom_cache = dom_cache;

  this.cache_item_results = [];
  
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

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("filter 1: " + filter + " " + rule_category);

  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;

  this.cache_item_results = [];
  
  var ci_result = null;
  
  switch (rule_category) {
  
  case RULE_CATEGORIES.AUDIO_VIDEO:
    this.filterCacheItemsByNodeResultsFromList(this.dom_cache.media_cache.media_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.CONTROLS:
    this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.controls_cache.child_cache_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.HEADINGS_LANDMARKS:
    var cache =  this.dom_cache.headings_landmarks_cache;
    
    if (cache.title_element) { 
      ci_result = this.getFilteredCacheItemResult(cache.title_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }

    if (cache.page_element)  { 
      ci_result = this.getFilteredCacheItemResult(cache.page_element, rule_category, filter);
      if (ci_result) this.cache_item_results.push(ci_result);
    }
    
    this.filterCacheItemsByNodeResultsFromTree(cache.child_cache_elements, rule_category, filter);
    
    break;

  case RULE_CATEGORIES.CONTENT_IN_LANDMARKS:
        
    this.filterCacheItemsByNodeResultsFromList(this.dom_cache.headings_landmarks_cache.elements_with_content, rule_category, filter);
    
    break;

  case RULE_CATEGORIES.IMAGES:
    this.filterCacheItemsByNodeResultsFromList(this.dom_cache.images_cache.image_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.LINKS:
    this.filterCacheItemsByNodeResultsFromList(this.dom_cache.links_cache.link_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.TABLES:
    this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.tables_cache.child_cache_elements, rule_category, filter);
    break;

  case RULE_CATEGORIES.ALL_DOM_ELEMENTS:
    this.filterCacheItemsByNodeResultsFromTree(this.dom_cache.element_cache.dom_elements, rule_category, filter);
    break;

  default:
    break;  
  
  }
  
};

/**
 * @method getFilteredCacheItemResult
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Object}  cache_item    - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Filter for returning items with node results of a 
 *                                    particular type(s)
 *
 * @return {CacheItemResult}  New cache item result
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.getFilteredCacheItemResult = function(cache_item, rule_category, filter) {

  function severityLevelFilter(result_filter, node_results) {
    var node_results_len = node_results.length;
    var count = 0;
      
    if ((filter & result_filter) && node_results_len) {
      
      for (var i = 0; i < node_results_len; i++) {
        var node_result = node_results[i];
           
        if (node_result.getRuleCategory() & rule_category) {
          ci_result.node_results.push(node_result);
          count += 1;
          OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = true;
        }  
      }
    }
    return count;
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

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

/**
 * @method filterCacheItemsByNodeResultsFromList
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}   cache_items    - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Filter for returning items with node results of a 
 *                                    particular type(s)  
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.filterCacheItemsByNodeResultsFromList = function(cache_items, rule_category, filter) {

  this.is_a_tree = false;

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var cache_items_len = cache_items.length;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  for (var i = 0; i < cache_items_len; i++) {
  
    var ci = cache_items[i];
    
    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = (filter === RESULT_FILTER.ALL);

    var ci_result = this.getFilteredCacheItemResult(ci, rule_category, filter);
    
    if (ci_result && OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag || all_flag) this.cache_item_results.push(ci_result);
    
  } 
  
};  

/**
 * @method filterCacheItemsByNodeResultsFromTree
 *
 * @memberOf OpenAjax.a11y.cache.FilteredCacheItemResults
 * 
 * @desc Returns an nested lists of cache item results by node results based on the filter 
 *
 * @param  {Array}  cache_items  - Array of cache element items
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter       - Filter for returning items with node results of a 
 */
 
OpenAjax.a11y.cache.FilteredCacheItemResults.prototype.filterCacheItemsByNodeResultsFromTree = function(cache_items, rule_category, filter) {

  function traverseCacheItems(cache_item_result, cache_item) {
  
//    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  CI result: " + cache_item_result + "      cache item: " + cache_item );
    
    OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag = all_flag;

    var ci_result = getFilteredCacheItemResult(cache_item, rule_category, filter);
    
    if (ci_result && OpenAjax.a11y.cache.FilteredCacheItemResults.add_flag) {
      if (cache_item_result && all_flag) {
        cache_item_result.addChildCacheItemResult(ci_result);
        is_a_tree = true;
      } else {
        cache_items_results.push(ci_result);
      }  
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

  this.is_a_tree = false;  
  var is_a_tree = false;
  
  var getFilteredCacheItemResult = this.getFilteredCacheItemResult;

  var cache_items_results = this.cache_item_results;

  var cache_items_len = cache_items.length;
  
  var all_flag = (filter === RESULT_FILTER.ALL);
  
  for (var i = 0; i < cache_items_len; i++) {
    var ci = cache_items[i];
    traverseCacheItems(null, ci);
  } 
  
  if (is_a_tree) this.is_a_tree = true;
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
 * @property {Number}  total_count          - Total number of rule results
 * @property {Number}  violations_count     - Number of rule results with severity of 'Violation'
 * @property {Number}  manual_checks_count  - Number of rule results with severity of 'Manual Check'
 * @property {Number}  warnings_count       - Number of rule results with severity of 'Warning'
 * @property {Number}  passed_count         - Number of rule results with severity of 'Passed'
 * @property {Number}  hidden _count        - Number of rule results with severity of 'Hidden'
 *
 * @property {Array}   children             - Array of cache item result objects  
 */

 OpenAjax.a11y.cache.CacheItemResult = function(cache_item) {

  this.cache_item = cache_item;
  
  this.node_results     = [];
  
  this.total_count         = 0;
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

  if (cache_item) this.children.push(cache_item);

};

