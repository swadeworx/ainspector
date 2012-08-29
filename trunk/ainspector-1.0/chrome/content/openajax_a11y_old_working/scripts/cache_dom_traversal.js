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
/*                            DOMCache                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a DOMCache Object 
 *          
 * @param  {String}  url       - URL of the page being evaluated
 * @param  {String}  title     - The value of title property of the document being evaluated
 * @param  {Object}  document  - The document object reference of the document being evaluated
 * @param  {Object}  log       - The Log object to store progress information during the evaluation
 *
 * @property {String}  nls       - NLS cache items for properties
 * @property {String}  url       - URL of the page being evaluated
 * @property {String}  base_url  - Base URL of the page being evaluated calculated from the URL
 * @property {String}  title     - The value of title property of the document being evaluated
 * @property {Object}  document  - The document object reference of the document being evaluated
 * @property {Object}  log       - The Log object to store progress information during the evaluation
 *
 * DOM cache element objects
 * @property {Object}  element_cache          - dom element cache for all elements
 * @property {Object}  element_with_id_cache  - dom element cache items with a defined id
 *
 * Specialize cache element objects
 * @property {Object}  abbreviations_cache       - Cache of abbreviation elements 
 * @property {Object}  color_contrast_cache      - Cache of abbreviation items
 * @property {Object}  controls_cache            - Cache of form controls and widgets
 * @property {Object}  headings_landmarks_cache  - Cache of headings and abbreviations
 * @property {Object}  images_cache              - Cache of image and area elements
 * @property {Object}  languages_cache           - Cache of language change items
 * @property {Object}  links_cache               - Cache of a and area elements
 * @property {Object}  lists_cache               - Cache of list elements
 * @property {Object}  media_cache               - Cache of media elements
 * @property {Object}  tables_cache              - Cache of table elements
 *
 * @example
 *
 * var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc, locale, log); 
 * dom_cache.updateDOMElementCache();
 * dom_cache.updateAllCaches();
 */

OpenAjax.a11y.cache.DOMCache = function (url, title, document, log) {

 this.nls = OpenAjax.a11y.cache_nls.getCacheNLS();
 
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
 this.log = log;

};
 
/**
 * @method initCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Initialize specialized caches
 *    The specialized caches will be updated all at once or or when
 *    needed by a rule depending on how an evaluation is requested
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
 * @method isUpToDate
 * @memberOf OpenAjax.a11y.cache.DOMCache
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
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates the specified cache
 *
 * @param cache_name String name of the cache to update
 *
 * @return {Boolean} Returns true if cache is updated, false if cache does not exist
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
 * @method traverseDOMElementsForAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates all the specialized caches at one time, in general this
 *    is faster than updating the caches individually based on the
 *    needs of rules, but may create caches that will not be used if
 *    some rules are disabled
 *
 * @param  dom_element       Object  Current DOMElement object being processed
 * @param  landmark_info     Object  LandmarkInfo object containing current landmark and heading information for tree representations
 * @param  table_info        Object  TableInfo object containing current table information for tree representations
 * @param  control_info      Object  ControlInfo object containing current control information for tree representations
 * @param  list_info         Object  Current LanguageElement object that contains the DOMElement
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

 if (dom_element.type == Node.ELEMENT_NODE) {

  this.abbreviations_cache.updateCacheItems(dom_element);
  this.images_cache.updateCacheItems(dom_element);
  this.languages_cache.updateCacheItems(dom_element);
  this.links_cache.updateCacheItems(dom_element);
  this.media_cache.updateCacheItems(dom_element);

  var ci = this.controls_cache.updateCacheItems(dom_element, control_info);
  var hi = this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
  var li = this.lists_cache.updateCacheItems(dom_element, list_info);
  var ti = this.tables_cache.updateCacheItems(dom_element, table_info);

  var children_length = dom_element.child_dom_elements.length;
  for (var i = 0; i<children_length; i++ ) {
   this.traverseDOMElementsForAllCaches(dom_element.child_dom_elements[i], hi, ti, ci, li);
  } // end loop
 } else {
   this.color_contrast_cache.updateCacheItems(dom_element);
   this.headings_landmarks_cache.updateCacheItems(dom_element, landmark_info);
 }
};


/**
 * @method updateAllCaches
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverses the DOMElements and 
 *       calls the update function to see which specialized caches want information on this element
 *
 * @return none
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateAllCaches = function () {
 var i;
 var children = this.element_cache.child_dom_elements;
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
 * @method updateDOMElementCache
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Updates a DOMElement object caches by traversing the DOM of the browser object
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
  // OpenAjax.a11y.logger.debug("Creating DOM elements from body element");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements");
  this.updateDOMElements(this.document.body, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }
 // If there are frames start at the top element
 else {
  // OpenAjax.a11y.logger.debug("Creating DOM elements with frames");
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating DOM elements using frames");
  this.updateDOMElements(this.document, null, null);
  this.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed DOM element update, new cache includes " + this.element_cache.dom_elements.length + " DOMElement objects");
 }

 // Calculate aria-descriptions
 this.calculateDescriptions();

 return this;

};

/**
 * @method addTitleDOMElement
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Adds a DOMElement to represent a TITLE
 *
 * @return Nothing
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
      this.updateDOMElements( n, de, null);
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
 * @method updateDOMElements
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Traverse document DOM and create a tree of DOMElement objects.
 *    The DOMElement objects will be used to generate more specific
 *    lists of elements without need to touch the document DOM.
 *    Additional information is collected on tables to be used in
 *    creating the table cache
 *
 * @param  {Object} node               - node is the current node object tbing analyzed
 * @param  {Object} parent_dom_element - DOMElement object that is the parent of the current node
 * @param  {Object} previous_sibling   - The DOMElement or DOMText object that is the previous sibling
 *
 * return nothing
 */

