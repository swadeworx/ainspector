/* See license.txt for terms of usage */

define([
    "firebug/lib/trace",
    "firebug-a11y/AInspector",
    "firebug-a11y/rulesResultsSidePanel",
    "firebug-a11y/rulesSidePanel",
    "firebug-a11y/attributesSidePanel",
    "firebug-a11y/elementsSidePanel",
    "firebug-a11y/propertiesSidePanel",
    "firebug-a11y/styleSidePanel",
    "firebug-a11y/eventsSidePanel"
],
function(FBTrace, AInspectorPanel, attributesSidePanel, cacheSidePanel,
    elementsSidePanel, eventsSidePanel, rulesSidePanel, rulesResultsSidePanel, styleSidePanel) {

// ********************************************************************************************* //
// The application object

var theApp =
{
    initialize: function()
    {
        Firebug.registerPanel(AInspectorPanel);
        Firebug.registerPanel(attributesSidePanel);
        Firebug.registerPanel(cacheSidePanel);
        Firebug.registerPanel(elementsSidePanel);
        Firebug.registerPanel(eventsSidePanel);
        Firebug.registerPanel(rulesSidePanel);
        Firebug.registerPanel(rulesResultsSidePanel);
        Firebug.registerPanel(styleSidePanel);

    },

    shutdown: function()
    {
        FBTrace.sysout("sidePanel; shutdown");

        Firebug.unregisterPanel(AInspectorPanel);
        Firebug.unregisterPanel(attributesSidePanel);
        Firebug.unregisterPanel(cacheSidePanel);
        Firebug.unregisterPanel(elementsSidePanel);
        Firebug.unregisterPanel(eventsSidePanel);
        Firebug.unregisterPanel(rulesSidePanel);
        Firebug.unregisterPanel(rulesResultsSidePanel);
        Firebug.unregisterPanel(styleSidePanel);

    }
}

// ********************************************************************************************* //

return theApp;

// ********************************************************************************************* //
});
