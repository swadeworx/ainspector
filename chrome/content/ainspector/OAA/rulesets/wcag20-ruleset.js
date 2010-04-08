OpenAjax.a11y.addRuleset(
    {
        // basic info
    	id : "WCAG_2_0",
        nameCode : "WCAG20.name",
        descriptionCode : "WCAG20.description",
        
        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : "http://www.w3.org/TR/WCAG20/",
        // baseReqUrl - used to resolve relative urls of requirementUrls only
        baseReqUrl : "http://www.w3.org/TR/WCAG20/",
        
        requirements : [
            {
                criterionNumber : '1.1.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.1_1_1',
                requirementUrl: '#text-equiv',
		        rules : {
		            // defined in text-equiv-rules.js    
		    	    'imgAltAttrMissing' : {severityCode:'level.violation', messageCode:'images.msg.altmissing'},
		            'imgAltAttrWithForebiddenFileExt' : {severityCode:'level.violation', messageCode:'images.msg.althasfileext'},
		            'imgAltAttrWithForebiddenWord' : {severityCode:'level.violation', messageCode:'images.msg.altforbidenword'},
		            'imgAltAttrLength' : {severityCode:'level.potentialViolation', messageCode:'images.msg.altbadlen'},
		            'imgAltLongdescInvalid' : {severityCode:'level.potentialViolation', messageCode:'images.msg.invalidLongdesc'},
		            'imgPresentationalWithAltOrTitle' : {severityCode:'level.recommendation', messageCode:'images.msg.imgPresentationalWithAltOrTitle'},
		            'imgAltAttrEmptyTitleAttrPresent' : {severityCode:'level.recommendation', messageCode:'images.msg.altother'}
            	}
            }, // 1.1.1
            
            {
                criterionNumber : '1.3.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.1_3_1',
                requirementUrl: '#text-equiv',
		        rules : {
		            // defined in text-equiv-rules.js    
		    	    'missingsummary' : {severityCode:'level.violation', messageCode:'dataTables.msg.missingsummary'},
		            'missingheaders' : {severityCode:'level.violation', messageCode:'dataTables.msg.missingheaders'},
		            'duplicatesummary' : {severityCode:'level.violation', messageCode:'dataTables.msg.duplicatesummary'},
		            'thmissingID' : {severityCode:'level.potentialViolation', messageCode:'dataTables.msg.thmissingID'},
		            'duplicateTHEleID' : {severityCode:'level.potentialViolation', messageCode:'dataTables.msg.duplicateTHEleID'},
		            'tdmissingheaders' : {severityCode:'level.recommendation', messageCode:'dataTables.msg.tdmissingheaders'},
		            'invalidThIDREF' : {severityCode:'level.recommendation', messageCode:'dataTables.msg.invalidIDREF'}
            	}
            }, // 1.3.1
            {
                criterionNumber : '1.3.2',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.1_3_2',
                requirementUrl: '#text-equiv',
		        rules : {
		            // defined in text-equiv-rules.js    
		    	    'missinglayouttable' : {severityCode:'level.violation', messageCode:'layoutTables.msg.missingtable'},
		            'missingCSS' : {severityCode:'level.violation', messageCode:'layoutTables.msg.missingCSS'},
		            'useCSSproperties' : {severityCode:'level.violation', messageCode:'layoutTables.msg.issubtable'}
            	}
            }, // 1.3.2
		    {
                criterionNumber : '1.4.3',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.1_4_3',
                requirementUrl: '#visual-audio-contrast',
		        rules : {
            		// defined in doc-structure-rules.js
            		'belowminimal' : {severityCode: 'level.Violation', messageCode:'colorcontrast.msg.belowminimal'},
            		'belowoptimal' : {severityCode:'level.manual', messageCode:'colorcontrast.msg.belowoptimal'},
            		'usesFontAttr' : {severityCode:'level.recommendation', messageCode:'colorcontrast.msg.usesFontAttr'}
 		    	}
		    }, // 2.4.2 
	           
            {
                criterionNumber : '2.1.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_1_1',
                requirementUrl: '#keyboard-operation',
		        rules : {
            		// defined in doc-structure-rules.js
        			'missingonfocus' : {severityCode:'level.potentialViolation', messageCode:'events.msg.missingonfocus'},           		
    				'missingonblur' : {severityCode:'level.potentialViolation', messageCode:'events.msg.missingonblur'},           		
            		'nonfocusableonclick' : {severityCode:'level.potentialViolation', messageCode:'events.msg.nonfocusableonclick'},           		
        		//	'nonfocusableonmouse' : {severityCode:'level.potentialViolation', messageCode:'events.msg.nonfocusableonmouse'},           		
    				'selectonchange' : {severityCode:'level.recommendation', messageCode:'events.msg.selectonchange'},           		
    				'missingkeyboardequiv' : {severityCode:'level.recommendation', messageCode:'events.msg.missingkeyequiv'}           		
		    	}
		    }, // 2.1.1 
          
            {
                criterionNumber : '2.1.3',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_1_3',
                requirementUrl: '#keyboard-operation',
		        rules : {
            		// defined in doc-structure-rules.js
            		'duplicateAccesskey' : {severityCode:'level.potentialViolation', messageCode:'accesskey.msg.duplicateAccesskey'},           		
       				'ieconflict' : {severityCode:'level.recommendation', messageCode:'accesskey.msg.ieconflict'}           		
		    	}
		    }, // 2.1.3 
            
            {
                criterionNumber : '2.2.2',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_2_2',
                requirementUrl: '#time-limits',
		        rules : {
            		// defined in doc-structure-rules.js
            		'blinkmarquee' : {severityCode:'level.Violation', messageCode:'textstyling.msg.blinkmarquee'}           		
		    	}
		    }, // 2.2.2 
	           
            {
                criterionNumber : '2.4.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_4_1',
                requirementUrl: '#navigation-mechanisms',
		        rules : {
            		// defined in doc-structure-rules.js
        			'framemissingtitle' : {severityCode:'level.Violation', messageCode:'frames.msg.framemissingtitle'},           		
    				'frameduplicatetitle' : {severityCode:'level.Violation', messageCode:'frames.msg.frameduplicatetitle'},           		
            		'emptyframe' : {severityCode:'level.potentialViolation', messageCode:'frames.msg.emptyframe'}           		
		    	}
		    }, // 2.4.1 

		    {
                criterionNumber : '2.4.2',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_4_2',
                requirementUrl: '#navigation-mechanisms',
		        rules : {
            		// defined in doc-structure-rules.js
            		'titleMissingOrEmpty' : {severityCode:'level.Violation', messageCode:'titles.msg.missingOrEmptyTitle'},
            		'h1MissingOrEmpty' : {severityCode:'level.Violation', messageCode:'titles.msg.missingOrEmptyH1'},
            		'h1OnlyAlt' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.H1OnlyAlt'},
            		'titleMissingH1Words' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.titlemissingh1words'},
            		'toomanyh1' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.toomanyh1'}
 		    	}
		    }, // 2.4.2 
			{
                criterionNumber : '2.4.4',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.2_4_2',
                requirementUrl: '#navigation-mechanisms',
		        rules : {
            		// defined in doc-structure-rules.js
            		'linktooshort' : {severityCode:'level.Violation', messageCode:'links.msg.tooshort'},
            		'sameURLdiffLinks' : {severityCode:'level.Violation', messageCode:'links.msg.sameURLdiffLinks'},
            		'sameLinkdiffURL' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.sameLinkdiffURL'},
            		'imgTooSmall' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.imgTooSmall'},
            		'altequaltextcontent' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.altequaltextcontent'}
 		    	}
		    }, //2.4.4
		
		    {
		        criterionNumber : '2.4.6',
		        criterionLevel : 'WCAG20.level.AA',
		        criterionDesc : 'WCAG20.description.2_4_6',
		        requirementUrl: '#navigation-mechanisms',
		        rules : {
		    		// defined in doc-structure-rules.js
		    		'headingTextMissing' : {severityCode:'level.Violation', messageCode:'headers.msg.emptyheader'},
		    		'headingOnlyAlt' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.headerOnlyAlt'},
		    		'headingTextLength' : {severityCode:'level.Recommendation', messageCode:'headers.msg.toolong'},
		    		'headingImproperNesting' : {severityCode:'level.Violation', messageCode:'headers.msg.impropernesting'},
		       		'siblingDupName' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.siblingDupName'},
		       		'noHeaders' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.noHeaders'}
			    }
			}, // 2.4.6 
			
            {
                criterionNumber : '3.1.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.3_1_1',
                requirementUrl: '#meaning',
		        rules : {
            		// defined in doc-structure-rules.js
           			'langMissing' : {severityCode:'level.Violation', messageCode:'languages.msg.langMissing'},           		
            		'invalidLanguage' : {severityCode:'level.Violation', messageCode:'languages.msg.invalidLanguage'}           		
		    	}
		    }, // 3.1.1 
            
		    {
		        criterionNumber : '3.3.2',
		        criterionLevel : 'WCAG20.level.AA',
		        criterionDesc : 'WCAG20.description.3_3_2',
		        requirementUrl: '#minimize-error',
		        rules : {
		    		// defined in doc-structure-rules.js
		    		'missinglegend' : {severityCode:'level.Violation', messageCode:'forms.msg.missinglegend'},
		    		'encapsulatinglabel' : {severityCode:'level.Violation', messageCode:'forms.msg.encapsulatinglabel'},
		    		'missinglabelandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missinglabelandtitle'},
		    		'missingaltandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missingaltandtitle'},
		       		'missingvalueandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missingvalueandtitle'},
		       		'missingbuttoncontent' : {severityCode:'level.Violation', messageCode:'forms.msg.missingbuttoncontent'},
		       		'duplicatelabel': {severityCode:'level.Violation', messageCode:'forms.msg.duplicatelabel'},
		       		'emptylable' : {severityCode:'level.Violation', messageCode:'forms.msg.emptylable'},
		    		'emptylegend' : {severityCode:'level.Violation', messageCode:'forms.msg.emptylegend'},
		    		'emptytitle' : {severityCode:'level.Violation', messageCode:'forms.msg.emptytitle'},
		    		'duplicateFormEleID' : {severityCode:'level.PotentialViolation', messageCode:'forms.msg.duplicateFormEleID'} 
			    }
			}, // 3.3.2 
			{
                criterionNumber : '4.1.1',
                criterionLevel : 'WCAG20.level.A',
                criterionDesc : 'WCAG20.description.4_1_1',
                requirementUrl: '#navigation-mechanisms',
		        rules : {
            		// defined in style-rules.js
            		'useBoldAttr' : {severityCode:'level.Violation', messageCode:'textstyling.msg.bold'},
            		'useItalicAttr' : {severityCode:'level.Violation', messageCode:'textstyling.msg.italics'},
            		'useUnderline' : {severityCode:'level.Violation', messageCode:'textstyling.msg.underline'}
 		    	}
		    }, //4.1.1

]
    }
);

