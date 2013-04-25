/**
 * Copyright 2013 University Of Illinois
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
define([
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "firebug/lib/dom",
    "firebug/lib/css",
    "firebug/lib/events",
  ],
  
  function (FBTrace, Locale, Domplate, Dom, Css, Events) {
  
    var SidePanelUtil = {
      
      elements_registered : null,
      ruleInfo_registered : null,
      ruleResults_registered : null,
      attributes_registered : null,
      properties_registered : null,
      style_registered : null,
      events_registered : null,
      
      /**
       * @function addAndRemoveSidePanels
       * @desc registers side panels according to the toolbar buttons selected
       *   like for 'Images' toolabr button on A11y Panel - 'Rule Results' side panel is registered
       *   like for 'Color Contrast' toolabr button on A11y Panel - 'Font Properties' side panel is registered
       *   
       * @param {Boolean} flag - a boolean value to check which toolbar button has to have the respective side panels
       */  
      addAndRemoveSidePanels : function(category) {
      
        var panelType_elements = Firebug.getPanelType("elements");
        var panelType_ruleInfo = Firebug.getPanelType("ruleInfo");
        var panelType_ruleResults = Firebug.getPanelType("ruleResults");
        var panelType_attributes = Firebug.getPanelType("attributes");
        var panelType_properties = Firebug.getPanelType("properties");
        var panelType_style = Firebug.getPanelType("style");
        var panelType_events = Firebug.getPanelType("events");
        
        if (category) {
          
          if (panelType_elements) {
            this.elements_registered = panelType_elements;
            this.onRemoveSidePanel(panelType_elements);
          }
          if (panelType_ruleInfo) {
            this.ruleInfo_registered = panelType_ruleInfo;
            this.onRemoveSidePanel(panelType_ruleInfo);
          }
          if (!panelType_ruleResults) {
            panelType_ruleResults = this.ruleResults_registered;
            this.onAppendSidePanel(panelType_ruleResults);
          }
          if (!panelType_attributes) {
            panelType_attributes = this.attributes_registered;
            this.onAppendSidePanel(panelType_attributes);
          }
          if (!panelType_properties) {
            panelType_properties = this.properties_registered;
            this.onAppendSidePanel(panelType_properties);
          }
          if (!panelType_style) {
            panelType_style = this.style_registered;
            this.onAppendSidePanel(panelType_style);
          }
          if (!panelType_events) {
            panelType_events = this.events_registered;
            this.onAppendSidePanel(panelType_events);
          }
          
        } else {
          
          if (panelType_ruleResults) {
            this.ruleResults_registered = panelType_ruleResults;
            this.onRemoveSidePanel(panelType_ruleResults);
          }
          if (panelType_attributes) {
            this.attributes_registered = panelType_attributes;
            this.onRemoveSidePanel(panelType_attributes);
          }
          if (panelType_properties) {
            this.properties_registered = panelType_properties;
            this.onRemoveSidePanel(panelType_properties);
          }
          if (panelType_style) {
            this.style_registered = panelType_style;
            this.onRemoveSidePanel(panelType_style);
          }
          if (panelType_events) {
            this.events_registered = panelType_events;
            this.onRemoveSidePanel(panelType_events);
          }
          if (!panelType_elements) {
            panelType_elements = this.elements_registered;
            this.onAppendSidePanel(panelType_elements);
          }
          
          if (!panelType_ruleInfo) {
            panelType_ruleInfo = this.ruleInfo_registered;
            this.onAppendSidePanel(panelType_ruleInfo);
          }
        }
        
      },
      
      /**
       * @function onAppendSidePanel
       * 
       * @desc add/registers sidePanal from any main panel depending on panelType
       * 
       *  @param {Object} panelType - registered Panel 
       */ 
      onAppendSidePanel : function(panelType) {
        
        Firebug.registerPanel(panelType);
      },
      
      /**
       * @function onRemoveSidePanel
       * 
       * @desc removes/unregisters sidePanal from any main panel depending on panelType
       * 
       *  @param {Object} panelType - type of the Panel  
       */
      onRemoveSidePanel : function(panelType) {
        
        Firebug.unregisterPanel(panelType);
      }
    }//end sidePaenlUtil object
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
    Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-sidepanels.css");


    with(Domplate){
      
      SidePanelUtil.ruleResultsTemplate = domplate({
        
        tag:
          DIV({class: "side-panel"},
              DIV({class: "eval-results"}, "Evaluation Results By Rule"),
              DIV({class: "element-select"}, "$element"),
              TABLE({class: "domTable domTree ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
               THEAD(
                TR({class: "gridHeaderRow", id: "tableTableHeader", "role": "row", tabindex: "-1", "aria-selected" : "false"},
                  TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result/Property")),
                  TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Message/Value"))
                ) //end TR
              ), //end THEAD
              TBODY(
                FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
              ) //end TBODY
            )
          ),
          
          row: 
            TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", _newObject: "$member", _repObject: "$member.value", level: "$member.level"},
              TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
                TAG("$member.tag", {'member' :"$member", 'object': "$member"}) 
              ),
              TD({class: "memberLabelCell styleAction"}, "$member.action")
            ),
            
          childrow :
            
            TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
             onclick: "$highlightRow"},
              TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
              "$member.propertyLabel"
              ),
              TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.propertyValue")
            ),
            
          strTagPass : DIV({class: "treeLabel passMsgTxt"}, "$member.label"),
          strTagViolation : DIV({class: "treeLabel violationMsgTxt"}, "$member.label"),
          strTagManual : DIV({class: "treeLabel manualMsgTxt"}, "$member.label"),
          strTagHidden : DIV({class: "treeLabel hiddenMsgTxt"}, "$member.label"),
          strTagRecommendation : DIV({class: "treeLabel recommendationMsgTxt"}, "$member.label"),
          strTagInfo : DIV({class: "treeLabel infoMsgTxt"}, "$member.label"),
          strTagWarn : DIV({class: "treeLabel warnMsgTxt"}, "$member.label"),
          
          stylePropTag: DIV({class: "styleLabel"}, "none"),
            
          loop:
            FOR("member", "$members", TAG("$childrow", {member: "$member"})),

          /**
           *
           * @function onClick
           */
           onClick: function(event) {
                 
             if (!Events.isLeftClick(event)) return;

             var row = Dom.getAncestorByClass(event.target, "treeRow");
             var label = Dom.getAncestorByClass(event.target, "treeLabel");
           
             if (label && Css.hasClass(row, "hasChildren")) this.toggleRow(row);
           },
           
           /**
            * @function memberIterator
            * 
            * @desc invokes getMembers function to iterate through the rule results
            * 
            * @param {Object} object -
            */
           memberIterator: function(object) {
             return this.getMembers(object);
           },
             
           /**
            * @function getMembers
            * 
            * @desc iterates through the rule results
            * 
            * @param {Object} object -
            * @param {Number} level  - 
            */
           getMembers: function(object, level) {
               
             var members = [];
           
             if (!level) level = 0;

             for (var p in object) members.push(this.createMember(p, object[p], level));
             
             return members;
           },
          
           /**
            * @function createMember
            * 
            * @desc creates the object to setup
            */
           createMember: function(name, value, level)  {
             
             if (level !=0) { //if it is child
                 
               return {
                 propertyLabel:value.label,
                 propertyValue:value.value,
                 value: (value != null) ? value : "",
                 level: level,
                 indent: level * 16

               };
             } else {
//               FBTrace.sysout("value.label:"+ value.getMessage());

             }
             return {
               label: value.getResultValue(),  
               action: value.getResultMessage(),
                 
               hasChildren: this.hasChildren(value),
               children: value.getResultProperties(),
               value: (value != null) ? value : "",
               level: level,
               indent: level * 16,
               tag: this.getAccessibility(value)
             };
           },
           
           hasChildren : function(object){
            
             var properties = object.getResultProperties();
             
             var length = properties.length;
             
             if (length > 0) return true;
             
             else return false;
           
           },
           
           getNoOfElements : function (object) {
            
             if (object.hasOwnProperty("dom_text_nodes")) return object.dom_text_nodes.length;
             
             else return "";
           },
           
           /**
            * @function getAccessiblity
            * 
            * @desc changes the color according to the severity
            * 
            * @param {Object}  
            */
           getAccessibility : function(object){
           
             var severity =  object.getResultValue();
             
             if (severity == "Pass")  return this.strTagPass;
           
             if (severity == "Violation") return this.strTagViolation;
           
             if (severity == "Manual Check") return this.strTagManual;
           
             if (severity == "Hidden") return this.strTagHidden;
           
             if (severity == "Recommendation") return this.strTagRecommendation;
           
             if (severity == "Information") return this.strTagInfo;
           
             if (severity == "Warning") return this.strTagWarn;
           
           },

           /**
            * @function closeRow
            */
           closeRow: function(row) {
         
             if (Css.hasClass(row, "opened")) {
               var level = parseInt(row.getAttribute("level"));
               
               Css.removeClass(row, "opened");
               
               var tbody = row.parentNode;
             
               for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling) {
               
                 if (parseInt(firstRow.getAttribute("level")) <= level) break;
                 tbody.removeChild(firstRow);
               }
             }
           },
          
           /**
            * @function openRow
            */
           openRow: function(row) {
         
             if (!Css.hasClass(row, "opened")) {
               var level = parseInt(row.getAttribute("level"));
               Css.setClass(row, "opened");
               var repObject = row.newObject;

               if (repObject) {
                 var members = this.getMembers(repObject.children, level+1);
             
                 if (members) this.loop.insertRows({members: members}, row);
             }
           }
         },
         
         /**
          * @function toggleRow
          */
         toggleRow: function(row) {
           
           if (Css.hasClass(row, "opened")) {
             this.closeRow(row);
           } else {
             this.openRow(row);
           }
         },
         
         /**
          * @function getPropertyStyle
          */
         getPropertyStyle : function(property) {
           
           if (property == undefined || property == null) return this.stylePropTag;
           
           else return property;
         },
         
        setSelection : function(event, parentNode, sidePanelName) {
         
          var cache_item = Firebug.getRepObject(event.target);
          
//          if (FBTrace.DBG_AINSPECTOR)
            FBTrace.sysout("cache_item: ", cache_item);
          
          if (!cache_item) return;
          
          try {
//            if (cache_item.dom_element) this.rebuild(this.showSelection(cache_item.dom_element), parentNode, sidePanelName);
//            else this.rebuild(this.showSelection(cache_item), parentNode, sidePanelName);
        	  this.rebuild(cache_item.node_results, parentNode, sidePanelName);
          } catch(e){
            
          }
        },
        
        rebuild : function(node_results, parentNode, sidePanelName){
          
          parentNode.id = "ainspector-side-panel";
//          var cache_item = results.cache_item;
//          var element = "Element" + cache_item.document_order + ": " + cache_item.toString();
//          if (results.rule_result_array.length > 0) {
//            this.tag.replace({object: results.rule_result_array, element: element}, parentNode);
//          } else {
//            SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: sidePanelName}, parentNode);
//          }
          if (node_results.length > 0) {
            this.tag.replace({object: node_results, element: ""}, parentNode);
          } else {
            SidePanelUtil.commonTemplate.emptyTag.replace({sidePanel: sidePanelName}, parentNode);
          }
        }, 
        
        showSelection : function(cache_item) {
          
          var node_results = cache_item.node_results;
          var rule_result_array = new Array();

          if (node_results.length >0) {
            for (var i=0; i<node_results.length; i++) {
              rule_result_array.push(node_results[i]);
            }
          }
          
          var result_obj = {
              cache_item : cache_item.cache_item,
              rule_result_array : rule_result_array
          };
          
          return result_obj;
        }
      });
      Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
      Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
      Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-sidepanels.css")

      SidePanelUtil.commonTemplate = domplate({
        
        tag:
          DIV({class: "side-panel"},
            DIV({class: "element-select", style: "color: black; font-weight: bold;"}, "HTML and ARIA Attributes"),
            DIV({class: "element-select"}, "HTML and ARIA attributes that are defined in markup or that have been added through scripting, that are important to accessibility of the selected item. "),
              TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
                THEAD(
                  TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
                    FOR("header", "$headers",
                     TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, DIV({class: "gridHeaderCellBox"}, "$header")))
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
            ),
            
          shortTag:
            DIV({class: "side-panel"},
              DIV({class: "element-select", style: "color: black; font-weight: bold;"}, "HTML and ARIA Attributes"),
              DIV({class: "element-select"}, "HTML and ARIA attributes that are defined in markup or that have been added through scripting, that are important to accessibility of the selected item. "),
              TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
                THEAD(
                  TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
                    FOR("header", "$headers",
                      TH({class: "gridHeaderCell gridCell", id: "ruleMessageCol"}, DIV({class: "gridHeaderCellBox"}, "$header"))
                    )
                  )
                ),  
                TBODY(
                  FOR("obj", "$object",
                    TR({class: "tableRow a11yFocus", role: "row"},
                      TD({class: "resultsCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.event")),
                      TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.element")),
                      TD({class: "messagesCol gridCell gridCol", role: "gridcell", tabindex: "-1"}, DIV({class: "gridLabel"},"$obj.ancestor"))
                    ) //end TR
                  )   
                ) //end TBODY  
              )
            ),
            
            selectTag:
              DIV({class: "element-select", style:"color:gray;"}, "$message"),
              
            emptyTag:  
              DIV({class: "element-select", style:"color:gray;"}, 
                 Locale.$STR("ainspector.sidepanel.noprops") + " '" + "$sidePanel" + "'"
             ),
             
            noResultsTag:
               DIV({class: "element-select", style:"color:gray;"}, 
             	   Locale.$STR("ainspector.sidepanel.noRuleprops")
             ),  
            
            /**
             * @function setSelection
             * 
             * @desc
             * 
             * @param event
             */
            setSelection: function(event, parentNode, headers, type) {
          
              var object = Firebug.getRepObject(event.target);
              var cache_item;
//              if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("cache_object in setSelection: ", object);
              if (object.cache_item_result) cache_item = object.cache_item_result.cache_item
              var results = this.getResults(cache_item, type); 
              
              if (results.length > 0) this.rebuild(results, headers, parentNode, type);
              
              else this.emptyTag.replace({sidePanel: type}, parentNode);
            },
            
            onKeyPressOld : function(event, parentNode, headers, type) {
              
              FBTrace.sysout("AInspector; AttributesSidePanel.onKeyPress: ", event);
              var all_rows = event.target.rows ? event.target.rows : event.target.offsetParent.rows;
              
              var key = event.keyCode;     
              var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
              var backward = key == KeyEvent.DOM_VK_LEFT || key == KeyEvent.DOM_VK_UP; 
              
              var object;
              for (var i=0; i < all_rows.length; i++) {
                if (Css.hasClass(all_rows[i], "gridRowSelected")) {
                  object = forward ? all_rows[i+1].repObject : all_rows[i-1].repObject; 
                  FBTrace.sysout("================object=============", object);
                  SidePanelUtil.ruleResultsTemplate.rebuild(object.node_results, this.panelNode, panelName);
                  break;
                }
              }
              
              var cache_item;
//            if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("cache_object in setSelection: ", object);
              if (object.cache_item_result) cache_item = object.cache_item_result.cache_item
              var results = this.getResults(cache_item, type); 
            
              if (results.length > 0) this.rebuild(results, headers, parentNode, type);
            
              else this.emptyTag.replace({sidePanel: type}, parentNode);
            },
            
            /**
             * @function onKeyPress
             * 
             * @desc
             * 
             * @param event
             */
            onKeyPress: function(event, parentNode, headers, type) {
            
              var current_row;
              var next_row;
              var previous_row;
              var prev_cell;
              var next_cell;
              
              var table_rows = event.target.offsetParent.rows;

              if (!table_rows) return;
              
              var no_of_rows = table_rows.length;
              var flag = false;
              var is_header_row = false;
              
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
                   
                    previous_row = table_rows[row-1];
                   
                    next_row = table_rows[row+1];
                  
                  } else { //if we reach end of the table row then go back to first row
                    next_row = table_rows[1]; //table_rows[0] is the header row
                    previous_row = table_rows[row-1];
                  }
                  
                  break;
                } else {
                  continue;
                }
              } //end for
              
              var rule_result_objet = null;
              var rule = null;
              var result;
              var cache_item;
              
              if (event.keyCode == KeyEvent.DOM_VK_UP) {
              
                result = previous_row.repObject;
//                this.updateSelection(result, this.panelNode); 
                
                
                if (result.cache_item_result) cache_item = result.cache_item_result.cache_item
                var results = this.getResults(cache_item, type); 
                
                if (results.length > 0) this.rebuild(results, headers, parentNode, type);
                
                else this.emptyTag.replace({sidePanel: type}, parentNode);
                
              } else if (event.keyCode == KeyEvent.DOM_VK_DOWN) {
                
                result = next_row.repObject;
                
//                this.updateSelection(result, this.panelNode);
               
                if (result.cache_item_result) cache_item = result.cache_item_result.cache_item
                var results = this.getResults(cache_item, type); 
                
                if (results.length > 0) this.rebuild(results, headers, parentNode, type);
                
                else this.emptyTag.replace({sidePanel: type}, parentNode);
                
              } else if (event.keyCode == KeyEvent.DOM_VK_LEFT) {
                this.setSelection(event, parentNode, headers, type);
             
              } else if (event.keyCode == KeyEvent.DOM_VK_RIGHT) {
                this.setSelection(event, parentNode, headers, type);
             
              } else if (event.keyCode == KeyEvent.DOM_VK_BACK_SPACE){
             
                this.deleteNode("node", "up");

              } else if (event.keyCode == KeyEvent.DOM_VK_DELETE) {
                this.deleteNode("node", "down");
               
              } else {
                return;
              }     
            },
            
            /**
             * @function getResults
             * 
             * @desc
             * 
             * @param {Object} cache_item
             */
            getResults : function(cache_item, type) {
              var properties = null;
              
              if (type == 'attributes')     properties = cache_item.getAttributes();
              else if (type == 'style')     properties = cache_item.getStyle();
              else if (type == 'events')    properties = cache_item.getEvents();
              else if (type == 'properties') properties = cache_item.getCacheProperties();
              else properties = '';
              var rule_result_array = new Array();
              for(var i=0; i<properties.length; i++){
                if (type == "events"){
                  rule_result_array.push({"event": properties[i].label, "element": properties[i].event_on_element, "ancestor": properties[i].event_on_ancestor});
                } else {
                  rule_result_array.push({"label": properties[i].label, "value": properties[i].value});  
                }
                
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
            rebuild: function(resultArray, headers, parentNode, type){
              
              parentNode.id = "ainspector-side-panel";
              
              if (resultArray && resultArray.length > 0) {
                if (type == "events") 
                  this.shortTag.replace({object: resultArray, headers: headers}, parentNode);
                else
                this.tag.replace({object: resultArray, headers: headers}, parentNode);
              } 
            }
            
        });
    }
    return SidePanelUtil;
});