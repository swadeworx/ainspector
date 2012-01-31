with (FBL) {
  
  panel : null;
  all_view : null;
  duplicate_name_items_view: null;
  duplicate_href_items_view: null;
  duplicate_name_items: null;
  duplicate_href_items: null;
  link_elements: null;
	
  /**
	   * imageToolbarPlate
	   * 
	   * @Domplate
	   * 
	   * @desc template creates the content for navigation button
	   */
	  var linksToolbar = domplate({
	    toolbar : DIV( {class : "nav-menu"},
	                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
	                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
	              ), 
	  
	    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "Rule Categories"},
	                       FOR("obj", "$toolbar_buttons",
	                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$AINSPECTOR_FB.toolbarUtil.onToolbarFocus"},
	                             "$obj.name"
	                         )//end LI
	                       )//end for
	    
	    ),
	    
	    /**
	     * toHTMLPanel
	     * 
	     * @desc redirect to the HTML Panel of Firebug
	     * 
	     * @param event event triggered on a row in the Links Table
	     */
	    toHTMLPanel: function(event) {
	      FBTrace.sysout("inside pane-images event", event.target);

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
	      FBTrace.sysout("niode: ", node);
	      node = node.link.dom_element.node;
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
	      
	      if (toolbar_button == "All") {
	        
	    	linksPanel.getToolBarButtons(all_view, toolbar_button);
	  	    panel.table = allLinksTable.layoutTag.append( {links: link_elements}, image_view.panelNode, null);
	  	    Firebug.currentContext.getPanel('Rules').sView(true, link_elements[0]);
	      
	      } else if (toolbar_button == "Duplicate HREF"){

	    	linksPanel.getToolBarButtons(duplicate_href_items_view, toolbar_button);
	    	panel.table = linkstreeTemplate.tableTag.append( {object: duplicate_href_items}, duplicate_href_items_view.panelNode, null);
	    	Firebug.currentContext.getPanel('Rules').sView(true, duplicate_href_items[0]);
	      } else if (toolbar_button == "Duplicate Name") {
	        
	    	linksPanel.getToolBarButtons(duplicate_name_items_view, toolbar_button);
	  	    panel.table = flatListAbbreviationTemplate.tableTag.append( {duplicate_name_items: duplicate_name_items}, duplicate_name_items_view.panelNode, null);
	  	    Firebug.currentContext.getPanel('Rules').sView(true, abbreviation_elements[0]);
	      
	      } else {

	    	  linksPanel.getToolBarButtons(abbreviation_view, toolbar_button);
	      }
	    },
	    viewContainer : DIV({style : "display:none"})
	  });
	
 /**
   * allLinksTable
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var allLinksTable = domplate({
    
	layoutTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
            TH({"class": "gridHeaderCell gridCell", id: "linkOrderCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, "Order"),
            TH({"class": "gridHeaderCell gridCell", id: "linkNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"},"Name"),
            TH({"class": "gridHeaderCell gridCell", id: "linkHrefCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"},"HREF")
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$links",
            TR({"class": "tableRow a11yFocus gridRow", "role": "row", id: "$object.cache_id", _link:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({"class": "linksOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridLabel", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "linksTextCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridLabel", _repObject:"$object"}, "$object.name")
              ),
              TD({"class": "linksHREFCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({id: "$object.document_order", class: "gridLabel", _repObject:"$object"}, "$object.href" )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
    });
 
  var linksPanel = {
    
    /**
     * desplayLinkPanel
     * 
     * @desc
     * 
     * @param panel
     * @param links
     */
    displayLinksPanel : function(panel, toolbar, toolbar_buttons, links_cache) {
    
	  linksToolbar.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, linksToolbar);
      toolbar.style.display = "block";
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  FBTrace.sysout("links", links_cache);
	  link_elements = links_cache;
	  duplicate_name_items = links_cache.duplicate_name_items;
	  duplicate_href_items = links_cache.duplicate_href_items;
	  all_view = panel;
	  duplicate_name_items_view = panel;
	  duplicate_name_items_view = panel;
	  
	  panel.table = allLinksTable.layoutTag.append({links: links_cache.link_elements}, panel.panelNode, null);
      Firebug.currentContext.getPanel('Rules').sView(true);

    },
    
    getToolBarButtons: function (panel, button_view) {

        var i;
        var links_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.all"), selected: false},
                                       {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.duplicateHref"), selected: false}, 
                                       {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.duplicateName"), selected: false},
                                       {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.area"), selected: false}];
        for (i=0; i < links_toolbar_buttons.length; i++){
      	if (links_toolbar_buttons[i].name == button_view) links_toolbar_buttons[i].selected = true;  
        }  
        
        ainspectorUtil.loadCSSToStylePanel(panel.document);

        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        linksToolbar.toolbar.replace({toolbar_buttons : links_toolbar_buttons}, toolbar, linksToolbar);
  	    toolbar.style.display = "block";
  	    panel.panelNode.id = "ainspector-panel"; 
  	    panel.panelNode.appendChild(toolbar);
      }
  }; //end of linksPanel
  
  var linkstreeTemplate = domplate({
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

};