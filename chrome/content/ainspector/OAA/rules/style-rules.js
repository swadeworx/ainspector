with (OpenAjax.a11y) {
	addRules([
	    // ------
	    // color contrast
	    // ------
	    
	    {
	        id : "belowminimal",
	        context : "*", //need a get all visible nodes with textContent function
	        validate : function (ruleContext) {
				var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(ruleContext);
	    		var passed = contrastObj.luminosity > 3;
	            return new ValidationResult(passed, [ruleContext], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	        }
	    },
	    {
	        id : "belowoptimal",
	        context : "*", //need a get all visible nodes with textContent function
  	        dependencies : ["belowminimal"],
	        validate : function (ruleContext) {
				var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(ruleContext);
	    		var passed = contrastObj.luminosity > 4.5;
	            return new ValidationResult(passed, [ruleContext], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	        }
	    },
	    {
	        id : "usesFontAttr",
	        context : "font",
	        validate : function (ruleContext) {
	    		var passed = false;
	            return new ValidationResult(passed, [ruleContext], '', '', []);
	        }
	    }
	    
		]);
}
