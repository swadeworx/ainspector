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

FBL.ns(function() { with (FBL) {

  var main_panel = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.title");
  
  /**
   * @function rulesSidePanel displaying more information about the rule that is applied to a particular element
   * 
   */
  function rulesSidePanel() {}
  
  rulesSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    
    /**
     * This panel is automatically used as a side-panel when parent panel is set.
     */
    parentPanel: main_panel,
    
    title    : side_panel_title,
    order    : 2,
    editable : true,
    disabled : false,

    /**
     * @constructor initialize
     *
     * @desc  
     *
     * @param {Object} context 
     * @param {Object} doc - document Object
     */
    initialize: function(context, doc) {
      
      this.onKeyPress = bind(this.onKeyPress, this);
      this.onCLick = bind(this.setSelection, this);
      Firebug.Panel.initialize.apply(this, arguments);
    },

    /**
     * @constructor initializeNode
     * 
     * @desc
     * 
     * @param  oldPanelNode
     */
    initializeNode: function(oldPanelNode) {

      appendStylesheet(this.panelNode.ownerDocument, "chrome://selectbug/skin/selectbug.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector-side-panel.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/fonts-min.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/tabview.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/allyGrade.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/grid.css");

      this.setSelection = bind(this.setSelection, this);
      this.onKeyPress = bind(this.onKeyPress, this);
      this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
      
      Firebug.Panel.initializeNode.apply(this, arguments);
   
    },
    
    /**
     * @function onKeyPress
     * 
     * @desc
     * 
     * @param event
     */
    onKeyPress: function(event) {
    
      var current_row;
      var next_row;
      var previous_row;
      var prev_cell;
      var next_cell;
      
      var table_rows = event.target.offsetParent.rows;

      if (!table_rows) return;
      
      var no_of_rows = table_rows.length;
      var flag = false;
      var is_header_row = false;
      
      for (var row=0; row < no_of_rows; row++) {
      
        var class_list = table_rows[row].classList;
        var class_name_it = 0;
       
        for (class_name_it; class_name_it < class_list.length; class_name_it++) {
        
          if (class_list[class_name_it] == "gridRowSelected") {
            flag = true;
            break;
          }   
        }
        
        if (flag == true){
          current_row = table_rows[row];

          if (row < no_of_rows) {
           
              previous_row = table_rows[row-1];
           
            next_row = table_rows[row+1];
          
          } else { //if we reach end of the table row then go back to first row
            next_row = table_rows[1]; //table_rows[0] is the header row
            previous_row = table_rows[row-1];
          }
          
          break;
        } else {
          continue;
        }
      } //end for
      
      var rule_result_objet = null;
      
      if (event.keyCode == KeyEvent.DOM_VK_UP) {
      
        result = previous_row.repObject;
        
        if (result.dom_element) {
          rule_result_objet = this.showOnRuleTabSelect(result.dom_element);
        } else if(result) {
          rule_result_objet = this.showOnRuleTabSelect(result);
        } else {
          var headers = ["Result/Property", "Message/Value"];
          AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: headers, messg: "please select an element row in the left panel", desc: "Evaluation Results By Rule"}, this.panelNode);
        }  
        if (rule_result_objet) this.rebuild(rule_result_objet);
      
      } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
        
        result = next_row.repObject;
        
        if (result.dom_element) rule_result_objet = this.showOnRuleTabSelect(result.dom_element);
        else rule_result_objet = this.showOnRuleTabSelect(result);
       
        this.rebuild(rule_result_objet);

      } else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
        this.setSelection(event);
     
      } else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
        this.setSelection(event);
     
      } else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
     
        this.deleteNode("node", "up");

      } else if (event.keyCode == KeyEvent.DOM_VK_DELETE) {
        this.deleteNode("node", "down");
       
      } else {
        return;
      }     
    },
     
    /**
     * @function destroyNode
     * 
     * @desc removes the listeners from the main panel
     * called by Firebug Framework 
     */
    destroyNode: function() {
   
      this.mainPanel.panelNode.removeEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.removeEventListener("keypress", this.onKeyPress, false);
      
      Firebug.Panel.destroyNode.apply(this, arguments);
    },

    /**
     * @function show
     * 
     * @desc 
     * called by Firebug Framework
     */
    show: function() {
     
      Firebug.Panel.show.apply(this, arguments);
    },
     
    /**
     * @function updateSelection
     * 
     * @desc
     */
    updateSelection : function(object) {
    
      var selection = this.mainPanel.selection;

      if (selection) {
        if (selection.filtered_rule_results_groups) { 
          this.showEmptySidePanel("no rule selected");
        } else {
          this.rebuild(this.showOnRuleTabSelect(selection.rule_result));
        }
      } else {
        
      }
    },
     
    /**
     * @function setSelection
     * 
     * @desc
     * 
     * @param event
     */
    setSelection : function(event) {
   
      var result_object = Firebug.getRepObject(event.target);
      
      if (!result_object) return;
      
      if (result_object.rule_result) {
        
//        AINSPECTOR_FB.tabPanelUtil.enableSidePanel();
        this.rebuild(this.showOnRuleTabSelect(result_object.rule_result));
      
//      } else if (result_object.filtered_rule_results_groups){
//        AINSPECTOR_FB.tabPanelUtil.disableSidePanel();
      }
      else{
        this.showEmptySidePanel("no rule selected");
      } 
    },
    
    /**
     * @function showOnRuleTabSelect
     * 
     * @desc
     * 
     * @param {Object} rule_result
     */
    showOnRuleTabSelect : function(rule_result) {
      
      var rule;
      var rule_summary;
      var rule_definition;
      
      if (rule_result) {
        
        if (rule_result.getRule) rule = rule_result.getRule();
        
        else if (rule_result.rule) rule = rule_result.rule;
        
        else rule = rule_result;
        
        rule_summary =  rule_result.getRuleSummary();
        rule_definition = rule_result.getRuleDefinition();
        
        var purpose = rule.getNLSPurpose();
        
        var wcag_nls_req = rule.getNLSRequirements();
        var techniques   = rule.getNLSTechniques();
        var info_links   =  rule.getNLSInformationalLinks('text'); 
        var requirements = [];
        
        FBTrace.sysout("info_links: ", info_links[0].url);
        
        requirements.push(wcag_nls_req.primary);

        for (var j = 0; j < wcag_nls_req.related.length; j++) {
          requirements.push(wcag_nls_req.related[j]);
        }
        var target_res = rule.getTargetResources();

        var rule_result_object = {
          rule_id         : rule_result.getNLSRuleId(),
          rule_summary    : rule_summary,
          rule_definition : rule_definition,
          purpose         : purpose,
          requirements    : requirements,
          techniques      : techniques,
          info_links      : info_links,
          target_res_desc : rule.getNLSTargetResourcesDescription(),
          target_res      : target_res 
        }
        
        return rule_result_object;
      }
    },
    
    /**
     * @function rebuild
     * 
     * @desc
     * 
     * @param resultArray
     */
    rebuild: function(resultObject){
    
      this.panelNode.id = "ainspector-side-panel";
      
       rulestemplate.tag.replace({resultObject: resultObject}, this.panelNode);
      
    },
    
    showEmptySidePanel : function(mesg) {

      this.panelNode.id = "ainspector-side-panel";
      var headers = ["Result/Property", "Message/Value"];
      AINSPECTOR_FB.emptySidePanelTemplate.tag.replace({headers: headers, messg: mesg, desc: "Evaluation Results By Rule"}, this.panelNode);
    },

    /**
     * setTrialSelector
     * 
     * @desc
     * 
     * @param target
     * @param value
     */
    setTrialSelector: function(target, value) {
        
      if (this.lockedElement) this.lockedElement.classList.remove("lockedSelectorRule");
       
      this.trialSelector = value;
      this.selection = this.trialSelector;
      this.lockedElement = target;
      this.lockedSelection = this.selection;
      this.rebuild();
    }
    
  });

  var rulestemplate = domplate(AINSPECTOR_FB.BaseRep, {
    
    tag:
      
      DIV({class: "side-panel"},
        DIV({class: "eval-results", style: "color: black; font-weight: bold;"}, "Rule: "),
        DIV({class: "element-select", style: "margin-left: 0.8em;"}, "$resultObject.rule_summary"),  
        DIV({class: "eval-results", style: "color: black; font-weight: bold;"}, "ID: "),
        DIV({class: "element-select", style: "margin-left: 0.8em;"}, "$resultObject.rule_id"),
        DIV({class: "eval-results", style: "color: black; font-weight: bold;"}, "Definition"),
        DIV({class: "element-select", style: "margin-left: 0.8em;"}, "$resultObject.rule_definition"),
        
        UL({class: "eval-results", style: "color: black; font-weight: bold;"}, "WCAG 2.0 Requirements"),
        FOR("rule", "$resultObject.requirements", 
          LI({class: "element-select", style: "margin-left: 1.7em;"}, 
            A({onclick: "$onClickURL", _repObject: "$rule.url_spec"}, "$rule.title"))),
        
        UL({class: "eval-results", style: "color: black; font-weight: bold;"}, "Purpose"),
        FOR("rule_purpose", "$resultObject.purpose", 
          LI({class: "element-select", style: "margin-left: 1.7em;"}, "$rule_purpose")),
          
        UL({class: "eval-results", style: "color: black; font-weight: bold;"}, "Techniques"),
        FOR("technique", "$resultObject.techniques", 
          LI({class: "element-select", style: "margin-left: 1.7em;"}, "$technique")),
          
        UL({class: "eval-results", style: "color: black; font-weight: bold;"}, "Informational Links"),
        FOR("info_link", "$resultObject.info_links", 
          LI({class: "element-select", style: "margin-left: 1.7em;"}, 
            A({onclick: "$onClickURL", _repObject: "$info_link.url"}, "$info_link.title"))
        ),
        DIV({class: "eval-results", style: "color: black; font-weight: bold;"}, "Target Resources Description"),
        DIV({class: "element-select", style: "margin-left: 0.8em;"}, "$resultObject.target_res_desc"),
        UL({class: "eval-results", style: "color: black; font-weight: bold;"}, "Target Resources"),
        FOR("resource", "$resultObject.target_res", 
          LI({class: "element-select", style: "margin-left: 1.7em;"}, "$resource"))
      ),

      onClickURL : function(event) {
        var url = Firebug.getRepObject(event.target);
        window.open(url,'mywindow','');
      }  
  
  });

  Firebug.registerPanel(rulesSidePanel);

}});
