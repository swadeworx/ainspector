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
/*            OpenAjax Heading and Landmark Cache                   */ 
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/*                    LandmarkInfo Object                           */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc LandmarkInfo is the constructor for information related to landmarks
 *       in building the headings/landmark cache
 *
 * @param {LandmarkInfo}  landmark_info - Current landmark (if any)
 *
 * @property {Control Object}  landmark_element  - Parent landmark element 
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
  }
  else {
    this.landmark_element = null;
  }
 
};

/* ---------------------------------------------------------------- */
/*                     HeadingsLandmarksCache                       */ 
/* ---------------------------------------------------------------- */

/**
 * @constructs HeadingsLandmarksCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc HeadingsLandmarksCache is the constructor for lists of heading and landmrk element objects and
 *       the root of a tree representation of the landmark and heading element relationships
 *
 * @param {DOMCache}  dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}  child_cache_elements  - Root array of the tree representation of the landmarks and headings in the document 
 *
 * @property {Array}   landmark_elements        - List of all the landmark elements in the document 
 * @property {String}  landmarks_sort_property  - Name of the landmark element property the landmark elements array is currently sorted
 * @property {Number}  landmark_length          - The length of the landmark elements list, used in calculating cache id values 
 *
 * @property {Array}   heading_elements        - List of all the heading elements in the document 
 * @property {String}  headings_sort_property  - Name of the heading element property the heading elements array is currently sorted
 * @property {Number}  heading_length          - The length of the heading elements list, used in calculating cache id values 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  
  this.up_to_date    = false;
 
  this.child_cache_elements   = [];
  
  this.landmark_elements = [];
  this.landmarks_sort_property = 'document_order';
  this.landmark_length  = 0;
  
  this.heading_elements = [];  
  this.headings_sort_property  = 'document_order';
  this.heading_length  = 0;
   
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
  
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Adds a landmark or header element object to the root level of a tree of landmark/heading elements  
 *
 * @param {LandmarkElement | HeadingElement} child_element - Landmark or heading element object to add
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  } 

};

/**
 * @method addLandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a landmark element object to the heading elements list
 *
 * @param  {LandmarkElement} heading_element  - Landmark element object to a landmark elements list
 *
 * @return {Number} Returns the length of the landmark elements list
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addLandmarkElement = function (landmark_element) {

  if (landmark_element) {
    this.landmark_length = this.landmark_length + 1;
    landmark_element.document_order = this.landmark_length;
    landmark_element.cache_id = "landmark_" + this.landmark_length;
    this.landmark_elements.push(landmark_element);
  } 
  
  return this.landmark_length;
};

/**
 * @method addHeadingElement
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc   Adds a heading element object to the heading elements list
 *
 * @param  {HeadingElement} heading_element  - HeadingElement object to a heading_elements array
 *
 * @return {Number} Returns the length of the heading elements list
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addHeadingElement = function (heading_element) {

  if (heading_element) {
    this.heading_length = this.heading_length + 1;
    heading_element.document_order = this.heading_length;
    heading_element.cache_id = "heading_" + this.heading_length;
    this.heading_elements.push(heading_element);
  } 
  return this.heading_length;
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark or heading element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | HeadingElement | null} Returns a landmark element object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getItemByCacheId = function (cache_id) {

  var item = this.getLandmarkElementByCacheId(cache_id);
  if (item) return item;
  
  item = this.getHeadingElementByCacheId(cache_id);
  
  return item;

};

/**
 * @method getLandmarkElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the landmark element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a landmark element object
 *
 * @return  {LandmarkElement | null} Returns a landmark element object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getLandmarkElementByCacheId = function (cache_id) {
 
  var i; 
  var landmark_elements_len = this.landmark_elements.length;

  if (cache_id) {
    for (i=0; i<landmark_elements_len; i++) {
      if (this.landmark_elements[i].cache_id == cache_id) {
        return this.landmark_elements[i];
      } 
    } // end loop
  }
 return null;
};

/**
 * @method getHeadingElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Finds the heading element object with the cache id value 
 *
 * @param  {String}  cache_id  - cache id of a heading element object
 *
 * @return  {HeadingElement | null}  Returns a heading object if cache id found, otherwise null
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getHeadingElementByCacheId = function (cache_id) {
 
  var i;
  var heading_elements_len = this.heading_elements.length;

  if (cache_id) {
    for (i=0; i<heading_elements_len; i++) {
      if (this.heading_elements[i].cache_id == cache_id) {
        return this.heading_elements[i];
      } 
    } // end loop
  }
 
  return null;
};

/**
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Empties the landmark and headings cache 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.initCache = function () {

  this.child_cache_elements  = [];
  
  this.up_to_date = false;
 
  this.landmark_elements = [];
  this.landmark_length = 0;
  this.landmarks_sort_property = 'document_order';
  
  this.heading_elements = [];
  this.heading_length = 0;
  this.headings_sort_property = 'document_order';
 
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Updates the landmarks and headings cache by checking to see if a DOMElement
 *          should be added
 *  
 * @param  {DOMElement}    dom_element    - DOMElement object to check for inclusion in links cache
 * @param  {LandmarkInfo}  landmark_info  - Information about the current landmarks that are parents to this item
 * 
 * @return {LandmarkInfo}  Returns updated landmark info object
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCacheItems = function (dom_element, landmark_info) {

  var me;
  var le;
  var he;
  var li = new OpenAjax.a11y.cache.LandmarkInfo(landmark_info);

  if ((dom_element.role == 'region')    ||
      (dom_element.role == 'main')     || 
      (dom_element.role == 'navigation')  ||
      (dom_element.role == 'search')    ||
      (dom_element.role == 'applicaton')  ||
      (dom_element.role == 'banner')    ||
      (dom_element.role == 'complementary') ||
      (dom_element.role == 'contentinfo')  ||
      (dom_element.role == 'form')) {
   
    le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, landmark_info.landmark_element);    

    this.dom_cache.getNameFromARIALabel(le);

    this.addLandmarkElement(le);

    if (landmark_info.landmark_element) {
      landmark_info.landmark_element.addChildElement(le);
    } 
    else {
      this.addChildElement(le);  
    }
  
    li.landmark_element = le;

    return li;
  }
 
  if ((dom_element.tag_name == 'h1') ||
      (dom_element.tag_name == 'h2') || 
      (dom_element.tag_name == 'h3') || 
      (dom_element.tag_name == 'h4') || 
      (dom_element.tag_name == 'h5') || 
      (dom_element.tag_name == 'h6')) {
   
    he = new OpenAjax.a11y.cache.HeadingElement(dom_element);    
  
    this.addHeadingElement(he);

    if (landmark_info.landmark_element) {
      landmark_info.landmark_element.addChildElement(he);  
    } 
    else {
      this.addChildElement(he);  
    }

    return li;
  }

  return li;
  
};

/**
 * @method traverseDOMElementsForLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses DOMElement objects in the tree to update the landmarks and headings cache 
 *
 * @param  {DOMElement}  dom_element - DOMElement object to check for inclusion in landmarks and headings cache
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.traverseDOMElementsForLandmarkElements = function (dom_element, landmark_info) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    var li = this.updateCacheItems(dom_element, landmark_info);
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForLandmarkElements(dom_element.child_dom_elements[i], li);
    } 
  }
};


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc Traverses the DOMElements to update the landmarks and heading cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the landmark and headings cache are disabled, this 
 *       cache would not be updated
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCache = function () {
  var i;
  var li;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.initCache();
 
  li = new OpenAjax.a11y.cache.LandmarkInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating landmark elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLandmarkElements(children[i], li);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed landmark elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};


/**
 * @method sortLandmarkElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc    Sorts the landmark elements list based on a property of the landmark element object
 *
 * @param   {String}   property   - LandmarkElement object property used to sort the cache
 * @param   {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  Return true if list was sorted; false was not sorted due to an error
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortLandmarkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.landmark_elements && this.landmark_elements.length && !this.landmark_elements[0][property] ) {
    return false;
  } // endif

  var landmark_elements_len = this.landmark_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++ ) {
        if (this.landmark_elements[i-1][property] > this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < landmark_elements_len; i++) {
        if (this.landmark_elements[i-1][property] < this.landmark_elements[i][property]) {
          // swap the values
          temp = this.landmark_elements[i-1];
          this.landmark_elements[i-1] = this.landmark_elements[i];
          this.landmark_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.landmark_sort_property = property;

  return true;

};

/**
 * @method sortHeadingElements
 *
 * @memberOf OpenAjax.a11y.cache.HeadingsLandmarksCache
 *
 * @desc  Sorts the heading_elements array based on a property of the HeadingElement object
 *
 * @param {String}   property   - HeadingElement object property used to sort the cache
 * @param {Boolean}  ascending  -  true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  true if list was sorted, false if not
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.sortHeadingElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if( this.heading_elements && this.heading_elements.length && !this.heading_elements[0][property] ) {
    return false;
  } // endif

  var heading_elements_len = this.heading_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < heading_elements_len; i++ ) {
        if (this.heading_elements[i-1][property] > this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        } 
      } // end loop

    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < heading_elements_len; i++) {
   
        if (this.heading_elements[i-1][property] < this.heading_elements[i][property]) {
          // swap the values
          temp = this.heading_elements[i-1];
          this.heading_elements[i-1] = this.heading_elements[i];
          this.heading_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.heading_sort_property = property;

  return true;

};

/* ---------------------------------------------------------------- */
/*                       LandmarkElement                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LandmarkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a landmark element object used to hold information about a landmark 
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the landmark element 
 * @param  {LandmarkElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the landmark element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the landmark element in the document in relationship to other landmark elements
 *
 * @property  {Array}  child_cache_elements  - Array of child cache landmark and heading element objects as part of cache landmark and header tree 
 *
 * @property  {String}   label                  - Accessible label of the landmark 
 * @property  {Number}   label_length           - Length of label text 
 * @property  {Number}   label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...) 
 * @property  {String}   label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.LandmarkElement = function (dom_element, parent_landmark) {

  this.dom_element           = dom_element;
  this.cache_id              = "";
  this.document_order        = 0;

  this.child_cache_elements  = [];

  this.parent_landmark       = parent_landmark;
 
  this.label                 = "";
  this.label_length          = 0;
  this.label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.label_for_comparison  = "";
 
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Adds a LandmarkElement or HeaderElement object to the tree of landmark/heading elements  
 *
 * @param {LandmarkElement | HeadingElement}  child_element  - Landmark element or heading element object to add 
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_cache_elements.push(child_element); 
  }  

}; 


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LandmarkElement
 *
 * @desc Returns a text string representation of the landmark element 
 *
 * @return {String} Returns string represention the landmark element object
 */
 
