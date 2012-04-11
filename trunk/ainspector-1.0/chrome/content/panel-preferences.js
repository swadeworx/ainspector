/**
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

FBL.ns(function() { with (FBL) {
	
const Cc = Components.classes;
const Ci = Components.interfaces;
var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
Components.utils.import("resource://gre/modules/Services.jsm");
var AINSPECTOR_FB = AINSPECTOR_FB || {};
var openWindow;
/**
 * @desc preferenceModule Object implements ruleset preferences
 */
Firebug.preferenceModule = extend(Firebug.Module, {
	all_rulesets : null,
	level_A: 0,
	level_AA: 0,
	level_AAA: 0,
	
	/**
	 * @function initializeUI
	 * 
	 * @memberOf Firebug
	 */
	initializeUI: function(){
	  this.getRulesetPrefs();
	  all_rulesets = OpenAjax.a11y.all_rulesets.getAllRulesets();
	  level_AAA = OpenAjax.a11y.WCAG20_LEVEL.AAA;
	  level_AA = OpenAjax.a11y.WCAG20_LEVEL.AA;
	  level_A = OpenAjax.a11y.WCAG20_LEVEL.A;
	},
	
	/**
	 * @function getRulesetPrefs
	 * 
	 * @memberOf Firebug
	 */
	getRulesetPrefs: function(){
	  
	  var preferences = {};

	  try {
		var branch1 = Services.prefs.getBranch("extensions.ainspector.");
		var ruleset_info = branch1.getChildList("", {});

		var branch2 = Components.classes["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefService).getBranch("extensions.ainspector.");

		preferences.ruleset_id = branch2.getCharPref(ruleset_info[0]);

	    preferences.wcag20_level = branch2.getIntPref(ruleset_info[1]);                              
	    
	    preferences.broken_links = branch2.getBoolPref(ruleset_info[3]);    
	  } catch(e) {
	    preferences = this.setDefaultPreferences();
	  }

	  return preferences;
	},
	
	/**
	 * @function setDefaultPreferences
	 * 
	 * @memberOf 
	 * 
	 * @desc sets defualt preferences when no preferences are set on the xul window
	 */
	setDefaultPreferences : function(){
	
	  var preferences = {};
	  
	  preferences.ruleset_id   = 'WCAG20_ARIA_TRANS';                              
	  
	  preferences.wcag20_level = 3;                              
	    
	  preferences.broken_links = false;    

	  this.setPreferences(preferences);
	  
	  return preferences;
	},
	
	/**
	 * @function setPreferences
	 */
	setPreferences : function(preferences){
		
	  FBTrace.sysout("Set Preferences:");
	  FBTrace.sysout("   Ruleset ID: " + preferences.ruleset_id);
	  FBTrace.sysout("   WCAG Level: " + preferences.wcag20_level);
	  FBTrace.sysout("  Broken Link: " + preferences.broken_links);
	  var branch2 = Components.classes["@mozilla.org/preferences-service;1"]
      .getService(Components.interfaces.nsIPrefService);
	  
	  branch2.setCharPref('extensions.ainspector.rulesetId',   preferences.ruleset_id );                              
	  branch2.setIntPref('extensions.ainspector.wcag20Level',  preferences.wcag20_level);                              
	  branch2.setBoolPref('extensions.ainspector.brokenLinks', preferences.broken_links);    

	},
	
	viewPanel : function() {
	  var args = {
	    FBL: FBL,
	    FBTrace: FBTrace,
	    Firebug: Firebug,
	    all_rulesets: all_rulesets,
	    level_A: level_A,
	    level_AA: level_AA,
	    level_AAA: level_AAA
	  }
	  window.openDialog("chrome://ainspector/content/preferences.xul", "",
           "chrome,centerscreen,dialog,modal,resizable=yes", args);
    },
    
    closeWindow : function(){
      openWindow.close();	
    }
});
Firebug.registerModule(Firebug.preferenceModule);
}});

