/**
 * Copyright 2012 University Of Illinois
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
 * @file preferences-config-template.js
 * 
 * This is a template file that contains constants for configuring the preferences
 * library.  Copy this file to 'preferences-config.js' and edit the lines with thefollowing constants:
 * 
 *  {String}   EXTENSION_NAME The preferences namespace to be used by the firefox extension
 *
 *  {Boolean}  ENABLE_ACCESSIBILITY_MENU_PREF  Enable/Disables the preference for an 'Accessibility' menu 
 *  {Boolean}  ENABLE_ACCESSIBILITY_ICON_PREF  Enable/Disables the preference for an 'Accessibility' icon 
 *                                             in the navigation toolbar 
 */
var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

/** 
 * @namespace OAA_WEB_ACCESSIBILITY_PREF
 */
var OAA_WEB_ACCESSIBILITY_PREF = OAA_WEB_ACCESSIBILITY_PREF || {};

/**
 * @constant EXTENSION_NAME
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF
 */

/**
   The following line needs to be edited to DEFINE A UNIQUE PREFERENCES NAMESPACE for your extension 
 */
OAA_WEB_ACCESSIBILITY_PREF.EXTENSION_NAME = 'ainspector-firebug-preferences';  

/**
 * @constant ENABLE_ACCESSIBILITY_MENU_PREF
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF
 *
 * @desc Set the constant to 'true' if you want the preferences dialog to support the accessibility menu feature
 */

OAA_WEB_ACCESSIBILITY_PREF.ENABLE_ACCESSIBILITY_MENU_PREF = false;

/**
 * @constant ENABLE_ACCESSIBILITY_ICON_PREF
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF
 *
 * @desc Set the constant to 'true' if you want the preferences dialog to support the accessibility icon feature
 */

OAA_WEB_ACCESSIBILITY_PREF.ENABLE_ACCESSIBILITY_ICON_PREF = false;

/**
 * @function on_set_preferences_call_back
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF
 *
 * @desc Setting the following property can be set to a call back function
 *       This function will be executed when properties are set
 */
 
OAA_WEB_ACCESSIBILITY_PREF.preferences_call_back = function () {

  console.logStringMessage("flag 3:::::::::::::::::::::::::::::::::: " );
  var toolbarbuttons = window.opener.document.getElementById("fbFirebugExtensionButtons").children;
  var selected_toolbar_button_id = null;
  
  for (var i=1; i < toolbarbuttons.length; i=i+2){

    if (toolbarbuttons[i].checked == true) selected_toolbar_button_id = toolbarbuttons[i].id;
  }
  
  console.logStringMessage(selected_toolbar_button_id);
  
  window.opener.AINSPECTOR_FB.cacheUtil.updateView(selected_toolbar_button_id);
};