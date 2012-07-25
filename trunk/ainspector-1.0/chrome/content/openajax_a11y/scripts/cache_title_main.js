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
/*                     OpenAjax Title Main Cache                    */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor MainInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a main information object for information related to main landmarks
 *       in building the tite and main cache
 *
 * @param {MainInfo}  main_info - Current main information object
 *
 * @property {MainElement}  main_element  - Parent main landmark element 
 */

OpenAjax.a11y.cache.MainInfo = function (main_info) {

  if (main_info) {
    this.main_element  = main_info.main_element;
    this.page_element  = main_info.page_element;
  }
  else {
    this.main_element  = null;
    this.page_element  = null;
  }
 
};

/* ---------------------------------------------------------------- */
/*                      TitleMainCache                              */ 
/* ---------------------------------------------------------------- */

/**
 * @constructs TitleMainCache
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
 * @property {Boolean}  up_to_date - True if the cache has been created using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}  child_cache_elements  - Root array of the tree representation of the landmarks and headings in the document 
 *
 * @property {Array}   main_elements  - List of all the main landmark elements in the document 
 * @property {Number}  length         - The length of the main landmark elements list, used in calculating cache id values 
 *
 * @property {Array}    h1_elements         - List of all the h1 heading elements in the document 
 * @property {Boolean}  has_main_landmarks  - True if document contians at lewast one main landmark, otherwise false
 * @property {Boolean}  has_title           - Title element is defined in the document 
 *
 * @property {PageElement} page_element - The body element is used as a placeholder for items missing in a document like H1 elements and Main landmarks
 * 
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.TitleMainCache = function (dom_cache) {

  this.dom_cache = dom_cache;
 
  this.up_to_date    = false;
 
  this.child_cache_elements  = [];  
  
  this.main_elements = [];
  this.length        = 0;
  
  this.h1_elements   = [];
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;
  
  this.page_element = null;
 
  this.evaluation_results  = new OpenAjax.a11y.EvaluationResult();
 
};

/**
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Empties the title and main cache 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.initCache = function () {

  this.up_to_date    = false;
 
  this.child_cache_elements  = [];  
  
  this.main_elements = [];
  this.length        = 0;
  
  this.h1_elements   = [];
  this.page_element = null;
  
  this.has_h1_elements    = false;
  this.has_main_landmarks = false;
  this.has_title          = false;

};


/**
 * @method addChildElement
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Adds a main landmark or h1 heading element object to the root level of a tree of title and main elements  
 *
 * @param {MainElement | H1Element}  child_element - Main landmark or h1 heading element object to add
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addChildMainElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_cache_elements.push(child_element);
  } 

};

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc   Adds a h1 element object to the h1 heading elements list
 *
 * @param  {H1Element}  h1_element  -  h1 heading element to add 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addH1Element = function (h1_element) {

  if (h1_element && h1_element.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) {
    this.h1_elements.push(h1_element);
  } 

};

/**
 * @method addMainElement
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc    Adds a main, h1 or title element object to the main_elements array and cacluates a cache id value
 *
 * @param  {MainElement | H1Element | TitleElement | PageElement}  main_element  Main, h1 heading or title element object to add 
 *
 * @return  {Number}  length is the number of elements in the main_elements list
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.addMainElement = function (main_element) {

  if (main_element) {
    this.length = this.length + 1;
    main_element.document_order = this.length;
    main_element.cache_id = "main_" + this.length;
    this.main_elements.push(main_element);
  } 
  
  return this.length;
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc  Finds the main, title or h1 heading element object with the corrsponding cach_id value
 *
 * @param  {String}  cache_id  - cache_id of the title or main element object to find
 *
 * @return  {MainElement | TitleElement | H1Element | null}  Returns the main, title or h1 heading element object 
 */

