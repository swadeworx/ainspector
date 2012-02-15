var AINSPECTOR_FB = AINSPECTOR_FB || {};

FBL.ns(function() { with (FBL) { 
  
  var panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainpector.mainpanel.title");
  var cache_object;
  
  Firebug.ainspectorModule = extend(Firebug.Module, { 
	
	/**   
	 * @function showPanel
	 *  
	 * @desc Show/Hide our panel based on new selection from the Firebug main toolbar.
	 * Only called by the Firebug framework.
	 *
	 * @param {Object} browser - the browser window object
	 * @param {Object} panel - the new selected panel object    
	 */
	showPanel: function(browser, panel) { 
	   
  	  var isFirebugExtension = panel && panel.name == panel_name; 
	  var FirebugExtensionButtons = browser.chrome.$("fbFirebugExtensionButtons");
	  //cache_object = this.updateCache();
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
	 * 
	 */
	watchWindow : function(context, win){
	  FBTrace.sysout("watchWindow: ");	
	  if (win == win.top) {
		context.window.addEventListener("load", this.ainspectorOnLoad, false);
		context.window.addEventListener("beforeunload", this.ainspectorOnUnload, false);
		context.window.addEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
	  }	
	},
	
	/**
	 * 
	 */
	unWatchWindow : function(context, win){
	  FBTrace.sysout("watchWindow: ");	
	  if (win == win.top) {
		context.window.removeEventListener("load", this.ainspectorOnLoad, false);
		context.window.removeEventListener("beforeunload", this.ainspectorOnUnload, false);
		context.window.removeEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
	  }	
	},
	
	/**
	 * @function ainspectorOnLoad
	 * 
	 * @desc
	 * 
	 * @param {Event} event
	 */
	ainspectorOnLoad : function(event){
		
	  var win = event.currentTarget;
	  var firebug_context;
	  
	  if (win != Firebug.currentContext.window) {
		firebug_context = TabWatcher.getContextByWindow(win);
	  } else {
		firebug_context = Firebug.currentContext;  
	  }
	  firebug_context.getPanel("AInspector");
	  cache_object = AINSPECTOR_FB.cacheUtil.updateCache();
	  
	  AINSPECTOR_FB.cacheUtil.equivalentsView(panel_name, cache_object, firebug_context);
	},
	
	/**
	 * @function ainspectorOnUnLoad
	 * 
	 * @desc
	 * 
	 * @param {Event} event
	 */
	ainspectorOnUnLoad : function(event) {
		
	},
    
    /**
     * @function reportView
     * 
     * @desc respond to "Report" button in the AInspector toolbar
     * 
     * @param {Object} context
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
     * @desc respond to "Images" button in the AInspector toolbar
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
     * @desc respond to "Controls" button in the AInspector toolbar
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
      
      var control_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls.tree"), selected: true, first:true},
                                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls.labels")}, 
                                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls")}];
                             
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document); 
      
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.controls.controlsView(control_toolbar_buttons, toolbar, panel, cache_object);
     
    },
    
    /**
     * @function colorContrastView
     * 
     * @desc respond to "Color Contrast" button in the AInspector toolbar
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
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document); 

      AINSPECTOR_FB.colorContrast.colorContrastPanelView(panel, cache_object);
    },
      
    /**
     * @function headingsView
     * 
     * @desc respond to "Headings/Landmarks" button in the AInspector toolbar
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
      
      var head_land_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.headings.tree"), selected: true, first:true},
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
     * @desc respond to "Links" button in the AInspector toolbar
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
        
      AINSPECTOR_FB.links.linksPanel(panel, toolbar, toolbar_buttons, links_cache);
    },
    
    /**
     * @function listsView
     * 
     * @desc respond to "Lists" button in the AInspector toolbar
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
     * @desc respond to "Tables" button in the AInspector toolbar
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
     * @function abbreviationsView
     * 
     * @desc respond to "Tables" button in the AInspector toolbar
     * 
     * @param context
     * @returns
     */
    abbrView: function(context) { 
            	  
      var panel = context.getPanel(panel_name, true);
    
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var abbr_toolbar_buttons = [
          {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.abbr.languageTab"), selected: true, first:true},
          {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.abbr.abbreviationTab")}];
          
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.abbr.abbreviationsView(abbr_toolbar_buttons, toolbar, panel, cache_object);
    },
    
    /**
     * @function elementsView
     * 
     * @desc respond to "Headings/Landmarks" button in the AInspector toolbar
     * 
     * @param context
     * @returns
     */
    elementsView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.elements.tree"), selected: true, first:true},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.elements.list")}];
      
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.elementsView.allElementsPanelView(toolbar_buttons, toolbar, panel, cache_object);
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
    dependents: ["Rules", "Attributes", "Cache", "Style", "Events"],
  
    /**
     * @function initialize
     * 
     * @desc calls the predecessor method (i.e., Firebug panels initialize()) to set context object reference in panel
     * 
     */
    initialize: function() {
	  
	  var header_column_resizer = AINSPECTOR_FB.gridHeaderColumnResize;
	  
	  this.onMouseClick = bind(header_column_resizer.onMouseClick, header_column_resizer); 
	  this.onMouseDown = bind(header_column_resizer.onMouseDown, header_column_resizer);
	  this.onMouseMove = bind(header_column_resizer.onMouseMove, header_column_resizer);
	  this.onMouseUp = bind(header_column_resizer.onMouseUp, header_column_resizer);
	  this.onMouseOut = bind(header_column_resizer.onMouseOut, header_column_resizer);
	  
	  //this - context , arguments - document
	  Firebug.Panel.initialize.apply(this, arguments);
    },
    
    /**
     * @function initializeNode
     * 
     * @desc Add mouse event listeners to the panel to resize the column headers
     * Only called by the Firebug initialize() function
     * 
     */
    initializeNode : function(){
      
      this.panelNode.id = "ainspector-panel";	
      
      this.panelNode.addEventListener("click", this.onMouseClick, true);
      this.panelNode.addEventListener("mousedown", this.onMouseDown, true);
      this.panelNode.addEventListener("mousemove", this.onMouseMove, true);
      this.panelNode.addEventListener("mouseup", this.onMouseUp, true);
      this.panelNode.addEventListener("mouseout", this.onMouseOut, true);
      
      return;
      
    },
    
    /**
     * @function destroyNode
     * 
     * @desc remove the mouse eventListeners from the panel  
     * Only called by the Firebug Framework
     */
    destroyNode : function() {
    
	  this.panelNode.removeEventListener("click", this.onMouseClick, true);
      this.panelNode.removeEventListener("mousedown", this.onMouseDown, true);
      this.panelNode.removeEventListener("mousemove", this.onMouseMove, true);
      this.panelNode.removeEventListener("mouseup", this.onMouseUp, true);
      this.panelNode.removeEventListener("mouseout", this.onMouseOut, true);
      	
    }
  }); 

  Firebug.registerModule(Firebug.ainspectorModule); 

  /* Firebug.registerPanel(), registers the new panel with global Firebug object and ensures its display*/
  Firebug.registerPanel(AInspectorPanel); 

}});