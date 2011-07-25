/* See license.txt for terms of usage */

AINSPECTOR.OAA_Nexus = { //AINSPECTOR.OAA_Nexus
  urls: {},
  lastLoadTimestamp: undefined,
  /*
   * init
   * Check which rule sets are available and add them to the available rules
   * @return nothing
   */
  init: function() {
    try {
				
	    AINSPECTOR.OAA_Nexus.addRuleset("WCAG_2_0"); //rendered by reportcardView() in renderers.js
	  //  AINSPECTOR.OAA_Nexus.addRuleset("IITAA_1_0");
	    // AINSPECTOR.OAA_Nexus.addRuleset("ARIA_1_0");
    } catch (err) {
      alert("AINSPECTOR.OAA_Nexus: " + err.message);
    } // endtry
  },

  /*
   * calculateScore
   * @param (integer) numEle - nomber of rules in a ruleset
   * @param (array of integers) severitySum - nomber of violations, recommendations, PV and PR passed
   * @param (array of integers) receivedSeverity - nomber of violations, recommendations, PV and PR in a ruleset
   * @return (integer)
   */
  calculateScore: function (requirementNumber, numEle, severitySum, receivedSeverity) {
    var score;

    if (receivedSeverity[0]== 0 && receivedSeverity[2] == 0) { // no violations and no recommendations and Pv/PR is failed
      if (receivedSeverity[1] != severitySum[1] || receivedSeverity[3] != severitySum[3]) {
        score = 1; //M
        return score;
      }
    }
    if (receivedSeverity[2] == 0) { //when no recommendations
      if (receivedSeverity[0] == severitySum[0]) { //check if violations are passed
        if (receivedSeverity[1] != 0 || receivedSeverity[3] != 0) { //check for PV or PR
          if (receivedSeverity[1] == severitySum[1] && receivedSeverity[3] == severitySum[3]) { //check if PV & PR are passed
            score = 100; //A
          } else {
            score = 99; // A+M
          }
        } else { //if no PV or PR in a ruleset
          score = 100; //A
        }
      } else { //if violations are failed, check % of fails
        var errPercent = (receivedSeverity[0] - severitySum[0])*100/numEle;
        if ((100 - errPercent) >= 90) {
          if (receivedSeverity[1] == 0) { //check if there are any PV
            score = 80; // C
          } else { //check pv is a fail/pass
            score = (receivedSeverity[1] == severitySum[1]) ? 80 : 79;  //80 - C; 79 - C + M
          }
        } else if ((100 - errPercent) >= 50) {
          score = 60; //D
        } else {
          score = 40; //F
        }
      }
    } else { //when there are recommendations in a ruleset
      var recpmmendationFlag = (receivedSeverity[2] == severitySum[2]) ? true : false;   //If recommendataions are passed
      if (receivedSeverity[0] == severitySum[0]) {
        if (receivedSeverity[1] != 0 || receivedSeverity[3] != 0) { //check for PV or PR
          if (recpmmendationFlag) {
            if (receivedSeverity[1] == severitySum[1] && receivedSeverity[3] == severitySum[3]) { //check if PV & PR are passed
              score = 100; //A
            } else {
              score = 99; // A+M
            }
          } else { // if recommendations fail
            score = (receivedSeverity[1] != 0 && receivedSeverity[1] == severitySum[1]) ? 90 : 89;  //90 - B; 89 - B + M
          }
        } else { //if no PV or PR in a ruleset
          if (recpmmendationFlag == true) {
            score = 100; //A
          } else {
            score = 90; //B
          }
        }
      } else {
        var errPercent = (receivedSeverity[0] - severitySum[0])*100/numEle;
        if ((100 - errPercent) >= (9*numEle) ) {
          if (receivedSeverity[1] == 0) { //check if there are any PV
            score = 80; // C
          } else { //check pv is a fail/pass
            score = (receivedSeverity[1] == severitySum[1]) ? 80 : 79;  //80 - C; 79 - C + M
          }
        } else if ((100 - errPercent) >= (5*numEle)) {
          score = 60; //D
        } else {
          score = 40; //F
        }
      }
    }

    return score;
  },

  /*
   * onFocusTrap: This runs rules on the node with focus
   * @param (event object) event
   * @return nothing
   */
   onFocusTrap: function(event) {
     try {
       var rc = AINSPECTOR.controller.callAllParseNode(event.target);
       if (rc.msg != '') {
         Firebug.Console.log(rc.msg);
//       FBTrace.sysout(event.target.nodeName + ' onFocusTrap rc.msg: ' +  rc.msg, event.target);
       }  // endif
     } catch (err) {
       FBTrace.sysout('onFocusTrap: ' + err.message);
     } // endtry
  },

  /*
   * nodeSatisfiesContext: This checks to see if the current node statisfies the context requirements
   * @param (node) node  The node to test the context
   * @param (string) context The context is defined for each rule
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

  replaceChar: function(name , args) {
	var str = name;
	var msgArgLength = args.length;
	if (args.length != 0){
	   for (var i = 0; i < msgArgLength; ++i) {
	     var regexp = '%' + (i + 1) + '$S';
	     str = str.replace(regexp, args[i]);
	   }//end for
	}//end if
   	return str;
  },

  /*
   * OAAParseEle: This checks to see if the current node statisfies the context requirements
   * @param (string) requirementNumber The requirementNumber is defined in each ruleset
   * @param (node) node  The node to test the context
   * @return (object) Returns object with rule results
   */
  OAAParseEle: function(requirementNumber, node) {
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
				var OAARuleset = getNLSForRuleset(AINSPECTOR.controller.default_ruleset_id, 'en-us');

				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();

				// Get the rules associated with the requirementNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) {
					if (OAA.requirements[r].requirementNumber == requirementNumber) {
					  ruleset = OAA.requirements[r].rules;
					} // endfor
				} // endfor

				// define an object to store rule results
				var ruleResArray = new Object();

				// intialize the ruleRes for results for each rule associated with the requirementNumber

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
										//retStruct.msg.push(FBL.$STR(ruleset[rule.id].severityCode.toLowerCase(), 'OAA_bundle') + ': ' + FBL.$STRF(ruleset[rule.id].messageCode['message'], ruleRet.msgArgs, 'OAA-bundle'));
										retStruct.msg.push(OAARuleset.severities[ruleset[rule.id].severityCode] + ': ' + AINSPECTOR.OAA_Nexus.replaceChar(OAARuleset.rules[ruleset[rule.id].messageCode]['message'], ruleRet.msgArgs));
										retStruct.attr.push(ruleRet.attrs);
										retStruct.severityCode.push(OAARuleset.severities[ruleset[rule.id].severityCode]);
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

				return (retStruct.msg.length > 0) ? retStruct : null;
			}
		} catch (ex) {
			FBTrace.sysout('runRuleGroup exception: ', ex);
		}
	},

	/**
	* runDocContextRules
	*
	* @param (string) requirementNumber The requirementNumber is defined in the ruleset
	* @param (object) doc  The doc is the document
	* @param (array) loadArray The loadArray
	*
	* @return (retStruct) retStruct formatted as a OAAParseEle
	*/

    runDocContextRules: function(requirementNumber, doc, loadArray) {
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
				var OAARuleset = OpenAjax.a11y.getNLSForRuleset(AINSPECTOR.controller.default_ruleset_id , 'en-us');

				if (OAA == null) {
				  return null; // OAA rule set is not active
				} // endif

				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();

				// Get the rules associated with the requirementNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) {
					if (OAA.requirements[r].requirementNumber == requirementNumber) {
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
							if (typeof(ruleset[rule.id]) != 'undefined'){ //rule is a member of our requirementNumber

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
													loadArray[j].issuesObj.msg.push(OAARuleset.severities[ruleset[rule.id].severityCode] + ': ' + AINSPECTOR.OAA_Nexus.replaceChar(OAARuleset.rules[ruleset[rule.id].messageCode]['message'], ruleRet.msgArgs));
													//loadArray[j].issuesObj.title.push(OAARuleset.rules[ruleset[rule.id].messageCode]['title']);
													loadArray[j].issuesObj.attr.push(ruleRet.attrs);
													loadArray[j].issuesObj.severityCode.push(OAARuleset.severities[ruleset[rule.id].severityCode]);
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
	* @param (String) requirementNumber The requirementNumber is defined in a ruleset
	* @param (object) doc  The doc is the document obbject
	* @param (String) loadArray The loadArray is an array of dom nodes assocaited with each rule
	*
	* @return (object) The return object is an array
	*/

    runRuleGroup: function(requirementNumber, doc, loadArray) {
		try {
			with (OpenAjax.a11y) {

			    // virginArray is a boolean that indicates if loadArray is empty
				var virginArray = (loadArray.length == 0);

                // Get the current ruleset using ID
				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);

				// ruleMapping organizes rules based on the same context
				var ruleMapping = rulesByContext();

//				FBTrace.sysout("ruleMapping " , ruleMapping);

				// Get the rules associated with the requirementNumber
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) {
					if (OAA.requirements[r].requirementNumber == requirementNumber) {
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

						// check to see if rule is in the ruleset
						if (ruleset[rule.id]) {

						    // if there is nothing in the array create a return objects
							if (virginArray) {
							    // create a return data structure
  								var retStruct = {
									stickyResult: false,
									result: true,
									id: rule.id,
									severityCode: ruleset[rule.id].severityCode,
									priorityCode: ruleset[rule.id].priorityCode,
									messageCode: ruleset[rule.id].messageCode,
									msgArgs: [],
									metaData: ''
								} // end retStruct

								// is rule index suppose to be a global variable ??
								// The length of the array would always be zero??
								ruleIndex = loadArray.length;
								loadArray.push(retStruct);
								nodes = new Array();
								failId = new Array();
    						passId = new Array();
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
								  failId = new Array();
	    						passId = new Array();
								} // endif

							} // endif (virginArray)

							// go through the nodes assocaited with the context of the current rule
							for (var i = 0; i < ele.length; ++i) {

                // Are there any dependencies for executing this rule
  					    // dependices are items that are missing from the markup like alt and title attributes, and elements like h1
								var dependencies = false;
  							if (rule.dependencies) {
								   for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									   dependencies = (ruleResArray[rule.dependencies[d]][i] == false);
								   } // endfor
								} // endif

								/* save the test meta data to loadArray and send it to the printable View */
								if (ele[i].tagName == 'SCRIPT') {
									if((ele[i].text).indexOf('OpenAjax.a11y.test.testId') != '-1') {
										loadArray.metaData = ele[i].text;
									}
								}
//							if (rule.dependencies) FBTrace.sysout(rule.id + " dependencies " + rule.dependencies + 'dependencies' + dependencies, ruleResArray);
//              If all dependencies are satisfied validate the node using the rule
								if (!dependencies) {

                  // Validate the rule with a node
									var ruleRet = rule.validate(ele[i]);

									// save the results based on rule ID
									ruleResArray[rule.id][i] = ruleRet.result;
									//if (rule.id == 'titleMissingH1Words')FBTrace.sysout(rule.id + " ruleRet ", ruleRet);
									// Check to see if the rule passed
									if (ruleRet.result == false) {

									    // Check to see if result is finalized (stickey??)
									    // Is ruleIndex a global variable??
										if (!loadArray[ruleIndex].stickyResult) {

											loadArray[ruleIndex].result = false;
											if (ruleRet.nodes) {
											    // add the nodes that failed this rule to the nodes array
												for (var n = 0; n < ruleRet.nodes.length; ++n) {
												  // make sure the node is defined
												  if (ruleRet.nodes[n] != 'undefined') {
												  	var idVal = OpenAjax.a11y.util.getVal(ruleRet.nodes[n], 'id', '');
												   	if(idVal != '') {
												        failId.push(idVal);
												    }
												    nodes.push(ruleRet.nodes[n]);
												    loadArray[ruleIndex].failIDs = failId;
												  } // endif
												} // endfor
											} // endif
											else {
											   var idVal = OpenAjax.a11y.util.getVal(ele[i], 'id', '');
                         if (idVal != '') {
                           failId.push(idVal);
                         }
                         nodes.push(ruleRet.nodes[n]);
											   loadArray[ruleIndex].failIDs = failId;
											}

											// Why is this not executed??
											//if (expr == "document" && typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs;
                                            // Check
											if (typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs; //duplicateID is not a document rule
										} // endif

	 								} else if (ruleRet.result == true){
	 								    //if test passed & document level & no result nodes do not let other frames change the fact that a test passed
										if (expr == "document" && typeof loadArray.nodes == 'undefined') {
											loadArray[ruleIndex].result = true;
											// do not allow this the be changed in the future
											loadArray[ruleIndex].stickyResult = true; //do not allow this the be changed in the future
										} // endif

										if (ruleRet.nodes) {
											// add the nodes that failed this rule to the nodes array

											for (var n = 0; n < ruleRet.nodes.length; ++n) {
												// make sure the node is defined
												if (ruleRet.nodes[n] != 'undefined') {
													var idVal = OpenAjax.a11y.util.getVal(ruleRet.nodes[n], 'id', '');
													if(idVal != ''){
													   passId.push(idVal);
													}
													loadArray[ruleIndex].passIDs = passId;
												} // endif
											} // endfor
										} else {// endif
											var idVal = OpenAjax.a11y.util.getVal(ele[i], 'id', '');
											if(idVal != '') {
												passId.push(idVal);
											}
											loadArray[ruleIndex].passIDs = passId;
										}
									} else if (ruleRet.result == -1) {
									    //rule did not run successfully
										if (!loadArray[ruleIndex].stickyResult) {
											loadArray[ruleIndex].result = false;
											loadArray[ruleIndex].severityCode = 'severity.manual';
											if (typeof ruleRet.msgArgs != 'undefined') {
											  loadArray[ruleIndex].msgArgs = ruleRet.msgArgs;
											} // endif
											var idVal = OpenAjax.a11y.util.getVal(ele[i], 'id', '');
											if(idVal != ''){
                        failId.push(idVal);
                      }
											nodes.push(ruleRet.nodes[n]);
											loadArray[ruleIndex].failIDs = failId;
										} // endif
									} // end ifelse
								} // endif
							} // endfor

							if (typeof nodes!= 'undefined' && nodes.length > 0) {
                loadArray[ruleIndex].nodes = nodes;
							}
/*               if (requirementNumber == '1.1.1') {
                        FBTrace.sysout("nodes: " , loadArray[ruleIndex].nodes);
                  }*/
						}
					}
				}
		//		FBTrace.sysout("loadArray " , loadArray);
			} // endwith
		} catch (ex) {
			//FBTrace.sysout('runRuleGroup exception: ', ex);
		}  // endtry
	},

    OAAParseDoc: function(requirementNumber, requirementLevel, requirementUrl, indoc) {
        try {
	        var i;
	        var sortedIssueOffenders = [];

          /* Used to calcualte grades*/
          // var severitySum = [0,0,0,0,0]
          var severitySum = [0, 0, 0, 0];
          var receivedSeverity = [0, 0, 0, 0]; // [no.of violations, no.of potentialViolations, no.of reccommendations, no.of.potentialReccommendations]

          /* results object properties*/
          var messages = [];
    			var ruleTitles = [];
	        var severity = [];
          var ruleSeverity = [];
   	      var priorityCode = [];
          var priority = [];
	        var severityCode = [];
	      	var ruleID = [];
	  	    var eleArray = new Array();
	  	    var passIDs = [];
	      	var drivenIDs = [];
    			var failIDs = [];
          var resultCode = [];
          ruleSeverityCode = [];

          var doc = jQuery(indoc);
          var OAARuleset = OpenAjax.a11y.getNLSForRuleset(AINSPECTOR.controller.default_ruleset_id , 'en-us');
          requirementLevel = OAARuleset.levels[requirementLevel];
    			if (requirementNumber == '2.4.1'){
			  	  AINSPECTOR.OAA_Nexus.runRuleGroup(requirementNumber, indoc, eleArray);
    			} else {
		    		var framesJQ = doc.find('frame, iframe');
				    var frames = [ doc.get(0)];
				    if (frames.length > 0) {
    					for (i = 0; i < framesJQ.length; i++) {
		    				frames.push(framesJQ.get(i).contentDocument);
				  	  } // end for
				    } //end if
				    for (j = 0; j < frames.length; j++) {
					    doc = jQuery(frames[j]);
    					AINSPECTOR.OAA_Nexus.runRuleGroup(requirementNumber, doc.get(0), eleArray);
		    			doc.get(0).removeEventListener("focus", this.onFocusTrap, true);
				    	doc.get(0).addEventListener("focus", this.onFocusTrap, true);
		 		    } //end for
			    } //end if
 	       	if (eleArray.length > 0) {
	          var sortedIssueOffenders = new Array;
	         	var msgType = ['SEVERITY_VIOLATION', 'SEVERITY_POTENTIAL_VIOLATION','SEVERITY_RECOMMENDATION', 'SEVERITY_POTENTIAL_RECOMMENDATION'];
            for (m = 0; m < msgType.length; m++)  { //add all fails
					    for (var i = 0; i < eleArray.length; ++i) {
						    if (eleArray[i].result == false && eleArray[i].severityCode == msgType[m]) { //add the errors by level of severity
							    if (typeof eleArray[i].failIDs != 'undefined') {
								    var fails = [];
								      for (var failIDIterator = 0; failIDIterator < eleArray[i].failIDs.length; failIDIterator++) {
									      if (eleArray[i].failIDs[failIDIterator] != ""){
										      fails[failIDIterator] = eleArray[i].failIDs[failIDIterator];
									      } //endif
								      }//end for
								      if (fails == '' && fails == 'undefined') {
      									failIDs[failIDs.length] = ['not defined'];
			      					} else {
						      			failIDs[failIDs.length] = fails;
      								} //end ifelse
							    } else {
								    failIDs[failIDs.length] = ['not defined'];
							    } //end if
							    drivenIDs[drivenIDs.length] = drivenIDs[i];
							    switch (msgType[m]) {
								    case 'SEVERITY_VIOLATION': receivedSeverity[0] += 1; break;
    								case 'SEVERITY_POTENTIAL_VIOLATION': receivedSeverity[1] += 1; break;
		    						case 'SEVERITY_RECOMMENDATION':receivedSeverity[2] += 1; break;
				    				case 'SEVERITY_POTENTIAL_RECOMMENDATION': receivedSeverity[0] += 1; break;
						    		//case 'severity.manual': (eleArray[i].nodes) ? severitySum[4] += eleArray[i].nodes.length : severitySum[4] +=1; break;
							    } //end switch
							    ruleID[ruleID.length] = eleArray[i].id;
                  messages[messages.length] = AINSPECTOR.OAA_Nexus.replaceChar(OAARuleset.rules[eleArray[i].messageCode]['message'], eleArray[i].msgArgs);
						    	ruleTitles[ruleTitles.length] = OAARuleset.rules[eleArray[i].messageCode]['title'];
    							severity[severity.length] = OAARuleset.severities[eleArray[i].severityCode]; //result
		    					severityCode[severityCode.length] = eleArray[i].severityCode;
				    			priorityCode[priorityCode.length] = eleArray[i].priorityCode;
                  priority[priority.length] = OAARuleset.priorities[eleArray[i].priorityCode];
                  ruleSeverity[ruleSeverity.length] = OAARuleset.severities[eleArray[i].severityCode];
                  ruleSeverityCode[ruleSeverityCode.length] = eleArray[i].severityCode;
                  resultCode[resultCode.length] = eleArray[i].severityCode;

                  if (eleArray[i].nodes) {
			      				messages[messages.length-1] = messages[messages.length-1] + AINSPECTOR.util.plural(' (%num% element%s%)', eleArray[i].nodes.length);
						      	sortedIssueOffenders[sortedIssueOffenders.length] = (eleArray[i].nodes)? eleArray[i].nodes : null;
						      }//end if
      					}//end if
			      	}//end for
	        }//end if
			    var metaData = '';
			    for (var i = 0; i < eleArray.length; ++i) { //add all passes
					  if(eleArray.metaData != '') {
						  metaData = eleArray.metaData;
					  }//end if
  					if (eleArray[i].result==true) {
	  					ruleID[ruleID.length] = eleArray[i].id;
		  				messages[messages.length] = AINSPECTOR.OAA_Nexus.replaceChar(OAARuleset.rules[eleArray[i].messageCode]['message'], ["<>"]);
              ruleTitles[ruleTitles.length] = OAARuleset.rules[eleArray[i].messageCode]['title'];
              severity[severity.length] = OAARuleset.severities['SEVERITY_PASS'];
              severityCode[severityCode.length] = 'SEVERITY_PASS';

              priorityCode[priorityCode.length] = eleArray[i].priorityCode;
              priority[priority.length] = OAARuleset.priorities[eleArray[i].priorityCode];
              sortedIssueOffenders[sortedIssueOffenders.length] = null;
              ruleSeverity[ruleSeverity.length] = OAARuleset.severities[eleArray[i].severityCode];
              ruleSeverityCode[ruleSeverityCode.length] = eleArray[i].severityCode;
              resultCode[resultCode.length] = 'SEVERITY_PASS';

              /*PBK begin*/
              if (eleArray[i].severityCode == 'SEVERITY_VIOLATION'){
                receivedSeverity[0] += 1;
                severitySum[0] += 1;
              } else if (eleArray[i].severityCode == 'SEVERITY_POTENTIAL_VIOLATION') {
                receivedSeverity[1] += 1;
                severitySum[1] += 1;
              } else if (eleArray[i].severityCode == 'SEVERITY_RECOMMENDATION') {
                receivedSeverity[2] += 1;
                severitySum[2] += 1;
              } else {
                receivedSeverity[3] += 1;
                severitySum[3] += 1;
              }

              if(typeof eleArray[i].passIDs != 'undefined'){
                var passIDs = [];
                for (var passIDIterator = 0; passIDIterator < eleArray[i].passIDs.length; passIDIterator++) {
                  if(eleArray[i].passIDs[passIDIterator] != "") {
                    passIDs[passIDIterator] = eleArray[i].passIDs[passIDIterator];
                  }//end if
                }//end for
                if (passIDs == '' && passIDs == 'undefined') {
                  drivenIDs[drivenIDs.length] = ['not defined'];
							  } else {
								  drivenIDs[drivenIDs.length] = passIDs;
							  }
						  } else {
						    drivenIDs[drivenIDs.length] = ['not defined'];
						  } //end if else
 						  failIDs[failIDs.length] = ['not defined'];
					  } //end if
				  } //end for
          var score = this.calculateScore(requirementNumber, eleArray.length, severitySum, receivedSeverity);
         	var result = {
					  requirementNumber: requirementNumber,  //PBK
					  requirementLevel: requirementLevel,    //PBK
					  requirementUrl: requirementUrl,    //PBK
					  ruleID: ruleID,                    //PBK
	 	        score: score,
		      	message: messages.join('\n'),
		      	severity: severity,
		      	severityCode: severityCode,
            ruleSeverityCode: ruleSeverityCode,
            ruleSeverity: ruleSeverity,       //PBK
		       	components: sortedIssueOffenders,
					  priorityCode: priorityCode,            //PBK
					  priority: priority,
            ruleTitles: ruleTitles,            //PBK
					  drivenIDs: drivenIDs.join('\n'),   //PBK
					  failIDs: failIDs.join('\n'),       //PBK
					  metaData: metaData,                 //PBK
            resultCode: resultCode
		      }
         // FBTrace.sysout("result" , result);
         	return result;
       	} else { //no element, attrs, match the criteria
	        return {
		        score: -1,
		       	message: FBL.$STR('msg.unenforced', 'A11y_bundle'),
		      }
	     }
     } catch (err) {
       // FBTrace.sysout('OAAParseDoc: ' + err.message);
     }
   },

