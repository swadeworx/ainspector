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
    "ainspector/sidePanelUtil"
],
function(Obj, FBTrace, Locale, Domplate, SidePanelUtil) {

var panelName = "ruleResults";

Firebug.RuleResultsSidePanel = function RuleResultsSidePanel() {};
Firebug.RuleResultsSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Rule Results",
  parentPanel: "ainspector",
  order: 3,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; RuleResultsSidePanel.initialize");
    
    this.onCLick = Obj.bind(this.setSelection, this);
    
    this.refresh();
  },


  initializeNode: function(oldPanelNode) {
    
    this.setSelection = Obj.bind(this.setSelection, this);
    this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
    
    Firebug.Panel.initializeNode.apply(this, arguments);
  },
  
  destroyNode: function() {
    Firebug.Panel.destroyNode.apply(this, arguments);
  },

  destroy: function(state) {
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleResultsSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleResultsSidePanel.show");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; RuleResultsSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },

  updateSelection: function(object, parentNode) {
    
    var results = null;
    
    if (object.dom_element) results = SidePanelUtil.ruleResultsTemplate.showSelection(object.dom_element);
    
    else results = SidePanelUtil.ruleResultsTemplate.showSelection(object);
    
    if (results.length > 0) SidePanelUtil.ruleResultsTemplate.rebuild(results, parentNode, panelName);
    else SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: panelName}, parentNode);
  },
  
  setSelection : function (event){
    
    SidePanelUtil.ruleResultsTemplate.setSelection(event, this.panelNode, panelName);
  },
  
  getPanelViewMesg : function(panelNode, mesg) {
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("getPanelViewMesg: ", panelNode);
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");

    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, panelNode);
  }
});

Firebug.registerPanel(Firebug.RuleResultsSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; RuleResultsSidePanel.js, stylesheet registered");

return Firebug.RuleResultsSidePanel;

});
