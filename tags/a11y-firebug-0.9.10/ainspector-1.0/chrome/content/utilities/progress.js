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
 * @file progress.js
 *
 * @desc This module defines a function that initializes and returns an object
 *       that implements the nsIWebProgressListener interface. Two arguments
 *       are required for proper initialization: (1) a callback function to be
 *       called when the location bar changes (locationChangeCallback) and (2)
 *       a callback function to be called when the loading of a new location
 *       has completed (stateChangeCallback).
 *
 * @see  https://developer.mozilla.org/en/Code_snippets/Progress_Listeners
 *       for more information on nsIWebProgressListener
 */

/**
 * @namespace OAA_WEB_ACCESSIBILITY_UTILS
 */

var OAA_WEB_ACCESSIBILITY_UTILS = OAA_WEB_ACCESSIBILITY_UTILS || {};

/**
 * @function getProgressListener
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Initialize and return an object that implements nsIWebProgressListener
 *
 * @param {Function} locationChangeCallback - Called by onLocationChange when a
 *        load event is confirmed; this can be caused by the user typing a new
 *        URL in the location bar or changing tabs. In an add-on, this callback
 *        typically triggers the clearing of old data and the display of a
 *        progress meter indicating that the loading of a new URL has begun.
 *
 * @param {Function} stateChangeCallback - Called by onStateChange when a load
 *        event has completed. In an add-on, this callback typically triggers
 *        the hiding of a progress meter and the refresh of data in a view.
 *
 * @param {Object} logger (optional) - A logger object that conforms to the
 *        interface defined by OAA_WEB_ACCESSIBILITY_LOGGING.logger
 */

OAA_WEB_ACCESSIBILITY_UTILS.getProgressListener = function (locationChangeCallback, stateChangeCallback, logger) {

  // private members
  var top_location_href = null;

  // nsIWebProgressListener constants
  const STATE_STOP      = Components.interfaces.nsIWebProgressListener.STATE_STOP;
  const STATE_IS_WINDOW = Components.interfaces.nsIWebProgressListener.STATE_IS_WINDOW;

  // public API: return an object that implements the nsIWebProgressListener interface
  return {
    QueryInterface: function (iid) {
      if (iid.equals(Components.interfaces.nsIWebProgressListener) ||
          iid.equals(Components.interfaces.nsIWebProgressListener2) ||
          iid.equals(Components.interfaces.nsISupportsWeakReference) ||
          iid.equals(Components.interfaces.nsIXULBrowserWindow) ||
          iid.equals(Components.interfaces.nsISupports)) {
        return this;
      }
      throw Components.results.NS_NOINTERFACE;
    },

    onLocationChange: function (webProgress, request, location, flags) {
      if (request) { // ignore call if request arg is null
        top_location_href = webProgress.DOMWindow.top.location.href;
        if (logger) logger.log.debug('onLocationChange: ' + top_location_href);
        locationChangeCallback();
      }
    },

    onStateChange: function (webProgress, request, flags, status) {
      if (flags & STATE_STOP && flags & STATE_IS_WINDOW) {
        var location_href = webProgress.DOMWindow.location.href;
        if (logger) logger.log.debug('onStateChange: ' + location_href);
        if (location_href == top_location_href) {
          stateChangeCallback();
        }
      }
    },

    onProgressChange: function (a, b, c, d, e, f) {},
    onSecurityChange: function (a, b, c) {},
    onStatusChange: function (a, b, c, d) {},

    getLocation: function () { return top_location_href; }

  }; // end return

};
