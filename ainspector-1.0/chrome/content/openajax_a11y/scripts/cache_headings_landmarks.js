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

/**
 * LandmarkInfo
 *
 * @desc LandmarkInfo is the constructor for information related to landmarks
 *       in building the headings/landmark cache
 *
 * @constructs
 *
 * @return  LandmarkInfo object 
 */

OpenAjax.a11y.cache.LandmarkInfo = function (landmark_info) {

  if (landmark_info) {
    this.landmark_element = landmark_info.landmark_element;
    this.main_element  = landmark_info.main_element;
  }
  else {
    this.landmark_element = null;
    this.main_element  = null;
  }
 
};

/**
 * LandmarkCache
 *
 * @desc Constructor for LandmarkCache object which contains a list of 
 *    LandmarkElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  LandmarkCache object 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
 
  this.landmark_elements = [];
  this.heading_elements = [];
  // List of elements with role=main or h1 elements
  this.main_elements = [];
 
  this.child_elements   = [];
  this.child_main_elements = [];
 
  this.headings_sort_property  = 'document_order';
  this.landmarks_sort_property = 'document_order';
 
  this.up_to_date    = false;
 
  this.child_length   = 0;
  this.child_main_length = 0;
 
  this.heading_length  = 0;
  this.landmark_length  = 0;
  this.main_length    = 0;

  this.has_title = false;
 
  return this;

};

/**
 * addChildElement
 *
 * @desc Adds a Landmark or Header Element object to the child_element array
 *
 * @param child_element     Object  landmark_element or heading_element object to add to the landmark cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildElement = function (child_element) {

  // item must exist and have the position property
  if (child_element) {
    this.child_length = this.child_length + 1;
    this.child_elements.push(child_element);
  } 

  return this.length;

};

/**
 * addChildMainElement
 *
 * @desc Adds a Main Element object to the child_main_elements array
 *
 * @param main_element Object  main landmark or heading level 1 object to add to the landmark cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.child_main_length = this.child_main_length + 1;
    this.child_main_elements.push(main_element);
  } 
};

/**
 * addMainElement
 *
 * @desc Adds a Landmark or Header Element object to the main_elements array
 *
 * @param child_element Object  main landmark or heading level 1 object to add to the landmark cache
 *
 * @return length Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.addMainElement = function (main_element) {

  if (main_element) {
    this.main_length = this.main_length + 1;
    main_element.document_order = this.main_length;
    main_element.cache_id = "main_" + this.main_length;
    this.main_elements.push(main_element);
  } 

  return this.length;

};

/**
 *
 * addLandmarkElement
 *
 * @desc Adds a LandmarkElement object to a heading_elements array
 *
 * @param landmark_element Object  landmark_element object to a landmark_elements array
 *
 * @return Number  length is the number of elements in the landmark_elements array
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
 * addHeadingElement
 *
 * @desc Adds a HeadingElement object to a heading_elements array
 *
 * @param heading_element Object  heading_element object to a heading_elements array
 *
 * @return Number  length is the number of elements in the heading_elements array
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
 * getLandmarkElementByCacheId
 *
 * @desc Returns the LandmarkElement object with the id
 *
 * @param cache_id String  id of the LandmarkElement object
 *
 * @return LandmarkElement object if found, or null if not found 
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
 * getHeadingElementById
 *
 * @desc Returns the HeadingElement object with the id
 *
 * @param cache_id String  id of the HeadingElement object
 *
 * @return HeadingElement object if found, or null if not found 
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
 * getMainElementByCacheId
 *
 * @desc Returns the MainElement object with the id
 *
 * @param cache_id String  id of the MainElement object
 *
 * @return HeadingElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.getMainElementByCacheId = function (cache_id) {
 
  var i;
  var main_elements_len = this.main_elements.length;

  if (cache_id) {
    for (i=0; i<main_elements_len; i++) {
      if (this.main_elements[i].cache_id == cache_id) {
        return this.main_elements[i];
      } 
    } // end loop
  }
 
  return null;
};

/**
 * initCache
 *
 * @desc Empties the LandmarkCache of LandmarkElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.initCache = function () {

  this.landmark_elements = [];
  this.headings_elements = [];
  this.child_elements  = [];
  this.main_elements = [];
 
  this.landmark_sort_property = 'document_order';
  this.headings_sort_property = 'document_order';
 
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the LandmarkCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return LandmarkElement 
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

    if (dom_element.role == 'main') {
      me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

      this.dom_cache.getNameFromARIALabel(me);

      this.addMainElement(me);  

      if (landmark_info.main_element) {
        landmark_info.main_element.addMainElement(me);
      } 
      else {
        this.addChildMainElement(me);  
      }
  
      li.main_element = me;
    }
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

    if (dom_element.tag_name == 'h1') {
      me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

      this.addMainElement(me);  

      if (landmark_info.main_element) {
        landmark_info.main_element.addChildMainElement(me);
      } 
      else {
        this.addChildMainElement(me);  
      }  
    }
    return li;
  }

  if (dom_element.tag_name == 'title' && !this.has_title) {
    me = new OpenAjax.a11y.cache.MainElement(dom_element, li.main_element);    

    this.addMainElement(me);
   
    if (me.role === 'main') this.dom_cache.getNameFromARIALabel(me);

    if (landmark_info.main_element) {
      landmark_info.main_element.addChildMainElement(me);
    }
    else {
      this.addChildMainElement(me);  
    }
   
    // There is only one title for a document, even when there are frames and iframes
    this.has_title = true;
   
    return li;
  }
  return li;
};

/**
 * transverseDOMElementsForLandmarkElements
 *
 * @desc Traverses the DOMElements to update landmarkelements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.transverseDOMElementsForLandmarkElements = function (dom_element, landmark_info) {

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    var li = this.updateCacheItems(dom_element, landmark_info);
    
    for (var i = 0; i < dom_element.children.length; i++ ) {
      this.transverseDOMElementsForLandmarkElements(dom_element.children[i], li);
    } 
  }
};


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the landmark cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.HeadingsLandmarksCache.prototype.updateCache = function () {
  var i;
  var li;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.initCache();
 
  li = new OpenAjax.a11y.cache.LandmarkInfo(null);
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating landmark elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForLandmarkElements(children[i], li);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed landmark elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
};


/**
 * sortLandmarkElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
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
 * sortHeadingElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
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

/**
 * LandmarkElement
 * 
 * @desc LandmarkElement is the object contains information about landmarks
 *
 * @constructs
 *
 * @param  dom_element     Object dom_element object provides information about current dom node 
 * @param  parent_element    Object landmark element object provides information about a parent landmark element 
 *
 * @return  LandmarkElement | null
 */

