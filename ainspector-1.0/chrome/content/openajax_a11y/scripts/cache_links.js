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
/*                            LinkCache                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinksCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates cache object representing information related to links in a web page
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object       
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {Array}    area_elements  - List of area element objects in the document 
 * @property {Array}    link_elements  - List of link element objects in the document 
 * @property {Number}   length         - Number of link element objects in the list 
 *
 * @property {String}   this.sort_property   - Link element object property the list of link objects is sorted by
 * @property {Boolean}  this.sort_ascending  - true if list is sorted in ascending order, otherwise false
 *
 * @property {Array}    links_sorted_by_href  - List of link element object sorted by href values;
 * @property {Array}    links_sorted_by_name  - List of link element object sorted by there accessible name (i.e link text);
 *  
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */

OpenAjax.a11y.cache.LinksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.up_to_date = false;
  
  this.area_elements = [];
  this.link_elements = [];
  this.length = 0;

  this.links_sorted_by_href = [];
  this.links_sorted_by_name = [];
  
}; 

/**
 * @method addToSortedByNameList
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Maintains a list of link elements sorted by accessible name property
 *
 * @param {LinkElement} link_element  - link element object to check 
 */

OpenAjax.a11y.cache.LinksCache.prototype.addToSortedByNameList = function (link_element) {

  var links_sorted_by_name     = this.links_sorted_by_name;
  var links_sorted_by_name_len = links_sorted_by_name.length;

  if (links_sorted_by_name_len === 0) {
    this.links_sorted_by_name.push(link_element);
    return;
  }
  
  var index_bottom = 0;
  var index_top = links_sorted_by_name_len - 1;
  var j = Math.round(index_top / 2);
  var count = links_sorted_by_name_len;

  while (count > 0) {
    le = links_sorted_by_name[j];
    
    if (link_element.accessible_name_for_comparison === le.accessible_name_for_comparison) {
      break;
    }
    else {
      count = count / 2;
      if (link_element.accessible_name_for_comparison < le.accessible_name_for_comparison) {
        index_top = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }      
    }
  }  

  for (var i = links_sorted_by_name_len; i > j; i--) {  
    links_sorted_by_name[i] = links_sorted_by_name[i-1];
  }

  links_sorted_by_name[j] = link_element;
  
};

/**
 * @method addToSortedByHREFList
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Maintains a list of link elements sorted by accessible name property
 *
 * @param {LinkElement} link_element  - link element object to check 
 */

OpenAjax.a11y.cache.LinksCache.prototype.addToSortedByHREFList = function (link_element) {

  var links_sorted_by_href     = this.links_sorted_by_href;
  var links_sorted_by_href_len = links_sorted_by_href.length;

  if (links_sorted_by_href_len === 0) {
    this.links_sorted_by_href.push(link_element);
    return;
  }
  
  var index_bottom = 0;
  var index_top = links_sorted_by_href_len - 1;
  var j = Math.round(index_top / 2);
  var count = links_sorted_by_href_len;

  while (count > 0) {
    le = links_sorted_by_href[j];
    
    if (link_element.href === le.href) {
      break;
    }
    else {
      count = count / 2;
      if (link_element.href < le.href) {
        index_top = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }      
    }
  }  

  for (var i = links_sorted_by_href_len; i > j; i--) {  
    links_sorted_by_href[i] = links_sorted_by_href[i-1];
  }

  links_sorted_by_href[j] = link_element;
  
};


