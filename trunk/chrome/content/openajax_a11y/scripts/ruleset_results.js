/**
 * Copyright 2011 OpenAjax Alliance
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

OpenAjax.a11y.results = OpenAjax.a11y.results || {};

/* ---------------------------------------------------------------- */
/*                 RulesetEvaluationResult                          */
/* ---------------------------------------------------------------- */
  
/**
 * RulesetEvaluationResult
 *
 * @desc Constructor for ruleset evaluation result
 *    Container object for requirement and rule results
 *
 * @param id  String id of the ruleset 
 * @param name String name of the ruleset 
 * @param url  String url to the ruleset requirements specification
 *
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RulesetEvaluationResult = function (ruleset_id, ruleset_name, ruleset_url, doc_url, doc_title) {
 this.date = new Date();
 
 this.ruleset_id = ruleset_id;
 this.ruleset_name = ruleset_name;
 this.ruleset_url = ruleset_url;
 
 this.doc_url = doc_url;
 this.doc_title = doc_title;
 
 this.score_text  = "none";
 this.score_count  = 0;
 this.score_total  = 0;
 this.score_percent = 0.0;

 this.requirements = [];
 
 return this;
};

/**
 * addRequirementResult
 *
 * @desc Adds requirement result object to ruleset result object
 *
 * @param requirment_result object Requirement result object to be added
 * 
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.addRequirementResult = function ( requirement_result ) {

 if ( requirement_result ) {
  this.requirements.push(requirement_result);
 } // endif 

};

/**
 * toString
 *
 * @desc Creates a string representation of the ruleset results, requirement and rule results
 *
 * @return String of ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toString = function () {

  var i;
  var j;
  var str ="";

  var requirements     = this.requirements;
  var requirements_len = requirements.length;
  var requirement;
 
  var rule_results_len;
  var rule_result;
  
  str += "Ruleset ID    : " + this.ruleset_id  + "\n";
  str += "Ruleset Name  : " + this.ruleset_name + "\n";
  str += "Ruleset URL   : " + this.ruleset_url + "\n\n";

  str += "Document Title : " + this.doc_title  + "\n";
  str += "Document URL   : " + this.doc_url    + "\n\n";

  str += "Score         : " + this.score_text  + "\n";
  str += "Score Percent : " + this.score_percent + "\n";
  str += "Score Count   : " + this.score_count  + "\n";
  str += "Score Total   : " + this.score_total  + "\n";
    
    
  for (i=0; i < requirements_len; i++ ) {
    requirement = requirements[i];
  
    str += "\nRequirement " + requirement.requirement_label + "\n";
    str += "  Number   : "  + requirement.requirement_number + "\n";
    str += "  Level    : "  + requirement.requirement_level  + "\n";
    str += "  URL      : "  + requirement.requirement_url   + "\n";
    str += "  Enabled  : "  + requirement.requirement_enabled + "\n\n";

/*
    str += "  Score     : " + this.requirements[i].score_text  + "\n";
    str += "  Score Percent : " + this.requirements[i].score_percent + "\n";
    str += "  Score Count  : " + this.requirements[i].score_count  + "\n";
    str += "  Score Total  : " + this.requirements[i].score_total  + "\n\n";
*/
    str += "  Rule Results\n";

    // report evaluation results
    rule_results_len = requirement.rule_results.length;

    if (rule_results_len) {
    
      for (j=0; j<rule_results_len; j++) {
      
        rule_result = requirement.rule_results[j];
        
        str += "   Rule: " + rule_result.rule_title  + "\n";    
        str += "    Severity : " + rule_result.rule_severity + "\n";    
        str += "    Priority : " + rule_result.rule_priority + "\n";    
        str += "    Enabled  : " + rule_result.rule_enabled + "\n\n";    
    
        str += "    Nodes in Document:\n";    
        
        if (rule_result.rule_enabled) {
          str += "     " + rule_result.nodes_violations.length           + " Violations\n";    
          str += "     " + rule_result.nodes_recommendations.length      + " Recommendations\n";    
          str += "     " + rule_result.nodes_manual_evaluations.length   + " Manual Evaluations\n";    
          str += "     " + rule_result.nodes_passed.length               + " Passed\n";    
          str += "     " + rule_result.nodes_hidden.length               + " Hidden\n";    
          str += "     " + rule_result.nodes_warnings.length             + " Warnings\n";    
          str += "     " + rule_result.nodes_na.length                   + " Conditions Not Met\n\n";   
        }
        else {
          str += "     ** No nodes analyzed, rule is disabled **\n";        
        }    
      } // endloop
    }
    else {
      str += "     ** No rules for this requirement ** \n\n";
    }   
  } // end loop
    
  return str;
};  


