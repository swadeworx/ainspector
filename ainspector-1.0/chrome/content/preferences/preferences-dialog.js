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
 * @file preferences.js
 * 
 * Contains the utility functions to update preferences and dialog event handlers to support preference.xul dialog
 */

/** 
 * @namespace OAA_WEB_ACCESSIBILITY_PREF
 */
var OAA_WEB_ACCESSIBILITY_PREF    = OAA_WEB_ACCESSIBILITY_PREF        || {};

/** 
 * @namespace OAA_WEB_ACCESSIBILITY_PREF.dialog
 */
OAA_WEB_ACCESSIBILITY_PREF.dialog = OAA_WEB_ACCESSIBILITY_PREF.dialog || {};

/* ---------------------------------------------------------------- */
/*                  Preferences Dialog                              */
/* ---------------------------------------------------------------- */

/**
 * @function onLoad
 * 
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF.dialog
 *
 * @desc Initializes the dialog
 */
 
OAA_WEB_ACCESSIBILITY_PREF.dialog.onLoad = function () {
  
  var nls_strings = document.getElementById("ID_STRINGBUNDLE_PREFERENCES");
  
  window.document.title = nls_strings.getString('title');

  OAA_WEB_ACCESSIBILITY_PREF.util.getPreferences();

  OAA_WEB_ACCESSIBILITY_PREF.dialog.initPreferencesDialog();
  
  
};

/**
 * @function initPreferencesDialog
 * 
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF.dialog
 * 
 * @desc Updates controls in the dialog box based on user selections
 */
 
OAA_WEB_ACCESSIBILITY_PREF.dialog.initPreferencesDialog = function () {

  function addRulesetradio(ruleset) {
  
    var rb_ruleset = doc.createElement('radio');
    
    rb_ruleset.setAttribute('id', ruleset.ruleset_id);
    rb_ruleset.setAttribute('label', ruleset.ruleset_title + " " + ruleset.ruleset_version);
    
    rg_rulesets.appendChild(rb_ruleset);  
    
  }

  var AP = OAA_WEB_ACCESSIBILITY_PREF;
  var p  = AP.preferences;
  
  var doc = window.document;  
  
  var rg_rulesets = doc.getElementById("ID_RADIOGROUP_RULESETS");

  var rulesets = OpenAjax.a11y.all_rulesets.getAllRulesets();
  var rulesets_len = rulesets.length;

  if (rg_rulesets.itemCount === 0) {
    for (var i = 0; i < rulesets_len; i++) addRulesetradio(rulesets[i]);
  }

  for (i = 0; i < rg_rulesets.itemCount; i++) {
    var radio = rg_rulesets.getItemAtIndex(i);
    if (p.ruleset_id == radio.getAttribute('id')) {
      rg_rulesets.selectedIndex = i;
    }
  }

  // Radio group for WCAG 2.0 level

  var rg_level   = document.getElementById("ID_RADIOGROUP_LEVEL");
  
  switch (p.wcag20_level) {
  
  case OpenAjax.a11y.WCAG20_LEVEL.A:
    rg_level.selectedIndex = 2;
    break;
    
  case OpenAjax.a11y.WCAG20_LEVEL.AA:
    rg_level.selectedIndex = 1;
    break;
    
  default:
    rg_level.selectedIndex = 0;
    break;
    
  }

  var rg_recommended = document.getElementById("ID_CHECKBOX_RECOMMENDED_RULES_ENABLED");
  
  rg_recommended.checked = p.wcag20_recommended_rules_enabled

  // Other

  var cb_layout_tables = document.getElementById("ID_CHECKBOX_LAYOUT_TABLES");
  if (cb_layout_tables) cb_layout_tables.checked = p.layout_tables;

  var cb_broken_links = document.getElementById("ID_CHECKBOX_BROKEN_LINKS");
  if (cb_broken_links) cb_broken_links.checked = p.broken_links;

  // Evaluation Results Filter

  var cb_manual_checks  = document.getElementById("ID_CHECKBOX_RESULTS_MANUAL_CHECKS");
  if (cb_manual_checks) cb_manual_checks.checked = p.show_results_manual_checks;

  var cb_warnings  = document.getElementById("ID_CHECKBOX_RESULTS_WARNINGS");
  if (cb_warnings) cb_warnings.checked = p.show_results_warnings;

  var cb_pass  = document.getElementById("ID_CHECKBOX_RESULTS_PASS");
  if (cb_pass) cb_pass.checked = p.show_results_pass;

  var cb_hidden = document.getElementById("ID_CHECKBOX_RESULTS_HIDDEN");
  if (cb_hidden) cb_hidden.checked = p.show_results_hidden;

  var cb_not_applicable = document.getElementById("ID_CHECKBOX_RESULTS_NOT_APPLICABLE");
  if (cb_not_applicable) cb_not_applicable.checked = p.show_results_not_applicable;


  // Menu and Toolbar Options

  var cb_accessibility_menu = document.getElementById("ID_CHECKBOX_ACCESSIBILITY_MENU");

  if (cb_accessibility_menu) {
    if (AP.ENABLE_ACCESSIBILITY_MENU_PREF) {
      cb_accessibility_menu.checked = p.show_accessibility_menu;
    }
    else {
      cb_accessibility_menu.hidden = true;
    }
  }  

  var cb_accessibility_icon = document.getElementById("ID_CHECKBOX_ACCESSIBILITY_ICON");

  if (cb_accessibility_icon) {
    if (AP.ENABLE_ACCESSIBILITY_ICON_PREF) {
      cb_accessibility_icon.checked = p.show_accessibility_icon;
    }
    else {
      cb_accessibility_icon.hidden = true;
    }
  }  

  var vb_menu_icon = document.getElementById("ID_VBOX_MENU_ICON");

  if (vb_menu_icon && 
      !AP.ENABLE_ACCESSIBILITY_MENU_PREF &&
      !AP.ENABLE_ACCESSIBILITY_ICON_PREF) vb_menu_icon.hidden = true;
          

};
        
