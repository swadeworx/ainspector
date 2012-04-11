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
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20Result = function (ruleset, url, title) {

  this.ruleset = ruleset;
  this.title = title;
  this.url   = url;
  
  this.rule_summary_results     = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_a_summary_results   = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_aa_summary_results  = new OpenAjax.a11y.ResultRuleSummary();
  this.rule_aaa_summary_results = new OpenAjax.a11y.ResultRuleSummary();
  
  this.principle_results = [];

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
 * @method toHTML
 *
 * @memberOf OpenAjax.a11y.cache.WCAG20Result
 *
 * @desc Creates a html text string representation of the WCAG20 results  
 *
 * @return {String} Returns a HTML coded text string representation of the WCAG20 result object
 */

OpenAjax.a11y.WCAG20Result.prototype.toHTML = function () {

  function toHtmlRuleSummaryTableStart(id_table, title, level) {
  
    var html = "";

    html += "    <h2 id='h2_" + id_table + "'>" + title + "</h2>\n"; 
    html += "    <table class='rule_summary' aria-labelledby='h2_" + id_table + "'>\n"; 
    html += "      <thead>\n";
    html += "        <tr>\n";
    html += "          <th rowspan='2'></th>\n";
    if (level) html += "          <th rowspan='2'>Level</th>\n";
    html += "          <th id='" + id_table + "_req_rules' colspan='4' >Required Rules</th>\n";
    html += "          <th id='" + id_table + "_rec_rules' colspan='4' >Recommended Rules</th>\n";
    html += "          <th id='" + id_table + "_totals' class='totals' rowspan='2'>Total</th>\n";
    html += "        </tr>\n";
    html += "        <tr>\n";
    html += "          <th class='required_pass'   id='" + id_table + "_all_pass'>All Pass   <sup><a href='#" + id_table + "_sup1'>1</a></sup> </th>\n";
    html += "          <th class='required_fail'   id='" + id_table + "_has_fail'>Violations <sup><a href='#" + id_table + "_sup2'>2</a></sup> </th>\n";
    html += "          <th class='required_manual' id='" + id_table + "_has_mc' >Manual      <sup><a href='#" + id_table + "_sup3'>3</a></sup> </th>\n";
    html += "          <th class='required_na'     id='" + id_table + "_has_na' >NA          <sup><a href='#" + id_table + "_sup4'>4</a></sup></th>\n";
    html += "          <th class='recommended_pass'>All Pass     <sup><a href='#" + id_table + "_sup1'>1</a></sup></th>\n";
    html += "          <th class='recommended_fail'>Violations   <sup><a href='#" + id_table + "_sup2'>2</a></sup></th>\n";
    html += "          <th class='recommended_manual'>Manual     <sup><a href='#" + id_table + "_sup3'>3</a></sup></th>\n";
    html += "          <th class='recommended_na'>Not Applicable <sup><a href='#" + id_table + "_sup4'>4</a></sup></th>\n";
    html += "        </tr>\n"; 
    html += "      </thead>\n";
    html += "      <tbody>\n";
    
    return html;
    
  }

  function toHtmlRuleSummaryTableRowSection(id_section, section_title, section_class, level) {
 
    var html = "";
    
    if (section_class) html += "        <tr class='section " + section_class + "'>\n";
    else html += "        <tr class='section'>\n";
    
    html += "          <th class='section' id='" + id_section + "'>" + section_title  + "</th>\n";
    if (level) html += "          <td>" + level  + "</td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "          <td></td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }


  function toHtmlRuleSummaryTableRow(row_count, id_table, id_section, id_row, item_title, rule_summary, level) {
 
    var cell_class = "";
 
    var total = rule_summary.required_rules_all_pass;
    total += rule_summary.required_rules_with_fail;
    total += rule_summary.required_rules_with_manual_checks;
    total += rule_summary.required_rules_with_na;
    total += rule_summary.recommended_rules_all_pass;
    total += rule_summary.recommended_rules_with_fail;
    total += rule_summary.recommended_rules_with_manual_checks;
    total += rule_summary.recommended_rules_with_na;
 
    var html = "";
    
    if (row_count % 2) html += "        <tr class='odd'>\n";
    else html += "        <tr class='even'>\n";
    
    html += "          <th id='" + id_row + "' headers='" + id_section + "'>" + item_title  + "</th>\n";
    if (level) html += "          <td>" + level  + "</td>\n";
    
    cell_class = "required_pass";
    if (rule_summary.required_rules_all_pass === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_all_pass'>" + rule_summary.required_rules_all_pass           + "</td>\n";
    
    cell_class = "required_fail";
    if (rule_summary.required_rules_with_fail === 0) cell_class = "zero";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_has_fail'>" + rule_summary.required_rules_with_fail          + "</td>\n";
    
    cell_class = "required_manual";
    if (rule_summary.required_rules_with_manual_checks === 0) cell_class = "zero";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_has_mc'>"   + rule_summary.required_rules_with_manual_checks + "</td>\n";
    
    cell_class = "required_na";
    if (rule_summary.required_rules_with_na === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_req_rules " + id_table + "_has_na'>"   + rule_summary.required_rules_with_na + "</td>\n";
    
    cell_class = "recommended_pass";
    if (rule_summary.recommended_rules_all_pass === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_all_pass'>" + rule_summary.recommended_rules_all_pass           + "</td>\n";
    
    cell_class = "recommended_fail";
    if (rule_summary.recommended_rules_with_fail === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_has_fail'>" + rule_summary.recommended_rules_with_fail          + "</td>\n";
    
    cell_class = "recommended_manual";
    if (rule_summary.recommended_rules_with_manual_checks === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_has_mc'>"   + rule_summary.recommended_rules_with_manual_checks + "</td>\n";

    cell_class = "recommended_na";
    if (rule_summary.recommended_rules_with_na === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_rec_rules " + id_table + "_has_na'>"   + rule_summary.recommended_rules_with_na + "</td>\n";
    
    cell_class = "";
    if (total === 0) cell_class = "zero";    
    html += "          <td class='totals " + cell_class + "' headers='" + id_row + " " + id_table + "_totals'>"   + total + "</td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlRuleSummaryTableRowTotal(id_table, id_row, item_title, rule_summary, level) {

    var total = rule_summary.required_rules_all_pass;
    total += rule_summary.required_rules_with_fail;
    total += rule_summary.required_rules_with_manual_checks;
    total += rule_summary.required_rules_with_na;
    total += rule_summary.recommended_rules_all_pass;
    total += rule_summary.recommended_rules_with_fail;
    total += rule_summary.recommended_rules_with_manual_checks;
    total += rule_summary.recommended_rules_with_na;

    var html = "";
    
    html += "        <tr class='totals'>\n";
    
    if (level) html += "          <th id='" + id_row  + "_total' colspan='2'>Total</th>\n"; 
    else html += "          <th id='" + id_row  + "_total'>Total</th>\n";

    cell_class = "required_pass";
    if (rule_summary.required_rules_all_pass === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_all_pass'>" + rule_summary.required_rules_all_pass           + "</td>\n";
    
    cell_class = "required_fail";
    if (rule_summary.required_rules_all_fail === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_has_fail'>" + rule_summary.required_rules_with_fail          + "</td>\n";
    
    cell_class = "required_manual";
    if (rule_summary.required_rules_all_manual_na === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_has_mc'>"   + rule_summary.required_rules_with_manual_checks + "</td>\n";
    
    cell_class = "required_na";
    if (rule_summary.required_rules_all_manual_checks === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_req_rules " + id_table + "_has_na'>"   + rule_summary.required_rules_with_na            + "</td>\n";

    
    cell_class = "recommended_pass";
    if (rule_summary.recommended_rules_all_pass === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_all_pass'>" + rule_summary.recommended_rules_all_pass           + "</td>\n";
    
    cell_class = "recommended_fail";
    if (rule_summary.recommended_rules_all_fail === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_has_fail'>" + rule_summary.recommended_rules_with_fail          + "</td>\n";
    
    cell_class = "recommended_manual";
    if (rule_summary.recommended_rules_all_manual_checks === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_has_mc'>"   + rule_summary.recommended_rules_with_manual_checks + "</td>\n";
    
    cell_class = "recommended_na";
    if (rule_summary.recommended_rules_all_na === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total " + id_table + "_rec_rules " + id_table + "_has_na'>"   + rule_summary.recommended_rules_with_na            + "</td>\n";
    
    
    cell_class = "";
    if (total === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + "_total'>"   + total + "</td>\n";
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlRuleSummaryTableEnd() {

    var html = "";

    html += "      </tbody>\n";
    html += "    </table>\n"; 
    return html;
  }

  function toHtmlRuleSummaryTableRefs(id_table) {

    var html = "";

    html += "    <li><sup><a id='" + id_table + "_sup1'>1</a></sup>Number of rules where all elements a rule applied to passed</li>";
    html += "    <li><sup><a id='" + id_table + "_sup2'>2</a></sup>Number of rules where one or more elements a rule applies resulted in a violation</li>";
    html += "    <li><sup><a id='" + id_table + "_sup3'>3</a></sup>Number of rules where one or more elements a rule applies resulted in a manual check</li>";
    html += "    <li><sup><a id='" + id_table + "_sup4'>4</a></sup>Number of rules where one or more elements a rule applies resulted in a hidden or not applicable result</li>";
    return html;
  }

 
 
  function toHtmlWCAG20Summary(title, principle_results, a_results, aa_results, aaa_results, all_results, wcag20_nls) {

    var i, j;
    
    var pr;
    var gr;
    
    var html = "";
    
    var id_table = 'summ';
    var id_principle = "";
    var id_guideline = "";
    
    var id_count = 0;
    var row_id = "";
    
    var t = "Rule Results for '" + title + "'";

    html += "    <div id='summary' role='main' aria-labelledby='main_summary'>\n";
    html += "      <h1 id='main_summary'>WCAG 2.0 Rule Results Summary</h1>\n";
    html += "\n"; 

    html += toHtmlRuleSummaryTableStart(id_table, t);

    for (i = 0; i < principle_results.length; i++) {
    
      pr = principle_results[i];
      
      t = wcag20_nls.getNLSItemById(pr.ruleset_principle.id).title;
      
      id_principle = id_table + "_p" + (i+1);

      html += toHtmlRuleSummaryTableRowSection(id_principle, t);

      for (j = 0; j < pr.guideline_results.length; j++) {
 
        gr = pr.guideline_results[j];

        t = wcag20_nls.getNLSItemById(gr.ruleset_guideline.id).title;

        id_guideline = id_table + "_g" + (i+1) + (j+1);
      
        if (gr.rule_summary_results) {
          html += toHtmlRuleSummaryTableRow(j, id_table, id_principle, id_guideline, t, gr.rule_summary_results);
        }
        
      }  

      row_id = id + "_row_" + id_count;
      id_count += 1;
      
      html += toHtmlRuleSummaryTableRowTotal(id_table, id_principle, wcag20_nls.getNLSItemById(pr.ruleset_principle.id).title, pr.rule_summary_results);
    
    }
    
    html += "\n"; 

    var id_section ="levels";

    html += toHtmlRuleSummaryTableRowSection(id_section, "WCAG 2.0 Success Levels", "double");

    html += toHtmlRuleSummaryTableRow(0, id_table, id_section, "a", "Level A Success Criteria", a_results);
    html += toHtmlRuleSummaryTableRow(1, id_table, id_section, "aa", "Level AA Success Criteria", aa_results);
    html += toHtmlRuleSummaryTableRow(2, id_table, id_section, "aaa", "Level AAA Success Criteria", aaa_results);

    html += toHtmlRuleSummaryTableRowTotal(id_table, id_section, "", all_results);

    html += toHtmlRuleSummaryTableEnd();
    
    html += "      <ul class='references'>";
    html += toHtmlRuleSummaryTableRefs();
    html += "      </ul>";

    html += "\n"; 

    html += "    </div>\n"; 

    return html;
  
  }

  function toHtmlElementSummaryTableStart(id_table, title) {
  
    var html = "";

    html += "    <h2 id='h2_" + id_table + "'>" + title + "</h2>\n"; 
    html += "    <table class='element_summary' aria-labelledby='h2_" + id_table + "'>\n"; 
    html += "      <thead>\n";
    html += "        <tr>\n";
    html += "          <th class='rule' rowspan='2' colspan='2'></th>\n";
    html += "          <th class='type' rowspan='2' id='" + id_table + "_type'  >Type</th>\n";
    html += "          <th class='' colspan='6'>Number of Elements</th>\n";
    html += "          <th class='resources' rowspan='2' id='" + id_table + "_resources' >Resources</th>\n";    
    html += "        </tr>\n";
    html += "        <tr>\n";
    html += "          <th class='pass'      id='" + id_table + "_pass'  >Pass          <sup><a href='#" + id_table + "_sup5'>5</a></sup></th>\n";
    html += "          <th class='fail'      id='" + id_table + "_fail'  >Violations    <sup><a href='#" + id_table + "_sup6'>6</a></sup></th>\n";
    html += "          <th class='manual'    id='" + id_table + "_manual'>Manual Check  <sup><a href='#" + id_table + "_sup7'>7</a></sup></th>\n";
    html += "          <th class='hidden'    id='" + id_table + "_hidden'>Hidden        <sup><a href='#" + id_table + "_sup8'>8</a></sup></th>\n";
    html += "          <th class='na'        id='" + id_table + "_has_na'>Not Applicable<sup><a href='#" + id_table + "_sup9'>9</a></sup></th>\n";
    html += "          <th class='total'     id='" + id_table + "_total' >Total</th>\n";
    html += "        </tr>\n"; 
    html += "      </thead>\n";
    html += "      <tbody>\n";
    
    return html;
    
  }

  function toHtmlElementSummaryTableRowSection(id_section, section_title, section_class) {
 
    var html = "";
    
    if (section_class) html += "        <tr class='section " + section_class + "'>\n";
    else html += "        <tr class='section'>\n";
    
    html += "          <th class='section' id='" + id_section + "' colspan='10'>" + section_title  + "</th>\n";
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlElementSummaryTableRow(row_count, id_table, id_section, rule_result) {
 
    var cell_class = "";
 
    var total = rule_result.nodes_passed.length;
    total += rule_result.nodes_failed.length;
    total += rule_result.nodes_manual_checks.length;
    total += rule_result.nodes_hidden.length;
    total += rule_result.nodes_na.length;
    
    var id_row  = rule_result.rule.rule_id;
    var title   = rule_result.rule.getTitle();
 
    var html = "";
      
    if (row_count % 2) html += "        <tr class='odd'>\n";
    else html += "        <tr class='even'>\n";
    
    html += "          <th class='rule_id' id='" + id_row + "' headers='" + id_section + "'>" + rule_result.rule.getID() + "</th>\n";
    html += "          <td class='title' headers='" + id_row + "'>" + rule_result.rule.getTitle()  + "</td>\n";

    cell_class = "recommended";
    if (rule_result.rule_type == OpenAjax.a11y.RULE.REQUIRED)    cell_class = "required";
    if (rule_result.rule_type == OpenAjax.a11y.RULE.CONDITIONAL) cell_class = "conditional";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_type'>" + rule_result.getRuleType()  + "</td>\n";
    
    cell_class = "required_pass";
    if (rule_result.nodes_passed.length === 0) cell_class = "zero";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_pass'>" + rule_result.nodes_passed.length           + "</td>\n";
    
    cell_class = "required_fail";
    if (rule_result.nodes_failed.length === 0) cell_class = "zero";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_failed'>" + rule_result.nodes_failed.length           + "</td>\n";
    
    cell_class = "required_manual";
    if (rule_result.nodes_manual_checks.length === 0) cell_class = "zero";
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_manual'>" + rule_result.nodes_manual_checks.length     + "</td>\n";
    
    cell_class = "required_na";
    if (rule_result.nodes_hidden.length === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_hidden'>" + rule_result.nodes_hidden.length     + "</td>\n";

    cell_class = "required_na";
    if (rule_result.nodes_na.length === 0) cell_class = "zero";    
    html += "          <td class='" + cell_class + "' headers='" + id_row + " " + id_table + "_na'>" + rule_result.nodes_na.length     + "</td>\n";
    
    cell_class = "";
    if (total === 0) cell_class = "zero";    
    html += "          <td class='totals " + cell_class + "' headers='" + id_row + " " + id_table + "_totals'>"   + total + "</td>\n";
    
    // Resources 
    
    html +=  "<td><em>none</em></td>";
    
    html += "        </tr>\n";
   
    return html;
 
  }

  function toHtmlElementSummaryTableRowNoRules(id_section) {
 
    var cell_class = "";
 
    var html = "";
       
    html += "        <tr class='even'>\n";
    
    html += "          <th headers='" + id_section + "' colspan='2'><em>no rules for this success criteria</em></th>\n";
    
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    html += "          <td>&nbsp;</td>\n";
    
    html += "        </tr>\n";
   
    return html;
 
  }


  function toHtmlElementSummaryTableEnd() {

    var html = "";

    html += "      </tbody>\n";
    html += "    </table>\n"; 
    return html;
  }

  function toHtmlElementSummaryTableRefs(id_table) {

    var html = "";

    html += "    <li><sup><a id='" + id_table + "_sup5'>5</a></sup>Number of elements a rule applied that passed</li>";
    html += "    <li><sup><a id='" + id_table + "_sup6'>6</a></sup>Number of elements a rule applied that resulted in a violation</li>";
    html += "    <li><sup><a id='" + id_table + "_sup7'>7</a></sup>Number of elements a rule applied that resulted in a manual check</li>";
    html += "    <li><sup><a id='" + id_table + "_sup8'>8</a></sup>Number of elements a rule applied to but was hidden and therefore was not evaluated</li>";
    html += "    <li><sup><a id='" + id_table + "_sup9'>9</a></sup>Number of elements a rule did not apply</li>";
    return html;
  }

 

  function toHtmlWCAG20Guidelines(title_document, guideline_results, wcag20_nls) {

    var i, j, k;
    
    var html = "";
    
    var id_table;
    var id_element_table;

    var gr;
    var id_guideline;
    var id_gr;
    var title_guideline = "";

    var scr;    
    var id_scr;
    var title_success_criteria = "";
    var level_success_criteria;

    var rr;
    var id_rr;

    for (i = 0; i < guideline_results.length; i++) {

      gr    = guideline_results[i];
      id_guideline = gr.ruleset_guideline.id;
      id_gr = "gl" + id_guideline;
      title_guideline = wcag20_nls.getNLSItemById(id_guideline).title;
      
      html += "    <div id='" + id_gr + "' role='main' aria-labelledby='" + id_gr + "_summary'>\n";
      html += "      <h1 id='" + id_gr + "_summary'>Guideline " + id_guideline + " Rule Results Summary</h1>\n";
      html += "\n"; 

      var t = "Guideline " + id_guideline + " Rule Results for '" + title_document + "'";

      id_table = "gl_table_" + id_gr;

      html += toHtmlRuleSummaryTableStart(id_table, t, true);

      html += toHtmlRuleSummaryTableRowSection(id_guideline, title_guideline, true);

      for (j = 0; j < gr.success_criteria_results.length; j++) {
 
        scr = gr.success_criteria_results[j];

        level_success_criteria = wcag20_nls.getWCAG20Level(wcag20_nls.getNLSItemById(scr.ruleset_success_criterion.id).level);
        title_success_criterion = wcag20_nls.getNLSItemById(scr.ruleset_success_criterion.id).title;
        id_success_criterion    = "scr_" + scr.ruleset_success_criterion.id;
        id_scr  = id_table + id_success_criterion;
      
        if (gr.rule_summary_results) {
          html += toHtmlRuleSummaryTableRow(j, id_table, id_guideline, id_success_criterion, title_success_criterion, scr.rule_summary_results, level_success_criteria);
        }  
      }  

      html += toHtmlRuleSummaryTableRowTotal(id_table, id_guideline, title_guideline, gr.rule_summary_results, true);
        
      html += toHtmlRuleSummaryTableEnd();
    
      html += "\n"; 

      id_element_table = "gl_etable_" + id_gr;

      html += toHtmlElementSummaryTableStart(id_element_table, title_guideline);

      for (j = 0; j < gr.success_criteria_results.length; j++) {
 
        scr = gr.success_criteria_results[j];

        level_success_criteria = wcag20_nls.getWCAG20Level(wcag20_nls.getNLSItemById(scr.ruleset_success_criterion.id).level);
        title_success_criterion = wcag20_nls.getNLSItemById(scr.ruleset_success_criterion.id).title + " (" + level_success_criteria + ")";
        id_success_criterion    = "scr" + scr.ruleset_success_criterion.id;
        id_scr  = id_element_table + id_success_criterion;

        html += toHtmlElementSummaryTableRowSection(id_scr, title_success_criterion);
        
        if (scr.rule_results.length) {
        
          for (k = 0; k < scr.rule_results.length; k++ ) {
            rr = scr.rule_results[k];
          
            html += toHtmlElementSummaryTableRow(k, id_element_table, id_scr, rr);
        
          }
          
        }
        else {
          html += toHtmlElementSummaryTableRowNoRules(id_scr);        
        }

      }  

      html += toHtmlElementSummaryTableEnd();

      html += "      <ul class='references'>";
      html += toHtmlRuleSummaryTableRefs(id_gr);

      html += toHtmlElementSummaryTableRefs(id_element_table);
      
      html += "      </ul>\n"; 
      html += "    </div>\n"; 
      
    }   

    return html;
  
  }


  function toHtmlStart(title, url) {
  
    var html = "";
    
    html += "<!DOCTYPE html>\n";
    
    html += "<html>\n";
 
    html += "  <head>\n";
    html += "    <title>WCAG 2.0 Report for " + title + "</title>\n"; 
    html += "\n"; 
    html += "    <script type='text/javascript'>\n"; 
    html += "      var section_ids = []\n"; 
    html += "      section_ids.push('summary')\n"; 
    html += "      section_ids.push('gl1.1')\n"; 
    html += "      section_ids.push('gl1.2')\n"; 
    html += "      section_ids.push('gl1.3')\n"; 
    html += "      section_ids.push('gl1.4')\n"; 
    html += "      section_ids.push('gl2.1')\n"; 
    html += "      section_ids.push('gl2.2')\n"; 
    html += "      section_ids.push('gl2.3')\n"; 
    html += "      section_ids.push('gl2.4')\n"; 
    html += "      section_ids.push('gl3.1')\n"; 
    html += "      section_ids.push('gl3.2')\n"; 
    html += "      section_ids.push('gl3.3')\n"; 
    html += "      section_ids.push('gl4.1')\n"; 
    html += "      section_ids.push('images')\n"; 
    html += "      section_ids.push('controls')\n"; 
    html += "      section_ids.push('color')\n"; 
    html += "      section_ids.push('landmarks')\n"; 
    html += "      section_ids.push('links')\n"; 
    html += "      section_ids.push('lists')\n"; 
    html += "      section_ids.push('tables')\n"; 
    html += "\n"; 
    html += "      function showOption(id) {\n"; 
    html += "        var node_show = document.getElementById(id);\n";    
    html += "        var node;\n";    
    html += "\n"; 
    html += "        if (node_show) {\n";    
    html += "          for (var i = 0; i < section_ids.length; i++) {\n";    
    html += "            node = document.getElementById(section_ids[i]);\n";    
    html += "            if (node) node.style.display = 'none';\n";    
    html += "          }\n";    
    html += "          node_show.style.display = 'block';\n";    
    html += "        }\n";    
    html += "      }\n"; 
    html += "    </script>\n"; 
    html += "\n"; 
    html += "    <style type='text/css'>\n"; 
    html += "      div[role='banner'] {\n"; 
    html += "        width: 100%;\n"; 
    html += "        border-bottom: #dddddd solid thin;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='banner'] p.title {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        color: #444444;\n"; 
    html += "        font-size: 150%;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div#nav_container {\n"; 
    html += "        float: left;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        padding-top: 1em;\n"; 
    html += "        width: 10em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] h2 {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        padding-bottom: 0.25em;\n"; 
    html += "        margin-bottom: 0.25em;\n"; 
    html += "        font-size: 100%;\n"; 
    html += "        color: #444444;\n"; 
    html += "        text-align: center;\n"; 
    html += "        border-bottom: #dddddd solid thin;\n"; 
    html += "      }\n"; 
    html += "      div[role='navigation'] ul {\n"; 
    html += "        margin: 0;\n"; 
    html += "        padding: 0;\n"; 
    html += "        width: 90%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] a {\n"; 
    html += "        width: 100%;\n"; 
    html += "        display: block;\n"; 
    html += "        font-size: 100%;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "        color: #111111;\n"; 
    html += "        background-color: #DDDDDD;\n"; 
    html += "        border: thin solid transparent;\n"; 
    html += "        padding: 0.25em;\n"; 
    html += "        margin-bottom: 1px;\n"; 
    html += "        text-decoration: none;\n"; 
    html += "        text-align: right;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='navigation'] a:focus,\n"; 
    html += "      div[role='navigation'] a:hover {\n"; 
    html += "        color: black;\n"; 
    html += "        background-color: #CCCCCC;\n"; 
    html += "        border: thin solid #BBBBBB;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] {\n"; 
    html += "        margin-left: 11em;\n"; 
    html += "        height: 40em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] h1 {\n"; 
    html += "        font-size: 150%;\n"; 
    html += "        text-align: center;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] h2 {\n"; 
    html += "        font-size: 125%;\n"; 
    html += "        text-align: left;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table {\n"; 
    html += "        margin-bottom: 1.5em;\n";      
    html += "        border-collapse: collapse;\n";      
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table th.rule {\n"; 
    html += "        max-width: 25%;"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table th.type,\n"; 
    html += "      div[role='main'] table th.pass,\n"; 
    html += "      div[role='main'] table th.fail,\n"; 
    html += "      div[role='main'] table th.manual,\n"; 
    html += "      div[role='main'] table th.hidden,\n"; 
    html += "      div[role='main'] table th.na,\n"; 
    html += "      div[role='main'] table th.resources,\n"; 
    html += "      div[role='main'] table th.required_pass,\n"; 
    html += "      div[role='main'] table th.required_fail,\n"; 
    html += "      div[role='main'] table th.required_manual,\n"; 
    html += "      div[role='main'] table th.required_na,\n"; 
    html += "      div[role='main'] table th.recommended_pass,\n"; 
    html += "      div[role='main'] table th.recommended_fail,\n"; 
    html += "      div[role='main'] table th.recommended_manual,\n"; 
    html += "      div[role='main'] table th.recommended_na,\n"; 
    html += "      div[role='main'] table th.totals {\n"; 
    html += "        width: 9%;\n"; 
    html += "        max-width: 4em;\n"; 
    html += "        vertical-align: bottom;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table th.rule_id {\n"; 
    html += "        min-width: 5.5em;\n"; 
    html += "        max-width: 8em;\n"; 
    html += "        vertical-align: bottom;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.section th {\n"; 
    html += "        padding-top: 1em;\n"; 
    html += "        text-align: left;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "        font-size: 110%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.double th,\n"; 
    html += "      div[role='main'] table tr.double td {\n"; 
    html += "        padding-top: 3em;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table thead th,\n"; 
    html += "      div[role='main'] table td {\n"; 
    html += "        text-align: center;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table thead th[colspan] {\n"; 
    html += "        font-size: 125%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tbody th {\n"; 
    html += "        text-align: left;\n"; 
    html += "        font-weight: normal;\n";     
    html += "      }\n"; 
    html += "      \n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even th,\n"; 
    html += "      div[role='main'] table tr.even td {\n"; 
    html += "        background-color: #DDDDDD;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.totals th,\n"; 
    html += "      div[role='main'] table tr.totals td {\n"; 
    html += "        border-top: solid black thin;\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table td.title {\n"; 
    html += "        text-align: left;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.totals th {\n"; 
    html += "        text-align: right;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.totals,\n"; 
    html += "      div[role='main'] table tr.odd  td.totals {\n"; 
    html += "        font-weight: bold;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required_pass,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_pass {\n"; 
    html += "        color: #007800;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required,\n"; 
    html += "      div[role='main'] table tr.odd  td.required,\n"; 
    html += "      div[role='main'] table tr.even td.required_fail,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_fail {\n"; 
    html += "        color: #900000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.required_manual,\n"; 
    html += "      div[role='main'] table tr.odd  td.required_manual {\n"; 
    html += "        color: #900000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended_pass,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_pass {\n"; 
    html += "        color: #007800;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended,\n"; 
    html += "      div[role='main'] table tr.even td.recommended_fail,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_fail {\n"; 
    html += "        color: #806000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table tr.even td.recommended_manual,\n"; 
    html += "      div[role='main'] table tr.odd  td.recommended_manual {\n"; 
    html += "        color: #806000;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] table td.zero {\n"; 
    html += "        color: gray;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] ul.references {\n"; 
    html += "        list-style: none;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "      div[role='main'] sup a {\n"; 
    html += "        color: gray;\n"; 
    html += "        text-decoration: none;\n"; 
    html += "        font-size: 80%;\n"; 
    html += "      }\n"; 
    html += "      \n"; 
    html += "    </style>\n"; 
    html += "\n"; 
    html += "  </head>\n";
    html += "\n"; 
 
    html += "  <body onload=\"showOption('summary');\">\n";
    html += "    <div role='banner'>\n";    
    html += "      <p class='title'>WCAG 2.0 Report for " + title + "</p>\n"; 
    html += "      <p class='url'>URL: " + url + "</p>\n"; 
    html += "    </div>\n";
    html += "    <div id='nav_container'>\n";    
    html += "      <div role='navigation' aria-labelledby='wcag20_nav'>\n";    
    html += "        <h2 id='wcag20_nav'>WCAG 2.0 Options</h2>\n"; 
    html += "        <ul>\n";   
    html += "          <li><a href=\"javascript:showOption('summary');\">Summary</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.1');\">Guideline 1.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.2');\">Guideline 1.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.3');\">Guideline 1.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl1.4');\">Guideline 1.4</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.1');\">Guideline 2.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.2');\">Guideline 2.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.3');\">Guideline 2.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl2.4');\">Guideline 2.4</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.1');\">Guideline 3.1</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.2');\">Guideline 3.2</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl3.3');\">Guideline 3.3</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('gl4.1');\">Guideline 4.1</a></li>\n";   
    html += "        </ul>\n";   
    html += "      </div>\n";    
    html += "      <div role='navigation' aria-labelledby='element_nav'>\n";    
    html += "        <h2 id='element_nav'>Element Options</h2>\n"; 
    html += "        <ul>\n";   
    html += "          <li><a href=\"javascript:showOption('images');\"   >Images</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('controls');\" >Controls</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('color');\"    >Color Contrast</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('landmarks');\">Landmarks</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('links');\"    >Links</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('lists');\"    >Lists</a></li>\n";   
    html += "          <li><a href=\"javascript:showOption('tables');\"   >Tables</a></li>\n";   
    html += "        </ul>\n";   
    html += "      </div>\n";     
    html += "    </div>\n";     
    return html;
    
  }  

  function toHtmlEnd() {
  
    var html = "";
     
    html += "  </body>\n";

    html += "</html>\n";
    
    return html;    
  }  


  var i, j, k, l;  // loop counters

  var pr;

  var wcag20_nls = OpenAjax.a11y.all_wcag20_nls;
 
  var html = "";

  var id_count = 1;
  var id;

  html += toHtmlStart(this.title, this.url);
  
  html += toHtmlWCAG20Summary(this.title, this.principle_results, this.rule_a_summary_results, this.rule_aa_summary_results, this.rule_aaa_summary_results, this.rule_summary_results, wcag20_nls);
  
  for (i = 0; i < this.principle_results.length; i++ ) {

    pr = this.principle_results[i];

    html += toHtmlWCAG20Guidelines(this.title, pr.guideline_results, wcag20_nls);
    
  }  

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
 * @param  {RulesetPrinciple}  ruleset_principle  - Ruleset Principle object
 *
 * @property  {WCAG20RulesetPrinciple}   ruleset_principle        - Reference to the associated ruleset principle
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_guidelines        - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultPrinciple = function (ruleset_principle) {

  this.ruleset_principle = ruleset_principle;
  this.rule_summary_results = new OpenAjax.a11y.ResultRuleSummary();
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
 * @param  {WCAG20RulesetGuideline}  ruleset_guideline  - Ruleset guideline object
 *
 * @property  {WCAG20RulesetGuideline}   ruleset_guideline        - Reference to the associated ruleset guideline
 * @property  {ResultSummaryRule}        rule_summary_results     - Reference to the rule summary information for the guideline 
 * @property  {Array}                    result_sucess_creiteria  - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultGuideline = function (ruleset_guideline) {

  this.ruleset_guideline = ruleset_guideline;
  this.rule_summary_results = new OpenAjax.a11y.ResultRuleSummary();
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
 * @param  {RulesetSuccessCriterion}  ruleset_success_criterion  - Ruleset Success Criterion object
 *
 * @property  {Object}   ruleset_success_criteria  - Reference to the associated ruleset success criteria
 * @property  {Array}    rule_summary_results      - Array of ruleset rule objects associated with the success criterion
 */
 
OpenAjax.a11y.WCAG20ResultSuccessCriterion = function (ruleset_success_criterion) {

  this.ruleset_success_criterion = ruleset_success_criterion;
  this.rule_summary_results      = new OpenAjax.a11y.ResultRuleSummary();
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

  this.rule_results.push(rule_result);
  this.rule_summary_results.addRuleResult(rule_result);
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

