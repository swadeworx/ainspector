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
/*                       DOMElementCache                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor DOMElementCache
 *
 * @memberOf OpenAjax.a11y.cache
 * 
 * @desc Creates a DOMElementCache object for represeting a DOM in a web browser
 *         
 * @property {Array}  dom_elements        - A simple array of all the DOMElement objects in the cache
 * @property {Array}  dom_text            - A simple array of all the DOMText objects in the cache
 * @property {Array}  child_dom_elements  - The roor of a tree of DOMElement objects representing the node relationships on the DOM
 * @property {String} sort_property       - String  The DOMElement property the dom_elements array is sorted by
 * @property {Number} length              - The running length of the dom_elements array used for calculating the cache_id property of a DOMElement
 */

OpenAjax.a11y.cache.DOMElementCache = function () {

 this.dom_elements = [];
 this.dom_text = [];
 
 this.child_dom_elements = [];
 
 this.sort_property = 'document_order';
 this.length = 0;
 this.text_length = 0;

};

/** 
 * @method initCache
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Initializes properties of the DOMElementCache
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.initCache = function () {

 this.dom_elements       = [];
 this.child_dom_elements = [];
 this.sort_property      = 'document_order';
 this.length             = 0;

};

/**
 * @method addDOMElement
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement object to the array of all DOMElements and calculates the elements cache ID
 *
 * @param {DOMElement Object}  dom_element  - DOMElement object to add 
 *
 * @return  {Number}  Returns the current number of elements in the array of DOMElements
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMElement = function (dom_element) {

 // item must exist and have the position property
 if (dom_element) {
  this.length = this.length + 1;
  dom_element.document_order = this.length;
  dom_element.cache_id = "dome_" + this.length;
  this.dom_elements.push( dom_element );
 }

 return this.dom_elements.length;

};

/**
 * @method addDOMText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOM text object to the array of all DOM text and calculates the cache ID
 *
 * @param {DOMText Object}  dom_text  - DOM text object to add 
 *
 * @return  {Number}  Returns the current number of elements in the array of DOM text objects
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addDOMText = function (dom_text) {

 // item must exist and have the position property
 if (dom_text) {
  this.text_length  += 1;
  dom_text.document_order = this.text_length;
  dom_text.cache_id       = "domt_" + this.text_length;
  this.dom_text.push(dom_text);
 }

 return this.dom_text.length;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Adds a DOMElement or DOMText object to the root level of the tree reflecting the DOM of document  
 *
 * @param {DOMElement or DOMText object} dom_object  - DOMElement or DOMText object to add to the tree  
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.addChild = function (dom_object) {

  if (dom_object) {
    this.child_dom_elements.push(dom_object);
  }
};

/**
 * @method getDOMElementById
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns the the DOMElement object with the id attribute value
 *
 * @param {String} id - id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated id if found, otherwise null
 */
 
OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementById = function (id) {

  var i;
  var dom_elements_len = this.dom_elements.length;

  if (id && id.length) {
    for (i=0; i < dom_elements_len; i++) {
      if (this.dom_elements[i].id == id) {
        return this.dom_elements[i];
      }
    } // end loop
  }
  return null;
};

/**
 * @deprecated getDOMElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};

/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Finds the the DOMElement object with the matching cache ID value
 *
 * @param {String} cache_id  - cache_id of DOMElement object to find
 *
 * @return {DOMElement} Returns DOMElement with the associated cache ID if found, otherwise null
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemByCacheId = function (cache_id) {

  var i;
  var dom_elements_len = this.dom_elements.length;

  if (cache_id && cache_id.length) {
    for (i=0; i < dom_elements_len; i++) {
      if (this.dom_elements[i].cache_id == cache_id) {
        return this.dom_elements[i];
      }
    } // end loop
  }
  return null;
};


/**
 * @method getItemsByNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Returns an array of cache items with node results based on the filter 
 *
 * @param  {Number}  filter  - Filter for returning items with node results of a 
 *                             particular type(s)  
 *
 * @return {Array} Returns array of cache items, can be empty
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getItemsByNodeResults = function (filter, all_flag) {

  return OpenAjax.a11y.util.getItemsByNodeResults(this.dom_elements, filter, all_flag);

};

/**
 * @method sortDOMElements
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Sorts the dom_elements array based on a property of the DOMElement object
 *
 * @param  {String}  property  - DOMElement object property used to sort the array
 * @param  {Boolean} ascending - Boolean  true if sort in ascending order; false in descending order
 *
 * @return  {Boolean}  true if list was sorted, false if not
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.sortDOMElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  // if the property does not exist or if the cache is empty return false
  if( this.dom_elements &&
    this.dom_elements.length &&
    !this.dom_elements[0][property] ) {
    return false;
  }

  var dom_elements_len = this.dom_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i = 1; i < dom_elements_len; i++ ) {
        if (this.dom_elements[i-1][property] > this.dom_elements[i][property]) {
          // swap the values
          temp = this.dom_elements[i-1];
          this.dom_elements[i-1] = this.dom_elements[i];
          this.dom_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i = 1; i < dom_elements_len; i++) {
        if (this.dom_elements[i-1][property] < this.dom_elements[i][property]) {
          // swap the values
          temp = this.dom_elements[i-1];
          this.dom_elements[i-1] = this.dom_elements[i];
          this.dom_elements[i] = temp;
          swapped = true;
        }
      } // end loop
    } while (swapped);
  }

  this.sort_property = property;

  return true;
};

/**
 * @method getTextFromIds
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc    Gets the accessible text content from a list of ids
 *
 * @note    Used in calculating accessible names, labels and descriptions
 *
 * @param   {String} ids - a space separated list of ids
 *
 * @return  {String} Returns a string with the concatenated text content of the elements with ids  
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.getTextFromIds = function( ids ) {

  var i;
  var text_array = [];
  var id_array = ids.split(' ');
  var id_array_len = id_array.length;
  var dom_element = null;

  for (i=0; i<id_array_len; i++) {
    dom_element = this.getDOMElementById(id_array[i]);
    if (dom_element) {
      text_array.push(dom_element.getText());
    }
  } // end loop

  return text_array.join(' ');
};

/**
 * @method checkForUniqueIDs
 *
 * @memberOf OpenAjax.a11y.cache.DOMElementCache
 *
 * @desc Check DOMElements for unique ids and set id_unique property for all DOMElements in the cache
 *       Sets the 'id_unique' property on DOMElement objects that do not have unique ID attribute values
 */

