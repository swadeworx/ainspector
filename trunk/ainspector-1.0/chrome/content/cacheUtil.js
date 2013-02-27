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
 "firebug/lib/locale",
 "firebug/firebug",
 "ainspector/openajax_a11y/oaa_a11y_amd",
 "firebug/chrome/firefox"
 
 ],
 
 function(FBL, FBTrace, OpenAjax){
   
   var CacheUtil = CacheUtil || {};
   var consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

   var ainspector = {
      preferences: null,
      selected_level: null,
      ruleset_title: null,
      ruleset_object: null
   };
  
   CacheUtil.updateCache = function() {
     
       var doc;
       var url;
      
       try { 
         doc = window.content.document;
         url = window.content.location.href;
       } catch(e) {
         doc  = window.opener.parent.content.document;
         url = window.opener.parent.location.href;
       }  // end try
       
       Components.utils["import"]("chrome://ainspector/content/preferences/preferences-config.js");
       Components.utils["import"]("chrome://ainspector/content/preferences/preferences.js");
//       Components.utils["import"]("chrome://ainspector/content/openajax_a11y/openajax_a11y_all.js");

       var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
       
       var preferences = OAA_WEB_ACCESSIBILITY_PREF.util.getPreferences();
       /*OAA_WEB_ACCESSIBILITY.util.highlightModule.initHighlight(window.content.document, preferences.show_results_element_manual_checks,
                                                                preferences.show_results_page_manual_checks, preferences.show_results_pass,
                                                               preferences.show_results_hidden);*/
       console.logStringMessage("DBG_AINSPECTOR; CacheUtil.updateCache after loading prefs: " + preferences.ruleset_id);
       
//       FBTrace.sysout("DBG_AINSPECTOR; CacheUtil.updateCache after getting ruleset" );
       console.logStringMessage("DBG_AINSPECTOR; CacheUtil.updateCache OpenAjax: " + OpenAjax );
       console.logStringMessage("DBG_AINSPECTOR; CacheUtil.updateCache OpenAjax.a11y: " + OpenAjax.a11y );
       console.logStringMessage("DBG_AINSPECTOR; CacheUtil.updateCache OpenAjax.a11y.all_rulesets: " + OpenAjax.a11y.all_rulesets );
       var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(preferences.ruleset_id);
       
       FBTrace.sysout("DBG_AINSPECTOR; CacheUtil.updateCache after getting ruleset" );

       var ruleset_object = null;

       if (ruleset) {
         ruleset.setEvaluationLevel(preferences.wcag20_level);
         ruleset.setRecommendedRulesEnabled(preferences.wcag20_recommended_rules_enabled);
         ruleset.setBrokenLinkTesting(preferences.broken_links);
         ruleset_object = ruleset.evaluate(url, doc.title, doc, null, true);
       } else {
       }
       ainspector.preferences = preferences;
       ainspector.selected_level = OpenAjax.a11y.all_wcag20_nls.getNLS().getNLSWCAG20Level(preferences.wcag20_level);
       ainspector.ruleset_title = ruleset.ruleset_title;
       ainspector.ruleset_object = ruleset_object;
       
       return ainspector;
     };
     return CacheUtil;
   }
);