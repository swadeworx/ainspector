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
  "firebug/lib/lib",
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/lib/dom",
  "firebug/lib/domplate",
  "firebug/lib/css",
  "firebug/lib/array",
  "ainspector/headerResizer",
  "ainspector/ainspectorPreferences",
  "ainspector/highlighting/highlight"
  ],
  
  function(FBL, FBTrace, Locale, Dom, Domplate, Css, Arr, HeaderResizer, AinspectorPreferences, OAA_WEB_ACCESSIBILITY){
    var preferences = AinspectorPreferences.getPreferences();

    var AinspectorUtil = {
      selectedView : "onClickRulesMenuItem",
      selected_row : null,
      is_pass      : preferences.show_results_pass,
      is_hidden    : preferences.show_results_hidden,
      is_emc       : preferences.show_results_element_manual_checks,
      is_pmc       : preferences.show_results_page_manual_checks
    };
    /**
     * @function toHTMLPanel
     * 
     * @memberof AinspectorUtil
     * 
     * @desc response to the HTML button in all the rule category vies
     *       redirect to the HTML Panel of Firebug
     *
     *@param {Object} event - event triggered on a row in rule category views
     */
    AinspectorUtil.toHTMLPanel = function(event) {
      
      event.stopPropagation();
      FBTrace.sysout(" AinspectorUtil.toHTMLPane");
      var row = Dom.getAncestorByClass(event.target, "tableRow");
      
      if (!row) row = Dom.getAncestorByClass(event.target, "treeRow");
      
      var object = Firebug.getRepObject(event.target);
      FBTrace.sysout("Dom node to select in HTML panel: ", object);
      
      if (object.cache_item_result) object = object.cache_item_result.cache_item;
      else if (object.node_result) object = object.node_result.cache_item; 
      else object = object.cache_item;
      
//      if (FBTrace.DBG_AINSPECTOR) 
        FBTrace.sysout("Dom node to select in HTML panel: ", object);
    	  
      var cache_item = null;
      var node = null;
      
      if (object && object.cache_item) {
        cache_item = object.cache_item;
      } else {
        if (object.dom_text_nodes) return;
        if (object.parent_element) cache_item = object.parent_element.node;
        if (object.dom_element) cache_item = object;
      }
      
  //    AINSPECTOR_FB.previous_selected_row = row;
  
      if (cache_item.dom_element) node = cache_item.dom_element.node;
      else node = cache_item.node;
      
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
    }
    
    /**
     * @function highlightRow
     * 
     * @memberof AinspectorUtil
     * 
     * @desc highlight a row when a row is selected in a panel view
     * Set the "gridRowSelected" and "gridCellSelected" classes to the selected Row and 
     * cells in that row remove these classes from earlier selected row.
     * 
     * @param {event} event triggered when mouse click happens
     */
    AinspectorUtil.highlightRow = function(event, table, current_row) {
      
      var tbody = table.children[1]; //nomber of rows in a table
      var row;
      var cell;
  
      if (!current_row) { //to highlight header cells
        current_row =  Dom.getAncestorByClass(event.target, "gridHeaderRow");
        tbody = table.children[0];
        
        if (event.keyCode == 38 || event.keyCode == 37) {
            
        } else if (event.keyCode == 40 || event.keyCode == 39){
          table.children[0].children[0].blur();
          current_row = table.children[1].children[0]; 
          table.children[1].children[0].focus();
            
          Css.setClass(current_row, "gridRowSelected");
            
          for (var c=0; c< current_row.children.length; c++) {
            Css.setClass(current_row.children[c], "gridCellSelected");
          }
          return;
        }
      }
    
      for (var i = 0; i < tbody.children.length; i++) {
        row = tbody.children[i];
        var count = 0;
        var no_of_cells = row.children.length;
        
        for (var j = 0; j < no_of_cells; j++) {
          cell = row.children[j];
       
          for (var k=0; k<cell.classList.length;k++) {
       
            if (cell.classList[k] ==  "gridCellSelected") {
              Css.removeClass(cell, "gridCellSelected");
              count = count + 1;
              break;
            }
          }  
          if (count >= no_of_cells) break;
        }
        
        if (count >= no_of_cells) {
          Css.removeClass(row, "gridRowSelected");
          
          if (event.keyCode == 38 || event.keyCode == 37) {
            current_row = tbody.children[i-1]; 
  
          } else if (event.keyCode == 40 || event.keyCode == 39){
            current_row = tbody.children[i+1]; 
          }
          break;
        }
      }
      this.highlight(current_row);
    }
    
    /**
     * @function highlight
     * 
     * @memberof AINSPECTOR_FB.flatListTemplateUtil
     * 
     * @desc highlight the first row when a toolbar button is clicked
     * 
     * @param {Object} row - row to highlight
     */
    AinspectorUtil.highlight = function(row) {
      
      Css.setClass(row, "gridRowSelected");
      AinspectorUtil.selected_row = row;
      
      for (var i=0; i< row.children.length; i++) {
        Css.setClass(row.children[i], "gridCellSelected");
      }
//      FBTrace.sysout("row in highlight: ", row);
      if (row.repObject.filtered_rule_result && row.repObject.filtered_rule_result.filtered_node_results) {
        OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightNodeResults(row.repObject.filtered_rule_result.filtered_node_results);
      } else {
        OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems(row.repObject.cache_item_result);
      }
    }
    
    /**
     * @function selectRow
     * 
     * @desc sets the first row object in to the panel and highlight() function to highlight the first row 
     * 
     * @param {Object} object - first image object in the images cache
     * @property {Object} selection - set an object to the panel to be used by the side panels when selected first time
     */
    AinspectorUtil.selectRow = function(panel, is_a_tree, view) {

      if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorUtil.selectRow-selected_row: ", AinspectorUtil.selected_row);

      if  (AinspectorUtil.selected_row != null &&
          AinspectorUtil.selectedView == view) {
        
        var selected_row = AinspectorUtil.selected_row;
        var rows = null;

        var table = Dom.getChildByClass(panel, "domTable");
        if (!table) table = Dom.getChildByClass(panel, "ai-table-list-items");
        
//        if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorUtil.selectRow-table: ", table);
        
        rows = table.children[1].children;
        
//        if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorUtil.selectRow-rows: ", rows);
        
        var row = null;
        var i = 0;
        
        for (i; i < rows.length; i++) {
          row = rows[i];
          var flag = false;
          var obj = row.repObject;

          if (is_a_tree == true) {
          	var srow = selected_row.repObject;
          	
        	  if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorUtil.selectRow-obj: ", obj);
        	  if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorUtil.selectRow-srow: ", srow);
          	
        	  if (obj.summary && srow.summary && obj.summary == srow.summary) {
        	    this.highlight(row);
              flag = true;
        	  } else if (srow.cache_id && obj.filtered_rule_result && srow.cache_id == obj.filtered_rule_result.cache_id) {
        	    this.highlight(row);
              flag = true;
            } else if (obj.cache_item_result && srow.cache_item_result && 
          	    obj.cache_item_result.cache_item.toString() == srow.cache_item_result.cache_item.toString()
          				&& obj.cache_item_result.cache_item.document_order == srow.cache_item_result.cache_item.document_order) {
          			this.highlight(row);
          			flag = true;
        		} else {
        		  if (obj.rule_result && srow.rule_result && 
        		       obj.rule_result.cache_id == srow.rule_result.cache_id) {
        		    this.highlight(row);
        		    flag = true;
        		  } 
        		}
          } else { //flat list
            var citem = null;
            var sitem = null;
//            FBTrace.sysout("row: ", row);
//            FBTrace.sysout("selected_row:", selected_row);
            
//            citem = row.repObject.cache_item_result ? row.repObject.cache_item_result.cache_item : row.repObject.filtered_rule_result.cache_id;
            
            
            if (row.repObject.cache_item_result) citem = row.repObject.cache_item_result.cache_item;
            else if (row.repObject.filtered_rule_result) citem = row.repObject.filtered_rule_result.cache_id;
            else citem = row.repObject.rule_result.cache_id;
              
//            sitem = selected_row.repObject.cache_item_result ? selected_row.repObject.cache_item_result.cache_item : selected_row.repObject.filtered_rule_result.cache_id;
            
            if (selected_row.repObject.cache_item_result) sitem = selected_row.repObject.cache_item_result.cache_item;
            else if (selected_row.repObject.filtered_rule_result) sitem = selected_row.repObject.filtered_rule_result.cache_id;
            else sitem = selected_row.repObject.rule_result.cache_id;
            
//            FBTrace.sysout("citem: ", citem);
//            FBTrace.sysout("sitem:", sitem);
            
            if (typeof citem === 'object' && typeof sitem === 'object') {
              if (row.children[0].textContent == selected_row.children[0].textContent &&
                  (citem.document_order && citem.document_order == sitem.document_order)) {
               this.highlight(table.children[1].children[i]);
               flag = true;
               break; }
            } else {
              if(typeof citem === 'string' && typeof sitem === 'string' && citem == sitem) {
                  this.highlight(table.children[1].children[i]);
                  flag = true;
                  break; 
              }
            }
          } //end if-else for flat list
          
          if (flag) break;
        } //end FOR
        
      } else {
        if (AinspectorUtil.selectedView != view) {
          AinspectorUtil.selected_row = null;
          AinspectorUtil.selectedView = view;
        }
      }
    }
    
    /**
     * @function truncateText
     * 
     * @desc truncates text if the length is more than 60 characters
     * 
     * @param {String} text - text to truncate
     */
    AinspectorUtil.truncateText = function(text, max_text_length) {
      
//      var max_text_length = 60;
      var new_text = text.substring(0, max_text_length);
      
      if (text.length > max_text_length) new_text = new_text + "...";
      
      return new_text;
    }
    
    AinspectorUtil.sortColumn = function(table, column, order) {
      
      var colIndex = 0;
      if(!column) return;
      var numerical = !(Css.hasClass(column, "alphaValue"));
      
      if(FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("Ainspector; AinspectorUtil.sortColumn");
      for (column = column.previousElementSibling; column; ) {
        ++colIndex;
        column = column.previousElementSibling;
      }

      this.sort(table, colIndex, numerical, order);
    }
    
    AinspectorUtil.sort = function(table, colIndex, numerical, order) {
      
      var thead = table.firstChild;
      var headerRow = thead.firstChild;
      var tbody = table.lastChild;
      
      if(FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("Ainspector; AinspectorUtil.sort");
      // Remove class from the currently sorted column
      var headerSorted = Dom.getChildByClass(headerRow, "gridHeaderSorted");
      Css.removeClass(headerSorted, "gridHeaderSorted");
      
      if (headerSorted) headerSorted.removeAttribute("aria-sort");

      // Mark new column as sorted.
      var header = headerRow.childNodes[colIndex];
      
      Css.setClass(header, "gridHeaderSorted");
      
      // If the column is already using required sort order, bubble out.
      if ((order == "desc" && header.sorted == 1) || (order == "asc" && header.sorted == -1))  return;
      
      if (header) header.setAttribute("aria-sort", header.sorted === -1 ? "descending" : "ascending");
      
      var colID = header.getAttribute("id");
      // Store current state into the preferences.
      var headerID = headerRow.getAttribute("id");

      HeaderResizer.Preference.setPref(headerID + "sortCol", colID); 
      HeaderResizer.Preference.setPref(headerID + "sortDir", header.getAttribute("aria-sort")); 
      var values = [];
      
      for (var row = tbody.childNodes[0]; row; row = row.nextSibling) {
        var cell = row.childNodes[colIndex];
        var value = numerical ? parseFloat(cell.textContent) : cell.textContent;
        values.push({row: row, value: value});
      }

      values.sort(function(a, b) { return a.value < b.value ? -1 : 1; });

      if ((header.sorted && header.sorted == 1) || (!header.sorted && order == "asc")) {
        
        Css.removeClass(header, "sortedDescending");
        Css.setClass(header, "sortedAscending");
        
        header.sorted = -1;

        for (var i = 0; i < values.length; ++i) {
          tbody.appendChild(values[i].row);
        
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      } else {
        
        Css.removeClass(header, "sortedAscending");
        Css.setClass(header, "sortedDescending");
        header.sorted = 1;

        for (var i = values.length-1; i >= 0; --i) {
          tbody.appendChild(values[i].row);
          
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      }
    }
        
    AinspectorUtil.contextMenu = {
    
      /**
       * @function getContextMenuItems
       * 
       * @desc Creates Menu item for each header column in the panel
       */
      getContextMenuItems : function(object, target, context) {
      
        if (Css.hasClass(target, "gridCol")) {
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
    
    //   Iterate over all columns and create a menu item for each.
          var content = Firebug.currentContext.getPanel("ainspector", true).table;
          var table = Dom.getChildByClass(content, "ai-table-list-items");

          if (!table)
            table = Dom.getChildByClass(content, "domTable");

          var hiddenCols = table.getAttribute("hiddenCols");
          var lastVisibleIndex;
          var visibleColCount = 0;
    
    //   Iterate all columns except of the first one for breakpoints.
          var header = Dom.getAncestorByClass(target[1], "gridHeaderRow");
          var columns = Arr.cloneArray(header.childNodes);
          columns.shift();
      
          for (var i=0; i<columns.length; i++) {
            var column = columns[i];
            var columnContent = column.getElementsByClassName("gridHeaderCellBox").item(0);
            var visible = (hiddenCols.indexOf(column.id) == -1);
    
            var column_name = columnContent.textContent;
            	
            FBTrace.sysout("column_name: " + column_name);
            
            if (column_name == 'Rules' || column_name == 'Rules' || column_name == 'Required' || column_name == 'Level' 
            	|| column_name == 'V'  || column_name == 'Element' || column_name == 'goto') {
            } else {
              items.push({
                label: columnContent.textContent,
                tooltiptext: columnContent.title,
                type: "checkbox",
                checked: visible,
                nol10n: true,
                command: FBL.bindFixed(this.onShowColumn, this, context, column.id)
              });
            }
            if (visible) {
              lastVisibleIndex = i;
              visibleColCount++;
            }
          } //end for loop
    
    //    If the last column is visible, disable its menu item.
          if (visibleColCount == 1)
            items[lastVisibleIndex].disabled = true;
    
          items.push("-");
          items.push({
            label: "net.header.Reset_Header",
            tooltiptext: "net.header.tip.Reset_Header",
            command: FBL.bindFixed(this.onResetColumns, this, context)
          });
    
          return items;
        }
      },
        
      /**
       * @function onShowColumn
       */
      onShowColumn : function(context, colId) {
        var panel = Firebug.currentContext.getPanel("ainspector", true);
        var content = panel.table;
//        var table_div = getChildByClass(content, "table-scrollable");

        var table = Dom.getChildByClass(content, "ai-table-list-items");
         
        if (!table) table = Dom.getChildByClass(content, "domTable");
        var hiddenCols = table.getAttribute("hiddenCols");
//      If the column is already present in the list of hidden columns,
//      remove it, otherwise append it.
        var index = hiddenCols.indexOf(colId);
        if (index >= 0) {
          table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) + hiddenCols.substr(index+colId.length));
        } else {
          table.setAttribute("hiddenCols", hiddenCols + " " + colId);
        }

//      Store current state into the preferences.
        HeaderResizer.Preference.setPref("hiddenCols", table.getAttribute("hiddenCols"));
      },
               
      /**
       * @function onResetColumns
       */
      onResetColumns : function(context) {
       
        var panel = Firebug.currentContext.getPanel("ainspector"); //var panel = context.getPanel(panelName, true);
        var header = Dom.getElementByClass(panel.panelNode, "gridHeaderRow");
       
//        var content = Dom.getChildByClass(panel.table, "table-scrollable");
        var table = Dom.getChildByClass(panel.table, "ai-table-list-items");
       
        if (!table) table = Dom.getChildByClass(panel.table, "domTable");
//      Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++) {

          var col = columns[i];
          if (col.style) col.style.width = "";
        }

//      Reset visibility. Only the Status column is hidden by default.
        table.setAttribute("hiddenCols", "colStatus");
        HeaderResizer.Preference.setPref("hiddenCols", "colStatus");
      },
      
      /**
       * @function setTableMenuItems
       */
      setTableMenuItems : function(panel){
       
//        var table_div = getChildByClass(panel, "table-scrollable");
        var ai_table = Dom.getChildByClass(panel, "ai-table-list-items");
       
        if (!ai_table) ai_table = Dom.getChildByClass(panel, "domTable");
       
        if (!ai_table) return;
       
        var hiddenCols = ai_table.getAttribute("hiddencols");
        var preferences = AinspectorPreferences.getPreferences();

        if (preferences.show_results_pass == false) hiddenCols = hiddenCols  + " " + "gridPassCol";

        if (preferences.show_results_violations == false) hiddenCols = hiddenCols  + " " + "gridViolationCol";

//        if (preferences.show_results_element_manual_checks == false) hiddenCols = hiddenCols  + " " + "gridManualCheckCol";

        if (preferences.show_results_warnings == false) hiddenCols = hiddenCols  + " " + "gridWarningCol";

        if (preferences.show_results_hidden == false) hiddenCols = hiddenCols  + " " + "gridHiddenCol";
       
        ai_table.setAttribute("hiddencols", hiddenCols);

//      Store current state into the preferences.
        HeaderResizer.Preference.setPref("hiddenCols", ai_table.getAttribute("hiddenCols"));
       
      }
    };
    AinspectorUtil.isEmpty = function(object){
      for(var i in object){ return false;}
      return true;
    }
    Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
    
    with (Domplate) {
      
      AinspectorUtil.noDataView = domplate({
        
        tag:
          DIV({class:"main-panel"},
              SPAN({}, "$view"), 
              TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, hiddenCols: ""},
                THEAD(
                  TR({class: "gridHeaderRow firstRow gridRow", "aria-selected" : "false", tabindex: "-1"},
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
              )
             ), //end TABLE
             SPAN({style: "font-weight: bold;color: gray"}, "No " + "$view" + " data to present...")
            )
      });
    }
    
    
		return AinspectorUtil;
  } //end function
);