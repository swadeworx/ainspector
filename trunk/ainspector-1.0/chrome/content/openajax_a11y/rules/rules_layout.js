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
/*      OpenAjax Alliance Table Rules                               */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.all_rules.addRulesFromJSON([
      
/** 

   **
 * @object LAYOUT_1
 *
 * @desc     Make sure content is in a meaningful sequence
 *           tables used for layout must be checked for 
 *           maintaining meanful sequence
 */
 { rule_id             : 'LAYOUT_1', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.PAGE,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LAYOUT,
   last_updated        : '2011-12-28', 
   wcag_primary_id     : '1.3.2',
   wcag_related_ids    : ['1.3.1'],
   target_resources    : ['table'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'max_column', 'max_row', 'nesting_level'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
     
     function getNestingLevel(table_element, level) {
     
       var l = level;
       var pte = table_element.parent_table_element;
     
       if (pte) {
         if (pte.is_data_table || pte.max_column == 1) {
           l = getNestingLevel(pte, level);           
         }
         else {
           l = getNestingLevel(pte, (level+1));
         }
       }
       return l;
     }
     
     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var page_element = dom_cache.headings_landmarks_cache.page_element;
     rule_result.addResult(TEST_RESULT.MANUAL_CHECK, page_element, 'MANUAL_CHECK_1', []); 

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (var i = 0; i < table_elements_len; i++) {
       
         var te = table_elements[i];
         var de = te.dom_element;
         var cs = de.computed_style;
         
         if (!te.is_data_table) {

           if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
         
             nesting_level = getNestingLevel(te, 0);
             
             te.nesting_level = nesting_level;

             if (te.max_column === 1)  {
               rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', []);          
             }  
             else {
         
               if (nesting_level === 0) {
                 rule_result.addResult(TEST_RESULT.MANUAL_CHECK, te, 'MANUAL_CHECK_2', [te.max_row, te.max_column]);               
               } 
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, te, 'MANUAL_CHECK_3', [te.nesting_level]);
               }  
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, te, 'HIDDEN', []);
           }
         } 
       } // end loop
     }  
     
   }  // end validation function
 },
 
/**
 * @object LAYOUT_2
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning content 
 *           Fails with one or more one levels of nesting.
 */
 { rule_id             : 'LAYOUT_2', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LAYOUT,
   last_updated        : '2011-12-28', 
   wcag_primary_id     : '1.3.2',
   wcag_related_ids    : [],
   target_resources    : ['table'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'max_column', 'max_row', 'nesting_level'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;
    
     var i;
     var te;
     var nesting_level;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (!te.is_data_table) {
                      
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
             if (te.max_column > 1) {
             
               if (te.nesting_level > 0) rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', [te.max_row, te.max_column, te.nesting_level]);
               else rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', []);                       
             }  
             else {
               rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_2', []);          
             }
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, te, 'HIDDEN', []);
           } 
         }  
       } // end loop
     }  
  } // end validation function        
},
 
 /**
 * @object LAYOUT_3
 *
 * @desc  If table is used for layout, the rule tests if the table element and any of its child table 
 *        related elements (i.e. tbody, tr, td) have a role attribute with the value 'presentation' (role="presentation")
 */
 { rule_id             : 'LAYOUT_3', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.LAYOUT,
   last_updated        : '2011-12-28', 
   wcag_primary_id     : '1.3.2',
   wcag_related_ids    : ['1.3.1', '4.1.2'],
   target_resources    : ['table'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['role'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkLayoutTableForRolePresentation(element) {
     
       var de = element.dom_element;
       
       if (de.role && de.role == 'presentation') {
         rule_result.addResult(TEST_RESULT.PASS, element, 'PASS_1', [de.tag_name]);       
       }
       else {
         rule_result.addResult(TEST_RESULT.FAIL, element, 'CORRECTIVE_ACTION_1', [de.tag_name]);
       }

       var cce     = element.child_cache_elements;
       
       if (!cce) return;
       
       var cce_len = cce.length;     
       
       if (!cce_len) return;
       
       for (var j = 0; j < cce_len; j++) {
         // do not recursively go into other tables
         if (cce[j].table_type !== TABLE.TABLE_ELEMENT) checkLayoutTableForRolePresentation(cce[j]);
       }
     
     }
   
     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;    
     var TABLE      = OpenAjax.a11y.TABLE;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (var i = 0; i < table_elements_len; i++) {
       
         var te = table_elements[i];
         var de = te.dom_element;         
         
         if (!te.is_data_table) {
           if (te.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {
             checkLayoutTableForRolePresentation(te);
           }
           else {
             rule_result.addResult(TEST_RESULT.HIDDEN, te, 'HIDDEN', [de.tag_name]);
           }
         }  
       } // end loop
     }  
   } // end validation function
 }  
]); 