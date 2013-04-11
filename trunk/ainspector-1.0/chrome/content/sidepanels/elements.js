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
    "firebug/lib/domplate",
    "firebug/lib/events",
    "firebug/lib/dom",
    "firebug/lib/css",
    "ainspector/ainspectorUtil",
    "ainspector/sidePanelUtil"
],
function(Obj, FBTrace, Locale, Domplate, Events, Dom, Css, AinspectorUtil, SidePanelUtil) {

var panelName = "elements";

Firebug.ElementsSidePanel = function ElementsSidePanel() {};
Firebug.ElementsSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Elements",
  parentPanel: "ainspector",
  order: 1,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);
    this.onClick = Obj.bind(this.setSelection, this);
    this.onKeyPress = Obj.bind(this.onKeyPress, this);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; ElementsSidePanel.initialize");

    // TODO: Panel initialization (there is one panel instance per browser tab)

  },


  initializeNode: function(oldPanelNode) {
    this.setSelection = Obj.bind(this.setSelection, this);
    this.onKeyPress = Obj.bind(this.onKeyPress, this);

    this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
    this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);

    Firebug.Panel.initializeNode.apply(this, arguments);
  },

  destroyNode: function() {
    Firebug.Panel.destroyNode.apply(this, arguments);
  },

  destroy: function(state) {
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.show");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },
  
  onKeyPressOld : function(event) {

    if (Firebug.chrome.getSelectedSidePanel().name != panelName) return;

    FBTrace.sysout("AInspector; ElementsSidePanel.onKeyPress: ", event);
    
    switch(event.keyCode) {                
    
    case KeyEvent.DOM_VK_LEFT: //             
    case KeyEvent.DOM_VK_UP: //up         
    case KeyEvent.DOM_VK_RIGHT: //right      
    case KeyEvent.DOM_VK_DOWN: //down 
      var all_rows = event.target.rows ? event.target.rows : event.target.offsetParent.rows;
      
      var key = event.keyCode;     
      var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
      var backward = key == KeyEvent.DOM_VK_LEFT || key == KeyEvent.DOM_VK_UP; 
      
      var object;
      var flag = false;
      for (var i=0; i < all_rows.length; i++) {
       
        if (Css.hasClass(all_rows[i], "gridRowSelected")) {
          
          FBTrace.sysout("all_rows[i]: ", all_rows[i]);
          object = forward ? all_rows[i+1].repObject : all_rows[i-1].repObject;   
          this.updateSelection(object, this.panelNode);
          break;
        } else { // if enters first time in to the grid
          if (i == all_rows.length-1 && flag == false) {
            FBTrace.sysout("AInspector; no grid row is selected: ", all_rows[i]);
            this.updateSelection(all_rows[i].repObject, this.panelNode);
            break;
          }
        }
      }
      
    case KeyEvent.DOM_VK_TAB:
      break;
    }
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

        if (row < no_of_rows) {
         
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
      this.updateSelection(result, this.panelNode); 
      
    } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
      
      result = next_row.repObject;
      
      this.updateSelection(result, this.panelNode);
     
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

  setSelection : function(event){
    
    var rule_result_item = Firebug.getRepObject(event.target);
    
    this.node_results_array = [];
    if (!rule_result_item) return;

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; ElementsSidePanel.setSelection-rule_result_item", rule_result_item);

    this.updateSelection(rule_result_item, this.panelNode);
    
  },
  
  updateSelection : function (rule_result_item, parentNode) {
    
    var rule_result_mesg = '';
    var filtered_rule_result = rule_result_item.filtered_rule_result;
    
    if (filtered_rule_result) {
    	if ( filtered_rule_result.rule_result) rule_result_mesg = filtered_rule_result.rule_result.getMessage();
      
      if (FBTrace.DBG_AINSPECTOR)
      	FBTrace.sysout("AINspector; filtered_rule_result: ", filtered_rule_result);
      
      if (filtered_rule_result.filtered_node_results && filtered_rule_result.filtered_node_results.length > 0) this.rebuild(rule_result_mesg, filtered_rule_result.filtered_node_results, parentNode);
      else SidePanelUtil.commonTemplate.noResultsTag.replace({}, parentNode);	
    } else {
    	if (rule_result_item.filtered_rule_group_result) SidePanelUtil.commonTemplate.selectTag.replace({message: Locale.$STR("ainspector.sidepanel.wcag.selectRow")}, parentNode);
    }
    
    
  },
  
  rebuild : function(rule_summary, filtered_node_results, parentNode) {
    
    if (!this.panelNode) this.panelNode = parentNode; 
      
    this.panelNode.id = "ainspector-side-panel";
    
    if (filtered_node_results.length > 0) {
      this.elementsTemplate.tag.replace({object: filtered_node_results, rule_summary: rule_summary}, this.panelNode);
    } 
  },
  
  getPanelViewMesg : function(panelNode, mesg) {
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("getPanelViewMesg: ", panelNode);
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");
    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, panelNode);
  }
});

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-sidepanels.css");
/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
with (Domplate) {
  Firebug.ElementsSidePanel.prototype.elementsTemplate = domplate({
    tag:
      DIV({class: "side-panel"},
        DIV({class: "element-select"}, "$rule_summary"),
          TABLE({class: "domTree domTable ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
            THEAD(
              TR({class: "gridHeaderRow", id: "tableTableHeader"},
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result")),
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox", title: "show the element in the HTML panel"}, "Goto"))
//                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox", title: "show more information on the element selected"}, "More Info"))
              ) //end TR
            ), //end THEAD
            TBODY(
              FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
            ) //end TBODY
          )//end TABLE
        ),
        
        row:
          
          TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", level: "$member.level",
           _newObject: "$member", _repObject: "$member.value", onclick: "$highlightRow"},
            
            TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
              TAG("$member.severity_label_style", {'member' :"$member", 'object': "$member"}) 
            ),
            TD({class: "memberLabelCell styleAction"}, "$member.tag_name"),
            TD({class: "gridCol", role: "gridcell"},
              DIV({class: "gridContent resultAlign"}, 
                BUTTON({onclick: "$gotoHTML", id: "html_panel_button"}, "HTML"))
            )
        ),
        
      childrow :
        
        TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
         onclick: "$highlightRow"},
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
          "$member.propertyLabel"
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.propertyValue")
        ),
        
        selectTag :
          DIV({class: "element-select", style:"color:gray;"}, Locale.$STR("ainspector.sidepanel.wcag.selectRow")),
        
        strTagPass : DIV({class: "treeLabel passMsgTxt"}, "$member.severityLabel"),
        strTagViolation : DIV({class: "treeLabel violationMsgTxt"}, "$member.severityLabel"),
        strTagManual : DIV({class: "treeLabel manualMsgTxt"}, "$member.severityLabel"),
        strTagHidden : DIV({class: "treeLabel hiddenMsgTxt"}, "$member.severityLabel"),
        strTagWarn : DIV({class: "treeLabel warnMsgTxt"}, "$member.severityLabel"),
        stylePropTag: DIV({class: "styleLabel"}, "none"),
        
        loop:
          FOR("member", "$members", TAG("$childrow", {member: "$member"})),
        
        onClick : function (event){
        
          if (!Events.isLeftClick(event)) return;

          var row = Dom.getAncestorByClass(event.target, "treeRow");
          var label = Dom.getAncestorByClass(event.target, "treeLabel");
        
          if (label && Css.hasClass(row, "hasChildren")) this.toggleRow(row);
        },
        
        gotoHTML : function(event){
          
          AinspectorUtil.toHTMLPanel(event);
        },
        
        memberIterator : function(object) {
          
          return this.getMembers(object);
        },
        
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
         */
        openRow: function(row) {
      
          if (!Css.hasClass(row, "opened")) {
            
            var level = parseInt(row.getAttribute("level"));
            Css.setClass(row, "opened");
            var repObject = row.newObject;

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
        
        if (Css.hasClass(row, "opened")) {
          this.closeRow(row);
        } else {
          this.openRow(row);
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

        var table = Dom.getAncestorByClass(event.target, "ai-sidepanel-table");
        var row = Dom.getAncestorByClass(event.target, "treeRow");
        
        if (FBTrace.DBG_AINSPECTOR)
        	FBTrace.sysout("AInspector; elementsSidePanel.highlightRow-row: ", row);
        
        AinspectorUtil.highlightRow(event, table, row);
      },
       
      getElement : function(object) {
          
        return AinspectorUtil.truncateText(object.cache_item.toString(), 60);
      },
        
      getElementInformation : function(event) {
        
      }
        
})}

Firebug.registerPanel(Firebug.ElementsSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; accessibilityPanel.js, stylesheet registered");

return Firebug.ElementsSidePanel;

// ********************************************************************************************* //
});
