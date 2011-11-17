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
 * DOMElementCache
 *
 * @desc DOMElementCache object is the constructor for a list of DOMElement objects.
 *
 * @constructs
 *
 * @return  DOMElementCache object
 *
 ================================================================ */

OpenAjax.a11y.cache.DOMElementCache = function () {

 this.dom_elements = [];
 this.children = [];
 this.sort_property = 'document_order';
 this.length = 0;

 return this;

};

/** ================================================================
*
* addDOMElement
*
* @desc Adds a DOMElement object to the DOMElementCache
*
* @param dom_element Object  DOMElement object to add to the cache
*
* @return Number length is the number of DOMElements in the top level of the cache
*
* =============================================================== */

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

/** ================================================================
*
* addChild
*
* @desc  Adds a child DOMElement or DOMText object to the children
*     array to mimic the DOM node tree structure
*
* @param child Object The DOMElement or DOMText object to be add
*            that is a child of the current DOMElement
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.addChild = function ( child ) {

 if (child) {
  this.children.push( child );
 }

};

/** ================================================================
*
* getDOMElementById
*
* @desc Returns the DOMElement object with the id
*
* @param cache_id String  cache_id of the DOMElement object
*
* @return DOMElement object if found, or null if not found
*
* =============================================================== */

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

/** ================================================================
*
* getDOMElementByCacheId
*
* @desc Returns the DOMElement object with the id
*
* @param cache_id String  cache_id of the DOMElement object
*
* @return DOMElement object if found, or null if not found
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.getDOMElementByCacheId = function (cache_id) {

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


/** ================================================================
*
* emptyList
*
* @desc Empties the list of DOMElement Objects from the DOM element cache
*
* @return none
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElementCache.prototype.emptyList = function () {

 this.dom_elements.length = 0;
 this.sort_property = 'document_order';

};

/** ================================================================
*
* sortDOMElements
*
* @desc Sort the DOMElements by one of the properties of the object
*
* @param property  String  property to be used to sort the cache
* @param ascending  Boolean true if sort in ascending order; false in descending order
*
* @return true if list was sorted, false if not
*
* =============================================================== */

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

/** ================================================================
*
* getTextFromIds
*
* @desc Get the accessible text content dom nodes from a list of ids
*    Text from each DOM element node is added to the string array
*
* @param ids      String A list of space separated ids
*
* @return String
*
* =============================================================== */

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
 * checkForUniqueIDs
 *
 * @desc Check DOMElements for unique ids and set id_unique property
 *
 * @return None.
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


