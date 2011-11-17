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
/*                       ControlInfo                                */ 
/* ---------------------------------------------------------------- */

/**
 * ControlInfo
 *
 * @desc ControlInfo is the constructor for saving the current control information 
 *    when traversing the DOM for form control information
 *
 * @constructs
 *
 * @return  ControlInfo object
 */

OpenAjax.a11y.cache.ControlInfo = function (control_info) {
 
 if (control_info) {
  this.control_element = control_info.control_element;
  this.fieldset_element = control_info.fieldset_element;
  this.select_element  = control_info.select_element;
  this.label_element  = control_info.label_element; 
 }
 else {
  this.control_element = null;
  this.fieldset_element = null;
  this.select_element  = null;
  this.label_element  = null;
 } 
}; 

/** 
 * ControlsCache
 *
 * @desc ControlsCache is the constructor for lists of form element objects
 *
 * @constructs
 *
 * @return  ControlsCache object | null
 */

OpenAjax.a11y.cache.ControlsCache = function (dom_cache) {

  this.dom_cache     = dom_cache;
 
  this.control_elements = [];
  this.label_elements  = [];
  this.fieldset_elements = [];
  this.form_elements   = [];

  this.child_controls  = [];
 
  this.sort_property  = 'document_order';

  this.ascending    = true;
  this.up_to_date    = false;
 
  this.length      = 0;
  this.label_length   = 0;
  this.form_length   = 0;
  this.fieldset_length = 0;
  this.control_length  = 0;
};

/** 
 * addControlElement
 *
 * @desc Adds a ControlElement object to TableCache 
 *
 * @param control_element Object conrtrol element object to add to the cache
 *
 * @return length Integer length is the number of table elements in the cache
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addControlElement = function (control_element) {

  // item must exist and have the position property
  if (control_element) {
    this.control_length += 1;
    control_element.document_order = this.control_length;
    control_element.cache_id = "control_" + this.control_length;
    this.control_elements.push( control_element );
    return true;
  } 

  return false;

};


/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (child_control) {

  if (child_control) {
    this.child_controls.push(child_control); 
  }  
   
}; 

/**
 * addLabelElement
 *
 * @desc Adds a labeling element object to TableCache 
 *
 * @param label_element Object label element object to add to the cache
 *
 * @return Boolean true if add, false if not added
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addLabelElement = function (label_element) {

  // item must exist and have the position property
  if (label_element) {
    this.label_length += 1;
    label_element.document_order = this.label_length;
    label_element.cache_id = "label_" + this.label_length;
    this.label_elements.push( label_element );
    return true;
  } 

  return false;

};

/**
 * addFormElement
 *
 * @desc Adds a form element object to the form_elements array
 *
 * @param form_element Object form element object to add to the cache
 *
 * @return length Integer length is the number of labeling elements in the cache
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
 * addFieldsetElement
 *
 * @desc Adds a fieldset element object to the fieldset_elements array
 *
 * @param field_element Object fieldset element object to add to the cache
 *
 * @return length Integer length is the number of labeling elements in the cache
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
 * addChildControl
 * 
 * @desc add a child table element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ControlsCache.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * emptyList
 *
 * @desc Empties the list of FormElement objects 
 *
 * @return none
 */

