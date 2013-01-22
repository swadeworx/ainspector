/* ---------------------------------------------------------------- */
/*  OpenAjax Alliance Control Rules                                 */ 
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([

/**
 * @object WIDGET_1
 * 
 * @desc ARIA Widgets must have accessible names
 */
	     
{ rule_id             : 'WIDGET_1', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="widget"]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['accessible_name', 'accessible_description', 'computed_label_source'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widgets     = dom_cache.controls_cache.widget_elements;
     var widgets_len = widgets.length;
       
     // Check to see if valid cache reference
     if (widgets && widgets_len) {
     
       for (var i = 0; i < widgets_len; i++) {
         var we = widgets[i];
         var de = we.dom_element;
  
         if (de.is_widget) {
         
           if (de.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
     
             if (we.computed_label && we.computed_label.length) {
               rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_1', [de.role]);     
             }
             else {
               if (!de.role_info.reqName) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, we, 'MANUAL_CHECK_1', [de.role]);  
               else rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_1', [de.role]);     
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'HIDDEN', [de.role]);     
           }
         }  
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_2
 * 
 * @desc Elements with onClick event handlers event handlers need role 
 */
	     
{ rule_id             : 'WIDGET_2', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[onClick]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['tag_name', 'role', 'has_click', 'is_widget'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
    
     function hasDecendantWidgetRole(dom_element) {
       
       function checkChildren(list) {
       
         if (typeof list !== 'object') return false;
       
         var flag = false;
       
         for (var i = 0; (i < list.length) && !flag; i++) {
           
           var de = list[i];
           
           if (de.type != Node.ELEMENT_NODE) continue;
           
           if (de.is_widget) flag = true;

           if (de.child_dom_elements.length) flag = checkChildren(de.child_dom_elements);
            
         }
         
         return flag;
       
       }
          
       return checkChildren(dom_element.child_dom_elements);     
     }  
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var dom_elements     = dom_cache.element_cache.dom_elements;
     var dom_elements_len = dom_elements.length;
       
     if (dom_elements && dom_elements_len) {
     
       for (var i = 0; i < dom_elements_len; i++) {
         var de = dom_elements[i];
         var style = de.computed_style;
       
        if (de.events.has_click) { 
        
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             if (de.tag_name !== "body" && de.tag_name !== "frame" &&  de.tag_name !== "iframe") {
         
               if (de.is_widget) {
                 if (!isNaN(de.tab_index))  rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.tag_name]);     
                 else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.tag_name, de.role]);
               }
               else if ("input textarea button select".indexOf(de.tag_name) >= 0) {
                   rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [de.tag_name]);     
                 }
                 else if ("a area".indexOf(de.tag_name) >= 0) {
                   rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_3', [de.tag_name]);
                 }
                 else {
                   if (hasDecendantWidgetRole(de)) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [de.tag_name]);
                   else if (!isNaN(de.tab_index)) rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_2', [de.tag_name]);     
                   else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_3', [de.tag_name]);
               }    
             }
             else {
               rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [de.tag_name]);
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.tag_name]);     
           }
         }  
         
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_3
 * 
 * @desc Elements with role values must have valid widget or landmark roles 
 */
	     
{ rule_id             : 'WIDGET_3', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[onClick]'],
  cache_dependency    : 'controls_cache',
  resource_properties    : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var elements_with_role     = dom_cache.controls_cache.elements_with_role;
     var elements_with_role_len = elements_with_role.length;
     
     if (elements_with_role && elements_with_role_len) {
     
       for (var i = 0; i < elements_with_role_len; i++) {
         var de = elements_with_role[i];
         var style = de.computed_style;
       
         if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
           if (de.is_widget) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role]);     
           else if (de.is_landmark) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [de.role]);
           else if (de.is_live) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_3', [de.role]);
           else if (de.is_section) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_4', [de.role]);
           else if (de.is_abstract) rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.role]);
           else if (de.role.length === 0) rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_2', []);
           else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_3', [de.role]);
         }
         else {
           rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.tag_name, de.role]);     
         }         
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_4
 * 
 * @desc Elements with ARIA attributes have valid values
 */
	     
