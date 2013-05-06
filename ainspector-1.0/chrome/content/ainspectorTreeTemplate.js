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
  function (FBTrace, Locale, Firebug, Domplate, Events, Dom, Css, SidePanelUtil, AinspectorPreferences, OpenAjax, AinspectorUtil) {
    
    with (Domplate){
    
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      
      Firebug.AinspectorModule.AinspectorTreeTemplate = domplate(Firebug.Rep, new Firebug.Listener(), {
      
        tag:
          DIV({class:"main-panel"},
            SPAN({class: "summaryTitle", style: "margin-left: 0.5em;"}, "$view"),
            DIV({class: "sGrid"},
          		SPAN({style: "margin-left: 3.0em; color: gray;"}, "P"),
          		SPAN({class: "summaryGrid", style: "background-color: #B0E57C"}, "  " + "$resultSummary.passed" + "  "),
          		SPAN({style: "margin-left: 1.5em; color: gray;"}, " V"),
          		SPAN({class: "summaryGrid", style: "background-color: #FFAEAE;"}, "  " + "$resultSummary.violations" + "  "),
          		SPAN({style: "margin-left: 1.5em; color: gray;"}, " W"),
          		SPAN({class: "summaryGrid", style: "background-color: #FFEC94;"}, "  " + "$resultSummary.warnings" + "  "),
          		SPAN({style: "margin-left: 1.5em; color: gray;"}, " MC"),
          		SPAN({class: "summaryGrid", style: "background-color: #B4D8E7;"}, "  " + "$resultSummary.manual_checks" + "   "),
              
          		BUTTON({onclick: "$expandAll", style: "float:right;", _repObject: "$cache_item_list"}, "Expand All"),
          		BUTTON({onclick: "$collapseAllRows", style: "float:right;", _repObject: "$cache_item_list"}, "Collapse All"),
        		  SELECT({class: "highlight-option", style: "float:right;", id : "hihglight-options", name : "Highlight", onchange : "$onChangeOption"},
                OPTION({id: "all"}, Locale.$STR("ainspector.mainpanel.highlight.options.selected")),
                OPTION({id: "some"}, Locale.$STR("ainspector.mainpanel.highlight.options.vw")),
                OPTION({id: "none"}, Locale.$STR("ainspector.mainpanel.highlight.options.none"))
              ),
              SPAN({title: Locale.$STR("ainspector.mainpanel.highlight"), style: "float:right; margin-right: 0.8em; color: black; font-weight: normal;"}, " Highlight: ")
            ),
            TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", onclick:"$toggleRows",
              "aria-selected" : "true", tabindex: "0", onkeypress: "$onKeyPressGrid"},
              THEAD(
                TR({class: "gridHeaderRow firstRow gridRow", "aria-selected" : "false", tabindex: "-1", role: "row",
                  id: "tableHeader", onclick: "$sortColumn", onfocus: "$onFocus"},
                  TH({class: "gridHeaderCell", id: "headEleCol"}, 
                    DIV({class: "gridHeaderCellBox"}, 
                      Locale.$STR("ainspector.header.element"))
                  ),
                  TH({class: "gridHeaderCell", id: "headLabelCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.hidden")}, 
                      Locale.$STR("ainspector.header.hidden"))
                  ),
                  TH({class: "gridHeaderCell", id: "headDescCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.pass")}, 
                      Locale.$STR("ainspector.header.pass"))
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.warning")}, 
                      Locale.$STR("ainspector.header.warning"))
                  ),
                  TH({class: "gridHeaderCell ", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.manualcheck")}, 
                      Locale.$STR("ainspector.header.manualcheck"))
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.violation")}, 
                      Locale.$STR("ainspector.header.violation"))    
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox"}, 
                      Locale.$STR("ainspector.header.goto"))
                  )
                ) //end TR
              ), //end THEAD
            TBODY(
              FOR("member", "$cache_item_list", TAG("$row", {member: "$member"}))
            )
           ) //end TABLE
          ),
          
          row :
            TR({class: "$member|getRowClass treeRow gridRow", $hasChildren: "$member.container", level: "$member.level",
             onclick: "$highlightTreeRow", ondblclick: "$toHTMLPanel", _repObject: "$member", tabindex: "-1",
             role: "row", "aria-selected" : "$member|getSelectedState", onfocus: "$onFocus"},
              TD({class: "memberLabelCell", style: "padding-left: $member.level|getIndented", _repObject: "$member.value"},
                DIV({class: "$member.container|getClassName", title : "$member.element", style: "font-weight: normal;margin-left:0.5em;"}, "$member.element")
              ),
              TD({class: "memberLabelCell", id: "gridPassCol"}, 
            		DIV({class: "gridContent gridAlign"}, TAG("$strTagHidden", {node_result: "$member"}))
              ),
              TD({class: "memberLabelCell"},
            		DIV({class: "gridContent gridAlign"}, TAG("$strTagPass", {node_result: "$member"}))
              ),
              TD({class: "memberLabelCell", id: "gridWarningCol"},
            		DIV({class: "gridContent gridAlign"}, TAG("$strTagWarn", {node_result: "$member"}))
              ),
              TD({class: "memberLabelCell", id: "gridManualCheckCol"},
            		DIV({class: "gridContent gridAlign"}, TAG("$strTagManual", {node_result: "$member"}))
              ),
              TD({class: "memberLabelCell", id: "gridViolationCol"},
            		DIV({class: "gridContent gridAlign"}, TAG("$strTagViolation", {node_result: "$member"}))
              ),
              TD({class: "memberLabelCell gridAlign", id: "gridHTMLCol",},
                BUTTON({onclick: "$toHTMLPanel", id: "html_panel_button", tabindex: "-1"}, "HTML")
              )
           ),
           
           styleTag : DIV({class: "styleLabel"},"no label"),
           normalTag : DIV({class: ""},"lab"),
           zeroTag: DIV({class: "gridAlign"}, "0"),
           strTagManual : DIV({class: "$node_result.manual_checks_count|getManualCheckStyle"}, "$node_result.manual_checks_count"), //$object.manual_checks_count
           strTagViolation : DIV({class: "$node_result.violations_count|getViolationStyle"}, "$node_result.violations_count"), //$object.violations_count
           strTagPass : DIV({class: "$node_result.passed_count|getPassStyle"}, "$node_result.passed_count"), //$object.passed_count
           strTagWarn : DIV({class: "$node_result.warnings_count|getWarningsStyle"}, "$node_result.warnings_count"), //$object.warnings_count
           strTagHidden : DIV({class: "$node_result.hidden_count|getHiddenStyle"}, "$node_result.hidden_count"), //$object.hidden_count
           
           /**
            * @function getClassName
            */  
           getClassName : function(container) {
             
             if (container) return 'treeLabel';
             
           },
           
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
           
           loop:
             FOR("member", "$members", TAG("$row", {member: "$member"})),
             
          getIndented : function(level){
        
        	var level = level * 16;
         	 
         	return level+'px';  
          },
          
          /**
           * @function memberIterator
           */
          memberIterator : function(object) {
            
            return this.getMembers(object);
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
            var cache_results = rule_results.getCacheItemsByElementType(rule_category, preferences.show_results_filter_value);
            if (panel)
              Dom.clearNode(panel.panelNode);
            
            panel.panelNode.id = "ainspector-panel";
            var cache_item_results = cache_results.cache_item_results;
            var node_results = new OpenAjax.a11y.formatters.TreeViewOfFilteredCacheItemResults(cache_results);;
            
            if (FBTrace.DBG_AINSPECTOR) {}FBTrace.sysout("AInspector; AinspectorTreeTemplate.viewTag(cache_results): ", cache_results);
            if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorTreeTemplate.viewTag(node_results): ", node_results);
            if (node_results.cache_item_list.length > 0) { 
              panel.table = this.tag.replace({cache_item_list: node_results.cache_item_list, view:view, resultSummary: cache_results.getResultSummary()}, panel.panelNode);
              this.expandAllRows(panel.table);
            } else {
              panel.table = AinspectorUtil.noDataView.tag.replace({view:view}, panel.panelNode);
            }  
            AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
            AinspectorUtil.contextMenu.setHighlightOption(panel.table);

            var side_panel = Firebug.chrome.getSelectedSidePanel();
            
            AinspectorUtil.selectRow(panel.table, false, id);
            
            if (side_panel){
             
              if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, 
                  side_panel.panelNode, side_panel.name);
              else if (cache_results.cache_item_results.length == 0) side_panel.getPanelViewMesg(side_panel.panelNode, "There are no elements in the left Panel");
              else side_panel.getPanelViewMesg(side_panel.panelNode, "");
            } else {
              side_panel = Firebug.currentContext.getPanel('ruleResults');
              side_panel.getPanelViewMesg(side_panel.panelNode, "");
            }
            
