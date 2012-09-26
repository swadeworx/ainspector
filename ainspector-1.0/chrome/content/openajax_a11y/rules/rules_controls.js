/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object CONTROL_1
 * 
 * @desc textarea, select and input elements of type text, 
 *       password, checkbox, radio and file must have an 
 *       accessible label
 * 
 */
	     
{  rule_id             : 'CONTROL_1',
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
   last_updated        : '2011-09-16', 
   wcag_primary_id     : '3.3.2',
   wcag_related_ids    : ['1.3.1', '2.4.6'],
   target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
   cache_dependency    : 'controls_cache',
   resource_properties : ['computed_label', 'fieldset_element', 'computed_label_source', 'name_attribute'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
  
         var control_type = ce.control_type;

         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {
             
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [ce.type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [ce.type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [ce.type.toUpperCase()]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object CONTROL_2
 * 
 * @desc Every input type image must have an alt or title attribute with content
 */
	     
{  rule_id             : 'CONTROL_2', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
   last_updated        : '2011-09-16', 
   wcag_primary_id     : '3.3.2',
   wcag_related_ids    : ['1.3.1', '2.4.6'],
   target_resources    : ['input[type="image"]'],
   cache_dependency    : 'controls_cache',
   resource_properties    : ['alt', 'title'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
  
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
     var tag_name;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].type;
     
         if (type === 'image') {
      
           if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.computed_label) {
               if (ce.computed_label.length) {
                 rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [type.toUpperCase()]);
               }
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', [type.toUpperCase()]);                    
               }
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [type.toUpperCase()]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
 },
 
/**
 * @object CONTROL_3
 *
 * @desc Groups of radio buttons should be contained in fieldset/legend
 */
{ rule_id             : 'CONTROL_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['input[type="radio"]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['fieldset_element'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].control_type;
     
         if (type == OpenAjax.a11y.CONTROL_TYPE.RADIO) {
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.fieldset_element) {
               if (ce.fieldset_element.legend_element && 
                   ce.fieldset_element.legend_element.computed_label &&
                   ce.fieldset_element.legend_element.computed_label.length) {
                 rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);
               }
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', []);               
               }
             }
             else {  
               if (de.aria_labelledby && de.aria_labelledby.length) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK_1', []);     
               }
               else {
                 if (de.aria_label && de.aria_label.length) {
                   rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK_2', []);     
                 }
                 else {
                   rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', []);
                 }    
               }
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', []);     
           }
         }
       } // end loop
     }   
  } // end validate function
},

/**
 * @object CONTROL_4
 *
 * @desc Button elements must have text content and input type button must have a value attribute with content
 */
{ rule_id             : 'CONTROL_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['button'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (var i = 0; i < control_elements_len; i++) {
         var ce = control_elements[i];
         var de = ce.dom_element;
  
         var type = control_elements[i].control_type;
     
         if (type == OpenAjax.a11y.CONTROL_TYPE.BUTTON) {
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.computed_label && ce.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);     
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', []);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', []);     
           }
         }
       } // end loop
     }   

  } // end validate function
},
 

/**
 * @object CONTROL_5
 *
 * @desc Tests if Textarea, select, input and button elements with id attributes have unique id values on the page
 *
 * @note Do not need to test for invisible elements, since getElementById searches all elements int he DOM
 */
{ rule_id             : 'CONTROL_5', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '4.1.1',
  wcag_related_ids    : ['3.3.2', '1.3.1', '2.4.6'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['id'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var ID          = OpenAjax.a11y.ID;
   
    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        
        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
        
          switch (de.id_unique) { 
        
          case ID.NOT_UNIQUE:
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [de.id]);
            break;          
          
          case ID.UNIQUE:
            rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [de.id]);               
            break;
          
          default:
            break;       
            
          } // end switch
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);             
        }
      } // end loop
    }     
  } // end validate function
},
 
/**
 * @object CONTROL_6
 * 
 * @desc Label element with a for attribute reference does not reference a form control
 */
{ rule_id             : 'CONTROL_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['for'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (var i = 0; i < label_elements_len; i++) {
        var le = label_elements[i];
        
        if (le.unused_label) {
          rule_result.addResult(TEST_RESULT.FAIL, le, 'CORRECTIVE_ACTION_1', [le.for_id]);
        }        
      } // end loop
    }     
  } // end validate function
},

/** 
 * @object CONTROL_7
 *
 * @desc Label or legend element should contain content 
 */
 
