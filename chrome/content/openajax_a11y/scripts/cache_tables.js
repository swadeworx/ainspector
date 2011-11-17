/**
 * Copyright 2011 OpenAjax Alliance
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
/*                            TablesCache                            */
/* ---------------------------------------------------------------- */

/** 
 * TablesCache
 *
 * @constructor
 *
 * @desc Create a TablesCache object to hold TableElement objects
 *
 * @return  TablesCache object | null
 */
 OpenAjax.a11y.cache.TablesCache = function (dom_cache) {

   this.dom_cache = dom_cache;
   this.table_elements = [];  
   this.child_tables = [];    
   this.cells = [];
   this.sort_property = 'document_order';
   this.ascending = true;
   this.up_to_date = false;
   this.length = 0;
   this.cells_total = 0;
 
   return this;
  
 };

/**
 * TableInfo
 *
 * @desc TableInfo is the constructor for information related to tables
 *    in building the table cache
 *
 * @constructs
 *
 * @return  TableInfo object 
 */
 OpenAjax.a11y.cache.TableInfo = function (table_info) {

   if (table_info) {
     this.table_element      = table_info.table_element;
     this.table_cell_element = table_info.table_cell_element;
   }
   else {
     this.table_element    = null;
     this.table_cell_element  = null;
   }
   
   return this;
 }; 
 
/**
 * addTableElement
 *
 * @desc Adds a TableElement object to TableCache 
 *
 * @param table_element Object TableElement object to add to the cache
 *
 * @return length Integer length is the number of table elements in the cache
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
 * getTableElementByCacheId
 *
 * @desc Traverses the cache to find the table element with the cache id
 *
 * @param cache_id  String cache id of table element
 *
 * @return TableElement | null
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.getTableElementByCacheId = function (cache_id) {

   var i;
   var table_elements_len = this.table_elements.length;

   for (i=0; i<table_elements_len; i++) {
     
     if (this.table_elements[i].cache_id == cache_id) {
       return this.table_elements[i];
     }
   }

   return null;
 };

/** 
 * addChildTable
 * 
 * @desc add a child table element reference to a table element 
 *
 * @constructs
 *
 * @param  child_table    Object table element object is the child 
 *
 * @return  nothing
 */
 OpenAjax.a11y.cache.TablesCache.prototype.addChildTable = function (child_table) {

   if (child_table) {
     this.child_tables.push(child_table); 
   }  
 }; 

/**
 * emptyList
 *
 * @desc Empties the list of TableElement objects 
 *
 * @return none
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.emptyList = function () {

   this.table_elements.length = 0;
   this.child_tables.length = 0;
   this.cells.length = 0;
   this.sort_property = 'document_order';
   this.up_to_date = false;

 };

/** 
 * updateCacheItems
 *
 * @desc Updates the TablesCache object by checking to see if a DOMElement
 *    TableElement and TableCellElement object should be added to this cache
 *  
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param table_info     Object contains the informaiton related to the current TableElement object that contains the DOMElement (can be null)
                         and current TableCellElement object that contains the DOMElement (can be null)
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.updateCacheItems = function (dom_element, table_info) {

   var ti = new OpenAjax.a11y.cache.TableInfo(table_info);

   switch (dom_element.tag_name) {

     case 'table':
       var table_element = new OpenAjax.a11y.cache.TableElement(this.dom_cache, dom_element, table_info);
       this.addTableElement(table_element); 
  
       if (table_info.table_element) {
         table_info.table_element.addChildTable(table_element);   
       }
       else {
         this.addChildTable(table_element);
       }
       ti.table_element = table_element;    
       break;

     case 'td':
     case 'th':
       var table_cell_element = new OpenAjax.a11y.cache.TableCellElement(dom_element, table_info);
       table_info.table_element.addTableCellElement(table_cell_element);
       this.cells_total = this.cells_total + 1;
       ti.table_cell_element = table_cell_element;
       break;

     case 'tr':
       if (table_info.table_element) { 
         table_info.table_element.nextRow();
       } // endif 
       break;

     case 'tbody':
       if (table_info.table_element) { 
         table_info.table_element.hasTBody();
       } // endif
       break;

     case 'thead':
       if (table_info.table_element) { 
         table_info.table_element.hasTHead();
       } // endif 
       break;

     case 'caption':
       if (table_info.table_element) { 
         table_info.table_element.addCaption(dom_element);
       } // endif
       break;

     default:
     break;

   } // end switch

   return ti;
 };

/**
 * transverseDOMElementsForTableElements
 *
 * @desc Traverses the DOMElements to update table elements
 *
 * @param dom_element    Object DOMElement object to check fo inclusion in images cache
 * @param table_info     Object Information needed for defining the parent/child relationships of nested tables
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.transverseDOMElementsForTableElements = function (dom_element, table_info) {

   var i;
   var ti;

   if (!dom_element) return;

     if (dom_element.type == NODE_TYPE.ELEMENT) {

       ti = this.updateCacheItems(dom_element, table_info);
  
       for (i=0; i<dom_element.children.length; i++ ) {
         this.transverseDOMElementsForTableElements(dom_element.children[i], ti);
       } // end loop
     }  
 }; 

/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 *
 */
 OpenAjax.a11y.cache.TablesCache.prototype.updateCache = function () {
   
   var i;
   var children = this.dom_cache.element_cache.children;
   var children_len = children.length;

   var table_info = new OpenAjax.a11y.cache.TableInfo(null);

   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating table elements cache.");
 
   for (i=0; i < children_len; i++) {
     this.transverseDOMElementsForTableElements(children[i], table_info);
   }  
   this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed table elements cache update, number of table items is " + this.length + " and the number of cells is " + this.cell_total);
   this.up_to_date = true;
 };

