/**
 * Copyright 2011 OpenAjax Alliance
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
/*                       OpenAjax Constants                         */ 
/* ---------------------------------------------------------------- */

var OpenAjax                    = OpenAjax || {};
OpenAjax.a11y                   = OpenAjax.a11y || {};
OpenAjax.a11y.cache             = OpenAjax.a11y.cache || {};

/**
 * debugging console flags, by default they should be false and only should be true if running in Firefox
 */
OpenAjax.a11y.CONSOLE_MESSAGES        = false;
OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE = false;

/** 
 * Supports event handler enumeration
 * the default should be false, set to true in your own code if 
 * you think you can support it current support is only available Firefox 
 */
OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS = false;  

/**
 * Enable or disable testing of broken links
 * the default should be false, set to true in your own code if 
 * you think you can support it
 */
OpenAjax.a11y.SUPPORTS_URL_TESTING = false;  

/**
 * Progress log constants
 */
OpenAjax.a11y.PROGRESS             = OpenAjax.a11y.PROGRESS || {};
OpenAjax.a11y.PROGRESS.UNDEFINED   = 0;
OpenAjax.a11y.PROGRESS.START       = 1;
OpenAjax.a11y.PROGRESS.CACHE_START = 2;
OpenAjax.a11y.PROGRESS.CACHE_END   = 3;
OpenAjax.a11y.PROGRESS.REQUIREMNT  = 4;   
OpenAjax.a11y.PROGRESS.RULE        = 5;   
OpenAjax.a11y.PROGRESS.COMPLETE    = 6;   

/**
 * Severity of not passing a rule for a particular requirement set, like WCAG 2.0
 */
OpenAjax.a11y.SEVERITY                          = OpenAjax.a11y.SEVERITY || {};
OpenAjax.a11y.SEVERITY.NA                       = 0;
OpenAjax.a11y.SEVERITY.PASS                     = 1;
OpenAjax.a11y.SEVERITY.VIOLATION                = 2;
OpenAjax.a11y.SEVERITY.RECOMMENDATION           = 3;
OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION        = 4;
OpenAjax.a11y.SEVERITY.WARNING                  = 5;  // This is some type of coding inconsistency that may be related to accessibility
OpenAjax.a11y.SEVERITY.HIDDEN                   = 6;  // Content is hidden and not tested for accessibility
OpenAjax.a11y.SEVERITY.INFORMATIONAL            = 7;
OpenAjax.a11y.SEVERITY.NOT_EVALUATED            = 8;

/**
 * Priority of satisfying a rule within a requirement, usefull when there are a high number of violations
 */
OpenAjax.a11y.PRIORITY     = OpenAjax.a11y.PRIORITY || {};
OpenAjax.a11y.PRIORITY.P1  = 0;
OpenAjax.a11y.PRIORITY.P2  = 1;
OpenAjax.a11y.PRIORITY.P3  = 2;

/**
 * Status of rule acceptance for inclusion in the public ruleset
 */
OpenAjax.a11y.STATUS            = OpenAjax.a11y.STATUS || {};
OpenAjax.a11y.STATUS.PROPOSED   = 0;
OpenAjax.a11y.STATUS.ACCEPTED   = 1;
OpenAjax.a11y.STATUS.DEPRICATED = 2;

/**
 * Types of reference for supplemential materials to help people understand an accessibility requirement and
 * how to improve the accessibility
 */ 
OpenAjax.a11y.REFERENCES              = OpenAjax.a11y.REFERENCES || {};
OpenAjax.a11y.REFERENCES.REQUIREMENT       = 0;
OpenAjax.a11y.REFERENCES.TECHNIQUE         = 1;
OpenAjax.a11y.REFERENCES.MANUAL_EVALUATION = 2;
OpenAjax.a11y.REFERENCES.BEST_PRACTICE     = 3;
OpenAjax.a11y.REFERENCES.AUTHORING         = 4;
OpenAjax.a11y.REFERENCES.OTHER             = 5;


/**
 * Visbility of an item in graphical renderings and to asssitive technologies
 */
OpenAjax.a11y.VISIBILITY              = OpenAjax.a11y.VISIBILITY || {};
OpenAjax.a11y.VISIBILITY.UNKNOWN      = 1;
OpenAjax.a11y.VISIBILITY.HIDDEN       = 2;
OpenAjax.a11y.VISIBILITY.VISIBLE      = 3;

/**
 * ID of an item 
 */
OpenAjax.a11y.ID              = OpenAjax.a11y.ID || {};
OpenAjax.a11y.ID.NOT_DEFINED  = 1;
OpenAjax.a11y.ID.UNIQUE       = 2;
OpenAjax.a11y.ID.NOT_UNIQUE   = 3;

/**
 * Constants related to the probability of type of media object 
 */ 
OpenAjax.a11y.MEDIA        = OpenAjax.a11y.MEDIA || {};
OpenAjax.a11y.MEDIA.UNDEFINED = 0;
OpenAjax.a11y.MEDIA.NO        = 1;
OpenAjax.a11y.MEDIA.MAYBE     = 2;
OpenAjax.a11y.MEDIA.YES       = 3;

/**
 * Staus of rule acceptance for inclusion in the public ruleset
 */
OpenAjax.a11y.URL_RESULT            = OpenAjax.a11y.URL_RESULT || {};
OpenAjax.a11y.URL_RESULT.INVALID    =  1;
OpenAjax.a11y.URL_RESULT.VALID      =  2;
OpenAjax.a11y.URL_RESULT.NOT_TESTED =  3;
OpenAjax.a11y.URL_RESULT.ERROR      =  4;

/**
 * What markup was used as the source for calculating the accessible name  
 */
OpenAjax.a11y.SOURCE                     = OpenAjax.a11y.SOURCE || {};
OpenAjax.a11y.SOURCE.NONE                =  1;
OpenAjax.a11y.SOURCE.LABEL_REFERENCE     =  2;
OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION =  3;
OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE     =  4;
OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE     =  5;
OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE       =  6;
OpenAjax.a11y.SOURCE.BUTTON_TYPE         =  7;
OpenAjax.a11y.SOURCE.CHILD_TEXT_NODES    =  8;
OpenAjax.a11y.SOURCE.ARIA_LABELLEDBY     =  9;
OpenAjax.a11y.SOURCE.ARIA_LABEL          =  10;
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
  


OpenAjax.a11y.cache.util     = OpenAjax.a11y.cache.util || {};
  
 /**
 * OpenAjax.a11y extensions to String object
 *
 */

// string utilities
if (typeof String.isInteger == "undefined") {
 String.prototype.isInteger = function() {
  return this.match(/^\d+$/) !== null;
 };
}
	
if (typeof String.trim == "undefined") {
 String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
 };
}

if (typeof String.normalizeSpace == "undefined") {
 String.prototype.normalizeSpace = function () {
  // Replace repeated spaces, newlines and tabs with a single space
  return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
 }; // end function normalizeSpace
}

if (typeof String.capitalize == "undefined") {
 String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
 };
}


 /**
 * getNameFromChildrenObject
 * 
 * @desc Returns an object with information about the accessible text of a node
 *
 * @param dom_element DOMElement object to get the accessible text
 *
 * @return object that provides information about the accessible text of the node 
 *
 */
 
OpenAjax.a11y.cache.util.getNameFromChildrenObject = function(dom_element) {

 function getText(dom_element, strings, texts, alts) {
  // If text node get the text and return
  if( dom_element.type == NODE_TYPE.TEXT ) {
   var text = dom_element.text;
   strings.push( text );
   texts.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == NODE_TYPE.ELEMENT ) {
    // check to see if IMG or AREA element and to use ALT content if defined
    if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {
     
     if (dom_element.alt) {
       strings.push(dom_element.alt);
       alts.push(dom_element.alt);
     }  
     
     if( dom_element.node.offsetHeight > o.height ) {
       o.height = dom_element.node.offsetHeight;
     } //endif
     
     if( dom_element.node.offsetWidth > o.width ) {
       o.width = dom_element.node.offsetWidth;
     } //endif
     
     o.image_count = o.image_count + 1;
     
    } else {
    
     for (var i = 0; i < dom_element.children.length; i++ ) {
      getText( dom_element.children[i], strings, texts, alts);
     } // endfor
     
    } // endif
    
   } // endif  
  } // endif
 } // end function getStrings

 // Create return object
 var o = {};
 var name_array = [];
 var name_from_text_nodes_array = [];
 var name_from_image_alt_array = [];
 o.height = 0;
 o.width = 0;
 o.image_count = 0;


 getText( dom_element, name_array, name_from_text_nodes_array, name_from_image_alt_array); 
 
 o.name         = name_array.join("").trim().normalizeSpace();
 o.name_from_text_nodes = name_from_text_nodes_array.join("").trim().normalizeSpace().toLowerCase();
 o.name_from_image_alt = name_from_image_alt_array.join("").trim().normalizeSpace().toLowerCase();
 return o;
 
}; // end function OpenAjax.cache.util.getAccessibleText


 /**
 * getNameFromChildren
 * 
 * @desc Returns an object with information about the accessible text of a node
 *
 * @param dom_element DOMElement object to get the accessible text
 *
 * @return object that provides information about the accessible text of the node 
 *
 */
 
OpenAjax.a11y.cache.util.getNameFromChildren = function (dom_element) {
 
 function getTextNodeContent(dom_item, strings) {
  var i;
  var children_len;

  if (dom_item.type == NODE_TYPE.TEXT) {
   strings.push( dom_item.text );
  } 
  else {
   // if an element for through all the children elements looking for text
   if (dom_item.type == NODE_TYPE.ELEMENT) {
   
    // check to see if IMG or AREA element and use ALT content if defined
    if (((dom_item.tag_name == 'img') || 
       (dom_item.tag_name == 'area')) &&
       dom_item.alt && 
       dom_item.alt.length) {
      strings.push( dom_item.alt );
    } else {
    
     children_len = dom_item.children.length;
     
     for (i=0; i < children_len; i++ ) {
      getTextNodeContent( dom_item.children[i], strings);
     } 
     
    } 
   }  
  } 
 } // end function getTextNodeContent

 // Create return object
 var strings = [];
 
 getTextNodeContent( dom_element, strings); 
 
 return strings.join("");
   
}; // end function OpenAjax.cache.util.getAccessibleText

// ============================
// UrlExists
// 
// @desc Determines if a URL exits
//
// @param URL_STATUS
//
// ============================

OpenAjax.a11y.cache.util.UrlExists = function (url) {

 if (OpenAjax.a11y.SUPPORTS_URL_TESTING) {
  try {
   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send(null);
   if (http.status!==404) {
    return OpenAjax.a11y.URL_RESULT.VALID;
   }
   else {
    return OpenAjax.a11y.URL_RESULT.INVALID;
   }
  }
  catch (e) {
   return OpenAjax.a11y.URL_RESULT.ERROR;
  }
 }
 else {
  return OpenAjax.a11y.URL_RESULT.NOT_TESTED;
 }
 
}; 

// ============================
// RGBToHex
// 
// @desc
//
// @param rgb_color
//
// ============================

OpenAjax.a11y.cache.util.RGBToHEX = function( rgb_color ) {

 function stringToHex(d) {
  var hex = Number(d).toString(16);
  if (hex.length == 1) {
   hex = "0" + hex;
  }
  return hex;
 }

 var i;
 var length; 

 if (!rgb_color) return "000000";

 var hex = [];
 var color_hex = "000000";
 var components = rgb_color.match(/[\d\.]+/g);
  
 if (components && components.length) {
  length = components.length;
  
  if (length == 3) {
   // RGB value
   for (i=0; i<3; i++) {
    hex.push(stringToHex(components[i]));
   } // end loop
 
   color_hex = hex[0] + hex[1] + hex[2]; 
   // OpenAjax.a11y.console( rgb_color + " " + color_hex );
   
  }
  else {  
   
   if (length == 4) {
    // RGBA value
    for (i=0; i<3; i++) {
     hex[i] = stringToHex(Math.round(parseFloat(components[i])*parseFloat(components[3])));
    } // end loop  
    color_hex = hex[0] + hex[1] + hex[2]; 
   }
  }
 } 
 
 return color_hex;
};  // ****************************************************** 
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
 * AbbreviationsCache
 *
 * @desc Constructor for AbbreviationsCache object which contains a list of 
 *    color contrast items representing the color contrast combinations
 *    used in a document. The item also contains a list of all the 
 *    DOM Element nodes that contain that color contrast combination
 *
 * @constructs
 *
 * @return  AbbreviationsCache object 
 *
 ================================================================ */

OpenAjax.a11y.cache.AbbreviationsCache = function (dom_cache) {

 this.dom_cache = dom_cache;
 this.abbreviation_items = [];
 
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 
 this.up_to_date = false;
 this.length = 0;

 return this;

};

/** ================================================================
*
* addAbbreviationItem
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

OpenAjax.a11y.cache.AbbreviationsCache.prototype.addAbbreviationItem = function (dom_element) {

 var abbreviation_item = null;
 var abbreviation_items_len = this.abbreviation_items.length;
 var found = false;
 var node_text = dom_element.getText();

 for (var i=0; i < abbreviation_items_len; i++ ) {
  abbreviation_item = this.abbreviation_items[i];
  
  if (node_text == abbreviation_item.abbreviation_text) {
    
    abbreviation_item.dom_elements.push(dom_element);
    abbreviation_item.count = abbreviation_item.dom_elements.length;
    
    found = true; 
    break;
  }
 } // end loop

 if (!found) {
  abbreviation_item = new OpenAjax.a11y.cache.AbbreviationItem(node_text);
  
  abbreviation_item.dom_elements.push(dom_element);
  abbreviation_item.count = abbreviation_item.dom_elements.length;
  abbreviation_item.cache_id = "abbrev_" + this.length;  
  
  this.abbreviation_items.push(abbreviation_item);
  this.length = this.length + 1;
 }

};

/** ================================================================
*
* getAbbreviationItemById
*
* @desc Returns the AbbreviationItem object with the id
*
* @param id String  id of the AbbreviationItem object
*
* @return AbbreviationItem object if found, or null if not found 
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getAbbreviationItemById = function (id) {

 var abbreviation_items_len = this.abbreviation_items.length;

 if (id && id.length) {  
  for (var i=0; i < abbreviation_items_len; i++) {
   if (this.abbreviation_items[i].cache_id == id) {
    return this.abbreviation_items[i];
   }
  } // end loop
 } 

 return null;
};

/** ================================================================
*
* emptyList
*
* @desc Empties all the AbbreviationItem Objects items from the color 
*    contrast cache
*
* @return none
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.emptyList = function () {

 this.abbreviation_items.length = 0;
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 this.up_to_date = false;

};

/** ================================================================
*
* updateCacheItems
*
* @desc Updates the AbbreviationsCache object with information from a DOMElement object
*    This is used during the creation of the cache and is used by the functions for
*    either creating the cache all at one time or selectively
*
* @param dom_element Object DOM Element object to add to the color contrast cache
*
* @return nothing
*
* =============================================================== */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'abbr') ||
   (dom_element.tag_name == 'acronym')) {

   this.addAbbreviationItem(dom_element);
   
 }
 
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
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.transverseDOMElementsForColorContrast = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.updateCacheItems(dom_element);
  
  for (var i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForColorContrast(dom_element.children[i]);
  } // end loop
  
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
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating color contrast cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForColorContrast(children[i]);
 }  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed color contrast cache update, number of cache items is " + this.length);

 this.up_to_date = true;
 
};

/** ================================================================
*
* sortAbbreviationItems
*
* @desc 
*
 * @param ascending  Boolean true if sort in ascending order; false in descending order
*
* @return true if list was sorted, false if not
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.sortAbbreviationItems = function(ascending) {

 var swapped = false;
 var temp = null;
 var i;

 if( !this.abbreviation_items || (this.abbreviation_items.length === 0)) {
  return false;
 } // endif

 this.sort_ascending = ascending;
 
 var abbreviation_items_len = this.abbreviation_items.length;

 if( ascending ) {
  do{
    swapped = false;
    for (i = 1; i < abbreviation_items_len; i++ ) {
     if (this.abbreviation_items[i-1].abbreviation_text > this.abbreviation_items[i].abbreviation_text) {
      // swap the values
      temp = this.abbreviation_items[i-1];
      this.abbreviation_items[i-1] = this.abbreviation_items[i];
      this.abbreviation_items[i] = temp;
      swapped = true;
     } 
    } // end loop

  } while (swapped);
 }
 else {
  do {
   swapped = false;
    for (i = 1; i < abbreviation_items_len; i++ ) {
     if (this.abbreviation_items[i-1].abbreviation_text < this.abbreviation_items[i].abbreviation_text) {
      // swap the values
      temp = this.abbreviation_items[i-1];
      this.abbreviation_items[i-1] = this.abbreviation_items[i];
      this.abbreviation_items[i] = temp;
      swapped = true;
     } 
    } // end loop
  } while (swapped);
 } 

 this.sort_property = 'abbreviation_text';
 
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

OpenAjax.a11y.cache.AbbreviationsCache.prototype.toString = function () {

 var item;

 var str ="\n\nAbbreviation Information\n";

 var list_length = this.abbreviation_items.length;
 
 for (var i=0; i < list_length; i++ ) {
  str += this.abbreviation_items[i].toString();  
 } // end loop

 return str;
};

 /** ===============================================================
 *
 * AbbreviationItem
 *
 * @desc Constructor for AbbreviationItem object which contains information
 *    about a unique set of color contrast features of the web page 
 *
 * @constructs
 *
 * @return  AbbreviationItem object 
 *
 ================================================================ */
 
OpenAjax.a11y.cache.AbbreviationItem = function (abbreviation) {

  this.abbreviation_text = abbreviation;
  this.count = 0;

  this.dom_elements = [];
   
}; 

 /** ===============================================================
 *
 * toString
 *
 * @desc Provide information about the abbreviation item as a text
 *    string.
 *
 * @return  String 
 *
 ================================================================ */


OpenAjax.a11y.cache.AbbreviationItem.prototype.toString = function () {

 return "Abbreviation: " + abbreviation_text; 
};



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
/**
 * Copyright 2011 OpenAjax Alliance
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
/*                       ControlInfo                                */ 
/* ---------------------------------------------------------------- */

/**
 * ControlInfo
 *
 * @desc ControlInfo is the constructor for saving the current control information 
 *    when traversing the DOM for form control information
 *
 * @constructs
 *
 * @return  ControlInfo object
 */

OpenAjax.a11y.cache.ControlInfo = function (control_info) {
 
 if (control_info) {
  this.control_element = control_info.control_element;
  this.fieldset_element = control_info.fieldset_element;
  this.select_element  = control_info.select_element;
  this.label_element  = control_info.label_element; 
 }
 else {
  this.control_element = null;
  this.fieldset_element = null;
  this.select_element  = null;
  this.label_element  = null;
 } 
}; 

/** 
 * ControlsCache
 *
 * @desc ControlsCache is the constructor for lists of form element objects
 *
 * @constructs
 *
 * @return  ControlsCache object | null
 */

OpenAjax.a11y.cache.ControlsCache = function (dom_cache) {

  this.dom_cache     = dom_cache;
 
  this.control_elements = [];
  this.label_elements  = [];
  this.fieldset_elements = [];
  this.form_elements   = [];

  this.child_controls  = [];
 
  this.sort_property  = 'document_order';

  this.ascending    = true;
  this.up_to_date    = false;
 
  this.length      = 0;
  this.label_length   = 0;
  this.form_length   = 0;
  this.fieldset_length = 0;
  this.control_length  = 0;
};

/** 
 * addControlElement
 *
 * @desc Adds a ControlElement object to TableCache 
 *
 * @param control_element Object conrtrol element object to add to the cache
 *
 * @return length Integer length is the number of table elements in the cache
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addControlElement = function (control_element) {

  // item must exist and have the position property
  if (control_element) {
    this.control_length += 1;
    control_element.document_order = this.control_length;
    control_element.cache_id = "control_" + this.control_length;
    this.control_elements.push( control_element );
    return true;
  } 

  return false;

};


/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_controls.push(child_control); 
  }  
   
}; 

/**
 * addLabelElement
 *
 * @desc Adds a labeling element object to TableCache 
 *
 * @param label_element Object label element object to add to the cache
 *
 * @return Boolean true if add, false if not added
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabelElement = function (label_element) {

  // item must exist and have the position property
  if (label_element) {
    this.label_length += 1;
    label_element.document_order = this.label_length;
    label_element.cache_id = "label_" + this.label_length;
    this.label_elements.push( label_element );
    return true;
  } 

  return false;

};

/**
 * addFormElement
 *
 * @desc Adds a form element object to the form_elements array
 *
 * @param form_element Object form element object to add to the cache
 *
 * @return length Integer length is the number of labeling elements in the cache
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addFormElement = function (form_element) {

  // item must exist and have the position property
  if (form_element) {
    this.form_length = this.form_length + 1;
    form_element.document_order = this.form_length;
    form_element.cache_id = "form_" + this.form_length;
    this.form_elements.push( form_element );
  } 

  return this.form_length;

};

/** 
 * addFieldsetElement
 *
 * @desc Adds a fieldset element object to the fieldset_elements array
 *
 * @param field_element Object fieldset element object to add to the cache
 *
 * @return length Integer length is the number of labeling elements in the cache
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addFieldsetElement = function (fieldset_element) {

  // item must exist and have the position property
  if (fieldset_element) {
    this.fieldset_length = this.fieldset_length + 1;
    fieldset_element.document_order = this.fieldset_length;
    fieldset_element.cache_id = "fieldset_" + this.fieldset_length;
    this.fieldset_elements.push(fieldset_element);
  } 

  return this.fieldset_length;

};


/**
 * addChildControl
 * 
 * @desc add a child table element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * emptyList
 *
 * @desc Empties the list of FormElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.ControlsCache.prototype.emptyList = function () {

  this.controls_elements.length = [];
  this.labels_elements.length  = [];
  this.child_controls.length  = [];
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * updateCacheItem
 *
 * @desc Updates the ControlsCache object by checking to see if a DOMElement
 *    should be added to this cache
 *  
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param control_info    Object Information about the current control in the DOM recursion
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCacheItems = function (dom_element, control_info) {
 
  var form_element;
  var fieldset_element;
  var legend_element;
  var label_element;
  var input_element;
  var textarea_element;

  var button_element;

  var select_element;
  var optgroup_element;
  var option_element;
  
  var widget_element;
  
  var ci = new OpenAjax.a11y.cache.ControlInfo(control_info);

  switch (dom_element.tag_name) {

  case 'form':
    form_element = new OpenAjax.a11y.cache.FormElement(dom_element, control_info);

    this.addFormElement(form_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(form_element);   
    }
    else {
      this.addChildControl(form_element);     
    }
  
    ci.control_element = form_element;
  
    break;

  case 'fieldset':
    fieldset_element = new OpenAjax.a11y.cache.FieldsetElement(dom_element, control_info);
  
    this.addFieldsetElement(fieldset_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(fieldset_element);   
    }
    else {
      this.addChildControl(fieldset_element);     
    }
  
    ci.control_element = fieldset_element;
    ci.fieldset_element = fieldset_element;
    break;

  case 'legend':
    legend_element = new OpenAjax.a11y.cache.LegendElement(dom_element, control_info);
    legend_element.label = this.getElementTextContent(legend_element, false);

    this.addLabelElement(legend_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(legend_element);   
    }
    else {
      this.addChildControl(legend_element);     
    }

    if (control_info.fieldset_element) {
      control_info.fieldset_element.legend_element = legend_element;
    }

    ci.control_element = legend_element;
    break;

  case 'label':
    label_element = new OpenAjax.a11y.cache.LabelElement(dom_element, control_info);
    label_element.label = this.getElementTextContent(label_element, false);

    this.addLabelElement(label_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(label_element);   
    }
    else {
      this.addChildControl(label_element);     
    }
    
    ci.control_element = label_element;
    ci.label_element  = label_element;
    break;

  case 'input':
    input_element = new OpenAjax.a11y.cache.InputElement(dom_element, control_info);
    
    if (input_element.dom_element.node.type.toLowerCase() != "hidden") {
  
      this.addControlElement(input_element); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(input_element);   
      }
      else {
        this.addChildControl(input_element);     
      }
    } 
  
    break;

  case 'button':
    button_element = new OpenAjax.a11y.cache.ButtonElement(dom_element, control_info);
    
    this.addControlElement(button_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(button_element);   
    }
    else {
      this.addChildControl(button_element);     
    }
  
    ci.control_element = button_element;
    break;

  case 'textarea':
    textarea_element = new OpenAjax.a11y.cache.TextareaElement(dom_element, control_info);
  
    this.addControlElement(textarea_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(textarea_element);   
    }
    else {
      this.addChildControl(textarea_element);     
    }
  
    break;

  case 'select':
    select_element = new OpenAjax.a11y.cache.SelectElement(dom_element, control_info);
  
    this.addControlElement(select_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(select_element);   
    }
    else {
      this.addChildControl(select_element);     
    }
  
    ci.select_element = select_element;
    ci.control_element = select_element;
    break;

  case 'optgroup':
    optgroup_element = new OpenAjax.a11y.cache.OptgroupElement(dom_element, control_info);
  
    if (dom_element.node.label && dom_element.node.label.length) {
      optgroup_element.label = dom_element.node.label;  
    } 
 
    if (control_info.control_element) {
     control_info.control_element.addChildControl(optgroup_element);   
    }
    else {
      this.addChildControl(optgroup_element);     
    }
 
    ci.control_element = optgroup_element;
    break;

  case 'option':
    option_element = new OpenAjax.a11y.cache.OptionElement(dom_element, control_info);
  
    option_element.label = this.getElementTextContent(option_element, false);
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(option_element);   
    }
    else {
      this.addChildControl(option_element);     
    }

    if (control_info.select_element) {
      control_info.select_element.addOption(option_element);   
    }

    break;

  default:
  
    break;

  } // end switch

/**
  // check for widgets
  if (dom_element.role) {
  
    widget_element = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
  
  }
*/ 
  return ci;
};

/**
 * transverseDOMElementsForFormElements
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param controls_element   Object Current FormElement object that contains the DOMElement (can be null) 
 * @param controls_cell_element Object Current ControlElement object that contains the DOMElement (can be null)
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.transverseDOMElementsForControlElements = function (dom_element, control_info) {
 
 var i;
 var ci;

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  ci = this.updateCacheItems(dom_element, control_info);
  
  for (i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForFormElements(dom_element.children[i], ci);
  } // end loop
  
 }  
  
}; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 var control_info = new OpenAjax.a11y.cache.ControlInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating control elements cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForControlElements(children[i], control_info);
 }  
 
 this.calculateControlLabels();
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed control elements cache update.");

 this.up_to_date = true;
};

/**
 * getControlElementByCacheId
 *
 * @desc Traverses the cache to find the form control with the cache id
 *
 * @param cache_id  String cache id of form control
 *
 * @return ControlElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.control_elements.length; i++) {
  if (this.control_elements[i].cache_id == cache_id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * getControlElementById
 *
 * @desc Traverses the cache to find the form control with the html id
 *
 * @param id  String id of form control
 *
 * @return ControlElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementById = function (id) {

 var i;
 var control_elements_len = this.control_elements.length;

 for (i=0; i<control_elements_len; i++) {
  if (this.control_elements[i].dom_element.id == id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * getLabelElementByCacheId
 *
 * @desc Traverses the cache to find the form control with the id
 *
 * @param id  String id of form control
 *
 * @return ControlElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getLabelElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.label_elements.length; i++) {
  if (this.label_elements[i].cache_id == cache_id) {
   return this.label_elements[i];
  }
 }

 return null;
};

/**
 * getFormElementByCacheId
 *
 * @desc Traverses the cache to find the form element with the id
 *
 * @param id  String id of form control
 *
 * @return FormElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getFormElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.form_elements.length; i++) {
  if (this.form_elements[i].cache_id == cache_id) {
   return this.form_elements[i];
  }
 }

 return null;
};

/**
 * getFieldsetElementByCacheId
 *
 * @desc Traverses the cache to find the fieldset element with the id
 *
 * @param id  String id of form control
 *
 * @return FieldsetElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getFieldsetElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.fieldset_elements.length; i++) {
  if (this.fieldset_elements[i].cache_id == cache_id) {
   return this.fieldset_elements[i];
  }
 }

 return null;
};

/**
 * getLabelElementTextContent
 *
 * @desc Traverses the cache to get the text content associated with the label
 *
 * @param label_element Object label element object to calculate the text content 
 *
 * @return String
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getElementTextContent = function (label_element, include_control_values) {

 var strings = [];
 
  
 function getText(dom_element) {
  var i;
  
  // If text node get the text and return
  if( dom_element.type == NODE_TYPE.TEXT ) {
   var text = dom_element.text;
   strings.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == NODE_TYPE.ELEMENT ) {
   
    switch (dom_element.tag_name) {

    case 'img':
    case 'area':
     strings.push( dom_element.alt );     
     break;
     
    case 'input':
     if (include_control_values && dom_element.node.type == 'text') strings.push(dom_element.node.value);
     break;       

    case 'select':
     // *** need to add some code here to get 
     break;       
     
    default:
     break;    

    } // end switch     
    
    for (i = 0; i < dom_element.children.length; i++ ) {
     getText( dom_element.children[i]);
    }      
    
   }  
  } 
 } // end function getText

 getText(label_element.dom_element); 
 
 return strings.join("").trim().normalizeSpace();
 
};

/**
 * calculateLabelsByReference
 *
 * @desc Traverses the cache to calculate the label for each control 
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByReference = function () {

  var i;
  var id;
  var ce;
  var le;
 
  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<label_elements_len; i++) {
 
    le = label_elements[i];
 
    if (le.for_id) {
      id = le.for_id;
    }
    else {
      id = null;
    }  

    if (id && id.length) {
      ce = this.getControlElementById(id);
   
      if (ce) {
   
        // Add fieldset/legend information if defined
        if (ce.label === "" && 
          ce.fieldset_element && 
          ce.fieldset_element.legend_element) {
          ce.label = ce.fieldset_element.legend_element.label + " ";   
        }
    
        le.unused_label = false;
        ce.label += this.getElementTextContent(le, true) + " ";
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_REFERENCE;
        ce.label_for_comparison = ce.label.toLowerCase().trim();
      }
      else {
        le.unused_label = true;
      }
    }
  }
};

/**
 * calculateLabelsByEncapsulation
 *
 * @desc Traverses the cache to calculate the label for each control that is inside a label element
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByEncapsulation = function () {

  var i;
  var ce;
 
  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<control_elements_len; i++) {
 
    ce= control_elements[i];
 
    switch (ce.type) {
  
    case 'button':
      if (ce.dom_element.tag_name == 'button') {
        ce.label = this.getElementTextContent(ce, false);
        ce.label_source = OpenAjax.a11y.SOURCE.CHILD_TEXT_NODES;
        ce.label_for_comparison = ce.label.toLowerCase().trim();        
      }
      break;
  
    default:
      if (ce.label.length === 0 && 
          ce.label_element) {
    
        // Add fieldset/legend information if defined
        if (ce.fieldset_element && 
          ce.fieldset_element.legend_element) {
          ce.label = ce.fieldset_element.legend_element.label + " ";   
        }
       
        ce.label += ce.label_element.label + " ";
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION;
        ce.label_for_comparison = ce.label.toLowerCase().trim();
      }
      break;
    } // end switch 
  } // end loop
};

/**
 * calculateLabelsByTitle
 *
 * @desc Traverses the cache to calculate the label for each control that has a title element
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByTitle = function () {

  var i;
  var ce;
 
  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<control_elements_len; i++) {
 
    ce = control_elements[i];
 
    if (ce.label.length === 0 && 
        ce.dom_element.title &&
        ce.dom_element.title.length) {
    
      // Add fieldset/legend information if defined
      if (ce.fieldset_element && 
        ce.fieldset_element.legend_element) {
        ce.label = ce.fieldset_element.legend_element.label;   
      }
       
      ce.label += ce.dom_element.title;
      ce.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
      ce.label_for_comparison = ce.label.toLowerCase().trim();
    }
  }
};

/**
 * calculateControlLabels
 *
 * @desc Traverses the cache to calculate the label for each control 
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {

 this.calculateLabelsByReference();
 this.calculateLabelsByEncapsulation();
 this.calculateLabelsByTitle();
};

/* ---------------------------------------------------------------- */
/*                       FormElement                                */ 
/* ---------------------------------------------------------------- */

/**
 * FormElement
 *
 * @desc FormElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  FormElement | null
 */

OpenAjax.a11y.cache.FormElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 this.type = "form";
 
 this.action = dom_element.node.action;
 this.method = dom_element.node.method;
 this.name  = dom_element.node.name;
         
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the form element 
 *
 * @return String represening the FormElement
 */
 
OpenAjax.a11y.cache.FormElement.prototype.toString = function () {
 return "Form " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       FieldsetElement                            */ 
/* ---------------------------------------------------------------- */


/**
 * FieldsetElement
 *
 * @desc FieldsetElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  FieldsetElement | null
 */

OpenAjax.a11y.cache.FieldsetElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.type = "fieldset";

 this.fieldset_element = control_info.fieldset_element;
 
 this.legend_element = null;
 
 this.legend_count = 0;
         
};

/** 
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the fieldset element 
 *
 * @return String represening the FieldsetElement
 */
 
