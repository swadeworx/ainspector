/*
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
/*                            TableInfo                             */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableInfo
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a TableInfo object for preserving the current table information 
 *        when traversing the DOM for table information
 *
 * @property {table cache object}   parent_element     - Parent table cache Object (if any)
 * @property {TableElement}         table_element      - Parent TableElement (if any)
 * @property {TBodyElement}         table_body_element - Parent TBodyElement (if any)
 * @property {TableRowElement}      table_row_element  - Parent TableRowElement (if any)
 * 
 * @param {TableInfo} table_info - Current ControlInfo object
 */
 
 OpenAjax.a11y.cache.TableInfo = function (table_info) {

   if (table_info) {
     this.parent_element      = table_info.parent_element;
     this.table_element       = table_info.table_element;
     this.table_body_element  = table_info.table_body_element;
     this.table_row_element   = table_info.table_row_element;
   }
   else {
     this.parent_element      = null;
     this.table_element       = null;
     this.table_body_element  = null;
     this.table_row_element   = null;
   }  
 }; 
 
/* ---------------------------------------------------------------- */
/*                          TablesCache Object                      */
/* ---------------------------------------------------------------- */

/** 
 * @constructor TablesCache
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Create a table cache object to hold information about tables in a web page
 *          
 * @param {DOMCache}   dom_cache   - Reference to the DOMCache object 
 * 
 * @property {DOMCache}  dom_cache   - Reference to the DOMCache object 
 * @property {Boolean}   up_to_date  - true if the cache has been creating using the current DOMElements, else false
 *                                       NOTE: This is a common property of all caches and is used when selectively build caches 
 *                                             based on whether a rule needs the cache
 *
 * @property {Array}    child_cache_elements - Root array of the tree representation of the table elements in the document 
 *
 * @property {Array}    table_elements - Array of all the TableElement objects in the cache  
 * @property {Number}   length         - Running length of the table_elements array for use in calculating cache_id values
 * @property {String}   sort_property  - The property a TableElement object the table_elements array is currently sorted by
 * @property {Boolean}  ascending      - Boolean  true if the list is ascending order or false if descending
 * 
 * @property {Array}    rule_results   - Root array of the tree representation of the table elements in the document 
 *
 * @property {ResultRuleSummary}  rule_summary_result  - Rule results associated with this cache 
 */
OpenAjax.a11y.cache.TablesCache = function (dom_cache) {

  // Private properties
  this.dom_cache = dom_cache;
  this.up_to_date = false;

  // Public properties
  this.child_cache_elements = [];    
   
  this.table_elements = [];  
  this.length         = 0;  
  this.sort_property  = 'document_order';
  this.ascending      = true;

};

