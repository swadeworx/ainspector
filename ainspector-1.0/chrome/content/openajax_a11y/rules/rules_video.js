/**
 * Copyright 2011-2012 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* ---------------------------------------------------------------- */
/*            OpenAjax Alliance Media Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object VIDEO_1
 *
 * @desc Video only must have equivalents
 */ 
  {
  rule_id             : 'VIDEO_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_audio === MEDIA.NO) {
        
          if (me.has_audio_description === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
          }
          else if (me.has_text_alternative === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_2', [tag_name]);
          }
          else if (me.has_audio_description === MEDIA.MAYBE || me.has_text_alternative === MEDIA.MAYBE) {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE ||
              (me.is_video === MEDIA.YES && me.is_audio === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }
  } // end validate function
 },
 

/**
 * @object VIDEO_2
 *
 * @desc Video with audio must have captions
 */ 
  {
  rule_id             : 'VIDEO_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.2',
  wcag_related_ids    : ['1.2.1', '1.2.4'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_audio === MEDIA.YES && me.is_live === MEDIA.NO) {
        
          switch (me.has_caption) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },
 
/**
 * @object VIDEO_3
 *
 * @desc Prerecorded video must have audio description or text equivalent
 */ 
  {
  rule_id             : 'VIDEO_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.3',
  wcag_related_ids    : ['1.2.1', '1.2.5'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_live === MEDIA.NO) {
        
          switch (me.has_audio_description) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },

/**
 * @object VIDEO_4
 *
 * @desc Live video or audio must have captions
 */ 
  {
  rule_id             : 'VIDEO_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.4',
  wcag_related_ids    : ['1.2.2'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_live === MEDIA.YES) {
        
          switch (me.has_audio_description) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },
 
/**
 * @object VIDEO_5
 *
 * @desc Prerecorded video must have audio descriptions
 */ 
  {
  rule_id             : 'VIDEO_5', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.5',
  wcag_related_ids    : ['1.2.1', '1.2.3'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_live === MEDIA.NO) {
        
          switch (me.has_audio_description) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },
 
/**
 * @object VIDEO_6
 *
 * @desc Prerecored video (with audio content) must have sign language interpretation 
 */ 
  {
  rule_id             : 'VIDEO_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.6',
  wcag_related_ids    : ['1.2.3'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_live === MEDIA.NO) {
        
          switch (me.has_sign_language) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },
 
/**
 * @object VIDEO_7
 *
 * @desc Prerecorded video must have extended audio descriptions
 */ 
  {
  rule_id             : 'VIDEO_7', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.7',
  wcag_related_ids    : ['1.2.1', '1.2.5'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {


    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_live === MEDIA.NO) {
        
          switch (me.has_extended_audio_description) {
            case MEDIA.YES:
              rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
              break;
              
            case MEDIA.MAYBE:
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
              break;
              
            default:  
              rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
              break;
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE || 
              (me.is_video === MEDIA.YES && me.is_live === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }

  } // end validate function
 },
 
 /**
 * @object VIDEO_8
 *
 * @desc Video only must have text descriptions
 */ 
  {
  rule_id             : 'VIDEO_8', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.VIDEO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.8',
  wcag_related_ids    : ['1.2.1'],
  target_resources    : ['embed', 'object', 'video'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

    var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
    var MEDIA       = OpenAjax.a11y.MEDIA;
  
    var media_elements     = dom_cache.media_cache.media_elements;
    var media_elements_len = media_elements.length;

    for (var i = 0; i < media_elements_len; i++ ) {
      var me = media_elements[i];
      var tag_name = me.dom_element.tag_name;
      if (me.dom_element.computed_style.is_visible_onscreen === VISIBILITY.INVISIBLE) {
        rule_result.addResult(TEST_RESULT.HIDDEN, me, 'HIDDEN', [tag_name]);                      
      }
      else {
        
        if (me.is_video === MEDIA.YES && me.is_audio === MEDIA.NO) {
        
          if (me.has_text_alternative === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
          }
          else if (me.has_text_alternative === MEDIA.MAYBE) {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
          }    
        }
        else {
          if (me.is_video === MEDIA.MAYBE ||
              (me.is_video === MEDIA.YES && me.is_audio === MEDIA.MAYBE)) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }
  } // end validate function
 } 

 
 
 
]);
