//
// OpenAjax Alliance Rules 
// Rule group: Styling Rules
//
OpenAjax.a11y.all_rules.addRulesFromJSON([
      
 // ------------------------
 // Color 1: Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
 
{ rule_id             : 'COLOR_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.3',
  wcag_related_ids    : ['1.4.1','1.4.6'],
  target_resources    : ['textnodes'],
  cache_dependency    : 'text_cache',
  resource_properties : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT  = 3.1;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
   
      var cc_items     = dom_cache.text_cache.text_nodes;
      var cc_items_len = cc_items.length;
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];
        var pe = cc_item.parent_element;
        var cs = pe.computed_style;

        // if color contrast raio is undefined, skip this item
        if (!cs.color_contrast_ratio) continue;

        if (cs.is_visible_onscreen === VISIBILITY.VISIBLE) {

          if ((cs.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
            ((cs.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cs.is_large_font))) {
     
            // Passes color contrast requirements
            if (cs.background_image != "none") {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'MANUAL_CHECK_1', []);
            }           
            else {
              rule_result.addResult(TEST_RESULT.PASS, cc_item, 'PASS_1', []);
            }
          }
          else {
          
            // Fails color contrast requirements
            if (cs.background_image === "none") {
              rule_result.addResult(TEST_RESULT.FAIL, cc_item, 'CORRECTIVE_ACTION_1', []);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'MANUAL_CHECK_2', []);
            }     
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, cc_item, 'HIDDEN', []);        
        }
        
      } // end loop  
      
    } // end validate function
 },
 
 // ------------------------
 // Color 2: Color contrast ratio must be > 7 for normal text, and > 4.5 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 { rule_id           : 'COLOR_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.6',
  wcag_related_ids    : ['1.4.1','1.4.3'],
  target_resources    : ['textnodes'],
  cache_dependency    : 'text_cache',
  resource_properties : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
   
      var cc_items     = dom_cache.text_cache.text_nodes;
      var cc_items_len = cc_items.length;
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];
        var pe = cc_item.parent_element;
        var cs = pe.computed_style;

//        OAA_WEB_ACCESSIBILITY_LOGGING.logger.log.debug("  ccr: " + cs.color_contrast_ratio + " large font: " + cs.is_large_font);

        // if color contrast raio is undefined, skip this item
        if (!cs.color_contrast_ratio) continue;

        if (cs.is_visible_onscreen === VISIBILITY.VISIBLE) {

          if ((cs.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
            ((cs.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cs.is_large_font))) {
     
            // Passes color contrast requirements
            if (cs.background_image != "none") {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'MANUAL_CHECK_1', []);
            }           
            else {
              rule_result.addResult(TEST_RESULT.PASS, cc_item, 'PASS_1', []);
            }
          }
          else {
          
            // Fails color contrast requirements
            if (cs.background_image === "none") {
              rule_result.addResult(TEST_RESULT.FAIL, cc_item, 'CORRECTIVE_ACTION_1', []);
            }
            else {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cc_item, 'MANUAL_CHECK_2', []);
            }     
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, cc_item, 'HIDDEN', []);        
        }
        
      } // end loop  
      
    } // end validate function
    
  }

 ]); 


    