OpenAjax.a11y.cache.ControlsCache.prototype.emptyList = function () {

  this.controls_elements.length = [];
  this.labels_elements.length  = [];
  this.child_controls.length  = [];
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * updateCacheItem
 *
 * @desc Updates the ControlsCache object by checking to see if a DOMElement
 *    should be added to this cache
 *  
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param control_info    Object Information about the current control in the DOM recursion
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCacheItems = function (dom_element, control_info) {
 
  var form_element;
  var fieldset_element;
  var legend_element;
  var label_element;
  var input_element;
  var textarea_element;

  var button_element;

  var select_element;
  var optgroup_element;
  var option_element;
  
  var widget_element;
  
  var ci = new OpenAjax.a11y.cache.ControlInfo(control_info);

  switch (dom_element.tag_name) {

  case 'form':
    form_element = new OpenAjax.a11y.cache.FormElement(dom_element, control_info);

    this.addFormElement(form_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(form_element);   
    }
    else {
      this.addChildControl(form_element);     
    }
  
    ci.control_element = form_element;
  
    break;

  case 'fieldset':
    fieldset_element = new OpenAjax.a11y.cache.FieldsetElement(dom_element, control_info);
  
    this.addFieldsetElement(fieldset_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(fieldset_element);   
    }
    else {
      this.addChildControl(fieldset_element);     
    }
  
    ci.control_element = fieldset_element;
    ci.fieldset_element = fieldset_element;
    break;

  case 'legend':
    legend_element = new OpenAjax.a11y.cache.LegendElement(dom_element, control_info);
    legend_element.label = this.getElementTextContent(legend_element, false);

    this.addLabelElement(legend_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(legend_element);   
    }
    else {
      this.addChildControl(legend_element);     
    }

    if (control_info.fieldset_element) {
      control_info.fieldset_element.legend_element = legend_element;
    }

    ci.control_element = legend_element;
    break;

  case 'label':
    label_element = new OpenAjax.a11y.cache.LabelElement(dom_element, control_info);
    label_element.label = this.getElementTextContent(label_element, false);

    this.addLabelElement(label_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(label_element);   
    }
    else {
      this.addChildControl(label_element);     
    }
    
    ci.control_element = label_element;
    ci.label_element  = label_element;
    break;

  case 'input':
    input_element = new OpenAjax.a11y.cache.InputElement(dom_element, control_info);
    
    if (input_element.dom_element.node.type.toLowerCase() != "hidden") {
  
      this.addControlElement(input_element); 

      if (control_info.control_element) {
        control_info.control_element.addChildControl(input_element);   
      }
      else {
        this.addChildControl(input_element);     
      }
    } 
  
    break;

  case 'button':
    button_element = new OpenAjax.a11y.cache.ButtonElement(dom_element, control_info);
    
    this.addControlElement(button_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(button_element);   
    }
    else {
      this.addChildControl(button_element);     
    }
  
    ci.control_element = button_element;
    break;

  case 'textarea':
    textarea_element = new OpenAjax.a11y.cache.TextareaElement(dom_element, control_info);
  
    this.addControlElement(textarea_element); 

    if (control_info.control_element) {
      control_info.control_element.addChildControl(textarea_element);   
    }
    else {
      this.addChildControl(textarea_element);     
    }
  
    break;

  case 'select':
    select_element = new OpenAjax.a11y.cache.SelectElement(dom_element, control_info);
  
    this.addControlElement(select_element); 
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(select_element);   
    }
    else {
      this.addChildControl(select_element);     
    }
  
    ci.select_element = select_element;
    ci.control_element = select_element;
    break;

  case 'optgroup':
    optgroup_element = new OpenAjax.a11y.cache.OptgroupElement(dom_element, control_info);
  
    if (dom_element.node.label && dom_element.node.label.length) {
      optgroup_element.label = dom_element.node.label;  
    } 
 
    if (control_info.control_element) {
     control_info.control_element.addChildControl(optgroup_element);   
    }
    else {
      this.addChildControl(optgroup_element);     
    }
 
    ci.control_element = optgroup_element;
    break;

  case 'option':
    option_element = new OpenAjax.a11y.cache.OptionElement(dom_element, control_info);
  
    option_element.label = this.getElementTextContent(option_element, false);
  
    if (control_info.control_element) {
      control_info.control_element.addChildControl(option_element);   
    }
    else {
      this.addChildControl(option_element);     
    }

    if (control_info.select_element) {
      control_info.select_element.addOption(option_element);   
    }

    break;

  default:
  
    break;

  } // end switch

/**
  // check for widgets
  if (dom_element.role) {
  
    widget_element = new OpenAjax.a11y.cache.WidgetElement(dom_element, control_info);
  
  }
*/ 
  return ci;
};

