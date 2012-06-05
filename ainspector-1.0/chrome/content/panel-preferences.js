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
	
var AINSPECTOR_FB = AINSPECTOR_FB || {};

/**
 * @desc preferenceModule Object implements ruleset preferences
 */
Firebug.preferenceModule = extend(Firebug.Module, {
	all_rulesets : null,
	level_A: 0,
	level_AA: 0,
	level_AAA: 0,
	
	/**
	 * @function viewPanel
	 * 
	 * @memberOf Firebug.preferenceModule
	 * 
	 * @desc respond to "Preference" button on A11Y toolbar
	 */
	viewPanel : function() {
	  
	  Components.utils.import("resource://ainspector/preferences/preferences.js");
	  
	  this.all_rulesets = OpenAjax.a11y.all_rulesets.getAllRulesets();
	  this.level_A = OpenAjax.a11y.WCAG20_LEVEL.A;
	  this.level_AA = OpenAjax.a11y.WCAG20_LEVEL.AA;
	  this.level_AAA = OpenAjax.a11y.WCAG20_LEVEL.AAA;
	  
	  var ruleset_info = {
	    all_rulesets : this.all_rulesets,
	    level_A : this.level_A,
	    level_AA : this.level_AA,
	    level_AAA : this.level_AAA
	  };
	  
	  OAA_WEB_ACCESSIBILITY_UTIL.util.preferenceModule.initPref(ruleset_info, window);

//	  OAA_WEB_ACCESSIBILITY_UTIL.util.preferenceModule.viewPanel();
    }
});
Firebug.registerModule(Firebug.preferenceModule);
}});

