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
 * @param {Object}    rule_item          - Object containing rule information 
 * @param {String}    cache_dependency   - Which cache the rule will use 
 * @param {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param {function}  validate           - function for evalutinf the rule
 *
 * @property {Object}    nls                - NLS information for rules 
 * @property {String}    rule_id            - Unique id of the rule 
 * @property {String}    rule_scope         - Defines the scope of the rule; DOM node, page or website 
 * @property {Object}    wcag_primary_id    - id of the primary WCAG 2.0 success criteria 
 * @property {Object}    wcag_related_ids   - id of related WCAG 2.0 success criteria
 * @property {String}    cache_dependency   - Which cache (i.e. element group) the rule will use 
 * @property {Array}     cache_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @property {Array}     target_objects     - The html objects the rule evaluates (NOTE: this is informative information)
 * @property {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @property {function}  validate           - function for evalutinf the rule
 */

OpenAjax.a11y.Rule = function (nls, rule_item) {

  this.nls                 = nls;
  this.rule_id             = rule_item.rule_id;   
  this.rule_scope          = rule_item.rule_scope;   
  this.wcag_primary_id     = rule_item.wcag_primary_id;   
  this.wcag_related_ids    = rule_item.wcag_related_ids;
  this.last_updated        = rule_item.last_updated;
  this.cache_dependency    = rule_item.cache_dependency;
  this.cache_properties    = rule_item.cache_properties;
  this.target_resources    = rule_item.target_resources;
  this.language_dependency = rule_item.language_dependency;
  this.validate            = rule_item.validate;
  
  this.wcag20_nls = OpenAjax.a11y.all_wcag20_nls.getNLS();
  
  
};

/**
 * @method getNLSRuleId
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized id for the rule
 *
 * @return {String} NLS string of the rule id
 */
 
OpenAjax.a11y.Rule.prototype.getNLSRuleId = function () {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  return nls_rules.rules[this.rule_id]['ID'];
  
};

/**
 * @method getNLSRuleScope
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {String} NLS string of the rule id
 */
 
OpenAjax.a11y.Rule.prototype.getNLSRuleScope = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  if (this.rule_scope) 
    return OpenAjax.a11y.util.transformElementMarkup(nls_rules.rule_scope[this.rule_scope]);
  else  
    return nls_rules.rule_scope[OpenAjax.a11y.RULE_SCOPE.UNKOWN];
  
};


/**
 * @method getNLSDefinition
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized definition of a rule
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 * 
 * @return {String} NLS string of the rule definition
 */
OpenAjax.a11y.Rule.prototype.getNLSDefinition = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['DEFINITION'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      if (rule_type) {
    
        switch (rule_type) {
        case RULE.REQUIRED:
          message = nls_rules.message_severities.MUST;
          break;

        case RULE.RECOMMENDATION:
          message = nls_rules.message_severities.SHOULD;
          break;

        default:
          message = "";
          break; 
        }
      }
      // If no rule type is defined assume "must"
      else {
        message = nls_rules.message_severities.MUST;      
      }
      
      str = str.replace(vstr, message);  
    }  
    
    return OpenAjax.a11y.util.transformElementMarkup(str);
  }
      
  return "Definition not found for rule: " + this.rule_id;
  
};

/**
 * @method getNLSSummary
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string that summarizes the requirement of the rule 
 *
 * @param {Number}  ruleset_rule_type  - Type of rule (i.e. required, recommended, conditional)
 *
 * @return {String} NLS string of a summary
 */
OpenAjax.a11y.Rule.prototype.getNLSSummary = function (rule_type) {

  var RULE = OpenAjax.a11y.RULE;
  
  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var str = nls_rules.rules[this.rule_id]['SUMMARY'];
  
  var message;
  
  var vstr;

  if (str) {
  
    vstr = "%s";
  
    if (str.indexOf(vstr) >= 0) {
    
      if (rule_type) {
    
        switch (rule_type) {
        case RULE.REQUIRED:
          message = nls_rules.message_severities.MUST;
          break;

        case RULE.RECOMMENDATION:
          message = nls_rules.message_severities.SHOULD;
          break;

        default:
          message = "unkown";
          break; 
        }
      }
      // If no rule type is defined assume "must"
      else {
        message = nls_rules.message_severities.MUST;      
      }
      
      str = str.replace(vstr, message);  
    }  

    return OpenAjax.a11y.util.transformElementMarkup(str);
  }
      
  return "Summary not found for rule: " + this.rule_id;
  
};

/**
 * @method getNLSPurpose
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing the purposes of the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSPurpose = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['PURPOSE'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      new_list.push(OpenAjax.a11y.util.transformElementMarkup(list[i]));
    
    } // end for
  
    return new_list;
  }  
  
  return [];
  
};

/**
 * @method getNLSTarget
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized string describing the elements or page feature the rule is evaluting
 */
