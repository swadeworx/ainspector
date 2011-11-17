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
/*                      OpenAjax Media Cache                        */ 
/* ---------------------------------------------------------------- */


/**
 * MediaCache
 *
 * @desc Constructor for MediaCache object which contains a list of 
 *    MediaElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  MediaCache object 
 */

OpenAjax.a11y.cache.MediaCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.media_elements = [];
 
  this.sort_property = 'document_order';
  this.sort_ascending = false;
 
  this.up_to_date = false;
  this.length = 0;

  return this;

}; 

/**
 * addMediaElement
 *
 * @desc Adds a MediaElement object to a MediaCache object
 *
 * @param media_element Object media_element object to add to the link cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.MediaCache.prototype.addMediaElement = function ( media_element ) {

  // item must exist and have the position property
  if (media_element) {
    this.length = this.length + 1;
    media_element.cache_id = "media_" + this.length; 
    media_element.document_order = this.length;
    this.media_elements.push( media_element );
  } 

 return this.length;

};

/**
 * getMediaElementByCacheId
 *
 * @desc Returns the MediaElement object with the cache id
 *
 * @param cache_id String  cache id of the MediaElement object
 *
 * @return MediaElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.MediaCache.prototype.getMediaElementByCacheId = function (cache_id) {

  var i;
  var media_elements_len = this.media_elements.length;

  if (cache_id) {  
    for (i=0; i < media_elements_len; i++) {
      if (this.media_elements[i].cache_id == cache_id) {
        return this.media_elements[i];
      }
    } // end loop
  } 
  return null;
};

/**
 * emptyCache
 *
 * @desc Empties the MediaCache of MediaElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.MediaCache.prototype.emptyCache = function () {

  this.media_elements.length = 0;
  this.sort_property = 'document_order';
  this.sort_ascending = false;
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the MediaCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCacheItems = function (dom_element) {

  var media_element;

  if ((dom_element.tag_name == 'object') ||
      (dom_element.tag_name == 'applet') ||
      (dom_element.tag_name == 'embed') ||
      (dom_element.tag_name == 'audio') ||
      (dom_element.tag_name == 'video')) {

    media_element = new OpenAjax.a11y.cache.MediaElement(dom_element);    
    this.dom_cache.media_cache.addMediaElement(media_element);
  }
   
};

/**
 * transverseDOMElementsForMediaElements
 *
 * @desc Traverses the DOMElements to update link elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.transverseDOMElementsForMediaElements = function (dom_element) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i=0; i<dom_element.children.length; i++) {
      this.transverseDOMElementsForMediaElements(dom_element.children[i]);
    } // end loop
  }  
  
};


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating media elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForMediaElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed media elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * sortMediaElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.MediaCache.prototype.sortMediaElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.media_elements && 
      this.media_elements.length && 
      !this.media_elements[0][property] ) {
    return false;
  } // endif

  var media_elements_len = this.media_elements.length;

  if (ascending) {
    do {
      swapped = false;
      for (i=1; i<media_elements_len; i++) {
        if (this.media_elements[i-1][property] > this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < media_elements_len; i++) {
        if (this.media_elements[i-1][property] < this.media_elements[i][property]) {
          // swap the values
          temp = this.media_elements[i-1];
          this.media_elements[i-1] = this.media_elements[i];
          this.media_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.sort_property = property;

  return true;

};

/**
 * MediaElement
 *
 * @desc MediaElement is the object used to hold data about a link and references the DOMElement base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 *
 * @return  MediaElement | null
 */

OpenAjax.a11y.cache.MediaElement = function (dom_element) {

  this.document_order = 0;
 
  this.dom_element = dom_element;

  this.is_video              = OpenAjax.a11y.MEDIA.MAYBE;
  this.is_audio              = OpenAjax.a11y.MEDIA.MAYBE;
  this.has_caption           = OpenAjax.a11y.MEDIA.MAYBE; 
  this.has_text_alternative  = OpenAjax.a11y.MEDIA.MAYBE; 
  this.has_audio_description = OpenAjax.a11y.MEDIA.MAYBE;

  switch (dom_element.tag_name) {
  case 'video':
    this.is_video = OpenAjax.a11y.MEDIA.YES;
    this.is_audio = OpenAjax.a11y.MEDIA.MAYBE;
    break;
    
  case 'audio':
    this.is_video = OpenAjax.a11y.MEDIA.NO;
    this.is_audio = OpenAjax.a11y.MEDIA.YES;
    break;
  
  default:
    this.is_video = OpenAjax.a11y.MEDIA.MAYBE;
    this.is_audio = OpenAjax.a11y.MEDIA.MAYBE;
    break;
  }
  
};

