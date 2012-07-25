/*
 * Copyright 2012 University of Illinois
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
 * @file logging.js
 *
 * @desc Define two utility objects used for logging messages to the Firefox
 *       console:
 *
 *       1. The LEVEL object, which contains constants DEBUG, INFO, WARN and
 *          ERROR, used for setting the logging level. For example, when the
 *          level is set to WARN, then all messages made with calls at levels
 *          below WARN (namely log.info and log.debug) are suppressed.
 *
 *       2. The logger object, which defines a public API with getter and
 *          setter methods for level and enabled, and four log methods that
 *          correspond to each of the four LEVEL constants: debug, info, warn
 *          and error.
 *
 *       Recommended usage: Calls to logger.log methods (debug, info, warn and
 *       error) can be placed anywhere in your code. However, it is recommended
 *       that you only set or change logger.enabled and logger.level at one
 *       location, preferably in your initialization code.
 */

/**
 * @namespace OAA_WEB_ACCESSIBILITY_LOGGING
 */

var OAA_WEB_ACCESSIBILITY_LOGGING = OAA_WEB_ACCESSIBILITY_LOGGING || {};

OAA_WEB_ACCESSIBILITY_LOGGING.LEVEL = Object.defineProperties({}, {
  DEBUG: { value: 0, writable: false, configurable: false, enumerable: true },
  INFO:  { value: 1, writable: false, configurable: false, enumerable: true },
  WARN:  { value: 2, writable: false, configurable: false, enumerable: true },
  ERROR: { value: 3, writable: false, configurable: false, enumerable: true }
});

OAA_WEB_ACCESSIBILITY_LOGGING.logger = (function () {
  // private members
  var LEVEL = OAA_WEB_ACCESSIBILITY_LOGGING.LEVEL;
  var $level = LEVEL.DEBUG;

  var $enabled = true;

  var consoleService = (typeof Components !== "undefined") ?
                         Components.classes["@mozilla.org/consoleservice;1"].getService(
                           Components.interfaces.nsIConsoleService) : null;

  // private methods
  var logToConsole = function (message) {
    // use JS Shell print function if not in Firefox
    if (consoleService)
      consoleService.logStringMessage(message);
    else
      print(message);
  };

  // public API
  return {
    get enabled() { return $enabled; },

    set enabled(value) { $enabled = (value) ? true : false; },

    get level() { return $level; },

    set level(num) {
      switch (num) {
      case LEVEL.DEBUG:
      case LEVEL.INFO:
      case LEVEL.WARN:
      case LEVEL.ERROR:
        $level = num;
        break;
      default:
        logToConsole("ERROR: " + "arg to logger.level must be in the range of " +
                     LEVEL.DEBUG + " to " + LEVEL.ERROR + " inclusive.");
        break;
      }
    },

    log: {
      debug: function (message) {
        if ($enabled && $level <= LEVEL.DEBUG)
          logToConsole("DEBUG: " + message);
      },
      info: function (message) {
        if ($enabled && $level <= LEVEL.INFO)
          logToConsole("INFO:  " + message);
      },
      warn: function (message) {
        if ($enabled && $level <= LEVEL.WARN)
          logToConsole("WARN:  " + message);
      },
      error: function (message) {
        if ($enabled && $level <= LEVEL.ERROR)
          logToConsole("ERROR: " + message);
      }
    } // end log
  }; // end return
}());
