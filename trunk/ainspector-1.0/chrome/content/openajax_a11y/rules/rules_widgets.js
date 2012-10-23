/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object WIDGET_1
 * 
 * @desc ARIA Widgets must have labels
 */
	     
{ rule_id             : 'WIDGET_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="widget"]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['accessible_name', 'accessible_description', 'computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var control_elements     = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var control_type = ce.control_type;
         
         if (control_type === OpenAjax.a11y.CONTROL_TYPE.WIDGET) {
         
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS_1', [de.role.toUpperCase()]);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [de.role.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.role.toUpperCase()]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_2
 * 
 * @desc Elements with onClick event handlers event handlers need role 
 */
	     
{ rule_id             : 'WIDGET_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[onClick]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var dom_elements     = dom_cache.element_cache.dom_elements;
     var dom_elements_len = dom_elements.length;
       
     if (dom_elements && dom_elements_len) {
     
       for (var i = 0; i < dom_elements_len; i++) {
         var de = dom_elements[i];
         var style = de.computed_style;
       
        if (de.events.has_click) { 
        
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             if (de.tag_name !== "body" && de.tag_name !== "frame" &&  de.tag_name !== "iframe") {
         
               if (de.is_widget) {
                 if (typeof de.tab_index === 'number')  rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.tag_name]);     
                 else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.tag_name, de.role]);
               }
               else if ("input textarea button select".indexOf(de.tag_name) >= 0) {
                   rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [de.tag_name]);     
                 }
                 else if ("a area".indexOf(de.tag_name) >= 0) {
                   rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_3', [de.tag_name]);
                 }
                 else if (typeof de.tab_index === 'number') rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_2', [de.tag_name]);     
                   else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_3', [de.tag_name]);
             }
             else {
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [de.tag_name, de.role]);
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.tage_name]);     
           }
         }  
         
       } // end loop
     } 
   } // end validation function   
}

]); 


    

