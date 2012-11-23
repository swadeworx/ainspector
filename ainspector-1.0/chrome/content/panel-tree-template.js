var AINSPECTOR_FB = AINSPECTOR_FB || {};  

with (FBL) {
  
  AINSPECTOR_FB.treeTemplate = AINSPECTOR_FB.treeTemplate || {};
  
  AINSPECTOR_FB.treeTemplate.grid = domplate({
    
    tag:
      DIV({class: "main-panel"},
        DIV({class: "ruleset-div"},
          SPAN({class: "ruleset-title"}, "Ruleset:  "),
          SPAN({class: "ruleset-value"}, "$AINSPECTOR_FB.ruleset_title"),
          SPAN({class: "ruleset-level"}, " Level:  "),
          SPAN({class: "ruleset-level-value"}, "$AINSPECTOR_FB.selected_level"),
          BUTTON({class: "button", onclick: "$Firebug.preferenceModule.viewPanel", style: "margin-left: 0.5em;"}, "preferences"),
          BUTTON({onclick: "$AINSPECTOR_FB.flatListTemplateUtil.highlightAll", style: "margin-left: 0.5em;", _repObject: "$object"}, "show all"),
          SPAN({class: "view-panel"}, "$view")
        ),
        DIV({class: "table-scrollable"},
          TABLE({class: "domTree domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
           tabindex: "0", onkeypress: "$onKeyPressedRow"},
            THEAD(
              TR({class: "gridHeaderRow gridRow", id: "tableTableHeader", role: "row", tabindex: "-1", "aria-selected" : "false",
               onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus"},
                TH({class: "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
                TH({class: "gridHeaderCell gridCell", id: "headLabelCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox", title: "Rules Hidden"}, "H")),
                TH({class: "gridHeaderCell gridCell", id: "headDescCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox", title: "Rules Passed"}, "P")),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox", title: "Rules Warning"}, "W")),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox", title: "Rules Manual Check"}, "MC")),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox", title: "Rules Violation"}, "V")),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "goto"))
              ) //end TR
            ), //end THEAD
            TBODY(
              FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
            )
          )
        )
      ),
      
      row:
        TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
         "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex",
         onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightTreeRow", ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
           TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, TAG("$member.hidden_count", {'member' :"$member", 'object': "$member.value"})),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.pass_count", {'member' :"$member", 'object': "$member.value"})),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.warn_count", {'member' :"$member", 'object': "$member.value"})),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.manualCheck_count", {'member' :"$member", 'object': "$member.value"})),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.violation_count", {'member' :"$member", 'object': "$member.value"})),
          TD({class: "memberLabelCell resultAlign", _repObject: "$member.value"},
            BUTTON({onclick: "$AINSPECTOR_FB.toolbarUtil.gotoHTML", id: "html_panel_button", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.htmlButtonPress"}, "HTML"))
        ),

        strTag : DIV({class: "treeLabel"},"$member.name"),
        styleTag : DIV({class: "styleLabel"},"no label"),
        normalTag : DIV({class: ""},"lab"),
        strTagPass : DIV({class: "passMsgTxt resultAlign"}, "$member.pass_ct"),
        strTagViolation : DIV({class: "violationMsgTxt resultAlign"}, "$member.violation_ct"),
        strTagManual : DIV({class: "manualMsgTxt resultAlign"}, "$member.manualCheck_ct"),
        strTagHidden : DIV({class: "hiddenMsgTxt resultAlign"}, "$member.hidden_ct"),
        strTagWarn : DIV({class: "warnMsgTxt resultAlign"}, "$member.warn_ct"),
        zeroTag: DIV({class: "resultAlign"}, "0"),
        
        loop:
          FOR("member", "$members", TAG("$row", {member: "$member"})),
      
        /**
         * @function memberIterator
         * 
         * @desc
         * 
         * @param {Object} object
         */  
        memberIterator: function(object) {
          
          return this.getMembers(object);
        },
    
        /**
         * @function highlightTreeRow
         * 
         * @desc
         * 
         * @param {Object} event
         */
        highlightTreeRow : function(event){
    
          panel.selection = Firebug.getRep(event.target);
          AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
        },

        /**
         * @function onClick
         * 
         * @desc
         * 
         * @param {Object} event
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
         * 
         * @param {Object} event
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
       * @desc
       * 
       * @param {Object} event
       */
      isTreeRow: function(node) {
        return hasClass(node, "treeRow");
      },

     /**
      * @function onKeyPressedRow
      * 
      * @desc
      * 
      * @param {Object} event
      */
      onKeyPressedRow: function(event) {
        
        event.stopPropagation();

        switch(event.keyCode) {
      
          case KeyEvent.DOM_VK_LEFT: //left
        
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");
              
            if (hasClass(row, "opened")) { // if open
              this.closeRow(row); // close
            } else {
              var table = getAncestorByClass(event.target, "domTable");
              table.focus(); // focus parent;
            }
            
            break;
            
          case KeyEvent.DOM_VK_UP: //up
            event.preventDefault();
            var table = getAncestorByClass(event.target, "domTable");

            var row = findPrevious(event.target, this.isTreeRow, false);

            if (row) {
              AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
            } else {  
          
              if (event.target.rowIndex == '1') row = table.rows[0];
            }
            row.focus();
        
            break;
              
          case KeyEvent.DOM_VK_RIGHT: //right
          
            event.preventDefault();
            var row = getAncestorByClass(event.target, "treeRow");

            if (hasClass(row, "hasChildren")) this.openRow(row);

            break;
              
          case KeyEvent.DOM_VK_DOWN: //down
        
            event.preventDefault();
            var table = getAncestorByClass(event.target, "domTable");

            var row = findNext(event.target, this.isTreeRow, false);

            if (row) row.focus();

            //If the event is fired on header row, rowIndex check is made to make sure header row is not highlight.
            if (!event.target.rowIndex == '0') AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);

            break;
              
          case KeyEvent.DOM_VK_ENTER: //Enter
        
            event.preventDefault();
            var links = event.target.getElementsByClassName('objectLink');
            
            if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'click');
      
            break;
        }
      },
  
      /**
       * @function closeRow
       * 
       * @desc
       * 
       * @param {Object} row
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
       */
      openRow: function(row) {
      
        if (!hasClass(row, "opened")) {
        
          var level = parseInt(row.getAttribute("level"));
          setClass(row, "opened");
          var repObject = row.newObject;
        
          if (repObject) {
            var members = this.getMembers(repObject.children, level+1);
        
            if (members) this.loop.insertRows({members: members}, row);
          }
          return panel.table;
        }
      },
      
      highlightRow: function (event) {
          
       // var table = getAncestorByClass(event.target, "domTable");
          //var row =  getAncestorByClass(event.target, "treeRow");
          
          var table = getAncestorByClass(event.target, "domTable");
           // table = getAncestorByClass(event.target.offsetParent, "domTable");
            row = table.rows;
            tbody = table.children[0];
          var i;
          var j;
          var k;
          var cell_selected;
          var child;
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

          //ainspectorUtil.setClass(row, "selected");
          //var row_cells = cell.childNodes;
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
//          var acc = value.dom_element.getAccessibility();
//          var name = value.cache_item.dom_element.tag_name;
        
        var name = null;
        
        if (value.cache_item) name = value.cache_item.toString();
        else name = value.toString();
        
        var hasChildren = false;
        
        if (value.filtered_children){
          if (value.filtered_children.length > 0) hasChildren = true;
        } else {
          if (value.child_cache_elements && value.child_cache_elements.length > 0) hasChildren = true; 
        }
        var styleTag;
        
        return {
          name: name, //name,
          hasChildren: hasChildren, 
          children: (value.filtered_children) ? value.filtered_children : value.child_cache_elements,
          value: (value != null) ? value : "",
          level: level,
          indent: level * 16,
          tag: this.strTag,
          violation_count: (value.violations_count > 0) ? this.strTagViolation : this.zeroTag,
          hidden_count: (value.hidden_count > 0) ? this.strTagHidden : this.zeroTag,
          pass_count: (value.passed_count > 0) ? this.strTagPass : this.zeroTag,
          manualCheck_count: (value.manual_checks_count > 0) ? this.strTagManual : this.zeroTag,
          warn_count: (value.warnings_count > 0) ? this.strTagWarn : this.zeroTag,
          violation_ct: value.violations_count,
          hidden_ct: value.hidden_count,
          pass_ct: value.passed_count,
          manualCheck_ct: value.manual_checks_count,
          warn_ct: value.warnings_count
        };
      },
      
      getAccessibility : function(object){

        var severity =  object.dom_element.getAccessibility().label;
        var styleSeverityTag;
        
        if (severity == "Pass")  styleSeverityTag = this.strTagPass;
        
        else if (severity == "Violation") styleSeverityTag = this.strTagViolation;
        
        else if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
        
        else if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
        
        else if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
        
        else if (severity == "Information") styleSeverityTag = this.strTagInfo;
        
        else if (severity == "Warning") styleSeverityTag = this.strTagWarn;
        
        return styleSeverityTag;
      },
      
      getChildrenEle: function(element) {
        
        var tag_name = element.dom_element; 
        
        if (tag_name == 'h1' || tag_name == 'h2' || tag_name == 'h3' ||
         tag_name == 'h4' || tag_name == 'h5' || tag_name == 'h6') {
          return [];  
        } else {
          return element.child_cache_elements; 
        }
      },
      
      hasChildElements: function(element) {
      
        if (typeof element.has_element_children === 'undefined') { 
        
          /* check if the child elements are the only text. If so set hasChildren to false. */
          if (element.child_cache_elements && element.child_cache_elements.length > 0)
            return element.dom_element.has_element_children;
          else return false;
        } else {
          return element.has_element_children;
        }
      },
      
      /**
       * @function checkLabel
       * 
       * @desc checks whether we have a label or not
       * 
       * @param {String} label - label for the control element
       * @return label | no Label(String)
       */
      checkLabel : function(childrenFlag) {
        
        if (childrenFlag == true) {
          return " ";
        } else {
          return this.styleTag;
        }
      },
      
      onClick_htmlView: function(event) {
      
        var head_landmark = event.target.headLandElement.value;
        var node = head_landmark.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);  
      },
      
      /**
       * @function getElementInformation
       * 
       * @desc calls a utility that opens a xul window for more properties of the element selected in the panel
       * 
       * @param {Object} event - event triggered when clicked on Element Information button
       */
      getElementInformation : function(event) {
        
        var tree = getAncestorByClass(event.target, "main-panel");
        
        var sub_div = getChildByClass(tree, "table-scrollable");
        var table = getChildByClass(sub_div, "domTable");
//        var table = tree.children[6];
        var tbody = table.children[1];
        
        var rows = tbody.children;
        var row;
        var flag = false;
        
        for (var i=0; i<=rows.length; i++) {
          
          var class_list = rows[i].classList;
          
          for (var j=0; j<class_list.length; j++) {
            
            if (class_list[j] == "gridRowSelected") {

              flag = true;
              break;
            }
          }
          
          if (flag == true) {
            
            row = rows[i];
            break;
          }
        }

        AINSPECTOR_FB.element_info_dialog = window.openDialog("chrome://firebug-a11y/content/item_properties/cache-item-properties.xul", "cache_item_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject);
      },
      
      /**
       * @function expandAll
       * 
       * @desc expands all the rows in the tree 
       * 
       * @param {Object} panel - panel with the tree structure already created
       */
      expandAllRows : function (panel) {
        
        var main_panel = getAncestorByClass(panel, 'main-panel');
        var sub_div = getChildByClass(main_panel, 'table-scrollable');
        var table = getChildByClass(sub_div, 'domTable');
        var rows = table.rows;
        var length = table.rows.length;
        
        for (var i = 0; i < length; i++) {
          var row = rows[i];

          if (hasClass(row, "hasChildren")) this.openRow(row);
          if (row.repObject) length += row.repObject.filtered_children.length;
          
        }
      }
  });
  
  AINSPECTOR_FB.BaseRep = domplate(Firebug.Rep, {
    
    /**
     * @function getNaturalTag
     * 
     * @desc
     * 
     * @param value
     */
    getNaturalTag: function(value) {
    
      var rep = Firebug.getRep(value);
      var tag = rep.shortTag ? rep.shortTag : rep.tag;
      
      return tag;
    }
  });
  
  AINSPECTOR_FB.emptySidePanelTemplate = domplate(AINSPECTOR_FB.BaseRep, {
    
    tag:
      DIV({class: "side-panel"},
        DIV({class: "eval-results"}, "$desc"),
          TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
            THEAD(
              
              TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
                FOR('header', '$headers',
                  TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "$header"))
                )//end FOR
              ) //end TR
            ), //end THEAD
            TBODY(
              TR({class: "tableRow gridRow", role: "row"},
                TD(DIV({class: "gridCol gridCell gridContent"},"$messg"))
              ) //end TR
            ) //end TBODY  
          ), //end TABLE
          //BUTTON({class: "more-info", disabled:"disabled", id: "rule_info_button"}, "More Information on Rule")
          DIV({class: "notificationButton-rule"},
            BUTTON({disabled:"disabled", id: "rule_info_button"}, "More Information on Rule")
          )
        )
    });
  }