/**
 * transverseDOMElementsForFormElements
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param controls_element   Object Current FormElement object that contains the DOMElement (can be null) 
 * @param controls_cell_element Object Current ControlElement object that contains the DOMElement (can be null)
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.transverseDOMElementsForControlElements = function (dom_element, control_info) {
 
 var i;
 var ci;

 if (!dom_element) return;

 if (dom_element.type == NODE_TYPE.ELEMENT) {

  ci = this.updateCacheItems(dom_element, control_info);
  
  for (i = 0; i < dom_element.children.length; i++ ) {
   this.transverseDOMElementsForFormElements(dom_element.children[i], ci);
  } // end loop
  
 }  
  
}; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.updateCache = function () {
 var i;
 var children = this.dom_cache.element_cache.children;
 var children_len = children.length;
 
 var control_info = new OpenAjax.a11y.cache.ControlInfo(null);
  
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating control elements cache.");
 for (i=0; i < children_len; i++) {
  this.transverseDOMElementsForControlElements(children[i], control_info);
 }  
 
 this.calculateControlLabels();
 
 this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed control elements cache update.");

 this.up_to_date = true;
};

/**
 * getControlElementByCacheId
 *
 * @desc Traverses the cache to find the form control with the cache id
 *
 * @param cache_id  String cache id of form control
 *
 * @return ControlElement | null
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
 * getControlElementById
 *
 * @desc Traverses the cache to find the form control with the html id
 *
 * @param id  String id of form control
 *
 * @return ControlElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getControlElementById = function (id) {

 var i;
 var control_elements_len = this.control_elements.length;

 for (i=0; i<control_elements_len; i++) {
  if (this.control_elements[i].dom_element.id == id) {
   return this.control_elements[i];
  }
 }

 return null;
};

/**
 * getLabelElementByCacheId
 *
 * @desc Traverses the cache to find the form control with the id
 *
 * @param id  String id of form control
 *
 * @return ControlElement | null
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getLabelElementByCacheId = function (cache_id) {

 var i;

 for (i=0; i<this.label_elements.length; i++) {
  if (this.label_elements[i].cache_id == cache_id) {
   return this.label_elements[i];
  }
 }

 return null;
};

/**
 * getFormElementByCacheId
 *
 * @desc Traverses the cache to find the form element with the id
 *
 * @param id  String id of form control
 *
 * @return FormElement | null
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
 * getFieldsetElementByCacheId
 *
 * @desc Traverses the cache to find the fieldset element with the id
 *
 * @param id  String id of form control
 *
 * @return FieldsetElement | null
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
 * getLabelElementTextContent
 *
 * @desc Traverses the cache to get the text content associated with the label
 *
 * @param label_element Object label element object to calculate the text content 
 *
 * @return String
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.getElementTextContent = function (label_element, include_control_values) {

 var strings = [];
 
  
 function getText(dom_element) {
  var i;
  
  // If text node get the text and return
  if( dom_element.type == NODE_TYPE.TEXT ) {
   var text = dom_element.text;
   strings.push( text );
  } else {
   // if an element for through all the children elements looking for text
   if( dom_element.type == NODE_TYPE.ELEMENT ) {
   
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
    
    for (i = 0; i < dom_element.children.length; i++ ) {
     getText( dom_element.children[i]);
    }      
    
   }  
  } 
 } // end function getText

 getText(label_element.dom_element); 
 
 return strings.join("").trim().normalizeSpace();
 
};

/**
 * calculateLabelsByReference
 *
 * @desc Traverses the cache to calculate the label for each control 
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByReference = function () {

  var i;
  var id;
  var ce;
  var le;
 
  var label_elements      = this.label_elements;
  var label_elements_len = label_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<label_elements_len; i++) {
 
    le = label_elements[i];
 
    if (le.for_id) {
      id = le.for_id;
    }
    else {
      id = null;
    }  

    if (id && id.length) {
      ce = this.getControlElementById(id);
   
      if (ce) {
   
        // Add fieldset/legend information if defined
        if (ce.label === "" && 
          ce.fieldset_element && 
          ce.fieldset_element.legend_element) {
          ce.label = ce.fieldset_element.legend_element.label + " ";   
        }
    
        le.unused_label = false;
        ce.label += this.getElementTextContent(le, true) + " ";
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_REFERENCE;
        ce.label_for_comparison = ce.label.toLowerCase().trim();
      }
      else {
        le.unused_label = true;
      }
    }
  }
};

/**
 * calculateLabelsByEncapsulation
 *
 * @desc Traverses the cache to calculate the label for each control that is inside a label element
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByEncapsulation = function () {

  var i;
  var ce;
 
  var control_elements = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<control_elements_len; i++) {
 
    ce= control_elements[i];
 
    switch (ce.type) {
  
    case 'button':
      if (ce.dom_element.tag_name == 'button') {
        ce.label = this.getElementTextContent(ce, false);
        ce.label_source = OpenAjax.a11y.SOURCE.CHILD_TEXT_NODES;
        ce.label_for_comparison = ce.label.toLowerCase().trim();        
      }
      break;
  
    default:
      if (ce.label.length === 0 && 
          ce.label_element) {
    
        // Add fieldset/legend information if defined
        if (ce.fieldset_element && 
          ce.fieldset_element.legend_element) {
          ce.label = ce.fieldset_element.legend_element.label + " ";   
        }
       
        ce.label += ce.label_element.label + " ";
        ce.label_source = OpenAjax.a11y.SOURCE.LABEL_ENCAPSULATION;
        ce.label_for_comparison = ce.label.toLowerCase().trim();
      }
      break;
    } // end switch 
  } // end loop
};

/**
 * calculateLabelsByTitle
 *
 * @desc Traverses the cache to calculate the label for each control that has a title element
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateLabelsByTitle = function () {

  var i;
  var ce;
 
  var control_elements     = this.control_elements;
  var control_elements_len = control_elements.length;
  
  // first check if an label by reference
 
  for (i=0; i<control_elements_len; i++) {
 
    ce = control_elements[i];
 
    if (ce.label.length === 0 && 
        ce.dom_element.title &&
        ce.dom_element.title.length) {
    
      // Add fieldset/legend information if defined
      if (ce.fieldset_element && 
        ce.fieldset_element.legend_element) {
        ce.label = ce.fieldset_element.legend_element.label;   
      }
       
      ce.label += ce.dom_element.title;
      ce.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
      ce.label_for_comparison = ce.label.toLowerCase().trim();
    }
  }
};

/**
 * calculateControlLabels
 *
 * @desc Traverses the cache to calculate the label for each control 
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.ControlsCache.prototype.calculateControlLabels = function () {

 this.calculateLabelsByReference();
 this.calculateLabelsByEncapsulation();
 this.calculateLabelsByTitle();
};

/* ---------------------------------------------------------------- */
/*                       FormElement                                */ 
/* ---------------------------------------------------------------- */

