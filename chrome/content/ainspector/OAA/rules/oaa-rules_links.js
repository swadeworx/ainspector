
  //
  // OpenAjax Alliance Rules 
  // Rule group: Link Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 34: Link text should be as least four 4 characters long.
    // Group 11: Link Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_34", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_34", 
      groupCode     : "GROUP_11", 
      context: "a", 
      validateParams: { 
      max_text_length: { value: 3, type: 'Integer' },
     }, 
      validate: function (ruleContext) { 
  var passed = util.getNodeTextRecursively(ruleContext).length > this.validateParams.max_text_length.value; 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 35: Links with the same HREF should have the same link text.
    // Group 11: Link Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_35", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_35", 
      groupCode     : "GROUP_11", 
      context: "document", 
      validate: function (ruleContext) { 
  var passed = true; 
  var loadArray = new Array(); 
  var retArray = new Array(); 
  for (var j = 0; j < ruleContext.links.length; j++) { 
    var link4Cmp = ruleContext.links[j].href.toLowerCase(); 
    link4Cmp = link4Cmp.replace(/default.[a-z]*|index.[a-z]*/,''); 
    var obj = { node: ruleContext.links[j], 
                text: util.getNodeTextRecursively(ruleContext.links[j]).toLowerCase(), 
                link4Cmp: link4Cmp
              };  // endobj 
    loadArray[loadArray.length] = obj; 
  } // endfor
              
  for (var j = 0; j < loadArray.length; j++) { 
    for (var k = j + 1; k < loadArray.length; k++) { 
      if (loadArray[j].link4Cmp == loadArray[k].link4Cmp && loadArray[j].text != loadArray[k].text) { 
        loadArray[j].sameURLdiffLinks = true; 
        loadArray[k].sameURLdiffLinks = true;
        passed = false; 
      } // endif
    } // endfor
  } // endfor
    
  for (var j = 0; j < loadArray.length; j++) { 
    if (loadArray[j].sameURLdiffLinks) { 
      retArray.push(loadArray[j]); 
    } // endif
  } // endfor
    
  return new ValidationResult(passed, retArray, '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 36: Links that point to different HREFs should have different link text.
    // Group 11: Link Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_36", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_36", 
      groupCode     : "GROUP_11", 
      context: "document", 
      validate: function (ruleContext) { 
 
  var passed = true; 
  var loadArray = new Array(); 
  var retArray = new Array(); 
  
  for (var j = 0; j < ruleContext.links.length; j++) { 
  
    var link4Cmp = ruleContext.links[j].href.toLowerCase(); 
    link4Cmp = link4Cmp.replace(/default.[a-z]*|index.[a-z]*/,''); 
    
    var obj = { 
      node: ruleContext.links[j], 
      text: util.getNodeTextRecursively(ruleContext.links[j]).toLowerCase(), 
      link4Cmp: link4Cmp
    }; // endobj 
    
    loadArray[loadArray.length] = obj; 
    
  } // endfor
    
  for (var j = 0; j < loadArray.length; j++) { 
    for (var k = j + 1; k < loadArray.length; k++) { 
      if (loadArray[j].text == loadArray[k].text && loadArray[j].link4Cmp != loadArray[k].link4Cmp) { 
        loadArray[j].sameLinkdiffURL = true; loadArray[k].sameLinkdiffURL = true; 
        passed = false; 
      } // endif
    } // endfor
    
    for (var j = 0; j < loadArray.length; j++) { 
      if (loadArray[j].sameLinkdiffURL) { 
        retArray.push(loadArray[j]); 
      } // endif
    } // endfor
      
  } // endfor
    
  return new ValidationResult(passed, retArray, '', '', []); 
    
}  // endfunction
 
 
      },
  ]); 
   }
 
 
        
 