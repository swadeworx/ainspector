/* See license.txt for terms of usage */

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
    
    var results = SidePanelUtil.commonTemplate.getResults(object.cache_item, type);
    
    if (results.length > 0)
      SidePanelUtil.commonTemplate.rebuild(results, ["A11y Property", "Value"], parentNode, "properties");
    else 
      SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: panelName}, parentNode);
  },
  
  setSelection : function (event){
    
    SidePanelUtil.commonTemplate.setSelection(event, this.panelNode, ["A11y Property", "Value"], "properties");
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
