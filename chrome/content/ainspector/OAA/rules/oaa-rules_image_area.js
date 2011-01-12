
  //
  // OpenAjax Alliance Rules 
  // Rule group: Image and Area Rules
  //
with (OpenAjax.a11y) {
  addRules([
           
    // --------
    // Rule 1: Images must have valid alt text.
    // --------
	          
     {
      id: "rule_1", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@role != 'presentation']", 
      validateParams: { 
      max_decorative_width: { value: 8, type: 'Integer' },
      max_decorative_height: { value: 8, type: 'Integer' },
     }, 
      validate: function (ruleContext) {
	var vparams = this.validateParams;
	// Don't flag images that are smaller than 9x9 pixels.  
	// If image is greater than 9x9, make sure is has an alt attribute.
	var passed = (ruleContext.clientWidth <= vparams.max_decorative_width.value && 
		ruleContext.clientHeight <= vparams.max_decorative_height.value) ||
		OpenAjax.a11y.xbrowser.hasAttribute(ruleContext, "alt");
	return new ValidationResult(passed, [ruleContext], '', '', []);
} // endfunction


      },
           
    // --------
    // Rule 2: Image file name is not valid alt text.
    // --------
	          
     {
      id: "rule_2", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@role != 'presentation']", 
      validateParams: { 
      alt_forebidden_file_ext_pattern: { value: /.+\.(bmp|jpg|jpeg|jfif|gif|png|tif|tiff)$/i, type: 'Regular Expression' },
     }, 
      dependencies: ["rule_1",],
      validate: function (ruleContext) { 
  var found = this.validateParams.alt_forebidden_file_ext_pattern.value.test(ruleContext.alt);
  return new ValidationResult(!found, [ruleContext], 'alt', '', []); 
  }


      },
           
    // --------
    // Rule 3: Certain words cannot be used as a part of valid alt text
    // --------
	          
     {
      id: "rule_3", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@role != 'presentation']", 
      validateParams: { 
      alt_forebidden_words: { value: ['picture','graphic','image','photo',], type: 'Array' },
     }, 
      dependencies: ["rule_1",],
      validate: function (ruleContext) {
  var alt = ruleContext.alt.toLowerCase();
  var forebiddenWords = this.validateParams.alt_forebidden_words.value;
  var i, found = false;
  for (i = 0; !found && i < forebiddenWords.length; i++) {
    found = (alt.indexOf(forebiddenWords[i]) != -1);
  } // endfor
  return new ValidationResult(!found, [ruleContext], 'alt', '', [forebiddenWords[i]]);
} // endfunction


      },
           
    // --------
    // Rule 4: Length of alt text.
    // --------
	          
     {
      id: "rule_4", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@role != 'presentation']", 
      validateParams: { 
      alt_min_length: { value: 7, type: 'Integer' },
      alt_max_length: { value: 90, type: 'Integer' },
     }, 
      dependencies: ["rule_1",],
      validate: function (ruleContext) { 
   var vparams = this.validateParams; 
   var length = ruleContext.alt.length; 
   var passed = length >= vparams.alt_min_length.value && length <= vparams.alt_max_length.value;
   return new ValidationResult(passed, [ruleContext], 'alt', '', [length]); 
} // endfunction


      },
           
    // --------
    // Rule 5: Longdesc must have valid URI.
    // --------
	          
     {
      id: "rule_5", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@longdesc][@role != 'presentation']", 
      validateParams: { 
      valid_longdesc_url_pattern: { value: /.+\.[x]?htm[l]?$/i, type: 'Regular Expression' },
     }, 
      validate: function (ruleContext) { 
  var passed = this.validateParams.valid_longdesc_url_pattern.value.test(ruleContext.longDesc); 
  return new ValidationResult(passed, [ruleContext], 'longdesc', '', []);
}  // endfunction


      },
           
    // --------
    // Rule 6: If an image has an alt or title attribute, it should not have a presentation role.
    // --------
	          
     {
      id: "rule_6", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "img[@role == 'presentation']", 
      validate: function (ruleContext) { 
  var noAltOrTitle = !ruleContext.alt && !ruleContext.title; 
  return new ValidationResult(!noAltOrTitle, [ruleContext], '', '', [ruleContext.alt || ruleContext.title]); 
} // endfunction


      },
           
    // --------
    // Rule 37: Images should be at least 16 pixels by 16 pixels when used as links.
    // --------
	          
     {
      id: "rule_37", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "a", 
      validate: function (ruleContext) { 
	var passed = true;
	if(ruleContext.childNodes && !xbrowser.getTextContent(ruleContext)) {
		for(var i=0; i<ruleContext.childNodes.length; i++) {
			if(ruleContext.childNodes[i].tagName) {
				if (ruleContext.childNodes[i].tagName.toLowerCase() == "img") {
					if (ruleContext.childNodes[i].clientWidth < 16 || ruleContext.childNodes[i].clientHeight < 16) {
						passed = false;
					} //endif
				} //endif	
			} //endif
		} //endfor
	} //endif
	return new ValidationResult(passed, [ruleContext], '', '', []);  
} // endfunction


      },
           
    // --------
    // Rule 38: Links with images and text content, the alt attribute should be unique to the text content or empty.
    // --------
	          
     {
      id: "rule_38", 
      groupTitle: "Image and Area Rule", 
      groupId: "oaa-rules_image_area", 
      context: "a", 
      validate: function (ruleContext) { 
	var passed = true;
 	var linkText = xbrowser.getTextContent(ruleContext).normalizeSpacing();
	var alt = util.getDisplayableAlt(ruleContext);
	if((alt != '') && (linkText.toLowerCase() == alt.toLowerCase())) {
		passed = false;
	} //endif
	return new ValidationResult(passed, [ruleContext], '', '', []); 
}


      },
  ]); 
   }


        

