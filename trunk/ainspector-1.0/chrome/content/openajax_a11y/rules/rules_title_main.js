/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Heading and Landmark Rules                    */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object TITLE_1
 *
 * @desc The page must contain exactly one title element and it must contain content.
 */	     	     	     
 
{ rule_id             : 'TITLE_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.HEADINGS,
  last_updated        : '2012-09-11', 
  wcag_primary_id     : '2.4.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['title'],
  cache_dependency    : 'headings_landmarks_cache',
  resource_properties    : ['tag_name', 'name', 'name_for_comparison'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
      OpenAjax.a11y.logger.debug("TITLE 1: has title? " + dom_cache.document_has_title);

      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
  
      var title_element  = dom_cache.headings_landmarks_cache.title_element;
      
      if (dom_cache.document_has_title) {
      
        if (title_element.name_for_comparison.length) {
          rule_result.addResult(TEST_RESULT.PASS, title_element, 'PASS', []);                        
        }
        else {
          rule_result.addResult(TEST_RESULT.FAIL, title_element, 'CORRECTIVE_ACTION_1', []);        
        }
      }
      else {
        rule_result.addResult(TEST_RESULT.FAIL, title_element, 'CORRECTIVE_ACTION_2', []);
      }
        
    } // end validate function
  }
 ]); 


    

