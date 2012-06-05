/**
 * Copyright 2011 University Of Illinois
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

var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {

  AINSPECTOR_FB.result_ruleset = null;
  AINSPECTOR_FB.last_node_highlighted = null;
  AINSPECTOR_FB.rules_registered = null;
  AINSPECTOR_FB.style_registered = null;
  AINSPECTOR_FB.properties_registered = null;
  AINSPECTOR_FB.attributes_registered = null;
  AINSPECTOR_FB.events_registered = null;
  AINSPECTOR_FB.preferences = null;
  Components.utils.import("resource://ainspector/preferences/preferences.js");
  
  /**
   * @namespace AINSPECTOR_FB.cacheUtil
   */
  AINSPECTOR_FB.cacheUtil = {
	
    /**
     * @function updateCache
     * 
     * @memberOf AINSPECTOR_FB.cacheUtil
     * 
     * @desc calls evaluate function of the rule set selected. 
     * 
     * @return ruleset_result_cache 
     */
    updateCache: function() {

      var ruleset_result_cache;
      var doc;
      var url;
      try { 
        doc = window.content.document;
        url = window.content.location.href;
      } catch(e) {
        doc  = window.opener.parent.content.document;
        url = window.opener.parent.location.href;
      } // end try
      FBTrace.sysout("preferences: ", OAA_WEB_ACCESSIBILITY_UTIL);
      var preferences = OAA_WEB_ACCESSIBILITY_UTIL.util.preferenceModule.getRulesetPrefs();
      AINSPECTOR_FB.preferences = preferences;
      
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(preferences.ruleset_id);

      if (ruleset) {
    	ruleset.setEvaluationLevel(preferences.wcag20_level);
    	ruleset.setBrokenLinkTesting(preferences.broken_links);  
    	ruleset_result_cache = ruleset.evaluate(url, doc.title, doc, null, true);
      }
      else {
    	FBTrace.sysout("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }
      AINSPECTOR_FB.result_ruleset = ruleset_result_cache;
      return ruleset_result_cache;
    },
    
    getAllRulesets : function() {
      return OpenAjax.a11y.all_rulesets.getAllRuleSets();	
    }
  };

//  nsIWebProgressListener constants
  AINSPECTOR_FB.STATE_STOP        = Components.interfaces.nsIWebProgressListener.STATE_STOP;
  AINSPECTOR_FB.STATE_IS_WINDOW   = Components.interfaces.nsIWebProgressListener.STATE_IS_WINDOW;
  AINSPECTOR_FB.top_location_href = null;
  
  /**
   * @namespace AINSPECTOR_FB.tabProgressListener
   */
  AINSPECTOR_FB.tabProgressListener = {
		  
    QueryInterface: function (iid) {
	    if (iid.equals(Components.interfaces.nsIWebProgressListener) ||
	        iid.equals(Components.interfaces.nsIWebProgressListener2) ||
	        iid.equals(Components.interfaces.nsISupportsWeakReference) ||
	        iid.equals(Components.interfaces.nsIXULBrowserWindow) ||
	        iid.equals(Components.interfaces.nsISupports))
	      return this;
	    throw Components.results.NS_NOINTERFACE;
	  },

	/**
	 * @function onStateChange
	 * 
	 * @desc monitor user actions on web pages, when user click a link
	 * 
	 * @param {Object} webProgress
	 * @param {Object} request
	 * @param {Boolean} flags
	 * @param {Boolean} status
	 */
	onStateChange: function (webProgress, request, flags, status) {
	  
	  if (flags & AINSPECTOR_FB.STATE_STOP && flags & AINSPECTOR_FB.STATE_IS_WINDOW) {
	    var location_href = webProgress.DOMWindow.location.href;
	
	    if (location_href == AINSPECTOR_FB.top_location_href) {
		  FBTrace.sysout('onStateChange () location_href: ' + location_href + "..." + AINSPECTOR_FB.top_location_href);
	      return AINSPECTOR_FB.cacheUtil.updateCache();
	    }
	  }
    },

    /**
     * @function onLocationChange
     * 
     * @param {Object} webProgress
     * @param {Object} request
     * @param {Object} location
     * @param {Boolean} flags
     */
	onLocationChange: function (webProgress, request, location, flags) {
	    if (request) { // ignore call if request arg is null
		  FBTrace.sysout('onLocationChange () : location_href: ' + webProgress.DOMWindow.top.location.href);
	
	      AINSPECTOR_FB.top_location_href = webProgress.DOMWindow.top.location.href;
	    }
	  },

	  onProgressChange: function (a, b, c, d, e, f) {},
	  onSecurityChange: function (a, b, c) {},
	  onStatusChange: function (a, b, c, d) {}

	};

  /**
   * @function onLoad
   *
   * @memberof AINSPECTOR_FB.onLoad
   *
   * @desc Handle loading of sidebar by calling the onLoad function
   *       for the particular sidebar that is loading and setting
   *       the state for toolbar and menus.
   */

  AINSPECTOR_FB.onLoad = function() {
    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);

    mainWindow.gBrowser.addProgressListener(AINSPECTOR_FB.tabProgressListener);
    Firebug.preferenceModule.initializeUI();
    AINSPECTOR_FB.cacheUtil.updateCache();
  };
  
  /**
   * @function onUnload
   *
   * @desc onunLoad event handler that resets object properties
   *
   * @return nothing
   */

  AINSPECTOR_FB.onUnload = function(cache) {

    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);

    mainWindow.gBrowser.removeProgressListener(AINSPECTOR_FB.tabProgressListener);
  };

//  window.addEventListener("load", function () { AINSPECTOR_FB.onLoad(); }, false);
//  window.addEventListener("unload", function () { AINSPECTOR_FB.onUnload(); }, false);
  
};