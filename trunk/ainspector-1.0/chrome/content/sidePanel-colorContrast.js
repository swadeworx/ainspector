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
  var side_panel_name = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.name");
  var side_panel_title = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.title");
  
  /**
   * @function colorContrastSidePanel displaying Rule results for the current selected 
   * row in the Navigation button,
   */
  function colorContrastSidePanel() {}
  
  colorContrastSidePanel.prototype = extend(Firebug.Panel, {
    
    name: side_panel_name,
    parentPanel: main_panel,
    title: side_panel_title,
    order: 2,
    editable: true,

    /**
     * @constructor initialize
     *
     * @desc  
     *
     * @param {Object} context 
     * @param {Object} doc - document Object
     */
    initialize: function(context, doc) {
       
      this.onKeyPress = bind(this.onKeyPress, this);
      this.onCLick = bind(this.setSelection, this);
      
      Firebug.Panel.initialize.apply(this, arguments);
    },

    /**
     * @constructor initializeNode
     * 
     * @desc
     * 
     * @param  oldPanelNode
     */
    initializeNode: function(oldPanelNode) {

      appendStylesheet(this.panelNode.ownerDocument, "chrome://selectbug/skin/selectbug.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector-side-panel.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/userinterface.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/fonts-min.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/tabview.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/ainspector.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/allyGrade.css");
      appendStylesheet(this.panelNode.ownerDocument, "chrome://firebug-a11y/content/css/grid.css");

      this.setSelection = bind(this.setSelection, this);
      this.onKeyPress = bind(this.onKeyPress, this);

      this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.addEventListener("keypress", this.onKeyPress, true);
      
      Firebug.Panel.initializeNode.apply(this, arguments);
   
    },
    
    /**
     * @function onKeyPress
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
      } //end for
      
      if (event.keyCode == KeyEvent.DOM_VK_UP) {
      
        result = previous_row.repObject.dom_element;
        rule_result_array = this.showOnRuleResultsTabSelect(result);
        
        if (rule_result_array.length > 0) this.rebuild(rule_result_array);
      
      } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
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
     
    /**
     * @function destroyNode
     * 
     * @desc removes the listeners from the main panel
     * called by Firebug Framework 
     */
    destroyNode: function() {
   
      this.mainPanel.panelNode.removeEventListener("click", this.setSelection, false);
      this.mainPanel.panelNode.removeEventListener("keypress", this.onKeyPress, false);
      
      Firebug.Panel.destroyNode.apply(this, arguments);
    },

    /**
     * @function show
     * 
     * @desc 
     * called by Firebug Framework
     */
    show: function() {
     
      Firebug.Panel.show.apply(this, arguments);

    },
     
    /**
     * @function updateSelection
     * 
     * @desc
     */
    /*updateSelection : function() {
    
      var selection = this.mainPanel.selection;
      var dom_element = selection.dom_element; 
      
      if (dom_element)
       this.rebuild(this.showOnRuleResultsTabSelect(dom_element), dom_element);
      else if (selection.value)
       this.rebuild(this.showOnRuleResultsTabSelect(selection.value.dom_element), dom_element);
      else return;
    },*/
     
     /**
      * @function sView
      * 
      * @param {Boolean} state
      * @param {Object} first_element
      */
    sView: function(state, first_element){
    
      if (state) {
      
        try {
        
          if (first_element.hasOwnProperty("dom_element")) result = first_element.dom_element;
         
          else result = first_element;
          
          rule_result_array = this.showOnRuleResultsTabSelect(result);

          //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
          this.rebuild(rule_result_array, result);
        } catch (er) {
        }
      } else {
      
        if (first_element == "none") this.rebuild("");   
      }
     
    },
     
    /**
     * @function showContrastOrAllElements
     * 
     * @desc
     * 
     * @param {Boolean} state
     * @param {Object} element
     */
    showContrastOrAllElements: function(state, element){
    
      if (state) {
      
        try {
        
          rule_result_array = this.showOnRuleResultsTabSelect(element);
          
          //if (rule_result_array.length > 0) this.rebuild(rule_result_array);
          this.rebuild(rule_result_array, element);
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
      
        if (element.dom_element) this.rebuild(this.showOnRuleResultsTabSelect(element.dom_element), element.dom_element);
       
//      else if (element.value.dom_element) this.rebuild(this.showOnRuleResultsTabSelect(element.value.dom_element));
//      else if (element.value) this.rebuild(this.showOnRuleResultsTabSelect(element.value)); //for colorcontrast
       
        else this.rebuild(this.showOnRuleResultsTabSelect(element), element);
       
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
      var properties = cache_item.getStyle();
      
      var rule_result_array = new Array();
      var label = null;
      
      for(var i=0; i<properties.length; i++){
        var label = properties[i].label;
        if (label == 'color_contrast_ratio') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.CRR");
        else if (label == 'color') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.color");
        else if (label == 'background-color') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.backgroundColor");
        else if (label == 'font-size') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.fontSize");
        else if (label == 'font-weight') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.fontWeight");
        else if (label == 'font-family') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.fontFamily");
        else if (label === 'background-image') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.backgroundImage");
        else if (label === 'background_repeat') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.backgroundRepeat");
        else if (label === 'background_position') label = AINSPECTOR_FB.ainspectorUtil.$AI_STR("ainspector.sidepanel.font.backgroundPosition");
        else label = null;
        
        if (label) rule_result_array.push({"label": label, "value": properties[i].value});
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
    rebuild: function(resultArray, cache_item) {
    
      this.panelNode.id = "ainspector-side-panel";
      var flag = true;
      
      if (cache_item) {      
        if (cache_item.dom_text_nodes) {
          cache_item = cache_item.dom_text_nodes[0];
        } 
      }        
      
      fontPropertiesPlate.tag.replace({object: resultArray, item:cache_item}, this.panelNode);
      
      var panel = Firebug.currentContext.getPanel();
      var buttons = this.panelNode.getElementsByTagName("button");
      if (cache_item.dom_text_nodes.length > 0) buttons[0].disabled = true;
//      FBTrace.sysout("AINSPECTOR_FB.sidePanelColorContrast.rebuild() - button:" , buttons.getElementById("element_info_button"));
//      FBTrace.sysout("AINSPECTOR_FB.sidePanelColorContrast.rebuild() - ", panel.document.getElementById("element_info_button"));
     
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

  var fontPropertiesPlate = domplate(BaseRep, {
    
    tag:
      DIV({class:"font-props-side-panel"},
        TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
          TBODY(
            FOR("obj", "$object",
              TR({class: "tableRow a11yFocus", role: "row"},
                TD({class: "fontProperty gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.label")),
                TD({class: "gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.value"))
              ) //end TR
            ) 
          ) //end TBODY  
        ),
        BR(),
        DIV({class: "colorcontrast-button"},
            BUTTON({onclick: "$getElementInformation", id: "element-info-button"}, "Element Information"),
            BUTTON({onclick: "$showMoreProperties", style: "margin: 0.5em;"}, "Rule Information")
        )//,
//        DIV({class: "sampleText-div"}, "Font Sample"),
//        DIV({class: "sampleText", id: "fontSample1", name:"font Sample", style:"$item|getStyle"}, "$item|getSampleText")
       ),
       
       getStyle : function(cache_item) {
         
         var computed_style = cache_item.computed_style;
         var text_node_style = null;
         
         var color = "color: " + computed_style.color + "; ";
         var background_color    = "background-color: " + computed_style.background_color_hex + "; " ;
         var background_image    = "background-image: " + computed_style.background_image + "; ";
         var background_repeat   = "background-repeat: " + computed_style.background_repeat + "; " ;
         var background_position = "background-position: " + computed_style.background_position + "; ";
         var font_weight         = "font-weight: " + computed_style.font_weight+ "; ";
         var font_size           =  "font-size: " +  computed_style.font_size + ";";
         
         text_node_style = color+background_color+background_image+background_repeat+background_position+font_weight+font_size;
         FBTrace.sysout("text_node_style: ", text_node_style);
         return text_node_style;
       },
       
       /**
        * @function getSampleText
        */
       getSampleText : function(cache_item) {
         
         var sample_text = cache_item.getText();

         return sample_text;
       },
       
       /**
        * @function showMoreProperties
        * 
        * @desc respond to "Rule Information" button
        *
        * @param {Object} event - event triggered when clicked on "More Information on Rule" button
        */
       showMoreProperties : function(event) {

         var panel = Firebug.currentContext.getPanel("AInspector");
         var div_table = getChildByClass(panel.table, "table-scrollable");
         var table = getChildByClass(div_table, "domTable");
         var tbody = table.children[1];
         var rows = tbody.children;
         var row;
         var flag = false;
         
         for (var i=0; i<=rows.length; i++) {
           
           var class_list = rows[i].classList;
           
           for (var j=0; j<class_list.length; j++) {
             
             if (class_list[j] == "gridRowSelected") {
               flag = true;
               break;
             }
           }
           
           if (flag == true) {
             row = rows[i];
             break;
           }
         }

         window.openDialog("chrome://firebug-a11y/content/rule_properties/rule-properties.xul", "_rule_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject.rule_result); 
       },
       
       getElementInformation : function(event) {
         
       
         var panel = Firebug.currentContext.getPanel("AInspector");

//         var tree = getChildByClass(panel.table, "main-panel");
         
         var sub_div = getChildByClass(panel.table, "table-scrollable");
         var table = getChildByClass(sub_div, "domTable");
         FBTrace.sysout("tble", table );
         var tbody = table.children[1];
         
         var rows = tbody.children;
         var row;
         var flag = false;
         
         for (var i=0; i<=rows.length; i++) {
           
           var class_list = rows[i].classList;
           
           for (var j=0; j<class_list.length; j++) {
             
             if (class_list[j] == "gridRowSelected") {

               flag = true;
               break;
             }
           }
           
           if (flag == true) {
             
             row = rows[i];
             break;
           }
         }

//         FBTrace.sysout("row: ", row.repObject);
         window.openDialog("chrome://firebug-a11y/content/item_properties/cache-item-properties.xul", "cache_item_properties_dialog", "chrome,contentscreen,resizable=yes", row.repObject);
      
       }
  });
  
  Firebug.registerPanel(colorContrastSidePanel);

}});
