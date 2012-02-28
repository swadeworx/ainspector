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

  panel : null;
  list_of_all_elements: null;
  tree_of_all_elements: null;

  AINSPECTOR_FB.elementsView = {  

	/**
	 * @function allElementsPanelView
	 * 
	 * @desc
	 * 
	 * @param head_land_toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cache_object
	 */
	allElementsPanelView : function(toolbar_buttons, toolbar, panelView, cache_object) {

	tree_of_all_elements = cache_object.dom_cache.element_cache.child_dom_elements;
	list_of_all_elements = cache_object.dom_cache.element_cache.dom_elements;

	AINSPECTOR_FB.elementsView.elementsToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.elementsView.elementsToolbarPlate);
	// toolbar.style.display = "block";

	var element = panelView.document.createElement("div");
	element.style.display = "block";
	panelView.panelNode.id = "ainspector-panel"; 
	panelView.panelNode.appendChild(toolbar);
	panelView.panelNode.appendChild(element);

	panel = panelView;

	panel.table = AINSPECTOR_FB.elementsView.elementsTreeTemplate.tag.append( {object: tree_of_all_elements}, panel.panelNode, AINSPECTOR_FB.elementsView.elementsTreeTemplate);
	this.select(tree_of_all_elements[0]);
	Firebug.currentContext.getPanel('Rules').showContrastOrAllElements(true, tree_of_all_elements[0]);
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
 * @domplate headingsToolbarPlate
 * 
 * @desc template creates the content for navigation button
 */
AINSPECTOR_FB.elementsView.elementsToolbarPlate = domplate({
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
	var node;
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
		node = node.repObject.node;

	} else {
		table = getChildByClass(event.target.offsetParent, "domTable");
		//row = getChildByClass(event.target.offsetParent, "treeRow");
		var rows = table.rows;
		tbody = table.children[1];

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
		node = node.repObject.node;
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
		panel.table = AINSPECTOR_FB.elementsView.elementsTreeTemplate.tag.append( {object: tree_of_all_elements}, panel.panelNode, AINSPECTOR_FB.elementsView.elementsTreeTemplate);
		AINSPECTOR_FB.elementsView.select(tree_of_all_elements[0]);

		Firebug.currentContext.getPanel('Rules').showContrastOrAllElements(true, tree_of_all_elements[0]);

	} else {
		panel.table = AINSPECTOR_FB.elementsView.elementsTemplate.tableTag.append( {list_of_all_elements: list_of_all_elements}, panel.panelNode, AINSPECTOR_FB.elementsView.elementsTemplate);
		AINSPECTOR_FB.elementsView.select(list_of_all_elements[0]);

		Firebug.currentContext.getPanel('Rules').showContrastOrAllElements(true, list_of_all_elements[0]);
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
		// this.showOnSelectButton(category);
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
AINSPECTOR_FB.elementsView.elementsTreeTemplate = domplate({
	
  tag:
	TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	  THEAD(
		TR({class: "gridHeaderRow ", id: "tableTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
		  TH({class: "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
		  TH({class: "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "ID")),
		  TH({class: "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Class")),
		  TH({class: "gridHeaderCell gridCell", id: "headRoleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Role")),
		  TH({class: "gridHeaderCell gridCell", id: "headRoleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Events")),
		  TH({class: "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
		) //end TR
	  ), //end THEAD
	  TBODY(
	  	FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
	  )
	),

	row:
	  TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	    level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$onClickTreeRow"},
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		   TAG("$member.tag", {'member' :"$member", 'object': "$member"})
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			"$member.id"
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		   "$member.name"
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		   "$member.role"
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		   "$member.events"
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"})
		)
	),
	
	strTag : DIV({class: "treeLabel"}, "$member.element"),
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

	for (var p in object) {
	  if (object[p].type != 3) //to avoid nosetype 3 (text nodes) on the panel
	    members.push(this.createMember(p, object[p], level));
	}
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
	var acc = "";
    if (typeof value.getAccessibility === 'function') acc = value.getAccessibility();

  return {
    hasChildren: value.has_element_children, 
	children: value.child_dom_elements,
	value: (value != null) ? value : "",
	level: level,
	indent: level * 16,
	tag: this.strTag,
	element:value.tag_name,
	id: value.id,
	name: value.className, //name,
	role: (value.role != undefined) ? value.role : "",
	events: value.hasEvents(),
	tag : this.strTag,
	acc_summary: acc.label,
    sevTag: this.getAccessibility(value)
  };
},

getAccessibility : function(object){
	var severity =  object.getAccessibility().label;
	var styleSeverityTag;
	if (severity == "Pass")  styleSeverityTag = this.strTagPass;
	if (severity == "Violation") styleSeverityTag = this.strTagViolation;
	if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
	if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
	if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
	if (severity == "Information") styleSeverityTag = this.strTagInfo;
	if (severity == "Warning") styleSeverityTag = this.strTagWarn;
	
	return styleSeverityTag;
}


});


/**
 * @Domplate elementsTemplate
 * 
 * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
 * 
 * @return flat list of images to be displayed on the panel
 */
AINSPECTOR_FB.elementsView.elementsTemplate = domplate({
  
	  tableTag:
    
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
      THEAD(
        TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "lmElementHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
            TH({class: "gridHeaderCell gridCell", id: "lmOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "ID")),
            TH({class: "gridHeaderCell gridCell", id: "lmRoleHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Class")),
            TH({class: "gridHeaderCell gridCell", id: "lmOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Role")),
            TH({class: "gridHeaderCell gridCell", id: "lmOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Events")),
            TH({class: "gridHeaderCell gridCell", id: "lmNameHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
        ) //end TR
      ), //end THEAD
      TBODY(
        FOR("object", "$list_of_all_elements",
          TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$onClickRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
		    TD({class: "imgEleCol gridCell gridCol ",  id:"eleCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
	          DIV({class: "gridContent", _repObject:"$object"}, "$object.tag_name")
	        ),
            TD({class: "imgTextCol gridCell gridCol ",  id:"eleIdCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object.id")
            ),
            TD({class: "imgSourceCol gridCell gridCol ", id: "eleClasstCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object.class_name|getValue")
            ),
            TD({class: "imgOrderCol gridCell gridCol", id:"eleRoleCol" , role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object|getRole")
            ),
            TD({class: "imgOrderCol gridCell gridCol", id:"eleEventsCol" , role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object|getEvents")
            ),
            TD({class: "imgSourceCol gridCell gridCol ", id: "eleSumCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	DIV({class: "gridContent", _repObject:"$object"}, TAG("$object|getAccessibility", {'object': '$object'}))
            )
          )//end TR   
        ) //end FOR
      )// end TBODY
    ), // end inner TABLE
   
    strTagPass : DIV({class: "passMsgTxt"}, "$object|getSummary"),
    strTagViolation : DIV({class: "violationMsgTxt"}, "$object|getSummary"),
    strTagManual : DIV({class: "manualMsgTxt"}, "$object|getSummary"),
    strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object|getSummary"),
    strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$object|getSummary"),
    strTagInfo : DIV({class: "infoMsgTxt"}, "$object|getSummary"),
    strTagWarn : DIV({class: "warnMsgTxt"}, "$object|getSummary"),
    
    getEvents : function(object) {
	
	  return object.hasEvents();
	},
	
	getRole : function(object){
	  if (object.role == undefined) return "";
	  else return object.role;
	},
    /**
     * @function getValue
     * 
     * @desc returns empty String if the property is null
     * 
     * @param {String} property - cell value to display on panel
     * 
     * @return property / ""
     */
    getValue : function(property) {
	
	  if (property) return property;
	  else return "";
	},
    
    /**
     * @function onClick
     * 
     * @desc helper function to call highlight
     * 
     * @param {Event} event - even triggered when a row is selected in a panel
     * @property {Object} selection - present selected row info to be passed to the side panel 
     */
    onClickRow : function(event){
  	  
	    panel.selection = Firebug.getRepObject(event.target);
	    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event);
    },
    
    getAccessibility : function(object){
    	var severity =  object.getAccessibility().label;
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
      
      getSummary : function(object){
    	return object.getAccessibility().label;
      }
  });
}

