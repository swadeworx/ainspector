/*
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
/*       OpenAjax Alliance Rules National Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.all_rules.addRulesNLSFromJSON('en-us', {

    rule_scope: ['unkown', 'Element', 'Page', 'Website'],
    
    message_severities: {
      MUST : 'must', 
      SHOULD: 'should'
    },
    
    missing_message : "The following message id is not defined: ",

    rule_categories: {
           '1': 'Abbrevitations',
           '2': 'Audio',  
           '4': 'Color',
           '8': 'Controls',
          '16': 'Objects',
          '32': 'Headings',
          '64': 'Images',
         '128': 'Landmarks',
         '256': 'Language',
         '512': 'Layout',
        '1024': 'Links',
        '2048': 'Lists',
        '4096': 'Navigation',
        '8192': 'Scripting',
       '16384': 'Tables',
       '32768': 'Title',
       '65536': 'Timing',
      '131072': 'Video',
      '262144': 'Widgets'
    },
    
    DEFAULT_RULE_RESULT_MESSAGES: {
      MANUAL_CHECKS_SINGULAR:       '1 element requires manual checking',
      MANUAL_CHECKS_PLURAL:         '%N_MC elements require manual checking',
      ALL_PASS_SINGULAR:            '1 element passed',
      ALL_PASS_PLURAL:              '%N_P elements passed',
      SOME_FAIL:                    '%N_F out of %N_T elements failed',
      CORRECTIVE_ACTION_SINGULAR:   '1 element needs corrective action',
      CORRECTIVE_ACTION_PLURAL:     '%N_F elements need corrective action',
      ALL_FAIL_SINGULAR:            '1 element failed',
      ALL_FAIL_PLURAL:              'All %N_F elements failed',
      NOT_APPLICABLE:               'No applicable elements'
    },

    SO: ', so ',

    AND: ' and ',

    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules: {
        AUDIO_1: {
            ID:                    'Audio Rule 1',
            DEFINITION:            'Prerecorded audio %s have caption or text trascription of the audio content',
            SUMMARY:               'Audio %s have alternative',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element contains audio only content and if it is audio only make sure it has either captions or text transcript of the audio content',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are audio only, if any are audio only make sure they have either an captions or text transcripts of the audio',
              ALL_PASS_SINGULAR:            'Audio element has either a caption or a text transcript',
              ALL_PASS_PLURAL:              'All %N_P audio elements have either captions or a text transcript',
              SOME_FAIL:                    '%N_F out of %N_T audio elements do NOT have captions or text transcripts',
              CORRECTIVE_ACTION_SINGULAR:   'add captions or text transcript to audio element',
              CORRECTIVE_ACTION_PLURAL:     'add captions or text transcripts to each of the %N_F the audio elements',
              ALL_FAIL_SINGULAR:            'Audio element does not have captions or text transcripts ',
              ALL_FAIL_PLURAL:              'All %N_F audio elements do NOT have captions or text transcripts ',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements only elements found on this page that could be used for audio only'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has caption',
              PASS_2:                '@%1@ element has a text transcript',
              CORRECTIVE_ACTION_1:   'Add captions or text transcript to @%1@ element',
              MANUAL_CHECK_1:        'Verify the @%1@ audio element has captions or text transcript',
              MANUAL_CHECK_2:        'Verify the @%1@ element is audio only, if it is audio only verify that it has captions or text transcript',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Captions and text transcripts provide a means for people cannot hear the audio to understand the audio content'                   
            ],
            TECHNIQUES: [
              'Various techniques to add captions based on the audio format and media players you are supporting, please see your technology specific requirements for captions',
              'The HTML5 video element is attempting to make it easier to support audio descriptions through the use of the text track element',
              'Use aria-describedby attribute to point to a text description of the audio only content'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'ARIA: aria-describedby', 
                url:   ''
              }                            
            ]
        },
        AUDIO_2: {
            ID:                    'Audio Rule 2',
            DEFINITION:            'Prerecorded audio %s have caption or text trascription',
            SUMMARY:               'Audio %s have alternative',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element contains audio only content and if it is audio only make sure it has text transcript of the audio content',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are audio only, if any are audio only make sure they have text transcripts of the audio',
              ALL_PASS_SINGULAR:            'Audio element has text transcript',
              ALL_PASS_PLURAL:              'All %N_P audio elements have text transcript',
              SOME_FAIL:                    '%N_F out of %N_T audio elements do NOT have text transcripts',
              CORRECTIVE_ACTION_SINGULAR:   'add text transcript to audio element',
              CORRECTIVE_ACTION_PLURAL:     'add text transcripts to each of the %N_F the audio elements',
              ALL_FAIL_SINGULAR:            'Audio element does not have text transcripts ',
              ALL_FAIL_PLURAL:              'All %N_F audio elements do NOT have text transcripts ',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements only elements found on this page that could be used for audio only'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has a text transcript',
              CORRECTIVE_ACTION_1:   'Add text transcript to @%1@ element',
              MANUAL_CHECK_1:        'Verify the @%1@ audio element has text transcript',
              MANUAL_CHECK_2:        'Verify the @%1@ element is audio only, if it is audio only verify that it has text transcript',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Text transcripts provide a means for people cannot hear the audio to understand the audio content'                   
            ],
            TECHNIQUES: [
              'Use aria-describedby attribute to point to a text description of the audio only content'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'ARIA: aria-describedby', 
                url:   ''
              }                            
            ]
        },
        COLOR_1: {
            ID:                    'Color Rule 1',
            DEFINITION:            'Text content %s exceed Color Contrast Ratio (CCR) of 4.5 for any size text or 3.1 for large and/or bolded text',
            SUMMARY:               'Text %s exceed CCR of 4.5',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       '1 element requires manual checking for CCR > 4.5 due to the use of background image',
              MANUAL_CHECKS_PLURAL:         '%N_MC elements require manual checking for CCR > 4.5 due to the use of background images',
              ALL_PASS_SINGULAR:            'Text element has a CCR > 4.5',
              ALL_PASS_PLURAL:              '%N_P text elements have a CCR > 4.5',
              SOME_FAIL:                    '%N_F out of %N_T text elements do NOT have a CCR > 4.5',
              CORRECTIVE_ACTION_SINGULAR:   'change the foreground and background colors of the text element to meet the CCR > 4.5 requirement',
              CORRECTIVE_ACTION_PLURAL:     'change the foreground and background colors of the %N_F text elements to meet the CCR > 4.5 requirement',
              ALL_FAIL_SINGULAR:            '1 text element does NOT have a CCR > 4.5',
              ALL_FAIL_PLURAL:              '%N_F text elements do NOT have a CCR > 4.5',
              NOT_APPLICABLE:               'No text elements on page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:              'CCR exceeds 4.5',
              CORRECTIVE_ACTION_1: 'Adjust foreground and background colors to improve color contrast',
              MANUAL_CHECK_1:      'Background image may reduce color contrast',
              MANUAL_CHECK_2:      'Background image may improve color contrast',
              HIDDEN:              'Text is hidden from asssistive technologies.'
            },  
            PURPOSE:        ['The higher the color contrast of text the more easy it is to read, especially for people with visual impairments'                   
                            ],
            TECHNIQUES:     [ 'Change the foreground color to a more complemtary color to the background color',
                              'Change the background color to a more complemtary color to the foreground color'
                            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [{ type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                               title: 'WCAG 2.0 Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1', 
                               url:   'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast'
                             },
                             { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                               title: 'How to meet Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1', 
                               url:   'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast'
                             }
                            ]
        },
        COLOR_2: {
            ID:                    'Color Rule 2',
            DEFINITION:            'Text content %s exceed Color Contrast Ratio (CCR) of 7.0 for any size text or 4.5 for large and/or bolded text',
            SUMMARY:               'Text %s exceed CCR of 7.0',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       '1 element requires manual checking for CCR > 7.0 due to the use of background image',
              MANUAL_CHECKS_PLURAL:         '%N_MC elements require manual checking for CCR > 7.0 due to the use of background images',
              ALL_PASS_SINGULAR:            'Text element has a CCR > 7.0',
              ALL_PASS_PLURAL:              '%N_P text elements have a CCR > 7.0',
              SOME_FAIL:                    '%N_F out of %N_T text elements do NOT have a CCR > 7.0',
              CORRECTIVE_ACTION_SINGULAR:   'change the foreground and background colors of the text element to meet the CCR > 7.0 requirement',
              CORRECTIVE_ACTION_PLURAL:     'change the foreground and background colors of the %N_F text elements to meet the CCR > 7.0 requirement',
              ALL_FAIL_SINGULAR:            '1 text element does NOT have a CCR > 7.0',
              ALL_FAIL_PLURAL:              '%N_F text elements do NOT have a CCR > 7.0',
              NOT_APPLICABLE:               'No text elements on page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:              'CCR exceeds 7.0',
              CORRECTIVE_ACTION_1: 'Adjust foreground and background colors to improve color contrast',
              MANUAL_CHECK_1:      'Background image may reduce color contrast',
              MANUAL_CHECK_2:      'Background image may improve color contrast',
              HIDDEN:              'Text is hidden from asssistive technologies.'
            },  
            PURPOSE:        ['The higher the color contrast of text the more easy it is to read, especially for people with visual impairments'                   
                            ],
            TECHNIQUES:     ['Change the foreground color to a more complemtary color to the background color',
                             'Change the background color to a more complemtary color to the foreground color'
                            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS:      [{ type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                               title: 'WCAG 2.0 Success Criterion 1.4.6 Contrast (Enhanced): The visual presentation of text and images of text has a contrast ratio of at least 7:1', 
                               url:   'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7'
                             },
                             { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                               title: 'How to meet Success Criterion 1.4.6 Contrast (Enhanced): The visual presentation of text and images of text has a contrast ratio of at least 7:1', 
                               url:   'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7'
                             }                            
                            ]
        },
        CONTROL_1: {
            ID:                    'Form Control 1',
            DEFINITION:            '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@ %s have an accessible label',
            SUMMARY:               'Controls %s have labels',
            TARGET_RESOURCES_DESC: 'User interface form controls',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Form control has label',
              ALL_PASS_PLURAL:              '%N_P form controls have a label',
              SOME_FAIL:                    '%N_F out of %N_T form controls do NOT have a label',
              CORRECTIVE_ACTION_SINGULAR:   'add label to form control missing a label',
              CORRECTIVE_ACTION_PLURAL:     'add labels to %N_F form controls missing a label',
              ALL_FAIL_SINGULAR:            'form control does NOT have label',
              ALL_FAIL_PLURAL:              'All %N_F form controls do NOT have a label',
              NOT_APPLICABLE:               'No form controls on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 control has label',
              CORRECTIVE_ACTION_1:   'Add label to %1 control',
              HIDDEN:                '%1 control is hidden from assistive technologies.',
              TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@'
            },  
            PURPOSE: [
              'A label associated with a form control insures that information about the form control is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_2: {
            ID:                    'Form Control 2',
            DEFINITION:            'Every @input@ type @image@ %s have an @alt@ or @title@ attribute with content',
            SUMMARY:               'Image button %s have alt content',
            TARGET_RESOURCES_DESC: 'input elements of type image',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@input[type="image"]@ form control has @alt@ attribute with content',
              ALL_PASS_PLURAL:              '%N_P @input[type="image"]@ form controls have @alt@ attribute with content',
              SOME_FAIL:                    '%N_F out of %N_T @input[type="image"]@ form controls do NOT have an @alt@ attribute with content',
              CORRECTIVE_ACTION_SINGULAR:   'add @alt@ attribute and/or content to @input[type="image"]@ form control missing a @alt@ attribute with content',
              CORRECTIVE_ACTION_PLURAL:     'add @alt@ attribute and/or content to %N_F @input[type="image"]@ form controls missing a @alt@ attribute with content',
              ALL_FAIL_SINGULAR:            '@input[type="image"]@ form control does NOT have an @alt@ attribute with content',
              ALL_FAIL_PLURAL:              'All %N_F @input[type="image"]@ form controls do NOT have an @alt@ attribute with content',
              NOT_APPLICABLE:               'No @input[type="image"]@ form controls on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Image button has label',
              CORRECTIVE_ACTION_1:   'Add @alt@ attribute with text content',
              CORRECTIVE_ACTION_2:   'Add text content to the @alt@ attribute',
              HIDDEN:                'Image button is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'A label associated with a form control insures that information about the form control is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'The preferered technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attributes to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attributes to provide a explicit text description of the purpose of the form control element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H36: Using alt attributes on images used as submit buttons', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H36'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_3: {
            ID:                    'Form Control 3',
            DEFINITION:            'Every input type radio %s be contained in a @fieldset@ and @legend@ elements to provide grouping information for radio button groups',
            SUMMARY:               'Radio button %s use FIELDSET/LEGEND',
            TARGET_RESOURCES_DESC: 'input elements of type radio',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@input[type="radio"]@ form control is contained in a @filedset/legend@ labeling container',
              ALL_PASS_PLURAL:              '%N_P @input[type="radio"]@ form controls are contained in @filedset/legend@ labeling container',
              SOME_FAIL:                    '%N_F out of %N_T @input[type="radio"]@form controls are NOT contained in @filedset/legend@ labeling container',
              CORRECTIVE_ACTION_SINGULAR:   'move the @input[type="radio"]@ form control to an existing @filedset/legend@ labeling container or create a new @filedset/legend@ labeling container for the control',
              CORRECTIVE_ACTION_PLURAL:     'move the %N_F @input[type="radio"]@ form controls to an existing @filedset/legend@ labeling container or add new @filedset/legend@ labeling containers for the %N_F controls',
              ALL_FAIL_SINGULAR:            '@input[type="radio"]@ form control is NOT a contained in a @filedset/legend@ labeling container',
              ALL_FAIL_PLURAL:              'All %N_F @input[type="radio"]@ form controls are NOT a contained in @filedset/legend@ labeling containers',
              NOT_APPLICABLE:               'No @input[type="radio"]@ form controls on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Radio button uses @fieldset@ and @legend@ elements, and the @legend@ element has text content',
              MANUAL_CHECK_1:        'Radio button uses aria-labelledby, verify the label text content includes group information',
              MANUAL_CHECK_2:        'Radio button uses aria-label, verify the label text content includes group information',
              CORRECTIVE_ACTION_1:   'Add a @legend@ element to with text content to the @fieldset@ element to provide grouping label information for the radio buttons.',
              CORRECTIVE_ACTION_2:   'Add a @fieldset@ and @legend@ elements to provide grouping label information for the radio buttons.',
              HIDDEN:                'Radio button is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Radio buttons need a common grouping label to provide a context for each radio button option'                   
            ],
            TECHNIQUES: [
              '@fieldset@/@legend@ element combination is the preferred technique to provide a grouping label for radio buttons',
              '@aria-labelledby@ attributes can provide a grouping label with references to the grouping text content and the radio button option text content',
              '@aria-label@ attributes can provide a grouping label that includes both the grouping and radio button option text content'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H90: Indicating required form controls using label or legend', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H90'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'iCITA: Example 7: Fieldset/Legend for grouping radio buttons', 
                url:   'http://html.cita.illinois.edu/nav/form/radio/index.php?example=6'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'IBM Web checklist: HTML example 6', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webstructure.html'
              }                            
            ]
        },
        CONTROL_4: {
            ID:                    'Form Control 4',
            DEFINITION:            '@button@ elements %s have text content',
            SUMMARY:               '@button@s %s have content',
            TARGET_RESOURCES_DESC: '@button@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@button@ element has text content',
              ALL_PASS_PLURAL:              '%N_P @button@ elements have text content',
              SOME_FAIL:                    '%N_F out of %N_T @button@ elements do NOT have text content',
              CORRECTIVE_ACTION_SINGULAR:   'add text content to @button@ element that describe the purpose of the button',
              CORRECTIVE_ACTION_PLURAL:     'add text content to %N_F @button@ elements that describe the purpose of the buttons',
              ALL_FAIL_SINGULAR:            '@button@ element does NOT have text content',
              ALL_FAIL_PLURAL:              'All %N_F @button@ elements do NOT have text content',
              NOT_APPLICABLE:               'No @button@ elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@button@ element has text content',
              CORRECTIVE_ACTION_1:   'Add text content to @button@ element',
              HIDDEN:                '@button@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'The text content of a @button@ element is used as a label to insure that the purpose of the button is spoken by screen readers when the button receives focus'                   
            ],
            TECHNIQUES: [
              'The text content of the @button@ element and the @alt@ attribute content of images inside the button is used as the text content'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @button@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-BUTTON'
              }
            ]
        },
        CONTROL_5: {
            ID:                    'Form Control 5',
            DEFINITION:            '@id@ attributes %s have unique values on the web page',
            SUMMARY:               '@id@ %s be unique',
            TARGET_RESOURCES_DESC: 'Form control elements with @id@ attributes',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_PLURAL:              'The %N_P elements with an @id@ attribute have unique id values on page',
              SOME_FAIL:                    '%N_F out of %N_T elements with an @id@ attribute do NOT have unique id values on page',
              CORRECTIVE_ACTION_PLURAL:     'update elements with @id@ attributes so the id values are all unique',
              ALL_FAIL_PLURAL:              'All %N_F element with an @id@ attribute do NOT have a unique id values on page',
              NOT_APPLICABLE:               'No elements or only one element with an @id@ attribute on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                  '\'%1\' @id@ attribute value is unique',
              CORRECTIVE_ACTION_1:   'Update elements that share the \'%1\' @id@ value to have unique @id@ values',
              HIDDEN:                '%1 control is hidden from assistive technologies.'
            },  
            PURPOSE: [
              '@id@ attribute values can be used as references for @label@ elements, if @id@ attribute values are not unique it can result incorrect labeling of form controls'                   
            ],
            TECHNIQUES: [
              'If a form control defines an @id@ attribute, make sure the valeu is unique'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: @id@ attribute', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#adef-id'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F77: Failure of Success Criterion 4.1.1 due to duplicate values of type ID', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F77'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              }                             
            ]
        },
        CONTROL_6: {
            ID:                    'Form Control 6',
            DEFINITION:            '@label@ element using the @for@ attribute %s reference a form control on the page',
            SUMMARY:               '@label@ %s reference control',
            TARGET_RESOURCES_DESC: '@label@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@label@ element uses @for@ attribute to label a form control',
              ALL_PASS_PLURAL:              '%N_P @label@ elements use the @for@ attribute to label form controls',
              SOME_FAIL:                    '%N_F out of %N_T @label@ elements do NOT use the @for@ attribute to label form controls',
              CORRECTIVE_ACTION_SINGULAR:   'change the @label@ element to use the @for@ attribute to label its form control',
              CORRECTIVE_ACTION_PLURAL:     'change the %N_F @label@ elements to use the @for@ attribute to label their form control',
              ALL_FAIL_SINGULAR:            '@label@ element does NOT use @for@ attribute to label a form control',
              ALL_FAIL_PLURAL:              'All %N_F @label@ elements do NOT use @for@ attribute to label a form control',
              NOT_APPLICABLE:               'No @label@ elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              CORRECTIVE_ACTION_1:   'Change the @label@ element @for@ attribute to reference \'%1\' to reference a form control'
            },  
            PURPOSE: [
              '@label@ elements only are useful for accessibility when they reference or encapsulate form controls'                   
            ],
            TECHNIQUES: [
              '@label@ elements using the FOR attribute need to reference a form control with the corresponding @id@ attribute value'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element FOR attribute', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ Element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_7: {
            ID:                    'Form Control 7',
            DEFINITION:            '@label@ element or legend element %s contain text content',
            SUMMARY:               '@label@ %s have content',
            TARGET_RESOURCES_DESC: '@label@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@label@ or @legend@ element has text content',
              ALL_PASS_PLURAL:              '%N_P @label@ or @legend@ elements have text content',
              SOME_FAIL:                    '%N_F out of %N_T @label@ or @legend@ elements do NOT have text content',
              CORRECTIVE_ACTION_SINGULAR:   'add content to the @label@ or @legend@ element the describes the purpose of a form control or groupings of form controls',
              CORRECTIVE_ACTION_PLURAL:     'add content to the %N_F @label@ or @legend@ elements to describes the purpose of each form control or groupings of form controls',
              ALL_FAIL_SINGULAR:            '@label@ or @legend@ element does NOT have text content',
              ALL_FAIL_PLURAL:              'All %N_F @label@ or @legend@ elements do NOT have text content',
              NOT_APPLICABLE:               'No @label@ or @legend@ elements on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ has text content',
              CORRECTIVE_ACTION_1:   'Add text content to the @%1@ element',
              HIDDEN:                '@%1@ control is hidden from asssistive technologies, so @%2@ content is ignored'
            },
            PURPOSE: [
              'For @label@ and @legend@ elements only are useful for accessibility when they contain content'                   
            ],
            TECHNIQUES: [
              'Add text content to @label@ and @legend@ elements that help describe the purpose of the form control'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element @for@ attribute', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using @label@ elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_8: {
            ID:                    'Form Control 8',
            DEFINITION:            '@fieldset@ element %s contain exactly one legend element',
            SUMMARY:               '@fieldset@ %s have one legend',
            TARGET_RESOURCES_DESC: '@fieldset@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@fieldset@ element has only one @legend@ element',
              ALL_PASS_PLURAL:              '%N_P @fieldset@ elements have only one @legend@ element',
              SOME_FAIL:                    '%N_F out of %N_T @fieldset@ elements have more than one @legend@ element or no @legend@ element',
              CORRECTIVE_ACTION_SINGULAR:   'update @fieldset@ element to contain only one @legend@ element',
              CORRECTIVE_ACTION_PLURAL:     'update %N_F @fieldset@ elements to contain only one @legend@ element',
              ALL_FAIL_SINGULAR:            '@fieldset@ element has more than one @legend@ element or no @legend@ element',
              ALL_FAIL_PLURAL:              'All %N_F @fieldset@ elements have more than one @legend@ element or no @legend@ element',
              NOT_APPLICABLE:               'No @fieldset@ elements on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@fieldset@ has one @legend@ element',
              CORRECTIVE_ACTION_1:   'Add @legend@ element',
              CORRECTIVE_ACTION_2:   'Remove %1 @legend@ elements',
              HIDDEN:                '@fieldset@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Multiple legend elements contained in the same fieldset may result in the improper calucation of labels for assistive technologies.'                   
            ],
            TECHNIQUES: [
              '@fieldset@ element should have one and only one @legend@ elements to help describe the purpose of the form controls contained in the @fieldset@ element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_9: {
            ID:                    'Form Control 9',
            DEFINITION:            '@title@ attribute may not be good a label for form control',
            SUMMARY:               '@title@ may not be good label',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:       'Form control does not use @title@ attribute as label',
              ALL_PASS_PLURAL:         'All %N_P form controls do not use @title@ attribute as label',
              MANUAL_CHECK_SINGULAR:   'verify the @title@ attribute being used as a tooltip is also good label for the form control',
              MANUAL_CHECK_PLURAL:     'verify each of the %N_MC form controls that use @title@ attribute as a tooltip is also good label for the form control',
              NOT_APPLICABLE:          'No form controls on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:         '@title@ is not used as label',
              MANUAL_CHECK_1: 'Verify @label@ element or ARIA technique to label %1 form control',
              HIDDEN:         '%1 control is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'When the @title@ attribute is used for tooltips it is often uses more words than needed to label a form control for users of assistive technologies',                   
              'use @aria-label@ to provide a shorter label to users of assistive technologies if the @title@ attribute content is determined to not be an optimal label' 
            ],
            TECHNIQUES: [
              'The preferered technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attributes to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attributes to provide a explicit text description of the purpose of the form control element',
              'In special cases, use @title@ attribute to provide a optimal label and a tooltip for a form control'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H88: Using HTML according to spec', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H88'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA: Using @label@ element for Labeling Form Controls', 
                url:   'http://html.cita.illinois.edu/nav/form/form-label-markup.php'
              }                             
            ]
        },
        CONTROL_10: {
            ID:                    'Form Control 10',
            DEFINITION:            'Labels %s be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be unique',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_PLURAL:              '%N_P form controls have unique labels',
              SOME_FAIL:                    '%N_F out of %N_T form controls do NOT have unique labels',
              CORRECTIVE_ACTION_PLURAL:     'change the labeling of %N_F form controls to uniquely identify the purpose of each form control on the page',
              ALL_FAIL_PLURAL:              'All %N_F form controls do NOT have a unique labels',
              NOT_APPLICABLE:               'No form controls or only one form control on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Label is unique',
              CORRECTIVE_ACTION_1:   'Add label to %1 control',
              CORRECTIVE_ACTION_2:   'Change the @label@ element content, use @fieldset@/@legend@ elements or ARIA technique to make label text content unique on the page',
              HIDDEN:                '%1 control is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_11: {
            ID:                    'Form Control 11',
            DEFINITION:            'If there is more than one form on a page, @input@ element of type @submit@ and @reset@ %s have unique labels using the value attribute',
            SUMMARY:               '@submit@ and @reset@ buttons %s be unique',
            TARGET_RESOURCES_DESC: '@submit@ and @reset@ buttons',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_PLURAL:              '%N_P @submit@ or @reset@ buttons have unique labels',
              SOME_FAIL:                    '%N_F out of %N_T @submit@ or @reset@ buttons do NOT have unique labels',
              CORRECTIVE_ACTION_PLURAL:     'change the labeling of %N_F @submit@ or @reset@ buttons to uniquely identify the purpose of each @submit@ or @reset@ buttons on the page',
              ALL_FAIL_PLURAL:              'All %N_F @submit@ or @reset@ buttons do NOT have a unique labels',
              NOT_APPLICABLE:               'No forms or only one form on this page'                            
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Label is unique',
              CORRECTIVE_ACTION_1:   'Add label to %1 control',
              CORRECTIVE_ACTION_2:   'Change the @value@ attribute content, use @fieldset@/@legend@ elements or ARIA technique to make @submit@ and @reset@ labels unique on the page',
              HIDDEN:                '%1 control is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page',                   
              '@submit@ and @reset@ form controls have default labels and if there is more than one form on a page the user may not understand which form they are submitting'                   
            ],
            TECHNIQUES: [
              'The preferred technique for changing the default label for @submit@ and @reset@ controls is the @value@ attribute',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },
        CONTROL_12: {
            ID:                    'Form Control 12',
            DEFINITION:            'Labels %s be must describe the purpose of every button, textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be descriptive',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'form control requires a manual check to verify it describes the purpose of the form control',
              MANUAL_CHECKS_PLURAL:         '%N_MC form controls require a manual check to verify they uniquely describe the purpose of each form control',
              SOME_FAIL:                    '%N_F out of %N_T form controls do NOT have labels',
              CORRECTIVE_ACTION_SINGULAR:   'add label to the form control that describes the from controls purpose',
              CORRECTIVE_ACTION_PLURAL:     'add labels to the %N_F form controls that uniquely describe purpose of each from control',
              ALL_FAIL_SINGULAR:            'form control does NOT have a label',
              ALL_FAIL_PLURAL:              '%N_F form controls do NOT have labels',
              NOT_APPLICABLE:               'No form controls on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        'Verify the label describes the purpose and input required for @%1@ form control',
              CORRECTIVE_ACTION_1:   'Add a @label@ element, use @fieldset@/@legend@ elements or ARIA lechnique to provide a label for @%1@ form control',
              HIDDEN:                '%1 control is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page'                   
            ],
            TECHNIQUES: [
              'The preferred technique for labeling for controls is using the @label@ element and referencing the @id@ attribute value of the form control element',
              'Use the @label@ element to encapsulate the form control element',
              'In special cases, use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the form control element',
              'In special cases, use @aria-label@ attribute to provide a explicit text description of the purpose of the form control element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @label@ element', 
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H44: Using label elements to associate text labels with form controls', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H44'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used', 
                url:   'http://www.w3.org/TR/2010/NOTE-WCAG20-TECHS-20101014/H65'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H71'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Labels for Form Controls Overview', 
                url:   'http://html.cita.illinois.edu/nav/form/'
              }                            
            ]
        },    
        HEADING_1: {
            ID:                    'Heading Rule 1',
            DEFINITION:            'Each page %s contain at least one @h1@ element and each @h1@ element must have content',
            SUMMARY:               'Page %s have @h1@ element',
            TARGET_RESOURCES_DESC: '@h1@ and @body@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:     'Page contains a least one @h1@ element',
              CORRECTIVE_ACTION_SINGULAR: 'Add a @h1@ element at the begining of the main content of the page',
              ALL_FAIL_SINGULAR:     'Page does not contain an @h1@ element'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Page has @h1@ element',
              CORRECTIVE_ACTION_1:   'Add a @h1@ element at the begining of the main content of the page',
              CORRECTIVE_ACTION_2:   'Add content to the @h1@ element, the content should describe the content or the purpose of the page or main section',
              HIDDEN:                '@h1@ element is not available to assistive technologies.'
            },  
            PURPOSE: [
              'Headings provide a navigation point for users of asssitive technologies to the main content and help users understand the main content of the page'                   
            ],
            TECHNIQUES: [
              'Include an @h1@ element at the begining of the main content',
              'The text content of the @h1@ element should describe the main content of the page',
              'The @h1@ element should be visible graphically and to assistive technologies, do not hide using CSS techniques'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @h1@ element', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              }                            
            ]
        },    
        HEADING_2: {
            ID:                    'Heading Rule 2',
            DEFINITION:            'If the page contains both a @main@ landmark and an @h1@ element, the @h1@ element %s be a child of the main landmark.',
            SUMMARY:               '@h1@ %s be in @main@ landmark',
            TARGET_RESOURCES_DESC: '@h1@ elements and elements with ARIA attribute @role="main"@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          '@h1@ element is a child of a @main@ landmark',
              ALL_PASS_PLURAL:            '%N_P @h1@ elements ara a child of a @main@ landmark',
              SOME_FAIL:                  '%N_F of %N_T %ELEM_T are NOT child of a @main@ landmark',
              CORRECTIVE_ACTION_SINGULAR: 'either move the @h1@ element to the begining of a @main@ landmark or change the @h1@ element to another heading level',
              CORRECTIVE_ACTION_PLURAL:   'either move the %N_F @h1@ elements to the begining of a @main@ landmark or change the @h1@ element to another heading level',              
              ALL_FAIL_SINGULAR:          '@h1@ element is NOT a child of a @main@ landmark',
              ALL_FAIL_PLURAL:            'All %N_F @h1@ elements are NOT a child of a @main@ landmark',
              NOT_APPLICABLE:             'No @main@ landmark and/or @h1@ elements in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@h1@ is a child element of a @main@ landmark',
              CORRECTIVE_ACTION_1:   'Position the @h1@ element as one of the first descendant elements of a @main@ landmark',
              HIDDEN:                '@h1@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Headings provide a navigation point for users of assistive technologies to the primary content and help users understand understand that content',
              'Including both @main@ landmarks and @h1@ elements provides a redundent way for users of assistive technology to find the main topics of a web page'
            ],
            TECHNIQUES: [
              'Include an @h1@ element at the beginning of each @main@ landmark',
              'If there is more than one @main@ landmark, use @aria-labelledby@ on the @main@ landmark to reference the @h1@ element as a name for @main@ landmark'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: The @h1@ element', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },                            
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: @main@ role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#main'
              }                            
            ]
        },    
        HEADING_3: {
            ID:                    'Heading Rule 3',
            DEFINITION:            'Sibling heading elements %s should be unique',
            SUMMARY:               'Sibling headings %s be unique',
            TARGET_RESOURCES_DESC: 'Heading elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_PLURAL:            'All %N_P sibling headings elements of the same level have unique text content',
              SOME_FAIL:                  '%N_F of %N_T sibling heading elements of the same level do NOT have unique text content',
              CORRECTIVE_ACTION_PLURAL:   'update the text content of the %N_F sibling heading elements of the same level to be unique',              
              ALL_FAIL_PLURAL:            'All %N_F sibling heading elements do NOT have unique text content',
              NOT_APPLICABLE:             'No sibling heading elements of the same level in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 heading content is unique among sibling headings',
              CORRECTIVE_ACTION_1:   'Change %1 heading content to describe the differences sibling sections',
              HIDDEN:                '%1 element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'If section headings that share the same parent heading are NOT unique users of assistive technology will not be able to descern the differences between sibling secitons of the web resource'
            ],
            TECHNIQUES: [
              'Make sure the content of sibling headings that share the same parent heading help users understand the unique content of each section they describe'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Sub Headings', 
                url:   'http://html.cita.illinois.edu/nav/heading/'
              }                            
            ]
        },    
        HEADING_4: {
            ID:                    'Heading Rule 4',
            DEFINITION:            'Heading elements %s describe the sections they label',
            SUMMARY:               'Headings %s be descriptive',
            TARGET_RESOURCES_DESC: 'Heading elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR: 'Verify the heading element describes the content following the heading element',
              MANUAL_CHECKS_PLURAL:   'Verify the %N_MC heading elements describes the content following each heading element',
              ALL_FAIL_SINGULAR:      'Add text content to heading',
              ALL_FAIL_PLURAL:        'Add text content to %N_F heading elements with no text content',
              NOT_APPLICABLE:         'No heading elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        'Check %1 element to make sure it describes the section it labels',
              CORRECTIVE_ACTION_1:   'Add text content to %1 element that describes the section it labels or remove it from the page if it is not needed',
              HIDDEN:                '%1 element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'If headings are NOT descriptive or unique they will confuse users of assistive technology'
            ],
            TECHNIQUES: [
              'Include headings elements at the proper level for each section of a web page',
              'Use headings as labels for ARIA landmarks to provide redundent page navigation capabilities for users of assistive technologies',
              'Check headings against other headings in the document to make sure the headings uniquely describe content of each section of the web page',
              'If headings are too similar to each other users of assistive technology will not be able to use them to understand the differences between different sections of the web page'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Sub Headings', 
                url:   'http://html.cita.illinois.edu/nav/heading/'
              }                            
            ]
        },    
        HEADING_5: {
            ID:                    'Heading Rule 5',
            DEFINITION:            'Heading elements %s be properly nested',
            SUMMARY:               'Headings %s be properly nested',
            TARGET_RESOURCES_DESC: 'Heading elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_PLURAL:      'All %N_P heading elements are properly nested',
              SOME_FAIL:            '%N_F out of %N_T heading elements are NOT properly nested',
              ALL_FAIL_PLURAL:      'None of the %N_F heading elements are properly nested',
              NOT_APPLICABLE:       'No or only one heading elements on this page, so nesting rule does not apply'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:              '%1 element is properly nested',
              PASS_2:              'All heading elements are properly nested',
              CORRECTIVE_ACTION_1: 'Change %1 element or other heading elements ',
              CORRECTIVE_ACTION_2: 'Add text content to %1 element that describes the section it labels or remove it from the page if it is not needed',
              CORRECTIVE_ACTION_3: 'One heading element is not prperly nested, check all heading elements to make sure they are properly nested, and describe the structure and the sections of the web pag',
              CORRECTIVE_ACTION_4: '%1 heading elements are not properly nested, check all heading elements to make sure they are properly nested, and describe the structure and the sections of the web page',
              HIDDEN:              '%1 element is hidden from asssistive technologies and is not included in nesting.'
            },  
            PURPOSE: [
              'Head elements that are properly nested help users of assistive technology understand the structure of the information on the web page'
            ],
            TECHNIQUES: [
              'Include headings elements at the proper level for each section of a web page',
              'Use headings as labels for ARIA landmarks to provide redundent page navigation capabilities for users of assistive technologies',
              'Check headings against other headings in the document to make sure the headings uniquely describe content of each section of the web page',
              'If headings are too similar to each other users of assistive technology will not be able to use them to understand the differences between different sections of the web page'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G130: Providing descriptive headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G130'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G141: Organizing a page using headings', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G141'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Unique Title', 
                url:   'http://html.cita.illinois.edu/nav/title/'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Sub Headings', 
                url:   'http://html.cita.illinois.edu/nav/heading/'
              }                            
            ]
        },    
        IMAGE_1: {
            ID:                    'Image Rule 1',
            DEFINITION:            'Each image %s have an text alternative',
            SUMMARY:               'Image %s has alternative',
            TARGET_RESOURCES_DESC: '@img@, @area@ and [role="img"]',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Image element has text alternative',
              ALL_PASS_PLURAL:            'All %N_P image elements have text alternatives',
              SOME_FAIL:                  '%N_F out of %N_T image elements do NOT have an text alternatives',
              CORRECTIVE_ACTION_SINGULAR: 'add @alt@, @aria-labelledby@ or @ria-label@ attribute to image element that describes the purpose of the image',
              CORRECTIVE_ACTION_PLURAL:   'add @alt@, @aria-labelledby@ or @ria-label@ attribute to each of the %N_F image elements that describes the purpose of each image',
              ALL_FAIL_SINGULAR:          'image element does NOT have text alternative',
              ALL_FAIL_PLURAL:            'All %N_F image elements do NOT have text alternatives',
              NOT_APPLICABLE:             'No image elements found on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has @alt@ attribute',
              PASS_2:                '@%1@ element has @aria-labelledby@ attribute',
              PASS_3:                '@%1@ element has @aria-label@ attribute',
              PASS_4:                '@%1@ element has @title@ attribute',
              CORRECTIVE_ACTION_1:   'Add a @alt@, @aria-labelledby@ or @aria-label@ attribute to the @%1@ element',
              HIDDEN:                '@%1@ element is hidden from assistive technologies'
            },  
            PURPOSE: [
              'Accessible name provides a description of an image for people who cannot see the image, usually the accessible name comes from an alt attribute',                   
              'Accessible name that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              'Text alternatives should describe the purpose of images as succinctly as possible (e.g. usually less than ~100 characters)',
              'The @alt@ attribute is the preferred and most commonly used way to provide a text alternative for @img@ and @area@ elements',
              'The @aria-labelledby@ attribute can be used to provide a text alterniatve when images can be described using visible captions associated with the image', 
              'The @aria-label@ attribute should only be used to provide a text alternative in special cases when an element has @role="img"@ attribute', 
              'The @title@ attribute will be used to provide a text alternative if none of the other techniques is found', 
              'If an image is purely stylistic or decorative set the text alternative must result in an empty string (i.e. @alt=""@) or use @role="presentation"@'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },
        IMAGE_2: {
            ID:                    'Image Rule 2',
            DEFINITION:            'The @longdesc@ attribute %s have a valid URI',
            SUMMARY:               '@longdesc@ %s be valid',
            TARGET_RESOURCES_DESC: '@img@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:     'Manually verify @img@ element with @longdesc@ attribute is a valid URL',
              MANUAL_CHECKS_PLURAL:       'Manually verify %N_MC @img@ elements with @longdesc@ attribute have a valid URL',
              ALL_PASS_SINGULAR:          '@img@ element with @longdesc@ attribute has a valid URL',
              ALL_PASS_PLURAL:            'All %N_P @img@ elements with @longdesc@ attribute have a valid URL',
              SOME_FAIL:                  '%N_F out of %N_T @img@ elements with @longdesc@ attribute do NOT have a valid URL',
              CORRECTIVE_ACTION_SINGULAR: 'update the @img@ element with @longdesc@ attribute to point to a valid URL that describes the image',
              CORRECTIVE_ACTION_PLURAL:   'update the %N_F @img@ elements with a @longdesc@ attribute to point to a valid URL that describes the image',
              ALL_FAIL_SINGULAR:          '@img@ element with @longdesc@ attribute does NOT have a valid URL',
              ALL_FAIL_PLURAL:            'All %N_F @img@ elements with @longdesc@ attribute do NOT have a valid URL',
              NOT_APPLICABLE:             'No @img@ elements with a @longdesc@ attribute on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@longdesc@ attribute is a valid URI',
              CORRECTIVE_ACTION_1:   'Change @longdesc@ attribute to a valid URI',
              MANUAL_CHECK_1:        'Use a browser to test if the @longdesc@ attribute is a valid URL',
              HIDDEN:                '@img@ element is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Some images (i.e charts, bar graphs, organizational charts, complex pictures and images) need a longer text equivalent than can be provided with the alt text content'
            ],
            TECHNIQUES: [
              '@longdesc@ can be used to provide an internal link or extenal link to information that provides a extended and more detailed text equivalent of the image'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: longdesc attribute', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-longdesc-IMG'
              },
              { type: OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H45: Using longdesc',
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H45'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G92: Providing long description for non-text content that serves the same purpose and presents ', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G92'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G74: Providing a long description in text near the non-text content, with a reference to the location of the long description in the short description', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G74'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G73: Providing a long description in another location with a link to it that is immediately adjacent to the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G73'
              },
              { type: OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H45: Using longdesc',
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H45'
              },  
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },
        IMAGE_3: {
            ID:                    'Image Rule 3',
            DEFINITION:            'The file name of the image %s not be part of the accessible name',
            SUMMARY:               'Don\'t use filename',
            TARGET_RESOURCES_DESC: '@img@, @area@ and @[role="img"]@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Image element does not include the image file name as part of text alternative',
              ALL_PASS_PLURAL:            'All %N_P image elements do not include the image file name as part of text alternative',
              SOME_FAIL:                  '%N_F out of %N_T image elements DO include the image file name as part of text alternative',
              CORRECTIVE_ACTION_SINGULAR: 'update the text alternaitve (e.g. typically the alt attribute) of the image element to not use the image file name; the text alternative must succinctly describe the content and/or purpose of the image',
              CORRECTIVE_ACTION_PLURAL:   'update the @alt@ attribute of the %N_F images to not use the image file name; the text alternative must succinctly describe the content and/or purpose of the image',
              ALL_FAIL_SINGULAR:          'Image element DOES include the image file name as part of text alternative',
              ALL_FAIL_PLURAL:            'All %N_F image elements DO include the image file name as part of text alternatives',
              NOT_APPLICABLE:             'No @img@ elements with a @longdesc@ attribute on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'text alternative does not contain the filename',
              CORRECTIVE_ACTION_1:   'Change text alternative to succinctly describe the purpose and/or content of the image',
              HIDDEN:                '@%1@ control is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Text alternatives provide a description of images for people who cannot see the image and the file name is not useful information',                   
              'Empty text alternatives are ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              'Text alternatives should describe the purpose of images as succinctly as possible (e.g. usually less than ~100 characters) and do not include the file name as part of the text alternative',
              'The @alt@ attribute is the preferred and most commonly used way to provide a text alternative for @img@ and @area@ elements',
              'The @aria-labelledby@ attribute can be used to provide a text alterniatve when images can be described using visible captions associated with the image', 
              'The @aria-label@ attribute should only be used to provide a text alternative in special cases when an element has @role="img"@ attribute', 
              'The @title@ attribute will be used to provide a text alternative if none of the other techniques is found', 
              'If an image is purely stylistic or decorative set the text alternative must result in an empty string (i.e. @alt=""@) or use @role="presentation"@'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_4_EN: {
            ID:                    'Image Rule 4 (English)',
            DEFINITION:            'Text alternatives %s less than 100 characters',
            SUMMARY:               'Text alternative length',
            TARGET_RESOURCES_DESC: '@img@, @area@ and @[role="img"]@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Image element has text alternative less than 100 characters',
              ALL_PASS_PLURAL:            'All %N_P image elements have text alternatives less than 100 characters',
              SOME_FAIL:                  '%N_F out of %N_T image elements do have text equivalents GREATER than 100 characters',
              CORRECTIVE_ACTION_SINGULAR: 'update the text alternatives of the image element to be less than 100 characters; succinctly describe the purpose and/or content of the image',
              CORRECTIVE_ACTION_PLURAL:   'update the text alternatives of the %N_F images to be less than 100 characters; succinctly describe the purpose and/or content of the image',
              ALL_FAIL_SINGULAR:          'image element text alternative is GREATER than 100 characters',
              ALL_FAIL_PLURAL:            'All %N_F image elements have text alternatives GREATER than 100 characters',
              NOT_APPLICABLE:             'No image elements on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Text alternative is less than 100 characters',
              CORRECTIVE_ACTION_1:   'Change text alternative to be less than 100 characters',
              HIDDEN:                'Image element is hidden from asssistive technologies'
            },  
            PURPOSE: [
              'Text alternatives provides a description of the image for people who cannot see the image',                   
              'Long text alternatives can reduce usability by increasing the time it takes to read a web page and understand the purpose of an image in the web site',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              'Text alternatives should describe the purpose of images as succinctly as possible (e.g. usually less than ~100 characters) and do not include the file name as part of the text alternative',
              'The @alt@ attribute is the preferred and most commonly used way to provide a text alternative for @img@ and @area@ elements',
              'The @aria-labelledby@ attribute can be used to provide a text alterniatve when images can be described using visible captions associated with the image', 
              'The @aria-label@ attribute should only be used to provide a text alternative in special cases when an element has @role="img"@ attribute', 
              'The @title@ attribute will be used to provide a text alternative if none of the other techniques is found', 
              'If an image is purely stylistic or decorative set the text alternative must result in an empty string (i.e. @alt=""@) or use @role="presentation"@'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_5: {
            ID:                    'Image Rule 5',
            DEFINITION:            'If an image element has a height or width less than 6 pixels or its alt text set to empty, the image %s set its role attribute to "presentation" or the image %s be removed and CSS %s should be used for positioning.',
            SUMMARY:               'Small/decorative images set to presentation',
            TARGET_RESOURCES_DESC: '@img@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Small and decorative image elements (i.e. less than 6 pixels high or wide) have @role="presentation"@ or text alternative to an empty string (e.g. @alt=""@)',
              ALL_PASS_PLURAL:            'All %N_P small and decorative image elements (i.e. less than 6 pixels high or wide) have @role="presentation"@ or text alternative to an empty string (e.g. @alt=""@)',
              SOME_FAIL:                  '%N_F out of %N_T small and decorative image elements (i.e. less than 6 pixels high or wide) do NOT have a @role=presentation@ or text alternative to an empty string (e.g. @alt=""@)',
              CORRECTIVE_ACTION_SINGULAR: 'add a @role=presentation@ or change text alterative to an empty string (e.g. @alt=""@)',
              CORRECTIVE_ACTION_PLURAL:   'add a @role=presentation@ or change text alterative to an empty string (e.g. @alt=""@)',
              ALL_FAIL_SINGULAR:          'Small or decorative image element (i.e. less than 6 pixels high or wide) does NOT have @role=presentation@ or text alterative to an empty string (e.g. @alt=""@)',
              ALL_FAIL_PLURAL:            'All %N_F small or decorative image elements (i.e. less than 6 pixels high or wide)  do NOT have a @role=presentation@ or text alterative to an empty string (e.g. @alt=""@)',
              NOT_APPLICABLE:             'No small or decorative images (i.e. less than 6 pixels high or wide) on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Image element has @role="presentation"@',
              PASS_2:                'Image element has @alt=""@',
              CORRECTIVE_ACTION_1:   'Add @role="presentation"@ or change text alternative to empty string (i.e. @alt=""@)',
              HIDDEN:                'Image element is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Small and decorative images (i.e. less than 6 pixels high or wide) can be ignored by assistive technologies',
              'Images with the @alt=""@ attribute should be set to the empty string'                   
            ],
            TECHNIQUES: [
              'Small images are purely stylistic or decorative and the @alt@ text conent should be the empty string (i.e. @alt=""@)'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F30'
              }                            
            ]
        },
        IMAGE_6: {
            ID:                    'Image Rule 6',
            DEFINITION:            'Verify image element is be used for styling or decoration',
            SUMMARY:               'Verify decorative image',
            TARGET_RESOURCES_DESC: '@img@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:     'Verify @img@ element with @alt=""@ or @role="presentation"@ is purely decorative',
              MANUAL_CHECKS_PLURAL:       'Verify %N_MC @img@ elements with @alt=""@ or @role="presentation"@ are purely decorative',
              NOT_APPLICABLE:             'No image elements identified as deecorative (i.e. @alt=""@ or @role="presentation"@) on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        'Verify the image is only used for styling or decoration',
              HIDDEN:                'Image element is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'If an image is purely decoration or used for styling users of screen readers do not need to know the image exists',                   
              'If an image does not have alt text content and contains information, users of assistive technology will not have access to the information'                   
            ],
            TECHNIQUES: [
              'Use the attributes @alt=""@ or @role="presentation"@ to indicate an image is used purely for stylistic or decorative purposes'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 13.8 How to specify alternate text', 
                url:   'http://www.w3.org/TR/html4/struct/objects.html#adef-alt'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G94: Providing short text alternative for non-text content that serves the same purpose and presents the same information as the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G94'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G95: Providing short text alternatives that provide a brief description of the non-text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G95'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'iCITA Best Practices: Text Equivalents for Images and other Non-Text Objects Best Practices', 
                url:   'http://html.cita.illinois.edu/text/'
              }                            
            ]
        },
     KEYBOARD_1: {
            ID:                    'Keyboard Rule 1',
            DEFINITION:            'Widget elements %s have keyboard event handlers',
            SUMMARY:               'Widgets %s support keyboard',
            TARGET_RESOURCES_DESC: 'Widget elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the widget element has keyboard event handlers through is parent elements, owner widget (i.e. aria-activedescendant) or required child widgets',
              MANUAL_CHECKS_PLURAL:         'Verify the %N_MC widgets have keyboard event handlers through is parent elements, owner widget (i.e. aria-activedescendant) or required child widgets',
              ALL_PASS_SINGULAR:            'The widget element has keyboard event handlers',
              ALL_PASS_PLURAL:              'All %N_P widget elements have keyboard event handlers',
              SOME_FAIL:                    '%N_F out of %N_T widget elements do NOT have keyboard event handlers',
              CORRECTIVE_ACTION_SINGULAR:   'add event handler to the widget to support keyboard operation of the widget',
              CORRECTIVE_ACTION_PLURAL:     'add event handler to the %N_F widgets to support keyboard operation of each widget',
              ALL_FAIL_SINGULAR:            'The widget element does NOT have keyboard event handlers',
              ALL_FAIL_PLURAL:              'All %N_F widget elements do NOT have keyboard event handlers',
              NOT_APPLICABLE:               'No widgets on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget has keyboard support through event handlers on the widget element',
              MANUAL_CHECK_1:       'Verify the @%1@ widget has keyboard support through keyboard event handlers on a parent widget element',
              MANUAL_CHECK_2:       'Verify the @%1@ widget has keyboard support through keyboard event handlers through @aria-activedescendant@ support on its @%2@ owner widget',
              MANUAL_CHECK_3:       'Verify the @%1@ widget has keyboard support through keyboard event handlers on a required child widgets',
              CORRECTIVE_ACTION_1:  'Add keyboard event handlers to the @%1@ widget to support keyboard interaction with the widget',
              HIDDEN:               '@%1@ widget is hidden from assistive technologies'
            },
            PURPOSE: [
              'Keyboard support is required by people who cannot use the mouse to interact with a widget'                   
            ],
            TECHNIQUES: [
              'Use the @keyup@, @keydown@ and @keypress@ events to support keyboard interaction with widgets'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        },
     KEYBOARD_2: {
            ID:                    'Keyboard Rule 2',
            DEFINITION:            'Widget elements %s use tabindex to add keyboard focus support on non-interactive elements',
            SUMMARY:               'Tabindex for focus',
            TARGET_RESOURCES_DESC: 'Widget elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The widget element has tabindex value or is a child of a widget using aria-activedescendant',
              ALL_PASS_PLURAL:              'All %N_P widget elements have tabindex value or is a child of a widget using aria-activedescendant',
              SOME_FAIL:                    '%N_F out of %N_T widget elements do NOT have a @tabindex@ value or do NOT a child of a widget using aria-activedescendant',
              CORRECTIVE_ACTION_SINGULAR:   'add @tabindex2 value to the widget or add @aria-activedescendant@ support to an ancestor widget to provide keyboard focus support to the widget',
              CORRECTIVE_ACTION_PLURAL:     'add @tabindex@ value to the widget or add @aria-activedescendant@ support to an ancestor widget to provide keyboard focus support to the %N_F widgets',
              ALL_FAIL_SINGULAR:            'The widget element does NOT have a @tabindex@ value or is a child of a widget using aria-activedescendant',
              ALL_FAIL_PLURAL:              'All %N_F widget elements do NOT have a @tabindex@ value or are NOT a child of a widget using aria-activedescendant',
              NOT_APPLICABLE:               'No widgets on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget is on a @%2@ element that can receive keyboard focus',
              PASS_2:               '@%1@ widget has a @tabindex@ value that supports receiving keyboard focus',
              MANUAL_CHECK_1:       '@%1@ widget is the child of a widget that has an @aria-activedescendant@ attribute, verify the @aria-activedescendant@ supports references to the @id=%2@ of this widget',
              MANUAL_CHECK_2:       'Verify the child widgets of the @%1@ element with an onClick event of accurately represent the interactive features of this section of the web page',
              CORRECTIVE_ACTION_1:  'Add @tabindex@ value to the widget or add @aria-activedescendant@ support to an ancestor widget to provide keyboard focus support',
              HIDDEN:               '@%1@ widget is hidden from assistive technologies'
            },
            PURPOSE: [
              'Keyboard support is required by people who cannot use the mouse to interact with a widget'                   
            ],
            TECHNIQUES: [
              'The @tabindex@ enables non-interactive elements (i.e. @div@, @li@, @span@ ...) to receive and process focus ',
              'The @tabindex@ enables non-interactive elements (i.e. @div@, @li@, @span@ ...) to receive and process focus '
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        },    
        LANDMARK_1: {
            ID:                    'Landmark Rule 1',
            DEFINITION:            'Each page %s contain at least one @main@ landmark',
            SUMMARY:               'Page %s have @main@ landmark',
            TARGET_RESOURCES_DESC: '@main@ landmark',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Page has @main@ landmark',
              CORRECTIVE_ACTION_SINGULAR: 'add a @main@ landmark that identifies the main (i.e. primary) content of the page',
              ALL_FAIL_SINGULAR:          'Page does NOT contain a @main@ landmark'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Page contains an %1 element with @role=main@',
              CORRECTIVE_ACTION_1:   'Add a @main@ landmark to the page, the main landmark must contain the main content of the page',
              HIDDEN:                '@main@ landmark is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Main landmarks provide a navigation point for users of asssitive technologies to the main content of the page'                   
            ],
            TECHNIQUES: [
              'Include an @role="main"@ attribute on the element that contains the main content',
              'Use the aria-labelledby or aria-label to describe the content of the main landmark'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: main role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#main'
              }                            
            ]
        },
        LANDMARK_2: {
            ID:                    'Landmark Rule 2',
            DEFINITION:            'All rendered content %s be contained within a landmark',
            SUMMARY:               'Content %s be within landmark',
            TARGET_RESOURCES_DESC: 'all renderable content',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'One element may contain renderable content; elements that include renderable content %RULE_TYPE be contained in a landmark',
              MANUAL_CHECKS_PLURAL:         '%N_MC elements may contain renderable content; elements that include renderable content %RULE_TYPE be contained in a landmark',
              ALL_PASS_SINGULAR:            'Renderable element is contained within a landamrk',
              ALL_PASS_PLURAL:              'All %N_P renderable elements are contained wihin a landamrk',
              SOME_FAIL:                    '%N_F out of %N_T renderable elements are NOT contained wihin a landamrk',
              CORRECTIVE_ACTION_SINGULAR:   'update the landmark structure of the page and place the element currently outside of a landmark into its proper landmark container',
              CORRECTIVE_ACTION_PLURAL:     'update the landmark structure of the page and place the %N_F elements currently outside of landmarks into their proper landmark container',
              ALL_FAIL_SINGULAR:            'Renderable element is NOT contianed within a landmark',
              ALL_FAIL_PLURAL:              '%N_F renderable elements are NOT contianed within a landmark',
              NOT_APPLICABLE:               'No renderable elements on page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element is in @%2@ landmark',
              MANUAL_CHECK_1:        '@%1@ element may contain renderable content, if so move it into an appropriate landmark',
              CORRECTIVE_ACTION_1:   'Move @%1@ element into an appropriate landmark',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Landmarks provide a way to organize content of a page to users of assistive technology, similar to visual and interaction designers organize information for people using a graphical rendering of the content.'                   
            ],
            TECHNIQUES: [
              'Use the appropriate landmarks to identify the different sections of a web page',
              'The most important landmarks are the @main@ and @navigation@ landmarks since they will be the most used'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Landmark Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#landmark_roles'
              }                            
            ]
        },    
        LANDMARK_2N: {
            ID:                    'Landmark Rule 2: navigation',
            DEFINITION:            'Each page %s contain at least one @navigation@ landmark',
            SUMMARY:               'Page %s have @navigation@ landmark',
            TARGET_RESOURCES_DESC: '@navigation@ landmark',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Page has @navigation@ landmark',
              CORRECTIVE_ACTION_SINGULAR: 'add a @navigation@ landmark that identifies the main (i.e. primary) content of the page',
              ALL_FAIL_SINGULAR:          'Page does NOT contain a @navigation@ landmark'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Page contains an %1 element with @role=navigation@',
              CORRECTIVE_ACTION_1:   'Add a @navigation@ landmark to the page, the navigation landmark must identify the sets navigation lists on the page',
              HIDDEN:                '@navigation@ landmark is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Navigation landmarks provide a way to identify groups of links with in a web page'                   
            ],
            TECHNIQUES: [
              'Include an @role="navigation"@ attribute on a element that contains @ol@ and @ul@ elements that contain li elements with links',
              'Use the aria-labelledby or aria-label to describe the purpose of the links (i.e. table on contents of a page, site map...)'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: navigation role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#navigation'
              }                            
            ]
        },    
        LANDMARK_2B: {
            ID:                    'Landmark Rule 2: banner',
            DEFINITION:            'Each page %s contain at least one @banner@ landmark',
            SUMMARY:               'Page %s have @banner@ landmark',
            TARGET_RESOURCES_DESC: '@banner@ landmark',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Page has @banner@ landmark',
              CORRECTIVE_ACTION_SINGULAR: 'add a @banner@ landmark that identifies the repetitive banner content at the top of the page',
              ALL_FAIL_SINGULAR:          'Page does NOT contain a @banner@ landmark'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Page contains an %1 element with @role=banner@',
              CORRECTIVE_ACTION_1:   'Add a @banner@ landmark to the page, the banner landmark is used to identify the repetitive banner content at the top of the page',
              HIDDEN:                '%1 element with @banner@ landmark is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'banner landmarks provide a way to identify branding content usually ar the top of a web page'                   
            ],
            TECHNIQUES: [
              'Include an @role="banner"@ attribute on a element that contains the branding content at the top of a page',
              'Pages typically one have one @banner@ landmark'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: banner role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#banner'
              }                            
            ]
        },    
        LANDMARK_2CI: {
            ID:                    'Landmark Rule 2: contentinfo or complementary',
            DEFINITION:            'Each page %s contain at least one @contentinfo@ or @complementary@ landmark',
            SUMMARY:               'Page %s have @contentinfo@ or @complementary@ landmark',
            TARGET_RESOURCES_DESC: '@contentinfo@ landmark',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Page has @contentinfo@ or @complementary@ landmark',
              CORRECTIVE_ACTION_SINGULAR: 'add a @contentinfo@ or @complementary@ landmark that identifies the typically repetitive content (i.e. on each page in the website) on the bottom of a page',
              ALL_FAIL_SINGULAR:          'Page does NOT contain a @contentinfo@ or @complementary@ landmark'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Page contains an %1 element with @role=%2@',
              CORRECTIVE_ACTION_1:   'Add a @contentinfo@ or or @complementary@ landmark to the page, the contentinfo landmark must identify the sets contentinfo lists on the page',
              HIDDEN:                '%1 element with @role=%2@ is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'contentinfo landmarks provide a way to identify content found typically on the bottom of each page in a website',
              'The contentinfo usually includes links like copyright information, privacy, and other general links support all pages in the website.'
            ],
            TECHNIQUES: [
              'Include an @role="contentinfo"@ attribute on a element that contains @ol@ and @ul@ elements that contain li elements with links',
              'Use the aria-labelledby or aria-label to describe the purpose of the links (i.e. table on contents of a page, site map...)'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: contentinfo role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#contentinfo'
              }                            
            ]
        },
        LANDMARK_3: {
            ID:             'LANDMARK 3',
            DEFINITION:     'If there are two or more landmarks of the same type, they %s have unique labels',
            SUMMARY:        '',
            PURPOSE:        'When there are two or more landmarks of the same type labels make it possible for people using assistive technology to identify the differences between the landmarks.',            
            MESSAGE_PASS_ONLY_ONE:  'There is only one %1 landmark in the page',
            MESSAGE_PASS_UNIQUE:    'The \'%1\' label is unique for the %2 landmarks',
            MESSAGE_FAIL_NO_LABEL:  'The %2 landmark does not have a label, when there are more than one of the same type of landmark on the page the landmark needs a label',
            MESSAGE_FAIL_DUPLICATE: 'The \'%1\' label is NOT unique for the %2 landmarks',
            MESSAGE_HIDDEN: 'The %1 landmark is hidden, if the landmark content became visible the label would NOT be unique.'
        },
        LANDMARK_4: {
            ID:                'LANDMARK 4',
            TITLE:             'Each landmark labels %s describe the content in the landark',
            PURPOSE:           'Landmark labels make it easier for people using assistive technologies to understand the content of a landmark',
            MESSAGE_HAS_LABEL: 'Make sure the \'%1\' label described the content of the %2 landmark',
            MESSAGE_NO_LABEL:  'The %1 landmark does not have a label, make sure the landmark role is appropriate to the content in the landmark and consider adding a descriptive label to provide more detail on the contents of the landark.'
        },
        LAYOUT_1: {
            ID:                    'Layout Rule 1',
            DEFINITION:            'Web pages %s provide content in a meaningful sequence',
            SUMMARY:               'Page %s have meaningful sequence',
            TARGET_RESOURCES_DESC: '@table@ elements used for layout',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR: 'Verify document has a meaningful sequence of content when style sheets are disabled',
              MANUAL_CHECKS_PLURAL:   'Verify document has a meaningful sequence of content when style sheets are disabled and layout table markup is disabled',
              ALL_PASS_SINGULAR:      'Layout table is one column wide',
              ALL_PASS_PLURAL:        'All %N_P layout tables are one column wide'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:          'Table is one column wide, and will have the same document sequence when table markup is disabled',
              MANUAL_CHECK_1:  'Verify document has a meaningful sequence of content when style sheets are disabled and layout table markup is disabled',
              MANUAL_CHECK_2:  'Verify the content in the %1x%2 layout table has a meaningful sequence of content when table markup is disabled , if the table is actually a data table add data table markup to give the table an effective caption and the data tables headings',
              MANUAL_CHECK_3:  'Verify the nesting of tables for layout of content maintains a meaningful sequence of content when table markup is disabled',
              HIDDEN:          'The @table@ is hidden from assistive technologies'
            },  
            PURPOSE: [
              'The sequence of content (i.e. order) in the document code affects its meaning, especilly for users of assistive technology who cannot see the visual cues provided in a graphical that provide information about the relationships between content'                   
            ],
            TECHNIQUES: [
              'Use CSS and web standards techniques for the coding of content, and the graphical styling and positioning of content',
              'Avoid using table markup for graphical layout, if you do use tables for layout make sure the content still is meaningful when the table markup is disabled',
              'Avoid using nested tables for layout, the deeper the level of nesting the more chance there of having a confusing sequence of content',
              'Tables that are used for layout should use only @tr@ and @td@ elements, and the @table@, @tr@ and @td@ elements should have a @role="presentation"@ attribute to clearly indicate the table markup is being used for layout'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification: Visual formatting model', 
                url:   'http://www.w3.org/TR/CSS21/visuren.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G57: Ordering the content in a meaningful sequence', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G57'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'C6: Positioning content based on structural markup', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/C6'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'C8: Using CSS letter-spacing to control spacing within a word', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/C8'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'C27: Making the DOM order match the visual order', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/C27'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F1: Failure of Success Criterion 1.3.2 due to changing the meaning of content by positioning information with CSS', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F1'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F33: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to create multiple columns in plain text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F33'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F34: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to format tables in plain text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F34'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F49: Failure of Success Criterion 1.3.2 due to using an HTML layout table that does not make sense when linearized', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F49'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'Web Standards Group', 
                url:   'http://webstandardsgroup.org/standards/'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'W3C Standards', 
                url:   'http://www.w3.org/standards/'
              }
            ]   
        },
        LAYOUT_2: {
            ID:                    'Layout Rule 2',
            DEFINITION:            'Tables %s not be nested for layout of content',
            SUMMARY:               'Do not nest layout tables',
            TARGET_RESOURCES_DESC: '@table@ elements used for layout',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:      'Table is not nested with another layout table',
              ALL_PASS_PLURAL:        '%N_P tables are not nested with other layout tables',
              SOME_FAIL:                '%N_F out of %N_T tables are nested with other layout tables',
              CORRECTIVE_ACTION_PLURAL: 'Update the markup and CSS on this page to remove the nesting of layout tables',
              ALL_FAIL_SINGULAR:        'Layout table is nested with other layout tables',
              ALL_FAIL_PLURAL:          'All %N_F tables are nested with other layout tables',
              NOT_APPLICABLE:           'No table elements used for layout'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               'Table is not nested with another layout table',
              PASS_2:               'Table is one column wide, and will have the same document sequence when table markup is disabled',
              CORRECTIVE_ACTION_1:  'Update the markup and CSS on this page to remove the nesting of this layout table',
              HIDDEN:               'The @table@ is hidden from assistive technologies'
            },  
            PURPOSE: [
              'The sequence of content (i.e. order) in the document code affects its meaning, nesting layout tables often makes the sequence of content less understandable'                   
            ],
            TECHNIQUES: [
              'Use CSS and web standards techniques for the coding of content, and the graphical styling and positioning of content',
              'Avoid using table markup for graphical layout, if you do use tables for layout make sure the content still is meaningful when the table markup is disabled',
              'Avoid using nested tables for layout, the deeper the level of nesting the more chance there of having a confusing sequence of content',
              'Tables that are used for layout should use only @tr@ and @td@ elements, and the @table@, @tr@ and @td@ elements should have a @role="presentation"@ attribute to clearly indicate the table markup is being used for layout'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification: Visual formatting model', 
                url:   'http://www.w3.org/TR/CSS21/visuren.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F33: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to create multiple columns in plain text content', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F33'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F49: Failure of Success Criterion 1.3.2 due to using an HTML layout table that does not make sense when linearized', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F49'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'Web Standards Group', 
                url:   'http://webstandardsgroup.org/standards/'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'W3C Standards', 
                url:   'http://www.w3.org/standards/'
              }
            ]   
        },
        LAYOUT_3: {
            ID:                    'Layout Rule 3',
            DEFINITION:            'Layout tables %s use @role="presentation"@ on all table elements',
            SUMMARY:               'Layout tables use @role="presentation"@',
            TARGET_RESOURCES_DESC: '@table@ elements used for layout',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:      'Layout table element has @role="presentation"@',
              ALL_PASS_PLURAL:        '%N_P layout table elements (i.e. @table@, @tr@, @td@ elements) have @role="presentation"@',
              SOME_FAIL:                '%N_F out of %N_T layout table elements (i.e. @table@, @tr@, @td@ elements) do NOT have @role="presentation"@',
              CORRECTIVE_ACTION_PLURAL: 'add @role="presentation"@ to all table elements (i.e. @table@, @tr@, @td@ elements) in a layout',
              ALL_FAIL_PLURAL:          'All %N_F layout table elements (i.e. @table@, @tr@, @td@ elements) do NOT have @role="presentation"@',
              NOT_APPLICABLE:           'No table elements used for layout'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '%1 element has @role="presentation"@',
              CORRECTIVE_ACTION_1:  'Add @role="presentation"@ to the %1 element, if the table is actually a data table use apporpriate data table markup',
              HIDDEN:               'The %1 element is hidden from assistive technologies'
            },  
            PURPOSE: [
              'Using @role="presentation"@ communicates assistive technollogies that the table is being used for markup'                   
            ],
            TECHNIQUES: [
              'Use @role="presentation"@ on all table elements in a layout table to help assitive technology understand the table is being used for layout, rather than tabular data'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: Presentation Role', 
                url:   'http://www.w3.org/TR/wai-aria/roles#presentation'
              },
              { type:  OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'WAI-ARIA 1.0 Authoring Practices: Presentation Role', 
                url:   'http://www.w3.org/WAI/PF/aria-practices/#presentation_role'
              }
            ]   
        },
        LINK_1: {
            ID:                    'Link Rule 1',
            DEFINITION:            'Links with the same HREF %s have the same link text',
            SUMMARY:               'Link text %s be consistent',
            TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Only one @a@, @area@ or @[role=link]@ element on the page so no test to perform on consistent naming of links that share the same @href@ value',
              ALL_PASS_PLURAL:              'All %N_P @a@, @area@ or @[role=link]@ elements have consistent accessible names for links that share the same @href@ value',
              SOME_FAIL:                    '%N_F out of %N_T @a@, @area@ or @[role=link]@ elements do NOT have consistent accessible names for links that share the same @href@ value',
              CORRECTIVE_ACTION_PLURAL:     'add @aria-describedby@ attribute to the %N_F @a@, @area@ or @[role=link]@ elements to provide additional text context to make the accessible names unique',
              ALL_FAIL_PLURAL:              'All %N_F @a@, @area@ or @[role=link]@ elements do NOT have consistent accessible names for links that share the same @href@ value',
              NOT_APPLICABLE:               'No @a@, @area@ or @[role=link]@ elements on page share the same accessible name'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has unique @href@ value on the page',
              PASS_2:                '@%1@ element has the same accessible name as the %2 links it shares the same @href@ with',
              MANUAL_CHECK_1:        'Verify the @%1@ element has the an accessible name that makes sense to users, since the link shares the same @href@ has a different accessible name',
              CORRECTIVE_ACTION_1:   'Change the text content of the @%1@ element to make it the same as other %2 links that share the same @href@ value',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Consistency of link text makes interaction with web pages more predictable'                   
            ],
            TECHNIQUES: [
              'Use the same text for links that point to the same URL',
              'Make sure the link text accurately describes the target of the link'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 12.2 The A element', 
                url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H30: Providing link text that describes the purpose of a link for anchor elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H30'
              }  
            ]   
        },
        LINK_2: {
            ID:                    'Link Rule 2',
            DEFINITION:            'Links with different HREFs %s have unique accessible names',
            SUMMARY:               'Link text %s be unique',
            TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            '@a@, @area@ or @[role=link]@ element has unique accessible name on the page ',
              ALL_PASS_PLURAL:              'All %N_P @a@, @area@ or @[role=link]@ elements have unique accessible name or are unique through additional text context on the page',
              SOME_FAIL:                    '%N_F out of %N_T @a@, @area@ or @[role=link]@ elements do NOT have unique accessible name or are NOT unique even with additional text context on the page ',
              CORRECTIVE_ACTION_SINGULAR:   'add @aria-describedby@ attribute to the link to provide additional text to make the accessible name unique',
              CORRECTIVE_ACTION_PLURAL:     'add @aria-describedby@ attribute to the %N_F@a@, @area@ or @[role=link]@ elements to provide additional text context to make the accessible names unique',
              ALL_FAIL_PLURAL:              'All %N_F @a@, @area@ or @[role=link]@ elements do NOT have unique accessible names or are NOT unique through additional text context on the page',
              NOT_APPLICABLE:               'No @a@, @area@ or @[role=link]@ elements on page share the same accessible name'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has unique link text on the page',
              PASS_2:                '@%1@ element has the same @href@ value as the %2 links it shares a name with',
              PASS_3:                '@%1@ element has unique link text throught the use of additional text context using @aria-describedby@ attribute',
              CORRECTIVE_ACTION_1:   'Change the text content of the @%1@ element or provide additional context text to make the link text unique',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Links that point to different URLs should have unique accessible names, when a link shares the same accessible name but have different URLs, users using speech will be confused unless programmatic text context is provided'                   
            ],
            TECHNIQUES: [
              'The link text (i.e. accessible name) should uniquely describe the target of a link,',
              'Use aria-laeblledby to provide context for links that share the same link text'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 12.2 The A element', 
                url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H30: Providing link text that describes the purpose of a link for anchor elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H30'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'OAA Example 44 - Using aria-describedby to satisfy WCAG 2.4.4 Link Purpose in Context', 
                url:   'http://oaa-accessibility.org/example/44/'
              }  
            ]   
        },
        LINK_3: {
            ID:                    'Link Rule 3',
            DEFINITION:            'Link %s provide minimum target dimensions.',
            SUMMARY:               'Link %s not be small',
            TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Dimension of one @a@, @area@ or @[role=link]@ element could not be calculated, manual check of dimensions need to be done to insure size is greater than 12 pixels high or 12 pixels wide',
              MANUAL_CHECKS_PLURAL:         'Dimension of %N_MC @a@, @area@ or @[role=link]@ elements could not be calculated, manual check of dimensions need to be done to insure size is greater than 12 pixels high or 12 pixels wide',
              ALL_PASS_SINGULAR:            '@a@, @area@ or @[role=link]@ element is more than 12 pixels high and 12 pixels wide',
              ALL_PASS_PLURAL:              'All %N_P @a@, @area@ or @[role=link]@ elements are more than 12 pixels high and 12 pixels wide',
              SOME_FAIL:                    '%N_F out of %N_T @a@, @area@ or @[role=link]@ elements are NOT more than 12 pixels high and 12 pixels wide',
              CORRECTIVE_ACTION_SINGULAR:   'increase the dimensions of the @a@, @area@ or @[role=link]@ element to be at least 12 pixels high and 12 pixels wide',
              CORRECTIVE_ACTION_PLURAL:     'increase the dimensions of the %N_F @a@, @area@ or @[role=link]@ elements to be at least 12 pixels high and 12 pixels wide',
              ALL_FAIL_SINGULAR:            '@a@, @area@ or @[role=link]@ element is NOT more than 12 pixels high and 12 pixels wide',
              ALL_FAIL_PLURAL:              'All %N_T @a@, @area@ or @[role=link]@ elements are NOT more than 12 pixels high and 12 pixels wide',
              NOT_APPLICABLE:               'No @a@, @area@ or @[role=link]@ elements on page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element is more than 12 pixels high and 12 pixels wide',
              MANUAL_CHECK_1:        'The rendered dimensions of the @%1@ element could not be determined, check to make sure the image is at least 12 pixels high and 12 pixels wide',
              CORRECTIVE_ACTION_1:   'The rendered dimensions of the @%1@ element is %2 pixels by %3 pixels, change the dimensions of the image to be at least 12 pixels high and 12 pixels wide',
              HIDDEN:                '@%1@ element is off screen.'
            },  
            PURPOSE: [
              'Links must be large enough for people to see and select with the mouse'                   
            ],
            TECHNIQUES: [
              'Increase the rendered dimensions of the link'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 12.2 The A element', 
                url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'IITAA Implementation Guidelines 1.0: 9.3 - Avoid using small links.', 
                url:   'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html'
              }                            
            ]
        },
        LINK_4: {
            ID:                    'Link Rule 4',
            DEFINITION:            'Accessible names for a link %s describe the target of the link',
            SUMMARY:               'Link text %s be descriptive',
            TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_SINGULAR:        'Verify the @a@, @area@ or @[role=link]@ element accessible name describes the target of the link',
              MANUAL_CHHECK_PLURAL:         'Verify all %N_P @a@, @area@ or @[role=link]@ elements accessible name describes the target of each link',
              SOME_FAIL:                    '%N_F out of %N_T @a@, @area@ or @[role=link]@ elements do NOT have an accessible name',
              CORRECTIVE_ACTION_SINGULAR:   'add text content to the link that describes the target of the link',
              CORRECTIVE_ACTION_PLURAL:     'add text content to the %1 links that describes the target of each link',
              ALL_FAIL_SINGULAR:            '@a@, @area@ or @[role=link]@ element does NOT have an accessible name',
              ALL_FAIL_PLURAL:              'All %N_F @a@, @area@ or @[role=link]@ elements do NOT have accessible names',
              NOT_APPLICABLE:               'No @a@, @area@ or @[role=link]@ elements on page share the same accessible name'              
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        '@%1@ element has the accessible name "%2", verify that the name accurately describes the target of the link, if not change the text content or text context of the link to create a more accessible name',
              MANUAL_CHECK_2:        '@%1@ element has the accessible name "%2" with a text content of "%3", verify that the name and context text accurately describes the target of the link, if not change the text content or context of the link to create a more accessible name',
              CORRECTIVE_ACTION_1:   'The @%1@ element does NOT have an accessible name, add text content to the link so the the accessible name describes the target of the link',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              'Link text should describe the target of the link '                   
            ],
            TECHNIQUES: [
              'The text content of the link (i.e. the default accessible name) should uniquely describe the target of each link,',
              'Use aria-label or aria-labelledby to provide more descriptive accessible names when the text content of the link cannot be changed',
              'Use aria-describedby to provide context for links that share the same link text but have some type of context to make the link text meaningful'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 12.2 The A element', 
                url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H30: Providing link text that describes the purpose of a link for anchor elements', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H30'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'OAA Example 44 - Using aria-describedby to satisfy WCAG 2.4.4 Link Purpose in Context', 
                url:   'http://oaa-accessibility.org/example/44/'
              }  
            ]   
        },
        LIST_1: {
            ID:                       'LIST 1',
            TITLE:                    'A list of navigational links %s be contained within an element with role=navigation.',
            PURPOSE:                  'Role navigation provides makes it easy for users of asssitive technology to find the navigation links on a web page.',
            MESSAGE_HAS_ROLE_NAV:     'The parent element of this %1 has role=navigation.',
            MESSAGE_MISSING_ROLE_NAV: 'The parent element of this %1 does not have role=navigation.',
            MESSAGE_ROLE_NAV_ON_LIST: 'This %1 element should not have role=navigation; it should be placed on its parent element instead.'
        },
        MEDIA_1: {
            ID:             'MEDIA 1',
            TITLE:          'Pre-recorded audio %s have text based alternatives',
            PURPOSE:        '',
            MESSAGE_PASS_1: 'Text based alternative is available for pre-recorded audio',
            MESSAGE_MAYBE:  'If %1 element is prerecorded audio, verify that a text based alternative to the audio is available',
            MESSAGE_FAIL:   'Text based alternative is NOT available for pre-recorded audio',
            MESSAGE_HIDDEN: '%1 element is hidden from the visual rendering'
        },
        MEDIA_2: {
            ID:                 'MEDIA 2',
            TITLE:              'Pre-recorded video %s have either text based alternative or audio description',
            PURPOSE:            '',
            MESSAGE_PASS_TEXT:  'Text based alternative is available for pre-recorded video',
            MESSAGE_PASS_AUDIO: 'Audio description is available for pre-recorded video',
            MESSAGE_PASS_BOTH:  'Both an audio description and text based description is available for pre-recorded video',
            MESSAGE_MAYBE:      'If %1 element is prerecorded video, verify that a text based alternative or audio description is available for the video',
            MESSAGE_FAIL:       'Text based alternative or audio description is NOT available for pre-recorded video',
            MESSAGE_HIDDEN:     '%1 element is hidden from the visual rendering'
        },
        TABLE_1: {
            ID:                    'Table Rule 1',
            DEFINITION:            'Data cells %s have header cells',
            SUMMARY:               'Data table %s have headers',
            TARGET_RESOURCES_DESC: '@td@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The data cell with content has at least one header cells',
              ALL_PASS_PLURAL:              'All %N_P data cells have header cells',
              SOME_FAIL:                    '%N_F out of %N_T data cells do NOT have header cells ',
              CORRECTIVE_ACTION_SINGULAR:   'add @th@ or @td[scope]@ elements to the first row or column of the data table or add a @headers@ attribute to define the headers for the data cell',
              CORRECTIVE_ACTION_PLURAL:     'add @th@ or @td[scope]@ elements to the first row or column of the table or use the @headers@ attribute to define headers for the data cell',
              ALL_FAIL_SINGULAR:            'The data cell with content does NOT have any header cells',
              ALL_FAIL_PLURAL:              'All %N_F data cells with content do NOT have any header cells',
              NOT_APPLICABLE:               'No data tables in the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'The @td@ element uses the @headers@ attribute with the following is: \'@1\' to define header cells',
              PASS_2:                'The @td@ element has at least one header cell in the row and/or column that contains the cell',
              CORRECTIVE_ACTION_1:   'add header cells using the @headers@ attribute, since this table is a complex table',
              CORRECTIVE_ACTION_2:   'add header cells using row and/or column @th@ elements, or the @headers@ attribute on the @td@ element',
              MANUAL_CHECK_1:        'The @td@ element does not have any text content and it does not have any header cells, verify that this cell is being used for formatting and does not need headers',
              HIDDEN:                '@td@ element is hidden from asssistive technologies'
            },  
            PURPOSE: [
              'Data cells need header cells for people using speech to understand the content of the table cell, since they cannot see the visual relationships with header cells'                   
            ],
            TECHNIQUES: [
              'Use @th@ elements in the first row or column to identify row and column headers in a simple data tables',
              'Use @headers@ attribute on each @td@ element to identify header information in complex data tables',
              'Use @th@ element for cells used as header cells in the table',
              'While not recommended, it is valid to use @td@ element with a @scope@ attribute as header cell'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#edef-TD'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: scope attribute', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#adef-scope'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H51: Using table markup to present tabular information', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H51'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H63: Using the scope attribute to associate header cells and data cells in data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H63'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },
        TABLE_2T: {
            ID:                    'Table Rule 2T (Transitional)',
            DEFINITION:            'Each data table %s have a effective caption with content',
            SUMMARY:               'Data tables %s have caption',
            TARGET_RESOURCES_DESC: '@caption@ and @table[summary]@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The data table has has an effective caption',
              ALL_PASS_PLURAL:              'All %N_P data tables have an effective caption',
              SOME_FAIL:                    '%N_F out of %N_T data tables do NOT have an effective caption',
              CORRECTIVE_ACTION_SINGULAR:   'add @caption@ element or @summary@ attribute to provide an effective caption',
              CORRECTIVE_ACTION_PLURAL:     'add @caption@ element or @summary@ attribute to each of the %N_F tables to provide an effective caption',
              ALL_FAIL_SINGULAR:            'Data table does NOT have an effective caption',
              ALL_FAIL_PLURAL:              'All %N_F data tables do NOT have an effective caption',
              NOT_APPLICABLE:               'No data tables on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Data table has an effective caption using the @caption@ with content: \'%1\'',
              PASS_2:                'Data table has an effective caption using the @summary@ attribute with content: \'%1\'',
              CORRECTIVE_ACTION_1:   'add @caption@ element or @summary@ attribute to provide an effective caption for the table, or if the table is really being used for layout or positioning add @role="presentation"@ to the @table@ element',
              HIDDEN:                'table is hidden from asssistive technologies'
            },  
            PURPOSE: [
              'Effective caption of a table is important for people using speech, people with visual impairments and people with learning disabilities to help them understand the purpose of the table'                   
            ],
            TECHNIQUES: [
              'Use @caption@ element to provide an effective label',
              'Use @summary@ attribute to provide an effective label',
              'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on all the table elements'
            ],
            MANUAL_CHECKS: [
              'Make sure the content of the effective lable accurately and succinctly describes the purpose of the data table'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.2 Table Captions: The CAPTION element', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#h-11.2.2'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: summary attribute', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#adef-summary'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H39: Using caption elements to associate data table captions with data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H39'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H73: Using the summary attribute of the table element to give an overview of data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H73'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F46'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },
        TABLE_2S: {
            ID:                    'Table Rule 2S (Single Data Table)',
            DEFINITION:            'If there is only one data table on a page, it %s have an effective caption with content',
            SUMMARY:               'Data tables %s have caption',
            TARGET_RESOURCES_DESC: '@th@ and @td[scope]@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The data table has has an effective caption',
              CORRECTIVE_ACTION_SINGULAR:   'add @caption@ element or @summary@ attribute to provide an effective caption',
              ALL_FAIL_SINGULAR:            'Data table does NOT have an effective caption',
              NOT_APPLICABLE:               'More than one or no data tables on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Data table has an effective caption using the @caption@ with content: \'%1\'',
              PASS_2:                'Data table has an effective caption using the @summary@ attribute with content: \'%1\'',
              CORRECTIVE_ACTION_1:   'add @caption@ element or @summary@ attribute to provide an effective caption for the table, or if the table is really being used for layout or positioning add @role="presentation"@ to the @table@ element',
              HIDDEN:                'table is hidden from asssistive technologies'
            },  
            PURPOSE: [
              'Effective caption of a table is important for people using speech, people with visual impairments and people with learning disabilities to help them understand the purpose of the table'                   
            ],
            TECHNIQUES: [
              'Use @caption@ element to provide an effective label',
              'Use @summary@ attribute to provide an effective label',
              'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on all the table elements'
            ],
            MANUAL_CHECKS: [
              'Make sure the content of the effective lable accurately and succinctly describes the purpose of the data table'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.2 Table Captions: The CAPTION element', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#h-11.2.2'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: summary attribute', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#adef-summary'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H39: Using caption elements to associate data table captions with data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H39'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H73: Using the summary attribute of the table element to give an overview of data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H73'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F46'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },
        TABLE_2M: {
            ID:                    'Table Rule 2M (Multiple Data Tables)',
            DEFINITION:            'If there is more than one data table on a page, each data table %s have a effective caption with content',
            SUMMARY:               'Data tables %s have caption',
            TARGET_RESOURCES_DESC: '@caption@ and @table[summary]@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The data table has has an effective caption',
              ALL_PASS_PLURAL:              'All %N_P data tables have an effective caption',
              SOME_FAIL:                    '%N_F out of %N_T data tables do NOT have an effective caption',
              CORRECTIVE_ACTION_SINGULAR:   'add @caption@ element or @summary@ attribute to provide an effective caption',
              CORRECTIVE_ACTION_PLURAL:     'add @caption@ element or @summary@ attribute to each of the %N_F tables to provide an effective caption',
              ALL_FAIL_SINGULAR:            'Data table does NOT have an effective caption',
              ALL_FAIL_PLURAL:              'All %N_F data tables do NOT have an effective caption',
              NOT_APPLICABLE:               'Only one or no data tables on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Data table has an effective caption using the @caption@ with content: \'%1\'',
              PASS_2:                'Data table has an effective caption using the @summary@ attribute with content: \'%1\'',
              CORRECTIVE_ACTION_1:   'add @caption@ element or @summary@ attribute to provide an effective caption for the table, or if the table is really being used for layout or positioning add @role="presentation"@ to the @table@ element',
              HIDDEN:                'table is hidden from asssistive technologies'
            },  
            PURPOSE: [
              'Effective caption of a table is important for people using speech, people with visual impairments and people with learning disabilities to help them understand the purpose of the table'                   
            ],
            TECHNIQUES: [
              'Use @caption@ element to provide an effective label',
              'Use @summary@ attribute to provide an effective label',
              'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on all the table elements'
            ],
            MANUAL_CHECKS: [
              'Make sure the content of the effective lable accurately and succinctly describes the purpose of the data table'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.2 Table Captions: The CAPTION element', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#h-11.2.2'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: summary attribute', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#adef-summary'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H39: Using caption elements to associate data table captions with data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H39'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H73: Using the summary attribute of the table element to give an overview of data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H73'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F46'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },
        TABLE_3: {
            ID:                    'Table Rule 3',
            DEFINITION:            'The effective caption content and effective summary content of each data table %s not be the same',
            SUMMARY:               '@caption@ %s be different from @summary@',
            TARGET_RESOURCES_DESC: '@caption@ element and @table[summary]@ attribute',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The data table has @caption@ element content that is different than @summary@ attribute content',
              ALL_PASS_PLURAL:              'All %N_P data tables have @caption@ element content that is different than @summary@ attribute content',
              SOME_FAIL:                    '%N_F out of %N_T data tables do NOT have @caption@ element content that is different than @summary@ attribute content',
              CORRECTIVE_ACTION_SINGULAR:   'update @caption@ element content to give the table a descriptive title and update the @summary@ attribute to provide a summary of the content or conclusions that can be reached by viewing the data in the table',
              CORRECTIVE_ACTION_PLURAL:     'update @caption@ element content to give the table a descriptive title and update the @summary@ attribute to provide a summary of the content or conclusions that can be reached by viewing the data in each of the %N_F table',
              ALL_FAIL_SINGULAR:            'Data table does NOT have @caption@ element content that is different than @summary@ attribute content',
              ALL_FAIL_PLURAL:              'All %N_F data tables do NOT have @caption@ element content that is different than @summary@ attribute content',
              NOT_APPLICABLE:               'No data tables on the page with both a @caption@ element and @summary@ attribute'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'The text content of the @caption@ element is different that the text content of the @summary@ content',
              CORRECTIVE_ACTION_1:   'Update the text content of the @caption@ element and the @summary@ attribute so they are different, use the @caption@ element to provide a title for the table and the @summary@ element to describe the data or a summary of the data',
              HIDDEN:                'table is hidden from asssistive technologies'
            },  
            PURPOSE: [
              '@caption@ element should be used to provide a title for a table so users of asssitive technology can determine if they would like to explore the data',                   
              '@summary@ attribute should be used to provide a provide information about the data or a summary of the data in a table so users of asssitive technology can get a summary of the table information'                   
            ],
            TECHNIQUES: [
              'Use @caption@ element to provide a title for the table',
              'Use the @summary@ attribute to provide a summary of the content or conclusions that can be understood by viewing the data in the table',
              'If the table is not used for tabular data, but instead for layout of content, use the @role="presentation"@ on all the table elements'
            ],
            MANUAL_CHECKS: [
              'Verify the content of the @caption@ element text content accurately and succinctly describes the purpose of the data table',
              'Verify the content of the @summary@ attribute text content describes the data or a summary of the data in the table'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.2 Table Captions: The CAPTION element', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#h-11.2.2'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: summary attribute', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#adef-summary'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H39: Using caption elements to associate data table captions with data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H39'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H73: Using the summary attribute of the table element to give an overview of data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H73'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'F46: Failure of Success Criterion 1.3.1 due to using th elements, caption elements, or non-empty summary attributes in layout tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/F46'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },
        TABLE_4: {
            ID:                    'Table Rule 4',
            DEFINITION:            'Each data table header cell %s use th elements rather than td element with a scope attribute',
            SUMMARY:               '%s @th@ elements for head cells',
            TARGET_RESOURCES_DESC: '@th@ and @td[scope]@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The header cell uses @th@ element',
              ALL_PASS_PLURAL:              'All %N_P header cells use @th@ element',
              SOME_FAIL:                    '%N_F out of %N_T header cells do NOT use @th@ element',
              CORRECTIVE_ACTION_SINGULAR:   'change the @td[scope]@ element to a  @th@ element',
              CORRECTIVE_ACTION_PLURAL:     'change the @td[scope]@ element to a  @th@ element for each of the %N_F header cells using @td[scope]@',
              ALL_FAIL_SINGULAR:            'The header cell does NOT use @th@ element',
              ALL_FAIL_PLURAL:              'All %N_F header cell do NOT use @th@ element',
              NOT_APPLICABLE:               'No header cells identified on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'The @th@ element is used for header cell',
              CORRECTIVE_ACTION_1:   'Change the @td[scope]@ element to a  @th@ element',
              HIDDEN:                'header cell is hidden from asssistive technologies'
            },  
            PURPOSE: [
              '@th@ element is the web standards way to identify header cells in a table, makes the data table source code easier to read and debug for accessibility problems'                   
            ],
            TECHNIQUES: [
              'Use @th@ elements in the first row or column to identify row and column headers in a simple data tables',
              'Use @headers@ attribute on each @td@ element to identify header information in complex data tables',
              'Use @th@ element for cells used as header cells in the table'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HTML 4.01 Specification: 11.2.6 Table cells: The TH and TD elements', 
                url:   'http://www.w3.org/TR/html4/struct/tables.html#edef-TD'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H51: Using table markup to present tabular information', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H51'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H63: Using the scope attribute to associate header cells and data cells in data tables', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H63'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'IBM Web checklist Checkpoint 1.3e: Tables', 
                url:   'http://www-03.ibm.com/able/guidelines/web/webtableheaders.html'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Simple Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-simple.php'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_EXAMPLE, 
                title: 'iCITA HTML Best Practices: Complex Data Table Example', 
                url:   'http://html.cita.illinois.edu/nav/dtable/dtable-example-complex.php'
              }  
            ]   
        },    
        TABLE_5: {
            ID:                      'Table Rule 5',
            TITLE:                   'Each data tables %s have an effective summary',
            PURPOSE:                 'It is important to provide a description of the content or point of the data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS_1:          'Table has an effective caption: \'%1\'',
            MESSAGE_VIOLATION:       'The effective caption is missing or empty, the table must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:  'The effective caption is missing or empty, the table should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:          'The effective caption is missing or empty, the table may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MORE_THAN_ONE:   'There is more than one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_6: {
            ID:                                'Table Rule 6',
            TITLE:                             'Each complex data table %s have ids on all header cells.',
            PURPOSE:                           'Complex data tables require much more specific definition of header cells for each data cell and using IDs on the header cells is required for identifying the header cells.',
            MESSAGE_PASS_1:                    'Table header cell has unique ID',
            MESSAGE_NO_CONTENT:                'Table header cell does not contain content, it is unsual for a header cell to not have content.',
            MESSAGE_NOT_UNIQUE_VIOLATION:      'Table header cell has duplicate ID: \'%1\', header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'Table header cell has duplicate ID: \'%1\', header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'Table header cell has duplicate ID: \'%1\', header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'Table header cell is missing an @id@ attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'Table header cell is missing an @id@ attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'Table header cell is missing an @id@ attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS_1:              'All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     '%1 header cells of %2 header cells in the table have missing or dulicate @id@ values.',
            MESSAGE_TABLE_DATA_TABLE:          'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:        'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:              'The table is hidden from people using assistive technologies.'
        },
        TABLE_7: {
            ID:                             'Table Rule 7',
            TITLE:                          'Each td element in a complex data table with content, %s have a headers attribute with a list of valid ids',
            PURPOSE:                        'Complex data tables require much more specific definition of header cells for each data cell and using the HEADERS attribute on each data cell is required for identifying the header cells.',
            MESSAGE_HAS_HEADERS:            'Cell has headers attribute with values.',
            MESSAGE_MISSING_VIOLATION:      'Headers attribute is missing or empty, data cells in complex data tables must have a headers attribute.',
            MESSAGE_MISSING_RECOMMENDATION: 'Headers attribute is missing or empty, data cells in complex data tables should have a headers attribute.',
            MESSAGE_MISSING_MANUAL:         'Headers attribute is missing or empty, data cells in complex data tables may need a headers attribute',
            MESSAGE_DATA_CELL_IS_EMPTY:     'Table cell is empty, check to see if it needs headers, or if the empty cell could contain data',
            MESSAGE_HEADER_CELL:            'Cell is a header cell, so rule was not evaluated',
            MESSAGE_TABLE_PASS_1:           'All %1 data cells with content have headers.',
            MESSAGE_TABLE_MISSING_HEADERS:  '%1 data cells with content out of %2 are missing headers.',
            MESSAGE_TABLE_DATA_TABLE:       'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:     'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:           'The table is hidden from people using assistive technologies.'
        },
        TABLE_8: {
            ID:                             'Table Rule 8',
            TITLE:                          'Each complex data table %s have an effective summary.',
            PURPOSE:                        'It is critical to provide a description of the content or point of the data in a complex data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS_1:                 'Complex data table has the effective summary \'%1\'',
            MESSAGE_VIOLATION:              'Complex data tables must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:         'Complex data tables should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:                 'Complex data tables may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_HIDDEN:                 'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_COMPLEX_DATA_TABLE: 'The table is not complex data table, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:         'The table is a layout table, so rule was not evaluated.'
        },
        TITLE_1: {
            ID:                    'Title Rule 1',
            DEFINITION:            'Page %s have a @title@ element with content.',
            SUMMARY:               'Page %s have title',
            TARGET_RESOURCES_DESC: '@title@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Page has @title@ element with content',
              CORRECTIVE_ACTION_SINGULAR: 'add @title@ element to the @head@ element section with text content that describes the content or purpose of the page',
              ALL_FAIL_SINGULAR:          'Page does not have @title@ element or the @title@ element is empty'
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:              'Page has @title@ element with content',
              CORRECTIVE_ACTION_1: 'Add content to @title@ element',
              CORRECTIVE_ACTION_2: 'Add @title@ element to page'
            },  
            PURPOSE: [
              'The TITLE element text content can be accessed by asssitive technologies to understand the purpose of the web page.'
            ],
            TECHNIQUES: [
                'Use TITLE element text content to describe the content of a web page'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                title: 'HTML TITLE Element Specification', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-TITLE'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G88: Providing descriptive titles for Web pages', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G88'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H25: Providing a title using the title element', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H25'
              }
            ]
        },
        TITLE_2: {
            ID:            'Title Rule 2',
            DEFINITION:    '@title@ element text content %s describe the purpose or content of the page',
            SUMMARY:       '@title@ %s describe page',
            TARGET_RESOURCES_DESC: '@title@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_SINGULAR:      'Verify the @title@ element text content describes the purpose or the content of the page',
              CORRECTIVE_ACTION_SINGULAR: 'add @title@ element to the @head@ element section with text content that describes the content or purpose of the page',
              ALL_FAIL_SINGULAR:          'Page does not have @title@ element or the @title@ element is empty'
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:      'Verify the @title@ element text content describes the purpose or the content of the page',
              CORRECTIVE_ACTION_1: 'Add content to @title@ element',
              CORRECTIVE_ACTION_2: 'Add @title@ element to page'
            },  
            PURPOSE: [
              'The TITLE element text content can be accessed by asssitive technologies to understand the purpose or content of the web page.'
            ],
            TECHNIQUES: [
              'Use TITLE element text content to describe the content of a web page',
              'Title should contain information about the website',
              'Title should contain information about the page in the website',
              'If the page is part of a sequence of web pages does the title indicate which step in the sequence'              
            ],
            MANUAL_CHECKS: [
              'Read the title of the page and determine if it describes which website it is a part',
              'Read the title of the page and determine if it describe which page you are in the website',
              'If the web page is part of a sequence of web pages does it describe which step it is in the sequence'              
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                title: 'HTML TITLE Element Specification', 
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-TITLE'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G88: Providing descriptive titles for Web pages', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G88'
              }, 
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'H25: Providing a title using the title element', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/H25'
              }
            ]
        },    
        VIDEO_1: {
            ID:                    'Video Rule 1',
            DEFINITION:            'Video only media (i.e. no audio content) %s have audio description or text description of the video content',
            SUMMARY:               'Video only %s have alternative',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is video only (i.e. no audio content) and if it is only video make sure it has either an audio description track or text description of the content of the video',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are video only media (i.e. no audio content), if there are any video only media make sure they have either an audio description track or text description of the video',
              ALL_PASS_SINGULAR:            'Video has either a audio description track or a text description',
              ALL_PASS_PLURAL:              'All %N_P videos have either an audio description track or text description',
              SOME_FAIL:                    '%N_F out of %N_T videos do NOT have a audio description track or text description',
              CORRECTIVE_ACTION_SINGULAR:   'add audio description track or text description to video',
              CORRECTIVE_ACTION_PLURAL:     'add audio description track or text descriptions to each of the %N_F the video only media elements',
              ALL_FAIL_SINGULAR:            'Video only element does not have a audio description track or text description',
              ALL_FAIL_PLURAL:              'All %N_F video only elements do NOT have an audio description track or text description',
              NOT_APPLICABLE:               'No visible @object@, @embed@ or @video@ elements found on this page that could be used for video only (i.e. no audio content'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ video only element has a audio description track',
              PASS_2:                '@%1@ video only element has a text description',
              CORRECTIVE_ACTION_1:   'Add audio description track or text description to @%1@ video only element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has audio description track or text description',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for video only (i.e. no audio content), if it is video only verify that it has audio description track or text description ',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Audio description track and text descriptions provide a means for people cannot see the video to understand the content or information the video provides'                   
            ],
            TECHNIQUES: [
              'Various techniques to add based on the video formats and media players being supported, see your technology specific requirements for adding audio descriptions',
              'The HTML5 video element is designed to make it easier to support audio description tracks through the use of the @track@ element of @type=description@',
              'Use @aria-describedby@ attribute to point to a text description of the video only content'
            ],
            MANUAL_CHECKS: [
              'Audio tracks can be heard when the video is being played, and they will be describing the content of the video',
              'Text descriptions maybe part of the web page or accessed by a link'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'W3C Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-describedby (property)', 
                url:   'http://www.w3.org/TR/wai-aria.html#aria-describedby'
              }                            
            ]
        },    
        VIDEO_2: {
            ID:                    'Video Rule 2',
            DEFINITION:            'Prerecorded video (with audio content) %s have synchronized caption',
            SUMMARY:               'Prerecorded video %s have caption',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is being used for prerecorded video (with audio content) and if it is prerecorded video make sure it has a caption track',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are prerecorded videos (with audio content), if they any are a prerecorded video make sure they have synchornized caption track',
              ALL_PASS_SINGULAR:            'Video has synchornized caption track',
              ALL_PASS_PLURAL:              'All %N_P videos have synchronized caption tracks',
              SOME_FAIL:                    '%N_F out of %N_T videos do NOT have synchronized caption tracks',
              CORRECTIVE_ACTION_SINGULAR:   'add caption track to video',
              CORRECTIVE_ACTION_PLURAL:     'add caption track to each of the %N_F videos',
              ALL_FAIL_SINGULAR:            'Prerecorded video does not have a synchronized caption track',
              ALL_FAIL_PLURAL:              'All %N_F prerecorded videos do NOT have synchronized caption tracks',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on the page that could be prerecorded video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 element has synchronized caption track',
              CORRECTIVE_ACTION_1:   'Add synchronized caption track to @%1@ video element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has synchronized caption track',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for video, if it is verify that it has a synchronized caption track',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Captions provide a means for people who are deaf or hearing impaired to get the speech and sound content of a video'                   
            ],
            TECHNIQUES: [
              'Various techniques based on the video formats and media players you are supporting, please see your technology specific requirements for captions',
              'The HTML5 video element is designed to make it easier to support caption tracks through the use of the @track@ element',
              'Make sure the video player is capable of rendering captions by default or through user options'
            ],
            MANUAL_CHECKS: [
              'Captions should be visible when the video is playing and the text of the captions should be synchronized with the speech'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              }                            
            ]
        },    
        VIDEO_3: {
            ID:                    'Video Rule 3',
            DEFINITION:            'Prerecorded video (with audio content) %s have audio description or text description',
            SUMMARY:               'Prerecorded video %s have description',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is prerecorded video (with audio content) and if it is prerecorded video make sure it has an audio description track or text description of the content of the video',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are prerecorded video (with audio content), if any are prerecorded video make sure they have either an audio description track or a text description of the video',
              ALL_PASS_SINGULAR:            'Video has either an audio description track or a text description',
              ALL_PASS_PLURAL:              'All %N_P videos have either a audio description track or a text description',
              SOME_FAIL:                    '%N_F out of %N_T prerecorded videos do NOT have a audio description track or text description',
              CORRECTIVE_ACTION_SINGULAR:   'add audio description track or text description to video',
              CORRECTIVE_ACTION_PLURAL:     'add audio description tracks or text descriptions to each of the %N_F the videos',
              ALL_FAIL_SINGULAR:            'Prerecoreded video does not have a audio description track or text description',
              ALL_FAIL_PLURAL:              'All %N_F prerecorded videos do NOT have an audio description tracks or text descriptions',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on this page that could be prerecorded video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has a audio description track',
              PASS_2:                '@%1@ element has a text description',
              CORRECTIVE_ACTION_1:   'Add audio description track or text description to @%1@ element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has audio description or text description',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for prerecorded video, if it is verify that it has audio description track or text description ',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Audio descriptions and text descriptions provide a means for people cannot see the video to understand the video content'                   
            ],
            TECHNIQUES: [
              'Various techniques to add based on the video formats and media players being supported, please see your technology specific requirements for captions',
              'The HTML5 video element is attempting to make it easier to support audio descriptions through the use of the @track@ element',
              'Use @aria-describedby@ attribute to point to a text description of the video content'
            ],
            MANUAL_CHECKS: [
              'Audio tracks can be heard when the video is being played, and they will be describing the content of the video',
              'Text descriptions maybe part of the web page or accessed by a link'            
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'W3C Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-describedby (property)', 
                url:   'http://www.w3.org/TR/wai-aria.html#aria-describedby'
              }                            
            ]
        },
        VIDEO_4: {
            ID:                    'Video Rule 4',
            DEFINITION:            'Live video %s have synchronized caption',
            SUMMARY:               'Live video %s have caption',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is being used for live video (with audio content) and if it is a live video make sure it has a synchronized caption track',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are live videos, if they any are a live video (with audio content) make sure they have synchronized caption tracks',
              ALL_PASS_SINGULAR:            'Live video has synchronized caption track',
              ALL_PASS_PLURAL:              'All %N_P live videos have synchronized caption tracks',
              SOME_FAIL:                    '%N_F out of %N_T live videos do NOT have synchronized caption tracks',
              CORRECTIVE_ACTION_SINGULAR:   'add synchronized caption track to live video',
              CORRECTIVE_ACTION_PLURAL:     'add synchronized caption tracks to each of the %N_F live videos',
              ALL_FAIL_SINGULAR:            'Live video does not have a synchronized caption track',
              ALL_FAIL_PLURAL:              'All %N_F live videos do NOT have synchronized caption tracks',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on this page that could be live video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 element has synchronized caption track',
              CORRECTIVE_ACTION_1:   'Add synchronized caption to @%1@ live video element',
              MANUAL_CHECK_1:        'Verify the @%1@ live video element has a synchronized caption track',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for live video, if it is verify that it has synchronized caption track',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Captions provide a means for people who are deaf or hearing impaired to get the speech and sound content of a video'                   
            ],
            TECHNIQUES: [
              'Various techniques based on the video formats and media players you are supporting, please see your technology specific requirements for captions',
              'The HTML5 video element is designed to make it easier to support caption tracks through the use of the @track@ element',
              'Make sure the video player is capable of rendering captions by default or through user options'
            ],
            MANUAL_CHECKS: [
              'Captions should be visible when the live video is playing and the text of the captions should be synchronized with the speech'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              }                            
            ]
        },      
        VIDEO_5: {
            ID:                    'Video Rule 5',
            DEFINITION:            'Video (with audio content) %s have audio description track',
            SUMMARY:               'Video %s have audio description track',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is prerecorded video (with audio content) and if it is a video make sure it has an audio description track',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are prerecorded video (with audio content), if any elements are a prerecorded video make sure each has an audio description track',
              ALL_PASS_SINGULAR:            'Video has an audio description track',
              ALL_PASS_PLURAL:              'All %N_P videos have an audio description track',
              SOME_FAIL:                    '%N_F out of %N_T prerecorded videos do NOT have an audio description track',
              CORRECTIVE_ACTION_SINGULAR:   'add audio description track to video element',
              CORRECTIVE_ACTION_PLURAL:     'add audio description tracks to each of the %N_F the video elements',
              ALL_FAIL_SINGULAR:            'Prerecorded video does not have a audio description or text description',
              ALL_FAIL_PLURAL:              'All %N_F prerecorded videos do NOT have an audio description track',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on this page that could be prerecorded video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has a audio description track',
              CORRECTIVE_ACTION_1:   'Add audio description track to @%1@ prerecorded video element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has audio description track',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for prerecorded video, if it is verify that it has audio description track',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Audio descriptions and text descriptions provide a means for people cannot see the video to understand the video content'                   
            ],
            TECHNIQUES: [
              'Various techniques to add based on the video formats and media players you are supporting, please see your technology specific requirements for audio descriptions',
              'The HTML5 video element is attempting to make it easier to support audio descriptions through the use of the text track element',
              'Use aria-describedby attribute to point to a text description of the video only content'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'ARIA: aria-describedby', 
                url:   ''
              }                            
            ]
        },    
        VIDEO_6: {
            ID:                    'Video Rule 6',
            DEFINITION:            'Prerecorded video (with audio content) %s have sign language interpretation',
            SUMMARY:               'Prerecorded video %s have sign language',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is being used for prerecorded video (with audio content) and if it is prerecorded video make sure it includes synchronniized sign language interpretation',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are prerecorded videos (with audio content), if they any are a prerecorded video make sure they have synchronniized sign language interpretation',
              ALL_PASS_SINGULAR:            'Video has synchornized sign language interpretation',
              ALL_PASS_PLURAL:              'All %N_P videos have synchornized sign language interpretation',
              SOME_FAIL:                    '%N_F out of %N_T videos do NOT have sign language interpretation',
              CORRECTIVE_ACTION_SINGULAR:   'add synchornized sign language interpretation to video',
              CORRECTIVE_ACTION_PLURAL:     'add synchornized sign language interpretation to each of the %N_F videos',
              ALL_FAIL_SINGULAR:            'Prerecorded video does not have a sign language interpretation',
              ALL_FAIL_PLURAL:              'All %N_F prerecorded videos do NOT have sign language interpretation',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on the page that could be prerecorded video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 element has synchornized sign language interpretation',
              CORRECTIVE_ACTION_1:   'Add synchornized sign language interpretation to @%1@ video element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has synchornized sign language interpretation',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for prerecorded video, if it is verify that it has synchornized sign language interpretation',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Sign language interpretation provide a means for people who are deaf or hearing impaired to get the speech and sound content of a video'                   
            ],
            TECHNIQUES: [
              'Sign language interpretation can be included as part of the video as a picture inside of a picture',
              'Sign language interpretation can be inlcuded using a synchconized video with the primary video, the technique will be dependent on the video format and media players you want to support'
            ],
            MANUAL_CHECKS: [
              'Sign language interpretation must be visible when the video is playing and the text of the captions should be synchronized with the speech'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              }                            
            ]
        },
        VIDEO_7: {
            ID:                    'Video Rule 5',
            DEFINITION:            'Video (with audio content) %s have extended audio description track',
            SUMMARY:               'Video %s have extended audio description track',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is prerecorded video (with audio content) and if it is a video make sure it has an extended audio description track',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are prerecorded video (with audio content), if any elements are a prerecorded video make sure each has an extended audio description track',
              ALL_PASS_SINGULAR:            'Video has an extended audio description track',
              ALL_PASS_PLURAL:              'All %N_P videos have an extended audio description track',
              SOME_FAIL:                    '%N_F out of %N_T prerecorded videos do NOT have an extended audio description track',
              CORRECTIVE_ACTION_SINGULAR:   'add extended audio description track to video element',
              CORRECTIVE_ACTION_PLURAL:     'add extended audio description tracks to each of the %N_F the video elements',
              ALL_FAIL_SINGULAR:            'Prerecorded video does not have a extended audio description or text description',
              ALL_FAIL_PLURAL:              'All %N_F prerecorded videos do NOT have an extended audio description track',
              NOT_APPLICABLE:               'No visible @object@, @embed@ and @video@ elements found on this page that could be prerecorded video'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has a extended audio description track',
              CORRECTIVE_ACTION_1:   'Add extended audio description track to @%1@ prerecorded video element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has extended audio description track',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for prerecorded video, if it is verify that it has an extended audio description track',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Extended audio descriptions provide a means for people cannot see the video to understand the video content when the ausio track of the video does not provide enough time to provide the descriptions'                   
            ],
            TECHNIQUES: [
              'Various techniques to add extended audio descriptions based on the video formats and media players you are supporting, please see your technology specific requirements for including extended audeo descriptions',
              'The HTML5 video element is attempting to make it easier to support extended audio descriptions through the use of the text track element'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'HMTL 5: The track element', 
                url:   'http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'ARIA: aria-describedby', 
                url:   ''
              }                            
            ]
        },    
        VIDEO_8: {
            ID:                    'Video Rule 1',
            DEFINITION:            'Video only media (i.e. no audio content) %s have text description of the video content',
            SUMMARY:               'Video only %s have text description',
            TARGET_RESOURCES_DESC: '@object@, @embed@ and @video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element is video only (i.e. no audio content) and if it is only video make sure it has a text description of the content of the video',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements are video only media (i.e. no audio content), if there are any video only media make sure they have text description of the video',
              ALL_PASS_SINGULAR:            'Video has either a text description',
              ALL_PASS_PLURAL:              'All %N_P videos have either a text description',
              SOME_FAIL:                    '%N_F out of %N_T videos do NOT have a text description',
              CORRECTIVE_ACTION_SINGULAR:   'add text description to video',
              CORRECTIVE_ACTION_PLURAL:     'add text descriptions to each of the %N_F the video only media elements',
              ALL_FAIL_SINGULAR:            'Video only element does not have text description',
              ALL_FAIL_PLURAL:              'All %N_F video only elements do NOT have text description',
              NOT_APPLICABLE:               'No visible @object@, @embed@ or @video@ elements found on this page that could be used for video only (i.e. no audio content'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ video only element has a text description',
              CORRECTIVE_ACTION_1:   'Add text description to @%1@ video only element',
              MANUAL_CHECK_1:        'Verify the @%1@ video element has text description',
              MANUAL_CHECK_2:        'Verify the @%1@ element is being used for video only (i.e. no audio content), if it is video only verify that it has a text description',
              HIDDEN:                '@%1@ element is not visible on screen'
            },  
            PURPOSE: [
              'Text descriptions provide a means for people cannot see the video to understand the content or information the video provides in a non-time dependent format that can also be converted to other formats including Braille'                   
            ],
            TECHNIQUES: [
              'Use @aria-describedby@ attribute to point to a text description of the video only content'
            ],
            MANUAL_CHECKS: [
              'Text descriptions maybe part of the web page or accessed by a link'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'W3C Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-describedby (property)', 
                url:   'http://www.w3.org/TR/wai-aria.html#aria-describedby'
              }                            
            ]
        },    
        WIDGET_1: {
            ID:                    'Widget Rule 1',
            DEFINITION:            'Widgets %s have an accessible name',
            SUMMARY:               'Widget %s have name',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       '%N_MC widget may need an accessible name',
              MANUAL_CHECKS_PLURAL:         '%N_MC widgets may need an accessible name',
              ALL_PASS_SINGULAR:            'Widget has an accessible name',
              ALL_PASS_PLURAL:              '%N_P widgets have an accessible name',
              SOME_FAIL:                    '%N_F out of %N_T widgets do NOT have an accessible name',
              CORRECTIVE_ACTION_SINGULAR:   'add accessible name to widget',
              CORRECTIVE_ACTION_PLURAL:     'add accessible name to each of the %N_F widgets',
              ALL_FAIL_SINGULAR:            'Widget does NOT has an accessible name',
              ALL_FAIL_PLURAL:              'All %N_F widgets do NOT have an accessible name',
              NOT_APPLICABLE:               'No form controls on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:              '%1 widget has accessible name',
              MANUAL_CHECK_1:      '%1 widget may require an accessible name depending on context (i.e multiple widgets with the same role) in the page, adding an accessible name will improve accessibility',
              CORRECTIVE_ACTION_1: 'Add accessible name to %1 widget',
              HIDDEN:              '%1 widget is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A name associated with a widget insures that information about the widget is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'In some cases the child text nodes and @alt@ from descendant image elements will be used as the name for a widget',
              'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the widget',
              'Use @aria-label@ attribute to provide a explicit text description of the purpose of the widget',
              'Elements that have container widget roles typically do not receive keyboard focus, but giving them an accessible name provides assistive technologies a more accurate description of the purpose of the widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Accessible Name Calculation', 
                url:   'http://www.w3.org/TR/wai-aria/roles#namecalculation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: aria-labelledby', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: aria-label', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-label'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },                             
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE, 
                title: 'WAI-ARIA 1.0 Authoring Practices', 
                url:   'http://www.w3.org/TR/wai-aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
        WIDGET_2: {
            ID:                    'Widget Rule 2',
            DEFINITION:            'Elements with @onClick@ events %s be a link, button or have a widget role',
            SUMMARY:               '@onClick@ %s have role',
            TARGET_RESOURCES_DESC: 'Elements with @onClick@ attribute values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       '1 container element with an @onclick@ event requires verification that any child elements that can respond to the @onclick@ event are a link, form control or has a widget role, and can be accessd with the keyboard alone',
              MANUAL_CHECKS_PLURAL:         '%N_MC container elements with an @onclick@ event require verification that any child elements that can respond to the @onclick@ event are a link, form control or has a widget role, and can be accessd with the keyboard alone',
              ALL_PASS_SINGULAR:            'Element with a @onClick@ event is a link, form control or has a widget role',
              ALL_PASS_PLURAL:              'All %N_P elements with an @onClick@ event are either a link, form control or have a widget role',
              SOME_FAIL:                    '%N_F out of %N_T elements with an @onClick@ event are NOT a link, form control or have a widget role',
              CORRECTIVE_ACTION_SINGULAR:   'add widget role name to element',
              CORRECTIVE_ACTION_PLURAL:     'add widget roles to each of the %N_F elements',
              ALL_FAIL_SINGULAR:            'Element with a @onClick@ event is NOT a link, form control or has a widget role',
              ALL_FAIL_PLURAL:              'All %N_F elements with an @onClick@ event are NOT a link, form control or have a widget role',
              NOT_APPLICABLE:               'No elements with @onClick@ events on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ element has a widget role',
              PASS_2:                '@%1@ element is a form control',
              PASS_3:                '@%1@ element is a link',
              CORRECTIVE_ACTION_1:   'Add a @tabindex@ attribute with a numeric value to make with @%1@ element with @%2@ widget role keyboard accessible',
              CORRECTIVE_ACTION_2:   'Add widget role to the @%1@ element',
              CORRECTIVE_ACTION_3:   'Add widget role to the @%1@ element and a @tabindex@ attribute with a numeric value to make it keyboard accessible',
              MANUAL_CHECK_1:        'The @%1@ element has an @onclick@ event, verify any child elements that can respond to the @onclick@ event are a link, form control or have a widget role, and can be accessd with the keyboard alone',
              HIDDEN:                '%1 element with @onClick@ event is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'Elements with @onClick@ event handlers must be a link, form control or have a widget role'                   
            ],
            TECHNIQUES: [
              'Use ARIA widget role on non-form controls to describe their function on the page',
              'Use @tabindex@ attribute of "0" if the role of the element is a button or link',
              'Use @tabindex@ attribute of "-1" if the role of the element is NOT a buton or link, provide keyboard event handlers to control selection of elements in the widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'WAI-ARIA 1.0 Authoring Practices: Tabindex for managing focus', 
                url:   'http://www.w3.org/TR/2010/WD-wai-aria-practices-20100916/#kbd_focus'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
        WIDGET_3: {
            ID:                    'Widget Rule 3',
            DEFINITION:            '@role@ attribute value %s be a widget, section, landmark or live region role',
            SUMMARY:               '@role@ %s be valid',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Element with a @role@ attribute is a widget, section, landmark or live region role',
              ALL_PASS_PLURAL:              'All %N_P elements with @role@ attributes have a widget, section, landmark or live region role',
              SOME_FAIL:                    '%N_F out of %N_T elements with @role@ attributes have a widget, section, landmark or live region role',
              CORRECTIVE_ACTION_SINGULAR:   'add widget, section, landmark or live region role name to element',
              CORRECTIVE_ACTION_PLURAL:     'add widget, section, landmark or live region roles to each of the %N_F elements',
              ALL_FAIL_SINGULAR:            'Element with @role@ attribute does NOT have a widget, section, landmark or live region role',
              ALL_FAIL_PLURAL:              'All %N_F elements with @role@ attribute does NOT have a widget, section, landmark or live region role',
              NOT_APPLICABLE:               'No elements with @role@ attribute on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ is a widget role',
              PASS_2:                '@%1@ is a landmark role',
              PASS_3:                '@%1@ is a live region role',
              PASS_4:                '@%1@ is a section role',
              CORRECTIVE_ACTION_1:   '@%1@ is an abstract ARIA role, change the role attribute to a widget, landmark or live region role',
              CORRECTIVE_ACTION_2:   'The @role@ attribute is an empty string, change the @role@ attribute value to an appropriate widget, landmark or live region role',
              CORRECTIVE_ACTION_3:   '@%1@ is not a defined ARIA role, change the @role@ attribute value to an appropriate widget, landmark or live region role',
              HIDDEN:                '%1 element with @role@ attribute with the value @%2@ is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'Elements with @role@ attributes describe the section of a document (i.e landmarks) and the types of interactive elements (i.e. widgets) to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use ARIA landmark roles to describe the sections of a web page',
              'Use ARIA widget roles to describe interactive elements on a web page'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Landmark Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
        WIDGET_4: {
            ID:                    'Widget Rule 4',
            DEFINITION:            'ARIA property and state values %s be valid types',
            SUMMARY:               'ARIA values %s be valid',
            TARGET_RESOURCES_DESC: 'Elements with aria attributes',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'ARIA attribute has a value that is a valid type',
              ALL_PASS_PLURAL:              'All %N_P ARIA attributes have values that are valid types',
              SOME_FAIL:                    '%N_F out of %N_T with ARIA attributes have values that are valid types',
              CORRECTIVE_ACTION_SINGULAR:   'change ARIA attribute to a vaild type',
              CORRECTIVE_ACTION_PLURAL:     'change all %N_F ARIA attributes to a vaild types',
              ALL_FAIL_SINGULAR:            'ARIA attribute does NOT have a value that is a valid type',
              ALL_FAIL_PLURAL:              'All %N_F ARIA attribute do NOT have a value that is a valid type',
              NOT_APPLICABLE:               'No ARIA attributes on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'The @%1@ attribute with the value "@%2@" is a valid token',
              PASS_2:                'The @%1@ attribute with the value "@%2@" is a valid "%3" type',
              CORRECTIVE_ACTION_1:   'The @%1@ attribute with the value "@%2@" must change to one of the following values: %3',
              CORRECTIVE_ACTION_2:   'The @%1@ attribute with the value "@%2@" must change to one or more of the following values: %3',
              CORRECTIVE_ACTION_3:   'The @%1@ attribute with the value "@%2@" must change to a value with type of "%3"',
              HIDDEN:                '%1 attribute with the value "@%2@" is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA attributes must be a vaild type to accurately describe web content to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use valid values for ARIA attributes',
              'Check W3C WAI Accessible Rich Internet Applications specifications for allowed values for ARIA attributes'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Supported Property and States', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
      },
      WIDGET_5: {
            ID:                    'Widget Rule 5',
            DEFINITION:            'ARIA property or state %s be defined',
            SUMMARY:               'ARIA attribute %s be defined',
            TARGET_RESOURCES_DESC: 'Elements with aria attributes',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'ARIA attribute is defined property or state in the ARIA specification',
              ALL_PASS_PLURAL:              'All %N_P ARIA attributes are defined defined properties or states in the ARIA specification',
              SOME_FAIL:                    '%N_F out of %N_T with ARIA attributes are NOT defined defined properties or states in the ARIA specification',
              CORRECTIVE_ACTION_SINGULAR:   'change ARIA attribute to a defined property or state',
              CORRECTIVE_ACTION_PLURAL:     'change all %N_F ARIA attributes to a defined properties or states',
              ALL_FAIL_SINGULAR:            'ARIA attribute is NOT a defined property or state in the ARIA specification',
              ALL_FAIL_PLURAL:              'All %N_F ARIA attribute do NOT have a value that is a valid type in the ARIA specification',
              NOT_APPLICABLE:               'No undefined ARIA attributes on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'The @%1@ attribute is a defined ARIA property or state',
              CORRECTIVE_ACTION_1:   'The @%1@ attribute must be changed to a defined ARIA property or state',
              HIDDEN:                '%1 attribute with the value "@%2@" is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA attributes must be defined properties or states to accurately describe web content to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use defined ARIA properties and states in the ARIA specfication',
              'Check W3C WAI Accessible Rich Internet Applications specifications for allowed values for ARIA attributes'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Supported Property and States', 
                url:   'http://www.w3.org/TR/wai-aria/states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
      },
      WIDGET_6: {
            ID:                    'Widget Rule 6',
            DEFINITION:            'Widgets %s define required properties and states',
            SUMMARY:               'Widgets %s have properties',
            TARGET_RESOURCES_DESC: 'Widgets with required properties and states',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Widget has required properties and states',
              ALL_PASS_PLURAL:              'All %N_P have required properties and states',
              SOME_FAIL:                    '%N_F out of %N_T widgets do NOT have required properties and states',
              CORRECTIVE_ACTION_SINGULAR:   'add required properties and states to widget',
              CORRECTIVE_ACTION_PLURAL:     'add required properties and states to the %N_F widgets',
              ALL_FAIL_SINGULAR:            'Widget does NOT have required properties and states',
              ALL_FAIL_PLURAL:              'All %N_F widget do NOT have required properties and states',
              NOT_APPLICABLE:               'No widgets with required properties and states on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ widget has the following required ARIA properties and states: %2',
              CORRECTIVE_ACTION_1:   'Add one or more of the required ARIA properties and states (i.e. "%2") to the @%1@ widget',
              HIDDEN:                '%1 widget is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use required ARIA properties to describe the features and options of a widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
      WIDGET_7: {
            ID:                    'Widget Rule 7',
            DEFINITION:            'Widgets %s have required child roles',
            SUMMARY:               'Widgets %s have child roles',
            TARGET_RESOURCES_DESC: 'Widgets with required owned elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Widget has required child roles',
              ALL_PASS_PLURAL:              'All %N_P have required required child roles',
              SOME_FAIL:                    '%N_F out of %N_T widgets do NOT have required child roles',
              CORRECTIVE_ACTION_SINGULAR:   'add required child roles to child elements in the widget',
              CORRECTIVE_ACTION_PLURAL:     'add required child roles to child elements in the %N_F widgets',
              ALL_FAIL_SINGULAR:            'Widget does NOT have required child roles',
              ALL_FAIL_PLURAL:              'All %N_F widgets do NOT have required child roles',
              NOT_APPLICABLE:               'No widgets with required child ARIA elements on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@%1@ widget has at least one required owned elements: %2',
              CORRECTIVE_ACTION_1:   '@%1@ widget is MISSING one or more of following required owned elements: %2',
              HIDDEN:                '%1 widget is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use required ARIA owned elements to describe the features and options of a widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
     WIDGET_8: {
            ID:                    'Widget Rule 8',
            DEFINITION:            'Widgets %s have required parent role',
            SUMMARY:               'Widgets %s have parent',
            TARGET_RESOURCES_DESC: 'Widgets with required parent role',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Widget has required parent role',
              ALL_PASS_PLURAL:              'All %N_P have required required parent role',
              SOME_FAIL:                    '%N_F out of %N_T widgets do NOT have required role',
              CORRECTIVE_ACTION_SINGULAR:   'add required parent role to the widget',
              CORRECTIVE_ACTION_PLURAL:     'add required parent to the %N_F widgets',
              ALL_FAIL_SINGULAR:            'Widget does NOT have required parent role',
              ALL_FAIL_PLURAL:              'All %N_F widgets do NOT have required parent role',
              NOT_APPLICABLE:               'No widgets with required parent role on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget is a child of the a @%2@ role',
              CORRECTIVE_ACTION_1:  'Create a parent widget with the role of @%1@ for this @%2@ widget',
              CORRECTIVE_ACTION_2:   'Create a parent widget with the one of the required roles (i.e. @%1@) for this @%2@ widget',
              HIDDEN:                '%1 widget is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use required parent roles to describe the features and options of a widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'Accessible jQuery-ui Components Demonstration', 
                url:   'http://access.aol.com/aegis/#goto_slider'
              }                            
            ]
        },
     WIDGET_9: {
            ID:                    'Widget Rule 9',
            DEFINITION:            'Widgets %s be owned by only one parent widget',
            SUMMARY:               'Only one owner',
            TARGET_RESOURCES_DESC: 'Widgets with required parent roles',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Child widget is only referenced once by parent widget with aria-owns',
              ALL_PASS_PLURAL:              'All %N_P child widget are only referenced once by parent widgets with aria-owns',
              SOME_FAIL:                    '%N_F out of %N_T child widgets are referenced MORE than once by parent widgets with aria-owns',
              CORRECTIVE_ACTION_SINGULAR:   'update parent widget with aria-owns to make sure it not references a child widget only once',
              CORRECTIVE_ACTION_PLURAL:     'update %N_F parent widgets with aria-owns to make sure they reference a child widget only once',
              ALL_FAIL_SINGULAR:            'Child widget is referenced MORE that once by parent widgets with aria-owns',
              ALL_FAIL_PLURAL:              'All %N_F child widgets are referenced MORE that once by parent widgets with aria-owns',
              NOT_APPLICABLE:               'No parent widgets using aria-owns on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ child widget is referenced only by @%2@ parent widget with aria-owns',
              CORRECTIVE_ACTION_1:  'Update references of @%1@ parent widgets with aria-owns to reference @%2@ child widget only once',
              HIDDEN:               '%1 parent widget with aria-owns is hidden from assistive technologies and not visible on screen'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Parent widget roles with aira-owns must accurately decribe the parent relationships, a child widget can only have one parent widget'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        },
     WIDGET_10: {
            ID:                    'Widget Rule 10',
            DEFINITION:            'Range widget %s have value between minimum and maximum values',
            SUMMARY:               'Value in range',
            TARGET_RESOURCES_DESC: 'Range widgets ',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'The value of the @aria-valuenow@ attribute is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes',
              ALL_PASS_PLURAL:              'All %N_P values of the @aria-valuenow@ attributes are in their ranges defined by the widget\'s @aria-valuemin@ and @aria-valuemax@ attributes',
              SOME_FAIL:                    '%N_F out of %N_T values of the @aria-valuenow@ attributes are NOT in their ranges defined by the widget\'s @aria-valuemin@ and @aria-valuemax@ attributes',
              CORRECTIVE_ACTION_SINGULAR:   'update range attributes of the widget so the @aria-valuenow@ attribute is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes',
              CORRECTIVE_ACTION_PLURAL:     'update range attributes of the %N_F widgets so the @aria-valuenow@ attribute of each widget is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes',
              ALL_FAIL_SINGULAR:            'The value with the @aria-valuenow@ attribute is NOT in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes',
              ALL_FAIL_PLURAL:              'All %N_F values of range widgets with the @aria-valuenow@ attribute are NOT in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes',
              NOT_APPLICABLE:               'No range widgets on the page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget is using @aria-valuetext@ attribute which overrides the @aria-valuenow@ attribute for describing the value of the range',
              PASS_2:               '@%1@ widget value of %2 is in the range %3 and %4',
              PASS_3:               '@%1@ widget has the range %3 and %4, and by not including the @aria-valuenow@ attribute the value of the progressbar is considered indeterminate',
              CORRECTIVE_ACTION_1:  'Update the numeric values of @aria-valuenow@ (%1), @aria-valuemin@ (%2) and @aria-valuemax@ (%3) so the @aria-valuenow@ value is in range',
              CORRECTIVE_ACTION_2:  'Update the numeric values of @aria-valuemin@ (%1) and @aria-valuemax@ (%2) so the @aria-valuemin@ value is less than the @aria-valuemax@ value',
              CORRECTIVE_ACTION_3:  'For progresss bar update the numeric values or add @aria-valuemin@ (%2) and @aria-valuemax@ (%3) attributes and when state of progress is known use the @aria-valuenow@ attribute value to communicate the current state of progress',
              CORRECTIVE_ACTION_4:  'Update or create @%1@ attribute to be a numeric value',
              CORRECTIVE_ACTION_5:  'Update or create @%1@ attributes to be a numeric values',
              HIDDEN:               '%1 range widget is hidden from assistive technologies'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use the @aria-valuenow@, @aria-valuemin@ and @aria-valuemax@ are accurately defined'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        },
     WIDGET_11: {
            ID:                    'Widget Rule 11',
            DEFINITION:            'Elements with mouse move events %s have widget roles',
            SUMMARY:               'Mouse move events have roles',
            TARGET_RESOURCES_DESC: 'Elements with mouse events',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element with @onmousedown@, @onmousemove@ and/or @onmouseup@ with a child element with a widget role or is an interactive element accurately describes the user options and actions',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements with @onmousedown@, @onmousemove@ and/or @onmouseup@ with a child element with a widget role or is an interactive element accurately describes the user options and actions',
              ALL_PASS_SINGULAR:            'Element with @onmousedown@, @onmousemove@ and/or @onmouseup@ has a role attribute or is an interactive element',
              ALL_PASS_PLURAL:              'All %N_P element with @onmousedown@, @onmousemove@ and/or @onmouseup@ have a role attribute or are an interactive elements',
              SOME_FAIL:                    '%N_F out of %N_T elements with @onmousedown@, @onmousemove@ and/or @onmouseup@ do NOT have a role attribute or are an interactive elements',
              CORRECTIVE_ACTION_SINGULAR:   'add ARIA roles and attributes to the element or child elements that accurately describe the user options and actions available',
              CORRECTIVE_ACTION_PLURAL:     'add ARIA roles and attributes to the %N_F elements or their child elements that accurately describe the user options and actions available',
              ALL_FAIL_SINGULAR:            'Element with @onmousedown@, @onmousemove@ and/or @onmouseup@ does not have a widget role (or any children that have widget roles) and is not part of an interactive element (or has any children that are interactive elements)',
              ALL_FAIL_PLURAL:              'All %N_F Element with @onmousedown@, @onmousemove@ and/or @onmouseup@ does not have a widget role (or any children that have widget roles) and is not part of an interactive element (or has any children that are interactive elements)',
              NOT_APPLICABLE:               'No elements with  @onmousedown@, @onmousemove@ and/or @onmouseup@ events found on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget has the following mouse events: %2',
              PASS_2:               '@%1@ interactive element has the following mouse events: %2',
              MANUAL_CHECK_1:       'Verify the interactive elements and/or widgets accurately describes the user options and actions of the children of the @%1@ element with the following mouse events: %2',
              CORRECTIVE_ACTION_1:  'Add widget role(s) to the element and/or its children that accurately describe the user options and actions of the @%1@ element with the following mouse events: %2',
              HIDDEN:               '%1 element is hidden from assistive technologies with following mouse events: %2'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use the @role@ attrbute to describe the type of widget associated with the mouse events',
              'Use ARIA properties and states attributes to describe features of each widget '
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        },
     WIDGET_12: {
            ID:                    'Widget Rule 12',
            DEFINITION:            'Elements with mouse hover events %s have widget roles',
            SUMMARY:               'Mouse hover events have roles',
            TARGET_RESOURCES_DESC: 'Elements with mouse events',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:       'Verify the element with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ with a child element with a widget role or is an interactive element accurately describes the user options and actions',
              MANUAL_CHECKS_PLURAL:         'Verify if any of the %N_MC elements with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ with a child element with a widget role or is an interactive element accurately describes the user options and actions',
              ALL_PASS_SINGULAR:            'Element with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ has a role attribute or is an interactive element',
              ALL_PASS_PLURAL:              'All %N_P element with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ have a role attribute or are an interactive elements',
              SOME_FAIL:                    '%N_F out of %N_T elements with@onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ do NOT have a role attribute or are an interactive elements',
              CORRECTIVE_ACTION_SINGULAR:   'add ARIA roles and attributes to the element or child elements that accurately describe the user options and actions available',
              CORRECTIVE_ACTION_PLURAL:     'add ARIA roles and attributes to the %N_F elements or their child elements that accurately describe the user options and actions available',
              ALL_FAIL_SINGULAR:            'Element with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ does not have a widget role (or any children that have widget roles) and is not part of an interactive element (or has any children that are interactive elements)',
              ALL_FAIL_PLURAL:              'All %N_F Element with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ does not have a widget role (or any children that have widget roles) and is not part of an interactive element (or has any children that are interactive elements)',
              NOT_APPLICABLE:               'No elements with @onmouseover@, @onmouseout@, @onmousenter@ and/or @onmouseleave@ events found on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:               '@%1@ widget has the following mouse events: %2',
              PASS_2:               '@%1@ interactive element has the following mouse events: %2',
              MANUAL_CHECK_1:       'Verify the interactive elements and/or widgets accurately describes the user options and actions of the children of the @%1@ element with the following mouse events: %2',
              CORRECTIVE_ACTION_1:  'Add widget role(s) to the element and/or its children that accurately describe the user options and actions of the @%1@ element with the following mouse events: %2',
              HIDDEN:               '%1 element is hidden from assistive technologies with following mouse events: %2'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users'                   
            ],
            TECHNIQUES: [
              'Use the @role@ attrbute to describe the type of widget associated with the mouse events',
              'Use ARIA properties and states attributes to describe features of each widget '
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION, 
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0 Specification: Widget Roles', 
                url:   'http://www.w3.org/TR/wai-aria/roles#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE, 
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes', 
                url:   'http://www.w3.org/TR/2012/NOTE-WCAG20-TECHS-20120103/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                title: 'OAA Web Accessibility ARIA Examples', 
                url:   'http://oaa-accessibility.org/examples/'
              }                            
            ]
        }
   }     
});
