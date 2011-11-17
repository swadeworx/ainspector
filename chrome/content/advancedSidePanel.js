FBL.ns(function() { with (FBL) {

  // Constants
//const Cc = Components.classes;
//const Ci = Components.interfaces;

//const prefs = Cc["@mozilla.org/preferences-service;1"].getService(Ci.nsIPrefBranch2);

  /**
   * @panel NavigationSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function advancedSidePanel() {}
  
  advancedSidePanel.prototype = extend(Firebug.Panel, {
    
    name: 'Advanced',
    parentPanel: 'AInspector',
    title: 'Advanced',
    order: 1,
    editable: true,
    
    /**
     *@constructor
     *
     * initialize
     * 
     *@author pbale
     * 
     *@param context
     * 
     *@param doc
     */
     initialize: function(context, doc) {
    
	   this.onKeyPress = bind(this.onKeyPress, this);
	   this.onCLick = bind(this.setSelection, this);
       Firebug.Panel.initialize.apply(this, arguments);
     },

     /**
      * initializeNode
      * 
      * @desc
      * 
      * @param  oldPanelNode
      */
     initializeNode: function(oldPanelNode) {

       appendStylesheet(this.panelNode.ownerDocument, "chrome://selectbug/skin/selectbug.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/userinterface.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/fonts-min.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/tabview.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/allyGrade.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/grid.css");

//     this.onCLick = bind(this.onClick, this);
       this.setSelection = bind(this.setSelection, this);
       this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
       this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, false);
       Firebug.Panel.initializeNode.apply(this, arguments);
    // Log simple message
     },
     
     /**
      * show
      * 
      * @desc
      * 
      * @param state
      */
     show: function(state) {
	   
       var rule_result_array = new Array();
       var result;
       FBTrace.sysout("Inside show of navigationSidePanel.js");
       Firebug.Panel.show.apply(this, arguments);
     },
     
     /**
      * setSelection
      * 
      * @desc
      * 
      * @param event
      */
     setSelection: function(event) {
   
	   FBTrace.sysout("event in setSelection:", event);
       FBTrace.sysout("repObject", Firebug.getRepObject(event.target));
     }
   });
 
  Firebug.registerPanel(advancedSidePanel);
}});