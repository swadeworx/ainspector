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
 * initialize the top level namespace AINSPECTOR_FB
 * create the A11y Panel by 
 *   1. define Firebug.AInspectorPanel by extending internal Firebug.Panel object methods
 *   2. Initialize mouse event listeners for column resizing to the A11y Panel 
 * register the A11y Panel  
 * derive Firebug.AInspectorModule by
 *   1. internal Firebug.Module Object methods
 *   2. data object of A11y extension
 * register the A11y Module 
 */

/**
 * @namespace AINSPECTOR_FB
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};

FBL.ns(function() { with (FBL) { 
  
  var panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainpector.mainpanel.title");
  var cache_object;
  
  function AInspectorPanel() {} 
  
  /**
   * An instance of the panel object is created by the framework for each browser tab where Firebug is activated.
   */
  AInspectorPanel.prototype = extend(Firebug.Panel, { 
  
    name: panel_name,
    title: panel_title,
    dependents: ["Rules", "Attributes", "Cache", "Style", "Events"],
  
    /**
     * @function initialize
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
     * @function initializeNode
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
      
      Firebug.Panel.destroyNode.apply(this, arguments);
    }
  }); 

  /* Firebug.registerPanel(), registers the new panel with global Firebug object and ensures its display*/
  Firebug.registerPanel(AInspectorPanel); 
  
  /**
   * Always only one instance of a module object is created for a browser window
   */
  Firebug.ainspectorModule = extend(Firebug.Module, { 
  
    /**
     * @function initialize
     * 
     * @desc Called by Firebug when Firefox window is opened.
     * Must call super class (i.e., Firebug.Module) initialize() to add listeners automatically
     */
    initialize : function() {
      Firebug.Module.initialize.apply(this, arguments);  
    }, 
    
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
      
      var is_my_extension = panel && panel.name == panel_name;
      var my_extension_toolbar_buttons = Firebug.chrome.$("fbFirebugExtensionButtons");
  
      this.getToolbarButtonSelected(Firebug.chrome.$("fbFirebugExtensionButtons").children, Firebug.currentContext);
      
      /* call FBL namespace function to hide the toolbar buttons if the selected panel is not my extensions panel*/
      collapse(my_extension_toolbar_buttons, !is_my_extension); 
    },
    
    /**
     * @function watchWindow
     * 
     * @desc Called by Firebug when attaching to a window (top-level or frame).
     * 
     * @param {Object} context - object used to store the data associated with the web page
     *                           Every page with enabled Firebug has it's own instance of context object
     */
    watchWindow : function(context){
      context.window.addEventListener("load", this.ainspectorOnLoad, false);
      context.window.addEventListener("beforeunload", this.ainspectorOnUnload, false);
    },
    
    /**
     * @function unWatchWindow
     * 
     * @desc Called by Firebug when detaching to a window (top-level or frame).
     */
    unWatchWindow : function(context){
      context.window.removeEventListener("load", this.ainspectorOnLoad, false);
      context.window.removeEventListener("beforeunload", this.ainspectorOnUnload, false);
    },
    
    /**
     * @function ainspectorOnLoad
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
      
      cache_object = AINSPECTOR_FB.onLoad();
      
      var toolbar_buttons = firebug_context.chrome.$("fbFirebugExtensionButtons").children;
      
      Firebug.ainspectorModule.getToolbarButtonSelected(toolbar_buttons, firebug_context);
    },
    
    /**
     * @function ainspectorOnUnLoad
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
      AINSPECTOR_FB.onUnLoad();
    },
      
    /**
     * @function getToolbarButtonSelected
     * 
     * @desc retrieves the button selected when the new page is loaded
     * 
     * @param {Array} toolbarbuttons - array of toolbarbuttons on the AInspector panel
     * @param {firebug_context} firebug_context - 
     */
    getToolbarButtonSelected : function(toolbarbuttons, firebug_context) {
    
      var toolbar_button = "images";
     
      for (var i=1; i < toolbarbuttons.length; i=i+2){
        if (toolbarbuttons[i].checked == true) {
        toolbar_button = toolbarbuttons[i].id;
        break;
        }
      }
      window.AINSPECTOR_FB[toolbar_button].viewPanel(firebug_context, panel_name, cache_object);
    }
    
    }); 
  
    Firebug.registerModule(Firebug.ainspectorModule); 

}});