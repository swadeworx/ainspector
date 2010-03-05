with (OpenAjax.a11y) {
	addRules([
	    // ------
	    // color contrast
	    // ------
	    
	    {
	        id : "belowminimal",
	        context : "#text", //SMF TODO need a get all VISIBLE nodes with textContent 
	        validate : function (ruleContext) {
	    		var node = ruleContext.parentNode;
	    		if (node.ownerDocument.defaultView.getComputedStyle) {
	    			var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(node);
	    			var passed = contrastObj.luminosity > 3;
	    			return new ValidationResult(passed, [node], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	    		} else { //getComputedStyle does not exist
	    			return new ValidationResult(-1, [node], '', '', []);
	    		}
	        }
	    },
	    {
	        id : "belowoptimal",
	        context : "#text", //SMF TODO  need a get all VISIBLE nodes with textContent 
  	        dependencies : ["belowminimal"],
	        validate : function (ruleContext) {
    			var node = ruleContext.parentNode;
	    		if (node.ownerDocument.defaultView.getComputedStyle) {
					var contrastObj = OpenAjax.a11y.colorUtil.createContrastElement(node);
		    		var passed = contrastObj.luminosity > 4.5;
		            return new ValidationResult(passed, [node], '', '', [contrastObj.hexFGColor, contrastObj.hexBGColor, contrastObj.luminosity]);
	    		} else { //getComputedStyle does not exist
	    			return new ValidationResult(-1, [node], '', '', []);
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
