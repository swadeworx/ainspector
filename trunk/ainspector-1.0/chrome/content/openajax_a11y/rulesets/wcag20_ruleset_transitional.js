/**
 * Copyright 2011 and 2012 OpenAjax Alliance
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
/* OpenAjax Alliance (OAA) Ruleset for WCAG 2.0 Transitional (Beta)           */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.all_rulesets.addRuleset('WCAG20', {

  title : {
    'default' : "WCAG 2.0 Transitional",
    'en-us'   : "WCAG 2.0 Transitional"
  },   

  description : {
    'default' : "Transitional ruleset based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications.",
    'en-us'   : "Transitional ruleset based on current WCAG 2.0 sufficient techniques, when relavent techniques are available.  Recommendations are based on web accessibility and usability best practices using the features of the HTML and ARIA specifications."  
  },
  
  author : {
    name : "OpenAjax Accessibility Working Group",
    url  : "http://www.openajax.org/member/wiki/Accessibility"
  } , 
  
 
  id            : "WCAG20_TRANS",
  version       : "1.0",
  last_updated  : "2012-01-19",

  // Assignement of rules to WCAG 2.0 requirements

  principles : {
  
    // Principe 1: Perceivable

    '1' : { 
      enabled: true,
      guidelines : {
      
        // 1.1 Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.
        
        '1.1' : { 
          enabled: true,
          success_criteria: {
            
            // 1.1.1 Non-text Content 
            
            '1.1.1' : {
              enabled: true,
              rules : {
                //
                // Image 1
                //
                'IMAGE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 2
                //
                'IMAGE_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 3
                //
                'IMAGE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 engish
                //
                'IMAGE_4_EN' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 4 french
                //
                'IMAGE_4_FR' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 5
                //
                'IMAGE_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'IMAGE_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }
        },  
        // 1.2 Provide alternatives for time-based media.
          
        '1.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 1.2.1 Audio-only and Video-only (Prerecorded)
            
            '1.2.1' : {
              enabled: true,
              rules : {
                //
                // Media 1
                //
                'MEDIA_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Image 6
                //
                'MEDIA_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.2.2 Captions (Prerecorded)
            
            '1.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.3 Audio Description or Media Alternative (Prerecorded)
            
            '1.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.4 Captions (Live)
            
            '1.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.5 Audio Description (Prerecorded)
            
            '1.2.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.6 Sign Language (Prerecorded)
            
            '1.2.6' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.7 Extended Audio Description (Prerecorded)
            
            '1.2.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.8 Media Alternative (Prerecorded)
            
            '1.2.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.2.9 Audio-only (Live)
            
            '1.2.9' : {
              enabled: true,
              rules : {
              }
            }
          }
        },  
        // 1.3 Create content that can be presented in different ways (for example simpler layout) without losing information or structure.
        
        '1.3' : { 
          enabled: true ,
          success_criteria: {

            // 1.3.1 Info and Relationships
            
            '1.3.1' : {
              enabled: true,
              rules : {
                //
                // TABLE 1: Each data table must include column and/or row headers
                // Group Table
                //
                'TABLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2T
                // Group Table
                //
                'TABLE_2T' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2S
                // Group Table 
                //
                'TABLE_2S' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 2M
                // Group Table 
                //
                'TABLE_2M' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 3
                // Group Table 
                //
                'TABLE_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 4
                // Group Table 
                //
                'TABLE_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 5: Each data table must include column and/or row headers: The first cell in each column must be a th element, and/or each row must contain at least one th element.
                // Group Table 
                //
                'TABLE_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 6 
                // Group Table 
                //
                'TABLE_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 7
                // Group Table 
                //
                'TABLE_7' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Table 8
                // Group Table 
                //
                'TABLE_8' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Landmark 1
                // Group Landmark/Header
                //
                'LANDMARK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // List 1
                // Group List
                //
                'LIST_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.2 Meaningful Sequence
            
            '1.3.2' : {
              enabled: true,
              rules : {
                //
                // LAYOUT_1
                // Group Style: Table Rule
                //
                'LAYOUT_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_2
                // Group Style: Table Rule
                //
                'LAYOUT_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LAYOUT_3
                // Group Style: Table Rule
                //
                'LAYOUT_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.3.3 Sensory Characteristics
            
            '1.3.3' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        // 1.4 Make it easier for users to see and hear content including separating foreground from background.
        
        '1.4' : {
          enabled: true ,
          success_criteria: {
          
            // 1.4.1 Use of Color

            '1.4.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.2 Audio Control

            '1.4.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.3 Contrast (Minimum)

            '1.4.3' : {
              enabled: true,
              rules : {
                //
                // Color 1:
                // Group Style: Link Rule
                //
                'COLOR_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.4 Resize text

            '1.4.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.5 Images of Text

            '1.4.5' : {
              enabled: true,
              rules : {

                //
                // Heading 6
                // Group Style: Link Rule
                //
                'HEADING_6' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.6 Contrast (Enhanced)

            '1.4.6' : {
              enabled: true,
              rules : {
                //
                // Color 2
                //
                'COLOR_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 1.4.7 Low or No Background Audio

            '1.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.8 Visual Presentation

            '1.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 1.4.9 Images of Text (No Exception)

            '1.4.9' : {
              enabled: true,
              rules : {
              }
            }            
          }
        }  
      }
    },
    
    // Principe 2: Operable
    
    '2' : { 
      enabled: true,
      guidelines: { 
    
        // 2.1 Make all functionality available from a keyboard.
        
        '2.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.1.1 Keyboard

            '2.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.1.2 No Keyboard Trap

            '2.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 2.1.3 Keyboard (No Exception)

            '2.1.3' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        // 2.2 Provide users enough time to read and use content.
        
        '2.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 2.2.1 Timing Adjustable

            '2.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.2 Pause, Stop, Hide

            '2.2.2' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.3 No Timing

            '2.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.2.4 Interruptions

            '2.2.4' : {
              enabled: true,
              rules : {
              }
            },

            // 2.2.5 Re-authenticating    

            '2.2.5' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 2.3 Do not design content in a way that is known to cause seizures.
        
        '2.3' : { 
          enabled: true,
          success_criteria: {
          
            // 2.3.1 Three Flashes or Below Threshold

            '2.3.1' : {
              enabled: true,
              rules : {
              }
            },

            // 2.3.2 Three Flashes

            '2.3.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 2.4 Provide ways to help users navigate, find content, and determine where they are.
        
        '2.4' : { 
          enabled: true ,
          success_criteria: {
            // 2.4.1 Bypass Blocks

            '2.4.1' : {
              enabled: true,
              rules : {
                               //
                // HEADING 1: Every page should have at least H1 element
                // Group 11: 
                //
                'HEADING_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },

            // 2.4.2 Page Titled

            '2.4.2' : {
              enabled: true,
              rules : {
                               //
                // Title 1:
                // Group 11: 
                //
                'TITLE_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 2:
                // Group 11: 
                //
                'TITLE_2' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                               //
                // Title 3:
                // Group 
                //
                'TITLE_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.3 Focus Order

            '2.4.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.4 Link Purpose (In Context)

            '2.4.4' : {
              enabled: true,
              rules : {
                               //
                // Link 1:
                // Group 11: Link Rule
                //
                'LINK_1' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P2,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.5 Multiple Ways

            '2.4.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.6 Headings and Labels

            '2.4.6' : {
              enabled: true,
              rules : {
                //
                // Heading 2
                // Group: Headings and Landmarks
                //
                'HEADING_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 3
                // Group: Headings and Landmarks
                //
                'HEADING_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 8 
                // Group: Headings and Landmarks
                //
                'HEADING_8_EN' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 10
                // Group: Controls
                //
                'CONTROL_10' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 11
                // Group: Controls
                //
                'CONTROL_11' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.7 Focus Visible

            '2.4.7' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.8 Location

            '2.4.8' : {
              enabled: true,
              rules : {
              }
            },
            
            // 2.4.9 Link Purpose (Link Only)

            '2.4.9' : {
              enabled: true,
              rules : {
                // LINK 2: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P3,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // LINK 3: Links with the same HREF should have the same link text.
                // Group 11: Link Rule
                //
                'LINK_3' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 2.4.10 Section Headings

            '2.4.10' : {
              enabled: true,
              rules : {
                //
                // Heading 4
                // Group: Headings and Landmarks
                //
                'HEADING_4' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 5
                // Group: Headings and Landmarks
                //
                'HEADING_5' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Heading 6
                // Group: Headings and Landmarks
                //
                'HEADING_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            }
          }            
        }
      }  
    },    
    
    // Principe 3: Understandable
    
    '3' : { 
      enabled: true,
      guidelines: { 
    
        // 3.1 Make text content readable and understandable.
        
        '3.1' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.1.1 Language of Page

            '3.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.1.2 Language of Parts

            '3.1.2' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.3 Unusual Words

            '3.1.3' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.4 Abbreviations

            '3.1.4' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.5 Reading Level

            '3.1.5' : {
              enabled: true,
              rules : {
              }
            },
                        
            // 3.1.6 Pronunciation        

            '3.1.6' : {
              enabled: true,
              rules : {
              }
            }                        
          }
        },
        
        // 3.2 Make Web pages appear and operate in predictable ways.
        
        '3.2' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.2.1 On Focus

            '3.2.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.2 On Input

            '3.2.2' : {
              enabled: true,
              rules : {
              }
            },
            // 3.2.3 Consistent Navigation

            '3.2.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.4 Consistent Identification

            '3.2.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.2.5 Change on Request       

            '3.2.5' : {
              enabled: true,
              rules : {
              }
            }
          }
        },
        
        // 3.3 Help users avoid and correct mistakes.
        
        '3.3' : { 
          enabled: true ,
          success_criteria: {
          
            // 3.3.1 Error Identification

            '3.3.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.2 Labels or Instructions

            '3.3.2' : {
              enabled: true,
              rules : {
                // Control 1
                // Group: Controls
                //
                'CONTROL_1' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 2
                // Group: Controls
                //
                'CONTROL_2' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 3
                // Group: Controls
                //
                'CONTROL_3' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 4
                // Group: Controls
                //
                'CONTROL_4' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 5
                // Group: Controls
                //
                'CONTROL_5' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 6
                // Group: Controls
                //
                'CONTROL_6' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 7
                // Group: Controls
                //
                'CONTROL_7' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 8
                // Group: Controls
                //
                'CONTROL_8' : {
                   type     : OpenAjax.a11y.RULE.REQUIRED,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                },
                //
                // Control 9
                // Group: Controls
                //
                'CONTROL_9' : {
                   type     : OpenAjax.a11y.RULE.RECOMMENDATION,
                   priority : OpenAjax.a11y.PRIORITY.P1,
                   status   : OpenAjax.a11y.STATUS.ACCEPTED,
                   enabled  : true
                }
              }
            },
            
            // 3.3.3 Error Suggestion

            '3.3.3' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.4 Error Prevention (Legal, Financial, Data)

            '3.3.4' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.5 Help: Context-sensitive help is available.

            '3.3.5' : {
              enabled: true,
              rules : {
              }
            },
            
            // 3.3.6 Error Prevention (All)     

            '3.3.6' : {
              enabled: true,
              rules : {
              }
            }           
          }  
        }
      }  
    }, 
    
    // Principe 4: Robust
    
    '4' : { 
      enabled: true,
      guidelines: { 
    
        // 4.1 Compatible: Maximize compatibility with current and future user agents, including assistive technologies.
        
        '4.1' : { 
          enabled: true ,
          success_criteria: {

            // 4.1.1 Parsing

            '4.1.1' : {
              enabled: true,
              rules : {
              }
            },
            
            // 4.1.2 Name, Role, Value:

            '4.1.2' : {
              enabled: true,
              rules : {
              }
            }
          }
        }
      }
    }  
  }   
});


