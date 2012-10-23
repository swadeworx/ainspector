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
/*                       ControlInfo                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor ControlInfo
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ControlInfo object for preserving the current control information 
 *        when traversing the DOM for form control information
 *
 * @param {ControlInfo} control_info - Current ControlInfo object
 *
 * @property {ControlElement}   control_element  - Parent ControlElement (if any)
 * @property {FieldsetElement}  fieldset_element - Parent FieldsetElement (if any)
 * @property {SelectElement}    select_element   - Parent SelectElement (if any)
 * @property {LabelElement}     label_element    - Parent LabelElement (if any)
 * @property {FormElement}      form_element     - Parent FormElement (if any)
 */

OpenAjax.a11y.cache.ControlInfo = function (control_info) {
 
 if (control_info) {
  this.control_element  = control_info.control_element;
  this.fieldset_element = control_info.fieldset_element;
  this.select_element   = control_info.select_element;
  this.label_element    = control_info.label_element; 
  this.form_element     = control_info.form_element; 
 }
 else {
  this.control_element  = null;
  this.fieldset_element = null;
  this.select_element   = null;
  this.label_element    = null;
  this.form_element     = null;
 } 
}; 

/* ---------------------------------------------------------------- */
/*                       ControlsCache                              */ 
/* ---------------------------------------------------------------- */

/** 
 * @constructor ControlsCache
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc ControlsCache is the constructor for lists of control cache element objects and
 *       the root of a tree representation of the control cache element relationships
 *       
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache} dom_cache  - Reference to the DOMCache object 
 *         
 * @property {Boolean}  up_to_date - Boolean true if the cache has been creating using the current DOMElements, else false
 *                                   NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                          based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements  - Root array of the tree representation of the controls in the document 
 *
 * @property {Array}    control_elements      - List of all the InputElement, TextareaElement, ButtonElement, SelectElement, 
 *                                              OptionElements and OptgroupElement objects in the cache
 *
 * @property {Number}   control_length        - Length of the control_elements array and used in calculating cache IDs
 *
 * @property {Array}    label_elements        - List of all the LabelElement objects in the cache
 * @property {Number}   label_length          - Length of the label_elements array and used in calculating cache IDs
 *
 * @property {Array}    fieldset_elements     - List of all the FieldsetElement objects in the cache
 * @property {Number}   fieldset_length       - Length of the Fireldset_elements array and used in calculating cache IDs
 *
 * @property {Array}    form_elements         - List of all the FormElement objects in the cache
 * @property {Number}   form_length           - Length of the form_elements array and used in calculating cache IDs
 *
 * @property {String}   sort_property         - The property the list of control element object is currenlty sorted by
 * @property {Boolean}  ascending             - true if the list is ascending order or false if descending
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this
 */

OpenAjax.a11y.cache.ControlsCache = function (dom_cache) {

  this.dom_cache     = dom_cache;
  this.up_to_date    = false;
 
  this.child_cache_elements  = [];
 
  this.control_elements = [];
  this.control_length  = 0;

  this.widget_elements = [];
  this.widget_length  = 0;
  
  this.label_elements  = [];
  this.label_length   = 0;
  
  this.fieldset_elements = [];
  this.fieldset_length = 0;
  
  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;
 
};

/**
 * @method addChildControl
 * 
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 * 
 * @desc Adds a cache control element to the root tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (control_element) {

  if (control_element) {
    this.child_cache_elements.push(control_element); 
  }  
   
}; 

/** 
 * @method addControlElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a cache control element to the list of controls array and generates a cache_id for each control 
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 *
 * @return  {Number} Returns the number of control objects in the control_elements array
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addControlElement = function (control_element) {

//  OpenAjax.a11y.logger.debug("  Adding control element: " + control_element.dom_element.tag_name + " ("+ control_element.control_type + ")");

  // item must exist and have the position property
  if (control_element) {
    this.control_length += 1;
    control_element.document_order = this.control_length;
    control_element.cache_id = "control_" + this.control_length;
    this.control_elements.push( control_element );
    return true;
  } 

  return this.control_length;

};

/**
 * @method addLabelElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add LabelElement object to list of label elements and generates a cache id for the object
 *
 * @param  {LabelElement} label_element  - LabelElement object to add 
 *
 * @return  Nothing 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabelElement = function (label_element) {

  if (label_element) {
    this.label_length += 1;
    label_element.document_order = this.label_length;
    label_element.cache_id = "label_" + this.label_length;
    this.label_elements.push( label_element );
  } 

};

/**
 * @method addFormElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Add a FormElement object to the list of form elements and generates a cache id for the object 
 *
 * @param  {FormElement} form_element  - FormElement to add 
 *
 * @return {Number} Returns number of FormElement objects in the list of form elements
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addFormElement = function (form_element) {

  // item must exist and have the position property
  if (form_element) {
    this.form_length = this.form_length + 1;
    form_element.document_order = this.form_length;
    form_element.cache_id = "form_" + this.form_length;
    this.form_elements.push( form_element );
  } 

  return this.form_length;

};

/** 
 * @method addFieldsetElement
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds a FieldsetElement to the list of fieldset elements and generates a cache id for the object 
 *
 * @param  {FieldsetElement}  fieldset_element  - FieldsetElement to add 
 *
 * @return {Number} Returns the number of FieldsetElement objects in the list of fieldset elements
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addFieldsetElement = function (fieldset_element) {

  // item must exist and have the position property
  if (fieldset_element) {
    this.fieldset_length = this.fieldset_length + 1;
    fieldset_element.document_order = this.fieldset_length;
    fieldset_element.cache_id = "fieldset_" + this.fieldset_length;
    this.fieldset_elements.push(fieldset_element);
  } 

  return this.fieldset_length;

};

/**
 * @method emptyCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Resests the ControlsCache object properties and empties all the lists and arrays 
 */

