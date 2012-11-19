/*
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
/**
 * @file ainspector-firebug.js
 * 
 * initialize the top level namespace AINSPECTOR_FB
 * define the AInspectorPanel by 
 *   1. extending internal Firebug.Panel object methods
 *   2. initializing mouse event listeners for column resizing to the A11y Panel 
 * register the AInspectorPanel
 *   
 * define Firebug.ainspectorModule by inheriting or overriding 
 *   internal Firebug.Module methods and defining new methods
 * register the ainspectorModule 
 */

/**
 * @namespace AINSPECTOR_FB
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};
AINSPECTOR_FB.DEFAULT_TOOLBAR_BUTTON_ID = "allRules";

FBL.ns(function() { with (FBL) { 
  
  var panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainpector.mainpanel.title");
  var cache_object;
  
  function AInspectorPanel() {} 
  
  /**
   * An instance of the panel object is created by the Firebug framework for each browser tab where Firebug is activated.
   */
  AInspectorPanel.prototype = extend(Firebug.Panel, { 
  
    name: panel_name,
    title: panel_title,
    dependents: ["Rule Results", "Font Properties"],
  
    /**
     * @method initialize
     * 
     * @desc bind mouse events to the panel to inspect the events that are bound to DOM elements i.e., if anything goes wrong 
     * automatically called by Firebug Framework when A11y Panel is activated
     * calls the predecessor method (i.e., Firebug panels initialize()) to 
     *  1. set context object reference in panel
     *  2. do some initializations
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
     * @method initializeNode
     * 
     * @desc Add mouse event listeners to the panel to resize the column headers of a grid on the panel 
     * Only called by the Firebug at the end of initialize() method
     * 
     */
    initializeNode : function(){
      
      this.panelNode.id = "ainspector-panel";  
      
      this.panelNode.addEventListener("click", this.onMouseClick, true);
      this.panelNode.addEventListener("mousedown", this.onMouseDown, true);
      this.panelNode.addEventListener("mousemove", this.onMouseMove, true);
      this.panelNode.addEventListener("mouseup", this.onMouseUp, true);
      this.panelNode.addEventListener("mouseout", this.onMouseOut, true);
      
      Firebug.Panel.initializeNode.apply(this, arguments);
      
    },
    
    /**
     * @method destroyNode
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
      
      Firebug.Panel.destroyNode.apply(this, arguments);
    },
    
    /**
     * 
     */
    getContextMenuItems: function(object, target)
    {
      return AINSPECTOR_FB.template.grid.getContextMenuItems(this, arguments);
    }
  }); 

  /* Firebug.registerPanel(), registers the new panel with global Firebug object and ensures its display*/
  Firebug.registerPanel(AInspectorPanel); 
  
  /**
   * Always only one instance of a module object is created for a browser window
   */
  Firebug.ainspectorModule = extend(Firebug.Module, { 
  
    /**   
     * @method showPanel
     *  
     * @desc Show/Hide our panel based on new selection from the Firebug main toolbar.
     *   Overrides method called by the Firebug framework.
     *
     * @param {Object} browser - the browser window object
     * @param {Object} panel - the new selected panel object    
     */
    showPanel: function(browser, panel) { 
      
      FBTrace.sysout("**********      Begin Firebug.ainspectorModule.showPanel()     ************");
      var is_my_extension = panel && panel.name == panel_name;
      var my_extension_toolbar_buttons = Firebug.chrome.$("fbFirebugExtensionButtons");
      
      /* whether or not we display ainspector we still need to save the selected view */
      var toolbar_button_id = this.getToolbarButtonSelected(Firebug.chrome.$("fbFirebugExtensionButtons").children);
      FBTrace.sysout("Firebug.ainspectorModule.showPanel() - selected toolbarbutton: ", toolbar_button_id);
      FBTrace.sysout("Firebug.ainspectorModule.showPanel() - window.AINSPECTOR_FB: ", window.AINSPECTOR_FB);
      FBTrace.sysout("Firebug.ainspectorModule.showPanel() -  panel_name: " + panel_name);
      
      window.AINSPECTOR_FB[toolbar_button_id].viewPanel(Firebug.currentContext, panel_name, AINSPECTOR_FB.cacheUtil.updateCache());

      FBTrace.sysout("**********      End Firebug.ainspectorModule.showPanel()     ************");
      
      /* call FBL namespace function to hide the toolbar buttons if the selected panel is not my extensions panel*/
      collapse(my_extension_toolbar_buttons, !is_my_extension);
    },
    
    /**
     * @method watchWindow
     * 
     * @desc Called by Firebug when attaching to a window (top-level or frame).
     * 
     * @param {Object} context - object used to store the data associated with the web page
     *                           Every page with enabled Firebug has it's own instance of context object
     */
    watchWindow : function(context){
      context.window.addEventListener("load", this.ainspectorOnLoad, false);
      context.window.addEventListener("beforeunload", this.ainspectorOnUnLoad, false);
    },
    
    /**
     * @method unWatchWindow
     * 
     * @desc Called by Firebug when detaching to a window (top-level or frame).
     */
    unWatchWindow : function(context){
      context.window.removeEventListener("load", this.ainspectorOnLoad, false);
      context.window.removeEventListener("beforeunload", this.ainspectorOnUnLoad, false);
    },
    
    /**
     * @method ainspectorOnLoad
     * 
     * @desc gets the firebug context, maintains the state to select 
     * the toolbarbutton that has been selected earlier when the new web page is loaded 
     * 
     * @param {Event} event
     */
    ainspectorOnLoad : function(event) {
      
      var win = event.currentTarget;
      var firebug_context;
      
      if (win != Firebug.currentContext.window) {
        firebug_context = TabWatcher.getContextByWindow(win);
      } else {
        firebug_context = Firebug.currentContext;  
      }
      
      FBTrace.sysout("inside onload");
      cache_object = AINSPECTOR_FB.onLoad();
      
      var toolbar_buttons = firebug_context.chrome.$("fbFirebugExtensionButtons").children;
      
      var toolbar_button_id = Firebug.ainspectorModule.getToolbarButtonSelected(toolbar_buttons, firebug_context);
      window.AINSPECTOR_FB[toolbar_button_id].viewPanel(Firebug.currentContext, panel_name, cache_object);
    },
    
    /**
     * @method ainspectorOnUnLoad
     * 
     * @desc
     * 
     * @param {Event} event
     */
    ainspectorOnUnLoad : function(event) {

      var win = event.currentTarget;
      var fbcontext;
          
      if (win !== Firebug.currentContext.window) {
        fbcontext = TabWatcher.getContextByWindow(win);
      } else {
        fbcontext = Firebug.currentContext;
      }
        
      if (fbcontext !== Firebug.currentContext) {
        return;
      }
      OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

      AINSPECTOR_FB.onUnload();
    },
      
    /**
     * @method getToolbarButtonSelected
     * 
     * @desc retrieves the selected button id when the new page is loaded
     * 
     * @param {Array} toolbarbuttons - array of toolbarbuttons on the AInspector panel
     */
    getToolbarButtonSelected : function(toolbarbuttons) {
    
      for (var i=1; i < toolbarbuttons.length; i=i+2){
        if (toolbarbuttons[i].checked == true) return toolbarbuttons[i].id;
      }
      return AINSPECTOR_FB.DEFAULT_TOOLBAR_BUTTON_ID;
    }
    
    }); 
  
    Firebug.registerModule(Firebug.ainspectorModule); 

}});