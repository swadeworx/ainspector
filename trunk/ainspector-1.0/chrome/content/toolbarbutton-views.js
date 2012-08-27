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
  
  AINSPECTOR_FB.links = AINSPECTOR_FB.links || {};
  
  AINSPECTOR_FB.links.viewPanel = function(context, panel_name, cache_object) {
    
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

    /* Get the Link rules results from the ruleset selected in preferences*/
    var links_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.LINKS, OpenAjax.a11y.RESULT_FILTER.ALL);
    FBTrace.sysout("links_cache_elements_results: ", links_cache_elements_results);

    var cache_item_results = links_cache_elements_results.getCacheItemResults();

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    FBTrace.sysout("cache_item_results: ", cache_item_results);
    
    
    if (!cache_item_results) {
      panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Links"}, toolbar, null);
      
    } else {
      panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Links"}, toolbar, AINSPECTOR_FB.template.grid); 
    
    }
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
    if (!cache_item_results) {
      Firebug.currentContext.getPanel('rulesSidePanel').showEmptySidePanel();
    } else {
      AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], false);
      Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[0]);
    }
  };
  
  AINSPECTOR_FB.tables = AINSPECTOR_FB.tables || {};
  
  AINSPECTOR_FB.tables.viewPanel = function(context, panel_name, cache_object) {
  
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

    /* Get the Link rules results from the ruleset selected in preferences*/
    var tables_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.TABLES, OpenAjax.a11y.RESULT_FILTER.ALL);
    FBTrace.sysout("tables_cache_elements_results: ", tables_cache_elements_results);

    var cache_item_results = tables_cache_elements_results.getCacheItemResults();
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    FBTrace.sysout("cache_item_results: ", cache_item_results);
    
    if (!cache_item_results) {
      panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Tables"}, toolbar, null);
    } else {
      if (tables_cache_elements_results.is_a_tree == true)
        panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: cache_item_results, view: "Tables"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
      else
        panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Tables"}, toolbar, AINSPECTOR_FB.template.grid);
    }
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
  
    if (!cache_item_results) {
      Firebug.currentContext.getPanel('rulesSidePanel').showEmptySidePanel();
    } else {
      AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], tables_cache_elements_results.is_a_tree);
      Firebug.currentContext.getPanel('rulesSidePanel').sView(true, cache_item_results[0]);
    }
  };
}