/* ---------------------------------------------------------------- */
/* OpenAjax Alliance IMG and AREA element Rules                     */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/**
 * @object IMAGE_1
 *
 * @desc Images must have a source for an accessible name
 */
 
{ rule_id             : 'IMAGE_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area', '[role="img"]'],
  cache_dependency    : 'images_cache',
  resource_properties : ['accessible_name', 'alt', 'aria_label', 'aria_labelledby', 'title', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
 
    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var SOURCE      = OpenAjax.a11y.SOURCE;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
          if (ie.accessible_name_source !== SOURCE.NONE) {
            if (ie.accessible_name_source === SOURCE.ALT_ATTRIBUTE)        rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', [de.tag_name]);
            else if (ie.accessible_name_source === SOURCE.ARIA_LABELLEDBY) rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_2', [de.tag_name]);
            else if (ie.accessible_name_source === SOURCE.ARIA_LABEL)      rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_3', [de.tag_name]);
            else rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_4', [de.tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', [de.tag_name]);     
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
  target_resources    : ['img', '[role="img"]'],
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
 * @desc The file name of the image should not be part of the accessible name content (it must have an image file extension)
 */
{ rule_id             : 'IMAGE_3', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['accessible_name', 'file_name', 'is_visible_to_at'],
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

        if (ie.accessible_name_for_comparison && ie.accessible_name_for_comparison.length) {
          
          if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
            // make sure it has a file extension, will assume extension is for an image
            if (ie.file_name.indexOf('.') >= 0) {
         
              if (ie.accessible_name_for_comparison.indexOf(ie.file_name) >= 0 ) {
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
      } // end loop
    } 
  } // end validation function  
 }, 

/**
 * @object IMAGE_4_EN (English)
 *
 * @desc If the accessible name contains content, it should be less than 120 characters long, longer descriptions should use long description techniques (English only)
 */
{ rule_id             : 'IMAGE_4_EN', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['accessible_name', 'accessible_name_length', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_ACCESSIBLE_NAME_LENGTH = 100;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
          if (ie.accessible_name_length > MAX_ACCESSIBLE_NAME_LENGTH) {
            rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', [MAX_ACCESSIBLE_NAME_LENGTH]);     
          }
          else {     
            rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', [MAX_ACCESSIBLE_NAME_LENGTH]);     
          }
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
        }
      } // end loop
    } 
  } // end validation function
},

/**
 * @object IMAGE_5
 *
 * @desc If an image has a height or width of 6 pixels its accessible name set to empty, role set to presentation or the image removed and use CSS position
 */
{ rule_id             : 'IMAGE_5', 
  last_updated        : '2011-09-16', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.IMAGES,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  cache_dependency    : 'images_cache',
  resource_properties    : ['accessible_name_length', 'role', 'height', 'width', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var MAX_IMAGE_HEIGHT = 6;
    var MAX_IMAGE_WIDTH  = 6;

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements.concat(dom_cache.images_cache.presentation_elements);
    var image_elements_len = image_elements.length;
       
    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
          
          if ((ie.height <= MAX_IMAGE_HEIGHT || ie.width <= MAX_IMAGE_WIDTH)) {
            if (de.role === 'presentation') rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_1', []);
            else if (ie.accessible_name_length === 0) rule_result.addResult(TEST_RESULT.PASS, ie, 'PASS_2', []);
            else rule_result.addResult(TEST_RESULT.FAIL, ie, 'CORRECTIVE_ACTION_1', []);
          } 
        }
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', [de.tag_name]);     
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
  target_resources    : ['img', '[role="img"]'],
  cache_dependency    : 'images_cache',
  resource_properties : ['accessible_name', 'role', 'is_visible_to_at'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
    
    var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY    = OpenAjax.a11y.VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements.concat(dom_cache.images_cache.presentation_elements);
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {
     
      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
          if (ie.accessible_name_length === 0 || ie.is_presentation) {     
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'MANUAL_CHECK_1', []);
          }
        }    
        else {
          rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'HIDDEN', []);     
        }
      } // end loop
    } 
  } // end validation function
} 
]); 
 


    

