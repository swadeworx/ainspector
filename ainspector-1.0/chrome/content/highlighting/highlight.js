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
   * @function scopePageCount
    * 
    * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
    *
   * @desc  Returns the number of node results that are from rules with page scope
   * 
   * @param {Array}  node_results  -  List of node result objects
   *
   * @return {Number}  Number of node results that are from rules with scope of page 
    */

   scopePageCount  : function(node_results) {
     
     var count = 0;  
     for (var i = 0; i < node_results.length; i++) if (node_results[i].isScopePage()) count++;
     return count;
     
   },
     
  /**
   * @function scopeElementCount
   *
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
   * @desc  Returns the number of node results that are from rules with element scope
   * 
   * @param {Array}  node_results  -  List of node result objects
   *
   * @return {Number}  Number of node results that are from rules with element of page 
   */

   scopeElementCount : function (node_results) {
     
     var count = 0;
     
     for (var i = 0; i < node_results.length; i++) if (node_results[i].isScopeElement()) count++;
     
     return count;
     
   },

  /**
   * @function highlightCacheItem
   *
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
    * @desc highlights a cache item on a page
    *
    * @param {Object}   cache_item   - Is a OAA cache items (NOTE: can be simple dom element) to highlight
    * @param {Object}  preferences   - preferences set on any extension
    */
   highlightCacheItem : function (cache_item, preferences) {
   

     this.removeHighlight(); 

     if (typeof cache_item !== 'object') return;
    
     var off_screen_elements = [];
     
     var de = cache_item;

     if (typeof cache_item.dom_element === 'object') de = cache_item.dom_element;

     var style    = this.getWorstSeverityStyle(de, preferences);
     
     var style_de = de;
     
     if (de.type === Node.TEXT_NODE) style_de = de.parent_element;         

     var node     = style_de.node;
     var tag_name = style_de.tag_name;

       if (node) {

//       check if the node is off screen or hidden from assistive technologies
         if (style.visibility == "hidden" || style.display == "none") {
       
         if (de.rules_violations.length ||
             de.rules_warnings.length ||
             (preferences.show_results_page_manual_checks    && this.scopePageCount(de.rules_manual_checks)) ||
             (preferences.show_results_element_manual_checks && this.scopeElementCount(de.rules_manual_checks)) ||
             (preferences.show_results_page_pass   && de.rules_pass.length) ||
             (preferences.show_results_page_hidden && de.rules_hidden.length)) {
           off_screen_elements.push(cache_item);
           this.isVisibletoAT(off_screen_elements);
         }
           
         } else {
         
         var mc = 0;
         var p = 0;
         var h = 0;
         
         if (preferences.show_results_page_manual_checks)    mc += this.scopePageCount(de.rules_manual_checks);
         if (preferences.show_results_element_manual_checks) mc += this.scopeElementCount(de.rules_manual_checks);
         if (preferences.show_results_page_pass) p = de.rules_pass;
         if (preferences.show_results_page_hidden) h = de.rules_hidden;
           
         this.insertDIV(node, tag_name, style, de.rules_violations, de.rules_warnings, mc, p, h);  
       }
     }

   },
   
  /**
   * @function highlightNodeResults
   *
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   *
   * @desc Highlights a set of nodes on a page, uses the node severity for highlighting style
   *
   * @param {Array}   node_results  - An array of OAA node results to highlight (i.e. from rule results of filtered rule results)
   * @param {Object}  preferences - preferences set on any extension
   */
   highlightNodeResults : function (node_results, preferences) {
   
     var SEVERITY    = OpenAjax.a11y.SEVERITY;
     
     this.removeHighlight(); 

     if (!node_results || typeof node_results.length == 'undefined') return;
    
     var node_results_len = node_results.length;
     var de;
     var off_screen_elements = [];
     
     for (var i = 0; i < node_results_len; i++) {
     
       var node_result = node_results[i];
       var cache_item = node_result.cache_item;
       var node  = null;

       if (typeof cache_item !== 'object') continue;

       // find dom element object based on the type of cache_item property

       if (typeof cache_item.dom_element === 'object') {
         de = cache_item.dom_element;
         }
         else {
         de = cache_item;       
       }

       var style_de = de;

       if (de.type === Node.TEXT_NODE) style_de = de.parent_element;         

       var style    = style_de.computed_style;
       var node     = style_de.node;
       var tag_name = style_de.tag_name;

       if (node) {

//       check if the node is off screen or hidden from assistive technologies
         if (style.visibility == "hidden" || style.display == "none") {
           switch (node_result.getSeverityResult()) {
           
           case SEVERITY.MANUAL_CHECK: 
             if (preferences.show_results_page_manual_checks) off_screen_elements.push(node_result);
             break;
          
           case SEVERITY.PASS: 
             if (preferences.show_results_page_pass) off_screen_elements.push(node_result);
             break;
        
           case SEVERITY.HIDDEN: 
             if (preferences.show_results_page_hidden) off_screen_elements.push(node_result);
             break;
             
           default:
             off_screen_elements.push(node_result);
             break;
           }  
           
         } else {
           switch (node_result.getSeverityResult()) {
           
           case SEVERITY.VIOLATION:
             this.insertDIV(node, tag_name, this.getStringBundle('styleViolations'), 1, 0, 0, 0, 0);
             break;

           case SEVERITY.WARNING: 
             this.insertDIV(node, tag_name, this.getStringBundle('styleWarnings'), 0, 1, 0, 0, 0);
             break;

           case SEVERITY.MANUAL_CHECK: 
             if (preferences.show_results_page_manual_checks && node_result.isScopePage()) this.insertDIV(node, tag_name, this.getStringBundle('styleManualChecks'), 0, 0, 1, 0, 0);
             if (preferences.show_results_element_manual_checks && node_result.isScopeElement()) this.insertDIV(node, tag_name, this.getStringBundle('styleManualChecks'), 0, 0, 1, 0, 0);
             break;
             
           case SEVERITY.PASS: 
             if (preferences.show_results_pass) this.insertDIV(node, tag_name, this.getStringBundle('stylePassed'), 0, 0, 0, 1, 0);
             break;

           default:
             if (preferences.show_results_hidden) this.insertDIV(node, tag_name, this.getStringBundle('styleHidden'), 0, 0, 0, 0, 1);
             break;
           }  
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

	   if (!this.document) return;
       
	   var elements = this.document.getElementsByClassName('oaa_web_accessibility_highlight');

		 while (elements[0]) {
	     var element = elements[0]; 

		   if (element) {
         var parent_node = element.parentNode;
           
         while(element.firstChild) {
           parent_node.insertBefore(element.firstChild, element);
         }
           
         parent_node.removeChild(element);
       }
     }
	   
	   var off_screen_elements = this.document.getElementsByClassName('oaa_web_accessibility_off_screen');

	   for (var j = 0; j < off_screen_elements.length; j++) {
	   
		   if (off_screen_elements[j]) this.document.body.removeChild(off_screen_elements[j]);	   
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
    
    var element_plural = PluralForm.get(offScreen_elements.length, window.document.getElementById("ainspector_highlight_stringbundle").getString('element'));
    
    var new_div_element = this.document.createElement('div');
    var style_div = 'width:40%; padding:10px; border:3px solid grey; margin:0px; background-color: white; color:black; font-size:120%; position:fixed; ';
    var inner_html = offScreen_elements.length + '  ' + element_plural + ' off-screen or hidden from assistive technologies ';
    new_div_element.id = 'oaa_web_accessibility_off_screen_id';
    new_div_element.setAttribute("class", 'oaa_web_accessibility_off_screen');
    new_div_element.setAttribute("style", style_div);
    new_div_element.innerHTML = inner_html;
    
    this.document.body.insertBefore(new_div_element,this.document.body.childNodes[0]);
    
    /* var div_added = this.document.getElementById('oaa_web_accessibility_off_screen_id');
    var newUL = this.document.createElement("ol");
    var text_node = this.document.createTextNode("Elements that are off-screen or hidden from assistive technologies :");
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
      
    }*/
    
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
  insertDIV : function (node, tag_name, style, violations, warnings, manual_checks, pass, hidden) {

    var flag = false;
    var parent_node = null;
    var elements_without_content = ['applet', 'area', 'dl', 'frame', 'img', 'input', 'object', 'ol', 'table', 'ul'];
    var length =  elements_without_content.length;
    
    var title = this.getSeverityMessage(violations, warnings, manual_checks, pass, hidden);
    
    var new_div_element = this.document.createElement('div');
    
    new_div_element.setAttribute("class", "oaa_web_accessibility_highlight");
    new_div_element.setAttribute("style", style);
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
   * @function getWorstSeverityStyle
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
   * @param {Object} object
   * @param {Object} item         - node to get the severity count
   * @param {Object} preferences  -
   * @param {String} view         - elements view or rules view
   * 
   * @return {property} styleResult
   */
  getWorstSeverityStyle : function(dom_element, preferences) {
      
    if (dom_element.rules_violations.length > 0) return this.getStringBundle('styleViolations');
    
    else if (dom_element.rules_warnings.length  > 0 ) return this.getStringBundle('styleWarnings');
    
    else if (preferences.show_results_page_manual_checks    && (this.scopePageCount(dom_element.rules_manual_checks)    > 0)) return this.getStringBundle('styleManualChecks');
    
    else if (preferences.show_results_element_manual_checks && (this.scopeElementCount(dom_element.rules_manual_checks) > 0)) return this.getStringBundle('styleManualChecks');
    
    else if (preferences.show_results_pass &&  (dom_element.rules_passed.length  > 0)) return this.getStringBundle('stylePassed');
  
    else if (preferences.show_results_hidden &&  (dom_element.rules_hidden.length  > 0)) return this.getStringBundle('styleHidden');
      
	    else return this.getStringBundle('styleResult');
	    
  },
  
  /**
   * @function getSeverityMessage
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   * 
   * @desc Creates value for title attribute of the div element to provide a summary of the number of violations, warnings, manual checks and passes 
   * 
   * @param {Object} item - cache_item to retrieve the count of severities
   * 
   * @return {String} title
   */
  getSeverityMessage : function(v_count, w_count, mc_count, p_count, h_count) {
	
  	var title = '';
  	
  	if (v_count > 0)  title += v_count + ' ' + PluralForm.get(v_count, this.getStringBundle('violations')) + ' ';
  	
  	if (mc_count > 0) title += mc_count + ' ' + PluralForm.get(mc_count, this.getStringBundle('manualChecks')) + ' ';
  	
  	if (w_count > 0)  title += w_count + ' ' + PluralForm.get(w_count, this.getStringBundle('warnings')) + ' '; 
    
  	if (p_count > 0)  title += p_count + ' ' + PluralForm.get(p_count, this.getStringBundle('passes')) + ' ';
    
  	if (h_count > 0)  title += h_count + ' ' + PluralForm.get(h_count, this.getStringBundle('hidden')) + ' ';
    
    if (title.length === 0) title = 'no rule results';
      
    return title;
  },
  
  /**
   * @function getStringBundle
   * 
   * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
   * 
   * @desc returns the string from the locale/en-US/highlight.properties
   * 
   * @param {String} string - key to the highlight.properties file
   * 
   * @return {String} 
   */
  getStringBundle : function(string) {
    
    return window.document.getElementById("ID_STRINGBUNDLE_HIGHLIGHT").getString(string);
  }
};