OpenAjax.a11y.Rule.prototype.getNLSTargetResourcesDescription = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var target = nls_rules.rules[this.rule_id]['TARGET_RESOURCES_DESC'];
  
  if (target) return OpenAjax.a11y.util.transformElementMarkup(target);
  
  return "** Target resource description not defined";
  
};

/**
 * @method getTargetResources
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing target resources of the rule
 */
OpenAjax.a11y.Rule.prototype.getTargetResources = function () {
  
  if (this.target_resources) return this.target_resources;
  
  return [];
  
};

/**
 * @method getNLSTechniques
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array strings representing techniques to implement the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSTechniques = function () {

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['TECHNIQUES'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      new_list.push(OpenAjax.a11y.util.transformElementMarkup(list[i]));
    
    } // end for
  
    return new_list;
  }    
  
  return [];
  
};



/**
 * @method getInformationalLinks
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized array of objects with information links related to the rule
 */
OpenAjax.a11y.Rule.prototype.getNLSInformationalLinks = function () {

  function informationalLink(type, title, url) {
  
    var return_object = {};
  
    return_object.type  = type;
    return_object.title = OpenAjax.a11y.util.transformElementMarkup(title);
    return_object.url   = url;
    
    return return_object;
  }

  var nls_rules = this.nls[OpenAjax.a11y.locale];

  var list = nls_rules.rules[this.rule_id]['INFORMATIONAL_LINKS'];
  
  var new_list = [];

  if (list && list.length) { 
  
    for (var i = 0; i < list.length; i++) {

      var link = list[i];

      new_list.push(informationalLink(link.type, link.title, link.url));
    
    } // end for
  
    return new_list;
  }  
  
  return [];
  
};


/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns an localized node result message 
 *
 * @param {NodeResult}  node_result  - Node result to generate message
 * @param {String}      format       - Changes how element codes '@' in messages is transformed, values are "text" and "html"
 */
OpenAjax.a11y.Rule.prototype.getMessage = function (node_result) {

  var nls_rules = this.nls[OpenAjax.a11y.locale];
  
  var SEVERITY = OpenAjax.a11y.SEVERITY;
  
  var i;
  var message;
  
  // If no message id return the empty string
  if (node_result.message_id.length === 0) return "";
  
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

    case SEVERITY.WARNING:
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

  return OpenAjax.a11y.util.transformElementMarkup(str);
  
};

/**
 * @method getNLSRequirements
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns information about the WCAG 2.0 Success Criteria for the primary and secondary rule requirements
 *
 * @return  {Object}  Object representing the NLS information for primary and secondary requirments
 */

OpenAjax.a11y.Rule.prototype.getNLSRequirements = function () {

  var return_object = {};

  return_object.primary = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);
  return_object.related = [];
  
  for (var i = 0; i < this.wcag_related_ids.length; i++ ) {
    return_object.related.push(this.wcag20_nls.getNLSItemById(this.wcag_related_ids[i]));
  }

  return return_object;

};


/**
 * @method getWCAG20Level
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Success Level of the rule
 *
 * @return  {Number}  Number representing the level of the rule
 */

OpenAjax.a11y.Rule.prototype.getWCAG20Level = function () {

  var sc = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);

  return sc.level;

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
 * @param  {Object}    rule_item          - Object containing rule information 
 *
 * @return  {Boolean} Returns true if the rule was added successfully; false if there was an error
 */

OpenAjax.a11y.Rules.prototype.addRule = function (rule_item) {

  var errors = false;

  if (this.getRuleByRuleId(rule_item.rule_id)) {
    OpenAjax.a11y.console("  ** Duplicate Rule ID: " + rule_item.rule_id);
    errors = true;
  }  
  
  if (typeof rule_item.wcag_primary_id !== 'string') {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " primary wcag id is missing"); 
    errors = true;
  }  
  
  if (typeof rule_item.wcag_related_ids !== 'object') {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " related wcag ids is missing"); 
    errors = true;
  }  
  
  if (!this.validCacheDependency(rule_item.cache_dependency)) {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " has invalid or missing cache dependency property"); 
    errors = true;
  }  

  if (typeof rule_item.cache_properties !== 'object') {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " cache properties is missing or not an array"); 
    errors = true;
  }  
  
  if (typeof rule_item.language_dependency !== 'string') {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " language property is missing or not a string"); 
    errors = true;
  }  
  
  if (typeof rule_item.validate !== 'function') {
    OpenAjax.a11y.console("  ** Rule " + rule_item.rule_id + " validate property is missing or not a function"); 
    errors = true;
  }  

  if (errors) return false;
  
  var oaa_rule = new OpenAjax.a11y.Rule(this.nls, rule_item);

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
//    OpenAjax.a11y.console("     language: " + rule_item.language_dependency);
//    OpenAjax.a11y.console("     validate: " + typeof rule_item.validate);

    this.addRule(rule_item);

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



