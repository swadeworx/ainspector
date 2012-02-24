/**
 * Copyright 2011 and 2012 OpenAjax Alliance
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
 * @object MEDIA_1
 *
 * @desc Pre-recorded audio must have text alternative
 */ 
 
  {
    id                : 'MEDIA_1',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var MEDIA      = OpenAjax.a11y.MEDIA;
      
      var media_elements     = dom_cache.media_cache.media_elements;
      var media_elements_len = media_elements.length;

      var i; 
      var me; 
      var tag_name;
      var ps;

      for (i = 0; i < media_elements_len; i++) {
        me = media_elements[i];
        tag_name = me.dom_element.tag_name;

        if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        
          if (me.is_audio === MEDIA.YES || me.is_audio === MEDIA.MAYBE) {
            if (me.has_text_alternative === MEDIA.YES) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {          
              if (me.is_audio === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_FAIL', []);
              }
            }
          }
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', [tag_name]);
        }
      } // end loop
    } // end validate function
  },
  
/**
 * @object MEDIA_2
 *
 * @desc Pre-recorded video must have audio descriptions
 */ 
  {
    id                : 'MEDIA_2',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate          : function (dom_cache, rule_result) {

      var SEVERITY   = OpenAjax.a11y.SEVERITY;
      var VISIBILITY = OpenAjax.a11y.VISIBILITY;
      var MEDIA      = OpenAjax.a11y.MEDIA;
      
      var media_elements     = dom_cache.media_cache.media_elements;
      var media_elements_len = media_elements.length;

      var i; 
      var me; 
      var tag_name;

      for (i = 0; i < media_elements_len; i++) {
        me = media_elements[i];
        tag_name = me.dom_element.tag_name;

        if (me.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
        
          if (me.is_video === MEDIA.YES || me.is_video === MEDIA.MAYBE) {
          
            if (me.has_text_alternative) {
              rule_result.addResult(SEVERITY.PASS, me, 'MESSAGE_PASS', []);
            }
            else {
              if (me.is_video === MEDIA.MAYBE) {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_MAYBE', [tag_name]);            
              }
              else {
                rule_result.addResult(SEVERITY.MANUAL_CHECK, me, 'MESSAGE_FAIL', []);
              }
            }
          }
        }
        else {
          rule_result.addResult(SEVERITY.HIDDEN, me, 'MESSAGE_HIDDEN', [tag_name]);
        }
      } // end loop
    } // end validate function
  }  
]);
