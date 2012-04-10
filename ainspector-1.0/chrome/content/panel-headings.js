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
  heading_elements: null;
  child_elements: null;
  title_main_elements: null;
  elements_with_content: null;
  head_land_toolbar_buttons: null;

  AINSPECTOR_FB.headLandmarks = {  

	/**
	 * @function viewPanel
	 * 
	 * @desc
	 * 
	 * @param context
	 * @param panel_name
	 * @param cache_object
	 */
	viewPanel : function(context, panel_name, cache_object) {
	  AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false);
	  if (!panel_name) panel_name = "AInspector";
	  //if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
	  
 	  if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

	  panel = context.getPanel(panel_name, true);
	 
	  /* Clear the panel before writing anything onto the report*/
      if (panel) {
      	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
      }
      
      head_land_toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.headings.tree"), selected: true, first:true},
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.titleMain")}, 
                                   {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.noLandmark")}];
      
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
		
	var head_land_cache = cache_object.dom_cache.headings_landmarks_cache;
	child_elements = head_land_cache.child_cache_elements;
	elements_with_content = head_land_cache.elements_with_content;
	heading_elements = head_land_cache.heading_elements;
	title_main_elements = cache_object.dom_cache.title_main_cache.main_elements;

	AINSPECTOR_FB.headLandmarks.headingsToolbarPlate.toolbar.replace({head_land_toolbar_buttons : head_land_toolbar_buttons, preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.headLandmarks.headingsToolbarPlate);
	// toolbar.style.display = "block";

	var element = panel.document.createElement("div");
	element.style.display = "block";

	panel.panelNode.id = "ainspector-panel"; 
	panel.panelNode.appendChild(toolbar);
	panel.panelNode.appendChild(element);

	panel.table = AINSPECTOR_FB.headLandmarks.headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.headLandmarks.headingsTreeTemplate);
	this.select(child_elements[0]);
	Firebug.currentContext.getPanel('rulesSidePanel').sView(true, child_elements[0]);
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
AINSPECTOR_FB.headLandmarks.headingsToolbarPlate = domplate({
	toolbar : DIV( {class : "nav-menu"},
			TAG("$toolbarButtons", {toolbar_buttons : "$head_land_toolbar_buttons"}),
			BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" ),
			SPAN({class: "ruleset_select"}, "Ruleset:  "),
            SPAN({class: "ruleset_value"}, "$preferences.ruleset_id"),
            SPAN({class: "ruleset_level"}, " Level:  "),
            SPAN({class: "ruleset_value"}, "$preferences.wcag20_level|getLevel")

	), 

	toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "toolbarbutton views"},
			FOR("obj", "$toolbar_buttons",
					LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", 
						role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
						"$obj.name"
					)//end LI
			)//end for

	),

	/**
     * @function getLevel
     * 
     * @desc
     */
    getLevel : function (level){
	
	   if (level == 1) return "Level A (lowest level of accessibility)";
	   else if (level == 2) return "Level A & AA";
	   else return "Level A, AA & AAA (highest level of accessibility)";
		   
    },
    
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
		if (table.children.length > 0) {
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
			node = event.target.offsetParent.ownerPanel.selection.dom_element.node;
		}

	} else {
		table = getChildByClass(event.target.offsetParent, "domTable");
		
		//If the same domplate is shared by two views, rows/children of the second view(in this case list and tree views)
		//are not shown in the event. So, we take the dom_element from the selection object we set on the ownerPanel of event
		if (table.rows && table.rows.length != 0) {
		var rows = table.rows;

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
  //this.showOnSelectButton(toolbar_button);
},

/**
 * @function showOnSelectButton
 * 
 * @desc show the selected toolbar button with a focus on it
 * 
 * @param toolbar_button_id
 */
showOnSelectButton : function(toolbar_button_id) {
    this.viewContainer.append({}, panel.table, this);
	clearNode(panel.table);  // clear the content of the panel 
	clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
	if (toolbar_button_id == "Tree View") {
		panel.table = AINSPECTOR_FB.headLandmarks.headingsTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.headLandmarks.headingsTreeTemplate);
		AINSPECTOR_FB.headLandmarks.select(child_elements[0]);

		Firebug.currentContext.getPanel('rulesSidePanel').sView(true, child_elements[0]);

	} else if (toolbar_button_id == "Title/Main/H1"){
		panel.table = AINSPECTOR_FB.headLandmarks.headingsTreeTemplate.tag.append( {object: title_main_elements}, panel.panelNode, AINSPECTOR_FB.headLandmarks.headingsTreeTemplate);
		AINSPECTOR_FB.headLandmarks.select(title_main_elements[0]);
		Firebug.currentContext.getPanel('rulesSidePanel').sView(true, title_main_elements[0]);
	} else if (toolbar_button_id == "Not in Landmark"){
		panel.table = AINSPECTOR_FB.headLandmarks.noLandmarksTemplate.tableTag.append( {elements_with_content: elements_with_content}, panel.panelNode, null);
		AINSPECTOR_FB.headLandmarks.select(elements_with_content[0]);
		Firebug.currentContext.getPanel('rulesSidePanel').sView(true, elements_with_content[0]);
    } else {
    
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
	//var category = getClassValue(elem, "toolbarButtonView");
	var category = elem.id;
    //FBTrace.sysout("category: "+ category);

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
AINSPECTOR_FB.headLandmarks.headingsTreeTemplate = domplate({
	
  tag:
	TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	  THEAD(
		TR({class: "gridHeaderRow a11yFocus", id: "tableTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
		  TH({class: "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
		  TH({class: "gridHeaderCell gridCell", id: "headRoleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Role/Level")),
		  TH({class: "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Name")),
		  TH({class: "gridHeaderCell gridCell", id: "headNameCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
		) //end TR
	  ), //end THEAD
	  TBODY(
	  	FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
	  ) //end TBODY
	), //end TABLE

	row:
	  TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	    level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$onClickTreeRow"},
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  TAG("$member.tag", {'member' :"$member", 'object': "$member"})
		),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		 "$member.role_level"),
		TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.text"),
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
    var acc = value.dom_element.getAccessibility();

	return {
	  name: value.dom_element.tag_name, //name,
	  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
	  text: (value.dom_element.role) ? (value.label) : value.name,
	  hasChildren: this.hasChildElements(value), 
	  children: this.getChildrenEle(value),
	  value: (value != null) ? value : "",
	  label: (value.dom_element.children != null) ? "" : value,
	  level: level,
	  indent: level*2,
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
 * @Domplate noLandmarksTemplate
 * 
 * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
 * 
 * @return flat list of images to be displayed on the panel
 */
AINSPECTOR_FB.headLandmarks.noLandmarksTemplate = domplate({
  
	  tableTag:
    
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
      THEAD(
        TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "lmElementHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
            TH({class: "gridHeaderCell gridCell", id: "lmNameHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Content")),
            TH({class: "gridHeaderCell gridCell", id: "lmOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell", title: "Accessibility Summary"}, DIV({class: "gridHeaderCellBox"}, "A11y"))
        ) //end TR
      ), //end THEAD
      TBODY(
        FOR("object", "$elements_with_content",
          TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$onClickRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
            TD({class: "gridCell gridCol ", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object|getTagName")
            ),
            TD({class: "gridCell gridCol ", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object|getText")
            ),
            TD({class: "gridCell gridCol ", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object", title: "$object.source"}, TAG("$object|getAccessibility", {'object': '$object'}))
            )
          )//end TR   
        ) //end FOR
      )// end TBODY
    ), // end inner TABLE
    
    getTagName : function(object){
	  if (object.hasOwnProperty("tag_name") && object.tag_name) return object.tag_name;
	  else return object.parent_element.tag_name;
	},
	
	getText: function(object){
	  if (object.hasOwnProperty("text") && object.text) return 	AINSPECTOR_FB.ainspectorUtil.truncateText(object.text);
	  return "";
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
    
    strTagPass : DIV({class: "passMsgTxt"}, "$object|getSummary"),
    strTagViolation : DIV({class: "violationMsgTxt"}, "$object|getSummary"),
    strTagManual : DIV({class: "manualMsgTxt"}, "$object|getSummary"),
    strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object|getSummary"),
    strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$object|getSummary"),
    strTagInfo : DIV({class: "infoMsgTxt"}, "$object|getSummary"),
    strTagWarn : DIV({class: "warnMsgTxt"}, "$object|getSummary"),
    
    getAccessibility : function(object){
	  var severity =  object.getAccessibility().label;
	  
	  var styleSeverityTag;
	  
	  if (severity == "Pass")  styleSeverityTag = this.strTagPass;
	  else if (severity == "Violation") styleSeverityTag = this.strTagViolation;
	  else if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
	  else if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
	  else if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
	  else if (severity == "Information") styleSeverityTag = this.strTagInfo;
	  else styleSeverityTag = this.strTagWarn;

	  return styleSeverityTag;
    },
  
    getSummary : function(object){
	  return object.getAccessibility().label;
    }
  });





/**
 * @Domplate imagesTemplate
 * 
 * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
 * 
 * @return flat list of images to be displayed on the panel
 */
AINSPECTOR_FB.headLandmarks.headingsTemplate = domplate({
  
	  tableTag:
    
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
      THEAD(
        TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "headOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
            TH({class: "gridHeaderCell gridCell", id: "headLevelHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Level")),
            TH({class: "gridHeaderCell gridCell", id: "headNameHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Name")),
            TH({class: "gridHeaderCell gridCell", id: "headNameHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
        ) //end TR
      ), //end THEAD
      TBODY(
        FOR("object", "$heading_elements",
          TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$AINSPECTOR_FB.headLandmarks.landmarksTemplate.onClickRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
            TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object.dom_element.tag_name")
            ),
            TD({class: "imgEleCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object"}, "$object.level")
            ),
            TD({class: "imgSourceCol gridCell gridCol ", id: "imgTextCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object", title: "$object.source"}, "$object.name")
            ),
            TD({class: "imgSourceCol gridCell gridCol ", id: "imgTextCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
              DIV({class: "gridContent", _repObject:"$object", title: "$object.source"}, TAG("$object|getAccessibility", {'object': '$object'}))
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
    
    getAccessibility : function(object){
	  
	  var severity =  object.dom_element.getAccessibility().label;
	  var styleSeverityTag;
	  
	  if (severity == "Pass")  styleSeverityTag = this.strTagPass;
	  else if (severity == "Violation") styleSeverityTag = this.strTagViolation;
	  else if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
	  else if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
	  else if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
	  else if (severity == "Information") styleSeverityTag = this.strTagInfo;
	  else styleSeverityTag = this.strTagWarn;

	  return styleSeverityTag;
    },
  
    getSummary : function(object){
	  return object.dom_element.getAccessibility().label;
    }
  });
}

