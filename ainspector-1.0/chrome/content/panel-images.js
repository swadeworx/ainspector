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
  image_elements: null;

  AINSPECTOR_FB.images = {
		  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Images" button in the AInspector toolbar
   * 
   * @param {Object} context - Firebug current context i.e., DOM
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  viewPanel: function(context, panel_name, cache_object) {		

	//adds or removes the side panels from the extension depending on the panel we are in 
	AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(false);
	
	if (!panel_name) panel_name = "AInspector";
	
	if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  

	panel = context.getPanel(panel_name, true);

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
    }

    var images_cache = cache_object.dom_cache.images_cache;
    images_cache.sortImageElements('document_order', true);

    image_elements = images_cache.image_elements;

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    AINSPECTOR_FB.images.equivToolbarPlate.toolbar.replace({preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.images.equivToolbarPlate);
	  
	var element = panel.document.createElement("div");
	element.style.display = "block";
	  
	panel.panelNode.id = "ainspector-panel"; 
	panel.panelNode.appendChild(toolbar);
	panel.panelNode.appendChild(element);
	FBTrace.sysout("image elements: ", image_elements);
	  
    panel.table = AINSPECTOR_FB.images.imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, AINSPECTOR_FB.images.imagesTemplate);
	this.select(image_elements[0]);
	Firebug.currentContext.getPanel('rulesSidePanel').sView(true, images_cache.image_elements[0]);
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
}; //end of images
  
  /**
   * @function AINSPECTOR_FB.images.equivToolbarPlate
   * 
   * @desc template creates a Tool bar in ainspector panel 
   */
  AINSPECTOR_FB.images.equivToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                BUTTON({class: "button", onclick: "$AINSPECTOR_FB.toolbarUtil.viewHTMLPanel", id: "html_panel_button", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.htmlButtonPress"}, "HTML Panel"),
                SPAN({class: "ruleset_select"}, "Ruleset:  "),
                SPAN({class: "ruleset_value"}, "$preferences.ruleset_id|AINSPECTOR_FB.toolbarUtil.getRulesetTitle"),
                SPAN({class: "ruleset_level"}, " Level:  "),
                SPAN({class: "ruleset_value"}, "$preferences.wcag20_level|AINSPECTOR_FB.toolbarUtil.getLevel")
                
    ) 
  });
  
  /**
   * @Domplate AINSPECTOR_FB.images.imagesTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
   * 
   * @return flat list of images to be displayed on the panel
   */
  AINSPECTOR_FB.images.imagesTemplate = domplate({
    
	tableTag:
      
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "grid", "aria-selected" : "true",
		  tabindex: "0", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "firstRow gridHeaderRow gridRow", id: "imgTableHeader", role: "row", "aria-selected" : "false", tabindex: "-1", 
            onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
            TH({class: "gridHeaderCell gridCell", id: "imgElementHeaderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Element")),
            TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Height")),
            TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Width")),
            TH({class: "gridHeaderCell gridCell", id: "imgTextHeaderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "AltText")),
            TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({class: "tableRow  gridRow", role: "row", "aria-selected" : "$object|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$object|$AINSPECTOR_FB.toolbarUtil.getTabIndex", 
			id: "$object.cache_id", _repObject:"$object", 
	     onclick: "$highlightRow", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "imgEleCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.height")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.width")
              ),
              TD({class: "imgTextCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, TAG("$object.alt|getAlt", {'object': '$object'}))
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, TAG("$object|getAccessibility", {'object': '$object'}))
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE

      styleTag : DIV({class: "styleLabel"},"empty alt"),
      normalTag : DIV({class: "gridContent", title: "$object.alt"},"$object.alt|AINSPECTOR_FB.ainspectorUtil.truncateText"),
      strTagPass : DIV({class: "passMsgTxt"}, "$object|getSummary"),
      strTagViolation : DIV({class: "violationMsgTxt"}, "$object|getSummary"),
      strTagManual : DIV({class: "manualMsgTxt"}, "$object|getSummary"),
      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object|getSummary"),
      strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$object|getSummary"),
      strTagInfo : DIV({class: "infoMsgTxt"}, "$object|getSummary"),
      strTagWarn : DIV({class: "warnMsgTxt"}, "$object|getSummary"),
      
      /**
       * @function getAlt
       * 
       * @desc style alt attribute value if it is empty 
       * 
       * @param {String} alt - alternate text on the image
       */
      getAlt : function(alt) {
	    if (alt == undefined) return this.styleTag;
	    else return this.normalTag;
      },
      
      /**
       * @function getAccessibility
       * 
       * @desc style the result text depending on the severity
       * 
       * @param {Object} object - node result Object
       */
      getAccessibility : function (object){
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
       * @function getSummary
       * 
       * @desc returns the accessibility label
       * 
       * @param {Object} object - node result Object 
       */
      getSummary : function(object){
      	return object.dom_element.getAccessibility().label;
      },
      
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
  }