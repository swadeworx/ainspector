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
  
  /**
   * imageToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var headingsToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$head_land_toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$onClickHtmlView"}, "HTML Panel" ),
                DIV({style : "clear: both"})        
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$toolbarUtil.onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|toolbarUtil.getSelectedState", onfocus : "$toolbarUtil.onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
                
    ),
    
    /**
     * onClickHtmlView
     * 
     * @desc redirect to the HTML view of Firebug
     * 
     * @param event event triggered on a row in the Links Table
     */
    onClickHtmlView: function(event) {
	  FBTrace.sysout("inside pane-headings htmlview", event);
      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
      var row =  null;
      var tbody = null;
      var child;
      var node = null;
      
      if (table) {
    	  row = getChildByClass(event.target.offsetParent, "tableRow");
          tbody = table.children[1];
          FBTrace.sysout("tbody: ", tbody);

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
      	FBTrace.sysout("inside pane-headings table", table);
        FBTrace.sysout("inside pane-headings row", row);
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
    	  
	  FBTrace.sysout("node: ", node);
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
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
      
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      
      if (toolbar_button == "Tree View") {
    	headingsObject.getToolBarButtons(tree_view, toolbar_button);
    	
    	panel.table = headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, headingsTreeTemplate);

  	    Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);

      } else if (toolbar_button == "Title/Main/H1"){
        FBTrace.sysout(".................", media_view);
    	headingsObject.getToolBarButtons(title_main_view, toolbar_button);
    	//panel.table = flatListTemplate.shortTag.append( {image_elements: image_elements}, image_view.panelNode, null);
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
      } else if (toolbar_button == "Headings") {
      	headingsObject.getToolBarButtons(headings_view, toolbar_button);
      	var properties = ["Order", "Level", "Name"];
      	var display_properties = ["document_order", "level", "name"];
      	FBTrace.sysout("heading_elements: ", heading_elements);
      	/*var input = {properties: properties,
      			display_properties: display_properties,
      			heading_elements: heading_elements
      	}*/
      	
      	panel.table = flatList.shortTag.append({elements: heading_elements, display_properties: display_properties, header_properties: properties}, headings_view.panelNode, null);
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, heading_elements[0]);
      } else {
      	headingsObject.getToolBarButtons(landmarks_view, toolbar_button);
      	panel.table = flatList.shortTag.append( {landmark_elements: landmark_elements}, landmarks_view.panelNode, null);
    	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, landmark_elements[0]);
      }

    },
    
    viewContainer : DIV({style : "display:none"})

  });
  
  var headingsTreeTemplate = domplate({
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
    
	  row:
	    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
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

	  memberIterator: function(object) {
	    return this.getMembers(object);
	  },

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
            var links = event.target.getElementsByClassName('objectLink');
          
            if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'click');
      		break;
		}
	  },

      onFocus: function(event) {
		 FBTrace.sysout("inside onfocus"); 
        var links = event.target.getElementsByClassName('objectLink');
        
        if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'mouseover');
      },

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
	  
	  highlightRow: function (event) {
		    
	      FBTrace.sysout("HIGHLIGHT...", event);
		 // var table = getAncestorByClass(event.target, "domTable");
	      //var row =  getAncestorByClass(event.target, "treeRow");
	      
	      var table = getAncestorByClass(event.target, "domTable");
	    	 // table = getAncestorByClass(event.target.offsetParent, "domTable");
	      	row = table.rows;
	      	tbody = table.children[0];
	      	FBTrace.sysout("inside pane-headings table", table);
	          FBTrace.sysout("inside pane-headings row", row);
	      var i;
	      var j;
	      var k;
	      var cell_selected;
	      var child;
	      var row;
	      FBTrace.sysout("table: ", table);
	      FBTrace.sysout("tbody: ", tbody);

	      for (i = 0; i < tbody.children.length; i++) {
	        var flag = false;
	        var row = tbody.children[i];
	      	for (var k=0; k<row.classList.length;k++) {
	          if (row.classList[k] ==  "gridCellSelected") {
	            ainspectorUtil.removeClass(row, "gridCellSelected");
	         	flag = true;
	            break;
	           }
	      	}  
	      	if (flag == true) break;
	      }

	      var row_selected = getAncestorByClass(event.target, "treeRow");
	      ainspectorUtil.setClass(row_selected, "gridCellSelected");

	      //ainspectorUtil.setClass(row, "selected");
	      //var row_cells = cell.childNodes;
	      FBTrace.sysout("rowcells.....", row_cells);
	   },


      toggleRow: function(row) {

		if (hasClass(row, "opened")) {
		  this.closeRow(row);
		} else {
		  this.openRow(row);
		}
	  },

	  getMembers: function(object, level) {
			    
		if (!level) level = 0;

	    var members = [];
		
	    for (var p in object) members.push(this.createMember(p, object[p], level));

		return members;
	  },

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
	  
	  getChildrenEle: function(element){
		var tag_name = element.dom_element; 
	    if (tag_name == 'h1' || tag_name == 'h2' || tag_name == 'h3' ||
	     tag_name == 'h4' || tag_name == 'h5' || tag_name == 'h6') {
	      return [];	
	    } else {
		 return element.child_cache_elements; 
	    }
	  },
	  
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
	  
	  onClick_htmlView: function(event) {
		FBTrace.sysout("event::::: ", event.target);
		var head_landmark = event.target.headLandElement.value;
	    var node = head_landmark.dom_element.node;
	    var panel = Firebug.chrome.selectPanel("html");
	    panel.select(node);  
	  }
	  
	});
   
 
  var headingsObject = {  
	      
    /**
	 * panelsView
	 * 
	 * @desc
	 * 
	 * @param head_land_toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cache_object
	 * @returns
	 */
	 headingsPanelView : function(head_land_toolbar_buttons, toolbar, panelView, cache_object) {
	        
      var head_land_cache = cache_object.dom_cache.headings_landmarks_cache;
      FBTrace.sysout("head_land_cache: ", head_land_cache);
      child_elements = head_land_cache.child_cache_elements;
      landmark_elements = head_land_cache.landmark_elements;
      heading_elements = head_land_cache.heading_elements;
      title_main_elements = cache_object.title_main_cache;

      headingsToolbarPlate.toolbar.replace({head_land_toolbar_buttons : head_land_toolbar_buttons}, toolbar, headingsToolbarPlate);
	  toolbar.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	        
	  panel = panelView;
	  tree_view = panelView;
	  headings_view = panelView;
	  landmarks_view = panelView;
	  main_view = panelView;
	  FBTrace.sysout("panelView...", panelView.panelNode);
	  panel.table = headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, headingsTreeTemplate);

	  Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);
    },
    
    getToolBarButtons: function (panel, button_view) {
      var i;
      var head_land_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.tree"), selected: false},
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.titleMain"), selected: false}, 
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.headings"), selected: false},
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.landmarks"), selected: false}];
      for (i=0; i < head_land_toolbar_buttons.length; i++){
    	if (head_land_toolbar_buttons[i].name == button_view) head_land_toolbar_buttons[i].selected = true;  
      }  
      
      ainspectorUtil.loadCSSToStylePanel(panel.document);
      FBTrace.sysout("Inside toolberbuttons");
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      headingsToolbarPlate.toolbar.replace({head_land_toolbar_buttons : head_land_toolbar_buttons}, toolbar, headingsToolbarPlate);
	  toolbar.style.display = "block";
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
    }
  };
  
  
  
  /**
   * flatList
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatList = domplate({
    
	  shortTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
            FOR("props", "$header_properties",  
        	  TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "$props"))),
              TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "HTML View"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
            	TD({"class": "gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                  DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
                ),
                TD({"class": "gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                  DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.level")
                ),
                TD({"class": "gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                  DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.name")
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
                    ainspectorUtil.removeClass(cell, "gridCellSelected");
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
        ainspectorUtil.setClass(column, "gridCellSelected");
        FBTrace.sysout("column aft: ", column);

        //ainspectorUtil.setClass(row_cell, "gridCellSelected");
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
        ainspectorUtil.sortColumn(table, column);
      }
   });
}

