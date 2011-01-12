// questions about format for any portion of a ruleset
// may be answered by consulting the "Accessibility Validation Rule Codification Requirements"
// http://www.openajax.org/member/wiki/Accessibility_Validation_Rule_Codification_Requirements

(function () {
	
	// string utilities
	if (typeof String.isInteger == "undefined") {
		String.prototype.isInteger = function() {
			return this.match(/^\d+$/) != null;
		};
	}
	if (typeof String.trim == "undefined") {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	String.prototype.normalizeSpacing = function() {
		return this.trim().replace(/\s+/g, ' ');
	};
	
	if (typeof OpenAjax == "undefined" || typeof OpenAjax.a11y == "undefined") {
		
		// --- regular expressions for context matching ---
		
		// match an attribute name (possibly namespaced)
		var _attrNameExpr = "[\\w\\-\\:]+";
		// match single element name or * for inclusive context
		var _inclusiveElementExpr = "((\\*\\B)|([#\\-\\w]+))";
		// match multiple attribute predicates for inclusive context
		var _inclusiveAttrsExpr = "((\\[(@|#)[^\\]]+\\])*)";
		// match single disjunct of inclusive context
		var _inclusiveDisjunctMatcher = new RegExp(_inclusiveElementExpr + _inclusiveAttrsExpr);
		
		// one or more inclusive contexts
		var _inclusiveContextMatcher = new RegExp(
			"^(" + _inclusiveElementExpr + _inclusiveAttrsExpr + ")((\\s*\\|\\s*"
				+ _inclusiveElementExpr + _inclusiveAttrsExpr + ")*)$"
				);

						// match exclusive elements context
		var _exclusiveElemContextMatcher = /^!\((\s*\w+(\s*\|\s*\w+)*\s*)\)$/;
		
		// match multiple excluded attributes within one predicate
		var _exclusiveAttrsExpr = "((\\[!\\(\\s*@" + _attrNameExpr + "((\\s*\\|\\s*@" + _attrNameExpr + "\\s*)*)\\)\\])*)";
		// match a single disjunct
		var _exclusiveAttrDisjunctMatcher = new RegExp(_inclusiveElementExpr + _exclusiveAttrsExpr);
		// one or more exclusive attribute disjuncts in a context
		var _exclusiveAttrContextMatcher = new RegExp(
			"^(" + _inclusiveElementExpr + _exclusiveAttrsExpr + ")((\\s*\\|\\s*"
				+ _inclusiveElementExpr + _exclusiveAttrsExpr + ")*)$"
		);
		
		/*
		 * used by parseContextExpression(contextExpr) to parse predicates for inclusive contexts. Note that a preciate
		 * may be iether a standard attribute predicate or '#text'. to indciate a text node test.
		 * 
		 * [1] = '@' + attribute name | '#text'
		 * [5] = operator
		 * [9] = attribute value
		 */
var _predicateMatcher = new RegExp("\\[((#text)|(@" + _attrNameExpr + "))(\\s*((==)|(!=))\\s*(\'|\")([^\'\"]+)(\'|\"))?\\]");
					
		/*
		 * legal comparitive operations for attribute comparisons
		 */
				var _operatorFn = {
			"==" : function (thisVal, thatVal) { return thisVal == thatVal; },
			"!=" : function (thisVal, thatVal) { return thisVal != thatVal; }
		};

/*
 * cache for contexts once parsed
 */
var _contextMap = {};
		
		/*
		 * mapping of each distinct context of rule objects to the rules that share
		 * that context
		 * 
		 * Note: Currently, contexts can be either context expressions (of type String) 
		 * or context functions (of type Function). In the case of the latter,
		 * the stored key is the function name.
		 */
		var _contextToRulesMapping = {};
		
		/*
		 * mapping of each id of a registered rule to that rule
		 */
		var _ruleMapping = {};
		
		/*
		 * registered rulesets, keyed by ruleset id
		 */
		var _rulesets = {};
		
		/*
		 * metadata mapping
		 */
		var _metadata = {};
		
		/*
		 * NLS mapping
		 */
		var _nls = {};
		
		var _requiredRuleProperties = ['id', 'context', 'validate'];
		var _requiredRulesetProperties = ['id', 'nameCode', 'requirements'];
		var _requiredNLSProperties = ['name', 'requirements', 'rules', 'severities'];
		
		// --- begin definition of OpenAjax.a11y object ---
		this.OpenAjax = this.OpenAjax || {};
		this.OpenAjax.a11y = {
			// basic info
			name : "Open AJAX Alliance Accessibility Tools Task Force",
			version : "1.0.0",
			baseUri : "http://openajax.org/a11y",
			
			cache: {
			
				cacheNode: function(node) {
			    
				    if (node) {
				        var targetCache = null;
				        var nameOfNode = node.nodeName;
	
				        switch (nameOfNode) {
				            case 'H1':
				            case 'H2':
				            case 'H3':
				            case 'H4':
				            case 'H5':
				            case 'H6':
				                targetCache = this._headings;
				                break;
				            case 'FRAME':
				                targetCache = this._frames;
				                break;
				            case 'TABLE':
				                targetCache = this._tables;
				                break;
				            default:
				                alert('cacheNode: No cache available for this type of node: ' + nameOfNode);
				        }
	
				        // If node has an id, find out if it's already cached.
				        // If id is already used, and node is not already cached
				        // append node to end of cache.  Else use the node id as 
				        // a hash to cache the node.  Hash lookups will be faster
				        // than incrementing through array looking for nodes.
	
				         if (node && node.id) {
				            var cachedNode = targetCache[node.id];
				            
				            // Cached node has the same id as the node that's about to be cached.
			            	// But the two nodes are different.  So append the node to the cache.
				            if (cachedNode !== node)	
				                targetCache[headers.length] = node; 
				            
				            // Node hasn't been cached and can use its id as a hash.
				            else if (!cachedNode)
				                targetCache[node.id] = node;
				        } else
				            targetCache[targetCache.length] = node;
				    }
				    else
				        alert('cacheNode: Node is null or undefined');
				},
				
				// Clear individual cache arrays
				clearHeadingsCache: function() { this._headings.splice(0); },
				clearFramesCache: function() { this._frames.splice(0); },
				clearTablesCache: function() { this._tables.splice(0); },
				clearValidIdsCache: function() { this._validIds.splice(0); },
				clearAccesskeysCache: function() { this._accesskeys.splice(0); },
				clearLandmarksCache: function() { this._landmarks.splice(0); },
				clearDivCache: function() { this._divs.splice(0); },
				
				// Clear all cache arrays
				clearAllCaches: function() {
					this._headings.splice(0);
					this._frames.splice(0);
					this._tables.splice(0);
					this._validIds.splice(0);
					this._accesskeys.splice(0);
					this._landmarks.splice(0);
					this._divs.splice(0);
				},
			
				// When you want to cache a landmark call OpenAjax.a11y.cache.landmark().
				// Set the value of 'role' and 'label' then cache the object in the landmarks array below.
				landmark: function()  {
					var obj = new Object();
					obj.role = '';
					obj.label = '';
					return obj;
				},
				
				// Entries in the following three arrays are managed by the cacheNode() function above
				_headings: [],
				_frames: [],
				_tables: [],
				_divs: [],
			
				// An array of object ids.  Check this array for an element id 
				// before traversing the DOM looking for valid id references.
				_validIds: [],
				
				// It's assumed that access keys will be the same throughout a Web application.
				// Once access keys are cached here, check to make sure they are the same across the application
				// and that there are no duplicates.  See access key rules in doc-structure-rules.js.
				_accesskeys: [],
				
				// Cache landmark 'role' and 'label' properties (see landmark function above).  
				// Make sure landmarks don't have duplicate labels.  Cache above landmark objects.
				_landmarks: []                                 
			},
			
			/**
			 * tests whether or not the given object contains the specified
			 * list of required properties
			 * 
			 * @param obj object to be tested
			 * @param requiredProps list of required properties
			 * @return true if object contains required properties, false otherwise
			 * @private
			 */
			satisfiesInterface : function (obj, requiredProps) {
			var satisfied = true;
			for (var p = 0; satisfied && p < requiredProps.length; ++p) {
				satisfied = !!(obj[requiredProps[p]]);
			}
			return satisfied;
			},
			
			/**
			 * parse the given context expression taken from a rule object
			 * or from some other source. Parsed contexts are cached for future use.
			 * 
			 * Only contexts involving element(s) with names in a given set of tag names, elements with attribute(s), and 
			 * element(s) with specific attribute value(s) are supported. Exclusionary sets are also
			 * supported. For example, "!(img)" is equivalent to all elements not having the tag name "img") whereas
			 * "img[@!alt]" is equivalent to all img elements not having an alt attribute.
			 *
			 * Two special tag names are also supported, "document" representing the entire document
			 * or "*" representing the set of all elements in the document.
			 * 
			 * @param contextExpr context expression expressed as a String or function
			 * @return either the function as is or an array of objects, each object containing:
			 * - tagName: tag name to be matched or excluded
			 * - attrNames: attribute name(s) to be matched or excluded
			 * - operators: if attribute value(s) specified, how to compare values to attribute values of a given node
			 * - attrValues: value(s) to be compared to attribute values for a given node
			 * - exclusiveElemContext: whether or not this is an exclusive element context
			 * - exclusiveAttrContext: whether or not this is an exclusive attribute context
			 * @throws OpenAjax.a11y.ParseContextError
			 * @private
			 */
			parseContextExpression : function(contextExpr) {
				var result = _contextMap[this.getContextKey(contextExpr)];
				
				if (typeof result == "undefined") {
					if (typeof contextExpr == "string") {
						var parsed;
						
						result = [];
						if (contextExpr.match(_inclusiveContextMatcher) != null) {
							// non-exclusive contexts
							var remainder = contextExpr;
							var offset = 0;
							while ((parsed = remainder.match(_inclusiveDisjunctMatcher)) != null) {
								var names = [], ops = [], values = [];
								offset = remainder.indexOf(parsed[0]);
								if (parsed[4]) {
									// contains a predicate set for attribute presence/value specification
									var predicateExpr = parsed[4];
									var predicate, tmpName;
									while ((predicate  = predicateExpr.match(_predicateMatcher)) != null) {
										tmpName = predicate[1].charAt(0) == '@' ? predicate[1].substr(1, predicate[1].length) : predicate[1];
										names.push(tmpName);
										ops.push(predicate[5] && predicate[5].trim().length > 0 ? predicate[5].trim() : "");
										values.push(predicate[9]);
										predicateExpr = predicateExpr.substring(predicate[0].length);
									}
								}

								result.push({
									tagName : parsed[1].charAt(0) == '*' ? "*" : parsed[1],
									attrNames : names,
									operators : ops,
									attrValues : values,
									exclusiveElemContext : false,
									exclusiveAttrContext : false
								});
								
								remainder = remainder.substring(parsed[0].length + offset);
							}
					} else if ((parsed = contextExpr.match(_exclusiveElemContextMatcher)) != null) {
							// exclusive element contexts specify only the tag name(s) to be excluded
							// and do not include attribute predicates
							// remove leading'!(' and trailing ')'
						var expr = parsed[0].substring(2, parsed[0].length - 1).trim();
							var tagNames = expr.split(/\s*\|\s*/);
							for (var i = 0; i < tagNames.length; ++i) {
								result.push({
									tagName : tagNames[i],
									attrNames : [],
									operators : [],
									attrValues : [],
									exclusiveElemContext : true,
									exclusiveAttrContext : false
								});
							}
						} else if ((parsed = contextExpr.match(_exclusiveAttrContextMatcher)) != null) {
							// exclusive attribute context
							var attrs = [];
							var remainder = contextExpr;
							var predExpr, predicate, offset = 0;
							while ((parsed = _exclusiveAttrDisjunctMatcher.exec(contextExpr)) != null) {
							offset = remainder.indexOf(parsed[0]);
								if (parsed[2]) {
									// discard of leading '[!(@' and trailing ')]'
									predExpr = parsed[2].replace(/\s*/g, '').replace(/@/g, '');
									predicate = predExpr.substring(3, predExpr.length - 2);
									attrs = predicate.split("|");
								} else {
									attrs = [];
								}
								
								result.push({
									tagName : parsed[1],
									attrNames : attrs,
									operators : [],
									attrValues : [],
									exclusiveElemContext : false,
									exclusiveAttrContext : true
								});
								
								remainder = remainder.substring(parsed[0].length + offset);
							}
						} else {
							if (contextExpr.charAt(0) == '.') { //is a function in OpenAjax.a11y.util
								var context = contextExpr.substring(1, contextExpr.length) ;
								if (OpenAjax.a11y.util[context]) {						
									result.push({
										tagName : contextExpr,
										attrNames : [],
										operators : [],
										attrValues : [],
										exclusiveElemContext : false,
										exclusiveAttrContext : true
									});
								} else {
										throw new this.ParseContextError("Given context FUNCTION cannot be found: " + contextExpr);
								}
							} else {
								throw new this.ParseContextError("Given context expression cannot be parsed: " + contextExpr);
							}
						}
					} else if (typeof contextExpr == "function") {
						result = contextExpr;
					} else {
						throw new this.ParseContextError("Unsupported type for context expression: " + (typeof context));
					}
					
					if (result) {
						_contextMap[this.getContextKey(contextExpr)] = result;
					}
				}
				return result;
			},
				
			/**
			 * returns whether or not the given node satisfies the parsed context
			 * 
			 * @param parsedContext parsed context as returned from parseContextExpression to be tested against
			 * @param node node to be tested
			 * @return true if node satisfies any of the parsed contexts, false otherwise
			 * @see parseContextExpression
			 */
			satisfiesContext : function (parsedContext, node) {
				var result = false;
				
				if (parsedContext.length) {
					if (parsedContext[0].exclusiveElemContext) {
						// node name must not match any context tagName
						// and all elements of array will have exclusiveElemContext == true
						var satisfied = true;
						for (var i = 0; satisfied && i < parsedContext.length; ++i) {
							// case-insensitive check
							satisfied &= (parsedContext[i].tagName != node.nodeName.toLowerCase());
						}
						result = satisfied;
					} else { // non-exclusiveElemContext
						var tagNameMatch = false, predicateMatch = true;
						var parsed, i;
						for (i = 0; !(tagNameMatch & predicateMatch) && i < parsedContext.length; ++i) {
							predicateMatch = true;
							parsed = parsedContext[i];
                            // case-insensitive match
							tagNameMatch =(parsed.tagName == '*' && node.nodeType != 3) || parsed.tagName == node.nodeName.toLowerCase();
							if (tagNameMatch && parsed.attrNames.length > 0) {
								// check the attribute predicates
								// could be either inclusive or exclusive in nature
								for (var p = 0; p < parsed.attrNames.length; ++p) {
									if (typeof _operatorFn[parsed.operators[p]] == "function" && parsed.attrValues[p] && node.getAttribute) {
										// operator specified with value
										predicateMatch &= _operatorFn[parsed.operators[p]](node.getAttribute(parsed.attrNames[p]), parsed.attrValues[p]);
									} else if (parsed.attrNames[p]) {
										// only attribute name specified so check is for either existence or nonexistence
										// of attribute or for #text
										if (parsed.attrNames[p] == "#text") {
											var tmpResult = false;
											var children = node.childNodes;
											for (var c = 0; !tmpResult && c < children.length; ++c) {
												tmpResult = children[c].nodeType == 3;
											}
											predicateMatch &= tmpResult;
										} else {
											predicateMatch &= (parsed.exclusiveAttrContext != OpenAjax.a11y.xbrowser.hasAttribute(node, parsed.attrNames[p]));
										}
									}
								} // next predicate
							} // unsuccessful tag name match or no predicates
						} // next context result
						result = tagNameMatch & predicateMatch;
					}
				} else if (typeof parsedContext == "function") {
					result = parsedContext(this.getHtmlDocument(), node);
				}
				
				return result;
			},
			
			/**
			 * gets a collection of elements in the document that satisfy the
			 * context expression using only DOM methods
			 * 
			 * @param context context expression or function from a rule object
			 * @param currentDoc the document in which to search (needed for frames)
			 * @return array of nodes in the document that satisfy the context
			 */
			getCollectionViaDom : function (context, currentDoc) {
				var totalResults = [];
				
				if (typeof context == "string") {
					var parsedContexts = this.parseContextExpression(context);
					var doc = currentDoc ? currentDoc : this.getHtmlDocument();
					if (context.charAt(0) == '.') { //is a function in OpenAjax.a11y.util
						context = context.substring(1, context.length) ;
						result = OpenAjax.a11y.util[context](doc, null);
						return result;
					}
					
					if (parsedContexts.length && parsedContexts[0].exclusiveElemContext) {
						var docElements = doc.getElementsByTagName("*");
						var excludeNames = [];
						for (var i = 0; i < parsedContexts.length; ++i) {
							excludeNames.push(parsedContexts[i].tagName);
						}
						for (var e = 0; e < docElements.length; ++e) {
							if (OpenAjax.a11y.xbrowser.indexOf(excludeNames, docElements[e].tagName.toLowerCase()) == -1) {
								totalResults.push(docElements[e]);
							}
						}
					} else {
						// not exclusive element context
						for (var p = 0; p < parsedContexts.length; ++p) {
							var parsed = parsedContexts[p];
							var tagName = parsed.tagName;
							var ctxResults = [];
							if (parsed.attrNames.length == 0) {
								if (tagName == "#text") {
									// use NodeIterator to retrieve text nodes of document
									// only valid in FF
									if (doc.createNodeIterator) {
										var filter = {
											acceptNode : function(n) {
												return n.nodeValue && n.nodeValue.trim().length > 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
											}
										};
										var tw = doc.createNodeIterator(doc, NodeFilter.SHOW_TEXT, filter, true);
										while ((node = tw.nextNode()) != null) {
											ctxResults.push(node);
										}
									} else {
										// for IE or browsers, use an XPath
										var textNodes = OpenAjax.a11y.xpath.evaluate('//text()[normalize-space(.)!=""]',
												document.body, null, OpenAjax.a11y.xpath.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
										for (var i = 0, l = textNodes.snapshotLength; i < l; i++) {
											var textNode = textNodes.snapshotItem(i);
											ctxResults.push(textNode);
										}
									}
								} else {
									// only element name specified - simply add elements
									// from getElementsByTagName call to result list
									var elements = doc.getElementsByTagName(tagName);
									for (var e = 0; e < elements.length; ++e) {
										ctxResults.push(elements[e]);
									}
								}
							} else {
								// attribute predicates present
								var elements = doc.getElementsByTagName(tagName);
								for (var e = 0; e < elements.length; ++e) {
									if (this.satisfiesContext(parsedContexts, elements[e]) && OpenAjax.a11y.xbrowser.indexOf(totalResults, elements[e]) == -1) {
										ctxResults.push(elements[e]);
									}
								}
							}
							if (ctxResults.length > 0) {
								totalResults = totalResults.concat(ctxResults);
							}
						} // next parsed context result
					}
				}  else if (typeof context == "function") {
					totalResults = context(doc, null);
				}
				
				return totalResults;
			},
			
			/**
			 * retrieve a key for cacheing the given rule context so that it does not need to be reparsed
			 * 
			 * @param ruleContext from a rule object
			 * @return context if it is a string, else function name
			 * @private
			 */
			getContextKey : function (ruleContext) {
				var contextKey;
				if (typeof ruleContext == "function") {
					var fn = ruleContext.toString();
					// obviously incomplete for anonymous functions
					contextKey = fn.substring(fn.indexOf("function") + 8, fn.indexOf("(")) || "anonymous";
				} else if (typeof ruleContext == "string") {
					contextKey = ruleContext.normalizeSpacing();
				}
				return contextKey;
			},
			
			/**
			 * retrieves an equivalent XPath expression for the given context expression assuming
			 * 1) that the context expression is a string and 2) that it represents a context
			 * involving only node name tessts and predicates.
			 * 
			 * The docContext parameter, if true, indicates that the returned XPath has a first step that consists 
			 * of the root node of the context node and a second step of all descendent nodes of that root 
			 * as well as the root itself. If false, this indicates that the resulting XPath expression begins at the context node
			 * but that the next step includes all descendents of that node.
			 * 
			 * @param contextExpr the context expression
			 * @param docContext if true, a '//' is prefixed to the resulting xpath else it is 
			 * prefixed with './/'
			 */
			contextAsXPath : function (contextExpr, docContext) {
				var start = docContext ? "//" : ".//";
				var xpath = null;
				
				if (contextExpr == "document") {
					xpath = '/';
                } else if (contextExpr == "#text") {
                    xpath = '//text()';
				} else if (contextExpr.match(_inclusiveContextMatcher) != null) {
					// same as _inclusiveDisjunctMatcher, but with 'g' flag
					var re = new RegExp(_inclusiveElementExpr + _inclusiveAttrsExpr, "g");
					contextExpr = contextExpr.replace(/==/g, "=");
					contextExpr = contextExpr.replace(/#text/g, "text()");
					contextExpr = contextExpr.replace(re, function(str, offset, s) {
						return start + str;
					});
					
					// same as _predicateMatcher, but with 'g' flag and looking only for != operator
					// transform "@attr != 'value'" to "not(@attr) or @attr != 'value'"
					var predMatcher = new RegExp("((#text)|(@" + _attrNameExpr + "))(\\s*(!=)\\s*(\'|\")([^\'\"]+)(\'|\"))?");
					xpath = contextExpr.replace(predMatcher, function(str, role, p2, p3, delim, value, p6, offset, s) {
						return value ? "not(" + role + ") or " + str : str;
					});
				} else if (contextExpr.match(_exclusiveElemContextMatcher) != null) {
					// add the self axis to each element tag name specified
					contextExpr = contextExpr.replace(/\w+/g, function(str, offset, s) {
						return "self::" + str;
					});
					
					// replace symbols only after self:: axies are in place
					// else 'or' and 'not' ops will be seen as tag names
					
					// replace '|' with 'or' but need to be sure 'or' is surrounded by whitespace
					contextExpr = contextExpr.replace(/\|/g, function(str, offset, s) {
						var result = "or";
						if (s.charAt(offset - 1) != ' ') {
							result = " " + result;
						}
						if (s.charAt(offset + 1) != ' ') {
							result = result + " ";
						}
						return result;
					});
					
					contextExpr = contextExpr.replace("!", "not");
					xpath = start + "*" + "[" + contextExpr + "]".normalizeSpacing();
				} else if (contextExpr.match(_exclusiveAttrContextMatcher) != null) {
					// same as _exclusiveAttrDisjunctMatcher, but with 'g' flag
					var re = new RegExp(_inclusiveElementExpr + _exclusiveAttrsExpr, "g");
					contextExpr = contextExpr.replace(re, function(str, offset, s) {
						return start + str;
					});

					// replace '|' with 'or' but need to be sure 'or' is surrounded by whitespace
					// and that only |s within predicates are replaced
					contextExpr = contextExpr.replace(/\|\s*@/g, function(str, offset, s) {
						var result = "or";
						if (s.charAt(offset - 1) != ' ') {
							result = " " + result;
						}
						return result + " @";
					});
					xpath = contextExpr.replace(/!/g, "not").normalizeSpacing();
}
					
				return xpath;
			},
			
			/**
			 * gets a collection of elements in the document that satisfy the
			 * context expression using XPath evaluation
			 * 
			 * @param context context expression from a rule object
			 * @param contextNode node from which evaluation is to commence (default is entire document)
			 * @return array of nodes in the document that satisfy the context
			 * @throw error if context cannot be converted to an xpath
			 */
			getCollectionViaXPath : function (context, contextNode) {
				var doc = this.getHtmlDocument();
				var node = contextNode ? contextNode : doc;
				var result = null;
				
					var xpath = this.contextAsXPath(context);
				return OpenAjax.a11y.xpath.evaluate(xpath, node, OpenAjax.a11y.util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
			},
			
			/**
			 * add an array of rules. Each rule object in the array
			 * must implement the rule object interface:
			 * 
			 * - id: a unique id for the rule
			 * - label: a localizable key for a human-readable label or name for the rule
			 * - context: a rule context expression of type String or a rule context function of type Function
			 * - validate: function(context) that is responsible for executing rule logic and that returns a ValidationResult object
			 * 
			 * The context passed to the validate function must be guaranteed to match the contextual criteria noted in the
			 * context attribute of that rule object.
			 * 
			 * @param rules array of rules to be added
			 */
			addRules : function (rules) {
				if (!rules || !rules.length) {
					return;
				}
				
				for (var r = 0; r < rules.length; ++r) {
					var rule = rules[r];
					if (this.satisfiesInterface(rule, _requiredRuleProperties) && typeof _ruleMapping[rule.id] == "undefined") {
						var ruleContext = rule.context; // || findPropertyFromRuleset(rule.id, "context");
						var contextKey = this.getContextKey(ruleContext);
						if (contextKey) {
							var ctxRules = _contextToRulesMapping[contextKey];
							if (ctxRules) {
								ctxRules.push(rule);
							} else {
								_contextToRulesMapping[contextKey] = [rule];
							}
							_ruleMapping[rule.id] = rule;
						}
					} // interface not satisfied
					else {
						alert('Note to developer - Rule: ' + rule.id + ' could not be added; duplicate ID -OR- missing required properties: ' + _requiredRuleProperties.toString());
					}
				} // next rule
			},
			
			/**
			 * returns a mapping of each context to the rules associated with that context. This
			 * object is populated as rules are added via the addRules function.
			 * 
			 * @return context -> rules mapping
			 * @see addRule
			 */
			rulesByContext : function () {
				return _contextToRulesMapping;
			},
			
			/**
			 * get a rule by its specified rule id, which was registered
			 * via addRules
			 * 
			 * @param ruleId id of desired rule
			 * @return rule or null if no rule matches the given id
			 */
			getRule : function (ruleId) {
				return _ruleMapping[ruleId];
			},
			
			/**
			 * add a ruleset. Each ruleset object
			 * must implement the ruleset object interface:
			 * 
			 * - id: a unique id for the ruleset
			 * - nameCode: a localizable key for a human-readable label or name for the ruleset
			 * - rules: an associative array keyed by rule ids that defines additional properties 
			 * for rules in the ruleset
			 * 
			 * @param ruleset to be added
			 */
			addRuleset : function (ruleset) {
				if (ruleset && this.satisfiesInterface(ruleset, _requiredRulesetProperties)
					&& typeof _rulesets[ruleset.id] == "undefined") {
					_rulesets[ruleset.id] = ruleset;
				}
			},
			
			/**
			 * get a ruleset by id
			 * 
			 * @param id of desired ruleset
			 * @return ruleset with desired id or null
			 */
			getRuleset : function (rulesetId) {
				return _rulesets[rulesetId];
			},
			
			/**
			 * get all registered rulesets as an associative array, keyed by ruleset id
			 * 
			 * @return id -> ruleset map
			 * @see addRuleset
			 */
			getAllRulesets : function () {
				return _rulesets;
			},
			
			/**
			 * add an array of metadata objects to be associated with individual rules. Each object
			 * is to be associated with a rule registered via addRuels but not necessarily incorporated
			 * into that rule or into any particular ruleset added with the addRuleset function.
			 * 
			 * The only required property of each object is 'ruleId', which specifies the id of the rule with which
			 * this metadata is to be associated. The value of this property should be an id of a rule already
			 * added with the addRules function.
			 * 
			 * An optional 'id' property can be given for each metadata object, in which case
			 * the value of that id property rather than that of the 'ruleId' property will be used 
			 * to identify the metadata object. Specifying an id property also means that the value of that id should be used in rulesets
			 * when adding a rule to a ruleset rather than the id of the rule.
			 * 
			 * @param metadataObjects an array of metadata objects
			 */
			addMetadata : function (metadataObjects) {
				if (!metadataObjects || !metadataObjects.length) {
					return;
				}
				
				for (var i = 0; i < metadataObjects.length; ++i) {
					var obj = metadataObjects[i];
					if (obj.ruleId) {
						var id = obj.id || obj.ruleId;
						if (typeof _metadata[id] == "undefined") {
							_metadata[id] = obj;
						}
					}
				} // next metadata object
			},
			
			/**
			 * return a map containing all metadata added via addMetadata
			 * 
			 * @return all metadata
			 * @see addMetadata
			 */
			getAllMetadata : function () {
				return _metadata;
			},
			
			/**
			 * add an NLS layer for the specified ruleset. NLS support for a ruleset must contain
			 * at least the following properties:
			 * 
			 * - name: localized name for the ruleset
			 * - severities: localized severity levels for the ruleset with defined severity 
			 * levels being given by the OAA rules requirements wiki.
			 * - requirements: an associative array for each requirement in the ruleset, 
			 * keyed by the 'criterionNumber' property of each requirement object in the ruleset. Each entry must contain
			 * the property 'label' (a label for the criterionNumber) and may contain the optional properties 'level' 
			 * and 'description'.
			 * - rules: associative array keyed by ruleIds for each rule in the ruleset and the
			 * value of which is an object which must contain the 'message' property (the localized message for that rule) 
			 * and optionally may contain a 'label' property (a human-readable label for identifying the rule).
			 * 
			 * For an example, see nls/wcag20-ruleset_en-us.js. 
			 * 
			 * @param rulesetId id of ruleset for which NLS is being defined
			 * @param locale - locale for which NLS is being defined
			 * @param nls NLS object as defined above
			 */
			addNLSForRuleset : function (rulesetId, locale, nls) {
				if (nls && locale && this.satisfiesInterface(nls, _requiredNLSProperties)
						&& (typeof _nls[rulesetId] == "undefined" || typeof _nls[rulesetId][locale] == "undefined")) {
					var ok = true;
					var key;
					for (key in nls.requirements) {
						if (!nls.requirements[key].label) {
							ok = false;
							break;
						}
					}
					for (key in nls.rules) {
						if (!nls.rules[key].message) {
							ok = false;
							break;
						}
					}

					if (ok) {
						_nls[rulesetId] = _nls[rulesetId] || {};
						_nls[rulesetId][locale] = nls;
					}
					}
			},
			
			/**
			 * get the native language support for a given ruleset and locale
			 * 
			 * @param rulesetId - id of ruleset for which NLS is desired
			 * @param locale - locale for which support is desired
			 * @returns NLS for ruleset with the given id and locale or null if not found
			 * @see addNLSForRuleset
			 */
			getNLSForRuleset : function (rulesetId, locale) {
				return _nls[rulesetId] ? _nls[rulesetId][locale] : null;
			},
			
			/**
			 * initializer for a result from an application of the validate function of a rule
			 * object in a ruleContext
			 * 
			 * @param result whether or not the test expressed by the rule was satisfied (i.e. true = pass, false = failure)
			 * @param nodes array of offending nodes (empty if result is true)
			 * @param attrs array of offending attributes (empty if result is true)
			 * @param textContent offending text content of an element (empty if result is true)
			 * @param msgArgs message arguments to be used in localized message strings
			 */
			ValidationResult : function (result, nodes, attrs, text, msgArgs) {
				this.result = result;
				this.nodes = nodes;
				this.attrs = attrs;
				this.textContent = text;
				this.msgArgs = msgArgs;
				return true;
			},
			
			/**
			 * thrown if error during parsing a context for a rule
			 * 
			 * @param msg - error message
			 * @see parseContextExpression
			 */
			ParseContextError : function(msg) {
				this.msg = msg;
				return true;
			},
			
			getHtmlDocument : function () {
				var name = document.documentElement.tagName.toLowerCase();
				var doc = null;
				if (name == "window") {
					doc = content.document;
				} else if (name == "html") {
					doc = document;
				}
				return doc;
			}
			
		};

		if (OpenAjax && OpenAjax.hub) {
			OpenAjax.hub.registerLibrary(this.name, this.baseUri, this.version);
		}
		
	}

})();