OpenAjax.a11y.cache.DOMCache.prototype.updateDOMElements = function (node, parent_dom_element, previous_sibling) {

  var n;
  var de;

  switch (node.nodeType ) {

  case Node.DOCUMENT_NODE:
  case Node.DOCUMENT_TYPE_NODE:
    // OpenAjax.a11y.logger.debug("Document node type");
    break;

  case Node.ELEMENT_NODE:
    // OpenAjax.a11y.logger.debug(node.tagName);
    
    var dom_element = new OpenAjax.a11y.cache.DOMElement(node, parent_dom_element);

    dom_element.addComputedStyle(parent_dom_element);
    
    dom_element.calculateXPath(parent_dom_element);
    this.element_cache.addDOMElement(dom_element);

    if (parent_dom_element) {
      parent_dom_element.has_element_children = true;
      parent_dom_element.addChild(dom_element);
    }
    else {
      this.element_cache.addChild(dom_element);
    }

    if (dom_element.id && dom_element.id.length) {
      // use append so that document_order of the dom_element does not get updated
      
      de = this.element_with_id_cache.getDOMElementById(dom_element.id);
      
      if (de) {
        dom_element.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
      }
      
      this.element_with_id_cache.dom_elements.push(dom_element);
            
    }

    switch (dom_element.tag_name) {

    case 'frame':
    case 'iframe':

      var frame_doc = node.contentWindow.document;

//      OpenAjax.a11y.logger.debug("frame: " + node.src + " " + frame_doc);

      if (frame_doc && frame_doc.firstChild) {
        for (n = frame_doc.firstChild; n !== null; n = n.nextSibling) {
          this.updateDOMElements( n, dom_element);
        } // end loop
      }
      break;

    default:
      break;

    } // end switch
    
    var ps = null;

    for (n = node.firstChild; n !== null; n = n.nextSibling ) {
      ps = this.updateDOMElements(n, dom_element, ps);
    } // end loop
    
    return dom_element;
    break;

  case Node.TEXT_NODE:
    // OpenAjax.a11y.logger.debug("DOM node text: " + node.data);

   var dom_text = new OpenAjax.a11y.cache.DOMText(node, parent_dom_element);

   if (dom_text.text_length) {
   
     if (!previous_sibling || previous_sibling.type == Node.ELEMENT_NODE) {
   
       this.element_cache.addDOMText(dom_text);
       if (parent_dom_element) parent_dom_element.addChild(dom_text);
       return dom_text;
     
     } else {
   
       if (previous_sibiling) previous_sibiling.addText(dom_text.text);
       return previous_sibling;
     }  
   }
   else {
     return previous_sibling;
   }
   
   break;

  default:
    break;
  } // end switch

  return null;

};


