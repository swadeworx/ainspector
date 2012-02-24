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

/* -------------------------------------------------------------------------------------- */
/* OpenAjax Alliance Cache Properties and Values National Language Support (NLS): English */
/* -------------------------------------------------------------------------------------- */
   

OpenAjax.a11y.cache_nls.addCacheNLSFromJSON('en-us', {

    /*
     * Boolean values 
     */
    boolean_values : {
     true_value  : 'Yes',
     false_value : 'No'
    }, 
    
    /*
     * Relative implementation priorities of complying to rule requirements
     */
    priorities: ['Undefined', 'First Priority', 'Second Priority', 'Third Priority'],

    /*
     * Types of rule references to a requirement
     */
    references: ['Unknown', 'Requirement', 'Coding Technique', 'Manual Evaluation', 'Best Practice', 'Authoring Technique', 'Other'],

    /*
     * Abbreviation for the types of rule references to a requirement
     */
    reference_abbreviations: ['U', 'R', 'C', 'ME', 'BP', 'A', 'O'],

    /*
     * Media constant values
     */
    reference_media_contants: ['Undefined', 'No', 'Maybe', 'Yes'],
    
    missing_label : {
      label : "no label",
      style : "missing_label"
    },
    
    empty_alt_text : {
      label : "empty alt",
      style : "empty_alt"
    },
    
    /**
     * Severity of not passing a rule for a particular requirement set, like WCAG 2.0
     */
    severities: [{ label       : 'Not Applicable', 
                   abbrev      : 'N/A', 
                   description : 'The rule is not applicable to an element',
                   tooltip     : 'The number of elements to which the rule did not apply'
                  },
                 { label       : 'Pass', 
                   abbrev      : 'P', 
                   description : 'The element passed the rule',
                   tooltip     : 'The number of elements that passed the rule'
                  },
                 { label       : 'Violation', 
                   abbrev      : 'V', 
                   description : 'The element failed the rule and the rule is required',
                   tooltip     : 'The number of elements that failed'
                  },
                 { label       : 'Recommendation', 
                   abbrev      : 'R', 
                   description : 'The element failed the rule and the rule is recommended',
                   tooltip     : 'The number of elements that failed recommended rules'
                  },
                 { label       : 'Manual Check', 
                   abbrev      : 'MC', 
                   description : 'The element requires human inspection and judgement to determine if the requirement has been met',
                   tooltip     : 'The number of elements that require manual checks for determining if requirements were met'
                  },
                 { label       : 'Warning', 
                   abbrev      : 'W', 
                   description : 'A warning indicates the element is used in a coding pattern that may cause accessibiity problems',
                   tooltip     : 'The number of elements in a coding pattern that may cause accessibility problems'
                  },
                 { label       : 'Hidden', 
                   abbrev      : 'H', 
                   description : 'A hidden element was not evaluted for accessibility, since it is invisible to users',
                   tooltip     : 'The number of elements that are hidden from users on the page and therefore not evaluated for accessibility'
                  },
                 { label       : 'Informational', 
                   abbrev      : 'I', 
                   description : 'Element has an informational message useful for accessibility',
                   tooltip     : 'The number of elements with informational messages useful for accessibility'
                  },
                 { label       : 'Not Evaluated', 
                   abbrev      : 'na', 
                   description : 'Element did not meet the criteria of a rule for evaluation',
                   tooltip     : 'Number of elements that did not meet the criteria of rules for evaluation'
                  },
                 { label       : 'none', 
                   abbrev      : 'none', 
                   description : 'No rules applied to this element',
                   tooltip     : 'No rules applied to this element'
                  }
                ],  


    /*
     * Status of a rule for evaluating a requirement
     */
    status: ['Undefined', 'Proposed', 'Accepted', 'Deprecated'],

    cache_properties : {

    /*
     * DOMElement object properties
     */

      'document_order'        : {
        label       : 'Order',
        description :  'The ordinal position of the item in the list',
        style       : 'doc_order'
      },
      'tag_name'              : {
        label       : 'Tag Name',
        description : 'Tag (or element) name of the item',
        style       : 'element'
      },
      'id'                    : { 
        label       : 'id',
        description :  'Value of the id attribute'
      },
      'id_unique'             : { 
        label       : 'ID unique',
        description :  'Information about the id attribute value',
        values      : ['Undefined value', 'Not defined', 'Unique', 'Not unique'], 
        style       : ['','','','warning']
      },  
      'character_count'       : { 
        label       : 'Text Count',
        description :  'Number of characters in the text content of this tag'
      },
      'class_name'  : { 
        label       : 'class',
        description :  'Value of the HTML class attribute'
      },
      'role'        : { 
        label       : 'role',
        description :  'Can be used to redefine the role of an element into a landmark or widget'
      },
      'alt'         : { 
        label       : 'alt',
        description :  'Value of the HTML alt attribute'
      },
      'alt_for_comparison' : { 
        label       : 'Normlized Alt',
        description : 'Normalized version of the alt text content used for comparison'
      },
      'has_alt_attribute' : { 
        label       : 'Alt Defined',
        description : 'True if the alt attribute was defined in markup'
      },
      'title'       : { 
        label       : 'title',
        description : 'Value of the HTML title attribute'
      },
      'aria_describedby' : { 
        label       : 'aria-describedby',
        description : 'aria-describedby can be used to provide additional information about an element to AT users'
      },
      'aria_hidden' : { 
        label       : 'aria-hidden',
        description :  'aria-hidden can be used to hide information from assistive technologies that is visible graphically'
      },
      'aria_label'  : { 
        label       : 'aria-label',
        description :  'aria-label can be used to label form controls and widgets'
      },
      'aria_labelledby' : { 
        label       : 'aria-labelledby',
        description :  'aria-labelledby can be used to label form controls and widgets'
      },
      'xpath'       : { 
        label       : 'XPath',
        description : 'XPath information used for identifying the location of the element in the DOM'
      },
      'has_aria_describedby' : { 
        label       : 'Description',
        description : 'Description defined using the aria-describedby attribute'
      },
      'calculated_aria_description' : { 
        label       : 'Calculated Description',
        description : 'Calculated text content of a description defined using the aria-describedby attribute'
      },
      'for_id'  : { 
        label       : 'for',
        description : 'Value of the for attribute of a label element'
      },

    /*
     * Calculated values based on CSS properties
     */

      'graphical' : {
        label       : 'Graphical Visibility',
        description : 'Can the item be seen visually',
        values      : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      },
      'at' : { 
        label       : 'AT Visibility',
        description : 'Can the item be seen be assitive technologies',
        values : ['Undefined value', 'Unknown', 'Hidden', 'Visible']
      }, 
      'is_large_font' : { 
        label       : 'Large Font',
        description : 'Boolean value used in WCAG 2.0 evaluation of color contrast ratio'
      }, 


    /*
     * Run time CSS style properties
     */

      'display'              : {
        label       : 'display',
        description :  'The value of the CSS display property'
      }, 
      'visibility'           : {
        label       : 'visibility',
        description :  'The value of the CSS visibility property'
      },        
      'color'                : {
        label       : 'color',
        description :  'The value of the CSS color property'
      },               
      'background_color' : {
        label       : 'background-color',
        description :  'The value of the CSS background-color property'
      },
      'background_image' : {
        label       : 'background-image',
        description :  'The value of the CSS background-image property'
      },
      'font_family'          : {
        label       : 'font-family',
        description :  'The value of the CSS font-family property'
      },
      'font_size'            : {
        label       : 'font-size',
        description :  'The value of the CSS font-size property'
      },
      'font_weight'          : {
        label       : 'font-weight',
        description :  'The value of the CSS font-weight property'
      },
      'position'             : {
        label       : 'position',
        description :  'The value of the CSS position property'
      },
      'left'                 :  {
        label       : 'left',
        description :  'The value of the CSS left property'
      },
      'top'                  : {
        label       : 'top',
        description :  'The value of the CSS top property'
      },

    /*
     * Abbreviation Cache object properties
     */
      'abbreviation_text' : {
        label       : 'Abbreviation',
        description :  'The text content of an ABBR or ACROYMN element'
      },

    /*
     * Image Cache object attributes
     */
      'source' : {
        label       : 'src',
        description : 'Value of the src attribute'
      },


    /*
     * Media Cache object properties
     */

      'is_video'  : {
        label       : 'Video',
        description :  'Does the media object contain video',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
        
      },

      'is_audio'  : {
        label       : 'Audio',
        description :  'Does the media object contain audio',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },

      'has_caption'  : {
        label       : 'Caption',
        description :  'Does the media object have captions',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },

      'has_text_alternative' : {
        label       : 'Text Equivalent',
        description :  'Does the media object have a text equivalent',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },
      
      'has_audio_description' : {
        label       : 'Audio Equivalent',
        description :  'Does the media object have a audio equivalent',
        values      :  ['undefined', 'No', ' ? ', 'Yes']
      },
      
    /*
     * Name Cache object properties
     */

      'name'  : {
        label       : 'Name',
        description : 'Text content of the element'
      },
      'name_for_comparison' : {
        label       : 'Normalized name',
        description : 'Text content of the element normalized for use in comparisons'
      },
      'name_from_text_nodes' : {
        label       : 'Name from text',
        description : 'Text content of the element that comes from text dom nodes'
      },
      'name_from_image_alt' : {
        label       : 'Name from alt',
        description : 'Text content of the element that comes from alt text of images'
      },
      'image_count' : {
        label       : 'Image count',
        description : 'Number of images contained in the element'
      },
      'text_only_from_image' : {
        label       : 'Image only',
        description : 'Does the text content only come from images'
      },

    /*
     * List Cache object properties
     */

      'list_type'  : {
        label       : 'List Type',
        values      : ['Undefined', 'Container element', 'Item element', 'Landmark element'],        
        description : 'Type of list cache element'
      },
      
    /*
     * Table Cache object properties
     */

      'row'                      : {
        label       : 'Row',
        description :  'The row of the cell in a table'
      },
      'column'                   : {
        label       : 'Column',
        description :  'The column of the cell in a table'
      },
      'max_row'                      : {
        label       : 'Rows',
        description :  'Number of rows in a table'
      },
      'max_column'                   : {
        label       : 'Columns',
        description :  'Number of columns in a table'
      },
      'number_of_header_ids' : {
        label       : 'Header ID Num',
        description :  'Number of ids in a headers attribute'
      },              
      'text_content'             : {
        label       : 'Text',
        description :  'Text content of a table cell'
      },              
      'effective_caption'        : {
        label       : 'Effective Caption',
        description :  'Effective caption is the text content of a caption element or ARIA labeling'
      },
      'effective_summary'        : {
        label       : 'Effective Summary',
        description :  'Effective summary is the text content of a summary attribute or an aria-describedby attribute'
      },
      'is_data_table'            : {
        label       : 'Data Table',
        description :  'True if a table has been identified as a data table, otherwise false'
      },
      'is_complex_data_table'            : {
        label       : 'Complex Data Table',
        description :  'True if a table has been identified as a complex data table, otherwise false'
      },
      'first_row_th_count'       : {
        label       : 'Header Count',
        description :  'The number of header cells in the first row or column of a data table'
      },
      'first_row_cell_count' : {
        label       : 'Cell Count',
        description :  'The number of none empty cells in the first row or column of a data table'
      },     
      'scope'               : {
        label       : 'scope',
        description :  'The value of the scope attribute of a table cell'
      },
      'headers'             : {
        label       : 'headers',
        description :  'The value of the headers attribute of a table cell'
      },
      'row_span'            : {
        label       : 'rowspan',
        description :  'The value of the rowspan attribute of a table cell'
      },
      'column_span'         : {
        label       : 'colspan',
        description :  'The value of the colspan attribute of a table cell'
      },
      'nesting_level'         : {
        label       : 'Nesting',
        description :  'The level of nesting of a layout table in other tables that are wider than 1 column and are not data tables'
      },
      'table_type'  : {
        label       : 'Table Type',
        values      : ["Undefined", "Table","Caption","Table Head","Table Body", "Row", "Header Cell", "Data Cell"],        
        description : 'Effective type of table header'
      }
      
    }
  }
);