OpenAjax.a11y.cache.TitleMainCache.prototype.getItemByCacheId = function (cache_id) {
 
  var i; 
  var main_elements_len = this.main_elements.length;

  if (cache_id) {
    for ( i = 0; i < main_elements_len; i++) {
      if (this.main_elements[i].cache_id == cache_id) {
        return this.main_elements[i];
      } 
    } // end loop
  }
  
  return null;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Updates the title and main cache object by checking to see if a DOMElement
 *          should be added to this cache objects
 *  
 * @param  {DOMElement}  dom_element  - dom element object to check for inclusion in title and main cache
 * @param  {MainInfo}    main_info    - Information about the current landmarks that are parents to this item
 * 
 * @return {MainInfo}  Returns updated main information object
 */
 
OpenAjax.a11y.cache.TitleMainCache.prototype.updateCacheItems = function (dom_element, main_info) {

  var me;
  var be;
  var mi = new OpenAjax.a11y.cache.MainInfo(main_info);

  if (dom_element.role == 'main') {
   
    this.has_main_landmarks = true;
 
    me = new OpenAjax.a11y.cache.MainElement(dom_element, mi.main_element);    

    this.dom_cache.getNameFromARIALabel(me);

    this.addMainElement(me);  

    if (main_info.main_element) {
      main_info.main_element.addChildMainElement(me);
    } 
    else {
      this.addChildMainElement(me);  
    }
  
    mi.main_element = me;
    
    return mi;
  }
 
  if (dom_element.tag_name == 'h1') {
  
    this.has_h1_elements = true;
  
    me = new OpenAjax.a11y.cache.H1Element(dom_element, mi.main_element);    

    this.addMainElement(me);  
    this.addH1Element(me);

    if (main_info.main_element) {
      main_info.main_element.addChildMainElement(me);
      main_info.main_element.addH1Element(me);
    } 
    else {
      this.addChildMainElement(me);  
    }  
    
    me.isH1UsedAsLabelForMainRole();

    return mi;
  }

  if (dom_element.tag_name == 'title' && !this.has_title) {
  
    me = new OpenAjax.a11y.cache.TitleElement(dom_element, mi.main_element);    

    this.addMainElement(me);
   
    this.addChildMainElement(me);  
   
    // There is only one title for a document, even when there are frames and iframes
    this.has_title = true;
    
  }

  if (dom_element.tag_name == 'body' && !this.page_element) {
  
    be = new OpenAjax.a11y.cache.PageElement(dom_element, mi.main_element);    

    this.addMainElement(be);
   
    this.addChildMainElement(be);  
   
    // There is only one body element for a document, even when there are frames and iframes
    this.page_element = be;
    
  }

  return mi;
  
};

/**
 * @method traverseDOMElementsForMainElements
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Traverses DOMElement objects in the tree to update the title and main cache 
 *
 * @param  {DOMElement}  dom_element  - DOMElement object to check for inclusion in title and main cache
 * @param  {MainInfo}    main_info    - Information about the current main landmark object
 */
  
OpenAjax.a11y.cache.TitleMainCache.prototype.traverseDOMElementsForMainElements = function (dom_element, main_info) {

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    var mi = this.updateCacheItems(dom_element, main_info);
    
    for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
      this.traverseDOMElementsForMainElements(dom_element.child_dom_elements[i], mi);
    } 
  }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.TitleMainCache
 *
 * @desc Traverses the DOMElements to update the title and main cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the title and main cache are disabled, this 
 *       cache would not be updated
 */ 
 
OpenAjax.a11y.cache.TitleMainCache.prototype.updateCache = function () {

  var i;
  var li;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.initCache();
 
  mi = new OpenAjax.a11y.cache.MainInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating title and main cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForMainElements(children[i], mi);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed title and main cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};

/* ---------------------------------------------------------------- */
/*                        MainElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor MainElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a main landmark element object used to hold information about a main landmark 
 *
 * @param  {DOMElement}   dom_element      - The dom element object representing the landmark element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the main landmark element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree 
 *
 * @property  {Array}   h1_elements  -  List of all the h1 heading elements in the main landmark
 * @property  {Number}  type         -  Constant representing the type of main landmark
 *
 * @property  {String}   label                  - Accessible label of the landmark 
 * @property  {Number}   label_length           - Length of label text 
 * @property  {Number}   label_source           - Constant representing the source of the label (i.e. aria-label, aria-labelledby, title...) 
 * @property  {String}   label_for_comparison   - Accessible label for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.MainElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";  
  this.document_order  = 0;

  this.child_cache_elements = [];
  this.h1_elements          = [];
  this.main_type            = OpenAjax.a11y.MAIN.ROLE_MAIN;
  
  this.parent_landmark = parent_landmark; // restricted to main landmarks
 
  this.label                 = "";
  this.label_length          = 0;
  this.label_source          = OpenAjax.a11y.SOURCE.NONE;
  this.label_for_comparison  = "";

}; 


/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a main landmark  object to the tree of title and main elements  
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add 
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element); 
  }  

}; 

/**
 * @method addH1Element
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Adds a H1 heading object to the tree of title and main elements  
 *
 * @param {H1Element}  h1_element  -  H1 heading element object to add 
 */

OpenAjax.a11y.cache.MainElement.prototype.addH1Element = function (h1_element) {

  if (h1_element) {
    this.h1_elements.push(h1_element); 
  }  

}; 


/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.MainElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.MainElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'main_type');
  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.MainElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.MainElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.MainElement
 *
 * @desc Returns a text string representation of the main landmark element 
 *
 * @return {String} Returns string represention the landmark element object
 */
  
OpenAjax.a11y.cache.MainElement.prototype.toString = function () {
  if (this.label_length) {
    return this.dom_element.tag_name + "[role=main]: " + this.label;  
  } 
  else {  
    return this.dom_element.tag_name + "[role=main]: No label";  
  } 
};

