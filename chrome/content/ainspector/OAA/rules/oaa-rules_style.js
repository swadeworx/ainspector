
  //
  // OpenAjax Alliance Rules 
  // Rule group: Styling Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 15: Color contrast ratio must be > 3 for large text
    // --------
	          
     {
      id: "rule_15", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
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
           
    // --------
    // Rule 16: Color contrast ratio should be > 4.5
    // --------
	          
     {
      id: "rule_16", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
      context: "#text", 
      dependencies: ["rule_15",],
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
           
    // --------
    // Rule 17: Do not use the FONT element to style text
    // --------
	          
     {
      id: "rule_17", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
      context: "font", 
      validate: function (ruleContext) { 
  var passed = false; 
  return new ValidationResult(passed, [ruleContext], '', '', []); }


      },
           
    // --------
    // Rule 25: The blink and marquee elements must not be used. 
    // --------
	          
     {
      id: "rule_25", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
      context: "blink | marquee", 
      validate: function (ruleContext) { 
  return new ValidationResult(false, [ruleContext], '', '', []); 
} // endfunction


      },
           
    // --------
    // Rule 58: Do not use the B element.
    // --------
	          
     {
      id: "rule_58", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
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
           
    // --------
    // Rule 59: Do not use the I element.
    // --------
	          
     {
      id: "rule_59", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
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
           
    // --------
    // Rule 60: Do not use the U element.
    // --------
	          
     {
      id: "rule_60", 
      groupTitle: "Styling Rule", 
      groupId: "oaa-rules_style", 
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


        

