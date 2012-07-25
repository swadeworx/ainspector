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
/*                          WCAG20Result                            */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20Result
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Principle
 *
 * @param  {RulesetPrinciple}  ruleset_principle  - Ruleset Principle object
 *
 * @property  {WCAG20RulesetPrinciple}   ruleset_principle        - Reference to the associated ruleset principle
 * @property  {ResultSummaryRule}        evaluation_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20Result = function (ruleset, url, title) {

  this.ruleset = ruleset;
  this.title = title;
  this.url   = url;
  
  this.evaluation_results     = new OpenAjax.a11y.EvaluationResult();
  this.rule_a_summary_results   = new OpenAjax.a11y.EvaluationResult();
  this.rule_aa_summary_results  = new OpenAjax.a11y.EvaluationResult();
  this.rule_aaa_summary_results = new OpenAjax.a11y.EvaluationResult();
  
  this.principle_results = [];

  var pr, gr, scr;
  
  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('1');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.1.1');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.4');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.5');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.6');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.7');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.8');
  gr.addSuccessCriterionResult(scr);    
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.2.9');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.3.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.3.3');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('1.4');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.6');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.7');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.8');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('1.4.9');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('2');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.1.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.1.3');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.2.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.2.5');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.3.2');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('2.4');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.6');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.7');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.8');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.9');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('2.4.10');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('3');
  
  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.1');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.1.6');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.2');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.2.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.2.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.2.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.2.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.2.5');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('3.3');
  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.2');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.3');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.4');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.5');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('3.3.6');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

  pr  = new OpenAjax.a11y.WCAG20ResultPrinciple('4');

  gr  = new OpenAjax.a11y.WCAG20ResultGuideline('4.1');

  scr = new OpenAjax.a11y.WCAG20ResultGuideline('4.1.1');
  gr.addSuccessCriterionResult(scr);  
  scr = new OpenAjax.a11y.WCAG20ResultGuideline('4.1.2');
  gr.addSuccessCriterionResult(scr);  
  
  pr.addGuidelineResult(gr);

  this.addPrincipleResult(pr);

};

/** 
 * @method addPrincipleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Add principle result object
 *
 * @param  {WCAG20ResultPrinciple}  principle_result  - Principle result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addPrincipleResult = function (principle_result) {

  this.principle_results.push(principle_result);

};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Add rule result object to the aggregations of rule results by WCAG 2.0 Principles, Guidelines, Success Criteria and SC Levels 
 *
 * @param  {RuleResult}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addRuleResult = function (rule_result) {

  switch (ruleset_rule.wcag20_level) {
                     
  case OpenAjax.a11y.WCAG20_LEVEL.A:
    this.rule_a_summary_results.addRuleResult(rule_result);
    break;
                     
  case OpenAjax.a11y.WCAG20_LEVEL.AA:
    this.rule_aa_summary_results.addRuleResult(rule_result);
    break;
                     
  case OpenAjax.a11y.WCAG20_LEVEL.AAA:
    this.rule_aaa_summary_results.addRuleResult(rule_result);
    break;
                       
  default:
    break;
                      
  } // end switch

  if (rule_result.principle_index >= 0) this.principle_results[rule_result.principle_index].addRuleResult(rule_result);

};

/** 
 * @method getResultItemById
 *
 * @memberOf OpenAjax.a11y.WCAG20Result
 *
 * @desc Returns result object by ID
 *
 * @param   {String}  principle_result  - Principle result object to add
 *
 * @return  {Object}  Result object
 */

OpenAjax.a11y.WCAG20Result.prototype.getResultItemById = function (id) {

   var ids = id.split('.');
   var index; 
   
   var item = null;
   
   for (var i = 0; i < ids.length; i++) {
     index = parseInt(ids[i], 10);
     if (typeof index === 'number') {
       ids[i] = index - 1;
     }
     else {
       return null;
     }
   }

   switch (ids.length) {
   
   case 1:
     item = this.principle_results[ids[0]];
     break;
     
   case 2:
     item = this.principle_results[ids[0]].guideline_results[ids[1]];
     break;

   case 3:
     item = this.principle_results[ids[0]].guideline_results[ids[1]].success_criteria_results[ids[2]];
     break;
  
   default:
     break;
  }   

  return item;
};

/**
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20Result
 *
 * @desc Creates a html text string representation of the WCAG20 results  
 *
 * @return {String} Returns a HTML coded text string representation of the WCAG20 result object
 */

OpenAjax.a11y.WCAG20Result.prototype.toHTML = function () {
    
  var html = "";
    
  function toHtmlStart(title, url) {
  
    var html = "";
    
    html += "<!DOCTYPE html>\n";
    
    html += "<html>\n";
 
    html += "  <head>\n";
    html += "    <title>WCAG 2.0 Report for " + title + "</title>\n"; 
    html += "\n"; 
    html += "  </head>\n";
    html += "\n"; 
 
    html += "  <body>\n";
    html += "    <div role='banner'>\n";    
    html += "      <p class='title'>WCAG 2.0 Report for " + title + "</p>\n"; 
    html += "      <p class='url'>URL: " + url + "</p>\n"; 
    html += "    </div>\n";
    return html;
    
  }  

  function toHtmlEnd() {
  
    var html = "";
     
    html += "  </body>\n";

    html += "</html>\n";
    
    return html;    
  }  


  html += toHtmlStart();

  html += toHtmlEnd();
 
  return html;
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20Result
 *
 * @desc Creates a text string representation of the WCAG20 result object 
 *
 * @return {String} Returns a text string representation of the WCAG20 result object
 */

OpenAjax.a11y.WCAG20Result.prototype.toString = function () {

  var str = "";
 
  return str;
};

/* ---------------------------------------------------------------- */
/*                        WCAG20ResultPrinciple                           */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Principle
 *
 * @param  {String}  principle_id  - Principle ID
 *
 * @property  {String}              principle_id             - Principle id
 * @property  {ResultSummaryRule}   evaluation_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}               result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple = function (principle_id) {

  this.principle_id = principle_id;
  this.evaluation_results = new OpenAjax.a11y.EvaluationResult();
  this.guideline_results = [];

};

