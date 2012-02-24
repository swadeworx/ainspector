/*
 * Copyright 2011, 2012 OpenAjax Alliance
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
/*                            ListsCache                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for lists cache object which contains a list of 
 *    list items representing the list (i.e ul, ol , dl, li, dt and dd) 
 *    elements defined in a document. 
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the list elements in the document 
 *
 * @property {Array}   container_elements  - List of the container element objects in the document that are not children of a container item 
 * @property {Number}  length              - Number of containter element objects in list 
 *
 * @property {String}   sort_property   - Property of contanter element objectthe list is sorted on  
 * @property {Boolean}  sort_ascending  - true if list is sorted by ascending values, otherwise false 
 *
 * @property {Number}  landmark_count   - Number of containter element objects in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.ListsCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.child_cache_elements = []; 

  this.container_elements = [];  
  this.length = 0;

  this.sort_property  = 'document_order';
  this.sort_ascending = true;

  this.landmark_count  = 0;
  
  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
};

/** 
 * @method addContainerElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Adds a container element object to the list of container elements  
 *
 * @param  {ContainerElement} container_element   - Container element object to add 
 *
 * @return  {Number} Returns the number of container element objects in the list of container element objects
 */

OpenAjax.a11y.cache.ListsCache.prototype.addContainerElement = function (container_element) {

  if (container_element) {
    this.length += 1;
    container_element.document_order = this.length;
    container_element.cache_id = "con_" + this.length;
    this.container_elements.push(container_element);
    return true;
  }

  return false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Update the ListsCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new list element object should be added to this cache.
 *
 * @param  {DOMElement}   dom_element  - dom element object to check for inclusion in lists cache
 * @param  {ListInfo}     list_info    - Information about the current list relationships in the DOM
 *
 * @return {ListInfo}  Returns updated list information object 
 */

OpenAjax.a11y.cache.ListsCache.prototype.updateCacheItems = function (dom_element, list_info) {

  var li = new OpenAjax.a11y.cache.ListInfo(list_info);

  // check whether we need to add a new ListElement
  switch (dom_element.tag_name) {
  
  case 'ul':
  case 'ol':
  case 'dl':
  
    var ce = new OpenAjax.a11y.cache.ContainerElement(dom_element, list_info);
    
    if (!list_info.container_element) this.addContainerElement(ce);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(ce);
    }
    else {
      this.addChildElement(ce);
    }

    li.container_element = ce;
    li.list_element      = ce;
    break;

  case 'li':
  case 'dt':
  case 'dd':

    var le = new OpenAjax.a11y.cache.ListElement(dom_element, list_info.container_element);

    if (list_info.container_element) list_info.container_element.addListElement(le);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(le);
    }
    else {
      this.addChildElement(le);
    }
    
    li.list_element = le;

    break;

  case 'a':
  
    if (list_info.list_element &&
        (dom_element.node.href && dom_element.node.href.length)) {
      list_info.list_element.link_count += 1;
    }

    break;
  
  default:
    break;
  
  } // end switch
  
  if ((dom_element.role == 'region')    ||
      (dom_element.role == 'main')     || 
      (dom_element.role == 'navigation')  ||
      (dom_element.role == 'search')    ||
      (dom_element.role == 'applicaton')  ||
      (dom_element.role == 'banner')    ||
      (dom_element.role == 'complementary') ||
      (dom_element.role == 'contentinfo')  ||
      (dom_element.role == 'form')) {
   
    le = new OpenAjax.a11y.cache.LandmarkElement(dom_element, list_info.parent_landmark);   
    
    le.cache_id = "listLandmark_" + this.landmark_count;
    
    this.landmark_count += 1;

    this.dom_cache.getNameFromARIALabel(le);

    if (list_info.list_element) {
      list_info.list_element.addChildElement(le);
    }
    else {
      this.addChildElement(le);
    }
  
    li.parent_landmark = le;
    li.list_element    = le;
    
  }

  return li;

};

/**
 * @method traverseDOMElementsForListElements
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the abbreviation cache
 */
 