/**
 * @method addTableElement
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Adds a table element object to the list of tables and generates a cache_id for the table element object
 *
 * @param {TableElement}  table_element   - TableElement object to add to the cache
 *
 * @return {Number} Returns the number of table element objects in the list
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addTableElement = function (table_element) {

   // item must exist and have the position property
   if (table_element) {
     this.length = this.length + 1;
     table_element.document_order = this.length;
     table_element.cache_id = "table_" + this.length;
     this.table_elements.push( table_element );
   } 

   return this.length;

 };

/** 
 * @method addChild
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 * 
 * @desc Adds a cache table element to the tree representation of the table in the table cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.addChild = function (table_element) {

   if (table_element) {
     this.child_cache_elements.push(table_element); 
   }  
 }; 

/** 
 * @method addRuleResult
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 * 
 * @desc Add a RuleResult reference to the table cache 
 *
 * @param {RuleResult}  rule_result - Rule result to associate with the table cache 
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addRuleResult = function (rule_result) {

   if (rule_result) {
     this.rule_results.push(rule_result); 
   }  
 }; 

/**
 * @deprecated getTableElementByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the table cache element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement | null} Returns cache table element object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getTableElementByCacheId = function (cache_id) {
   return this.getItemByCacheId(cache_id);
 };

/**
 * @method getItemByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the table cache element object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement | null} Returns cache table element object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getItemByCacheId = function (cache_id) {

   var i;
   var te;
   var table_elements_len = this.table_elements.length;
   var id_info = cache_id.split('_');
   var table_id = "table_" + id_info[1];
   
   for (i = 0; i < table_elements_len; i++) {
     te = this.table_elements[i];

     if (te.cache_id == cache_id) {
       return te;
     }
     else {
       if (te.cache_id == table_id) {
         return te.getTableElementByCacheId(cache_id);
       }
     }
   }
     
   return null;
 };

/**
 * @method getRuleResultByCacheId
 * 
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Finds the the rule result object with the matching cache id
 *
 * @param  {String}  cache_id  - Cache id of table cache element object
 *
 * @return {ResultRule | null} Returns cache rule result object if cache id is found, otherwise null
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getRuleResultByCacheId = function (cache_id) {

   var i;
   var rr;
   var rule_results     = this.evaluation_results.rule_results;
   var rule_results_len = rule_results.length;
      
   for (i = 0; i < rule_results_len; i++) {
     rr = rule_results[i];
     if (rr.cache_id == cache_id) return rr;
   } // end loop
     
   return null;
 };
/**
 * @method getRuleResultByRuleId
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Gets the rule result object with the matching rule id
 *
 * @param {String} rule_id - rule id of table element
 *
 * @return {RuleResult | null}}  Returns rule result object if rule id is found, otherwise null
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.getRuleResultByRuleId = function (rule_id) {

  var i;
  var rr;
  var rule_results_len = this.rule_results.length;
   
  for (i = 0; i < rule_results_len; i++) {
    rr = this.rule_results[i];

    if (rr.rule.rule_id == rule_id) {
      return rr;
    }
  }
     
  return null;
};


/**
 * @method updateCacheItems
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Updates the tables cache object by checking to see if a dom element object
 *          should be added to the table cache objects
 *  
 * @param  {DOMElement}  dom_element  - DOMElement object to check for inclusion in tables cache
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.updateCacheItems = function (dom_element, table_info) {

   var te;
   var tce;
   var ce;
   var tbe;
   var the;
   var tre;
   
   var ti = new OpenAjax.a11y.cache.TableInfo(table_info);

   switch (dom_element.tag_name) {

     case 'table':
       te = new OpenAjax.a11y.cache.TableElement(this.dom_cache, dom_element, table_info);
       this.addTableElement(te);
  
       if (table_info.parent_element) {
         table_info.parent_element.addChild(te);   
       }
       else {
         this.addChild(te);
       }
       
       ti.parent_element = te;   
       ti.table_element  = te;    
       ti.table_body_element  = null;    
       ti.table_row_element  = null;    
             
       break;

     case 'caption':
       ce = new OpenAjax.a11y.cache.CaptionElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(ce);   
         if (table_info.parent_element) {
           table_info.parent_element.addChild(ce);
         }
       }
 
       break;

     case 'thead':
       the = new OpenAjax.a11y.cache.THeadElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(the);   
         if (table_info.parent_element) {
           table_info.parent_element.addChild(the);   
         } 
       }

       ti.parent_element     = the;   
       ti.table_body_element = the;   
       ti.table_row_element  = null;    

       break;

     case 'tbody':
       tbe = new OpenAjax.a11y.cache.TBodyElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(tbe);   
         
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tbe);   
         }
       }
       
       ti.parent_element = tbe;   
       ti.table_body_element = tbe;   
       ti.table_row_element  = null;    

       break;

     case 'tr':
       tre = new OpenAjax.a11y.cache.TableRowElement(dom_element, table_info);

       if (table_info.table_element) {
         table_info.table_element.addTableElement(tre);   
         
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tre);   
         }
         
         if (table_info.table_body_element) {
           table_info.table_body_element.row_count++;
         }
       }
 
       ti.parent_element     = tre;
       ti.table_row_element  = tre;

       break;


     case 'td':
     case 'th':
       tce = new OpenAjax.a11y.cache.TableCellElement(dom_element, table_info);
       
       if (table_info.table_element) {
         table_info.table_element.addTableElement(tce);   
                  
         if (table_info.parent_element) {
           table_info.parent_element.addChild(tce);   
         }
       }
 
       ti.parent_element      = tce;
       
       break;
       
     default:
       break;

   } // end switch

   return ti;
 };

/**
 * @method traverseDOMElementsForTableElements
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param {TableElement}      dom_element  - DOMElement object to check fo inclusion in tables cache
 * @param {TableInformation}  table_info   - Information needed for identifying the parent/child relationships of nested tables
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.traverseDOMElementsForTableElements = function (dom_element, table_info) {

   var i;
   var ti;

   if (!dom_element) return;

     if (dom_element.type == Node.ELEMENT_NODE) {

       ti = this.updateCacheItems(dom_element, table_info);
  
       for (i=0; i<dom_element.child_dom_elements.length; i++ ) {
         this.traverseDOMElementsForTableElements(dom_element.child_dom_elements[i], ti);
       } // end loop
     }  
 }; 

/**
 * @method updateCache
 *
 * @memberOf OpenAjax.a11y.cache.TablesCache
 *
 * @desc Traverses the DOMElements to update the tables cache
 *       NOTE: This function is only used when the specialized caches
 *       are build as rules need them.  In this condition, if the rules 
 *       dependent on the controls cache are disabled, this cache would 
 *       not be updated
 */
 
 OpenAjax.a11y.cache.TablesCache.prototype.updateCache = function () {
   
   var i;
   var children = this.dom_cache.element_cache.child_dom_elements;
   var children_len = children.length;

   var table_info = new OpenAjax.a11y.cache.TableInfo(null);

   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating table elements cache.");
 
   for (i=0; i < children_len; i++) {
     this.traverseDOMElementsForTableElements(children[i], table_info);
   }  
   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed table elements cache update, number of table items is " + this.length + " and the number of cells is " + this.cell_total);
   this.up_to_date = true;
 };

/* ---------------------------------------------------------------- */
/*                       TableElement Object                        */
/* ---------------------------------------------------------------- */