OpenAjax.a11y.cache.LandmarkElement = function (dom_element, parent_landmark) {

  this.document_order    = 0;
  this.dom_element      = dom_element;
  this.child_elements    = [];

  this.parent_landmark    = parent_landmark;
 
  this.label         = "";
  this.label_for_comparison  = "";
 
};


/**
 * addChildElement
 * 
 * @desc add a child element reference to child_elements array 
 *
 * @constructs
 *
 * @param  child_element    Object landmark or header element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LandmarkElement.prototype.addChildElement = function (child_element) {

  if (child_element) {
    this.child_elements.push(child_element); 
  }  

}; 


/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
 
OpenAjax.a11y.cache.LandmarkElement.prototype.toString = function () {
 return "Landmark " + this.document_order;  
}; 


/**
 * HeadingElement
 *
 * @desc HeadingElement is the object used to hold data about a heading and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 *
 * @return  HeadingElement | null
 */

OpenAjax.a11y.cache.HeadingElement = function (dom_element) {
 
  this.dom_element = dom_element;
   
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

  var ano = OpenAjax.a11y.cache.util.getNameFromChildrenObject(dom_element);
  
  this.name          = ano.name;
  this.name_for_comparison  = ano.name.toLowerCase().trim();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt  = ano.name_from_image_alt;
  this.image_count      = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  return this;
    
};