/**
 * FormElement
 *
 * @desc FormElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  FormElement | null
 */

OpenAjax.a11y.cache.FormElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 this.type = "form";
 
 this.action = dom_element.node.action;
 this.method = dom_element.node.method;
 this.name  = dom_element.node.name;
         
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.FormElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the form element 
 *
 * @return String represening the FormElement
 */
 
OpenAjax.a11y.cache.FormElement.prototype.toString = function () {
 return "Form " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       FieldsetElement                            */ 
/* ---------------------------------------------------------------- */


/**
 * FieldsetElement
 *
 * @desc FieldsetElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  FieldsetElement | null
 */

OpenAjax.a11y.cache.FieldsetElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.type = "fieldset";

 this.fieldset_element = control_info.fieldset_element;
 
 this.legend_element = null;
 
 this.legend_count = 0;
         
};

/** 
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.FieldsetElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the fieldset element 
 *
 * @return String represening the FieldsetElement
 */
 
OpenAjax.a11y.cache.FieldsetElement.prototype.toString = function () {
 return "Fieldset " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       LegendElement                              */ 
/* ---------------------------------------------------------------- */

/**
 * LegendElement
 *
 * @desc LegendElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  LegendElement | null
 */

OpenAjax.a11y.cache.LegendElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.label = "";
 this.label_for_comparison = "";

 this.fieldset_element = control_info.fieldset_element;
  
 if (control_info.fieldset_element) {
   control_info.fieldset_element.legend_count++;
 }
 
 this.type = "legend";

};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LegendElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the legend element 
 *
 * @return String represening the LegendElement
 */
 
