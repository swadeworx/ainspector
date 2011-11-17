  // ****************************************************** 
  //
  // Copyright 2011 OpenAjax Alliance
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //  http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  //
  // ****************************************************** 
  


OpenAjax.a11y.cache.util     = OpenAjax.a11y.cache.util || {};
  
 /**
 * OpenAjax.a11y extensions to String object
 *
 */

// string utilities
if (typeof String.isInteger == "undefined") {
 String.prototype.isInteger = function() {
  return this.match(/^\d+$/) !== null;
 };
}
	
if (typeof String.trim == "undefined") {
 String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
 };
}

if (typeof String.normalizeSpace == "undefined") {
 String.prototype.normalizeSpace = function () {
  // Replace repeated spaces, newlines and tabs with a single space
  return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
 }; // end function normalizeSpace
}

if (typeof String.capitalize == "undefined") {
 String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
 };
}


 /**
 * getNameFromChildrenObject
 * 
 * @desc Returns an object with information about the accessible text of a node
 *
 * @param dom_element DOMElement object to get the accessible text
 *
 * @return object that provides information about the accessible text of the node 
 *
 */
 
OpenAjax.a11y.cache.util.getNameFromChildrenObject = function(dom_element) {

 function getText(dom_element, strings, texts, alts) {
  // If text node get the text and return
  if( dom_element.type == NODE_TYPE.TEXT ) {
   var text = dom_element.text;
   strings.push( text );
   texts.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == NODE_TYPE.ELEMENT ) {
    // check to see if IMG or AREA element and to use ALT content if defined
    if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {
     
     if (dom_element.alt) {
       strings.push(dom_element.alt);
       alts.push(dom_element.alt);
     }  
     
     if( dom_element.node.offsetHeight > o.height ) {
       o.height = dom_element.node.offsetHeight;
     } //endif
     
     if( dom_element.node.offsetWidth > o.width ) {
       o.width = dom_element.node.offsetWidth;
     } //endif
     
     o.image_count = o.image_count + 1;
     
    } else {
    
     for (var i = 0; i < dom_element.children.length; i++ ) {
      getText( dom_element.children[i], strings, texts, alts);
     } // endfor
     
    } // endif
    
   } // endif  
  } // endif
 } // end function getStrings

 // Create return object
 var o = {};
 var name_array = [];
 var name_from_text_nodes_array = [];
 var name_from_image_alt_array = [];
 o.height = 0;
 o.width = 0;
 o.image_count = 0;


 getText( dom_element, name_array, name_from_text_nodes_array, name_from_image_alt_array); 
 
 o.name         = name_array.join("").trim().normalizeSpace();
 o.name_from_text_nodes = name_from_text_nodes_array.join("").trim().normalizeSpace().toLowerCase();
 o.name_from_image_alt = name_from_image_alt_array.join("").trim().normalizeSpace().toLowerCase();
 return o;
 
}; // end function OpenAjax.cache.util.getAccessibleText


 /**
 * getNameFromChildren
 * 
 * @desc Returns an object with information about the accessible text of a node
 *
 * @param dom_element DOMElement object to get the accessible text
 *
 * @return object that provides information about the accessible text of the node 
 *
 */
 
OpenAjax.a11y.cache.util.getNameFromChildren = function (dom_element) {
 
 function getTextNodeContent(dom_item, strings) {
  var i;
  var children_len;

  if (dom_item.type == NODE_TYPE.TEXT) {
   strings.push( dom_item.text );
  } 
  else {
   // if an element for through all the children elements looking for text
   if (dom_item.type == NODE_TYPE.ELEMENT) {
   
    // check to see if IMG or AREA element and use ALT content if defined
    if (((dom_item.tag_name == 'img') || 
       (dom_item.tag_name == 'area')) &&
       dom_item.alt && 
       dom_item.alt.length) {
      strings.push( dom_item.alt );
    } else {
    
     children_len = dom_item.children.length;
     
     for (i=0; i < children_len; i++ ) {
      getTextNodeContent( dom_item.children[i], strings);
     } 
     
    } 
   }  
  } 
 } // end function getTextNodeContent

 // Create return object
 var strings = [];
 
 getTextNodeContent( dom_element, strings); 
 
 return strings.join("");
   
}; // end function OpenAjax.cache.util.getAccessibleText

// ============================
// UrlExists
// 
// @desc Determines if a URL exits
//
// @param URL_STATUS
//
// ============================

OpenAjax.a11y.cache.util.UrlExists = function (url) {

 if (OpenAjax.a11y.SUPPORTS_URL_TESTING) {
  try {
   var http = new XMLHttpRequest();
   http.open('HEAD', url, false);
   http.send(null);
   if (http.status!==404) {
    return OpenAjax.a11y.URL_RESULT.VALID;
   }
   else {
    return OpenAjax.a11y.URL_RESULT.INVALID;
   }
  }
  catch (e) {
   return OpenAjax.a11y.URL_RESULT.ERROR;
  }
 }
 else {
  return OpenAjax.a11y.URL_RESULT.NOT_TESTED;
 }
 
}; 

// ============================
// RGBToHex
// 
// @desc
//
// @param rgb_color
//
// ============================

OpenAjax.a11y.cache.util.RGBToHEX = function( rgb_color ) {

 function stringToHex(d) {
  var hex = Number(d).toString(16);
  if (hex.length == 1) {
   hex = "0" + hex;
  }
  return hex;
 }

 var i;
 var length; 

 if (!rgb_color) return "000000";

 var hex = [];
 var color_hex = "000000";
 var components = rgb_color.match(/[\d\.]+/g);
  
 if (components && components.length) {
  length = components.length;
  
  if (length == 3) {
   // RGB value
   for (i=0; i<3; i++) {
    hex.push(stringToHex(components[i]));
   } // end loop
 
   color_hex = hex[0] + hex[1] + hex[2]; 
   // OpenAjax.a11y.console( rgb_color + " " + color_hex );
   
  }
  else {  
   
   if (length == 4) {
    // RGBA value
    for (i=0; i<3; i++) {
     hex[i] = stringToHex(Math.round(parseFloat(components[i])*parseFloat(components[3])));
    } // end loop  
    color_hex = hex[0] + hex[1] + hex[2]; 
   }
  }
 } 
 
 return color_hex;
};