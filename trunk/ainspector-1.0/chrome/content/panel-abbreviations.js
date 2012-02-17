var AINSPECTOR_FB = AINSPECTOR_FB || {};	

with (FBL) {
  
  panel : null;
  language_elements: null;
  abbreviation_elements: null;

  AINSPECTOR_FB.abbr = {
		  
  /**
   * @function abbreviationsView 
   * 
   * @desc
   * 
   * @param {Array} toolbar_buttons - buttons to show on a toolbar
   * @param {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @param {Object} panelView - panel 
   * @param {Object} cache_object - container for image, media and abbreviation element properties
   * 
   */
  abbreviationsView : function(toolbar_buttons, toolbar, panelView, cache_object) {
	        
    abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_items;
    language_elements = cache_object.dom_cache.languages_cache;
	AINSPECTOR_FB.abbr.abbrToolbarPlate.toolbar.replace({toolbar_buttons : toolbar_buttons}, toolbar, AINSPECTOR_FB.abbr.abbrToolbarPlate);
	  
	  var element = panelView.document.createElement("div");
	  element.style.display = "block";
	  
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	  panelView.panelNode.appendChild(element);
	  
	  panel = panelView;
	 // panel.table = AINSPECTOR_FB.abbr.languageTemplate.tableTag.append( {language_elements: language_elements}, panel.panelNode, AINSPECTOR_FB.abbr.languageTemplate);
	  panel.table = AINSPECTOR_FB.abbr.abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, AINSPECTOR_FB.abbr.abbreviationTemplate);
	  this.select(abbreviation_elements[0]);
	  FBTrace.sysout("8888888888888888888888888", language_elements[0].dom_element.getAccessibility());
	  Firebug.currentContext.getPanel('Rules').sView(true, language_elements[0]);
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
  }; //end of abbr
  
  /**
   * @function abbrToolbarPlate
   * 
   * @desc template creates a Tool bar in ainpector panel 
   */
  AINSPECTOR_FB.abbr.abbrToolbarPlate = domplate({
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
        
      if (toolbar_button_id == "Language") {

        panel.table = AINSPECTOR_FB.abbr.languageTemplate.tableTag.append( {language_elements: language_elements}, panel.panelNode, AINSPECTOR_FB.abbr.languageTemplate);
        AINSPECTOR_FB.abbr.select(language_elements[0]);

    	Firebug.currentContext.getPanel('Rules').sView(true, language_elements[0]);
      } else {
        panel.table = AINSPECTOR_FB.abbr.abbreviationTemplate.tag.append( {object: abbreviation_elements}, panel.panelNode, AINSPECTOR_FB.abbr.abbreviationTemplate);
        AINSPECTOR_FB.abbr.select(abbreviation_elements[0]);

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
        FBTrace.sysout("panel in selectTab: ", panel);
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
  AINSPECTOR_FB.abbr.languageTemplate = domplate({
    
	  tableTag:
      
	  TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell gridCell", id: "imgElementHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Language")),
              TH({class: "gridHeaderCell gridCell", id: "imgOrderHeaderCol", role: "columnheader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Text"))
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
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      
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
   * @Domplate abbreviationTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return Two level tree to be displayed on the panel
   */
  AINSPECTOR_FB.abbr.abbreviationTemplate = domplate({
    
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