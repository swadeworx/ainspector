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
 * @object AUDIO_1
 *
 * @desc Pre-recorded audio must have captions or text transcripts
 */ 
 
{ rule_id             : 'AUDIO_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.1',
  wcag_related_ids    : ['1.2.2', '1.2.4', '1.2.9'],
  target_resources    : ['embed', 'object', 'audio'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

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
        
        if (me.is_audio === MEDIA.YES && me.is_video === MEDIA.NO ) {
        
          if (me.has_caption === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
          }
          else if (me.has_text_alternative === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_2', [tag_name]);
          }
          else if (me.has_caption === MEDIA.MAYBE || me.has_text_alternative === MEDIA.MAYBE) {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
          }    
        }
        else {
          if (me.is_audio === MEDIA.MAYBE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }
  } // end validate function
},

/**
 * @object AUDIO_2
 *
 * @desc Pre-recorded audio must have text transcripts
 */ 
 
{ rule_id             : 'AUDIO_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.AUDIO,
  last_updated        : '2012-10-31', 
  wcag_primary_id     : '1.2.9',
  wcag_related_ids    : ['1.2.1'],
  target_resources    : ['embed', 'object', 'audio'],
  cache_dependency    : 'media_cache',
  resource_properties : ['tag_name', 'name', 'type', 'src', 'alt'],
  language_dependency : "",
  validate          : function (dom_cache, rule_result) {

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
        
        if (me.is_audio === MEDIA.YES && me.is_video === MEDIA.NO ) {
        
          if (me.has_text_alternative === MEDIA.YES) {
            rule_result.addResult(TEST_RESULT.PASS, me, 'PASS_1', [tag_name]);
          }
          else if (me.has_caption === MEDIA.MAYBE || me.has_text_alternative === MEDIA.MAYBE) {
             rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_1', [tag_name]);
          }
          else {
            rule_result.addResult(TEST_RESULT.FAIL, me, 'CORRECTIVE_ACTION_1', [tag_name]);
          }    
        }
        else {
          if (me.is_audio === MEDIA.MAYBE) {
            rule_result.addResult(TEST_RESULT.MANUAL_CHECK, me, 'MANUAL_CHECK_2', [tag_name]);
          }
        }
      }  
    }
  } // end validate function
}  


]);