OpenAjax.a11y.cache.DOMElementCache.prototype.checkForUniqueIDs = function () {

  var i;
  var j;
 
  var dom_elements = this.dom_elements;
  var dom_elements_len1 = dom_elements.length-1;
  var dom_elements_len2 = dom_elements.length;
 
  var de1;
  var de2;

  for (i = 0; i < dom_elements_len1; i++ ) {
    de1 = dom_elements[i];

    for (j=i+1; j < dom_elements_len2; j++) {
      de2 = dom_elements[j];

      if(de1.id.length && de2.id.length && de1.id == de2.id) {
        de1.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
        de2.id_unique = OpenAjax.a11y.ID.NOT_UNIQUE;
      }      
    }  
  }
};


/* ---------------------------------------------------------------- */
/*                       DOMText Object                             */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor DOMText
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc DOMText object represents DOM nodes of type text
 * 
 *
 * @param  {Object}      node           - The DOM text node 
 * @param  {DOMElement}  parent_element - DOMElement object that is the current parent in the tree
 *
 * @property  {DOMElement}  parent_landmark      - LandmarkElement object that contains this element
 *
 * @property  {LandmarkElement}  parent_landmark - LandmarkElement object that contains the text content
 *
 * @property {Number}  type - Type of DOM node element or text
 * @property {String}  text - Text content of DOM text node
 *
 * @property {String}   text_normalized         - Normalized text in the node
 * @property {Number}   text_length             - length of the normalized text in the node 
 * 
 * @property {String}  cache_id        - String that uniquely identifies the cache element in the DOMCache
 * @property {Number}  document_order  - The ordinal position of this DOM text node in the DOM
 *
 * @property {Object}  computed_style  - Object that contains information about run time styling of the node
 * @property {Object}  events          - Object that contains information about event handlers attached to the node and its descendents
 *
 * @property {Boolean}  has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}    rules_violations       - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}    rules_manual_checks    - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}    rules_warnings         - Array of NodeResult objects with severity of 'Warning'
 * @property {Array}    rules_passed           - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}    rules_hidden           - Array of NodeResult objects with severity of 'Hidden'
 */
 
OpenAjax.a11y.cache.DOMText = function (node, parent_element) {

  this.type = Node.TEXT_NODE;
  this.text = node.data;
  this.parent_element = parent_element;
 
  this.parent_landmark      = null;
 
  this.text_normalized = this.text.normalizeSpace();
  var text_length      = this.text_normalized.length;
  this.text_length     = text_length; 
  
  parent_element.addToCharacterCount(text_length);
 
  this.computed_style = parent_element.computed_style;
 
  // Create areas to store rule results associates with this node
  this.has_rule_results = false;
  this.rules_violations                = [];
  this.rules_manual_checks             = [];
  this.rules_warnings                  = [];
  this.rules_passed                    = [];
  this.rules_hidden                    = [];
};

/**
 * @method addText
 *
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc   Check DOMElement for presence of attribute with specified value
 *
 * @param  {String} text  - text content to add
 *
 * @return {Number}  Length of the normailized text content of the DOM text node
 */

OpenAjax.a11y.cache.DOMText.prototype.addText = function (text) {

  this.text += text;
  
  this.text_normalized = this.text.normalizeSpace();
  
  var text_length = this.text_normalized.length;

  this.parent_element.addToCharacterCount(text_length - this.text_length);

  this.text_length = text_length;
  
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMText.prototype.getNodeResults = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the worst severity level of rule results  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMText.prototype.getAccessibility = function () {
   
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var a = {};

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_violations.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
    a.style       = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;
  
  return a;
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have attributes
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getAttributes = function (unsorted) {

  return [];

};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an empty array, text nodes do not have events
 *
 * @return {Array} Returns a empty array
 */

OpenAjax.a11y.cache.DOMText.prototype.getEvents = function (unsorted) {

  return [];

};


/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'text_normalized');
  cache_nls.addPropertyIfDefined(properties, this, 'text_length');
  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');
  
  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');
  
  return properties;

};

