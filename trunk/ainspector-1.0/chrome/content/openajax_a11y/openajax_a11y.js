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

