/*
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
    "firebug/lib/dom",
    "firebug/lib/css",
    "ainspector/ainspectorWatcher",
    "ainspector/openajax_a11y/oaa_a11y_amd",
    "ainspector/ainspectorUtil",
    "ainspector/ainspectorPreferences",
    "ainspector/highlighting/highlight"
  ],
  
  function(FBL, FBTrace, Locale, Dom, Css, AinspectorWatcher, OpenAjax, AinspectorUtil, AinspectorPreferences, OAA_WEB_ACCESSIBILITY) {
  
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

      // Called before any suspend actions. First caller to return true aborts suspend.
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
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight(window.content.document);
        
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
        
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; ainspectorModule.showPanel.Firebug", Firebug);
        
        if (is_my_extension) {
          /*if (Firebug.version == '1.12' || Firebug.currentVersion == '1.11.3b1'){
            
          } else {
            alert(" Please get Firebug 1.11.3 beta from https://blog.getfirebug.com/2013/04/12/firebug-1-11-3-beta-1/ or Firebug 1.12 from https://getfirebug.com/releases/firebug/1.12/ before running A11y Extension to support menus");
          }*/
        }
        if (is_my_extension) this.updateSelection();
        
        else OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight(window.content.document);
          
        /* call FBL namespace function to hide the toolbar buttons if the selected panel is not my extensions panel*/
        Dom.collapse(my_extension_toolbar_buttons, !is_my_extension);
      },
      
      /**
       * @method watchWindow
       * 
       * @desc Called by Firebug when attaching to a window (top-level or frame).
       * 
       * @param {Object} context - object used to store the data associated with the web page
       *                           Every page with enabled Firebug has it's own instance of context object
       */
      watchWindow : function(context){
        context.window.addEventListener("load", this.ainspectorOnLoad, false);
        context.window.addEventListener("beforeunload", this.ainspectorOnUnLoad, false);
      },
      
      /**
       * @method unWatchWindow
       * 
       * @desc Called by Firebug when detaching to a window (top-level or frame).
       */
      unWatchWindow : function(context){
        context.window.removeEventListener("load", this.ainspectorOnLoad, false);
        context.window.removeEventListener("beforeunload", this.ainspectorOnUnLoad, false);
      },
      
      /**
       * @method ainspectorOnLoad
       * 
       * @desc gets the firebug context, maintains the state to select 
       * the toolbarbutton that has been selected earlier when the new web page is loaded 
       * 
       * @param {Event} event
       */
      ainspectorOnLoad : function(event) {
        
        var win = event.currentTarget;
        var firebug_context;
        
        //TODO: lookup TabWatcher
        if (win != Firebug.currentContext.window) {
          firebug_context = TabWatcher.getContextByWindow(win);
        } else {
          firebug_context = Firebug.currentContext;  
        }
        
        if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("AInspector; Firebug.AinspectorModule.ainspectorOnLoad");
        var ruleset_obj = AinspectorWatcher.onLoad();
        
        Firebug.AinspectorModule.updateSelection();
        /*var toolbar_buttons = firebug_context.chrome.$("fbFirebugExtensionButtons").children;
        
        var toolbar_button_id = Firebug.ainspectorModule.getToolbarButtonSelected(toolbar_buttons, firebug_context);
        window.AINSPECTOR_FB[toolbar_button_id].viewPanel(Firebug.currentContext, panel_name, cache_object);*/
      },
      
      /**
       * @method ainspectorOnUnLoad
       * 
       * @desc
       * 
       * @param {Event} event
       */
      ainspectorOnUnLoad : function(event) {

        var win = event.currentTarget;
        var fbcontext;
            
        if (win !== Firebug.currentContext.window) {
          fbcontext = TabWatcher.getContextByWindow(win);
        } else {
          fbcontext = Firebug.currentContext;
        }
          
        if (fbcontext !== Firebug.currentContext) {
          return;
        }
//        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight(window.content.document);

        AinspectorWatcher.onUnload();
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
            
            if (menu_items[i].id == already_selected_view) {
            
              Firebug.AinspectorPanel.prototype[already_selected_view]();
              
              if (AinspectorUtil.selected_row != null) {

                var selected_panel_content =  Firebug.chrome.getSelectedPanel();
                var table = Dom.getChildByClass(selected_panel_content.table, 'ai-table-list-items');
                if (!table) table = Dom.getChildByClass(selected_panel_content, 'domTable');
                table.setAttribute("tabindex", "10");
               /* var rows = table.rows;
                
                for (var j=0; j < rows.length; j++) {
                  
                  if (Css.hasClass(rows[j], 'gridRowSelected')) {
                    FBTrace.sysout("row " + j, rows[j]);
                    rows[j].setAttribute("tabindex", "3");
                    rows[j].focus();
                  }
                }*/
              }
            }
          }
          
        } else {
          var rule_obj = AinspectorWatcher.getRuleResultsObject();
          Firebug.AinspectorModule.AinspectorRulesTemplate.viewTag(rule_obj, 
            OpenAjax.a11y.RULE_CATEGORIES.ALL, Locale.$STR("ainspector.views.rules"));
        }
      }
      
      
  });
  
  // ********************************************************************************************* //
  // Registration
  
  Firebug.registerActivableModule(Firebug.AinspectorModule);
  
  return Firebug.AinspectorModule;
  
  // ********************************************************************************************* //
  }
);
