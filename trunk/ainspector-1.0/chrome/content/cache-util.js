var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {

  AINSPECTOR_FB.result_ruleset = null;
  
  AINSPECTOR_FB.cacheUtil = {
	
    /**
     * @function updateCache
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

      /*cache_object = new OpenAjax.a11y.RulesetEvaluation();
      FBTrace.sysout("cache_object: ", cache_object);
      cache_object.init('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cache_object.evaluate(true);
      cache_object.dom_cache.links_cache.sortLinkElements('document_order', true);
      FBTrace.sysout("cache...............", cache_object);*/
      
      var ruleset_id = 'WCAG20_TRANS';
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(ruleset_id);

      if (ruleset) {
    	ruleset_result_cache = ruleset.evaluate(url, doc.title, doc, null, true);
        FBTrace.sysout("Ruleset results object for: " , ruleset_result_cache);
      }
      else {
    	FBTrace.sysout("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }
      AINSPECTOR_FB.result_ruleset = ruleset_result_cache;
      return ruleset_result_cache;
    }
  };
//nsIWebProgressListener constants
  AINSPECTOR_FB.STATE_STOP        = Components.interfaces.nsIWebProgressListener.STATE_STOP;
  AINSPECTOR_FB.STATE_IS_WINDOW   = Components.interfaces.nsIWebProgressListener.STATE_IS_WINDOW;
  AINSPECTOR_FB.top_location_href = null;
  
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

	  onStateChange: function (webProgress, request, flags, status) {
	    if (flags & AINSPECTOR_FB.STATE_STOP && flags & AINSPECTOR_FB.STATE_IS_WINDOW) {
	
	    var location_href = webProgress.DOMWindow.location.href;
	      if (location_href == AINSPECTOR_FB.top_location_href) {
		      FBTrace.sysout('onStateChange () location_href: ' + location_href + "..." + AINSPECTOR_FB.top_location_href);

	    	  AINSPECTOR_FB.cacheUtil.updateCache();
//	    	  AINSPECTOR_FB.equivalents.equivalentsView(Firebug.currentContext, "AInspector", AINSPECTOR_FB.result_ruleset);
	      }
	    }
	  },

	  onLocationChange: function (webProgress, request, location, flags) {
	    if (request) { // ignore call if request arg is null
		      FBTrace.sysout('onLocationChange () location_href: ' + webProgress.DOMWindow.top.location.href);
	
	      AINSPECTOR_FB.top_location_href = webProgress.DOMWindow.top.location.href;
	      //OAA_CI.showTransition();
	    }
	  },

	  onProgressChange: function (a, b, c, d, e, f) {},
	  onSecurityChange: function (a, b, c) {},
	  onStatusChange: function (a, b, c, d) {}

	};
  /**
   * @function onLoad
   *
   * @desc Handle loading of sidebar by calling the onLoad function
   *       for the particular sidebar that is loading and setting
   *       the state for toolbar and menus.
   */

  AINSPECTOR_FB.onLoad = function(cache) {
    FBTrace.sysout("==============Inside MY OnLoad===============");
    var mainWindow = window.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIWebNavigation)
      .QueryInterface(Components.interfaces.nsIDocShellTreeItem)
      .rootTreeItem
      .QueryInterface(Components.interfaces.nsIInterfaceRequestor)
      .getInterface(Components.interfaces.nsIDOMWindow);

    mainWindow.gBrowser.addProgressListener(AINSPECTOR_FB.tabProgressListener);
    
    AINSPECTOR_FB.cacheUtil.updateCache();
    AINSPECTOR_FB.setStateToolbarAndMenus(mainWindow, true);
  };
  
  /**
   * onUnload
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
  
  AINSPECTOR_FB.setStateToolbarAndMenus = function(window, flag){
	var toolbarbutton = window.document.getElementById("images_media_button");
	if (toolbarbutton) toolbarbutton.checked = flag;
  };
  

  window.addEventListener("load", function () { AINSPECTOR_FB.onLoad(); }, false);
  window.addEventListener("unload", function () { AINSPECTOR_FB.onUnload(); }, false);
};