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
 * @file panel-images.js
 * 
 * Create images Object in response to the Images toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the Control Rule Results from the OAA Cache library
 *   3. Calls the Generic template to display the rendered HTML on to the Images Panel
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};  

with (FBL) {
  
  panel : null;

  AINSPECTOR_FB.content = AINSPECTOR_FB.content || {};
  AINSPECTOR_FB.headers = AINSPECTOR_FB.headers || {};
  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Content/Landmarks" button in the AInspector toolbar
   * 
   * @param {Object} context - Firebug current context i.e., DOM
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  AINSPECTOR_FB.content.viewPanel = function (context, panel_name, cache_object) {
    
    FBTrace.sysout("Inside the Content/Landmarks panel", AINSPECTOR_FB);
    
//  adds or removes the side panels from the extension depending on the panel we are in 
    AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(true);

    if (!context) context = Firebug.currentContext;
    if (!panel_name) panel_name = "AInspector";

    panel = context.getPanel(panel_name, true);

    if (!cache_object) {
      if (AINSPECTOR_FB.ruleset_object)
        cache_object = AINSPECTOR_FB.ruleset_object;
      else
        cache_object = AINSPECTOR_FB.cacheUtil.updateCache();
    }

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
    }

    /* Get the Image rules results from the ruleset selected in preferences*/
    var content_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.CONTENT_IN_LANDMARKS, OpenAjax.a11y.RESULT_FILTER.ALL);
    
    
    FBTrace.sysout("content_cache_elements_results", content_cache_elements_results);
    
    var cache_item_results = content_cache_elements_results.cache_item_results;
    
    FBTrace.sysout("cache_item_results", cache_item_results);
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    if (!cache_item_results) panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Links"}, toolbar, null);
    
    else panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Content in Landmarks"}, toolbar, AINSPECTOR_FB.template.grid);
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
//    var table_height = panel.document.getElementById('ai-table-list-items');
//    alert("table height............................"+ table_height.offsetHeight);
    
/*    var content_top = panel.document.getElementById("table-scrollable");
    var content_bottom = panel.document.getElementById("mybuttons");
    
    FBTrace.sysout("content_top - style.height............................", content_top.style.height);
    FBTrace.sysout("content_top - offsetHeight............................", content_top.offsetHeight);
    FBTrace.sysout("content_top - clientHeight............................", content_top.clientHeight);
    FBTrace.sysout("content_top - scrollHeight............................"+ content_top.scrollHeight);
    var contentTop = AINSPECTOR_FB.toolbarUtil.getPixelsFromTop(content_top);
    var contentBottom = AINSPECTOR_FB.toolbarUtil.getPixelsFromTop(content_bottom);
    var contentHeight = contentBottom - contentTop;*/
    
    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);
    
    var selected_row =  AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], false, "content");
    
    if (AINSPECTOR_FB.previous_selected_row != null && selected_row) Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[selected_row]);
    else Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[0]);

  };
  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Headers/Landmarks" button in the AInspector toolbar
   * 
   * @param {Object} context - Firebug current context i.e., DOM
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  AINSPECTOR_FB.headers.viewPanel = function(context, panel_name, cache_object) {

//  adds or removes the side panels from the extension depending on the panel we are in 
    AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(true);
    
    if (!context) context = Firebug.currentContext;
    if (!panel_name) panel_name = "AInspector";

    panel = context.getPanel(panel_name, true);

    if (!cache_object) {
      if (AINSPECTOR_FB.ruleset_object)
        cache_object = AINSPECTOR_FB.ruleset_object;
      else
        cache_object = AINSPECTOR_FB.cacheUtil.updateCache();
    }

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
    }

    /* Get the Image rules results from the ruleset selected in preferences*/
    var header_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.HEADINGS_LANDMARKS, OpenAjax.a11y.RESULT_FILTER.ALL);
    
    var cache_item_results = header_cache_elements_results.cache_item_results;
    
    FBTrace.sysout("AINSPECTOR_FB.headers.viewPanel() - cache_item_results", cache_item_results);
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    if (header_cache_elements_results.is_tree == true)
      
      panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: cache_item_results, view: "Headings and Landmarks"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
    else  
      
      panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Headings and Landmarks"}, toolbar, AINSPECTOR_FB.template.grid);
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);

    var selected_row = AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], header_cache_elements_results.is_tree, "headers");
   
    if (AINSPECTOR_FB.previous_selected_row != null && selected_row) Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[selected_row]);
    else Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[0]);

  };
  
  

}