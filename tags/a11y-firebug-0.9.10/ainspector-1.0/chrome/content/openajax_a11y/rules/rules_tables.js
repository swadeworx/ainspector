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
 * @object TABLE_1
 * 
 * @desc If a table is a data table, if each data cell has headers
 */
 { rule_id             : 'TABLE_1', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.1',
   wcag_related_ids    : ['2.4.6'],
   target_resources    : ['td'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['headers', 'header_content', 'header_source'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     function allReadyDone(span_cell) {
     
       var span_cells_len = span_cells.length;
     
       for (var i = 0; i < span_cells_len; i++) {
         if (span_cell === span_cells[i]) return true;
       }
       
       span_cells.push(span_cell);
       return false;
     }
   
     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var HEADER_SOURCE = OpenAjax.a11y.HEADER_SOURCE;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;
   
     var span_cells = [];
   
     var info_row;
     var info_column;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
//     OpenAjax.a11y.logger.debug("=== Table Rule 1 ===");

//     OpenAjax.a11y.logger.debug(" Table Elements on page: " + table_elements_len);
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (var i=0; i < table_elements_len; i++) {
         var te = table_elements[i];
         var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;

//         OpenAjax.a11y.logger.debug(" Table Element: " + te + "   is data table: " + te.is_data_table);

         if (te.is_data_table) {
     
           var max_row    = te.max_row;
           var max_column = te.max_column;
           var cells      = te.cells;

           for (var r = 0; r < max_row; r++) {
             for (var c = 0; c < max_column; c++) {
           
               var cell = cells[r][c];
             
               if (cell && cell.table_type  === OpenAjax.a11y.TABLE.TD_ELEMENT) {
                 
                 if (is_visible_to_at == VISIBILITY.VISIBLE) {
           
                   if(cell.has_spans && allReadyDone(cell)) continue;
                 
                   if(te.is_complex_data_table) {
                     if (cell.header_source === HEADER_SOURCE.HEADERS_ATTRIBUTE) rule_result.addResult(TEST_RESULT.PASS, cell, 'PASS_1', [cell.headers]);
                     else if (cell.text_content_for_comparison.length === 0) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cell, 'MANUAL_CHECK_1', []);
                       else rule_result.addResult(TEST_RESULT.FAIL, cell, 'CORRECTIVE_ACTION_1', []);
                   }
                   else {
                     if (cell.header_source === HEADER_SOURCE.HEADERS_ATTRIBUTE) rule_result.addResult(TEST_RESULT.PASS, cell, 'PASS_1', [cell.headers]);
                     else if (cell.header_source === HEADER_SOURCE.ROW_OR_COLUMN_HEADERS) rule_result.addResult(TEST_RESULT.PASS, cell, 'PASS_2', []);
                       else if (cell.text_content_for_comparison.length === 0) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, cell, 'MANUAL_CHECK_1', []);
                         else rule_result.addResult(TEST_RESULT.FAIL, cell, 'CORRECTIVE_ACTION_2', []);
                   }
                 }
                 else {
                  rule_result.addResult(TEST_RESULT.HIDDEN, cell, 'HIDDEN', []);     
                 }
               }
             }             
           }
         }   
       } // end loop
     }   
   } // end validation function
 },
 
