/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object TITLE_1
 *
 * @desc The page must contain exactly one title element and it must contain content.
 */	     
  {
    id                : 'TITLE_1', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties  : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var me;
      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];
          if (me.dom_element.tag_name === 'title') {
            if (me.dom_element.hasTitle && dom_cache.title.length) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_HAS_TITLE', []);              
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_NO_TITLE', []);
            }
          }
        }
      }
  
    } // end validate function
  },

/**
 * @object TITLE_2
 *
 * @desc  If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark 
 */	     	     
 {
    id                : 'TITLE_2', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
      var i;
      var me;
      
      var title_main_cache = dom_cache.title_main_cache;
      var main_elements = title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      var h1_count = 0;
      
      if (main_elements && main_elements_len) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) {

            if (title_main_cache.has_role_main_elements) {
              if (me.is_label_for_main) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NOT_LABEL', []);
              }
            }
            else {
              rule_result.addResult(SEVERITY.NA, me, 'MESSAGE_NO_ROLE_MAIN', []);            
            }
          }       
        } // end loop  
      }  
    } // end validate function
 },
 
/**
 * @rule TITLE_3
 *
 * @desc The words in the H1 element content should also be in the TITLE element content  
 */	     	     
  {
    id                : 'TITLE_3', 
    last_updated      : '2011-09-16', 
    cache_dependency  : 'title_main_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var SOURCE     = OpenAjax.a11y.SOURCE;
  
      var i;
      var me;
      var te;
      var h1_info;

      var main_elements = dom_cache.title_main_cache.main_elements;
      var main_elements_len = main_elements.length;
      
      var main_count = 0;
      
      if (main_elements && main_elements.length) {
      
        for (i=0; i<main_elements_len; i++ ) {
          me = main_elements[i];

          if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

            if (me.dom_element.main_type == OpenAjax.a11y.MAIN.H1_ELEMENT) { 
              if (me.is_label_for_main) {
                rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_H1_IS_LABEL', []);
              }                 
              else {
                rule_result.addResult(SEVERITY.FAIL, me, 'MESSAGE_H1_NOT_LABEL', []);
              }
            }  
          }  
          else {
            rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', []);                      
          }              
        }  // end loop
      }      
    } // end validate function
 }
 ]); 


    

