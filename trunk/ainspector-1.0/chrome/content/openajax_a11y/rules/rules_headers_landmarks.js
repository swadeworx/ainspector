/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/**
 * @rule TITLE 1
 *
 * @desc The page must contain exactly one title element and it must contain content.
 *
 * @group Headings and Landmarks
 * 
 */	     
  {
    id              : 'TITLE_1', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var me;
      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];
          if (me.dom_element.tag_name === 'title') {
            if (me.dom_element.hasTitle && dom_cache.title.length) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_TITLE', []);              
            }
            else {
              rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_NO_TITLE', []);
            }
          }
        }
      }
  
    } // end validate function
  },

/**
 * @rule TITLE_2
 *
 * @desc  If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark 
 *
 * @group Headings and Landmarks
 * 
 */	     	     
 {
    id              : 'TITLE_2', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var i;
      var me;
      
      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.level === 1) h1_count++;  
          if (me.dom_element.role === 'main') main_count++;
        } // end loop
        
        if (h1_count > 0 && main_count > 0) {
          for (i=0; i<main_elements_len; i++ ) {
            me = main_elements[i];
            
            if (me.level === 1) {
              if (me.isH1UsedAsLabelForMainRole()) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NOT_LABEL', []);
              }    
            }
          } // end loop      
        }   
      }  
    } // end validate function
 },
/**
 * @rule TITLE_3
 *
 * @desc The words in the H1 element content should also be in the TITLE element content  
 *
 * @group Headings and Landmarks
 * 
 */	     	     
  {
    id              : 'TITLE_3', 
    lastUpdated     : '2011-09-16', 
    cacheDependency : 'headers_landmarks_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,  
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;
      var h1_info;

      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.role === 'main') {
          
            if (me.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            
              h1_info = me.getH1InformationForMainRole();           
               
              if (h1_info.has_h1) {
               
                if (h1_info.has_label) {
                  rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_USES_H1', []);
                }                 
                else {
                  rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NOT_LABEL', []);
                }
              }
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_NO_H1', []);
              }
            }
            else {
              rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', []);                      
            }              
          }  
        }  // end loop
      }      
    } // end validate function
 },

/**
 * @rule HEADING_1
 *
 * @desc Each page should contain at least one H1 element and each H1 element must have content
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_1', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {
  
      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;

      var main_elements = dom_cache.headings_landmarks_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var h1_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_H1_HIDDEN', []);                      
          }
          else {
            if (me.dom_element.tag_name == 'h1') {
              if (me.name && name.length > 0) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_H1', []);
                h1_count++;
              }
              else {
                rule_result.addResult(rule_result.rule_severity, me, 'MESSAGE_H1_NO_CONTENT', []);
              }
            }
          }  
        }
      }

     // Test if no h1s
     if (h1_count === 0) {
        te = dom_cache.headings_landmarks_cache.main_elements[0];
        // Use title if defined to mark failure
        if (te) {
          rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_H1_MISSING', []);
        } 
        else {
          rule_result.addResult(rule_result.rule_severity, null, 'MESSAGE_H1_MISSING', []);
        }
     }
  } // end validate function
 }, 
/**
 * @rule HEADING_2
 *
 * @desc The text content of headings of the same level that share the same parent heading or landmark role should be unique. 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_2', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
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
             if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) heading_list.push(he);
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
          if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            if (he.unique) {          
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_UNIQUE', []);            
            }
            else {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_NOT_UNIQUE', []);            
            }
          }
        } // end loop
      }
      
  } // end validate function
 }, 
/**
 * @rule HEADING_3
 *
 * @desc Heading content should describe the section or sub section 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_3', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

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
          if (he.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_CHECK', []);            
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
        }
      }



  } // end validate function
 },

/**
 * @rule HEADING_4
 *
 * @desc Headings must be properly nested 
 *
 * @group Headings and Landmarks
 * 
 */
 {
  id              : 'HEADING_4', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;
      var he_last;
      var te;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && (heading_elements.length > 1)) {
      
        he_last = heading_elements[0];
        rule_result.addResult(SEVERITY.PASS, he_last, 'MESSAGE_PROPER_NESTING', []);
        
        for (i=1; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if (he.dom_element.computed_style.at === VISIBILITY.INVISIBLE) {
            rule_result.addResult(SEVERITY.HIDDEN, he, 'MESSAGE_HIDDEN', []);                      
          }
          else {
            if (he.level <= he_last.level || (he.level === (he_last.level+1))) {
              rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_PROPER_NESTING', []);
            }
            else {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_IMPROPER_NESTING', []);
            }
            he_last = he;
          }            
        } // end loop
      }


  } // end validate function
 },
/**
 * @rule HEADING_5
 *
 * @desc Every navigation and complementary landmark should use an H2 element as its label 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id       : 'HEADING_5', 
  lastUpdated   : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language    : "",
  enabled     : true,  
  validateParams : {},
  validate    : function (dom_cache, rule_result) {
  
  } // end validate function
 },
/**
 * @rule HEADING_6
 *
 * @desc The text content of a heading should not only come from the alt attribute value of img elements. 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_6', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

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

          if (he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE && he.dom_element.only_image) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_ONLY_IMAGE', []);
          }
          else {
            rule_result.addResult(SEVERITY.PASS, he, 'MESSAGE_HAS_TEXT', []);          
          }

        } // end loop
      }
  } // end validate function
 },
/**
 * @rule HEADING_7
 *
 * @desc Heading elements should contain content
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_7', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var he;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];

          if ((he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE ) && 
              ( !he.name || he.name.length === 0 )) {
            rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_EMPTY', []);
          }            
        } // end loop
      }
  } // end validate function
 },
/**
 * @rule HEADING_8_EN
 *
 * @desc Headings should be concise and therefore typically not contain more than 100 characters (English Only) 
 *
 * @group Headings and Landmarks
 * 
 */	     	     	     
 {
  id              : 'HEADING_8_EN', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'headers_landmarks_cache',
  cacheProperties : [],
  language        : "en-us en-br",
  enabled         : true,  
  validateParams  : {},
  validate        : function (dom_cache, rule_result) {

      var MAX_HEADING_LENGTH = 100;

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
  
      var i;
      var he;
      var len;

      var heading_elements     = dom_cache.headings_landmarks_cache.heading_elements;
      var heading_elements_len = heading_elements.length;
      
      if (heading_elements && heading_elements.length) {
      
        for (i=0; i<heading_elements_len; i++ ) {
          he = heading_elements[i];
          
          if (he.dom_element.computed_style.at !== VISIBILITY.INVISIBLE  && he.name ) {
            len = he.name.length;
            if (len > MAX_HEADING_LENGTH ) {
              rule_result.addResult(rule_result.rule_severity, he, 'MESSAGE_TO_LONG', [len,MAX_HEADING_LENGTH]);
            }  
          }            
        } // end loop
      }      
  } // end validate function
 }
 ]); 


    

