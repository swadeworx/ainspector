define([
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/firebug",
  "firebug/lib/domplate",
  "firebug/lib/events",
  "firebug/lib/dom",
  "firebug/lib/css",
  "ainspector/sidePanelUtil",
  "ainspector/ainspectorPreferences",
  "ainspector/openajax_a11y/oaa_a11y_amd",
  "ainspector/ainspectorUtil",
  "ainspector/ainspectorModule",
  ],
  function (FBTrace, Locale, Firebug, Domplate, Events, Dom, Css, SidePanelUtil, AinspectorPreferences, OpenAjax, AinspectorUtil) {
    
    with (Domplate){
    
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      
      Firebug.AinspectorModule.AinspectorTreeTemplate = domplate(Firebug.Rep, new Firebug.Listener(), {
      
        tag:
          DIV({class:"main-panel"},
            SPAN({}, "$view"), 
            BUTTON({onclick: "$expandAll", style: "float:right;", _repObject: "$results"}, "Expand All"),
            BUTTON({onclick: "$collapseAllRows", style: "float:right;", _repObject: "$results"}, "Collapse All"),
            TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", onclick:"$toggleRows"},
              THEAD(
                TR({class: "gridHeaderRow firstRow gridRow", "aria-selected" : "false", tabindex: "-1"},
                  TH({class: "gridHeaderCell", id: "headEleCol"}, 
                    DIV({class: "gridHeaderCellBox"}, 
                      Locale.$STR("ainspector.header.element"))
                  ),
                  TH({class: "gridHeaderCell", id: "headLabelCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.hidden")}, 
                      Locale.$STR("ainspector.header.hidden"))
                  ),
                  TH({class: "gridHeaderCell", id: "headDescCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.pass")}, 
                      Locale.$STR("ainspector.header.pass"))
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.warning")}, 
                      Locale.$STR("ainspector.header.warning"))
                  ),
                  TH({class: "gridHeaderCell ", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.manualcheck")}, 
                      Locale.$STR("ainspector.header.manualcheck"))
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.violation")}, 
                      Locale.$STR("ainspector.header.violation"))    
                  ),
                  TH({class: "gridHeaderCell", id: "headAccCol"}, 
                    DIV({class: "gridHeaderCellBox"}, 
                      Locale.$STR("ainspector.header.goto"))
                  )
                ) //end TR
              ), //end THEAD
            TBODY(
              FOR("member", "$results|memberIterator", TAG("$row", {member: "$member"}))
            )
           ) //end TABLE
          ),
          
          row :
            TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", level: "$member.level",
             onclick: "$highlightTreeRow", ondblclick: "$toHTMLPanel",
             _newObject: "$member", _repObject: "$member.value"},
              TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
                TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"}, 
                TAG("$member.hidden_count", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"},
                TAG("$member.pass_count", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"},
                TAG("$member.warn_count", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"},
                TAG("$member.manualCheck_count", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"},
                TAG("$member.violation_count", {'member' :"$member", 'object': "$member.value"})
              ),
              TD({class: "memberLabelCell gridAlign", _repObject: "$member.value"},
                BUTTON({onclick: "$toHTMLPanel", id: "html_panel_button"}, "HTML")
              )
           ),
           
           strTag : DIV({class: "treeLabel"},"$member.name"),
           styleTag : DIV({class: "styleLabel"},"no label"),
           normalTag : DIV({class: ""},"lab"),
           strTagPass : DIV({class: "passMsgTxt gridAlign"}, "$member.pass_ct"),
           strTagViolation : DIV({class: "violationMsgTxt gridAlign"}, "$member.violation_ct"),
           strTagManual : DIV({class: "manualMsgTxt gridAlign"}, "$member.manualCheck_ct"),
           strTagHidden : DIV({class: "hiddenMsgTxt gridAlign"}, "$member.hidden_ct"),
           strTagWarn : DIV({class: "warnMsgTxt gridAlign"}, "$member.warn_ct"),
           zeroTag: DIV({class: "gridAlign"}, "0"),
           
           loop:
             FOR("member", "$members", TAG("$row", {member: "$member"})),
  
          /**
           * @function memberIterator
           */
          memberIterator : function(object) {
            
            return this.getMembers(object);
          },
          
          /**
           * @function viewTag
           * 
           * @desc gets cache item results for a rule category
           * 
           * @param {Object}rule_results - rule results object
           * @param {String}rule_category- specific rule category selected in the menu  
           */
          viewTag : function(rule_results, rule_category, view, id) {
            
            SidePanelUtil.addAndRemoveSidePanels(true);

            var preferences = AinspectorPreferences.getPreferences();
            var panel = Firebug.currentContext.getPanel("ainspector", true);
            var cache_results = rule_results.getCacheItemsByElementType(rule_category, preferences.show_results_filter_value);
            if (panel)
              Dom.clearNode(panel.panelNode);
            
            panel.panelNode.id = "ainspector-panel";
            var cache_item_results = cache_results.cache_item_results;
            
            if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; AinspectorTreeTemplate.viewTag(cache_results): ", cache_results);
              
            if (cache_results.cache_item_results.length > 0) { 
              panel.table = this.tag.replace({results: cache_item_results, view:view}, panel.panelNode);
              this.expandAllRows(panel.table);
            } else {
              panel.table = AinspectorUtil.noDataView.tag.replace({view:view}, panel.panelNode);
            }  
            AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
            
            var side_panel = Firebug.chrome.getSelectedSidePanel();
            
            AinspectorUtil.selectRow(panel.table, false, id);
            
            if (side_panel){
             
              if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, 
                  side_panel.panelNode, side_panel.name);
              else if (cache_results.cache_item_results.length == 0) side_panel.getPanelViewMesg(side_panel.panelNode, "There are no elements in the left Panel");
              else side_panel.getPanelViewMesg(side_panel.panelNode, "");
            } else {
              side_panel = Firebug.currentContext.getPanel('ruleResults');
              side_panel.getPanelViewMesg(side_panel.panelNode, "");
            }
            
//            AinspectorUtil.selectedView = id;
          },
          
          /**
           * @function getMembers
           * 
           * @desc 
           */
          getMembers: function(object, level) {
            
            if (!level) level = 0;
            var members = [];
            
            for (var p in object) members.push(this.createMember(p, object[p], level));
            return members;
              
          },
          
          /**
           * @function createMembers
           * 
           * @desc creates needed result object for each rule result
           * 
           * @param {Number}key   -
           * @param {Object}object - rule result object 
           * 
           * @return 
           */
          createMember: function(key, value, level)  {
            
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
          
          /**
           * @function toggleRows
           */
          toggleRows : function(event) {
            
            if (!Events.isLeftClick(event)) return;
  
            var row = Dom.getAncestorByClass(event.target, "treeRow");
            var label = Dom.getAncestorByClass(event.target, "treeLabel");
      
            if (label && Css.hasClass(row, "hasChildren")) this.toggleRow(row);
          },
          
          /**
           * @function toggleRow
           */
          toggleRow : function(row) {
            
            if (Css.hasClass(row, "opened")) {
              this.closeRow(row);
            } else {
              this.openRow(row);
            }
          },
          
          /**
           * @function closeRow
           * 
           * @desc collapses the row and hides the nested rows
           * 
           * @param {Object} row - row thats already expanded
           */
          closeRow : function(row){
  
            if (Css.hasClass(row, "opened")) {
              var level = parseInt(row.getAttribute("level"));
              Css.removeClass(row, "opened");
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
           * @desc expands a row and shows the nested rows
           * 
           * @param {Object}row - row that is closed
           */
          openRow : function(row){
            
            if (!Css.hasClass(row, "opened")) {
              
              var level = parseInt(row.getAttribute("level"));
              Css.setClass(row, "opened");
              var repObject = row.newObject;
            
              if (repObject) {
                var members = this.getMembers(repObject.children, level+1);
            
                if (members) this.loop.insertRows({members: members}, row);
              }
  //            return panel.table;
            }
          },
          
          /**
           * @function highlightTreeRow
           */
          highlightTreeRow : function(event){
            
            var table       = Dom.getAncestorByClass(event.target, "domTable");
            var current_row = Dom.getAncestorByClass(event.target, "treeRow");
            AinspectorUtil.highlightRow(event, table, current_row);
          },
          
          /**
           * @function toHTMLPanel
           */
          toHTMLPanel : function(event) {
            
            AinspectorUtil.toHTMLPanel(event);
          },
          
          expandAll : function(event) {
            this.expandAllRows(event.target);
          },
          
          expandAllRows : function(panel){
            
            var main_panel = Dom.getAncestorByClass(panel, 'main-panel');
            var table = Dom.getChildByClass(main_panel, 'domTable');

            var rows = table.rows;
            var length = table.rows.length;
            
            for (var i = 0; i < length; i++) {
              var row = rows[i];

              if (Css.hasClass(row, "hasChildren")) this.openRow(row);
              
              if (row.repObject) {
                var object = row.repObject;
                
                if (object.filtered_rule_results) length += object.filtered_rule_results.length;
                
                if (object.filtered_rule_results_groups) length += object.filtered_rule_results_groups.length;
              }
            }
          },
          
          collapseAllRows : function (event) {
            
            var main_panel = Dom.getAncestorByClass(event.target, 'main-panel');
            var table = Dom.getChildByClass(main_panel, 'domTable');

            var rows = table.rows;
            var length = table.rows.length;
            
            for (var i = 0; i < length; i++) {
              var row = rows[i];
              if (Css.hasClass(row, "opened")) this.closeRow(row);
            }
          }
      });
    }
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-tree-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
  
    Firebug.registerRep(Firebug.AinspectorModule.AinspectorTreeTemplate);
    
    return Firebug.AinspectorModule.AinspectorTreeTemplate;
  }
);