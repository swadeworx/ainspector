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
  child_elements: null;
  control_elements: null;
  label_elements: null;
  
  AINSPECTOR_FB.oldcontrols = {
    
    /**
	 * @function viewPanel
	 * 
	 * @desc
	 * 
	 * @param {Array} toolbar_buttons - buttons to show on a toolbar
	 * @param {Object} toolbar - dom element created to hold the content of the panel. will append to the panel
	 * @param {Object} panelView - panel
	 * @param {Object} cache_object - container for image, media and abbreviation element properties
	 * 
	 */
    viewPanel : function(context, panel_name, cache_object) {
	  AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false);
	  if (!panel_name) panel_name = "AInspector";
//	  if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
		if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

	  
	  panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
      }
      var toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls.tree"), selected: true, first:true},
                                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls.labels")}, 
                                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.controls")}];
                             
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";

	  var controls_cache = cache_object.dom_cache.controls_cache;
	  control_elements = controls_cache.control_elements;
      child_elements = controls_cache.child_cache_elements;
      label_elements = controls_cache.label_elements;
      var is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(child_elements);

	  AINSPECTOR_FB.oldcontrols.controlToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons, preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.oldcontrols.controlToolbarPlate);
	  //toolbar.style.display = "block";
	  
	  var element = panel.document.createElement("div");
	  element.style.display = "block";
	  
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
	  
	  if (is_empty_object) {
 	    panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Label", "Description", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
    	Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

	  } else {
	    panel.table = AINSPECTOR_FB.oldcontrols.controlTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.oldcontrols.controlTreeTemplate);
	    this.select(child_elements[0]);
	    Firebug.currentContext.getPanel('rulesSidePanel').sView(true, child_elements[0]);
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
}; //end of imageObject  

  /**
   * controlToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  AINSPECTOR_FB.oldcontrols.controlToolbarPlate = domplate({
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
      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
	  var row =  null;
	  var tbody = null;
      var child;
      
      var node = null;

	if (table) {
	  row = getChildByClass(event.target.offsetParent, "tableRow");
	  if (table.nextSibling && table.nextSibling.children.length > 0) { 
	    tbody = table.nextSibling.children[1];
	    var rows = tbody.children;
		for (var i = 0; i < rows.length; i++) {
	      var flag = false;
	      row = rows[i];
	      node = row;
	    
	      for (var j=0; j<row.classList.length;j++) {
	      
	    	if (row.classList[j] ==  "gridRowSelected") {
	          flag = true;
	          break;
	        }//end if
	      }//end for
	      if (flag == true) break;
	    }
	    node = node.repObject.dom_element.node;

	  }else {
		  node = event.target.offsetParent.ownerPanel.selection.dom_element.node;
	  }
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
		node = node.repObject.dom_element.node;
	}
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
     //this.showOnSelectButton(toolbar_button);
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
        clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
        var is_empty_object;
        
        if (toolbar_button_id == "Labels") {
            is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(label_elements); 

        	if (is_empty_object) {
       	    panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Label", "Description", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
          	Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

      	  } else {
            panel.table = AINSPECTOR_FB.oldcontrols.controlFlatListTemplate.tableTag.append( {elements: label_elements}, panel.panelNode, null);
		    AINSPECTOR_FB.oldcontrols.select(label_elements[0]);
      	    Firebug.currentContext.getPanel('rulesSidePanel').sView(true, label_elements[0]);
      	  }
        } else if (toolbar_button_id == "Controls"){
           is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(control_elements); 

          if (is_empty_object) {
       	    panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Label", "Description", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
          	Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

      	  } else {	
            panel.table = AINSPECTOR_FB.oldcontrols.controlFlatListTemplate.tableTag.append( {elements: control_elements}, panel.panelNode, null);
            AINSPECTOR_FB.oldcontrols.select(control_elements[0]);
            Firebug.currentContext.getPanel('rulesSidePanel').sView(true, control_elements[0]);
      	  }
        } else {
          is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(child_elements); 
      	  if (is_empty_object) {
       	    panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Label", "Description", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
          	Firebug.currentContext.getPanel('rulesSidePanel').sView(false, "none");

      	  } else {
              panel.table = AINSPECTOR_FB.oldcontrols.controlTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.oldcontrols.controlTreeTemplate);
     		    AINSPECTOR_FB.oldcontrols.select(child_elements[0]);
     		    Firebug.currentContext.getPanel('rulesSidePanel').sView(true, child_elements[0]);
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
      FBTrace.sysout("category: ", category);
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
   * controlFlatListTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the  toolbar button
   * 

   */
  AINSPECTOR_FB.oldcontrols.controlFlatListTemplate = domplate({
    
	  tableTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "grid", "aria-selected" : "true",
		  tabindex: "0", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "firstRow gridHeaderRow gridRow", id: "controlTableHeader", role: "row", "aria-selected" : "false", tabindex: "-1", 
           onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "labelEleCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
            TH({class: "gridHeaderCell gridCell", id: "labelCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Label")),
            TH({class: "gridHeaderCell gridCell", id: "labelTypeCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Description")),
            TH({class: "gridHeaderCell gridCell", id: "labelTypeCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$elements",
            TR({class: "tableRow gridRow", role: "row", "aria-selected" : "$object|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$object|$AINSPECTOR_FB.toolbarUtil.getTabIndex", id: "$object.cache_id", _repObject:"$object", 
            	 onclick: "$highlightRow", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
    		  TD({class: "labelEleCol gridCell gridCol ", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),  
              TD({class: "labelsCol gridCell gridCol ", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.label")
              ),
              TD({class: "labelTypeCol gridCell gridCol ", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object|getDesc")
              ),
              TD({class: "labelTypeCol gridCell gridCol ", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
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
      
      highlightRow : function(event){
	    panel.selection = Firebug.getRepObject(event.target);
	    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event); 
      },
      
      getDesc : function(object){
    	return object.dom_element.getHasDescribedBy();  
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
   * controlTreeTemplate
   */
  AINSPECTOR_FB.oldcontrols.controlTreeTemplate = domplate({
	    tag:
		  TABLE({class: "domTree domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
			  tabindex: "0", onkeypress: "$onKeyPressedRow"},
		    THEAD(
			  TR({class: "gridHeaderRow gridRow", id: "tableTableHeader", role: "row", tabindex: "-1", "aria-selected" : "false",
				  onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus"},
			    TH({class: "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
			    TH({class: "gridHeaderCell gridCell", id: "headLabelCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Label")),
			    TH({class: "gridHeaderCell gridCell", id: "headDescCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Description")),
			    TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
			  ) //end TR
			), //end THEAD
			TBODY(
			  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
			)
		  ),
	    
		  row:
		    TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
		    	"aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex",
		    	onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightTreeRow"},
			  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
			  ),
	  		  TD({class: "memberLabelCell", _repObject: "$member.value"}, TAG("$member.label", {'member' :"$member", 'object': "$member.value"})),
	  		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			    "$member.desc"),
			  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
				TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
		      ),

	      strTag : DIV({class: "treeLabel"},"$member.name"),
	      styleTag : DIV({class: "styleLabel"},"no label"),
	      normalTag : DIV({class: ""},"$member.lab"),
	      strTagPass : DIV({class: "passMsgTxt"}, "$member.acc_summary"),
	      strTagViolation : DIV({class: "violationMsgTxt"}, "$member.acc_summary"),
	      strTagManual : DIV({class: "manualMsgTxt"}, "$member.acc_summary"),
	      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$member.acc_summary"),
	      strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$member.acc_summary"),
	      strTagInfo : DIV({class: "infoMsgTxt"}, "$member.acc_summary"),
	      strTagWarn : DIV({class: "warnMsgTxt"}, "$member.acc_summary"),

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
		  
		  /**
		   * @function isTreeRow
		   * 
		   * @desc
		   * 
		   * @param {Object} event
		   */
		  isTreeRow: function(node) {
			return hasClass(node, "treeRow");
		  },

		 /**
		  * @function onKeyPressedRow
		  * 
		  * @desc
		  * 
		  * @param {Object} event
		  */
		  onKeyPressedRow: function(event) {
			event.stopPropagation();
            FBTrace.sysout("event.target: ", event.target);

			switch(event.keyCode) {
	          case KeyEvent.DOM_VK_LEFT: //left
	            event.preventDefault();
	            var row = getAncestorByClass(event.target, "treeRow");
	            
	            if (hasClass(row, "opened")) { // if open
	              this.closeRow(row); // close
	            } else {
	              var table = getAncestorByClass(event.target, "domTable");
	              table.focus(); // focus parent;
	            }
	            break;
	          
	          case KeyEvent.DOM_VK_UP: //up
	            event.preventDefault();
	            var table = getAncestorByClass(event.target, "domTable");

	            FBTrace.sysout("table in tree up direction..................: ", table);

	            var row = findPrevious(event.target, this.isTreeRow, false);
	            FBTrace.sysout("row: ", row);
	            if (row) {
	            	AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
	            } else {	
	              if (event.target.rowIndex == '1') row = table.rows[0];
	            }
	            row.focus();
	            break;
	            
	          case KeyEvent.DOM_VK_RIGHT: //right
	            event.preventDefault();
	            var row = getAncestorByClass(event.target, "treeRow");

	            if (hasClass(row, "hasChildren")) this.openRow(row);
	            break;
	            
	          case KeyEvent.DOM_VK_DOWN: //down
	            event.preventDefault();
	            var table = getAncestorByClass(event.target, "domTable");

	            FBTrace.sysout("table in tree: ", table);
	            var row = findNext(event.target, this.isTreeRow, false);
	            FBTrace.sysout("row: ", row);

	            if (row) row.focus();

	            //If the event is fired on header row, rowIndex check is made to make sure header row is not highlight.
	            if (!event.target.rowIndex == '0') AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
	            break;
	            
	          case KeyEvent.DOM_VK_ENTER: //Enter
	            event.preventDefault();
	            var links = event.target.getElementsByClassName('objectLink');
	          
	            if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'click');
	      		break;
			}
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
			  var repObject = row.newObject;
				
			  if (repObject) {
	            var members = this.getMembers(repObject.children, level+1);
				
	            if (members) this.loop.insertRows({members: members}, row);
			  }
			}
		  },
		  
		  highlightRow: function (event) {
			    
			 // var table = getAncestorByClass(event.target, "domTable");
		      //var row =  getAncestorByClass(event.target, "treeRow");
		      
		      var table = getAncestorByClass(event.target, "domTable");
		    	 // table = getAncestorByClass(event.target.offsetParent, "domTable");
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

		      //ainspectorUtil.setClass(row, "selected");
		      //var row_cells = cell.childNodes;
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
		    var acc = value.dom_element.getAccessibility();
		    var name = value.dom_element.tag_name;

		    var styleTag;
		    if (value.dom_element.has_element_children == false) {
		      styleTag = this.styleTag;
		      if (name == "input") name = name + ":" + value.type;
		   	} else {
		   	  if (value.number_of_controls)
		   		name = name + ":" + value.number_of_controls + " controls"	
		   	}
		    
		    return {
			  name: name, //name,
			  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
			  text: (value.dom_element.role) ? (value.label) : value.name,
		      hasChildren: this.hasChildElements(value), 
		      children: this.getChildrenEle(value),
		      value: (value != null) ? value : "",
		      label: (value.label != "" && value.label != undefined) ? this.normalTag : styleTag,
		      level: level,
		      indent: level * 16,
		      tag: this.strTag,
		      desc: value.dom_element.getHasDescribedBy(),
		      lab: value.label,
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
		  
		  /**
		   * @function checkLabel
		   * 
		   * @desc checks whether we have a label or not
		   * 
		   * @param {String} label - label for the control element
		   * @return label | no Label(String)
		   */
		  checkLabel : function(childrenFlag){
		    if (childrenFlag == true) {
		      return " ";
		    } else {
		      return this.styleTag;
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