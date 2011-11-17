/**
 * Copyright 2011 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) Rule Set for WCAG 2.0 (Beta)                        */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.addRuleset(
    {
        //
        // Basic info
        //
        id              : 'WCAG_2_0',       // Unique ID reference for ruleset
        nameCode        : 'name',           // Reference to the name of requirements document in the NLS file
        descriptionCode : 'description',    // Reference to the description of the requirements document in the NLS file
        versionCode     : 'version',        // Reference to the ruleset version in the NLS file
        date            : '2011-03-31',     // Date this file was last modified

        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : 'http://www.w3.org/TR/WCAG20/',
        // baseReqUrl - used to resolve relative urls of requirementURLs only
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
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#text-equiv',
                 enabled           : true,
                 rules : {
                                //
                                // Image 1
                                //
                     'IMAGE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 2
                                //
                     'IMAGE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 3
                                //
                     'IMAGE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 4 engish
                                //
                     'IMAGE_4_EN' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 4 french
                                //
                     'IMAGE_4_FR' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 5
                                //
                     'IMAGE_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Image 6
                                //
                     'IMAGE_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.1.1
                 //
                 // WCAG 2.0 Success Criteria 1.2.1 Audio-only and Video-only (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
                 enabled           : true,
                 rules : {
                                //
                                // Media 1
                                //
                     'MEDIA_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Media 1
                                //
                     'MEDIA_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }

                 }   // end list of rules
               }, // end success criteria 1.2.1
                 //
                 // WCAG 2.0 Success Criteria 1.2.2 Captions (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.2
                 //
                 // WCAG 2.0 Success Criteria 1.2.3 Audio Description or Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.3
                 //
                 // WCAG 2.0 Success Criteria 1.2.4 Captions (Live)
                 //
               {
                 requirementNumber : '1.2.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.4
                 //
                 // WCAG 2.0 Success Criteria 1.2.5 Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.5
                 //
                 // WCAG 2.0 Success Criteria 1.2.6 Sign Language (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.6
                 //
                 // WCAG 2.0 Success Criteria 1.2.7 Extended Audio Description (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.7',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.7
                 //
                 // WCAG 2.0 Success Criteria 1.2.8 Media Alternative (Prerecorded)
                 //
               {
                 requirementNumber : '1.2.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.2.8
                 //
                 // WCAG 2.0 Success Criteria 1.2.9 Audio-only (Live)
                 //
               {
                 requirementNumber : '1.2.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
                 enabled           : true,
                 rules : {}   // end list of rules
              }, // end success criteria 1.2.9
                 //
                 // WCAG 2.0 Success Criteria 1.3.1 Info and Relationships
                 //
               {
                 requirementNumber : '1.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
                 enabled           : true,
                 rules : {
                                //
                                // TABLE 1: Each data table must include column and/or row headers
                                // Group Table
                                //
                     'TABLE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 2: A data table should have a caption element with content or aria-labelledby reference
                                // Group Style: Table Rule
                                //
                     'TABLE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P2,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 3: A data table should have a summary attribute with content or a aria-describedby attribute reference
                                // Group Style: Table Rule
                                //
                     'TABLE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 4: If a table has both a caption element/aria-labelledby attribute and a summary/aria-describedby attribute, the summary content must be unique from the caption content
                                // Group Style: Table Rule
                                //
                     'TABLE_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 5: Each data table must include column and/or row headers: The first cell in each column must be a th element, and/or each row must contain at least one th element.
                                // Group Style: Table Rule
                                //
                     'TABLE_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 6: Each TH element in a complex table must have an id attribute, whose id value must be unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 7: If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table
                                // Group Style: Table Rule
                                //
                     'TABLE_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 8: If a table is a complex data table, it must have a summary attribute with content.
                                // Group Style: Table Rule
                                //
                     'TABLE_8' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 9: If there is more than one data table on a page, each data table must have a summary attribute with content that is unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_9' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 10: If there is more than one data table on a page, each data table should have a caption element with content that is unique on the page
                                // Group Style: Table Rule
                                //
                     'TABLE_10' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Landmark 1
                                // Group Landmark/Header
                                //
                     'LANDMARK_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // List 1
                                // Group List
                                //
                     'LIST_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.3.1
                 //
                 // WCAG 2.0 Success Criteria 1.3.2 Meaningful Sequence
                 //
               {
                 requirementNumber : '1.3.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
                 enabled           : true,
                 rules : {
                                //
                                // Table 11
                                // Group Style: Table Rule
                                //
                     'TABLE_11' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 12
                                // Group Style: Table Rule
                                //
                     'TABLE_12' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Table 13
                                // Group Style: Table Rule
                                //
                     'TABLE_13' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
               }   // end list of rules
               }, // end success criteria 1.3.2
                 //
                 // WCAG 2.0 Success Criteria 1.3.3 Sensory Characteristics
                 //
               {
                 requirementNumber : '1.3.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.3.3
                 //
                 // WCAG 2.0 Success Criteria 1.4.1 Use of Color
                 //
               {
                 requirementNumber : '1.4.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.1
                 //
                 // WCAG 2.0 Success Criteria 1.4.2 Audio Control
                 //
               {
                 requirementNumber : '1.4.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.2
                 //
                 // WCAG 2.0 Success Criteria 1.4.3 Contrast (Minimum)
                 //
               {
                 requirementNumber : '1.4.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
                 enabled           : true,
                 rules : {
                                //
                                // Color 1:
                                // Group Style: Link Rule
                                //
                     'COLOR_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.4.3
                 //
                 // WCAG 2.0 Success Criteria 1.4.4 Resize text
                 //
               {
                 requirementNumber : '1.4.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
                 enabled           : true,
                 rules : {}   // end list of rules
               }, // end success criteria 1.4.4
                 //
                 // WCAG 2.0 Success Criteria 1.4.5 Images of Text
                 //
               {
                 requirementNumber : '1.4.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 6
                                // Group Style: Link Rule
                                //
                     'HEADING_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 
                 }   // end list of rules
               }, // end success criteria 1.4.5
                 //
                 // WCAG 2.0 Success Criteria 1.4.6 Contrast (Enhanced)
                 //
               {
                 requirementNumber : '1.4.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
                 enabled           : true,
                 rules : {
                                //
                                // Color 1:
                                // Group Style: Link Rule
                                //
                     'COLOR_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 1.4.6
                 //
                 // WCAG 2.0 Success Criteria 1.4.7 Low or No Background Audio
                 //
               {
                 requirementNumber : '1.4.7',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.7
                 //
                 // WCAG 2.0 Success Criteria 1.4.8 Visual Presentation
                 //
               {
                 requirementNumber : '1.4.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.8
                 //
                 // WCAG 2.0 Success Criteria 1.4.9 Images of Text (No Exception)
                 //
               {
                 requirementNumber : '1.4.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 1.4.9
                 //
                 // WCAG 2.0 Success Criteria 2.1.1 Keyboard
                 //
               {
                 requirementNumber : '2.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.1
                 //
                 // WCAG 2.0 Success Criteria 2.1.2 No Keyboard Trap
                 //
               {
                 requirementNumber : '2.1.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.2
                 //
                 // WCAG 2.0 Success Criteria 2.1.3 Keyboard (No Exception)
                 //
               {
                 requirementNumber : '2.1.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.1.3
                 //
                 // WCAG 2.0 Success Criteria 2.2.1 Timing Adjustable
                 //
               {
                 requirementNumber : '2.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.1
                 //
                 // WCAG 2.0 Success Criteria 2.2.2 Pause, Stop, Hide
                 //
               {
                 requirementNumber : '2.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.2
                 //
                 // WCAG 2.0 Success Criteria 2.2.3 No Timing
                 //
               {
                 requirementNumber : '2.2.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.3
                 //
                 // WCAG 2.0 Success Criteria 2.2.4 Interruptions
                 //
               {
                 requirementNumber : '2.2.4',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.4
                 //
                 // WCAG 2.0 Success Criteria 2.2.5 Re-authenticating
                 //
               {
                 requirementNumber : '2.2.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.2.5
                 //
                 // WCAG 2.0 Success Criteria 2.3.1 Three Flashes or Below Threshold
                 //
               {
                 requirementNumber : '2.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.3.1
                 //
                 // WCAG 2.0 Success Criteria 2.3.2 Three Flashes
                 //
               {
                 requirementNumber : '2.3.2',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.3.2
                 //
                 // WCAG 2.0 Success Criteria 2.4.1 Bypass Blocks
                 //
               {
                 requirementNumber : '2.4.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
                 enabled           : true,
                 rules : {
                               //
                                // HEADING 1: Every page should have at least H1 element
                                // Group 11: 
                                //
                     'HEADING_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.1
                 //
                 // WCAG 2.0 Success Criteria 2.4.2 Page Titled
                 //
               {
                 requirementNumber : '2.4.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
                 enabled           : true,
                 rules : {
                               //
                                // Title 1:
                                // Group 11: 
                                //
                     'TITLE_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                               //
                                // Title 2:
                                // Group 11: 
                                //
                     'TITLE_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                               //
                                // Title 3:
                                // Group 
                                //
                     'TITLE_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.2
                 //
                 // WCAG 2.0 Success Criteria 2.4.3 Focus Order
                 //
               {
                 requirementNumber : '2.4.3',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.3
                 //
                 // WCAG 2.0 Success Criteria 2.4.4 Link Purpose (In Context)
                 //
               {
                 requirementNumber : '2.4.4',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
                 enabled           : true,
                 rules : {
                               //
                                // Link 1:
                                // Group 11: Link Rule
                                //
                     'LINK_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P2,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.4
                 //
                 // WCAG 2.0 Success Criteria 2.4.5 Multiple Ways
                 //
               {
                 requirementNumber : '2.4.5',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.5
                 //
                 // WCAG 2.0 Success Criteria 2.4.6 Headings and Labels
                 //
               {
                 requirementNumber : '2.4.6',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 2
                                // Group: Headings and Landmarks
                                //
                     'HEADING_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 3
                                // Group: Headings and Landmarks
                                //
                     'HEADING_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 8 
                                // Group: Headings and Landmarks
                                //
                     'HEADING_8_EN' : {
                                severityCode : OpenAjax.a11y.SEVERITY.MANUAL_EVALUATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 10
                                // Group: Controls
                                //
                     'CONTROL_10' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 11
                                // Group: Controls
                                //
                     'CONTROL_11' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.6
                 //
                 // WCAG 2.0 Success Criteria 2.4.7 Focus Visible
                 //
               {
                 requirementNumber : '2.4.7',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.7
                 //
                 // WCAG 2.0 Success Criteria 2.4.8 Location
                 //
               {
                 requirementNumber : '2.4.8',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 2.4.8
                 //
                 // WCAG 2.0 Success Criteria 2.4.9 Link Purpose (Link Only)
                 //
               {
                 requirementNumber : '2.4.9',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
                 enabled           : true,
                 rules : {
                                // LINK 2: Links with the same HREF should have the same link text.
                                // Group 11: Link Rule
                                //
                     'LINK_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // LINK 3: Links with the same HREF should have the same link text.
                                // Group 11: Link Rule
                                //
                     'LINK_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 2.4.9
                 //
                 // WCAG 2.0 Success Criteria 2.4.10 Section Headings
                 //
               {
                 requirementNumber : '2.4.10',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
                 enabled           : true,
                 rules : {
                                //
                                // Heading 3
                                // Group: Headings and Landmarks
                                //
                     'HEADING_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 4
                                // Group: Headings and Landmarks
                                //
                     'HEADING_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Heading 6
                                // Group: Headings and Landmarks
                                //
                     'HEADING_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                  }   // end list of rules
               }, // end success criteria 2.4.10
                 //
                 // WCAG 2.0 Success Criteria 3.1.1 Language of Page
                 //
               {
                 requirementNumber : '3.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.1
                 //
                 // WCAG 2.0 Success Criteria 3.1.2 Language of Parts
                 //
               {
                 requirementNumber : '3.1.2',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.2
                 //
                 // WCAG 2.0 Success Criteria 3.1.3 Unusual Words
                 //
               {
                 requirementNumber : '3.1.3',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.3
                 //
                 // WCAG 2.0 Success Criteria 3.1.4 Abbreviations
                 //
               {
                 requirementNumber : '3.1.4',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.4
                 //
                 // WCAG 2.0 Success Criteria 3.1.5 Reading Level
                 //
               {
                 requirementNumber : '3.1.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.5
                 //
                 // WCAG 2.0 Success Criteria 3.1.6 Pronunciation
                 //
               {
                 requirementNumber : '3.1.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.1.6
                 //
                 // WCAG 2.0 Success Criteria 3.2.1 On Focus
                 //
               {
                 requirementNumber : '3.2.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.1
                 //
                 // WCAG 2.0 Success Criteria 3.2.2 On Input
                 //
               {
                 requirementNumber : '3.2.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.2
                 //
                 // WCAG 2.0 Success Criteria 3.2.3 Consistent Navigation
                 //
               {
                 requirementNumber : '3.2.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.3
                 //
                 // WCAG 2.0 Success Criteria 3.2.4 Consistent Identification
                 //
               {
                 requirementNumber : '3.2.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.4
                 //
                 // WCAG 2.0 Success Criteria 3.2.5 Change on Request
                 //
               {
                 requirementNumber : '3.2.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.2.5
                 //
                 // WCAG 2.0 Success Criteria 3.3.1 Error Identification
                 //
               {
                 requirementNumber : '3.3.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.1
                 //
                 // WCAG 2.0 Success Criteria 3.3.2 Labels or Instructions
                 //
               {
                 requirementNumber : '3.3.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
                 enabled           : true,
                 rules : {      //
                                // Control 1
                                // Group: Controls
                                //
                     'CONTROL_1' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 2
                                // Group: Controls
                                //
                     'CONTROL_2' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 3
                                // Group: Controls
                                //
                     'CONTROL_3' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 4
                                // Group: Controls
                                //
                     'CONTROL_4' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 5
                                // Group: Controls
                                //
                     'CONTROL_5' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 6
                                // Group: Controls
                                //
                     'CONTROL_6' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 7
                                // Group: Controls
                                //
                     'CONTROL_7' : {
                                severityCode : OpenAjax.a11y.SEVERITY.WARNING,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 8
                                // Group: Controls
                                //
                     'CONTROL_8' : {
                                severityCode : OpenAjax.a11y.SEVERITY.VIOLATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              },
                                //
                                // Control 9
                                // Group: Controls
                                //
                     'CONTROL_9' : {
                                severityCode : OpenAjax.a11y.SEVERITY.RECOMMENDATION,
                                priorityCode : OpenAjax.a11y.PRIORITY.P1,
                                statusCode   : OpenAjax.a11y.STATUS.ACCEPTED,
                                enabled      : true
                              }
                 }   // end list of rules
               }, // end success criteria 3.3.2
                 //
                 // WCAG 2.0 Success Criteria 3.3.3 Error Suggestion
                 //
               {
                 requirementNumber : '3.3.3',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.3
                 //
                 // WCAG 2.0 Success Criteria 3.3.4 Error Prevention (Legal, Financial, Data)
                 //
               {
                 requirementNumber : '3.3.4',
                 requirementLevel  : 'LEVEL_AA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.4
                 //
                 // WCAG 2.0 Success Criteria 3.3.5 Help
                 //
               {
                 requirementNumber : '3.3.5',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.5
                 //
                 // WCAG 2.0 Success Criteria 3.3.6 Error Prevention (All)
                 //
               {
                 requirementNumber : '3.3.6',
                 requirementLevel  : 'LEVEL_AAA',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 3.3.6
                 //
                 // WCAG 2.0 Success Criteria 4.1.1 Parsing Content
                 //
               {
                 requirementNumber : '4.1.1',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               }, // end success criteria 4.1.1
                 //
                 // WCAG 2.0 Success Criteria 4.1.2 Name, Role, Value
                 //
               {
                 requirementNumber : '4.1.2',
                 requirementLevel  : 'LEVEL_A',
                 requirementURL    : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
                 enabled           : true,
                 rules : {
                                //
                                // No rules defined
                                //
                 }   // end list of rules
               } // end success criteria 4.1.2
      ]
    }
);


