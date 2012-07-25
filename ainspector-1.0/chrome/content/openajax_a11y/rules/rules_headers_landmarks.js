/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object HEADING_1
 *
 * @desc Each page should contain at least one H1 element and each H1 element must have content
 *
 */	     	     	     
 {
{ rule_id           : 'HEADING_1', 
  rule_scope        : OpenAjax.a11y.RULE_SCOPE.PAGE,
  last_updated      : '2012-06-31', 
  wcag_primary_id   : '1.1.1',
  wcag_related_ids  : [],
  target_resources  : ['h1'],
  cache_dependency  : 'title_main_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {
 
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SOURCE      = OpenAjax.a11y.SOURCE;
  
      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (var i = 0; i < main_elements_len; i++ ) {
          var me = main_elements[i];

          if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(TEST_RESULT.HIDDEN, me, 'MESSAGE_H1_HIDDEN', []);                      
          }
          else {
            if (me.dom_element.tag_name == 'h1') {
              if (me.name && me.name_length > 0) {
                rule_result.addResult(TEST_RESULT.PASS, me, 'MESSAGE_HAS_H1', []);
                h1_count++;
              }
              else {
                rule_result.addResult(TEST_RESULT.FAIL, me, 'MESSAGE_H1_NO_CONTENT', []);
              }
            }
          }  
        }
      }

     // Test if no h1s
     if (h1_count === 0) {
        var te = dom_cache.title_main_cache.main_elements[0];
        // Use title if defined to mark failure
        if (te) {
          rule_result.addResult(TEST_RESULT.FAIL, te, 'MESSAGE_H1_MISSING', []);
        } 
        else {
          rule_result.addResult(TEST_RESULT.FAIL, null, 'MESSAGE_H1_MISSING', []);
        }
     }
  } // end validate function
 }, 
 
/**
 * @object HEADING_2
 *
 * @desc The text content of headings of the same level that share the same parent heading or landmark role should be unique. 
 *
 */	     	     	     
 {
  id              : 'HEADING_2', 
  last_updated     : '2011-09-16', 
  cache_dependency : 'headings_landmarks_cache',
  cache_properties : ['tag_name', 'name', 'name_length', 'name_for_comparison'],
  language        : "",
  validate        : function (dom_cache, rule_result) {
  
      function checkListForUniqueNames(heading_list) {
         
        var i;
        var j;
        var len = heading_list.length;
        var he1;
        var he2;
       
        if (len < 2) return; 
         
        for (i=0; i<(len-1); i++) {
          he1 = heading_list[i];          
          for (j=i+1; j<len; j++) {
            he2 = heading_list[j];            
            if (he2.unique && (he1.name_for_comparison == he2.name_for_comparison)) {
              he1.unique = false;              
              he2.unique = false;              
              break;
            }
          }
        }
      }

      function checkHeadingLevelForUniqueContent(level) {
      
         var heading_list = [];
         var i;
         var he;
         
         for (i=0; i<heading_elements_len; i++) {
           he = heading_elements[i];
           if (he.level == level) {
             he.unique = true;
             if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) heading_list.push(he);
           }
           else {
             if (he.level < level) {
               checkListForUniqueNames(heading_list);
               heading_list = [];
             }
           }
         }
         
         if (heading_list.length) {
            checkListForUniqueNames(heading_list);         
         }
       
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      
      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;

      // Check all h1 elements for uniquness
      if (heading_elements && heading_elements_len) {     
      
        checkHeadingLevelForUniqueContent(1);
        checkHeadingLevelForUniqueContent(2);
        checkHeadingLevelForUniqueContent(3);
        checkHeadingLevelForUniqueContent(4);
        checkHeadingLevelForUniqueContent(5);
        checkHeadingLevelForUniqueContent(6);
        
        for(i=0; i<heading_elements_len; i++) {
          he = heading_elements[i];
          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            if (he.unique) {          
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_UNIQUE', []);            
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_NOT_UNIQUE', []);            
            }
          }
        } // end loop
      }
      
  } // end validate function
 }, 
/**
 * @object HEADING_3
 *
 * @desc Heading content should describe the section or sub section 
 *
 */	     	     	     
 {
  id                : 'HEADING_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      
      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;

      if (heading_elements && heading_elements_len) {      
      
        for(i=0; i<heading_elements_len; i++) {
          he = heading_elements[i];
          if (he.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
            rule_result.addResult(SEVERITY.MANUAL_CHECK, he, 'MESSAGE_CHECK', []);            
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
        }
      }



  } // end validate function
 },

