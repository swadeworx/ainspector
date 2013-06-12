/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "firebug/lib/dom",
    "firebug/lib/css",
    "ainspector/sidePanelUtil"
],
function(Obj, FBTrace, Locale, Domplate, Dom, Css, SidePanelUtil) {

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
    
    this.onClick = Obj.bind(this.setSelection, this);
    this.onKeyPress = Obj.bind(this.onKeyPress, this);
    
    this.refresh();
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
    
//    if (object.dom_element) results = SidePanelUtil.ruleResultsTemplate.showSelection(object.dom_element);
    
//    else results = SidePanelUtil.ruleResultsTemplate.showSelection(object);
    
    if (object.node_results.length > 0) SidePanelUtil.ruleResultsTemplate.rebuild(results, parentNode, panelName);
    else SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: panelName}, parentNode);
  },
  
  onKeyPress : function(event) {
    
    if (Firebug.chrome.getSelectedSidePanel().name != panelName) return;

    FBTrace.sysout("AInspector; ruleResultsSidePanel.onKeyPress: ", event);
    var all_rows = event.target.rows ? event.target.rows : event.target.offsetParent.rows;
    
    var key = event.keyCode;     
    var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
    var backward = key == KeyEvent.DOM_VK_LEFT || key == KeyEvent.DOM_VK_UP; 
    
    var object;
    for (var i=0; i < all_rows.length; i++) {
      if (Css.hasClass(all_rows[i], "gridRowSelected")) {
        object = forward ? all_rows[i+1].repObject : all_rows[i-1].repObject; 
        FBTrace.sysout("================object=============", object);
        SidePanelUtil.ruleResultsTemplate.rebuild(object.node_results, this.panelNode, panelName);
        break;
      }
    }
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
