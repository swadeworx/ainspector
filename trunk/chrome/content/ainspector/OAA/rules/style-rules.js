with (OpenAjax.a11y) {
	addRules([
	    // ------
	    // color contrast
	    // ------
	    
	    {
	        id : "belowminimal",
	        context : "*", //SMF TODO (need #text) need a get all visible nodes with textContent function
	        validate : function (ruleContext) {
	    		if (ruleContext.ownerDocument.defaultView.getComputedStyle) {
	    			var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(ruleContext);
	    			var passed = contrastObj.luminosity > 3;
	    			return new ValidationResult(passed, [ruleContext], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	    		} else { //getComputedStyle does not exist
	    			return new ValidationResult(-1, [ruleContext], '', '', []);
	    		}
	        }
	    },
	    {
	        id : "belowoptimal",
	        context : "*", //SMF TODO (need #text) need a get all visible nodes with textContent function
  	        dependencies : ["belowminimal"],
	        validate : function (ruleContext) {
	    		if (ruleContext.ownerDocument.defaultView.XXXgetComputedStyle) {
					var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(ruleContext);
		    		var passed = contrastObj.luminosity > 4.5;
		            return new ValidationResult(passed, [ruleContext], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	    		} else { //getComputedStyle does not exist
	    			return new ValidationResult(-1, [ruleContext], '', '', []);
	    		}
	        }
	    },
	    {
	        id : "usesFontAttr",
	        context : "font",
	        validate : function (ruleContext) {
	    		var passed = false;
	            return new ValidationResult(passed, [ruleContext], '', '', []);
	        }
	    },
	    {
	        id : "useBoldAttr",
	        context : "document",
	        validate : function (ruleContext) {
	    		var passed = true;
	    		var loadArray = new Array();
	    		//var	xp = "//b|//blink|//i|//marquee|//u";
	    		var xpathResult = ruleContext.evaluate("//b", ruleContext, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE, null);
				var r = xpathResult.iterateNext();
				//FBTrace.sysout('xpathResult: '+ xpathResult);
				while (r) {
					loadArray[loadArray.length] = {node: r,
					text: util.getNodeTextRecursively(r).toLowerCase()};
					r = xpathResult.iterateNext();
					passed = r!= null;
				}
				return new ValidationResult(passed, loadArray, '', '', []);
	        }
	    },
	    
	   {
	        id : "useItalicAttr",
	        context : "document",
	        validate : function (ruleContext) {
	    		var passed = true;
	    		var loadArray = new Array();
	    		var xpathResult = ruleContext.evaluate("//i", ruleContext, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE, null);
				var r = xpathResult.iterateNext();
				while (r) {
					loadArray[loadArray.length] = {node: r,
					text: util.getNodeTextRecursively(r).toLowerCase()};
					r = xpathResult.iterateNext();
					passed = r!= null;
				}
				return new ValidationResult(passed, loadArray, '', '', []);
	        }
	    },
	    {
	        id : "useUnderline",
	        context : "document",
	        validate : function (ruleContext) {
	    		var passed = true;
	    		var loadArray = new Array();
	    		var xpathResult = ruleContext.evaluate("//u", ruleContext, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE, null);
				var r = xpathResult.iterateNext();
				while (r) {
					loadArray[loadArray.length] = {node: r,
					text: util.getNodeTextRecursively(r).toLowerCase()};
					r = xpathResult.iterateNext();
					passed = r!= null;
				}
				return new ValidationResult(passed, loadArray, '', '', []);
	        }
	    }
	    
	    
		]);
}