OpenAjax.a11y.cache.FieldsetElement.prototype.toString = function () {
 return "Fieldset " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       LegendElement                              */ 
/* ---------------------------------------------------------------- */

/**
 * LegendElement
 *
 * @desc LegendElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  LegendElement | null
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.label = "";
 this.label_for_comparison = "";

 this.fieldset_element = control_info.fieldset_element;
  
 if (control_info.fieldset_element) {
   control_info.fieldset_element.legend_count++;
 }
 
 this.type = "legend";

};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the legend element 
 *
 * @return String represening the LegendElement
 */
 
OpenAjax.a11y.cache.LegendElement.prototype.toString = function () {
 return "Legend " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       LabelElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * LabelElement
 *
 * @desc LabelElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  LabelElement | null
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.type = "label";

 this.label = "";
 this.label_for_comparison = "";

 this.fieldset_element = control_info.fieldset_element;

 this.for_id = dom_element.node.getAttribute('for');
         
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the label element 
 *
 * @return String represening the LabelElement
 */
 
OpenAjax.a11y.cache.LabelElement.prototype.toString = function () {
 return "Label " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       InputElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * InputElement
 *
 * @desc InputElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  InputElement | null
 */

OpenAjax.a11y.cache.InputElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
 
  this.type   = node.type; 
  this.value  = node.value; 
  this.checked = node.checked;

  switch (this.type) {
 
  case 'button':
    this.label = node.value; 
    this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
    this.label_for_comparison = this.label.toLowerCase().trim();
    break;

  case 'image':
    if (node.alt) {
      this.label = node.alt; 
      this.label_source = OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    else {
      if (node.title) {
        this.label = node.title;
        this.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
        this.label_for_comparison = this.label.toLowerCase().trim();
      }
      else {
        this.label = "";
        this.label_source = OpenAjax.a11y.SOURCE.NONE;
        this.label_for_comparison = "";
      }   
    }
    break;

  case 'submit':
  case 'reset':
    if (node.value) {
      this.label = node.value; 
      this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    else {
      this.label = this.type.capitalize();
      this.label_source = OpenAjax.a11y.SOURCE.BUTTON_TYPE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    break;
  
  default:
    this.label = "";
    this.label_source = OpenAjax.a11y.SOURCE.NONE;
    this.label_for_comparison = "";
    break; 
  }
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};


/**
 * toString
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return String represening the InputElement
 */
 
OpenAjax.a11y.cache.InputElement.prototype.toString = function () {
 return "Input " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       ButtonElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * ButtonElement
 *
 * @desc ButtonElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  InputElement | null
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.child_controls = [];
 
 var node = dom_element.node;
 
 this.type   = 'button'; 
 
 this.label  = "";
 this.label_for_comparison = "";
 
 this.readonly  = node.readonly;
 this.disabled  = node.disabled;
 
 this.fieldset_element = control_info.fieldset_element;

};


/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
 if (child_control) {
  this.child_controls.push(child_control); 
 }  
}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return String represening the InputElement
 */
 
OpenAjax.a11y.cache.ButtonElement.prototype.toString = function () {
 return "Button " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                    TextareaElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * TextareaElement
 *
 * @desc TextareaElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  TextareaElement | null
 */

OpenAjax.a11y.cache.TextareaElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;

 this.type = "textarea";
 
 var node = dom_element.node;

 this.label  = "";
 this.label_for_comparison = "";

 this.rows = node.rows; 
 this.cols = node.cols; 
 
 this.readonly  = node.readonly;
 this.disabled  = node.disabled;
 
 this.label_element  = control_info.label_element;
 this.fieldset_element = control_info.fieldset_element;

};

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the TextareaElement
 */
 
OpenAjax.a11y.cache.TextareaElement.prototype.toString = function () {
 return "Textarea " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                      SelectElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * SelectElement
 *
 * @desc SelectElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  SelectElement | null
 */

OpenAjax.a11y.cache.SelectElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.child_controls = [];
  this.option_elements = [];
 
  this.type = "select";

  var node = dom_element.node;

  this.label = "";
  this.label_for_comparison = "";

  this.size   = node.size;
  this.multiple = node.multiple;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
 
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.SelectElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.SelectElement.prototype.addOption = function (option_element) {

 if (option_element) {
  this.option_elements.push(option_element); 
  option_element.document_order = this.option_elements.length;
  option_element.cache_id    = this.cache_id + "_" + this.option_elements.length;
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the SelectElement
 */
 
OpenAjax.a11y.cache.SelectElement.prototype.toString = function () {
 return "Select " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       OptgroupElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * OptgroupElement
 *
 * @desc OptgroupElement is the object used to hold data about a optgroup in select controls
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  OptionElement | null
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
         
 this.type = "optgroup";
 
 this.select_element = control_info.select_element;
         
 this.label = dom_element.node.label;
 this.label_for_comparison = this.label.toLowerCase().trim();
 
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the OptionElement
 */
 
OpenAjax.a11y.cache.OptgroupElement.prototype.toString = function () {
 return "Optgroup " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                      OptionElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * OptionElement
 *
 * @desc OptionElement is the object used to hold data about a option element in a select control 
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  OptionElement | null
 */

OpenAjax.a11y.cache.OptionElement = function (dom_element, control_info) {

 this.dom_element   = dom_element;
         
 this.type = "option";
 
 this.select_element = control_info.select_element;
         
 this.value = dom_element.node.value;
 
};

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the OptionElement
 */
 
OpenAjax.a11y.cache.OptionElement.prototype.toString = function () {
 return "Option " + this.document_order; 
};
/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            TablesCache                            */
/* ---------------------------------------------------------------- */

/** 
 * TablesCache
 *
 * @constructor
 *
 * @desc Create a TablesCache object to hold TableElement objects
 *
 * @return  TablesCache object | null
 */
 OpenAjax.a11y.cache.TablesCache = function (dom_cache) {

   this.dom_cache = dom_cache;
   this.table_elements = [];  
   this.child_tables = [];    
   this.cells = [];
   this.sort_property = 'document_order';
   this.ascending = true;
   this.up_to_date = false;
   this.length = 0;
   this.cells_total = 0;
 
   return this;
  
 };

/**
 * TableInfo
 *
 * @desc TableInfo is the constructor for information related to tables
 *    in building the table cache
 *
 * @constructs
 *
 * @return  TableInfo object 
 */
 OpenAjax.a11y.cache.TableInfo = function (table_info) {

   if (table_info) {
     this.table_element      = table_info.table_element;
     this.table_cell_element = table_info.table_cell_element;
   }
   else {
     this.table_element    = null;
     this.table_cell_element  = null;
   }
   
   return this;
 }; 
 
/**
 * addTableElement
 *
 * @desc Adds a TableElement object to TableCache 
 *
 * @param table_element Object TableElement object to add to the cache
 *
 * @return length Integer length is the number of table elements in the cache
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addTableElement = function (table_element) {

   // item must exist and have the position property
   if (table_element) {
     this.length = this.length + 1;
     table_element.document_order = this.length;
     table_element.cache_id = "table_" + this.length;
     this.table_elements.push( table_element );
   } 

   return this.length;

 };

/**
 * getTableElementByCacheId
 *
 * @desc Traverses the cache to find the table element with the cache id
 *
 * @param cache_id  String cache id of table element
 *
 * @return TableElement | null
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getTableElementByCacheId = function (cache_id) {

   var i;
   var table_elements_len = this.table_elements.length;

   for (i=0; i<table_elements_len; i++) {
     
     if (this.table_elements[i].cache_id == cache_id) {
       return this.table_elements[i];
     }
   }

   return null;
 };

/** 
 * addChildTable
 * 
 * @desc add a child table element reference to a table element 
 *
 * @constructs
 *
 * @param  child_table    Object table element object is the child 
 *
 * @return  nothing
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addChildTable = function (child_table) {

   if (child_table) {
     this.child_tables.push(child_table); 
   }  
 }; 

/**
 * emptyList
 *
 * @desc Empties the list of TableElement objects 
 *
 * @return none
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.emptyList = function () {

   this.table_elements.length = 0;
   this.child_tables.length = 0;
   this.cells.length = 0;
   this.sort_property = 'document_order';
   this.up_to_date = false;

 };

/** 
 * updateCacheItems
 *
 * @desc Updates the TablesCache object by checking to see if a DOMElement
 *    TableElement and TableCellElement object should be added to this cache
 *  
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param table_info     Object contains the informaiton related to the current TableElement object that contains the DOMElement (can be null)
                         and current TableCellElement object that contains the DOMElement (can be null)
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.updateCacheItems = function (dom_element, table_info) {

   var ti = new OpenAjax.a11y.cache.TableInfo(table_info);

   switch (dom_element.tag_name) {

     case 'table':
       var table_element = new OpenAjax.a11y.cache.TableElement(this.dom_cache, dom_element, table_info);
       this.addTableElement(table_element); 
  
       if (table_info.table_element) {
         table_info.table_element.addChildTable(table_element);   
       }
       else {
         this.addChildTable(table_element);
       }
       ti.table_element = table_element;    
       break;

     case 'td':
     case 'th':
       var table_cell_element = new OpenAjax.a11y.cache.TableCellElement(dom_element, table_info);
       table_info.table_element.addTableCellElement(table_cell_element);
       this.cells_total = this.cells_total + 1;
       ti.table_cell_element = table_cell_element;
       break;

     case 'tr':
       if (table_info.table_element) { 
         table_info.table_element.nextRow();
       } // endif 
       break;

     case 'tbody':
       if (table_info.table_element) { 
         table_info.table_element.hasTBody();
       } // endif
       break;

     case 'thead':
       if (table_info.table_element) { 
         table_info.table_element.hasTHead();
       } // endif 
       break;

     case 'caption':
       if (table_info.table_element) { 
         table_info.table_element.addCaption(dom_element);
       } // endif
       break;

     default:
     break;

   } // end switch

   return ti;
 };

/**
 * transverseDOMElementsForTableElements
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param table_info     Object Information needed for defining the parent/child relationships of nested tables
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.transverseDOMElementsForTableElements = function (dom_element, table_info) {

   var i;
   var ti;

   if (!dom_element) return;

     if (dom_element.type == NODE_TYPE.ELEMENT) {

       ti = this.updateCacheItems(dom_element, table_info);
  
       for (i=0; i<dom_element.children.length; i++ ) {
         this.transverseDOMElementsForTableElements(dom_element.children[i], ti);
       } // end loop
     }  
 }; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.updateCache = function () {
   
   var i;
   var children = this.dom_cache.element_cache.children;
   var children_len = children.length;

   var table_info = new OpenAjax.a11y.cache.TableInfo(null);

   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating table elements cache.");
 
   for (i=0; i < children_len; i++) {
     this.transverseDOMElementsForTableElements(children[i], table_info);
   }  
   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed table elements cache update, number of table items is " + this.length + " and the number of cells is " + this.cell_total);
   this.up_to_date = true;
 };

/**
 * TableElement
 *
 * @desc TableElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 * @param  table_cell_element  Object  table_cell_element object provides information about the table 
 *                     cell the table may be a child of in the dom 
 *
 * @return  TableElement | null
 */
 OpenAjax.a11y.cache.TableElement = function (dom_cache, dom_element, table_info) {

   if( !dom_element ) {
     return null;  
   } 

   this.cell_ids = [];
   this.dom_cache = dom_cache;
   this.dom_element = dom_element;
   
   // Useful for testing nesting
   this.parent_table_element   = table_info.table_element;   
   this.parent_table_cell_element = table_info.table_cell_element;   
 
   this.child_tables = [];

   this.summary = this.dom_element.node.getAttribute("summary");
  
   if (this.summary) this.summary_for_comparison = this.summary.trim().toLowerCase();
 
   this.caption = "";
   
   this.max_row = 0; 
   this.max_column = 0;
   
   this.cell_count = 0;
   this.row     = -1;   
   this.column   = 0;  
   this.cells    = [];
   this.cells[0]  = [];
   this.cells[0][0] = null;
 
   this.has_thead  = false;   
   this.has_tbody  = false;
   this.has_th   = false;
   this.has_scope  = false;
   this.has_headers = false;
   this.has_spans  = false;
   this.is_data_table = false;
   this.is_complex_data_table = false;
 
   return this;
 };

/**
 * getTableCellElementByCacheId 
 *
 * @desc retrieve TableCellElement from TablesCache based on its cache_id
 *
 * @param cache_id String assigned by the Cache system 
 *
 * @return TableCellElement | null 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.getTableCellElementByCacheId = function (cache_id) {
 
   var r, c;
   var cell;
   var row_len;
   var rows_len = this.row;

   for (r=0; r<=rows_len; r++) {
     row_len = this.cells[r].length;
     
     for(c=0; c<row_len; c++) {
       cell = this.cells[r][c];
       
       if (cell && cell.cache_id == cache_id) {
         return cell; 
       }
     } 
   }
   return null;
 };

/**
 * addChildTable
 * 
 * @desc add a child table element reference to a table element 
 *
 * @constructs
 *
 * @param  child_table    Object table element object is the child 
 *
 * @return  nothing
 */
 OpenAjax.a11y.cache.TableElement.prototype.addChildTable = function (child_table) {

   if (child_table) {
     this.child_tables.push(child_table); 
   }  
 }; 

/**
 * toString
 *
 * @desc Returns a text string representation of the table 
 *
 * @return String represening the TableElement
 *
 */
 OpenAjax.a11y.cache.TableElement.prototype.toString = function () {
   return "table " + this.document_order; 
 };

/**
 * addCaption
 *
 * @desc Adds caption information to the TableElement object
 *
 * @param dom_element DOMElement object containing the caption element 
 * 
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addCaption = function (dom_element) {
   
   var caption;
  
   if (dom_element) {
     caption = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
     this.caption        = caption;  
     this.caption_for_comparison = caption.trim().toLowerCase();
     this.is_data_table = true;
   } 
 };

/**
 * hasTHead
 *
 * @desc Sets a flag in TableElement that a THEAD element is present in the table
 *    Usefule for identifying tables used for tabulr data
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.hasTHead = function () {

   this.has_thead = true;
   this.is_data_table = true;
 };

/**
 * hasTBody
 *
 * @desc Sets a flag in TableElement that a TBODY element is present in the table
 *    Useful for identifying tables used for tabular data
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.hasTBody = function () {

   this.has_tbody = true;
 };

/**
 * nextRow
 *
 * @desc Updates the current table cell array to start a new row
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.nextRow = function () {
 
   this.row = this.row + 1;
   this.max_row = this.row+1; // 1 based index
      
   // see if there is already a row created
   if (typeof(this.cells[this.row]) != 'object') {
     // If row does not exist create it
     this.cells[this.row] = [];
     this.cells[this.row][0] = null;
   }
   
   if (!this.is_complex_data_table && this.max_column > 2 ) {
	 this.multipleTHInRow(this.max_row-1); 	   
   } 
   
   if (!this.is_complex_data_table && this.max_row > 2) {
	 this.multipleTHInColumn(); 	   
   }
 };
 
/**
 * multipleTHInRow
 * 
 * @desc
 * 
 * @param
 */
 OpenAjax.a11y.cache.TableElement.prototype.multipleTHInRow = function(row) {
   
   if (!this.cells[row] || this.cells[row].length < 2) return;
   
   var i;
   var th_count = 0;
   var td_count = 0;
   
   var row_len = this.cells[row].length;
   var cell;
   
   for (i=0; i<row_len; i++) {
	 cell = this.cells[row][i];
	
	 if (cell && cell.is_header) {
	   th_count++;
	 }
	 else {
	   td_count++;
	 }
   }   
   
   if (th_count > 1 && td_count > 0) this.is_complex_data_table = true;
   
 };

/**
 * multipleTHInColumn
 * 
 * @desc
 * 
 * @param
 */
 OpenAjax.a11y.cache.TableElement.prototype.multipleTHInColumn = function() {
      
   var c, r;
   var th_count = 0;
   var td_count = 0;

   var row_max = this.max_row;
   var col_max = this.cells[0].length;
   var row_len;
   var cell;
   
   for (c=0; c<col_max; c++) {   
     th_count = 0;
     td_count = 0;
     
     for (r=0; r<row_max; r++) {
	   cell = this.cells[r][c];
	
  	   if (cell && cell.is_header) {
	     th_count++;
	   }
	   else {
	     td_count++;
	   }
	 }
	 
     if (th_count > 1 && td_count > 0) {
       this.is_complex_data_table = true;
       return;
     }  
   }   
 };

/**
 * addTableCellElement
 *
 * @desc Adds a TableCellElement to the current row
 *
 * @param table_cell_element is a cell to add in to the current row of a table 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableCellElement = function (table_cell_element) {

   var i;
   var j;
   var r;
   var c;
// var number_of_th;
// var row_of_cells;
   
   this.column = 0; 
  
   if (table_cell_element.id) {
     this.cell_ids.push(table_cell_element.id);
   }

   // if table cell is already in array (due to row or column spanning) move to next spot available 
   while ((this.cells[this.row][this.column] !== undefined) &&
    (this.cells[this.row][this.column] !== null) ) {
     this.column++;
   } // end loop

   r = this.row;
   c = this.column;
   //OpenAjax.a11y.console("row in the addTableCellElement..." + r);
   
  
   table_cell_element.cache_id = this.cache_id + "_cell_r" + this.row + "_c" + this.column;

   for (i=0; i<table_cell_element.row_span; i++) {
     
     for (j=0; j<table_cell_element.col_span; j++) {
       this.cells[r][c] = table_cell_element;
       c += 1;
     }
     r += 1;
  
     // see if there is already a row created
     if (typeof(this.cells[r]) != 'object') {
       // If row does not exist create it
       this.cells[r] = [];
       this.cells[r][0] = null;
     } 
   }  
   this.getTableCellHeader(this.row, this.column, table_cell_element);

   if (c>this.max_column) this.max_column = c; 
 }; 

/**
 * sortCellIds
 * 
 * @desc 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.sortCellIds = function () {

   var swapped = false;
   var temp = null;
   var i;
 
   var cell_ids_len = this.cell_ids.length;

   do{
     swapped = false;
     
     for (i = 1; i < cell_ids_len; i++ ) {
     
       if (this.cell_ids[i-1] > this.cell_ids[i]) {
         
         // swap the values
         temp = this.cell_ids[i-1];
         this.cell_ids[i-1] = this.cell_ids[i];
         this.cell_ids[i] = temp;
         swapped = true;
       } 
     } // end loop
   } while (swapped);
 };

/**
 * getTableCellHeader
 *
 * @desc 
 *
 * @param row
 * @param column
 * @table_cell_element
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.getTableCellHeader = function (row, column, table_cell_element) {

   var tag_name;   
   var scope;
   var string_array = [];
   var cell, r, c;

   tag_name = table_cell_element.dom_element.tag_name;
   scope  = table_cell_element.dom_element.scope;
 
   if (table_cell_element.headers) {
     table_cell_element.header_content = this.dom_cache.element_with_id_cache.getTextFromIds(table_cell_element.headers);
   }
   else {
     // if a table cell is used as a header in the table and has no header attribute set its header to an empty string
     if (table_cell_element.is_header) {
       table_cell_element.header_content = "";
     }   
     else {

       // find TH or TD with scope=column in the same column
       for (r=(row-1); r>=0; r--) {
         cell = this.cells[r][column];
    
         if (cell) {
           tag_name = cell.dom_element.tag_name;
           scope  = cell.scope;
      
           if (tag_name == "th" || scope == "col") {
             string_array.push(cell.cell_content);
           }
         }     
       } 

       // find TH or TD with scope=row in the same row
       for (c=(column-1); c>=0; c--) {
         cell = this.cells[row][c];
    
         if (cell) {
           tag_name = cell.dom_element.tag_name;
           scope  = cell.scope;
          
           if (tag_name == "th" || scope == "row") {
             string_array.push(cell.cell_content);
           }
         } 
       } 
       table_cell_element.header_content = string_array.join(' ');
     } 
   } 
 };

/**
 *
 * findFirstRowWithContent 
 *
 * @desc findFirstRowWithContent retrieves the first row in a table which has the content
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstRowWithContent = function() {
 
   var row;
   var row_len = this.row;
   var column;
   var column_len;
   var text;
   var cell;
 
   for (row=0; row<row_len; row++) {
     column_len = this.cells[row].length;
 
     for (column=0; column<column_len; column++) {
       cell = this.cells[row][column];
       text = cell.dom_element.getText();
    
       if (text) text = text.trim();
       
       if (cell.is_header || text.length) {
         return row;
       }
     }
   }
   return null;
 };

/**
 * findFirstColumnWithContent
 *
 * @desc findFirstColumnWithContent retrieves the first column in a table which has the content
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstColumnWithContent = function() {
 
   var column;
   var column_len = this.column;
   var row;
   var row_len;
   var text;
   var cell;
 
   for (column=0; column<column_len; column++) {
 
     row_len = this.cells[column].length;
 
     for (row=0; row<row_len; row++) {
       cell = this.cells[column][row];
       text = cell.dom_element.getText();
       
       if (text) text = text.trim();
       
       if (cell.is_header || text.length) {
         return column;
       }
     }
   }
   return null;
 };


/**
 * headerCellsInFirstRow
 *
 * @desc 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstRow = function () {

   var r = {};
   r.count = 0;
   r.total = 0;
   r.th_count = 0;

   var column;
   var cell;
   var text;
 
   var row = this.findFirstRowWithContent();
   
   if (this.cells[row]) {
     var column_len = this.cells[row].length;
 
     for (column=0; column<column_len;) {
       cell = this.cells[row][column];
     
       if (cell.is_header) {
         r.count++;
         r.total++;   
       
         if (cell.is_th) r.th_count++;   
       }
       else {
         text = cell.dom_element.getText();
   
         if (text) text = text.trim();
   
         if (text.length) {
           r.total++;
         } 
       }
       column += cell.col_span;
     }
   }  
   return r;
 };

/** 
 * headerCellsInFirstColumn
 *
 * @desc 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstColumn = function () {

   var c = {};
   c.count = 0;
   c.total = 0;
   c.th_count = 0;
 
   var row;
   var cell;
   var text;
 
   var column = this.findFirstRowWithContent();
   
   if (!this.cells || !this.cells[column]) return c; 
   
   var row_len = this.cells[column].length;
 
   for (row=0; row<row_len;) {
     cell = this.cells[column][row];
     
     if (cell.is_header) {
       c.count++;
       c.total++;
       
       if (cell.is_th) c.th_count++;   
     }
     else {
       text = cell.dom_element.getText();
       
       if (text) text = text.trim();
   
       if (text.length) {
         c.total++;
       } 
     }
     row += cell.row_span;
   }
   return c;
 };

/**
 * TableCellElement
 *
 * @desc Constructor for TableCellElement object which contains 
 *    informatin a table cell
 *
 * @param  dom_elements Object Array of DOM elements that have IDs
 * @param  table_info  Object table information object 
 *
 * @return TableCellElement | null 
 *
 */
 OpenAjax.a11y.cache.TableCellElement = function (dom_element, table_info) {

   var headers_array = [];
   
   if (!table_info.table_element || !dom_element) return null;

   this.dom_element = dom_element;
   this.table_element = table_info.table_element;
  
   this.is_th = dom_element.tag_name == 'th';
   this.scope = dom_element.node.getAttribute('scope');   

   if (this.is_th || this.scope) {
     this.is_header = true;
     this.header_content = "";
     table_info.table_element.is_data_table = true;
     table_info.table_element.has_th = true;
     
     if (this.scope) this.scope = this.scope.toLowerCase();
   }
   else {
     this.is_header = false;
   }

   if (table_info.table_element.is_data_table) {
     this.cell_content = dom_element.getText().trim();
   } 
   this.headers = dom_element.node.getAttribute('headers');
      
   if (this.headers && this.headers.length > 0) {
     this.headers_array = this.headers.split(" ");
   
     // check to see if <th> has an attribute headers with a value
     if (this.headers_array && this.headers_array.length > 0) table_info.table_element.is_complex_data_table = true;
   }
   
   this.row_span   = dom_element.node.getAttribute('rowspan');
   
   if (this.row_span) { 
     this.row_span   = parseInt(this.row_span,10);
     
     if (this.row_span > 1) table_info.table_element.is_complex_data_table = true;
   } else {
     this.row_span   = 1;
   }
   this.col_span   = dom_element.node.getAttribute('colspan');    
   
   if (this.col_span) { 
     this.col_span   = parseInt(this.col_span,10);
     
     if (this.col_span > 1) table_info.table_element.is_complex_data_table = true;
   } else {
     this.col_span   = 1;
   }
 
   return this;
 }; 

/**
 * toString
 *
 * @desc Define TableCellElement toString function 
 *
 */
 OpenAjax.a11y.cache.TableCellElement.prototype.toString = function () {
   return "Table cell: " + this.cache_id;
 };

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
 * DOMElementCache
 *
 * @desc DOMElementCache object is the constructor for a list of DOMElement objects.
 *
 * @constructs
 *
 * @return  DOMElementCache object
 *
 ================================================================ */

OpenAjax.a11y.cache.DOMElementCache = function () {

 this.dom_elements = [];
 this.children = [];
 this.sort_property = 'document_order';
 this.length = 0;

 return this;

};

/** ================================================================
*
* addDOMElement
*
* @desc Adds a DOMElement object to the DOMElementCache
*
* @param dom_element Object  DOMElement object to add to the cache
*
* @return Number length is the number of DOMElements in the top level of the cache
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMElement = function (dom_element) {

 // item must exist and have the position property
 if (dom_element) {
  this.length = this.length + 1;
  dom_element.document_order = this.length;
  dom_element.cache_id = "dome_" + this.length;
  this.dom_elements.push( dom_element );
 }

 return this.dom_elements.length;

};

/** ================================================================
*
* addChild
*
* @desc  Adds a child DOMElement or DOMText object to the children
*     array to mimic the DOM node tree structure
*
* @param child Object The DOMElement or DOMText object to be add
*            that is a child of the current DOMElement
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.addChild = function ( child ) {

 if (child) {
  this.children.push( child );
 }

};

/** ================================================================
*
* getDOMElementById
*
* @desc Returns the DOMElement object with the id
*
* @param cache_id String  cache_id of the DOMElement object
*
* @return DOMElement object if found, or null if not found
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementById = function (id) {

 var i;
 var dom_elements_len = this.dom_elements.length;

 if (id && id.length) {
  for (i=0; i < dom_elements_len; i++) {
   if (this.dom_elements[i].id == id) {
    return this.dom_elements[i];
   }
  } // end loop
 }

 return null;
};

/** ================================================================
*
* getDOMElementByCacheId
*
* @desc Returns the DOMElement object with the id
*
* @param cache_id String  cache_id of the DOMElement object
*
* @return DOMElement object if found, or null if not found
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByCacheId = function (cache_id) {

 var i;
 var dom_elements_len = this.dom_elements.length;

 if (cache_id && cache_id.length) {
  for (i=0; i < dom_elements_len; i++) {
   if (this.dom_elements[i].cache_id == cache_id) {
    return this.dom_elements[i];
   }
  } // end loop
 }

 return null;
};


/** ================================================================
*
* emptyList
*
* @desc Empties the list of DOMElement Objects from the DOM element cache
*
* @return none
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.emptyList = function () {

 this.dom_elements.length = 0;
 this.sort_property = 'document_order';

};

/** ================================================================
*
* sortDOMElements
*
* @desc Sort the DOMElements by one of the properties of the object
*
* @param property  String  property to be used to sort the cache
* @param ascending  Boolean true if sort in ascending order; false in descending order
*
* @return true if list was sorted, false if not
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.sortDOMElements = function(property, ascending ) {

 var swapped = false;
 var temp = null;
 var i;

 // if the property does not exist or if the cache is empty return false
 if( this.dom_elements &&
   this.dom_elements.length &&
   !this.dom_elements[0][property] ) {
  return false;
 }

 var dom_elements_len = this.dom_elements.length;

 if( ascending ) {
  do{
    swapped = false;
    for (i = 1; i < dom_elements_len; i++ ) {
     if (this.dom_elements[i-1][property] > this.dom_elements[i][property]) {
      // swap the values
      temp = this.dom_elements[i-1];
      this.dom_elements[i-1] = this.dom_elements[i];
      this.dom_elements[i] = temp;
      swapped = true;
     }
    } // end loop

  } while (swapped);
 }
 else {
  do {
   swapped = false;
   for (i = 1; i < dom_elements_len; i++) {
    if (this.dom_elements[i-1][property] < this.dom_elements[i][property]) {
     // swap the values
     temp = this.dom_elements[i-1];
     this.dom_elements[i-1] = this.dom_elements[i];
     this.dom_elements[i] = temp;
     swapped = true;
    }
   } // end loop
  } while (swapped);
 }

 this.sort_property = property;

 return true;

};

/** ================================================================
*
* getTextFromIds
*
* @desc Get the accessible text content dom nodes from a list of ids
*    Text from each DOM element node is added to the string array
*
* @param ids      String A list of space separated ids
*
* @return String
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.getTextFromIds = function( ids ) {

 var i;
 var text_array = [];
 var id_array = ids.split(' ');
 var id_array_len = id_array.length;
 var dom_element = null;

 for (i=0; i<id_array_len; i++) {
  dom_element = this.getDOMElementById(id_array[i]);
  if (dom_element) {
   text_array.push(dom_element.getText());
  }

 } // end loop

 return text_array.join(' ');
};


/**
 * checkForUniqueIDs
 *
 * @desc Check DOMElements for unique ids and set id_unique property
 *
 * @return None.
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.checkForUniqueIDs = function () {

  var i;
  var j;
 
  var dom_elements = this.dom_elements;
  var dom_elements_len1 = dom_elements.length-1;
  var dom_elements_len2 = dom_elements.length;
 
  var de1;
  var de2;

  for (i = 0; i < dom_elements_len1; i++ ) {
    de1 = dom_elements[i];

    for (j=i+1; j < dom_elements_len2; j++) {
      de2 = dom_elements[j];

      if(de1.id.length && de2.id.length && de1.id == de2.id) {
        de1.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de2.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
      }      
    }  
  }
};


/** ================================================================
*
* DOMText
*
* @desc  DOMText is the cache object for DOM nodes of type text
*
* @param node Object The DOM node that corresponds to this
*
* @return DOMElement (implicitly) | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMText = function (node, parent_element) {
 this.type = NODE_TYPE.TEXT;
 this.text = node.data;
 parent_element.addToCharacterCount(this.text.length);
};




/** ================================================================
*
* OpenAjax.a11y.cache.DOMElement
*
* @desc  DOMElement encapsulates information about DOM element
*     nodes and methods for calculating derived properties
*     used by all cache objects.
*
* @constructor
*
* @param node        Object The DOM element node that corresponds
*                  to this DOMElement object, and from which
*                  common information is derived for the DOM
*                  element cache.
*
* @param parent_dom_element Object The DOM element node that corresponds to this
*                  DOMElement object, and from which all information
*                  is derived.
*
* @return DOMElement (implicitly) | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element) {

 var i;
 var attr;
 var attributes;
 var attributes_len;

 // check to make sure it is a valid node
 if (node === null) return null;

 this.type           = NODE_TYPE.ELEMENT;
 this.document_order = 0;
 this.node           = node;
 this.tag_name       = node.tagName.toLowerCase();
 this.id             = node.id;
 
 if (this.id !== '') {
   this.id_unique  = OpenAjax.a11y.ID.NOT_DEFINED;
 }
 else {
   this.id_unique  = OpenAjax.a11y.ID.UNIQUE;  
 }
 
 this.character_count = 0;

 // Save relationships with other elements
 this.parent = parent_dom_element;
 this.children = [];
 this.aria_properties = [];

 // Cache important attributes for accessibility
 i = 0;
 attr = null;
 attributes = node.attributes;
 attributes_len = attributes.length;

 this.className = "";
 this.has_alt_attribute = false;

 for (i=0; i< attributes.length; i++ ) {

   attr = attributes[i];

   switch (attr.name) {

   case 'class':
    this.class_name = attr.value.toLowerCase();
    break;

   case 'role':
    this.role = attr.value.toLowerCase();
    break;

   case 'alt':
    this.alt = attr.value;
    this.has_alt_attribute = true;
    break;

   case 'title':
    this.title = attr.value;
    break;

   case 'aria-describedby':
    this.aria_describedby = attr.value;
    break;

   case 'aria-hidden':
    this.aria_hidden    = attr.value.toLowerCase();
    break;

   case 'aria-label':
    this.aria_label    = attr.value;
    break;

   case 'aria-labelledby':
    this.aria_labelledby  = attr.value;
    break;

   default:

    if (attr.name.indexOf('aria-') === 0 ) {
     this.aria_properties.push(attr);
    }
    break;

   } // end switch

 } // end loop

 this.supports_events = OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS;

 if (OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS) {
  this.events = this.EnumerateFirefoxEvents(node, parent_dom_element);
 }
 else {
  this.events = {};
  this.events.supports_events = false;
 }


 // Create areas to store rule results associates with this node
 this.rules_violations                = [];
 this.rules_recommendations           = [];
 this.rules_manual_evaluations        = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];
 this.rules_warnings                  = [];
 this.rules_na                        = [];

 return this;

};

/**
 * hasAttrWithValue
 *
 * @desc Check DOMElement for presence of attribute with specified value
 *
 * @param String name of attribute
 * @param String value of attribute
 *
 * @return boolean Indicates whether or not DOMElement has the specified
 *                 attribute with the specified value.
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasAttrWithValue = function (name, value) {

  if (this.hasOwnProperty (name)) {
    return this[name] === value;
  }

  return false;

};


/** ================================================================
*
* EnumerateFirefoxEvents
*
* @desc
* @constructor
*
* @param node        Object The DOM element node that corresponds
*                  to this DOMElement object, and from which
*                  common information is derived for the DOM
*                  element cache.
*
* @return Object | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFirefoxEvents = function (node, parent_dom_element) {

 var i;
 
 var events = {};
 events.supports_events = false;

 var event_listener = Components.classes["@mozilla.org/eventlistenerservice;1"];

 if (event_listener !== null &&
   event_listener !== undefined) {

  events.supports_events = true;

  events.has_blur     = false;
  events.has_change    = false;
  events.has_click    = false;
  events.has_double_click = false;
  events.has_focus    = false;
  events.has_key_down   = false;
  events.has_key_press  = false;
  events.has_key_up    = false;
  events.has_load     = false;
  events.has_mouse_down  = false;
  events.has_mouse_up   = false;
  events.has_mouse_move  = false;
  events.has_mouse_out  = false;
  events.has_mouse_over  = false;

  if (parent_dom_element && parent_dom_element.events) {
   events.ancestor_has_blur     = parent_dom_element.events.has_blur;
   events.ancestor_has_change    = parent_dom_element.events.has_change;
   events.ancestor_has_click    = parent_dom_element.events.has_click;
   events.ancestor_has_double_click = parent_dom_element.events.has_double_click;
   events.ancestor_has_focus    = parent_dom_element.events.has_focus;
   events.ancestor_has_key_down   = parent_dom_element.events.has_key_down;
   events.ancestor_has_key_press  = parent_dom_element.events.has_key_press;
   events.ancestor_has_key_up    = parent_dom_element.events.has_key_up;
   events.ancestor_has_load     = parent_dom_element.events.has_load;
   events.ancestor_has_mouse_down  = parent_dom_element.events.has_mouse_down;
   events.ancestor_has_mouse_up   = parent_dom_element.events.has_mouse_up;
   events.ancestor_has_mouse_move  = parent_dom_element.events.has_mouse_move;
   events.ancestor_has_mouse_out  = parent_dom_element.events.has_mouse_out;
   events.ancestor_has_mouse_over  = parent_dom_element.events.has_mouse_over;
  }
  else {
   events.ancestor_has_blur     = false;
   events.ancestor_has_change    = false;
   events.ancestor_has_click    = false;
   events.ancestor_has_double_click = false;
   events.ancestor_has_focus    = false;
   events.ancestor_has_key_down   = false;
   events.ancestor_has_key_press  = false;
   events.ancestor_has_key_up    = false;
   events.ancestor_has_load     = false;
   events.ancestor_has_mouse_down  = false;
   events.ancestor_has_mouse_up   = false;
   events.ancestor_has_mouse_move  = false;
   events.ancestor_has_mouse_out  = false;
   events.ancestor_has_mouse_over  = false;
  }

  var event_listener_service = event_listener.createInstance(Components.interfaces.nsIEventListenerService);
  var node_event_service = event_listener_service.getListenerInfoFor(node, {});

  for (i=0; i<node_event_service.length; i++) {
   var node_event_information = node_event_service[i].QueryInterface(Components.interfaces.nsIEventListenerInfo);

   if (!node_event_information.inSystemEventGroup &&
     node_event_information.allowsUntrusted ) {

    switch (node_event_information.type) {

    case "blur":
     events.has_blur = true;
     break;

    case "change":
     events.has_change = true;
     break;

    case "click":
     events.has_click = true;
     break;

    case "dbclick":
     events.has_double_click = true;
     break;

    case "focus":
     events.has_focus   = true;
     break;

    case "keydown":
     events.has_key_down  = true;
     break;

    case "keypress":
     events.has_key_press = true;
     break;

    case "keyup":
     events.has_key_up   = true;
     break;

    case "load":
     events.has_load    = true;
     break;

    case "mousedown":
     events.has_mouse_down = true;
     break;

    case "mouseup":
     events.has_mouse_up  = true;
     break;

    case "mousemove":
     events.has_mouse_move = true;
     break;

    case "mouseout":
     events.has_mouse_out = true;
     break;

    case "mouseover":
     events.has_mouse_over = true;
     break;

    default:
     break;

    } // endswitch
   }
  } // end loop
 }

 return events;

};

/** ================================================================
*
* toString
*
* @desc  Create a text String that represents the DOMElement object
*
* @return String
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.toString = function() {
 return "DOM Element " + this.document_order;
};

/** ================================================================
*
* addChild
*
* @desc  Adds a child DOMElement or DOMText object to the children
*     array to mimic the DOM node tree structure
*
* @param child Object The DOMElement or DOMText object to be add
*            that is a child of the current DOMElement
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addChild = function ( child ) {

 if (child) {
  this.children.push( child );
 }

};

/** ================================================================
*
* addToCharacterCount
*
* @desc  Adds to the curren character count of the text content of the
*     contained in the DOMelement and its immediate children
*
* @param length Number  Number to add to the character count
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addToCharacterCount = function ( length ) {

 this.character_count += length;

};

/** ================================================================
*
* addComputedStyle
*
* @desc  Adds computed style information to the DOMElement object and
*     calculate the color contrast ratio
*
* @param parent_element  Object The parent DOMElement object, used
*                 for information about inherited style
*                 information
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addComputedStyle = function (parent_element) {
 this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
 this.computed_style.calculateColorContrastRatio();
};

/** ================================================================
*
* calculateXPath
*
* @desc Calculate the XPath string that uniquely identifies the
*    DOM node referenced by this DOMElement's node property and
*    set its xpath property to this calculated value.
*
* @param parent_element  Object The parent DOMElement object, used
*                 for information for xpath calculation
*
* @return nothing : Sets the DOMElement's xpath property.
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.calculateXPath = function (parent_element) {

 function attributePredicate(attrName, attrValue) {
  return "[@" + attrName + "='" + attrValue + "']";
 }

 this.xpath = "";

 // If a root node ignore calculation
 if (!this.tag_name) {
  return;
 }

 // now build up the XPath using parent, tag_name, id, role and class values
 if (parent_element && parent_element.xpath) {
  this.xpath = parent_element.xpath + "/" + this.tag_name;
 }
 else {
  this.xpath = "/" + this.tag_name;
 }

 if (this.id) {
  this.xpath += attributePredicate("id", this.id);
 }

 if (this.role) {
  this.xpath += attributePredicate("role", this.role);
 }
 else {
  if (this.class_name) {
   this.xpath += attributePredicate("class", this.class_name);
  }
 }

};

/** ================================================================
*
* getText
*
* @desc Returns text content of a DOMElement, including the ALT text of images
*    through recursion through the DOMText and DOMElement descendents of
*    the DOMElement
*
* @return String
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.getText = function () {

 // Create return object
 var strings = [];

 function getTextNodeContent(dom_element, strings) {
  var i;
  var children_len;

  if (dom_element.type == NODE_TYPE.TEXT) {
   strings.push( dom_element.text );
  }
  else {
   // if an element for through all the children elements looking for text
   if (dom_element.type == NODE_TYPE.ELEMENT) {

    if (dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     // check to see if IMG or AREA element and use ALT content if defined
     if (((dom_element.tag_name == 'img') ||
        (dom_element.tag_name == 'area')) &&
        dom_element.alt &&
        dom_element.alt.length) {
       strings.push( dom_element.alt );
     } else {

      children_len = dom_element.children.length;
      for (i=0; i < children_len; i++ ) {
       getTextNodeContent( dom_element.children[i], strings);
      }
     }
    }
   }
  }
 } // end function

 getTextNodeContent(this, strings);
 return strings.join("");

};

/**
 * Copyright 2011 OpenAjax Alliance
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

// DOM Node Type Constants 

var NODE_TYPE = {};

NODE_TYPE.ELEMENT  = 1;
NODE_TYPE.ATTRIBUTE = 2;
NODE_TYPE.TEXT   = 3;
NODE_TYPE.COMMENT  = 8;
NODE_TYPE.DOCUMENT = 9;

/* ---------------------------------------------------------------- */
/*                            DOMCache                              */
/* ---------------------------------------------------------------- */

/**
 * OpenAjax.a11y.cache.DOMCache
 *
 * @desc Constructor of a DOMCache Object
 *    Initializes an empty DOM cache and specialized caches
 *
 * @return DOMCache Object
 */

OpenAjax.a11y.cache.DOMCache = function (url, title, document, language, log) {


 this.url = url;
 this.base_url = this.url;

 var pos = this.base_url.lastIndexOf('/');
 if (pos >= 0) {
  this.base_url = this.base_url.substring(0,(pos+1));
 }
 else {
  this.base_url = this.base_url + "/";
 }

 this.title = title;
 this.document = document;
 this.language = language;
 this.log = log;

 OpenAjax.a11y.console("\n  TITLE: " + this.title);
 OpenAjax.a11y.console("   URL: " + this.url);
 OpenAjax.a11y.console("BASE URL: " + this.base_url);
 OpenAjax.a11y.console("LANGUAGE: " + this.language + "\n\n");
};

/**
 *
 * initCache
 *
 * @desc Initialize specialized caches
 *    The specialized caches will be updated all at once or or when
 *    needed by a rule depending on how an evaluation is requested
 *
 * @return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.initCache = function () {

 this.element_with_id_cache = new OpenAjax.a11y.cache.DOMElementCache();
 this.element_cache         = new OpenAjax.a11y.cache.DOMElementCache();

 this.abbreviations_cache      = new OpenAjax.a11y.cache.AbbreviationsCache(this);
 this.color_contrast_cache     = new OpenAjax.a11y.cache.ColorContrastCache(this);
 this.controls_cache           = new OpenAjax.a11y.cache.ControlsCache(this);
 this.headings_landmarks_cache = new OpenAjax.a11y.cache.HeadingsLandmarksCache(this);
 this.images_cache             = new OpenAjax.a11y.cache.ImagesCache(this);
 this.languages_cache          = new OpenAjax.a11y.cache.LanguagesCache(this);
 this.links_cache              = new OpenAjax.a11y.cache.LinksCache(this);
 this.lists_cache              = new OpenAjax.a11y.cache.ListsCache(this);
 this.media_cache              = new OpenAjax.a11y.cache.MediaCache(this);
 this.tables_cache             = new OpenAjax.a11y.cache.TablesCache(this);

};

/**
 * isUpToDate
 *
 * @desc Checks to see if the specified cache is up to date
 *
 * @param cache_name String Cache to update
 *
 * @return Object with two properties:
 *     o.up_to_date Boolean true if cache is up to date, otherwise false
 *     o.exists   Boolean true if cache exists, otherwise false
 */

OpenAjax.a11y.cache.DOMCache.prototype.isUpToDate = function (cache_name) {

 if (this[cache_name])
  return { up_to_date: this[cache_name].up_to_date, exists : true };
 else
  return { up_to_date: false, exists : false };

};

/**
 * updateCache
 *
 * @desc Updates the specified cache
 *
 * @param cache_name String name of the cache to update
 *
 * @return Boolean true if cache is updated, false if cache does not exist
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateCache = function (cache_name) {

 if (this[cache_name]) {
  if (!this[cache_name].up_to_date) {
   this[cache_name].updateCache();
  }
  return true;
 }

 return false;

};

/**
 * traverseDOMElementsForAllCaches
 *
 * @desc Updates all the specialized caches at one time, in general this
 *    is faster than updating the caches individually based on the
 *    needs of rules, but may create caches that will not be used if
 *    some rules are disabled
 *
 * @param dom_element     Object Current DOMElement object being processed
 * @param landmark_info    Object
 * @param table_info      Object
 * @param control_info     Object
 * @param language_element   Object Current LanguageElement object that contains the DOMElement
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.traverseDOMElementsForAllCaches = function (dom_element,
                                          landmark_info,
                                          table_info,
                                          control_info,
                                          list_info) {

 if (!dom_element) return;
 // if an element for through all the children elements looking for text

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.color_contrast_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);
  this.media_cache.updateCacheItems(dom_element);

  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
  var li = this.lists_cache.update(dom_element, list_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);

  var children_length = dom_element.children.length;
  for (var i = 0; i<children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.children[i], hi, ti, ci, li);
  } // end loop
 }
};


/**
 *
 * updateAllCaches
 *
 * @desc Updates all the defined specialized caches
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateAllCaches = function () {
 var i;
 var children = this.element_cache.children;
 var children_len = children.length;

 var hi = new OpenAjax.a11y.cache.LandmarkInfo(null);
 var ti = new OpenAjax.a11y.cache.TableInfo(null);
 var ci = new OpenAjax.a11y.cache.ControlInfo(null);
 var li = new OpenAjax.a11y.cache.ListInfo(null);

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating all caches");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForAllCaches(children[i], hi, ti, ci, li);
 }

 this.controls_cache.calculateControlLabels();

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed updating all caches");

};

/**
 *
 * updateDOMElementCache
 *
 * @desc Updates a DOMElement caches that are used by specialized caches
 *
 * @return DOMCache Object
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElementCache = function () {

 var de;

 this.initCache();
 
 // add title information to DOMElement Cache
 
 this.addTitleDOMElement();

 // if the page contains a body element start there, since there are fewer elements to traverse
 if (this.document && this.document.body) {
  // OpenAjax.a11y.console("Creating DOM elements from body element");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements");
  this.updateDOMElements(this.document.body, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.console("Creating DOM elements with frames");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements using frames");
  this.updateDOMElements(this.document, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }

 // Identify elements with duplicate ID values
 this.element_with_id_cache.checkForUniqueIDs();

 return this;

};

/**
 * addTitleDOMElement
 *
 * @desc Adds a DOMElement to represent a TITLE
 *
 * @return 
 */

OpenAjax.a11y.cache.DOMCache.prototype.addTitleDOMElement = function () {

  var n;
  var node;
  var de;
  var titles = this.document.getElementsByTagName('title');

  if (titles && titles.length && titles[0]) {
  
    node = titles[0];

    de = new OpenAjax.a11y.cache.DOMElement(node, null);
    
    de.hasTitle = true;

    de.addComputedStyle(null);
    de.calculateXPath(null);
  
    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);
 
    // get any text nodes associated with the title element
    for (n = node.firstChild; n !== null; n = n.nextSibling) {
      this.updateDOMElements( n, de);
    } // end loop
    
  }
  else {
  
    node = this.document.createElement('title');
    
    de = new OpenAjax.a11y.cache.DOMElement(node, null);
    
    de.hasTitle = false;

    de.addComputedStyle(null);
    de.xpath = "";
  
    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);

  }

};

/**
 * updateDOMElements
 *
 * @desc Traverse document DOM and create a tree of DOMElement objects.
 *    The DOMElement objects will be used to generate more specific
 *    lists of elements without need to touch the document DOM.
 *    Additional information is collected on tables to be used in
 *    creating the table cache
 *
 * @param node        Object  node is the current node object tbing analyzed
 * @param parent_dom_element Object  DOMElement object that is the parent of the current node
 *
 * return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElements = function (node, parent_dom_element) {

  var n;
  var de;

  switch (node.nodeType ) {

  case NODE_TYPE.DOCUMENT:
    // OpenAjax.a11y.console("Document node type");
    break;

  case NODE_TYPE.ELEMENT:
    // OpenAjax.a11y.console(node.tagName);

    var dom_element = new OpenAjax.a11y.cache.DOMElement(node, parent_dom_element);

    dom_element.addComputedStyle(parent_dom_element);
    dom_element.calculateXPath(parent_dom_element);
    this.element_cache.addDOMElement(dom_element);

    if (parent_dom_element) {
      parent_dom_element.addChild(dom_element);
    }
    else {
      this.element_cache.addChild(dom_element);
    }

    if (dom_element.id.length) {
      // use append so that document_order of the dom_element does not get updated
      
      de = this.element_with_id_cache.getDOMElementById(dom_element.id);
      
      if (de) {
        dom_element.id_unique = false;
        de.id_unique = false;
      }
      else {
        dom_element.id_unique = true;      
      }
      
      this.element_with_id_cache.dom_elements.push(dom_element);
            
    }

    switch (dom_element.tag_name) {

    case 'frame':
    case 'iframe':
      // OpenAjax.a11y.console("frame: " + node.src);

      var frame_doc = node.contentDocument;

      if (frame_doc && frame_doc.firstChild) {
        for (n = frame_doc.firstChild; n !== null; n = n.nextSibling) {
          this.updateDOMElements( n, dom_element);
        } // end loop
      }
      break;

    default:
      break;

    } // end switch

    for (n = node.firstChild; n !== null; n = n.nextSibling ) {
      this.updateDOMElements(n, dom_element);
    } // end loop
    break;

  case NODE_TYPE.TEXT:
    // OpenAjax.a11y.console("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);
   parent_dom_element.addChild(dom_text);
   break;

  default:
    break;
  } // end switch

  return;

};

/**
 * getNameFromARIALabel
 *
 * @desc
 *
 * @param control_element   Object
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameFromARIALabel = function (element) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var label = "";
  var label_source = SOURCE.NONE;
  var de = element.dom_element;

  if (de.aria_labelledby) {
    label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else {
    if (de.aria_label) {
      label = de.aria_label;
      label_source = SOURCE.ARIA_LABEL;
    }
    else {
      if (de.title) {
        label = de.title;
        label_source = SOURCE.TITLE_ATTRIBUTE;
      }
    }
 }

 element.label = label;
 element.label_source = label_source;
 element.label_for_comparison = label.toLowerCase().trim();

};

/**
 * sortArrayOfObjects
 *
 * @desc Sort an array of objects by one of its properties and marks any properties that are duplicates
 *
 * @param objects   Array    array of objects to sort
 * @param property  String   text string of property to sort
 * @param ascending Boolean  whether to sort ascending or descending
 *
 * @return array of sorted objects
 */

OpenAjax.a11y.cache.DOMCache.prototype.sortArrayOfObjects = function(objects, property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;
  var return_objects = [];

  if( !objects && objects.length && !objects[0][property] ) {
    return return_objects;
  } // endif

  var objects_len = objects.length;
 
  for (i=0; i<objects_len; i++) return_objects[i] = objects[i];

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < objects_len; i++ ) {
        if (return_objects[i-1][property] > return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        } 
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }          
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < objects_len; i++) {
        if (return_objects[i-1][property] < return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        } 
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }          
        }
      } // end loop
    } while (swapped);
  } 

  return return_objects;

};

/**
 * Copyright 2011 OpenAjax Alliance
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
/*            OpenAjax Heading and Landmark Cache                   */ 
/* ---------------------------------------------------------------- */

/**
 * LandmarkInfo
 *
 * @desc LandmarkInfo is the constructor for information related to landmarks
 *       in building the headings/landmark cache
 *
 * @constructs
 *
 * @return  LandmarkInfo object 
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
    this.main_element  = landmark_info.main_element;
  }
  else {
    this.landmark_element = null;
    this.main_element  = null;
  }
 
};

/**
 * LandmarkCache
 *
 * @desc Constructor for LandmarkCache object which contains a list of 
 *    LandmarkElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  LandmarkCache object 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
 
  this.landmark_elements = [];
  this.heading_elements = [];
  // List of elements with role=main or h1 elements
  this.main_elements = [];
 
  this.child_elements   = [];
  this.child_main_elements = [];
 
  this.headings_sort_property  = 'document_order';
  this.landmarks_sort_property = 'document_order';
 
  this.up_to_date    = false;
 
  this.child_length   = 0;
  this.child_main_length = 0;
 
  this.heading_length  = 0;
  this.landmark_length  = 0;
  this.main_length    = 0;

  this.has_title = false;
 
  return this;

};

/**
 * addChildElement
 *
 * @desc Adds a Landmark or Header Element object to the child_element array
 *
 * @param child_element     Object  landmark_element or heading_element object to add to the landmark cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_length = this.child_length + 1;
    this.child_elements.push(child_element);
  } 

  return this.length;

};

/**
 * addChildMainElement
 *
 * @desc Adds a Main Element object to the child_main_elements array
 *
 * @param main_element Object  main landmark or heading level 1 object to add to the landmark cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_main_length = this.child_main_length + 1;
    this.child_main_elements.push(main_element);
  } 
};

/**
 * addMainElement
 *
 * @desc Adds a Landmark or Header Element object to the main_elements array
 *
 * @param child_element Object  main landmark or heading level 1 object to add to the landmark cache
 *
 * @return length Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addMainElement = function (main_element) {

  if (main_element) {
    this.main_length = this.main_length + 1;
    main_element.document_order = this.main_length;
    main_element.cache_id = "main_" + this.main_length;
    this.main_elements.push(main_element);
  } 

  return this.length;

};

/**
 *
 * addLandmarkElement
 *
 * @desc Adds a LandmarkElement object to a heading_elements array
 *
 * @param landmark_element Object  landmark_element object to a landmark_elements array
 *
 * @return Number  length is the number of elements in the landmark_elements array
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addLandmarkElement = function (landmark_element) {

  if (landmark_element) {
    this.landmark_length = this.landmark_length + 1;
    landmark_element.document_order = this.landmark_length;
    landmark_element.cache_id = "landmark_" + this.landmark_length;
    this.landmark_elements.push(landmark_element);
  } 
  
  return this.landmark_length;
};

/**
 * addHeadingElement
 *
 * @desc Adds a HeadingElement object to a heading_elements array
 *
 * @param heading_element Object  heading_element object to a heading_elements array
 *
 * @return Number  length is the number of elements in the heading_elements array
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addHeadingElement = function (heading_element) {

  if (heading_element) {
    this.heading_length = this.heading_length + 1;
    heading_element.document_order = this.heading_length;
    heading_element.cache_id = "heading_" + this.heading_length;
    this.heading_elements.push(heading_element);
  } 
  return this.heading_length;
};


/**
 * getLandmarkElementByCacheId
 *
 * @desc Returns the LandmarkElement object with the id
 *
 * @param cache_id String  id of the LandmarkElement object
 *
 * @return LandmarkElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getLandmarkElementByCacheId = function (cache_id) {
 
  var i; 
  var landmark_elements_len = this.landmark_elements.length;

  if (cache_id) {
    for (i=0; i<landmark_elements_len; i++) {
      if (this.landmark_elements[i].cache_id == cache_id) {
        return this.landmark_elements[i];
      } 
    } // end loop
  }
 return null;
};

/**
 * getHeadingElementById
 *
 * @desc Returns the HeadingElement object with the id
 *
 * @param cache_id String  id of the HeadingElement object
 *
 * @return HeadingElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getHeadingElementByCacheId = function (cache_id) {
 
  var i;
  var heading_elements_len = this.heading_elements.length;

  if (cache_id) {
    for (i=0; i<heading_elements_len; i++) {
      if (this.heading_elements[i].cache_id == cache_id) {
        return this.heading_elements[i];
      } 
    } // end loop
  }
 
  return null;
};

/**
 * getMainElementByCacheId
 *
 * @desc Returns the MainElement object with the id
 *
 * @param cache_id String  id of the MainElement object
 *
 * @return HeadingElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getMainElementByCacheId = function (cache_id) {
 
  var i;
  var main_elements_len = this.main_elements.length;

  if (cache_id) {
    for (i=0; i<main_elements_len; i++) {
      if (this.main_elements[i].cache_id == cache_id) {
        return this.main_elements[i];
      } 
    } // end loop
  }
 
  return null;
};

/**
 * initCache
 *
 * @desc Empties the LandmarkCache of LandmarkElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.initCache = function () {

  this.landmark_elements = [];
  this.headings_elements = [];
  this.child_elements  = [];
  this.main_elements = [];
 
  this.landmark_sort_property = 'document_order';
  this.headings_sort_property = 'document_order';
 
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the LandmarkCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return LandmarkElement 
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCacheItems = function (dom_element, landmark_info) {

  var me;
  var le;
  var he;
  var li = new OpenAjax.a11y.cache.LandmarkInfo(landmark_info);

  if ((dom_element.role == 'region')    ||
      (dom_element.role == 'main')     || 
      (dom_element.role == 'navigation')  ||
      (dom_element.role == 'search')    ||
      (dom_element.role == 'applicaton')  ||
      (dom_element.role == 'banner')    ||
      (dom_element.role == 'complementary') ||
      (dom_element.role == 'contentinfo')  ||
      (dom_element.role == 'form')) {
   
    le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, landmark_info.landmark_element);    

    this.dom_cache.getNameFromARIALabel(le);

    this.addLandmarkElement(le);

    if (landmark_info.landmark_element) {
      landmark_info.landmark_element.addChildElement(le);
    } 
    else {
      this.addChildElement(le);  
    }
  
    li.landmark_element = le;

    if (dom_element.role == 'main') {
      me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

      this.dom_cache.getNameFromARIALabel(me);

      this.addMainElement(me);  

      if (landmark_info.main_element) {
        landmark_info.main_element.addMainElement(me);
      } 
      else {
        this.addChildMainElement(me);  
      }
  
      li.main_element = me;
    }
    return li;
  }
 
  if ((dom_element.tag_name == 'h1') ||
      (dom_element.tag_name == 'h2') || 
      (dom_element.tag_name == 'h3') || 
      (dom_element.tag_name == 'h4') || 
      (dom_element.tag_name == 'h5') || 
      (dom_element.tag_name == 'h6')) {
   
    he = new OpenAjax.a11y.cache.HeadingElement(dom_element);    
  
    this.addHeadingElement(he);

    if (landmark_info.landmark_element) {
      landmark_info.landmark_element.addChildElement(he);  
    } 
    else {
      this.addChildElement(he);  
    }

    if (dom_element.tag_name == 'h1') {
      me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

      this.addMainElement(me);  

      if (landmark_info.main_element) {
        landmark_info.main_element.addChildMainElement(me);
      } 
      else {
        this.addChildMainElement(me);  
      }  
    }
    return li;
  }

  if (dom_element.tag_name == 'title' && !this.has_title) {
    me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

    this.addMainElement(me);
   
    if (me.role === 'main') this.dom_cache.getNameFromARIALabel(me);

    if (landmark_info.main_element) {
      landmark_info.main_element.addChildMainElement(me);
    }
    else {
      this.addChildMainElement(me);  
    }
   
    // There is only one title for a document, even when there are frames and iframes
    this.has_title = true;
   
    return li;
  }
  return li;
};

/**
 * transverseDOMElementsForLandmarkElements
 *
 * @desc Traverses the DOMElements to update landmarkelements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.transverseDOMElementsForLandmarkElements = function (dom_element, landmark_info) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    var li = this.updateCacheItems(dom_element, landmark_info);
    
    for (var i = 0; i < dom_element.children.length; i++ ) {
      this.transverseDOMElementsForLandmarkElements(dom_element.children[i], li);
    } 
  }
};


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the landmark cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCache = function () {
  var i;
  var li;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.initCache();
 
  li = new OpenAjax.a11y.cache.LandmarkInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating landmark elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForLandmarkElements(children[i], li);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed landmark elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};


/**
 * sortLandmarkElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortLandmarkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.landmark_elements && this.landmark_elements.length && !this.landmark_elements[0][property] ) {
    return false;
  } // endif

  var landmark_elements_len = this.landmark_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++ ) {
        if (this.landmark_elements[i-1][property] > this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++) {
        if (this.landmark_elements[i-1][property] < this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.landmark_sort_property = property;

  return true;

};

/**
 * sortHeadingElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortHeadingElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.heading_elements && this.heading_elements.length && !this.heading_elements[0][property] ) {
    return false;
  } // endif

  var heading_elements_len = this.heading_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < heading_elements_len; i++ ) {
        if (this.heading_elements[i-1][property] > this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        } 
      } // end loop

    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < heading_elements_len; i++) {
   
        if (this.heading_elements[i-1][property] < this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.heading_sort_property = property;

  return true;

};

/**
 * LandmarkElement
 * 
 * @desc LandmarkElement is the object contains information about landmarks
 *
 * @constructs
 *
 * @param  dom_element     Object dom_element object provides information about current dom node 
 * @param  parent_element    Object landmark element object provides information about a parent landmark element 
 *
 * @return  LandmarkElement | null
 */

OpenAjax.a11y.cache.LandmarkElement = function (dom_element, parent_landmark) {

  this.document_order    = 0;
  this.dom_element      = dom_element;
  this.child_elements    = [];

  this.parent_landmark    = parent_landmark;
 
  this.label         = "";
  this.label_for_comparison  = "";
 
};


/**
 * addChildElement
 * 
 * @desc add a child element reference to child_elements array 
 *
 * @constructs
 *
 * @param  child_element    Object landmark or header element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_elements.push(child_element); 
  }  

}; 


/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
 
OpenAjax.a11y.cache.LandmarkElement.prototype.toString = function () {
 return "Landmark " + this.document_order;  
}; 


/**
 * HeadingElement
 *
 * @desc HeadingElement is the object used to hold data about a heading and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 *
 * @return  HeadingElement | null
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element) {
 
  this.dom_element = dom_element;
   
  switch( dom_element.tag_name ) {
  case 'h1':
    this.level = 1;
    break;
    
  case 'h2':
    this.level = 2;
    break;
    
  case 'h3':
    this.level = 3;
    break;
    
  case 'h4':
    this.level = 4;
    break;
    
  case 'h5':
    this.level = 5;
    break;
    
  case 'h6':
    this.level = 6;
    break;
    
  default:
    this.level = 0;   
    break;
  } // end switch

  var ano = OpenAjax.a11y.cache.util.getNameFromChildrenObject(dom_element);
  
  this.name          = ano.name;
  this.name_for_comparison  = ano.name.toLowerCase().trim();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt  = ano.name_from_image_alt;
  this.image_count      = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  return this;
    
};

/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
  
OpenAjax.a11y.cache.HeadingElement.prototype.toString = function() {
  return "Heading " + this.document_order;
};

/**
 * MainElement
 * 
 * @desc MainElement is the object contains information about h1 and main landmarks
 *
 * @constructs
 *
 * @param  dom_element     Object dom_element object provides information about current dom node 
 * @param  parent_element    Object landmark element object provides information about a parent landmark element 
 *
 * @return  MainElement | null
 */

OpenAjax.a11y.cache.MainElement = function (dom_element, parent_landmark) {

  this.document_order    = 0;
  this.dom_element       = dom_element;
  this.main_elements     = [];
  this.is_title           = false; 

  this.parent_landmark    = parent_landmark; // restricted to main landmarks

  switch (dom_element.tag_name) {
 
  case 'h1':
    this.name  = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
    this.name_for_comparison  = this.name.toLowerCase().trim();
    this.level = 1;
    break;
 
  case 'title':
    this.name    = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
    this.name_for_comparison  = this.name.toLowerCase().trim();
    this.is_title = true;
    this.role    = 'title';
    break;
 
  default: 
    this.name                 = "";
    this.name_for_comparison  = ""; 
    break;  
  } 

}; 


/**
 * addMainElement
 * 
 * @desc add a child element reference to child_elements array 
 *
 * @constructs
 *
 * @param  child_element    Object landmark or header element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.main_elements.push(main_element); 
  }  

}; 

/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
  
OpenAjax.a11y.cache.MainElement.prototype.toString = function () {
 if (this.dom_element.tag_name == "h1" ) {
  return "h1: " + this.name; 
 }
 else { 
  return this.dom_element.tag_name + "[@role=main]: " + this.label;  
 } 

};

/**
 * getH1InformationForMainRole
 * 
 * @desc get information about H1 elements that are children of a MAIN landmark
 *
 * @return  object
 */

OpenAjax.a11y.cache.MainElement.prototype.getH1InformationForMainRole = function () {


  var i;
  var me;
  
  var h1_info = {};
  h1_info.has_h1 = false;
  h1_info.has_label = false;

  if (this.dom_element.role !== 'main') return h1_info;
  
  var ids = this.dom_element.aria_labelledby;

  var main_elements     = this.main_elements;
  var main_elements_len = main_elements.length; 
  
  for (i=0; i<main_elements_len; i++) {
  
    me = main_elements[i];
    
    if (me.level==1) {
      h1_info.has_h1 = true;
    
      if ((me.dom_element.id.length) &&
          (ids.indexOf(me.dom_element.id)>=0)) {
        h1_info.has_label = true;          
      }
    } 
  } // end loop
  
  return h1_info;
  
};

/**
 * isH1UsedAsLabelForMainRole
 * 
 * @desc Determine if an H1 element is being used as a label for a main Role
 *
 * @return  Boolean
 */

OpenAjax.a11y.cache.MainElement.prototype.isH1UsedAsLabelForMainRole = function () {

  if (!this.level ||
      this.level !== 1 ||
      this.dom_element.id.length === 0 ||
      this.parent_landmark === null) {
    return false;
  }  

  var me = this.parent_landmark;
  
  while (me.dom_element.role !== 'main' && me.parent_landmark) {
    me = me.parent_landmark;
  }
  
  if ( me && 
       me.dom_element.role === 'main' && 
       me.dom_element.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    return true;   
  }
  
  return false;
  
};


/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            ImageCache                            */
/* ---------------------------------------------------------------- */

/**
 * ImageCache
 *
 * @desc Constructor for ImageCache object which contains a list of 
 *    ImageElements representing the accessibility information of
 *    images in a document
 *
 * @constructs
 *
 * @return  ImageCache object 
 */
  
OpenAjax.a11y.cache.ImagesCache = function (dom_cache) {

 this.dom_cache = dom_cache;
 this.image_elements = [];
 this.sort_property = 'document_order';
 this.up_to_date = false;
 this.length = 0;

 return this;

}; 

/**
 * addImageElement
 *
 * @desc Adds a ImageElement object to a ImageCache object
 *
 * @param image_element Object  image_element object to add to the image cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.ImagesCache.prototype.addImageElement = function (image_element) {

 // item must exist and have the position property
 if (image_element) {
  this.length = this.length + 1;
  image_element.cache_id = "image_" + this.length; 
  image_element.document_order = this.length;
  this.image_elements.push(image_element);
 } 

 return this.length;

};


/**
 * getImageElementByCacheId
 *
 * @desc Returns the ImageElement object with the cache id
 *
 * @param cache_id String  cache id of the ImageElement object
 *
 * @return ImageElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getImageElementByCacheId = function (cache_id) {

 var i;
 var image_elements_len = this.image_elements.length;

 if (cache_id && cache_id.length) {  
  for (i=0; i < image_elements_len; i++) {
   if (this.image_elements[i].cache_id == cache_id) {
    return this.image_elements[i];
   }
  } // end loop
 } 

 return null;
};


/**
 * emptyCache
 *
 * @desc Empties the ImageCache of ImageElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.ImagesCache.prototype.emptyCache = function () {

 this.image_elements.length = 0;
 this.sort_property = 'document_order';
 this.up_to_date = false;

};

/**
 * updateCacheItem
 *
 * @desc Updates the ImagesCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in images cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'img') ||
   (dom_element.tag_name == 'area')) {

  var image_element = new OpenAjax.a11y.cache.ImageElement(dom_element, this.dom_cache.base_url);    
  this.dom_cache.images_cache.addImageElement(image_element);
  
 }
  
};

/**
 * transverseDOMElementsForImageElements
 *
 * @desc Traverses the DOMElements to update image elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.transverseDOMElementsForImageElements = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.updateCacheItems(dom_element);
  
  for (var i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForImageElements(dom_element.children[i]);
  } // end loop
  
 }  
  
}; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the image cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating image elements cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForImageElements(children[i]);
 }  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed image elements cache update, number of cache items is " + this.length);

 this.up_to_date = true;
};

/**
 * sortImageElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.ImagesCache.prototype.sortImageElements = function(property, ascending ) {

 var swapped = false;
 var temp = null;
 var i;

 if( this.image_elements && this.image_elements.length && !this.image_elements[0][property] ) {
  return false;
 } // endif

 var image_elements_len = this.image_elements.length;

 if( ascending ) {
  do{
    swapped = false;
    for (i = 1; i < image_elements_len; i++ ) {
     if (this.image_elements[i-1][property] > this.image_elements[i][property]) {
      // swap the values
      temp = this.image_elements[i-1];
      this.image_elements[i-1] = this.image_elements[i];
      this.image_elements[i] = temp;
      swapped = true;
     } 
    } // end loop

  } while (swapped);
 }
 else {
  do {
   swapped = false;
   for (i = 1; i < image_elements_len; i++) {
    if (this.image_elements[i-1][property] < this.image_elements[i][property]) {
     // swap the values
     temp = this.image_elements[i-1];
     this.image_elements[i-1] = this.image_elements[i];
     this.image_elements[i] = temp;
     swapped = true;
    } 
   } // end loop
  } while (swapped);
 } 

 this.sort_property = property;

 return true;

}; 

/**
 * ImageElement
 *
 * @desc ImageElement is the object used to hold information about an image and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 *
 * @return  ImageElement | null
 */ 

OpenAjax.a11y.cache.ImageElement = function (dom_element, base_url) {

 if (!dom_element) return null;  

 var node = dom_element.node;
 
 this.dom_element = dom_element;

 this.source     = node.src;
 
 if (node.tag_name == 'area') {
  this.source     = node.href;
 }
 
 if (this.dom_element.has_alt_attribute || this.dom_element.node.alt.length) {
  this.has_alt  = true;
  this.alt    = node.alt;
  this.alt_length = this.alt.length;
  this.alt_for_comparison = this.alt.trim().normalizeSpace().toLowerCase();
 }
 else {
  this.has_alt = false;
  this.alt  = null;
  this.alt_length = null;
  this.alt_for_comparison = null;
 }

 this.longdesc = node.getAttribute('longdesc');

 if (this.longdesc) {
  if (this.longdesc.indexOf('http:') == -1 ) {
   this.longdesc = base_url + this.longdesc;
  }
  this.has_longdesc = true;
 }
 else {
  this.has_longdesc = false;
  this.longdesc  = null;
 }

 this.height   = node.offsetHeight;
 this.width    = node.offsetWidth;

 return this;
};


/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            LanguagesCache                        */
/* ---------------------------------------------------------------- */


/**
*
* LanguagesCache
*
* @desc 
*
* @constructs
*
* @return   LanguagesCache object
*/

OpenAjax.a11y.cache.LanguagesCache = function (dom_cache) {
    
    this.dom_cache = dom_cache;
    this.language_items =[];
    
    this.sort_property = 'lang';
    this.sort_ascending = false;
    
    this.up_to_date = false;
    this.length = 0;
    
    return this;
};

/**
 * addLanguageItem
 *
 * @desc Adds a DOM Element object information to a color contrast item in the color contrast
 *       cache, if it does not match any of the current color contrast items it will create a
 *       new color contrast item.
 *
 * @param dom_element Object   DOM Element object to add to a color contrast item in the cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.addLanguageItem = function (dom_element) {
    
    var i;
    var li; //language item
    var found = false;
    var language_items = this.language_items;
    var language_items_len = language_items.length; 
    
    for (i=0; i<language_items_len; i++) {
      if (dom_element.lang == language_items[i].language) {
        found = true;
        language_items[i].addDOMElement(dom_element);
        break;
      }
    }     
    if (!found) {
        li = new OpenAjax.a11y.cache.LanguageItem(dom_element);
        
        li.addDOMElement(dom_element);
        this.length += 1;
        this.cache_id = "lang_" + this.length;
        this.language_items.push(li);
    }
};

/**
 * getLanguageItemByCacheId
 *
 * @desc Returns the ColorContrastItem object with the id
 *
 * @param id String   id of the ColorContrastItem object
 *
 * @return LanguageItem object if found, or null if not found
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getLanguageItemByCacheId = function (cache_id) {
    
    var i;
    var language_items_len = this.language_items.length;
    
    if (cache_id && cache_id.length) {
        for (i = 0; i < language_items_len; i++) {
            if (this.language_items[i].cache_id == cache_id) {
                return this.language_items[i];
            }
        }
    }
    
    return null;
};

/**
 * emptyList
 *
 * @desc Empties all the ColorContrastItem Objects items from the color
 *       contrast cache
 *
 * @return none
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.emptyList = function () {
    
    this.language_items.length = 0;
    this.up_to_date = false;
};

/**
 * updateCacheItems
 *
 * @desc Updates the LanguagesCache object with information from a DOMElement object
 *       This is used during the creation of the cache and is used by the functions for
 *       either creating the cache all at one time or selectively
 *
 * @param dom_element Object DOM Element object to add to the color contrast cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCacheItems = function (dom_element) {
    
    if (dom_element.lang && dom_element.lang.length) {
      this.addLanguageItem(dom_element);
    }  
};

/**
 * transverseDOMElementsForLanguages
 *
 * @desc Traverses the DOMElements to update the languages cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.transverseDOMElementsForLanguages = function (dom_element) {
    
    var i;
    if (! dom_element) return;
    
    if (dom_element.type == NODE_TYPE.ELEMENT) {
        
        this.updateCacheItems(dom_element);
        
        for (i = 0; i < dom_element.children.length; i++) {
            this.transverseDOMElementsForColorContrast(dom_element.children[i]);
        }
        // end loop
    }
};

/**
 * updateCache
 *
 * @desc 
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCache = function () {
    var i;
    var children = this.dom_cache.element_cache.children;
    var children_len = children.length;
    
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating language cache.");
    for (i = 0; i < children_len; i++) {
        this.transverseDOMElementsForLanguages(children[i]);
    }
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed language cache update, number of cache items is " + this.length);
    
    this.up_to_date = true;
};

/**
 * sortCCRItems
 *
 * @desc
 *
 * @param ascending   Boolean  true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.sortCCRItems = function (ascending) {
    
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
 * toString
 *
 * @desc Return a string representation of the color contrast cache
 *
 * @return   String
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.toString = function () {
    
    var i;
    
    var str = "\n\n Language Information\n";
    
    var list_length = this.language_items.length;
    
    for (i = 0; i < list_length; i++) {
        str += this.language_items[i].toString();
    }
    // end loop
    
    return str;
};

/**
 * LanguageItem
 *
 * @desc Constructor for ColorContrastItem object which contains information
 *       about a unique set of color contrast features of the web page
 *
 * @constructs
 *
 * @return   LanguageItem object
 */
 
OpenAjax.a11y.cache.LanguageItem = function (language) {
    
    this.language = language;
    this.dom_elements = [];
    
};

/**
 * addDOMElement
 *
 * @desc 
 *
 * @return   nothing
 */

OpenAjax.a11y.cache.LanguageItem.prototype.addDOMElement = function (dom_element) {
    
    if (dom_element) {
      this.dom_elements.push(dom_element);
    }
};

/**
 * toString
 *
 * @desc Provide information about the language item as a text
 *       string.
 *
 * @return   String
 */

OpenAjax.a11y.cache.LanguageItem.prototype.toString = function () {
    
    return "  Language: " + this.language + " (" + this.dom_elements.length + " elements)\n";
    
};
/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            LinkCache                            */
/* ---------------------------------------------------------------- */


/**
 * LinkCache
 *
 * @desc Constructor for LinkCache object which contains a list of 
 *    LinkElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  LinkCache object 
 */

OpenAjax.a11y.cache.LinksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.area_elements = [];
  this.link_elements = [];
  this.links_sorted_by_href = [];
  this.links_sorted_by_name = [];
  this.duplicate_names = [];
  this.duplicate_hrefs = [];
  this.sort_property = 'document_order';
  this.sort_ascending = true;
  this.up_to_date = false;
  this.length = 0;

  return this;

}; 

