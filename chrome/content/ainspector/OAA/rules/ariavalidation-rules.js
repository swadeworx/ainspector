with (OpenAjax.a11y) {
	addRules([
	          // --------
	          // Aria validation!
	          // --------
	          
	          {
	              id : "unsupportedstate",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "invalidAttributeValue",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);               
	              }
	          },
	          {
	              id : "invalidIDREF",
	              context : ".containsAriaAttrIDREF",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();
	              	var nonExistantIDs = new Array();

	              	// for each aria attr check for nonexistant IDs
	    			for(var i=0; i< ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-') {
	    	    			var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
	    					if (dataTypes && dataTypes.type && (dataTypes.type == "http://www.w3.org/2001/XMLSchema#idref" || dataTypes.type == "http://www.w3.org/2001/XMLSchema#idrefs")) {
	    						if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length >= 1) {
		    						var rc = util.nonExistantIDs(ruleContext.ownerDocument, ruleContext.attributes[i].nodeValue);
			    					if (rc != '') { //SMF TODO list multiple aria attr misssing specifying nonexistants IDs nicely
			    									// does not show up in Ally & DOM+ tabs since the context is a function
			    						attrNameArr.push(attrName);
			    						nonExistantIDs.push(rc);
			    					}
	    						}
	    					}
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (nonExistantIDs.toString());
	    			retMsg.push (attrNameArr.toString());
	              	var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 	                
	              }
	          },
	          {
	              id : "emptyIDREF",
	              context : ".containsAriaAttrIDREF",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();

	              	// for each aria attr check for nonexistant IDs
	    			for(var i=0; i< ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-') {
	    	    			var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
	    					if (dataTypes && dataTypes.type && (dataTypes.type == "http://www.w3.org/2001/XMLSchema#idref" || dataTypes.type == "http://www.w3.org/2001/XMLSchema#idrefs")) {
	    						if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length < 1) {
	        						attrNameArr.push(attrName);
		    					}
	    					}
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (attrNameArr.toString());
	              	var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 	                
	              }
	          },
	          {
	              id : "toomanyIDREF",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "invalidGlobalStatesProps",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingMustContain",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingContainedBy",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingReqAttribute",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "emptyReqAttribute",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "invalidRole",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "unknownAriaAttr",
	              context : "*",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();

	              	// for each aria attr check for nonexistant IDs
	    			for(var i=0; i< ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-') {
	    	    			var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
	    	    			if (!dataTypes) {
//SMF TODO list multiple non-aria attributes nicely
// does not show up in Ally & DOM+ tabs since the context is a function
			    				attrNameArr.push(attrName);
	    					}
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (attrNameArr.toString());
	              	var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 		              }
	          },
	          
	          // --------
	          // Keyboard Accessible
	          // --------
	          {
	              id : "missingrole",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingkeyequiv",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "invalidtabindex",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingfocusablechild",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingkeyevent",
	              context : "*",
	              validate : function (ruleContext) {
	              	var passed = true;
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          
	          
	      	]);
}