/**
 * @constructs TableElement
 *
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates table element object used to hold data about a table 
 *         
 * @param  {DOMCache}          dom_cache           - Reference to the current dom cache for use of dom cache methods to find references   
 * @param  {DOMElement}        dom_element         - dom_element object provides information about current dom node 
 * @param  {TableCellElement}  table_cell_element  - table_cell_element object provides information about the table 
 *                                                   cell the table may be a child of in the dom 
 *
 * @property  {DOMCache}    dom_cache    - DOMCache reference for reference DOMCache methods for calculating headers
 * @property  {DOMElement}  dom_element  - DOMElement associated with the form element
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 * @property  {Number}      document_order  - Ordinal position of the table element in the document in relationship to other table elements
 *
 * @property  {Array}       child_cache_elements  - Array of cache table elements as part of table elements relationship tree 
 * @property  {Array}       table_elements        - List of all table element objects in this table element object
 * @property  {Number}      length                - Number of table element objects 
 *
 * @property  {String}  effective_summary  - The calculated description of a data table, empty for layout tables
 * @property  {String}  effective_caption  - The calculated name of a data table, empty for layout tables
 *
 * @property  {Number}  max_row     - Number of rows in a table  
 * @property  {Number}  max_column  - Number of columns in a table
 * 
 * @property  {Number}  row     - Used as the current row counter when traversing a table dom elements  
 * @property  {Number}  column  - Used as the current column counter when traversing a table dom elements
 * 
 * @property  {Array}   cells     - A two dimensional array representing the table row and columns
 * @property  {Array}   cell_ids  - List of table cell objects who have an id attribute defined
 *
 * @property  {Boolean}  is_data_table          - True if the table is identified as a data table
 * @property  {Boolean}  is_complex_data_table  - True if the table is identified as a complex data table
 *
 * @return {TableElement}
 */
 OpenAjax.a11y.cache.TableElement = function (dom_cache, dom_element, table_info) {

   if( !dom_element ) return null;  

   this.type = OpenAjax.a11y.TABLE.TABLE_ELEMENT;

   this.dom_cache      = dom_cache;
   this.dom_element    = dom_element;
   this.cache_id       = "";
   this.document_order = 0;
   
   this.child_cache_elements = [];

   this.table_elements = [];
   this.length = 0;

   this.effective_caption = "";
   this.effective_caption_for_comparison = "";
   
   this.summary = this.dom_element.node.getAttribute("summary");

   this.effective_summary = this.summary;

   if (this.effective_summary && this.effective_summary.length) { 
     this.effective_summary_for_comparison = this.effective_summary.normalizeSpace().toLowerCase();
   }
   else {
     if (dom_element.aria_describedby) {
       this.effective_summary = dom_cache.getTextFromIDs(dom_element.aria_describedby);
       this.effective_summary_for_comparison = this.effective_summary.normalizeSpace().toLowerCase();
     }
     else {
       this.effective_summary = "";   
       this.effective_summary_for_comparison = "";   
     }  
   }
 
   this.max_row = 0; 
   this.max_column = 0;

   this.cell_count = 0;
   
   this.cell_ids = [];

   this.row      = -1;   
   this.column   = 0;  
   
   this.cells    = [];
   this.cells[0]  = [];
   this.cells[0][0] = null;
 
   this.is_data_table = false;
   this.is_complex_data_table = false;

   this.nesting_level        = 0;
   this.layout_nesting_level = 0;
   this.layout_table_in_data_table = false;
   this.data_table_in_data_table = false;

   this.parent_table_element = table_info.table_element;
   
   if (table_info.table_element) {
     
     this.nesting_level = table_info.table_element.nesting_level + 1;
     
     if (table_info.table_element.is_data_table) {
       this.layout_in_data_table = true; 
     }
     
     if (table_info.table_element.max_column > 1) {
       this.layout_nesting_level = table_info.table_element.layout_nesting_level + 1;   
     }
     
   }
 
   return this;
 };

/**
 * @method setIsDataTable
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Set is a data table property, if not already set   
 */
 
OpenAjax.a11y.cache.TableElement.prototype.setIsDataTable = function () {

  // if role=presentation this is a layout table
  if (this.dom_element.role && this.dom_element.role === "presentation") {
    this.setIsLayoutTable();
    return; 
  }  

  if(this.is_data_table) return;

  this.is_data_table = true;

  if (this.parent_table_element) {
     
    if (this.parent_table_element.is_data_table) {
      this.layout_table_in_data_table = false; 
      this.data_table_in_data_table = true; 
    }
     
    this.layout_nesting_level = this.parent_table_element.layout_nesting_level + 1;   
     
  }
  
};

/**
 * @method setIsLayoutTable
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Set is a data table property, if not already set   
 */
 
OpenAjax.a11y.cache.TableElement.prototype.setIsLayoutTable = function () {

  this.is_data_table = false;

  if (this.parent_table_element) {
     
    if (this.parent_table_element.is_data_table) {
      this.layout_table_in_data_table = true; 
      this.data_table_in_data_table = false; 
    }
     
    this.layout_nesting_level = this.parent_table_element.layout_nesting_level + 1;   
     
  }
  
};


/**
 * @method getTableElementByCacheId 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Retrieve table cache element from the tree of table cache elements
 *
 * @param  {String}  cache_id  -  cache_id of a table cache element 
 *
 * @return  {CaptionElement | TheadElement | TBodyElement | TableRowElement | TableCellElement | null}  Returns table cache element if cahce id is found, otherwise null
 */
OpenAjax.a11y.cache.TableElement.prototype.getTableElementByCacheId = function (cache_id) {
  return this.getItemByCacheId(cache_id);
};
 
/**
 * @method getItemByCacheId 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc  Retrieve table cache element from the tree of table cache elements
 *
 * @param  {String}  cache_id  -  cache_id of a table cache element 
 *
 * @return  {CaptionElement | TheadElement | TBodyElement | TableRowElement | TableCellElement | null}  Returns table cache element if cahce id is found, otherwise null
 */
 
OpenAjax.a11y.cache.TableElement.prototype.getItemByCacheId = function (cache_id) {

   function traverseTableElements(table_elements) {
     var table_elements_len = table_elements.length;
     var to;
     var i;
     var ro;
     
     for (i = 0; i < table_elements_len; i++) {
       to = table_elements[i];
       
       if (to.cache_id == cache_id) {
         return to;
       }
       else {
         if (to.child_cache_elements && to.child_cache_elements.length) {
           ro = traverseTableElements(to.child_cache_elements);
           if (ro) return ro;
         }
       }
     } // end loop
   
     return null;
   }

   return traverseTableElements(this.child_cache_elements);
 
 };