/** 
 * @method addGuidelineResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultPrinciple
 *
 * @desc Add guideline result object
 *
 * @param  {WCAG20ResultGuideline}  guideline_result  - Guideline result object to add
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple.prototype.addGuidelineResult = function (guideline_result) {

  this.guideline_results.push(guideline_result);

};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultPrinciple
 *
 * @desc Add rule result object to the aggregations of rule results by WCAG 2.0 Guidelines, Success Criteria and SC Levels 
 *
 * @param  {RuleResult}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addRuleResult = function (rule_result) {

  this.evaluation_results.addRuleResult(rule_result);

  if (rule_result.guideline_index >= 0) this.guidelines_results[rule_result.guideline_index].addRuleResult(rule_result);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultPrinciple
 *
 * @desc Creates a text string representation of the principle result object 
 *
 * @return {String} Returns a text string representation of the principle result object
 */

OpenAjax.a11y.WCAG20ResultPrinciple.prototype.toString = function () {

 var str = "";
 
 return str;
};



/* ---------------------------------------------------------------- */
/*                        WCAG20ResultGuideline                           */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Guideline
 *
 * @param  {String}  guideline_id  - Guideline id 
 *
 * @property  {String}                   guideline_id             - Guideline id
 * @property  {ResultSummaryRule}        evaluation_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_sucess_creiteria  - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultGuideline = function (guideline_id) {

  this.guideline_id = guideline_id;
  this.evaluation_results = new OpenAjax.a11y.EvaluationResult();
  this.success_criteria_results = [];

};

/** 
 * @method addSuccessCriterionResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultGuideline
 *
 * @desc Add success criterion result object
 *
 * @param  {WCAG20ResultSuccessCriterion}  success_criterion_result  - Success criterion result object to add
 */
 
OpenAjax.a11y.WCAG20ResultGuideline.prototype.addSuccessCriterionResult = function (success_criterion_result) {

  this.success_criteria_results.push(success_criterion_result);

};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultGuideline
 *
 * @desc Add rule result object to the aggregations of rule results by WCAG 2.0 Guideline and Success Criteria 
 *
 * @param  {RuleResult}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20Result.prototype.addRuleResult = function (rule_result) {

  this.evaluation_results.addRuleResult(rule_result);

  if (rule_result.success_criteria_index >= 0) this.success_criteria_results[rule_result.success_criteria_index].addRuleResult(rule_result);

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultGuideline
 *
 * @desc Creates a text string representation of the guideline result object 
 *
 * @return {String} Returns a text string representation of the guideline result object
 */

OpenAjax.a11y.WCAG20ResultGuideline.prototype.toString = function () {

 var str = "";
 
 return str;
};

/* ---------------------------------------------------------------- */
/*              WCAG20ResultSuccessCriterion                        */
/* ---------------------------------------------------------------- */

/** 
 * @constructor WCAG20ResultSuccessCriterion
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of 
 *          the evaluation for a WCAG 2.0 Success Criteria
 *
 * @param  {String}      success_criterion_id  - Success Criterion ID
 *
 * @property  {String}   success_criterion_id  - Success Criterion ID
 * @property  {Array}    evaluation_results  - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion = function (success_criterion_id) {

  this.success_criterion_id  = success_criterion_id;
  this.evaluation_results      = new OpenAjax.a11y.EvaluationResult();
  this.rule_results = [];
};

/** 
 * @method addRuleResult
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultSuccessCriterion
 *
 * @desc Add rule result object
 *
 * @param  {ResultRule}  rule_result  - Rule result object to add
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.addRuleResult = function (rule_result) {

  this.evaluation_results.addRuleResult(rule_result);
  
  this.rule_results.push(rule_result);

};

/** 
 * @method getRequirement
 *
 * @memberOf OpenAjax.a11y.WCAG20ResultSuccessCriterion
 *
 * @desc Returns a NLS localized title for the rquirement
 *
 * @return {Array} Returns string with a localized version of the requirement
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.getRequirement = function () {

  var sc_nls = OpenAjax.a11y.all_wcag20_nls.getNLSItemById(this.ruleset_success_criterion.id); 
  
  if (sc_nls) 
    return "WCAG " + sc_nls.title;
  else
    return "Title not found";  

};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20ResultSuccessCriterion
 *
 * @desc Creates a text string representation of the success criterion result object 
 *
 * @return {String} Returns a text string representation of the rule result object
 */

OpenAjax.a11y.WCAG20ResultSuccessCriterion.prototype.toString = function () {

 var str = "";
 
 return str;
};