/**
 * toXML
 *
 * @desc Creates a XML string representation of the ruleset results, requirement and rule results
 *
 * @return String Using XML coding to represent the ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toXML = function (ruleset_nls) {

  var i;
  var j;
  var str = "";
  
  var requirements = this.requirements;
  var requirements_len = requirements.length;
  var requirement;

  var rule_results_len;
  var rule_result;
  
  var count;
  
  function nodeResultsToXML(node_results) {
 
    var i;
    var str = "";
    var len;
    var node_result;
  
    if (node_results) {
  
      len = node_results.length;
      node_result = null;
  
      for(i=0; i<len; i++ ) {
        str += node_results[i].toXML();
      } // end loop
    } 
 
    return str;
  }


  str += "<oaa-results>\n";
    
  str += " <ruleset>\n";
  str += "  <id>"  + this.ruleset_id  + "</id>\n";
  str += "  <name>" + this.ruleset_name + "</name>\n";
  str += "  <url>" + this.ruleset_url.replace(/&/g, '&amp;') + "</url>\n";
  str += " </ruleset>\n";

  str += " <document>\n";
  str += "  <title>"  + this.doc_title  + "</title>\n";
  str += "  <url>" + this.doc_url.replace(/&/g, '&amp;') + "</url>\n";
  str += " </document>\n";
  
  str += " <requirements>\n";
 
  for (i=0; i<requirements_len; i++) {
 
    requirement = requirements[i];

    str += "  <requirement>\n";
    str += "   <number>"  + requirement.requirement_number  + "</number>\n";
    str += "   <label>"   + requirement.requirement_label   + "</label>\n";
    str += "   <level>"   + requirement.requirement_level   + "</level>\n";
    str += "   <url>"     + requirement.requirement_url     + "</url>\n";
    str += "   <enabled>" + requirement.requirement_enabled + "</enabled>\n";

    str += "   <rules>\n";

    // report evaluation results
    rule_results_len = requirement.rule_results.length;

    for (j=0; j<rule_results_len; j++) {
      rule_result = requirement.rule_results[j];
   
      str += "     <rule>\n";
      str += "      <id>"    + rule_result.rule_id    + "</id>\n";    
      str += "      <title>"  + rule_result.rule_title  + "</title>\n";    
      str += "      <severity>" + rule_result.rule_severity + "</severity>\n";    
      str += "      <priority>" + rule_result.rule_priority + "</priority>\n";    
      str += "      <enabled>" + rule_result.rule_enabled + "</enabled>\n";    
      str += "     </rule>\n";

      count = rule_result.nodes_passed.length;
      str += "     <passed count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_passed);    
      str += "     </passed>\n";

      count = rule_result.nodes_violations.length;
      str += "     <violations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_violations);    
      str += "     </violations>\n";
   
      count = rule_result.nodes_recommendations.length;
      str += "     <recommendations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_recommendations);    
      str += "     </recommendations>\n";
   
      count = rule_result.nodes_manual_evaluations.length;
      str += "     <manual-evaluations count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_manual_evaluations);    
      str += "     </manual-evaluations>\n";

      count = rule_result.nodes_hidden.length;
      str += "     <hidden count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_hidden);    
      str += "     </hidden>\n";

      count = rule_result.nodes_warnings.length;
      str += "     <warnings count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_warnings);    
      str += "     </warnings>\n";
     
      count = rule_result.nodes_na.length;
      str += "     <not-applicable count=\"" + count + "\">\n";
      str += nodeResultsToXML(rule_result.nodes_na);    
      str += "     </not-applicable>\n";
      
    } // endloop
    str += "   </rules>\n";
    str += "  </requirement>\n";
  } // end loop

  str += " </requirements>\n";
  str += "</oaa-results>\n";

  return str;
};  

/**
 * toDjango
 *
 * @desc 
 *
 * @return String of database inserts
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toDjango = function () {

  var i;
  var j;
  var str = "";
  
  var requirements = this.requirements;
  var requirements_len = requirements.length;
  var requirement;
  
  var rule_results_len;
  var rule_result;
  
  str += "from local import conf, inst, ws\n\n";
  
  for (i=0; i<requirements_len; i++) {
 
    requirement = requirements[i];

// addResult(conf, inst, ws, url, title, control_id, pc, vc, rc, pvc, prc, hc, wc, nac)

    rule_results_len = requirement.rule_results.length;
 
    for (j=0; j<rule_results_len; j++) {
  
      rule_result = requirement.rule_results[j];

      str += "addResult(conf, inst, ws, ";
      str += "'" + this.doc_url;
      str += "', '" + this.doc_title;
      str += "', '" + rule_result.rule_id;
      str += "'"; 

      str += ", " + rule_result.nodes_passed.length; 
      str += ", " + rule_result.nodes_violations.length; 
      str += ", " + rule_result.nodes_recommendations.length; 
      str += ", " + rule_result.nodes_manual_evaluations.length; 
      str += ", " + rule_result.nodes_hidden.length; 
      str += ", " + rule_result.nodes_warnings.length; 
      str += ", " + rule_result.nodes_na.length;
      str += ")\n";  
    } // endloop
  } // end loop

  return str;
};  


/**
 * toJSON
 *
 * @desc Creates a JSON string representation of the ruleset results, requirement and rule results
 *
 * @return String Using JSON coding to represent the ruleset evaluation results
 */
 
OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toJSON = function () {

 return "{ 'Feature has not been implemented' } ";

};

/**
 * toHTML
 *
 * @desc Creates a HTML string representation of the ruleset results, requirement and rule results
 *
 * @return String Using HTML coding to represent the ruleset evaluation results
 */

OpenAjax.a11y.results.RulesetEvaluationResult.prototype.toHTML = function (ruleset_nls) {

  var html = "";
  var title;

  function nodeResultsToHTML(node_results) {
 
    var i;
    var html = "";
    var len;
    var node_result;
  
    if (node_results) {
  
      len = node_results.length;
      node_result = null;
      html += "<ul>\n";
      for (i = 0; i < len; i++) {
        html += node_results[i].toHTML(ruleset_nls);
      } // end loop
      html += "</ul>\n";
    } 
 
    return html;
  }

 title = "OAA Evaluation Results for \"" + this.doc_title + "\"";

 html += "<html>\n";

 html += "  <head>\n";
 html += "    <title>" + title + "</title>\n";
 

 html += "  </head>\n";
 html += "  <body>\n";

 html += "    <h1>" + title + "</h1>\n";
  
 html += "    <h2>Document Information<h2>\n";
 html += "    <ul class=\"document-info\">\n";
 html += "      <li><strong>Document Tile:</strong> " + this.doc_title + "</li>\n";
 html += "      <li><strong>Document URL:</strong> "  + this.doc_url  + "</li>\n";
 html += "    </ul>\n";

 html += "    <h2>Rule Set Information<h2>\n";
 html += "    <ul class=\"ruleset-info\">\n";
 html += "      <li><strong>Ruleset ID:</strong> "   + this.ruleset_id   + "</li\n";
 html += "      <li><strong>Ruleset Tile:</strong> " + this.ruleset_name + "</li>\n";
 html += "      <li><strong>Ruleser URL:</strong> "  + this.ruleset_url  + "</li>\n";
 html += "    </ul>\n";
 
 var requirements_len = this.requirements.length;
    
 for (var i=0; i < requirements_len; i++ ) {
 
  var requirement = this.requirements[i];

  html += "    <div class=\"requirement\">\n";
  html += "      <h2>" + requirement.requirement_label  + " (Level-" + requirement.requirement_level + ")</h2>\n";
  html += "      <div class=\"rules\">\n";

  // report evaluation results
  var rule_results_len = this.requirements[i].rule_results.length;

  for (var j=0; j < rule_results_len; j++) {
   var rule_result = this.requirements[i].rule_results[j];
   
   html += "       <div class='rule'>\n";
   html += "         <h3>" + rule_result.rule_title  + "</h3>\n";    
   html += "         <div class=\"severity\">" + rule_result.rule_severity + "</div>\n";    
   html += "         <div class=\"priority\">" + rule_result.rule_priority + "</div>\n";    
   html += "         <div class=\"enabled\">"  + rule_result.rule_enabled + "</div>\n";    
    
   html += "         <div class=\"violations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_violations);    
   html += "         </div>\n";
   
   html += "         <div class=\"recommendations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_recommendation);    
   html += "         </div>\n";
   
   html += "         <div class=\"manual-evaluations\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_manual_evaluations);    
   html += "         </div>\n";

   html += "         <div class=\"hidden\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_hidden);    
   html += "         </div>\n";

   html += "         <div class=\"warnings\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_warnings);    
   html += "         </div>\n";
   

   html += "         <div class=\"passed\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_passed);    
   html += "         </div>\n";
   
   html += "         <div class=\"not-applicable\">\n";
   html += "            " + nodeResultsToHTML(this.requirements[i].rule_results[j].nodes_na);    
   html += "         </div>\n";
   html += "       </div>\n";
    
  } // endloop
  html += "      </div>\n";
 } // end loop

 html += "    </div>\n";
 html += "  </body>\n";
 html += "</html>\n";

 return html;
};  

