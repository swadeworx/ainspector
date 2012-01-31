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
   * @desc
   * 
   * @param toolbar_buttons buttons to show on a toolbar
   * @param toolbar 
   * @param panelView panel 
   * @param cache_object is the container of image, media and abbreviation element properties
   * 
   */
	equivalentsView : function(toolbar_buttons, toolbar, panelView, cache_object) {
	        
      var images_cache = cache_object.dom_cache.images_cache;
	  
      image_elements = images_cache.image_elements;
	  media_elements = cache_object.dom_cache.media_cache.media_elements;
	  abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_items;
	  
	  equivToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, equivToolbarPlate);
	  
	  var element = panelView.document.createElement("div");
	  element.style.display = "block";
	  
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	  panelView.panelNode.appendChild(element);
	  
	  panel = panelView;
	  panel.table = imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, imagesTemplate);

	  Firebug.currentContext.getPanel('Rules').sView(true, images_cache.image_elements[0]);
    }
  }; //end of equivalents
  
  /**
   * @domplate equivToolbarPlate
   * 
   * @desc template creates a Tool bar in ainpector panel 
   */
  var equivToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$AINSPECTOR_FB.toolbarUtil.onToolbarKeyPress", "aria-label" :  "element views"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|AINSPECTOR_FB.toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClickToolbarButton", tabindex : "$obj|AINSPECTOR_FB.toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|AINSPECTOR_FB.toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
    
    ),
    
    /**
     * toHTMLPanel
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
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        
      if (toolbar_button_id == "Images") {

        panel.table = imagesTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, imagesTemplate);
    	Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
      } else if (toolbar_button_id == "Media"){
          
        panel.table = mediaTemplate.tableTag.append( {media_elements: media_elements}, panel.panelNode, mediaTemplate);
        Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);
      } else {
    	  
        panel.table = abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, abbreviationTemplate);
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
      
      var category = getClassValue(elem, "ruleCategory");

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
   * @Domplate imagesTemplate
   * 
   * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
   * 
   * @return flat list of images to be displayed on the panel
   */
  var imagesTemplate = domplate({
    
	  tableTag:
      
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
              TH({class: "gridHeaderCell gridCell", id: "imgOrderCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Order")),
              TH({class: "gridHeaderCell gridCell", id: "imgTextCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Source")), //TAG("$headerTag", {header: "Source"}))),
              TH({class: "gridHeaderCell gridCell", id: "imgSrcCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "AltText"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({class: "tableRow  gridRow", role: "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
              TD({class: "imgOrderCol gridCell gridCol", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.document_order")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.source")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressCell", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.hightlightCell", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.alt")
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ) // end inner TABLE
    });
  
  
  /**
   * @domplate mediaTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return flat list of media elements to be displayed on the panel 
   */
  this.mediaTemplate = domplate({
    
	  tableTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell", id: "mediaOrderCol"}, DIV({class: "gridHeaderCellBox"}, "Oder")),
              TH({class: "gridHeaderCell", id: "mediaSrctCol"}, DIV({class: "gridHeaderCellBox"}, "Source")), //TAG("$headerTag", {header: "Source"}))),
              TH({class: "gridHeaderCell", id: "mediaAudioCol"}, DIV({class: "gridHeaderCellBox"}, "Audio")),
              TH({class: "gridHeaderCell", id: "mediaVideoCol"}, DIV({class: "gridHeaderCellBox"}, "Video")),
              TH({class: "gridHeaderCell", id: "mediCaptionsCol"}, DIV({class: "gridHeaderCellBox"}, "Captions")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Audio Desc"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$media_elements",
            TR({class: "tableRow ", role: "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.tag_name")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_video")
              ),
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.is_audio")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.has_caption")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_audio_desc")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1", onclick: "$flatListTemplate.hightlightCell"},
                BUTTON({_element: "$object", id: "$object.document_order", class: "gridContent", onclick: "$flatListTemplate.onClickHtmlView"}, "view" )
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
  var abbreviationTemplate = domplate({
    
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
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
	    TD({class: "memberLabelCell treeLabel", style: "padding-left: $member.indent\\px", _repObject: "$member"},
          "$member.length"
	    ),
		TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		  "$member.abbreviation_text"
		)
	  ),
	
	childrow:
	  TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	   level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
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
		  hasChildren: this.hasChildElements(value), 
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
	 *  @return focus on a row
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
            ainspectorUtil.removeClass(row, "gridCellSelected");
     	    flag = true;
            break;
          }
  	    }  
  	
        if (flag == true) break;
      }

	  var row_selected = getAncestorByClass(event.target, "treeRow");
	  ainspectorUtil.setClass(row_selected, "gridCellSelected");
    },

    /**
     * @function toggleRow
     */
	toggleRow: function(row) {

	  if (hasClass(row, "opened")) {
	    this.closeRow(row);
	  } else {
	    this.openRow(row);
	  }
    },
    
    /**
     * @function getChildrenEle
     */
    getChildrenEle: function(element){
	  
      return element.dom_elements; 
    },
  
    /**
     * @function hasChildElements
     */
    hasChildElements: function(element){

      if (element.dom_elements) return true;
	  
      else return false;
    },
  
    /**
     * @function onClick_htmlView
     */
    onClick_htmlView: function(event) {
	  
      var head_landmark = event.target.headLandElement.value;
      var node = head_landmark.dom_element.node;
      var panel = Firebug.chrome.selectPanel("html");
      
      panel.select(node);  
    }
  });

  }