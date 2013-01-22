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
	
	/**
	 * @function viewPanel
	 * 
	 * @memberOf Firebug.preferenceModule
	 * 
	 * @desc respond to "Preference" button on A11Y toolbar
	 */
	viewPanel : function() {
	  
	  window.openDialog("chrome://firebug-a11y/content/preferences/preferences-dialog.xul", "", "chrome,centerscreen,resizable=yes", "");

	}
});

Firebug.registerModule(Firebug.preferenceModule);

}});

