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
/*              ARIA Defintions and Validation Methods              */
/* ---------------------------------------------------------------- */


if (typeof OpenAjax.a11y.aria == "undefined") {
	OpenAjax.a11y.aria = {
			
		/*
		 * array of WAI-ARIA global states and properties
		 * @see http://www.w3.org/TR/wai-aria/#global_states
		 */
		globalProperties : [
            "aria-atomic", 
            "aria-busy", 
            "aria-controls", 
            "aria-describedby",
            "aria-disabled", 
            "aria-dropeffect", 
            "aria-flowto", 
            "aria-grabbed",
            "aria-haspopup", 
            "aria-hidden", 
            "aria-invalid", 
            "aria-label",
            "aria-labelledby", 
            "aria-live", 
            "aria-owns", 
            "aria-relevant"
        ],
	
        /*
         * XSD data types for all WAI-ARIA properties
         * along with valid values when the data type is NMTOKEN
         */
        propertyDataTypes : {
         	"aria-activedescendant" : {
         		type : "http://www.w3.org/2001/XMLSchema#idref"
         	},
         	"aria-atomic" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-autocomplete" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["inline", "list", "both", "none"]
         	},
         	"aria-busy" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-checked" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "mixed", "undefined"]
         	},
         	"aria-controls" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-describedby" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-disabled" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-dropeffect" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtokens",
         		values : ["copy", "move", "reference", "execute", "popup", "none"]
         	},
         	"aria-expanded" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-flowto" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-grabbed" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-haspopup" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-hidden" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-invalid" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "spelling", "grammar"]
         	},
         	"aria-label" : {
         		type : "http://www.w3.org/2001/XMLSchema#string"
         	},
         	"aria-labelledby" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-level" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-live" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["off", "polite", "assertive"]
         	},
         	"aria-multiline" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-multiselectable" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-owns" : {
         		type : "http://www.w3.org/2001/XMLSchema#idrefs"
         	},
         	"aria-posinset" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-pressed" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "mixed", "undefined"]
         	},
         	"aria-readonly" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-relevant" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtokens",
         		values : ["additions", "removals", "text", "all"]
         	},
         	"aria-required" : {
         		type : "http://www.w3.org/2001/XMLSchema#boolean"
         	},
         	"aria-selected" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["true", "false", "undefined"]
         	},
         	"aria-setsize" : {
         		type : "http://www.w3.org/2001/XMLSchema#int"
         	},
         	"aria-sort" : {
         		type : "http://www.w3.org/2001/XMLSchema#nmtoken",
         		values : ["ascending", "descending", "other", "none"]
         	},
         	"aria-valuemax" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuemin" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuenow" : {
         		type : "http://www.w3.org/2001/XMLSchema#decimal"
         	},
         	"aria-valuetext" : {
         		type : "http://www.w3.org/2001/XMLSchema#string"
         	}
        },
        
        /*
         * list of abstract roles - used to support the WAI-ARIA role taxonomy and 
         * not to be used by content authors
         * @see http://www.w3.org/TR/wai-aria/roles#isAbstract
         */
        abstractRoles : [
            "command", 
            "composite", 
            "input", 
            "landmark", 
            "range",
            "roletype", 
            "section", 
            "sectionhead", 
            "select",
            "structure", 
            "widget", 
            "window"
        ],
                         
          /*
           * design patterns for concrete WAI-ARIA roles
           * legitimate keys for each role include:
           * 
           * - container: appropriate container(s) for that role
           * - props: states and properties that may be associated with this role (in addition to the global states and properties listed above)
           * - reqProps: required states or properties for this role
           * - reqChildren: required children for this role
           * - htmlEquiv: HTML equivalent for this role
           * - roleType: one of widget, landmark, or null 
           */
        designPatterns : {
         		
         	"alert" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		nameFromContent: false,
         		roleType : "live"     		
         	},
         	                
         	"alertdialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"application" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"article" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
          		nameFromContent: false,
         		roleType : "section"
        	},
         	
         	"banner" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"button" : {
         		container : null,
         		props : ["aria-expanded", "aria-pressed"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='button']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"checkbox" : {
         		container : null,
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='checkbox']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
             "columnheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-readonly", "aria-selected", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"combobox" : {
         		container : null,
         		props : ["aria-autocomplete", "aria-required", "aria-activedescendant"],
         		reqProps : ["aria-expanded"],
         		reqChildren : ["listbox", "textbox"],
         		htmlEquiv : "select",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"complementry" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"contentinfo" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"definition" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "region"
         	},
         	
         	"dialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"directory" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "list"
         	},
         	
         	"document" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
          		nameFromContent: false,
         		roleType : "structure"
        	},
         	
         	"form" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "form",
         		nameFromContent: false,
         		roleType : "landmark"
         	},	
         	
         	"grid" : {
         		container : null,
         		props : ["aria-level", "aria-multiselectable", "aria-readonly", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["row", "rowgroup"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"gridcell" : {
         		container : ["row"],
         		props : ["aria-readonly", "aria-selected", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"         		
         	},
         	
         	"group" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "fieldset",
         		nameFromContent: false,
         		roleType : "section"         		
         	},
         	
         	"heading" : {
         		container : null,
         		props : ["aria-level", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "h1 | h2 | h3 | h4 | h5 |h6",
         		nameFromContent: false,
         		roleType : "sectionhead"         		
         	},
         	
         	"img" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "img",
         		nameFromContent: false,
         		roleType : "section"         		
         	},
         	
         	"link" : {
         		container : null,
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "a",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"list" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : ["group", "listitem"],
         		htmlEquiv : "ul | ol",
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"listbox" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant", "aria-multiselectable", "aria-required"],
         		reqProps : null,
         		reqChildren : ["option"],
         		htmlEquiv : "select",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"listitem" : {
         		container : ["list"],
         		props : ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		nameFromContent: true,
         		htmlEquiv : "section"
         	},
         	
         	"log" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"main" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"marquee" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"math" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menu" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["menuitem", "menuitemcheckbox", "menuitemradio"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menubar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"menuitem" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"menuitemcheckbox" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"menuitemradio" : {
         		container : ["menu", "menubar"],
         		props : ["aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"navigation" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"note" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"option" : {
         		container : ["listbox"],
         		props : ["aria-expanded", "aria-checked", "aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"presentation" : {
         		container : null,
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "section"
         	},
         	
         	"progressbar" : {
         		container : null,
         		props : ["aria-valuetext", "aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"radio" : {
         		container : null,
         		props : ["aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='radio']",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"radiogroup" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : ["radio"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"region" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "frame",
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"row" : {
         		container : ["grid", "treegrid", "rowgroup"],
         		props : ["aria-level", "aria-selected", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["gridcell", "rowheader", "columnheader"],
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"rowgroup" : {
         		container : ["grid"],
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"rowheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-required", "aria-readonly", "aria-selected"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th",
         		nameFromContent: true,
         		roleType : "widget"
         	},
         	
         	"scrollbar" : {
         		container : null,
         		props : ["aria-valuetext"],
         		reqProps : ["aria-controls", "aria-orientation", "aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"search" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "landmark"
         	},
         	
         	"separator" : {
         		container : null,
         		props : ["aria-expanded", "aria-orientation"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "structure"
         	},
         	
         	"slider" : {
         		container : null,
         		props : ["aria-orientation", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"spinbutton" : {
         		container : null,
         		props : ["aria-required", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"status" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"tab" : {
         		container : ["tablist"],
         		props : ["aria-selected", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tablist" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-level"],
         		reqProps : null,
         		reqChildren : ["tab"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tabpanel" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"textbox" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='text'] | textarea",
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"timer" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "live"
         	},
         	
         	"toolbar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tooltip" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"tree" : {
         		container : null,
         		props : ["aria-multiselectable", "aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : ["group", "treeitem"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"treegrid" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-level", "aria-multiselectable", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : null,
         		nameFromContent: false,
         		roleType : "widget"
         	},
         	
         	"treeitem" : {
         		container : ["group", "tree"],
         		props : ["aria-checked", "aria-selected", "aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		nameFromContent: true,
         		roleType : "widget"
            }
         	
        }, // end designPatterns
        
        getRoleObject : function(role) {
        
          var dp = this.designPatterns;

          for (var r in dp) {
          
            if (role == r)  return dp[r];
          
          }
        
          return null;
        }
        
    };	    
    
}