/** 
 * @object TABLE_2T 
 *
 * @desc Tests if a table has either an effective caption or an effective summary with content.
 */
 { rule_id             : 'TABLE_2T', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.2',
   wcag_related_ids    : ['4.1.2'],
   target_resources    : ['caption', 'table[sumary]'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language_dependency : "",
   validate            : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (var i = 0; i < table_elements_len; i++) {
         var te = table_elements[i];
         var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;       
       
         if (te.is_data_table) {
       
           if (is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if ((te.effective_caption && te.effective_caption.length > 0) ||
                 (te.effective_summary && te.effective_summary.length > 0)) {
               if (te.effective_caption && te.effective_caption.length > 0) {    
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', [te.effective_caption]);     
               }
               else {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_2', [te.effective_summary]);                    
               }
             }
             else {
               rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', []);
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
 * @object TABLE_2S 
 *
 * @desc  If there is only one data table on a page, the rule tests the table for an effective caption.
 */
 { rule_id             : 'TABLE_2S', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.1',
   wcag_related_ids    : ['2.4.6'],
   target_resources    : ['caption', 'table[sumary]'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language_dependency : "",
   enabled           : true,
   validate          : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     var data_table_count = 0;

     // count the number of data tables
     for (var i = 0; i < table_elements_len; i++) {
       var te = table_elements[i];
       var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;       
       
       if (te.is_data_table && is_visible_to_at === VISIBILITY.VISIBLE) data_table_count++;
     }

     if (data_table_count !== 1) return;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i = 0; i < table_elements_len; i++) {
         te = table_elements[i];
         is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;       
       
         if (te.is_data_table) {
       
           if (is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if ((te.effective_caption && te.effective_caption.length > 0) ||
                 (te.effective_summary && te.effective_summary.length > 0)) {
                 
               if (te.effective_caption && te.effective_caption.length > 0) {    
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', [te.effective_caption]);     
               }
               else {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_2', [te.effective_summary]);                    
               }
             }  
             else {
               rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', []);
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
 * @object TABLE_2M 
 *
 * @desc  If there is more than one data table on a page, the rule tests the table for an effective caption.
 */
 { rule_id             : 'TABLE_2M', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.1',
   wcag_related_ids    : ['2.4.6'],
   target_resources    : ['caption', 'table[sumary]'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     var data_table_count = 0;

     // count the number of data tables
     for (var i = 0; i < table_elements_len; i++) {
       var te = table_elements[i];
       var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;       
       if (te.is_data_table && is_visible_to_at === VISIBILITY.VISIBLE) data_table_count++;
     }

     if (data_table_count <= 1) return;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i = 0; i < table_elements_len; i++) {
         te = table_elements[i];
         is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;       
       
         if (te.is_data_table) {
       
           if (is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if ((te.effective_caption && te.effective_caption.length > 0) ||
                 (te.effective_summary && te.effective_summary.length > 0)) {
                 
               if (te.effective_caption && te.effective_caption.length > 0) {    
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', [te.effective_caption]);     
               }
               else {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_2', [te.effective_summary]);                    
               }
             }  
             else {
               rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', []);
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
 * @object TABLE_3
 *
 * @desc  Tests when a table has both and effective caption and effective summary that the two are unique 
 */
 
 { rule_id             : 'TABLE_3', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.1',
   wcag_related_ids    : ['2.4.6'],
   target_resources    : ['caption', 'table[sumary]'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY  = OpenAjax.a11y.VISIBILITY;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (var i = 0; i < table_elements_len; i++) {
         var te = table_elements[i];
         var es = te.effective_summary_for_comparison;
         var ec = te.effective_caption_for_comparison;
         var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;
      
         if (te.is_data_table) {
         
           if (is_visible_to_at == VISIBILITY.VISIBLE) {
           
             OpenAjax.a11y.logger.debug(" Effective Summary: " + es + "  Effective Caption: " + ec);
           
           
             if ((es && es.length > 0) && 
                 (ec && ec.length > 0)) {
              
               if (es !== ec) {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', []);     
               }
               else {
                 rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', []);     
               }
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
 * @object TABLE_4
 *
 * @desc    Tests if table headers use TH elements instead of TD with SCOPE
 */
 
 { rule_id             : 'TABLE_4', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.TABLES,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '1.3.1',
   wcag_related_ids    : ['2.4.6'],
   target_resources    : ['caption', 'table[sumary]'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['tag_name', 'scope'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {

     function allReadyDone(span_cell) {
     
       var span_cells_len = span_cells.length;
     
       for (var i = 0; i < span_cells_len; i++) {
         if (span_cell === span_cells[i]) return true;
       }
       
       span_cells.push(span_cell);
       return false;
     }
   
     var TEST_RESULT   = OpenAjax.a11y.TEST_RESULT;
     var VISIBILITY    = OpenAjax.a11y.VISIBILITY;
   
     var span_cells = [];
   
     var info_row;
     var info_column;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (var i=0; i < table_elements_len; i++) {
         var te = table_elements[i];
         var is_visible_to_at = te.dom_element.computed_style.is_visible_to_at;

         if (te.is_data_table) {
     
           var max_row    = te.max_row;
           var max_column = te.max_column;
           var cells      = te.cells;

           for (var r = 0; r < max_row; r++) {
             for (var c = 0; c < max_column; c++) {
           
               var cell = cells[r][c];
             
               if (cell && cell.table_type  === OpenAjax.a11y.TABLE.TH_ELEMENT) {
                 
                 if (is_visible_to_at == VISIBILITY.VISIBLE) {
           
                   if(cell.has_spans && allReadyDone(cell)) continue;
                 
                   if(cell.dom_element.tag_name === 'th') rule_result.addResult(TEST_RESULT.PASS, cell, 'PASS_1', []);
                   else rule_result.addResult(TEST_RESULT.FAIL, cell, 'CORRECTIVE_ACTION_1', []);
                   
                 }
                 else {
                  rule_result.addResult(TEST_RESULT.HIDDEN, cell, 'HIDDEN', []);     
                 }
               }
             }             
           }
         }   
       } // end loop
     }   
   } // end validation function  
}

/**
 * @object TABLE_5
 *
 * @desc   The rule tests the table for an effective summary.
 *
 { id                : 'TABLE_5', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
   
     var data_table_count = 0;
       
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (te.effective_summary && te.effective_summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);
             } 
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', []);
             }  
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);
         } 
       }
     }    
  } // end validation function
},


 **
 * @object TABLE_6
 *
 * @desc    Each TH element with content in a complex table 
 *          must have an id attribute, whose id value must be unique 
 *          on the page
 *
 { id                : 'TABLE_6', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['id'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkComplexDataTableHeadingsForUniqueIds(table_element) {

       function testHeaderCellForUniqueId(table_elements) {
         var j;
         var tce;
         var max = table_elements.length;
       
         for (j = 0; j < max; j++) {
           tce = table_elements[j];

           // do not traverse nested tables
           if (tce.table_type === TABLE.TABLE_ELEMENT) checkComplexDataTableHeadingsForUniqueIds(tce);  

           switch (tce.table_type) {
         
           case TABLE.TH_ELEMENT:
         
             total++;
         
             if (!tce.text_content) tce.text_content = tce.dom_element.getText().normalizeSpace();               
           
               if (tce.text_content.length !== 0) {                 
                 
                 if (tce.dom_element.id_unique === ID.NOT_UNIQUE) {
                   rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_NOT_UNIQUE_VIOLATION', [tce.dom_element.id]);              
                   count++;
                 }
                 else {
                   if (tce.dom_element.id_unique === ID.NOT_DEFINED) {
                     rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_NO_ID_VIOLATION', []);              
                     count++;
                   }
                   else {
                     rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_PASS', []);    
                   }                     
                 }
               }
               else {
                 rule_result.addResult(SEVERITY.MANUAL_CHECK, tce, 'MESSAGE_NO_CONTENT', []);    
               }
             break;

           case TABLE.TD_ELEMENT:
             rule_result.addResult(SEVERITY.NA, tce, 'MESSAGE_DATA_CELL', []);                                        
             break;
           
           default:
             break;

           } // end switch  
         
           if (tce.child_cache_elements && tce.child_cache_elements.length) testHeaderCellForUniqueId(tce.child_cache_elements);         
       
         } // end loop
     
       } // end function


       var count = 0;
       var total = 0;

       if (table_element.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (table_element.is_complex_data_table) { 

           testHeaderCellForUniqueId(table_element.child_cache_elements);

           if (count === 0) {      
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PASS', [total]);                
           }
           else {
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PROBLEM_IDS', [count, total]);                
           }
         }
         else {
           if (table_element.is_data_table) {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_SIMPLE_DATA_TABLE', []);                    
           }
           else {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_LAYOUT_TABLE', []);                    
           }  
         }
       }
       else {
         rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_HIDDEN', []);          
       }
     }

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     var ID         = OpenAjax.a11y.ID;
     
     var i;   
           
     var child_cache_elements     = dom_cache.tables_cache.child_cache_elements;
     var child_cache_elements_len = child_cache_elements.length;


     
     for (i = 0; i < child_cache_elements_len; i++) {
       checkComplexDataTableHeadingsForUniqueIds(child_cache_elements[i]);     
     } // end loop
     
   } // end validation function
 },

 **
 * @object TABLE_7
 *
 * @desc  If a table is a complex data table, all the TD elements with content must have a headers attribute that point to TH elements in the same table
 *
 { id                : 'TABLE_7', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['headers'],
   language          : "",
   validate          : function (dom_cache, rule_result) {

     function checkComplexDataTableForDataCellHeaders(table_element) {

       function testForDataCellHeaders(table_elements) {
         var j;
         var tce;
         var max = table_elements.length;
       
         for (j = 0; j < max; j++) {
           tce = table_elements[j];

           // do not traverse nested tables
           if (tce.table_type === TABLE.TABLE_ELEMENT) checkComplexDataTableForDataCellHeaders(tce);  

           switch (tce.table_type) {
         
           case TABLE.TD_ELEMENT:
         
             if (!tce.text_content) tce.text_content = tce.dom_element.getText().normalizeSpace();               
           
             if (tce.headers && tce.headers_array && tce.headers_array.length > 0) {
               rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_HAS_HEADERS', []);                                                    
               total++;       
             }
             else {
               if (tce.text_content.length) {
                 rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_MISSING_VIOLATION', []);              
               
                 total++;     
                 count++;
               }
               else {
                 rule_result.addResult(SEVERITY.MANUAL_CHECK, tce, 'MESSAGE_DATA_CELL_IS_EMPTY', []);                                         
               }
             }
             break;

           case TABLE.TH_ELEMENT:
             rule_result.addResult(SEVERITY.NA, tce, 'MESSAGE_HEADER_CELL', []);                                        
             break;
           
           default:
             break;

           } // end switch  
         
           if (tce.child_cache_elements && tce.child_cache_elements.length) testForDataCellHeaders(tce.child_cache_elements);         
       
         } // end loop
     
       } // end function


       var count = 0;
       var total = 0;

       if (table_element.dom_element.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) {

         if (table_element.is_complex_data_table) { 

           testForDataCellHeaders(table_element.child_cache_elements);

           if (count === 0) {      
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_PASS', [total]);                
           }
           else {
             rule_result.addResult(SEVERITY.INFORMATIONAL, table_element, 'MESSAGE_TABLE_MISSING_HEADERS', [count, total]);                
           }
         }
         else {
           if (table_element.is_data_table) {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_SIMPLE_DATA_TABLE', []);                    
           }
           else {
             rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_LAYOUT_TABLE', []);                    
           }  
         }
       }
       else {
         rule_result.addResult(SEVERITY.NA, table_element, 'MESSAGE_TABLE_HIDDEN', []);          
       }
       
     } // end function

     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     
     var i;   
           
     var child_cache_elements     = dom_cache.tables_cache.child_cache_elements;
     var child_cache_elements_len = child_cache_elements.length;
       
     for (i = 0; i < child_cache_elements_len; i++) {
       checkComplexDataTableForDataCellHeaders(child_cache_elements[i]);     
     } // end loop
     
   } // end validation function
 },
 
 **
 * @object TABLE_8
 *
 * @desc     If a table is a complex data table, the rule tests if the table has an effective summary
 *
 { id                : 'TABLE_8', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
   

     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_complex_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (te.effective_summary && te.effective_summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);
             } 
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', []);
             }  
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_COMPLEX_DATA_TABLE', []);
         } 
       }
     }    
  } // end validation function
 },
 */
 ]); 


    

