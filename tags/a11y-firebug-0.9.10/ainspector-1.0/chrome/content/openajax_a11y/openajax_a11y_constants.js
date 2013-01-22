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

// Test comment

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
 * @constant DATA_TABLE_ASSUMPTION
 *
 * @memberOf OpenAjax.a11y
 *
 * @type Boolean
 * @default true
 * @desc If true assume table markup is for a data table
 *       If false assume table markup is for layout, unless header cells or other 
 *       information indciates its a data table
 */
OpenAjax.a11y.DATA_TABLE_ASSUMPTION  = true;  


/**
 * @constant ELEMENT_FORMATING
 * @memberOf OpenAjax.a11y
 * @type String
 * @default 'CAPS'
 * @desc Defines the formating of element names in NLS message strings
 */
OpenAjax.a11y.ELEMENT_FORMATING = 'CAPS';


/**
 * @constant RESULT_FILTER
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Constants related to filtering both node results and rule results
 * @example
 * OpenAjax.a11y.RESULT_FILTER.ALL
 * OpenAjax.a11y.RESULT_FILTER.PASS
 * OpenAjax.a11y.RESULT_FILTER.VIOLATION
 * OpenAjax.a11y.RESULT_FILTER.WARNING
 * OpenAjax.a11y.RESULT_FILTER.PAGE_MANUAL_CHECK
 * OpenAjax.a11y.RESULT_FILTER.ELEMENT_MANUAL_CHECK
 * OpenAjax.a11y.RESULT_FILTER.HIDDEN
 * OpenAjax.a11y.RESULT_FILTER.NA
 */ 
OpenAjax.a11y.RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER || {
  ALL                  : 127,
  PASS                 : 1,
  VIOLATION            : 2,
  WARNING              : 4,
  PAGE_MANUAL_CHECK    : 8,
  ELEMENT_MANUAL_CHECK : 16,
  HIDDEN               : 32, // hidden only applies to node results 
  NOT_APPLICABLE       : 64  // not applicable only applies to rule results
};

/**
 * @constant DEFAULT_PREFS
 * @memberOf OpenAjax.a11y
 * @type Object
 * @desc Default setting for consumers of the OpenAjax cache 
 */

OpenAjax.a11y.DEFAULT_PREFS = OpenAjax.a11y.DEFAULT_PREFS || {
  RULESET_ID     : "WCAG20_ARIA_TRANS",
  WCAG20_LEVEL   : 3,
  BROKEN_LINKS   : false
};

/**
 * @constant RULE_CATEGORIES
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numbercal contant representing the rule category that is bit maskable
 *
 * @example
 * OpenAjax.a11y.RULE_CATEGORIES.UNKNOWN  
 * OpenAjax.a11y.RULE_CATEGORIES.ALL_CATEGORIES      
 * OpenAjax.a11y.RULE_CATEGORIES.ABBREVIATIONS      
 * OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST      
 * OpenAjax.a11y.RULE_CATEGORIES.CONTROLS      
 * OpenAjax.a11y.RULE_CATEGORIES.HEADINGS_LANDMARKS      
 * OpenAjax.a11y.RULE_CATEGORIES.IMAGES      
 * OpenAjax.a11y.RULE_CATEGORIES.LANGUAGE      
 * OpenAjax.a11y.RULE_CATEGORIES.LINKS      
 * OpenAjax.a11y.RULE_CATEGORIES.LISTS      
 * OpenAjax.a11y.RULE_CATEGORIES.MEDIA      
 * OpenAjax.a11y.RULE_CATEGORIES.TABLES      
 */
OpenAjax.a11y.RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES || {
  UNDEFINED          : 0,
  ABBREVIATIONS      : 1,
  AUDIO              : 2,
  COLOR              : 4,
  CONTROLS           : 8,
  EMBEDED            : 16,
  HEADINGS           : 32,
  IMAGES             : 64,
  LANDMARKS          : 128,
  LANGUAGE           : 256,
  LAYOUT             : 512,
  LINKS              : 1024,
  LISTS              : 2048,
  NAVIGATION         : 4096,
  SCRIPTING          : 8192,
  TABLES             : 16384,
  TITLE              : 32768,
  TIMING             : 65536,
  VIDEO              : 131072,
  WIDGETS            : 262144,
  WCAG20             : 524288,
  // Composite categories
  ALL                  : 524287, 
  AUDIO_VIDEO          : 131074,  // 131072 + 2
  STRUCTURE            : 32928,    // 32 + 128 + 32768
  STYLES               : 4    
};