/**
 * @method addTableElement 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc    Adds a table cache element object to table_elements array and generates a cache id value for the table element object
 *
 * @param  {CaptionElement | TableTHeadElement | TableTBodyElement | TableRowElement | TableCellElement} table_element  - table cache element to add
 *
 * @return  {Number}  Returns the length the list of table elements 
 *
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableElement = function (table_element) {

   var caption;
   var summary;

   this.length = this.length + 1;
   table_element.document_order = this.length;
   table_element.cache_id = this.cache_id + "_te_" + this.length;
     
   this.table_elements.push(table_element);

   switch (table_element.table_type) {
   
   case OpenAjax.a11y.TABLE.CAPTION_ELEMENT:
     this.setIsDataTable();
     this.effective_caption                = table_element.name;
     this.effective_caption_for_comparison = table_element.name_for_comparision;
     break;
   
   case OpenAjax.a11y.TABLE.THEAD_ELEMENT:
     this.setIsDataTable();
     break;

   case OpenAjax.a11y.TABLE.TBODY_ELEMENT:
     break;

   case OpenAjax.a11y.TABLE.TR_ELEMENT:
     this.nextRow();   
     break;

   case OpenAjax.a11y.TABLE.TH_ELEMENT:
     this.setIsDataTable();

     if ((table_element.number_of_header_ids > 1) ||
         (table_element.row_span             > 1) ||
         (table_element.column_span          > 1)) {
       this.is_complex_data_table = true;        
     }

     this.addTableCellElement(table_element);
     break;   

   case OpenAjax.a11y.TABLE.TD_ELEMENT:  
   
     if (this.is_data_table) {
       if ((table_element.number_of_header_ids > 1) ||
           (table_element.row_span             > 1) ||
           (table_element.column_span          > 1)) {
         this.setIsDataTable();
         this.is_complex_data_table = true;        
       }     
     } else {
       if ((this.max_row > 1) && 
           (this.max_column > 1) && 
           OpenAjax.a11y.DATA_TABLE_ASSUMPTION) {
         this.setIsDataTable();
       }
     }
     
     this.addTableCellElement(table_element);
     break;
     
   default:
     break;


   } // end switch

   return this.length;

 };

/**
 * @method addChild 
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Adds a cache table element to the root tree representation of the tree cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableElement.prototype.addChild = function (table_element) {

 if (table_element) {
  this.child_cache_elements.push(table_element); 
 }  

}; 

/**
 * @method nextRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Updates the current table cell counters and array to start a new row in the table
 */
 OpenAjax.a11y.cache.TableElement.prototype.nextRow = function () {
 
   this.row = this.row + 1;
   this.max_row = this.row+1; // 1 based index
      
   // see if there is already a row created
   if (typeof(this.cells[this.row]) != 'object') {
     // If row does not exist create it
     this.cells[this.row] = [];
     this.cells[this.row][0] = null;
   }
   
   if (!this.is_complex_data_table && this.max_column > 2 ) {
	 this.multipleTHInRow(this.max_row-1); 	   
   } 
   
   if (!this.is_complex_data_table && this.max_row > 2) {
	 this.multipleTHInColumn(); 	   
   }
 };
 
/**
 * @method multipleTHInRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Tests to see if there are multiple table header cells in a row and sets complex data table flag if there are
 * 
 * @param {Number} row - Number of the row to test for headers
 */
 OpenAjax.a11y.cache.TableElement.prototype.multipleTHInRow = function(row) {
   
   if (!this.cells[row] || this.cells[row].length < 2) return;
   
   var i;
   var th_count = 0;
   var td_count = 0;
   
   var row_len = this.cells[row].length;
   var cell;
   
   for (i=0; i<row_len; i++) {
	 cell = this.cells[row][i];
	
	 if (cell && 
	     cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
	   th_count++;
	 }
	 else {
	   td_count++;
	 }
   }   
   
   if (th_count > 1 && td_count > 0) {
     this.is_complex_data_table = true;
   }

 };

/**
 * @method multipleTHInColumn
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Tests to see if there are multiple table header cells in a column and sets complex data table flag if there are
 * 
 * @param {Number} column - Number of the column to test for headers
 */
 OpenAjax.a11y.cache.TableElement.prototype.multipleTHInColumn = function() {
      
   var c, r;
   var th_count = 0;
   var td_count = 0;

   var row_max = this.max_row;
   var col_max = this.cells[0].length;
   var row_len;
   var cell;
   
   for (c=0; c<col_max; c++) {   
     th_count = 0;
     td_count = 0;
     
     for (r=0; r<row_max; r++) {
	   cell = this.cells[r][c];
	
  	   if (cell && 
  	       cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
	     th_count++;
	   }
	   else {
	     td_count++;
	   }
	 }
	 
     if (th_count > 1 && td_count > 0) {
       this.is_complex_data_table = true;
       return;
     }  
   }   
 };

