/** ================================================================
*
* OpenAjax Alliance List Rules
*
* =============================================================== */

OpenAjax.a11y.addRules([

/** ================================================================
*
*  LIST 1: A list of navigational links should be contained within an element with role=navigation.
*          Thus any ul or ol element that contains at least a specified minimum of li elements with
*          one and only one link is considered a list of links and must have role=navigation.
* 
* Group: Controls
* 
* Last update: 
*
* =============================================================== */
  {
    id              : 'LIST_1',
    lastUpdated     : '2011-09-27',
    cacheDependency : 'lists_cache',
    cacheProperties : [],
    language        : "",
    enabled         : true,
    validateParams  : {},
    validate        : function (dom_cache, rule_result) {

      var MINIMUM_LI_ELEMENTS = 3; // to be considered a list of links
      var SEVERITY = OpenAjax.a11y.SEVERITY;
      var list_elements = dom_cache.lists_cache.list_elements;

      var i; // loop counter
      var max = list_elements.length; // loop control
      var le; // loop placeholder

      for (i = 0; i < max; i++) {
        le = list_elements[i];

        if (le.dom_element.tag_name === 'ul' ||
           le.dom_element.tag_name === 'ol') {
          // TODO: Add constants in openajax_a11y_constants for role values
          if (le.isListOfLinks(MINIMUM_LI_ELEMENTS)) {
            if (le.dom_element.hasAttrWithValue('role', 'navigation')) {
              rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_ROLE_NAV_ON_LIST',
                                    [le.dom_element.tag_name]);
            }
            else {
              if (le.dom_element.parent && le.dom_element.parent.hasAttrWithValue('role', 'navigation')) {
                rule_result.addResult(SEVERITY.PASS, le, 'MESSAGE_HAS_ROLE_NAV', [le.dom_element.tag_name]);
              }
              else {
                rule_result.addResult(rule_result.rule_severity, le, 'MESSAGE_MISSING_ROLE_NAV',
                                      [le.dom_element.tag_name]);
              }
            }
          }
        }
      }
    } // end validate function
  }
]);
