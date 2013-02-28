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
define(
  [
    "firebug/lib/trace",
    "firebug/lib/locale"
  ],
  
  function(FBTrace, Locale) {
    
    var AinspectorPreferences = AinspectorPreferences || {};
    
    /**
     * @constant PREFERENCES_NAMESPACE
     *
     * @memberOf OAA_WEB_ACCESSIBILITY_PREF
     */

    AinspectorPreferences  = {
       PREFERENCES_NAMESPACE : 'extensions.ainspector-firebug-preferences.',
       preferences : {
        // OAA Ruleset options
        ruleset_id   : 'ARIA_TRANS',                             
        wcag20_level : 3, // OpenAjax.a11y.WCAG20_LEVEL.AAA constant   
        wcag20_recommended_rules_enabled : true,
        
        // Extension options for showing evaluation results
        show_results_pass           : true,
        show_results_violations     : true,
        show_results_page_manual_checks  : true,
        show_results_element_manual_checks  : true,
        show_results_warnings       : true,
        show_results_hidden         : true,
        show_results_not_applicable : true,
        show_results_filter_value   : 63, // OpenAjax.a11y.RESULT_FILTER.ALL
        broken_links: false,
        layout_tables: false
      },

      /**
       * @function calculateResultsFilterValue
       *
       * @memberOf OAA_WEB_ACCESSIBILITY_PREF.util
       *
       * @desc Calculates the results filter value for filtering evaluation results
       */

    calculateResultsFilterValue : function () {
        
        // This is copied from OpenAjax file: openajax_a11y_constants.js
        
        var RFC = {
          ALL                  : 127,
          PASS           : 1,
          VIOLATION      : 2,
          WARNING        : 4,
          PAGE_MANUAL_CHECK    : 8,
          ELEMENT_MANUAL_CHECK : 16,
          HIDDEN               : 32, // hidden only applies to node results 
          NOT_APPLICABLE       : 64  // not applicable only applies to rule results
        }
        
        var filter = 0;

        var p = this.preferences;
        
        if (p.show_results_pass)                  filter += RFC.PASS;
        if (p.show_results_violations)            filter += RFC.VIOLATION;
        if (p.show_results_page_manual_checks)    filter += RFC.PAGE_MANUAL_CHECK;
        if (p.show_results_element_manual_checks) filter += RFC.ELEMENT_MANUAL_CHECK;
        if (p.show_results_warnings)              filter += RFC.WARNING;
        if (p.show_results_hidden)                filter += RFC.HIDDEN;
        if (p.show_results_not_applicable)        filter += RFC.NOT_APPLICABLE;
        
        return filter;
        
      },
      
      /**
       * @function setDefaultPreferences
       *
       * @memberOf OAA_WEB_ACCESSIBILITY_PREF.util
       *
       * @desc Sets preferences to default values
       */

      setDefaultPreferences : function () {

        var p = this.preferences;

        // OAA Ruleset options
        p.ruleset_id    = 'ARIA_TRANS';
        p.wcag20_level  = 3; // OpenAjax.a11y.WCAG20_LEVEL.AAA
        p.wcag20_recommended_rules_enabled = true;
        
        // Extension options for showing evaluation results
        p.show_results_pass           = true;
        p.show_results_violations     = true;
        p.show_results_page_manual_checks  = true;
        p.show_results_element_manual_checks  = true;
        p.show_results_warnings       = true;
        p.show_results_hidden         = true;
        p.show_results_not_applicable = true;

        p.broken_links = false;
        p.layout_tables = false;
        p.show_results_filter_value = this.calculateResultsFilterValue();

        // Show menu for accessibility features
        p.show_accessibility_menu = false;
        p.show_accessibility_icon = false;
        
        this.setPreferences(p);
        
      },
      
      setPreferences : function(p) {
        
        function setBooleanPreference(name) {
          if (typeof p[name] === "boolean") ps.setBoolPref(PN + name, p[name]);    
        }

        function setIntegerPreference(name) {
          if (typeof p[name] === "number") ps.setIntPref(PN + name, p[name]);    
        }

        function setStringPreference(name) {
          if (typeof p[name] === "string") ps.setCharPref(PN + name, p[name]);    
        }
        var PN = 'extensions.ainspector-firebug-preferences.';
//        var p  = AinspectorPreferences.preferences;
        var ps = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);                           
        
        setStringPreference('ruleset_id');                              
        setIntegerPreference('wcag20_level');                              
        setBooleanPreference('wcag20_recommended_rules_enabled');    
        setBooleanPreference('broken_links');
        setBooleanPreference('layout_tables');
        setBooleanPreference('show_results_pass');
        setBooleanPreference('show_results_violations');    
        setBooleanPreference('show_results_page_manual_checks');    
        setBooleanPreference('show_results_element_manual_checks');    
        setBooleanPreference('show_results_warnings');    
        setBooleanPreference('show_results_hidden');    
        setBooleanPreference('show_results_not_applicable');    

        // Call back function
//        if (typeof AinspectorPreferences.preferences_call_back == 'function') AinspectorPreferences.preferences_call_back();
      },
      
      getPreferences : function() {
       
        var PN = this.PREFERENCES_NAMESPACE;
        var p  = this.preferences;
        var ps = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);            
        var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
        try {
        
          p.ruleset_id   = ps.getCharPref(PN + 'ruleset_id');
          p.wcag20_level = ps.getIntPref( PN + 'wcag20_level'); 
//         console.logStringMessage("p.ruleset_id : "+ p.ruleset_id );
          p.wcag20_recommended_rules_enabled = ps.getBoolPref(PN + 'wcag20_recommended_rules_enabled'); 
         
          p.layout_tables     = ps.getBoolPref(PN + 'layout_tables');  
          p.broken_links      = ps.getBoolPref(PN + 'broken_links');    

          p.show_results_pass           = ps.getBoolPref(PN + 'show_results_pass');    
          p.show_results_violations     = ps.getBoolPref(PN + 'show_results_violations');    
          p.show_results_page_manual_checks    = ps.getBoolPref(PN + 'show_results_page_manual_checks');    
          p.show_results_element_manual_checks = ps.getBoolPref(PN + 'show_results_element_manual_checks');    
          p.show_results_warnings       = ps.getBoolPref(PN + 'show_results_warnings');    
          p.show_results_hidden         = ps.getBoolPref(PN + 'show_results_hidden');    
          p.show_results_not_applicable = ps.getBoolPref(PN + 'show_results_not_applicable');    

          p.show_results_filter_value = this.calculateResultsFilterValue();

//          p.show_accessibility_menu     = ps.getBoolPref(PN + 'show_accessibility_menu');                              
//          p.show_accessibility_icon     = ps.getBoolPref(PN + 'show_accessibility_icon');    
        } catch(e) {
//         console.logStringMessage("catch block in getPreferences : "+ e);
          this.setDefaultPreferences();
        }

        return p;
      },
      
      /**
       * @function callBack
       */
      preferences_call_back : function() {

        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; AinspectorPreferences.callBack:", obj);
      }
    }
    return AinspectorPreferences;
  }
);