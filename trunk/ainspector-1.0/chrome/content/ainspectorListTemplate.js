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
           SPAN({}, "$view"),    
           TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "grid", 
             "aria-selected" : "true", tabindex: "0"},
             THEAD({class: "header-fix"},
  
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
               FOR("object", "$results|getMembers",  
                 TR({class: "tableRow gridRow", _repObject:"$object.object", onclick:"$highlightRow",
                   ondblclick:"$toHTMLPanel"},
                   TD({class:"gridCol", id: "gridOrderCol"}, 
        				     DIV({class: "gridContent"}, "$object.document_order")),
                   TD({class:"gridCol", id: "gridElementCol"}, 
        				     DIV({class: "gridContent"}, "$object.tag_name|truncateText")),
                   TD({class:"gridCol", id: "gridHiddenCol"}, 
      		  		     DIV({class: "gridContent gridAlign"}, TAG("$object.hidden_count", {'object': '$object'}))),
                   TD({class:"gridCol", id: "gridPassCol"}, 
        				     DIV({class: "gridContent gridAlign"},  TAG("$object.pass_count", {'object': '$object'}))),
                   TD({class:"gridCol", id: "gridWarningCol"}, 
        				     DIV({class: "gridContent gridAlign"}, TAG("$object.warning_count", {'object': '$object'}))),
                   TD({class:"gridCol", id: "gridManualCheckCol"}, 
        				     DIV({class: "gridContent gridAlign"}, TAG("$object.mc_count", {'object': '$object'}))),
                   TD({class:"gridCol", id: "gridViolationCol"}, 
        				     DIV({class: "gridContent gridAlign"}, TAG("$object.violation_count", {'object': '$object'}))),
                   TD({class:"gridCol", id: "gridHTMLCol"}, 
        				     DIV({class: "gridContent gridAlign"}, BUTTON({onclick: "$toHTMLPanel"}, "HTML")))
                 )//end TR
               )
             ) //end TBODY
            )//end TABLE
           ), //end DIV
           
           strTagPass : DIV({class: "passMsgTxt"}, "$object.pc"), //$object.passed_count
           strTagViolation : DIV({class: "violationMsgTxt"}, "$object.vc"), //$object.violations_count
           strTagManual : DIV({class: "manualMsgTxt"}, "$object.mc"), //$object.manual_checks_count
           strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object.hc"), //$object.hidden_count
           strTagWarn : DIV({class: "warnMsgTxt"}, "$object.wc"), //$object.warnings_count
           zeroTag : DIV({}, "0"),
           
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
             
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("Ainspector; cache_item_results: ", cache_item_results);
             
             if (cache_results.cache_item_results.length > 0)
              panel.table = this.tag.replace({results: cache_item_results, view:view}, panel.panelNode);
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
           
           /**
            * @function getMembers
            * 
            * @desc 
            */
           getMembers : function(rule_results) {
             var members = [];
             
             for (var p in rule_results) members.push(this.createMembers(p, rule_results[p]));
            
             return members;
           },
           
           /**
            * @function createMembers
            * 
            * @desc creates needed result object for each rule result
            * 
            * @param {Number}key   -
            * @param {Object}object - rule result object 
            * 
            * @return 
            */
           createMembers : function(key, object) {
             return {
               object         : object,
               document_order : (object.cache_item) ? object.cache_item.document_order : object.document_order,
               tag_name       : (object.cache_item) ? object.cache_item.toString() : object.toString(),
               hc             : object.hidden_count,
               pc             : object.passed_count,
               wc             : object.warnings_count, 
               mc             : object.manual_checks_count,
               vc             : object.violations_count,
               hidden_count   : object.hidden_count > 0 ? this.strTagHidden : this.zeroTag,
               pass_count     : object.passed_count > 0 ? this.strTagPass : this.zeroTag,
               warning_count  : object.warnings_count > 0 ? this.strTagWarn : this.zeroTag,
               mc_count       : object.manual_checks_count > 0 ? this.strTagManual : this.zeroTag,
               violation_count: object.violations_count > 0 ? this.strTagViolation : this.zeroTag,
             };
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