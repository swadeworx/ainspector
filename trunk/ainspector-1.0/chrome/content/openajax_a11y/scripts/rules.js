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
 * @param {Array}     resource_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @param {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @param {function}  validate           - function for evalutinf the rule
 *
 * @property {Object}    nls                - NLS information for rules 
 * @property {String}    rule_id            - Unique id of the rule 
 * @property {String}    rule_scope         - Defines the scope of the rule; DOM node, page or website 
 * @property {Object}    wcag_primary_id    - id of the primary WCAG 2.0 success criteria 
 * @property {Object}    wcag_related_ids   - id of related WCAG 2.0 success criteria
 * @property {String}    cache_dependency   - Which cache (i.e. element group) the rule will use 
 * @property {Array}     resource_properties   - What properties of a cache or dom element the rules uses in the evaluation
 * @property {Array}     target_objects     - The html objects the rule evaluates (NOTE: this is informative information)
 * @property {String}    language           - The lanaguage code or codes (space separated) if the rule is language specfic, default is empty string
 * @property {function}  validate           - function for evalutinf the rule
 */

OpenAjax.a11y.Rule = function (nls, rule_item) {

  this.nls                 = nls;
  this.rule_id             = rule_item.rule_id;   
  this.rule_scope          = rule_item.rule_scope;   
  this.rule_category       = rule_item.rule_category;   
  this.wcag_primary_id     = rule_item.wcag_primary_id;   
  this.wcag_related_ids    = rule_item.wcag_related_ids;
  this.last_updated        = rule_item.last_updated;
  this.cache_dependency    = rule_item.cache_dependency;
  this.resource_properties    = rule_item.resource_properties;
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
          message = nls_rules.message_severities.MUST + "/" + nls_rules.message_severities.SHOULD;
          break; 
        }
     }
     else {
       // If no rule type is defined assume "must"
        message = nls_rules.message_severities.MUST + "/" + nls_rules.message_severities.SHOULD;
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
    
      switch (rule_type) {
      
      case RULE.REQUIRED:
        message = nls_rules.message_severities.MUST;
        break;

      case RULE.RECOMMENDED:
        message = nls_rules.message_severities.SHOULD;
        break;

      default:
        message = "unknown";
        break; 
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
 * @desc Returns the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {Number}  Number representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.Rule.prototype.getWCAG20Level = function () {

  var sc = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);

  return sc.level;

};

/**
 * @method getNLSWCAG20Level
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the NLS String based on the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.Rule.prototype.getNLSWCAG20Level = function () {

  var sc = this.wcag20_nls.getNLSItemById(this.wcag_primary_id);

  return this.wcag20_nls.getNLSWCAG20Level(sc.level);

};


/**
 * @method getWCAG20PrincipleIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Principle index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result principle index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20PrincipleIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[0], 10) - 1);

};

/**
 * @method getWCAG20GuidelineIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Guideline index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result guideline index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20GuidelineIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[1], 10) - 1);

};

/**
 * @method getWCAG20SuccessCriteriaIndex
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Success Criteria index based on the primay id of the rule
 *       Used in aggregating rule results
 *
 * @return  {Number}  Number of the WCAG20Result sucess criteria index
 */

OpenAjax.a11y.Rule.prototype.getWCAG20SuccessCriteriaIndex = function () {

   var indexes = this.wcag_primary_id.split('.');

   return (parseInt(indexes[2], 10) - 1);

};

/**
 * @method getWCAG20SuccessCriterion
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns the WCAG 2.0 Success Criterion number
 *
 * @return  {String}  WCAG20Result sucess criterion
 */

OpenAjax.a11y.Rule.prototype.getWCAG20SuccessCriterion = function () {

   return this.wcag_primary_id;

};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Rule
 *
 * @desc Returns a JSON representation of the rule
 *
 * @param  {String}  prefix     - String of leading spaces for formatting JSON output (Optional) 
 * @param  {Number}  rule_type  - Include a rule type for adjusting definition and summary strings to ruleset 
 *                                requirements 
 *
 * @return  {String}  Returns a JSON representation of the rule
 */

OpenAjax.a11y.Rule.prototype.toJSON = function (prefix, rule_type) {

  function stringItem(property, value, last) {
    if (typeof value === 'string') json += prefix + "    \"" + property + "\" : \"" + OpenAjax.a11y.util.escapeForJSON(value)  + "\"";    
    else json += prefix + "    \"" + property + "\" : \"\"";
    
    if (last) json += "\n";
    else json += ",\n";
  }

  function numberItem(property, value, last) {
    json += prefix + "    \"" + property + "\" : " + value;    
    
    if (last) json += "\n";
    else json += ",\n";
  }

  function stringListItem(property, list, last) {
    json += prefix + "    \"" + property + "\" : [";
    var last_item = list.length - 1;    
    for (var i = 0; i < list.length; i++) {
      if (last_item === i) json += "\"" + OpenAjax.a11y.util.escapeForJSON(list[i]) + "\"";
      else json += "\"" + OpenAjax.a11y.util.escapeForJSON(list[i]) + "\",";
    }
    
    if (last) json += "]\n";
    else json += "],\n";
  }

  if (typeof prefix !== 'string') prefix = "";

  var json = "";

  var rule     = this;
  var nls_rule = this.nls[OpenAjax.a11y.locale].rules[this.rule_id];
 
  json += prefix + "  {\n";

  stringItem('rule_id', this.rule_id);
  numberItem('scope', this.rule_scope);  
  stringItem('wcag_primary', this.wcag_primary_id);  
  stringListItem('wcag_related', this.wcag_related_ids);  
  stringItem('last_updated', this.last_updated);
  stringListItem('target_resources', this.target_resources); 
  numberItem('rule_category', this.rule_category);
  stringItem('language_dependency', this.language_dependency);
  stringItem('cache_dependency', this.cache_dependency);
  stringListItem('resource_properties', this.resource_properties);
  stringItem('validate', this.validate.toString());
    
  stringItem('nls_rule_id', nls_rule['ID']);
  
  if (typeof rule_type === 'number') {
    stringItem('definition', this.getNLSDefinition(rule_type));
    stringItem('summary', this.getNLSSummary(rule_type));
  }
  else {
    stringItem('definition', nls_rule['DEFINITION']);
    stringItem('summary', nls_rule['SUMMARY']);
  }
  
  stringItem('target_resource_desc', nls_rule['TARGET_RESOURCES_DESC']);

  stringItem('purpose_1', nls_rule['PURPOSE'][0]);
  stringItem('purpose_2', nls_rule['PURPOSE'][1]);
  stringItem('purpose_3', nls_rule['PURPOSE'][2]);
  stringItem('purpose_4', nls_rule['PURPOSE'][3]);
    
  stringItem('technique_1', nls_rule['TECHNIQUES'][0]);
  stringItem('technique_1_url', null);
  stringItem('technique_2', nls_rule['TECHNIQUES'][1]);
  stringItem('technique_2_url', null);
  stringItem('technique_3', nls_rule['TECHNIQUES'][2]);
  stringItem('technique_3_url', null);
  stringItem('technique_4', nls_rule['TECHNIQUES'][3]); 
  stringItem('technique_4_url', null);
    
  stringItem('manual_check_1', null);
  stringItem('manual_check_1_url', null);
  stringItem('manual_check_2', null);
  stringItem('manual_check_2_url', null);
  stringItem('manual_check_3', null);
  stringItem('manual_check_3_url', null);
  stringItem('manual_check_4', null); 
  stringItem('manual_check_4_url', null);
  
  stringItem('rule_result_manual_checks_singular',     nls_rule['RULE_RESULT_MESSAGES']['MANUAL_CHECKS_SINGULAR']);    
  stringItem('rule_result_manual_checks_plural',       nls_rule['RULE_RESULT_MESSAGES']['MANUAL_CHECKS_PLURAL']);    
  stringItem('rule_result_all_pass_singular',          nls_rule['RULE_RESULT_MESSAGES']['ALL_PASS_SINGULAR']);      
  stringItem('rule_result_all_pass_plural',            nls_rule['RULE_RESULT_MESSAGES']['ALL_PASS_PLURAL']);    
  stringItem('rule_result_some_fail',                  nls_rule['RULE_RESULT_MESSAGES']['SOME_FAIL']);    
  stringItem('rule_result_corrective_action_singular', nls_rule['RULE_RESULT_MESSAGES']['CORRECTIVE_ACTION_SINGULAR']);    
  stringItem('rule_result_corrective_action_plural',   nls_rule['RULE_RESULT_MESSAGES']['CORRECTIVE_ACTION_PLURAL']);    
  stringItem('rule_result_all_fail_singular',          nls_rule['RULE_RESULT_MESSAGES']['ALL_FAIL_SINGULAR']);    
  stringItem('rule_result_all_fail_plural',            nls_rule['RULE_RESULT_MESSAGES']['ALL_FAIL_PLURAL']);    
  stringItem('rule_result_not_applicable',             nls_rule['RULE_RESULT_MESSAGES']['NOT_APPLICABLE']);    

  if (nls_rule['NODE_RESULT_MESSAGES']['PASS']) stringItem('node_result_pass_1', nls_rule['NODE_RESULT_MESSAGES']['PASS']);    
  else stringItem('node_result_pass_1', nls_rule['NODE_RESULT_MESSAGES']['PASS_1']);
  stringItem('node_result_pass_2', nls_rule['NODE_RESULT_MESSAGES']['PASS_2']);    
  stringItem('node_result_pass_3', nls_rule['NODE_RESULT_MESSAGES']['PASS_3']);    
  
  stringItem('node_result_hidden', nls_rule['NODE_RESULT_MESSAGES']['HIDDEN']);
  stringItem('node_result_presentation', nls_rule['NODE_RESULT_MESSAGES']['PRESENTATION']);
    
  stringItem('node_result_manual_check_1', nls_rule['NODE_RESULT_MESSAGES']['MANUAL_CHECK_1']);  
  stringItem('node_result_manual_check_2', nls_rule['NODE_RESULT_MESSAGES']['MANUAL_CHECK_2']);
  stringItem('node_result_manual_check_3', nls_rule['NODE_RESULT_MESSAGES']['MANUAL_CHECK_3']);
    
  stringItem('node_result_corrective_action_1', nls_rule['NODE_RESULT_MESSAGES']['CORRECTIVE_ACTION_1']);
  stringItem('node_result_corrective_action_2', nls_rule['NODE_RESULT_MESSAGES']['CORRECTIVE_ACTION_2']);
  stringItem('node_result_corrective_action_3', nls_rule['NODE_RESULT_MESSAGES']['CORRECTIVE_ACTION_3']);

  stringItem('node_result_other', nls_rule['NODE_RESULT_MESSAGES']['OTHER'], true);

  json += prefix + "  }";
 
  return json;

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

  if (typeof rule_item.rule_id !== 'string') {
    OpenAjax.a11y.logger.debug("  ** Rule ID is missing");
    errors = true;
  }  

  if (this.getRuleByRuleId(rule_item.rule_id)) {
    OpenAjax.a11y.logger.debug("  ** Duplicate Rule ID: " + rule_item.rule_id);
    errors = true;
  }  
  
  if (typeof rule_item.wcag_primary_id !== 'string') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " primary wcag id is missing"); 
    errors = true;
  }  
  
  if (typeof rule_item.wcag_related_ids !== 'object') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " related wcag ids is missing"); 
    errors = true;
  }  
  
  if (!this.validCacheDependency(rule_item.cache_dependency)) {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " has invalid or missing cache dependency property"); 
    errors = true;
  }  

  if (typeof rule_item.resource_properties !== 'object') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " resource properties is missing or not an array"); 
    errors = true;
  }  
  
  if (typeof rule_item.language_dependency !== 'string') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " language property is missing or not a string"); 
    errors = true;
  }  
  
  if (typeof rule_item.validate !== 'function') {
    OpenAjax.a11y.logger.debug("  ** Rule " + rule_item.rule_id + " validate property is missing or not a function"); 
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

//  OpenAjax.a11y.logger.debug(" ---- Adding OAA Rules ---- ");

  for (var i = 0; i < rule_array.length; i++) {

    rule_item = rule_array[i];
    
    OpenAjax.a11y.logger.debug("  RULE LOADING: " + rule_item.rule_id);
//    OpenAjax.a11y.logger.debug("  last update: " + rule_item.last_updated);
//    OpenAjax.a11y.logger.debug("   dependency: " + rule_item.cache_dependency);
//    OpenAjax.a11y.logger.debug("   properties: " + typeof rule_item.resource_properties);
//    OpenAjax.a11y.logger.debug("     language: " + rule_item.language_dependency);
//    OpenAjax.a11y.logger.debug("     validate: " + typeof rule_item.validate);

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

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Rules
 *
 * @desc Exports current rule information to a JSON format 
 *
 * @return {String}  JSON formatted string
 */

OpenAjax.a11y.Rules.prototype.toJSON = function (prefix) {

  if (typeof prefix !== 'string') prefix = "";

  var json = "";

  json += prefix + "[\n";

  var last = this.rules.length - 1;
  for (var i = 0; i < this.rules.length; i++ ) {
  
    var rule = this.rules[i];
  
    if (i === last) json += rule.toJSON(prefix)  + "\n";
    else json += rule.toJSON(prefix) + ",\n";
    
  }

  json += prefix + "]\n";

  return json;

};
  