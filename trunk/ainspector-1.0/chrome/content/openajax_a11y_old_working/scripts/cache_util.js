/**
 * Copyright 2011 OpenAjax Alliance
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

/* ---------------------------------------------------------------- */
/*        Utilities and String Extensions                           */
/* ---------------------------------------------------------------- */

/** 
 * @namespace OpenAjax.a11y.util
 */

OpenAjax.a11y.util = OpenAjax.a11y.util || {};


/**
 * @function transformElementMarkup
 *
 * @memberOf OpenAjax.a11y.util
 * 
 * @desc Converts element markup in strings to capitalized text (default) or adds <code> element
 *
 * @param {String}  str  - String to convert element text
 * 
 * @return  String 
 */
 
OpenAjax.a11y.util.transformElementMarkup = function(str) {
 
  var new_str = "";
  
  var transform_option = 1; // default is capitalize
  
  if (OpenAjax.a11y.ELEMENT_FORMATING == "HTML") transform_option = 2; // transform to html
  if (OpenAjax.a11y.ELEMENT_FORMATING == "NONE") transform_option = 3; // just removes @ sign from string
  
  if (str && str.length) {
    var max = str.length; 
    var transform_flag = false;
    
    for (var i = 0; i < max; i++) {
    
      var c = str[i];
    
      if (c == '@') { 
      
        if (transform_option == 2) {
          if (transform_flag) 
            new_str += '</code>';
          else             
            new_str += '<code>';
        }    
      
        transform_flag = !transform_flag;
        continue;
      }  
      
      if (transform_flag && transform_option == 1) 
        new_str += c.toUpperCase();
      else
        new_str += c;
    }
  }
  return new_str;
};







/**
 * @function urlExists
 *
 * @memberOf OpenAjax.a11y.util
 *
 * @desc Determines if a URL exits
 *
 * @param {String} url - url to test if it exists
 *
 * @return  Number  
 */
 
OpenAjax.a11y.util.urlExists = function (url) {

 if (OpenAjax.a11y.SUPPORTS_URL_TESTING && OpenAjax.a11y.URL_TESTING_ENABLED) {
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

/**
 * @function RGBToHex
 * @memberOf OpenAjax.a11y.util
 * 
 * @desc Converts an RGB color to Hex values
 *
 * @param {String} rgb_color - RGB Color
 * 
 * @return  String 
 */
 
OpenAjax.a11y.util.RGBToHEX = function( rgb_color ) {

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
   // OpenAjax.a11y.logger.debug( rgb_color + " " + color_hex );
   
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


/** 
 * @namespace String
 */

 /**
 * @function isInteger
 * @memberOf String
 */

// string utilities
if (typeof String.isInteger == "undefined") {
 String.prototype.isInteger = function() {
  return this.match(/^\d+$/) !== null;
 };
}
	
/**
 * @function trim
 * @memberOf String
 */
 
if (typeof String.trim == "undefined") {
 String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, '');
 };
}

/**
 * @function normalizeSpace
 * @memberOf String
 */

if (typeof String.normalizeSpace == "undefined") {
 String.prototype.normalizeSpace = function () {
  // Replace repeated spaces, newlines and tabs with a single space
  return this.replace(/^\s*|\s(?=\s)|\s*$/g, "");
 }; // end function normalizeSpace
}

/**
 * @function capitalize
 * @memberOf String
 */
 
if (typeof String.capitalize == "undefined") {
 String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
 };
}

