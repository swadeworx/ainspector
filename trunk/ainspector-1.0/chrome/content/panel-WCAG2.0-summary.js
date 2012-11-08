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

/**
 * @file panel-WCAG2.0-summary.js
 * 
 * Create WCAG view in response to the WCAG toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the Rule Results from the OAA Cache library
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
  
  AINSPECTOR_FB.WCAGView = {

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

//      adds or removes the side panels from the extension depending on the panel we are in 
      AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels("none");
    
      if (!context) context = Firebug.currentContext;
    
      if (!panel_name) panel_name = "AInspector";
      panel = context.getPanel(panel_name, true);

      if (!cache_object) {

        if (AINSPECTOR_FB.ruleset_object)
          cache_object = AINSPECTOR_FB.ruleset_object;
        else
          cache_object = AINSPECTOR_FB.cacheUtil.updateCache();
      }

      /* Clear the panel before writing anything onto the report*/
      if (panel) {
        clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('elementsSidePanel').panelNode);
      }
      
      var filtered_WCAG_results = cache_object.getFilteredRuleResultsByRuleSummary(OpenAjax.a11y.RULE_SUMMARY.WCAG20, "WCAG 2.0",
                          AINSPECTOR_FB.preferences.wcag20_level, AINSPECTOR_FB.preferences.show_results_filter_value);
      FBTrace.sysout("filtered_WCAG_results: ", filtered_WCAG_results);
      
      var filtered_summary = filtered_WCAG_results.filtered_rule_results_groups;
      
      FBTrace.sysout("filtered_summary: ", filtered_summary);
      AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
      
      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      
      panel.table = AINSPECTOR_FB.wcagSummary.tag.replace({object: filtered_summary, view: 'Rules By WCAG 2.0'}, toolbar, AINSPECTOR_FB.wcagSummary);
      
      var element = panel.document.createElement("div");
      element.style.display = "block";
      
      panel.panelNode.id = "ainspector-panel"; 
      panel.panelNode.appendChild(toolbar);
      panel.panelNode.appendChild(element);
      
      var selected_row = AINSPECTOR_FB.toolbarUtil.selectRow(panel, filtered_summary[0], true, "WCAGView");

      if (AINSPECTOR_FB.previous_selected_row != null && selected_row) Firebug.currentContext.getPanel('elementsSidePanel').sView(true, filtered_summary[selected_row]);
    
      else Firebug.currentContext.getPanel('elementsSidePanel').sView(true, filtered_summary[0]);

    }
  };
  
  AINSPECTOR_FB.wcagSummary = domplate({
   
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
                TH({class: "gridHeaderCell gridCell", id: "headEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, 
                  DIV({class: "gridHeaderCellBox"}, "Rule")
                ),
                TH({class: "gridHeaderCell gridCell", id: "headLabelCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, 
                  DIV({class: "gridHeaderCellBox", title: "Rules Hidden"}, "Required")
                ),
                TH({class: "gridHeaderCell gridCell", id: "headDescCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, 
                  DIV({class: "gridHeaderCellBox", title: "Rules Passed"}, "Level")
                ),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, 
                  DIV({class: "gridHeaderCellBox", title: "Rules Warning"}, "PEPR")
                ),
                TH({class: "gridHeaderCell gridCell", id: "headAccCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, 
                  DIV({class: "gridHeaderCellBox", title: "Rules Manual Check"}, "MC")
                )
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
            DIV({class: "$member.hasChildren|getClassName", title : "$member.rule_description"}, "$member.rule_description|AINSPECTOR_FB.ainspectorUtil.truncateText")
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, 
            DIV({class: ""}, "$member.required")
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            DIV({class: ""}, "$member.wcag20_level")
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.impl_percentage_tag", {'member' :"$member", 'object': "$member.value"})
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"},
            TAG("$member.manual_check", {'member' :"$member", 'object': "$member.value"})
          )
        ),

        strTagManual : DIV({class: "manualMsgTxt resultAlign"}, "$member.manual_check_count"),
        zeroTag: DIV({class: "resultAlign"}, "0"),
        strTagViolation : DIV({class: "violationMsgTxt resultAlign"}, "$member.PEPR"), 
        strTagPass : DIV({class: "passMsgTxt resultAlign"}, "$member.PEPR"), 
        strTagWarn : DIV({class: "warnMsgTxt resultAlign"}, "$member.PEPR"), 
        
        loop:
          FOR("member", "$members", TAG("$row", {member: "$member"})),
      
        /**
         * @function getClassName
         */  
        getClassName : function(hasChildren) {
          
          if (hasChildren) return 'treeLabel';
          
        },
          
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
          FBTrace.sysout("rep: ", repObject);
          if (repObject) {
            var members = this.getMembers(repObject.filtered_results, level+1);
        
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

      createMember: function(name, rule_result_groups, level)  {
        
        var required = '';
        var wcag20_level = '';
        var implementation_percentage = '';
        var nls_impl_level = null;
        var rule_group = false;
        var rule_description = '';
        var manual_check_count = 0;
        
        if (rule_result_groups.rule_result){

          var rule_result           = rule_result_groups.rule_result;
          required                  = (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) ? 'Yes' : 'No';
          wcag20_level              = rule_result.rule.getNLSWCAG20Level();
          nls_impl_level            = rule_result_groups.getNLSImplementationLevel();
          rule_description          = rule_result.message;
          implementation_percentage = rule_result_groups.implementation_percentage;

        } else {
          rule_description          = rule_result_groups.title;
          nls_impl_level            = rule_result_groups.getNLSImplementationLevel();
          implementation_percentage = rule_result_groups.getImplementationLevel();
          rule_group                = true;
        }
        
        var PEPR = nls_impl_level.label;
        var num = PEPR.substring(0, PEPR.indexOf('%'));
        var impl_percentage_tag = null;

        if (rule_result_groups.manual_checks_count > 0)  manual_check_count = rule_result_groups.manual_checks_count;
        
        if (num == '100') impl_percentage_tag = this.strTagPass;
        
        else if (num == '0') impl_percentage_tag = this.strTagViolation;
        
        else if (num > '50' && num < '100') impl_percentage_tag = this.strTagWarn;
        
        else if (num <= '50' && num > '0') impl_percentage_tag = this.strTagViolation;
        
        else impl_percentage_tag = this.strTagStyle;
        FBTrace.sysout("implementation_percentage: "+ implementation_percentage);
        FBTrace.sysout("PEPR: "+ PEPR);
        return {
          
          PEPR               : PEPR,
          level              : level,
          indent             : level * 16,
          required           : required,
          wcag20_level       : wcag20_level,
          rule_description   : rule_description,
          manual_check_count : manual_check_count,
          manual_check       : (manual_check_count >= 1) ? this.strTagManual : this.zeroTag,
          filtered_results   : this.getFilteredWCAGResults(rule_result_groups), //children
          hasChildren        : this.hasChildren(rule_result_groups),
          value              : (rule_result_groups != null) ? rule_result_groups : "",
          impl_percentage_tag : impl_percentage_tag,
        };
        
      },
      
      /**
       * @function hasChildren
       */
      hasChildren : function(filtered_rule_results) {
        
        if (filtered_rule_results.filtered_rule_results_groups &&
            filtered_rule_results.filtered_rule_results_groups.length > 0 ) {
          return true;
        } else if (filtered_rule_results.filtered_rule_results &&
              filtered_rule_results.filtered_rule_results.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      
      /**
       * @function getFilteredResults
       * 
       * @desc
       * 
       * @param 
       */
      getFilteredWCAGResults : function (rule_result_groups) {
        
        if (rule_result_groups.filtered_rule_results_groups) return rule_result_groups.filtered_rule_results_groups;
        
        else if (rule_result_groups.filtered_rule_results) return rule_result_groups.filtered_rule_results;
        
        else return '';
      },

      /**
       * @function onClick_htmlView
       * 
       * @desc
       * 
       * @param
       */
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
          if (row.repObject) length += row.repObject.filtered_results.length;
          
        }
      }

  });
}