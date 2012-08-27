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
 * @method getRulecategory
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns the numeric value for the rule category
 * 
 * @return {Number}  Numeric value of the rule category
 */

OpenAjax.a11y.NodeResult.prototype.getRuleCategory = function () {

  return this.rule_result.rule.rule_category;
  
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

  return OpenAjax.a11y.cache_nls.getNLSSeverity(this.node_result_value);
  
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
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.NodeResult
 *
 * @desc Returns a NLS localized version of the type of rule in a ruleset
 * 
 * @return {String} Returns a NLS localized version of the type of rule in the ruleset
 */

OpenAjax.a11y.NodeResult.prototype.getNLSRuleType = function () {

  return this.rule_result.getRuleType();
   
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
 * @property  {WCAG20RuleMapping}  rule_mapping    - Reference to the assciated rule
 * @property  {Rule}               rule            - Reference to the assciated rule
 * @property  {Boolean}            rule_evaluated  - True if rule was evaluated, false if rule was disabled or 
 *                                                   not included becase of the WCAG 2.0 level being evaluated
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
  
  this.rule_evaluated = false;

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
 
//  OpenAjax.a11y.logger.debug("Add Result for " + this.rule.rule_id + ": " + severity + " " + cache_item.cache_id);

  switch (node_severity) {
 
  case SEVERITY.HIDDEN: 
    this.node_results_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.PASS:
    this.node_results_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.node_results_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.WARNING:
    this.node_results_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    break;
  
  case SEVERITY.MANUAL_CHECK:
    this.node_results_manual_checks.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_checks.push(node_result);
    break;

  default:
    break; 
  } // end switch 
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the level of implementation of the rule  
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResult.prototype.getImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  
  var t = 0;
  
  var p  = this.node_results_passed.length;
  t += p;
  
  var v  = this.node_results_violations.length;
  t += v;
  
  var w  = this.node_results_warnings.length;
  t += w;
  
  var mc = this.node_results_manual_checks.length;
  t += mc;
  
  if (t) {
  
    if (t !== mc) {
    
      t = t - mc;

      var percentage = Math.round((p * 100) / t);
      
      level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED; 
      
      if (percentage === 100) level = IMPLEMENTATION_LEVEL.COMPLETE;
      else if (percentage >= 95) level = IMPLEMENTATION_LEVEL.ALMOST_COMPLETE;
        else if (percentage >= 50) level = IMPLEMENTATION_LEVEL.PARTIAL_IMPLEMENTATION;
        
    } 
    
    if (mc > 0) level += IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
  
  }
  else {
    level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  }

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("Rule: " + this.rule.rule_id + " Level: " + level + " percent: " + percentage + " total: " + t + "  p: " + p + "  v: " + v + "  w: " + w + "  mc: " + mc);

  return level;

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Returns the NLS string values assoacited with the level of implementation of the rule  
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'style'
 *                  All properties are String objects
 */

OpenAjax.a11y.RuleResult.prototype.getNLSImplementationLevel = function () {

  var level = this.getImplementationLevel();

  return OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
 
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
 * @method getNLSRuleType
 *
 * @memberOf OpenAjax.a11y.RuleResult
 *
 * @desc Creates a NLS text string representation of the type of rule (i.e. required, recommended, conditional) 
 *
 * @return {String} Returns a NLS text string representation of the rule type 
 */

OpenAjax.a11y.RuleResult.prototype.getNLSRuleType = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  return cache_nls.getNLSRuleType(this.rule_type);  

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

 var str = this.getRuleDefinition() + ": " + this.getNLSImplementationLevel().label + " (" + this.getImplementationLevel() + ")"; 

 return str;
};


/* ---------------------------------------------------------------- */
/*                             RuleResultAggregation                */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor RuleResultAggregation
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains an aggregation of rule results
 *
 * @param  {String}  cache_id  -  String to uniquely represent the aggregation object 
 *
 * @property  {String}  cache_id  -  String to uniquely represent the aggregation object
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
 
OpenAjax.a11y.RuleResultAggregation = function (cache_id) {

  this.rule_results = [];

  if (cache_id) this.cache_id = cache_id;
  else this.cache_id = 'no_aggregation_id';
  
  this.number_of_required_rules = 0;
  this.number_of_recommended_rules = 0;
  this.number_of_rules_not_evaluated = 0;

  this.number_of_nodes_pass          = 0;
  this.number_of_nodes_violations    = 0;
  this.number_of_nodes_warnings      = 0;
  this.number_of_nodes_manual_checks = 0;
  this.number_of_nodes_hidden        = 0;

};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Creates an object that contains summary information from a group
 *          of rule result objects
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 */
 
OpenAjax.a11y.RuleResultAggregation.prototype.addRuleResult = function (rule_result) {

  this.rule_results.push(rule_result);

  if (rule_result.rule_evaluated) {
  
    if (rule_result.rule_mapping.type === OpenAjax.a11y.RULE.REQUIRED) this.number_of_required_rules += 1;
    else this.number_of_recommended_rules += 1;
    
    this.number_of_nodes_pass          += rule_result.node_results_passed.length;
    this.number_of_nodes_violations    += rule_result.node_results_violations.length;
    this.number_of_nodes_warnings      += rule_result.node_results_warnings.length;
    this.number_of_nodes_manual_checks += rule_result.node_results_manual_checks.length;
    this.number_of_nodes_hidden        += rule_result.node_results_hidden.length;
    
  }
  else {
    this.number_of_rules_not_evaluated += 1;
  }
  
};

/**
 * @method getImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns the level of implementation based on an average of rule implementation of 
 *       the rule results in the list.  Required rules implementation level are weighted 
 *       twice as important as recommended rules for implementation level
 *
 * @return {Number}  Implementation level of the rule
 */

OpenAjax.a11y.RuleResultAggregation.prototype.getImplementationLevel = function () {

  var IMPLEMENTATION_LEVEL = OpenAjax.a11y.IMPLEMENTATION_LEVEL;
  
  var level = IMPLEMENTATION_LEVEL.NOT_APPLICABLE;
  
  var rule_results     = this.rule_results;
  var rule_results_len = rule_results.length;
  
  var total_implementation_level       = 0; 
  var total_implementation_level_count = 0; 
  
  var manual_checks = 0;

//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Number of rule results: " + rule_results_len);  

  for (var i = 0; i < rule_results_len; i++ ) {
    
    var r_result = rule_results[i];
    
    if (r_result.rule_evaluated) {
      var il = r_result.getImplementationLevel();
      
      if (il >= IMPLEMENTATION_LEVEL.MANUAL_CHECKS) { 
        manual_checks = IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
        il = il - IMPLEMENTATION_LEVEL.MANUAL_CHECKS;
      }  
      
      if (il > 0) {
        total_implementation_level += il;
        total_implementation_level_count += 1;
      }  
      
//      OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("    Rule: " + r_result.rule.rule_id + "  Level: " + il + " Total: " + total_implementation_level + " count: " + total_implementation_level_count);
      
    }    
  }

  if (total_implementation_level_count > 0) {
    level = Math.round(total_implementation_level / total_implementation_level_count);
    if (level >= IMPLEMENTATION_LEVEL.MANUAL_CHECKS) level = IMPLEMENTATION_LEVEL.NOT_IMPLEMENTED;
  }

  level += manual_checks;
//
  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("    LEVEL: " + level + "  count: " + total_implementation_level_count + "  total: " + total_implementation_level);  

  return level;

};

/**
 * @method getNLSImplementationLevel
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns the NLS level of implementation of the list of rule results  
 *
 * @return {Object} Returns an object with four properties: 'label', 'abbrev', 'description' and 'style'
 *                  All properties are String objects
 */

OpenAjax.a11y.RuleResultAggregation.prototype.getNLSImplementationLevel = function () {

  var level = this.getImplementationLevel();
  
//  OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  Impl. Level: " + level + " (number)");  

  return OpenAjax.a11y.cache_nls.getNLSImplementationLevel(level);
 
};

 /** 
 * @method getRuleResultByCacheId
 *
 * @memberOf OpenAjax.a11y.RuleResultAggregation
 *
 * @desc Returns a result node (if found) using the cache_id of the result node
 *
 * @param  {String}  cache_id  -  Id of the cache item to be found
 *
 * @return  {ResultNode | null }  Returns the reult node object if found, otherwise null
 *
 */
 
OpenAjax.a11y.RuleResultAggregation.prototype.getRuleResultByCacheId = function (cache_id) {

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

/* ---------------------------------------------------------------- */
/*                           RuleCategoryResults                    */
/* ---------------------------------------------------------------- */

 /** 
 * @constructor RuleCategoryResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Creates an object that contains an aggregation of rule results by rule categories
 *
 */
 
OpenAjax.a11y.RuleCategoryResult = function() {

  this.abbreviation_rule_results   = new OpenAjax.a11y.RuleResultAggregation('aggregation_abbrev');
  this.audio_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_audio');
  this.color_contrast_rule_results = new OpenAjax.a11y.RuleResultAggregation('aggregation_color_contrast');
  this.control_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_control');
  this.heading_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_heading');
  this.image_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_image');
  this.landmark_rule_results       = new OpenAjax.a11y.RuleResultAggregation('aggregation_landmark');
  this.language_rule_results       = new OpenAjax.a11y.RuleResultAggregation('aggregation_language');
  this.link_rule_results           = new OpenAjax.a11y.RuleResultAggregation('aggregation_link');
  this.list_rule_results           = new OpenAjax.a11y.RuleResultAggregation('aggregation_list');
  this.table_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_table');
  this.video_rule_results          = new OpenAjax.a11y.RuleResultAggregation('aggregation_video');
  this.widget_rule_results         = new OpenAjax.a11y.RuleResultAggregation('aggregation_widget');
  this.content_rule_results        = new OpenAjax.a11y.RuleResultAggregation('aggregation_content');
  
};

 /** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.RuleCategoryResults
 *
 * @desc Adds a rule result to a rule category summary results
 *
 * @param     {ResultRule}  rule_result    - Rule result object to add to the collection
 */
 
OpenAjax.a11y.RuleCategoryResult.prototype.addRuleResult = function (rule_result) {

//  OpenAjax.a11y.logger.debug("primary: " + rule_result.rule.wcag_primary_id + " rule category: " + rule_result.rule.rule_category);

  if (!rule_result) return;

  switch (rule_result.rule.rule_category) {

  case OpenAjax.a11y.RULE_CATEGORIES.ABBREVIATIONS:
    this.abbreviation_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.AUDIO:
    this.audio_rule_results.addRuleResult(rule_result);
    break;
  
  case OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST:
    this.color_contrast_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.CONTROLS:
    this.control_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.HEADINGS:
    this.heading_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.IMAGES:
    this.image_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS:
    this.landmark_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LANGUAGE:
    this.language_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LINKS:
    this.link_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.LISTS:
    this.list_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.TABLES:
    this.table_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.VIDEO:
    this.video_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.WIDGETS:
    this.widget_rule_results.addRuleResult(rule_result);
    break;

  case OpenAjax.a11y.RULE_CATEGORIES.CONTENT:
    this.content_rule_results.addRuleResult(rule_result);
    break;

  default:
    break;
  
  }

};

/* ---------------------------------------------------------------- */
/*                           RuleResultSummary                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleResultSummary
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of rule results associated with a aggregation of rule results 
 *
 * @param  {String}  description  - description of summary
 *
 * @property  {String}  description      - description of summary 
 * 
 * @property  {Array}   rule_result_groups  - A list of RuleResultSummaryGroup or RuleResult object 
 */

 OpenAjax.a11y.cache.RuleResultSummary = function(description) {

  this.description = description;

  this.rule_result_items = [];
  
};

/**
 * @method addRuleResultItem
 *
 * @memberOf OpenAjax.a11y.cache.RuleResults
 *
 * @desc Adds a rule result object to the rule result group
 *
 * @property  {Object}  rule_result_item  - RuleResultSummaryGroup or RuleResult object 
 */

OpenAjax.a11y.cache.RuleResultSummary.prototype.addRuleResultItem = function(rule_result_item) {

  if (rule_result_item) this.rule_result_items.push(rule_result_item);
  
};


/* ---------------------------------------------------------------- */
/*                           RuleResultSummaryGroup                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor RuleResultSummaryGroup
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Constructs a data structure of rule results associated with a aggregation of rule results
 *
 * @param  {String}                 description  - description of the group
 * @param  {RuleResultAggregation}  aggregation  - Aggregation object for group
 * 
 * @property  {String}                 description         - description of the group
 * @property  {String}                 cache_id            - Cache id for the item
 * @property  {RuleResultAggregation}  aggregation         - Aggregation object for group
 * @property  {Boolean}                group_item          - indicates the item is a rule result summary group object (NOTE: always true) 
 * @property  {Array}                  rule_result_groups  - Array of child rule result summary group or rule result objects
 */

OpenAjax.a11y.cache.RuleResultSummaryGroup = function(description, aggregation) {
  
  this.description = description;
  this.cache_id    = aggregation.cache_id;
  this.rule_result_aggregation = aggregation;
  this.group_item  = true; 

  this.rule_result_items = [];
  
};

/**
 * @method addRuleResultItem
 *
 * @memberOf OpenAjax.a11y.cache.RuleResultSummaryGroup
 *
 * @desc Adds a rule result object to the rule result group
 *
 * @property  {Object}  rule_result_item  - RuleResultSummaryGroup or RuleResult object 
 */

OpenAjax.a11y.cache.RuleResultSummaryGroup.prototype.addRuleResultItem = function(rule_result_item) {

  if (rule_result_item) this.rule_result_items.push(rule_result_item);
  
};