/* ---------------------------------------------------------------- */
/*                         H1Element                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor H1Element
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a h1 heading element object used to hold information about a h1 heading elements used for titling 
 *
 * @param  {DOMelement}  dom_element  - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type               -  Constant representing the type of main landmark
 * @property  {Boolean}  is_label_for_main  - true if h1 is being used as a label for main landmark, otherwise false
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.H1Element = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";  
  this.document_order  = 0;
  
  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  this.child_cache_elements = [];   // The child array is always empty for an H1Element

  
  this.main_type              = OpenAjax.a11y.MAIN.H1_ELEMENT;
  this.is_label_for_main = false;

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = this.name.normalizeSpace().toLowerCase();
  
}; 

/**
 * @method isH1UsedAsLabelForMainRole
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 * 
 * @desc  Determines if an H1 element is being used as a label for a main Role
 *
 * @return  {Boolean}  True if the h1 element is being used as a label for the main landmark it is contained in, otherwise false
 */

OpenAjax.a11y.cache.H1Element.prototype.isH1UsedAsLabelForMainRole = function () {

  if (this.dom_element.id.length === 0 ||
      this.parent_landmark === null) {
    this.is_label_for_main = false;  
    return;
  }  

  var de = this.parent_landmark.dom_element;

  if (de.aria_labelledby && de.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    this.is_label_for_main = true;   
  }
    
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.H1Element.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.H1Element.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'main_type');
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
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.H1Element.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.H1Element.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.H1Element
 *
 * @desc Returns a text string representation of the h1 heading element 
 *
 * @return {String} Returns string represention the h1 heading element object
 */
  
OpenAjax.a11y.cache.H1Element.prototype.toString = function () {
  return "H1 element: " + this.name;  
};

/* ---------------------------------------------------------------- */
/*                       TitleElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor TitleElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a title element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - Information about the parent landmark (NOTE: can be null)
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type  -  Constant representing the title element 
 *
 * @property  {String}   name                  - Calculated accessible name of the heading 
 * @property  {Number}   name_length           - Length of accessible name 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 */

OpenAjax.a11y.cache.TitleElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.TITLE_ELEMENT;

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  this.child_cache_elements = [];  // This array is always empty for the title element

  this.name                 = dom_element.getText();
  this.name_length          = this.name.length;
  this.name_for_comparison  = this.name.normalizeSpace().toLowerCase();
  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TitleElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 cache_nls.addPropertyIfDefined(properties, this, 'main_type');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TitleElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TitleElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TitleElement
 *
 * @desc Returns a text string representation of the title element 
 *
 * @return {String} Returns string represention the title element object
 */
  
OpenAjax.a11y.cache.TitleElement.prototype.toString = function () {
  return "TITLE element: " + this.name;  
};


/* ---------------------------------------------------------------- */
/*                       PageElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor PageElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a body element object used to hold information about a title element
 *
 * @param  {DOMelement}   dom_element      - The dom element object representing the heading element 
 * @param  {MainElement}  parent_landmark  - This is always null since this is the root element
 *
 * @property  {DOMElement}   dom_element      - Reference to the dom element representing the optgroup element
 * @property  {String}       cache_id         - String that uniquely identifies the cache element object in the cache
 * @property  {Number}       document_order   - Ordinal position of the title and main cache items in the document to other title and main cache items
 *
 * @property  {MainElement}  parent_landmark  - Information about the parent main landmark (NOTE: can be null)
 *
 * @property  {Array}  child_cache_elements  - List of child cache title element, main landmarks and h1 heading element objects as part of cache title and main elements tree  
 *
 * @property  {Number}   type  -  Constant representing the body element 
 *
 */

OpenAjax.a11y.cache.PageElement = function (dom_element, parent_landmark) {

  this.dom_element     = dom_element;
  this.cache_id        = "";
  this.document_order  = 0;

  this.main_type          = OpenAjax.a11y.MAIN.BODY_ELEMENT;

  this.child_cache_elements = []; // this is always empty for the body element

  this.parent_landmark    = parent_landmark; // restricted to main landmarks
  
  this.num_main_landmarks = 0;          // are defined in landmark rules
  this.num_visible_main_landmarks = 0;  // are defined in landmark rules
  
}; 

/**
 * @method addChildMainElement
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Adds a main landmark  object to the tree of title and main elements  
 *
 * @param {MainElement}  main_element  -  Main landmark element object to add 
 */

OpenAjax.a11y.cache.PageElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_cache_elements.push(main_element); 
  }  

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.PageElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.PageElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.PageElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.PageElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.PageElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.PageElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.PageElement
 *
 * @desc Returns a text string representation of the title element 
 *
 * @return {String} Returns string represention the title element object
 */
  
OpenAjax.a11y.cache.PageElement.prototype.toString = function () {
  return "BODY element";  
};