{ rule_id             : 'WIDGET_4', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-atomic]', 
                         '[aria-autocomplete]', 
                         '[aria-busy]', 
                         '[aria-checked]', 
                         '[aria-controls]', 
                         '[aria-describedby]', 
                         '[aria-disabled]', 
                         '[aria-dropeffect]', 
                         '[aria-expanded]', 
                         '[aria-flowto]', 
                         '[aria-grabbed]', 
                         '[aria-haspopup]', 
                         '[aria-hidden]', 
                         '[aria-invalid]', 
                         '[aria-label]', 
                         '[aria-labelledby]', 
                         '[aria-level]', 
                         '[aria-live]', 
                         '[aria-multiline]', 
                         '[aria-multiselectable]', 
                         '[aria-orientation]', 
                         '[aria-owns]', 
                         '[aria-pressed]', 
                         '[aria-readonly]', 
                         '[aria-relevant]',
                         '[aria-required]',
                         '[aria-selected]',
                         '[aria-sort]',
                         '[aria-valuemax]',
                         '[aria-valuemin]',
                         '[aria-valuenow]',
                         '[aria-valuetext]'],
  cache_dependency    : 'controls_cache',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     function makeProp(label, value) {
     
       var p = {};
       
       p.label = label;
       p.value = value;
       p.description = "";
       
       return p;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var elements_with_aria_attributes     = dom_cache.controls_cache.elements_with_aria_attributes;
     var elements_with_aria_attributes_len = elements_with_aria_attributes.length;
     
     if (elements_with_aria_attributes && elements_with_aria_attributes_len) {
     
       for (var i = 0; i < elements_with_aria_attributes_len; i++) {
         var de = elements_with_aria_attributes[i];
         var style = de.computed_style;
         var aria_attrs = de.aria_attributes;
         var aria_attrs_len = aria_attrs.length;         

         for (var j = 0; j < aria_attrs_len; j++) {
         
           var attr = aria_attrs[j];
           
           var prop = makeProp(attr.name, attr.value);
         
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             if (attr.is_value_valid && attr.tokens) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [attr.name, attr.value], [prop]);
             else if (attr.is_value_valid) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [attr.name, attr.value, attr.type], [prop]);
             else if (attr.type === 'nmtoken' || attr.type === 'boolean') rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [attr.name, attr.value, attr.tokens], [prop]);
             else if (attr.type === 'nmtokens') rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_2', [attr.name, attr.value, attr.tokens], [prop]);
             else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_3', [attr.name, attr.value, attr.type], [prop]);
           
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [attr.name, attr.value], [prop]);     
           }
           
         } // end loop 
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_5
 * 
 * @desc Elements with ARIA attributes have valid values
 */
	     
{ rule_id             : 'WIDGET_5', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-atomic]', 
                         '[aria-autocomplete]', 
                         '[aria-busy]', 
                         '[aria-checked]', 
                         '[aria-controls]', 
                         '[aria-describedby]', 
                         '[aria-disabled]', 
                         '[aria-dropeffect]', 
                         '[aria-expanded]', 
                         '[aria-flowto]', 
                         '[aria-grabbed]', 
                         '[aria-haspopup]', 
                         '[aria-hidden]', 
                         '[aria-invalid]', 
                         '[aria-label]', 
                         '[aria-labelledby]', 
                         '[aria-level]', 
                         '[aria-live]', 
                         '[aria-multiline]', 
                         '[aria-multiselectable]', 
                         '[aria-orientation]', 
                         '[aria-owns]', 
                         '[aria-pressed]', 
                         '[aria-readonly]', 
                         '[aria-relevant]',
                         '[aria-required]',
                         '[aria-selected]',
                         '[aria-sort]',
                         '[aria-valuemax]',
                         '[aria-valuemin]',
                         '[aria-valuenow]',
                         '[aria-valuetext]'],
  cache_dependency    : 'controls_cache',
  resource_properties : [],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     function makeProp(label, value) {
     
       var p = {};
       
       p.label = label;
       p.value = value;
       p.description = "";
       
       return p;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var elements_with_aria_attributes     = dom_cache.controls_cache.elements_with_aria_attributes;
     var elements_with_aria_attributes_len = elements_with_aria_attributes.length;
     
     if (elements_with_aria_attributes && elements_with_aria_attributes_len) {
     
       for (var i = 0; i < elements_with_aria_attributes_len; i++) {
         var de = elements_with_aria_attributes[i];
         var style = de.computed_style;
         var aria_attrs = de.aria_attributes;
         var aria_attrs_len = aria_attrs.length;         

         for (var j = 0; j < aria_attrs_len; j++) {
         
           var attr = aria_attrs[j];
           
           var prop = makeProp(attr.name, attr.value);
         
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             if (attr.is_valid_attribute) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [attr.name], [prop]);
             else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [attr.name], [prop]);
           
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [attr.name, attr.value], [prop]);     
           }
           
         } // end loop 
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_6
 * 
 * @desc Widgets must have required properties
 */
	     