OpenAjax.a11y.cache.ControlsCache.prototype.emptyCache = function () {

  this.up_to_date    = false;
 
  this.child_cache_elements  = [];
 
  this.control_elements = [];
  this.control_length  = 0;
  
  this.label_elements  = [];
  this.label_length   = 0;
  
  this.fieldset_elements = [];
  this.fieldset_length = 0;
  
  this.form_elements   = [];
  this.form_length   = 0;

  this.sort_property  = 'document_order';
  this.ascending    = true;

};

/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Updates the ControlsCache object by checking to see if a DOMElement
 *          should be added to the control cache objects
 *  
 * @param  {DOMElement}   dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo}  control_info  - Information about the current control relationships in the DOM
 *
 * @return {ControlInfo}  Returns updated control info object 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCacheItems = function (dom_element, control_info) {
 
  var be;
  var fe;
  var ie;
  var le;
  var oe;
  var se;
  var te;  
  var we;
  
  var ci = new OpenAjax.a11y.cache.ControlInfo(control_info);

  // check for widget
 
  if (dom_element.is_widget) {
    
    we = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
    this.addLabel(we, "", OpenAjax.a11y.SOURCE.NONE);
    
    this.addControlElement(we);
    
    if (control_info.control_element) {
      control_info.control_element.addChildControl(we);   
    }
    else {
      this.addChildControl(we);     
    }
  
    ci.control_element = we;
  
  }
  else {

    switch (dom_element.tag_name) {

    case 'form':
      fe = new OpenAjax.a11y.cache.FormElement(dom_element, control_info);

      this.addFormElement(fe); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(fe);   
      }
      else {
        this.addChildControl(fe);     
      }
  
      ci.control_element = fe;
      ci.form_element = fe;
  
      break;

    case 'fieldset':
      fe = new OpenAjax.a11y.cache.FieldsetElement(dom_element, control_info);
    
      this.addFieldsetElement(fe); 
  
      if (control_info.control_element) {
        control_info.control_element.addChildControl(fe);   
      }
      else {
        this.addChildControl(fe);     
      }
  
      ci.control_element = fe;
      ci.fieldset_element = fe;
      break;

    case 'legend':
      le = new OpenAjax.a11y.cache.LegendElement(dom_element, control_info);
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_length = le.computed_label.length;

      this.addLabelElement(le); 
  
      if (control_info.control_element) {
        control_info.control_element.addChildControl(le);   
      }
      else {
        this.addChildControl(le);     
      }

      if (control_info.fieldset_element) {
        control_info.fieldset_element.legend_element = le;
      }

      ci.control_element = le;
      break;

    case 'label':
      le = new OpenAjax.a11y.cache.LabelElement(dom_element, control_info);
      le.computed_label = this.getElementTextContent(le, false);
      le.computed_label_length = le.computed_label.length;
    
      this.addLabelElement(le); 
  
      if (control_info.control_element) {
        control_info.control_element.addChildControl(le);   
      }
      else {
        this.addChildControl(le);     
      }
    
      ci.control_element = le;
      ci.label_element  = le;
      break;

    case 'input':
      ie = new OpenAjax.a11y.cache.InputElement(dom_element, control_info);
      this.addLabel(ie, "", OpenAjax.a11y.SOURCE.NONE);
      
      if (ie.dom_element.node.type.toLowerCase() != "hidden") {
    
        this.addControlElement(ie); 
  
        if (control_info.control_element) {
          control_info.control_element.addChildControl(ie);   
        }
        else {
          this.addChildControl(ie);     
        }
      
        if (control_info.form_element) {
          control_info.form_element.number_of_controls += 1;   
        }
      
        if (control_info.fieldset_element) {
          control_info.fieldset_element.number_of_controls += 1;   
        }
      } 
  
      break;

    case 'button':
      be = new OpenAjax.a11y.cache.ButtonElement(dom_element, control_info);
      this.addLabel(be, "", OpenAjax.a11y.SOURCE.NONE);
      
      this.addControlElement(be); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(be);   
      }
      else {
        this.addChildControl(be);     
      }

      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;   
      }

      if (control_info.fieldset_element) {
        control_info.fieldset_element.number_of_controls += 1;   
      }
    
      ci.control_element = be;
      break;

    case 'textarea':
      te = new OpenAjax.a11y.cache.TextareaElement(dom_element, control_info);
      this.addLabel(te, "", OpenAjax.a11y.SOURCE.NONE);

      this.addControlElement(te); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(te);   
      }
      else {
        this.addChildControl(te);     
      }
    
      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;   
      }

      if (control_info.fieldset_element) {
        control_info.fieldset_element.number_of_controls += 1;   
      }
    
      break;

    case 'select':
      se = new OpenAjax.a11y.cache.SelectElement(dom_element, control_info);
      this.addLabel(se, "", OpenAjax.a11y.SOURCE.NONE);
  
      this.addControlElement(se); 
  
      if (control_info.control_element) {
        control_info.control_element.addChildControl(se);   
      }
      else {
        this.addChildControl(se);     
      }
    
      if (control_info.form_element) {
        control_info.form_element.number_of_controls += 1;   
      }
  
      if (control_info.fieldset_element) {
        control_info.fieldset_element.number_of_controls += 1;   
      }
    
      ci.select_element = se;
      ci.control_element = se;
      break;

    case 'optgroup':
      oe = new OpenAjax.a11y.cache.OptgroupElement(dom_element, control_info);
  
      if (dom_element.node.label && dom_element.node.label.length) {
        oe.label = dom_element.node.label;  
        oe.label_length = oe.label.length;
      } 
 
      if (control_info.control_element) {
       control_info.control_element.addChildControl(oe);   
      }
      else {
        this.addChildControl(oe);     
      }
 
      ci.control_element = oe;
      break;

    case 'option':
      oe = new OpenAjax.a11y.cache.OptionElement(dom_element, control_info);
  
      oe.computed_label = this.getElementTextContent(oe, false);
      oe.computed_label_length = oe.computed_label.length;

  
      if (control_info.control_element) {
        control_info.control_element.addChildControl(oe);   
      }
      else {
        this.addChildControl(oe);     
      }

      if (control_info.select_element) {
        control_info.select_element.addOption(oe);   
      }

      break;

    default:
  
      break;

    } // end switch
    
  }   

  return ci;
};