/**
 * @method addTableCellElement
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Adds a TableCellElement to the current row
 *
 * @param {TableCellElement}  table_cell_element  -  The table cell element object to add in to the current row and column of a table 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableCellElement = function (table_cell_element) {

   var i;
   var j;
   var r;
   var c;
   
   this.column = 0; 
  
   if (table_cell_element.id && 
       table_cell_element.id.length) {
     this.cell_ids.push(table_cell_element.id);
   }

   // find the next available spot in cells array, this needs to be calculated due to row anc olumn spanning 
   while ((this.cells[this.row][this.column] !== undefined) &&
          (this.cells[this.row][this.column] !== null)) {
     this.column++;
   } // end loop

   r = this.row;
   c = this.column;
     
   table_cell_element.row    = r;
   table_cell_element.column = c;

   for (i=0; i<table_cell_element.row_span; i++) {
     
     for (j=0; j<table_cell_element.column_span; j++) {
       this.cells[r][c] = table_cell_element;
       c += 1;
     }
     r += 1;
  
     // see if there is already a row created
     if (typeof(this.cells[r]) != 'object') {
       // If row does not exist create it
       this.cells[r] = [];
       this.cells[r][0] = null;
     } 
   }  
   this.setTableCellHeader(this.row, this.column, table_cell_element);

   if (c > this.max_column) this.max_column = c; 
   
 }; 

/**
 * @method sortCellIds
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 * 
 * @desc Sorts the cell ids array for this table based on the id values
 */
 OpenAjax.a11y.cache.TableElement.prototype.sortCellIds = function () {

   var swapped = false;
   var temp = null;
   var i;
 
   var cell_ids_len = this.cell_ids.length;

   do{
     swapped = false;
     
     for (i = 1; i < cell_ids_len; i++ ) {
     
       if (this.cell_ids[i-1] > this.cell_ids[i]) {
         
         // swap the values
         temp = this.cell_ids[i-1];
         this.cell_ids[i-1] = this.cell_ids[i];
         this.cell_ids[i] = temp;
         swapped = true;
       } 
     } // end loop
   } while (swapped);
 };

/**
 * @method setTableCellHeader
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Sets header content property of the table cell element object 
 *
 * @param {Number}            row                 - Current row position of the table cell element object
 * @param {Number}            column              - Current column position of the table cell element object
 * @param {TableCellElement}  table_cell_element  - Table cell element object to create header content property
 */
 OpenAjax.a11y.cache.TableElement.prototype.setTableCellHeader = function (row, column, table_cell_element) {

   var tag_name;   
   var scope;
   var string_array = [];
   var cell, r, c;

   tag_name = table_cell_element.dom_element.tag_name;
   scope  = table_cell_element.dom_element.scope;
   
   table_cell_element.header_source =  OpenAjax.a11y.HEADER_SOURCE.NONE;
 
   if (table_cell_element.headers) {
     table_cell_element.header_content = this.dom_cache.element_with_id_cache.getTextFromIds(table_cell_element.headers);
     if (table_cell_element.header_content.length) table_cell_element.header_source =  OpenAjax.a11y.HEADER_SOURCE.HEADERS_ATTRIBUTE;
   }
   else {
     // if a table cell is used as a header in the table and has no header attribute set its header to an empty string
     if (table_cell_element.table_type === OpenAjax.a11y.TABLE.TH_ELEMENT) {
       table_cell_element.header_content = "";
     }   
     else {

       // find TH or TD with scope=column in the same column
       for (r=(row-1); r>=0; r--) {
         cell = this.cells[r][column];
    
         if (cell) {
           tag_name = cell.dom_element.tag_name;
           scope  = cell.scope;
      
           if (tag_name == "th" || scope == "col") {
             if (!cell.cell_text) cell.cell_text = cell.dom_element.getText().normalizeSpace(); 
             string_array.push(cell.cell_text);
           }
         }     
       } 

       // find TH or TD with scope=row in the same row
       for (c=(column-1); c>=0; c--) {
         cell = this.cells[row][c];
    
         if (cell) {
           tag_name = cell.dom_element.tag_name;
           scope  = cell.scope;
          
           if (tag_name == "th" || scope == "row") {
             if (!cell.cell_text) cell.cell_text = cell.dom_element.getText().normalizeSpace(); 
             string_array.push(cell.cell_text);
           }
         } 
       } 
       table_cell_element.header_content = string_array.join(' ');
       
       if (table_cell_element.header_content.length) table_cell_element.header_source =  OpenAjax.a11y.HEADER_SOURCE.HEADERS_ATTRIBUTE;
     } 
   } 
 };

