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

FBL.ns(function() { with (FBL) {

  var main_panel = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.elements.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.elements.title");
  
  /**
   * @function elementsSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function elementsSidePanel() {}
  
  elementsSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    
    /**
     * This panel is automatically used as a side-panel when parent panel is set.
     */
    parentPanel: main_panel,
    
    title: side_panel_title,
    order: 1,
    editable: true,

    /**
     * @constructor initialize
     *
     * @desc  
     *
     * @param {Object} context 
     * @param {Object} doc - document Object
     */
    initialize: function(context, doc) {
      
      this.onCLick = bind(this.setSelection, this);
      Firebug.Panel.initialize.apply(this, arguments);
    },

    /**
     * @constructor initializeNode
     * 
     * @desc
     * 
     * @param  oldPanelNode
     */
    initializeNode: function(oldPanelNode) {

      appendStylesheet(this.panelNode.ownerDocument, "chrome://selectbug/skin/selectbug.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector-side-panel.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/fonts-min.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/tabview.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/allyGrade.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/grid.css");

      this.setSelection = bind(this.setSelection, this);
      this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
      
      Firebug.Panel.initializeNode.apply(this, arguments);
   
    },
    
    /**
     * @function destroyNode
     * 
     * @desc removes the listeners from the main panel
     * called by Firebug Framework 
     */
    destroyNode: function() {
   
      this.mainPanel.panelNode.removeEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.removeEventListener("keypress", this.onKeyPress, false);
      
      Firebug.Panel.destroyNode.apply(this, arguments);
    },

    /**
     * @function show
     * 
     * @desc 
     * called by Firebug Framework
     */
    show: function() {
     
      Firebug.Panel.show.apply(this, arguments);
    },
     
     /**
      * @function sView
      * 
      * @param {Boolean} state
      * @param {Object} first_element
      */
    sView: function(state, first_element){
    
      if (state) {
      
        try {
        
          if (first_element.hasOwnProperty("dom_element")) result = first_element.dom_element;
         
          else result = first_element;
          
          rule_result_array = this.showOnRuleResultsTabSelect(result);

          //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
          this.rebuild(rule_result_array);
        } catch (er) {
        }
      } else {
      
        if (first_element == "none") this.rebuild("");   
      }
     
    },

    /**
     * @function setSelection
     * 
     * @desc
     * 
     * @param event
     */
    setSelection : function(event) {
      
      var rule_result_item = Firebug.getRepObject(event.target);
      
      if (!rule_result_item) return;
      
      var node_results = this.aggragateNodeResults(rule_result_item);
      
      this.rebuild(rule_result_item.getRuleSummary(), node_results);
    },
    
    /**
     * @function rebuild
     * 
     * @desc
     * 
     * @param resultArray
     */
    rebuild: function(rule_summary, node_results){
      
      if (node_reuslts.length > 0) elementsPlate.tag.replace({object: node_results, rule_summary: rule_summary}, this.panelNode);
      
      else AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({messg: "no node results", summary : rule_summary}, this.panelNode); 
    },
    
    /**
     * @function aggragateNodeResults
     */
    aggragateNodeResults : function(rule_result_item){
      
      var node_results = [];
      
      if (rule_result_item.node_results_passed){
        node_results.push(this.updateNodeResults(rule_result_item.node_results_passed));
      }
      if (rule_result_item.node_results_violations){
        node_results.push(this.updateNodeResults(rule_result_item.node_results_violations));

      }
      if (rule_result_item.node_results_warnings){
        node_results.push(this.updateNodeResults(rule_result_item.node_results_warnings));

      }
      if (rule_result_item.node_results_manual_checks){
        node_results.push(this.updateNodeResults(rule_result_item.node_results_manual_checks));

      }
      if (rule_result_item.node_results_hidden){
        node_results.push(this.updateNodeResults(rule_result_item.node_results_hidden));

      }
      
      return node_results;
      
    },
    
    /**
     * @function updateNodeResults
     */
    updateNodeResults : function(node_results){
      var node_results_array = [];
      
      for(var i = 0; i < node_results.length; i++) {
        node_results_array.push(node_results[i]);
      }
      
      return node_results_array;
    },
     
    showEmptySidePanel : function() {

      this.panelNode.id = "ainspector-side-panel";
      
      AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({messg: "no elements to select in the main panel"}, this.panelNode);
    },

    /**
     * setTrialSelector
     * 
     * @desc
     * 
     * @param target
     * @param value
     */
    setTrialSelector: function(target, value) {
        
      if (this.lockedElement) this.lockedElement.classList.remove("lockedSelectorRule");
       
      this.trialSelector = value;
      this.selection = this.trialSelector;
      this.lockedElement = target;
      this.lockedSelection = this.selection;
      this.rebuild();
    }
    
  });

  var elementsPlate = domplate(AINSPECTOR_FB.BaseRep, {
    
    tag:
      
      DIV({class: "side-panel"},
        DIV({class: "eval-results"}, "$rule_summary"),
        TABLE({class: "domTree domTable ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
         tabindex: "0", onkeypress: "$onKeyPressedRow"},
         THEAD(
          TR({class: "gridHeaderRow", id: "tableTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false"},
            TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result")),
            TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Element"))
          ) //end TR
        ), //end THEAD
        TBODY(
//          FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
            TR({},
                TD("Hello"),
                TD("world")
                ),
                TR({},
                    TD("Hello world"),
                    TD("world")
                )
        ) //end TBODY
      ),
//      BUTTON({class: "more-info", onclick: "$showMoreProperties", id: "rule_info_button"}, "Rule Information"),
      DIV({class: "notificationButton-rule"},
        BUTTON({onclick: "$showMoreProperties"}, "Rule Information"),
        BUTTON({onclick: "$getElementInformation", style: "margin: 0.5em;"}, "Element Information")
      )
    ),
    

    /**
     * @function showMoreProperties
     * 
     * @desc respond to "Rule Information" button
     *
     * @param {Object} event - event triggered when clicked on "More Information on Rule" button
     */
    showMoreProperties : function(event) {
      
      var tree = getAncestorByClass(event.target, "side-panel");
      var table = getChildByClass(tree, "ai-sidepanel-table");
//      var table = tree.children[1];
      var tbody = table.children[1];
      
      var rows = tbody.children;
      
      var row;
      
      var flag = false;
      
      for (var i=0; i<rows.length; i++) {
        
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
      if (row) {
        window.openDialog("chrome://ainspector/content/rule_properties/rule-properties.xul", "_rule_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject.rule_result);      
      } else {
        alert("please select a row in the side panel");
//        win.document.write("<p>This is 'myWindow'</p>");
      }
    },
    
    /**
     * @function getElementInformation
     * 
     * @desc calls a utility that opens a xul window for more properties of the element selected in the panel
     * 
     * @param {Object} event - event triggered when clicked on Element Information button
     */
    getElementInformation : function(event) {
      FBTrace.sysout("event.target: ", event.target);
//      var tree = getAncestorByClass(event.target, "side-panel");
//      var table = getChildByClass(tree, "ai-sidepanel-table");
      
      var main_panel = Firebug.currentContext.getPanel("AInspector");
      
      var table_container = getChildByClass(main_panel.table, "table-scrollable"); 
      var table = getChildByClass(table_container, "ai-table-list-items");
      
//      var table = tree.children[1];
      var tbody = table.children[1];
      
      var rows = tbody.children;
      
      var row;
      
      var flag = false;
      
      for (var i=0; i<rows.length; i++) {
        
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
        } else {
          
        }
      }

      FBTrace.sysout("row: ", row);
      window.openDialog("chrome://ainspector/content/item_properties/cache-item-properties.xul", "cache_item_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject.cache_item);
    },
      
    /**
     * @function onClick
     */
    onClick: function(event) {
          
      if (!isLeftClick(event)) return;

      var row = getAncestorByClass(event.target, "treeRow");
      var label = getAncestorByClass(event.target, "treeLabel");
    
      if (label && hasClass(row, "hasChildren")) this.toggleRow(row);
    },
    
        onKeyPressedTable: function(event) {
    
      switch(event.keyCode) {
          
        case 39: //right
              event.stopPropagation();
              event.preventDefault();
              var label = findNextDown(event.target, this.isTreeRow);
              label.focus();
              break;
        }
      },


    /**
     * @function onKeyPressedRow
     * 
     * @desc
     * 
     * @param {Object} event
     */
    onKeyPressedRow: function(event) {
        
      event.stopPropagation();
      FBTrace.sysout("event.target: ", event.target);

      switch(event.keyCode) {
          case KeyEvent.DOM_VK_LEFT: //left
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");
            
            if (hasClass(row, "opened")) { // if open
              this.closeRow(row); // close
            } else {
              var table = getAncestorByClass(event.target, "domTable");
              table.focus(); // focus parent;
            }
            break;
          
          case KeyEvent.DOM_VK_UP: //up
            event.preventDefault();
            var table = getAncestorByClass(event.target, "domTable");

            FBTrace.sysout("table in tree up direction..................: ", table);

            var row = findPrevious(event.target, this.isTreeRow, false);
            FBTrace.sysout("row: ", row);
            if (row) {
              AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
            } else {  
              if (event.target.rowIndex == '1') row = table.rows[0];
            }
            row.focus();
            break;
            
          case KeyEvent.DOM_VK_RIGHT: //right
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");

            if (hasClass(row, "hasChildren")) this.openRow(row);
            break;
            
          case KeyEvent.DOM_VK_DOWN: //down
            event.preventDefault();
            var table = getAncestorByClass(event.target, "domTable");

            FBTrace.sysout("table in tree: ", table);
            var row = findNext(event.target, this.isTreeRow, false);
            FBTrace.sysout("row: ", row);

            if (row) row.focus();

            //If the event is fired on header row, rowIndex check is made to make sure header row is not highlight.
            if (!event.target.rowIndex == '0') AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
            break;
            
          case KeyEvent.DOM_VK_ENTER: //Enter
            event.preventDefault();
            var links = event.target.getElementsByClassName('objectLink');
          
            if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'click');
          break;
        }
      },
    
      
    
    /**
     * @function highlightRow
     * 
     * @desc highlights the selected row in a side panel
     * 
     * @param {Object} event - event triggered when a row is selected in a side panel 
     */
    highlightRow : function(event) {

      FBTrace.sysout("highlightRow: ", event);
      var table = getAncestorByClass(event.target, "ai-sidepanel-table");
      var row = getAncestorByClass(event.target, "treeRow");
      FBTrace.sysout("table: ", table);
      FBTrace.sysout("row: ", row);
      AINSPECTOR_FB.flatListTemplateUtil.unHighlight(table);
      AINSPECTOR_FB.flatListTemplateUtil.highlight(row);
    }
    
  });

  Firebug.registerPanel(elementsSidePanel);

}});
