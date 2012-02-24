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
/*            OpenAjax Alliance List Rules                         */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object LIST_1 
 * 
 * @desc A list of navigational links should be contained within an element with role=navigation.
 *          Thus any ul or ol element that contains at least a specified minimum of li elements with
 *          one and only one link is considered a list of links and must have role=navigation.
 */
 
  {
    id                : 'LIST_1',
    last_updated      : '2011-09-27',
    cache_dependency  : 'lists_cache',
    cache_properties : [],
    language          : "",
    validate        : function (dom_cache, rule_result) {

      var MINIMUM_LI_ELEMENTS = 3; // to be considered a list of links
      var SEVERITY = OpenAjax.a11y.SEVERITY;
      var container_elements = dom_cache.lists_cache.container_elements;

      var i; // loop counter
      var max = container_elements.length; // loop control
      var le; // loop placeholder

      for (i = 0; i < max; i++) {
        le = container_elements[i];

        if (le.isListOfLinks(MINIMUM_LI_ELEMENTS)) {
          if (le.dom_element.hasAttrWithValue('role', 'navigation')) {
            rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_ROLE_NAV_ON_LIST',
                                    [le.dom_element.tag_name]);
          }
          else {
            if (le.dom_element.parent && le.dom_element.parent.hasAttrWithValue('role', 'navigation')) {
              rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_ROLE_NAV', [le.dom_element.tag_name]);
            }
            else {
              rule_result.addResult(SEVERITY.FAIL, le, 'MESSAGE_MISSING_ROLE_NAV',
                                      [le.dom_element.tag_name]);
            }
          }
        }
      } // end loop
    } // end validate function
  }
]);
