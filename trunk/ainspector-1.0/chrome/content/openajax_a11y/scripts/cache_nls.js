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
/*                            DOMCacheNLS                          */
/* ---------------------------------------------------------------- */

/**
 * @constructor CacheNLS
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructs a DOMCache Object 
 *          
 * @property {String}  nls       - NLS cache items for properties
 */
 
OpenAjax.a11y.CacheNLS = function() {

  this.nls = {};

};

/**
 * @method addCacheNLSFromJSON()
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Constructs a DOMCache Object 
 *
 * @param  {locale}  locale         - Language code 
 * @param  {Object}  cache_nls_data - NLS cache items for properties
 */
 
OpenAjax.a11y.CacheNLS.prototype.addCacheNLSFromJSON = function(locale, cache_nls_data) {

  this.nls[locale] = cache_nls_data;

};

/**
 * @method getCacheNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the current cache nls object 
 *
 */
 
OpenAjax.a11y.CacheNLS.prototype.getCacheNLS = function() {

  return this.nls[OpenAjax.a11y.locale];

};

/**
 * @method getNLSSeverity
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the severity object with NLS information
 *
 * @param  {Number}  severity  -  The constant representing the severity of the results
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'tooltip'
 *                  All properties are String objects
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSSeverity = function(severity) {

  return this.nls[OpenAjax.a11y.locale].severities[severity];

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the implementation level object with NLS information
 *
 * @param  {Number}  level  -  The constant representing the implementation level of a rule result
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'tooltip' and 'style'
 *                  All properties are String objects
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSImplementationLevel = function(level) {

  return this.nls[OpenAjax.a11y.locale].implementation_levels[level];

};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS localized version of the rule type
 *
 * @param  {Number}  rule_type  -  The constant representing the type of rule in a ruleset (i.e. required, recommended, conditional)
 *
 * @return {String} Returns an NLS localized string representing the type of rule in the ruleset
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSRuleType = function(rule_type) {

  return this.nls[OpenAjax.a11y.locale].rule_types[rule_type];

};

/**
 * @method getNLSLabelAndValue
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label, human readable value and description of a cache property
 * 
 * @param  {String}           property  - The object property
 * @param  {String | Number}  value     - Current value of a property
 *
 * @return {Object} Returns object with three properties 'label', 'value' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSLabelAndValue = function (property, value) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.value       = value;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {

      var cp = nls_cache.resource_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
      
      switch(typeof value) {
      
      case 'boolean': 
      
        if (value)
          info.value = nls_cache.boolean_values.true_value;
        else
          info.value = nls_cache.boolean_values.false_value;
        break;
        
      case 'number':
      
        if (cp.values) 
          info.value = cp.values[value].toString();
        else
          info.value = String(value);
          
        break; 

      default:
         break;
      }      
    } 
    
    return info;
  
};

/**
 * @method getNLSLabel
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label and description of a cache property
 *
 * @param  {String}  property  - The object property
 * 
 * @return {Object} Returns object with two properties 'label' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSLabel = function (property) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.resource_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
              
    } 
    
    return info;
  
};

/**
 * @method getNLSValue
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the value of a cache property
 *
 * @param  {String}           property  - The object property
 * @param  {String | Number}  value     - Current value of a property
 * 
 * @return {String} Returns string with the localized value of a property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSValue = function (property, value) {
  
    var str = "";  // return object 
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {

      var cp = nls_cache.resource_properties[property];
      
      // if null return default
      if (!cp) return value;

      switch(typeof value) {
      
      case 'boolean': 
      
        if (value)
          str = nls_cache.boolean_values.true_value;
        else
          str = nls_cache.boolean_values.false_value;
        break;
        
      case 'number':
      
        if (cp.values) 
          str = cp.values[value].toString();
        else
          str = String(value);
          
        break; 

      default:
         break;
      }      
              
    } 
    
    return str;
  
};

/**
 * @method getNLSBoolean
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS boolean value 
 *
 * @param {Boolean}  value  - A boolean value to get the NLS string
 * 
 * @return {String} Returns string with the localized boolean value 
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSBoolean = function (value) {
  
  var str = "";  // return object 
       
  var nls_cache = this.nls[OpenAjax.a11y.locale];
    
  if (nls_cache) {
     
    if (typeof value == 'boolean') {
      
      if (value)
        str = nls_cache.boolean_values.true_value;
      else
        str = nls_cache.boolean_values.false_value;
    }
  } 
    
  return str;
  
};


/**
 * @method getNLSMissingLabelMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the missing form control label message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSMissingLabelMessage = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.missing_label;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};

/**
 * @method getNLSEmptyAltTextMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the empty alt text message message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSEmptyAltTextMessage = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.empty_alt_text;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};

/**
 * @method getNLSMissingAltMessage
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns an NLS localized 'missing alt attribute' message
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getNLSMissingAltMessage = function () {
  
    var label_style;  // return object    
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];    
    
    if (nls_cache) {
     
      label_style = nls_cache.missing_alt;
      
      // if null return default
      if (!label_style) return "";
             
    } 
    
    return label_style;
  
};


/**
 * @method addPropertyIfDefined
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Adds an item to a list of properties 
 */

OpenAjax.a11y.CacheNLS.prototype.addPropertyIfDefined = function (list, item, property) {

  if (typeof item[property] !== 'undefined') {
    list.push(this.getNLSLabelAndValue(property, item[property]));
  } // endif
  
};