OpenAjax.a11y.cache.LegendElement.prototype.toString = function () {
 return "Legend " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       LabelElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * LabelElement
 *
 * @desc LabelElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  LabelElement | null
 */

OpenAjax.a11y.cache.LabelElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
 
 this.type = "label";

 this.label = "";
 this.label_for_comparison = "";

 this.fieldset_element = control_info.fieldset_element;

 this.for_id = dom_element.node.getAttribute('for');
         
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.LabelElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the label element 
 *
 * @return String represening the LabelElement
 */
 
OpenAjax.a11y.cache.LabelElement.prototype.toString = function () {
 return "Label " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       InputElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * InputElement
 *
 * @desc InputElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  InputElement | null
 */

OpenAjax.a11y.cache.InputElement = function (dom_element, control_info) {

  var node = dom_element.node;
 
  this.dom_element = dom_element;
 
  this.type   = node.type; 
  this.value  = node.value; 
  this.checked = node.checked;

  switch (this.type) {
 
  case 'button':
    this.label = node.value; 
    this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
    this.label_for_comparison = this.label.toLowerCase().trim();
    break;

  case 'image':
    if (node.alt) {
      this.label = node.alt; 
      this.label_source = OpenAjax.a11y.SOURCE.ALT_ATTRIBUTE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    else {
      if (node.title) {
        this.label = node.title;
        this.label_source = OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE;
        this.label_for_comparison = this.label.toLowerCase().trim();
      }
      else {
        this.label = "";
        this.label_source = OpenAjax.a11y.SOURCE.NONE;
        this.label_for_comparison = "";
      }   
    }
    break;

  case 'submit':
  case 'reset':
    if (node.value) {
      this.label = node.value; 
      this.label_source = OpenAjax.a11y.SOURCE.VALUE_ATTRIBUTE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    else {
      this.label = this.type.capitalize();
      this.label_source = OpenAjax.a11y.SOURCE.BUTTON_TYPE;
      this.label_for_comparison = this.label.toLowerCase().trim();
    }
    break;
  
  default:
    this.label = "";
    this.label_source = OpenAjax.a11y.SOURCE.NONE;
    this.label_for_comparison = "";
    break; 
  }
 
  this.readonly  = node.readonly;
  this.disabled  = node.disabled;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;

};


/**
 * toString
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return String represening the InputElement
 */
 
OpenAjax.a11y.cache.InputElement.prototype.toString = function () {
 return "Input " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       ButtonElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * ButtonElement
 *
 * @desc ButtonElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  InputElement | null
 */

OpenAjax.a11y.cache.ButtonElement = function (dom_element, control_info) {

 this.dom_element = dom_element;
 this.child_controls = [];
 
 var node = dom_element.node;
 
 this.type   = 'button'; 
 
 this.label  = "";
 this.label_for_comparison = "";
 
 this.readonly  = node.readonly;
 this.disabled  = node.disabled;
 
 this.fieldset_element = control_info.fieldset_element;

};


/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.ButtonElement.prototype.addChildControl = function (child_control) {
 if (child_control) {
  this.child_controls.push(child_control); 
 }  
}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the input element 
 *
 * @return String represening the InputElement
 */
 
OpenAjax.a11y.cache.ButtonElement.prototype.toString = function () {
 return "Button " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                    TextareaElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * TextareaElement
 *
 * @desc TextareaElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  TextareaElement | null
 */

OpenAjax.a11y.cache.TextareaElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;

 this.type = "textarea";
 
 var node = dom_element.node;

 this.label  = "";
 this.label_for_comparison = "";

 this.rows = node.rows; 
 this.cols = node.cols; 
 
 this.readonly  = node.readonly;
 this.disabled  = node.disabled;
 
 this.label_element  = control_info.label_element;
 this.fieldset_element = control_info.fieldset_element;

};

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the TextareaElement
 */
 
OpenAjax.a11y.cache.TextareaElement.prototype.toString = function () {
 return "Textarea " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                      SelectElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * SelectElement
 *
 * @desc SelectElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  SelectElement | null
 */

OpenAjax.a11y.cache.SelectElement = function (dom_element, control_info) {

  this.dom_element  = dom_element;
  this.child_controls = [];
  this.option_elements = [];
 
  this.type = "select";

  var node = dom_element.node;

  this.label = "";
  this.label_for_comparison = "";

  this.size   = node.size;
  this.multiple = node.multiple;
 
  this.label_element  = control_info.label_element;
  this.fieldset_element = control_info.fieldset_element;
 
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.SelectElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
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
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the SelectElement
 */
 
OpenAjax.a11y.cache.SelectElement.prototype.toString = function () {
 return "Select " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                       OptgroupElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * OptgroupElement
 *
 * @desc OptgroupElement is the object used to hold data about a optgroup in select controls
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  OptionElement | null
 */

OpenAjax.a11y.cache.OptgroupElement = function (dom_element, control_info) {

 this.dom_element  = dom_element;
 this.child_controls = [];
         
 this.type = "optgroup";
 
 this.select_element = control_info.select_element;
         
 this.label = dom_element.node.label;
 this.label_for_comparison = this.label.toLowerCase().trim();
 
};

/**
 * addChildControl
 * 
 * @desc add a child control element reference to a control element 
 *
 * @constructs
 *
 * @param  child_control    Object control element object is the child 
 *
 * @return  nothing
 */

OpenAjax.a11y.cache.OptgroupElement.prototype.addChildControl = function (child_control) {

 if (child_control) {
  this.child_controls.push(child_control); 
 }  

}; 

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the OptionElement
 */
 
OpenAjax.a11y.cache.OptgroupElement.prototype.toString = function () {
 return "Optgroup " + this.document_order; 
};

/* ---------------------------------------------------------------- */
/*                      OptionElement                               */ 
/* ---------------------------------------------------------------- */

/**
 * OptionElement
 *
 * @desc OptionElement is the object used to hold data about a option element in a select control 
 *
 * @constructs
 *
 * @param  dom_element  Object  dom_element object provides information about current dom node 
 * @param  control_info Object  Information about the current set of controls
 *
 * @return  OptionElement | null
 */

OpenAjax.a11y.cache.OptionElement = function (dom_element, control_info) {

 this.dom_element   = dom_element;
         
 this.type = "option";
 
 this.select_element = control_info.select_element;
         
 this.value = dom_element.node.value;
 
};

/**
 * toString
 *
 * @desc Returns a text string representation of the textarea element 
 *
 * @return String represening the OptionElement
 */
 
OpenAjax.a11y.cache.OptionElement.prototype.toString = function () {
 return "Option " + this.document_order; 
};