/**
 * @method traverseDOMElementsForControlElements
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses DOMElement objects in the tree to update the controls cache 
 *
 * @param  {DOMElement}  dom_element   - DOMElement object to check for inclusion in controls cache
 * @param  {ControlInfo} control_info  - Current control information object that contains information 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.traverseDOMElementsForControlElements = function (dom_element, control_info) {
 
 var i;
 var ci;

 if (!dom_element) return;

 if (dom_element.type == Node.ELEMENT_NODE) {

  ci = this.updateCacheItems(dom_element, control_info);
  
  for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
   this.traverseDOMElementsForFormElements(dom_element.child_dom_elements[i], ci);
  } // end loop
  
 }  
  
}; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the DOMElements to update the controls cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the controls cache are disabled, this cache would 
 *       not be updated
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.child_dom_elements;
 var children_len = children.length;
 
 var control_info = new OpenAjax.a11y.cache.ControlInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating control elements cache.");
 for (i=0; i < children_len; i++) {
  this.traverseDOMElementsForControlElements(children[i], control_info);
 }  
 
 this.calculateControlLabels();
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed control elements cache update.");

 this.up_to_date = true;
};

/**
 * @method getRuleResults
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Returns an array of rule results for the cache items in the controls cache 
 *
 * @param  {Number}  filter  - Filter for returning rules with particular type(s) of   
 *
 * @return {Array} Returns array of rule results, can be empty
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getRuleResults = function (filter) {

  function traverseCacheItems(cache_item) {
  
    var flag = false;
    var de = cache_item.dom_element;
    
    if ((local_filter & RESULT_FILTER.PASS)                  && de.rules_passed.length)        flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.VIOLATION)    && de.rules_violations.length)    flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.WARNING)      && de.rules_warnings.length)      flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.PAGE_MANUAL_CHECK)    && de.rules_manual_checks.length) flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.ELEMENT_MANUAL_CHECK) && de.rules_manual_checks.length) flag = true; 
    if (!flag && (local_filter & RESULT_FILTER.NA)       && de.rules_hidden.length)        flag = true; 
    
    if (flag) cache_items.push(cache_item);

    if (cache_item.child_cache_elements) {
      var child_cache_elements     = cache_item.child_cache_elements;
      var child_cache_elements_len = child_cache_elements.length;
  
      for (var i = 0; i < child_cache_elements_len; i++) {
        var ci = child_cache_elements[i];

        traverseCacheItems(ci);
      }
    }  
  }

  var RESULT_FILTER = OpenAjax.a11y.RESULT_FILTER;

  var local_filter;

  if (!filter) 
    local_filter = RESULT_FILTER.ALL;
  else
    local_filter = filter;

  var rule_results = [];
  
  var child_cache_elements     = this.child_cache_elements;
  var child_cache_elements_len = child_cache_elements.length;
  
  for (var i = 0; i < child_cache_elements_len; i++) {
    var ci = child_cache_elements[i];

    traverseCacheItems(ci);
  
  } 

  return cache_items;

};



/**
 * @method getItemByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
 */

OpenAjax.a11y.cache.ControlsCache.prototype.getItemByCacheId = function (cache_id) {

  var item = null;
  
  item = this.getControlElementByCacheId(cache_id);
  if (item) return item;

  item = this.getLabelElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFormElementByCacheId(cache_id);
  if (item) return item;

  item = this.getFieldsetElementByCacheId(cache_id);
  
  return item;

};

