var AINSPECTOR_FB = {};	

AINSPECTOR_FB.images = {
  
  /**
   * panelsView
   * 
   * @desc
   * 
   * @param toolbar_buttons
   * @param toolbar
   * @param panelView
   * @param cacheResult
   * @returns
   */
   imagePanelView : function(images_toolbar_buttons, toolbar, panelView, cache_object) {
	        
     var images_cache = cache_object.dom_cache.images_cache;

	 image_elements = images_cache.image_elements;
	 media_elements = cache_object.dom_cache.media_cache.media_elements;
	 abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_items;
	 imageToolbarPlate.toolbar.replace({images_toolbar_buttons : images_toolbar_buttons}, toolbar, imageToolbarPlate);
	 //toolbar.style.display = "block";
	  
	 var element = panelView.document.createElement("div");
	 element.style.display = "block";
	  
	 panelView.panelNode.id = "ainspector-panel"; 
	 panelView.panelNode.appendChild(toolbar);
	 panelView.panelNode.appendChild(element);
	  
     FBTrace.sysout("panelView: ", panelView);
	        
	 /*viewNode = element;
	  viewNode.id = "view-panel";
	  
	  FBTrace.sysout("viewNode: ", viewNode);*/
	  
	  panel = panelView;
	  image_view = panelView;
	  media_view = panelView;
	  abbreviation_view = panelView;
	  panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, null);

	  Firebug.currentContext.getPanel('Rules').sView(true, images_cache.image_elements[0]);
    }
} //end of imageObject  

