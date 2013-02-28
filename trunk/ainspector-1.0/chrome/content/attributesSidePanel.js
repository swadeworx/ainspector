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

var panelName = "attributes";

Firebug.AttributesSidePanel = function AttributesSidePanel() {};
Firebug.AttributesSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Attributes",
  parentPanel: "ainspector",
  order: 4,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; AttributesSidePanel.initialize");

    // TODO: Panel initialization (there is one panel instance per browser tab)
    this.onCLick = Obj.bind(this.setSelection, this);
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
        FBTrace.sysout("AInspector; AttributesSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR) {
        FBTrace.sysout("AInspector; AttributesSidePanel.show", AinspectorUtil.selected_row);
    	FBTrace.sysout("AInspector; AttributesSidePanel.show-this.panelNode", this);
    }
    
    var row = AinspectorUtil.selected_row;
    if (row)this.updateSelection(row.repObject, this.panelNode, panelName);
    else this.getPanelViewMesg(this.panelNode, "");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; AttributesSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },

  updateSelection: function(object, parentNode, type) {
	  
    var results = SidePanelUtil.commonTemplate.getResults(object.cache_item, type);
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; updateSelection.results", results);
    
    if (results.length > 0)
      SidePanelUtil.commonTemplate.rebuild(results, ["Attribute", "Value"], parentNode, "attributes");
    else SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: panelName}, parentNode);
  },
  
  setSelection : function (event){
    
    SidePanelUtil.commonTemplate.setSelection(event, this.panelNode, ["Attribute", "Value"], "attributes");
  },
  
  getPanelViewMesg : function(panelNode, mesg) {
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("getPanelViewMesg: ", panelNode);
    
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");
    
    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, panelNode);
  }
});

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");

Firebug.registerPanel(Firebug.AttributesSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; accessibilityPanel.js, stylesheet registered");

return Firebug.AttributesSidePanel;

// ********************************************************************************************* //
});
