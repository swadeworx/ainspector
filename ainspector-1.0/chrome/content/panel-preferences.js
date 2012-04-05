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

var AINSPECTOR_FB = AINSPECTOR_FB || {};	

with (FBL) {
  
  panel : null;
  ruleset_description: null; //) ? AINSPECTOR_FB.ruleset_descritpion : null;
  ruleset_author: null; //) ? AINSPECTOR_FB.ruleset_author : null;
  ruleset_data: "";
  ruleset_index: AINSPECTOR_FB.ruleset_index;
  sc_level0: false;
  sc_level1: false;
  sc_level2: false;
  str_bundle: "";
  
 AINSPECTOR_FB.preferences = {
		  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Images" button in the AInspector toolbar
   * 
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
   
   viewPanel : function(context, panel_name, cache_object) {
     FBTrace.sysout("bla bla bla bla");
     window.openDialog("chrome://ainspector/content/preferences.xul", "",
            "chrome,centerscreen,dialog,modal,resizable=yes", "");
	 this.init();
   },
   
   init : function() {
     FBTrace.sysout("Inside initPrefs....");
   },
   
   onItemSelectionChange : function() {
   
   },
   
   updatePrefsFromControlValues : function() {
   
   },
   
   resetPreferencesToDefaultValues : function() {
   
   },
  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Images" button in the AInspector toolbar
   * 
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  setPreferences: function(context, panel_name, cache_object) {		
    var flag = true;
    

	FBTrace.sysout("inside prefpanel");
	AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels(flag);
	FBTrace.sysout("inside prefpanel 11");
	if (!panel_name) panel_name = "AInspector";
	
	var i;
	var label;
	  
	var pref_manager;
	var ruleset_id;
	var wcag20_level;
	var broken_links;
	  
    panel = context.getPanel(panel_name, true);

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      clearNode(panel.panelNode);
     // clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
    }

    //AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);
    AINSPECTOR_FB.ainspectorUtil.loadCSS("chrome://ainspector/content/css/ainspector-pref.css", panel.document);
	panel.panelNode.id = "ainspector-pref-panel"; 
	ruleset_data = {
	  ruleset_description: AINSPECTOR_FB.ruleset_description,
	  ruleset_author: AINSPECTOR_FB.ruleset_author
	 // sc_level0: AINSPECTOR_FB.success_criteria_level0,
	  //sc_level1: AINSPECTOR_FB.success_criteria_level1,
	  //sc_level2: AINSPECTOR_FB.success_criteria_level2
	};
    try {
      panel.table = AINSPECTOR_FB.preferences.prefTemplate.rulesetSelectTag.replace( {ruleset_data: ruleset_data}, panel.panelNode, AINSPECTOR_FB.preferences.prefTemplate);
    } catch(e){
    	FBTrace.sysout("PREF ERROR", e);
    }
    //ruleset_index = AINSPECTOR_FB.ruleset_index;
    AINSPECTOR_FB.ainspectorUtil.setClass(panel.table.children[1].children[0].children[AINSPECTOR_FB.ruleset_index-1], "rulesetSelected");
  }
}; //end of images
  
  /**
   * @Domplate prefTemplate
   * @memberof AINSPECTOR_FB.preferences
   * 
   * @Desc template object, create HTML mark up showed upon clicking the images toolbar button
   * 
   * @return preferences Panel to select the ruleset and A, AA & AAA requirement
   */
  AINSPECTOR_FB.preferences.prefTemplate = domplate({
    
	  rulesetSelectTag:
		 DIV({class:'rulesets'},
		   DIV({class: 'ai-ruleset'}, "Select Ruleset"),		 
		 TABLE({class: 'ai-ruleset-table', cellspacing: 0, cellpadding: 0, border:1},
		   TBODY(
		     TR(TD({onclick: "$highlightRuleset", id: "IITAA20", _index: '1'}, "IITAA2.0 (0.5 beta)")),
		     TR(TD({onclick: "$highlightRuleset", id: "WCAG20T", _index: '2'}, "WCAG2.0 ARIA Transitional (0.5 beta)")),
		     TR(TD({onclick: "$highlightRuleset", id: "WCAG20S", _index: '3'}, "WCAG2.0 ARIA Strict (0.5 beta)"))
		   )//end TBODY
		 ),
		 DIV('Description'),
		 TEXTAREA({class: 'textar'}, 
		   "$ruleset_data.ruleset_description"
		 ),
		 DIV('Author'),
		 TEXTAREA({class: 'textara'}, "$ruleset_data.ruleset_author"),
		 H3('Select 2.0 Success Criteria Level'),
		 DIV({class: 'criteria_level', onclick:'$onRulesetChange'},
		   INPUT({ class: 'radioElements', type: 'radio', id: '0', checked: 'true'}, "Level A, AA and AAA (highest level of accessibility)"),
		   INPUT({ class: 'radioElements', type: 'radio', id: '1'}, "Level A and AA"),
		   INPUT({ class: 'radioElements', type: 'radio', id: '2'}, "Level A (lowest level of accessibility)")
		 ),
		 /*H3('Other Options'),
		 DIV({},
	       INPUT({class: 'formElements', type: 'checkbox', onclick: '$onClick'}, "Enable checking for broken links"),
		   INPUT({class: 'formElements', type: 'checkbox', onclick: '$onClick'}, "Show 'Accessibility' menu in main menu")
		 ),*/
		 BUTTON({class: 'button', checked: "true", type: "checkbox", onclick: "$onRulesetChange"},
		           "Save Changes"
		 ),
		 BUTTON({class: 'button', checked: "true", type: "checkbox", onclick: "$restoreDefaults"},
		           "Restore Default Preferences"
		 )
		 ),
		 
		 /**
		  * @function onClick
		  * 
		  * @desc
		  * 
		  * @param {Object} event
		  */
		 onClick :  function(event){
	  
	       FBTrace.sysout("event when radio or checkbox seleted in pref", event);
	     
	  
  		 },
     
		/**
		 * @function onRulesetChange
		 * 
		 * @desc action performed when a rule set is selected from the list
		 * 
		 * @param event - event triggered when there is change of selection 
		 */
		onRulesetChange : function(event){
          FBTrace.sysout("panel...................", panel);
	      FBTrace.sysout("event in onRulesetChange", event);

	      
	      //var ruleset_selected = event.target.options[index];
	      str_bundle = document.getElementById("ainspector_stringbundle1");
	      //FBTrace.sysout("ruleset_selected: ", ruleset_selected.id);
	      //if (ruleset_selected.id == "IITAA20") {
	      var ruleset_obj = getAncestorByClass(event.target, 'rulesets');
	      FBTrace.sysout("ruleset_obj: ", ruleset_obj);
	      if (event.target.type != 'radio') {
		    //
		    var opt = getChildByClass(ruleset_obj, 'textar');
		      FBTrace.sysout("opt: ", opt);
		    if (event.target.id) {
		    if (event.target.id == "IITAA20") {
	          ruleset_description = str_bundle.getString("ainspector.ruleset.IITAA20.desc");
	          ruleset_author = str_bundle.getString("ainspector.ruleset.IITAA20.author");
 	        } else if (event.target.id == "WCAG20T") {
	          ruleset_description = str_bundle.getString("ainspector.ruleset.WCAG20T.desc");
		      ruleset_author = str_bundle.getString("ainspector.ruleset.WCAG20T.author");
	        } else {
	          ruleset_description = str_bundle.getString("ainspector.ruleset.WCAG20S.desc");
		      ruleset_author = str_bundle.getString("ainspector.ruleset.WCAG20S.author");
	        }
		    var index = event.target.index;
	        ruleset_index = AINSPECTOR_FB.ruleset_index = index;

		    }
	        FBTrace.sysout(ruleset_description);
	        FBTrace.sysout(ruleset_author);
	      
	        AINSPECTOR_FB.ruleset_description = ruleset_description;
	        AINSPECTOR_FB.ruleset_author = ruleset_author;
	        ruleset_data = {
	    	   	    ruleset_description: ruleset_description,
	    	   	    ruleset_author: ruleset_author
	    	   	   /* sc_level0: sc_level0,
	    	   	    sc_level1: sc_level1,
	    	   	    sc_level2: sc_level2*/
	    	   	  };
	    	      clearNode(panel.table);
	    	      panel.table = this.rulesetSelectTag.replace( {ruleset_data: ruleset_data}, panel.panelNode, null);
	    	      FBTrace.sysout("", panel.table.children[1].children[0]);
	    	      
	    	      AINSPECTOR_FB.ainspectorUtil.setClass(panel.table.children[1].children[0].children[ruleset_index-1], "rulesetSelected");

	    	      FBTrace.sysout("ruleset_data: ", ruleset_data);
	      } else {
	    	  var id = event.target.id;
	    	  var radio_elements_group = getChildByClass(ruleset_obj, 'criteria_level');
	    	  var children = radio_elements_group.children;
	    	  for (var i=0; i < children.length; i++){
	    	    if (children[i].checked == true) {
	    		  children[i].checked = false;  
	    	    }	
	    	  }
	    	  children[id].checked = true;
	    	}
        },
        
        /**
         * @function highlightRuleset
         * 
         * @desc save changes made to the preferences panel
         * 
         * @param event - to be triggered
         */
        highlightRuleset : function(event){

          var index = event.target.index;
          AINSPECTOR_FB.ruleset_index = index;
          var children = panel.table.children[1].children[0].children;
          var flag = false;
          for (var i=0; i<children.length; i++){
        	var it_children = children[i];
        	
        	for (var j=0; j<children[i].classList.length; j++){
        	  if (children[i].classList[j] == 'rulesetSelected') {
                  AINSPECTOR_FB.ainspectorUtil.removeClass(children[i], "rulesetSelected");
                  flag = true;
                  break;
        	  }	
        	}
        	if (flag) break;
          }
          AINSPECTOR_FB.ainspectorUtil.setClass(panel.table.children[1].children[0].children[index-1], "rulesetSelected");
          this.onRulesetChange(event);
        },
        
        /**
         * @function restoreDefaults
         * 
         * @desc restore default preferences when the button is clicked
         * 
         * @param event - to be triggered
         */
        restoreDefaults : function(event) {
            FBTrace.sysout("restoreDefaults...................");

          str_bundle = document.getElementById("ainspector_stringbundle1");
          AINSPECTOR_FB.ruleset_description = str_bundle.getString("ainspector.ruleset.WCAG20T.desc");
  	      AINSPECTOR_FB.ruleset_author = str_bundle.getString("ainspector.ruleset.WCAG20T.author");
  	      AINSPECTOR_FB.ruleset_index = 2;
  	      
  	    ruleset_data = {
  		   	    ruleset_description: AINSPECTOR_FB.ruleset_description,
  		   	    ruleset_author: AINSPECTOR_FB.ruleset_author
	   	  };
  	     if (panel.table)clearNode(panel.table);
	     panel.table = this.rulesetSelectTag.replace( {ruleset_data: ruleset_data}, panel.panelNode, null);
	     AINSPECTOR_FB.ainspectorUtil.setClass(panel.table.children[1].children[0].children[AINSPECTOR_FB.ruleset_index-1], "rulesetSelected");
        }
    });
  }