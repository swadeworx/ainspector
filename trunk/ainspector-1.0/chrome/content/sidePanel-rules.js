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
       this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, false);
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
   
       var current_row;
       var next_row;
       var previous_row;
       var prev_cell;
       var next_cell;
       
       var table_rows = event.target.offsetParent.rows;
       var no_of_rows = table_rows.length;
       var flag = false;
       for (var row=0; row < no_of_rows; row++) {
    	 var class_list = table_rows[row].classList;
    	 var class_name_it = 0;
    	 for (class_name_it; class_name_it < class_list.length; class_name_it++) {
    	   if (class_list[class_name_it] == "gridRowSelected") {
    		 flag = true;
    		 break;
    	   }	 
    	 }
    	 if (flag == true){
    	   current_row = table_rows[row];
    	   if (row < no_of_rows) {
    	     
    		 if (row == 1) previous_row = table_rows[no_of_rows-1];
    	     else previous_row = table_rows[row-1];
    	     
    	     next_row = table_rows[row+1];
    	   } else { //if we reach end of the table row then go back to first row
      	     next_row = table_rows[1]; //table_rows[0] is the header row
      	     previous_row = table_rows[row-1];
    	   }
    	   break;
    	 }
       }
       if (event.keyCode == KeyEvent.DOM_VK_UP) {
		 //current_row = getAncestorByClass(event.target, "tableRow");
    	 //FBTrace.sysout("up..." , current_row);
    	 //previous_row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow); //current_row.previousSibling;
    	 result = previous_row.repObject.dom_element;
         rule_result_array = this.showOnRuleResultsTabSelect(result);
         if (rule_result_array.length > 0) this.rebuild(rule_result_array);
      
	   } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
    	 //current_row = getAncestorByClass(event.target, "gridRow");
    	 //next_row = current_row.nextSibling;
    	 

    	 //next_row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow, true);
		 result = next_row.repObject.dom_element;
         rule_result_array = this.showOnRuleResultsTabSelect(result);
       
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
       var selection = this.mainPanel.selection;
       var dom_element = selection.dom_element; 
       if (dom_element)
         this.rebuild(this.showOnRuleResultsTabSelect(dom_element));
       else 
         this.rebuild(this.showOnRuleResultsTabSelect(selection.value.dom_element));
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
    	   if (first_element.hasOwnProperty("dom_element")) result = first_element.dom_element;
    	   else result = first_element;
           rule_result_array = this.showOnRuleResultsTabSelect(result);

           //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
           this.rebuild(rule_result_array);
         } catch (er) {
        	 
         }
       } else {
    	 if (first_element == "none") this.rebuild("");   
       }
     },
     
     showContrastOrAllElements: function(state, element){
	   if (state) {
         try {
           rule_result_array = this.showOnRuleResultsTabSelect(element);
           //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
           this.rebuild(rule_result_array);
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
   
       var element = Firebug.getRepObject(event.target);
       
       try {
       if (element.dom_element)
         this.rebuild(this.showOnRuleResultsTabSelect(element.dom_element));
       //else if (element.value.dom_element) this.rebuild(this.showOnRuleResultsTabSelect(element.value.dom_element));
       //else if (element.value) this.rebuild(this.showOnRuleResultsTabSelect(element.value)); //for colorcontrast
       else this.rebuild(this.showOnRuleResultsTabSelect(element));
       } catch(e) {
    	   
       }
     },
     
     /**
      * @function showOnRuleResultsTabSelect
      * 
      * @desc
      * 
      * @param {Object} cache_item
      */
     showOnRuleResultsTabSelect : function(cache_item) {
       
       var cache_item = cache_item;
       var rule_results = cache_item.getResultRules();
       var rule_result_array = new Array();

       for(var i=0; i<rule_results.length; i++){
   	     rule_result_array.push({"label": rule_results[i].getSeverity().label, 
   	    	                     "id": rule_results[i].cache_id,
   	    	                     "description": rule_results[i].toString()});
       }
       return rule_result_array;
       
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
       var flag = true;
   	   for (var i in resultArray){ 
   		 if(resultArray.hasOwnProperty(i)){
   		   flag = false;
   		   break;
   		 }
   	   }
   	   if (flag) {
           var header_elements = ["Result", "Rule ID", "Message"];
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
            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "Result")),
            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "Rule ID")),
            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, DIV({class: "gridHeaderCellBox"}, "Message"))
          )
        ),  
        TBODY(
          FOR("obj", "$object",
            TR({class: "tableRow gridRow", role: "row"},
              TD({class: "resultsCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, 
            	DIV({class: "gridContent"}, TAG("$obj|getAccessibility", {'object': '$obj'}))),
              TD({class: "ruleIdCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, 
                DIV({class: "gridContent"},"$obj.id")),
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
