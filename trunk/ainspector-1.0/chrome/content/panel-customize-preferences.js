//Initialized from window Parameters
var FBL;
var FBTrace;
var Firebug;
var rulesets;
var level_A;
var level_AA;
var level_AAA;

var AINSPECTOR_FB = AINSPECTOR_FB || {};

/**
 * @function init
 * 
 * @desc loads the xul window when Preferences button is clicked
 */
function init(){
  var args = window.arguments[0];
  FBL = args.FBL;
  FBTrace = args.FBTrace;
  Firebug = args.Firebug;
  rulesets = args.all_rulesets;
  level_A = args.level_A;
  level_AA = args.level_AA;
  level_AAA = args.level_AAA;
  
  AINSPECTOR_FB.preferences.prefmang();
};

AINSPECTOR_FB.preferences = AINSPECTOR_FB.preferences || {};

AINSPECTOR_FB.preferences.prefmang = function(){
	 
  var i;
  var label;
  var ruleset_id;
  var wcag20_level;
  var broken_links;
  var ruleset;

  var listbox_rulesets = document.getElementById("LISTBOX_RULESETS_ID");
  var listitem_ruleset;
  var selected_index = -1;
	  
  AINSPECTOR_FB.preferences.removeChildNodes(listbox_rulesets);
	  
  for (i = 0; i < rulesets.length; i++) {
    ruleset = rulesets[i];
	listitem_ruleset = document.createElement("listitem");
	listitem_ruleset.setAttribute("label", ruleset.ruleset_title + " (" + ruleset.ruleset_version + ")");
	listitem_ruleset.setAttribute("id",    ruleset.ruleset_id);
	
	var preferences = Firebug.preferenceModule.getRulesetPrefs();
	
	if (preferences.ruleset_id == ruleset.ruleset_id) selected_index = i;
	  listbox_rulesets.appendChild(listitem_ruleset);
  }//end for
	  
  listbox_rulesets.selectedIndex = selected_index;
	  
  var radiogroup_wcag20_level   = document.getElementById("ID_RADIOGROUP_LEVEL");
	  
  if (preferences.wcag20_level >= level_A && 
	preferences.wcag20_level <= level_AAA) {
	   
	switch(preferences.wcag20_level) {
	    
      case level_AAA:
        radiogroup_wcag20_level.selectedIndex = 0;
        break;
    
      case level_AA:
        radiogroup_wcag20_level.selectedIndex = 1;
        break;

      case level_A:
        radiogroup_wcag20_level.selectedIndex = 2;
        break;
    
      default:
        radiogroup_wcag20_level.selectedIndex = 0;
        break;
    
    } // end switch
  }    
	    
  var checkbox_broken_links = document.getElementById("PREFERENCES_CHECKBOX_BROKEN_LINKS");
  checkbox_broken_links.checked = preferences.broken_links;

  var button_save  = document.getElementById("PREFERENCES_BUTTON_SAVE");
  button_save.disabled = true;

}

/**
 * @function updatePrefs
 * 
 * @memberOf AINSPECTOR_FB.preferences
 * 
 * @desc saves the changes in preference xul window when clicked on OK button
 */
AINSPECTOR_FB.preferences.updatePrefs = function () {

  var preferences = Firebug.preferenceModule.getRulesetPrefs();
  var listbox_rulesets = document.getElementById("LISTBOX_RULESETS_ID");
  var listitem_ruleset = listbox_rulesets.selectedItem;

  if (listitem_ruleset && listitem_ruleset.id) {
    preferences.ruleset_id = listitem_ruleset.id;  
  }
  
  // Radio group for WCAG 2.0 level

  var radio_level_a   = document.getElementById("ID_RADIO_LEVEL_A");
  var radio_level_aa  = document.getElementById("ID_RADIO_LEVEL_AA");
  var radio_level_aaa = document.getElementById("ID_RADIO_LEVEL_AAA");
  if (radio_level_a.selected)   preferences.wcag20_level = level_A;
  if (radio_level_aa.selected)  preferences.wcag20_level = level_AA;
  if (radio_level_aaa.selected) preferences.wcag20_level = level_AAA;
  
  var checkbox_broken_links = document.getElementById("PREFERENCES_CHECKBOX_BROKEN_LINKS");
  preferences.broken_links = checkbox_broken_links.checked;  

  Firebug.preferenceModule.setPreferences(preferences);
  
  var button_save  = document.getElementById("PREFERENCES_BUTTON_SAVE");
  button_save.disabled = true;
  window.close();
};
		
/**
 * @function closeWindow
 * 
 * @memberOf AINSPECTOR_FB.preferences
 * 
 * @desc response to the Cancel button on XUL window 
 */
AINSPECTOR_FB.preferences.closeWindow = function () {
  window.close();	
};

/**
 * @function resetPreferencesToDefaultValues
 *
 * @memberOf OAA_CI.preferences
 *
 * @desc Reset references to default values
 */

AINSPECTOR_FB.preferences.resetPreferencesToDefaultValues = function () {
  Firebug.preferenceModule.setDefaultPreferences();
  AINSPECTOR_FB.preferences.prefmang();
};
		
AINSPECTOR_FB.preferences.onSelectionChange = function () {
	  var i;

	  var listbox_rulesets    = document.getElementById("LISTBOX_RULESETS_ID");

  var textbox_description = document.getElementById("ID_TEXTBOX_DESCRIPTION");

  var textbox_author      = document.getElementById("ID_TEXTBOX_AUTHOR");

  var ruleset_item = listbox_rulesets.selectedItem;


  var ruleset = null;
  
  if (ruleset_item) {
    for (i = 0; i < rulesets.length; i++) {
      if (ruleset_item.id == rulesets[i].ruleset_id) {
        ruleset = rulesets[i];
        break;
      }
    } // end loop  
  }

  if (ruleset) {
    textbox_description.value = ruleset.ruleset_description;
    textbox_author.value      = ruleset.author_name;
  }
  else {
    textbox_description.value = "no description";
    textbox_author.value      = "no author";
  }

  var button_save  = document.getElementById("PREFERENCES_BUTTON_SAVE");
  button_save.disabled = false;
  
}; 

/**
 * @function removeChildNodes
 * 
 * @memberOf AINSPECTOR_FB.preferences
 * 
 * @desc remove childnodes 
 */
AINSPECTOR_FB.preferences.removeChildNodes = function(node){

  if (node && node.hasChildNodes()) {
    while (node.firstChild) {
      node.removeChild(node.firstChild );
    }
  }
};
