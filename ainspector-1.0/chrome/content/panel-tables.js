var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
	  
  panel : null;
  child_elements: null;
  table_elements: null;
 
  AINSPECTOR_FB.tables = {  
	      
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
	 tablesPanelView : function(toolbar_buttons, toolbar, panelView, cache_object) {
	        
      var tables_cache = cache_object.dom_cache.tables_cache; 
      
      table_elements = tables_cache.table_elements;
      child_elements = tables_cache.child_cache_elements;

      AINSPECTOR_FB.tables.tablesToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.tables.tablesToolbarPlate);
	  //toolbar.style.display = "block";
       var element = panelView.document.createElement("div");
	  element.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
          panelView.panelNode.appendChild(element);
	        
	  panel = panelView;



	  panel.table = AINSPECTOR_FB.tables.tablesTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.tables.tablesTreeTemplate);
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
 };

  /**
   * imageToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  AINSPECTOR_FB.tables.tablesToolbarPlate = domplate({
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

		var rows = table.rows;
		//tbody = table.children[0];
		//If the same domplate is shared by two views, rows/children of the second view(in this case list and tree views)
		//are not shown in the event. So, we take the dom_element from the selection object we set on the ownerPanel of event 
		if (table.rows && table.rows.length > 0) {
		  for (var i = 0; i < rows.length; i++) {
			var flag = false;
			var row = rows[i];//tbody.children[i];
			node = row;
			for (var k=0; k<row.classList.length;k++) {

				if (row.classList[k] ==  "gridRowSelected") {
					flag = true;
					break;
				}//end if
			}//end for

			if (flag == true) break;
	 	  }
		  node = node.repObject.dom_element.node;
	  
	  } else {
		node = event.target.offsetParent.ownerPanel.selection.dom_element.node;
	  }
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
    showOnSelectButton : function(toolbar_button_id) {

    	clearNode(panel.table);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        if (toolbar_button_id == "Tree View") {
    	  panel.table = AINSPECTOR_FB.tables.tablesTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.tables.tablesTreeTemplate);
    	  AINSPECTOR_FB.tables.select(child_elements[0]);
    	  Firebug.currentContext.getPanel('Rules').sView(true, child_elements[0]);
        
        } else if (toolbar_button_id == "List View") {
          panel.table = AINSPECTOR_FB.tables.tablesTreeTemplate.tag.append( {object: table_elements}, panel.panelNode, AINSPECTOR_FB.tables.tablesTreeTemplate);
      	  AINSPECTOR_FB.tables.select(table_elements[0]);
      	  Firebug.currentContext.getPanel('Rules').sView(true, table_elements[0]);
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
        //this.showOnSelectButton(category);
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
    
    viewContainer : DIV({style : "display:none"})
});

  AINSPECTOR_FB.tables.tablesTreeTemplate = domplate({
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    THEAD(
	      TR({class: "gridHeaderRow a11yFocus", id: "tableTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
	        TH({class: "gridHeaderCell gridCell", id: "tableTagCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Tag")),
	        TH({class: "gridHeaderCell gridCell", id: "tableInfoCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Information")),
	        TH({class: "gridHeaderCell gridCell", id: "tableInfoCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
	      ) //end TR
	    ), //end THEAD
	    TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
    
	  row:
	    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$onClickTreeRow"},
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
		  ),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.information"),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
	    ),

      strTag : DIV({class: "treeLabel"},"$member.name"),
      strTagPass : DIV({class: "passMsgTxt"}, "$member.acc_summary"),
      strTagViolation : DIV({class: "violationMsgTxt"}, "$member.acc_summary"),
      strTagManual : DIV({class: "manualMsgTxt"}, "$member.acc_summary"),
      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$member.acc_summary"),
      strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$member.acc_summary"),
      strTagInfo : DIV({class: "infoMsgTxt"}, "$member.acc_summary"),
      strTagWarn : DIV({class: "warnMsgTxt"}, "$member.acc_summary"),

	loop:
	  FOR("member", "$members", TAG("$row", {member: "$member"})),
		
	/**
     * @function onClickTreeRow
     * 
     * @desc helper function to call highlight
     * 
     * @param {Event} event - even triggered when a row is selected in a panel
     * @property {Object} selection - present selected row info to be passed to the side panel 
     */
    onClickTreeRow : function(event){
		    	  
	  panel.selection = Firebug.getRepObject(event.target);
	  AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
	  
	  
	},

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

    /**
     * @function isTreeRow
     * 
     * @param {Object} node
     */
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
		  var repObject = row.newObject;
			
		  if (repObject) {
            var members = this.getMembers(repObject.children, level+1);
			
            if (members) this.loop.insertRows({members: members}, row);
		  }
		}
	  },
	  
	  highlightTreeRow : function(event){
		panel.selection = Firebug.getRep(event.target);
		AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
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
	    var acc = value.dom_element.getAccessibility();
		return {
		  name: value.dom_element.tag_name, //name,
		  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
		  text: (value.dom_element.role) ? (value.label) : value.name,
		  information: value.toString(),
	      hasChildren: this.hasChildElements(value), 
	      children: this.getChildrenEle(value),
	      value: (value != null) ? value : "",
	      label: (value.dom_element.children != null) ? "" : value,
	      level: level,
	      indent: level * 16,
	      tag: this.strTag,
	      acc_summary: acc.label,
	      sevTag: this.getAccessibility(value)
	    };
	  },
	  
	  getAccessibility : function(object){
		var severity =  object.dom_element.getAccessibility().label;
		var styleSeverityTag;
		if (severity == "Pass")  styleSeverityTag = this.strTagPass;
		if (severity == "Violation") styleSeverityTag = this.strTagViolation;
		if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
		if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
		if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
		if (severity == "Information") styleSeverityTag = this.strTagInfo;
		if (severity == "Warning") styleSeverityTag = this.strTagWarn;
		
		return styleSeverityTag;
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
	  
	  onClick_htmlView: function(event) {
		var head_landmark = event.target.headLandElement.value;
	    var node = head_landmark.dom_element.node;
	    var panel = Firebug.chrome.selectPanel("html");
	    panel.select(node);  
	  }
	  
	});
   
  }