{ rule_id             : 'CONTROL_7', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  cache_dependency    : 'controls_cache',
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6'],
  target_resources    : ['label', 'legend'],
  resource_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
    
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (var i = 0; i < label_elements_len; i++) {
        var le = label_elements[i];
        var lde = le.dom_element;
        
        var ce = le.control_element;
  
        if (ce) {

          var cde = ce.dom_element;

          if (cde.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

            if (le.computed_label && le.computed_label.length === 0) {
              rule_result.addResult(TEST_RESULT.FAIL, le, 'CORRECTIVE_ACTION_1', [lde.tag_name]);
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, le, 'PASS', [lde.tag_name]);        
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, le, 'HIDDEN', [ce.control_type, lde.tag_name]);                
          }
        }
        
      } // end loop
    } 
  } // end validate function
},


/** 
 * @object CONTROL 8
 *
 * @desc Fieldset should contain exactly one legend element 
 */
 
{ rule_id             : 'CONTROL_8', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['1.3.1', '2.4.6', '4.1.1'],
  target_resources    : ['fieldset'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['legend_count'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var fieldset_elements      = dom_cache.controls_cache.fieldset_elements;
    var fieldset_elements_len  = fieldset_elements.length;
       
    // Check to see if valid cache reference
    if (fieldset_elements && fieldset_elements_len) {
     
      for (var i = 0; i < fieldset_elements_len; i++) {
        var fe = fieldset_elements[i];
        var de = fe.dom_element;

        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {

          if (fe.legend_count === 0) {
            rule_result.addResult(TEST_RESULT.FAIL, fe, 'CORRECTIVE_ACTION_1', []);        
          }
          else {
            if (fe.legend_count > 1) {
              rule_result.addResult(TEST_RESULT.FAIL, fe, 'CORRECTIVE_ACTION_2', [(fe.legend_count-1)]);        
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, fe, 'PASS', []);                  
            }
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, fe, 'HIDDEN', []);                          
        }
      } // end loop
    } 

  } // end validate function
},

/** 
 * @object CONTROL_9
 *
 * @desc Form controls should not be labelled using the TITLE attribute 
 */
 
{ rule_id             : 'CONTROL_9', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '3.3.2',
  wcag_related_ids    : ['4.1.1'],
  target_resources    : ['input', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['title'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
        
        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (ce.computed_label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
            rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [de.tag_name]);        
          }
          else {
            rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);                  
          }  
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);                          
        }
        
      } // end loop
    } 

  } // end validate function
},

/**
 * @object CONTROL_10
 * 
 * @desc Accessible labels must be unique for every textarea, 
 *       select and input element of type text, password, radio, 
 *       and checkbox on a page
 */
 
{ rule_id             : 'CONTROL_10', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['computed_label', 'fieldset_element', 'computed_label_source', 'name_attribute'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
  
        var control_type = ce.control_type;

        if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {

          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {  
            if (ce.computed_label && ce.computed_label.length) {
              ces.push(ce);
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [ce.type.toUpperCase()]);                        
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [ce.type.toUpperCase()]);                                    
          }
        }
      } // end loop    
      
      // sort labels

      ces = dom_cache.sortArrayOfObjects(ces,'computed_label_for_comparison', true); 

      for (i = 0; i < ces.length; i++) {
        ce = ces[i];

        if (ce.duplicate) {
          rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_2', []);                
        }
        else {
          rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', []);        
        }
      }
      
    } 
  } // end validate function
},

/**
 * @object CONTROL_11
 * 
 * @desc If there is more than one form on page, input element of type 
 *       submit and reset must have unique labels in each form using the value attribute
 * 
 */
 
{ rule_id             : 'CONTROL_11', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['input[type="submit"]', 'input[type="reset"]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['computed_label', 'value'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var current_controls   = [];
       
  } // end validate function

},

/**
 * @object CONTROL_12
 * 
 * @desc Form control label should describe the purpose of the form control
 * 
 */
 
{ rule_id             : 'CONTROL_12', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '2.4.6',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['button', 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'input[type="submit"]', 'input[type="reset"]', 'select', 'textarea'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['computed_label'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (var i = 0; i < control_elements_len; i++) {
        var ce = control_elements[i];
        var de = ce.dom_element;
  
        var control_type = ce.control_type;

        if (control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_ELEMENT ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.BUTTON_INPUT   ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX       ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.FILE           ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD       ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO          ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT         ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT           ||
            control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {

          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) { 
          
            if (ce.computed_label && ce.computed_label.length) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ce, 'MANUAL_CHECK_1', [de.tag_name]);                
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ce, 'CORRECTIVE_ACTION_1', [de.tag_name]);        
            } 
            
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ce, 'HIDDEN', [de.tag_name]);                                    
          }          
        }
      } // end loop          
    }        
  } // end validate function

},

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
               rule_result.addResult(TEST_RESULT.PASS, ce, 'PASS', [de.role.toUpperCase()]);     
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
}
]); 


    

