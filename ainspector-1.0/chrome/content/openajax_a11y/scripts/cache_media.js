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
/*                      OpenAjax Media Cache                        */ 
/* ---------------------------------------------------------------- */


/**
 * @constructor MediaCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to audio, video and other media objects in a document
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    media_elements  - List of media element objects in the document 
 * @property {Number}   length          - Number of media element objects in the list 
 *
 * @property {String}   sort_property   - Image element object property the list of media objects is sorted by
 * @property {Boolean}  sort_ascending  - true if list is sorted in ascending order, otherwise false 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.MediaCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.media_elements = [];
  this.length = 0;
 
  this.sort_property = 'document_order';
  this.sort_ascending = false;
 
}; 

/**
 * @method addMediaElement
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Adds a media element object to the list of media elements and generates a cache id for the object.
 *
 * @param  {MediaElement}  media_element  - media element object to add 
 *
 * @return {Number} Returns the length of the list of media element objects
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
 * @method getMediaElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getMediaElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Finds the the media element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of media element object
 *
 * @return {MediaElement | null} Returns cache media element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.MediaCache.prototype.getItemByCacheId = function (cache_id) {

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
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Resests the media cache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.MediaCache.prototype.emptyCache = function () {

  this.media_elements.length = 0;
  this.sort_property = 'document_order';
  this.sort_ascending = false;
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Updates the media cache by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - dom element object to check for inclusion in media cache
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
 * @method traverseDOMElementsForMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses DOMElement objects in the tree to update the media cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in media cache
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.traverseDOMElementsForMediaElements = function (dom_element) {

  var i;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    this.updateCacheItems(dom_element);
  
    for (i=0; i<dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForMediaElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Traverses the DOMElements to update the media cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the media cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.MediaCache.prototype.updateCache = function () {
  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating media elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForMediaElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed media elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/**
 * @method sortMediaElements
 *
 * @memberOf OpenAjax.a11y.cache.MediaCache
 *
 * @desc Sorts media element array by a media element object property
 *
 * @param {String}   property   - Property of media element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
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


/* ---------------------------------------------------------------- */
/*                            MediaElement                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor MediaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates media element object representing information related to an object, video, audio, embed or applet element on a web page
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the media element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the media element
 * @property  {String}      cache_id        - String that uniquely identifies the media element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the media element in the document in relationship to other media elements
 *
 * @property  {Number}  is_video               - Constant indicating the probability of the media element including video
 * @property  {Number}  is_audio               - Constant indicating the probability of the media element including audio
 * @property  {Number}  has_caption            - Constant indicating the probability of the media element having a caption 
 * @property  {Number}  has_text_alternative   - Constant indicating the probability of the media element having a text description
 * @property  {Number}  has_audio_description  - Constant indicating the probability of the media element having an audio description
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
    break;
  }
  
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MediaElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getStyle = function () {

  return  this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'alt');

  return attributes;
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'is_video');
  cache_nls.addPropertyIfDefined(properties, this, 'is_audio');
  cache_nls.addPropertyIfDefined(properties, this, 'has_caption');
  cache_nls.addPropertyIfDefined(properties, this, 'has_text_alternative');
  cache_nls.addPropertyIfDefined(properties, this, 'has_audio_description');
  cache_nls.addPropertyIfDefined(properties, this, 'alt_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'document_order');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MediaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MediaElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MediaElement
 *
 * @desc Creates a text string representation of the media element object 
 *
 * @return {String} Returns a text string representation of the media element object
 */
 
 OpenAjax.a11y.cache.MediaElement.prototype.toString = function () {
   return this.dom_element.tag_name;
 };

