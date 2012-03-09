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
 * @method getSeverityNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the severity object with NLS information
 *
 * @param  {Number}  severity  -  The constant representing the severity of the results
 *
 * @return {Object} Returns an object with the four properties: 'label', 'abbrev', 'description' snf 'tooltip'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getSeverityNLS = function(severity) {

  return this.nls[OpenAjax.a11y.locale].severities[severity];

};

/**
 * @method getRuleTypeNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS localized version of the rule type
 *
 * @param  {Number}  rule_type  -  The constant representing the type of rule in a ruleset (i.e. required, recommended, conditional)
 *
 * @return {String} Returns an NLS localized string representing the type of rule in the ruleset
 */
 
OpenAjax.a11y.CacheNLS.prototype.getRuleTypeNLS = function(rule_type) {

  return this.nls[OpenAjax.a11y.locale].rule_types[rule_type];

};

/**
 * @method getLabelAndValueNLS
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
 
OpenAjax.a11y.CacheNLS.prototype.getLabelAndValueNLS = function (property, value) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.value       = value;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
      if (typeof value == 'boolean') {
      
        if (value)
          info.value = nls_cache.boolean_values.true_value;
        else
          info.value = nls_cache.boolean_values.false_value;
          
      }
      else {
        if (cp.values) info.value = cp.values[value];
      }  
        
    } 
    
    return info;
  
};

/**
 * @method getLabelNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the label and description of a cache property
 *
 * @param  {String}  property  - The object property
 * 
 * @return {Object} Returns object with two properties 'label' and 'description'
 */
 
OpenAjax.a11y.CacheNLS.prototype.getLabelNLS = function (property) {
  
    var info = {};  // return object 
    
    info.label       = property;
    info.description = "";
    
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return info;

      if (cp.label)       info.label       = cp.label;
      if (cp.description) info.description = cp.description;        
              
    } 
    
    return info;
  
};

/**
 * @method getValueNLS
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
 
OpenAjax.a11y.CacheNLS.prototype.getValueNLS = function (property, value) {
  
    var str = "";  // return object 
       
    var nls_cache = this.nls[OpenAjax.a11y.locale];
    
    if (nls_cache) {
     
      var cp = nls_cache.cache_properties[property];
      
      // if null return default
      if (!cp) return value;

      if (typeof value == 'boolean') {
      
        if (value)
          str = nls_cache.boolean_values.true_value;
        else
          str = nls_cache.boolean_values.false_value;
          
      }
      else {
        if (cp.values) str = cp.values[value];
      }  
              
    } 
    
    return str;
  
};

/**
 * @method getBooleanNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the NLS boolean value 
 *
 * @param {Boolean}  value  - A boolean value to get the NLS string
 * 
 * @return {String} Returns string with the localized boolean value 
 */
 
OpenAjax.a11y.CacheNLS.prototype.getBooleanNLS = function (value) {
  
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
 * @method getMissingLabelMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the missing form control label message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getMissingLabelMessageNLS = function () {
  
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
 * @method getEmptyAltTextMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns the empty alt text message message and style
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getEmptyAltTextMessageNLS = function () {
  
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
 * @method getMissingALtMessageNLS
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Returns an NLS localized 'missing alt attribute' message
 * 
 * @return {String} Returns an object with a 'label' and 'style' property
 */
 
OpenAjax.a11y.CacheNLS.prototype.getMissingAltMessageNLS = function () {
  
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
 * @method addItemIfDefined
 *
 * @memberOf OpenAjax.a11y.CacheNLS
 *
 * @desc Adds an item to a list of properties 
 */

OpenAjax.a11y.CacheNLS.prototype.addPropertyIfDefined = function (list, item, property) {

  if (typeof item[property] !== 'undefined') {
    list.push(this.getLabelAndValueNLS(property, item[property]));
  } // endif
  
};
