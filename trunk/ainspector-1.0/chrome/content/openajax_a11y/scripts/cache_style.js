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
  

 /** ===============================================================
 *
 * DOMElementComputedStyle
 *
 * DOMElementComputedStyle is used to add common properties to cache objects 
 *
 * @param  node       Object  dom node object 
 * @param  parent_style   Object  DOMElementComputedStyle of the parent node from the DOM 
 *
 * @return  DOMElementComputedStyle 
 *
 ================================================================ */
 
OpenAjax.a11y.cache.DOMElementComputedStyle = function (dom_element, parent_element) {

 function normalizeBackgroundImage(value, parent_element) {

  var v = value;

  if ((v === undefined) || 
    (v == 'inherit') || 
    (v === '')) {
    
   if (parent_element) {  
    v = parent_style.background_image;
   }
   else {
    v = 'none';
   }
  }  
  
  return v;
  
 } // end function

 function  normalizeFontSize(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.font_size;
   }
   else {
    return 12;
   }    
  }
  else {
   return value;
  }
 } // end function

 function  normalizeFontWeight(value, parent_element) {
  if (isNaN(value) ) {
   switch (value.toLowerCase()) {
   case 'bold':
    return 700;

   case 'normal':
    return 400;

   case 'inherit':
    if (parent_element) {
     return parent_element.computed_style.font_weight;
    }
    else {
     return 400;
    }    

   case 'bolder':
    return 700;
    
   default:
    return 400;
   }
  }
  else {
   return parseInt(value,10);
  }
  
 } // end function


 function  normalizePositionTop(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.top;
   }
   else {
    return 0;
   }    
  }
  else {
   return parseInt(value,10);
  }
 } // end function

 function  normalizePositionLeft(value, parent_element) {
  if (value.toLowerCase() == 'inherit') {
   if (parent_element) {
    return parent_element.computed_style.left;
   }
   else {
    return 0;
   }    
  }
  else {
   return parseInt(value,10);
  }
 } // end function

 this.display  = "";
 this.visibility = "";
 
 this.graphical = OpenAjax.a11y.VISIBILITY.UNKNOWN; 
 this.at    = OpenAjax.a11y.VISIBILITY.UNKNOWN;
 
 this.color   = "";
 this.background_color = "";
 this.background_image = "";
 this.font_family = "";
 this.font_size  = "";
 this.font_weight = "";
 this.position  = "";
 this.left    = "";
 this.top     = "";
 
 // check to see if getComputedStyle is defined for the engine 
 if (!window.getComputedStyle) return this;
 
 var style = window.getComputedStyle(dom_element.node, null);  
   
 this.display   = style.getPropertyValue("display");
 this.visibility = style.getPropertyValue("visibility");
 
 this.color        = style.getPropertyValue("color");
 this.opacity       = style.getPropertyValue("opacity");
 this.background_color  = style.getPropertyValue("background-color");
 this.background_image  = normalizeBackgroundImage(style.getPropertyValue("background-image"), parent_element);
 this.background_repeat  = style.getPropertyValue("background-repeat");
 this.background_position = style.getPropertyValue("background-position");
 
 this.font_family = style.getPropertyValue("font-family");  
 this.font_size  = normalizeFontSize(style.getPropertyValue("font-size"), parent_element); 
 this.font_weight = normalizeFontWeight(style.getPropertyValue("font-weight"), parent_element); 
 
 this.position = style.getPropertyValue("position");

 // test if getBoundingClientRect is supported 
 if (dom_element.node.getBoundingClientRect) {
  var client_rect = dom_element.node.getBoundingClientRect();
  this.client_rect = client_rect;
  this.top     = client_rect.top;
  this.left    = client_rect.left;
  this.height   = client_rect.height;
  this.width    = client_rect.width;
 }
 else {
  this.top     = normalizePositionTop(style.getPropertyValue("top"), parent_element);
  this.left    = normalizePositionLeft(style.getPropertyValue("left"), parent_element);
 }
 
 // This is an edge case test typcially for body elements and frames
 if ((this.background_color == 'inherit') ||
   (this.background_color == 'transparent')) {
  if (parent_element && parent_element.computed_style) { 
   this.background_color   = parent_element.computed_style.background_color;
   this.background_color_hex = parent_element.computed_style.background_color_hex;
  }
  else {
   this.background_color = 'rgb(255,255,255)';
   this.background_color_hex = 'ffffff';
  }   
 } 
 else {
  this.background_color_hex = OpenAjax.a11y.cache.util.RGBToHEX(style.getPropertyValue("background-color")); 
 }

 if (parent_element && 
   parent_element.computed_style ) {

  var parent_style = parent_element.computed_style;

  // We do have parent_element so use its information if needed  
 
  if ((this.display == 'inherit') ||  
    (parent_element.computed_style.display == 'none')) {
   this.display = 'none';
  } 

  if ((this.visibility == 'inherit') ||
    (parent_style.visibility == 'hidden')) {
   this.visibility = parent_style.visibility;
  } 

  if (this.color == 'inherit') {
   this.color = parent_style.color;
   this.color_hex = parent_style.color_hex;
  }
  else {
   this.color_hex = OpenAjax.a11y.cache.util.RGBToHEX(style.getPropertyValue("color"));
  }
    
  if (this.font_family == 'inherit') {
   this.font_family = parent_style.font_family;
  } 
  
  if (this.position == 'inherit') {
   this.position = parent_style.position;
  } 
 } 
 
 // Calcuate visibility of node content in graphical renderings and to assistive technologies

 if (this.visibility && 
   this.visibility.length && 
   this.display && 
   this.display.length ) { 
  if ((this.visibility == 'hidden') ||
    (this.display == 'none')) {
   this.graphical = OpenAjax.a11y.VISIBILITY.HIDDEN;
   this.at    = OpenAjax.a11y.VISIBILITY.HIDDEN;
  }
  else {
   if (this.position == "absolute" &&
     (parseInt(this.top,10) < 0 || parseInt(this.left,10) < 0)) {
    this.graphical = OpenAjax.a11y.VISIBILITY.HIDDEN;
   }
   else {
    this.graphical = OpenAjax.a11y.VISIBILITY.VISIBLE;
   }
   
   if (dom_element.role == "presentation") {
    this.at = OpenAjax.a11y.VISIBILITY.HIDDEN;  
   } 
   else {
    this.at = OpenAjax.a11y.VISIBILITY.VISIBLE;     
   }
  }
 } 


 return this;  

};

  /**
  * OpenAjax.a11y.cache.DOMElementComputedStyle.calculateColorContrast
  *  
  * @desc
  * 
  * @return Number representing the color contrast ratio 
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.calculateColorContrastRatio = function () {

 if( this.color_hex && 
   (this.color_hex.length == 6) && 
    this.background_color_hex && 
   (this.background_color_hex.length == 6)) {
  var L1 = this.getLuminance(this.color_hex);
  var L2 = this.getLuminance(this.background_color_hex);
  this.color_contrast_ratio = Math.round((Math.max(L1, L2) + 0.05)/(Math.min(L1, L2) + 0.05)*10)/10;
 }
 else {
  this.color_contrast_ratio = null;
 }

 return this.color_contrast_ratio;
   
};


  /**
  * OpenAjax.a11y.cache.DOMElementComputedStyle.getLuminance
  *  
  * @desc Get the luminance value of a hex incoded color 
  * 
  * @return Number representing the limnance value
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.getLuminance = function (color) {

 // OpenAjax.a11y.console("  " + color );

 // Get decimal values
 var R8bit = parseInt(color.substring(0,2),16);
 var G8bit = parseInt(color.substring(2,4),16);
 var B8bit = parseInt(color.substring(4,6),16);
        
 // Get sRGB values
 var RsRGB = R8bit/255;
 var GsRGB = G8bit/255;
 var BsRGB = B8bit/255;
  // Calculate luminance
 var R = (RsRGB <= 0.03928) ? RsRGB/12.92 : Math.pow(((RsRGB + 0.055)/1.055), 2.4);
 var G = (GsRGB <= 0.03928) ? GsRGB/12.92 : Math.pow(((GsRGB + 0.055)/1.055), 2.4);
 var B = (BsRGB <= 0.03928) ? BsRGB/12.92 : Math.pow(((BsRGB + 0.055)/1.055), 2.4);
			
 return (0.2126 * R + 0.7152 * G + 0.0722 * B);
			
};

  /**
  * toString
  *  
  * @desc Get the luminance value of a hex incoded color 
  * 
  * @return Number representing the limnance value
  *
  */ 

OpenAjax.a11y.cache.DOMElementComputedStyle.prototype.toString = function (color) {
 return "Computed style " + this.color_hex + " " + this.background_color_hex + " " + this.color_contrast_ratio; 

};