OpenAjax.a11y.cache.ListsCache.prototype.traverseDOMElementsForListElements = function (dom_element, list_info) {
 
  var i;
  var li;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    li = this.updateCacheItems(dom_element, list_info);
  
    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForListElements(dom_element.child_dom_elements[i], li);
    } // end loop
  
  }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Traverses the DOMElements to update the list cache
 *    This function is used to update the list cache 
 *    when needed by a rule, it sets the up to date flag when done
 */
 
OpenAjax.a11y.cache.ListsCache.prototype.updateCache = function () {

 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;
 
 var list_info = new OpenAjax.a11y.cache.ListInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating list cache.");
 for (i = 0; i < children_len; i++) {
  this.traverseDOMElementsForListElements(children[i], list_info);
 }  
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed list cache update.");

 this.up_to_date = true;
};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Add a top-level list element object to the lists cache
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @deprecated getListElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc retrieve list element from lists cache based on its cache id
 *
 * @param  {String}  cache_id  -  cache id of the list cache element object to find
 *
 * @return {ListElement} Returns list cache object if cache id found, otherwise null 
 */

OpenAjax.a11y.cache.ListsCache.prototype.getListElementByCacheId = function (cache_id) {
 return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc retrieve list element from lists cache based on its cache id
 *
 * @param  {String}  cache_id  -  cache id of the list cache element object to find
 *
 * @return {ListElement} Returns list cache object if cache id found, otherwise null 
 */

OpenAjax.a11y.cache.ListsCache.prototype.getItemByCacheId = function (cache_id) {

  function findCacheID(child_elements) {

    var i; // loop counter
    var max; // loop control
    var le;
    var res;

    max = child_elements.length;
    for (i = 0; i < max; i++) {
      le = child_elements[i];
      if (le.cache_id === cache_id) {
        return le;
      }
      else {
        res = findCacheID(le.child_cache_elements);
        if (res) return res;
      }
    }
      
    return null;
  }

  return findCacheID(this.child_cache_elements);
  
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Empties all the properties of the list cache 
 */

OpenAjax.a11y.cache.ListsCache.prototype.emptyCache = function () {

  this.dom_cache = null;
  this.up_to_date = false;
  
  this.child_elements     = []; 

  this.container_elements = [];  
  this.length = 0;

  this.sort_property  = 'document_order';
  this.sort_ascending = true;
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListsCache
 *
 * @desc Returns a text string representation of the lists cache object 
 *
 * @return {String} Returns string represention the lists cache object
 */

OpenAjax.a11y.cache.ListsCache.prototype.toString = function () {

 var str ="\n\nList Information\n";

 var list_length = this.container_elements.length;
 
 for (var i=0; i < list_length; i++ ) {
  str += this.container_elements[i].toString();  
 } // end loop

 return str;
};

/* ---------------------------------------------------------------- */
/*                            ListElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a LI, DT, DD element in the DOM
 *
 * @param  {DOMelement}        dom_element       - The dom element object representing the input element 
 * @param  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the list element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the list element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the list element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree 
 *
 * @property  {Number}  link_count    - Number of links in this list element
 */

OpenAjax.a11y.cache.ListElement = function (dom_element, parent_container) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.parent_container  = parent_container;
  this.list_type = OpenAjax.a11y.LIST.ITEM;

  this.child_cache_elements = [];
  this.link_count = 0;

};

/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Add a list element object to the tree of list cache items 
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ListElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ListElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ListElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'list_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ListElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ListElement
 *
 * @desc Returns a text string representation of the list item object 
 *
 * @return {String} Returns string represention the list item object
 */

OpenAjax.a11y.cache.ListElement.prototype.toString = function () {

 return "List Item " + this.document_order + ": " + this.dom_element.getText(); 
 
};

/* ---------------------------------------------------------------- */
/*                           ContainerElement                       */
/* ---------------------------------------------------------------- */

/**
 * @constructor ContainerElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a OL, UL, DL element in the DOM
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the input element 
 * @param  {ListInfo}    list_info    - Current list information about 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the container element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the container element in the document
 *
 * @property  {ContainerElement}  parent_container  - Reference to the container element the container element is contained in
 * @property  {LandmarkElement}   parent_landmark   - Reference to the landmark element the container element is contained in
 * @property  {Number}            list_type         - Type of list cache element object
 *
 * @property  {Array}   child_cache_elements  - Array of child cache list elements as part of list cache tree 
 */

OpenAjax.a11y.cache.ContainerElement = function (dom_element, list_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.parent_container  = list_info.parent_container;
  this.parent_landmark   = list_info.parent_landmark;
  
  this.list_type = OpenAjax.a11y.LIST.CONTAINER;

  this.child_cache_elements = [];
  this.link_count = 0;

  this.list_elements = [];
  this.length = 0;

};

/**
 * @method addListElement
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Add a list element object to the list of list items 
 *
 * @param {ListElement} list_element - list element object to add to the list of list elements
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ContainerElement.prototype.addListElement = function (list_element) {

  if (list_element) {
    this.length += 1;
    list_element.document_order = this.length;
    list_element.cache_id = this.cache_id + "_li_" + this.length;
    this.list_elements.push(list_element);
    return true;
  }

  return false;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Add a list element object to the tree of list cache items 
 *
 * @param {ContainerElement | ListElement | LandmarkElement } list_element - list cache element object to add to the list cache
 *
 * @return {boolean} indicating success or failure
 */

OpenAjax.a11y.cache.ContainerElement.prototype.addChildElement = function (list_element) {

  if (list_element) {
    this.child_cache_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * @method isListOfLinks
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Check whether a list container contains at least the
 *       minimum number of li elements with one and only one link.
 *
 * @param {Number}  min_li  The minimum number of list elements with one link
 *                          that the list element must contain.
 *
 * @return {boolean} Returns true if the list is considered a list of links, otherwise false
 */

OpenAjax.a11y.cache.ContainerElement.prototype.isListOfLinks = function (min_li) {
 
  var child_elements = this.child_cache_elements;
  var max = child_elements.length;
  var i;  // loop counter
  var ce; // loop placeholder

  // results
  var count_li = 0;
  var count_li_with_link = 0;

  for (i = 0; i < max; i++) {
    ce = child_elements[i];

    // ignore elements that are not 'li'
    if (ce.list_type !== OpenAjax.a11y.LIST.ITEM) continue;

    // we've got an 'li' element
    count_li += 1;

    // but each must have a link_count of 1
    if (ce.link_count != 1) return false;
    count_li_with_link += 1;
  }

  return (count_li == count_li_with_link) && (count_li >= min_li);

};

/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getResultRules = function () {
  return this.dom_element.getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
  
  cache_nls.addPropertyIfDefined(properties, this, 'list_type');
  cache_nls.addPropertyIfDefined(properties, this, 'link_count');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ContainerElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ContainerElement
 *
 * @desc Returns a text string representation of the container element object 
 *
 * @return {String} Returns string represention the container element object
 */

OpenAjax.a11y.cache.ContainerElement.prototype.toString = function () {

 return "List Container " + this.document_order + " with " + this.child_cache_elements.length + " list items"; 
 
};


/* ---------------------------------------------------------------- */
/*                              ListInfo                            */
/* ---------------------------------------------------------------- */

/**
 * @constructor ListInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a list information object for preserving the current list information 
 *        when traversing the DOM
 *
 * @param {ListInfo} list_info - Current list information object
 *
 * @property {ListElement | ContainerElement}  list_element      - Parent container list or container element object 
 * @property {ContainerElement}                container_element - Parent container element object 
 * @property {LandmarkElement}                 landmark_element  - Parent landmark element object 
 */

OpenAjax.a11y.cache.ListInfo = function (list_info) {

  if (list_info) {
    this.list_element      = list_info.list_element;
    this.container_element = list_info.container_element;
    this.landmark_element  = list_info.landmark_element;
  }
  else {
    this.list_element      = null;
    this.container_element = null;
    this.landmark_element  = null;
  }

};
