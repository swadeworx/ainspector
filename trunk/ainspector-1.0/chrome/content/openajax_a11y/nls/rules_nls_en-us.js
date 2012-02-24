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
    message_severities: ['must', 'should', 'may need'],  
    
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
            MESSAGE_PASS:        'Color 1: The CCR of %1 exceeds the 4.5 for plain text and 3.1 for large text and/or bolded text.',
            MESSAGE_FAIL:        'Color 1: The CCR of %1 does not exceed CCR of 4.5 for plain text or 3.1 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'Color 1: The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'Color 1: The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'Color 1: The element is not displayed visually.',
            TITLE:               'Color 1: Text content exceed CCR of 4.5 for any size text or 3.1 for large and/or bolded text'
        },
        COLOR_2: {
            MESSAGE_PASS:        'Color 2: The CCR of %1 exceeds the 7.0 for plain text and 4.5 for large text and/or bolded text.',
            MESSAGE_FAIL:        'Color 2: The CCR of %1 does not exceed CCR of 7.0 for plain text or 4.5 for large and/or bolded text.',
            MESSAGE_MANUAL_PASS: 'Color 2: The CCR of %1 exceeds CCR requirements, but a background image may reduce this CCR and so a manual check is required.',
            MESSAGE_MANUAL_FAIL: 'Color 2: The CCR of %1 does not meet CCR requirements, but a background image may imporve the CCR and so a manual check is required.',
            MESSAGE_HIDDEN:      'Color 2: The element is not displayed visually.',
            TITLE:               'Color 2: Text content exceed CCR of 7.0 for any size text or 4.5 for large and/or bolded text'
        },
        CONTROL_1: {
            MESSAGE_PASS:          'CONTROL 1: %1 control has label.',
            MESSAGE_LABEL_MISSING: 'CONTROL 1: %1 control is missing a label.',
            MESSAGE_HIDDEN:        'CONTROL 1: %1 is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                 'CONTROL 1: textarea, select and input elements of type text, password, checkbox, radio and file must have an accessible label'
        },
        CONTROL_2: {
            MESSAGE_PASS:          'CONTROL 2: Image button control has label.',
            MESSAGE_ALT_MISSING:   'CONTROL 2: Image button control is missing alt text.',
            MESSAGE_HIDDEN:        'CONTROL 2: Image button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                 'CONTROL 2: Every input type image must have an alt or title attribute with content'
        },
        CONTROL_3: {
            MESSAGE_HAS_LEGEND:          'CONTROL 3: Radio button uses FIELDSET/LEGEND elements for group labeling',
            MESSAGE_HAS_ARIA_LABELLEDBY: 'CONTROL 3: Radio button uses ARIA-LABELLEDBY for group labeling',
            MESSAGE_HAS_ARIA_LABEL:      'CONTROL 3: Radio button uses ARIA-LABEL for group labeling',
            MESSAGE_LEGEND_MISSING:      'CONTROL 3: Radio button is NOT contained in a FIELDSET/LEGEND elements or using ARIA labeling techniques to include group label',
            MESSAGE_HIDDEN:              'CONTROL 3: Radio button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:                       'CONTROL 3: Groups of radio buttons should be contained in fieldset/legend or aria labeling'
        },
        CONTROL_4: {
            MESSAGE_HAS_CONTENT: 'CONTROL 4: Button has text content',
            MESSAGE_NO_CONTENT:  'CONTROL 4: Button has does NOT have text content',
            MESSAGE_HIDDEN:      'CONTROL 4: Button is hidden from assistive technology, so at users will not have access to the control.',
            TITLE:               'CONTROL 4: Button elements must have text content and input type button must have a value attribute with content'
        },
        CONTROL_5: {
            MESSAGE_UNIQUE_ID:    'CONTROL 5: The id \'%1\' is unique on the page',
            MESSAGE_DUPLICATE_ID: 'CONTROL 5: The id \'%1\' is NOT unique on the page',
            TITLE:                'CONTROL 5: Textarea, select, input and button elements with id attributes, must have unique id values on the page'
        },
        CONTROL_6: {
            MESSAGE_NO_CONTROL: 'CONTROL 6: Label reference points to a %1 element, not a form control',
            MESSAGE_NO_ELEMENT: 'CONTROL 6: Label does NOT reference any element on the page',
            TITLE:              'CONTROL 6: Label with a for attribute reference does not reference a form control'
        },
        CONTROL_7: {
            MESSAGE_NO_CONTENT:  'CONTROL 7: LABEL element does NOT have any content',
            MESSAGE_HAS_CONTENT: 'CONTROL 7: LABEL element has content',
            TITLE:               'CONTROL 7: LABEL element or legend element should contain content'
        },
        CONTROL_8: {
            MESSAGE_NO_LEGEND:     'CONTROL 8: No LEGEND element found for FIELDSET element',
            MESSAGE_MORE_THAN_ONE: 'CONTROL 8: More than one LEGEND element found for FIELDSET element',
            MESSAGE_JUST_ONE:      'CONTROL 8: FIELDSET element has just one LEGEND element',
            TITLE:                 'CONTROL 8: Fieldset should contain exactly one legend element'
        },
        CONTROL_9: {
            MESSAGE_USES_TITLE:          'CONTROL 9: Avoid using TITLE attribute to label form controls',
            MESSAGE_DOES_NOT_USE_TITLE : 'CONTROL 9: Does not use TITLE attribute to label form controls',
            TITLE:                       'CONTROL 9: Avoid using the TITLE attribute to label form control'
        },
        CONTROL_10: {
            MESSAGE_DUPLICATE_LABEL: 'CONTROL 10: The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'CONTROL 10: The label \'%1\' is unique on the page',
            MESSAGE_HIDDEN:          'CONTROL 10: Form control is hidden from assistive technology, so not tested',
            TITLE:                   'CONTROL 10: Accessible labels must be unique for every textarea, select and input element of type text, password, radio, and checkbox on a page'
        },
        CONTROL_11: {
            MESSAGE_DUPLICATE_LABEL: 'CONTROL 11: The label \'%1\' is NOT unique on the page',
            MESSAGE_LABEL_UNIQUE:    'CONTROL 11: The label is unique on the page',
            MESSAGE_HIDDEN:          'CONTROL 11: Form control is hidden from assistive technology, so they will not see it',
            TITLE:                   'CONTROL 11: If there is more than one form on page, input element of type submit and reset must have unique labels using the value attribute'
        },
        HEADING_1: {
            MESSAGE_HAS_H1:        'HEADING 1: H1 element is on page and has content',
            MESSAGE_H1_NO_CONTENT: 'HEADING 1: H1 element does not have text content',
            MESSAGE_H1_MISSING:    'HEADING 1: Page does not have an H1 element',
            MESSAGE_H1_HIDDEN:     'HEADING 1: H1 is hidden from assistive technology, so they will not see it',
            TITLE:                 'HEADING 1: Each page should contain at least one H1 element and each H1 element must have content'
        },
        HEADING_2: {
            MESSAGE_UNIQUE:     'HEADING 2: Heading is unique',
            MESSAGE_NOT_UNIQUE: 'HEADING 2: Heading is not unique',
            TITLE:              'HEADING 2: The text content of headings of the same level that share the same parent heading or landmark role should be unique'
        },
        HEADING_3: {
            MESSAGE_CHECK:      'HEADING 3: Check to make sure the heading accurately describes the section of the document',
            MESSAGE_HIDDEN:     'HEADING 3: Heading is hidden from assistive technology, so they will not see it',
            TITLE:              'HEADING 3: Heading content should describe the section or sub section'
        },
        HEADING_4: {
            MESSAGE_PROPER_NESTING:   'HEADING 4: Heading is properly nested',
            MESSAGE_IMPROPER_NESTING: 'HEADING 4: Heading is not properly nested',
            MESSAGE_HIDDEN:           'HEADING 4: Content is hidden from assistive technology, so they will not see it',
            TITLE:                    'HEADING 4: Headings within landmarks must be properly nested, if there are no MAIN landmarks the headings after the last H1 must be properly nested'
        },
        HEADING_5: {
            MESSAGE_HIDDEN:     'HEADING 5: Content is hidden from assistive technology, so they will not see it',
            TITLE:              'HEADING 5: The text content of a heading should not only come from the alt attribute value of img elements.'
        },
        HEADING_6: {
            MESSAGE_HAS_TEXT:   'HEADING 6: Heading has text content',
            MESSAGE_ONLY_IMAGE: 'HEADING 6: Heading content should NOT come only from images',
            TITLE:              'HEADING 6: Heading element content should not only come alt text of images'
        },
        HEADING_7: {
            MESSAGE_EMPTY:  'HEADING 7: Heading has no text content',
            TITLE:          'HEADING 7: Headings must have text content'
        },
        HEADING_8_EN: {
            MESSAGE_TO_LONG: 'HEADING 8 (English): Heading is %1 characters in length, in general heading should be less %2 characters in length',
            TITLE:           'HEADING 8 (English): Headings should be concise and therefore typically not contain more than 100 characters (English Only)'
        },
        IMAGE_1: {
            MESSAGE_PASS:         'IMAGE 1: Image has alt attribute.',
            MESSAGE_ALT_MISSING:  'IMAGE 1: Alt attribute is missing.',
            MESSAGE_PRESENTATION: 'IMAGE 1: Image has the role=presentation, this indicates the image is purely stylistic or redundent with text content.',
            MESSAGE_HIDDEN:       'IMAGE 1: Image is hidden from users of assistive technologies.',
            TITLE:                'IMAGE 1: Images must have an alt attribute'
        },
        IMAGE_2: {
            MESSAGE_PASS:         'IMAGE 2: Image longdesc %1 is a valid URI.',
            MESSAGE_FAIL:         'IMAGE 2: Longdesc %1 is a broken link.',
            MESSAGE_PRESENTATION: 'IMAGE 2: Image has the role=presentation, so the assistive technology user will not have access to longdesc reference.',
            MESSAGE_HIDDEN:       'IMAGE 2: Image is hidden from users of assistive technologies, so they will not have access to the longdesc reference.',
            MESSAGE_NOT_TESTED:   'IMAGE 2: The testing of URLs is disabled, you must manually test the longdesc url: %1.',
            MESSAGE_ERROR:        'IMAGE 2: The testing of URLs resulted in an error, you must manually test the longdesc url: %1.',
            MESSAGE_NA:           'IMAGE 2: Image does not have a longdesc attribute.',
            TITLE:                'IMAGE 2: If the longdesc attribute is defined, it must have valid URI'
        },
        IMAGE_3: {
            MESSAGE_NA:           'IMAGE 3: Image does not use the file name as the alt text description',
            MESSAGE_FAIL:         'IMAGE 3: The file name %1 is being used as the alt text, the alt text should describe the purpose or content of informative images, or be empty if the image is decorative',
            MESSAGE_HIDDEN:       'IMAGE 3: Image is hidden from users of assistive technologies',
            MESSAGE_NO_FILE_NAME: 'IMAGE 3: Image alt text does not contain file name',
            MESSAGE_NO_ALT:       'IMAGE 3: Image does not have ALT text',
            TITLE:                'IMAGE 3: The file name of the image should not be part of the alt text content (it must have an image file extension)'
        },
        IMAGE_4_EN: {
            MESSAGE_PASS:         'IMAGE 4(English): Image alt text length of %1 is shorter than %2 characters.',
            MESSAGE_ALT_TO_LONG:  'IMAGE 4(English): Alt text length of %1 is longer than the recommended length of %2, if an image needs a longer description use longdesc attribute or other technique.',
            MESSAGE_NA :          'IMAGE 4(English): Image is hidden or alt attribute is missing or empty.',
            TITLE:                'IMAGE 4(English): ALT text quality can often be tested based on the length in characters for English'
        },
        IMAGE_4_FR: {
            MESSAGE_PASS:         'IMAGE 4(french): Image alt text length of %1 is shorter than %2 characters.',
            MESSAGE_ALT_TO_LONG:  'IMAGE 4(french): Alt text length of %1 is longer than the recommended length of %2, if an image needs a longer description use longdesc attribute or other technique.',
            MESSAGE_NA:           'IMAGE 4(french): Image is hidden or alt attribute is missing or empty.',
            TITLE:                'IMAGE 4(french): ALT text quality can often be tested based on the length in characters for English'
        },
        IMAGE_5: {
            MESSAGE_NA:            'IMAGE 5: Image is missing an alt attribute, is hidden or has its role set to presentation.',
            MESSAGE_ALT_NOT_EMPTY: 'IMAGE 5: Images that are only 1 pixel high or wide must set it\'s alt text to empty.',
            MESSAGE_PASS:          'IMAGE 5: Image is more than 1 pixel high or wide, hidden, or already has its alt text set to empty.',
            TITLE:                 'IMAGE 5: If an image has a height or width of 1 pixel its alt text set to empty, role set to presentation or the image removed and use CSS position'
        },
        IMAGE_6: {
            MESSAGE_HIDDEN:       'IMAGE 6: Image is hidden from users of assistive technologies.',
            MESSAGE_NA:           'IMAGE 6: Image has non-empty alt text content ',
            MESSAGE_VERIFY:       'IMAGE 6: Since the image alt text is empty or role set to presentation, verify the image is purely decotrative',
            TITLE:                'IMAGE 6: If the alt is empty or role is set presentation verify the image is purely decorative'
        },
        LANDMARK_1: {
            MESSAGE_PASS: 'LANDMARK 1: ',
            MESSAGE_FAIL: 'LANDMARK 1: ',
            MESSAGE_NA:   'LANDMARK 1: ',
            TITLE:        'LANDMARK 1: All visible content must be contained within a landmark'
        },
        LINK_1: {
            MESSAGE_PASS: 'Link 1: The link dimensions of %1 pixels high and %2 pixels wide are larger than the minimum height of %3 pixels and width of %4 pixels.',
            MESSAGE_TO_SMALL: 'Link 1: The link dimensions of %1 pixels high and %2 pixels wide do meet the minimum height of %3 pixels and width of %4 pixels requirements.',
            MESSAGE_MANUAL: 'Link 1: The link dimensions could not be calculated.',
            MESSAGE_HIDDEN: 'Link 1: The link is hidden from the graphical rendering.',
            MESSAGE_NA: 'Link 1: The link has no HREF content, so it is either an internal target or may have behaviors defined by javascript.',
            TITLE: 'Link 1: Link should provide minimum target dimensions.'
        },
        LINK_2: {
            MESSAGE_PASS: 'Link 2: %1 links with same URL and use the same link text.',
            MESSAGE_FAIL: 'Link 2: %1 links with the same URL do not have the same link text.',
            MESSAGE_MANUAL: 'Link 2: It could not be determined if the HREF of this link is shared by other links on the page',
            MESSAGE_NA: 'Link 2: This link does not share the same URL with any other links on the page.',
            TITLE: 'Link 2: Links with the same HREF should have the same link text.'
        },

        LINK_3: {
            MESSAGE_PASS: 'Link 3: %1 links with the same accessible link name have the same HREF.',
            MESSAGE_FAIL: 'Link 3: %1 links with the same accessible link name have different HREFs.',
            MESSAGE_MANUAL: 'Link 3: It could not be determined if the accessible link name is shared with any other links on the page.',
            MESSAGE_NA: 'Link 3: This link does not share the same accessible link name with any other links on the page or the link role has been overridden.',
            TITLE: 'Link 3: Links with different HREFs should have unique accessible names.'
        },
        LIST_1: {
            MESSAGE_HAS_ROLE_NAV: 'LIST 1: The parent element of this %1 has role=navigation.',
            MESSAGE_MISSING_ROLE_NAV: 'LIST 1: The parent element of this %1 does not have role=navigation.',
            MESSAGE_ROLE_NAV_ON_LIST: 'LIST 1: This %1 element should not have role=navigation; it should be placed on its parent element instead.',
            TITLE: 'LIST 1: A list of navigational links should be contained within an element with role=navigation.'
        },
        MEDIA_1: {
            MESSAGE_PASS:   'MEDIA 1: Text based alternative is available for pre-recorded audio',
            MESSAGE_MAYBE:  'MEDIA 1: If %1 element is prerecorded audio, verify that a text based alternative to the audio is available',
            MESSAGE_FAIL:   'MEDIA 1: Text based alternative is NOT available for pre-recorded audio',
            MESSAGE_HIDDEN: 'MEDIA 1: %1 element is hidden from the visual rendering',
            TITLE: 'MEDIA 1: Pre-recorded audio must have text based alternatives'
        },
        MEDIA_2: {
            MESSAGE_PASS_TEXT:  'MEDIA 2: Text based alternative is available for pre-recorded video',
            MESSAGE_PASS_AUDIO: 'MEDIA 2: Audio description is available for pre-recorded video',
            MESSAGE_PASS_BOTH:  'MEDIA 2: Both an audio description and text based description is available for pre-recorded video',
            MESSAGE_MAYBE:      'MEDIA 2: If %1 element is prerecorded video, verify that a text based alternative or audio description is available for the video',
            MESSAGE_FAIL:       'MEDIA 2: Text based alternative or audio description is NOT available for pre-recorded video',
            MESSAGE_HIDDEN:     'MEDIA 2: %1 element is hidden from the visual rendering',
            TITLE: 'MEDIA 2: Pre-recorded video must have either text based alternative or audio description'
        },
        TABLE_1: {
            TITLE:                   'TABLE 1: If a table is a data table, the rule tests if each table cell with content in the first row or first column are TH elements or TD elements with scope=col',
            PURPOSE:                 'Header cells provide critical context for meaning of the content in data cells to people using speech, since they cannot see the visual relationships.',
            MESSAGE_PASS_ROW:        'TABLE 1: The first row contains %1 header cells.',
            MESSAGE_PASS_COLUMN:     'TABLE 1: The first column contains %1 header cells.',
            MESSAGE_PASS_BOTH:       'TABLE 1: The first row contains %1 header cells and the first column contains %2 header cells.',
            MESSAGE_VIOLATION:       'TABLE 1: Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table must have all th elements or td elements with scope attribute in the first row and/or first column with content.',
            MESSAGE_RECOMMENDATION:  'TABLE 1: Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table should have all th elements or td elements with scope attribute  in the first row and/or first column with content.',
            MESSAGE_MANUAL:          'TABLE 1: Only %1 out of %2 cells are headers in the first row and only %3 out of %4 cells are headers in the first column, the table may need th elements or td elements with scope attribute cells in the first row and/or first column with content.',
            MESSAGE_HIDDEN:          'TABLE 1: The table is hidden from people using assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 1: Table is not a data table, rule does not apply.'
        },
        TABLE_2T: {
            TITLE:                   'TABLE 2T: If a table is a data table, the rule tests if a caption element or the summary attribute is defined and has content',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            TITLE_VIOLATION:         'TABLE 2T: Data tables must have either a caption element or a summary attribute with text content.',
            TITLE_RECOMMENDATION:    'TABLE 2T: Data tables should have either a caption element or a summary attribute with text content.',
            TITLE_MANUAL:            'TABLE 2T: Data tables may need to have either a caption element or a summary attribute with text content.',
            MESSAGE_PASS:            'TABLE 2T: Data table has the caption element or a summary attribute of "%1".',
            MESSAGE_VIOLATION:       'TABLE 2T: Data table is missing a caption element and summary attribute with text content, the  have either a caption element or a summary attribute with text content.',
            MESSAGE_RECOMMENDATION:  'TABLE 2T: Data table is missing a caption element and summary attribute with text content, the should have either a caption element or a summary attribute with text content.',
            MESSAGE_MANUAL:          'TABLE 2T: Data table is missing a caption element and summary attribute with text content, the may need to have either a caption element or a summary attribute with text content.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 2T: Table is not a data table, and therefore should not have a caption element.',
            MESSAGE_HIDDEN:          'TABLE 2T: Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2S: {
            TITLE:                   'TABLE 2S: If a page has only one data table, the rule tests to see if the table has an effective caption element with content (at least one printable character)',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table.',
            MESSAGE_PASS:            'TABLE 2S: Data table has the effective caption: "%1".',
            MESSAGE_VIOLATION:       'TABLE 2S: The effective caption is missing or is empty, a data table must have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_RECOMMENDATION:  'TABLE 2S: The effective caption is missing or is empty, a data table should have a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_MANUAL:          'TABLE 2S: The effective caption is missing or is empty, a data table may need a caption element, aria-label attribute, or arial-labelledby attribute with references to text content that describe the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 2S: Table is not a data table, and therefore should not have an effective caption.',
            MESSAGE_HIDDEN:          'TABLE 2S: Table is hidden from users of assistive technologies, so rule was not evaluated.'
        },
        TABLE_2M: {
            TITLE:                   'TABLE 2M: If there is more than one data table, the rule tests if each table has an effective caption',
            PURPOSE:                 'It is important to provide an effective caption for a table to identify the purpose of the table and to disern the table from other tables on the page.',
            MESSAGE_PASS:            'TABLE 2M: Table has an effective caption: "%1"',
            MESSAGE_VIOLATION:       'TABLE 2M: Since there is more than one data table, the table must have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_RECOMMENDATION:  'TABLE 2M: Since there is more than one data table, the table should have a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_MANUAL:          'TABLE 2M: Since there is more than one data table, the table may need a caption element, an arial-label attribute, or an aria-labelledby attribute to create an effective caption.',
            MESSAGE_ONLY_ONE:        'TABLE 2M: There is only one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'TABLE 2M: The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 2M: The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_3: {
            TITLE:                    'TABLE 3: If a table is a data table, the rule tests if the effective caption text content is different from the effective summary text content',
            PURPOSE:                  'It is important to provide an unique effective captions to more easily disern a table from other tables on the page.',
            MESSAGE_UNIQUE:           'TABLE 3: The effective caption "%1" is unique from the effective summary "%2".',
            MESSAGE_NOT_UNIQUE:       'TABLE 3: The effective caption "%1" is the same as the effective summary "%2", the effective caption should be used to describe the purpose of the table and the effective summary information about the data in the table or conclusions the author intended to be understood from viewing the data.',
            MESSAGE_HIDDEN:           'TABLE 3: Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_MISSING:          'TABLE 3: Either or both of the effective caption or effective summary are either not defined or are empty, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:   'TABLE 3: Table is not a data table, rule does not apply.'
        },
        TABLE_4: {
            TITLE:                  'TABLE 4: If a table is a data table, the rule tests if the heading cells are th element, instead of td element with a scope attribute',
            PURPOSE:                'Using the TH element is a much clearer way of identifying header cells than using the TD element with the SCOPE attribute.',
            MESSAGE_IS_TH:          'TABLE 4: Heading cell is a th element.',
            MESSAGE_VIOLATION:      'TABLE 4: Heading cell is NOT a th element, all headings must use th element.',
            MESSAGE_RECOMMENDATION: 'TABLE 4: Heading cell is NOT a th element, all headings should use th element.',
            MESSAGE_HIDDEN:         'TABLE 4: Table is hidden from users of assistive technologies, so rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE: 'TABLE 4: Table is not a data table, rule does not apply.'
        },
        TABLE_5: {
            TITLE:                   'TABLE 6: For each data table, the rule tests if the table has an effective summary',
            PURPOSE:                 'It is important to provide a description of the content or point of the data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:            'TABLE 6: Table has an effective caption: "%1"',
            MESSAGE_VIOLATION:       'TABLE 6: The effective caption is missing or empty, the table must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:  'TABLE 6: The effective caption is missing or empty, the table should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:          'TABLE 6: The effective caption is missing or empty, the table may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MORE_THAN_ONE:   'TABLE 6: There is more than one visible data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:          'TABLE 6: The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 6: The table is not a data table, so the rule was not evaluated.'
        },
        TABLE_6: {
            TITLE:                             'TABLE 8: If a table is a complex data table, the rule tests if header cells have ids and if they are unique',
            PURPOSE:                           'Complex data tables require much more specific definition of header cells for each data cell and using IDs on the header cells is required for identifying the header cells.',
            MESSAGE_PASS:                      'TABLE 8: Table header cell has unique ID',
            MESSAGE_NO_CONTENT:                'TABLE 8: Table header cell does not contain content, it is unsual for a header cell to not have content.',
            MESSAGE_NOT_UNIQUE_VIOLATION:      'TABLE 8: Table header cell has duplicate ID: "%1\", header cells in complex tables must have unique ids.',
            MESSAGE_NOT_UNIQUE_RECOMMENDATION: 'TABLE 8: Table header cell has duplicate ID: "%1\", header cells in complex tables should have unique ids.',
            MESSAGE_NOT_UNIQUE_MANUAL:         'TABLE 8: Table header cell has duplicate ID: "%1\", header cells in complex tables may need unique ids.',
            MESSAGE_NO_ID_VIOLATON:            'TABLE 8: Table header cell is missing an ID attribute, header cells in complex tables must have an id.',
            MESSAGE_NO_ID_RECOMMENDATION:      'TABLE 8: Table header cell is missing an ID attribute, header cells in complex tables should have an id.',
            MESSAGE_NO_ID_MANUAL:              'TABLE 8: Table header cell is missing an ID attribute, header cells in complex tables may need an id.',
            MESSAGE_HIDDEN:                    'TABLE 8: Table header cell is hidden hidden from assistive technologies, rule was not evaluated.',
            MESSAGE_TABLE_PASS:                'TABLE 8: All %1 header cells have unique ids.',
            MESSAGE_TABLE_MISSING_HEADERS:     'TABLE 8: %1 header cells of %2 header cells in the table have missing or dulicate ID values.',
            MESSAGE_TABLE_DATA_TABLE:          'TABLE 8: Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:        'TABLE 8: Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:              'TABLE 8: The table is hidden from people using assistive technologies.'
        },
        TABLE_7: {
            TITLE:                          'TABLE 9: If a table is a complex data table, the rule tests if TD elements have a headers attribute that point to TH elements in the same table',
            PURPOSE:                        'Complex data tables require much more specific definition of header cells for each data cell and using the HEADERS attribute on each data cell is required for identifying the header cells.',
            MESSAGE_HAS_HEADERS:            'TABLE 9: Cell has headers attribute with values.',
            MESSAGE_MISSING_VIOLATION:      'TABLE 9: Headers attribute is missing or empty, data cells in complex data tables must have a headers attribute.',
            MESSAGE_MISSING_RECOMMENDATION: 'TABLE 9: Headers attribute is missing or empty, data cells in complex data tables should have a headers attribute.',
            MESSAGE_MISSING_MANUAL:         'TABLE 9: Headers attribute is missing or empty, data cells in complex data tables may need a headers attribute',
            MESSAGE_DATA_CELL_IS_EMPTY:     'TABLE 9: Table cell is empty, check to see if it needs headers, or if the empty cell could contain data',
            MESSAGE_HEADER_CELL:            'TABLE 9: Cell is a header cell, so rule was not evaluated',
            MESSAGE_TABLE_PASS:             'TABLE 9: All %1 data cells with content have headers.',
            MESSAGE_TABLE_MISSING_HEADERS:  'TABLE 9: %1 data cells with content out of %2 are missing headers.',
            MESSAGE_TABLE_DATA_TABLE:       'TABLE 9: Simple data table, rule only applies to complex data tables.',
            MESSAGE_TABLE_LAYOUT_TABLE:     'TABLE 9: Layout table, rule only applies to complex data tables.',
            MESSAGE_TABLE_HIDDEN:           'TABLE 9: The table is hidden from people using assistive technologies.'
        },
        TABLE_8: {
            TITLE:                          'TABLE 10: If a table is a complex data table, the rule tests if it has an effective summary.',
            PURPOSE:                        'It is critical to provide a description of the content or point of the data in a complex data table content so that people using speech do not have to read all the cells.',
            MESSAGE_PASS:                   'TABLE 10: Complex data table has the effective summary "%1"',
            MESSAGE_VIOLATION:              'TABLE 10: Complex data tables must have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_RECOMMENDATION:         'TABLE 10: Complex data tables should have a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_MANUAL:                 'TABLE 10: Complex data tables may need a summary attribute or an aria-describedby attribute to create effective summary.',
            MESSAGE_HIDDEN:                 'TABLE 10: The table is hidden from people using assistive technologies, so the rule was not evaluated.',
            MESSAGE_NOT_COMPLEX_DATA_TABLE: 'TABLE 10: The table is not complex data table, so the rule was not evaluated.',
            MESSAGE_NOT_DATA_TABLE:         'TABLE 10: The table is a layout table, so rule was not evaluated.'
        },
        LAYOUT_1: {
            TITLE:                    'LAYOUT 1: If a table is a layout table, the rule tests for nesting of tables that are more than one column wide.',
            PURPOSE:                  'The nesting of layout tables often results in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS_NOT_NESTED:  'LAYOUT 1: Layout table is not nested in another table',
            MESSAGE_PASS_ONE_COLUMN:  'LAYOUT 1: Layout table is only one column wide',
            MESSAGE_VIOLATION:        'LAYOUT 1: Layout table is %1 columns wide, and nested %2 level(s), nested data tables must only be one column wide.',
            MESSAGE_RECOMMENDATION:   'LAYOUT 1: Layout table is %1 columns wide, and nested %2 level(s), nested data tables should only be one column wide.',
            MESSAGE_MANUAL:           'LAYOUT 1: Layout table is %1 columns wide, and nested %2 level(s), nested data tables may need to only be one column wide.',
            MESSAGE_NOT_LAYOUT_TABLE: 'LAYOUT 1: The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'LAYOUT 1: The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_2: {
            TITLE:                    'LAYOUT 2: If a table is a layout table that is more than 1 column wide, the content needs to be meaningful when table markup is ignored.',
            PURPOSE:                  'The use of layout tables can result in content being read using speech to be read out of the intended reading order of the author.',
            MESSAGE_PASS:             'LAYOUT 2: The layout table is only one column wide.',
            MESSAGE_VIOLATION:        'LAYOUT 2: The page content must be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_RECOMMENDATION:   'LAYOUT 2: The page content should be meaningful when the %1 column by %2 row table markup is disabled.',
            MESSAGE_NOT_LAYOUT_TABLE: 'LAYOUT 2: The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'LAYOUT 2: The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        LAYOUT_3: {
            TITLE:                    'LAYOUT 3: If the table is a layout table, the rule test the table element and all of its children for role="presentation"',
            PURPOSE:                  'The use of role=presentation on table markup makes it easier for people using assistive technology to ignore the table markup.',
            MESSAGE_PASS:             'LAYOUT 3: The %1 element has role="presentation".',
            MESSAGE_VIOLATION:        'LAYOUT 3: The %1 element must use the attribute role="presentation".',
            MESSAGE_RECOMMENDATION:   'LAYOUT 3: The %1 element should use the attribute role="presentation".',
            MESSAGE_NOT_LAYOUT_TABLE: 'LAYOUT 3: The table is a data table, so the rule was not evaluated.',
            MESSAGE_HIDDEN:           'LAYOUT 3: The table is hidden from people using assistive technologies, so the rule was not evaluated'
        },
        TITLE_1: {
            MESSAGE_HAS_TITLE: 'TITLE 1: Document has a TITLE element with content.',
            MESSAGE_NO_TITLE:  'TITLE 1: Document TITLE element is missing or empty.',
            TITLE:             'TITLE 1: Document needs a title element with content.'
        },
        TITLE_2: {
            MESSAGE_H1_IS_NOT_LABEL: 'TITLE 2: H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_H1_IS_LABEL:     'TITLE 2: H1 element is a label for a MAIN landmark.',
            MESSAGE_NO_ROLE_MAIN:    'TITLE 2: No MAIN landmarks on the page, rule for H1 elements does not apply.',
            MESSAGE_HIDDEN:          'TITLE 2: H1 element is hidden from assistive technology, so will not be seen.',
            TITLE:                   'TITLE 2: If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark.'
        },    
        TITLE_3: {
            MESSAGE_H1_IS_LABEL:  'TITLE 3: The H1 element is a label for a MAIN landmark.',
            MESSAGE_H1_NOT_LABEL: 'TITLE 3: The H1 element is NOT a label for a MAIN landmark.',
            MESSAGE_HIDDEN:       'TITLE 3: The H1 element is hidden to assistive technologies.',
            TITLE:                'TITLE 3: If there are both H1 elements and MAIN landmarks the H1 elements should only be used as labels for MAIN landmarks'
        }

   }
});