/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
  
OpenAjax.a11y.cache.HeadingElement.prototype.toString = function() {
  return "Heading " + this.document_order;
};

/**
 * MainElement
 * 
 * @desc MainElement is the object contains information about h1 and main landmarks
 *
 * @constructs
 *
 * @param  dom_element     Object dom_element object provides information about current dom node 
 * @param  parent_element    Object landmark element object provides information about a parent landmark element 
 *
 * @return  MainElement | null
 */

OpenAjax.a11y.cache.MainElement = function (dom_element, parent_landmark) {

  this.document_order    = 0;
  this.dom_element       = dom_element;
  this.main_elements     = [];
  this.is_title           = false; 

  this.parent_landmark    = parent_landmark; // restricted to main landmarks

  switch (dom_element.tag_name) {
 
  case 'h1':
    this.name  = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
    this.name_for_comparison  = this.name.toLowerCase().trim();
    this.level = 1;
    break;
 
  case 'title':
    this.name    = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
    this.name_for_comparison  = this.name.toLowerCase().trim();
    this.is_title = true;
    this.role    = 'title';
    break;
 
  default: 
    this.name                 = "";
    this.name_for_comparison  = ""; 
    break;  
  } 

}; 


/**
 * addMainElement
 * 
 * @desc add a child element reference to child_elements array 
 *
 * @constructs
 *
 * @param  child_element    Object landmark or header element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.MainElement.prototype.addChildMainElement = function (main_element) {

  if (main_element) {
    this.main_elements.push(main_element); 
  }  

}; 

/**
 * toString
 * 
 * @desc returns a text string representing the object
 *
 * @return  String
 */
  
OpenAjax.a11y.cache.MainElement.prototype.toString = function () {
 if (this.dom_element.tag_name == "h1" ) {
  return "h1: " + this.name; 
 }
 else { 
  return this.dom_element.tag_name + "[@role=main]: " + this.label;  
 } 

};

/**
 * getH1InformationForMainRole
 * 
 * @desc get information about H1 elements that are children of a MAIN landmark
 *
 * @return  object
 */

OpenAjax.a11y.cache.MainElement.prototype.getH1InformationForMainRole = function () {


  var i;
  var me;
  
  var h1_info = {};
  h1_info.has_h1 = false;
  h1_info.has_label = false;

  if (this.dom_element.role !== 'main') return h1_info;
  
  var ids = this.dom_element.aria_labelledby;

  var main_elements     = this.main_elements;
  var main_elements_len = main_elements.length; 
  
  for (i=0; i<main_elements_len; i++) {
  
    me = main_elements[i];
    
    if (me.level==1) {
      h1_info.has_h1 = true;
    
      if ((me.dom_element.id.length) &&
          (ids.indexOf(me.dom_element.id)>=0)) {
        h1_info.has_label = true;          
      }
    } 
  } // end loop
  
  return h1_info;
  
};

/**
 * isH1UsedAsLabelForMainRole
 * 
 * @desc Determine if an H1 element is being used as a label for a main Role
 *
 * @return  Boolean
 */

OpenAjax.a11y.cache.MainElement.prototype.isH1UsedAsLabelForMainRole = function () {

  if (!this.level ||
      this.level !== 1 ||
      this.dom_element.id.length === 0 ||
      this.parent_landmark === null) {
    return false;
  }  

  var me = this.parent_landmark;
  
  while (me.dom_element.role !== 'main' && me.parent_landmark) {
    me = me.parent_landmark;
  }
  
  if ( me && 
       me.dom_element.role === 'main' && 
       me.dom_element.aria_labelledby.indexOf(this.dom_element.id) >= 0) {
    return true;   
  }
  
  return false;
  
};