/**
 * @method calculateDescriptions
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description if a element has an aria-describedby attribute defined
 */

OpenAjax.a11y.cache.DOMCache.prototype.calculateDescriptions = function () {

  var de;
  var dom_elements     = this.element_cache.dom_elements;
  var dom_elements_len = dom_elements.length;

  for (var i = 0; i < dom_elements_len; i++ ) {
    de = dom_elements[i];
    
    if (de.aria_describedby) {
      de.calculated_aria_description = this.getTextFromIDs(de.aria_describedby);  
    }
  }
};

/**
 * @method getNameFromARIALabel
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a computed label and accessible name based on ARIA properties
 *
 * @param {Object} control - Control cache element object
 */

OpenAjax.a11y.cache.DOMCache.prototype.getNameFromARIALabel = function (control) {

  var SOURCE = OpenAjax.a11y.SOURCE;

  var computed_label = "";
  var computed_label_source = SOURCE.NONE;
  var de = control.dom_element;
  var wi = de.widget_info;
  
  if (de.aria_labelledby) {
    computed_label = this.element_with_id_cache.getTextFromIds(de.aria_labelledby);
    computed_label_source = SOURCE.ARIA_LABELLEDBY;
  }
  else if (de.aria_label) {
    computed_label = de.aria_label;
    computed_label_source = SOURCE.ARIA_LABEL;
  }
  else if (wi && wi.nameFromContent) {
    computed_label = de.getText();
    computed_label_source = SOURCE.TEXT_CONTENT;
  } else if (de.title) {
    computed_label = de.title;
    computed_label_source = SOURCE.TITLE_ATTRIBUTE;
  }

  control.computed_label = computed_label;
  control.computed_label_length = computed_label.length;
  control.computed_label_source = computed_label_source;
  control.computed_label_for_comparison = computed_label.normalizeSpace().toLowerCase();
  control.accessible_name = computed_label;

  this.getDescriptionFromARIADescribedby(control);
};

/**
 * @method getDescriptionFromARIADescribedby
 *
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Calculates a description based on ARIA properties
 *
 * @param {Object} element - Cache element object
 */

OpenAjax.a11y.cache.DOMCache.prototype.getDescriptionFromARIADescribedby = function (element) {

  var de = element.dom_element;
  
  if (de.aria_describedby) {
    element.accessible_description = this.element_with_id_cache.getTextFromIds(de.aria_describedby);
  }
  else {
    element.accessible_description = "";  
  }
  
};


/**
 * @method getTextFromIDs
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Returns the text content of the elements identified in the list of ids
 *
 * @param {String}  ids  An string with space separated ids
 *
 * @return String
 */

OpenAjax.a11y.cache.DOMCache.prototype.getTextFromIDs = function (ids) {

  if (!ids || ids.length === 0) return ""; 
  
  return this.element_with_id_cache.getTextFromIds(ids);

};

/**
 * @method sortArrayOfObjects
 * @memberOf OpenAjax.a11y.cache.DOMCache
 *
 * @desc Sort an array of objects by one of its properties and marks any properties that are duplicates
 *
 * @param {Array}   objects   - Array of objects to sort
 * @param {String}  property  - Text string of property to sort
 * @param {Boolean} ascending - True sort by ascending values otherwise sort by descending values
 *
 * @return Array of sorted objects
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
 
  for (i = 0; i < objects_len; i++) {
    return_objects[i] = objects[i];
    return_objects[i].duplicate = false;
  }  

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