/**
 * @object HEADING_4
 *
 * @desc Headings must be properly nested 
 *
 */
 {
  id                : 'HEADING_4', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      function getNextVisibleHeading() {
        var he;
      
        while (i < heading_elements_len) {
          he = heading_elements[i];
          i++;
          if (he.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
            return he;
          }  
          rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
        }
        return null;
      }

      function checkHeadings() {
      
        var he_last = getNextVisibleHeading();
        var he      = getNextVisibleHeading();    
        
        if (he_last === null || he === null) return;

        while ((he.level <= he_last.level) || 
               (he.level === (he_last.level+1))) {
                
          rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_PROPER_NESTING', []);            
                    
          he_last = he;
          he      = getNextVisibleHeading();           
          if (he === null) return;          
        }      
        
        while (he.level > (he_last.level+1)) {
          rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_IMPROPER_NESTING', []);                      
          he      = getNextVisibleHeading(); 
          if (he === null) return;
        }
                
        checkHeadings();              
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i = 0;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements_len > 1) {
        checkHeadings();
      }

  } // end validate function
 },
 
/**
 * @object HEADING_5
 *
 * @desc Every navigation and complementary landmark should use an H2 element as its label 
 *
 */	     	     	     
 {
  id                : 'HEADING_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'role', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
  } // end validate function
 },
 
/**
 * @object HEADING_6
 *
 * @desc The text content of a heading should not only come from the alt attribute value of img elements. 
 *
 */	     	     	     
 {
  id                : 'HEADING_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'only_image', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if (he.dom_element.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE && he.dom_element.only_image) {
            rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_ONLY_IMAGE', []);
          }
          else {
            rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_HAS_TEXT', []);          
          }

        } // end loop
      }
  } // end validate function
 },
 
/**
 * @object HEADING_7
 *
 * @desc Heading elements should contain content
 *
 */	     	     	     
 {
  id                : 'HEADING_7', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var de;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];
          de = he.dom_element;

          if ((de.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE ) && 
              ( !he.name || he.name_length === 0 )) {
            rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_EMPTY', []);
          }            
        } // end loop
      }
  } // end validate function
 },

/**
 * @object HEADING_8_EN
 *
 * @desc Headings should be concise and therefore typically not contain more than 100 characters (English Only) 
 */	     	     	     
 {
  id                : 'HEADING_8_EN', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'name', 'name_length'],
  language          : "en-us en-br",
  validate          : function (dom_cache, rule_result) {

      var MAX_HEADING_LENGTH = 100;

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i;
      var he;
      var de;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i = 0; i < heading_elements_len; i++) {
          he = heading_elements[i];
          de = he.dom_element;
          
          if (de.computed_style.is_visible_to_at !== VISIBILITY.INVISIBLE  && he.name) {
            if (he.name_length > MAX_HEADING_LENGTH ) {
              rule_result.addResult(SEVERITY.MANUAL_CHECK, he, 'MESSAGE_TO_LONG', [he.name_length, MAX_HEADING_LENGTH]);
            }  
          }            
        } // end loop
      }      
  } // end validate function
 },
