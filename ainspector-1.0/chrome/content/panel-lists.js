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
  list_elements: null;

  AINSPECTOR_FB.lists = {
    
    /**
	 * @function viewPanel
	 * 
	 * @desc
	 * 
	 * @param toolbar_buttons
	 * @param toolbar
	 * @param panel
	 * @param cacheResult
	 * @returns
	 */
    viewPanel : function(context, panel_name, cache_object) {

  	  if (!panel_name) panel_name = "AInspector";
  	  //if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
  	if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

  	  panel = context.getPanel(panel_name, true);
  	 
  	AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false); /* Clear the panel before writing anything onto the report*/
        if (panel) {
        	clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
        }

        var toolbar_buttons = [{name: "Tree View", selected: true, first:true},
                               {name: "List View"}];
  
        AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
  
        var toolbar = panel.document.createElement("div");
        toolbar.id = "toolbarDiv";
        var lists_cache = cache_object.dom_cache.lists_cache;    
	    list_elements = lists_cache.container_elements;
      child_elements = lists_cache.child_cache_elements;

      AINSPECTOR_FB.lists.listToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons, preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.lists.listToolbarPlate);
	  //toolbar.style.display = "block";
	  
	  var element = panel.document.createElement("div");
	  element.style.display = "block";
	  
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
	  
	  panel = panel;
	  panel.table = AINSPECTOR_FB.lists.listTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.lists.listTreeTemplate);
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
    select: function(object){
    	
      panel.selection = object;
    	  
      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
        	
    }
  }; //end of imageObject  

  /**
   * imageToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  AINSPECTOR_FB.lists.listToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel"),
                SPAN({class: "ruleset_select"}, "Ruleset:  "),
                SPAN({class: "ruleset_value"}, "$preferences.ruleset_id|AINSPECTOR_FB.toolbarUtil.getRulesetTitle"),
                SPAN({class: "ruleset_level"}, " Level:  "),
                SPAN({class: "ruleset_value"}, "$preferences.wcag20_level|AINSPECTOR_FB.toolbarUtil.getLevel")
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "element views"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
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

      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");

	  var row;
      var child;
      var tbody=null;
      var node=null;
      var row = null;
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
        if (table.rows && table.rows.length > 0){
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
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);

      if (toolbar_button_id == "Tree View") {
   		panel.table = AINSPECTOR_FB.lists.listTreeTemplate.tag.append( {object: child_elements}, panel.panelNode, AINSPECTOR_FB.lists.listTreeTemplate);
    	AINSPECTOR_FB.lists.select(child_elements[0]);
   		Firebug.currentContext.getPanel('rulesSidePanel').sView(true, child_elements[0]);
        
      } else {
        panel.table = AINSPECTOR_FB.lists.listTreeTemplate.tag.append( {object: list_elements}, panel.panelNode, AINSPECTOR_FB.lists.listTreeTemplate);
    	AINSPECTOR_FB.lists.select(list_elements[0]);
        Firebug.currentContext.getPanel('rulesSidePanel').sView(true, list_elements[0]);
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
        this.showOnSelectButton(category);
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

  AINSPECTOR_FB.lists.listTreeTemplate = domplate({
	tag:
	  TABLE({class: "domTree domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    THEAD(
	      TR({class: "gridHeaderRow a11yFocus gridRow", id: "listTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false",
	    	onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus"},
	        TH({class: "gridHeaderCell gridCell", id: "listEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
	        TH({class: "gridHeaderCell gridCell", id: "listClassCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Number")),
	        TH({class: "gridHeaderCell gridCell", id: "listClassCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Text Content")),
	        TH({class: "gridHeaderCell gridCell", id: "listXpathCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
	      ) //end TR
	    ),
		TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
	    
	  row:
	    TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
	      onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightTreeRow"},
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
		  ),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			"$member.no_of_list_elements"),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			"$member.text_content|AINSPECTOR_FB.ainspectorUtil.truncateText"),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		    TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
	    ),

	      strTag : DIV({class: "treeLabel"},"$member.element"),
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
//	        var links = event.target.getElementsByClassName('objectLink');
	//        if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'mouseover');
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
		   // FBTrace.sysout(' createMember : ', value);
      	    var acc = value.dom_element.getAccessibility();
			return {
			  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
		      hasChildren: this.hasChildElements(value), 
		      children: this.getChildrenEle(value),
		      value: (value != null) ? value : "",
		      label: (value.dom_element.children != null) ? "" : value,
		      level: level,
		      indent: level * 16,
		      tag: this.strTag,
		      element:value.dom_element.tag_name,
		      text_content: value.dom_element.getText(),
		      no_of_list_elements: value.child_cache_elements.length,
		      acc_summary: acc.label,
		      sevTag: this.getAccessibility(value)
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
		  
		  onClick_htmlView: function(event) {
			var head_landmark = event.target.headLandElement.value;
		    var node = head_landmark.dom_element.node;
		    var panel = Firebug.chrome.selectPanel("html");
		    panel.select(node);  
		  }
		  
		});

  }