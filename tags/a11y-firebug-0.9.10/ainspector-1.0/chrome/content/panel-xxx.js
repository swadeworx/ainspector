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
 * @file panel-all-rules.js
 * 
 * Create summary Object in response to the summary toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the summary Rule Results from the OAA Cache library
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
  
  AINSPECTOR_FB.xxx = {
      
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

//    adds or removes the side panels from the extension depending on the panel we are in 
      AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels();
      
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
      }
    
    var all_rules = cache_object.getFilteredRuleResultsByRuleCategory(OpenAjax.a11y.RULE_CATEGORIES.ALL, "xxx", AINSPECTOR_FB.preferences.wcag20_level, AINSPECTOR_FB.preferences.show_results_filter_value);
    all_rules.sortRuleResultsByImplementationLevel();
    FBTrace.sysout("all_rules in summary: ", all_rules);
    var rule_result_items = all_rules.filtered_rule_results;

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    
    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";
    
    panel.table = AINSPECTOR_FB.xxx.xxxTemplate.header.replace({elements: rule_result_items, view: "xxx"}, toolbar, AINSPECTOR_FB.xxx.xxxTemplate);

    var element = panel.document.createElement("div");
    element.style.display = "block";
    
    panel.panelNode.id = "ainspector-panel"; 
    panel.panelNode.appendChild(toolbar);
    panel.panelNode.appendChild(element);
    FBTrace.sysout("fb contentbox: ", Firebug.chrome.$("fbContentBox"));

    }
  };
  
  AINSPECTOR_FB.xxx.xxxTemplate = domplate({
    header :
            TABLE({class: "cookieTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "grid", "aria-selected" : "true",
             tabindex: "0"},
              THEAD(
                TR({class: "cookieHeaderRow", id: "tableHeader", "role": "row", "aria-selected" : "false", tabindex: "-1", 
                 },
                  TH({class: "cookieHeaderCell alphaValue a11yFocus", id: "colName", role: "columnheader"}, 
                    DIV({class: "cookieHeaderCellBox"}, "Rules")),
                  TH({class: "cookieHeaderCell alphaValue a11yFocus", id: "colValue", role: "columnheader"}, 
                    DIV({class: "cookieHeaderCellBox", title: "Rule is required by a Ruleset"}, "Required")),
                  TH({class: "cookieHeaderCell alphaValue a11yFocus", id: "colRawValue", role: "columnheader"}, 
                    DIV({class: "cookieHeaderCellBox", title: "WCAG 2.0 Success Criterion Level"}, "Level")),
                  TH({class: "cookieHeaderCell alphaValue a11yFocus", id: "colDomain", role: "columnheader"}, 
                    DIV({class: "cookieHeaderCellBox", title: "Percentage of Elements that Pass the Rule"}, "PEPR")),
                  TH({class: "cookieHeaderCell alphaValue a11yFocus", id: "colDomain", role: "columnheader"}, 
                    DIV({class: "cookieHeaderCellBox", title: "Number of Elements on the Page needing manual checking for conforming to a Rule"}, "MC"))
                ) //end TR
              ), //end THEAD
              TBODY( 
                  TD({class: "cookieHrefCol cookieCol a11yFocus", "role": "rowheader"},
                      DIV({class: "cookieHrefLabel cookieLabel"}, "h1")
                  ),
                  TD({class: "cookieStatusCol cookieCol a11yFocus", "role": "gridcell"},
                      DIV({class: "cookieStatusLabel cookieLabel"}, "h3")
                  ),
                  TD({class: "cookieProtocolCol cookieCol a11yFocus", "role": "gridcell"},
                      DIV({class: "cookieProtocolLabel cookieLabel"}, "h4")
                  ),
                  TD({class: "cookieDomainCol cookieCol a11yFocus", "role": "gridcell" },
                      DIV({class: "cookieDomainLabel cookieLabel"}, "h5")
                  ),
                  TD({class: "cookieDomainCol cookieCol a11yFocus", "role": "gridcell" },
                      DIV({class: "cookieDomainLabel cookieLabel"}, "h5")
                  )
                  ) //end TBODY
            ) //end TABLE
  });
}