/**
 * checkForDuplicateNAME
 *
 * @desc Checks for duplicatelink name
 *
 * @param link_element Object  link_element object to check 
 *
 * @return none
 */

OpenAjax.a11y.cache.LinksCache.prototype.checkForDuplicateName = function (link_element) {

  if (!link_element.name_for_comparison || link_element.name_for_comparison.length === 0) return;

  var i;
  var j;
  var count;
  var index_bottom;
  var index_top;

  var le;
  var dn;

  var links_sorted_by_name     = this.links_sorted_by_name;
  var links_sorted_by_name_len = links_sorted_by_name.length;

  if (links_sorted_by_name_len === 0) {
    this.links_sorted_by_name.push(link_element);
    return;
  }
  
  index_bottom = 0;
  index_top = links_sorted_by_name_len - 1;
  j = Math.round(index_top / 2);
  count = links_sorted_by_name_len;

  while (count > 0) {
    le = links_sorted_by_name[j];
    
    if (link_element.name_for_comparison === le.name_for_comparison) {
      break;
    }
    else {
      count = count / 2;
      if (link_element.href < le.href) {
        index_top = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }      
    }
  }  

  le = links_sorted_by_name[j];
    
  if (link_element.name_for_comparison === le.name_for_comparison) {
  
    dn = this.getDuplicateNameByName(link_element.name_for_comparison);

    if (dn) {
      dn.addLinkElement(link_element);
    }
    else {
      // Add duplciate HREF object
      dn = new OpenAjax.a11y.cache.DuplicateName(link_element.name, link_element.name_for_comparison);
      dn.addLinkElement(links_sorted_by_name[j]);
      dn.addLinkElement(link_element);
      this.duplicate_names.push(dn);
    }  
  }
  else {
    if (link_element.name_for_comparison < le.name_for_comparison) {
      this.links_sorted_by_name.splice(j,0,link_element);
    }
    else {
      this.links_sorted_by_name.splice(j+1,0,link_element);
    }
  }
  
  return;

};