/**
 * @method getColorContrastSummary
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the worst severity level for color contrast rules  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMText.prototype.getColorContrastSummary = function () {
   
  function hasRule(node_results, rules) {
  
    var i;
    var j;
    
    var node_results_len = node_results.length;
    var rules_len        = rules.length;
    
    for (i = 0; i < node_results_len; i++ ) {
      for (j = 0; j < rules_len; j++) {
        if (node_results[i].rule_result.rule.rule_id == rules[j]) return true;
      }
    }
    return false;
  }

  var i;
  
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var last_severity_value;
  var a = {};
  var last_a = {};

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_warnings, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style  = SEVERITY_STYLE[SEVERITY.WARNING];
    last_severity_value = SEVERITY.WARNING;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
      a.style  = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;

  return a;
  
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMText.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_onscreen');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_to_at');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');
  
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');
  
  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMText.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    if (typeof this.computed_style[property] == 'undefined') {
      if (typeof this.parent_element[property] == 'undefined') {
        if (this.parent_landmark) {
          if (typeof this.parent_landmark[property] == 'undefined') {
            if (typeof this.parent_landmark.dom_element[property] == 'undefined') {
              return null;
            }
            else {
              return this.parent_landmark.dom_element[property];
            }
          }
          else {  
            return this.parent_landmark[property];
          }  
        }  
      }  
      else {  
        return this.parent_element[property];
      }  
    }
    else {
      return this.computed_style[property];
    }  
  }
    
  return this[property];
};


/**
 * @method getColorContrastNodeResult
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns a node result for a color contrast rule
 *
 * @return {Object} Returns node result object of a color contrast rule
 */
 
OpenAjax.a11y.cache.DOMText.prototype.getColorContrastNodeResult = function() {

  function findColorContrastRule(node_results) {
   
    var node_results_len = node_results.length;
    
    for (var i = 0; i < node_results_len; i++ ) {
    
      var node_result = node_results[i];
      
      var rule = node_result.getRule();
      
      if (!rule) continue;
      
      if (rule.rule_id == "COLOR_1") return node_result;      
      if (rule.rule_id == "COLOR_2") return node_result;
    
    }
  
    return null;
  }

  var nr = findColorContrastRule(this.rules_violations);
  if (nr) return nr;

  nr = findColorContrastRule(this.rules_manual_checks);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_warnings);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_passed);
  if (nr) return nr;
  
  nr = findColorContrastRule(this.rules_hidden);
  if (nr) return nr;
  
  return null;

};

/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text content of a DOMText element
 *
 * @return {String} Returns the text content dom text node
 */
 
