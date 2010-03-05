with (OpenAjax.a11y) {
	addRules([
	          // --------
	          // Aria validation!
	          // --------
	          
	          {
	              id : "unsupportedstate",
	              context : ".containsAriaAttr",
	              validate : function (ruleContext) {
	              	var passed = true;
	              	var attrNameArr = new Array();
					var designPatterns = OpenAjax.a11y.aria.designPatterns;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	    			if (role != '' && designPatterns[role]) {
	    				for (var a = 0; a < ruleContext.attributes.length; a++) {
	    					if (ruleContext.attributes[a].name.substring(0, 5) == 'aria-') {
			    				var attrName = ruleContext.attributes[a].name;
		    					var found = OpenAjax.a11y.aria.globalProperties.indexOf(attrName) >= 0;
								if (!found && designPatterns[role].reqProps != null) { 
			    					found = designPatterns[role].reqProps.indexOf(attrName) >= 0;
								}
								if (!found && designPatterns[role].props != null) { 
			    					found = designPatterns[role].props.indexOf(attrName) >= 0;
								}
								if (!found) attrNameArr.push(attrName);
	    					}
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (attrNameArr.toString());
	    			retMsg.push (role);
	              	var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
	              }
	          },
	          {
	              id : "invalidAttributeValue",
	              context : ".containsAriaAttr",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();
	              	var dataTypeArr = new Array();

	              	// for each aria attr check for nonexistant IDs
	    			for(var i=0; i< ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-') {
	    	    			var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
	    					if (dataTypes && dataTypes.values) {
	    						var nodeValue = ruleContext.attributes[i].nodeValue.normalizeSpacing();
	    						if (dataTypes.values.indexOf(nodeValue) == -1) {
		    						if (dataTypes.values.indexOf('undefined') != -1 && nodeValue.length == 0) {
		    							//translate 'undefined' to mean ''
		    						} else {
		    							attrNameArr.push(attrName);
		    							dataTypeArr.push(dataTypes.values.toString());
		    						}
	    						}
	    					}
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (attrNameArr.toString());
	    			retMsg.push (dataTypeArr.toString());
	              	var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 	                
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
			    					if (rc != '') { 
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
	    						if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length < 1) attrNameArr.push(attrName);
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
	              context : ".containsAriaAttrIDREF",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();

	              	// for each aria attr check for nonexistant IDs
	    			for(var i=0; i< ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-') {
	    	    			var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
	    					if (dataTypes && dataTypes.type && (dataTypes.type == "http://www.w3.org/2001/XMLSchema#idref")) {
	    						if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length >= 1) {
	    							var idArray = ruleContext.attributes[i].nodeValue.split(" ");
	    							if (idArray.length > 1) attrNameArr.push(attrName);
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
	              id : "invalidGlobalStatesProps",
	              context : ".containsAriaAttr",
	              validate : function (ruleContext) {
	              	var attrNameArr = new Array();
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	    			for(var i=0; role == '' && i < ruleContext.attributes.length; i++ ) {
	    				var attrName = ruleContext.attributes[i].name;
	    				if (attrName.substring(0, 5) == 'aria-' && OpenAjax.a11y.aria.globalProperties.indexOf(attrName) == -1) {
	    					attrNameArr.push(attrName);
	    				}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (attrNameArr.toString());
	    			var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
	              }
	          },
	          {
	              id : "missingMustContain",
	              context : "*[@role]",
	              validate : function (ruleContext) {
	              	var passed = true;
	              	var roleNameArr = new Array();
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	              	var designPatterns = OpenAjax.a11y.aria.designPatterns;
	    			if (role != '' && designPatterns[role] && designPatterns[role].reqChildren != null) { 
						for(var i=0; i< designPatterns[role].reqChildren.length; i++) {
				            var xp = "*[@role='" + designPatterns[role].reqChildren[i] + "']"; // SMF TODO get direct children only, this includes grandchildren
				            var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
			    	    	var r = xpathResult.iterateNext();
			    	    	if (!r) roleNameArr.push(designPatterns[role].reqChildren[i]);
						}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (role);
	    			retMsg.push (roleNameArr.toString());
	    			var passed = roleNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], '', '', retMsg);
	              }
	          },
	          {
	              id : "missingContainedBy",
	              context : "*[@role]",
	              validate : function (ruleContext) {
	              	var passed = true;
	              	var roleNameArr = new Array();
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	              	var designPatterns = OpenAjax.a11y.aria.designPatterns;
	    			if (role != '' && designPatterns[role] && designPatterns[role].container != null) { 
						for(var i=0; i< designPatterns[role].container.length; i++) {
				            var xp = "parent::*[@role='" + designPatterns[role].container[i] + "']"; // SMF TODO get direct children only, this includes grandchildren
				            var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
			    	    	var r = xpathResult.iterateNext();
			    	    	if (!r) roleNameArr.push(designPatterns[role].container[i]);
						}
	    			}
	    			var retMsg = new Array();
	    			retMsg.push (role);
	    			retMsg.push (roleNameArr.toString());
	    			var passed = roleNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], '', '', retMsg);
	              }
	          }, 
	          {
	              id : "missingReqAttribute",
	              context : ".containsAriaAttr",
	              validate : function (ruleContext) {
	              	var passed = true;
	              	var attrNameArr = new Array();
	              	var designPatterns = OpenAjax.a11y.aria.designPatterns;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	    			if (role != '' && designPatterns[role] && designPatterns[role].reqProps != null) { 
						for(var i=0; i< designPatterns[role].reqProps.length; i++) {
							if (!ruleContext.hasAttribute(designPatterns[role].reqProps[i])) attrNameArr.push(designPatterns[role].reqProps[i]);
						}
		    		}
	    			var retMsg = new Array();
	    			retMsg.push (role);
	    			retMsg.push (attrNameArr.toString());
	    			var passed = attrNameArr.length == 0;
	                return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
	              }
	          },
	          {
	              id : "emptyReqAttribute",
	              context : ".containsAriaAttr",
	              validate : function (ruleContext) {
	              	var passed = true;
	              	var attrNameArr = new Array();
	              	var designPatterns = OpenAjax.a11y.aria.designPatterns;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	    			if (role != '' && designPatterns[role] && designPatterns[role].reqProps != null) { 
						for(var i=0; i< designPatterns[role].reqProps.length; i++) {
							if (ruleContext.hasAttribute(designPatterns[role].reqProps[i])) {
								var nodeValue = ruleContext.getAttribute(designPatterns[role].reqProps[i]).normalizeSpacing();
								if (nodeValue.length == 0) attrNameArr.push(designPatterns[role].reqProps[i]);
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
	              id : "invalidRole",
	              context : "*[@role]",
	              validate : function (ruleContext) {
	              	var passed = true;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	    			if (!OpenAjax.a11y.aria.designPatterns[role]) passed = false;
	                return new ValidationResult(passed, [ruleContext], 'role', '', [role]);
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
	    	    			if (!dataTypes) attrNameArr.push(attrName);
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
//	              context : "input[@!role] | select[@!role] | button[@!role] | textarea[@!role] | option[@!role] | area[@!role] | a[@!role]", //focusableElements
	              context : ".nonfocusableElementsContainingEvents", //focusableElements
	       	      validate : function (ruleContext) {
	              	var passed = true;
	              	/*SMF TODO the following should be taken care of in the context */
	    			if (ruleContext.nodeName.toLowerCase() == "a" && ruleContext.hasAttribute('href')) return new ValidationResult(passed, [ruleContext], '', '', []);
	    			if (ruleContext.nodeName.toLowerCase() == "area" && ruleContext.hasAttribute('href')) return new ValidationResult(passed, [ruleContext], '', '', []);
	    			
	    	        var events = util.getEvents(ruleContext);
	    	        if (events.length > 0) {
		              	function hasEvent(a) {
		        			if (events.indexOf('on' + a) != -1)return 'on' + a;	
		        			if (events.indexOf(a) != -1) return a;
		        			return '';
		        		}
		              	function hasTargetEvent() {
		        			var found = false;
		        			var _targetEvents=new Array("click","keyup","keydown","keypress", "mousedown","mouseup","mousemove","mouseout","mouseover");
		        			for (i = 0; i < _targetEvents.length && !found; i ++) {
		        				found = hasEvent(_targetEvents[i]);
		        				if (!found) found = hasEvent(_targetEvents[i]);
		        			}
		        			return found;
		        		}
						passed = !hasTargetEvent();
	    	        }
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingkeyequiv",
	              context : "*[@aria-activedescendant]",
	              validate : function (ruleContext) {
	  	        	var events = util.getEvents(ruleContext);
		        	var passed = (events.toString().indexOf("mouse") == -1 || events.indexOf("keydown") >= 0 || events.indexOf("keypress") >= 0);
		        	return new ValidationResult(passed, [ruleContext], '', '', []);	              }
	          },
	          {
	              id : "invalidtabindex",
	              context : "*[@aria-activedescendant]",
	              validate : function (ruleContext) {
	    			var disabled = ruleContext.hasAttribute('aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
	    			var passed = (disabled == 'true' || (ruleContext.hasAttribute('tabindex') && ruleContext.getAttribute("tabindex").isInteger()));
	    			return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingfocusablechild",
	              context : "*[@role]",
	              validate : function (ruleContext) {
	              	var passed = true;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	              	if (OpenAjax.a11y.aria.containers.indexOf(role) >= 0) {
		    			var disabled = ruleContext.hasAttribute('aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
		    			if (disabled != 'true' && !ruleContext.hasAttribute('aria-activedescendant')) {
		    	        	var xp="child::*[@role=";
		    	            var reqChildren = OpenAjax.a11y.aria.designPatterns[role].reqChildren; 
		    	        	if (reqChildren) { /* SMF TODO menubar does not have any reqChildren */
			    	            passed = false;
		    	        		for (var i=0; i< reqChildren.length; i++) xp += "'" + reqChildren[i] + "' |";
			       	        	xp = xp.substring(0,xp.length-1) + ']';
			  			    	var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
						    	var r = xpathResult.iterateNext();
						    	while (r && !passed) {
						    		passed = (r.hasAttribute('tabindex') && r.getAttribute("tabindex").isInteger());
						     		r = xpathResult.iterateNext();
			            		}
		    	        	}
		    			}
	    			}
	                return new ValidationResult(passed, [ruleContext], 'role', '', []);
	              }
	          },
	          {
	              id : "missingkeyevent",
	              context : "*[@role]",
	              validate : function (ruleContext) {
	              	var passed = true;
	    			var role = ruleContext.hasAttribute('role') ? ruleContext.getAttribute("role") : '';
	              	if (OpenAjax.a11y.aria.containers.indexOf(role) >= 0) {
		    			var disabled = ruleContext.hasAttribute('aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
		    			if (disabled != 'true' && !ruleContext.hasAttribute('aria-activedescendant')) {
		    	        	var events = util.getEvents(ruleContext);
		    	        	passed = (events.indexOf("keydown") >= 0 || events.indexOf("keypress") >= 0);
		    	        	if (!passed) {
		    	        		var xp="child::*[@role=";
		    	              	var reqChildren = OpenAjax.a11y.aria.designPatterns[role].reqChildren; 
		    	        		if (reqChildren) { /* SMF TODO menubar does not have any reqChildren */
			    	              	for (var i=0; i< reqChildren.length; i++) xp += "'" + reqChildren[i] + "' |";
			       	        		xp = xp.substring(0,xp.length-1) + ']';
			  			    	    var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
						    	    var r = xpathResult.iterateNext();
						    	    while (r && !passed) {
						    	        var events = util.getEvents(r);
						    	        passed = (events.indexOf("keydown") >= 0 || events.indexOf("keypress") >= 0);
						    	        r = xpathResult.iterateNext();
			    	        		}
		    	        		}
		    	        	}
		    			}
	    			}
	                return new ValidationResult(passed, [ruleContext], 'role', '', []);
	              }
	          },
	          
	          
	      	]);
}