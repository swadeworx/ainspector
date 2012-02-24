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
  id                : 'HEADING_1', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'title_main_cache',
  cache_properties  : ['tag_name'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;

      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_H1_HIDDEN', []);                      
          }
          else {
            if (me.dom_element.tag_name == 'h1') {
              if (me.name && me.name_length > 0) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_H1', []);
                h1_count++;
              }
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NO_CONTENT', []);
              }
            }
          }  
        }
      }

     // Test if no h1s
     if (h1_count === 0) {
        te = dom_cache.title_main_cache.main_elements[0];
        // Use title if defined to mark failure
        if (te) {
          rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_H1_MISSING', []);
        } 
        else {
          rule_result.addResult(SEVERITY.FAIL, null, 'MESSAGE_H1_MISSING', []);
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
  cache_properties : ['tag_name', 'name'],
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
  cache_properties  : ['tag_name', 'name'],
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
            rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_CHECK', []);            
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
              rule_result.addResult(SEVERITY.FAIL, he, 'MESSAGE_TO_LONG', [he.name_length, MAX_HEADING_LENGTH]);
            }  
          }            
        } // end loop
      }      
  } // end validate function
 }
 ]); 


    