OpenAjax.a11y.cache.DOMText.prototype.getText = function() {
  return this.text_normalized;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMText
 *
 * @desc Returns text representation of a DOMText element
 *
 * @return {String} Returns a string representing the DOM text node
 */
 
OpenAjax.a11y.cache.DOMText.prototype.toString = function(option) {
  var str;
  
  if (option == 'text') str = "'" +  this.text_normalized + "'";
  else str = this.parent_element.tag_name + ": '" +  this.text_normalized + "'";
  
  return str;
};


/* ---------------------------------------------------------------- */
/*                       DOMElement Object                          */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor DOMElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc The DOMElement object represents a dom node of a document
 * 
 * @property  {String}    cache_id            - String that uniquely identifies the cache element in the DOMCache
 * @property  {String}    xpath               - String that identifies the position of the element in the document
 *
 * @property {Array}      child_dom_elements  - The child DOMElement and DOMText objects of this DOMElement in the tree
 * @property {DOMElement} parent_element      - The parent DOMElement of this DOMElement in the tree
 *
 * @property {LandmarkElement}  parent_landmark - LandmarkElement object that contains this element
 *
 * @property {Number}     type                - Type of DOM node is element  
 * @property {Number}     document_order      - The ordinal position of this DOM element node in the DOM
 * 
 * @property {Object}     node                - Reference to the 'live' DOM element represented by this object
 * @property {String}     tag_name            - Tag name of the HTML element in lowercase characters (i.e. p, div, h1, span ...)
 * @property {Array}      aria_properties     - Array of ARIA properties and states defined for the node
 *
 * @property {String}     id                  - id attribute value of the DOM node (can be empty)
 * @property {Number}     id_unique           - Indicates if id is defined, unique or has a duplicate in the document
 *
 * @property {Number}     character_count     - Count of text charcters in the immediate child DOM text nodes
 * 
 * @property {String}     class_name          - The value of the class attribute of the DOM node
 * @property {String}     role                - The value of the role attribute of the DOM node
 *
 * @property {String}     alt                 - String   The value of the alt attribute of the DOM node
 * @property {Boolean}    has_alt_attribute   - true if the alt attribute is defined, otherwise false 
 *
 * @property {String}     title               - The value of the title            attribute of the DOM node
 * @property {String}     aria_describedby    - The value of the aria-describedby attribute of the DOM node
 * @property {String}     aria_hidden         - The value of the aria-hidden      attribute of the DOM node
 * @property {String}     aria_label          - The value of the aria-label       attribute of the DOM node
 * @property {String}     aria_labelledby     - The value of the aria-labelledby  attribute of the DOM node
 * @property {Array}      aria_properties     - Arrary of property name and value objects for any attribute 
 *                                              beginning with 'aria-'
 *
 * @property {String}     calculated_aria_description  - If aria-describedby defined this is a string of the 
 *                                                       description content 
 *
 * @property {Boolean}    is_widget           - True if element is a ARIA widget, otherwise false
 * @property {Boolean}    is_landmark         - True if element is a ARIA landmark, otherwise false
 * @property {Boolean}    is_live             - True if element is a ARIA live region, otherwise false
 *
 * @property {Object}     widget_info         - Object containing information about a widget
 *
 * @property {Object}     events              - Object that contains information about events associated with the node
 * @property {Object}     computed_style      - Object that contains information about run time styling of the node
 *
 * @property {Boolean}    has_rule_results       - Boolean indicating if the node has any rule results
 * @property {Array}      rules_passed           - Array of NodeResult objects with severity of 'Passed'
 * @property {Array}      rules_violations       - Array of NodeResult objects with severity of 'Violation'
 * @property {Array}      rules_manual_checks    - Array of NodeResult objects with severity of 'Manual Check'
 * @property {Array}      rules_warnings         - Array of NodeResult objects with severity of 'Warning'
 * @property {Array}      rules_hidden           - Array of NodeResult objects with severity of 'Hidden'
 *
 * @param {DOM node Object}    node            - The DOM text node 
 * @param {DOMElement Object}  parent_element  - DOMElement object that is the parent DOMElement object in the tree
 */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element) {

  function addAriaAttribute (name, value) {
  
     var av = {};
     av.attribute = attr.name;
     av.value = attr.value;
     
     aria_properties.push(av);
     
   }

  var i;
  var attr;
  var attributes;
  var attributes_len;
  var av_object;

  // check to make sure it is a valid node
  if (node === null) return null;

  this.has_element_children = false;
 
  this.type           = Node.ELEMENT_NODE;
  this.document_order = 0;
  this.node           = node;
  this.tag_name       = node.tagName.toLowerCase();
  this.id             = node.id;
 
  if (!this.id || this.id.length === 0) {
    this.id_unique  = OpenAjax.a11y.ID.NOT_DEFINED;
  }
  else {
    this.id_unique  = OpenAjax.a11y.ID.UNIQUE;  
  }
 
  this.character_count = 0;

  // Save relationships with other elements
  this.parent_element = parent_dom_element;
  this.child_dom_elements = [];
  var aria_properties = [];
 
  this.parent_landmark = null;

  // Cache important attributes for accessibility
  i = 0;
  attr = null;
  attributes = node.attributes;
  attributes_len = attributes.length;

  this.className = "";
  this.has_alt_attribute    = false;
  this.has_aria_describedby = false;

  this.tab_index = node.tabIndex;
  this.is_widget = false;
  this.widget_info = null;
  this.is_landmark = false;
  this.is_live = false;

  for (i = 0; i < attributes.length; i++) {

    attr = attributes[i];

    switch (attr.name) {

    case 'class':
      this.class_name = attr.value.toLowerCase();
      break;

    case 'role':
      var role = attr.value.toLowerCase();
    
      this.role = role;
    
      var role_object = OpenAjax.a11y.aria.getRoleObject(role);
      
      if (!role_object || !role_object.roleType) break;
      
      switch (role_object.roleType) {
    
      case 'widget':
        this.is_widget = true;
        this.widget_info = role_object;
        break;
      
      case 'landmark':
        this.is_landmark = true;
        break;
      
      case 'live':
        this.is_live = true;
        break;
      
      default:
        break;
    
      } // end switch

      break;

    case 'alt':
      this.alt = attr.value;
      this.has_alt_attribute = true;
      break;

    case 'title':
      this.title = attr.value;
      break;

    case 'aria-describedby':
      this.has_aria_describedby = true;
      this.aria_describedby = attr.value;
      addAriaAttribute('aria-describedby', attr.value);
      break;

    case 'aria-hidden':
      this.aria_hidden = attr.value.toLowerCase();
      addAriaAttribute('aria-hidden', attr.value);
      break;

    case 'aria-label':
      this.aria_label = attr.value;
      addAriaAttribute('aria-label', attr.value);
      break;

    case 'aria-labelledby':
      this.aria_labelledby  = attr.value;
      addAriaAttribute('aria-labelledby', attr.value);
      break;

    case 'aria-live':
      this.is_live  = true;
      addAriaAttribute('aria-live', attr.value);
      break;

    default:

      if (attr.name.indexOf('aria-') === 0 ) {
        addAriaAttribute(attr.name, attr.value);
      }
      break;

    } // end switch
  } // end loop
  
 this.aria_properties = aria_properties;

 this.supports_events = OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS;

 if (OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS) {
  this.events = this.EnumerateFirefoxEvents(node, parent_dom_element);
 }
 else {
  this.events = {};
  this.events.supports_events = false;
 }


 // Create areas to store rule results associates with this node
 this.has_rule_results = false;
 this.rules_violations                = [];
 this.rules_manual_checks             = [];
 this.rules_warnings                  = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];

 return this;

};

