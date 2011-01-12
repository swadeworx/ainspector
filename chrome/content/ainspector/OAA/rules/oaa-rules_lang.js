
  //
  // OpenAjax Alliance Rules 
  // Rule group: Language Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 45: Each page must have a lang attribute on its html element.
    // --------
	          
     {
      id: "rule_45", 
      groupTitle: "Language Rule", 
      groupId: "oaa-rules_lang", 
      context: "document", 
      validate: function (ruleContext) { 
  var theNodes = ruleContext.getElementsByTagName("html"); 
  if (theNodes.length == 1) { 
    var langStr = util.getValueFromAttributes(theNodes[0],['lang'],""); 
    var passed = (langStr.length > 0); 
    return new ValidationResult(passed, theNodes[0], '', '', []); 
  } // endif
  
  return new ValidationResult(false, theNodes[0], '', '', []); 
} // endfunction


      },
           
    // --------
    // Rule 46: lang attribute on html element must have a valid two-character language code.
    // --------
	          
     {
      id: "rule_46", 
      groupTitle: "Language Rule", 
      groupId: "oaa-rules_lang", 
      context: "html[@lang]", 
      dependencies: ["rule_45",],
      validate: function (ruleContext) { 

  var langStr = util.getValueFromAttributes(ruleContext,['lang'],""); 
  var target; 
  
  if (langStr.indexOf('-') == 2) { 
    target = langStr.substr(0,2).toLowerCase(); 
  } else {
    target = langStr.toLowerCase(); 
  } // endif
  
  var passed = false; 
  var oRequest = new XMLHttpRequest(); 
  oRequest.open("GET","http://www.iana.org/assignments/language-subtag-registry",false); 
  oRequest.setRequestHeader("User-Agent",navigator.userAgent); oRequest.send(null); 
  
  if (oRequest.status==200) { 
    var contents = oRequest.responseText; 
    var pos = contents.indexOf('Subtag: ' + target + '\n'); 
    if (pos > 0) { 
      passed = true;
    } // endif  
  } else { 
    // accessext_consoleDump(filename + " Error executing XMLHttpRequest call, does the file exist?"); 
  } // endif 
  
  return new ValidationResult(passed, [ruleContext], 'lang', '', []); 
  
}  // endfunction


      },
  ]); 
   }


        

