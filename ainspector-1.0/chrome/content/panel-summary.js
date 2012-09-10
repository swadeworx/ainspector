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
 * @file panel-summary.js
 * 
 * Create summary Object in response to the summary toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the summary Rule Results from the OAA Cache library
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
	
  AINSPECTOR_FB.summary = {
      
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
    
//  adds or removes the side panels from the extension depending on the panel we are in 
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
    
    var all_rules = cache_object.getFilteredRuleResultsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.ALL_CATEGORIES, "All Categories", AINSPECTOR_FB.preferences.wcag20_level, AINSPECTOR_FB.preferences.show_results_filter_value);
    all_rules.sortRuleResultsByImplementationLevel();
    
    var rule_result_items = all_rules.filtered_rule_results;

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    panel.table = AINSPECTOR_FB.summaryTemplate.header.replace({elements: rule_result_items, view: "All Rules"}, toolbar, AINSPECTOR_FB.summaryTemplate);
    
    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    
    AINSPECTOR_FB.template.grid.setTableMenuItems(panel.table);

    var selected_row = AINSPECTOR_FB.toolbarUtil.selectRow(panel, rule_result_items[0], false, "summary");

    if (AINSPECTOR_FB.previous_selected_row != null && selected_row) Firebug.currentContext.getPanel('elementsSidePanel').sView(true, rule_result_items[selected_row]);
    else Firebug.currentContext.getPanel('elementsSidePanel').sView(true, rule_result_items[0]);
    }
  };
  
  AINSPECTOR_FB.summaryTemplate = domplate({
    header :
      DIV({class: "main-panel"},
        
        DIV({class: "ruleset-div"},
          SPAN({class: "ruleset-title"}, "Ruleset:  "),
          SPAN({class: "ruleset-value"}, "$AINSPECTOR_FB.ruleset_title"),
          SPAN({class: "ruleset-level"}, " Level:  "),
          SPAN({class: "ruleset-level-value"}, "$AINSPECTOR_FB.selected_level"),
          BUTTON({onclick: "$Firebug.preferenceModule.viewPanel", style: "margin-left: 0.5em;"}, "preferences"),
          SPAN({class: "view-panel"}, "$view")
        ),
        DIV({class: "table-scrollable"},
            TABLE({class: "ai-table-list-items", cellpadding: 0, id: "ai-table-list-items", cellspacing: 0, hiddenCols: "", role: "grid", "aria-selected" : "true",
             tabindex: "0", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
              THEAD({class: "header-fix"},
                TR({class: "gridHeaderRow firstRow gridRow", id: "tableHeader", "role": "row", "aria-selected" : "false", tabindex: "-1", 
                 onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
                  TH({class: "gridHeaderCell", id: "gridOrderCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox"}, "Rules")),
                  TH({class: "gridHeaderCell", id: "gridElementCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Rule is required by a Ruleset"}, "Required")),
                  TH({class: "gridHeaderCell", id: "gridHiddenCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "WCAG 2.0 Success Criterion Level"}, "Level")),
                  TH({class: "gridHeaderCell", id: "gridPassCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Percentage of Elements that Pass the Rule"}, "PEPR")),
                  TH({class: "gridHeaderCell", id: "gridManualCheckCol", role: "columnheader"}, DIV({class: "gridHeaderCellBox", title: "Number of Elements on the Page needing manual checking for conforming to a Rule"}, "MC"))
                ) //end TR
              ), //end THEAD
              TBODY({class: "tbody-scroll"},
                FOR("object", "$elements|getMembers",
                  
                  TR({class: "tableRow gridRow", role: "row", "aria-selected" : "$object.object|$AINSPECTOR_FB.toolbarUtil.getSelectedState", 
                   tabindex: "$object.object|$AINSPECTOR_FB.toolbarUtil.getTabIndex", _repObject:"$object.rule_result_item", 
                    onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightRule", 
                   ondblclick: "$AINSPECTOR_FB.flatListTemplateUtil.doubleClick"},//gridRow              
                  
                    TD({class: "gridCol gridOrderCol", id: "gridOrderCol", role: "gridcell"},
                      DIV({class: "gridContent gridAlign"}, "$object.description")
                    ),
                    TD({class: "gridCol gridElementCol", id: "gridElementCol", role: "gridcell"},
                      DIV({class: "gridContent resultAlign"}, "$object.required")
                    ),
                    TD({class: "gridCol gridHiddenCol", id: "gridHiddenCol", role: "gridcell"},
                      DIV({class: "gridContent resultAlign"},  "$object.wcag20_sc_level")
                    ),
                    TD({class: "gridCol gridPassCol", id: "gridPassCol", role: "gridcell"},
                      DIV({class: "gridContent resultAlign"}, TAG("$object.implementation_percentage_tag", {'object': '$object'}))
                    ),
                    TD({class: "gridCol gridWarningCol", id: "gridWarningCol", role: "gridcell"},
                      DIV({class: "gridContent resultAlign"}, TAG("$object.manual_check", {'object': '$object'}))
                    )
                  ) //end TR   
                ) //end FOR
              ) //end TBODY
            ) //end TABLE
          ) //end DIV ("table-scrollable")
        ), //end DIV
        
        strTagManual : DIV({class: "manualMsgTxt"}, "$object.manual_check_count"), //$object.manual_checks_count
        zeroTag : DIV({}, "0"),
        strTagViolation : DIV({class: "violationMsgTxt"}, "$object.PEPR"), //$object.violations_count
        strTagStyle : DIV({style: "color: gray"}, "$object.PEPR"), //$object.violations_count
        strTagPass : DIV({class: "passMsgTxt"}, "$object.PEPR"), //$object.passed_count
        strTagWarn : DIV({class: "warnMsgTxt"}, "$object.PEPR"), //$object.warnings_count

        
        highlightRule : function(event){
    
          panel.selected_summary_row = Firebug.getRepObject(event.target);
          AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event);
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
         * @desc
         * 
         * @param
         */
        createMembers: function(iterator, rule_result_item) {
          
          var description          = "no description";
          var wcag20_sc_level      = "";
          var required             = "";
          var nls_implementation_level = null;
          var implementation_percentage = null;
          var manual_check_count = 0;
          var rule_definition = rule_result_item.rule_result;

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
          
          var PEPR = implementation_percentage + '%';
          
          if (nls_implementation_level.manual_check_count > 0)  manual_check_count = nls_implementation_level.manual_check_count;
          
          var implementation_percentage_tag = null;
          
          if (implementation_percentage == '100') implementation_percentage_tag = this.strTagPass;
          
          else if (implementation_percentage <= '50' ) implementation_percentage_tag = this.strTagViolation;
          
          else if (implementation_percentage > '50' && implementation_percentage < '100') implementation_percentage_tag = this.strTagWarn;
          
          else implementation_percentage_tag = this.strTagStyle;
          
          return {
            description : description,
            required : required,
            wcag20_sc_level : wcag20_sc_level,
            implementation_percentage_tag : implementation_percentage_tag,
            PEPR : PEPR,
            manual_check_count : manual_check_count,
            rule_result_item : rule_result_item,
            manual_check : (manual_check_count >= 1) ? this.strTagManual : this.zeroTag
          };
        }
        
  });
}
