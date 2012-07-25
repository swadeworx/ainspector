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
 * @method getSeverity
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a human readable text for the severity based on the current NLS setting
 * 
 * @return {Object} Returns a human readable information about the everity
 */

OpenAjax.a11y.NodeResult.prototype.getSeverity = function () {

  return OpenAjax.a11y.cache_nls.getSeverityNLS(this.node_result_value);
  
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
 * @method getRuleId
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the rule id
 * 
 * @return {String} Returns a NLS localized version of the rule id
 */

OpenAjax.a11y.NodeResult.prototype.getRuleId = function () {

  return this.rule_result.getRuleId();
   
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
  
  var prop_list = this.rule_result.rule.cache_properties;
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
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the type of rule in a ruleset
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset
 */

OpenAjax.a11y.NodeResult.prototype.getRuleType = function () {

  return this.rule_result.getRuleType();
   
};


/**
 * @method getSeverityLabel
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the severity label based on the current NLS setting
 * 
 * @return {String} Returns a NLS localized version of the severity
 */

OpenAjax.a11y.NodeResult.prototype.getSeverityLabel = function () {

  return OpenAjax.a11y.cache_nls.getSeverityNLS(this.node_result_value).label;
   
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
 * @method getRuleSummary
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns an NLS string representing a summary of the requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.NodeResult.prototype.getRuleSummary = function () {

  return this.rule_result.getRuleSummary();
  
};

/**
 * @method getMessage
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the message associated with the rule result
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.NodeResult.prototype.getMessage = function () {

  return this.rule_result.rule.getMessage(this);
  
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
 * @method toString
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Creates a text string representation of the node result object 
 *
 * @return {String} Returns a text string representation of the node result object
 */

OpenAjax.a11y.NodeResult.prototype.toString = function () {

  return this.rule_result.rule.getMessage(this);
  
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
 * @property  {String}   cache_id       - ID used to identify the rule result object (uses the same value as the associated rule cache id)
 * @property  {Number}   severity            - Constant representing severity of the evaluation result
 *
 * @property  {Number}   principle_index         - Index used to identify the WCAG 2.0 principle result object
 * @property  {Number}   guideline_index         - Index used to identify the WCAG 2.0 guideline result object
 * @property  {Number}   success_criteria_index  - Index used to identify the WCAG 2.0 success criteria result object
 *
 * @property  {Rule}     rule           - Reference to the assciated rule
 * @property  {Number}   rule_type      - The type of rule: required or recommended
 * @property  {Number}   rule_priority  - The importance of the rule relative to other rules in the requirement
 * @property  {Number}   rule_status    - The status of the rule in the ruleset
 * @property  {Boolean}  rule_enabled   - True if rule was evaluated, false if rule was disabled
 *
 * @property  {Array}  nodes_passed         - Array of all the node results that passed
 * @property  {Array}  nodes_violations     - Array of all the node results that resulted in violations
 * @property  {Array}  nodes_warnings       - Array of all the node results that resulted in warnings
 * @property  {Array}  nodes_manual_checks  - Array of all the node results that require manual evaluations
 * @property  {Array}  nodes_hidden         - Array of all the node results that are hidden
 * @property  {Array}  nodes_na             - Array of all the node results that not applicable
 */
 
OpenAjax.a11y.RuleResult = function (rule_mapping) {

  this.rule_mapping = rule_mapping;
  this.rule         = rule_mapping.rule;
  
  this.cache_id        = rule_mapping.rule.rule_id;
  
  this.page_result_value = OpenAjax.a11y.SEVERITY.NOT_APPLICABLE;
  
  this.node_results_passed  = [];
  this.node_results_violations     = [];
  this.node_results_warnings       = [];
  this.node_results_manual_checks  = [];
  this.node_results_hidden         = [];
  
  var index;
  var ids = rule_mapping.rule.wcag_primary_id;
  
  this.principle_index = -1;
  this.guideline_index = -1;
  this.success_criteria_index = -1;

  if (ids.length === 3) {
  
    index = parseInt(ids[0], 10);    
    if (typeof index === 'number') this.principle_index = index - 1; 

    index = parseInt(ids[1], 10);    
    if (typeof index === 'number') this.guideline_index = index - 1; 

    index = parseInt(ids[2], 10);    
    if (typeof index === 'number') this.success_criteria_index = index - 1; 
    
  }
  
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
 
//  OpenAjax.a11y.console("Add Result for " + this.rule.rule_id + ": " + severity + " " + cache_item.cache_id);

  switch (node_severity) {
 
  case SEVERITY.HIDDEN: 
    this.node_results_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.PASS:
    this.node_results_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    if (this.page_result_value == OpenAjax.a11y.SEVERITY.NOT_APPLICABLE) this.page_result_value = OpenAjax.a11y.SEVERITY.PASS;
    break;
  
  case SEVERITY.VIOLATION:
    this.node_results_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    this.page_result_value = OpenAjax.a11y.SEVERITY.VIOLATION;
    break;
  
  case SEVERITY.WARNING:
    this.node_results_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    this.page_result_value = OpenAjax.a11y.SEVERITY.WARNING;
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.node_results_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    if (!this.page_result_value == OpenAjax.a11y.SEVERITY.VIOLATION || 
        !this.page_result_value == OpenAjax.a11y.SEVERITY.WARNING) this.page_result_value == OpenAjax.a11y.SEVERITY.MANUAL_CHECK;
    break;

  default:
    break; 
  } // end switch 
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

OpenAjax.a11y.RuleResult.prototype.getRule = function () {

  return this.rule_mapping.rule;
   
};

/**
 * @method getRuleType
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a NLS text string representation of the type of rule (i.e. required, recommended, conditional) 
 *
 * @return {String} Returns a NLS text string representation of the rule type 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getRuleTypeNLS(this.rule_type);  

};


/**
 * @method getRuleDefinition
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns an NLS string representing the full rule requirement
 *
 * @return {String} Returns a NLS string 
 */

OpenAjax.a11y.RuleResult.prototype.getRuleDefinition = function () {

  return this.rule.getNLSDefinition(this.rule_type);
  
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

  return this.rule.getNLSSummary(this.rule_type);
  
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
 * @method toString
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a text string representation of the rule result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.RuleResult.prototype.toString = function () {

 var str = ""; 

 return str;
};


/* ---------------------------------------------------------------- */
/*                             EvaluationResult                     */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor EvaluationResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains an aggregation of rule results
 *
 * @property  {Number}  number_of_rule_results_all_nodes_pass         - Number of rule results where all the node results pass
 * @property  {Number}  number_of_rule_results_with_node_violations   - Number of rule results with at least one node result with a violation
 * @property  {Number}  number_of_rule_results_with_node_warning      - Number of rule results with at least one node result with a warning
 * @property  {Number}  number_of_rule_results_with_node_manual_check - Number of rule results with at least one node result with a manual check
 * @property  {Number}  number_of_rule_results_with_node_hidden       - Number of rule results with at least one node result with a hidden
 *  
 * @property  {Number}  number_of_nodes_pass           - Number of node results that pass 
 * @property  {Number}  number_of_nodes_violations     - Number of node results that are violations 
 * @property  {Number}  number_of_nodes_warnings       - Number of node results that are warnings 
 * @property  {Number}  number_of_nodes_manual_checks  - Number of node results that are manual checks 
 * @property  {Number}  number_of_nodes_hidden         - Number of node results that are hidden  
 */
 
OpenAjax.a11y.EvaluationResult = function () {

  this.rule_results = [];

  this.number_of_rule_results_all_nodes_pass          = 0;
  this.number_of_rule_results_with_node_violations    = 0;
  this.number_of_rule_results_with_node_warnings      = 0;
  this.number_of_rule_results_with_node_manual_checks = 0;
  this.number_of_rule_results_with_node_hidden        = 0;
  
  this.number_of_nodes_pass          = 0;
  this.number_of_nodes_violations    = 0;
  this.number_of_nodes_warnings      = 0;
  this.number_of_nodes_manual_checks = 0;
  this.number_of_nodes_hidden        = 0;

};

 /** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 */
 
OpenAjax.a11y.EvaluationResult.prototype.addRuleResult = function (rule_result) {

  this.rule_results.push(rule_result);
  
  var n_pass          = rule_result.node_results_passed.length;
  var n_violations    = rule_result.node_results_violations.length;
  var n_warnings      = rule_result.node_results_warnings.length;
  var n_manual_checks = rule_result.node_results_manual_checks.length;
  var n_hidden        = rule_result.node_results_hidden.length;

  if ((n_pass         > 0) && 
      (n_violations === 0) &&
      (n_warnings   === 0) &&
      (n_manual_checks === 0)) this.number_of_rule_results_all_nodes_pass += 1;
  
  if (n_violations    > 0) this.number_of_rule_results_with_node_violations    += 1;  
  if (n_warnings      > 0) this.number_of_rule_results_with_node_warnings      += 1;
  if (n_manual_checks > 0) this.number_of_rule_results_with_node_manual_checks += 1;
  if (n_hidden        > 0) this.number_of_rule_results_with_node_hidden        += 1;
  
  this.number_of_nodes_pass          += n_pass;
  this.number_of_nodes_violations    += n_violations;
  this.number_of_nodes_warnings      += n_warnings;
  this.number_of_nodes_manual_checks += n_manual_checks;
  this.number_of_nodes_hidden        += n_hidden;
  
};

 /** 
 * @method getRuleResultByCacheId
 *
 * @memberOf OpenAjax.a11y.EvaluationResult
 *
 * @desc Returns a result node (if found) using the cache_id of the result node
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return  {ResultNode | null }  Returns the reult node object if found, otherwise null
 *
 */
 
OpenAjax.a11y.EvaluationResult.prototype.getRuleResultByCacheId = function (cache_id) {

  var i;
  var rr;
  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;

  for (i = 0; i < rule_results_len; i++ ) {
    rr = rule_results[i];
    
    if (rr.cache_id === cache_id) return rr;
  
  }

  return null;
  
};