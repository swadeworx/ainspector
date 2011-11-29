with (FBL) {
  
  panel : null;
  headings_panel : null;
  links_panel : null;
  cache : null;
  
  /**
   * panelPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var panelPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                  DIV({style : "clear: both"})        
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|getTabIndex", role : "tab", "aria-selected" : "$obj|getSelectedState", onfocus : "$onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
                
    ),
    
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
     * onClick
     * 
     * @desc
     * 
     * @param event
     */
    onClick : function(event) {
      var toolbar_button = event.currentTarget.id;
      
      if (toolbar_button == "Control Rules") {
      	//clearNode(panel.panelNode);
        //  clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
    	  elementDomplate.tableTag.replace({}, panel, elementDomplate);
        } else {
         // clearNode(panel.panelNode);
          //clearNode(Firebug.currentContext.getPanel('Rules').panelNode);

        }
      },
    
    /**
     * selectTab
     * 
     * @param elem
     * @returns
     */
    selectTab : function(elem) {
    
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
        
        if (currentView && typeof currentView["show" + category] == "function") {
          currentView["show" + category]();
        }
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
      this.selectTab(event.target);
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
      
      switch(key) {
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
        case KeyEvent.DOM_VK_UP:
        case KeyEvent.DOM_VK_DOWN:

          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          var tabList = getAncestorByClass(event.target, "focusTabList");
          var tabs = tabList.getElementsByClassName("focusTab");
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
    
    viewContainer : DIV({style : "display:none"})

  });
  
  var elementDomplate = domplate({
		
	tableTag : 
		TABLE({"class": "ai-table-list-items", cellpadding: 0, border: 1, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
		        THEAD(
		          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0"},
		            TH( ),
		            TH({"class": "HeaderCell"}, "P"),
		            TH({"class": "HeaderCell"},"V"),
		            TH({"class": "HeaderCell"},"PV"),
		            TH({"class": "HeaderCell"},"R"),
		            TH({"class": "HeaderCell"},"PR"),
		            TH({"class": "HeaderCell"},"W"),
		            TH({"class": "HeaderCell"},"I"),
		            TH({"class": "HeaderCell"},"A")

		          ) //end TR
		        ),
		TBODY()
	  )	  
});
  
  var panelObject = {  
	      
    /**
	 * panelsView
	 * 
	 * @desc
	 * 
	 * @param toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cacheResult
	 * @returns
	 */
	 panelsView : function(toolbar_buttons, toolbar, panelView, cacheResult) {
	        
	  FBTrace.sysout("control_toolbar_buttons: ", toolbar_buttons); 
	  panelPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, panelPlate);
	  toolbar.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	        
	  panel = panelView;
	  FBTrace.sysout("panelView...", panelView.panelNode);
 	  elementDomplate.tableTag.append( {}, panelView.panelNode, null);
	  FBTrace.sysout("cacheResult...", cacheResult);

	  Firebug.currentContext.getPanel('Rules').sView(true);
    }
  };
}