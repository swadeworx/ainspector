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
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.style.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.style.title");

  /**
   * @panel styleSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function styleSidePanel() {}
  
  styleSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    parentPanel: main_panel,
    title: side_panel_title,
    order: 3,
    editable: true,
    
    /**
     *@constructor
     *
     * initialize
     * 
     *@author pbale
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

       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/userinterface.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/fonts-min.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/tabview.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/ainspector.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/allyGrade.css");
       appendStylesheet(this.panelNode.ownerDocument, "chrome://ainspector/content/css/grid.css");

       this.setSelection = bind(this.setSelection, this);
	   this.onKeyPress = bind(this.onKeyPress, this);

       this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
       this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
       Firebug.Panel.initializeNode.apply(this, arguments);
     },
    
     /**
      * onKeyPress
      * 
      * @desc
      * 
      * @param event
      */
     onKeyPress: function(event) {
    
//   event.stopPropagation();
	 
       var current_row;
       var next_row;
       var previous_row;
       var prev_cell;
       var next_cell;
       
       FBTrace.sysout("inside onkeypress of sidepanel - rules", event);
       var table_rows = event.target.offsetParent.rows;
       if (!table_rows) return;
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
       FBTrace.sysout("event.keyCode: " + event.keyCode);
       FBTrace.sysout("KeyEvent.DOM_VK_UP: " + KeyEvent.DOM_VK_UP);
       if (event.keyCode == KeyEvent.DOM_VK_UP) {
		 //current_row = getAncestorByClass(event.target, "tableRow");
    	 //FBTrace.sysout("up..." , current_row);
    	 //previous_row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow); //current_row.previousSibling;
    	 result = previous_row.repObject.dom_element;
         rule_result_array = this.showOnRulesTabSelect(result);
         if (rule_result_array.length > 0) this.rebuild(rule_result_array);
      
	   } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
    	 //current_row = getAncestorByClass(event.target, "gridRow");
    	 //next_row = current_row.nextSibling;
    	 

    	 //next_row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow, true);
		 FBTrace.sysout("next_row: ", next_row);  
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
     
     /**
      * @function destroyNode
      * 
      * @desc called by Firebug Framework
      */
     destroyNode: function() {
   
       this.mainPanel.panelNode.removeEventListener("click", this.setSelection, false);
       this.mainPanel.panelNode.removeEventListener("keypress", this.onKeyPress, false);
       Firebug.Panel.destroyNode.apply(this, arguments);
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
         this.rebuild(this.showOnRulesTabSelect(dom_element));
       else if (selection.hasOwnProperty("value") && selection.value.dom_element)
    	 this.rebuild(this.showOnRulesTabSelect(selection.value.dom_element));
       else this.rebuild(this.showOnRulesTabSelect(selection));
     },
     
     /**
      * show
      * 
      * @desc
      * 
      * @param state
      */
     show: function(state) {
	   
       Firebug.Panel.show.apply(this, arguments);
       this.updateSelection();
     },
     
     /**
      * @function setSelection
      * 
      * @desc
      * 
      * @param event
      */
     setSelection: function(event) {
   
       var element = Firebug.getRepObject(event.target);
       if (element.dom_element)
         this.rebuild(this.showOnRulesTabSelect(element.dom_element));
       //else if(element.value.dom_element) this.rebuild(this.showOnRulesTabSelect(element.value.dom_element));
       else this.rebuild(this.showOnRulesTabSelect(element)); //for colorcontrast

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
       var properties = cache_item.getStyle();
       var rule_result_array = new Array();

       for(var i=0; i<properties.length; i++){
    	 rule_result_array.push({"label": properties[i].label, "value": properties[i].value});
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
       var toolbar_selected = AINSPECTOR_FB.toolbarUtil.getSelectedToolbarButton(Firebug.currentContext);
       if (toolbar_selected == "colorContrast") {
         var flag = true;
   	    
         for (var i in resultArray){ 
   		   
           if(resultArray.hasOwnProperty(i)){
   		     flag = false;
   		     break;
   		   }
   	     }
   	   
         if (flag) {
           var header_elements = ["CSS Property", "Value"];
           //clearNode(this.panelNode.offsetParent.children[1]);
	       AINSPECTOR_FB.emptyTemplate.tag.replace({header_elements: header_elements}, this.panelNode);
	     } else {
	       styleTemplate.tag.replace({object: resultArray}, this.panelNode);
         }
       
       } else {
    	 toolbar_selected = toolbar_selected.charAt(0).toUpperCase() + toolbar_selected.slice(1);
         var message = "Style Panel is disabled for the '" + toolbar_selected + "' toolbar button";
         AINSPECTOR_FB.disablePanelTemplate.mesgTag.replace({message: message}, this.panelNode);	 
       }
    }
   });
  
  var styleTemplate = domplate(BaseRep, {
	    
	    tag:
	      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
	        THEAD(
	          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
	            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "Cache Property")),
	            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, DIV({class: "gridHeaderCellBox"}, "Value"))
	          )
	        ),  
	        TBODY(
	          FOR("obj", "$object",
	            TR({class: "tableRow a11yFocus", role: "row"},
	              TD({class: "resultsCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.label")),
	              TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.value"))
	            ) //end TR
	          ) 
	        ) //end TBODY  
	      )
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
 
  Firebug.registerPanel(styleSidePanel);
}});