/**
 * checkForDuplicateHREF
 *
 * @desc Checks for duplicate link href
 *
 * @param link_element Object  link_element object to check 
 *
 * @return none
 */

OpenAjax.a11y.cache.LinksCache.prototype.checkForDuplicateHREF = function (link_element) {

  if (!link_element.href || link_element.href.length === 0) return;

  var i;
  var j;
  var count;
  var index_bottom;
  var index_top;
  
  var le;
  var dh;

  var link_elements     = this.link_elements;
  var link_elements_len = link_elements.length;

  // check duplicate name list first
  
  var duplicate_hrefs     = this.duplicate_hrefs;
  var duplicate_hrefs_len = duplicate_hrefs.length;

  for (i = 0; i < duplicate_hrefs_len; i++) {
    dh = duplicate_hrefs[i];
    
    if (link_element.href.length && 
        link_element.href == dh.href) {
        dh.addLinkElement(link_element);
        return;
    } 
  
  } // end loop

  var links_sorted_by_href     = this.links_sorted_by_href;
  var links_sorted_by_href_len = links_sorted_by_href.length;

  if (links_sorted_by_href_len === 0) {
    this.links_sorted_by_href.push(link_element);
    return;
  }

  index_bottom = 0;
  index_top = links_sorted_by_href_len-1;
  j = Math.floor(index_top/2);
  count = links_sorted_by_href_len;

  while (count > 0) {
  
    le = links_sorted_by_href[j];

    if (link_element.href === le.href) {
      break;
    }
    else {
      count = Math.floor(count / 2);
      if (link_element.href < le.href) {
        index_top = j;
        j = Math.floor((index_top + index_bottom)/2);
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
    }
  }

  le = links_sorted_by_href[j];
    
  if (link_element.href === le.href) {
  
    dh = this.getDuplicateHREFByHREF(link_element.href);
    
    if (dh) {
      dh.addLinkElement(link_element);
    }
    else {
      // Add duplciate HREF object
      dh = new OpenAjax.a11y.cache.DuplicateHREF(link_element.href);
      dh.addLinkElement(links_sorted_by_href[j]);
      dh.addLinkElement(link_element);
      this.duplicate_hrefs.push(dh);
    }  
  }
  else {
    if (link_element.href < le.href) {
      this.links_sorted_by_href.splice(j, 0, link_element);
    }
    else {
      this.links_sorted_by_href.splice((j+1), 0, link_element);
    }
  }
  return;

};

/**
 * getDuplicateHREFByHREF
 *
 * @desc get DuplicateHREF by the href value
 *
 * @param href String href to be found
 *
 * @return DuplicateHREF Object | null 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateHREFByHREF = function (href) {

  var i;
  var dh;
  
  var duplicate_hrefs     = this.duplicate_hrefs;
  var duplicate_hrefs_len = duplicate_hrefs.length;

  if (href) {
    for (i = 0; i < duplicate_hrefs_len; i++) {
      dh = duplicate_hrefs[i];
      if (dh.href === href) return dh;
    } // end loop
  } 

  return null;

};

/**
 * getDuplicateNameByName
 *
 * @desc get DuplicateName by the name 
 *
 * @param name String href to be found
 *
 * @return DuplicateName Object | null 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateNameByName = function (name) {

  var i;
  var dn;
  
  var duplicate_names     = this.duplicate_names;
  var duplicate_names_len = duplicate_names.length;

  if (name) {
    for (i = 0; i < duplicate_names_len; i++) {
      dh = duplicate_names[i];
      if (dh.name_for_comparison === name) return dh;
    } // end loop
  } 

  return null;

};


/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to a LinkCache object
 *
 * @param link_element Object  link_element object to add to the link cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.LinksCache.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.checkForDuplicateHREF(link_element);
    this.checkForDuplicateName(link_element);

    this.length = this.length + 1;
    link_element.cache_id = "link_" + this.length; 
    link_element.document_order = this.length;
    this.link_elements.push(link_element);
    
    if (link_element.dom_element.tag_name === 'area') {
      this.area_elements.push(link_element);
    }
  } 
  
  return this.length;
};

/**
 * getLinkElementByCacheId
 *
 * @desc Returns the LinkElement object with the cache id
 *
 * @param cache_id String  cache id of the LinkElement object
 *
 * @return LinkElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementByCacheId = function (cache_id) {

  var i;

  var link_elements_len = this.link_elements.length;

  if (cache_id && cache_id.length) {  
   for (i=0; i < link_elements_len; i++) {
     if (this.link_elements[i].cache_id == cache_id) {
       return this.link_elements[i];
     }
   } // end loop
 } 

 return null;
};

/**
 * emptyCache
 *
 * @desc Empties the linkCache of LinkElement objects 
 *
 * @return none
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.emptyCache = function () {

  this.link_elements = [];
  this.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the LinkCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCacheItems = function (dom_element) {

  var link_element;

  if ((dom_element.tag_name == 'a') ||
      (dom_element.tag_name == 'area')) {

    link_element = new OpenAjax.a11y.cache.LinkElement(dom_element);    
    this.dom_cache.links_cache.addLinkElement(link_element);
  }
   
};

/**
 * transverseDOMElementsForLinkElements
 *
 * @desc Traverses the DOMElements to update link elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.transverseDOMElementsForLinkElements = function (dom_element) {
 
  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i = 0; i < dom_element.children.length; i++) {
      this.transverseDOMElementsForLinkElements(dom_element.children[i]);
    } // end loop
  }  
  
}; 


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCache = function () {

  var i;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating link elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForLinkElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed link elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
 
};


/**
 * sortLinkElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LinksCache.prototype.sortLinkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.link_elements && this.link_elements.length && !this.link_elements[0][property]) {
    return false;
  } // endif

  var link_elements_len = this.link_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i=1; i < link_elements_len; i++) {
        if (this.link_elements[i-1][property] > this.link_elements[i][property]) {
          // swap the values
          temp = this.link_elements[i-1];
          this.link_elements[i-1] = this.link_elements[i];
          this.link_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i=1; i<link_elements_len; i++) {
        if (this.link_elements[i-1][property] < this.link_elements[i][property]) {
        // swap the values
        temp = this.link_elements[i-1];
        this.link_elements[i-1] = this.link_elements[i];
     this.link_elements[i] = temp;
     swapped = true;
    } 
   } // end loop
  } while (swapped);
 } 

 this.sort_property = property;
 this.sort_ascending = ascending;

 return true;

};


/**
 * LinkElement
 *
 * @desc LinkElement is the object used to hold data about a link and references the DOMElement base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 *
 * @return  LinkElement | null
 */

OpenAjax.a11y.cache.LinkElement = function (dom_element) {

  var ano;
  var href = dom_element.node.href;

  function testIfHrefIsURL(url) {
  
    if (typeof href != 'string') return false;
  
    if (href.indexOf('http://') >= 0) return true;
    else
      if (href.indexOf('https://') >= 0) return true;
      else
        if (href.indexOf('ftp://') >= 0) return true;
        else
          if (href.indexOf('ftps://') >= 0) return true;
          else 
            if (href.indexOf('file://') >= 0) return true;
 
    return false;
  }

  if (!dom_element.node) {
    return null;
  } // endif   

  this.document_order = 0;
 
  this.dom_element = dom_element;

  this.href  = href;
  this.is_url = testIfHrefIsURL(href);
 
  this.tab_index = dom_element.node.tabIndex;
  this.name   = dom_element.node.getAttribute("name");
  this.target  = dom_element.node.getAttribute("target");

  ano = OpenAjax.a11y.cache.util.getNameFromChildrenObject(dom_element);
  
  this.name          = ano.name;
  this.name_for_comparison  = ano.name.toLowerCase();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt  = ano.name_from_image_alt;
  this.image_count      = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  this.height   = parseInt(dom_element.node.offsetHeight, 10);
  this.width   = parseInt(dom_element.node.offsetWidth, 10);
   
  // If the link is an image, use the image height and width
  if ((this.height === 0) && 
      (this.width === 0) && 
      (ano.height) > 0 && 
      (ano.width > 0 )) {
    this.height = ano.height;
    this.width = ano.width;
  } // endif

  return this;
   
};

/**
 * DuplicateName
 *
 * @desc 
 *
 * @constructs
 *
 * @param  name                String 
 *         name_for_comparison String
 *
 * @return  DuplicateName Object | null
 */

OpenAjax.a11y.cache.DuplicateName = function (name, name_for_comparison) {

  this.name                = name;
  this.name_for_comparison = name_for_comparison;
  this.link_elements = [];

};

/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to DuplicateName Object
 *
 * @param link_element Object  link_element object to add 
 *
 * @return length  Number  length is the number of elements with the duplicate name
 */

OpenAjax.a11y.cache.DuplicateName.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.link_elements.push( link_element );
  } 

  return this.link_elements.length;

};

/**
 * DuplicateHREF
 *
 * @desc 
 *
 * @constructs
 *
 * @param  href   String 
 *
 * @return  DuplicateLink Object | null
 */

OpenAjax.a11y.cache.DuplicateHREF = function (href) {

  this.href = href;
  this.link_elements = [];

};

/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to DuplicateHREF Object
 *
 * @param link_element Object  link_element object to add
 *
 * @return length  Number  length is the number of elements with the duplicate href
 */

OpenAjax.a11y.cache.DuplicateHREF.prototype.addLinkElement = function (link_element) {

  // item must exist 
  if (link_element) {
    this.link_elements.push( link_element ); 
  } 

  return this.link_elements.length;

};
    

/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            ListsCache                            */
/* ---------------------------------------------------------------- */

/**
 * ListsCache
 *
 * @constructor
 *
 * @desc Create a ListsCache object to hold ListElement objects
 *
 * @return ListsCache object
 */

OpenAjax.a11y.cache.ListsCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.list_elements = [];  // array of all ListElement objects in DOM
  this.child_elements = []; // array of top-level ListElement objects

  this.sort_property = 'document_order';
  this.up_to_date = false;
  this.length = 0;

};

/**
 * addListElement
 *
 * @desc Add ListElement object to ListsCache
 *
 * @param list_element ListElement object to add to the ListsCache
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addListElement = function (list_element) {

  if (list_element) {
    this.length += 1;
    list_element.document_order = this.length;
    list_element.cache_id = "list_" + this.length;
    this.list_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * update
 *
 * @desc Update the ListsCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new ListElement should be added to this cache.
 *
 * @desc If the dom_element is an 'a' element (link), and there is
 *       a current list_info (i.e., we're in a list) increment
 *       the link_count property on the ListElement.
 *
 * @param dom_element Object DOMElement object to check
 *
 * @param list_info   Object
 *
 * @return nothing
 */

OpenAjax.a11y.cache.ListsCache.prototype.update = function (dom_element, list_info) {

  var li = new OpenAjax.a11y.cache.ListInfo(list_info);

  // check whether we need to add a new ListElement
  if (dom_element.tag_name === 'ul' ||
      dom_element.tag_name === 'ol' ||
      dom_element.tag_name === 'dl' ||
      dom_element.tag_name === 'li' ||
      dom_element.tag_name === 'dt' ||
      dom_element.tag_name === 'dd') {

    var le = new OpenAjax.a11y.cache.ListElement(dom_element);
    this.addListElement(le);

    if (list_info.list_element) {
      list_info.list_element.addChildListElement(le);
    }
    else {
      this.addChildListElement(le);
    }

    li.list_element = le;

    // OpenAjax.a11y.console(dom_element);
  }
  // check for anchor element contained by list element
  else {
    if (list_info.list_element &&
        dom_element.tag_name === 'a' &&
        (dom_element.node.href && dom_element.node.href.length)) {
      list_info.list_element.link_count += 1;
    }
  }

  return li;

};

/**
 * addChildListElement
 *
 * @desc Add a top-level ListElement object to the ListsCache
 *
 * @param list_element ListElement object to add to the ListsCache
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addChildListElement = function (list_element) {

  if (list_element) {
    this.child_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * getListElementByCacheId
 *
 * @desc retrieve ListElement from ListsCache based on its cache_id
 *
 * @param cache_id String id assigned by cache
 *
 * @return ListElement or null
 */

OpenAjax.a11y.cache.ListsCache.prototype.getListElementByCacheId = function (cache_id) {

  var list_elements = this.list_elements;

  var i; // loop counter
  var max = list_elements.length; // loop control
  var le; // loop placeholder;

  for (i = 0; i < max; i++) {
    le = list_elements[i];
    if (le.cache_id === cache_id) {
      return le;
    }
  }

  return null;

};

/**
 * emptyList
 *
 * @desc Empties the current list of cache items
 *
 * @return none
 */

OpenAjax.a11y.cache.ListsCache.prototype.emptyList = function () {

  this.list_elements.length = 0;
  this.sort_property = 'document_order';

};

/* ---------------------------------------------------------------- */
/*                            ListElement                           */
/* ---------------------------------------------------------------- */

/**
 * ListElement
 *
 * @constructor
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a UL, OL, DL, LI, DT, DD element in the DOM
 *
 * @param dom_element DOMElement object currently seen by traversal
 *
 * @return none
 */

OpenAjax.a11y.cache.ListElement = function (dom_element) {

  this.dom_element = dom_element;
  this.document_order = 0;
  this.child_elements = [];
  this.link_count = 0;

};

/**
 * addChildListElement
 *
 * @desc Add a child ListElement to its parent's child_elements array
 *
 * @param list_element child ListElement object to add to this element's
 *                     child_elements array
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListElement.prototype.addChildListElement = function (list_element) {

  if (list_element) {
    this.child_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * isListOfLinks
 *
 * @desc Check whether a list container contains at least the
 *       minimum number of li elements with one and only one link.
 *
 * @param min_li The minimum number of li elements with one link
 *               that the ListElement must contain.
 *
 * @return boolean Indicate whether or not all criteria were met.
 */

OpenAjax.a11y.cache.ListElement.prototype.isListOfLinks = function (min_li) {
  // We assume that this method is only called on a ListElement
  // that is known to be either an ol or ul element. We want to
  // know (a) whether all of its li children contain only one link;
  // and (b) that it contains at least the specified minimum number
  // of li children.

  var child_elements = this.child_elements;
  var max = child_elements.length;
  var i;  // loop counter
  var ce; // loop placeholder

  // results
  var count_li = 0;
  var count_li_with_link = 0;

  for (i = 0; i < max; i++) {
    ce = child_elements[i];

    // ignore elements that are not 'li'
    if (ce.dom_element.tag_name !== 'li') continue;

    // we've got an 'li' element
    count_li += 1;

    // but each must have a link_count of 1
    if (ce.link_count != 1) return false;
    count_li_with_link += 1;
  }

  return (count_li == count_li_with_link) && (count_li >= min_li);

};

/* ---------------------------------------------------------------- */
/*                              ListInfo                            */
/* ---------------------------------------------------------------- */

/**
 * ListInfo
 *
 * @constructor
 *
 * @desc ListInfo is the constructor for saving the current list
 *       element information when traversing the DOM.
 *
 * @return ListInfo object
 */

OpenAjax.a11y.cache.ListInfo = function (list_info) {

  if (list_info) {
    this.list_element = list_info.list_element;
  }
  else {
    this.list_element = null;
  }

};
/**
 * Copyright 2011 OpenAjax Alliance
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
/*                      OpenAjax Media Cache                        */ 
/* ---------------------------------------------------------------- */


/**
 * MediaCache
 *
 * @desc Constructor for MediaCache object which contains a list of 
 *    MediaElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  MediaCache object 
 */

OpenAjax.a11y.cache.MediaCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.media_elements = [];
 
  this.sort_property = 'document_order';
  this.sort_ascending = false;
 
  this.up_to_date = false;
  this.length = 0;

  return this;

}; 

/**
 * addMediaElement
 *
 * @desc Adds a MediaElement object to a MediaCache object
 *
 * @param media_element Object media_element object to add to the link cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.MediaCache.prototype.addMediaElement = function ( media_element ) {

  // item must exist and have the position property
  if (media_element) {
    this.length = this.length + 1;
    media_element.cache_id = "media_" + this.length; 
    media_element.document_order = this.length;
    this.media_elements.push( media_element );
  } 

 return this.length;

};

/**
 * getMediaElementByCacheId
 *
 * @desc Returns the MediaElement object with the cache id
 *
 * @param cache_id String  cache id of the MediaElement object
 *
 * @return MediaElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.MediaCache.prototype.getMediaElementByCacheId = function (cache_id) {

  var i;
  var media_elements_len = this.media_elements.length;

  if (cache_id) {  
    for (i=0; i < media_elements_len; i++) {
      if (this.media_elements[i].cache_id == cache_id) {
        return this.media_elements[i];
      }
    } // end loop
  } 
  return null;
};

/**
 * emptyCache
 *
 * @desc Empties the MediaCache of MediaElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.MediaCache.prototype.emptyCache = function () {

  this.media_elements.length = 0;
  this.sort_property = 'document_order';
  this.sort_ascending = false;
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the MediaCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCacheItems = function (dom_element) {

  var media_element;

  if ((dom_element.tag_name == 'object') ||
      (dom_element.tag_name == 'applet') ||
      (dom_element.tag_name == 'embed') ||
      (dom_element.tag_name == 'audio') ||
      (dom_element.tag_name == 'video')) {

    media_element = new OpenAjax.a11y.cache.MediaElement(dom_element);    
    this.dom_cache.media_cache.addMediaElement(media_element);
  }
   
};

/**
 * transverseDOMElementsForMediaElements
 *
 * @desc Traverses the DOMElements to update link elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.transverseDOMElementsForMediaElements = function (dom_element) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i=0; i<dom_element.children.length; i++) {
      this.transverseDOMElementsForMediaElements(dom_element.children[i]);
    } // end loop
  }  
  
};


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating media elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForMediaElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed media elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * sortMediaElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.MediaCache.prototype.sortMediaElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.media_elements && 
      this.media_elements.length && 
      !this.media_elements[0][property] ) {
    return false;
  } // endif

  var media_elements_len = this.media_elements.length;

  if (ascending) {
    do {
      swapped = false;
      for (i=1; i<media_elements_len; i++) {
        if (this.media_elements[i-1][property] > this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < media_elements_len; i++) {
        if (this.media_elements[i-1][property] < this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.sort_property = property;

  return true;

};

/**
 * MediaElement
 *
 * @desc MediaElement is the object used to hold data about a link and references the DOMElement base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 *
 * @return  MediaElement | null
 */

OpenAjax.a11y.cache.MediaElement = function (dom_element) {

  this.document_order = 0;
 
  this.dom_element = dom_element;

  this.is_video              = OpenAjax.a11y.MEDIA.MAYBE;
  this.is_audio              = OpenAjax.a11y.MEDIA.MAYBE;
  this.has_caption           = OpenAjax.a11y.MEDIA.MAYBE; 
  this.has_text_alternative  = OpenAjax.a11y.MEDIA.MAYBE; 
  this.has_audio_description = OpenAjax.a11y.MEDIA.MAYBE;

  switch (dom_element.tag_name) {
  case 'video':
    this.is_video = OpenAjax.a11y.MEDIA.YES;
    this.is_audio = OpenAjax.a11y.MEDIA.MAYBE;
    break;
    
  case 'audio':
    this.is_video = OpenAjax.a11y.MEDIA.NO;
    this.is_audio = OpenAjax.a11y.MEDIA.YES;
    break;
  
  default:
    this.is_video = OpenAjax.a11y.MEDIA.MAYBE;
    this.is_audio = OpenAjax.a11y.MEDIA.MAYBE;
    break;
  }
  
};

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
 * DOMElementComputedStyle
 *
 * DOMElementComputedStyle is used to add common properties to cache objects 
 *
 * @param  node       Object  dom node object 
 * @param  parent_style   Object  DOMElementComputedStyle of the parent node from the DOM 
 *
 * @return  DOMElementComputedStyle 
 *
 ================================================================ */
 
OpenAjax.a11y.cache.DOMElementComputedStyle = function (dom_element, parent_element) {

 function normalizeBackgroundImage(value, parent_element) {

  var v = value;

  if ((v === undefined) || 
    (v == 'inherit') || 
    (v === '')) {
    
   if (parent_element) {  
    v = parent_style.background_image;
   }
   else {
    v = 'none';
   }
  }  
  
  return v;
  
 } // end function

 function  normalizeFontSize(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.font_size;
   }
   else {
    return 12;
   }    
  }
  else {
   return value;
  }
 } // end function

 function  normalizeFontWeight(value, parent_element) {
  if (isNaN(value) ) {
   switch (value.toLowerCase()) {
   case 'bold':
    return 700;

   case 'normal':
    return 400;

   case 'inherit':
    if (parent_element) {
     return parent_element.computed_style.font_weight;
    }
    else {
     return 400;
    }    

   case 'bolder':
    return 700;
    
   default:
    return 400;
   }
  }
  else {
   return parseInt(value,10);
  }
  
 } // end function


 function  normalizePositionTop(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.top;
   }
   else {
    return 0;
   }    
  }
  else {
   return parseInt(value,10);
  }
 } // end function

 function  normalizePositionLeft(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.left;
   }
   else {
    return 0;
   }    
  }
  else {
   return parseInt(value,10);
  }
 } // end function

 this.display  = "";
 this.visibility = "";
 
 this.graphical = OpenAjax.a11y.VISIBILITY.UNKNOWN; 
 this.at    = OpenAjax.a11y.VISIBILITY.UNKNOWN;
 
 this.color   = "";
 this.background_color = "";
 this.background_image = "";
 this.font_family = "";
 this.font_size  = "";
 this.font_weight = "";
 this.position  = "";
 this.left    = "";
 this.top     = "";
 
 // check to see if getComputedStyle is defined for the engine 
 if (!window.getComputedStyle) return this;
 
 var style = window.getComputedStyle(dom_element.node, null);  
   
 this.display   = style.getPropertyValue("display");
 this.visibility = style.getPropertyValue("visibility");
 
 this.color        = style.getPropertyValue("color");
 this.opacity       = style.getPropertyValue("opacity");
 this.background_color  = style.getPropertyValue("background-color");
 this.background_image  = normalizeBackgroundImage(style.getPropertyValue("background-image"), parent_element);
 this.background_repeat  = style.getPropertyValue("background-repeat");
 this.background_position = style.getPropertyValue("background-position");
 
 this.font_family = style.getPropertyValue("font-family");  
 this.font_size  = normalizeFontSize(style.getPropertyValue("font-size"), parent_element); 
 this.font_weight = normalizeFontWeight(style.getPropertyValue("font-weight"), parent_element); 
 
 this.position = style.getPropertyValue("position");

 // test if getBoundingClientRect is supported 
 if (dom_element.node.getBoundingClientRect) {
  var client_rect = dom_element.node.getBoundingClientRect();
  this.client_rect = client_rect;
  this.top     = client_rect.top;
  this.left    = client_rect.left;
  this.height   = client_rect.height;
  this.width    = client_rect.width;
 }
 else {
  this.top     = normalizePositionTop(style.getPropertyValue("top"), parent_element);
  this.left    = normalizePositionLeft(style.getPropertyValue("left"), parent_element);
 }
 
 // This is an edge case test typcially for body elements and frames
 if ((this.background_color == 'inherit') ||
   (this.background_color == 'transparent')) {
  if (parent_element && parent_element.computed_style) { 
   this.background_color   = parent_element.computed_style.background_color;
   this.background_color_hex = parent_element.computed_style.background_color_hex;
  }
  else {
   this.background_color = 'rgb(255,255,255)';
   this.background_color_hex = 'ffffff';
  }   
 } 
 else {
  this.background_color_hex = OpenAjax.a11y.cache.util.RGBToHEX(style.getPropertyValue("background-color")); 
 }

 if (parent_element && 
   parent_element.computed_style ) {

  var parent_style = parent_element.computed_style;

  // We do have parent_element so use its information if needed  
 
  if ((this.display == 'inherit') ||  
    (parent_element.computed_style.display == 'none')) {
   this.display = 'none';
  } 

  if ((this.visibility == 'inherit') ||
    (parent_style.visibility == 'hidden')) {
   this.visibility = parent_style.visibility;
  } 

  if (this.color == 'inherit') {
   this.color = parent_style.color;
   this.color_hex = parent_style.color_hex;
  }
  else {
   this.color_hex = OpenAjax.a11y.cache.util.RGBToHEX(style.getPropertyValue("color"));
  }
    
  if (this.font_family == 'inherit') {
   this.font_family = parent_style.font_family;
  } 
  
  if (this.position == 'inherit') {
   this.position = parent_style.position;
  } 
 } 
 
 // Calcuate visibility of node content in graphical renderings and to assistive technologies

 if (this.visibility && 
   this.visibility.length && 
   this.display && 
   this.display.length ) { 
  if ((this.visibility == 'hidden') ||
    (this.display == 'none')) {
   this.graphical = OpenAjax.a11y.VISIBILITY.HIDDEN;
   this.at    = OpenAjax.a11y.VISIBILITY.HIDDEN;
  }
  else {
   if (this.position == "absolute" &&
     (parseInt(this.top,10) < 0 || parseInt(this.left,10) < 0)) {
    this.graphical = OpenAjax.a11y.VISIBILITY.HIDDEN;
   }
   else {
    this.graphical = OpenAjax.a11y.VISIBILITY.VISIBLE;
   }
   
   if (dom_element.role == "presentation") {
    this.at = OpenAjax.a11y.VISIBILITY.HIDDEN;  
   } 
   else {
    this.at = OpenAjax.a11y.VISIBILITY.VISIBLE;     
   }
  }
 } 


 return this;  

};

  /**
  * OpenAjax.a11y.cache.DOMElementComputedStyle.calculateColorContrast
  *  
  * @desc
  * 
  * @return Number representing the color contrast ratio 
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.calculateColorContrastRatio = function () {

 if( this.color_hex && 
   (this.color_hex.length == 6) && 
    this.background_color_hex && 
   (this.background_color_hex.length == 6)) {
  var L1 = this.getLuminance(this.color_hex);
  var L2 = this.getLuminance(this.background_color_hex);
  this.color_contrast_ratio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;
 }
 else {
  this.color_contrast_ratio = null;
 }

 return this.color_contrast_ratio;
   
};


  /**
  * OpenAjax.a11y.cache.DOMElementComputedStyle.getLuminance
  *  
  * @desc Get the luminance value of a hex incoded color 
  * 
  * @return Number representing the limnance value
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.getLuminance = function (color) {

 // OpenAjax.a11y.console("  " + color );

 // Get decimal values
 var R8bit = parseInt(color.substring(0,2),16);
 var G8bit = parseInt(color.substring(2,4),16);
 var B8bit = parseInt(color.substring(4,6),16);
        
 // Get sRGB values
 var RsRGB = R8bit/255;
 var GsRGB = G8bit/255;
 var BsRGB = B8bit/255;
  // Calculate luminance
 var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow(((RsRGB + 0.055)/1.055), 2.4);
 var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow(((GsRGB + 0.055)/1.055), 2.4);
 var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow(((BsRGB + 0.055)/1.055), 2.4);
			
 return (0.2126 * R + 0.7152 * G + 0.0722 * B);
			
};

  /**
  * toString
  *  
  * @desc Get the luminance value of a hex incoded color 
  * 
  * @return Number representing the limnance value
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.toString = function (color) {
 return "Computed style " + this.color_hex + " " + this.background_color_hex + " " + this.color_contrast_ratio; 

};
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
  


/** ================================================================
*
* OpenAjax.a11y.LogRuleItem 
*
* @desc Constructor to log information about a rule and its execution time
*
* @return LogRuleItem object
*
* =============================================================== */

