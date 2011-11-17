/* ---------------------------------------------------------------- */
/*      OpenAjax Alliance Table Rules                               */
/* ---------------------------------------------------------------- */

OpenAjax.a11y.addRules([
      
/** 
 * @rule TABLE_1
 * 
 * @desc If a table is a data table, 
 *       each table cell in the first column must be either a TH element or TD element with scope value of 'col'
 *       and/or each row must contain at least one TH element or a TD with scope value of 'row'
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id       : 'TABLE_1', 
   lastUpdated   : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_header','is_th','scope','header_content'],
   language    : "",
   enabled     : true,
   validateParams : {}, 
   validate    : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
   
     var i;
     var te;
     var info;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table) {
     
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
      
             info = te.headerCellsInFirstRow(); 

             if (info.count && info.total && info.count == info.total) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.count]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NOT_ALL_HEADERS', [info.count, info.total]);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }   
       } // end loop
     }   
   } // end valifdation function
 },
 
/** 
 * @rule TABLE_2 
 *
 * @desc A data table should have a caption element with content.
 *
 * @group Table Rule 
 * 
 * @updated 2011-10-11  
 */
 { id       : 'TABLE_2', 
   lastUpdated   : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['caption'],
   language    : "",
   enabled     : true,
   validateParams : {}, 
   validate    : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     var i;   
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
       
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.caption && te.caption.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.caption]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_CAPTION_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
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
 * @rule TABLE_3
 *
 * @desc If a table is a data table, a data table should have a summary attribute with content.
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */

 { id             : 'TABLE_3', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     var i;   
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
       
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
       
         if (te.is_data_table) {
           
           if (te.dom_element.computed_style.at == OpenAjax.a11y.VISIBILITY.VISIBLE) {
       
             if (te.summary && te.summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [te.summary]);     
             }
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_SUMMARY_MISSING', []);     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
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
 * @rule TABLE_4
 *
 * @desc    If a table has both a caption element/aria-labelledby attribute and 
 *          a summary/aria-describedby attribute, 
 *          the summary content must be unique from the caption content 
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 *
 * =============================================================== */
 
 { id              : 'TABLE_4', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_th'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
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
      
         if (te.is_data_table) {
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
             if ((te.summary && te.summary.length > 0) && (te.caption && te.caption.length > 0)) {
               if (te.summary !== te.caption) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_UNIQUE', []);     
               }
               else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NOT_UNIQUE', []);     
               }
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }  
       } // end loop
     }
   } // end valifdation function
 },

/** 
 * @rule TABLE_5
 *
 * @desc    Each data table must include column and/or row headers:  
 *          The first cell in each column must be a th element,
 *          and/or each row must contain at least one th element.
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 *
 * =============================================================== */
 
 { id              : 'TABLE_5', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_th'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var table_elements = dom_cache.tables_cache.table_elements;
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
     
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
      
             info = te.headerCellsInFirstRow(); 

             if (info.th_count) {
             
               if (info.total && info.th_count == info.total) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.th_count]);     
               } 
               else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', [info.th_count, info.total]);
               } 
             }  
             else {
               info = te.headerCellsInFirstColumn();
               
               if (info.th_count && info.total && info.th_count == info.total) {
                 rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', [info.th_count]);     
               
               } else {
                 rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', [info.th_count, info.total]);
               }     
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);     
           }
         }   
       } // end loop
     } 
  } // end valifdation function
},
/**
 * @rule TABLE_6
 *
 * @desc    Each TH element with content in a complex table 
 *          must have an id attribute, whose id value must be unique 
 *          on the page
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id              : 'TABLE_6', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['is_header','dom_element.id'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i,j,k;
     var te;
      
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
     
     var cells;
     var cell;
     var last_cell = null;
     
     var max_row;
     var max_column;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_complex_data_table) {

           cells       = te.cells;  
           max_row     = te.max_row;
           max_column  = te.max_column;

           for(j=0; j<max_row; j++) {
           
             for(k=0; k<max_column; k++) {
               
               cell = cells[j][k];
               
               if (!cell || !cell.is_th || last_cell === cell) break;
               
               if (cell.dom_element.computed_style.at === VISIBILITY.VISIBLE) {
                
                 if (cell.cell_content.length !== 0) {                 
                 
                   if (cell.dom_element.id_unique == OpenAjax.a11y.ID.NOT_UNIQUE) {
                     rule_result.addResult(rule_result.rule_severity, cell, 'MESSAGE_ID_NOT_UNIQUE', [cell.dom_element.id]);     
                   }
                   else {
                     if (cell.dom_element.id_unique == OpenAjax.a11y.ID.NOT_DEFINED) {
                       rule_result.addResult(rule_result.rule_severity, cell, 'MESSAGE_ID_NOT_DEFINED', []);     
                     }
                     else {
                       rule_result.addResult(SEVERITY.PASS, cell, 'MESSAGE_PASS', []);    
                     }                     
                   }
                 }
                 else {
                   rule_result.addResult(SEVERITY.NA, cell, 'MESSAGE_NO_CONTENT', []);    
                 }
               }
               else {
                 rule_result.addResult(SEVERITY.NA, cell, 'MESSAGE_HIDDEN', []);     
               }
               
               last_cell = cell;

             }  
           }
         }
       } // end loop
     } 
   } // end valifdation function
 },

/**
 * @rule TABLE_7
 *
 * @desc  If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11 
 */
 { id              : 'TABLE_7', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['headers'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
     
     var i, j, k ;   
     var te;
     var te_row;
     var te_row_len;
     
     var cell;
     var last_cell;
   
     var count;
     var content;
   
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
     
         if (te.is_complex_data_table && 
            (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
     
           count = 0;
           
           for (j=0; j<te.max_row; j++) {
           
             te_row = te.cells[j];
             te_row_len = te_row.length;
             
             for (k=0; k<te_row_len; k++) {
              
               cell = te_row[k];
              
               if (cell && (cell != last_cell) && !cell.is_header && cell.cell_content && cell.cell_content.length) {  
              
                 if (!cell.headers || !cell.headers_array || cell.headers_array.length === 0) count++;
         
               } 
               
               last_cell = cell;

             }  // end loop
           }  // end loop      
           
           if (count === 0) {      
             rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);                
           }
           else {
             rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_MISSING_HEADERS', [count]);                
           }

         }
         else {
           rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);          
         }
       } // end loop
     } 
   } // end valifdation function
 },

