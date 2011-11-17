
//
// OpenAjax Alliance Rule Set for IITAA 1.0 (Beta)
//

OpenAjax.a11y.addRuleset(
    {
        //
        // Basic info
        //
    	id : 'IITAA_1_0',                     // Unique ID reference for ruleset
        nameCode : 'name',                    // Reference to the name of requirements document in the NLS file
        descriptionCode : 'description',      // Reference to the description of the requirements document in the NLS file
        versionCode : 'version',              // Reference to the ruleset version in the NLS file
        date: '2011-03-10',                   // Date this file was last modified


        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html',

        // baseReqUrl - used to resolve relative urls of requirementUrls only
        baseReqUrl : '',

        //
        //  IITAA 1.0 Requirements mapping of OAA Rules
        //
        requirements : [

                 //
                 // IITAA 1.0 Requirement 1.1 Use valid, standard web programming code.
                 //
               {
                 requirementNumber : '1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 1.1

                 //
                 // IITAA 1.0 Requirement 1.2 Use appropriate markup to convey document structure.
                 //
               {
                 requirementNumber : '1.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 1.2

                 //
                 // IITAA 1.0 Requirement 1.3 Provide meaningful page titles.
                 //
               {
                 requirementNumber : '1.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 29: Title element should not be empty.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_29' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_29',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 30: Missing or empty H1 element.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_30' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_30',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 31: H1 element content should not come only from the alt text of an image.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_31' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_31',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 32: H1 should match a subset of the words in the title element.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_32' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_32',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 33: No more than two h1 elements.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_33' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_33',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 1.3

                 //
                 // IITAA 1.0 Requirement 1.4 Use headings to introduce sections and sub-sections, and use them in the correct order.
                 //
               {
                 requirementNumber : '1.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.4',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 39: Headings must have text content.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_39' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_39',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 40: Text content for a headings must not come just from image alt text.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_40' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_40',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 41: Heading content should be concise.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_41' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_41',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 42: Heading elements should be properly nested.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_42' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_42',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 43: The content of the headings of the same level within the same section should be unique.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_43' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_43',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 44: Heading elements (h1..h6) should be used for structuring information on the page.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_44' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_44',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 1.4

                 //
                 // IITAA 1.0 Requirement 1.5 Use lists to identify series of related items, including navigation menus.
                 //
               {
                 requirementNumber : '1.5',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.5',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 1.5

                 //
                 // IITAA 1.0 Requirement 2.1 Use text to display text, unless formatting that cannot be achieved with CSS is required.
                 //
               {
                 requirementNumber : '2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 2.1

                 //
                 // IITAA 1.0 Requirement 2.2 Use relative sizes for fonts.
                 //
               {
                 requirementNumber : '2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 2.2

                 //
                 // IITAA 1.0 Requirement 2.3 Identify the language of text.
                 //
               {
                 requirementNumber : '2.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 45: Each page must have a lang attribute on its html element.
                                // Group 12: Language Rule
                                //
                     'RULE_45' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_45',
                                groupCode    : 'GROUP_12',
                                enabled      : 'true',
                                },
                                //
                                // Rule 46: lang attribute on html element must have a valid two-character language code.
                                // Group 12: Language Rule
                                //
                     'RULE_46' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_46',
                                groupCode    : 'GROUP_12',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 2.3

                 //
                 // IITAA 1.0 Requirement 2.4 Use images instead of "ASCII art."
                 //
               {
                 requirementNumber : '2.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.4',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 2.4

                 //
                 // IITAA 1.0 Requirement 3.1 Do not convey information with color alone.
                 //
               {
                 requirementNumber : '3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web3.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 89: Verify that color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_89' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_89',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 3.1

                 //
                 // IITAA 1.0 Requirement 3.2 Use contrasting foreground and background colors.
                 //
               {
                 requirementNumber : '3.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web3.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 3.2

                 //
                 // IITAA 1.0 Requirement 4.1 Provide appropriate "alternate text" for all images.
                 //
               {
                 requirementNumber : '4.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web4.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 1: Images must have valid alt text.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_1' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_1',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 2: Image file name is not valid alt text.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_2' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_2',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 3: Certain words cannot be used as a part of valid alt text
                                // Group 4: Image and Area Rule
                                //
                     'RULE_3' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_3',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 4: Length of alt text.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_4' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_4',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 5: Longdesc must have valid URI.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_5' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_5',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 6: If an image has an alt or title attribute, it should not have a presentation role.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_6' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_6',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 78: ALT text must describe content or purpose of image
                                // Group 4: Image and Area Rule
                                //
                     'RULE_78' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_78',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 4.1

                 //
                 // IITAA 1.0 Requirement 4.2 Provide full descriptions for graphs, diagrams, and other meaningful images.
                 //
               {
                 requirementNumber : '4.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web4.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 4.2

                 //
                 // IITAA 1.0 Requirement 5.1 Provide alternate text for each area in client-side image maps.
                 //
               {
                 requirementNumber : '5.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web5.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 5.1

                 //
                 // IITAA 1.0 Requirement 5.2 Use client-side image maps
                 //
               {
                 requirementNumber : '5.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web5.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 5.2

                 //
                 // IITAA 1.0 Requirement 6.1 Do not convey information with sound alone.
                 //
               {
                 requirementNumber : '6.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 6.1

                 //
                 // IITAA 1.0 Requirement 6.2 Do not automatically play audio.
                 //
               {
                 requirementNumber : '6.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 6.2

                 //
                 // IITAA 1.0 Requirement 6.3 Provide text transcripts for audio
                 //
               {
                 requirementNumber : '6.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 6.3

                 //
                 // IITAA 1.0 Requirement 7.1 Provide synchronized captions
                 //
               {
                 requirementNumber : '7.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web7.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 79: Prerecorded audio with no video or image tracks needs a text transcript which includes speaker information.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_79' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_79',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 81: Prerecorded video with audio track needs synchronized captions.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_81' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_81',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 83: Live audio of speech requires realtime captioning of the speakers.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_83' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_83',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 85: Synchronized sign language for audio track.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_85' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P3',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_85',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 87: Text alternative to audio and video content
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_87' : {
                                severityCode : 'SEVERITY_POTENTIAL_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P3',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_87',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 88: Provide text alternatives to live audio
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_88' : {
                                severityCode : 'SEVERITY_POTENTIAL_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P3',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_88',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 7.1

                 //
                 // IITAA 1.0 Requirement 7.2 Provide audio descriptions
                 //
               {
                 requirementNumber : '7.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web7.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 80: Prerecorded video with no audio track needs text or audio descriptions of the video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_80' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_80',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 82: Prerecorded video with audio track needs a audio or text description of the video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_82' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_82',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 84: Synchronized audio descriptons of video.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_84' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_84',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                                //
                                // Rule 86: Extended audio description if audio track does not provided enhough time to fully describe video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_86' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P3',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_86',
                                groupCode    : 'GROUP_5',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 7.2

                 //
                 // IITAA 1.0 Requirement 8.1 Pausing any moving, blinking, scrolling, or auto-updating information.
                 //
               {
                 requirementNumber : '8.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web8.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 8.1

                 //
                 // IITAA 1.0 Requirement 8.2 Do not include content that flashes faster than 3 times per second.
                 //
               {
                 requirementNumber : '8.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web8.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 8.2

                 //
                 // IITAA 1.0 Requirement 9.1 Ensure that links are understandable out of context.
                 //
               {
                 requirementNumber : '9.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 34: Link text should be as least four 4 characters long.
                                // Group 11: Link Rule
                                //
                     'RULE_34' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_34',
                                groupCode    : 'GROUP_11',
                                enabled      : 'true',
                                },
                                //
                                // Rule 35: Links with the same HREF should have the same link text.
                                // Group 11: Link Rule
                                //
                     'RULE_35' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_35',
                                groupCode    : 'GROUP_11',
                                enabled      : 'true',
                                },
                                //
                                // Rule 36: Links that point to different HREFs should have different link text.
                                // Group 11: Link Rule
                                //
                     'RULE_36' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_36',
                                groupCode    : 'GROUP_11',
                                enabled      : 'true',
                                },
                                //
                                // Rule 37: Images should be at least 16 pixels by 16 pixels when used as links.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_37' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_37',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                                //
                                // Rule 38: Links with images and text content, the alt attribute should be unique to the text content or empty.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_38' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_38',
                                groupCode    : 'GROUP_4',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 9.1

                 //
                 // IITAA 1.0 Requirement 9.2 Provide a means of skipping past repetitive navigation links.
                 //
               {
                 requirementNumber : '9.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 26: Frame element must have a title attribute.
                                // Group 8: Frame Rule
                                //
                     'RULE_26' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_26',
                                groupCode    : 'GROUP_8',
                                enabled      : 'true',
                                },
                                //
                                // Rule 27: Title attributes for frames must be unique.
                                // Group 8: Frame Rule
                                //
                     'RULE_27' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_27',
                                groupCode    : 'GROUP_8',
                                enabled      : 'true',
                                },
                                //
                                // Rule 28: Frames should not be hidden or empty.
                                // Group 8: Frame Rule
                                //
                     'RULE_28' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_28',
                                groupCode    : 'GROUP_8',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 9.2

                 //
                 // IITAA 1.0 Requirement 9.3 Avoid using small links.
                 //
               {
                 requirementNumber : '9.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 9.3

                 //
                 // IITAA 1.0 Requirement 9.4 Ensure that same-page links move keyboard focus as well as screen focus.
                 //
               {
                 requirementNumber : '9.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.4',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 9.4

                 //
                 // IITAA 1.0 Requirement 10.1 Provide labels or titles for all form fields.
                 //
               {
                 requirementNumber : '10.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 15: Color contrast ratio must be > 3 for large text
                                // Group 7: Styling Rule
                                //
                     'RULE_15' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_15',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 16: Color contrast ratio should be > 4.5
                                // Group 7: Styling Rule
                                //
                     'RULE_16' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_16',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 17: Do not use the FONT element to style text
                                // Group 7: Styling Rule
                                //
                     'RULE_17' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_17',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 23: Accesskey attribute values should be unique.
                                // Group 13: Accesskey Rule
                                //
                     'RULE_23' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_23',
                                groupCode    : 'GROUP_13',
                                enabled      : 'true',
                                },
                                //
                                // Rule 24: Accesskey attribute values should not interfere with IE shortcuts.
                                // Group 13: Accesskey Rule
                                //
                     'RULE_24' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_24',
                                groupCode    : 'GROUP_13',
                                enabled      : 'true',
                                },
                                //
                                // Rule 25: The blink and marquee elements must not be used.
                                // Group 7: Styling Rule
                                //
                     'RULE_25' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_25',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 47: Each fieldset element should contain a legend element.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_47' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_47',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 48: The label element should not encapsulate select and textarea elements.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_48' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_48',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 49: Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_49' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_49',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 50: Input element of type=[image] must have an alt or a title attribute.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_50' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_50',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 51: Input elements where type=[button|submit|reset] must have a value or title attribute.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_51' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_51',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 52: Each button element must contain content.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_52' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_52',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 53: Effective labels should be unique.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_53' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_53',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 54: Labels must have text content.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_54' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_54',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 55: Legends must have text content.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_55' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_55',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 56: Title attributes used for labeling form controls must have content.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_56' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_56',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 57: Form controls must have unique ids.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_57' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_57',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 58: Do not use the B element.
                                // Group 7: Styling Rule
                                //
                     'RULE_58' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_58',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 59: Do not use the I element.
                                // Group 7: Styling Rule
                                //
                     'RULE_59' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_59',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 60: Do not use the U element.
                                // Group 7: Styling Rule
                                //
                     'RULE_60' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_60',
                                groupCode    : 'GROUP_7',
                                enabled      : 'true',
                                },
                                //
                                // Rule 61: Title content should be concise.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_61' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_61',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                                //
                                // Rule 62: Title text must contain more than one word.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_62' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_62',
                                groupCode    : 'GROUP_2',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 10.1

                 //
                 // IITAA 1.0 Requirement 10.2 Provide legends for groups of form fields.
                 //
               {
                 requirementNumber : '10.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 10.2

                 //
                 // IITAA 1.0 Requirement 10.3 Ensure that form fields are in a logical tab order.
                 //
               {
                 requirementNumber : '10.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 10.3

                 //
                 // IITAA 1.0 Requirement 10.4 Avoid placing non-focusable text between form fields.
                 //
               {
                 requirementNumber : '10.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.4',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 10.4

                 //
                 // IITAA 1.0 Requirement 10.5 Ensure that text in form fields can be enlarged.
                 //
               {
                 requirementNumber : '10.5',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.5',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 10.5

                 //
                 // IITAA 1.0 Requirement 11.1 Identify a header cell for each column and row in simple data tables.
                 //
               {
                 requirementNumber : '11.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 7: Data tables must use summary attribute.
                                // Group 3: Data Table Rule
                                //
                     'RULE_7' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_7',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 8: Data tables must use th elements
                                // Group 3: Data Table Rule
                                //
                     'RULE_8' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_8',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 9: Summary attribute content must be unique.
                                // Group 3: Data Table Rule
                                //
                     'RULE_9' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_9',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 10: Complex data tables must have ids on th elements.
                                // Group 3: Data Table Rule
                                //
                     'RULE_10' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_10',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 11: For complex data tables table ids must be unique.
                                // Group 3: Data Table Rule
                                //
                     'RULE_11' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_11',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 12: Complex data table td elements must have header attributes.
                                // Group 3: Data Table Rule
                                //
                     'RULE_12' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_12',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                                //
                                // Rule 13: Complex data tables header ids must be on the page.
                                // Group 3: Data Table Rule
                                //
                     'RULE_13' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_13',
                                groupCode    : 'GROUP_3',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 11.1

                 //
                 // IITAA 1.0 Requirement 11.2 Identify relationships in complex data tables using id and headers attributes.
                 //
               {
                 requirementNumber : '11.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 11.2

                 //
                 // IITAA 1.0 Requirement 11.3 Provide summary attributes for data tables.
                 //
               {
                 requirementNumber : '11.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 11.3

                 //
                 // IITAA 1.0 Requirement 12.1 Provide concise, unique, and understandable titles for frames.
                 //
               {
                 requirementNumber : '12.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web12.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 12.1

                 //
                 // IITAA 1.0 Requirement 12.2 Avoid using hidden, empty, or non-essential frames.
                 //
               {
                 requirementNumber : '12.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web12.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 12.2

                 //
                 // IITAA 1.0 Requirement 13.1 Ensure that scripted functions are usable with assistive technologies.
                 //
               {
                 requirementNumber : '13.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 63: Check aria properties and states for valid roles and properties
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_63' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_63',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 64: ARIA attributes have valid values
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_64' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_64',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 65: ARIA ID references must be valid IDRefs
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_65' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_65',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 66: ARIA attributes can only be used with certain roles
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_66' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_66',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 67: Roles must contain their required child roles
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_67' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_67',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 68: Child roles must be contained by the proper parent role
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_68' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_68',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 69: Required properties and states should be defined
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_69' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_69',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 70: Required properties and states must not be empty
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_70' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_70',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 71: Role value must be valid
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_71' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_71',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 72: Check that 'ARIA-' attributes are valid properties and states
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_72' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_72',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 13.1

                 //
                 // IITAA 1.0 Requirement 13.2 Ensure that significant interactions can be performed with both keyboard and mouse.
                 //
               {
                 requirementNumber : '13.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 18: Focusable elements with MouseOver should also have OnFocus event handlers.
                                // Group 9: Scripting Rule
                                //
                     'RULE_18' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_18',
                                groupCode    : 'GROUP_9',
                                enabled      : 'true',
                                },
                                //
                                // Rule 19: Focusable elements with an OnMouseOut should also have OnBlur event handlers.
                                // Group 9: Scripting Rule
                                //
                     'RULE_19' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_19',
                                groupCode    : 'GROUP_9',
                                enabled      : 'true',
                                },
                                //
                                // Rule 20: Every onClick event handler should be on a focusable element.
                                // Group 9: Scripting Rule
                                //
                     'RULE_20' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_20',
                                groupCode    : 'GROUP_9',
                                enabled      : 'true',
                                },
                                //
                                // Rule 21: OnChange event handler should not be used with the select element.
                                // Group 9: Scripting Rule
                                //
                     'RULE_21' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_21',
                                groupCode    : 'GROUP_9',
                                enabled      : 'true',
                                },
                                //
                                // Rule 22: onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents.
                                // Group 9: Scripting Rule
                                //
                     'RULE_22' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_22',
                                groupCode    : 'GROUP_9',
                                enabled      : 'true',
                                },
                                //
                                // Rule 73: Check that non-form and non-anchor elements with event handlers have valid roles.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_73' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_73',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 74: Check that elements with mouse event handlers also have key event handlers
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_74' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_74',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 75: Check that enabled elements with ACTIVE-DESCENDANT have valid tab index
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_75' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_75',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 76: Check that elements without 'aria-activedescendant' that have roles requiring a container have focusable children
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_76' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_76',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                                //
                                // Rule 77: Check that elements without 'aria-activedescendant' that have roles requiring a container have key event handlers
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_77' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_77',
                                groupCode    : 'GROUP_6',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 13.2

                 //
                 // IITAA 1.0 Requirement 13.3 Avoid changing focus unexpectedly.
                 //
               {
                 requirementNumber : '13.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 13.3

                 //
                 // IITAA 1.0 Requirement 13.4 Avoid changing content unexpectedly.
                 //
               {
                 requirementNumber : '13.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.4',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 13.4

                 //
                 // IITAA 1.0 Requirement 14.1 Use accessible embedded objects whenever possible.
                 //
               {
                 requirementNumber : '14.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web14.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 14.1

                 //
                 // IITAA 1.0 Requirement 14.2 If an inaccessible embedded object must be used, provide an accessible alternative that includes the same content and functionality.
                 //
               {
                 requirementNumber : '14.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web14.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 14.2

                 //
                 // IITAA 1.0 Requirement 15.1 Provide natively accessible downloadable documents whenever possible.
                 //
               {
                 requirementNumber : '15.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web15.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 15.1

                 //
                 // IITAA 1.0 Requirement 15.2 If a downloadable document cannot be made natively accessible, provide an accessible alternative that includes the same content and functionality.
                 //
               {
                 requirementNumber : '15.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web15.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 15.2

                 //
                 // IITAA 1.0 Requirement 16.1 Notify users of time limits and provide a means to extend time if possible.
                 //
               {
                 requirementNumber : '16.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web16.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 16.1

                 //
                 // IITAA 1.0 Requirement 16.2 Do not automatically refresh the current page.
                 //
               {
                 requirementNumber : '16.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web16.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 16.2

                 //
                 // IITAA 1.0 Requirement 17.1 When using tables for layout, ensure that reading order is logical.
                 //
               {
                 requirementNumber : '17.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 14: Do not use nested tables for positioning.
                                // Group 10: Layout Rule
                                //
                     'RULE_14' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_14',
                                groupCode    : 'GROUP_10',
                                enabled      : 'true',
                                },
                 }   // end list of rules
               },  // end 17.1

                 //
                 // IITAA 1.0 Requirement 17.2 When using style sheets for layout, ensure that reading order is logical.
                 //
               {
                 requirementNumber : '17.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.2',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 17.2

                 //
                 // IITAA 1.0 Requirement 17.3 Avoid horizontal scrolling.
                 //
               {
                 requirementNumber : '17.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.3',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 17.3

                 //
                 // IITAA 1.0 Requirement 18.1 Use separate accessible versions only as a last resort.
                 //
               {
                 requirementNumber : '18.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementUrl    : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web18.1',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               },  // end 18.1

      ]
    }  // end ruleset
);



