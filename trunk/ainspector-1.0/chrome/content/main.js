/* See license.txt for terms of usage */

/**
 * @file main.js
 * 
 * Automatically loaded by the registration process of the extension i.e., 
 * when the extension is loaded Firebug looks for the main module (main.js)
 * to load. 
 */

define([
  "firebug/lib/trace",
  "ainspector/ainspectorModule",
  "ainspector/ainspectorPanel",
  "ainspector/sidepanels/elements",
  "ainspector/sidepanels/ruleInfo",
  "ainspector/sidepanels/ruleResults",
  "ainspector/sidepanels/attributes",
  "ainspector/sidepanels/properties",
  "ainspector/sidepanels/style",
  "ainspector/sidepanels/events"
  ],
  function(FBTrace, AinspectorModule, AinspectorPanel,
      ElementsSidePanel, RuleInfoSidePanel, RuleResultsSidePanel,
      AttributesSidePanel, PropertiesSidePanel, StyleSidePanel, EventsSidePanel ) {

    var theApp = {
    	
    	/**
    	 * @function initialize
    	 * 
    	 * @desc A11y Extension initialization will be done in initialize() such as registering the A11y panel,
    	 *       registering string bundles 
    	 */	
      initialize: function() {
        
      	if (FBTrace.DBG_AINSPECTOR)
            FBTrace.sysout("AInspector; ainspector extension initialize:");
     
//      Registration of the A11y panel
        Firebug.registerPanel(Firebug.AinspectorPanel);
        Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      },
    
      /**
       * @function shutdown
       * 
       * @desc Unregister all registered Firebug components 
       */
      shutdown: function() {
            
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; ainspector extension shutdown");
            
        Firebug.unregisterPanel(Firebug.AinspectorPanel);        
        Firebug.unregisterActivableModule(Firebug.AinspectorModule); 
//      Firebug.unregisterUIListener(AinspectorListener);
        
        Firebug.unregisterPanel(Firebug.ElementsSidePanel);
        Firebug.unregisterPanel(Firebug.RuleInfoSidePanel);
        Firebug.unregisterPanel(Firebug.RuleResultsSidePanel);
        Firebug.unregisterPanel(Firebug.AttributesSidePanel);
        Firebug.unregisterPanel(Firebug.PropertiesSidePanel);
        Firebug.unregisterPanel(Firebug.StyleSidePanel);
        Firebug.unregisterPanel(Firebug.EventsSidePanel);

        Firebug.unregisterStylesheet("chrome://ainspector/skin/ainspector.css"); 
        Firebug.unregisterStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
        Firebug.unregisterStringBundle("chrome://ainspector/locale/ainspector.properties");
      }
    }
    return theApp;
  }
);
