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
/*                             NodeResult                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor NodeResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param  {ResultRule} rule_result             - reference to the rule result object
 * @param  {Number}     evaluation_result_value - Constant representing severity of the evaluation result
 * @param  {DOMElement} cache_item              - Object reference to cache item associated with the test
 * @param  {String}     message_id              -  String reference to the message string in the NLS file
 * @param  {Array}      message_arguements      -  Array  array of values used in the message string 
 *
 * @property  {String}     cache_id            - Id identify the node result (uses the same value of the associated cache element id)
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     evaluation_result_value - Constant representing severity of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          -  String reference to the message string in the NLS file
 * @property  {Array}      message_arguements  -  Array  array of values used in the message string  
 */

OpenAjax.a11y.NodeResult = function (rule_result, evaluation_result_value, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  
  this.node_result_value = evaluation_result_value;
  this.cache_item        = cache_item;
  this.message_id        = message_id;
  this.message_arguments = message_arguments;
  this.cache_id          = rule_result.cache_id;
  this.is_scope_page     = rule_result.isScopePage();
  this.is_scope_element  = rule_result.isScopeElement();

};

/**
 * @method getPropertyValue
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the value of a property in the cache 
 *
 * @param  {String}  property  -  Property of the cache element object 
 *
 * @return {value | null} Returns a value if property is defined, null if not
 */

