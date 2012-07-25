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

/**
 * @file panel-colorContrast.js
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {
      
  panel : null;
  
  AINSPECTOR_FB.colorContrast = {  
          
    /**
     * @function viewPanel
     * 
     * @desc respond to "ColorContrast" button in the AInspector toolbar
     * 
     * @param {Object} context - 
     * @param {String} panel_name - name of the panel to identify in which panel are we
     * @param {Object} cache_object - container for all the element properties
     * @property {Object} toolbar - place holder for html content to append to the colorcontrast panel
     * @property {Object} cache_object - container for all the element properties
     * @returns
     */
    viewPanel : function(context, panel_name, cache_object) {        
      
     this.addOrRemoveSidePanelsForColrContrast();
     
     if (!panel_name) panel_name = "AInspector";
     if (!cache_object) cache_object = AINSPECTOR_FB.cacheUtil.updateCache();  
    
     panel = context.getPanel(panel_name, true);

     /* Clear the panel before writing anything onto the report*/
     if (panel) {
       clearNode(panel.panelNode);
       clearNode(Firebug.currentContext.getPanel('colorContrastSidePanel').panelNode);
     }

     AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document); 

     var color_contrast_cache = cache_object.dom_cache.color_contrast_cache;
     
     var toolbar = panel.document.createElement("div");
     toolbar.id = "toolbarDiv";

     AINSPECTOR_FB.colorContrast.colorContrastToolbarPlate.toolbar.replace({preferences: AINSPECTOR_FB.preferences}, toolbar, AINSPECTOR_FB.colorContrast.colorContrastToolbarPlate);
     var color_contrast_items = color_contrast_cache.color_contrast_items;
     
     var element = panel.document.createElement("div");
     element.style.display = "block";
      
     panel.panelNode.id = "ainspector-panel"; 
     panel.panelNode.appendChild(toolbar);
     panel.panelNode.appendChild(element);
      
     panel.table = AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate.tag.append( {object: color_contrast_items}, panel.panelNode, AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate);
     panel.selection = color_contrast_items[0];
     
     AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
     Firebug.currentContext.getPanel('colorContrastSidePanel').showContrastOrAllElements(true, panel.selection);
   },
   
   /**
    * @function addOrRemoveSidePanelsForColrContrast()
    * @memberof AINSPECTOR_FB.colorContrst
    * 
    * @desc add rules, style side panels by removing events, attributes and properties side panels
    */
   addOrRemoveSidePanelsForColrContrast : function(){
   
     var panelType_rule = Firebug.getPanelType('rulesSidePanel');
     var panelType_style = Firebug.getPanelType('styleSidePanel');
     var panelType_attributes = Firebug.getPanelType('attributesSidePanel');
     var panelType_properties = Firebug.getPanelType('propertiesSidePanel');
     var panelType_events = Firebug.getPanelType('eventsSidePanel');
     var panelType_colorContrast = Firebug.getPanelType('colorContrastSidePanel');

     if (panelType_rule) {
       AINSPECTOR_FB.rules_registered = panelType_rule;
       AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_rule);     
     }
     
     if (panelType_colorContrast) {
       //nothing
     } else {
       panelType_colorContrast = AINSPECTOR_FB.font_properties_registered;
       AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_colorContrast);
     }
       
     if (panelType_style) {
       // nothing
     } else {
       panelType_style = AINSPECTOR_FB.style_registered;
       AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_style);
     }
    
     if (panelType_attributes) {
      
       AINSPECTOR_FB.attributes_registered = panelType_attributes;
       AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_attributes);
     }
     
     if (panelType_properties) {
    
       AINSPECTOR_FB.properties_registered = panelType_properties;
       AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_properties);
     }

    if (panelType_events) {
     AINSPECTOR_FB.events_registered = panelType_events;
     AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_events);
    }
    
    
    }
  };
    
   /**
    * @function colorContrastToolbarPlate
    * 
    * @desc template creates a Tool bar in ainpector panel 
    */
   AINSPECTOR_FB.colorContrast.colorContrastToolbarPlate = domplate({
   
     toolbar : DIV( {class : "nav-menu"},
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" ),
                SPAN({class: "ruleset_select"}, "Ruleset:  "),
                SPAN({class: "ruleset_value"}, "$preferences.ruleset_id|AINSPECTOR_FB.toolbarUtil.getRulesetTitle"),
                SPAN({class: "ruleset_level"}, " Level:  "),
                SPAN({class: "ruleset_value"}, "$preferences.wcag20_level|AINSPECTOR_FB.toolbarUtil.getLevel")
     ), 
    
     /**
      * @function toHTMLPanel
      * 
      * @desc redirect to the HTML Panel of Firebug
      * 
      * @param event event triggered on a row/cell of a images/media/abbreviation toolbar buttons
      */
     toHTMLPanel: function(event) {

       var table = getChildByClass(event.target.offsetParent, "domTable");
       var node = null;
     
       //row = getChildByClass(event.target.offsetParent, "treeRow");
       var rows = table.rows;
       
       for (var i = 0; i < rows.length; i++) {
         var flag = false;
         var row = rows[i];//tbody.children[i];
         node = row;
         
         for (var k=0; k<row.classList.length;k++) {

           if (row.classList[k] ==  "gridRowSelected") {
             flag = true;
             break;
           }//end if
         }//end for

         if (flag == true) break;
       }
       
       if (node)    node = node.repObject.dom_element.node;

       var panel = Firebug.chrome.selectPanel("html");
       panel.select(node);
     },    
    
     viewContainer : DIV({style : "display:none"})
   });

   AINSPECTOR_FB.colorContrast.colorContrastTreeTemplate = domplate({
   
     tag: TABLE({class: "domTree domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick", "aria-selected" : "true",
           tabindex: "0", onkeypress: "$onKeyPressedRow"},
            THEAD(
              TR({class: "gridHeaderRow", id: "tableTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false", 
               onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader", onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus"},
                
                TH({class: "gridHeaderCell gridCell", id: "colConEleCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Elements")),
                TH({class: "gridHeaderCell gridCell", id: "colConCCRCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "CRR")),
                TH({class: "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Large")),
                TH({class: "gridHeaderCell gridCell", id: "colConBgiCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "Image")),
                TH({class: "gridHeaderCell gridCell", id: "colConColorCol", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({class: "gridHeaderCellBox"}, "WCAG"))
              ) //end TR
            ), //end THEAD
            
            TBODY(
              FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
            )
          ),
    
     row:
       TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level", 
        "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex",
         onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightTreeRow"},
          
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
           TAG("$member.tag", {'member' :"$member", 'object': "$member"}) 
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.color_contrast_ratio|getValue"),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.is_large_font|getValue"),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.background_image|getValue"),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.cc_severity")
        ),
        
     childrow : 
       TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
        "aria-selected" : "$member|$AINSPECTOR_FB.toolbarUtil.getSelectedState", tabindex: "$member|$AINSPECTOR_FB.toolbarUtil.getTabIndex",
        onfocus: "$AINSPECTOR_FB.flatListTemplateUtil.onFocus", onclick: "$highlightTreeRow"},
        
        TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},"$member.to_str")
       ),
    
     strTag : DIV({class: "treeLabel"},"$member.no_of_elements"),
     strTagPass : DIV({class: "passMsgTxt"}, "$member.acc_summary"),
     strTagViolation : DIV({class: "violationMsgTxt"}, "$member.acc_summary"),
     strTagManual : DIV({class: "manualMsgTxt"}, "$member.acc_summary"),
     strTagHidden : DIV({class: "hiddenMsgTxt"}, "$member.acc_summary"),
     strTagRecommendation : DIV({class: "recommendationMsgTxt"}, "$member.acc_summary"),
     strTagInfo : DIV({class: "infoMsgTxt"}, "$member.acc_summary"),
     strTagWarn : DIV({class: "warnMsgTxt"}, "$member.acc_summary"),
      
     loop:
      FOR("member", "$members", TAG("$childrow", {member: "$member"})),

     /**
      * @function getValue
      * 
      * @desc returns empty string if the value property is empty
      * 
      * @param {String} value - input
      */
     getValue : function(value){
            
       if (value != undefined) return value;
       else return "";
     },
     
     /**
      * @function highlightTreeRow
      * 
      * @desc helper function to call highlight
      * 
      * @param {Event} event - even triggered when a row is selected in a panel
      * @property {Object} selection - present selected row info to be passed to the side panel 
      */
     highlightTreeRow : function(event){
                      
       panel.selection = Firebug.getRepObject(event.target);
       AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event);
     },

     /**
      * @function onClick
      * 
      * @desc
      * 
      * @param {Object} event - 
      */
     onClick: function(event) {
                
       if (!isLeftClick(event)) return;

       var row = getAncestorByClass(event.target, "treeRow");
       var label = getAncestorByClass(event.target, "treeLabel");
        
       if (label && hasClass(row, "hasChildren")) this.toggleRow(row);
     },
     
     /**
      * @function memebrIterator
      * 
      * @desc
      * 
      * @param {Object} object -  
      */
     memberIterator: function(object) {
     
       return this.getMembers(object);
     },
          
     /**
      * @function getMembers
      * 
      * @desc
      * 
      * @param {Object}
      * @param {Number} level - 
      */ 
     getMembers: function(object, level) {
            
       if (!level) level = 0;

       var members = [];
        
       for (var p in object) members.push(this.createMember(p, object[p], level));
         return members;
     },

     /**
      * @function createMember
      * 
      * @desc
      * 
      * @param {Number} name -
      * @param {Object} value -
      * @param {Number} level - 
      * 
      */
     createMember: function(name, value, level)  {
        
       if (level != 0) {
         
         var to_str = value.toString(); 
          
         return {
           to_str: to_str
         };
        
       } else {
       
         var cc_severity = value.getColorContrastSeverity();
         var severity_label = cc_severity.label;
         var background_image = value.background_image;
         var color_contrast_ratio = value.color_contrast_ratio;
         var is_large_font = value.is_large_font;

         return {
           no_of_elements: this.getNoOfElements(value), 
           color_contrast_ratio: color_contrast_ratio,
           image: (background_image == "none") ? "No" : "Yes",
           is_large_font: (is_large_font == false) ? "No" : "Yes",
           hasChildren: this.hasChildren(value),
           children: value.dom_text_nodes,
           value: (value != null) ? value : "",
           level: level,
           indent: level * 16,
           tag: this.strTag,
           cc_severity: severity_label
         };
       }
     },
      
     /**
      * @function hasChildren
      * 
      * @desc
      * 
      * @param {Object} object -  
      */
     hasChildren : function(object){
        
       var length = this.getNoOfElements(object);
       
       if (length > 0) return true;
       
       else return false;
        
     },
     
     /**
      * @function getNoOfElements
      * 
      * @desc
      * 
      * @param {Object} object -
      */
     getNoOfElements : function (object) {
     
       if (object.hasOwnProperty("dom_text_nodes")) return object.dom_text_nodes.length;
       
       else return "";
     },
     
     /**
      * @function getAccessibility
      * 
      * @desc
      * 
      * @param {Object} object -
      */
     getAccessibility : function(object){
        
       var severity =  object.getColorContrastSummary().label;
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
     
     /**
      * 
      */
     onKeyPressedTable: function(event) {
        
        switch(event.keyCode) {
        
          case 39: //right
            event.stopPropagation();
            event.preventDefault();
            var label = findNextDown(event.target, this.isTreeRow);
            label.focus();
            break;
        }
      },

      isTreeRow: function(node) {
        return hasClass(node, "treeRow");
      },

      /**
          * @function onKeyPressedRow
          * 
          * @desc
          * 
          * @param {Object} event
          */
          onKeyPressedRow: function(event) {
            event.stopPropagation();
         FBTrace.sysout("event.target: ", event.target);

            switch(event.keyCode) {
              case KeyEvent.DOM_VK_LEFT: //left
                event.preventDefault();
                var row = getAncestorByClass(event.target, "treeRow");
                
                if (hasClass(row, "opened")) { // if open
                  this.closeRow(row); // close
                } else {
                  var table = getAncestorByClass(event.target, "domTable");
                  table.focus(); // focus parent;
                }
                break;
              
              case KeyEvent.DOM_VK_UP: //up
                event.preventDefault();
                var table = getAncestorByClass(event.target, "domTable");

                FBTrace.sysout("table in tree up direction..................: ", table);

                var row = findPrevious(event.target, this.isTreeRow, false);
                FBTrace.sysout("row: ", row);
                if (row) {
                    AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
                } else {    
                  if (event.target.rowIndex == '1') row = table.rows[0];
                }
                row.focus();
                break;
                
              case KeyEvent.DOM_VK_RIGHT: //right
                event.preventDefault();
                var row = getAncestorByClass(event.target, "treeRow");

                if (hasClass(row, "hasChildren")) this.openRow(row);
                break;
                
              case KeyEvent.DOM_VK_DOWN: //down
                event.preventDefault();
                var table = getAncestorByClass(event.target, "domTable");

                FBTrace.sysout("table in tree: ", table);
                var row = findNext(event.target, this.isTreeRow, false);
                FBTrace.sysout("row: ", row);

                if (row) row.focus();

                //If the event is fired on header row, rowIndex check is made to make sure header row is not highlight.
                if (!event.target.rowIndex == '0') AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
                break;
                
              case KeyEvent.DOM_VK_ENTER: //Enter
                event.preventDefault();
                var links = event.target.getElementsByClassName('objectLink');
              
                if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'click');
                  break;
            }
          },
      onFocus: function(event) {
        //var links = event.target.getElementsByClassName('objectLink');
        
       // if (links[0]) AINSPECTOR.util.event.dispatchMouseEvent(links[0], 'mouseover');
      },

      closeRow: function(row) {
        
        if (hasClass(row, "opened")) {
          var level = parseInt(row.getAttribute("level"));
          removeClass(row, "opened");
          var tbody = row.parentNode;
        
          for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling) {
            
            if (parseInt(firstRow.getAttribute("level")) <= level) break;
            tbody.removeChild(firstRow);
          }
        }
      },

      openRow: function(row) {
        
        if (!hasClass(row, "opened")) {
          var level = parseInt(row.getAttribute("level"));
          setClass(row, "opened");
          var repObject = row.newObject;
          
          FBTrace.sysout("repObject: ", repObject);
          if (repObject) {
            var members = this.getMembers(repObject.children, level+1);
            
            if (members) this.loop.insertRows({members: members}, row);
          }
        }
      },
      
      /**
       * @function toggleRow
       * 
       * @desc
       * 
       * @param {Object} row - row tp toggle
       */
      toggleRow: function(row) {

        if (hasClass(row, "opened")) {
          this.closeRow(row);
        } else {
          this.openRow(row);
        }
      },

      /**
       * @function onClick_htmlView
       */
      onClick_htmlView: function(event) {
        var head_landmark = event.target.headLandElement.value;
        var node = head_landmark.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);  
      }
      
    });
  }

