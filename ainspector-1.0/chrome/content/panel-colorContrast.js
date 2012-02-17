var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
	  
  panel : null;
  
  AINSPECTOR_FB.colorContrast = {  
	      
    /**
	 * @function colorContrastPanelView
	 * 
	 * @desc
	 * 
	 * @param head_land_toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cache_object
	 * @returns
	 */
	 colorContrastPanelView : function(panelView, cache_object) {
	        
      var color_contrast_cache = cache_object.dom_cache.color_contrast_cache; 
      
      var color_contrast_items = color_contrast_cache.color_contrast_items;
      FBTrace.sysout("color_contrast_cache: ", color_contrast_cache);

	        

      FBTrace.sysout("panelv: ", panelView);
	  panelView.panelNode.id = "ainspector-panel"; 

      
	  panelView.table = AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate.tag.replace( {object: color_contrast_items}, panelView.panelNode, AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate);
	  
	  var element = panelView.document.createElement("div");

	  panelView.panelNode.appendChild(element);
	  
	  panel = panelView;
	  
	  FBTrace.sysout("panel: ", panel);
	 
	  panel.selection = color_contrast_items[0];
  	  
      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);

	  Firebug.currentContext.getPanel('Rules').showContrastOrAllElements(true, panel.selection);
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

AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate = domplate({
    tag:
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    THEAD(
	      TR({"class": "gridHeaderRow a11yFocus", id: "tableTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
	        TH({"class": "gridHeaderCell gridCell", id: "colConEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Elements")),
	        TH({"class": "gridHeaderCell gridCell", id: "colConColorCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Color")),
	        TH({"class": "gridHeaderCell gridCell", id: "colConBgCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Background")),
	        TH({"class": "gridHeaderCell gridCell", id: "colConCCRCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "CCR")),
	        TH({"class": "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "BG Image"))
	      ) //end TR
	    ), //end THEAD
	    TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
    
	  row:
	    TR({class: "treeRow", $hasChildren: "$member.hasChildren", _repObject: "$member", 
	    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$highlightTreeRow"},
		  TD({class: "memberLabelCell treeLabel", style: "padding-left: $member.indent\\px", _repObject: "$member"},
				  "$member.count"
		  ),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_color"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color_contrast_ratio"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_image")
	    ),
	    
	  childrow : 
	    TR({class: "treeRow", _repObject: "$member", 
    	  level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onclick: "$highlightTreeRow"},
	      TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
			  "$member.tag_name"
	      ),
	      TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color"),
	      TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_color"),
	      TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color_contrast_ratio"),
	      TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_image")
    
      ),

	  loop:
	    FOR("member", "$members", TAG("$childrow", {member: "$member"})),

	  /**
	   * @function highlightTreeRow
	   * 
	   * @desc helper function to call highlight
	   * 
	   * @param {Event} event - even triggered when a row is selected in a panel
	   * @property {Object} selection - present selected row info to be passed to the side panel 
	   */
	  highlightTreeRow : function(event){
			    	  
		panel.selection = Firebug.getRepObject(event.target);
		FBTrace.sysout("panel: zupzupzupz", panel);
		AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
  	  },

	  onClick: function(event) {
			    
		if (!isLeftClick(event)) return;

	    var row = getAncestorByClass(event.target, "treeRow");
		var label = getAncestorByClass(event.target, "treeLabel");
		
		if (label && hasClass(row, "hasChildren")) this.toggleRow(row);
	  },
	  
	  memberIterator: function(object) {
	    return this.getMembers(object);
	 },
		  
	  getMembers: function(object, level) {
		    
		if (!level) level = 0;

	    var members = [];
		
	    for (var p in object) members.push(this.createMember(p, object[p], level));
	    FBTrace.sysout("members: ", members);
		return members;
		  },

	  createMember: function(name, value, level)  {
	  //  FBTrace.sysout(' createMember : ', value);
		if (level == 0) return {
		  count: value.dom_elements.length,
		  role_level: (value.dom_elements.role) ? value.dom_elements.role : value.level,
		  color: value.color,
		  background_color: value.background_color,
		  color_contrast_ratio: value.color_contrast_ratio,
		  background_image: value.background_image,
	      hasChildren: (value.dom_elements.length > 0) ? true : false,
	      children: value.dom_elements,
	      value: (value != null) ? value : "",
	      level: level,
	      indent: level * 16
	    };
	    else return {
	      color: value.color,
		  background_color: value.background_color,
		  color_contrast_ratio: value.color_contrast_ratio,
	      background_image: value.background_image,
	      tag_name: value.tag_name
	    };
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
		  FBTrace.sysout("row: ", row);
		  if (repObject) {
            var members = this.getMembers(repObject.children, level+1);
			
            if (members) this.loop.insertRows({members: members}, row);
		  }
		}
	  },
      toggleRow: function(row) {

		if (hasClass(row, "opened")) {
		  this.closeRow(row);
		} else {
		  this.openRow(row);
		}
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