/**
 * @method getControlElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching cache id
 *
 * @param  {String }  cache_id  - Cache id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.control_elements.length; i++) {
  if (this.control_elements[i].cache_id == cache_id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * @method getControlElementById
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the control cache element object with the matching id
 *
 * @param  {String }  id  - id of control cache element object
 *
 * @return {cache control element object} Returns cache control element object if cache id is found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementById = function (id) {

 var i;

 for (i = 0; i < this.control_elements.length; i++) {
  if (this.control_elements[i].dom_element.id == id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * @method getLabelElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the LabelElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of LabelElement object
 *
 * @return {LabelElement}  Returns label element with the cache id if found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getLabelElementByCacheId = function (cache_id) {

  for (var i = 0; i < this.label_elements.length; i++) {
    if (this.label_elements[i].cache_id == cache_id) return this.label_elements[i];
  }

  return null;
};

/**
 * @method getFormElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FormElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FormElement object
 *
 * @return {FormElement}  Returns form element with the cache id if found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getFormElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.form_elements.length; i++) {
  if (this.form_elements[i].cache_id == cache_id) {
   return this.form_elements[i];
  }
 }

 return null;
};

/**
 * @method getFieldsetElementByCacheId
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Finds the the FieldsetElement object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of FieldsetElement object
 *
 * @return {FieldsetElement}  Returns fieldset element with the cache id if found, otherwise null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getFieldsetElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.fieldset_elements.length; i++) {
  if (this.fieldset_elements[i].cache_id == cache_id) {
   return this.fieldset_elements[i];
  }
 }

 return null;
};

/**
 * @method getElementTextContent
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Traverses the cache to get the text content associated with the label, this will include the 
 *       values of form controls in the label references
 *
 * @param  {LabelElement}  label_element           - LabelElement object to calculate the text content
 * @param  {Boolean}       include_control_values  - True if the values of form controls should be included in 
 *                                                   accessible name calculation
 *
 * @return {String}  Returns the text content of a LabelElement
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getElementTextContent = function (label_element, include_control_values) {

 var strings = [];
 
 function getText(dom_element) {
  var i;
  
  // If text node get the text and return
  if( dom_element.type == Node.TEXT_NODE ) {
   var text = dom_element.text;
   strings.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == Node.ELEMENT_NODE ) {
   
    switch (dom_element.tag_name) {

    case 'img':
    case 'area':
     strings.push( dom_element.alt );     
     break;
     
    case 'input':
     if (include_control_values && dom_element.node.type == 'text') strings.push(dom_element.node.value);
     break;       

    case 'select':
     // *** need to add some code here to get 
     break;       
     
    default:
     break;    

    } // end switch     
    
    for (i = 0; i < dom_element.child_dom_elements.length; i++ ) {
     getText( dom_element.child_dom_elements[i]);
    }      
    
   }  
  } 
 } // end function getText

 getText(label_element.dom_element); 
 
 return strings.join("").normalizeSpace();
 
};

/**
 * @method calculateLabelsUsingARIA
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Interates the array for control cache elements and calculates the accessible name for
 *         any control elements if there is ARIA markup 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsUsingARIA = function () {

  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
    var de = ce.dom_element;
    
    if ( (de.aria_labelledby && de.aria_labelledby.length) || 
         (de.aria_label && de.aria_label.length) ||
         (de.widget_info)) {
         
      this.dom_cache.getNameFromARIALabel(ce);
      
      // If title attribute is the result clear label for use of other labeling techniques
      if (ce.computed_label_source == OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE && !ce.widget_info) {
        ce.computed_label = "";
        this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);
      }
    }
  }
};


/**
 * @method addFieldsetLegend
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds legend content to computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control  -  Control Object
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.addFieldsetLegend = function (control) {

   // Add fieldset/legend information if defined
   if (control.fieldset_element && 
       control.fieldset_element.legend_element) {
       control.computed_label = control.fieldset_element.legend_element.computed_label + " ";
       control.computed_label_length = control.computed_label.length;
   }
   
};

/**
 * @method addLabel
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Adds legend content to computed label if control is contained in a fieldset/legend
 *
 * @param {Object}  control -  Control Object
 * @param {String}  label   -  label text
 * @param {Number}  source  -  label source
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.addLabel = function (control, label, source) {

  if (source === OpenAjax.a11y.SOURCE.NONE) {
    control.computed_label  = "";
    if (control.widget_info) control.accessible_name = "";
  } else {
    this.addFieldsetLegend(control);
    control.computed_label += label + " ";
  }
  
  control.computed_label_length = control.computed_label.length;
  control.computed_label_source = source;
  control.computed_label_for_comparison = control.computed_label.normalizeSpace().toLowerCase();
   
};


/**
 * @method calculateLabelsByReference
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are referenced by label elements with for attribute
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByReference = function () {

  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;
  
  // first check if an label by reference
 
  for (var i = 0; i < label_elements_len; i++) {
 
    var le = label_elements[i];
 
    var id;
    if (le.for_id) {
      id = le.for_id;
    }
    else {
      id = null;
    }  

    if (id && id.length) {
      var ce = this.getControlElementById(id);
      
      if (ce) {

        // check to see if label defined (i.e. an ARIA technique)

        if (ce.computed_label.length === 0) {
          this.addLabel(ce, le.computed_label, OpenAjax.a11y.SOURCE.LABEL_REFERENCE);
          le.unused_label = false;          
          le.control_element = ce;
        }  
      }
      else {
        le.unused_label = true;
      }
    }
  }
};

/**
 * @method calculateLabelsByEncapsulation
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of label elements and calculates the accessible label for
 *       any control elements that are encapsulated by a label element
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByEncapsulation = function () {

  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;
  
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
 
    switch (ce.control_type) {
  
    case OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT:
      this.addLabel(ce, this.getElementTextContent(ce, false), OpenAjax.a11y.SOURCE.TEXT_CONTENT);
      break;
  
    default:
    
      // first check if an label exists

      if (ce.computed_label.length === 0 && ce.label_element) {  
        this.addLabel(ce, ce.label_element.computed_label, OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION);
        ce.label_element.unused_label = false;
        ce.label_element.control_element = ce;
      }
      break;
    } // end switch 
  } // end loop
};

/**
 * @method calculateLabelsByOther
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Iterates the list of control elements and calculates the 
 *       accessible label for any control elements that do NOT have 
 *       a computed label, but has a VALUE, ALT or TITLE attribute value 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByOther = function () {

  var CONTROL_TYPE = OpenAjax.a11y.CONTROL_TYPE;
  
  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label exits
 
  for (var i = 0; i < control_elements_len; i++) {
 
    var ce = control_elements[i];
 
    if (ce.computed_label.length === 0) {
      var de = ce.dom_element;

      switch (ce.control_type) {
  
      case CONTROL_TYPE.BUTTON_INPUT:
        if (ce.value && ce.value.length) {   
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);                  
        }
        break;
 
      case CONTROL_TYPE.IMAGE:

        if (de.alt) {
          this.addLabel(ce, de.alt, OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE);        
        }
        else {
          if (de.title && de.title.length) {
            this.addLabel(ce, de.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);       
          }
          else {
            this.addLabel(ce, "", OpenAjax.a11y.SOURCE.NONE);      
          }
        }  
        break;

      case CONTROL_TYPE.SUBMIT:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "SUBMIT", OpenAjax.a11y.SOURCE.BUTTON_TYPE);      
        }  
        break;

      case CONTROL_TYPE.RESET:

        if (ce.value && ce.value.length) {
          this.addLabel(ce, ce.value, OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE);        
        }
        else {
          this.addLabel(ce, "RESET", OpenAjax.a11y.SOURCE.BUTTON_TYPE);      
        }  
        break;

      default:
    
        if (de.title &&
            de.title.length) {
          // first check if an label exists

          this.addLabel(ce, ce.dom_element.title, OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE);
        }

        break;
      } // end switch 
    }
  }
};

/**
 * @method calculateControlLabels
 *
 * @memberOf OpenAjax.a11y.cache.ControlsCache
 *
 * @desc Calculates labels for all form controls, based on the order of label 
 *       calculation techniques used by browsers to generate accessible names
 *       for accessibility APIs used by assistive technologies 
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {

  // These functions are called in the order of overrides
  // Once a control has a label it is ignored by subsequent function calls
  this.calculateLabelsUsingARIA();
  this.calculateLabelsByReference();
  this.calculateLabelsByEncapsulation();
  this.calculateLabelsByOther();
};

/* ---------------------------------------------------------------- */
/*                       FormElement                                */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor FormElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FormElement object used to hold information about form elements
 *
 * @param  {DOMelement}   dom_element   - dom_element object references DOMElement of the form element 
 * @param  {ControlInfo}  control_info  - Information about the parent control cache
 *
 * @property  {DOMElement}  dom_element           - DOMElement associated with the form element
 * @property  {String}      cache_id              - String that uniquely identifies the cache element in the DOMCache
 * @property  {Number}      document_order        - Ordinal position of the form element in the document in relationship to other form elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {String}  action  - The value of the action attribute of the form control
 * @property  {String}  method  - The value of the method attribute of the form control
 * @property  {String}  name_attribute  - The value of the name attribute of the form control
 */

