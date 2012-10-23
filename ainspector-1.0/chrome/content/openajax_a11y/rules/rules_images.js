/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object IMAGE_1
 *
 * @desc Images must have alt attribute
 */
 
{ rule_id             : 'IMAGE_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'images_cache',
  resource_properties : ['alt', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
 
    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', [de.tag_name]);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if (de.has_alt_attribute) {
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', []);     
            }
            else {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', [de.tag_name]);     
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_2', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['longdesc', 'longdesc_is_broken', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var URL_RESULT = OpenAjax.a11y.URL_RESULT;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (ie.longdesc) {
        
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
              switch (ie.longdesc_is_broken) {
         
              case URL_RESULT.VALID:
                rule_result.addResult(OpenAjax.a11y.TEST_RESULT.PASS, ie, 'PASS_1', []);     
                break;
          
              case URL_RESULT.INVALID:
                rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', []);     
                break;
          
              case URL_RESULT.NOT_TESTED:
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK_1', []);     
                break;
         
              default:
                rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK_1', []);
                break;
              } 
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', []);     
          }
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
{ rule_id             : 'IMAGE_3', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['alt', 'file_name', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', []);
        }
        else {
        
          if (ie.alt_for_comparison && ie.alt_for_comparison.length) {
          
            if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
              // make sure it has a file extension, will assume extension is for an image
              if (ie.file_name.indexOf('.') >= 0) {
         
                if (ie.alt_for_comparison.indexOf(ie.file_name) >= 0 ) {
                  rule_result.addResult(TEST_RESULT.FAIL, ie, 'FAIL', []);                 
                }
                else {
                  rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', []);                 
                }
              }
              else {
                rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', []);                              
              }
            }
            else {
              rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
            }
          }  
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
{ rule_id             : 'IMAGE_4_EN', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['alt', 'alt_length', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_ALT_TEXT_LENGTH = 100;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', []);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if (ie.alt_length > MAX_ALT_TEXT_LENGTH) {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', [MAX_ALT_TEXT_LENGTH]);     
            }
            else {      
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', [MAX_ALT_TEXT_LENGTH]);     
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_5', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['alt_length', 'height', 'width', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_IMAGE_HEIGHT = 6;
    var MAX_IMAGE_WIDTH  = 6;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
     
        if (de.hasAttrWithValue('role', 'presentation')) {     
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'PRESENTATION', [de.tag_name]);
        }
        else {
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            if ((ie.height <= MAX_IMAGE_HEIGHT || ie.width <= MAX_IMAGE_WIDTH) && ie.alt_length > 0 ) {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', []);     
            }
            else {      
              rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', []);     
            } 
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
{ rule_id             : 'IMAGE_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  last_updated        : '2011-09-16', 
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['has_alt_attribute', 'alt_length', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
    
    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
          if (ie.alt_length === 0 || de.role == 'presentation') {     
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK_1', []);
          }
        }    
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
        }
      } // end loop
    } 
  } // end validation function
} 
]); 
 


    

