
  //
  // OpenAjax Alliance Rules 
  // Rule group: Scripting Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // ------------------------
    // Rule 18: Focusable elements with MouseOver should also have OnFocus event handlers.
    // Group 9: Scripting Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_18", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_18", 
      groupCode     : "GROUP_9", 
      context: ".focusableMouseover", 
      validate: function (ruleContext) { 
  var passed = util.pairCheck(ruleContext,"mouseover","focus"); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 19: Focusable elements with an OnMouseOut should also have OnBlur event handlers.
    // Group 9: Scripting Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_19", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_19", 
      groupCode     : "GROUP_9", 
      context: ".focusableMouseout", 
      validate: function (ruleContext) { 
  var passed = util.pairCheck(ruleContext,"onmouseout","blur"); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 20: Every onClick event handler should be on a focusable element.
    // Group 9: Scripting Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_20", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_20", 
      groupCode     : "GROUP_9", 
      context: ".nonFocusableOnclick", 
      validate: function (ruleContext) { 
  var passed = false; 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction
 
 
      },
           
    // ------------------------
    // Rule 21: OnChange event handler should not be used with the select element.
    // Group 9: Scripting Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_21", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_21", 
      groupCode     : "GROUP_9", 
      context: "*", 
      validate: function (ruleContext) { 
  var passed = true; 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
}  // end function
 
 
      },
           
    // ------------------------
    // Rule 22: onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents.
    // Group 9: Scripting Rule
    // 
    // Last update: 2011-02-11
    // ------------------------
	          
     {
      id            : "RULE_22", 
      lastUpdated   : "2011-02-11", 
      messageCode   : "MESSAGE_22", 
      groupCode     : "GROUP_9", 
      context: ".mouseUpDownMove", 
      validate: function (ruleContext) { 
  var eventNames = util.getEvents(ruleContext); 
  var passed = (util.hasEvent(eventNames,"keydown") || util.hasEvent(eventNames,"keypress")); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endif
 
 
      },
  ]); 
   }
 
 
        
 