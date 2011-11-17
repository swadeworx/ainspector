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

// DOM Node Type Constants 

var NODE_TYPE = {};

NODE_TYPE.ELEMENT  = 1;
NODE_TYPE.ATTRIBUTE = 2;
NODE_TYPE.TEXT   = 3;
NODE_TYPE.COMMENT  = 8;
NODE_TYPE.DOCUMENT = 9;

/* ---------------------------------------------------------------- */
/*                            DOMCache                              */
/* ---------------------------------------------------------------- */

/**
 * OpenAjax.a11y.cache.DOMCache
 *
 * @desc Constructor of a DOMCache Object
 *    Initializes an empty DOM cache and specialized caches
 *
 * @return DOMCache Object
 */

OpenAjax.a11y.cache.DOMCache = function (url, title, document, language, log) {


 this.url = url;
 this.base_url = this.url;

 var pos = this.base_url.lastIndexOf('/');
 if (pos >= 0) {
  this.base_url = this.base_url.substring(0,(pos+1));
 }
 else {
  this.base_url = this.base_url + "/";
 }

 this.title = title;
 this.document = document;
 this.language = language;
 this.log = log;

 OpenAjax.a11y.console("\n  TITLE: " + this.title);
 OpenAjax.a11y.console("   URL: " + this.url);
 OpenAjax.a11y.console("BASE URL: " + this.base_url);
 OpenAjax.a11y.console("LANGUAGE: " + this.language + "\n\n");
};

/**
 *
 * initCache
 *
 * @desc Initialize specialized caches
 *    The specialized caches will be updated all at once or or when
 *    needed by a rule depending on how an evaluation is requested
 *
 * @return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.initCache = function () {

 this.element_with_id_cache = new OpenAjax.a11y.cache.DOMElementCache();
 this.element_cache         = new OpenAjax.a11y.cache.DOMElementCache();

 this.abbreviations_cache      = new OpenAjax.a11y.cache.AbbreviationsCache(this);
 this.color_contrast_cache     = new OpenAjax.a11y.cache.ColorContrastCache(this);
 this.controls_cache           = new OpenAjax.a11y.cache.ControlsCache(this);
 this.headings_landmarks_cache = new OpenAjax.a11y.cache.HeadingsLandmarksCache(this);
 this.images_cache             = new OpenAjax.a11y.cache.ImagesCache(this);
 this.languages_cache          = new OpenAjax.a11y.cache.LanguagesCache(this);
 this.links_cache              = new OpenAjax.a11y.cache.LinksCache(this);
 this.lists_cache              = new OpenAjax.a11y.cache.ListsCache(this);
 this.media_cache              = new OpenAjax.a11y.cache.MediaCache(this);
 this.tables_cache             = new OpenAjax.a11y.cache.TablesCache(this);

};

/**
 * isUpToDate
 *
 * @desc Checks to see if the specified cache is up to date
 *
 * @param cache_name String Cache to update
 *
 * @return Object with two properties:
 *     o.up_to_date Boolean true if cache is up to date, otherwise false
 *     o.exists   Boolean true if cache exists, otherwise false
 */

OpenAjax.a11y.cache.DOMCache.prototype.isUpToDate = function (cache_name) {

 if (this[cache_name])
  return { up_to_date: this[cache_name].up_to_date, exists : true };
 else
  return { up_to_date: false, exists : false };

};

/**
 * updateCache
 *
 * @desc Updates the specified cache
 *
 * @param cache_name String name of the cache to update
 *
 * @return Boolean true if cache is updated, false if cache does not exist
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateCache = function (cache_name) {

 if (this[cache_name]) {
  if (!this[cache_name].up_to_date) {
   this[cache_name].updateCache();
  }
  return true;
 }

 return false;

};

/**
 * traverseDOMElementsForAllCaches
 *
 * @desc Updates all the specialized caches at one time, in general this
 *    is faster than updating the caches individually based on the
 *    needs of rules, but may create caches that will not be used if
 *    some rules are disabled
 *
 * @param dom_element     Object Current DOMElement object being processed
 * @param landmark_info    Object
 * @param table_info      Object
 * @param control_info     Object
 * @param language_element   Object Current LanguageElement object that contains the DOMElement
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.traverseDOMElementsForAllCaches = function (dom_element,
                                          landmark_info,
                                          table_info,
                                          control_info,
                                          list_info) {

 if (!dom_element) return;
 // if an element for through all the children elements looking for text

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.color_contrast_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);
  this.media_cache.updateCacheItems(dom_element);

  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
  var li = this.lists_cache.update(dom_element, list_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);

  var children_length = dom_element.children.length;
  for (var i = 0; i<children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.children[i], hi, ti, ci, li);
  } // end loop
 }
};


/**
 *
 * updateAllCaches
 *
 * @desc Updates all the defined specialized caches
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateAllCaches = function () {
 var i;
 var children = this.element_cache.children;
 var children_len = children.length;

 var hi = new OpenAjax.a11y.cache.LandmarkInfo(null);
 var ti = new OpenAjax.a11y.cache.TableInfo(null);
 var ci = new OpenAjax.a11y.cache.ControlInfo(null);
 var li = new OpenAjax.a11y.cache.ListInfo(null);

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating all caches");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForAllCaches(children[i], hi, ti, ci, li);
 }

 this.controls_cache.calculateControlLabels();

 this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed updating all caches");

};

/**
 *
 * updateDOMElementCache
 *
 * @desc Updates a DOMElement caches that are used by specialized caches
 *
 * @return DOMCache Object
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElementCache = function () {

 var de;

 this.initCache();
 
 // add title information to DOMElement Cache
 
 this.addTitleDOMElement();

 // if the page contains a body element start there, since there are fewer elements to traverse
 if (this.document && this.document.body) {
  // OpenAjax.a11y.console("Creating DOM elements from body element");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements");
  this.updateDOMElements(this.document.body, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.console("Creating DOM elements with frames");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements using frames");
  this.updateDOMElements(this.document, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }

 // Identify elements with duplicate ID values
 this.element_with_id_cache.checkForUniqueIDs();

 return this;

};

/**
 * addTitleDOMElement
 *
 * @desc Adds a DOMElement to represent a TITLE
 *
 * @return 
 */

