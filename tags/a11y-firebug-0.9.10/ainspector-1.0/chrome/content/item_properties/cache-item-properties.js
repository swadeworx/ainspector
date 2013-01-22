/**
 * Copyright 2012 University Of Illinois
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

/**
 * @file cache-item-properties.js
 * 
 * @desc Contains view and view controller functions for cache item properties dialog box
 *       The dialog box shows HTML attributes, calculated properties, styling/positioning and event information 
 */

/** 
 * @namespace OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 */
var OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS      = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS || {};
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util || {};

/* ---------------------------------------------------------------- */
/*                    onload and unload events                      */ 
/* ---------------------------------------------------------------- */

/**
 * @function onLoad
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Initializes rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.onLoad = function () {

  var cache_item_properties = new OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.dialog();

  this.cache_item_properties = cache_item_properties;

  this.cache_item  = window.arguments[0];
  
  if (cache_item_properties) {
    if (cache_item) cache_item_properties.update(cache_item);
    else cache_item_properties.clear();
  }
  
};

/**
 * @function onUnload
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Clears the rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.onUnload = function () {

  this.cache_item_properties = null;
  this.cache_item  = null;
    
};

/* ---------------------------------------------------------------- */
/*                    utilities                                     */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor util.removeChildNodes
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Removed the child nodes of a DOM node
 *
 * @param {DOM node}   node  -  DOM node to remove children  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.removeChildNodes = function (node) {

  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
  
};

/**
 * @function util.addTextNode
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Creates a DOM Text Node and appends it to the element node
 *
 * @param {DOM node}  node  - DOM Element node    
 * @param {String}    text  - Text content to add to a DOM element node     
 */

OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addTextNode = function (node, text) {

  var text_node = document.createTextNode(text);  
  node.appendChild(text_node);

};

/**
 * @constructor util.addTableRowLabelValue
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Adds a table row consisting of one TH and one TD element, the TD element can be styled 
 *
 * @param {DOM node}  node        -  DOM node of a tbody or table element to add row   
 * @param {String}    tr_style    -  Style class name to be assigned to the TR element  
 * @param {String}    label       -  Text content for the TH element of the row  
 * @param {String}    label_style -  Style class name to be assigned to the TH element  
 * @param {String}    value       -  Text content for the TD element of the row
 * @param {String}    value_style -  Style class name to be assigned to the TD element  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addTableRowLabelValue = function (node, tr_style, label, label_style, value, value_style) {

  var tr = document.createElementNS("http://www.w3.org/1999/xhtml","tr");
  if (tr_style && tr_style.length) tr.setAttribute('class', tr_style);
  
  var th = document.createElementNS("http://www.w3.org/1999/xhtml","th"); 
  if (label_style && label_style.length) th.setAttribute('class', label_style);
  var text = document.createTextNode(label);
  th.appendChild(text);
  tr.appendChild(th);
  
  var td = document.createElementNS("http://www.w3.org/1999/xhtml","td");
  if (value_style && value_style.length) td.setAttribute('class', value_style);
  text = document.createTextNode(value);
  td.appendChild(text);
  tr.appendChild(td);
  
  node.appendChild(tr);
  
};

/**
 * @constructor util.addTableRowEvent
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Adds a table row consisting of one TH and one TD element, the TD element can be styled 
 *
 * @param {DOM node}  node     -  DOM node of a tbody or table element to add row   
 * @param {String}    tr_style -  Style class name to be assigned to the TR element  
 * @param {Object}    event    -  Object containing information about a specific event for a dom node  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addTableRowEvent = function (node, tr_style, event) {

  var text_node;
 
  var nls_strings = document.getElementById("ID_STRINGBUNDLE_CACHE_ITEM_PROPERTIES");
  var str_event_yes = nls_strings.getString('eventYes');
  var str_event_no  = nls_strings.getString('eventNo');

  var tr = document.createElementNS("http://www.w3.org/1999/xhtml","tr");
  if (tr_style && tr_style.length) tr.setAttribute('class', tr_style);
  
  var th = document.createElementNS("http://www.w3.org/1999/xhtml","th"); 
  if (event.on_element) text = document.createTextNode(event.label);
  th.appendChild(text);
  tr.appendChild(th);
  
  var td = document.createElementNS("http://www.w3.org/1999/xhtml","td");
  td.setAttribute('class', event.on_element_style);
  text_node = document.createTextNode(event.on_element);
  td.appendChild(text_node);
  tr.appendChild(td);
  
  td = document.createElementNS("http://www.w3.org/1999/xhtml","td");
  td.setAttribute('class', event.on_ancestor_style);
  text_node = document.createTextNode(event.on_ancestor);
  td.appendChild(text_node);
  tr.appendChild(td);
  
  node.appendChild(tr);
  
};

/**
 * @constructor util.addTableRowNone
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Adds a table row consisting of one TH and one TD element, the TD element can be styled 
 *
 * @param {DOM node}  node     -  DOM node of a tbody or table element to add row   
 * @param {String}    message  -  Message describing the empty table  
 * @param {number}    cols     -  Number of columns to span  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addTableRowNone = function (node, message, cols) {

  var tr = document.createElementNS("http://www.w3.org/1999/xhtml", "tr");
  tr.setAttribute('class', 'odd');
  
  var th = document.createElementNS("http://www.w3.org/1999/xhtml", "th"); 
  th.setAttribute('class', 'none');
  th.setAttribute('colspan', cols);
  
  var text = document.createTextNode(message);
  th.appendChild(text);
  tr.appendChild(th);
  
  node.appendChild(tr);
  
};

/**
 * @constructor util.addLabelsValuesToTable
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Adds an array of objects with 'label' and 'value' properties to a HTML table 
 *
 * @param {DOM node}  node              -  DOM node of a tbody or table element to add row   
 * @param {Array}     labels_and_values -  Array of label/value objects to insert into a table  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addLabelsValuesToTable = function (node, labels_and_values) {

  if (!node || !labels_and_values || !labels_and_values.length) return;
  var util = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util;

  util.removeChildNodes(node);

  var labels_and_values_len = labels_and_values.length;

  for (var i = 0; i < labels_and_values_len; i++) {
  
     var lv = labels_and_values[i];

     if (i % 2) util.addTableRowLabelValue(node, 'odd', lv.label, '', lv.value, '');
     else util.addTableRowLabelValue(node, 'even', lv.label, '', lv.value, '');

  } // end loop

};


/**
 * @method util.addEventsToTable
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Adds an array of event information objects to an HTML table
 *
 * @param {DOM node}  node    -  DOM node of a tbody or table element to add row   
 * @param {Array}     events  -  Array of event information objects to insert into a table  
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util.addEventsToTable = function (node, events) {

  if (!node || !events || !events.length) return;

  var util = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util;

  util.removeChildNodes(node);

  var events_len = events.length;

  for (var i = 0; i < events_len; i++) {
  
    var event = events[i];
  
    if (i % 2) util.addTableRowEvent(node, 'odd', event);
    else util.addTableRowEvent(node, 'even', event);
  
  } // end loop

};

/* ---------------------------------------------------------------- */
/*                    dialog                                        */ 
/* ---------------------------------------------------------------- */

