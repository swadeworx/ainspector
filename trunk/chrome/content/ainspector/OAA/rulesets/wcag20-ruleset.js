
//
// OpenAjax Alliance (OAA) Rule Set for WCAG 2.0 (Beta)
//

OpenAjax.a11y.addRuleset(
    {
        //
        // Basic info
        //
    	  id : 'WCAG_2_0',                      // Unique ID reference for ruleset
        nameCode : 'name',                    // Reference to the name of requirements document in the NLS file
        descriptionCode : 'description',      // Reference to the description of the requirements document in the NLS file
        versionCode : 'version',              // Reference to the ruleset version in the NLS file
        date: '2011-02-24',                   // Date this file was last modified


        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : 'http://www.w3.org/TR/WCAG20/',

        // baseReqUrl - used to resolve relative urls of requirementUrls only
        baseReqUrl : '',

        //
        //  WCAG 2.0 Success Criteria mapping of OAA Rules
        //
        requirements : [

                 //
                 // WCAG 2.0 Success Criteria 1.1.1 Non-text Content
                 //
               {
                 requirementNumber : '1.1.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#text-equiv',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 4: Length of alt text.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_4' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_4',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.1.1

                 //
                 // WCAG 2.0 Success Criteria 1.2.1 Audio-only and Video-only (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 80: Prerecorded video with no audio track needs text or audio descriptions of the video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_80' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_80',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.1

                 //
                 // WCAG 2.0 Success Criteria 1.2.2 Captions (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 81: Prerecorded video with audio track needs synchronized captions.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_81' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_81',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.2

                 //
                 // WCAG 2.0 Success Criteria 1.2.3 Audio Description or Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.3',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 82: Prerecorded video with audio track needs a audio or text description of the video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_82' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_82',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.3

                 //
                 // WCAG 2.0 Success Criteria 1.2.4 Captions (Live)
                 //
               {
                 requirementNumber : '1.2.4',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 83: Live audio of speech requires realtime captioning of the speakers.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_83' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_83',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.4

                 //
                 // WCAG 2.0 Success Criteria 1.2.5 Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.5',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 84: Synchronized audio descriptons of video.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_84' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_84',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.5

                 //
                 // WCAG 2.0 Success Criteria 1.2.6 Sign Language (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.6',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 85: Synchronized sign language for audio track.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_85' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_85',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.6

                 //
                 // WCAG 2.0 Success Criteria 1.2.7 Extended Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.7',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 86: Extended audio description if audio track does not provided enhough time to fully describe video content.
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_86' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_86',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.7

                 //
                 // WCAG 2.0 Success Criteria 1.2.8 Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.8',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 87: Text alternative to audio and video content
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_87' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_87',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.8

                 //
                 // WCAG 2.0 Success Criteria 1.2.9 Audio-only (Live)
                 //
               {
                 requirementNumber : '1.2.9',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 88: Provide text alternatives to live audio
                                // Group 5: Audio and Video Rule
                                //
                     'RULE_88' : {
                                severityCode : 'SEVERITY_POTENTIAL_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_PROPOSED',
                                messageCode  : 'MESSAGE_88',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.2.9

                 //
                 // WCAG 2.0 Success Criteria 1.3.1 Info and Relationships
                 //
               {
                 requirementNumber : '1.3.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.3.1

                 //
                 // WCAG 2.0 Success Criteria 1.3.2 Meaningful Sequence
                 //
               {
                 requirementNumber : '1.3.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.3.2

                 //
                 // WCAG 2.0 Success Criteria 1.3.3 Sensory Characteristics
                 //
               {
                 requirementNumber : '1.3.3',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
                   messageCode  : 'MESSAGE_15',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.3.3

                 //
                 // WCAG 2.0 Success Criteria 1.4.1 Use of Color
                 //
               {
                 requirementNumber : '1.4.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.4.1

                 //
                 // WCAG 2.0 Success Criteria 1.4.2 Audio Control
                 //
               {
                 requirementNumber : '1.4.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.2

                 //
                 // WCAG 2.0 Success Criteria 1.4.3 Contrast (Minimum)
                 //
               {
                 requirementNumber : '1.4.3',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 1.4.3

                 //
                 // WCAG 2.0 Success Criteria 1.4.4 Resize text
                 //
               {
                 requirementNumber : '1.4.4',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.4

                 //
                 // WCAG 2.0 Success Criteria 1.4.5 Images of Text
                 //
               {
                 requirementNumber : '1.4.5',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.5

                 //
                 // WCAG 2.0 Success Criteria 1.4.6 Contrast (Enhanced)
                 //
               {
                 requirementNumber : '1.4.6',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.6

                 //
                 // WCAG 2.0 Success Criteria 1.4.7 Low or No Background Audio
                 //
               {
                 requirementNumber : '1.4.7',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.7

                 //
                 // WCAG 2.0 Success Criteria 1.4.8 Visual Presentation
                 //
               {
                 requirementNumber : '1.4.8',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.8

                 //
                 // WCAG 2.0 Success Criteria 1.4.9 Images of Text (No Exception)
                 //
               {
                 requirementNumber : '1.4.9',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 1.4.9

                 //
                 // WCAG 2.0 Success Criteria 2.1.1 Keyboard
                 //
               {
                 requirementNumber : '2.1.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.1.1

                 //
                 // WCAG 2.0 Success Criteria 2.1.2 No Keyboard Trap
                 //
               {
                 requirementNumber : '2.1.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.1.2

                 //
                 // WCAG 2.0 Success Criteria 2.1.3 Keyboard (No Exception)
                 //
               {
                 requirementNumber : '2.1.3',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 23: Accesskey attribute values should be unique.
                                // Group 13: Accesskey Rule
                                //
                     'RULE_23' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_23',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.1.3

                 //
                 // WCAG 2.0 Success Criteria 2.2.1 Timing Adjustable
                 //
               {
                 requirementNumber : '2.2.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.2.1

                 //
                 // WCAG 2.0 Success Criteria 2.2.2 Pause, Stop, Hide
                 //
               {
                 requirementNumber : '2.2.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 25: The blink and marquee elements must not be used.
                                // Group 7: Styling Rule
                                //
                     'RULE_25' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_25',
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.2.2

                 //
                 // WCAG 2.0 Success Criteria 2.2.3 No Timing
                 //
               {
                 requirementNumber : '2.2.3',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.2.3

                 //
                 // WCAG 2.0 Success Criteria 2.2.4 Interruptions
                 //
               {
                 requirementNumber : '2.2.4',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.2.4

                 //
                 // WCAG 2.0 Success Criteria 2.2.5 Re-authenticating
                 //
               {
                 requirementNumber : '2.2.5',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.2.5

                 //
                 // WCAG 2.0 Success Criteria 2.3.1 Three Flashes or Below Threshold
                 //
               {
                 requirementNumber : '2.3.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.3.1

                 //
                 // WCAG 2.0 Success Criteria 2.3.2 Three Flashes
                 //
               {
                 requirementNumber : '2.3.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.3.2

                 //
                 // WCAG 2.0 Success Criteria 2.4.1 Bypass Blocks
                 //
               {
                 requirementNumber : '2.4.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.4.1

                 //
                 // WCAG 2.0 Success Criteria 2.4.2 Page Titled
                 //
               {
                 requirementNumber : '2.4.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 30: Missing or empty H1 element.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_30' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                messageCode  : 'MESSAGE_30',
                                enabled      : 'true',
                              },
                                //
                                // Rule 31: H1 element content should not come only from the alt text of an image.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_31' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_31',
                                enabled      : 'true',
                              },
                                //
                                // Rule 32: H1 should match a subset of the words in the title element.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_32' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_32',
                                enabled      : 'true',
                              },
                                //
                                // Rule 33: No more than two h1 elements.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_33' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_33',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.4.2

                 //
                 // WCAG 2.0 Success Criteria 2.4.3 Focus Order
                 //
               {
                 requirementNumber : '2.4.3',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.3

                 //
                 // WCAG 2.0 Success Criteria 2.4.4 Link Purpose (In Context)
                 //
               {
                 requirementNumber : '2.4.4',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 34: Link text should be as least four 4 characters long.
                                // Group 11: Link Rule
                                //
                     'RULE_34' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_34',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 37: Images should be at least 16 pixels by 16 pixels when used as links.
                                // Group 4: Image and Area Rule
                                //
                     'RULE_37' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_37',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.4.4

                 //
                 // WCAG 2.0 Success Criteria 2.4.5 Multiple Ways
                 //
               {
                 requirementNumber : '2.4.5',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.5

                 //
                 // WCAG 2.0 Success Criteria 2.4.6 Headings and Labels
                 //
               {
                 requirementNumber : '2.4.6',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 40: Text content for a headings must not come just from image alt text.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_40' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_40',
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
                                enabled      : 'true',
                              },
                                //
                                // Rule 43: The content of the headings of the same level within the same section should be unique.
                                // Group 2: Landmark and Header Rule
                                //
                     'RULE_43' : {
                                severityCode : 'SEVERITY_RECOMMENDATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                   messageCode  : 'MESSAGE_43',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 2.4.6

                 //
                 // WCAG 2.0 Success Criteria 2.4.7 Focus Visible
                 //
               {
                 requirementNumber : '2.4.7',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.7

                 //
                 // WCAG 2.0 Success Criteria 2.4.8 Location
                 //
               {
                 requirementNumber : '2.4.8',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.8

                 //
                 // WCAG 2.0 Success Criteria 2.4.9 Link Purpose (Link Only)
                 //
               {
                 requirementNumber : '2.4.9',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.9

                 //
                 // WCAG 2.0 Success Criteria 2.4.10 Section Headings
                 //
               {
                 requirementNumber : '2.4.10',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 2.4.10

                 //
                 // WCAG 2.0 Success Criteria 3.1.1 Language of Page
                 //
               {
                 requirementNumber : '3.1.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 3.1.1

                 //
                 // WCAG 2.0 Success Criteria 3.1.2 Language of Parts
                 //
               {
                 requirementNumber : '3.1.2',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.1.2

                 //
                 // WCAG 2.0 Success Criteria 3.1.3 Unusual Words
                 //
               {
                 requirementNumber : '3.1.3',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.1.3

                 //
                 // WCAG 2.0 Success Criteria 3.1.4 Abbreviations
                 //
               {
                 requirementNumber : '3.1.4',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.1.4

                 //
                 // WCAG 2.0 Success Criteria 3.1.5 Reading Level
                 //
               {
                 requirementNumber : '3.1.5',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.1.5

                 //
                 // WCAG 2.0 Success Criteria 3.1.6 Pronunciation
                 //
               {
                 requirementNumber : '3.1.6',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.1.6

                 //
                 // WCAG 2.0 Success Criteria 3.2.1 On Focus
                 //
               {
                 requirementNumber : '3.2.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.2.1

                 //
                 // WCAG 2.0 Success Criteria 3.2.2 On Input
                 //
               {
                 requirementNumber : '3.2.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.2.2

                 //
                 // WCAG 2.0 Success Criteria 3.2.3 Consistent Navigation
                 //
               {
                 requirementNumber : '3.2.3',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.2.3

                 //
                 // WCAG 2.0 Success Criteria 3.2.4 Consistent Identification
                 //
               {
                 requirementNumber : '3.2.4',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.2.4

                 //
                 // WCAG 2.0 Success Criteria 3.2.5 Change on Request
                 //
               {
                 requirementNumber : '3.2.5',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.2.5

                 //
                 // WCAG 2.0 Success Criteria 3.3.1 Error Identification
                 //
               {
                 requirementNumber : '3.3.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.3.1

                 //
                 // WCAG 2.0 Success Criteria 3.3.2 Labels or Instructions
                 //
               {
                 requirementNumber : '3.3.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 47: Each fieldset element should contain a legend element.
                                // Group 6: Form/Widget Rule
                                //
                     'RULE_47' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P1',
                                statusCode   : 'STATUS_ACCEPTED',
                                   messageCode  : 'MESSAGE_47',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 3.3.2

                 //
                 // WCAG 2.0 Success Criteria 3.3.3 Error Suggestion
                 //
               {
                 requirementNumber : '3.3.3',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.3.3

                 //
                 // WCAG 2.0 Success Criteria 3.3.4 Error Prevention (Legal, Financial, Data)
                 //
               {
                 requirementNumber : '3.3.4',
                 requirementLevel  : 'LEVEL.AA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.3.4

                 //
                 // WCAG 2.0 Success Criteria 3.3.5 Help
                 //
               {
                 requirementNumber : '3.3.5',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.3.5

                 //
                 // WCAG 2.0 Success Criteria 3.3.6 Error Prevention (All)
                 //
               {
                 requirementNumber : '3.3.6',
                 requirementLevel  : 'LEVEL.AAA',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
                 enabled           : 'true',
                 rules : {
                                //
                                // No rules defined
                                //
                 }
               }, // end success criteria 3.3.6

                 //
                 // WCAG 2.0 Success Criteria 4.1.1 Parsing Content
                 //
               {
                 requirementNumber : '4.1.1',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
                 enabled           : 'true',
                 rules : {
                                //
                                // Rule 58: Do not use the B element.
                                // Group 7: Styling Rule
                                //
                     'RULE_58' : {
                                severityCode : 'SEVERITY_VIOLATION',
                                priorityCode : 'PRIORITY_P2',
                                statusCode   : 'STATUS_ACCEPTED',
                                  messageCode  : 'MESSAGE_58',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 4.1.1

                 //
                 // WCAG 2.0 Success Criteria 4.1.2 Name, Role, Value
                 //
               {
                 requirementNumber : '4.1.2',
                 requirementLevel  : 'LEVEL.A',
                 requirementUrl    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
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
                                enabled      : 'true',
                              },
                 }
               }, // end success criteria 4.1.2

      ]
    }
);