/* ---------------------------------------------------------------- */
/*                 RequirementResult                          */
/* ---------------------------------------------------------------- */

/**
 * RequirementResult
 *
 * @desc Constructor for ruleset evaluation result
 *    Container object for requirement and rule results
 *
 * @param number    String  number of he requirement being evaluated
 * @param label    String  label for the requirement
 * @param description String  description of the requirement
 * @param level    String  level of importance of the requirement 
 * @param url     String  url to the requirment specification
 * @param enabled   Boolean wether the requirement is enabled or not
 *
 * @return RulesetEvaluationResult object
 */
 
OpenAjax.a11y.results.RequirementResult = function (number, label, description, level, url, enabled) {
 this.requirement_number    = number;
 this.requirement_label    = label; 
 this.requirement_description = description; 
 this.requirement_level    = level;
 this.requirement_url     = url;
 this.requirement_enabled   = enabled;
 
 this.score_text    = "none";
 this.score_count   = 0;
 this.score_total   = 0;
 this.score_percentage = 0.0;
 
 this.rule_results   = [];
 this.references    = [];
};

/**
 * addRuleResult
 *
 * @desc Adds a rule result object to the requirement result object
 *
 * @param rule_result Object rule result object to add to requirement
 *
 * @return RulesetEvaluationResult object
 */

OpenAjax.a11y.results.RequirementResult.prototype.addRuleResult = function ( rule_result ) {

 if ( rule_result ) {
  this.rule_results.push(rule_result);
 } // endif 

};

/**
 * addReference
 *
 * @desc Adds an informative reference to the requirement result object 
 *
 * @param reference object reference object to be added to the requirement object
 * 
 * @return none
 */

OpenAjax.a11y.results.RequirementResult.prototype.addReference = function ( reference ) {

 if ( reference ) {
  this.references.push(reference);
 } // endif 

};

/* ---------------------------------------------------------------- */
/*                         RequirementReference                     */
/* ---------------------------------------------------------------- */


