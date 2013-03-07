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
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/firebug",
  "firebug/lib/domplate",
  "firebug/lib/events",
  "firebug/lib/dom",
  "firebug/lib/css",
  "ainspector/sidePanelUtil",
  "ainspector/ainspectorPreferences",
  "ainspector/openajax_a11y/oaa_a11y_amd",
  "ainspector/ainspectorUtil",
  "ainspector/ainspectorModule",
  ],

  function(FBTrace, Locale, Firebug, Domplate, Events, Dom, Css, SidePanelUtil, AinspectorPreferences, OpenAjax, AinspectorUtil) {
  
    with (Domplate){
    
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      
      Firebug.AinspectorModule.WcagSummaryTemplate = domplate(Firebug.Rep, new Firebug.Listener(), {
      
        tag:
           DIV({class:"main-panel"},
             SPAN({class: "summaryTitle", style: "margin-left: 0.5em;"}, "$view"), 
             SPAN({style: "margin-left: 3.0em; color: gray;"}, "%P"),
             SPAN({style: "margin-left: 0.5em; color: black; background-color: #78AB46"}, "  " + "$filtered_results.percent_passed" + "  "),
             SPAN({style: "margin-left: 1.5em; color: gray;"}, " V"),
             SPAN({style: "margin-left: 0.5em; color: black; background-color: #b22222;"}, "  " + "$filtered_results.violations_count" + "  "),
             SPAN({style: "margin-left: 1.5em; color: gray;"}, " W"),
             SPAN({style: "margin-left: 0.5em; color: black; background-color: #DAA520;"}, "  " + "$filtered_results.warnings_count" + "  "),
             SPAN({style: "margin-left: 1.5em; color: gray;"}, " MC"),
             SPAN({style: "margin-left: 0.5em; color: black; background-color: #CD96CD;"}, "  " + "$filtered_results.manual_checks_count" + "   "),
             
             BUTTON({onclick: "$expandAll", style: "float:right;", _repObject: "$results"}, "Expand All"),
             BUTTON({onclick: "$collapseAllRows", style: "float:right;", _repObject: "$results"}, "Collapse All"),
             
             TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", onclick: "$toggleRows"},
               THEAD(
                 TR({class: "gridHeaderRow firstRow gridRow"},
                     TH({class: "gridHeaderCell", id: "gridRulesCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox"}, Locale.$STR("ainspector.header.summary.Rule"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridRequiredCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.required")}, 
                         Locale.$STR("ainspector.header.summary.required"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridLevelCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.level")}, 
                         Locale.$STR("ainspector.header.summary.level"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.pass")}, 
                           Locale.$STR("ainspector.header.pass"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridWarningCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.warning")}, 
                         Locale.$STR("ainspector.header.warning"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.violation")}, 
                           Locale.$STR("ainspector.header.violation"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.mc")}, 
                         Locale.$STR("ainspector.header.summary.mc"))
                     )
                   ) //end TR
             ), //end THEAD
             TBODY(
               FOR("member", "$results", TAG("$row", {member: "$member"}))
             )
           )//end TABLE
         ), //end DIV
           
           row:
             TR({class: "treeRow gridRow", $hasChildren: "$member|checkChildren", _newObject: "$member", _repObject: "$member", level: "$member.level", 
               onclick: "$highlightTreeRow"},
               TD({class: "memberLabelCell", style: "padding-left: $member.level|getIndented", id: "gridRulesCol"},
                 DIV({class: "$member.container|getClassName", title : "$member.summary", style: "font-weight: normal;margin-left:0.5em;"}, "$member.summary")
               ),
               TD({class: "memberLabelCell", id: "gridRequiredCol"}, 
            		 DIV({class: "gridContent gridAlign $member.required|getStyleOnRequired"}, "$member.required|getText")
               ),
               TD({class: "memberLabelCell", id: "gridLevelCol"},
                 DIV({style:"font-weight:normal; text-align: center;" }, "$member.wcag20_level_label")
               ),
               TD({class: "memberLabelCell", id: "gridPassCol"},
            		 DIV({class: "gridContent gridAlign"}, TAG("$strTagPass", {rule_result: "$member"}))
               ),
               TD({class: "memberLabelCell", id: "gridWarningCol"},
            		 DIV({class: "gridContent gridAlign"}, TAG("$strTagWarn", {rule_result: "$member"}))
               ),
               TD({class: "memberLabelCell", id: "gridViolationCol"},
            		 DIV({class: "gridContent gridAlign"}, TAG("$strTagViolation", {rule_result: "$member"}))
               ),
               TD({class: "memberLabelCell", id: "gridManualCheckCol"},
            		 DIV({class: "gridContent gridAlign"}, TAG("$strTagManual", {rule_result: "$member"}))
               )
             ),

             boldString  : DIV({class: "boldMsgTxt gridAlign"}, "$member.required"),
             strTagManual : DIV({class: "$rule_result.manual_checks_count|getManualCheckStyle"}, "$rule_result.manual_checks_count"), //$object.manual_checks_count
             strTagViolation : DIV({class: "$rule_result.violations_count|getViolationStyle"}, "$rule_result.violations_count"), //$object.violations_count
             strTagPass : DIV({class: "$rule_result.passed_count|getPassStyle"}, "$rule_result.passed_count"), //$object.passed_count
             strTagWarn : DIV({class: "$rule_result.warnings_count|getWarningsStyle"}, "$rule_result.warnings_count"), //$object.warnings_count
             
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
             
             getStyleOnRequired : function(required) {
            	 
            	 if (required == 'na') return "grayStyle";
             },
             
             loop:
               FOR("member", "$members", TAG("$row", {member: "$member"})),
               
             getIndented : function(level){
            	 
            	 var level = level * 16;
            	 
            	 return level+'px';
             },  
             
             getText :function(text){
            	
            	 if (typeof text === 'string') return text;
            	 else return " ";
             },
             
             /**
              * @function getClassName
              */  
             getClassName : function(container) {
               
               if (container) return 'treeLabel';
               
             },
             
             /**
              * @function viewTag
              * 
              * @desc gets cache item results for a rule category
              * 
              * @param {Object}rule_results - rule results object
              * @param {String}rule_category- specific rule category selected in the menu  
              */
             viewTag : function(rule_results, rule_category, view, id, name) {
               
               SidePanelUtil.addAndRemoveSidePanels(false);

               var preferences = AinspectorPreferences.getPreferences();
               var panel = Firebug.currentContext.getPanel("ainspector", true);
            
               var filtered_results = rule_results.getFilteredRuleResultsByRuleSummary(rule_category, 
                    name, preferences.show_results_filter_value);
               if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; filtered_results: ", filtered_results);
               var rule_results_tree = filtered_results.createListOfRuleResults();
               
               var filtered_rule_results_groups = filtered_results.filtered_rule_results_groups;
               
               if (panel)
                 Dom.clearNode(panel.panelNode);
               
               panel.panelNode.id = "ainspector-panel";
               if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; rule_results_tree: ", rule_results_tree);

               if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; filtered_rule_results_groups: ", filtered_rule_results_groups);
               
               panel.table = this.tag.replace({results: rule_results_tree, view:view, filtered_results: filtered_results}, panel.panelNode);
               
               this.expandAllRows(panel.table);
               AinspectorUtil.selectRow(panel.table, true, id);

               AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
               
               var side_panel = Firebug.chrome.getSelectedSidePanel();
               
               if (side_panel){
                
                 if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode);
                 else side_panel.getPanelViewMesg(side_panel.panelNode, "");
               } else {
                 side_panel = Firebug.currentContext.getPanel('elements');
                 side_panel.getPanelViewMesg(side_panel.panelNode, "");
               }
             },
             
             checkChildren : function(tree_item) {
            	 
            	 if (tree_item.container== true && tree_item.children.length > 0) return true;
            	 else return false;
             },
             
            /**
             * @function toggleRows
             */
            toggleRows : function(event) {
              
              if (!Events.isLeftClick(event)) return;
    
              var row = Dom.getAncestorByClass(event.target, "treeRow");
              var label = Dom.getAncestorByClass(event.target, "treeLabel");
        
              if (label && Css.hasClass(row, "hasChildren")) this.toggleRow(row);
            },
            
            /**
             * @function toggleRow
             */
            toggleRow : function(row) {
              
              if (Css.hasClass(row, "opened")) {
                this.closeRow(row);
              } else {
                this.openRow(row);
              }
            },
            
            /**
             * @function closeRow
             * 
             * @desc collapses the row and hides the nested rows
             * 
             * @param {Object} row - row thats already expanded
             */
            closeRow : function(row){
    
              if (Css.hasClass(row, "opened")) {
                var level = parseInt(row.getAttribute("level"));
                Css.removeClass(row, "opened");
                var tbody = row.parentNode;
            
                for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling) {
              
                  if (parseInt(firstRow.getAttribute("level")) <= level) break;
                  tbody.removeChild(firstRow);
                }
              }
            },
            
            /**
             * @function openRow
             * 
             * @desc expands a row and shows the nested rows
             * 
             * @param {Object}row - row that is closed
             */
            openRow : function(row){
              
              if (!Css.hasClass(row, "opened")) {
                
                var level = parseInt(row.getAttribute("level"));
                Css.setClass(row, "opened");
                var repObject = row.newObject;
              
                if (repObject) {
                  var members;
                  
                  if (repObject.children)
                    this.loop.insertRows({members: repObject.children}, row);
                }
    //            return panel.table;
              }
            },
            
            /**
             * @function highlightTreeRow
             */
            highlightTreeRow : function(event){
              
              var table       = Dom.getAncestorByClass(event.target, "domTable");
              var current_row = Dom.getAncestorByClass(event.target, "treeRow");
              AinspectorUtil.highlightRow(event, table, current_row);
            },
            
            expandAll : function(event) {
              this.expandAllRows(event.target);
            },
            
            expandAllRows : function(panel){
              
              var main_panel = Dom.getAncestorByClass(panel, 'main-panel');
              var table = Dom.getChildByClass(main_panel, 'domTable');

              var rows = table.rows;
              var length = table.rows.length;
              
              for (var i = 0; i < length; i++) {
                var row = rows[i];

                if (Css.hasClass(row, "hasChildren")) this.openRow(row);
                
                if (row.repObject) {
                  var object = row.repObject;
                  
                  if (object.children) length += object.children.length;
                }
              }
            },
            
            collapseAllRows : function (event) {
              
              var main_panel = Dom.getAncestorByClass(event.target, 'main-panel');
              var table = Dom.getChildByClass(main_panel, 'domTable');

              var rows = table.rows;
              var length = table.rows.length;
              
              for (var i = 0; i < length; i++) {
                var row = rows[i];
                if (Css.hasClass(row, "opened")) this.closeRow(row);
              }
            }
            
      });
    } //end Domplate
    
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-tree-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
    Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");

    Firebug.registerRep(Firebug.AinspectorModule.WcagSummaryTemplate);

    return Firebug.AinspectorModule.WcagSummaryTemplate;
  }
);