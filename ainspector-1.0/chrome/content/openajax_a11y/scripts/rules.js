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
/*                             Rule                                 */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rule
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates and validates a rule used to evaluate an accessibility feature of a document
 *
 * @param {Object}    nls                - NLS information for rules 
 * @param {String}    rule_id            - Unique id of the rule 
 * @param {String}    cache_dependency   - Which cache the rule will use 
 * @param {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param {function}  validate           - function for evalutinf the rule
 *
 * @property {Object}    nls                - NLS information for rules 
 * @property {String}    rule_id            - Unique id of the rule 
 * @property {String}    cache_dependency   - Which cache the rule will use 
 * @property {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @property {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @property {function}  validate           - function for evalutinf the rule
 */

OpenAjax.a11y.Rule = function (nls, rule_id, last_updated, cache_dependency, cache_properties, language, validate) {

  this.nls               = nls;
  this.rule_id           = rule_id;   
  this.last_updated      = last_updated;
  this.cache_dependency  = cache_dependency;
  this.cache_properties  = cache_properties;
  this.language          = language;
  this.validate          = validate;
  
};

/**
 * @method getID
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized id for the rule
 *
 * @return {String} NLS string of the rule id
 */
OpenAjax.a11y.Rule.prototype.getID = function () {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  return nls_rules.rules[this.rule_id]['ID'];
  
};

/**
 * @method getTitle
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized title for the rule
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 *
 * @return {String} NLS string of the rule title
 */
OpenAjax.a11y.Rule.prototype.getTitle = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['TITLE'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      switch (rule_type) {
      case RULE.REQUIRED:
        message = nls_rules.message_severities.MUST;
        break;

      case RULE.RECOMMENDATION:
        message = nls_rules.message_severities.SHOULD;
        break;

      case RULE.CONDITIONAL:
        message = nls_rules.message_severities.MAY;
        break;

      default:
        message = "";
        break; 
      }
      
     str = str.replace(vstr, message);  
    }  
    
    return str;
  }
      
  return "Title not found for rule: " + this.rule_id;
  
};

/**
 * @method getPurpose
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized purpose of the rule
 */
OpenAjax.a11y.Rule.prototype.getPurpose = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['PURPOSE'];
  
  if (str) return str;
  
  return "";
  
};

/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized node result message
 *
 * @param {NodeResult}  node_result  - Node result to generate message
 */
OpenAjax.a11y.Rule.prototype.getMessage = function (node_result) {

  var nls_rules = this.nls[OpenAjax.a11y.locale];
  
  var SEVERITY = OpenAjax.a11y.SEVERITY;
  
  var i;
  var message;
  var str = nls_rules.rules[this.rule_id][node_result.message_id];
  
  if (!str) return nls_rules.missing_message + node_result.message_id;
    
//    OpenAjax.a11y.console("Rule: " + this.rule_id + " Message: " + str);

  var vstr; // i.e. %1, %2 ....
  var len = node_result.message_arguments.length;

  // check to see if message has severity dependence
  
  vstr = "%s";
  
  if (str.indexOf(vstr) >= 0) {
    
    switch (node_result.severity) {
    case SEVERITY.VIOLATION:
      message = nls_rules.message_severities.MUST;
      break;

    case SEVERITY.RECOMMENDATION:
      message = nls_rules.message_severities.SHOULD;
      break;

    case SEVERITY.MANUAL_CHECK:
      message = nls_rules.message_severities.MAY;
      break;

    default:
      message = "";
      break; 
    }

    str = str.replace(vstr, message);  
  }
  
  // Replace 
  
  for (i = 0; i < len; i++) { 
    vstr = "%" + (i+1); 
    message = node_result.message_arguments[i];
    
    if (typeof message === 'string') {
      message = message.normalizeSpace();
    }
    else {
      if (typeof message === 'number') {
        message = message.toString();
      }
      else {
        message = "";
      }  
    }  
    str = str.replace(vstr, message);
  } // end loop

  return str;
  
};


/* ---------------------------------------------------------------- */
/*                             Rules                                */
/* ---------------------------------------------------------------- */

/**
 * @constructor Rules
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an array of rule objects for evaluating accessibility
 */

