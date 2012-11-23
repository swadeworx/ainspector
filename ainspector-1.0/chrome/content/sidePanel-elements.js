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
    node_results_array : [],

    /**
     * @constructor initialize
     *
     * @desc  
     *
     * @param {Object} context 
     * @param {Object} doc - document Object
     */
    initialize: function(context, doc) {
      
      this.onKeyPress = bind(this.onKeyPress, this);
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
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector-side-panel.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/fonts-min.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/tabview.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/allyGrade.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/grid.css");

      this.setSelection = bind(this.setSelection, this);
      this.onKeyPress = bind(this.onKeyPress, this);
      this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
      
      Firebug.Panel.initializeNode.apply(this, arguments);
   
    },
    
    /**
     * @function onKeyPress
     * 
     * @desc
     * 
     * @param event
     */
    onKeyPress: function(event) {
    
      var current_row;
      var next_row;
      var previous_row;
      var prev_cell;
      var next_cell;
      
      var table_rows = event.target.offsetParent.rows;

      if (!table_rows) return;
      
      var no_of_rows = table_rows.length;
      var flag = false;
      var is_header_row = false;
      
      for (var row=0; row < no_of_rows; row++) {
      
        var class_list = table_rows[row].classList;
        var class_name_it = 0;
       
        for (class_name_it; class_name_it < class_list.length; class_name_it++) {
        
          if (class_list[class_name_it] == "gridRowSelected") {
            flag = true;
            break;
          }   
        }
        
        if (flag == true){
          current_row = table_rows[row];
          FBTrace.sysout();
          if (row < no_of_rows) {
           
//            if (row == 1) previous_row = table_rows[no_of_rows-1];
           
//            else
              previous_row = table_rows[row-1];
           
            next_row = table_rows[row+1];
          
          } else { //if we reach end of the table row then go back to first row
            next_row = table_rows[1]; //table_rows[0] is the header row
            previous_row = table_rows[row-1];
          }
          
          break;
        } else {
          continue;
        }
      } //end for
      
      var rule_result_objet = null;
      var rule = null;
      
      if (event.keyCode == KeyEvent.DOM_VK_UP) {
      
        result = previous_row.repObject;
        rule = result.rule_result.rule.getNLSRuleId() + ': ' + result.rule_result.getRuleSummary();
        
        if (result) {
          rule_result_objet = this.rebuild(rule, result.filtered_node_results);
        
        } else {
          var headers = ["Result/Property", "Message/Value"];
          AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: headers, messg: "please select an element row in the left panel", desc: "Evaluation Results By Rule"}, this.panelNode);
        }  
        
      } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
        
        FBTrace.sysout("next_row: ", next_row);
        result = next_row.repObject;
        FBTrace.sysout("cache_item: ", result);
        rule = result.rule_result.rule.getNLSRuleId() + ': ' + result.rule_result.getRuleSummary();
        
        this.rebuild(rule, result.filtered_node_results);
       
      } else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
        this.setSelection(event);
     
      } else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
        this.setSelection(event);
     
      } else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
     
        this.deleteNode("node", "up");

      } else if (event.keyCode == KeyEvent.DOM_VK_DELETE) {
        this.deleteNode("node", "down");
       
      } else {
        return;
      }     
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
     * @function updateSelection
     * 
     * @desc
     */
    updateSelection : function() {
    
      var selected_summary_row = this.mainPanel.selected_summary_row;
      
      if (!selected_summary_row) return;
      FBTrace.sysout("selected_summary_row: ", selected_summary_row);
       var rule = selected_summary_row.rule_result.rule.getNLSRuleId() + ': ' + selected_summary_row.rule_result.getRuleSummary();
       this.rebuild(rule, selected_summary_row.filtered_node_results);
    },
    
   /**
    * @function sView
    * 
    * @param {Boolean} state
    * @param {Object} first_element
    */
    sView: function(state, first_element){
    
      var rule = '';
      if (state) {
      
        try {
          if (!first_element) return;
          
          if (first_element.rule_result) {
            rule = first_element.rule_result.rule.getNLSRuleId() + ': ' + first_element.rule_result.getRuleSummary();
            this.rebuild(rule, first_element.filtered_node_results);
          } else {
            AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: ["Result", "Element"], messg: "select a rule", desc: 'Evaluation Results By Rule'}, this.panelNode);
          }
          
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
      this.node_results_array = [];
      
      if (!rule_result_item) return;
      FBTrace.sysout("rule_result_item: ", rule_result_item);
      var rule = '';
      
      if (rule_result_item.filtered_node_results) {
        rule = rule_result_item.rule_result.rule.getNLSRuleId() + ': ' + rule_result_item.rule_result.getRuleSummary();
        this.rebuild(rule, rule_result_item.filtered_node_results);
      } else {
        AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: ["Result", "Element"], messg: "no rule selected", desc: 'Evaluation Results By Rule'}, this.panelNode);
      }
    },
    
    /**
     * @function rebuild
     * 
     * @desc
     * 
     * @param resultArray
     */
    rebuild: function(rule_summary, filtered_node_results){
      this.panelNode.id = "ainspector-side-panel";
      
      FBTrace.sysout("filtered node results: ", filtered_node_results);
      
      if (filtered_node_results.length > 0) {
        elementsPlate.tag.replace({object: filtered_node_results, rule_summary: rule_summary}, this.panelNode);
        FBTrace.sysout("this.panelNode: ", this.panelNode);
      } else {
        var headers = ["Result", "Element"];
        AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: headers, messg: "no node results", desc: rule_summary}, this.panelNode);
      }
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
        DIV({class: "element-select"}, "$rule_summary"),
        TABLE({class: "domTree domTable ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
         tabindex: "0"},
          THEAD(
            TR({class: "gridHeaderRow", id: "tableTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false"},
              TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result")),
              TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
              TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Goto")),
              TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "More Info"))
            ) //end TR
          ), //end THEAD
          TBODY(
            FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
          ) //end TBODY
        )
      ),
    
      row:
      
        TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
         "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex", onclick: "$highlightRow"},
          
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
            TAG("$member.severity_label_style", {'member' :"$member", 'object': "$member"}) 
          ),
          TD({class: "memberLabelCell styleAction"}, "$member.tag_name"),
          TD({class: "gridCol", role: "gridcell"},
            DIV({class: "gridContent resultAlign"}, 
              BUTTON({onclick: "$gotoHTML", id: "html_panel_button", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.htmlButtonPress"}, "HTML"))
          ),
          TD({class: "gridCol", role: "gridcell"},
            DIV({class: "gridContent resultAlign"}, 
              BUTTON({onclick: "$getElementInformation"}, "more info"))
          )
      ),
      
    childrow :
      
      TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
        "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex", onclick: "$highlightRow"},
        TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
        "$member.propertyLabel"
        ),
        TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.propertyValue")
      ),
    
    strTagPass : DIV({class: "treeLabel passMsgTxt"}, "$member.severityLabel"),
    strTagViolation : DIV({class: "treeLabel violationMsgTxt"}, "$member.severityLabel"),
    strTagManual : DIV({class: "treeLabel manualMsgTxt"}, "$member.severityLabel"),
    strTagHidden : DIV({class: "treeLabel hiddenMsgTxt"}, "$member.severityLabel"),
    strTagWarn : DIV({class: "treeLabel warnMsgTxt"}, "$member.severityLabel"),
    stylePropTag: DIV({class: "styleLabel"}, "none"),
    
    loop:
      FOR("member", "$members", TAG("$childrow", {member: "$member"})),
      
    /**
     * @function onClick
     */
    onClick: function(event) {
          
      if (!isLeftClick(event)) return;

      var row = getAncestorByClass(event.target, "treeRow");
      var label = getAncestorByClass(event.target, "treeLabel");
    
      if (label && hasClass(row, "hasChildren")) this.toggleRow(row);
    },
    
    gotoHTML : function(event){

      var row = getAncestorByClass(event.target, "treeRow");
      
      var object = Firebug.getRepObject(event.target);
      FBTrace.sysout("AINSPECTOR_FB.elementsSidePanel.gotoHTML() - ", object);
      var cache_item = null;
      var node = null;
      
      if (object.cache_item) {
        cache_item = object.cache_item;
      } else {
        if (object.dom_text_nodes) return;
        if (object.parent_element) cache_item = object.parent_element.node;
      }
      AINSPECTOR_FB.previous_selected_row = row;
      
      if (cache_item.dom_element) node = cache_item.dom_element.node;
      else node = cache_item.node;
      
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
      
    },
    
    /**
     * @function memberIterator
     * 
     * @desc invokes getMembers function to iterate through the rule results
     * 
     * @param {Object} object -
     */
    memberIterator: function(object) {
      return this.getMembers(object);
    },
    
    /**
     * @function getMembers
     * 
     * @desc
     * 
     * @param elements - 
     */
    getMembers : function(object, level) {
      var members = [];
      if (!level) level = 0;
      for (var p in object) members.push(this.createMembers(p, object[p], level));
      
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
    createMembers : function(key, object, level){
      
      var ct = parseInt(key) + 1;
      if (level !=0) { //if it is child
                
        return {
          propertyLabel:object.label,
          propertyValue:object.value,
          value: object,
          level: level,
          indent: level * 16

        };
      } else {
        return {
          tag_name: 'element ' + ct + ': '+ this.getElement(object),
          severity_label_style : this.getSeverityLabel(object),
          severityLabel : object.getNLSSeverityLabel(),
          hasChildren: this.hasChildren(object),
          children: object.getRuleProperties(),
          value: object,
          level: level,
          indent: level * 16
        };
      }
    },
    
    getSeverityLabel : function(object){
      
      var severity_label = object.getNLSSeverityLabel();
    
      if (severity_label == 'Warning') return this.strTagWarn;
      
      if (severity_label == 'Manual Check') return this.strTagManual;
      
      if (severity_label == 'Pass') return this.strTagPass;
      
      if (severity_label == 'Hidden') return this.strTagHidden;
      
      if (severity_label == 'Violation') return this.strTagViolation;

//    return object.getNLSSeverityLabel();
    },
    
    getElement : function(object) {
      
      var tag_name = object.cache_item.toString();
      
      return AINSPECTOR_FB.ainspectorUtil.truncateText(tag_name);
      
    },
    
    hasChildren : function(object){
      
      var properties = object.getRuleProperties();
      
      var length = properties.length;
      
      if (length > 0) return true;
      
      else return false;
    
    },
    
    /**
     * @function closeRow
     */
    closeRow: function(row) {
  
      if (hasClass(row, "opened")) {
        var level = parseInt(row.getAttribute("level"));
        
        removeClass(row, "opened");
        
        var tbody = row.parentNode;
      
        for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling) {
        
          if (parseInt(firstRow.getAttribute("level")) <= level) break;
          tbody.removeChild(firstRow);
        }
      }
    },

    /**
     * @function openRow
     */
    openRow: function(row) {
  
      if (!hasClass(row, "opened")) {
        var level = parseInt(row.getAttribute("level"));
        setClass(row, "opened");
        var repObject = row.newObject;
        FBTrace.sysout("repobject: ", repObject);
        FBTrace.sysout("level: "+ level);

        if (repObject) {
          var members = this.getMembers(repObject.children, level+1);
      
          if (members) this.loop.insertRows({members: members}, row);
      }
    }
  },
  
  /**
   * @function toggleRow
   */
  toggleRow: function(row) {
    
    if (hasClass(row, "opened")) {
      this.closeRow(row);
    } else {
      this.openRow(row);
    }
  },

    /**
     * @function showMoreProperties
     * 
     * @desc respond to "Rule Information" button
     *
     * @param {Object} event - event triggered when clicked on "More Information on Rule" button
     */
    showMoreProperties : function(event) {
      
    var main_panel = Firebug.currentContext.getPanel("AInspector");
      
    var table_container = getChildByClass(main_panel.table, "table-scrollable"); 
    var table = getChildByClass(table_container, "ai-table-list-items");
      
      
//      var tree = getAncestorByClass(event.target, "side-panel");
//      var table = getChildByClass(tree, "ai-sidepanel-table");
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
        AINSPECTOR_FB.rule_info_dialog = window.openDialog("chrome://firebug-a11y/content/rule_properties/rule-properties.xul", "_rule_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject.rule_result);      
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
      FBTrace.sysout("event.target ccccccc: ", event.target);
      /*var tree = getAncestorByClass(event.target, "side-panel");
      var table = getChildByClass(tree, "ai-sidepanel-table");
      
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
      }*/
      row = Firebug.getRepObject(event.target);
      FBTrace.sysout("row in sidepanel: ", row);
      AINSPECTOR_FB.element_info_dialog = window.openDialog("chrome://firebug-a11y/content/item_properties/cache-item-properties.xul", "cache_item_properties_dialog", "chrome,contentscreen,resizable=yes", row.cache_item);
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
      
      if (AINSPECTOR_FB.element_info_dialog) {
        AINSPECTOR_FB.element_info_dialog.cache_item_properties.update(row.repObject.cache_item);
        AINSPECTOR_FB.element_info_dialog.focus();
      }
    }
    
  });

  Firebug.registerPanel(elementsSidePanel);

}});