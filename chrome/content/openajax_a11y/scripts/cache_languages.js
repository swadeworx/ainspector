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
/*                            LanguagesCache                        */
/* ---------------------------------------------------------------- */


/**
*
* LanguagesCache
*
* @desc 
*
* @constructs
*
* @return   LanguagesCache object
*/

OpenAjax.a11y.cache.LanguagesCache = function (dom_cache) {
    
    this.dom_cache = dom_cache;
    this.language_items =[];
    
    this.sort_property = 'lang';
    this.sort_ascending = false;
    
    this.up_to_date = false;
    this.length = 0;
    
    return this;
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
 * getLanguageItemByCacheId
 *
 * @desc Returns the ColorContrastItem object with the id
 *
 * @param id String   id of the ColorContrastItem object
 *
 * @return LanguageItem object if found, or null if not found
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.getLanguageItemByCacheId = function (cache_id) {
    
    var i;
    var language_items_len = this.language_items.length;
    
    if (cache_id && cache_id.length) {
        for (i = 0; i < language_items_len; i++) {
            if (this.language_items[i].cache_id == cache_id) {
                return this.language_items[i];
            }
        }
    }
    
    return null;
};

/**
 * emptyList
 *
 * @desc Empties all the ColorContrastItem Objects items from the color
 *       contrast cache
 *
 * @return none
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.emptyList = function () {
    
    this.language_items.length = 0;
    this.up_to_date = false;
};

/**
 * updateCacheItems
 *
 * @desc Updates the LanguagesCache object with information from a DOMElement object
 *       This is used during the creation of the cache and is used by the functions for
 *       either creating the cache all at one time or selectively
 *
 * @param dom_element Object DOM Element object to add to the color contrast cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCacheItems = function (dom_element) {
    
    if (dom_element.lang && dom_element.lang.length) {
      this.addLanguageItem(dom_element);
    }  
};

/**
 * transverseDOMElementsForLanguages
 *
 * @desc Traverses the DOMElements to update the languages cache
 *
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.transverseDOMElementsForLanguages = function (dom_element) {
    
    var i;
    if (! dom_element) return;
    
    if (dom_element.type == NODE_TYPE.ELEMENT) {
        
        this.updateCacheItems(dom_element);
        
        for (i = 0; i < dom_element.children.length; i++) {
            this.transverseDOMElementsForColorContrast(dom_element.children[i]);
        }
        // end loop
    }
};

/**
 * updateCache
 *
 * @desc 
 * @return nothing
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.updateCache = function () {
    var i;
    var children = this.dom_cache.element_cache.children;
    var children_len = children.length;
    
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating language cache.");
    for (i = 0; i < children_len; i++) {
        this.transverseDOMElementsForLanguages(children[i]);
    }
    this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed language cache update, number of cache items is " + this.length);
    
    this.up_to_date = true;
};

/**
 * sortCCRItems
 *
 * @desc
 *
 * @param ascending   Boolean  true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LanguagesCache.prototype.sortCCRItems = function (ascending) {
    
    var swapped = false;
    var temp = null;
    var i;
    
    if (! this.color_contrast_items || (this.color_contrast_items.length === 0)) {
        return false;
    }
    // endif
    
    this.sort_ascending = ascending;
    
    var color_contrast_items_len = this.color_contrast_items.length;
    
    if (ascending) {
        do {
            swapped = false;
            for (i = 1; i < color_contrast_items_len; i++) {
                if (parseInt(this.color_contrast_items[i - 1].color_contrast_ratio, 10) > parseInt(this.color_contrast_items[i].color_contrast_ratio, 10)) {
                    // swap the values
                    temp = this.color_contrast_items[i - 1];
                    this.color_contrast_items[i - 1] = this.color_contrast_items[i];
                    this.color_contrast_items[i] = temp;
                    swapped = true;
                }
            }
            // end loop
        }
        while (swapped);
    } else {
        do {
            swapped = false;
            for (i = 1; i < color_contrast_items_len; i++) {
                if (parseInt(this.color_contrast_items[i - 1].color_contrast_ratio, 10) < parseInt(this.color_contrast_items[i].color_contrast_ratio, 10)) {
                    // swap the values
                    temp = this.color_contrast_items[i - 1];
                    this.color_contrast_items[i - 1] = this.color_contrast_items[i];
                    this.color_contrast_items[i] = temp;
                    swapped = true;
                }
            }
            // end loop
        }
        while (swapped);
    }
    
    this.sort_property = 'color_contrast_ratio';
    
    return true;
};

/**
 * toString
 *
 * @desc Return a string representation of the color contrast cache
 *
 * @return   String
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

/**
 * LanguageItem
 *
 * @desc Constructor for ColorContrastItem object which contains information
 *       about a unique set of color contrast features of the web page
 *
 * @constructs
 *
 * @return   LanguageItem object
 */
 
OpenAjax.a11y.cache.LanguageItem = function (language) {
    
    this.language = language;
    this.dom_elements = [];
    
};

/**
 * addDOMElement
 *
 * @desc 
 *
 * @return   nothing
 */

OpenAjax.a11y.cache.LanguageItem.prototype.addDOMElement = function (dom_element) {
    
    if (dom_element) {
      this.dom_elements.push(dom_element);
    }
};

/**
 * toString
 *
 * @desc Provide information about the language item as a text
 *       string.
 *
 * @return   String
 */

OpenAjax.a11y.cache.LanguageItem.prototype.toString = function () {
    
    return "  Language: " + this.language + " (" + this.dom_elements.length + " elements)\n";
    
};
