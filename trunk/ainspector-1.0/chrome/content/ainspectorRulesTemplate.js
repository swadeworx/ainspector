define([
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/firebug",
  "firebug/lib/domplate",
  "firebug/lib/events",
  "firebug/lib/dom",
  "firebug/lib/css",
  "ainspector/sidePanelUtil",
  "ainspector/openajax_a11y/oaa_a11y_amd",
  "ainspector/ainspectorPreferences",
  "ainspector/ainspectorUtil",
  "ainspector/ainspectorModule",
  ],
  function (FBTrace, Locale, Firebug, Domplate, Events, Dom, Css, SidePanelUtil, OpenAjax, AinspectorPreferences, AinspectorUtil) {
    
    with (Domplate){
    
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      
      Firebug.AinspectorModule.AinspectorRulesTemplate = domplate({
      
        tag:
         DIV({class:"main-panel"},
          SPAN({}, "$view"), 
          TABLE({class: "ai-table-list-items", id: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: ""},
             THEAD({},
               TR({class: "gridHeaderRow firstRow gridRow", onclick:"$sortColumn"},
                   TH({class: "gridHeaderCell", id: "gridRulesCol", role: "columnheader"}, 
                     DIV({class: "gridHeaderCellBox"}, Locale.$STR("ainspector.header.summary.Rules"))
                   ),
                   TH({class: "gridHeaderCell", id: "gridLevelCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.level")}, 
                         Locale.$STR("ainspector.header.summary.level"))
                   ),
                   TH({class: "gridHeaderCell", id: "gridRequiredCol", role: "columnheader"}, 
                       DIV({class: "gridHeaderCellBox", title: Locale.$STR("ainspector.header.summary.title.required")}, 
                         Locale.$STR("ainspector.header.summary.required"))
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
                 )
             ), //end THEAD
             TBODY({class: ""},
               FOR("object", "$results|getMembers",
                 
                 TR({class: "tableRow gridRow", _repObject:"$object.rule_result_item", onclick: "$highlightRule"},//gridRow              
                   TD({class: "gridCol gridOrderCol", id: "gridOrderCol", role: "gridcell"},
                     DIV({class: "gridContent ", title : "$object.description"}, "$object.description")
                   ),
                   TD({class: "gridCol ", id: "gridLevelCol", role: "gridcell"},
                       DIV({class: "gridContent gridAlign"},  "$object.wcag20_sc_level")
                   ),
                   TD({class: "gridCol gridElementCol", id: "gridElementCol", role: "gridcell"},
                     DIV({class: "gridContent gridAlign"}, "$object.required")
                   ),
                   TD({class: "gridCol", id: "gridPassCol", role: "gridcell"},
                     DIV({class: "gridContent gridAlign"}, TAG("$object.pass_count", {'object': '$object'}))
                   ),
                   TD({class: "gridCol", id: "gridWarningCol", role: "gridcell"},
                     DIV({class: "gridContent gridAlign"}, TAG("$object.warning_count", {'object': '$object'}))
                   ),
                   TD({class: "gridCol", id: "gridViolationCol", role: "gridcell"},
                     DIV({class: "gridContent gridAlign"}, TAG("$object.violation_count", {'object': '$object'}))
                   ),
                   TD({class: "gridCol", id: "gridManualCheckCol", role: "gridcell"},
                     DIV({class: "gridContent gridAlign"}, TAG("$object.manual_check", {'object': '$object'}))
                   )
                 ) //end TR   
               ) //end FOR
             ) //end TBODY
            ) //end TABLE
           ), //end DIV
           
           strTagManual : DIV({class: "manualMsgTxt"}, "$object.manual_check_count"), //$object.manual_checks_count
           zeroTag : DIV({}, "0"),
           strTagViolation : DIV({class: "violationMsgTxt"}, "$object.v_count"), //$object.violations_count
           strTagStyle : DIV({style: "color: gray"}, "$object.PEPR"), //$object.violations_count
           strTagPass : DIV({class: "passMsgTxt"}, "$object.p_count"), //$object.passed_count
           strTagWarn : DIV({class: "warnMsgTxt"}, "$object.w_count"), //$object.warnings_count
           
           /**
            * @function viewTag
            * 
            * @desc gets cache item results for a rule category
            * 
            * @param {Object}rule_results - rule results object
            * @param {Object}panelNode   - A11Y panel
            * @param {String}rule_category- specific rule category selected in the menu  
            */
           viewTag : function(rule_results, rule_category, view, id) {
             
             SidePanelUtil.addAndRemoveSidePanels(false);
             var preferences = AinspectorPreferences.getPreferences();
             var panel = Firebug.currentContext.getPanel("ainspector", true);
             
             if (panel) {
               Dom.clearNode(panel.panelNode);
             }
             
             panel.panelNode.id = "ainspector-panel"; 

             var cache_results = rule_results.getFilteredRuleResultsByRuleCategory(rule_category, 
                 "All Rules", preferences.wcag20_level, preferences.show_results_filter_value);
             
             cache_results.sortRuleResultsByImplementationLevel();
             /*var toolbar = panel.document.createElement("div");
             toolbar.id = "toolbarDiv";*/
             
             var all_rule_results = cache_results.filtered_rule_results;
             
             panel.table = this.tag.replace({results: all_rule_results, view:view}, panel.panelNode);
             AinspectorUtil.contextMenu.setTableMenuItems(panel.table);
             
             var side_panel = Firebug.chrome.getSelectedSidePanel();
             
             AinspectorUtil.selectRow(panel.table, false, id);
             if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; panel.panelNode ***************: ", toolbar);
             
             /*panel.panelNode.appendChild(toolbar);
             var element = panel.document.createElement("div");
             element.style.display="block";
             panel.panelNode.appendChild(element);*/
             if (side_panel){
              
               if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode);
               else side_panel.getPanelViewMesg(side_panel.panelNode, "");
             } else {
               side_panel = Firebug.currentContext.getPanel('elements');
               side_panel.getPanelViewMesg(side_panel.panelNode, "");
             }
             
           },
           
           /**
            * @function getMembers
            * 
            * @desc returns the summary object to display on the summary panel
            * 
            * @param {Object} summary_object from the cache
            * 
            * @return {Summary Object}
            */
           getMembers : function(elements){
           
             var members = [];
             for (var p in elements) members.push(this.createMembers(p, elements[p]));
  
             return members;
             
           },
           
           /**
            * @function createMember
            * 
            * @desc creates a needed object to iterate in the domplate.
            * 
            * @param {Number} iterator - incremental number
            * @param {Object} rule_result_item - a single object with the rule results
            * 
            * @returns {Object} - to print on the Summary View
            */
           createMembers: function(iterator, rule_result_item) {
             var description          = "no description";
             var wcag20_sc_level      = "";
             var required             = "";
             var nls_implementation_level = null;
             var implementation_percentage = null;
             var manual_check_count = 0;
             
             if (rule_result_item.rule_result) {
               description               = rule_result_item.rule_result.getRuleSummary();
               required                 = (rule_result_item.rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) ? 'Yes' : 'No';
               wcag20_sc_level          = rule_result_item.rule_result.rule.getNLSWCAG20Level();
               implementation_percentage     = rule_result_item.rule_result.implementation_percentage;
               nls_implementation_level = rule_result_item.rule_result.getNLSImplementationLevel();
               
             } else {
               description          = rule_result_item.title;
          
               if (rule_result_item.getNumberOfRules) description += " (" + rule_result_item.getNumberOfRules() + " rules)";
               implementation_percentage     = rule_result_item.getImplementationLevel();
               nls_implementation_level = rule_result_item.getNLSImplementationLevel();
  
             }
             
             var PEPR = nls_implementation_level.label;
  
             if (rule_result_item.manual_checks_count > 0)  manual_check_count = rule_result_item.manual_checks_count;
             
             var implementation_percentage_tag = null;
             
             if (PEPR == '100%') implementation_percentage_tag = this.strTagPass;
             
             else if (PEPR == '0%') implementation_percentage_tag = this.strTagViolation;
             
             else if (implementation_percentage > '50' && implementation_percentage < '100') implementation_percentage_tag = this.strTagWarn;
             
             else if (implementation_percentage <= '50' && implementation_percentage > '0') implementation_percentage_tag = this.strTagViolation;
             
             else implementation_percentage_tag = this.strTagStyle;
             
             return {
               description : description,
               required : required,
               wcag20_sc_level : wcag20_sc_level,
               implementation_percentage_tag : implementation_percentage_tag,
               PEPR : PEPR,
               manual_check_count : manual_check_count,
               rule_result_item : rule_result_item,
               manual_check : (manual_check_count >= 1) ? this.strTagManual : this.zeroTag,
               p_count      : rule_result_item.passed_count, 
               w_count      : rule_result_item.warnings_count,
               v_count      : rule_result_item.violations_count,
               violation_count : rule_result_item.violations_count>0 ? this.strTagViolation : this.zeroTag,
               pass_count : rule_result_item.passed_count > 0 ? this.strTagPass : this.zeroTag,
               warning_count :rule_result_item.warnings_count > 0 ? this.strTagWarn: this.zeroTag,
             };
           },
           
           highlightRule : function(event){
             
             var table       = Dom.getAncestorByClass(event.target, "ai-table-list-items");
             var current_row = Dom.getAncestorByClass(event.target, "tableRow");
             AinspectorUtil.highlightRow(event, table, current_row);
           },
           
           sortColumn : function(event) {
             
             var table  = Dom.getAncestorByClass(event.target, "ai-table-list-items");
             var column = Dom.getAncestorByClass(event.target, "gridHeaderCell");
             
             if (FBTrace.DBG_AINSPECTOR)
               FBTrace.sysout("AInspector; Firebug.AinspectorModule.AinspectorRulesTemplate.sortColumn", AinspectorUtil);  
             AinspectorUtil.sortColumn(table, column);
           }
           
      });
    }  
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");
  
    Firebug.registerRep(Firebug.AinspectorModule.AinspectorRulesTemplate);
  
    return Firebug.AinspectorModule.AinspectorRulesTemplate;
  }
);
         