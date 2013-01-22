/*
 * Copyright 2012 University of Illinois
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
 * @file utilities.js
 *
 * @desc Utility functions for displaying properties, methods and attributes
 */

/**
 * @namespace OAA_WEB_ACCESSIBILITY_UTILS
 */

var OAA_WEB_ACCESSIBILITY_UTILS = OAA_WEB_ACCESSIBILITY_UTILS || {};

/**
 * @function getPropValue
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Return a string containing the value of the named property for the
 *       specified object.
 *
 * @param {Object} obj - the object of interest
 * @param {String} prop - name of the property whose value is to be revealed
 * @param {String} name - (optional) an identifier for the object
 */

OAA_WEB_ACCESSIBILITY_UTILS.getPropValue = function (obj, prop, name) {
  if (!name) name = obj;
  var prefix = 'PROPERTY VALUE for ' + name + '["' + prop + '"]: ';
  var info = (typeof obj[prop] === 'undefined') ? 'undefined' : obj[prop];
  return prefix + info;
};

/**
 * @function getProperties
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Return a string containing a comma-separated list of all properties
 *       of an object, excluding methods.
 *
 * @param {Object} obj - the object of interest
 * @param {String} name - (optional) an identifier for the object
 * @param {Boolean} unsorted - (optional) if true, do not sort the list
 */

OAA_WEB_ACCESSIBILITY_UTILS.getProperties = function (obj, name, unsorted) {
  if (!name) name = obj;
  var prefix = 'PROPERTIES for ' + name + ':\n';
  var properties = [];
  for (var prop in obj) {
    if (!(typeof obj[prop] === 'function')) properties.push(prop);
  }
  if (!unsorted) properties.sort();
  return prefix + properties.join(', ');
};

/**
 * @function getMethods
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Return a string containing a comma-separated list of all methods of
 *       an object, excluding other properties.
 *
 * @param {Object} obj - the object of interest
 * @param {String} name - (optional) an identifier for the object
 * @param {Boolean} unsorted - (optional) if true, do not sort the list
 */

OAA_WEB_ACCESSIBILITY_UTILS.getMethods = function (obj, name, unsorted) {
  if (!name) name = obj;
  var prefix = 'METHODS for ' + name + ':\n';
  var methods = [];
  for (var propertyName in obj) {
    if (typeof obj[propertyName] === 'function') methods.push(propertyName);
  }
  if (!unsorted) methods.sort();
  return prefix + methods.join(', ');
};

/**
 * @function getAttrValue
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Return a string containing the attribute name and its value for the
 *       specified DOM node. If the attribute does not exist on the node, the
 *       string 'attribute does not exist' is returned.
 *
 * @param {Object} node - the node of interest
 * @param {String} attr - name of the attribute whose value is to be revealed
 */

OAA_WEB_ACCESSIBILITY_UTILS.getAttrValue = function (node, attr) {
  var prefix = 'ATTRIBUTE INFO for ' + node + '[@' + attr + ']: ';
  var info = node.hasAttribute(attr) ? node.getAttribute(attr) : 'attribute does not exist';
  return prefix + info;
};

/**
 * @function getAttributes
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_UTILS
 *
 * @desc Return a string containing a comma-separated list of all attributes
 *       of a DOM node.
 *
 * @param {Object} node - the node of interest
 * @param {String} name - (optional) an identifier for the DOM node
 * @param {Boolean} unsorted - (optional) if true, do not sort the list
 */

OAA_WEB_ACCESSIBILITY_UTILS.getAttributes = function (node, name, unsorted) {
  if (!name) name = node;
  var prefix = 'ATTRIBUTES for ' + name + ':\n';
  var attributes = [];
  for (var attr in node.attributes) {
    attributes.push(attr);
  }
  if (!unsorted) attributes.sort();
  return prefix + attributes.join(', ');
};
