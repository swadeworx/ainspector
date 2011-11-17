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
