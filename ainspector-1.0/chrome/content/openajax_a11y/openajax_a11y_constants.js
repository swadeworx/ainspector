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

