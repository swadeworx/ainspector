AINSPECTOR.OAA_Nexus = { //AINSPECTOR.OAA_Nexus
    urls: {},

    lastLoadTimestamp: undefined,

    init: function() {
        try {
	        AINSPECTOR.OAA_Nexus.addRuleset("WCAG_2_0"); //rendered by reportcardView() in renderers.js
	        AINSPECTOR.OAA_Nexus.addRuleset("IITAA_1_0"); 
        } catch (err) {
            alert("AINSPECTOR.OAA_Nexus: " + err.message);
        }
    },

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
        }
     	return score;
    },
    
    onFocusTrap: function(event) {
        try {
        	var rc = AINSPECTOR.controller.callAllParseNode(event.target);
        	if (rc.msg != '') {
        		Firebug.Console.log(rc.msg);
        //		FBTrace.sysout(event.target.nodeName + ' onFocusTrap rc.msg: ' +  rc.msg, event.target);
        	}
        } catch (err) {
        	FBTrace.sysout('onFocusTrap: ' + err.message);
        }
    },
    
    nodeSatisfiesContext : function (node, context) {
		with (OpenAjax.a11y) {
	    	if (typeof context == "string") { // what about typeof context == "function" (getCollectionViaDom() same issue?)
				var parsedContexts = parseContextExpression(context);
				if (satisfiesContext(parsedContexts, node))  return true;
	    	}
	    	return false;
		}
    },
 
    OAAParseEle: function(criterionNumber, node) {
		try {
			with (OpenAjax.a11y) {
				var retStruct = {
						id: new Array(),
						msg: new Array(),
						attr: new Array(),
						severityCode: new Array()
					}

				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);
				var ruleMapping = rulesByContext();
				
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) ruleset = OAA.requirements[r].rules;

				}
				var ruleResArray = new Object();
				for (var expr in  ruleset) ruleResArray[expr] = new Array();;

				for (var expr in ruleMapping) {
					var eleRules = ruleMapping[expr];
					if (expr != "document"){
						for (var r = 0; r < eleRules.length; ++r) {
							var rule = eleRules[r];
				//			if (ruleset[rule.id]) FBTrace.sysout(rule.id + " nodeSatisfiesContext: " + this.nodeSatisfiesContext(node, rule.context));
							if (ruleset[rule.id] && this.nodeSatisfiesContext(node, rule.context)) {
								var dependencies = false;
								if (rule.dependencies) for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									dependencies = (ruleResArray[rule.dependencies[d]] == false);
								}
								if (!dependencies) {
									ruleRet = rule.validate(node);
									ruleResArray[rule.id] = ruleRet.result;
									if (!ruleRet.result) {
										retStruct.id.push(rule.id);
										retStruct.msg.push(FBL.$STR(ruleset[rule.id].severityCode.toLowerCase(), 'OAA_bundle') + ': ' + FBL.$STRF(ruleset[rule.id].messageCode, ruleRet.msgArgs, 'OAA_bundle'));
										retStruct.attr.push(ruleRet.attrs);
										retStruct.severityCode.push(ruleset[rule.id].severityCode.toLowerCase());
				//						FBTrace.sysout(rule.id +  " @@ retStruct " , retStruct);
									}
								} 
							}
						}
					}
				}
		//		FBTrace.sysout("retStruct " , retStruct);
				return (retStruct.msg.length > 0) ? retStruct : null;
			}
		} catch (ex) {
			FBTrace.sysout('runRuleGroup exception: ', ex);
		}
	},
	
	/* run runRuleGroup and return the results in the same format as OAAParseEle	*/
    runDocContextRules: function(criterionNumber, doc, loadArray) {
		try { 
			with (OpenAjax.a11y) {
				var retStruct = {
						id: new Array(),
						msg: new Array(),
						attr: new Array(),
						severityCode: new Array()
					}

				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);
				if (OAA == null) return null; // OAA rule set is not active 
				var ruleMapping = rulesByContext();
				
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) ruleset = OAA.requirements[r].rules;
				}
				if (ruleset == null) return null; // user specified a criterion number which is invalid or has no rules

				for (var expr in ruleMapping) {
					var eleRules = ruleMapping[expr];
					if (expr == "document") {
						for (var r = 0; r < eleRules.length; ++r) { //for all rules with a context of document 
							var rule = eleRules[r];
							if (typeof(ruleset[rule.id]) != 'undefined'){ //rule is a member of our criterionNumber 
								var dependencies = false;
								if (rule.dependencies) for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									dependencies = (this.runRule(rule.dependencies[d], doc).length != 0);
								}
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
												}
											}
										}
									}
								}
							} 
						}
					}
				}
			}
		//	FBTrace.sysout("retStruct " , retStruct);
			return (retStruct.msg.length > 0) ? retStruct : null;
		} catch (ex) {
			FBTrace.sysout('runDocContextRules exception: ', ex);
		}
	},
	
    runRule: function(ruleID, doc) {
		try {
			with (OpenAjax.a11y) {
				var broken = new Array();
				var rule = getRule(ruleID);
				if (rule.dependencies) for (var d = 0; d < rule.dependencies.length; ++d) {
					var ruleRetArr = this.runRule(rule.dependencies[d], doc);
					if (ruleRetArr.length != 0) {
						FBTrace.sysout(rule.id + " dependencies " + rule.dependencies  + ' failed ' + rule.dependencies[d]);
						return ruleRetArr;
					}
				}
				if (rule.dependencies) FBTrace.sysout(rule.id + " dependencies " + rule.dependencies + ' PASSED ');
				var ele = getCollectionViaDom(rule.context, doc);
				if (rule.context == "document") ele[0] = doc;
				for (var i = 0; i < ele.length && broken.length == 0; ++i) {
					var ruleRet = rule.validate(ele[i]);
					ruleRet.ruleId = ruleID;
					if (!ruleRet.result) broken.push(ruleRet);
				}
				return broken;
			} 
		} catch (ex) {
			FBTrace.sysout('runRule exception: ', ex);
		}
	},
  
    runRuleGroup: function(criterionNumber, doc, loadArray) {
		try {
			with (OpenAjax.a11y) {
				var virginArray = (loadArray.length == 0);
				var OAA = getRuleset(AINSPECTOR.controller.default_ruleset_id);
				var ruleMapping = rulesByContext();
//				FBTrace.sysout("ruleMapping " , ruleMapping);
				
				var ruleset = null;
				for (var r = 0; r < OAA.requirements.length && ruleset == null; ++r) { 
					if (OAA.requirements[r].criterionNumber == criterionNumber) ruleset = OAA.requirements[r].rules;

				}
				var ruleResArray = new Object();
				for (var expr in  ruleset) ruleResArray[expr] = new Array();;
//				FBTrace.sysout(" ruleResArray ", ruleResArray);
				
				for (var expr in ruleMapping) {
					var ele = getCollectionViaDom(expr, doc);
					var eleRules = ruleMapping[expr];
					if (expr == "document") ele[0] = doc;
					for (var r = 0; r < eleRules.length; ++r) {
						var rule = eleRules[r];
						if (ruleset[rule.id]) {
							if (virginArray) { 
								var retStruct = {
									stickyResult: false,
									result: true,
									id: rule.id,
									severityCode: ruleset[rule.id].severityCode.toLowerCase(),
									messageCode: ruleset[rule.id].messageCode,
									msgArgs: []
								}
								ruleIndex = loadArray.length;
								loadArray.push(retStruct);
								nodes = new Array();
							} else {
								ruleIndex = -1;
								for (var i = 0; i < loadArray.length && ruleIndex == -1; ++i) if(loadArray[i].id == rule.id) ruleIndex = i; 
								if (typeof loadArray[ruleIndex].nodes != 'undefined') nodes = loadArray[ruleIndex].nodes; else nodes = new Array();
							}
							for (var i = 0; i < ele.length; ++i) {
								var dependencies = false;
								if (rule.dependencies) for (var d = 0; d < rule.dependencies.length && !dependencies; ++d) {
									dependencies = (ruleResArray[rule.dependencies[d]][i] == false);
								}
//								if (rule.dependencies) FBTrace.sysout(rule.id + " dependencies " + rule.dependencies + 'dependencies' + dependencies, ruleResArray);

								if (!dependencies) {			                	
									var ruleRet = rule.validate(ele[i]);
									ruleResArray[rule.id][i] = ruleRet.result;
		//							if (rule.id == 'titleMissingH1Words')FBTrace.sysout(rule.id + " ruleRet ", ruleRet);							

									if (!ruleRet.result) {
										if (!loadArray[ruleIndex].stickyResult) {
											loadArray[ruleIndex].result = false;
											if (ruleRet.nodes) { 
												for (var n = 0; n < ruleRet.nodes.length; ++n) if (ruleRet.nodes[n] != 'undefined') nodes.push(ruleRet.nodes[n]);
											}
//											if (expr == "document" && typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs;
											if (typeof ruleRet.msgArgs != 'undefined') loadArray[ruleIndex].msgArgs = ruleRet.msgArgs; //duplicateID is not a document rule
										}
	 								} else { //if test passed & document level & no result nodes do not let other frames change the fact that a test passed 
										if (expr == "document" && typeof loadArray.nodes == 'undefined') {
											loadArray[ruleIndex].result = true;
											loadArray[ruleIndex].stickyResult = true; //do not allow this the be changed in the future
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
				//FBTrace.sysout("loadArray " , loadArray);
			}
		} catch (ex) {
			FBTrace.sysout('runRuleGroup exception: ', ex);
		}
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
	
    formatAEParseNodeResults: function(issueObj, retStruct) {
		try {
			var issueObjArray = retStruct.msg; 
			var issueObjAttrArray = retStruct.attr; 
			var attrNames = null;
			var issueNames = issueObj.displayDetails.accessIssuesDataElementNames;
			if (issueObj.displayDetails.accessIssuesAttrNames) {
			    attrNames = issueObj.displayDetails.accessIssuesAttrNames;
			}
			for (j = 0; j < issueNames.length; j++) {
				if (issueObj[issueNames[j]]) {
					var unenforced = FBL.$STR('msg.unenforced', 'OAA_bundle');
					var accessIssuesMsg = issueObj.displayDetails.accessIssuesMessages[j];
					var severity = AINSPECTOR.OAA_Nexus.AccessExt.getErrMsgSeverity(accessIssuesMsg, AINSPECTOR.controller.default_ruleset_id);
					if (severity != unenforced) {
						issueObjArray.push(severity + ': ' + FBL.$STR(accessIssuesMsg, 'OAA_bundle'));
						if (attrNames != null) issueObjAttrArray.push(attrNames[j]);
						else issueObjAttrArray.push('');
					}
				}
			}
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
				    url: OAA.requirements[rs].baseReqUrl + OAA.requirements[rs].requirementUrl,
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

