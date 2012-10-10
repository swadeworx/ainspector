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

  AINSPECTOR_FB.previous_selected_row = null;
  AINSPECTOR_FB.selected_toolbar_button = null;
  
  AINSPECTOR_FB.ruleset_title = null;
  AINSPECTOR_FB.selected_level = null;
  AINSPECTOR_FB.ruleset_object = null;
  
  AINSPECTOR_FB.last_node_highlighted = null;
  
  AINSPECTOR_FB.rules_registered = null;
  AINSPECTOR_FB.font_properties_registered = null;
  AINSPECTOR_FB.elements_registered = null;
  
  AINSPECTOR_FB.preferences = null;
  
  AINSPECTOR_FB.rule_info_dialog = null;
  AINSPECTOR_FB.element_info_dialog = null;

  Components.utils.import("resource://firebug-a11y/highlight.js");

  /**
   * @namespace AINSPECTOR_FB.cacheUtil
   */
  AINSPECTOR_FB.cacheUtil = {
  
    /**
     * @function updateView
     * 
     * @desc updates the panel view in A11Y toolbar when the preferences are changed
     */  
    updateView : function (toolbar_id) {
      
      var rule_result_cache = this.updateCache();
      
      AINSPECTOR_FB[toolbar_id].viewPanel(Firebug.currentContext, "", rule_result_cache);
      
    },
    
    /**
     * @function updateCache
     * 
     * @memberOf AINSPECTOR_FB.cacheUtil
     * 
     * @desc evaluate results by calling OAA Cache library evaluate function() with the rule set selected. 
     * 
     * @return ruleset_result_cache 
     */
    updateCache: function() {

      FBTrace.sysout("****** Begin  AINSPECTOR_FB.cacheUtil.updateCache()   *******");
      
      var doc;
      var url;
      try { 
        doc = window.content.document;
        url = window.content.location.href;
      } catch(e) {
        doc  = window.opener.parent.content.document;
        url = window.opener.parent.location.href;
      } // end try
      
      var Cu = Components.utils;
      Cu["import"]("resource://firebug-a11y/highlight.js");
      OAA_WEB_ACCESSIBILITY.util.highlightModule.initHighlight(window.content.document);
      
      var preferences = OAA_WEB_ACCESSIBILITY_PREF.util.getPreferences();
      FBTrace.sysout("Preferences: ", preferences);
      FBTrace.sysout("OpenAjax: ", OpenAjax);

      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(preferences.ruleset_id);
      FBTrace.sysout("ruleset: ", ruleset);

      if (ruleset) {
        ruleset.setEvaluationLevel(preferences.wcag20_level);
        ruleset.setBrokenLinkTesting(preferences.broken_links);
        ruleset.evaluate(url, doc.title, doc, null, true);
        
        FBTrace.sysout("ruleset: ", ruleset);

      } else {
        FBTrace.sysout("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }
      
      AINSPECTOR_FB.preferences = preferences;
      AINSPECTOR_FB.selected_level = OpenAjax.a11y.all_wcag20_nls.getNLS().getNLSWCAG20Level(preferences.wcag20_level);
      AINSPECTOR_FB.ruleset_title = ruleset.ruleset_title;
      AINSPECTOR_FB.ruleset_object = ruleset;
      
      FBTrace.sysout("****** End  AINSPECTOR_FB.cacheUtil.updateCache()   *******");
      
      return ruleset;
    },
    
    /**
     * @function getAllRulesets
     * 
     * @desc
     */
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
//          FBTrace.sysout('onStateChange () location_href: ' + location_href + "..." + AINSPECTOR_FB.top_location_href);
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
      
//        FBTrace.sysout('onLocationChange () : location_href: ' + webProgress.DOMWindow.top.location.href);
//      	OAA_WEB_ACCESSIBILITY.util.highlightModule.last_highlighted_nodes = [];

        AINSPECTOR_FB.top_location_href = webProgress.DOMWindow.top.location.href;
        
        /* Set previous_selected_row to null whenever there is a new request */
        AINSPECTOR_FB.previous_selected_row = null;
      }
    },

    onProgressChange: function (a, b, c, d, e, f) {},
  
    onSecurityChange: function (a, b, c) {},
  
    onStatusChange: function (a, b, c, d) {}

  };

  /**
   * @function onLoad
   * @memberof AINSPECTOR_FB.onLoad
   *
   * @desc handle 
   *  1. loading the panel
   *  2. initializing the preferences module
   */

  AINSPECTOR_FB.onLoad = function() {
    
    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);

    mainWindow.gBrowser.addProgressListener(AINSPECTOR_FB.tabProgressListener);
    AINSPECTOR_FB.cacheUtil.updateCache();
    
  };
  
  /**
   * @function onUnload
   *
   * @desc onunLoad event handler that resets object properties
   *
   * @return nothing
   */

  AINSPECTOR_FB.onUnload = function() {
	FBTrace.sysout("Inside unload................................");  
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