/**
 * TableElement
 *
 * @desc TableElement is the object used to hold data about a table and inherits the DOMObject base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 * @param  table_cell_element  Object  table_cell_element object provides information about the table 
 *                     cell the table may be a child of in the dom 
 *
 * @return  TableElement | null
 */
 OpenAjax.a11y.cache.TableElement = function (dom_cache, dom_element, table_info) {

   if( !dom_element ) {
     return null;  
   } 

   this.cell_ids = [];
   this.dom_cache = dom_cache;
   this.dom_element = dom_element;
   
   // Useful for testing nesting
   this.parent_table_element   = table_info.table_element;   
   this.parent_table_cell_element = table_info.table_cell_element;   
 
   this.child_tables = [];

   this.summary = this.dom_element.node.getAttribute("summary");
  
   if (this.summary) this.summary_for_comparison = this.summary.trim().toLowerCase();
 
   this.caption = "";
   
   this.max_row = 0; 
   this.max_column = 0;
   
   this.cell_count = 0;
   this.row     = -1;   
   this.column   = 0;  
   this.cells    = [];
   this.cells[0]  = [];
   this.cells[0][0] = null;
 
   this.has_thead  = false;   
   this.has_tbody  = false;
   this.has_th   = false;
   this.has_scope  = false;
   this.has_headers = false;
   this.has_spans  = false;
   this.is_data_table = false;
   this.is_complex_data_table = false;
 
   return this;
 };

/**
 * getTableCellElementByCacheId 
 *
 * @desc retrieve TableCellElement from TablesCache based on its cache_id
 *
 * @param cache_id String assigned by the Cache system 
 *
 * @return TableCellElement | null 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.getTableCellElementByCacheId = function (cache_id) {
 
   var r, c;
   var cell;
   var row_len;
   var rows_len = this.row;

   for (r=0; r<=rows_len; r++) {
     row_len = this.cells[r].length;
     
     for(c=0; c<row_len; c++) {
       cell = this.cells[r][c];
       
       if (cell && cell.cache_id == cache_id) {
         return cell; 
       }
     } 
   }
   return null;
 };

/**
 * addChildTable
 * 
 * @desc add a child table element reference to a table element 
 *
 * @constructs
 *
 * @param  child_table    Object table element object is the child 
 *
 * @return  nothing
 */
 OpenAjax.a11y.cache.TableElement.prototype.addChildTable = function (child_table) {

   if (child_table) {
     this.child_tables.push(child_table); 
   }  
 }; 

/**
 * toString
 *
 * @desc Returns a text string representation of the table 
 *
 * @return String represening the TableElement
 *
 */
 OpenAjax.a11y.cache.TableElement.prototype.toString = function () {
   return "table " + this.document_order; 
 };

