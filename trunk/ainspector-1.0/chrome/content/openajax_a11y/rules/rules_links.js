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

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Link Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/*
 * @object LINK_1
 *
 * @desc Links with the same HREF should have the same link text.
 */
	     
{ rule_id             : 'LINK_1', 
  last_updated        : '2012-09-22', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  last_updated        : '2012-09-22', 
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  cache_dependency    : 'links_cache',
  resource_properties : ['accessible_name', 'accessible_name_source', 'href'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
    function updateResults(start, end, test_result, message) {
    
      for (var i = start; i < end; i++) {
      
        var le = visible_links_sorted_by_name[i];
      
        OpenAjax.a11y.logger.debug("  Update Item: " + i + " of " + end + " le: " + le.toString());

        var tag_name  = le.dom_element.tag_name;
              
        rule_result.addResult(test_result, le,  message, [tag_name, ((end - start) + 1)]);        
      }
      
    }

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    
    var links_sorted_by_name     = dom_cache.links_cache.links_sorted_by_name;
    var links_sorted_by_name_len = links_sorted_by_name.length;

    var visible_links_sorted_by_name = [];
    
    for (var i = 0; i < links_sorted_by_name_len; i++) {
      
      var le = links_sorted_by_name[i];
      var tag_name = le.dom_element.tag_name;
      
      if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        visible_links_sorted_by_name.push(le);
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name]);                  
      }
      
    }
    
    var visible_links_sorted_by_name_len = visible_links_sorted_by_name.length - 1;

    OpenAjax.a11y.logger.debug("== LINK RULE 2 ==");
    OpenAjax.a11y.logger.debug("  Number of visible links: " +  visible_links_sorted_by_name_len );

    for (i = 0; i < visible_links_sorted_by_name_len; i++) {

      var le1 = visible_links_sorted_by_name[i];
      var de1 = le1.dom_element;
      
      var le1_href           = le1.href;
      var le1_name           = le1.accessible_name_for_comparison;
      var le1_tag_name       = de1.tag_name;

      var j = i+1;
     
      var le2 = visible_links_sorted_by_name[j];
      var de2 = le2.dom_element;
      
      var le2_href           = le2.href;
      var le2_name           = le2.accessible_name_for_comparison;

      OpenAjax.a11y.logger.debug("  Item " + i + ": " + le1_href + " ('" + le1.accessible_name + "')  Item " + j + ": " + le2_href + " ('" + le2.accessible_name + "')");

      if (le1_href === le2_href) {
      
        var same_name_count        = 0;
        var same_href_count        = 0;
          
        while ((j < (visible_links_sorted_by_name_len+1)) && 
               (le1_name === le2_name)) {
            
          same_href_count++;
            
          if (le1_name === le2_name) same_name_count++;

          j++;
          le2 = links_sorted_by_name[j];
          de2 = le2.dom_element;
            
          le2_name           = le2.accessible_name_for_comparison;
          le2_description    = de2.accessible_description_for_comparison;
            
        }
          
        if (same_href_count === same_name_count) updateResults(i, j, TEST_RESULT.PASS, 'PASS_2');
        else if (same_href_count === 2) updateResults(i, j, TEST_RESULT.MANUAL_CHECK, 'MANUAL_CHECK_1');
          else updateResults(i, j, TEST_RESULT.FAIL, 'CORRECTIVE_ACTION_1');
          
        i = j;

      }
      else {
        rule_result.addResult(TEST_RESULT.PASS, le1, 'PASS_1', [le1_tag_name]);
      }
        
    }  // end loop  
    
    if ((j <= visible_links_sorted_by_name_len) && (le1_href != le2_href)) {
      rule_result.addResult(TEST_RESULT.PASS, le2, 'PASS_1', [de2.tag_name]);    
    }
   
  } // end validate function
 },

/**
 * @object LINK_2
 *
 * @desc Links with the different HREFs should have the unique link text.
 */ 
	     
{ rule_id             : 'LINK_2', 
  last_updated        : '2012-09-22', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  last_updated        : '2012-09-22', 
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  cache_dependency    : 'links_cache',
  resource_properties : ['accessible_name', 'accessible_name_source', 'href', 'accessible_description'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function updateResults(start, end, test_result, message) {
    
      for (var i = start; i < end; i++) {
      
        var le = visible_links_sorted_by_name[i];
      
        OpenAjax.a11y.logger.debug("  Update Item: " + i + " of " + end + " le: " + le.toString());

        var tag_name  = le.dom_element.tag_name;
              
        rule_result.addResult(test_result, le,  message, [tag_name, ((end - start) + 1)]);        
      }
      
    }

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    
    var links_sorted_by_name     = dom_cache.links_cache.links_sorted_by_name;
    var links_sorted_by_name_len = links_sorted_by_name.length;

    var visible_links_sorted_by_name = [];
    
    for (var i = 0; i < links_sorted_by_name_len; i++) {
      
      var le = links_sorted_by_name[i];
      var tag_name = le.dom_element.tag_name;
      
      if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        visible_links_sorted_by_name.push(le);
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name]);                  
      }
      
    }
    
    var visible_links_sorted_by_name_len = visible_links_sorted_by_name.length - 1;