/**
 * @method findFirstRowWithContent
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Finds the first row of the table which has text content in at least one cell.
 *       This is used to skip rows that are used for stylistic puposes, since they usually
 *       do not have any text content other than spaces in them.
 *
 * @return {Number}  Returns number of first row with content  
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstRowWithContent = function() {
 
   var r;
   var c;
   var max_row = this.max_row;
   var max_col;
   var text;
   var cell;
 
   for (r = 0; r < max_row; r++) {
     max_col = this.cells[r].length;
 
     for (c = 0; c < max_col; c++) {
       cell = this.cells[r][c];
       
       if (!cell || !cell.dom_element) continue;
       
       text = cell.dom_element.getText();
    
       if (text) text = text.normalizeSpace();
       
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT || 
           text.length) {
         return r;
       }
     }
   }
   return -1;
 };

/**
 * @method findFirstColumnWithContent
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Finds the first column of the table which has text content in at least one cell.
 *       This is used to skip columns that are used for stylistic puposes, since they usually
 *       do not have any text content other than spaces in them.
 *
 * @return {Number}  Returns number of first column with content  
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstColumnWithContent = function() {
 
   var r;
   var c;
   var max_col = this.max_column;
   var max_row = this.max_row;
   var text;
   var cell;
 
   for (c = 0; c < max_col; c++) {
 
     for (r = 0; r < max_row; r++) {
     
       cell = this.cells[r][c];
       
       if (!cell || !cell.dom_element) continue;
       
       text = cell.dom_element.getText();
       
       if (text) text = text.normalizeSpace();
       
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT || 
           text.length) {
         return c;
       }
     }
   }
   return -1;
 };


/**
 * @method headerCellsInFirstRow
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Calculates the number of non-empty cells in the first row with content and
 *       how many of the non-empty cells are header cells
 *
 * @return {Object} Returns an object with two properties 'total' and 'th_count'  
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstRow = function () {

   // ro is the Return Object 
   var ro = {};
   ro.total = 0;
   ro.th_count = 0;

   var c;
   var max_col;
   var cell;
   var text;
 
   var r = this.findFirstRowWithContent();
   
   if (r < 0) return ro;
   
   if (this.cells[r]) {
   
     max_col = this.cells[r].length;
 
     for (c = 0; c < max_col;) {
       cell = this.cells[r][c];
     
       if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
         ro.total++;   
         ro.th_count++;   
       }
       else {
         text = cell.dom_element.getText();
   
         if (text) text = text.normalizeSpace();
   
         if (text.length) {
           ro.total++;
         } 
       }
       c += cell.column_span;
     }
   }  
   return ro;
 };

/** 
 * @method headerCellsInFirstColumn
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Calculates the number of non-empty cells in the first column with content and
 *       how many of the non-empty cells are header cells
 *
 * @return {Object} Returns an object with two properties 'total' and 'th_count'  
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstColumn = function () {

   // ro is the Return Object 
   var ro = {};
   ro.total = 0;
   ro.th_count = 0;
 
   var r;
   var c;
   var text;
   var cell;
   var max_row;
 
   c = this.findFirstColumnWithContent();
   
   if (c < 0) return ro; 
   
   max_row = this.max_row;
 
   for (r = 0; r < max_row;) {
     cell = this.cells[r][c];
     
     if (!cell) break;
     
     if (cell.table_type == OpenAjax.a11y.TABLE.TH_ELEMENT) {
       ro.total++;   
       ro.th_count++;   
     }
     else {
       text = cell.dom_element.getText();
   
       if (text) text = text.normalizeSpace();
   
       if (text.length) {
         ro.total++;
       } 
     }
     r += cell.row_span;
   } 
   return ro;
 };

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableElement.prototype.getAttributes = function (unsorted) {
   
  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes(unsorted);
  
  attributes.push(cache_nls.getNLSLabelAndValue('summary', this.summary));
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  properties.push(cache_nls.getNLSLabelAndValue('is_data_table', this.is_data_table));
  properties.push(cache_nls.getNLSLabelAndValue('is_complex_data_table', this.is_complex_data_table));
  properties.push(cache_nls.getNLSLabelAndValue('effective_caption', this.effective_caption));
  properties.push(cache_nls.getNLSLabelAndValue('effective_summary', this.effective_summary));
  properties.push(cache_nls.getNLSLabelAndValue('max_row', this.max_row));
  properties.push(cache_nls.getNLSLabelAndValue('max_column', this.max_column));
  properties.push(cache_nls.getNLSLabelAndValue('nesting_level', this.nesting_level));
  
  this.dom_element.sortItems(properties);
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableElement
 *
 * @desc Creates a text string representation of the table element object 
 *
 * @return {String} Returns a text string representation of the table
 */
 OpenAjax.a11y.cache.TableElement.prototype.toString = function () {
   var str = "";
   
   if (this.is_data_table) {
     str += this.max_column + "x" + this.max_row + " Data Table: ";
     if (this.effective_caption.length) {
       str += this.effective_caption;
     } 
     else {
        if (this.effective_summary) {
          str += this.effective_summary; 
        }
        else {
          str += "no name";
        }
     }
   } 
   else {
     str += this.max_row + "x" + this.max_column + " Layout Table ";   
   }
   
   return str;
     
 };


/* ---------------------------------------------------------------- */
/*                         CaptionElement Object                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor CaptionElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a caption element object which contains 
 *       information obout a caption element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with caption element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with caption element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the caption element
 *
 * @property  {Number}  type                 - Constant indicating the type of table cache element object
 *
 * @property  {String}  name                 - The text content of the caption element
 * @property  {String}  name_for_comparison  - The text content used for comparisons with other text content (i.e. lowercase, space normalized and trimmed)
 */
 
OpenAjax.a11y.cache.CaptionElement = function (dom_element, table_info) {

  this.dom_element = dom_element;

  var name  = dom_element.getText(); 
  this.name = name;
  this.name_for_comparison = name.normalizeSpace();
  
  this.table_type = OpenAjax.a11y.TABLE.CAPTION_ELEMENT;

  this.parent_table_element = table_info.table_element;
    
};

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getAttributes = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.CaptionElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.CaptionElement
 *
 * @desc Creates a text string representation of the caption element object 
 *
 * @return {String} Returns a text string representation of the caption element object
 */
 
 OpenAjax.a11y.cache.CaptionElement.prototype.toString = function () {
   return "caption: " + this.name;   
 };

/* ---------------------------------------------------------------- */
/*                         THeadElement Object                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor THeadElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a thead element object which contains 
 *       information obout a thead element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with thead element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with thead element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the thead element
 *
 * @property  {Number}  type       - Constant indicating the type of table cache element object
 *
 * @property  {Number}  row_count  - Number of table rows contained in the childresn of the thead element
 */
 
