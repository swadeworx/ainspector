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
/**
 * @file main.js
 * 
 * Automatically loaded by the registration process of the extension.
 */

define([
  "firebug/lib/trace",
  "ainspector/ainspectorModule",
  "ainspector/ainspectorListener",
  "ainspector/ainspectorPanel",
  "ainspector/sidepanels/elements",
  "ainspector/sidepanels/ruleInfo",
  "ainspector/sidepanels/ruleResults",
  "ainspector/sidepanels/attributes",
  "ainspector/sidepanels/properties",
  "ainspector/sidepanels/style",
  "ainspector/sidepanels/events"
  ],
  function(FBTrace, AinspectorModule, AinspectorListener, AinspectorPanel,
      ElementsSidePanel, RuleInfoSidePanel, RuleResultsSidePanel,
      AttributesSidePanel, PropertiesSidePanel, StyleSidePanel, EventsSidePanel ) {

    var theApp = {
  
      initialize: function() {
        if (FBTrace.DBG_AINSPECTOR)
            FBTrace.sysout("AInspector; ainspector extension initialize:");
        Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
            // TODO: Extension initialization
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
        Firebug.unregisterUIListener(AinspectorListener);
        
        Firebug.unregisterPanel(Firebug.ElementsSidePanel);
        Firebug.unregisterPanel(Firebug.RuleInfoSidePanel);
        Firebug.unregisterPanel(Firebug.RuleResultsSidePanel);
        Firebug.unregisterPanel(Firebug.AttributesSidePanel);
        Firebug.unregisterPanel(Firebug.PropertiesSidePanel);
        Firebug.unregisterPanel(Firebug.StyleSidePanel);
        Firebug.unregisterPanel(Firebug.EventsSidePanel);


        Firebug.unregisterStylesheet("chrome://fireaccess/skin/fireaccess.css");
        Firebug.unregisterStringBundle("chrome://fireaccess/locale/fireaccess.properties");
        
        Firebug.unregisterStylesheet("chrome://ainspector/skin/ainspector.css"); 
        Firebug.unregisterStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
        Firebug.unregisterStringBundle("chrome://ainspector/locale/ainspector.properties");
      }
    }
    return theApp;
  }
);
