/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/**
 * @rule IMAGE_1
 *
 * @desc Images must have alt attribute
 *
 * @group images
 */
 
{ id              : 'IMAGE_1', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
 
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
        }
        else {      
          if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
          
            if (ie.has_alt) {
              rule_result.addResult(SEVERITY.PASS, ie, 'MESSAGE_PASS', []);     
            }
            else {
              rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_MISSING', []);     
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
 * @rule IMAGE_2
 *
 * @desc If the longdesc attribute is defined, it must have valid URI
 *
 * @group images
 */
{ id              : 'IMAGE_2', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['longdesc', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {

    var SEVERITY  = OpenAjax.a11y.SEVERITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var i;
    var ie = null;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        if (ie.longdesc) {
          if (ie.dom_element.hasAttrWithValue('role', 'presentation')) {     
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_PRESENTATION', []);     
          }
          else {      
            if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
            
              switch (OpenAjax.a11y.cache.util.UrlExists(ie.longdesc)) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.SEVERITY.PASS, ie, 'MESSAGE_PASS', [ie.longdesc]);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_FAIL', [ie.longdesc]);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, ie, 'MESSAGE_NOT_TESTED', [ie.longdesc]);     
                break;
         
              default:
                rule_result.addResult(SEVERITY.MANUAL_EVALUATION, ie, 'MESSAGE_ERROR', [ie.longdesc]);
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
 * @rule IMAGE_3
 *
 * @desc The file name of the image should not be part of the alt text content (it must have an image file extension)
 *
 * @group images
 */
{ id              : 'IMAGE_3', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
  
    var SEVERITY = OpenAjax.a11y.SEVERITY;
  
    var i;
    var ie;
    var pos;
    var file_name;
   
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     
        
        if (ie.source && 
            ie.has_alt && 
            ie.alt_length) {
                  
            if (ie.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
              pos = ie.source.lastIndexOf('/');    
              file_name = ie.source.substring((pos+1)).toLowerCase();
        
              // make sure it has a file extension, will assume extension is for an image
              if (file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(file_name) >= 0 ) {
                  rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_FAIL', [file_name]);                 
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
 * @rule IMAGE_4_EN (English)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (English only)
 *
 * @group images
 */
{ id              : 'IMAGE_4_EN', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "en-us en-br",
  enabled         : true,  
  validateParams  : {
    max_alt_text_length: { value: 100, type: 'Integer' }
  }, 
  validate        : function (dom_cache, rule_result) {
      
    var MAX_ALT_TEXT_LENGTH = parseInt(this.validateParams.max_alt_text_length.value,10);

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_TO_LONG', [ie.alt_length, MAX_ALT_TEXT_LENGTH]);     
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
 * @rule IMAGE_4_FR (French)
 *
 * @desc If the ALT attribute contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (French only)
 *
 * @group images
 */
{ id              : 'IMAGE_4_FR', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'alt_length', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "fr",
  enabled         : true,  
  validateParams  : {
    max_alt_text_length: { value: 120, type: 'Integer' }
  }, 
  validate        : function (dom_cache, rule_result) {
      
    var SEVERITY = OpenAjax.a11y.SEVERITY;   
    var MAX_ALT_TEXT_LENGTH = parseInt(this.validateParams.max_alt_text_length.value,10);

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
    
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];
     
        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
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
 * @rule IMAGE_5
 *
 * @desc If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position
 *
 * @group images
 */
{ id              : 'IMAGE_5', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'height', 'width', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {

    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];     

        if (ie.dom_element.hasAttrWithValue('role', 'presentation') ||
            ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE ||
            !ie.has_alt) {     
          rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
        }
        else {      
          if ((ie.height == 1 || ie.width == 1) && ie.alt_length > 0 ) {
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_ALT_NOT_EMPTY', []);     
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
 * @rule IMAGE_6
 *
 * @desc If the alt is empty or role is set presentation verify the image is purely decorative
 *
 * @group images
 */
{ id              : 'IMAGE_6', 
  lastUpdated     : '2011-09-16', 
  cacheDependency : 'images_cache',
  cacheProperties : ['alt', 'height', 'width', 'dom_element:role', 'dom_element:computed_style:at'],
  language        : "",
  enabled         : true,  
  validateParams  : {}, 
  validate        : function (dom_cache, rule_result) {
    
    var SEVERITY = OpenAjax.a11y.SEVERITY;

    var i;
    var ie;
    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (i=0; i < image_elements_len; i++) {
        ie = image_elements[i];   

        if (ie.dom_element.computed_style.at != OpenAjax.a11y.VISIBILITY.VISIBLE) {
 
          if (ie.has_alt && ie.alt_length === 0) {     
            rule_result.addResult(rule_result.rule_severity, ie, 'MESSAGE_VERIFY', []);     
          }
          else {      
            rule_result.addResult(SEVERITY.NA, ie, 'MESSAGE_NA', []);     
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
 


    

