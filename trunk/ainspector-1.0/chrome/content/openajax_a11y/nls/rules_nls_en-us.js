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
/* OpenAjax Alliance Rules National Language Support (NLS): English */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.all_rules.addRulesNLSFromJSON('en-us', {

    rule_scope: ['unkown', 'Element', 'Page', 'Website'],
    
    message_severities: {
      MUST : 'must', 
      SHOULD: 'should'
    },
    
    missing_message : "The following message id is not defined: ",

    rule_catories: {
      '1': 'abbrevitations',
      '2': 'audio',  
      '4': 'color',
      '8': 'form controls',
      '16': 'headings',
      '32': 'images',
      '64': 'landmarks',
      '128': 'language',
      '256': 'links',
      '512': 'lists',
      '1024': 'tables',
      '2048': 'video',
      '4096': 'widgets',
      '8096': 'content'
    },

    DEFAULT_RULE_RESULT_MESSAGES: {
      ELEM_SINGULAR:       'element',   
      ELEM_PLURAL:         'elements',   
      ALL_MANUAL_CHECKS:           '%N_MC %ELEM_MC require manual checking',
      ALL_PASS:                     '%N_P %ELEM_P passed',
      ALL_PASS_WITH_MANUAL_CHECKS:  '%N_P %ELEM_P passed and %N_MC %ELEM_MC require manual checking',
      SOME_FAIL:                    '%N_P out of %N_T %ELEM_T failed',
      SOME_FAIL_WITH_MANUAL_CHECKS: '%N_F out of %N_T %ELEM_T failed and %N_MC %ELEM_MC require manual checking',
      ALL_FAIL:                     '%N_F %ELEM_F failed',
      ALL_FAIL_WITH_MANUAL_CHECKS:  '%N_F %ELEM_F failed and %N_MC %ELEM_MC require manual checking',
      NOT_APPLICABLE:               'No applicable elements'
    },
    
    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules: {
        COLOR_1: {
            ID:                    'COLOR 1',
            DEFINITION:            'Text content %s exceed Color Contrast Ratio (CCR) of 4.5 for any size text or 3.1 for large and/or bolded text',
            SUMMARY:               'Text %s exceed CCR of 4.5',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:                'text element',   
              ELEM_PLURAL:                  'text elements',   
              ALL_MANUAL_CHECKS:            '%N_MC %ELEM_MC require a manual check for CCR > 4.5',
              ALL_PASS:                     '%N_P %ELEM_P pass with a CCR > 4.5',
              ALL_PASS_WITH_MANUAL_CHECKS:  '%N_P %ELEM_P pass and %N_MC %ELEM_MC require a manual check for CCR > 4.5',
              SOME_FAIL:                    '%N_F out of %N_T %ELEM_T failed to have a CCR > 4.5',
              SOME_FAIL_WITH_MANUAL_CHECKS: '%N_F out of %N_T %ELEM_T failed and %N_MC %ELEM_MC require a manual check for CCR > 4.5',
              ALL_FAIL:                     '%N_F out of %N_T %ELEM_T failed to have a CCR > 4.5',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '%N_F out of %N_T %ELEM_T failed and %N_MC %ELEM_MC require a manual check for CCR > 4.5',
              NOT_APPLICABLE:               'No text elements on page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                'CCR exceeds 4.5',
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
            ID:                    'COLOR 2',
            DEFINITION:            'Text content %s exceed Color Contrast Ratio (CCR) of 7.0 for any size text or 4.5 for large and/or bolded text',
            SUMMARY:               'Text %s exceed CCR of 7.0',
            TARGET_RESOURCES_DESC: 'All elements with text content',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:                'text element',   
              ELEM_PLURAL:                  'text elements',   
              ALL_MANUAL_CHECKS:            '%N_MC %ELEM_MC require a manual check for CCR > 7.0',
              ALL_PASS:                     '%N_P %ELEM_P pass with a CCR > 7.0',
              ALL_PASS_WITH_MANUAL_CHECKS:  '%N_P %ELEM_P pass and %N_MC %ELEM_MC require a manual check for CCR > 7.0',
              SOME_FAIL:                    '%N_F out of %N_T %ELEM_T failed to have a CCR > 7.0',
              SOME_FAIL_WITH_MANUAL_CHECKS: '%N_F out of %N_T %ELEM_T failed and %N_MC %ELEM_MC require a manual check for CCR > 7.0',
              ALL_FAIL:                     '%N_F out of %N_T %ELEM_T failed to have a CCR > 7.0',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '%N_F out of %N_T %ELEM_T failed and %N_MC %ELEM_MC require a manual check for CCR > 7.0',
              NOT_APPLICABLE:               'No text elements on page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                'CCR exceeds 7.0',
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
            ID:                    'Control Rule 1',
            DEFINITION:            '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@ %s have an accessible label',
            SUMMARY:               'Controls %s have labels',
            TARGET_RESOURCES_DESC: 'User interface form controls',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'form control',   
              ELEM_PLURAL:    'form controls',   
              ALL_PASS:       '%N_P %ELEM_P have labels',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have labels, add labels to %N_F %ELEM_F missing a label',
              ALL_FAIL:       'No form controls have labels, add labels to %N_F %ELEM_F missing a label',
              NOT_APPLICABLE: 'No form control elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '%1 control has label',
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
            ID:                    'Control Rule 2',
            DEFINITION:            'Every @input@ type @image@ %s have an @alt@ or @title@ attribute with content',
            SUMMARY:               'Image button %s have alt content',
            TARGET_RESOURCES_DESC: 'input elements of type image',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@input[type="image"]@ form control',   
              ELEM_PLURAL:    '@input[type="image"]@ form controls',   
              ALL_PASS:       '%N_P @input[type="image"]@ %ELE_P have alt attribute with content',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have alt text or content, add descriptive alt attribute to %N_F %ELEM_F',
              ALL_FAIL:       'No @input[type="image"]@ form controls have alt text or content, add descriptive alt attribute to %N_F %ELEM_F',
              NOT_APPLICABLE: 'No @input[type="image"]@ form controls on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Image button has label',
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
            ID:                    'Control Rule 3',
            DEFINITION:            'Every input type radio %s be contained in a @fieldset@ and @legend@ elements to provide grouping information for radio button groups',
            SUMMARY:               'Radio button %s use FIELDSET/LEGEND',
            TARGET_RESOURCES_DESC: 'input elements of type radio',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@input[type="radio"]@ form control',   
              ELEM_PLURAL:    '@input[type="radio"]@ form controls',   
              ALL_PASS:       '%N_P %ELE_P are contained in a @fieldset/legend@ labeling elements',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T are NOT contained in a @fieldset/legend@ labeling elements, add @fieldset/legend@ labeling elements to %N_F %ELEM_F',
              ALL_FAIL:       'No @input[type="radio"]@ form controls are contained in a @fieldset/legend@ labeling elements, add @fieldset/legend@ labeling elements to %N_F %ELEM_F',
              NOT_APPLICABLE: 'No @input[type="radio"]@ form controls on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Radio button uses @fieldset@ and @legend@ elements, and the @legend@ element has text content',
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
            ID:                    'Control Rule 4',
            DEFINITION:            '@button@ elements %s have text content',
            SUMMARY:               '@button@s %s have content',
            TARGET_RESOURCES_DESC: '@button@ elements',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@button@ element',   
              ELEM_PLURAL:    '@button@ elements',   
              ALL_PASS:       '%N_P %ELE_P have text content',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have text content, add text content that describes the function of the button to the %N_F %ELEM_F',
              ALL_FAIL:       'No @button@ elements have text content, add text content that describes the function of the button to the %N_F %ELEM_F',
              NOT_APPLICABLE: 'No @button@ elements on this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@button@ element has text content',
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
            ID:                    'Control Rule 5',
            DEFINITION:            '@id@ attributes %s have unique values on the web page',
            SUMMARY:               '@id@ %s be unique',
            TARGET_RESOURCES_DESC: 'Form control elements with @id@ attributes',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'element',   
              ELEM_PLURAL:    'elements',   
              ALL_PASS:       '%N_P %ELEM_P have unique @id@ attribute values',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have unique @id@ attribute values, update the @id@ attribute values on the page to ensure that all elements have unique @id@ values',
              ALL_FAIL:       'No elements have unique @id@ attribute values, update the @id@ attribute values on the page to ensure that all %N_T %ELEM_T have unique @id@ values',
              NOT_APPLICABLE: 'No @id@ attributes on the elements in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '\'%1\' @id@ attribute value is unique',
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
            ID:                    'Control Rule 6',
            DEFINITION:            '@label@ element using the @for@ attribute %s reference a form control on the page',
            SUMMARY:               '@label@ %s reference control',
            TARGET_RESOURCES_DESC: '@label@ elements',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@label@ element',   
              ELEM_PLURAL:    '@label@ elements',   
              ALL_PASS:       '%N_P %ELEM_P use the @for@ attribute to reference form controls',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT use the @for@ attribute to reference form controls, update the @label@ elements to use the @for@ attribute reference method to label form controls',
              ALL_FAIL:       'None of the @label@ elements use the @for@ attribute to reference form controls on this page, update the %N_T %ELEM_T to use the @for@ attribute reference method to label form controls',
              NOT_APPLICABLE: 'No @label@ elements in this page'
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
            ID:                    'Control Rule 7',
            DEFINITION:            '@label@ element or legend element %s contain text content',
            SUMMARY:               '@label@ %s have content',
            TARGET_RESOURCES_DESC: '@label@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@label@ or @legend@ element',   
              ELEM_PLURAL:    '@label@ or @legend@ elements',   
              ALL_PASS:       '%N_P %ELEM_P have text content',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have text content, either add text content to the @label@ or @legend@ elements to help label a form control or if they are not used for labeling remove them from the page',
              ALL_FAIL:       'None of the @label@ or @legend@ elements have text content, update the %N_T %ELEM_T to either add text content to help label a form control or if they are not used for labeling remove them from the page',
              NOT_APPLICABLE: 'No @label@ or @legend@ elements in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@%1@ has text content',
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
            ID:                    'Control Rule 8',
            DEFINITION:            '@fieldset@ element %s contain exactly one legend element',
            SUMMARY:               '@fieldset@ %s have one legend',
            TARGET_RESOURCES_DESC: '@fieldset@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@fieldset@ element',   
              ELEM_PLURAL:    '@fieldset@ elements',   
              ALL_PASS:       '%N_P %ELEM_P have only one @legend@ element',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T have more than one @legend@ element or are missing a @legend@ element, update the %N_F %ELEM_F elements to include a single @legend@ element with text content that provides a grouping label for the form controls it contains',
              ALL_FAIL:       'None of the @filedset@ elements have only one @legend@ element, update the %N_F %ELEM_F elements to include a single @legend@ element with text content that provides a grouping label for the form controls it contains',
              NOT_APPLICABLE: 'No @fieldset@ elements in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@fieldset@ has one @legend@ element',
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
            ID:                    'Control Rule 9',
            DEFINITION:            '@title@ attribute %s not be used to label form controls',
            SUMMARY:               '@title@ %s not be label',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'form control',   
              ELEM_PLURAL:    'form controls',   
              ALL_PASS:       '%N_P %ELEM_P do not use the @title@ attribute for labeling',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T use the @title@ attribute for labeling the form control, change the labeling technique of %N_F %ELEM_F to use @label@ element or aria labeling technique',
              ALL_FAIL:       'All form controls on this page use the @title@ attribute for labeling the form controls, change the labeling technique of %N_F %ELEM_F to use @label@ element or aria labeling technique',
              NOT_APPLICABLE: 'No form controls in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@title@ is not used as label',
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
            ID:                    'Control Rule 10',
            DEFINITION:            'Labels %s be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be unique',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'form control',   
              ELEM_PLURAL:    'form controls',   
              ALL_PASS:       '%N_P %ELEM_P have unique labels',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have unique labels, change the labeling of %N_F %ELEM_F to uniquely identify the purpose of the form control on the page',
              ALL_FAIL:       'None of the form controls on this page have unique labels, change the labeling of %N_F %ELEM_F to uniquely identify the purpose of the form control on the page',
              NOT_APPLICABLE: 'No form controls in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Label is unique',
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
            ID:                    'CONTROL 11',
            DEFINITION:            'If there is more than one form on page, input element of type submit and reset %s have unique labels using the value attribute',
            SUMMARY:               'Labels %s be unique',
            TARGET_RESOURCES_DESC: '@submit@ and @reset@ buttons',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  '@submit@ or @reset@ button',   
              ELEM_PLURAL:    '@submit@ or @reset@ buttons',   
              ALL_PASS:       '%N_P %ELEM_P have unique labels',
              SOME_FAIL:      '%N_F out of %N_T %ELEM_T do NOT have unique labels, change the labeling of %N_F %ELEM_F to uniquely identify the purpose of the @submit@ and @reset@ control on the page',
              ALL_FAIL:       'None of the @submit@ or @reset@ buttons on this page have unique labels, change the labeling of %N_F %ELEM_F to uniquely identify the purpose of the @submit@ or @reset@ buttons on the page',
              NOT_APPLICABLE: 'No @submit@ or @reset@ buttons in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Label is unique',
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
            ID:                    'Control Rule 12',
            DEFINITION:            'Labels %s be must describe the purpose of every button, textarea, select and input element of type text, password, radio, and checkbox on a page',
            SUMMARY:               'Labels %s be descriptive',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@ and @file@',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'form control',   
              ELEM_PLURAL:    'form controls',   
              ALL_MANUAL_CHECKS:            '%N_MC %ELEM_MC require manual checks to verify they uniquely describe the purpose of each form control',
              SOME_FAIL_WITH_MANUAL_CHECKS: '%N_F out of %N_T %ELEM_T do NOT have labels, add labels to the %N_F %ELEM_F that uniquely describe their purpose; and %N_MC %ELEM_MC require manual checks to verify they uniquely describe the purpose of each form control',
              ALL_FAIL:                     '%N_F %ELEM_F do NOT have labels on this page, add labels to the %N_T %ELEM_T that uniquely describe their purpose',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '%N_F %ELEM_F do NOT have labels on this page, add labels to the %N_F %ELEM_F that uniquely describe their purpose; and %N_MC %ELEM_MC require manual checks to verify they uniquely describe the purpose of each form control',
              NOT_APPLICABLE:               'No @submit@ or @reset@ buttons in this page'
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
              ELEM_SINGULAR:  '@h1@ element',   
              ELEM_PLURAL:    '@h1@ elements',   
              ALL_PASS:       'Page contains %N_MC %ELEM_MC',
              ALL_FAIL:       'No @h1@ elements on the page, add a @h1@ element at the begining of the main content of the page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Page has @h1@ element',
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
              ELEM_SINGULAR:  '@h1@ element',   
              ELEM_PLURAL:    '@h1@ elements',   
              ALL_PASS:       '%N_P %ELEM_P are children of @main@ landmarks',
              SOME_FAIL:      '%N_F of %N_T %ELEM_T are NOT children of a @main@ landmark, either move the %N_F %ELEM_F to the begining of a @main@ landmark or change the @h1@ element to another heading level',
              ALL_FAIL:       'None of the @h1@ elements on the page are a child of @main@ landmarks, either move the %N_T %ELEM_T to the begining of a @main@ landmark or change the @h1@ element to another heading level',
              NOT_APPLICABLE: 'No @h1@ elements in this page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@h1@ is a child element of a @main@ landmark',
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
              ELEM_SINGULAR:  'heading element',   
              ELEM_PLURAL:    'heading elements',   
              ALL_PASS:       '%N_P sibling %ELEM_P text content is unique',
              SOME_FAIL:      '%N_F of %N_T sibling %ELEM_T text content is NOT unique, update the content of the %N_F sibling %ELEM_F to be unique',
              ALL_FAIL:       'None of the sibling heading elements on the page have unique text content, update the text content of the %N_T sibling %ELEM_T to be unique',
              NOT_APPLICABLE: 'No sibling headings on the page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '%1 heading content is unique among sibling headings',
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
              ELEM_SINGULAR:  'heading element',   
              ELEM_PLURAL:    'heading elements',   
              ALL_MANUAL_CHECKS:            '%N_MC %ELEM_MC require manual checks to verify they describe the content of following section in the page',
              NOT_APPLICABLE:               'No heading elements on his page in this page'
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
              ELEM_SINGULAR:  '@img@ or @area@ element',   
              ELEM_PLURAL:    '@img@ or @area@ elements',   
              ALL_PASS:       '%N_P %ELEM_P have an @alt@ attribute',
              SOME_FAIL:      '%N_F of %N_T %ELEM_T do NOT have an @alt@ attribute, add an @alt@ attribute with content that describes the content or purpose for each of the %N_F %ELEM_F',
              ALL_FAIL:       'None of the @img@ or @area@ elements have an @alt@ attribute, add an @alt@ attribute with content that describes the content or purpose for each of the %N_T %ELEM_T',
              NOT_APPLICABLE: 'No @img@ or @area@ elements on the page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Image has @alt@ attribute',
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
              ELEM_SINGULAR:  '@img@ element',   
              ELEM_PLURAL:    '@img@ elements',   
              ALL_MANUAL_CHECKS: '%N_MC %ELEM_MC with a @longdesc@ attribute require a manual check to verify the URI reference is valid',
              ALL_PASS:          'Each of the %N_P %ELEM_P with a @longdesc@ attribute have valid URI reference',
              SOME_FAIL:         '%N_F of %N_T %ELEM_T do NOT have an @alt@ attribute, add an @alt@ attribute with content that describes the content or purpose for each of the %N_F %ELEM_F',
              ALL_FAIL:          'None of the @img@ or @area@ elements have an @alt@ attribute, add an @alt@ attribute with content that describes the content or purpose for each of the %N_T %ELEM_T',
              NOT_APPLICABLE:    'No @img@ elements on the page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@longdesc@ attribute is a valid URI',
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
              ALL_MANUAL_CHECKS:           '',
              ALL_PASS:                     '',
              ALL_PASS_WITH_MANUAL_CHECKS:  '',
              SOME_FAIL:                    '',
              SOME_FAIL_WITH_MANUAL_CHECKS: '',
              ALL_FAIL:                     '',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '',
              NOT_APPLICABLE:                ''
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@alt@ attribute does not contain the filename',
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
              ALL_MANUAL_CHECKS:           '',
              ALL_PASS:                     '',
              ALL_PASS_WITH_MANUAL_CHECKS:  '',
              SOME_FAIL:                    '',
              SOME_FAIL_WITH_MANUAL_CHECKS: '',
              ALL_FAIL:                     '',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '',
              NOT_APPLICABLE:                ''
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@alt@ attribute is less than 100 characters',
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
              ALL_MANUAL_CHECKS:           '',
              ALL_PASS:                     '',
              ALL_PASS_WITH_MANUAL_CHECKS:  '',
              SOME_FAIL:                    '',
              SOME_FAIL_WITH_MANUAL_CHECKS: '',
              ALL_FAIL:                     '',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '',
              NOT_APPLICABLE:                ''
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Image is not a small image',
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
              ALL_MANUAL_CHECKS:           '',
              ALL_PASS:                     '',
              ALL_PASS_WITH_MANUAL_CHECKS:  '',
              SOME_FAIL:                    '',
              SOME_FAIL_WITH_MANUAL_CHECKS: '',
              ALL_FAIL:                     '',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '',
              NOT_APPLICABLE:                ''
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
              ALL_PASS:          'Page has @main@ landmark',
              ALL_FAIL:          'No @main@ landmark on the page, add a @main@ landmark that identifies the main (i.e. primary) content of the page'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  'Page contains an %1 element with @role=main@',
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
            DEFINITION:            'All rendered content %s be contained in a landmark',
            SUMMARY:               'Content %s be in landmark',
            TARGET_RESOURCES_DESC: 'all renderable content',
            RULE_RESULT_MESSAGES: {
              ELEM_SINGULAR:  'element',   
              ELEM_PLURAL:    'elements',   
              ALL_PASS:                     '%N_P %ELEM_P are in a landmark',
              ALL_PASS_WITH_MANUAL_CHECKS:  '%N_P %ELEM_P are in a landmark and there are %N_MC %ELEM_MC that may include renderable content; elements that include renderable content %RULE_TYPE be contained in a landmark',
              SOME_FAIL:                    '%N_F out of %N_T %ELEM_T are not in a landmark, update the landmark structure of the page and place %N_F %ELEM_F currently outside of landmarks into there proper landmark container',
              SOME_FAIL_WITH_MANUAL_CHECKS: '%N_F out of %N_T %ELEM_T are not in a landmark, update the landmark structure of the page and place %N_F %ELEM_F currently outside of landmarks into there proper landmark container',
              ALL_FAIL:                     'No landmarks on the page, create a landmark structure for your page and place %N_F %ELEM_F outside of landmarks into there proper landmark container',
              ALL_FAIL_WITH_MANUAL_CHECKS:  'No landmarks on the page, create a landmark structure for your page and place %N_F %ELEM_F outside of landmarks into there proper landmark container',
              NOT_APPLICABLE: 'No elements with content'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '@%1@ element is in @%2@ landmark',
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
            ID:               'LINK 1',
            TITLE:            'Link %s provide minimum target dimensions.',
            PURPOSE:          'Small links can be hard for people with physical disabilites to click on and for people with visual imapirments to see.',
            MESSAGE_PASS:     'The link dimensions of %1 pixels high and %2 pixels wide are larger than the minimum height of %3 pixels and width of %4 pixels.',
            MESSAGE_TO_SMALL: 'The link dimensions of %1 pixels high and %2 pixels wide do meet the minimum height of %3 pixels and width of %4 pixels requirements.',
            MESSAGE_MANUAL:   'The link dimensions could not be calculated.',
            MESSAGE_HIDDEN:   'The link is hidden from the graphical rendering.',
            MESSAGE_NA:       'The link has no HREF content, so it is either an internal target or may have behaviors defined by javascript.'
        },
        LINK_2: {
            ID:              'LINK 2',
            TITLE:           'Links with the same HREF %s have the same link text.',
            PURPOSE:         'Conistency of link naming makes interaction with web pages more predictable.',
            MESSAGE_PASS:    '%1 links with same URL and use the same link text.',
            MESSAGE_FAIL:    '%1 links with the same URL do not have the same link text.',
            MESSAGE_MANUAL:  'It could not be determined if the HREF of this link is shared by other links on the page',
            MESSAGE_NA:      'This link does not share the same URL with any other links on the page.'
        },

        LINK_3: {
            ID:              'LINK 3',
            TITLE:           'Links with different HREFs %s have unique accessible names.',
            PURPOSE:         'Links with the same name but go to different places can be confusing to people with disabilities.',
            MESSAGE_PASS:    '%1 links with the same accessible link name have the same HREF.',
            MESSAGE_FAIL:    '%1 links with the same accessible link name have different HREFs.',
            MESSAGE_MANUAL:  'It could not be determined if the accessible link name is shared with any other links on the page.',
            MESSAGE_NA:      'This link does not share the same accessible link name with any other links on the page or the link role has been overridden.'
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
            MESSAGE_PASS:   'Text based alternative is available for pre-recorded audio',
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
            ID:                      'TABLE 1',
            TITLE:                   'Data tables %s have header cells in the first row and/or column.',
            PURPOSE:                 'Header cells provide critical context for meaning of the content in data cells to people using speech, since they cannot see the visual relationships.',
            MESSAGE_PASS_ROW:        'The first row contains %1 header cells.',
            MESSAGE_PASS_COLUMN:     'The first column contains %1 header cells.',
            MESSAGE_PASS_BOTH:       'The first row contains %1 header cells and the first column contains %2 header cells.',
            MESSAGE_VIOLATION:       'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table must have all th elements or td elements with scope attribute in the first row and/or first column with content.',
            MESSAGE_RECOMMENDATION:  'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table should have all th elements or td elements with scope attribute  in the first row and/or first column with content.',
            MESSAGE_MANUAL:          'Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table may need th elements or td elements with scope attribute cells in the first row and/or first column with content.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, rule does not apply.'
        },
        TABLE_2T: {
            ID:                      'TABLE 2T',
            TITLE:                   'Each data table %s have a effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Data table has the caption element or a summary attribute of \'%1\'.',
            MESSAGE_FAIL:            'Data table is missing a caption element and summary attribute with text content, the page %s have either a caption element or a summary attribute with text content.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have a caption element.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2S: {
            ID:                      'TABLE 2S',
            TITLE:                   'If there is only one data table on a page, it %s have an effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table.',
            MESSAGE_PASS:            'Data table has the effective caption: \'%1\'.',
            MESSAGE_FAIL:            'The effective caption is missing or is empty, a data table %s have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have an effective caption.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2M: {
            ID:                      'TABLE 2M',
            TITLE:                   'If there is more than one data table, each data table %s have an effective caption with content.',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Table has an effective caption: \'%1\'',
            MESSAGE_FAIL:            'Since there is more than one data table, the table %s have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_ONLY_ONE:        'There is only one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_3: {
            ID:                       'TABLE 3',
            TITLE:                    'The effective caption content and effective summary content of each data table %s not be the same',
            PURPOSE:                  'It is important to provide an unique effective captions to more easily disern a table from other tables on the page.',
            MESSAGE_UNIQUE:           'The effective caption \'%1\' is unique from the effective summary "%2".',
            MESSAGE_NOT_UNIQUE:       'The effective caption \'%1\' is the same as the effective summary "%2", the effective caption should be used to describe the purpose of the table and the effective summary information about the data in the table or conclusions the author intended to be understood from viewing the data.',
            MESSAGE_HIDDEN:           'Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_MISSING:          'Either or both of the effective caption or effective summary are either not defined or are empty, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:   'Table is not a data table, rule does not apply.'
        },
        TABLE_4: {
            ID:                     'TABLE 4',
            TITLE:                  'Each data table header cell %s use th elements rather than td element with a scope attribute',
            PURPOSE:                'Using the TH element is a much clearer way of identifying header cells than using the TD element with the SCOPE attribute.',
            MESSAGE_IS_TH:          'Heading cell is a th element.',
            MESSAGE_VIOLATION:      'Heading cell is NOT a th element, all headings must use th element.',
            MESSAGE_RECOMMENDATION: 'Heading cell is NOT a th element, all headings should use th element.',
            MESSAGE_HIDDEN:         'Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE: 'Table is not a data table, rule does not apply.'
        },
        TABLE_5: {
            ID:                      'TABLE 5',
            TITLE:                   'Each data tables %s have an effective summary',
            PURPOSE:                 'It is important to provide a description of the content or point of the data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:            'Table has an effective caption: \'%1\'',
            MESSAGE_VIOLATION:       'The effective caption is missing or empty, the table must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:  'The effective caption is missing or empty, the table should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:          'The effective caption is missing or empty, the table may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MORE_THAN_ONE:   'There is more than one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_6: {
            ID:                                'TABLE 6',
            TITLE:                             'Each complex data table %s have ids on all header cells.',
            PURPOSE:                           'Complex data tables require much more specific definition of header cells for each data cell and using IDs on the header cells is required for identifying the header cells.',
            MESSAGE_PASS:                      'Table header cell has unique ID',
            MESSAGE_NO_CONTENT:                'Table header cell does not contain content, it is unsual for a header cell to not have content.',
            MESSAGE_NOT_UNIQUE_VIOLATION:      'Table header cell has duplicate ID: \'%1\', header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'Table header cell has duplicate ID: \'%1\', header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'Table header cell has duplicate ID: \'%1\', header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'Table header cell is missing an @id@ attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'Table header cell is missing an @id@ attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'Table header cell is missing an @id@ attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS:                'All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     '%1 header cells of %2 header cells in the table have missing or dulicate @id@ values.',
            MESSAGE_TABLE_DATA_TABLE:          'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:        'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:              'The table is hidden from people using assistive technologies.'
        },
        TABLE_7: {
            ID:                             'TABLE 7',
            TITLE:                          'Each td element in a complex data table with content, %s have a headers attribute with a list of valid ids',
            PURPOSE:                        'Complex data tables require much more specific definition of header cells for each data cell and using the HEADERS attribute on each data cell is required for identifying the header cells.',
            MESSAGE_HAS_HEADERS:            'Cell has headers attribute with values.',
            MESSAGE_MISSING_VIOLATION:      'Headers attribute is missing or empty, data cells in complex data tables must have a headers attribute.',
            MESSAGE_MISSING_RECOMMENDATION: 'Headers attribute is missing or empty, data cells in complex data tables should have a headers attribute.',
            MESSAGE_MISSING_MANUAL:         'Headers attribute is missing or empty, data cells in complex data tables may need a headers attribute',
            MESSAGE_DATA_CELL_IS_EMPTY:     'Table cell is empty, check to see if it needs headers, or if the empty cell could contain data',
            MESSAGE_HEADER_CELL:            'Cell is a header cell, so rule was not evaluated',
            MESSAGE_TABLE_PASS:             'All %1 data cells with content have headers.',
            MESSAGE_TABLE_MISSING_HEADERS:  '%1 data cells with content out of %2 are missing headers.',
            MESSAGE_TABLE_DATA_TABLE:       'Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:     'Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:           'The table is hidden from people using assistive technologies.'
        },
        TABLE_8: {
            ID:                             'TABLE 8',
            TITLE:                          'Each complex data table %s have an effective summary.',
            PURPOSE:                        'It is critical to provide a description of the content or point of the data in a complex data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:                   'Complex data table has the effective summary \'%1\'',
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
            MESSAGE_PASS:             'The layout table is only one column wide.',
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
              ALL_PASS:          'Page has @title@ element with content',
              ALL_FAIL:          'Page does not have @title@ element or the @title@ element is empty'
            },
            NODE_RESULT_MESSAGES: {
              PASS:                'Page has @title@ element with content',
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
            ID:            'TITLE 2',
            DEFINITION:    '@h1@elements %s be used as labels for @main@ landmarks',
            SUMMARY:       '@h1@labels @main@ landmarks',
            ACTION_MAIN:   'Add @h1@element as label to @main@ landmark.',
            ACTION_H1:     'Make @h1@the label of a @main@ landmark',
            TARGET:        '@h1@elements and @main@ landmarks',
            HIDDEN:        'Make @h1@element visible to assistive technologies',
            PURPOSE:       ['@h1@headings can be used to provide redundent navigation points to assistive technology users to the start of the main content'
                           ],
            TECHNIQUES:    ['Include an @h1@element for each @main@ landmark',
                            'Use an @id@ attribute to identify each @h1@element',
                            'Use ARIA-LABELLEDBY attribute to associate a @h1@element as a label to each @main@ element',
                            'Position @h1@elements in document right before the main content they label'
                           ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS:     [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                             title: '@h1@Element Specification', 
                             url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
                             }, 
                             {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                              title: 'Main Landmark Specificaion', 
                              url:   'http://www.w3.org/TR/wai-aria/roles#main'
                             }, 
                             {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                              title: 'aria-labelledby specification', 
                              url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                             },
                             {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                              title: 'IBM Home Page', 
                              url:   'http://www.ibm.com'
                             },
                             {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                              title: 'Disability Resources at Illinois', 
                              url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                             }
                           ]
        },
        TITLE_3: {
            ID:               'TITLE 3',
            DEFINITION:       'Each @main@ landmark %s have one @h1@element',
            SUMMARY:          'One @h1@per @main@ landmark',
            ACTION_TO_MANY:   'Remove %1 @h1@element labeling references from @main@ landmark',
            ACTION_MISSING:   'Add @h1@element label reference to @main@ landmark',
            HIDDEN:           'Make @h1@element visible to assistive technologies.',
            PURPOSE:          ['@h1@headings can be used to provide redundent navigation points to assistive technology users to the start of the main content',
                               'If there is more than one @h1@element in the @main@ landmark the start of the main content will not be clear to assistive technology users'
                              ],
            TECHNIQUES:       ['Use one @h1@element for each @main@ landmark',
                               'Use an @id@ attribute to identify each @h1@element',
                               'Use ARIA-LABELLEDBY attribute to associate a @h1@element as a label to each @main@ element',
                               'Position @h1@elements in document right before the main content they label'
                              ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS:        [{type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: '@h1@Element Specification', 
                                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H1'
                               }, 
                               {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: 'Main Landmark Specificaion', 
                                url:   'http://www.w3.org/TR/wai-aria/roles#main'
                               }, 
                               {type:  OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                                title: 'aria-labelledby specification', 
                                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                               },
                               {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                                title: 'IBM Home Page', 
                                url:   'http://www.ibm.com'
                               },
                               {type:  OpenAjax.a11y.REFERENCES.EXAMPLE, 
                                title: 'Disability Resources at Illinois', 
                                url:   'http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby'
                               }
                              ]
        },
        WIDGET_1: {
            ID:                    'Widget Rule 1',
            DEFINITION:            'Widgets %s have an accessible name',
            SUMMARY:               'Widget %s have name',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              ALL_MANUAL_CHECKS:           '',
              ALL_PASS:                     '',
              ALL_PASS_WITH_MANUAL_CHECKS:  '',
              SOME_FAIL:                    '',
              SOME_FAIL_WITH_MANUAL_CHECKS: '',
              ALL_FAIL:                     '',
              ALL_FAIL_WITH_MANUAL_CHECKS:  '',
              NOT_APPLICABLE:                ''
            },
            NODE_RESULT_MESSAGES: {
              PASS:                  '%1 widget has name',
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
        }
   }
});
