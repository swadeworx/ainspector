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
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.title");
  
  /**
   * @function rulesSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function rulesSidePanel() {}
  
  rulesSidePanel.prototype = extend(Firebug.Panel, {
    
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
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector-side-panel.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/fonts-min.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/tabview.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/allyGrade.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/grid.css");

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
      FBTrace.sysout("AINSPECTOR_FB.RulesSidePanel.onkeyPress- event: ", event);
      FBTrace.sysout("table_rows: ", table_rows);
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
      
      if (event.keyCode == KeyEvent.DOM_VK_UP) {
      
        result = previous_row.repObject;
        if (result.dom_element) rule_result_objet = this.showOnRuleResultsTabSelect(result.dom_element);
        else if(result) rule_result_objet = this.showOnRuleResultsTabSelect(result);
        else AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({messg: "please select an element row in the left panel"}, this.panelNode);
        if (rule_result_objet) this.rebuild(rule_result_objet);
      
      } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
        
        FBTrace.sysout("next_row: ", next_row);
        result = next_row.repObject;
        FBTrace.sysout("cache_item: ", result);
        
        if (result.dom_element) rule_result_objet = this.showOnRuleResultsTabSelect(result.dom_element);
        else rule_result_objet = this.showOnRuleResultsTabSelect(result);
       
        this.rebuild(rule_result_objet);

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
    
      var selection = this.mainPanel.selection;
      var dom_element = selection.dom_element; 
      
      if (dom_element)
       this.rebuild(this.showOnRuleResultsTabSelect(dom_element));
      else 
       this.rebuild(this.showOnRuleResultsTabSelect(selection.value));
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
     * @function showContrastOrAllElements
     * 
     * @desc
     * 
     * @param {Boolean} state
     * @param {Object} element
     */
    showContrastOrAllElements: function(state, element){
    
      if (state) {
      
        try {
        
          rule_result_array = this.showOnRuleResultsTabSelect(element);
          
          //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
          this.rebuild(rule_result_array);
        } catch (er) {
           
        }
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
   
      var element = Firebug.getRepObject(event.target);
      
      if (!element) return;
      
      try {
      
        if (element.dom_element) this.rebuild(this.showOnRuleResultsTabSelect(element.dom_element));
       
//      else if (element.value.dom_element) this.rebuild(this.showOnRuleResultsTabSelect(element.value.dom_element));
//      else if (element.value) this.rebuild(this.showOnRuleResultsTabSelect(element.value)); //for colorcontrast
       
        else this.rebuild(this.showOnRuleResultsTabSelect(element));
       
      } catch(e) {
         
      }
    },
     
    /**
     * @function showOnRuleResultsTabSelect
     * 
     * @desc
     * 
     * @param {Object} cache_item
     */
    showOnRuleResultsTabSelect : function(cache_item) {
       
      var cache_item = cache_item;
      var rule_results = cache_item.node_results;
      
      var rule_result_array = new Array();

      for (var i=0; i<rule_results.length; i++) {
        rule_result_array.push(rule_results[i]);
        var nResult = rule_results[i];
//        FBTrace.sysout("sev label: ", nResult.getNLSSeverityLabel());
//        FBTrace.sysout("sev style: ", nResult.getSeverityStyle());
//        FBTrace.sysout("rule is: ", nResult.getRule());
      }
      
      var result_obj = {
          cache_item : cache_item.cache_item,
          rule_result_array : rule_result_array
      };
      
      return result_obj;
       
    },
    
    /**
     * @function rebuild
     * 
     * @desc
     * 
     * @param resultArray
     */
    rebuild: function(resultObject){
    
      this.panelNode.id = "ainspector-side-panel";
      var cache_item = resultObject.cache_item;
      FBTrace.sysout("rebuild() -cache_item :", cache_item);
      var element = "Element" + cache_item.document_order + ": " + cache_item.toString();
      
      FBTrace.sysout("element: ", element);
      
      if (resultObject.rule_result_array.length > 0) rulesPlate.tag.replace({object: resultObject.rule_result_array, element: element}, this.panelNode);
      
      else AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({messg: "no rule results"}, this.panelNode);
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
    },

    /**
     * showTrialSelector
     * 
     * @desc
     * 
     * @param trailSelector
     */
    showTrialSelector: function(trialSelector) {
        
      var show = trialSelector ? true : false;
      collapse($('trialHint', this.document), show);
      var trialSelectorDiv = $('trialSelector', this.document);
      trialSelectorDiv.textContent = trialSelector;
      collapse(trialSelectorDiv, !show);
    }
    
  });

  var rulesPlate = domplate(AINSPECTOR_FB.BaseRep, {
    
    tag:
      
      DIV({class: "side-panel"},
        DIV({class: "eval-results"}, "Evaluation Results By Rule"),
        DIV({class: "element-select"}, "$element"),
        TABLE({class: "domTree domTable ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
         tabindex: "0", onkeypress: "$onKeyPressedRow"},
         THEAD(
          TR({class: "gridHeaderRow", id: "tableTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false"},
            TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result/Property")),
            TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Message/Value"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
        ) //end TBODY
      ),
//      BUTTON({class: "more-info", onclick: "$showMoreProperties", id: "rule_info_button"}, "Rule Information"),
      DIV({class: "notificationButton-rule"},
        BUTTON({onclick: "$showMoreProperties"}, "Rule Information"),
        BUTTON({onclick: "$getElementInformation", style: "margin: 0.5em;"}, "Element Information")
      )
    ),
    
    row:
      
      TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
        "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex", onclick: "$highlightRow"},
        TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
          TAG("$member.tag", {'member' :"$member", 'object': "$member"}) 
        ),
        TD({class: "memberLabelCell styleAction"}, "$member.action")
      ),
      
    childrow :
      
      TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
        "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex", onclick: "$highlightRow"},
        TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
        "$member.propertyLabel"
        ),
        TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.propertyValue")
      ),
    
    strTagPass : DIV({class: "treeLabel passMsgTxt"}, "$member.label"),
    strTagViolation : DIV({class: "treeLabel violationMsgTxt"}, "$member.label"),
    strTagManual : DIV({class: "treeLabel manualMsgTxt"}, "$member.label"),
    strTagHidden : DIV({class: "treeLabel hiddenMsgTxt"}, "$member.label"),
    strTagRecommendation : DIV({class: "treeLabel recommendationMsgTxt"}, "$member.label"),
    strTagInfo : DIV({class: "treeLabel infoMsgTxt"}, "$member.label"),
    strTagWarn : DIV({class: "treeLabel warnMsgTxt"}, "$member.label"),
    
    stylePropTag: DIV({class: "styleLabel"}, "none"),
      
    loop:
      FOR("member", "$members", TAG("$childrow", {member: "$member"})),

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
     * @desc iterates through the rule results
     * 
     * @param {Object} object -
     * @param {Number} level  - 
     */
    getMembers: function(object, level) {
        
      var members = [];
    
      if (!level) level = 0;

      for (var p in object) members.push(this.createMember(p, object[p], level));
      
      return members;
    },

    /**
     * @function createMember
     * 
     * @desc creates the object to setup
     */
    createMember: function(name, value, level)  {
      
      if (level !=0) { //if it is child
          
        return {
          propertyLabel:value.label,
          propertyValue:value.value,
          value: (value != null) ? value : "",
          level: level,
          indent: level * 16

        };
      } else {
//        FBTrace.sysout("value.label:"+ value.getMessage());

      }
      return {
        label: value.getNLSSeverityLabel(),  
        action: value.getMessage(),
          
          hasChildren: this.hasChildren(value),
          children: value.getRuleProperties(),
          value: (value != null) ? value : "",
          level: level,
          indent: level * 16,
          tag: this.getAccessibility(value)
      };
    },
    
    hasChildren : function(object){
     
      var properties = object.getRuleProperties();
      
      var length = properties.length;
      
      if (length > 0) return true;
      
      else return false;
    
    },
    
    getNoOfElements : function (object) {
     
      if (object.hasOwnProperty("dom_text_nodes")) return object.dom_text_nodes.length;
      
      else return "";
    },
    
    /**
     * @function getAccessiblity
     * 
     * @desc changes the color according to the severity
     * 
     * @param {Object}  
     */
    getAccessibility : function(object){
    
      var severity =  object.getNLSSeverityLabel();
      
      if (severity == "Pass")  return this.strTagPass;
    
      if (severity == "Violation") return this.strTagViolation;
    
      if (severity == "Manual Check") return this.strTagManual;
    
      if (severity == "Hidden") return this.strTagHidden;
    
      if (severity == "Recommendation") return this.strTagRecommendation;
    
      if (severity == "Information") return this.strTagInfo;
    
      if (severity == "Warning") return this.strTagWarn;
    
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
     * @function isTreeRow
     */
    isTreeRow: function(node) {
    
      return hasClass(node, "treeRow");
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
      
      FBTrace.sysout("inside toggle row: ", row);
      
      if (hasClass(row, "opened")) {
        this.closeRow(row);
      } else {
        this.openRow(row);
      }
    },
    
    /**
     * @function getPropertyStyle
     */
    getPropertyStyle : function(property) {
      
      if (property == undefined || property == null) return this.stylePropTag;
      
      else return property;
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

  Firebug.registerPanel(rulesSidePanel);

}});
