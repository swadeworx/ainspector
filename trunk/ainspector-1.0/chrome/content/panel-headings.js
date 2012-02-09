var AINSPECTOR_FB = AINSPECTOR_FB || {};
with (FBL) {
  
  panel : null;
  tree_view : null;
  headings_view : null;
  landmarks_view: null;
  title_main_view: null;
  heading_elements: null;
  child_elements: null;
  title_main_elements: null;
  landmark_elements: null;
  
  AINSPECTOR_FB.headLandmarkView = {  
	      
    /**
	 * @function headingsPanelView
	 * 
	 * @desc
	 * 
	 * @param head_land_toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cache_object
	 */
	 headingsPanelView : function(head_land_toolbar_buttons, toolbar, panelView, cache_object) {
	        
      var head_land_cache = cache_object.dom_cache.headings_landmarks_cache;
      
      child_elements = head_land_cache.child_cache_elements;
      landmark_elements = head_land_cache.landmark_elements;
      heading_elements = head_land_cache.heading_elements;
      title_main_elements = cache_object.title_main_cache;

      headingsToolbarPlate.toolbar.replace({head_land_toolbar_buttons : head_land_toolbar_buttons}, toolbar, headingsToolbarPlate);
	  toolbar.style.display = "block";
	  
	  var element = panelView.document.createElement("div");
      element.style.display = "block";
	  
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	  panelView.panelNode.appendChild(element);
	        
	  panel = panelView;

	  panel.table = headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, headingsTreeTemplate);

	  Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);
    }
  };

  /**
   * @domplate headingsToolbarPlate
   * 
   * @desc template creates the content for navigation button
   */
  var headingsToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$head_land_toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" ),
                DIV({style : "clear: both"})        
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "toolbarbutton views"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClickToolbarButton", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
                
    ),
    
    /**
     * @function toHTMLPanel
     * 
     * @desc redirect to the HTML view of Firebug
     * 
     * @param event event triggered on a row/cell
     */
    toHTMLPanel: function(event) {
      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
      var row =  null;
      var tbody = null;
      var child;
      var node = null;
      
      if (table) {
	    row = getChildByClass(event.target.offsetParent, "tableRow");
        tbody = table.children[1];

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

      } else {
    	table = getChildByClass(event.target.offsetParent, "domTable");
      	//row = getChildByClass(event.target.offsetParent, "treeRow");

    	row = table.rows;
      	tbody = table.children[0];

      	for (var i = 0; i < tbody.children.length; i++) {
          var flag = false;
          var row = tbody.children[i];
          node = row;
        
          for (var k=0; k<row.classList.length;k++) {
          
        	if (row.classList[k] ==  "gridCellSelected") {
              flag = true;
              break;
            }//end if
          }//end for
          
          if (flag == true) break;
        }
        node = node.repObject.value.dom_element.node;
      }
    	  
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
    },

    
    /**
     * @function onClickToolbarButton
     * 
     * @desc 
     * 
     * @param event mouse event
     */
    onClickToolbarButton : function(event) {
      var toolbar_button = event.currentTarget.id;
      this.showOnSelectButton(toolbar_button);
    },

    /**
     * @function showOnSelectButton
     * 
     * @desc show the selected toolbar button with a focus on it
     * 
     * @param toolbar_button_id
     */
    showOnSelectButton : function(toolbar_button_id) {

      clearNode(panel.table);  // clear the content of the panel 
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      
      if (toolbar_button_id == "Tree View") {
    	FBTrace.sysout("child_elements.....................................: ", child_elements);
    	panel.table = headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, headingsTreeTemplate);

  	    Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);

      } else if (toolbar_button_id == "Title/Main/H1"){
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
      } else if (toolbar_button_id == "Headings") {
      	var properties = ["Order", "Level", "Name"];
      	var display_properties = ["document_order", "level", "name"];
      	
      	panel.table = flatList.shortTag.append({elements: heading_elements, display_properties: display_properties, header_properties: properties}, panel.panelNode, null);
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, heading_elements[0]);
      } else {
      	panel.table = flatList.shortTag.append( {landmark_elements: landmark_elements}, panel.panelNode, null);
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, landmark_elements[0]);
      }

    },
    
    /**
     * @function selectTab
     * 
     * @desc set the aria attributes/properties and css properties for a particular tab to be selected 
     * 
     * @param elem event target 
     */
    selectTab : function(elem) {
    
      if (!elem) return;
      
      var category = getClassValue(elem, "toolbarButtonView");

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
        this.showOnSelectButton(category);
      }
    },
  
    /**
     * @function onToolbarFocus
     * 
     * @desc
     * 
     * @param event
     */
    onToolbarFocus : function(event) {
      this.selectTab(event.target);
    },
    
    viewContainer : DIV({style : "display:none"})

  });
  
  /**
   * @domplate headingsTreeTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the headings toolbar button
   */
  var headingsTreeTemplate = domplate({
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    THEAD(
		  TR({"class": "gridHeaderRow a11yFocus", id: "tableTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
		    TH({"class": "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Element")),
		    TH({"class": "gridHeaderCell gridCell", id: "headRoleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Role/Level")),
	        TH({"class": "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Name"))
	      ) //end TR
	    ), //end THEAD
	    TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
    
	  row:
	    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$highlightRow"},
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
		  ),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
			"$member.role_level"),
  		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.text")
	    ),

      strTag : DIV({class: "treeLabel"},"$member.name"),

	  loop:
	    FOR("member", "$members", TAG("$row", {member: "$member"})),
    
	  /**
	   * @function memberIterator
	   * 
	   * @desc
	   * 
	   * @param object to iterate through
	   */
	  memberIterator: function(object) {
	    return this.getMembers(object);
	  },
	  
	  /**
	   * @function onClick
	   * 
	   * @desc
	   * 
	   * @param event
	   */
	  onClick: function(event) {
			    
		if (!isLeftClick(event)) return;

	    var row = getAncestorByClass(event.target, "treeRow");
		var label = getAncestorByClass(event.target, "treeLabel");
		
		if (label && hasClass(row, "hasChildren")) this.toggleRow(row);
	  },

	  /**
	   * @function onKeyPressedTable
	   * 
	   * @desc
	   * 
	   * @param event
	   */
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

	  isTreeRow: function(node) {
		return hasClass(node, "treeRow");
	  },

	  
	  onKeyPressedRow: function(event) {
		event.stopPropagation();
		
		switch(event.keyCode) {
          case 37: //left
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");
            
            if (hasClass(row, "opened")) { // if open
              this.closeRow(row); // close
            } else {
              var table = getAncestorByClass(event.target, "domTable");
              table.focus(); // focus parent;
            }
            break;
          
          case 38: //up
            event.preventDefault();
            var row = findPrevious(event.target, this.isTreeRow, false);
            row.focus();
            break;
            
          case 39: //right
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");

            if (hasClass(row, "hasChildren")) this.openRow(row);
            break;
            
          case 40: //down
            event.preventDefault();
            var row = findNext(event.target, this.isTreeRow, false);
            row.focus();
            break;
            
          case 13: //Enter
            event.preventDefault();
      		break;
		}
	  },
	  
	  /**
	   * @function closeRow
	   * 
	   * @desc close a row when clicked on a twisty open image on the panel
	   * 
	   * @param row table row
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
  	  * 
  	  * @desc open a row when clicked on a twisty close image on the panel
  	  * 
  	  * @param row table row
  	  */
      openRow: function(row) {
		
    	if (!hasClass(row, "opened")) {
		  var level = parseInt(row.getAttribute("level"));
		  setClass(row, "opened");
		  var repObject = row.repObject;
			
		  if (repObject) {
            var members = this.getMembers(repObject.children, level+1);
			
            if (members) this.loop.insertRows({members: members}, row);
		  }
		}
	  },
	  
	 /**
      * @function highlightRow
      * 
      * @desc
      * 
      * @param event
      */
	  highlightRow: function (event) {
		    
        var table = getAncestorByClass(event.target, "domTable");
      	row = table.rows;
      	tbody = table.children[0];
        var i;
	    var j;
	    var k;
	    var cell_selected;
	    var child;
	    var row;

	    for (i = 0; i < tbody.children.length; i++) {
	      var flag = false;
	      var row = tbody.children[i];
	      	
	      for (var k=0; k<row.classList.length;k++) {
	        
	        if (row.classList[k] ==  "gridCellSelected") {
	          AINSPECTOR_FB.ainspectorUtil.removeClass(row, "gridCellSelected");
	          flag = true;
	          break;
	        }
	      }  
	      if (flag == true) break;
	    }
        var row_selected = getAncestorByClass(event.target, "treeRow");
	    AINSPECTOR_FB.ainspectorUtil.setClass(row_selected, "gridCellSelected");
     },

      /**
       * @function toggleRow
       * 
       * @desc
       * 
       * @param row
       */
      toggleRow: function(row) {

		if (hasClass(row, "opened")) {
		  this.closeRow(row);
		} else {
		  this.openRow(row);
		}
	  },

	  /**
	   * @function getMembers
	   * 
	   * @desc
	   * 
	   * @param object
	   * @param level
	   * 
	   * @return
	   */
	  getMembers: function(object, level) {
			    
		if (!level) level = 0;

	    var members = [];
		
	    for (var p in object) members.push(this.createMember(p, object[p], level));

		return members;
	  },

	  /**
	   * @function createMember
	   * 
	   * @desc create an object of display properties to loop through the row and childrow constructors
	   * 
	   *  @param name
	   *  @param value
	   *  @param level
	   */
	  createMember: function(name, value, level)  {
	  //  FBTrace.sysout(' createMember : ', value);
		return {
		  name: value.dom_element.tag_name, //name,
		  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
		  text: (value.dom_element.role) ? (value.label) : value.name,
	      hasChildren: this.hasChildElements(value), 
	      children: this.getChildrenEle(value),
	      value: (value != null) ? value : "",
	      label: (value.dom_element.children != null) ? "" : value,
	      level: level,
	      indent: level * 16,
	      tag: this.strTag
	    };
	  },
	  
	  /**
	   * @function getChildrenEle
	   * 
	   * @desc
	   * 
	   * @param element
	   * 
	   * @return child_cache_elements|null
	   */
	  getChildrenEle: function(element){
		var tag_name = element.dom_element; 
	    if (tag_name == 'h1' || tag_name == 'h2' || tag_name == 'h3' ||
	     tag_name == 'h4' || tag_name == 'h5' || tag_name == 'h6') {
	      return [];	
	    } else {
		 return element.child_cache_elements; 
	    }
	  },
	  
	  /**
	   * @function hasChildElements
	   * 
	   * @desc
	   * 
	   * @param element
	   */
	  hasChildElements: function(element){
		if (typeof element.has_element_children === 'undefined') { 
		  
		  /* check if the child elements are the only text. If so set hasChildren to false. */
		  if (element.child_cache_elements && element.child_cache_elements.length > 0)
		  return element.dom_element.has_element_children;
		  else return false;
	    } else {
		  return element.has_element_children;
		}
	  },
	  
	  /**
	   * @function onClick_htmlView
	   * 
	   * @desc
	   * 
	   * @param event
	   */
	  onClick_htmlView: function(event) {
		
		var head_landmark = event.target.headLandElement.value;
	    var node = head_landmark.dom_element.node;
	    var panel = Firebug.chrome.selectPanel("html");
	    
	    panel.select(node);  
	  }
	  
	});
   
 
  /**
   * flatList
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatList = domplate({
    
	  shortTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
        	TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Order")),
        	TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Level")),
        	TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Name"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$elements",
            TR({class: "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.highlightRow"},//gridRow              
              TD({class: "gridCell gridCol a11yFocus", "role": "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({class: "gridCell gridCol a11yFocus", "role": "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.level")
              ),
              TD({class: "gridCell gridCol a11yFocus", "role": "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.name")
              )
            )//end TR
            
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      memberIterator: function(property, object){
	    return this.getMember(property, object);
      },
      printVal: function(property, object){
    	FBTrace.sysout("property: ........................" + property);
    	//FBTrace.sysout("object: ........................" + object);
    	//return object[property];
      },
      getMember: function(property, object){
        FBTrace.sysout("property: ........................" + property);
        FBTrace.sysout("object: ........................" , object);
        return object[property];
	   // var property = [];
	   // for(var v in properties) property.push(object[v]);
	    //FBTrace.sysout("p: ........................" + property.length);
	    //return property;
      },
      
      /**
       * highlightRow
       *  
       * @param event
       * @returns
       */
      hightlightCell: function (event) {
	    
        var table = getAncestorByClass(event.target, "ai-table-list-items");
        var row =  getAncestorByClass(event.target, "tableRow");
        var i;
        var j;
        var k;
        var cell_selected;
        var child;
        var row;
        FBTrace.sysout("table: ", table);
        var tbody = table.children[1];
        FBTrace.sysout("tbody: ", tbody);

        for (i = 0; i < tbody.children.length; i++) {
          var flag = false;
          var row = tbody.children[i];
          
          for (j = 0; j < row.children.length; j++) {
        	var cell = row.children[j];
        	var cell_selected = getChildByClass(cell, "gridCellSelected");
        	FBTrace.sysout("cell_selected: "+ cell_selected);
        	for (var k=0; k<cell.classList.length;k++) {
             	  if (cell.classList[k] ==  "gridCellSelected") {
                    AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
             		  flag = true;
                     break;
               }
          	}
        	if (flag == true) break;
          }
          if (flag == true) break;
        }

        var column = getAncestorByClass(event.target, "gridCell");
        FBTrace.sysout("column bef: ", column);
        AINSPECTOR_FB.ainspectorUtil.setClass(column, "gridCellSelected");
        FBTrace.sysout("column aft: ", column);

        //AINSPECTOR_FB.ainspectorUtil.setClass(row_cell, "gridCellSelected");
        //var row_cells = cell.childNodes;
        //FBTrace.sysout("rowcells.....", row_cells);
     },
       
      /**
       * onClickHtmlView
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
     onClickHtmlView : function(event){
        
	    var element = event.target.element;
		FBTrace.sysout("event onSourceClick::::: ", event.target);

	    var node = element.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      },
      
      onClickHeader : function(event){
    	  
    	FBTrace.sysout("Inside onClickHeader................................", event.target);  
        var table = getAncestorByClass(event.target, "ai-table-list-items");
    	FBTrace.sysout("table..........", table);  

        var column = getAncestorByClass(event.target, "gridHeaderCell");
        FBTrace.sysout("column", column);
        AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
      }
   });
}

