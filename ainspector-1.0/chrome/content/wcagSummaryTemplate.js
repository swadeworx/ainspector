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

  function(FBTrace, Locale, Firebug, Domplate, Events, Dom, Css, SidePanelUtil, AinspectorPreferences, OpenAjax, AinspectorUtil) {
  
    with (Domplate){
    
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      
      Firebug.AinspectorModule.WcagSummaryTemplate = domplate(Firebug.Rep, new Firebug.Listener(), {
      
        tag:
           DIV({class:"main-panel"},
             SPAN({}, "$view"), 
             BUTTON({onclick: "$expandAll", style: "float:right;", _repObject: "$results"}, "Expand All"),
             BUTTON({onclick: "$collapseAllRows", style: "float:right;", _repObject: "$results"}, "Collapse All"),
             
             TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", onclick: "$toggleRows"},
               THEAD(
                 TR({class: "gridHeaderRow firstRow gridRow"},
                     TH({class: "gridHeaderCell", id: "gridRulesCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox"}, Locale.$STR("ainspector.header.summary.Rule"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridRequiredCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.required")}, 
                         Locale.$STR("ainspector.header.summary.required"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridLevelCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.level")}, 
                         Locale.$STR("ainspector.header.summary.level"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.pass")}, 
                           Locale.$STR("ainspector.header.pass"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridWarningCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.warning")}, 
                         Locale.$STR("ainspector.header.warning"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridViolationCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.title.violation")}, 
                           Locale.$STR("ainspector.header.violation"))
                     ),
                     TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.mc")}, 
                         Locale.$STR("ainspector.header.summary.mc"))
                     )
                   ) //end TR
             ), //end THEAD
             TBODY(
               FOR("member", "$results|memberIterator", TAG("$row", {member: "$member"}))
             )
           )//end TABLE
         ), //end DIV
           
           row:
             TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
               onclick: "$highlightTreeRow"},
               TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value", id: "gridRulesCol"},
                 DIV({class: "$member.hasChildren|getClassName", title : "$member.rule_description"}, "$member.rule_description")
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridRequiredCol"}, 
                 TAG("$member.makeBold", {'member' :"$member", 'object': "$member.value"})
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridLevelCol"},
                 DIV({class: "resultAlign"}, "$member.wcag20_level")
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridPassCol"},
                 TAG("$member.p_tag", {'member' :"$member", 'object': "$member.value"})
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridWarningCol"},
                 TAG("$member.w_tag", {'member' :"$member", 'object': "$member.value"})
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridViolationCol"},
                   TAG("$member.v_tag", {'member' :"$member", 'object': "$member.value"})
               ),
               TD({class: "memberLabelCell", _repObject: "$member.value", id: "gridManualCheckCol"},
                 TAG("$member.manual_check", {'member' :"$member", 'object': "$member.value"})
               )
             ),

             strTagManual : DIV({class: "manualMsgTxt gridAlign"}, "$member.manual_check_count"),
             zeroTag: DIV({class: "gridAlign"}, "0"),
             strTagViolation : DIV({class: "violationMsgTxt gridAlign"}, "$member.v_count"), 
             strTagPass  : DIV({class: "passMsgTxt gridAlign"}, "$member.p_count"), 
             strTagWarn  : DIV({class: "warnMsgTxt gridAlign"}, "$member.w_count"),
             boldString  : DIV({class: "boldMsgTxt gridAlign"}, "$member.required"),
             normalString : DIV({class: "gridAlign"}, "$member.required"),
             
             loop:
               FOR("member", "$members", TAG("$row", {member: "$member"})),
             
             /**
              * @function getClassName
              */  
             getClassName : function(hasChildren) {
               
               if (hasChildren) return 'treeLabel';
               
             },
             
             /**
              * @function viewTag
              * 
              * @desc gets cache item results for a rule category
              * 
              * @param {Object}rule_results - rule results object
              * @param {String}rule_category- specific rule category selected in the menu  
              */
             viewTag : function(rule_results, rule_category, view, id, name) {
               
               SidePanelUtil.addAndRemoveSidePanels(false);

               var preferences = AinspectorPreferences.getPreferences();
               var panel = Firebug.currentContext.getPanel("ainspector", true);
            
               var filtered_results = rule_results.getFilteredRuleResultsByRuleSummary(rule_category, 
                    name, preferences.wcag20_level, preferences.show_results_filter_value);
               if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; filtered_results: ", filtered_results);

               var filtered_rule_results_groups = filtered_results.filtered_rule_results_groups;
               
               if (panel)
                 Dom.clearNode(panel.panelNode);
               
               panel.panelNode.id = "ainspector-panel";
               
               if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; filtered_rule_results_groups: ", filtered_rule_results_groups);
               
               panel.table = this.tag.replace({results: filtered_rule_results_groups, view:view}, panel.panelNode);
               
               this.expandAllRows(panel.table);
               AinspectorUtil.selectRow(panel.table, true, id);

               AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
               
               var side_panel = Firebug.chrome.getSelectedSidePanel();
               
               if (side_panel){
                
                 if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode);
                 else side_panel.getPanelViewMesg(side_panel.panelNode, "");
               } else {
                 side_panel = Firebug.currentContext.getPanel('elements');
                 side_panel.getPanelViewMesg(side_panel.panelNode, "");
               }
             },
             
             /**
              * @function memberIterator
              */
             memberIterator : function(object){
            
               return this.getMembers(object);
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
            
            createMember: function(name, rule_result_groups, level)  {
              
              var required = '';
              var wcag20_level = '';
              var rule_group = false;
              var rule_description = '';
              var manual_check_count = 0;
              
              if (rule_result_groups.rule_result){

                var rule_result           = rule_result_groups.rule_result;
                required                  = (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) ? 'Yes' : 'No';
                wcag20_level              = rule_result.rule.getNLSWCAG20Level();
                rule_description          = rule_result.getMessage();

              } else {
                rule_description          = rule_result_groups.title;
                rule_group                = true;
              }
                
              if (rule_result_groups.manual_checks_count > 0)  manual_check_count = rule_result_groups.manual_checks_count;
              
              return {
                
                level              : level,
                indent             : level * 16,
                makeBold           : (required == 'Yes') ? this.boldString : this.normalString,
                required           : required,    
                wcag20_level       : wcag20_level,
                rule_description   : rule_description,
                manual_check_count : manual_check_count,
                manual_check       : (manual_check_count >= 1) ? this.strTagManual : this.zeroTag,
                filtered_results   : this.getFilteredWCAGResults(rule_result_groups), //children
                hasChildren        : this.hasChildren(rule_result_groups),
                value              : (rule_result_groups != null) ? rule_result_groups : "",
                p_count            : rule_result_groups.passed_count,
                v_count            : rule_result_groups.violations_count,
                w_count            : rule_result_groups.warnings_count,
                p_tag              : (rule_result_groups.passed_count > 0 ) ? this.strTagPass : this.zeroTag,
                v_tag              : (rule_result_groups.violations_count > 0) ? this.strTagViolation : this.zeroTag,
                w_tag              : (rule_result_groups.warnings_count > 0)  ? this.strTagWarn : this.zeroTag
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
                  var members;
                  
                  if (repObject.filtered_results)
                    members = this.getMembers(repObject.filtered_results, level+1);
                  else
                    members = this.getMembers(repObject.filtered_rule_results, level+1);
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
    } //end Domplate
    
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-tree-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
    Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");

    Firebug.registerRep(Firebug.AinspectorModule.WcagSummaryTemplate);

    return Firebug.AinspectorModule.WcagSummaryTemplate;
  }
);