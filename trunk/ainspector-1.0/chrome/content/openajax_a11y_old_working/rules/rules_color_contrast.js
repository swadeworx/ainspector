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
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.3',
  wcag_related_ids    : ['1.4.1','1.4.6'],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'color_contrast_cache',
  cache_properties    : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  target_objects      : ['textnodes'],
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT  = 3.1;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SEVERITY    = OpenAjax.a11y.SEVERITY;
   
      var cc_items     = dom_cache.color_contrast_cache.color_contrast_items;
      var cc_items_len = cc_items.length;
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];

        // if color contrast raio is undefined, skip this item
        if (!cc_item.color_contrast_ratio) continue;

        if ((cc_item.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cc_item.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cc_item.is_large_font))) {
     
          // Passes color contrast requirements
          if (cc_item.background_image != "none") {
            test_result = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_PASS';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;
          }
          else {
            if (cc_item.wcag_severity !== SEVERITY.PASS_LEVEL_AAA) cc_item.wcag_severity = SEVERITY.PASS_LEVEL_AA;          
          }
        }
        else {
        
          // Fails color contrast requirements
          if (cc_item.background_image == "none") {
            test_result  = TEST_RESULT.FAIL;
            message_id = 'ACTION';
            cc_item.wcag_severity = SEVERITY.VIOLATION;
          }
          else {
            test_result  = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_FAIL';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        var dom_text_nodes_len = cc_item.dom_text_nodes.length;
        
        var all_hidden_flag = true;

        for (var j = 0; j < dom_text_nodes_len; j++) {
        
          var dtn = cc_item.dom_text_nodes[j];
          
          if (dtn.computed_style.is_visible_onscreen === VISIBILITY.VISIBLE) {
            rule_result.addResult(test_result, dtn, message_id, args);
            all_hidden_flag = false;
          } 
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, dtn, 'HIDDEN', []);
          }
        } // end loop
        
        if (all_hidden_flag) cc_item.wcag_severity = SEVERITY.HIDDEN;
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
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.COLOR_CONTRAST,
  last_updated        : '2012-06-12', 
  wcag_primary_id     : '1.4.6',
  wcag_related_ids    : ['1.4.1','1.4.3'],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'color_contrast_cache',
  cache_properties    : ['color_hex', 'background_color_hex', 'background_image', 'is_large_font', 'color_contrast_ratio'],
  language_dependency : "",
  target_objects      : ['textnodes'],
  validate            : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
      var SEVERITY    = OpenAjax.a11y.SEVERITY;
   
      var cc_items     = dom_cache.color_contrast_cache.color_contrast_items;
      var cc_items_len = cc_items.length;
     
     
      for (var i = 0; i < cc_items_len; i++) {

        var test_result = TEST_RESULT.PASS;
        var message_id = '';
        var args = [];

        var cc_item = cc_items[i];

        // if color contrast raio is undefined, skip this item
        if (!cc_item.color_contrast_ratio) continue;

        if ((cc_item.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cc_item.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cc_item.is_large_font))) {
     
          // Passes color contrast requirements
          if (cc_item.background_image != "none") {
            test_result = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_PASS';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;          
          }           
          else {
            cc_item.wcag_severity = SEVERITY.PASS_LEVEL_AAA;          
          }
        }
        else {
        
          // Fails color contrast requirements
          if (cc_item.background_image == "none") {
            test_result  = TEST_RESULT.FAIL;
            message_id = 'ACTION';
            if (cc_item.wcag_severity !== SEVERITY.PASS_LEVEL_AA) cc_item.wcag_severity = SEVERITY.VIOLATION;          
          }
          else {
            test_result  = TEST_RESULT.MANUAL_CHECK;
            message_id = 'MANUAL_BG_FAIL';
            cc_item.wcag_severity = SEVERITY.MANUAL_CHECK;          
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        var dom_text_nodes_len = cc_item.dom_text_nodes.length;

        var all_hidden_flag = true;

        for (var j = 0; j < dom_text_nodes_len; j++) {
        
          var dtn = cc_item.dom_text_nodes[j];
          
          if (dtn.computed_style.is_visible_onscreen === VISIBILITY.VISIBLE) {
            rule_result.addResult(test_result, dtn, message_id, args);
            all_hidden_flag = false;
          } 
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, dtn, 'HIDDEN', []);
          }
        } // end loop

        if (all_hidden_flag) cc_item.wcag_severity = SEVERITY.HIDDEN;

      } // end loop  
    }
  }

 ]); 


    

