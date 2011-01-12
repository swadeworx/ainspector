
  //
  // OpenAjax Alliance Rules 
  // Rule group: Form/Widget Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 47: Each fieldset element should contain a legend element.
    // --------
	          
     {
      id: "rule_47", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "fieldset", 
      validate: function (ruleContext) { 
  var legendFound = false; 
  
  for (var legend = 0; legend < ruleContext.childNodes.length && !legendFound; legend++) { 
    if (ruleContext.childNodes[legend].tagName && ruleContext.childNodes[legend].tagName.toLowerCase() == 'legend') { 
      legendFound = true; 
    } // endif
  } // endfor
  
  return new ValidationResult(legendFound, [ruleContext], [], '', []); 
  
} // endfunction


      },
           
    // --------
    // Rule 48: The label element should not encapsulate select and textarea elements.
    // --------
	          
     {
      id: "rule_48", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "label", 
      validate: function (ruleContext) { 
  var tagFound = false;
  
  for (var legend = 0; legend < ruleContext.childNodes.length && !tagFound; legend++) { 
    if (ruleContext.childNodes[legend].tagName) { 
      var lc = ruleContext.childNodes[legend].tagName.toLowerCase(); 
      if (lc == 'select' || lc == 'textarea') {
        tagFound = true;
      } // endif  
    } // endif
  } // endfor
  
  return new ValidationResult(!tagFound, [ruleContext], [], '', []); }


      },
           
    // --------
    // Rule 49: Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.
    // --------
	          
     {
      id: "rule_49", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "input[@type == 'text'] | input[@type == 'password'] | input[@type == 'checkbox'] | input[@type == 'radio'] | input[@type == 'file'] | textarea | select", 
      validate: function (ruleContext) { 
  var retStruct = util.parseLabel(ruleContext); 
  var passed = (retStruct.label != null);	 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction


      },
           
    // --------
    // Rule 50: Input element of type=[image] must have an alt or a title attribute.
    // --------
	          
     {
      id: "rule_50", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "input[@type == 'image']", 
      validate: function (ruleContext) { 
  var retStruct = util.parseLabel(ruleContext); 
  var passed = (retStruct.label != null);	 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction


      },
           
    // --------
    // Rule 51: Input elements where type=[button|submit|reset] must have a value or title attribute.
    // --------
	          
     {
      id: "rule_51", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "input[@type == 'button'] | input[@type == 'submit'] | input[@type == 'reset']", 
      validate: function (ruleContext) { 
  var retStruct = util.parseLabel(ruleContext); 
  var passed = (retStruct.label != null);	 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
}  // endfunction


      },
           
    // --------
    // Rule 52: Each button element must contain content.
    // --------
	          
     {
      id: "rule_52", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "button", 
      validate: function (ruleContext) { 
  var retStruct = util.parseLabelFromButton(ruleContext); 
  var passed = (retStruct.label != null);	 
  return new ValidationResult(passed, [ruleContext], [], '', []); 
} // endfunction


      },
           
    // --------
    // Rule 53: Effective labels should be unique.
    // --------
	          
     {
      id: "rule_53", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "document", 
      validate: function (ruleContext) { 
  var dataarray = new Array(); 
  var xp = "//button|//input|//textarea|//select"; 
  var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null); 
  var r = xpathResult.iterateNext(); 
  while (r) { 
    var formObj = { node: r, 
                    label: util.parseLabel(r).label, 
                    legend: null, 
                    duplicatelabel: false 
                  }; // end object
                  
    formObj.legend = util.getFieldSetNodeLegendForElement(r); 
    
    if (formObj.label != null) {
      formObj.label = formObj.label.toLowerCase(); 
    } // endif
    
    if (formObj.legend != null) {
      formObj.legend = formObj.legend.toLowerCase(); 
    } // endif
    
    dataarray.push(formObj); 
    
    r = xpathResult.iterateNext(); 
    
  } // endwhile
  
  var retArray = new Array(); 
  var retMsgArray = new Array(); 
  
  for (var i=0, j=0, n=dataarray.length; i<n; i++) {    
	if (dataarray[i].label == null) continue;              
	var effLab1 = dataarray[i].legend + ' ' + dataarray[i].label;          
	for (j=i+1; j<n; j++) {  
		if (dataarray[j].label == null) continue;  
		var effLab2 = dataarray[j].legend + ' ' + dataarray[j].label;          
		if (effLab1 == effLab2) {
			dataarray[i].duplicatelabel=dataarray[j].duplicatelabel=true;
		}//endif	
	} //endfor
} //endfor
for (var i=0; i < dataarray.length;i++) {
	if (dataarray[i].duplicatelabel) {
		retArray.push(dataarray[i].node);
		if (dataarray[i].legend != null) {
			retMsgArray.push(dataarray[i].legend + ' ' + dataarray[i].label);
		} else {
			retMsgArray.push(dataarray[i].label);
		} //end if
	} //end if
} //end for

var passed = (retArray.length == 0);
return new ValidationResult(passed, retArray, [], '', retMsgArray);
} // endfunction


      },
           
    // --------
    // Rule 54: Labels must have text content.
    // --------
	          
     {
      id: "rule_54", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "label", 
      validate: function (ruleContext) { 
  var passed = xbrowser.getTextContent(ruleContext).normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
 } //end function


      },
           
    // --------
    // Rule 55: Legends must have text content.
    // --------
	          
     {
      id: "rule_55", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "legend", 
      validate: function (ruleContext) { 
  var passed = xbrowser.getTextContent(ruleContext).normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], [], '', []);
} //end function


      },
           
    // --------
    // Rule 56: Title attributes used for labeling form controls must have content.
    // --------
	          
     {
      id: "rule_56", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "button[@title] | input[@title] | textarea[@title] | select[@title]", 
      validate: function (ruleContext) { 
  var passed = ruleContext.getAttribute('title').normalizeSpacing().length != 0;
	            return new ValidationResult(passed, [ruleContext], 'title', '', []);
	        } //endfunction


      },
           
    // --------
    // Rule 57: Form controls must have unique ids.
    // --------
	          
     {
      id: "rule_57", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "button[@id] | input[@id] | textarea[@id] | select[@id]", 
      validate: function (ruleContext) { 
	var count = 0;
	var id = ruleContext.getAttribute('id');
	var xp = "//button[@id='" + id + "']|//input[@id='" + id + "']|//textarea[@id='" + id + "']|//select[@id='" + id + "']";
	var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext.ownerDocument, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
	var r = xpathResult.iterateNext();
	while (r && count < 2) {
		count++;
		r = xpathResult.iterateNext();
	}
	var passed = (count < 2);
	return new ValidationResult(passed, [ruleContext], 'id', '', [id]);
}  // endfunction


      },
           
    // --------
    // Rule 63: Check aria properties and states for valid roles and properties
    // --------
	          
     {
      id: "rule_63", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttr", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var attrNameArr = new Array();
      var designPatterns = OpenAjax.a11y.aria.designPatterns;

      //Get the role value
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
					
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
      // If there is a valid role check to see that the states are supported
      if ((role != '') && designPatterns[role]) {
         for (var a = 0; a < ruleContext.attributes.length; a++) {
            if (OpenAjax.a11y.util.isDefinedAriaAttributeAtIndex(ruleContext, a)) {
               var attrName = ruleContext.attributes[a].name;
               var found = OpenAjax.a11y.xbrowser.indexOf(OpenAjax.a11y.aria.globalProperties, attrName) >= 0;
               if (!found && designPatterns[role].reqProps != null) { 
                  found = OpenAjax.a11y.xbrowser.indexOf(designPatterns[role].reqProps, attrName) >= 0;
               }
               if (!found && designPatterns[role].props != null) { 
                  found = OpenAjax.a11y.xbrowser.indexOf(designPatterns[role].props, attrName) >= 0;
               }
               if (!found) attrNameArr.push(attrName);
            }
         }
      }
      var retMsg = new Array();
      retMsg.push (attrNameArr.toString());
      retMsg.push (role);

      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
   }


      },
           
    // --------
    // Rule 64: ARIA attributes have valid values 
    // --------
	          
     {
      id: "rule_64", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttr", 
      validate: 
   function (ruleContext) {
      var attrNameArr = new Array();
      var dataTypeArr = new Array();

      // for each aria attr check for nonexistant IDs
      for(var i=0; i< ruleContext.attributes.length; i++ ) {
         var attrName = ruleContext.attributes[i].name;
         if (OpenAjax.a11y.util.isDefinedAriaAttribute(ruleContext, attrName)) {
            var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
            if (dataTypes && dataTypes.values) {
               var nodeValue = ruleContext.attributes[i].nodeValue.normalizeSpacing();
               if (OpenAjax.a11y.xbrowser.indexOf(dataTypes.values, nodeValue) == -1) {
                  if (OpenAjax.a11y.xbrowser.indexOf(dataTypes.values, 'undefined') != -1 && nodeValue.length == 0) {
                     //translate 'undefined' to mean ''
                  } else {
                     attrNameArr.push(attrName);
                     dataTypeArr.push(dataTypes.values.toString());
                  }
               }
            }
         }
      }
      var retMsg = new Array();
      retMsg.push (attrNameArr.toString());
      retMsg.push (dataTypeArr.toString());

      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 	                
   }


      },
           
    // --------
    // Rule 65: ARIA ID references must be valid IDRefs
    // --------
	          
     {
      id: "rule_65", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttrIDREF", 
      validate: 
   function (ruleContext) {
      var attrNameArr = new Array();
      var nonExistantIDs = new Array();

      // for each aria attr check for nonexistant IDs
      for(var i=0, pass=true; i< ruleContext.attributes.length; i++ ) {
         pass = true;
         var attrName = ruleContext.attributes[i].name;
         if (OpenAjax.a11y.util.isDefinedAriaAttribute(ruleContext, attrName)) {
            var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
            if (dataTypes && dataTypes.type) {
               var supportsOneIDRef =(dataTypes.type == "http://www.w3.org/2001/XMLSchema#idref") ? true : false; 
               //If the data type supports one or more id refs do error checking
               if (supportsOneIDRef || (dataTypes.type == "http://www.w3.org/2001/XMLSchema#idrefs")) {
                  // Check for an empty ID Ref
                  if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length < 1) { 
                     pass = false;
                  }
                  // check to see if too many IDRefs
                  else if (supportsOneIDRef) {
                     //If has too many IDRefs it is an error
                     if (ruleContext.attributes[i].nodeValue.normalizeSpacing().length >= 1) {
                        var idArray = ruleContext.attributes[i].nodeValue.split(" ");
                        if (idArray.length > 1) {
                           pass = false;
                        }
                     }		                            	
                     //check to see if their id refs are invalid		                            	
                     if (pass && ruleContext.attributes[i].nodeValue.normalizeSpacing().length >= 1) {
                        var rc = util.nonExistantIDs(ruleContext.ownerDocument, ruleContext.attributes[i].nodeValue);
                        if (rc != '') pass = false;
                     }		                            	
                  }
               }
            }
            if (!pass) attrNameArr.push(attrName);
         }
      }
      // return all aria states and properties with bad values. Let the author figure out why	
      var retMsg = new Array();
      retMsg.push (attrNameArr.toString());
      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg); 	                
   }


      },
           
    // --------
    // Rule 66: ARIA attributes can only be used with certain roles
    // --------
	          
     {
      id: "rule_66", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttrIDREF", 
      validate: 
   function (ruleContext) {
      var attrNameArr = new Array();
	              	
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested

      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
	              	
       for(var i=0; role == '' && i < ruleContext.attributes.length; i++ ) {
         var attrName = ruleContext.attributes[i].name;
         if (OpenAjax.a11y.util.isDefinedAriaAttribute(ruleContext, attrName) &&
               OpenAjax.a11y.xbrowser.indexOf(OpenAjax.a11y.aria.globalProperties, attrName) == -1) {
            attrNameArr.push(attrName);
         }
      }
      var retMsg = new Array();
      retMsg.push (attrNameArr.toString());
      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
  }


      },
           
    // --------
    // Rule 67: Roles must contain their required child roles
    // --------
	          
     {
      id: "rule_67", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@role]", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var roleNameArr = new Array();
	              	
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
					
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
	              
      var designPatterns = OpenAjax.a11y.aria.designPatterns;
      // If the role is valid make sure the required children are present otherwise it is a failure
      if (role != '' && designPatterns[role] && designPatterns[role].reqChildren != null) { 
         for(var i=0; i< designPatterns[role].reqChildren.length; i++) {
            var xp = "*[@role='" + designPatterns[role].reqChildren[i] + "']"; // SMF TODO get direct children only, this includes grandchildren
            var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
            var r = xpathResult.iterateNext();
            if (!r) roleNameArr.push(designPatterns[role].reqChildren[i]);
         }
      }
      var retMsg = new Array();
      retMsg.push (role);
      retMsg.push (roleNameArr.toString());
      var passed = roleNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], '', '', retMsg);
   }


      },
           
    // --------
    // Rule 68: Child roles must be contained by the proper parent role
    // --------
	          
     {
      id: "rule_68", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@role]", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var roleNameArr = new Array();

      //Get the role value
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
					
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';

      var designPatterns = OpenAjax.a11y.aria.designPatterns;
      // If there is a valid role and the role is required to have a container check to make sure the role is housed in the appropiate container
      if (role != '' && designPatterns[role] && designPatterns[role].container != null) { 
         for(var i=0; i< designPatterns[role].container.length; i++) {
            var xp = "parent::*[@role='" + designPatterns[role].container[i] + "']"; // SMF TODO get direct children only, this includes grandchildren
            var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
            var r = xpathResult.iterateNext();
            if (!r) roleNameArr.push(designPatterns[role].container[i]);
         }
      }
      var retMsg = new Array();
      retMsg.push (role);
      retMsg.push (roleNameArr.toString());
      var passed = roleNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], '', '', retMsg);
   }


      },
           
    // --------
    // Rule 69: Required properties and states should be defined
    // --------
	          
     {
      id: "rule_69", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttr", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var attrNameArr = new Array();
      var designPatterns = OpenAjax.a11y.aria.designPatterns;
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
      
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
         
      //If the role is valid and there are required properties make sure none are missing
      if (role != '' && designPatterns[role] && designPatterns[role].reqProps != null) { 
         for(var i=0; i< designPatterns[role].reqProps.length; i++) {
            if (!OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, designPatterns[role].reqProps[i])) {
               attrNameArr.push(designPatterns[role].reqProps[i]);
            }
         }
      }
      var retMsg = new Array();
      retMsg.push (role);
      retMsg.push (attrNameArr.toString());
      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
   }


      },
           
    // --------
    // Rule 70: Required properties and states must not be empty
    // --------
	          
     {
      id: "rule_70", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".containsAriaAttr", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var attrNameArr = new Array();
      var designPatterns = OpenAjax.a11y.aria.designPatterns;
         
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
      
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
      
      // If the role is valid and there are required properties make sure they are not empty
      
      if (role != '' && designPatterns[role] && designPatterns[role].reqProps != null) { 
         for(var i=0; i< designPatterns[role].reqProps.length; i++) {
             var attribute = designPatterns[role].reqProps[i];
            if (OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, attribute)) {
               var nodeValue = ruleContext.getAttribute(designPatterns[role].reqProps[i]).normalizeSpacing();
               if (nodeValue.length == 0) attrNameArr.push(designPatterns[role].reqProps[i]);
            }
         }
      }
      var retMsg = new Array();
      retMsg.push (attrNameArr.toString());
      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
   }


      },
           
    // --------
    // Rule 71: Role value must be valid
    // --------
	          
     {
      id: "rule_71", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@role]", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
      
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
      // Check to see that the role is valid
      if (!OpenAjax.a11y.aria.designPatterns[role]) passed = false;
          return new ValidationResult(passed, [ruleContext], 'role', '', [role]);
   }


      },
           
    // --------
    // Rule 72: Check that 'ARIA-' attributes are valid properties and states
    // --------
	          
     {
      id: "rule_72", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*", 
      validate: 
   function (ruleContext) {
      var attrNameArr = new Array();

      // TY attributes is null when the node is a comment node
      if (!!ruleContext.attributes && ruleContext.attributes.length) {
            // for each aria attr check for nonexistant IDs
         for(var i=0; i< ruleContext.attributes.length; i++ ) {
            var attrName = ruleContext.attributes[i].name;
            if (OpenAjax.a11y.util.isDefinedAriaAttribute(ruleContext, attrName)) {
               var dataTypes = OpenAjax.a11y.aria.propertyDataTypes[attrName];
               if (!dataTypes) attrNameArr.push(attrName);
            }
         }
         var retMsg = new Array();
         retMsg.push (attrNameArr.toString());
      }
      var passed = attrNameArr.length == 0;
      return new ValidationResult(passed, [ruleContext], attrNameArr, '', retMsg);
   }


      },
           
    // --------
    // Rule 73: Check that non-form and non-anchor elements with event handlers have valid roles.
    // --------
	          
     {
      id: "rule_73", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: ".nonfocusableElementsContainingEvents", 
      validate: 
   function (ruleContext) {
      var passed = true;
      /*SMF TODO the following should be taken care of in the context */
      if (ruleContext.nodeName.toLowerCase() == "a" && OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'href')) return new ValidationResult(passed, [ruleContext], '', '', []);
      if (ruleContext.nodeName.toLowerCase() == "area" && OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'href')) return new ValidationResult(passed, [ruleContext], '', '', []);
      
      var events = util.getEvents(ruleContext);
      if (events.length > 0) {
         function hasEvent(a) {
            if (OpenAjax.a11y.xbrowser.indexOf(events, ('on' + a)) != -1) return 'on' + a;	
            if (OpenAjax.a11y.xbrowser.indexOf(events, a) != -1) return a;
            return '';
         }
         function hasTargetEvent() {
            var found = false;
            var _targetEvents=new Array("click","keyup","keydown","keypress", "mousedown","mouseup","mousemove","mouseout","mouseover");
            for (i = 0; i < _targetEvents.length && !found; i ++) {
               found = hasEvent(_targetEvents[i]);
               if (!found) found = hasEvent(_targetEvents[i]);
            }
            return found;
         }
         passed = !hasTargetEvent();
      }
      return new ValidationResult(passed, [ruleContext], '', '', []);
   }


      },
           
    // --------
    // Rule 74: Check that elements with mouse event handlers also have key event handlers
    // --------
	          
     {
      id: "rule_74", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@aria-activedescendant]", 
      validate: 
   function (ruleContext) {
      var events = util.getEvents(ruleContext);
      var passed = (events.toString().indexOf("mouse") == -1 || events.indexOf("keydown") >= 0 || events.indexOf("keypress") >= 0);
      return new ValidationResult(passed, [ruleContext], '', '', []);
   }


      },
           
    // --------
    // Rule 75: Check that enabled elements with ACTIVE-DESCENDANT have valid tab index
    // --------
	          
     {
      id: "rule_75", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@aria-activedescendant]", 
      validate: 
   function (ruleContext) {
      var disabled = OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
      var passed = (disabled == 'true' || (OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'tabindex') && ruleContext.getAttribute("tabindex").isInteger()));
      return new ValidationResult(passed, [ruleContext], '', '', []);
   }


      },
           
    // --------
    // Rule 76: Check that elements without 'aria-activedescendant' that have roles requiring a container have focusable children
    // --------
	          
     {
      id: "rule_76", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@aria-activedescendant]", 
      validate: 
   function (ruleContext) {
      var passed = true;

      var role = ruleContext.getAttribute("role");
      // - a role value of null indicates no role attribute is present in (FF,Opera, Safari, Chrome). 
      // - '' value indicates the role is set to an empty string for all browsers except 
      //      IE which also returns '' if no role attribute is present
      // neither of these values allow for unsupported state to be tested
      
      // Make sure the role value is consistent with IE as you don't want to push a null on the stack
      if (role==null)
         role='';
      if (xbrowser.indexOf(OpenAjax.a11y.aria.containers, role) >= 0) {
         var disabled = OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
         if (disabled != 'true' && OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'aria-activedescendant')) {
            var xp="child::*[@role=";
               var reqChildren = OpenAjax.a11y.aria.designPatterns[role].reqChildren; 
            if (reqChildren) { /* SMF TODO menubar does not have any reqChildren */
               passed = false;
               for (var i=0; i< reqChildren.length; i++) xp += "'" + reqChildren[i] + "' |";
                  xp = xp.substring(0,xp.length-1) + ']';
               var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
               var r = xpathResult.iterateNext();
               while (r && !passed) {
                  passed = (OpenAjax.a11y.xbrowser.hasAttribute(r, 'tabindex') && r.getAttribute("tabindex").isInteger());
                  r = xpathResult.iterateNext();
               }
            }
         }
      }
      return new ValidationResult(passed, [ruleContext], 'role', '', []);
   }


      },
           
    // --------
    // Rule 77: Check that elements without 'aria-activedescendant' that have roles requiring a container have key event handlers
    // --------
	          
     {
      id: "rule_77", 
      groupTitle: "Form/Widget Rule", 
      groupId: "oaa-rules_form_and_widget", 
      context: "*[@aria-activedescendant]", 
      validate: 
   function (ruleContext) {
      var passed = true;
      var role = OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'role') ? ruleContext.getAttribute("role") : '';
      if (xbrowser.indexOf(OpenAjax.a11y.aria.containers, role) >= 0) {
         var disabled = OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'aria-disabled') ? ruleContext.getAttribute("aria-disabled") : '';
         if (disabled != 'true' && !OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, 'aria-activedescendant')) {
            var events = util.getEvents(ruleContext);
            passed = (OpenAjax.a11y.xbrowser.indexOf(events, "keydown") >= 0 ||
                  OpenAjax.a11y.xbrowser.indexOf(events, "keypress") >= 0);
            if (!passed) {
               var xp="child::*[@role=";
               var reqChildren = OpenAjax.a11y.aria.designPatterns[role].reqChildren; 
               if (reqChildren) { /* SMF TODO menubar does not have any reqChildren */
                  for (var i=0; i< reqChildren.length; i++) xp += "'" + reqChildren[i] + "' |";
                  xp = xp.substring(0,xp.length-1) + ']';
                  var xpathResult = OpenAjax.a11y.xpath.evaluate(xp, ruleContext, util.defaultNSResolver, OpenAjax.a11y.xpath.XPathResult.ANY_TYPE, null);
                  var r = xpathResult.iterateNext();
                  while (r && !passed) {
                    var events = util.getEvents(r);
                    passed = (OpenAjax.a11y.xbrowser.indexOf(events, "keydown") >= 0 ||
                        OpenAjax.a11y.xbrowser.indexOf(events, "keypress") >= 0);
                    r = xpathResult.iterateNext();
                  }
               }
            }
         }
      }
      return new ValidationResult(passed, [ruleContext], 'role', '', []);
   }


      },
  ]); 
   }


        