/**
 * addCaption
 *
 * @desc Adds caption information to the TableElement object
 *
 * @param dom_element DOMElement object containing the caption element 
 * 
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addCaption = function (dom_element) {
   
   var caption;
  
   if (dom_element) {
     caption = OpenAjax.a11y.cache.util.getNameFromChildren(dom_element);
     this.caption        = caption;  
     this.caption_for_comparison = caption.trim().toLowerCase();
     this.is_data_table = true;
   } 
 };

/**
 * hasTHead
 *
 * @desc Sets a flag in TableElement that a THEAD element is present in the table
 *    Usefule for identifying tables used for tabulr data
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.hasTHead = function () {

   this.has_thead = true;
   this.is_data_table = true;
 };

/**
 * hasTBody
 *
 * @desc Sets a flag in TableElement that a TBODY element is present in the table
 *    Useful for identifying tables used for tabular data
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.hasTBody = function () {

   this.has_tbody = true;
 };

/**
 * nextRow
 *
 * @desc Updates the current table cell array to start a new row
 *
 * @return none 
 * 
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
 * multipleTHInRow
 * 
 * @desc
 * 
 * @param
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
	
	 if (cell && cell.is_header) {
	   th_count++;
	 }
	 else {
	   td_count++;
	 }
   }   
   
   if (th_count > 1 && td_count > 0) this.is_complex_data_table = true;
   
 };

/**
 * multipleTHInColumn
 * 
 * @desc
 * 
 * @param
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
	
  	   if (cell && cell.is_header) {
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
 * addTableCellElement
 *
 * @desc Adds a TableCellElement to the current row
 *
 * @param table_cell_element is a cell to add in to the current row of a table 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.addTableCellElement = function (table_cell_element) {

   var i;
   var j;
   var r;
   var c;
// var number_of_th;
// var row_of_cells;
   
   this.column = 0; 
  
   if (table_cell_element.id) {
     this.cell_ids.push(table_cell_element.id);
   }

   // if table cell is already in array (due to row or column spanning) move to next spot available 
   while ((this.cells[this.row][this.column] !== undefined) &&
    (this.cells[this.row][this.column] !== null) ) {
     this.column++;
   } // end loop

   r = this.row;
   c = this.column;
   //OpenAjax.a11y.console("row in the addTableCellElement..." + r);
   
  
   table_cell_element.cache_id = this.cache_id + "_cell_r" + this.row + "_c" + this.column;

   for (i=0; i<table_cell_element.row_span; i++) {
     
     for (j=0; j<table_cell_element.col_span; j++) {
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
   this.getTableCellHeader(this.row, this.column, table_cell_element);

   if (c>this.max_column) this.max_column = c; 
 }; 

/**
 * sortCellIds
 * 
 * @desc 
 *
 * @return none 
 * 
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
 * getTableCellHeader
 *
 * @desc 
 *
 * @param row
 * @param column
 * @table_cell_element
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.getTableCellHeader = function (row, column, table_cell_element) {

   var tag_name;   
   var scope;
   var string_array = [];
   var cell, r, c;

   tag_name = table_cell_element.dom_element.tag_name;
   scope  = table_cell_element.dom_element.scope;
 
   if (table_cell_element.headers) {
     table_cell_element.header_content = this.dom_cache.element_with_id_cache.getTextFromIds(table_cell_element.headers);
   }
   else {
     // if a table cell is used as a header in the table and has no header attribute set its header to an empty string
     if (table_cell_element.is_header) {
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
             string_array.push(cell.cell_content);
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
             string_array.push(cell.cell_content);
           }
         } 
       } 
       table_cell_element.header_content = string_array.join(' ');
     } 
   } 
 };

/**
 *
 * findFirstRowWithContent 
 *
 * @desc findFirstRowWithContent retrieves the first row in a table which has the content
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstRowWithContent = function() {
 
   var row;
   var row_len = this.row;
   var column;
   var column_len;
   var text;
   var cell;
 
   for (row=0; row<row_len; row++) {
     column_len = this.cells[row].length;
 
     for (column=0; column<column_len; column++) {
       cell = this.cells[row][column];
       text = cell.dom_element.getText();
    
       if (text) text = text.trim();
       
       if (cell.is_header || text.length) {
         return row;
       }
     }
   }
   return null;
 };

/**
 * findFirstColumnWithContent
 *
 * @desc findFirstColumnWithContent retrieves the first column in a table which has the content
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.findFirstColumnWithContent = function() {
 
   var column;
   var column_len = this.column;
   var row;
   var row_len;
   var text;
   var cell;
 
   for (column=0; column<column_len; column++) {
 
     row_len = this.cells[column].length;
 
     for (row=0; row<row_len; row++) {
       cell = this.cells[column][row];
       text = cell.dom_element.getText();
       
       if (text) text = text.trim();
       
       if (cell.is_header || text.length) {
         return column;
       }
     }
   }
   return null;
 };


/**
 * headerCellsInFirstRow
 *
 * @desc 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstRow = function () {

   var r = {};
   r.count = 0;
   r.total = 0;
   r.th_count = 0;

   var column;
   var cell;
   var text;
 
   var row = this.findFirstRowWithContent();
   
   if (this.cells[row]) {
     var column_len = this.cells[row].length;
 
     for (column=0; column<column_len;) {
       cell = this.cells[row][column];
     
       if (cell.is_header) {
         r.count++;
         r.total++;   
       
         if (cell.is_th) r.th_count++;   
       }
       else {
         text = cell.dom_element.getText();
   
         if (text) text = text.trim();
   
         if (text.length) {
           r.total++;
         } 
       }
       column += cell.col_span;
     }
   }  
   return r;
 };

/** 
 * headerCellsInFirstColumn
 *
 * @desc 
 *
 * @return none 
 * 
 */
 OpenAjax.a11y.cache.TableElement.prototype.headerCellsInFirstColumn = function () {

   var c = {};
   c.count = 0;
   c.total = 0;
   c.th_count = 0;
 
   var row;
   var cell;
   var text;
 
   var column = this.findFirstRowWithContent();
   
   if (!this.cells || !this.cells[column]) return c; 
   
   var row_len = this.cells[column].length;
 
   for (row=0; row<row_len;) {
     cell = this.cells[column][row];
     
     if (cell.is_header) {
       c.count++;
       c.total++;
       
       if (cell.is_th) c.th_count++;   
     }
     else {
       text = cell.dom_element.getText();
       
       if (text) text = text.trim();
   
       if (text.length) {
         c.total++;
       } 
     }
     row += cell.row_span;
   }
   return c;
 };