/**
 * @function setDefaultPreferences
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF.dialog
 *
 * @desc Reset references to default values
 */

OAA_WEB_ACCESSIBILITY_PREF.dialog.setDefaultPreferences = function () {

  OAA_WEB_ACCESSIBILITY_PREF.util.setDefaultPreferences();
  
  OAA_WEB_ACCESSIBILITY_PREF.dialog.initPreferencesDialog();

  var doc   = window.document;    
  
};

/**
 * @function setPreferences
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_PREF.dialog
 *
 * @desc Reset references to default values
 */

OAA_WEB_ACCESSIBILITY_PREF.dialog.setPreferences = function () {

  var p = OAA_WEB_ACCESSIBILITY_PREF.preferences;
  
  var doc = window.document;  
  
  var rg_rulesets = doc.getElementById("ID_RADIOGROUP_RULESETS");

  if (rg_rulesets.selectedIndex >= 0) {
    var radio = rg_rulesets.getItemAtIndex(rg_rulesets.selectedIndex);
    p.ruleset_id = radio.getAttribute('id');
  }
  
  var rg_recommended = document.getElementById("ID_CHECKBOX_RECOMMENDED_RULES_ENABLED");
  
  p.wcag20_recommended_rules_enabled = rg_recommended.checked;

  // Radio group for WCAG 2.0 level

  var rg_level   = document.getElementById("ID_RADIOGROUP_LEVEL");
  
  switch (rg_level.selectedIndex) {
  case 2:
    p.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.A;
    break;
    
  case 1:
    p.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.AA;
    break;
    
  default:
    p.wcag20_level = OpenAjax.a11y.WCAG20_LEVEL.AAA;
    break;
  }  

  // Other

  var cb_layout_tables = document.getElementById("ID_CHECKBOX_LAYOUT_TABLES");
  if (cb_layout_tables) p.layout_tables = cb_layout_tables.checked;

  var cb_broken_links = document.getElementById("ID_CHECKBOX_BROKEN_LINKS");
  if (cb_broken_links) p.broken_links = cb_broken_links.checked;

  // Evaluation Results Filter

  var cb_manual_checks = document.getElementById("ID_CHECKBOX_RESULTS_MANUAL_CHECKS");
  if (cb_manual_checks) p.show_results_manual_checks = cb_manual_checks.checked;

  var cb_warnings = document.getElementById("ID_CHECKBOX_RESULTS_WARNINGS");
  if (cb_warnings) p.show_results_warnings = cb_warnings.checked;

  var cb_hidden = document.getElementById("ID_CHECKBOX_RESULTS_HIDDEN");
  if (cb_hidden) p.show_results_hidden = cb_hidden.checked;

  var cb_pass  = document.getElementById("ID_CHECKBOX_RESULTS_PASS");
  if (cb_pass) p.show_results_pass = cb_pass.checked;

  var cb_not_applicable = document.getElementById("ID_CHECKBOX_RESULTS_NOT_APPLICABLE");
  if (cb_not_applicable) p.show_results_not_applicable = cb_not_applicable.checked;

  // Accessibility Menu

  var cb_accessibility_menu = document.getElementById("ID_CHECKBOX_ACCESSIBILITY_MENU");
  if (cb_accessibility_menu) p.show_accessibility_menu = cb_accessibility_menu.checked;

  var cb_accessibility_icon = document.getElementById("ID_CHECKBOX_ACCESSIBILITY_ICON");
  if (cb_accessibility_icon) p.show_accessibility_icon = cb_accessibility_icon.checked;

  OAA_WEB_ACCESSIBILITY_PREF.util.setPreferences();

  if (typeof OAA_WEB_ACCESSIBILITY_PREF.preferences_call_back == 'function') {
    OAA_WEB_ACCESSIBILITY_PREF.preferences_call_back();
  }  
  
};


/**
 * @function doOK
 *
 * @desc Called when OK button is pressed in dialog
 */

function doOK() {
  OAA_WEB_ACCESSIBILITY_PREF.dialog.setPreferences();
  return true;
}

window.onload = OAA_WEB_ACCESSIBILITY_PREF.dialog.onLoad;

