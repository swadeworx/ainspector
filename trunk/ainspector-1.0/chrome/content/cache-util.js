var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {

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
      try { 
        var doc = window.content.document;
      } catch(e) {
        var doc  = window.opener.parent.content.document;
      } // end try

      /*cache_object = new OpenAjax.a11y.RulesetEvaluation();
      FBTrace.sysout("cache_object: ", cache_object);
      cache_object.init('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cache_object.evaluate(true);
      cache_object.dom_cache.links_cache.sortLinkElements('document_order', true);
      FBTrace.sysout("cache...............", cache_object);*/
      
      var ruleset_id = 'WCAG20_TRANS';
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(ruleset_id);
      FBTrace.sysout("inside updateCache - ruleset : ", ruleset);

      if (ruleset) {
    	ruleset_result_cache = ruleset.evaluate(doc.location.href, doc.title, doc, null, true);
        FBTrace.sysout("Ruleset results object for: " , ruleset_result_cache);
      }
      else {
    	FBTrace.sysout("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }
      
      return ruleset_result_cache;
    },
    
    /**
     * @function equivalentsView
     * 
     * @desc respond to "Images" button in the AInspector toolbar
     * 
     * @param context
     * 
     * @returns
     */
    equivalentsView: function(panel_name, cache_object, context) { 
    	  
      var panel = context.getPanel(panel_name, true);
	  FBTrace.sysout("equivalentsView: ", cache_object);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
	  FBTrace.sysout("xxxxxxxxxxxxxxxxxxxxxxxxxxxx");

      var equiv_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: true, first:true},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab")}, 
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.abbreviationTab")}];
	  FBTrace.sysout("0000000000000000000000000");

      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
	  FBTrace.sysout("1111111111111111111111111");

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var images_cache = cache_object.dom_cache.images_cache;
      images_cache.sortImageElements('document_order', true);
	  FBTrace.sysout("22222222222222222222222222");

      AINSPECTOR_FB.equivalents.equivalentsView(equiv_toolbar_buttons, toolbar, panel, cache_object);
	  FBTrace.sysout("333333333333333333333333333");

      
    },
  };
};