/**
 * @rule TABLE_8
 *
 * @desc   If a table is a complex data table, it must have a summary attribute with content.
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_8', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
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
       
           if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
       
             if (te.summary && te.summary.length > 0) {
               rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_PASS', []);
             } 
             else {
               rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_FAIL', []);
             }
           }
           else {
             rule_result.addResult(SEVERITY.NA, te, 'MESSAGE_HIDDEN', []);
           } 
         }
       }
     }    
  } // end valifdation function
},

/**
 * @rule TABLE_9
 *
 * @desc  If there is more than one data table on a page, each data table must have a 
 *         summary attribute with content that is unique on the page
 *
 * @group Table Rule
 *  
 * @updated 2011-10-11 
 */
 { id             : 'TABLE_9', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['summary'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
       
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     var summaries = [];
     var summaries_len;
     var item;
     var i, j;   
     var s1, s2;
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {

       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];

         if (te.is_data_table && (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
      
           item = {};
           item.index = i;
           item.summary = te.summary;
           item.summary_for_comparison = te.summary_for_comparison;
           item.unique = true;
           if (item.summary && item.summary.length) { 
             item.summary = item.summary.toLowerCase().trim();
             summaries.push(item);
           } 
         }
       } // end loop
     } 
   
     summaries_len = summaries.length;
   
     if (summaries_len>1) {
   
       for (i=0; i<summaries_len; i++) {
         s1 = summaries[i];
       
         for (j=(i+1); j<summaries_len; j++) {
           s2 = summaries[j];
       
           if (s1.summary_for_comparison == s2.summary_for_comparison) {
             s1.unique = false;
             s2.unique = false;
             break;
           }
         }
       } // end loop
     
       for (i=0; i<summaries_len; i++) {
         s1 = summaries[i];
        
         if (s1.unique) {
           rule_result.addResult(SEVERITY.PASS, table_elements[s1.index], 'MESSAGE_UNIQUE', [s1.summary]);    
         }
         else {
           rule_result.addResult(rule_result.rule_severity, table_elements[s1.index], 'MESSAGE_NOT_UNIQUE', [s1.summary]);          
         }
       } // end loop
     }
   } // end validation function
 },
 
