
  //
  // OpenAjax Alliance Rules 
  // Rule group: Landmark and Header Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 29: Title element should not be empty.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_29", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_29", 
      groupCode     : "GROUP_2", 
      context: "document", 
      validate: function (ruleContext) { 
  var titleNodes = ruleContext.getElementsByTagName("title"); 
  var passed = titleNodes.length == 1 && util.getNodeTextRecursively(titleNodes[0]).length > 0; 
  return new ValidationResult(passed, titleNodes, '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 30: Missing or empty H1 element.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_30", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_30", 
      groupCode     : "GROUP_2", 
      context: "document", 
      validate: function (ruleContext) { 
  var h1Nodes = ruleContext.getElementsByTagName("h1"); 
  var emptyH1Nodes = []; 
  for (var i = 0; i < h1Nodes.length; ++i) { 
    var h1Node = h1Nodes[i]; 
    if (util.getNodeTextRecursively(h1Node).length == 0) { 
      emptyH1Nodes.push(h1Node); 
    } // endif
  } // endfor
  
  var passed = (h1Nodes.length == 1 || h1Nodes.length == 2) && emptyH1Nodes.length == 0; 
  
  return new ValidationResult(passed, emptyH1Nodes, '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 31: H1 element content should not come only from the alt text of an image.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_31", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_31", 
      groupCode     : "GROUP_2", 
      context: "h1", 
      dependencies  : ["RULE_30",],
      validate: function (ruleContext) { 
  var h1Text = util.getNodeTextRecursively(ruleContext); 
  var passed = h1Text != util.getDisplayableAlt(ruleContext); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 32: H1 should match a subset of the words in the title element.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_32", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_32", 
      groupCode     : "GROUP_2", 
      context: "document", 
      dependencies  : ["RULE_29",],
      validate: function (ruleContext) { 
 
	var retNodeArr = new Array();
	var titleMissingH1WordsText = '';
	var missingWordArray = new Array();
	var titleNode = ruleContext.getElementsByTagName("title")[0];
	var titleText = xbrowser.getTextContent(titleNode).replace(/^\s*|\s*$/g,"").replace(/\s+/g,' ');
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
			} //end for 
			if (!found) { 
				titleMissingH1Words = true; 
				var k=0; 
				while(k < missingWordArray.length && h1WordsArray[h1Index] != missingWordArray[k]) { 
					k++; 
				} //end while 
				if (k >= missingWordArray.length) {
					missingWordArray[missingWordArray.length] = h1WordsArray[h1Index];
				} //endif
			} //endif
		} //end for
		if (titleMissingH1Words) retNodeArr.push(h1Node);
	} //endfor
	if (retNodeArr.length > 0) retNodeArr.push(titleNode);
	if (missingWordArray.length > 0) {
		titleMissingH1WordsText = missingWordArray.join(" ");
	}  //endif
	var passed = !titleMissingH1Words;
	return new ValidationResult(passed, retNodeArr, '', '', [titleMissingH1WordsText]);
}  // endif
 
 
      },
           
    // ------------------------
    // Rule 33: No more than two h1 elements.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_33", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_33", 
      groupCode     : "GROUP_2", 
      context: "document", 
      validate: function (ruleContext) { 
  var h1Nodes = ruleContext.getElementsByTagName("h1"); 
  var emptyH1Nodes = []; 
  for (var i = 0; i < h1Nodes.length; ++i) { 
    var h1Node = h1Nodes[i]; 
    if (util.getNodeTextRecursively(h1Node).length == 0) { 
      emptyH1Nodes.push(h1Node); 
    } // endif
  } // endfor
  var passed = (h1Nodes.length <= 1); 
  return new ValidationResult(passed, h1Nodes, '', '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 39: Headings must have text content.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_39", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_39", 
      groupCode     : "GROUP_2", 
      context: "h1 | h2 | h3 | h4 | h5 | h6", 
      validate: function (ruleContext) { 
	var passed = util.getNodeTextRecursively(ruleContext).length > 0; 
	return new ValidationResult(passed, [ruleContext], [], '', []); 
}
 
 
      },
           
    // ------------------------
    // Rule 40: Text content for a headings must not come just from image alt text.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_40", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_40", 
      groupCode     : "GROUP_2", 
      context: "h2 | h3 | h4 | h5 | h6", 
      dependencies  : ["RULE_39",],
      validate: function (ruleContext) { 
  var headingText = util.getNodeTextRecursively(ruleContext).length > 0; 
  var passed = headingText != util.getDisplayableAlt(ruleContext); 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 41: Heading content should be concise.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_41", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_41", 
      groupCode     : "GROUP_2", 
      context: "h2 | h3 | h4 | h5 | h6", 
      validateParams: { 
      max_heading_text_length: { value: 60, type: 'Integer' },
     }, 
      dependencies  : ["RULE_39",],
      validate: function (ruleContext) { 
  var passed = util.getNodeTextRecursively(ruleContext).length < this.validateParams.max_heading_text_length.value; 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 42: Heading elements should be properly nested.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_42", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_42", 
      groupCode     : "GROUP_2", 
      context: "h2 | h3 | h4 | h5 | h6", 
      validate: function (ruleContext) { 
  var isAriaHeading = ruleContext.getAttribute("role") == "heading";
	var levelStr, xpathExpr;
	if (isAriaHeading) {
		levelStr = ruleContext.getAttribute("aria-level");
		xpathExpr = "preceding::*[@aria-level = '" + (parseInt(levelStr) - 1) + "'";
	} else {
		levelStr = ruleContext.tagName.charAt(1);
		xpathExpr = "preceding::h" + (parseInt(levelStr) - 1);
	}
	var xpathResult = OpenAjax.a11y.xpath.evaluate(xpathExpr, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
	var passed = xpathResult.iterateNext() != null;
		return new ValidationResult(passed, [ruleContext], [], '', []);
	} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 43: The content of the headings of the same level within the same section should be unique.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_43", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_43", 
      groupCode     : "GROUP_2", 
      context: "document", 
      validate: function (ruleContext) {
  var loadArray = new Array();
  var xpathResult = ruleContext.evaluate("//h1|//h2|//h3|//h4|//h5|//h6", ruleContext, util.defaultNSResolver, XPathResult.ANY_TYPE, null);
  var r = xpathResult.iterateNext();
  while (r) {
    loadArray[loadArray.length] = {node: r, text: util.getNodeTextRecursively(r).toLowerCase(), level: r.tagName.charAt(1), siblingDupName: false};
    r = xpathResult.iterateNext();
  } // endwhile
  
  for (var i=0, j=0, n=loadArray.length; i<n; i++) {                    
    for (j=i+1; j<n; j++) {              
      if (loadArray[i].level == loadArray[j].level) { 
        if (loadArray[i].text==loadArray[j].text) { 
          //determine if siblings 
          var sibs = true; 
          for (var k=j; k > i && sibs; k--) {
            if (loadArray[j].level != loadArray[k].level) {	sibs = false;}
          }  // endfor
          
          if (sibs) {
            loadArray[i].siblingDupName=loadArray[j].siblingDupName=true;
          }  // endif
          
        } // endif
      }	// endif
    }  // endfor
  } // endfor
  
  var sibDupArray = new Array();
  
  for (var i=0; i<loadArray.length; i++) { 
    if (loadArray[i].siblingDupName) { 
      sibDupArray.push(loadArray[i].node);              
    } // endif  
  } // endfor  
  
  var passed = (sibDupArray.length==0); 
  
  return new ValidationResult(passed, sibDupArray, [], '', []); 
}  // endfunction 
 
 
      }, 
           
    // ------------------------
    // Rule 44: Heading elements (h1..h6) should be used for structuring information on the page. 
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     { 
      id            : "RULE_44", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_44", 
      groupCode     : "GROUP_2", 
      context: "document", 
      dependencies  : ["RULE_39",],
      validate: function (ruleContext) { 
	var _headers = ['h2', 'h3', 'h4', 'h5', 'h6']; 
	var _definedRoles = ['application','banner','complementary','contentinfo','main','navigation','search']; 
    var hNodes = ruleContext.getElementsByTagName("h1"); 
    for (var i = 0; i < _headers.length && hNodes.length == 0; ++i)  { 
		hNodes = ruleContext.getElementsByTagName(_headers[i]); 
	} //end for 
    if (hNodes.length == 0) { 
    	for (var i = 0; i < _definedRoles.length; ++i) { 
       	    var xpathResult = OpenAjax.a11y.xpath.evaluate("//*[@role='" + _definedRoles[i] + "']", ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null); 
            if (xpathResult.iterateNext() != null) return new ValidationResult(true, [], [], '', []); 
            } //endif 
    } //endif 
	/* SMF TODO need to check <link rel=X> -- still necessary? */
	var passed = !(hNodes.length == 0);
	return new ValidationResult(passed, [], [], '', []);
} // endfunction
 
 
 
      },
           
    // ------------------------
    // Rule 61: Title content should be concise.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_61", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_61", 
      groupCode     : "GROUP_2", 
      context: "document", 
      validateParams: { 
      max_title_text_length: { value: 60, type: 'Integer' },
     }, 
      dependencies  : ["RULE_29",],
      validate: function (ruleContext) {
   var passed = xbrowser.getTextContent(ruleContext).normalizeSpacing().length < this.validateParams.max_title_text_length.value;
   return new ValidationResult(passed, [ruleContext], [], '', []);
} // end function
 
 
      },
           
    // ------------------------
    // Rule 62: Title text must contain more than one word.
    // Group 2: Landmark and Header Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_62", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_62", 
      groupCode     : "GROUP_2", 
      context: "document", 
      dependencies  : ["RULE_29",],
      validate: function (ruleContext) {
   var passed = xbrowser.getTextContent(ruleContext).trim().indexOf(' ') > 0;
   return new ValidationResult(passed, [ruleContext], [], '', []);
}
 
 
      },
  ]); 
   }
 
 
        
 