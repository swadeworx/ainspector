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

define(
  [
    "firebug/lib/trace",
    "firebug/lib/locale",
    "ainspector/openajax_a11y/oaa_a11y_amd"
  ],
  
  function(FBTrace, Locale, OpenAjax) {
    Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");

    Components.utils.import("resource://gre/modules/PluralForm.jsm");
    var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
    
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
      show_pass: null, 
      show_element_manual_check: null,
      show_page_manual_check: null,
      show_hidden: null,
      
    
      /**
       * @function initHighlight
       * 
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       *
       * @desc Initialize highlight module
       *
       * @param {Object}  document                  - Document object model of the browser view to highlight
       * @param {Boolean} show_element_manual_check - a boolean to highlight the element level manual checks. default is true 
       * @param {Boolean} show_page_manual_check    - a boolean to highlight the page level manual checks. default is true
       * @param {Boolean} show_pass                 - a boolean to highlight the passed elements. default is true
       * @param {Boolean} show_hidden               - a boolean to highlight the hidden elements. default is true
       */
       initHighlight : function (show_element_manual_check, show_page_manual_check, show_pass, show_hidden) {
      
         function checkIfDefined(new_value, current_value) {
           
           if (typeof new_value === 'boolean') return new_value;
           return current_value;
     
         }

         if (typeof this.show_element_manual_check !== 'boolean') this.show_element_manual_check = true;
         if (typeof this.show_page_manual_check    !== 'boolean') this.show_page_manual_check    = true;
         if (typeof this.show_pass                 !== 'boolean') this.show_pass   = true;
         if (typeof this.show_hidden               !== 'boolean') this.show_hidden = true;

         this.show_element_manual_check = checkIfDefined(show_element_manual_check,  this.show_element_manual_check);
         this.show_page_manual_check    = checkIfDefined(show_page_manual_check, this.show_page_manual_check);
         this.show_pass                 = checkIfDefined(show_pass, this.show_pass);
         this.show_hidden               = checkIfDefined(show_hidden, this.show_hidden);
       }, 
    
       /**
        * @function scopePageCount
        * 
        * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
        *
        * @desc  Returns the number of node results in the list that are from rules with a scope property set to page
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
       * @desc  Returns the number of node results in the list that are from rules with a scope property set to element
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
       * @function highlightCacheItems
       *
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       *
       * @desc highlights 
       *     1. a single cache item 
       *     2. a list of cache items 
       *     3. uses worst node result of each cache item to style highlight  
       *
       * @param {Object}  document      - the DOM to apply highlight operaton
       * @param {Object}  item   - cache item object or a list of cache item objects (NOTE: can be simple or set of dom element) to highlight
       */
       highlightCacheItems : function (document, item) {
       
         var VISIBILITY = OpenAjax.a11y.VISIBILITY;
    
         this.removeHighlight(document); 
    
         if (typeof item !== 'object') return;
         			

         var cache_items = [];

         if (typeof item.dom_element === 'object' || typeof item.type === 'number') { 
           cache_items.push(item)
         }
         else {
           cache_items = item; 
         }
         
         var cache_items_len = cache_items.length;
         var off_screen_elements = [];
         
         var v = 0;
         var w = 0;
         var pp = 0;
         var m = 0;
         var hh = 0;
         
         for (var i = 0; i < cache_items_len; i++) {
           
           var cache_item = cache_items[i];
    
           if (typeof cache_item !== 'object') {
             continue;
           }
    
           var de = cache_item;
           
           if (typeof cache_item.dom_element === 'object') de = cache_item.dom_element;
    
           var style    = this.getWorstResultValueStyle(de);
         
           var style_de = de;
         
           if (de.type === Node.TEXT_NODE) style_de = de.parent_element;         
    
           var node     = style_de.node;
           var tag_name = style_de.tag_name;
    
    //     OpenAjax.a11y.logger.debug("CACHE ITEM: " + cache_item + " onscreen: " + style.is_visible_onscreen + " style: " + style);
    
           if (node) {
    
    //       check if the node is off screen or hidden from assistive technologies
             if (style_de.computed_style.is_visible_onscreen === VISIBILITY.HIDDEN) {
           
               if (de.rules_violations.length ||
                   de.rules_warnings.length ||
                   (this.show_page_manual_check && this.scopePageCount(de.rules_manual_checks)) ||
                   (this.show_element_manual_check && this.scopeElementCount(de.rules_manual_checks)) ||
                 (this.show_pass && de.rules_passed.length) ||
                 (this.show_hidden && de.rules_hidden.length)) {
                 
                 off_screen_elements.push(cache_item);
                 
                  v += (de.rules_violations.length > 0) ? de.rules_violations.length : 0;
                  w += (de.rules_warnings.length > 0)   ? de.rules_warnings.length   : 0;
                  p += (this.show_pass && de.rules_passed.length > 0) ? de.rules_passed.length : 0;
                  m += (this.show_page_manual_check && de.rules_manual_checks.length > 0) ? de.rules_manual_checks.length : 0;
                  h += (this.show_hidden && de.rules_hidden.length) ? de.rules_hidden.length : 0;
               }
               
             } else {
             
               var mc = 0;
               var p = 0;
               var h = 0;
             
               if (this.show_page_manual_check)    mc += this.scopePageCount(de.rules_manual_checks);
               if (this.show_element_manual_check) mc += this.scopeElementCount(de.rules_manual_checks);
               if (this.show_pass)               p = de.rules_pass;
               if (this.show_hidden)             h = de.rules_hidden;
               
               this.insertDIV(document, node, tag_name, style, de.rules_violations, de.rules_warnings, mc, p, h);
             }
           }
         } //end for
         
    //     if (off_screen_elements.length > 0) this.showOffScreenCacheItems(off_screen_elements);
         if (off_screen_elements.length > 0) this.showOffScreenCacheItems(off_screen_elements, v, w, m, pp, hh );
       },
       
      /**
       * @function highlightNodeResults
       *
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       *
       * @desc Highlights a set of nodes on a page, uses the node result value for highlighting style
       *
       * @param {Object}  document      - the DOM to apply highlight operaton
       * @param {Array}   node_results  - An array of OAA node results to highlight (i.e. from rule results of filtered rule results)
       * @param {Object}  preferences - preferences set on any extension
       */
       highlightNodeResults : function (document, node_results) {
       
         var RESULT_VALUE = OpenAjax.a11y.RESULT_VALUE;
         var VISIBILITY = OpenAjax.a11y.VISIBILITY;
         var v = 0;
         var p = 0;
         var m = 0;
         var w = 0;
         var h = 0;
         
         this.removeHighlight(document); 
    
         if (typeof node_results !== 'object') return;
         
         // if not an array assume it is a node result object
         if (typeof node_results.length !== 'number') node_results = [node_results];
        
         var node_results_len = node_results.length;
         
         var off_screen_elements = [];
         
         for (var i = 0; i < node_results_len; i++) {
         
           var node_result = node_results[i];
           var cache_item = node_result.getCacheItem();
           var node  = null;
    
           if (typeof cache_item !== 'object') continue;
    
           // find dom element object based on the type of cache_item property
       var de = cache_item;
       if (typeof cache_item.dom_element === 'object') de = cache_item.dom_element;
    
           var style_de = de;
    
           if (de.type === Node.TEXT_NODE) style_de = de.parent_element;         
    
           var computed_style    = style_de.computed_style;
           var node     = style_de.node;
           var tag_name = style_de.tag_name;
    
    //       OpenAjax.a11y.logger.debug("NODE RESULT - " + node_result + " Result Value: " + node_result.getSeverityResult() + " onscreen: " + style.is_visible_onscreen);
    
           if (node) {
    
    //       check if the node is off screen or hidden from assistive technologies
             if (computed_style.is_visible_onscreen === VISIBILITY.HIDDEN) {
             
               switch (node_result.getResultValueConstant()) {
               
                 case RESULT_VALUE.MANUAL_CHECK: 
                   if (this.show_page_manual_check) {
                     off_screen_elements.push(node_result);
                     m += 1;
                   }
                   break;
                    
                 case RESULT_VALUE.PASS: 
                   if (this.show_pass) {
                     off_screen_elements.push(node_result);
                     p += 1;
                   }
                   break;
            
                 case RESULT_VALUE.HIDDEN: 
                   if (this.show_hidden) {
                     off_screen_elements.push(node_result);
                     h += 1;
                   }
                   break;
                     
                 case RESULT_VALUE.VIOLATION:
                   off_screen_elements.push(node_result);
                   v += 1;
                   break;
                 
                 default:
                   off_screen_elements.push(node_result);
                   w += 1;
                   break;
               }  
                   
             } else {
               switch (node_result.getResultValueConstant()) {
                 
                 case RESULT_VALUE.VIOLATION:
                   this.insertDIV(document, node, tag_name, Locale.$STR("styleViolations"), 1, 0, 0, 0, 0);
                   break;
          
                 case RESULT_VALUE.WARNING: 
                   this.insertDIV(document, node, tag_name, Locale.$STR("styleWarnings"), 0, 1, 0, 0, 0);
                   break;
          
                 case RESULT_VALUE.MANUAL_CHECK: 
                   if (this.show_page_manual_check && node_result.isScopePage()) this.insertDIV(document, node, tag_name, Locale.$STR("styleManualChecks"), 0, 0, 1, 0, 0);
                   if (this.show_element_manual_check && node_result.isScopeElement()) this.insertDIV(document, node, tag_name, Locale.$STR("styleManualChecks"), 0, 0, 1, 0, 0);
                 
                   break;
                 
                 case RESULT_VALUE.PASS: 
                   if (this.show_pass) this.insertDIV(document, node, tag_name, Locale.$STR("stylePassed"), 0, 0, 0, 1, 0);
                   break;
    
                 default:
                   if (this.show_hidden) this.insertDIV(document, node, tag_name, Locale.$STR("styleHidden"), 0, 0, 0, 0, 1);
                   break;
               }
             }
           }
         } //end for
         
         if (off_screen_elements.length > 0) this.showOffScreenNodeResults(document, off_screen_elements, v, w, m, p, h);
       },
      
       /**
        * @function removeHighlight
        * 
        * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
        * 
        * @desc unhighlights the nodes that are highlighted earlier and 
        *       removes the informational message added to a page if the 
        *       element is hidden from Assistive technologies
        *
        * @param {Object}  document  - the DOM to apply highlight operaton
        */
        removeHighlight : function(document) {
         
          function removeFromDocument(document) {
          var elements = document.getElementsByClassName('oaa_web_accessibility_highlight');
           
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
    
          var iframes = document.getElementsByTagName( "iframe" );
         
          /* remove the highlighting inside iframes */
          for (var i = 0; i < iframes.length; i++) {
            var doc = iframes[i].contentDocument;
    //      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("REMOVE HIGHLIGHT FRAME: " + iframes[i] + " " + doc.location.href);
            if (doc) removeFromDocument(doc); 
          }  
           
        }
    
        function removeFromFrames(frames) {
           
          if (typeof frames !== 'object' || typeof frames.length !== 'number') return;
    
          for (var i=0; i < frames.length; i++) {
             
            var frame = frames[i];
             
            if (frame.document) removeFromDocument(frame.document);
            removeFromFrames(frame.frames);
          }//end for
        }
         
        removeFromDocument(document);  //unhighlighting in the actual document     
    
        var frames = window.frames;
        removeFromFrames(frames);
    
        var off_screen_elements = document.getElementsByClassName('oaa_web_accessibility_off_screen');
    
        for (var j = 0; j < off_screen_elements.length; j++) {
               
          if (off_screen_elements[j]) document.body.removeChild(off_screen_elements[j]);	   
        }
      },
      
      /**
       * @function showOffScreenItems
       * 
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       *
       * @desc Display information about a list of cache item results using the worst result value of each cache item's node results 
       *               Designed to provide information about cache items that are not visible on screen 
       * 
       * @param {Object}  document    - the DOM to remove highlighting from
       * @param {Array}  cache_items - list of cache items or dom element objects 
       * @param {Number} v - number of total violations in all the rules associated with all the cache_items 
       * @param {Number} w - number of total warnings in all the rules associated with all the cache_items
       * @param {Number} m - number of total manual checks in all the rules associated with all the cache_items
       * @param {Number} p - number of total pass in all the rules associated with all the cache_items
       * @param {Number} h - number of total hidden in all the rules associated with all the cache_items
       */
      showOffScreenCacheItems : function (document, cache_items, v, w, m, p, h) {
      
        if (!document) return;
        
        var cache_items_plural;
        var str;
        var tag_name;
        var style = Locale.$STR("styleOffScreen") + ' ';
        var eval_result;
    
        if (v > 0) {
          style += Locale.$STR("styleViolations");
          eval_result = 'violation';
        } else if (w > 0) {
          style += Locale.$STR("styleWarnings");
          eval_result = 'warning';
        } else if (m > 0) {
          style += Locale.$STR("styleManualChecks");
          eval_result = 'manual check';
        } else if (p > 0) {
          style += Locale.$STR("stylePassed");
          eval_result = 'passed';
        } else {
          style += Locale.$STR("styleHidden");
          eval_result = 'hidden';
        }
        
        if (cache_items.length == 1) {
          
          if (cache_items[0].dom_element) tag_name = cache_items[0].dom_element.tag_name;
          
          else tag_name = cache_items[0].tag_name;
          
          str = tag_name + ' ' + Locale.$STR("offScreenMessage") + ' ( ' + eval_result + ' )';
        
        } else {
          cache_items_plural = PluralForm.get(cache_items.length, Locale.$STR("element"));
          str = cache_items.length + ' ' + cache_items_plural;
        }
        
        this.positionDIV(document, style, str);
      },
      
      /**
       * @function showOffScreenNodeResults
       * 
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       *
       * @desc Display information about a list of node results of a rule 
       *       Designed to provide information about node results that are not visible on screen 
       * 
       * @param {Object}  document      - the DOM to remove highlighting from
       * @param {Array}   node_results  -  List of node result objects that are off screen
       * @param {Number} v - number of violations in th list of node results 
       * @param {Number} w - number of warnings in the list of node results
       * @param {Number} m - number of manual checks in the list of node results
       * @param {Number} p - number of passes in the list of node results
       * @param {Number} h - number of hidden in the list of node results
       */
      showOffScreenNodeResults : function (document, offScreen_node_results, v, w, m, p, h) {
    
        if (!document) return;
    
        var node_results_plural = PluralForm.get(offScreen_node_results.length, Locale.$STR("element"));
        
        var str = offScreen_node_results.length + ' ' + node_results_plural ;
        
        var style = Locale.$STR("styleOffScreen") + ' ';
    
        if (v > 0) style += Locale.$STR("styleViolations");
        else if (w > 0) style += Locale.$STR("styleWarnings");
        else if (m > 0) style += Locale.$STR("styleManualChecks");
        else if (p > 0) style += Locale.$STR("stylePassed");
        else style += Locale.$STR("styleHidden");
    
 //   console.logStringMessage(v + ' ' +w + ' '+ m + ' ' + p);
        if (v > 0) str +=  ' ' + v + PluralForm.get(v, Locale.$STR("violations"));
        if (w > 0) str +=  ' ' + w + PluralForm.get(w, Locale.$STR("warnings"));
        if (m > 0) str +=  ' ' + m + PluralForm.get(m, Locale.$STR("manualChecks"));
        if (p > 0) str +=  ' ' + p + PluralForm.get(p, Locale.$STR("passes"));
    
        this.positionDIV(document, style, str);
      },
      
      /**
       * @function positionDIV
       * 
       * @desc creates a div to position on top of the web page to show the off screen elements and its severities outlined with the worst result value
       * 
       * @param {Object}  document  - the DOM to to position DIV
       * @param {String} style - styles the DIV with a border 
       * @param {String} result_value_message - message to show inside the DIV
       */
      positionDIV : function (document, style, result_value_message) {
        
        if (!document.createElement) return;
        var div_element = document.createElement('div');
        div_element.id = 'oaa_web_accessibility_off_screen_id';
        
        div_element.setAttribute("class", 'oaa_web_accessibility_off_screen');
        div_element.setAttribute("style", style);
        
        var text_node = document.createTextNode(result_value_message);
        div_element.appendChild(text_node);
        
        document.body.insertBefore(div_element,document.body.childNodes[0]);
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
       * @param {Object}  document    - the DOM to highlight elements
       * @param {Object} cache_item
       * @param {Object} node
       * @param {String} tag_name           
       */
      insertDIV : function (document, node, tag_name, style, violations, warnings, manual_checks, pass, hidden) {
    
        var flag = false;
        var parent_node = null;
        var elements_without_content = ['applet', 'area',  'dl', 'frame', 'img', 'input', 'object', 'ol', 'select', 'textarea', 'table', 'ul'];
        var length =  elements_without_content.length;
        
        var title = this.getResultValueMessage(violations, warnings, manual_checks, pass, hidden);
        
        var new_div_element = document.createElement('div');
        
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
      * @function getWorstResultValueStyle
      * 
      * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
      * 
      * @desc Returns a CSS formatted string to be used with the style property of a DOM node
      *       Result is based on the worst node result value associated with a cache item
      *
      *       manual check (red dotted border)
      *       pass (green single border)
      *       violation (red double border)
      *       warning (yellow single border)
      *       hidden (gray double border)
      *       no results (black border) 
      *  
      * @param {Object} dom_element  -  OAA DOM element object 
      * @param {Object} preferences  -  Preferences object from preferences module
      * 
      * @return {String} Returns a CSS string that can be used with a style property of a DOM node
      */
      getWorstResultValueStyle : function(dom_element) {
      
        if (dom_element.rules_violations.length > 0) return Locale.$STR("styleViolations");
    
        else if (dom_element.rules_warnings.length  > 0 ) return Locale.$STR("styleWarnings");
    
        else if (this.show_page_manual_check  && (this.scopePageCount(dom_element.rules_manual_checks)    > 0)) return Locale.$STR("styleManualChecks");
    
        else if (this.show_element_manual_check && (this.scopeElementCount(dom_element.rules_manual_checks) > 0)) return Locale.$STR("styleManualChecks");
        
        else if (this.show_pass &&  (dom_element.rules_passed.length  > 0)) return Locale.$STR("stylePassed");
  
        else if (this.show_hidden &&  (dom_element.rules_hidden.length  > 0)) return Locale.$STR("styleHidden");
      
        else return Locale.$STR("styleResult");
                
      },
      
      /**
       * @function getResultValueMessage
       * 
       * @memberOf OAA_WEB_ACCESSIBILITY.util.highlightModule
       * 
       * @desc Creates value for title attribute of the div element to provide a summary of the number of violations, warnings, manual checks and passes 
       * 
       * @param {Number} v_count  - Number of violations
       * @param {Number} w_count  - Number of warnings
       * @param {Number} mc_count - Number of manual checks
       * @param {Number} p_count  - Number of pass
       * @param {Number} h_count  - Number of hidden
       * 
       * @return {String} title
       */
      getResultValueMessage : function(v_count, w_count, mc_count, p_count, h_count) {
            
        var title = '';
            
  	    if (v_count > 0)  title += v_count + ' ' + PluralForm.get(v_count, Locale.$STR("violations")) + ' ';
  	
      	if (mc_count > 0) title += mc_count + ' ' + PluralForm.get(mc_count, Locale.$STR("manualChecks")) + ' ';
      	
      	if (w_count > 0)  title += w_count + ' ' + PluralForm.get(w_count, Locale.$STR("warnings")) + ' '; 
        
      	if (p_count > 0)  title += p_count + ' ' + PluralForm.get(p_count, Locale.$STR("passes")) + ' ';
        
      	if (h_count > 0)  title += h_count + ' ' + PluralForm.get(h_count, Locale.$STR("hidden")) + ' ';
            
        if (title.length === 0) title = 'no rule results';
              
        return title;
      }
    };
    return OAA_WEB_ACCESSIBILITY;
  }
)