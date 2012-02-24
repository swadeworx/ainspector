FBL.ns(function() { with (FBL) {

  var main_panel = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.mainpanel.name");
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.rules.title");
  
  /**
   * @function rulesSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function rulesSidePanel() {}
  
  rulesSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    parentPanel: main_panel,
    title: side_panel_title,
    order: 0,
    editable: true,

    /**
     *@constructor
     *
     * initialize
     * 
     *@param context
     * 
     *@param doc
     */
     initialize: function(context, doc) {
	   FBTrace.sysout("inside initialize of Rules Panel");
	   this.onKeyPress = bind(this.onKeyPress, this);
	   this.onCLick = bind(this.setSelection, this);
       Firebug.Panel.initialize.apply(this, arguments);
     },

     /**
      * initializeNode
      * 
      * @desc
      * 
      * @param  oldPanelNode
      */
     initializeNode: function(oldPanelNode) {

       appendStylesheet(this.panelNode.ownerDocument, "chrome://selectbug/skin/selectbug.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector-side-panel.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/fonts-min.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/tabview.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/allyGrade.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/grid.css");

//     this.onCLick = bind(this.onClick, this);
       this.setSelection = bind(this.setSelection, this);
	   this.onKeyPress = bind(this.onKeyPress, this);

       this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
       this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
       Firebug.Panel.initializeNode.apply(this, arguments);
    // Log simple message
     },
    
     /**
      * onKeyPress
      * 
      * @desc
      * 
      * @param event
      */
     onKeyPress: function(event) {
   
	   FBTrace.sysout("Inside rulesSidePanel-onKeyPress********************************", event);
       var current_row;
       var next_row;
       var previous_row;
       var prev_cell;
       var next_cell;
       
	   if (event.keyCode == KeyEvent.DOM_VK_UP) {
		 //current_row = getAncestorByClass(event.target, "tableRow");
    	 //FBTrace.sysout("up..." , current_row);
    	 previous_row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow); //current_row.previousSibling;
    	 FBTrace.sysout("previous_row" , previous_row);
    	 result = previous_row.repObject.dom_element;
         rule_result_array = this.showOnRulesTabSelect(result);
         if (rule_result_array.length > 0) this.rebuild(rule_result_array);
      
	   } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
		 FBTrace.sysout("............................next_row......................................");
    	 current_row = getAncestorByClass(event.target, "tableRow");
    	 FBTrace.sysout("current_row" , current_row);

    	 next_row = current_row.nextSibling;
    	 //next_row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow, true);
    	 FBTrace.sysout("next_row" , next_row);

    	 result = next_row.repObject.dom_element;
         rule_result_array = this.showOnRulesTabSelect(result);
       
         if (rule_result_array.length > 0) this.rebuild(rule_result_array);
       
	   } else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
         this.setSelection(event);
	   } else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
		 this.setSelection(event);
	   } else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
         this.deleteNode("node", "up");
       
	   } else if (event.keyCode == KeyEvent.DOM_VK_DELETE) {
         this.deleteNode("node", "down");
       
	   } else {
         return;
       }     
     },
     
     findIndex: function(ele){
       var k = -1;
       var e = ele;
       while (e) {
    	 if ("previousElementSibling" in e) {
    	   e = e.previousSibling;
    	   FBTrace.sysout("e", e);
    	   k = k+1;
    	 } else {
    	   k = -1;
    	   break;
    	 } 
       }
       return k;
     },
     
     /**
      * @function deleteNode
      * 
      * @desc
      * 
      * @param node
      * @param direction
      */
     deleteNode: function(node, direction) {
     
     },

     /**
      * @function destroyNode
      * 
      * @desc 
      */
     destroyNode: function() {
   
       this.mainPanel.panelNode.removeEventListener("click", this.setSelection, false);
       this.mainPanel.panelNode.removeEventListener("keypress", this.onKeyPress, false);
       Firebug.Panel.destroyNode.apply(this, arguments);
     },

     /**
      * show
      * 
      * @desc
      * 
      * @param state
      */
     show: function() {
	   
       FBTrace.sysout("inside show() of rules panel");
       Firebug.Panel.show.apply(this, arguments);
       //this.updateSelection();
     },
     
     /**
      * @function updateSelection
      * 
      * @desc
      * 
      * @param element - 
      */
     updateSelection : function() {
       FBTrace.sysout("updateSelection : ", this.mainPanel);	 
       var selection = this.mainPanel.selection;
       FBTrace.sysout("updteSelection element: ", selection);
       var dom_element = selection.dom_element; 
       if (dom_element)
         this.rebuild(this.showOnRulesTabSelect(dom_element));
       else 
         this.rebuild(this.showOnRulesTabSelect(selection.value.dom_element));
     },
     
     /**
      * @function sView
      * 
      * @param state
      * @param first_element
      */
     sView: function(state, first_element){
	   if (state) {
         try {
    	   result = first_element.dom_element;
      	   FBTrace.sysout("sView link..............." , result);
           rule_result_array = this.showOnRulesTabSelect(result);
    	   FBTrace.sysout("rule_result_array length..............." , rule_result_array);
           if (rule_result_array.length > 0) this.rebuild(rule_result_array);
         } catch (er) {
        	 
         }
       }
     },
     
     showContrastOrAllElements: function(state, element){
	   if (state) {
         try {
           rule_result_array = this.showOnRulesTabSelect(element);
    	   FBTrace.sysout("rule_result_array length..............." + rule_result_array.length);
           if (rule_result_array.length > 0) this.rebuild(rule_result_array);
         } catch (er) {
        	 
         }
       } 
     },

     /**
      * @function setSelection
      * 
      * @desc
      * 
      * @param event
      */
     setSelection : function(event) {
   
	   FBTrace.sysout("event in setSelection:", event);
       var element = Firebug.getRepObject(event.target);
       FBTrace.sysout("element: ", element);
       
       try {
       if (element.dom_element)
         this.rebuild(this.showOnRulesTabSelect(element.dom_element));
       //else if (element.value.dom_element) this.rebuild(this.showOnRulesTabSelect(element.value.dom_element));
       //else if (element.value) this.rebuild(this.showOnRulesTabSelect(element.value)); //for colorcontrast
       else this.rebuild(this.showOnRulesTabSelect(element));
       } catch(e) {
    	   
       }
     },
     
     /**
      * @function showOnRulesTabSelect
      * 
      * @desc
      * 
      * @param {Object} cache_item
      */
     showOnRulesTabSelect : function(cache_item) {
       
       var cache_item = cache_item;
       var rule_results = cache_item.getResultRules();
       var rule_result_array = new Array();

       for(var i=0; i<rule_results.length; i++){
   	     rule_result_array.push({"label": rule_results[i].getSeverity().label, "description": rule_results[i].toString()});
       }
       return rule_result_array;
       
     },
    
     /**
      * @function getRuleResults
      * 
      * @param rule_results_object
      * 
      * @return resultArray;
      */
     getRuleResults: function(rule_results_object){
     
         FBTrace.sysout("Inside getRuleResults....", rule_results_object);
         var i;
         var resultArray = new Array();
    	 var violations = rule_results_object.rules_violations;
    	 var manual_evaluations = rule_results_object.rules_manual_evaluations;
    	 var recommendations = rule_results_object.rules_recommendations;
         var informational = rule_results_object.rules_informational;
         var passed = rule_results_object.rules_passed;
         var not_applicable = rule_results_object.rules_na;
         var hidden = rule_results_object.rules_hidden;
         var warnings = rule_results_object.rules_warnings;
         
         if (violations && violations.length>0) {
         
           for (i = 0; i < violations.length; i++) {
             resultArray.push({severity: "Violation", message: violations[i]});
           }
         }

         if (manual_evaluations && manual_evaluations.length>0) {
         
           for (i = 0; i < manual_evaluations.length; i++) {
             resultArray.push({severity: "Manual Evaluation", message: manual_evaluations[i]});
           }
         }

         if (recommendations && recommendations.length>0) {
         
           for (i = 0; i < recommendations.length; i++) {
             resultArray.push({severity: "Recommendation", message: recommendations[i]});
           }
         }

         if (informational && informational.length>0) {
         
           for (i = 0; i < informational.length; i++) {
             resultArray.push({severity: "Information", message: informational[i]});
           } 
         }
       
         if (passed && passed.length>0) {
         
           for (i = 0; i < passed.length; i++) {
             resultArray.push({severity: "Pass", message: passed[i]});
           }
         }

         if (not_applicable && not_applicable.length>0) {
         
           for (i = 0; i < not_applicable.length; i++) {
             resultArray.push({severity: "NA", message: not_applicable[i]});
           }
         }
         
         if (hidden && hidden.length>0) {
             
           for (i = 0; i < hidden.length; i++) {
             resultArray.push({severity: "Hidden", message: hidden[i]});
           }
         }
         
         if (warnings && warnings.length>0) {
             
           for (i = 0; i < warnings.length; i++) {
             resultArray.push({severity: "Warning", message: warnings[i]});
           }
         }
         
         return resultArray;
    	 
     },
     
     /**
      * @function rebuild
      * 
      * @desc
      * 
      * @param resultArray
      */
     rebuild: function(resultArray){
       this.panelNode.id = "ainspector-side-panel";
       FBTrace.sysout("resultArray: ", resultArray);
       var flag = true;
   	   for (var i in resultArray){ 
   		 if(resultArray.hasOwnProperty(i)){
   		   flag = false;
   		   break;
   		 }
   	   }
   	   if (flag) {
	       FBTrace.sysout("flag: "+ flag);
           var header_elements = ["Rule Info/Props", "Message/Value"];
           FBTrace.sysout("this.panelNode: ", this.panelNode.offsetParent.children[1]);
           //clearNode(this.panelNode.offsetParent.children[1]);
 	      AINSPECTOR_FB.emptyTemplate.tag.replace({header_elements: header_elements}, this.panelNode);
   	   } else {
 	   
   		   rulesTemplate.tag.replace({object: resultArray}, this.panelNode);
       }
     },
   
     /**
      * hide
      * 
      * @desc
      */
     hide: function() {
     
	   Firebug.Panel.hide.apply(this, arguments);
     },

     /**
      * setTrialSelector
      * 
      * @desc
      * 
      * @param target
      * @param value
      */
     setTrialSelector: function(target, value) {
        
	   if (this.lockedElement) this.lockedElement.classList.remove("lockedSelectorRule");
       
	   this.trialSelector = value;
       this.selection = this.trialSelector;
       this.lockedElement = target;
       this.lockedSelection = this.selection;
       this.rebuild();
     },

     /**
      * showTrialSelector
      * 
      * @desc
      * 
      * @param trailSelector
      */
     showTrialSelector: function(trialSelector) {
        
	   var show = trialSelector ? true : false;
       collapse($('trialHint', this.document), show);
       var trialSelectorDiv = $('trialSelector', this.document);
       trialSelectorDiv.textContent = trialSelector;
       collapse(trialSelectorDiv, !show);
     },
    
     /**
      * onClick
      * 
      * @desc
      * 
      * @param event
      */
     onClick: function(event) {
   
	   var node = Firebug.getRepObject(event.target);;
       FBTrace.sysout("node: ", node);
     }
  });

  var BaseRep = domplate(Firebug.Rep, {
    
    /**
     * getNaturalTag
     * 
     * @desc
     * 
     * @param value
     */
	  getNaturalTag: function(value) {
    
	  var rep = Firebug.getRep(value);
      var tag = rep.shortTag ? rep.shortTag : rep.tag;
      return tag;
    }
  });

  var rulesTemplate = domplate(BaseRep, {
    
    tag:
      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", role: "row", tabindex: "0"},
            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, "RuleInfo/Props"),
            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, "Message/value")
          )
        ),  
        TBODY(
          FOR("obj", "$object",
            TR({class: "tableRow gridRow", role: "row"},
              TD({class: "resultsCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, 
            	DIV({class: "gridContent"}, TAG("$obj|getAccessibility", {'object': '$obj'}))),
              TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, 
            	DIV({class: "gridContent"},"$obj.description"))
            ) //end TR
          ) 
        ) //end TBODY  
      ),
      
      strTagPass : DIV({class: "passMsgTxt"}, "$object|getSeverity"),
      strTagViolation : DIV({class: "violationRulesMsgTxt"}, "$object|getSeverity"),
      strTagManual : DIV({class: "manualMsgTxt"}, "$object|getSeverity"),
      strTagHidden : DIV({class: "hiddenMsgTxt"}, "$object|getSeverity"),
      strTagRecommendation : DIV({class: "recommendationRulesMsgTxt"}, "$object|getSeverity"),
      strTagInfo : DIV({class: "infoMsgTxt"}, "$object|getSeverity"),
      strTagWarn : DIV({class: "warnMsgTxt"}, "$object|getSeverity"),
      
      getAccessibility : function(object){
  	    var severity =  object.label;
		var styleSeverityTag;
		if (severity == "Pass")  styleSeverityTag = this.strTagPass;
		if (severity == "Violation") styleSeverityTag = this.strTagViolation;
		if (severity == "Manual Check") styleSeverityTag = this.strTagManual;
		if (severity == "Hidden") styleSeverityTag = this.strTagHidden;
		if (severity == "Recommendation") styleSeverityTag = this.strTagRecommendation;
		if (severity == "Information") styleSeverityTag = this.strTagInfo;
		if (severity == "Warning") styleSeverityTag = this.strTagWarn;

		return styleSeverityTag;
    },
    
    getSeverity : function(object){
  	  return object.label;
    }
  });
  
  Firebug.registerPanel(rulesSidePanel);

}});
