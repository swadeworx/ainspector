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
/*                            LanguagesCache                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor LanguagesCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for languages cache object which contains a list of 
 *    language items representing the language changes of content 
 *    in the in a document. The language items also contain a list of all the 
 *    dom element objects that share the same language
 *
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                         based on whether a rule needs the cache
 *
 * @property {String}    sort_property   - Property of language item that the list is sorted on  
 * @property {Boolean}   sort_ascending  - true if list is sorted by ascending values, otherwsie false 
 *
 * @property {Array}    language_items  - List of language items 
 * @property {Number}   length          - Number of language items in list 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache
 */
OpenAjax.a11y.cache.LanguagesCache = function (dom_cache) {
    
  this.dom_cache  = dom_cache;
  this.up_to_date = false;
    
  this.language_items =[];
  this.length = 0;
        
  this.sort_property  = 'lang';
  this.sort_ascending = false;

  this.rule_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
    
};

/**
 * addLanguageItem
 *
 * @desc Adds a DOM Element object information to a color contrast item in the color contrast
 *       cache, if it does not match any of the current color contrast items it will create a
 *       new color contrast item.
 *
 * @param dom_element Object   DOM Element object to add to a color contrast item in the cache
 *
 * @return nothing
 * @method addLanguageItem
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Adds a DOM Element object with an language property to the langauge item list.
 *       If the abreviation item does not exist the function will create one
 *
 * @param {DOMElement}  dom_element  - dom element to add to a abbreviation list
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.addLanguageItem = function (dom_element) {
    
    var i;
    var li; //language item
    var found = false;
    var language_items = this.language_items;
    var language_items_len = language_items.length; 
    
    for (i=0; i<language_items_len; i++) {
      if (dom_element.lang == language_items[i].language) {
        found = true;
        language_items[i].addDOMElement(dom_element);
        break;
      }
    }     
    if (!found) {
        li = new OpenAjax.a11y.cache.LanguageItem(dom_element);
        
        li.addDOMElement(dom_element);
        this.length += 1;
        this.cache_id = "lang_" + this.length;
        this.language_items.push(li);
    }
};

/**
 * @deprecated getLanguageItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.languagesCache
 *
 * @desc Returns the language item object with the cache id
 *
 * @param {String}  cache_id  - cache id of the language item object
 *
 * @return {LanguageItem} Returns language item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getLanguageItemByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.languagesCache
 *
 * @desc Returns the language item object with the cache id
 *
 * @param {String}  cache_id  - cache id of the language item object
 *
 * @return {LanguageItem} Returns language item object if cache id found, otherwise null  
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getItemByCacheId = function (cache_id) {
    
  var i, j;
  var li, de;
  var dom_elements, dom_elements_len;
  
  var language_items     = this.language_items;
  var language_items_len = language_items.length;
    
  if (cache_id && cache_id.length) {
  
    for (i = 0; i < language_items_len; i++) {
      li = language_items[i];
      
      if (li.cache_id == cache_id) return li;
      
      dom_elements     = li.dom_elements;
      dom_elements_len = dom_elements.length;
      
      for (j = 0; j < dom_elements_len; j++ ) {
        de = dom_elements[j];
        if (de.cache_id == cache_id) return de;
      } // end loop
    } // end loop  
  }
    
  return null;
  
};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Empties all the language items from the cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.emptyCache = function () {
    
    this.language_items.length = 0;
    this.up_to_date = false;
};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Updates the language cache object with information from a dom element object
 *       This is used during the creation of the cache and is used by the functions for
 *       either creating the cache all at one time or selectively
 *
 * @param {DOMElement}  dom_element  - DOM Element object to add to the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCacheItems = function (dom_element) {
    
    if (dom_element.lang && dom_element.lang.length) {
      this.addLanguageItem(dom_element);
    }  
};

/**
 * @method traverseDOMElementsForLanguages
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.traverseDOMElementsForLanguages = function (dom_element) {
    
    var i;
    if (! dom_element) return;
    
    if (dom_element.type == NODE_TYPE.ELEMENT) {
        
        this.updateCacheItems(dom_element);
        
        for (i = 0; i < dom_element.child_dom_elements.length; i++) {
            this.traverseDOMElementsForLanguages(dom_element.child_dom_elements[i]);
        }
        // end loop
    }
};

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Traverses the DOMElements to update the language cache
 *    This function is used to update the language cache 
 *    when needed by a rule, it sets the up to date flag when done
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCache = function () {
    var i;
    var children = this.dom_cache.element_cache.child_dom_elements;
    var children_len = children.length;
    
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating language cache.");
    for (i = 0; i < children_len; i++) {
        this.traverseDOMElementsForLanguages(children[i]);
    }
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed language cache update, number of cache items is " + this.length);
    
    this.up_to_date = true;
};


/**
 * @method sortLanguageItems
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Sorts languages by language property
 *
 * @param {Boolean}  ascending  - true if sort in ascending order; false in descending order
 *
 * @return {Boolean}  Returns true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.sortLanguageItems = function(ascending) {

  var swapped = false;
  var temp = null;
  var i;

  if( !this.language_items || (this.language_items.length === 0)) {
    return false;
  } // endif

  this.sort_ascending = ascending;
 
  var language_items_len = this.language_items.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < language_items_len; i++ ) {
        if (this.language_items[i-1].language > this.language_items[i].language) {
          // swap the values
          temp = this.language_items[i-1];
          this.language_items[i-1] = this.language_items[i];
          this.language_items[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < language_items_len; i++ ) {
        if (this.language_items[i-1].language < this.language_items[i].language) {
          // swap the values
          temp = this.language_items[i-1];
          this.language_items[i-1] = this.language_items[i];
          this.language_items[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  } 

  this.sort_property = 'language';
 
  return true;

}; 

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LanguagesCache
 *
 * @desc Returns a text string representation of the language cache object 
 *
 * @return {String} Returns string represention the language cache object
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.toString = function () {
    
    var i;
    
    var str = "\n\n Language Information\n";
    
    var list_length = this.language_items.length;
    
    for (i = 0; i < list_length; i++) {
        str += this.language_items[i].toString();
    }
    // end loop
    
    return str;
};

/* ---------------------------------------------------------------- */
/*                      LanguageItem                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LanguageItem
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructor for languages item object which contains information
 *       about dom elements that share the same abbreviation 
 * 
 * @param  {String}  language  - language reference value
 *         
 * @property  {String}  language   - text of abbreviation
 * @property  {String}  cache_id   - String that uniquely identifies the cache element in the cache
 *
 * @property  {Array}   dom_elements  - List of dom elements associated with the language reference 
 * @property  {Number}  count         - Number of dom elements that share this language reference
 */
  
