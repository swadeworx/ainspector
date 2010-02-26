// all references to WAI-ARIA specification are to latest public draft
// http://www.w3.org/TR/wai-aria/

if (typeof OpenAjax.a11y.aria == "undefined") {
	OpenAjax.a11y.aria = {
			
		/*
		 * array of WAI-ARIA global states and properties
		 * @see http://www.w3.org/TR/wai-aria/#global_states
		 */
		globalProperties : [
            "aria-atomic", "aria-busy", "aria-controls", "aria-describedby",
            "aria-disabled", "aria-dropeffect", "aria-flowto", "aria-grabbed",
            "aria-haspopup", "aria-hidden", "aria-invalid", "aria-label",
            "aria-labelledby", "aria-live", "aria-owns", "aria-relevant"
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
            "composite", "input", "landmark", "range",
            "roletype", "section", "sectionhead", "select",
            "structure", "widget", "window"
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
         		htmlEquiv : null
         	},
         	                
         	"alertdialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"application" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"article" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"banner" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"button" : {
         		container : null,
         		props : ["aria-pressed"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='button']",
         		roleType : "widget"
         	},
         	
         	"checkbox" : {
         		container : null,
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='checkbox']",
         		roleType : "widget"
         	},
         	
             "columnheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-readonly", "aria-selected", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th"
         	},
         	
         	"combobox" : {
         		container : null,
         		props : ["aria-required", "aria-activedescendant"],
         		reqProps : ["aria-expanded"],
         		reqChildren : ["listbox", "textbox"],
         		htmlEquiv : "select",
         		roleType : "widget"
         	},
         	
         	"complementry" : {
         		container : null,
         		props : ["aria-required"],
         		reqProps : ["aria-expanded"],
         		reqChildren : ["aria-labelledby"],
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"contentinfo" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"definition" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"dialog" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : ["listbox", "textbox"],
         		htmlEquiv : null
         	},
         	
         	"directory" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"document" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"form" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : "form",
         		roleType : "landmark"
         	},	
         	
         	"grid" : {
         		container : null,
         		props : ["aria-level", "aria-multiselectable", "aria-readonly", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["row", "rowgroup"],
         		htmlEquiv : "table"
         	},
         	
         	"gridcell" : {
         		container : ["row"],
         		props : ["aria-readonly", "aria-selected", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "td"
         	},
         	
         	"group" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "fieldset"
         	},
         	
         	"heading" : {
         		container : null,
         		props : ["aria-level", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "h1 | h2 | h3 | h4 | h5 |h6"
         	},
         	
         	"img" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "img"
         	},
         	
         	"link" : {
         		container : null,
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "a",
         		roleType : "widget"
         	},
         	
         	"list" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : ["group", "listitem"],
         		htmlEquiv : "ul | ol"
         	},
         	
         	"listbox" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant", "aria-multiselectable", "aria-required"],
         		reqProps : null,
         		reqChildren : ["option"],
         		htmlEquiv : "select"
         	},
         	
         	"listitem" : {
         		container : ["list"],
         		props : ["aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "li"
         	},
         	
         	"log" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"main" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"marquee" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"math" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"menu" : {
         		container : null,
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["menuitem", "menuitemcheckbox", "menuitemradio"],
         		htmlEquiv : null
         	},
         	
         	"menubar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"menuitem" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"menuitemcheckbox" : {
         		container : ["menu", "menubar"],
         		props : null,
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"menuitemradio" : {
         		container : ["menu", "menubar"],
         		props : ["aria-selected"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"navigation" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"note" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"option" : {
         		container : ["listbox"],
         		props : ["aria-expanded", "aria-checked", "aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"presentation" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"progressbar" : {
         		container : null,
         		props : ["aria-valuetext"],
         		reqProps : ["aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"radio" : {
         		container : null,
         		props : ["aria-selected", "aria-posinset", "aria-setsize"],
         		reqProps : ["aria-checked"],
         		reqChildren : null,
         		htmlEquiv : "input[@type='radio']",
         		roleType : "widget"
         	},
         	
         	"radiogroup" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : ["aria-labelledby"],
         		reqChildren : ["radio"],
         		htmlEquiv : null
         	},
         	
         	"region" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "frame"
         	},
         	
         	"row" : {
         		container : ["grid", "treegrid", "rowgroup"],
         		props : ["aria-level", "aria-selected", "aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["gridcell", "rowheader", "columnheader"],
         		htmlEquiv : "tr"
         	},
         	
         	"rowgroup" : {
         		container : ["grid"],
         		props : ["aria-expanded", "aria-activedescendant"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : "thead | tfoot | tbody"
         	},
         	
         	"rowheader" : {
         		container : ["row"],
         		props : ["aria-expanded", "aria-sort", "aria-required", "aria-readonly", "aria-selected"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "th"
         	},
         	
         	"scrollbar" : {
         		container : null,
         		props : ["aria-valuetext"],
         		reqProps : ["aria-controls", "aria-orientation", "aria-valuenow", "aria-valuemax", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"search" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "landmark"
         	},
         	
         	"separator" : {
         		container : null,
         		props : ["aria-expanded", "aria-orientation"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"slider" : {
         		container : null,
         		props : ["aria-orientation", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"spinbutton" : {
         		container : null,
         		props : ["aria-required", "aria-activedescendant", "aria-valuetext"],
         		reqProps : ["aria-valuemax", "aria-valuenow", "aria-valuemin"],
         		reqChildren : null,
         		htmlEquiv : null,
         		roleType : "widget"
         	},
         	
         	"status" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"tab" : {
         		container : ["tablist"],
         		props : ["aria-selected", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"tablist" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : ["tab"],
         		htmlEquiv : null
         	},
         	
         	"tabpanel" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"textbox" : {
         		container : null,
         		props : ["aria-autocomplete", "aria-multiline", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : "input[@type='text'] | textarea",
         		roleType : "widget"
         	},
         	
         	"timer" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"toolbar" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"tooltip" : {
         		container : null,
         		props : ["aria-expanded"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
         	},
         	
         	"tree" : {
         		container : ["tablist"],
         		props : ["aria-multiselectable", "aria-activedescendant", "aria-expanded", "aria-required"],
         		reqProps : null,
         		reqChildren : ["group", "treeitem"],
         		htmlEquiv : null
         	},
         	
         	"treegrid" : {
         		container : null,
         		props : ["aria-activedescendant", "aria-expanded", "aria-level", "aria-multiselectable", "aria-readonly", "aria-required"],
         		reqProps : null,
         		reqChildren : ["row"],
         		htmlEquiv : null
         	},
         	
         	"treeitem" : {
         		container : ["tree"],
         		props : ["aria-checked", "aria-selected", "aria-expanded", "aria-level", "aria-posinset", "aria-setsize"],
         		reqProps : null,
         		reqChildren : null,
         		htmlEquiv : null
            }
         	
        } // end designPatterns
        
    };	                	                	                	                	                
}
