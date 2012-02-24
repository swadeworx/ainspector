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
	     
{  id                : 'CONTROL_1', 
   last_updated      : '2011-09-16', 
   cache_dependency  : 'controls_cache',
   cache_properties : ['dom_element:tag_name','type','id','label',''],
   language          : "",
   enabled           : true,  
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var ce;
     var tag_name;
     var control_type;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         control_type = control_elements[i].control_type;
         
         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT) {
             type = control_elements[i].type;         
         }
         else {
           type = ce.dom_element.tag_name;
         }

         if (control_type === OpenAjax.a11y.CONTROL_TYPE.CHECKBOX ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.FILE     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.PASSWORD ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.RADIO    ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.SELECT   ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXT     ||
             control_type === OpenAjax.a11y.CONTROL_TYPE.TEXTAREA ) {
             
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
        
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LABEL_MISSING', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', [type.toUpperCase()]);     
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
	     
{  id                : 'CONTROL_2', 
   last_updated      : '2011-09-16', 
   cache_dependency  : 'controls_cache',
   cache_properties : [],
   language          : "",
   validate          : function (dom_cache, rule_result) {
  
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var ce;
     var de;
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         type = control_elements[i].type;
     
         if (type === 'image') {
      
           if (ce.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_PASS', [type.toUpperCase()]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_ALT_MISSING', [type.toUpperCase()]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', [type.toUpperCase()]);     
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
{ id                : 'CONTROL_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
     var i;
     var ce;
     var de;
     var alb;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
         de = ce.dom_element;
  
         type = control_elements[i].type;
     
         if (type === 'radio') {
      
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.fieldset_element) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_LEGEND', []);     
             }
             else {  
               if (de.aria_labelledby) {
                 alb = de.aria_labelledby.split(' ');
                 if (alb.length>1) {
                   rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_ARIA_LABELLEDBY', []);     
                 }
                 else {
                   rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LEGEND_MISSING', []);
                 }
               }  
               else {
                 if (de.aria_label && de.aria_label.length) {
                   rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_ARIA_LABEL', []);     
                 }
                 else {
                   rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_LEGEND_MISSING', []);
                 }    
               }
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);     
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
{ id                : 'CONTROL_4', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
     var i;
     var ce;
     var de;
     var tag_name;
     var type;
   
     var control_elements   = dom_cache.controls_cache.control_elements;
     var control_elements_len = control_elements.length;
       
     // Check to see if valid cache reference
     if (control_elements && control_elements_len) {
     
       for (i=0; i < control_elements_len; i++) {
         ce = control_elements[i];
  
         type = control_elements[i].type;
     
         if (type === 'button') {
      
           if (ce.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (ce.label && ce.label.length) {
               rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_HAS_CONTENT', []);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_NO_CONTENT', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);     
           }
         }
       } // end loop
     }   

  } // end validate function
},
 

/**
 * @object CONTROL_5
 *
 * @desc Textarea, select, input and button elements with id attributes, must have unique id values on the page
 */
{ id                : 'CONTROL_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
   
    var i;
    var ce;
    var de;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
        de = ce.dom_element;

        switch (de.id_unique) { 
        
        case OpenAjax.a11y.ID.NOT_UNIQUE:
          rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_DUPLICATE_ID', [de.id]);
          break;          
          
        case OpenAjax.a11y.ID.UNIQUE:
          rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_UNIQUE_ID', [de.id]);               
          break;
          
        default:
          break;        
        }
        
      } // end loop
    }     
  } // end validate function
},
 
