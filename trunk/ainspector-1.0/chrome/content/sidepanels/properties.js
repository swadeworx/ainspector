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
    "ainspector/sidePanelUtil",
    "ainspector/ainspectorUtil"
],
function(Obj, FBTrace, Locale, Domplate, SidePanelUtil, AinspectorUtil) {

var panelName = "properties";

Firebug.PropertiesSidePanel = function PropertiesSidePanel() {};
Firebug.PropertiesSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Properties",
  parentPanel: "ainspector",
  order: 5,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; PropertiesSidePanel.initialize");

    this.onClick = Obj.bind(this.setSelection, this);
    this.onKeyPress = Obj.bind(this.onKeyPress, this);

  },


  initializeNode: function(oldPanelNode) {
    
    this.setSelection = Obj.bind(this.setSelection, this);
    this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
    
    this.onKeyPress = Obj.bind(this.onKeyPress, this);
    this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
    
    Firebug.Panel.initializeNode.apply(this, arguments);
  },

  destroyNode: function() {
    Firebug.Panel.destroyNode.apply(this, arguments);
  },

  destroy: function(state) {
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; PropertiesSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; PropertiesSidePanel.show");
    
    row = AinspectorUtil.selected_row;
    
    if (row) this.updateSelection(AinspectorUtil.selected_row.repObject, this.panelNode, panelName);    
    else this.getPanelViewMesg(this.panelNode, "");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; PropertiesSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },

  updateSelection: function(object, parentNode, type) {
    
    var results = SidePanelUtil.commonTemplate.getResults(object.cache_item_result.cache_item, type);
    
    if (results.length > 0)
      SidePanelUtil.commonTemplate.rebuild(results, ["A11y Property", "Value"], parentNode, "properties");
    else 
      SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: panelName}, parentNode);
  },
  
  setSelection : function (event){
    
    SidePanelUtil.commonTemplate.setSelection(event, this.panelNode, ["A11y Property", "Value"], "properties");
  },
  
  onKeyPress : function(event) {
    
    if (Firebug.chrome.getSelectedSidePanel().name != panelName) return;
    
    SidePanelUtil.commonTemplate.onKeyPress(event, this.panelNode, ["A11y Property", "Value"], "properties");    
  },
  
  getPanelViewMesg : function(panelNode, mesg) {
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("getPanelViewMesg: ", panelNode);
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");
    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, panelNode);
  }
});

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");

Firebug.registerPanel(Firebug.PropertiesSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; accessibilityPanel.js, stylesheet registered");

return Firebug.PropertiesSidePanel;

});
