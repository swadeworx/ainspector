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
/*                            ImageCache                            */
/* ---------------------------------------------------------------- */

/**
 * ImageCache
 *
 * @desc Constructor for ImageCache object which contains a list of 
 *    ImageElements representing the accessibility information of
 *    images in a document
 *
 * @constructs
 *
 * @return  ImageCache object 
 */
  
OpenAjax.a11y.cache.ImagesCache = function (dom_cache) {

 this.dom_cache = dom_cache;
 this.image_elements = [];
 this.sort_property = 'document_order';
 this.up_to_date = false;
 this.length = 0;

 return this;

}; 

/**
 * addImageElement
 *
 * @desc Adds a ImageElement object to a ImageCache object
 *
 * @param image_element Object  image_element object to add to the image cache
 *
 * @return length  Number  length is the number of elements in the cache
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
 * getImageElementByCacheId
 *
 * @desc Returns the ImageElement object with the cache id
 *
 * @param cache_id String  cache id of the ImageElement object
 *
 * @return ImageElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.ImagesCache.prototype.getImageElementByCacheId = function (cache_id) {

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
 * emptyCache
 *
 * @desc Empties the ImageCache of ImageElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.ImagesCache.prototype.emptyCache = function () {

 this.image_elements.length = 0;
 this.sort_property = 'document_order';
 this.up_to_date = false;

};

/**
 * updateCacheItem
 *
 * @desc Updates the ImagesCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in images cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'img') ||
   (dom_element.tag_name == 'area')) {

  var image_element = new OpenAjax.a11y.cache.ImageElement(dom_element, this.dom_cache.base_url);    
  this.dom_cache.images_cache.addImageElement(image_element);
  
 }
  
};

/**
 * transverseDOMElementsForImageElements
 *
 * @desc Traverses the DOMElements to update image elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.transverseDOMElementsForImageElements = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.updateCacheItems(dom_element);
  
  for (var i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForImageElements(dom_element.children[i]);
  } // end loop
  
 }  
  
}; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the image cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ImagesCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating image elements cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForImageElements(children[i]);
 }  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed image elements cache update, number of cache items is " + this.length);

 this.up_to_date = true;
};

/**
 * sortImageElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
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

/**
 * ImageElement
 *
 * @desc ImageElement is the object used to hold information about an image and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 *
 * @return  ImageElement | null
 */ 

OpenAjax.a11y.cache.ImageElement = function (dom_element, base_url) {

 if (!dom_element) return null;  

 var node = dom_element.node;
 
 this.dom_element = dom_element;

 this.source     = node.src;
 
 if (node.tag_name == 'area') {
  this.source     = node.href;
 }
 
 if (this.dom_element.has_alt_attribute || this.dom_element.node.alt.length) {
  this.has_alt  = true;
  this.alt    = node.alt;
  this.alt_length = this.alt.length;
  this.alt_for_comparison = this.alt.trim().normalizeSpace().toLowerCase();
 }
 else {
  this.has_alt = false;
  this.alt  = null;
  this.alt_length = null;
  this.alt_for_comparison = null;
 }

 this.longdesc = node.getAttribute('longdesc');

 if (this.longdesc) {
  if (this.longdesc.indexOf('http:') == -1 ) {
   this.longdesc = base_url + this.longdesc;
  }
  this.has_longdesc = true;
 }
 else {
  this.has_longdesc = false;
  this.longdesc  = null;
 }

 this.height   = node.offsetHeight;
 this.width    = node.offsetWidth;

 return this;
};


