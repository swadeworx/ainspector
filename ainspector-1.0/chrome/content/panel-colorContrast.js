var AINSPECTOR_FB = AINSPECTOR_FB || {};

AINSPECTOR_FB.colorContrast = {  
	      
    /**
	 * panelsView
	 * 
	 * @desc
	 * 
	 * @param head_land_toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cache_object
	 * @returns
	 */
	 colorContrastPanelView : function(toolbar, panelView, cache_object) {
	        
      var color_contrast_cache = cache_object.dom_cache.color_contrast_cache; 
      
      var color_contrast_items = color_contrast_cache.color_contrast_items;

	  panelView.panelNode.id = "ainspector-panel"; 
	        
	  panel = panelView;

	  panel.table = colorContrastTreeTemplate.tag.replace( {object: color_contrast_items}, panel.panelNode, colorContrastTreeTemplate);
	  Firebug.currentContext.getPanel('Rules').sView(true, color_contrast_items[0]);
    }
 };

with (FBL) {
  
  panel : null;

    this.colorContrstTreeTemplate = domplate({
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
	    	level: "$member.level", tabindex: "-1", onkeypress: "$onKeyPressedRow", onfocus: "$onFocus", onclick: "$highlightRow"},
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member"},
		    TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
		  ),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_color"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.color_contrast_ratio"),
		  TD({class: "memberLabelCell", _repObject: "$member"}, "$member.background_image")
	    ),

      strTag : DIV({class: "treeLabel"},"$member.count"),

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

	  getMembers: function(object, level) {
			    
		if (!level) level = 0;

	    var members = [];
		
	    for (var p in object) members.push(this.createMember(p, object[p], level));

		return members;
	  },

	  createMember: function(name, value, level)  {
	  //  FBTrace.sysout(' createMember : ', value);
		return {
		  name: value.dom_element.tag_name, //name,
		  count: value.dom_element.length,
		  role_level: (value.dom_element.role) ? value.dom_element.role : value.level,
		  text: (value.dom_element.role) ? (value.label) : value.name,
		  color: value.color,
		  background_color: value.background_color,
		  color_contrast_ratio: value.color_contrast_ratio,
		  background_image: value.background_image,
	      hasChildren: this.hasChildElements(value), 
	      children: this.getChildrenEle(value),
	      value: (value != null) ? value : "",
	      label: (value.dom_element.children != null) ? "" : value,
	      level: level,
	      indent: level * 16,
	      tag: this.strTag
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
	  
	  onClick_htmlView: function(event) {
		FBTrace.sysout("event::::: ", event.target);
		var head_landmark = event.target.headLandElement.value;
	    var node = head_landmark.dom_element.node;
	    var panel = Firebug.chrome.selectPanel("html");
	    panel.select(node);  
	  }
	  
	});
   
  }

