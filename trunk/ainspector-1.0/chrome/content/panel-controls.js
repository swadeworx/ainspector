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

/**
 * @file panel-controls.js
 * 
 * Create controls Object in response to the Controls toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the Control Rule Results from the OAA Cache library
 *   3. Calls the Generic template to display the rendered HTML on to the Controls Panel
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};  

with (FBL) {

  panel : null;
  
  AINSPECTOR_FB.controls = {
    
  /**
   * @function viewPanel
   * 
   * @desc
   * 
   * @param {Array} toolbar_buttons - buttons to show on a toolbar
   * @param {Object} toolbar - dom element created to hold the content of the panel. will append to the panel
   * @param {Object} panelView - panel
   * @param {Object} cache_object - container for image, media and abbreviation element properties
   * 
   */
    viewPanel : function(context, panel_name, cache_object) {
    
      AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(true);
      
      if (!panel_name) panel_name = "AInspector";

      if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

      panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);

        var rulesPanel = Firebug.currentContext.getPanel('rulesSidePanel');

        if (rulesPanel) clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
      }
                             
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
      
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";

      var controls_cache_elements = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.CONTROLS, OpenAjax.a11y.RESULT_FILTER.ALL);
      var controls_cache_element_results = controls_cache_elements.cache_item_results;
      
      
      FBTrace.sysout("controls_cache_elements: ", controls_cache_elements);
      
      if (!controls_cache_element_results) {
        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Links"}, toolbar, null);
      } else {
        if (controls_cache_elements.is_tree == true)
        
          panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: controls_cache_element_results, view: "Controls"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
        else  
          panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: controls_cache_element_results, view: "Controls"}, toolbar, AINSPECTOR_FB.template.grid);        
      }
      var element = panel.document.createElement("div");
      element.style.display = "block";
    
      panel.panelNode.id = "ainspector-panel";
      panel.panelNode.appendChild(toolbar);
      panel.panelNode.appendChild(element);

      AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);
      var message = "no elements to select in the main panel";
      if (!controls_cache_element_results) {
        Firebug.currentContext.getPanel('rulesSidePanel').showEmptySidePanel(message);
      } else {
        var selected_row = AINSPECTOR_FB.toolbarUtil.selectRow(panel, controls_cache_element_results[0], controls_cache_elements.is_tree, "controls");
        
        if (AINSPECTOR_FB.previous_selected_row != null && selected_row) Firebug.currentContext.getPanel('rulesSidePanel').sView(true, controls_cache_element_results[selected_row]);
        
        else Firebug.currentContext.getPanel('rulesSidePanel').sView(true, controls_cache_element_results[0]);
      }
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
      
      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[6].children[1].children[0]);
      
    }
}; //end of controlsObject  
  
}
