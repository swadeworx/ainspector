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
 * @desc If a table is a data table, the rule tests if each table cell in the first column is 
 *       either a TH element or TD element with scope value of 'col' and/or each row contains at 
 *       at least one TH element or a TD with scope value of 'row'
 */
 { rule_id             : 'TABLE_1', 
   rule_scope          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
   rule_category       : OpenAjax.a11y.RULE_CATEGORIES.CONTROLS,
   last_updated        : '2011-09-23', 
   wcag_primary_id     : '3.3.2',
   wcag_related_ids    : ['1.3.1', '2.4.6'],
   target_resources    : ['input[type="checkbox"]', 'input[type="radio"]', 'input[type="text"]', 'input[type="password"]', 'input[type="file"]', 'select', 'textarea'],
   cache_dependency    : 'tables_cache',
   resource_properties : ['is_data_table', 'first_row_th_count', 'first_row_cell_count'],
   language_dependency : "",
   validate          : function (dom_cache, rule_result) {
   
     var TEST_RESULT = OpenAjax.a11y.TEST_RESULT;
   
     var i;
     var te;
     var info_row;
     var info_column;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table) {
     
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
      
             info_row = te.headerCellsInFirstRow(); 
             
             te.first_row_th_count   = info_row.th_count;
             te.first_row_cell_count = info_row.total;

             info_column = te.headerCellsInFirstColumn(); 

             te.first_column_th_count   = info_column.th_count;
             te.first_column_cell_count = info_column.total;

             if (info_row.th_count == info_row.total && info_column.th_count == info_column.total) {
               rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_1', [info_row.total, info_column.total]);     
             }
             else {
               if (info_row.th_count == info_row.total) {
                 rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_2', [info_row.total]);     
               }
               else {               
                 if (info_column.th_count == info_column.total) {
                   rule_result.addResult(TEST_RESULT.PASS, te, 'PASS_3', [info_column.total]);     
                 }
                 else {
                   rule_result.addResult(TEST_RESULT.FAIL, te, 'CORRECTIVE_ACTION_1', [info_row.th_count, info_row.total, info_column.th_count, info_column.total]);
                 }  
               }  
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'HIDDEN', []);     
           }
         }   
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_OTHER', []);
         }
       } // end loop
     }   
   } // end validation function
 }
 