with (FBL) {
  
    panel : null;
    image_view : null;
    media_view : null;
    abbreviation_view: null;
    image_elements: null;
    media_elements: null;
    abbreviation_elements: null;
  
  /**
   * imageToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  this.imageToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$images_toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$toolbarUtil.onToolbarKeyPress", "aria-label" :  "element views"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|toolbarUtil.getSelectedState", onfocus : "$onToolbarFocus"},
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
      FBTrace.sysout("inside pane-images event", event);

      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
      FBTrace.sysout("inside pane-images table", table);

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
    
   /* onToolbarKeyPress: function(event){
      
    	var key = event.keyCode;
        var tabs;
        FBTrace.sysout("keyCode in widget.js:" , event);
        switch(key) {
          case KeyEvent.DOM_VK_LEFT:
          case KeyEvent.DOM_VK_RIGHT:
          case KeyEvent.DOM_VK_UP:
          case KeyEvent.DOM_VK_DOWN:

            var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
            var tabList = getAncestorByClass(event.target, "focusTabList");
            tabs = tabList.getElementsByClassName("focusTab");
            FBTrace.sysout("keyCode in widget.js - tablist", tabList);
            FBTrace.sysout("keyCode in widget.js - tab:", tabs);
            var currentIndex = Array.indexOf(tabs, event.target);
            FBTrace.sysout("keyCode in widget.js - curIndex:"+ currentIndex);
            if (currentIndex != -1) {
              var newIndex = forward ? ++currentIndex : --currentIndex;
              newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
              
              if (tabs[newIndex]) tabs[newIndex].focus();
            }
            event.stopPropagation();
            event.preventDefault();
            
            break;
          } //end switch
          
    },*/
    
    showOnSelectButton : function(toolbar_button_id) {

    	clearNode(panel.table);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        FBTrace.sysout("toolbar_button_id: " + toolbar_button_id);

        if (toolbar_button_id == "Images") {
    	  panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, image_view.panelNode, null);
    	  Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
        } else if (toolbar_button_id == "Media"){
          panel.table = flatListMediaTemplate.tableTag.append( {media_elements: media_elements}, media_view.panelNode, null);
      	  Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);
        } else {
    	  panel.table = abbreviationTemplate.tag.append( {object: abbreviation_elements}, abbreviation_view.panelNode, abbreviationTemplate);
    	  Firebug.currentContext.getPanel('Rules').sView(true, abbreviation_elements[0]);
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
      
      var category = getClassValue(elem, "ruleCategory");
      FBTrace.sysout("catewgory: "+ category);
      FBTrace.sysout("elem: ", elem);

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
    	//category + "_view" = panel;
        this.showOnSelectButton(category);
        
        /*if (currentView && typeof currentView["show" + category] == "function") {
          currentView["show" + category]();
        }*/
        
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
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  this.flatListTemplate = domplate({
    
	  tableTag:
      
	  TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$flatListTemplateUtil.onClickHeader", onkeypress: "$flatListTemplateUtil.onKeyPressRow"},
              TH({"class": "gridHeaderCell gridCell", id: "imgOrderCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Order")),
              TH({"class": "gridHeaderCell gridCell", id: "imgTextCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Source")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell gridCell", id: "imgSrcCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "AltText"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({"class": "tableRow a11yFocus gridRow", "role": "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$flatListTemplateUtil.onKeyPressRow", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.source")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.alt")
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ) // end inner TABLE
    });
  
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  this.flatListMediaTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
              TH({"class": "gridHeaderCell", id: "mediaOrderCol"}, DIV({"class": "gridHeaderCellBox"}, "Oder")),
              TH({"class": "gridHeaderCell", id: "mediaSrctCol"}, DIV({"class": "gridHeaderCellBox"}, "Source")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell", id: "mediaAudioCol"}, DIV({"class": "gridHeaderCellBox"}, "Audio")),
              TH({"class": "gridHeaderCell", id: "mediaVideoCol"}, DIV({"class": "gridHeaderCellBox"}, "Video")),
              TH({"class": "gridHeaderCell", id: "mediCaptionsCol"}, DIV({"class": "gridHeaderCellBox"}, "Captions")),
              TH({"class": "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({"class": "gridHeaderCellBox"}, "Audio Desc"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$media_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.tag_name")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_video")
              ),
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.is_audio")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.has_caption")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_audio_desc")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                BUTTON({_element: "$object", id: "$object.document_order", class: "gridContent", onclick: "$flatListTemplate.onClickHtmlView"}, "view" )
              )
              
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
       
      /**
       * onSourceClick
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      onSourceClick : function(event){
        
	    var linkEle = event.target.imageElement;
        var node = linkEle.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      },
      
      onClickHeader : function(event){
    	  
    	FBTrace.sysout("Inside onClickHeader................................", event.target);  
        var table = getAncestorByClass(event.target, "ai-table-list-items");
    	FBTrace.sysout("table..........", table);  

        var column = getAncestorByClass(event.target, "gridHeaderCell");
        FBTrace.sysout("column", column);
        ainspectorUtil.sortColumn(table, column);
      }
   });
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  this.abbreviationTemplate = domplate({
    
	  tag:
		  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
		    TBODY(
			  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
			)
		  ),
	    
		  row:
		    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
		    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
			  TD({class: "memberLabelCell treeLabel", style: "padding-left: $member.indent\\px", _repObject: "$member"},
                "$member.length"),
			  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
				"$member.abbreviation_text")
		    ),
		    childrow:
			    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
			    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
				  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
					"$member.tagname"),
				  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
					"$member.abbreviation_text"),
		  		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.title")
			    ),

		  loop:
		    FOR("member", "$members", TAG("$childrow", {member: "$member"})),

		  memberIterator: function(object) {
		    return this.getMembers(object);
		  },
		  
		  getMembers: function(object, level) {
			FBTrace.sysout("Inside getMembers()...", object);
			if (!level) level = 0;

		    var members = [];
			
		    for (var p in object) members.push(this.createMember(p, object[p], level));

			return members;
		  },

		  createMember: function(name, value, level)  {
		    FBTrace.sysout(' createMember : ', value);
		    FBTrace.sysout(' createMember level : '+ level);

			
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
			 FBTrace.sysout("inside onfocus"); 
	        var links = event.target.getElementsByClassName('objectLink');
	        
	        if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'mouseover');
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
			  var repObject = row.repObject;
			  FBTrace.sysout("repObject: ", repObject);	
			  if (repObject) {
	            var members = this.getMembers(repObject.children, level+1);
				
	            if (members) this.loop.insertRows({members: members}, row);
			  }
			}
		  },
		  
		  highlightRow: function (event) {
			    
		      FBTrace.sysout("HIGHLIGHT...", event);
			 // var table = getAncestorByClass(event.target, "domTable");
		      //var row =  getAncestorByClass(event.target, "treeRow");
		      
		      var table = getAncestorByClass(event.target, "domTable");
		    	 // table = getAncestorByClass(event.target.offsetParent, "domTable");
		      	row = table.rows;
		      	tbody = table.children[0];
		      	FBTrace.sysout("inside pane-headings table", table);
		          FBTrace.sysout("inside pane-headings row", row);
		      var i;
		      var j;
		      var k;
		      var cell_selected;
		      var child;
		      var row;
		      FBTrace.sysout("table: ", table);
		      FBTrace.sysout("tbody: ", tbody);

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

		      //ainspectorUtil.setClass(row, "selected");
		      //var row_cells = cell.childNodes;
		      FBTrace.sysout("rowcells.....", row_cells);
		   },


	      toggleRow: function(row) {

			if (hasClass(row, "opened")) {
			  this.closeRow(row);
			} else {
			  this.openRow(row);
			}
		  },
		  getChildrenEle: function(element){
			 FBTrace.sysout("element.dom_elements:   ", element.dom_elements);	
			 return element.dom_elements; 
		  },
		  
		  hasChildElements: function(element){
			  FBTrace.sysout("inside hasChildElements: ", element);
			  if (element.dom_elements) return true;
			  else return false;
		  },
		  
		  onClick_htmlView: function(event) {
			FBTrace.sysout("event::::: ", event.target);
			var head_landmark = event.target.headLandElement.value;
		    var node = head_landmark.dom_element.node;
		    var panel = Firebug.chrome.selectPanel("html");
		    panel.select(node);  
		  }
 });
  }