/**
 * @rule TABLE_10
 *
 * @desc     If there is more than one data table on a page, each data table 
 *           should have a caption element with content that is unique on the page
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_10', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['caption'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
       
     var table_elements   = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements.length;
   
     var captions = [];
     var captions_len;
     var item;
     var i, j;   
     var c1, c2;
     var te;
   
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
     
         if (te.is_data_table && (te.dom_element.computed_style.at == VISIBILITY.VISIBLE)) {
      
           item = {};
           item.index   = i;
           item.caption = te.caption;
           item._for_comparison = te.caption_for_comparison;
           item.unique     = true;
           
           if (item.caption && item.caption.length) { 
             captions.push(item);
           }  
         }
       } // end loop
     } 
     captions_len = captions.length;
    
     if (captions_len > 1 ) {
       
       for (i=0; i<captions_len; i++) {
         c1 = captions[i];
       
         for (j=(i+1); j<captions_len; j++) {
           c2 = captions[j];
           
           if (c1.caption_for_comparison == c2.caption_for_comparison) {
             c1.unique = false;
             c2.unique = false;
             break;
           }
         } // end loop
       } // end loop
     
       for (i=0; i<captions_len; i++) {
         c1 = captions[i];
         
         if (c1.unique) {
           rule_result.addResult(SEVERITY.PASS, table_elements[c1.index], 'MESSAGE_UNIQUE', [c1.caption]);    
         }
         else {
           rule_result.addResult(rule_result.rule_severity, table_elements[c1.index], 'MESSAGE_NOT_UNIQUE', [c1.caption]);          
         }
       } // end loop 
     }
     else {
       // there was only one or none data tables
       if (captions_len == 1 && table_elements[0]) {
         rule_result.addResult(SEVERITY.NA, table_elements[0], 'MESSAGE_NA', []);
       }     
     }
   } // end validation function
 },
 
/**
 * @rule TABLE_11
 *
 * @desc     Do not use nested tables more than 1 column wide  
 *           for positioning content outside of landmarks.
 *           Fails with one or more one levels of nesting.
 * 
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_11', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {

     function setResultTableChildren(table_elements, severity, message) {
      
       var i;
       var te;
      
       for (i=0; i<table_elements.length; i++) {
         te = table_elements[i];
         
         if (!te.is_data_table) rule_result.addResult(severity, te, message, []);   
         
         if ( te.child_tables && te.child_tables.length) {
           setResultTableChildren(te.child_tables, severity, message);     
         }    
       }    
         
     }

     function checkForTableNesting(table_elements, parent_is_a_nesting_table, count) {
      
       var i;
       var te;
                    
       for (i=0; i<table_elements.length; i++) {
         te = table_elements[i];  
       
         if (te.is_data_table) {
           setResultTableChildren(te.child_tables, SEVERITY.WARNING, 'MESSAGE_LAYOUT_INSIDE_DATA');
         }
         else {           
                      
           if (te.max_column > 1) {
             rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_NESTED_LAYOUT', [count]);   
             checkForTableNesting(te.child_tables, true, (count+1));
           }
           else {
             rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_ONE_COLUMN', [te.max_row]);   
             checkForTableNesting(te.child_tables, false, (count+1));             
           }           
         }          
       }        
     }
     
     var SEVERITY = OpenAjax.a11y.SEVERITY;
    
     var i;
     var te;
    
     var child_tables = dom_cache.tables_cache.child_tables;
     var child_tables_len = child_tables.length;
     
     for (i=0; i<child_tables_len; i++) {
       te = child_tables[i];  
       
       if (te.is_data_table) {
         setResultTableChildren(te.child_tables, SEVERITY.WARNING, 'MESSAGE_LAYOUT_INSIDE_DATA');
       }
       else {           
                   
         if (te.max_column > 1) {
           rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_TOP_LEVEL', [te.max_row, te.max_column]);   
           checkForTableNesting(te.child_tables, true, 1);
         }
         else {
           rule_result.addResult(SEVERITY.PASS, te, 'MESSAGE_ONE_COLUMN', [te.max_row]);   
           checkForTableNesting(te.child_tables, false, 1);             
         }           
       }          
     }     
     
   }  // end valifdation function
 },
 
/**
 * @rule TABLE_12
 *
 * @desc     Do not use nested tables more than 1 column wide for positioning within a landmark. 
 *           Fails with one or more one levels of nesting.
 * @group Table Rule
 * 
 * @updated 2011-10-11
 */
 { id              : 'TABLE_12', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
       
     var tables_elements_len;
     var tables_element;
        
  } // end valifdation function
},
 
/**
 * @rule TABLE_13
 *
 * @desc  If tables are used for layout, verify the content is meaningful when table markup is ignored.
 *
 * @group Table Rule
 * 
 * @updated 2011-10-11
 *
 * =============================================================== */
 { id              : 'TABLE_13', 
   lastUpdated     : '2011-09-17', 
   cacheDependency : 'tables_cache',
   cacheProperties : ['columns'],
   language        : "",
   enabled         : true,
   validateParams  : {}, 
   validate        : function (dom_cache, rule_result) {
   
     var SEVERITY = OpenAjax.a11y.SEVERITY;
     var VISIBILITY = OpenAjax.a11y.VISIBILITY;
        
     var table_elements = dom_cache.tables_cache.table_elements;
     var table_elements_len = table_elements;
    
     var i;   
     var te;
     var tc;
     
     // Check to see if valid cache reference
     if (table_elements && table_elements_len) {
     
       for (i=0; i < table_elements_len; i++) {
         te = table_elements[i];
         
         if (te.dom_element.computed_style.at == VISIBILITY.VISIBLE) {
         
           if (!te.is_data_table)  rule_result.addResult(SEVERITY.rule_severity, te, 'MESSAGE_VERIFY', []);
         }
         else {
           rule_result.addResult(rule_result.rule_severity, te, 'MESSAGE_HIDDEN', []);
         } 
       }
     }  
   } // end valifdation function
 }  
]); 


    

