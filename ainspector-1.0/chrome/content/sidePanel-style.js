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
    order: 6,
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
       this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
       Firebug.Panel.initializeNode.apply(this, arguments);
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
       this.rebuild(this.showOnStyleTabSelect(selection.cache_item));
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
   
       var obj = Firebug.getRepObject(event.target);
       
       this.rebuild(this.showOnStyleTabSelect(obj.cache_item)); //for colorcontrast

     },
     
     /**
      * @function showOnStyleTabSelect
      * 
      * @desc
      * 
      * @param {Object} cache_item
      */
     showOnStyleTabSelect : function(cache_item) {
       
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
     }
   });
  
  var styleTemplate = domplate(BaseRep, {
	    
	    tag:
	      DIV({class: "side-panel"},
	      DIV({class: "element-select", style: "color: black; font-weight: bold;"}, "Styling, Dimentions and Positioning"),
        DIV({class: "element-select"}, "Actual rendered values for the stying, dimentions and positioning of the selected item. "),
	      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
	        THEAD(
	          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
	            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "Style and Position")),
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