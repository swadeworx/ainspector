/**
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
      var FirebugExtensionButtons = Firebug.chrome.$("fbFirebugExtensionButtons");

      this.getToolbarButtonSelected(Firebug.chrome.$("fbFirebugExtensionButtons").children, Firebug.currentContext);
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
	 * @function watchWindow
	 * 
	 * @desc Called by Firebug when attaching to a window (top-level or frame).
	 */
	watchWindow : function(){
	  context.window.addEventListener("load", this.ainspectorOnLoad, false);
	  context.window.addEventListener("beforeunload", this.ainspectorOnUnload, false);
	},
	
	/**
	 * @function unWatchWindow
	 * 
	 * @desc Called by Firebug when detaching to a window (top-level or frame).
	 */
	unWatchWindow : function(){
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
      // fire onUnload event.
      var fbcontext;
        
      if (win !== Firebug.currentContext.window) {
        fbcontext = TabWatcher.getContextByWindow(win);
      } else {
        fbcontext = Firebug.currentContext;
      }

      AINSPECTOR_FB.onUnLoad();
      
      if (fbcontext !== Firebug.currentContext) {
        return;
      }
        
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