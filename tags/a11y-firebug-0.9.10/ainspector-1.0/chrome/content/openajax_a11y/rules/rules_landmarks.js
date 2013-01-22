/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object LANDMARK_1
 *
 * @desc Each page should have at least one main landmark
 *
 */	     	     	     
{ rule_id             : 'LANDMARK_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['[role="main"]'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'role', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var main_elements     = dom_cache.headings_landmarks_cache.main_elements;
    var main_elements_len = main_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var main_count = 0;

    for (var i = 0; i < main_elements_len; i++ ) {
      var me = main_elements[i];
      if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', []);                      
      }
      else {
        main_count++;
        rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', []);
      }  
    }

    if (page_element) {
      // Test if no h1s
      if (main_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS_1', []);
    } 
    
  } // end validate function
},

/**
 * @object LANDMARK_2
 *
 * @desc All rendered content should be contained in a landmark
 */	     	     	     
{ rule_id             : 'LANDMARK_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '1.3.1',
  wcag_related_ids    : ['2.4.1', '2.4.6', '2.4.10'],
  target_resources    : ['all'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'parent_landmark'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var elements_with_content    = dom_cache.headings_landmarks_cache.elements_with_content;
    var elements_with_content_len = elements_with_content.length;
    
    var tag_name = "";

    for (var i = 0; i < elements_with_content_len; i++ ) {
      var de =elements_with_content[i];
      
      if (de.tag_name) tag_name = de.tag_name;
      else tag_name = de.parent_element.tag_name;

//      OpenAjax.a11y.logger.debug("  Content: " + de.toString()  +  " " + de.may_have_renderable_content);
      
      if (de.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [tag_name]);                      
      }
      else {
        if (de.parent_landmark) {
          rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [tag_name, de.parent_landmark.role]);
        }
        else {
          if (de.may_have_renderable_content) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [tag_name]);
          else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [tag_name]);
        }  
      }  
    }    
  } // end validate function
},

/**
 * @object LANDMARK_2N
 *
 * @desc Each page should have at least one navigation landmark
 *
 */	     	     	     
{ rule_id             : 'LANDMARK_2N', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['[role="navigation"]'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties : ['tag_name', 'role', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    
    var LANDMARK_ROLE = 'navigation';

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var tag_name = le.dom_element.tag_name;
      
      if (le.role === LANDMARK_ROLE) {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
          rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name]);                      
        }
        else {
          landmark_count++;
          rule_result.addResult(TEST_RESULT.PASS, le, 'PASS_1', [tag_name]);
        }  
      }  
    }

    if (page_element) {
      // Test if no navigation landmarks
      if (landmark_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS_1', []);
    } 
    
  } // end validate function
},

/**
 * @object LANDMARK_2B
 *
 * @desc Each page should have at least one banner landmark
 *
 */	     	     	     
{ rule_id             : 'LANDMARK_2B', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['[role="navigation"]'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'role', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    
    var LANDMARK_ROLE = 'banner';

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var tag_name = le.dom_element.tag_name;
      
      if (le.role === LANDMARK_ROLE) {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
          rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name]);                      
        }
        else {
          landmark_count++;
          rule_result.addResult(TEST_RESULT.PASS, le, 'PASS_1', [tag_name]);
        }  
      }  
    }

    if (page_element) {
      // Test if no navigation landmarks
      if (landmark_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS_1', []);
    } 
    
  } // end validate function
},

/**
 * @object LANDMARK_2CI
 *
 * @desc Each page should have at least one content information or complementary landmark
 *
 */	     	     	     
{ rule_id             : 'LANDMARK_2CI', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LANDMARKS,
  last_updated        : '2012-07-14', 
  wcag_primary_id     : '2.4.1',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['[role="navigation"]'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'role', 'name'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;
  
    var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
    var landmark_elements_len = landmark_elements.length;

    var page_element = dom_cache.headings_landmarks_cache.page_element;

    var landmark_count = 0;
    
    var LANDMARK_ROLE_1 = 'contentinfo';
    var LANDMARK_ROLE_2 = 'complementary';

    for (var i = 0; i < landmark_elements_len; i++ ) {
      var le = landmark_elements[i];
      var tag_name = le.dom_element.tag_name;
      if (le.role === LANDMARK_ROLE_1 || le.role === LANDMARK_ROLE_2) {
        if (le.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
          rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [tag_name, le.role]);                      
        }
        else {
          landmark_count++;
          rule_result.addResult(TEST_RESULT.PASS, le, 'PASS_1', [tag_name, le.role]);
        }  
      }  
    }

    if (page_element) {
      // Test if no navigation landmarks
      if (landmark_count === 0) rule_result.addResult(TEST_RESULT.FAIL, page_element, 'CORRECTIVE_ACTION_1', []);
      else rule_result.addResult(TEST_RESULT.PASS, page_element, 'PASS_1', []);
    } 
    
  } // end validate function
}



]); 


    