/**
 * @object LANDMARK_1
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_1', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'title_main_cache',
  cache_properties  : ['num_main_landmarks', 'num_visibile_main_landmarks'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var title_main_cache  = dom_cache.title_main_cache;
      var main_elements     = title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      var page_element      = title_main_cache.page_element;

      var i;
      var me;
      var cs;
      
      page_element.num_main_landmarks = 0;
      page_element.num_visible_main_landmarks = 0;
      
      // check to make sure the main elements are visible
      
      if (title_main_cache.has_role_main_elements) {
        for (i = 0; i < main_elements_len; i++) {
        
          me = main_elements[i];
          cs = me.computed_style;
          if (me.main_type == OpenAjax.a11y.MAIN.ROLE_MAIN) {
            page_element.num_main_landmarks += 1;
            if (cs.is_visible_to_at == VISIBILITY.VISIBLE) page_element.num_visible_main_landmarks += 1;
          }
        }  
        
        if (has_visible_main) {
          rule_result.addResult(SEVERITY.PASS, page_element, 'MESSAGE_PASS', [page_element.num_visible_main_landmarks]);        
        }
        else {
          rule_result.addResult(SEVERITY.FAIL, page_element, 'MESSAGE_HIDDEN', [page_element.num_main_landmarks]);
        }              
      }
      else {
        rule_result.addResult(SEVERITY.FAIL, page_element, 'MESSAGE_FAIL', []);
      }

  } // end validate function
 },
/**
 * @object LANDMARK_2
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_2', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['tag_name', 'text_normalized', 'parent_landmark_role'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;

      var elements_with_content     = dom_cache.headings_landmarks_cache.elements_with_content;
      var elements_with_content_len = elements_with_content.length;

      var i;
      var de;
      var cs;
      var lm;
      var elem;
      
      // check to make sure the main elements are visible
      
      for (i = 0; i < elements_with_content_len; i++) {
        
        de = elements_with_content[i];
        cs = de.computed_style;
          
        if (de.type == Node.ELEMENT_NODE) elem = de.tag_name;
        else elem = de.parent_element.tag_name;
          
        if (de.parent_landmark) {
          lm = de.parent_landmark.dom_element.role; 
          rule_result.addResult(SEVERITY.PASS, de, 'MESSAGE_PASS', [elem, lm]);                
        }
        else {
          if (cs.is_visible_to_at == VISIBILITY.VISIBLE) {
            rule_result.addResult(SEVERITY.FAIL, de, 'MESSAGE_FAIL', [elem]);                          
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', [elem]);                                      
          }
        }
      }    
      
  } // end validate function
 },
/**
 * @object LANDMARK_3
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_3', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['role', 'label', 'label_source'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

      function checkLandmarkLabels(landmark_role) {

        var i;
        var j;
        var le;
        
        var landmark_role_list     = [];
        var landmark_role_list_len = 0;
        
        var label_list       = [];        
        var label_list_len   = 0;
        var label_list_len_2 = 0; 

        var duplicate_labels     = [];
        var duplicate_labels_len = 0;
 
        function addToDuplicateLabelList(label) {
          var add_flag = true;
          var i;
          
          for (i = 0; i < duplicate_labels_len; i++) {
            if (duplicate_labels[i] == label) {
              add_flag = false;
              break;
            }
          }
          
          if (add_flag) { 
            duplicate_labels.push(label);
            duplicate_labels_len += 1;
          }  
        }  // end of

        function checkUniqueness(landmark_element) {
          var dup_flag = false;
          var i;

          if (landmark_element.label.length) {
             for (i = 0; i < duplicate_labels.length; i++) {
               if (landmark_element.label == duplicate_labels[i]) {
                 dup_flag = true;
                 break;
               }
             }
             if (dup_flag) {
               rule_result.addResult(SEVERITY.FAIL, landmark_element, 'MESSAGE_FAIL_DUPLICATE', [landmark_element.label, landmark_role]);
             }
             else {
               rule_result.addResult(SEVERITY.PASS, landmark_element, 'MESSAGE_PASS_UNIQUE', [landmark_element.label, landmark_role]);                                                            
             }             
          }
          else {
            rule_result.addResult(SEVERITY.FAIL, landmark_element, 'MESSAGE_FAIL_NO_LABEL', [landmark_role]);                                                  
          }
        
        }
        
        for (i = 0; i < landmark_elements_len; i++) {
          le = landmark_elements[i];
          if (le.dom_element.role == landmark_role) {
            landmark_role_list.push(le);
            if (le.label.length) label_list.push(le.label); 
          }  
        }

        // if no elements with role return
        if (!landmark_role_list.length) return;
      
        label_list_len = label_list.length;
        label_list_len_2 = label_list_len - 1;
      
        for (i = 0; i < label_list_len_2; i++) {
          for(j = i+1; j < label_list_len; j++) {
            if (label_list[i] == label_list[j]) {
              addToDuplicateLabelList(label_list[i]);
            }  
          }
        }  
        
        landmark_role_list_len = landmark_role_list.length;
        
        if (landmark_role_list_len > 1) {
          for (i = 0; i < landmark_role_list_len; i++) {
            le = landmark_role_list[i];          
            checkUniqueness(le);
          }
        }
        else {
          rule_result.addResult(SEVERITY.PASS, landmark_role_list[0], 'MESSAGE_PASS_ONLY_ONE', [landmark_role]);                                      
        }
        
      }

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;
      
      checkLandmarkLabels('navigation');
      checkLandmarkLabels('main');
      checkLandmarkLabels('region');
      checkLandmarkLabels('banner');
      checkLandmarkLabels('complementary');
      checkLandmarkLabels('contentinfo');
      checkLandmarkLabels('form');

      
  } // end validate function
 },
/**
 * @object LANDMARK_4
 *
 * @desc Every page needs at least one main landmark
 */	     	     	     
 {
  id                : 'LANDMARK_4', 
  last_updated      : '2012-03-01', 
  cache_dependency  : 'headings_landmarks_cache',
  cache_properties  : ['role', 'label', 'label_source'],
  language          : "",
  validate          : function (dom_cache, rule_result) {


      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var landmark_elements     = dom_cache.headings_landmarks_cache.landmark_elements;
      var landmark_elements_len = landmark_elements.length;

      var i;
      var le;

      for (i = 0; i < landmark_elements_len; i++) {
        le = landmark_elements[i];
        if (le.label.length) {
          rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_HAS_LABEL', [le.label, le.dom_element.role]);                                              
        }
        else {
          rule_result.addResult(SEVERITY.MANUAL_CHECK, le, 'MESSAGE_NO_LABEL', [le.dom_element.role]);                                                      
        }
      
      }
      
  } // end validate function
 }
 ]); 


    

