FBL.ns(function() { with (FBL) { 
  
  var panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainpector.mainpanel.title");
  var cache_object;
  
  Firebug.ainspectorModule = extend(Firebug.Module, { 
  
	/**   
	 * @function showPanel()
	 *  
	 * @desc Executed by Firebug's framework whenever a panel is displayed
	 *
	 * @param browser is the browser window
	 * @param panel being activated   
	 */
	showPanel: function(browser, panel) { 
	   
  	  var isFirebugExtension = panel && panel.name == panel_name; 
	  var FirebugExtensionButtons = browser.chrome.$("fbFirebugExtensionButtons");
	  cache_object = this.updateCache();
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
    
    /**
     * @function reportView
     * 
     * @desc
     * 
     * @param context
     */
    reportView: function(context) { 
  
      var panel = context.getPanel(panel_name, true);
      
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
    },
    
    /**
     * @function equivalentsView
     * 
     * @param context
     * 
     * @returns
     */
    equivalentsView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      var equiv_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: true, first:true},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab")}, 
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.abbreviationTab")}];
      
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var images_cache = cache_object.dom_cache.images_cache;
      images_cache.sortImageElements('document_order', true);
      
      AINSPECTOR_FB.equivalents.equivalentsView(equiv_toolbar_buttons, toolbar, panel, cache_object);
      
    },
      
    /**
     * @function controlsView
     * 
     * @param context
     */
    controlsView: function(context) { 
    	  
      //var cachesResult = this.updateCache();

      var panel = context.getPanel(panel_name, true);
      
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var control_toolbar_buttons = [
                                 {name: "Tree View", selected: true, first: true},                     
                                 {name: "Lables"},
                                 {name: "Controls"}];
                             
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document); 
      
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.controls.controlPanelView(control_toolbar_buttons, toolbar, panel, cache_object);
     
    },
    
    /**
     * @function colorContrastView
     * 
     * @param context
     */
    colorContrastView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.colorContrast.colorContrastPanelView(toolbar, panel, cache_object);
    },
      
    /**
     * 
     * @param context
     * @returns
     */
    headingsView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var head_land_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tree"), selected: true, first:true},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.titleMain")}, 
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.headings")},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.landmarks")}];
      
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.headLandmarkView.headingsPanelView(head_land_toolbar_buttons, toolbar, panel, cache_object);
    },
        
    /**
     * @function linksView
     * 
     * @param context
     */
    linksView: function(context) { 
        	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
        
      var toolbar_buttons = [{name: "All", selected: true, first:true},
                               {name: "Duplicate HREF"},
                                {name: "Duplicate NAME"}, 
                                {name: "AREA"}];
        
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var links_cache = cache_object.dom_cache.links_cache;
      FBTrace.sysout("links cache: ", links_cache);
        
      linksPanel.displayLinksPanel(panel, toolbar, toolbar_buttons, links_cache);
    },
    
    /**
     * @function listsView
     * 
     * @param context
     */
    listsView: function(context) { 
         	  
    	var panel = context.getPanel(panel_name, true);

        /* Clear the panel before writing anything onto the report*/
        if (panel) {
          clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        }
        
        var toolbar_buttons = [{name: "Tree View", selected: true, first:true},
                                     {name: "List View"}];
        
        AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
        
        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var lists_cache = cache_object.dom_cache.lists_cache;
        AINSPECTOR_FB.lists.listPanelView(toolbar_buttons, toolbar, panel, lists_cache);
    },
    
    /**
     * @function tablesView
     * 
     * @param context
     * @returns
     */
    tablesView: function(context) { 
            	  
      var panel = context.getPanel(panel_name, true);
    
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var tables_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tables.tree"), selected: true, first:true},
                                       {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tables.list")}];
          
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.tables.tablesPanelView(tables_toolbar_buttons, toolbar, panel, cache_object);
    },

    /**
     * @function colorContrastView
     * 
     * @desc
     * 
     * @param context
     */
    colorContrastView: function(context) { 

      var panel = context.getPanel(panel_name, true);
    
      /* Clear the panel before writing anything onto the Navigation*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
    },
  
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
    }
  }); 

  function AInspectorPanel() {} 

  AInspectorPanel.prototype = extend(Firebug.Panel, { 
  
    name: panel_name,
    title: panel_title,
    editable: true,  // clicking on contents in the panel will invoke the inline editor
  //  enableA11y: true,    // true if the panel wants to participate in A11y accessibility support.

  
    /**
     * @function initialize
     * 
     * @desc calls the predecessor method (i.e., Firebug panels initialize()) to set context object reference in panel
     */
    initialize: function() {
	  //this - context , arguments - document
	  Firebug.Panel.initialize.apply(this, arguments);
    }
  }); 

  Firebug.registerModule(Firebug.ainspectorModule); 

  /* Firebug.registerPanel(), registers the new panel with global Firebug object and ensures its display*/
  Firebug.registerPanel(AInspectorPanel); 

}});