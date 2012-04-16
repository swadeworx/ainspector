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
  language_elements: null;
  abbreviation_elements: null;

  AINSPECTOR_FB.abbrLanguage = {
		  
  /**
   * @function viewPanel 
   * 
   * @desc
   * 
   * @param {Array} toolbar_buttons - buttons to show on a toolbar
   * @param {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @param {Object} panel - panel 
   * @param {Object} cache_object - container for image, media and abbreviation element properties
   * 
   */
  viewPanel : function(context, panel_name, cache_object) {
	        
	if (!panel_name) panel_name = "AInspector";
	//if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
	if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

	AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false);
	
    panel = context.getPanel(panel_name, true);

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
     	clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
    }
    
    var toolbar_buttons = [
        {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.abbr.abbreviationTab"), selected: true, first:true},
        {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.abbr.languageTab")}];
        
    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
	abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_items;
    language_elements = cache_object.dom_cache.languages_cache.language_items;
    var is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(abbreviation_elements);

	AINSPECTOR_FB.abbrLanguage.abbrToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons, preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.abbrLanguage.abbrToolbarPlate);
	
	  
	var element = panel.document.createElement("div");
	element.style.display = "block";
	  
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
	  
	  panel = panel;
	  if (is_empty_object == true) {
        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Abbreviation", "Title", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
    	Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

	  } else {
	    panel.table = AINSPECTOR_FB.abbrLanguage.abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, AINSPECTOR_FB.abbrLanguage.abbreviationTemplate);
	    this.select(abbreviation_elements[0]);
	    Firebug.currentContext.getPanel('rulesSidePanel').sView(true, abbreviation_elements[0]);
	  }
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
  }; //end of abbrLanguage
  
  /**
   * @function abbrToolbarPlate
   * 
   * @desc template creates a Tool bar in ainpector panel 
   */
  AINSPECTOR_FB.abbrLanguage.abbrToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" ),
                SPAN({class: "ruleset_select"}, "Ruleset:  "),
                SPAN({class: "ruleset_value"}, "$preferences.ruleset_id|AINSPECTOR_FB.toolbarUtil.getRulesetTitle"),
                SPAN({class: "ruleset_level"}, " Level:  "),
                SPAN({class: "ruleset_value"}, "$preferences.wcag20_level|AINSPECTOR_FB.toolbarUtil.getLevel")
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
     * @param event event triggered on a row/cell of a Abbrev/Language toolbar buttons
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
		tbody = table.children[0];

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
      