OpenAjax.a11y.LogRuleItem = function () {
 this.id = "";
 this.message = "";
 this.time  = 0;   
};

/** ================================================================
*
* OpenAjax.a11y.LogRequirementItem 
*
* @desc Constructor to log information about a requirement and its execution time
*
* @return LogRequirementItem object
*
* =============================================================== */

OpenAjax.a11y.LogRequirementItem = function () {
 this.id = "";
 this.message = "";
 this.time = 0;
 this.rules = new Array(); 
};

/** ================================================================
*
* OpenAjax.a11y.LogRequirementItem.addLogRule 
*
* @desc Adds a LogRuleObject information to a requirement
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.LogRequirementItem.prototype.addLogRule = function ( rule_item ) {

 if ( rule_item ) {
  this.rules.push(rule_item);
 } // endif 

};

/** ================================================================
*
* OpenAjax.a11y.Log 
*
* @desc Constructor for a Log Object that represents the progress 
*    and stores the execution times of document evaluation
*
* @return Log object
*
* =============================================================== */


OpenAjax.a11y.Log = function (ruleset_id, name, total, progressCallBackFunction) {

 this.id      = ruleset_id;
 this.name     = name;
 this.total_count  = total;
 this.cache_time  = 0;
 this.total_time  = 0;
 this.progressCallBackFunction = progressCallBackFunction;
 this.requirements = new Array();   
 
 this.start_time = new Date().getTime();
 this.last_time = this.start_time;
   
 this.last_requirement_item = null;
 this.last_requirement_time = this.start_time;
 
 this.count = 0;

};

/** ================================================================
*
* OpenAjax.a11y.Log.addLogRequirement 
*
* @desc Adds a LogRequirementObject information to the Log
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.Log.prototype.addLogRequirement = function (requirement_item) {
  
 if ( requirement_item ) {
  this.requirements.push(requirement_item);
 } // endif 
  
 };  
  
/** ================================================================
*
* OpenAjax.a11y.Log.toString 
*
* @desc Generates a String of the log information
*
* @return String of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toString = function () {
  
 var str ="";
    
 var log_requirements_length = this.requirements.length;
    
 str += "ID         : " + this.id + "\n";
 str += "Name        : " + this.name + "\n";
 str += "Cache Creation Time : " + this.timeInMillisecondToString(this.cache_time) + "\n";
 str += "Rule Execution Time : " + this.timeInMillisecondToString(this.total_time-this.cache_time) + "\n";
 str += "Total Time     : " + this.timeInMillisecondToString(this.total_time) + "\n";   
    
 for (var i=0; i < log_requirements_length; i++ ) {

  str += "\nRequirement " + this.requirements[i].message + ": " + this.timeInMillisecondToString(this.requirements[i].time) + "\n";
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (var j=0; j <log_rule_length; j++) {
   str += " Rule " + this.requirements[i].rules[j].message + ": " + this.timeInMillisecondToString(this.requirements[i].rules[j].time) + "\n";    
  } // endloop
    
 } // end loop
    
 return str;
};  
  

/** ================================================================
*
* OpenAjax.a11y.Log.toXML 
*
* @desc Generates a XML representations of the log information
*
* @return XML formatted string text of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toXML = function () {
   
 var i, j;  
 var str = "<!-- All times are in milliseconds -->\n";
 str +="<oaa-log>\n";
    
 var log_requirements_length = this.requirements.length;
    
 str += " <id>"      + this.id  + "</ruleset-id>\n";
 str += " <name>"     + this.name + "</ruleset-title>\n";
 str += " <cache-time>"  + this.cache_time  + "</cache-time>\n";
 str += " <rule-time>"   + (this.total_time-this.cache_time) + "</rule-time>\n";
 str += " <total-time>"  + this.total_time  + "</total-time>\n";   

 str += " <requirements>\n";   

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  <requirement id='"+ this.requirements[i].id+ "'>\n";
  str += "   <message>"   + this.requirements[i].message + "</message>\n";
  str += "   <time>"     + this.requirements[i].time + "</time>\n";
  str += "   <rules>\n";   
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (j=0; j <log_rule_length; j++) {

   str += "    <rule id='" + this.requirements[i].rules[j].id+ "'>\n";
   str += "     <message>" + this.requirements[i].rules[j].message + "</message>\n";
   str += "     <time>"  + this.requirements[i].rules[j].time + "</time>\n";
   str += "    </rule>\n";

  } // endloop

  str += "   </rules>\n";   
    
 } // end loop

 str += " </requirements>\n";   
 str +="</oaa-log>\n";

 return str;
};  
  

/** ================================================================
*
* OpenAjax.a11y.Log.toJSON 
*
* @desc Generates a JSON representations of the log information
*
* @return JSON formatted string text of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toJSON = function () {
      
 var i, j;     
 var str ="{\n";
       
 str += " \"id\"     : \"" + this.id              + "\",\n";
 str += " \"name\"    : \"" + this.name             + "\",\n";
 str += " \"cache-time\" : " + this.cache_time          + ",\n";
 str += " \"rule-time\" : " + (this.total_time-this.cache_time) + ",\n";
 str += " \"total-time\" : " + this.total_time          + ",\n";   

 str += " \"requirements\" : [\n";   

 var log_requirements_length = this.requirements.length;

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  { \"id\"   : \"" + this.requirements[i].id+ "\",\n";
  str += "   \"message\" : \"" + this.requirements[i].message + "\",\n";
  str += "   \"time\"  : " + this.requirements[i].time + ",\n";
     
  var log_rule_length = this.requirements[i].rules.length;

  if (log_rule_length) {
   str += "   \"rules\"  : [\n";   
   for (j=0; j <log_rule_length; j++) {

    str += "    { \"id\"   : \"" + this.requirements[i].rules[j].id + "\",\n";
    str += "     \"message\" : \"" + this.requirements[i].rules[j].message + "\",\n";
    str += "     \"time\"  : " + this.requirements[i].rules[j].time + "\n";
    str += "    },\n";

   } // endloop
   str += "   ]\n";
  }
  else {
   str += "   \"rules\"  : []\n";   
  }
  str += "  },\n";
 } // end loop

 str += " ],\n";   
 str +="}\n";

 return str;
};  

/** ================================================================
*
* OpenAjax.a11y.Log.consoleStatusLog
*
* @desc Outputs progress information to the Firefox console
*
* @param message String Message to output to the console 
* @param time   Object DateTime object of the current time
* 
* @return nothing
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.consoleStatusLog = function ( message, time ) {
 
 if (!OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE) return;
  
 if (typeof time == 'number') {
  OpenAjax.a11y.console( message + ": " + this.timeInMillisecondToString(time) + " (" + this.count + " of " + this.total_count +")");
 }
 else {
  OpenAjax.a11y.console( message );    
 }
}; 

/** ================================================================
*
* OpenAjax.a11y.Log.update
*
* @desc Calculates execution time and updates progress information
*
* @param state  Number Numerical value representing the current 
*             progress in updating the cache and evaluating rules 
* @param message String Progress message
* @param rule_id String id of the current rule being processed
* 
* @return nothing
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.update = function (state, message, rule_id) {

 var PROGRESS = OpenAjax.a11y.PROGRESS;   

 var time    = new Date().getTime();
 var change   = time - this.last_time;    
 
 this.total_time = time - this.start_time;    
 this.last_time = time;
    
 switch (state) {
    
 case PROGRESS.START:   
  this.start_time = time;
  this.consoleStatusLog(message, null); 
  break;
     
 case PROGRESS.CACHE_START:
  this.cache_start_time = time;
  this.consoleStatusLog(message, change); 
  break;

 case PROGRESS.CACHE_END:
  this.cache_time = this.cache_time + (time-this.cache_start_time);
  this.consoleStatusLog(message, change); 
  break;


 case PROGRESS.REQUIREMENT:
    
  var requirement_item = new OpenAjax.a11y.LogRequirementItem();
  requirement_item.id = rule_id;
  requirement_item.message = message;
     
  this.addLogRequirement( requirement_item );
     
  if (this.last_requirement_item) {
   this.last_requirement_item.time = time - this.last_requirement_time;
   this.consoleStatusLog(" Total Time for " + this.last_requirement_item.message, this.last_requirement_item.time);
  } 
  
  this.last_requirement_item = requirement_item;
  this.last_requirement_time = time;     
  this.consoleStatusLog(message, null); 
  break;

 case PROGRESS.RULE:
  var log_rule = new OpenAjax.a11y.LogRuleItem();
  log_rule.id = rule_id;
  log_rule.message = message;
  log_rule.time  = change;
  this.last_requirement_item.addLogRule( log_rule );
  this.consoleStatusLog(" " + message, change); 
  this.count++; 
  break;

 case PROGRESS.COMPLETE:
     
  if (this.last_requirement_item) {
    this.last_requirement_item.time = time - this.last_requirement_time;
    this.consoleStatusLog(" Total Time for " + this.last_requirement_item.message, this.last_requirement_item.time);
  } 
     
  this.consoleStatusLog(message, this.total_time); 
  break;

 default:
  break;
  
 } // end switch
 
 if ( this.progressCallBackFunction ) {
  var percent = Math.round((100 * this.count) / this.total_count);
  var progress_message = message + " (" + this.total_time + " milliseconds)";
  this.progressCallBackFunction(progress_message, percent);
 } 

}; 

/** ================================================================
*
* OpenAjax.a11y.Log.timeInMillisecondToString
*
* @desc Calculates execution time and updates progress information
*
* @param time Number Current time in milliseconds
* 
* @return String of the time in milliseconds
*
* =============================================================== */

OpenAjax.a11y.Log.prototype.timeInMillisecondToString = function (time) {
    
 if (time === 0) {
    return "<1 millisecond";
 }
 else {
  if (time === 1) {
   return "1 millisecond";
  }
  else {
   return time + " milliseconds";      
  }
 } 
    
}; 

  
/**
 * Copyright 2011 OpenAjax Alliance
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

OpenAjax.a11y.results = OpenAjax.a11y.results || {};

/* ---------------------------------------------------------------- */
/*                 RulesetEvaluationResult                          */
/* ---------------------------------------------------------------- */
  
/**
 * RulesetEvaluationResult
 *
 * @desc Constructor for ruleset evaluation result
 *    Container object for requirement and rule results
 *
 * @param id  String id of the ruleset 
 * @param name String name of the ruleset 
 * @param url  String url to the ruleset requirements specification
 *
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RulesetEvaluationResult = function (ruleset_id, ruleset_name, ruleset_url, doc_url, doc_title) {
 this.date = new Date();
 
 this.ruleset_id = ruleset_id;
 this.ruleset_name = ruleset_name;
 this.ruleset_url = ruleset_url;
 
 this.doc_url = doc_url;
 this.doc_title = doc_title;
 
 this.score_text  = "none";
 this.score_count  = 0;
 this.score_total  = 0;
 this.score_percent = 0.0;

 this.requirements = [];
 
 return this;
};

/**
 * addRequirementResult
 *
 * @desc Adds requirement result object to ruleset result object
 *
 * @param requirment_result object Requirement result object to be added
 * 
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.addRequirementResult = function ( requirement_result ) {

 if ( requirement_result ) {
  this.requirements.push(requirement_result);
 } // endif 

};

/**
 * toString
 *
 * @desc Creates a string representation of the ruleset results, requirement and rule results
 *
 * @return String of ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toString = function () {

  var i;
  var j;
  var str ="";

  var requirements     = this.requirements;
  var requirements_len = requirements.length;
  var requirement;
 
  var rule_results_len;
  var rule_result;
  
  str += "Ruleset ID    : " + this.ruleset_id  + "\n";
  str += "Ruleset Name  : " + this.ruleset_name + "\n";
  str += "Ruleset URL   : " + this.ruleset_url + "\n\n";

  str += "Document Title : " + this.doc_title  + "\n";
  str += "Document URL   : " + this.doc_url    + "\n\n";

  str += "Score         : " + this.score_text  + "\n";
  str += "Score Percent : " + this.score_percent + "\n";
  str += "Score Count   : " + this.score_count  + "\n";
  str += "Score Total   : " + this.score_total  + "\n";
    
    
  for (i=0; i < requirements_len; i++ ) {
    requirement = requirements[i];
  
    str += "\nRequirement " + requirement.requirement_label + "\n";
    str += "  Number   : "  + requirement.requirement_number + "\n";
    str += "  Level    : "  + requirement.requirement_level  + "\n";
    str += "  URL      : "  + requirement.requirement_url   + "\n";
    str += "  Enabled  : "  + requirement.requirement_enabled + "\n\n";

/*
    str += "  Score     : " + this.requirements[i].score_text  + "\n";
    str += "  Score Percent : " + this.requirements[i].score_percent + "\n";
    str += "  Score Count  : " + this.requirements[i].score_count  + "\n";
    str += "  Score Total  : " + this.requirements[i].score_total  + "\n\n";
*/
    str += "  Rule Results\n";

    // report evaluation results
    rule_results_len = requirement.rule_results.length;

    if (rule_results_len) {
    
      for (j=0; j<rule_results_len; j++) {
      
        rule_result = requirement.rule_results[j];
        
        str += "   Rule: " + rule_result.rule_title  + "\n";    
        str += "    Severity : " + rule_result.rule_severity + "\n";    
        str += "    Priority : " + rule_result.rule_priority + "\n";    
        str += "    Enabled  : " + rule_result.rule_enabled + "\n\n";    
    
        str += "    Nodes in Document:\n";    
        
        if (rule_result.rule_enabled) {
          str += "     " + rule_result.nodes_violations.length           + " Violations\n";    
          str += "     " + rule_result.nodes_recommendations.length      + " Recommendations\n";    
          str += "     " + rule_result.nodes_manual_evaluations.length   + " Manual Evaluations\n";    
          str += "     " + rule_result.nodes_passed.length               + " Passed\n";    
          str += "     " + rule_result.nodes_hidden.length               + " Hidden\n";    
          str += "     " + rule_result.nodes_warnings.length             + " Warnings\n";    
          str += "     " + rule_result.nodes_na.length                   + " Conditions Not Met\n\n";   
        }
        else {
          str += "     ** No nodes analyzed, rule is disabled **\n";        
        }    
      } // endloop
    }
    else {
      str += "     ** No rules for this requirement ** \n\n";
    }   
  } // end loop
    
  return str;
};  


/**
 * toXML
 *
 * @desc Creates a XML string representation of the ruleset results, requirement and rule results
 *
 * @return String Using XML coding to represent the ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toXML = function (ruleset_nls) {

  var i;
  var j;
  var str = "";
  
  var requirements = this.requirements;
  var requirements_len = requirements.length;
  var requirement;

  var rule_results_len;
  var rule_result;
  
  var count;
  
  function nodeResultsToXML(node_results) {
 
    var i;
    var str = "";
    var len;
    var node_result;
  
    if (node_results) {
  
      len = node_results.length;
      node_result = null;
  
      for(i=0; i<len; i++ ) {
        str += node_results[i].toXML();
      } // end loop
    } 
 
    return str;
  }


  str += "<oaa-results>\n";
    
  str += " <ruleset>\n";
  str += "  <id>"  + this.ruleset_id  + "</id>\n";
  str += "  <name>" + this.ruleset_name + "</name>\n";
  str += "  <url>" + this.ruleset_url.replace(/&/g, '&amp;') + "</url>\n";
  str += " </ruleset>\n";

  str += " <document>\n";
  str += "  <title>"  + this.doc_title  + "</title>\n";
  str += "  <url>" + this.doc_url.replace(/&/g, '&amp;') + "</url>\n";
  str += " </document>\n";
  
  str += " <requirements>\n";
 
  for (i=0; i<requirements_len; i++) {
 
    requirement = requirements[i];

    str += "  <requirement>\n";
    str += "   <number>"  + requirement.requirement_number  + "</number>\n";
    str += "   <label>"   + requirement.requirement_label   + "</label>\n";
    str += "   <level>"   + requirement.requirement_level   + "</level>\n";
    str += "   <url>"     + requirement.requirement_url     + "</url>\n";
    str += "   <enabled>" + requirement.requirement_enabled + "</enabled>\n";

    str += "   <rules>\n";

    // report evaluation results
    rule_results_len = requirement.rule_results.length;

    for (j=0; j<rule_results_len; j++) {
      rule_result = requirement.rule_results[j];
   
      str += "     <rule>\n";
      str += "      <id>"    + rule_result.rule_id    + "</id>\n";    
      str += "      <title>"  + rule_result.rule_title  + "</title>\n";    
      str += "      <severity>" + rule_result.rule_severity + "</severity>\n";    
      str += "      <priority>" + rule_result.rule_priority + "</priority>\n";    
      str += "      <enabled>" + rule_result.rule_enabled + "</enabled>\n";    
      str += "     </rule>\n";

      count = rule_result.nodes_passed.length;
      str += "     <passed count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_passed);    
      str += "     </passed>\n";

      count = rule_result.nodes_violations.length;
      str += "     <violations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_violations);    
      str += "     </violations>\n";
   
      count = rule_result.nodes_recommendations.length;
      str += "     <recommendations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_recommendations);    
      str += "     </recommendations>\n";
   
      count = rule_result.nodes_manual_evaluations.length;
      str += "     <manual-evaluations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_manual_evaluations);    
      str += "     </manual-evaluations>\n";

      count = rule_result.nodes_hidden.length;
      str += "     <hidden count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_hidden);    
      str += "     </hidden>\n";

      count = rule_result.nodes_warnings.length;
      str += "     <warnings count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_warnings);    
      str += "     </warnings>\n";
     
      count = rule_result.nodes_na.length;
      str += "     <not-applicable count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_na);    
      str += "     </not-applicable>\n";
      
    } // endloop
    str += "   </rules>\n";
    str += "  </requirement>\n";
  } // end loop

  str += " </requirements>\n";
  str += "</oaa-results>\n";

  return str;
};  

/**
 * toDjango
 *
 * @desc 
 *
 * @return String of database inserts
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toDjango = function () {

  var i;
  var j;
  var str = "";
  
  var requirements = this.requirements;
  var requirements_len = requirements.length;
  var requirement;
  
  var rule_results_len;
  var rule_result;
  
  str += "from local import conf, inst, ws\n\n";
  
  for (i=0; i<requirements_len; i++) {
 
    requirement = requirements[i];

// addResult(conf, inst, ws, url, title, control_id, pc, vc, rc, pvc, prc, hc, wc, nac)

    rule_results_len = requirement.rule_results.length;
 
    for (j=0; j<rule_results_len; j++) {
  
      rule_result = requirement.rule_results[j];

      str += "addResult(conf, inst, ws, ";
      str += "'" + this.doc_url;
      str += "', '" + this.doc_title;
      str += "', '" + rule_result.rule_id;
      str += "'"; 

      str += ", " + rule_result.nodes_passed.length; 
      str += ", " + rule_result.nodes_violations.length; 
      str += ", " + rule_result.nodes_recommendations.length; 
      str += ", " + rule_result.nodes_manual_evaluations.length; 
      str += ", " + rule_result.nodes_hidden.length; 
      str += ", " + rule_result.nodes_warnings.length; 
      str += ", " + rule_result.nodes_na.length;
      str += ")\n";  
    } // endloop
  } // end loop

  return str;
};  


/**
 * toJSON
 *
 * @desc Creates a JSON string representation of the ruleset results, requirement and rule results
 *
 * @return String Using JSON coding to represent the ruleset evaluation results
 */
 
OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toJSON = function () {

 return "{ 'Feature has not been implemented' } ";

};

/**
 * toHTML
 *
 * @desc Creates a HTML string representation of the ruleset results, requirement and rule results
 *
 * @return String Using HTML coding to represent the ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toHTML = function (ruleset_nls) {

  var html = "";
  var title;

  function nodeResultsToHTML(node_results) {
 
    var i;
    var html = "";
    var len;
    var node_result;
  
    if (node_results) {
  
      len = node_results.length;
      node_result = null;
      html += "<ul>\n";
      for (i = 0; i < len; i++) {
        html += node_results[i].toHTML(ruleset_nls);
      } // end loop
      html += "</ul>\n";
    } 
 
    return html;
  }

 title = "OAA Evaluation Results for \"" + this.doc_title + "\"";

 html += "<html>\n";

 html += "  <head>\n";
 html += "    <title>" + title + "</title>\n";
 

 html += "  </head>\n";
 html += "  <body>\n";

 html += "    <h1>" + title + "</h1>\n";
  
 html += "    <h2>Document Information<h2>\n";
 html += "    <ul class=\"document-info\">\n";
 html += "      <li><strong>Document Tile:</strong> " + this.doc_title + "</li>\n";
 html += "      <li><strong>Document URL:</strong> "  + this.doc_url  + "</li>\n";
 html += "    </ul>\n";

 html += "    <h2>Rule Set Information<h2>\n";
 html += "    <ul class=\"ruleset-info\">\n";
 html += "      <li><strong>Ruleset ID:</strong> "   + this.ruleset_id   + "</li\n";
 html += "      <li><strong>Ruleset Tile:</strong> " + this.ruleset_name + "</li>\n";
 html += "      <li><strong>Ruleser URL:</strong> "  + this.ruleset_url  + "</li>\n";
 html += "    </ul>\n";
 
 var requirements_len = this.requirements.length;
    
 for (var i=0; i < requirements_len; i++ ) {
 
  var requirement = this.requirements[i];

  html += "    <div class=\"requirement\">\n";
  html += "      <h2>" + requirement.requirement_label  + " (Level-" + requirement.requirement_level + ")</h2>\n";
  html += "      <div class=\"rules\">\n";

  // report evaluation results
  var rule_results_len = this.requirements[i].rule_results.length;

  for (var j=0; j < rule_results_len; j++) {
   var rule_result = this.requirements[i].rule_results[j];
   
   html += "       <div class='rule'>\n";
   html += "         <h3>" + rule_result.rule_title  + "</h3>\n";    
   html += "         <div class=\"severity\">" + rule_result.rule_severity + "</div>\n";    
   html += "         <div class=\"priority\">" + rule_result.rule_priority + "</div>\n";    
   html += "         <div class=\"enabled\">"  + rule_result.rule_enabled + "</div>\n";    
    
   html += "         <div class=\"violations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_violations);    
   html += "         </div>\n";
   
   html += "         <div class=\"recommendations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_recommendation);    
   html += "         </div>\n";
   
   html += "         <div class=\"manual-evaluations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_manual_evaluations);    
   html += "         </div>\n";

   html += "         <div class=\"hidden\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_hidden);    
   html += "         </div>\n";

   html += "         <div class=\"warnings\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_warnings);    
   html += "         </div>\n";
   

   html += "         <div class=\"passed\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_passed);    
   html += "         </div>\n";
   
   html += "         <div class=\"not-applicable\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_na);    
   html += "         </div>\n";
   html += "       </div>\n";
    
  } // endloop
  html += "      </div>\n";
 } // end loop

 html += "    </div>\n";
 html += "  </body>\n";
 html += "</html>\n";

 return html;
};  

/* ---------------------------------------------------------------- */
/*                 RequirementResult                          */
/* ---------------------------------------------------------------- */

/**
 * RequirementResult
 *
 * @desc Constructor for ruleset evaluation result
 *    Container object for requirement and rule results
 *
 * @param number    String  number of he requirement being evaluated
 * @param label    String  label for the requirement
 * @param description String  description of the requirement
 * @param level    String  level of importance of the requirement 
 * @param url     String  url to the requirment specification
 * @param enabled   Boolean wether the requirement is enabled or not
 *
 * @return RulesetEvaluationResult object
 */
 
OpenAjax.a11y.results.RequirementResult = function (number, label, description, level, url, enabled) {
 this.requirement_number    = number;
 this.requirement_label    = label; 
 this.requirement_description = description; 
 this.requirement_level    = level;
 this.requirement_url     = url;
 this.requirement_enabled   = enabled;
 
 this.score_text    = "none";
 this.score_count   = 0;
 this.score_total   = 0;
 this.score_percentage = 0.0;
 
 this.rule_results   = [];
 this.references    = [];
};

/**
 * addRuleResult
 *
 * @desc Adds a rule result object to the requirement result object
 *
 * @param rule_result Object rule result object to add to requirement
 *
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RequirementResult.prototype.addRuleResult = function ( rule_result ) {

 if ( rule_result ) {
  this.rule_results.push(rule_result);
 } // endif 

};

/**
 * addReference
 *
 * @desc Adds an informative reference to the requirement result object 
 *
 * @param reference object reference object to be added to the requirement object
 * 
 * @return none
 */

OpenAjax.a11y.results.RequirementResult.prototype.addReference = function ( reference ) {

 if ( reference ) {
  this.references.push(reference);
 } // endif 

};

/* ---------------------------------------------------------------- */
/*                         RequirementReference                     */
/* ---------------------------------------------------------------- */


/**
 * OpenAjax.a11y.results.RequirementReference
 *
 * @desc Constructor for an object that contains a reference that 
 *    supports the implementation of a requirement 
 *
 * @param type  String a string identifier of the type of reference (i.e. example, best practice, manual evaluation..)
 * @param title String the title associated with the reference
 * @param url  String the url to the reference
 *
 * @return none
 */
 
OpenAjax.a11y.results.RequirementReference = function (type, title, url) {
 this.reference_type = type;
 this.reference_title = title;
 this.reference_url  = url;
};

/** 
 * OpenAjax.a11y.results.RuleResult
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule
 *
 * @param id    String  a string identifier of the type of reference (i.e. example, best practice, manual evaluation..)
 * @param title   String  the title associated with the reference
 * @param severity Number  The importance of the rule in the ruleset
 * @param priority Number  The importance of the rule relative to other rules in this requirement
 * @param enabled  Boolean true if rule was evaluated, false if rule was not evaluated
 *
 * @return none
 */
 
OpenAjax.a11y.results.RuleResult = function (id, title, severity, priority, enabled) {
  this.rule_id         = id;
  this.rule_title      = title;
  this.rule_severity   = severity; 
  this.rule_priority   = priority;
 
  this.rule_enabled    = enabled;
 
  this.score_text = "none";
  this.score_count = 0;
  this.score_total = 0;
  this.score_percentage = 0.0;
 
  this.nodes_passed               = [];
  this.nodes_violations           = [];
  this.nodes_recommendations      = [];
  this.nodes_manual_evaluations   = [];
  this.nodes_hidden               = [];
  this.nodes_warnings             = [];
  this.nodes_na                   = [];
};

/**
 * addResult
 *
 * @desc Adds a result for the evaluation of a node to the rule result object 
 *
 * @param severity      Number severity of the rule
 * @param cache_item     Object reference to cache item associated with the test
 * @param message_id     String reference to the message string in the NLS file
 * @param message_arguements Array  array of values used in the message string 
 * 
 * @return none
 */

OpenAjax.a11y.results.RuleResult.prototype.addResult = function (severity, cache_item, message_id, message_arguments) {

  var SEVERITY = OpenAjax.a11y.SEVERITY;

  var dom_element_item = null; 
 
  if (cache_item) {
    if (cache_item.dom_element) {
      dom_element_item = cache_item.dom_element;  
    } 
    else {
      dom_element_item = cache_item;  
    }
  }  
  
  var node_result = new OpenAjax.a11y.results.NodeResult(this, severity, cache_item, message_id, message_arguments);
 
  // OpenAjax.a11y.console("Add Result for " + this.rule_id + ": " + severity + " " + dom_element_item);

  switch (severity) {
 
  case SEVERITY.NA: 
    this.nodes_na.push(node_result);
    if (dom_element_item) dom_element_item.rules_na.push(node_result);
    break;

  case SEVERITY.HIDDEN: 
    this.nodes_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.WARNING: 
    this.nodes_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    break;
 
  case SEVERITY.PASS:
    this.nodes_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.nodes_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.RECOMMENDATION:
    this.nodes_recommendations.push(node_result);
    if (dom_element_item) dom_element_item.rules_recommendations.push(node_result);
    break;
  
  case SEVERITY.MANUAL_EVALUATION:
    this.nodes_manual_evaluations.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_evaluations.push(node_result);
    break;
  
  default:
    break; 
  } // end switch 
};

/* ---------------------------------------------------------------- */
/*                              NodeResult                          */
/* ---------------------------------------------------------------- */

/**
 * OpenAjax.a11y.results.NodeResult
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param rule_result    Object reference to the rule result object
 * @param severity       String 
 * @param cache_item     Object reference to cache item associated with the test
 * @param message_id     String reference to the message string in the NLS file
 * @param message_arguements Array  array of values used in the message string 
 *
 * @return none
 */

OpenAjax.a11y.results.NodeResult = function (rule_result, severity, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  this.severity    = severity;
  this.cache_item  = cache_item;
  this.message_id  = message_id;
  this.message_arguments = message_arguments;

};


/**
 *
 * getResultSeverity
 *
 * @desc getResultSeverity resturns a localized string of the severity level of the node result
 *
 * @param ruleset_nls Object  ruleset NLS used to define the language of the message 
 * 
 * @return String representing the severity of the node result
 */

OpenAjax.a11y.results.NodeResult.prototype.getResultSeverity = function (ruleset_nls) {

  return ruleset_nls.severities[this.severity];
  
};

/**
 *
 * getResultMessage
 *
 * @desc getResultMessage returns the message in the language of the ruleset nls reference
 *         includes inseting the message arguments
 *
 * @param ruleset_nls Object  ruleset NLS used to define the language of the message 
 * 
 * @return String message associated withe the node result
 */

OpenAjax.a11y.results.NodeResult.prototype.getResultMessage = function (ruleset_nls) {

  var i;
  var message;
  var str = ruleset_nls.rules[this.rule_result.rule_id][this.message_id];
  var vstr; // i.e. %1, %2 ....
  var len = this.message_arguments.length;
 
  for (i=0; i<len; i++) { 
    vstr = "%" + (i+1); 
    message = this.message_arguments[i];
    if (typeof message === 'string') {
      message = message.normalizeSpace();
    }
    else {
      if (typeof message === 'number') {
        message = message.toString();
      }
      else {
        message = "";
      }  
    }  
    str = str.replace(vstr, message);
  } // end loop
 
 return str;
};

/**
 * toString
 *
 * @desc Creates a string descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toString = function () {
  var str = "";
 
  str += "messageID: " + this.message_id + ", ";
 
  for (var i=0; i<this.message_arguments.length; i++) { 
    str += "arg" + i +  ": '" + this.message_arguments[i] + "', " ;
  } // end loop

  if (this.cache_item ) {
    str += "cacheID: " + this.cache_item.cache_id + ", ";
  }
  else {
    str += "cacheID: none, ";
  }
 
  str += "result: " + this.rule_result;

  return str;
};

/**
 * toXML
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toXML = function () {
  var str = "";
  str += "      <node-result>\n";
  str += "       <severity>" + this.severity            + "</severity>\n";
  
  if (this.cache_item) {
    str += "       <cache-id>" + this.cache_item.cache_id + "</cache-id>\n";
    if (this.cache_item.xpath) {
      str += "       <xpath>" + this.cache_item.xpath + "</xpath>\n";
    }
    else {
      if (this.cache_item.dom_element && this.cache_item.dom_element.xpath) {
        str += "       <xpath>" + this.cache_item.dom_element.xpath + "</xpath>\n";
      }
      else {
        str += "       <xpath>undefined</xpath>\n";
      }
    }
  }
  else {
    str += "       <cache-id>none</cache-id>\n";
    str += "       <xpath>none</xpath>\n";
  }
  
  
  str += "       <message-id>" + this.message_id + "</message-id>\n";
 
  for (var i=0; i<this.message_arguments.length; i++) { 
    str += "       <arguement>" + this.message_arguments[i] + "</arguement>\n" ;
  } // end loop

  str += "       </node-result>\n";
 
  return str;
};

/**
 * toHTML
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toHTML = function (ruleset_nls) {
  var i;
  var html = "<li>" + this.getResultSeverity(ruleset_nls) + ": " + this.getResultMessage(ruleset_nls) + "</li>";
 
  return html;
};

/**
 * Copyright 2011 OpenAjax Alliance
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
/*                   OpenAjax High Level APIs                       */ 
/* ---------------------------------------------------------------- */

