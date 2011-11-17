FBL.ns(function() { with (FBL) { 
  
//const Cc = Components.classes;
//const Ci = Components.interfaces;
  
  var panelName = "AInspector";
  
  Firebug.ainspectorModule = extend(Firebug.Module, { 
  
	/**   
	 * showPanel()
	 *  
	 * @desc Executed by Firebug's framework whenever a panel is displayed
	 *
	 * @param    browser is the browser window
	 * @param    panel being activated   
	 */
	showPanel: function(browser, panel) { 
	   
	  var isFirebugExtension = panel && panel.name == "AInspector"; 
	  var FirebugExtensionButtons = browser.chrome.$("fbFirebugExtensionButtons"); 
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
     * shutdown
     * 
     * @desc
     * 
     */
    shutdown: function() {
     
      if (Firebug.getPref('defaultPanelName')=='AInspector') {
        /* Optional */
        Firebug.setPref('defaultPanelName','console');
      }
    },
  
    /**
     * onClick
     * 
     * @desc
     * 
     * @param event
     */
    onClick: function(event) {
      FBTrace.sysout("inside onClick() from ainspector main panel");
    },
  
    /**
     * reportView
     * 
     * @desc
     * 
     * @param context
     */
    reportView: function(context) { 
  
      var panel = context.getPanel(panelName, true);
      
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
    	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Report View'); 
    },
    
    /**
     * 
     * @param context
     * @returns
     */
    imagesView: function(context) { 
    	  
      var panel = context.getPanel(panelName, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Images View'); 
    },
      
    /**
     * 
     * @param context
     * @returns
     */
    controlsView: function(context) { 
    	  
      var cachesResult = this.updateCache();

      var panel = context.getPanel(panelName, true);
      
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      var control_toolbar_buttons = [
                                 {name: "Control Rules", selected: true, first: true},                     
                                 {name: "Control List"}];
                             
      this.loadCSS("chrome://ainspector/content/css/ainspector-panel.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/ainspector-side-panel.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/fonts-min.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/tabview.css", panel.document);
      //this.loadCSS("chrome://ainspector/content/css/ainspector.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/allyGrade.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/grid.css", panel.document); 
      
      var toolbar = panel.document.createElement("div");
      //FBTrace.sysout("cachesResult..." , cachesResult);
      var retrieve_result_from_cache = this.retrieveResultFromCache(cachesResult);                   
      toolbar.id = "toolbarDiv";
      panelObject.panelsView(control_toolbar_buttons, toolbar, panel, cachesResult);
     
      //Firebug.currentContext.getPanel("AInspector").printLine('Inside Controls View'); 
    },
    
    /**
     * 
     * @param context
     * @returns
     */
    colorContrastView: function(context) { 
    	  
      var panel = context.getPanel(panelName, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Color Contrast View'); 
    },
      
    /**
     * 
     * @param context
     * @returns
     */
    headingsView: function(context) { 
    	  
      var panel = context.getPanel(panelName, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Headings/Landmarks View'); 
    },
        
    /**
     * 
     * @param context
     * @returns
     */
    linksView: function(context) { 
        	  
      var panel = context.getPanel(panelName, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Links View'); 
    },
    
    /**
     * 
     * @param context
     * @returns
     */
    listView: function(context) { 
         	  
      var panel = context.getPanel(panelName, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside List View'); 
    },
    
    /**
     * 
     * @param context
     * @returns
     */
    tablesView: function(context) { 
            	  
      var panel = context.getPanel(panelName, true);
    
      /* Clear the panel before writing anything onto the report*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Tables View'); 
    },
    
    /**
     * navigationView
     * 
     * @desc
     * 
     * @param context
     */
    navigationView: function(context) { 
    
      var cachesResult = this.updateCache();
      // NavigationPanel.onNavigationClick(context, cachesResult);
      FBTrace.sysout("Hello World");
      var panel = context.getPanel(panelName, true);
      FBTrace.sysout("panelll....", panel);
      
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
      
      this.loadCSS("chrome://ainspector/content/css/ainspector-panel.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/ainspector-side-panel.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/fonts-min.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/tabview.css", panel.document);
      //this.loadCSS("chrome://ainspector/content/css/ainspector.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/allyGrade.css", panel.document);
      this.loadCSS("chrome://ainspector/content/css/grid.css", panel.document); 
      
      var toolbar = panel.document.createElement("div");
    
      toolbar.id = "toolbarDiv";
      navigationPanel.navigationView(nav_toolbar_buttons, toolbar, panel, cachesResult);
    },
  
    /**
     * equivalentsView
     * 
     * @desc
     * 
     * @param context
     */
    equivalentsView: function(context) { 
 
      var panel = context.getPanel(panelName, true);
    
      /* Clear the panel before writing anything onto the Navigation*/
      if (panel) {
       	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Equivalents View'); 
    },
  
    /**
     * colorContrastView
     * 
     * @desc
     * 
     * @param context
     */
    colorContrastView: function(context) { 

      var panel = context.getPanel(panelName, true);
    
      /* Clear the panel before writing anything onto the Navigation*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
      
      Firebug.currentContext.getPanel("AInspector").printLine('Inside Colorcontrast View'); 
    },
  
    /**
     * updateCache
     * 
     * @desc
     * 
     */
    updateCache: function() {

      try { 
        var doc = window.content.document;
      } catch(e) {
        var doc  = window.opener.parent.content.document;
      } // end try
      
      FBTrace.sysout("doc.location---" + doc.location);
      FBTrace.sysout("doc.title---" + doc.title);
      var cacheResult = new OpenAjax.a11y.RulesetEvaluation('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cacheResult.evaluate(true);
      cacheResult.dom_cache.links_cache.sortLinkElements('document_order', true);
      
      return cacheResult;
    },
  
    /**
     * loadCSS
     * 
     * @desc
     * 
     * @param  url
     * @param  doc 
     */
    loadCSS: function(url, doc) {
    
      if ( ! doc ) {
        return '';
      }
      
      var newCss = doc.createElement("link");
      newCss.rel = "stylesheet";
      newCss.type = "text\/css";
      newCss.href = url;
      doc.body.appendChild(newCss);
      
      return newCss;
    },
    
    retrieveResultFromCache: function(cacheResult) {
      	
    }
  }); 

  function ainspectorPanel() {} 

  ainspectorPanel.prototype = extend(Firebug.Panel, { 
  
    name: "AInspector",  //returned by getPanel()
    title: "A11y Inspector", //title to appear on UI
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
    	
      Firebug.Panel.show.apply(this, arguments);
      FBTrace.sysout("Inside show..............................");
      
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