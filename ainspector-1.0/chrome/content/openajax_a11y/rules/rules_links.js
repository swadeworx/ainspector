/**
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
/*            OpenAjax Alliance Link Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object LINK_1 
 * 
 * @desc Links should have minimum dimensions for selecting and reading
 */
 
{ id                : 'LINK_1', 
  last_updated      : '2011-07-11', 
  cache_dependency  : 'links_cache',
  cache_properties : ['height', 'width', 'graphical'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

   var SEVERITY   = OpenAjax.a11y.SEVERITY;
   var VISIBILITY = OpenAjax.a11y.VISIBILITY;

   var i;   
   var MIN_HEIGHT = 12;
   var MIN_WIDTH = 12;

   var passed = true;
   var node_result = null;
   
   var link_elements_len;
   var link_element;
   var computed_style;
   
   // Check to see if valid cache reference
   if (dom_cache.links_cache.link_elements) {
     
    link_elements_len = dom_cache.links_cache.link_elements.length;
    
    for (i=0; i < link_elements_len; i++) {
    
     link_element = dom_cache.links_cache.link_elements[i];
     computed_style = link_element.dom_element.computed_style;
     
     // test if link is visible in a graphical rendering
     
     if (computed_style.is_visible_onscreen == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
      if (link_element.href && link_element.href.length) {       
       
       if (link_element.height && 
         link_element.width) {
       
        if ((link_element.height > MIN_HEIGHT) && 
          (link_element.width > MIN_WIDTH)) {
          rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, link_element, 'MESSAGE_PASS', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
        else {
         rule_result.addResult(SEVERITY.FAIL, link_element, 'MESSAGE_TO_SMALL', [link_element.height, link_element.width, MIN_HEIGHT, MIN_WIDTH]);
        }
       }
       else {
         rule_result.addResult(rule_result.MANUAL_CHECK, link_element, 'MESSAGE_MANUAL', []);
       }
      } 
      else {
       rule_result.addResult(OpenAjax.a11y.SEVERITY.NA, link_element, 'MESSAGE_NA', []);
      }
     } 
     else {
      rule_result.addResult(OpenAjax.a11y.SEVERITY.HIDDEN, link_element, 'MESSAGE_HIDDEN', []);
     } // endif
     
    } // end loop
   } 
  } // end valifdation function
 },
      
/*
 * @object LINK_2
 *
 * @desc Links with the same HREF should have the same link text.
 */
	     
{
  id                : 'LINK_2', 
  last_updated      : '2011-07-11', 
  cache_dependency  : 'links_cache',
  cache_properties : ['name', 'href'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dh;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_href_items     = dom_cache.links_cache.duplicate_href_items;
      var duplicate_href_items_len = duplicate_href_items.length;
      
      var all_share_same_name;

      for (i = 0; i < duplicate_href_items_len; i++) {
        dh = duplicate_href_items[i];
        
        all_share_same_name = true;
        
        link_elements     = dh.link_elements;
        link_elements_len = link_elements.length;
        
        for (j = 0; j < link_elements_len; j++) {
          if (link_elements[j].name_for_comparison !== dh.name_for_comparison) all_share_same_name = false;
        } // end loop
        
        for (j = 0; j < link_elements_len; j++) {
          le = link_elements[j];
          if (all_share_same_name) {
            rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_PASS', [link_elements_len]);
          }
          else {
            rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop
   
  } // end validate function
 },

/**
 * @object LINK_3
 *
 * @desc Links with the different HREFs should have the unique link text.
 */ 
	     
 {
  id                : 'LINK_3', 
  last_updated      : '2011-07-11', 
  groupCode         : 'GROUP_11',
  cache_dependency  : 'links_cache',
  cache_properties : ['name', 'href'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var i, j;

      var dn;
      var le;

      var link_elements;
      var link_elements_len;

      var duplicate_name_items     = dom_cache.links_cache.duplicate_name_items;
      var duplicate_name_items_len = duplicate_name_items.length;
      
      var all_share_same_href;

      for (i = 0; i < duplicate_name_items_len; i++) {
        dn = duplicate_name_items[i];
        
        all_share_same_href = true;
        
        link_elements     = dn.link_elements;
        link_elements_len = link_elements.length;
        
        for (j = 0; j < link_elements_len; j++) {
          if (link_elements[j].href !== dn.href) all_share_same_href = false;
        } // end loop
        
        for (j = 0; j < link_elements_len; j++) {
          le = link_elements[j];
          if (all_share_same_href) {
            rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_PASS', [link_elements_len]);
          }
          else {
            rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_FAIL', [link_elements_len]);          
          }
        } // end loop
        
      } // end loop

  } // end validate function
 }
]); 


    

