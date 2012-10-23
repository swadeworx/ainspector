/*
 * Copyright 2011-2012 OpenAjax Alliance
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
/*                            ImageCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to images in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    image_elements  - List of image element objects in the document 
 * @property {Number}   length          - Number of image element objects in the list 
 *
 * @property {String}   sort_property   - Image element object property the list of link objects is sorted by
 * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */
  
OpenAjax.a11y.cache.ImagesCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
 
  this.image_elements = [];
  this.length = 0;
 
  this.sort_property  = 'document_order';
  this.sort_ascending = true;

}; 

/**
 * @method addImageElement
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Adds a image element to the list of image elements and generates a cache id for the object.
 *
 * @param  {ImageElement}  image_element  - image element object to add 
 *
 * @return {Number} Returns the length of the list of image element objects
 */

OpenAjax.a11y.cache.ImagesCache.prototype.addImageElement = function (image_element) {

  // item must exist and have the position property
  if (image_element) {
    this.length = this.length + 1;
    image_element.cache_id = "image_" + this.length; 
    image_element.document_order = this.length;
    this.image_elements.push(image_element);
  } 

  return this.length;

};


/**
 * @deprecated getImageElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getImageElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Finds the the image element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of image element object
 *
 * @return {ImageElement | null} Returns cache image element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var image_elements_len = this.image_elements.length;

  if (cache_id && cache_id.length) {  
    for (i=0; i < image_elements_len; i++) {
      if (this.image_elements[i].cache_id == cache_id) {
        return this.image_elements[i];
      }
    } // end loop
  } 

 return null;
};


/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Resests the ImagesCache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.ImagesCache.prototype.emptyCache = function () {

  this.image_elements.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Updates the images cache object by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in images cache
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCacheItems = function (dom_element) {

  if ((dom_element.tag_name == 'img') ||
      (dom_element.tag_name == 'area')) {

    var image_element = new OpenAjax.a11y.cache.ImageElement(dom_element, this.dom_cache.base_url);    
    this.dom_cache.images_cache.addImageElement(image_element);
  
  }
  
};

/**
 * @method traverseDOMElementsForImageElements
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses DOMElement objects in the tree to update the images cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in images cache
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.traverseDOMElementsForImageElements = function (dom_element) {

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    this.updateCacheItems(dom_element);
  
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForImageElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Traverses the DOMElements to update the images cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the links cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating image elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForImageElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed image elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * @method sortImageElements
 *
 * @memberOf OpenAjax.a11y.cache.ImagesCache
 *
 * @desc Sorts image element array by image element object property
 *
 * @param {String}   property   - Property of image element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.ImagesCache.prototype.sortImageElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.image_elements && this.image_elements.length && !this.image_elements[0][property] ) {
    return false;
  } // endif

  var image_elements_len = this.image_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < image_elements_len; i++ ) {
        if (this.image_elements[i-1][property] > this.image_elements[i][property]) {
          // swap the values
          temp = this.image_elements[i-1];
          this.image_elements[i-1] = this.image_elements[i];
          this.image_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < image_elements_len; i++) {
        if (this.image_elements[i-1][property] < this.image_elements[i][property]) {
          // swap the values
          temp = this.image_elements[i-1];
          this.image_elements[i-1] = this.image_elements[i];
          this.image_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.sort_property = property;

  return true;
}; 

/* ---------------------------------------------------------------- */
/*                            ImageElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor ImageElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates image element object representing information related to an image or area element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the image or area element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the image or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the image or area element in the document in relationship to other image or area elements
 *
 * @property  {String}   source             - The url in the src property of an image element or href property of an area element 
 * @property  {Boolean}  src_is_a_file_name - The filename is an image file and not a data base or other programatic reference
 * @property  {String}   file_name          - The filename of the image
 * @property  {String}   longdesc           - The url in the longdesc property of an image element  
 *
 * @property  {String}   alt                   - Calculated accessible name of the link 
 * @property  {String}   alt_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {Number}   alt_length           - Number of images that are descendents of the link
 *  
 * @property  {Number}   height  - Height of the image in pixels
 * @property  {Number}   width   - Width of the image in pixels
 */
 
OpenAjax.a11y.cache.ImageElement = function (dom_element, base_url) {

  var alt_value;

  if (!dom_element) return null;  

  var node = dom_element.node;
 
  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.source    = "";
  this.href      = "";
  this.file_name = "";

  if (dom_element.tag_name == 'img') {
  
    if (node.src) this.source = node.src;
    
    var pos = this.source.lastIndexOf('/');    
    
    var file_name = "";
    this.src_is_a_file_name = false;
    
    if (this.source.length && pos >= 0 ) {
      file_name = this.source.substring((pos+1)).toLowerCase();
      
      if ((file_name.indexOf('.png') >= 0) ||
          (file_name.indexOf('.jpg') >= 0) ||
          (file_name.indexOf('.jpeg') >= 0) ||
          (file_name.indexOf('.gif') >= 0)) this.src_is_a_file_name = true;
    }  
  
    this.file_name = file_name;
  }
  
  if (dom_element.tag_name == 'area') {
    this.href  = node.href;
  }

  this.alt = null;
  this.alt_length = 0;
  this.alt_for_comparison = null;

  if (dom_element.has_alt_attribute) {
    this.alt        = dom_element.alt;
    this.alt_length = dom_element.alt.length;
    this.alt_for_comparison = this.alt.normalizeSpace().toLowerCase();
  }

  this.longdesc = node.getAttribute('longdesc');
  
  if (this.longdesc) {
    if (this.longdesc.indexOf('http:') == -1 ) {
      this.longdesc = base_url + this.longdesc;
    }
    this.has_longdesc = true;
    this.longdesc_is_broken = OpenAjax.a11y.util.urlExists(this.longdesc);
  }
  else {
    this.has_longdesc = false;
    this.longdesc  = null;
  }


  this.height   = node.offsetHeight;
  this.width    = node.offsetWidth;

  return this;
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ImageElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
     
  cache_nls.addPropertyIfDefined(attributes, this, 'href');
  cache_nls.addPropertyIfDefined(attributes, this, 'source');
  cache_nls.addPropertyIfDefined(attributes, this, 'longdesc');
  
  return attributes;
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'alt_length');
  cache_nls.addPropertyIfDefined(properties, this, 'alt_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'height');
  cache_nls.addPropertyIfDefined(properties, this, 'width');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("Image property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};  

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ImageElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method getAltTextNLS
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If alt attribute is empty a empty alt text message will the returned 
 *
 * @return {String | Object} Returns a String if the alt attribute has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ImageElement.prototype.getAltTextNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var alt_style = {};
  
  if (this.dom_element.has_alt_attribute) {
    if (this.alt_length) {
      return this.alt;
    }
    else {
      return cache_nls.getNLSEmptyAltTextMessage();
    }
  }
  else {
    return cache_nls.getNLSMissingAltMessage();
  }
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ImageElement
 *
 * @desc Creates a text string representation of the image element object 
 *
 * @return {String} Returns a text string representation of the image element object
 */
 
 OpenAjax.a11y.cache.ImageElement.prototype.toString = function () {
   var str = this.dom_element.tag_name;
   
   if (this.dom_element.computed_style.is_visible_onscreen == OpenAjax.a11y.VISIBILITY.HIDDEN) {
     str += " (hidden) : ";
   } 
   else {
     str += " (" + this.height + "x" + this.width + ") : ";
   }  
   
   if (this.src_is_a_file_name) {
     str += this.file_name;
   }
   else {
     str +=  "source is not a file name";   
   }
   
   return str;
};