/**
 * @constant RULE_SUMMARY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numbercal contant representing the rule summary option
 *
 * @example
 * OpenAjax.a11y.RULE_SUMMARY.UNKNOWN  
 * OpenAjax.a11y.RULE_SUMMARY.CATEGORIES  
 * OpenAjax.a11y.RULE_SUMMARY.WCAG20  
 */
OpenAjax.a11y.RULE_SUMMARY = OpenAjax.a11y.RULE_SUMMARY || {
  UNDEFINED     : 0,
  CATEGORIES    : 1,
  WCAG20        : 2
};

/**
 * @constant ELEMENT_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Numbercal contant representing the element type option
 *
 * @example
 * OpenAjax.a11y.ELEMENT_TYPE.UNKNOWN  
 * OpenAjax.a11y.ELEMENT_TYPE.ALL   
 * OpenAjax.a11y.ELEMENT_TYPE.AUDIO   
 * OpenAjax.a11y.ELEMENT_TYPE.AUDIO_VIDEO      
 * OpenAjax.a11y.ELEMENT_TYPE.FORM_CONTROLS      
 * OpenAjax.a11y.ELEMENT_TYPE.HEADINGS      
 * OpenAjax.a11y.ELEMENT_TYPE.HEADINGS_LANDMARKS      
 * OpenAjax.a11y.ELEMENT_TYPE.IMAGES      
 * OpenAjax.a11y.ELEMENT_TYPE.LANDMARKS      
 * OpenAjax.a11y.ELEMENT_TYPE.LANGUAGE      
 * OpenAjax.a11y.ELEMENT_TYPE.LINKS      
 * OpenAjax.a11y.ELEMENT_TYPE.LISTS      
 * OpenAjax.a11y.ELEMENT_TYPE.TABLES      
 * OpenAjax.a11y.ELEMENT_TYPE.TEXT      
 * OpenAjax.a11y.ELEMENT_TYPE.TIMING      
 * OpenAjax.a11y.ELEMENT_TYPE.VIDEO      
 * OpenAjax.a11y.ELEMENT_TYPE.WIDGETS      
 */
OpenAjax.a11y.ELEMENT_TYPE = OpenAjax.a11y.ELEMENT_TYPE || {
  UNDEFINED          : 0,
  ALL                : 1,
  ABBREVIATIONS      : 2,
  AUDIO              : 3,
  AUDIO_VIDEO        : 4,
  FORM_CONTROLS      : 5,
  HEADINGS           : 6,
  IMAGES             : 7,
  LANGUAGE           : 8,
  LANDMARKS          : 9,
  LAYOUT             : 10,
  LINKS              : 11,
  LISTS              : 12,
  TABLES             : 13,
  TEXT               : 14,
  TIMING             : 15,
  VIDEO              : 16,
  WIDGETS            : 17,
  HEADINGS_LANDMARKS : 100,
  LAYOUT_TABLES      : 101
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
                             'tables_cache',
                             'text_cache'];
  
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
  A       : 1,
  AA      : 2,
  AAA     : 3,
  UNKNOWN : -1
};


/**
 * @constant RULE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines a required or recommended rule 
 *
 * @example
 * OpenAjax.a11y.RULE.UNKNOWN               
 * OpenAjax.a11y.RULE.REQUIRED               
 * OpenAjax.a11y.RULE.RECOMMENDED               
 */
OpenAjax.a11y.RULE = OpenAjax.a11y.RULE || {
  UNKNOWN        : 0,
  REQUIRED       : 1,
  RECOMMENDED    : 2
};

/**
 * @constant RULE_GROUP
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines a grouping of rules 
 *
 * @example
 * OpenAjax.a11y.RULE_GROUP.RULE_CATEGORIES               
 * OpenAjax.a11y.RULE_GROUP.WCAG20            
 * OpenAjax.a11y.RULE_GROUP.ALL_RULE_LIST           
 */
OpenAjax.a11y.RULE_GROUP = OpenAjax.a11y.RULE_GROUP || {
  RULE_CATEGORIES : 1,
  WCAG20          : 2,
  ALL_RULE_LIST   : 3
};


