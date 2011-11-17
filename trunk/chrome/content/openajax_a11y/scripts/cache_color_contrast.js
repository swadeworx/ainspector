// ******************************************************
//
// Copyright 2011 OpenAjax Alliance
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ******************************************************



/** ===============================================================
*
* ColorContrastCache
*
* @desc Constructor for ColorContrastCache object which contains a list of
*    color contrast items representing the color contrast combinations
*    used in a document. The item also contains a list of all the
*    DOM Element nodes that contain that color contrast combination
*
* @constructs
*
* @return  ColorContrastCache object
*
================================================================ */

OpenAjax.a11y.cache.ColorContrastCache = function (dom_cache) {
  
  this.dom_cache = dom_cache;
  this.color_contrast_items =[];
  
  this.sort_property = 'color_contrast_ratio';
  this.sort_ascending = false;
  
  this.up_to_date = false;
  this.length = 0;
  
  return this;
};

/** ================================================================
*
* addColorContrastItem
*
* @desc Adds a DOM Element object information to a color contrast item in the color contrast
*    cache, if it does not match any of the current color contrast items it will create a
*    new color contrast item.
*
* @param dom_element Object  DOM Element object to add to a color contrast item in the cache
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.addColorContrastItem = function (dom_element) {
  
  var i;
  
  var cci = null;
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
    
    // OpenAjax.a11y.console("color compare " + dom_element.computed_style.color + " with " + item.color );
    
    if ( cci && cci.color &&
    (dom_element.computed_style.color_hex == cci.color) &&
    (dom_element.computed_style.background_color_hex == cci.background_color) &&
    ((dom_element.computed_style.background_image == cci.background_image) &&
    (dom_element.computed_style.background_repeat == cci.background_repeat) &&
    (dom_element.computed_style.background_position ==cci.background_position))) {
      
      cci.dom_elements.push(dom_element);
      cci.node_count = cci.dom_elements.length;
      
      cci.addToCharacterCount(dom_element.character_count);
      
      found = true;
      break;
    }
  }
  // end loop
  
  if (!found) {
    var cs = dom_element.computed_style;
    cci = new OpenAjax.a11y.cache.ColorContrastItem(cs.font_family, cs.font_size, cs.font_weight, cs.color_hex, cs.background_color_hex, cs.background_image, cs.background_repeat, cs.background_position, cs.color_contrast_ratio, dom_element.character_count);
    
    cci.dom_elements.push(dom_element);
    cci.node_count = cci.dom_elements.length;
    
    this.color_contrast_items.push(cci);
    this.length = this.length + 1;
    cci.cache_id = "cc_" + this.length;
  }
};

/** ================================================================
*
* getColorContrastItemById
*
* @desc Returns the ColorContrastItem object with the id
*
* @param id String  id of the ColorContrastItem object
*
* @return ColorContrastItem object if found, or null if not found
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.getColorContrastItemById = function (cache_id) {
  
  var i;
  var color_contrast_items_len = this.color_contrast_items.length;
  
  if (cache_id && cache_id.length) {
    for (i = 0; i < color_contrast_items_len; i++) {
      if (this.color_contrast_items[i].cache_id == cache_id) {
        return this.color_contrast_items[i];
      }
    }
    // end loop
  }
  
  return null;
};

/** ================================================================
*
* emptyList
*
* @desc Empties all the ColorContrastItem Objects items from the color
*    contrast cache
*
* @return none
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.emptyList = function () {
  
  this.color_contrast_items.length = 0;
  this.up_to_date = false;
};

/** ================================================================
*
* updateCacheItems
*
* @desc Updates the ColorContrastCache object with information from a DOMElement object
*    This is used during the creation of the cache and is used by the functions for
*    either creating the cache all at one time or selectively
*
* @param dom_element Object DOM Element object to add to the color contrast cache
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.updateCacheItems = function (dom_element) {
  
  this.addColorContrastItem(dom_element);
};

/** ================================================================
*
* transverseDOMElementsForColorContrast
*
* @desc Traverses the DOMElements to update the color contrast cache
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.transverseDOMElementsForColorContrast = function (dom_element) {
  
  if (! dom_element) return;
  
  if (dom_element.type == NODE_TYPE.ELEMENT) {
    
    this.updateCacheItems(dom_element);
    
    for (var i = 0; i < dom_element.children.length; i++) {
      this.transverseDOMElementsForColorContrast(dom_element.children[i]);
    }
    // end loop
  }
};

/** ================================================================
*
* updateCache
*
* @desc Traverses the DOMElements to update the color contrast cache
*    This function is used to update the color contrast cache
*    when needed by a rule, it sets the up to date flag when done
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.cache.ColorContrastCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating color contrast cache.");
  for (i = 0; i < children_len; i++) {
    this.transverseDOMElementsForColorContrast(children[i]);
  }
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed color contrast cache update, number of cache items is " + this.length);
  
  this.up_to_date = true;
};

/** ================================================================
*
* sortCCRItems
*
* @desc
*
* @param ascending  Boolean true if sort in ascending order; false in descending order
*
* @return true if list was sorted, false if not
*
* =============================================================== */

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

/** ===============================================================
*
* toString
*
* @desc Return a string representation of the color contrast cache
*
* @return  String
*
================================================================ */

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

/** ===============================================================
*
* ColorContrastItem
*
* @desc Constructor for ColorContrastItem object which contains information
*    about a unique set of color contrast features of the web page
*
* @constructs
*
* @return  ColorContrastItem object
*
================================================================ */

OpenAjax.a11y.cache.ColorContrastItem = function (font_family, font_size, font_weight, color, bg_color, bg_image, bg_repeat, bg_position, ccr, count) {
  
  this.font_family = font_family;
  this.font_size = font_size;
  this.font_weight = font_weight;
  this.color = color;
  this.background_color = bg_color;
  this.background_image = bg_image;
  this.background_repeat = bg_repeat;
  this.background_position = bg_position;
  this.color_contrast_ratio = ccr;
  this.character_count = count;
  
  this.is_large_font = (font_size >= 18) || ((font_size >= 14) && (font_weight > 400));
  
  this.dom_elements =[];
};

/** ===============================================================
*
* addToCharacterCount
*
* @desc Add to the total number of characters on the page that matches
*    the features of this color contrast item
*
* @return  nothing
*
================================================================ */


OpenAjax.a11y.cache.ColorContrastItem.prototype.addToCharacterCount = function (length) {
  
  this.character_count += length;
};

/** ===============================================================
*
* toString
*
* @desc Provide information about the color contrast item as a text
*    string.
*
* @return  String
*
================================================================ */


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