OpenAjax.a11y.cache.DOMCache.prototype.addTitleDOMElement = function () {

  var n;
  var node;
  var de;
  var titles = this.document.getElementsByTagName('title');

  if (titles && titles.length && titles[0]) {
  
    node = titles[0];

    de = new OpenAjax.a11y.cache.DOMElement(node, null);
    
    de.hasTitle = true;

    de.addComputedStyle(null);
    de.calculateXPath(null);
  
    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);
 
    // get any text nodes associated with the title element
    for (n = node.firstChild; n !== null; n = n.nextSibling) {
      this.updateDOMElements( n, de);
    } // end loop
    
  }
  else {
  
    node = this.document.createElement('title');
    
    de = new OpenAjax.a11y.cache.DOMElement(node, null);
    
    de.hasTitle = false;

    de.addComputedStyle(null);
    de.xpath = "";
  
    this.element_cache.addDOMElement(de);
    this.element_cache.addChild(de);

  }

};

/**
 * updateDOMElements
 *
 * @desc Traverse document DOM and create a tree of DOMElement objects.
 *    The DOMElement objects will be used to generate more specific
 *    lists of elements without need to touch the document DOM.
 *    Additional information is collected on tables to be used in
 *    creating the table cache
 *
 * @param node        Object  node is the current node object tbing analyzed
 * @param parent_dom_element Object  DOMElement object that is the parent of the current node
 *
 * return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElements = function (node, parent_dom_element) {

  var n;
  var de;

  switch (node.nodeType ) {

  case NODE_TYPE.DOCUMENT:
    // OpenAjax.a11y.console("Document node type");
    break;

  case NODE_TYPE.ELEMENT:
    // OpenAjax.a11y.console(node.tagName);

    var dom_element = new OpenAjax.a11y.cache.DOMElement(node, parent_dom_element);

    dom_element.addComputedStyle(parent_dom_element);
    dom_element.calculateXPath(parent_dom_element);
    this.element_cache.addDOMElement(dom_element);

    if (parent_dom_element) {
      parent_dom_element.addChild(dom_element);
    }
    else {
      this.element_cache.addChild(dom_element);
    }

    if (dom_element.id.length) {
      // use append so that document_order of the dom_element does not get updated
      
      de = this.element_with_id_cache.getDOMElementById(dom_element.id);
      
      if (de) {
        dom_element.id_unique = false;
        de.id_unique = false;
      }
      else {
        dom_element.id_unique = true;      
      }
      
      this.element_with_id_cache.dom_elements.push(dom_element);
            
    }

    switch (dom_element.tag_name) {

    case 'frame':
    case 'iframe':
      // OpenAjax.a11y.console("frame: " + node.src);

      var frame_doc = node.contentDocument;

      if (frame_doc && frame_doc.firstChild) {
        for (n = frame_doc.firstChild; n !== null; n = n.nextSibling) {
          this.updateDOMElements( n, dom_element);
        } // end loop
      }
      break;

    default:
      break;

    } // end switch

    for (n = node.firstChild; n !== null; n = n.nextSibling ) {
      this.updateDOMElements(n, dom_element);
    } // end loop
    break;

  case NODE_TYPE.TEXT:
    // OpenAjax.a11y.console("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);
   parent_dom_element.addChild(dom_text);
   break;

  default:
    break;
  } // end switch

  return;

};

/**
 * getNameFromARIALabel
 *
 * @desc
 *
 * @param control_element   Object
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameFromARIALabel = function (element) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var label = "";
  var label_source = SOURCE.NONE;
  var de = element.dom_element;

  if (de.aria_labelledby) {
    label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else {
    if (de.aria_label) {
      label = de.aria_label;
      label_source = SOURCE.ARIA_LABEL;
    }
    else {
      if (de.title) {
        label = de.title;
        label_source = SOURCE.TITLE_ATTRIBUTE;
      }
    }
 }

 element.label = label;
 element.label_source = label_source;
 element.label_for_comparison = label.toLowerCase().trim();

};

/**
 * sortArrayOfObjects
 *
 * @desc Sort an array of objects by one of its properties and marks any properties that are duplicates
 *
 * @param objects   Array    array of objects to sort
 * @param property  String   text string of property to sort
 * @param ascending Boolean  whether to sort ascending or descending
 *
 * @return array of sorted objects
 */

OpenAjax.a11y.cache.DOMCache.prototype.sortArrayOfObjects = function(objects, property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;
  var return_objects = [];

  if( !objects && objects.length && !objects[0][property] ) {
    return return_objects;
  } // endif

  var objects_len = objects.length;
 
  for (i=0; i<objects_len; i++) return_objects[i] = objects[i];

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < objects_len; i++ ) {
        if (return_objects[i-1][property] > return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        } 
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }          
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < objects_len; i++) {
        if (return_objects[i-1][property] < return_objects[i][property]) {
          // swap the values
          temp = return_objects[i-1];
          return_objects[i-1] = return_objects[i];
          return_objects[i] = temp;
          swapped = true;
        } 
        else {
          if (return_objects[i-1][property] === return_objects[i][property]) {
            return_objects[i-1].duplicate = true;
            return_objects[i].duplicate = true;
          }          
        }
      } // end loop
    } while (swapped);
  } 

  return return_objects;

};

