FBL.ns(function() { with (FBL) {

  var main_panel = ainspectorUtil.$HW_STR("ainspector.mainpanel.name");
  var side_panel_name = ainspectorUtil.$HW_STR("ainspector.sidepanel.rules.name");
  var side_panel_title = ainspectorUtil.$HW_STR("ainspector.sidepanel.rules.title");
  
  /**
   * @panel NavigationSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function NavigationSidePanel() {}
  
  NavigationSidePanel.prototype = extend(Firebug.Panel, {
    
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
    
	   //this.onKeyPress = bind(this.onKeyPress, this);
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
       this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
       //this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, false);
       Firebug.Panel.initializeNode.apply(this, arguments);
    // Log simple message
     },
    
     /**
      * onClick
      * 
      * @desc
      * 
      * @param event
      */
     onClick: function(event) {
       FBTrace.sysout("event......................", event.target);
     },
    
     /**
      * onKeyPress
      * 
      * @desc
      * 
      * @param event
      */
     onKeyPress: function(event) {
   
	   FBTrace.sysout("Inside navigationSidePanel-onKeyPress", event);
       
	   if (event.keyCode == KeyEvent.DOM_VK_UP) {
         this.selectCellBy("tab");
       } else if (event.keyCode == KeyEvent.DOM_VK_UP) {
         this.selectCellBy("up");
       } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
         this.setSelection(event);
       } else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
         this.selectCellBy("left");
       } else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
         this.selectCellBy("right");
       } else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
         this.deleteNode("node", "up");
       } else if (event.keyCode == KeyEvent.DOM_VK_DELETE) {
         this.deleteNode("node", "down");
       } else {
         return;
       }     
     }, 
   
     /**
      * selectCellBy
      * 
      * @desc
      * 
      * @param direction
      */
     selectCellBy: function(direction) {
  
       if (direction == "up") {
       
       } else if (direction == "down"){
     
         FBTrace.sysout("Inside navigationSidePanel-selectCellBy() direction..."+ direction);
         this.setSelection;
       } else {
       
       }
     },
   
     /**
      * deleteNode
      * 
      * @desc
      * 
      * @param node
      * @param direction
      */
     deleteNode: function(node, direction) {
     
     },

     /**
      * destroyNode
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
     show: function(state) {
	   
       var rule_result_array = new Array();
       var result;
       FBTrace.sysout("Inside show of navigationSidePanel.js");
       Firebug.Panel.show.apply(this, arguments);
       
//     FBTrace.sysout("Main Panel...", this.mainPanel);
//     FBTrace.sysout("Side Panel...", Firebug.currentContext.getPanel('Rules'));
     },
     
     sView: function(state){
    	 if (state) {
             try {
        	   result = this.mainPanel.panelNode.lastElementChild.lastElementChild.firstElementChild.link.dom_element;
        	   FBTrace.sysout("sView link..............." , result);
               rule_result_array = this.getRuleResults(result);
        	   FBTrace.sysout("rule_result_array length..............." + rule_result_array.length);
               if (rule_result_array.length > 0) this.rebuild(rule_result_array);
             } catch (er) {
            	 
             }
           }
     },

     /**
      * setSelection
      * 
      * @desc
      * 
      * @param event
      */
     setSelection: function(event) {
   
	   FBTrace.sysout("event in setSelection:", event);
       var linkEle = Firebug.getRepObject(event.target);
       FBTrace.sysout("linkEle: ", linkEle);    
       
       this.rebuild(this.getRuleResults(linkEle.dom_element));
     },
    
     /**
      * getRuleResults
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
    	 var potential_violations = rule_results_object.rules_potential_violations;
    	 var recommendations = rule_results_object.rules_recommendations;
         var potential_recommendations = rule_results_object.rules_potential_recommendations;
         var passed = rule_results_object.rules_passed;
         var not_applicable = rule_results_object.rules_na;
         var hidden = rule_results_object.rules_hidden;
         var warnings = rule_results_object.rules_warnings;
         
         if (violations && violations.length>0) {
         
           for (i = 0; i < violations.length; i++) {
             resultArray.push({severity: "V", message: violations[i].rule_result.rule_title});
           }
         }

         if (potential_violations && potential_violations.length>0) {
         
           for (i = 0; i < potential_violations.length; i++) {
             resultArray.push({severity: "PV", message: potential_violations[i].rule_result.rule_title});
           }
         }

         if (recommendations && recommendations.length>0) {
         
           for (i = 0; i < recommendations.length; i++) {
             resultArray.push({severity: "R", message: recommendations[i].rule_result.rule_title});
           }
         }

         if (potential_recommendations && potential_recommendations.length>0) {
         
           for (i = 0; i < potential_recommendations.length; i++) {
             resultArray.push({severity: "PR", message: potential_recommendations[i].rule_result.rule_title});
           } 
         }
       
         if (passed && passed.length>0) {
         
           for (i = 0; i < passed.length; i++) {
             resultArray.push({severity: "P", message: passed[i].rule_result.rule_title});
           }
         }

         if (not_applicable && not_applicable.length>0) {
         
           for (i = 0; i < not_applicable.length; i++) {
             resultArray.push({severity: "NA", message: not_applicable[i].rule_result.rule_title});
           }
         }
         
         if (hidden && hidden.length>0) {
             
           for (i = 0; i < hidden.length; i++) {
             resultArray.push({severity: "", message: hidden[i].rule_result.rule_title});
           }
         }
         
         if (warnings && warnings.length>0) {
             
           for (i = 0; i < warnings.length; i++) {
             resultArray.push({severity: "", message: warnings[i].rule_result.rule_title});
           }
         }
         
         return resultArray;
    	 
     },
     /**
      * rebuild
      * 
      * @desc
      * 
      * @param resultArray
      */
     rebuild: function(resultArray){
       this.panelNode.id = "ainspector-side-panel";
       FBTrace.sysout("Inside rebuid panel: ", this.panelNode);
	   SelectorTemplate.tag.replace({object: resultArray}, this.panelNode);
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
      * refresh
      * 
      * @desc
      */
     refresh: function() {
   
	   var root = this.context.window.document.documentElement;
       FBTrace.sysout("navigationSidePanel - refresh()", root);
       this.selection = this.mainPanel.selection;
       //this.rebuild(true);
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

  var SelectorTemplate = domplate(BaseRep, {
    
    // object will be array of elements CSSStyleRule
    tag:
      TABLE({"class": "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0"},
            TH({}, "Results"),
            TH({}, "Message")
          )
        ),  
        TBODY(
          FOR("linkObj", "$object",
            TR({"class": "tableRow a11yFocus", "role": "row"},
              TD({"class": "resultsCol gridCell gridCol", "role": "gridcell", "tabindex": "-1"}, DIV({"class": "gridLabel"},"$linkObj.severity")),
              TD({"class": "messagesCol gridCell gridCol", "role": "gridcell", "tabindex": "-1"}, DIV({"class": "gridLabel"},"$linkObj.message"))
            ) //end TR
          ) 
        ) //end TBODY  
      )
  });

  Firebug.registerPanel(NavigationSidePanel);

}});
