with (FBL) {
  
  /**
   * toolbarUtil
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var toolbarUtil = {
    
    /**
     * getToolbarButtonClass
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
     * selectTab
     * 
     * @param elem
     * @returns
     */
    selectTab : function(event) {
      var elem = event.target;
      if (!elem) return;
      
      var category = getClassValue(elem, "ruleCategory");
      FBTrace.sysout("catewgory: ", category);
      FBTrace.sysout("elem: ", event);

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
     * getTabIndex
     * 
     * @param obj
     * @returns
     */
    getTabIndex : function(obj) {
      
      return obj.selected ? "0" : "-1";
    },
    
    /**
     * onToolbarKeyPress
     * 
     * @desc
     * 
     * @param event
     * @returns
     */
    onToolbarKeyPress : function(event) {
      var key = event.keyCode;
      var tabs;
      FBTrace.sysout("keyCode in widget.js:" , event);
      switch(key) {
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
        case KeyEvent.DOM_VK_UP:
        case KeyEvent.DOM_VK_DOWN:

          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          var tabList = getAncestorByClass(event.target, "focusTabList");
          tabs = tabList.getElementsByClassName("focusTab");
          FBTrace.sysout("keyCode in widget.js - tablist", tabList);
          FBTrace.sysout("keyCode in widget.js - tab:", tabs);
          var currentIndex = Array.indexOf(tabs, event.target);
          FBTrace.sysout("keyCode in widget.js - curIndex:"+ currentIndex);
          if (currentIndex != -1) {
            var newIndex = forward ? ++currentIndex : --currentIndex;
            newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
            
            if (tabs[newIndex]) tabs[newIndex].focus();
            FBTrace.sysout("newIndex: ", tabs[newIndex]);
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
        FBTrace.sysout("inside pane-images event", event);

        var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
        FBTrace.sysout("inside pane-images table", table);

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

    
    viewContainer : DIV({style : "display:none"})
  }
}