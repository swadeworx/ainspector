
 
  //
  // OpenAjax Alliance Rules 
  // Rule group: Accesskey Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 23: Accesskey attribute values should be unique.
    // Group 13: Accesskey Rule
    //
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_23",
      lastUpdated   : "2011-02-11",
      messageCode   : "MESSAGE_23",
      groupCode     : "GROUP_13",
      context: "*[@accesskey]", 
      validate: function (ruleContext) { 
  var accesskey = util.getValueFromAttributes(ruleContext, ['accesskey'], ""); 
  var xp = "//*[@accesskey='" + accesskey + "']"; 
  var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
  var count = 0; 
  var r = xpathResult.iterateNext(); 
  while (r && count < 2) { 
    count++; 
    r = xpathResult.iterateNext(); 
  }  // endwhile
  var passed = (count < 2); 
  return new ValidationResult(passed, [ruleContext], 'accesskey', '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 24: Accesskey attribute values should not interfere with IE shortcuts. 
    // Group 13: Accesskey Rule
    //
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_24",
      lastUpdated   : "2011-02-11",
      messageCode   : "MESSAGE_24",
      groupCode     : "GROUP_13",
      context: "*[@accesskey]", 
      validate: function (ruleContext) { 
   var accesskey = util.getValueFromAttributes(ruleContext, ['accesskey'], ""); 
   var ieShortCuts='aefhtv'; 
   var passed = (ieShortCuts.indexOf(accesskey.toLowerCase()) == -1); 
   return new ValidationResult(false, [ruleContext], 'accesskey', '', []); 
}  // endfunction
 
 
      },
  ]); 
   }
 
 
        
 