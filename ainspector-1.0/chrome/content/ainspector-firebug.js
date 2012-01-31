FBL.ns(function() { with (FBL) { 
  
  var panel_name = ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var panel_title = ainspectorUtil.$AI_STR("ainpector.mainpanel.title");
  var cache_object;
  
  Firebug.ainspectorModule = extend(Firebug.Module, { 
  
	//initializeUI: function(){
	  //FBTrace.sysout("Inside initializeUI..1111...");
	  //Firebug.Module.initializeUI.apply(this, arguments);
	  
	  //this.onKeyPress = bind(this.onKeyPress, this);
	  //FBTrace.sysout("Inside initializeUI..2222222...");

	  //Firebug.chrome.$("fbFirebugExtensionButtons").addEventListener("keypress", this.onKeyPress, true);  
	  //FBTrace.sysout("Inside initializeUI.333333....");
	  //var FirebugExtension = Firebug.chrome.$("fbFirebugExtensionButtons");


  	//},
  	
	/**   
	 * showPanel()
	 *  
	 * @desc Executed by Firebug's framework whenever a panel is displayed
	 *
	 * @param    browser is the browser window
	 * @param    panel being activated   
	 */
	showPanel: function(browser, panel) { 
	   
  	  var isFirebugExtension = panel && panel.name == panel_name; 
	  var FirebugExtensionButtons = browser.chrome.$("fbFirebugExtensionButtons");
	  cache_object = this.updateCache();
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
     * shutdown
     * 
     * @desc
     * 
     */
    shutdown: function() {
     
      if (Firebug.getPref('defaultPanelName')==panel_name) {
        /* Optional */
        Firebug.setPref('defaultPanelName','console');
      }
    },
    
    /**
     * reportView
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
      FBTrace.sysout("panel in reportView: ", panel);
      FBTrace.sysout("GetTab info: ", panel.getTab());
      //FBTrace.sysout("XUL controllers: ", panel.controllers.getControllerId());

      Firebug.currentContext.getPanel("AInspector").printLine('Inside Report View'); 
    },
    
    /**
     * 
     * @param context
     * @returns
     */
    equivalentsView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      var equiv_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: true, first:true},
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab")}, 
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.abbreviationTab")}];
      
      ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var images_cache = cache_object.dom_cache.images_cache;
      images_cache.sortImageElements('document_order', true);
      
      AINSPECTOR_FB.equivalents.equivalentsView(equiv_toolbar_buttons, toolbar, panel, cache_object);
      
    },
      
    /**
     * 
     * @param context
     * @returns
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
                             
      ainspectorUtil.loadCSSToStylePanel(panel.document); 
      
      var toolbar = panel.document.createElement("div");
      //FBTrace.sysout("cache_object..." , cache_object);
      //var retrieve_result_from_cache = this.retrieveResultFromCache(cache_object);                   
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.controls.controlPanelView(control_toolbar_buttons, toolbar, panel, cache_object);
     
    },
    
    /**
     * 
     * @param context
     * @returns
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
      
      var head_land_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tree"), selected: true, first:true},
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.titleMain")}, 
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.headings")},
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.landmarks")}];
      
      ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      headingsObject.headingsPanelView(head_land_toolbar_buttons, toolbar, panel, cache_object);
    },
        
    /**
     * 
     * @param context
     * @returns
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
        
        ainspectorUtil.loadCSSToStylePanel(panel.document);

        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var links_cache = cache_object.dom_cache.links_cache;
        FBTrace.sysout("links cache: ", links_cache);
        
  	    linksPanel.displayLinksPanel(panel, toolbar, toolbar_buttons, links_cache);
    },
    
    /**
     * 
     * @param context
     * @returns
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
        
        ainspectorUtil.loadCSSToStylePanel(panel.document);
        
        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var lists_cache = cache_object.dom_cache.lists_cache;
        AINSPECTOR_FB.lists.listPanelView(toolbar_buttons, toolbar, panel, lists_cache);
    },
    
    /**
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
      
      var tables_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tables.tree"), selected: true, first:true},
                                       {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tables.list")}];
          
      ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      AINSPECTOR_FB.tables.tablesPanelView(tables_toolbar_buttons, toolbar, panel, cache_object);
    },
    
    /**
     * navigationView
     * 
     * @desc
     * 
     * @param context
     */
    navigationView: function(context) { 
    
      var panel = context.getPanel(panel_name, true);
      
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }

      var nav_toolbar_buttons = [
          {name: "Links", selected: true, first: true},                     
          {name: "Headings"},
          {name: "Landmarks"},
          {name: "Widgets"},
          {name: "Forms"}];
      
      ainspectorUtil.loadCSSToStylePanel(panel.document); 
      
      var toolbar = panel.document.createElement("div");
    
      toolbar.id = "toolbarDiv";
      navigationPanel.navigationView(nav_toolbar_buttons, toolbar, panel, cache_object);
    },
  
 
    /**
     * colorContrastView
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
     * updateCache
     * 
     * @desc
     * 
     */
    updateCache: function() {

      var cache_object;
      try { 
        var doc = window.content.document;
      } catch(e) {
        var doc  = window.opener.parent.content.document;
      } // end try
      
      cache_object = new OpenAjax.a11y.RulesetEvaluation();
      cache_object.init('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cache_object.evaluate(true);
      cache_object.dom_cache.links_cache.sortLinkElements('document_order', true);
      FBTrace.sysout("cache...............", cache_object);
      
      
      
      /*var ruleset_id = 'WCAG20_TRANS';

      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(ruleset_id);
      if (ruleset) {
        OAA_CI.evaluation = ruleset.evaluate(url, title, doc, OAA_CI.updateProgress, true);
        OpenAjax.a11y.console("Ruleset results object for: " + OAA_CI.evaluation.url);
      }
      else {
        OpenAjax.a11y.console("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }*/
      
      return cache_object;
    },
  
    retrieveResultFromCache: function(cacheResult) {
      	
    }
  }); 

  function AInspectorPanel() {} 

  AInspectorPanel.prototype = extend(Firebug.Panel, { 
  
   // name: ainspectorUtil.$HW_STR("ainspector.mainpanel.name"),  //returned by getPanel()
   // title: ainspectorUtil.$HW_STR("ainspector.mainpanel.title"), //title to appear on UI
    name: panel_name,
    title: panel_title,
    searchable: false, 
    editable: true,
  
    /**
     * printLine
     * 
     * @desc
     * 
     * @param message
     */
    printLine: function(message) {

	  var elt = this.document.createElement("div");
      // return elt;
      elt.innerHTML = message;
      this.panelNode.appendChild(elt);
    },

    /**
     * select
     * 
     * @desc
     * 
     * @param object
     * @param force_update
     */
    select: function(object, force_update) {
      
      if (force_update){
        this.updateSelection(object);
        dispatch(Firebug.uiListeners, "onObjectSelected", [object, this]);
      }
    },
    
    show: function() {

      FBTrace.sysout("Inside show..............................");
      Firebug.Panel.show.apply(this, arguments);
      
    },
    
   /**
     * updateSelection
     * 
     * @param  object
     */
    updateSelection: function(object) {
      
      FBTrace.sysout("Inside updateSelection() - ainspector-firebug.js");
      var found = this.ioBox.select(object, true, false, this.noscrollIntoView);
      
      if (!found){
        var parentNode = this.getParentObject(object);
        this.updateSelection(parentNode);
        return;
      }
    }
  }); 

  Firebug.registerModule(Firebug.ainspectorModule); 

  /* Firebug.registerPanel(), registers the new panel with global Firebug object and ensures its display*/
  Firebug.registerPanel(AInspectorPanel); 

}});