OpenAjax.a11y.cache.FormElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.child_cache_elements = [];
  this.cache_id     = "";
  this.document_order = 0;
  
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FORM;
  this.number_of_controls = 0;
 
  this.action = dom_element.node.action;
  this.method = dom_element.node.method;
  
  this.name_attribute   = dom_element.node.name;
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.FormElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FormElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'row_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'column_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'headers');
  cache_nls.addPropertyIfDefined(attributes, this, 'scope');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.FormElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FormElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.FormElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FormElement
 *
 * @desc Returns a text string representation of the FormElement 
 *
 * @return {String} Returns string represention the FormElement object
 */
 
OpenAjax.a11y.cache.FormElement.prototype.toString = function () {
  return "form: " + this.number_of_controls + " controls"; 
};

/* ---------------------------------------------------------------- */
/*                       FieldsetElement                            */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor FieldsetElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a FieldsetElement object used to hold information about fieldset elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the fieldset element 
 * @param  {ControlInfo}  control_info  - Information about parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the fieldset element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the fieldset element in the document in relationship to other fieldset elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {Number}      number_of_controls    - Number of controls in form
 *
 * @property  {FieldsetElement}  fieldset_element  - Reference to any fieldset elements this fieldset is nested in
 * @property  {LegendElement}    legend_element    - Reference to the legend element contained in the fieldset 
 * @property  {Number}           legend_count      - Number of legend elements contained in the fieldset
 */