/**
 * @method hasAttrWithValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Check DOMElement for presence of attribute with specified value
 *
 * @param  {String} name  - name of attribute
 * @param  {String} value - value of attribute
 *
 * @return {boolean} Indicates whether or not DOMElement has the specified
 *                   attribute with the specified value.
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasAttrWithValue = function (name, value) {

  if (this.hasOwnProperty (name)) {
    return this[name] === value;
  }

  return false;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getNodeResults = function () {
 
  function addResultNodes(items) {
  
    var len = items.length;
    
    for (var i = 0; i < len; i++ ) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.rules_violations);
  addResultNodes(this.rules_manual_checks);
  addResultNodes(this.rules_warnings);
  addResultNodes(this.rules_passed);
  addResultNodes(this.rules_hidden);
  
  return result_nodes;
  
};

/**
 * @method getHasDescribedBy
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns NLS string on whether the dom element has a aria-describedby attribute  
 *
 * @return {String} If true returns "Yes", else "No"
 */

OpenAjax.a11y.cache.DOMElement.prototype.getHasDescribedBy = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;

  if (this.has_aria_describedby) return cache_nls.getNLSLabelAndValue('has_aria_describedby', this.has_aria_describedby).value;

  return "";
};

/**
 * @method getAccessibility
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the worst severity level of rule results  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAccessibility = function () {
   
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var a = {};

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];

  if (this.rules_hidden.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }
  
  if (this.rules_passed.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style    = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (this.rules_manual_checks.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style    = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (this.rules_warnings.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style    = SEVERITY_STYLE[SEVERITY.WARNING];
  }
  
  if (this.rules_violations.length) {
    severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
    a.style       = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;
  
  return a;
  
};

/**
 * @method getColorContrastSummary
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the worst severity level for color contrast rules  
 *
 * @return {Object} Results an object wiith two properties: 'severity' : nls value of the severity, 'style' : a severity styling constant
 */

OpenAjax.a11y.cache.DOMElement.prototype.getColorContrastSummary = function () {
   
  function hasRule(node_results, rules) {
  
    var i;
    var j;
    
    var node_results_len = node_results.length;
    var rules_len        = rules.length;
    
    for (i = 0; i < node_results_len; i++ ) {
      for (j = 0; j < rules_len; j++) {
        if (node_results[i].rule_result.rule.rule_id == rules[j]) return true;
      }
    }
    return false;
  }

  var i;
  
  var cache_nls      = OpenAjax.a11y.cache_nls;
  var SEVERITY       = OpenAjax.a11y.SEVERITY;
  var SEVERITY_STYLE = OpenAjax.a11y.SEVERITY_STYLE;
  var severity;
  var last_severity_value;
  var a = {};
  var last_a = {};

  severity = cache_nls.getNLSSeverity(SEVERITY.NONE); 
  a.label    = severity.label;
  a.style    = SEVERITY_STYLE[SEVERITY.NONE];
  
  var color_rules = ['COLOR_1', 'COLOR_2'];

  if (hasRule(this.rules_hidden, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.HIDDEN);
    a.style    = SEVERITY_STYLE[SEVERITY.HIDDEN];
  }

  if (hasRule(this.rules_passed, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.PASS);
    a.style  = SEVERITY_STYLE[SEVERITY.PASS];
  }

  if (hasRule(this.rules_warnings, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.WARNING);
    a.style  = SEVERITY_STYLE[SEVERITY.WARNING];
    last_severity_value = SEVERITY.WARNING;
  }

  if (hasRule(this.rules_manual_checks, color_rules)) {
    severity = cache_nls.getNLSSeverity(SEVERITY.MANUAL_CHECK);
    a.style  = SEVERITY_STYLE[SEVERITY.MANUAL_CHECK];
  }

  if (hasRule(this.rules_violations, color_rules)) {
      severity = cache_nls.getNLSSeverity(SEVERITY.VIOLATION);
      a.style  = SEVERITY_STYLE[SEVERITY.VIOLATION];
  }

  a.label       = severity.label;
  a.abbrev      = severity.abbrev;
  a.description = severity.description;
  a.tooltip     = severity.tooltip;

  return a;
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var av_object;
 
  var attributes  = [];

  if (this.tag_name === 'img'  || 
      this.tag_name === 'area' || 
      this.tag_name === 'applet') cache_nls.addPropertyIfDefined(attributes, this, 'alt');

  if (this.id.length) cache_nls.addPropertyIfDefined(attributes, this, 'id');  
  cache_nls.addPropertyIfDefined(attributes, this, 'tab_index');  
  cache_nls.addPropertyIfDefined(attributes, this, 'class_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'role');
  
  for (i = 0; i < this.aria_properties.length; i++) {
    av = this.aria_properties[i];
    attributes.push(cache_nls.getNLSLabelAndValue(av.attribute, av.value));
  }
  
  if (!unsorted) this.sortItems(attributes);
  
  return attributes;

};

/**
 * @method hasEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns if an element has user interface events attached to it
 *
 * @return {String} Returns "Yes" if event user interface event handlers are attached to the node, otherwise empty string
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasEvents = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var has_event = false;
  
  has_event = has_event || this.events.has_blur;
  has_event = has_event || this.events.has_change;
  has_event = has_event || this.events.has_click;
  has_event = has_event || this.events.has_double_click;
  has_event = has_event || this.events.has_focus;
  has_event = has_event || this.events.has_key_down;
  has_event = has_event || this.events.has_key_press;
  has_event = has_event || this.events.has_key_up;
  has_event = has_event || this.events.has_load;
  has_event = has_event || this.events.has_mouse_down;
  has_event = has_event || this.events.has_mouse_up;
  has_event = has_event || this.events.has_mouse_move;
  has_event = has_event || this.events.has_mouse_out;
  has_event = has_event || this.events.has_mouse_over;

  if (has_event) return cache_nls.getCacheNLS().boolean_values.true_value;
  
  return "";
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of objects representing events associated with the element 
 *
 * @return {Array} Returns a array of event object results
 */

OpenAjax.a11y.cache.DOMElement.prototype.getEvents = function () {

  function addHasEvent(event_type, on_element, on_ancestor) {
  
    var o = {};
    
    o.label = event_type;
    o.on_element        = nls_false;
    o.on_element_style  = "no";
    o.on_ancestor       = nls_false;
    o.on_ancestor_style = "no";

    if (on_element) {
      o.on_element        = nls_true;
      o.on_element_style  = "yes";
    }
    
    if (on_ancestor) {
      o.on_ancestor       = nls_true;
      o.on_ancestor_style = "yes";
    }  

    events.push(o);
  
  }

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var nls_false = cache_nls.getCacheNLS().boolean_values.false_value;
  var nls_true  = cache_nls.getCacheNLS().boolean_values.true_value;
 
  var events = [];
  
  addHasEvent('blur',          this.events.has_blur,          this.events.ancestor_has_blur);
  addHasEvent('focus',         this.events.has_focus,         this.events.ancestor_has_focus);
  
  addHasEvent('click',         this.events.has_click,         this.events.ancestor_has_click);
  addHasEvent('double click',  this.events.has_double_click,  this.events.ancestor_has_double_click);

  addHasEvent('key down',      this.events.has_key_down,      this.events.ancestor_has_key_down);
  addHasEvent('key press',     this.events.has_key_press,     this.events.ancestor_has_key_press);
  addHasEvent('key down',      this.events.has_key_up,        this.events.ancestor_has_key_up);

  addHasEvent('mouse down',    this.events.has_mouse_down,    this.events.ancestor_has_mouse_down);
  addHasEvent('mouse up',      this.events.has_mouse_up,      this.events.ancestor_has_mouse_up);
  addHasEvent('mouse move',    this.events.has_mouse_move,    this.events.ancestor_has_mouse_move);
  addHasEvent('mouse out',     this.events.has_mouse_out,     this.events.ancestor_has_mouse_out);
  addHasEvent('mouse over',    this.events.has_mouse_over,    this.events.ancestor_has_mouse_over);

  addHasEvent('change',        this.events.has_change,        this.events.ancestor_has_change);

  return events;

};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getStyle = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_onscreen');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'is_visible_to_at');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'display');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'visibility');
  
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'opacity');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_color');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_image');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_repeat');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'background_position');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_family');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_size');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'font_weight');

  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'position');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'left');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'top');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'width');
  cache_nls.addPropertyIfDefined(properties, this.computed_style, 'height');
  
  return properties;

};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of styling information for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of NLS objects for styling
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
 
  var properties  = [];

  cache_nls.addPropertyIfDefined(properties, this, 'id_unique');
  cache_nls.addPropertyIfDefined(properties, this, 'xpath');
  cache_nls.addPropertyIfDefined(properties, this, 'character_count');
  
  cache_nls.addPropertyIfDefined(properties, this, 'calculated_aria_description');

  cache_nls.addPropertyIfDefined(properties, this, 'document_order');

  cache_nls.addPropertyIfDefined(properties, this, 'parent_landmark');

  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');
  cache_nls.addPropertyIfDefined(properties, this, 'is_landmark');
  cache_nls.addPropertyIfDefined(properties, this, 'is_live');
  
  cache_nls.addPropertyIfDefined(properties, this, 'has_rule_results');

  return properties;

};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number | Object} Returns the value of the property
 */