(function () {

  /**
  * OpenAjax.a11y.console
  *
  * @desc
  * 
  * @param message 
  */
  
  OpenAjax.a11y.console = function (message) {
    if (OpenAjax.a11y.CONSOLE_MESSAGES) {
      var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
      console.logStringMessage(message);
    }   
  };  
  
  /* ---------------------------------------------------------------- */
  /*               Private functions and variables                    */ 
  /* ---------------------------------------------------------------- */
   
  /*
   * varaibles mapping of rule id of a registered rule to that rule
   */
  var private_rule_mapping = {};
    
  /*
   * registered rulesets, keyed by ruleset id
  */
  var private_rulesets = {};
      
  /*
   * NLS mapping
  */
  var private_nls = {};
  var REQUIRED_RULE_PROPERITES     = ['id', 'cacheDependency', 'validate'];
  var REQUIRED_RULESET_PROPERITES  = ['id', 'nameCode', 'requirements'];
  var REQUIRED_NLS_PROPERITES      = ['name', 'requirements', 'rules', 'severities'];    

  /* ---------------------------------------------------------------- */
  /*           Begin definition of OpenAjax.a11y object               */ 
  /* ---------------------------------------------------------------- */
       
  // basic info about version of ruleset and rules
  OpenAjax.a11y.name = "OpenAjax Alliance Accessibility Tools Task Force";
  OpenAjax.a11y.version = "2.0.0";
  OpenAjax.a11y.baseUri = "http://www.openajax.org/member/wiki/Accessibility";
    
  /**
  * OpenAjax.a11y.satisfiesInterface
  *
  * @desc tests whether or not the given object contains the specified   
  *
  * list of required properties
  * @param obj object to be tested
  * @param requiredProps list of required properties
  *
  * @return true if object contains required properties, false otherwise
  *
  * @private
  */
  OpenAjax.a11y.satisfiesInterface = function (obj, required_props) {
    
    var satisfied = true;
    
    for (var p = 0; satisfied && p < required_props.length; ++p) {
      satisfied = !!(obj[required_props[p]]);
    } // end loop
    return satisfied;
  };
    
  /**
  * add an array of rules. Each rule object in the array
  * must implement the rule object interface:
  *  
  * - id: a unique id for the rule
  * - validate: function(context) that is responsible for executing rule logic and that returns a ValidationResult object
  * 
  * 
  * @param rules array of rule objects to be added
  */
  OpenAjax.a11y.addRules = function (rules) {
    OpenAjax.a11y.console( "Adding rules...  ");
    if (!rules || !rules.length) {
      return;
    }
      
    var rules_num = rules.length;
     
    for (var i = 0; i < rules_num; ++i) {
      var rule = rules[i];
      if (OpenAjax.a11y.satisfiesInterface(rule, REQUIRED_RULE_PROPERITES) && 
          typeof private_rule_mapping[rule.id] == "undefined") {
          private_rule_mapping[rule.id] = rule;
      } // interface not satisfied
      else {
        alert('Note to developer - Rule: ' + rule.id + ' could not be added; duplicate ID -OR- missing required properties: ' + REQUIRED_RULE_PROPERITES.toString());
      }
    } // next rule
  };
        
  /**
  * get a rule by its specified rule id, which was registered
  * via addRules
  * 
  * @param ruleId id of desired rule
  * @return rule or null if no rule matches the given id
  */
  OpenAjax.a11y.getRule = function (rule_id) {
    if (!private_rule_mapping[rule_id]) return null;
    return private_rule_mapping[rule_id];
  };
  /**
  * add a ruleset. Each ruleset object
  * must implement the ruleset object interface=
  * 
  * - id: a unique id for the ruleset
  * - nameCode: a localizable key for a human-readable label or name for the ruleset
  * - rules: an associative array keyed by rule ids that defines additional properties 
  * for rules in the ruleset
  * 
  * @param ruleset to be added
  */
  OpenAjax.a11y.addRuleset = function (ruleset) {
    OpenAjax.a11y.console( "Adding ruleset: " + ruleset.id );
    if (ruleset && 
        OpenAjax.a11y.satisfiesInterface(ruleset, REQUIRED_RULESET_PROPERITES) && 
        typeof private_rulesets[ruleset.id] == "undefined") {
      private_rulesets[ruleset.id] = ruleset;
    } else {
      alert('Note to developer - Ruleset: ' + ruleset.id + ' could not be added; duplicate ID -OR- missing required properties: ' + REQUIRED_RULESET_PROPERITES.toString());
    } // endif
  };
    
  /**
  * get a ruleset by id
  * 
  * @param id of desired ruleset
  * @return ruleset with desired id or null
  */
  OpenAjax.a11y.getRuleset = function (rulesetId) {
    if (!private_rulesets[rulesetId]) null;
    
    return private_rulesets[rulesetId];
  };
    
  /**
  * get all registered rulesets as an associative array, keyed by ruleset id
  * 
  * @return id -> ruleset map
  * @see addRuleset
  */
  OpenAjax.a11y.getAllRulesets = function () {
    return private_rulesets;
  };
  /**
  * get number of rules in a rulset
  * 
  * @return number of rules
  * 
  */
  OpenAjax.a11y.getNumberOfRules = function (ruleset) {
    var count = 0;
    var rule_id;
        
    if ( ruleset ) {
      var requirements_num = ruleset.requirements.length;
      for (var i = 0; i < requirements_num; i++ ) {
        for (rule_id in ruleset.requirements[i].rules) {
          count++;
        } // end loop
      } // end loop
    }
    return count;
  };
    
    
  /**
  * add an NLS layer for the specified ruleset. NLS support for a ruleset must contain
  * at least the following properties:
  * 
  * - name: localized name for the ruleset
  * - severities: localized severity levels for the ruleset with defined severity 
  * levels being given by the OAA rules requirements wiki.
  * - requirements: an associative array for each requirement in the ruleset, 
  * keyed by the 'criterionNumber' property of each requirement object in the ruleset. Each entry must contain
  * the property 'label' (a label for the criterionNumber) and may contain the optional properties 'level' 
  * and 'description'.
  * - rules: associative array keyed by ruleIds for each rule in the ruleset and the
  * value of which is an object which must contain the 'message' property (the localized message for that rule) 
  * and optionally may contain a 'label' property (a human-readable label for identifying the rule).
  * 
  * For an example, see nls/wcag20-ruleset_en-us.js. 
  * 
  * @param rulesetId id of ruleset for which NLS is being defined
  * @param locale - locale for which NLS is being defined
  *
  */
  OpenAjax.a11y.addNLSForRuleset = function (rulesetId, locale, nls) {
    OpenAjax.a11y.console( "Adding NLS with id: " + rulesetId + "(" + locale + ")" );
    if (nls && 
        locale && 
        this.satisfiesInterface(nls, REQUIRED_NLS_PROPERITES) && 
        (typeof private_nls[rulesetId] == "undefined" || typeof private_nls[rulesetId][locale] == "undefined")) {          
      var ok = true;
      for (var key in nls.requirements) {
        if (!nls.requirements[key].label) {
          ok = false;
          OpenAjax.a11y.console( key + ": LABEL missing in NLS!" );
          break;
        }
      } // end loop
        
      if (ok) {
        private_nls[rulesetId] = nls[rulesetId] || {};
        private_nls[rulesetId][locale] = nls;
      }
    } 
  };
    
  /**
  * get the native language support for a given ruleset and locale
  * 
  * @param rulesetId - id of ruleset for which NLS is desired
  * @param locale - locale for which support is desired
  * @returns NLS for ruleset with the given id and locale or null if not found
  * @see addNLSForRuleset
  */
  OpenAjax.a11y.getNLSForRuleset = function (rulesetId, locale) {
    return private_nls[rulesetId] ? private_nls[rulesetId][locale] : null;
  };
        
  if (OpenAjax && OpenAjax.hub) {
    OpenAjax.hub.registerLibrary(this.name, this.baseUri, this.version);
  }
    
})();
/**
*
* OpenAjax.a11y.RulesetEvaluation
*
* @desc Constructor function for a ruleset evaluation 
* 
* @param ruleset_id              String    ruleset id to be used in evaluation
* @param language                String    language used to evaluate the document (note: some rules are language dependent)    
* @param url                     String    url of document being analyzed    
* @param title                   String    title of document being analyzed    
* @param doc                     Object    w3c document object to be evaluated    
* @param progessCallBackFunction Function  Call periodically to provie evaluation progress information 
*
*/
OpenAjax.a11y.RulesetEvaluation = function (ruleset_id, language, url, title, doc, callback) {
 
  this.ruleset_id = ruleset_id;
  this.language   = language;
  this.doc = doc;
  this.title = title;
  this.url = url;
  
  var ruleset_nls = OpenAjax.a11y.getNLSForRuleset(ruleset_id, language);      
  this.ruleset_nls = ruleset_nls;      
  
  var ruleset = OpenAjax.a11y.getRuleset(ruleset_id);
  this.ruleset = ruleset;  
  
  var number_of_rules_in_ruleset = OpenAjax.a11y.getNumberOfRules(ruleset);
  this.number_of_rules_in_ruleset = number_of_rules_in_ruleset;
  
  var log = new OpenAjax.a11y.Log(ruleset_id, ruleset_nls['name'], number_of_rules_in_ruleset, callback);
  this.log = log;
   
  var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, language, log);      
  this.dom_cache = dom_cache;
  
  this.ruleset_result = new OpenAjax.a11y.results.RulesetEvaluationResult(ruleset_id, ruleset_nls['name'], ruleset.rulesetUrl, url, title); 
};
 
 
/**
*
* OpenAjax.a11y.RulesetEvaluation
*
* @desc Evaluate a document using the openajax ruleset and return an evaluation object 
*
* @param build_cache Boolean  When true will build all cache in one tranversal of the DOMElements cache
*                             When false specialized caches will be built when they are need by a rule
*
*/
OpenAjax.a11y.RulesetEvaluation.prototype.evaluate = function (build_cache) {
      
  var i;
  var rule_id;  
  var PROGRESS = OpenAjax.a11y.PROGRESS;
  
  this.dom_cache.updateDOMElementCache();
  if (build_cache) { 
     this.dom_cache.updateAllCaches();
  }  
  
  var requirements_length = this.ruleset.requirements.length;
  for (i=0; i<requirements_length; i++) {
   
    var req = this.ruleset.requirements[i];
     
    var req_num      = req.requirementNumber;
    var req_level_id = req.requirementLevel;
    var req_url      = req.requirementURL;
    var req_enabled  = req.enabled;
    
    var req_label   = this.ruleset_nls.requirements[req_num].label;
    var req_desc    = this.ruleset_nls.requirements[req_num].description;
    var req_level   = this.ruleset_nls.levels[req_level_id];
    
    var requirement_result = new OpenAjax.a11y.results.RequirementResult(req_num, req_label, req_desc, req_level, req_url, req_enabled);
    
    this.log.update(PROGRESS.REQUIREMENT, req_label, req_num);
    for (rule_id in req.rules) {       
      var rule = OpenAjax.a11y.getRule(rule_id);      
      if (rule) {
        if (rule.enabled && req_enabled) {
          var rule_severity = req.rules[rule_id].severityCode;        
          var rule_priority = req.rules[rule_id].priorityCode;
          var rule_enabled  = req.rules[rule_id].enabled;
          var rule_status   = req.rules[rule_id].status;
          
          var rule_title    = this.ruleset_nls.rules[rule_id].TITLE;
        
          var rule_result = new OpenAjax.a11y.results.RuleResult(rule_id, rule_title, rule_severity, rule_priority, rule_enabled); 
          if (!build_cache ) {
            var utd = this.dom_cache.isUpToDate(rule.cacheDependency);
            if (utd.exists) {
              if(!utd.up_to_date) this.dom_cache.updateCache(rule.cacheDependency);
            } else {
              this.log.update(PROGRESS.RULE, "Cache " + rulecacheDepedency + " for rule with id=" + rule_id +  " does not exist.");        
            }
          }   
          if (rule.language.length) {
            if (rule.language.indexOf(this.language) >= 0) {
              rule.validate( this.dom_cache, rule_result );
            }            
          }
          else {
            // If empty rule is for all languages
            rule.validate( this.dom_cache, rule_result );
          }  
                
          requirement_result.addRuleResult( rule_result );
        
          this.log.update(PROGRESS.RULE, rule_title, rule_id);
        }
        else {
          this.log.update(PROGRESS.RULE, "Rule with id=" + rule_id + " is disabled");        
        }
      }
      else {
        this.log.update(PROGRESS.RULE, "Rule with id=" + rule_id + " does not exist");        
      }
    } // end loop
    
    this.ruleset_result.addRequirementResult(requirement_result);
  } // end loop
  this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
  return this;
};
/**
 * Copyright 2011 OpenAjax Alliance
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance WCAG 2.0 Ruleset National Language Support (NLS): English */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.addNLSForRuleset('WCAG_2_0', 'en-us', {
    name: 'WCAG 2.0',
    description: 'Web Content Accessibility Guidelines v2.0',
    version: 'beta',
    date: '2011-05-13',

    /**
     * Level of important of a requirement
     */
    levels: {
        'LEVEL_A': 'A', // Most important requirements
        'LEVEL_AA': 'AA', // Important requirements
        'LEVEL_AAA': 'AAA' // Lower importance requirements
    },

    /**
     * Severity of not passing a rule for a particular requirement set, like WCAG 2.0
     */
    severities: ['not applicable',
                 'Pass',
                 'Violation',  // Content is hidden and not tested for accessibility
                 'Recommendation',
                 'Manual Evaluation',
                 'Warning',
                 'Hidden',
                 'Informational',
                 'Not Evaluated'
    ],  


    /**
     * Relative implementation priorities of complying to rule requirements
     */
    priorities:[ 'First Priority', 'Second Priority', 'Third Priority'],

    /**
     * Status of a rule for evaluating a requirement
     */
    status: ['Proposed', 'Accepted', 'Deprecated'],

    /**
     * Types of rule references to a requirement
     */
    references: ['Requirement', 'Coding Technique', 'Manual Evaluation', 'Best Practice', 'Authoring Technique', 'Other'],

    /**
     * Abbreviation for the types of rule references to a requirement
     */
    reference_abbreviations: ['R', 'C', 'ME', 'BP', 'A', 'O'],

    /**
     * Abbreviation for the types of rule references to a requirement
     */
    reference_media_contants: ['Undefined', 'No', 'Maybe', 'Yes'],

    /**
     *   WCAG 2.0 Success Criteria (i.e. requirements) National Language Support (NLS)
     */
    requirements: {
        //
        // Requirement 1.1.1 Non-text Content
        //
        '1.1.1': {
            label: '1.1.1 Non-text Content',
            description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
            url: 'http://www.w3.org/TR/WCAG20/#text-equiv',
            references:[ {
                type: OpenAjax.a11y.REFERENCES.BEST_PRACTICE, 
                title: 'Test 3', 
                url: 'http://test3.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.MANUAL_EVALUATION, 
                title: 'Test 4', 
                url: 'http://test4.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'Test 5', 
                url: 'http://test5.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                title: 'Test 1', 
                url: 'http://test1.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.AUTHORING_TECHNIQUE, 
                title: 'Test 1', 
                url: 'http://test1.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.CODING_TECHNIQUE, 
                title: 'Test 2', 
                url: 'http://test2.org'
            }]
        },
        //
        // Requirement 1.2.1 Audio-only and Video-only (Prerecorded)
        //
        '1.2.1': {
            label: '1.2.1 Audio-only and Video-only (Prerecorded)',
            description: 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
            references: []
        },
        //
        // Requirement 1.2.2 Captions (Prerecorded)
        //
        '1.2.2': {
            label: '1.2.2 Captions (Prerecorded)',
            description: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
            references: []
        },
        //
        // Requirement 1.2.3 Audio Description or Media Alternative (Prerecorded)
        //
        '1.2.3': {
            label: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
            description: 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
            references: []
        },
        //
        // Requirement 1.2.4 Captions (Live)
        //
        '1.2.4': {
            label: '1.2.4 Captions (Live)',
            description: 'Captions are provided for all live audio content in synchronized media. ',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
            references: []
        },
        //
        // Requirement 1.2.5 Audio Description (Prerecorded)
        //
        '1.2.5': {
            label: '1.2.5 Audio Description (Prerecorded)',
            description: 'Audio description is provided for all prerecorded video content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
            references: []
        },
        //
        // Requirement 1.2.6 Sign Language (Prerecorded)
        //
        '1.2.6': {
            label: '1.2.6 Sign Language (Prerecorded)',
            description: 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
            references: []
        },
        //
        // Requirement 1.2.7 Extended Audio Description (Prerecorded)
        //
        '1.2.7': {
            label: '1.2.7 Extended Audio Description (Prerecorded)',
            description: 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
            references: []
        },
        //
        // Requirement 1.2.8 Media Alternative (Prerecorded)
        //
        '1.2.8': {
            label: '1.2.8 Media Alternative (Prerecorded)',
            description: 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
            references: []
        },
        //
        // Requirement 1.2.9 Audio-only (Live)
        //
        '1.2.9': {
            label: '1.2.9 Audio-only (Live)',
            description: 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
            references: []
        },
        //
        // Requirement 1.3.1 Info and Relationships
        //
        '1.3.1': {
            label: '1.3.1 Info and Relationships',
            description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
            references: []
        },
        //
        // Requirement 1.3.2 Meaningful Sequence
        //
        '1.3.2': {
            label: '1.3.2 Meaningful Sequence',
            description: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
            references: []
        },
        //
        // Requirement 1.3.3 Sensory Characteristics
        //
        '1.3.3': {
            label: '1.3.3 Sensory Characteristics',
            description: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
            references: []
        },
        //
        // Requirement 1.4.1 Use of Color
        //
        '1.4.1': {
            label: '1.4.1 Use of Color',
            description: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
            references: []
        },
        //
        // Requirement 1.4.2 Audio Control
        //
        '1.4.2': {
            label: '1.4.2 Audio Control',
            description: 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
            references: []
        },
        //
        // Requirement 1.4.3 Contrast (Minimum)
        //
        '1.4.3': {
            label: '1.4.3 Contrast (Minimum)',
            description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
            references: []
        },
        //
        // Requirement 1.4.4 Resize text
        //
        '1.4.4': {
            label: '1.4.4 Resize text',
            description: 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
            references: []
        },
        //
        // Requirement 1.4.5 Images of Text
        //
        '1.4.5': {
            label: '1.4.5 Images of Text',
            description: 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
            references: []
        },
        //
        // Requirement 1.4.6 Contrast (Enhanced)
        //
        '1.4.6': {
            label: '1.4.6 Contrast (Enhanced)',
            description: 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
            references: []
        },
        //
        // Requirement 1.4.7 Low or No Background Audio
        //
        '1.4.7': {
            label: '1.4.7 Low or No Background Audio',
            description: 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
            url: 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
            references: []
        },
        //
        // Requirement 1.4.8 Visual Presentation
        //
        '1.4.8': {
            label: '1.4.8 Visual Presentation',
            description: 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
            references: []
        },
        //
        // Requirement 1.4.9 Images of Text (No Exception)
        //
        '1.4.9': {
            label: '1.4.9 Images of Text (No Exception)',
            description: 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
            references: []
        },
        //
        // Requirement 2.1.1 Keyboard
        //
        '2.1.1': {
            label: '2.1.1 Keyboard',
            description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
            references: []
        },
        //
        // Requirement 2.1.2 No Keyboard Trap
        //
        '2.1.2': {
            label: '2.1.2 No Keyboard Trap',
            description: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
            references: []
        },
        //
        // Requirement 2.1.3 Keyboard (No Exception)
        //
        '2.1.3': {
            label: '2.1.3 Keyboard (No Exception)',
            description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
            references: []
        },
        //
        // Requirement 2.2.1 Timing Adjustable
        //
        '2.2.1': {
            label: '2.2.1 Timing Adjustable',
            description: 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
            references: []
        },
        //
        // Requirement 2.2.2 Pause, Stop, Hide
        //
        '2.2.2': {
            label: '2.2.2 Pause, Stop, Hide',
            description: 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
            references: []
        },
        //
        // Requirement 2.2.3 No Timing
        //
        '2.2.3': {
            label: '2.2.3 No Timing',
            description: 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
            references: []
        },
        //
        // Requirement 2.2.4 Interruptions
        //
        '2.2.4': {
            label: '2.2.4 Interruptions',
            description: 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
            references: []
        },
        //
        // Requirement 2.2.5 Re-authenticating
        //
        '2.2.5': {
            label: '2.2.5 Re-authenticating',
            description: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
            references: []
        },
        //
        // Requirement 2.3.1 Three Flashes or Below Threshold
        //
        '2.3.1': {
            label: '2.3.1 Three Flashes or Below Threshold',
            description: 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
            references: []
        },
        //
        // Requirement 2.3.2 Three Flashes
        //
        '2.3.2': {
            label: '2.3.2 Three Flashes',
            description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
            references: []
        },
        //
        // Requirement 2.4.1 Bypass Blocks
        //
        '2.4.1': {
            label: '2.4.1 Bypass Blocks',
            description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
            references: []
        },
        //
        // Requirement 2.4.2 Page Titled
        //
        '2.4.2': {
            label: '2.4.2 Page Titled',
            description: 'Web pages have titles that describe topic or purpose.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
            references: []
        },
        //
        // Requirement 2.4.3 Focus Order
        //
        '2.4.3': {
            label: '2.4.3 Focus Order',
            description: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
            references: []
        },
        //
        // Requirement 2.4.4 Link Purpose (In Context)
        //
        '2.4.4': {
            label: '2.4.4 Link Purpose (In Context)',
            description: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
            references: []
        },
        //
        // Requirement 2.4.5 Multiple Ways
        //
        '2.4.5': {
            label: '2.4.5 Multiple Ways',
            description: 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
            references: []
        },
        //
        // Requirement 2.4.6 Headings and Labels
        //
        '2.4.6': {
            label: '2.4.6 Headings and Labels',
            description: 'Headings and labels describe topic or purpose.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
            references: []
        },
        //
        // Requirement 2.4.7 Focus Visible
        //
        '2.4.7': {
            label: '2.4.7 Focus Visible',
            description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
            url: 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
            references: []
        },
        //
        // Requirement 2.4.8 Location
        //
        '2.4.8': {
            label: '2.4.8 Location',
            description: 'Information about the user\'s location within a set of Web pages is available.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
            references: []
        },
        //
        // Requirement 2.4.9 Link Purpose (Link Only)
        //
        '2.4.9': {
            label: '2.4.9 Link Purpose (Link Only)',
            description: 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
            references: []
        },
        //
        // Requirement 2.4.10 Section Headings
        //
        '2.4.10': {
            label: '2.4.10 Section Headings',
            description: 'Section headings are used to organize the content.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
            references: []
        },
        //
        // Requirement 3.1.1 Language of Page
        //
        '3.1.1': {
            label: '3.1.1 Language of Page',
            description: 'The default human language  of each Web page  can be programmatically determined. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
            references:[]
        },
        //
        // Requirement 3.1.2 Language of Parts
        //
        '3.1.2': {
            label: '3.1.2 Language of Parts',
            description: 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
            references:[]
        },
        //
        // Requirement 3.1.3 Unusual Words
        //
        '3.1.3': {
            label: '3.1.3 Unusual Words',
            description: 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
            references:[]
        },
        //
        // Requirement 3.1.4 Abbreviations
        //
        '3.1.4': {
            label: '3.1.4 Abbreviations',
            description: 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
            references:[]
        },
        //
        // Requirement 3.1.5 Reading Level
        //
        '3.1.5': {
            label: '3.1.5 Reading Level',
            description: 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
            references:[]
        },
        //
        // Requirement 3.1.6 Pronunciation
        //
        '3.1.6': {
            label: '3.1.6 Pronunciation',
            description: 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
            references:[]
        },
        //
        // Requirement 3.2.1 On Focus
        //
        '3.2.1': {
            label: '3.2.1 On Focus',
            description: 'When any component receives focus, it does not initiate a change of context.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
            references:[]
        },
        //
        // Requirement 3.2.2 On Input
        //
        '3.2.2': {
            label: '3.2.2 On Input',
            description: 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
            references:[]
        },
        //
        // Requirement 3.2.3 Consistent Navigation
        //
        '3.2.3': {
            label: '3.2.3 Consistent Navigation',
            description: 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
            references:[]
        },
        //
        // Requirement 3.2.4 Consistent Identification
        //
        '3.2.4': {
            label: '3.2.4 Consistent Identification',
            description: 'Components that have the same functionality within a set of Web pages are identified consistently.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
            references:[]
        },
        //
        // Requirement 3.2.5 Change on Request
        //
        '3.2.5': {
            label: '3.2.5 Change on Request',
            description: 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
            references:[]
        },
        //
        // Requirement 3.3.1 Error Identification
        //
        '3.3.1': {
            label: '3.3.1 Error Identification',
            description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
            references:[]
        },
        //
        // Requirement 3.3.2 Labels or Instructions
        //
        '3.3.2': {
            label: '3.3.2 Labels or Instructions',
            description: 'Labels or instructions are provided when content requires user input.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
            references:[]
        },
        //
        // Requirement 3.3.3 Error Suggestion
        //
        '3.3.3': {
            label: '3.3.3 Error Suggestion',
            description: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
            references:[]
        },
        //
        // Requirement 3.3.4 Error Prevention (Legal, Financial, Data)
        //
        '3.3.4': {
            label: '3.3.4 Error Prevention (Legal, Financial, Data)',
            description: 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
            references:[]
        },
        //
        // Requirement 3.3.5 Help
        //
        '3.3.5': {
            label: '3.3.5 Help',
            description: 'Context-sensitive help is available.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
            references:[]
        },
        //
        // Requirement 3.3.6 Error Prevention (All)
        //
        '3.3.6': {
            label: '3.3.6 Error Prevention (All)',
            description: 'For Web pages that require the user to submit information, at least one of the following is true',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
            references:[]
        },
        //
        // Requirement 4.1.1 Parsing Content
        //
        '4.1.1': {
            label: '4.1.1 Parsing Content',
            description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
            references:[]
        },
        //
        // Requirement 4.1.2 Name, Role, Value
        //
        '4.1.2': {
            label: '4.1.2 Name, Role, Value',
            description: 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
            references:[]
        }
    },
    // end requirements


    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules: {
        COLOR_1: {
            MESSAGE_PASS:        'Color 1: The CCR of %1 exceeds the 4.5 for plain text and 3.1 for large text and/or bolded text.',
            MESSAGE_FAIL:        'Color 1: The CCR of %1 does not exceed CCR of 4.5 for plain text or 3.1 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'Color 1: The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'Color 1: The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'Color 1: The element is not displayed visually.',
            TITLE:               'Color 1: Text content exceed CCR of 4.5 for any size text or 3.1 for large and/or bolded text'
        },
        COLOR_2: {
            MESSAGE_PASS:        'Color 2: The CCR of %1 exceeds the 7.0 for plain text and 4.5 for large text and/or bolded text.',
            MESSAGE_FAIL:        'Color 2: The CCR of %1 does not exceed CCR of 7.0 for plain text or 4.5 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'Color 2: The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'Color 2: The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'Color 2: The element is not displayed visually.',
            TITLE:               'Color 2: Text content exceed CCR of 7.0 for any size text or 4.5 for large and/or bolded text'
        },
        CONTROL_1: {
            MESSAGE_PASS:          'CONTROL 1: %1 control has label.',
            MESSAGE_LABEL_MISSING: 'CONTROL 1: %1 control is missing a label.',
            MESSAGE_HIDDEN:        'CONTROL 1: %1 is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                 'CONTROL 1: textarea, select and input elements of type text, password, checkbox, radio and file must have an accessible label'
        },
        CONTROL_2: {
            MESSAGE_PASS:          'CONTROL 2: Image button control has label.',
            MESSAGE_ALT_MISSING:   'CONTROL 2: Image button control is missing alt text.',
            MESSAGE_HIDDEN:        'CONTROL 2: Image button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                 'CONTROL 2: Every input type image must have an alt or title attribute with content'
        },
        CONTROL_3: {
            MESSAGE_HAS_LEGEND:          'CONTROL 3: Radio button uses FIELDSET/LEGEND elements for group labeling',
            MESSAGE_HAS_ARIA_LABELLEDBY: 'CONTROL 3: Radio button uses ARIA-LABELLEDBY for group labeling',
            MESSAGE_HAS_ARIA_LABEL:      'CONTROL 3: Radio button uses ARIA-LABEL for group labeling',
            MESSAGE_LEGEND_MISSING:      'CONTROL 3: Radio button is NOT contained in a FIELDSET/LEGEND elements or using ARIA labeling techniques to include group label',
            MESSAGE_HIDDEN:              'CONTROL 3: Radio button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                       'CONTROL 3: Groups of radio buttons should be contained in fieldset/legend or aria labeling'
        },
        CONTROL_4: {
            MESSAGE_HAS_CONTENT: 'CONTROL 4: Button has text content',
            MESSAGE_NO_CONTENT:  'CONTROL 4: Button has does NOT have text content',
            MESSAGE_HIDDEN:      'CONTROL 4: Button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:               'CONTROL 4: Button elements must have text content and input type button must have a value attribute with content'
        },
        CONTROL_5: {
            MESSAGE_UNIQUE_ID:    'CONTROL 5: The id \'%1\' is unique on the page',
            MESSAGE_DUPLICATE_ID: 'CONTROL 5: The id \'%1\' is NOT unique on the page',
            TITLE:                'CONTROL 5: Textarea, select, input and button elements with id attributes, must have unique id values on the page'
        },
        CONTROL_6: {
            MESSAGE_NO_CONTROL: 'CONTROL 6: Label reference points to a %1 element, not a form control',
            MESSAGE_NO_ELEMENT: 'CONTROL 6: Label does NOT reference any element on the page',
            TITLE:              'CONTROL 6: Label with a for attribute reference does not reference a form control'
        },
        CONTROL_7: {
            MESSAGE_NO_CONTENT:  'CONTROL 7: LABEL element does NOT have any content',
            MESSAGE_HAS_CONTENT: 'CONTROL 7: LABEL element has content',
            TITLE:               'CONTROL 7: LABEL element or legend element should contain content'
        },
        CONTROL_8: {
            MESSAGE_NO_LEGEND:     'CONTROL 8: No LEGEND element found for FIELDSET element',
            MESSAGE_MORE_THAN_ONE: 'CONTROL 8: More than one LEGEND element found for FIELDSET element',
            MESSAGE_JUST_ONE:      'CONTROL 8: FIELDSET element has just one LEGEND element',
            TITLE:                 'CONTROL 8: Fieldset should contain exactly one legend element'
        },
        CONTROL_9: {
            MESSAGE_USES_TITLE:          'CONTROL 9: Avoid using TITLE attribute to label form controls',
            MESSAGE_DOES_NOT_USE_TITLE : 'CONTROL 9: Does not use TITLE attribute to label form controls',
            TITLE:                       'CONTROL 9: Avoid using the TITLE attribute to label form control'
        },
        CONTROL_10: {
            MESSAGE_DUPLICATE_LABEL: 'CONTROL 10: The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'CONTROL 10: The label \'%1\' is unique on the page',
            MESSAGE_HIDDEN:          'CONTROL 10: Form control is hidden from assistive technology, so not tested',
            TITLE:                   'CONTROL 10: Accessible labels must be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page'
        },
        CONTROL_11: {
            MESSAGE_DUPLICATE_LABEL: 'CONTROL 11: The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'CONTROL 11: The label is unique on the page',
            MESSAGE_HIDDEN:          'CONTROL 11: Form control is hidden from assistive technology, so they will not see it',
            TITLE:                   'CONTROL 11: If there is more than one form on page, input element of type submit and reset must have unique labels using the value attribute'
        },
        HEADING_1: {
            MESSAGE_HAS_H1:        'HEADING 1: H1 element is on page and has content',
            MESSAGE_H1_NO_CONTENT: 'HEADING 1: H1 element does not have text content',
            MESSAGE_H1_MISSING:    'HEADING 1: Page does not have an H1 element',
            MESSAGE_H1_HIDDEN:     'HEADING 1: H1 is hidden from assistive technology, so they will not see it',
            TITLE:                 'HEADING 1: Each page should contain at least one H1 element and each H1 element must have content'
        },
        HEADING_2: {
            MESSAGE_UNIQUE:     'HEADING 2: Heading is unique',
            MESSAGE_NOT_UNIQUE: 'HEADING 2: Heading is not unique',
            TITLE:              'HEADING 2: The text content of headings of the same level that share the same parent heading or landmark role should be unique'
        },
        HEADING_3: {
            MESSAGE_CHECK:      'HEADING 3: Check to make sure the heading accurately describes the section of the document',
            MESSAGE_HIDDEN:     'HEADING 3: Heading is hidden from assistive technology, so they will not see it',
            TITLE:              'HEADING 3: Heading content should describe the section or sub section'
        },
        HEADING_4: {
            MESSAGE_PROPER_NESTING:   'HEADING 4: Heading is properly nested',
            MESSAGE_IMPROPER_NESTING: 'HEADING 4: Heading is not properly nested',
            MESSAGE_HIDDEN:           'HEADING 4: Content is hidden from assistive technology, so they will not see it',
            TITLE:                    'HEADING 4: Headings within landmarks must be properly nested, if there are no MAIN landmarks the headings after the last H1 must be properly nested'
        },
        HEADING_5: {
            MESSAGE_HIDDEN:     'HEADING 5: Content is hidden from assistive technology, so they will not see it',
            TITLE:              'HEADING 5: The text content of a heading should not only come from the alt attribute value of img elements.'
        },
        HEADING_6: {
            MESSAGE_HAS_TEXT:   'HEADING 6: Heading has text content',
            MESSAGE_ONLY_IMAGE: 'HEADING 6: Heading content should NOT come only from images',
            TITLE:              'HEADING 6: Heading element content should not only come alt text of images'
        },
        HEADING_7: {
            MESSAGE_EMPTY:  'HEADING 7: Heading has no text content',
            TITLE:          'HEADING 7: Headings must have text content'
        },
        HEADING_8_EN: {
            MESSAGE_TO_LONG: 'HEADING 8 (English): Heading is %1 characters in length, in general heading should be less %2 characters in length',
            TITLE:           'HEADING 8 (English): Headings should be concise and therefore typically not contain more than 100 characters (English Only)'
        },
        IMAGE_1: {
            MESSAGE_PASS:         'IMAGE 1: Image has alt attribute.',
            MESSAGE_ALT_MISSING:  'IMAGE 1: Alt attribute is missing.',
            MESSAGE_PRESENTATION: 'IMAGE 1: Image has the role=presentation, this indicates the image is purely stylistic or redundent with text content.',
            MESSAGE_HIDDEN:       'IMAGE 1: Image is hidden from users of assistive technologies.',
            TITLE:                'IMAGE 1: Images must have an alt attribute'
        },
        IMAGE_2: {
            MESSAGE_PASS:         'IMAGE 2: Image longdesc %1 is a valid URI.',
            MESSAGE_FAIL:         'IMAGE 2: Longdesc %1 is a broken link.',
            MESSAGE_PRESENTATION: 'IMAGE 2: Image has the role=presentation, so the assistive technology user will not have access to longdesc reference.',
            MESSAGE_HIDDEN:       'IMAGE 2: Image is hidden from users of assistive technologies, so they will not have access to the longdesc reference.',
            MESSAGE_NOT_TESTED:   'IMAGE 2: The testing of URLs is disabled, you must manually test the longdesc url: %1.',
            MESSAGE_ERROR:        'IMAGE 2: The testing of URLs resulted in an error, you must manually test the longdesc url: %1.',
            MESSAGE_NA:           'IMAGE 2: Image does not have a longdesc attribute.',
            TITLE:                'IMAGE 2: If the longdesc attribute is defined, it must have valid URI'
        },
        IMAGE_3: {
            MESSAGE_NA:           'IMAGE 3: Image does not use the file name as the alt text description',
            MESSAGE_FAIL:         'IMAGE 3: The file name %1 is being used as the alt text, the alt text should describe the purpose or content of informative images, or be empty if the image is decorative',
            MESSAGE_HIDDEN:       'IMAGE 3: Image is hidden from users of assistive technologies',
            MESSAGE_NO_FILE_NAME: 'IMAGE 3: Image alt text does not contain file name',
            MESSAGE_NO_ALT:       'IMAGE 3: Image does not have ALT text',
            TITLE:                'IMAGE 3: The file name of the image should not be part of the alt text content (it must have an image file extension)'
        },
        IMAGE_4_EN: {
            MESSAGE_PASS:         'IMAGE 4(English): Image alt text length of %1 is shorter than %2 characters.',
            MESSAGE_ALT_TO_LONG:  'IMAGE 4(English): Alt text length of %1 is longer than the recommended length of %2, if an image needs a longer description use longdesc attribute or other technique.',
            MESSAGE_NA :          'IMAGE 4(English): Image is hidden or alt attribute is missing or empty.',
            TITLE:                'IMAGE 4(English): ALT text quality can often be tested based on the length in characters for English'
        },
        IMAGE_4_FR: {
            MESSAGE_PASS:         'IMAGE 4(french): Image alt text length of %1 is shorter than %2 characters.',
            MESSAGE_ALT_TO_LONG:  'IMAGE 4(french): Alt text length of %1 is longer than the recommended length of %2, if an image needs a longer description use longdesc attribute or other technique.',
            MESSAGE_NA:           'IMAGE 4(french): Image is hidden or alt attribute is missing or empty.',
            TITLE:                'IMAGE 4(french): ALT text quality can often be tested based on the length in characters for English'
        },
        IMAGE_5: {
            MESSAGE_NA:            'IMAGE 5: Image is missing an alt attribute, is hidden or has its role set to presentation.',
            MESSAGE_ALT_NOT_EMPTY: 'IMAGE 5: Images that are only 1 pixel high or wide must set it\'s alt text to empty.',
            MESSAGE_PASS:          'IMAGE 5: Image is more than 1 pixel high or wide, hidden, or already has its alt text set to empty.',
            TITLE:                 'IMAGE 5: If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position'
        },
        IMAGE_6: {
            MESSAGE_HIDDEN:       'IMAGE 6: Image is hidden from users of assistive technologies.',
            MESSAGE_NA:           'IMAGE 6: Image has non-empty alt text content ',
            MESSAGE_VERIFY:       'IMAGE 6: Since the image alt text is empty or role set to presentation, verify the image is purely decotrative',
            TITLE:                'IMAGE 6: If the alt is empty or role is set presentation verify the image is purely decorative'
        },
        LANDMARK_1: {
            MESSAGE_PASS: 'LANDMARK 1: ',
            MESSAGE_FAIL: 'LANDMARK 1: ',
            MESSAGE_NA:   'LANDMARK 1: ',
            TITLE:        'LANDMARK 1: All visible content must be contained within a landmark'
        },
        LINK_1: {
            MESSAGE_PASS: 'Link 1: The link dimensions of %1 pixels high and %2 pixels wide are larger than the minimum height of %3 pixels and width of %4 pixels.',
            MESSAGE_TO_SMALL: 'Link 1: The link dimensions of %1 pixels high and %2 pixels wide do meet the minimum height of %3 pixels and width of %4 pixels requirements.',
            MESSAGE_MANUAL: 'Link 1: The link dimensions could not be calculated.',
            MESSAGE_HIDDEN: 'Link 1: The link is hidden from the graphical rendering.',
            MESSAGE_NA: 'Link 1: The link has no HREF content, so it is either an internal target or may have behaviors defined by javascript.',
            TITLE: 'Link 1: Link should provide minimum target dimensions.'
        },
        LINK_2: {
            MESSAGE_PASS: 'Link 2: %1 links with same URL and use the same link text.',
            MESSAGE_FAIL: 'Link 2: %1 links with the same URL do not have the same link text.',
            MESSAGE_MANUAL: 'Link 2: It could not be determined if the HREF of this link is shared by other links on the page',
            MESSAGE_NA: 'Link 2: This link does not share the same URL with any other links on the page.',
            TITLE: 'Link 2: Links with the same HREF should have the same link text.'
        },

        LINK_3: {
            MESSAGE_PASS: 'Link 3: %1 links with the same accessible link name have the same HREF.',
            MESSAGE_FAIL: 'Link 3: %1 links with the same accessible link name have different HREFs.',
            MESSAGE_MANUAL: 'Link 3: It could not be determined if the accessible link name is shared with any other links on the page.',
            MESSAGE_NA: 'Link 3: This link does not share the same accessible link name with any other links on the page or the link role has been overridden.',
            TITLE: 'Link 3: Links with different HREFs should have unique accessible names.'
        },
        LIST_1: {
            MESSAGE_HAS_ROLE_NAV: 'LIST 1: The parent element of this %1 has role=navigation.',
            MESSAGE_MISSING_ROLE_NAV: 'LIST 1: The parent element of this %1 does not have role=navigation.',
            MESSAGE_ROLE_NAV_ON_LIST: 'LIST 1: This %1 element should not have role=navigation; it should be placed on its parent element instead.',
            TITLE: 'LIST 1: A list of navigational links should be contained within an element with role=navigation.'
        },
        MEDIA_1: {
            MESSAGE_PASS:   'MEDIA 1: Text based alternative is available for pre-recorded audio',
            MESSAGE_MAYBE:  'MEDIA 1: If %1 element is prerecorded audio, verify that a text based alternative to the audio is available',
            MESSAGE_FAIL:   'MEDIA 1: Text based alternative is NOT available for pre-recorded audio',
            MESSAGE_HIDDEN: 'MEDIA 1: %1 element is hidden from the visual rendering',
            TITLE: 'MEDIA 1: Pre-recorded audio must have text based alternatives'
        },
        MEDIA_2: {
            MESSAGE_PASS_TEXT:  'MEDIA 2: Text based alternative is available for pre-recorded video',
            MESSAGE_PASS_AUDIO: 'MEDIA 2: Audio description is available for pre-recorded video',
            MESSAGE_PASS_BOTH:  'MEDIA 2: Both an audio description and text based description is available for pre-recorded video',
            MESSAGE_MAYBE:      'MEDIA 2: If %1 element is prerecorded video, verify that a text based alternative or audio description is available for the video',
            MESSAGE_FAIL:       'MEDIA 2: Text based alternative or audio description is NOT available for pre-recorded video',
            MESSAGE_HIDDEN:     'MEDIA 2: %1 element is hidden from the visual rendering',
            TITLE: 'MEDIA 2: Pre-recorded video must have either text based alternative or audio description'
        },
        TABLE_1: {
            MESSAGE_PASS:            'TABLE 1: The first row contains %1 headers, verify the headers accurately describe the content of the column.',
            MESSAGE_NOT_ALL_HEADERS: 'TABLE 1: Only %1 out of %2 table cells in the first row are headers.',
            MESSAGE_HIDDEN:          'TABLE 1: The table is hidden from people using assistive technologies.',
            TITLE:                   'TABLE 1: If a table is a data table, each table cell in the first row should be either a TH element or TD element with scope=col'
        },
        TABLE_2: {
            MESSAGE_PASS:            'TABLE 2: Data table has the caption "%1", verify the caption accurately describes the purpose of the table.',
            MESSAGE_CAPTION_MISSING: 'TABLE 2: Data table is missing a caption element or the caption is empty, the caption is important for describing the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 2: Table is not a data table, and therefore should not have a caption.',
            MESSAGE_HIDDEN:          'TABLE 2: Table is hidden from users of assistive technologies, so they will not not know the table is present.',
            TITLE:                   'TABLE 2: If a table is a data table, it must have a caption element and it must have content (at least one printable character)'
        },
        TABLE_3: {
            MESSAGE_PASS:            'TABLE 3: Data table has the summary of "%1", verify the summary accurately describes the purpose or summarizes the content of the table.',
            MESSAGE_SUMMARY_MISSING: 'TABLE 3: Data table is missing a sumary attribute or the summary is empty, the summary is important for describing the purpose and/or the content of the table.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 3: Table is not a data table, and therefore should not have a summary.',
            MESSAGE_HIDDEN:          'TABLE 3: Table is not a data table or hidden, and therefore should not have a summary.',
            TITLE:                   'TABLE 3: If a table is a data table, it should use summary attribute to describe the content or purpose of tabular data.'
        },
        TABLE_4: {
            MESSAGE_UNIQUE:         'TABLE 4: summary content of the Data table is unique from the caption content.',
            MESSAGE_NOT_UNIQUE:     'TABLE 4: summary content of the Data table must be unique from the caption content.',
            MESSAGE_HIDDEN:         'TABLE 4: The table is hidden from people using assistive technologies.',
            TITLE:          'TABLE 4: If a table has both a caption element/aria-labelledby attribute and a summary/aria-describedby attribute, the summary content must be unique from the caption content'
        },
        TABLE_5: {
            MESSAGE_PASS:   'TABLE 5: Table is a data table with the first row/column has atleast one TH element',
            MESSAGE_FAIL:   'TABLE 5: The first row/column must have atleast one TH element',
            MESSAGE_HIDDEN: 'TABLE 5: The table is hidden from people using assistive technologies.',
            TITLE:          'TABLE 5: If a table is a data table, at least the first row should be TH elements'
        },
        TABLE_6: {
            MESSAGE_PASS:           'TABLE 6: Table header element has unique ID',
            MESSAGE_NO_CONTENT:     'TABLE 6: Table header does not contain content',
            MESSAGE_ID_NOT_UNIQUE:  'TABLE 6: Table header element has duplicate ID: \'%1\'',
            MESSAGE_ID_NOT_DEFINED: 'TABLE 6: Table header element is missing an ID attribute',
            MESSAGE_HIDDEN:         'TABLE 6: Table header is hidden',
            TITLE:                  'TABLE 6: Each TH element with content in a complex table must have an id attribute, whose id value must be unique on the page'
        },
        TABLE_7: {
            MESSAGE_PASS:            'TABLE 7: All data cells have headers.',
            MESSAGE_MISSING_HEADERS: 'TABLE 7: %1 data cells are missing headers.',
            MESSAGE_HIDDEN:          'TABLE 7: The table is hidden from people using assistive technologies.',
            TITLE:                   'TABLE 7: If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table'
        },
        TABLE_8: {
            MESSAGE_PASS:   'TABLE 8: Complex data table has the summary attribute with content',
            MESSAGE_FAIL:   'TABLE 8: Each complex data table must have summary attribute with content.',
            MESSAGE_HIDDEN: 'TABLE 8: The table is hidden from people using assistive technologies.',
            MESSAGE_NO_COMPLEX: 'TABLE 8: The table is not complex data table.',
            TITLE:                 'TABLE 8: If a table is a complex data table, it must have a summary attribute with content.'
        },
        TABLE_9: {
            MESSAGE_UNIQUE:     'TABLE 9: The data table summary attribute "%1" is unique, verify that it uniquely describes the contents of the table.',
            MESSAGE_NOT_UNIQUE: 'TABLE 9: The data table summary attrubute "%1" is NOT unique, review the summary content on your data table to help people orient the contents of each data table.',
            TITLE:              'TABLE 9: If there is more than one data table, the summary content must be unique'
        },
        TABLE_10: {
            MESSAGE_UNIQUE:     'TABLE 10: The data table caption element content "%1" is unique, verify that the caption uniquely describes the contents of the table.',
            MESSAGE_NOT_UNIQUE: 'TABLE 10: The data table caption element content "%1" is NOT unique, review the captions on your data to help people orient the contents of each data table.',
            TITLE:              'TABLE 10: If there is more than one data table, the caption content for each caption must be unique on the page'
        },
        TABLE_11: {
            MESSAGE_LAYOUT_INSIDE_DATA: 'TABLE 11: Do not use layout table inside a data table',
            MESSAGE_NESTED_LAYOUT:      'TABLE 11: nested layout tables are larger than 1 column wide',
            MESSAGE_ONE_COLUMN:         'TABLE 11: nested layout tables are 1 column wide',
            MESSAGE_TOP_LEVEL:          'TABLE 11: Top level table is a layout table with %1 rows and %2 columns',
            TITLE:                      'Table 11: Do not use nested tables larger than 1 column wide for positioning content outside of landmarks. Fails with one or more one levels of nesting.'
        },
        TABLE_12: {
            MESSAGE_PASS: 'TABLE 12: ',
            MESSAGE_FAIL: 'TABLE 12: ',
            MESSAGE_NA:   'TABLE 12: ',
            TITLE:        'Table 12: Do not use nested tables more than 1 column wide for positioning within a landmark. Fails with one or more one levels of nesting.'
        },
        TABLE_13: {
            MESSAGE_VERIFY:   'TABLE 13: Verify the content is meaningful as table markup is ignored.',
            MESSAGE_HIDDEN:   'TABLE 13: The table is hidden from people using assistive technologies',
            TITLE:            'Table 13: If tables more than 1 column wide are used for layout, verify the content is meaningful when table markup is ignored.'
        },
        TITLE_1: {
            MESSAGE_HAS_TITLE: 'TITLE 1: Document has a TITLE element with content.',
            MESSAGE_NO_TITLE:  'TITLE 1: Document TITLE element is missing or empty.',
            TITLE:             'TITLE 1: Document needs a title element with content.'
        },
        TITLE_2: {
            MESSAGE_H1_IS_NOT_LABEL: 'TITLE 2: H1 element \'%1\' is NOT a label for a MAIN landmark.',
            MESSAGE_H1_IS_LABEL:     'TITLE 2: H1 element \'%1\' is a label for a MAIN landmark.',
            MESSAGE_HIDDEN:          'TITLE 2: H1 element \'%1\' is hidden from assistive technology, so will not be seen.',
            TITLE:                   'TITLE 2: If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark.'
        },    
        TITLE_3: {
            MESSAGE_USES_H1:      'TITLE 3: The MAIN landmark uses H1 element as a label.',
            MESSAGE_H1_NOT_LABEL: 'TITLE 3: The MAIN landmark has an H1, but NOT used as a label.',
            MESSAGE_NO_H1:        'TITLE 3: MAIN landmark does NOT have an H1 element as a label.',
            MESSAGE_HIDDEN:       'TITLE 3: MAIN landmark is hidden.',
            TITLE:                'TITLE 3: Every MAIN landmark should use the H1 element as a label'
        }

    },
    // end rules

    //
    //  OAA Rule Groups title and message string National Language Support (NLS)
    //
    groups: {
        GROUP_1: {
            title: 'Unassigned Rule',
            description: ''
        },
        GROUP_2: {
            title: 'Landmark and Header Rule',
            description: ''
        },
        GROUP_3: {
            title: 'Data Table Rule',
            description: ''
        },
        GROUP_4: {
            title: 'Image and Area Rule',
            description: ''
        },
        GROUP_5: {
            title: 'Audio and Video Rule',
            description: ''
        },
        GROUP_6: {
            title: 'Form/Widget Rule',
            description: ''
        },
        GROUP_7: {
            title: 'Styling Rule',
            description: ''
        },
        GROUP_8: {
            title: 'Frame Rule',
            description: ''
        },
        GROUP_9: {
            title: 'Scripting Rule',
            description: ''
        },
        GROUP_10: {
            title: 'Layout Rule',
            description: ''
        },
        GROUP_11: {
            title: 'Link Rule',
            description: ''
        },
        GROUP_12: {
            title: 'Language Rule',
            description: ''
        },
        GROUP_13: {
            title: 'Accesskey Rule',
            description: ''
        }
    }
});
/**
 * Copyright 2011 OpenAjax Alliance
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Rule Set for WCAG 2.0 (Beta)                        */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.addRuleset(
    {
        //
        // Basic info
        //
        id              : 'WCAG_2_0',       // Unique ID reference for ruleset
        nameCode        : 'name',           // Reference to the name of requirements document in the NLS file
        descriptionCode : 'description',    // Reference to the description of the requirements document in the NLS file
        versionCode     : 'version',        // Reference to the ruleset version in the NLS file
        date            : '2011-03-31',     // Date this file was last modified

        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : 'http://www.w3.org/TR/WCAG20/',
        // baseReqUrl - used to resolve relative urls of requirementURLs only
        baseReqUrl : '',
        //
        //  WCAG 2.0 Success Criteria mapping of OAA Rules
        //
        
        requirements : [
                 //
                 // WCAG 2.0 Success Criteria 1.1.1 Non-text Content
                 //
               {
                 requirementNumber : '1.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#text-equiv',
                 enabled           : true,
                 rules : {
                                //
                                // Image 1
                                //
                     'IMAGE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 2
                                //
                     'IMAGE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 3
                                //
                     'IMAGE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 4 engish
                                //
                     'IMAGE_4_EN' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 4 french
                                //
                     'IMAGE_4_FR' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 5
                                //
                     'IMAGE_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 6
                                //
                     'IMAGE_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.1.1
                 //
                 // WCAG 2.0 Success Criteria 1.2.1 Audio-only and Video-only (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
                 enabled           : true,
                 rules : {
                                //
                                // Media 1
                                //
                     'MEDIA_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Media 1
                                //
                     'MEDIA_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }

                 }   // end list of rules
               }, // end success criteria 1.2.1
                 //
                 // WCAG 2.0 Success Criteria 1.2.2 Captions (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.2
                 //
                 // WCAG 2.0 Success Criteria 1.2.3 Audio Description or Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.3
                 //
                 // WCAG 2.0 Success Criteria 1.2.4 Captions (Live)
                 //
               {
                 requirementNumber : '1.2.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.4
                 //
                 // WCAG 2.0 Success Criteria 1.2.5 Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.5
                 //
                 // WCAG 2.0 Success Criteria 1.2.6 Sign Language (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.6
                 //
                 // WCAG 2.0 Success Criteria 1.2.7 Extended Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.7',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.7
                 //
                 // WCAG 2.0 Success Criteria 1.2.8 Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.8
                 //
                 // WCAG 2.0 Success Criteria 1.2.9 Audio-only (Live)
                 //
               {
                 requirementNumber : '1.2.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
                 enabled           : true,
                 rules : {}   // end list of rules
              }, // end success criteria 1.2.9
                 //
                 // WCAG 2.0 Success Criteria 1.3.1 Info and Relationships
                 //
               {
                 requirementNumber : '1.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
                 enabled           : true,
                 rules : {
                                //
                                // TABLE 1: Each data table must include column and/or row headers
                                // Group Table
                                //
                     'TABLE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 2: A data table should have a caption element with content or aria-labelledby reference
                                // Group Style: Table Rule
                                //
                     'TABLE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P2,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 3: A data table should have a summary attribute with content or a aria-describedby attribute reference
                                // Group Style: Table Rule
                                //
                     'TABLE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 4: If a table has both a caption element/aria-labelledby attribute and a summary/aria-describedby attribute, the summary content must be unique from the caption content
                                // Group Style: Table Rule
                                //
                     'TABLE_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 5: Each data table must include column and/or row headers: The first cell in each column must be a th element, and/or each row must contain at least one th element.
                                // Group Style: Table Rule
                                //
                     'TABLE_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 6: Each TH element in a complex table must have an id attribute, whose id value must be unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 7: If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
                                // Group Style: Table Rule
                                //
                     'TABLE_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 8: If a table is a complex data table, it must have a summary attribute with content.
                                // Group Style: Table Rule
                                //
                     'TABLE_8' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 9: If there is more than one data table on a page, each data table must have a summary attribute with content that is unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_9' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 10: If there is more than one data table on a page, each data table should have a caption element with content that is unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_10' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Landmark 1
                                // Group Landmark/Header
                                //
                     'LANDMARK_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // List 1
                                // Group List
                                //
                     'LIST_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.3.1
                 //
                 // WCAG 2.0 Success Criteria 1.3.2 Meaningful Sequence
                 //
               {
                 requirementNumber : '1.3.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
                 enabled           : true,
                 rules : {
                                //
                                // Table 11
                                // Group Style: Table Rule
                                //
                     'TABLE_11' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 12
                                // Group Style: Table Rule
                                //
                     'TABLE_12' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 13
                                // Group Style: Table Rule
                                //
                     'TABLE_13' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
               }   // end list of rules
               }, // end success criteria 1.3.2
                 //
                 // WCAG 2.0 Success Criteria 1.3.3 Sensory Characteristics
                 //
               {
                 requirementNumber : '1.3.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.3.3
                 //
                 // WCAG 2.0 Success Criteria 1.4.1 Use of Color
                 //
               {
                 requirementNumber : '1.4.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.1
                 //
                 // WCAG 2.0 Success Criteria 1.4.2 Audio Control
                 //
               {
                 requirementNumber : '1.4.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.2
                 //
                 // WCAG 2.0 Success Criteria 1.4.3 Contrast (Minimum)
                 //
               {
                 requirementNumber : '1.4.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
                 enabled           : true,
                 rules : {
                                //
                                // Color 1:
                                // Group Style: Link Rule
                                //
                     'COLOR_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.4.3
                 //
                 // WCAG 2.0 Success Criteria 1.4.4 Resize text
                 //
               {
                 requirementNumber : '1.4.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.4
                 //
                 // WCAG 2.0 Success Criteria 1.4.5 Images of Text
                 //
               {
                 requirementNumber : '1.4.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 6
                                // Group Style: Link Rule
                                //
                     'HEADING_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 
                 }   // end list of rules
               }, // end success criteria 1.4.5
                 //
                 // WCAG 2.0 Success Criteria 1.4.6 Contrast (Enhanced)
                 //
               {
                 requirementNumber : '1.4.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
                 enabled           : true,
                 rules : {
                                //
                                // Color 1:
                                // Group Style: Link Rule
                                //
                     'COLOR_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.4.6
                 //
                 // WCAG 2.0 Success Criteria 1.4.7 Low or No Background Audio
                 //
               {
                 requirementNumber : '1.4.7',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.7
                 //
                 // WCAG 2.0 Success Criteria 1.4.8 Visual Presentation
                 //
               {
                 requirementNumber : '1.4.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.8
                 //
                 // WCAG 2.0 Success Criteria 1.4.9 Images of Text (No Exception)
                 //
               {
                 requirementNumber : '1.4.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.9
                 //
                 // WCAG 2.0 Success Criteria 2.1.1 Keyboard
                 //
               {
                 requirementNumber : '2.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.1
                 //
                 // WCAG 2.0 Success Criteria 2.1.2 No Keyboard Trap
                 //
               {
                 requirementNumber : '2.1.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.2
                 //
                 // WCAG 2.0 Success Criteria 2.1.3 Keyboard (No Exception)
                 //
               {
                 requirementNumber : '2.1.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.3
                 //
                 // WCAG 2.0 Success Criteria 2.2.1 Timing Adjustable
                 //
               {
                 requirementNumber : '2.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.1
                 //
                 // WCAG 2.0 Success Criteria 2.2.2 Pause, Stop, Hide
                 //
               {
                 requirementNumber : '2.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.2
                 //
                 // WCAG 2.0 Success Criteria 2.2.3 No Timing
                 //
               {
                 requirementNumber : '2.2.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.3
                 //
                 // WCAG 2.0 Success Criteria 2.2.4 Interruptions
                 //
               {
                 requirementNumber : '2.2.4',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.4
                 //
                 // WCAG 2.0 Success Criteria 2.2.5 Re-authenticating
                 //
               {
                 requirementNumber : '2.2.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.5
                 //
                 // WCAG 2.0 Success Criteria 2.3.1 Three Flashes or Below Threshold
                 //
               {
                 requirementNumber : '2.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.3.1
                 //
                 // WCAG 2.0 Success Criteria 2.3.2 Three Flashes
                 //
               {
                 requirementNumber : '2.3.2',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.3.2
                 //
                 // WCAG 2.0 Success Criteria 2.4.1 Bypass Blocks
                 //
               {
                 requirementNumber : '2.4.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
                 enabled           : true,
                 rules : {
                               //
                                // HEADING 1: Every page should have at least H1 element
                                // Group 11: 
                                //
                     'HEADING_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.1
                 //
                 // WCAG 2.0 Success Criteria 2.4.2 Page Titled
                 //
               {
                 requirementNumber : '2.4.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
                 enabled           : true,
                 rules : {
                               //
                                // Title 1:
                                // Group 11: 
                                //
                     'TITLE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                               //
                                // Title 2:
                                // Group 11: 
                                //
                     'TITLE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                               //
                                // Title 3:
                                // Group 
                                //
                     'TITLE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.2
                 //
                 // WCAG 2.0 Success Criteria 2.4.3 Focus Order
                 //
               {
                 requirementNumber : '2.4.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.3
                 //
                 // WCAG 2.0 Success Criteria 2.4.4 Link Purpose (In Context)
                 //
               {
                 requirementNumber : '2.4.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
                 enabled           : true,
                 rules : {
                               //
                                // Link 1:
                                // Group 11: Link Rule
                                //
                     'LINK_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P2,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.4
                 //
                 // WCAG 2.0 Success Criteria 2.4.5 Multiple Ways
                 //
               {
                 requirementNumber : '2.4.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.5
                 //
                 // WCAG 2.0 Success Criteria 2.4.6 Headings and Labels
                 //
               {
                 requirementNumber : '2.4.6',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 2
                                // Group: Headings and Landmarks
                                //
                     'HEADING_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 3
                                // Group: Headings and Landmarks
                                //
                     'HEADING_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 8 
                                // Group: Headings and Landmarks
                                //
                     'HEADING_8_EN' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 10
                                // Group: Controls
                                //
                     'CONTROL_10' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 11
                                // Group: Controls
                                //
                     'CONTROL_11' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.6
                 //
                 // WCAG 2.0 Success Criteria 2.4.7 Focus Visible
                 //
               {
                 requirementNumber : '2.4.7',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.7
                 //
                 // WCAG 2.0 Success Criteria 2.4.8 Location
                 //
               {
                 requirementNumber : '2.4.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.8
                 //
                 // WCAG 2.0 Success Criteria 2.4.9 Link Purpose (Link Only)
                 //
               {
                 requirementNumber : '2.4.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
                 enabled           : true,
                 rules : {
                                // LINK 2: Links with the same HREF should have the same link text.
                                // Group 11: Link Rule
                                //
                     'LINK_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // LINK 3: Links with the same HREF should have the same link text.
                                // Group 11: Link Rule
                                //
                     'LINK_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.9
                 //
                 // WCAG 2.0 Success Criteria 2.4.10 Section Headings
                 //
               {
                 requirementNumber : '2.4.10',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 3
                                // Group: Headings and Landmarks
                                //
                     'HEADING_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 4
                                // Group: Headings and Landmarks
                                //
                     'HEADING_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 6
                                // Group: Headings and Landmarks
                                //
                     'HEADING_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                  }   // end list of rules
               }, // end success criteria 2.4.10
                 //
                 // WCAG 2.0 Success Criteria 3.1.1 Language of Page
                 //
               {
                 requirementNumber : '3.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.1
                 //
                 // WCAG 2.0 Success Criteria 3.1.2 Language of Parts
                 //
               {
                 requirementNumber : '3.1.2',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.2
                 //
                 // WCAG 2.0 Success Criteria 3.1.3 Unusual Words
                 //
               {
                 requirementNumber : '3.1.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.3
                 //
                 // WCAG 2.0 Success Criteria 3.1.4 Abbreviations
                 //
               {
                 requirementNumber : '3.1.4',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.4
                 //
                 // WCAG 2.0 Success Criteria 3.1.5 Reading Level
                 //
               {
                 requirementNumber : '3.1.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.5
                 //
                 // WCAG 2.0 Success Criteria 3.1.6 Pronunciation
                 //
               {
                 requirementNumber : '3.1.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.6
                 //
                 // WCAG 2.0 Success Criteria 3.2.1 On Focus
                 //
               {
                 requirementNumber : '3.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.1
                 //
                 // WCAG 2.0 Success Criteria 3.2.2 On Input
                 //
               {
                 requirementNumber : '3.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.2
                 //
                 // WCAG 2.0 Success Criteria 3.2.3 Consistent Navigation
                 //
               {
                 requirementNumber : '3.2.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.3
                 //
                 // WCAG 2.0 Success Criteria 3.2.4 Consistent Identification
                 //
               {
                 requirementNumber : '3.2.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.4
                 //
                 // WCAG 2.0 Success Criteria 3.2.5 Change on Request
                 //
               {
                 requirementNumber : '3.2.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.5
                 //
                 // WCAG 2.0 Success Criteria 3.3.1 Error Identification
                 //
               {
                 requirementNumber : '3.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.1
                 //
                 // WCAG 2.0 Success Criteria 3.3.2 Labels or Instructions
                 //
               {
                 requirementNumber : '3.3.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
                 enabled           : true,
                 rules : {      //
                                // Control 1
                                // Group: Controls
                                //
                     'CONTROL_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 2
                                // Group: Controls
                                //
                     'CONTROL_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 3
                                // Group: Controls
                                //
                     'CONTROL_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 4
                                // Group: Controls
                                //
                     'CONTROL_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 5
                                // Group: Controls
                                //
                     'CONTROL_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 6
                                // Group: Controls
                                //
                     'CONTROL_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 7
                                // Group: Controls
                                //
                     'CONTROL_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 8
                                // Group: Controls
                                //
                     'CONTROL_8' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 9
                                // Group: Controls
                                //
                     'CONTROL_9' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 3.3.2
                 //
                 // WCAG 2.0 Success Criteria 3.3.3 Error Suggestion
                 //
               {
                 requirementNumber : '3.3.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.3
                 //
                 // WCAG 2.0 Success Criteria 3.3.4 Error Prevention (Legal, Financial, Data)
                 //
               {
                 requirementNumber : '3.3.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.4
                 //
                 // WCAG 2.0 Success Criteria 3.3.5 Help
                 //
               {
                 requirementNumber : '3.3.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.5
                 //
                 // WCAG 2.0 Success Criteria 3.3.6 Error Prevention (All)
                 //
               {
                 requirementNumber : '3.3.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.6
                 //
                 // WCAG 2.0 Success Criteria 4.1.1 Parsing Content
                 //
               {
                 requirementNumber : '4.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 4.1.1
                 //
                 // WCAG 2.0 Success Criteria 4.1.2 Name, Role, Value
                 //
               {
                 requirementNumber : '4.1.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               } // end success criteria 4.1.2
      ]
    }
);


//
// OpenAjax Alliance Rules 
// Rule group: Styling Rules
//
OpenAjax.a11y.addRules([
      
 // ------------------------
 // Color 1: Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 {
   id              : 'COLOR_1', 
   lastUpdated     : '2011-07-11', 
   cacheDependency : 'color_contrast_cache',
   cacheProperties : ['font_size', 'font_weight', 'color_hex', 'background_color_hex', 'background_image', 'color_contrast_ratio'],
   language        : "",
   enabled         : true,  
   validate    : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT =  3.1;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_elements_len;
      var de;

      var severity;
      var message_id;
      var args = [];
     
      for (i=0; i<color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];
   
        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = rule_result.rule_severity;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_elements_len = cci.dom_elements.length;

        for (j=0; j<dom_elements_len; j++) {
          de = cci.dom_elements[j];
          if (de.computed_style.graphical === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, de, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', []);
          }
        } // end loop
   
      } // end loop  
      
    } // end validate function
 },
 
 // ------------------------
 // Color 2: Color contrast ratio must be > 7 for normal text, and > 4.5 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 {
   id       : 'COLOR_2', 
   lastUpdated   : '2011-07-11', 
   cacheDependency : 'color_contrast_cache',
   cacheProperties : ['font_size', 'font_weight', 'color_hex', 'background_color_hex', 'background_image', 'color_contrast_ratio'],
   language    : "",
   enabled     : true,  
   validate    : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_elements_len;
      var de;

      var severity;
      var message_id;
      var args = [];

     
      for (i=0; i<color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];
   
        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = rule_result.rule_severity;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_elements_len = cci.dom_elements.length;

        for (j=0; j<dom_elements_len; j++) {
          de = cci.dom_elements[j];
          if (de.computed_style.graphical === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, de, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', []);
          }
        } // end loop
   
      } // end loop    
    }
  }
       
      
 ]); 


    

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([

/**
 * @rule CONTROL_1
 * 
 * @desc textarea, select and input elements of type text, 
 *       password, checkbox, radio and file must have an 
 *       accessible label
 * 
 * @group Controls
 * 
 */
	     
{  id              : 'CONTROL_1', 
   lastUpdated     : '2011-09-16', 
   cacheDependency : 'controls_cache',
   cacheProperties : ['dom_element:tag_name','type','id','label',''],
   language        : "",
   enabled         : true,  
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var ce;
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         type = control_elements[i].type;
     
         if (type === 'checkbox' ||
             type === 'file'   ||
             type === 'password' ||
             type === 'radio'  ||
             type === 'select'  ||
             type === 'text'   ||
             type === 'textarea') {
             
           if (ce.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
        
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_LABEL_MISSING', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', [type.toUpperCase()]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
},

/**
 * @rule CONTROL_2
 * 
 * @desc Every input type image must have an alt or title attribute with content
 * 
 * @group Controls
 */
	     
{  id              : 'CONTROL_2', 
   lastUpdated     : '2011-09-16', 
   cacheDependency : 'controls_cache',
   cacheProperties : [],
   language        : "",
   enabled         : true,  
   validateParams  : {},
   validate        : function (dom_cache, rule_result) {
  
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var ce;
     var de;
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         type = control_elements[i].type;
     
         if (type === 'image') {
      
           if (ce.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_ALT_MISSING', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', [type.toUpperCase()]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
 },
 
/**
 * @rule CONTROL_3
 *
 * @desc Groups of radio buttons should be contained in fieldset/legend
 *
 * @group controls
 */
{ id              : 'CONTROL_3', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {
  
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
     var i;
     var ce;
     var de;
     var alb;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
         de = ce.dom_element;
  
         type = control_elements[i].type;
     
         if (type === 'radio') {
      
           if (de.computed_style.at == VISIBILITY.VISIBLE) {
     
             if (ce.fieldset_element) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_LEGEND', []);     
             }
             else {  
               if (de.aria_labelledby) {
                 alb = de.aria_labelledby.split(' ');
                 if (alb.length>1) {
                   rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_ARIA_LABELLEDBY', []);     
                 }
                 else {
                   rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_LEGEND_MISSING', []);
                 }
               }  
               else {
                 if (de.aria_label && de.aria_label.length) {
                   rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_ARIA_LABEL', []);     
                 }
                 else {
                   rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_LEGEND_MISSING', []);
                 }    
               }
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);     
           }
         }
       } // end loop
     }   
  } // end validate function
},

/**
 * @rule CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 *
 * @group controls
 */
{ id              : 'CONTROL_4', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
     var i;
     var ce;
     var de;
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         type = control_elements[i].type;
     
         if (type === 'button') {
      
           if (ce.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_CONTENT', []);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_NO_CONTENT', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);     
           }
         }
       } // end loop
     }   

  } // end validate function
},
 

/**
 * @rule CONTROL_5
 *
 * @desc Textarea, select, input and button elements with id attributes, must have unique id values on the page
 *
 * @group controls
 */
{ id              : 'CONTROL_5', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
   
    var i;
    var ce;
    var de;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
        de = ce.dom_element;

        switch (de.id_unique) { 
        
        case OpenAjax.a11y.ID.NOT_UNIQUE:
          rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_DUPLICATE_ID', [de.id]);
          break;          
          
        case OpenAjax.a11y.ID.UNIQUE:
          rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_UNIQUE_ID', [de.id]);               
          break;
          
        default:
          break;        
        }
        
      } // end loop
    }     
  } // end validate function
},
 
/**
 * @rule CONTROL_6
 * 
 * @desc Label with a for attribute reference does not reference a form control
 *
 * @group controls
 */
{ id              : 'CONTROL_6', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var le;
    var de;
    var tag_name;

    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (i=0; i < label_elements_len; i++) {
        le = label_elements[i];
        
        if (le.unused_label) {
          de = dom_cache.element_with_id_cache.getDOMElementById(le.for_id);
          
          if (de && de.tag_name) {  
            rule_result.addResult(SEVERITY.WARNING, le, 'MESSAGE_NO_CONTROL', [de.tag_name]);
          }
          else {          
            rule_result.addResult(SEVERITY.WARNING, le, 'MESSAGE_NO_ELEMENT', []);    
          }           
        }        
      } // end loop
    }     
  } // end validate function
},

/** 
 * @rule CONTROL 7
 *
 * @desc Label or legend element should contain content 
 *
 * @group controls
 */
 
{ id              : 'CONTROL_7', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var le;
    var de;

    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (i=0; i < label_elements_len; i++) {
        le = label_elements[i];
        
        if (le.label && le.label.length === 0) {
          rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_NO_CONTENT', []);
        }
        else {
          rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_CONTENT', []);        
        }
     
      } // end loop
    } 
  } // end validate function
},


/** 
 * @rule CONTROL 8
 *
 * @desc Fieldset should contain exactly one legend element 
 *
 * @group controls
 */
 
{ id              : 'CONTROL_8', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var fe;

    var fieldset_elements      = dom_cache.controls_cache.fieldset_elements;
    var fieldset_elements_len  = fieldset_elements.length;
       
    // Check to see if valid cache reference
    if (fieldset_elements && fieldset_elements_len) {
     
      for (i=0; i < fieldset_elements_len; i++) {
        fe = fieldset_elements[i];
        
        if (fe.legend_count === 0) {
          rule_result.addResult(rule_result.rule_severity, fe, 'MESSAGE_NO_LEGEND', []);        
        }
        else {
          if (fe.legend_count > 1) {
            rule_result.addResult(rule_result.rule_severity, fe, 'MESSAGE_MORE_THAN_ONE', []);        
          }
          else {
            rule_result.addResult(SEVERITY.PASS, fe, 'MESSAGE_ONLY_ONE', []);                  
          }
        }
      } // end loop
    } 

  } // end validate function
},

/** 
 * @rule CONTROL 9
 *
 * @desc Fieldset should contain exactly one legend element 
 *
 * @group controls
 */
 
{ id              : 'CONTROL_9', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var i;
    var ce;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
        
        if (ce.dom_element.computed_style.at === VISIBILITY.VISIBLE) {

          if (ce.label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
            rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_USES_TITLE', []);        
          }
          else {
            rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_DOES_NOT_USE_TITLE', []);                  
          }  
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);                          
        }
        
      } // end loop
    } 

  } // end validate function
},

/**
 * @rule CONTROL_10
 * 
 * @desc Accessible labels must be unique for every textarea, 
 *       select and input element of type text, password, radio, 
 *       and checkbox on a page
 * 
 * @group Controls
 */
 
{ id              : 'CONTROL_10', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
  
        type = control_elements[i].type;
     
        if (ce.dom_element.computed_style.at === OpenAjax.a11y.VISIBILITY.VISIBLE) { 
          if (type === 'checkbox' ||
              type === 'file'   ||
              type === 'password' ||
              type === 'radio'  ||
              type === 'select'  ||
              type === 'text'   ||
              type === 'textarea') {
            
            // check to make sure label has content            
            if (ce.label && ce.label.length) {  
              ces.push(ce);  
            }  
          }
        }
      } // end loop    
      
      // sort labels
      
      ces = dom_cache.sortArrayOfObjects(ces,'label_for_comparison', true); 

      for (i=0; i<ces.length; i++) {
        ce = ces[i];
        if (ce.duplicate) {
          rule_result.addResult(rule_result.rule_severity, ce, 'MESSAGE_DUPLICATE_LABEL', [ce.label]);                
        }
        else {
          rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_LABEL_UNIQUE', [ce.label]);        
        }
      }
      
    } 
  } // end validate function
},

/**
 * @rule CONTROL_11
 * 
 * @desc If there is more than one form on page, input element of type 
 *       submit and reset must have unique labels in each form using the value attribute
 * 
 * @group Controls
 */
 
{ id              : 'CONTROL_11', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'controls_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var current_controls   = [];
       
  } // end validate function
}
]); 


    

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/**
 * @rule TITLE 1
 *
 * @desc The page must contain exactly one title element and it must contain content.
 *
 * @group Headings and Landmarks
 * 
 */	     
  {
    id              : 'TITLE_1', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var me;
      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];
          if (me.dom_element.tag_name === 'title') {
            if (me.dom_element.hasTitle && dom_cache.title.length) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_TITLE', []);              
            }
            else {
              rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_NO_TITLE', []);
            }
          }
        }
      }
  
    } // end validate function
  },

/**
 * @rule TITLE_2
 *
 * @desc  If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark 
 *
 * @group Headings and Landmarks
 * 
 */	     	     
 {
    id              : 'TITLE_2', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var i;
      var me;
      
      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.level === 1) h1_count++;  
          if (me.dom_element.role === 'main') main_count++;
        } // end loop
        
        if (h1_count > 0 && main_count > 0) {
          for (i=0; i<main_elements_len; i++ ) {
            me = main_elements[i];
            
            if (me.level === 1) {
              if (me.isH1UsedAsLabelForMainRole()) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NOT_LABEL', []);
              }    
            }
          } // end loop      
        }   
      }  
    } // end validate function
 },
/**
 * @rule TITLE_3
 *
 * @desc The words in the H1 element content should also be in the TITLE element content  
 *
 * @group Headings and Landmarks
 * 
 */	     	     
  {
    id              : 'TITLE_3', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;
      var h1_info;

      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.role === 'main') {
          
            if (me.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            
              h1_info = me.getH1InformationForMainRole();           
               
              if (h1_info.has_h1) {
               
                if (h1_info.has_label) {
                  rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_USES_H1', []);
                }                 
                else {
                  rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NOT_LABEL', []);
                }
              }
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_NO_H1', []);
              }
            }
            else {
              rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', []);                      
            }              
          }  
        }  // end loop
      }      
    } // end validate function
 },

/**
 * @rule HEADING_1
 *
 * @desc Each page should contain at least one H1 element and each H1 element must have content
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_1', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;

      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_H1_HIDDEN', []);                      
          }
          else {
            if (me.dom_element.tag_name == 'h1') {
              if (me.name && name.length > 0) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_H1', []);
                h1_count++;
              }
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NO_CONTENT', []);
              }
            }
          }  
        }
      }

     // Test if no h1s
     if (h1_count === 0) {
        te = dom_cache.headings_landmarks_cache.main_elements[0];
        // Use title if defined to mark failure
        if (te) {
          rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_H1_MISSING', []);
        } 
        else {
          rule_result.addResult(rule_result.rule_severity, null, 'MESSAGE_H1_MISSING', []);
        }
     }
  } // end validate function
 }, 
/**
 * @rule HEADING_2
 *
 * @desc The text content of headings of the same level that share the same parent heading or landmark role should be unique. 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_2', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {
  
      function checkListForUniqueNames(heading_list) {
         
        var i;
        var j;
        var len = heading_list.length;
        var he1;
        var he2;
       
        if (len < 2) return; 
         
        for (i=0; i<(len-1); i++) {
          he1 = heading_list[i];          
          for (j=i+1; j<len; j++) {
            he2 = heading_list[j];            
            if (he2.unique && (he1.name_for_comparison == he2.name_for_comparison)) {
              he1.unique = false;              
              he2.unique = false;              
              break;
            }
          }
        }
      }

      function checkHeadingLevelForUniqueContent(level) {
      
         var heading_list = [];
         var i;
         var he;
         
         for (i=0; i<heading_elements_len; i++) {
           he = heading_elements[i];
           if (he.level == level) {
             he.unique = true;
             if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) heading_list.push(he);
           }
           else {
             if (he.level < level) {
               checkListForUniqueNames(heading_list);
               heading_list = [];
             }
           }
         }
         
         if (heading_list.length) {
            checkListForUniqueNames(heading_list);         
         }
       
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      
      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;

      // Check all h1 elements for uniquness
      if (heading_elements && heading_elements_len) {     
      
        checkHeadingLevelForUniqueContent(1);
        checkHeadingLevelForUniqueContent(2);
        checkHeadingLevelForUniqueContent(3);
        checkHeadingLevelForUniqueContent(4);
        checkHeadingLevelForUniqueContent(5);
        checkHeadingLevelForUniqueContent(6);
        
        for(i=0; i<heading_elements_len; i++) {
          he = heading_elements[i];
          if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            if (he.unique) {          
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_UNIQUE', []);            
            }
            else {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_NOT_UNIQUE', []);            
            }
          }
        } // end loop
      }
      
  } // end validate function
 }, 
/**
 * @rule HEADING_3
 *
 * @desc Heading content should describe the section or sub section 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_3', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      
      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;

      if (heading_elements && heading_elements_len) {      
      
        for(i=0; i<heading_elements_len; i++) {
          he = heading_elements[i];
          if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_CHECK', []);            
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
        }
      }



  } // end validate function
 },

/**
 * @rule HEADING_4
 *
 * @desc Headings must be properly nested 
 *
 * @group Headings and Landmarks
 * 
 */
 {
  id              : 'HEADING_4', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && (heading_elements.length > 1)) {
      
        he_last = heading_elements[0];
        rule_result.addResult(SEVERITY.PASS, he_last, 'MESSAGE_PROPER_NESTING', []);
        
        for (i=1; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if (he.dom_element.computed_style.at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
          else {
            if (he.level <= he_last.level || (he.level === (he_last.level+1))) {
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_PROPER_NESTING', []);
            }
            else {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_IMPROPER_NESTING', []);
            }
            he_last = he;
          }            
        } // end loop
      }


  } // end validate function
 },
/**
 * @rule HEADING_5
 *
 * @desc Every navigation and complementary landmark should use an H2 element as its label 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id       : 'HEADING_5', 
  lastUpdated   : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language    : "",
  enabled     : true,  
  validateParams : {},
  validate    : function (dom_cache, rule_result) {
  
  } // end validate function
 },
/**
 * @rule HEADING_6
 *
 * @desc The text content of a heading should not only come from the alt attribute value of img elements. 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_6', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if (he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE && he.dom_element.only_image) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_ONLY_IMAGE', []);
          }
          else {
            rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_HAS_TEXT', []);          
          }

        } // end loop
      }
  } // end validate function
 },
/**
 * @rule HEADING_7
 *
 * @desc Heading elements should contain content
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_7', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if ((he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE ) && 
              ( !he.name || he.name.length === 0 )) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_EMPTY', []);
          }            
        } // end loop
      }
  } // end validate function
 },
/**
 * @rule HEADING_8_EN
 *
 * @desc Headings should be concise and therefore typically not contain more than 100 characters (English Only) 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_8_EN', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "en-us en-br",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var MAX_HEADING_LENGTH = 100;

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i;
      var he;
      var len;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];
          
          if (he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE  && he.name ) {
            len = he.name.length;
            if (len > MAX_HEADING_LENGTH ) {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_TO_LONG', [len,MAX_HEADING_LENGTH]);
            }  
          }            
        } // end loop
      }      
  } // end validate function
 }
 ]); 


    

/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/**
 * @rule IMAGE_1
 *
 * @desc Images must have alt attribute
 *
 * @group images
 */
 
{ id              : 'IMAGE_1', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
 
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
        }
        else {      
          if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
            if (ie.has_alt) {
              rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', []);     
            }
            else {
              rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_MISSING', []);     
            }
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
          }
        }      
      } // end loop
    } 
  } // end validation function  
},

/**
 * @rule IMAGE_2
 *
 * @desc If the longdesc attribute is defined, it must have valid URI
 *
 * @group images
 */
{ id              : 'IMAGE_2', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['longdesc', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {

    var SEVERITY  = OpenAjax.a11y.SEVERITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var i;
    var ie = null;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        if (ie.longdesc) {
          if (ie.dom_element.hasAttrWithValue('role', 'presentation')) {     
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
          }
          else {      
            if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
            
              switch (OpenAjax.a11y.cache.util.UrlExists(ie.longdesc)) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.longdesc]);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_FAIL', [ie.longdesc]);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, ie, 'MESSAGE_NOT_TESTED', [ie.longdesc]);     
                break;
         
              default:
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, ie, 'MESSAGE_ERROR', [ie.longdesc]);
                break;
              } 
            }
            else {       
              rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
            }
          }       
        }
        else {
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }      
      } // end loop
    } 
  } // end validation function
}, 

/**
 * @rule IMAGE_3
 *
 * @desc The file name of the image should not be part of the alt text content (it must have an image file extension)
 *
 * @group images
 */
{ id              : 'IMAGE_3', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
  
    var SEVERITY = OpenAjax.a11y.SEVERITY;
  
    var i;
    var ie;
    var pos;
    var file_name;
   
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        
        if (ie.source && 
            ie.has_alt && 
            ie.alt_length) {
                  
            if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
              pos = ie.source.lastIndexOf('/');    
              file_name = ie.source.substring((pos+1)).toLowerCase();
        
              // make sure it has a file extension, will assume extension is for an image
              if (file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(file_name) >= 0 ) {
                  rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_FAIL', [file_name]);                 
                }
                else {
                   rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);                 
                }
              }
              else {
                rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NO_FILE_NAME', []);                              
              }
            }
            else {
              rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_HIDDEN', []);                              
            }
        }
        else {
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NO_ALT', []);                              
        } 
      } // end loop
    }
  } // end validation function  
 }, 

