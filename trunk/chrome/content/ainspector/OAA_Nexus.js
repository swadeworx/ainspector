/* See license.txt for terms of usage */

AINSPECTOR.OAA_Nexus = { //AINSPECTOR.OAA_Nexus
    urls: {},

    lastLoadTimestamp: undefined,

    /*
    * init
    * Check which rule sets are available and add them to the available rules
    *
    * @return nothing
    */

    init: function() {
        try {
	        AINSPECTOR.OAA_Nexus.addRuleset("WCAG_2_0"); //rendered by reportcardView() in renderers.js
	        AINSPECTOR.OAA_Nexus.addRuleset("IITAA_1_0"); 
	        AINSPECTOR.OAA_Nexus.addRuleset("ARIA_1_0"); 
        } catch (err) {
            alert("AINSPECTOR.OAA_Nexus: " + err.message);
        } // endtry
    },

    /*
    * calculateScore
    * 
    * @param (integer) numEle 
    * @param (array of integers) severitySum
    *
    * @return (integer) 
    */

    calculateScore: function (numEle, severitySum) {
    	var score;
    	
    	var errSum = severitySum[0];
    	var warnSum = severitySum[1];
    	var checkSum = severitySum[2] + severitySum[3] + severitySum[4]; //take 5 levels into account ie. change below
    	 
     	if (numEle >= 10) {
         	sumIssues = (errSum * 1) + (warnSum * 0.5) + (checkSum * 0.25);
          	var score = (numEle - sumIssues)/ numEle * 100;
         	if (checkSum != 0 && score > 90) score = 89;
         	else if (warnSum != 0 && score > 80) score = 69;
         	else if (errSum != 0 && score > 70) score = 59;
     	}
        else { // < 10 elements to test - not a big enough sample for averaging
           	if (errSum != 0) score = 59;
           	else if (warnSum != 0) score = 69;
           	else if (checkSum != 0) score = 89;
           	else score = 100;
        }  // endif
     	return score;
    },

    /*
    * onFocusTrap: This runs rules on the node with focus
    * 
    * @param (event object) event 
    *
    * @return nothing
    */

    onFocusTrap: function(event) {
        try {
        	var rc = AINSPECTOR.controller.callAllParseNode(event.target);
        	if (rc.msg != '') {
        		Firebug.Console.log(rc.msg);
        //		FBTrace.sysout(event.target.nodeName + ' onFocusTrap rc.msg: ' +  rc.msg, event.target);
        	}  // endif
        } catch (err) {
        	FBTrace.sysout('onFocusTrap: ' + err.message);
        } // endtry
    },
    
    /*
    * nodeSatisfiesContext: This checks to see if the current node statisfies the context requirements
    * 
    * @param (node) node  The node to test the context
    * @param (string) context The context is defined for each rule
    *
    * @return (boolean) Returns True if the context is satisfied
    */

    nodeSatisfiesContext : function (node, context) {
		with (OpenAjax.a11y) {
	    	if (typeof context == "string") { 
	    	
	    	    // Context that are functions start with '.' and the functions are defines in OpenAjax.a11y.util
	    	
	    		if (context[0] == '.') { 
	    		    // is a function in OpenAjax.a11y.util
	    			context = context.substring(1, context.length) ;
	    			var result = OpenAjax.a11y.util[context](node, null); 
	    			return (result.length > 0); 
	    		} // endif
	    		
				var parsedContexts = parseContextExpression(context);
				
				if (satisfiesContext(parsedContexts, node))  {
				  return true;
				} // endif
				  
	    	} // endif
	    	
	    	return false;
	    	
		} // endwith
    },
    
   /*
    * OAAParseEle: This checks to see if the current node statisfies the context requirements
    * 
    * @param (string) criterionNumber The criterionNumber is defined in each ruleset
    * @param (node) node  The node to test the context
    *
    * @return (object) Returns object with rule results
    */    
 
    OAAParseEle: function(criterionNumber, node) {
		try {
			with (OpenAjax.a11y) {
			
			   // define return object structure
				var retStruct = {
						id: new Array(),
						msg: new Array(),
						attr: new Array(),
						severityCode: new Array()
					} // endstruct

                // Get the current ruleset using ID
				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);
				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();
				
				// Get the rules associated with the criterionNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) {
					  ruleset = OAA.requirements[r].rules;
					} // endfor
				} // endfor
				
				// define an object to store rule results
				var ruleResArray = new Object();
				
				// intialize the ruleRes for results for each rule associated with the criterionNumber
				
				for (var expr in  ruleset) {
				  ruleResArray[expr] = new Array();
				} // endfor  

                // evaluate the rules based on each context
				for (var expr in ruleMapping) {
				    // store the rules associated with this context in eleRules
				    
					var eleRules = ruleMapping[expr];
					
					// Check to see if the context is not the whole document, only process rules that can be applied to a node
					if (expr != "document"){
					    
					    // Process each rule in the criteraNumber for the node
						for (var r = 0; r < eleRules.length; ++r) {
						    // rule is the current rule being processed
							var rule = eleRules[r];
							
				//			if (ruleset[rule.id]) FBTrace.sysout(rule.id + " nodeSatisfiesContext: " + this.nodeSatisfiesContext(node, rule.context));
				
				            // Check to see if the rule is defined in the current ruleset and the node satisfies the context of the rule
							if (ruleset[rule.id] && this.nodeSatisfiesContext(node, rule.context)) {
							
							    // if defined and satisifes the context determine if there are any dependencies
							    // dependices are items that are missing from the markup like alt and title attributes, and elements like h1 
								var dependencies = false;
								if (rule.dependencies) {
								  for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
								    // determine if the rule will fail since the dependency fails
									dependencies = (ruleResArray[rule.dependencies[d]] == false);
								  }  // endfor
								}  // endif
								
								// if the rule could pass run the rule
								// This means that any rule where a dependency fails will not return a result (??)
								if (!dependencies) {
								
								    // run the rule on the node
									ruleRet = rule.validate(node);
									// save results for the rule for the node 
									ruleResArray[rule.id] = ruleRet.result;
									
									// If the rule fails return the error information
									if (ruleRet.result == false) { 
									    // !ruleRet.result
										retStruct.id.push(rule.id);
										retStruct.msg.push(FBL.$STR(ruleset[rule.id].severityCode.toLowerCase(), 'OAA_bundle') + ': ' + FBL.$STRF(ruleset[rule.id].messageCode, ruleRet.msgArgs, 'OAA_bundle'));
										retStruct.attr.push(ruleRet.attrs);
										retStruct.severityCode.push(ruleset[rule.id].severityCode.toLowerCase());
									} // endif

									/* rule did not run successfully -  SMF This produces too much noise.
									else if (ruleRet.result == -1) {
										retStruct.id.push(rule.id);
										retStruct.msg.push(FBL.$STR('level.manual', 'OAA_bundle') + ': ' + FBL.$STRF(ruleset[rule.id].messageCode, ruleRet.msgArgs, 'OAA_bundle'));
										retStruct.attr.push(ruleRet.attrs);
										retStruct.severityCode.push('level.manual');
									}
									*/
									
								} // endif
							} // endif
						} // endfor
					}  // endif
				}  // endfor
		//		FBTrace.sysout("retStruct " , retStruct);
				return (retStruct.msg.length > 0) ? retStruct : null;
			}
		} catch (ex) {
			FBTrace.sysout('runRuleGroup exception: ', ex);
		}
	},
	
	/** 
	* runDocContextRules
	*
	* @param (string) criterionNumber The criterionNumber is defined in the ruleset
	* @param (object) doc  The doc is the document 
	* @param (array) loadArray The loadArray 
	* 
	* @return (retStruct) retStruct formatted as a OAAParseEle	
	*/ 
	
    runDocContextRules: function(criterionNumber, doc, loadArray) {
		try { 
			with (OpenAjax.a11y) {
			
			    // Create structure to store the results of the rule processing
				var retStruct = {
						id: new Array(),
						msg: new Array(),
						attr: new Array(),
						severityCode: new Array()
					}
					
				// Get rule set to run on document using 	

				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);
				if (OAA == null) {  
				  return null; // OAA rule set is not active 
				} // endif

				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();
				
				// Get the rules associated with the criterionNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) {
					  ruleset = OAA.requirements[r].rules;
					}  // endif
				} // endfor
				
				// if null, then user specified a criterion number which is invalid or has no rules
				if (ruleset == null) {
				  return null; 
				}  // endif

                // evaluate the rules based on each context
				for (var expr in ruleMapping) {
				    // store the rules associated with this context in eleRules
				    
					var eleRules = ruleMapping[expr];

					// Check to see if the context is the whole document, only process rules that can be applied to the document
					if (expr == "document") {
					
					    // process all the rules with context of 'document'
						for (var r = 0; r < eleRules.length; ++r) { 
						
						    // rule is the current rule
							var rule = eleRules[r];
							
							// check to make sure the current rule is in the ruleset
							if (typeof(ruleset[rule.id]) != 'undefined'){ //rule is a member of our criterionNumber 
								
								// Check to see if a previous rule with the same dependency failed 
								// dependencies is true if a previous rule with same dependency failed
								var dependencies = false;
								if (rule.dependencies) {
								  for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									dependencies = (this.runRule(rule.dependencies[d], doc).length != 0);
							      } // endif
								} // endif
								
								// If the rule could pass run the rule
								if (!dependencies) {
								
								    
									ruleRet = rule.validate(doc);
									if (!ruleRet.result) {
										//match up the nodes with all of the nodes we have in our array
										for (var i = 0; i < ruleRet.nodes.length; i++) {
											var added = false;
											for (var j = 0; j < loadArray.length && !added; j++) {
												if (ruleRet.nodes[i] == loadArray[j].node) {
													loadArray[j].issuesObj.msg.push(FBL.$STR(ruleset[rule.id].severityCode.toLowerCase(), 'OAA_bundle') + ': ' + FBL.$STRF(ruleset[rule.id].messageCode, ruleRet.msgArgs, 'OAA_bundle'));
													loadArray[j].issuesObj.attr.push(ruleRet.attrs);
													loadArray[j].issuesObj.severityCode.push(ruleset[rule.id].severityCode.toLowerCase());
													added = true;
												} // endif
											} // endfor
										} // endfor
									} // endif
								} // endif
							} // endif 
						} // endfor
					} // endif
				} // endfor
			} // endwith
		//	FBTrace.sysout("retStruct " , retStruct);
			return (retStruct.msg.length > 0) ? retStruct : null;
		} catch (ex) {
			FBTrace.sysout('runDocContextRules exception: ', ex);
		} // endtry
	},


	
	/** 
	* runRule: Run a rule on the entire document
	*
	* @param (String) ruleID The ruleID is defined in each rule
	* @param (object) doc  The doc is the document obbject
	* 
	* @return (object) The return object is an array 	
	*/ 
	
    runRule: function(ruleID, doc) {
		try {
			with (OpenAjax.a11y) {
			
			    // broken defines the return object
				var broken = new Array();
				
				// get the usind the ruleID
				var rule = getRule(ruleID);
				
				// if the rule has dependencies resolve them
				// rule dependencies are usually a missing attribute or element needed for by the rule
				if (rule.dependencies) {
				  // execute rule dependencies
				  for (var d = 0; d < rule.dependencies.length; ++d) {
				    // recursively evaluate rule dependencies
					var ruleRetArr = this.runRule(rule.dependencies[d], doc);
					
					// Stop processing dependencies if an error was found
					if (ruleRetArr.length != 0) {
//						FBTrace.sysout(rule.id + " dependencies " + rule.dependencies  + ' failed ' + rule.dependencies[d]);
						return ruleRetArr;
					} // endif
				  } // endfor
				} // endif
				
//				if (rule.dependencies) FBTrace.sysout(rule.id + " dependencies " + rule.dependencies + ' PASSED ');
				
				// get all the dom nodes that this rule applies to
				var ele = getCollectionViaDom(rule.context, doc);
				
				// if rule context is the document  the array is the document
				
				if (rule.context == "document") { 
				  ele[0] = doc;
				} // endif
				
				// go through every element that the rule applies to
				for (var i = 0; i < ele.length && broken.length == 0; ++i) {
				
				    // Every rule has its own validate function and returns a ValidationResult object
					var ruleRet = rule.validate(ele[i]);
					
					// Override the ruleId with our ruleID (?? why is this needed??)
					ruleRet.ruleId = ruleID;

                    // if rule failed add it to the list of failures
					if (!ruleRet.result) { 
					   broken.push(ruleRet);
					} // endif
					
				} // endfor
				
				// return the list of rules that failed, or empty array if no rules failed
				return broken;
			} // endwith
		} catch (ex) {
			FBTrace.sysout('runRule exception: ', ex);
		}  // endtry
	},

	/** 
	* runRuleGroup: Run all the rules associated with a ruleset criteriaNumber
	*
	* @param (String) criterionNumber The criterionNumber is defined in a ruleset
	* @param (object) doc  The doc is the document obbject
	* @param (String) loadArray The loadArray is an array of dom nodes assocaited with each rule
	* 
	* @return (object) The return object is an array 	
	*/ 

    runRuleGroup: function(criterionNumber, doc, loadArray) {
		try {
			with (OpenAjax.a11y) {
			
			    // virginArray is a boolean that indicates if loadArray is empty
				var virginArray = (loadArray.length == 0);
				
                // Get the current ruleset using ID				
				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);

				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();
				
//				FBTrace.sysout("ruleMapping " , ruleMapping);
				
				// Get the rules associated with the criterionNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) {
					  ruleset = OAA.requirements[r].rules;
					} // endif
				} // endfor
				
				// define an object to store rule results				
				var ruleResArray = new Object();
				
				// create a results array for each criteriaNumber in a ruleset
				for (var expr in  ruleset) {
				  ruleResArray[expr] = new Array();
				}  // endif
				
