
OpenAjax.a11y.addNLSForRuleset('WCAG_2_0', 'en-us', 
  {
        //
        // OpenAjax Alliance Current WCAG 2.0 Ruleset National Language Support (NLS): English
        //

      name : 'WCAG 2.0',
	  description : 'Web Content Accessibility Guidelines v2.0',
	  version: '0.9 Beta',
	
	  severities : {
    	'level.pass'                    : 'Pass',
    'level.violation' : 'Violation',
    'level.potentialViolation' : 'Potential Violation',
    'level.recommendation' : 'Recommendation',
    	'level.potentialRecommendation' : 'Potential Recommendation'
	  },

	  priorities : {
    	'priority.p1' : 'First Priorty',
    	'priority.p2' : 'Second Priority',
    	'priority.p3' : 'Third Priority',
	  },
		
    requirements : {
     '1.1.1' : {
                 label : '1.1.1 Non-text Content',
                 description : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
               },
     '1.2.1' : {
                 label : '1.2.1 Audio-only and Video-only (Prerecorded)',
                 description : 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
               },
     '1.2.2' : {
                 label : '1.2.2 Captions (Prerecorded)',
                 description : 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
               },
     '1.2.3' : {
                 label : '1.2.3 Audio Description or Media Alternative (Prerecorded)',
                 description : 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
               },
     '1.2.4' : {
                 label : '1.2.4 Captions (Live)',
                 description : 'Captions are provided for all live audio content in synchronized media. ',
               },
     '1.2.5' : {
                 label : '1.2.5 Audio Description (Prerecorded)',
                 description : 'Audio description is provided for all prerecorded video content in synchronized media.',
               },
     '1.2.6' : {
                 label : '1.2.6 Sign Language (Prerecorded)',
                 description : 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
               },
     '1.2.7' : {
                 label : '1.2.7 Extended Audio Description (Prerecorded)',
                 description : 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
               },
     '1.2.8' : {
                 label : '1.2.8 Media Alternative (Prerecorded)',
                 description : 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
               },
     '1.2.9' : {
                 label : '1.2.9 Audio-only (Live)',
                 description : 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
               },
     '1.3.1' : {
                 label : '1.3.1 Info and Relationships',
                 description : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
               },
     '1.3.2' : {
                 label : '1.3.2 Meaningful Sequence',
                 description : 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
               },
     '1.3.3' : {
                 label : '1.3.3 Sensory Characteristics',
                 description : 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
               },
     '1.4.1' : {
                 label : '1.4.1 Use of Color',
                 description : 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
               },
     '1.4.2' : {
                 label : '1.4.2 Audio Control',
                 description : 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
               },
     '1.4.3' : {
                 label : '1.4.3 Contrast (Minimum)',
                 description : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
               },
     '1.4.4' : {
                 label : '1.4.4 Resize text',
                 description : 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
               },
     '1.4.5' : {
                 label : '1.4.5 Images of Text',
                 description : 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
               },
     '1.4.6' : {
                 label : '1.4.6 Contrast (Enhanced)',
                 description : 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
               },
     '1.4.7' : {
                 label : '1.4.7 Low or No Background Audio',
                 description : 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
               },
     '1.4.8' : {
                 label : '1.4.8 Visual Presentation',
                 description : 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
               },
     '1.4.9' : {
                 label : '1.4.9 Images of Text (No Exception)',
                 description : 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
               },
     '2.1.1' : {
                 label : '2.1.1 Keyboard',
                 description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
               },
     '2.1.2' : {
                 label : '2.1.2 No Keyboard Trap',
                 description : 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
               },
     '2.1.3' : {
                 label : '2.1.3 Keyboard (No Exception)',
                 description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
               },
     '2.2.1' : {
                 label : '2.2.1 Timing Adjustable',
                 description : 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
               },
     '2.2.2' : {
                 label : '2.2.2 Pause, Stop, Hide',
                 description : 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
               },
     '2.2.3' : {
                 label : '2.2.3 No Timing',
                 description : 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
               },
     '2.2.4' : {
                 label : '2.2.4 Interruptions',
                 description : 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
               },
     '2.2.5' : {
                 label : '2.2.5 Re-authenticating',
                 description : 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
               },
     '2.3.1' : {
                 label : '2.3.1 Three Flashes or Below Threshold',
                 description : 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
               },
     '2.3.2' : {
                 label : '2.3.2 Three Flashes',
                 description : 'Web pages do not contain anything that flashes more than three times in any one second period.',
               },
     '2.4.1' : {
                 label : '2.4.1 Bypass Blocks',
                 description : 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
               },
     '2.4.2' : {
                 label : '2.4.2 Page Titled',
                 description : 'Web pages have titles that describe topic or purpose.',
               },
     '2.4.3' : {
                 label : '2.4.3 Focus Order',
                 description : 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
               },
     '2.4.4' : {
                 label : '2.4.4 Link Purpose (In Context)',
                 description : 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
               },
     '2.4.5' : {
                 label : '2.4.5 Multiple Ways',
                 description : 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
               },
     '2.4.6' : {
                 label : '2.4.6 Headings and Labels',
                 description : 'Headings and labels describe topic or purpose.',
               },
     '2.4.7' : {
                 label : '2.4.7 Focus Visible',
                 description : 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
               },
     '2.4.8' : {
                 label : '2.4.8 Location',
                 description : 'Information about the user\'s location within a set of Web pages is available.',
               },
     '2.4.9' : {
                 label : '2.4.9 Link Purpose (Link Only)',
                 description : 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
               },
     '2.4.10' : {
                 label : '2.4.10 Section Headings',
                 description : 'Section headings are used to organize the content.',
               },
     '3.1.1' : {
                 label : '3.1.1 Language of Page',
                 description : 'The default human language  of each Web page  can be programmatically determined. ',
               },
     '3.1.2' : {
                 label : '3.1.2 Language of Parts',
                 description : 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
               },
     '3.1.3' : {
                 label : '3.1.3 Unusual Words',
                 description : 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
               },
     '3.1.4' : {
                 label : '3.1.4 Abbreviations',
                 description : 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
               },
     '3.1.5' : {
                 label : '3.1.5 Reading Level',
                 description : 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
               },
     '3.1.6' : {
                 label : '3.1.6 Pronunciation',
                 description : 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
               },
     '3.2.1' : {
                 label : '3.2.1 On Focus',
                 description : 'When any component receives focus, it does not initiate a change of context.',
               },
     '3.2.2' : {
                 label : '3.2.2 On Input',
                 description : 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
               },
     '3.2.3' : {
                 label : '3.2.3 Consistent Navigation',
                 description : 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
               },
     '3.2.4' : {
                 label : '3.2.4 Consistent Identification',
                 description : 'Components that have the same functionality within a set of Web pages are identified consistently.',
               },
     '3.2.5' : {
                 label : '3.2.5 Change on Request',
                 description : 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
               },
     '3.3.1' : {
                 label : '3.3.1 Error Identification',
                 description : 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
               },
     '3.3.2' : {
                 label : '3.3.2 Labels or Instructions',
                 description : 'Labels or instructions are provided when content requires user input.',
               },
     '3.3.3' : {
                 label : '3.3.3 Error Suggestion',
                 description : 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
               },
     '3.3.4' : {
                 label : '3.3.4 Error Prevention (Legal, Financial, Data)',
                 description : 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
               },
     '3.3.5' : {
                 label : '3.3.5 Help',
                 description : 'Context-sensitive help is available.',
               },
     '3.3.6' : {
                 label : '3.3.6 Error Prevention (All)',
                 description : 'For Web pages that require the user to submit information, at least one of the following is true',
               },
     '4.1.1' : {
                 label : '4.1.1 Parsing Content',
                 description : 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
               },
     '4.1.2' : {
                 label : '4.1.2 Name, Role, Value',
                 description : 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
               },

    },
	
    rules : {
             'message_1' : { message: 'Non-decorative images that convey meaning must have valid alt text.' },
             'message_2' : { message: 'An image file name may not be specified for valid alternative text.' },
             'message_3' : { message: 'Alt text containing the words image, picture, graph, photo are not valid for an image.' },
             'message_4' : { message: 'Make sure the alt attribute length is >= alt_min_length and <= alt_max_length.' },
             'message_5' : { message: 'The longdesc must point to a legitimate alternative resource (e.g. an .html file).' },
             'message_6' : { message: 'If an image has an alt or title attribute, it should not have a presentation role.' },
             'message_7' : { message: 'Data tables must use summary attribute to describe the content of the table or conclusions the author intends to convey through the data in the table.' },
             'message_8' : { message: 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows.' },
             'message_9' : { message: 'For each data table on the page, the summary attribute content must be unique.' },
             'message_10' : { message: 'For complex data tables, the th elements must have ids.' },
             'message_11' : { message: 'For complex data tables, the th element\'s ids must be unique. ID (%1$S) is not unique.' },
             'message_12' : { message: 'For complex data tables, the td elements must have headers attributes that point to associated th header ids.' },
             'message_13' : { message: 'For complex data tables, the ID(s) (%1$S) referenced by td element headers attribute must be found on the page.' },
             'message_14' : { message: 'Nested tables should not be used to layout content, use CSS for position' },
             'message_15' : { message: 'Foreground background color contrast ratio must be > 3 for large text' },
             'message_16' : { message: 'Foreground background color contrast ratio should be > 4.5' },
             'message_17' : { message: 'Do not use the FONT element to style text' },
             'message_18' : { message: 'Each focusable element with an onmouseover attribute should also have an onfocus attribute, and their associated event handlers should trigger the same or similar actions.' },
             'message_19' : { message: 'Each focusable element with an onmouseout attribute should also have an onblur attribute, and their associated event handlers should trigger the same or similar actions.' },
             'message_20' : { message: 'Every onClick event handler should be on a focusable element.' },
             'message_21' : { message: 'onChange event handler should not be used with the select element to cause a automatic change of focus or load a web page.' },
             'message_22' : { message: 'The functionality provided by onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents to perform the same functions that can be achieved with the mouse actions.' },
             'message_73' : { message: 'A non-form (e.g. input, button, select and textarea elements) or non-anchor element (e.g. \'a\' element) has a onKeyXXX, onMouseXXX or onClick event handler and does not have a role attribute or the role value is not a valid ARIA role value.' },
             'message_74' : { message: 'An element that includes onMouseXXX event handlers and ACTIVE-DESCENDANT attribute defined, must have a onKeyDown or onKeyPress event handlers.' },
             'message_75' : { message: 'An element with ACTIVE-DESCENDANT attribute defined and is not disabled (e.g. aria-disabled=true), must have a tabindex value greater than or equal to 0.' },
             'message_76' : { message: 'An element with a role attribute with a container role value, is not disabled (e.g. aria-disabled=true) and does NOT have the ACTIVE-DESCENDANT attribute defined, must have at least one child element with a tabindex value greater than or equal to 0.' },
             'message_77' : { message: 'Widgets that are not disabled and does not have the \'aria-activedescendant\' attribute, must have at least an keyboard event on the element or a child role element.' },
             'message_23' : { message: 'Accesskey attribute values should be unique.' },
             'message_24' : { message: 'Accesskey attribute values should not interfere with Microsoft Internet Explorer menu shortcuts. The menu shortcuts for English version of Internet Explorer 7 are: A, E, F, H, T and V.' },
             'message_25' : { message: 'The blink and marquee elements must not be used. Blinking and moving text are an accessibility problems for people with photosenstive epilepsy and visual impairments.' },
             'message_26' : { message: 'Every frame element must have a title attribute with content that describes the purpose of the frame.' },
             'message_27' : { message: 'The title attribute for each frame must be unique within a frameset.' },
             'message_28' : { message: 'Hidden or empty frames should not be used.' },
             'message_29' : { message: 'The page should contain exactly one title element and the title element should not be empty.' },
             'message_30' : { message: 'Missing or empty H1 element.' },
             'message_31' : { message: 'The text content of an h1 element should not come solely from the alt attribute of img elements.' },
             'message_32' : { message: 'The words contained in each h1 element should match a subset of the words contained in the title element. Words (%1$S) in h1 elements should also be in the title element.' },
             'message_33' : { message: 'The page should contain no more than two h1 elements.' },
             'message_61' : { message: 'Title content should be concise (usually 60 or fewer characters in length).' },
             'message_62' : { message: 'Title text must contain more than one word.' },
             'message_34' : { message: 'Avoid using text links that are shorter than four 4 characters in length.' },
             'message_35' : { message: 'Ensure that links that point to the same HREF use the same link text.' },
             'message_36' : { message: 'Ensure that links that point to different HREFs use different link text.' },
             'message_37' : { message: 'Avoid using images that are smaller than 16 pixels by 16 pixels as links.' },
             'message_38' : { message: 'If a link includes an img element and text content, and the words in the alt attribute content of the img element match the words in the text content of the link, then the alt attribute content should be set to be empty.' },
             'message_39' : { message: 'Each heading element (h1..h6) must have text content.' },
             'message_40' : { message: 'Each subheading element (h2..h6) should have text content exclusive of the alt text of any img elements it contains.' },
             'message_41' : { message: 'Heading content should be concise (usually 65 or fewer characters in length).' },
             'message_42' : { message: 'Heading elements that follow the last h1 should be properly nested.' },
             'message_43' : { message: 'The content of the headings of the same level within the same section should be unique.' },
             'message_44' : { message: 'Heading elements (h1..h6) should be used for structuring information on the page.' },
             'message_45' : { message: 'Each page must have a lang attribute on its html element.' },
             'message_46' : { message: 'lang attribute on html element must have a valid two-character language code.' },
             'message_47' : { message: 'Each fieldset element should contain a legend element.' },
             'message_48' : { message: 'The label element should not encapsulate select and textarea elements.' },
             'message_49' : { message: 'Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.' },
             'message_50' : { message: 'Input element of type=[image] must have an alt or a title attribute.' },
             'message_51' : { message: 'Input elements where type=[button|submit|reset] must have a value or title attribute.' },
             'message_52' : { message: 'Each button element must contain content.' },
             'message_53' : { message: 'Each effective label (legend + label) should be unique.' },
             'message_54' : { message: 'Each label element must have text content.' },
             'message_55' : { message: 'Each legend element must have text content.' },
             'message_56' : { message: 'If the title attribute is defined for an input, select, textarea or button element it must also contain content since it will be used by assistive technologies as part of the effective label for the form control.' },
             'message_57' : { message: 'ID (%1$S) is not unique. If a form control has an id attribute its value must be unique on the page.' },
             'message_58' : { message: 'Do not use the B element to style text.' },
             'message_59' : { message: 'Do not use the I element to style text.' },
             'message_60' : { message: 'Do not use the U element to style text.' },
             'message_64' : { message: 'attribute %1$S must use a predetermined value %2$S.' },
             'message_65' : { message: 'attribute %1$S must use a predetermined value %2$S.' },
             'message_66' : { message: '%1$S is not a global aria state/property, it may only be used in conjunction with certain roles.' },
             'message_63' : { message: 'ARIA attribute %1$S is cannot be used with role=%2$S.' },
             'message_67' : { message: 'The role %1$S must contain role %2$S.' },
             'message_68' : { message: 'The role %1$S must be contained by an element with role %2$S.' },
             'message_69' : { message: 'The role %1$S must have property %2$S.' },
             'message_70' : { message: 'The role %1$S must have property %2$S.' },
             'message_71' : { message: 'The value %1$S is not a valid role.' },
             'message_72' : { message: 'The attribute %1$S is not a recognized ARIA attribute.' },

    },
  }
);



        