OpenAjax.a11y.cache.LanguageItem = function (language) {
    
  this.cach_id = "";
  
  this.language = language;
  this.dom_elements = [];
  this.count = 0;
    
};

/**
 * @method addDOMElement
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc  Adds a dom element object to the list of dom elements associated with this language reference 
 *
 * @param  {DOMElement} dom_element  - dom element object to add
 */

OpenAjax.a11y.cache.LanguageItem.prototype.addDOMElement = function (dom_element) {
    
    if (dom_element) {
      this.dom_elements.push(dom_element);
    }
};


/**
 * @method getResultRules
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getResultRules = function () {
  return this.dom_text_nodes[0].getResultRules();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'is_large_font');
  cache_nls.addPropertyIfDefined(properties, this, 'color_contrast_ratio');
 
  cache_nls.addPropertyIfDefined(properties, this, 'color');
  cache_nls.addPropertyIfDefined(properties, this, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this, 'font_weight');  
  
  return properties;
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getAttributes = function (unsorted) {

  return [];
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = [];
  
  cache_nls.addPropertyIfDefined(properties, this, 'language');
  
  return properties;
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return null;
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LanguageItem.prototype.getEvents = function () {
   
  return [];
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LanguageItem
 *
 * @desc Returns a text string representation of the language reference object 
 *
 * @return {String} Returns string represention the language reference object
 */

OpenAjax.a11y.cache.LanguageItem.prototype.toString = function () {
    
    return "  Language: " + this.language + " (" + this.dom_elements.length + " elements)\n";
    
};