/**
 * @object CONTROL_6
 * 
 * @desc Label with a for attribute reference does not reference a form control
 */
{ id                : 'CONTROL_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var le;
    var de;
    var tag_name;

    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (i=0; i < label_elements_len; i++) {
        le = label_elements[i];
        
        if (le.unused_label) {
          de = dom_cache.element_with_id_cache.getDOMElementById(le.for_id);
          
          if (de && de.tag_name) {  
            rule_result.addResult(SEVERITY.WARNING, le, 'MESSAGE_NO_CONTROL', [de.tag_name]);
          }
          else {          
            rule_result.addResult(SEVERITY.WARNING, le, 'MESSAGE_NO_ELEMENT', []);    
          }           
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
 
{ id                : 'CONTROL_7', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var le;
    var de;

    var label_elements      = dom_cache.controls_cache.label_elements;
    var label_elements_len  = label_elements.length;
       
    // Check to see if valid cache reference
    if (label_elements && label_elements_len) {
     
      for (i=0; i < label_elements_len; i++) {
        le = label_elements[i];
        
        if (le.label && le.label.length === 0) {
          rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_NO_CONTENT', []);
        }
        else {
          rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_CONTENT', []);        
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
 
{ id                : 'CONTROL_8', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var fe;

    var fieldset_elements      = dom_cache.controls_cache.fieldset_elements;
    var fieldset_elements_len  = fieldset_elements.length;
       
    // Check to see if valid cache reference
    if (fieldset_elements && fieldset_elements_len) {
     
      for (i=0; i < fieldset_elements_len; i++) {
        fe = fieldset_elements[i];
        
        if (fe.legend_count === 0) {
          rule_result.addResult(SEVERITY.FAIL, fe, 'MESSAGE_NO_LEGEND', []);        
        }
        else {
          if (fe.legend_count > 1) {
            rule_result.addResult(SEVERITY.FAIL, fe, 'MESSAGE_MORE_THAN_ONE', []);        
          }
          else {
            rule_result.addResult(SEVERITY.PASS, fe, 'MESSAGE_ONLY_ONE', []);                  
          }
        }
      } // end loop
    } 

  } // end validate function
},

/** 
 * @object CONTROL_9
 *
 * @desc Fieldset should contain exactly one legend element 
 */
 
{ id                : 'CONTROL_9', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY   = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;

    var i;
    var ce;

    var control_elements      = dom_cache.controls_cache.control_elements;
    var control_elements_len  = control_elements.length;
       
    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
        
        if (ce.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

          if (ce.label_source === OpenAjax.a11y.SOURCE.TITLE_ATTRIBUTE) {
            rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_USES_TITLE', []);        
          }
          else {
            rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_DOES_NOT_USE_TITLE', []);                  
          }  
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, ce, 'MESSAGE_HIDDEN', []);                          
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
 
{ id                : 'CONTROL_10', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;
    var VISIBILITY = OpenAjax.a11y.VISIBILITY;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var ces   = [];

    // Check to see if valid cache reference
    if (control_elements && control_elements_len) {
     
      // collect all the visible controls 
      for (i=0; i < control_elements_len; i++) {
        ce = control_elements[i];
  
        type = control_elements[i].type;
     
        if (ce.dom_element.computed_style.is_visible_to_at === OpenAjax.a11y.VISIBILITY.VISIBLE) { 
          if (type === 'checkbox' ||
              type === 'file'   ||
              type === 'password' ||
              type === 'radio'  ||
              type === 'select'  ||
              type === 'text'   ||
              type === 'textarea') {
            
            // check to make sure label has content            
            if (ce.label && ce.label.length) {  
              ces.push(ce);  
            }  
          }
        }
      } // end loop    
      
      // sort labels
      
      ces = dom_cache.sortArrayOfObjects(ces,'label_for_comparison', true); 

      for (i=0; i<ces.length; i++) {
        ce = ces[i];
        if (ce.duplicate) {
          rule_result.addResult(SEVERITY.FAIL, ce, 'MESSAGE_DUPLICATE_LABEL', [ce.label]);                
        }
        else {
          rule_result.addResult(SEVERITY.PASS, ce, 'MESSAGE_LABEL_UNIQUE', [ce.label]);        
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
 
{ id                : 'CONTROL_11', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'controls_cache',
  cache_properties : [],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;
   
    var i;
    var ce;
    var tag_name;
    var type;
   
    var control_elements   = dom_cache.controls_cache.control_elements;
    var control_elements_len = control_elements.length;
    var current_controls   = [];
       
  } // end validate function
}
]); 


    

