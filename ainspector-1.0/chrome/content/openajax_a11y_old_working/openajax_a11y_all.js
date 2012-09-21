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
 * OpenAjax.a11y.RESULT_FILTER.MANUAL_CHECK
 * OpenAjax.a11y.RESULT_FILTER.HIDDEN
 * OpenAjax.a11y.RESULT_FILTER.NA
 */ 
OpenAjax.a11y.RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER || {
  ALL            : 63,
  PASS           : 1,
  VIOLATION      : 2,
  WARNING        : 4,
  MANUAL_CHECK   : 8,
  HIDDEN         : 16, // hidden only applies to node results 
  NOT_APPLICABLE : 32  // not applicable only applies to rule results
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
 * OpenAjax.a11y.RULE_CATEGORIES.ALL_DOM_ELEMENTS      
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
  COLOR_CONTRAST     : 4,
  CONTROLS           : 8,
  HEADINGS           : 16,
  IMAGES             : 32,
  LANDMARKS          : 64,
  LANGUAGE           : 128,
  LINKS              : 256,
  LISTS              : 512,
  TABLES             : 1024,
  VIDEO              : 2048,
  WIDGETS            : 4096,
  CONTENT            : 8192,
  // Composite categories
  ALL_DOM_ELEMENTS     : 8191,  // all categories
  WIDGETS_CONTROLS     : 4104,  // 4096+8
  AUDIO_VIDEO          : 2050,  // 2048+2
  HEADINGS_LANDMARKS   : 80,    // 16+64
  CONTENT_IN_LANDMARKS : 8256   // 64+8192
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
 */
OpenAjax.a11y.RULE_GROUP = OpenAjax.a11y.RULE_GROUP || {
  RULE_CATEGORIES : 1,
  WCAG20          : 2
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
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_APPLICABLE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.COMPLETE_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.ALMOST_COMPLETE
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.ALMOST_COMPLETE_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION_WITH_MANUAL_CHECKS
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_IMPLEMENTATED
 * OpenAjax.a11y.IMPLEMENTATION_LEVEL.NOT_IMPLEMENTATED_WITH_MANUAL_CHECKS
 */
OpenAjax.a11y.IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL || {
  NOT_APPLICABLE                            : 0,
  COMPLETE                                  : 1, 
  ALMOST_COMPLETE                           : 2,
  PARTIAL_IMPLEMENTATION                    : 3,
  NOT_IMPLEMENTED                           : 4,
  MANUAL_CHECKS                             : 5,
  COMPLETE_WITH_MANUAL_CHECKS               : 6,
  ALMOST_COMPLETE_WITH_MANUAL_CHECKS        : 7,
  PARTIAL_IMPLEMENTATION_WITH_MANUAL_CHECKS : 8,
  NOT_IMPLEMENTED_WITH_MANUAL_CHECKS        : 9
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
  OTHER           : 7
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
/*              ARIA Defintions and Validation Methods              */
/* ---------------------------------------------------------------- */


if (typeof OpenAjax.a11y.aria == "undefined") {
	OpenAjax.a11y.aria = {
			
		/*
		 * array of WAI-ARIA global states and properties
		 * @see http://www.w3.org/TR/wai-aria/#global_states
		 */
		globalProperties : [
            "aria-atomic", 
            "aria-busy", 
            "aria-controls", 
            "aria-describedby",
            "aria-disabled", 
            "aria-dropeffect", 
            "aria-flowto", 
            "aria-grabbed",
            "aria-haspopup", 
            "aria-hidden", 
            "aria-invalid", 
            "aria-label",
            "aria-labelledby", 
            "aria-live", 
            "aria-owns", 
            "aria-relevant"
        ],
	
        /*
         * XSD data types for all WAI-ARIA properties
         * along with valid values when the data type is NMTOKEN
         */
        propertyDataTypes : {
         	"aria-activedescendant" : {
         		type : "http://www.w3.org/2001/XMLSchema#idref"
         	},
         	"aria-atomic" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-autocomplete" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["inline", "list", "both", "none"]
         	},
         	"aria-busy" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-checked" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "mixed", "undefined"]
         	},
         	"aria-controls" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-describedby" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-disabled" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-dropeffect" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtokens",
         		values : ["copy", "move", "reference", "execute", "popup", "none"]
         	},
         	"aria-expanded" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-flowto" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-grabbed" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-haspopup" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-hidden" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-invalid" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "spelling", "grammar"]
         	},
         	"aria-label" : {
         		type : "http://www.w3.org/2001/XMLSchema#string"
         	},
         	"aria-labelledby" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-level" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-live" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["off", "polite", "assertive"]
         	},
         	"aria-multiline" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-multiselectable" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-owns" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-posinset" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-pressed" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "mixed", "undefined"]
         	},
         	"aria-readonly" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-relevant" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtokens",
         		values : ["additions", "removals", "text", "all"]
         	},
         	"aria-required" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-selected" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-setsize" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-sort" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["ascending", "descending", "other", "none"]
         	},
         	"aria-valuemax" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuemin" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuenow" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuetext" : {
         		type : "http://www.w3.org/2001/XMLSchema#string"
         	}
        },
        
        /*
         * list of abstract roles - used to support the WAI-ARIA role taxonomy and 
         * not to be used by content authors
         * @see http://www.w3.org/TR/wai-aria/roles#isAbstract
         */
        abstractRoles : [
            "command", 
            "composite", 
            "input", 
            "landmark", 
            "range",
            "roletype", 
            "section", 
            "sectionhead", 
            "select",
            "structure", 
            "widget", 
            "window"
        ],
                         
          /*
           * design patterns for concrete WAI-ARIA roles
           * legitimate keys for each role include:
           * 
           * - container: appropriate container(s) for that role
           * - props: states and properties that may be associated with this role (in addition to the global states and properties listed above)
           * - reqProps: required states or properties for this role
           * - reqChildren: required children for this role
           * - htmlEquiv: HTML equivalent for this role
           * - roleType: one of widget, landmark, or null 
           */
        designPatterns : {
         		
         	"alert" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		nameFromContent: false,
         		roleType : "live"     		
         	},
         	                
         	"alertdialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"application" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"article" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
          		nameFromContent: false,
         		roleType : "section"
        	},
         	
         	"banner" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"button" : {
         		container : null,
         		props : ["aria-expanded", "aria-pressed"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='button']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"checkbox" : {
         		container : null,
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='checkbox']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
             "columnheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-readonly", "aria-selected", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"combobox" : {
         		container : null,
         		props : ["aria-autocomplete", "aria-required", "aria-activedescendant"],
         		reqProps : ["aria-expanded"],
         		reqChildren : ["listbox", "textbox"],
         		htmlEquiv : "select",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"complementary" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"contentinfo" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"definition" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "region"
         	},
         	
         	"dialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"directory" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "list"
         	},
         	
         	"document" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
          		nameFromContent: false,
         		roleType : "structure"
        	},
         	
         	"form" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "form",
         		nameFromContent: false,
         		roleType : "landmark"
         	},	
         	
         	"grid" : {
         		container : null,
         		props : ["aria-level", "aria-multiselectable", "aria-readonly", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["row", "rowgroup"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"gridcell" : {
         		container : ["row"],
         		props : ["aria-readonly", "aria-selected", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"         		
         	},
         	
         	"group" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "fieldset",
         		nameFromContent: false,
         		roleType : "section"         		
         	},
         	
         	"heading" : {
         		container : null,
         		props : ["aria-level", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "h1 | h2 | h3 | h4 | h5 |h6",
         		nameFromContent: false,
         		roleType : "sectionhead"         		
         	},
         	
         	"img" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "img",
         		nameFromContent: false,
         		roleType : "section"         		
         	},
         	
         	"link" : {
         		container : null,
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "a",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"list" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : ["group", "listitem"],
         		htmlEquiv : "ul | ol",
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"listbox" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant", "aria-multiselectable", "aria-required"],
         		reqProps : null,
         		reqChildren : ["option"],
         		htmlEquiv : "select",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"listitem" : {
         		container : ["list"],
         		props : ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		nameFromContent: true,
         		htmlEquiv : "section"
         	},
         	
         	"log" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"main" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"marquee" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"math" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menu" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["menuitem", "menuitemcheckbox", "menuitemradio"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menubar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menuitem" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"menuitemcheckbox" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"menuitemradio" : {
         		container : ["menu", "menubar"],
         		props : ["aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"navigation" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"note" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"option" : {
         		container : ["listbox"],
         		props : ["aria-expanded", "aria-checked", "aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"presentation" : {
         		container : null,
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"progressbar" : {
         		container : null,
         		props : ["aria-valuetext", "aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"radio" : {
         		container : null,
         		props : ["aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='radio']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"radiogroup" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : ["radio"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"region" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "frame",
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"row" : {
         		container : ["grid", "treegrid", "rowgroup"],
         		props : ["aria-level", "aria-selected", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["gridcell", "rowheader", "columnheader"],
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"rowgroup" : {
         		container : ["grid"],
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"rowheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-required", "aria-readonly", "aria-selected"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"scrollbar" : {
         		container : null,
         		props : ["aria-valuetext"],
         		reqProps : ["aria-controls", "aria-orientation", "aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"search" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"separator" : {
         		container : null,
         		props : ["aria-expanded", "aria-orientation"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "structure"
         	},
         	
         	"slider" : {
         		container : null,
         		props : ["aria-orientation", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"spinbutton" : {
         		container : null,
         		props : ["aria-required", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"status" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"tab" : {
         		container : ["tablist"],
         		props : ["aria-selected", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tablist" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-level"],
         		reqProps : null,
         		reqChildren : ["tab"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tabpanel" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"textbox" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='text'] | textarea",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"timer" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"toolbar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tooltip" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tree" : {
         		container : null,
         		props : ["aria-multiselectable", "aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : ["group", "treeitem"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"treegrid" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-level", "aria-multiselectable", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"treeitem" : {
         		container : ["group", "tree"],
         		props : ["aria-checked", "aria-selected", "aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
            }
         	
        }, // end designPatterns
        
        getRoleObject : function(role) {
        
          var dp = this.designPatterns;

          for (var r in dp) {
          
            if (role == r)  return dp[r];
          
          }
        
          return null;
        }
        
    };	    
    
}
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
 * @function transformElementMarkup
 *
 * @memberOf OpenAjax.a11y.util
 * 
 * @desc Converts element markup in strings to capitalized text (default) or adds <code> element
 *
 * @param {String}  str  - String to convert element text
 * 
 * @return  String 
 */
 
OpenAjax.a11y.util.transformElementMarkup = function(str) {
 
  var new_str = "";
  
  var transform_option = 1; // default is capitalize
  
  if (OpenAjax.a11y.ELEMENT_FORMATING == "HTML") transform_option = 2; // transform to html
  if (OpenAjax.a11y.ELEMENT_FORMATING == "NONE") transform_option = 3; // just removes @ sign from string
  
  if (str && str.length) {
    var max = str.length; 
    var transform_flag = false;
    
    for (var i = 0; i < max; i++) {
    
      var c = str[i];
    
      if (c == '@') { 
      
        if (transform_option == 2) {
          if (transform_flag) 
            new_str += '</code>';
          else             
            new_str += '<code>';
        }    
      
        transform_flag = !transform_flag;
        continue;
      }  
      
      if (transform_flag && transform_option == 1) 
        new_str += c.toUpperCase();
      else
        new_str += c;
    }
  }
  return new_str;
};







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
   // OpenAjax.a11y.logger.debug( rgb_color + " " + color_hex );
   
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

 if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.AbbreviationItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.AbbreviationItem.prototype.getNodeResults = function () {
  return this.dom_elements[0].getNodeResults();
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
    
    // OpenAjax.a11y.logger.debug("color compare " + dom_text_node.computed_style.color + " with " + item.color );
    
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
  
  if (dom_element.type == Node.ELEMENT_NODE) {
    
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
  
  this.wcag_severity = OpenAjax.a11y.SEVERITY.NONE;
  
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getNodeResults = function () {
  return this.dom_text_nodes[0].getNodeResults();
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
 * @method getColorContrastSeverity
 *
 * @memberOf OpenAjax.a11y.cache.ColorContrastItem
 *
 * @desc Returns the WCAG 2.0 severity level of color contrast for the cache items
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.ColorContrastItem.prototype.getColorContrastSeverity = function () {

  var ro = {};
  
//  OpenAjax.a11y.logger.debug("Color contrast severity: " + this.wcag_severity);

  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  
  var severity = OpenAjax.a11y.cache_nls.getNLSSeverity(this.wcag_severity); 
  
  ro.label       = severity.label;
  ro.abbrev      = severity.abbrev;
  ro.description = severity.description;
  ro.tooltip     = severity.tooltip;
  ro.style       = SEVERITY_STYLE[this.wcag_severity];

  return ro;
  
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
  
  var str = this.dom_text_nodes.length;
  
  if (this.dom_text_nodes.length != 1) str += " elements"; 
  else str += " element";
    
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
 * @property {ControlElement}   control_element  - Parent ControlElement (if any)
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
 
};

/**
 * @method addChildControl
 * 
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 * 
 * @desc Adds a cache control element to the root tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 *
 * @return  {Number} Returns the number of control objects in the control_elements array
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addControlElement = function (control_element) {

//  OpenAjax.a11y.logger.debug("  Adding control element: " + control_element.dom_element.tag_name + " ("+ control_element.control_type + ")");

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

  // check for widget
 
  if (dom_element.is_widget) {
    
    we = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
    this.addLabel(we, "", OpenAjax.a11y.SOURCE.NONE);
    
    this.addControlElement(we);
    
    if (control_info.control_element) {
      control_info.control_element.addChildControl(we);   
    }
    else {
      this.addChildControl(we);     
    }
  
    ci.control_element = we;
  
  }
  else {

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
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_length = le.computed_label.length;

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
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_length = le.computed_label.length;
    
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
      this.addLabel(ie, "", OpenAjax.a11y.SOURCE.NONE);
      
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
      this.addLabel(be, "", OpenAjax.a11y.SOURCE.NONE);
      
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
      this.addLabel(te, "", OpenAjax.a11y.SOURCE.NONE);

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
      this.addLabel(se, "", OpenAjax.a11y.SOURCE.NONE);
  
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
  
      oe.computed_label = this.getElementTextContent(oe, false);
      oe.computed_label_length = oe.computed_label.length;

  
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
    
  }   

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

 if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getRuleResults
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Returns an array of rule results for the cache items in the controls cache 
 *
 * @param  {Number}  filter  - Filter for returning rules with particular type(s) of   
 *
 * @return {Array} Returns array of rule results, can be empty
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getRuleResults = function (filter) {

  function traverseCacheItems(cache_item) {
  
    var flag = false;
    var de = cache_item.dom_element;
    
    if ((local_filter & RESULT_FILTER.PASS)                  && de.rules_passed.length)        flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.VIOLATION)    && de.rules_violations.length)    flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.WARNING)      && de.rules_warnings.length)      flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.MANUAL_CHECK) && de.rules_manual_checks.length) flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.NA)       && de.rules_hidden.length)        flag = true; 
    
    if (flag) cache_items.push(cache_item);

    if (cache_item.child_cache_elements) {
      var child_cache_elements     = cache_item.child_cache_elements;
      var child_cache_elements_len = child_cache_elements.length;
  
      for (var i = 0; i < child_cache_elements_len; i++) {
        var ci = child_cache_elements[i];

        traverseCacheItems(ci);
      }
    }  
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var local_filter;

  if (!filter) 
    local_filter = RESULT_FILTER.ALL;
  else
    local_filter = filter;

  var rule_results = [];
  
  var child_cache_elements     = this.child_cache_elements;
  var child_cache_elements_len = child_cache_elements.length;
  
  for (var i = 0; i < child_cache_elements_len; i++) {
    var ci = child_cache_elements[i];

    traverseCacheItems(ci);
  
  } 

  return cache_items;

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

  for (var i = 0; i < this.label_elements.length; i++) {
    if (this.label_elements[i].cache_id == cache_id) return this.label_elements[i];
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
  if( dom_element.type == Node.TEXT_NODE ) {
   var text = dom_element.text;
   strings.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == Node.ELEMENT_NODE ) {
   
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

  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
    var de = ce.dom_element;
    
    if ( (de.aria_labelledby && de.aria_labelledby.length) || 
         (de.aria_label && de.aria_label.length) ||
         (de.widget_info)) {
         
      this.dom_cache.getNameFromARIALabel(ce);
      
      // If title attribute is the result clear label for use of other labeling techniques
      if (ce.computed_label_source == OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE && !ce.widget_info) {
        ce.computed_label = "";
        this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);
      }
    }
  }
};


/**
 * @method addFieldsetLegend
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds legend content to computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control  -  Control Object
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.addFieldsetLegend = function (control) {

   // Add fieldset/legend information if defined
   if (control.fieldset_element && 
       control.fieldset_element.legend_element) {
       control.computed_label = control.fieldset_element.legend_element.computed_label + " ";
       control.computed_label_length = control.computed_label.length;
   }
   
};

/**
 * @method addLabel
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds legend content to computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control -  Control Object
 * @param {String}  label   -  label text
 * @param {Number}  source  -  label source
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.addLabel = function (control, label, source) {

  if (source === OpenAjax.a11y.SOURCE.NONE) {
    control.computed_label  = "";
    if (control.widget_info) control.accessible_name = "";
  } else {
    this.addFieldsetLegend(control);
    control.computed_label += label + " ";
  }
  
  control.computed_label_length = control.computed_label.length;
  control.computed_label_source = source;
  control.computed_label_for_comparison = control.computed_label.normalizeSpace().toLowerCase();
   
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

  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;
  
  // first check if an label by reference
 
  for (var i = 0; i < label_elements_len; i++) {
 
    var le = label_elements[i];
 
    var id;
    if (le.for_id) {
      id = le.for_id;
    }
    else {
      id = null;
    }  

    if (id && id.length) {
      var ce = this.getControlElementById(id);
      
      if (ce) {

        // check to see if label defined (i.e. an ARIA technique)

        if (ce.computed_label.length === 0) {
          this.addLabel(ce, le.computed_label, OpenAjax.a11y.SOURCE.LABEL_REFERENCE);
          le.unused_label = false;          
          le.control_element = ce;
        }  
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

  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;
  
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
 
    switch (ce.control_type) {
  
    case OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT:
      this.addLabel(ce, this.getElementTextContent(ce, false), OpenAjax.a11y.SOURCE.TEXT_CONTENT);
      break;
  
    default:
    
      // first check if an label exists

      if (ce.computed_label.length === 0 && ce.label_element) {  
        this.addLabel(ce, ce.label_element.computed_label, OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION);
        ce.label_element.unused_label = false;
        ce.label_element.control_element = ce;
      }
      break;
    } // end switch 
  } // end loop
};

/**
 * @method calculateLabelsByOther
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of control elements and calculates the 
 *       accessible label for any control elements that do NOT have 
 *       a computed label, but has a VALUE, ALT or TITLE attribute value 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByOther = function () {

  var CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE;
  
  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label exits
 
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
 
    if (ce.computed_label.length === 0) {
      var de = ce.dom_element;

      switch (ce.control_type) {
  
      case CONTROL_TYPE.BUTTON_INPUT:
        if (ce.value && ce.value.length) {   
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);                  
        }
        break;
 
      case CONTROL_TYPE.IMAGE:

        if (de.alt) {
          this.addLabel(ce, de.alt, OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE);        
        }
        else {
          if (de.title && de.title.length) {
            this.addLabel(ce, de.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);       
          }
          else {
            this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);      
          }
        }  
        break;

      case CONTROL_TYPE.SUBMIT:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "SUBMIT", OpenAjax.a11y.SOURCE.BUTTON_TYPE);      
        }  
        break;

      case CONTROL_TYPE.RESET:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "RESET", OpenAjax.a11y.SOURCE.BUTTON_TYPE);      
        }  
        break;

      default:
    
        if (de.title &&
            de.title.length) {
          // first check if an label exists

          this.addLabel(ce, ce.dom_element.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);
        }

        break;
      } // end switch 
    }
  }
};

/**
 * @method calculateControlLabels
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Calculates labels for all form controls, based on the order of label 
 *       calculation techniques used by browsers to generate accessible names
 *       for accessibility APIs used by assistive technologies 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {

  // These functions are called in the order of overrides
  // Once a control has a label it is ignored by subsequent function calls
  this.calculateLabelsUsingARIA();
  this.calculateLabelsByReference();
  this.calculateLabelsByEncapsulation();
  this.calculateLabelsByOther();
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
 * @property  {String}  name_attribute  - The value of the name attribute of the form control
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
  
  this.name_attribute   = dom_element.node.name;
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 if (this.legend_element)  
   return "fieldset: has legend";
 else
   return "fieldset: no legend"; 
     
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
 * @property  {String}           computed_label                - Text content of the legend element 
 * @property  {String}           computed_label_for_comparison - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.LEGEND;
 
  this.fieldset_element = control_info.fieldset_element;
  
  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_for_comparison = "";

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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LegendElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 if (this.computed_label.length) 
   return "legend: " + this.computed_label; 
 else
   return "legend: empty"; 
 
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
 * @property  {String}      computed_label                 - Text content of the label element 
 * @property  {Number}      computed_label_len             - Length of the computed label  
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {Boolean}     unused_label                   - Boolean indicting where the label references a form control 
 * @property  {Object}      control_element    - Reference to the control that the label elements is associated with  
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this label is nested in
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

 this.dom_element    = dom_element;
 this.cache_id       = "";
 this.document_order = 0;
 
 this.child_cache_elements = [];
 
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.LABEL;

 this.computed_label = "";
 this.computed_label_length = 0;
 this.computed_label_for_comparison = "";

 this.unused_label    =  true;
 this.control_element =  null;

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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LabelElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 if (this.computed_label.length) 
   return "label: " + this.computed_label; 
 else
   return "label: empty"; 
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
 * @property  {String}      name_attribute        - Text content of the name attribute  
 *
 * @property  {String}      computed_label                 - Calculated label for the input element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {Number}      computed_label_source          - Constant representing how a label was calculated 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
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
  
  
  this.value   = node.value; 
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type  = OpenAjax.a11y.CONTROL_TYPE.UNKNOWN; 

  this.type = "text";  
  if (node.type) this.type = node.type; 

  switch (node.type) {
 
  case 'button':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT; 
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
    break;

  case 'submit':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.SUBMIT; 
    break;
    
  case 'reset':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RESET; 
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.InputElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');

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
 * @method getNLSLabel
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

OpenAjax.a11y.cache.InputElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
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
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
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
 * @property  {String}      name_attribute  - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this button element is nested in
 *
 * @property  {String}     computed_label                  - Calculated label for the button element 
 * @property  {Number}     computed_label_length           - Length of the label property 
 * @property  {String}     computed_ label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {String}     readonly              - The value of the readonly attribute 
 * @property  {String}     disabled              - The value of the disabled attribute
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

  this.dom_element = dom_element;
  this.cache_id    = "";
  
  this.child_cache_elements = [];
 
  var node = dom_element.node;
 
  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT; 
 
  this.name_attribute = node.getAttribute('name');
  
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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
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
 * @method getNLSLabel
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

OpenAjax.a11y.cache.ButtonElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
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
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
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
 return "button"; 
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
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {String}      computed_label                 - Calculated label for the textarea element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
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
  this.type = "textarea";  

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.TEXTAREA;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
  
  this.name_attribute  = node.getAttribute('name');
  
  this.rows = node.rows; 
  this.cols = node.cols; 
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
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
 * @method getNLSLabel
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

OpenAjax.a11y.cache.TextareaElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
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
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
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
 return "Textarea"; 
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
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - String indicating the type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Array}       option_elements       - Array of child cache option elements  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this select element is nested in
 *
 * @property  {String}      computed_label                 - Calculated label for the select element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
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

  this.name_attribute  = node.getAttribute('name');
  this.type = "select";
  
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
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SelectElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
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
 * @method getNLSLabel
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

OpenAjax.a11y.cache.SelectElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
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
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
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
 * @property  {String}      computed_label                 - Calculated label for the select element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";
 
 this.child_cache_elements = [];
         
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.OPTGROUP;
 
 this.select_element = control_info.select_element;
         
 this.computed_label = dom_element.node.computed_label;
 this.computed_label_length = this.computed_label.length;
 this.computed_label_for_comparison = this.computed_label.normalizeSpace().toLowerCase();
 
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptionElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
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

/* ---------------------------------------------------------------- */
/*                       WidgetElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor WidgetElement
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
 * @property  {String}      type                  - String indicating the type of input element  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {String}      name_attribute        - Text content of the name attribute  
 *
 * @property  {String}  computed_label                 - Calculated label for the input element 
 * @property  {Number}  computed_label_length          - Length of the label property 
 * @property  {Number}  computed_label_source          - Constant representing how a label was calculated 
 * @property  {String}  computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}  readonly  - The value of the readonly attribute 
 * @property  {String}  disabled  - The value of the disabled attribute
 * @property  {String}  value     - The value of the readonly attribute 
 * @property  {String}  checked   - The value of the disabled attribute
 */

OpenAjax.a11y.cache.WidgetElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
  this.cache_id    = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.type    = node.type; 
  this.value   = node.value; 
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.WIDGET; 
  
  this.label_element    = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidegtElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.WidgetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getAttributes = function (unsorted) {

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
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return {String} Returns string represention the InputElement object
 */
 
OpenAjax.a11y.cache.WidgetElement.prototype.toString = function () {
  
  return this.dom_element.tag_name + ": " + this.dom_element.role;
  
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
 * @method getItemsByNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns an array of cache items with node results based on the filter 
 *
 * @param  {Number}  filter  - Filter for returning items with node results of a 
 *                             particular type(s)  
 *
 * @return {Array} Returns array of cache items, can be empty
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemsByNodeResults = function (filter, all_flag) {

  return OpenAjax.a11y.util.getItemsByNodeResults(this.dom_elements, filter, all_flag);

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
 *
 * @property  {LandmarkElement}  parent_landmark - LandmarkElement object that contains the text content
 *
 * @property {Number}  type - Type of DOM node element or text
 * @property {String}  text - Text content of DOM text node
 *
 * @property {String}   text_normalized         - Normalized text in the node
 * @property {Number}   text_length             - length of the normalized text in the node 
 * 
 * @property {String}  cache_id        - String that uniquely identifies the cache element in the DOMCache
 * @property {Number}  document_order  - The ordinal position of this DOM text node in the DOM
 *
 * @property {Object}  computed_style  - Object that contains information about run time styling of the node
 * @property {Object}  events          - Object that contains information about event handlers attached to the node and its descendents
 *
 * @property {Boolean}  has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}    rules_violations       - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}    rules_manual_checks    - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}    rules_warnings         - Array of NodeResult objects with severity of 'Warning'
 * @property {Array}    rules_passed           - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}    rules_hidden           - Array of NodeResult objects with severity of 'Hidden'
 */
 
OpenAjax.a11y.cache.DOMText = function (node, parent_element) {

  this.type = Node.TEXT_NODE;
  this.text = node.data;
  this.parent_element = parent_element;
 
  this.parent_landmark      = null;
 
  this.text_normalized = this.text.normalizeSpace();
  var text_length      = this.text_normalized.length;
  this.text_length     = text_length; 
  
  parent_element.addToCharacterCount(text_length);
 
  this.computed_style = parent_element.computed_style;
 
  // Create areas to store rule results associates with this node
  this.has_rule_results = false;
  this.rules_violations                = [];
  this.rules_manual_checks             = [];
  this.rules_warnings                  = [];
  this.rules_passed                    = [];
  this.rules_hidden                    = [];
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMText.prototype.getNodeResults = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
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

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_violations.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
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
  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');
  
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');
  
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

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_warnings, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style  = SEVERITY_STYLE[SEVERITY.WARNING];
    last_severity_value = SEVERITY.WARNING;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
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
 * @method getColorContrastNodeResult
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns a node result for a color contrast rule
 *
 * @return {Object} Returns node result object of a color contrast rule
 */
 
OpenAjax.a11y.cache.DOMText.prototype.getColorContrastNodeResult = function() {

  function findColorContrastRule(node_results) {
   
    var node_results_len = node_results.length;
    
    for (var i = 0; i < node_results_len; i++ ) {
    
      var node_result = node_results[i];
      
      var rule = node_result.getRule();
      
      if (!rule) continue;
      
      if (rule.rule_id == "COLOR_1") return node_result;      
      if (rule.rule_id == "COLOR_2") return node_result;
    
    }
  
    return null;
  }

  var nr = findColorContrastRule(this.rules_violations);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_manual_checks);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_warnings);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_passed);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_hidden);
  if (nr) return nr;
  
  return null;

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

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text representation of a DOMText element
 *
 * @return {String} Returns a string representing the DOM text node
 */
 
OpenAjax.a11y.cache.DOMText.prototype.toString = function(option) {
  var str;
  
  if (option == 'text') str = "'" +  this.text_normalized + "'";
  else str = this.parent_element.tag_name + ": '" +  this.text_normalized + "'";
  
  return str;
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
 *
 * @property {Number}     type                - Type of DOM node is element  
 * @property {Number}     document_order      - The ordinal position of this DOM element node in the DOM
 * 
 * @property {Object}     node                - Reference to the 'live' DOM element represented by this object
 * @property {String}     tag_name            - Tag name of the HTML element in lowercase characters (i.e. p, div, h1, span ...)
 * @property {Array}      aria_properties     - Array of ARIA properties and states defined for the node
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
 * @property {Array}      aria_properties     - Arrary of property name and value objects for any attribute 
 *                                              beginning with 'aria-'
 *
 * @property {Boolean}    is_widget           - True if element is a ARIA widget, otherwise false
 * @property {Boolean}    is_landmark         - True if element is a ARIA landmark, otherwise false
 * @property {Boolean}    is_live             - True if element is a ARIA live region, otherwise false
 *
 * @property {Object}     widget_info         - Object containing information about a widget
 *
 * @property {Object}     events              - Object that contains information about events associated with the node
 * @property {Object}     computed_style      - Object that contains information about run time styling of the node
 *
 * @property {Boolean}    has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}      rules_passed           - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}      rules_violations       - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}      rules_manual_checks    - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}      rules_warnings         - Array of NodeResult objects with severity of 'Warning'
 * @property {Array}      rules_hidden           - Array of NodeResult objects with severity of 'Hidden'
 *
 * @param {DOM node Object}    node            - The DOM text node 
 * @param {DOMElement Object}  parent_element  - DOMElement object that is the parent DOMElement object in the tree
 */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element) {

  function addAriaAttribute (name, value) {
  
     var av = {};
     av.attribute = attr.name;
     av.value = attr.value;
     
     aria_properties.push(av);
     
   }

  var i;
  var attr;
  var attributes;
  var attributes_len;
  var av_object;

  // check to make sure it is a valid node
  if (node === null) return null;

  this.has_element_children = false;
 
  this.type           = Node.ELEMENT_NODE;
  this.document_order = 0;
  this.node           = node;
  this.tag_name       = node.tagName.toLowerCase();
  this.id             = node.id;
 
  if (!this.id || this.id.length === 0) {
    this.id_unique  = OpenAjax.a11y.ID.NOT_DEFINED;
  }
  else {
    this.id_unique  = OpenAjax.a11y.ID.UNIQUE;  
  }
 
  this.character_count = 0;

  // Save relationships with other elements
  this.parent_element = parent_dom_element;
  this.child_dom_elements = [];
  var aria_properties = [];
 
  this.parent_landmark = null;

  // Cache important attributes for accessibility
  i = 0;
  attr = null;
  attributes = node.attributes;
  attributes_len = attributes.length;

  this.className = "";
  this.has_alt_attribute    = false;
  this.has_aria_describedby = false;

  this.is_widget = false;
  this.widget_info = null;
  this.is_landmark = false;
  this.is_live = false;

  for (i = 0; i < attributes.length; i++) {

    attr = attributes[i];

    switch (attr.name) {

    case 'class':
      this.class_name = attr.value.toLowerCase();
      break;

    case 'role':
      var role = attr.value.toLowerCase();
    
      this.role = role;
    
      var role_object = OpenAjax.a11y.aria.getRoleObject(role);
      
      if (!role_object || !role_object.roleType) break;
      
      switch (role_object.roleType) {
    
      case 'widget':
        this.is_widget = true;
        this.widget_info = role_object;
        break;
      
      case 'landmark':
        this.is_landmark = true;
        break;
      
      case 'live':
        this.is_live = true;
        break;
      
      default:
        break;
    
      } // end switch

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
      addAriaAttribute('aria-describedby', attr.value);
      break;

    case 'aria-hidden':
      this.aria_hidden = attr.value.toLowerCase();
      addAriaAttribute('aria-hidden', attr.value);
      break;

    case 'aria-label':
      this.aria_label = attr.value;
      addAriaAttribute('aria-label', attr.value);
      break;

    case 'aria-labelledby':
      this.aria_labelledby  = attr.value;
      addAriaAttribute('aria-labelledby', attr.value);
      break;

    case 'aria-live':
      this.is_live  = true;
      addAriaAttribute('aria-live', attr.value);
      break;

    default:

      if (attr.name.indexOf('aria-') === 0 ) {
        addAriaAttribute(attr.name, attr.value);
      }
      break;

    } // end switch
  } // end loop
  
 this.aria_properties = aria_properties;

 this.supports_events = OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS;

 if (OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS) {
  this.events = this.EnumerateFirefoxEvents(node, parent_dom_element);
 }
 else {
  this.events = {};
  this.events.supports_events = false;
 }


 // Create areas to store rule results associates with this node
 this.has_rule_results = false;
 this.rules_violations                = [];
 this.rules_manual_checks             = [];
 this.rules_warnings                  = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getNodeResults = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
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

  if (this.has_aria_describedby) return cache_nls.getNLSLabelAndValue('has_aria_describedby', this.has_aria_describedby).value;

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

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_violations.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
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

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_warnings, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style  = SEVERITY_STYLE[SEVERITY.WARNING];
    last_severity_value = SEVERITY.WARNING;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
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
  var av_object;
 
  var attributes  = [];

  if (this.tag_name === 'img'  || 
      this.tag_name === 'area' || 
      this.tag_name === 'applet') cache_nls.addPropertyIfDefined(attributes, this, 'alt');

  if (this.id.length) cache_nls.addPropertyIfDefined(attributes, this, 'id');  
  cache_nls.addPropertyIfDefined(attributes, this, 'class_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'role');
  
  for (i = 0; i < this.aria_properties.length; i++) {
    av = this.aria_properties[i];
    attributes.push(cache_nls.getNLSLabelAndValue(av.attribute, av.value));
  }
  
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

  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');

  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');
  cache_nls.addPropertyIfDefined(properties, this, 'is_landmark');
  cache_nls.addPropertyIfDefined(properties, this, 'is_live');
  
  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');

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

//  OpenAjax.a11y.logger.debug("dom element property: " + property + " value= " + this[property]);

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

 if (this.tag_name == 'iframe' || this.tag_name == 'frame' || this.tag_name == 'body')
   this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, null);
 else this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
   
 
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
    if( dom_element.type == Node.TEXT_NODE ) {
      strings.push( dom_element.text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
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
    if( dom_element.type == Node.TEXT_NODE ) {
      var text = dom_element.text;
      strings.push( text );
      texts.push( text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
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
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getElementCount = function() {

  function countElements(dom_element) {
    // If text node get the text and return
    if( dom_element.type == Node.ELEMENT_NODE ) {
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
 var str = this.tag_name;
 
 if (this.role && this.role.length) return str + "[" + this.role + "]";
 if (this.id && this.id.length) return str + "#" + this.id;
 
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
 * @param  table_info        Object  TableInfo object containing current table information for tree representations
 * @param  control_info      Object  ControlInfo object containing current control information for tree representations
 * @param  list_info         Object  Current LanguageElement object that contains the DOMElement
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

 if (dom_element.type == Node.ELEMENT_NODE) {

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);
  this.media_cache.updateCacheItems(dom_element);

  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
  var li = this.lists_cache.updateCacheItems(dom_element, list_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);

  var children_length = dom_element.child_dom_elements.length;
  for (var i = 0; i<children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.child_dom_elements[i], hi, ti, ci, li);
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
  // OpenAjax.a11y.logger.debug("Creating DOM elements from body element");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements");
  this.updateDOMElements(this.document.body, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.logger.debug("Creating DOM elements with frames");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements using frames");
  this.updateDOMElements(this.document, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }

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

  case Node.DOCUMENT_NODE:
  case Node.DOCUMENT_TYPE_NODE:
    // OpenAjax.a11y.logger.debug("Document node type");
    break;

  case Node.ELEMENT_NODE:
    // OpenAjax.a11y.logger.debug(node.tagName);
    
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
        dom_element.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
      }
      
      this.element_with_id_cache.dom_elements.push(dom_element);
            
    }

    switch (dom_element.tag_name) {

    case 'frame':
    case 'iframe':

      var frame_doc = node.contentWindow.document;

//      OpenAjax.a11y.logger.debug("frame: " + node.src + " " + frame_doc);

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

  case Node.TEXT_NODE:
    // OpenAjax.a11y.logger.debug("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);

   if (dom_text.text_length) {
   
     if (!previous_sibling || previous_sibling.type == Node.ELEMENT_NODE) {
   
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
 * @desc Calculates a computed label and accessible name based on ARIA properties
 *
 * @param {Object} control - Control cache element object
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameFromARIALabel = function (control) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var computed_label = "";
  var computed_label_source = SOURCE.NONE;
  var de = control.dom_element;
  var wi = de.widget_info;
  
  if (de.aria_labelledby) {
    computed_label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    computed_label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else if (de.aria_label) {
    computed_label = de.aria_label;
    computed_label_source = SOURCE.ARIA_LABEL;
  }
  else if (wi && wi.nameFromContent) {
    computed_label = de.getText();
    computed_label_source = SOURCE.TEXT_CONTENT;
  } else if (de.title) {
    computed_label = de.title;
    computed_label_source = SOURCE.TITLE_ATTRIBUTE;
  }

  control.computed_label = computed_label;
  control.computed_label_length = computed_label.length;
  control.computed_label_source = computed_label_source;
  control.computed_label_for_comparison = computed_label.normalizeSpace().toLowerCase();
  control.accessible_name = computed_label;

  this.getDescriptionFromARIADescribedby(control);
};

/**
 * @method getDescriptionFromARIADescribedby
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description based on ARIA properties
 *
 * @param {Object} element - Cache element object
 */

OpenAjax.a11y.cache.DOMCache.prototype.getDescriptionFromARIADescribedby = function (element) {

  var de = element.dom_element;
  
  if (de.aria_describedby) {
    element.accessible_description = this.element_with_id_cache.getTextFromIds(de.aria_describedby);
  }
  else {
    element.accessible_description = "";  
  }
  
};


/**
 * @method getTextFromIDs
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
 
  for (i = 0; i < objects_len; i++) {
    return_objects[i] = objects[i];
    return_objects[i].duplicate = false;
  }  

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
 * @property {Landmark/Heading Object}  landmark_element  - Parent landmark element 
 * @property {Landmark/Heading Object}  landmark_element  - Parent main landmark element 
 * @property {Landmark/Heading Object}  landmark_element  - Parent page object element 
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
    this.main_element     = landmark_info.main_element;
    this.page_element     = landmark_info.page_element;
  }
  else {
    this.landmark_element = null;
    this.main_element     = null;
    this.page_element     = null;
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
 * @property {Array}   main_elements  - List of all the main landmark elements in the document 
 * @property {Number}  main_length    - The length of the main landmark elements list, used in calculating cache id values 
 *
 * @property {Array}   h1_elements    - List of all the h1 heading elements in the document 
 * @property {Number}  h1_length      - The length of the main landmark elements list, used in calculating cache id values 
 *
 * @property {Boolean}  has_main_landmarks  - True if document contians at lewast one main landmark, otherwise false
 * @property {Boolean}  has_title           - Title element is defined in the document 
 *
 * @property {TitleElement} title_element  - The title element is used as a placeholder for title rule results 
 * @property {PageElement}  page_element   - The body element is used as a placeholder rule results for items missing in a document like H1 elements and Main landmarks
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
  
  this.main_elements = [];
  this.main_length   = 0;
  
  this.h1_elements   = [];
  this.h1_length     = 0;
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

  this.title_element = null;  
  this.page_element  = null;  
   
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
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Adds a main landmark or h1 heading element object to the root level of a tree of title and main elements  
 *
 * @param {MainElement | H1Element}  child_element - Main landmark or h1 heading element object to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildMainElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  } 

};

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a h1 element object to the h1 heading elements list
 *
 * @param  {H1Element}  h1_element  -  h1 heading element to add 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addH1Element = function (h1_element) {

  if (h1_element && h1_element.main_type === OpenAjax.a11y.MAIN.H1_ELEMENT) {
    this.h1_length = this.h1_length + 1;
    h1_element.document_order = this.h1_length;
    h1_element.cache_id = "h1_" + this.h1_length;
    this.h1_elements.push(h1_element);
  } 

};

/**
 * @method addMainElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc    Adds a main, h1 or title element object to the main_elements array and cacluates a cache id value
 *
 * @param  {MainElement | H1Element | TitleElement | PageElement}  main_element  Main, h1 heading or title element object to add 
 *
 * @return  {Number}  length is the number of elements in the main_elements list
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
 
  this.main_elements = [];
  this.main_length   = 0;
  
  this.h1_elements   = [];
  this.h1_length     = 0;
  
  this.page_element = null;
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

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
  var tag_name = dom_element.tag_name;
  
  dom_element.parent_landmark = landmark_info.landmark_element;
  
  if (dom_element.type == Node.ELEMENT_NODE) {

    if (dom_element.is_landmark) {
    
      if (dom_element.role == 'main') {
   
        this.has_main_landmarks = true;
 
        me = new OpenAjax.a11y.cache.MainElement(dom_element, dom_element, landmark_info.landmark_element);    

        this.dom_cache.getNameFromARIALabel(me);

        this.addMainElement(me);  

        if (landmark_info.landmark_element) {
          landmark_info.landmark_element.addChildElement(me);
        } 
        else {
          this.addChildElement(me);  
        }

        li.landmark_element = me;
        li.main_element     = me;
    
        return li;
      }
      else {
   
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
    }
    
    if (tag_name == 'h1') {
  
      this.has_h1_elements = true;
  
      he = new OpenAjax.a11y.cache.H1Element(dom_element, landmark_info.landmark_element, landmark_info.main_element);    

      this.addH1Element(he);

      if (landmark_info.main_element) { 
        landmark_info.main_element.addH1Element(he);
      }  

      if (landmark_info.landmark_element) {
        landmark_info.landmark_element.addChildElement(he);
      } 
      else {
        this.addChildElement(he);  
      }

      he.isH1UsedAsLabelForMainRole();

      return li;
    }

    if ((tag_name == 'h2') || 
        (tag_name == 'h3') || 
        (tag_name == 'h4') || 
        (tag_name == 'h5') || 
        (tag_name == 'h6')) {
   
      he = new OpenAjax.a11y.cache.HeadingElement(dom_element, landmark_info.landmark_element);    
  
      this.addHeadingElement(he);

      if (landmark_info.landmark_element) {
        landmark_info.landmark_element.addChildElement(he);
      } 
      else {
        this.addChildElement(he);  
      }

      return li;
    }
    
    if (tag_name == 'title' && !this.has_title) {
  
      me = new OpenAjax.a11y.cache.TitleElement(dom_element, li.main_element);    
   
      // There is only one title for a document, even when there are frames and iframes
      this.has_title = true;

      this.title_element = me;
    
      return li;
    }

    if (tag_name == 'body' && !this.page_element) {
  
      me = new OpenAjax.a11y.cache.PageElement(dom_element, li.main_element);    
   
      // There is only one body element for a document, even when there are frames and iframes
      this.page_element = me;
    
      return li;
    }
    
    
    
    // elements that do contain rendered content without having child dom text nodes
    if ((tag_name == 'area')     ||
        (tag_name == 'canvas')   ||
        (tag_name == 'input')    ||
        (tag_name == 'img')      ||
        (tag_name == 'textarea') ||
        (tag_name == 'select')) {
        
      this.elements_with_content.push(dom_element);
      return li;
    }  

    // elements that may have rendered content without having child dom text nodes
    if ((tag_name == 'applet')   ||
        (tag_name == 'embed')    ||
        (tag_name == 'object')) {
      dom_element.may_have_renderable_content = true;  
      this.elements_with_content.push(dom_element);
      return li;
    }  



  }
  else {
    tag_name = dom_element.parent_element.tag_name;
    if (tag_name != 'title'  && 
        tag_name != 'script' && 
        tag_name != 'style'  &&
        dom_element.text_length) {
      this.elements_with_content.push(dom_element);
    }  
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

  if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @property  {String}      role            - String representing the type of landmark
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
  this.role                  = dom_element.role;

  this.child_cache_elements  = [];

  this.parent_landmark       = parent_landmark;
 
  this.computed_label                 = "";
  this.computed_label_length          = 0;
  this.computed_label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison  = "";
  this.accessible_name                = "";

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');

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
 var de = this.dom_element;
 if (this.accessible_name && this.accessible_name.length) return de.tag_name + "[" + de.role + "]: " + this.accessible_name;  
 return de.tag_name + "[" + de.role + "]";   
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
 * @property  {Object}  parent_landmark     - Cache item object that is the parent landmark element (note: can be null)
 * @property  {Number}  level               - Level of the heading
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {String}   name_from_text_nodes  - Accessible name content from text nodes
 * @property  {String}   name_from_image_alt   - Accessible name content from alt content of images
 * @property  {Number}   image_count           - Number of images that are descendents of the link
 * @property  {Boolean}  text_only_from_image  - true if accessble name is onky from an image, otherwise false 
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element, parent_landmark) {
 
  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;
  
  this.parent_landmark = parent_landmark;
   
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
  
  return this;
    
};


/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');
 
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

//  OpenAjax.a11y.logger.debug("Heading property: " + property + " value= " + this[property]);

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
    return "h" + this.level + ": " + this.name;
  }
  else {
    return "h" + this.level + ": no content";
  }

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
 * @property  {String}       role             - String identifying the landmark as "main"
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree 
 *
 * @property  {Array}   h1_elements  -  List of all the h1 heading elements that are children of the main landmark
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
  this.role            = "main";

  this.child_cache_elements = [];
  this.h1_elements          = [];
  this.main_type            = OpenAjax.a11y.MAIN.ROLE_MAIN;
  
  this.parent_landmark = parent_landmark; // restricted to main landmarks
 
  this.computed_label                 = "";
  this.computed_label_length          = 0;
  this.computed_label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.computed_label_for_comparison  = "";
  this.accessible_name                = "";

}; 


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a child landmark or heading object to the tree of landmarks and heading elements  
 *
 * @param {Object}  cache_element  -  landmark or heading element object to add to the tree
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildElement = function (cache_element) {

  if (cache_element) {
    this.child_cache_elements.push(cache_element); 
  }  

}; 

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a H1 element to the list of H1 elements that are a child elements of the main content   
 *
 * @param {H1Element}  h1_element  -  H1 element object to add to list 
 */

OpenAjax.a11y.cache.MainElement.prototype.addH1Element = function (h1_element) {

  if (h1_element) {
    this.h1_elements.push(h1_element); 
  }  

}; 



/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MainElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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

  cache_nls.addPropertyIfDefined(properties, this, 'computed_label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');

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
  if (this.accessible_name && this.accessible_name.length) return this.dom_element.tag_name + "[main]: " + this.accessible_name;  
  return this.dom_element.tag_name + "[main]";  
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
 * @param  {DOMelement}       dom_element      - The dom element object representing the heading element 
 * @param  {LandmarkElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 * @param  {MainElement}      main_landmark    - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {LandmarkElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 * @property  {MainElement}      main_landmark    - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type               -  Constant representing the type of main landmark
 * @property  {Boolean}  is_label_for_main  - true if h1 is being used as a label for main landmark, otherwise false
 * @property  {Boolean}  is_child_of_main   - true if h1 is the child of the main landmark it is a label for, otherwise false
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.H1Element = function (dom_element, parent_landmark, main_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";  
  this.document_order  = 0;
  
  this.parent_landmark  = parent_landmark; // restricted to main landmarks
  this.main_landmark    = main_landmark;   // restricted to main landmarks
  this.child_cache_elements = [];   // The child array is always empty for an H1Element

  
  this.main_type            = OpenAjax.a11y.MAIN.H1_ELEMENT;
  this.is_label_for_main    = false;
  this.is_child_of_main     = false;

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
      this.main_landmark === null) {
    this.is_label_for_main = false;  
    this.is_child_of_main  = false;  
    return;
  }  

  var me = this.main_landmark;
  var de = me.dom_element;

  if (de.aria_labelledby && de.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    this.is_label_for_main = true;   
  }
  
  if (me) {
    var h1_elements = me.h1_elements;
    
    OpenAjax.a11y.logger.debug("Number of H1 elements: " + h1_elements.length + " (" + me + ")");
    
    for (var i = 0; i < h1_elements.length; i++) {
      OpenAjax.a11y.logger.debug("  H1 elements: " + this + " " + h1_elements[i]);
      if (this === h1_elements[i] ) {
        this.is_child_of_main = true;
        break;
      }
    }
    
  }
    
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.H1Element.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 cache_nls.addPropertyIfDefined(properties, this, 'is_label_for_main');
 cache_nls.addPropertyIfDefined(properties, this, 'is_child_of_main');
 
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
  if (this.name && this.name.length) return "h1: " + this.name; 
  else return "h1: no content";
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
  this.cache_id        = "title";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.TITLE_ELEMENT;

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  this.child_cache_elements = [];  // This array is always empty for the title element

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = this.name.normalizeSpace().toLowerCase();
  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TitleElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  str = "title: ";
  
  if (this.name.length) str += this.name;  
  else str += 'no content';
  
  return str;
};


/* ---------------------------------------------------------------- */
/*                       PageElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor PageElement
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

OpenAjax.a11y.cache.PageElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "page";
  this.document_order  = 0;
  this.is_page_element = true;

  this.main_type          = OpenAjax.a11y.MAIN.BODY_ELEMENT;

  this.child_cache_elements = []; // this is always empty for the body element

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  
  this.num_main_landmarks = 0;          // are defined in landmark rules
  this.num_visible_main_landmarks = 0;  // are defined in landmark rules
  
}; 

/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Adds a main landmark  object to the tree of title and main elements  
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add 
 */

OpenAjax.a11y.cache.PageElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element); 
  }  

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.PageElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.PageElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.PageElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.PageElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.PageElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.PageElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns a text string representation of the title element 
 *
 * @return {String} Returns string represention the title element object
 */
  
OpenAjax.a11y.cache.PageElement.prototype.toString = function () {
  return "page";  
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
      (dom_element.tag_name == 'area')) {

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

  if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @property  {String}   source             - The url in the src property of an image element or href property of an area element 
 * @property  {Boolean}  src_is_a_file_name - The filename is an image file and not a data base or other programatic reference
 * @property  {String}   file_name          - The filename of the image
 * @property  {String}   longdesc           - The url in the longdesc property of an image element  
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
    
    var file_name = "";
    this.src_is_a_file_name = false;
    
    if (this.source.length && pos >= 0 ) {
      file_name = this.source.substring((pos+1)).toLowerCase();
      
      if ((file_name.indexOf('.png') >= 0) ||
          (file_name.indexOf('.jpg') >= 0) ||
          (file_name.indexOf('.jpeg') >= 0) ||
          (file_name.indexOf('.gif') >= 0)) this.src_is_a_file_name = true;
    }  
  
    this.file_name = file_name;
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ImageElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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

//  OpenAjax.a11y.logger.debug("Image property: " + property + " value= " + this[property]);

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
      return cache_nls.getNLSEmptyAltTextMessage();
    }
  }
  else {
    return cache_nls.getNLSMissingAltMessage();
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
   var str = this.dom_element.tag_name;
   
   if (this.dom_element.computed_style.is_visible_onscreen == OpenAjax.a11y.VISIBILITY.HIDDEN) {
     str += " (hidden) : ";
   } 
   else {
     str += " (" + this.height + "x" + this.width + ") : ";
   }  
   
   if (this.src_is_a_file_name) {
     str += this.file_name;
   }
   else {
     str +=  "source is not a file name";   
   }
   
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
    
    var li; //language item
    var found = false;
    var language_items = this.language_items;
    var language_items_len = language_items.length; 
    
    for (var i = 0; i < language_items_len; i++) {
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
    
    if (dom_element.type == Node.ELEMENT_NODE) {
        
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getNodeResults = function () {
  return this.dom_text_nodes[0].getNodeResults();
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

  if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LinkElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  
  return cache_nls.getNLSValue('link_type', this.link_type);
  
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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

  if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ListElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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

  if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MediaElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
   return this.dom_element.tag_name;
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
 * @property  {Number}  is_visible_onscreen   - Constant representing the graphical visibility of the element (i.e is it visible to people with sight)
 * @property  {Number}  is_visible_at         - Constant representing the assistive technology visibility of the element (i.e is it visible to people using a screen reader)
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
 this.font_size   = normalizeFontSize(style.getPropertyValue("font-size"), parent_element); 
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

 // OpenAjax.a11y.logger.debug("  " + color );

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
 * @method getRuleResultByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the rule result object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {ResultRule | null} Returns cache rule result object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getRuleResultByCacheId = function (cache_id) {

   var i;
   var rr;
   var rule_results     = this.evaluation_results.rule_results;
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

     if (dom_element.type == Node.ELEMENT_NODE) {

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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
  
  attributes.push(cache_nls.getNLSLabelAndValue('summary', this.summary));
  
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
  
  properties.push(cache_nls.getNLSLabelAndValue('is_data_table', this.is_data_table));
  properties.push(cache_nls.getNLSLabelAndValue('is_complex_data_table', this.is_complex_data_table));
  properties.push(cache_nls.getNLSLabelAndValue('effective_caption', this.effective_caption));
  properties.push(cache_nls.getNLSLabelAndValue('effective_summary', this.effective_summary));
  properties.push(cache_nls.getNLSLabelAndValue('max_row', this.max_row));
  properties.push(cache_nls.getNLSLabelAndValue('max_column', this.max_column));
  properties.push(cache_nls.getNLSLabelAndValue('nesting_level', this.nesting_level));
  
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.THeadElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
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
 * @param {Object}    rule_item          - Object containing rule information 
 * @param {String}    cache_dependency   - Which cache the rule will use 
 * @param {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param {function}  validate           - function for evalutinf the rule
 *
 * @property {Object}    nls                - NLS information for rules 
 * @property {String}    rule_id            - Unique id of the rule 
 * @property {String}    rule_scope         - Defines the scope of the rule; DOM node, page or website 
 * @property {Object}    wcag_primary_id    - id of the primary WCAG 2.0 success criteria 
 * @property {Object}    wcag_related_ids   - id of related WCAG 2.0 success criteria
 * @property {String}    cache_dependency   - Which cache (i.e. element group) the rule will use 
 * @property {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @property {Array}     target_objects     - The html objects the rule evaluates (NOTE: this is informative information)
 * @property {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @property {function}  validate           - function for evalutinf the rule
 */

OpenAjax.a11y.Rule = function (nls, rule_item) {

  this.nls                 = nls;
  this.rule_id             = rule_item.rule_id;   
  this.rule_scope          = rule_item.rule_scope;   
  this.rule_category       = rule_item.rule_category;   
  this.wcag_primary_id     = rule_item.wcag_primary_id;   
  this.wcag_related_ids    = rule_item.wcag_related_ids;
  this.last_updated        = rule_item.last_updated;
  this.cache_dependency    = rule_item.cache_dependency;
  this.cache_properties    = rule_item.cache_properties;
  this.target_resources    = rule_item.target_resources;
  this.language_dependency = rule_item.language_dependency;
  this.validate            = rule_item.validate;
  
  this.wcag20_nls = OpenAjax.a11y.all_wcag20_nls.getNLS();
  
  
};

/**
 * @method getNLSRuleId
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized id for the rule
 *
 * @return {String} NLS string of the rule id
 */
 
OpenAjax.a11y.Rule.prototype.getNLSRuleId = function () {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  return nls_rules.rules[this.rule_id]['ID'];
  
};

/**
 * @method getNLSRuleScope
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {String} NLS string of the rule id
 */
 
OpenAjax.a11y.Rule.prototype.getNLSRuleScope = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  if (this.rule_scope) 
    return OpenAjax.a11y.util.transformElementMarkup(nls_rules.rule_scope[this.rule_scope]);
  else  
    return nls_rules.rule_scope[OpenAjax.a11y.RULE_SCOPE.UNKOWN];
  
};


/**
 * @method getNLSDefinition
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized definition of a rule
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 * 
 * @return {String} NLS string of the rule definition
 */
OpenAjax.a11y.Rule.prototype.getNLSDefinition = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['DEFINITION'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      if (rule_type) {
    
        switch (rule_type) {
        case RULE.REQUIRED:
          message = nls_rules.message_severities.MUST;
          break;

        case RULE.RECOMMENDATION:
          message = nls_rules.message_severities.SHOULD;
          break;

        default:
          message = "";
          break; 
        }
      }
      // If no rule type is defined assume "must"
      else {
        message = nls_rules.message_severities.MUST;      
      }
      
      str = str.replace(vstr, message);  
    }  
    
    return OpenAjax.a11y.util.transformElementMarkup(str);
  }
      
  return "Definition not found for rule: " + this.rule_id;
  
};

/**
 * @method getNLSSummary
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string that summarizes the requirement of the rule 
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 *
 * @return {String} NLS string of a summary
 */
OpenAjax.a11y.Rule.prototype.getNLSSummary = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['SUMMARY'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      switch (rule_type) {
      
      case RULE.REQUIRED:
        message = nls_rules.message_severities.MUST;
        break;

      case RULE.RECOMMENDED:
        message = nls_rules.message_severities.SHOULD;
        break;

      default:
        message = "unknown";
        break; 
      }
      
      str = str.replace(vstr, message);  
    }  

    return OpenAjax.a11y.util.transformElementMarkup(str);
  }
      
  return "Summary not found for rule: " + this.rule_id;
  
};

/**
 * @method getNLSPurpose
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing the purposes of the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSPurpose = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['PURPOSE'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      new_list.push(OpenAjax.a11y.util.transformElementMarkup(list[i]));
    
    } // end for
  
    return new_list;
  }  
  
  return [];
  
};

/**
 * @method getNLSTarget
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string describing the elements or page feature the rule is evaluting
 */
OpenAjax.a11y.Rule.prototype.getNLSTargetResourcesDescription = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var target = nls_rules.rules[this.rule_id]['TARGET_RESOURCES_DESC'];
  
  if (target) return OpenAjax.a11y.util.transformElementMarkup(target);
  
  return "** Target resource description not defined";
  
};

/**
 * @method getTargetResources
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing target resources of the rule
 */
OpenAjax.a11y.Rule.prototype.getTargetResources = function () {
  
  if (this.target_resources) return this.target_resources;
  
  return [];
  
};

/**
 * @method getNLSTechniques
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing techniques to implement the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSTechniques = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['TECHNIQUES'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      new_list.push(OpenAjax.a11y.util.transformElementMarkup(list[i]));
    
    } // end for
  
    return new_list;
  }    
  
  return [];
  
};



/**
 * @method getInformationalLinks
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array of objects with information links related to the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSInformationalLinks = function () {

  function informationalLink(type, title, url) {
  
    var return_object = {};
  
    return_object.type  = type;
    return_object.title = OpenAjax.a11y.util.transformElementMarkup(title);
    return_object.url   = url;
    
    return return_object;
  }

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['INFORMATIONAL_LINKS'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      var link = list[i];

      new_list.push(informationalLink(link.type, link.title, link.url));
    
    } // end for
  
    return new_list;
  }  
  
  return [];
  
};


/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized node result message 
 *
 * @param {NodeResult}  node_result  - Node result to generate message
 * @param {String}      format       - Changes how element codes '@' in messages is transformed, values are "text" and "html"
 */
OpenAjax.a11y.Rule.prototype.getMessage = function (node_result) {

  var nls_rules = this.nls[OpenAjax.a11y.locale];
  
  var SEVERITY = OpenAjax.a11y.SEVERITY;
  
  var i;
  var message;
  
  // If no message id return the empty string
  if (node_result.message_id.length === 0) return "";
  
  var str = nls_rules.rules[this.rule_id][node_result.message_id];
  
  if (!str) return nls_rules.missing_message + node_result.message_id;
    
//    OpenAjax.a11y.logger.debug("Rule: " + this.rule_id + " Message: " + str);

  var vstr; // i.e. %1, %2 ....
  var len = node_result.message_arguments.length;

  // check to see if message has severity dependence
  
  vstr = "%s";
  
  if (str.indexOf(vstr) >= 0) {
    
    switch (node_result.severity) {
    case SEVERITY.VIOLATION:
      message = nls_rules.message_severities.MUST;
      break;

    case SEVERITY.WARNING:
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

  return OpenAjax.a11y.util.transformElementMarkup(str);
  
};

/**
 * @method getNLSRequirements
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns information about the WCAG 2.0 Success Criteria for the primary and secondary rule requirements
 *
 * @return  {Object}  Object representing the NLS information for primary and secondary requirments
 */

OpenAjax.a11y.Rule.prototype.getNLSRequirements = function () {

  var return_object = {};

  return_object.primary = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);
  return_object.related = [];
  
  for (var i = 0; i < this.wcag_related_ids.length; i++ ) {
    return_object.related.push(this.wcag20_nls.getNLSItemById(this.wcag_related_ids[i]));
  }

  return return_object;

};


/**
 * @method getWCAG20Level
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {Number}  Number representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.Rule.prototype.getWCAG20Level = function () {

  var sc = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);

  return sc.level;

};

/**
 * @method getNLSWCAG20Level
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the NLS String based on the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.Rule.prototype.getNLSWCAG20Level = function () {

  var sc = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);

  return this.wcag20_nls.getNLSWCAG20Level(sc.level);

};


/**
 * @method getWCAG20PrincipleIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Principle index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result principle index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20PrincipleIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[0], 10) - 1);

};

/**
 * @method getWCAG20GuidelineIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Guideline index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result guideline index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20GuidelineIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[1], 10) - 1);

};

/**
 * @method getWCAG20SuccessCriteriaIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Success Criteria index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result sucess criteria index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20SuccessCriteriaIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[2], 10) - 1);

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
 * @param  {Object}    rule_item          - Object containing rule information 
 *
 * @return  {Boolean} Returns true if the rule was added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRule = function (rule_item) {

  var errors = false;

  if (this.getRuleByRuleId(rule_item.rule_id)) {
    OpenAjax.a11y.logger.debug("  ** Duplicate Rule ID: " + rule_item.rule_id);
    errors = true;
  }  
  
  if (typeof rule_item.wcag_primary_id !== 'string') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " primary wcag id is missing"); 
    errors = true;
  }  
  
  if (typeof rule_item.wcag_related_ids !== 'object') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " related wcag ids is missing"); 
    errors = true;
  }  
  
  if (!this.validCacheDependency(rule_item.cache_dependency)) {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " has invalid or missing cache dependency property"); 
    errors = true;
  }  

  if (typeof rule_item.cache_properties !== 'object') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " cache properties is missing or not an array"); 
    errors = true;
  }  
  
  if (typeof rule_item.language_dependency !== 'string') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " language property is missing or not a string"); 
    errors = true;
  }  
  
  if (typeof rule_item.validate !== 'function') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " validate property is missing or not a function"); 
    errors = true;
  }  

  if (errors) return false;
  
  var oaa_rule = new OpenAjax.a11y.Rule(this.nls, rule_item);

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

//  OpenAjax.a11y.logger.debug(" ---- Adding OAA Rules ---- ");

  for (var i = 0; i < rule_array.length; i++) {

    rule_item = rule_array[i];
    
//    OpenAjax.a11y.logger.debug("  Rule: " + rule_item.id);
//    OpenAjax.a11y.logger.debug("  last update: " + rule_item.last_updated);
//    OpenAjax.a11y.logger.debug("   dependency: " + rule_item.cache_dependency);
//    OpenAjax.a11y.logger.debug("   properties: " + typeof rule_item.cache_properties);
//    OpenAjax.a11y.logger.debug("     language: " + rule_item.language_dependency);
//    OpenAjax.a11y.logger.debug("     validate: " + typeof rule_item.validate);

    this.addRule(rule_item);

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

/**
 * @method toOAAWikiFormat()
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Checks to see if the cache reference is valid 
 *
 * @return  {Boolean} Returns string containing rule information
 */

OpenAjax.a11y.Rules.prototype.toOAAWikiFormat = function () {

  function ruleCategoryToWikiFormat(rule_category, title) {
  
    var category_rules = [];
    var i;
    var r;
   
    for (i = 0; i < this.rules.length; i++ ) {
    
      r = this.rules[i];
      
      if (r.rule_category === rule_category) category_rules.push(r);
      
    }
    
    wiki_str += "\n\n== " + title + "==\n";  

    for (i = 0; i < category_rules.length; i++ ) {
    
      r = category_rules[i];
    
      wiki_str += "\n=== " + r.getNLSRuleId() + ": " + r.getNLSDefinition() + "===\n\n";  

      wiki_str += "Rule id: " + r.rule_id + "\n";  
      wiki_str += "Rule id (NLS): " + r.getNLSRuleId() + "\n";  
      wiki_str += "Definition: " +  r.getNLSDefinition() + "\n + ";  

    }
    
  }



  var wiki_str = "";
  
  var RULE_CATEGORIES = OpenAjax.a11y.RULE_CATEGORIES;
  
  ruleCategoryToWikiFormat(RULE_CATEGORIES.CONTROLS, 'Form Controls');
  ruleCategoryToWikiFormat(RULE_CATEGORIES.IMAGES, 'Images');
  ruleCategoryToWikiFormat(RULE_CATEGORIES.HEADINGS, 'Headings');
  ruleCategoryToWikiFormat(RULE_CATEGORIES.LANDMARKS, 'Landmarks');
  ruleCategoryToWikiFormat(RULE_CATEGORIES.COLOR_CONTRAST, 'Color Contrast');
  
  return wiki_str;

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
/*                             NodeResult                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor NodeResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param  {ResultRule} rule_result             - reference to the rule result object
 * @param  {Number}     evaluation_result_value - Constant representing severity of the evaluation result
 * @param  {DOMElement} cache_item              - Object reference to cache item associated with the test
 * @param  {String}     message_id              -  String reference to the message string in the NLS file
 * @param  {Array}      message_arguements      -  Array  array of values used in the message string 
 *
 * @property  {String}     cache_id            - Id identify the node result (uses the same value of the associated cache element id)
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     evaluation_result_value - Constant representing severity of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          -  String reference to the message string in the NLS file
 * @property  {Array}      message_arguements  -  Array  array of values used in the message string  
 */

OpenAjax.a11y.NodeResult = function (rule_result, evaluation_result_value, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  
  this.node_result_value = evaluation_result_value;
  this.cache_item        = cache_item;
  this.message_id        = message_id;
  this.message_arguments = message_arguments;
  this.cache_id          = rule_result.cache_id;

};

/**
 * @method getPropertyValue
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the value of a property in the cache 
 *
 * @param  {String}  property  -  Property of the cache element object 
 *
 * @return {value | null} Returns a value if property is defined, null if not
 */

OpenAjax.a11y.NodeResult.prototype.getPropertyValue = function (property) {

  var value;

  value = this.cache_item[property];  
  if (typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number') return value;
  
  value = this.cache_item.dom_element[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.computed_style[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.events[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  
   
   
  return null;
  
};

/**
 * @method getRulecategory
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the numeric value for the rule category
 * 
 * @return {Number}  Numeric value of the rule category
 */

OpenAjax.a11y.NodeResult.prototype.getRuleCategory = function () {

  return this.rule_result.rule.rule_category;
  
};

/**
 * @method getSeverity
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a human readable text for the severity based on the current NLS setting
 * 
 * @return {Object} Returns a human readable information about the everity
 */

OpenAjax.a11y.NodeResult.prototype.getSeverity = function () {

  return OpenAjax.a11y.cache_nls.getNLSSeverity(this.node_result_value);
  
};


/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.NodeResult.prototype.getRule = function () {

  return this.rule_result.getRule();
   
};


/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing a definition of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleDefinition = function () {

  return this.rule_result.getRuleDefinition();
  
};


/**
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing a summary of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleSummary = function () {

  return this.rule_result.getRuleSummary();
  
};

/**
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the rule id
 * 
 * @return {String} Returns a NLS localized version of the rule id
 */

OpenAjax.a11y.NodeResult.prototype.getRuleId = function () {

  return this.rule_result.getRuleId();
   
};


/**
 * @method getRuleProperties
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an array of object containing NLS property names and values associated with the rule
 * 
 * @return {Array} Array of objects 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var nls_prop_list = [];
  
  var prop_list = this.rule_result.rule.cache_properties;
  var value;
  var prop_item;
  
  for (var i = 0; i < prop_list.length; i++) {

    prop_item = prop_list[i];

    var nls_item = new Object();

    value    = this.cache_item.getCachePropertyValue(prop_item);

    nls_item = cache_nls.getNLSLabelAndValue(prop_item, value);

    nls_prop_list.push(nls_item);
    
  }  
  
  return nls_prop_list;
   
};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the type of rule in a ruleset
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset
 */

OpenAjax.a11y.NodeResult.prototype.getNLSRuleType = function () {

  return this.rule_result.getRuleType();
   
};


/**
 * @method getNLSSeverityLabel
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the severity label based on the current NLS setting
 * 
 * @return {String} Returns a NLS localized version of the severity
 */

OpenAjax.a11y.NodeResult.prototype.getNLSSeverityLabel = function () {

  return OpenAjax.a11y.cache_nls.getNLSSeverity(this.node_result_value).label;
   
};

/**
 * @method getSeverityStyle
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a string to be used with CSS styling of severity text
 * 
 * @return {String} Returns a string that can be used for CSS styling of the severity 
 */

OpenAjax.a11y.NodeResult.prototype.getSeverityStyle = function () {
  
  return OpenAjax.a11y.SEVERITY_STYLE[this.node_result_value];
  
};

/**
 * @method getXPath
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the xpath of the associated element
 * 
 * @return {String} information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.getXPath = function () {
  
  var xpath = this.cache_item.xpath;
  
  if (!xpath) xpath = this.cache_item.dom_element.xpath;
  
  return xpath;
 
};

/**
 * @method getDefintion
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing the full requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleDefinition = function () {

  return this.rule_result.getRuleDefinition();
  
};

/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the message associated with the rule result
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.NodeResult.prototype.getMessage = function () {

  return this.rule_result.rule.getMessage(this);
  
};



/**
 * @method getDOMElement
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the dom element object
 *
 * @return {String} Returns a dom element associated with the cache item
 */

OpenAjax.a11y.NodeResult.prototype.getDOMElement = function () {

  if (this.cache_item.dom_element) 
    return this.cache_item.dom_element;
  else
    return this.cache_item;      
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates a text string representation of the node result object 
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.NodeResult.prototype.toString = function () {

  return this.rule_result.rule.getMessage(this);
  
};

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.toXML = function () {

  var xml = "";
  return xml;
};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.toHTML = function (ruleset_nls) {
  
  var html = "";
 
  return html;
};


/* ---------------------------------------------------------------- */
/*                             RuleResult                           */
/* ---------------------------------------------------------------- */
 
 /** 
 * @constructor RuleResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a ruleset rule
 *
 * @param  {WCAG20RuleMapping}  rule_mapping  - WCAG20RuleMapping object
 *
 * @property  {String}   cache_id       - ID used to identify the rule result object (uses the same value as the associated rule cache id)
 * @property  {Number}   severity            - Constant representing severity of the evaluation result
 *
 * @property  {Number}   principle_index         - Index used to identify the WCAG 2.0 principle result object
 * @property  {Number}   guideline_index         - Index used to identify the WCAG 2.0 guideline result object
 * @property  {Number}   success_criteria_index  - Index used to identify the WCAG 2.0 success criteria result object
 *
 * @property  {WCAG20RuleMapping}  rule_mapping    - Reference to the assciated rule
 * @property  {Rule}               rule            - Reference to the assciated rule
 * @property  {Boolean}            rule_evaluated  - True if rule was evaluated, false if rule was disabled or 
 *                                                   not included becase of the WCAG 2.0 level being evaluated
 *
 * @property  {Array}  nodes_passed         - Array of all the node results that passed
 * @property  {Array}  nodes_violations     - Array of all the node results that resulted in violations
 * @property  {Array}  nodes_warnings       - Array of all the node results that resulted in warnings
 * @property  {Array}  nodes_manual_checks  - Array of all the node results that require manual evaluations
 * @property  {Array}  nodes_hidden         - Array of all the node results that are hidden
 * @property  {Array}  nodes_na             - Array of all the node results that not applicable
 */
 
OpenAjax.a11y.RuleResult = function (rule_mapping) {

  this.rule_mapping = rule_mapping;
  this.rule         = rule_mapping.rule;
  
  this.cache_id        = rule_mapping.rule.rule_id;
  
  this.node_results_passed  = [];
  this.node_results_violations     = [];
  this.node_results_warnings       = [];
  this.node_results_manual_checks  = [];
  this.node_results_hidden         = [];
  
  var index;
  var ids = rule_mapping.rule.wcag_primary_id;
  
  this.principle_index = -1;
  this.guideline_index = -1;
  this.success_criteria_index = -1;
  
  this.rule_evaluated = false;

  if (ids.length === 3) {
  
    index = parseInt(ids[0], 10);    
    if (typeof index === 'number') this.principle_index = index - 1; 

    index = parseInt(ids[1], 10);    
    if (typeof index === 'number') this.guideline_index = index - 1; 

    index = parseInt(ids[2], 10);    
    if (typeof index === 'number') this.success_criteria_index = index - 1; 
    
  }
  
};

/**
 * @method addResult
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Adds a result of an evaluation of rule on a node in the dom  
 *
 * @param  {Number}  test_result         - Number representing if a node passed, failed, manual check or other test result
 * @param  {Object}  cache_item          - Reference to cache item associated with the test
 * @param  {String}  message_id          - Reference to the message string in the NLS file
 * @param  {Array}   message_arguements  - Array of values used in the message string 
 */

OpenAjax.a11y.RuleResult.prototype.addResult = function (test_result, cache_item, message_id, message_arguments) {

  var SEVERITY    = OpenAjax.a11y.SEVERITY;
  var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
  var RULE        = OpenAjax.a11y.RULE;

  if (!cache_item) return;

  var dom_element_item = null; 
 
  if (cache_item.dom_element) {
    dom_element_item = cache_item.dom_element;  
  } 
  else {
    dom_element_item = cache_item;  
  }
  
  dom_element_item.has_rule_results = true;
  
  var node_severity = SEVERITY.UNKNOWN;
  
  switch (test_result) {
  
  case TEST_RESULT.PASS:
    node_severity = SEVERITY.PASS;
    break;
    
  case TEST_RESULT.FAIL:
    if (this.rule_mapping.type === RULE.REQUIRED) {
      node_severity = SEVERITY.VIOLATION;
    }
    else {
      node_severity = SEVERITY.WARNING;
    }
    break;
  
  case TEST_RESULT.MANUAL_CHECK:
    node_severity = SEVERITY.MANUAL_CHECK;
    break;
  
  case TEST_RESULT.HIDDEN:
    node_severity = SEVERITY.HIDDEN;
    break;
    
  default:
    break;  
  }   
  
  var node_result = new OpenAjax.a11y.NodeResult(this, node_severity, cache_item, message_id, message_arguments);
 
//  OpenAjax.a11y.logger.debug("Add Result for " + this.rule.rule_id + ": " + severity + " " + cache_item.cache_id);

  switch (node_severity) {
 
  case SEVERITY.HIDDEN: 
    this.node_results_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.PASS:
    this.node_results_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.node_results_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.WARNING:
    this.node_results_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.node_results_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    break;

  default:
    break; 
  } // end switch 
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the level of implementation of the rule  
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResult.prototype.getImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  
  var t = 0;
  
  var p  = this.node_results_passed.length;
  t += p;
  
  var v  = this.node_results_violations.length;
  t += v;
  
  var w  = this.node_results_warnings.length;
  t += w;
  
  var mc = this.node_results_manual_checks.length;
  t += mc;
  
  if (t) {
  
    if (t !== mc) {
    
      t = t - mc;

      var percentage = Math.round((p * 100) / t);
      
      level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED; 
      
      if (percentage === 100) level = IMPLEMENTATION_LEVEL.COMPLETE;
      else if (percentage >= 95) level = IMPLEMENTATION_LEVEL.ALMOST_COMPLETE;
        else if (percentage >= 50) level = IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION;
        
    } 
    
    if (mc > 0) level += IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
  
  }
  else {
    level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  }

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Rule: " + this.rule.rule_id + " Level: " + level + " percent: " + percentage + " total: " + t + "  p: " + p + "  v: " + v + "  w: " + w + "  mc: " + mc);

  return level;

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the NLS string values assoacited with the level of implementation of the rule  
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'style'
 *                  All properties are String objects
 */

OpenAjax.a11y.RuleResult.prototype.getNLSImplementationLevel = function () {

  var level = this.getImplementationLevel();

  return OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
 
};


/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.RuleResult.prototype.getRule = function () {

  return this.rule_mapping.rule;
   
};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a NLS text string representation of the type of rule (i.e. required, recommended, conditional) 
 *
 * @return {String} Returns a NLS text string representation of the rule type 
 */

OpenAjax.a11y.RuleResult.prototype.getNLSRuleType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSRuleType(this.rule_type);  

};


/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an NLS string representing the full description of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleDefinition = function () {

  return this.rule.getNLSDefinition(this.rule_mapping.type);
  
};

/**
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an NLS string representing a summary of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleSummary = function () {

  return this.rule.getNLSSummary(this.rule_mapping.type);
  
};


/**
 * @method getResultNodes
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.RuleResult.prototype.getResultNodes = function () {
 
  function addResultNodes(items) {
    var i;
    var len = items.length;
    
    for (i = 0; i < len; i++) {
      result_nodes.push(items[i]);
    }    
  }

  var result_nodes = [];
  
  addResultNodes(this.node_results_passed);
  addResultNodes(this.node_results_violations);
  addResultNodes(this.node_results_warnings);
  addResultNodes(this.node_results_manual_checks);
  addResultNodes(this.node_results_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getResultNodeByCacheId
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a node result object with the cache id 
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return {ResultNode | null} Returns a result node if cache id is found, otherwise null
 */

OpenAjax.a11y.RuleResult.prototype.getResultNodeByCacheId = function (cache_id) {
 
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
  
  node_result = checkResultNodeList(this.node_results_passed);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_violations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_warnings);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_manual_checks);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_recommendations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_hidden); 
  if (node_result) return node_result;
    

  return null;
  
};




/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a text string representation of the rule result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.RuleResult.prototype.toString = function () {

 var str = this.getRuleDefinition() + ": " + this.getNLSImplementationLevel().label + " (" + this.getImplementationLevel() + ")"; 

 return str;
};


/* ---------------------------------------------------------------- */
/*                             RuleResultAggregation                */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor RuleResultAggregation
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains an aggregation of rule results
 *
 * @param  {String}  cache_id  -  String to uniquely represent the aggregation object 
 *
 * @property  {String}  cache_id  -  String to uniquely represent the aggregation object
 *
 * @property  {Number}  number_of_rule_results_all_nodes_pass         - Number of rule results where all the node results pass
 * @property  {Number}  number_of_rule_results_with_node_violations   - Number of rule results with at least one node result with a violation
 * @property  {Number}  number_of_rule_results_with_node_warning      - Number of rule results with at least one node result with a warning
 * @property  {Number}  number_of_rule_results_with_node_manual_check - Number of rule results with at least one node result with a manual check
 * @property  {Number}  number_of_rule_results_with_node_hidden       - Number of rule results with at least one node result with a hidden
 *  
 * @property  {Number}  number_of_nodes_pass           - Number of node results that pass 
 * @property  {Number}  number_of_nodes_violations     - Number of node results that are violations 
 * @property  {Number}  number_of_nodes_warnings       - Number of node results that are warnings 
 * @property  {Number}  number_of_nodes_manual_checks  - Number of node results that are manual checks 
 * @property  {Number}  number_of_nodes_hidden         - Number of node results that are hidden  
 */
 
OpenAjax.a11y.RuleResultAggregation = function (cache_id) {

  this.rule_results = [];

  if (cache_id) this.cache_id = cache_id;
  else this.cache_id = 'no_aggregation_id';
  
  this.number_of_required_rules = 0;
  this.number_of_recommended_rules = 0;
  this.number_of_rules_not_evaluated = 0;

  this.number_of_nodes_pass          = 0;
  this.number_of_nodes_violations    = 0;
  this.number_of_nodes_warnings      = 0;
  this.number_of_nodes_manual_checks = 0;
  this.number_of_nodes_hidden        = 0;

};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 */
 
OpenAjax.a11y.RuleResultAggregation.prototype.addRuleResult = function (rule_result) {

  this.rule_results.push(rule_result);

  if (rule_result.rule_evaluated) {
  
    if (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) this.number_of_required_rules += 1;
    else this.number_of_recommended_rules += 1;
    
    this.number_of_nodes_pass          += rule_result.node_results_passed.length;
    this.number_of_nodes_violations    += rule_result.node_results_violations.length;
    this.number_of_nodes_warnings      += rule_result.node_results_warnings.length;
    this.number_of_nodes_manual_checks += rule_result.node_results_manual_checks.length;
    this.number_of_nodes_hidden        += rule_result.node_results_hidden.length;
    
  }
  else {
    this.number_of_rules_not_evaluated += 1;
  }
  
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns the level of implementation based on an average of rule implementation of 
 *       the rule results in the list.  Required rules implementation level are weighted 
 *       twice as important as recommended rules for implementation level
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResultAggregation.prototype.getImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  
  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;
  
  var total_implementation_level       = 0; 
  var total_implementation_level_count = 0; 
  
  var manual_checks = 0;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Number of rule results: " + rule_results_len);  

  for (var i = 0; i < rule_results_len; i++ ) {
    
    var r_result = rule_results[i];
    
    if (r_result.rule_evaluated) {
      var il = r_result.getImplementationLevel();
      
      if (il >= IMPLEMENTATION_LEVEL.MANUAL_CHECKS) { 
        manual_checks = IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
        il = il - IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      }  
      
      if (il > 0) {
        total_implementation_level += il;
        total_implementation_level_count += 1;
      }  
      
//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("    Rule: " + r_result.rule.rule_id + "  Level: " + il + " Total: " + total_implementation_level + " count: " + total_implementation_level_count);
      
    }    
  }

  if (total_implementation_level_count > 0) {
    level = Math.round(total_implementation_level / total_implementation_level_count);
    if (level >= IMPLEMENTATION_LEVEL.MANUAL_CHECKS) level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED;
  }

  level += manual_checks;
//
  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("    LEVEL: " + level + "  count: " + total_implementation_level_count + "  total: " + total_implementation_level);  

  return level;

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns the NLS level of implementation of the list of rule results  
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'style'
 *                  All properties are String objects
 */

OpenAjax.a11y.RuleResultAggregation.prototype.getNLSImplementationLevel = function () {

  var level = this.getImplementationLevel();
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Impl. Level: " + level + " (number)");  

  return OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
 
};

 /** 
 * @method getRuleResultByCacheId
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns a result node (if found) using the cache_id of the result node
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return  {ResultNode | null }  Returns the reult node object if found, otherwise null
 *
 */
 
OpenAjax.a11y.RuleResultAggregation.prototype.getRuleResultByCacheId = function (cache_id) {

  var i;
  var rr;
  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }

  return null;
  
};

/* ---------------------------------------------------------------- */
/*                           RuleCategoryResults                    */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor RuleCategoryResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains an aggregation of rule results by rule categories
 *
 */
 
OpenAjax.a11y.RuleCategoryResult = function() {

  this.abbreviation_rule_results   = new OpenAjax.a11y.RuleResultAggregation('aggregation_abbrev');
  this.audio_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_audio');
  this.color_contrast_rule_results = new OpenAjax.a11y.RuleResultAggregation('aggregation_color_contrast');
  this.control_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_control');
  this.heading_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_heading');
  this.image_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_image');
  this.landmark_rule_results       = new OpenAjax.a11y.RuleResultAggregation('aggregation_landmark');
  this.language_rule_results       = new OpenAjax.a11y.RuleResultAggregation('aggregation_language');
  this.link_rule_results           = new OpenAjax.a11y.RuleResultAggregation('aggregation_link');
  this.list_rule_results           = new OpenAjax.a11y.RuleResultAggregation('aggregation_list');
  this.table_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_table');
  this.video_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_video');
  this.widget_rule_results         = new OpenAjax.a11y.RuleResultAggregation('aggregation_widget');
  this.content_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_content');
  
};

 /** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.RuleCategoryResults
 *
 * @desc Adds a rule result to a rule category summary results
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 */
 
OpenAjax.a11y.RuleCategoryResult.prototype.addRuleResult = function (rule_result) {

//  OpenAjax.a11y.logger.debug("primary: " + rule_result.rule.wcag_primary_id + " rule category: " + rule_result.rule.rule_category);

  if (!rule_result) return;

  switch (rule_result.rule.rule_category) {

  case OpenAjax.a11y.RULE_CATEGORIES.ABBREVIATIONS:
    this.abbreviation_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.AUDIO:
    this.audio_rule_results.addRuleResult(rule_result);
    break;
  
  case OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST:
    this.color_contrast_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.CONTROLS:
    this.control_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.HEADINGS:
    this.heading_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.IMAGES:
    this.image_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS:
    this.landmark_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LANGUAGE:
    this.language_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LINKS:
    this.link_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LISTS:
    this.list_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.TABLES:
    this.table_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.VIDEO:
    this.video_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.WIDGETS:
    this.widget_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.CONTENT:
    this.content_rule_results.addRuleResult(rule_result);
    break;

  default:
    break;
  
  }

};

/* ---------------------------------------------------------------- */
/*                           RuleResultSummary                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleResultSummary
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of rule results associated with a aggregation of rule results 
 *
 * @param  {String}  description  - description of summary
 *
 * @property  {String}  description      - description of summary 
 * 
 * @property  {Array}   rule_result_groups  - A list of RuleResultSummaryGroup or RuleResult object 
 */

 OpenAjax.a11y.cache.RuleResultSummary = function(description) {

  this.description = description;

  this.rule_result_items = [];
  
};

/**
 * @method addRuleResultItem
 *
 * @memberOf OpenAjax.a11y.cache.RuleResults
 *
 * @desc Adds a rule result object to the rule result group
 *
 * @property  {Object}  rule_result_item  - RuleResultSummaryGroup or RuleResult object 
 */

OpenAjax.a11y.cache.RuleResultSummary.prototype.addRuleResultItem = function(rule_result_item) {

  if (rule_result_item) this.rule_result_items.push(rule_result_item);
  
};


/* ---------------------------------------------------------------- */
/*                           RuleResultSummaryGroup                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleResultSummaryGroup
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of rule results associated with a aggregation of rule results
 *
 * @param  {String}                 description  - description of the group
 * @param  {RuleResultAggregation}  aggregation  - Aggregation object for group
 * 
 * @property  {String}                 description         - description of the group
 * @property  {String}                 cache_id            - Cache id for the item
 * @property  {RuleResultAggregation}  aggregation         - Aggregation object for group
 * @property  {Boolean}                group_item          - indicates the item is a rule result summary group object (NOTE: always true) 
 * @property  {Array}                  rule_result_groups  - Array of child rule result summary group or rule result objects
 */

OpenAjax.a11y.cache.RuleResultSummaryGroup = function(description, aggregation) {
  
  this.description = description;
  this.cache_id    = aggregation.cache_id;
  this.rule_result_aggregation = aggregation;
  this.group_item  = true; 

  this.rule_result_items = [];
  
};

/**
 * @method addRuleResultItem
 *
 * @memberOf OpenAjax.a11y.cache.RuleResultSummaryGroup
 *
 * @desc Adds a rule result object to the rule result group
 *
 * @property  {Object}  rule_result_item  - RuleResultSummaryGroup or RuleResult object 
 */

OpenAjax.a11y.cache.RuleResultSummaryGroup.prototype.addRuleResultItem = function(rule_result_item) {

  if (rule_result_item) this.rule_result_items.push(rule_result_item);
  
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
 * @method getNLSSeverity
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the severity object with NLS information
 *
 * @param  {Number}  severity  -  The constant representing the severity of the results
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'tooltip'
 *                  All properties are String objects
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSSeverity = function(severity) {

  return this.nls[OpenAjax.a11y.locale].severities[severity];

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the implementation level object with NLS information
 *
 * @param  {Number}  level  -  The constant representing the implementation level of a rule result
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'tooltip' and 'style'
 *                  All properties are String objects
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSImplementationLevel = function(level) {

  return this.nls[OpenAjax.a11y.locale].implementation_levels[level];

};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS localized version of the rule type
 *
 * @param  {Number}  rule_type  -  The constant representing the type of rule in a ruleset (i.e. required, recommended, conditional)
 *
 * @return {String} Returns an NLS localized string representing the type of rule in the ruleset
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSRuleType = function(rule_type) {

  return this.nls[OpenAjax.a11y.locale].rule_types[rule_type];

};

/**
 * @method getNLSLabelAndValue
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
 
OpenAjax.a11y.CacheNLS.prototype.getNLSLabelAndValue = function (property, value) {
  
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
      
      switch(typeof value) {
      
      case 'boolean': 
      
        if (value)
          info.value = nls_cache.boolean_values.true_value;
        else
          info.value = nls_cache.boolean_values.false_value;
        break;
        
      case 'number':
      
        if (cp.values) 
          info.value = cp.values[value].toString();
        else
          info.value = String(value);
          
        break; 

      default:
         break;
      }      
    } 
    
    return info;
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label and description of a cache property
 *
 * @param  {String}  property  - The object property
 * 
 * @return {Object} Returns object with two properties 'label' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSLabel = function (property) {
  
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
 * @method getNLSValue
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
 
OpenAjax.a11y.CacheNLS.prototype.getNLSValue = function (property, value) {
  
    var str = "";  // return object 
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {

      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return value;

      switch(typeof value) {
      
      case 'boolean': 
      
        if (value)
          str = nls_cache.boolean_values.true_value;
        else
          str = nls_cache.boolean_values.false_value;
        break;
        
      case 'number':
      
        if (cp.values) 
          str = cp.values[value].toString();
        else
          str = String(value);
          
        break; 

      default:
         break;
      }      
              
    } 
    
    return str;
  
};

/**
 * @method getNLSBoolean
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS boolean value 
 *
 * @param {Boolean}  value  - A boolean value to get the NLS string
 * 
 * @return {String} Returns string with the localized boolean value 
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSBoolean = function (value) {
  
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
 * @method getNLSMissingLabelMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the missing form control label message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSMissingLabelMessage = function () {
  
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
 * @method getNLSEmptyAltTextMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the empty alt text message message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSEmptyAltTextMessage = function () {
  
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
 * @method getNLSMissingAltMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns an NLS localized 'missing alt attribute' message
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSMissingAltMessage = function () {
  
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
 * @method addPropertyIfDefined
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Adds an item to a list of properties 
 */

OpenAjax.a11y.CacheNLS.prototype.addPropertyIfDefined = function (list, item, property) {

  if (typeof item[property] !== 'undefined') {
    list.push(this.getNLSLabelAndValue(property, item[property]));
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

OpenAjax.a11y.WCAG20.prototype.addNLS = function (locale, nls) {

  var item;
  var  p,  p_id,  np;  /* WCAG 2.0 Principle */
  var  g,  g_id,  ng;  /* WCAG 2.0 Guideline */
  var sc, sc_id, nsc;  /* WCAG 2.0 Success Criterion */

  // Validate the WCAG 2.0 NLS properties
  if (!nls.abbrev) OpenAjax.a11y.logger.debug("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  if (!nls.title)  OpenAjax.a11y.logger.debug("Missing title property for WCAG 2.0 with locale: "        + locale);
  if (!nls.url)    OpenAjax.a11y.logger.debug("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  if (!nls.levels) OpenAjax.a11y.logger.debug("Missing levels property for WCAG 2.0 with locale: "        + locale);
  
  var wcag20 = new OpenAjax.a11y.WCAG20NLS(locale, nls.abbrev, nls.title, nls.url, nls.levels);
  
 //  OpenAjax.a11y.logger.debug("WCAG 2.0 " + nls.title + " for " + locale); 
  
  if (!nls.principles || typeof nls.principles !== 'object') {
  
    OpenAjax.a11y.logger.debug("Missing principles object or not at an object for WCAG 2.0 with locale: " + locale);
    return;
    
  } else {
  
    for (p_id in nls.principles) {
    
      p = nls.principles[p_id];
      
//      OpenAjax.a11y.logger.debug("Principle " + p.title); 
      
      np = new OpenAjax.a11y.WCAG20NLSPrinciple(p_id, p);
      
      for (g_id in p.guidelines) {
      
        g = p.guidelines[g_id];
    
//        OpenAjax.a11y.logger.debug("  Guideline " + g.title); 
      
        ng = new OpenAjax.a11y.WCAG20NLSGuideline(np, g_id, g);

        for (sc_id in g.success_criteria) {
      
          sc = g.success_criteria[sc_id];
     
          nsc = new OpenAjax.a11y.WCAG20NLSSuccessCriterion(np, ng, sc_id, sc);
          
//          OpenAjax.a11y.logger.debug("    Success Criteria " + nsc.sc_id + " (" + sc_id + "): " + sc.title); 
      
          ng.success_criteria.push(nsc); 
      
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

/**
 * @method getNLSItemById
 *
 * @memberOf OpenAjax.a11y.WCAG20NLS
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements 
 *
 * @param {String}  id  -  id for the wcag item to get NLS information
 *
 * @return {Object}  WCAG 2.0 NL object
 */

OpenAjax.a11y.WCAG20NLS.prototype.getNLSItemById = function(id) {
  
  for (var i = 0; i < this.principles.length; i++) {
  
     var p = this.principles[i];

//     OpenAjax.a11y.logger.debug("P Compare: " + p.principle_id + " " + id );

     if (p.principle_id == id) return p;     

     for (var j = 0; j < p.guidelines.length; j++) {
     
       var g = p.guidelines[j];

//       OpenAjax.a11y.logger.debug("  G Compare: " + g.guideline_id + " " + id );

       if (g.guideline_id == id) return g;
     
       for (var k = 0; k < g.success_criteria.length; k++ ) {
       
         var sc = g.success_criteria[k];

//         OpenAjax.a11y.logger.debug("  SC Compare: " + sc.success_criteria_id + " " + id );

         if (sc.sc_id == id) return sc;
       
       } // end loop
     
     } // end loop
     
  } // end loop   
    
  return null;  
};


/**
 * @method getSuccessCriteriaLevel
 *
 * @memberOf OpenAjax.a11y.WCAG20NLS
 *
 * @desc Returns the success criteria 
 *
 * @param {String}  sc_id  -  String representing the success criteria id
 *
 * @return {Number}  Number representing the WCAG 2.0 success level 
 */

OpenAjax.a11y.WCAG20NLS.prototype.getSuccessCriteriaLevel = function (sc_id) {

  var principles = this.principles;

  for (i = 0; i < principles.length; i++) {

    var p = wcag20_nls.principles[i];

    for (j = 0; j < p.guidelines.length; j++) {

      var g = p.guidelines[i];

      for (k = 0; k < g.success_criteria.length; k++) {
      
        var sc = g.success_criteria[i];
        
        if (sc.sc_id === sc_id) return sc.level;

      }
    }
  }

  return OpenAjax.a11y.WCAG20_LEVEL.UNKNOWN;

};



/**
 * @method getNLSWCAG20Level
 *
 * @memberOf OpenAjax.a11y.WCAG20NLS
 *
 * @desc Returns an NLS localized version of WCAG 2.0 success criterion level 
 *
 * @param {Number}  level  -  Numerical constant defined in OAA cache representing the WCAG 2.0 success criterion level
 */

OpenAjax.a11y.WCAG20NLS.prototype.getNLSWCAG20Level = function (level) {

  return this.levels[level];
  
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
 * @param  {Object}  principle_id  - Principle id
 * @param  {Object}  info          - Principle information
 *
 * @property  {String}  principle_id  - Principle id 
 * @property  {String}  title         - Title of the principle 
 * @property  {String}  description   - Description of principle 
 * @property  {String}  url_spec      - URL to information on the requirement
 *
 * @property  {Array}   guidelines - Array of WCAG 2.0 guideline objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSPrinciple = function(principle_id, info) {

  this.principle_id = principle_id;    
  this.title        = info.title;    
  this.description  = info.description;    
  this.url_spec     = info.url_spec;   
  
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
 * @param  {WCAG20NLSPrinciple}  principle     - Principle object reference 
 * @param  {String}              guideline_id  - Guideline ID
 * @param  {Object}              info          - Guideline information object
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 *
 * @property  {String}  guideline_id  - Guideline id 
 * @property  {String}  title         - Title of the guideline 
 * @property  {String}  description   - Description of the guideline 
 * @property  {String}  url_spec      - URL to information on the guideline requirement
 *
 * @property  {Array}   success_criteria  - Array of WCAG 2.0 success criteria objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSGuideline = function(principle, guideline_id, info) {

  this.principle     = principle;    
  
  this.guideline_id  = guideline_id;   
  
  this.title         = info.title;    
  this.discription   = info.description;    
  this.url_spec      = info.url_spec;   
  
  this.success_criteria = [];
  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSSuccessCriterion                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSSuccessCriterion
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  WCAG 2.0 Success Criteria information with properties with localized NLS values 
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @param  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 * @param  {String}              sc_id      - Success criterion ID
 * @param  {Object}              info       - Success criterion information object
 * 
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @property  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @property  {String}  sc_id          - Success criterion ID
 * @property  {String}  title          - Title of the success criterion 
 * @property  {String}  level          - Level of importance of a success criterion
 * @property  {String}  url_spec       - URL to information on the success criteria requirement
 * @property  {String}  url_meet       - URL to information on how to meet the success criteria requirements
 * @property  {String}  url_understand - URL to information on how to understand the success criteria requirements
 * @property  {Array}   resources      - Other information related to the success criterion
 */

OpenAjax.a11y.WCAG20NLSSuccessCriterion = function(principle, guideline, sc_id, info) {

  this.principle  = principle;    
  this.guideline  = guideline;    
  
  this.sc_id      = sc_id;   
  
  this.level          = info.level;   
  this.title          = info.title;    
  this.description    = info.description;    
  this.url_spec       = info.url_spec;   
  this.url_meet       = info.url_meet;   
  this.url_understand = info.url_understand;   
  
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

OpenAjax.a11y.WCAG20NLSSuccessCriterion.prototype.addResource = function(resource) {

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
 *       the evaluation of WCAG 2.0 requirements
 *
 * @param  {Object}  ruleset  - Ruleset object
 * @param  {String}  url      - URL of web page analyzed
 * @param  {String}  title    - title of web page analyzed
 *
 * @property  {RuleResultAggregation}  level_all_results          - Reference to the rule results summary for all rules 
 * @property  {RuleResultAggregation}  level_a_summary_results    - Reference to the rule results summary for success criterion level A rules 
 * @property  {RuleResultAggregation}  level_aa_summary_results   - Reference to the rule results summary for success criterion level AA rules 
 * @property  {RuleResultAggregation}  level_aaa_summary_results  - Reference to the rule results summary for success criterion level AAA rules 
 * @property  {Array}                  principle_results          - Array of WCAG20ResultPrinciple objects
 */
 
OpenAjax.a11y.WCAG20Result = function (ruleset, url, title) {

  this.ruleset = ruleset;
  this.title = title;
  this.url   = url;
  
  this.level_all_results         = new OpenAjax.a11y.RuleResultAggregation('wcag20_all_results');
  this.level_a_summary_results   = new OpenAjax.a11y.RuleResultAggregation('level_a_summary_results');
  this.level_aa_summary_results  = new OpenAjax.a11y.RuleResultAggregation('level_aa_summary_results');
  this.level_aaa_summary_results = new OpenAjax.a11y.RuleResultAggregation('level_aaa_summary_results');
  
  this.principle_results = [];

  var pr, gr, scr;
  
  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('1');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.1.1');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.4');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.5');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.6');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.7');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.8');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.2.9');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.3.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.3.3');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.4');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.6');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.7');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.8');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('1.4.9');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('2');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.1.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.1.3');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.2.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.2.5');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.3.2');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.4');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.6');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.7');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.8');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.9');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('2.4.10');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('3');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.1.6');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.2.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.2.5');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('3.3.6');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('4');

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('4.1');

  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('4.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultSuccessCriterion('4.1.2');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);


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
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Add rule result object to the aggregations of rule results by WCAG 2.0 Principles, Guidelines, Success Criteria and SC Levels 
 *
 * @param  {RuleResult}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addRuleResult = function (rule_result) {

  var rule_mapping = rule_result.rule_mapping;

//  OpenAjax.a11y.logger.debug("primary: " + rule_result.rule.wcag_primary_id + " level: " + rule_mapping.wcag20_level + " p: " + rule_mapping.wcag20_principle_index  + " g: " + rule_mapping.wcag20_guideline_index + " sc: " + rule_mapping.wcag20_success_criterion_index );

  this.level_all_results.addRuleResult(rule_result);

  switch (rule_mapping.wcag20_level) {
                     
  case OpenAjax.a11y.WCAG20_LEVEL.A:
    this.level_a_summary_results.addRuleResult(rule_result);
    break;
                     
  case OpenAjax.a11y.WCAG20_LEVEL.AA:
    this.level_aa_summary_results.addRuleResult(rule_result);
    break;
                     
  case OpenAjax.a11y.WCAG20_LEVEL.AAA:
    this.level_aaa_summary_results.addRuleResult(rule_result);
    break;
                       
  default:
    break;
                      
  } // end switch

//  OpenAjax.a11y.logger.debug("WCAG20Result: " + rule_result.rule.wcag_primary_id + " pi: " + rule_mapping.wcag20_principle_index + " gi: " + rule_mapping.wcag20_guideline_index  + " gi: " + rule_mapping.wcag20_success_criterion_index);

  this.principle_results[rule_mapping.wcag20_principle_index].addRuleResult(rule_mapping, rule_result);

};

/** 
 * @method getResultItemById
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Returns result object by ID
 *
 * @param   {String}  principle_result  - Principle result object to add
 *
 * @return  {Object}  Result object
 */

OpenAjax.a11y.WCAG20Result.prototype.getResultItemById = function (id) {

   var ids = id.split('.');
   var index; 
   
   var item = null;
   
   for (var i = 0; i < ids.length; i++) {
     index = parseInt(ids[i], 10);
     if (typeof index === 'number') {
       ids[i] = index - 1;
     }
     else {
       return null;
     }
   }

   switch (ids.length) {
   
   case 1:
     item = this.principle_results[ids[0]];
     break;
     
   case 2:
     item = this.principle_results[ids[0]].guideline_results[ids[1]];
     break;

   case 3:
     item = this.principle_results[ids[0]].guideline_results[ids[1]].success_criteria_results[ids[2]];
     break;
  
   default:
     break;
  }   

  return item;
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
    
  var html = "";
    
  function toHtmlStart(title, url) {
  
    var html = "";
    
    html += "<!DOCTYPE html>\n";
    
    html += "<html>\n";
 
    html += "  <head>\n";
    html += "    <title>WCAG 2.0 Report for " + title + "</title>\n"; 
    html += "\n"; 
    html += "  </head>\n";
    html += "\n"; 
 
    html += "  <body>\n";
    html += "    <div role='banner'>\n";    
    html += "      <p class='title'>WCAG 2.0 Report for " + title + "</p>\n"; 
    html += "      <p class='url'>URL: " + url + "</p>\n"; 
    html += "    </div>\n";
    return html;
    
  }  

  function toHtmlEnd() {
  
    var html = "";
     
    html += "  </body>\n";

    html += "</html>\n";
    
    return html;    
  }  


  html += toHtmlStart();

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
 * @param  {String}  principle_id  - Principle ID
 *
 * @property  {String}                 principle_id            - Principle id
 * @property  {RuleResultAggregation}  rule_result_aggregation - Reference to the rule results summary information for the principle 
 * @property  {Array}                  result_guidelines       - Array of wcag guideline result objects for this principle
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple = function (principle_id) {

  this.principle_id = principle_id;
  this.rule_result_aggregation = new OpenAjax.a11y.RuleResultAggregation('wcag20_principle_' + principle_id);
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
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultPrinciple
 *
 * @desc Add rule result object to the aggregation of rule results for a WCAG 2.0 principle 
 *
 * @param  {RuleMapping}  rule_mapping  - Rule mapping information for the rule
 * @param  {RuleResult}   rule_result   - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple.prototype.addRuleResult = function (rule_mapping, rule_result) {

//  OpenAjax.a11y.logger.debug("WCAG20ResultPrinciple: " + rule_result.rule.wcag_primary_id );

  this.rule_result_aggregation.addRuleResult(rule_result);

  this.guideline_results[rule_mapping.wcag20_guideline_index].addRuleResult(rule_mapping, rule_result);

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
 * @param  {String}  guideline_id  - Guideline id 
 *
 * @property  {String}                 guideline_id             - Guideline id
 * @property  {RuleResultAggregation}  rule_result_aggregation  - Reference to the rule results summary information for a guideline 
 * @property  {Array}                  result_sucess_creiteria  - Array of success criterion result objects for the guideline
 */
 
OpenAjax.a11y.WCAG20ResultGuideline = function (guideline_id) {

  this.guideline_id = guideline_id;
  this.rule_result_aggregation = new OpenAjax.a11y.RuleResultAggregation('wcag20_guideline_' + guideline_id);
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
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultGuideline
 *
 * @desc Add rule result object to the aggregation of rule results for a WCAG 2.0 guideline 
 *
 * @param  {RuleMapping}  rule_mapping  - Rule mapping information for the rule
 * @param  {RuleResult}   rule_result   - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20ResultGuideline.prototype.addRuleResult = function (rule_mapping, rule_result) {

//  OpenAjax.a11y.logger.debug("WCAG20ResultGuideline: " + rule_result.rule.wcag_primary_id );

  this.rule_result_aggregation.addRuleResult(rule_result);

  this.success_criteria_results[rule_mapping.wcag20_success_criterion_index].addRuleResult(rule_result);

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
 * @param  {String}      success_criterion_id  - Success Criterion ID
 *
 * @property  {String}   success_criterion_id    - Success Criterion ID
 * @property  {Array}    rule_result_aggregation - Reference to the rule results summary information for a success criterion
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion = function (success_criterion_id) {

  this.success_criterion_id     = success_criterion_id;
  this.rule_result_aggregation  = new OpenAjax.a11y.RuleResultAggregation('wcag20_success_criterion_' + success_criterion_id);
};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultSuccessCriterion
 *
 * @desc Add rule result object to the aggregation of rule results for a WCAG 2.0 guideline 
 *
 * @param  {RuleResult}   rule_result   - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.addRuleResult = function (rule_result) {

//  OpenAjax.a11y.logger.debug("WCAG20ResultSuccessCriterion: " + rule_result.rule.wcag_primary_id );

  this.rule_result_aggregation.addRuleResult(rule_result);

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
      OpenAjax.a11y.logger.debug("  ** Error loading ruleset: " + ruleset_data[id]);
    break;
    
  default:
    OpenAjax.a11y.logger.debug("  ** Rule set type: '" + type + "' not supported");
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
     if (this.rulesets[i].ruleset_id === ruleset_id) return this.rulesets[i]; 
  }

  // if ruleset_id is not defined, return the first ruleset, if it is defined
  if (this.rulesets[0]) return this.rulesets[0];
  
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

  var rulesets = [];
  
  for (var i = 0; i < this.rulesets.length; i++) {  
    rulesets.push(this.rulesets[i]);
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
 * @property {String} ruleset_id           - id of the ruleset           
 * @property {String} ruleset_title        - NLS localized title of the ruleset           
 * @property {String} ruleset_description  - Description of the ruleset         
 * @property {String} ruleset_author_name  - Name of the author(s) or organization         
 * @property {String} ruleset_author_url   - URL to the author(s) or organization       
 * @property {String} ruleset_updated      - Last time the ruleset was updated     
 * @property {Number} number_of_rules      - number of rules in the rule set
 *
 * @property {Array}  rule_mappings - Array of WCAG20RuleMapping objects          
 *
 * @property {Number} wcag20_level - Level of WCAG 2.0 Success Criteria to evaluate (i.e. A, AA, AAA)
 *
 * NOTE: The following properties are defined after each evaluation
 *
 * @property {String} title  - The title of the last document evaluated
 * @property {String} url    - The url of the last document evaluated
 *
 * @property {Object} doc          - Reference to browser document object model (DOM) that holds the document to be analyzed
 * @property {Object} wcag20_nls   - Reference to WCAG 2.0 NLS object for current language
 * @property {Object} log          - Reference to Log object
 * @property {Object} dom_cache    - Reference to DOMCache object
 * @property {Object} result       - Reference to WCAG20Result object
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

  var i;
  var  p_id,  rp_data,  rp_new;  // variables for creating RulesetPrinciple objects
  var  g_id,  rg_data,  rg_new;  // variables for creating RulesetGuideline objects
  var sc_id, rsc_data, rsc_new;  // variables for creating RulesetSuccessCriterion objects
  var  r_id,  rr_data,  rr_new;  // variables for creating RulesetRule objects
 
  this.type = "WCAG20";
  this.ruleset_title = {};
  this.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.AA;
  
  // Check for ruleset id

  if (ruleset_data['ruleset_id']) {
    this.ruleset_id  = ruleset_data['ruleset_id'];
    OpenAjax.a11y.logger.debug("Loading ruleset with the id: " + this.ruleset_id);
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing id");
    return null;
  }

  // Check for ruleset version

  if (ruleset_data['version']) {
    this.ruleset_version  = ruleset_data['version'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing version");
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
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing default title");
    return null;
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing last updated date, set to null");
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
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing default description");
    this.ruleset_description = "no description";
  }

  // Check for default and localized ruleset descriptions

  if (ruleset_data.author && ruleset_data.author.name) {
    this.ruleset_author_name = ruleset_data.author.name;
    if (ruleset_data.author.url) this.ruleset_author_url = ruleset_data.author.url;
    else this.ruleset_author_url = "no author url";    
    OpenAjax.a11y.logger.debug("  Ruleset Author: " + this.ruleset_author_name);
    OpenAjax.a11y.logger.debug("  Ruleset URL: " + this.ruleset_author_url);
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " missing author information");
    this.ruleset_author_name = "no author";
    this.ruleset_author_url  = "no author url";
  }

  // Check for ruleset last updated property 

  if (ruleset_data['last_updated']) {
    this.ruleset_updated  = ruleset_data['last_updated'];
  } 
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset missing last updated date, set to null");
    this.ruleset_updated  = "0000-00-00";
  }


  this.number_of_rules   = 0;

  this.rule_mappings = [];

  var rule_mappings_from_data = ruleset_data['rule_mappings'];
  
  var rm_new;

  if (rule_mappings_from_data) {

    for (var rule_id in rule_mappings_from_data) {
  
      var rule_mapping = rule_mappings_from_data[rule_id];
  
      if (typeof rule_mapping.type === 'number') {
    
        if (typeof rule_mapping.enabled === 'boolean')
          rm_new = new OpenAjax.a11y.WCAG20RuleMapping(rule_id, rule_mapping.type, rule_mapping.enabled);
        else  
          rm_new = new OpenAjax.a11y.WCAG20RuleMapping(rule_id, rule_mapping.type, true);
      
        if (rm_new && rm_new.rule) {
          this.rule_mappings.push(rm_new);
      
          this.number_of_rules++;
          
//          OpenAjax.a11y.logger.debug("  Rule " + rule_id + " has been added");              
        }
      } 
      else {
        OpenAjax.a11y.logger.debug("        ** Ruleset rule " + rule_id + " is missing 'type' property");              
      }    
    } // end loop
  }
  else {
    OpenAjax.a11y.logger.debug("  ** Ruleset " + this.ruleset_id + " does not have any rules");
  }
  
  // local references to current NLS information, based on current locale setting
  
  this.wcag20_nls = OpenAjax.a11y.all_wcag20_nls.getNLS();      
  
  // References related to evaluating a document
  // Initial values are null, properties are set with the "newResource' method
  
  this.title = "";
  this.url   = "";
  
  this.doc       = null;
  this.log       = null;
  this.dom_cache = null;        
  this.wcag20_results    = null; 
  
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

  this.wcag20_level = level;
  
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
 * @method setDataTableAssumption
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Enable and disable the cache from testing for broken urls 
 *
 * @param  {Boolean}  assumption   - If false asssumes tables are used for layout unless header cells or other indicator of a data table is found
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.setDataTableAssumption = function (assumption) {
  
  OpenAjax.a11y.DATA_TABLE_ASSUMPTION = assumption;
  
};

/**
 * @method evaluate
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Evaluate a document using the OpenAjax ruleset and return an evaluation object 
 *
 * @param  {String}    url     - url of document being analyzed    
 * @param  {String}    title   - Title of document being analyzed    
 * @param  {Object}    doc     - Browser document object model (DOM) to be evaluated    
 *
 * @param  {Function}  progessCallBackFunction Function will be called periodically to provide progress information 
 *
 * @param {Boolean} build_cache When true will build all cache in one tranversal of the DOMElements cache, when false specialized caches will be built when they are need by a rule
 *
 */
 
OpenAjax.a11y.WCAG20Ruleset.prototype.evaluate = function (url, title, doc, progessCallBackFunction, build_cache) {
      
  
  var PROGRESS = OpenAjax.a11y.PROGRESS;

  this.doc   = doc;
  this.title = title;
  this.url   = url;
  
  // OpenAjax.a11y.logger.debug("Starting evaluation: " + this.ruleset_id + " " + this.default_name + " " + this.number_of_rules + " rules" );
  
  this.log = new OpenAjax.a11y.Log(this.ruleset_id, this.default_name, this.number_of_rules, progessCallBackFunction);

  // OpenAjax.a11y.logger.debug(this.log);

  this.dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, this.log);      

  this.wcag20_results        = new OpenAjax.a11y.WCAG20Result(this, url, title); 

  this.rule_category_results = new OpenAjax.a11y.RuleCategoryResult(this, url, title); 

  this.dom_cache.updateDOMElementCache();
  
  if (build_cache) { 
    this.dom_cache.updateAllCaches();
  }  
  
  var rule_mappings = this.rule_mappings;
  var rule_mappings_len = rule_mappings.length;

  OpenAjax.a11y.logger.debug("Number of rules: " + rule_mappings_len);

  for (var i = 0; i < rule_mappings_len; i++) {
    
    var rule_mapping = rule_mappings[i];
    var rule = rule_mapping.rule;
    var rule_definition  = rule.getNLSDefinition(rule_mapping.type);                     

    if (rule_mapping) {

      rule_result = new OpenAjax.a11y.RuleResult(rule_mapping); 
      
      if (rule_mapping.enabled) {      

        this.log.update(PROGRESS.REQUIREMENT, rule_mapping.rule_id, rule.rule_id);   

        OpenAjax.a11y.logger.debug("Validating rule " + i + ": " + rule.rule_id + "  " + rule_definition + " level: " + rule_mapping.wcag20_level);

        // Check to see if the rule is defined is of the right level  
        if (rule && rule_mapping.wcag20_level <= this.wcag20_level) {

          rule_result.rule_evaluated = true;

          // Check to see if the specialized cache needed for the rule is already 
          // If not create the specialized cache
                     
          if (!build_cache ) {
            var up_to_date = this.dom_cache.isUpToDate(rule.cache_dependency);
            if (up_to_date.exists) {
              if(!up_to_date.up_to_date) this.dom_cache.updateCache(rule.cache_dependency);
            } else {
              this.log.update(PROGRESS.RULE, "Cache " + rule.cache_dependency + " for rule with id=" + rule.rule_id +  " does not exist.");
              continue;
            }
          } 

          if (rule.language_dependency.length) {
            // Rules with a language restriction
            if (rule.language_dependency.indexOf(OpenAjax.a11y.locale) >= 0) {
              rule.validate(this.dom_cache, rule_result);
            }
            else {
              this.log.update(PROGRESS.RULE, "Rule with id='" + rule.rule_id + "' does not apply to locale: " + OpenAjax.a11y.locale);                           
            }
          }
          else {
            // Rules without any language restrictions
            rule.validate(this.dom_cache, rule_result);
          }   

          this.log.update(PROGRESS.RULE, rule_definition, rule.rule_id);
                     
        }
        else {
          if (rule) this.log.update(PROGRESS.RULE, " ** Rule with id=" + rule.rule_id + " is disabled");       
          else this.log.update(PROGRESS.RULE, " ** Rule for success criteria " + rsc.ruleset_id + " is undefined");                            
        }
      }   

      this.rule_category_results.addRuleResult(rule_result);
      
      this.wcag20_results.addRuleResult(rule_result);

      OpenAjax.a11y.logger.debug("Aggregating rule Results: " + rule_result);

    }                 
  } // end rule loop
    
  this.log.update(PROGRESS.COMPLETE, "Evaluation Complete");
      
  return this;
};

/**
 * @method getCacheItemsByRuleCategory
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of cache items based on their evaluation results and rule category
 *
 * @param  {Number}  rule_category  - Number representing the rule category
 * @param  {Number}  filter         - Number representing the evaluation results filter
 *
 * @return {FilteredCacheItemResults}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getCacheItemsByRuleCategory = function (rule_category, filter) {

  var results = new OpenAjax.a11y.cache.FilteredCacheItemResults(this.dom_cache);
  
  if (this.dom_cache) results.getCacheItemResults(rule_category, filter);
  
  return results;

};

/**
 * @method getRuleResultsByRuleCategories
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure by rule category
 *
 * @return {RuleResultSummary}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getRuleResultsByRuleCategories = function (wcag20_level) {

  function addRuleCategory(title, aggregation) {
  
    var rule_result_summary_group = new OpenAjax.a11y.cache.RuleResultSummaryGroup(title, aggregation);
    
    var rule_results     = aggregation.rule_results;
    var rule_results_len = rule_results.length;
      
    for (var i = 0; i < rule_results_len ; i++) {
      var rule_result = rule_results[i];
      var rule_wcag20_level = rule_result.rule.getWCAG20Level();
      
      if (rule_wcag20_level <= wcag20_level) rule_result_summary_group.addRuleResultItem(rule_result);
    }
    
    rule_result_summary.addRuleResultItem(rule_result_summary_group);
  
  }

  var rule_category_results = this.rule_category_results;

  var rule_result_summary = new OpenAjax.a11y.cache.RuleResultSummary('Rule Categories');
  
  if (rule_category_results) {
  
//  addRuleCategory('Abbreviation Rules', rule_category_results.abbreviation_rule_results);
    addRuleCategory('Audio Rules', rule_category_results.audio_rule_results);
    addRuleCategory('Color Contrast Rules', rule_category_results.color_contrast_rule_results);
    addRuleCategory('Form Control Rules', rule_category_results.control_rule_results);
    addRuleCategory('Heading Rules', rule_category_results.heading_rule_results);
    addRuleCategory('Image Rules', rule_category_results.image_rule_results);
    addRuleCategory('Landmark Rules', rule_category_results.landmark_rule_results);
//  addRuleCategory('Language Rules', rule_category_results.language_rule_results);
    addRuleCategory('Link Rules', rule_category_results.link_rule_results);
//  addRuleCategory('List Rules', rule_category_results.list_rule_results);
    addRuleCategory('Table Rules', rule_category_results.table_rule_results);
    addRuleCategory('Video Rules', rule_category_results.video_rule_results);
    addRuleCategory('Widget Rules', rule_category_results.widget_rule_results);
    addRuleCategory('Content Rules', rule_category_results.content_rule_results);
    
  }
  
  return rule_result_summary;

};

/**
 * @method getRuleResultsByRuleGrouping
 *
 * @memberOf OpenAjax.a11y.WCAG20Ruleset
 *
 * @desc Returns an object containing a set of rules organized in a tree structure based on the grouping parameter
 *
 * @param {Number}  grouping  - Grouping of rules constant
 *
 * @return {RuleResultSummary}  The object containing the set of cache items
 */

OpenAjax.a11y.WCAG20Ruleset.prototype.getRuleResultsByRuleGrouping = function (grouping, wcag20_level) {

  var RULE_GROUP = OpenAjax.a11y.RULE_GROUP;
  
  var results = null;

  switch  (grouping) {
  
  case RULE_GROUP.RULE_CATEGORIES:
    results = this.getRuleResultsByRuleCategories(wcag20_level);
    break;
    
  case RULE_GROUP.WCAG20:

  default:
    break;
  }

 return results;
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
/*                       WCAG20RuleMapping                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20RuleMapping
 *
 * @memberOf OpenAjax.a11y
 *
 * @param  {String}   rule_id  - id of the rule
 * @param  {Number}   type     - Severity of the rule (NOTE: typically REQUIRED or RECOMMENDATION)
 * @param  {Boolean}  enabled  - Initial value for the enabled property
 *
 * @property  {Rule}     rule      - Rule object
 * @property  {Number}   type      - Severity of the rule (NOTE: typically REQUIRED or RECOMMENDATION)
 * @property  {Boolean}  enabled   - Initial value for the enabled property
 * 
 * @property {Number}  wcag20_level                    - The WCAG 2.0 level of the success citeria
 * @property {Number}  wcag20_principle_index          - The index of the principle result object for aggregating rule results
 * @property {Number}  wcag20_guideline_index          - The index of the guideline result object for aggregating rule results
 * @property {Number}  wcag20_success_criterion_index  - The index of the success criteria result object for aggregating rule results
 */
 

OpenAjax.a11y.WCAG20RuleMapping = function (rule_id, type, enabled) {

   this.rule         = null;
   this.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.UNKNOWN;
   this.type         = type;
   this.enabled      = enabled;

   var r = OpenAjax.a11y.all_rules.getRuleByRuleId(rule_id);
   if (r) {
     this.rule = r;
     this.wcag20_level                   = r.getWCAG20Level();
     this.wcag20_principle_index         = r.getWCAG20PrincipleIndex(); 
     this.wcag20_guideline_index         = r.getWCAG20GuidelineIndex();
     this.wcag20_success_criterion_index = r.getWCAG20SuccessCriteriaIndex();
   }
   else {
     OpenAjax.a11y.logger.debug("  ** Rule with rule id='" + rule_id + "' does not exist!");   
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
  OpenAjax.a11y.logger.debug( message + ": " + this.timeInMillisecondToString(time) + " (" + this.rule_count + " of " + this.rules_max +")");
 }
 else {
  OpenAjax.a11y.logger.debug( message );    
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

OpenAjax.a11y.logger = {};

/**
 * @function console
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  Outputs message to the javascript console of Firefox
 * 
 * @param {String} message - Message to send to the console 
 */
OpenAjax.a11y.logger.debug = function (message) {
  if (OpenAjax.a11y.CONSOLE_MESSAGES && 
      OAA_WEB_ACCESSIBILITY_LOGGING && 
      OAA_WEB_ACCESSIBILITY_LOGGING.logger && 
      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log) {
    OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug(message);
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
    rule_types: ['Undefined', 'Required', 'Recommendation'],

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
    severities: [{ label       : 'None', 
                   abbrev      : 'none', 
                   description : 'No rule results for this element or text node',
                   tooltip     : 'No rule results were associated with this element or text node'
                  },
                  { label       : 'Violation', 
                   abbrev      : 'V', 
                   description : 'The element failed a required rule',
                   tooltip     : 'The number of elements that failed a required rule'
                  },
                 { label       : 'Warning', 
                   abbrev      : 'W', 
                   description : 'The element that failed a recommended rule',
                   tooltip     : 'The number of elements that failed a recommended rule'
                  },
                 { label       : 'Manual Check', 
                   abbrev      : 'MC', 
                   description : 'The element requires human inspection and judgement to determine if the requirement of the rule has been met',
                   tooltip     : 'The number of elements that require manual checks'
                  },
                 { label       : 'Hidden', 
                   abbrev      : 'H', 
                   description : 'A hidden element was not evaluted for accessibility, since it is invisible to users',
                   tooltip     : 'The number of elements that are hidden from users on the page and therefore not evaluated for accessibility'
                  },
                 { label       : 'Not Evaluated', 
                   abbrev      : 'ne', 
                   description : 'Element was not evaluated',
                   tooltip     : 'The number of elements that are not evaluated for accessibility'
                  },
                 { label       : 'Pass', 
                   abbrev      : 'P', 
                   description : 'The element passed the rule',
                   tooltip     : 'The number of elements that passed a required or recommended rule'
                  },
                 { label       : 'A', 
                   abbrev      : 'A', 
                   description : 'WCAG 2.0 level A',
                   tooltip     : 'The element passes WCAG 2.0 level A requirements'
                  },                 
                 { label       : 'AA', 
                   abbrev      : 'AA', 
                   description : 'WCAG 2.0 level AA',
                   tooltip     : 'The element passes WCAG 2.0 level AA requirements'
                  },
                 { label       : 'AAA', 
                   abbrev      : 'AAA', 
                   description : 'WCAG 2.0 level AAA',
                   tooltip     : 'The element passes WCAG 2.0 level AAA requirements'
                  }
                  ],  
                  
    /**
     * Implementation level of a rule on a web page
     */
  implementation_levels : [
    { 'abbrev'      : 'n/a',
      'label'       : 'n/a',
      'description' : 'Accessibility check did not apply to the elements contained in this page',
      'style'       : 'not_applicable'
    },
    { 'abbrev'      : 'C',
      'label'       : 'Complete',
      'description' : 'All accessibility requirements have been met',
      'style'       : 'complete'
    },
    { 'abbrev'      : 'AC',
      'label'       : 'Almost Complete',
      'description' : '95% or more of the accessibility checks have passed',
      'style'       : 'almost_complete'
    },
    { 'abbrev'      : 'PI',
      'label'       : 'Partial Implementation',
      'description' : 'More than 50% of the automated accessibility checks have passed',
      'style'       : 'partial_implementation'
    },
    { 'abbrev'      : 'NI',
      'label'       : 'Not Implemented',
      'description' : 'Less than 50% of the automated accessibility checks have passed',
      'style'       : 'not_implemented'
    },
    { 'abbrev'      : 'MC',
      'label'       : 'Manual Check',
      'description' : 'Human inspection and judgement is required to verify compliance',
      'style'       : 'manual_check'
    },
    { 'abbrev'      : 'C+MC',
      'label'       : 'Complete with Manual Checks',
      'description' : 'All automated accessibility checks have passed, but human inspection and judgement is still required to verify compliance',
      'style'       : 'manual_check'
    },  
    { 'abbrev'      : 'AC+MC',
      'label'       : 'Almost Complete with Manual Checks',
      'description' : '95% or more of the automated accessibility checks have passed and human inspection and judgement is also required to verify compliance',
      'style'       : 'almost_complete'
    },
    { 'abbrev'      : 'PI+MC',
      'description' : '50% or more of the automated accessibility checks have passed and human inspection and judgement is also required to verify compliance',
      'label'       : 'Partial Implementation with Manual Checks',
      'style'       : 'partial_implementation'
    },
    { 'abbrev'      : 'NI+MC',
      'label'       : 'Not Implemented with Manual Checks',
      'description' : 'Less than 50% of the automated accessibility checks have passed and human inspection and judgement is also required to verify compliance',
      'style'       : 'not_implementation'
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
      'is_widget'  : { 
        label       : 'ARIA widget role',
        description : 'If element is part of an aria widget'
      },
      'is_landmark'  : { 
        label       : 'ARIA landmark role',
        description : 'If element is part of an aria widget'
      },
      'is_live'  : { 
        label       : 'ARIA live region',
        description : 'If element is part of an aria widget'
      },


    /*
     * Calculated values based on CSS properties
     */

      'graphical' : {
        label       : 'Graphical Visibility',
        description : 'Can the item be seen visually',
        values      : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      }, 
      'is_large_font' : { 
        label       : 'Large Font',
        description : 'Boolean value used in WCAG 2.0 evaluation of color contrast ratio'
      }, 
      'is_visible_to_at' : { 
        label       : 'AT Visible',
        description : 'Is the element and its content visible to Assistive Technology',
        values : ['undefined', 'unknown', 'hidden', 'visible']
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
      'computed_label' : {
        label       : 'Label (computed)',
        description : 'The label communicated to assistive technologies for identifying the form control.'
      },     
      'computed_label_source' : {
        label       : 'Labeling Technique',
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
      'fieldset_element' : {
        label       : 'Fieldset/Legend',
        description : 'Content of the fieldset legend element'
      },     
      'legend_count' : {
        label       : 'Legend Count',
        description : 'Number of legend elements contained in a fieldset element'
      },     
      'accessible_name' : {
        label       : 'Name',
        description : 'The name of a widget used by assistive technologies to identify the widget.'
      },     
      'accessible_description' : {
        label       : 'Description',
        description : 'The description used by assistive technologies to provide additional information about a form control, widget, link, image or other element.'
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
        label       : 'Name attribute',
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

    rule_scope: ['unkown', 'Element', 'Page', 'Website'],
    
    message_severities: {
      MUST : 'must', 
      SHOULD: 'should'
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
            ID:             'COLOR 1',
            DEFINITION:     'Text content %s exceed Color Contrast Ratio (CCR) of 4.5 for any size text or 3.1 for large and/or bolded text',
            SUMMARY:        'Text %s exceed CCR of 4.5',
            ACTION:         'Adjust foreground and background colors to improve color contrast',
            MANUAL_BG_PASS: 'Background image may reduce color contrast',
            MANUAL_BG_FAIL: 'Background image may improve color contrast',
            HIDDEN:         'Text is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            PURPOSE:        ['The higher the color contrast of text the more easy it is to read, especially for people with visual impairments'                   
                            ],
            TECHNIQUES:     [ 'Change the foreground color to a more complemtary color to the background color',
                              'Change the background color to a more complemtary color to the foreground color'
                            ],
            INFORMATIONAL_LINKS: [{ type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                               title: 'WCAG 2.0 Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1', 
                               url:   'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast'
                             },
                             { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                               title: 'How to meet Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1', 
                               url:   'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast'
                             }
                            ]
        },
        COLOR_2: {
            ID:             'COLOR 2',
            DEFINITION:     'Text content %s exceed Color Contrast Ratio (CCR) of 7.0 for any size text or 4.5 for large and/or bolded text',
            SUMMARY:        'Text %s exceed CCR of 7.0',
            ACTION:         'Adjust foreground and background colors to improve color contrast',
            MANUAL_BG_PASS: 'Background image may reduce color contrast',
            MANUAL_BG_FAIL: 'Background image may improve color contrast',
            HIDDEN:         'Text is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            PURPOSE:        ['The higher the color contrast of text the more easy it is to read, especially for people with visual impairments'                   
                            ],
            TECHNIQUES:     ['Change the foreground color to a more complemtary color to the background color',
                             'Change the background color to a more complemtary color to the foreground color'
                            ],
            INFORMATIONAL_LINKS:      [{ type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                               title: 'WCAG 2.0 Success Criterion 1.4.6 Contrast (Enhanced): The visual presentation of text and images of text has a contrast ratio of at least 7:1', 
                               url:   'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7'
                             },
                             { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                               title: 'How to meet Success Criterion 1.4.6 Contrast (Enhanced): The visual presentation of text and images of text has a contrast ratio of at least 7:1', 
                               url:   'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7'
                             }                            
                            ]
        },
        CONTROL_1: {
            ID:                    'Control Rule 1',
            DEFINITION:            '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@ %s have an accessible label',
            SUMMARY:               'Controls %s have labels',
            PASS:                  '%1 control has label',
            CORRECTIVE_ACTION:     'Add label to %1 control',
            HIDDEN:                '%1 control is hidden from assistive technologies.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            PURPOSE: [
              'A label associated with a form control insures that information about the form control is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_2: {
            ID:                    'Control Rule 2',
            DEFINITION:            'Every @input@ type @image@ %s have an @alt@ or @title@ attribute with content',
            SUMMARY:               'Image button %s have alt content',
            PASS:                  'Image button has label',
            CORRECTIVE_ACTION_1:   'Add @alt@ attribute with text content',
            CORRECTIVE_ACTION_2:   'Add text content to the @alt@ attribute',
            HIDDEN:                'Image button is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'input elements of type image',
            PURPOSE: [
              'A label associated with a form control insures that information about the form control is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'The preferered technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attributes to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attributes to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H36: Using alt attributes on images used as submit buttons', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H36'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_3: {
            ID:                    'Control Rule 3',
            DEFINITION:            'Every input type radio %s be contained in a @fieldset@ and @legend@ elements to provide grouping information for radio button groups',
            SUMMARY:               'Radio button %s use FIELDSET/LEGEND',
            PASS:                  'Radio button uses @fieldset@ and @legend@ elements, and the @legend@ element has text content',
            MANUAL_CHECK_1:        'Radio button uses aria-labelledby, verify the label text content includes group information',
            MANUAL_CHECK_2:        'Radio button uses aria-label, verify the label text content includes group information',
            CORRECTIVE_ACTION_1:   'Add a @legend@ element to with text content to the @fieldset@ element to provide grouping label information for the radio buttons.',
            CORRECTIVE_ACTION_2:   'Add a @fieldset@ and @legend@ elements to provide grouping label information for the radio buttons.',
            HIDDEN:                'Radio button is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'input elements of type radio',
            PURPOSE: [
              'Radio buttons need a common grouping label to provide a context for each radio button option'                   
            ],
            TECHNIQUES: [
              '@fieldset@/@legend@ element combination is the preferred technique to provide a grouping label for radio buttons',
              '@aria-labelledby@ attributes can provide a grouping label with references to the grouping text content and the radio button option text content',
              '@aria-label@ attributes can provide a grouping label that includes both the grouping and radio button option text content'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H90: Indicating required form controls using label or legend', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H90'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'iCITA: Example 7: Fieldset/Legend for grouping radio buttons', 
                url:   'http://html.cita.illinois.edu/nav/form/radio/index.php?example=6'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'IBM Web checklist: HTML example 6', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webstructure.html'
              }                            
            ]
        },
        CONTROL_4: {
            ID:                    'Control Rule 4',
            DEFINITION:            '@button@ elements %s have text content',
            SUMMARY:               '@button@s %s have content',
            PASS:                  '@button@ element has text content',
            CORRECTIVE_ACTION:     'Add text content to @button@ element',
            HIDDEN:                '@button@ element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@button@ elements',
            PURPOSE: [
              'The text content of a @button@ element is used as a label to insure that the purpose of the button is spoken by screen readers when the button receives focus'                   
            ],
            TECHNIQUES: [
              'The text content of the @button@ element and the @alt@ attribute content of images inside the button is used as the text content'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @button@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-BUTTON'
              }
            ]
        },
        CONTROL_5: {
            ID:                    'Control Rule 5',
            DEFINITION:            '@id@ attributes %s have unique values on the web page',
            SUMMARY:               '@id@ %s be unique',
            PASS:                  '\'%1\' @id@ attribute value is unique',
            CORRECTIVE_ACTION:     'Update elements that share the \'%1\' @id@ value to have unique @id@ values',
            HIDDEN:                '%1 control is hidden from assistive technologies.',
            TARGET_RESOURCES_DESC: 'Form control elements with @id@ attributes',
            PURPOSE: [
              '@id@ attribute values can be used as references for @label@ elements, if @id@ attribute values are not unique it can result incorrect labeling of form controls'                   
            ],
            TECHNIQUES: [
              'If a form control defines an @id@ attribute, make sure the valeu is unique'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: @id@ attribute', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#adef-id'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F77: Failure of Success Criterion 4.1.1 due to duplicate values of type ID', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F77'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              }                             
            ]
        },
        CONTROL_6: {
            ID:                    'Control Rule 6',
            DEFINITION:            '@label@ element using the @for@ attribute %s reference a form control on the page',
            SUMMARY:               '@label@ %s reference control',
            CORRECTIVE_ACTION:     'Change the @label@ element @for@ attribute to reference \'%1\' to reference a form control',
            TARGET_RESOURCES_DESC: '@label@ elements',
            PURPOSE: [
              '@label@ elements only are useful for accessibility when they reference or encapsulate form controls'                   
            ],
            TECHNIQUES: [
              '@label@ elements using the FOR attribute need to reference a form control with the corresponding @id@ attribute value'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element FOR attribute', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ Element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_7: {
            ID:                    'Control Rule 7',
            DEFINITION:            '@label@ element or legend element %s contain text content',
            SUMMARY:               '@label@ %s have content',
            PASS:                  '@%1@ has text content',
            CORRECTIVE_ACTION:     'Add text content to the @%1@ element',
            HIDDEN:                '@%1@ control is hidden from asssistive technologies, so @%2@ content is ignored',
            TARGET_RESOURCES_DESC: '@label@ and @legend@ elements',
            PURPOSE: [
              'For @label@ and @legend@ elements only are useful for accessibility when they contain content'                   
            ],
            TECHNIQUES: [
              'Add text content to @label@ and @legend@ elements that help describe the purpose of the form control'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element @for@ attribute', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using @label@ elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_8: {
            ID:                    'Control Rule 8',
            DEFINITION:            '@fieldset@ element %s contain exactly one legend element',
            SUMMARY:               '@fieldset@ %s have one legend',
            PASS:                  '@fieldset@ has one @legend@ element',
            CORRECTIVE_ACTION_1:   'Add @legend@ element',
            CORRECTIVE_ACTION_2:   'Remove %1 @legend@ elements',
            HIDDEN:                '@fieldset@ element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@fieldset@ and @legend@ elements',
            PURPOSE: [
              'Multiple legend elements contained in the same fieldset may result in the improper calucation of labels for assistive technologies.'                   
            ],
            TECHNIQUES: [
              '@fieldset@ element should have one and only one @legend@ elements to help describe the purpose of the form controls contained in the @fieldset@ element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_9: {
            ID:                    'Control Rule 9',
            DEFINITION:            '@title@ attribute %s not be used to label form controls',
            SUMMARY:               '@title@ %s not be label',
            PASS:                  '@title@ is not used as label',
            CORRECTIVE_ACTION:     'Use @label@ element or ARIA technique to label %1 form control',
            HIDDEN:                '%1 control is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            PURPOSE: [
              '@title@ attribute is defined in HTML specifications as a way to label form controls'                   
            ],
            TECHNIQUES: [
              'The preferered technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attributes to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attributes to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_10: {
            ID:                    'Control Rule 10',
            DEFINITION:            'Labels %s be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be unique',
            PASS:                  'Label is unique',
            CORRECTIVE_ACTION_1:   'Add label to %1 control',
            CORRECTIVE_ACTION_2:   'Change the @label@ element content, use @fieldset@/@legend@ elements or ARIA technique to make label text content unique on the page',
            HIDDEN:                '%1 control is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_11: {
            ID:                    'CONTROL 11',
            DEFINITION:            'If there is more than one form on page, input element of type submit and reset %s have unique labels using the value attribute',
            SUMMARY:               'Labels %s be unique',
            PASS:                  'Label is unique',
            CORRECTIVE_ACTION_1:   'Add label to %1 control',
            CORRECTIVE_ACTION_2:   'Change the @value@ attribute content, use @fieldset@/@legend@ elements or ARIA technique to make @submit@ and @reset@ labels unique on the page',
            HIDDEN:                '%1 control is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page',                   
              '@submit@ and @reset@ form controls have default labels and if there is more than one form on a page the user may not understand which form they are submitting'                   
            ],
            TECHNIQUES: [
              'The preferred technique for changing the default label for @submit@ and @reset@ controls is the @value@ attribute',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_12: {
            ID:                    'Control Rule 12',
            DEFINITION:            'Labels %s be must describe the purpose of every button, textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be descriptive',
            MANUAL_CHECK:          'Verify the label describes the purpose and input required for @%1@ form control',
            CORRECTIVE_ACTION:     'Add a @label@ element, use @fieldset@/@legend@ elements or ARIA lechnique to provide a label for @%1@ form control',
            HIDDEN:                '%1 control is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },    
        HEADING_1: {
            ID:                    'Heading Rule 1',
            DEFINITION:            'Each page %s contain at least one @h1@ element and each @h1@ element must have content',
            SUMMARY:               'Page %s have @h1@ element',
            PASS:                  'Page has @h1@ element',
            CORRECTIVE_ACTION_1:   'Add a @h1@ element at the begining of the main content of the page',
            CORRECTIVE_ACTION_2:   '@h1@ element does not contain content',
            HIDDEN:                '@h1@ element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@h1@ and @body@ elements',
            PURPOSE: [
              'Headings provide a navigation point for users of asssitive technologies to the main content and help users understand the main content of the page'                   
            ],
            TECHNIQUES: [
              'Include an @h1@ element at the begining of the main content',
              'The text content of the @h1@ element should describe the main content of the page',
              'The @h1@ element should be visible graphically and to assistive technologies, do not hide using CSS techniques'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @h1@ element', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              }                            
            ]
        },    
        HEADING_2: {
            ID:                    'Heading Rule 2',
            DEFINITION:            '@h1@ elements %s should be a child element of a @main@ landmark',
            SUMMARY:               '@h1@ %s be in @main@ landmark',
            PASS:                  '@h1@ is a child element of a @main@ landmark',
            CORRECTIVE_ACTION:     'Position the @h1@ element as one of the first descendant elements of a @main@ landmark',
            HIDDEN:                '@h1@ element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@h1@ elements and elements with ARIA attribute @role="main"@',
            PURPOSE: [
              'Headings provide a navigation point for users of asssitive technologies to the main content and help users understand the main content of the page',
              'Including both @main@ landmarks and @h1@ elements provides a redundent way for users of assistive technology to find the main topics of a web page'
            ],
            TECHNIQUES: [
              'Include an @h1@ element at the beginning of each @main@ landmark',
              'If there is more than one @main@ landmark, use @aria-labelledby@ on the @main@ landmark to reference the @h1@ element as a name for @main@ landmark'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @h1@ element', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },                            
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: @main@ role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#main'
              }                            
            ]
        },    
        HEADING_3: {
            ID:                    'Heading Rule 3',
            DEFINITION:            'Sibling heading elements %s should be unique',
            SUMMARY:               'Sibling headings %s be unique',
            PASS:                  '%1 heading content is unique among sibling headings',
            CORRECTIVE_ACTION:     'Change %1 heading content to describe the differences sibling sections',
            HIDDEN:                '%1 element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'Heading elements',
            PURPOSE: [
              'If section headings that share the same parent heading are NOT unique users of assistive technology will not be able to descern the differences between sibling secitons of the web resource'
            ],
            TECHNIQUES: [
              'Make sure the content of sibling headings that share the same parent heading help users understand the unique content of each section they describe'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Sub Headings', 
                url:   'http://html.cita.illinois.edu/nav/heading/'
              }                            
            ]
        },    
        HEADING_4: {
            ID:                    'Heading Rule 4',
            DEFINITION:            'Heading elements %s describe the sections they label',
            SUMMARY:               'Headings %s be descriptive',
            MANUAL_CHECK:          'Check %1 element to make sure it describes the section it labels',
            HIDDEN:                '%1 element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'Heading elements',
            PURPOSE: [
              'If headings are NOT descriptive or unique they will confuse users of assistive technology'
            ],
            TECHNIQUES: [
              'Include headings elements at the proper level for each section of a web page',
              'Use headings as labels for ARIA landmarks to provide redundent page navigation capabilities for users of assistive technologies',
              'Check headings against other headings in the document to make sure the headings uniquely describe content of each section of the web page',
              'If headings are too similar to each other users of assistive technology will not be able to use them to understand the differences between different sections of the web page'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Sub Headings', 
                url:   'http://html.cita.illinois.edu/nav/heading/'
              }                            
            ]
        },    
        IMAGE_1: {
            ID:                    'Image Rule 1',
            DEFINITION:            'Each image %s have an alt attribute',
            SUMMARY:               'Image %s have alt',
            PASS:                  'Image has @alt@ attribute',
            CORRECTIVE_ACTION:     'Add a @alt@ attribute to the image',
            PRESENTATION:          '@%1@ element is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
            HIDDEN:                '@%1@ element is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },
        IMAGE_2: {
            ID:                    'Image Rule 2',
            DEFINITION:            'The @longdesc@ attribute %s have a valid URI',
            SUMMARY:               '@longdesc@ %s be valid',
            PASS:                  '@longdesc@ attribute is a valid URI',
            CORRECTIVE_ACTION:     'Change @longdesc@ attribute to a valid URI',
            MANUAL_CHECK:          'Use a browser to test if the @longdesc@ attribute is a valid URL',
            HIDDEN:                '@img@ element is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@',
            PURPOSE: [
              'Some images (i.e charts, bar graphs, organizational charts, complex pictures and images) need a longer text equivalent than can be provided with the alt text content'
            ],
            TECHNIQUES: [
              '@longdesc@ can be used to provide an internal link or extenal link to information that provides a extended and more detailed text equivalent of the image'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: longdesc attribute', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-longdesc-IMG'
              },
              { type: OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H45: Using longdesc',
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H45'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G92: Providing long description for non-text content that serves the same purpose and presents ', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G92'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G74: Providing a long description in text near the non-text content, with a reference to the location of the long description in the short description', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G74'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G73: Providing a long description in another location with a link to it that is immediately adjacent to the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G73'
              },
              { type: OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H45: Using longdesc',
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H45'
              },  
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },
        IMAGE_3: {
            ID:                    'IMAGE 3',        
            TITLE:                 'The file name of the image %s not be part of the alt text content',
            ID:                    'Image Rule 3',
            DEFINITION:            'The file name of the image %s not be part of the alt text content',
            SUMMARY:               'Don\'t use filename',
            PASS:                  '@alt@ attribute does not contain the filename',
            CORRECTIVE_ACTION:     'Change @alt@ attribute to describe the purpose and/or content of the image',
            PRESENTATION:          '@%1@ control is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
            HIDDEN:                '@%1@ control is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image and the file name is not useful information',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_4_EN: {
            ID:                    'Image Rule 4 (English)',
            DEFINITION:            'The length of the @alt@ attribute content %s less than 100 characters',
            SUMMARY:               '@alt@ less than 100 characters',
            PASS:                  '@alt@ attribute is less than 100 characters',
            CORRECTIVE_ACTION:     'Change @alt@ attribute content to less than 100 characters',
            PRESENTATION:          '@%1@ control is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
            HIDDEN:                '@%1@ control is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image and the file name is not useful information',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_5: {
            ID:                    'Image Rule 5',
            DEFINITION:            'If an image has a height or width of 1 pixel or its alt text set to empty, the image %s set its role attribute to "presentation" or the image %s be removed and CSS %s should be used for positioning.',
            SUMMARY:               '@alt=""@ for small images',
            PASS:                  'Image is not a small image',
            CORRECTIVE_ACTION:     'Change @alt@ attribute content to empty string',
            PRESENTATION:          '@%1@ element is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
            HIDDEN:                '@%1@ element is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@',
            PURPOSE: [
              'Images that are 1 pixel high or 1 pixel wide are stylistic images and the @alt@ attribute should be set to the empty string'                   
            ],
            TECHNIQUES: [
              'Small images are purely stylistic or decorative and the @alt@ text conent should be the empty string (i.e. @alt=""@)'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_6: {
            ID:                    'Image Rule 6',
            DEFINITION:            'If @alt=""@ or @role="presentation"@ the image %s be used just for styling or decoration',
            SUMMARY:               '@alt=""@ or @role="presentation"@ %s be decorative',
            MANUAL_CHECK:          'Verify the image is only used for styling or decoration',
            HIDDEN:                '@%1@ element is hidden from asssistive technologies using CSS',
            TARGET_RESOURCES_DESC: '@img@',
            PURPOSE: [
              'If an image is purely decoration or used for styling users of screen readers do not need to know the image exists',                   
              'If an image does not have alt text content and contains information, users of assistive technology will not have access to the information'                   
            ],
            TECHNIQUES: [
              'Use the attributes @alt=""@ or @role="presentation"@ to indicate an image is used purely for stylistic or decorative purposes'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },    
        LANDMARK_1: {
            ID:                    'Landmark Rule 1',
            DEFINITION:            'Each page %s contain at least one @main@ landmark',
            SUMMARY:               'Page %s have @main@ landmark',
            PASS:                  'Page has @main@ element',
            CORRECTIVE_ACTION:     'Add a @main@ landmark to the page, the main landmark must contain the main content of the page',
            HIDDEN:                '@main@ landmark is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: '@main@ landmark',
            PURPOSE: [
              'Main landmarks provide a navigation point for users of asssitive technologies to the main content of the page'                   
            ],
            TECHNIQUES: [
              'Include an @role="main"@ attribute on the element that contains the main content',
              'Use the aria-labelledby or aria-label to describe the content of the main landmark'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: main role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#main'
              }                            
            ]
        },
        LANDMARK_2: {
            ID:                    'Landmark Rule 2',
            DEFINITION:            'All rendered content %s be contained in a landmark',
            SUMMARY:               'Content %s be in landmark',
            PASS:                  '@%1@ element is in @%2@ landmark',
            MANUAL_CHECK:          '@%1@ element may contain renderable content, if so move it into an appropriate landmark',
            CORRECTIVE_ACTION:     'Move @%1@ element into an appropriate landmark',
            HIDDEN:                '@%1@ element is hidden from asssistive technologies.',
            TARGET_RESOURCES_DESC: 'all renderable content',
            PURPOSE: [
              'Landmarks provide a way to organize content of a page to users of assistive technology, similar to visual and interaction designers organize information for people using a graphical rendering of the content.'                   
            ],
            TECHNIQUES: [
              'Use the appropriate landmarks to identify the different sections of a web page',
              'The most important landmarks are the @main@ and @navigation@ landmarks since they will be the most used'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Landmark Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#landmark_roles'
              }                            
            ]
        },
        LANDMARK_3: {
            ID:             'LANDMARK 3',
            TITLE:          'If there are two or more landmarks of the same type, they %s have unique labels',
            PURPOSE:        'When there are two or more landmarks of the same type labels make it possible for people using assistive technology to identify the differences between the landmarks.',            
            MESSAGE_PASS_ONLY_ONE:  'There is only one %1 landmark in the page',
            MESSAGE_PASS_UNIQUE:    'The \'%1\' label is unique for the %2 landmarks',
            MESSAGE_FAIL_NO_LABEL:  'The %2 landmark does not have a label, when there are more than one of the same type of landmark on the page the landmark needs a label',
            MESSAGE_FAIL_DUPLICATE: 'The \'%1\' label is NOT unique for the %2 landmarks',
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
            MESSAGE_PASS:            'Data table has the caption element or a summary attribute of \'%1\'.',
            MESSAGE_FAIL:            'Data table is missing a caption element and summary attribute with text content, the page %s have either a caption element or a summary attribute with text content.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have a caption element.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2S: {
            ID:                      'TABLE 2S',
            TITLE:                   'If there is only one data table on a page, it %s have an effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table.',
            MESSAGE_PASS:            'Data table has the effective caption: \'%1\'.',
            MESSAGE_FAIL:            'The effective caption is missing or is empty, a data table %s have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have an effective caption.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2M: {
            ID:                      'TABLE 2M',
            TITLE:                   'If there is more than one data table, each data table %s have an effective caption with content.',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Table has an effective caption: \'%1\'',
            MESSAGE_FAIL:            'Since there is more than one data table, the table %s have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_ONLY_ONE:        'There is only one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_3: {
            ID:                       'TABLE 3',
            TITLE:                    'The effective caption content and effective summary content of each data table %s not be the same',
            PURPOSE:                  'It is important to provide an unique effective captions to more easily disern a table from other tables on the page.',
            MESSAGE_UNIQUE:           'The effective caption \'%1\' is unique from the effective summary "%2".',
            MESSAGE_NOT_UNIQUE:       'The effective caption \'%1\' is the same as the effective summary "%2", the effective caption should be used to describe the purpose of the table and the effective summary information about the data in the table or conclusions the author intended to be understood from viewing the data.',
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
            MESSAGE_PASS:            'Table has an effective caption: \'%1\'',
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
            MESSAGE_NOT_UNIQUE_VIOLATION:      'Table header cell has duplicate ID: \'%1\', header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'Table header cell has duplicate ID: \'%1\', header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'Table header cell has duplicate ID: \'%1\', header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'Table header cell is missing an @id@ attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'Table header cell is missing an @id@ attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'Table header cell is missing an @id@ attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS:                'All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     '%1 header cells of %2 header cells in the table have missing or dulicate @id@ values.',
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
            MESSAGE_PASS:                   'Complex data table has the effective summary \'%1\'',
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
            DEFINITION:               'If a table is a layout table that is more than 1 column wide, the content needs to be meaningful when table markup is ignored.',
            SUMMARY:                  'Layout content must make sense',
            PURPOSE:                  'The use of layout tables can result in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS:             'The layout table is only one column wide.',
            MESSAGE_VIOLATION:        'The page content must be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_RECOMMENDATION:   'The page content should be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_3: {
            ID:                 'LAYOUT 3',
            DEFINITION:         'If the table is a layout table, set role="presentation" on TABLE, TR and TD elements in the table',
            SUMMARY:            'Presentation role on layout tables',
            ACTION:             'Add role="presentation" attribute.',
            MESSAGE_HIDDEN:     'The table is hidden from people using assistive technologies, so the rule was not evaluated',
            TECHNIQUES:         ['Use the role="presentation" attribute on TABLE, TR and TD elements used in layout tables'],
            INFORMATIONAL_LINKS:          [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                  title: 'ARIA Presentation Role Value ', 
                                  url:   'http://www.w3.org/TR/wai-aria/roles#presentation'
                                 }
                                ]
        },
        TITLE_1: {
            ID:                 'TITLE 1',
            DEFINITION:         'Document %s have a TITLE element with content.',
            SUMMARY:            'Title web page',
            ACTION_NO_TITLE:    'Add TITLE element to web page',
            ACTION_TITLE_EMPTY: 'Add text content to TITLE element',
            PURPOSE:            ['The TITLE element text content can be accessed by asssitive technologies to understand the purpose of the web page.'
                                ],
            TECHNIQUES:         ['Use TITLE element text content to describe the content of a web page'],
            INFORMATIONAL_LINKS:          [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                  title: 'HTML TITLE Element Specification', 
                                  url:   'http://www.w3.org/TR/html4/struct/global.html#edef-TITLE'
                                 }, 
                                 {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                                  title: 'G88: Providing descriptive titles for Web pages', 
                                  url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G88'
                                 }, 
                                 {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                                  title: 'H25: Providing a title using the title element', 
                                  url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H25'
                                 }
                                ]
        },
        TITLE_2: {
            ID:            'TITLE 2',
            DEFINITION:    '@h1@elements %s be used as labels for @main@ landmarks',
            SUMMARY:       '@h1@labels @main@ landmarks',
            ACTION_MAIN:   'Add @h1@element as label to @main@ landmark.',
            ACTION_H1:     'Make @h1@the label of a @main@ landmark',
            TARGET:        '@h1@elements and @main@ landmarks',
            HIDDEN:        'Make @h1@element visible to assistive technologies',
            PURPOSE:       ['@h1@headings can be used to provide redundent navigation points to assistive technology users to the start of the main content'
                           ],
            TECHNIQUES:    ['Include an @h1@element for each @main@ landmark',
                            'Use an @id@ attribute to identify each @h1@element',
                            'Use ARIA-LABELLEDBY attribute to associate a @h1@element as a label to each @main@ element',
                            'Position @h1@elements in document right before the main content they label'
                           ],
            INFORMATIONAL_LINKS:     [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                             title: '@h1@Element Specification', 
                             url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
                             }, 
                             {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                              title: 'Main Landmark Specificaion', 
                              url:   'http://www.w3.org/TR/wai-aria/roles#main'
                             }, 
                             {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                              title: 'aria-labelledby specification', 
                              url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                             },
                             {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                              title: 'IBM Home Page', 
                              url:   'http://www.ibm.com'
                             },
                             {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                              title: 'Disability Resources at Illinois', 
                              url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                             }
                           ]
        },
        TITLE_3: {
            ID:               'TITLE 3',
            DEFINITION:       'Each @main@ landmark %s have one @h1@element',
            SUMMARY:          'One @h1@per @main@ landmark',
            ACTION_TO_MANY:   'Remove %1 @h1@element labeling references from @main@ landmark',
            ACTION_MISSING:   'Add @h1@element label reference to @main@ landmark',
            HIDDEN:           'Make @h1@element visible to assistive technologies.',
            PURPOSE:          ['@h1@headings can be used to provide redundent navigation points to assistive technology users to the start of the main content',
                               'If there is more than one @h1@element in the @main@ landmark the start of the main content will not be clear to assistive technology users'
                              ],
            TECHNIQUES:       ['Use one @h1@element for each @main@ landmark',
                               'Use an @id@ attribute to identify each @h1@element',
                               'Use ARIA-LABELLEDBY attribute to associate a @h1@element as a label to each @main@ element',
                               'Position @h1@elements in document right before the main content they label'
                              ],
            INFORMATIONAL_LINKS:        [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: '@h1@Element Specification', 
                                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
                               }, 
                               {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: 'Main Landmark Specificaion', 
                                url:   'http://www.w3.org/TR/wai-aria/roles#main'
                               }, 
                               {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: 'aria-labelledby specification', 
                                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                               },
                               {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                                title: 'IBM Home Page', 
                                url:   'http://www.ibm.com'
                               },
                               {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                                title: 'Disability Resources at Illinois', 
                                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                               }
                              ]
        },
        WIDGET_1: {
            ID:                    'Widget Rule 1',
            DEFINITION:            'Widgets %s have an accessible name',
            SUMMARY:               'Widget %s have name',
            PASS:                  '%1 widget has name',
            CORRECTIVE_ACTION:     'Add name to %1 widget',
            HIDDEN:                '%1 widget is hidden from assistive technologies.',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values that are defined as widgets',
            PURPOSE: [
              'A name associated with a widget insures that information about the widget is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'In some cases the child text nodes and @alt@ from descendant image elements will be used as the name for a widget',
              'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the widget',
              'Use @aria-label@ attribute to provide a explicit text description of the purpose of the widget'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Accessible Name Calculation', 
                url:   'http://www.w3.org/TR/wai-aria/roles#namecalculation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: aria-labelledby', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: aria-label', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-label'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'WAI-ARIA 1.0 Authoring Practices', 
                url:   'http://www.w3.org/TR/wai-aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
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

  level : "Level ",

  levels : ['Undefined', 'A','AA','AAA'],

  principles : {
    //
    // Principle 1: Perceivable
    //
    '1' : {
      title       : 'Principle 1: Perceivable',
      description : 'Information and user interface components must be presentable to users in ways they can perceive.', 
      url_spec    : 'http://www.w3.org/TR/WCAG20/#perceivable',
      guidelines : {
        //
        // Guideline 1.1 Text Alternatives
        //
        '1.1' : {
          title       : 'Guideline 1.1 Text Alternatives',
          description : 'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#text-equiv',
          success_criteria : {
            //
            // Success Criterion 1.1.1 Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below. 
            //
            '1.1.1' : {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '1.1.1 Non-text Content',
              description    : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#text-equiv',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html',
              references     : []
            }
          }
        },  
        //
        // Guideline 1.2 Time-based Media
        //
        '1.2' : {
          title       : 'Guideline 1.2 Time-based Media',
          description : 'Provide alternatives for time-based media.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv',
          success_criteria : {
            //
            // Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded)
            //
            '1.2.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.1 Audio-only and Video-only (Prerecorded)',
              description : 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criterion 1.2.2 Captions (Prerecorded)
            //
           '1.2.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.2 Captions (Prerecorded)',
              description : 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.3 Audio Description or Media Alternative (Prerecorded)
            //
            '1.2.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.3 Audio Description or Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.4 Captions (Live)
            //
            '1.2.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.4 Captions (Live)',
              description : 'Captions are provided for all live audio content in synchronized media. ',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.5 Audio Description (Prerecorded)
            //
            '1.2.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.5 Audio Description (Prerecorded)',
              description : 'Audio description is provided for all prerecorded video content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.6 Sign Language (Prerecorded)
            //
            '1.2.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.6 Sign Language (Prerecorded)',
              description : 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.7 Extended Audio Description (Prerecorded)
            //
            '1.2.7': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.7 Extended Audio Description (Prerecorded)',
              description : 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.8 Media Alternative (Prerecorded)
            //
            '1.2.8': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.8 Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.2.9 Audio-only (Live)
            //
            '1.2.9': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.9 Audio-only (Live)',
              description : 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 1.3 Adaptable
        //
        '1.3' : {
          title       : 'Guideline 1.3 Adaptable',
          description : 'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation',
          success_criteria : {
            //
            // Success Criteria 1.3.1 Info and Relationships
            //
            '1.3.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.1 Info and Relationships',
              description : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.3.2 Meaningful Sequence
            //
            '1.3.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.2 Meaningful Sequence',
              description : 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.3.3 Sensory Characteristics
            //
            '1.3.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.3 Sensory Characteristics',
              description : 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 1.4 Distinguishable
        //
        '1.4' : {
          title       : 'Guideline 1.4 Distinguishable',
          description : 'Make it easier for users to see and hear content including separating foreground from background.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast',
          success_criteria : {
            //
            // Success Criteria 1.4.1 Use of Color
            //
            '1.4.1': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.4.1 Use of Color',
              description : 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.2 Audio Control
            //
            '1.4.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.4.2 Audio Control',
              description : 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.3 Contrast (Minimum)
            //
            '1.4.3': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.4.3 Contrast (Minimum)',
              description : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.4 Resize text
            //
            '1.4.4': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.4.4 Resize text',
              description : 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.5 Images of Text
            //
            '1.4.5': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.5 Images of Text',
              description : 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.6 Contrast (Enhanced)
            //
            '1.4.6': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.6 Contrast (Enhanced)',
              description : 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.7 Low or No Background Audio
            //
            '1.4.7': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.7 Low or No Background Audio',
              description : 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.8 Visual Presentation
            //
            '1.4.8': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.4.8 Visual Presentation',
              description : 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 1.4.9 Images of Text (No Exception)
            //
            '1.4.9': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '1.4.9 Images of Text (No Exception)',
              description    : 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
              url_meet       : '',
              url_understand : '',
              references     : []
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
      url_spec    : 'http://www.w3.org/TR/WCAG20/#operable',
      guidelines : {
        //
        // Guideline 2.1 Keyboard Accessible
        //
        '2.1' : {
          title       : 'Guideline 2.1 Keyboard Accessible',
          description : 'Make all functionality available from a keyboard.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#keyboard-operation',
          success_criteria : {
            //
            // Success Criterion 2.1.1 Keyboard
            //
            '2.1.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.1.1 Keyboard',
              description    : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criterion 2.1.2 No Keyboard Trap
            //
            '2.1.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.1.2 No Keyboard Trap',
              description    : 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criterion 2.1.3 Keyboard (No Exception)
            //
            '2.1.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.1.3 Keyboard (No Exception)',
              description    : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 2.2 Enough Time
        //
        '2.2' : {
          title       : 'Guideline 2.2 Enough Time',
          description : 'Provide users enough time to read and use content.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#time-limits',
          success_criteria : {
            //
            // Success Criterion 2.2.1 Timing Adjustable
            //
            '2.2.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.2.1 Timing Adjustable',
              description    : 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.2.2 Pause, Stop, Hide
            //
            '2.2.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.2.2 Pause, Stop, Hide',
              description    : 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.2.3 No Timing
            //
            '2.2.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.3 No Timing',
              description    : 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.2.4 Interruptions
            //
            '2.2.4': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.4 Interruptions',
              description    : 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.2.5 Re-authenticating
            //
            '2.2.5': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.5 Re-authenticating',
              description    : 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
              url_meet       : '',
              url_understand : '',
              references     : []
            }          
          }
        },
        //
        // Guideline 2.3 Seizures
        //
        '2.3' : {
          title       : 'Guideline 2.3 Seizures',
          description : 'Do not design content in a way that is known to cause seizures.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#seizure',
          success_criteria : {
            //
            // Success Criteria 2.3.1 Three Flashes or Below Threshold
            //
            '2.3.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.3.1 Three Flashes or Below Threshold',
              description    : 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.3.2 Three Flashes
            //
            '2.3.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.3.2 Three Flashes',
              description    : 'Web pages do not contain anything that flashes more than three times in any one second period.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 2.4 Navigable
        //
        '2.4' : {
          title       : 'Guideline 2.4 Navigable',
          description : 'Provide ways to help users navigate, find content, and determine where they are.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms',
          success_criteria : {
            //
            // Success Criteria 2.4.1 Bypass Blocks
            //
            '2.4.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.1 Bypass Blocks',
              description    : 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.2 Page Titled
            //
            '2.4.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.2 Page Titled',
              description    : 'Web pages have titles that describe topic or purpose.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.3 Focus Order
            //
            '2.4.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.3 Focus Order',
              description    : 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.4 Link Purpose (In Context)
            //
            '2.4.4': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.4 Link Purpose (In Context)',
              description    : 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.5 Multiple Ways
            //
            '2.4.5': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.5 Multiple Ways',
              description    : 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.6 Headings and Labels
            //
            '2.4.6': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.6 Headings and Labels',
              description    : 'Headings and labels describe topic or purpose.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.7 Focus Visible
            //
            '2.4.7': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.7 Focus Visible',
              description    : 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.8 Location
            //
            '2.4.8': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.8 Location',
              description    : 'Information about the user\'s location within a set of Web pages is available.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.9 Link Purpose (Link Only)
            //
            '2.4.9': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.9 Link Purpose (Link Only)',
              description    : 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 2.4.10 Section Headings
            //
            '2.4.10': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.10 Section Headings',
              description    : 'Section headings are used to organize the content.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
              url_meet       : '',
              url_understand : '',
              references     : []
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
      url_spec    : 'http://www.w3.org/TR/WCAG20/#understandable',
      guidelines : {
        //
        // Guideline 3.1 Readable
        //
        '3.1' : {
          title       : 'Guideline 3.1 Readable',
          description : 'Make text content readable and understandable.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#meaning',
          success_criteria : {
            //
            // Success Criteria 3.1.1 Language of Page
            //
            '3.1.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.1.1 Language of Page',
              description    : 'The default human language  of each Web page  can be programmatically determined. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.1.2 Language of Parts
            //
            '3.1.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.1.2 Language of Parts',
              description    : 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.1.3 Unusual Words
            //
            '3.1.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.3 Unusual Words',
              description    : 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.1.4 Abbreviations
            //
            '3.1.4': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.4 Abbreviations',
              description    : 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.1.5 Reading Level
            //
            '3.1.5': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.5 Reading Level',
              description    : 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.1.6 Pronunciation
            //
            '3.1.6': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.6 Pronunciation',
              description    : 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 3.2 Predictable
        //
        '3.2' : {
          title       : 'Guideline 3.2 Predictable',
          description : 'Make Web pages appear and operate in predictable ways.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#consistent-behavior',
          success_criteria : {
            //
            // Success Criteria 3.2.1 On Focus
            //
            '3.2.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.2.1 On Focus',
              description    : 'When any component receives focus, it does not initiate a change of context.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3.2.2 On Input
            //
            '3.2.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.2.2 On Input',
              description    : 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3..2.3 Consistent Navigation
            //
            '3.2.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.2.3 Consistent Navigation',
              description    : 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3..2.4 Consistent Identification
            //
            '3.2.4': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.2.4 Consistent Identification',
              description    : 'Components that have the same functionality within a set of Web pages are identified consistently.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3..2.5 Change on Request
            //
            '3.2.5': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.2.5 Change on Request',
              description    : 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
              url_meet       : '',
              url_understand : '',
              references     : []
            }
          }
        },
        //
        // Guideline 3.3 Input Assistance
        //
        '3.3' : {
          title       : 'Guideline 3.3 Input Assistance',
          description : 'Help users avoid and correct mistakes.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#minimize-error',
          success_criteria : {
            //
            // Success Criteria 3..3.1 Error Identification
            //
            '3.3.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.3.1 Error Identification',
              description    : 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-identified',
              url_meet       : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html',
              references     : []
            },
            //
            // Success Criteria 3..3.2 Labels or Instructions
            //
            '3.3.2': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.3.2 Labels or Instructions',
              description    : 'Labels or instructions are provided when content requires user input.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-cues',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-cues',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html',
              references     : []
            },
            //
            // Success Criteria 3..3.3 Error Suggestion
            //
            '3.3.3': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.3.3 Error Suggestion',
              description    : 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-suggestions',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-suggestions',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-suggestions.html',
              references     : []
            }, 
            //
            // Success Criteria 3..3.4 Error Prevention (Legal, Financial, Data)
            //
            '3.3.4': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.3.4 Error Prevention (Legal, Financial, Data)',
              description    : 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3..3.5 Help
            //
            '3.3.5': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.3.5 Help',
              description    : 'Context-sensitive help is available.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 3..3.6 Error Prevention (All)
            //
            '3.3.6': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.3.6 Error Prevention (All)',
              description    : 'For Web pages that require the user to submit information, at least one of the following is true',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
              url_meet       : '',
              url_understand : '',
              references     : []
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
      url_spec    : 'http://www.w3.org/TR/WCAG20/#robust',
      guidelines : {
        //
        // Guideline 4.1 Compatible
        //
        '4.1' : {
          title       : 'Guideline 4.1 Compatible',
          description : 'Maximize compatibility with current and future user agents, including assistive technologies.', 
          url_spec    : 'http://www.w3.org/TR/WCAG20/#ensure-compat',
          success_criteria : {
            //
            // Success Criteria 4.2.1 Parsing Content
            //
            '4.1.1': {
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '4.1.1 Parsing Content',
              description    : 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
              url_meet       : '',
              url_understand : '',
              references     : []
            },
            //
            // Success Criteria 4.2.2 Name, Role, Value
            //
            '4.1.2': {
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '4.1.2 Name, Role, Value',
              description : 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
              url_meet       : '',
              url_understand : '',
              references     : []
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
 
{ rule_id             : 'COLOR_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.3',
  wcag_related_ids    : ['1.4.1','1.4.6'],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'color_contrast_cache',
  cache_properties    : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  target_objects      : ['textnodes'],
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT  = 3.1;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SEVERITY    = OpenAjax.a11y.SEVERITY;
   
      var cc_items     = dom_cache.color_contrast_cache.color_contrast_items;
      var cc_items_len = cc_items.length;
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];

        // if color contrast raio is undefined, skip this item
        if (!cc_item.color_contrast_ratio) continue;

        if ((cc_item.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cc_item.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cc_item.is_large_font))) {
     
          // Passes color contrast requirements
          if (cc_item.background_image != "none") {
            test_result = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_PASS';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;
          }
          else {
            if (cc_item.wcag_severity !== SEVERITY.PASS_LEVEL_AAA) cc_item.wcag_severity = SEVERITY.PASS_LEVEL_AA;          
          }
        }
        else {
        
          // Fails color contrast requirements
          if (cc_item.background_image == "none") {
            test_result  = TEST_RESULT.FAIL;
            message_id = 'ACTION';
            cc_item.wcag_severity = SEVERITY.VIOLATION;
          }
          else {
            test_result  = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_FAIL';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        var dom_text_nodes_len = cc_item.dom_text_nodes.length;
        
        var all_hidden_flag = true;

        for (var j = 0; j < dom_text_nodes_len; j++) {
        
          var dtn = cc_item.dom_text_nodes[j];
          
          if (dtn.computed_style.is_visible_onscreen === VISIBILITY.VISIBLE) {
            rule_result.addResult(test_result, dtn, message_id, args);
            all_hidden_flag = false;
          } 
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, dtn, 'HIDDEN', []);
          }
        } // end loop
        
        if (all_hidden_flag) cc_item.wcag_severity = SEVERITY.HIDDEN;
      } // end loop  
      
    } // end validate function
 },
 
 // ------------------------
 // Color 2: Color contrast ratio must be > 7 for normal text, and > 4.5 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 { rule_id           : 'COLOR_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.6',
  wcag_related_ids    : ['1.4.1','1.4.3'],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'color_contrast_cache',
  cache_properties    : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  target_objects      : ['textnodes'],
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SEVERITY    = OpenAjax.a11y.SEVERITY;
   
      var cc_items     = dom_cache.color_contrast_cache.color_contrast_items;
      var cc_items_len = cc_items.length;
     
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];

        // if color contrast raio is undefined, skip this item
        if (!cc_item.color_contrast_ratio) continue;

        if ((cc_item.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cc_item.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cc_item.is_large_font))) {
     
          // Passes color contrast requirements
          if (cc_item.background_image != "none") {
            test_result = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_PASS';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;          
          }           
          else {
            cc_item.wcag_severity = SEVERITY.PASS_LEVEL_AAA;          
          }
        }
        else {
        
          // Fails color contrast requirements
          if (cc_item.background_image == "none") {
            test_result  = TEST_RESULT.FAIL;
            message_id = 'ACTION';
            if (cc_item.wcag_severity !== SEVERITY.PASS_LEVEL_AA) cc_item.wcag_severity = SEVERITY.VIOLATION;          
          }
          else {
            test_result  = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_FAIL';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;          
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        var dom_text_nodes_len = cc_item.dom_text_nodes.length;

        var all_hidden_flag = true;

        for (var j = 0; j < dom_text_nodes_len; j++) {
        
          var dtn = cc_item.dom_text_nodes[j];
          
          if (dtn.computed_style.is_visible_onscreen === VISIBILITY.VISIBLE) {
            rule_result.addResult(test_result, dtn, message_id, args);
            all_hidden_flag = false;
          } 
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, dtn, 'HIDDEN', []);
          }
        } // end loop

        if (all_hidden_flag) cc_item.wcag_severity = SEVERITY.HIDDEN;

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
	     
{  rule_id             : 'CONTROL_1',
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
   last_updated        : '2011-09-16', 
   wcag_primary_id     : '3.3.2',
   wcag_related_ids    : ['1.3.1', '2.4.6'],
   target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
   cache_dependency    : 'controls_cache',
   cache_properties    : ['computed_label', 'fieldset_element', 'computed_label_source', 'name_attribute'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
  
         var control_type = ce.control_type;

         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {
             
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [ce.type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', [ce.type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [ce.type.toUpperCase()]);     
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
	     
{  rule_id             : 'CONTROL_2', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
   last_updated        : '2011-09-16', 
   wcag_primary_id     : '3.3.2',
   wcag_related_ids    : ['1.3.1', '2.4.6'],
   target_resources    : ['input[type="image"]'],
   cache_dependency    : 'controls_cache',
   cache_properties    : ['alt', 'title'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
  
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
     var tag_name;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].type;
     
         if (type === 'image') {
      
           if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.computed_label) {
               if (ce.computed_label.length) {
                 rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [type.toUpperCase()]);
               }
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', [type.toUpperCase()]);                    
               }
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [type.toUpperCase()]);     
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
{ rule_id             : 'CONTROL_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="radio"]'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['fieldset_element'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].control_type;
     
         if (type == OpenAjax.a11y.CONTROL_TYPE.RADIO) {
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.fieldset_element) {
               if (ce.fieldset_element.legend_element && 
                   ce.fieldset_element.legend_element.computed_label &&
                   ce.fieldset_element.legend_element.computed_label.length) {
                 rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);
               }
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', []);               
               }
             }
             else {  
               if (de.aria_labelledby && de.aria_labelledby.length) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK_1', []);     
               }
               else {
                 if (de.aria_label && de.aria_label.length) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK_2', []);     
                 }
                 else {
                   rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', []);
                 }    
               }
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', []);     
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
{ rule_id             : 'CONTROL_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['button'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].control_type;
     
         if (type == OpenAjax.a11y.CONTROL_TYPE.BUTTON) {
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', []);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', []);     
           }
         }
       } // end loop
     }   

  } // end validate function
},
 

/**
 * @object CONTROL_5
 *
 * @desc Tests if Textarea, select, input and button elements with id attributes have unique id values on the page
 *
 * @note Do not need to test for invisible elements, since getElementById searches all elements int he DOM
 */
{ rule_id             : 'CONTROL_5', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : ['3.3.2', '1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['id'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var ID          = OpenAjax.a11y.ID;
   
    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        
        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
        
          switch (de.id_unique) { 
        
          case ID.NOT_UNIQUE:
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', [de.id]);
            break;          
          
          case ID.UNIQUE:
            rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [de.id]);               
            break;
          
          default:
            break;       
            
          } // end switch
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);             
        }
      } // end loop
    }     
  } // end validate function
},
 
/**
 * @object CONTROL_6
 * 
 * @desc Label element with a for attribute reference does not reference a form control
 */
{ rule_id             : 'CONTROL_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['for'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (var i = 0; i < label_elements_len; i++) {
        var le = label_elements[i];
        
        if (le.unused_label) {
          rule_result.addResult(TEST_RESULT.FAIL, le, 'CORRECTIVE_ACTION', [le.for_id]);
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
 
{ rule_id             : 'CONTROL_7', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  cache_dependency    : 'controls_cache',
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label', 'legend'],
  cache_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
    
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (var i = 0; i < label_elements_len; i++) {
        var le = label_elements[i];
        var lde = le.dom_element;
        
        var ce = le.control_element;
  
        if (ce) {

          var cde = ce.dom_element;

          if (cde.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

            if (le.computed_label && le.computed_label.length === 0) {
              rule_result.addResult(TEST_RESULT.FAIL, le, 'CORRECTIVE_ACTION', [lde.tag_name]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'PASS', [lde.tag_name]);        
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [ce.control_type, lde.tag_name]);                
          }
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
 
{ rule_id             : 'CONTROL_8', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6', '4.1.1'],
  target_resources    : ['fieldset'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['legend_count'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var fieldset_elements      = dom_cache.controls_cache.fieldset_elements;
    var fieldset_elements_len  = fieldset_elements.length;
       
    // Check to see if valid cache reference
    if (fieldset_elements && fieldset_elements_len) {
     
      for (var i = 0; i < fieldset_elements_len; i++) {
        var fe = fieldset_elements[i];
        var de = fe.dom_element;

        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

          if (fe.legend_count === 0) {
            rule_result.addResult(TEST_RESULT.FAIL, fe, 'CORRECTIVE_ACTION_1', []);        
          }
          else {
            if (fe.legend_count > 1) {
              rule_result.addResult(TEST_RESULT.FAIL, fe, 'CORRECTIVE_ACTION_2', [(fe.legend_count-1)]);        
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, fe, 'PASS', []);                  
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'HIDDEN', []);                          
        }
      } // end loop
    } 

  } // end validate function
},

/** 
 * @object CONTROL_9
 *
 * @desc Form controls should not be labelled using the TITLE attribute 
 */
 
{ rule_id             : 'CONTROL_9', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['input', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['title'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        
        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (ce.computed_label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', [de.tag_name]);        
          }
          else {
            rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);                  
          }  
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);                          
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
 
{ rule_id             : 'CONTROL_10', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['computed_label', 'fieldset_element', 'computed_label_source', 'name_attribute'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
  
        var control_type = ce.control_type;

        if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {

          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {  
            if (ce.computed_label && ce.computed_label.length) {
              ces.push(ce);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [ce.type.toUpperCase()]);                        
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [ce.type.toUpperCase()]);                                    
          }
        }
      } // end loop    
      
      // sort labels

      ces = dom_cache.sortArrayOfObjects(ces,'computed_label_for_comparison', true); 

      for (i = 0; i < ces.length; i++) {
        ce = ces[i];

        if (ce.duplicate) {
          rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', []);                
        }
        else {
          rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);        
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
 
{ rule_id             : 'CONTROL_11', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="submit]', 'input[type="reset]'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['computed_label', 'value'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var current_controls   = [];
       
  } // end validate function

},

/**
 * @object CONTROL_12
 * 
 * @desc Form control label should describe the purpose of the form control
 * 
 */
 
{ rule_id             : 'CONTROL_12', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['button', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'input[type="submit]', 'input[type="reset]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
  
        var control_type = ce.control_type;

        if (control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT   ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX       ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.FILE           ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD       ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO          ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT         ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT           ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {

          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) { 
          
            if (ce.computed_label && ce.computed_label.length) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK', [de.tag_name]);                
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', [de.tag_name]);        
            } 
            
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);                                    
          }          
        }
      } // end loop          
    }        
  } // end validate function

},

/**
 * @object WIDGET_1
 * 
 * @desc ARIA Widgets must have labels
 */
	     
{ rule_id             : 'WIDGET_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="widget"]'],
  cache_dependency    : 'controls_cache',
  cache_properties    : ['accessible_name', 'accessible_description', 'computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var control_elements     = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var control_type = ce.control_type;
         
         if (control_type === OpenAjax.a11y.CONTROL_TYPE.WIDGET) {
         
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [de.role.toUpperCase()]);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION', [de.role.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.role.toUpperCase()]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
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
 
{ rule_id             : 'IMAGE_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['alt', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
 
    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', []);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if (de.has_alt_attribute) {
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS', []);     
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION', []);     
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_2', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['longdesc', 'longdesc_is_broken', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (ie.longdesc) {
        
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
              switch (ie.longdesc_is_broken) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.TEST_RESULT.PASS, ie, 'PASS', []);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION', []);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK', []);     
                break;
         
              default:
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK', []);
                break;
              } 
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', []);     
          }
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
{ rule_id             : 'IMAGE_3', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['alt', 'file_name', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', []);
        }
        else {
        
          if (ie.alt_for_comparison && ie.alt_for_comparison.length) {
          
            if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
              // make sure it has a file extension, will assume extension is for an image
              if (ie.file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(ie.file_name) >= 0 ) {
                  rule_result.addResult(TEST_RESULT.FAIL, ie, 'FAIL', []);                 
                }
                else {
                  rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS', []);                 
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS', []);                              
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
            }
          }  
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
{ rule_id             : 'IMAGE_4_EN', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['alt', 'alt_length', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_ALT_TEXT_LENGTH = 100;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', []);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION', [MAX_ALT_TEXT_LENGTH]);     
            }
            else {      
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS', [MAX_ALT_TEXT_LENGTH]);     
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_5', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['alt_length', 'height', 'width', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_IMAGE_HEIGHT = 6;
    var MAX_IMAGE_WIDTH  = 6;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', [de.tag_name]);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if ((ie.height <= MAX_IMAGE_HEIGHT || ie.width <= MAX_IMAGE_WIDTH) && ie.alt_length > 0 ) {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION', []);     
            }
            else {      
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS', []);     
            } 
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  cache_properties    : ['has_alt_attribute', 'alt_length', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
    
    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
          if (ie.alt_length === 0 || de.role == 'presentation') {     
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK', []);
          }
        }    
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
 * @object HEADING_1
 *
 * @desc Page contains at least one H1 element and each H1 element has content
 *       If there are main landmarks the H1 elements are children of the main landmarks
 */	     	     	     
{ rule_id             : 'HEADING_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.2', '2.4.6', '2.4.10'],
  target_resources    : ['h1'],
  cache_dependency    : 'headings_landmarks_cache',
  cache_properties    : ['tag_name', 'name', 'name_length'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
 
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SOURCE      = OpenAjax.a11y.SOURCE;
  
      var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
      var h1_elements_len = h1_elements.length;
      
      var page_element = dom_cache.headings_landmarks_cache.page_element;
      
      var h1_count = 0;
      
      if (h1_elements && h1_elements_len) {
      
        for (var i = 0; i < h1_elements_len; i++ ) {
          var he = h1_elements[i];

          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', []);                      
          }
          else {
            if (he.name && he.name.length) {
              rule_result.addResult(TEST_RESULT.PASS, he, 'PASS', []);
              h1_count++;
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, he, 'CORRECTIVE_ACTION_2', []);
            }
          }  
        }
      }

     if (page_element) {
       // Test if no h1s
       if (h1_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
       else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS', []);
     } 
  } // end validate function
}, 

/**
 * @object HEADING_2
 *
 * @desc If there are main landmarks and H1 elements, H1 elements should be children of main landmarks 
 *
 */	     	     	     
{ rule_id             : 'HEADING_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.1', '2.4.2', '2.4.10'],
  target_resources    : ['h1'],
  cache_dependency    : 'headings_landmarks_cache',
  
  cache_properties    : ['tag_name', 'id', 'name', 'main_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
    var h1_elements_len = h1_elements.length;

    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;

    if (main_elements && h1_elements && main_elements_len && h1_elements_len) {
      
      for (var i = 0; i < h1_elements_len; i++) {
        var he = h1_elements[i];
        var de = he.dom_element;
        
        if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
          rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', []);                      
        }
        else {
          if (he.is_child_of_main) rule_result.addResult(TEST_RESULT.PASS, he, 'PASS', []);
          else rule_result.addResult(TEST_RESULT.FAIL, he, 'CORRECTIVE_ACTION', []);
        }
        
      }
    }
  } // end validate function
},

/**
 * @object HEADING_3
 *
 * @desc Sibling headings of the same level that share the same parent heading should be unique
 *       This rule applies only when there are no main landmarks on the page and at least one 
 *       sibling heading
 *
 */	     	     	     
{ rule_id             : 'HEADING_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  cache_dependency    : 'headings_landmarks_cache',
  cache_properties    : ['tag_name', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function getSiblingHeadings(index, heading_element) {
   
      var list = [];
      
      list.push(heading_element);
            
      for (var i = index; i < heading_elements_len; i++) {
        
        var he = heading_elements[i];
        
        if (heading_element.level < he.level) return list;
        
        if (heading_element.level === he.level) {
          list.push(he);
          tested_list.push(he);
        }  

      }
        
      return list;
   
    }

    function notInTestedList(he) {
    
      for (var i = 0; i < tested_list.length; i++) {
        if (tested_list[i] === he) return false;
      }
    
      return true;
    }

    function notInDoneList(he) {
    
      for (var i = 0; i < done_list.length; i++) {
        if (done_list[i] === he) return false;
      }
    
      return true;
    }


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;
    
    var tested_list = [];
    var done_list   = [];
    var i, j, k;
    var sibling_headings = [];
    var sibling_headings_len = 0;

    if (main_elements_len === 0 && heading_elements_len > 1) {
    
      for (i = 0; i < (heading_elements_len-1); i++) {
      
        var he = heading_elements[i];
        
        if (notInTestedList(he)) sibling_headings = getSiblingHeadings(i+1, he);
        
        sibling_headings_len = sibling_headings.length;
      
        if (sibling_headings_len > 1) {
        
          for (j = 0; j < (sibling_headings_len-1); j++) {
          
            var sh1 = sibling_headings[j];
            var first_flag = true;
            
            if (notInDoneList(sh1) && sh1.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            
              for (k = j+1; k < sibling_headings_len; k++) {
                var sh2 = sibling_headings[k];
                
                if (sh1.name_for_comparison === sh2.name_for_comparison) {
                  if (first_flag) { 
                    rule_result.addResult(TEST_RESULT.FAIL, sh1, 'CORRECTIVE_ACTION', [sh1.dom_element.tag_name]); 
                    done_list.push(sh1);
                  }  
                  rule_result.addResult(TEST_RESULT.FAIL, sh2, 'CORRECTIVE_ACTION', [sh2.dom_element.tag_name]);
                  done_list.push(sh2);
                  first_flag = false;
                }
              }      
            }  
          }
          
          for (j = 0; j < sibling_headings_len; j++) {
            var sh = sibling_headings[j];
            if (notInDoneList(sh)) { 
              if (sh.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
                rule_result.addResult(TEST_RESULT.PASS, sh, 'PASS', [sh.dom_element.tag_name]);
              }
              else {
                rule_result.addResult(TEST_RESULT.HIDDEN, sh, 'HIDDEN', [sh.dom_element.tag_name]);              
              }
              done_list.push(sh);
            }  
          }
        }
      
      }
           
    }
    
  } // end validate function
},

/**
 * @object HEADING_4
 *
 * @desc Headings should describe the content of the section they label
 *
 */	     	     	     
{ rule_id             : 'HEADING_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  cache_dependency    : 'headings_landmarks_cache',
  cache_properties    : ['tag_name', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
    var h1_elements_len = h1_elements.length;

    var i;
    var he;
    var de;

    for (i = 0; i < h1_elements_len; i++ ) {
      he = h1_elements[i];
      de = he.dom_element;
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', [de.tag_name]);                      
      }
      else {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'MANUAL_CHECK', [de.tag_name]);
      }  
    }

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    for (i = 0; i < heading_elements_len; i++ ) {
      he = heading_elements[i];
      de = he.dom_element;
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', [de.tag_name]);                      
      }
      else {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'MANUAL_CHECK', [de.tag_name]);
      }  
    }
  } // end validate function
},

/**
 * @object LANDMARK_1
 *
 * @desc Each page should have at least one main landmark
 *
 */	     	     	     
{ rule_id             : 'LANDMARK_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['[role="main"]'],
  cache_dependency    : 'headings_landmarks_cache',
  cache_properties    : ['tag_name', 'role', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var main_count = 0;

    for (var i = 0; i < main_elements_len; i++ ) {
      var me = main_elements[i];
      if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', []);                      
      }
      else {
        main_count++;
        rule_result.addResult(TEST_RESULT.PASS, me, 'PASS', []);
      }  
    }

    if (page_element) {
      // Test if no h1s
      if (main_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS', []);
    } 
    
  } // end validate function
},

/**
 * @object LANDMARK_2
 *
 * @desc All rendered content should be contained in a landmark
 */	     	     	     
{ rule_id             : 'LANDMARK_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['all'],
  cache_dependency    : 'headings_landmarks_cache',
  cache_properties    : ['tag_name', 'parent_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var elements_with_content    = dom_cache.headings_landmarks_cache.elements_with_content;
    var elements_with_content_len = elements_with_content.length;
    
    var tag_name = "";

    for (var i = 0; i < elements_with_content_len; i++ ) {
      var de =elements_with_content[i];
      
      if (de.tag_name) tag_name = de.tag_name;
      else tag_name = de.parent_element.tag_name;

//      OpenAjax.a11y.logger.debug("  Content: " + de.toString()  +  " " + de.may_have_renderable_content);
      
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [tag_name]);                      
      }
      else {
        if (de.parent_landmark) {
          rule_result.addResult(TEST_RESULT.PASS, de, 'PASS', [tag_name, de.parent_landmark.role]);
        }
        else {
          if (de.may_have_renderable_content) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK', [tag_name]);
          else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION', [tag_name]);
        }  
      }  
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
  }, 
  
 
  ruleset_id    : "WCAG20_ARIA_TRANS",
  version       : "0.6 beta",
  last_updated  : "2012-06-18",

  // Assignement of rules to WCAG 2.0 requirements

  rule_mappings : {
   COLOR_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   COLOR_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_5 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_7 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_8 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_9 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_10 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_11 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_12 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_1 : {  
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_4_EN : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_5 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   LANDMARK_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LANDMARK_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   WIDGET_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
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
  }, 
  
  ruleset_id    : "WCAG20_ARIA_STRICT",
  version       : "0.6 Beta",
  last_updated  : "2012-06-18",

  // Assignement of rules to WCAG 2.0 requirements

  // Assignement of rules to WCAG 2.0 requirements

  rule_mappings : {
   COLOR_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   COLOR_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_5 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_7 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_8 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_9 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_10 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_11 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_12 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_1 : {  
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_4_EN : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_5 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   LANDMARK_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   LANDMARK_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   WIDGET_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     }
  } 
});