/** ================================================================
*
* DOMText
*
* @desc  DOMText is the cache object for DOM nodes of type text
*
* @param node Object The DOM node that corresponds to this
*
* @return DOMElement (implicitly) | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMText = function (node, parent_element) {
 this.type = NODE_TYPE.TEXT;
 this.text = node.data;
 parent_element.addToCharacterCount(this.text.length);
};




/** ================================================================
*
* OpenAjax.a11y.cache.DOMElement
*
* @desc  DOMElement encapsulates information about DOM element
*     nodes and methods for calculating derived properties
*     used by all cache objects.
*
* @constructor
*
* @param node        Object The DOM element node that corresponds
*                  to this DOMElement object, and from which
*                  common information is derived for the DOM
*                  element cache.
*
* @param parent_dom_element Object The DOM element node that corresponds to this
*                  DOMElement object, and from which all information
*                  is derived.
*
* @return DOMElement (implicitly) | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement = function (node, parent_dom_element) {

 var i;
 var attr;
 var attributes;
 var attributes_len;

 // check to make sure it is a valid node
 if (node === null) return null;

 this.type           = NODE_TYPE.ELEMENT;
 this.document_order = 0;
 this.node           = node;
 this.tag_name       = node.tagName.toLowerCase();
 this.id             = node.id;
 
 if (this.id !== '') {
   this.id_unique  = OpenAjax.a11y.ID.NOT_DEFINED;
 }
 else {
   this.id_unique  = OpenAjax.a11y.ID.UNIQUE;  
 }
 
 this.character_count = 0;

 // Save relationships with other elements
 this.parent = parent_dom_element;
 this.children = [];
 this.aria_properties = [];

 // Cache important attributes for accessibility
 i = 0;
 attr = null;
 attributes = node.attributes;
 attributes_len = attributes.length;

 this.className = "";
 this.has_alt_attribute = false;

 for (i=0; i< attributes.length; i++ ) {

   attr = attributes[i];

   switch (attr.name) {

   case 'class':
    this.class_name = attr.value.toLowerCase();
    break;

   case 'role':
    this.role = attr.value.toLowerCase();
    break;

   case 'alt':
    this.alt = attr.value;
    this.has_alt_attribute = true;
    break;

   case 'title':
    this.title = attr.value;
    break;

   case 'aria-describedby':
    this.aria_describedby = attr.value;
    break;

   case 'aria-hidden':
    this.aria_hidden    = attr.value.toLowerCase();
    break;

   case 'aria-label':
    this.aria_label    = attr.value;
    break;

   case 'aria-labelledby':
    this.aria_labelledby  = attr.value;
    break;

   default:

    if (attr.name.indexOf('aria-') === 0 ) {
     this.aria_properties.push(attr);
    }
    break;

   } // end switch

 } // end loop

 this.supports_events = OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS;

 if (OpenAjax.a11y.SUPPORTS_EVENT_ANALYSIS) {
  this.events = this.EnumerateFirefoxEvents(node, parent_dom_element);
 }
 else {
  this.events = {};
  this.events.supports_events = false;
 }


 // Create areas to store rule results associates with this node
 this.rules_violations                = [];
 this.rules_recommendations           = [];
 this.rules_manual_evaluations        = [];
 this.rules_passed                    = [];
 this.rules_hidden                    = [];
 this.rules_warnings                  = [];
 this.rules_na                        = [];

 return this;

};

/**
 * hasAttrWithValue
 *
 * @desc Check DOMElement for presence of attribute with specified value
 *
 * @param String name of attribute
 * @param String value of attribute
 *
 * @return boolean Indicates whether or not DOMElement has the specified
 *                 attribute with the specified value.
 */

OpenAjax.a11y.cache.DOMElement.prototype.hasAttrWithValue = function (name, value) {

  if (this.hasOwnProperty (name)) {
    return this[name] === value;
  }

  return false;

};