OpenAjax.a11y.cache.DOMElement.prototype.getCachePropertyValue = function (property) {

//  OpenAjax.a11y.logger.debug("dom element property: " + property + " value= " + this[property]);

  if (typeof this[property] == 'undefined') {
     if(typeof this.computed_style[property] == 'undefined') {
       if(typeof this.events[property] == 'undefined') {
         return null;
       }
       else {
         return this.events[property]; 
       }   
     }
     else {
       return this.computed_style[property]; 
     }
  }
  
  return this[property];
  
};


/**
 * @method sortItems
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.DOMElement.prototype.sortItems = function (items) {

  var swapped = false;
  var temp = null;
  var i;
  var items_len = items.length;

  do{
    swapped = false;
    for (i = 1; i < items_len; i++ ) {
     if (items[i-1].label.toLowerCase() > items[i].label.toLowerCase()) {
      // swap the values
      temp = items[i-1];
      items[i-1] = items[i];
      items[i] = temp;
      swapped = true;
     }
    } // end loop
  } while (swapped);

};

/** 
 * @method EnumerateFirefoxEvents
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Finds the event information of the node for a DOMElement object
 *
 * @param  {Object}     node              - Object The DOM element node that corresponds
 *                                          to this DOMElement object, and from which
 *                                          common information is derived for the DOM
 *                                          element cache.
 *
 * @param  {DOMElement} parent_dom_element - Parent DOMElement object associated with the node's parent node 
 *
 * @return {Object}  Returns an object with event information
 */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFirefoxEvents = function (node, parent_dom_element) {

 var i;
 
 var events = {};
 events.supports_events = false;

 var event_listener = Components.classes["@mozilla.org/eventlistenerservice;1"];

 if (event_listener !== null &&
   event_listener !== undefined) {

  events.supports_events = true;

  events.has_blur         = false;
  events.has_change       = false;
  events.has_click        = false;
  events.has_double_click = false;
  events.has_focus        = false;
  events.has_key_down     = false;
  events.has_key_press    = false;
  events.has_key_up       = false;
  events.has_load         = false;
  events.has_mouse_down   = false;
  events.has_mouse_up     = false;
  events.has_mouse_move   = false;
  events.has_mouse_out    = false;
  events.has_mouse_over   = false;

  if (parent_dom_element && parent_dom_element.events) {
   events.ancestor_has_blur         = parent_dom_element.events.has_blur;
   events.ancestor_has_change       = parent_dom_element.events.has_change;
   events.ancestor_has_click        = parent_dom_element.events.has_click;
   events.ancestor_has_double_click = parent_dom_element.events.has_double_click;
   events.ancestor_has_focus        = parent_dom_element.events.has_focus;
   events.ancestor_has_key_down     = parent_dom_element.events.has_key_down;
   events.ancestor_has_key_press    = parent_dom_element.events.has_key_press;
   events.ancestor_has_key_up       = parent_dom_element.events.has_key_up;
   events.ancestor_has_load         = parent_dom_element.events.has_load;
   events.ancestor_has_mouse_down   = parent_dom_element.events.has_mouse_down;
   events.ancestor_has_mouse_up     = parent_dom_element.events.has_mouse_up;
   events.ancestor_has_mouse_move   = parent_dom_element.events.has_mouse_move;
   events.ancestor_has_mouse_out    = parent_dom_element.events.has_mouse_out;
   events.ancestor_has_mouse_over   = parent_dom_element.events.has_mouse_over;
  }
  else {
   events.ancestor_has_blur         = false;
   events.ancestor_has_change       = false;
   events.ancestor_has_click        = false;
   events.ancestor_has_double_click = false;
   events.ancestor_has_focus        = false;
   events.ancestor_has_key_down     = false;
   events.ancestor_has_key_press    = false;
   events.ancestor_has_key_up       = false;
   events.ancestor_has_load         = false;
   events.ancestor_has_mouse_down   = false;
   events.ancestor_has_mouse_up     = false;
   events.ancestor_has_mouse_move   = false;
   events.ancestor_has_mouse_out    = false;
   events.ancestor_has_mouse_over   = false;
  }

  var event_listener_service = event_listener.createInstance(Components.interfaces.nsIEventListenerService);
  var node_event_service     = event_listener_service.getListenerInfoFor(node, {});

  for (i = 0; i < node_event_service.length; i++) {
   var node_event_information = node_event_service[i].QueryInterface(Components.interfaces.nsIEventListenerInfo);

   if (!node_event_information.inSystemEventGroup &&
     node_event_information.allowsUntrusted ) {

    switch (node_event_information.type) {

    case "blur":
     events.has_blur = true;
     break;

    case "change":
     events.has_change = true;
     break;

    case "click":
     events.has_click = true;
     break;

    case "dbclick":
     events.has_double_click = true;
     break;

    case "focus":
     events.has_focus   = true;
     break;

    case "keydown":
     events.has_key_down  = true;
     break;

    case "keypress":
     events.has_key_press = true;
     break;

    case "keyup":
     events.has_key_up   = true;
     break;

    case "load":
     events.has_load    = true;
     break;

    case "mousedown":
     events.has_mouse_down = true;
     break;

    case "mouseup":
     events.has_mouse_up  = true;
     break;

    case "mousemove":
     events.has_mouse_move = true;
     break;

    case "mouseout":
     events.has_mouse_out = true;
     break;

    case "mouseover":
     events.has_mouse_over = true;
     break;

    default:
     break;

    } // endswitch
   }
  } // end loop
 }

 return events;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds a DOMElement or DOMText object to the tree of DOM text/elements  
 *
 * @param  {DOMElement | DOMText} child_object  - DOMElement or DOMText object 
 *
 * @return  Nothing 
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.addChild = function ( child_object ) {

 if (child_object) {
  this.child_dom_elements.push(child_object);
 }

};

/**
 * @method addToCharacterCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Adds to the current character count of the text content of the
 *          contained in the DOMelement and its immediate children
 *
 * @param {Number} length - Number to add to the character count
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addToCharacterCount = function ( length ) {

 this.character_count += length;

};

/**
 * @method addComputedStyle
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc    Adds computed style information to the DOMElement object and
 *          calculate the color contrast ratio
 *
 * @param  {DOMElement} parent_element  - The parent DOMElement object, used
 *                                        for information about inherited style
 *                                        information
 *
 * @return Nothing
 */

OpenAjax.a11y.cache.DOMElement.prototype.addComputedStyle = function (parent_element) {

 if (this.tag_name == 'iframe' || this.tag_name == 'frame' || this.tag_name == 'body')
   this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, null);
 else this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
   
 
 this.computed_style.calculateColorContrastRatio();
};

