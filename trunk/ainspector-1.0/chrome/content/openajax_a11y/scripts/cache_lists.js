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
/*                            ListsCache                            */
/* ---------------------------------------------------------------- */

/**
 * ListsCache
 *
 * @constructor
 *
 * @desc Create a ListsCache object to hold ListElement objects
 *
 * @return ListsCache object
 */

OpenAjax.a11y.cache.ListsCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.list_elements = [];  // array of all ListElement objects in DOM
  this.child_elements = []; // array of top-level ListElement objects

  this.sort_property = 'document_order';
  this.up_to_date = false;
  this.length = 0;

};

/**
 * addListElement
 *
 * @desc Add ListElement object to ListsCache
 *
 * @param list_element ListElement object to add to the ListsCache
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addListElement = function (list_element) {

  if (list_element) {
    this.length += 1;
    list_element.document_order = this.length;
    list_element.cache_id = "list_" + this.length;
    this.list_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * update
 *
 * @desc Update the ListsCache by checking to see if the current
 *       DOMElement is a list-related element and that consequently
 *       a new ListElement should be added to this cache.
 *
 * @desc If the dom_element is an 'a' element (link), and there is
 *       a current list_info (i.e., we're in a list) increment
 *       the link_count property on the ListElement.
 *
 * @param dom_element Object DOMElement object to check
 *
 * @param list_info   Object
 *
 * @return nothing
 */

OpenAjax.a11y.cache.ListsCache.prototype.update = function (dom_element, list_info) {

  var li = new OpenAjax.a11y.cache.ListInfo(list_info);

  // check whether we need to add a new ListElement
  if (dom_element.tag_name === 'ul' ||
      dom_element.tag_name === 'ol' ||
      dom_element.tag_name === 'dl' ||
      dom_element.tag_name === 'li' ||
      dom_element.tag_name === 'dt' ||
      dom_element.tag_name === 'dd') {

    var le = new OpenAjax.a11y.cache.ListElement(dom_element);
    this.addListElement(le);

    if (list_info.list_element) {
      list_info.list_element.addChildListElement(le);
    }
    else {
      this.addChildListElement(le);
    }

    li.list_element = le;

    // OpenAjax.a11y.console(dom_element);
  }
  // check for anchor element contained by list element
  else {
    if (list_info.list_element &&
        dom_element.tag_name === 'a' &&
        (dom_element.node.href && dom_element.node.href.length)) {
      list_info.list_element.link_count += 1;
    }
  }

  return li;

};

/**
 * addChildListElement
 *
 * @desc Add a top-level ListElement object to the ListsCache
 *
 * @param list_element ListElement object to add to the ListsCache
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListsCache.prototype.addChildListElement = function (list_element) {

  if (list_element) {
    this.child_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * getListElementByCacheId
 *
 * @desc retrieve ListElement from ListsCache based on its cache_id
 *
 * @param cache_id String id assigned by cache
 *
 * @return ListElement or null
 */

OpenAjax.a11y.cache.ListsCache.prototype.getListElementByCacheId = function (cache_id) {

  var list_elements = this.list_elements;

  var i; // loop counter
  var max = list_elements.length; // loop control
  var le; // loop placeholder;

  for (i = 0; i < max; i++) {
    le = list_elements[i];
    if (le.cache_id === cache_id) {
      return le;
    }
  }

  return null;

};

/**
 * emptyList
 *
 * @desc Empties the current list of cache items
 *
 * @return none
 */

OpenAjax.a11y.cache.ListsCache.prototype.emptyList = function () {

  this.list_elements.length = 0;
  this.sort_property = 'document_order';

};

/* ---------------------------------------------------------------- */
/*                            ListElement                           */
/* ---------------------------------------------------------------- */

/**
 * ListElement
 *
 * @constructor
 *
 * @desc Cache object to be inserted into ListsCache; corresponds to
 *       either a UL, OL, DL, LI, DT, DD element in the DOM
 *
 * @param dom_element DOMElement object currently seen by traversal
 *
 * @return none
 */

OpenAjax.a11y.cache.ListElement = function (dom_element) {

  this.dom_element = dom_element;
  this.document_order = 0;
  this.child_elements = [];
  this.link_count = 0;

};

/**
 * addChildListElement
 *
 * @desc Add a child ListElement to its parent's child_elements array
 *
 * @param list_element child ListElement object to add to this element's
 *                     child_elements array
 *
 * @return boolean indicating success or failure
 */

OpenAjax.a11y.cache.ListElement.prototype.addChildListElement = function (list_element) {

  if (list_element) {
    this.child_elements.push(list_element);
    return true;
  }

  return false;

};

/**
 * isListOfLinks
 *
 * @desc Check whether a list container contains at least the
 *       minimum number of li elements with one and only one link.
 *
 * @param min_li The minimum number of li elements with one link
 *               that the ListElement must contain.
 *
 * @return boolean Indicate whether or not all criteria were met.
 */

OpenAjax.a11y.cache.ListElement.prototype.isListOfLinks = function (min_li) {
  // We assume that this method is only called on a ListElement
  // that is known to be either an ol or ul element. We want to
  // know (a) whether all of its li children contain only one link;
  // and (b) that it contains at least the specified minimum number
  // of li children.

  var child_elements = this.child_elements;
  var max = child_elements.length;
  var i;  // loop counter
  var ce; // loop placeholder

  // results
  var count_li = 0;
  var count_li_with_link = 0;

  for (i = 0; i < max; i++) {
    ce = child_elements[i];

    // ignore elements that are not 'li'
    if (ce.dom_element.tag_name !== 'li') continue;

    // we've got an 'li' element
    count_li += 1;

    // but each must have a link_count of 1
    if (ce.link_count != 1) return false;
    count_li_with_link += 1;
  }

  return (count_li == count_li_with_link) && (count_li >= min_li);

};

/* ---------------------------------------------------------------- */
/*                              ListInfo                            */
/* ---------------------------------------------------------------- */

/**
 * ListInfo
 *
 * @constructor
 *
 * @desc ListInfo is the constructor for saving the current list
 *       element information when traversing the DOM.
 *
 * @return ListInfo object
 */

OpenAjax.a11y.cache.ListInfo = function (list_info) {

  if (list_info) {
    this.list_element = list_info.list_element;
  }
  else {
    this.list_element = null;
  }

};
