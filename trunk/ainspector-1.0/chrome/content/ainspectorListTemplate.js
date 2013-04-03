/**
 * Copyright 2013 University Of Illinois
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
define([
  "firebug/lib/object",
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/lib/dom",
  "firebug/firebug",
  "firebug/lib/domplate",
  "ainspector/sidePanelUtil",
  "ainspector/ainspectorPreferences",
  "ainspector/openajax_a11y/oaa_a11y_amd",
  "ainspector/ainspectorUtil",
  "ainspector/ainspectorModule"
  
  ],

  function (Obj, FBTrace, Locale, Dom, Firebug, Domplate, SidePanelUtil, AinspectorPreferences, OpenAjax, AinspectorUtil) {
    
    with (Domplate){
    
    var panelName = "ainspector";
    Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
    Firebug.AinspectorModule.AinspectorListTemplate = domplate(Firebug.Rep, new Firebug.Listener(), {
       tag:
         DIV({class:"main-panel"},
           SPAN({class: "summaryTitle", style: "margin-left: 0.5em;"}, "$view"),
           DIV({},
        	 	 SPAN({style: "margin-left: 3.0em; color: gray;"}, "P"),
        		 SPAN({class: "summaryGrid", style: "background-color: #B0E57C;"}, "  " + "$cache_results.passed_count" + "  "),
        		 SPAN({style: "margin-left: 1.5em; color: gray;"}, " V"),
        		 SPAN({class: "summaryGrid", style: "background-color: #FFAEAE;"}, "  " + "$cache_results.violations_count" + "  "),
         		 SPAN({style: "margin-left: 1.5em; color: gray;"}, " W"),
             SPAN({class: "summaryGrid", style: "background-color: #FFEC94;"}, "  " + "$cache_results.warnings_count" + "  "),
             SPAN({style: "margin-left: 1.5em; color: gray;"}, " MC"),
             SPAN({class: "summaryGrid", style: "background-color: #B4D8E7;"}, "  " + "$cache_results.manual_checks_count" + "   ")
           ),
           TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "grid", 
             "aria-selected" : "true", tabindex: "0"},
             THEAD({},
               TR({class: "gridHeaderRow firstRow gridRow", id: "tableHeader", onclick:"$sortColumn"},
                 TH({class: "gridHeaderCell", id: "gridOrderCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox"}, 
                   Locale.$STR("ainspector.header.order"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridElementCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox"}, 
                     Locale.$STR("ainspector.header.element"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridHiddenCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.hidden")}, 
                     Locale.$STR("ainspector.header.hidden"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.pass")}, 
                     Locale.$STR("ainspector.header.pass"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridWarningCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.warning")}, 
                     Locale.$STR("ainspector.header.warning"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.manualcheck")}, 
                     Locale.$STR("ainspector.header.manualcheck"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.violation")}, 
                     Locale.$STR("ainspector.header.violation"))
                 ),
                 TH({class: "gridHeaderCell", id: "gridHTMLCol", role: "columnheader"}, 
                   DIV({class: "gridHeaderCellBox"},
                     Locale.$STR("ainspector.header.goto"))
                 )
               ) //end TR
             ), //THEAD
             TBODY(
               FOR("object", "$results",  
                 TR({class: "tableRow gridRow", _repObject:"$object", onclick:"$highlightRow",
                   ondblclick:"$toHTMLPanel"},
                   TD({class:"gridCol", id: "gridOrderCol"}, 
        				     DIV({class: "gridContent", style: "margin-left:1.0em;"}, "$object.position")),
                   TD({class:"gridCol", id: "gridElementCol"}, 
        				     DIV({class: "gridContent"}, "$object.element|truncateText")),
                   TD({class:"gridCol", id: "gridHiddenCol"}, 
                		 DIV({class: "gridContent gridAlign"}, TAG("$strTagHidden", {node_result: "$object"}))
                   ),
                   TD({class:"gridCol", id: "gridPassCol"}, 
                		 DIV({class: "gridContent gridAlign"}, TAG("$strTagPass", {node_result: "$object"}))
                   ),
                   TD({class:"gridCol", id: "gridWarningCol"}, 
                		 DIV({class: "gridContent gridAlign"}, TAG("$strTagWarn", {node_result: "$object"}))
                   ),
                   TD({class:"gridCol", id: "gridManualCheckCol"}, 
                		 DIV({class: "gridContent gridAlign"}, TAG("$strTagManual", {node_result: "$object"}))
                   ),
                   TD({class:"gridCol", id: "gridViolationCol"}, 
                		 DIV({class: "gridContent gridAlign"}, TAG("$strTagViolation", {node_result: "$object"}))
                   ),
                   TD({class:"gridCol", id: "gridHTMLCol"}, 
                		 DIV({class: "gridContent gridAlign"}, BUTTON({onclick: "$toHTMLPanel"}, "HTML"))
                   )
                 )//end TR
               )
             ) //end TBODY
            )//end TABLE
           ), //end DIV
           
           strTagManual : DIV({class: "$node_result.manual_checks_count|getManualCheckStyle"}, "$node_result.manual_checks_count"), //$object.manual_checks_count
           strTagViolation : DIV({class: "$node_result.violations_count|getViolationStyle"}, "$node_result.violations_count"), //$object.violations_count
           strTagPass : DIV({class: "$node_result.passed_count|getPassStyle"}, "$node_result.passed_count"), //$object.passed_count
           strTagWarn : DIV({class: "$node_result.warnings_count|getWarningsStyle"}, "$node_result.warnings_count"), //$object.warnings_count
           strTagHidden : DIV({class: "$node_result.hidden_count|getHiddenStyle"}, "$node_result.hidden_count"), //$object.hidden_count
           
           getManualCheckStyle : function(mck) {
          	 
          	 if (mck > 0 ) return "manualMsgTxt";  
          	 else return "grayStyle";
           },
           
           getViolationStyle : function(violation) {
      	   
          	 if (violation > 0 ) return "violationMsgTxt";
          	 else return "grayStyle";
           },
           
           getPassStyle : function(pass) {
          	
          	 if (pass > 0 ) return "passMsgTxt";
          	 else return "grayStyle";
           },
           
           getWarningsStyle : function(warn) {
           
          	 if (warn > 0 ) return "warnMsgTxt";
          	 else return "grayStyle";
           },
           
           getHiddenStyle : function(hidden) {
          	 
          	 if (hidden > 0 ) return "hiddenMsgTxt";
          	 else return "grayStyle";
           },
           
           truncateText : function(text){
             return AinspectorUtil.truncateText(text, 100);
           },
           
           /**
            * @function viewTag
            * 
            * @desc gets cache item results for a rule category
            * 
            * @param {Object}rule_results - rule results object
            * @param {String}rule_category- specific rule category selected in the menu  
            */
           viewTag : function(rule_results, rule_category, view, id) {
             
             SidePanelUtil.addAndRemoveSidePanels(true);
             
             var preferences = AinspectorPreferences.getPreferences();
             
             var panel = Firebug.currentContext.getPanel("ainspector", true);
             
             if (panel)
               Dom.clearNode(panel.panelNode);
             
             panel.panelNode.id = "ainspector-panel";
             
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("Ainspector; preferencess: ", preferences);
            
             var cache_results = rule_results.getCacheItemsByElementType(rule_category, preferences.show_results_filter_value);
             var cache_item_results = cache_results.cache_item_results;
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("Ainspector; cache_results: ", cache_results);
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("Ainspector; cache_item_results: ", cache_item_results);

//             var node_results_list = cache_results.createListOfCacheItemResults();
             var node_results_list = new OpenAjax.a11y.formatters.TreeViewOfFilteredCacheItemResults(cache_results);
             
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("Ainspector; node_results_list: ", node_results_list);

             if (node_results_list.cache_item_list.length > 0)
              panel.table = this.tag.replace({results: node_results_list.cache_item_list, view:view, cache_results: cache_results}, panel.panelNode);
             else
               panel.table = AinspectorUtil.noDataView.tag.replace({view:view}, panel.panelNode);
             
             AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
             
             var side_panel = Firebug.chrome.getSelectedSidePanel();
             
             AinspectorUtil.selectRow(panel.table, false, id);
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("side_panel: ", side_panel);
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("alselectedView: " + AinspectorUtil.selectedView);
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("View: " + id);
             
             if (side_panel){
              
               if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode, side_panel.name);
               else if (cache_results.cache_item_results.length == 0) side_panel.getPanelViewMesg(side_panel.panelNode, "There are no elements in the left Panel");
               else side_panel.getPanelViewMesg(side_panel.panelNode, "");
             } else {
               side_panel = Firebug.currentContext.getPanel('ruleResults');
               side_panel.getPanelViewMesg(side_panel.panelNode, "");
             }
//             AinspectorUtil.selectedView = id;
           },
           
           toHTMLPanel : function(event) {
  
             AinspectorUtil.toHTMLPanel(event);
             
           },
           
           /**
            * @function highlightRow
            * 
            * 
            */
           highlightRow : function(event) {
             var table       = Dom.getAncestorByClass(event.target, "ai-table-list-items");
             var current_row = Dom.getAncestorByClass(event.target, "tableRow");
             AinspectorUtil.highlightRow(event, table, current_row);
           },

           sortColumn : function(event) {
             
             var table  = Dom.getAncestorByClass(event.target, "ai-table-list-items");
             var column = Dom.getAncestorByClass(event.target, "gridHeaderCell");
             
             if (FBTrace.DBG_AINSPECTOR)
               FBTrace.sysout("AInspector; Firebug.AinspectorModule.AinspectorListTemplate.sortColumn", AinspectorUtil);  
             AinspectorUtil.sortColumn(table, column);
           }
        });
    }  
  Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
  Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
    
    Firebug.registerRep(Firebug.AinspectorModule.AinspectorListTemplate);
   
    return Firebug.AinspectorModule.AinspectorListTemplate;
  }
);