//      node = node.repObject.dom_element.node;
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

      clearNode(panel.table);  // clear the content of the panel 
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
      var is_empty_object;
 
      if (toolbar_button_id == "Language") {
   	    is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(language_elements);
   	    if (is_empty_object) {
   	        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Language", "Text", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
   	  	    Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

   	    } else {
   	        panel.table = AINSPECTOR_FB.abbrLanguage.languageTemplate.tableTag.append( {language_elements: language_elements}, panel.panelNode, AINSPECTOR_FB.abbrLanguage.languageTemplate);
   	        AINSPECTOR_FB.abbrLanguage.select(language_elements[0]);

   	    	Firebug.currentContext.getPanel('rulesSidePanel').sView(true, language_elements[0]);   	    	
   	    }

      } else {
   	    is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(abbreviation_elements);
   	    if (is_empty_object) {
   	        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Abbreviation", "Title", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
   	  	    Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

   	    } else {
   	    	panel.table = AINSPECTOR_FB.abbrLanguage.abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, AINSPECTOR_FB.abbrLanguage.abbreviationTemplate);
   	        AINSPECTOR_FB.abbrLanguage.select(abbreviation_elements[0]);

   	        Firebug.currentContext.getPanel('rulesSidePanel').sView(true, abbreviation_elements[0]);
   	    	
   	    }

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
   * @Domplate languageTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
   * 
   * @return flat list of images to be displayed on the panel
   */
  AINSPECTOR_FB.abbrLanguage.languageTemplate = domplate({
    
	  tableTag:
      
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell gridCell", id: "imgElementHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Language")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Text")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
              
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$language_elements",
            TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$highlightRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "imgEleCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.count")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", id: "imgTextCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object", title: "$object.source"}, "$object.lang")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, " ")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	TAG("$object|getAccessibility", {'object': '$object'}))
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
        
        getSummary : function(object){
      	return object.dom_element.getAccessibility().label;
        }
    });
  
  
  
  /**
   * @Domplate abbreviationTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return Two level tree to be displayed on the panel
   */
  AINSPECTOR_FB.abbrLanguage.abbreviationTemplate = domplate({
    
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
		THEAD(
	      TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
	        TH({class: "gridHeaderCell gridCell", id: "abbrEleCol"}, DIV({class: "gridHeaderCellBox"}, "Element")),
	        TH({class: "gridHeaderCell gridCell", id: "abbrCol"}, DIV({class: "gridHeaderCellBox"}, "Abbreviation")),
	        TH({class: "gridHeaderCell gridCell", id: "abbrTitleCol"}, DIV({class: "gridHeaderCellBox"}, "Title")),
            TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
	      ) //end TR
		), //end THEAD
		TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)//end TBODY
	  ), //end TABLE
	    
	row:
	  TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$onClickTreeRow"},
	    TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
              TAG("$member.tag", {'member' :"$member", 'object': "$member"})
	    ),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  "$member.abbreviation_text|getValue"
		)
	  ),
	
	childrow:
	  TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$onClickTreeRow"},
	    TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  "$member.tagname"
	    ),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  "$member.abbreviation_text|getValue"
		),
		TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.title"),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		  TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
	  ),
	  
	strTag : DIV({class: "treeLabel"},"$member.length"), 
	strTagPass : DIV({class: "passMsgTxt"}, "$member.acc_summary"),
    strTagViolation : DIV({class: "violationMsgTxt"}, "$member.acc_summary"),
    strTagManual : DIV({class: "manualMsgTxt"}, "$member.acc_summary"),
    strTagHidden : DIV({class: "hiddenMsgTxt"}, "$member.acc_summary"),
    strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$member.acc_summary"),
    strTagInfo : DIV({class: "infoMsgTxt"}, "$member.acc_summary"),
    strTagWarn : DIV({class: "warnMsgTxt"}, "$member.acc_summary"),

	loop:
	  FOR("member", "$members", TAG("$childrow", {member: "$member"})),
	  
	getValue : function(property){
	  if (property) return property;
	  else return "";
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
		    	  
	  panel.selection = Firebug.getRepObject(event.target);
	  AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
	  
	  
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

	  return members;
	},

	/**
	 * @function createMember
	 * 
	 * @desc create an object of display properties to loop through the row and childrow constructors 
	 */
	createMember: function(name, value, level)  {
	  
	   
	  if (level == 0) {  
		
		return {
		  //role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
		  hasChildren: (value.dom_elements) ? true : false, 
		  children: value.dom_elements,
		  value: (value != null) ? value : "",
		  level: level,
		  indent: level * 16,
		  length: value.count,
		  abbreviation_text: value.abbreviation_text,
		  tag: this.strTag
		};
	  } else {
		var acc = value.getAccessibility();		
		return {
		  tagname: value.tag_name, //name,
	      //role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
          hasChildren: value.has_element_children, 
          children: value.dom_elements,
          value: (value != null) ? value : "",
          level: level,
          indent: level * 16,
          title: value.title,
	      tag: this.strTag,
	      acc_summary: acc.label,
	      sevTag: this.getAccessibility(value)
        };	
	  }
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
      var k;
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
     * @desc close the row if it is open and vice versa
     * 
     * @param row row either closed or opened
     */
	toggleRow: function(row) {

	  if (hasClass(row, "opened")) {
	    this.closeRow(row);
	  } else {
	    this.openRow(row);
	  }
    }
  });

  }