/**
 * @method addLinkElement
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Adds a link element to the list of link elements and generates a cache id for the object.
 *       Checks if the link has a duplicate href or name in the document 
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.LinksCache.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.addToSortedByHREFList(link_element);
    this.addToSortedByNameList(link_element);

    this.length = this.length + 1;
    link_element.cache_id = "link_" + this.length; 
    link_element.document_order = this.length;
    this.link_elements.push(link_element);
    
    if (link_element.dom_element.tag_name === 'area') {
      this.area_elements.push(link_element);
    }
  } 
  
  return this.length;
};

/**
 * @deprecated getLinkElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Finds the the link element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of link element object
 *
 * @return {LinkElement} Returns cache link element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.LinksCache.prototype.getItemByCacheId = function (cache_id) {

  var i;

  var link_elements_len = this.link_elements.length;

  if (cache_id && cache_id.length) {  
   for (i=0; i < link_elements_len; i++) {
     if (this.link_elements[i].cache_id == cache_id) {
       return this.link_elements[i];
     }
   } // end loop
 } 

 return null;
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Resests the LinksCache object properties and empties all the lists and arrays 
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.emptyCache = function () {

  this.link_elements = [];
  this.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Updates the links cache object by checking to see if a dom element
 *          should be added to the cache
 *  
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in links cache
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCacheItems = function (dom_element) {

  var link_element;

  if ((dom_element.tag_name === 'a' && !dom_element.is_widget) ||
      (dom_element.tag_name === 'area' && !dom_element.is_widget) ||
      (dom_element.role === 'link')) {
      
        dom_element.is_interactive = true;
      
        link_element = new OpenAjax.a11y.cache.LinkElement(dom_element);    
    
        this.dom_cache.getNameForLink(link_element);
    
        this.dom_cache.links_cache.addLinkElement(link_element);
  }
   
};

/**
 * @method traverseDOMElementsForLinkElements
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses dom element objects in the tree to update the links cache 
 *
 * @param  {DOMElement}  dom_element - dom element object to check for inclusion in links cache
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.traverseDOMElementsForLinkElements = function (dom_element) {
 
  var i;

  if (!dom_element) return;

  if (dom_element.type == Node.ELEMENT_NODE) {

    this.updateCacheItems(dom_element);
  
    for (i = 0; i < dom_element.child_dom_elements.length; i++) {
      this.traverseDOMElementsForLinkElements(dom_element.child_dom_elements[i]);
    } // end loop
  }  
  
}; 


/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Traverses the DOMElements to update the links cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the links cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCache = function () {

  var i;
  var children = this.dom_cache.element_cache.child_dom_elements;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating link elements cache.");
  for (i=0; i < children_len; i++) {
    this.traverseDOMElementsForLinkElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed link elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
 
};

/**
 * @method sortLinkElements
 *
 * @memberOf OpenAjax.a11y.cache.LinksCache
 *
 * @desc Sorts link element array by link element object property
 *
 * @param {String}   property   - Property of link element object to sort the list
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LinksCache.prototype.sortLinkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.link_elements && this.link_elements.length && !this.link_elements[0][property]) {
    return false;
  } // endif

  var link_elements_len = this.link_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i=1; i < link_elements_len; i++) {
        if (this.link_elements[i-1][property] > this.link_elements[i][property]) {
          // swap the values
          temp = this.link_elements[i-1];
          this.link_elements[i-1] = this.link_elements[i];
          this.link_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i=1; i<link_elements_len; i++) {
        if (this.link_elements[i-1][property] < this.link_elements[i][property]) {
        // swap the values
        temp = this.link_elements[i-1];
        this.link_elements[i-1] = this.link_elements[i];
     this.link_elements[i] = temp;
     swapped = true;
    } 
   } // end loop
  } while (swapped);
 } 

 this.sort_property = property;
 this.sort_ascending = ascending;

 return true;

};

/* ---------------------------------------------------------------- */
/*                            LinkElement                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LinkElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates link element object representing information related to an a or area element on a web page
 *
 * @param  {DOMElement}   dom_element   - The dom element object representing the a or area element 
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the a or area element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the a or area element in the document in relationship to other a or area elements
 *
 * @property  {String}   href    - The absolute path of the href value 
 * @property  {Boolean}  is_url  - true if href is a url, otherwise false (i.e. internal link or broken)
 * @property  {Boolean}  is_link - true if href is a internal or exteranl link, otherwise
 * @property  {Number}   link_type - Type of link contstant
 *
 * @property  {String}   tab_index  - value of the tabindex attribute
 * @property  {String}   name_attr  - value of the name attribute
 * @property  {String}   target     - value of the target attribute
 *
 * @property  {String}   name                  - Calculated accessible name of the link 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 *  
 * @property  {Number}   height  - Height of the link in pixels
 * @property  {Number}   width   - Width of the link in pixels
 */
 
