/*
 * Copyright 2011 and 2012 OpenAjax Alliance
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
/*                       ColorContrstCache                          */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor ColorContrastCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
* @desc Constructor for ColorContrastCache object which contains a list of
*    color contrast items representing the color contrast combinations
*    used in a document. The item also contains a list of all the
*    DOM Element nodes that contain that color contrast combination
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {String}    sort_property   - Property of ColorContrastItem that the list is sorted on  
 * @property {Boolean}   sort_ascending  - true if list is sorted by ascending values, otherwsie false 
 *
 * @property {Array}    color_contrst_items  - List of color contrast items 
 * @property {Number}   length               - Number of color contrast items in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.ColorContrastCache = function (dom_cache) {
  
  this.dom_cache = dom_cache;
  this.color_contrast_items =[];
  
  this.sort_property = 'color_contrast_ratio';
  this.sort_ascending = false;
  
  this.up_to_date = false;
  this.length = 0;
  
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
  
};

/**
 * @method addColorContrastItem
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Adds a DOM Element object information to a color contrast item in the color contrast
 *       cache, if it does not match any of the current color contrast items it will create a
 *       new color contrast item.
 *
 * @param {DOMElement}  dom_element  - dom element to add to color contrast list
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.addColorContrastItem = function (dom_element) {
  
  var i;
  
  var cci;
  var cs;
  var color_contrast_items_len = this.color_contrast_items.length;
  var found = false;
  
  // Some elements do not have color contrast calculations
  if ((dom_element.tag_name == "img") ||
    (dom_element.tag_name   == "area") ||
    (dom_element.tag_name   == "map") ||
    (dom_element.tag_name   == "object") ||
    (dom_element.tag_name   == "embed") ||
    (dom_element.tag_name   == "applet")) {
   return;  
  }

  for (i = 0; i < color_contrast_items_len; i++) {
    cci = this.color_contrast_items[i];
    cs = dom_element.computed_style;
    
    // OpenAjax.a11y.console("color compare " + dom_element.computed_style.color + " with " + item.color );
    
    if ( cci && 
         cci.color &&
         (cs.color_hex     == cci.color)         &&
         (cs.is_large_font == cci.is_large_font) &&
         (cs.background_color_hex == cci.background_color) &&
         ((cs.background_image == 'none' && cci.background_image == 'none') ||
          ((cs.background_image    == cci.background_image) &&
           (cs.background_repeat   == cci.background_repeat) &&
           (cs.background_position == cci.background_position)))) {
      
      cci.dom_elements.push(dom_element);
      cci.node_count = cci.dom_elements.length;
      
      cci.addToCharacterCount(dom_element.character_count);
      
      found = true;
      break;
    }
  }
  // end loop
  
  if (!found) {
    cs = dom_element.computed_style;
    cci = new OpenAjax.a11y.cache.ColorContrastItem(cs.font_family, cs.font_size, cs.font_weight, cs.color_hex, cs.background_color_hex, cs.background_image, cs.background_repeat, cs.background_position, cs.is_large_font, cs.color_contrast_ratio, dom_element.character_count);
    
    cci.dom_elements.push(dom_element);
    cci.node_count = cci.dom_elements.length;
    
    this.color_contrast_items.push(cci);
    this.length = this.length + 1;
    cci.cache_id = "cc_" + this.length;
  }
};

/**
 * @method getColorContrastItemById
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Returns the color contrast item with the cache id
 *
 * @param {String}  cache_id  - cache id of the color contrast item
 *
 * @return {ColorContrastItem} Returns color contrst item if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.getColorContrastItemById = function (cache_id) {
  this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Returns the color contrast item with the cache id
 *
 * @param {String}  cache_id  - cache id of the color contrast item
 *
 * @return {ColorContrastItem} Returns color contrst item if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.getItemByCacheId = function (cache_id) {
  
  var i, j;
  var cci, de;
  var dom_elements, dom_elements_len;

  var color_contrast_items     = this.color_contrast_items;
  var color_contrast_items_len = color_contrast_items.length;
  
  if (cache_id && cache_id.length) {
  
    for (i = 0; i < color_contrast_items_len; i++) {
    
      cci = color_contrast_items[i];
      
      if (this.color_contrast_items[i].cache_id == cache_id) {
        return this.color_contrast_items[i];
      }

      dom_elements     = cci.dom_elements;
      dom_elements_len = dom_elements.length;
      
      for (j = 0; j < dom_elements_len; j++ ) {
        de = dom_elements[j];
        if (de.cache_id == cache_id) return de;
      } // end loop

    } // end loop
  }
  
  return null;  
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Empties all the color contrast items from the cache 
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.emptyCache = function () {
  
  this.color_contrast_items.length = 0;
  this.up_to_date = false;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Updates the ColorContrastCache object with information from a DOMElement object
 *    This is used during the creation of the cache and is used by the functions for
 *    either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the color contrast cache
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.updateCacheItems = function (dom_element) {
  
  this.addColorContrastItem(dom_element);
};

/**
 * @method traverseDOMElementsForColorContrast
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 */
 