/**
 * @method calculateXPath
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc   Calculate the XPath string that uniquely identifies the
 *           DOM node referenced by this DOMElement's node property and
 *           set its xpath property to this calculated value.
 *
 * @param  {DOMElement} parent_element - The parent DOMElement object, used
 *                                       for information for xpath calculation
 *
 * @usage Sets the DOMElement's xpath property
 *
 * @return Nothing 
 */

OpenAjax.a11y.cache.DOMElement.prototype.calculateXPath = function (parent_element) {

 function attributePredicate(attrName, attrValue) {
  return "[@" + attrName + "='" + attrValue + "']";
 }

 this.xpath = "";

 // If a root node ignore calculation
 if (!this.tag_name) {
  return;
 }

 // now build up the XPath using parent, tag_name, id, role and class values
 if (parent_element && parent_element.xpath) {
  this.xpath = parent_element.xpath + "/" + this.tag_name;
 }
 else {
  this.xpath = "/" + this.tag_name;
 }

 if (this.id) {
  this.xpath += attributePredicate("id", this.id);
 }

 if (this.role) {
  this.xpath += attributePredicate("role", this.role);
 }
 else {
  if (this.class_name) {
   this.xpath += attributePredicate("class", this.class_name);
  }
 }

};


/**
 * @method getText
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc Returns text content of a DOMElement, including the ALT text of images
 *       through recursion through the DOMText and DOMElement descendents of
 *       the DOMElement
 *
 * @return {String} Returns the text content of an element and its children
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getText = function() {

  function getText(dom_element, strings) {
    // If text node get the text and return
    if( dom_element.type == Node.TEXT_NODE ) {
      strings.push( dom_element.text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
        // check to see if IMG or AREA element and to use ALT content if defined
        if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {
     
          if (dom_element.alt) {
            strings.push(dom_element.alt);
          } 
          
        } else {
    
          for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
            getText(dom_element.child_dom_elements[i], strings);
          } // end loop
          
        } 
      }
    } 
  } // end function getStrings

 // Create return object
 var str = "";
 var strings = [];

 getText(this, strings); 
 
 if (strings.length) str = strings.join(" ").normalizeSpace();
 
 return str;
 
};

 /**
 * @method getTextObject
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 * 
 * @desc Returns an object with information about the accessible text of a DOMElement object
 *         and its descendents
 *
 * @return {Object}  Returns an object with the following properties: 
 *                     'height', 
 *                     'width',
 *                     'image_count',
 *                     'name',
 *                     'name_from_text_nodes',
 *                     'name_from_image_alt',
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getTextObject = function() {

  function getText(dom_element, strings, texts, alts) {
    // If text node get the text and return
    if( dom_element.type == Node.TEXT_NODE ) {
      var text = dom_element.text;
      strings.push( text );
      texts.push( text );
    } else {
      // if an element for through all the children elements looking for text
      if( dom_element.type == Node.ELEMENT_NODE ) {
        // check to see if IMG or AREA element and to use ALT content if defined
        if((dom_element.tag_name == 'img') || (dom_element.tag_name == 'area')) {
     
          if (dom_element.alt) {
            strings.push(dom_element.alt);
            alts.push(dom_element.alt);
          }  
     
          if( dom_element.node.offsetHeight > o.height ) {
            o.height = dom_element.node.offsetHeight;
          } //endif
     
          if( dom_element.node.offsetWidth > o.width ) {
             o.width = dom_element.node.offsetWidth;
          } //endif
     
          o.image_count = o.image_count + 1;
     
        } else {
    
          for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
            getText( dom_element.child_dom_elements[i], strings, texts, alts);
          } // endfor
     
        } // endif
      } // endif  
    } // endif
  } // end function getStrings

  // Create return object
  var o = {};
  var name_array = [];
  var name_from_text_nodes_array = [];
  var name_from_image_alt_array = [];
  o.height = 0;
  o.width = 0;
  o.image_count = 0;


  getText(this, name_array, name_from_text_nodes_array, name_from_image_alt_array); 
 
  o.name         = name_array.join("").normalizeSpace();
  o.name_from_text_nodes = name_from_text_nodes_array.join("").normalizeSpace().toLowerCase();
  o.name_from_image_alt = name_from_image_alt_array.join("").normalizeSpace().toLowerCase();
  return o;
 
}; // end function OpenAjax.cache.util.getAccessibleText


/**
 * @method getElementCount
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 * 
 * @desc Returns a String of the text content of a DOMElement and all its descendent DOMElements
 *
 * @return {Number}  Returns the number of descendent elements in a DOMElement object
 */
 
OpenAjax.a11y.cache.DOMElement.prototype.getElementCount = function() {

  function countElements(dom_element) {
    // If text node get the text and return
    if( dom_element.type == Node.ELEMENT_NODE ) {
      count++;
      for (var i = 0; i < dom_element.child_dom_elements.length; i++ ) {
        countElements(dom_element.child_dom_elements[i]);
      } // end loop
    } 
  } // end function getStrings

 // Create return object
 var count = 0;

 countElements(this); 
 
 return count;
 
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.DOMElement
 *
 * @desc  Create a text String that represents the DOMElement object
 *
 * @return {String}
 */

OpenAjax.a11y.cache.DOMElement.prototype.toString = function() {
 var str = this.tag_name;
 
 if (this.role && this.role.length) return str + "[" + this.role + "]";
 if (this.id && this.id.length) return str + "#" + this.id;
 
 return str;
};

