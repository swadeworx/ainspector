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
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.events.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.events.title");

  /**
   * @panel eventsSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function eventsSidePanel() {}
  
  eventsSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    parentPanel: main_panel,
    title: side_panel_title,
    order: 4,
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
       var dom_element = selection.dom_element; 
       if (dom_element)
         this.rebuild(this.showOnRulesTabSelect(dom_element));
       else this.rebuild(this.showOnRulesTabSelect(selection.value.dom_element));
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
       //else if (element.value.dom_element) this.rebuild(this.showOnRulesTabSelect(element.value.dom_element));
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
       var events = cache_item.getEvents();
       var rule_result_array = new Array();

       for(var i=0; i<events.length; i++){
    	 rule_result_array.push({"label": events[i].label, "value": events[i].value, "description": events[i].description});
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
   	   for(var i in resultArray){ if(resultArray.hasOwnProperty(i)){flag = false;}}
   	   FBTrace.sysout("flag: " + flag);
   	   if (flag) {
    	   emptyTemplate.tag.replace({object: resultArray}, this.panelNode);
       } else {
    	   
    	   eventsTemplate.tag.replace({object: resultArray}, this.panelNode);    	    
       }
     }
   });
  
  var eventsTemplate = domplate(BaseRep, {
	    
    tag:
      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, "Events"),
            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, "Value"),
            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, "Descritpion")
          )
        ),  
        TBODY(
          FOR("obj", "$object",
            TR({class: "tableRow a11yFocus", role: "row"},
              TD({class: "resultsCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.label")),
              TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.value|getValue")),
              TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.description|getValue"))
            ) //end TR
          ) 
        ) //end TBODY  
      ),
      
      getValue : function(value){
          if (value != undefined) return value;
          else return "";
      }
  });
  var emptyTemplate = domplate(BaseRep, {
	    
	    tag:
	      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
	        THEAD(
	          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
	            TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, "Events"),
	            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, "Value"),
	            TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, "Descritpion")
	          )
	        ),  
	        TBODY(
	            TR({class: "tableRow a11yFocus", role: "row"},
	              TD(DIV({class: "gridLabel"},"none"))
	            ) //end TR
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
 
  Firebug.registerPanel(eventsSidePanel);
}});