//				FBTrace.sysout(" ruleResArray ", ruleResArray);
				
				// Go through the ruleset by context
				// expr is the context for a group of rules
				for (var expr in ruleMapping) {

//    				FBTrace.sysout("=================" );
//    				FBTrace.sysout("Criteria Number: " + expr );

				    // get dom nodes associated with the context with the rules for the
					var ele = getCollectionViaDom(expr, doc);
					
					// eleRules has the rules associated with the current context
					var eleRules = ruleMapping[expr];
					
					// if the context is 'document' the array is the document
					if (expr == "document") {
					  ele[0] = doc;
					} // endif  
					 
					 
					for (var r = 0; r < eleRules.length; ++r) {
						var rule = eleRules[r];
						
  //     				    FBTrace.sysout("-RuleID: " + rule.id );
						
						// check to see if rule is in the ruleset
						if (ruleset[rule.id]) {
						
						    // if there is nothing in the array create a return objects
							if (virginArray) { 
							    // create a return data structure
								var retStruct = {
									stickyResult: false,
									result: true,
									id: rule.id,
									severityCode: ruleset[rule.id].severityCode.toLowerCase(),
									messageCode: ruleset[rule.id].messageCode,
									msgArgs: []
								} // end retStruct
								
								// is rule index suppose to be a global variable ??
								// The length of the array would always be zero??
								ruleIndex = loadArray.length;
								loadArray.push(retStruct);
								nodes = new Array();
							} else {
							
							    // see if the rule is already in the loadArray
								ruleIndex = -1;
								for (var i = 0; i < loadArray.length && ruleIndex == -1; ++i) {
								  if(loadArray[i].id == rule.id) { 
								    ruleIndex = i;
								  } // endif  
								} // endfor
								
								// test to see if nodes has been defined for this rule
								if (typeof loadArray[ruleIndex].nodes != 'undefined') {
								  nodes = loadArray[ruleIndex].nodes; 
								} else {
								  nodes = new Array();
								} // endif
								  
							} // endif
							
							// go through the nodes assocaited with the context of the current rule
							for (var i = 0; i < ele.length; ++i) {
							
                                // Are there any dependencies for executing this rule
							    // dependices are items that are missing from the markup like alt and title attributes, and elements like h1 							  
								var dependencies = false;
								if (rule.dependencies) for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									dependencies = (ruleResArray[rule.dependencies[d]][i] == false);
								}
//								if (rule.dependencies) FBTrace.sysout(rule.id + " dependencies " + rule.dependencies + 'dependencies' + dependencies, ruleResArray);

                                // If all dependencies are satisfied validate the node using the rule
								if (!dependencies) {			                	
								    
								    // Validate the rule with a node
									var ruleRet = rule.validate(ele[i]);
									
									// save the results based on rule ID
									ruleResArray[rule.id][i] = ruleRet.result;
//							        if (rule.id == 'titleMissingH1Words')FBTrace.sysout(rule.id + " ruleRet ", ruleRet);							

                                    // Check to see if the rule passed
									if (ruleRet.result == false) {
									
									    // Check to see if result is finalized (stickey??)
									    // Is ruleIndex a global variable??
										if (!loadArray[ruleIndex].stickyResult) {
																				    
											loadArray[ruleIndex].result = false;
											// 
											if (ruleRet.nodes) { 
											
											    // add the nodes that failed this rule to the nodes array
												for (var n = 0; n < ruleRet.nodes.length; ++n) { 
												
												  // make sure the node is defined
												  if (ruleRet.nodes[n] != 'undefined') {
												     nodes.push(ruleRet.nodes[n]);
												  } // endif
												  
												} // endfor
												
											} // endif

// Why is this not executed??
//											if (expr == "document" && typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs;

                                            // Check 
											if (typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs; //duplicateID is not a document rule
										} // endif
										
	 								} else if (ruleRet.result == true){ //if test passed & document level & no result nodes do not let other frames change the fact that a test passed 
										if (expr == "document" && typeof loadArray.nodes == 'undefined') {
											loadArray[ruleIndex].result = true;
											loadArray[ruleIndex].stickyResult = true; //do not allow this the be changed in the future
										}
									} else if (ruleRet.result == -1) { //rule did not run successfully
										if (!loadArray[ruleIndex].stickyResult) {
											loadArray[ruleIndex].result = false;
											loadArray[ruleIndex].severityCode = 'level.manual';
											if (typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs;
										}
									}
								} 
							}
							if (typeof nodes!= 'undefined' && nodes.length > 0) {
								loadArray[ruleIndex].nodes = nodes;
							}
						}
					}
				}
		//		FBTrace.sysout("loadArray " , loadArray);
			} // endwith
		} catch (ex) {
			FBTrace.sysout('runRuleGroup exception: ', ex);
		}  // endtry
	},

    OAAParseDoc: function(criterionNumber, indoc) {
        try {
	        var i;
	        var sortedIssueOffenders = [];
	        var severitySum = [0,0,0,0,0]
	        var messages = [];
	        var severity = [];
	        var severityCode = [];
	    	
	  	    var eleArray = new Array();	
			var doc = jQuery(indoc); 
	 	    
			if (criterionNumber == '2.4.1'){
				AINSPECTOR.OAA_Nexus.runRuleGroup(criterionNumber, indoc, eleArray);
			} else {
				var framesJQ = doc.find('frame, iframe');
				var frames = [ doc.get(0)];
				if (frames.length > 0) {
					for (i = 0; i < framesJQ.length; i++) {
						frames.push(framesJQ.get(i).contentDocument);
					}
				}
				for (j = 0; j < frames.length; j++) {
					doc = jQuery(frames[j]);
					AINSPECTOR.OAA_Nexus.runRuleGroup(criterionNumber, doc.get(0), eleArray);
					doc.get(0).removeEventListener("focus", this.onFocusTrap, true);
					doc.get(0).addEventListener("focus", this.onFocusTrap, true);
		 		}
			}
			
 	       	if (eleArray.length > 0) {
	            var sortedIssueOffenders = new Array;
	         	var msgType = ['level.violation', 'level.potentialviolation', 'level.recommendation', 'level.potentialrecommendation','level.manual']
	         	for (m = 0; m < msgType.length; m++)  {
					for (var i = 0; i < eleArray.length; ++i) {
						if (eleArray[i].result==false && eleArray[i].severityCode == msgType[m]) { //add the errors by level of severity
							switch (msgType[m]) {
								case 'level.violation': (eleArray[i].nodes) ? severitySum[0] += eleArray[i].nodes.length : severitySum[0] +=1; break;
								case 'level.potentialviolation': (eleArray[i].nodes) ? severitySum[1] += eleArray[i].nodes.length : severitySum[1] +=1; break;
								case 'level.recommendation': (eleArray[i].nodes) ? severitySum[2] += eleArray[i].nodes.length : severitySum[2] +=1; break;
								case 'level.potentialrecommendation': (eleArray[i].nodes) ? severitySum[3] += eleArray[i].nodes.length : severitySum[3] +=1; break;
								case 'level.manual': (eleArray[i].nodes) ? severitySum[4] += eleArray[i].nodes.length : severitySum[4] +=1; break;
							}
							messages[messages.length] = FBL.$STRF(eleArray[i].messageCode, eleArray[i].msgArgs, 'OAA_bundle');

							severity[severity.length] = FBL.$STR(eleArray[i].severityCode, 'OAA_bundle');
							severityCode[severityCode.length] = eleArray[i].severityCode;
							if (eleArray[i].nodes) {
								messages[messages.length-1] = messages[messages.length-1] + AINSPECTOR.util.plural(' (%num% element%s%)', eleArray[i].nodes.length);
								sortedIssueOffenders[sortedIssueOffenders.length] = (eleArray[i].nodes)? eleArray[i].nodes : null;
							}
						}
					}
	         	}
				for (var i = 0; i < eleArray.length; ++i) { //add all passes
					if (eleArray[i].result==true) {
						messages[messages.length] = FBL.$STRF(eleArray[i].messageCode, ["<>"], 'OAA_bundle');
						severity[severity.length] = FBL.$STR('level.pass', 'OAA_bundle');
						severityCode[severityCode.length] = 'level.pass';
						sortedIssueOffenders[sortedIssueOffenders.length] = null;
					}
				}
						
	// multiple errors on one node will count multiple times!!
	          	var score = this.calculateScore(eleArray.length, severitySum);
	          	var result = {
	 	        	   score: score,
		      	       message: messages.join('\n'),
		      	       severity: severity,
		      	       severityCode: severityCode,
		       		   components: sortedIssueOffenders
		       	}
				//FBTrace.sysout("result " , result);
	          	return result;
	       	}
	       	else { //no element, attrs, match the criteria
	      	    return {
		       		score: -1,
		       		message: FBL.$STR('msg.unenforced', 'A11y_bundle'),
		       	   }
	      	}
        } catch (err) {
        	FBTrace.sysout('OAAParseDoc: ' + err.message);
        }
    },