/**
 * @constant RULE_SCOPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Defines a required or recommended rule 
 *
 * @example
 * OpenAjax.a11y.RULE_SCOPE.UNKNOWN               
 * OpenAjax.a11y.RULE_SCOPE.NODE (deprecated)               
 * OpenAjax.a11y.RULE_SCOPE.ELEMENT               
 * OpenAjax.a11y.RULE_SCOPE.PAGE               
 */
OpenAjax.a11y.RULE_SCOPE = OpenAjax.a11y.RULE_SCOPE || {
  UNKNOWN : 0,
  NODE    : 1,
  ELEMENT : 1,
  PAGE    : 2
};


/**
 * @constant TEST_RESULT
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Types of node results from an evaluation  
 *
 * @example
 * OpenAjax.a11y.TEST_RESULT.PASS
 * OpenAjax.a11y.TEST_RESULT.FAIL
 * OpenAjax.a11y.TEST_RESULT.MANUAL_CHECK
 * OpenAjax.a11y.TEST_RESULT.HIDDEN
 * OpenAjax.a11y.TEST_RESULT.NONE
 */
OpenAjax.a11y.TEST_RESULT = OpenAjax.a11y.TEST_RESULT || {
  PASS         : 1,
  FAIL         : 2,
  MANUAL_CHECK : 3,
  HIDDEN       : 4,
  NONE         : 5
};

/**
 * @constant IMPLEMENTATION_LEVEL
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Implementation levels of a rule on a page  
 *
 * @example
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_APPLICABLE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.COMPLETE_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.ALMOST_COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.ALMOST_COMPLETE_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.RULE_DISABLED
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.RULE_FILTERED
 */
OpenAjax.a11y.IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL || {
  UNDEFINED                                 : -1,
  NOT_APPLICABLE                            : 0,
  COMPLETE                                  : 1, 
  ALMOST_COMPLETE                           : 2,
  PARTIAL_IMPLEMENTATION                    : 3,
  NOT_IMPLEMENTED                           : 4,
  MANUAL_CHECKS                             : 5,
  COMPLETE_WITH_MANUAL_CHECKS               : 6,
  ALMOST_COMPLETE_WITH_MANUAL_CHECKS        : 7,
  PARTIAL_IMPLEMENTATION_WITH_MANUAL_CHECKS : 8,
  NOT_IMPLEMENTED_WITH_MANUAL_CHECKS        : 9,
  RULE_DISABLED                             : 10,  
  RULE_FILTERED                             : 11
};

/**
 * @constant SEVERITY
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Severity of a rule results 
 *
 * @example
 * OpenAjax.a11y.SEVERITY.NONE    
 * OpenAjax.a11y.SEVERITY.VIOLATION        
 * OpenAjax.a11y.SEVERITY.WARNING          
 * OpenAjax.a11y.SEVERITY.MANUAL_CHECK
 * OpenAjax.a11y.SEVERITY.HIDDEN           
 * OpenAjax.a11y.SEVERITY.NOT_EVALUATED    
 * OpenAjax.a11y.SEVERITY.PASS             
 * OpenAjax.a11y.SEVERITY.PASS_LEVEL_A             
 * OpenAjax.a11y.SEVERITY.PASS_LEVEL_AA             
 * OpenAjax.a11y.SEVERITY.PASS_LEVEL_AAA             
 */