OpenAjax.a11y.cache.THeadElement = function (dom_element, table_info) {

  this.dom_element = dom_element;
  this.cache_id    = "";
  
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.THEAD_ELEMENT;
  
  this.row_count = 0;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.THeadElement.prototype.addChild = function (child_object) {

  if (child_object) {
    this.child_cache_elements.push(child_object); 
  }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.THeadElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.THeadElement.prototype.getAttributes = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var attributes = this.dom_element.getAttributes();
  
  return attributes;
};



/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.THeadElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.THeadElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.THeadElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.THeadElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.THeadElement
 *
 * @desc Creates a text string representation of the thead element object 
 *
 * @return {String} Returns a text string representation of the thead element object
 */
 OpenAjax.a11y.cache.THeadElement.prototype.toString = function () {
   var str = "thead: " + this.row_count + " rows";   
   
   if (this.row_count === 1 ) str =  "thead: " + this.row_count + " row";
   
   return str;
 };


/* ---------------------------------------------------------------- */
/*                         TBodyElement Object                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor TBodyElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a tbody element object which contains 
 *       information obout a tbody element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with tbody element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with tbody element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the tbody element
 *
 * @property  {Number}  type                 - Constant indicating the type of table cache element object
 *
 * @property  {Number}  row_count            - Number of table rows contained in the childresn of the tbody element
 */
 
OpenAjax.a11y.cache.TBodyElement = function (dom_element, table_info) {

  this.dom_element          = dom_element;
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.TBODY_ELEMENT;

  this.row_count = 0;

};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TBodyElement.prototype.addChild = function (child_object) {

 if (child_object) {
  this.child_cache_elements.push(child_object); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getAttributes = function () {
  return this.dom_element.getAttributes();
};


/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TBodyElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TBodyElement
 *
 * @desc Creates a text string representation of the tbody element object 
 *
 * @return {String} Returns a text string representation of the tbody element object
 */
 OpenAjax.a11y.cache.TBodyElement.prototype.toString = function () {
   var str = "tbody: " + this.row_count + " rows";   
   
   if (this.row_count === 1 ) str =  "tbody: " + this.row_count + " row";
   
   return str;
 };


/* ---------------------------------------------------------------- */
/*                       TableRowElement Object                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableRowElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Creates a table row element object which contains 
 *       information obout a tr element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with tr element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with tr element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}         child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}  parent_table_element  - Reference to the table element object that contatins the tr element
 *
 * @property  {Number}  type               - Constant indicating the type of table cache element object
 * @property  {String}  cache_id           - String that uniquely identifies the cache element in the DOMCache
 *
 * @property  {Number}  header_cell_count  - Number of header cells in the row
 * @property  {Number}  data_cell_count    - Number of data cells in the row
 */
 
OpenAjax.a11y.cache.TableRowElement = function (dom_element, table_info) {

  this.dom_element  = dom_element;
  this.cache_id     = "";
  
  this.child_cache_elements = [];
  this.parent_table_element = table_info.table_element;

  this.table_type = OpenAjax.a11y.TABLE.TR_ELEMENT;

  this.header_cell_count = 0;
  this.data_cell_count   = 0;
 
};

/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the table cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableRowElement.prototype.addChild = function (child_object) {

 if (child_object) {
  this.child_cache_elements.push(child_object); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getAttributes = function () {
  return this.dom_element.getAttributes();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getCacheProperties = function () {

  return this.dom_element.getCacheProperties();
  
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};

/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableRowElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableRowElement
 *
 * @desc Creates a text string representation of the tr element object 
 *
 * @return {String} Returns a text string representation of the tr element object
 */
 OpenAjax.a11y.cache.TableRowElement.prototype.toString = function () {
 
   var str =  "tr: ";
 
   if (this.header_cell_count && this.data_cell_count) {
     if (this.header_cell_count === 1) str += " 1 header cell and ";
     else str += this.header_cell_count + " header cells and ";
 
     if (this.data_cell_count === 1) str += " 1 data cell";
     else str += this.data_cell_count + " data cells";
   }
   else {
     if (this.header_cell_count) {
       if (this.header_cell_count === 1) str += " 1 header cell";
       else str += this.header_cell_count + " header cells";
     }
     else {
       if (this.data_cell_count) {
         if (this.data_cell_count === 1) str += " 1 data cell";
         else str += this.data_cell_count + " data cells";
       }
       else {
         str += " no table cells ";       
       }
     }  
   }

   return str;
 };


/* ---------------------------------------------------------------- */
/*                            TableCellElement                      */
/* ---------------------------------------------------------------- */

/**
 * @constructor TableCellElement
 * 
 * @memberOf OpenAjax.a11y.cache
 *
 * @desc Create a table cell element object which contains 
 *       information obout a td or th element in a table
 *          
 * @param  {DOMElement}  dom_element  - Reference to the dom element object associated with td or th element 
 * @param  {TableInfo}   table_info   - Information about the current table relationships in the DOM
 * 
 * @property  {DOMElement}  dom_element  - Reference to the dom element object associated with td or th element 
 * @property  {String}      cache_id     - String that uniquely identifies the cache element object in the cache
 *
 * @property  {Array}            child_cache_elements  - Array of table cache elements for the tree representation of the table
 * @property  {TableElement}     parent_table_element  - Reference to the table element object that contatins the td or th element
 * @property  {TableRowElement}  parent_row_element    - Reference to the table element object that contatins the td or th element
 *
 * @property  {Number}  type               - Constant indicating the type of table cache element object
 *
 * @property  {String}  text_content          - Text content of the element including descendent element content
 * @property  {String}  scope                 - Value of the scope attribute
 * @property  {String}  headers               - Value of the headers attribute
 * @property  {Array}   headers_array         - Array of id values in the headers attribute
 * @property  {String}  header_content        - Text content of calculated headers
 * @property  {Number}  header_source         - How header content was calculated    
 * @property  {Number}  number_of_header_ids  - Number of ids in the headers attribute    
 *
 * @property  {Boolean} has_spans          - Value of the rowspan attribute
 * @property  {Number}  row_span           - Value of the rowspan attribute (Note: converted to Number)
 * @property  {Number}  column_span        - Value of the colspan attribute (Note: converted to Number)
 */
 
OpenAjax.a11y.cache.TableCellElement = function (dom_element, table_info) {

  var headers_array = [];  // array of id headers
  var is_th;
   
  this.dom_element  = dom_element;
  this.cache_id     = "";
  
  this.parent_table_element = table_info.table_element;
  this.parent_row_element   = table_info.table_row_element;
  
  this.child_cache_elements = [];   
  
  var text_content = dom_element.getText();   
  this.text_content = text_content;
  if (typeof this.text_content === 'string') this.text_content_for_comparison = text_content.normalizeSpace().toLowerCase();
  else this.text_content_for_comparison = "";
    
  this.table_type = OpenAjax.a11y.TABLE.TD_ELEMENT;

  is_th = dom_element.tag_name == 'th';
  this.scope = dom_element.node.getAttribute('scope');   
  
  if (is_th) {
    this.table_type = OpenAjax.a11y.TABLE.TH_ELEMENT;
  }
  else {
    if (this.scope) {
      this.scope = this.scope.toLowerCase();
      
      if (this.scope == 'row' || this.scope == 'col') {
       this.table_type = OpenAjax.a11y.TABLE.TH_ELEMENT;     
      }
    }
  }

  if (table_info.table_row_element) {
    if (this.table_type === OpenAjax.a11y.TABLE.TD_ELEMENT) {
      table_info.table_row_element.data_cell_count++;
    }
    else{
      table_info.table_row_element.header_cell_count++;    
    }
  }  

  this.headers = dom_element.node.getAttribute('headers');

  if (this.headers && this.headers.length > 0) {
    this.headers_array = this.headers.split(" ");
    
    this.number_of_header_ids = this.headers_array.length;    
  }
   
  this.row_span   = dom_element.node.getAttribute('rowspan');
   
  if (typeof this.row_span === 'string') { 
    this.has_spans = true;
    this.row_span   = parseInt(this.row_span,10);
  } 
  else {
    this.row_span   = 1;
  }
  
  this.column_span   = dom_element.node.getAttribute('colspan');    
   
  if (typeof this.column_span === 'string') { 
    this.has_spans = true;
    this.column_span   = parseInt(this.column_span,10);
  } else {
    this.column_span   = 1;
  }
  
}; 


/**
 * @method addChild
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 * 
 * @desc Adds a cache table element to the tree representation of the table in the cache
 *
 * @param  {TableElement | CaptionElement | THeadElement | TBodyElement | TableRowElement | TableCellElement }  table_element  - Cache table element object to add to root of tree of table elements 
 */

OpenAjax.a11y.cache.TableCellElement.prototype.addChild = function (table_element) {

 if (table_element) {
  this.child_cache_elements.push(table_element); 
 }  

}; 

/**
 * @method getNodeResults
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of node results in severity order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getNodeResults = function () {
  return this.dom_element.getNodeResults();
};

/**
 * @method getStyle
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of style items 
 *
 * @return {Array} Returns a array of style items
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getStyle = function () {

  return this.dom_element.getStyle();
  
};


/**
 * @method getAttributes
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of attributes for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of node results
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getAttributes = function (unsorted) {

  var cache_nls = OpenAjax.a11y.cache_nls;
  var attributes = this.dom_element.getAttributes();
  
  cache_nls.addPropertyIfDefined(attributes, this, 'tag_name');
  cache_nls.addPropertyIfDefined(attributes, this, 'row_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'column_span');
  cache_nls.addPropertyIfDefined(attributes, this, 'headers');
  cache_nls.addPropertyIfDefined(attributes, this, 'scope');
  
  if (!unsorted) this.dom_element.sortItems(attributes);
  
  return attributes;
};

/**
 * @method getCacheProperties
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of cache properties sorted by property name 
 *
 * @return {Array} Returns a array of cache properties
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getCacheProperties = function () {

  var cache_nls = OpenAjax.a11y.cache_nls;
  
  var properties = this.dom_element.getCacheProperties();
  
  cache_nls.addPropertyIfDefined(properties, this, 'table_type');
  cache_nls.addPropertyIfDefined(properties, this, 'header_content');
  cache_nls.addPropertyIfDefined(properties, this, 'header_source');
  cache_nls.addPropertyIfDefined(properties, this, 'text_content');
  
  this.dom_element.sortItems(properties);
  
  return properties;
};

/**
 * @method getCachePropertyValue
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns the value of a property 
 *
 * @param {String}  property  - The property to retreive the value
 *
 * @return {String | Number} Returns the value of the property
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getCachePropertyValue = function (property) {

  if (typeof this[property] == 'undefined') {
    return this.dom_element.getCachePropertyValue(property);
  }
  
  return this[property];
};


/**
 * @method getEvents
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Returns an array of events for the element, sorted in alphabetical order 
 *
 * @return {Array} Returns a array of event information
 */

OpenAjax.a11y.cache.TableCellElement.prototype.getEvents = function (unsorted) {
   
  return this.dom_element.getEvents();
  
};

/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.cache.TableCellElement
 *
 * @desc Creates a text string representation of the table cell element object 
 *
 * @return {String} Returns a text string representation of the table cell element object
 */
OpenAjax.a11y.cache.TableCellElement.prototype.toString = function () {
  var text = this.dom_element.getText();
  var tag_name = this.dom_element.tag_name;
  
  if (this.parent_table_element.is_data_table) {

    if (text.length) {
      return tag_name + ": " + text;
    }
    else {
      return tag_name + ": empty cell";
    }
  }
  else {
    var str = tag_name + "(for layout) contains: ";
    
    var count = this.dom_element.getElementCount();
    
    if (count === 1) str += "1 element and ";
    else str += count + " elements and ";    
    
    count = text.length;
    
    if (count === 1) str += "1 character";
    else str += count + " characters";    

    return str;    
  }
};

