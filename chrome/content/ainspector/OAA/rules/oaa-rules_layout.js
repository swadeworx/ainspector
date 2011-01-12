
  //
  // OpenAjax Alliance Rules 
  // Rule group: Layout Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 14: Do not use nested tables for positioning.
    // --------
	          
     {
      id: "rule_14", 
      groupTitle: "Layout Rule", 
      groupId: "oaa-rules_layout", 
      context: "document", 
      validate: function (ruleContext) { 
  var passed = true; 
  var loadArray = new Array(); 
  // Find all tables that ae nested in another table 
  var xpathResult = ruleContext.evaluate("//table", ruleContext, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE,null); 
  var r = xpathResult.iterateNext(); 
  while (r!= null) { 
    var xpathResult1 = ruleContext.evaluate(".//table", r, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE,null); 
    var r1 = xpathResult1.iterateNext(); 
    while( r1 ) { 
      // check to see if nested table is a data table 
      if( !util.isDataTable(r1) ) { 
        // if not a data table mark the table as a violation 
        loadArray[loadArray.length] = { node: r1, text: util.getNodeTextRecursively(r1).toLowerCase() }; 
        passed = false; 
       } // endif 
       r1 = xpathResult1.iterateNext(); 
     } // endwhile 
     r = xpathResult.iterateNext(); 
  } // endwhile 
  return new ValidationResult(passed, loadArray, '', '', []); 
} // endfunction


      },
  ]); 
   }


        