OpenAjax.a11y.addRuleset(
	    {
	        // basic info
	    	id : "IITAA_1_0",
	        nameCode : "IITAA10.name",
	        descriptionCode : "IITAA10.description",
	        
	        // rulesetUrl - URL of the checklist/ruleset as a whole
	        rulesetUrl : "http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html",
	        // baseReqUrl - used to resolve relative urls of requirementUrls only
	        baseReqUrl : "http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html",
	        
	        requirements : [ 
	        {
                criterionNumber : '1.1',
                criterionLevel : 'IITAA10.level.A',
                criterionDesc : 'IITAA10.description.1_1',
                requirementUrl: '#text-equiv',
		        rules : {
		            // defined in text-equiv-rules.js    
		    	    'imgAltAttrMissing' : {severityCode:'level.violation', messageCode:'images.msg.altmissing'},
		            'imgAltAttrWithForebiddenFileExt' : {severityCode:'level.violation', messageCode:'images.msg.althasfileext'},
		            'imgAltAttrWithForebiddenWord' : {severityCode:'level.violation', messageCode:'images.msg.altforbidenword'},
		            'imgAltAttrLength' : {severityCode:'level.potentialViolation', messageCode:'images.msg.altbadlen'},
		            'imgAltLongdescInvalid' : {severityCode:'level.potentialViolation', messageCode:'images.msg.invalidLongdesc'},
		            'imgPresentationalWithAltOrTitle' : {severityCode:'level.recommendation', messageCode:'images.msg.imgPresentationalWithAltOrTitle'},
		            'imgAltAttrEmptyTitleAttrPresent' : {severityCode:'level.recommendation', messageCode:'images.msg.altother'}
            	}
            }, // 1.1.1
	       {
                criterionNumber : '11.1',
                criterionLevel : 'IITAA10.level.A',
                criterionDesc : 'IITAA10.description.11_1',
                requirementUrl: '#text-equiv',
		        rules : {
		            // defined in text-equiv-rules.js    
		    	    'missingsummary' : {severityCode:'level.violation', messageCode:'dataTables.msg.missingsummary'},
		            'missingheaders' : {severityCode:'level.violation', messageCode:'dataTables.msg.missingheaders'},
		            'duplicatesummary' : {severityCode:'level.violation', messageCode:'dataTables.msg.duplicatesummary'},
		            'thmissingID' : {severityCode:'level.potentialViolation', messageCode:'dataTables.msg.thmissingID'},
		            'duplicateTHEleID' : {severityCode:'level.potentialViolation', messageCode:'dataTables.msg.duplicateTHEleID'},
		            'tdmissingheaders' : {severityCode:'level.recommendation', messageCode:'dataTables.msg.tdmissingheaders'},
		            'invalidThIDREF' : {severityCode:'level.recommendation', messageCode:'dataTables.msg.invalidIDREF'}
            	}
            }, // 1.3.1
	        {
                criterionNumber : '13.2',
                criterionLevel : 'IITAA10.level.A',
                criterionDesc : 'IITAA10.description.13_2',
                requirementUrl: '#keyboard-operation',
		        rules : {
            		// defined in doc-structure-rules.js
        			'missingonfocus' : {severityCode:'level.potentialViolation', messageCode:'events.msg.missingonfocus'},           		
    				'missingonblur' : {severityCode:'level.potentialViolation', messageCode:'events.msg.missingonblur'},           		
            		'nonfocusableonclick' : {severityCode:'level.potentialViolation', messageCode:'events.msg.nonfocusableonclick'},           		
        //			'nonfocusableonmouse' : {severityCode:'level.potentialViolation', messageCode:'events.msg.nonfocusableonmouse'},           		
    				'selectonchange' : {severityCode:'level.recommendation', messageCode:'events.msg.selectonchange'},           		
    				'missingkeyboardequiv' : {severityCode:'level.recommendation', messageCode:'events.msg.missingkeyequiv'}           		
		    	}
		    }, // 2.1.1 
	        {
	                criterionNumber : '9.2',
	                criterionLevel : 'IITAA10.level.A',
	                criterionDesc : 'IITAA10.description.9_2',
	                requirementUrl: '#navigation-mechanisms',
			        rules : {
	            		// defined in doc-structure-rules.js
	        			'framemissingtitle' : {severityCode:'level.Violation', messageCode:'frames.msg.framemissingtitle'},           		
	    				'frameduplicatetitle' : {severityCode:'level.Violation', messageCode:'frames.msg.frameduplicatetitle'},           		
	            		'emptyframe' : {severityCode:'level.potentialViolation', messageCode:'frames.msg.emptyframe'}           		
			    	}
			    }, // 2.4.1 
			      {
                criterionNumber : '1.3',
                criterionLevel : 'IITAA10.level.A',
                criterionDesc : 'IITAA10.description.1_3',
                requirementUrl: '#navigation-mechanisms',
		        rules : {
            		// defined in doc-structure-rules.js
            		'titleMissingOrEmpty' : {severityCode:'level.Violation', messageCode:'titles.msg.missingOrEmptyTitle'},
            		'h1MissingOrEmpty' : {severityCode:'level.Violation', messageCode:'titles.msg.missingOrEmptyH1'},
            		'h1OnlyAlt' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.H1OnlyAlt'},
            		'titleMissingH1Words' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.titlemissingh1words'},
            		'toomanyh1' : {severityCode:'level.PotentialViolation', messageCode:'titles.msg.toomanyh1'}
 		    	}
		    }, // 2.4.2 
	        {
	                criterionNumber : '9.1',
	                criterionLevel : 'IITAA10.level.A',
	                criterionDesc : 'IITAA10.description.9_1',
	                requirementUrl: '#navigation-mechanisms',
			        rules : {
	            		// defined in doc-structure-rules.js
	            		'linktooshort' : {severityCode:'level.Violation', messageCode:'links.msg.tooshort'},
	            		'sameURLdiffLinks' : {severityCode:'level.Violation', messageCode:'links.msg.sameURLdiffLinks'},
	            		'sameLinkdiffURL' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.sameLinkdiffURL'},
	            		'imgTooSmall' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.imgTooSmall'},
	            		'altequaltextcontent' : {severityCode:'level.PotentialViolation', messageCode:'links.msg.altequaltextcontent'}
	 		    	}
			    }, //2.4.4
			    
		    {
		        criterionNumber : '1.4',
		        criterionLevel : 'IITAA10.level.AA',
		        criterionDesc : 'IITAA10.description.1_4',
		        requirementUrl: '#navigation-mechanisms',
		        rules : {
		    		// defined in doc-structure-rules.js
		    		'headingTextMissing' : {severityCode:'level.Violation', messageCode:'headers.msg.emptyheader'},
		    		'headingOnlyAlt' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.headerOnlyAlt'},
		    		'headingTextLength' : {severityCode:'level.Recommendation', messageCode:'headers.msg.toolong'},
		    		'headingImproperNesting' : {severityCode:'level.Violation', messageCode:'headers.msg.impropernesting'},
		       		'siblingDupName' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.siblingDupName'},
		       		'noHeaders' : {severityCode:'level.PotentialViolation', messageCode:'headers.msg.noHeaders'}
			    }
			}, // 2.4.6 
			
			{
                criterionNumber : '2.3',
                criterionLevel : 'IITAA10.level.A',
                criterionDesc : 'IITAA10.description.2_3',
                requirementUrl: '#meaning',
		        rules : {
            		// defined in doc-structure-rules.js
           			'langMissing' : {severityCode:'level.Violation', messageCode:'languages.msg.langMissing'},           		
            		'invalidLanguage' : {severityCode:'level.Violation', messageCode:'languages.msg.invalidLanguage'}           		
		    	}
		    }, // 3.1.1 
			{
		        criterionNumber : '10.1',
		        criterionLevel : 'IITAA10.level.AA',
		        criterionDesc : 'IITAA10.description.10_1',
		        requirementUrl: '#minimize-error',
		        rules : {
		    		// defined in doc-structure-rules.js
		    		'missinglegend' : {severityCode:'level.Violation', messageCode:'forms.msg.missinglegend'},
		    		'encapsulatinglabel' : {severityCode:'level.Violation', messageCode:'forms.msg.encapsulatinglabel'},
		    		'missinglabelandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missinglabelandtitle'},
		    		'missingaltandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missingaltandtitle'},
		       		'missingvalueandtitle' : {severityCode:'level.Violation', messageCode:'forms.msg.missingvalueandtitle'},
		       		'missingbuttoncontent' : {severityCode:'level.Violation', messageCode:'forms.msg.missingbuttoncontent'},
		       		'duplicatelabel': {severityCode:'level.Violation', messageCode:'forms.msg.duplicatelabel'},
		       		'emptylable' : {severityCode:'level.Violation', messageCode:'forms.msg.emptylable'},
		    		'emptylegend' : {severityCode:'level.Violation', messageCode:'forms.msg.emptylegend'},
		    		'emptytitle' : {severityCode:'level.Violation', messageCode:'forms.msg.emptytitle'},
		    		'duplicateFormEleID' : {severityCode:'level.PotentialViolation', messageCode:'forms.msg.duplicateFormEleID'} 
			    }
			}, // 3.3.2 
	        ] 
});

        