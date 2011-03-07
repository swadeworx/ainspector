
 
  //
  // OpenAjax Alliance Rules 
  // Rule group: Data Table Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 7: Data tables must use summary attribute.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_7", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_7", 
      groupCode     : "GROUP_3", 
      context: ".dataTable", 
      validate: function (ruleContext) { 
  var passed = (util.getValueFromAttributes(ruleContext,['summary'],'') != ''); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
}  // endfunction
 
 
      },
           
    // ------------------------
    // Rule 8: Data tables must use th elements
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_8", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_8", 
      groupCode     : "GROUP_3", 
      context: ".dataTable", 
      validate: function (ruleContext) { 
  var passed = false; 
  var node = ruleContext; 
  var r,c;
  var thColCount=0,thRowCount = 0;
  //contains data from tablenode.tHead.rows & tablenode.tFoot.rows 
  if (node.rows[0].cells.length > 1) { 
    for (c=0; c < node.rows[0].cells.length; c++) {  
// the first cell in each column has a header
      if (node.rows[0].cells[c].tagName.toLowerCase() == 'th' && xbrowser.getTextContent(node.rows[0].cells[c]).normalizeSpacing() != '') {
       thColCount++;
      } // endif
    } // endfor
    if (node.rows[0].cells.length == thColCount) {
      passed = true; 
    } // endif
  } // endif
  if (!passed) { 
    if (node.rows.length > 1) { 
      for (r=0; r < node.rows.length; r++) { 
	if (node.rows[r].cells[0].tagName.toLowerCase() == 'th' && xbrowser.getTextContent(node.rows[r].cells[0]).normalizeSpacing() != '') {
              thRowCount++;
        } // endif
      } // endfor
      if (node.rows.length == thRowCount) { 
        passed = true;
      }  // endif
    } // endif
    if (node.rows[0].cells.length-1 == thColCount && node.rows.length-1 == thRowCount) {
      passed = true; 
    } // endif
  } // endif 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
}//endfunction
 
 
      },
           
    // ------------------------
    // Rule 9: Summary attribute content must be unique.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_9", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_9", 
      groupCode     : "GROUP_3", 
      context: "table[@summary]", 
      dependencies  : ["RULE_7",],
      validate: function (ruleContext) { 
  var passed = true; 
  var summary = util.getValueFromAttributes(ruleContext,['summary'],""); 
  var count = 0; 
//var xp = "//table[translate(@summary,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" + summary.toLowerCase() + "']";
  var xp = "//table[@summary='" + summary + "']"; /* SMF TODO make case insensitive */
  var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
  var r = xpathResult.iterateNext(); 
  while (r && count < 2) { 
    count++; 
    r = xpathResult.iterateNext(); 
  } // endwhile
  var passed = (count < 2); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 10: Complex data tables must have ids on th elements.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_10", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_10", 
      groupCode     : "GROUP_3", 
      context: ".complexDataTable", 
      validate: function (node) { 
  var passed = true; 
  var r,c; 
  for (r=0; r < node.rows.length && passed; r++) { 
    for (c=0; c < node.rows[r].cells.length && passed; c++) { 
      if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') { 
        var id = util.getValueFromAttributes(node.rows[r].cells[c],['id'],""); 
        if	(id == '') {
          passed = false;
        } // endfor
      } // endfor
    } // endfor
  } //endfor
  return new ValidationResult(passed, [node], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 11: For complex data tables table ids must be unique.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_11", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_11", 
      groupCode     : "GROUP_3", 
      context: ".complexDataTable", 
      validate: function (node) { 
  var r,c; 
  var idarray = new Array(); 
  var duparray = new Array(); 
  for (r=0; r < node.rows.length; r++) { 
    for (c=0; c < node.rows[r].cells.length; c++) { 
      if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') { 
        var id = util.getValueFromAttributes(node.rows[r].cells[c],['id'],""); 
        if (id != '') {
          if (!util.addToArray(id, idarray)) { 
            duparray.push(id);
          } // endif
        } // endif
      } // endif
    } // endfor 
  } // endfor
  
  var passed = (duparray.length == 0); 
  return new ValidationResult(passed, [node], '', '', [duparray.join(', ')]); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 12: Complex data table td elements must have header attributes.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_12", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_12", 
      groupCode     : "GROUP_3", 
      context: ".complexDataTable", 
      validate: function (node) { 
  var passed = true; 
  var r,c; 
  var idarray = new Array(); 
  for (r=0; r < node.rows.length && passed; r++) { 
    for (c=0; c < node.rows[r].cells.length && passed; c++) { 
      if (node.rows[r].cells[c].tagName.toLowerCase() == 'td') { 
        var headersStr = util.getValueFromAttributes(node.rows[r].cells[c],['headers'],""); 
        if (headersStr.length == 0) {
          passed = false;
        }  // endif
      } // endif
    } // endfor
  } // endfor
  return new ValidationResult(passed, [node], '', '', []); 
} // end function
 
 
      },
           
    // ------------------------
    // Rule 13: Complex data tables header ids must be on the page.
    // Group 3: Data Table Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_13", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_13", 
      groupCode     : "GROUP_3", 
      context: ".complexDataTable", 
      validate: function (node) { 
  var r,c; 
  var idarray = new Array(); 
  var notfoundarray = new Array(); 
  for (r=0; r < node.rows.length; r++) 
  { 
    for (c=0; c < node.rows[r].cells.length; c++) { 
      var currentCell = node.rows[r].cells[c]; 
     	if (currentCell.tagName.toLowerCase() == 'th') {
	   var id = OpenAjax.a11y.xbrowser.hasAttribute(currentCell, "id") ? currentCell.getAttribute("id").normalizeSpacing() : ""; 
          if (id != '') {
            util.addToArray(id, idarray);
	   }
	}
	if (currentCell.tagName.toLowerCase() == 'td') {
	  var headersStr = util.getValueFromAttributes(currentCell,['headers'],"");
        if (headersStr.length > 0) { 
          var headers = headersStr.split(' '); 
          for (i = 0, found = false; i < headers.length && !found; i++) { 
            // this is probably going to be too time expensive 
            for(var j=0;j < idarray.length && !found; j++) {
              if(headers[i]==idarray[j]) {
                found = true;
              } // endif  
            } // endfor 
            if (!found) {
              util.addToArray(headers[i], notfoundarray);
            } // endif
          } // endfor
        } // endif 
      } // endif
    } // endfor
  } // endfor
  var passed = (notfoundarray.length == 0); 
  return new ValidationResult(passed, [node], '', '', [notfoundarray.join(",")]); 
} // end function
 
 
      },
  ]); 
   }
 
 
        
 