with (OpenAjax.a11y) {
	addRules([
	    // ------
	    // images
	    // ------
	    
	    {
	        id : "imgAltAttrMissing",
	        context : "img[@role != 'presentation']",
	        validateParams : {
	    	min_decorative_width : {value:8, type:"integer"},
	    	min_decorative_height : {value:8, type:"integer"}
	    	},
	        validate : function (ruleContext) {
	            var vparams = this.validateParams;
	    		var passed = (ruleContext.clientWidth <= vparams.min_decorative_width.value && ruleContext.clientHeight <= vparams.min_decorative_height.value) || ruleContext.hasAttribute("alt");
	            return new ValidationResult(passed, [ruleContext], '', '', []);
	        }
	    },
	
	    {
	        id : "imgAltAttrWithForebiddenFileExt",
	        dependencies : ["imgAltAttrMissing"],
	        context : "img[@role != 'presentation']",
	        validateParams : {
	    		alt_forebidden_file_ext_pattern : {value:/.+\.(bmp|jpg|jpeg|jfif|gif|png|tif|tiff)$/i, type:"regexp"}
	    	},
	        validate : function (ruleContext) {
	            var found = this.validateParams.alt_forebidden_file_ext_pattern.value.test(ruleContext.alt);
	            return new ValidationResult(!found, [ruleContext], 'alt', '', []);
	        }
	    },
	            
	    {
	        id : "imgAltAttrWithForebiddenWord",
	        dependencies : ["imgAltAttrMissing"],
	        context : "img[@role != 'presentation']",
	        validateParams : {
	    		alt_forebidden_words : {value:['picture', 'graphic', 'image', 'photo'], type:"array"}
	    	},
	        validate : function (ruleContext) {
	            var alt = ruleContext.alt.toLowerCase();
	            var forebiddenWords = this.validateParams.alt_forebidden_words.value;
	            var i, found = false;
	            for (i = 0; !found && i < forebiddenWords.length; i++) {
	                found = (alt.indexOf(forebiddenWords[i]) != -1);
	            }
	            return new ValidationResult(!found, [ruleContext], 'alt', '', [forebiddenWords[i]]);
	        }
	    },
	            
	    {
	        id : "imgPresentationalWithAltOrTitle",
	        context : "img[@role == 'presentation']",
	        validate : function (ruleContext) {
	            var noAltOrTitle = !ruleContext.alt && !ruleContext.title;
	            return new ValidationResult(!noAltOrTitle, [ruleContext], '', '', [ruleContext.alt || ruleContext.title]);
	        }
	    },
	
	    {
	        id : "imgAltAttrEmptyTitleAttrPresent",
	        context : "img[@role != 'presentation']",
	        validate : function (ruleContext) {
	            var passed = ruleContext.alt || !ruleContext.title;
	            return new ValidationResult(passed, [ruleContext], 'title', '', []);
	        }
	    },
	
	    {
	        id : "imgAltAttrLength",
	        dependencies : ["imgAltAttrMissing"],
	        context : "img[@role != 'presentation']",
	        validateParams : {
		    	alt_min_length : {value:7, type:"integer"},
		    	alt_max_length : {value:90, type:"integer"}
		    	},
	        validate : function (ruleContext) {
	        var vparams = this.validateParams;    
	    	var length = ruleContext.alt.length;
	            var passed = length >= vparams.alt_min_length.value && length <= vparams.alt_max_length.value;
	            return new ValidationResult(passed, [ruleContext], 'alt', '', [length]);
	        }
	    },
	
	    {
	        id : "imgAltLongdescInvalid",
	        context : "img[@longdesc][@role != 'presentation']",
	        validateParams : {
	    	valid_longdesc_url_pattern : {value:/.+\.[x]?htm[l]?$/i, type:"regexp"}
	    	},
	        validate : function (ruleContext) {
	        	var passed = this.validateParams.valid_longdesc_url_pattern.value.test(ruleContext.longDesc);
	            return new ValidationResult(passed, [ruleContext], 'longdesc', '', []);
	 	}
	    }
	
	]);
}