OpenAjax.a11y.cache.FieldsetElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.FIELDSET;
  this.number_of_controls = 0;   
 
  this.fieldset_element = control_info.fieldset_element;
 
  this.legend_element = null;
 
  this.legend_count = 0;
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.FieldsetElement
 *
 * @desc Returns a text string representation of the fieldset element 
 *
 * @return {String} Returns string represention the FieldsetElement object
 */
 
OpenAjax.a11y.cache.FieldsetElement.prototype.toString = function () {
 if (this.legend_element)  
   return "fieldset: has legend";
 else
   return "fieldset: no legend"; 
     
};

/* ---------------------------------------------------------------- */
/*                       LegendElement                              */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LegendElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LegendElement object used to hold information about legend elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the legend element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the legend element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the legend element in the document in relationship to other legend elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this legend is nested in
 * @property  {String}           computed_label                - Text content of the legend element 
 * @property  {String}           computed_label_for_comparison - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.LEGEND;
 
  this.fieldset_element = control_info.fieldset_element;
  
  this.computed_label = "";
  this.computed_label_length = 0;
  this.computed_label_for_comparison = "";

  if (control_info.fieldset_element) {
    control_info.fieldset_element.legend_count++;
  }

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LegendElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

//  cache_nls.addPropertyIfDefined(properties, this, 'tag_name');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LegendElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};



/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LegendElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LegendElement
 *
 * @desc Returns a text string representation of the legend element 
 *
 * @return {String} Returns string represention the LegendElement object
 */
 
OpenAjax.a11y.cache.LegendElement.prototype.toString = function () {
 if (this.computed_label.length) 
   return "legend: " + this.computed_label; 
 else
   return "legend: empty"; 
 
};

/* ---------------------------------------------------------------- */
/*                       LabelElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor LabelElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a LabelElement object used to hold information about label elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the label element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the label element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the label element in the document in relationship to other label elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {String}      computed_label                 - Text content of the label element 
 * @property  {Number}      computed_label_len             - Length of the computed label  
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {Boolean}     unused_label                   - Boolean indicting where the label references a form control 
 * @property  {Object}      control_element    - Reference to the control that the label elements is associated with  
 *
 * @property  {FieldsetElement}  fieldset_element     - Reference to any fieldset elements this label is nested in
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

 this.dom_element    = dom_element;
 this.cache_id       = "";
 this.document_order = 0;
 
 this.child_cache_elements = [];
 
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.LABEL;

 this.computed_label = "";
 this.computed_label_length = 0;
 this.computed_label_for_comparison = "";

 this.unused_label    =  true;
 this.control_element =  null;

 this.fieldset_element = control_info.fieldset_element;

 this.for_id = dom_element.node.getAttribute('for');
         
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.LabelElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'for_id');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.LabelElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.LabelElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.LabelElement
 *
 * @desc Returns a text string representation of the label element 
 *
 * @return {String} Returns string represention the LabelElement object
 */
 
OpenAjax.a11y.cache.LabelElement.prototype.toString = function () {
 if (this.computed_label.length) 
   return "label: " + this.computed_label; 
 else
   return "label: empty"; 
};

/* ---------------------------------------------------------------- */
/*                       InputElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor InputElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InputElement object used to hold information about input elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {String}      type                  - Type of input element  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {String}      name_attribute        - Text content of the name attribute  
 *
 * @property  {String}      computed_label                 - Calculated label for the input element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {Number}      computed_label_source          - Constant representing how a label was calculated 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      readonly   - The value of the readonly attribute 
 * @property  {String}      disabled   - The value of the disabled attribute
 * @property  {String}      value      - The value of the readonly attribute 
 * @property  {String}      checked    - The value of the disabled attribute
 */

OpenAjax.a11y.cache.InputElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
  this.cache_id    = "";
  this.document_order = 0;
  
  
  this.value   = node.value; 
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type  = OpenAjax.a11y.CONTROL_TYPE.UNKNOWN; 

  this.type = "text";  
  if (node.type) this.type = node.type; 

  switch (node.type) {
 
  case 'button':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT; 
    break;

  case 'file':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.FILE; 
    break;
    
  case 'checkbox':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.CHECKBOX; 
    break;
    
  case 'radio':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RADIO; 
    break;
    
  case 'text':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.TEXT; 
    break;
    
  case 'password':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.PASSWORD; 
    break;
    
  case 'hidden':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.HIDDEN; 
    break;
    
  case 'image':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.IMAGE; 
    break;

  case 'submit':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.SUBMIT; 
    break;
    
  case 'reset':
    this.control_type  = OpenAjax.a11y.CONTROL_TYPE.RESET; 
    break;
  
  default:
    break; 
  }
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.InputElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'name');
  cache_nls.addPropertyIfDefined(attributes, this, 'maxlength');
  cache_nls.addPropertyIfDefined(attributes, this, 'readonly');
  cache_nls.addPropertyIfDefined(attributes, this, 'value');
  cache_nls.addPropertyIfDefined(attributes, this, 'required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_invalid');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.InputElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');
  cache_nls.addPropertyIfDefined(properties, this, 'is_widget');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.InputElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.InputElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.InputElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.InputElement
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return {String} Returns string represention the InputElement object
 */
 
OpenAjax.a11y.cache.InputElement.prototype.toString = function () {
  
  return "input: " + this.type;
  
};

