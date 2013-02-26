/*
 * Copyright 2011 University Of Illinois
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
 * @file ainspectorModule.js
 * 
 * define Firebug.ainspectorModule by inheriting or overriding 
 *   internal Firebug.Module methods and defining new methods
 * 
 * register the ainspectorModule 
 */
define([
    "firebug/lib/lib",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "ainspector/openajax_a11y/oaa_a11y_amd",
    "ainspector/ainspectorUtil",
    "ainspector/ainspectorPreferences",
    "ainspector/highlighting/highlight"
  ],
  
  function(FBL, FBTrace, Locale, OpenAjax, AinspectorUtil, AinspectorPreferences, OAA_WEB_ACCESSIBILITY) {
  
    var panelName = "ainspector";
  
    /**
     * Always only one instance of a module object is created for a browser window
     */
    Firebug.AinspectorModule = FBL.extend(Firebug.ActivableModule, {
  
      onObserverChange: function(observer) {
      
        if (this.hasObservers()) {
          
        } else {
          
        }
      },

      onSuspendFirebug: function(context){
        
        if (FBTrace.DBG_AINSPECTOR)
              FBTrace.sysout("AInspector; ainspectorModule.onSuspendFirebug;");
      },

      // Called before any suspend actions. Firest caller to return true aborts suspend.
      onSuspendingFirebug: function() {

        if (FBTrace.DBG_AINSPECTOR)
              FBTrace.sysout("AInspector; ainspectorModule.onSuspendingFirebug;");
      },

      onResumeFirebug: function(context) {
          
        if (FBTrace.DBG_AINSPECTOR)
              FBTrace.sysout("AInspector; ainspectorModule.onResumeFirebug;");
      },
      
      /**
       * @method initialize
       */
      initialize: function(owner) {
  
        Firebug.ActivableModule.initialize.apply(this, arguments);
  
          // TODO: Module initialization (there is one module instance per browser window)
  
          if (FBTrace.DBG_AINSPECTOR)
              FBTrace.sysout("AInspector; ainspectorModule.initialize");
      },
      
      /**
       * @method shutdown
       */
      shutdown: function() {
  
        Firebug.ActivableModule.shutdown.apply(this, arguments);
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; ainspectorModule.shutdown");
      },
      
      /**
       * @method showPanel
       *  
       * @desc Show/Hide our panel based on new selection from the Firebug main toolbar.
       *   Overrides method called by the Firebug framework.
       *
       * @param {Object} browser - the browser window object
       * @param {Object} panel - the new selected panel object    
       */
      showPanel : function(browser, panel){
        
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; ainspectorModule.showPanel", Firebug.currentContext.getPanel("ainspector"));
        var is_my_extension = panel && panel.name =="ainspector";
        var my_extension_toolbar_buttons = Firebug.chrome.$("fbPanelToolbar");
        
        if (is_my_extension) this.updateSelection();
        
        else OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();
          
        /* call FBL namespace function to hide the toolbar buttons if the selected panel is not my extensions panel*/
        Dom.collapse(my_extension_toolbar_buttons, !is_my_extension);
      },
      
      updateSelection : function() {
        
        var menu_items = Firebug.chrome.$("fbPanelToolbar").children[0].children[0].children;
        var already_selected_view = AinspectorUtil.selectedView; 
        
        if (FBTrace.DBG_AINSPECTOR) {
          FBTrace.sysout("AInspector; ainspectorModule.already_selected_view:"+ already_selected_view);
          FBTrace.sysout("AInspector; ainspectorModule.Firebug.AinspectorPanel.prototype:", Firebug.AinspectorPanel.prototype);
        }
        if (already_selected_view != null) {
          for (var i=0; i<menu_items.length; i++) {
            if (menu_items[i].id == already_selected_view) Firebug.AinspectorPanel.prototype[already_selected_view]();
          }
        } else {
          Firebug.AinspectorModule.AinspectorRulesTemplate.viewTag(this.getRuleResultsObject(), 
            OpenAjax.a11y.RULE_CATEGORIES.ALL, Locale.$STR("ainspector.views.rules"));
        }
      },
      
      /**
       * @function getRuleResultsObject
       * 
       * @desc Gets the prefrences from preferences module
       *       Evaluates OAA cache library
       *       Gets the rule results from the OAA cache library
       */
      getRuleResultsObject : function(){
            
        var doc;
        var url;
        var ruleset_object;
       
        try { 
          doc = window.content.document;
          url = window.content.location.href;
        } catch(e) {
          doc  = window.opener.parent.content.document;
          url = window.opener.parent.location.href;
        }  // end try
        
  //      Components.utils["import"]("chrome://ainspector/content/preferences/preferences-config.js");
  //      Components.utils["import"]("chrome://ainspector/content/preferences/preferences.js");
        var preferences = AinspectorPreferences.getPreferences();
        
        if (FBTrace.DBG_AINSPECTOR){
          FBTrace.sysout("AInspector; ainspectorModule.getRuleResultsObject.preferences: ", preferences);
          FBTrace.sysout("OAA_WEB_ACCESSIBILITY: ", OAA_WEB_ACCESSIBILITY);
        }
        
        OAA_WEB_ACCESSIBILITY.util.highlightModule.initHighlight(window.content.document, 
            preferences.show_results_element_manual_checks,
            preferences.show_results_page_manual_checks, 
            preferences.show_results_pass,
            preferences.show_results_hidden);
        var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(preferences.ruleset_id);
  
        if (ruleset) {
          ruleset.setEvaluationLevel(preferences.wcag20_level);
          ruleset.setRecommendedRulesEnabled(preferences.wcag20_recommended_rules_enabled);
          ruleset.setBrokenLinkTesting(preferences.broken_links);
          ruleset_object = ruleset.evaluate(url, doc.title, doc, null, true);
        } 
        
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; ainspectorModule.getRuleResultsObject: ", ruleset_object);
        
        return ruleset_object;
  
      }
  });
  
  // ********************************************************************************************* //
  // Registration
  
  Firebug.registerActivableModule(Firebug.AinspectorModule);
  
  return Firebug.AinspectorModule;
  
  // ********************************************************************************************* //
  }
);
