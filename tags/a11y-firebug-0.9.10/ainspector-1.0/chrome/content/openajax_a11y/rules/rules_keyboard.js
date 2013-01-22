/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object KEYBOARD_1
 * 
 * @desc Widget elements on non-interactive elements or that override the default role of an interactive element 
 *       need keyboard event handlers on the widget element or a parent element of the widget
 */
	     
{ rule_id             : 'KEYBOARD_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '2.1.1',
  wcag_related_ids    : ['4.1.2'],
  target_resources    : ['widgets'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['role', 'tab_index', 'is_owned', 'has_key_down', 'has_key_press', 'has_key_up', 'ancestor_has_key_down', 'ancestor_has_key_press', 'ancestor_has_key_up'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     function checkForKeyboardOwner(we) {

       if (we.is_owned && (we.owner_controls.length === 1)) {
       
         var owner = we.owner_controls[0];
         var de = owner.dom_element;
         
         if (de.has_activedescendant) {
           var has_keyboard_support = de.events.has_key_down;
           has_keyboard_support = has_keyboard_support || de.events.has_key_press;
           has_keyboard_support = has_keyboard_support || de.events.has_key_up;
           return has_keyboard_support;
         }
       }
     
       return false;
     }
  
     function checkForKeyboardOnRequiredChildren(widget) {

       function checkChildren(children) {
       
         if (typeof children !== 'object' || !children.length) return false;
       
         var flag = false;
         var children_len = children.length;
         
         for (var i = 0; (i < children_len) && !flag; i++) {
         
           var we = children[i];
           var de = we.dom_element;

           OpenAjax.a11y.logger.debug("  KEYBOARD RULE 1 CHID: " + de.role + " ("+ we.toString() + ")");

           flag = de.events.has_key_down || de.events.has_key_press || de.events.has_key_up;

           if (!flag && de.role_info.reqChildren && de.role_info.reqChildren.length) { 
             flag = checkChildren(we.child_cache_elements); 
           }
         }
         return flag;
       }

       return checkChildren(widget.child_cache_elements);
       
     }  

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;

//         OpenAjax.a11y.logger.debug("  KEYBOARD RULE 1: " + de.role + " ("+ we.toString() + ")");

         if (de.role_info.roleType === 'widget') {

           if (style.is_visible_to_at === VISIBILITY.VISIBLE) {
           
             var has_keyboard_support = de.events.has_key_down;
             has_keyboard_support = has_keyboard_support || de.events.has_key_press;
             has_keyboard_support = has_keyboard_support || de.events.has_key_up;
             
             if (de.role_info.supportOnClick) {
               has_keyboard_support = has_keyboard_support || de.events.has_click;
               has_keyboard_support = has_keyboard_support || de.events.has_double_click;
             }  

             if (has_keyboard_support) {
               rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_1', [we]);     
             }
             else {
      
               has_keyboard_support = de.events.ancestor_has_key_down;
               has_keyboard_support = has_keyboard_support || de.events.ancestor_has_key_press;
               has_keyboard_support = has_keyboard_support || de.events.ancestor_has_key_up;
               
               if (de.role_info.supportOnClick) {
                 has_keyboard_support = has_keyboard_support || de.events.ancestor_has_click;
                 has_keyboard_support = has_keyboard_support || de.events.ancestor_has_double_click;
               }  
               
               if (has_keyboard_support) { 
                 rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'MANUAL_CHECK_1', [de.role]);
               }  
               else {
                 
                 if (checkForKeyboardOwner(we)) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'MANUAL_CHECK_2', [de.role, we.owner_controls[0].toString()]);
                 }
                 else {
                   if (checkForKeyboardOnRequiredChildren(we)) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'MANUAL_CHECK_3', [de.role]);
                   else rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_1', [de.role]);
                 }
               }  
             }             
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'HIDDEN', [we.toString()]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
   
},

/**
 * @object KEYBOARD_2
 * 
 * @desc Elements with widget roles have tabindex defined or are a child of an element
 *       with aria-activedescendant
 */
	     
{ rule_id             : 'KEYBOARD_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '2.1.1',
  wcag_related_ids    : ['4.1.2'],
  target_resources    : ['widgets'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['role', 'tab_index', 'aria_activedescendant', 'ancestor_has_activedescendant'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;

//         OpenAjax.a11y.logger.debug("  KEYBOARD RULE 2: " + de.role + " ("+ we.toString() + ")");

         if (de.role_info.roleType === 'widget') {

           if (style.is_visible_to_at === VISIBILITY.VISIBLE) {

             if (de.is_interactive_element) {
               rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_1', [de.role, de.tag_name]);     
             }
             else {
               if (!isNaN(de.tab_index)) { 
                 rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_2', [we]);     
               }  
               else {
                 if (de.ancestor_has_activedescendant) {
                   if (de.id_unique === OpenAjax.a11y.ID.UNIQUE ) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'MANUAL_CHECK_1', [de.tag_name, de.id]);
                   else rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_1', [de.tag_name]);               
                 }
                 else { 
                   rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_2', [de.tag_name]);               
                 }
               }  
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'HIDDEN', [we.role]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
}

]); 


    

