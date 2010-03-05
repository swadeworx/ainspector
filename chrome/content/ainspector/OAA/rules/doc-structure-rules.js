with (OpenAjax.a11y) {
	addRules([
	          // --------
	          // title/H!
	          // --------
	          
	          {
	              id : "titleMissingOrEmpty",
	              context : "document",
	              validate : function (ruleContext) {
	              var titleNodes = ruleContext.getElementsByTagName("title");
	              var passed = titleNodes.length == 1 && util.getNodeTextRecursively(titleNodes[0]).length > 0;
	                  return new ValidationResult(passed, titleNodes, '', '', []);
	              }
	          },
	          
	  	    {
	  	        id : "titleTextLength",
	  	        context : "title",
	  	        dependencies : ["titleMissingOrEmpty"],
	  	        validateParams : {
	        	  max_title_text_length : {value:60, type:"integer"}
	          },
	  	        validate : function (ruleContext) {
	  	            var passed = ruleContext.textContent.normalizeSpacing().length < this.validateParams.max_title_text_length.value;
	  	            return new ValidationResult(passed, [ruleContext], [], '', []);
	  	        }
	  	    },
	  	
	  	    {
	  	        id : "titleTextOneWord",
	  	        context : "title",
	  	        dependencies : ["titleMissingOrEmpty"],
	  	        validate : function (ruleContext) {
	  	            var passed = ruleContext.textContent.trim().indexOf(' ') > 0;
	  	            return new ValidationResult(passed, [ruleContext], [], '', []);
	  	        }
	  	    },
	  	
	          {
	              id : "h1MissingOrEmpty",
	              context : "document",
	              validate : function (ruleContext) {
	              var h1Nodes = ruleContext.getElementsByTagName("h1");
	              var emptyH1Nodes = [];
	              for (var i = 0; i < h1Nodes.length; ++i) {
	                  var h1Node = h1Nodes[i];
	                  if (util.getNodeTextRecursively(h1Node).length == 0) {
	                      emptyH1Nodes.push(h1Node);
	                  }
	              }
	              
	              var passed = (h1Nodes.length == 1 || h1Nodes.length == 2) && emptyH1Nodes.length == 0;
	                  return new ValidationResult(passed, emptyH1Nodes, '', '', []);
	              }
	          },
	          
	          {
              id : "toomanyh1",
              context : "document",
              validate : function (ruleContext) {
              var h1Nodes = ruleContext.getElementsByTagName("h1");
              var emptyH1Nodes = [];
              for (var i = 0; i < h1Nodes.length; ++i) {
                  var h1Node = h1Nodes[i];
                  if (util.getNodeTextRecursively(h1Node).length == 0) {
                      emptyH1Nodes.push(h1Node);
                  }
              }
              
              var passed = (h1Nodes.length <= 1);
                  return new ValidationResult(passed, h1Nodes, '', '', []);
              }
	          },
	          
	          {
	              id : "h1OnlyAlt",
	              context : "h1",
	              dependencies : ["h1MissingOrEmpty"],
	              validate : function (ruleContext) {
	                  var h1Text = util.getNodeTextRecursively(ruleContext);
	                  var passed = h1Text != util.getDisplayableAlt(ruleContext);
	                  return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          
	          {
	              id : "titleMissingH1Words",
	              context : "document",
	              dependencies : ["titleMissingOrEmpty"], //do not include "h1MissingOrEmpty" since we can have 2 valid H1s
	              validate : function (ruleContext) {
	        	  	  var retNodeArr = new Array();
	                  var titleMissingH1WordsText = '';
	                  var missingWordArray = new Array();
	                  var titleNode = ruleContext.getElementsByTagName("title")[0];
	                  var titleText = titleNode.textContent.replace(/^\s*|\s*$/g,"").replace(/\s+/g,' ');
	                  var tmp = titleText.replace(/[^a-zA-Z0-9]\s+/g, ' '); 
	                  var titleWordsArray = tmp.toLowerCase().split(' '); 
	                  
	                  var h1Arr = ruleContext.getElementsByTagName("h1");
	  				  for (var i=0; i<h1Arr.length; i++) {     
	  					  var h1Node = h1Arr[i];
		                  var h1Text = util.getNodeTextRecursively(h1Node);
		                  tmp = h1Text.replace(/[^a-zA-Z0-9]\s+/g, ' '); 
		                  var h1WordsArray = tmp.toLowerCase().split(' '); 
		                  for(var h1Index =0, titleMissingH1Words = false; h1Index < h1WordsArray.length; h1Index++) {
		                      for(var titleIndex=0, found = false; titleIndex < titleWordsArray.length && !found; titleIndex++) {
		                          found = h1WordsArray[h1Index] == titleWordsArray[titleIndex];
		                      }
		                      if (!found) {
		                          titleMissingH1Words = true; 
		                          var k=0;
		                          while(k < missingWordArray.length && h1WordsArray[h1Index] != missingWordArray[k]) {
		                        	  k++;
		                          }
		                          if (k >= missingWordArray.length) {
		                        	  missingWordArray[missingWordArray.length] = h1WordsArray[h1Index];
		                       }
		                      }
		                  }
		                  if (titleMissingH1Words) retNodeArr.push(h1Node);
	  				  }
	  				  if (retNodeArr.length > 0) retNodeArr.push(titleNode);
	                  if (missingWordArray.length > 0) {
	                      titleMissingH1WordsText = missingWordArray.join(" ");
	                  }

	                  var passed = !titleMissingH1Words;
	                  return new ValidationResult(passed, retNodeArr, '', '', [titleMissingH1WordsText]);
	              }
	          },
	       // -------- 
	       // data tables
	       // --------
	          {
	              id : "missingsummary",
	              context : ".dataTable",
	              validate : function (ruleContext) {
		              var passed = (util.getValueFromAttributes(ruleContext,['summary'],'') != '')
		              return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "missingheaders",
	              context : ".dataTable",
	              validate : function (ruleContext) {
	              	var passed = false;
	              	var node = ruleContext;
		  			var r,c;
					var thColCount=0,thRowCount = 0;
				   //contains data from tablenode.tHead.rows &  tablenode.tFoot.rows
					if (node.rows[0].cells.length > 1) {
						for (c=0; c < node.rows[0].cells.length; c++) {  // the first cell in each column has a header
							if (node.rows[0].cells[c].tagName.toLowerCase() == 'th' && node.rows[0].cells[c].textContent.normalizeSpacing() != '') {thColCount++;}
						}
						if (node.rows[0].cells.length == thColCount) passed = true;
					}
					if (!passed) {
						if (node.rows.length > 1){
							for (r=0; r < node.rows.length; r++) {
								if (node.rows[r].cells[0].tagName.toLowerCase() == 'th' && node.rows[r].cells[0].textContent.normalizeSpacing() != '') {thRowCount++;}
							}
							if (node.rows.length == thRowCount) passed = true;
						}
						if (node.rows[0].cells.length-1 == thColCount && node.rows.length-1 == thRowCount) passed = true;
					}  
	                return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "duplicatesummary",
	              context : "table[@summary]",
	              dependencies : ["missingsummary"], 
	              validate : function (ruleContext) {  
		              var passed = true;
		              var summary = util.getValueFromAttributes(ruleContext,['summary'],"");
			          var count = 0;
	//	              var xp = "//table[translate(@summary,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + summary.toLowerCase() + "']";
		              var xp = "//table[@summary='" + summary + "']"; /* SMF TODO make case insensitive */
			          var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
			          var r = xpathResult.iterateNext();
			          while (r && count < 2) {
		    	    		count++;
		    	    		r = xpathResult.iterateNext();
			          }
			          var passed = (count < 2);
	                  return new ValidationResult(passed, [ruleContext], '', '', []);
	              }
	          },
	          {
	              id : "thmissingID",
	              context : ".complexDataTable",
	              validate : function (node) {
		            var passed = true;
	              	var r,c;
				 	for (r=0; r < node.rows.length && passed; r++) { 
						for (c=0; c < node.rows[r].cells.length && passed; c++) {
							if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') {
								var id = util.getValueFromAttributes(node.rows[r].cells[c],['id'],"");
								if	(id == '') {passed = false;}
							}
						}
					}
		            
	                return new ValidationResult(passed, [node], '', '', []);
	              }
	          },
	          {
	              id : "duplicateTHEleID",
	              context : ".complexDataTable",
	              validate : function (node) {
	              	var r,c;
					var idarray = new Array();
					var duparray = new Array();
				 	for (r=0; r < node.rows.length; r++) { 
						for (c=0; c < node.rows[r].cells.length; c++) {
							if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') {
								var id = util.getValueFromAttributes(node.rows[r].cells[c],['id'],"");
								if	(id != '') {if (!util.addToArray(id, idarray)) duparray.push(id);}
							}
						}
					}
	              	var passed = (duparray.length == 0);
	                return new ValidationResult(passed, [node], '', '', [duparray.join(', ')]);
	              }
	          },
	          {
	              id : "tdmissingheaders",
	              context : ".complexDataTable",
	              validate : function (node) {
	              	var passed = true;
	              	var r,c;
					var idarray = new Array();
				 	for (r=0; r < node.rows.length && passed; r++) { 
						for (c=0; c < node.rows[r].cells.length && passed; c++) {
							if (node.rows[r].cells[c].tagName.toLowerCase() == 'td') {
								var headersStr = util.getValueFromAttributes(node.rows[r].cells[c],['headers'],"");
								if (headersStr.length == 0) {passed = false;}
							}
						}
					}
	                return new ValidationResult(passed, [node], '', '', []);
	              }
	          },
	          {
	              id : "invalidIDREF",
	              context : ".complexDataTable",
	              validate : function (node) {
	              	var r,c;
					var idarray = new Array();
					var notfoundarray = new Array();
				 	for (r=0; r < node.rows.length; r++) { 
						for (c=0; c < node.rows[r].cells.length; c++) {
							if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') {
								var id = node.rows[r].cells[c].hasAttribute("id") ? node.rows[r].cells[c].getAttribute("id").normalizeSpacing() : ""; 
								if	(id != '') {util.addToArray(id, idarray);}
							}
							if (node.rows[r].cells[c].tagName.toLowerCase() == 'td') {
								var headersStr = util.getValueFromAttributes(node.rows[r].cells[c],['headers'],"");
								if (headersStr.length > 0) {
									var headers = headersStr.split(' ');
									for (i = 0, found = false; i < headers.length && !found; i++) { // this is probably going to be too time expensive
										for(var j=0;j < idarray.length && !found; j++) {if(headers[i]==idarray[j]) found = true;}
										if (!found) {util.addToArray(headers[i], notfoundarray);}
									}
								}
							}
						}
					}
	              	var passed = (notfoundarray.length == 0);
	                return new ValidationResult(passed, [node], '', '', [notfoundarray.join(",")]);
	              }
	          },
				// -------- 
				// events
				// --------
				{
				     id : "missingonfocus",
				     context : "*[@onmouseover]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "missingonblur",
				     context : "*[@onmouseout]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "nonfocusableonclick",
				     context : "*[@onclick]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "nonfocusableonmouse",
				     context : "*[@onmouseover | onmouseout]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "selectonchange",
				     context : "select[@onchange]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "missingkeyequiv",
				     context : "*[@onmousedown | onmouseup | onmousemove]",
				     validate : function (ruleContext) {
			    		var passed = true;
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
	          
		      // -------- 
		      // Accesskeys
		      // --------
		      {
		           id : "duplicateAccesskey",
		           context : "*[@accesskey]",
		           validate : function (ruleContext) {
	    	   			var accesskey = util.getValueFromAttributes(ruleContext, ['accesskey'], "");
	    	   			var xp = "//*[@accesskey='" + accesskey + "']";
		          		var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
			    		var count = 0;
	    	   			var r = xpathResult.iterateNext();
			    		while (r && count < 2) {
			    			count++;
			    			r = xpathResult.iterateNext();
			    		}
			            var passed = (count < 2);
			            return new ValidationResult(passed, [ruleContext], 'accesskey', '', []);
		           }
		       },
			      {
		           id : "ieconflict",
		           context : "*[@accesskey]",
		           validate : function (ruleContext) {
		    	   		var accesskey = util.getValueFromAttributes(ruleContext, ['accesskey'], "");
						var ieShortCuts='aefhtv';
						var passed = (ieShortCuts.indexOf(accesskey.toLowerCase()) == -1);
						return new ValidationResult(false, [ruleContext], 'accesskey', '', []);
		           }
		       },
		       
			   // -------- 
			   // textstyling
			   // --------
			   {
			        id : "blinkmarquee",
			        context : "blink | marquee",
			        validate : function (ruleContext) {
				        return new ValidationResult(false, [ruleContext], '', '', []);
			        }
			    },
				// -------- 
				// frames
				// --------
				{
				     id : "framemissingtitle",
				     context : "frame | iframe",
				     validate : function (ruleContext) {
	    	   			var passed = (util.getValueFromAttributes(ruleContext, ['title'], "").length != 0);
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
				{
				     id : "frameduplicatetitle",
				     context : "frameset",  
				     validate : function (ruleContext) {
	    	            var frameArr = new Array();
	    	            var xp = "//frame[@title]";  /* SMF TODO only check sibs not cal children - get duplicates with nested framesets */
	    	            var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
	        	    	var r = xpathResult.iterateNext();
	        	    	while (r) {
	        		    	var title = util.getValueFromAttributes(r, ['title'], "");
	        	    		if (title != '') frameArr.push({node:r, title: title.toLowerCase(), duplicatetitle: false});
	        	    		r = xpathResult.iterateNext();
	        	    	}
	        			for (var i=0, n=frameArr.length; i<n; i++) {  
	        				for (j=i+1; j<n; j++) {  
	        					if (frameArr[j].title==frameArr[i].title) { frameArr[i].duplicatetitle=frameArr[j].duplicatetitle=true;}	
	        				}
	        			}
	    	            var dupArr = new Array();
	        			for (var i=0; i<frameArr.length; i++) if (frameArr[i].duplicatetitle) dupArr.push(frameArr[i].node);
 	    	            var passed = (dupArr.length == 0);
					    return new ValidationResult(passed, dupArr, '', '', []);
				     }
				 },
				{
				     id : "emptyframe",
				     context : "frame | iframe",
				     validate : function (ruleContext) {
			    		var passed = (util.getValueFromAttributes(ruleContext, ['src'], "").length != 0);
						if (passed) {
							var r = util.getNodeDocPosition(ruleContext);
							if (r.x < 0 || r.y < 0 || r.width <= 0 || r.height <= 0) {
								passed = false;
							}		
						}
					    return new ValidationResult(passed, [ruleContext], '', '', []);
				     }
				 },
	          
	          // --------
	          // headings
	          // --------
	          
	          {
	        id : "headingTextMissing",
	        // should context include WAI-ARIA headings?
	        context : "h1 | h2 | h3 | h4 | h5 | h6",
	        validate : function (ruleContext) {
	            var passed = util.getNodeTextRecursively(ruleContext).length > 0;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	
	    {
	        id : "headingOnlyAlt",
	        context : "h2 | h3 | h4 | h5 | h6",
	        dependencies : ["headingTextMissing"],
	        validate : function (ruleContext) {
	            var headingText = util.getNodeTextRecursively(ruleContext).length > 0;
	            var passed = headingText != util.getDisplayableAlt(ruleContext);
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    
	    {
	        id : "siblingDupName",
	        context : "document",
	        validate : function (ruleContext) {
	    		var loadArray = new Array();
    	    	var xpathResult = ruleContext.evaluate("//h1|//h2|//h3|//h4|//h5|//h6", ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
    			var r = xpathResult.iterateNext();
    			while (r) {
    				loadArray[loadArray.length] = {node: r, text: util.getNodeTextRecursively(r).toLowerCase(), level: r.tagName.charAt(1), siblingDupName: false};
    				r = xpathResult.iterateNext();
    			}  
				for (var i=0, j=0, n=loadArray.length; i<n; i++) {                    
					for (j=i+1; j<n; j++) {              
						if (loadArray[i].level == loadArray[j].level) {
							if (loadArray[i].text==loadArray[j].text) { //determine if siblings
								var sibs = true;
								for (var k=j; k > i && sibs; k--) {
									if (loadArray[j].level != loadArray[k].level) {	sibs = false;}
								}
								if (sibs) {loadArray[i].siblingDupName=loadArray[j].siblingDupName=true;}
							}
						}	
					}
				}
				var sibDupArray = new Array();
				for (var i=0; i<loadArray.length; i++)  if (loadArray[i].siblingDupName) sibDupArray.push(loadArray[i].node);                 
	            var passed = (sibDupArray.length==0);
	            return new ValidationResult(passed, sibDupArray, [], '', []);
	        }
	    },
	    
	    {
	        id : "noHeaders",
            context : "document",
	        dependencies : ["headingTextMissing"],
	        validate : function (ruleContext) {
				var _headers = ['h2', 'h3', 'h4', 'h5', 'h6'];
				var _definedRoles = ['application','banner','complementary','contentinfo','main','navigation','search'];
      			var hNodes = ruleContext.getElementsByTagName("h1");
            	for (var i = 0; i < _headers.length && hNodes.length == 0; ++i)  hNodes = ruleContext.getElementsByTagName(_headers[i]);
             	if (hNodes.length == 0) {
             		for (var i = 0; i < _definedRoles.length; ++i) {
                	    var xpathResult = ruleContext.evaluate("//*[@role='" + _definedRoles[i] + "']", ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
            	    	if (xpathResult.iterateNext() != null) return new ValidationResult(true, [], [], '', []);
             		}
            	}
             	/* SMF TODO need to check <link rel=X> -- still necessary? */
  	            var passed = !(hNodes.length == 0);
	            return new ValidationResult(passed, [], [], '', []);
	        }
	    },
	
	    {
	        id : "headingTextLength",
	     // should context include WAI-ARIA headings?
	        context : "h2 | h3 | h4 | h5 | h6",
	        dependencies : ["headingTextMissing"],
  	        validateParams : {
	        	  max_heading_text_length : {value:60, type:"integer"}
	          },
	        validate : function (ruleContext) {
	            var passed = util.getNodeTextRecursively(ruleContext).length < this.validateParams.max_heading_text_length.value;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	
	    {
	        id : "headingImproperNesting",
	     // should context include WAI-ARIA headings?
	        context : "h2 | h3 | h4 | h5 | h6",
	        validate : function (ruleContext) {
			var isAriaHeading = ruleContext.getAttribute("role") == "heading";
			var levelStr, xpathExpr;
			if (isAriaHeading) {
				levelStr = ruleContext.getAttribute("aria-level");
				xpathExpr = "preceding::*[@aria-level = '" + (parseInt(levelStr) - 1) + "'";
			} else {
				levelStr = ruleContext.tagName.charAt(1);
				xpathExpr = "preceding::h" + (parseInt(levelStr) - 1);
			}
	    	var xpathResult = ruleContext.ownerDocument.evaluate(xpathExpr, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
			var passed = xpathResult.iterateNext() != null;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    // -------- 
	    // Links
	    // --------
        {
            id : "linktooshort",
            context : "a",
	  	    validateParams : {
	        	max_text_length : {value:4, type:"integer"}
	        },
	  	    validate : function (ruleContext) {
	  	    	var passed = util.getNodeTextRecursively(ruleContext).length > this.validateParams.max_text_length.value;
	  	        return new ValidationResult(passed, [ruleContext], [], '', []);
	  	    }

        },
        {
            id : "sameURLdiffLinks",
            context : "document",
            validate : function (ruleContext) {
            	var passed = true;
            	var loadArray = new Array();
            	var retArray = new Array();
        		for (var j = 0; j < ruleContext.links.length; j++) {
 	        		var link4Cmp = ruleContext.links[j].href.toLowerCase();
					link4Cmp = link4Cmp.replace(/\bdefault.[a-z]*|\bindex.[a-z]*/,'');
					var obj = {node: ruleContext.links[j],
							text: util.getNodeTextRecursively(ruleContext.links[j]).toLowerCase(),
							link4Cmp: link4Cmp}
					loadArray[loadArray.length] = obj;
				}
				for (var j = 0; j < loadArray.length; j++) {
					for (var k = j + 1; k < loadArray.length; k++) {
						if (loadArray[j].link4Cmp == loadArray[k].link4Cmp && loadArray[j].text != loadArray[k].text) {
							loadArray[j].sameURLdiffLinks = true;
							loadArray[k].sameURLdiffLinks = true;
							passed = false;
						}
					}
				}
				for (var j = 0; j < loadArray.length; j++) {
					if (loadArray[j].sameURLdiffLinks) { 
						retArray.push(loadArray[j])
					}
				}
   				return new ValidationResult(passed, retArray, '', '', []); 
	    	}
        },
        {
            id : "sameLinkdiffURL",
            context : "document",
            validate : function (ruleContext) {
            	var passed = true;
            	var loadArray = new Array();
            	var retArray = new Array();
        		for (var j = 0; j < ruleContext.links.length; j++) {
 	        		var link4Cmp = ruleContext.links[j].href.toLowerCase();
					link4Cmp = link4Cmp.replace(/\bdefault.[a-z]*|\bindex.[a-z]*/,'');
					var obj = {node: ruleContext.links[j],
							text: util.getNodeTextRecursively(ruleContext.links[j]).toLowerCase(),
							link4Cmp: link4Cmp}
					loadArray[loadArray.length] = obj;
				}
            	for (var j = 0; j < loadArray.length; j++) {
					for (var k = j + 1; k < loadArray.length; k++) {
						if (loadArray[j].text == loadArray[k].text && loadArray[j].link4Cmp != loadArray[k].link4Cmp) {
							loadArray[j].sameLinkdiffURL = true;
							loadArray[k].sameLinkdiffURL = true;
							passed = false;
						}
				}
				for (var j = 0; j < loadArray.length; j++) {
					if (loadArray[j].sameLinkdiffURL) { 
						retArray.push(loadArray[j])
					}
				}
				
			}
   				return new ValidationResult(passed, retArray, '', '', []); 
	    	}
        },
        {
            id : "imgTooSmall",
            context : "a",
            validate : function (ruleContext) {
            	var passed = true;
   				if(ruleContext.childNodes && !ruleContext.textContent) {
			      for(var i=0; i<ruleContext.childNodes.length; i++) {
				  	if(ruleContext.childNodes[i].tagName) {
						if (ruleContext.childNodes[i].tagName.toLowerCase() == "img") {
							if (ruleContext.childNodes[i].clientWidth < 16 || ruleContext.childNodes[i].clientHeight < 16) {
								passed = false;
							}
						}	
					}	
			      }
   				}
   				return new ValidationResult(passed, [ruleContext], '', '', []); 
	    	}
	    	
        },
        {
            id : "altequaltextcontent",
            context : "a",
            validate : function (ruleContext) {
            	var passed = true;
 	            var linkText = ruleContext.textContent.normalizeSpacing();
	 		    var alt = util.getDisplayableAlt(ruleContext);
	 		   	if((alt != '') && (linkText.toLowerCase() == alt.toLowerCase())) {
					passed = false;
     			}
   				return new ValidationResult(passed, [ruleContext], '', '', []); 
	    	}
        },	      		
 			    
	    // -------- 
	    // Language
	    // --------
        {
            id : "langMissing",
            context : "document",
            validate : function (ruleContext) {
            	var theNodes = ruleContext.getElementsByTagName("html");
            	if (theNodes.length == 1) {
            		var langStr = util.getValueFromAttributes(theNodes[0],['lang'],"");
            		var passed = (langStr.length > 0);
            		return new ValidationResult(passed, theNodes[0], '', '', []); 
             	}
   				return new ValidationResult(false, theNodes[0], '', '', []); 
	    	}
        },
	    {
	           id : "invalidLanguage",
	           context : "html[@lang]", //"*[@lang]"
	           dependencies : ["langMissing"],
	           validate : function (ruleContext) {
	    			var langStr = util.getValueFromAttributes(ruleContext,['lang'],"");
					var target;
					if (langStr.indexOf('-') == 2) target = langStr.substr(0,2).toLowerCase();
					else target = langStr.toLowerCase();
					var passed = false;
					var oRequest = new XMLHttpRequest();
					oRequest.open("GET","http://www.iana.org/assignments/language-subtag-registry",false);
					oRequest.setRequestHeader("User-Agent",navigator.userAgent);
					oRequest.send(null);
					
					if (oRequest.status==200) {
						var contents = oRequest.responseText;
						var pos = contents.indexOf('Subtag: ' + target + '\n');
						if (pos > 0) passed = true;
					}
					else {
//						accessext_consoleDump(filename + " Error executing XMLHttpRequest call, does the file exist?");
					}

		           return new ValidationResult(passed, [ruleContext], 'lang', '', []);
	           }
	    },
	    
        // --------
        // Forms!
        // --------
	    {
	        id : "missinglegend",
	        context : "fieldset",
	        validate : function (ruleContext) {
				var legendFound = false;
				for (var legend = 0; legend < ruleContext.childNodes.length && !legendFound; legend++) {
					if (ruleContext.childNodes[legend].tagName &&
							ruleContext.childNodes[legend].tagName.toLowerCase() == 'legend') {
						legendFound = true;
					}
				}
	            return new ValidationResult(legendFound, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "encapsulatinglabel",
	        context : "label",
	        validate : function (ruleContext) {
				var tagFound = false;
				for (var legend = 0; legend < ruleContext.childNodes.length && !tagFound; legend++) {
					if (ruleContext.childNodes[legend].tagName) {
						var lc = ruleContext.childNodes[legend].tagName.toLowerCase();
						if (lc == 'select' || lc == 'textarea')	tagFound = true;
					}
				}
	            return new ValidationResult(!tagFound, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "missinglabelandtitle",
	        context : "input[@type == 'text'] | input[@type == 'password'] | input[@type == 'checkbox'] | input[@type == 'radio'] | input[@type == 'file'] | textarea | select",
	        validate : function (ruleContext) {
		        var retStruct = util.parseLabel(ruleContext);
		        var passed = (retStruct.label != null);	
		        return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "missingaltandtitle",
	        context : "input[@type == 'image']",
	        validate : function (ruleContext) {
	        	var retStruct = util.parseLabel(ruleContext);
	        	var passed = (retStruct.label != null);	
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "missingvalueandtitle",
	        context : "input[@type == 'button'] | input[@type == 'submit'] | input[@type == 'reset']",
	        validate : function (ruleContext) {
	        	var retStruct = util.parseLabel(ruleContext);
	        	var passed = (retStruct.label != null);	
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "missingbuttoncontent",
	        context : "button",
	        validate : function (ruleContext) {
				var retStruct = util.parseLabelFromButton(ruleContext);
	            var passed = (retStruct.label != null);	            
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "emptylable",
	        context : "label",
	        validate : function (ruleContext) {
	    		var passed = ruleContext.textContent.normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "emptylegend",
	        context : "legend",
	        validate : function (ruleContext) {
	    		var passed = ruleContext.textContent.normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
	        }
	    },
	    {
	        id : "emptytitle",
	        context : "button[@title] | input[@title] | textarea[@title] | select[@title]",
	        validate : function (ruleContext) {
	    		var passed = ruleContext.getAttribute('title').normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], 'title', '', []);
	        }
	    },
	    {
	        id : "duplicatelabel",
	        context : "document",
	        validate : function (ruleContext) {
	    		var dataarray = new Array();
	            var xp = "//button|//input|//textarea|//select";
	            var xpathResult = ruleContext.evaluate(xp, ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
		    	var r = xpathResult.iterateNext();
		    	while (r) {
		    		var formObj = { node: r, label: util.parseLabel(r).label, legend: null, duplicatelabel: false }
		    		formObj.legend = util.getFieldSetNodeLegendForElement(r);
					if (formObj.label != null) formObj.label = formObj.label.toLowerCase();
					if (formObj.legend != null) formObj.legend = formObj.legend.toLowerCase(); 
					dataarray.push(formObj);
		    		r = xpathResult.iterateNext();
		    	}
	    		var retArray = new Array();
	    		var retMsgArray = new Array();
				for (var i=0, j=0, n=dataarray.length; i<n; i++) {    
					if (dataarray[i].label == null) continue;              
					var effLab1 = dataarray[i].legend + ' ' + dataarray[i].label;          
					for (j=i+1; j<n; j++) {  
						if (dataarray[j].label == null) continue;  
						var effLab2 = dataarray[j].legend + ' ' + dataarray[j].label;          
						if (effLab1 == effLab2) {
							dataarray[i].duplicatelabel=dataarray[j].duplicatelabel=true;
						}	
					}
				}
				for (var i=0; i < dataarray.length;i++) {
					if (dataarray[i].duplicatelabel) {
						retArray.push(dataarray[i].node);
						if (dataarray[i].legend != null) retMsgArray.push(dataarray[i].legend + ' ' + dataarray[i].label);
						else retMsgArray.push(dataarray[i].label);
					}
				}
				
	            var passed = (retArray.length == 0);
	            return new ValidationResult(passed, retArray, [], '', retMsgArray);
	        }
	    },
	    {
	        id : "duplicateFormEleID",
	        context : "button[@id] | input[@id] | textarea[@id] | select[@id]",
	        validate : function (ruleContext) {
	    		var count = 0;
	            var id = ruleContext.getAttribute('id');
	            var xp = "//button[@id='" + id + "']|//input[@id='" + id + "']|//textarea[@id='" + id + "']|//select[@id='" + id + "']";
	            var xpathResult = ruleContext.ownerDocument.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
    	    	var r = xpathResult.iterateNext();
    	    	while (r && count < 2) {
    	    		count++;
    	    		r = xpathResult.iterateNext();
    	    	}
	            var passed = (count < 2);
	            return new ValidationResult(passed, [ruleContext], 'id', '', [id]);
	        }
	    }
	    
	
	]);
	}
