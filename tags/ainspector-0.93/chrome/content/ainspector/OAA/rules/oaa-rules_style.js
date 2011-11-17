
  //
  // OpenAjax Alliance Rules 
  // Rule group: Styling Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 15: Color contrast ratio must be > 3 for large text
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_15", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_15", 
      groupCode     : "GROUP_7", 
      context: "#text", 
      validate: function (ruleContext) { 
  var node = ruleContext.parentNode; 
  if (node.ownerDocument.defaultView.getComputedStyle) { 
    var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(node); 
    var passed = contrastObj.luminosity > 3; return new ValidationResult(passed, [node], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]); 
  } else { 
    //getComputedStyle does not exist return new ValidationResult(-1, [node], '', '', []); 
  } // endif 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 16: Color contrast ratio should be > 4.5
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_16", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_16", 
      groupCode     : "GROUP_7", 
      context: "#text", 
      dependencies  : ["RULE_15",],
      validate: 
  function (ruleContext) { 
    var node = ruleContext.parentNode; 
    if (node.ownerDocument.defaultView.getComputedStyle) { 
      var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(node); 
      var passed = contrastObj.luminosity > 4.5; 
      return new ValidationResult(passed, [node], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]); 
    } else { 
      //getComputedStyle does not exist 
      return new ValidationResult(-1, [node], '', '', []); 
    } // endif
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 17: Do not use the FONT element to style text
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_17", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_17", 
      groupCode     : "GROUP_7", 
      context: "font", 
      validate: function (ruleContext) { 
  var passed = false; 
  return new ValidationResult(passed, [ruleContext], '', '', []); }
 
 
      },
           
    // ------------------------
    // Rule 25: The blink and marquee elements must not be used. 
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_25", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_25", 
      groupCode     : "GROUP_7", 
      context: "blink | marquee", 
      validate: function (ruleContext) { 
  return new ValidationResult(false, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 58: Do not use the B element.
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_58", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_58", 
      groupCode     : "GROUP_7", 
      context: "document", 
      validate: function (ruleContext) { 
	var passed = true;
	var loadArray = new Array();
	//var	xp = "//b|//blink|//i|//marquee|//u";
	var xpathResult = OpenAjax.a11y.xpath.evaluate("//b", ruleContext, OpenAjax.a11y.util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
	var r = xpathResult.iterateNext();
	//FBTrace.sysout('xpathResult: '+ xpathResult);
	while (r) {
		loadArray[loadArray.length] = {node: r,
		text: util.getNodeTextRecursively(r).toLowerCase()};
		r = xpathResult.iterateNext();
		passed = r!= null;
	} //endwhile
	return new ValidationResult(passed, loadArray, '', '', []);
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 59: Do not use the I element.
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_59", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_59", 
      groupCode     : "GROUP_7", 
      context: "document", 
      validate: function (ruleContext) { 
	var passed = true;
	var loadArray = new Array();
	var xpathResult = OpenAjax.a11y.xpath.evaluate("//i", ruleContext, OpenAjax.a11y.util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
	var r = xpathResult.iterateNext();
	while (r) {
		loadArray[loadArray.length] = {node: r,
		text: util.getNodeTextRecursively(r).toLowerCase()};
		r = xpathResult.iterateNext();
		passed = r!= null;
	} //end while
	return new ValidationResult(passed, loadArray, '', '', []);
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 60: Do not use the U element.
    // Group 7: Styling Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_60", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_60", 
      groupCode     : "GROUP_7", 
      context: "document", 
      validate: function (ruleContext) { 
	var passed = true;
	var loadArray = new Array();
	var xpathResult = OpenAjax.a11y.xpath.evaluate("//u", ruleContext, OpenAjax.a11y.util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
	var r = xpathResult.iterateNext();
	while (r) {
		loadArray[loadArray.length] = {node: r,
		text: util.getNodeTextRecursively(r).toLowerCase()};
		r = xpathResult.iterateNext();
		passed = r!= null;
	} //endwhile
	return new ValidationResult(passed, loadArray, '', '', []);
} // endfunction
 
 
      },
  ]); 
   }
 
 
        
 