  // ****************************************************** 
  //
  // Copyright 2011 OpenAjax Alliance
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //  http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  //
  // ****************************************************** 
  

 /** ===============================================================
 *
 * AbbreviationsCache
 *
 * @desc Constructor for AbbreviationsCache object which contains a list of 
 *    color contrast items representing the color contrast combinations
 *    used in a document. The item also contains a list of all the 
 *    DOM Element nodes that contain that color contrast combination
 *
 * @constructs
 *
 * @return  AbbreviationsCache object 
 *
 ================================================================ */

OpenAjax.a11y.cache.AbbreviationsCache = function (dom_cache) {

 this.dom_cache = dom_cache;
 this.abbreviation_items = [];
 
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 
 this.up_to_date = false;
 this.length = 0;

 return this;

};

/** ================================================================
*
* addAbbreviationItem
*
* @desc Adds a DOM Element object information to a color contrast item in the color contrast 
*    cache, if it does not match any of the current color contrast items it will create a 
*    new color contrast item.
*
* @param dom_element Object  DOM Element object to add to a color contrast item in the cache
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.addAbbreviationItem = function (dom_element) {

 var abbreviation_item = null;
 var abbreviation_items_len = this.abbreviation_items.length;
 var found = false;
 var node_text = dom_element.getText();

 for (var i=0; i < abbreviation_items_len; i++ ) {
  abbreviation_item = this.abbreviation_items[i];
  
  if (node_text == abbreviation_item.abbreviation_text) {
    
    abbreviation_item.dom_elements.push(dom_element);
    abbreviation_item.count = abbreviation_item.dom_elements.length;
    
    found = true; 
    break;
  }
 } // end loop

 if (!found) {
  abbreviation_item = new OpenAjax.a11y.cache.AbbreviationItem(node_text);
  
  abbreviation_item.dom_elements.push(dom_element);
  abbreviation_item.count = abbreviation_item.dom_elements.length;
  abbreviation_item.cache_id = "abbrev_" + this.length;  
  
  this.abbreviation_items.push(abbreviation_item);
  this.length = this.length + 1;
 }

};

/** ================================================================
*
* getAbbreviationItemById
*
* @desc Returns the AbbreviationItem object with the id
*
* @param id String  id of the AbbreviationItem object
*
* @return AbbreviationItem object if found, or null if not found 
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.getAbbreviationItemById = function (id) {

 var abbreviation_items_len = this.abbreviation_items.length;

 if (id && id.length) {  
  for (var i=0; i < abbreviation_items_len; i++) {
   if (this.abbreviation_items[i].cache_id == id) {
    return this.abbreviation_items[i];
   }
  } // end loop
 } 

 return null;
};

/** ================================================================
*
* emptyList
*
* @desc Empties all the AbbreviationItem Objects items from the color 
*    contrast cache
*
* @return none
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.emptyList = function () {

 this.abbreviation_items.length = 0;
 this.sort_property = 'abbreviation_text';
 this.sort_ascending = true;
 this.up_to_date = false;

};

/** ================================================================
*
* updateCacheItems
*
* @desc Updates the AbbreviationsCache object with information from a DOMElement object
*    This is used during the creation of the cache and is used by the functions for
*    either creating the cache all at one time or selectively
*
* @param dom_element Object DOM Element object to add to the color contrast cache
*
* @return nothing
*
* =============================================================== */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCacheItems = function (dom_element) {

 if ((dom_element.tag_name == 'abbr') ||
   (dom_element.tag_name == 'acronym')) {

   this.addAbbreviationItem(dom_element);
   
 }
 
};

/** ================================================================
*
* transverseDOMElementsForColorContrast
*
* @desc Traverses the DOMElements to update the color contrast cache
*
* @return nothing
*
* =============================================================== */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.transverseDOMElementsForColorContrast = function (dom_element) {

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  this.updateCacheItems(dom_element);
  
  for (var i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForColorContrast(dom_element.children[i]);
  } // end loop
  
 }  
  
};

/** ================================================================
*
* updateCache
*
* @desc Traverses the DOMElements to update the color contrast cache
*    This function is used to update the color contrast cache 
*    when needed by a rule, it sets the up to date flag when done
*
* @return nothing
*
* =============================================================== */
 
OpenAjax.a11y.cache.AbbreviationsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating color contrast cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForColorContrast(children[i]);
 }  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed color contrast cache update, number of cache items is " + this.length);

 this.up_to_date = true;
 
};

/** ================================================================
*
* sortAbbreviationItems
*
* @desc 
*
 * @param ascending  Boolean true if sort in ascending order; false in descending order
*
* @return true if list was sorted, false if not
*
* =============================================================== */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.sortAbbreviationItems = function(ascending) {

 var swapped = false;
 var temp = null;
 var i;

 if( !this.abbreviation_items || (this.abbreviation_items.length === 0)) {
  return false;
 } // endif

 this.sort_ascending = ascending;
 
 var abbreviation_items_len = this.abbreviation_items.length;

 if( ascending ) {
  do{
    swapped = false;
    for (i = 1; i < abbreviation_items_len; i++ ) {
     if (this.abbreviation_items[i-1].abbreviation_text > this.abbreviation_items[i].abbreviation_text) {
      // swap the values
      temp = this.abbreviation_items[i-1];
      this.abbreviation_items[i-1] = this.abbreviation_items[i];
      this.abbreviation_items[i] = temp;
      swapped = true;
     } 
    } // end loop

  } while (swapped);
 }
 else {
  do {
   swapped = false;
    for (i = 1; i < abbreviation_items_len; i++ ) {
     if (this.abbreviation_items[i-1].abbreviation_text < this.abbreviation_items[i].abbreviation_text) {
      // swap the values
      temp = this.abbreviation_items[i-1];
      this.abbreviation_items[i-1] = this.abbreviation_items[i];
      this.abbreviation_items[i] = temp;
      swapped = true;
     } 
    } // end loop
  } while (swapped);
 } 

 this.sort_property = 'abbreviation_text';
 
 return true;

}; 

 /** ===============================================================
 *
 * toString
 *
 * @desc Return a string representation of the color contrast cache
 *
 * @return  String
 *
 ================================================================ */

OpenAjax.a11y.cache.AbbreviationsCache.prototype.toString = function () {

 var item;

 var str ="\n\nAbbreviation Information\n";

 var list_length = this.abbreviation_items.length;
 
 for (var i=0; i < list_length; i++ ) {
  str += this.abbreviation_items[i].toString();  
 } // end loop

 return str;
};

 /** ===============================================================
 *
 * AbbreviationItem
 *
 * @desc Constructor for AbbreviationItem object which contains information
 *    about a unique set of color contrast features of the web page 
 *
 * @constructs
 *
 * @return  AbbreviationItem object 
 *
 ================================================================ */
 
OpenAjax.a11y.cache.AbbreviationItem = function (abbreviation) {

  this.abbreviation_text = abbreviation;
  this.count = 0;

  this.dom_elements = [];
   
}; 

 /** ===============================================================
 *
 * toString
 *
 * @desc Provide information about the abbreviation item as a text
 *    string.
 *
 * @return  String 
 *
 ================================================================ */


OpenAjax.a11y.cache.AbbreviationItem.prototype.toString = function () {

 return "Abbreviation: " + abbreviation_text; 
};