{ rule_id             : 'WIDGET_6', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     function getRequiredPropertiesAndValues(dom_element, required_props) {
    
       var rps = [];
     
       var attrs     = dom_element.aria_attributes;
       var attrs_len = attrs.length;
     
       for (var i = 0; i < required_props.length; i++) {
       
         var prop = required_props[i];
       
         var flag = false;
       
         for (var j = 0; j <attrs_len; j++) {
           if (prop === attrs[j].name) { 
             flag = true;
             break;
           }
         }
         
         var rp = {};
         rp.label = prop;
         rp.description = "";
         rp.defined = flag;
         
         if (flag) {
           rp.value  = attrs[j].value;
         }
         else {
           rp.value  = "undefined";       
         }
         
         rps.push(rp);
       
       }
       
       return rps;
     
     }

     function getPropsString(props) {
     
       var str = "";
       prop_max = props.length - 1;
       
       for (var i = 0; i < props.length; i++ ) {
         str += props[i];
         if (i !== prop_max) str += ", ";
       }
       
       return str;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;
       
//         OpenAjax.a11y.logger.debug("  RULE WIDGET 6: " + de.role + " ("+ de.role_info + ")");
       
         var required_properties = de.role_info.reqProps;
             
         if (required_properties) {
             
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             var props_string   = getPropsString(required_properties);
             var required_props = getRequiredPropertiesAndValues(de, required_properties);
             
             var flag = true;
             
             for (var j = 0; (j < required_props.length) && flag; j++) flag = flag && required_props[j].defined;
             
             if (flag) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role, props_string], required_props);     
             else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.role, props_string], required_props);
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.role]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_7
 * 
 * @desc Widgets must have required owned elements
 */
	     
{ rule_id             : 'WIDGET_7', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
  
     function getRequiredChildRolesString(required_children) {
     
       var str = "";
       required_children_max = required_children.length - 1;
       
       for (var i = 0; i < required_children.length; i++ ) {
         str += required_children[i];
         if (i !== required_children_max) str += ", ";
       }
       
       return str;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;
       
         var required_child_roles = de.role_info.reqChildren;
             
         if (required_child_roles) {
             
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             var flag = false;
             
             for (var j = 0; (j < required_child_roles.length) && !flag; j++) {
               
               var role = required_child_roles[j];
               
               flag = we.hasChildRole(role);
                              
             }
             
             var required_child_roles_string = getRequiredChildRolesString(required_child_roles);
             
             if (flag) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role, required_child_roles_string]);     
             else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.role, required_child_roles_string]);
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.role]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_8
 * 
 * @desc Widgets must have required parent roles
 */
	     
{ rule_id             : 'WIDGET_8', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-04-12', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['role'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
  
     function getRequiredRolesString(required_roles) {
     
       var str = "";
       required_roles_max = required_roles.length - 1;
       
       for (var i = 0; i < required_roles.length; i++ ) {
         str += required_roles[i];
         if (i !== required_roles_max) str += ", ";
       }
       
       return str;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;
       
         var required_parent_roles = de.role_info.container;
             
         if (required_parent_roles) {
             
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             var flag = false;
             
             for (var j = 0; (j < required_parent_roles.length) && !flag; j++) {
               
               var role = required_parent_roles[j];
               
               flag = we.hasParentRole(role);
                              
             }
             
             var required_roles_string = getRequiredRolesString(required_parent_roles);
             
             if (flag) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role, role]);     
             else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [required_roles_string, de.role]);
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.role]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},
/**
 * @object WIDGET_9
 * 
 * @desc Widgets cannot be owned by more than one widget
 */
	     
