
  //
  // OpenAjax Alliance Rules  // Rule group: Frame Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 26: Frame element must have a title attribute.
    // Group 8: Frame Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_26", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_26", 
      groupCode     : "GROUP_8", 
      context: "frame | iframe", 
      validate: function (ruleContext) { 
  var passed = (util.getValueFromAttributes(ruleContext, ['title'], "").length != 0); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction


      },
           
    // ------------------------
    // Rule 27: Title attributes for frames must be unique.
    // Group 8: Frame Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_27", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_27", 
      groupCode     : "GROUP_8", 
      context: "frameset", 
      validate: function (ruleContext) {
  var frameArr = new Array();
  var xp = "//frame[@title]";  /* SMF TODO only check sibs not cal children - get duplicates with nested framesets */
  var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
  var r = xpathResult.iterateNext();
  while (r) {
    var title = util.getValueFromAttributes(r, ['title'], "");
    
    if (title != '') {
      frameArr.push({node:r, title: title.toLowerCase(), duplicatetitle: false});
    } // endif
    
    r = xpathResult.iterateNext();
  }  // endwhile
  
  for (var i=0, n=frameArr.length; i<n; i++) {  
    for (j=i+1; j<n; j++) {  
      if (frameArr[j].title==frameArr[i].title) { 
        frameArr[i].duplicatetitle=frameArr[j].duplicatetitle=true;
      }  // endif
    }  // endfor
  } // endfor
  
  var dupArr = new Array();
  
  for (var i=0; i<frameArr.length; i++) {
    if (frameArr[i].duplicatetitle) {
      dupArr.push(frameArr[i].node);
    } // endif  
  } // endfor 
  
  var passed = (dupArr.length == 0); 
  
  return new ValidationResult(passed, dupArr, '', '', []);
  
} // endfunction


      },
           
    // ------------------------
    // Rule 28: Frames should not be hidden or empty.
    // Group 8: Frame Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_28", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_28", 
      groupCode     : "GROUP_8", 
      context: "frame | iframe", 
      validate: function (ruleContext) { 
  var passed = (util.getValueFromAttributes(ruleContext, ['src'], "").length != 0); 
  
  if (passed) { 
    var r = util.getNodeDocPosition(ruleContext); 
    if (r.x < 0 || r.y < 0 || r.width <= 0 || r.height <= 0) { 
      passed = false; 
    } // endif
  } // endif
  
  return new ValidationResult(passed, [ruleContext], '', '', []); 
}  // function


      },
  ]); 
   }

        

