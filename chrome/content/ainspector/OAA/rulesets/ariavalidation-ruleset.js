OpenAjax.a11y.addRuleset(
	    {
	        // basic info
	    	id : "ARIA_1_0",
	        nameCode : "ARIA10.name",
	        descriptionCode : "ARIA10.description",
	        
	        // rulesetUrl - URL of the checklist/ruleset as a whole
	        rulesetUrl : "http://www.w3.org/WAI/PF/aria/",
	        // baseReqUrl - used to resolve relative urls of requirementUrls only
	        baseReqUrl : "http://www.w3.org/WAI/PF/aria/",
	        
	        requirements : [ 
	        {
	                criterionNumber : 'AriaAttValid',
	                criterionLevel : '',
	                criterionDesc : 'AriaAttValid.description',
	                requirementUrl: '',
			        rules : {
	            		// defined in doc-structure-rules.js
	        			'unsupportedstate' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.unsupportedstate'},           		
	    				'invalidAttributeValue' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.invalidAttributeValue'},           		
	            		'invalidIDREF' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.invalidIDREF'},           		
	            		'emptyIDREF' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.emptyIDREF'},           		
	            		'toomanyIDREF' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.toomanyIDREF'},          		
	            		'invalidGlobalStatesProps' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.invalidGlobalStatesProps'},           		
	            		'missingMustContain' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.missingMustContain'},           		
	            		'missingContainedBy' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.missingContainedBy'},           		
	            		'missingReqAttribute' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.missingReqAttribute'},           		
	            		'emptyReqAttribute' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.emptyReqAttribute'},           		
	            		'invalidRole' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.invalidRole'},           		
	            		'unknownAriaAttr' : {severityCode:'level.potentialViolation', messageCode:'ariavalidation.msg.unknownAriaAttr'}           		
			    	}
			    }, // 2.4.1 
	        {
	                criterionNumber : 'AriaKBAccess',
	                criterionLevel : '',
	                criterionDesc : 'AriaKBAccess.description.',
	                requirementUrl: '',
			        rules : {
	            		// defined in doc-structure-rules.js
	            		'missingrole' : {severityCode:'level.Violation', messageCode:'ariaKBAccessible.msg.missingrole'},
	            		'missingkeyequiv' : {severityCode:'level.Violation', messageCode:'ariaKBAccessible.msg.missingkeyequiv'},
	            		'invalidtabindex' : {severityCode:'level.PotentialViolation', messageCode:'ariaKBAccessible.msg.invalidtabindex'},
	            		'missingfocusablechild' : {severityCode:'level.PotentialViolation', messageCode:'ariaKBAccessible.msg.missingfocusablechild'},
	            		'missingkeyevent' : {severityCode:'level.PotentialViolation', messageCode:'ariaKBAccessible.msg.missingkeyevent'}
	 		    	}
			    }, //2.4.4
	        ] 
});