OpenAjax.a11y.Rules = function () {

  this.rules = [];

  this.nls   = {};
  
};

/**
 * @method addRule
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a new rule to the list of rules
 *
 * @param  {String}    rule_id            - Unique id of the rule 
 * @param  {String}    cache_dependency   - Which cache the rule will use 
 * @param  {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param  {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param  {Boolean}   enabled            - true if the rule should be evaluated; false the rule will not be evaluated
 * @param  {function}  validate           - function for evalutinf the rule
 *
 * @return  {Boolean} Returns true if the rule was added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRule = function (rule_id, last_updated, cache_dependency, cache_properties, language, validate) {

  if (this.getRuleByRuleId(rule_id)) {
    OpenAjax.a11y.console("  ** Duplicate Rule ID: " + rule_id);
    return false;
  }  
  
  if (!this.validCacheDependency(cache_dependency)) {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " has invalid or missing cache dependency property"); 
    return false;    
  }  

  if (typeof cache_properties !== 'object') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " cache properties is missing or not an array"); 
    return false;    
  }  
  
  if (typeof language !== 'string') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " language property is missing or not a string"); 
    return false;    
  }  
  
  if (typeof validate !== 'function') {
    OpenAjax.a11y.console("  ** Rule " + rule_id + " validate property is missing or not a function"); 
    return false;    
  }  
 
  var oaa_rule = new OpenAjax.a11y.Rule(this.nls, rule_id, last_updated, cache_dependency, cache_properties, language, validate);

  this.rules.push(oaa_rule);

  return true;

};

/**
 * @method addRulesFromJSON
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a rules from a list of rules in JSON format
 *
 * @param {Object}    rule_array  - An array of objects representing OAA rules 
 *
 * @return  {Boolean} Returns true if the rules were added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRulesFromJSON = function (rule_array) {

  var rule_item;

//  OpenAjax.a11y.console(" ---- Adding OAA Rules ---- ");

  for (var i = 0; i < rule_array.length; i++) {

    rule_item = rule_array[i];
    
//    OpenAjax.a11y.console("  Rule: " + rule_item.id);
//    OpenAjax.a11y.console("  last update: " + rule_item.last_updated);
//    OpenAjax.a11y.console("   dependency: " + rule_item.cache_dependency);
//    OpenAjax.a11y.console("   properties: " + typeof rule_item.cache_properties);
//    OpenAjax.a11y.console("     language: " + rule_item.language);
//    OpenAjax.a11y.console("     validate: " + typeof rule_item.validate);

    this.addRule(rule_item.id, rule_item.last_updated, rule_item.cache_dependency, rule_item.cache_properties, rule_item.language, rule_item.validate );

  }

};

/**
 * @method addRulesNLSFromJSON
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Adds a rule NLS 
 *
 * @param {Object}    rule_array  - An array of objects representing OAA rules 
 *
 * @return  {Boolean} Returns true if the rules were added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRulesNLSFromJSON = function (locale, rules_nls) {

  this.nls[locale] = rules_nls;

};

/**
 * @method getRuleByRuleId
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Returned rule object with the id 
 *
 * @param  {String}  rule_id   - id of the rule to find 
 *
 * @return  {Rule} Returns rule object if the rule id is found; null if the rule id is not found 
 */

OpenAjax.a11y.Rules.prototype.getRuleByRuleId = function (rule_id) {

  var rule;
  var max = this.rules.length;

  for (var i = 0; i < max; i++ ) {
    rule = this.rules[i];
    if (rule.rule_id === rule_id) return rule;
  }

  return null;
};

/**
 * @method validCacheDependency
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Checks to see if the cache reference is valid 
 *
 * @param {String}    cache_name   - Property name of the cache 
 *
 * @return  {Boolean} Returns true if the cache dependency is valid; otherwise false
 */

OpenAjax.a11y.Rules.prototype.validCacheDependency = function (cache_name) {

  var CACHE_NAMES = OpenAjax.a11y.CACHE_NAMES;
  
  var max = CACHE_NAMES.length;
  
  for (var i = 0; i < max; i++) {
    if (cache_name === CACHE_NAMES[i]) return true;
  } // end loop
                    
  return false;
};