/*    
    runContext: function(ruleDef, index, indoc, node) {
    	if (ruleDef.rules[index].context != undefined) { // look for a rule context first
    		if (ruleDef.rules[index].context instanceof Function) return ruleDef.rules[index].context(indoc, node);
    		else return this.byEle(indoc, node, ruleDef.rules[index].context)
    	} else { //default to the ruleset context
    		if (ruleDef.context instanceof Function) return ruleDef.context(indoc, node);
    		else return this.byEle(indoc, node, ruleDef.context);
    	}
    }, */
    
    byEle: function(indoc, node, eleName) {
    	if (eleName.indexOf('[@aria-*]') > -1) {
    		var loadArray = [];
    		var selected = jQuery(indoc).find('*:aria');
    		for(var j=0; j<selected.length; j++) loadArray.push(selected.get(j));
    		return loadArray;
    	}
    	
    	var indocArr = [];
    	indocArr.push(indoc);
    	if (node != null) return (node.tagName == eleName) ? true : false
    	return (eleName == "document" ) ? indocArr : indoc.getElementsByTagName(eleName)
     },

	formatNoChange: function(issueObj, retStruct) {
		try {
			for (var i = 0; i < issueObj.msg.length; i++) {
				retStruct.msg.push(issueObj.msg[i]);
				retStruct.attr.push(issueObj.attr[i]);
				retStruct.severityCode.push(issueObj.severityCode[i]);
			}
			
		} catch (exc){
			FBTrace.sysout(exc);
		}
	},
	
	/* 
	*  formatAEParseNodeResults
	*
	* @param (object) issueObj 
	* @param (object) retStruct
	*
	* @return nothing
	*/
	
    formatAEParseNodeResults: function(issueObj, retStruct) {
		try {
			var issueObjArray = retStruct.msg; 
			var issueObjAttrArray = retStruct.attr; 
			var attrNames = null;
			var issueNames = issueObj.displayDetails.accessIssuesDataElementNames;
			
			//
			
			if (issueObj.displayDetails.accessIssuesAttrNames) {
			    attrNames = issueObj.displayDetails.accessIssuesAttrNames;
			}  // endif
			
			for (j = 0; j < issueNames.length; j++) {
			
				if (issueObj[issueNames[j]]) {
				
					var unenforced = FBL.$STR('msg.unenforced', 'OAA_bundle');
					var accessIssuesMsg = issueObj.displayDetails.accessIssuesMessages[j];
					var severity = AINSPECTOR.OAA_Nexus.AccessExt.getErrMsgSeverity(accessIssuesMsg, AINSPECTOR.controller.default_ruleset_id);
					
					if (severity != unenforced) {
						issueObjArray.push(severity + ': ' + FBL.$STR(accessIssuesMsg, 'OAA_bundle'));
						
						if (attrNames != null) {
						  issueObjAttrArray.push(attrNames[j]);
						} else {
						  issueObjAttrArray.push('');
						} // endif
						
					} // endif
					
				} // endif
			}  // endfor
			
			return;
			
		} catch (exc){
			FBTrace.sysout(exc);
		}

	},	
	
    addRuleset: function(rulesetID) {
        // first register our custom rules.
        //
        //WCAG 2.0 OAA common rules
        //for each ruleset register rule and then ruleset
    	var ele = new Object();
    	var weights = new Object();
    	var gIndex = new Object();
    	if (typeof OpenAjax == "undefined" ) alert('typeof OpenAjax == "undefined"');
    	else if (typeof OpenAjax.a11y == "undefined") alert('typeof OpenAjax.a11y == "undefined"');
    	var OAA = OpenAjax.a11y.getRuleset(rulesetID);
    	for (var rs = 0; rs < OAA.requirements.length; rs++) {
        	try {
        		var eleProp = OAA.requirements[rs].criterionNumber;
                ele[eleProp] = {};
                weights[eleProp] = 1;
                
 		        AINSPECTOR.registerRule({
		        	id: OAA.requirements[rs].criterionNumber,
				    name: OpenAjax.a11y.RULESET_CODES[OAA.requirements[rs].criterionNumber], // the bundle has not been loaded yet FBL.$STR(OAA.requirements[rs].criterionNumber, 'OAA_bundle'), 
				    info: OpenAjax.a11y.RULESET_CODES[OAA.requirements[rs].criterionDesc], // the bundle has not been loaded yet
				    category: ['content'],
				    url: OAA.baseReqUrl + OAA.requirements[rs].requirementUrl,
				    formatParseEleResults: AINSPECTOR.OAA_Nexus.formatNoChange,
				    conifg: {
				    },
				    lint: function(indoc, cset, config) {
				    	return AINSPECTOR.OAA_Nexus.OAAParseDoc(this.id, indoc);
				    },
				    parseEle: function(tn, node) {
				 	    return AINSPECTOR.OAA_Nexus.OAAParseEle(this.id, node);
				    }
 		        });
 	    
	    	} catch (e) {
	    		FBTrace.sysout(e);
	    	}
        }
    	// register the ruleset itself
        AINSPECTOR.registerRuleset({
        	id: OAA.id,
        	name: OpenAjax.a11y.RULESET_CODES[OAA.nameCode],
            rules: ele,
      	  	weights: weights
      	});
	}, 

};

if (typeof AINSPECTOR == "undefined") {
    alert("A11y Inspector is not found.");

} else {
    // register ruleset.
    AINSPECTOR.OAA_Nexus.init();
}