/**
 * @rule IMAGE_4_EN (English)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (English only)
 *
 * @group images
 */
{ id              : 'IMAGE_4_EN', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "en-us en-br",
  enabled         : true,  
  validateParams  : {
    max_alt_text_length: { value: 100, type: 'Integer' }
  }, 
  validate        : function (dom_cache, rule_result) {
      
    var MAX_ALT_TEXT_LENGTH = parseInt(this.validateParams.max_alt_text_length.value,10);

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
          else {      
            rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
        }      
      } // end loop
    } 
  } // end validation function
},

/**
 * @rule IMAGE_4_FR (French)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (French only)
 *
 * @group images
 */
{ id              : 'IMAGE_4_FR', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "fr",
  enabled         : true,  
  validateParams  : {
    max_alt_text_length: { value: 120, type: 'Integer' }
  }, 
  validate        : function (dom_cache, rule_result) {
      
    var SEVERITY = OpenAjax.a11y.SEVERITY;   
    var MAX_ALT_TEXT_LENGTH = parseInt(this.validateParams.max_alt_text_length.value,10);

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
    
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(rule_result_rule_severity, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
          else {      
            rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
        }      
      } // end loop
    } 
  } // end validation function
},

/**
 * @rule IMAGE_5
 *
 * @desc If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position
 *
 * @group images
 */
{ id              : 'IMAGE_5', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'height', 'width', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     

        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if ((ie.height == 1 || ie.width == 1) && ie.alt_length > 0 ) {
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_NOT_EMPTY', []);     
          }
          else {      
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PASS', []);     
          } 
        } 
      } // end loop
    } 
  } // end validation function
}, 
 
