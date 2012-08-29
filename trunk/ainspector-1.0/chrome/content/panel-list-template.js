var AINSPECTOR_FB = AINSPECTOR_FB || {};  

with (FBL) {
  AINSPECTOR_FB.template = AINSPECTOR_FB.template || {};
    
  AINSPECTOR_FB.template.grid = domplate({
    
    header : DIV({class : "main-panel"},
               DIV({class: "ruleset-div"},
                 SPAN({class: "ruleset-title"}, "Ruleset:  "),
                 SPAN({class: "ruleset-value"}, "$AINSPECTOR_FB.ruleset_title"),
                 SPAN({class: "ruleset-level"}, " Level:  "),
                 SPAN({class: "ruleset-level-value"}, "$AINSPECTOR_FB.selected_level"),
                 BUTTON({onclick: "$Firebug.preferenceModule.viewPanel", style: "margin-left: 0.5em;"}, "preferences"),
                 SPAN({class: "view-panel"}, "$view")
               ),
               DIV({class: "table-scrollable"},
                 TABLE({class: "ai-table-list-items", cellpadding: 0, id: "ai-table-list-items", cellspacing: 0, hiddenCols: "", role: "grid", "aria-selected" : "true",
                  tabindex: "0", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
                   THEAD({class: "header-fix"},
                     TR({class: "gridHeaderRow firstRow gridRow", id: "tableHeader", "role": "row", "aria-selected" : "false", tabindex: "-1", 
                      onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
                       TH({class: "gridHeaderCell", id: "gridOrderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Order")),
                       TH({class: "gridHeaderCell", id: "gridElementCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Element")),
                       TH({class: "gridHeaderCell", id: "gridHiddenCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rules Hidden"}, "H")),
                       TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rules Passed"}, "P")),
                       TH({class: "gridHeaderCell", id: "gridWarningCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rules Warning"}, "W")),
                       TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rules Manual Check"}, "MC")),
                       TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rules Violation"}, "V")),
                       TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "goto"))
                     ) //end TR
                   ), //end THEAD
                   TBODY({class: "tbody-scroll"},
                     FOR("object", "$elements|getMembers",
                       
                       TR({class: "tableRow gridRow", role: "row", "aria-selected" : "$object.object|$AINSPECTOR_FB.toolbarUtil.getSelectedState", 
                        tabindex: "$object.object|$AINSPECTOR_FB.toolbarUtil.getTabIndex", _repObject:"$object.object", 
                        onclick: "$highlightRow", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", 
                        ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
                       
                         TD({class: "gridCol gridOrderCol", id: "gridOrderCol", role: "gridcell"},
                           DIV({class: "gridContent gridAlign"}, "$object.document_order")
                         ),
                         TD({class: "gridCol gridElementCol", id: "gridElementCol", role: "gridcell"},
                           DIV({class: "gridContent gridAlign"}, "$object.tag_name|AINSPECTOR_FB.ainspectorUtil.truncateText")
                         ),
                         TD({class: "gridCol gridHiddenCol", id: "gridHiddenCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"},  TAG("$object.hidden_count", {'object': '$object'}))
                         ),
                         TD({class: "gridCol gridPassCol", id: "gridPassCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"}, TAG("$object.pass_count", {'object': '$object'}))
                         ),
                         TD({class: "gridCol gridWarningCol", id: "gridWarningCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"}, TAG("$object.warning_count", {'object': '$object'}))
                         ),
                         TD({class: "gridCol gridManualCheckCol", id: "gridManualCheckCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"}, TAG("$object.mc_count", {'object': '$object'}))
                         ),
                         TD({class: "gridCol gridViolationCol", id: "gridViolationCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"}, TAG("$object.violation_count", {'object': '$object'}))
                         ),
                         TD({class: "gridCol gridViolationCol", id: "gridViolationCol", role: "gridcell"},
                           DIV({class: "gridContent resultAlign"}, 
                            BUTTON({onclick: "$AINSPECTOR_FB.toolbarUtil.viewHTMLPanel", id: "html_panel_button", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.htmlButtonPress"}, "HTML"))
                         )
                       ) //end TR   
                     ) //end FOR
                   ) //end TBODY
                 ) //end TABLE
               ) //end DIV 
             ), //end DIV
             
             strTagPass : DIV({class: "passMsgTxt"}, "$object.pc"), //$object.passed_count
             strTagViolation : DIV({class: "violationMsgTxt"}, "$object.vc"), //$object.violations_count
             strTagManual : DIV({class: "manualMsgTxt"}, "$object.mc"), //$object.manual_checks_count
             strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object.hc"), //$object.hidden_count
             strTagWarn : DIV({class: "warnMsgTxt"}, "$object.wc"), //$object.warnings_count
             zeroTag : DIV({}, "0"),
             
             /**
              * @function getMembers
              * 
              * @desc
              * 
              * @param elements - 
              */
             getMembers : function(elements) {
               var members = [];
               
               for (var p in elements) members.push(this.createMembers(p, elements[p]));
               
               return members;
             },
             
             /**
              * @function createMembers
              * 
              * @desc
              * 
              * @param key -
              * @param object
              */
             createMembers : function(key, object){
               
               return {
                 document_order: object.cache_item.document_order,
                 tag_name: object.cache_item.toString(),
                 hidden_count: this.getHiddenResultCount(object.hidden_count),
                 pass_count: this.getPassedResultCount(object.passed_count),
                 warning_count: this.getWarnResultCount(object.warnings_count),
                 mc_count: this.getMCResultCount(object.manual_checks_count),
                 violation_count: this.getViolationResultCount(object.violations_count),
                 hc: object.hidden_count,
                 pc: object.passed_count,
                 wc: object.warnings_count, 
                 mc: object.manual_checks_count,
                 vc: object.violations_count,
                 object: object
               };
             },
             
             /**
              * @function getTagName
              * 
              * @desc returns tag name with more information like
              *  1. for image         - tagname:file name
              *  2. for form controls - tagname:type of form control
              * 
              * @param {Object} cache_item - object from OAA evaluation library
              */
             getTagName: function(cache_item) {
               
               return cache_item.toString();
             },
             
             /**
              * @function getHiddenResultCount
              * 
              * @desc returns the number of rules hidden for an element on a web page
              * 
              *  @param {Object} cache_item - object from OAA evaluation library
              */
             getHiddenResultCount : function(count) {
//               FBTrace.sysout("object in getHiddenResultount: "+ count);

               if (count > 0) return this.strTagHidden;
               
               else return this.zeroTag;
             },
             
             /**
              * @function getPassedResultCount
              * 
              * @desc returns the number of rules passed for an element on a web page
              * 
              *  @param {Object} count - object from OAA evaluation library
              */
             getPassedResultCount : function(count) {
               if (count > 0) return this.strTagPass;
               
               else return this.zeroTag;
             },
             
             /**
              * @function getPassedResultCount
              * 
              * @desc returns the number of rules give warning for an element on a web page
              * 
              *  @param {Object} count - object from OAA evaluation library
              */
             getWarnResultCount : function(count) {
               
               if (count > 0) return this.strTagWarn;

               else return this.zeroTag;
             },
             
             /**
              * @function getPassedResultCount
              * 
              * @desc returns the number of rules to be manually checked for an element on a web page
              * 
              *  @param {Object} count - object from OAA evaluation library
              */
             getMCResultCount : function(count) {
               
               if (count > 0) return this.strTagManual;
               
               else return this.zeroTag;
             },
             
             /**
              * @function getViolationResultCount
              * 
              * @desc returns the number of rules failed for an element on a web page
              * 
              *  @param {Object} count - object from OAA evaluation library
              */
             getViolationResultCount : function(count) {
               
               if (count > 0) return this.strTagViolation;

               else return this.zeroTag;
             },
             
             /**
              * @function highlightRow
              * 
              * @desc helper function to call highlight
              * 
              * @param {Event} event - even triggered when a row is selected in a panel
              * @property {Object} selection - present selected row info to be passed to the side panel 
              */
             highlightRow : function(event){
               
               panel.selection = Firebug.getRepObject(event.target);
               AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event);
             },
             
             /**
              * @function getContextMenuItems
              * 
              * @desc Creates Menu item for each header column in the panel
              */
             getContextMenuItems: function(object, target, context) {
               
               if (hasClass(target, "gridCol")) {
                 var links = target.getElementsByClassName('tableRow');
                   
                 if (links) {
                   var rep = Firebug.getRep(links, Firebug.currentContext);
        
                   return rep.getContextMenuItems(links, target, Firebug.currentContext);
                 }
               } else {
               
                 var popup = Firebug.chrome.$("fbContextMenu");

                 if (popup.firstChild && popup.firstChild.getAttribute("command") == "cmd_copy") 
                   popup.removeChild(popup.firstChild);

                 var items = [];

                 // Iterate over all columns and create a menu item for each.
                 var content = Firebug.currentContext.getPanel("AInspector", true).table;
                 FBTrace.sysout("AINSPECTOR_FB.template.grid.getcContextMenuItems() - content", content);
                 var table_div = getChildByClass(content, "table-scrollable");
//                 FBTrace.sysout("AINSPECTOR_FB.template.grid.getcContextMenuItems() - main_panel_div", main_panel_div);
                 var table = getChildByClass(table_div, "ai-table-list-items");
                 
                 if (!table) table = getChildByClass(table_div, "domTable");
                 
                 FBTrace.sysout("AINSPECTOR_FB.template.grid.getcContextMenuItems() - table_div", table_div);
//                 var table = getChildByClass(table_div, "ai-table-list-items");
                 FBTrace.sysout("AINSPECTOR_FB.template.grid.getcContextMenuItems() - table", table);
//                 if (!table) table = getChildByClass(table_div, "domTable"); 

                 var hiddenCols = table.getAttribute("hiddenCols");

                 FBTrace.sysout("hidden col: ", hiddenCols);
                 var lastVisibleIndex;
                 var visibleColCount = 0;

                // Iterate all columns except of the first one for breakpoints.
                 var header = AINSPECTOR_FB.ainspectorUtil.getAncestorByClass(target[1], "gridHeaderRow");

                 var columns = cloneArray(header.childNodes);
                 columns.shift();
              
                 for (var i=0; i<columns.length; i++) {
                   var column = columns[i];
                   var columnContent = column.getElementsByClassName("gridHeaderCellBox").item(0);
                   var visible = (hiddenCols.indexOf(column.id) == -1);
                   FBTrace.sysout("visible: ", visible);

                   items.push({
                   label: columnContent.textContent,
                   tooltiptext: columnContent.title,
                   type: "checkbox",
                   checked: visible,
                   nol10n: true,
                   command: bindFixed(this.onShowColumn, this, context, column.id)
                 });

                 if (visible) {
                   lastVisibleIndex = i;
                   visibleColCount++;
                 }
               }

               // If the last column is visible, disable its menu item.
               if (visibleColCount == 1)
                   items[lastVisibleIndex].disabled = true;

               items.push("-");
               items.push({
                   label: "net.header.Reset_Header",
                   tooltiptext: "net.header.tip.Reset_Header",
                   command: bindFixed(this.onResetColumns, this, context)
               });

               return items;
               }
             },
             
             /**
              * @function onShowColumn
              */
             onShowColumn : function(context, colId) {
               
               FBTrace.sysout("colId: "+ colId);
               
                 var panel = Firebug.currentContext.getPanel("AInspector", true);
                 var content = panel.table;
                 var table_div = getChildByClass(content, "table-scrollable");

                 var table = getChildByClass(table_div, "ai-table-list-items");
                 
                 if (!table) table = getChildByClass(table_div, "domTable");
                 
                 FBTrace.sysout("table in onShowColumn: ", table);
                 var hiddenCols = table.getAttribute("hiddenCols");
                 
                 FBTrace.sysout("hiddenCols on onShowCOlmn: ", hiddenCols);
                 // If the column is already present in the list of hidden columns,
                 // remove it, otherwise append it.
                 var index = hiddenCols.indexOf(colId);
                 FBTrace.sysout("index: " + index);
                 FBTrace.sysout("hiddenCols: " , hiddenCols);
  
                 if (index >= 0) {
                   table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) +
                   hiddenCols.substr(index+colId.length));
                 } else {
                   table.setAttribute("hiddenCols", hiddenCols + " " + colId);
                 }
  
                 // Store current state into the preferences.
                 AINSPECTOR_FB.Preference.setPref("hiddenCols", table.getAttribute("hiddenCols"));
             },
             
             /**
              * @function onResetColumns
              */
             onResetColumns : function(context) {
               
               var panel = Firebug.currentContext.getPanel("AInspector"); //var panel = context.getPanel(panelName, true);
               var header = getElementByClass(panel.panelNode, "gridHeaderRow");
               
               var content = getChildByClass(panel.table, "table-scrollable");
               var table = getChildByClass(content, "ai-table-list-items");
               
               if (!table) table = getChildByClass(content, "domTable");
               // Reset widths
               var columns = header.childNodes;
               
               for (var i=0; i<columns.length; i++) {
                 var col = columns[i];
           
                 if (col.style) col.style.width = "";
               }

               // Reset visibility. Only the Status column is hidden by default.
               getChildByClass(content, "ai-table-list-items").setAttribute("hiddenCols", "colStatus");
               AINSPECTOR_FB.Preference.setPref("hiddenCols", "colStatus");
             },
             
             /**
              * @function setTableMenuItems
              */
             setTableMenuItems : function(panel){
               
               var table_div = getChildByClass(panel, "table-scrollable");

               var ai_table = getChildByClass(table_div, "ai-table-list-items");
               
               if (!ai_table) ai_table = getChildByClass(table_div, "domTable");
               
               if (!ai_table) return;
               
               var hiddenCols = ai_table.getAttribute("hiddencols");
               
               if (AINSPECTOR_FB.preferences.show_results_pass == false) hiddenCols = hiddenCols  + " " + "gridPassCol";

               if (AINSPECTOR_FB.preferences.show_results_violations == false) hiddenCols = hiddenCols  + " " + "gridViolationCol";

               if (AINSPECTOR_FB.preferences.show_results_manual_checks == false) hiddenCols = hiddenCols  + " " + "gridManualCheckCol";

               if (AINSPECTOR_FB.preferences.show_results_warnings == false) hiddenCols = hiddenCols  + " " + "gridWarningCol";

               if (AINSPECTOR_FB.preferences.show_results_hidden == false) hiddenCols = hiddenCols  + " " + "gridHiddenCol";
               
               ai_table.setAttribute("hiddencols", hiddenCols);

            // Store current state into the preferences.
               AINSPECTOR_FB.Preference.setPref("hiddenCols", ai_table.getAttribute("hiddenCols"));
               
             },
             
             /**
              * @function getElementInformation
              * 
              * @desc calls a utility that opens a xul window for more properties of the element selected in the panel
              * 
              * @param {Object} event - event triggered when clicked on Element Information button
              */
             getElementInformation : function(event) {
               
               var tree = getAncestorByClass(event.target, "main-panel");
               var sub_div = getChildByClass(tree, "table-scrollable");
               var table = getChildByClass(sub_div, "ai-table-list-items");
               FBTrace.sysout("tble", table );
//               var table = tree.children[6];
               FBTrace.sysout("table: ", table);
               var tbody = table.children[1];
               
               var rows = tbody.children;
               
               var row;
               
               var flag = false;
               
               for (var i=0; i<=rows.length; i++) {
                 
                 var class_list = rows[i].classList;
                 
                 for (var j=0; j<class_list.length; j++) {
                   
                   if (class_list[j] == "gridRowSelected") {
                     flag = true;
                     break;
                   }
                 }
                 
                 if (flag == true) {
                   row = rows[i];
                   break;
                 }
               }

               FBTrace.sysout("row: ", row);
               window.openDialog("chrome://ainspector/content/item_properties/cache-item-properties.xul", "cache_item_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject.cache_item);
             }

        });
  
  AINSPECTOR_FB.emptyPanelTemplate = domplate({
    
    tag:
      DIV({class : "main-panel"},
          DIV({class: "ruleset-div"},
            SPAN({class: "ruleset-title"}, "Ruleset:  "),
            SPAN({class: "ruleset-value"}, "$AINSPECTOR_FB.ruleset_title"),
            SPAN({class: "ruleset-level"}, " Level:  "),
            SPAN({class: "ruleset-level-value"}, "$AINSPECTOR_FB.selected_level"),
            BUTTON({onclick: "$Firebug.preferenceModule.viewPanel"}, "preferences"),
            SPAN({class: "view-panel"}, "$view")
          ),
          DIV({class: "table-scrollable"},
            TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, role: "treegrid"},
              THEAD(
                TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", role: "row", tabindex: "0"},
                  TH({class: "gridHeaderCell", id: "gridOrderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Order")),
                  TH({class: "gridHeaderCell", id: "gridElementCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Element")),
                  TH({class: "gridHeaderCell", id: "gridHiddenCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "H")),
                  TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "P")),
                  TH({class: "gridHeaderCell", id: "gridWarningCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "W")),
                  TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "MC")),
                  TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "V"))
                )//end TR
              ),//end THEAD
              TBODY(
                TR({class: "tableRow gridRow", role: "row"},
                  TD(DIV({class: "gridCell gridCol gridContent"},"no elements"))
                ) //end TR
              ) //end TBODY  
            )//end TABLE
          )//end Table DIV
        )
      });
}