/*
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

/** 
 * @namespace OpenAjax
 */

var OpenAjax = OpenAjax || {};
 
/** 
 * @namespace OpenAjax.a11y
 */

OpenAjax.a11y = OpenAjax.a11y || {};

/** 
 * @namespace OpenAjax.a11y.cache
 */

OpenAjax.a11y.cache = OpenAjax.a11y.cache || {};

/**
 * debugging console flags, by default they should be false and only should be true if running in Firefox
 */

/**
 * @constant CONSOLE_MESSAGES
 * @memberOf OpenAjax.a11y
 * @type Boolean
 * @default false
 * @desc Enables or disables messages to be sent to the Firefox Debug console
 */
OpenAjax.a11y.CONSOLE_MESSAGES        = true;

/**
 * @constant LOG_MESSAGES_TO_CONSOLE
 * @memberOf OpenAjax.a11y
 * @type Boolean
 * @default false
 * @desc Enables or disables logging messages to be sent to the Firefox Debug console
 */
OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE = false;

/** 
 * @constant SUPPORTS_EVENT_ANALYSIS
 * @memberOf OpenAjax.a11y
 * @type Boolean
 * @default false
 * @desc Supports event handler enumeration
 *       the default should be false, set to true in your own code if 
 *       you think you can support it 
 *       NOTE: Current support is only available for Firefox 
 */
OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS = false;  

/**
 * @constant URL_TESTING_ENABLED
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 * @default false
 * @desc Enable or disable testing of broken links
 *       the default should be false, due to performance issues
 *       of testing links
 */
OpenAjax.a11y.URL_TESTING_ENABLED  = false;  

/**
 * @constant SUPPORTS_URL_TESTING
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 *
 * @default false
 *
 * @desc If the user agent supports URL testing this should be set to 'true'
 */
OpenAjax.a11y.SUPPORTS_URL_TESTING = false;  

// DOM Node Type Constants 

var NODE_TYPE = {
  ELEMENT   : 1,
  ATTRIBUTE : 2,
  TEXT      : 3,
  COMMENT   : 8,
  DOCUMENT  : 9
};


/**
 * @constant DEFAULT_PREFS
 * @memberOf OpenAjax.a11y
 * @type Object
 * @desc Default setting for consumers of the OpenAjax cache 
 */

OpenAjax.a11y.DEFAULT_PREFS = OpenAjax.a11y.DEFAULT_PREFS || {
  RULESET_ID   : "WCAG20_ARIA_TRANS",
  WCAG20_LEVEL : 3,
  BROKEN_LINKS : false
};

/**
 * @constant CACHE_NAMES
 * @memberOf OpenAjax.a11y
 * @type Array
 * @desc Property names of specialized caches 
 */

OpenAjax.a11y.CACHE_NAMES = ['abbreviations_cache', 
                             'color_contrast_cache', 
                             'controls_cache', 
                             'headings_landmarks_cache',
                             'title_main_cache',
                             'images_cache',
                             'languages_cache',
                             'links_cache',
                             'lists_cache',
                             'media_cache',
                             'tables_cache'];
  
/**
 * @constant PROGRESS
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Progress log constants
 *
 * @example
 * OpenAjax.a11y.PROGRESS.UNDEFINED  
 * OpenAjax.a11y.PROGRESS.START      
 * OpenAjax.a11y.PROGRESS.CACHE_START
 * OpenAjax.a11y.PROGRESS.CACHE_END  
 * OpenAjax.a11y.PROGRESS.REQUIREMNT    
 * OpenAjax.a11y.PROGRESS.RULE          
 * OpenAjax.a11y.PROGRESS.COMPLETE   
 */
OpenAjax.a11y.PROGRESS = OpenAjax.a11y.PROGRESS || {
  UNDEFINED   : 0,
  START       : 1,
  CACHE_START : 2,
  CACHE_END   : 3,
  REQUIREMNT  : 4,   
  RULE        : 5,   
  COMPLETE    : 6   
};

/**
 * @constant WCAG20_LEVEL
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the level of importance of a success criteria 
 * @example
 * OpenAjax.a11y.WCAG20_LEVEL.A
 * OpenAjax.a11y.WCAG20_LEVEL.AA
 * OpenAjax.a11y.WCAG20_LEVEL.AAA
 */ 
OpenAjax.a11y.WCAG20_LEVEL = OpenAjax.a11y.WCAG20_LEVEL || {
  A   : 1,
  AA  : 2,
  AAA : 3
};


/**
 * @constant RULE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines a required or recommended rule 
 *
 * @example
 * OpenAjax.a11y.RULE.REQUIRED               
 * OpenAjax.a11y.RULE.RECOMMENDATION               
 * OpenAjax.a11y.RULE.CONDITIONAL               
 */
OpenAjax.a11y.RULE = OpenAjax.a11y.RULE || {
  REQUIRED       : 1,
  RECOMMENDATION : 2,
  CONDITIONAL    : 3
};

/**
 * @constant SEVERITY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Severity of a rule results 
 *
 * @example
 * OpenAjax.a11y.SEVERITY.NA               
 * OpenAjax.a11y.SEVERITY.PASS             
 * OpenAjax.a11y.SEVERITY.FAIL             
 * OpenAjax.a11y.SEVERITY.VIOLATION        
 * OpenAjax.a11y.SEVERITY.RECOMMENDATION   
 * OpenAjax.a11y.SEVERITY.MANUAL_CHECK
 * OpenAjax.a11y.SEVERITY.WARNING          
 * OpenAjax.a11y.SEVERITY.HIDDEN           
 * OpenAjax.a11y.SEVERITY.INFORMATIONAL    
 * OpenAjax.a11y.SEVERITY.NOT_EVALUATED    
 */
OpenAjax.a11y.SEVERITY = OpenAjax.a11y.SEVERITY || {
  NA             : 0,
  PASS           : 1,
  FAIL           : 2,
  VIOLATION      : 2,
  RECOMMENDATION : 3,
  MANUAL_CHECK   : 4,
  WARNING        : 5,  // This is some type of coding inconsistency that may be related to accessibility
  HIDDEN         : 6,  // Content is hidden and not tested for accessibility
  INFORMATIONAL  : 7,
  NOT_EVALUATED  : 8,
  NONE           : 9
};

/**
 * @constant SEVERITY_STYLE
 * @memberOf OpenAjax.a11y
 * @type Array
 * @desc Severity of a rule results 
 *
 * @example
 * OpenAjax.a11y.SEVERITY_STYLE[OpenAjax.a11y.SEVERITY.PASS];
 */
OpenAjax.a11y.SEVERITY_STYLE = [
  "na",
  "passed",
  "violation",
  "recommendation",
  "manual_check",
  "warning",
  "hidden",
  "informational",
  "not_evaluated",
  "none"
  ];

/**
 * @constant PRIORITY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Priority of satisfying a rule within a requirement, maybe usefull to developers when there are a high number of violations
 *
 * @example
 * OpenAjax.a11y.PRIORITY.UNDEFINED
 * OpenAjax.a11y.PRIORITY.P1
 * OpenAjax.a11y.PRIORITY.P2  
 * OpenAjax.a11y.PRIORITY.P3  
 */
OpenAjax.a11y.PRIORITY = OpenAjax.a11y.PRIORITY || {
  UNDEFINED : 0,
  P1        : 1,
  P2        : 2,
  P3        : 3
};

/** 
 * @constant STATUS
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Status of rule acceptance for inclusion in the public ruleset
 *
 * @example
 * OpenAjax.a11y.STATUS.UNDEFINED
 * OpenAjax.a11y.STATUS.PROPOSED 
 * OpenAjax.a11y.STATUS.ACCEPTED
 * OpenAjax.a11y.STATUS.DEPRICATED
 */
OpenAjax.a11y.STATUS = OpenAjax.a11y.STATUS || {
  UNDEFINED  : 0,
  PROPOSED   : 1,
  ACCEPTED   : 2,
  DEPRICATED : 3
};

/**
 * @constant REFERENCES
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Types of reference for supplemential materials to help people understand an accessibility requirement and
 *       how to improve the accessibility
 * @example
 * OpenAjax.a11y.REFERENCES.UNKNOWN          
 * OpenAjax.a11y.REFERENCES.REQUIREMENT      
 * OpenAjax.a11y.REFERENCES.TECHNIQUE        
 * OpenAjax.a11y.REFERENCES.MANUAL_CHECK
 * OpenAjax.a11y.REFERENCES.BEST_PRACTICE 
 * OpenAjax.a11y.REFERENCES.AUTHORING     
 * OpenAjax.a11y.REFERENCES.OTHER         
 */ 
OpenAjax.a11y.REFERENCES = OpenAjax.a11y.REFERENCES || {
  UNKNOWN                  : 0,
  REQUIREMENT              : 1,
  TECHNIQUE                : 2,
  MANUAL_CHECK        : 3,
  BEST_PRACTICE            : 4,
  AUTHORING                : 5,
  OTHER                    : 6
};

/**
 * @constant VISIBILITY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Visbility of an item in graphical renderings and to asssitive technologies
 * @example
 * OpenAjax.a11y.VISIBILITY.UNKNOWN
 * OpenAjax.a11y.VISIBILITY.HIDDEN 
 * OpenAjax.a11y.VISIBILITY.VISIBLE
 */
OpenAjax.a11y.VISIBILITY = OpenAjax.a11y.VISIBILITY || {
  UNKNOWN : 1,
  HIDDEN  : 2,
  VISIBLE : 3
};

/**
 * @constant ID
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc ID of an item 
 * @example
 * OpenAjax.a11y.ID.NOT_DEFINED
 * OpenAjax.a11y.ID.UNIQUE
 * OpenAjax.a11y.ID.NOT_UNIQUE
 */
OpenAjax.a11y.ID = OpenAjax.a11y.ID || {
  NOT_DEFINED  : 1,
  UNIQUE       : 2,
  NOT_UNIQUE   : 3
};


/**
 * @constant LIST
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the lists cache 
 * @example
 * OpenAjax.a11y.LIST.CONTAINER
 * OpenAjax.a11y.LIST.ITEM
 * OpenAjax.a11y.LIST.LANDMARK
 */ 
OpenAjax.a11y.LIST = OpenAjax.a11y.LIST || {
  UNDEFINED : 0,
  CONTAINER : 1,
  ITEM      : 2,
  LANDMARK  : 3
};

/**
 * @constant MEDIA
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to the probability of being media object with audio and video 
 * @example
 * OpenAjax.a11y.MEDIA.UNDEFINED
 * OpenAjax.a11y.MEDIA.NO
 * OpenAjax.a11y.MEDIA.MAYBE
 * OpenAjax.a11y.MEDIA.YES 
 */ 
OpenAjax.a11y.MEDIA = OpenAjax.a11y.MEDIA || {
  UNDEFINED : 0,
  NO        : 1,
  MAYBE     : 2,
  YES       : 3
};

/**
 * @constant URL_RESULT
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Staus of rule acceptance for inclusion in the public ruleset
 * @example
 * OpenAjax.a11y.URL_RESULT.INVALID
 * OpenAjax.a11y.URL_RESULT.VALID
 * OpenAjax.a11y.URL_RESULT.NOT_TESTED
 * OpenAjax.a11y.URL_RESULT.ERROR 
 */
OpenAjax.a11y.URL_RESULT = OpenAjax.a11y.URL_RESULT || {
  INVALID    :  1,
  VALID      :  2,
  NOT_TESTED :  3,
  ERROR      :  4
};

/**
 * @constant SOURCE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc What markup was used as the source for calculating the accessible name  
 * @example
 * OpenAjax.a11y.SOURCE.NONE
 * OpenAjax.a11y.SOURCE.LABEL_REFERENCE
 * OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION
 * OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE
 * OpenAjax.a11y.SOURCE.BUTTON_TYPE
 * OpenAjax.a11y.SOURCE.CHILD_TEXT_NODES
 * OpenAjax.a11y.SOURCE.ARIA_LABELLEDBY
 * OpenAjax.a11y.SOURCE.ARIA_LABEL        
 */
OpenAjax.a11y.SOURCE = OpenAjax.a11y.SOURCE || {
  NONE                 : 1,
  LABEL_REFERENCE      : 2,
  LABEL_ENCAPSULATION  : 3,
  TITLE_ATTRIBUTE      : 4,
  VALUE_ATTRIBUTE      : 5,
  ALT_ATTRIBUTE        : 6,
  BUTTON_TYPE          : 7,
  CHILD_TEXT_NODES     : 8,
  ARIA_LABELLEDBY      : 9,
  ARIA_LABEL           : 10
};

/**
 * @constant CONTROL_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Indentify the cache control element type 
 *
 * @example
 * OpenAjax.a11y.CONTROL_TYPE.UNKNOWN  
 * OpenAjax.a11y.CONTROL_TYPE.BUTTON   
 * OpenAjax.a11y.CONTROL_TYPE.FIELDSET 
 * OpenAjax.a11y.CONTROL_TYPE.FORM     
 * OpenAjax.a11y.CONTROL_TYPE.HIDDEN   
 * OpenAjax.a11y.CONTROL_TYPE.IMAGE    
 * OpenAjax.a11y.CONTROL_TYPE.LABEL    
 * OpenAjax.a11y.CONTROL_TYPE.OPTION   
 * OpenAjax.a11y.CONTROL_TYPE.OPTGROUP   
 * OpenAjax.a11y.CONTROL_TYPE.PASSWORD 
 * OpenAjax.a11y.CONTROL_TYPE.RESET    
 * OpenAjax.a11y.CONTROL_TYPE.SELECT   
 * OpenAjax.a11y.CONTROL_TYPE.SUBMIT   
 * OpenAjax.a11y.CONTROL_TYPE.TEXT     
 * OpenAjax.a11y.CONTROL_TYPE.TEXTAREA 
 */
OpenAjax.a11y.CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE || {
  UNKNOWN  : 1,
  BUTTON   : 2,
  FIELDSET : 3,
  FORM     : 4,
  HIDDEN   : 5,
  IMAGE    : 6,
  LABEL    : 7,
  OPTION   : 8,
  OPTGROUP : 9,
  PASSWORD : 10,
  RESET    : 11,
  SELECT   : 12,
  SUBMIT   : 13,
  TEXT     : 14,
  TEXTAREA : 15
};

/**
 * @constant MAIN
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for MAIN cache elements  
 * @example
 * OpenAjax.a11y.MAIN.ROLE_MAIN
 * OpenAjax.a11y.MAIN.H1_ELEMENT
 * OpenAjax.a11y.MAIN.TITLE_ELEMENT   
 */
OpenAjax.a11y.MAIN = OpenAjax.a11y.MAIN || {
  ROLE_MAIN      :  1,
  H1_ELEMENT     :  2,
  TITLE_ELEMENT  :  3
};

/**
 * @constant TABLE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for TABLE cache elements
 * @example
 * OpenAjax.a11y.TABLE.TABLE_ELEMENT   
 * OpenAjax.a11y.TABLE.CAPTION_ELEMENT 
 * OpenAjax.a11y.TABLE.THEAD_ELEMENT   
 * OpenAjax.a11y.TABLE.TBODY_ELEMENT   
 * OpenAjax.a11y.TABLE.TR_ELEMENT      
 * OpenAjax.a11y.TABLE.TH_ELEMENT      
 * OpenAjax.a11y.TABLE.TD_ELEMENT      
 */
OpenAjax.a11y.TABLE = OpenAjax.a11y.TABLE || {
  TABLE_ELEMENT   :  1,
  CAPTION_ELEMENT :  2,
  THEAD_ELEMENT   :  3,
  TBODY_ELEMENT   :  4,
  TR_ELEMENT      :  5,
  TH_ELEMENT      :  6,
  TD_ELEMENT      :  7
};

/**
 * @constant LINK_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants for LINK cache elements
 * @example
 * OpenAjax.a11y.LINK_TYPE.EMPTY
 * OpenAjax.a11y.LINK_TYPE.OTHER
 * OpenAjax.a11y.LINK_TYPE.INTERNAL
 * OpenAjax.a11y.LINK_TYPE.HTTP
 * OpenAjax.a11y.LINK_TYPE.HTTPS
 * OpenAjax.a11y.LINK_TYPE.FTP
 * OpenAjax.a11y.LINK_TYPE.FTS
 * OpenAjax.a11y.LINK_TYPE.FILE
 * OpenAjax.a11y.LINK_TYPE.JAVASCRIPT
 * OpenAjax.a11y.LINK_TYPE.MAILTO
 * OpenAjax.a11y.LINK_TYPE.TARGET
 */
OpenAjax.a11y.LINK_TYPE = OpenAjax.a11y.LINK_TYPE || {
  EMPTY      : 0,
  OTHER      : 1,
  INTERNAL   : 2,
  HTTP       : 3,
  HTTPS      : 4,
  FTP        : 5,
  FTPS       : 6,
  FILE       : 7,
  JAVASCRIPT : 8,
  MAILTO     : 9,
  TARGET     : 10
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
/*        Utilities and String Extensions                           */
/* ---------------------------------------------------------------- */

/** 
 * @namespace OpenAjax.a11y.util
 */

OpenAjax.a11y.util = OpenAjax.a11y.util || {};


/**
 * @function urlExists
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Determines if a URL exits
 *
 * @param {String} url - url to test if it exists
 *
 * @return  Number  
 */
 
OpenAjax.a11y.util.urlExists = function (url) {

 if (OpenAjax.a11y.SUPPORTS_URL_TESTING && OpenAjax.a11y.URL_TESTING_ENABLED) {
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

/**
 * @function RGBToHex
 * @memberOf OpenAjax.a11y.util
 * 
 * @desc Converts an RGB color to Hex values
 *
 * @param {String} rgb_color - RGB Color
 * 
 * @return  String 
 */
 
OpenAjax.a11y.util.RGBToHEX = function( rgb_color ) {

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
};


/** 
 * @namespace String
 */

 /**
 * @function isInteger
 * @memberOf String
 */

// string utilities
if (typeof String.isInteger == "undefined") {
 String.prototype.isInteger = function() {
  return this.match(/^\d+$/) !== null;
 };
}
	
/**
 * @function trim
 * @memberOf String
 */
 
if (typeof String.trim == "undefined") {
 String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
 };
}

/**
 * @function normalizeSpace
 * @memberOf String
 */

if (typeof String.normalizeSpace == "undefined") {
 String.prototype.normalizeSpace = function () {
  // Replace repeated spaces, newlines and tabs with a single space
  return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
 }; // end function normalizeSpace
}

/**
 * @function capitalize
 * @memberOf String
 */
 
if (typeof String.capitalize == "undefined") {
 String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
 };
}



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
/*                      AbbreviationsCache                          */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor AbbreviationsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for abbreviations cache object which contains a list of 
 *    abbreviation items representing the abbreviations defined  
 *    in a document. The item also contains a list of all the 
 *    dom element objects that share the same abbreviation 
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {String}   sort_property   - Property of abbreviation item that the list is sorted on  
 * @property {Boolean}  sort_ascending  - true if list is sorted by ascending values, otherwsie false 
 *
 * @property {Array}   abbreviation_items  - List of abbreviation items 
 * @property {Number}  length              - Number of abbreviation items in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.AbbreviationsCache = function (dom_cache) {

  this.dom_cache  = dom_cache;
  this.up_to_date = false;
  
  this.abbreviation_items = [];
  this.length = 0;
 
  this.sort_property  = 'abbreviation_text';
  this.sort_ascending = true;
  
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
 
};

/**
 * @method addAbbreviationItem
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Adds a DOM Element object with an abbreviation to the abbreviation item list.
 *       If the abreviation item does not exist the function will create one
 *
 * @param {DOMElement}  dom_element  - dom element to add to a abbreviation list
 */

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

/**
 * @deprecated getAbbreviationItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns the abbreviation item with the cache id
 *
 * @param {String}  cache_id  - cache id of the abbreviation item object
 *
 * @return {AbbreviationItem} Returns abbreviation item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getAbbreviationItemByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns the abbreviation item with the cache id
 *
 * @param {String}  cache_id  - cache id of the abbreviation item object
 *
 * @return {AbbreviationItem} Returns abbreviation item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getItemByCacheId = function (cache_id) {

  var i, j;
  var ai, de;
  var dom_elements, dom_elements_len;
  
  var abbreviation_items     = this.abbreviation_items;
  var abbreviation_items_len = abbreviation_items.length;

  if (cache_id && cache_id.length) {  
  
    for (i = 0; i < abbreviation_items_len; i++) {
      ai = abbreviation_items[i];
    
      if (ai.cache_id == cache_id) return ai;
      
      dom_elements     = ai.dom_elements;
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
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Empties all the abbreviation items from the cache 
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.emptyCache = function () {

 this.abbreviation_items.length = 0;
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Updates the AbbreviationsCache object with information from a DOMElement object
 *    This is used during the creation of the cache and is used by the functions for
 *    either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the abbreviations cache
 */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'abbr') ||
   (dom_element.tag_name == 'acronym')) {

   this.addAbbreviationItem(dom_element);
   
 }
 
};

/**
 * @method traverseDOMElementsForAbbreviations
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.traverseDOMElementsForAbbreviations = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.updateCacheItems(dom_element);
  
  for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
   this.traverseDOMElementsForAbbreviations(dom_element.child_dom_elements[i]);
  } // end loop
  
 }  
  
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 *    This function is used to update the abbreviation cache 
 *    when needed by a rule, it sets the up to date flag when done
 */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating abbreviation cache.");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForAbbreviations(children[i]);
 }  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed abbreviation cache update, number of cache items is " + this.length);

 this.up_to_date = true;
 
};

/**
 * @method sortAbbreviationItems
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Sorts abbreviations by abbreviation_text property
 *
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

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

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationsCache
 *
 * @desc Returns a text string representation of the abbreviation cache object 
 *
 * @return {String} Returns string represention the abbreviations cache object
 */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.toString = function () {

 var str ="\n\nAbbreviation Information\n";

 var list_length = this.abbreviation_items.length;
 
 for (var i=0; i < list_length; i++ ) {
  str += this.abbreviation_items[i].toString();  
 } // end loop

 return str;
};

/* ---------------------------------------------------------------- */
/*                      AbbreviationItem                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor AbbreviationItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for abbreviation item object which contains information
 *       about dom elements that share the same abbreviation 
 * 
 * @param  {String}  abbreviation  - text of abbreviation
 *         
 * @property  {String}  cache_id            - String that uniquely identifies the cache element in the DOMCache
 * @property  {String}  abbreviation_text   - text of abbreviation
 *
 * @property  {Array}   dom_elements  - List of dom elements associated with the abbreviation 
 * @property  {Number}  count         - Number of dom elements that share this abbreviation
 */
 
OpenAjax.a11y.cache.AbbreviationItem = function (abbreviation) {

  this.cach_id = "";
  
  this.abbreviation_text = abbreviation;
  
  this.dom_elements = [];
  this.count = 0;
   
}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getResultRules = function () {
  return this.dom_elements[0].getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getStyle = function () {

  return this.dom_elements[0].getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getAttributes = function (unsorted) {

  return [];
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getCacheProperties = function (unsorted) {

  return [];
  
};


/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getEvents = function () {
   
  return [];
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns a text string representation of the abbreviation item object 
 *
 * @return {String} Returns string represention the abbreviation item object
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.toString = function () {

 return "Abbreviation: " + abbreviation_text; 
};



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
 * @desc Adds a DOM text object information to a color contrast item in the color contrast
 *       cache, if it does not match any of the current color contrast items it will create a
 *       new color contrast item.
 *
 * @param {DOMText}  dom_text_node  - dom text_node to add to color contrast list
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.addColorContrastItem = function (dom_text_node) {
  
  var i;
  
  var cci;
  var cs;
  var color_contrast_items_len = this.color_contrast_items.length;
  var found = false;
  
  for (i = 0; i < color_contrast_items_len; i++) {
    cci = this.color_contrast_items[i];
    cs = dom_text_node.computed_style;
    
    // OpenAjax.a11y.console("color compare " + dom_text_node.computed_style.color + " with " + item.color );
    
    if ( cci && 
         cci.color &&
         (cs.color_hex     == cci.color)         &&
         (cs.is_large_font == cci.is_large_font) &&
         (cs.background_color_hex == cci.background_color) &&
         ((cs.background_image == 'none' && cci.background_image == 'none') ||
          ((cs.background_image    == cci.background_image) &&
           (cs.background_repeat   == cci.background_repeat) &&
           (cs.background_position == cci.background_position)))) {
      
      cci.dom_text_nodes.push(dom_text_node);
      cci.node_count = cci.dom_text_nodes.length;
      
      cci.addToCharacterCount(dom_text_node.text_length);
      
      found = true;
      break;
    }
  }
  // end loop
  
  if (!found) {
    cs = dom_text_node.computed_style;
    
    cci = new OpenAjax.a11y.cache.ColorContrastItem(cs.font_family, cs.font_size, cs.font_weight, cs.color_hex, cs.background_color_hex, cs.background_image, cs.background_repeat, cs.background_position, cs.is_large_font, cs.color_contrast_ratio, dom_text_node.character_count);
    
    cci.dom_text_nodes.push(dom_text_node);
    cci.node_count = cci.dom_text_nodes.length;
    
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
  var cci, dtn;
  var dom_text_nodes, dom_text_nodes_len;

  var color_contrast_items     = this.color_contrast_items;
  var color_contrast_items_len = color_contrast_items.length;
  
  if (cache_id && cache_id.length) {
  
    for (i = 0; i < color_contrast_items_len; i++) {
    
      cci = color_contrast_items[i];
      
      if (this.color_contrast_items[i].cache_id == cache_id) {
        return this.color_contrast_items[i];
      }

      dom_text_nodes     = cci.dom_text_nodes;
      dom_text_nodes_len = dom_text_nodes.length;
      
      for (j = 0; j < dom_text_nodes_len; j++ ) {
        dtn = dom_text_nodes[j];
        if (dtn.cache_id == cache_id) return dtn;
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
 * @param {DOMText}  dom_text  - DOM text  object to add to the color contrast cache
 */

OpenAjax.a11y.cache.ColorContrastCache.prototype.updateCacheItems = function (dom_text_node) {

  var tn;

  if (dom_text_node.parent_element) {
    tn =  dom_text_node.parent_element.tag_name;
    
    if (tn != 'script' && tn != 'object' && tn != 'style') {
      this.addColorContrastItem(dom_text_node);
    }
  }  
    
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
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForColorContrast(dom_element.child_dom_elements[i]);
    }
    // end loop
  }
  else {
    this.updateCacheItems(dom_element);
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
  
  this.dom_text_nodes = [];
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
  return this.dom_text_nodes[0].getResultRules();
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
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
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
  var dtn;
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  last_severity_value = SEVERITY.NONE;

  for (i = 0; i < this.dom_text_nodes.length; i++ ) {
  
    dtn = this.dom_text_nodes[i];

    if (last_severity_value == SEVERITY.NONE && 
        hasRule(dtn.rules_hidden, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
      a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
      last_severity_value = SEVERITY.HIDDEN;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN) &&
        hasRule(dtn.rules_passed, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
      a.style  = SEVERITY_STYLE[SEVERITY.PASS];
      last_severity_value = SEVERITY.PASS;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN ||
         last_severity_value == SEVERITY.PASS) &&
        hasRule(dtn.rules_recommendations, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
      a.style  = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
      last_severity_value = SEVERITY.RECOMMENDATION;
    }

    if ((last_severity_value == SEVERITY.NONE ||
         last_severity_value == SEVERITY.HIDDEN ||
         last_severity_value == SEVERITY.PASS ||
         last_severity_value == SEVERITY.RECOMMENDATION) &&
        hasRule(dtn.rules_manual_checks, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
      a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
      last_severity_value = SEVERITY.MANUAL_CHECK;
    }

    if (hasRule(dtn.rules_violations, color_rules)) {
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
  str += "  Number of Nodes   : " + this.dom_text_nodes.length + "\n\n";
  
  return str;
};
/*
 * Copyright 2011, 2012 OpenAjax Alliance
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
 * @constructor ControlInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ControlInfo object for preserving the current control information 
 *        when traversing the DOM for form control information
 *
 * @param {ControlInfo} control_info - Current ControlInfo object
 *
 * @property {Control Object}   control_element  - Parent Control Object (if any)
 * @property {FieldsetElement}  fieldset_element - Parent FieldsetElement (if any)
 * @property {SelectElement}    select_element   - Parent SelectElement (if any)
 * @property {LabelElement}     label_element    - Parent LabelElement (if any)
 * @property {FormElement}      form_element     - Parent FormElement (if any)
 */

OpenAjax.a11y.cache.ControlInfo = function (control_info) {
 
 if (control_info) {
  this.control_element  = control_info.control_element;
  this.fieldset_element = control_info.fieldset_element;
  this.select_element   = control_info.select_element;
  this.label_element    = control_info.label_element; 
  this.form_element     = control_info.form_element; 
 }
 else {
  this.control_element  = null;
  this.fieldset_element = null;
  this.select_element   = null;
  this.label_element    = null;
  this.form_element     = null;
 } 
}; 

/* ---------------------------------------------------------------- */
/*                       ControlsCache                              */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor ControlsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc ControlsCache is the constructor for lists of control cache element objects and
 *       the root of a tree representation of the control cache element relationships
 *       
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the controls in the document 
 *
 * @property {Array}    control_elements      - List of all the InputElement, TextareaElement, ButtonElement, SelectElement, 
 *                                              OptionElements and OptgroupElement objects in the cache
 *
 * @property {Number}   control_length        - Length of the control_elements array and used in calculating cache IDs
 *
 * @property {Array}    label_elements        - List of all the LabelElement objects in the cache
 * @property {Number}   label_length          - Length of the label_elements array and used in calculating cache IDs
 *
 * @property {Array}    fieldset_elements     - List of all the FieldsetElement objects in the cache
 * @property {Number}   fieldset_length       - Length of the Fireldset_elements array and used in calculating cache IDs
 *
 * @property {Array}    form_elements         - List of all the FormElement objects in the cache
 * @property {Number}   form_length           - Length of the form_elements array and used in calculating cache IDs
 *
 * @property {String}   sort_property         - The property the list of control element object is currenlty sorted by
 * @property {Boolean}  ascending             - true if the list is ascending order or false if descending
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this
 */

OpenAjax.a11y.cache.ControlsCache = function (dom_cache) {

  this.dom_cache     = dom_cache;
  this.up_to_date    = false;
 
  this.child_cache_elements  = [];
 
  this.control_elements = [];
  this.control_length  = 0;
  
  this.label_elements  = [];
  this.label_length   = 0;
  
  this.fieldset_elements = [];
  this.fieldset_length = 0;
  
  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;
 
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
 
};

/**
 * @method addChildControl
 * 
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 * 
 * @desc Adds a cache control element to the root tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (control_element) {

  if (control_element) {
    this.child_cache_elements.push(control_element); 
  }  
   
}; 

/** 
 * @method addControlElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a cache control element to the list of controls array and generates a cache_id for each control 
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 *
 * @return  {Number} Returns the number of control objects in the control_elements array
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

  return this.control_length;

};

/**
 * @method addLabelElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add LabelElement object to list of label elements and generates a cache id for the object
 *
 * @param  {LabelElement} label_element  - LabelElement object to add 
 *
 * @return  Nothing 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabelElement = function (label_element) {

  if (label_element) {
    this.label_length += 1;
    label_element.document_order = this.label_length;
    label_element.cache_id = "label_" + this.label_length;
    this.label_elements.push( label_element );
  } 

};

/**
 * @method addFormElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add a FormElement object to the list of form elements and generates a cache id for the object 
 *
 * @param  {FormElement} form_element  - FormElement to add 
 *
 * @return {Number} Returns number of FormElement objects in the list of form elements
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
 * @method addFieldsetElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a FieldsetElement to the list of fieldset elements and generates a cache id for the object 
 *
 * @param  {FieldsetElement}  fieldset_element  - FieldsetElement to add 
 *
 * @return {Number} Returns the number of FieldsetElement objects in the list of fieldset elements
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
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Resests the ControlsCache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.emptyCache = function () {

  this.up_to_date    = false;
 
  this.child_cache_elements  = [];
 
  this.control_elements = [];
  this.control_length  = 0;
  
  this.label_elements  = [];
  this.label_length   = 0;
  
  this.fieldset_elements = [];
  this.fieldset_length = 0;
  
  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Updates the ControlsCache object by checking to see if a DOMElement
 *          should be added to the control cache objects
 *  
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo}  control_info  - Information about the current control relationships in the DOM
 *
 * @return {ControlInfo}  Returns updated control info object 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCacheItems = function (dom_element, control_info) {
 
  var be;
  var fe;
  var ie;
  var le;
  var oe;
  var se;
  var te;  
  var we;
  
  var ci = new OpenAjax.a11y.cache.ControlInfo(control_info);

  switch (dom_element.tag_name) {

  case 'form':
    fe = new OpenAjax.a11y.cache.FormElement(dom_element, control_info);

    this.addFormElement(fe); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(fe);   
    }
    else {
      this.addChildControl(fe);     
    }
  
    ci.control_element = fe;
    ci.form_element = fe;
  
    break;

  case 'fieldset':
    fe = new OpenAjax.a11y.cache.FieldsetElement(dom_element, control_info);
  
    this.addFieldsetElement(fe); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(fe);   
    }
    else {
      this.addChildControl(fe);     
    }
  
    ci.control_element = fe;
    ci.fieldset_element = fe;
    break;

  case 'legend':
    le = new OpenAjax.a11y.cache.LegendElement(dom_element, control_info);
    le.label = this.getElementTextContent(le, false);
    le.label_length = le.label.length;

    this.addLabelElement(le); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(le);   
    }
    else {
      this.addChildControl(le);     
    }

    if (control_info.fieldset_element) {
      control_info.fieldset_element.legend_element = le;
    }

    ci.control_element = le;
    break;

  case 'label':
    le = new OpenAjax.a11y.cache.LabelElement(dom_element, control_info);
    le.label = this.getElementTextContent(le, false);
    le.label_length = le.label.length;
    
    this.addLabelElement(le); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(le);   
    }
    else {
      this.addChildControl(le);     
    }
    
    ci.control_element = le;
    ci.label_element  = le;
    break;

  case 'input':
    ie = new OpenAjax.a11y.cache.InputElement(dom_element, control_info);
    
    if (ie.dom_element.node.type.toLowerCase() != "hidden") {
  
      this.addControlElement(ie); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(ie);   
      }
      else {
        this.addChildControl(ie);     
      }
      
      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;   
      }
      
      if (control_info.fieldset_element) {
        control_info.fieldset_element.number_of_controls += 1;   
      }
    } 
  
    break;

  case 'button':
    be = new OpenAjax.a11y.cache.ButtonElement(dom_element, control_info);
    
    this.addControlElement(be); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(be);   
    }
    else {
      this.addChildControl(be);     
    }

    if (control_info.form_element) {
      control_info.form_element.number_of_controls += 1;   
    }

    if (control_info.fieldset_element) {
      control_info.fieldset_element.number_of_controls += 1;   
    }
    
    ci.control_element = be;
    break;

  case 'textarea':
    te = new OpenAjax.a11y.cache.TextareaElement(dom_element, control_info);
  
    this.addControlElement(te); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(te);   
    }
    else {
      this.addChildControl(te);     
    }
    
    if (control_info.form_element) {
      control_info.form_element.number_of_controls += 1;   
    }

    if (control_info.fieldset_element) {
      control_info.fieldset_element.number_of_controls += 1;   
    }
    
    break;

  case 'select':
    se = new OpenAjax.a11y.cache.SelectElement(dom_element, control_info);
  
    this.addControlElement(se); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(se);   
    }
    else {
      this.addChildControl(se);     
    }
    
    if (control_info.form_element) {
      control_info.form_element.number_of_controls += 1;   
    }
  
    if (control_info.fieldset_element) {
      control_info.fieldset_element.number_of_controls += 1;   
    }
    
    ci.select_element = se;
    ci.control_element = se;
    break;

  case 'optgroup':
    oe = new OpenAjax.a11y.cache.OptgroupElement(dom_element, control_info);
  
    if (dom_element.node.label && dom_element.node.label.length) {
      oe.label = dom_element.node.label;  
      oe.label_length = oe.label.length;
    } 
 
    if (control_info.control_element) {
     control_info.control_element.addChildControl(oe);   
    }
    else {
      this.addChildControl(oe);     
    }
 
    ci.control_element = oe;
    break;

  case 'option':
    oe = new OpenAjax.a11y.cache.OptionElement(dom_element, control_info);
  
    oe.label = this.getElementTextContent(oe, false);
    oe.label_length = oe.label.length;

  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(oe);   
    }
    else {
      this.addChildControl(oe);     
    }

    if (control_info.select_element) {
      control_info.select_element.addOption(oe);   
    }

    break;

  default:
  
    break;

  } // end switch

/*
  // check for widgets
  if (dom_element.role) {
  
    widget_element = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
  
  }
*/ 
  return ci;
};

/**
 * @method traverseDOMElementsForControlElements
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses DOMElement objects in the tree to update the controls cache 
 *
 * @param  {DOMElement}  dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo} control_info  - Current control information object that contains information 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.traverseDOMElementsForControlElements = function (dom_element, control_info) {
 
 var i;
 var ci;

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  ci = this.updateCacheItems(dom_element, control_info);
  
  for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
   this.traverseDOMElementsForFormElements(dom_element.child_dom_elements[i], ci);
  } // end loop
  
 }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the DOMElements to update the controls cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the controls cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;
 
 var control_info = new OpenAjax.a11y.cache.ControlInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating control elements cache.");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForControlElements(children[i], control_info);
 }  
 
 this.calculateControlLabels();
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed control elements cache update.");

 this.up_to_date = true;
};


/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getItemByCacheId = function (cache_id) {

  var item = null;
  
  item = this.getControlElementByCacheId(cache_id);
  if (item) return item;

  item = this.getLabelElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFormElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFieldsetElementByCacheId(cache_id);
  
  return item;

};

/**
 * @method getControlElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
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
 * @method getControlElementById
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching id
 *
 * @param  {String }  id  - id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementById = function (id) {

 var i;

 for (i = 0; i < this.control_elements.length; i++) {
  if (this.control_elements[i].dom_element.id == id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * @method getLabelElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the LabelElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of LabelElement object
 *
 * @return {LabelElement}  Returns label element with the cache id if found, otherwise null
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
 * @method getFormElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FormElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FormElement object
 *
 * @return {FormElement}  Returns form element with the cache id if found, otherwise null
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
 * @method getFieldsetElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FieldsetElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FieldsetElement object
 *
 * @return {FieldsetElement}  Returns fieldset element with the cache id if found, otherwise null
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
 * @method getElementTextContent
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the cache to get the text content associated with the label, this will include the 
 *       values of form controls in the label references
 *
 * @param  {LabelElement}  label_element           - LabelElement object to calculate the text content
 * @param  {Boolean}       include_control_values  - True if the values of form controls should be included in 
 *                                                   accessible name calculation
 *
 * @return {String}  Returns the text content of a LabelElement
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
    
    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
     getText( dom_element.child_dom_elements[i]);
    }      
    
   }  
  } 
 } // end function getText

 getText(label_element.dom_element); 
 
 return strings.join("").normalizeSpace();
 
};

/**
 * @method calculateLabelsUsingARIA
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Interates the array for control cache elements and calculates the accessible name for
 *         any control elements if there is ARIA markup 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsUsingARIA = function () {

  var i;
  var ce;
 
  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<control_elements_len; i++) {
 
    ce = control_elements[i];
 
    if ( (ce.dom_element.aria_labelledby && ce.dom_element.aria_labelledby.length) || 
         (ce.dom_element.aria_label && ce.dom_element.aria_label.length)) {
         
      this.dom_cache.getNameFromARIALabel(ce);
      
      // If title attribute is the result clear label for use of other labeling techniques
      if (ce.label_source == OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
        ce.label = "";
        ce.label_length = 0;
        ce.label_for_comparison = "";
        ce.label_source =  OpenAjax.a11y.SOURCE.NONE;
      }
    }
  }
};

/**
 * @method calculateLabelsByReference
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are referenced by label elements with for attribute
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByReference = function () {

  var i;
  var id;
  var ce;
  var le;
 
  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;
  
  // first check if an label by reference
 
  for (i = 0; i < label_elements_len; i++) {
 
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
          ce.label_length = ce.label.length;
        }
    
        le.unused_label = false;
        ce.label += le.label + " ";
        ce.label_length = ce.label.length;
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_REFERENCE;
        ce.label_for_comparison = ce.label.normalizeSpace().toLowerCase();
      }
      else {
        le.unused_label = true;
      }
    }
  }
};

/**
 * @method calculateLabelsByEncapsulation
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are encapsulated by a label element
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByEncapsulation = function () {

  var i;
  var ce;
 
  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i = 0; i < control_elements_len; i++) {
 
    ce = control_elements[i];
 
    switch (ce.control_type) {
  
    case OpenAjax.a11y.CONTROL_TYPE.BUTTON:
      if (ce.dom_element.tag_name == 'button') {
        ce.label = this.getElementTextContent(ce, false);
        ce.label_length = ce.label.length;
        ce.label_source = OpenAjax.a11y.SOURCE.CHILD_TEXT_NODES;
        ce.label_for_comparison = ce.label.normalizeSpace().toLowerCase();        
      }
      break;
  
    default:
      if (ce.label.length === 0 && 
          ce.label_element) {
    
        // Add fieldset/legend information if defined
        if (ce.fieldset_element && 
            ce.fieldset_element.legend_element) {
          ce.label = ce.fieldset_element.legend_element.label + " ";   
          ce.label_length = ce.label.length;
        }
       
        ce.label += ce.label_element.label + " ";
        ce.label_length = ce.label.length;
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION;
        ce.label_for_comparison = ce.label.normalizeSpace().toLowerCase();
      }
      break;
    } // end switch 
  } // end loop
};

/**
 * @method calculateLabelsByTitle
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of control elements and calculates the accessible label for
 *         any control elements that do NOT have an accessible label, but has a TITLE attribute value 
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
        ce.label_length = ce.label.length;
      }
       
      ce.label += ce.dom_element.title;
      ce.label_length = ce.label.length;
      ce.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
      ce.label_for_comparison = ce.label.normalizeSpace().toLowerCase();
    }
  }
};

/**
 * @method calculateControlLabels
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Calculates labels for form controls, based on the order of label calculation techniques 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {
  this.calculateLabelsUsingARIA();
  this.calculateLabelsByReference();
  this.calculateLabelsByEncapsulation();
  this.calculateLabelsByTitle();
};

/* ---------------------------------------------------------------- */
/*                       FormElement                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor FormElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FormElement object used to hold information about form elements
 *
 * @param  {DOMelement}   dom_element   - dom_element object references DOMElement of the form element 
 * @param  {ControlInfo}  control_info  - Information about the parent control cache
 *
 * @property  {DOMElement}  dom_element           - DOMElement associated with the form element
 * @property  {String}      cache_id              - String that uniquely identifies the cache element in the DOMCache
 * @property  {Number}      document_order        - Ordinal position of the form element in the document in relationship to other form elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {String}  action  - The value of the action attribute of the form control
 * @property  {String}  method  - The value of the method attribute of the form control
 * @property  {String}  name    - The value of the name attribute of the form control
 */

OpenAjax.a11y.cache.FormElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.child_cache_elements = [];
  this.cache_id     = "";
  this.document_order = 0;
  
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FORM;
  this.number_of_controls = 0;
 
  this.action = dom_element.node.action;
  this.method = dom_element.node.method;
  this.name   = dom_element.node.name;
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.FormElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'row_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'column_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'headers');
  cache_nls.addPropertyIfDefined(attributes, this, 'scope');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.FormElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FormElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.FormElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns a text string representation of the FormElement 
 *
 * @return {String} Returns string represention the FormElement object
 */
 
OpenAjax.a11y.cache.FormElement.prototype.toString = function () {
  return "form: " + this.number_of_controls + " controls"; 
};

/* ---------------------------------------------------------------- */
/*                       FieldsetElement                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor FieldsetElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FieldsetElement object used to hold information about fieldset elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the fieldset element 
 * @param  {ControlInfo}  control_info  - Information about parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the fieldset element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the fieldset element in the document in relationship to other fieldset elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {FieldsetElement}  fieldset_element  - Reference to any fieldset elements this fieldset is nested in
 * @property  {LegendElement}    legend_element    - Reference to the legend element contained in the fieldset 
 * @property  {Number}           legend_count      - Number of legend elements contained in the fieldset
 */

OpenAjax.a11y.cache.FieldsetElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FIELDSET;
  this.number_of_controls = 0;   
 
  this.fieldset_element = control_info.fieldset_element;
 
  this.legend_element = null;
 
  this.legend_count = 0;
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns a text string representation of the fieldset element 
 *
 * @return {String} Returns string represention the FieldsetElement object
 */
 
OpenAjax.a11y.cache.FieldsetElement.prototype.toString = function () {
 return "Fieldset: " + this.number_of_controls + " controls"; 
};

/* ---------------------------------------------------------------- */
/*                       LegendElement                              */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LegendElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LegendElement object used to hold information about legend elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the legend element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the legend element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the legend element in the document in relationship to other legend elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this legend is nested in
 * @property  {String}           label                - Text content of the legend element 
 * @property  {String}           label_for_comparison - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.LEGEND;
 
  this.fieldset_element = control_info.fieldset_element;
  
  this.label = "";
  this.label_length = 0;
  this.label_for_comparison = "";

  if (control_info.fieldset_element) {
    control_info.fieldset_element.legend_count++;
  }

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LegendElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns a text string representation of the legend element 
 *
 * @return {String} Returns string represention the LegendElement object
 */
 
OpenAjax.a11y.cache.LegendElement.prototype.toString = function () {
 return "Legend " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       LabelElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LabelElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LabelElement object used to hold information about label elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the label element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the label element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the label element in the document in relationship to other label elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {String}      label                 - Text content of the label element 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this label is nested in
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

 this.dom_element    = dom_element;
 this.cache_id       = "";
 this.document_order = 0;
 
 this.child_cache_elements = [];
 
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.LABEL;

 this.label = "";
 this.label_length = 0;
 this.label_for_comparison = "";

 this.fieldset_element = control_info.fieldset_element;

 this.for_id = dom_element.node.getAttribute('for');
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LabelElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'for_id');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns a text string representation of the label element 
 *
 * @return {String} Returns string represention the LabelElement object
 */
 
OpenAjax.a11y.cache.LabelElement.prototype.toString = function () {
 return "Label " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       InputElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor InputElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InputElement object used to hold information about input elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {String}      type                  - Type of input element  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {String}      name                  - Text content of the name attribute  
 *
 * @property  {String}      label                 - Calculated label for the input element 
 * @property  {Number}      label_length          - Length of the label property 
 * @property  {Number}      label_source          - Constant representing how a label was calculated 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      readonly   - The value of the readonly attribute 
 * @property  {String}      disabled   - The value of the disabled attribute
 * @property  {String}      value      - The value of the readonly attribute 
 * @property  {String}      checked    - The value of the disabled attribute
 */

OpenAjax.a11y.cache.InputElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
  this.cache_id    = "";
  this.document_order = 0;
  
  this.type    = node.type; 
  this.value   = node.value; 
  this.checked = node.checked;

  this.name          = node.getAttribute('name');
  this.required      = node.getAttribute('required');
  this.aria_required = node.getAttribute('aria-required');
  this.aria_invalid  = node.getAttribute('aria-invalid');

  this.control_type  = OpenAjax.a11y.CONTROL_TYPE.UNKOWN; 
  this.label = "";
  this.label_length = 0;
  this.label_source = OpenAjax.a11y.SOURCE.NONE;
  this.label_for_comparison = "";

  this.type = node.type;

  switch (node.type) {
 
  case 'button':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.BUTTON; 
    this.label = node.value; 
    this.label_length = this.label.length;
    this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
    this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    break;

  case 'file':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.FILE; 
    break;
    
  case 'checkbox':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.CHECKBOX; 
    break;
    
  case 'radio':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RADIO; 
    break;
    
  case 'text':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.TEXT; 
    break;
    
  case 'password':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.PASSWORD; 
    break;
    
  case 'hidden':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.HIDDEN; 
    break;
    
  case 'image':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.IMAGE; 
    if (node.alt) {
      this.label = node.alt; 
      this.label_length = this.label.length;
      this.label_source = OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE;
      this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    }
    else {
      if (node.title) {
        this.label = node.title;
        this.label_length = this.label.length;
        this.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
        this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
      }
      else {
        this.label = "";
        this.label_length = 0;
        this.label_source = OpenAjax.a11y.SOURCE.NONE;
        this.label_for_comparison = "";
      }   
    }
    break;

  case 'submit':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.SUBMIT; 
    if (node.value) {
      this.label = node.value; 
      this.label_length = this.label.length;
      this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
      this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    }
    else {
      this.label = this.type.capitalize();
      this.label_length = this.label.length;
      this.label_source = OpenAjax.a11y.SOURCE.BUTTON_TYPE;
      this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    }
    break;
    
  case 'reset':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RESET; 
    if (node.value) {
      this.label = node.value; 
      this.label_length = this.label.length;
      this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
      this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    }
    else {
      this.label = this.type.capitalize();
      this.label_length = this.label.length;
      this.label_source = OpenAjax.a11y.SOURCE.BUTTON_TYPE;
      this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
    }
    break;
  
  default:
    break; 
  }
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.InputElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'name');
  cache_nls.addPropertyIfDefined(attributes, this, 'maxlength');
  cache_nls.addPropertyIfDefined(attributes, this, 'readonly');
  cache_nls.addPropertyIfDefined(attributes, this, 'value');
  cache_nls.addPropertyIfDefined(attributes, this, 'required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_invalid');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.InputElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.label_length) {
    return this.label;
  }
  else {
    return cache_nls.getMissingLabelMessageNLS();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getValueNLS('label_source', this.label_source);
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return {String} Returns string represention the InputElement object
 */
 
OpenAjax.a11y.cache.InputElement.prototype.toString = function () {
  
  return "input: " + this.type;
  
};

/* ---------------------------------------------------------------- */
/*                       ButtonElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor ButtonElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ButtonElement object used to hold information about button elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the button element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the button element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {String}      name            - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this button element is nested in
 *
 * @property  {String}      label                 - Calculated label for the button element 
 * @property  {Number}      label_length          - Length of the label property 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {String}      readonly              - The value of the readonly attribute 
 * @property  {String}      disabled              - The value of the disabled attribute
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

  this.dom_element = dom_element;
  this.cache_id    = "";
  
  this.child_cache_elements = [];
 
  var node = dom_element.node;
 
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.BUTTON; 
 
  this.name          = node.getAttribute('name');
  
  this.label  = "";
  this.label_length = 0;
  this.label_for_comparison = "";
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.fieldset_element = control_info.fieldset_element;

};


/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.label_length) {
    return this.label;
  }
  else {
    return cache_nls.getMissingLabelMessageNLS();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  return cache_nls.getValueNLS('label_source', this.label_source);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns a text string representation of the button element 
 *
 * @return {String} Returns string represention the ButtonElement object
 */
 
OpenAjax.a11y.cache.ButtonElement.prototype.toString = function () {
 return "Button " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                    TextareaElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor TextareaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a TextareaElement object used to hold information about textarea elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the textarea element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the textarea element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name            - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {String}      label                 - Calculated label for the textarea element 
 * @property  {Number}      label_length          - Length of the label property 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      rows       - The value of the rows attribute 
 * @property  {String}      cols       - The value of the cols attribute
 *
 * @property  {String}      readonly   - The value of the readonly attribute 
 * @property  {String}      disabled   - The value of the disabled attribute
 */

OpenAjax.a11y.cache.TextareaElement = function (dom_element, control_info) {

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.TEXTAREA;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
  
  this.name          = node.getAttribute('name');
  
  this.label  = "";
  this.label_for_comparison = "";

  this.rows = node.rows; 
  this.cols = node.cols; 
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  if (this.label_length) {
    return this.label;
  }
  else {
    return cache_nls.getMissingLabelMessageNLS();
  }
  
};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getValueNLS('label_source', this.label_source);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return {String} Returns string represention the Element object
 */
 
OpenAjax.a11y.cache.TextareaElement.prototype.toString = function () {
 return "Textarea " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                      SelectElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor SelectElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a SelectElement object used to hold information about select elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the select element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the select element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name            - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Array}       option_elements       - Array of child cache option elements  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this select element is nested in
 *
 * @property  {String}      label                 - Calculated label for the select element 
 * @property  {Number}      label_length          - Length of the label property 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 * @property  {String}      size                  - The value of the size attribute 
 * @property  {String}      multiple              - The value of the multiple attribute
 */

OpenAjax.a11y.cache.SelectElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  
  this.option_elements = [];
 
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.SELECT;

  var node = dom_element.node;

  this.name          = node.getAttribute('name');
  
  this.label = "";
  this.label_length = 0;
  this.label_for_comparison = "";

  this.size   = node.size;
  this.multiple = node.multiple;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
 
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.SelectElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

};

/**
 * addOption
 * 
 * @desc add a OptionElement object reference to the tree of   
 *
 * @param  child_control    Object control cache element object  
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
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SelectElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getLabelNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.label_length) {
    return this.label;
  }
  else {
    return cache_nls.getMissingLabelMessageNLS();
  }
  
};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  return cache_nls.getValueNLS('label_source', this.label_source);
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns a text string representation of the select element 
 *
 * @return {String} Returns string represention the SelectElement object
 */
 
OpenAjax.a11y.cache.SelectElement.prototype.toString = function () {
  return "select: " + this.option_elements.length + " options"; 
};

/* ---------------------------------------------------------------- */
/*                       OptgroupElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor OptgroupElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {SelectElement}  select_element     - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}      label                 - Calculated label for the select element 
 * @property  {Number}      label_length          - Length of the label property 
 * @property  {String}      label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";
 
 this.child_cache_elements = [];
         
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.OPTGROUP;
 
 this.select_element = control_info.select_element;
         
 this.label = dom_element.node.label;
 this.label_length = this.label.length;
 this.label_for_comparison = this.label.normalizeSpace().toLowerCase();
 
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns a text string representation of the optgroup element 
 *
 * @return {String} Returns string represention the OptgroupElement object
 */
 
OpenAjax.a11y.cache.OptgroupElement.prototype.toString = function () {
 return "OPTGROUP with " + this.child_cache_elements.length + " options"; 
};

/* ---------------------------------------------------------------- */
/*                      OptionElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor OptionElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element        - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Number}      control_type       - Constant indicating the type of cache control object  
 *
 * @property  {SelectElement}  select_element  - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}         value           - Value of the value attribute 
 */

OpenAjax.a11y.cache.OptionElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";
 
 this.control_type   = OpenAjax.a11y.CONTROL_TYPE.OPTION;
 
 this.select_element = control_info.select_element;
         
 this.value = dom_element.node.value;
 
};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptionElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns a text string representation of the option element 
 *
 * @return {String} Returns string represention the OptionElement object
 */
 
OpenAjax.a11y.cache.OptionElement.prototype.toString = function () {
 return "OPTION with value=" + this.value; 
};
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
/*                       DOMElementCache                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMElementCache
 *
 * @memberOf OpenAjax.a11y.cache
 * 
 * @desc Creates a DOMElementCache object for represeting a DOM in a web browser
 *         
 * @property {Array}  dom_elements        - A simple array of all the DOMElement objects in the cache
 * @property {Array}  dom_text            - A simple array of all the DOMText objects in the cache
 * @property {Array}  child_dom_elements  - The roor of a tree of DOMElement objects representing the node relationships on the DOM
 * @property {String} sort_property       - String  The DOMElement property the dom_elements array is sorted by
 * @property {Number} length              - The running length of the dom_elements array used for calculating the cache_id property of a DOMElement
 */

OpenAjax.a11y.cache.DOMElementCache = function () {

 this.dom_elements = [];
 this.dom_text = [];
 
 this.child_dom_elements = [];
 
 this.sort_property = 'document_order';
 this.length = 0;
 this.text_length = 0;

};

/** 
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Initializes properties of the DOMElementCache
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.initCache = function () {

 this.dom_elements       = [];
 this.child_dom_elements = [];
 this.sort_property      = 'document_order';
 this.length             = 0;

};

/**
 * @method addDOMElement
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement object to the array of all DOMElements and calculates the elements cache ID
 *
 * @param {DOMElement Object}  dom_element  - DOMElement object to add 
 *
 * @return  {Number}  Returns the current number of elements in the array of DOMElements
 */

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

/**
 * @method addDOMText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOM text object to the array of all DOM text and calculates the cache ID
 *
 * @param {DOMText Object}  dom_text  - DOM text object to add 
 *
 * @return  {Number}  Returns the current number of elements in the array of DOM text objects
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMText = function (dom_text) {

 // item must exist and have the position property
 if (dom_text) {
  this.text_length  += 1;
  dom_text.document_order = this.text_length;
  dom_text.cache_id       = "domt_" + this.text_length;
  this.dom_text.push(dom_text);
 }

 return this.dom_text.length;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement or DOMText object to the root level of the tree reflecting the DOM of document  
 *
 * @param {DOMElement or DOMText object} dom_object  - DOMElement or DOMText object to add to the tree  
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addChild = function (dom_object) {

  if (dom_object) {
    this.child_dom_elements.push(dom_object);
  }
};

/**
 * @method getDOMElementById
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns the the DOMElement object with the id attribute value
 *
 * @param {String} id - id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated id if found, otherwise null
 */
 
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

/**
 * @deprecated getDOMElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemByCacheId = function (cache_id) {

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

/**
 * @method sortDOMElements
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Sorts the dom_elements array based on a property of the DOMElement object
 *
 * @param  {String}  property  - DOMElement object property used to sort the array
 * @param  {Boolean} ascending - Boolean  true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  true if list was sorted, false if not
 */

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

/**
 * @method getTextFromIds
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc    Gets the accessible text content from a list of ids
 *
 * @note    Used in calculating accessible names, labels and descriptions
 *
 * @param   {String} ids - a space separated list of ids
 *
 * @return  {String} Returns a string with the concatenated text content of the elements with ids  
 */

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
 * @method checkForUniqueIDs
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Check DOMElements for unique ids and set id_unique property for all DOMElements in the cache
 *       Sets the 'id_unique' property on DOMElement objects that do not have unique ID attribute values
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


/* ---------------------------------------------------------------- */
/*                       DOMText Object                             */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor DOMText
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc DOMText object represents DOM nodes of type text
 * 
 *
 * @param  {Object}      node           - The DOM text node 
 * @param  {DOMElement}  parent_element - DOMElement object that is the current parent in the tree
 *
 * @property  {DOMElement}  parent_landmark      - LandmarkElement object that contains this element
 * @property  {String}      parent_landmark_role - role of parent landmark element 
 *
 * @property  {LandmarkElement}  parent_landmark - LandmarkElement object that contains the text content
 * @property  {String}      parent_landmark_role - role of parent landmark element 
 *
 * @property {Number}  type - Type of DOM node element or text
 * @property {String}  text - Text content of DOM text node
 *
 * @property {String}  cache_id        - String that uniquely identifies the cache element in the DOMCache
 * @property {Number}  document_order  - The ordinal position of this DOM text node in the DOM
 *
 * @property {Object}  computed_style  - Object that contains information about run time styling of the node
 * @property {Object}  events          - Object that contains information about event handlers attached to the node and its descendents
 *
 * @property {Array}  rules_violations       - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}  rules_recommendations  - Array of NodeResult objects with severity of 'Recommendation'
 * @property {Array}  rules_manual_checks    - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}  rules_informational    - Array of NodeResult objects with severity of 'Informational'
 * @property {Array}  rules_passed           - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}  rules_hidden           - Array of NodeResult objects with severity of 'Hidden'
 * @property {Array}  rules_na               - Array of NodeResult objects with severity of 'Not Applicable' 
 */
 
OpenAjax.a11y.cache.DOMText = function (node, parent_element) {

 this.type = NODE_TYPE.TEXT;
 this.text = node.data;
 this.parent_element = parent_element;
 
 this.parent_landmark      = null;
 this.parent_landmark_role = "";
 
 this.text_normalized = this.text.normalizeSpace();
 var text_length      = this.text_normalized.length;
 this.text_length     = text_length;
 
 parent_element.addToCharacterCount(text_length);
 
 this.computed_style = parent_element.computed_style;
 
  // Create areas to store rule results associates with this node
 this.rules_violations                = [];
 this.rules_recommendations           = [];
 this.rules_manual_checks             = [];
 this.rules_informational             = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];
 this.rules_warnings                  = [];
 this.rules_na                        = [];
};

/**
 * @method addText
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   Check DOMElement for presence of attribute with specified value
 *
 * @param  {String} text  - text content to add
 *
 * @return {Number}  Length of the normailized text content of the DOM text node
 */

OpenAjax.a11y.cache.DOMText.prototype.addText = function (text) {

  this.text += text;
  
  this.text_normalized = this.text.normalizeSpace();
  
  var text_length = this.text_normalized.length;

  parent_element.addToCharacterCount(text_length - this.text_length);

  this.text_length = text_length;
  
};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMText.prototype.getResultRules = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_recommendations);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_informational);
  addResultNodes(this.rules_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the worst severity level of rule results  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMText.prototype.getAccessibility = function () {
   
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var a = {};

  severity = cache_nls.getSeverityNLS(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_manual_checks.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_recommendations.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
    a.style    = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
  }

  if (this.rules_violations.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.VIOLATION);
    a.style       = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;
  
  return a;
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have attributes
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getAttributes = function (unsorted) {

  return [];

};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have events
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getEvents = function (unsorted) {

  return [];

};


/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'text_normalized');
  cache_nls.addPropertyIfDefined(properties, this, 'text_length');
  
  return properties;

};

/**
 * @method getColorContrastSummary
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the worst severity level for color contrast rules  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMText.prototype.getColorContrastSummary = function () {
   
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

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_recommendations, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
    a.style  = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
    last_severity_value = SEVERITY.RECOMMENDATION;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.VIOLATION);
      a.style  = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;

  return a;
  
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');
  
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');
  
  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMText.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    if (typeof this.computed_style[property] == 'undefined') {
      if (typeof this.parent_element[property] == 'undefined') {
        if (this.parent_landmark) {
          if (typeof this.parent_landmark[property] == 'undefined') {
            if (typeof this.parent_landmark.dom_element[property] == 'undefined') {
              return null;
            }
            else {
              return this.parent_landmark.dom_element[property];
            }
          }
          else {  
            return this.parent_landmark[property];
          }  
        }  
      }  
      else {  
        return this.parent_element[property];
      }  
    }
    else {
      return this.computed_style[property];
    }  
  }
    
  return this[property];
};


/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text content of a DOMText element
 *
 * @return {String} Returns the text content dom text node
 */
 
OpenAjax.a11y.cache.DOMText.prototype.getText = function() {
  return this.text_normalized;
};


/* ---------------------------------------------------------------- */
/*                       DOMElement Object                          */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor DOMElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc The DOMElement object represents a dom node of a document
 * 
 * @property  {String}    cache_id            - String that uniquely identifies the cache element in the DOMCache
 * @property  {String}    xpath               - String that identifies the position of the element in the document
 *
 * @property {Array}      child_dom_elements  - The child DOMElement and DOMText objects of this DOMElement in the tree
 * @property {DOMElement} parent_element      - The parent DOMElement of this DOMElement in the tree
 *
 * @property {LandmarkElement}  parent_landmark - LandmarkElement object that contains this element
 * @property {String}     parent_landmark_role  - role of parent landmark
 *
 * @property {Number}     type                - Type of DOM node is element  
 * @property {Number}     document_order      - The ordinal position of this DOM element node in the DOM
 * 
 * @property {Object}     node                - Reference to the 'live' DOM element represented by this object
 * @property {String}     tag_name            - Tag name of the HTML element in lowercase characters (i.e. p, div, h1, span ...)
 *
 * @property {String}     id                  - id attribute value of the DOM node (can be empty)
 * @property {Number}     id_unique           - Indicates if id is defined, unique or has a duplicate in the document
 *
 * @property {Number}     character_count     - Count of text charcters in the immediate child DOM text nodes
 * 
 * @property {String}     class_name          - The value of the class attribute of the DOM node
 * @property {String}     role                - The value of the role attribute of the DOM node
 *
 * @property {String}     alt                 - String   The value of the alt attribute of the DOM node
 * @property {Boolean}    has_alt_attribute   - true if the alt attribute is defined, otherwise false 
 *
 * @property {String}     title               - The value of the title            attribute of the DOM node
 * @property {String}     aria_describedby    - The value of the aria-describedby attribute of the DOM node
 * @property {String}     aria_hidden         - The value of the aria-hidden      attribute of the DOM node
 * @property {String}     aria_label          - The value of the aria-label       attribute of the DOM node
 * @property {String}     aria_labelledby     - The value of the aria-labelledby  attribute of the DOM node
 *
 * @property {Object}     events              - Object that contains information about events associated with the node
 * @property {Object}     computed_style      - Object that contains information about run time styling of the node
 *
 * @property {Array}      rules_violations          - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}      rules_recommendations     - Array of NodeResult objects with severity of 'Recommendation'
 * @property {Array}      rules_manual_checks       - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}      rules_informational       - Array of NodeResult objects with severity of 'Informational'
 * @property {Array}      rules_passed              - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}      rules_hidden              - Array of NodeResult objects with severity of 'Hidden'
 * @property {Array}      rules_warnings            - Array of NodeResult objects with severity of 'Warning'
 * @property {Array}      rules_na                  - Array of NodeResult objects with severity of 'Not Applicable'
 *
 * @param {DOM node Object}    node            - The DOM text node 
 * @param {DOMElement Object}  parent_element  - DOMElement object that is the parent DOMElement object in the tree
 */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element) {

 var i;
 var attr;
 var attributes;
 var attributes_len;

 // check to make sure it is a valid node
 if (node === null) return null;

 this.has_element_children = false;
 
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
 this.parent_element = parent_dom_element;
 this.child_dom_elements = [];
 this.aria_properties = [];
 
 this.parent_landmark = null;
 this.parent_landmark_role = "";

 // Cache important attributes for accessibility
 i = 0;
 attr = null;
 attributes = node.attributes;
 attributes_len = attributes.length;

 this.className = "";
 this.has_alt_attribute    = false;
 this.has_aria_describedby = false;

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
    this.has_aria_describedby = true;
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
 this.rules_manual_checks             = [];
 this.rules_informational             = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];
 this.rules_warnings                  = [];
 this.rules_na                        = [];

 return this;

};

/**
 * @method hasAttrWithValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Check DOMElement for presence of attribute with specified value
 *
 * @param  {String} name  - name of attribute
 * @param  {String} value - value of attribute
 *
 * @return {boolean} Indicates whether or not DOMElement has the specified
 *                   attribute with the specified value.
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasAttrWithValue = function (name, value) {

  if (this.hasOwnProperty (name)) {
    return this[name] === value;
  }

  return false;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getResultRules = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_recommendations);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_informational);
  addResultNodes(this.rules_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getHasDescribedBy
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns NLS string on whether the dom element has a aria-describedby attribute  
 *
 * @return {String} If true returns "Yes", else "No"
 */

OpenAjax.a11y.cache.DOMElement.prototype.getHasDescribedBy = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;

  if (this.has_aria_describedby) return cache_nls.getLabelAndValueNLS('has_aria_describedby', this.has_aria_describedby).value;

  return "";
};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the worst severity level of rule results  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAccessibility = function () {
   
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var a = {};

  severity = cache_nls.getSeverityNLS(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_manual_checks.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_recommendations.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
    a.style    = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
  }

  if (this.rules_violations.length) {
    severity = cache_nls.getSeverityNLS(SEVERITY.VIOLATION);
    a.style       = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;


  return a;
  
};

/**
 * @method getColorContrastSummary
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the worst severity level for color contrast rules  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMElement.prototype.getColorContrastSummary = function () {
   
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

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_recommendations, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.RECOMMENDATION);
    a.style  = SEVERITY_STYLE[SEVERITY.RECOMMENDATION];
    last_severity_value = SEVERITY.RECOMMENDATION;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getSeverityNLS(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getSeverityNLS(SEVERITY.VIOLATION);
      a.style  = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;

  return a;
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var attributes  = [];
  
  if (this.id.length) cache_nls.addPropertyIfDefined(attributes, this, 'id');  
  cache_nls.addPropertyIfDefined(attributes, this, 'class_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'role');
  
  cache_nls.addPropertyIfDefined(attributes, this, 'title');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_describedby');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_hidden');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_label');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_labelledby');
  
  if (this.tag_name === 'img'  || 
      this.tag_name === 'area' || 
      this.tag_name === 'applet') cache_nls.addPropertyIfDefined(attributes, this, 'alt');
  
  if (!unsorted) this.sortItems(attributes);
  
  return attributes;

};

/**
 * @method hasEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns if an element has user interface events attached to it
 *
 * @return {String} Returns "Yes" if event user interface event handlers are attached to the node, otherwise empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasEvents = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var has_event = false;
  
  has_event = has_event || this.events.has_blur;
  has_event = has_event || this.events.has_change;
  has_event = has_event || this.events.has_click;
  has_event = has_event || this.events.has_double_click;
  has_event = has_event || this.events.has_focus;
  has_event = has_event || this.events.has_key_down;
  has_event = has_event || this.events.has_key_press;
  has_event = has_event || this.events.has_key_up;
  has_event = has_event || this.events.has_load;
  has_event = has_event || this.events.has_mouse_down;
  has_event = has_event || this.events.has_mouse_up;
  has_event = has_event || this.events.has_mouse_move;
  has_event = has_event || this.events.has_mouse_out;
  has_event = has_event || this.events.has_mouse_over;

  if (has_event) return cache_nls.getCacheNLS().boolean_values.true_value;
  
  return "";
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of objects representing events associated with the element 
 *
 * @return {Array} Returns a array of event object results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getEvents = function () {

  function addHasEvent(event_type, on_element, on_ancestor) {
  
    var o = {};
    
    o.label = event_type;
    o.on_element        = nls_false;
    o.on_element_style  = "no";
    o.on_ancestor       = nls_false;
    o.on_ancestor_style = "no";

    if (on_element) {
      o.on_element        = nls_true;
      o.on_element_style  = "yes";
    }
    
    if (on_ancestor) {
      o.on_ancestor       = nls_true;
      o.on_ancestor_style = "yes";
    }  

    events.push(o);
  
  }

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var nls_false = cache_nls.getCacheNLS().boolean_values.false_value;
  var nls_true  = cache_nls.getCacheNLS().boolean_values.true_value;
 
  var events = [];
  
  addHasEvent('blur',          this.events.has_blur,          this.events.ancestor_has_blur);
  addHasEvent('focus',         this.events.has_focus,         this.events.ancestor_has_focus);
  
  addHasEvent('click',         this.events.has_click,         this.events.ancestor_has_click);
  addHasEvent('double click',  this.events.has_double_click,  this.events.ancestor_has_double_click);

  addHasEvent('key down',      this.events.has_key_down,      this.events.ancestor_has_key_down);
  addHasEvent('key press',     this.events.has_key_press,     this.events.ancestor_has_key_press);
  addHasEvent('key down',      this.events.has_key_up,        this.events.ancestor_has_key_up);

  addHasEvent('mouse down',    this.events.has_mouse_down,    this.events.ancestor_has_mouse_down);
  addHasEvent('mouse up',      this.events.has_mouse_up,      this.events.ancestor_has_mouse_up);
  addHasEvent('mouse move',    this.events.has_mouse_move,    this.events.ancestor_has_mouse_move);
  addHasEvent('mouse out',     this.events.has_mouse_out,     this.events.ancestor_has_mouse_out);
  addHasEvent('mouse over',    this.events.has_mouse_over,    this.events.ancestor_has_mouse_over);

  addHasEvent('change',        this.events.has_change,        this.events.ancestor_has_change);

  return events;

};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');
  
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');
  
  return properties;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'id_unique');
  cache_nls.addPropertyIfDefined(properties, this, 'xpath');
  cache_nls.addPropertyIfDefined(properties, this, 'character_count');
  
  cache_nls.addPropertyIfDefined(properties, this, 'calculated_aria_description');

  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark_role');
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.console("dom element property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
     if(typeof this.computed_style[property] == 'undefined') {
       if(typeof this.events[property] == 'undefined') {
         return null;
       }
       else {
         return this.events[property]; 
       }   
     }
     else {
       return this.computed_style[property]; 
     }
  }
  
  return this[property];
  
};


/**
 * @method sortItems
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.sortItems = function (items) {

  var swapped = false;
  var temp = null;
  var i;
  var items_len = items.length;

  do{
    swapped = false;
    for (i = 1; i < items_len; i++ ) {
     if (items[i-1].label.toLowerCase() > items[i].label.toLowerCase()) {
      // swap the values
      temp = items[i-1];
      items[i-1] = items[i];
      items[i] = temp;
      swapped = true;
     }
    } // end loop
  } while (swapped);

};

/** 
 * @method EnumerateFirefoxEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Finds the event information of the node for a DOMElement object
 *
 * @param  {Object}     node              - Object The DOM element node that corresponds
 *                                          to this DOMElement object, and from which
 *                                          common information is derived for the DOM
 *                                          element cache.
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node 
 *
 * @return {Object}  Returns an object with event information
 */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFirefoxEvents = function (node, parent_dom_element) {

 var i;
 
 var events = {};
 events.supports_events = false;

 var event_listener = Components.classes["@mozilla.org/eventlistenerservice;1"];

 if (event_listener !== null &&
   event_listener !== undefined) {

  events.supports_events = true;

  events.has_blur         = false;
  events.has_change       = false;
  events.has_click        = false;
  events.has_double_click = false;
  events.has_focus        = false;
  events.has_key_down     = false;
  events.has_key_press    = false;
  events.has_key_up       = false;
  events.has_load         = false;
  events.has_mouse_down   = false;
  events.has_mouse_up     = false;
  events.has_mouse_move   = false;
  events.has_mouse_out    = false;
  events.has_mouse_over   = false;

  if (parent_dom_element && parent_dom_element.events) {
   events.ancestor_has_blur         = parent_dom_element.events.has_blur;
   events.ancestor_has_change       = parent_dom_element.events.has_change;
   events.ancestor_has_click        = parent_dom_element.events.has_click;
   events.ancestor_has_double_click = parent_dom_element.events.has_double_click;
   events.ancestor_has_focus        = parent_dom_element.events.has_focus;
   events.ancestor_has_key_down     = parent_dom_element.events.has_key_down;
   events.ancestor_has_key_press    = parent_dom_element.events.has_key_press;
   events.ancestor_has_key_up       = parent_dom_element.events.has_key_up;
   events.ancestor_has_load         = parent_dom_element.events.has_load;
   events.ancestor_has_mouse_down   = parent_dom_element.events.has_mouse_down;
   events.ancestor_has_mouse_up     = parent_dom_element.events.has_mouse_up;
   events.ancestor_has_mouse_move   = parent_dom_element.events.has_mouse_move;
   events.ancestor_has_mouse_out    = parent_dom_element.events.has_mouse_out;
   events.ancestor_has_mouse_over   = parent_dom_element.events.has_mouse_over;
  }
  else {
   events.ancestor_has_blur         = false;
   events.ancestor_has_change       = false;
   events.ancestor_has_click        = false;
   events.ancestor_has_double_click = false;
   events.ancestor_has_focus        = false;
   events.ancestor_has_key_down     = false;
   events.ancestor_has_key_press    = false;
   events.ancestor_has_key_up       = false;
   events.ancestor_has_load         = false;
   events.ancestor_has_mouse_down   = false;
   events.ancestor_has_mouse_up     = false;
   events.ancestor_has_mouse_move   = false;
   events.ancestor_has_mouse_out    = false;
   events.ancestor_has_mouse_over   = false;
  }

  var event_listener_service = event_listener.createInstance(Components.interfaces.nsIEventListenerService);
  var node_event_service     = event_listener_service.getListenerInfoFor(node, {});

  for (i = 0; i < node_event_service.length; i++) {
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

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds a DOMElement or DOMText object to the tree of DOM text/elements  
 *
 * @param  {DOMElement | DOMText} child_object  - DOMElement or DOMText object 
 *
 * @return  Nothing 
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.addChild = function ( child_object ) {

 if (child_object) {
  this.child_dom_elements.push(child_object);
 }

};

/**
 * @method addToCharacterCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Adds to the current character count of the text content of the
 *          contained in the DOMelement and its immediate children
 *
 * @param {Number} length - Number to add to the character count
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addToCharacterCount = function ( length ) {

 this.character_count += length;

};

/**
 * @method addComputedStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds computed style information to the DOMElement object and
 *          calculate the color contrast ratio
 *
 * @param  {DOMElement} parent_element  - The parent DOMElement object, used
 *                                        for information about inherited style
 *                                        information
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addComputedStyle = function (parent_element) {
 this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
 this.computed_style.calculateColorContrastRatio();
};

/**
 * @method calculateXPath
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Calculate the XPath string that uniquely identifies the
 *           DOM node referenced by this DOMElement's node property and
 *           set its xpath property to this calculated value.
 *
 * @param  {DOMElement} parent_element - The parent DOMElement object, used
 *                                       for information for xpath calculation
 *
 * @usage Sets the DOMElement's xpath property
 *
 * @return Nothing 
 */

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


/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns text content of a DOMElement, including the ALT text of images
 *       through recursion through the DOMText and DOMElement descendents of
 *       the DOMElement
 *
 * @return {String} Returns the text content of an element and its children
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getText = function() {

  function getText(dom_element, strings) {
    // If text node get the text and return
    if( dom_element.type == NODE_TYPE.TEXT ) {
      strings.push( dom_element.text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == NODE_TYPE.ELEMENT ) {
        // check to see if IMG or AREA element and to use ALT content if defined
        if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {
     
          if (dom_element.alt) {
            strings.push(dom_element.alt);
          } 
          
        } else {
    
          for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
            getText(dom_element.child_dom_elements[i], strings);
          } // end loop
          
        } 
      }
    } 
  } // end function getStrings

 // Create return object
 var str = "";
 var strings = [];

 getText(this, strings); 
 
 if (strings.length) str = strings.join(" ").normalizeSpace();
 
 return str;
 
};

 /**
 * @method getTextObject
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 * 
 * @desc Returns an object with information about the accessible text of a DOMElement object
 *         and its descendents
 *
 * @return {Object}  Returns an object with the following properties: 
 *                     'height', 
 *                     'width',
 *                     'image_count',
 *                     'name',
 *                     'name_from_text_nodes',
 *                     'name_from_image_alt',
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getTextObject = function() {

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
    
     for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      getText( dom_element.child_dom_elements[i], strings, texts, alts);
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


 getText(this, name_array, name_from_text_nodes_array, name_from_image_alt_array); 
 
 o.name         = name_array.join("").normalizeSpace();
 o.name_from_text_nodes = name_from_text_nodes_array.join("").normalizeSpace().toLowerCase();
 o.name_from_image_alt = name_from_image_alt_array.join("").normalizeSpace().toLowerCase();
 return o;
 
}; // end function OpenAjax.cache.util.getAccessibleText


/**
 * @method getElementCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 * 
 * @desc Returns a String of the text content of a DOMElement and all its descendent DOMElements
 *
 * @return {Number}  Returns the number of descendent elements in a DOMElement object
 *
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getElementCount = function() {

  function countElements(dom_element) {
    // If text node get the text and return
    if( dom_element.type == NODE_TYPE.ELEMENT ) {
      count++;
      for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
        countElements(dom_element.child_dom_elements[i]);
      } // end loop
    } 
  } // end function getStrings

 // Create return object
 var count = 0;

 countElements(this); 
 
 return count;
 
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Create a text String that represents the DOMElement object
 *
 * @return {String}
 */

OpenAjax.a11y.cache.DOMElement.prototype.toString = function() {
 return this.tag_name;
};

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
/*                            DOMCache                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a DOMCache Object 
 *          
 * @param  {String}  url       - URL of the page being evaluated
 * @param  {String}  title     - The value of title property of the document being evaluated
 * @param  {Object}  document  - The document object reference of the document being evaluated
 * @param  {Object}  log       - The Log object to store progress information during the evaluation
 *
 * @property {String}  nls       - NLS cache items for properties
 * @property {String}  url       - URL of the page being evaluated
 * @property {String}  base_url  - Base URL of the page being evaluated calculated from the URL
 * @property {String}  title     - The value of title property of the document being evaluated
 * @property {Object}  document  - The document object reference of the document being evaluated
 * @property {Object}  log       - The Log object to store progress information during the evaluation
 *
 * DOM cache element objects
 * @property {Object}  element_cache          - dom element cache for all elements
 * @property {Object}  element_with_id_cache  - dom element cache items with a defined id
 *
 * Specialize cache element objects
 * @property {Object}  abbreviations_cache       - Cache of abbreviation elements 
 * @property {Object}  color_contrast_cache      - Cache of abbreviation items
 * @property {Object}  controls_cache            - Cache of form controls and widgets
 * @property {Object}  headings_landmarks_cache  - Cache of headings and abbreviations
 * @property {Object}  title_main_cache          - Cache of title, h1 and main landmark elements
 * @property {Object}  images_cache              - Cache of image and area elements
 * @property {Object}  languages_cache           - Cache of language change items
 * @property {Object}  links_cache               - Cache of a and area elements
 * @property {Object}  lists_cache               - Cache of list elements
 * @property {Object}  media_cache               - Cache of media elements
 * @property {Object}  tables_cache              - Cache of table elements
 *
 * @example
 *
 * var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, locale, log); 
 * dom_cache.updateDOMElementCache();
 * dom_cache.updateAllCaches();
 */

OpenAjax.a11y.cache.DOMCache = function (url, title, document, log) {

 this.nls = OpenAjax.a11y.cache_nls.getCacheNLS();
 
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
 this.log = log;

};
 
/**
 * @method initCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Initialize specialized caches
 *    The specialized caches will be updated all at once or or when
 *    needed by a rule depending on how an evaluation is requested
 */

OpenAjax.a11y.cache.DOMCache.prototype.initCache = function () {

 this.element_with_id_cache = new OpenAjax.a11y.cache.DOMElementCache();
 this.element_cache         = new OpenAjax.a11y.cache.DOMElementCache();

 this.abbreviations_cache      = new OpenAjax.a11y.cache.AbbreviationsCache(this);
 this.color_contrast_cache     = new OpenAjax.a11y.cache.ColorContrastCache(this);
 this.controls_cache           = new OpenAjax.a11y.cache.ControlsCache(this);
 this.headings_landmarks_cache = new OpenAjax.a11y.cache.HeadingsLandmarksCache(this);
 this.title_main_cache         = new OpenAjax.a11y.cache.TitleMainCache(this);
 this.images_cache             = new OpenAjax.a11y.cache.ImagesCache(this);
 this.languages_cache          = new OpenAjax.a11y.cache.LanguagesCache(this);
 this.links_cache              = new OpenAjax.a11y.cache.LinksCache(this);
 this.lists_cache              = new OpenAjax.a11y.cache.ListsCache(this);
 this.media_cache              = new OpenAjax.a11y.cache.MediaCache(this);
 this.tables_cache             = new OpenAjax.a11y.cache.TablesCache(this);

};

/**
 * @method isUpToDate
 * @memberOf OpenAjax.a11y.cache.DOMCache
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
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates the specified cache
 *
 * @param cache_name String name of the cache to update
 *
 * @return {Boolean} Returns true if cache is updated, false if cache does not exist
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
 * @method traverseDOMElementsForAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates all the specialized caches at one time, in general this
 *    is faster than updating the caches individually based on the
 *    needs of rules, but may create caches that will not be used if
 *    some rules are disabled
 *
 * @param  dom_element       Object  Current DOMElement object being processed
 * @param  landmark_info     Object  LandmarkInfo object containing current landmark and heading information for tree representations
 * @param  main_info         Object  MainInfo object containing current main, h1 and title information for tree representations
 * @param  table_info        Object  TableInfo object containing current table information for tree representations
 * @param  control_info      Object  ControlInfo object containing current control information for tree representations
 * @param  list_info         Object  Current LanguageElement object that contains the DOMElement
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.traverseDOMElementsForAllCaches = function (dom_element,
                                          landmark_info,
                                          main_info,
                                          table_info,
                                          control_info,
                                          list_info) {

 if (!dom_element) return;
 // if an element for through all the children elements looking for text

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);
  this.media_cache.updateCacheItems(dom_element);

  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
  var li = this.lists_cache.updateCacheItems(dom_element, list_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);
  var mi = this.title_main_cache.updateCacheItems(dom_element, main_info);

  var children_length = dom_element.child_dom_elements.length;
  for (var i = 0; i<children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.child_dom_elements[i], hi, mi, ti, ci, li);
  } // end loop
 } else {
   this.color_contrast_cache.updateCacheItems(dom_element);
   this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
 }
};


/**
 * @method updateAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverses the DOMElements and 
 *       calls the update function to see which specialized caches want information on this element
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateAllCaches = function () {
 var i;
 var children = this.element_cache.child_dom_elements;
 var children_len = children.length;

 var hi = new OpenAjax.a11y.cache.LandmarkInfo(null);
 var mi = new OpenAjax.a11y.cache.MainInfo(null);
 var ti = new OpenAjax.a11y.cache.TableInfo(null);
 var ci = new OpenAjax.a11y.cache.ControlInfo(null);
 var li = new OpenAjax.a11y.cache.ListInfo(null);

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating all caches");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForAllCaches(children[i], hi, mi, ti, ci, li);
 }

 this.controls_cache.calculateControlLabels();

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed updating all caches");

};

/**
 * @method updateDOMElementCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates a DOMElement object caches by traversing the DOM of the browser object
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
  this.updateDOMElements(this.document.body, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.console("Creating DOM elements with frames");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements using frames");
  this.updateDOMElements(this.document, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }

 // Identify elements with duplicate ID values
 this.element_with_id_cache.checkForUniqueIDs();

 // Calculate aria-descriptions
 this.calculateDescriptions();

 return this;

};

/**
 * @method addTitleDOMElement
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Adds a DOMElement to represent a TITLE
 *
 * @return Nothing
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
      this.updateDOMElements( n, de, null);
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
 * @method updateDOMElements
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverse document DOM and create a tree of DOMElement objects.
 *    The DOMElement objects will be used to generate more specific
 *    lists of elements without need to touch the document DOM.
 *    Additional information is collected on tables to be used in
 *    creating the table cache
 *
 * @param  {Object} node               - node is the current node object tbing analyzed
 * @param  {Object} parent_dom_element - DOMElement object that is the parent of the current node
 * @param  {Object} previous_sibling   - The DOMElement or DOMText object that is the previous sibling
 *
 * return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElements = function (node, parent_dom_element, previous_sibling) {

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
      parent_dom_element.has_element_children = true;
      parent_dom_element.addChild(dom_element);
    }
    else {
      this.element_cache.addChild(dom_element);
    }

    if (dom_element.id && dom_element.id.length) {
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
    
    var ps = null;

    for (n = node.firstChild; n !== null; n = n.nextSibling ) {
      ps = this.updateDOMElements(n, dom_element, ps);
    } // end loop
    
    return dom_element;
    break;

  case NODE_TYPE.TEXT:
    // OpenAjax.a11y.console("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);

   if (dom_text.text_length) {
   
     if (!previous_sibling || previous_sibling.type == NODE_TYPE.ELEMENT) {
   
       this.element_cache.addDOMText(dom_text);
       if (parent_dom_element) parent_dom_element.addChild(dom_text);
       return dom_text;
     
     } else {
   
       if (previous_sibiling) previous_sibiling.addText(dom_text.text);
       return previous_sibling;
     }  
   }
   else {
     return previous_sibling;
   }
   
   break;

  default:
    break;
  } // end switch

  return null;

};

/**
 * @method calculateDescriptions
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description if a element has an aria-describedby attribute defined
 */

OpenAjax.a11y.cache.DOMCache.prototype.calculateDescriptions = function () {

  var de;
  var dom_elements     = this.element_cache.dom_elements;
  var dom_elements_len = dom_elements.length;

  for (var i = 0; i < dom_elements_len; i++ ) {
    de = dom_elements[i];
    
    if (de.aria_describedby) {
      de.calculated_aria_description = this.getTextFromIDs(de.aria_describedby);  
    }
  }
};

/**
 * @method getNameFromARIALabel
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Add an ARIA label to cache element if aria-labelledy or aria-label attributes are defined
 *
 * @param {Object} element - Cache element object
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
 element.label_length = label.length;
 element.label_source = label_source;
 element.label_for_comparison = label.normalizeSpace().toLowerCase();

};

/**
 * @method getNameFromARIALabel
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Returns the text content of the elements identified in the list of ids
 *
 * @param {String}  ids  An string with space separated ids
 *
 * @return String
 */

OpenAjax.a11y.cache.DOMCache.prototype.getTextFromIDs = function (ids) {

  if (!ids || ids.length === 0) return ""; 
  
  return this.element_with_id_cache.getTextFromIds(ids);

};

/**
 * @method sortArrayOfObjects
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Sort an array of objects by one of its properties and marks any properties that are duplicates
 *
 * @param {Array}   objects   - Array of objects to sort
 * @param {String}  property  - Text string of property to sort
 * @param {Boolean} ascending - True sort by ascending values otherwise sort by descending values
 *
 * @return Array of sorted objects
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

/* ---------------------------------------------------------------- */
/*                    LandmarkInfo Object                           */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc LandmarkInfo is the constructor for information related to landmarks
 *       in building the headings/landmark cache
 *
 * @param {LandmarkInfo}  landmark_info - Current landmark (if any)
 *
 * @property {Control Object}  landmark_element  - Parent landmark element 
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
  }
  else {
    this.landmark_element = null;
  }
 
};

/* ---------------------------------------------------------------- */
/*                     HeadingsLandmarksCache                       */ 
/* ---------------------------------------------------------------- */

/**
 * @constructs HeadingsLandmarksCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc HeadingsLandmarksCache is the constructor for lists of heading and landmrk element objects and
 *       the root of a tree representation of the landmark and heading element relationships
 *
 * @param {DOMCache}  dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}  child_cache_elements  - Root array of the tree representation of the landmarks and headings in the document 
 *
 * @property {Array}   landmark_elements        - List of all the landmark elements in the document 
 * @property {String}  landmarks_sort_property  - Name of the landmark element property the landmark elements array is currently sorted
 * @property {Number}  landmark_length          - The length of the landmark elements list, used in calculating cache id values 
 *
 * @property {Array}   heading_elements        - List of all the heading elements in the document 
 * @property {String}  headings_sort_property  - Name of the heading element property the heading elements array is currently sorted
 * @property {Number}  heading_length          - The length of the heading elements list, used in calculating cache id values 
 *
 * @property {Array}   elements_with_content   - List of content elements and text nodes outside of landmarks 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  
  this.up_to_date    = false;
 
  this.child_cache_elements   = [];
  
  this.landmark_elements = [];
  this.landmarks_sort_property = 'document_order';
  this.landmark_length  = 0;
  
  this.heading_elements = [];  
  this.headings_sort_property  = 'document_order';
  this.heading_length  = 0;
  
  this.elements_with_content = [];
   
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
  
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Adds a landmark or header element object to the root level of a tree of landmark/heading elements  
 *
 * @param {LandmarkElement | HeadingElement} child_element - Landmark or heading element object to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  } 

};

/**
 * @method addLandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a landmark element object to the heading elements list
 *
 * @param  {LandmarkElement} heading_element  - Landmark element object to a landmark elements list
 *
 * @return {Number} Returns the length of the landmark elements list
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
 * @method addHeadingElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a heading element object to the heading elements list
 *
 * @param  {HeadingElement} heading_element  - HeadingElement object to a heading_elements array
 *
 * @return {Number} Returns the length of the heading elements list
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
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark or heading element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | HeadingElement | null} Returns a landmark element object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var elements_with_content     = this.elements_with_content;
  var elements_with_content_len = elements_with_content.length;
  var item = null;

  item = this.getLandmarkElementByCacheId(cache_id);
  if (item) return item;
  
  item = this.getHeadingElementByCacheId(cache_id);
  if (item) return item;

  for (i = 0; i < elements_with_content_len; i++) {
    item = this.elements_with_content[i];
    if (item.cache_id == cache_id) return item;
  }

  return item;

};

/**
 * @method getLandmarkElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | null} Returns a landmark element object if cache id found, otherwise null
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
 * @method getHeadingElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the heading element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a heading element object
 *
 * @return  {HeadingElement | null}  Returns a heading object if cache id found, otherwise null
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
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Empties the landmark and headings cache 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.initCache = function () {

  this.child_cache_elements  = [];
  
  this.up_to_date = false;
 
  this.landmark_elements = [];
  this.landmark_length = 0;
  this.landmarks_sort_property = 'document_order';
  
  this.heading_elements = [];
  this.heading_length = 0;
  this.headings_sort_property = 'document_order';
 
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Updates the landmarks and headings cache by checking to see if a DOMElement
 *          should be added
 *  
 * @param  {DOMElement}    dom_element    - DOMElement object to check for inclusion in links cache
 * @param  {LandmarkInfo}  landmark_info  - Information about the current landmarks that are parents to this item
 * 
 * @return {LandmarkInfo}  Returns updated landmark info object
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCacheItems = function (dom_element, landmark_info) {

  var me;
  var le;
  var he;
  var li = new OpenAjax.a11y.cache.LandmarkInfo(landmark_info);
  
  dom_element.parent_landmark = landmark_info.landmark_element;
  
  if (landmark_info.landmark_element) dom_element.parent_landmark_role = landmark_info.landmark_element.role;
  
  if (dom_element.type == NODE_TYPE.ELEMENT) {

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

      return li;
    }
          
    // elements that can contain rendered content without having child dom text nodes
    if ((dom_element.tag_name == 'applet')   ||
        (dom_element.tag_name == 'area')     ||
        (dom_element.tag_name == 'button')   ||
        (dom_element.tag_name == 'canvas')   ||
        (dom_element.tag_name == 'embed')    ||
        (dom_element.tag_name == 'input')    ||
        (dom_element.tag_name == 'img')      ||
        (dom_element.tag_name == 'object')   ||
        (dom_element.tag_name == 'textarea') ||
        (dom_element.tag_name == 'select')) {
      this.elements_with_content.push(dom_element);
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
        he.parent_landmark_role = landmark_info.landmark_element.dom_element.role;
        landmark_info.landmark_element.addChildElement(he);
      } 
      else {
        this.addChildElement(he);  
      }

      return li;
    }
    
  }
  else {
    if (dom_element.parent_element.tag_name != 'title') this.elements_with_content.push(dom_element);
  }
  
  return li;
  
};

/**
 * @method traverseDOMElementsForLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses DOMElement objects in the tree to update the landmarks and headings cache 
 *
 * @param  {DOMElement}  dom_element - DOMElement object to check for inclusion in landmarks and headings cache
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.traverseDOMElementsForLandmarkElements = function (dom_element, landmark_info) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    var li = this.updateCacheItems(dom_element, landmark_info);
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForLandmarkElements(dom_element.child_dom_elements[i], li);
    } 
  }
};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses the DOMElements to update the landmarks and heading cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the landmark and headings cache are disabled, this 
 *       cache would not be updated
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCache = function () {
  var i;
  var li;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.initCache();
 
  li = new OpenAjax.a11y.cache.LandmarkInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating landmark elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLandmarkElements(children[i], li);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed landmark elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};


/**
 * @method sortLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc    Sorts the landmark elements list based on a property of the landmark element object
 *
 * @param   {String}   property   - LandmarkElement object property used to sort the cache
 * @param   {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  Return true if list was sorted; false was not sorted due to an error
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
 * @method sortHeadingElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Sorts the heading_elements array based on a property of the HeadingElement object
 *
 * @param {String}   property   - HeadingElement object property used to sort the cache
 * @param {Boolean}  ascending  -  true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  true if list was sorted, false if not
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

/* ---------------------------------------------------------------- */
/*                       LandmarkElement                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a landmark element object used to hold information about a landmark 
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the landmark element 
 * @param  {LandmarkElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the landmark element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the landmark element in the document in relationship to other landmark elements
 *
 * @property  {Array}  child_cache_elements  - Array of child cache landmark and heading element objects as part of cache landmark and header tree 
 *
 * @property  {String}   label                  - Accessible label of the landmark 
 * @property  {Number}   label_length           - Length of label text 
 * @property  {Number}   label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...) 
 * @property  {String}   label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.LandmarkElement = function (dom_element, parent_landmark) {

  this.dom_element           = dom_element;
  this.cache_id              = "";
  this.document_order        = 0;

  this.child_cache_elements  = [];

  this.parent_landmark       = parent_landmark;
 
  this.label                 = "";
  this.label_length          = 0;
  this.label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.label_for_comparison  = "";
 
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Adds a LandmarkElement or HeaderElement object to the tree of landmark/heading elements  
 *
 * @param {LandmarkElement | HeadingElement}  child_element  - Landmark element or heading element object to add 
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_cache_elements.push(child_element); 
  }  

}; 


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark_role');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns a text string representation of the landmark element 
 *
 * @return {String} Returns string represention the landmark element object
 */
 
OpenAjax.a11y.cache.LandmarkElement.prototype.toString = function () {
 if (this.label && this.label_length) {
   return this.dom_element.role + " landmark: " + this.label;  
 }
 else {
   return this.dom_element.role + " landmark: no label";   
 }
}; 

/* ---------------------------------------------------------------- */
/*                       HeadingElement                             */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor HeadingElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a heading element object used to hold information about a h1 - h6 heading elements 
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the heading element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the heading element in the document in relationship to other heading elements
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {String}   name_from_text_nodes  - Accessible name content from text nodes
 * @property  {String}   name_from_image_alt   - Accessible name content from alt content of images
 * @property  {Number}   image_count           - Number of images that are descendents of the link
 * @property  {Boolean}  text_only_from_image  - true if accessble name is onky from an image, otherwise false 
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element) {
 
  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;
   
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

  var ano = dom_element.getTextObject();
  
  this.name                  = ano.name;
  this.name_length           = ano.name.length;
  this.name_for_comparison   = ano.name.normalizeSpace().toLowerCase();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt   = ano.name_from_image_alt;
  this.image_count           = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  this.parent_landmark_role = "";

  return this;
    
};


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
 cache_nls.addPropertyIfDefined(properties, this, 'image_count');
 cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');
 cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark_role');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.console("Heading property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
  
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns a text string representation of the heading (h1-h6) element 
 *
 * @return {String} Returns string represention the heading element object
 */
  
OpenAjax.a11y.cache.HeadingElement.prototype.toString = function() {
  if (this.name && this.name_length) {
    return "H" + this.level + ": " + this.name;
  }
  else {
    return "H" + this.level + ": no content";
  }

};
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
/*                            ImageCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to images in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    image_elements  - List of image element objects in the document 
 * @property {Number}   length          - Number of image element objects in the list 
 *
 * @property {String}   sort_property   - Image element object property the list of link objects is sorted by
 * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */
  
OpenAjax.a11y.cache.ImagesCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
 
  this.image_elements = [];
  this.length = 0;
 
  this.sort_property  = 'document_order';
  this.sort_ascending = true;

  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
}; 

/**
 * @method addImageElement
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Adds a image element to the list of image elements and generates a cache id for the object.
 *
 * @param  {ImageElement}  image_element  - image element object to add 
 *
 * @return {Number} Returns the length of the list of image element objects
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
 * @deprecated getImageElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getImageElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getItemByCacheId = function (cache_id) {

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
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Resests the ImagesCache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.ImagesCache.prototype.emptyCache = function () {

  this.image_elements.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Updates the images cache object by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in images cache
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCacheItems = function (dom_element) {

  if ((dom_element.tag_name == 'img') ||
      (dom_element.tag_name == 'area') ||
      (dom_element.tag_name == 'canvas')) {

    var image_element = new OpenAjax.a11y.cache.ImageElement(dom_element, this.dom_cache.base_url);    
    this.dom_cache.images_cache.addImageElement(image_element);
  
  }
  
};

/**
 * @method traverseDOMElementsForImageElements
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses DOMElement objects in the tree to update the images cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in images cache
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.traverseDOMElementsForImageElements = function (dom_element) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForImageElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses the DOMElements to update the images cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the links cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating image elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForImageElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed image elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * @method sortImageElements
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Sorts image element array by image element object property
 *
 * @param {String}   property   - Property of image element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
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

/* ---------------------------------------------------------------- */
/*                            ImageElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImageElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates image element object representing information related to an image or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the image or area element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the image or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the image or area element in the document in relationship to other image or area elements
 *
 * @property  {String}   source    - The url in the src property of an image element or href property of an area element 
 * @property  {String}   file_name - The filename of the image
 * @property  {String}   longdesc  - The url in the longdesc property of an image element  
 *
 * @property  {String}   alt                   - Calculated accessible name of the link 
 * @property  {String}   alt_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {Number}   alt_length           - Number of images that are descendents of the link
 *  
 * @property  {Number}   height  - Height of the image in pixels
 * @property  {Number}   width   - Width of the image in pixels
 */
 
OpenAjax.a11y.cache.ImageElement = function (dom_element, base_url) {

  var alt_value;

  if (!dom_element) return null;  

  var node = dom_element.node;
 
  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.source    = "";
  this.href      = "";
  this.file_name = "";

  if (dom_element.tag_name == 'img') {
  
    if (node.src) this.source = node.src;
    
    var pos = this.source.lastIndexOf('/');    
    
    if (this.source.length && pos >= 0 ) this.file_name = this.source.substring((pos+1)).toLowerCase();
  
  }
  
  if (dom_element.tag_name == 'area') {
    this.href  = node.href;
  }

  this.alt = null;
  this.alt_length = 0;
  this.alt_for_comparison = null;

  if (dom_element.has_alt_attribute) {
    this.alt        = dom_element.alt;
    this.alt_length = dom_element.alt.length;
    this.alt_for_comparison = this.alt.normalizeSpace().toLowerCase();
  }

  this.longdesc = node.getAttribute('longdesc');
  
  if (this.longdesc) {
    if (this.longdesc.indexOf('http:') == -1 ) {
      this.longdesc = base_url + this.longdesc;
    }
    this.has_longdesc = true;
    this.longdesc_is_broken = OpenAjax.a11y.util.urlExists(this.longdesc);
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
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ImageElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
     
  cache_nls.addPropertyIfDefined(attributes, this, 'href');
  cache_nls.addPropertyIfDefined(attributes, this, 'source');
  cache_nls.addPropertyIfDefined(attributes, this, 'longdesc');
  
  return attributes;
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'alt_length');
  cache_nls.addPropertyIfDefined(properties, this, 'alt_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'height');
  cache_nls.addPropertyIfDefined(properties, this, 'width');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.console("Image property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};  

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method getAltTextNLS
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If alt attribute is empty a empty alt text message will the returned 
 *
 * @return {String | Object} Returns a String if the alt attribute has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAltTextNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var alt_style = {};
  
  if (this.dom_element.has_alt_attribute) {
    if (this.alt_length) {
      return this.alt;
    }
    else {
      return cache_nls.getEmptyAltTextMessageNLS();
    }
  }
  else {
    return cache_nls.getMissingAltMessageNLS();
  }
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Creates a text string representation of the image element object 
 *
 * @return {String} Returns a text string representation of the image element object
 */
 
 OpenAjax.a11y.cache.ImageElement.prototype.toString = function () {
   if (this.alt_length) {
     return this.dom_element.tag_name + " : " + this.alt;
   }
   else {
     return this.dom_element.tag_name + " : no alt text";   
   }
 };


/*
 * Copyright 2011, 2012 OpenAjax Alliance
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
 * @constructor LanguagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for languages cache object which contains a list of 
 *    language items representing the language changes of content 
 *    in the in a document. The language items also contain a list of all the 
 *    dom element objects that share the same language
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {String}    sort_property   - Property of language item that the list is sorted on  
 * @property {Boolean}   sort_ascending  - true if list is sorted by ascending values, otherwsie false 
 *
 * @property {Array}    language_items  - List of language items 
 * @property {Number}   length          - Number of language items in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */
OpenAjax.a11y.cache.LanguagesCache = function (dom_cache) {
    
  this.dom_cache  = dom_cache;
  this.up_to_date = false;
    
  this.language_items =[];
  this.length = 0;
        
  this.sort_property  = 'lang';
  this.sort_ascending = false;

  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
    
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
 * @method addLanguageItem
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Adds a DOM Element object with an language property to the langauge item list.
 *       If the abreviation item does not exist the function will create one
 *
 * @param {DOMElement}  dom_element  - dom element to add to a abbreviation list
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
 * @deprecated getLanguageItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.languagesCache
 *
 * @desc Returns the language item object with the cache id
 *
 * @param {String}  cache_id  - cache id of the language item object
 *
 * @return {LanguageItem} Returns language item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getLanguageItemByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.languagesCache
 *
 * @desc Returns the language item object with the cache id
 *
 * @param {String}  cache_id  - cache id of the language item object
 *
 * @return {LanguageItem} Returns language item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getItemByCacheId = function (cache_id) {
    
  var i, j;
  var li, de;
  var dom_elements, dom_elements_len;
  
  var language_items     = this.language_items;
  var language_items_len = language_items.length;
    
  if (cache_id && cache_id.length) {
  
    for (i = 0; i < language_items_len; i++) {
      li = language_items[i];
      
      if (li.cache_id == cache_id) return li;
      
      dom_elements     = li.dom_elements;
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
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Empties all the language items from the cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.emptyCache = function () {
    
    this.language_items.length = 0;
    this.up_to_date = false;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Updates the language cache object with information from a dom element object
 *       This is used during the creation of the cache and is used by the functions for
 *       either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCacheItems = function (dom_element) {
    
    if (dom_element.lang && dom_element.lang.length) {
      this.addLanguageItem(dom_element);
    }  
};

/**
 * @method traverseDOMElementsForLanguages
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.traverseDOMElementsForLanguages = function (dom_element) {
    
    var i;
    if (! dom_element) return;
    
    if (dom_element.type == NODE_TYPE.ELEMENT) {
        
        this.updateCacheItems(dom_element);
        
        for (i = 0; i < dom_element.child_dom_elements.length; i++) {
            this.traverseDOMElementsForLanguages(dom_element.child_dom_elements[i]);
        }
        // end loop
    }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 *    This function is used to update the language cache 
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCache = function () {
    var i;
    var children = this.dom_cache.element_cache.child_dom_elements;
    var children_len = children.length;
    
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating language cache.");
    for (i = 0; i < children_len; i++) {
        this.traverseDOMElementsForLanguages(children[i]);
    }
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed language cache update, number of cache items is " + this.length);
    
    this.up_to_date = true;
};


/**
 * @method sortLanguageItems
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Sorts languages by language property
 *
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.sortLanguageItems = function(ascending) {

  var swapped = false;
  var temp = null;
  var i;

  if( !this.language_items || (this.language_items.length === 0)) {
    return false;
  } // endif

  this.sort_ascending = ascending;
 
  var language_items_len = this.language_items.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < language_items_len; i++ ) {
        if (this.language_items[i-1].language > this.language_items[i].language) {
          // swap the values
          temp = this.language_items[i-1];
          this.language_items[i-1] = this.language_items[i];
          this.language_items[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < language_items_len; i++ ) {
        if (this.language_items[i-1].language < this.language_items[i].language) {
          // swap the values
          temp = this.language_items[i-1];
          this.language_items[i-1] = this.language_items[i];
          this.language_items[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.sort_property = 'language';
 
  return true;

}; 

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Returns a text string representation of the language cache object 
 *
 * @return {String} Returns string represention the language cache object
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

/* ---------------------------------------------------------------- */
/*                      LanguageItem                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LanguageItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for languages item object which contains information
 *       about dom elements that share the same abbreviation 
 * 
 * @param  {String}  language  - language reference value
 *         
 * @property  {String}  language   - text of abbreviation
 * @property  {String}  cache_id   - String that uniquely identifies the cache element in the cache
 *
 * @property  {Array}   dom_elements  - List of dom elements associated with the language reference 
 * @property  {Number}  count         - Number of dom elements that share this language reference
 */
  
OpenAjax.a11y.cache.LanguageItem = function (language) {
    
  this.cach_id = "";
  
  this.language = language;
  this.dom_elements = [];
  this.count = 0;
    
};

/**
 * @method addDOMElement
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc  Adds a dom element object to the list of dom elements associated with this language reference 
 *
 * @param  {DOMElement} dom_element  - dom element object to add
 */

OpenAjax.a11y.cache.LanguageItem.prototype.addDOMElement = function (dom_element) {
    
    if (dom_element) {
      this.dom_elements.push(dom_element);
    }
};


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getResultRules = function () {
  return this.dom_text_nodes[0].getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getStyle = function () {

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
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getAttributes = function (unsorted) {

  return [];
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'language');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getEvents = function () {
   
  return [];
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns a text string representation of the language reference object 
 *
 * @return {String} Returns string represention the language reference object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.toString = function () {
    
    return "  Language: " + this.language + " (" + this.dom_elements.length + " elements)\n";
    
};
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
/*                            LinkCache                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinksCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to links in a web page
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object       
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    area_elements  - List of area element objects in the document 
 * @property {Array}    link_elements  - List of link element objects in the document 
 * @property {Number}   length         - Number of link element objects in the list 
 *
 * @property {String}   this.sort_property   - Link element object property the list of link objects is sorted by
 * @property {Boolean}  this.sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {Array}    links_sorted_by_href  - List of link element object sorted by href values;
 * @property {Array}    links_sorted_by_name  - List of link element object sorted by there accessible name (i.e link text);
 *  
 * @property {Array}    duplicate_name_items  - List of duplicate name object
 * @property {Array}    duplicate_href_items  - List of duplicate href objects
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.LinksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.area_elements = [];
  this.link_elements = [];
  this.length = 0;
  
  this.links_sorted_by_href = [];
  this.links_sorted_by_name = [];
  
  this.duplicate_name_items = [];
  this.duplicate_href_items = [];
  
  this.sort_property = 'document_order';
  this.sort_ascending = true;
  
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
}; 

/**
 * @method checkForDuplicateNAME
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Checks for duplicate link names, if a duplicate is founds adds it to the list of duplicate accessible names
 *
 * @param {LinkElement} link_element  - link_element object to check 
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
      dn = new OpenAjax.a11y.cache.DuplicateNameItem(link_element.name, link_element.name_for_comparison);
      dn.addLinkElement(links_sorted_by_name[j]);
      dn.addLinkElement(link_element);
      this.duplicate_name_items.push(dn);
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
  
};

/**
 * @method checkForDuplicateHREF
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Checks for duplicate link href, if a duplicate is founds adds it to the list of duplicate hrefs
 *
 * @param {LinkElement}  link_element  - Link element object to check 
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
  
  var duplicate_href_items     = this.duplicate_href_items;
  var duplicate_href_items_len = duplicate_href_items.length;

  for (i = 0; i < duplicate_href_items_len; i++) {
    dh = duplicate_href_items[i];
    
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
      dh = new OpenAjax.a11y.cache.DuplicateHREFItem(link_element.href);
      dh.addLinkElement(links_sorted_by_href[j]);
      dh.addLinkElement(link_element);
      this.duplicate_href_items.push(dh);
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
 * @method getDuplicateHREFByHREF
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Gets a duplicate href item by the href value
 *
 * @param {String}  href   -  href value to be found
 *
 * @return {DuplicateHREFItem}  Returns duplicate href item if found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateHREFByHREF = function (href) {

  var i;
  var dh;
  
  var duplicate_href_items     = this.duplicate_href_items;
  var duplicate_href_items_len = duplicate_href_items.length;

  if (href) {
    for (i = 0; i < duplicate_href_items_len; i++) {
      dh = duplicate_href_items[i];
      if (dh.href === href) return dh;
    } // end loop
  } 

  return null;

};

/**
 * @method getDuplicateNameByName
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Gets a duplicate accessible name item
 *
 * @param {String}  name   -  accessible name to be found
 *
 * @return {DuplicateNameItem}  Returns duplicate accessible name item if found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateNameByName = function (name) {

  var i;
  var dn;
  
  var duplicate_name_items     = this.duplicate_name_items;
  var duplicate_name_items_len = duplicate_name_items.length;

  if (name) {
    for (i = 0; i < duplicate_name_items_len; i++) {
      dh = duplicate_name_items[i];
      if (dh.name_for_comparison === name) return dh;
    } // end loop
  } 

  return null;

};


/**
 * @method addLinkElement
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Adds a link element to the list of link elements and generates a cache id for the object.
 *       Checks if the link has a duplicate href or name in the document 
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
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
 * @deprecated getLinkElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getItemByCacheId = function (cache_id) {

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
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Resests the LinksCache object properties and empties all the lists and arrays 
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.emptyCache = function () {

  this.link_elements = [];
  this.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Updates the links cache object by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in links cache
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
 * @method traverseDOMElementsForLinkElements
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses dom element objects in the tree to update the links cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in links cache
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.traverseDOMElementsForLinkElements = function (dom_element) {
 
  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i = 0; i < dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForLinkElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
}; 


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses the DOMElements to update the links cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the links cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCache = function () {

  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating link elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLinkElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed link elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
 
};

/**
 * @method sortLinkElements
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Sorts link element array by link element object property
 *
 * @param {String}   property   - Property of link element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
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

/* ---------------------------------------------------------------- */
/*                            LinkElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates link element object representing information related to an a or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the a or area element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the a or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the a or area element in the document in relationship to other a or area elements
 *
 * @property  {String}   href   - The absolute path of the href value 
 * @property  {Boolean}  is_url - true if href is a a url, otherwise false (i.e. internal link or broken)
 *
 * @property  {String}   tab_index  - value of the tabindex attribute
 * @property  {String}   name_attr  - value of the name attribute
 * @property  {String}   target     - value of the target attribute
 *
 * @property  {String}   name                  - Calculated accessible name of the link 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {String}   name_from_text_nodes  - Accessible name content from text nodes
 * @property  {String}   name_from_image_alt   - Accessible name content from alt content of images
 * @property  {Number}   image_count           - Number of images that are descendents of the link
 * @property  {Boolean}  text_only_from_image  - true if accessble name is onky from an image, otherwise false 
 *  
 * @property  {Number}   height  - Height of the link in pixels
 * @property  {Number}   width   - Width of the link in pixels
 */
 
OpenAjax.a11y.cache.LinkElement = function (dom_element) {

  var ano;
  var href = dom_element.node.href;

  function getTypeOfLink(href, name) {
  
    href = href.toLowerCase();
    
    if (typeof href != 'string') return OpenAjax.a11y.LINK_TYPE.OTHER;

    if (href.length === 0) { 
      if (name) 
        return OpenAjax.a11y.LINK_TYPE.TARGET;
      else  
        return OpenAjax.a11y.LINK_TYPE.EMPTY;
    }    
    
    if (href.indexOf('http://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTP;
    else
      if (href.indexOf('https://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTPS;
      else
        if (href.indexOf('ftp://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTP;
        else
          if (href.indexOf('ftps://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTPS;
          else 
            if (href.indexOf('file://') >= 0) return OpenAjax.a11y.LINK_TYPE.FILE;
            else 
              if (href.indexOf('javascript:') >= 0) return OpenAjax.a11y.LINK_TYPE.JAVASCRIPT;
              else 
                if (href.indexOf('mailto:') >= 0) return OpenAjax.a11y.LINK_TYPE.MAILTO;
                else 
                  if (href[0] === '#') return OpenAjax.a11y.LINK_TYPE.INTERNAL;
 
    return OpenAjax.a11y.LINK_TYPE.HTTP;
  }


  function testIfHrefIsURL(url) {
  
    if (typeof href != 'string') return false;
  
    if (url.indexOf('http://') >= 0) return true;
    else
      if (url.indexOf('https://') >= 0) return true;
      else
        if (url.indexOf('ftp://') >= 0) return true;
        else
          if (url.indexOf('ftps://') >= 0) return true;
          else 
            if (url.indexOf('file://') >= 0) return true;
 
    return false;
  }

  if (!dom_element.node) return;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
 
  this.href  = href;
  this.is_url = testIfHrefIsURL(href);
  if (this.is_url) { 
    this.is_broken = OpenAjax.a11y.util.urlExists(href);
  }
  else {
    this.is_broken = OpenAjax.a11y.URL_RESULT.NOT_A_URL;
  }

  this.tab_index = dom_element.node.tabIndex;
  
  this.name_attribute = dom_element.node.getAttribute("name");
  this.is_target = this.name_attribute && (this.name_attribute.length > 0);

  this.link_type = getTypeOfLink(href, this.name_attribute);

  this.target  = dom_element.node.getAttribute("target");

  ano = dom_element.getTextObject();
  
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

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LinkElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'href');

  cache_nls.addPropertyIfDefined(attributes, this, 'tab_index');
  cache_nls.addPropertyIfDefined(attributes, this, 'name_attribute');
  cache_nls.addPropertyIfDefined(attributes, this, 'target');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'name');
  cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
  cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
  cache_nls.addPropertyIfDefined(properties, this, 'image_count');
  cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');

  cache_nls.addPropertyIfDefined(properties, this, 'is_broken');
  cache_nls.addPropertyIfDefined(properties, this, 'is_url');
  cache_nls.addPropertyIfDefined(properties, this, 'is_target');
  cache_nls.addPropertyIfDefined(properties, this, 'link_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLinkType
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {String} Returns a NLS string representing the type of link
 */

OpenAjax.a11y.cache.LinkElement.prototype.getLinkType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getValueNLS('link_type', this.link_type);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Creates a text string representation of the link element object 
 *
 * @return {String} Returns a text string representation of the link element object
 */
 
 OpenAjax.a11y.cache.LinkElement.prototype.toString = function () {
   return this.dom_element.tag_name + " : " + this.name;
 };


/* ---------------------------------------------------------------- */
/*                         DuplicateNameItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor DuplicateNameItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates duplicate name object to identify links with the same accessible name
 *
 * @param  {String}   name                  - Accessible name of a link 
 * @param  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 *
 * @property  {String}   name                  - Accessible name of the link 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * 
 * @property  {Array}  link_elements  -  List of all the link objects that share the same accessible name
 */

OpenAjax.a11y.cache.DuplicateNameItem = function (name, name_for_comparison) {

  this.name                = name;
  this.name_for_comparison = name_for_comparison;
  this.link_elements = [];

};

/**
 * @method addLinkElement
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Adds a link element to a list of links with duplicate accessible names
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.link_elements.push( link_element );
  } 

  return this.link_elements.length;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};




/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};




/* ---------------------------------------------------------------- */
/*                         DuplicateHREFItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor DuplicateHREFItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates duplicate name object to identify links with the same hrefs 
 *
 * @param  {String}   href  - href of a link 
 *
 * @property  {String}   href  -  href of a link
 * 
 * @property  {Array}   link_elements  -  List of all the link objects that share the same href
 */

OpenAjax.a11y.cache.DuplicateHREFItem = function (href) {

  this.href = href;
  this.link_elements = [];

};

/**
 * @method addLinkElement
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Adds a link element to a list of links with duplicate hrefs
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.addLinkElement = function (link_element) {

  // item must exist 
  if (link_element) {
    this.link_elements.push( link_element ); 
  } 

  return this.link_elements.length;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'href');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};




/*
 * Copyright 2011, 2012 OpenAjax Alliance
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
 * @constructor ListsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for lists cache object which contains a list of 
 *    list items representing the list (i.e ul, ol , dl, li, dt and dd) 
 *    elements defined in a document. 
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the list elements in the document 
 *
 * @property {Array}   container_elements  - List of the container element objects in the document that are not children of a container item 
 * @property {Number}  length              - Number of containter element objects in list 
 *
 * @property {String}   sort_property   - Property of contanter element objectthe list is sorted on  
 * @property {Boolean}  sort_ascending  - true if list is sorted by ascending values, otherwise false 
 *
 * @property {Number}  landmark_count   - Number of containter element objects in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.ListsCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.child_cache_elements = []; 

  this.container_elements = [];  
  this.length = 0;

  this.sort_property  = 'document_order';
  this.sort_ascending = true;

  this.landmark_count  = 0;
  
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
};

/** 
 * @method addContainerElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Adds a container element object to the list of container elements  
 *
 * @param  {ContainerElement} container_element   - Container element object to add 
 *
 * @return  {Number} Returns the number of container element objects in the list of container element objects
 */

OpenAjax.a11y.cache.ListsCache.prototype.addContainerElement = function (container_element) {

  if (container_element) {
    this.length += 1;
    container_element.document_order = this.length;
    container_element.cache_id = "con_" + this.length;
    this.container_elements.push(container_element);
    return true;
  }

  return false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Update the ListsCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new list element object should be added to this cache.
 *
 * @param  {DOMElement}   dom_element  - dom element object to check for inclusion in lists cache
 * @param  {ListInfo}     list_info    - Information about the current list relationships in the DOM
 *
 * @return {ListInfo}  Returns updated list information object 
 */

OpenAjax.a11y.cache.ListsCache.prototype.updateCacheItems = function (dom_element, list_info) {

  var li = new OpenAjax.a11y.cache.ListInfo(list_info);

  // check whether we need to add a new ListElement
  switch (dom_element.tag_name) {
  
  case 'ul':
  case 'ol':
  case 'dl':
  
    var ce = new OpenAjax.a11y.cache.ContainerElement(dom_element, list_info);
    
    if (!list_info.container_element) this.addContainerElement(ce);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(ce);
    }
    else {
      this.addChildElement(ce);
    }

    li.container_element = ce;
    li.list_element      = ce;
    break;

  case 'li':
  case 'dt':
  case 'dd':

    var le = new OpenAjax.a11y.cache.ListElement(dom_element, list_info.container_element);

    if (list_info.container_element) list_info.container_element.addListElement(le);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(le);
    }
    else {
      this.addChildElement(le);
    }
    
    li.list_element = le;

    break;

  case 'a':
  
    if (list_info.list_element &&
        (dom_element.node.href && dom_element.node.href.length)) {
      list_info.list_element.link_count += 1;
    }

    break;
  
  default:
    break;
  
  } // end switch
  
  if ((dom_element.role == 'region')    ||
      (dom_element.role == 'main')     || 
      (dom_element.role == 'navigation')  ||
      (dom_element.role == 'search')    ||
      (dom_element.role == 'applicaton')  ||
      (dom_element.role == 'banner')    ||
      (dom_element.role == 'complementary') ||
      (dom_element.role == 'contentinfo')  ||
      (dom_element.role == 'form')) {
   
    le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, list_info.parent_landmark);   
    
    le.cache_id = "listLandmark_" + this.landmark_count;
    
    this.landmark_count += 1;

    this.dom_cache.getNameFromARIALabel(le);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(le);
    }
    else {
      this.addChildElement(le);
    }
  
    li.parent_landmark = le;
    li.list_element    = le;
    
  }

  return li;

};

/**
 * @method traverseDOMElementsForListElements
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 */
 
OpenAjax.a11y.cache.ListsCache.prototype.traverseDOMElementsForListElements = function (dom_element, list_info) {
 
  var i;
  var li;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    li = this.updateCacheItems(dom_element, list_info);
  
    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForListElements(dom_element.child_dom_elements[i], li);
    } // end loop
  
  }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the list cache
 *    This function is used to update the list cache 
 *    when needed by a rule, it sets the up to date flag when done
 */
 
OpenAjax.a11y.cache.ListsCache.prototype.updateCache = function () {

 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;
 
 var list_info = new OpenAjax.a11y.cache.ListInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating list cache.");
 for (i = 0; i < children_len; i++) {
  this.traverseDOMElementsForListElements(children[i], list_info);
 }  
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed list cache update.");

 this.up_to_date = true;
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Add a top-level list element object to the lists cache
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @deprecated getListElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc retrieve list element from lists cache based on its cache id
 *
 * @param  {String}  cache_id  -  cache id of the list cache element object to find
 *
 * @return {ListElement} Returns list cache object if cache id found, otherwise null 
 */

OpenAjax.a11y.cache.ListsCache.prototype.getListElementByCacheId = function (cache_id) {
 return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc retrieve list element from lists cache based on its cache id
 *
 * @param  {String}  cache_id  -  cache id of the list cache element object to find
 *
 * @return {ListElement} Returns list cache object if cache id found, otherwise null 
 */

OpenAjax.a11y.cache.ListsCache.prototype.getItemByCacheId = function (cache_id) {

  function findCacheID(child_elements) {

    var i; // loop counter
    var max; // loop control
    var le;
    var res;

    max = child_elements.length;
    for (i = 0; i < max; i++) {
      le = child_elements[i];
      if (le.cache_id === cache_id) {
        return le;
      }
      else {
        res = findCacheID(le.child_cache_elements);
        if (res) return res;
      }
    }
      
    return null;
  }

  return findCacheID(this.child_cache_elements);
  
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Empties all the properties of the list cache 
 */

OpenAjax.a11y.cache.ListsCache.prototype.emptyCache = function () {

  this.dom_cache = null;
  this.up_to_date = false;
  
  this.child_elements     = []; 

  this.container_elements = [];  
  this.length = 0;

  this.sort_property  = 'document_order';
  this.sort_ascending = true;
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Returns a text string representation of the lists cache object 
 *
 * @return {String} Returns string represention the lists cache object
 */

OpenAjax.a11y.cache.ListsCache.prototype.toString = function () {

 var str ="\n\nList Information\n";

 var list_length = this.container_elements.length;
 
 for (var i=0; i < list_length; i++ ) {
  str += this.container_elements[i].toString();  
 } // end loop

 return str;
};

/* ---------------------------------------------------------------- */
/*                            ListElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a LI, DT, DD element in the DOM
 *
 * @param  {DOMelement}        dom_element       - The dom element object representing the input element 
 * @param  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the list element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the list element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree 
 *
 * @property  {Number}  link_count    - Number of links in this list element
 */

OpenAjax.a11y.cache.ListElement = function (dom_element, parent_container) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.parent_container  = parent_container;
  this.list_type = OpenAjax.a11y.LIST.ITEM;

  this.child_cache_elements = [];
  this.link_count = 0;

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Add a list element object to the tree of list cache items 
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ListElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'list_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ListElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns a text string representation of the list item object 
 *
 * @return {String} Returns string represention the list item object
 */

OpenAjax.a11y.cache.ListElement.prototype.toString = function () {

 return "List Item " + this.document_order + ": " + this.dom_element.getText(); 
 
};

/* ---------------------------------------------------------------- */
/*                           ContainerElement                       */
/* ---------------------------------------------------------------- */

/**
 * @constructor ContainerElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a OL, UL, DL element in the DOM
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the input element 
 * @param  {ListInfo}    list_info    - Current list information about 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the container element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the container element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the container element is contained in
 * @property  {LandmarkElement}   parent_landmark   - Reference to the landmark element the container element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree 
 */

OpenAjax.a11y.cache.ContainerElement = function (dom_element, list_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.parent_container  = list_info.parent_container;
  this.parent_landmark   = list_info.parent_landmark;
  
  this.list_type = OpenAjax.a11y.LIST.CONTAINER;

  this.child_cache_elements = [];
  this.link_count = 0;

  this.list_elements = [];
  this.length = 0;

};

/**
 * @method addListElement
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Add a list element object to the list of list items 
 *
 * @param {ListElement} list_element - list element object to add to the list of list elements
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ContainerElement.prototype.addListElement = function (list_element) {

  if (list_element) {
    this.length += 1;
    list_element.document_order = this.length;
    list_element.cache_id = this.cache_id + "_li_" + this.length;
    this.list_elements.push(list_element);
    return true;
  }

  return false;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Add a list element object to the tree of list cache items 
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ContainerElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @method isListOfLinks
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Check whether a list container contains at least the
 *       minimum number of li elements with one and only one link.
 *
 * @param {Number}  min_li  The minimum number of list elements with one link
 *                          that the list element must contain.
 *
 * @return {boolean} Returns true if the list is considered a list of links, otherwise false
 */

OpenAjax.a11y.cache.ContainerElement.prototype.isListOfLinks = function (min_li) {
 
  var child_elements = this.child_cache_elements;
  var max = child_elements.length;
  var i;  // loop counter
  var ce; // loop placeholder

  // results
  var count_li = 0;
  var count_li_with_link = 0;

  for (i = 0; i < max; i++) {
    ce = child_elements[i];

    // ignore elements that are not 'li'
    if (ce.list_type !== OpenAjax.a11y.LIST.ITEM) continue;

    // we've got an 'li' element
    count_li += 1;

    // but each must have a link_count of 1
    if (ce.link_count != 1) return false;
    count_li_with_link += 1;
  }

  return (count_li == count_li_with_link) && (count_li >= min_li);

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
  
  cache_nls.addPropertyIfDefined(properties, this, 'list_type');
  cache_nls.addPropertyIfDefined(properties, this, 'link_count');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns a text string representation of the container element object 
 *
 * @return {String} Returns string represention the container element object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.toString = function () {

 return "List Container " + this.document_order + " with " + this.child_cache_elements.length + " list items"; 
 
};


/* ---------------------------------------------------------------- */
/*                              ListInfo                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a list information object for preserving the current list information 
 *        when traversing the DOM
 *
 * @param {ListInfo} list_info - Current list information object
 *
 * @property {ListElement | ContainerElement}  list_element      - Parent container list or container element object 
 * @property {ContainerElement}                container_element - Parent container element object 
 * @property {LandmarkElement}                 landmark_element  - Parent landmark element object 
 */

OpenAjax.a11y.cache.ListInfo = function (list_info) {

  if (list_info) {
    this.list_element      = list_info.list_element;
    this.container_element = list_info.container_element;
    this.landmark_element  = list_info.landmark_element;
  }
  else {
    this.list_element      = null;
    this.container_element = null;
    this.landmark_element  = null;
  }

};
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
/*                      OpenAjax Media Cache                        */ 
/* ---------------------------------------------------------------- */


/**
 * @constructor MediaCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to audio, video and other media objects in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    media_elements  - List of media element objects in the document 
 * @property {Number}   length          - Number of media element objects in the list 
 *
 * @property {String}   sort_property   - Image element object property the list of media objects is sorted by
 * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.MediaCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.media_elements = [];
  this.length = 0;
 
  this.sort_property = 'document_order';
  this.sort_ascending = false;
 
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
}; 

/**
 * @method addMediaElement
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Adds a media element object to the list of media elements and generates a cache id for the object.
 *
 * @param  {MediaElement}  media_element  - media element object to add 
 *
 * @return {Number} Returns the length of the list of media element objects
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
 * @method getMediaElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getMediaElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getItemByCacheId = function (cache_id) {

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
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Resests the media cache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.MediaCache.prototype.emptyCache = function () {

  this.media_elements.length = 0;
  this.sort_property = 'document_order';
  this.sort_ascending = false;
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Updates the media cache by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in media cache
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
 * @method traverseDOMElementsForMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses DOMElement objects in the tree to update the media cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in media cache
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.traverseDOMElementsForMediaElements = function (dom_element) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i=0; i<dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForMediaElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses the DOMElements to update the media cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the media cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating media elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForMediaElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed media elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * @method sortMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Sorts media element array by a media element object property
 *
 * @param {String}   property   - Property of media element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
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


/* ---------------------------------------------------------------- */
/*                            MediaElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor MediaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates media element object representing information related to an object, video, audio, embed or applet element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the media element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the media element
 * @property  {String}      cache_id        - String that uniquely identifies the media element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the media element in the document in relationship to other media elements
 *
 * @property  {Number}  is_video               - Constant indicating the probability of the media element including video
 * @property  {Number}  is_audio               - Constant indicating the probability of the media element including audio
 * @property  {Number}  has_caption            - Constant indicating the probability of the media element having a caption 
 * @property  {Number}  has_text_alternative   - Constant indicating the probability of the media element having a text description
 * @property  {Number}  has_audio_description  - Constant indicating the probability of the media element having an audio description
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

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MediaElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'alt');

  return attributes;
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'is_video');
  cache_nls.addPropertyIfDefined(properties, this, 'is_audio');
  cache_nls.addPropertyIfDefined(properties, this, 'has_caption');
  cache_nls.addPropertyIfDefined(properties, this, 'has_text_alternative');
  cache_nls.addPropertyIfDefined(properties, this, 'has_audio_description');
  cache_nls.addPropertyIfDefined(properties, this, 'alt_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Creates a text string representation of the media element object 
 *
 * @return {String} Returns a text string representation of the media element object
 */
 
 OpenAjax.a11y.cache.MediaElement.prototype.toString = function () {
   return "Media " + this.document_order + ": " + this.dom_element.tag_name;
 };

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

 
/**
 * @constructor DOMElementComputedStyle
 *
 * @memberOf OpenAjax.a11y.cache
 * 
 * @desc Create a dom element computed style object is used to add style properties to dom element cache objects 
 * 
 * @param  {DOMElement}  dom_element     - dom element node to add computed style information to 
 * @param  {DOMElement}  parent_element  - parent dom element node for computing inherited properties 
 *
 * @property  {String}  display     - Computed value of the CSS 'display' property
 * @property  {String}  visibility  - Computed value of the CSS 'visibility' property
 *
 * @property  {Number}  graphical   - Constant representing the graphical visibility of the element (i.e is it visible to people with sight)
 * @property  {Number}  at          - Constant representing the assistive technology visibility of the element (i.e is it visible to people using a screen reader)
 * 
 * @property  {String}  color                 - Computed value of the CSS 'color' property
 * @property  {String}  color_hex             - Computed value of the CSS 'color' property in hexidecimal format
 * @property  {String}  opacity               - Computed value of the CSS 'opacity' property
 * @property  {String}  background_color      - Computed value of the CSS 'background-color' property
 * @property  {String}  background_color_hex  - Computed value of the CSS 'background-color' property in hexidecimal format
 * @property  {String}  background_image      - Computed value of the CSS 'background-image' property
 * @property  {String}  background_repeat     - Computed value of the CSS 'background-repeat' property
 * @property  {String}  background_position   - Computed value of the CSS 'background-position' property
 *
 * @property  {String}  font_family  - Computed value of the CSS 'font-family' property
 * @property  {String}  font_size    - Computed value of the CSS 'font-size' property
 * @property  {String}  font_weight  - Computed value of the CSS 'font-weight' property
 *
 * @property  {String}  position  - Computed value of the CSS 'position' property
 * @property  {String}  left      - Computed value of the CSS 'left' property  
 * @property  {String}  top       - Computed value of the CSS 'top' property
 * @property  {String}  width     - Computed value of the width of the rendered element in pixels  
 * @property  {String}  height    - Computed value of the height of the rendered element in pixels
 */
 
OpenAjax.a11y.cache.DOMElementComputedStyle = function (dom_element, parent_element) {

  function normalizeBackgroundImage(value, parent_element) {

    var v = value;

    if ((value.toLowerCase() === 'inherit') || 
        (value.toLowerCase() === 'none') || 
        (value === '')) {
    
      if (parent_element) {  
        v = parent_element.computed_style.background_image;
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
 
 this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.UNKNOWN; 
 this.is_visible_to_at    = OpenAjax.a11y.VISIBILITY.UNKNOWN;
 
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
 if (!window.getComputedStyle) return;
 
 var style = window.getComputedStyle(dom_element.node, null);  
   
 this.display    = style.getPropertyValue("display");
 this.visibility = style.getPropertyValue("visibility");
 
 this.color               = style.getPropertyValue("color");
 this.opacity             = style.getPropertyValue("opacity");
 this.background_color    = style.getPropertyValue("background-color");
 this.background_image    = normalizeBackgroundImage(style.getPropertyValue("background-image"), parent_element);
 this.background_repeat   = style.getPropertyValue("background-repeat");
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
  this.background_color_hex = OpenAjax.a11y.util.RGBToHEX(style.getPropertyValue("background-color")); 
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
   this.color_hex = OpenAjax.a11y.util.RGBToHEX(style.getPropertyValue("color"));
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
   this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.HIDDEN;
   this.is_visible_to_at    = OpenAjax.a11y.VISIBILITY.HIDDEN;
  }
  else {
   if (this.position == "absolute" &&
     (parseInt(this.top,10) < 0 || parseInt(this.left,10) < 0)) {
    this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.HIDDEN;
   }
   else {
    this.is_visible_onscreen = OpenAjax.a11y.VISIBILITY.VISIBLE;
   }
   
   if (dom_element.role == "presentation") {
    this.is_visible_to_at = OpenAjax.a11y.VISIBILITY.HIDDEN;  
   } 
   else {
    this.is_visible_to_at = OpenAjax.a11y.VISIBILITY.VISIBLE;     
   }
  }
 } 

 this.is_large_font = (parseInt(this.font_size,10) >= 18) || ((parseInt(this.font_size,10) >= 14) && (parseInt(this.font_weight,10) >= 300));

};

/**
 * @method calculateColorContrast
 *  
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 * 
 * @desc Calculates a color contrast raio (CCR) value for the element style object 
 *
 * @return {Number}  Returns a number representing the color contrast ratio (CCR)
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
 * @method getLuminance
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 * 
 * @desc Get the luminance value of a hex incoded color 
 *
 * @param {String}  color  - Hex representation of a CSS color value
 * 
 * @return {Number}  Returns a number representing the limnance value
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
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementComputedStyle
 *
 * @desc Creates a text string representation of the computed style object 
 *
 * @return {String} Returns a text string representation of the computed style object
 */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.toString = function (color) {
  return "Computed style " + this.color_hex + " " + this.background_color_hex + " " + this.color_contrast_ratio; 
};
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
/*                            TableInfo                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableInfo
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a TableInfo object for preserving the current table information 
 *        when traversing the DOM for table information
 *
 * @property {table cache object}   parent_element     - Parent table cache Object (if any)
 * @property {TableElement}         table_element      - Parent TableElement (if any)
 * @property {TBodyElement}         table_body_element - Parent TBodyElement (if any)
 * @property {TableRowElement}      table_row_element  - Parent TableRowElement (if any)
 * 
 * @param {TableInfo} table_info - Current ControlInfo object
 */
 
 OpenAjax.a11y.cache.TableInfo = function (table_info) {

   if (table_info) {
     this.parent_element      = table_info.parent_element;
     this.table_element       = table_info.table_element;
     this.table_body_element  = table_info.table_body_element;
     this.table_row_element   = table_info.table_row_element;
   }
   else {
     this.parent_element      = null;
     this.table_element       = null;
     this.table_body_element  = null;
     this.table_row_element   = null;
   }  
 }; 
 
/* ---------------------------------------------------------------- */
/*                          TablesCache Object                      */
/* ---------------------------------------------------------------- */

/** 
 * @constructor TablesCache
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Create a table cache object to hold information about tables in a web page
 *          
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache}  dom_cache   - Reference to the DOMCache object 
 * @property {Boolean}   up_to_date  - true if the cache has been creating using the current DOMElements, else false
 *                                       NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                             based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements - Root array of the tree representation of the table elements in the document 
 *
 * @property {Array}    table_elements - Array of all the TableElement objects in the cache  
 * @property {Number}   length         - Running length of the table_elements array for use in calculating cache_id values
 * @property {String}   sort_property  - The property a TableElement object the table_elements array is currently sorted by
 * @property {Boolean}  ascending      - Boolean  true if the list is ascending order or false if descending
 * 
 * @property {Array}    rule_results   - Root array of the tree representation of the table elements in the document 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache 
 */
OpenAjax.a11y.cache.TablesCache = function (dom_cache) {

  // Private properties
  this.dom_cache = dom_cache;
  this.up_to_date = false;

  // Public properties
  this.child_cache_elements = [];    
   
  this.table_elements = [];  
  this.length         = 0;  
  this.sort_property  = 'document_order';
  this.ascending      = true;

  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
   
};

/**
 * @method addTableElement
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Adds a table element object to the list of tables and generates a cache_id for the table element object
 *
 * @param {TableElement}  table_element   - TableElement object to add to the cache
 *
 * @return {Number} Returns the number of table element objects in the list
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
 * @method addChild
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 * 
 * @desc Adds a cache table element to the tree representation of the table in the table cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.addChild = function (table_element) {

   if (table_element) {
     this.child_cache_elements.push(table_element); 
   }  
 }; 

/** 
 * @method addRuleResult
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 * 
 * @desc Add a RuleResult reference to the table cache 
 *
 * @param {RuleResult}  rule_result - Rule result to associate with the table cache 
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addRuleResult = function (rule_result) {

   if (rule_result) {
     this.rule_results.push(rule_result); 
   }  
 }; 

/**
 * @deprecated getTableElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the table cache element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement | null} Returns cache table element object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getTableElementByCacheId = function (cache_id) {
   return this.getItemByCacheId(cache_id);
 };

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the table cache element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement | null} Returns cache table element object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getItemByCacheId = function (cache_id) {

   var i;
   var te;
   var table_elements_len = this.table_elements.length;
   var id_info = cache_id.split('_');
   var table_id = "table_" + id_info[1];
   
   for (i = 0; i < table_elements_len; i++) {
     te = this.table_elements[i];

     if (te.cache_id == cache_id) {
       return te;
     }
     else {
       if (te.cache_id == table_id) {
         return te.getTableElementByCacheId(cache_id);
       }
     }
   }
     
   return null;
 };

/**
 * @method getResultRuleByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the rule result object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {ResultRule | null} Returns cache rule result object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getResultRuleByCacheId = function (cache_id) {

   var i;
   var rr;
   var rule_results     = this.rule_summary_results.rule_results;
   var rule_results_len = rule_results.length;
      
   for (i = 0; i < rule_results_len; i++) {
     rr = rule_results[i];
     if (rr.cache_id == cache_id) return rr;
   } // end loop
     
   return null;
 };
/**
 * @method getRuleResultByRuleId
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Gets the rule result object with the matching rule id
 *
 * @param {String} rule_id - rule id of table element
 *
 * @return {RuleResult | null}}  Returns rule result object if rule id is found, otherwise null
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.getRuleResultByRuleId = function (rule_id) {

  var i;
  var rr;
  var rule_results_len = this.rule_results.length;
   
  for (i = 0; i < rule_results_len; i++) {
    rr = this.rule_results[i];

    if (rr.rule.rule_id == rule_id) {
      return rr;
    }
  }
     
  return null;
};


/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Updates the tables cache object by checking to see if a dom element object
 *          should be added to the table cache objects
 *  
 * @param  {DOMElement}  dom_element  - DOMElement object to check for inclusion in tables cache
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.updateCacheItems = function (dom_element, table_info) {

   var te;
   var tce;
   var ce;
   var tbe;
   var the;
   var tre;
   
   var ti = new OpenAjax.a11y.cache.TableInfo(table_info);

   switch (dom_element.tag_name) {

     case 'table':
       te = new OpenAjax.a11y.cache.TableElement(this.dom_cache, dom_element, table_info);
       this.addTableElement(te);
  
       if (table_info.parent_element) {
         table_info.parent_element.addChild(te);   
       }
       else {
         this.addChild(te);
       }
       
       ti.parent_element = te;   
       ti.table_element  = te;    
       ti.table_body_element  = null;    
       ti.table_row_element  = null;    
             
       break;

     case 'caption':
       ce = new OpenAjax.a11y.cache.CaptionElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(ce);   
         if (table_info.parent_element) {
           table_info.parent_element.addChild(ce);
         }
       }
 
       break;

     case 'thead':
       the = new OpenAjax.a11y.cache.THeadElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(the);   
         if (table_info.parent_element) {
           table_info.parent_element.addChild(the);   
         } 
       }

       ti.parent_element     = the;   
       ti.table_body_element = the;   
       ti.table_row_element  = null;    

       break;

     case 'tbody':
       tbe = new OpenAjax.a11y.cache.TBodyElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(tbe);   
         
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tbe);   
         }
       }
       
       ti.parent_element = tbe;   
       ti.table_body_element = tbe;   
       ti.table_row_element  = null;    

       break;

     case 'tr':
       tre = new OpenAjax.a11y.cache.TableRowElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(tre);   
         
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tre);   
         }
         
         if (table_info.table_body_element) {
           table_info.table_body_element.row_count++;
         }
       }
 
       ti.parent_element     = tre;
       ti.table_row_element  = tre;

       break;


     case 'td':
     case 'th':
       tce = new OpenAjax.a11y.cache.TableCellElement(dom_element, table_info);
       
       if (table_info.table_element) {
         table_info.table_element.addTableElement(tce);   
         
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tce);   
         }
       }
 
       ti.parent_element      = tce;
       
       break;
       
     default:
       break;

   } // end switch

   return ti;
 };

/**
 * @method traverseDOMElementsForTableElements
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param {TableElement}      dom_element  - DOMElement object to check fo inclusion in tables cache
 * @param {TableInformation}  table_info   - Information needed for identifying the parent/child relationships of nested tables
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.traverseDOMElementsForTableElements = function (dom_element, table_info) {

   var i;
   var ti;

   if (!dom_element) return;

     if (dom_element.type == NODE_TYPE.ELEMENT) {

       ti = this.updateCacheItems(dom_element, table_info);
  
       for (i=0; i<dom_element.child_dom_elements.length; i++ ) {
         this.traverseDOMElementsForTableElements(dom_element.child_dom_elements[i], ti);
       } // end loop
     }  
 }; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Traverses the DOMElements to update the tables cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the controls cache are disabled, this cache would 
 *       not be updated
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.updateCache = function () {
   
   var i;
   var children = this.dom_cache.element_cache.child_dom_elements;
   var children_len = children.length;

   var table_info = new OpenAjax.a11y.cache.TableInfo(null);

   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating table elements cache.");
 
   for (i=0; i < children_len; i++) {
     this.traverseDOMElementsForTableElements(children[i], table_info);
   }  
   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed table elements cache update, number of table items is " + this.length + " and the number of cells is " + this.cell_total);
   this.up_to_date = true;
 };

/* ---------------------------------------------------------------- */
/*                       TableElement Object                        */
/* ---------------------------------------------------------------- */

/**
 * @constructs TableElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates table element object used to hold data about a table 
 *         
 * @param  {DOMCache}          dom_cache           - Reference to the current dom cache for use of dom cache methods to find references   
 * @param  {DOMElement}        dom_element         - dom_element object provides information about current dom node 
 * @param  {TableCellElement}  table_cell_element  - table_cell_element object provides information about the table 
 *                                                   cell the table may be a child of in the dom 
 *
 * @property  {DOMCache}    dom_cache    - DOMCache reference for reference DOMCache methods for calculating headers
 * @property  {DOMElement}  dom_element  - DOMElement associated with the form element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the table element in the document in relationship to other table elements
 *
 * @property  {Array}       child_cache_elements  - Array of cache table elements as part of table elements relationship tree 
 * @property  {Array}       table_elements        - List of all table element objects in this table element object
 * @property  {Number}      length                - Number of table element objects 
 *
 * @property  {String}  effective_summary  - The calculated description of a data table, empty for layout tables
 * @property  {String}  effective_caption  - The calculated name of a data table, empty for layout tables
 *
 * @property  {Number}  max_row     - Number of rows in a table  
 * @property  {Number}  max_column  - Number of columns in a table
 * 
 * @property  {Number}  row     - Used as the current row counter when traversing a table dom elements  
 * @property  {Number}  column  - Used as the current column counter when traversing a table dom elements
 * 
 * @property  {Array}   cells     - A two dimensional array representing the table row and columns
 * @property  {Array}   cell_ids  - List of table cell objects who have an id attribute defined
 *
 * @property  {Boolean}  is_data_table          - True if the table is identified as a data table
 * @property  {Boolean}  is_complex_data_table  - True if the table is identified as a complex data table
 *
 * @return {TableElement}
 */
 OpenAjax.a11y.cache.TableElement = function (dom_cache, dom_element, table_info) {

   if( !dom_element ) return null;  

   this.type = OpenAjax.a11y.TABLE.TABLE_ELEMENT;

   this.dom_cache      = dom_cache;
   this.dom_element    = dom_element;
   this.cache_id       = "";
   this.document_order = 0;
   
   this.child_cache_elements = [];

   this.table_elements = [];
   this.length = 0;

   this.effective_caption = "";
   this.effective_caption_for_comparison = "";
   
   this.summary = this.dom_element.node.getAttribute("summary");

   this.effective_summary = this.summary;

   if (this.effective_summary && this.effective_summary.length) { 
     this.effective_summary_for_comparison = this.effective_summary.normalizeSpace().toLowerCase();
   }
   else {
     if (dom_element.aria_describedby) {
       this.effective_summary = dom_cache.getTextFromIDs(dom_element.aria_describedby);
       this.effective_summary_for_comparison = this.effective_summary.normalizeSpace().toLowerCase();
     }
     else {
       this.effective_summary = "";   
       this.effective_summary_for_comparison = "";   
     }  
   }
 
   this.max_row = 0; 
   this.max_column = 0;

   this.cell_count = 0;
   
   this.cell_ids = [];

   this.row      = -1;   
   this.column   = 0;  
   
   this.cells    = [];
   this.cells[0]  = [];
   this.cells[0][0] = null;
 
   this.is_data_table = false;
   this.is_complex_data_table = false;

   this.nesting_level        = 0;
   this.layout_nesting_level = 0;
   this.layout_table_in_data_table = false;
   this.data_table_in_data_table = false;

   this.parent_table_element = table_info.table_element;
   
   if (table_info.table_element) {
     
     this.nesting_level = table_info.table_element.nesting_level + 1;
     
     if (table_info.table_element.is_data_table) {
       this.layout_in_data_table = true; 
     }
     
     if (table_info.table_element.max_column > 1) {
       this.layout_nesting_level = table_info.table_element.layout_nesting_level + 1;   
     }
     
   }
 
   return this;
 };

/**
 * @method setIsDataTable
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Set is a data table property, if not already set   
 */
 
OpenAjax.a11y.cache.TableElement.prototype.setIsDataTable = function () {

  // if role=presentation this is a layout table
  if (this.dom_element.role && this.dom_element.role === "presentation") return; 

  if (this.is_data_table) return;

  this.is_data_table = true;

  if (this.parent_table_element) {
     
    if (this.parent_table_element.is_data_table) {
      this.layout_table_in_data_table = false; 
      this.data_table_in_data_table = true; 
    }
     
    this.layout_nesting_level = this.parent_table_element.layout_nesting_level;   
     
  }
  
};

/**
 * @method getTableElementByCacheId 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Retrieve table cache element from the tree of table cache elements
 *
 * @param  {String}  cache_id  -  cache_id of a table cache element 
 *
 * @return  {CaptionElement | TheadElement | TBodyElement | TableRowElement | TableCellElement | null}  Returns table cache element if cahce id is found, otherwise null
 */
OpenAjax.a11y.cache.TableElement.prototype.getTableElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};
 
/**
 * @method getItemByCacheId 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Retrieve table cache element from the tree of table cache elements
 *
 * @param  {String}  cache_id  -  cache_id of a table cache element 
 *
 * @return  {CaptionElement | TheadElement | TBodyElement | TableRowElement | TableCellElement | null}  Returns table cache element if cahce id is found, otherwise null
 */
 
OpenAjax.a11y.cache.TableElement.prototype.getItemByCacheId = function (cache_id) {

   function traverseTableElements(table_elements) {
     var table_elements_len = table_elements.length;
     var to;
     var i;
     var ro;
     
     for (i = 0; i < table_elements_len; i++) {
       to = table_elements[i];
       
       if (to.cache_id == cache_id) {
         return to;
       }
       else {
         if (to.child_cache_elements && to.child_cache_elements.length) {
           ro = traverseTableElements(to.child_cache_elements);
           if (ro) return ro;
         }
       }
     } // end loop
   
     return null;
   }

   return traverseTableElements(this.child_cache_elements);
 
 };

/**
 * @method addTableElement 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc    Adds a table cache element object to table_elements array and generates a cache id value for the table element object
 *
 * @param  {CaptionElement | TableTHeadElement | TableTBodyElement | TableRowElement | TableCellElement} table_element  - table cache element to add
 *
 * @return  {Number}  Returns the length the list of table elements 
 *
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableElement = function (table_element) {

   var caption;
   var summary;

   this.length = this.length + 1;
   table_element.document_order = this.length;
   table_element.cache_id = this.cache_id + "_te_" + this.length;
     
   this.table_elements.push(table_element);

   switch (table_element.table_type) {
   
   case OpenAjax.a11y.TABLE.CAPTION_ELEMENT:
     this.setIsDataTable();
     this.effective_caption                = table_element.name;
     this.effective_caption_for_comparison = table_element.name_for_comparision;
     break;
   
   case OpenAjax.a11y.TABLE.THEAD_ELEMENT:
     this.setIsDataTable();
     break;

   case OpenAjax.a11y.TABLE.TBODY_ELEMENT:
     break;

   case OpenAjax.a11y.TABLE.TR_ELEMENT:
     this.nextRow();   
     break;

   case OpenAjax.a11y.TABLE.TH_ELEMENT:
     this.setIsDataTable();

     if ((table_element.number_of_header_ids > 1) ||
         (table_element.row_span             > 1) ||
         (table_element.column_span          > 1)) {
       this.is_complex_data_table = true;        
     }

     this.addTableCellElement(table_element);
     break;   

   case OpenAjax.a11y.TABLE.TD_ELEMENT:  
   
     if (this.is_data_table) {
       if ((table_element.number_of_header_ids > 1) ||
           (table_element.row_span             > 1) ||
           (table_element.column_span          > 1)) {
         this.setIsDataTable();
         this.is_complex_data_table = true;        
       }     
     } else {
       if (this.max_row > 1 && this.max_column > 1 ) this.setIsDataTable();
     }
     
     this.addTableCellElement(table_element);
     break;
     
   default:
     break;


   } // end switch

   return this.length;

 };

/**
 * @method addChild 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Adds a cache table element to the root tree representation of the tree cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableElement.prototype.addChild = function (table_element) {

 if (table_element) {
  this.child_cache_elements.push(table_element); 
 }  

}; 

/**
 * @method nextRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Updates the current table cell counters and array to start a new row in the table
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
 * @method multipleTHInRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Tests to see if there are multiple table header cells in a row and sets complex data table flag if there are
 * 
 * @param {Number} row - Number of the row to test for headers
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
	
	 if (cell && 
	     cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
	   th_count++;
	 }
	 else {
	   td_count++;
	 }
   }   
   
   if (th_count > 1 && td_count > 0) {
     this.is_complex_data_table = true;
   }

 };

/**
 * @method multipleTHInColumn
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Tests to see if there are multiple table header cells in a column and sets complex data table flag if there are
 * 
 * @param {Number} column - Number of the column to test for headers
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
	
  	   if (cell && 
  	       cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
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
 * @method addTableCellElement
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Adds a TableCellElement to the current row
 *
 * @param {TableCellElement}  table_cell_element  -  The table cell element object to add in to the current row and column of a table 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableCellElement = function (table_cell_element) {

   var i;
   var j;
   var r;
   var c;
   
   this.column = 0; 
  
   if (table_cell_element.id && 
       table_cell_element.id.length) {
     this.cell_ids.push(table_cell_element.id);
   }

   // find the next available spot in cells array, this needs to be calculated due to row anc olumn spanning 
   while ((this.cells[this.row][this.column] !== undefined) &&
          (this.cells[this.row][this.column] !== null)) {
     this.column++;
   } // end loop

   r = this.row;
   c = this.column;
     
   table_cell_element.row    = r;
   table_cell_element.column = c;

   for (i=0; i<table_cell_element.row_span; i++) {
     
     for (j=0; j<table_cell_element.column_span; j++) {
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
   this.setTableCellHeader(this.row, this.column, table_cell_element);

   if (c > this.max_column) this.max_column = c; 
   
 }; 

/**
 * @method sortCellIds
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Sorts the cell ids array for this table based on the id values
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
 * @method setTableCellHeader
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Sets header content property of the table cell element object 
 *
 * @param {Number}            row                 - Current row position of the table cell element object
 * @param {Number}            column              - Current column position of the table cell element object
 * @param {TableCellElement}  table_cell_element  - Table cell element object to create header content property
 */
 OpenAjax.a11y.cache.TableElement.prototype.setTableCellHeader = function (row, column, table_cell_element) {

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
     if (table_cell_element.table_type === OpenAjax.a11y.TABLE.TH_ELEMENT) {
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
             if (!cell.cell_text) cell.cell_text = cell.dom_element.getText().normalizeSpace(); 
             string_array.push(cell.cell_text);
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
             if (!cell.cell_text) cell.cell_text = cell.dom_element.getText().normalizeSpace(); 
             string_array.push(cell.cell_text);
           }
         } 
       } 
       table_cell_element.header_content = string_array.join(' ');
     } 
   } 
 };

/**
 * @method findFirstRowWithContent
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Finds the first row of the table which has text content in at least one cell.
 *       This is used to skip rows that are used for stylistic puposes, since they usually
 *       do not have any text content other than spaces in them.
 *
 * @return {Number}  Returns number of first row with content  
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstRowWithContent = function() {
 
   var r;
   var c;
   var max_row = this.max_row;
   var max_col;
   var text;
   var cell;
 
   for (r = 0; r < max_row; r++) {
     max_col = this.cells[r].length;
 
     for (c = 0; c < max_col; c++) {
       cell = this.cells[r][c];
       
       if (!cell || !cell.dom_element) continue;
       
       text = cell.dom_element.getText();
    
       if (text) text = text.normalizeSpace();
       
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT || 
           text.length) {
         return r;
       }
     }
   }
   return -1;
 };

/**
 * @method findFirstColumnWithContent
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Finds the first column of the table which has text content in at least one cell.
 *       This is used to skip columns that are used for stylistic puposes, since they usually
 *       do not have any text content other than spaces in them.
 *
 * @return {Number}  Returns number of first column with content  
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstColumnWithContent = function() {
 
   var r;
   var c;
   var max_col = this.max_column;
   var max_row = this.max_row;
   var text;
   var cell;
 
   for (c = 0; c < max_col; c++) {
 
     for (r = 0; r < max_row; r++) {
     
       cell = this.cells[r][c];
       
       if (!cell || !cell.dom_element) continue;
       
       text = cell.dom_element.getText();
       
       if (text) text = text.normalizeSpace();
       
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT || 
           text.length) {
         return c;
       }
     }
   }
   return -1;
 };


/**
 * @method headerCellsInFirstRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Calculates the number of non-empty cells in the first row with content and
 *       how many of the non-empty cells are header cells
 *
 * @return {Object} Returns an object with two properties 'total' and 'th_count'  
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstRow = function () {

   // ro is the Return Object 
   var ro = {};
   ro.total = 0;
   ro.th_count = 0;

   var c;
   var max_col;
   var cell;
   var text;
 
   var r = this.findFirstRowWithContent();
   
   if (r < 0) return ro;
   
   if (this.cells[r]) {
   
     max_col = this.cells[r].length;
 
     for (c = 0; c < max_col;) {
       cell = this.cells[r][c];
     
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
         ro.total++;   
         ro.th_count++;   
       }
       else {
         text = cell.dom_element.getText();
   
         if (text) text = text.normalizeSpace();
   
         if (text.length) {
           ro.total++;
         } 
       }
       c += cell.column_span;
     }
   }  
   return ro;
 };

/** 
 * @method headerCellsInFirstColumn
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Calculates the number of non-empty cells in the first column with content and
 *       how many of the non-empty cells are header cells
 *
 * @return {Object} Returns an object with two properties 'total' and 'th_count'  
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstColumn = function () {

   // ro is the Return Object 
   var ro = {};
   ro.total = 0;
   ro.th_count = 0;
 
   var r;
   var c;
   var text;
   var cell;
   var max_row;
 
   c = this.findFirstColumnWithContent();
   
   if (c < 0) return ro; 
   
   max_row = this.max_row;
 
   for (r = 0; r < max_row;) {
     cell = this.cells[r][c];
     
     if (!cell) break;
     
     if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
       ro.total++;   
       ro.th_count++;   
     }
     else {
       text = cell.dom_element.getText();
   
       if (text) text = text.normalizeSpace();
   
       if (text.length) {
         ro.total++;
       } 
     }
     r += cell.row_span;
   } 
   return ro;
 };

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableElement.prototype.getAttributes = function (unsorted) {
   
  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
  
  attributes.push(cache_nls.getLabelAndValueNLS('summary', this.summary));
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  properties.push(cache_nls.getLabelAndValueNLS('is_data_table', this.is_data_table));
  properties.push(cache_nls.getLabelAndValueNLS('is_complex_data_table', this.is_complex_data_table));
  properties.push(cache_nls.getLabelAndValueNLS('effective_caption', this.effective_caption));
  properties.push(cache_nls.getLabelAndValueNLS('effective_summary', this.effective_summary));
  properties.push(cache_nls.getLabelAndValueNLS('max_row', this.max_row));
  properties.push(cache_nls.getLabelAndValueNLS('max_column', this.max_column));
  properties.push(cache_nls.getLabelAndValueNLS('nesting_level', this.nesting_level));
  
  this.dom_element.sortItems(properties);
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Creates a text string representation of the table element object 
 *
 * @return {String} Returns a text string representation of the table
 */
 OpenAjax.a11y.cache.TableElement.prototype.toString = function () {
   var str = "";
   
   if (this.is_data_table) {
     str += this.max_column + "x" + this.max_row + " Data Table: ";
     if (this.effective_caption.length) {
       str += this.effective_caption;
     } 
     else {
        if (this.effective_summary) {
          str += this.effective_summary; 
        }
        else {
          str += "no name";
        }
     }
   } 
   else {
     str += this.max_row + "x" + this.max_column + " Layout Table ";   
   }
   
   return str;
     
 };


/* ---------------------------------------------------------------- */
/*                         CaptionElement Object                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor CaptionElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a caption element object which contains 
 *       information obout a caption element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with caption element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with caption element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the caption element
 *
 * @property  {Number}  type                 - Constant indicating the type of table cache element object
 *
 * @property  {String}  name                 - The text content of the caption element
 * @property  {String}  name_for_comparison  - The text content used for comparisons with other text content (i.e. lowercase, space normalized and trimmed)
 */
 
OpenAjax.a11y.cache.CaptionElement = function (dom_element, table_info) {

  this.dom_element = dom_element;

  var name  = dom_element.getText(); 
  this.name = name;
  this.name_for_comparison = name.normalizeSpace();
  
  this.table_type = OpenAjax.a11y.TABLE.CAPTION_ELEMENT;

  this.parent_table_element = table_info.table_element;
    
};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getAttributes = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Creates a text string representation of the caption element object 
 *
 * @return {String} Returns a text string representation of the caption element object
 */
 
 OpenAjax.a11y.cache.CaptionElement.prototype.toString = function () {
   return this.name;   
 };

/* ---------------------------------------------------------------- */
/*                         THeadElement Object                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor THeadElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a thead element object which contains 
 *       information obout a thead element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with thead element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with thead element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the thead element
 *
 * @property  {Number}  type       - Constant indicating the type of table cache element object
 *
 * @property  {Number}  row_count  - Number of table rows contained in the childresn of the thead element
 */
 
OpenAjax.a11y.cache.THeadElement = function (dom_element, table_info) {

  this.dom_element = dom_element;
  this.cache_id    = "";
  
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.THEAD_ELEMENT;
  
  this.row_count = 0;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.THeadElement.prototype.addChild = function (child_object) {

  if (child_object) {
    this.child_cache_elements.push(child_object); 
  }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.THeadElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.THeadElement.prototype.getAttributes = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};



/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.THeadElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.THeadElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.THeadElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.THeadElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Creates a text string representation of the thead element object 
 *
 * @return {String} Returns a text string representation of the thead element object
 */
 OpenAjax.a11y.cache.THeadElement.prototype.toString = function () {
   return this.row_count + " rows";   
 };


/* ---------------------------------------------------------------- */
/*                         TBodyElement Object                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor TBodyElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a tbody element object which contains 
 *       information obout a tbody element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with tbody element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with tbody element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the tbody element
 *
 * @property  {Number}  type                 - Constant indicating the type of table cache element object
 *
 * @property  {Number}  row_count            - Number of table rows contained in the childresn of the tbody element
 */
 
OpenAjax.a11y.cache.TBodyElement = function (dom_element, table_info) {

  this.dom_element          = dom_element;
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.TBODY_ELEMENT;

  this.row_count = 0;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TBodyElement.prototype.addChild = function (child_object) {

 if (child_object) {
  this.child_cache_elements.push(child_object); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getAttributes = function () {
  return this.dom_element.getAttributes();
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Creates a text string representation of the tbody element object 
 *
 * @return {String} Returns a text string representation of the tbody element object
 */
 OpenAjax.a11y.cache.TBodyElement.prototype.toString = function () {
   return this.row_count + " rows";   
 };


/* ---------------------------------------------------------------- */
/*                       TableRowElement Object                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableRowElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a table row element object which contains 
 *       information obout a tr element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with tr element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with tr element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the tr element
 *
 * @property  {Number}  type               - Constant indicating the type of table cache element object
 * @property  {String}  cache_id           - String that uniquely identifies the cache element in the DOMCache
 *
 * @property  {Number}  header_cell_count  - Number of header cells in the row
 * @property  {Number}  data_cell_count    - Number of data cells in the row
 */
 
OpenAjax.a11y.cache.TableRowElement = function (dom_element, table_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.TR_ELEMENT;

  this.header_cell_count = 0;
  this.data_cell_count   = 0;
 
};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the table cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableRowElement.prototype.addChild = function (child_object) {

 if (child_object) {
  this.child_cache_elements.push(child_object); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getAttributes = function () {
  return this.dom_element.getAttributes();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getCacheProperties = function () {

  return this.dom_element.getCacheProperties();
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Creates a text string representation of the tr element object 
 *
 * @return {String} Returns a text string representation of the tr element object
 */
 OpenAjax.a11y.cache.TableRowElement.prototype.toString = function () {
   if (this.header_cell_count && this.data_cell_count) {
     return this.header_cell_count + " header cells and " + this.data_cell_count + " data cells";   
   }
   else {
     if (this.header_cell_count) {
       return this.header_cell_count + " header cells ";
     }
     else {
       if (this.data_cell_count) {
         return this.data_cell_count + " data cells ";
       }
       else {
         return "no cells ";       
       }
     }  
   }
   
 };


/* ---------------------------------------------------------------- */
/*                            TableCellElement                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableCellElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Create a table cell element object which contains 
 *       information obout a td or th element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with td or th element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with td or th element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}            child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}     parent_table_element  - Reference to the table element object that contatins the td or th element
 * @property  {TableRowElement}  parent_row_element    - Reference to the table element object that contatins the td or th element
 *
 * @property  {Number}  type               - Constant indicating the type of table cache element object
 *
 * @property  {String}  text_content          - Text content of the element including descendent element content
 * @property  {String}  scope                 - Value of the scope attribute
 * @property  {String}  headers               - Value of the headers attribute
 * @property  {Array}   headers_array         - Array of id values in the headers attribute
 * @property  {Number}  number_of_header_ids  - Number of ids in the headers attribute    
 *
 * @property  {Number}  row_span           - Value of the rowspan attribute (Note: converted to Number)
 * @property  {Number}  column_span        - Value of the colspan attribute (Note: converted to Number)
 */
 
OpenAjax.a11y.cache.TableCellElement = function (dom_element, table_info) {

  var headers_array = [];  // array of id headers
  var is_th;
   
  this.dom_element  = dom_element;
  this.cache_id     = "";
  
  this.parent_table_element = table_info.table_element;
  this.parent_row_element   = table_info.table_row_element;
  this.cache_id             = "";

  this.child_cache_elements = [];   
  
  this.text_content = "";   // this will only be set if this data table needs it
    
  this.table_type = OpenAjax.a11y.TABLE.TD_ELEMENT;

  is_th = dom_element.tag_name == 'th';
  this.scope = dom_element.node.getAttribute('scope');   
  
  if (is_th) {
    this.table_type = OpenAjax.a11y.TABLE.TH_ELEMENT;
  }
  else {
    if (this.scope) {
      this.scope = this.scope.toLowerCase();
      
      if (this.scope == 'row' || this.scope == 'col') {
       this.table_type = OpenAjax.a11y.TABLE.TH_ELEMENT;     
      }
    }
  }

  if (table_info.table_row_element) {
    if (this.table_type === OpenAjax.a11y.TABLE.TD_ELEMENT) {
      table_info.table_row_element.data_cell_count++;
    }
    else{
      table_info.table_row_element.header_cell_count++;    
    }
  }  

  this.headers = dom_element.node.getAttribute('headers');

  if (this.headers && this.headers.length > 0) {
    this.headers_array = this.headers.split(" ");
    
    this.number_of_header_ids = this.headers_array.length;    
  }
   
  this.row_span   = dom_element.node.getAttribute('rowspan');
   
  if (this.row_span) { 
    this.row_span   = parseInt(this.row_span,10);
  } 
  else {
    this.row_span   = 1;
  }
  
  this.column_span   = dom_element.node.getAttribute('colspan');    
   
  if (this.column_span) { 
    this.column_span   = parseInt(this.column_span,10);
  } else {
    this.column_span   = 1;
  }
  
}; 


/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableCellElement.prototype.addChild = function (table_element) {

 if (table_element) {
  this.child_cache_elements.push(table_element); 
 }  

}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'row_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'column_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'headers');
  cache_nls.addPropertyIfDefined(attributes, this, 'scope');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  cache_nls.addPropertyIfDefined(properties, this, 'table_type');
  
  this.dom_element.sortItems(properties);
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Creates a text string representation of the table cell element object 
 *
 * @return {String} Returns a text string representation of the table cell element object
 */
OpenAjax.a11y.cache.TableCellElement.prototype.toString = function () {
  var text;
  
  if (this.parent_table_element.is_data_table) {
    text = this.dom_element.getText();
    
    if (text.length) {
      return text;
    }
    else {
      return "empty cell";
    }
  }
  else {
    return "Contains " + this.dom_element.getElementCount() + " elements: " + this.dom_element.getText();    
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
/*                     OpenAjax Title Main Cache                    */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor MainInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a main information object for information related to main landmarks
 *       in building the tite and main cache
 *
 * @param {MainInfo}  main_info - Current main information object
 *
 * @property {MainElement}  main_element  - Parent main landmark element 
 */

OpenAjax.a11y.cache.MainInfo = function (main_info) {

  if (main_info) {
    this.main_element  = main_info.main_element;
    this.body_element  = main_info.body_element;
  }
  else {
    this.main_element  = null;
    this.body_element  = null;
  }
 
};

/* ---------------------------------------------------------------- */
/*                      TitleMainCache                              */ 
/* ---------------------------------------------------------------- */

/**
 * @constructs TitleMainCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc HeadingsLandmarksCache is the constructor for lists of heading and landmrk element objects and
 *       the root of a tree representation of the landmark and heading element relationships
 *
 * @param {DOMCache}  dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - True if the cache has been created using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}  child_cache_elements  - Root array of the tree representation of the landmarks and headings in the document 
 *
 * @property {Array}   main_elements  - List of all the main landmark elements in the document 
 * @property {Number}  length         - The length of the main landmark elements list, used in calculating cache id values 
 *
 * @property {Array}    h1_elements         - List of all the h1 heading elements in the document 
 * @property {Boolean}  has_main_landmarks  - True if document contians at lewast one main landmark, otherwise false
 * @property {Boolean}  has_title           - Title element is defined in the document 
 *
 * @property {BodyElement} body_element - The body element is used as a placeholder for items missing in a document like H1 elements and Main landmarks
 * 
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.TitleMainCache = function (dom_cache) {

  this.dom_cache = dom_cache;
 
  this.up_to_date    = false;
 
  this.child_cache_elements  = [];  
  
  this.main_elements = [];
  this.length        = 0;
  
  this.h1_elements   = [];
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;
  
  this.body_element = null;
 
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
 
};

/**
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Empties the title and main cache 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.initCache = function () {

  this.up_to_date    = false;
 
  this.child_cache_elements  = [];  
  
  this.main_elements = [];
  this.length        = 0;
  
  this.h1_elements   = [];
  this.body_element = null;
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Adds a main landmark or h1 heading element object to the root level of a tree of title and main elements  
 *
 * @param {MainElement | H1Element}  child_element - Main landmark or h1 heading element object to add
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addChildMainElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  } 

};

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc   Adds a h1 element object to the h1 heading elements list
 *
 * @param  {H1Element}  h1_element  -  h1 heading element to add 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addH1Element = function (h1_element) {

  if (h1_element && h1_element.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) {
    this.h1_elements.push(h1_element);
  } 

};

/**
 * @method addMainElement
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc    Adds a main, h1 or title element object to the main_elements array and cacluates a cache id value
 *
 * @param  {MainElement | H1Element | TitleElement | BodyElement}  main_element  Main, h1 heading or title element object to add 
 *
 * @return  {Number}  length is the number of elements in the main_elements list
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addMainElement = function (main_element) {

  if (main_element) {
    this.length = this.length + 1;
    main_element.document_order = this.length;
    main_element.cache_id = "main_" + this.length;
    this.main_elements.push(main_element);
  } 
  
  return this.length;
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc  Finds the main, title or h1 heading element object with the corrsponding cach_id value
 *
 * @param  {String}  cache_id  - cache_id of the title or main element object to find
 *
 * @return  {MainElement | TitleElement | H1Element | null}  Returns the main, title or h1 heading element object 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.getItemByCacheId = function (cache_id) {
 
  var i; 
  var main_elements_len = this.main_elements.length;

  if (cache_id) {
    for ( i = 0; i < main_elements_len; i++) {
      if (this.main_elements[i].cache_id == cache_id) {
        return this.main_elements[i];
      } 
    } // end loop
  }
  
  return null;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Updates the title and main cache object by checking to see if a DOMElement
 *          should be added to this cache objects
 *  
 * @param  {DOMElement}  dom_element  - dom element object to check for inclusion in title and main cache
 * @param  {MainInfo}    main_info    - Information about the current landmarks that are parents to this item
 * 
 * @return {MainInfo}  Returns updated main information object
 */
 
OpenAjax.a11y.cache.TitleMainCache.prototype.updateCacheItems = function (dom_element, main_info) {

  var me;
  var be;
  var mi = new OpenAjax.a11y.cache.MainInfo(main_info);

  if (dom_element.role == 'main') {
   
    this.has_main_landmarks = true;
 
    me = new OpenAjax.a11y.cache.MainElement(dom_element, mi.main_element);    

    this.dom_cache.getNameFromARIALabel(me);

    this.addMainElement(me);  

    if (main_info.main_element) {
      main_info.main_element.addChildMainElement(me);
    } 
    else {
      this.addChildMainElement(me);  
    }
  
    mi.main_element = me;
    
    return mi;
  }
 
  if (dom_element.tag_name == 'h1') {
  
    this.has_h1_elements = true;
  
    me = new OpenAjax.a11y.cache.H1Element(dom_element, mi.main_element);    

    this.addMainElement(me);  
    this.addH1Element(me);

    if (main_info.main_element) {
      main_info.main_element.addChildMainElement(me);
      main_info.main_element.addH1Element(me);
    } 
    else {
      this.addChildMainElement(me);  
    }  
    
    me.isH1UsedAsLabelForMainRole();

    return mi;
  }

  if (dom_element.tag_name == 'title' && !this.has_title) {
  
    me = new OpenAjax.a11y.cache.TitleElement(dom_element, mi.main_element);    

    this.addMainElement(me);
   
    this.addChildMainElement(me);  
   
    // There is only one title for a document, even when there are frames and iframes
    this.has_title = true;
    
  }

  if (dom_element.tag_name == 'body' && !this.body_element) {
  
    be = new OpenAjax.a11y.cache.BodyElement(dom_element, mi.main_element);    

    this.addMainElement(be);
   
    this.addChildMainElement(be);  
   
    // There is only one body element for a document, even when there are frames and iframes
    this.body_element = be;
    
  }

  return mi;
  
};

/**
 * @method traverseDOMElementsForMainElements
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Traverses DOMElement objects in the tree to update the title and main cache 
 *
 * @param  {DOMElement}  dom_element  - DOMElement object to check for inclusion in title and main cache
 * @param  {MainInfo}    main_info    - Information about the current main landmark object
 */
  
OpenAjax.a11y.cache.TitleMainCache.prototype.traverseDOMElementsForMainElements = function (dom_element, main_info) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    var mi = this.updateCacheItems(dom_element, main_info);
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForMainElements(dom_element.child_dom_elements[i], mi);
    } 
  }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Traverses the DOMElements to update the title and main cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the title and main cache are disabled, this 
 *       cache would not be updated
 */ 
 
OpenAjax.a11y.cache.TitleMainCache.prototype.updateCache = function () {

  var i;
  var li;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.initCache();
 
  mi = new OpenAjax.a11y.cache.MainInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating title and main cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForMainElements(children[i], mi);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed title and main cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/* ---------------------------------------------------------------- */
/*                        MainElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor MainElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a main landmark element object used to hold information about a main landmark 
 *
 * @param  {DOMElement}   dom_element      - The dom element object representing the landmark element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the main landmark element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree 
 *
 * @property  {Array}   h1_elements  -  List of all the h1 heading elements in the main landmark
 * @property  {Number}  type         -  Constant representing the type of main landmark
 *
 * @property  {String}   label                  - Accessible label of the landmark 
 * @property  {Number}   label_length           - Length of label text 
 * @property  {Number}   label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...) 
 * @property  {String}   label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.MainElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";  
  this.document_order  = 0;

  this.child_cache_elements = [];
  this.h1_elements          = [];
  this.main_type            = OpenAjax.a11y.MAIN.ROLE_MAIN;
  
  this.parent_landmark = parent_landmark; // restricted to main landmarks
 
  this.label                 = "";
  this.label_length          = 0;
  this.label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.label_for_comparison  = "";

}; 


/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a main landmark  object to the tree of title and main elements  
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add 
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element); 
  }  

}; 

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a H1 heading object to the tree of title and main elements  
 *
 * @param {H1Element}  h1_element  -  H1 heading element object to add 
 */

OpenAjax.a11y.cache.MainElement.prototype.addH1Element = function (h1_element) {

  if (h1_element) {
    this.h1_elements.push(h1_element); 
  }  

}; 


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MainElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'main_type');
  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MainElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns a text string representation of the main landmark element 
 *
 * @return {String} Returns string represention the landmark element object
 */
  
OpenAjax.a11y.cache.MainElement.prototype.toString = function () {
  if (this.label_length) {
    return this.dom_element.tag_name + "[role=main]: " + this.label;  
  } 
  else {  
    return this.dom_element.tag_name + "[role=main]: No label";  
  } 
};

/* ---------------------------------------------------------------- */
/*                         H1Element                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor H1Element
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a h1 heading element object used to hold information about a h1 heading elements used for titling 
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type               -  Constant representing the type of main landmark
 * @property  {Boolean}  is_label_for_main  - true if h1 is being used as a label for main landmark, otherwise false
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.H1Element = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";  
  this.document_order  = 0;
  
  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  this.child_cache_elements = [];   // The child array is always empty for an H1Element

  
  this.main_type              = OpenAjax.a11y.MAIN.H1_ELEMENT;
  this.is_label_for_main = false;

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = this.name.normalizeSpace().toLowerCase();
  
}; 

/**
 * @method isH1UsedAsLabelForMainRole
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 * 
 * @desc  Determines if an H1 element is being used as a label for a main Role
 *
 * @return  {Boolean}  True if the h1 element is being used as a label for the main landmark it is contained in, otherwise false
 */

OpenAjax.a11y.cache.H1Element.prototype.isH1UsedAsLabelForMainRole = function () {

  if (this.dom_element.id.length === 0 ||
      this.parent_landmark === null) {
    this.is_label_for_main = false;  
    return;
  }  

  var de = this.parent_landmark.dom_element;

  if (de.aria_labelledby && de.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    this.is_label_for_main = true;   
  }
    
};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.H1Element.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'main_type');
 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
 cache_nls.addPropertyIfDefined(properties, this, 'image_count');
 cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.H1Element.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns a text string representation of the h1 heading element 
 *
 * @return {String} Returns string represention the h1 heading element object
 */
  
OpenAjax.a11y.cache.H1Element.prototype.toString = function () {
  return "H1 element: " + this.name;  
};

/* ---------------------------------------------------------------- */
/*                       TitleElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor TitleElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a title element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type  -  Constant representing the title element 
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.TitleElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.TITLE_ELEMENT;

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  this.child_cache_elements = [];  // This array is always empty for the title element

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = this.name.normalizeSpace().toLowerCase();
  
}; 

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TitleElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'main_type');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns a text string representation of the title element 
 *
 * @return {String} Returns string represention the title element object
 */
  
OpenAjax.a11y.cache.TitleElement.prototype.toString = function () {
  return "TITLE element: " + this.name;  
};


/* ---------------------------------------------------------------- */
/*                       BodyElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor BodyElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a body element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - This is always null since this is the root element
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type  -  Constant representing the body element 
 *
 */

OpenAjax.a11y.cache.BodyElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.BODY_ELEMENT;

  this.child_cache_elements = []; // this is always empty for the body element

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  
  this.num_main_landmarks = 0;          // are defined in landmark rules
  this.num_visible_main_landmarks = 0;  // are defined in landmark rules
  
}; 

/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Adds a main landmark  object to the tree of title and main elements  
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add 
 */

OpenAjax.a11y.cache.BodyElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element); 
  }  

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.BodyElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.BodyElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.BodyElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.BodyElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.BodyElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.BodyElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.BodyElement
 *
 * @desc Returns a text string representation of the title element 
 *
 * @return {String} Returns string represention the title element object
 */
  
OpenAjax.a11y.cache.BodyElement.prototype.toString = function () {
  return "BODY element";  
};/*
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
/*                             Rule                                 */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rule
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates and validates a rule used to evaluate an accessibility feature of a document
 *
 * @param {Object}    nls                - NLS information for rules 
 * @param {String}    rule_id            - Unique id of the rule 
 * @param {String}    cache_dependency   - Which cache the rule will use 
 * @param {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param {function}  validate           - function for evalutinf the rule
 *
 * @property {Object}    nls                - NLS information for rules 
 * @property {String}    rule_id            - Unique id of the rule 
 * @property {String}    cache_dependency   - Which cache the rule will use 
 * @property {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @property {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @property {function}  validate           - function for evalutinf the rule
 */

OpenAjax.a11y.Rule = function (nls, rule_id, last_updated, cache_dependency, cache_properties, language, validate) {

  this.nls               = nls;
  this.rule_id           = rule_id;   
  this.last_updated      = last_updated;
  this.cache_dependency  = cache_dependency;
  this.cache_properties  = cache_properties;
  this.language          = language;
  this.validate          = validate;
  
};

/**
 * @method getTitle
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized title for the rule
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 */
OpenAjax.a11y.Rule.prototype.getTitle = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['TITLE'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      switch (rule_type) {
      case RULE.REQUIRED:
        message = nls_rules.message_severities.MUST;
        break;

      case RULE.RECOMMENDATION:
        message = nls_rules.message_severities.SHOULD;
        break;

      case RULE.CONDITIONAL:
        message = nls_rules.message_severities.MAY;
        break;

      default:
        message = "";
        break; 
      }
      
     str = str.replace(vstr, message);  
    }  
    
    return str;
  }
      
  return "Title not found for rule: " + this.rule_id;
  
};

/**
 * @method getPurpose
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized purpose of the rule
 */
OpenAjax.a11y.Rule.prototype.getPurpose = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['PURPOSE'];
  
  if (str) return str;
  
  return "";
  
};

/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized node result message
 *
 * @param {NodeResult}  node_result  - Node result to generate message
 */
OpenAjax.a11y.Rule.prototype.getMessage = function (node_result) {

  var nls_rules = this.nls[OpenAjax.a11y.locale];
  
  var SEVERITY = OpenAjax.a11y.SEVERITY;
  
  var i;
  var message;
  var str = nls_rules.rules[this.rule_id][node_result.message_id];
  
  if (!str) return nls_rules.missing_message + node_result.message_id;
    
//    OpenAjax.a11y.console("Rule: " + this.rule_id + " Message: " + str);

  var vstr; // i.e. %1, %2 ....
  var len = node_result.message_arguments.length;

  // check to see if message has severity dependence
  
  vstr = "%s";
  
  if (str.indexOf(vstr) >= 0) {
    
    switch (node_result.severity) {
    case SEVERITY.VIOLATION:
      message = nls_rules.message_severities.MUST;
      break;

    case SEVERITY.RECOMMENDATION:
      message = nls_rules.message_severities.SHOULD;
      break;

    case SEVERITY.MANUAL_CHECK:
      message = nls_rules.message_severities.MAY;
      break;

    default:
      message = "";
      break; 
    }

    str = str.replace(vstr, message);  
  }
  
  // Replace 
  
  for (i = 0; i < len; i++) { 
    vstr = "%" + (i+1); 
    message = node_result.message_arguments[i];
    
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


/* ---------------------------------------------------------------- */
/*                             Rules                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rules
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an array of rule objects for evaluating accessibility
 */

OpenAjax.a11y.Rules = function () {

  this.rules = [];

  this.nls   = {};
  
};

/**
 * @method addRule
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a new rule to the list of rules
 *
 * @param  {String}    rule_id            - Unique id of the rule 
 * @param  {String}    cache_dependency   - Which cache the rule will use 
 * @param  {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param  {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param  {Boolean}   enabled            - true if the rule should be evaluated; false the rule will not be evaluated
 * @param  {function}  validate           - function for evalutinf the rule
 *
 * @return  {Boolean} Returns true if the rule was added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRule = function (rule_id, last_updated, cache_dependency, cache_properties, language, validate) {

  if (this.getRuleByRuleId(rule_id)) {
    OpenAjax.a11y.console("  ** Duplicate Rule ID: " + rule_id);
    return false;
  }  
  
  if (!this.validCacheDependency(cache_dependency)) {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " has invalid or missing cache dependency property"); 
    return false;    
  }  

  if (typeof cache_properties !== 'object') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " cache properties is missing or not an array"); 
    return false;    
  }  
  
  if (typeof language !== 'string') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " language property is missing or not a string"); 
    return false;    
  }  
  
  if (typeof validate !== 'function') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " validate property is missing or not a function"); 
    return false;    
  }  
 
  var oaa_rule = new OpenAjax.a11y.Rule(this.nls, rule_id, last_updated, cache_dependency, cache_properties, language, validate);

  this.rules.push(oaa_rule);

  return true;

};

/**
 * @method addRulesFromJSON
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a rules from a list of rules in JSON format
 *
 * @param {Object}    rule_array  - An array of objects representing OAA rules 
 *
 * @return  {Boolean} Returns true if the rules were added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRulesFromJSON = function (rule_array) {

  var rule_item;

//  OpenAjax.a11y.console(" ---- Adding OAA Rules ---- ");

  for (var i = 0; i < rule_array.length; i++) {

    rule_item = rule_array[i];
    
//    OpenAjax.a11y.console("  Rule: " + rule_item.id);
//    OpenAjax.a11y.console("  last update: " + rule_item.last_updated);
//    OpenAjax.a11y.console("   dependency: " + rule_item.cache_dependency);
//    OpenAjax.a11y.console("   properties: " + typeof rule_item.cache_properties);
//    OpenAjax.a11y.console("     language: " + rule_item.language);
//    OpenAjax.a11y.console("     validate: " + typeof rule_item.validate);

    this.addRule(rule_item.id, rule_item.last_updated, rule_item.cache_dependency, rule_item.cache_properties, rule_item.language, rule_item.validate );

  }

};

/**
 * @method addRulesNLSFromJSON
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a rule NLS 
 *
 * @param {Object}    rule_array  - An array of objects representing OAA rules 
 *
 * @return  {Boolean} Returns true if the rules were added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRulesNLSFromJSON = function (locale, rules_nls) {

  this.nls[locale] = rules_nls;

};

/**
 * @method getRuleByRuleId
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Returned rule object with the id 
 *
 * @param  {String}  rule_id   - id of the rule to find 
 *
 * @return  {Rule} Returns rule object if the rule id is found; null if the rule id is not found 
 */

OpenAjax.a11y.Rules.prototype.getRuleByRuleId = function (rule_id) {

  var rule;
  var max = this.rules.length;

  for (var i = 0; i < max; i++ ) {
    rule = this.rules[i];
    if (rule.rule_id === rule_id) return rule;
  }

  return null;
};

/**
 * @method validCacheDependency
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Checks to see if the cache reference is valid 
 *
 * @param {String}    cache_name   - Property name of the cache 
 *
 * @return  {Boolean} Returns true if the cache dependency is valid; otherwise false
 */

OpenAjax.a11y.Rules.prototype.validCacheDependency = function (cache_name) {

  var CACHE_NAMES = OpenAjax.a11y.CACHE_NAMES;
  
  var max = CACHE_NAMES.length;
  
  for (var i = 0; i < max; i++) {
    if (cache_name === CACHE_NAMES[i]) return true;
  } // end loop
                    
  return false;
};


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
/*                             ResultNode                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ResultNode
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param  {ResultRule} rule_result         - reference to the rule result object
 * @param  {Number}     severity            - Constant representing severity of the evaluation result
 * @param  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @param  {String}     message_id          -  String reference to the message string in the NLS file
 * @param  {Array}      message_arguements  -  Array  array of values used in the message string 
 *
 * @property  {String}     cache_id            - Id identify the node result (uses the same value of the associated cache element id)
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     severity            - Constant representing severity of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          -  String reference to the message string in the NLS file
 * @property  {Array}      message_arguements  -  Array  array of values used in the message string  
 */

OpenAjax.a11y.ResultNode = function (rule_result, severity, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  this.severity    = severity;
  this.cache_item  = cache_item;
  this.message_id  = message_id;
  this.message_arguments = message_arguments;
  this.cache_id    = rule_result.cache_id;

};

/**
 * @method getPropertyValue
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the value of a property in the cache 
 *
 * @param  {String}  property  -  Property of the cache element object 
 *
 * @return {value | null} Returns a value if property is defined, null if not
 */

OpenAjax.a11y.ResultNode.prototype.getPropertyValue = function (property) {

  var value = this.cache_item[property];  
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;
  
  value = this.cache_item.dom_element[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.computed_style[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.events[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  return null;
  
};


/**
 * @method getSeverity
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a human readable text for the severity based on the current NLS setting
 * 
 * @return {Object} Returns a human readable information about the everity
 */

OpenAjax.a11y.ResultNode.prototype.getSeverity = function () {

  return OpenAjax.a11y.cache_nls.getSeverityNLS(this.severity);
  
};


/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.ResultNode.prototype.getRule = function () {

  return this.rule_result.getRule();
   
};


/**
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a NLS localized version of the rule id
 * 
 * @return {String} Returns a NLS localized version of the rule id
 */

OpenAjax.a11y.ResultNode.prototype.getRuleId = function () {

  return this.rule_result.getRuleId();
   
};

/**
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a NLS localized version of the type of rule in a ruleset
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset
 */

OpenAjax.a11y.ResultNode.prototype.getRuleType = function () {

  return this.rule_result.getRuleType();
   
};


/**
 * @method getRuleTitle
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a NLS localized string representinf the title of the rule
 * 
 * @return {String} NLS localized string
 */

OpenAjax.a11y.ResultNode.prototype.getRuleTitle = function () {

  return this.rule_result.getRuleTitle();
 
};

/**
 * @method getRulePurpose
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the purpose  associated with the rule result
 *
 * @return {String} Returns a NLS localized string representation the prupose of the rule
 */

OpenAjax.a11y.ResultNode.prototype.getRulePurpose = function () {

  return this.rule_result.getRulePurpose();
  
};

/**
 * @method getRuleRequirement
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the ruleset requirement associated with the rule result
 *
 * @return {String} Returns a NLS localized string representation the requirement associated with the rule
 */

OpenAjax.a11y.ResultNode.prototype.getRuleRequirement = function () {

  return this.rule_result.getRuleRequirement();
  
};

/**
 * @method getSeverityLabel
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a NLS localized version of the severity label based on the current NLS setting
 * 
 * @return {String} Returns a NLS localized version of the severity
 */

OpenAjax.a11y.ResultNode.prototype.getSeverityLabel = function () {

  return OpenAjax.a11y.cache_nls.getSeverityNLS(this.severity).label;
   
};

/**
 * @method getSeverityStyle
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a string to be used with CSS styling of severity text
 * 
 * @return {String} Returns a string that can be used for CSS styling of the severity 
 */

OpenAjax.a11y.ResultNode.prototype.getSeverityStyle = function () {
  
  return OpenAjax.a11y.SEVERITY_STYLE[this.severity];
  
};

/**
 * @method getXPath
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the xpath of the associated element
 * 
 * @return {String} information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.getXPath = function () {
  
  var xpath = this.cache_item.xpath;
  
  if (!xpath) xpath = this.cache_item.dom_element.xpath;
  
  return xpath;
 
};



/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the message associated with the rule result
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.ResultNode.prototype.getMessage = function () {

  return this.rule_result.rule.getMessage(this);
  
};


/**
 * @method getDOMElement
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the dom element object
 *
 * @return {String} Returns a dom element associated with the cache item
 */

OpenAjax.a11y.ResultNode.prototype.getDOMElement = function () {

  if (this.cache_item.dom_element) 
    return this.cache_item.dom_element;
  else
    return this.cache_item;      
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates a text string representation of the node result object 
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.ResultNode.prototype.toString = function () {

  return this.rule_result.rule.getMessage(this);
  
};

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.toXML = function () {

  var xml = "";
  return xml;
};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.toHTML = function (ruleset_nls) {
  
  var html = "";
 
  return html;
};


/* ---------------------------------------------------------------- */
/*                             ResultRule                           */
/* ---------------------------------------------------------------- */
 
 /** 
 * @constructor ResultRule
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a ruleset rule
 *
 * @param  {RulesetRule}  ruleset_rule  - ResultRule object
 *
 * @property  {String}   cache_id       - ID used to identify the rule result object (uses the same value as the associated rule cache id)
 *
 * @property  {Rule}     rule           - Reference to the assciated rule
 * @property  {Number}   rule_type      - The type of rule: required or recommended
 * @property  {Number}   rule_priority  - The importance of the rule relative to other rules in the requirement
 * @property  {Number}   rule_status    - The status of the rule in the ruleset
 * @property  {Boolean}  rule_enabled   - True if rule was evaluated, false if rule was disabled
 *
 * @property  {Object}   requirement    - Reference to the requirement associated with the rule 
 *
 * @property  {Array}  nodes_passed              - Array of all the node results that passed
 * @property  {Array}  nodes_failed              - Array of all the node results that failed
 * @property  {Array}  nodes_manual_checks  - Array of all the node results that require manual evaluations
 * @property  {Array}  nodes_informational       - Array of all the node results that are informational
 * @property  {Array}  nodes_hidden              - Array of all the node results that are hidden
 * @property  {Array}  nodes_warnings            - Array of all the node results that are warnings
 * @property  {Array}  nodes_na                  - Array of all the node results that not applicable
 */
 
OpenAjax.a11y.ResultRule = function (ruleset_rule, requirement) {

  this.rule            = ruleset_rule.rule;
  this.rule_type       = ruleset_rule.type; 
  this.rule_priority   = ruleset_rule.priority;
  this.rule_status     = ruleset_rule.status;
  this.rule_enabled    = ruleset_rule.enabled;
  
  this.cache_id        = ruleset_rule.rule.rule_id;
  this.requirement     = requirement;
 
  this.nodes_passed               = [];
  this.nodes_failed               = [];
  this.nodes_manual_checks   = [];
  this.nodes_informational        = [];
  this.nodes_hidden               = [];
  this.nodes_warnings             = [];
  this.nodes_na                   = [];
  
};

/**
 * @method addResult
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Adds a result of an evaluation of rule on a node in the dom  
 *
 * @param  {Number}  severity            - Number representing if a node passed, failed or other severity result
 * @param  {Object}  cache_item          - Reference to cache item associated with the test
 * @param  {String}  message_id          - Reference to the message string in the NLS file
 * @param  {Array}   message_arguements  - Array of values used in the message string 
 */

OpenAjax.a11y.ResultRule.prototype.addResult = function (severity, cache_item, message_id, message_arguments) {

  var SEVERITY = OpenAjax.a11y.SEVERITY;
  var RULE     = OpenAjax.a11y.RULE;
  
  var node_severity;

  var dom_element_item = null; 
 
  if (cache_item) {
    if (cache_item.dom_element) {
      dom_element_item = cache_item.dom_element;  
    } 
    else {
      dom_element_item = cache_item;  
    }
  }  
  
  node_severity = severity;
  
  if (severity === SEVERITY.FAIL) {
  
    if (this.rule_type === RULE.REQUIRED) {
      node_severity = SEVERITY.VIOLATION;
    }
    else {
      node_severity = SEVERITY.RECOMMENDATION;
    }  
  }
  
  var node_result = new OpenAjax.a11y.ResultNode(this, node_severity, cache_item, message_id, message_arguments);
 
//  OpenAjax.a11y.console("Add Result for " + this.rule.rule_id + ": " + severity + " " + cache_item.cache_id);

  switch (node_severity) {
 
  case SEVERITY.NA: 
    this.nodes_na.push(node_result);
    if (dom_element_item) dom_element_item.rules_na.push(node_result);
    break;

  case SEVERITY.HIDDEN: 
    this.nodes_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.PASS:
    this.nodes_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.nodes_failed.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.RECOMMENDATION:
    this.nodes_failed.push(node_result);
    if (dom_element_item) dom_element_item.rules_recommendations.push(node_result);
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.nodes_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    break;

  case SEVERITY.INFORMATIONAL:
    this.nodes_informational.push(node_result);
    if (dom_element_item) dom_element_item.rules_informational.push(node_result);
    break;

  default:
    break; 
  } // end switch 
};

/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.ResultRule.prototype.getRule = function () {

  return this.rule;
   
};

/**
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a NLS text string representation of the rule id 
 *
 * @return {String} Returns a NLS text string representation of the rule id 
 */

OpenAjax.a11y.ResultRule.prototype.getRuleId = function () {

  var nls_rules = this.rule.nls[OpenAjax.a11y.locale];
  
  return nls_rules.rules[this.rule.rule_id]['ID'];  

};

/**
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a NLS text string representation of the type of rule (i.e. required, recommended, conditional) 
 *
 * @return {String} Returns a NLS text string representation of the rule type 
 */

OpenAjax.a11y.ResultRule.prototype.getRuleType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getRuleTypeNLS(this.rule_type);  

};


/**
 * @method getRuleTitle
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a NLS text string representation of the rule title 
 *
 * @return {String} Returns a NLS text string representation of the rule title 
 */

OpenAjax.a11y.ResultRule.prototype.getRuleTitle = function () {

  return this.rule.getTitle(this.rule_type);  

};

/**
 * @method getRulePurpose
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a NLS text string representation of the rule purpose 
 *
 * @return {String} Returns a NLS text string representation of the rule purpose 
 */

OpenAjax.a11y.ResultRule.prototype.getRulePurpose = function () {

  var nls_rules = this.rule.nls[OpenAjax.a11y.locale];
  
  return nls_rules.rules[this.rule.rule_id]['PURPOSE'];  

};

/**
 * @method getRuleRequirement
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns a NLS localized title for the rquirement
 *
 * @return {Array} Returns string with a localized version of the requirement
 */

OpenAjax.a11y.ResultRule.prototype.getRuleRequirement = function () {

 return this.requirement.getRequirement();
 
};

/**
 * @method getResultNodes
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.ResultRule.prototype.getResultNodes = function () {
 
  function addResultNodes(items) {
    var i;
    var len = items.length;
    
    for (i = 0; i < len; i++) {
      result_nodes.push(items[i]);
    }    
  }

  var result_nodes = [];
  
  addResultNodes(this.nodes_violations);
  addResultNodes(this.nodes_manual_checks);
  addResultNodes(this.nodes_recommendations);
  addResultNodes(this.nodes_warnings);
  addResultNodes(this.nodes_passed);
  addResultNodes(this.nodes_informational);
  addResultNodes(this.nodes_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getResultNodeByCacheId
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns a node result object with the cache id 
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return {ResultNode | null} Returns a result node if cache id is found, otherwise null
 */

OpenAjax.a11y.ResultRule.prototype.getResultNodeByCacheId = function (cache_id) {
 
  function checkResultNodeList(items) {
    var len = items.length;
    var item;
    
    for (var i = 0; i < len; i++ ) {
      item = items[i];
      if (item.cache_id == cache_id) return item;
    }
    
    return null;
    
  }

  var node_result = null;
  
  node_result = checkResultNodeList(this.nodes_violations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_manual_checks);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_recommendations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_warnings);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_passed);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_informational); 
  if (node_result) return node_result;

  node_result = checkResultNodeList(this.nodes_hidden); 
  if (node_result) return node_result;
    
  node_result = checkResultNodeList(this.nodes_na); 
  if (node_result) return node_result;
    

  return null;
  
};




/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a text string representation of the rule result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.ResultRule.prototype.toString = function () {

 var str = ""; 

 return str;
};


/* ---------------------------------------------------------------- */
/*                             ResultRuleSummary                    */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor ResultRuleSummary
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @property  {Number}  total_number_of_required_rules          - Total number of required rules
 * @property  {Number}  required_rules_all_pass                 - Number of rules where all the nodes pass
 * @property  {Number}  required_rules_with_fail                - Number of rules with at least one node failing
 * @property  {Number}  required_rules_with_manual_checks  - Number of rules with at least one node requiring a manual check
 *  
 * @property  {Array}  required_rule_results                    - Rule result objects for required rules
 *
 * @property  {Number}  required_rules_nodes_that_pass          - Number of nodes that pass required rules
 * @property  {Number}  required_rules_nodes_that_fail          - Number of nodes that fail required rules
 * @property  {Number}  required_rules_nodes_manual_checks - Number of nodes that required manual checks of rules
 * @property  {Number}  required_rules_nodes_informational      
 * @property  {Number}  required_rules_nodes_hidden             
 * @property  {Number}  required_rules_nodes_na                 
 *
 * @property  {Number}  total_number_of_recommended_rules 
 *  
 * @property  {Number}  recommended_rules_all_pass                
 * @property  {Number}  recommended_rules_with_fail               
 * @property  {Number}  recommended_rules_with_manual_checks 
  
 * @property  {Array}  recommended_rule_results   

 * @property  {Number}  recommended_rules_nodes_that_pass          
 * @property  {Number}  recommended_rules_nodes_that_fail          
 * @property  {Number}  recommended_rules_nodes_manual_checks 
 * @property  {Number}  recommended_rules_nodes_informational      
 * @property  {Number}  recommended_rules_nodes_hidden             
 * @property  {Number}  recommended_rules_nodes_na                 
 */
 
OpenAjax.a11y.ResultRuleSummary = function () {

  this.total_number_of_required_rules = 0;
  
  this.required_rules_all_pass                = 0;
  this.required_rules_with_fail               = 0;
  this.required_rules_with_manual_checks = 0;
  
  this.required_rule_results     = [];

  this.required_rules_nodes_that_pass          = 0;
  this.required_rules_nodes_that_fail          = 0;
  this.required_rules_nodes_manual_checks      = 0;
  this.required_rules_nodes_informational      = 0;
  this.required_rules_nodes_hidden             = 0;
  this.required_rules_nodes_na                 = 0;

  this.total_number_of_recommended_rules = 0;
  
  this.recommended_rules_all_pass                = 0;
  this.recommended_rules_with_fail               = 0;
  this.recommended_rules_with_manual_checks = 0;
  this.recommended_rules_with_warnings           = 0;
  
  this.recommended_rule_results     = [];

  this.recommended_rules_nodes_that_pass          = 0;
  this.recommended_rules_nodes_that_fail          = 0;
  this.recommended_rules_nodes_manual_checks      = 0;
  this.recommended_rules_nodes_informational      = 0;
  this.recommended_rules_nodes_hidden             = 0;
  this.recommended_rules_nodes_na                 = 0;

};

 /** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.ResultRuleSummary
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 * @property  {Object}   success_criteria  - Reference to the associated ruleset success criteria
 * @property  {Array}    ruleset_rules     - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.ResultRuleSummary.prototype.addRuleResult = function (rule_result) {

  if (rule_result.rule_type == OpenAjax.a11y.RULE.REQUIRED) {

    this.required_rule_results.push(rule_result);
    
    this.total_number_of_required_rules++;

    if (rule_result.nodes_passed.length &&
        rule_result.nodes_failed.length === 0 &&
        rule_result.nodes_manual_checks.length === 0) 
      this.required_rules_all_pass ++;

    if (rule_result.nodes_failed.length) 
      this.required_rules_with_fail++;

    if (rule_result.nodes_manual_checks.length) 
      this.required_rules_with_manual_checks++;

    this.required_rules_nodes_that_pass          += rule_result.nodes_passed.length;
    this.required_rules_nodes_that_fail          += rule_result.nodes_failed.length;
    this.required_rules_nodes_manual_checks      += rule_result.nodes_manual_checks.length;
    this.required_rules_nodes_informational      += rule_result.nodes_informational.length;
    this.required_rules_nodes_hidden             += rule_result.nodes_hidden.length;
    this.required_rules_nodes_na                 += rule_result.nodes_na.length;

  } 
  else {
  
    this.recommended_rule_results.push(rule_result);
    
    this.total_number_of_recommended_rules++;

    if (rule_result.nodes_passed.length &&
        rule_result.nodes_failed.length === 0 &&
        rule_result.nodes_manual_checks.length === 0) 
      this.recommended_rules_all_pass ++;

    if (rule_result.nodes_failed.length) 
      this.recommended_rules_with_fail++;

    if (rule_result.nodes_manual_checks.length) 
      this.recommended_rules_with_manual_checks++;

    this.recommended_rules_nodes_that_pass          += rule_result.nodes_passed.length;
    this.recommended_rules_nodes_that_fail          += rule_result.nodes_failed.length;
    this.recommended_rules_nodes_manual_checks      += rule_result.nodes_manual_checks.length;
    this.recommended_rules_nodes_informational      += rule_result.nodes_informational.length;
    this.recommended_rules_nodes_hidden             += rule_result.nodes_hidden.length;
    this.recommended_rules_nodes_na                 += rule_result.nodes_na.length;
  
  }
  
};

 /** 
 * @method getResultRuleByCacheId
 *
 * @memberOf OpenAjax.a11y.ResultRuleSummary
 *
 * @desc Returns a result node (if found) using the cache_id of the result node
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return  {ResultNode | null }  Returns the reult node object if found, otherwise null
 *
 */
 
OpenAjax.a11y.ResultRuleSummary.prototype.getResultRuleByCacheId = function (cache_id) {

  var i;
  var rr;
  var rule_results     = this.required_rule_results;
  var rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }

  rule_results     = this.recommended_rule_results;
  rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }


  return null;
  
};/*
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
/*                            DOMCacheNLS                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor CacheNLS
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructs a DOMCache Object 
 *          
 * @property {String}  nls       - NLS cache items for properties
 */
 
OpenAjax.a11y.CacheNLS = function() {

  this.nls = {};

};

/**
 * @method addCacheNLSFromJSON()
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Constructs a DOMCache Object 
 *
 * @param  {locale}  locale         - Language code 
 * @param  {Object}  cache_nls_data - NLS cache items for properties
 */
 
OpenAjax.a11y.CacheNLS.prototype.addCacheNLSFromJSON = function(locale, cache_nls_data) {

  this.nls[locale] = cache_nls_data;

};

/**
 * @method getCacheNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the current cache nls object 
 *
 */
 
OpenAjax.a11y.CacheNLS.prototype.getCacheNLS = function() {

  return this.nls[OpenAjax.a11y.locale];

};

/**
 * @method getSeverityNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the severity object with NLS information
 *
 * @param  {Number}  severity  -  The constant representing the severity of the results
 *
 * @return {Object} Returns an object with the four properties: 'label', 'abbrev', 'description' snf 'tooltip'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getSeverityNLS = function(severity) {

  return this.nls[OpenAjax.a11y.locale].severities[severity];

};

/**
 * @method getRuleTypeNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS localized version of the rule type
 *
 * @param  {Number}  rule_type  -  The constant representing the type of rule in a ruleset (i.e. required, recommended, conditional)
 *
 * @return {String} Returns an NLS localized string representing the type of rule in the ruleset
 */
 
OpenAjax.a11y.CacheNLS.prototype.getRuleTypeNLS = function(rule_type) {

  return this.nls[OpenAjax.a11y.locale].rule_types[rule_type];

};

/**
 * @method getLabelAndValueNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label, human readable value and description of a cache property
 * 
 * @param  {String}           property  - The object property
 * @param  {String | Number}  value     - Current value of a property
 *
 * @return {Object} Returns object with three properties 'label', 'value' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getLabelAndValueNLS = function (property, value) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.value       = value;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
      if (typeof value == 'boolean') {
      
        if (value)
          info.value = nls_cache.boolean_values.true_value;
        else
          info.value = nls_cache.boolean_values.false_value;
          
      }
      else {
        if (cp.values) info.value = cp.values[value];
      }  
        
    } 
    
    return info;
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label and description of a cache property
 *
 * @param  {String}  property  - The object property
 * 
 * @return {Object} Returns object with two properties 'label' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getLabelNLS = function (property) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
              
    } 
    
    return info;
  
};

/**
 * @method getValueNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the value of a cache property
 *
 * @param  {String}           property  - The object property
 * @param  {String | Number}  value     - Current value of a property
 * 
 * @return {String} Returns string with the localized value of a property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getValueNLS = function (property, value) {
  
    var str = "";  // return object 
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return value;

      if (typeof value == 'boolean') {
      
        if (value)
          str = nls_cache.boolean_values.true_value;
        else
          str = nls_cache.boolean_values.false_value;
          
      }
      else {
        if (cp.values) str = cp.values[value];
      }  
              
    } 
    
    return str;
  
};

/**
 * @method getBooleanNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS boolean value 
 *
 * @param {Boolean}  value  - A boolean value to get the NLS string
 * 
 * @return {String} Returns string with the localized boolean value 
 */
 
OpenAjax.a11y.CacheNLS.prototype.getBooleanNLS = function (value) {
  
  var str = "";  // return object 
       
  var nls_cache = this.nls[OpenAjax.a11y.locale];
    
  if (nls_cache) {
     
    if (typeof value == 'boolean') {
      
      if (value)
        str = nls_cache.boolean_values.true_value;
      else
        str = nls_cache.boolean_values.false_value;
    }
  } 
    
  return str;
  
};


/**
 * @method getMissingLabelMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the missing form control label message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getMissingLabelMessageNLS = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.missing_label;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};

/**
 * @method getEmptyAltTextMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the empty alt text message message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getEmptyAltTextMessageNLS = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.empty_alt_text;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};

/**
 * @method getMissingALtMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns an NLS localized 'missing alt attribute' message
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getMissingAltMessageNLS = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.missing_alt;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};


/**
 * @method addItemIfDefined
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Adds an item to a list of properties 
 */

OpenAjax.a11y.CacheNLS.prototype.addPropertyIfDefined = function (list, item, property) {

  if (typeof item[property] !== 'undefined') {
    list.push(this.getLabelAndValueNLS(property, item[property]));
  } // endif
  
};
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
/*                       WCAG20                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAG 2.0 information with properties with localized NLS values 
 *
 * @property  {Array}   nls - Associative array of WCAG 2.0 information 
 */

OpenAjax.a11y.WCAG20 = function() {

  this.nls = {};
  
};

/**
 * @method addNLS
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Adds a localized version of WCAG 2.0 requirements to the cache 
 *
 * @param  {string}  locale  - Language code of WCAG 2.0  
 * @param  {Object}  nls     - Localized WCAG 2.0 object
 */

OpenAjax.a11y.WCAG20.prototype.addNLS = function(locale, nls) {

  var item;
  var  p,  p_id,  np;  /* WCAG 2.0 Principle */
  var  g,  g_id,  ng;  /* WCAG 2.0 Guideline */
  var sc, sc_id, nsc;  /* WCAG 2.0 Success Criterion */

  // Validate the WCAG 2.0 NLS properties
  if (!nls.abbrev) OpenAjax.a11y.console("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  if (!nls.title)  OpenAjax.a11y.console("Missing title property for WCAG 2.0 with locale: "        + locale);
  if (!nls.url)    OpenAjax.a11y.console("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  if (!nls.levels) OpenAjax.a11y.console("Missing levels property for WCAG 2.0 with locale: "        + locale);
  
  var wcag20 = new OpenAjax.a11y.WCAG20NLS(locale, nls.abbrev, nls.title, nls.url, nls.levels);
  
 //  OpenAjax.a11y.console("WCAG 2.0 " + nls.title + " for " + locale); 
  
  if (!nls.principles || typeof nls.principles !== 'object') {
    OpenAjax.a11y.console("Missing principles object or not at an object for WCAG 2.0 with locale: " + locale);
    return;
  } else {
    for (p_id in nls.principles) {
    
      p = nls.principles[p_id];
      
//      OpenAjax.a11y.console("Principle " + p.title); 
      
      np = new OpenAjax.a11y.WCAG20NLSPrinciple(p_id, p.title, p.description, p.url);
      
      for (g_id in p.guidelines) {
      
        g = p.guidelines[g_id];
    
//        OpenAjax.a11y.console("  Guideline " + g.title); 
      
        ng = new OpenAjax.a11y.WCAG20NLSGuideline(np, g_id, g.title, g.description, g.url);

        for (sc_id in g.success_criteria) {
      
          sc = g.success_criteria[sc_id];
    
          sc = new OpenAjax.a11y.WCAG20NLSSuccessCriteria(np, ng, sc_id, sc.level, sc.title, sc.description, sc.url);
          
//          OpenAjax.a11y.console("    Success Criteria " + sc.title); 
      
          ng.success_criteria.push(sc); 
      
        } // end loop
        
        np.guidelines.push(ng); 
        
      } // end loop
      
      wcag20.principles.push(np); 
 
    } // end loop
  }
  
  this.nls[locale] = wcag20;
  
};

/**
 * @method getNLS
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements 
 *
 */

OpenAjax.a11y.WCAG20.prototype.getNLS = function() {

  return this.nls[OpenAjax.a11y.locale];
  
};


/**
 * @method getWCAG20Level
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Returns an NLS localized version of WCAG 2.0 level 
 *
 * @param {Number}  level  -  Numerical constant defined in OAA cache representing the level
 */

OpenAjax.a11y.WCAG20.prototype.getWCAG20Level = function(level) {

  var wcag20_nls = this.nls[OpenAjax.a11y.locale];

  return wcag20_nls.levels[level.toString()];
  
};

/**
 * @method getNLSItemById
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements 
 *
 * @param {String}  id  -  id for the wcag item to get NLS information
 */

OpenAjax.a11y.WCAG20.prototype.getNLSItemById = function(id) {

  var i, j, k;
  var p, g, sc;
  var wcag20_nls = this.nls[OpenAjax.a11y.locale];
  
  if (!wcag20_nls) return null;
  
  for (i = 0; i < wcag20_nls.principles.length; i++) {
  
     p = wcag20_nls.principles[i];

     if (p.principle_id == id) return p;

     for (j = 0; j < p.guidelines.length; j++) {
     
       g = p.guidelines[j];
       
       if (g.guideline_id == id) return g;
     
       for (k = 0; k < g.success_criteria.length; k++ ) {
       
         sc = g.success_criteria[k];
       
         if (sc.sc_id == id) return sc;
       
       } // end loop
     
     } // end loop
     
  } // end loop   
    
  return null;  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLS                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLS
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAG 2.0 information with properties with localized NLS values 
 *
 * @param  {String}  locale - Language code 
 * @param  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @param  {String}  title  - Localized title of WCAG 2.0 guidelines 
 * @param  {String}  url    - URL to the translation of WCAG 2.0
 * @param  {Object}  levels - WCAG 2.0 levels for success criteria
 *
 * @property  {String}  locale - Language code 
 * @property  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @property  {String}  title  - Localized title of WCAG 2.0 guidelines 
 * @property  {String}  url    - URL to the translation of WCAG 2.0
 * @property  {Object}  levels - WCAG 2.0 levels for success criteria
 *
 * @property  {Array}   principles - Array of WCAG 2.0 principle objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLS = function(locale, abbrev, title, url, levels) {

  this.locale = locale;    
  this.abbrev = abbrev;    
  this.title  = title;    
  this.url    = url;  
  this.levels = levels;
  
  this.principles = [];
  
};


/* ---------------------------------------------------------------- */
/*                       WCAG20NLSPrinciple                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAg 2.0 Principle information with properties with localized NLS values 
 *
 * @param  {String}  principle_id  - Principle id
 * @param  {String}  title         - Title of the requirement 
 * @param  {String}  description   - Description of principle 
 * @param  {String}  url           - URL to information on the requirement
 *
 * @property  {String}  principle_id  - Principle id 
 * @property  {String}  title         - Title of the principle 
 * @property  {String}  description   - Description of principle 
 * @property  {String}  url           - URL to information on the requirement
 *
 * @property  {Array}   guidelines - Array of WCAG 2.0 guideline objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSPrinciple = function(principle_id, title, description, url) {

  this.principle_id = principle_id;    
  this.title        = title;    
  this.description  = description;    
  this.url          = url;   
  
  this.guidelines = [];
  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSGuideline                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAg 2.0 Guideline information with properties with localized NLS values 
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 *
 * @param  {String}  guideline_id  - Guideline id 
 * @param  {String}  title         - Title of the guideline
 * @param  {String}  description   - Description of the guideline 
 * @param  {String}  url           - URL to information on the guideline
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 *
 * @property  {String}  guideline_id  - Guideline id 
 * @property  {String}  title         - Title of the guideline 
 * @property  {String}  description   - Description of the guideline 
 * @property  {String}  url           - URL to information on the requirement
 *
 * @property  {Array}   success_criteria  - Array of WCAG 2.0 success criteria objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSGuideline = function(principle, guideline_id, title, description, url) {

  this.principle     = principle;    
  
  this.guideline_id  = guideline_id;   
  
  this.title         = title;    
  this.discription   = description;    
  this.url           = url;   
  
  this.success_criteria = [];
  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSSuccessCriteria                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSSuccessCriteria
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  WCAG 2.0 Success Criteria information with properties with localized NLS values 
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @param  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @param  {String}  sc_id        - WCAG 2.0 Sucess cCriteria id   
 * @param  {String}  level        - Level of importance of a requirement
 * @param  {String}  title        - Title of the success criteria 
 * @param  {String}  description  - Description of the success criteria
 * @param  {String}  url          - URL to information on the requirement
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @property  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @property  {String}  sc_id      - Requirement 
 * @property  {String}  title      - Title of the requirement 
 * @property  {String}  level      - Level of importance of a requirement
 * @property  {String}  url        - URL to information on the requirement
 * @property  {Array}   resources  - URL to information on the requirement
 */

OpenAjax.a11y.WCAG20NLSSuccessCriteria = function(principle, guideline, sc_id, level, title, description, url) {

  this.principle  = principle;    
  this.guideline  = guideline;    
  
  this.sc_id      = sc_id;    
  
  this.level       = level;   
  this.title       = title;    
  this.description = description;    
  this.url         = url;   
  
  this.resources = [];  
  
};

/**
 * @member addResource
 *
 * @memberOf OpenAjax.a11y.RequirementInfo
 *
 * @desc Add a resource with localized NLS values to the NLS requirement information 
 *
 * @param {ResourceInfo}  resource  - Resource object to add 
 */

OpenAjax.a11y.WCAG20NLSSuccessCriteria.prototype.addResource = function(resource) {

  this.resources.push(resource);
  
};

/* ---------------------------------------------------------------- */
/*                        ResourceInfo                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor ResourceInfo
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Resource information with properties with localized NLS values 
 *
 * @param {String}  type   - Number of the requirement 
 * @param {String}  title  - Title of the requirement 
 * @param {String}  url    - URL to information on the requirement
 */

OpenAjax.a11y.ResourceInfo = function(type, title, url) {

  this.type  = type;      
  this.title = title;      
  this.url   = url;     
  
};

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
/*                          WCAG20Result                            */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20Result
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Principle
 *
 * @param  {RulesetPrinciple}  ruleset_principle  - Ruleset Principle object
 *
 * @property  {WCAG20RulesetPrinciple}   ruleset_principle        - Reference to the associated ruleset principle
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20Result = function (ruleset, url, title) {

  this.ruleset = ruleset;
  this.title = title;
  this.url   = url;
  
  this.rule_summary_results   = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_a_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_aa_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_aaa_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  
  this.principle_results = [];

};

/** 
 * @method addPrincipleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Add principle result object
 *
 * @param  {WCAG20ResultPrinciple}  principle_result  - Principle result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addPrincipleResult = function (principle_result) {

  this.principle_results.push(principle_result);

};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20Result
 *
 * @desc Creates a html text string representation of the WCAG20 results  
 *
 * @return {String} Returns a HTML coded text string representation of the WCAG20 result object
 */

OpenAjax.a11y.WCAG20Result.prototype.toHTML = function () {

  function toHtmlRuleSummaryTableStart(id_table, title) {
  
    var html = "";

    html += "    <h2 id='h2_" + id_table + "'>" + title + "</h2>\n"; 
    html += "    <table class='rule_summary' aria-labelledby='h2_" + id_table + "'>\n"; 
    html += "      <thead>\n";
    html += "        <tr>\n";
    html += "          <th rowspan='2'></th>\n";
    html += "          <th id='" + id_table + "_req_rules' colspan='3' >Required Rules</th>\n";
    html += "          <th id='" + id_table + "_rec_rules' colspan='3' >Recommended Rules</th>\n";
    html += "          <th id='" + id_table + "_totals' class='totals' rowspan='2'>Total</th>\n";
    html += "        </tr>\n";
    html += "        <tr>\n";
    html += "          <th class='required_pass'   id='" + id_table + "_all_pass'>All Pass <sup><a href='#" + id_table + "_sup1'>1</a></sup> </th>\n";
    html += "          <th class='required_fail'   id='" + id_table + "_has_fail'>Violations<sup><a href='#" + id_table + "_sup2'>2</a></sup> </th>\n";
    html += "          <th class='required_manual' id='" + id_table + "_has_mc' >Manual Checks<sup><a href='#" + id_table + "_sup3'>3</a></sup> </th>\n";
    html += "          <th class='recommended_pass'>All Pass<sup><a href='#" + id_table + "_sup1'>1</a></sup></th>\n";
    html += "          <th class='recommended_fail'>Violations<sup><a href='#" + id_table + "_sup2'>2</a></sup></th>\n";
    html += "          <th class='recommended_manual'>Manual Checks<sup><a href='#" + id_table + "_sup3'>3</a></sup></th>\n";
    html += "        </tr>\n"; 
    html += "      </thead>\n";
    html += "      <tbody>\n";
    
    return html;
    
  }

  function toHtmlRuleSummaryTableRowSection(id_section, section_title) {
 
    var html = "";
    
    html += "        <tr class='section'>\n";
    html += "          <th class='section' id='" + id_section + "'>" + section_title  + "</th>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }


  function toHtmlRuleSummaryTableRow(row_count, id_table, id_section, id_row, item_title, rule_summary) {
 
    var cell_class = "";
 
    var total = rule_summary.required_rules_all_pass;
    total += rule_summary.required_rules_with_fail;
    total += rule_summary.required_rules_with_manual_checks;
    total += rule_summary.recommended_rules_all_pass;
    total += rule_summary.recommended_rules_with_fail;
    total += rule_summary.recommended_rules_with_manual_checks;
 
    var html = "";
    
    if (row_count % 2) html += "        <tr class='odd'>\n";
    else html += "        <tr class='even'>\n";
    
    html += "          <th id='" + id_row + "' headers='" + id_section + "'>" + item_title  + "</th>\n";
    
    cell_class = "";
    if (rule_summary.required_rules_all_pass > 0) cell_class = "required_pass";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_all_pass'>" + rule_summary.required_rules_all_pass           + "</td>\n";
    
    cell_class = "";
    if (rule_summary.required_rules_with_fail > 0) cell_class = "required_fail";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_has_fail'>" + rule_summary.required_rules_with_fail          + "</td>\n";
    
    cell_class = "";
    if (rule_summary.required_rules_with_manual_checks > 0) cell_class = "required_manual";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_has_mc'>"   + rule_summary.required_rules_with_manual_checks + "</td>\n";
    
    cell_class = "";
    if (rule_summary.recommended_rules_all_pass > 0) cell_class = "recommended_pass";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_all_pass'>" + rule_summary.recommended_rules_all_pass           + "</td>\n";
    
    cell_class = "";
    if (rule_summary.recommended_rules_with_fail > 0) cell_class = "recommended_fail";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_has_fail'>" + rule_summary.recommended_rules_with_fail          + "</td>\n";
    
    cell_class = "";
    if (rule_summary.recommended_rules_with_manual_checks > 0) cell_class = "recommended_manual";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_has_mc'>"   + rule_summary.recommended_rules_with_manual_checks + "</td>\n";
    
    html += "          <td class='totals' headers='" + id_row + " " + id_table + "_totals'>"   + total + "</td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlRuleSummaryTableRowTotal(id_table, id_row, item_title, rule_summary) {

    var total = rule_summary.required_rules_all_pass;
    total += rule_summary.required_rules_with_fail;
    total += rule_summary.required_rules_with_manual_checks;
    total += rule_summary.recommended_rules_all_pass;
    total += rule_summary.recommended_rules_with_fail;
    total += rule_summary.recommended_rules_with_manual_checks;

    var html = "";
    
    html += "        <tr class='totals'>\n";
    
    html += "          <th id='" + id_row  + "_total'>Total</th>\n";
    html += "          <td headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_all_pass'>" + rule_summary.required_rules_all_pass           + "</td>\n";
    html += "          <td headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_has_fail'>" + rule_summary.required_rules_with_fail          + "</td>\n";
    html += "          <td headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_has_mc'>"   + rule_summary.required_rules_with_manual_checks + "</td>\n";

    html += "          <td headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_all_pass'>" + rule_summary.recommended_rules_all_pass           + "</td>\n";
    html += "          <td headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_has_fail'>" + rule_summary.recommended_rules_with_fail          + "</td>\n";
    html += "          <td headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_has_mc'>"   + rule_summary.recommended_rules_with_manual_checks + "</td>\n";
    html += "          <td headers='" + id_row + "_total'>"   + total + "</td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlRuleSummaryTableEnd() {

    var html = "";

    html += "      </tbody>\n";
    html += "    </table>\n"; 
    return html;
  }

  function toHtmlRuleSummaryTableRefs(id_table) {

    var html = "";

    html += "    <p><sup><a id='" + id_table + "_sup1'>1</a></sup>Number of rules where all elements a rule applied to passed</p>";
    html += "    <p><sup><a id='" + id_table + "_sup2'>2</a></sup>Number of rules where one or more elements a rule applies resulted in a violation</p>";
    html += "    <p><sup><a id='" + id_table + "_sup3'>3</a></sup>Number of rules where one or more elements a rule applies resulted in a manual evaluation</p>";
    return html;
  }

 
 
  function toHtmlWCAG20Summary(title, principle_results, wcag20_nls) {

    var i, j;
    
    var pr;
    var gr;
    
    var html = "";
    
    var id_table = 'summ';
    var id_principle = "";
    var id_guideline = "";
    
    var id_count = 0;
    var row_id = "";
    
    var t = "Rule Results for '" + title + "'";

    html += "    <div id='summary' role='main' aria-labelledby='main_summary'>\n";
    html += "      <h1 id='main_summary'>WCAG 2.0 Rule Results Summary</h1>\n";
    html += "\n"; 

    html += toHtmlRuleSummaryTableStart(id_table, t);

    for (i = 0; i < principle_results.length; i++) {
    
      pr = principle_results[i];
      
      t = wcag20_nls.getNLSItemById(pr.ruleset_principle.id).title;
      
      id_principle = id_table + "_p" + (i+1);

      html += toHtmlRuleSummaryTableRowSection(id_principle, t);

      for (j = 0; j < pr.guideline_results.length; j++) {
 
        gr = pr.guideline_results[j];

        t = wcag20_nls.getNLSItemById(gr.ruleset_guideline.id).title;

        id_guideline = id_table + "_g" + (i+1) + (j+1);
      
        if (gr.rule_summary_results) {
          html += toHtmlRuleSummaryTableRow(j, id_table, id_principle, id_guideline, t, gr.rule_summary_results);
        }
        
      }  

      row_id = id + "_row_" + id_count;
      id_count += 1;
      
      html += toHtmlRuleSummaryTableRowTotal(id_table, id_principle, wcag20_nls.getNLSItemById(pr.ruleset_principle.id).title, pr.rule_summary_results);
    
    }
    
    html += toHtmlRuleSummaryTableEnd();
    
    html += toHtmlRuleSummaryTableRefs();

    html += "\n"; 

    html += "    </div>\n"; 

    return html;
  
  }

  function toHtmlWCAG20Guidelines(title_document, guideline_results, wcag20_nls) {

    var i, j;
    
    var html = "";
    
    var id_table;

    var gr;
    var id_guideline;
    var id_gr;
    var title_guideline = "";

    var scr;    
    var id_scr;
    var title_success_criteria = "";

    for (i = 0; i < guideline_results.length; i++) {

      gr    = guideline_results[i];
      id_guideline = gr.ruleset_guideline.id;
      id_gr = "gl" + id_guideline;
      title_guideline = wcag20_nls.getNLSItemById(id_guideline).title;
      
      html += "    <div id='" + id_gr + "' role='main' aria-labelledby='" + id_gr + "_summary'>\n";
      html += "      <h1 id='" + id_gr + "_summary'>Guideline " + id_guideline + " Rule Results Summary</h1>\n";
      html += "\n"; 

      var t = "Guideline " + id_guideline + " Rule Results for '" + title_document + "'";

      id_table = "gl_table_" + id_gr;

      html += toHtmlRuleSummaryTableStart(id_table, t);

      html += toHtmlRuleSummaryTableRowSection(id_guideline, title_guideline);

      for (j = 0; j < gr.success_criteria_results.length; j++) {
 
        scr = gr.success_criteria_results[j];

        title_success_criterion = wcag20_nls.getNLSItemById(scr.ruleset_success_criterion.id).title;
        id_success_criterion    = scr.ruleset_success_criterion.id;
        id_scr  = id_table + id_success_criterion;
      
        if (gr.rule_summary_results) {
          html += toHtmlRuleSummaryTableRow(j, id_table, id_guideline, id_success_criterion, title_success_criterion, scr.rule_summary_results);
        }  
      }  

      html += toHtmlRuleSummaryTableRowTotal(id_table, id_guideline, title_guideline, gr.rule_summary_results);
        
      html += toHtmlRuleSummaryTableEnd();
    
      html += toHtmlRuleSummaryTableRefs(id_gr);

      html += "\n"; 

      html += "    </div>\n"; 
      
    }   

    return html;
  
  }


  function toHtmlStart(title, url) {
  
    var html = "";
    
    html += "<!DOCTYPE html>\n";
    
    html += "<html>\n";
 
    html += "  <head>\n";
    html += "    <title>WCAG 2.0 Report for " + title + "</title>\n"; 
    html += "\n"; 
    html += "    <script type='text/javascript'>\n"; 
    html += "      var section_ids = []\n"; 
    html += "      section_ids.push('summary')\n"; 
    html += "      section_ids.push('gl1.1')\n"; 
    html += "      section_ids.push('gl1.2')\n"; 
    html += "      section_ids.push('gl1.3')\n"; 
    html += "      section_ids.push('gl1.4')\n"; 
    html += "      section_ids.push('gl2.1')\n"; 
    html += "      section_ids.push('gl2.2')\n"; 
    html += "      section_ids.push('gl2.3')\n"; 
    html += "      section_ids.push('gl2.4')\n"; 
    html += "      section_ids.push('gl3.1')\n"; 
    html += "      section_ids.push('gl3.2')\n"; 
    html += "      section_ids.push('gl3.3')\n"; 
    html += "      section_ids.push('gl4.1')\n"; 
    html += "      section_ids.push('images')\n"; 
    html += "      section_ids.push('controls')\n"; 
    html += "      section_ids.push('color')\n"; 
    html += "      section_ids.push('landmarks')\n"; 
    html += "      section_ids.push('links')\n"; 
    html += "      section_ids.push('lists')\n"; 
    html += "      section_ids.push('tables')\n"; 
    html += "\n"; 
    html += "      function showOption(id) {\n"; 
    html += "        var node_show = document.getElementById(id);\n";    
    html += "        var node;\n";    
    html += "\n"; 
    html += "        if (node_show) {\n";    
    html += "          for (var i = 0; i < section_ids.length; i++) {\n";    
    html += "            node = document.getElementById(section_ids[i]);\n";    
    html += "            if (node) node.style.display = 'none';\n";    
    html += "          }\n";    
    html += "          node_show.style.display = 'block';\n";    
    html += "        }\n";    
    html += "      }\n"; 
    html += "    </script>\n"; 
    html += "\n"; 
    html += "    <style type='text/css'>\n"; 
    html += "      div[role='banner'] {\n"; 
    html += "        width: 100%;\n"; 
    html += "        border-bottom: #dddddd solid thin;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='banner'] p.title {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        color: #444444;\n"; 
    html += "        font-size: 150%;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div#nav_container {\n"; 
    html += "        float: left;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        padding-top: 1em;\n"; 
    html += "        width: 10em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] h2 {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        padding-bottom: 0.25em;\n"; 
    html += "        margin-bottom: 0.25em;\n"; 
    html += "        font-size: 100%;\n"; 
    html += "        color: #444444;\n"; 
    html += "        text-align: center;\n"; 
    html += "        border-bottom: #dddddd solid thin;\n"; 
    html += "      }\n"; 
    html += "      div[role='navigation'] ul {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        width: 90%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] a {\n"; 
    html += "        width: 100%;\n"; 
    html += "        display: block;\n"; 
    html += "        font-size: 100%;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "        color: #111111;\n"; 
    html += "        background-color: #eeeeee;\n"; 
    html += "        border: thin solid transparent;\n"; 
    html += "        padding: 0.25em;\n"; 
    html += "        margin-bottom: 1px;\n"; 
    html += "        text-decoration: none;\n"; 
    html += "        text-align: right;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] a:focus,\n"; 
    html += "      div[role='navigation'] a:hover {\n"; 
    html += "        color: black;\n"; 
    html += "        background-color: #dddddd;\n"; 
    html += "        border: thin solid #dddddd;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] {\n"; 
    html += "        margin-left: 11em;\n"; 
    html += "        height: 40em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] h1 {\n"; 
    html += "        font-size: 150%;\n"; 
    html += "        text-align: center;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] h2 {\n"; 
    html += "        font-size: 125%;\n"; 
    html += "        text-align: left;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table {\n"; 
    html += "        margin-bottom: 1.5em;\n";      
    html += "        border-collapse: collapse;\n";      
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table th.required_pass,\n"; 
    html += "      div[role='main'] table th.required_fail,\n"; 
    html += "      div[role='main'] table th.required_manual,\n"; 
    html += "      div[role='main'] table th.recommended_pass,\n"; 
    html += "      div[role='main'] table th.recommended_fail,\n"; 
    html += "      div[role='main'] table th.recommended_manual,\n"; 
    html += "      div[role='main'] table th.totals {\n"; 
    html += "        width: 8em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tbody th.section {\n"; 
    html += "        padding-top: 1em;\n"; 
    html += "        text-align: left;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "        font-size: 110%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table thead th,\n"; 
    html += "      div[role='main'] table td {\n"; 
    html += "        text-align: center;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table th[colspan='3'] {\n"; 
    html += "        font-size: 120%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tbody th {\n"; 
    html += "        text-align: left;\n"; 
    html += "        font-weight: normal;\n";     
    html += "      }\n"; 
    html += "      \n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even th,\n"; 
    html += "      div[role='main'] table tr.even td {\n"; 
    html += "        background-color: #EEEEEE;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.totals th,\n"; 
    html += "      div[role='main'] table tr.totals td {\n"; 
    html += "        border-top: solid black thin;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.totals th {\n"; 
    html += "        text-align: right;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.totals,\n"; 
    html += "      div[role='main'] table tr.odd  td.totals {\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required_pass,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_pass {\n"; 
    html += "        color: #007800;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required_fail,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_fail {\n"; 
    html += "        color: #900000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required_manual,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_manual {\n"; 
    html += "        color: #900000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended_pass,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_pass {\n"; 
    html += "        color: #007800;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended_fail,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_fail {\n"; 
    html += "        color: #806000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended_manual,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_manual {\n"; 
    html += "        color: #806000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "    </style>\n"; 
    html += "\n"; 
    html += "  </head>\n";
    html += "\n"; 
 
    html += "  <body onload=\"showOption('summary');\">\n";
    html += "    <div role='banner'>\n";    
    html += "      <p class='title'>WCAG 2.0 Report for " + title + "</p>\n"; 
    html += "      <p class='url'>URL: " + url + "</p>\n"; 
    html += "    </div>\n";
    html += "    <div id='nav_container'>\n";    
    html += "      <div role='navigation' aria-labelledby='wcag20_nav'>\n";    
    html += "        <h2 id='wcag20_nav'>WCAG 2.0 Options</h2>\n"; 
    html += "        <ul>\n";   
    html += "          <li><a href=\"javascript:showOption('summary');\">Summary</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.1');\">Guideline 1.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.2');\">Guideline 1.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.3');\">Guideline 1.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.4');\">Guideline 1.4</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.1');\">Guideline 2.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.2');\">Guideline 2.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.3');\">Guideline 2.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.4');\">Guideline 2.4</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.1');\">Guideline 3.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.2');\">Guideline 3.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.3');\">Guideline 3.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl4.1');\">Guideline 4.1</a></li>\n";   
    html += "        </ul>\n";   
    html += "      </div>\n";    
    html += "      <div role='navigation' aria-labelledby='element_nav'>\n";    
    html += "        <h2 id='element_nav'>Element Options</h2>\n"; 
    html += "        <ul>\n";   
    html += "          <li><a href=\"javascript:showOption('images');\"   >Images</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('controls');\" >Controls</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('color');\"    >Color Contrast</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('landmarks');\">Landmarks</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('links');\"    >Links</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('lists');\"    >Lists</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('tables');\"   >Tables</a></li>\n";   
    html += "        </ul>\n";   
    html += "      </div>\n";     
    html += "    </div>\n";     
    return html;
    
  }  

  function toHtmlEnd() {
  
    var html = "";
     
    html += "  </body>\n";

    html += "</html>\n";
    
    return html;    
  }  


  var i, j, k, l;  // loop counters

  var pr;

  var wcag20_nls = OpenAjax.a11y.all_wcag20_nls;
 
  var html = "";

  var id_count = 1;
  var id;

  html += toHtmlStart(this.title, this.url);
  
  html += toHtmlWCAG20Summary(this.title, this.principle_results, wcag20_nls);
  
  for (i = 0; i < this.principle_results.length; i++ ) {

    pr = this.principle_results[i];

    html += toHtmlWCAG20Guidelines(this.title, pr.guideline_results, wcag20_nls);
    
  }  

  html += toHtmlEnd();
 
  return html;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20Result
 *
 * @desc Creates a text string representation of the WCAG20 result object 
 *
 * @return {String} Returns a text string representation of the WCAG20 result object
 */

OpenAjax.a11y.WCAG20Result.prototype.toString = function () {

  var str = "";
 
  return str;
};

/* ---------------------------------------------------------------- */
/*                        WCAG20ResultPrinciple                           */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Principle
 *
 * @param  {RulesetPrinciple}  ruleset_principle  - Ruleset Principle object
 *
 * @property  {WCAG20RulesetPrinciple}   ruleset_principle        - Reference to the associated ruleset principle
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple = function (ruleset_principle) {

  this.ruleset_principle = ruleset_principle;
  this.rule_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  this.guideline_results = [];

};

/** 
 * @method addGuidelineResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultPrinciple
 *
 * @desc Add guideline result object
 *
 * @param  {WCAG20ResultGuideline}  guideline_result  - Guideline result object to add
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple.prototype.addGuidelineResult = function (guideline_result) {

  this.guideline_results.push(guideline_result);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultPrinciple
 *
 * @desc Creates a text string representation of the principle result object 
 *
 * @return {String} Returns a text string representation of the principle result object
 */

OpenAjax.a11y.WCAG20ResultPrinciple.prototype.toString = function () {

 var str = "";
 
 return str;
};



/* ---------------------------------------------------------------- */
/*                        WCAG20ResultGuideline                           */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Guideline
 *
 * @param  {WCAG20RulesetGuideline}  ruleset_guideline  - Ruleset guideline object
 *
 * @property  {WCAG20RulesetGuideline}   ruleset_guideline        - Reference to the associated ruleset guideline
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_sucess_creiteria  - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultGuideline = function (ruleset_guideline) {

  this.ruleset_guideline = ruleset_guideline;
  this.rule_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  this.success_criteria_results = [];

};

/** 
 * @method addSuccessCriterionResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultGuideline
 *
 * @desc Add success criterion result object
 *
 * @param  {WCAG20ResultSuccessCriterion}  success_criterion_result  - Success criterion result object to add
 */
 
OpenAjax.a11y.WCAG20ResultGuideline.prototype.addSuccessCriterionResult = function (success_criterion_result) {

  this.success_criteria_results.push(success_criterion_result);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultGuideline
 *
 * @desc Creates a text string representation of the guideline result object 
 *
 * @return {String} Returns a text string representation of the guideline result object
 */

OpenAjax.a11y.WCAG20ResultGuideline.prototype.toString = function () {

 var str = "";
 
 return str;
};

/* ---------------------------------------------------------------- */
/*              WCAG20ResultSuccessCriterion                        */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultSuccessCriterion
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Success Criteria
 *
 * @param  {RulesetSuccessCriterion}  ruleset_success_criterion  - Ruleset Success Criterion object
 *
 * @property  {Object}   ruleset_success_criteria  - Reference to the associated ruleset success criteria
 * @property  {Array}    rule_summary_results      - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion = function (ruleset_success_criterion) {

  this.ruleset_success_criterion = ruleset_success_criterion;
  this.rule_summary_results      = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_results = [];
};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultSuccessCriterion
 *
 * @desc Add rule result object
 *
 * @param  {ResultRule}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.addRuleResult = function (rule_result) {

  this.rule_results.push(rule_result);

};

/** 
 * @method getRequirement
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultSuccessCriterion
 *
 * @desc Returns a NLS localized title for the rquirement
 *
 * @return {Array} Returns string with a localized version of the requirement
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.getRequirement = function () {

  var sc_nls = OpenAjax.a11y.all_wcag20_nls.getNLSItemById(this.ruleset_success_criterion.id); 
  
  if (sc_nls) 
    return "WCAG " + sc_nls.title;
  else
    return "Title not found";  

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultSuccessCriterion
 *
 * @desc Creates a text string representation of the success criterion result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.toString = function () {

 var str = "";
 
 return str;
};

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
      OpenAjax.a11y.console("  ** Error loading ruleset: " + ruleset_data[id]);
    break;
    
  default:
    OpenAjax.a11y.console("  ** Rule set type: '" + type + "' not supported");
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
     if (this.rulesets[i].id === ruleset_id) return this.rulesets[i]; 
  }

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

  var i;
  var rulesets = [];
  var ruleset;
  var o;
  
  for (i = 0; i < this.rulesets.length; i++) {
  
    ruleset = this.rulesets[i];
      
    o = new Object();
  
    o.ruleset_id      = ruleset.id;
    o.ruleset_version = ruleset.ruleset_version;

    o.ruleset_title   = ruleset.ruleset_title;
    
    o.ruleset_description = ruleset.ruleset_description;            

    o.author_name = ruleset.ruleset_author_name;
    o.author_url = ruleset.ruleset_author_url;

    rulesets.push(o);
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
 * @property {String} id                   - id of the ruleset           
 * @property {String} ruleset_title        - NLS localized title of the ruleset           
 * @property {String} ruleset_description  - Description of the ruleset         
 * @property {String} ruleset_author_name  - Name of the author(s) or organization         
 * @property {String} ruleset_author_url   - URL to the author(s) or organization       
 * @property {String} ruleset_updated      - Last time the ruleset was updated     
 * @property {Number} number_of_rules      - number of rules in the rule set
 *
 * @property {WCAG20RulesetPrinciple} ruleset_principles  - Array of WCAG 2.0 ruleset principle objects          
 *
 * NOTE: The following properties are defined after each evaluation
 *
 * @property {String} title  - The title of the last document evaluated
 * @property {String} url    - The url of the last document evaluated
 *
 * @property {Object} doc         - Reference to browser document object model (DOM) that holds the document to be analyzed
 * @property {Object} wcag20_nls  - Reference to WCAG 2.0 NLS object for current language
 * @property {Object} log         - Reference to Log object
 * @property {Object} dom_cache   - Reference to DOMCache object
 * @property {Object} result      - Reference to WCAG20Result object
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

  var  p_id,  rp_data,  rp_new;  // variables for creating RulesetPrinciple objects
  var  g_id,  rg_data,  rg_new;  // variables for creating RulesetGuideline objects
  var sc_id, rsc_data, rsc_new;  // variables for creating RulesetSuccessCriterion objects
  var  r_id,  rr_data,  rr_new;  // variables for creating RulesetRule objects
 
  this.type = "WCAG20";
  this.ruleset_title = {};

  // Check for ruleset id

  if (ruleset_data['id']) {
    this.id  = ruleset_data['id'];
    OpenAjax.a11y.console("Loading ruleset with the id: " + this.id);
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing id");
    return null;
  }

  // Check for ruleset version

  if (ruleset_data['version']) {
    this.ruleset_version  = ruleset_data['version'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing version");
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
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing default title");
    return null;
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing last updated date, set to null");
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
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing default description");
    this.ruleset_description = "no description";
  }

  // Check for default and localized ruleset descriptions

  if (ruleset_data.author && ruleset_data.author.name) {
    this.ruleset_author_name = ruleset_data.author.name;
    if (ruleset_data.author.url) this.ruleset_author_url = ruleset_data.author.url;
    else this.ruleset_author_url = "no author url";    
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset " + this.id + " missing author information");
    this.ruleset_author_name = "no author";
    this.ruleset_author_url  = "no author url";
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.console("  ** Ruleset missing last updated date, set to null");
    this.ruleset_updated  = "0000-00-00";
  }


  this.number_of_rules   = 0;

  this.ruleset_principles = [];
  
  if (!ruleset_data.principles) { 
    OpenAjax.a11y.console("  ** Principle references are missing");
    return null;
  } 
  else {
  
    for (p_id in ruleset_data.principles) {
    
//      OpenAjax.a11y.console("== Processing Principle: " + p_id );
 
      rp_data = ruleset_data.principles[p_id];
 
      if (rp_data.guidelines) {
      
        if (typeof rp_data.enabled === 'boolean')
          rp_new = new OpenAjax.a11y.WCAG20RulesetPrinciple(p_id, rp_data.enabled);
        else  
          rp_new = new OpenAjax.a11y.WCAG20RulesetPrinciple(p_id, true);

        for (g_id in rp_data.guidelines) {

 //        OpenAjax.a11y.console("==== Processing Guideline: " + g_id );

          rg_data = rp_data.guidelines[g_id];
 
          if (rg_data.success_criteria) {
      
            if (typeof rg_data.enabled == 'boolean')
              rg_new = new OpenAjax.a11y.WCAG20RulesetGuideline(g_id, rg_data.enabled);
            else  
              rg_new = new OpenAjax.a11y.WCAG20RulesetGuideline(g_id, true);
              
            for (sc_id in rg_data.success_criteria) {

//              OpenAjax.a11y.console("====== Processing Success Criteria: " + sc_id );

              sc_data = rg_data.success_criteria[sc_id];
 
              if (sc_data.rules) {
      
                if (typeof rg_data.enabled === 'boolean')
                  rsc_new = new OpenAjax.a11y.WCAG20RulesetSuccessCriterion(sc_id, rg_data.enabled);
                else  
                  rsc_new = new OpenAjax.a11y.WCAG20RulesetSuccessCriterion(sc_id, true);
                  
                for (r_id in sc_data.rules) {
                
//                  OpenAjax.a11y.console("======== Processing Rule: " + r_id );
              
                  rr_data = sc_data.rules[r_id];
                  
                  if (typeof rr_data.type     === 'number' && 
                      typeof rr_data.priority === 'number' && 
                      typeof rr_data.status   === 'number' ) {

                    if (typeof rr_data.enabled === 'boolean')
                      rr_new = new OpenAjax.a11y.WCAG20RulesetRule(r_id, rr_data.type, rr_data.priority, rr_data.status, rr_data.enabled);
                    else  
                      rr_new = new OpenAjax.a11y.WCAG20RulesetRule(r_id, rr_data.type, rr_data.priority, rr_data.status, true);
  
                    rsc_new.addRulesetRule(rr_new);  
                    
                    this.number_of_rules++;
                     
                  }
                  else {
                    OpenAjax.a11y.console("      type: " + rr_data.type);
                    OpenAjax.a11y.console("  priority: " + rr_data.priority);
                    OpenAjax.a11y.console("    status: " + rr_data.status);
                    OpenAjax.a11y.console("        ** Ruleset rule " + r_id + " is missing one of the required properties: type, priority, status");              
                  }
        
                } // end loop
                
                rg_new.addRulesetSuccessCriterion(rsc_new);
                
              }    
              else {
                OpenAjaax.a11y.console("      ** Ruleset Success Criterion " + sc_id + " is missing rules property");
              }
          
            } // end loop
              
            rp_new.addRulesetGuideline(rg_new);
                
          }    
          else {
            OpenAjaax.a11y.console("    ** Ruleset Guideline " + g_id + " is missing success criteria property");
          }
          
        } // end loop

        this.ruleset_principles.push(rp_new);

      }
      else {
        OpenAjaax.a11y.console("  ** Ruleset Principle " + p_id + " is missing guidelines property");
      }
      
    } // end loop
    
  } 
  
  // local references to current NLS information, based on current locale setting
  
  this.wcag20_nls  = OpenAjax.a11y.all_wcag20_nls.getNLS();      
  
  // References related to evaluating a document
  // Initial values are null, properties are set with the "newResource' method
  
  this.title = "";
  this.url   = "";
  
  this.doc       = null;
  this.log       = null;
  this.dom_cache = null;        
  this.result    = null; 
  
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

  var i, j, k;
  
  var rp;
  var rg;
  var rsc;
  
  for (i = 0; i < this.ruleset_principles.length; i++) {
  
    rp = this.ruleset_principles[i];
    
    for (j = 0; j < rp.ruleset_guidelines.length; j++ ) {
      
      rg = rp.ruleset_guidelines[j];
      
      for (k = 0; k < rg.ruleset_success_criteria.length; k++) {
        rsc = rg.ruleset_success_criteria[k];
        
        if (rsc.level <= level) {
          rsc.enabled = true;
        }
        else {
          rsc.enabled = false;        
        }
      }
    }
  }
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
 * @method evaluate
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Evaluate a document using the OpenAjax ruleset and return an evaluation object 
 *
 * @param  {String}    url                     url of document being analyzed    
 * @param  {String}    title                   Title of document being analyzed    
 * @param  {Object}    doc                     Browser document object model (DOM) to be evaluated    
 * @param  {Function}  progessCallBackFunction Function will be called periodically to provide progress information 
 *
 * @param {Boolean} build_cache When true will build all cache in one tranversal of the DOMElements cache, when false specialized caches will be built when they are need by a rule
 *
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.evaluate = function (url, title, doc, progessCallBackFunction, build_cache) {
      
    var i, j, k, l;
    var rp, rps, rps_len;     // Varaibles associated with WCAG20RulesetPrinciples
    var rg, rgs, rgs_len;     // Varaibles associated with WCAG20RulesetGuidelines
    var rsc, rscs, rscs_len;  // Varaibles associated with WCAG20RulesetSuccessCriteria
    
    var ruleset_rule, rule;  // Varaibles associated with WCAG20RulesetRule, Rule, ResultRule
    
    var principle_result, guideline_result, success_criterion_result, rule_result; 
    
    var up_to_date;
    
    var PROGRESS = OpenAjax.a11y.PROGRESS;

    this.doc   = doc;
    this.title = title;
    this.url   = url;
  
//    OpenAjax.a11y.console("Starting evaluation: " + this.id + " " + this.default_name + " " + this.number_of_rules + " rules" );
  
    this.log = new OpenAjax.a11y.Log(this.id, this.default_name, this.number_of_rules, progessCallBackFunction);

//    OpenAjax.a11y.console(this.log);

    this.dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, this.log);      

    this.result = new OpenAjax.a11y.WCAG20Result(this, url, title); 

    this.dom_cache.updateDOMElementCache();
    if (build_cache) { 
      this.dom_cache.updateAllCaches();
    }  
  
    rps     = this.ruleset_principles;
    rps_len = this.ruleset_principles.length;

    for (i = 0; i < rps_len; i++) {
    
      rp = rps[i];
    
      principle_result = new OpenAjax.a11y.WCAG20ResultPrinciple(rps[i]);
      this.result.addPrincipleResult(principle_result);
    
      if (rp && rp.enabled) {

        rgs     = rp.ruleset_guidelines;
        rgs_len = rp.ruleset_guidelines.length;

        for (j = 0; j < rgs_len; j++) {

          rg = rgs[j];
      
          guideline_result = new OpenAjax.a11y.WCAG20ResultGuideline(rgs[j]);
          principle_result.addGuidelineResult(guideline_result);
    
          if (rg && rg.enabled) {

            rscs     = rg.ruleset_success_criteria;
            rscs_len = rg.ruleset_success_criteria.length;
            
            for (k = 0; k < rscs_len; k ++ ) {
            
              rsc = rscs[k];
      
              success_criterion_result = new OpenAjax.a11y.WCAG20ResultSuccessCriterion(rsc);
              guideline_result.addSuccessCriterionResult(success_criterion_result);
              
              this.log.update(PROGRESS.REQUIREMENT, rsc.id, rsc.id);
        
              if (rsc && rsc.enabled) {

                ruleset_rules      = rsc.ruleset_rules;
                ruleset_rules_len  = ruleset_rules.length;
            
                for (l = 0; l < ruleset_rules_len; l ++ ) {
            
                   ruleset_rule = ruleset_rules[l];
                   
                   rule = ruleset_rule.rule;

                   if (rule && ruleset_rule.enabled) {

                     rule_result = new OpenAjax.a11y.ResultRule(ruleset_rule, success_criterion_result); 
           
                     // Check to see if the specialized cache needed for the rule is already 
                     // If not create the specialized cache
                     
                     if (!build_cache ) {
                       up_to_date = this.dom_cache.isUpToDate(rule.cache_dependency);
                       if (up_to_date.exists) {
                         if(!up_to_date.up_to_date) this.dom_cache.updateCache(rule.cache_dependency);
                       } else {
                         this.log.update(PROGRESS.RULE, "Cache " + rule.cache_dependency + " for rule with id=" + rule.rule_id +  " does not exist.");        
                       }
                     } 
                     
                     if (rule.language.length) {
                       if (rule.language.indexOf(OpenAjax.a11y.locale) >= 0) {
                         rule.validate(this.dom_cache, rule_result );
                       }
                       else {
                         this.log.update(PROGRESS.RULE, "Rule with id='" + rule.rule_id + "' does not apply to locale: " + OpenAjax.a11y.locale);                           
                       }
                     }
                     else {
                       // Rules without any language restrictions
                       rule.validate( this.dom_cache, rule_result );
                     }  

                     var rule_title  = rule.getTitle(ruleset_rule.type);
                     
//                     OpenAjax.a11y.console("Validating rule: " + rule.rule_id + "  " + rule_title);

                     this.log.update(PROGRESS.RULE, rule_title, rule.rule_id);
                     
                     if (rule.cache_dependency && this.dom_cache[rule.cache_dependency]) {
                       this.dom_cache[rule.cache_dependency].rule_summary_results.addRuleResult(rule_result);
                     }

                     success_criterion_result.rule_summary_results.addRuleResult(rule_result);
                     guideline_result.rule_summary_results.addRuleResult(rule_result);
                     principle_result.rule_summary_results.addRuleResult(rule_result);
                     this.result.rule_summary_results.addRuleResult(rule_result);
                     
                     switch (rsc.level) {
                     
                     case 'LEVEL_A':
                       this.result.rule_a_summary_results.addRuleResult(rule_result);
                       break;
                     
                     case 'LEVEL_AA':
                       this.result.rule_aa_summary_results.addRuleResult(rule_result);
                       break;
                     
                     case 'LEVEL_AAA':
                       this.result.rule_aaa_summary_results.addRuleResult(rule_result);
                       break;
                       
                     default:
                       break;
                       
                     } // end switch

                   }
                   else {
                     if (rule) 
                       this.log.update(PROGRESS.RULE, " ** Rule with id=" + rule.rule_id + " is disabled");       
                     else
                       this.log.update(PROGRESS.RULE, " ** Rule for success criteria " + rsc.id + " is undefined");                            
                   }

        
                } // end rule loop
              } 
              else {
                this.log.update(PROGRESS.RULE, " ** Success Criterion " + rsc.id + " is disabled");       
              }
            } // end success criteria loop 
          }
          else {
            this.log.update(PROGRESS.RULE, " ** Guideline " + rg.id + " is disabled");       
          }
        } // end guideline loop
      }  
      else {
        this.log.update(PROGRESS.RULE, " ** Principle " + rp.id + " is disabled");       
      }
    } // end principle loop
    
    this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
    return this;
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
/*                       WCAG20RulesetPrinciple                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @param    {Boolean} enabled    - Initial value for the enabled property
 *
 * @property {Boolean} enabled            - If true the rules associated with this principle should be evaluated
 * @property {Array}   ruleset_guidelines - Array of WCAG20RulesetGuideline objects
 */
 
OpenAjax.a11y.WCAG20RulesetPrinciple = function (id, enabled) {
 
   this.id = id;
   
   this.enabled = enabled;
   
   this.ruleset_guidelines = [];

};

/**
 * @method addRulesetGuideline
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetPrinciple
 *
 * @param    {WCAG20RulesetGuideline}  guideline - WCAG 2.0 ruleset guideline object to add
 */
 
OpenAjax.a11y.WCAG20RulesetPrinciple.prototype.addRulesetGuideline = function (guideline) {
 
  this.ruleset_guidelines.push(guideline);
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetGuideline                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @param    {Boolean} enabled    - Initial value for the enabled property
 *
 * @property {Boolean} enabled                   - If true the rules associated with this guideline should be evaluated
 * @property {Array}   ruleset_success_criteria  - Array of WCAG20RulesetSuccessCriteria objects
 */
 
OpenAjax.a11y.WCAG20RulesetGuideline = function (id, enabled) {
 
   this.id = id;
   
   this.enabled = enabled;
   
   this.ruleset_success_criteria = [];

};

/**
 * @method addRulesetSuccessCriterion
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetGuideline
 *
 * @param    {WCAG20RulesetSuccessCriteron}  success_criterion - WCAG 2.0 ruleset success criterion object to add
 */
 
OpenAjax.a11y.WCAG20RulesetGuideline.prototype.addRulesetSuccessCriterion = function (success_criterion) {
 
  this.ruleset_success_criteria.push(success_criterion);
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetSuccessCriterion              */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetSuccessCriterion
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   id       - id of the success criterion
 * @param  {Boolean}  enabled  - Initial value for the enabled property
 *
 * @property {String}   id       - id of the success criterion
 * @property {Boolean}  enabled  - If true the rules associated with this success criterion should be evaluated
 * @property {Array}    rules    - Array of rule objects
 */
 
OpenAjax.a11y.WCAG20RulesetSuccessCriterion = function (id, enabled) {
 
   var wcag20_nls = OpenAjax.a11y.all_wcag20_nls;
 
   this.id  = id;
   
   this.level = wcag20_nls.getNLSItemById(id).level;
   
   this.enabled = enabled;
   this.ruleset_rules = [];

};

/**
 * @method addRulesetRule
 *
 * @memberOf OpenAjax.a11y.WCAG20RulesetSuccessCriterion
 *
 * @param  {WCAG20RulesetRule}  ruleset_rule  
 */
 
OpenAjax.a11y.WCAG20RulesetSuccessCriterion.prototype.addRulesetRule = function (ruleset_rule) {
 
  if (ruleset_rule) {
    this.ruleset_rules.push(ruleset_rule);
  }
 
};

/* ---------------------------------------------------------------- */
/*                       WCAG20RulesetRule                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RulesetRule
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   id        - id of the rule
 * @param  {Number}   severity  - Severity of the rule (NOTE: typically VIOLATION or RECOMMENDATION)
 * @param  {Number}   priority  - Relative priority of this rule compared to other rules for this success criterion
 * @param  {status}   status    - Status of this rule (i.e. accepted, experimential, deprecated)
 * @param  {Boolean}  enabled   - Initial value for the enabled property
 *
 * @param     {String}   rule_id   - id of the rule
 * @property  {Rule}     rule      - Rule object
 * @property  {Number}   severity  - Severity of the rule (NOTE: typically VIOLATION or RECOMMENDATION)
 * @property  {Number}   priority  - Relative priority of this rule compared to other rules for this success criterion
 * @property  {status}   status    - Status of this rule (i.e. accepted, experimential, deprecated)
 * @property  {Boolean}  enabled   - Initial value for the enabled property
 */
 
OpenAjax.a11y.WCAG20RulesetRule = function (id, type, priority, status, enabled) {

   var r = OpenAjax.a11y.all_rules.getRuleByRuleId(id);
   
   this.rule     = null;
   this.rule_id  = id;
   this.type     = type;
   this.prioirty = priority;
   this.status   = status;
   this.enabled  = enabled;

   if (r) 
     this.rule  = r;
   else  
     OpenAjax.a11y.console("  ** Rule with rule id='" + id + "' does not exist!");

};



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
/*                            LogRuleItem                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LogRuleItem 
 *
 * @memberOf OpenAjax.a11y.cache
 * 
 * @desc Constructor to log information about a rule and its execution time
 *
 * @property  {String}  id       - id of the rule
 * @property  {String}  message  - Message related to rule execution time or errors
 * @property  {Number}  time     - time to execute the rule in milleseconds 
 */

OpenAjax.a11y.LogRuleItem = function () {
 this.id = "";
 this.message = "";
 this.time  = 0;   
};

/* ---------------------------------------------------------------- */
/*                        LogRequirementItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor LogRequirementItem 
 *
 * @memberOf OpenAjax.a11y
 * 
 * @desc Constructor to log information about a requirement and its execution time
 *
 * @property  {String}  id       - id of the rule
 * @property  {String}  message  - Message related to rule execution time or errors
 * @property  {Number}  time     - time to execute the rule in milleseconds 
 * @property  {Array}   rules    - List of log rule items associated with the requirement 
 */

OpenAjax.a11y.LogRequirementItem = function () {
 this.id = "";
 this.message = "";
 this.time = 0;
 this.rules = new Array(); 
};

/**
 * @method addLogRule 
 *
 * @memberOf OpenAjax.a11y.LogRequirementItem
 * 
 * @desc Adds a log rule object information to a requirement
 *
 * @param  {LogRuleItem}  rule_item  - Log rule item to add to list of rule items
 */

OpenAjax.a11y.LogRequirementItem.prototype.addLogRule = function ( rule_item ) {

 if ( rule_item ) {
  this.rules.push(rule_item);
 } // endif 

};

/* ---------------------------------------------------------------- */
/*                              Log                                 */
/* ---------------------------------------------------------------- */

/** 
 * @constructor Log 
 *
 * @memberOf OpenAjax.a11y
 * 
 * @desc Constructor for a Log Object that represents the progress 
 *    and stores the execution times of document evaluation
 *
 * @param  {String}  ruleset_id  -  Id of the current ruleset being used for evaluation  
 * @param  {String}  ruleset_name        - ruleset_name of the document being evaluates
 * @param  {Number}  total       - 
 *
 * @param  {Function}  progressCallBackFunction  - Function that is periodically called with progress information
 *
 * @propery  {String}  ruleset_id   -  Id of the ruleset used in the evaluation  
 * @propery  {String}  ruleset_name         -  ruleset_name of the ruleset being evaluated
 *
 * @propery  {Number}  rules_max   - Total number of rules to process
 * @propery  {Number}  rule_count  - Current number of rules processed
 * 
 * @propery  {Number}  cache_time  - Time to process the cache
 * @propery  {Number}  total_time  - Time to process the cache and rules 
 *
 * @propery  {Function}  progressCallBackFunction  - Call back function to provide information to the user on status
 *
 * @propery  {Array}  requirements  -  Array of requirement objects    
 *
 * @propery  {Number}  start_time   - Time the evaluation started         
 * @propery  {Number}  last_time    - Time of last rule         
 * @propery  {Number}  last_requirement_time - Time of last requirement
 *  
 * @propery  {LogRequirementItem}  last_requirement_item 
 */

OpenAjax.a11y.Log = function (ruleset_id, ruleset_name, total, progressCallBackFunction) {

 this.ruleset_id    = ruleset_id;
 this.ruleset_name  = ruleset_name;
 this.rules_max = total;
 this.cache_time  = 0;
 this.total_time  = 0;
 this.progressCallBackFunction = progressCallBackFunction;
 this.requirements = new Array();   
 
 this.start_time = new Date().getTime();
 this.last_time = this.start_time;
   
 this.last_requirement_item = null;
 this.last_requirement_time = this.start_time;
 
 this.rule_count = 0;

};

/** 
 * @method addLogRequirement 
 *
 * @memberOf OpenAjax.a11y.Log
 * 
 * @desc Adds a LogRequirementObject information to the Log
 */

OpenAjax.a11y.Log.prototype.addLogRequirement = function (requirement_item) {
  
 if ( requirement_item ) {
  this.requirements.push(requirement_item);
 } // endif 
  
 };  
  
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a text string representation of a Log object 
 *
 * @return {String} Returns a text string representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toString = function () {
  
 var str ="";
    
 var log_requirements_length = this.requirements.length;
    
 str += "Ruleset ID   : " + this.ruleset_id + "\n";
 str += "Ruleset Name : " + this.ruleset_name + "\n";
 str += "Cache Creation Time : " + this.timeInMillisecondToString(this.cache_time) + "\n";
 str += "Rule Execution Time : " + this.timeInMillisecondToString(this.total_time-this.cache_time) + "\n";
 str += "Total Time          : " + this.timeInMillisecondToString(this.total_time) + "\n";   
    
 for (var i=0; i < log_requirements_length; i++ ) {

  str += "\nRequirement " + this.requirements[i].message + ": " + this.timeInMillisecondToString(this.requirements[i].time) + "\n";
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (var j=0; j <log_rule_length; j++) {
   str += " Rule " + this.requirements[i].rules[j].message + ": " + this.timeInMillisecondToString(this.requirements[i].rules[j].time) + "\n";    
  } // endloop
    
 } // end loop
    
 return str;
};  
  

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a xml representation of a Log object 
 *
 * @return {String} Returns a xml representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toXML = function () {
   
 var i, j;  
 var str = "<!-- All times are in milliseconds -->\n";
 str +="<oaa-log>\n";
    
 var log_requirements_length = this.requirements.length;
    
 str += " <ruleset-id>"   + this.ruleset_id   + "</ruleset-id>\n";
 str += " <ruleset-name>" + this.ruleset_name + "</ruleset-name>\n";
 str += " <cache-time>"   + this.cache_time   + "</cache-time>\n";
 str += " <rule-time>"    + (this.total_time-this.cache_time) + "</rule-time>\n";
 str += " <total-time>"   + this.total_time   + "</total-time>\n";   

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
  

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a json representation of a Log object 
 *
 * @return {String} Returns a json representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toJSON = function () {
      
 var i, j;     
 var str ="{\n";
       
 str += " \"ruleset_id\"     : \"" + this.id              + "\",\n";
 str += " \"ruleset_name\"    : \"" + this.ruleset_name + "\",\n";
 str += " \"cache-time\" : " + this.cache_time          + ",\n";
 str += " \"rule-time\" : " + (this.total_time-this.cache_time) + ",\n";
 str += " \"total-time\" : " + this.total_time          + ",\n";   

 str += " \"requirements\" : [\n";   

 var log_requirements_length = this.requirements.length;

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  { \"requirement_id\"   : \"" + this.requirements[i].id+ "\",\n";
  str += "   \"message\" : \"" + this.requirements[i].message + "\",\n";
  str += "   \"time\"  : " + this.requirements[i].time + ",\n";
     
  var log_rule_length = this.requirements[i].rules.length;

  if (log_rule_length) {
   str += "   \"rules\"  : [\n";   
   for (j=0; j <log_rule_length; j++) {

    str += "    { \"rule_id\"   : \"" + this.requirements[i].rules[j].id + "\",\n";
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

/**
 * @method consoleStatusLog
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Outputs progress information to the Firefox console
 *
 * @param {String}  message  - Message to output to the console 
 * @param {Object}  time     - Object DateTime object of the current time
 */
  
OpenAjax.a11y.Log.prototype.consoleStatusLog = function ( message, time ) {
 
 if (!OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE) return;
  
 if (typeof time == 'number') {
  OpenAjax.a11y.console( message + ": " + this.timeInMillisecondToString(time) + " (" + this.rule_count + " of " + this.rules_max +")");
 }
 else {
  OpenAjax.a11y.console( message );    
 }
}; 

/**
 * @method update
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Calculates execution time and updates progress information
 *
 * @param  {Number}  state    - Numerical value representing the current 
 *                              progress in updating the cache and evaluating rules 
 * @param  {String}  message  - Progress message
 * @param  {String}  rule_id  - id of the current rule being processed
 */
  
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
  this.rule_count++; 
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
  var percent = Math.round((100 * this.rule_count) / this.rules_max);
  var progress_message = message + " (" + this.total_time + " milliseconds)";
  this.progressCallBackFunction(progress_message, percent);
 } 

}; 

/**
 * @method timeInMillisecondToString
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Converts a Number to a string
 *
 * @param {Number}  time  - Current time in milliseconds
 * 
 * @return {String}  Return time in milliseconds
 */

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

  
/*
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


/**
 * @function console
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  Outputs message to the javascript console of Firefox
 * 
 * @param {String} message - Message to send to the console 
 */
OpenAjax.a11y.console = function (message) {
  if (OpenAjax.a11y.CONSOLE_MESSAGES) {
    var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
    console.logStringMessage(message);
  }   
};  
   
// basic info about version of ruleset and rules
OpenAjax.a11y.name = "OpenAjax Alliance Accessibility Tools Task Force";
OpenAjax.a11y.version = "2.0.0";
OpenAjax.a11y.baseUri = "http://www.openajax.org/member/wiki/Accessibility";
    
/*
 * OpenAjax registration information 
 */

if (OpenAjax && OpenAjax.hub) {
  OpenAjax.hub.registerLibrary(this.name, this.baseUri, this.version);
}

/**
 * @object locale
 *
 * @memberOf OpenAjax.a11y
 *
 * @type String
 *
 * @default en-us
 *
 * @desc Current locale messages should use for generating text 
 */

OpenAjax.a11y.locale = "en-us";

/**
 * @object cache_nls
 *
 * @memberOf OpenAjax.a11y
 *
 * @type CacheNLS
 *
 * @desc Object containing data and methods for generating human readable text for cache item properties and values
 */

OpenAjax.a11y.cache_nls = OpenAjax.a11y.cache_nls || new OpenAjax.a11y.CacheNLS();

/**
 * @object all_rules
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Rules
 *
 * @desc Object containing data and methods related to rules
 */

OpenAjax.a11y.all_rules = OpenAjax.a11y.all_rules || new OpenAjax.a11y.Rules();

/**
 * @object all_wcag20_nls
 *
 * @memberOf OpenAjax.a11y
 *
 * @type WCAG20NLS
 *
 * @desc Object containing data and methods related to localized versions of WCAG 2.0 requirements 
 */

OpenAjax.a11y.all_wcag20_nls = OpenAjax.a11y.all_wcag20_nls || new OpenAjax.a11y.WCAG20();

/**
 * @function all_rulsets
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Object
 *
 * @desc Object containing data and methods related to rulesets available for evaluation 
 */

OpenAjax.a11y.all_rulesets   = OpenAjax.a11y.all_rulesets   || new OpenAjax.a11y.Rulesets();

/**
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

/* -------------------------------------------------------------------------------------- */
/* OpenAjax Alliance Cache Properties and Values National Language Support (NLS): English */
/* -------------------------------------------------------------------------------------- */
   

OpenAjax.a11y.cache_nls.addCacheNLSFromJSON('en-us', {

    /*
     * Boolean values 
     */
    boolean_values : {
     true_value  : 'Yes',
     false_value : 'No'
    }, 

    /*
     * The types of ways a rule can be included in a ruleset
     */
    rule_types: ['Undefined', 'Required', 'Recommendation', 'Conditional'],

    /*
     * Relative implementation priorities of complying to rule requirements
     */
    priorities: ['Undefined', 'First Priority', 'Second Priority', 'Third Priority'],

    /*
     * Types of rule references to a requirement
     */
    references: ['Unknown', 'Requirement', 'Coding Technique', 'Manual Evaluation', 'Best Practice', 'Authoring Technique', 'Other'],

    /*
     * Abbreviation for the types of rule references to a requirement
     */
    reference_abbreviations: ['U', 'R', 'C', 'ME', 'BP', 'A', 'O'],

    /*
     * Media constant values
     */
    reference_media_contants: ['Undefined', 'No', 'Maybe', 'Yes'],
    
    missing_label : {
      label : "no label",
      style : "missing_label"
    },  
    
    empty_alt_text : {
      label : "empty alt",
      style : "empty_alt"
    },

    missing_alt : {
      label : "missing alt attribute",
      style : "empty_alt"
    },
    

    /**
     * Severity of not passing a rule for a particular requirement set, like WCAG 2.0
     */
    severities: [{ label       : 'Not Applicable', 
                   abbrev      : 'N/A', 
                   description : 'The rule is not applicable to an element',
                   tooltip     : 'The number of elements to which the rule did not apply'
                  },
                 { label       : 'Pass', 
                   abbrev      : 'P', 
                   description : 'The element passed the rule',
                   tooltip     : 'The number of elements that passed the rule'
                  },
                 { label       : 'Violation', 
                   abbrev      : 'V', 
                   description : 'The element failed the rule and the rule is required',
                   tooltip     : 'The number of elements that failed'
                  },
                 { label       : 'Recommendation', 
                   abbrev      : 'R', 
                   description : 'The element failed the rule and the rule is recommended',
                   tooltip     : 'The number of elements that failed recommended rules'
                  },
                 { label       : 'Manual Check', 
                   abbrev      : 'MC', 
                   description : 'The element requires human inspection and judgement to determine if the requirement has been met',
                   tooltip     : 'The number of elements that require manual checks for determining if requirements were met'
                  },
                 { label       : 'Warning', 
                   abbrev      : 'W', 
                   description : 'A warning indicates the element is used in a coding pattern that may cause accessibiity problems',
                   tooltip     : 'The number of elements in a coding pattern that may cause accessibility problems'
                  },
                 { label       : 'Hidden', 
                   abbrev      : 'H', 
                   description : 'A hidden element was not evaluted for accessibility, since it is invisible to users',
                   tooltip     : 'The number of elements that are hidden from users on the page and therefore not evaluated for accessibility'
                  },
                 { label       : 'Informational', 
                   abbrev      : 'I', 
                   description : 'Element has an informational message useful for accessibility',
                   tooltip     : 'The number of elements with informational messages useful for accessibility'
                  },
                 { label       : 'Not Evaluated', 
                   abbrev      : 'na', 
                   description : 'Element did not meet the criteria of a rule for evaluation',
                   tooltip     : 'Number of elements that did not meet the criteria of rules for evaluation'
                  },
                 { label       : 'none', 
                   abbrev      : 'none', 
                   description : 'No rules applied to this element',
                   tooltip     : 'No rules applied to this element'
                  }
                ],  


    /*
     * Status of a rule for evaluating a requirement
     */
    status: ['Undefined', 'Proposed', 'Accepted', 'Deprecated'],

    cache_properties : {

    /*
     * DOMElement object properties
     */

      'document_order' : {
        label       : 'Order',
        description : 'The ordinal position of the item in the list',
        style       : 'doc_order'
      },
      'tag_name' : {
        label       : 'Tag Name',
        description : 'Tag (or element) name of the item',
        style       : 'element'
      },
      'id' : { 
        label       : 'id',
        description :  'Value of the id attribute'
      },
      'id_unique'   : { 
        label       : 'ID unique',
        description :  'Information about the id attribute value',
        values      : ['Undefined value', 'Not defined', 'Unique', 'Not unique'], 
        style       : ['','','','warning']
      },  
      'character_count' : { 
        label       : 'Text Count',
        description :  'Number of characters in the text content of this tag'
      },
      'class_name'  : { 
        label       : 'class',
        description :  'Value of the HTML class attribute'
      },
      'role'        : { 
        label       : 'role',
        description :  'Can be used to redefine the role of an element into a landmark or widget'
      },
      'alt'         : { 
        label       : 'alt',
        description :  'Value of the HTML alt attribute'
      },
      'alt_for_comparison' : { 
        label       : 'Normlized Alt',
        description : 'Normalized version of the alt text content used for comparison'
      },
      'has_alt_attribute' : { 
        label       : 'Alt Defined',
        description : 'True if the alt attribute was defined in markup'
      },
      'alt_length' : { 
        label       : 'Alt text length',
        description : 'The length of the text in the alt text attribute'
      },
      'title'       : { 
        label       : 'title',
        description : 'Value of the HTML title attribute'
      },
      'aria_describedby' : { 
        label       : 'aria-describedby',
        description : 'aria-describedby can be used to provide additional information about an element to AT users'
      },
      'aria_hidden' : { 
        label       : 'aria-hidden',
        description :  'aria-hidden can be used to hide information from assistive technologies that is visible graphically'
      },
      'aria_label'  : { 
        label       : 'aria-label',
        description :  'aria-label can be used to label form controls and widgets'
      },
      'aria_labelledby' : { 
        label       : 'aria-labelledby',
        description :  'aria-labelledby can be used to label form controls and widgets'
      },
      'xpath'       : { 
        label       : 'XPath',
        description : 'XPath information used for identifying the location of the element in the DOM'
      },
      'has_aria_describedby' : { 
        label       : 'Description',
        description : 'Description defined using the aria-describedby attribute'
      },
      'calculated_aria_description' : { 
        label       : 'Calculated Description',
        description : 'Calculated text content of a description defined using the aria-describedby attribute'
      },
      'for_id'  : { 
        label       : 'for',
        description : 'Value of the for attribute of a label element'
      },
      'parent_landmark_role'  : { 
        label       : 'Parent landmark role',
        description : 'Role of the landmark that contains this content'
      },
      'parent_landmark'  : { 
        label       : 'Containing landmark element',
        description : 'Landmark element that contains this content'
      },


    /*
     * Calculated values based on CSS properties
     */

      'graphical' : {
        label       : 'Graphical Visibility',
        description : 'Can the item be seen visually',
        values      : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      },
      'at' : { 
        label       : 'AT Visibility',
        description : 'Can the item be seen be assitive technologies',
        values : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      }, 
      'is_large_font' : { 
        label       : 'Large Font',
        description : 'Boolean value used in WCAG 2.0 evaluation of color contrast ratio'
      }, 


    /*
     * Run time CSS style properties
     */

      'display'              : {
        label       : 'display',
        description :  'The value of the CSS display property'
      }, 
      'visibility'           : {
        label       : 'visibility',
        description :  'The value of the CSS visibility property'
      },        
      'color'                : {
        label       : 'color',
        description :  'The value of the CSS color property'
      },               
      'background_color' : {
        label       : 'background-color',
        description :  'The value of the CSS background-color property'
      },
      'background_image' : {
        label       : 'background-image',
        description :  'The value of the CSS background-image property'
      },
      'font_family'          : {
        label       : 'font-family',
        description :  'The value of the CSS font-family property'
      },
      'font_size'            : {
        label       : 'font-size',
        description :  'The value of the CSS font-size property'
      },
      'font_weight'          : {
        label       : 'font-weight',
        description :  'The value of the CSS font-weight property'
      },
      'position'             : {
        label       : 'position',
        description :  'The value of the CSS position property'
      },
      'left'                 :  {
        label       : 'left',
        description :  'The value of the CSS left property'
      },
      'top'                  : {
        label       : 'top',
        description :  'The value of the CSS top property'
      },

    /*
     * Abbreviation Cache object properties
     */
      'abbreviation_text' : {
        label       : 'Abbreviation',
        description :  'The text content of an ABBR or ACROYMN element'
      },

    /*
     * Image Cache object attributes
     */
      'source' : {
        label       : 'src',
        description : 'Value of the src attribute'
      },


    /*
     * Control Cache object attributes
     */
      'label_source' : {
        label       : 'Label Type',
        description : 'The technique for defining the label',
        values      : ['unkown', 'none', 'label by reference', 'label encapsulation', 'title attribute', 'value attribute', 'alt attribute', 'button type', 'child text content', 'aria labelledby', 'aria label']
      },     
      'num_main_landmarks' : {
        label       : 'Main landmarks',
        description : 'Number of main landmarks'
      },     
      'num_visible_main_landmarks' : {
        label       : 'Visibile main landmarks',
        description : 'Number of visible main landmarks'
      },     
    /*
     * Link Cache object attributes
     */
      'is_url' : {
        label       : 'is a url',
        description : 'Boolean value indicating if a href contains a URL'
      },
      'is_target' : {
        label       : 'is a target',
        description : 'Boolean value indicating if the link can be a target'
      },
      'link_type' : {
        label       : 'Type of link',
        description : 'Type of link',
        values      : ['empty', 'other', 'internal link', 'link', 'secure link', 'ftp', 'secure ftps', 'file', 'javascript', 'mail to', 'target only']
      },
      'is_broken' : {
        label       : 'Link broken',
        description : 'Tests to see if the link is broken, valid or has an error',
        values      : ['unkown',  'broken', 'vaild', 'not tested', 'error']
      },
      'name_attribute' : {
        label       : 'name',
        description : 'Value of the name attribute'
      },
      'target' : {
        label       : 'target',
        description : 'Value of the target attribute'
      },

    /*
     * Media Cache object properties
     */

      'is_video'  : {
        label       : 'Video',
        description :  'Does the media object contain video',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
        
      },

      'is_audio'  : {
        label       : 'Audio',
        description :  'Does the media object contain audio',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },

      'has_caption'  : {
        label       : 'Caption',
        description :  'Does the media object have captions',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },

      'has_text_alternative' : {
        label       : 'Text Equivalent',
        description :  'Does the media object have a text equivalent',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },
      
      'has_audio_description' : {
        label       : 'Audio Equivalent',
        description :  'Does the media object have a audio equivalent',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },
      
    /*
     * Name Cache object properties
     */

      'name'  : {
        label       : 'Name',
        description : 'Text content of the element'
      },
      'name_for_comparison' : {
        label       : 'Normalized name',
        description : 'Text content of the element normalized for use in comparisons'
      },
      'name_from_text_nodes' : {
        label       : 'Name from text',
        description : 'Text content of the element that comes from text dom nodes'
      },
      'name_from_image_alt' : {
        label       : 'Name from alt',
        description : 'Text content of the element that comes from alt text of images'
      },
      'image_count' : {
        label       : 'Image count',
        description : 'Number of images contained in the element'
      },
      'text_only_from_image' : {
        label       : 'Image only',
        description : 'Does the text content only come from images'
      },

    /*
     * List Cache object properties
     */

      'list_type'  : {
        label       : 'List Type',
        values      : ['Undefined', 'Container element', 'Item element', 'Landmark element'],        
        description : 'Type of list cache element'
      },
      
    /*
     * Table Cache object properties
     */

      'row'                      : {
        label       : 'Row',
        description :  'The row of the cell in a table'
      },
      'column'                   : {
        label       : 'Column',
        description :  'The column of the cell in a table'
      },
      'max_row'                      : {
        label       : 'Rows',
        description :  'Number of rows in a table'
      },
      'max_column'                   : {
        label       : 'Columns',
        description :  'Number of columns in a table'
      },
      'number_of_header_ids' : {
        label       : 'Header ID Num',
        description :  'Number of ids in a headers attribute'
      },              
      'text_content'             : {
        label       : 'Text',
        description :  'Text content of a table cell'
      },              
      'text_normalized'    : {
        label       : 'Text',
        description : 'Text content of a element'
      },              
      'effective_caption'        : {
        label       : 'Effective Caption',
        description : 'Effective caption is the text content of a caption element or ARIA labeling'
      },
      'effective_summary'        : {
        label       : 'Effective Summary',
        description : 'Effective summary is the text content of a summary attribute or an aria-describedby attribute'
      },
      'is_data_table'            : {
        label       : 'Data Table',
        description :  'True if a table has been identified as a data table, otherwise false'
      },
      'is_complex_data_table'            : {
        label       : 'Complex Data Table',
        description :  'True if a table has been identified as a complex data table, otherwise false'
      },
      'first_row_th_count'       : {
        label       : 'Header Count',
        description :  'The number of header cells in the first row or column of a data table'
      },
      'first_row_cell_count' : {
        label       : 'Cell Count',
        description :  'The number of none empty cells in the first row or column of a data table'
      },     
      'scope'               : {
        label       : 'scope',
        description :  'The value of the scope attribute of a table cell'
      },
      'headers'             : {
        label       : 'headers',
        description :  'The value of the headers attribute of a table cell'
      },
      'row_span'            : {
        label       : 'rowspan',
        description :  'The value of the rowspan attribute of a table cell'
      },
      'column_span'         : {
        label       : 'colspan',
        description :  'The value of the colspan attribute of a table cell'
      },
      'nesting_level'         : {
        label       : 'Nesting',
        description :  'The level of nesting of a layout table in other tables that are wider than 1 column and are not data tables'
      },
      'table_type'  : {
        label       : 'Table Type',
        values      : ["Undefined", "Table","Caption","Table Head","Table Body", "Row", "Header Cell", "Data Cell"],        
        description : 'Effective type of table header'
      }
      
    }
  }
);
/*
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
/* OpenAjax Alliance Rules National Language Support (NLS): English */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.all_rules.addRulesNLSFromJSON('en-us', {
    message_severities: {
      MUST : 'must', 
      SHOULD: 'should', 
      MAY: 'may'
    },
    
    missing_message : "The following message id is not defined: ",
    
    caches : {
      'abbreviations_cache'      : 'Abbreviation Rules',
      'color_contrast_cache'     : 'Color Contrast Rules',
      'controls_cache'           : 'Control Rules',
      'headings_landmarks_cache' : 'Headings/Landmark Rules',
      'title_main_cache'         : 'Title/Main Rules',
      'images_cache'             : 'Image Rules',
      'languages_cache'          : 'Language Rules',
      'links_cache'              : 'Link Rules',
      'lists_cache'              : 'List Rules',
      'media_cache'              : 'Media Rules',
      'tables_cache'             : 'Table Rules'
    },
    
    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules: {
        COLOR_1: {
            ID:                  'COLOR 1',
            TITLE:               'Text content %s exceed CCR of 4.5 for any size text or 3.1 for large and/or bolded text',
            PURPOSE:             'Text on the page %s have sufficient contrast for people with low vision to read',
            MESSAGE_PASS:        'The CCR of %1 exceeds the 4.5 for plain text and 3.1 for large text and/or bolded text.',
            MESSAGE_FAIL:        'The CCR of %1 does not exceed CCR of 4.5 for plain text or 3.1 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'The element is not displayed visually.'
        },
        COLOR_2: {
            ID:                  'COLOR 2',
            TITLE:               'Text content exceed CCR of 7.0 for any size text or 4.5 for large and/or bolded text',
            PURPOSE:             'Text on the page %s have sufficient contrast for people with low vision to read',
            MESSAGE_PASS:        'The CCR of %1 exceeds the 7.0 for plain text and 4.5 for large text and/or bolded text.',
            MESSAGE_FAIL:        'The CCR of %1 does not exceed CCR of 7.0 for plain text or 4.5 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'The element is not displayed visually.'
        },
        CONTROL_1: {
            ID:                    'CONTROL 1',
            TITLE:                 'textarea, select and input elements of type text, password, checkbox, radio and file % have an accessible label',
            PURPOSE:               'Labels are used by assistive technologies to provide information on the purpose of the form control to people with disabilities and increases the area on the screen for mouse users interact with the control.',
            MESSAGE_PASS:          '%1 control has label.',
            MESSAGE_LABEL_MISSING: '%1 control is missing a label.',
            MESSAGE_HIDDEN:        '%1 is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_2: {
            ID:                    'CONTROL 2',
            TITLE:                 'Every input type image %s have an alt or title attribute with content',
            PURPOSE:               'The alt attribute on input type image is used by assistive technologies to provide information on the purpose of the form control to people with disabilities.',
            MESSAGE_PASS:          'Image button control has label.',
            MESSAGE_ALT_MISSING:   'Image button control is missing alt text.',
            MESSAGE_HIDDEN:        'Image button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_3: {
            ID:                          'CONTROL 3',
            TITLE:                       'Groups of radio buttons % be contained in fieldset/legend or aria labeling',
            PURPOSE:                     'The fieldset/legend provides a grouping label to help users of assistive technology understand the context of the radio buton labels.',
            MESSAGE_HAS_LEGEND:          'Radio button uses FIELDSET/LEGEND elements for group labeling',
            MESSAGE_HAS_ARIA_LABELLEDBY: 'Radio button uses ARIA-LABELLEDBY for group labeling',
            MESSAGE_HAS_ARIA_LABEL:      'Radio button uses ARIA-LABEL for group labeling',
            MESSAGE_LEGEND_MISSING:      'Radio button is NOT contained in a FIELDSET/LEGEND elements or using ARIA labeling techniques to include group label',
            MESSAGE_HIDDEN:              'Radio button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_4: {
            ID:                  'CONTROL 4',
            TITLE:               'Button elements % have text content and input type button must have a value attribute with content',
            PURPOSE:             'The value attribute of a button element is used by assistive technologies to provide information on the purpose of the form control to people with disabilities.',
            MESSAGE_HAS_CONTENT: 'Button has text content',
            MESSAGE_NO_CONTENT:  'Button has does NOT have text content',
            MESSAGE_HIDDEN:      'Button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_5: {
            ID:                   'CONTROL 5',
            TITLE:                'Textarea, select, input and button elements with id attributes, %s have unique id values on the page',
            PURPOSE:              'Duplicate ids may result in the improper calucation of labels for assistive technologies.',
            MESSAGE_UNIQUE_ID:    'The id \'%1\' is unique on the page',
            MESSAGE_DUPLICATE_ID: 'The id \'%1\' is NOT unique on the page'
        },
        CONTROL_6: {
            ID:                 'CONTROL 6',
            TITLE:              'Label with a "for" attribute reference does not reference a form control',
            PURPOSE:            'This may be an improperly referenced for control, since the for attribute is designed to associate a label with a form control.  ',
            MESSAGE_NO_CONTROL: 'Label reference points to a %1 element, not a form control',
            MESSAGE_NO_ELEMENT: 'Label does NOT reference any element on the page'
        },
        CONTROL_7: {
            ID:                  'CONTROL 7',
            TITLE:               'LABEL element or legend element %s contain content',
            PURPOSE:             'Labels without any content cannot describe the purpose of the associated form control.',
            MESSAGE_NO_CONTENT:  'LABEL element does NOT have any content',
            MESSAGE_HAS_CONTENT: 'LABEL element has content'
        },
        CONTROL_8: {
            ID:                    'CONTROL 8',
            TITLE:                 'Fieldset %s contain exactly one legend element',
            PURPOSE:               'Multiple legend elements contained in the same fieldset may result in the improper calucation of labels for assistive technologies.',
            MESSAGE_NO_LEGEND:     'No LEGEND element found for FIELDSET element',
            MESSAGE_MORE_THAN_ONE: 'More than one LEGEND element found for FIELDSET element',
            MESSAGE_JUST_ONE:      'FIELDSET element has just one LEGEND element'
        },
        CONTROL_9: {
            ID:                          'CONTROL 9',
            TITLE:                       'TITLE attribute %s not be used to label form controls',
            PURPOSE:                     'The title attribute was not designed to be a label for form controls and is often used for other purposes in a web page',
            MESSAGE_USES_TITLE:          'Avoid using TITLE attribute to label form controls',
            MESSAGE_DOES_NOT_USE_TITLE : 'Does not use TITLE attribute to label form controls'
        },
        CONTROL_10: {
            ID:                      'CONTROL 10',
            TITLE:                   'Accessible labels %s be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page',
            PURPOSE:                 'If may be difficult for people using assistive technologies to understand the puropose of form controls when more than one form control share the same label text content.',
            MESSAGE_DUPLICATE_LABEL: 'The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'The label \'%1\' is unique on the page',
            MESSAGE_HIDDEN:          'Form control is hidden from assistive technology, so not tested'
        },
        CONTROL_11: {
            ID:                      'CONTROL 11',
            TITLE:                   'If there is more than one form on page, input element of type submit and reset %s have unique labels using the value attribute',
            PURPOSE:                 'If there is more than form on the page the reset and submit buttons should have unique labels to help users of assistive technology understand which form they are reseting or submitting.',
            MESSAGE_DUPLICATE_LABEL: 'The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'The label is unique on the page',
            MESSAGE_HIDDEN:          'Form control is hidden from assistive technology, so they will not see it'
        },
        HEADING_1: {
            ID:                    'HEADING 1',
            TITLE:                 'Each page should contain at least one H1 element and each H1 element must have content',
            PURPOSE:               'The H1 element can be used to help provide an accessible title for the web page and mark the beginning of the main content.',
            MESSAGE_HAS_H1:        'H1 element is on page and has content',
            MESSAGE_H1_NO_CONTENT: 'H1 element does not have text content',
            MESSAGE_H1_MISSING:    'Page does not have an H1 element',
            MESSAGE_H1_HIDDEN:     'H1 is hidden from assistive technology, so they will not see it'
        },
        HEADING_2: {
            ID:                 'HEADING 2',
            TITLE:              'The text content of headings of the same level that share the same parent heading or landmark role should be unique',
            PURPOSE:            'Headings can describe the content of a section in the document, it is rare that two sections of a document at the same level would have the same content.',
            MESSAGE_UNIQUE:     'Heading is unique',
            MESSAGE_NOT_UNIQUE: 'Heading is not unique'
        },
        HEADING_3: {
            ID:                 'HEADING 3',
            TITLE:              'Heading content %s describe the section or sub section',
            PURPOSE:            'Headings can provide information about a section in a document',
            MESSAGE_CHECK:      'Check to make sure the heading accurately describes the section of the document',
            MESSAGE_HIDDEN:     'Heading is hidden from assistive technology, so they will not see it'
        },
        HEADING_4: {
            ID:                       'HEADING 4',
            TITLE:                    'Headings within landmarks must be properly nested, if there are no MAIN landmarks the headings after the last H1 must be properly nested',
            PURPOSE:                  'The proper nesting of headings provide information on the relationships between sections of content.',
            MESSAGE_PROPER_NESTING:   'Heading is properly nested',
            MESSAGE_IMPROPER_NESTING: 'Heading is not properly nested',
            MESSAGE_HIDDEN:           'Content is hidden from assistive technology, so they will not see it'
        },
        HEADING_5: {
            ID:                 'HEADING 5',
            TITLE:              'A headings %s not be hidden with CSS display=none',
            PURPOSE:            'Authors sometimes use CSS display=none on headings to hide them from visual rendering and not aware that this also hides the heading from assistive technology.',
            MESSAGE_HIDDEN:     'Content is hidden from assistive technology, so they will not see it'
        },
        HEADING_6: {
            ID:                 'HEADING 6',
            TITLE:              'Heading element content %s not only come alt text of images',
            PURPOSE:            'Headings made up of only image content may not have the color contrast needed by people with low vision to read.',
            MESSAGE_HAS_TEXT:   'Heading has text content',
            MESSAGE_ONLY_IMAGE: 'Heading content should NOT come only from images'
        },
        HEADING_7: {
            ID:             'HEADING 7',
            TITLE:          'Headings %s have text content',
            PURPOSE:        'Headings without content cannot provide a description of a section of a web page.',
            MESSAGE_EMPTY:  'Heading has no text content'
        },
        HEADING_8_EN: {
            ID:              'HEADING 8-EN',
            TITLE:           'Headings %s be concise and therefore typically not contain more than 100 characters (English Only)',
            PURPOSE:         '',
            MESSAGE_TO_LONG: 'Heading is %1 characters in length, in general heading should be less %2 characters in length'
        },
        IMAGE_1: {
            ID:                   'IMAGE 1',
            TITLE:                'Each image %s have an alt attribute',
            PURPOSE:              'People who cannot see the images need to have a text equivalent of the image',
            MESSAGE_PASS:         'Image has alt attribute.',
            MESSAGE_ALT_MISSING:  'Alt attribute is missing, image elements not marked as presentational %s be an alt attribute.',
            MESSAGE_PRESENTATION: 'Image has the role=presentation, this indicates the image is purely stylistic or redundent with text content.',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies.'
        },
        IMAGE_2: {
            ID:                   'IMAGE 2',
            TITLE:                'If the longdesc attribute is defined, it %s have valid URI',
            PURPOSE:              'People who are trying to follow the link to get more detialed information about the image will be confused if the link is broke.',
            MESSAGE_PASS:         'Image longdesc "%1" is a valid URI.',
            MESSAGE_FAIL:         'The longdesc reference "%1" %s be a valid url.',
            MESSAGE_PRESENTATION: 'Image has the role=presentation, so the assistive technology user will not have access to longdesc reference.',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies, so they will not have access to the longdesc reference.',
            MESSAGE_NOT_TESTED:   'The testing of URLs is disabled, you must manually test the longdesc url: %1.',
            MESSAGE_ERROR:        'The testing of URLs resulted in an error, you must manually test the longdesc url: %1.',
            MESSAGE_NA:           'Image does not have a longdesc attribute.'
        },
        IMAGE_3: {
            ID:                   'IMAGE 3',        
            TITLE:                'The file name of the image %s not be part of the alt text content',
            PURPOSE:              'The file name in all but a very limited number of situations does not provide any useful information to people who cannot see the image.',
            MESSAGE_NA:           'Image does not use the file name as the alt text',
            MESSAGE_FAIL:         'The file name %1 is being used as the alt text, the alt text $s describe the purpose or content of informative images, or be empty if the image is decorative',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies, so they will not have access to the alt text content.',
            MESSAGE_NO_FILE_NAME: 'Image alt text does not contain file name',
            MESSAGE_NO_ALT:       'Image does not have ALT text'
        },
        IMAGE_4_EN: {
            ID:                   'IMAGE 4-ENGLISH',        
            TITLE:                'Alt text %s be no more than 100 characters long.',
            PURPOSE:              'Since alt text is often rendered through speech it should be as succinct as possible.',
            MESSAGE_PASS:         'The alt text of %1 characters is shorter than the maximum %2 characters.',
            MESSAGE_ALT_TO_LONG:  'The alt text is %1 characters, the length %s NOT exceed %2 characters.  If an image needs a longer description use the longdesc attribute or other technique to provide a linger description.',
            MESSAGE_NA :          'Image is hidden, marked as presentation or the alt attribute is missing or empty.'
        },
        IMAGE_4_FR: {
            ID:                   'IMAGE 4-FRENCH',        
            TITLE:                'ALT text  %s be no more than 120 characters long.',
            PURPOSE:              'Since alt text is often rendered through speech it should be as succinct as possible.',
            MESSAGE_PASS:         'The alt text of %1 characters is shorter than the maximum %2 characters.',
            MESSAGE_ALT_TO_LONG:  'The alt text is %1 characters, the length %s NOT exceed %2 characters.  If an image needs a longer description use the longdesc attribute or other technique to provide a linger description.',
            MESSAGE_NA :          'Image is hidden, marked as presentation or the alt attribute is missing or empty.'
        },
        IMAGE_5: {
            ID:                    'IMAGE 5',
            TITLE:                 'If an image has a height or width of 1 pixel or its alt text set to empty, the image %s set its role attribute to "presentation" or the image %s be removed and CSS %s should be used for positioning.',
            PURPOSE:               'Small image are usually used for styling and should be marked with role=presentation to make sure assistive technologies ignore them',
            MESSAGE_NA:            'Image is missing an alt attribute, is hidden or has its role set to presentation.',
            MESSAGE_ALT_NOT_EMPTY: 'Images that are only 1 pixel high or wide must set it\'s alt text to empty.',
            MESSAGE_PASS:          'Image is more than 1 pixel high or wide, hidden, or already has its alt text set to empty.'
        },
        IMAGE_6: {
            ID:                   'IMAGE 6',
            TITLE:                'If the alt is empty or role is set presentation verify the image is used just for styling or decoration',
            PURPOSE:              'Images used for styling and decoration should be marked with role=presentation to make sure assistive technologies ignore them, if they have important content they should have descriptive alt text',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies.',
            MESSAGE_NA:           'Image has alt text content ',
            MESSAGE_VERIFY:       'Since the image has no alt attribute, empty alt text, or role is set to presentation, verify the image is purely used for styling or decoration.'
        },
        LANDMARK_1: {
            ID:             'LANDMARK 1',
            TITLE:          'Pages %s have main landmark',
            PURPOSE:        'The main landmark provides an easy way for users of assistive technology to get to the main content of the web page and know where the main content begins and ends.',            
            MESSAGE_PASS:   'The page has %1 main landmarks',
            MESSAGE_FAIL:   'The page has no main landmarks',
            MESSAGE_HIDDEN: 'The page has %1 hidden main landmarks, hidden landmarks cannot be used by people with assistive technologies.'
        },
        LANDMARK_2: {
            ID:             'LANDMARK 2',
            TITLE:          'All visible content %s be contained within a landmark',
            PURPOSE:        'Landmarks provide an easy way for users of assistive technology to navigate and identify all of the sections of information on a web page.',            
            MESSAGE_PASS:   'The \'%1\' element with rendered content is in a %2 landmark',
            MESSAGE_FAIL:   'The \'%1\' element with rendered content is not contained in a landmark',
            MESSAGE_HIDDEN: 'The \'%1\' element with content is hidden, if the element can made visible (i.e. through scripting) it would not be in a landmark.'
        },
        LANDMARK_3: {
            ID:             'LANDMARK 3',
            TITLE:          'If there are two or more landmarks of the same type, they %s have unique labels',
            PURPOSE:        'When there are two or more landmarks of the same type labels make it possible for people using assistive technology to identify the differences between the landmarks.',            
            MESSAGE_PASS_ONLY_ONE:  'There is only one %1 landmark in the page',
            MESSAGE_PASS_UNIQUE:    'The "%1" label is unique for the %2 landmarks',
            MESSAGE_FAIL_NO_LABEL:  'The %2 landmark does not have a label, when there are more than one of the same type of landmark on the page the landmark needs a label',
            MESSAGE_FAIL_DUPLICATE: 'The "%1" label is NOT unique for the %2 landmarks',
            MESSAGE_HIDDEN: 'The %1 landmark is hidden, if the landmark content became visible the label would NOT be unique.'
        },
        LANDMARK_4: {
            ID:                'LANDMARK 4',
            TITLE:             'Each landmark labels %s describe the content in the landark',
            PURPOSE:           'Landmark labels make it easier for people using assistive technologies to understand the content of a landmark',
            MESSAGE_HAS_LABEL: 'Make sure the \'%1\' label described the content of the %2 landmark',
            MESSAGE_NO_LABEL:  'The %1 landmark does not have a label, make sure the landmark role is appropriate to the content in the landmark and consider adding a descriptive label to provide more detail on the contents of the landark.'
        },
        LINK_1: {
            ID:               'LINK 1',
            TITLE:            'Link %s provide minimum target dimensions.',
            PURPOSE:          'Small links can be hard for people with physical disabilites to click on and for people with visual imapirments to see.',
            MESSAGE_PASS:     'The link dimensions of %1 pixels high and %2 pixels wide are larger than the minimum height of %3 pixels and width of %4 pixels.',
            MESSAGE_TO_SMALL: 'The link dimensions of %1 pixels high and %2 pixels wide do meet the minimum height of %3 pixels and width of %4 pixels requirements.',
            MESSAGE_MANUAL:   'The link dimensions could not be calculated.',
            MESSAGE_HIDDEN:   'The link is hidden from the graphical rendering.',
            MESSAGE_NA:       'The link has no HREF content, so it is either an internal target or may have behaviors defined by javascript.'
        },
        LINK_2: {
            ID:              'LINK 2',
            TITLE:           'Links with the same HREF %s have the same link text.',
            PURPOSE:         'Conistency of link naming makes interaction with web pages more predictable.',
            MESSAGE_PASS:    '%1 links with same URL and use the same link text.',
            MESSAGE_FAIL:    '%1 links with the same URL do not have the same link text.',
            MESSAGE_MANUAL:  'It could not be determined if the HREF of this link is shared by other links on the page',
            MESSAGE_NA:      'This link does not share the same URL with any other links on the page.'
        },

        LINK_3: {
            ID:              'LINK 3',
            TITLE:           'Links with different HREFs %s have unique accessible names.',
            PURPOSE:         'Links with the same name but go to different places can be confusing to people with disabilities.',
            MESSAGE_PASS:    '%1 links with the same accessible link name have the same HREF.',
            MESSAGE_FAIL:    '%1 links with the same accessible link name have different HREFs.',
            MESSAGE_MANUAL:  'It could not be determined if the accessible link name is shared with any other links on the page.',
            MESSAGE_NA:      'This link does not share the same accessible link name with any other links on the page or the link role has been overridden.'
        },
        LIST_1: {
            ID:                       'LIST 1',
            TITLE:                    'A list of navigational links %s be contained within an element with role=navigation.',
            PURPOSE:                  'Role navigation provides makes it easy for users of asssitive technology to find the navigation links on a web page.',
            MESSAGE_HAS_ROLE_NAV:     'The parent element of this %1 has role=navigation.',
            MESSAGE_MISSING_ROLE_NAV: 'The parent element of this %1 does not have role=navigation.',
            MESSAGE_ROLE_NAV_ON_LIST: 'This %1 element should not have role=navigation; it should be placed on its parent element instead.'
        },
        MEDIA_1: {
            ID:             'MEDIA 1',
            TITLE:          'Pre-recorded audio %s have text based alternatives',
            PURPOSE:        '',
            MESSAGE_PASS:   'Text based alternative is available for pre-recorded audio',
            MESSAGE_MAYBE:  'If %1 element is prerecorded audio, verify that a text based alternative to the audio is available',
            MESSAGE_FAIL:   'Text based alternative is NOT available for pre-recorded audio',
            MESSAGE_HIDDEN: '%1 element is hidden from the visual rendering'
        },
        MEDIA_2: {
            ID:                 'MEDIA 2',
            TITLE:              'Pre-recorded video %s have either text based alternative or audio description',
            PURPOSE:            '',
            MESSAGE_PASS_TEXT:  'Text based alternative is available for pre-recorded video',
            MESSAGE_PASS_AUDIO: 'Audio description is available for pre-recorded video',
            MESSAGE_PASS_BOTH:  'Both an audio description and text based description is available for pre-recorded video',
            MESSAGE_MAYBE:      'If %1 element is prerecorded video, verify that a text based alternative or audio description is available for the video',
            MESSAGE_FAIL:       'Text based alternative or audio description is NOT available for pre-recorded video',
            MESSAGE_HIDDEN:     '%1 element is hidden from the visual rendering'
        },
        TABLE_1: {
            ID:                      'TABLE 1',
            TITLE:                   'Data tables %s have header cells in the first row and/or column.',
            PURPOSE:                 'Header cells provide critical context for meaning of the content in data cells to people using speech, since they cannot see the visual relationships.',
            MESSAGE_PASS_ROW:        'The first row contains %1 header cells.',
            MESSAGE_PASS_COLUMN:     'The first column contains %1 header cells.',
            MESSAGE_PASS_BOTH:       'The first row contains %1 header cells and the first column contains %2 header cells.',
            MESSAGE_VIOLATION:       'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table must have all th elements or td elements with scope attribute in the first row and/or first column with content.',
            MESSAGE_RECOMMENDATION:  'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table should have all th elements or td elements with scope attribute  in the first row and/or first column with content.',
            MESSAGE_MANUAL:          'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table may need th elements or td elements with scope attribute cells in the first row and/or first column with content.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, rule does not apply.'
        },
        TABLE_2T: {
            ID:                      'TABLE 2T',
            TITLE:                   'Each data table %s have a effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Data table has the caption element or a summary attribute of "%1".',
            MESSAGE_FAIL:            'Data table is missing a caption element and summary attribute with text content, the page %s have either a caption element or a summary attribute with text content.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have a caption element.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2S: {
            ID:                      'TABLE 2S',
            TITLE:                   'If there is only one data table on a page, it %s have an effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table.',
            MESSAGE_PASS:            'Data table has the effective caption: "%1".',
            MESSAGE_FAIL:            'The effective caption is missing or is empty, a data table %s have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have an effective caption.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2M: {
            ID:                      'TABLE 2M',
            TITLE:                   'If there is more than one data table, each data table %s have an effective caption with content.',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Table has an effective caption: "%1"',
            MESSAGE_FAIL:            'Since there is more than one data table, the table %s have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_ONLY_ONE:        'There is only one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_3: {
            ID:                       'TABLE 3',
            TITLE:                    'The effective caption content and effective summary content of each data table %s not be the same',
            PURPOSE:                  'It is important to provide an unique effective captions to more easily disern a table from other tables on the page.',
            MESSAGE_UNIQUE:           'The effective caption "%1" is unique from the effective summary "%2".',
            MESSAGE_NOT_UNIQUE:       'The effective caption "%1" is the same as the effective summary "%2", the effective caption should be used to describe the purpose of the table and the effective summary information about the data in the table or conclusions the author intended to be understood from viewing the data.',
            MESSAGE_HIDDEN:           'Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_MISSING:          'Either or both of the effective caption or effective summary are either not defined or are empty, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:   'Table is not a data table, rule does not apply.'
        },
        TABLE_4: {
            ID:                     'TABLE 4',
            TITLE:                  'Each data table header cell %s use th elements rather than td element with a scope attribute',
            PURPOSE:                'Using the TH element is a much clearer way of identifying header cells than using the TD element with the SCOPE attribute.',
            MESSAGE_IS_TH:          'Heading cell is a th element.',
            MESSAGE_VIOLATION:      'Heading cell is NOT a th element, all headings must use th element.',
            MESSAGE_RECOMMENDATION: 'Heading cell is NOT a th element, all headings should use th element.',
            MESSAGE_HIDDEN:         'Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE: 'Table is not a data table, rule does not apply.'
        },
        TABLE_5: {
            ID:                      'TABLE 5',
            TITLE:                   'Each data tables %s have an effective summary',
            PURPOSE:                 'It is important to provide a description of the content or point of the data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:            'Table has an effective caption: "%1"',
            MESSAGE_VIOLATION:       'The effective caption is missing or empty, the table must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:  'The effective caption is missing or empty, the table should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:          'The effective caption is missing or empty, the table may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MORE_THAN_ONE:   'There is more than one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_6: {
            ID:                                'TABLE 6',
            TITLE:                             'Each complex data table %s have ids on all header cells.',
            PURPOSE:                           'Complex data tables require much more specific definition of header cells for each data cell and using IDs on the header cells is required for identifying the header cells.',
            MESSAGE_PASS:                      'Table header cell has unique ID',
            MESSAGE_NO_CONTENT:                'Table header cell does not contain content, it is unsual for a header cell to not have content.',
            MESSAGE_NOT_UNIQUE_VIOLATION:      'Table header cell has duplicate ID: "%1\", header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'Table header cell has duplicate ID: "%1\", header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'Table header cell has duplicate ID: "%1\", header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'Table header cell is missing an ID attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'Table header cell is missing an ID attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'Table header cell is missing an ID attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS:                'All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     '%1 header cells of %2 header cells in the table have missing or dulicate ID values.',
            MESSAGE_TABLE_DATA_TABLE:          'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:        'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:              'The table is hidden from people using assistive technologies.'
        },
        TABLE_7: {
            ID:                             'TABLE 7',
            TITLE:                          'Each td element in a complex data table with content, %s have a headers attribute with a list of valid ids',
            PURPOSE:                        'Complex data tables require much more specific definition of header cells for each data cell and using the HEADERS attribute on each data cell is required for identifying the header cells.',
            MESSAGE_HAS_HEADERS:            'Cell has headers attribute with values.',
            MESSAGE_MISSING_VIOLATION:      'Headers attribute is missing or empty, data cells in complex data tables must have a headers attribute.',
            MESSAGE_MISSING_RECOMMENDATION: 'Headers attribute is missing or empty, data cells in complex data tables should have a headers attribute.',
            MESSAGE_MISSING_MANUAL:         'Headers attribute is missing or empty, data cells in complex data tables may need a headers attribute',
            MESSAGE_DATA_CELL_IS_EMPTY:     'Table cell is empty, check to see if it needs headers, or if the empty cell could contain data',
            MESSAGE_HEADER_CELL:            'Cell is a header cell, so rule was not evaluated',
            MESSAGE_TABLE_PASS:             'All %1 data cells with content have headers.',
            MESSAGE_TABLE_MISSING_HEADERS:  '%1 data cells with content out of %2 are missing headers.',
            MESSAGE_TABLE_DATA_TABLE:       'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:     'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:           'The table is hidden from people using assistive technologies.'
        },
        TABLE_8: {
            ID:                             'TABLE 8',
            TITLE:                          'Each complex data table %s have an effective summary.',
            PURPOSE:                        'It is critical to provide a description of the content or point of the data in a complex data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:                   'Complex data table has the effective summary "%1"',
            MESSAGE_VIOLATION:              'Complex data tables must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:         'Complex data tables should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:                 'Complex data tables may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_HIDDEN:                 'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_COMPLEX_DATA_TABLE: 'The table is not complex data table, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:         'The table is a layout table, so rule was not evaluated.'
        },
        LAYOUT_1: {
            ID:                       'LAYOUT 1',
            TITLE:                    'Tables used for layout that are more than one column wide, %s not be nested in other layout tables.',
            PURPOSE:                  'The nesting of layout tables often results in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS_NOT_NESTED:  'Layout table is not nested in another table',
            MESSAGE_PASS_ONE_COLUMN:  'Layout table is only one column wide',
            MESSAGE_VIOLATION:        'Layout table is %1 columns wide, and nested %2 level(s), nested data tables must only be one column wide.',
            MESSAGE_RECOMMENDATION:   'Layout table is %1 columns wide, and nested %2 level(s), nested data tables should only be one column wide.',
            MESSAGE_MANUAL:           'Layout table is %1 columns wide, and nested %2 level(s), nested data tables may need to only be one column wide.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_2: {
            ID:                       'LAYOUT 2',
            TITLE:                    'If a table is a layout table that is more than 1 column wide, the content needs to be meaningful when table markup is ignored.',
            PURPOSE:                  '',
            PURPOSE:                  'The use of layout tables can result in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS:             'The layout table is only one column wide.',
            MESSAGE_VIOLATION:        'The page content must be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_RECOMMENDATION:   'The page content should be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_3: {
            ID:                       'LAYOUT 3',
            TITLE:                    'If the table is a layout table, the rule test the table element and all of its children for role="presentation"',
            PURPOSE:                  'The use of role=presentation on table markup makes it easier for people using assistive technology to ignore the table markup.',
            MESSAGE_PASS:             'The %1 element has role="presentation".',
            MESSAGE_VIOLATION:        'The %1 element must use the attribute role="presentation".',
            MESSAGE_RECOMMENDATION:   'The %1 element should use the attribute role="presentation".',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        TITLE_1: {
            ID:                'TITLE 1',
            TITLE:             'Document %s have a title element with content.',
            PURPOSE:           'The title is important to help people understand the type of content or purpose of a web page.',
            MESSAGE_HAS_TITLE: 'Document has a TITLE element with content.',
            MESSAGE_NO_TITLE:  'Document TITLE element is missing or empty.'
        },
        TITLE_2: {
            ID:                      'TITLE 2',
            TITLE:                   'If a page contains both MAIN landmarks and H1 elements, each H1 element %s be a label for a MAIN landmark.',
            PURPOSE:                 'H1 can provide a redundent navigational marker for the start of main content, and orient users to the section of the page.',
            MESSAGE_H1_IS_NOT_LABEL: 'H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_H1_IS_LABEL:     'H1 element is a label for a MAIN landmark.',
            MESSAGE_NO_ROLE_MAIN:    'No MAIN landmarks on the page, rule for H1 elements does not apply.',
            MESSAGE_HIDDEN:          'H1 element is hidden from assistive technology, so will not be seen.'
        },    
        TITLE_3: {
            ID:                   'TITLE 3',
            TITLE:                'If there are both H1 elements and MAIN landmarks the H1 elements %s only be used as labels for MAIN landmarks',
            PURPOSE:              'Using H1s as labels for main landmarks assures that users will receive consistent information about the content of each main section.',
            MESSAGE_H1_IS_LABEL:  'The H1 element is a label for a MAIN landmark.',
            MESSAGE_H1_NOT_LABEL: 'The H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_HIDDEN:       'The H1 element is hidden to assistive technologies.'
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
/* OpenAjax Alliance WCAG 2.0 National Language Support (NLS): English         */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.all_wcag20_nls.addNLS('en-us', {
  abbreviation : 'WCAG 2.0',
  title        : 'Web Content Accessibility Guidelines 2.0',
  url          : 'http://www.w3c.org/TR/WCAG20',
  
  levels : {
    '1' : 'Level A',
    '2' : 'Level AA',
    '3' : 'Level AAA'  
  },
  
  principles : {
    //
    // Principle 1: Perceivable
    //
    '1' : {
      title       : 'Principle 1: Perceivable',
      description : 'Information and user interface components must be presentable to users in ways they can perceive.', 
      url         : 'http://www.w3.org/TR/WCAG20/#perceivable',
      guidelines : {
        //
        // Guideline 1.1 Text Alternatives
        //
        '1.1' : {
          title       : 'Guideline 1.1 Text Alternatives',
          description : 'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.', 
          url         : 'http://www.w3.org/TR/WCAG20/#text-equiv',
          success_criteria : {
            //
            // Success Criterion 1.1.1 Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below. 
            //
            '1.1.1' : {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.1.1 Non-text Content',
              description : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
              url         : 'http://www.w3.org/TR/WCAG20/#text-equiv',
              references  : []
            }
          }
        },  
        //
        // Guideline 1.2 Time-based Media
        //
        '1.2' : {
          title       : 'Guideline 1.2 Time-based Media',
          description : 'Provide alternatives for time-based media.', 
          url         : 'http://www.w3.org/TR/WCAG20/#media-equiv',
          success_criteria : {
            //
            // Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded)
            //
            '1.2.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.1 Audio-only and Video-only (Prerecorded)',
              description : 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
              references  : []
            },
            //
            // Success Criterion 1.2.2 Captions (Prerecorded)
            //
           '1.2.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.2 Captions (Prerecorded)',
              description : 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
              references  : []
            },
            //
            // Success Criteria 1.2.3 Audio Description or Media Alternative (Prerecorded)
            //
            '1.2.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.3 Audio Description or Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
              references  : []
            },
            //
            // Success Criteria 1.2.4 Captions (Live)
            //
            '1.2.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.4 Captions (Live)',
              description : 'Captions are provided for all live audio content in synchronized media. ',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
              references  : []
            },
            //
            // Success Criteria 1.2.5 Audio Description (Prerecorded)
            //
            '1.2.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.5 Audio Description (Prerecorded)',
              description : 'Audio description is provided for all prerecorded video content in synchronized media.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
              references  : []
            },
            //
            // Success Criteria 1.2.6 Sign Language (Prerecorded)
            //
            '1.2.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.6 Sign Language (Prerecorded)',
              description : 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
              references  : []
            },
            //
            // Success Criteria 1.2.7 Extended Audio Description (Prerecorded)
            //
            '1.2.7': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.7 Extended Audio Description (Prerecorded)',
              description : 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
              references  : []
            },
            //
            // Success Criteria 1.2.8 Media Alternative (Prerecorded)
            //
            '1.2.8': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.8 Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
              references  : []
            },
            //
            // Success Criteria 1.2.9 Audio-only (Live)
            //
            '1.2.9': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.9 Audio-only (Live)',
              description : 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
              url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
              references  : []
            }
          }
        },
        //
        // Guideline 1.3 Adaptable
        //
        '1.3' : {
          title       : 'Guideline 1.3 Adaptable',
          description : 'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.', 
          url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation',
          success_criteria : {
            //
            // Success Criteria 1.3.1 Info and Relationships
            //
            '1.3.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.1 Info and Relationships',
              description : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
              url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
              references  : []
            },
            //
            // Success Criteria 1.3.2 Meaningful Sequence
            //
            '1.3.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.2 Meaningful Sequence',
              description : 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
              url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
              references  : []
            },
            //
            // Success Criteria 1.3.3 Sensory Characteristics
            //
            '1.3.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.3 Sensory Characteristics',
              description : 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
              url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
              references  : []
            }
          }
        },
        //
        // Guideline 1.4 Distinguishable
        //
        '1.4' : {
          title       : 'Guideline 1.4 Distinguishable',
          description : 'Make it easier for users to see and hear content including separating foreground from background.', 
          url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast',
          success_criteria : {
            //
            // Success Criteria 1.4.1 Use of Color
            //
            '1.4.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.4.1 Use of Color',
              description : 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
              references  : []
            },
            //
            // Success Criteria 1.4.2 Audio Control
            //
            '1.4.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.4.2 Audio Control',
              description : 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
              references  : []
            },
            //
            // Success Criteria 1.4.3 Contrast (Minimum)
            //
            '1.4.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.4.3 Contrast (Minimum)',
              description : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
              references  : []
            },
            //
            // Success Criteria 1.4.4 Resize text
            //
            '1.4.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.4.4 Resize text',
              description : 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
              references  : []
            },
            //
            // Success Criteria 1.4.5 Images of Text
            //
            '1.4.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.5 Images of Text',
              description : 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
              references  : []
            },
            //
            // Success Criteria 1.4.6 Contrast (Enhanced)
            //
            '1.4.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.6 Contrast (Enhanced)',
              description : 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
              references  : []
            },
            //
            // Success Criteria 1.4.7 Low or No Background Audio
            //
            '1.4.7': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.7 Low or No Background Audio',
              description : 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
              url         : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
              references  : []
            },
            //
            // Success Criteria 1.4.8 Visual Presentation
            //
            '1.4.8': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.8 Visual Presentation',
              description : 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
              references  : []
            },
            //
            // Success Criteria 1.4.9 Images of Text (No Exception)
            //
            '1.4.9': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.9 Images of Text (No Exception)',
              description : 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
              url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
              references  : []
            }
          }
        }
      }
    },  
    //
    // Principle 2: Operable
    //
    '2' : {
      title       : 'Principle 2: Operable',
      description : 'User interface components and navigation must be operable.', 
      url         : 'http://www.w3.org/TR/WCAG20/#operable',
      guidelines : {
        //
        // Guideline 2.1 Keyboard Accessible
        //
        '2.1' : {
          title       : 'Guideline 2.1 Keyboard Accessible',
          description : 'Make all functionality available from a keyboard.', 
          url         : 'http://www.w3.org/TR/WCAG20/#keyboard-operation',
          success_criteria : {
            //
            // Success Criterion 2.1.1 Keyboard
            //
            '2.1.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.1.1 Keyboard',
              description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
              references  : []
            },
            //
            // Success Criterion 2.1.2 No Keyboard Trap
            //
            '2.1.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.1.2 No Keyboard Trap',
              description : 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
              references  : []
            },
            //
            // Success Criterion 2.1.3 Keyboard (No Exception)
            //
            '2.1.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.1.3 Keyboard (No Exception)',
              description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
              references  : []
            }
          }
        },
        //
        // Guideline 2.2 Enough Time
        //
        '2.2' : {
          title       : 'Guideline 2.2 Enough Time',
          description : 'Provide users enough time to read and use content.', 
          url         : 'http://www.w3.org/TR/WCAG20/#time-limits',
          success_criteria : {
            //
            // Success Criterion 2.2.1 Timing Adjustable
            //
            '2.2.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.2.1 Timing Adjustable',
              description : 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
              references  : []
            },
            //
            // Success Criteria 2.2.2 Pause, Stop, Hide
            //
            '2.2.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.2.2 Pause, Stop, Hide',
              description : 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
              references  : []
            },
            //
            // Success Criteria 2.2.3 No Timing
            //
            '2.2.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.2.3 No Timing',
              description : 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
              references  : []
            },
            //
            // Success Criteria 2.2.4 Interruptions
            //
            '2.2.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.2.4 Interruptions',
              description : 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
              references  : []
            },
            //
            // Success Criteria 2.2.5 Re-authenticating
            //
            '2.2.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.2.5 Re-authenticating',
              description : 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
              references  : []
            }          
          }
        },
        //
        // Guideline 2.3 Seizures
        //
        '2.3' : {
          title       : 'Guideline 2.3 Seizures',
          description : 'Do not design content in a way that is known to cause seizures.', 
          url         : 'http://www.w3.org/TR/WCAG20/#seizure',
          success_criteria : {
            //
            // Success Criteria 2.3.1 Three Flashes or Below Threshold
            //
            '2.3.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.3.1 Three Flashes or Below Threshold',
              description : 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
              references  : []
            },
            //
            // Success Criteria 2.3.2 Three Flashes
            //
            '2.3.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.3.2 Three Flashes',
              description : 'Web pages do not contain anything that flashes more than three times in any one second period.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
              references  : []
            }
          }
        },
        //
        // Guideline 2.4 Navigable
        //
        '2.4' : {
          title       : 'Guideline 2.4 Navigable',
          description : 'Provide ways to help users navigate, find content, and determine where they are.', 
          url         : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms',
          success_criteria : {
            //
            // Success Criteria 2.4.1 Bypass Blocks
            //
            '2.4.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.4.1 Bypass Blocks',
              description : 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
              references  : []
            },
            //
            // Success Criteria 2.4.2 Page Titled
            //
            '2.4.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.4.2 Page Titled',
              description : 'Web pages have titles that describe topic or purpose.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
              references  : []
            },
            //
            // Success Criteria 2.4.3 Focus Order
            //
            '2.4.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.4.3 Focus Order',
              description : 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
              references  : []
            },
            //
            // Success Criteria 2.4.4 Link Purpose (In Context)
            //
            '2.4.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '2.4.4 Link Purpose (In Context)',
              description : 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
              references  : []
            },
            //
            // Success Criteria 2.4.5 Multiple Ways
            //
            '2.4.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '2.4.5 Multiple Ways',
              description : 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
              references  : []
            },
            //
            // Success Criteria 2.4.6 Headings and Labels
            //
            '2.4.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '2.4.6 Headings and Labels',
              description : 'Headings and labels describe topic or purpose.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
              references  : []
            },
            //
            // Success Criteria 2.4.7 Focus Visible
            //
            '2.4.7': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '2.4.7 Focus Visible',
              description : 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
              url         : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
              references  : []
            },
            //
            // Success Criteria 2.4.8 Location
            //
            '2.4.8': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.4.8 Location',
              description : 'Information about the user\'s location within a set of Web pages is available.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
              references  : []
            },
            //
            // Success Criteria 2.4.9 Link Purpose (Link Only)
            //
            '2.4.9': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.4.9 Link Purpose (Link Only)',
              description : 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
              references  : []
            },
            //
            // Success Criteria 2.4.10 Section Headings
            //
            '2.4.10': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '2.4.10 Section Headings',
              description : 'Section headings are used to organize the content.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
              references  : []
            }
          }
        }
      }
    },  
    //
    // Principle 3: Understandable
    //
    '3' : {
      title       : 'Principle 3: Understandable',
      description : 'Information and the operation of user interface must be understandable.', 
      url         : 'http://www.w3.org/TR/WCAG20/#understandable',
      guidelines : {
        //
        // Guideline 3.1 Readable
        //
        '3.1' : {
          title       : 'Guideline 3.1 Readable',
          description : 'Make text content readable and understandable.', 
          url         : 'http://www.w3.org/TR/WCAG20/#meaning',
          success_criteria : {
            //
            // Success Criteria 3..1.1 Language of Page
            //
            '3.1.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.1 Language of Page',
              description : 'The default human language  of each Web page  can be programmatically determined. ',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
              references  : []
            },
            //
            // Success Criteria 3..1.2 Language of Parts
            //
            '3.1.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.2 Language of Parts',
              description : 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
              references  : []
            },
            //
            // Success Criteria 3..1.3 Unusual Words
            //
            '3.1.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.3 Unusual Words',
              description : 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
              references  : []
            },
            //
            // Success Criteria 3..1.4 Abbreviations
            //
            '3.1.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.4 Abbreviations',
              description : 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
              references  : []
            },
            //
            // Success Criteria 3..1.5 Reading Level
            //
            '3.1.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.5 Reading Level',
              description : 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
              references  : []
            },
            //
            // Success Criteria 3..1.6 Pronunciation
            //
            '3.1.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.1.6 Pronunciation',
              description : 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
              references  : []
            }
          }
        },
        //
        // Guideline 3.2 Predictable
        //
        '3.2' : {
          title       : 'Guideline 3.2 Predictable',
          description : 'Make Web pages appear and operate in predictable ways.', 
          url         : 'http://www.w3.org/TR/WCAG20/#consistent-behavior',
          success_criteria : {
            //
            // Success Criteria 3..2.1 On Focus
            //
            '3.2.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.2.1 On Focus',
              description : 'When any component receives focus, it does not initiate a change of context.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
              references  : []
            },
            //
            // Success Criteria 3..2.2 On Input
            //
            '3.2.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.2.2 On Input',
              description : 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
              references  : []
            },
            //
            // Success Criteria 3..2.3 Consistent Navigation
            //
            '3.2.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.2.3 Consistent Navigation',
              description : 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
              references  : []
            },
            //
            // Success Criteria 3..2.4 Consistent Identification
            //
            '3.2.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.2.4 Consistent Identification',
              description : 'Components that have the same functionality within a set of Web pages are identified consistently.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
              references  : []
            },
            //
            // Success Criteria 3..2.5 Change on Request
            //
            '3.2.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.2.5 Change on Request',
              description : 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
              references  : []
            }
          }
        },
        //
        // Guideline 3.3 Input Assistance
        //
        '3.3' : {
          title       : 'Guideline 3.3 Input Assistance',
          description : 'Help users avoid and correct mistakes.', 
          url         : 'http://www.w3.org/TR/WCAG20/#minimize-error',
          success_criteria : {
            //
            // Success Criteria 3..3.1 Error Identification
            //
            '3.3.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.1 Error Identification',
              description : 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
              references  : []
            },
            //
            // Success Criteria 3..3.2 Labels or Instructions
            //
            '3.3.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.2 Labels or Instructions',
              description : 'Labels or instructions are provided when content requires user input.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
              references  : []
            },
            //
            // Success Criteria 3..3.3 Error Suggestion
            //
            '3.3.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.3 Error Suggestion',
              description : 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
              references  : []
            }, 
            //
            // Success Criteria 3..3.4 Error Prevention (Legal, Financial, Data)
            //
            '3.3.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.4 Error Prevention (Legal, Financial, Data)',
              description : 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
              references  : []
            },
            //
            // Success Criteria 3..3.5 Help
            //
            '3.3.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.5 Help',
              description : 'Context-sensitive help is available.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
              references  : []
            },
            //
            // Success Criteria 3..3.6 Error Prevention (All)
            //
            '3.3.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '3.3.6 Error Prevention (All)',
              description : 'For Web pages that require the user to submit information, at least one of the following is true',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
              references  : []
            }
          }
        }
      }
    },  
    //
    // Principle 4: Robust
    //
    '4' : {
      title       : 'Principle 4: Robust',
      description : 'Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.', 
      url         : 'http://www.w3.org/TR/WCAG20/#robust',
      guidelines : {
        //
        // Guideline 4.1 Compatible
        //
        '4.1' : {
          title       : 'Guideline 4.1 Compatible',
          description : 'Maximize compatibility with current and future user agents, including assistive technologies.', 
          url         : 'http://www.w3.org/TR/WCAG20/#ensure-compat',
          success_criteria : {
            //
            // Success Criteria 4.2.1 Parsing Content
            //
            '4.1.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '4.1.1 Parsing Content',
              description : 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
              references  : []
            },
            //
            // Success Criteria 4.2.2 Name, Role, Value
            //
            '4.1.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '4.1.2 Name, Role, Value',
              description : 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
              url         : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
              references  : []
            }
          }
        }  
      }
    }
  }
});
//
// OpenAjax Alliance Rules 
// Rule group: Styling Rules
//
OpenAjax.a11y.all_rules.addRulesFromJSON([
      
 // ------------------------
 // Color 1: Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
 
 {
   id                : 'COLOR_1', 
   last_updated      : '2011-07-11', 
   cache_dependency  : 'color_contrast_cache',
   cache_properties : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT  = 3.1;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_text_nodes_len;
      var dtn;

      var severity;
      var message_id;
      var args = [];
     
      for (i=0; i<color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];

        // if color contrast raio is undefined, skip this item
        if (!cci.color_contrast_ratio) continue;

        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_CHECK;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.FAIL;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_CHECK;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_text_nodes_len = cci.dom_text_nodes.length;

        for (j=0; j<dom_text_nodes_len; j++) {
          dtn = cci.dom_text_nodes[j];
          if (dtn.computed_style.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, dtn, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, dtn, 'MESSAGE_HIDDEN', []);
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
   id                : 'COLOR_2', 
   last_updated      : '2011-07-11', 
   cache_dependency  : 'color_contrast_cache',
   cache_properties  : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_text_nodes_len;
      var dtn;

      var severity;
      var message_id;
      var args = [];

     
      for (i = 0; i < color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];
        
        // if color contrast raio is undefined, skip this item
        if (!cci.color_contrast_ratio) continue;
   
        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_CHECK;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.FAIL;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_CHECK;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_text_nodes_len = cci.dom_text_nodes.length;

        for (j=0; j<dom_text_nodes_len; j++) {
          dtn = cci.dom_text_nodes[j];
          if (dtn.computed_style.is_visible_onscreen === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, dtn, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, dtn, 'MESSAGE_HIDDEN', []);
          }
        } // end loop
   
      } // end loop    
    }
  }

 ]); 


    

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object CONTROL_1
 * 
 * @desc textarea, select and input elements of type text, 
 *       password, checkbox, radio and file must have an 
 *       accessible label
 * 
 */
	     
{  id                : 'CONTROL_1', 
   last_updated      : '2011-09-16', 
   cache_dependency  : 'controls_cache',
   cache_properties : ['tag_name', 'label_source','label'],
   language          : "",
   enabled           : true,  
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var ce;
     var tag_name;
     var control_type;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         control_type = control_elements[i].control_type;
         
         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT) {
             type = control_elements[i].type;         
         }
         else {
           type = ce.dom_element.tag_name;
         }

         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {
             
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
        
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LABEL_MISSING', [type.toUpperCase()]);     
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
 * @object CONTROL_2
 * 
 * @desc Every input type image must have an alt or title attribute with content
 */
	     
{  id                : 'CONTROL_2', 
   last_updated      : '2011-09-16', 
   cache_dependency  : 'controls_cache',
   cache_properties : [],
   language          : "",
   validate          : function (dom_cache, rule_result) {
  
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
      
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_ALT_MISSING', [type.toUpperCase()]);     
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
 * @object CONTROL_3
 *
 * @desc Groups of radio buttons should be contained in fieldset/legend
 */
{ id                : 'CONTROL_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
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
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
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
                   rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LEGEND_MISSING', []);
                 }
               }  
               else {
                 if (de.aria_label && de.aria_label.length) {
                   rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_ARIA_LABEL', []);     
                 }
                 else {
                   rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LEGEND_MISSING', []);
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
 * @object CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 */
{ id                : 'CONTROL_4', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
      
           if (ce.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_CONTENT', []);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_NO_CONTENT', []);     
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
 * @object CONTROL_5
 *
 * @desc Textarea, select, input and button elements with id attributes, must have unique id values on the page
 */
{ id                : 'CONTROL_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
          rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_DUPLICATE_ID', [de.id]);
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
 * @object CONTROL_6
 * 
 * @desc Label with a for attribute reference does not reference a form control
 */
{ id                : 'CONTROL_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
 * @object CONTROL_7
 *
 * @desc Label or legend element should contain content 
 */
 
{ id                : 'CONTROL_7', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
          rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_NO_CONTENT', []);
        }
        else {
          rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_CONTENT', []);        
        }
     
      } // end loop
    } 
  } // end validate function
},


/** 
 * @object CONTROL 8
 *
 * @desc Fieldset should contain exactly one legend element 
 */
 
{ id                : 'CONTROL_8', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
          rule_result.addResult(SEVERITY.FAIL, fe, 'MESSAGE_NO_LEGEND', []);        
        }
        else {
          if (fe.legend_count > 1) {
            rule_result.addResult(SEVERITY.FAIL, fe, 'MESSAGE_MORE_THAN_ONE', []);        
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
 * @object CONTROL_9
 *
 * @desc Fieldset should contain exactly one legend element 
 */
 
{ id                : 'CONTROL_9', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
        
        if (ce.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (ce.label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
            rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_USES_TITLE', []);        
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
 * @object CONTROL_10
 * 
 * @desc Accessible labels must be unique for every textarea, 
 *       select and input element of type text, password, radio, 
 *       and checkbox on a page
 */
 
{ id                : 'CONTROL_10', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : ['tag_name', 'type', 'label'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
     
        if (ce.dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE) { 
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
          rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_DUPLICATE_LABEL', [ce.label]);                
        }
        else {
          rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_LABEL_UNIQUE', [ce.label]);        
        }
      }
      
    } 
  } // end validate function
},

/**
 * @object CONTROL_11
 * 
 * @desc If there is more than one form on page, input element of type 
 *       submit and reset must have unique labels in each form using the value attribute
 * 
 */
 
{ id                : 'CONTROL_11', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object HEADING_1
 *
 * @desc Each page should contain at least one H1 element and each H1 element must have content
 *
 */	     	     	     
 {
  id                : 'HEADING_1', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'title_main_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;

      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_H1_HIDDEN', []);                      
          }
          else {
            if (me.dom_element.tag_name == 'h1') {
              if (me.name && me.name_length > 0) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_H1', []);
                h1_count++;
              }
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NO_CONTENT', []);
              }
            }
          }  
        }
      }

     // Test if no h1s
     if (h1_count === 0) {
        te = dom_cache.title_main_cache.main_elements[0];
        // Use title if defined to mark failure
        if (te) {
          rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_H1_MISSING', []);
        } 
        else {
          rule_result.addResult(SEVERITY.FAIL, null, 'MESSAGE_H1_MISSING', []);
        }
     }
  } // end validate function
 }, 
 
/**
 * @object HEADING_2
 *
 * @desc The text content of headings of the same level that share the same parent heading or landmark role should be unique. 
 *
 */	     	     	     
 {
  id              : 'HEADING_2', 
  last_updated     : '2011-09-16', 
  cache_dependency : 'headings_landmarks_cache',
  cache_properties : ['tag_name', 'name', 'name_length', 'name_for_comparison'],
  language        : "",
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
             if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) heading_list.push(he);
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
          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (he.unique) {          
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_UNIQUE', []);            
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_NOT_UNIQUE', []);            
            }
          }
        } // end loop
      }
      
  } // end validate function
 }, 
/**
 * @object HEADING_3
 *
 * @desc Heading content should describe the section or sub section 
 *
 */	     	     	     
 {
  id                : 'HEADING_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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
          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(SEVERITY.MANUAL_CHECK, he, 'MESSAGE_CHECK', []);            
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
        }
      }



  } // end validate function
 },

/**
 * @object HEADING_4
 *
 * @desc Headings must be properly nested 
 *
 */
 {
  id                : 'HEADING_4', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      function getNextVisibleHeading() {
        var he;
      
        while (i < heading_elements_len) {
          he = heading_elements[i];
          i++;
          if (he.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
            return he;
          }  
          rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
        }
        return null;
      }

      function checkHeadings() {
      
        var he_last = getNextVisibleHeading();
        var he      = getNextVisibleHeading();    
        
        if (he_last === null || he === null) return;

        while ((he.level <= he_last.level) || 
               (he.level === (he_last.level+1))) {
                
          rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_PROPER_NESTING', []);            
                    
          he_last = he;
          he      = getNextVisibleHeading();           
          if (he === null) return;          
        }      
        
        while (he.level > (he_last.level+1)) {
          rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_IMPROPER_NESTING', []);                      
          he      = getNextVisibleHeading(); 
          if (he === null) return;
        }
                
        checkHeadings();              
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i = 0;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements_len > 1) {
        checkHeadings();
      }

  } // end validate function
 },
 
/**
 * @object HEADING_5
 *
 * @desc Every navigation and complementary landmark should use an H2 element as its label 
 *
 */	     	     	     
 {
  id                : 'HEADING_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'role', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
  } // end validate function
 },
 
/**
 * @object HEADING_6
 *
 * @desc The text content of a heading should not only come from the alt attribute value of img elements. 
 *
 */	     	     	     
 {
  id                : 'HEADING_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'only_image', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

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

          if (he.dom_element.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE && he.dom_element.only_image) {
            rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_ONLY_IMAGE', []);
          }
          else {
            rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_HAS_TEXT', []);          
          }

        } // end loop
      }
  } // end validate function
 },
 
/**
 * @object HEADING_7
 *
 * @desc Heading elements should contain content
 *
 */	     	     	     
 {
  id                : 'HEADING_7', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var de;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];
          de = he.dom_element;

          if ((de.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE ) && 
              ( !he.name || he.name_length === 0 )) {
            rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_EMPTY', []);
          }            
        } // end loop
      }
  } // end validate function
 },

/**
 * @object HEADING_8_EN
 *
 * @desc Headings should be concise and therefore typically not contain more than 100 characters (English Only) 
 */	     	     	     
 {
  id                : 'HEADING_8_EN', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language          : "en-us en-br",
  validate          : function (dom_cache, rule_result) {

      var MAX_HEADING_LENGTH = 100;

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i;
      var he;
      var de;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i = 0; i < heading_elements_len; i++) {
          he = heading_elements[i];
          de = he.dom_element;
          
          if (de.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE  && he.name) {
            if (he.name_length > MAX_HEADING_LENGTH ) {
              rule_result.addResult(SEVERITY.MANUAL_CHECK, he, 'MESSAGE_TO_LONG', [he.name_length, MAX_HEADING_LENGTH]);
            }  
          }            
        } // end loop
      }      
  } // end validate function
 },
/**
 * @object LANDMARK_1
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_1', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'title_main_cache',
  cache_properties  : ['num_main_landmarks', 'num_visibile_main_landmarks'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var title_main_cache  = dom_cache.title_main_cache;
      var main_elements     = title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      var body_element      = title_main_cache.body_element;

      var i;
      var me;
      var cs;
      
      body_element.num_main_landmarks = 0;
      body_element.num_visible_main_landmarks = 0;
      
      // check to make sure the main elements are visible
      
      if (title_main_cache.has_role_main_elements) {
        for (i = 0; i < main_elements_len; i++) {
        
          me = main_elements[i];
          cs = me.computed_style;
          if (me.main_type == OpenAjax.a11y.MAIN.ROLE_MAIN) {
            body_element.num_main_landmarks += 1;
            if (cs.is_visible_to_at == VISIBILITY.VISIBLE) body_element.num_visible_main_landmarks += 1;
          }
        }  
        
        if (has_visible_main) {
          rule_result.addResult(SEVERITY.PASS, body_element, 'MESSAGE_PASS', [body_element.num_visible_main_landmarks]);        
        }
        else {
          rule_result.addResult(SEVERITY.FAIL, body_element, 'MESSAGE_HIDDEN', [body_element.num_main_landmarks]);
        }              
      }
      else {
        rule_result.addResult(SEVERITY.FAIL, body_element, 'MESSAGE_FAIL', []);
      }

  } // end validate function
 },
/**
 * @object LANDMARK_2
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_2', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'text_normalized', 'parent_landmark_role'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var elements_with_content     = dom_cache.headings_landmarks_cache.elements_with_content;
      var elements_with_content_len = elements_with_content.length;

      var i;
      var de;
      var cs;
      var lm;
      var elem;
      
      // check to make sure the main elements are visible
      
      for (i = 0; i < elements_with_content_len; i++) {
        
        de = elements_with_content[i];
        cs = de.computed_style;
          
        if (de.type == NODE_TYPE.ELEMENT) elem = de.tag_name;
        else elem = de.parent_element.tag_name;
          
        if (de.parent_landmark) {
          lm = de.parent_landmark.dom_element.role; 
          rule_result.addResult(SEVERITY.PASS, de, 'MESSAGE_PASS', [elem, lm]);                
        }
        else {
          if (cs.is_visible_to_at == VISIBILITY.VISIBLE) {
            rule_result.addResult(SEVERITY.FAIL, de, 'MESSAGE_FAIL', [elem]);                          
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', [elem]);                                      
          }
        }
      }    
      
  } // end validate function
 },
/**
 * @object LANDMARK_3
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_3', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['role', 'label', 'label_source'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      function checkLandmarkLabels(landmark_role) {

        var i;
        var j;
        var le;
        
        var landmark_role_list     = [];
        var landmark_role_list_len = 0;
        
        var label_list       = [];        
        var label_list_len   = 0;
        var label_list_len_2 = 0; 

        var duplicate_labels     = [];
        var duplicate_labels_len = 0;
 
        function addToDuplicateLabelList(label) {
          var add_flag = true;
          var i;
          
          for (i = 0; i < duplicate_labels_len; i++) {
            if (duplicate_labels[i] == label) {
              add_flag = false;
              break;
            }
          }
          
          if (add_flag) { 
            duplicate_labels.push(label);
            duplicate_labels_len += 1;
          }  
        }  // end of

        function checkUniqueness(landmark_element) {
          var dup_flag = false;
          var i;

          if (landmark_element.label.length) {
             for (i = 0; i < duplicate_labels.length; i++) {
               if (landmark_element.label == duplicate_labels[i]) {
                 dup_flag = true;
                 break;
               }
             }
             if (dup_flag) {
               rule_result.addResult(SEVERITY.FAIL, landmark_element, 'MESSAGE_FAIL_DUPLICATE', [landmark_element.label, landmark_role]);
             }
             else {
               rule_result.addResult(SEVERITY.PASS, landmark_element, 'MESSAGE_PASS_UNIQUE', [landmark_element.label, landmark_role]);                                                            
             }             
          }
          else {
            rule_result.addResult(SEVERITY.FAIL, landmark_element, 'MESSAGE_FAIL_NO_LABEL', [landmark_role]);                                                  
          }
        
        }
        
        for (i = 0; i < landmark_elements_len; i++) {
          le = landmark_elements[i];
          if (le.dom_element.role == landmark_role) {
            landmark_role_list.push(le);
            if (le.label.length) label_list.push(le.label); 
          }  
        }

        // if no elements with role return
        if (!landmark_role_list.length) return;
      
        label_list_len = label_list.length;
        label_list_len_2 = label_list_len - 1;
      
        for (i = 0; i < label_list_len_2; i++) {
          for(j = i+1; j < label_list_len; j++) {
            if (label_list[i] == label_list[j]) {
              addToDuplicateLabelList(label_list[i]);
            }  
          }
        }  
        
        landmark_role_list_len = landmark_role_list.length;
        
        if (landmark_role_list_len > 1) {
          for (i = 0; i < landmark_role_list_len; i++) {
            le = landmark_role_list[i];          
            checkUniqueness(le);
          }
        }
        else {
          rule_result.addResult(SEVERITY.PASS, landmark_role_list[0], 'MESSAGE_PASS_ONLY_ONE', [landmark_role]);                                      
        }
        
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      
      checkLandmarkLabels('navigation');
      checkLandmarkLabels('main');
      checkLandmarkLabels('region');
      checkLandmarkLabels('banner');
      checkLandmarkLabels('complementary');
      checkLandmarkLabels('contentinfo');
      checkLandmarkLabels('form');

      
  } // end validate function
 },
/**
 * @object LANDMARK_4
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_4', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['role', 'label', 'label_source'],
  language          : "",
  validate          : function (dom_cache, rule_result) {


      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      var i;
      var le;

      for (i = 0; i < landmark_elements_len; i++) {
        le = landmark_elements[i];
        if (le.label.length) {
          rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_HAS_LABEL', [le.label, le.dom_element.role]);                                              
        }
        else {
          rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_NO_LABEL', [le.dom_element.role]);                                                      
        }
      
      }
      
  } // end validate function
 }
 ]); 


    

/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object IMAGE_1
 *
 * @desc Images must have alt attribute
 */
 
{ id                : 'IMAGE_1', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
 
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
        }
        else {      
          if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
            if (de.has_alt_attribute) {
              rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', []);     
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_MISSING', []);     
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
 * @object IMAGE_2
 *
 * @desc If the longdesc attribute is defined, it must have valid URI
 */
{ id                : 'IMAGE_2', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties : ['longdesc', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY  = OpenAjax.a11y.SEVERITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var i;
    var ie = null;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;
        
        if (ie.longdesc) {
          if (de.hasAttrWithValue('role', 'presentation')) {     
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
          }
          else {      
            if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
            
              switch (ie.longdesc_is_broken) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.longdesc]);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_FAIL', [ie.longdesc]);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_NOT_TESTED', [ie.longdesc]);     
                break;
         
              default:
                rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_ERROR', [ie.longdesc]);
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
 * @object IMAGE_3
 *
 * @desc The file name of the image should not be part of the alt text content (it must have an image file extension)
 */
{ id                : 'IMAGE_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties : ['has_alt_attribute', 'alt', 'file_name', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
    var SEVERITY = OpenAjax.a11y.SEVERITY;
  
    var i;
    var ie;
    var de;
    var pos;
    var file_name;
   
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;
        
        if (ie.source && 
            de.has_alt_attribute && 
            ie.alt_length) {
                  
            if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
              // make sure it has a file extension, will assume extension is for an image
              if (ie.file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(file_name) >= 0 ) {
                  rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_FAIL', [file_name]);                 
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
 * @object IMAGE_4_EN (English)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (English only)
 */
{ id                : 'IMAGE_4_EN', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "en-us en-br",
  validate          : function (dom_cache, rule_result) {
      
    var MAX_ALT_TEXT_LENGTH = 100;

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
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
 * @object IMAGE_4_FR (French)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (French only)
 */
{ id                : 'IMAGE_4_FR', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "fr",
  validate          : function (dom_cache, rule_result) {
      
    var SEVERITY = OpenAjax.a11y.SEVERITY;   
    var MAX_ALT_TEXT_LENGTH = 120;
    
    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
    
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
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
 * @object IMAGE_5
 *
 * @desc If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position
 */
{ id                : 'IMAGE_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'height', 'width', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;

        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if ((ie.height == 1 || ie.width == 1) && ie.alt_length > 0 ) {
            rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_NOT_EMPTY', []);     
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
 * @object IMAGE_6
 *
 * @desc If the alt is empty or role is set presentation verify the image is purely decorative
 */
{ id                : 'IMAGE_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
    
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;

        if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          if (ie.alt_length === 0 || de.role == 'presentation') {     
            rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_VERIFY', []);
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
/*            OpenAjax Alliance Link Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object LINK_1 
 * 
 * @desc Links should have minimum dimensions for selecting and reading
 */
 
{ id                : 'LINK_1', 
  last_updated      : '2011-07-11', 
  cache_dependency  : 'links_cache',
  cache_properties : ['height', 'width', 'graphical'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

   var SEVERITY   = OpenAjax.a11y.SEVERITY;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

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
     
     if (computed_style.is_visible_onscreen == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
      if (link_element.href && link_element.href.length) {       
       
       if (link_element.height && 
         link_element.width) {
       
        if ((link_element.height > MIN_HEIGHT) && 
          (link_element.width > MIN_WIDTH)) {
          rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, link_element, 'MESSAGE_PASS', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
        else {
         rule_result.addResult(SEVERITY.FAIL, link_element, 'MESSAGE_TO_SMALL', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
       }
       else {
         rule_result.addResult(rule_result.MANUAL_CHECK, link_element, 'MESSAGE_MANUAL', []);
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
 * @object LINK_2
 *
 * @desc Links with the same HREF should have the same link text.
 */
	     
{
  id                : 'LINK_2', 
  last_updated      : '2011-07-11', 
  cache_dependency  : 'links_cache',
  cache_properties : ['name', 'href'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dh;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_href_items     = dom_cache.links_cache.duplicate_href_items;
      var duplicate_href_items_len = duplicate_href_items.length;
      
      var all_share_same_name;

      for (i = 0; i < duplicate_href_items_len; i++) {
        dh = duplicate_href_items[i];
        
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
            rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop
   
  } // end validate function
 },

/**
 * @object LINK_3
 *
 * @desc Links with the different HREFs should have the unique link text.
 */ 
	     
 {
  id                : 'LINK_3', 
  last_updated      : '2011-07-11', 
  groupCode         : 'GROUP_11',
  cache_dependency  : 'links_cache',
  cache_properties : ['name', 'href'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dn;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_name_items     = dom_cache.links_cache.duplicate_name_items;
      var duplicate_name_items_len = duplicate_name_items.length;
      
      var all_share_same_href;

      for (i = 0; i < duplicate_name_items_len; i++) {
        dn = duplicate_name_items[i];
        
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
            rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop

  } // end validate function
 }
]); 


    

/**
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
/*            OpenAjax Alliance List Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object LIST_1 
 * 
 * @desc A list of navigational links should be contained within an element with role=navigation.
 *          Thus any ul or ol element that contains at least a specified minimum of li elements with
 *          one and only one link is considered a list of links and must have role=navigation.
 */
 
  {
    id                : 'LIST_1',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate        : function (dom_cache, rule_result) {

      var MINIMUM_LI_ELEMENTS = 3; // to be considered a list of links
      var SEVERITY = OpenAjax.a11y.SEVERITY;
      var container_elements = dom_cache.lists_cache.container_elements;

      var i; // loop counter
      var max = container_elements.length; // loop control
      var le; // loop placeholder

      for (i = 0; i < max; i++) {
        le = container_elements[i];

        if (le.isListOfLinks(MINIMUM_LI_ELEMENTS)) {
          if (le.dom_element.hasAttrWithValue('role', 'navigation')) {
            rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_ROLE_NAV_ON_LIST',
                                    [le.dom_element.tag_name]);
          }
          else {
            if (le.dom_element.parent && le.dom_element.parent.hasAttrWithValue('role', 'navigation')) {
              rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_ROLE_NAV', [le.dom_element.tag_name]);
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_MISSING_ROLE_NAV',
                                      [le.dom_element.tag_name]);
            }
          }
        }
      } // end loop
    } // end validate function
  }
]);
/**
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
/*            OpenAjax Alliance Media Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object MEDIA_1
 *
 * @desc Pre-recorded audio must have text alternative
 */ 
 
  {
    id                : 'MEDIA_1',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

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

        if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        
          if (me.is_audio === MEDIA.YES || me.is_audio === MEDIA.MAYBE) {
            if (me.has_text_alternative === MEDIA.YES) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {          
              if (me.is_audio === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_FAIL', []);
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
 * @object MEDIA_2
 *
 * @desc Pre-recorded video must have audio descriptions
 */ 
  {
    id                : 'MEDIA_2',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

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

        if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        
          if (me.is_video === MEDIA.YES || me.is_video === MEDIA.MAYBE) {
          
            if (me.has_text_alternative) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {
              if (me.is_video === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_FAIL', []);
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
/**
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
/*      OpenAjax Alliance Table Rules                               */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/** 
 * @object TABLE_1
 * 
 * @desc If a table is a data table, the rule tests if each table cell in the first column is 
 *       either a TH element or TD element with scope value of 'col' and/or each row contains at 
 *       at least one TH element or a TD with scope value of 'row'
 */
 { id                : 'TABLE_1', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'first_row_th_count', 'first_row_cell_count'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var te;
     var info_row;
     var info_column;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table) {
     
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
      
             info_row = te.headerCellsInFirstRow(); 
             
             te.first_row_th_count   = info_row.th_count;
             te.first_row_cell_count = info_row.total;

             info_column = te.headerCellsInFirstColumn(); 

             te.first_column_th_count   = info_column.th_count;
             te.first_column_cell_count = info_column.total;

             if (info_row.th_count == info_row.total && info_column.th_count == info_column.total) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_BOTH', [info_row.total, info_column.total]);     
             }
             else {
               if (info_row.th_count == info_row.total) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_ROW', [info_row.total]);     
               }
               else {               
                 if (info_column.th_count == info_column.total) {
                   rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_COLUMN', [info_column.total]);     
                 }
                 else {
                   rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', [info_row.th_count, info_row.total, info_column.th_count, info_column.total]);
                 }  
               }  
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
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
 * @object TABLE_2T 
 *
 * @desc Tests if a table has either an effective caption or an effective summary with content.
 */
 { id                : 'TABLE_2T', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY           = OpenAjax.a11y.SEVERITY;
     var i;   
     var te;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if ((te.effective_caption && te.effective_caption.length > 0) ||
                 (te.effective_summary && te.effective_summary.length > 0)) {
               if (te.effective_caption && te.effective_caption.length > 0) {    
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);     
               }
               else {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);                    
               }
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', []);
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
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
 * @object TABLE_2S 
 *
 * @desc  If there is only one data table on a page, the rule tests the table for an effective caption.
 */
 { id                : 'TABLE_2S', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'effective_caption'],
   language          : "",
   enabled           : true,
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY           = OpenAjax.a11y.SEVERITY;
     
     var i;   
     var te;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.effective_caption && te.effective_caption.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_FAIL', []);
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
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
 * @object TABLE_2M
 *
 * @desc   If there is more than one data table on a page, the rule tests the table for an effective caption.
 */
 { id                : 'TABLE_2M', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'effective_caption'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i;   
     var te;
     var tc;

     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var data_table_count = 0;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
         if (te.is_complex_data_table && te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) data_table_count++;
       } // loop
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (data_table_count <= 1 ) {
               rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_ONLY_ONE', []);         
             }
             else {
               if (te.effective_caption && te.effective_caption.length > 0) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);
               } 
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_FAIL', []);
               }
             }  
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);
         } 
       }
     }    
  } // end validation function
},

/**
 * @object TABLE_3
 *
 * @desc  Tests when a table has both and effective caption and effective summary that the two are unique 
 */
 
 { id                : 'TABLE_3', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['effective_caption', 'effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

	 var i;   
     var te;
     var tc;
     var ec;
     var es;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
      
         if (te.is_data_table) {
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
           
             if ((te.effective_summary && te.effective_summary.length > 0) && 
                 (te.effective_caption && te.effective_caption.length > 0)) {
              
               if (te.effective_summary_for_comparison != te.effective_caption_for_comparison) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_UNIQUE', [te.effective_caption, te.effective_summary]);     
               }
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_NOT_UNIQUE', [te.effective_caption, te.effective_summary]);     
               }
             }
             else {
               rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
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
 * @object TABLE_4
 *
 * @desc    Tests if table headers use TH elements instead of TD with SCOPE
 */
 
 { id                : 'TABLE_4', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['scope'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkDataTableForUseOfTHElement(table_elements) {
       var j;
       var tce;
       var max = table_elements.length;
       
       for (j = 0; j < max; j++) {
         tce = table_elements[j];
         
         // do not recurse nested tables
         if (tce.table_type === TABLE.TABLE_ELEMENT) return;
         
         if (tce.table_type === TABLE.TH_ELEMENT) {
           
           if (tce.dom_element.tag_name == 'th') {
             rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_IS_TH', []);                            
           }
           else {
             rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_VIOLATION', []);              
           }
         } 
         
         if (tce.child_cache_elements && tce.child_cache_elements.length) checkDataTableForUseOfTHElement(tce.child_cache_elements);          
         
       } // end loop    
         
     } // end function
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
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
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
             checkDataTableForUseOfTHElement(te.child_cache_elements);            
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
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
 * @object TABLE_5
 *
 * @desc   The rule tests the table for an effective summary.
 */
 { id                : 'TABLE_5', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
   
     var data_table_count = 0;
       
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (te.effective_summary && te.effective_summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);
             } 
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', []);
             }  
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);
         } 
       }
     }    
  } // end validation function
},


/**
 * @object TABLE_6
 *
 * @desc    Each TH element with content in a complex table 
 *          must have an id attribute, whose id value must be unique 
 *          on the page
 */
 { id                : 'TABLE_6', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['id'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkComplexDataTableHeadingsForUniqueIds(table_element) {

       function testHeaderCellForUniqueId(table_elements) {
         var j;
         var tce;
         var max = table_elements.length;
       
         for (j = 0; j < max; j++) {
           tce = table_elements[j];

           // do not traverse nested tables
           if (tce.table_type === TABLE.TABLE_ELEMENT) checkComplexDataTableHeadingsForUniqueIds(tce);  

           switch (tce.table_type) {
         
           case TABLE.TH_ELEMENT:
         
             total++;
         
             if (!tce.text_content) tce.text_content = tce.dom_element.getText().normalizeSpace();               
           
               if (tce.text_content.length !== 0) {                 
                 
                 if (tce.dom_element.id_unique === ID.NOT_UNIQUE) {
                   rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_NOT_UNIQUE_VIOLATION', [tce.dom_element.id]);              
                   count++;
                 }
                 else {
                   if (tce.dom_element.id_unique === ID.NOT_DEFINED) {
                     rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_NO_ID_VIOLATION', []);              
                     count++;
                   }
                   else {
                     rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_PASS', []);    
                   }                     
                 }
               }
               else {
                 rule_result.addResult(SEVERITY.MANUAL_CHECK, tce, 'MESSAGE_NO_CONTENT', []);    
               }
             break;

           case TABLE.TD_ELEMENT:
             rule_result.addResult(SEVERITY.NA, tce, 'MESSAGE_DATA_CELL', []);                                        
             break;
           
           default:
             break;

           } // end switch  
         
           if (tce.child_cache_elements && tce.child_cache_elements.length) testHeaderCellForUniqueId(tce.child_cache_elements);         
       
         } // end loop
     
       } // end function


       var count = 0;
       var total = 0;

       if (table_element.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (table_element.is_complex_data_table) { 

           testHeaderCellForUniqueId(table_element.child_cache_elements);

           if (count === 0) {      
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PASS', [total]);                
           }
           else {
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PROBLEM_IDS', [count, total]);                
           }
         }
         else {
           if (table_element.is_data_table) {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_SIMPLE_DATA_TABLE', []);                    
           }
           else {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_LAYOUT_TABLE', []);                    
           }  
         }
       }
       else {
         rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_HIDDEN', []);          
       }
     }

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     var ID         = OpenAjax.a11y.ID;
     
     var i;   
           
     var child_cache_elements     = dom_cache.tables_cache.child_cache_elements;
     var child_cache_elements_len = child_cache_elements.length;


     
     for (i = 0; i < child_cache_elements_len; i++) {
       checkComplexDataTableHeadingsForUniqueIds(child_cache_elements[i]);     
     } // end loop
     
   } // end validation function
 },

/**
 * @object TABLE_7
 *
 * @desc  If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
 */
 { id                : 'TABLE_7', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['headers'],
   language          : "",
   validate          : function (dom_cache, rule_result) {

     function checkComplexDataTableForDataCellHeaders(table_element) {

       function testForDataCellHeaders(table_elements) {
         var j;
         var tce;
         var max = table_elements.length;
       
         for (j = 0; j < max; j++) {
           tce = table_elements[j];

           // do not traverse nested tables
           if (tce.table_type === TABLE.TABLE_ELEMENT) checkComplexDataTableForDataCellHeaders(tce);  

           switch (tce.table_type) {
         
           case TABLE.TD_ELEMENT:
         
             if (!tce.text_content) tce.text_content = tce.dom_element.getText().normalizeSpace();               
           
             if (tce.headers && tce.headers_array && tce.headers_array.length > 0) {
               rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_HAS_HEADERS', []);                                                    
               total++;       
             }
             else {
               if (tce.text_content.length) {
                 rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_MISSING_VIOLATION', []);              
               
                 total++;     
                 count++;
               }
               else {
                 rule_result.addResult(SEVERITY.MANUAL_CHECK, tce, 'MESSAGE_DATA_CELL_IS_EMPTY', []);                                         
               }
             }
             break;

           case TABLE.TH_ELEMENT:
             rule_result.addResult(SEVERITY.NA, tce, 'MESSAGE_HEADER_CELL', []);                                        
             break;
           
           default:
             break;

           } // end switch  
         
           if (tce.child_cache_elements && tce.child_cache_elements.length) testForDataCellHeaders(tce.child_cache_elements);         
       
         } // end loop
     
       } // end function


       var count = 0;
       var total = 0;

       if (table_element.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (table_element.is_complex_data_table) { 

           testForDataCellHeaders(table_element.child_cache_elements);

           if (count === 0) {      
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PASS', [total]);                
           }
           else {
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_MISSING_HEADERS', [count, total]);                
           }
         }
         else {
           if (table_element.is_data_table) {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_SIMPLE_DATA_TABLE', []);                    
           }
           else {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_LAYOUT_TABLE', []);                    
           }  
         }
       }
       else {
         rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_HIDDEN', []);          
       }
       
     } // end function

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     
     var i;   
           
     var child_cache_elements     = dom_cache.tables_cache.child_cache_elements;
     var child_cache_elements_len = child_cache_elements.length;
       
     for (i = 0; i < child_cache_elements_len; i++) {
       checkComplexDataTableForDataCellHeaders(child_cache_elements[i]);     
     } // end loop
     
   } // end validation function
 },
 
/**
 * @object TABLE_8
 *
 * @desc     If a table is a complex data table, the rule tests if the table has an effective summary
 */
 { id                : 'TABLE_8', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
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
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (te.effective_summary && te.effective_summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);
             } 
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', []);
             }  
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_COMPLEX_DATA_TABLE', []);
         } 
       }
     }    
  } // end validation function
 },
 
/**
 * @object LAYOUT_1
 *
 * @desc     Do not use nested tables more than 1 column wide  
 *           for positioning content outside of landmarks.
 *           Fails with one or more one levels of nesting.
 */
 { id                : 'LAYOUT_1',
   last_updated      : '2011-09-17',
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'max_row', 'max_column', 'nesting_level'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
     
     function getNestingLevel(table_element, level) {
     
       var l = level;
       var pte = table_element.parent_table_element;
     
       if (pte) {
         if (pte.is_data_table || pte.max_column == 1) {
           l = getNestingLevel(pte, level);           
         }
         else {
           l = getNestingLevel(pte, (level+1));
         }
       }
       return l;
     }
     
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
    
     var i;
     var te;
     var nesting_level;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {

             nesting_level = getNestingLevel(te, 0);

             te.nesting_level = nesting_level;

             if (te.max_column === 1)  {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_ONE_COLUMN', []);          
             }  
             else {
         
               if (nesting_level === 0) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_NOT_NESTED', []);               
               } 
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', [te.max_column, nesting_level]);
               }  
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
         } 
       } // end loop
     }  
     
   }  // end validation function
 },
 
/**
 * @object LAYOUT_2
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning within a landmark. 
 *           Fails with one or more one levels of nesting.
 */
 { id                : 'LAYOUT_2', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['is_data_table', 'max_row', 'max_column', 'nesting_level'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
    
     var i;
     var te;
     var nesting_level;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {
                      
             if (te.max_column > 1)  {

               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', [te.max_row, te.max_column]);
               
             }  
             else {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);          
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
         } 
       } // end loop
     }  
  } // end validation function        
},
 
/**
 * @object LAYOUT_3
 *
 * @desc  If table is used for layout, the rule tests if the table element and any of its child table 
 *        related elements (i.e. tbody, tr, td) have a role attribute with the value 'presentation' (role="presentation")
 */
 { id                : 'LAYOUT_3', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   cache_properties : ['role'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkLayoutTableForRolePresentation(element) {
     
       var j;
       
       var de = element.dom_element;
       
       if (de.role && de.role == 'presentation') {
         rule_result.addResult(SEVERITY.PASS, element, 'MESSAGE_PASS', [de.tag_name]);       
       }
       else {
         rule_result.addResult(SEVERITY.FAIL, element, 'MESSAGE_VIOLATION', [de.tag_name]);
       }

       var cce     = element.child_cache_elements;
       
       if (!cce) return;
       
       var cce_len = cce.length;     
       
       if (!cce_len) return;
       
       for (j = 0; j < cce_len; j++) {
         // do not recursively go into other tables
         if (cce[j].table_type !== TABLE.TABLE_ELEMENT) checkLayoutTableForRolePresentation(cce[j]);
       }
     
     }
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
    
     var i;
     var te;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {
             checkLayoutTableForRolePresentation(te);
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
         } 
       } // end loop
     }  
   } // end validation function
 }  
]); 


    

/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object TITLE_1
 *
 * @desc The page must contain exactly one title element and it must contain content.
 */	     
  {
    id                : 'TITLE_1', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties  : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var me;
      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];
          if (me.dom_element.tag_name === 'title') {
            if (me.dom_element.hasTitle && dom_cache.title.length) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_TITLE', []);              
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_NO_TITLE', []);
            }
          }
        }
      }
  
    } // end validate function
  },

/**
 * @object TITLE_2
 *
 * @desc  If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark 
 */	     	     
 {
    id                : 'TITLE_2', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var i;
      var me;
      
      var title_main_cache = dom_cache.title_main_cache;
      var main_elements = title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      var h1_count = 0;
      
      if (main_elements && main_elements_len) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) {

            if (title_main_cache.has_role_main_elements) {
              if (me.is_label_for_main) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NOT_LABEL', []);
              }
            }
            else {
              rule_result.addResult(SEVERITY.NA, me, 'MESSAGE_NO_ROLE_MAIN', []);            
            }
          }       
        } // end loop  
      }  
    } // end validate function
 },
 
/**
 * @rule TITLE_3
 *
 * @desc The words in the H1 element content should also be in the TITLE element content  
 */	     	     
  {
    id                : 'TITLE_3', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;
      var h1_info;

      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (me.dom_element.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) { 
              if (me.is_label_for_main) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NOT_LABEL', []);
              }
            }  
          }  
          else {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', []);                      
          }              
        }  // end loop
      }      
    } // end validate function
 }
 ]); 


    

/**
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Ruleset for WCAG 2.0 Transitional (Beta)           */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.all_rulesets.addRuleset('WCAG20', {

  title : {
    'default' : "IITAA 2.0",
    'en-us'   : "IITAA 2.0"
  },   

  description : {
    'default' : "The IITAA 2.0 Beta ruleset is the success criteria of WCAG 2.0 and the accessible design patterns developed by the web best practices working group using the features of the HTML and ARIA specifications.",
    'en-us'   : "The IITAA 2.0 Beta ruleset is the success criteria of WCAG 2.0 and the accessible design patterns developed by the web best practices working group using the features of the HTML and ARIA specifications."
  },
  
  author : {
    name : "Illinois Web Best Practices Working Group",
    url  : "http://collaborate.athenpro.org/group/web/"
  } , 
  
 
  id            : "IITAA20",
  version       : "0.5 beta",
  last_updated  : "2012-02-29",

  // Assignement of rules to WCAG 2.0 requirements

  principles : {
  
    // Principe 1: Perceivable

    '1' : { 
      enabled: true,
      guidelines : {
      
        // 1.1 Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.
        
        '1.1' : { 
          enabled: true,
          success_criteria: {
            
            // 1.1.1 Non-text Content 
            
            '1.1.1' : {
              enabled: true,
              rules : {
                //
                // Image 1
                //
                'IMAGE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 2
                //
                'IMAGE_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 3
                //
                'IMAGE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 engish
                //
                'IMAGE_4_EN' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 french
                //
                'IMAGE_4_FR' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 5
                //
                'IMAGE_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'IMAGE_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }
        },  
        // 1.2 Provide alternatives for time-based media.
          
        '1.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 1.2.1 Audio-only and Video-only (Prerecorded)
            
            '1.2.1' : {
              enabled: true,
              rules : {
                //
                // Media 1
                //
                'MEDIA_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'MEDIA_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.2.2 Captions (Prerecorded)
            
            '1.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.3 Audio Description or Media Alternative (Prerecorded)
            
            '1.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.4 Captions (Live)
            
            '1.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.5 Audio Description (Prerecorded)
            
            '1.2.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.6 Sign Language (Prerecorded)
            
            '1.2.6' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.7 Extended Audio Description (Prerecorded)
            
            '1.2.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.8 Media Alternative (Prerecorded)
            
            '1.2.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.9 Audio-only (Live)
            
            '1.2.9' : {
              enabled: true,
              rules : {
              }
            }
          }
        },  
        // 1.3 Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
        
        '1.3' : { 
          enabled: true ,
          success_criteria: {

            // 1.3.1 Info and Relationships
            
            '1.3.1' : {
              enabled: true,
              rules : {
                //
                // TABLE 1: Each data table must include column and/or row headers
                // Group Table
                //
                'TABLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2S
                // Group Table 
                //
                'TABLE_2S' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2M
                // Group Table 
                //
                'TABLE_2M' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 3
                // Group Table 
                //
                'TABLE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 4
                // Group Table 
                //
                'TABLE_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 5
                // Group Table 
                //
                'TABLE_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 6 
                // Group Table 
                //
                'TABLE_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 7
                // Group Table 
                //
                'TABLE_7' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 8
                // Group Table 
                //
                'TABLE_8' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 1
                // Group Landmark/Header
                //
                'LANDMARK_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 2
                // Group Landmark/Header
                //
                'LANDMARK_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 3
                // Group Landmark/Header
                //
                'LANDMARK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 4
                // Group Landmark/Header
                //
                'LANDMARK_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // List 1
                // Group List
                //
                'LIST_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.2 Meaningful Sequence
            
            '1.3.2' : {
              enabled: true,
              rules : {
                //
                // LAYOUT_1
                // Group Style: Table Rule
                //
                'LAYOUT_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_2
                // Group Style: Table Rule
                //
                'LAYOUT_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_3
                // Group Style: Table Rule
                //
                'LAYOUT_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.3 Sensory Characteristics
            
            '1.3.3' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        // 1.4 Make it easier for users to see and hear content including separating foreground from background.
        
        '1.4' : {
          enabled: true ,
          success_criteria: {
          
            // 1.4.1 Use of Color

            '1.4.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.2 Audio Control

            '1.4.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.3 Contrast (Minimum)

            '1.4.3' : {
              enabled: true,
              rules : {
                //
                // Color 1:
                // Group Style: Link Rule
                //
                'COLOR_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.4 Resize text

            '1.4.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.5 Images of Text

            '1.4.5' : {
              enabled: true,
              rules : {

                //
                // Heading 6
                // Group Style: Link Rule
                //
                'HEADING_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.6 Contrast (Enhanced)

            '1.4.6' : {
              enabled: true,
              rules : {
                //
                // Color 2
                //
                'COLOR_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.7 Low or No Background Audio

            '1.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.8 Visual Presentation

            '1.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.9 Images of Text (No Exception)

            '1.4.9' : {
              enabled: true,
              rules : {
              }
            }            
          }
        }  
      }
    },
    
    // Principe 2: Operable
    
    '2' : { 
      enabled: true,
      guidelines: { 
    
        // 2.1 Make all functionality available from a keyboard.
        
        '2.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.1.1 Keyboard

            '2.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.1.2 No Keyboard Trap

            '2.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 2.1.3 Keyboard (No Exception)

            '2.1.3' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        // 2.2 Provide users enough time to read and use content.
        
        '2.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.2.1 Timing Adjustable

            '2.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.2 Pause, Stop, Hide

            '2.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.3 No Timing

            '2.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.4 Interruptions

            '2.2.4' : {
              enabled: true,
              rules : {
              }
            },

            // 2.2.5 Re-authenticating    

            '2.2.5' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 2.3 Do not design content in a way that is known to cause seizures.
        
        '2.3' : { 
          enabled: true,
          success_criteria: {
          
            // 2.3.1 Three Flashes or Below Threshold

            '2.3.1' : {
              enabled: true,
              rules : {
              }
            },

            // 2.3.2 Three Flashes

            '2.3.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 2.4 Provide ways to help users navigate, find content, and determine where they are.
        
        '2.4' : { 
          enabled: true ,
          success_criteria: {
            // 2.4.1 Bypass Blocks

            '2.4.1' : {
              enabled: true,
              rules : {
                               //
                // HEADING 1: Every page should have at least H1 element
                // Group 11: 
                //
                'HEADING_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },

            // 2.4.2 Page Titled

            '2.4.2' : {
              enabled: true,
              rules : {
                               //
                // Title 1:
                // Group 11: 
                //
                'TITLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 2:
                // Group 11: 
                //
                'TITLE_2' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 3:
                // Group 
                //
                'TITLE_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.3 Focus Order

            '2.4.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.4 Link Purpose (In Context)

            '2.4.4' : {
              enabled: true,
              rules : {
                               //
                // Link 1:
                // Group 11: Link Rule
                //
                'LINK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.5 Multiple Ways

            '2.4.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.6 Headings and Labels

            '2.4.6' : {
              enabled: true,
              rules : {
                //
                // Heading 2
                // Group: Headings and Landmarks
                //
                'HEADING_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 3
                // Group: Headings and Landmarks
                //
                'HEADING_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 8 
                // Group: Headings and Landmarks
                //
                'HEADING_8_EN' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 10
                // Group: Controls
                //
                'CONTROL_10' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 11
                // Group: Controls
                //
                'CONTROL_11' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.7 Focus Visible

            '2.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.8 Location

            '2.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.9 Link Purpose (Link Only)

            '2.4.9' : {
              enabled: true,
              rules : {
                // LINK 2: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P3,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LINK 3: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.10 Section Headings

            '2.4.10' : {
              enabled: true,
              rules : {
                //
                // Heading 4
                // Group: Headings and Landmarks
                //
                'HEADING_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 5
                // Group: Headings and Landmarks
                //
                'HEADING_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 6
                // Group: Headings and Landmarks
                //
                'HEADING_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }            
        }
      }  
    },    
    
    // Principe 3: Understandable
    
    '3' : { 
      enabled: true,
      guidelines: { 
    
        // 3.1 Make text content readable and understandable.
        
        '3.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.1.1 Language of Page

            '3.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.1.2 Language of Parts

            '3.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.3 Unusual Words

            '3.1.3' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.4 Abbreviations

            '3.1.4' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.5 Reading Level

            '3.1.5' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.6 Pronunciation        

            '3.1.6' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 3.2 Make Web pages appear and operate in predictable ways.
        
        '3.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.2.1 On Focus

            '3.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.2 On Input

            '3.2.2' : {
              enabled: true,
              rules : {
              }
            },
            // 3.2.3 Consistent Navigation

            '3.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.4 Consistent Identification

            '3.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.5 Change on Request       

            '3.2.5' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 3.3 Help users avoid and correct mistakes.
        
        '3.3' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.3.1 Error Identification

            '3.3.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.2 Labels or Instructions

            '3.3.2' : {
              enabled: true,
              rules : {
                // Control 1
                // Group: Controls
                //
                'CONTROL_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 2
                // Group: Controls
                //
                'CONTROL_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 3
                // Group: Controls
                //
                'CONTROL_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 4
                // Group: Controls
                //
                'CONTROL_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 5
                // Group: Controls
                //
                'CONTROL_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 6
                // Group: Controls
                //
                'CONTROL_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 7
                // Group: Controls
                //
                'CONTROL_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 8
                // Group: Controls
                //
                'CONTROL_8' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 9
                // Group: Controls
                //
                'CONTROL_9' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 3.3.3 Error Suggestion

            '3.3.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.4 Error Prevention (Legal, Financial, Data)

            '3.3.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.5 Help: Context-sensitive help is available.

            '3.3.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.6 Error Prevention (All)     

            '3.3.6' : {
              enabled: true,
              rules : {
              }
            }           
          }  
        }
      }  
    }, 
    
    // Principe 4: Robust
    
    '4' : { 
      enabled: true,
      guidelines: { 
    
        // 4.1 Compatible: Maximize compatibility with current and future user agents, including assistive technologies.
        
        '4.1' : { 
          enabled: true ,
          success_criteria: {

            // 4.1.1 Parsing

            '4.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 4.1.2 Name, Role, Value:

            '4.1.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        }
      }
    }  
  }   
});


/**
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Ruleset for WCAG 2.0 Transitional (Beta)           */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.all_rulesets.addRuleset('WCAG20', {

  title : {
    'default' : "WCAG 2.0 ARIA Transitional",
    'en-us'   : "WCAG 2.0 ARIA Transitional"
  },   

  description : {
    'default' : "The ARIA transitional ruleset is based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications.",
    'en-us'   : "The ARIA transitional ruleset is based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications."  
  },
  
  author : {
    name : "OpenAjax Accessibility Working Group",
    url  : "http://www.openajax.org/member/wiki/Accessibility"
  } , 
  
 
  id            : "WCAG20_ARIA_TRANS",
  version       : "0.5 beta",
  last_updated  : "2012-01-19",

  // Assignement of rules to WCAG 2.0 requirements

  principles : {
  
    // Principe 1: Perceivable

    '1' : { 
      enabled: true,
      guidelines : {
      
        // 1.1 Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.
        
        '1.1' : { 
          enabled: true,
          success_criteria: {
            
            // 1.1.1 Non-text Content 
            
            '1.1.1' : {
              enabled: true,
              rules : {
                //
                // Image 1
                //
                'IMAGE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 2
                //
                'IMAGE_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 3
                //
                'IMAGE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 engish
                //
                'IMAGE_4_EN' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 french
                //
                'IMAGE_4_FR' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 5
                //
                'IMAGE_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'IMAGE_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }
        },  
        // 1.2 Provide alternatives for time-based media.
          
        '1.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 1.2.1 Audio-only and Video-only (Prerecorded)
            
            '1.2.1' : {
              enabled: true,
              rules : {
                //
                // Media 1
                //
                'MEDIA_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'MEDIA_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.2.2 Captions (Prerecorded)
            
            '1.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.3 Audio Description or Media Alternative (Prerecorded)
            
            '1.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.4 Captions (Live)
            
            '1.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.5 Audio Description (Prerecorded)
            
            '1.2.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.6 Sign Language (Prerecorded)
            
            '1.2.6' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.7 Extended Audio Description (Prerecorded)
            
            '1.2.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.8 Media Alternative (Prerecorded)
            
            '1.2.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.9 Audio-only (Live)
            
            '1.2.9' : {
              enabled: true,
              rules : {
              }
            }
          }
        },  
        // 1.3 Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
        
        '1.3' : { 
          enabled: true ,
          success_criteria: {

            // 1.3.1 Info and Relationships
            
            '1.3.1' : {
              enabled: true,
              rules : {
                //
                // TABLE 1: Each data table must include column and/or row headers
                // Group Table
                //
                'TABLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2T
                // Group Table
                //
                'TABLE_2T' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 3
                // Group Table 
                //
                'TABLE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 4
                // Group Table 
                //
                'TABLE_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 5: Each data table must include column and/or row headers: The first cell in each column must be a th element, and/or each row must contain at least one th element.
                // Group Table 
                //
                'TABLE_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 6 
                // Group Table 
                //
                'TABLE_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 7
                // Group Table 
                //
                'TABLE_7' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 8
                // Group Table 
                //
                'TABLE_8' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 1
                // Group Landmark/Header
                //
                'LANDMARK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 2
                // Group Landmark/Header
                //
                'LANDMARK_2' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 2
                // Group Landmark/Header
                //
                'LANDMARK_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 4
                // Group Landmark/Header
                //
                'LANDMARK_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // List 1
                // Group List
                //
                'LIST_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.2 Meaningful Sequence
            
            '1.3.2' : {
              enabled: true,
              rules : {
                //
                // LAYOUT_1
                // Group Style: Table Rule
                //
                'LAYOUT_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_2
                // Group Style: Table Rule
                //
                'LAYOUT_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_3
                // Group Style: Table Rule
                //
                'LAYOUT_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.3 Sensory Characteristics
            
            '1.3.3' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        // 1.4 Make it easier for users to see and hear content including separating foreground from background.
        
        '1.4' : {
          enabled: true ,
          success_criteria: {
          
            // 1.4.1 Use of Color

            '1.4.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.2 Audio Control

            '1.4.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.3 Contrast (Minimum)

            '1.4.3' : {
              enabled: true,
              rules : {
                //
                // Color 1:
                // Group Style: Link Rule
                //
                'COLOR_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.4 Resize text

            '1.4.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.5 Images of Text

            '1.4.5' : {
              enabled: true,
              rules : {

                //
                // Heading 6
                // Group Style: Link Rule
                //
                'HEADING_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.6 Contrast (Enhanced)

            '1.4.6' : {
              enabled: true,
              rules : {
                //
                // Color 2
                //
                'COLOR_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.7 Low or No Background Audio

            '1.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.8 Visual Presentation

            '1.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.9 Images of Text (No Exception)

            '1.4.9' : {
              enabled: true,
              rules : {
              }
            }            
          }
        }  
      }
    },
    
    // Principe 2: Operable
    
    '2' : { 
      enabled: true,
      guidelines: { 
    
        // 2.1 Make all functionality available from a keyboard.
        
        '2.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.1.1 Keyboard

            '2.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.1.2 No Keyboard Trap

            '2.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 2.1.3 Keyboard (No Exception)

            '2.1.3' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        // 2.2 Provide users enough time to read and use content.
        
        '2.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.2.1 Timing Adjustable

            '2.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.2 Pause, Stop, Hide

            '2.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.3 No Timing

            '2.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.4 Interruptions

            '2.2.4' : {
              enabled: true,
              rules : {
              }
            },

            // 2.2.5 Re-authenticating    

            '2.2.5' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 2.3 Do not design content in a way that is known to cause seizures.
        
        '2.3' : { 
          enabled: true,
          success_criteria: {
          
            // 2.3.1 Three Flashes or Below Threshold

            '2.3.1' : {
              enabled: true,
              rules : {
              }
            },

            // 2.3.2 Three Flashes

            '2.3.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 2.4 Provide ways to help users navigate, find content, and determine where they are.
        
        '2.4' : { 
          enabled: true ,
          success_criteria: {
            // 2.4.1 Bypass Blocks

            '2.4.1' : {
              enabled: true,
              rules : {
                               //
                // HEADING 1: Every page should have at least H1 element
                // Group 11: 
                //
                'HEADING_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },

            // 2.4.2 Page Titled

            '2.4.2' : {
              enabled: true,
              rules : {
                               //
                // Title 1:
                // Group 11: 
                //
                'TITLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 2:
                // Group 11: 
                //
                'TITLE_2' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 3:
                // Group 
                //
                'TITLE_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.3 Focus Order

            '2.4.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.4 Link Purpose (In Context)

            '2.4.4' : {
              enabled: true,
              rules : {
                               //
                // Link 1:
                // Group 11: Link Rule
                //
                'LINK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.5 Multiple Ways

            '2.4.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.6 Headings and Labels

            '2.4.6' : {
              enabled: true,
              rules : {
                //
                // Heading 2
                // Group: Headings and Landmarks
                //
                'HEADING_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 3
                // Group: Headings and Landmarks
                //
                'HEADING_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 8 
                // Group: Headings and Landmarks
                //
                'HEADING_8_EN' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 10
                // Group: Controls
                //
                'CONTROL_10' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 11
                // Group: Controls
                //
                'CONTROL_11' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.7 Focus Visible

            '2.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.8 Location

            '2.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.9 Link Purpose (Link Only)

            '2.4.9' : {
              enabled: true,
              rules : {
                // LINK 2: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P3,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LINK 3: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.10 Section Headings

            '2.4.10' : {
              enabled: true,
              rules : {
                //
                // Heading 4
                // Group: Headings and Landmarks
                //
                'HEADING_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 5
                // Group: Headings and Landmarks
                //
                'HEADING_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 6
                // Group: Headings and Landmarks
                //
                'HEADING_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }            
        }
      }  
    },    
    
    // Principe 3: Understandable
    
    '3' : { 
      enabled: true,
      guidelines: { 
    
        // 3.1 Make text content readable and understandable.
        
        '3.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.1.1 Language of Page

            '3.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.1.2 Language of Parts

            '3.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.3 Unusual Words

            '3.1.3' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.4 Abbreviations

            '3.1.4' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.5 Reading Level

            '3.1.5' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.6 Pronunciation        

            '3.1.6' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 3.2 Make Web pages appear and operate in predictable ways.
        
        '3.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.2.1 On Focus

            '3.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.2 On Input

            '3.2.2' : {
              enabled: true,
              rules : {
              }
            },
            // 3.2.3 Consistent Navigation

            '3.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.4 Consistent Identification

            '3.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.5 Change on Request       

            '3.2.5' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 3.3 Help users avoid and correct mistakes.
        
        '3.3' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.3.1 Error Identification

            '3.3.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.2 Labels or Instructions

            '3.3.2' : {
              enabled: true,
              rules : {
                // Control 1
                // Group: Controls
                //
                'CONTROL_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 2
                // Group: Controls
                //
                'CONTROL_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 3
                // Group: Controls
                //
                'CONTROL_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 4
                // Group: Controls
                //
                'CONTROL_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 5
                // Group: Controls
                //
                'CONTROL_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 6
                // Group: Controls
                //
                'CONTROL_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 7
                // Group: Controls
                //
                'CONTROL_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 8
                // Group: Controls
                //
                'CONTROL_8' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 9
                // Group: Controls
                //
                'CONTROL_9' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 3.3.3 Error Suggestion

            '3.3.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.4 Error Prevention (Legal, Financial, Data)

            '3.3.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.5 Help: Context-sensitive help is available.

            '3.3.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.6 Error Prevention (All)     

            '3.3.6' : {
              enabled: true,
              rules : {
              }
            }           
          }  
        }
      }  
    }, 
    
    // Principe 4: Robust
    
    '4' : { 
      enabled: true,
      guidelines: { 
    
        // 4.1 Compatible: Maximize compatibility with current and future user agents, including assistive technologies.
        
        '4.1' : { 
          enabled: true ,
          success_criteria: {

            // 4.1.1 Parsing

            '4.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 4.1.2 Name, Role, Value:

            '4.1.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        }
      }
    }  
  }   
});


/**
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Ruleset for WCAG 2.0 (Beta)           */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.all_rulesets.addRuleset('WCAG20', {

  title : {
    'default' : "WCAG 2.0 ARIA Strict",
    'en-us'   : "WCAG 2.0 ARIA Strict"
  },   
  
  description : {
    'default' : "WCAG 2.0 ARIA strict ruleset is based on best practice design patterns to improve accessibility and usability with the features available in HTML and ARIA specifications to meet WCAG 2.0 success criteria.",
    'en-us'   : "WCAG 2.0 ARIA strict ruleset is based on best practice design patterns to improve accessibility and usability with the features available in HTML and ARIA specifications to meet WCAG 2.0 success criteria."  
  },
  
  author : {
    name : "OpenAjax Accessibility Working Group",
    url  : "http://www.openajax.org/member/wiki/Accessibility"
  } , 
  
  id            : "WCAG20_ARIA_STRICT",
  version       : "0.5 Beta",
  last_updated  : "2012-01-19",

  // Assignement of rules to WCAG 2.0 requirements

  principles : {
  
    // Principe 1: Perceivable

    '1' : { 
      enabled: true,
      guidelines : {
      
        // 1.1 Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.
        
        '1.1' : { 
          enabled: true,
          success_criteria: {
            
            // 1.1.1 Non-text Content 
            
            '1.1.1' : {
              enabled: true,
              rules : {
                //
                // Image 1
                //
                'IMAGE_1' : {
                  type     : OpenAjax.a11y.RULE.REQUIRED,
                  priority : OpenAjax.a11y.PRIORITY.P1,
                  status   : OpenAjax.a11y.STATUS.ACCEPTED,
                  enabled  : true
                },
                //
                // Image 2
                //
                'IMAGE_2' : {
                  type     : OpenAjax.a11y.RULE.REQUIRED,
                  priority : OpenAjax.a11y.PRIORITY.P1,
                  status   : OpenAjax.a11y.STATUS.ACCEPTED,
                  enabled  : true
                },
                //
                // Image 3
                //
                'IMAGE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 engish
                //
                'IMAGE_4_EN' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 french
                //
                'IMAGE_4_FR' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 5
                //
                'IMAGE_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'IMAGE_6' : {
                  type     : OpenAjax.a11y.RULE.REQUIRED,
                  priority : OpenAjax.a11y.PRIORITY.P1,
                  status   : OpenAjax.a11y.STATUS.ACCEPTED,
                  enabled  : true
                }
              }
            }
          }
        },  
        // 1.2 Provide alternatives for time-based media.
          
        '1.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 1.2.1 Audio-only and Video-only (Prerecorded)
            
            '1.2.1' : {
              enabled: true,
              rules : {
                //
                // Media 1
                //
                'MEDIA_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'MEDIA_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.2.2 Captions (Prerecorded)
            
            '1.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.3 Audio Description or Media Alternative (Prerecorded)
            
            '1.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.4 Captions (Live)
            
            '1.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.5 Audio Description (Prerecorded)
            
            '1.2.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.6 Sign Language (Prerecorded)
            
            '1.2.6' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.7 Extended Audio Description (Prerecorded)
            
            '1.2.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.8 Media Alternative (Prerecorded)
            
            '1.2.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.9 Audio-only (Live)
            
            '1.2.9' : {
              enabled: true,
              rules : {
              }
            }
          }
        },  
        // 1.3 Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
        
        '1.3' : { 
          enabled: true ,
          success_criteria: {

            // 1.3.1 Info and Relationships
            
            '1.3.1' : {
              enabled: true,
              rules : {
                //
                // TABLE 1: Each data table must include column and/or row headers
                // Group Table
                //
                'TABLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2S
                // Group Table 
                //
                'TABLE_2S' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2M
                // Group Table 
                //
                'TABLE_2M' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 3
                // Group Table 
                //
                'TABLE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 4
                // Group Table 
                //
                'TABLE_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 5: Each data table must include column and/or row headers: The first cell in each column must be a th element, and/or each row must contain at least one th element.
                // Group Table 
                //
                'TABLE_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 6 
                // Group Table 
                //
                'TABLE_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 7
                // Group Table 
                //
                'TABLE_7' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 8
                // Group Table 
                //
                'TABLE_8' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 1
                // Group Landmark/Header
                //
                'LANDMARK_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 2
                // Group Landmark/Header
                //
                'LANDMARK_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 3
                // Group Landmark/Header
                //
                'LANDMARK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 4
                // Group Landmark/Header
                //
                'LANDMARK_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // List 1
                // Group List
                //
                'LIST_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.2 Meaningful Sequence
            
            '1.3.2' : {
              enabled: true,
              rules : {
                //
                // LAYOUT_1
                // Group Style: Table Rule
                //
                'LAYOUT_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_2
                // Group Style: Table Rule
                //
                'LAYOUT_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_3
                // Group Style: Table Rule
                //
                'LAYOUT_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.3 Sensory Characteristics
            
            '1.3.3' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        // 1.4 Make it easier for users to see and hear content including separating foreground from background.
        
        '1.4' : {
          enabled: true ,
          success_criteria: {
          
            // 1.4.1 Use of Color

            '1.4.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.2 Audio Control

            '1.4.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.3 Contrast (Minimum)

            '1.4.3' : {
              enabled: true,
              rules : {
                //
                // Color 1:
                // Group Style: Link Rule
                //
                'COLOR_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.4 Resize text

            '1.4.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.5 Images of Text

            '1.4.5' : {
              enabled: true,
              rules : {

                //
                // Heading 6
                // Group Style: Link Rule
                //
                'HEADING_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.6 Contrast (Enhanced)

            '1.4.6' : {
              enabled: true,
              rules : {
                //
                // Color 2
                //
                'COLOR_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.7 Low or No Background Audio

            '1.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.8 Visual Presentation

            '1.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.9 Images of Text (No Exception)

            '1.4.9' : {
              enabled: true,
              rules : {
              }
            }            
          }
        }  
      }
    },
    
    // Principe 2: Operable
    
    '2' : { 
      enabled: true,
      guidelines: { 
    
        // 2.1 Make all functionality available from a keyboard.
        
        '2.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.1.1 Keyboard

            '2.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.1.2 No Keyboard Trap

            '2.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 2.1.3 Keyboard (No Exception)

            '2.1.3' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        // 2.2 Provide users enough time to read and use content.
        
        '2.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.2.1 Timing Adjustable

            '2.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.2 Pause, Stop, Hide

            '2.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.3 No Timing

            '2.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.4 Interruptions

            '2.2.4' : {
              enabled: true,
              rules : {
              }
            },

            // 2.2.5 Re-authenticating    

            '2.2.5' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 2.3 Do not design content in a way that is known to cause seizures.
        
        '2.3' : { 
          enabled: true,
          success_criteria: {
          
            // 2.3.1 Three Flashes or Below Threshold

            '2.3.1' : {
              enabled: true,
              rules : {
              }
            },

            // 2.3.2 Three Flashes

            '2.3.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 2.4 Provide ways to help users navigate, find content, and determine where they are.
        
        '2.4' : { 
          enabled: true ,
          success_criteria: {
            // 2.4.1 Bypass Blocks

            '2.4.1' : {
              enabled: true,
              rules : {
                               //
                // HEADING 1: Every page should have at least H1 element
                // Group 11: 
                //
                'HEADING_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },

            // 2.4.2 Page Titled

            '2.4.2' : {
              enabled: true,
              rules : {
                               //
                // Title 1:
                // Group 11: 
                //
                'TITLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 2:
                // Group 11: 
                //
                'TITLE_2' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 3:
                // Group 
                //
                'TITLE_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.3 Focus Order

            '2.4.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.4 Link Purpose (In Context)

            '2.4.4' : {
              enabled: true,
              rules : {
                               //
                // Link 1:
                // Group 11: Link Rule
                //
                'LINK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.5 Multiple Ways

            '2.4.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.6 Headings and Labels

            '2.4.6' : {
              enabled: true,
              rules : {
                //
                // Heading 2
                // Group: Headings and Landmarks
                //
                'HEADING_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 3
                // Group: Headings and Landmarks
                //
                'HEADING_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 8 
                // Group: Headings and Landmarks
                //
                'HEADING_8_EN' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 10
                // Group: Controls
                //
                'CONTROL_10' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 11
                // Group: Controls
                //
                'CONTROL_11' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.7 Focus Visible

            '2.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.8 Location

            '2.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.9 Link Purpose (Link Only)

            '2.4.9' : {
              enabled: true,
              rules : {
                // LINK 2: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_2' : {
                   type     : OpenAjax.a11y.SEVERITY.INFORMATIONAL,
                   priority : OpenAjax.a11y.PRIORITY.P3,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LINK 3: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.10 Section Headings

            '2.4.10' : {
              enabled: true,
              rules : {
                //
                // Heading 4
                // Group: Headings and Landmarks
                //
                'HEADING_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 5
                // Group: Headings and Landmarks
                //
                'HEADING_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 6
                // Group: Headings and Landmarks
                //
                'HEADING_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }            
        }
      }  
    },    
    
    // Principe 3: Understandable
    
    '3' : { 
      enabled: true,
      guidelines: { 
    
        // 3.1 Make text content readable and understandable.
        
        '3.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.1.1 Language of Page

            '3.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.1.2 Language of Parts

            '3.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.3 Unusual Words

            '3.1.3' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.4 Abbreviations

            '3.1.4' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.5 Reading Level

            '3.1.5' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.6 Pronunciation        

            '3.1.6' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 3.2 Make Web pages appear and operate in predictable ways.
        
        '3.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.2.1 On Focus

            '3.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.2 On Input

            '3.2.2' : {
              enabled: true,
              rules : {
              }
            },
            // 3.2.3 Consistent Navigation

            '3.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.4 Consistent Identification

            '3.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.5 Change on Request       

            '3.2.5' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 3.3 Help users avoid and correct mistakes.
        
        '3.3' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.3.1 Error Identification

            '3.3.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.2 Labels or Instructions

            '3.3.2' : {
              enabled: true,
              rules : {
                // Control 1
                // Group: Controls
                //
                'CONTROL_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 2
                // Group: Controls
                //
                'CONTROL_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 3
                // Group: Controls
                //
                'CONTROL_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 4
                // Group: Controls
                //
                'CONTROL_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 5
                // Group: Controls
                //
                'CONTROL_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 6
                // Group: Controls
                //
                'CONTROL_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 7
                // Group: Controls
                //
                'CONTROL_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 8
                // Group: Controls
                //
                'CONTROL_8' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 9
                // Group: Controls
                //
                'CONTROL_9' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 3.3.3 Error Suggestion

            '3.3.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.4 Error Prevention (Legal, Financial, Data)

            '3.3.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.5 Help: Context-sensitive help is available.

            '3.3.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.6 Error Prevention (All)     

            '3.3.6' : {
              enabled: true,
              rules : {
              }
            }           
          }  
        }
      }  
    }, 
    
    // Principe 4: Robust
    
    '4' : { 
      enabled: true,
      guidelines: { 
    
        // 4.1 Compatible: Maximize compatibility with current and future user agents, including assistive technologies.
        
        '4.1' : { 
          enabled: true ,
          success_criteria: {

            // 4.1.1 Parsing

            '4.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 4.1.2 Name, Role, Value:

            '4.1.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        }
      }
    }  
  }   
});