/**
 * @rule IMAGE_6
 *
 * @desc If the alt is empty or role is set presentation verify the image is purely decorative
 *
 * @group images
 */
{ id              : 'IMAGE_6', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'height', 'width', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
    
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];   

        if (ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE) {
 
          if (ie.has_alt && ie.alt_length === 0) {     
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_VERIFY', []);     
          }
          else {      
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
          }
        } 
        else {
          rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
        }
      } // end loop
    } 
  } // end validation function
} 
]); 
 


    

/**
 * Copyright 2011 OpenAjax Alliance
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
/*            OpenAjax Alliance Link Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/**
 * Link 1 
 * 
 * @desc Links should have minimum dimensions for selecting and reading
 *
 * Group 11: Link Rule
 * 
 * Last update: 2011-03-31
 */
 
{ id       : 'LINK_1', 
  lastUpdated   : '2011-07-11', 
  cacheDependency : 'links_cache',
  cacheProperties : ['height', 'width', 'graphical'],
  language    : "",
  enabled     : true,
  validate    : function (dom_cache, rule_result) {
      
   var i;   
   var MIN_HEIGHT = 12;
   var MIN_WIDTH = 12;

   var passed = true;
   var node_result = null;
   
   var link_elements_len;
   var link_element;
   var computed_style;
   
   // Check to see if valid cache reference
   if (dom_cache.links_cache.link_elements) {
     
    link_elements_len = dom_cache.links_cache.link_elements.length;
    
    for (i=0; i < link_elements_len; i++) {
    
     link_element = dom_cache.links_cache.link_elements[i];
     computed_style = link_element.dom_element.computed_style;
     
     // test if link is visible in a graphical rendering
     
     if (computed_style.graphical == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
      if (link_element.href && link_element.href.length) {       
       
       if (link_element.height && 
         link_element.width) {
       
        if ((link_element.height > MIN_HEIGHT) && 
          (link_element.width > MIN_WIDTH)) {
          rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, link_element, 'MESSAGE_PASS', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
        else {
         rule_result.addResult(rule_result.rule_severity, link_element, 'MESSAGE_TO_SMALL', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
       }
       else {
         rule_result.addResult(rule_result.MANUAL_EVALUATION, link_element, 'MESSAGE_MANUAL', []);
       }
      } 
      else {
       rule_result.addResult(OpenAjax.a11y.SEVERITY.NA, link_element, 'MESSAGE_NA', []);
      }
     } 
     else {
      rule_result.addResult(OpenAjax.a11y.SEVERITY.HIDDEN, link_element, 'MESSAGE_HIDDEN', []);
     } // endif
     
    } // end loop
   } 
  } // end valifdation function
 },
      
/*
 * Link 2
 *
 * @desc Links with the same HREF should have the same link text.
 *
 * Group 11: Link Rule
 * 
 * Last update: 2011-03-31
 */
	     
{
  id              : 'LINK_2', 
  lastUpdated     : '2011-07-11', 
  cacheDependency : 'links_cache',
  cacheProperties : ['name', 'href'],
  language        : "",
  enabled         : true,
  validate        : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dn;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_names     = dom_cache.links_cache.duplicate_names;
      var duplicate_names_len = duplicate_names.length;
      
      var all_share_same_href;

      for (i = 0; i < duplicate_names_len; i++) {
        dn = duplicate_names[i];
        
        all_share_same_href = true;
        
        link_elements     = dn.link_elements;
        link_elements_len = link_elements.length;
        
        for (j = 0; j < link_elements_len; j++) {
          if (link_elements[j].href !== dn.href) all_share_same_href = false;
        } // end loop
        
        for (j = 0; j < link_elements_len; j++) {
          le = link_elements[j];
          if (all_share_same_href) {
            rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_PASS', [link_elements_len]);
          }
          else {
            rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop
   
  } // end validate function
 },

 // ------------------------
 // Link 3: Links with the different HREFs should have the unique link text.
 // Group 11: Link Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 {
  id              : 'LINK_3', 
  lastUpdated     : '2011-07-11', 
  groupCode       : 'GROUP_11',
  cacheDependency : 'links_cache',
  cacheProperties : ['name', 'href'],
  language        : "",
  enabled         : true,
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dh;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_hrefs     = dom_cache.links_cache.duplicate_hrefs;
      var duplicate_hrefs_len = duplicate_hrefs.length;
      
      var all_share_same_name;

      for (i = 0; i < duplicate_hrefs_len; i++) {
        dh = duplicate_hrefs[i];
        
        all_share_same_name = true;
        
        link_elements     = dh.link_elements;
        link_elements_len = link_elements.length;
        
        for (j = 0; j < link_elements_len; j++) {
          if (link_elements[j].name_for_comparison !== dh.name_for_comparison) all_share_same_name = false;
        } // end loop
        
        for (j = 0; j < link_elements_len; j++) {
          le = link_elements[j];
          if (all_share_same_name) {
            rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_PASS', [link_elements_len]);
          }
          else {
            rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop

  } // end validate function
 }
]); 


    

/** ================================================================
*
* OpenAjax Alliance List Rules
*
* =============================================================== */

OpenAjax.a11y.addRules([

/** ================================================================
*
*  LIST 1: A list of navigational links should be contained within an element with role=navigation.
*          Thus any ul or ol element that contains at least a specified minimum of li elements with
*          one and only one link is considered a list of links and must have role=navigation.
* 
* Group: Controls
* 
* Last update: 
*
* =============================================================== */
  {
    id              : 'LIST_1',
    lastUpdated     : '2011-09-27',
    cacheDependency : 'lists_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var MINIMUM_LI_ELEMENTS = 3; // to be considered a list of links
      var SEVERITY = OpenAjax.a11y.SEVERITY;
      var list_elements = dom_cache.lists_cache.list_elements;

      var i; // loop counter
      var max = list_elements.length; // loop control
      var le; // loop placeholder

      for (i = 0; i < max; i++) {
        le = list_elements[i];

        if (le.dom_element.tag_name === 'ul' ||
           le.dom_element.tag_name === 'ol') {
          // TODO: Add constants in openajax_a11y_constants for role values
          if (le.isListOfLinks(MINIMUM_LI_ELEMENTS)) {
            if (le.dom_element.hasAttrWithValue('role', 'navigation')) {
              rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_ROLE_NAV_ON_LIST',
                                    [le.dom_element.tag_name]);
            }
            else {
              if (le.dom_element.parent && le.dom_element.parent.hasAttrWithValue('role', 'navigation')) {
                rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_ROLE_NAV', [le.dom_element.tag_name]);
              }
              else {
                rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_MISSING_ROLE_NAV',
                                      [le.dom_element.tag_name]);
              }
            }
          }
        }
      }
    } // end validate function
  }
]);
/**
 * Copyright 2011 OpenAjax Alliance
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
/*            OpenAjax Alliance Media Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([

/**
 *
 *  MEDIA 1: Pre-recorded audio must have text alternative
 * 
 * Group: Media
 * 
 * Last update: 
 */ 
  {
    id              : 'MEDIA_1',
    lastUpdated     : '2011-09-27',
    cacheDependency : 'lists_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var MEDIA      = OpenAjax.a11y.MEDIA;
      
      var media_elements     = dom_cache.media_cache.media_elements;
      var media_elements_len = media_elements.length;

      var i; 
      var me; 
      var tag_name;
      var ps;

      for (i = 0; i < media_elements_len; i++) {
        me = media_elements[i];
        tag_name = me.dom_element.tag_name;

        if (me.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
        
          if (me.is_audio === MEDIA.YES || me.is_audio === MEDIA.MAYBE) {
            if (me.has_text_alternative === MEDIA.YES) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {          
              if (me.is_audio === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, me, 'MESSAGE_FAIL', []);
              }
            }
          }
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', [tag_name]);
        }
      } // end loop
    } // end validate function
  },
  
/**
 *
 *  MEDIA 2: Pre-recorded video must have text alternative
 * 
 * Group: Media
 * 
 * Last update: 
 */ 
  {
    id              : 'MEDIA_2',
    lastUpdated     : '2011-09-27',
    cacheDependency : 'lists_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var MEDIA      = OpenAjax.a11y.MEDIA;
      
      var media_elements     = dom_cache.media_cache.media_elements;
      var media_elements_len = media_elements.length;

      var i; 
      var me; 
      var tag_name;

      for (i = 0; i < media_elements_len; i++) {
        me = media_elements[i];
        tag_name = me.dom_element.tag_name;

        if (me.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
        
          if (me.is_video === MEDIA.YES || me.is_video === MEDIA.MAYBE) {
          
            if (me.has_text_alternative) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {
              if (me.is_video === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, me, 'MESSAGE_FAIL', []);
              }
            }
          }
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', [tag_name]);
        }
      } // end loop
    } // end validate function
  }  
]);
/* ---------------------------------------------------------------- */
/*      OpenAjax Alliance Table Rules                               */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/** 
 * @rule TABLE_1
 * 
 * @desc If a table is a data table, 
 *       each table cell in the first column must be either a TH element or TD element with scope value of 'col'
 *       and/or each row must contain at least one TH element or a TD with scope value of 'row'
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id       : 'TABLE_1', 
   lastUpdated   : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_header','is_th','scope','header_content'],
   language    : "",
   enabled     : true,
   validateParams : {}, 
   validate    : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var te;
     var info;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table) {
     
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
      
             info = te.headerCellsInFirstRow(); 

             if (info.count && info.total && info.count == info.total) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.count]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NOT_ALL_HEADERS', [info.count, info.total]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }   
       } // end loop
     }   
   } // end valifdation function
 },
 
/** 
 * @rule TABLE_2 
 *
 * @desc A data table should have a caption element with content.
 *
 * @group Table Rule 
 * 
 * @updated 2011-10-11  
 */
 { id       : 'TABLE_2', 
   lastUpdated   : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['caption'],
   language    : "",
   enabled     : true,
   validateParams : {}, 
   validate    : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     var i;   
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.caption && te.caption.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.caption]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_CAPTION_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);     
         }
       } // end loop
     } 
   } // end validation function
 },
 
/**
 * @rule TABLE_3
 *
 * @desc If a table is a data table, a data table should have a summary attribute with content.
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */

 { id             : 'TABLE_3', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     var i;   
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
           
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.summary && te.summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.summary]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_SUMMARY_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);   
         }  
       } // end loop
     } 
   } // end validation function
 },
 
/**
 * @rule TABLE_4
 *
 * @desc    If a table has both a caption element/aria-labelledby attribute and 
 *          a summary/aria-describedby attribute, 
 *          the summary content must be unique from the caption content 
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 *
 * =============================================================== */
 
 { id              : 'TABLE_4', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_th'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

	 var i;   
     var te;
     var tc;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
      
         if (te.is_data_table) {
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
             if ((te.summary && te.summary.length > 0) && (te.caption && te.caption.length > 0)) {
               if (te.summary !== te.caption) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_UNIQUE', []);     
               }
               else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NOT_UNIQUE', []);     
               }
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }  
       } // end loop
     }
   } // end valifdation function
 },

/** 
 * @rule TABLE_5
 *
 * @desc    Each data table must include column and/or row headers:  
 *          The first cell in each column must be a th element,
 *          and/or each row must contain at least one th element.
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 *
 * =============================================================== */
 
 { id              : 'TABLE_5', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_th'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
     var info;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table) {
     
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
      
             info = te.headerCellsInFirstRow(); 

             if (info.th_count) {
             
               if (info.total && info.th_count == info.total) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.th_count]);     
               } 
               else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', [info.th_count, info.total]);
               } 
             }  
             else {
               info = te.headerCellsInFirstColumn();
               
               if (info.th_count && info.total && info.th_count == info.total) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.th_count]);     
               
               } else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', [info.th_count, info.total]);
               }     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }   
       } // end loop
     } 
  } // end valifdation function
},
/**
 * @rule TABLE_6
 *
 * @desc    Each TH element with content in a complex table 
 *          must have an id attribute, whose id value must be unique 
 *          on the page
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id              : 'TABLE_6', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_header','dom_element.id'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i,j,k;
     var te;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var cells;
     var cell;
     var last_cell = null;
     
     var max_row;
     var max_column;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_complex_data_table) {

           cells       = te.cells;  
           max_row     = te.max_row;
           max_column  = te.max_column;

           for(j=0; j<max_row; j++) {
           
             for(k=0; k<max_column; k++) {
               
               cell = cells[j][k];
               
               if (!cell || !cell.is_th || last_cell === cell) break;
               
               if (cell.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
                
                 if (cell.cell_content.length !== 0) {                 
                 
                   if (cell.dom_element.id_unique == OpenAjax.a11y.ID.NOT_UNIQUE) {
                     rule_result.addResult(rule_result.rule_severity, cell, 'MESSAGE_ID_NOT_UNIQUE', [cell.dom_element.id]);     
                   }
                   else {
                     if (cell.dom_element.id_unique == OpenAjax.a11y.ID.NOT_DEFINED) {
                       rule_result.addResult(rule_result.rule_severity, cell, 'MESSAGE_ID_NOT_DEFINED', []);     
                     }
                     else {
                       rule_result.addResult(SEVERITY.PASS, cell, 'MESSAGE_PASS', []);    
                     }                     
                   }
                 }
                 else {
                   rule_result.addResult(SEVERITY.NA, cell, 'MESSAGE_NO_CONTENT', []);    
                 }
               }
               else {
                 rule_result.addResult(SEVERITY.NA, cell, 'MESSAGE_HIDDEN', []);     
               }
               
               last_cell = cell;

             }  
           }
         }
       } // end loop
     } 
   } // end valifdation function
 },

/**
 * @rule TABLE_7
 *
 * @desc  If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id              : 'TABLE_7', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['headers'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i, j, k ;   
     var te;
     var te_row;
     var te_row_len;
     
     var cell;
     var last_cell;
   
     var count;
     var content;
   
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
     
         if (te.is_complex_data_table && 
            (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
     
           count = 0;
           
           for (j=0; j<te.max_row; j++) {
           
             te_row = te.cells[j];
             te_row_len = te_row.length;
             
             for (k=0; k<te_row_len; k++) {
              
               cell = te_row[k];
              
               if (cell && (cell != last_cell) && !cell.is_header && cell.cell_content && cell.cell_content.length) {  
              
                 if (!cell.headers || !cell.headers_array || cell.headers_array.length === 0) count++;
         
               } 
               
               last_cell = cell;

             }  // end loop
           }  // end loop      
           
           if (count === 0) {      
             rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);                
           }
           else {
             rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_MISSING_HEADERS', [count]);                
           }

         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);          
         }
       } // end loop
     } 
   } // end valifdation function
 },

/**
 * @rule TABLE_8
 *
 * @desc   If a table is a complex data table, it must have a summary attribute with content.
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_8', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_complex_data_table) {
       
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
       
             if (te.summary && te.summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);
             } 
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', []);
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);
           } 
         }
       }
     }    
  } // end valifdation function
},

/**
 * @rule TABLE_9
 *
 * @desc  If there is more than one data table on a page, each data table must have a 
 *         summary attribute with content that is unique on the page
 *
 * @group Table Rule
 *  
 * @updated 2011-10-11 
 */
 { id             : 'TABLE_9', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
       
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     var summaries = [];
     var summaries_len;
     var item;
     var i, j;   
     var s1, s2;
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {

       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table && (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
      
           item = {};
           item.index = i;
           item.summary = te.summary;
           item.summary_for_comparison = te.summary_for_comparison;
           item.unique = true;
           if (item.summary && item.summary.length) { 
             item.summary = item.summary.toLowerCase().trim();
             summaries.push(item);
           } 
         }
       } // end loop
     } 
   
     summaries_len = summaries.length;
   
     if (summaries_len>1) {
   
       for (i=0; i<summaries_len; i++) {
         s1 = summaries[i];
       
         for (j=(i+1); j<summaries_len; j++) {
           s2 = summaries[j];
       
           if (s1.summary_for_comparison == s2.summary_for_comparison) {
             s1.unique = false;
             s2.unique = false;
             break;
           }
         }
       } // end loop
     
       for (i=0; i<summaries_len; i++) {
         s1 = summaries[i];
        
         if (s1.unique) {
           rule_result.addResult(SEVERITY.PASS, table_elements[s1.index], 'MESSAGE_UNIQUE', [s1.summary]);    
         }
         else {
           rule_result.addResult(rule_result.rule_severity, table_elements[s1.index], 'MESSAGE_NOT_UNIQUE', [s1.summary]);          
         }
       } // end loop
     }
   } // end validation function
 },
 
/**
 * @rule TABLE_10
 *
 * @desc     If there is more than one data table on a page, each data table 
 *           should have a caption element with content that is unique on the page
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_10', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['caption'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
       
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     var captions = [];
     var captions_len;
     var item;
     var i, j;   
     var c1, c2;
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
     
         if (te.is_data_table && (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
      
           item = {};
           item.index   = i;
           item.caption = te.caption;
           item._for_comparison = te.caption_for_comparison;
           item.unique     = true;
           
           if (item.caption && item.caption.length) { 
             captions.push(item);
           }  
         }
       } // end loop
     } 
     captions_len = captions.length;
    
     if (captions_len > 1 ) {
       
       for (i=0; i<captions_len; i++) {
         c1 = captions[i];
       
         for (j=(i+1); j<captions_len; j++) {
           c2 = captions[j];
           
           if (c1.caption_for_comparison == c2.caption_for_comparison) {
             c1.unique = false;
             c2.unique = false;
             break;
           }
         } // end loop
       } // end loop
     
       for (i=0; i<captions_len; i++) {
         c1 = captions[i];
         
         if (c1.unique) {
           rule_result.addResult(SEVERITY.PASS, table_elements[c1.index], 'MESSAGE_UNIQUE', [c1.caption]);    
         }
         else {
           rule_result.addResult(rule_result.rule_severity, table_elements[c1.index], 'MESSAGE_NOT_UNIQUE', [c1.caption]);          
         }
       } // end loop 
     }
     else {
       // there was only one or none data tables
       if (captions_len == 1 && table_elements[0]) {
         rule_result.addResult(SEVERITY.NA, table_elements[0], 'MESSAGE_NA', []);
       }     
     }
   } // end validation function
 },
 
/**
 * @rule TABLE_11
 *
 * @desc     Do not use nested tables more than 1 column wide  
 *           for positioning content outside of landmarks.
 *           Fails with one or more one levels of nesting.
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_11', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {

     function setResultTableChildren(table_elements, severity, message) {
      
       var i;
       var te;
      
       for (i=0; i<table_elements.length; i++) {
         te = table_elements[i];
         
         if (!te.is_data_table) rule_result.addResult(severity, te, message, []);   
         
         if ( te.child_tables && te.child_tables.length) {
           setResultTableChildren(te.child_tables, severity, message);     
         }    
       }    
         
     }

     function checkForTableNesting(table_elements, parent_is_a_nesting_table, count) {
      
       var i;
       var te;
                    
       for (i=0; i<table_elements.length; i++) {
         te = table_elements[i];  
       
         if (te.is_data_table) {
           setResultTableChildren(te.child_tables, SEVERITY.WARNING, 'MESSAGE_LAYOUT_INSIDE_DATA');
         }
         else {           
                      
           if (te.max_column > 1) {
             rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NESTED_LAYOUT', [count]);   
             checkForTableNesting(te.child_tables, true, (count+1));
           }
           else {
             rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_ONE_COLUMN', [te.max_row]);   
             checkForTableNesting(te.child_tables, false, (count+1));             
           }           
         }          
       }        
     }
     
     var SEVERITY = OpenAjax.a11y.SEVERITY;
    
     var i;
     var te;
    
     var child_tables = dom_cache.tables_cache.child_tables;
     var child_tables_len = child_tables.length;
     
     for (i=0; i<child_tables_len; i++) {
       te = child_tables[i];  
       
       if (te.is_data_table) {
         setResultTableChildren(te.child_tables, SEVERITY.WARNING, 'MESSAGE_LAYOUT_INSIDE_DATA');
       }
       else {           
                   
         if (te.max_column > 1) {
           rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_TOP_LEVEL', [te.max_row, te.max_column]);   
           checkForTableNesting(te.child_tables, true, 1);
         }
         else {
           rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_ONE_COLUMN', [te.max_row]);   
           checkForTableNesting(te.child_tables, false, 1);             
         }           
       }          
     }     
     
   }  // end valifdation function
 },
 
/**
 * @rule TABLE_12
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning within a landmark. 
 *           Fails with one or more one levels of nesting.
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_12', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
       
     var tables_elements_len;
     var tables_element;
        
  } // end valifdation function
},
 
/**
 * @rule TABLE_13
 *
 * @desc  If tables are used for layout, verify the content is meaningful when table markup is ignored.
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11
 *
 * =============================================================== */
 { id              : 'TABLE_13', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
        
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements;
    
     var i;   
     var te;
     var tc;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
         
         if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table)  rule_result.addResult(SEVERITY.rule_severity, te, 'MESSAGE_VERIFY', []);
         }
         else {
           rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_HIDDEN', []);
         } 
       }
     }  
   } // end valifdation function
 }  
]); 


    

