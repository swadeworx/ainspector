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
    message_severities: {
      MUST : 'must', 
      SHOULD: 'should', 
      MAY: 'may'
    },
    
    missing_message : "The following message id is not defined: ",
    
    caches : {
      'abbreviations_cache'      : 'Abbreviation Rules',
      'color_contrast_cache'     : 'Color Contrast Rules',
      'controls_cache'           : 'Control Rules',
      'headings_landmarks_cache' : 'Headings/Landmark Rules',
      'title_main_cache'         : 'Title/Main Rules',
      'images_cache'             : 'Image Rules',
      'languages_cache'          : 'Language Rules',
      'links_cache'              : 'Link Rules',
      'lists_cache'              : 'List Rules',
      'media_cache'              : 'Media Rules',
      'tables_cache'             : 'Table Rules'
    },
    
    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules: {
        COLOR_1: {
            ID:                  'COLOR 1',
            TITLE:               'Text content %s exceed CCR of 4.5 for any size text or 3.1 for large and/or bolded text',
            PURPOSE:             'Text on the page %s have sufficient contrast for people with low vision to read',
            MESSAGE_PASS:        'The CCR of %1 exceeds the 4.5 for plain text and 3.1 for large text and/or bolded text.',
            MESSAGE_FAIL:        'The CCR of %1 does not exceed CCR of 4.5 for plain text or 3.1 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'The element is not displayed visually.'
        },
        COLOR_2: {
            ID:                  'COLOR 2',
            TITLE:               'Text content exceed CCR of 7.0 for any size text or 4.5 for large and/or bolded text',
            PURPOSE:             'Text on the page %s have sufficient contrast for people with low vision to read',
            MESSAGE_PASS:        'The CCR of %1 exceeds the 7.0 for plain text and 4.5 for large text and/or bolded text.',
            MESSAGE_FAIL:        'The CCR of %1 does not exceed CCR of 7.0 for plain text or 4.5 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'The element is not displayed visually.'
        },
        CONTROL_1: {
            ID:                    'CONTROL 1',
            TITLE:                 'textarea, select and input elements of type text, password, checkbox, radio and file % have an accessible label',
            PURPOSE:               'Labels are used by assistive technologies to provide information on the purpose of the form control to people with disabilities and increases the area on the screen for mouse users interact with the control.',
            MESSAGE_PASS:          '%1 control has label.',
            MESSAGE_LABEL_MISSING: '%1 control is missing a label.',
            MESSAGE_HIDDEN:        '%1 is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_2: {
            ID:                    'CONTROL 2',
            TITLE:                 'Every input type image %s have an alt or title attribute with content',
            PURPOSE:               'The alt attribute on input type image is used by assistive technologies to provide information on the purpose of the form control to people with disabilities.',
            MESSAGE_PASS:          'Image button control has label.',
            MESSAGE_ALT_MISSING:   'Image button control is missing alt text.',
            MESSAGE_HIDDEN:        'Image button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_3: {
            ID:                          'CONTROL 3',
            TITLE:                       'Groups of radio buttons % be contained in fieldset/legend or aria labeling',
            PURPOSE:                     'The fieldset/legend provides a grouping label to help users of assistive technology understand the context of the radio buton labels.',
            MESSAGE_HAS_LEGEND:          'Radio button uses FIELDSET/LEGEND elements for group labeling',
            MESSAGE_HAS_ARIA_LABELLEDBY: 'Radio button uses ARIA-LABELLEDBY for group labeling',
            MESSAGE_HAS_ARIA_LABEL:      'Radio button uses ARIA-LABEL for group labeling',
            MESSAGE_LEGEND_MISSING:      'Radio button is NOT contained in a FIELDSET/LEGEND elements or using ARIA labeling techniques to include group label',
            MESSAGE_HIDDEN:              'Radio button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_4: {
            ID:                  'CONTROL 4',
            TITLE:               'Button elements % have text content and input type button must have a value attribute with content',
            PURPOSE:             'The value attribute of a button element is used by assistive technologies to provide information on the purpose of the form control to people with disabilities.',
            MESSAGE_HAS_CONTENT: 'Button has text content',
            MESSAGE_NO_CONTENT:  'Button has does NOT have text content',
            MESSAGE_HIDDEN:      'Button is hidden from assistive technology, so at users will not have access to the control.'
        },
        CONTROL_5: {
            ID:                   'CONTROL 5',
            TITLE:                'Textarea, select, input and button elements with id attributes, %s have unique id values on the page',
            PURPOSE:              'Duplicate ids may result in the improper calucation of labels for assistive technologies.',
            MESSAGE_UNIQUE_ID:    'The id \'%1\' is unique on the page',
            MESSAGE_DUPLICATE_ID: 'The id \'%1\' is NOT unique on the page'
        },
        CONTROL_6: {
            ID:                 'CONTROL 6',
            TITLE:              'Label with a "for" attribute reference does not reference a form control',
            PURPOSE:            'This may be an improperly referenced for control, since the for attribute is designed to associate a label with a form control.  ',
            MESSAGE_NO_CONTROL: 'Label reference points to a %1 element, not a form control',
            MESSAGE_NO_ELEMENT: 'Label does NOT reference any element on the page'
        },
        CONTROL_7: {
            ID:                  'CONTROL 7',
            TITLE:               'LABEL element or legend element %s contain content',
            PURPOSE:             'Labels without any content cannot describe the purpose of the associated form control.',
            MESSAGE_NO_CONTENT:  'LABEL element does NOT have any content',
            MESSAGE_HAS_CONTENT: 'LABEL element has content'
        },
        CONTROL_8: {
            ID:                    'CONTROL 8',
            TITLE:                 'Fieldset %s contain exactly one legend element',
            PURPOSE:               'Multiple legend elements contained in the same fieldset may result in the improper calucation of labels for assistive technologies.',
            MESSAGE_NO_LEGEND:     'No LEGEND element found for FIELDSET element',
            MESSAGE_MORE_THAN_ONE: 'More than one LEGEND element found for FIELDSET element',
            MESSAGE_JUST_ONE:      'FIELDSET element has just one LEGEND element'
        },
        CONTROL_9: {
            ID:                          'CONTROL 9',
            TITLE:                       'TITLE attribute %s not be used to label form controls',
            PURPOSE:                     'The title attribute was not designed to be a label for form controls and is often used for other purposes in a web page',
            MESSAGE_USES_TITLE:          'Avoid using TITLE attribute to label form controls',
            MESSAGE_DOES_NOT_USE_TITLE : 'Does not use TITLE attribute to label form controls'
        },
        CONTROL_10: {
            ID:                      'CONTROL 10',
            TITLE:                   'Accessible labels %s be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page',
            PURPOSE:                 'If may be difficult for people using assistive technologies to understand the puropose of form controls when more than one form control share the same label text content.',
            MESSAGE_DUPLICATE_LABEL: 'The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'The label \'%1\' is unique on the page',
            MESSAGE_HIDDEN:          'Form control is hidden from assistive technology, so not tested'
        },
        CONTROL_11: {
            ID:                      'CONTROL 11',
            TITLE:                   'If there is more than one form on page, input element of type submit and reset %s have unique labels using the value attribute',
            PURPOSE:                 'If there is more than form on the page the reset and submit buttons should have unique labels to help users of assistive technology understand which form they are reseting or submitting.',
            MESSAGE_DUPLICATE_LABEL: 'The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'The label is unique on the page',
            MESSAGE_HIDDEN:          'Form control is hidden from assistive technology, so they will not see it'
        },
        HEADING_1: {
            ID:                    'HEADING 1',
            TITLE:                 'Each page should contain at least one H1 element and each H1 element must have content',
            PURPOSE:               'The H1 element can be used to help provide an accessible title for the web page and mark the beginning of the main content.',
            MESSAGE_HAS_H1:        'H1 element is on page and has content',
            MESSAGE_H1_NO_CONTENT: 'H1 element does not have text content',
            MESSAGE_H1_MISSING:    'Page does not have an H1 element',
            MESSAGE_H1_HIDDEN:     'H1 is hidden from assistive technology, so they will not see it'
        },
        HEADING_2: {
            ID:                 'HEADING 2',
            TITLE:              'The text content of headings of the same level that share the same parent heading or landmark role should be unique',
            PURPOSE:            'Headings can describe the content of a section in the document, it is rare that two sections of a document at the same level would have the same content.',
            MESSAGE_UNIQUE:     'Heading is unique',
            MESSAGE_NOT_UNIQUE: 'Heading is not unique'
        },
        HEADING_3: {
            ID:                 'HEADING 3',
            TITLE:              'Heading content %s describe the section or sub section',
            PURPOSE:            'Headings can provide information about a section in a document',
            MESSAGE_CHECK:      'Check to make sure the heading accurately describes the section of the document',
            MESSAGE_HIDDEN:     'Heading is hidden from assistive technology, so they will not see it'
        },
        HEADING_4: {
            ID:                       'HEADING 4',
            TITLE:                    'Headings within landmarks must be properly nested, if there are no MAIN landmarks the headings after the last H1 must be properly nested',
            PURPOSE:                  'The proper nesting of headings provide information on the relationships between sections of content.',
            MESSAGE_PROPER_NESTING:   'Heading is properly nested',
            MESSAGE_IMPROPER_NESTING: 'Heading is not properly nested',
            MESSAGE_HIDDEN:           'Content is hidden from assistive technology, so they will not see it'
        },
        HEADING_5: {
            ID:                 'HEADING 5',
            TITLE:              'A headings %s not be hidden with CSS display=none',
            PURPOSE:            'Authors sometimes use CSS display=none on headings to hide them from visual rendering and not aware that this also hides the heading from assistive technology.',
            MESSAGE_HIDDEN:     'Content is hidden from assistive technology, so they will not see it'
        },
        HEADING_6: {
            ID:                 'HEADING 6',
            TITLE:              'Heading element content %s not only come alt text of images',
            PURPOSE:            'Headings made up of only image content may not have the color contrast needed by people with low vision to read.',
            MESSAGE_HAS_TEXT:   'Heading has text content',
            MESSAGE_ONLY_IMAGE: 'Heading content should NOT come only from images'
        },
        HEADING_7: {
            ID:             'HEADING 7',
            TITLE:          'Headings %s have text content',
            PURPOSE:        'Headings without content cannot provide a description of a section of a web page.',
            MESSAGE_EMPTY:  'Heading has no text content'
        },
        HEADING_8_EN: {
            ID:              'HEADING 8-EN',
            TITLE:           'Headings %s be concise and therefore typically not contain more than 100 characters (English Only)',
            PURPOSE:         '',
            MESSAGE_TO_LONG: 'Heading is %1 characters in length, in general heading should be less %2 characters in length'
        },
        IMAGE_1: {
            ID:                   'IMAGE 1',
            TITLE:                'Each image %s have an alt attribute',
            PURPOSE:              'People who cannot see the images need to have a text equivalent of the image',
            MESSAGE_PASS:         'Image has alt attribute.',
            MESSAGE_ALT_MISSING:  'Alt attribute is missing, image elements not marked as presentational %s be an alt attribute.',
            MESSAGE_PRESENTATION: 'Image has the role=presentation, this indicates the image is purely stylistic or redundent with text content.',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies.'
        },
        IMAGE_2: {
            ID:                   'IMAGE 2',
            TITLE:                'If the longdesc attribute is defined, it %s have valid URI',
            PURPOSE:              'People who are trying to follow the link to get more detialed information about the image will be confused if the link is broke.',
            MESSAGE_PASS:         'Image longdesc "%1" is a valid URI.',
            MESSAGE_FAIL:         'The longdesc reference "%1" %s be a valid url.',
            MESSAGE_PRESENTATION: 'Image has the role=presentation, so the assistive technology user will not have access to longdesc reference.',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies, so they will not have access to the longdesc reference.',
            MESSAGE_NOT_TESTED:   'The testing of URLs is disabled, you must manually test the longdesc url: %1.',
            MESSAGE_ERROR:        'The testing of URLs resulted in an error, you must manually test the longdesc url: %1.',
            MESSAGE_NA:           'Image does not have a longdesc attribute.'
        },
        IMAGE_3: {
            ID:                   'IMAGE 3',        
            TITLE:                'The file name of the image %s not be part of the alt text content',
            PURPOSE:              'The file name in all but a very limited number of situations does not provide any useful information to people who cannot see the image.',
            MESSAGE_NA:           'Image does not use the file name as the alt text',
            MESSAGE_FAIL:         'The file name %1 is being used as the alt text, the alt text $s describe the purpose or content of informative images, or be empty if the image is decorative',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies, so they will not have access to the alt text content.',
            MESSAGE_NO_FILE_NAME: 'Image alt text does not contain file name',
            MESSAGE_NO_ALT:       'Image does not have ALT text'
        },
        IMAGE_4_EN: {
            ID:                   'IMAGE 4-ENGLISH',        
            TITLE:                'Alt text %s be no more than 100 characters long.',
            PURPOSE:              'Since alt text is often rendered through speech it should be as succinct as possible.',
            MESSAGE_PASS:         'The alt text of %1 characters is shorter than the maximum %2 characters.',
            MESSAGE_ALT_TO_LONG:  'The alt text is %1 characters, the length %s NOT exceed %2 characters.  If an image needs a longer description use the longdesc attribute or other technique to provide a linger description.',
            MESSAGE_NA :          'Image is hidden, marked as presentation or the alt attribute is missing or empty.'
        },
        IMAGE_4_FR: {
            ID:                   'IMAGE 4-FRENCH',        
            TITLE:                'ALT text  %s be no more than 120 characters long.',
            PURPOSE:              'Since alt text is often rendered through speech it should be as succinct as possible.',
            MESSAGE_PASS:         'The alt text of %1 characters is shorter than the maximum %2 characters.',
            MESSAGE_ALT_TO_LONG:  'The alt text is %1 characters, the length %s NOT exceed %2 characters.  If an image needs a longer description use the longdesc attribute or other technique to provide a linger description.',
            MESSAGE_NA :          'Image is hidden, marked as presentation or the alt attribute is missing or empty.'
        },
        IMAGE_5: {
            ID:                    'IMAGE 5',
            TITLE:                 'If an image has a height or width of 1 pixel or its alt text set to empty, the image %s set its role attribute to "presentation" or the image %s be removed and CSS %s should be used for positioning.',
            PURPOSE:               'Small image are usually used for styling and should be marked with role=presentation to make sure assistive technologies ignore them',
            MESSAGE_NA:            'Image is missing an alt attribute, is hidden or has its role set to presentation.',
            MESSAGE_ALT_NOT_EMPTY: 'Images that are only 1 pixel high or wide must set it\'s alt text to empty.',
            MESSAGE_PASS:          'Image is more than 1 pixel high or wide, hidden, or already has its alt text set to empty.'
        },
        IMAGE_6: {
            ID:                   'IMAGE 6',
            TITLE:                'If the alt is empty or role is set presentation verify the image is used just for styling or decoration',
            PURPOSE:              'Images used for styling and decoration should be marked with role=presentation to make sure assistive technologies ignore them, if they have important content they should have descriptive alt text',
            MESSAGE_HIDDEN:       'Image is hidden from users of assistive technologies.',
            MESSAGE_NA:           'Image has alt text content ',
            MESSAGE_VERIFY:       'Since the image has no alt attribute, empty alt text, or role is set to presentation, verify the image is purely used for styling or decoration.'
        },
        LANDMARK_1: {
            ID:             'LANDMARK 1',
            TITLE:          'Pages %s have main landmark',
            PURPOSE:        'The main landmark provides an easy way for users of assistive technology to get to the main content of the web page and know where the main content begins and ends.',            
            MESSAGE_PASS:   'The page has %1 main landmarks',
            MESSAGE_FAIL:   'The page has no main landmarks',
            MESSAGE_HIDDEN: 'The page has %1 hidden main landmarks, hidden landmarks cannot be used by people with assistive technologies.'
        },
        LANDMARK_2: {
            ID:             'LANDMARK 2',
            TITLE:          'All visible content %s be contained within a landmark',
            PURPOSE:        'Landmarks provide an easy way for users of assistive technology to navigate and identify all of the sections of information on a web page.',            
            MESSAGE_PASS:   'The \'%1\' element with rendered content is in a %2 landmark',
            MESSAGE_FAIL:   'The \'%1\' element with rendered content is not contained in a landmark',
            MESSAGE_HIDDEN: 'The \'%1\' element with content is hidden, if the element can made visible (i.e. through scripting) it would not be in a landmark.'
        },
        LANDMARK_3: {
            ID:             'LANDMARK 3',
            TITLE:          'If there are two or more landmarks of the same type, they %s have unique labels',
            PURPOSE:        'When there are two or more landmarks of the same type labels make it possible for people using assistive technology to identify the differences between the landmarks.',            
            MESSAGE_PASS_ONLY_ONE:  'There is only one %1 landmark in the page',
            MESSAGE_PASS_UNIQUE:    'The "%1" label is unique for the %2 landmarks',
            MESSAGE_FAIL_NO_LABEL:  'The %2 landmark does not have a label, when there are more than one of the same type of landmark on the page the landmark needs a label',
            MESSAGE_FAIL_DUPLICATE: 'The "%1" label is NOT unique for the %2 landmarks',
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
            MESSAGE_PASS:            'Data table has the caption element or a summary attribute of "%1".',
            MESSAGE_FAIL:            'Data table is missing a caption element and summary attribute with text content, the page %s have either a caption element or a summary attribute with text content.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have a caption element.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2S: {
            ID:                      'TABLE 2S',
            TITLE:                   'If there is only one data table on a page, it %s have an effective caption with content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table.',
            MESSAGE_PASS:            'Data table has the effective caption: "%1".',
            MESSAGE_FAIL:            'The effective caption is missing or is empty, a data table %s have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'Table is not a data table, and therefore should not have an effective caption.',
            MESSAGE_HIDDEN:          'Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2M: {
            ID:                      'TABLE 2M',
            TITLE:                   'If there is more than one data table, each data table %s have an effective caption with content.',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'Table has an effective caption: "%1"',
            MESSAGE_FAIL:            'Since there is more than one data table, the table %s have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_ONLY_ONE:        'There is only one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_3: {
            ID:                       'TABLE 3',
            TITLE:                    'The effective caption content and effective summary content of each data table %s not be the same',
            PURPOSE:                  'It is important to provide an unique effective captions to more easily disern a table from other tables on the page.',
            MESSAGE_UNIQUE:           'The effective caption "%1" is unique from the effective summary "%2".',
            MESSAGE_NOT_UNIQUE:       'The effective caption "%1" is the same as the effective summary "%2", the effective caption should be used to describe the purpose of the table and the effective summary information about the data in the table or conclusions the author intended to be understood from viewing the data.',
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
            MESSAGE_PASS:            'Table has an effective caption: "%1"',
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
            MESSAGE_NOT_UNIQUE_VIOLATION:      'Table header cell has duplicate ID: "%1\", header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'Table header cell has duplicate ID: "%1\", header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'Table header cell has duplicate ID: "%1\", header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'Table header cell is missing an ID attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'Table header cell is missing an ID attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'Table header cell is missing an ID attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS:                'All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     '%1 header cells of %2 header cells in the table have missing or dulicate ID values.',
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
            MESSAGE_PASS:                   'Complex data table has the effective summary "%1"',
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
            TITLE:                    'If a table is a layout table that is more than 1 column wide, the content needs to be meaningful when table markup is ignored.',
            PURPOSE:                  '',
            PURPOSE:                  'The use of layout tables can result in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS:             'The layout table is only one column wide.',
            MESSAGE_VIOLATION:        'The page content must be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_RECOMMENDATION:   'The page content should be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_3: {
            ID:                       'LAYOUT 3',
            TITLE:                    'If the table is a layout table, the rule test the table element and all of its children for role="presentation"',
            PURPOSE:                  'The use of role=presentation on table markup makes it easier for people using assistive technology to ignore the table markup.',
            MESSAGE_PASS:             'The %1 element has role="presentation".',
            MESSAGE_VIOLATION:        'The %1 element must use the attribute role="presentation".',
            MESSAGE_RECOMMENDATION:   'The %1 element should use the attribute role="presentation".',
            MESSAGE_NOT_LAYOUT_TABLE: 'The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        TITLE_1: {
            ID:                'TITLE 1',
            TITLE:             'Document %s have a title element with content.',
            PURPOSE:           'The title is important to help people understand the type of content or purpose of a web page.',
            MESSAGE_HAS_TITLE: 'Document has a TITLE element with content.',
            MESSAGE_NO_TITLE:  'Document TITLE element is missing or empty.'
        },
        TITLE_2: {
            ID:                      'TITLE 2',
            TITLE:                   'If a page contains both MAIN landmarks and H1 elements, each H1 element %s be a label for a MAIN landmark.',
            PURPOSE:                 'H1 can provide a redundent navigational marker for the start of main content, and orient users to the section of the page.',
            MESSAGE_H1_IS_NOT_LABEL: 'H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_H1_IS_LABEL:     'H1 element is a label for a MAIN landmark.',
            MESSAGE_NO_ROLE_MAIN:    'No MAIN landmarks on the page, rule for H1 elements does not apply.',
            MESSAGE_HIDDEN:          'H1 element is hidden from assistive technology, so will not be seen.'
        },    
        TITLE_3: {
            ID:                   'TITLE 3',
            TITLE:                'If there are both H1 elements and MAIN landmarks the H1 elements %s only be used as labels for MAIN landmarks',
            PURPOSE:              'Using H1s as labels for main landmarks assures that users will receive consistent information about the content of each main section.',
            MESSAGE_H1_IS_LABEL:  'The H1 element is a label for a MAIN landmark.',
            MESSAGE_H1_NOT_LABEL: 'The H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_HIDDEN:       'The H1 element is hidden to assistive technologies.'
        }

   }
});
