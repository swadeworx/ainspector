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
 * @file toolbarbutton-views.js
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
    
    var previous_selected_row = null;
    var links_cache_elements_results = null;
    var number_of_cache_items_filtered = null;
    var cache_item_results = null;
    var link_elements = null;
    
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
      clearNode(Firebug.currentContext.getPanel('rulesResultsSidePanel').panelNode);
    }

    /* Get the Link rules results from the ruleset selected in preferences*/
    links_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.LINKS, OpenAjax.a11y.RESULT_FILTER.ALL);
    FBTrace.sysout("links_cache_elements_results: ", links_cache_elements_results);
    
    number_of_cache_items_filtered = links_cache_elements_results.number_of_cache_items_filtered;
    
    cache_item_results = links_cache_elements_results.getCacheItemResults();

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    FBTrace.sysout("cache_item_results: ", cache_item_results);
    
    if (!cache_item_results && number_of_cache_items_filtered == 0) {
      link_elements = links_cache_elements_results.dom_cache.links_cache.link_elements;
      
      if (!link_elements) panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Links"}, toolbar, null);
      
      else panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: link_elements, view:"Links"}, toolbar, AINSPECTOR_FB.template.grid);
    
    } else {
      panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Links"}, toolbar, AINSPECTOR_FB.template.grid); 
    
    }
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);

    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);
    
    var message = "no elements to select in the main panel";
    
    if (!cache_item_results) {
      if (number_of_cache_items_filtered == 0) {
        previous_selected_row =  AINSPECTOR_FB.toolbarUtil.selectRow(panel, link_elements[0], false, "links");
        message = "no rule results";
      }
      Firebug.currentContext.getPanel('rulesResultsSidePanel').showEmptySidePanel(message);
    } else {
      previous_selected_row = AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], false, "links");
      Firebug.currentContext.getPanel('rulesResultsSidePanel').sView(true, cache_item_results[0]);
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
      clearNode(Firebug.currentContext.getPanel('rulesResultsSidePanel').panelNode);
    }

    /* Get the Link rules results from the ruleset selected in preferences*/
    var tables_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.TABLES, OpenAjax.a11y.RESULT_FILTER.ALL);
    FBTrace.sysout("tables_cache_elements_results: ", tables_cache_elements_results);

    var cache_item_results = tables_cache_elements_results.getCacheItemResults();
    var number_of_cache_items_filtered = tables_cache_elements_results.number_of_cache_items_filtered;
    var table_elements = null;
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    FBTrace.sysout("cache_item_results: ", cache_item_results);
    
    if (!cache_item_results && number_of_cache_items_filtered == 0) {
      table_elements = tables_cache_elements_results.dom_cache.tables_cache.table_elements;
      
      if (!table_elements) panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Tables"}, toolbar, null);
      
      else {
        if (tables_cache_elements_results.is_tree == true) 
          panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: table_elements, view: "Tables"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
        else panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: table_elements, view:"Tables"}, toolbar, AINSPECTOR_FB.template.grid);
      }
  
    } else {
      if (tables_cache_elements_results.is_tree == true)
        panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: cache_item_results, view: "Tables"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
      else
        panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Tables"}, toolbar, AINSPECTOR_FB.template.grid);
    }
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);
    
    var message = "no elements to select in the main panel";
    
    if (!cache_item_results) {
      if (number_of_cache_items_filtered == 0) {
        previous_selected_row =  AINSPECTOR_FB.toolbarUtil.selectRow(panel, table_elements[0], false, "tables");
        message = "no rule results";
      }
      Firebug.currentContext.getPanel('rulesResultsSidePanel').showEmptySidePanel(message);
    } else {
      AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], tables_cache_elements_results.is_tree);
      Firebug.currentContext.getPanel('rulesResultsSidePanel').sView(true, cache_item_results[0]);
    }
  };
  
  AINSPECTOR_FB.audio = AINSPECTOR_FB.audio || {};
  
  AINSPECTOR_FB.audio.viewPanel = function(context, panel_name, cache_object) {
  
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
      clearNode(Firebug.currentContext.getPanel('rulesResultsSidePanel').panelNode);
    }

    /* Get the Link rules results from the ruleset selected in preferences*/
    var audio_video_cache_elements_results = cache_object.getCacheItemsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO, OpenAjax.a11y.RESULT_FILTER.ALL);
    FBTrace.sysout("tables_cache_elements_results: ", audio_video_cache_elements_results);

    var cache_item_results = audio_video_cache_elements_results.getCacheItemResults();
    var number_of_cache_items_filtered = audio_video_cache_elements_results.number_of_cache_items_filtered;
    var audio_video_elements = null;
    
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    FBTrace.sysout("cache_item_results: ", cache_item_results);
    
    if (!cache_item_results && number_of_cache_items_filtered == 0) {
      audio_video_elements = audio_video_cache_elements_results.dom_cache.media_cache.media_elements;
      
      if (!audio_video_elements) panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.replace({view:"Audio and Video"}, toolbar, null);
      
      else {
        if (audio_video_cache_elements_results.is_tree == true) 
          panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: audio_video_elements, view: "Audio and Video"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
        else panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: audio_video_elements, view:"Audio and Video"}, toolbar, AINSPECTOR_FB.template.grid);
      }
  
    } else {
      if (audio_video_cache_elements_results.is_tree == true)
        panel.table = AINSPECTOR_FB.treeTemplate.grid.tag.replace({object: cache_item_results, view: "Audio and Video"}, toolbar, AINSPECTOR_FB.treeTemplate.grid);
      else
        panel.table = AINSPECTOR_FB.template.grid.header.replace({elements: cache_item_results, view:"Audio and Video"}, toolbar, AINSPECTOR_FB.template.grid);
    }
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);
    
    var message = "no elements to select in the main panel";
    
    if (!cache_item_results) {
      if (number_of_cache_items_filtered == 0) {
        previous_selected_row =  AINSPECTOR_FB.toolbarUtil.selectRow(panel, audio_video_elements[0], false, "audio");
        message = "no rule results";
      }
      Firebug.currentContext.getPanel('rulesResultsSidePanel').showEmptySidePanel(message);
    } else {
      AINSPECTOR_FB.toolbarUtil.selectRow(panel, cache_item_results[0], audio_video_cache_elements_results.is_tree);
      Firebug.currentContext.getPanel('rulesResultsSidePanel').sView(true, cache_item_results[0]);
    }
  };
}