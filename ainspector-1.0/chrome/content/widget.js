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

var AINSPECTOR_FB = AINSPECTOR_FB || {};
with (FBL) {
  
  /**
   * toolbarUtil
   * 
   * @desc common helper functions for the tool bar buttons
   */
  AINSPECTOR_FB.toolbarUtil = {
    
    /**
     * @function getToolbarButtonClass
     * 
     * @param obj
     * @returns
     */
    getToolbarButtonClass : function(obj) {
      
      var className = "ruleCategory-" + obj.name;
      
      if (obj.selected) className += " selected";
      
      if (obj.first) className += " first";
    
      return className;
    },
    
    /**
     * @function selectTab
     * 
     * @param event
     * 
     * @returns
     */
    selectTab : function(event) {
      var elem = event.target;
      if (!elem) return;
      
      var category = getClassValue(elem, "ruleCategory");

      if (category) {
        var tabList = getAncestorByClass(elem, "focusTabList");
        
        if (tabList) {
          var oldTab = getElementByClass(tabList, "selected");
          
          if (oldTab) {
            oldTab.setAttribute("aria-selected", "false");
            oldTab.setAttribute("aria-expanded", "false");
            oldTab.setAttribute("tabindex", "-1");
            removeClass(oldTab, "selected");
          }
        }
        elem.setAttribute("aria-selected", "true");
        elem.setAttribute("aria-expanded", "true");
        elem.setAttribute("tabindex", "0");
        setClass(elem, "selected");
        var currentView = panel;
        showOnSelectButton();
        //var currentView = panel;
        
        /*if (currentView && typeof currentView["show" + category] == "function") {
          currentView["show" + category]();
        }*/
        
      }
    },
  
    /**
     * onToolbarFocus
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
        case KeyEvent.DOM_VK_TAB:
          break;
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
        case KeyEvent.DOM_VK_UP:
        case KeyEvent.DOM_VK_DOWN:

          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          var tabList = getAncestorByClass(event.target, "focusTabList");
          tabs = tabList.getElementsByClassName("focusTab");
          var currentIndex = Array.indexOf(tabs, event.target);
          if (currentIndex != -1) {
            var newIndex = forward ? ++currentIndex : --currentIndex;
            newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
            
            if (tabs[newIndex]) tabs[newIndex].focus();
          }
          event.stopPropagation();
          event.preventDefault();
          
          break;
        } //end switch
        //return tabs[newIndex];
      },
      
      /**
       * getSelectedState
       * 
       * @param obj
       * @returns
       */
      getSelectedState : function (obj) {
        return obj.selected ? "true" : "false";
      },
      
      /**
       * toHTMLPanel
       * 
       * @desc redirect to the HTML Panel of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      toHTMLPanel: function(event) {

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

    
    viewContainer : DIV({style : "display:none"}),
    
    emptyTemplate = domplate({
        tag:
          TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
            THEAD(
              TR({class: "gridHeaderRow gridRow", role: "row", tabindex: "0"},		
                FOR("header", "$header_elements",
                  TH({class: "gridHeaderCell gridCell", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "$header")),
                )
              )
            ),
            TBODY (
              TR({class: "tableRow a11yFocus", role: "row"},
    	        TD(DIV({class: "gridLabel"},"none"))
              ) //end TR
            )
          )
          
      });
  }
  
  
}