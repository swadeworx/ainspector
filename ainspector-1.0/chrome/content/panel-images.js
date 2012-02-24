var AINSPECTOR_FB = AINSPECTOR_FB || {};	

with (FBL) {
  
  panel : null;
  image_elements: null;
  media_elements: null;
  abbreviation_elements: null;

AINSPECTOR_FB.equivalents = {
		  
  /**
   * @function equivalentsView 
   * 
   * @desc respond to "Images" button in the AInspector toolbar
   * 
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
	//equivalentsView : function(toolbar_buttons, toolbar, panelView, cache_object) {
	equivalentsView: function(context, panel_name, cache_object) {		
	  //FBTrace.sysout("............equivalents view.............");

	  if (!panel_name) panel_name = "AInspector";
	  if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
	  
	  //FBTrace.sysout("cache_object: ", cache_object);

	  panel = context.getPanel(panel_name, true);

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      }

      var toolbar_buttons = [{name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: true, first:true},
                                 {name: AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab")}];

      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      var images_cache = cache_object.dom_cache.images_cache;
      images_cache.sortImageElements('document_order', true);

     // AINSPECTOR_FB.equivalents.equivalentsView(toolbar_buttons, toolbar, panel, cache_object);
      image_elements = images_cache.image_elements;
	  media_elements = cache_object.dom_cache.media_cache.media_elements;
	  abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_items;
	  
	  AINSPECTOR_FB.equivalents.equivToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.equivalents.equivToolbarPlate);
	  
	  var element = panel.document.createElement("div");
	  element.style.display = "block";
	  
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
	  panel.panelNode.appendChild(element);
	  
	 // panel = panelView;
	  panel.table = AINSPECTOR_FB.equivalents.imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, AINSPECTOR_FB.equivalents.imagesTemplate);
	  this.select(image_elements[0]);
	  Firebug.currentContext.getPanel('Rules').sView(true, images_cache.image_elements[0]);
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
  }; //end of equivalents
  
  /**
   * @function equivToolbarPlate
   * 
   * @desc template creates a Tool bar in ainpector panel 
   */
  AINSPECTOR_FB.equivalents.equivToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
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
     * @function toHTMLPanel
     * 
     * @desc redirect to the HTML Panel of Firebug
     * 
     * @param event event triggered on a row/cell of a images/media/abbreviation toolbar buttons
     */
    toHTMLPanel: function(event) {

      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
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
     * @function showOnSelectButton
     * 
     * @desc show the selected toolbar button with a focus on it
     * 
     * @param toolbar_button_id id of the toolbar to be selected
     */
    showOnSelectButton : function(toolbar_button_id) {

      clearNode(panel.table);  // clear the content of the panel 
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        
      if (toolbar_button_id == "Images") {

        panel.table = AINSPECTOR_FB.equivalents.imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, AINSPECTOR_FB.equivalents.imagesTemplate);
        AINSPECTOR_FB.equivalents.select(image_elements[0]);

    	Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
      } else if (toolbar_button_id == "Media"){
    	//var cache_nls = OpenAjax.a11y.cache_nls;
    	//FBTrace.sysout("cache_nls: ", cache_nls);
        panel.table = AINSPECTOR_FB.equivalents.mediaTemplate.tableTag.append( {media_elements: media_elements}, panel.panelNode, AINSPECTOR_FB.equivalents.mediaTemplate);
        AINSPECTOR_FB.equivalents.select(media_elements[0]);

        Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);
      } else {
        panel.table = AINSPECTOR_FB.equivalents.abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, AINSPECTOR_FB.equivalents.abbreviationTemplate);
        AINSPECTOR_FB.equivalents.select(abbreviation_elements[0]);

        Firebug.currentContext.getPanel('Rules').sView(true, abbreviation_elements[0]);
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
   * @Domplate imagesTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
   * 
   * @return flat list of images to be displayed on the panel
   */
  AINSPECTOR_FB.equivalents.imagesTemplate = domplate({
    
	  tableTag:
      
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell gridCell", id: "imgElementHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Height")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Width")),
              TH({class: "gridHeaderCell gridCell", id: "imgTextHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "AltText")),
              TH({class: "gridHeaderCell gridCell", id: "imgSrcHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Source")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$highlightRow", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "imgEleCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.dom_element.tag_name")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.height")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.width")
              ),
              TD({class: "imgTextCol gridCell gridCol ",  id:"imgSrcCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, TAG("$object.alt|getAlt", {'object': '$object'}))
              ),
              TD({class: "imgSourceCol gridCell gridCol ", id: "imgTextCol", role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object", title: "$object.source"}, "$object.source|getFileName")
              ),
              TD({class: "imgOrderCol gridCell gridCol", id:"imgOrderCol" , role: "gridcell", tabindex: "-1", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, TAG("$object|getAccessibility", {'object': '$object'}))
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE

      styleTag : DIV({class: "styleLabel"},"empty alt"),
      normalTag : DIV({class: "gridContent"},"$object.alt"),
      strTagPass : DIV({class: "passMsgTxt"}, "$object|getSummary"),
      strTagViolation : DIV({class: "violationMsgTxt"}, "$object|getSummary"),
      strTagManual : DIV({class: "manualMsgTxt"}, "$object|getSummary"),
      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object|getSummary"),
      strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$object|getSummary"),
      strTagInfo : DIV({class: "infoMsgTxt"}, "$object|getSummary"),
      strTagWarn : DIV({class: "warnMsgTxt"}, "$object|getSummary"),
      
      getAlt : function(alt) {
	    if (alt == undefined) return this.styleTag;
	    else return this.normalTag;
      },
      
      /**
       * @function getAccessibility
       * 
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
  
  
  /**
   * @domplate mediaTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return flat list of media elements to be displayed on the panel 
   */
  AINSPECTOR_FB.equivalents.mediaTemplate = domplate({
    
	  tableTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell", id: "mediaAudioCol"}, DIV({class: "gridHeaderCellBox"}, "Audio")),
              TH({class: "gridHeaderCell", id: "mediaVideoCol"}, DIV({class: "gridHeaderCellBox"}, "Video")),
              TH({class: "gridHeaderCell", id: "mediCaptionsCol"}, DIV({class: "gridHeaderCellBox"}, "Captions")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Audio Desc")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Transcription")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
              
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$media_elements",
            TR({class: "tableRow ", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.highlightRow"},//gridRow              
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_video")
              ),
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.is_audio")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.has_caption")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_audio_desc")
              ),
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.tag_name")
              )
              
            )//end TR   
          ) //end FOR
        )// end TBODY
      ) // end inner TABLE
      
      
   });
  
  /**
   * @Domplate abbreviationTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return Two level tree to be displayed on the panel
   */
  AINSPECTOR_FB.equivalents.abbreviationTemplate = domplate({
    
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
		THEAD(
	      TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
	        TH({class: "gridHeaderCell", id: "abbrEleCol"}, DIV({class: "gridHeaderCellBox"}, "Element")),
	        TH({class: "gridHeaderCell", id: "abbrCol"}, DIV({class: "gridHeaderCellBox"}, "Abbreviation")),
	        TH({class: "gridHeaderCell", id: "abbrTitleCol"}, DIV({class: "gridHeaderCellBox"}, "Title"))
	      ) //end TR
		), //end THEAD
		TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)//end TBODY
	  ), //end TABLE
	    
	row:
	  TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$highlightRow"},
	    TD({class: "memberLabelCell treeLabel", style: "padding-left: $member.indent\\px", _repObject: "$member"},
          "$member.length"
	    ),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		  "$member.abbreviation_text"
		)
	  ),
	
	childrow:
	  TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$highlightRow"},
	    TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		  "$member.tagname"
	    ),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		  "$member.abbreviation_text"
		),
		TD({class: "memberLabelCell", _repObject: "$member"}, "$member.title")
	  ),

	loop:
	  FOR("member", "$members", TAG("$childrow", {member: "$member"})),

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
		  abbreviation_text: value.abbreviation_text
		};
	  } else {
				
		return {
		  tagname: value.tag_name, //name,
	      //role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
          hasChildren: value.has_element_children, 
          children: value.dom_elements,
          value: (value != null) ? value : "",
          level: level,
          indent: level * 16,
          title: value.title
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
		var repObject = row.repObject;

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