OpenAjax.a11y.cache.ColorContrastCache.prototype.traverseDOMElementsForColorContrast = function (dom_element) {
  
  if (! dom_element) return;
  
  if (dom_element.type == NODE_TYPE.ELEMENT) {
    
    this.updateCacheItems(dom_element);
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForColorContrast(dom_element.child_dom_elements[i]);
    }
    // end loop
  }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *    This function is used to update the color contrast cache
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating color contrast cache.");
  for (i = 0; i < children_len; i++) {
    this.traverseDOMElementsForColorContrast(children[i]);
  }
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed color contrast cache update, number of cache items is " + this.length);
  
  this.up_to_date = true;
};

/**
 * @method sortCCRItems
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Sorts abbreviations by color contrast cache by color contrast ratio property
 *
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.sortCCRItems = function (ascending) {
  
  var swapped = false;
  var temp = null;
  var i;
  
  if (! this.color_contrast_items || (this.color_contrast_items.length === 0)) {
    return false;
  }
  // endif
  
  this.sort_ascending = ascending;
  
  var color_contrast_items_len = this.color_contrast_items.length;
  
  if (ascending) {
    do {
      swapped = false;
      for (i = 1; i < color_contrast_items_len; i++) {
        if (parseInt(this.color_contrast_items[i - 1].color_contrast_ratio, 10) > parseInt(this.color_contrast_items[i].color_contrast_ratio, 10)) {
          // swap the values
          temp = this.color_contrast_items[i - 1];
          this.color_contrast_items[i - 1] = this.color_contrast_items[i];
          this.color_contrast_items[i] = temp;
          swapped = true;
        }
      }
      // end loop
    }
    while (swapped);
  } else {
    do {
      swapped = false;
      for (i = 1; i < color_contrast_items_len; i++) {
        if (parseInt(this.color_contrast_items[i - 1].color_contrast_ratio, 10) < parseInt(this.color_contrast_items[i].color_contrast_ratio, 10)) {
          // swap the values
          temp = this.color_contrast_items[i - 1];
          this.color_contrast_items[i - 1] = this.color_contrast_items[i];
          this.color_contrast_items[i] = temp;
          swapped = true;
        }
      }
      // end loop
    }
    while (swapped);
  }
  
  this.sort_property = 'color_contrast_ratio';
  
  return true;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastCache
 *
 * @desc Returns a text string representation of the color contrast cache object 
 *
 * @return {String} Returns string represention the color contrast cache object
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.toString = function () {
  
  var i;
  
  var item;
  
  var str = "\n\nColor Contrast List Information\n";
  
  var list_length = this.color_contrast_items.length;
  
  for (i = 0; i < list_length; i++) {
    str += this.color_contrast_items[i].toString();
  }
  // end loop
  
  return str;
};

/* ---------------------------------------------------------------- */
/*                      ColorContrastItem                           */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor ColorContrastItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for ColorContrastItem object which contains information
 *       about dom elements that share the same abbreviation 
 * 
 * @param  {String}  font_family           - Value of the CSS font family property
 * @param  {String}  font_size             - Value of the CSS font size property
 * @param  {String}  font_weight           - Value of the CSS font weight property
 * @param  {String}  color                 - Value of the CSS font color property
 * @param  {String}  background_color      - Value of the CSS background color property
 * @param  {String}  background_image      - Value of the CSS background image property
 * @param  {String}  background_repeat     - Value of the CSS background repeat property
 * @param  {String}  background_position   - Value of the CSS background position property
 * @param  {String}  color_contrast_ratio  - Calculated color contrast ratio
 * @param  {String}  count                 - Initial number of characters
 *         
 * @property  {String}  cache_id  - String that uniquely identifies the cache element in the DOMCache
 *
 * @property  {String}  font_family           - Value of the CSS font family property
 * @property  {String}  font_size             - Value of the CSS font size property
 * @property  {String}  font_weight           - Value of the CSS font weight property
 * @property  {String}  color                 - Value of the CSS font color property
 * @property  {String}  background_color      - Value of the CSS background color property
 * @property  {String}  background_image      - Value of the CSS background image property
 * @property  {String}  background_repeat     - Value of the CSS background repeat property
 * @property  {String}  background_position   - Value of the CSS background position property
 * @property  {String}  color_contrast_ratio  - Calculated color contrast ratio
 * @property  {String}  character_count       - Number of characters in the document that share these color contrast properties
 *  
 * @property  {Boolean}  is_large_font  - true if font is considered large, otherwise false 
 *  
 * @property  {String}   dom_elements - List of dom elements with the same color contrast item properties
 */

