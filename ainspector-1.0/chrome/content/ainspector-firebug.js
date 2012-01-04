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
	  FBTrace.sysout("FirebugExtensionButtons  : ", FirebugExtensionButtons.childNodes[1].childNodes);
	  //var ainspector_toolbar_buttons = browser.chrome.$("radio-toolbar");
	  //FBTrace.sysout("Toolbarr.............", ainspector_toolbar_buttons);
	  //FBTrace.sysout("report tb...........", ainspector_toolbar_buttons._getToolbarItem("report_id"));
	  //FBTrace.sysout("link tb...........", ainspector_toolbar_buttons._getToolbarItem("link_id"));
	  
	  cache_object = this.updateCache();
	  //this.showDefaultPanelView();
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
	 * showDefaultPanelView()
	 * 
	 * @ desc shows the default panel to be displayed when the AInspector is loaded for the first time
	 * 
	 * @param context
	 */
	showDefaultPanelView : function () {
 
	  cache_object = this.updateCache();
	  this.reportView(Firebug.currentContext);	
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
	//  Firebug.chrome.$("fbFirebugExtensionButtons").removeEventListener("keypress", this.onKeyPress, false);  

    },
    
    /*onKeyPress : function(event) {
      if (event.keyCode == window.KeyEvent.DOM_VK_LEFT) {
      } else if (event.keyCode == window.KeyEvent.DOM_VK_RIGHT) {
      }
    },*/
    
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
    imagesView: function(context) { 
    	  
      var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      FBTrace.sysout("panel in imagesView: ", panel);
      var image_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: true, first:true},
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab")}, 
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.abbreviationTab")},
                                   {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.rulesTab")}];
      
      ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var images_cache = cache_object.dom_cache.images_cache;
      FBTrace.sysout("cache_object", cache_object);
      images_cache.sortImageElements('document_order', true);
      imageObject.imagePanelView(image_toolbar_buttons, toolbar, panel, cache_object);
      
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
                                 {name: "Control Rules", selected: true, first: true},                     
                                 {name: "Control List"}];
                             
      ainspectorUtil.loadCSSToStylePanel(panel.document); 
      
      var toolbar = panel.document.createElement("div");
      //FBTrace.sysout("cache_object..." , cache_object);
      var retrieve_result_from_cache = this.retrieveResultFromCache(cache_object);                   
      toolbar.id = "toolbarDiv";
      panelObject.panelsView(control_toolbar_buttons, toolbar, panel, cache_object);
     
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
        
        var toolbar_buttons = [{name: "Duplicate HREF", selected: true, first:true},
                                     {name: "Duplicate NAME"}, 
                                     {name: "AREA"}];
        
        ainspectorUtil.loadCSSToStylePanel(panel.document);

        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var images_cache = cache_object.dom_cache.images_cache;
        images_cache.sortImageElements('document_order', true);
        imageObject.imagePanelView(toolbar_buttons, toolbar, panel, images_cache);
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
        
        var toolbar_buttons = [{name: "List View", selected: true, first:true},
                                     {name: "Tree View"}];
        
        ainspectorUtil.loadCSSToStylePanel(panel.document);
        
        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var images_cache = cache_object.dom_cache.images_cache;
        images_cache.sortImageElements('document_order', true);
        imageObject.imagePanelView(toolbar_buttons, toolbar, panel, images_cache);
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
      
      cache_object = new OpenAjax.a11y.RulesetEvaluation('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cache_object.evaluate(true);
      cache_object.dom_cache.links_cache.sortLinkElements('document_order', true);
      FBTrace.sysout("cache...............", cache_object);
      return cache_object;
    },
  
    retrieveResultFromCache: function(cacheResult) {
      	
    }
  }); 

  function ainspectorPanel() {} 

  ainspectorPanel.prototype = extend(Firebug.Panel, { 
  
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
  Firebug.registerPanel(ainspectorPanel); 

}});