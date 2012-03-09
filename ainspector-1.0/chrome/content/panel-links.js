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
  same_name_items: null;
  same_href_items: null;
  link_elements: null;
  area_elements: null;
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
	viewPanel : function(context, panel_name, cache_object) {
	    
	  if (!panel_name) panel_name = "AInspector";
	  if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
	  
	  //FBTrace.sysout("cache_object: ", cache_object);

	  panel = context.getPanel(panel_name, true);
	  
	  var panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }
	  var toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.all"), selected: true, first:true},
		                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.sameHref")}, 
		                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.sameName")},
		                     {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.links.area")}];

      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var links_cache = cache_object.dom_cache.links_cache;
	  
	  AINSPECTOR_FB.links.linksToolbar.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.links.linksToolbar);
	      
	  var element = panel.document.createElement("div");
	  element.style.display = "block";
		  
	  toolbar.style.display = "block";
		  
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
		  
	  link_elements = links_cache.link_elements;
	  same_name_items = links_cache.duplicate_name_items;
	  same_href_items = links_cache.duplicate_href_items;
	  area_elements = links_cache.area_elements;
	  
      var is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(link_elements);

	  if (is_empty_object == true) {
        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Name", "Link Type", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
	  	Firebug.currentContext.getPanel('Rules').sView(false, "none");
	  } else {
	    panel.table = AINSPECTOR_FB.links.allLinksTemplate.tableTag.append({link_elements: link_elements}, panel.panelNode, null);
	    this.select(links_cache.link_elements[0]);
	    Firebug.currentContext.getPanel('Rules').sView(true, links_cache.link_elements[0]);
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
	
	  var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");

	  var row =  null;
	  var child;
	  var tbody;
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
	    node = node.repObject.dom_element.node;
	  }
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
  showOnSelectButton : function(toolbar_button_id){
	this.viewContainer.append({}, panel.table, this);
	clearNode(panel.table);
    clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
    selected_toolbar_button = toolbar_button_id;
    var is_empty_object;
    if (toolbar_button_id == "All") {
        
      is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(link_elements);

  	  if (is_empty_object == true) {
          panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Element", "Name", "Link Type", "Accessibility Summary"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
  	  	Firebug.currentContext.getPanel('Rules').sView(false, "none");
  	  } else {

        panel.table = AINSPECTOR_FB.links.allLinksTemplate.tableTag.append( {links: link_elements}, panel.panelNode, null);
        AINSPECTOR_FB.images.select(link_elements[0]);
        Firebug.currentContext.getPanel('Rules').sView(true, link_elements[0]);
  	  }
    } else if (toolbar_button_id == "Same HREF"){
   	  var properties = ["Number", "HREF", "Name"];
   	  is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(same_href_items);

	  if (is_empty_object == true) {
        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: properties}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
	  	Firebug.currentContext.getPanel('Rules').sView(false, "none");
	  } else {
        panel.table = AINSPECTOR_FB.links.duplicateNameOrHrefTemplate.tag.append( {object: same_href_items, properties: properties}, panel.panelNode, AINSPECTOR_FB.links.duplicateNameOrHrefTemplate);
        AINSPECTOR_FB.images.select(same_href_items[0]);
        Firebug.currentContext.getPanel('Rules').sView(true, same_href_items[0]);
	  }
    } else if (toolbar_button_id == "Same Name") {
      var properties = ["Number", "Name", "HREF"];
      is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(same_name_items);

  	  if (is_empty_object == true) {
          panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: properties}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
  	  	Firebug.currentContext.getPanel('Rules').sView(false, "none");
  	  } else {
        panel.table = AINSPECTOR_FB.links.duplicateNameOrHrefTemplate.tag.append( {object: same_name_items, properties:properties}, panel.panelNode, AINSPECTOR_FB.links.duplicateNameOrHrefTemplate);
        AINSPECTOR_FB.images.select(same_name_items[0]);
  	    Firebug.currentContext.getPanel('Rules').sView(true, same_name_items[0]);
  	  }
    } else if (toolbar_button_id == "AREA") {
	  is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(area_elements);
	  var properties = ["Element", "Name", "Href", "Accessibility Summary"];
	  if (is_empty_object == true) {
        panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: properties}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
	  	Firebug.currentContext.getPanel('Rules').sView(false, "none");
	  } else {
        panel.table = AINSPECTOR_FB.links.areaTemplate.tag.append( {area_elements: area_elements}, panel.panelNode, null);
        AINSPECTOR_FB.images.select(area_elements[0]);
	    Firebug.currentContext.getPanel('Rules').sView(true, area_elements[0]);
	  }	
    	
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
   * allLinksTable
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  AINSPECTOR_FB.links.allLinksTemplate = domplate({

    tableTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "linksTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "linkOrderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Element")),
            TH({class: "gridHeaderCell gridCell", id: "linkNameCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Name")),
            TH({class: "gridHeaderCell gridCell", id: "linkHrefCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Link Type")),
            TH({class: "gridHeaderCell gridCell", id: "linkHrefCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Accessibility Summary"))

          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$link_elements",
            TR({class: "tableRow gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$highlightRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	DIV({class: "gridContent", _repObject:"$object", title:"$object.name" }, "$object.name|AINSPECTOR_FB.ainspectorUtil.truncateText")
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	DIV({id: "$object.document_order", class: "gridContent", _repObject:"$object"}, "$object|getLinkType" )
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
               	DIV({id: "$object.document_order", class: "gridContent", _repObject:"$object"}, TAG("$object|getAccessibility", {'object': '$object'}))
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
  	  /**
  	   * @function getLinkType
  	   */
  	  getLinkType: function (object) {
  	    return object.getLinkType();	  
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
   * areaTemplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  AINSPECTOR_FB.links.areaTemplate = domplate({

    tag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "linksTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "linkOrderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Element")),
            TH({class: "gridHeaderCell gridCell", id: "linkNameCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Name")),
            TH({class: "gridHeaderCell gridCell", id: "linkHrefCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Href")),
            TH({class: "gridHeaderCell gridCell", id: "linkHrefCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"},"Accessibility Summary"))

          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$area_elements",
            TR({class: "tableRow gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$highlightRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	DIV({class: "gridContent", _repObject:"$object", title:"$object.name" }, "$object.name|AINSPECTOR_FB.ainspectorUtil.truncateText")
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
            	DIV({id: "$object.document_order", class: "gridContent", _repObject:"$object"}, "$object|getFileName")
              ),
              TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
               	DIV({id: "$object.document_order", class: "gridContent", _repObject:"$object"}, TAG("$object|getAccessibility", {'object': '$object'}))
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
     },
     
     /**
       * @function getFileName
       * 
       * @desc retrive file name from the URL 
       * 
       * @param {String} url 
       */
      getFileName : function (url){
         
	    if (url){
          var file_name = url.toString().match(/.*\/(.*)$/);

          if (file_name && file_name.length > 1){
            return decodeURI(file_name[1]);
          }
        }
        return "";
      }
      
  	});
 
    /**
     * @function duplicatreNameOrHrefTemplate
     * 
     * @desc 
     */
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
	    TR({class: "treeRow gridRow", $hasChildren: "$member.hasDuplicates", _newObject: "$member", _repObject: "$member.value",
         level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$onClickTreeRow"},
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px"}, 
            TAG("$member.tag", {'member' :"$member", 'object': "$member"})
          ),
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px"}, "$member|getParentColumn"
          )//,
  //	  TD({class: "memberLabelCell", _repObject: "$member"}, "$member|getChildColumn")
	    ),
	
      childrow:
	    TR({class: "treeRow gridRow", _repObject: "$member.value", 
	     level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$onClickTreeRow"},
	      TD(
         ),
	     TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member".value},
		  "$member|getParentColumn"
	     ),
		 TD({class: "memberLabelCell", _repObject: "$member".value}, "$member|getChildColumn")
		 ),

      strTag : DIV({class: "treeLabel"}, "$member.number"),
	  
      loop: FOR("member", "$members", TAG("$childrow", {member: "$member"})),
	  
	  getParentColumn : function(member) {
      
    	if (selected_toolbar_button == "Same HREF") return AINSPECTOR_FB.ainspectorUtil.truncateText(decodeURI(member.duplicate_href));
        else return member.duplicate_name;
      
	  },
	
	  getChildColumn : function(member) {
      
		if (selected_toolbar_button == "Same HREF") return member.duplicate_name;
        else return AINSPECTOR_FB.ainspectorUtil.truncateText(decodeURI(member.duplicate_href));
      
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
		    hasDuplicates: (value.link_elements.length > 0 ) ? true : false, 
		    duplicates: value.link_elements,
		    value: (value.link_elements != null) ? value.link_elements : "",
		    level: level,
		    indent: level * 16,
		    number: value.link_elements.length,
		    duplicate_name: value.name,
		    duplicate_href: value.href,
	        tag: this.strTag
		  };
	    } else {
		  return {
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
    	
	    panel.selection = Firebug.getRepObject(event.target);
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
		  var repObject = row.newObject;
		
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
		
	    if (hasClass(row, "opened")) {
	      this.closeRow(row);
	    } else {
	      this.openRow(row);
	    }
      }
    });
  };