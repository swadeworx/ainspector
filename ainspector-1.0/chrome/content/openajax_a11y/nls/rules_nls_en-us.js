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

    rule_catories: {
           '1': 'Abbrevitations',
           '2': 'Audio',  
           '4': 'Color',
           '8': 'Form Controls',
          '16': 'Embedded Objects',
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
            DEFINITION:            '@title@ attribute %s not be used to label form controls',
            SUMMARY:               '@title@ %s not be label',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Form control does not use @title@ attribute as label',
              ALL_PASS_PLURAL:              'All %N_P form controls do not use @title@ attribute as label',
              SOME_FAIL:                    '%N_F out of %N_T form controls use @title@ attribute as label',
              CORRECTIVE_ACTION_SINGULAR:   'update form control to use another form labeling technique',
              CORRECTIVE_ACTION_PLURAL:     'update %N_F form controls to use another form labeling technique',
              ALL_FAIL_SINGULAR:            'form control uses @title@ attribute as label',
              ALL_FAIL_PLURAL:              'All %N_F form controls use @title@ attribute as a label',
              NOT_APPLICABLE:               'No form controls on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@title@ is not used as label',
              CORRECTIVE_ACTION_1:   'Use @label@ element or ARIA technique to label %1 form control',
              HIDDEN:                '%1 control is hidden from asssistive technologies.'
            },  
            PURPOSE: [
              '@title@ attribute is defined in HTML specifications as a way to label form controls'                   
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
            DEFINITION:            'If there is more than one form on a page, input element of type submit and reset %s have unique labels using the value attribute',
            SUMMARY:               'Labels %s be unique',
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
              NOT_APPLICABLE:             'No @h1@ elements in this page'
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
              MANUAL_CHECKS_SINGULAR:   'Verify the heading element describes the content following the heading element',
              MANUAL_CHECKS_PLURAL:     'Verify the %N_MC heading elements describes the content following each heading element',
              NOT_APPLICABLE:           'No heading elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        'Check %1 element to make sure it describes the section it labels',
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
        IMAGE_1: {
            ID:                    'Image Rule 1',
            DEFINITION:            'Each image %s have an alt attribute',
            SUMMARY:               'Image %s have alt',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          '@img@ or @area@ element has an @alt@ attribute',
              ALL_PASS_PLURAL:            'All %N_P @img@ or @area@ elements have an @alt@ attribute',
              SOME_FAIL:                  '%N_F out of %N_T @img@ or @area@ elements do NOT have an @alt@ attribute',
              CORRECTIVE_ACTION_SINGULAR: 'add @alt@ attribute to @img@ or @area@ element that describes the pupose of the image',
              CORRECTIVE_ACTION_PLURAL:   'add @alt@ attribute to each of the %N_F @img@ or @area@ elements that describes the pupose of each image',
              ALL_FAIL_SINGULAR:          '@img@ or @area@ element does NOT have an @alt@ attribute',
              ALL_FAIL_PLURAL:            'All %N_F @img@ or @area@ elements do NOT have an @alt@ attribute',
              NOT_APPLICABLE:             'No @img@ or @area@ elements on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Image has @alt@ attribute',
              CORRECTIVE_ACTION_1:   'Add a @alt@ attribute to the @%1@ element',
              PRESENTATION:          '@%1@ element is hidden from assistive technologies using the ARIA technique @role="presentation"@',
              HIDDEN:                '@%1@ element is hidden from assistive technologies using CSS'
            },  
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
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
            DEFINITION:            'The file name of the image %s not be part of the alt text content',
            SUMMARY:               'Don\'t use filename',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          '@img@ or @area@ element does not include the image file name as part of @alt@ attribute content',
              ALL_PASS_PLURAL:            'All %N_P @img@ or @area@ elements do not include image file name as part of @alt@ attribute content',
              SOME_FAIL:                  '%N_F out of %N_T @img@ or @area@ elements DO include image file name as part of @alt@ attribute content',
              CORRECTIVE_ACTION_SINGULAR: 'update the @alt@ attribute of the image to not use the image file name, but still describe the content or purpose of the image',
              CORRECTIVE_ACTION_PLURAL:   'update the @alt@ attribute of the %N_F images to not use the image file name, but still describe the content or purpose of the image',
              ALL_FAIL_SINGULAR:          '@img@ or @area@ element DOES include the image file name as part of @alt@ attribute content',
              ALL_FAIL_PLURAL:            'All %N_F @img@ or @area@ element DO include the image file name as part of @alt@ attribute content',
              NOT_APPLICABLE:             'No @img@ elements with a @longdesc@ attribute on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@alt@ attribute does not contain the filename',
              CORRECTIVE_ACTION_1:   'Change @alt@ attribute to describe the purpose and/or content of the image',
              PRESENTATION:          '@%1@ control is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
              HIDDEN:                '@%1@ control is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image and the file name is not useful information',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
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
            DEFINITION:            'The length of the @alt@ attribute content %s less than 100 characters',
            SUMMARY:               '@alt@ less than 100 characters',
            TARGET_RESOURCES_DESC: '@img@ and @area@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          '@img@ or @area@ element has @alt@ attribute text content less than 100 characters',
              ALL_PASS_PLURAL:            'All %N_P @img@ or @area@ elements have @alt@ attribute text content less than 100 characters',
              SOME_FAIL:                  '%N_F out of %N_T @img@ or @area@ elements do NOT have @alt@ attribute text content less than 100 characters',
              CORRECTIVE_ACTION_SINGULAR: 'update the @alt@ attribute text content of the image to be less than 100 characters, but still describe the content or purpose of the image',
              CORRECTIVE_ACTION_PLURAL:   'update the @alt@ attribute text content of the %N_F images to be less than 100 characters, but still describe the content or purpose of each image',
              ALL_FAIL_SINGULAR:          '@img@ or @area@ element does NOT have @alt@ attribute text content less than 100 characters',
              ALL_FAIL_PLURAL:            'All %N_F @img@ or @area@ elements do NOT have @alt@ attribute text content less than 100 characters',
              NOT_APPLICABLE:             'No @img@ or @area@ elements on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '@alt@ attribute is less than 100 characters',
              CORRECTIVE_ACTION_1:   'Change @alt@ attribute content to less than 100 characters',
              PRESENTATION:          '@%1@ control is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
              HIDDEN:                '@%1@ control is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Alt text provides a description of the image for people who cannot see the image and the file name is not useful information',                   
              'Alt text that is an empty string is ignored by assistive technologies and indicates an image is being used for styling rather than meaningful content'                   
            ],
            TECHNIQUES: [
              '@alt@ text content should describe the content and/or the purpose of them image as succinctly as possible (less than ~100 characters)',
              'If an image is purely stylistic or decorative set the @alt@ text conent should be the empty string (i.e. @alt=""@)'
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
            DEFINITION:            'If an image has a height or width of 1 pixel or its alt text set to empty, the image %s set its role attribute to "presentation" or the image %s be removed and CSS %s should be used for positioning.',
            SUMMARY:               '@alt=""@ for small images',
            TARGET_RESOURCES_DESC: '@img@',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:          'Small or decorative @img@ or @area@ element has a @role@ attribute set to a value of @presentation@',
              ALL_PASS_PLURAL:            'All %N_P small and decorative @img@ or @area@ elements have a @role@ attribute set to a value of @presentation@',
              SOME_FAIL:                  '%N_F out of %N_T small and decorative @img@ or @area@ elements do NOT have a @role@ attribute set to a value of @presentation@',
              CORRECTIVE_ACTION_SINGULAR: 'add a @role@ attribute with a value of @presentation@ and remove the @alt@ attribute',
              CORRECTIVE_ACTION_PLURAL:   'add a @role@ attribute with a value of @presentation@ to the %N_F image and remove the @alt@ attribute',
              ALL_FAIL_SINGULAR:          'Small or decorative @img@ or @area@ element does NOT have a @role@ attribute set to a value of @presentation@',
              ALL_FAIL_PLURAL:            'All %N_F small or decorative @img@ or @area@ elements do NOT have a @role@ attribute set to a value of @presentation@',
              NOT_APPLICABLE:             'No @img@ with @alt@ attribute set to empty or with a height or width of 1 pixel on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                'Image is not a small image',
              CORRECTIVE_ACTION_1:   'Change @alt@ attribute content to empty string',
              PRESENTATION:          '@%1@ element is hidden from asssistive technologies using the ARIA technique @role="presentation"@',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies using CSS'
            },  
            PURPOSE: [
              'Images that are 1 pixel high or 1 pixel wide are stylistic images and the @alt@ attribute should be set to the empty string'                   
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
            DEFINITION:            'If @alt=""@ or @role="presentation"@ the image %s be used just for styling or decoration',
            SUMMARY:               '@alt=""@ or @role="presentation"@ %s be decorative',
            TARGET_RESOURCES_DESC: '@img@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECKS_SINGULAR:     'Verify @img@ element with @alt=""@ or @role="presentation"@ is purely decorative',
              MANUAL_CHECKS_PLURAL:       'Verify %N_MC @img@ elements with @alt=""@ or @role="presentation"@ are purely decorative',
              NOT_APPLICABLE:             'No @img@ elements with @alt=""@ or @role="presentation"@ on this page'                                          
            },
            NODE_RESULT_MESSAGES: {
              MANUAL_CHECK_1:        'Verify the image is only used for styling or decoration',
              HIDDEN:                '@%1@ element is hidden from asssistive technologies using CSS'
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
        LAYOUT_1: {
            ID:                       'LAYOUT 1',
            TITLE:                    'Tables used for layout that are more than one column wide, %s not be nested in other layout tables.',
            PURPOSE:                  'The nesting of layout tables often results in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS_NOT_NESTED:  'Layout table is not nested in another table',
            MESSAGE_PASS_ONE_COLUMN:  'Layout table is only one column wide',
            MESSAGE_VIOLATION:        'Layout table is %1 columns wide, and nested %2 level(s), nested data tables must only be one column wide.',
            MESSAGE_RECOMMENDATION:   'Layout table is %1 columns wide, and nested %2 level(s), nested data tables should only be one column wide.',
            MESSAGE_MANUAL:           'Layout table is %1 columns wide, and nested %2 level(s), nested data tables may need to only be one column wide.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_2: {
            ID:                       'LAYOUT 2',
            DEFINITION:               'If a table is a layout table that is more than 1 column wide, the content needs to be meaningful when table markup is ignored.',
            SUMMARY:                  'Layout content must make sense',
            PURPOSE:                  'The use of layout tables can result in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS_1:           'The layout table is only one column wide.',
            MESSAGE_VIOLATION:        'The page content must be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_RECOMMENDATION:   'The page content should be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_3: {
            ID:                 'LAYOUT 3',
            DEFINITION:         'If the table is a layout table, set role="presentation" on TABLE, TR and TD elements in the table',
            SUMMARY:            'Presentation role on layout tables',
            ACTION:             'Add role="presentation" attribute.',
            MESSAGE_HIDDEN:     'The table is hidden from people using assistive technologies, so the rule was not evaluated',
            TECHNIQUES:         ['Use the role="presentation" attribute on TABLE, TR and TD elements used in layout tables'],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                title: 'ARIA Presentation Role Value ', 
                url:   'http://www.w3.org/TR/wai-aria/roles#presentation'
              }
            ]
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
        WIDGET_1: {
            ID:                    'Widget Rule 1',
            DEFINITION:            'Widgets %s have an accessible name',
            SUMMARY:               'Widget %s have name',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              ALL_PASS_SINGULAR:            'Widget has an accessible name',
              ALL_PASS_PLURAL:              'All %N_P widgets have an accessible name',
              SOME_FAIL:                    '%N_F out of %N_T widgets do NOT have an accessible name',
              CORRECTIVE_ACTION_SINGULAR:   'add accessible name to widget',
              CORRECTIVE_ACTION_PLURAL:     'add accessible name to each of the %N_F widgets',
              ALL_FAIL_SINGULAR:            'Widget does NOT has an accessible name',
              ALL_FAIL_PLURAL:              'All %N_F widgets do NOT have an accessible name',
              NOT_APPLICABLE:               'No form controls on this page'              
            },
            NODE_RESULT_MESSAGES: {
              PASS_1:                '%1 widget has name',
              CORRECTIVE_ACTION_1:   'Add name to %1 widget',
              HIDDEN:                '%1 widget is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A name associated with a widget insures that information about the widget is spoken by screen readers when it receives focus'                   
            ],
            TECHNIQUES: [
              'In some cases the child text nodes and @alt@ from descendant image elements will be used as the name for a widget',
              'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page that describe the purpose of the widget',
              'Use @aria-label@ attribute to provide a explicit text description of the purpose of the widget'
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
              MANUAL_CHECK_1:        'The @%1@ element is a container element (i.e @body@, @frame@, @iframe@, ..) with a @onclick@ event, verify any child elements that can respond to the @onclick@ event are a link, form control or has a widget role, and can be accessd with the keyboard alone',
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
        }
   }
});