/* ---------------------------------------------------------------- */
/*                       ButtonElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor ButtonElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a ButtonElement object used to hold information about button elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the button element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the button element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this button element is nested in
 *
 * @property  {String}     computed_label                  - Calculated label for the button element 
 * @property  {Number}     computed_label_length           - Length of the label property 
 * @property  {String}     computed_ label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {String}     readonly              - The value of the readonly attribute 
 * @property  {String}     disabled              - The value of the disabled attribute
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

  this.dom_element = dom_element;
  this.cache_id    = "";
  
  this.child_cache_elements = [];
 
  var node = dom_element.node;
 
  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT; 
 
  this.name_attribute = node.getAttribute('name');
  
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.fieldset_element = control_info.fieldset_element;

};


/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
  if (child_control) {
    this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.ButtonElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.ButtonElement
 *
 * @desc Returns a text string representation of the button element 
 *
 * @return {String} Returns string represention the ButtonElement object
 */
 
OpenAjax.a11y.cache.ButtonElement.prototype.toString = function () {
 return "button"; 
};

/* ---------------------------------------------------------------- */
/*                    TextareaElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor TextareaElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a TextareaElement object used to hold information about textarea elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the textarea element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the textarea element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - Type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {String}      computed_label                 - Calculated label for the textarea element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}      rows       - The value of the rows attribute 
 * @property  {String}      cols       - The value of the cols attribute
 *
 * @property  {String}      readonly   - The value of the readonly attribute 
 * @property  {String}      disabled   - The value of the disabled attribute
 */

OpenAjax.a11y.cache.TextareaElement = function (dom_element, control_info) {

  var node = dom_element.node;

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  this.type = "textarea";  

  this.control_type = OpenAjax.a11y.CONTROL_TYPE.TEXTAREA;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
  
  this.name_attribute  = node.getAttribute('name');
  
  this.rows = node.rows; 
  this.cols = node.cols; 
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;

};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.TextareaElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TextareaElement
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return {String} Returns string represention the Element object
 */
 
OpenAjax.a11y.cache.TextareaElement.prototype.toString = function () {
 return "Textarea"; 
};

/* ---------------------------------------------------------------- */
/*                      SelectElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor SelectElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a SelectElement object used to hold information about select elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the select element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the select element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {String}      name_attribute  - Value of the name attribute
 * @property  {String}      type            - String indicating the type of form control
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Array}       option_elements       - Array of child cache option elements  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this select element is nested in
 *
 * @property  {String}      computed_label                 - Calculated label for the select element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 * @property  {String}      size                  - The value of the size attribute 
 * @property  {String}      multiple              - The value of the multiple attribute
 */

OpenAjax.a11y.cache.SelectElement = function (dom_element, control_info) {

  this.dom_element    = dom_element;
  this.cache_id       = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  
  this.option_elements = [];
 
  this.control_type = OpenAjax.a11y.CONTROL_TYPE.SELECT;

  var node = dom_element.node;

  this.name_attribute  = node.getAttribute('name');
  this.type = "select";
  
  this.size   = node.size;
  this.multiple = node.multiple;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
 
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.SelectElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

};

/**
 * addOption
 * 
 * @desc add a OptionElement object reference to the tree of   
 *
 * @param  child_control    Object control cache element object  
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.SelectElement.prototype.addOption = function (option_element) {

  if (option_element) {
    this.option_elements.push(option_element); 
    option_element.document_order = this.option_elements.length;
    option_element.cache_id    = this.cache_id + "_" + this.option_elements.length;
  }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.SelectElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.SelectElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};


/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.SelectElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.SelectElement
 *
 * @desc Returns a text string representation of the select element 
 *
 * @return {String} Returns string represention the SelectElement object
 */
 
OpenAjax.a11y.cache.SelectElement.prototype.toString = function () {
  return "select: " + this.option_elements.length + " options"; 
};

/* ---------------------------------------------------------------- */
/*                       OptgroupElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor OptgroupElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element  - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 *
 * @property  {SelectElement}  select_element     - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}      computed_label                 - Calculated label for the select element 
 * @property  {Number}      computed_label_length          - Length of the label property 
 * @property  {String}      computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";
 
 this.child_cache_elements = [];
         
 this.control_type = OpenAjax.a11y.CONTROL_TYPE.OPTGROUP;
 
 this.select_element = control_info.select_element;
         
 this.computed_label = dom_element.node.computed_label;
 if (this.computed_label) { 
   this.computed_label_length = this.computed_label.length;
   this.computed_label_for_comparison = this.computed_label.normalizeSpace().toLowerCase();
 }  
 else {
   this.computed_label_length = 0;
   this.computed_label_for_comparison = "";
 }  
 
};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidgetElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_cache_elements.push(child_control); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptgroupElement
 *
 * @desc Returns a text string representation of the optgroup element 
 *
 * @return {String} Returns string represention the OptgroupElement object
 */
 
OpenAjax.a11y.cache.OptgroupElement.prototype.toString = function () {
 return "OPTGROUP with " + this.child_cache_elements.length + " options"; 
};

/* ---------------------------------------------------------------- */
/*                      OptionElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor OptionElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a OptgroupElement object used to hold information about optgroup elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the optgroup element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element        - Reference to the dom element representing the optgroup element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Number}      control_type       - Constant indicating the type of cache control object  
 *
 * @property  {SelectElement}  select_element  - Reference to the select element that this optgroup is nested in
 *
 * @property  {String}         value           - Value of the value attribute 
 */

