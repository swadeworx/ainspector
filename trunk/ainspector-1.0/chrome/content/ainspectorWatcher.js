/* See license.txt for terms of usage */

define(
  [
    "firebug/lib/trace",
    "firebug/lib/locale",
    "ainspector/ainspectorPreferences",
    "ainspector/highlighting/highlight",
    "ainspector/openajax_a11y/oaa_a11y_amd",
    "ainspector/ainspectorUtil"
  ], 
  function(FBTrace, Locale, AinspectorPreferences, OAA_WEB_ACCESSIBILITY, OpenAjax, AinspectorUtil){
  
    var AinspectorWatcher = AinspectorWatcher || {};
    
    /**
     * @function getRuleResultsObject
     * 
     * @desc Gets the prefrences from preferences module
     *       Evaluates OAA cache library
     *       Gets the rule results from the OAA cache library
     */
    AinspectorWatcher.getRuleResultsObject = function(){
          
      var doc;
      var url;
      var ruleset_object;
     
      try { 
        doc = window.content.document;
        url = window.content.location.href;
      } catch(e) {
        doc  = window.opener.parent.content.document;
        url = window.opener.parent.location.href;
      }  // end try
      
      var preferences = AinspectorPreferences.getPreferences();
      
      if (FBTrace.DBG_AINSPECTOR){
        FBTrace.sysout("AInspector; ainspectorModule.getRuleResultsObject.preferences: ", preferences);
        FBTrace.sysout("OAA_WEB_ACCESSIBILITY: ", OAA_WEB_ACCESSIBILITY);
        FBTrace.sysout("OpenAjax: ", OpenAjax);

      }
      
      OAA_WEB_ACCESSIBILITY.util.highlightModule.initHighlight(preferences.show_results_element_manual_checks,
          preferences.show_results_page_manual_checks, 
          preferences.show_results_pass,
          preferences.show_results_hidden);
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(preferences.ruleset_id);

      if (ruleset) {
        ruleset.setEvaluationLevels(preferences.wcag20_level);
        ruleset.setRecommendedRulesEnabled(preferences.wcag20_recommended_rules_enabled);
        ruleset.setBrokenLinkTesting(preferences.broken_links);
        ruleset_object = ruleset.evaluate(url, doc.title, doc, null, true);
      } 
      
      if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ainspectorModule.getRuleResultsObject: ", ruleset_object);
      
      return ruleset_object;

    };
    /**
     * @function onLoad
     * @memberof AinspectorWatcher.onLoad
     *
     * @desc handle 
     *  1. loading the panel
     *  2. initializing the preferences module
     */
    AinspectorWatcher.onLoad = function() {
      
      var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);

      mainWindow.gBrowser.addProgressListener(AinspectorWatcher.tabProgressListener);
    };
    
    /**
     * @function onUnload
     *
     * @desc onunLoad event handler that resets object properties
     *
     * @return nothing
     */
    AinspectorWatcher.onUnload = function() {
      
      if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorWatcher.onUnload");

      AinspectorUtil.selected_row = null;
      
      var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIWebNavigation)
        .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
        .rootTreeItem
        .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
        .getInterface(Components.interfaces.nsIDOMWindow);
      
      mainWindow.gBrowser.removeProgressListener(AinspectorWatcher.tabProgressListener);
    };
    
//  nsIWebProgressListener constants
    AinspectorWatcher.STATE_STOP        = Components.interfaces.nsIWebProgressListener.STATE_STOP;
    AinspectorWatcher.STATE_IS_WINDOW   = Components.interfaces.nsIWebProgressListener.STATE_IS_WINDOW;
    AinspectorWatcher.top_location_href = null;
    
    /**
     * @namespace AinspectorWatcher.tabProgressListener
     */
    AinspectorWatcher.tabProgressListener = {
        
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
      
        if (flags & AinspectorWatcher.STATE_STOP && flags & AinspectorWatcher.STATE_IS_WINDOW) {
          var location_href = webProgress.DOMWindow.location.href;
          
          if (location_href == AinspectorWatcher.top_location_href) {
            FBTrace.sysout('onStateChange () location_href: ' + location_href + "..." + AinspectorWatcher.top_location_href);
            var result_obj = AinspectorWatcher.getRuleResultsObject();
            return result_obj;
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

          AinspectorWatcher.top_location_href = webProgress.DOMWindow.top.location.href;
          
          /* Set previous_selected_row to null whenever there is a new request */
//          AinspectorWatcher.previous_selected_row = null;
            AinspectorUtil.selected_row = null;
        }
      },

      onProgressChange: function (a, b, c, d, e, f) {},
    
      onSecurityChange: function (a, b, c) {},
    
      onStatusChange: function (a, b, c, d) {}

    };
    
    return AinspectorWatcher;
  }

);