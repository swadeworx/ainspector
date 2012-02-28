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
      clearNode(panelView.table);
	  panelView.panelNode.id = "ainspector-panel"; 
	  panel.table = AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate.tag.replace( {object: color_contrast_items}, panelView.panelNode, AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate);
	 // var element = panelView.document.createElement("div");
	  //panelView.panelNode.appendChild(element);
	  panel = panelView;
	  panel.selection = color_contrast_items[0];
      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
	  Firebug.currentContext.getPanel('Rules').showContrastOrAllElements(true, panel.selection);
    }
 };

AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate = domplate({
    tag:
    	
	  TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", tabindex: 0, onkeypress: "$onKeyPressedTable"},
	    THEAD(
	      TR({class: "gridHeaderRow a11yFocus", id: "tableTableHeader", "role": "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressRow"},
	        TH({class: "gridHeaderCell gridCell", id: "colConEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Elements")),
	        TH({class: "gridHeaderCell gridCell", id: "colConColorCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Color")),
	        TH({class: "gridHeaderCell gridCell", id: "colConBgCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "BG Color")),
	        TH({class: "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Large")),
	        TH({class: "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "BG Img")),
	        TH({class: "gridHeaderCell gridCell", id: "colConCCRCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "CCR")),
	        TH({class: "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
	      ) //end TR
	    ), //end THEAD
	    TBODY(
		  FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
		)
	  ),
    
	  row:
	    TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", 
	    	level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$highlightTreeRow"},
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
		    TAG("$member.tag", {'member' :"$member", 'object': "$member"}) 
		  ),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.color|getValue"),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.background_color|getValue"),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.is_large_font|getValue"),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.background_image|getValue"),
		  TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.color_contrast_ratio|getValue"),
		  TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
     		TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
 	    ),
	    
	  childrow : 
	    TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", 
    	  level: "$member.level", tabindex: "-1", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTreeRow", onclick: "$highlightTreeRow"},
	      TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			  "$member.tag_name"
	      ),
	      TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.color|getValue"),
	      TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.background_color|getValue"),
	      TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.is_large_font|getValue"),
	      TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.background_image|getValue"),
	      TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.color_contrast_ratio|getValue"),
	      TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
			TAG("$member.sevTag", {'member' :"$member", 'object': "$member.value"}))
		  ),
    
      strTag : DIV({class: "treeLabel"},"$member.count"),
      strTagPass : DIV({class: "passMsgTxt"}, "$member.acc_summary"),
      strTagViolation : DIV({class: "violationMsgTxt"}, "$member.acc_summary"),
      strTagManual : DIV({class: "manualMsgTxt"}, "$member.acc_summary"),
      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$member.acc_summary"),
      strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$member.acc_summary"),
      strTagInfo : DIV({class: "infoMsgTxt"}, "$member.acc_summary"),
      strTagWarn : DIV({class: "warnMsgTxt"}, "$member.acc_summary"),
      
	  loop:
	    FOR("member", "$members", TAG("$childrow", {member: "$member"})),

	    getValue : function(value){
    		if (value != undefined) return value;
    		else return "";
		},
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
		return members;
		  },

	  createMember: function(name, value, level)  {
	    var cc_summary = value.getColorContrastSummary();
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
	      indent: level * 16,
	      tag: this.strTag,
	      is_large_font: value.is_large_font,
	      acc_summary: cc_summary.label,
	      sevTag: this.getAccessibility(value)
	    };
	    else return {
	      color: value.color,
		  background_color: value.background_color,
		  color_contrast_ratio: value.color_contrast_ratio,
	      background_image: value.background_image,
	      tag_name: value.tag_name,
	      indent: level * 16,
      	  tag: this.strTag,
      	  is_large_font: value.is_large_font,
	      acc_summary: cc_summary.label,
	      sevTag: this.getAccessibility(value)
	    };
	  },
	  
	  getAccessibility : function(object){
		var severity =  object.getColorContrastSummary().label;
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
        //var links = event.target.getElementsByClassName('objectLink');
        
       // if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'mouseover');
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
      toggleRow: function(row) {

		if (hasClass(row, "opened")) {
		  this.closeRow(row);
		} else {
		  this.openRow(row);
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

