/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object IMAGE_1
 *
 * @desc Images must have alt attribute
 */
 
{ id                : 'IMAGE_1', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
 
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
        }
        else {      
          if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
            if (de.has_alt_attribute) {
              rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', []);     
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_MISSING', []);     
            }
          }
          else {
            rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
          }
        }      
      } // end loop
    } 
  } // end validation function  
},

/**
 * @object IMAGE_2
 *
 * @desc If the longdesc attribute is defined, it must have valid URI
 */
{ id                : 'IMAGE_2', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties : ['longdesc', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY  = OpenAjax.a11y.SEVERITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var i;
    var ie = null;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;
        
        if (ie.longdesc) {
          if (de.hasAttrWithValue('role', 'presentation')) {     
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
          }
          else {      
            if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
            
              switch (ie.longdesc_is_broken) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.longdesc]);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_FAIL', [ie.longdesc]);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_NOT_TESTED', [ie.longdesc]);     
                break;
         
              default:
                rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_ERROR', [ie.longdesc]);
                break;
              } 
            }
            else {       
              rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
            }
          }       
        }
        else {
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }      
      } // end loop
    } 
  } // end validation function
}, 

/**
 * @object IMAGE_3
 *
 * @desc The file name of the image should not be part of the alt text content (it must have an image file extension)
 */
{ id                : 'IMAGE_3', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties : ['has_alt_attribute', 'alt', 'file_name', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
  
    var SEVERITY = OpenAjax.a11y.SEVERITY;
  
    var i;
    var ie;
    var de;
    var pos;
    var file_name;
   
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;
        
        if (ie.source && 
            de.has_alt_attribute && 
            ie.alt_length) {
                  
            if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
              // make sure it has a file extension, will assume extension is for an image
              if (ie.file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(file_name) >= 0 ) {
                  rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_FAIL', [file_name]);                 
                }
                else {
                   rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);                 
                }
              }
              else {
                rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NO_FILE_NAME', []);                              
              }
            }
            else {
              rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_HIDDEN', []);                              
            }
        }
        else {
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NO_ALT', []);                              
        } 
      } // end loop
    }
  } // end validation function  
 }, 

/**
 * @object IMAGE_4_EN (English)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (English only)
 */
{ id                : 'IMAGE_4_EN', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "en-us en-br",
  validate          : function (dom_cache, rule_result) {
      
    var MAX_ALT_TEXT_LENGTH = 100;

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
          else {      
            rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
        }      
      } // end loop
    } 
  } // end validation function
},

/**
 * @object IMAGE_4_FR (French)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (French only)
 */
{ id                : 'IMAGE_4_FR', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "fr",
  validate          : function (dom_cache, rule_result) {
      
    var SEVERITY = OpenAjax.a11y.SEVERITY;   
    var MAX_ALT_TEXT_LENGTH = 120;
    
    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
    
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(rule_result_rule_severity, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
          else {      
            rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
          }
        }      
      } // end loop
    } 
  } // end validation function
},

/**
 * @object IMAGE_5
 *
 * @desc If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position
 */
{ id                : 'IMAGE_5', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'height', 'width', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        de = ie.dom_element;

        if (de.hasAttrWithValue('role', 'presentation') ||
            de.computed_style.is_visible_to_at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !de.has_alt_attribute) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if ((ie.height == 1 || ie.width == 1) && ie.alt_length > 0 ) {
            rule_result.addResult(SEVERITY.FAIL, ie, 'MESSAGE_ALT_NOT_EMPTY', []);     
          }
          else {      
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PASS', []);     
          } 
        } 
      } // end loop
    } 
  } // end validation function
}, 
 
/**
 * @object IMAGE_6
 *
 * @desc If the alt is empty or role is set presentation verify the image is purely decorative
 */
{ id                : 'IMAGE_6', 
  last_updated      : '2011-09-16', 
  cache_dependency  : 'images_cache',
  cache_properties  : ['has_alt_attribute', 'alt_length', 'role', 'at'],
  language          : "",
  validate          : function (dom_cache, rule_result) {
    
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var de;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i = 0; i < image_elements_len; i++) {
        ie = image_elements[i];
        de = ie.dom_element;

        if (de.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          if (ie.alt_length === 0 || de.role == 'presentation') {     
            rule_result.addResult(SEVERITY.MANUAL_CHECK, ie, 'MESSAGE_VERIFY', []);
          }
        }    
        else {
          rule_result.addResult(SEVERITY.HIDDEN, ie, 'MESSAGE_HIDDEN', []);     
        }
      } // end loop
    } 
  } // end validation function
} 
]); 
 


    

