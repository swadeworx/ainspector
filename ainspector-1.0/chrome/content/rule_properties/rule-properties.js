/**
 * Copyright 2012 University Of Illinois
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

/**
 * @file rule-properties.js
 * 
 * @desc Contains view and view controller functions for rule properties dialog box
 */

/** 
 * @namespace OAA_WEB_ACCESSIBILITY_RULE_PROPS
 */
var OAA_WEB_ACCESSIBILITY_RULE_PROPS  = OAA_WEB_ACCESSIBILITY_RULE_PROPS || {};

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util = OAA_WEB_ACCESSIBILITY_RULE_PROPS.util || {};

/* ---------------------------------------------------------------- */
/*                    dialog                                */ 
/* ---------------------------------------------------------------- */

/**
 * @function onLoad
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Initializes rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_RULE_PROPS.onLoad = function () {

  var rule_properties = new OAA_WEB_ACCESSIBILITY_RULE_PROPS.dialog();
  
  this.rule_properties = rule_properties;
  
  var result_object  = window.arguments[0];
  
  this.result_object = result_object;
  
  if (rule_properties) {
    if (result_object) rule_properties.update(result_object);
    else rule_properties.clear();
  }
  
};

/**
 * @function onUnload
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Clears the rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_RULE_PROPS.onUnload = function () {

  this.rule_properties = null;
  this.result_object = null;
    
};

/**
 * @constructor dialog
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Initializes rule properites dialog box
 */
 
OAA_WEB_ACCESSIBILITY_RULE_PROPS.dialog = function () {

  this.result_object = null;
  
  var doc = window.document;
  
  this.node_summary    = doc.getElementById("ID_RULE_SUMMARY");
  this.node_id         = doc.getElementById("ID_RULE_ID");
  this.node_scope      = doc.getElementById("ID_RULE_SCOPE");
  this.node_definition = doc.getElementById("ID_RULE_DEFINITION");
    
  this.node_wcag20_requirements = doc.getElementById("ID_RULE_WCAG20_REQUIREMENTS");

  this.node_purpose    = doc.getElementById("ID_RULE_PURPOSE");
  this.node_techniques = doc.getElementById("ID_RULE_TECHNIQUES");
  this.node_info_links = doc.getElementById("ID_RULE_INFORMATIONAL_LINKS");

  this.node_target_description = doc.getElementById("ID_RULE_TARGET_DESCRIPTION");
  this.node_target_resources   = doc.getElementById("ID_RULE_TARGET_RESOURCES");


};


/**
 * @method dialog.clear
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Clears the rule properties of the dialod
 */
 
OAA_WEB_ACCESSIBILITY_RULE_PROPS.dialog.prototype.clear = function () {

  this.result_object = null;
  
  var util = OAA_WEB_ACCESSIBILITY_RULE_PROPS.util;
  
  var nls_strings = document.getElementById("ID_STRINGBUNDLE_RULE_PROPERTIES");
  
  window.document.title = nls_strings.getString('title');

  util.updateText(this.node_summary,    nls_strings.getString('noSummary'));
  
  util.updateText(this.node_definition, nls_strings.getString('noDefinition'));

  util.removeChildNodes(this.node_purpose);
  util.addListItem(this.node_purpose, 'none', nls_strings.getString('noPurpose'), '');

  util.removeChildNodes(this.node_techniques);
  util.addListItem(this.node_techniques, 'none', nls_strings.getString('noTechniques'), '');

  util.removeChildNodes(this.node_wcag20_requirements);
  util.addListItem(this.node_wcag20_requirements, 'none',  nls_strings.getString('noWCAG20Requirements'), '');

  util.removeChildNodes(this.node_info_links);
  util.addListItem(this.node_info_links, 'none', nls_strings.getString('noInformationalLinks'), '');

  util.updateText(this.node_id,    nls_strings.getString('noRuleId'));
  util.updateText(this.node_scope, nls_strings.getString('noRuleScope'));


};

/**
 * @method dialog.update
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Shows the rule properites of a node result
 *
 * @param {NodeResult | RuleResult}  result_object  - Node or rule result object    
 */
 