//            AinspectorUtil.selectedView = id;
          },
          
          /**
           * @function getMembers
           * 
           * @desc 
           */
          getMembers: function(object, level) {
            
            if (!level) level = 0;
            var members = [];
            
            for (var p in object) members.push(this.createMember(p, object[p], level));
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
          createMember: function(key, value, level)  {
            
            var name = null;
            
            if (value.cache_item) name = value.cache_item.toString();
            else name = value.toString();
            
            var hasChildren = false;
            
            if (value.filtered_children){
              if (value.filtered_children.length > 0) hasChildren = true;
            } else {
              if (value.child_cache_elements && value.child_cache_elements.length > 0) hasChildren = true; 
            }
            var styleTag;
            
            return {
              name: name, //name,
              hasChildren: hasChildren, 
              children: (value.filtered_children) ? value.filtered_children : value.child_cache_elements,
              value: (value != null) ? value : "",
              level: level,
              indent: level * 16,
              tag: this.strTag,
              violation_count: (value.violations_count > 0) ? this.strTagViolation : this.zeroTag,
              hidden_count: (value.hidden_count > 0) ? this.strTagHidden : this.zeroTag,
              pass_count: (value.passed_count > 0) ? this.strTagPass : this.zeroTag,
              manualCheck_count: (value.manual_checks_count > 0) ? this.strTagManual : this.zeroTag,
              warn_count: (value.warnings_count > 0) ? this.strTagWarn : this.zeroTag,
              violation_ct: value.violations_count,
              hidden_ct: value.hidden_count,
              pass_ct: value.passed_count,
              manualCheck_ct: value.manual_checks_count,
              warn_ct: value.warnings_count
            };
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
              var repObject = row.repObject;
//              FBTrace.sysout("row: ", row);
              if (repObject && repObject.children) {
                            
				var members;
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
          
          /**
           * @function toHTMLPanel
           */
          toHTMLPanel : function(event) {
            
            AinspectorUtil.toHTMLPanel(event);
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
          },
          
          onKeyPressGrid : function(event){
            AinspectorUtil.keyBoardSupport.onKeyPressGrid(event);
          },
          
          onFocus : function (event) {
            
            AinspectorUtil.keyBoardSupport.onFocus(event);
          },
          
          getTabIndex : function(obj) {
            AinspectorUtil.keyBoardSupport.getTabIndex(obj);
          }, 
          
          getSelectedState : function(obj) {
            AinspectorUtil.keyBoardSupport.getSelectedState(obj);
          },
          
          getRowClass : function(obj) {
            AinspectorUtil.keyBoardSupport.getRowClass(obj);
          },
          
          sortColumn : function(event) {
            
            var table  = Dom.getAncestorByClass(event.target, "ai-table-list-items");
            var column = Dom.getAncestorByClass(event.target, "gridHeaderCell");
            
            if (FBTrace.DBG_AINSPECTOR)
              
              FBTrace.sysout("AInspector; Firebug.AinspectorModule.AinspectorRulesTemplate.sortColumn", AinspectorUtil);  
              AinspectorUtil.sortColumn(table, column);
          },
          
          onChangeOption : function(event) {
            FBTrace.sysout("event in onChangeOption: ", event);
            
            var target = event.target;
            var option_selected = target.options[target.selectedIndex];
            AinspectorUtil.highlight_rules = option_selected;
          }
          
          
      });
    }
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-tree-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
  
    Firebug.registerRep(Firebug.AinspectorModule.AinspectorTreeTemplate);
    
    return Firebug.AinspectorModule.AinspectorTreeTemplate;
  }
);