{ rule_id             : 'WIDGET_9', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[aria-owns]', '[aria-owns]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['is_owned', 'owner_controls'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     function getParentWidgetString(list) {
     
       var str = "";
       list_max = list.length - 1;
       
       for (var i = 0; i < list.length; i++ ) {
         str += list[i].toString();
         if (i !== list_max) str += "; ";
       }
       
       return str;
     
     }
   
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;

         if (we.is_owned) {
             
           if (style.is_visible_to_at == VISIBILITY.VISIBLE || style.is_visible_onscreen == VISIBILITY.VISIBLE ) {
           
             var parent_string = getParentWidgetString(we.owner_controls);
             
             if (we.owner_controls.length === 1) rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_1', [we.toString(), parent_string]);     
             else if (we.owner_controls.length > 1) rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_1', [parent_string, we.toString()]);
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'HIDDEN', [we.toString()]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_10
 * 
 * @desc Range widgets with ariavaluenow mut be in range of aria-valuemin and aria-valuemax
 */
	     
{ rule_id             : 'WIDGET_10', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[role="slider"]','[role="progress"]','[role="scrollbar"]','[role="spinbutton"]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['aria-valuemin', 'aria-valuenow', 'aria-valuemax'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {

     function getNotNumbersString() {
     
       var str = "";
       
       if (isNaN(min)) str += 'aria-valuemin';
       
       if (isNaN(max)) {
         if (str.length > 0) str += ", ";
         str += 'aria-valuemax';
       }  
       
       if (isNaN(value)) {
         if (str.length > 0) str += ", ";
         str += 'aria-valuenow';
       }  

       return str;
     }

     function getNumberCount() {
     
       var count = 0;
       
       if (!isNaN(min)) count++;
       if (!isNaN(max)) count++;
       if (!isNaN(value)) count++;

       return count;
     }

     function hasMaxMin() {
     
       var count = 0;
       
       if (!isNaN(min)) count++;
       if (!isNaN(max)) count++;
 
       return count === 2;
     }

     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var widget_elements     = dom_cache.controls_cache.widget_elements;
     var widget_elements_len = widget_elements.length;
     
     if (widget_elements && widget_elements) {
     
       for (var i = 0; i < widget_elements_len; i++) {
         var we = widget_elements[i];
         var de = we.dom_element;
         var style = de.computed_style;

         if (de.has_range) {
             
           if (style.is_visible_to_at === VISIBILITY.VISIBLE) {
           
             var valuetext = de.node.getAttribute('aria-valuetext');
             var min       = parseInt(de.node.getAttribute('aria-valuemin'), 10);
             var max       = parseInt(de.node.getAttribute('aria-valuemax'), 10);
             var value     = parseInt(de.node.getAttribute('aria-valuenow'), 10);
             var number_count = getNumberCount();
             var has_max_min  = hasMaxMin();

             if (typeof valuetext === 'string' && (valuetext.length > 0)) { 
               rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_1', [we, valuetext]);     
             }  
             else {
               if (number_count === 3 || (de.role === 'progressbar' && has_max_min)) {
                 if (min < max) {
                   if ((min <= value) && (value <= max)) rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_2', [we, value, min, max]);     
                   else if (de.role === 'progressbar' && has_max_min)  rule_result.addResult(TEST_RESULT.PASS, we, 'PASS_3', [min, max]);
                   else rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_1', [value, min, max]);
                 }
                 else {
                   rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_2', [min, max]);
                 }
               }
               else {
               
                  if (de.role === 'progressbar' && !has_max_min) {
                    rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_3', [value, min, max]);
                  }
                  else { 
                    var not_numbers_string = getNotNumbersString();

                   if (number_count === 1) rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_4', [not_numbers_string]);
                   else rule_result.addResult(TEST_RESULT.FAIL, we, 'CORRECTIVE_ACTION_5', [not_numbers_string]);
                 }  
               }
             }    
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, we, 'HIDDEN', [we.toString()]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_11
 * 
 * @desc Elements with mouse down, mouse move and mouse up events must have roles
 */
	     
{ rule_id             : 'WIDGET_11', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[onmousedown]', '[onmouseup]', '[onmousemove]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['has_mouse_down', 'has_mouse_move', 'has_mouse_up', 'ancestor_has_mouse_down', 'ancestor_has_mouse_move', 'ancestor_has_mouse_up'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     function getEvents() {
     
       var str = "";
       
       if (events.has_mouse_down) str += "onmousedown";

       if (events.has_mouse_move) { 
         if (str.length) str += ", ";
         str += "onmousemove";
       }  

       if (events.has_mouse_up) { 
         if (str.length) str += ", ";
         str += "onmouseup";
       }  

       return str;
     }


     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var dom_elements_with_mouse_events     = dom_cache.controls_cache.elements_with_mouse_events;
     var dom_elements_with_mouse_events_len = dom_elements_with_mouse_events.length;
     
     if (dom_elements_with_mouse_events_len) {
     
       for (var i = 0; i < dom_elements_with_mouse_events_len; i++) {
         var de = dom_elements_with_mouse_events[i];
         var style = de.computed_style;
         var events = de.events;

         if (de.hasMouseEvents(false)) {
             
           if (style.is_visible_to_at === VISIBILITY.VISIBLE) {
           
             var events_str = getEvents();
           
             if (de.is_widget) { 
               rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role, events_str]);     
             }  
             else {
               if (de.is_interactive) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [de.tag_name, events_str]);
               if (de.containsInteractiveElements()) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [de.tag_name, events_str]);
               else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.tag_name, events_str]);
             }  
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.tag_name]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
},

/**
 * @object WIDGET_12
 * 
 * @desc Elements with mouse over, mouse out. mouse enter or mouse leave
 */
	     
{ rule_id             : 'WIDGET_12', 
  rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
  rule_category       : OpenAjax.a11y.RULE_CATEGORIES.WIDGETS,
  last_updated        : '2012-12-04', 
  wcag_primary_id     : '4.1.2',
  wcag_related_ids    : ['1.3.1', '3.3.2'],
  target_resources    : ['[onmouseover]', '[onmouseout]', '[onmouseenter]', '[onmouseleave]'],
  cache_dependency    : 'controls_cache',
  resource_properties : ['has_mouse_over', 'has_mouse_out', 'has_mouse_enter', 'has_mouse_leave', 'ancestor_has_mouse_over', 'ancestor_has_mouse_out', 'ancestor_has_mouse_enter', 'ancestor_has_mouse_leave'],
  language_dependency : "",
  validate            : function (dom_cache, rule_result) {
  
     function getEvents() {
     
       var str = "";
       
       if (events.has_mouse_over) str += "onmouseover";

       if (events.has_mouse_out) { 
         if (str.length) str += ", ";
         str += "onmouseout";
       }  

       if (events.has_mouse_enter) { 
         if (str.length) str += ", ";
         str += "onmouseenter";
       }  

       if (events.has_mouse_leave) { 
         if (str.length) str += ", ";
         str += "onmouseleave";
       }  

       return str;
     }


     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
      
     var dom_elements_with_mouse_events     = dom_cache.controls_cache.elements_with_mouse_events;
     var dom_elements_with_mouse_events_len = dom_elements_with_mouse_events.length;
     
     if (dom_elements_with_mouse_events_len) {
     
       for (var i = 0; i < dom_elements_with_mouse_events_len; i++) {
         var de = dom_elements_with_mouse_events[i];
         var style = de.computed_style;
         var events = de.events;

         if (de.hasMouseEvents(true, false)) {
             
           if (style.is_visible_to_at === VISIBILITY.VISIBLE) {
           
             var events_str = getEvents();
           
             if (de.is_widget) { 
               rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_1', [de.role, events_str]);     
             }  
             else {
               if (de.is_interactive) rule_result.addResult(TEST_RESULT.PASS, de, 'PASS_2', [de.tag_name, events_str]);
               if (de.containsInteractiveElements()) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, de, 'MANUAL_CHECK_1', [de.tag_name, events_str]);
               else rule_result.addResult(TEST_RESULT.FAIL, de, 'CORRECTIVE_ACTION_1', [de.tag_name, events_str]);
             }  
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, de, 'HIDDEN', [de.tag_name]);     
           }
         }
       } // end loop
     } 
   } // end validation function   
}

]); 


    

