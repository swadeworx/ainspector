var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
  
  panel : null;
  duplicate_name_items: null;
  duplicate_href_items: null;
  link_elements: null;
  selected_toolbar_button: null;

  /**
   * 
   */
  AINSPECTOR_FB.links = {
	    
	    /**
	     * @function linksPanel
	     * 
	     * @desc
	     * 
	     * @param panel
	     * @param links
	     */
	    linksPanel : function(panelView, toolbar, toolbar_buttons, links_cache) {
	    
	      AINSPECTOR_FB.links.linksToolbar.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.links.linksToolbar);
	      
		  var element = panelView.document.createElement("div");
		  element.style.display = "block";
		  
		  toolbar.style.display = "block";
		  
		  panelView.panelNode.id = "ainspector-panel"; 
		  panelView.panelNode.appendChild(toolbar);
		  panelView.panelNode.appendChild(element);
		  FBTrace.sysout("links", links_cache);
		  
		  link_elements = links_cache.link_elements;
		  duplicate_name_items = links_cache.duplicate_name_items;
		  duplicate_href_items = links_cache.duplicate_href_items;
		  panel = panelView;
		  panel.table = AINSPECTOR_FB.links.allLinksTemplate.layoutTag.append({links: link_elements}, panel.panelNode, null);
		  this.select(links_cache.link_elements[0]);
	      Firebug.currentContext.getPanel('Rules').sView(true, links_cache.link_elements[0]);

	    },
	    
	    /**
	     * @function select
	     * 
	     * @desc sets the first row object in to the panel and highlight() function to highlight the first row 
	     * 
	     * @param {Object} object - first image object in the images cache
	     * @property {Object} selection - set an object to the panel to be used by the side panels when selected first time
	     */
	    select : function(object) {
	      
	  	  panel.selection = object;
	  	  
	      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
	      
	    }
	  }; //end of linksPanel
	
  	  /**
	   * imageToolbarPlate
	   * 
	   * @Domplate
	   * 
	   * @desc template creates the content for navigation button
	   */
	  AINSPECTOR_FB.links.linksToolbar = domplate({
	    
		toolbar : DIV( {class : "nav-menu"},
	                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
	                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
	              ), 
	  
	    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "toolbarbutton views"},
	                       FOR("obj", "$toolbar_buttons",
	                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClickToolbarButton", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", 
				   role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
	                             "$obj.name"
	                         )//end LI
	                       )//end for
	    
	    ),
	    
	    /**
	     * @function toHTMLPanel
	     * 
	     * @desc redirect to the HTML Panel of Firebug
	     * 
	     * @param event event triggered on a row/cell of a images/media/abbreviation toolbar buttons
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
	      node = node.repObject.dom_element.node;
	      var panel = Firebug.chrome.selectPanel("html");
	      panel.select(node);
	    },

	    /**
	     * @function onClickToolbarButton
	     * 
	     * @desc
	     * 
	     * @param event
	     */
	    onClickToolbarButton : function(event) {
	      var toolbar_button = event.currentTarget.id;
	      FBTrace.sysout("event: ", event);
	      this.showOnSelectButton(toolbar_button);
	    },

	    /**
	     * @function showOnSelectButton
	     * 
	     * @desc show the selected toolbar button with a focus on it
	     * 
	     * @param toolbar_button_id id of the toolbar to be selected
	     */
	    showOnSelectButton : function(toolbar_button_id){
	      clearNode(panel.table);
	      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
	      selected_toolbar_button = toolbar_button_id;
	      
	      if (toolbar_button_id == "All") {
	        
	  	    panel.table = AINSPECTOR_FB.links.allLinksTemplate.layoutTag.append( {links: link_elements}, panel.panelNode, null);
	  	    AINSPECTOR_FB.equivalents.select(link_elements[0]);
	  	    Firebug.currentContext.getPanel('Rules').sView(true, link_elements[0]);
	      
	      } else if (toolbar_button_id == "Duplicate HREF"){
	    	var properties = ["Number", "HREF", "Name"];
	    	panel.table = AINSPECTOR_FB.links.duplicateNameOrHrefTemplate.tag.append( {object: duplicate_href_items, properties: properties}, panel.panelNode, AINSPECTOR_FB.links.duplicateNameOrHrefTemplate);
	    	AINSPECTOR_FB.equivalents.select(duplicate_href_items[0]);
	    	FBTrace.sysout("duplicate_href_items: ", duplicate_href_items[0]);
	    	//Firebug.currentContext.getPanel('Rules').sView(true, duplicate_href_items[0]);
	      } else if (toolbar_button_id == "Duplicate NAME") {
	    	var properties = ["Number", "Name", "HREF"];

	  	    panel.table = AINSPECTOR_FB.links.duplicateNameOrHrefTemplate.tag.append( {object: duplicate_name_items, properties:properties}, panel.panelNode, AINSPECTOR_FB.links.duplicateNameOrHrefTemplate);
	  	    AINSPECTOR_FB.equivalents.select(duplicate_name_items[0]);
	  	   // Firebug.currentContext.getPanel('Rules').sView(true, duplicate_name_items[0]);
	      
	      } else {
	    	//AINSPECTOR_FB.equivalents.select(image_elements[0]);
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
	        FBTrace.sysout("panel in selectTab: ", panel);
	        //this.showOnSelectButton(category);
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
       * allLinksTable
       * 
       * @Domplate
       * 
       * @desc template to create a table for Links tab and pop up the values in it
       */
	  AINSPECTOR_FB.links.allLinksTemplate = domplate({
    
	    layoutTag:
	      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
            THEAD(
              TR({class: "gridHeaderRow gridRow", id: "linksTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
                TH({class: "gridHeaderCell gridCell", id: "linkOrderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Order")),
                TH({class: "gridHeaderCell gridCell", id: "linkNameCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Name")),
                TH({class: "gridHeaderCell gridCell", id: "linkHrefCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"HREF"))
              ) //end TR
            ), //end THEAD
            TBODY(
              FOR("object", "$link_elements",
                TR({class: "tableRow gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$highlightRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
                  TD({class: "linksOrderCol gridCell gridCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                    DIV({class: "gridContent", _repObject:"$object"}, "$object.document_order")
                  ),
                  TD({class: "linksTextCol gridCell gridCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                    DIV({class: "gridContent", _repObject:"$object"}, "$object.name")
                  ),
                  TD({class: "linksHREFCol gridCell gridCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                    DIV({id: "$object.document_order", class: "gridContent", _repObject:"$object"}, "$object.href" )
                  )
                )//end TR   
              ) //end FOR
            )// end TBODY
	      ), // end inner TABLE
  
	      /**
	       * @function highlightRow
	       * 
	       * @desc helper function to call highlight
	       * 
	       * @param {Event} event - even triggered when a row is selected in a panel
	       * @property {Object} selection - present selected row info to be passed to the side panel 
	       */
	      highlightRow : function(event){
	  	    panel.selection = Firebug.getRepObject(event.target);
	  	    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event);
	      }
	  });
 
      AINSPECTOR_FB.links.duplicateNameOrHrefTemplate = domplate({
    	  
    	tag:
    	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
    		THEAD(
    		  TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
    		    FOR("headerName", "$properties",
    			  TH({class: "gridHeaderCell", id: "abbrEleCol"}, DIV({class: "gridHeaderCellBox"}, "$headerName"))
    			) //end FOR  
    		  ) //end TR
    		), //end THEAD
    		TBODY(
    		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
    		)//end TBODY
    	  ), //end TABLE
    		    
    	  row:
    		TR({class: "treeRow", $hasChildren: "$member.hasDuplicates", _repObject: "$member",
    		 level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$onClickTreeRow"},
    		  TD({class: "memberLabelCell treeLabel", style: "padding-left: $member.indent\\px"}, "$member.number"
    		  ),
    		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px"}, "$member|getParentColumn"
    		  )//,
  			  //TD({class: "memberLabelCell", _repObject: "$member"}, "$member|getChildColumn")

    		),
    		
   		   childrow:
    		 TR({class: "treeRow", _repObject: "$member", 
    		   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$onClickTreeRow"},
    		   TD(
    	       ),
    		   TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
    			  "$member|getParentColumn"
    		    ),
    			TD({class: "memberLabelCell", _repObject: "$member"}, "$member|getChildColumn")
    		  ),

    		loop:
    		  FOR("member", "$members", TAG("$childrow", {member: "$member"})),
    		  
    		getParentColumn : function(member) {
    	      if (selected_toolbar_button == "Duplicate HREF") return member.duplicate_href;
    	      else return member.duplicate_name;
    	      
      		},
      		
      		getChildColumn : function(member) {
      	      if (selected_toolbar_button == "Duplicate HREF") return member.duplicate_name;
      	      else return member.duplicate_href;
      	      
        	},
      		
      		

    		/**
    		 * @ function memberIterator
    		 * 
    		 * @desc iterate 
    		 */
    		memberIterator: function(object) {
    		  
    		  return this.getMembers(object);
    		},
    			  
    		/**
    		 * @function getMembers
    		 * 
    		 * @desc return array of abbreviation property values to loop through the row constructor 
    		 */
    		getMembers: function(object, level) {

    		  if (!level) level = 0;
    	      
    		  var members = [];
    				
    		  for (var p in object) members.push(this.createMember(p, object[p], level));
    		  FBTrace.sysout("members: ", members);
    		  return members;
    		},

    		/**
    		 * @function createMember
    		 * 
    		 * @desc create an object of display properties to loop through the row and childrow constructors 
    		 */
    		createMember: function(name, value, level)  {
    		  FBTrace.sysout("value: ", value);
    		  if (level == 0) {  
    			
    			return {
    			  //role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
    			  hasDuplicates: (value.link_elements.length > 0 ) ? true : false, 
    			  duplicates: value.link_elements,
    			  value: (value.link_elements != null) ? value.link_elements : "",
    			  level: level,
    			  indent: level * 16,
    			  number: value.link_elements.length,
    			  duplicate_name: value.name,
    			  duplicate_href: value.href
    			};
    		  } else {
    					
    			return {
    		      //role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
    	          value: (value != null) ? value : "",
    	          level: level,
    	          indent: level * 16,
    	          duplicate_name: value.name,
    	          duplicate_href: value.href
    	        };	
    		  }
    		},
    		
    		/**
    		 * @function onClick
    		 * 
    		 * @desc 
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
    	 
    		/**
    		 * @function isTreeRow
    		 * 
    		 * @desc check the node has a class treeRow
    		 */
    		isTreeRow: function(node) {
    		
    		  return hasClass(node, "treeRow");
    		},
    		
    		/**
    	     * @function onClickTreeRow
    	     * 
    	     * @desc helper function to call highlight
    	     * 
    	     * @param {Event} event - even triggered when a row is selected in a panel
    	     * @property {Object} selection - present selected row info to be passed to the side panel 
    	     */
    	    onClickTreeRow : function(event){
    	    	FBTrace.sysout("event", event);  
    	  
    		  panel.selection = Firebug.getRepObject(event.target);
    		  FBTrace.sysout("panel: zupzupzupz", panel);
    		  AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
    		},

    		/**
    		 * @function onKeyPressedRow
    		 * 
    		 * @desc show the focus on particular row when used keyboard event
    		 * 
    		 * @param event
    		 * 
    		 * @return focus on a row
    		 */
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
    		 * @param row to be closed
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
    		 * @param row row to open
    		 */
    		openRow: function(row) {
    				
    		  if (!hasClass(row, "opened")) {
    			var level = parseInt(row.getAttribute("level"));
    			setClass(row, "opened");
    			FBTrace.sysout("row: ", row);

    			var repObject = row.repObject;
    			FBTrace.sysout("rep: ", repObject);
    			if (repObject) {
    		      var members = this.getMembers(repObject.duplicates, level+1);
    					
    		      if (members) this.loop.insertRows({members: members}, row);
    			}
    		  }
    	    },
    		

    	    /**
    	     * @function toggleRow
    	     * 
    	     * @desc close the row if it is open and vice versa
    	     * 
    	     * @param row row either closed or opened
    	     */
    		toggleRow: function(row) {
     			FBTrace.sysout("row in toggle: ", row);
	
    		  if (hasClass(row, "opened")) {
    		    this.closeRow(row);
    		  } else {
    		    this.openRow(row);
    		  }
    	    }
    	  });
};