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
  	  FBTrace.sysout("FirebugExtensionButtons: ", Firebug.chrome.$("radio-toolbar").children);
      this.getToolbarButtonSelected(Firebug.chrome.$("radio-toolbar").children, Firebug.currentContext);
  	 // cache_object = this.updateCache();
	  collapse(FirebugExtensionButtons, !isFirebugExtension); 
	},
	
	/**
	 * 
	 */
	watchWindow : function(context, win){
//	  FBTrace.sysout("watchWindow: ", win);
	  //if (win == win.top) {
		context.window.addEventListener("load", this.ainspectorOnLoad, false);
		context.window.addEventListener("beforeunload", this.ainspectorOnUnload, false);
		context.window.addEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
	  //}	
	},
	
	/**
	 * 
	 */
	unWatchWindow : function(context, win){
	  //if (win == win.top) {
		context.window.removeEventListener("load", this.ainspectorOnLoad, false);
		context.window.removeEventListener("beforeunload", this.ainspectorOnUnload, false);
		context.window.removeEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
	  //}	
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
	  var toolbar_buttons = firebug_context.chrome.$("radio-toolbar").children;
	  this.getToolbarButtonSelected(toolbar_buttons, firebug_context); 
	 
     AINSPECTOR_FB.event.fire('onload', {'window': win });
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
      AINSPECTOR_FB.event.fire('onUnload', {'window': win});
      if (fbcontext !== Firebug.currentContext) {
        return;
      }
        
	},
	
	/**
	 * @function ainspectorOnDOMContentLoaded
	 *
	 * @desc
	 * 
	 *  @param {Event} event 
	 */
	ainspectorOnDOMContentLoaded : function (event){
		var win = event.currentTarget;
        AINSPECTOR_FB.event.fire('onDOMContentLoaded', {'window': win});
	},
    
	/**
	 * @function getToolbarButtonSelected
	 * 
	 * @desc
	 * 
	 * @param {Array} toolbarbuttons - 
	 * @param {firebug_context} firebug_context - 
	 */
	getToolbarButtonSelected : function(toolbarbuttons, firebug_context) {
	
	 var toolbar_button = "images";
	 for (var i=0; i < toolbarbuttons.length; i=i+2){
		if (toolbarbuttons[i].checked == true) {
		  toolbar_button = toolbarbuttons[i].id;
		  break;
		}
	 }
		 
	 //firebug_context.browser.chrome.$("radio-toolbar").children[0].checked = true;
	 cache_object = AINSPECTOR_FB.cacheUtil.updateCache();
	 window.AINSPECTOR_FB[toolbar_button].viewPanel(firebug_context, panel_name, cache_object);

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
      var doc;
      var url;
      try { 
        doc = window.content.document;
        url = window.content.location.href;
      } catch(e) {
        doc  = window.opener.parent.content.document;
        url = window.opener.parent.content.location.href;;
      } // end try

      var ruleset_id = 'WCAG20_ARIA_TRANS';
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(ruleset_id);

      if (ruleset) {
    	ruleset_result_cache = ruleset.evaluate(url, doc.title, doc, null, true);
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