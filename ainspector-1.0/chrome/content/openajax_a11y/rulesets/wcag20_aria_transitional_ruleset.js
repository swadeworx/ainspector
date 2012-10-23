/**
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

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Ruleset for WCAG 2.0 Transitional (Beta)           */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.all_rulesets.addRuleset('WCAG20', {

  title : {
    'default' : "WCAG 2.0 ARIA Transitional",
    'en-us'   : "WCAG 2.0 ARIA Transitional"
  },   

  description : {
    'default' : "The ARIA transitional ruleset is based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications.",
    'en-us'   : "The ARIA transitional ruleset is based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications."  
  },
  
  author : {
    name : "OpenAjax Accessibility Working Group",
    url  : "http://www.openajax.org/member/wiki/Accessibility"
  }, 
  
 
  ruleset_id    : "WCAG20_ARIA_TRANS",
  version       : "0.6 beta",
  last_updated  : "2012-06-18",

  // Assignement of rules to WCAG 2.0 requirements

  rule_mappings : {
   COLOR_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   COLOR_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_5 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_7 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_8 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_9 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_10 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_11 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   CONTROL_12 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   HEADING_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   HEADING_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_1 : {  
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   IMAGE_4_EN : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_5 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   IMAGE_6 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   LANDMARK_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LANDMARK_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LINK_1 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LINK_2 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LINK_3 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   LINK_4 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   TABLE_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   TABLE_2T : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   TABLE_3 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   TABLE_4 : {
       type     : OpenAjax.a11y.RULE.RECOMMENDED,
       enabled  : true
     },
   TITLE_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   TITLE_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   WIDGET_1 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     },
   WIDGET_2 : {
       type     : OpenAjax.a11y.RULE.REQUIRED,
       enabled  : true
     }
  } 
});