/**
 * OpenAjax.a11y.results.RequirementReference
 *
 * @desc Constructor for an object that contains a reference that 
 *    supports the implementation of a requirement 
 *
 * @param type  String a string identifier of the type of reference (i.e. example, best practice, manual evaluation..)
 * @param title String the title associated with the reference
 * @param url  String the url to the reference
 *
 * @return none
 */
 
OpenAjax.a11y.results.RequirementReference = function (type, title, url) {
 this.reference_type = type;
 this.reference_title = title;
 this.reference_url  = url;
};

/** 
 * OpenAjax.a11y.results.RuleResult
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule
 *
 * @param id    String  a string identifier of the type of reference (i.e. example, best practice, manual evaluation..)
 * @param title   String  the title associated with the reference
 * @param severity Number  The importance of the rule in the ruleset
 * @param priority Number  The importance of the rule relative to other rules in this requirement
 * @param enabled  Boolean true if rule was evaluated, false if rule was not evaluated
 *
 * @return none
 */
 
OpenAjax.a11y.results.RuleResult = function (id, title, severity, priority, enabled) {
  this.rule_id         = id;
  this.rule_title      = title;
  this.rule_severity   = severity; 
  this.rule_priority   = priority;
 
  this.rule_enabled    = enabled;
 
  this.score_text = "none";
  this.score_count = 0;
  this.score_total = 0;
  this.score_percentage = 0.0;
 
  this.nodes_passed               = [];
  this.nodes_violations           = [];
  this.nodes_recommendations      = [];
  this.nodes_manual_evaluations   = [];
  this.nodes_hidden               = [];
  this.nodes_warnings             = [];
  this.nodes_na                   = [];
};

/**
 * addResult
 *
 * @desc Adds a result for the evaluation of a node to the rule result object 
 *
 * @param severity      Number severity of the rule
 * @param cache_item     Object reference to cache item associated with the test
 * @param message_id     String reference to the message string in the NLS file
 * @param message_arguements Array  array of values used in the message string 
 * 
 * @return none
 */

OpenAjax.a11y.results.RuleResult.prototype.addResult = function (severity, cache_item, message_id, message_arguments) {

  var SEVERITY = OpenAjax.a11y.SEVERITY;

  var dom_element_item = null; 
 
  if (cache_item) {
    if (cache_item.dom_element) {
      dom_element_item = cache_item.dom_element;  
    } 
    else {
      dom_element_item = cache_item;  
    }
  }  
  
  var node_result = new OpenAjax.a11y.results.NodeResult(this, severity, cache_item, message_id, message_arguments);
 
  // OpenAjax.a11y.console("Add Result for " + this.rule_id + ": " + severity + " " + dom_element_item);

  switch (severity) {
 
  case SEVERITY.NA: 
    this.nodes_na.push(node_result);
    if (dom_element_item) dom_element_item.rules_na.push(node_result);
    break;

  case SEVERITY.HIDDEN: 
    this.nodes_hidden.push(node_result);
    if (dom_element_item) dom_element_item.rules_hidden.push(node_result);
    break;

  case SEVERITY.WARNING: 
    this.nodes_warnings.push(node_result);
    if (dom_element_item) dom_element_item.rules_warnings.push(node_result);
    break;
 
  case SEVERITY.PASS:
    this.nodes_passed.push(node_result);
    if (dom_element_item) dom_element_item.rules_passed.push(node_result);
    break;
  
  case SEVERITY.VIOLATION:
    this.nodes_violations.push(node_result);
    if (dom_element_item) dom_element_item.rules_violations.push(node_result);
    break;
  
  case SEVERITY.RECOMMENDATION:
    this.nodes_recommendations.push(node_result);
    if (dom_element_item) dom_element_item.rules_recommendations.push(node_result);
    break;
  
  case SEVERITY.MANUAL_EVALUATION:
    this.nodes_manual_evaluations.push(node_result);
    if (dom_element_item) dom_element_item.rules_manual_evaluations.push(node_result);
    break;
  
  default:
    break; 
  } // end switch 
};