OpenAjax.a11y.SEVERITY = OpenAjax.a11y.SEVERITY || {
  NONE           : 0,
  VIOLATION      : 1, 
  WARNING        : 2,
  MANUAL_CHECK   : 3,
  HIDDEN         : 4,  // Content is hidden and not tested for accessibility
  NOT_APPLICABLE : 5,
  PASS           : 6,
  PASS_LEVEL_A   : 7,
  PASS_LEVEL_AA  : 8,
  PASS_LEVEL_AAA : 9
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
  "none",
  "violation",
  "warning",
  "manual_check",
  "hidden",
  "not_evaluated",
  "passed",
  "passed",
  "passed",
  "passed"
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
 * OpenAjax.a11y.REFERENCES.SPECIFICATION     
 * OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE        
 * OpenAjax.a11y.REFERENCES.TECHNIQUE        
 * OpenAjax.a11y.REFERENCES.EXAMPLE 
 * OpenAjax.a11y.REFERENCES.MANUAL_CHECK
 * OpenAjax.a11y.REFERENCES.AUTHORING_TOOL     
 * OpenAjax.a11y.REFERENCES.OTHER         
 */ 
 
OpenAjax.a11y.REFERENCES = OpenAjax.a11y.REFERENCES || {
  UNKNOWN         : 0,
  SPECIFICATION   : 1,
  WCAG_TECHNIQUE  : 2,
  TECHNIQUE       : 3,
  EXAMPLE         : 4,
  MANUAL_CHECK    : 5,
  AUTHORING_TOOL  : 6,
  LIBRARY_PRODUCT : 7,
  OTHER           : 8
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
 * OpenAjax.a11y.SOURCE.TEXT_CONTENT
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
  TEXT_CONTENT         : 8,
  ARIA_LABELLEDBY      : 9,
  ARIA_LABEL           : 10
};

/**
 * @constant HEADER_SOURCE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc What markup was used as the source for table cell headers
 * @example
 * OpenAjax.a11y.HEADER_SOURCE.NONE
 * OpenAjax.a11y.HEADER_SOURCE.HEADERS_ATTRIBUTE
 * OpenAjax.a11y.HEADER_SOURCE.ROW_OR_COLUMN_HEADERS
 */
OpenAjax.a11y.HEADER_SOURCE = OpenAjax.a11y.HEADER_SOURCE || {
  NONE                  : 1,
  HEADERS_ATTRIBUTE     : 2,
  ROW_OR_COLUMN_HEADERS : 3
};


/**
 * @constant CONTROL_TYPE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Indentify the cache control element type 
 *
 * @example
 * OpenAjax.a11y.CONTROL_TYPE.UNKNOWN  
 * OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT   
 * OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT   
 * OpenAjax.a11y.CONTROL_TYPE.CHECKBOX   
 * OpenAjax.a11y.CONTROL_TYPE.FIELDSET 
 * OpenAjax.a11y.CONTROL_TYPE.FORM     
 * OpenAjax.a11y.CONTROL_TYPE.HIDDEN   
 * OpenAjax.a11y.CONTROL_TYPE.IMAGE    
 * OpenAjax.a11y.CONTROL_TYPE.LABEL    
 * OpenAjax.a11y.CONTROL_TYPE.OPTION   
 * OpenAjax.a11y.CONTROL_TYPE.OPTGROUP   
 * OpenAjax.a11y.CONTROL_TYPE.PASSWORD 
 * OpenAjax.a11y.CONTROL_TYPE.RADIO    
 * OpenAjax.a11y.CONTROL_TYPE.RESET    
 * OpenAjax.a11y.CONTROL_TYPE.SELECT   
 * OpenAjax.a11y.CONTROL_TYPE.SUBMIT   
 * OpenAjax.a11y.CONTROL_TYPE.TEXT     
 * OpenAjax.a11y.CONTROL_TYPE.TEXTAREA 
 * OpenAjax.a11y.CONTROL_TYPE.WIDGET 
 */
OpenAjax.a11y.CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE || {
  UNKNOWN        : 1,
  BUTTON_ELEMENT : 2,
  BUTTON_INPUT   : 3,
  CHECKBOX       : 4,
  FIELDSET       : 5,
  FILE           : 6,
  FORM           : 7,
  HIDDEN         : 8,
  IMAGE          : 9,
  LABEL          : 10,
  OPTION         : 11,
  OPTGROUP       : 12,
  PASSWORD       : 13,
  RADIO          : 14,
  RESET          : 15,
  SELECT         : 16,
  SUBMIT         : 17,
  TEXT           : 18,
  TEXTAREA       : 19,
  WIDGET         : 20
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
 * @constant FILTERED_RULE_RESULT_RETURN_VALUE
 * @memberOf OpenAjax.a11y
 * @type Number
 * @desc Used for rule aggregation
 * @example
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.NO_MATCH
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.ADDED
 * OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE.NOT_ADDED
 */
OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE = OpenAjax.a11y.FILTERED_RULE_RESULT_RETURN_VALUE || {
  NO_MATCH  : 0,
  ADDED     : 1,
  NOT_ADDED : 2
};