/**
 * @constructor dialog
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Initializes rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.dialog = function () {

  this.cache_item = null;
  
  this.node_item          = document.getElementById("ID_ITEM");
  this.node_attributes    = document.getElementById("ID_TBODY_ATTRIBUTES");
  this.node_properties    = document.getElementById("ID_TBODY_PROPERTIES");
  this.node_style         = document.getElementById("ID_TBODY_STYLE");
  this.node_events        = document.getElementById("ID_TBODY_EVENTS");
  
};

/**
 * @method dialog.clear
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Clears the rule properties of the dialod
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.dialog.prototype.clear = function () {

  this.cache_item = null;
  
  var util = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util;
  
  var nls_strings = document.getElementById("ID_STRINGBUNDLE_CACHE_ITEM_PROPERTIES");

  util.removeChildNodes(this.node_item);
  util.addTextNode(this.node_item, nls_strings.getString('noItem'));
  
  util.removeChildNodes(this.node_attributes);
  util.addTableRowNone(this.node_attributes, 'odd', nls_strings.getString('noAttributes'), 2);

  util.removeChildNodes(this.node_properties);
  util.addTableRowNone(this.node_properties, nls_strings.getString('noProperties'), 2);

  util.removeChildNodes(this.node_style);
  util.addTableRowNone(this.node_style, nls_strings.getString('noStyle'), 2);

  util.removeChildNodes(this.node_events);
  util.addTableRowNone(this.node_events, nls_strings.getString('noEvents'), 3);

};

/**
 * @method dialog.update
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS
 *
 * @desc Shows the rule properites of a node result
 *
 * @param {Object}  cache_item  - Cache item    
 */
 
OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.dialog.prototype.update = function (cache_item) {

  this.clear();
  
  if (!cache_item) return; 

  var util = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.util;
  
  util.removeChildNodes(this.node_item);
  util.addTextNode(this.node_item, cache_item.toString());

  util.addLabelsValuesToTable(this.node_attributes, cache_item.getAttributes());

  util.addLabelsValuesToTable(this.node_properties, cache_item.getCacheProperties());

  util.addLabelsValuesToTable(this.node_style, cache_item.getStyle());

  util.addEventsToTable(this.node_events, cache_item.getEvents());
  
};


window.onload = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.onLoad;

window.onunload = OAA_WEB_ACCESSIBILITY_CACHE_ITEM_PROPS.onUnload;
