/**
 * Copyright 2012 University Of Illinois
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

var EXPORTED_SYMBOLS = ["OAA_WEB_ACCESSIBILITY"]; //Export items from module and inject them into the import scope

var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
Components.utils.import("resource://gre/modules/PluralForm.jsm");

var Node = Node || {
  ELEMENT_NODE    :  1,
  ATTRIBUTE_NODE  :  2,
  TEXT_NODE       :  3
}


/** 
 * @namespace OAA_WEB_ACCESSIBILITY
 */

var OAA_WEB_ACCESSIBILITY  = OAA_WEB_ACCESSIBILITY || {};

/** 
 * @namespace OAA_WEB_ACCESSIBILITY.util
 */

OAA_WEB_ACCESSIBILITY.util = OAA_WEB_ACCESSIBILITY.util || {};

/* ---------------------------------------------------------------- */
/*                      Highlight Module                            */ 
/* ---------------------------------------------------------------- */

/** 
 * @namespace OAA_WEB_ACCESSIBILITY.util.highlightModule
 */

OAA_WEB_ACCESSIBILITY.util.highlightModule = {
  
//  last_highlighted_nodes: [],
  document: null,

  /**
   * @function initHighlight
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
   * @desc Initialize highlight module
   *
   * @param {Object}  document  - Document object model of the browser view to highlight
   */
   initHighlight : function (document) {
  
     this.document = document;
  
   }, 

  /**
   * @function highlightCacheItems
   *
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
   * @desc highlights set of nodes selected on a page
   *
   * @param {Array}   items     - An array of OAA cache items to highlight
   */
   highlightCacheItems : function (items) {
   
	 console.logStringMessage("items.length: " + items.length);  
     
       this.removeHighlight(); 

     if (!items || typeof items.length == 'undefined') return;
    
     var node = null;
     var items_len = items.length;
     var style;
     var tag_name;
     var off_screen_elements = [];
     
     for (var i = 0; i < items_len; i++) {
       
       var item = items[i];
       if (item.cache_item) item = item.cache_item;
       
       if (item.dom_element) {  // item is a cache element object
    
         if (item.dom_element.image_only) {
           node = item.dom_element.node.getElementsByTagName("img")[0];
         }
         else {
           node = item.dom_element.node;
         }
         style = item.dom_element.computed_style;
         tag_name = item.dom_element.tag_name;
       }
       else { 
         // If item is a dom element object or text node object
         switch (item.type) {
        
           case Node.ELEMENT_NODE:
             node = item.node;
             style = item.computed_style;
             tag_name = item.tag_name;
             break;
          
           case Node.TEXT_NODE:
             
             if (item.parent_element) {
               node = item.parent_element.node;        
               style = item.parent_element.computed_style;
               tag_name = item.parent_element.tag_name;
             }  
             break;
        
           default: 
             break;
         }
     
       }

       if (node) {

//       check if the node is off screen or hidden from assistive technologies
         if (style.visibility == "hidden" || style.display == "none") {
           off_screen_elements.push(item);
           
         } else {
           this.insertDIV(item, node, tag_name);
         }
       }
     } //end for
     
     if (off_screen_elements.length > 0) this.isVisibletoAT(off_screen_elements);
   },
  
   /**
    * @function removeHighlight
    * 
    * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
    * 
    * @desc unhighlights the nodes that are highlighted earlier and 
    *       removes the informational message added to a page if the 
    *       element is hidden from Assistive technologies
    */
   removeHighlight : function() {

//     if (!this.last_highlighted_nodes || !this.document) return;
	   if (!this.document) return;
//     var length = this.last_highlighted_nodes.length;
     
     
       
	   var elements = this.document.getElementsByClassName('oaa_web_accessibility_highlight');
//       var obj = this.document.getElementById("oaa_web_accessibility_highlight_id");
	   for (var i=0; i <elements.length; i++) { 

		 if (elements[i] && elements[i].hasChildNodes()) {
         
           /*if (elements[i].innerHTML == 'Element is off-screen or hidden from assistive technologies') {
            
             this.document.body.removeChild(elements[i]);
           
             continue;
           }*/
         
         var parent_node = elements[i].parentNode;
         while(elements[i].firstChild) {
           parent_node.insertBefore(elements[i].firstChild, elements[i]);
         }

         parent_node.removeChild(elements[i]);
       } else {
         if (elements[i]) this.document.removeChild(elements[i]);
       }
     }
	   
	 var off_screen_elements = this.document.getElementsByClassName('oaa_web_accessibility_off_screen');

	 for (var i = 0; i < off_screen_elements.length; i++) {
//	   this.last_highlighted_nodes.splice(i, length);
	   if (off_screen_elements[i]) this.document.body.removeChild(off_screen_elements[i]);	   
     }

   },
  
  /**
   * @function isVisibletoAT
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
   * @desc Position a div on the left side of the view port 
   * 
   * @param {Object} item
   */
  isVisibletoAT : function (offScreen_elements) {

    if (!this.document) return;
    
    var new_div_element = this.document.createElement('div');
    var style_div = 'width:500px; padding:10px; border:3px solid grey; margin:0px; background-color: white; color:red; font-size:15px; position:fixed; ';
    
    new_div_element.id = 'oaa_web_accessibility_off_screen_id';
    new_div_element.setAttribute("class", 'oaa_web_accessibility_off_screen');
    new_div_element.setAttribute("style", style_div);

    this.document.body.insertBefore(new_div_element,this.document.body.childNodes[0]);
    
    var div_added = this.document.getElementById('oaa_web_accessibility_off_screen_id');
    var newUL = this.document.createElement("ol");
    var text_node = this.document.createTextNode("Elements that are off-screen or hidden from assistive technologies:");
    newUL.appendChild(text_node);
    div_added.appendChild(newUL);

    for (var i=0; i < offScreen_elements.length; i++) {
      
      var offScreen_element = 	offScreen_elements[i];
      var data = offScreen_element.toString() + ' (' + this.setTitle(offScreen_element) + ' )';

      var newLI = this.document.createElement("li");  
      var newText = this.document.createTextNode(data);
      
      newLI.setAttribute("style", "margin-left:15px; padding-left:10px; ");
      newLI.appendChild(newText);
      newUL.appendChild(newLI);
      
    }
    
  },
  
  /**
   * @function insertDIV
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   * 
   * @desc position the DIV 
   *   1. as only child of elements that can have content (e.g., p, h1, h2, li...)
   *   2. as th eparent of elements that are 
   *      * defined as empty (e.g., img, input)
   *      * can only contain element (e.g., ul, dl, ol, object...)
   * 
   * @param {Object} cache_item
   * @param {Object} node
   * @param {String} tag_name           
   */
  insertDIV : function (item, node, tag_name) {

    var flag = false;
    var parent_node = null;
    var elements_without_content = ['applet', 'area', 'dl', 'frame', 'img', 'input', 'object', 'ol', 'table', 'ul'];
    var length =  elements_without_content.length;
    var title = this.setTitle(item);
    var new_div_element = this.document.createElement('div');
    
    new_div_element.setAttribute("class", 'oaa_web_accessibility_highlight');
    new_div_element.setAttribute("style", this.changeStyle(item));
    new_div_element.setAttribute("title", title);
    
    var index = elements_without_content.indexOf(tag_name);
    
    if (index != -1) {
      parent_node = node.parentNode;
      parent_node.insertBefore(new_div_element, node);
      new_div_element.appendChild(node);
    } else {
      
      while (node.firstChild) {
        new_div_element.appendChild(node.firstChild);         
      } 
      node.appendChild(new_div_element); 
    }
    
//  If true, element is aligned with top of scroll area.
//  If false, it is aligned with bottom.
    node.scrollIntoView(true);
  },
  
  /**
   * @function changeStyle
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   * 
   * @desc changes styling of outline on div
   *    1. manual check (red dotted line)
   *    2. pass (green single line)
   *    3. violation (red double line)
   *    4. warning (yellow single line)
   *    5. hidden (gray double line)
   *    6. shows blue color outline if there are no rules for an element 
   *  
   * @param {Object} item - node to get the severity count
   */
  changeStyle : function(item) {
    
	if (item.dom_element) item = item.dom_element;
	
    if (item.rules_violations.length > 0) return "border: medium solid red; borderCollapse: collapse; ";
    else if (item.rules_manual_checks.length  > 0) return "border: medium dotted red; borderCollapse: collapse; ";
    else if (item.rules_warnings.length  > 0 ) return "border: medium solid orange; borderCollapse: collapse; ";
    else if (item.rules_passed.length  > 0) return "border: medium solid green; borderCollapse: collapse; ";
    else if (item.rules_hidden.length  > 0) return "border: medium dotted grey; borderCollapse: collapse;";
    else return "border: medium solid blue; borderCollapse: collapse;";
  },
  
  /**
   * @function setTitle
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   * 
   * @desc Creates value for title attribute of the div element to provide a summary of the number of violations, warnings, manual checks and passes 
   * 
   * @param {Object} item - cache_item to retrieve the count of severities
   */
  setTitle : function(item) {
	
	if (item.dom_element) item = item.dom_element;
	
	var doc = window.document;  
	var getStr = function(string) doc.getElementById("ainspector_highlight_stringbundle").getString(string);
	var title = '';
	
	var violations_count = item.rules_violations.length;
	var manual_checks_count = item.rules_manual_checks.length;
	var warnings_count = item.rules_warnings.length;
	var passed_count = item.rules_passed.length;
	var hidden_count = item.rules_hidden.length;
	
	if (violations_count > 0)    title = title + violations_count + ' ' + PluralForm.get(violations_count, getStr('violations')) + ' ';
	if (manual_checks_count > 0) title = title + manual_checks_count + ' ' + PluralForm.get(manual_checks_count, getStr('manualChecks')) + ' ';
	if (warnings_count > 0)      title = title + warnings_count + ' ' + PluralForm.get(warnings_count, getStr('warnings')) + ' '; 
    if (passed_count > 0)        title = title + passed_count + ' ' + PluralForm.get(passed_count, getStr('passes')) + ' ';
    if (hidden_count > 0)        title = title + hidden_count + ' ' + PluralForm.get(hidden_count, getStr('hidden')) + ' ';
    
    if (!title) title = 'no rule results';
    
    return title;
  }
};
