/*
 * Copyright 2011 and 2012 OpenAjax Alliance
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
/*                             ResultNode                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ResultNode
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param  {ResultRule} rule_result         - reference to the rule result object
 * @param  {Number}     severity            - Constant representing severity of the evaluation result
 * @param  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @param  {String}     message_id          -  String reference to the message string in the NLS file
 * @param  {Array}      message_arguements  -  Array  array of values used in the message string 
 *
 * @property  {String}     cache_id            - Id identify the node result (uses the same value of the associated cache element id)
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     severity            - Constant representing severity of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          -  String reference to the message string in the NLS file
 * @property  {Array}      message_arguements  -  Array  array of values used in the message string  
 */

OpenAjax.a11y.ResultNode = function (rule_result, severity, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  this.severity    = severity;
  this.cache_item  = cache_item;
  this.message_id  = message_id;
  this.message_arguments = message_arguments;
  this.cache_id    = cache_item.cache_id;

};

/**
 * @method getPropertyValue
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the value of a property in the cache 
 *
 * @param  {String}  property  -  Property of the cache element object 
 *
 * @return {value | null} Returns a value if property is defined, null if not
 */

OpenAjax.a11y.ResultNode.prototype.getPropertyValue = function (property) {

  var value = this.cache_item[property];  
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;
  
  value = this.cache_item.dom_element[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.computed_style[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  value = this.cache_item.dom_element.events[property]; 
  if (value || typeof value == 'boolean' || typeof value == 'number') return value;  

  return null;
  
};


/**
 * @method getSeverity
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a human readable text for the severity based on the current NLS setting
 * 
 * @return {Object} Returns a human readable information about the everity
 */

OpenAjax.a11y.ResultNode.prototype.getSeverity = function () {
  
  return OpenAjax.a11y.cache_nls.getSeverityNLS(this.severity);
 
};

/**
 * @method getSeverityStyle
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns a string to be used with CSS styling of severity text
 * 
 * @return {String} Returns a string that can be used for CSS styling of the severity 
 */

OpenAjax.a11y.ResultNode.prototype.getSeverityStyle = function () {
  
  return OpenAjax.a11y.SEVERITY_STYLE[this.severity];
  
};

/**
 * @method getXPath
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the xpath of the associated element
 * 
 * @return {String} information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.getXPath = function () {
  
  var xpath = this.cache_item.xpath;
  
  if (!xpath) xpath = this.cache_item.dom_element.xpath;
  
  return xpath;
 
};



/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the message associated with the rule result
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.ResultNode.prototype.getMessage = function () {

  return this.rule_result.rule.getMessage(this);
  
};

/**
 * @method getDOMElement
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Returns the dom element object
 *
 * @return {String} Returns a dom element associated with the cache item
 */

OpenAjax.a11y.ResultNode.prototype.getDOMElement = function () {

  if (this.cache_item.dom_element) 
    return this.cache_item.dom_element;
  else
    return this.cache_item;      
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates a text string representation of the node result object 
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.ResultNode.prototype.toString = function () {

  return this.rule_result.rule.getMessage(this);
  
};

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.toXML = function () {

  var xml = "";
  return xml;
};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.ResultNode
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.ResultNode.prototype.toHTML = function (ruleset_nls) {
  
  var html = "";
 
  return html;
};


/* ---------------------------------------------------------------- */
/*                             ResultRule                           */
/* ---------------------------------------------------------------- */
 
 /** 
 * @constructor ResultRule
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a ruleset rule
 *
 * @param  {RulesetRule}  ruleset_rule  - ResultRule object
 *
 * @property  {String}   cache_id       - ID used to identify the rule result object (uses the same value as the associated rule cache id)
 *
 * @property  {Rule}     rule           - Reference to the assciated rule
 * @property  {Number}   rule_type      - The type of rule: required or recommended
 * @property  {Number}   rule_priority  - The importance of the rule relative to other rules in the requirement
 * @property  {Number}   rule_status    - The status of the rule in the ruleset
 * @property  {Boolean}  rule_enabled   - True if rule was evaluated, false if rule was disabled
 *
 * @property  {Object}   requirement    - Reference to the requirement associated with the rule 
 *
 * @property  {Array}  nodes_passed              - Array of all the node results that passed
 * @property  {Array}  nodes_failed              - Array of all the node results that failed
 * @property  {Array}  nodes_manual_checks  - Array of all the node results that require manual evaluations
 * @property  {Array}  nodes_informational       - Array of all the node results that are informational
 * @property  {Array}  nodes_hidden              - Array of all the node results that are hidden
 * @property  {Array}  nodes_warnings            - Array of all the node results that are warnings
 * @property  {Array}  nodes_na                  - Array of all the node results that not applicable
 */
 
OpenAjax.a11y.ResultRule = function (ruleset_rule, requirement) {

  this.rule            = ruleset_rule.rule;
  this.rule_type       = ruleset_rule.type; 
  this.rule_priority   = ruleset_rule.priority;
  this.rule_status     = ruleset_rule.status;
  this.rule_enabled    = ruleset_rule.enabled;
  
  this.cache_id        = ruleset_rule.rule.rule_id;
  this.requirement     = requirement;
 
  this.nodes_passed               = [];
  this.nodes_failed               = [];
  this.nodes_manual_checks   = [];
  this.nodes_informational        = [];
  this.nodes_hidden               = [];
  this.nodes_warnings             = [];
  this.nodes_na                   = [];
  
};

/**
 * @method addResult
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Adds a result of an evaluation of rule on a node in the dom  
 *
 * @param  {Number}  severity            - Number representing if a node passed, failed or other severity result
 * @param  {Object}  cache_item          - Reference to cache item associated with the test
 * @param  {String}  message_id          - Reference to the message string in the NLS file
 * @param  {Array}   message_arguements  - Array of values used in the message string 
 */

OpenAjax.a11y.ResultRule.prototype.addResult = function (severity, cache_item, message_id, message_arguments) {

  var SEVERITY = OpenAjax.a11y.SEVERITY;
  var RULE     = OpenAjax.a11y.RULE;
  
  var node_severity;

  var dom_element_item = null; 
 
  if (cache_item) {
    if (cache_item.dom_element) {
      dom_element_item = cache_item.dom_element;  
    } 
    else {
      dom_element_item = cache_item;  
    }
  }  
  
  node_severity = severity;
  
  if (severity === SEVERITY.FAIL) {
  
    if (this.rule_type === RULE.REQUIRED) {
      node_severity = SEVERITY.VIOLATION;
    }
    else {
      node_severity = SEVERITY.RECOMMENDATION;
    }  
  }
  
  var node_result = new OpenAjax.a11y.ResultNode(this, node_severity, cache_item, message_id, message_arguments);
 
//  OpenAjax.a11y.console("Add Result for " + this.rule.rule_id + ": " + severity + " " + cache_item.cache_id);

  switch (node_severity) {
 
  case SEVERITY.NA: 
    this.nodes_na.push(node_result);
    if (dom_element_item) dom_element_item.rules_na.push(node_result);
    break;

  case SEVERITY.HIDDEN: 
    this.nodes_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.PASS:
    this.nodes_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.nodes_failed.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.RECOMMENDATION:
    this.nodes_failed.push(node_result);
    if (dom_element_item) dom_element_item.rules_recommendations.push(node_result);
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.nodes_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    break;

  case SEVERITY.INFORMATIONAL:
    this.nodes_informational.push(node_result);
    if (dom_element_item) dom_element_item.rules_informational.push(node_result);
    break;

  default:
    break; 
  } // end switch 
};

/**
 * @method getRequirement
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns a NLS localized title for the rquirement
 *
 * @return {Array} Returns string with a localized version of the requirement
 */

OpenAjax.a11y.ResultRule.prototype.getRequirement = function () {
 return this.requirement.getRequirement();
};

/**
 * @method getResultNodes
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.ResultRule.prototype.getResultNodes = function () {
 
  function addResultNodes(items) {
    var i;
    var len = items.length;
    
    for (i = 0; i < len; i++) {
      result_nodes.push(items[i]);
    }
    
  }

  var result_nodes = [];
  
  addResultNodes(this.nodes_violations);
  addResultNodes(this.nodes_manual_checks);
  addResultNodes(this.nodes_recommendations);
  addResultNodes(this.nodes_warnings);
  addResultNodes(this.nodes_passed);
  addResultNodes(this.nodes_informational);
  addResultNodes(this.nodes_hidden); 
  
  return result_nodes;
  
};

/**
 * @method getResultNodeByCacheId
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Returns a node result object with the cache id 
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return {ResultNode | null} Returns a result node if cache id is found, otherwise null
 */

OpenAjax.a11y.ResultRule.prototype.getResultNodeByCacheId = function (cache_id) {
 
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
  
  node_result = checkResultNodeList(this.nodes_violations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_manual_checks);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_recommendations);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_warnings);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_passed);
  if (node_result) return node_result;
  
  node_result = checkResultNodeList(this.nodes_informational); 
  if (node_result) return node_result;

  node_result = checkResultNodeList(this.nodes_hidden); 
  if (node_result) return node_result;
    
  node_result = checkResultNodeList(this.nodes_na); 
  if (node_result) return node_result;
    

  return null;
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.ResultRule
 *
 * @desc Creates a text string representation of the rule result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.ResultRule.prototype.toString = function () {

 var str = ""; 

 return str;
};


/* ---------------------------------------------------------------- */
/*                             ResultRuleSummary                    */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor ResultRuleSummary
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @property  {Number}  total_number_of_required_rules          - Total number of required rules
 * @property  {Number}  required_rules_all_pass                 - Number of rules where all the nodes pass
 * @property  {Number}  required_rules_with_fail                - Number of rules with at least one node failing
 * @property  {Number}  required_rules_with_manual_checks  - Number of rules with at least one node requiring a manual check
 *  
 * @property  {Array}  required_rule_results                    - Rule result objects for required rules
 *
 * @property  {Number}  required_rules_nodes_that_pass          - Number of nodes that pass required rules
 * @property  {Number}  required_rules_nodes_that_fail          - Number of nodes that fail required rules
 * @property  {Number}  required_rules_nodes_manual_checks - Number of nodes that required manual checks of rules
 * @property  {Number}  required_rules_nodes_informational      
 * @property  {Number}  required_rules_nodes_hidden             
 * @property  {Number}  required_rules_nodes_na                 
 *
 * @property  {Number}  total_number_of_recommended_rules 
 *  
 * @property  {Number}  recommended_rules_all_pass                
 * @property  {Number}  recommended_rules_with_fail               
 * @property  {Number}  recommended_rules_with_manual_checks 
  
 * @property  {Array}  recommended_rule_results   

 * @property  {Number}  recommended_rules_nodes_that_pass          
 * @property  {Number}  recommended_rules_nodes_that_fail          
 * @property  {Number}  recommended_rules_nodes_manual_checks 
 * @property  {Number}  recommended_rules_nodes_informational      
 * @property  {Number}  recommended_rules_nodes_hidden             
 * @property  {Number}  recommended_rules_nodes_na                 
 */
 
OpenAjax.a11y.ResultRuleSummary = function () {

  this.total_number_of_required_rules = 0;
  
  this.required_rules_all_pass                = 0;
  this.required_rules_with_fail               = 0;
  this.required_rules_with_manual_checks = 0;
  
  this.required_rule_results     = [];

  this.required_rules_nodes_that_pass          = 0;
  this.required_rules_nodes_that_fail          = 0;
  this.required_rules_nodes_manual_checks      = 0;
  this.required_rules_nodes_informational      = 0;
  this.required_rules_nodes_hidden             = 0;
  this.required_rules_nodes_na                 = 0;

  this.total_number_of_recommended_rules = 0;
  
  this.recommended_rules_all_pass                = 0;
  this.recommended_rules_with_fail               = 0;
  this.recommended_rules_with_manual_checks = 0;
  this.recommended_rules_with_warnings           = 0;
  
  this.recommended_rule_results     = [];

  this.recommended_rules_nodes_that_pass          = 0;
  this.recommended_rules_nodes_that_fail          = 0;
  this.recommended_rules_nodes_manual_checks      = 0;
  this.recommended_rules_nodes_informational      = 0;
  this.recommended_rules_nodes_hidden             = 0;
  this.recommended_rules_nodes_na                 = 0;

};

 /** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.ResultRuleSummary
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 * @property  {Object}   success_criteria  - Reference to the associated ruleset success criteria
 * @property  {Array}    ruleset_rules     - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.ResultRuleSummary.prototype.addRuleResult = function (rule_result) {

  if (rule_result.rule_type == OpenAjax.a11y.RULE.REQUIRED) {

    this.required_rule_results.push(rule_result);
    
    this.total_number_of_required_rules++;

    if (rule_result.nodes_passed.length &&
        rule_result.nodes_failed.length === 0 &&
        rule_result.nodes_manual_checks.length === 0) 
      this.required_rules_all_pass ++;

    if (rule_result.nodes_failed.length) 
      this.required_rules_with_fail++;

    if (rule_result.nodes_manual_checks.length) 
      this.required_rules_with_manual_checks++;

    this.required_rules_nodes_that_pass          += rule_result.nodes_passed.length;
    this.required_rules_nodes_that_fail          += rule_result.nodes_failed.length;
    this.required_rules_nodes_manual_checks      += rule_result.nodes_manual_checks.length;
    this.required_rules_nodes_informational      += rule_result.nodes_informational.length;
    this.required_rules_nodes_hidden             += rule_result.nodes_hidden.length;
    this.required_rules_nodes_na                 += rule_result.nodes_na.length;

  } 
  else {
  
    this.recommended_rule_results.push(rule_result);
    
    this.total_number_of_recommended_rules++;

    if (rule_result.nodes_passed.length &&
        rule_result.nodes_failed.length === 0 &&
        rule_result.nodes_manual_checks.length === 0) 
      this.recommended_rules_all_pass ++;

    if (rule_result.nodes_failed.length) 
      this.recommended_rules_with_fail++;

    if (rule_result.nodes_manual_checks.length) 
      this.recommended_rules_with_manual_checks++;

    this.recommended_rules_nodes_that_pass          += rule_result.nodes_passed.length;
    this.recommended_rules_nodes_that_fail          += rule_result.nodes_failed.length;
    this.recommended_rules_nodes_manual_checks      += rule_result.nodes_manual_checks.length;
    this.recommended_rules_nodes_informational      += rule_result.nodes_informational.length;
    this.recommended_rules_nodes_hidden             += rule_result.nodes_hidden.length;
    this.recommended_rules_nodes_na                 += rule_result.nodes_na.length;
  
  }
  
};

 /** 
 * @method getResultRuleByCacheId
 *
 * @memberOf OpenAjax.a11y.ResultRuleSummary
 *
 * @desc Returns a result node (if found) using the cache_id of the result node
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return  {ResultNode | null }  Returns the reult node object if found, otherwise null
 *
 */
 
OpenAjax.a11y.ResultRuleSummary.prototype.getResultRuleByCacheId = function (cache_id) {

  var i;
  var rr;
  var rule_results     = this.required_rule_results;
  var rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }

  rule_results     = this.recommended_rule_results;
  rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }


  return null;
  
};