/**
 * TableCellElement
 *
 * @desc Constructor for TableCellElement object which contains 
 *    informatin a table cell
 *
 * @param  dom_elements Object Array of DOM elements that have IDs
 * @param  table_info  Object table information object 
 *
 * @return TableCellElement | null 
 *
 */
 OpenAjax.a11y.cache.TableCellElement = function (dom_element, table_info) {

   var headers_array = [];
   
   if (!table_info.table_element || !dom_element) return null;

   this.dom_element = dom_element;
   this.table_element = table_info.table_element;
  
   this.is_th = dom_element.tag_name == 'th';
   this.scope = dom_element.node.getAttribute('scope');   

   if (this.is_th || this.scope) {
     this.is_header = true;
     this.header_content = "";
     table_info.table_element.is_data_table = true;
     table_info.table_element.has_th = true;
     
     if (this.scope) this.scope = this.scope.toLowerCase();
   }
   else {
     this.is_header = false;
   }

   if (table_info.table_element.is_data_table) {
     this.cell_content = dom_element.getText().trim();
   } 
   this.headers = dom_element.node.getAttribute('headers');
      
   if (this.headers && this.headers.length > 0) {
     this.headers_array = this.headers.split(" ");
   
     // check to see if <th> has an attribute headers with a value
     if (this.headers_array && this.headers_array.length > 0) table_info.table_element.is_complex_data_table = true;
   }
   
   this.row_span   = dom_element.node.getAttribute('rowspan');
   
   if (this.row_span) { 
     this.row_span   = parseInt(this.row_span,10);
     
     if (this.row_span > 1) table_info.table_element.is_complex_data_table = true;
   } else {
     this.row_span   = 1;
   }
   this.col_span   = dom_element.node.getAttribute('colspan');    
   
   if (this.col_span) { 
     this.col_span   = parseInt(this.col_span,10);
     
     if (this.col_span > 1) table_info.table_element.is_complex_data_table = true;
   } else {
     this.col_span   = 1;
   }
 
   return this;
 }; 

/**
 * toString
 *
 * @desc Define TableCellElement toString function 
 *
 */
 OpenAjax.a11y.cache.TableCellElement.prototype.toString = function () {
   return "Table cell: " + this.cache_id;
 };

