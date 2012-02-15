var AINSPECTOR_FB = AINSPECTOR_FB || {};	

with (FBL) {

  panel : null;
  child_elements: null;
  control_elements: null;
  label_elements: null;
  
  AINSPECTOR_FB.controls = {
    
    /**
	 * @function controlsView
	 * 
	 * @desc
	 * 
	 * @param {Array} toolbar_buttons - buttons to show on a toolbar
	 * @param {Object} toolbar - dom element created to hold the content of the panel. will append to the panel
	 * @param {Object} panelView - panel
	 * @param {Object} cache_object - container for image, media and abbreviation element properties
	 * 
	 */
    controlsView : function(toolbar_buttons, toolbar, panelView, cache_object) {
	  
	  var controls_cache = cache_object.dom_cache.controls_cache;
	  control_elements = controls_cache.control_elements;
      child_elements = controls_cache.child_cache_elements;
      label_elements = controls_cache.label_elements;

	  AINSPECTOR_FB.controls.controlToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.controls.controlToolbarPlate);
	  //toolbar.style.display = "block";
	  
	  var element = panelView.document.createElement("div");
	  element.style.display = "block";
	  
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	  panelView.panelNode.appendChild(element);
	  
	  
	  FBTrace.sysout("panelView: ", panelView);
	  FBTrace.sysout("controlsView: ", cache_object);
	        
	  panel = panelView;
	  panel.table = AINSPECTOR_FB.controls.controlTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.controls.controlTreeTemplate);

	  this.select(child_elements[0]);

	  Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);
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
}; //end of imageObject  

  
  
  
  /**
   * controlToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  AINSPECTOR_FB.controls.controlToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "toolbarbutton views"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", 
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

    /**
     * onClick
     * 
     * @desc
     * 
     * @param event
     */
    onClick : function(event) {
      var toolbar_button = event.currentTarget.id;
      this.showOnSelectButton(toolbar_button);
    },

    /**
     * @function showOnSelectButton
     * 
     * @desc show the selected toolbar button with a focus on it
     * 
     * @param toolbar_button_id id of the toolbar to be selected
     */
    showOnSelectButton : function(toolbar_button_id) {

    	clearNode(panel.table);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        FBTrace.sysout("toolbar_button_id: " + toolbar_button_id);
        if (toolbar_button_id == "Tree View") {
   		  panel.table = AINSPECTOR_FB.controls.controlTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.controls.controlTreeTemplate);
   		  AINSPECTOR_FB.controls.select(child_elements[0]);
   		  Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);
        
        } else if (toolbar_button_id == "Labels") {
          FBTrace.sysout("inside labels: ", label_elements);	
      	  panel.table = AINSPECTOR_FB.controls.controlFlatListTemplate.tableTag.append( {elements: label_elements}, panel.panelNode, null);
		  AINSPECTOR_FB.controls.select(label_elements[0]);
      	  Firebug.currentContext.getPanel('Rules').sView(true, label_elements[0]);
        } else {
          panel.table = AINSPECTOR_FB.controls.controlFlatListTemplate.tableTag.append( {elements: control_elements}, panel.panelNode, null);
          AINSPECTOR_FB.controls.select(control_elements[0]);
          Firebug.currentContext.getPanel('Rules').sView(true, control_elements[0]);
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
   * controlFlatListTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the  toolbar button
   * 

   */
  AINSPECTOR_FB.controls.controlFlatListTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "controlTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
            TH({"class": "gridHeaderCell gridCell", id: "labelEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Element")),
            TH({"class": "gridHeaderCell gridCell", id: "labelTypeCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Type")),
            TH({"class": "gridHeaderCell gridCell", id: "labelCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Label"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$elements",
            TR({"class": "tableRow a11yFocus gridRow", "role": "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$highlightRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
    		  TD({"class": "labelEleCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),  
              TD({"class": "labelTypeCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.type")
              ),
              TD({"class": "labelsCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.label")
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      highlightRow : function(event){
	    panel.selection = Firebug.getRepObject(event.target);
	    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event); 
      }
    });
  
  /**
   * controlTreeTemplate
   */
  AINSPECTOR_FB.controls.controlTreeTemplate = domplate({
	    tag:
		  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
		    THEAD(
			  TR({"class": "gridHeaderRow a11yFocus", id: "tableTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
			    TH({"class": "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Element")),
			    TH({"class": "gridHeaderCell gridCell", id: "headRoleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Type")),
			    TH({"class": "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Label"))
			  ) //end TR
			), //end THEAD
			TBODY(
			  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
			)
		  ),
	    
		  row:
		    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
		    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightTreeRow"},
			  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
			    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
			  ),
			  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
				"$member.type"),
	  		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.label")
		    ),

	      strTag : DIV({class: "treeLabel"},"$member.name"),

		  loop:
		    FOR("member", "$members", TAG("$row", {member: "$member"})),

		  memberIterator: function(object) {
		    return this.getMembers(object);
		  },
		  
		  highlightTreeRow : function(event){
			panel.selection = Firebug.getRep(event.target);
			AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
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
		      label: value.label,
		      type: value.type,
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

  }