
  //
  // OpenAjax Alliance Rules 
  // Rule group: Scripting Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 18: Focusable elements with MouseOver should also have OnFocus event handlers.
    // --------
	          
     {
      id: "rule_18", 
      groupTitle: "Scripting Rule", 
      groupId: "oaa-rules_scripting", 
      context: ".focusableMouseover", 
      validate: function (ruleContext) { 
  var passed = util.pairCheck(ruleContext,"mouseover","focus"); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction


      },
           
    // --------
    // Rule 19: Focusable elements with an OnMouseOut should also have OnBlur event handlers.
    // --------
	          
     {
      id: "rule_19", 
      groupTitle: "Scripting Rule", 
      groupId: "oaa-rules_scripting", 
      context: ".focusableMouseout", 
      validate: function (ruleContext) { 
  var passed = util.pairCheck(ruleContext,"onmouseout","blur"); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction


      },
           
    // --------
    // Rule 20: Every onClick event handler should be on a focusable element.
    // --------
	          
     {
      id: "rule_20", 
      groupTitle: "Scripting Rule", 
      groupId: "oaa-rules_scripting", 
      context: ".nonFocusableOnclick", 
      validate: function (ruleContext) { 
  var passed = false; 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endfunction


      },
           
    // --------
    // Rule 21: OnChange event handler should not be used with the select element.
    // --------
	          
     {
      id: "rule_21", 
      groupTitle: "Scripting Rule", 
      groupId: "oaa-rules_scripting", 
      context: "*", 
      validate: function (ruleContext) { 
  var passed = true; 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
}  // end function


      },
           
    // --------
    // Rule 22: onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents.
    // --------
	          
     {
      id: "rule_22", 
      groupTitle: "Scripting Rule", 
      groupId: "oaa-rules_scripting", 
      context: ".mouseUpDownMove", 
      validate: function (ruleContext) { 
  var eventNames = util.getEvents(ruleContext); 
  var passed = (util.hasEvent(eventNames,"keydown") || util.hasEvent(eventNames,"keypress")); 
  return new ValidationResult(passed, [ruleContext], '', '', []); 
} // endif


      },
  ]); 
   }


        