OpenAjax.a11y.NodeResult.prototype.getPropertyValue = function (property) {

  var value;

  value = this.cache_item[property];  
  if (typeof value == 'string' || typeof value == 'boolean' || typeof value == 'number') return value;
  
  value = this.cache_item.dom_element[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.computed_style[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.events[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  
   
   
  return null;
  
};

/**
 * @method getSeverityResult
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the severity of the node result 
 *
 * @return {Number} Number representing the node severity
 */

OpenAjax.a11y.NodeResult.prototype.getSeverityResult = function () {

  return this.node_result_value;
  
};

/**
 * @method getRulecategory
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the numeric value for the rule category
 * 
 * @return {Number}  Numeric value of the rule category
 */

OpenAjax.a11y.NodeResult.prototype.getRuleCategory = function () {

  return this.rule_result.getRuleCategory();
  
};


/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.NodeResult.prototype.getRule = function () {

  return this.rule_result.getRule();
   
};

/**
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the id of the rule associated with this result
 * 
 * @return {String} String representing the rule id
 */

OpenAjax.a11y.NodeResult.prototype.getRuleId = function () {

  return this.rule_result.getRuleId();
   
};

/**
 * @method getWCAG20PrimaryId
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the id of the wcag 2.0 primary id
 * 
 * @return {String} String representing the wcag 2.0 primary id
 */

OpenAjax.a11y.NodeResult.prototype.getWCAG20PrimaryId = function () {

  return this.rule_result.getWCAG20PrimaryId();
   
};

/**
 * @method getNLSRuleId
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the nls id of the rule associated with this result
 * 
 * @return {String} String representing the nls rule id
 */

OpenAjax.a11y.NodeResult.prototype.getNLSRuleId = function () {

  return this.rule_result.getNLSRuleId();
   
};

/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing a definition of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleDefinition = function () {

  return this.rule_result.getRuleDefinition();
  
};


/**
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing a summary of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleSummary = function () {

  return this.rule_result.getRuleSummary();
  
};

/**
 * @method getNLSWCAG20Level
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the NLS String based on the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.NodeResult.prototype.getNLSWCAG20Level = function () {

  return this.rule_result.getNLSWCAG20Level();

};

/**
 * @method getWCAG20SuccessCriterion
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the WCAG 2.0 Success Criterion number
 *
 * @return  {String}  WCAG20Result sucess criterion
 */

OpenAjax.a11y.NodeResult.prototype.getWCAG20SuccessCriterion = function () {

  return this.rule_result.getWCAG20SuccessCriterion();

};

/**
 * @method getRuleProperties
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an array of object containing NLS property names and values associated with the rule
 * 
 * @return {Array} Array of objects 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;

  var nls_prop_list = [];
  
  var prop_list = this.rule_result.rule.resource_properties;
  var value;
  var prop_item;
  
  for (var i = 0; i < prop_list.length; i++) {

    prop_item = prop_list[i];

    var nls_item = new Object();

    value    = this.cache_item.getCachePropertyValue(prop_item);

    nls_item = cache_nls.getNLSLabelAndValue(prop_item, value);

    nls_prop_list.push(nls_item);
    
  }  
  
  return nls_prop_list;
   
};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the type of rule in a ruleset
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset (i.e. recommended or required)
 */

OpenAjax.a11y.NodeResult.prototype.getNLSRuleType = function () {

  return this.rule_result.getNLSRuleType();
   
};

/**
 * @method isScopePage
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {Boolean} True if the rule has a scope of page, otherwise false
 */
 
OpenAjax.a11y.NodeResult.prototype.isScopePage = function () {

  return this.is_scope_page;
  
};

/**
 * @method isScopeElement
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {Boolean} True if the rule has a scope of element, otherwise false
 */
 
OpenAjax.a11y.NodeResult.prototype.isScopeElement = function () {

  return this.is_scope_element;
  
};


/**
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a the type of rule in a ruleset (i.e. recommended or required)
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset (i.e. recommended or required)
 */

OpenAjax.a11y.NodeResult.prototype.getRuleType = function () {

  return this.rule_result.getRuleType();
   
};

/**
 * @method getNLSSeverity
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a human readable text for the severity based on the current NLS setting
 * 
 * @return {Object} Returns a human readable information about the everity
 */

OpenAjax.a11y.NodeResult.prototype.getNLSSeverity = function () {

  return OpenAjax.a11y.cache_nls.getNLSSeverity(this.node_result_value);
  
};

/**
 * @method getNLSSeverityLabel
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the severity label based on the current NLS setting
 * 
 * @return {String} Returns a NLS localized version of the severity
 */

OpenAjax.a11y.NodeResult.prototype.getNLSSeverityLabel = function () {

  return OpenAjax.a11y.cache_nls.getNLSSeverity(this.node_result_value).label;
   
};

/**
 * @method getSeverityStyle
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a string to be used with CSS styling of severity text
 * 
 * @return {String} Returns a string that can be used for CSS styling of the severity 
 */

OpenAjax.a11y.NodeResult.prototype.getSeverityStyle = function () {
  
  return OpenAjax.a11y.SEVERITY_STYLE[this.node_result_value];
  
};

/**
 * @method getXPath
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the xpath of the associated element
 * 
 * @return {String} information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.getXPath = function () {
  
  var xpath = this.cache_item.xpath;
  
  if (!xpath) xpath = this.cache_item.dom_element.xpath;
  
  return xpath;
 
};

/**
 * @method getDefintion
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing the full requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleDefinition = function () {

  return this.rule_result.getRuleDefinition();
  
};

/**
 * @method getDOMElement
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the dom element object
 *
 * @return {String} Returns a dom element associated with the cache item
 */

OpenAjax.a11y.NodeResult.prototype.getDOMElement = function () {

  if (this.cache_item.dom_element) 
    return this.cache_item.dom_element;
  else
    return this.cache_item;      
  
};

 /**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an localized node result message 
 *
 * @return {String} String with node result message
 */
OpenAjax.a11y.NodeResult.prototype.getMessage = function () {

  var nls_rules = OpenAjax.a11y.all_rules.nls[OpenAjax.a11y.locale];
  
  var SEVERITY = OpenAjax.a11y.SEVERITY;
  
  var message;
  
  // If no message id return the empty string
  if (this.message_id.length === 0) return "";
  
  var rule_id = this.getRuleId();
  
  var str = nls_rules.rules[rule_id]['NODE_RESULT_MESSAGES'][this.message_id];
  
  if (!str) return nls_rules.missing_message + this.message_id;
    
//    OpenAjax.a11y.logger.debug("Rule: " + this.rule_id + " Message: " + str);

  var vstr; // i.e. %1, %2 ....
  var message_arguments_len = this.message_arguments.length;

  // check to see if message has severity dependence
  
  vstr = "%s";
  
  if (str.indexOf(vstr) >= 0) {
    
    switch (this.severity) {
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
  
  for (var i = 0; i < message_arguments_len; i++) { 
    vstr = "%" + (i+1); 
    message = this.message_arguments[i];
    
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
 * @method toString
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates a text string representation of the node result object 
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.NodeResult.prototype.toString = function () {

  return this.getMessage();
  
};

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.toXML = function () {

  var xml = "";
  return xml;
};

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates JSON object descibing the properties of the node result
 *
 * @param {String} prefix  -  A prefix string typically spaces
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.toJSON = function (prefix) {

  var next_prefix = "";
  
  if (typeof prefix !== 'string' || prefix.length === 0) prefix = "";
  else next_prefix = prefix + "    ";

  var severity = this.getNLSSeverity();
  
  var result_props = this.getRuleProperties();
  
  var json = "";

  json += prefix + "{ \"result_label\"    : \"" + severity.label + "\",";
  json += prefix + "  \"result_style\"    : \"" + this.getSeverityStyle() + "\",";
  json += prefix + "  \"result_abbrev\"   : \"" + severity.abbrev + "\",";
  json += prefix + "  \"rule_id\"         : \"" + this.getRuleId() + "\",";
  json += prefix + "  \"nls_rule_id\"     : \"" + this.getNLSRuleId() + "\",";
  json += prefix + "  \"rule_type\"       : "   + this.getRuleType() + ",";
  json += prefix + "  \"nls_rule_type\"   : \"" + this.getNLSRuleType() + "\",";
  json += prefix + "  \"wcag_primary_id\" : \""  + this.getWCAG20PrimaryId() + "\",";
  json += prefix + "  \"wcag_level\"      : \""  + this.getNLSWCAG20Level() + "\",";
  json += prefix + "  \"message\"         : \"" + OpenAjax.a11y.util.escapeForJSON(this.getMessage()) + "\",";

  var max = result_props.length;
  var last = max - 1;
  
  if (max > 0) {
    json += prefix + "  \"properties\" : [";
    for (var i = 0; i < max; i++) {
      var result_prop = result_props[i];
      if (i === last) json += next_prefix + "{ \"label\" : \"" + result_prop.label + "\", \"value\" : \"" + OpenAjax.a11y.util.escapeForJSON(result_prop.value) + "\"}";
      else json += next_prefix + "{ \"label\" : \"" + result_prop.label + "\", \"value\" : \"" + OpenAjax.a11y.util.escapeForJSON(result_prop.value) + "\"},";
    }
    json += prefix + "  ]";
  }
  else {
    json += prefix + "  \"properties\" : []";
  }
    
  json += prefix + "}";
  
  return json;
};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.NodeResult.prototype.toHTML = function (ruleset_nls) {
  
  var html = "";
 
  return html;
};


/* ---------------------------------------------------------------- */
/*                             RuleResult                           */
/* ---------------------------------------------------------------- */
 
 /** 
 * @constructor RuleResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a ruleset rule
 *
 * @param  {WCAG20RuleMapping}  rule_mapping  - WCAG20RuleMapping object
 *
 * @property  {String}   cache_id       - id used to identify the rule result object (uses the same value as the associated rule cache id)
 *
 * @property  {WCAG20RuleMapping}  rule_mapping    - Reference to the assciated rule
 * @property  {Rule}               rule            - Reference to the assciated rule
 * @property  {Boolean}            rule_evaluated  - True if rule was evaluated, false if rule was disabled or 
 *                                                   not included becase of the WCAG 2.0 level being evaluated
 * 
 * @property  {Number}  implementation_level       - Number constant associated with an implementation level
 * @property  {Number}  implementation_level_sort  - A sorting constant based on both implementation level and manual checks 
 * @property  {Number}  implementation_percentage  - Percentage implementation of automated checks
 * @property  {Number}  manual_check_count         - Number of elements that need a manual check
 *
 * @property  {String}  message          -  String message of rule implementation and correction 
 *
 * @property  {Array}  nodes_passed         - Array of all the node results that passed
 * @property  {Array}  nodes_violations     - Array of all the node results that resulted in violations
 * @property  {Array}  nodes_warnings       - Array of all the node results that resulted in warnings
 * @property  {Array}  nodes_manual_checks  - Array of all the node results that require manual evaluations
 * @property  {Array}  nodes_hidden         - Array of all the node results that are hidden
 *
 * @property  {Number}  passed_count        - Number of nodes that passed the rule  
 * @property  {Number}  violations_count    - Number of nodes that failed the rule as a violation
 * @property  {Number}  warning_count       - Number of nodes that failed the rule as a warning  
 * @property  {Number}  manual_checks_count - Number of nodes that rerquire a manual check   
 * @property  {Number}  total_count         - Total number of node results that passed, failed or required a manual check
 */
 
OpenAjax.a11y.RuleResult = function (rule_mapping) {

  this.rule_mapping = rule_mapping;
  this.rule         = rule_mapping.rule;
  
  this.cache_id        = rule_mapping.rule.rule_id;
  
  this.implementation_level      = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_level_sort = OpenAjax.a11y.IMPLEMENTATION_LEVEL.UNDEFINED;
  this.implementation_percentage = 0;

  this.message = '';

  this.node_results_passed         = [];
  this.node_results_violations     = [];
  this.node_results_warnings       = [];
  this.node_results_manual_checks  = [];
  this.node_results_hidden         = [];
  
  this.passed_count       = 0;  
  this.violations_count   = 0;
  this.warnings_count      = 0;  
  this.manual_checks_count = 0;    
  this.total_count        = 0;
  
  this.hidden_count       = 0;    
    
  this.rule_evaluated = false;

};

/**
 * @method addResult
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Adds a result of an evaluation of rule on a node in the dom  
 *
 * @param  {Number}  test_result         - Number representing if a node passed, failed, manual check or other test result
 * @param  {Object}  cache_item          - Reference to cache item associated with the test
 * @param  {String}  message_id          - Reference to the message string in the NLS file
 * @param  {Array}   message_arguements  - Array of values used in the message string 
 */

OpenAjax.a11y.RuleResult.prototype.addResult = function (test_result, cache_item, message_id, message_arguments) {

  var SEVERITY    = OpenAjax.a11y.SEVERITY;
  var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
  var RULE        = OpenAjax.a11y.RULE;

  if (!cache_item) return;

  var dom_element_item = null; 
 
  if (cache_item.dom_element) {
    dom_element_item = cache_item.dom_element;  
  } 
  else {
    dom_element_item = cache_item;  
  }
  
  dom_element_item.has_rule_results = true;
  
  var node_severity = SEVERITY.UNKNOWN;
  
  switch (test_result) {
  
  case TEST_RESULT.PASS:
    node_severity = SEVERITY.PASS;
    break;
    
  case TEST_RESULT.FAIL:
    if (this.rule_mapping.type === RULE.REQUIRED) {
      node_severity = SEVERITY.VIOLATION;
    }
    else {
      node_severity = SEVERITY.WARNING;
    }
    break;
  
  case TEST_RESULT.MANUAL_CHECK:
    node_severity = SEVERITY.MANUAL_CHECK;
    break;
  
  case TEST_RESULT.HIDDEN:
    node_severity = SEVERITY.HIDDEN;
    break;
    
  default:
    break;  
  }   
  
  var node_result = new OpenAjax.a11y.NodeResult(this, node_severity, cache_item, message_id, message_arguments);

//  OpenAjax.a11y.logger.debug("  ADD RESULT - text result: " + test_result + " cache item: " + cache_item + "  msg ID: " + message_id + " args: " + message_arguments);
//  OpenAjax.a11y.logger.debug("  Node Result Info: " + this.rule.rule_id + " : " + node_severity +  " (" + test_result + ")  " + cache_item + " Node result: " + node_result);

  switch (node_severity) {
 
  case SEVERITY.HIDDEN: 
    this.node_results_hidden.push(node_result);
    if (dom_element_item)  dom_element_item.rules_hidden.push(node_result);
    this.hidden_count += 1;
    break;

  case SEVERITY.PASS:
    this.node_results_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    this.passed_count += 1;
    this.total_count  += 1;
    break;
  
  case SEVERITY.VIOLATION:
    this.node_results_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    this.violations_count += 1;
    this.total_count      += 1;  
    break;
  
  case SEVERITY.WARNING:
    this.node_results_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    this.warnings_count += 1;
    this.total_count    += 1;  
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.node_results_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    this.manual_checks_count += 1;
    this.total_count         += 1;  
    break;

  default:
    break; 
  } // end switch 
};

/**
 * @method setEvaluationLevelToDisabled
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Sets evaluation level of the rule result to disabled 
 *       (i.e. rule was not evaluated due to user configuration settings)
 */

OpenAjax.a11y.RuleResult.prototype.setEvaluationLevelToDisabled = function () {

  this.implementation_level      = OpenAjax.a11y.IMPLEMENTATION_LEVEL.RULE_DISABLED;
  this.implementation_level_sort = 0;
  this.manual_checks_count = 0;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Rule: " + this.rule.rule_id + " Level: " + this.implementation_level + " Level sort: " + this.implementation_level_sort);

};  

/**
 * @method calculateImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Caclulates the level of implementation of the rule  
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResult.prototype.calculateImplementationLevel = function () {

  if (this.implementation_level === OpenAjax.a11y.IMPLEMENTATION_LEVEL.RULE_DISABLED) { 
    this.implementation_level_sort = 0;
    this.manual_checks_count = 0;
    return this.implementation_level;
  }  

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  var level_sort = 0;
  
  if (this.total_count) {
  
    if (this.total_count !== this.manual_checks_count) {
    
      var total = this.total_count - this.manual_checks_count;

      var percentage = Math.round((this.passed_count * 100) / total);

      this.implementation_percentage = percentage;

      level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED; 
      
      if (percentage === 100) level = IMPLEMENTATION_LEVEL.COMPLETE;
      else if (percentage >= 95) level = IMPLEMENTATION_LEVEL.ALMOST_COMPLETE;
        else if (percentage >= 50) level = IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION;
        
      if (this.manual_checks_count > 0) {
        level += IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
        level_sort =  1.5 + Math.round((100 - percentage));
      } 
      else {
        level_sort =  1 + Math.round((100 - percentage));    
      }
      
      this.implementation_percentage = percentage;

    }  
    else {
      level      = IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      level_sort = 1.5 ;       
    }
  }
  else {
    level      = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
    level_sort = 0.5;    
  }
  
  this.implementation_level      = level;
  this.implementation_level_sort = level_sort;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Rule: " + this.rule.rule_id + " Level: " + this.implementation_level + " Level sort: " + this.implementation_level_sort);


  return this.implementation_level;

};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the level of implementation of the rule result
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResult.prototype.getImplementationLevel = function () {

  return this.calculateImplementationLevel();
  
};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the NLS string values assoacited with the level of implementation of the rule  
 *
 * @return {Object} Returns an object with four properties: 'percentage_of_rules_that_pass', 'manual_check_count', 'label', 'abbrev', 'description' and 'style'
 *                  All properties are String objects
 */

OpenAjax.a11y.RuleResult.prototype.getNLSImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;

  var level = this.getImplementationLevel();

  var nls_implementation_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
  
  if (level !== IMPLEMENTATION_LEVEL.NOT_APPLICABLE && 
      level !== IMPLEMENTATION_LEVEL.RULE_DISABLED) {
    
    if (level !== IMPLEMENTATION_LEVEL.MANUAL_CHECKS) nls_implementation_level.label = this.implementation_percentage + "%";
    else nls_implementation_level = OpenAjax.a11y.cache_nls.getNLSImplementationLevel(IMPLEMENTATION_LEVEL.NOT_APPLICABLE);    
  }  
  
  nls_implementation_level.manual_check_count = this.manual_checks_count;
  
  return nls_implementation_level;
 
};


/**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a rule object associated with this result
 * 
 * @return {Rule} Returns a rule object
 */

OpenAjax.a11y.RuleResult.prototype.getRule = function () {

  return this.rule_mapping.rule;
   
};

/**
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the id of the rule associated with this rule result
 * 
 * @return {String} String representing the rule id
 */

OpenAjax.a11y.RuleResult.prototype.getRuleId = function () {

  return this.rule_mapping.rule.rule_id;
   
};

/**
 * @method getNLSRuleId
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the nls id of the rule associated with this rule result
 * 
 * @return {String} String representing the nls rule id
 */

OpenAjax.a11y.RuleResult.prototype.getNLSRuleId = function () {

  return this.rule_mapping.rule.getNLSRuleId();
   
};

/**
 * @method getWCAG20PrimaryId
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the id of the wcag 2.0 primary id of the rule
 * 
 * @return {String} String representing the wcag 2.0 primary id
 */

OpenAjax.a11y.RuleResult.prototype.getWCAG20PrimaryId = function () {

  return this.rule_mapping.rule.wcag_primary_id;
   
};

/**
 * @method getRuleScope
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the scope of a rule (i.e. Page or Element)
 * 
 * @return {Number} Number representing the rule scope
 */

OpenAjax.a11y.RuleResult.prototype.getRuleScope = function () {

  return this.rule_mapping.rule.rule_scope;
   
};

/**
 * @method isScopePage
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {Boolean} True if the rule has a scope of page, otherwise false
 */
 
OpenAjax.a11y.RuleResult.prototype.isScopePage = function () {

  return this.rule_mapping.rule.isScopePage();
  
};

/**
 * @method getRulecategory
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the numeric value for the rule category
 * 
 * @return {Number}  Numeric value of the rule category
 */

OpenAjax.a11y.RuleResult.prototype.getRuleCategory = function () {

  return this.rule.rule_category;
  
};

/**
 * @method isScopeElement
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an localized string of the rule scope (i.e. element or page)
 *
 * @return {Boolean} True if the rule has a scope of element, otherwise false
 */
 
OpenAjax.a11y.RuleResult.prototype.isScopeElement = function () {

  return this.rule_mapping.rule.isScopeElement();
  
};



/**
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the type of rule (i.e. required, recommended) 
 *
 * @return {Number} Returns a numerical representation of the rule type 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleType = function () {
 
  return this.rule_mapping.type;  

};

/**
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a NLS text string representation of the type of rule (i.e. required, recommended) 
 *
 * @return {String} Returns a NLS text string representation of the rule type 
 */

OpenAjax.a11y.RuleResult.prototype.getNLSRuleType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSRuleType(this.rule_mapping.type);  

};

/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an NLS string representing the full description of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleDefinition = function () {

  return this.rule.getNLSDefinition(this.rule_mapping.type);
  
};

/**
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an NLS string representing a summary of the rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleSummary = function () {

  return this.rule.getNLSSummary(this.rule_mapping.type);
  
};

/**
 * @method getNLSWCAG20Level
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the NLS String based on the WCAG 2.0 Success Level of the rule based on the primary id of the rule
 *
 * @return  {String}  String representing the WCAG 2.0 success criterion level of the rule
 */

OpenAjax.a11y.RuleResult.prototype.getNLSWCAG20Level = function () {

  return this.rule.getNLSWCAG20Level();

};

/**
 * @method getWCAG20SuccessCriterion
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the WCAG 2.0 Success Criterion number
 *
 * @return  {String}  WCAG20Result sucess criterion
 */

OpenAjax.a11y.RuleResult.prototype.getWCAG20SuccessCriterion = function () {

  return this.rule.getWCAG20SuccessCriterion();

};

/**
 * @method getResultNodes
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.RuleResult.prototype.getResultNodes = function () {
 
  function addResultNodes(items) {
    var i;
    var len = items.length;
    
    for (i = 0; i < len; i++) {
      result_nodes.push(items[i]);
    }    
  }

  var result_nodes = [];
  
  addResultNodes(this.node_results_passed);
  addResultNodes(this.node_results_violations);
  addResultNodes(this.node_results_warnings);
  addResultNodes(this.node_results_manual_checks);
  addResultNodes(this.node_results_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getResultNodeByCacheId
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns a node result object with the cache id 
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return {ResultNode | null} Returns a result node if cache id is found, otherwise null
 */

OpenAjax.a11y.RuleResult.prototype.getResultNodeByCacheId = function (cache_id) {
 
  function checkResultNodeList(items) {
    var len = items.length;
    var item;
    
    for (var i = 0; i < len; i++ ) {
      item = items[i];
      if (item.cache_id == cache_id) return item;
    }
    
    return null;
    
  }

  var node_result = null;
  
  node_result = checkResultNodeList(this.node_results_passed);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_violations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_warnings);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_manual_checks);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_recommendations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.node_results_hidden); 
  if (node_result) return node_result;
    
  return null;
  
};

 /**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an localized node result message 
 *
 * @return {String} String with node result message
 */
OpenAjax.a11y.RuleResult.prototype.getMessage = function () {

  function pageMessageFromNLS(rule_id, id) {

    var message = "";

    if (id !== 'SOME_FAIL' && id !== 'NOT_APPLICABLE') {
    
      id_singular = id + '_SINGULAR';
      id_plural   = id + '_PLURAL';

      message = nls_rules.rules[rule_id]['RULE_RESULT_MESSAGES'][id_singular];

      if (typeof message !== 'string' || (message.length === 0)) message = nls_rules.rules[rule_id]['RULE_RESULT_MESSAGES'][id_plural];

      if (typeof message !== 'string' || (message.length === 0)) message = nls_rules['DEFAULT_RULE_RESULT_MESSAGES'][id_singular];
      
    }
    else {
    
      message = nls_rules.rules[rule_id]['RULE_RESULT_MESSAGES'][id];

      if (typeof message !== 'string' || (message.length === 0)) message = nls_rules['DEFAULT_RULE_RESULT_MESSAGES'][id];

    }

    return message;
  }


  function elementMessageFromNLS(rule_id, count, id) {

    if (id !== 'SOME_FAIL' && id !== 'NOT_APPLICABLE') {
      if(count > 1) id = id + '_PLURAL';
      else id = id + '_SINGULAR';
    }

    var message = nls_rules.rules[rule_id]['RULE_RESULT_MESSAGES'][id];

    if (typeof message !== 'string' || (message.length === 0)) message = nls_rules['DEFAULT_RULE_RESULT_MESSAGES'][id];

    return message;
  }

  function getAndNLS() {

    var message = nls_rules['AND'];

    return message;
  }

  function getSoNLS() {

    var message = nls_rules['SO'];

    return message;
  }

  if (this.message && this.message.length > 0) return this.message;

  var nls_rules = OpenAjax.a11y.all_rules.nls[OpenAjax.a11y.locale];
  
  var RULE = OpenAjax.a11y.RULE;
  
  var failed_count = this.violations_count + this.warnings_count;
  var total_count = failed_count + this.passed_count;

  var rule_id = this.getRuleId();

  if (this.getRuleScope() === OpenAjax.a11y.RULE_SCOPE.ELEMENT) {
    // Element rule messaging
  
    if ((this.passed_count === 0) && (failed_count === 0) && (this.manual_checks_count  >  0)) { 
      this.message = elementMessageFromNLS(rule_id, this.manual_checks_count, 'MANUAL_CHECKS');
    }
    
    if ((this.passed_count  >  0) && (failed_count === 0) && (this.manual_checks_count === 0)) {
      this.message = elementMessageFromNLS(rule_id, this.passed_count, 'ALL_PASS');
    }
    
    if ((this.passed_count  >  0) && (failed_count === 0) && (this.manual_checks_count  >  0)) {
      this.message = elementMessageFromNLS(rule_id, this.passed_count, 'ALL_PASS');
      this.message += getAndNLS();
      this.message += elementMessageFromNLS(rule_id, this.manual_checks_count, 'MANUAL_CHECKS');
    }
    
    if ((this.passed_count  >  0) && (failed_count  >  0) && (this.manual_checks_count === 0)) {
      this.message = elementMessageFromNLS(rule_id, total_count, 'SOME_FAIL');
      this.message += getAndNLS();
      this.message += elementMessageFromNLS(rule_id, failed_count, 'CORRECTIVE_ACTION');
    }
    
    if ((this.passed_count  >  0) && (failed_count  >  0) && (this.manual_checks_count  >  0)) {
      this.message = elementMessageFromNLS(rule_id, total_count, 'SOME_FAIL');
      this.message += getSoNLS();
      this.message += elementMessageFromNLS(rule_id, failed_count, 'CORRECTIVE_ACTION');
      this.message += getAndNLS();
      this.message += elementMessageFromNLS(rule_id, this.manual_checks_count, 'MANUAL_CHECKS');
    }
    
    if ((this.passed_count === 0) && (failed_count  >  0) && (this.manual_checks_count === 0)) {
      this.message = elementMessageFromNLS(rule_id, total_count, 'ALL_FAIL');
      this.message += getSoNLS();
      this.message += elementMessageFromNLS(rule_id, failed_count, 'CORRECTIVE_ACTION');
    }
      
    if ((this.passed_count === 0) && (failed_count  >  0) && (this.manual_checks_count  >  0)) {
      this.message = elementMessageFromNLS(rule_id, total_count, 'ALL_FAIL');
      this.message += getSoNLS();
      this.message += elementMessageFromNLS(rule_id, failed_count, 'CORRECTIVE_ACTION');
      this.message += getAndNLS();
      this.message += elementMessageFromNLS(rule_id, this.manual_checks_count, 'MANUAL_CHECKS');
    }  
    
    if ((total_count === 0) && (this.manual_checks_count === 0)) {
      this.message = elementMessageFromNLS(rule_id, total_count, 'NOT_APPLICABLE');
    }
  }
  else {
    // Page Rule Messaging
    
    if ((this.passed_count === 0) && (failed_count === 0) && (this.manual_checks_count  >  0)) { 
      this.message = pageMessageFromNLS(rule_id, 'MANUAL_CHECKS');
    }
    
    if ((this.passed_count  >  0) && (failed_count === 0) && (this.manual_checks_count === 0)) {
      this.message = pageMessageFromNLS(rule_id, 'ALL_PASS');
    }
    
    if ((this.passed_count ===  0) && (failed_count > 0) && (this.manual_checks_count === 0)) {
      this.message = pageMessageFromNLS(rule_id, 'ALL_FAIL');
      this.message += getSoNLS();
      this.message += elementMessageFromNLS(rule_id, failed_count, 'CORRECTIVE_ACTION');
    }

    if ((total_count === 0) && (this.manual_checks_count === 0)) {
      this.message = pageMessageFromNLS(rule_id, total_count, 'NOT_APPLICABLE');
    }

  }
  
//  OpenAjax.a11y.logger.debug(" Passed: " + this.passed_count + " Violations: " + this.violations_count  + " Warnings: " + this.warnings_count + " Failed: " + failed_count  + " Manual Checks: " + this.manual_checks_count + " Message ID: " + this.message_id);
  
  if (!this.message || this.message.length === 0) return nls_rules.missing_message + this.message_id;
    
  var vstr; // i.e. %1, %2 ....

  // check to see if message has severity dependence
  
  var type;
  
  if (this.message.indexOf("%RULE_TYPE") >= 0) {
    
    switch (this.rule_mapping.type) {
    case RULE.REQUIRED:
      type = nls_rules.message_severities.MUST;
      break;

    case RULE.RECOMMENDED:
      type = nls_rules.message_severities.SHOULD;
      break;
      
    default:
      type = "";
      break; 
    }

    this.message = this.message.replaceAll("%RULE_TYPE", type);  
  }
  
  // Replace tokens with rule values

  this.message = this.message.replaceAll("%PER", this.implementation_percentage.toString());
  
  this.message = this.message.replaceAll("%N_F", failed_count.toString());
  
  this.message = this.message.replaceAll("%N_P", this.passed_count.toString());
  
  this.message = this.message.replaceAll("%N_T", total_count.toString() );
  
  this.message = this.message.replaceAll("%N_MC", this.manual_checks_count.toString());
  
  this.message = this.message.replaceAll("%N_H", this.hidden_count.toString());

  this.message = OpenAjax.a11y.util.transformElementMarkup(this.message);

  return this.message;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a text string representation of the rule result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.RuleResult.prototype.toString = function () {

 var str = this.getRuleDefinition() + ": " + this.getNLSImplementationLevel().label + " (" + this.implemenetation_level + ")"; 

 return str;
 
};