//    OpenAjax.a11y.logger.debug("== LINK RULE 2 ==");
//    OpenAjax.a11y.logger.debug("  Number of visible links: " +  visible_links_sorted_by_name_len );

    for (i = 0; i < visible_links_sorted_by_name_len; i++) {

      var le1 = visible_links_sorted_by_name[i];
      var de1 = le1.dom_element;
      
      var le1_name           = le1.accessible_name_for_comparison;
      var le1_description    = le1.accessible_description_for_comparison;
      var le1_tag_name       = de1.tag_name;

      var j = i+1;
     
      var le2 = visible_links_sorted_by_name[j];
      var de2 = le2.dom_element;
      
      var le2_name           = le2.accessible_name_for_comparison;
      var le2_description    = le2.accessible_description_for_comparison;

//      OpenAjax.a11y.logger.debug("  Item " + i + ": " + le1_name + " ('" + le1.accessible_name + "')  Item " + j + ": " + le2_name + " ('" + le2.accessible_name + "')");

      if (le1_name === le2_name) {
      
        var same_name_count        = 0;
        var same_href_count        = 0;
        var same_description_count = 0;
          
        while ((j < (visible_links_sorted_by_name_len+1)) && 
               (le1_name === le2_name)) {
            
          same_name_count++;
            
          if (le1.href === le2.href) same_href_count++;
          if (le1_description === le2_description) same_description_count++;

          OpenAjax.a11y.logger.debug("  Desc " + i + ": " + le1_description + " ('" + le1.name + "')  Desc " + j + ": " + le2_description + " ('" + le2.accessible_name + "') count= " + same_description_count);

          j++;
          le2 = links_sorted_by_name[j];
          de2 = le2.dom_element;
            
          le2_name           = le2.accessible_name_for_comparison;
          le2_description    = de2.accessible_description_for_comparison;
            
        }
          
        if (same_href_count === same_name_count) updateResults(i, j, TEST_RESULT.PASS, 'PASS_2');
        else if (same_description_count === 0) updateResults(i, j, TEST_RESULT.PASS, 'PASS_3');
          else updateResults(i, j, TEST_RESULT.FAIL, 'CORRECTIVE_ACTION_1');
          
        i = j;

      }
      else {
        rule_result.addResult(TEST_RESULT.PASS, le1, 'PASS_1', [le1_tag_name]);
      }
        
    }  // end loop  
    
    if ((j <= visible_links_sorted_by_name_len) && (le1_name != le2_name)) {
      rule_result.addResult(TEST_RESULT.PASS, le2, 'PASS_1', [de2.tag_name]);    
    }

  } // end validate function
 },
 
/**
 * @object LINK_3 
 * 
 * @desc Links should have minimum dimensions for selecting and reading
 */
 
{ rule_id             : 'LINK_3', 
  last_updated        : '2012-09-22', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  cache_dependency    : 'links_cache',
  resource_properties    : ['height', 'width', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    
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
    
      for (var i=0; i < link_elements_len; i++) {
      
    
        link_element = dom_cache.links_cache.link_elements[i];
        computed_style = link_element.dom_element.computed_style;

        var tag_name = link_element.dom_element.tag_name;

        // test if link is visible in a graphical rendering
     
        if (computed_style.is_visible_onscreen == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
          if (link_element.href && link_element.href.length) {       
       
            if ((typeof link_element.height === 'number') && 
                (typeof link_element.width  === 'number')) {
       
              if ((link_element.height > MIN_HEIGHT) && 
                 (link_element.width > MIN_WIDTH)) {
                rule_result.addResult(TEST_RESULT.PASS, link_element, 'PASS', [tag_name]);
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, link_element, 'CORRECTIVE_ACTION_1', [tag_name, link_element.height, link_element.width]);
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, link_element, 'MANUAL_CHECK_1', [tag_name]);
            }
          } 
        } 
        else {
          rule_result.addResult(OpenAjax.a11y.SEVERITY.HIDDEN, link_element, 'HIDDEN', [tag_name]);
        } // endif
      } // end loop
    } 
    
  } // end valifdation function
},

/**
 * @object LINK_4 
 * 
 * @desc Link should describe the target of a link
 */
 
{ rule_id             : 'LINK_4', 
  last_updated        : '2012-09-22', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LINKS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '2.4.4',
  wcag_related_ids    : ['2.4.9'],
  target_resources    : ['a', 'area', '[role=link]'],
  cache_dependency    : 'links_cache',
  resource_properties : ['accessible_name', 'accessible_name_source', 'href', 'accessible_description'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    
    var link_elements     = dom_cache.links_cache.link_elements;
    var link_elements_len = link_elements.length;

    var visible_link_elements = [];
    
    for (var i = 0; i < link_elements_len; i++) {
      
      var le = link_elements[i];
      var tag_name = le.dom_element.tag_name;
      
      if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        visible_link_elements.push(le);
      }
      else {
        rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name]);                  
      }
      
    }
    
    var visible_link_elements_len = visible_link_elements.length;

    for (i = 0; i < visible_link_elements_len; i++) {

      le = visible_link_elements[i];
      
      var name        = le.accessible_name_for_comparison;
      var description = le.accessible_description_for_comparison;
      tag_name        = le.dom_element.tag_name;

      if (name.length) {
        if (description.length) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'MANUAL_CHECK_2', [tag_name, name, description]);
        else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, le, 'MANUAL_CHECK_1', [tag_name, name]);
      }  
      else {
        rule_result.addResult(TEST_RESULT.FAIL, le, 'CORRECTIVE_ACTION_1', [tag_name]);
      }
      
    }  // end loop  
    
    
  } // end valifdation function
}

      
]); 


    