/* ---------------------------------------------------------------- */
/*                              NodeResult                          */
/* ---------------------------------------------------------------- */

/**
 * OpenAjax.a11y.results.NodeResult
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation of a rule on a node
 *
 * @param rule_result    Object reference to the rule result object
 * @param severity       String 
 * @param cache_item     Object reference to cache item associated with the test
 * @param message_id     String reference to the message string in the NLS file
 * @param message_arguements Array  array of values used in the message string 
 *
 * @return none
 */

OpenAjax.a11y.results.NodeResult = function (rule_result, severity, cache_item, message_id, message_arguments) {

  this.rule_result = rule_result;
  this.severity    = severity;
  this.cache_item  = cache_item;
  this.message_id  = message_id;
  this.message_arguments = message_arguments;

};


/**
 *
 * getResultSeverity
 *
 * @desc getResultSeverity resturns a localized string of the severity level of the node result
 *
 * @param ruleset_nls Object  ruleset NLS used to define the language of the message 
 * 
 * @return String representing the severity of the node result
 */

OpenAjax.a11y.results.NodeResult.prototype.getResultSeverity = function (ruleset_nls) {

  return ruleset_nls.severities[this.severity];
  
};

/**
 *
 * getResultMessage
 *
 * @desc getResultMessage returns the message in the language of the ruleset nls reference
 *         includes inseting the message arguments
 *
 * @param ruleset_nls Object  ruleset NLS used to define the language of the message 
 * 
 * @return String message associated withe the node result
 */

OpenAjax.a11y.results.NodeResult.prototype.getResultMessage = function (ruleset_nls) {

  var i;
  var message;
  var str = ruleset_nls.rules[this.rule_result.rule_id][this.message_id];
  var vstr; // i.e. %1, %2 ....
  var len = this.message_arguments.length;
 
  for (i=0; i<len; i++) { 
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
 
 return str;
};

/**
 * toString
 *
 * @desc Creates a string descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toString = function () {
  var str = "";
 
  str += "messageID: " + this.message_id + ", ";
 
  for (var i=0; i<this.message_arguments.length; i++) { 
    str += "arg" + i +  ": '" + this.message_arguments[i] + "', " ;
  } // end loop

  if (this.cache_item ) {
    str += "cacheID: " + this.cache_item.cache_id + ", ";
  }
  else {
    str += "cacheID: none, ";
  }
 
  str += "result: " + this.rule_result;

  return str;
};

/**
 * toXML
 *
 * @desc Creates XML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toXML = function () {
  var str = "";
  str += "      <node-result>\n";
  str += "       <severity>" + this.severity            + "</severity>\n";
  
  if (this.cache_item) {
    str += "       <cache-id>" + this.cache_item.cache_id + "</cache-id>\n";
    if (this.cache_item.xpath) {
      str += "       <xpath>" + this.cache_item.xpath + "</xpath>\n";
    }
    else {
      if (this.cache_item.dom_element && this.cache_item.dom_element.xpath) {
        str += "       <xpath>" + this.cache_item.dom_element.xpath + "</xpath>\n";
      }
      else {
        str += "       <xpath>undefined</xpath>\n";
      }
    }
  }
  else {
    str += "       <cache-id>none</cache-id>\n";
    str += "       <xpath>none</xpath>\n";
  }
  
  
  str += "       <message-id>" + this.message_id + "</message-id>\n";
 
  for (var i=0; i<this.message_arguments.length; i++) { 
    str += "       <arguement>" + this.message_arguments[i] + "</arguement>\n" ;
  } // end loop

  str += "       </node-result>\n";
 
  return str;
};

/**
 * toHTML
 *
 * @desc Creates HTML descibing the properties of the node result
 * 
 * @return String information about the node result 
 */

OpenAjax.a11y.results.NodeResult.prototype.toHTML = function (ruleset_nls) {
  var i;
  var html = "<li>" + this.getResultSeverity(ruleset_nls) + ": " + this.getResultMessage(ruleset_nls) + "</li>";
 
  return html;
};