OAA_WEB_ACCESSIBILITY_RULE_PROPS.dialog.prototype.update = function (result_object) {

  var i;
  var rule;
  var nls_strings = document.getElementById("ID_STRINGBUNDLE_RULE_PROPERTIES");
  var wcag20_nls = OpenAjax.a11y.all_wcag20_nls.getNLS();

  this.result_object = result_object;

  if (this.result_object) {
  
    var util = OAA_WEB_ACCESSIBILITY_RULE_PROPS.util;
    
    if (result_object.getRule) rule = this.result_object.getRule();
    else if (rule_object.rule) rule = this.result_object.rule;
      else rule = result_object;
  
    util.updateText(this.node_summary,    this.result_object.getRuleSummary());
  
    util.updateText(this.node_definition, this.result_object.getRuleDefinition());
    
    // Purpose

    var purpose = rule.getNLSPurpose();

    util.removeChildNodes(this.node_purpose);

    if (purpose && purpose.length) { 

      for (i = 0; i < purpose.length; i++ ) {
        util.addListItem(this.node_purpose, '', purpose[i], '');
      } // end loop
      
    } else {  
      util.addListItem(this.node_purpose, 'none', nls_strings.getString('noPurpose'), '');
    }

    // WCAG 2.0 Requirements
    
    var wcag_nls = rule.getNLSRequirements();
    
    util.removeChildNodes(this.node_wcag20_requirements);
    util.addListItem(this.node_wcag20_requirements, 'primary', wcag_nls.primary.title + " (" + wcag20_nls.getNLSWCAG20Level(wcag_nls.primary.level) + ") Primary", wcag_nls.primary.url_spec);
    
    for (i = 0; i < wcag_nls.related.length; i++ ) {
      var related = wcag_nls.related[i];       
      util.addListItem(this.node_wcag20_requirements, 'related', related.title + " (" + wcag20_nls.getNLSWCAG20Level(related.level) + ")", related.url_spec);
    } // end loop

    // Add techniques

    var techniques = rule.getNLSTechniques();

    util.removeChildNodes(this.node_techniques);

    if (techniques && techniques.length) { 

      for (i = 0; i < techniques.length; i++ ) {
        util.addListItem(this.node_techniques, '', techniques[i], '');
      } // end loop
      
    } else {  
      util.addListItem(this.node_techniques, 'none', nls_strings.getString('noTechniques'), '');
    }

    // Add informational links

    var info_links = rule.getNLSInformationalLinks('text');

    util.removeChildNodes(this.node_info_links);

    if (info_links && info_links.length) { 

      for (i = 0; i < info_links.length; i++ ) {
        util.addListItem(this.node_info_links, info_links[i].type, info_links[i].title, info_links[i].url);
      } // end loop
      
    } else {  
      util.addListItem(this.node_info_links, 'none', nls_strings.getString('noInformationalLinks'), '');
    }

    util.updateText(this.node_id,    rule.getNLSRuleId());
    util.updateText(this.node_scope, rule.getNLSRuleScope());

    // Add Target Description and Resources

    util.updateText(this.node_target_description, rule.getNLSTargetResourcesDescription());
    
    util.removeChildNodes(this.node_target_resources);

    var target_resources = rule.getTargetResources();
    
    if (target_resources && target_resources.length) { 
      for (i = 0; i < target_resources.length; i++ ) {
        util.addListItemCode(this.node_target_resources, target_resources[i]);
      } // end loop      
    } else {  
      util.addListItem(this.node_target_resources, 'none', nls_strings.getString('noTargetResources'), '');
    }
    

  }
  else {
    this.clear();
  }

};

/**
 * @function util.updateText
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Removes all the children of an DOM element node and adds atext node
 *
 * @param {DOM node}  node  - DOM Element node    
 * @param {String}    text  - Text content to add to a DOM element node     
 */

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util.updateText = function (node, text) {

  var util = OAA_WEB_ACCESSIBILITY_RULE_PROPS.util;
  
  util.removeChildNodes(node);
  util.addTextNode(node, text);
  
}

/**
 * @function util.removeChildNodes
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Removes all the children of an DOM element node
 *
 * @param {DOM node}  node  - DOM Element node    
 */

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util.removeChildNodes = function (node) {

  while(node.firstChild) {
    node.removeChild(node.firstChild);
  }
  
}

/**
 * @function util.addTextNode
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Creates a DOM Text Node and appends it to the element node
 *
 * @param {DOM node}  node  - DOM Element node    
 * @param {String}  text  - Text content to add to a DOM element node     
 */

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util.addTextNode = function (node, text) {

  var doc = window.document;
  
  var text_node = doc.createTextNode(text);
  
  node.appendChild(text_node);

}


/**
 * @function util.addListItem
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Creates a LI element containing a DOM Text Node and appends it to a list element
 *
 * @param {DOM node}  node  - DOM Element node    
 * @param {String}  style   - class name     
 * @param {String}  text    - Text content to add to a DOM element node     
 * @param {String}  url     - optional URL for a link     
 */

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util.addListItem = function (node, style, text, url) {

  var doc = window.document;

  var element_node = doc.createElementNS("http://www.w3.org/1999/xhtml","li");
  element_node.setAttribute("class", style);
 
  var text_node = doc.createTextNode(text);
  
  if (url && url.length) {

    var link_node = doc.createElementNS("http://www.w3.org/1999/xhtml","a");
    link_node.setAttribute('href', url);
    link_node.setAttribute('target', "_rule_properties");

    link_node.appendChild(text_node);
    element_node.appendChild(link_node);
  }
  else {
    element_node.appendChild(text_node);
  }
  

  node.appendChild(element_node);

}

/**
 * @function util.addListItemCode
 *
 * @memberOf OAA_WEB_ACCESSIBILITY_RULE_PROPS
 *
 * @desc Creates a LI element with a child CODE element containing a DOM Text Node and appends it to a list element
 *
 * @param {DOM node}  node  - DOM Element node    
 * @param {String}  text    - Text content to add to a DOM element node     
 */

OAA_WEB_ACCESSIBILITY_RULE_PROPS.util.addListItemCode = function (node, text) {

  var doc = window.document;

  var li_node = doc.createElementNS("http://www.w3.org/1999/xhtml","li");
  var code_node = doc.createElementNS("http://www.w3.org/1999/xhtml","code"); 
  var text_node = doc.createTextNode(text);
  
  code_node.appendChild(text_node);
  li_node.appendChild(code_node);
  node.appendChild(li_node);

}

window.onload = OAA_WEB_ACCESSIBILITY_RULE_PROPS.onLoad;

window.onunload = OAA_WEB_ACCESSIBILITY_RULE_PROPS.onUnload;