OpenAjax.a11y.cache.OptionElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.cache_id    = "";
 
 this.control_type   = OpenAjax.a11y.CONTROL_TYPE.OPTION;
 
 this.select_element = control_info.select_element;
         
 this.value = dom_element.node.value;
 
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.OptionElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
//  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.OptionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**

 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.OptionElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.OptionElement
 *
 * @desc Returns a text string representation of the option element 
 *
 * @return {String} Returns string represention the OptionElement object
 */
 
OpenAjax.a11y.cache.OptionElement.prototype.toString = function () {
 return "OPTION with value=" + this.value; 
};

/* ---------------------------------------------------------------- */
/*                       WidgetElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor WidgetElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a InputElement object used to hold information about input elements
 *
 * @param  {DOMelement}   dom_element   - The dom element object representing the input element 
 * @param  {ControlInfo}  control_info  - Information about the parent controls
 *
 * @property  {DOMElement}  dom_element     - Reference to the dom element representing the input element
 * @property  {String}      cache_id        - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the control element in the document in relationship to other control elements
 *
 * @property  {Array}       child_cache_elements  - Array of child cache control elements as part of cache control tree 
 * @property  {String}      type                  - String indicating the type of input element  
 * @property  {Number}      control_type          - Constant indicating the type of cache control object  
 * @property  {String}      name_attribute        - Text content of the name attribute  
 *
 * @property  {String}  computed_label                 - Calculated label for the input element 
 * @property  {Number}  computed_label_length          - Length of the label property 
 * @property  {Number}  computed_label_source          - Constant representing how a label was calculated 
 * @property  {String}  computed_label_for_comparison  - Label for comparison (lowercase, space normalization and trimmed)
 *
 * @property  {LabelElement}     label_element    - Reference to any label element that this input is nested in
 * @property  {FieldsetElement}  fieldset_element - Reference to any fieldset elements this input is nested in
 *
 * @property  {String}  readonly  - The value of the readonly attribute 
 * @property  {String}  disabled  - The value of the disabled attribute
 * @property  {String}  value     - The value of the readonly attribute 
 * @property  {String}  checked   - The value of the disabled attribute
 */

OpenAjax.a11y.cache.WidgetElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
  this.cache_id    = "";
  this.document_order = 0;
  
  this.child_cache_elements = [];
  this.type    = node.type; 
  this.value   = node.value; 
  this.checked = node.checked;

  this.name_attribute = node.getAttribute('name');
  this.required       = node.getAttribute('required');
  this.aria_required  = node.getAttribute('aria-required');
  this.aria_invalid   = node.getAttribute('aria-invalid');

  this.control_type   = OpenAjax.a11y.CONTROL_TYPE.WIDGET; 
  
  this.label_element    = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};

/**
 * @method addChildControl
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 * 
 * @desc Adds a cache control element to the tree representation of control elements
 *
 * @param  {WidegtElement | ButtonElement | FieldsetElement | FormElement | InputElement | LabelElement| LegendElement | OptgroupElement | OptionElement | SelectElement | TextareaElement } control_element   - Cache control element object to add 
 */

OpenAjax.a11y.cache.WidgetElement.prototype.addChildControl = function (child_control) {

  if (child_control) {
   this.child_cache_elements.push(child_control); 
  }  
}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of attribute display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'name');
  cache_nls.addPropertyIfDefined(attributes, this, 'maxlength');
  cache_nls.addPropertyIfDefined(attributes, this, 'readonly');
  cache_nls.addPropertyIfDefined(attributes, this, 'value');
  cache_nls.addPropertyIfDefined(attributes, this, 'required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_required');
  cache_nls.addPropertyIfDefined(attributes, this, 'aria_invalid');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @param {Boolean}  unsorted  - If defined and true the results will NOT be sorted alphabetically
 *
 * @return {Array} Returns a array of cache property display object
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCacheProperties = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var properties = this.dom_element.getCacheProperties(unsorted);

  cache_nls.addPropertyIfDefined(properties, this, 'label');
  cache_nls.addPropertyIfDefined(properties, this, 'computed_label_source');
  cache_nls.addPropertyIfDefined(properties, this, 'label_for_comparison');

  if (!unsorted) this.dom_element.sortItems(properties);

  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event item display objects
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getEvents = function () {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized string and style properties
 *       If label is empty a missing label message will the returned 
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getNLSLabel = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var label_style = {};
  
  if (this.computed_label_length) {
    return this.computed_label;
  }
  else {
    return cache_nls.getNLSMissingLabelMessage();
  }
  
};

/**
 * @method getLabelSourceNLS
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns an object with an NLS localized information on the source of the label
 *
 * @return {String | Object} Returns a String if the label has content, 
 *                            but if label is empty it returns an object 
 *                            with a 'label and 'style' property
 */

OpenAjax.a11y.cache.WidgetElement.prototype.getLabelSourceNLS = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSValue('computed_label_source', this.computed_label_source);
  
};



/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WidgetElement
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return {String} Returns string represention the InputElement object
 */
 
OpenAjax.a11y.cache.WidgetElement.prototype.toString = function () {
  
  return this.dom_element.tag_name + ": " + this.dom_element.role;
  
};
