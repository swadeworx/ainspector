with (FBL) {
  
  panel : null;
  headings_panel : null;
  links_panel : null;
  cache : null;
  
  /**
   * toolbarTemplate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var toolbarTemplate = domplate({
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
      
      var className = "elementView-" + obj.name;
      
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
    	  //elementDomplate.tableTag.replace({}, panel, elementDomplate);
        } else {
         // clearNode(panel.panelNode);
          //clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        	elementDomplate.tableTag.replace({}, panel, elementDomplate);
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
      
      var category = getClassValue(elem, "elementview");
      FBTrace.sysout("category: ", category);
      FBTrace.sysout("elem: ", elem);
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
  
 
  
  var toolbarObject = {  
	      
    /**
	 * panelsView
	 * 
	 * @desc
	 * 
	 * @param toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param element_cache is the specific cache to pass in to the toolbar (i.e., images cache, links cache, lists cache...)
	 * @returns
	 */
	 createToolbar : function(toolbar_buttons, toolbar, panelView, element_cache) {
	        
	  //var image_elements = images_cache.image_elements;
      //FBTrace.sysout("image ELements: ", image_elements);
	  toolbarTemPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, toolbarTemPlate);
	  toolbar.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	        
	  panel = panelView;
	 // panel.table = flatListTemplate.tableTag.append( {element_cache: element_cache}, panel.panelNode, null);

	  //Firebug.currentContext.getPanel('Rules').sView(true);
    }
  };
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatListTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Order")),
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Source")),
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Alt Text"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _link:"$object", onclick: "$hightlightRow"},//gridRow              
              TD({"class": "gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "linksTextCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.alt")
              ),
              TD({"class": "linksHREFCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, TAG("$attrTag", {imageObject: "$object"}) )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_linkElement: "$imageObject", class: "gridLabel", onclick: "$onLinkClick"},
                "$imageObject.source"
      ),
      
      /**
       * highlightRow
       *  
       * @param event
       * @returns
       */
      hightlightRow: function (event) {
	    //Firebug.InsideOutBox.highlight(event.target);
	    FBTrace.sysout("highlight: ", event);
	    var colorObj = {content: "SkyBlue", padding: "SlateBlue", border: "#444444", margin: "#EDFF64"};
	    var offset = getLTRBWH(Firebug.getRepObject(event.target));
        var x = offset.left, y = offset.top;
        var w = offset.width, h = offset.height;
        FBTrace.sysout("offset: ", offset);
        FBTrace.sysout("x: ", x);
        FBTrace.sysout("y: ", y);
     },
       
      /**
       * onLinkClick
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      onLinkClick : function(event){
        
	    var linkEle = event.target.linkElement;
        var node = linkEle.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      },
      
      onClickHeader : function(event){
        var table = getAncestorByClass(event.target, "ai-table-list-items");
        var column = getAncestorByClass(event.target, "gridHeaderCell");
        AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
      }
   });

}