OpenAjax.a11y.cache.LandmarkElement.prototype.toString = function () {
 if (this.label && this.label_length) {
   return this.dom_element.role + " landmark: " + this.label;  
 }
 else {
   return this.dom_element.role + " landmark: no label";   
 }
}; 

/* ---------------------------------------------------------------- */
/*                       HeadingElement                             */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor HeadingElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a heading element object used to hold information about a h1 - h6 heading elements 
 *
 * @param  {DOMelement}       dom_element      - The dom element object representing the heading element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the heading element in the document in relationship to other heading elements
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * @property  {String}   name_from_text_nodes  - Accessible name content from text nodes
 * @property  {String}   name_from_image_alt   - Accessible name content from alt content of images
 * @property  {Number}   image_count           - Number of images that are descendents of the link
 * @property  {Boolean}  text_only_from_image  - true if accessble name is onky from an image, otherwise false 
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element) {
 
  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;
   
  switch( dom_element.tag_name ) {
  case 'h1':
    this.level = 1;
    break;
    
  case 'h2':
    this.level = 2;
    break;
    
  case 'h3':
    this.level = 3;
    break;
    
  case 'h4':
    this.level = 4;
    break;
    
  case 'h5':
    this.level = 5;
    break;
    
  case 'h6':
    this.level = 6;
    break;
    
  default:
    this.level = 0;   
    break;
  } // end switch

  var ano = dom_element.getTextObject();
  
  this.name                  = ano.name;
  this.name_length           = ano.name.length;
  this.name_for_comparison   = ano.name.normalizeSpace().toLowerCase();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt   = ano.name_from_image_alt;
  this.image_count           = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  return this;
    
};


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_text_nodes');
 cache_nls.addPropertyIfDefined(properties, this, 'name_from_image_alt');
 cache_nls.addPropertyIfDefined(properties, this, 'image_count');
 cache_nls.addPropertyIfDefined(properties, this, 'text_only_from_image');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.HeadingElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.HeadingElement
 *
 * @desc Returns a text string representation of the heading (h1-h6) element 
 *
 * @return {String} Returns string represention the heading element object
 */
  
OpenAjax.a11y.cache.HeadingElement.prototype.toString = function() {
  if (this.name && this.name_length) {
    return "H" + this.level + ": " + this.name;
  }
  else {
    return "H" + this.level + ": no content";
  }

};