/*    runContext: function(ruleDef, index, indoc, node) {
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
        FBTrace.sysout("Inside addRuleset**********" + this.lang);
    	var ele = new Object();
    	var weights = new Object();
    	var gIndex = new Object();
    	if (typeof OpenAjax == "undefined" ) alert('typeof OpenAjax == "undefined"');
    	else if (typeof OpenAjax.a11y == "undefined") alert('typeof OpenAjax.a11y == "undefined"');
    	var OAA = OpenAjax.a11y.getRuleset(rulesetID);
    	
    	var OAARuleset = OpenAjax.a11y.getNLSForRuleset(rulesetID, 'en-us');
    	for (var rs = 0; rs < OAA.requirements.length; rs++) {
        	try {
        		var eleProp = OAA.requirements[rs].requirementNumber;
            ele[eleProp] = {};
            weights[eleProp] = 1;

 		        AINSPECTOR.registerRule({
		        	id: OAA.requirements[rs].requirementNumber,
					    level: OAA.requirements[rs].requirementLevel,
					    //description: OAA.requirements[rs].criterionDesc,
				      name: OAARuleset.requirements[eleProp]['label'], // the bundle has not been loaded yet FBL.$STR(OAA.requirements[rs].requirementNumber, 'OAA_bundle'),
				      info: OAARuleset.requirements[eleProp]['description'], // the bundle has not been loaded yet
				      category: ['content'],
				      url: OAA.baseReqUrl + OAA.requirements[rs].requirementUrl,
				      formatParseEleResults: AINSPECTOR.OAA_Nexus.formatNoChange,
				      conifg: {
				      },
				      lint: function(indoc, cset, config) {
				    	  return AINSPECTOR.OAA_Nexus.OAAParseDoc(this.id, this.level, this.url, indoc);
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
        	name: OAARuleset.name,
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