OpenAjax.a11y.cache.LinkElement = function (dom_element) {

  function getTypeOfLink(href, name, id) {
  
    href = href.toLowerCase();
    
    if (typeof href != 'string') return OpenAjax.a11y.LINK_TYPE.OTHER;
   
    if (href.length === 0) { 
      if ((name && name.length) || (id && id.length)) 
        return OpenAjax.a11y.LINK_TYPE.TARGET;
      else  
        return OpenAjax.a11y.LINK_TYPE.EMPTY;
    }    

    if (href === '#') return OpenAjax.a11y.LINK_TYPE.EMPTY;

    if (href.indexOf('http://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTP;
    else
      if (href.indexOf('https://') >= 0) return OpenAjax.a11y.LINK_TYPE.HTTPS;
      else
        if (href.indexOf('ftp://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTP;
        else
          if (href.indexOf('ftps://') >= 0) return OpenAjax.a11y.LINK_TYPE.FTPS;
          else 
            if (href.indexOf('file://') >= 0) return OpenAjax.a11y.LINK_TYPE.FILE;
            else 
              if (href.indexOf('javascript:') >= 0) return OpenAjax.a11y.LINK_TYPE.JAVASCRIPT;
              else 
                if (href.indexOf('mailto:') >= 0) return OpenAjax.a11y.LINK_TYPE.MAILTO;
                else 
                  if (href[0] === '#') return OpenAjax.a11y.LINK_TYPE.INTERNAL;
 
    return OpenAjax.a11y.LINK_TYPE.HTTP;
  }


  function testIfHrefIsURL(url) {
  
    if (typeof href != 'string') return false;
  
    if (url.indexOf('http://') >= 0) return true;
    else
      if (url.indexOf('https://') >= 0) return true;
      else
        if (url.indexOf('ftp://') >= 0) return true;
        else
          if (url.indexOf('ftps://') >= 0) return true;
          else 
            if (url.indexOf('file://') >= 0) return true;
 
    return false;
  }

  if (!dom_element.node) return;

  var href = dom_element.node.href;

  if (dom_element.role === 'link' && href !== 'string') href = "javascript:onclick";

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.role = dom_element.role;
 
  this.href  = href;
  this.is_url = testIfHrefIsURL(href);
  
  if (this.is_url) { 
    this.is_broken = OpenAjax.a11y.util.urlExists(href);
  }
  else {
    this.is_broken = OpenAjax.a11y.URL_RESULT.NOT_A_URL;
  }

  this.tab_index = dom_element.node.tabIndex;
  
  this.name_attribute = dom_element.node.getAttribute("name");
  this.is_target = this.name_attribute && (this.name_attribute.length > 0);

  var link_type = getTypeOfLink(href, this.name_attribute, dom_element.id);
  
  this.link_type = link_type;
  
  this.is_link = false;

  if ((link_type !== OpenAjax.a11y.LINK_TYPE.OTHER) &&
      (link_type !== OpenAjax.a11y.LINK_TYPE.TARGET) &&
      (link_type !== OpenAjax.a11y.LINK_TYPE.EMPTY)) this.is_link = true;
  
  this.target  = dom_element.node.getAttribute("target");

  this.height   = parseInt(dom_element.node.offsetHeight, 10);
  this.width   = parseInt(dom_element.node.offsetWidth, 10);
  
  var ano = dom_element.getTextObject();
   
  // If the link is an image, use the image height and width
  if ((this.height === 0) && 
      (this.width === 0) && 
      (ano.height) > 0 && 
      (ano.width > 0 )) {
    this.height = ano.height;
    this.width = ano.width;
  } // endif

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LinkElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'href');

  cache_nls.addPropertyIfDefined(attributes, this, 'tab_index');
  cache_nls.addPropertyIfDefined(attributes, this, 'name_attribute');
  cache_nls.addPropertyIfDefined(attributes, this, 'target');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_name_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_description');
  cache_nls.addPropertyIfDefined(properties, this, 'accessible_description_for_comparison');

  cache_nls.addPropertyIfDefined(properties, this, 'is_broken');
  cache_nls.addPropertyIfDefined(properties, this, 'is_url');
  cache_nls.addPropertyIfDefined(properties, this, 'is_target');
  cache_nls.addPropertyIfDefined(properties, this, 'link_type');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LinkElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LinkElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getLinkType
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Returns an array of style items 
 *
 * @return {String} Returns a NLS string representing the type of link
 */

OpenAjax.a11y.cache.LinkElement.prototype.getLinkType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSValue('link_type', this.link_type);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LinkElement
 *
 * @desc Creates a text string representation of the link element object 
 *
 * @return {String} Returns a text string representation of the link element object
 */
 
 OpenAjax.a11y.cache.LinkElement.prototype.toString = function () {
  
   var str = "";
   
   if ((this.dom_element.tag_name === 'a') || (this.dom_element.tag_name === 'area')) {
     str = this.dom_element.tag_name + " : " + this.accessible_name; 
   }
   else {
     str = this.dom_element.tag_name + "[role='link']: " + this.accessible_name;    
   }
   return str;
 };


/* ---------------------------------------------------------------- */
/*                         DuplicateNameItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor DuplicateNameItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates duplicate name object to identify links with the same accessible name
 *
 * @param  {String}   name                  - Accessible name of a link 
 * @param  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 *
 * @property  {String}   name                  - Accessible name of the link 
 * @property  {String}   name_for_comparison   - Accessible name for comparison (i.e. lowercase, trimmed and space normalized)
 * 
 * @property  {Array}  link_elements  -  List of all the link objects that share the same accessible name
 */

OpenAjax.a11y.cache.DuplicateNameItem = function (name, name_for_comparison) {

  this.accessible_name                = name;
  this.accessible_name_for_comparison = name_for_comparison;
  this.link_elements = [];

};

/**
 * @method addLinkElement
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Adds a link element to a list of links with duplicate accessible names
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.link_elements.push( link_element );
  } 

  return this.link_elements.length;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};




/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

 cache_nls.addPropertyIfDefined(properties, this, 'name');
 cache_nls.addPropertyIfDefined(properties, this, 'name_for_comparison');
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};


/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateNameItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.DuplicateNameItem.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};




/* ---------------------------------------------------------------- */
/*                         DuplicateHREFItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor DuplicateHREFItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates duplicate name object to identify links with the same hrefs 
 *
 * @param  {String}   href  - href of a link 
 *
 * @property  {String}   href  -  href of a link
 * 
 * @property  {Array}   link_elements  -  List of all the link objects that share the same href
 */

OpenAjax.a11y.cache.DuplicateHREFItem = function (href) {

  this.href = href;
  this.link_elements = [];

};

/**
 * @method addLinkElement
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Adds a link element to a list of links with duplicate hrefs
 *
 * @param  {LinkElement}  link_element  - link element to add 
 *
 * @return {Number} Returns the length of the list of link elements
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.addLinkElement = function (link_element) {

  // item must exist 
  if (link_element) {
    this.link_elements.push( link_element ); 
  } 

  return this.link_elements.length;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'href');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);
 
  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DuplicateHREFItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.DuplicateHREFItem.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};