/** ================================================================
*
* EnumerateFirefoxEvents
*
* @desc
* @constructor
*
* @param node        Object The DOM element node that corresponds
*                  to this DOMElement object, and from which
*                  common information is derived for the DOM
*                  element cache.
*
* @return Object | null
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.EnumerateFirefoxEvents = function (node, parent_dom_element) {

 var i;
 
 var events = {};
 events.supports_events = false;

 var event_listener = Components.classes["@mozilla.org/eventlistenerservice;1"];

 if (event_listener !== null &&
   event_listener !== undefined) {

  events.supports_events = true;

  events.has_blur     = false;
  events.has_change    = false;
  events.has_click    = false;
  events.has_double_click = false;
  events.has_focus    = false;
  events.has_key_down   = false;
  events.has_key_press  = false;
  events.has_key_up    = false;
  events.has_load     = false;
  events.has_mouse_down  = false;
  events.has_mouse_up   = false;
  events.has_mouse_move  = false;
  events.has_mouse_out  = false;
  events.has_mouse_over  = false;

  if (parent_dom_element && parent_dom_element.events) {
   events.ancestor_has_blur     = parent_dom_element.events.has_blur;
   events.ancestor_has_change    = parent_dom_element.events.has_change;
   events.ancestor_has_click    = parent_dom_element.events.has_click;
   events.ancestor_has_double_click = parent_dom_element.events.has_double_click;
   events.ancestor_has_focus    = parent_dom_element.events.has_focus;
   events.ancestor_has_key_down   = parent_dom_element.events.has_key_down;
   events.ancestor_has_key_press  = parent_dom_element.events.has_key_press;
   events.ancestor_has_key_up    = parent_dom_element.events.has_key_up;
   events.ancestor_has_load     = parent_dom_element.events.has_load;
   events.ancestor_has_mouse_down  = parent_dom_element.events.has_mouse_down;
   events.ancestor_has_mouse_up   = parent_dom_element.events.has_mouse_up;
   events.ancestor_has_mouse_move  = parent_dom_element.events.has_mouse_move;
   events.ancestor_has_mouse_out  = parent_dom_element.events.has_mouse_out;
   events.ancestor_has_mouse_over  = parent_dom_element.events.has_mouse_over;
  }
  else {
   events.ancestor_has_blur     = false;
   events.ancestor_has_change    = false;
   events.ancestor_has_click    = false;
   events.ancestor_has_double_click = false;
   events.ancestor_has_focus    = false;
   events.ancestor_has_key_down   = false;
   events.ancestor_has_key_press  = false;
   events.ancestor_has_key_up    = false;
   events.ancestor_has_load     = false;
   events.ancestor_has_mouse_down  = false;
   events.ancestor_has_mouse_up   = false;
   events.ancestor_has_mouse_move  = false;
   events.ancestor_has_mouse_out  = false;
   events.ancestor_has_mouse_over  = false;
  }

  var event_listener_service = event_listener.createInstance(Components.interfaces.nsIEventListenerService);
  var node_event_service = event_listener_service.getListenerInfoFor(node, {});

  for (i=0; i<node_event_service.length; i++) {
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

/** ================================================================
*
* toString
*
* @desc  Create a text String that represents the DOMElement object
*
* @return String
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.toString = function() {
 return "DOM Element " + this.document_order;
};

/** ================================================================
*
* addChild
*
* @desc  Adds a child DOMElement or DOMText object to the children
*     array to mimic the DOM node tree structure
*
* @param child Object The DOMElement or DOMText object to be add
*            that is a child of the current DOMElement
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addChild = function ( child ) {

 if (child) {
  this.children.push( child );
 }

};

/** ================================================================
*
* addToCharacterCount
*
* @desc  Adds to the curren character count of the text content of the
*     contained in the DOMelement and its immediate children
*
* @param length Number  Number to add to the character count
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addToCharacterCount = function ( length ) {

 this.character_count += length;

};

/** ================================================================
*
* addComputedStyle
*
* @desc  Adds computed style information to the DOMElement object and
*     calculate the color contrast ratio
*
* @param parent_element  Object The parent DOMElement object, used
*                 for information about inherited style
*                 information
*
* @return Nothing
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.addComputedStyle = function (parent_element) {
 this.computed_style = new OpenAjax.a11y.cache.DOMElementComputedStyle(this, parent_element);
 this.computed_style.calculateColorContrastRatio();
};

/** ================================================================
*
* calculateXPath
*
* @desc Calculate the XPath string that uniquely identifies the
*    DOM node referenced by this DOMElement's node property and
*    set its xpath property to this calculated value.
*
* @param parent_element  Object The parent DOMElement object, used
*                 for information for xpath calculation
*
* @return nothing : Sets the DOMElement's xpath property.
*
* =============================================================== */

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

/** ================================================================
*
* getText
*
* @desc Returns text content of a DOMElement, including the ALT text of images
*    through recursion through the DOMText and DOMElement descendents of
*    the DOMElement
*
* @return String
*
* =============================================================== */

OpenAjax.a11y.cache.DOMElement.prototype.getText = function () {

 // Create return object
 var strings = [];

 function getTextNodeContent(dom_element, strings) {
  var i;
  var children_len;

  if (dom_element.type == NODE_TYPE.TEXT) {
   strings.push( dom_element.text );
  }
  else {
   // if an element for through all the children elements looking for text
   if (dom_element.type == NODE_TYPE.ELEMENT) {

    if (dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     // check to see if IMG or AREA element and use ALT content if defined
     if (((dom_element.tag_name == 'img') ||
        (dom_element.tag_name == 'area')) &&
        dom_element.alt &&
        dom_element.alt.length) {
       strings.push( dom_element.alt );
     } else {

      children_len = dom_element.children.length;
      for (i=0; i < children_len; i++ ) {
       getTextNodeContent( dom_element.children[i], strings);
      }
     }
    }
   }
  }
 } // end function

 getTextNodeContent(this, strings);
 return strings.join("");

};