OpenAjax.a11y.cache.ColorContrastItem = function (font_family, font_size, font_weight, color, bg_color, bg_image, bg_repeat, bg_position, is_large_font, ccr, count) {

  this.cache_id = "";

  this.font_family          = font_family;
  this.font_size            = font_size;
  this.font_weight          = font_weight;
  this.color                = color;
  this.background_color     = bg_color;
  this.background_image     = bg_image;
  this.background_repeat    = bg_repeat;
  this.background_position  = bg_position;
  
  this.color_contrast_ratio = ccr;
  this.character_count = count;
  
  this.is_large_font = is_large_font;
  
  this.dom_elements = [];
};

/**
 * @member addToCharacterCount
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Add to the total number of characters in the document that matches
 *       the properties of this color contrast item
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.addToCharacterCount = function (length) {
  
  this.character_count += length;
};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getResultRules = function () {
  return this.dom_elements[0].getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'is_large_font');
  cache_nls.addPropertyIfDefined(properties, this, 'color_contrast_ratio');
 
  cache_nls.addPropertyIfDefined(properties, this, 'color');
  cache_nls.addPropertyIfDefined(properties, this, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this, 'font_weight');  
  
  return properties;
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getAttributes = function (unsorted) {

  return [];
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'character_count');
  
  return properties;
  
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getEvents = function () {
   
  return [];
  
};

/**
 * @method getColorContrastSummary
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns the worst severity level of color contrast rules
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getColorContrastSummary = function () {

  
  function hasRule(node_results, rules) {
  
    var i;
    var j;
    
    var node_results_len = node_results.length;
    var rules_len        = rules.length;
    
    for (i = 0; i < node_results_len; i++ ) {
      for (j = 0; j < rules_len; j++) {
        if (node_results[i].rule_result.rule.rule_id == rules[j]) return true;
      }
    }
    return false;
  }

  var i;
  
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var last_severity_value;
  var a = {};
  var last_a = {};

  severity = cache_nls.getSeverityNLS(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  last_severity_value = SEVERITY.NONE;

  for (i = 0; i < this.dom_elements.length; i++ ) {
  
    var de = this.dom_elements[i];

    if (last_severity_value == SEVERITY.NONE && 
        hasRule(de.rules_hidden, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
      a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
      last_severity_value = SEVERITY.HIDDEN;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN) &&
        hasRule(de.rules_passed, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
      a.style  = SEVERITY_STYLE[SEVERITY.PASS];
      last_severity_value = SEVERITY.PASS;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN ||
         last_severity_value == SEVERITY.PASS) &&
        hasRule(de.rules_recommendations, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
      a.style  = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
      last_severity_value = SEVERITY.RECOMMENDATION;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN ||
         last_severity_value == SEVERITY.PASS ||
         last_severity_value == SEVERITY.RECOMMENDATION) &&
        hasRule(de.rules_manual_checks, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
      a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
      last_severity_value = SEVERITY.MANUAL_CHECK;
    }

    if (hasRule(de.rules_violations, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.VIOLATION);
      a.style  = SEVERITY_STYLE[SEVERITY.VIOLATION];
      break;
    }

  }  

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;

  return a;
  
};

/**
 * @member toString
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns a text string representation of the color contrast item object 
 *
 * @return {String} Returns string represention the color contrast item object
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.toString = function () {
  
  var str = "";
  
  str += " Color Contrast Item " + this.cache_id + "\n";
  
  str += "  Font Family     : " + this.font_family + "\n";
  str += "  Font Size      : " + this.font_size + "\n";
  str += "  Font Weight     : " + this.font_weight + "\n";
  str += "  Color        : " + this.color + "\n";
  str += "  Background Color   : " + this.background_color + "\n";
  str += "  Background Image   : " + this.background_image + "\n";
  str += "  Background Repeat  : " + this.background_repeat + "\n";
  str += "  Color Contrast Ratio : " + this.color_contrast_ratio + "\n";
  str += "  Number of Characters : " + this.character_count + "\n";
  str += "  Number of Nodes   : " + this.dom_elements.length + "\n\n";
  
  return str;
};
