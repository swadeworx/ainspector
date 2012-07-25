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

with (FBL) {
  
  panel : null;
  image_elements: null;

  AINSPECTOR_FB.images = {
		  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Images" button in the AInspector toolbar
   * 
   * @param {Object} context - Firebug current context i.e., DOM
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  viewPanel: function(context, panel_name, cache_object) {		
    
    FBTrace.sysout("Firebug in images view panel: ", window);
    //adds or removes the side panels from the extension depending on the panel we are in 
    AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false);
    
    if (!context) context = Firebug.currentContext;
    
    if (!panel_name) panel_name = "AInspector";

    FBTrace.sysout("context: ", context);

    panel = context.getPanel(panel_name, true);
    FBTrace.sysout("panel: ", panel);

    if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  
    
    FBTrace.sysout("cache_object: ", cache_object);

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      FBTrace.sysout("inside clearnode 1");

      clearNode(panel.panelNode);
      
//      var sidePanel = Firebug.currentContext.getPanel('rulesSidePanel');
//      FBTrace.sysout("inside clearnode 2", sidePanel);
//      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
      FBTrace.sysout("inside clearnode 3");

    }

    var images_cache = cache_object.dom_cache.images_cache;
    images_cache.sortImageElements('document_order', true);
    FBTrace.sysout("images_cache: ", images_cache);

    var images_cache_elements = images_cache.getItemsByNodeResults(OpenAjax.a11y.RESULT_FILTER.ALL);
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    FBTrace.sysout("images_cache_elements: ", images_cache_elements);

    panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: images_cache_elements}, toolbar, AINSPECTOR_FB.template.grid);
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
	  
    FBTrace.sysout("images_cache_elements: ", images_cache_elements);

    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
	
	  var table = panel.table.lastChild;
	  var tbody = table.lastChild;
  
	  FBTrace.sysout("panel.table: ", panel.table);
	  FBTrace.sysout("table: ", table);
    FBTrace.sysout("tbody: ", tbody);

//  panel.table = AINSPECTOR_FB.images.imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, AINSPECTOR_FB.images.imagesTemplate);
//	this.select(image_elements[0]);
//	Firebug.currentContext.getPanel('rulesSidePanel').sView(true, images_cache.image_elements[0]);
  },
    
  /**
   * @function select
   * 
   * @desc sets the first row object in to the panel and highlight() function to highlight the first row 
   * 
   * @param {Object} object - first image object in the images cache
   * @property {Object} selection - set an object to the panel to be used by the side panels when selected first time
   */
  select : function(object) {
     panel.selection = object;
    
     AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
      
  }
}; //end of images
  
  
  }