/** 
 * @object TABLE_2T 
 *
 * @desc Tests if a table has either an effective caption or an effective summary with content.
 *
 { id                : 'TABLE_2T', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption', 'effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY           = OpenAjax.a11y.SEVERITY;
     var i;   
     var te;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if ((te.effective_caption && te.effective_caption.length > 0) ||
                 (te.effective_summary && te.effective_summary.length > 0)) {
               if (te.effective_caption && te.effective_caption.length > 0) {    
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);     
               }
               else {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_summary]);                    
               }
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
       } // end loop
     } 
   } // end validation function
 },
 
/** 
 * @object TABLE_2S 
 *
 * @desc  If there is only one data table on a page, the rule tests the table for an effective caption.
 *
 { id                : 'TABLE_2S', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption'],
   language          : "",
   enabled           : true,
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY           = OpenAjax.a11y.SEVERITY;
     
     var i;   
     var te;

     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.effective_caption && te.effective_caption.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);     
             }
             else {
               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_FAIL', []);
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
           } 
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);     
         }
       } // end loop
     } 
   } // end validation function
 },
  
/**
 * @object TABLE_2M
 *
 * @desc   If there is more than one data table on a page, the rule tests the table for an effective caption.
 *
 { id                : 'TABLE_2M', 
   last_updated      : '2011-12-14', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['is_data_table', 'effective_caption'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i;   
     var te;
     var tc;

     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var data_table_count = 0;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
         if (te.is_complex_data_table && te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) data_table_count++;
       } // loop
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
       
             if (data_table_count <= 1 ) {
               rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_ONLY_ONE', []);         
             }
             else {
               if (te.effective_caption && te.effective_caption.length > 0) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.effective_caption]);
               } 
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_FAIL', []);
               }
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

/**
 * @object TABLE_3
 *
 * @desc  Tests when a table has both and effective caption and effective summary that the two are unique 
 *
 
 { id                : 'TABLE_3', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['effective_caption', 'effective_summary'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

	 var i;   
     var te;
     var tc;
     var ec;
     var es;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
      
         if (te.is_data_table) {
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
           
             if ((te.effective_summary && te.effective_summary.length > 0) && 
                 (te.effective_caption && te.effective_caption.length > 0)) {
              
               if (te.effective_summary_for_comparison != te.effective_caption_for_comparison) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_UNIQUE', [te.effective_caption, te.effective_summary]);     
               }
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_NOT_UNIQUE', [te.effective_caption, te.effective_summary]);     
               }
             }
             else {
               rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
           }
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);     
         }         
       } // end loop
     }
   } // end validation function
 },

/** 
 * @object TABLE_4
 *
 * @desc    Tests if table headers use TH elements instead of TD with SCOPE
 *
 
 { id                : 'TABLE_4', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['scope'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkDataTableForUseOfTHElement(table_elements) {
       var j;
       var tce;
       var max = table_elements.length;
       
       for (j = 0; j < max; j++) {
         tce = table_elements[j];
         
         // do not recurse nested tables
         if (tce.table_type === TABLE.TABLE_ELEMENT) return;
         
         if (tce.table_type === TABLE.TH_ELEMENT) {
           
           if (tce.dom_element.tag_name == 'th') {
             rule_result.addResult(SEVERITY.PASS, tce, 'MESSAGE_IS_TH', []);                            
           }
           else {
             rule_result.addResult(SEVERITY.FAIL, tce, 'MESSAGE_VIOLATION', []);              
           }
         } 
         
         if (tce.child_cache_elements && tce.child_cache_elements.length) checkDataTableForUseOfTHElement(tce.child_cache_elements);          
         
       } // end loop    
         
     } // end function
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
     
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var i;   
     var te;
     var tc;
     var info;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {

       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
      
         if (te.is_data_table) {
           if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
             checkDataTableForUseOfTHElement(te.child_cache_elements);            
           }
           else {
             rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);     
           }
         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_DATA_TABLE', []);     
         }
         
       } // end loop
     } 
  } // end validation function
},

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


/**
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

/**
 * @object TABLE_7
 *
 * @desc  If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
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
 
/**
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
 
/**
 * @object LAYOUT_1
 *
 * @desc     Do not use nested tables more than 1 column wide  
 *           for positioning content outside of landmarks.
 *           Fails with one or more one levels of nesting.
 *
 { id                : 'LAYOUT_1',
   last_updated      : '2011-09-17',
   cache_dependency  : 'tables_cache',
   resource_properties : ['is_data_table', 'max_row', 'max_column', 'nesting_level'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
     
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
     
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
    
     var i;
     var te;
     var nesting_level;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {

             nesting_level = getNestingLevel(te, 0);

             te.nesting_level = nesting_level;

             if (te.max_column === 1)  {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_ONE_COLUMN', []);          
             }  
             else {
         
               if (nesting_level === 0) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS_NOT_NESTED', []);               
               } 
               else {
                 rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', [te.max_column, nesting_level]);
               }  
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
         } 
       } // end loop
     }  
     
   }  // end validation function
 },
 
/**
 * @object LAYOUT_2
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning within a landmark. 
 *           Fails with one or more one levels of nesting.
 *
 { id                : 'LAYOUT_2', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['is_data_table', 'max_row', 'max_column', 'nesting_level'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
    
     var i;
     var te;
     var nesting_level;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     

     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {
                      
             if (te.max_column > 1)  {

               rule_result.addResult(SEVERITY.FAIL, te, 'MESSAGE_VIOLATION', [te.max_row, te.max_column]);
               
             }  
             else {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);          
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
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
 *
 { id                : 'LAYOUT_3', 
   last_updated      : '2011-09-17', 
   cache_dependency  : 'tables_cache',
   resource_properties : ['role'],
   language          : "",
   validate          : function (dom_cache, rule_result) {
   
     function checkLayoutTableForRolePresentation(element) {
     
       var j;
       
       var de = element.dom_element;
       
       if (de.role && de.role == 'presentation') {
         rule_result.addResult(SEVERITY.PASS, element, 'MESSAGE_PASS', [de.tag_name]);       
       }
       else {
         rule_result.addResult(SEVERITY.FAIL, element, 'MESSAGE_VIOLATION', [de.tag_name]);
       }

       var cce     = element.child_cache_elements;
       
       if (!cce) return;
       
       var cce_len = cce.length;     
       
       if (!cce_len) return;
       
       for (j = 0; j < cce_len; j++) {
         // do not recursively go into other tables
         if (cce[j].table_type !== TABLE.TABLE_ELEMENT) checkLayoutTableForRolePresentation(cce[j]);
       }
     
     }
   
     var SEVERITY   = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     var TABLE      = OpenAjax.a11y.TABLE;
    
     var i;
     var te;
    
     var table_elements     = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
       
         te = table_elements[i];
         
         if (te.dom_element.computed_style.is_visible_to_at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table) {
             checkLayoutTableForRolePresentation(te);
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_NOT_LAYOUT_TABLE', []);                     
           }
         }
         else {
           rule_result.addResult(SEVERITY.HIDDEN, te, 'MESSAGE_HIDDEN', []);
         } 
       } // end loop
     }  
   } // end validation function
 }  
]); 


    

