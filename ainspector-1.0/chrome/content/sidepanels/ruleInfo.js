/**
 * Copyright 2013 University Of Illinois
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
define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "firebug/lib/dom",
    "firebug/lib/css",
    "ainspector/ainspectorUtil",
    "ainspector/sidePanelUtil"
],
function(Obj, FBTrace, Locale, Domplate, Dom, Css, AinspectorUtil, SidePanelUtil) {

var panelName = "ruleInfo";

Firebug.RuleInfoSidePanel = function RuleInfoSidePanel() {};
Firebug.RuleInfoSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Rule Info",
  parentPanel: "ainspector",
  order: 2,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; RuleInfoSidePanel.initialize");

    this.onClick = Obj.bind(this.setSelection, this);
    this.onKeyPress = Obj.bind(this.onKeyPress, this);

  },


  initializeNode: function(oldPanelNode) {
    
    Firebug.Panel.initializeNode.apply(this, arguments);
    
    this.setSelection = Obj.bind(this.setSelection, this);
    this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
    
    this.onKeyPress = Obj.bind(this.onKeyPress, this);
    this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
  },

  destroyNode: function() {
    Firebug.Panel.destroyNode.apply(this, arguments);
  },

  destroy: function(state) {
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleInfoSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleInfoSidePanel.show");
    
    row = AinspectorUtil.selected_row;
    if (row) this.updateSelection(row.repObject, this.panelNode);
    else this.getPanelViewMesg(this.panelNode, "");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleInfoSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },
  
  onKeyPress : function(event) {
    
    if (Firebug.chrome.getSelectedSidePanel().name != panelName) return;
    
    FBTrace.sysout("AInspector; ruleInfoSidePanel.onKeyPress: ", event);
    
    var all_rows = event.target.rows ? event.target.rows : event.target.offsetParent.rows;
    
    var key = event.keyCode;     
    var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
    var backward = key == KeyEvent.DOM_VK_LEFT || key == KeyEvent.DOM_VK_UP; 
    
    var object;
    for (var i=0; i < all_rows.length; i++) {
      if (Css.hasClass(all_rows[i], "gridRowSelected")) {
        object = forward ? all_rows[i+1].repObject : all_rows[i-1].repObject;   
        
        if (object.filtered_rule_result && object.filtered_rule_result.rule_result) {
          this.updateSelection(object);
        } else {
          this.rulestemplate.selectTag.replace({}, this.panelNode);
        }
        break;
      }
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
    
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleInfoSidePanel.setSelection-result_object", result_object);
    
    if (result_object.filtered_rule_result && result_object.filtered_rule_result.rule_result) {
      this.updateSelection(result_object);
    } else {
      this.rulestemplate.selectTag.replace({}, this.panelNode);
    }
  },
  
  /**
   * @function updateSelection
   * 
   * @desc
   * 
   * @param {Object} rule_result
   */
  updateSelection : function(result_object) {
    
    var rule;
    var rule_summary;
    var rule_definition;
    var rule_result = result_object.filtered_rule_result.rule_result;

    if (result_object && rule_result) {
      
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
      
      this.rebuild(rule_result_object);
    } else {
      this.rulestemplate.selectTag.replace({}, this.panelNode);
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
    
     this.rulestemplate.tag.replace({resultObject: resultObject}, this.panelNode);
    
  },
  
  getPanelViewMesg : function(parentNode, mesg) {
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");

    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, parentNode);
  }
 });

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-sidepanels.css");

/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
with (Domplate) {
  Firebug.RuleInfoSidePanel.prototype.rulestemplate = domplate({
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
      
      selectTag :
        DIV({class: "element-select", style:"color:gray;"}, Locale.$STR("ainspector.sidepanel.wcag.selectRow")),
        
      noResultsTag:
          DIV({class: "element-select", style:"color:gray;"}, "$message"),  

      onClickURL : function(event) {
        
        var url = Firebug.getRepObject(event.target);
        window.open(url,'mywindow','');
      }  
})}

Firebug.registerPanel(Firebug.RuleInfoSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; accessibilityPanel.js, stylesheet registered");

return Firebug.RuleInfoSidePanel;

});
