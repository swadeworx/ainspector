/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object HEADING_1
 *
 * @desc Page contains at least one H1 element and each H1 element has content
 *       If there are main landmarks the H1 elements are children of the main landmarks
 */	     	     	     
{ rule_id             : 'HEADING_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.2', '2.4.6', '2.4.10'],
  target_resources    : ['h1'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'name', 'name_length'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
 
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
  
      var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
      var h1_elements_len = h1_elements.length;
      
      var page_element = dom_cache.headings_landmarks_cache.page_element;
      
      var h1_count = 0;
      
      if (h1_elements && h1_elements_len) {
      
        for (var i = 0; i < h1_elements_len; i++ ) {
          var he = h1_elements[i];

          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', []);                      
          }
          else {
            if (he.name && he.name.length) {
              rule_result.addResult(TEST_RESULT.PASS, he, 'PASS_1', []);
              h1_count++;
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, he, 'CORRECTIVE_ACTION_2', []);
            }
          }  
        }
      }

     if (page_element) {
       // Test if no h1s
       if (h1_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
       else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS_1', []);
     } 
  } // end validate function
}, 

/**
 * @object HEADING_2
 *
 * @desc If there are main landmarks and H1 elements, H1 elements should be children of main landmarks 
 *
 */	     	     	     
{ rule_id             : 'HEADING_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.1', '2.4.2', '2.4.10'],
  target_resources    : ['h1'],
  cache_dependency    : 'headings_landmarks_cache',
  
  resource_properties    : ['tag_name', 'id', 'name', 'main_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
    var h1_elements_len = h1_elements.length;

    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;

    if (main_elements && h1_elements && main_elements_len && h1_elements_len) {
      
      for (var i = 0; i < h1_elements_len; i++) {
        var he = h1_elements[i];
        var de = he.dom_element;
        
        if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
          rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', []);                      
        }
        else {
          if (he.is_child_of_main) rule_result.addResult(TEST_RESULT.PASS, he, 'PASS_1', []);
          else rule_result.addResult(TEST_RESULT.FAIL, he, 'CORRECTIVE_ACTION_1', []);
        }
        
      }
    }
  } // end validate function
},

/**
 * @object HEADING_3
 *
 * @desc Sibling headings of the same level that share the same parent heading should be unique
 *       This rule applies only when there are no main landmarks on the page and at least one 
 *       sibling heading
 *
 */	     	     	     
{ rule_id             : 'HEADING_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    function getSiblingHeadings(index, heading_element) {
   
      var list = [];
      
      list.push(heading_element);
            
      for (var i = index; i < heading_elements_len; i++) {
        
        var he = heading_elements[i];
        
        if (heading_element.level < he.level) return list;
        
        if (heading_element.level === he.level) {
          list.push(he);
          tested_list.push(he);
        }  

      }
        
      return list;
   
    }

    function notInTestedList(he) {
    
      for (var i = 0; i < tested_list.length; i++) {
        if (tested_list[i] === he) return false;
      }
    
      return true;
    }

    function notInDoneList(he) {
    
      for (var i = 0; i < done_list.length; i++) {
        if (done_list[i] === he) return false;
      }
    
      return true;
    }


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;
    
    var tested_list = [];
    var done_list   = [];
    var i, j, k;
    var sibling_headings = [];
    var sibling_headings_len = 0;

    if (main_elements_len === 0 && heading_elements_len > 1) {
    
      for (i = 0; i < (heading_elements_len-1); i++) {
      
        var he = heading_elements[i];
        
        if (notInTestedList(he)) sibling_headings = getSiblingHeadings(i+1, he);
        
        sibling_headings_len = sibling_headings.length;
      
        if (sibling_headings_len > 1) {
        
          for (j = 0; j < (sibling_headings_len-1); j++) {
          
            var sh1 = sibling_headings[j];
            var first_flag = true;
            
            if (notInDoneList(sh1) && sh1.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            
              for (k = j+1; k < sibling_headings_len; k++) {
                var sh2 = sibling_headings[k];
                
                if (sh1.name_for_comparison === sh2.name_for_comparison) {
                  if (first_flag) { 
                    rule_result.addResult(TEST_RESULT.FAIL, sh1, 'CORRECTIVE_ACTION_1', [sh1.dom_element.tag_name]); 
                    done_list.push(sh1);
                  }  
                  rule_result.addResult(TEST_RESULT.FAIL, sh2, 'CORRECTIVE_ACTION_1', [sh2.dom_element.tag_name]);
                  done_list.push(sh2);
                  first_flag = false;
                }
              }      
            }  
          }
          
          for (j = 0; j < sibling_headings_len; j++) {
            var sh = sibling_headings[j];
            if (notInDoneList(sh)) { 
              if (sh.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
                rule_result.addResult(TEST_RESULT.PASS, sh, 'PASS_1', [sh.dom_element.tag_name]);
              }
              else {
                rule_result.addResult(TEST_RESULT.HIDDEN, sh, 'HIDDEN', [sh.dom_element.tag_name]);              
              }
              done_list.push(sh);
            }  
          }
        }
      
      }
           
    }
    
  } // end validate function
},

/**
 * @object HEADING_4
 *
 * @desc Headings should describe the content of the section they label
 *
 */	     	     	     
{ rule_id             : 'HEADING_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-06-31', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '2.4.10'],
  target_resources    : ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var h1_elements     = dom_cache.headings_landmarks_cache.h1_elements;
    var h1_elements_len = h1_elements.length;

    var i;
    var he;
    var de;

    for (i = 0; i < h1_elements_len; i++ ) {
      he = h1_elements[i];
      de = he.dom_element;
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', [de.tag_name]);                      
      }
      else {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'MANUAL_CHECK_1', [de.tag_name]);
      }  
    }

    var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
    var heading_elements_len = heading_elements.length;

    for (i = 0; i < heading_elements_len; i++ ) {
      he = heading_elements[i];
      de = he.dom_element;
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, he, 'HIDDEN', [de.tag_name]);                      
      }
      else {
        rule_result.addResult(TEST_RESULT.MANUAL_CHECK, he, 'MANUAL_CHECK_1', [de.tag_name]);
      }  
    }
  } // end validate function
}
]); 


    

