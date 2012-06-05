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

if (!AINSPECTOR_FB.highlightModule) {
  var Cu = Components.utils; 

  try {
	AINSPECTOR_FB.highlightModule = Cu["import"]("resource://ainspector/highlight.js");
	OAA_WEB_ACCESSIBILITY.util.highlightModule.initHighlight(window.content.document);

  } catch (error) {
    FBTrace.sysout("error while creating highlightModule Object ", error);	
  }
}

FBL.ns(function() { with (FBL) {

 /**
  * @namespace AINSPECTOR_FB.toolbarUtil
  */
 AINSPECTOR_FB.toolbarUtil = {
    
  /**
   * @function getToolbarButtonClass
   * 
   * @param {Object} obj
   * 
   * @returns {String} className
   */
  getToolbarButtonClass : function(obj) {
      
    var className = "toolbarButtonView-" + obj.name;
     
    if (obj.selected) className += " selected";
      
    if (obj.first) className += " first";
    return className;
  },
    
  /**
   * @function onToolbarFocus
   * 
   * @desc
   * 
   * @param event
   * @returns
   */
  onToolbarFocus : function(event) {
  
    toolbarUtil.selectTab(event);
  },
    
  /**
   * @function getTabIndex
   * 
   * @param obj
   * @returns
   */
  getTabIndex : function(obj) {
      
    if (obj == 'temp') return 0;
    return obj.selected ? "0" : "-1";
  },
    
  /**
   * @function onToolbarKeyPress
   * 
   * @desc
   * 
   * @param event
   * @returns
   */
  onToolbarKeyPress : function(event) {
  
	var key = event.keyCode;
    var tabs;

    switch(key) {
    
      case KeyEvent.DOM_VK_LEFT:
    
      case KeyEvent.DOM_VK_RIGHT:
      
      case KeyEvent.DOM_VK_UP:
        
      case KeyEvent.DOM_VK_DOWN:

        var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
        var tabList = getAncestorByClass(event.target, "focusTabList");
        
        //get all the tabs from the toolbar
        tabs = tabList.getElementsByClassName("focusTab");

        var currentIndex = Array.indexOf(tabs, event.target);

        if (currentIndex != -1) {
          var newIndex = forward ? ++currentIndex : --currentIndex;

          //get the focus back to the first tab on the tool bar from the last tab of the toolbar
          newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
            
          if (tabs[newIndex]) tabs[newIndex].focus();
        }
        
        event.stopPropagation();
        event.preventDefault();
         
        break;
          
      case KeyEvent.DOM_VK_TAB:
    } //end switch
  },
      
  /**
   * @function getSelectedState
   * 
   * @desc 
   * 
   * @param {Object} obj
   */
  getSelectedState : function (obj) {
  
	if (obj == 'temp') return 'true';  
  
	return obj.selected ? "true" : "false";
  },
      
  /**
   * @function viewHTMLPanel
   * 
   * @desc redirect to the HTML Panel of Firebug
   * 
   * @param {Object} event - event triggered on a row in the Links Table
   */
  viewHTMLPanel: function(event) {

	  var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
	  var row =  getChildByClass(event.target.offsetParent, "tableRow");
      var child;
      var tbody = table.children[1];
      var node = null;

      for (var i = 0; i < tbody.children.length; i++) {
        var flag = false;
        var row = tbody.children[i];
        node = row;
        for (var j = 0; j < row.children.length; j++) {
      	var cell = row.children[j];
        for (var k=0; k<cell.classList.length;k++) {
          if (cell.classList[k] ==  "gridCellSelected") {
            flag = true;
            break;
          }//end if
        }//end for
        if (flag == true) break;
      }
        if (flag == true) break;
      }
      
      node = node.repObject.dom_element.node;
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
  },
      
  /**
   * @function getRulesetLEvel
   * 
   * @memberOf AINSPECTOR_FB.toolbarUtil
   * 
   * @desc returns a level in which the ruleset is evaluated
   * 
   * @param {Number} level
   * 
   * @return A, AA && AAA
   */
  getLevel : function (level){
    		
    if (level == 1) return "A";
    else if (level == 2) return "A & AA";
    else return "A, AA & AAA";
   		   
  },
       
  /**
   * @functon getRulesetTitle
   * 
   * @desc gets the ruleset tilte
   * 
   * @param {String} ruleset_id - ID of the ruleset
   * 
   * @return ruleset Title
   */
  getRulesetTitle : function (ruleset_id) {
      
    if (ruleset_id == 'WCAG20_ARIA_TRANS') return 'WCAG 2.0 ARIA Transitional';
        
    else if (ruleset_id == 'WCAG20_ARIA_STRICT') return 'WCAG 2.0 ARIA Strict';
        
    else return 'IITAA 2.0';
  },

  viewContainer : DIV({style : "display:none"}),
    
  /**
   * @function getSelectedToolbarButton
   * 
   * @desc return toolbar button selected on the main panel
   * 
   * @param {Object} context - Firebug context
   * @property {String} toolbar_button - selected toolbar button
   * 
   * @return {String} toolbar_button
   */
  getSelectedToolbarButton : function(context){
    
    //var toolbarbuttons = context.browser.chrome.$("radio-toolbar").children;
    var toolbarbuttons = context.chrome.$("fbFirebugExtensionButtons").children;
    var toolbar_button;
  
    for (var i=1; i < toolbarbuttons.length; i=i+2){
   	
      if (toolbarbuttons[i].checked == true) {
   	    //if (i != 0) toolbarbuttons[i].checked = false;
   	    toolbar_button = toolbarbuttons[i].id;
   		break;
   	  }
   	}
    return toolbar_button;
  }
};

/**
 * @namespace AINSPECTOR_FB.flatListTemplateUtil
 */
AINSPECTOR_FB.flatListTemplateUtil = {

  /**
   * @function onKeyPressTable
   * 
   * @desc focus on a row with the keyboard events
   * 
   * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
   */
  onKeyPressTable: function(event){
	  
	event.stopPropagation();
	var table = getAncestorByClass(event.target, "ai-table-list-items");
	  
    switch(event.keyCode) {
        
      case KeyEvent.DOM_VK_LEFT: //  
	 
      case KeyEvent.DOM_VK_UP: //up
		var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		
		if (row) {
		  row.focus();
		  AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
		}
		break;
		
      case KeyEvent.DOM_VK_RIGHT: //right
		  //var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  //if (cell) cell.focus();
		  //break;
	  case KeyEvent.DOM_VK_DOWN: //down

		if (table.tabIndex == '0') {
		  table.setAttribute('tabindex', '-1');
		  table.rows[0].setAttribute('tabindex', '0');
		  table.rows[0].focus();
		  break;
		}	
		var all_rows = table.getElementsByClassName("gridRow");
        var current_index = Array.indexOf(all_rows, event.target);
        var index = Array.indexOf(all_rows, event.target);
        var key = event.keyCode;
        var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          
        if (current_index != -1) {
       	  var new_index = forward ? ++current_index : --current_index;
          //get the focus back to the first tab on the tool bar from the last tab of the toolbar
          new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
             
          if (all_rows[new_index]) { 
            var next_row = all_rows[new_index];
//          unhighlighting from rows in panel
            var current_row = all_rows[index];

            if (current_index != 0) {
              AINSPECTOR_FB.ainspectorUtil.removeClass(current_row, "gridRowSelected");
      	        
              for (var c=0; c< current_row.cells.length; c++) AINSPECTOR_FB.ainspectorUtil.removeClass(current_row.cells[c], "gridCellSelected");
            }

//          highlight rows from panel
            all_rows[new_index].focus();
            AINSPECTOR_FB.ainspectorUtil.setClass(next_row, "gridRowSelected");
      	        
            for (var i=0; i< next_row.cells.length; i++) AINSPECTOR_FB.ainspectorUtil.setClass(next_row.cells[i], "gridCellSelected");
      	      OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems([next_row.repObject]);
          }
        }
        event.stopPropagation();
        event.preventDefault();
          
        break;
          
      case KeyEvent.DOM_VK_TAB:
       	//var panel = Firebug.chrome.getSelectedPanel();
        var sidePanel = Firebug.chrome.getSelectedSidePanel();
//	    if (sidePanel) {
//	      sidePanel.panelNode.setAttribute("tabindex", "0");
//	      sidePanel.panelNode.focus();
//	      setClass(sidePanel.panelNode, "focusRow");
//	    }
        break;
    }
  },
    
  /**
   * @function onKeyPressTree
   * 
   * @desc
   * 
   * @param {Object} event
   */
  onKeyPressTree : function (event) {
    
    event.stopPropagation();
    var table = getAncestorByClass(event.target, "domTree");
  	  
    switch(event.keyCode) {
          
      case KeyEvent.DOM_VK_LEFT: //  
  	    
      case KeyEvent.DOM_VK_UP: //up
  	    var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
  		  
  		if (row) {
  		  row.focus();
  		  AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
  		}
  		break;
  		
      case KeyEvent.DOM_VK_RIGHT: //right
  		    
      case KeyEvent.DOM_VK_DOWN: //down

  		if (table.tabIndex == '0') {
  		  table.setAttribute('tabindex', '-1');
  		  table.rows[0].setAttribute('tabindex', '0');
  		  table.rows[0].focus();
  			
  		  break;
  		}	
  		var all_rows = table.getElementsByClassName("gridRow");
        var current_index = Array.indexOf(all_rows, event.target);
        var index = Array.indexOf(all_rows, event.target);
        var key = event.keyCode;
        var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
           
        if (current_index != -1) {
          var new_index = forward ? ++current_index : --current_index;
           
          //get the focus back to the first tab on the tool bar from the last tab of the toolbar
          new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
                
          if (all_rows[new_index]) { 
            var next_row = all_rows[new_index];

            //unhighlighting from rows in panel
            var current_row = all_rows[index];

            if (current_index != 0) {
              AINSPECTOR_FB.ainspectorUtil.removeClass(current_row, "gridRowSelected");
        	    
              for (var c=0; c< current_row.cells.length; c++) AINSPECTOR_FB.ainspectorUtil.removeClass(current_row.cells[c], "gridCellSelected");
            }

//          highlight rows from panel
        	all_rows[new_index].focus();
            AINSPECTOR_FB.ainspectorUtil.setClass(next_row, "gridRowSelected");
        	  
            for (var i=0; i< next_row.cells.length; i++) AINSPECTOR_FB.ainspectorUtil.setClass(next_row.cells[i], "gridCellSelected");
        	OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems([next_row.repObject]);

          }
        }
        event.stopPropagation();
        event.preventDefault();
           
        break;
    }
  },
    
  /**
   * @function onFocus
   * 
   * @desc sets/removes selection of state with the ARIA attrubute "aria-selected" 
   * 
   * @param {Event} event
   */
  onFocus : function(event) {

    var event_target = event.target;

    if (!event_target) return;
      
    var category = getClassValue(event_target, "tableRowView");
    var table_rows = getAncestorByClass(event_target, "gridRow");
      
    if (table_rows) {
      var old_row = getElementByClass(table_rows, "selected");

      if (old_row) {
        old_row.setAttribute("aria-selected", "false");
        old_row.setAttribute("tabindex", "-1");
        removeClass(old_row, "selected");
     }
    }

    event_target.setAttribute("aria-selected", "true");
    event_target.setAttribute("tabindex", "0");
    setClass(event_target, "selected");
  },
    
  /**
   * @function htmlButtonPress
   * 
   * @desc
   * 
   * @param {Event} event
   */
  htmlButtonPress : function(event) {
    
    switch(event.keyCode) {
		  
	  case 13: //Enter
	    AINSPECTOR_FB.images.equivToolbarPlate.toHTMLPanel(event);
		break;
	}
  },
  

    
    /**
     * @function onKeyPressHeadingCell
     * 
     * @desc focus on a table header cell with the keyboard events
     * 
     * @param event event triggered when any keyboard's enter, right, left, up and down arrows are pressed
     */
    onKeyPressHeadingCell: function(event){
	    
	  event.stopPropagation();
	  switch(event.keyCode) {
		  
	    case 13: //Enter
	      var table = getAncestorByClass(event.target, "ai-table-list-items");
	      var column = getAncestorByClass(event.target, "gridHeaderCell");
	      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
		  break;
		  
	    case 9: //tab	  
	      break;
	    default:
		  this.onKeyPressCell(event);
		  break;
	  }
    },
    
    /**
     * @function doubleClick
     * 
     * @desc double click on a row/cell takes to the HTML panel of Firebug from the ainspector panel
     * 
     * @param event
     */ 
    doubleClick: function(event){

      var element = event.target.repObject;
      var node = element.dom_element.node;
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
    },
    
    /**
     * @function highlight
     * 
     * @desc highlight the first row when a toolbar button is clicked
     * 
     * @param {Object} row - row to highlight
     */
    highlight : function (row) {
      
      AINSPECTOR_FB.ainspectorUtil.setClass(row, "gridRowSelected");
      for (var i=0; i< row.children.length; i++) {
      	AINSPECTOR_FB.ainspectorUtil.setClass(row.children[i], "gridCellSelected");
      }
      OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems([row.repObject]);

    },
    
    /**
     * @function highlightRow
     *  
     * @desc highlight a row when a row is selected in a panel
     * Set the "gridRowSelected" and "gridCellSelected" classes to the selected Row and 
     * cells in that row remove these classes from earlier selected row.
     * 
     * 
     * @param {event} event triggered when mouse click happens
     * 
     * @returns 
     */
    highlightRow: function (event) {
	
      var table = getAncestorByClass(event.target, "ai-table-list-items");
      var current_row =  getAncestorByClass(event.target, "tableRow");
      var tbody = table.children[1]; //nomber of rows in a table
      var row;
      var cell;

      if (!current_row) { //to highlight header cells
    	current_row =  getAncestorByClass(event.target, "gridHeaderRow");
  	    tbody = table.children[0];
  	    
  	    if (event.keyCode == 38 || event.keyCode == 37) {
  	      	
    	  //current_row = table.children[1].children[]; 

        } else if (event.keyCode == 40 || event.keyCode == 39){
    	  table.children[0].children[0].blur();
    	  current_row = table.children[1].children[0]; 
    	  table.children[1].children[0].focus();
    	  AINSPECTOR_FB.ainspectorUtil.setClass(current_row, "gridRowSelected");
          
    	  OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems([current_row.repObject]);
          for (var c=0; c< current_row.children.length; c++) {
      	  AINSPECTOR_FB.ainspectorUtil.setClass(current_row.children[c], "gridCellSelected");
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
              AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
              count = count + 1;
              break;
    	  	}

    	  }  
    	  if (count >= no_of_cells) break;
        }
        if (count >= no_of_cells) {
    	  AINSPECTOR_FB.ainspectorUtil.removeClass(row, "gridRowSelected");
    	  if (event.keyCode == 38 || event.keyCode == 37) {
        	  current_row = tbody.children[i-1]; 

          } else if (event.keyCode == 40 || event.keyCode == 39){
        	  
        	  current_row = tbody.children[i+1]; 
          }
    	  break;
    	}
        
      }
      this.highlight(current_row);
    },
    
    /**
     * @function highlightTreeRow
     *  
     * @desc highlight a row when a row is selected in a panel
     * Set the "gridRowSelected" and "gridCellSelected" classes to the selected Row and 
     * cells in that row remove these classes from earlier selected row.
     * 
     * 
     * @param {event} event triggered when mouse click happens
     * 
     * @returns 
     */
    highlightTreeRow: function (event) {
	
      var table = getAncestorByClass(event.target, "domTable");
      var current_row =  getAncestorByClass(event.target, "treeRow");
      var tbody = table.children[1]; //nomber of rows in a table
      var row;
      var cell;
      
      if (!current_row) { //to highlight header cells
    	current_row =  getAncestorByClass(event.target, "gridHeaderRow");
  	    tbody = table.children[0];
      }
    
      for (var i = 0; i < tbody.children.length; i++) {
        row = tbody.children[i];
        var count = 0;
        var no_of_cells = row.children.length;
        
        for (var j = 0; j < no_of_cells; j++) {
    	  cell = row.children[j];
    	 
    	  for (var k=0; k<cell.classList.length;k++) {
   	  
    	  	if (cell.classList[k] ==  "gridCellSelected") {
              AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
              count = count + 1;
              break;
    	  	}

    	  }  
    	  if (count >= no_of_cells) break;
        }
        if (count >= no_of_cells) {
    	  AINSPECTOR_FB.ainspectorUtil.removeClass(row, "gridRowSelected");
    	  if (event.keyCode == 38 || event.keyCode == 37) {
        	  current_row = tbody.children[i-1]; 

          } else if (event.keyCode == 40 || event.keyCode == 39){
        	  current_row = tbody.children[i+1]; 

          }
    	  break;
    	}
        
      }
      this.highlight(current_row);
    },
    
    /**
     * @function onClickHeader
     * 
     * @desc sorts the table depending on the header selected
     * 
     * @param event event triggered when mouse click happens
     */
    onClickHeader : function(event){
  	  
      var table = getAncestorByClass(event.target, "ai-table-list-items");
      var column = getAncestorByClass(event.target, "gridHeaderCell");
      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
    }

  };

/**
 * @namespace AINSPECTOR_FB.tabPanelUtil
 */
AINSPECTOR_FB.tabPanelUtil = {
  /**
   * @function updateToolbar
   * 
   * @memberof AINSPECTOR_FB.tabPanelUtil
   * 
   * @param {Object} panelType - registered panel 
   * @param {String} toolbar_button - name of the toolbar button selected
   */
  updateToolbar: function(panelType, toolbar_button) {
     var removeBtn = Firebug.chrome.$(toolbar_button);
     var registered = Firebug.getPanelType(panelType);
    },
    
    /**
     * @function onRemoveSidePanel
     * @memberOf AINSPECTOR_FB.tabPanelUtil
     * 
     * @desc removes/unregisters sidePanal from any main panel depending on panelType
     * 
     *  @param {Object} panelType - type of the Panel  
     */
	onRemoveSidePanel: function(panelType) {
   
	  Firebug.unregisterPanel(panelType);
	},

	/**
     * @function onAppendSidePanel
     * @memberOf AINSPECTOR_FB.tabPanelUtil
     * 
     * @desc add/registers sidePanal from any main panel depending on panelType
     * 
     *  @param {Object} panelType - registered Panel  
     */
    onAppendSidePanel: function(panelType) {

      Firebug.registerPanel(panelType);
    },
    
    /**
     * @function addAndRemoveSidePanels
     * 
     * @desc 
     * 
     * @param {Boolean} pref - 
     */
    addAndRemoveSidePanels : function(pref) {
      
      var panelType_rule = Firebug.getPanelType("rulesSidePanel");
      var panelType_attributes = Firebug.getPanelType("attributesSidePanel");
      var panelType_properties = Firebug.getPanelType("propertiesSidePanel");
      var panelType_events = Firebug.getPanelType("eventsSidePanel");
      var panelType_style = Firebug.getPanelType("styleSidePanel");
  
      if (pref == true){
    	AINSPECTOR_FB.rules_registered = panelType_rule;
	    AINSPECTOR_FB.attributes_registered = panelType_attributes;
	    AINSPECTOR_FB.style_registered = panelType_style;
	    AINSPECTOR_FB.properties_registered = panelType_properties;
	    AINSPECTOR_FB.events_registered = panelType_events;
	  
	    if (panelType_rule) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_rule);
	  
	    if (panelType_attributes) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_attributes);
	  
	    if (panelType_style) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_style);
	  
	    if (panelType_properties) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_properties);
	  
	    if (panelType_events) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_events);
	  
	    return;
      }
  
      if (panelType_rule) {

      } else {
      	panelType_rule = AINSPECTOR_FB.rules_registered;
      	AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_rule);
      }
  
      if (panelType_style) {
        AINSPECTOR_FB.style_registered = panelType_style;
        AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_style);
      }
 
      if (panelType_attributes) {
 
      } else {
    	panelType_attributes = AINSPECTOR_FB.attributes_registered;
    	AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_attributes);
      }
 
      if (panelType_properties) {
  
      } else {
    	panelType_properties = AINSPECTOR_FB.properties_registered;
    	AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_properties);
      }
 
      if (panelType_events) {
 
      } else {
    	panelType_events = AINSPECTOR_FB.events_registered;
    	AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_events);
      }
    }
 };

}});