
//
// OpenAjax Alliance WCAG 2.0 Ruleset National Language Support (NLS): English
//

OpenAjax.a11y.addNLSForRuleset('WCAG_2_0', 'en-us',
  {
    name : 'WCAG 2.0',
	  description : 'Web Content Accessibility Guidelines v2.0',
    version: 'beta',
    date: '2011-02-24',

    //
    // Level of important of a requirement
    //
    levels : {
        'LEVEL_A'   : 'A',     // Most important requirements
        'LEVEL_AA'  : 'AA',    // Important requirements
        'LEVEL_AAA' : 'AAA',   // Lower importance requirements
    },

    //
    // Severity of not meeting a requirement
    //
	  severities : {
        'SEVERITY_PASS'                     : 'Pass',
        'SEVERITY_NA'                       : 'N/A',
        'SEVERITY_VIOLATION'                : 'Violation',
        'SEVERITY_POTENTIAL_VIOLATION'      : 'Potential Violation',
        'SEVERITY_RECOMMENDATION'           : 'Recommendation',
        'SEVERITY_POTENTIAL_RECOMMENDATION' : 'Potential Recommendation'
	  },

    //
    // Relative implementation priorities of complying to rule requirements
    //
	  priorities : {
        'PRIORITY_P1' : 'First Priority',
        'PRIORITY_P2' : 'Second Priority',
        'PRIORITY_P3' : 'Third Priority',
	  },

    //
    // Status of a rule for evaluating a requirement
    //
    status : {
        'STATUS_ACCEPTED'   : 'Accepted',
        'STATUS_PROPOSED'   : 'Proposed',
        'STATUS_DEPRECATED' : 'Deprecated',
    },

    //
    //  WCAG 2.0 requirements National Language Support (NLS)
    //
    requirements : {
     '1.1.1' : {
                 label : '1.1.1 Non-text Content',
                 description : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
                 url         : 'http://www.w3.org/TR/WCAG20/#text-equiv',
                 references  : [],
               },
     '1.2.1' : {
                 label : '1.2.1 Audio-only and Video-only (Prerecorded)',
                 description : 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
                 references  : [],
               },
     '1.2.2' : {
                 label : '1.2.2 Captions (Prerecorded)',
                 description : 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
                 references  : [],
               },
     '1.2.3' : {
                 label : '1.2.3 Audio Description or Media Alternative (Prerecorded)',
                 description : 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
                 references  : [],
               },
     '1.2.4' : {
                 label : '1.2.4 Captions (Live)',
                 description : 'Captions are provided for all live audio content in synchronized media. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
                 references  : [],
               },
     '1.2.5' : {
                 label : '1.2.5 Audio Description (Prerecorded)',
                 description : 'Audio description is provided for all prerecorded video content in synchronized media.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
                 references  : [],
               },
     '1.2.6' : {
                 label : '1.2.6 Sign Language (Prerecorded)',
                 description : 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
                 references  : [],
               },
     '1.2.7' : {
                 label : '1.2.7 Extended Audio Description (Prerecorded)',
                 description : 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
                 references  : [],
               },
     '1.2.8' : {
                 label : '1.2.8 Media Alternative (Prerecorded)',
                 description : 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
                 references  : [],
               },
     '1.2.9' : {
                 label : '1.2.9 Audio-only (Live)',
                 description : 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
                 references  : [],
               },
     '1.3.1' : {
                 label : '1.3.1 Info and Relationships',
                 description : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
                 url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
                 references  : [],
               },
     '1.3.2' : {
                 label : '1.3.2 Meaningful Sequence',
                 description : 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
                 url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
                 references  : [],
               },
     '1.3.3' : {
                 label : '1.3.3 Sensory Characteristics',
                 description : 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
                 url         : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
                 references  : [],
               },
     '1.4.1' : {
                 label : '1.4.1 Use of Color',
                 description : 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
                 references  : [],
               },
     '1.4.2' : {
                 label : '1.4.2 Audio Control',
                 description : 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
                 references  : [],
               },
     '1.4.3' : {
                 label : '1.4.3 Contrast (Minimum)',
                 description : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
                 references  : [],
               },
     '1.4.4' : {
                 label : '1.4.4 Resize text',
                 description : 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
                 references  : [],
               },
     '1.4.5' : {
                 label : '1.4.5 Images of Text',
                 description : 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
                 references  : [],
               },
     '1.4.6' : {
                 label : '1.4.6 Contrast (Enhanced)',
                 description : 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
                 references  : [],
               },
     '1.4.7' : {
                 label : '1.4.7 Low or No Background Audio',
                 description : 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
                 url         : 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
                 references  : [],
               },
     '1.4.8' : {
                 label : '1.4.8 Visual Presentation',
                 description : 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
                 references  : [],
               },
     '1.4.9' : {
                 label : '1.4.9 Images of Text (No Exception)',
                 description : 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
                 url         : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
                 references  : [],
               },
     '2.1.1' : {
                 label : '2.1.1 Keyboard',
                 description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
                 references  : [],
               },
     '2.1.2' : {
                 label : '2.1.2 No Keyboard Trap',
                 description : 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
                 references  : [],
               },
     '2.1.3' : {
                 label : '2.1.3 Keyboard (No Exception)',
                 description : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
                 references  : [],
               },
     '2.2.1' : {
                 label : '2.2.1 Timing Adjustable',
                 description : 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
                 references  : [],
               },
     '2.2.2' : {
                 label : '2.2.2 Pause, Stop, Hide',
                 description : 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
                 references  : [],
               },
     '2.2.3' : {
                 label : '2.2.3 No Timing',
                 description : 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
                 references  : [],
               },
     '2.2.4' : {
                 label : '2.2.4 Interruptions',
                 description : 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
                 references  : [],
               },
     '2.2.5' : {
                 label : '2.2.5 Re-authenticating',
                 description : 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
                 references  : [],
               },
     '2.3.1' : {
                 label : '2.3.1 Three Flashes or Below Threshold',
                 description : 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
                 references  : [],
               },
     '2.3.2' : {
                 label : '2.3.2 Three Flashes',
                 description : 'Web pages do not contain anything that flashes more than three times in any one second period.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
                 references  : [],
               },
     '2.4.1' : {
                 label : '2.4.1 Bypass Blocks',
                 description : 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
                 references  : [],
               },
     '2.4.2' : {
                 label : '2.4.2 Page Titled',
                 description : 'Web pages have titles that describe topic or purpose.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
                 references  : [],
               },
     '2.4.3' : {
                 label : '2.4.3 Focus Order',
                 description : 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
                 references  : [],
               },
     '2.4.4' : {
                 label : '2.4.4 Link Purpose (In Context)',
                 description : 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
                 references  : [],
               },
     '2.4.5' : {
                 label : '2.4.5 Multiple Ways',
                 description : 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
                 references  : [],
               },
     '2.4.6' : {
                 label : '2.4.6 Headings and Labels',
                 description : 'Headings and labels describe topic or purpose.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
                 references  : [],
               },
     '2.4.7' : {
                 label : '2.4.7 Focus Visible',
                 description : 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
                 references  : [],
               },
     '2.4.8' : {
                 label : '2.4.8 Location',
                 description : 'Information about the user\'s location within a set of Web pages is available.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
                 references  : [],
               },
     '2.4.9' : {
                 label : '2.4.9 Link Purpose (Link Only)',
                 description : 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
                 references  : [],
               },
     '2.4.10' : {
                 label : '2.4.10 Section Headings',
                 description : 'Section headings are used to organize the content.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
                 references  : [],
               },
     '3.1.1' : {
                 label : '3.1.1 Language of Page',
                 description : 'The default human language  of each Web page  can be programmatically determined. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
                 references  : [],
               },
     '3.1.2' : {
                 label : '3.1.2 Language of Parts',
                 description : 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
                 references  : [],
               },
     '3.1.3' : {
                 label : '3.1.3 Unusual Words',
                 description : 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
                 references  : [],
               },
     '3.1.4' : {
                 label : '3.1.4 Abbreviations',
                 description : 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
                 references  : [],
               },
     '3.1.5' : {
                 label : '3.1.5 Reading Level',
                 description : 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
                 references  : [],
               },
     '3.1.6' : {
                 label : '3.1.6 Pronunciation',
                 description : 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
                 references  : [],
               },
     '3.2.1' : {
                 label : '3.2.1 On Focus',
                 description : 'When any component receives focus, it does not initiate a change of context.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
                 references  : [],
               },
     '3.2.2' : {
                 label : '3.2.2 On Input',
                 description : 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
                 references  : [],
               },
     '3.2.3' : {
                 label : '3.2.3 Consistent Navigation',
                 description : 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
                 references  : [],
               },
     '3.2.4' : {
                 label : '3.2.4 Consistent Identification',
                 description : 'Components that have the same functionality within a set of Web pages are identified consistently.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
                 references  : [],
               },
     '3.2.5' : {
                 label : '3.2.5 Change on Request',
                 description : 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
                 references  : [],
               },
     '3.3.1' : {
                 label : '3.3.1 Error Identification',
                 description : 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
                 references  : [],
               },
     '3.3.2' : {
                 label : '3.3.2 Labels or Instructions',
                 description : 'Labels or instructions are provided when content requires user input.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
                 references  : [],
               },
     '3.3.3' : {
                 label : '3.3.3 Error Suggestion',
                 description : 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
                 references  : [],
               },
     '3.3.4' : {
                 label : '3.3.4 Error Prevention (Legal, Financial, Data)',
                 description : 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
                 references  : [],
               },
     '3.3.5' : {
                 label : '3.3.5 Help',
                 description : 'Context-sensitive help is available.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
                 references  : [],
               },
     '3.3.6' : {
                 label : '3.3.6 Error Prevention (All)',
                 description : 'For Web pages that require the user to submit information, at least one of the following is true',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
                 references  : [],
               },
     '4.1.1' : {
                 label : '4.1.1 Parsing Content',
                 description : 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
                 references  : [],
               },
     '4.1.2' : {
                 label : '4.1.2 Name, Role, Value',
                 description : 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
                 url         : 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
                 references  : [],
               },

    },


    //
    //  OAA Rules title and mesage string National Language Support (NLS)
    //
    rules : {
      'MESSAGE_1' : {
                       message: 'Rule 1 Non-decorative images that convey meaning must have valid alt text.' ,
                       title:   'Rule 1 Images must have valid alt text.' ,
		  },
      'MESSAGE_2' : {
                       message: 'Rule 2 An image file name may not be specified for valid alternative text.' ,
                       title:   'Rule 2 Image file name is not valid alt text.' ,
		  },
      'MESSAGE_3' : {
                       message: 'Rule 3 Alt text containing the words image, picture, graph, photo are not valid for an image.' ,
                       title:   'Rule 3 Certain words cannot be used as a part of valid alt text' ,
		  },
      'MESSAGE_4' : {
                       message: 'Rule 4 Make sure the alt attribute length is >= alt_min_length and <= alt_max_length.' ,
                       title:   'Rule 4 Length of alt text.' ,
		  },
      'MESSAGE_5' : {
                       message: 'Rule 5 The longdesc must point to a legitimate alternative resource (e.g. an .html file).' ,
                       title:   'Rule 5 Longdesc must have valid URI.' ,
		  },
      'MESSAGE_6' : {
                       message: 'Rule 6 If an image has an alt or title attribute, it should not have a presentation role.' ,
                       title:   'Rule 6 If an image has an alt or title attribute, it should not have a presentation role.' ,
                     },
      'MESSAGE_7' : {
                       message: 'Rule 7 Data tables must use summary attribute to describe the content of the table or conclusions the author intends to convey through the data in the table.' ,
                       title:   'Rule 7 Data tables must use summary attribute.' ,
		  },
      'MESSAGE_8' : {
                       message: 'Rule 8 Data tables must use th elements to indicate header cells for the first cell in all the columns or rows.' ,
                       title:   'Rule 8 Data tables must use th elements' ,
		  },
      'MESSAGE_9' : {
                       message: 'Rule 9 For each data table on the page, the summary attribute content must be unique.' ,
                       title:   'Rule 9 Summary attribute content must be unique.' ,
		  },
      'MESSAGE_10' : {
                       message: 'Rule 10 For complex data tables, the th elements must have ids.' ,
                       title:   'Rule 10 Complex data tables must have ids on th elements.' ,
		  },
      'MESSAGE_11' : {
                       message: 'Rule 11 For complex data tables, the th element\'s ids must be unique. ID (%1$S) is not unique.' ,
                       title:   'Rule 11 For complex data tables table ids must be unique.' ,
		  },
      'MESSAGE_12' : {
                       message: 'Rule 12 For complex data tables, the td elements must have headers attributes that point to associated th header ids.' ,
                       title:   'Rule 12 Complex data table td elements must have header attributes.' ,
		  },
      'MESSAGE_13' : {
                       message: 'Rule 13 For complex data tables, the ID(s) (%1$S) referenced by td element headers attribute must be found on the page.' ,
                       title:   'Rule 13 Complex data tables header ids must be on the page.' ,
		  },
      'MESSAGE_14' : {
                       message: 'Rule 14 Nested tables should not be used to layout content, use CSS for position' ,
                       title:   'Rule 14 Do not use nested tables for positioning.' ,
                     },
      'MESSAGE_15' : {
                       message: 'Rule 15 Foreground background color contrast ratio must be > 3 for large text' ,
                       title:   'Rule 15 Color contrast ratio must be > 3 for large text' ,
		  },
      'MESSAGE_16' : {
                       message: 'Rule 16 Foreground background color contrast ratio should be > 4.5' ,
                       title:   'Rule 16 Color contrast ratio should be > 4.5' ,
		  },
      'MESSAGE_17' : {
                       message: 'Rule 17 Do not use the FONT element to style text' ,
                       title:   'Rule 17 Do not use the FONT element to style text' ,
		  },
      'MESSAGE_18' : {
                       message: 'Rule 18 Each focusable element with an onmouseover attribute should also have an onfocus attribute, and their associated event handlers should trigger the same or similar actions.' ,
                       title:   'Rule 18 Focusable elements with MouseOver should also have OnFocus event handlers.' ,
		  },
      'MESSAGE_19' : {
                       message: 'Rule 19 Each focusable element with an onmouseout attribute should also have an onblur attribute, and their associated event handlers should trigger the same or similar actions.' ,
                       title:   'Rule 19 Focusable elements with an OnMouseOut should also have OnBlur event handlers.' ,
		  },
      'MESSAGE_20' : {
                       message: 'Rule 20 Every onClick event handler should be on a focusable element.' ,
                       title:   'Rule 20 Every onClick event handler should be on a focusable element.' ,
		  },
      'MESSAGE_21' : {
                       message: 'Rule 21 onChange event handler should not be used with the select element to cause a automatic change of focus or load a web page.' ,
                       title:   'Rule 21 OnChange event handler should not be used with the select element.' ,
		  },
      'MESSAGE_22' : {
                       message: 'Rule 22 The functionality provided by onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents to perform the same functions that can be achieved with the mouse actions.' ,
                       title:   'Rule 22 onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents.' ,
		  },
      'MESSAGE_23' : {
                       message: 'Rule 23 Accesskey attribute values should be unique.' ,
                       title:   'Rule 23 Accesskey attribute values should be unique.' ,
		  },
      'MESSAGE_24' : {
                       message: 'Rule 24 Accesskey attribute values should not interfere with Microsoft Internet Explorer menu shortcuts. The menu shortcuts for English version of Internet Explorer 7 are: A, E, F, H, T and V.' ,
                       title:   'Rule 24 Accesskey attribute values should not interfere with IE shortcuts. ' ,
		  },
      'MESSAGE_25' : {
                       message: 'Rule 25 The blink and marquee elements must not be used. Blinking and moving text are an accessibility problems for people with photosenstive epilepsy and visual impairments.' ,
                       title:   'Rule 25 The blink and marquee elements must not be used. ' ,
		  },
      'MESSAGE_26' : {
                       message: 'Rule 26 Every frame element must have a title attribute with content that describes the purpose of the frame.' ,
                       title:   'Rule 26 Frame element must have a title attribute.' ,
		  },
      'MESSAGE_27' : {
                       message: 'Rule 27 The title attribute for each frame must be unique within a frameset.' ,
                       title:   'Rule 27 Title attributes for frames must be unique.' ,
		  },
      'MESSAGE_28' : {
                       message: 'Rule 28 Hidden or empty frames should not be used.' ,
                       title:   'Rule 28 Frames should not be hidden or empty.' ,
		  },
      'MESSAGE_29' : {
                       message: 'Rule 29 The page should contain exactly one title element and the title element should not be empty.' ,
                       title:   'Rule 29 Title element should not be empty.' ,
		  },
      'MESSAGE_30' : {
                       message: 'Rule 30 Missing or empty H1 element.' ,
                       title:   'Rule 30 Missing or empty H1 element.' ,
		  },
      'MESSAGE_31' : {
                       message: 'Rule 31 The text content of an h1 element should not come solely from the alt attribute of img elements.' ,
                       title:   'Rule 31 H1 element content should not come only from the alt text of an image.' ,
		  },
      'MESSAGE_32' : {
                       message: 'Rule 32 The words contained in each h1 element should match a subset of the words contained in the title element. Words (%1$S) in h1 elements should also be in the title element.' ,
                       title:   'Rule 32 H1 should match a subset of the words in the title element.' ,
		  },
      'MESSAGE_33' : {
                       message: 'Rule 33 The page should contain no more than two h1 elements.' ,
                       title:   'Rule 33 No more than two h1 elements.' ,
		  },
      'MESSAGE_34' : {
                       message: 'Rule 34 Avoid using text links that are shorter than four 4 characters in length.' ,
                       title:   'Rule 34 Link text should be as least four 4 characters long.' ,
		  },
      'MESSAGE_35' : {
                       message: 'Rule 35 Ensure that links that point to the same HREF use the same link text.' ,
                       title:   'Rule 35 Links with the same HREF should have the same link text.' ,
		  },
      'MESSAGE_36' : {
                       message: 'Rule 36 Ensure that links that point to different HREFs use different link text.' ,
                       title:   'Rule 36 Links that point to different HREFs should have different link text.' ,
		  },
      'MESSAGE_37' : {
                       message: 'Rule 37 Avoid using images that are smaller than 16 pixels by 16 pixels as links.' ,
                       title:   'Rule 37 Images should be at least 16 pixels by 16 pixels when used as links.' ,
		  },
      'MESSAGE_38' : {
                       message: 'Rule 38 If a link includes an img element and text content, and the words in the alt attribute content of the img element match the words in the text content of the link, then the alt attribute content should be set to be empty.' ,
                       title:   'Rule 38 Links with images and text content, the alt attribute should be unique to the text content or empty.' ,
		  },
      'MESSAGE_39' : {
                       message: 'Rule 39 Each heading element (h1..h6) must have text content.' ,
                       title:   'Rule 39 Headings must have text content.' ,
		  },
      'MESSAGE_40' : {
                       message: 'Rule 40 Each subheading element (h2..h6) should have text content exclusive of the alt text of any img elements it contains.' ,
                       title:   'Rule 40 Text content for a headings must not come just from image alt text.' ,
		  },
      'MESSAGE_41' : {
                       message: 'Rule 41 Heading content should be concise (usually 65 or fewer characters in length).' ,
                       title:   'Rule 41 Heading content should be concise.' ,
		  },
      'MESSAGE_42' : {
                       message: 'Rule 42 Heading elements that follow the last h1 should be properly nested.' ,
                       title:   'Rule 42 Heading elements should be properly nested.' ,
		  },
      'MESSAGE_43' : {
                       message: 'Rule 43 The content of the headings of the same level within the same section should be unique.' ,
                       title:   'Rule 43 The content of the headings of the same level within the same section should be unique.' ,
		  },
      'MESSAGE_44' : {
                       message: 'Rule 44 Heading elements (h1..h6) should be used for structuring information on the page.' ,
                       title:   'Rule 44 Heading elements (h1..h6) should be used for structuring information on the page.' ,
		  },
      'MESSAGE_45' : {
                       message: 'Rule 45 Each page must have a lang attribute on its html element.' ,
                       title:   'Rule 45 Each page must have a lang attribute on its html element.' ,
		  },
      'MESSAGE_46' : {
                       message: 'Rule 46 lang attribute on html element must have a valid two-character language code.' ,
                       title:   'Rule 46 lang attribute on html element must have a valid two-character language code.' ,
		  },
      'MESSAGE_47' : {
                       message: 'Rule 47 Each fieldset element should contain a legend element.' ,
                       title:   'Rule 47 Each fieldset element should contain a legend element.' ,
		  },
      'MESSAGE_48' : {
                       message: 'Rule 48 The label element should not encapsulate select and textarea elements.' ,
                       title:   'Rule 48 The label element should not encapsulate select and textarea elements.' ,
		  },
      'MESSAGE_49' : {
                       message: 'Rule 49 Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.' ,
                       title:   'Rule 49 Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.' ,
		  },
      'MESSAGE_50' : {
                       message: 'Rule 50 Input element of type=[image] must have an alt or a title attribute.' ,
                       title:   'Rule 50 Input element of type=[image] must have an alt or a title attribute.' ,
		  },
      'MESSAGE_51' : {
                       message: 'Rule 51 Input elements where type=[button|submit|reset] must have a value or title attribute.' ,
                       title:   'Rule 51 Input elements where type=[button|submit|reset] must have a value or title attribute.' ,
		  },
      'MESSAGE_52' : {
                       message: 'Rule 52 Each button element must contain content.' ,
                       title:   'Rule 52 Each button element must contain content.' ,
		  },
      'MESSAGE_53' : {
                       message: 'Rule 53 Each effective label (legend + label) should be unique.' ,
                       title:   'Rule 53 Effective labels should be unique.' ,
		  },
      'MESSAGE_54' : {
                       message: 'Rule 54 Each label element must have text content.' ,
                       title:   'Rule 54 Labels must have text content.' ,
		  },
      'MESSAGE_55' : {
                       message: 'Rule 55 Each legend element must have text content.' ,
                       title:   'Rule 55 Legends must have text content.' ,
		  },
      'MESSAGE_56' : {
                       message: 'Rule 56 If the title attribute is defined for an input, select, textarea or button element it must also contain content since it will be used by assistive technologies as part of the effective label for the form control.' ,
                       title:   'Rule 56 Title attributes used for labeling form controls must have content.' ,
		  },
      'MESSAGE_57' : {
                       message: 'Rule 57 ID (%1$S) is not unique. If a form control has an id attribute its value must be unique on the page.' ,
                       title:   'Rule 57 Form controls must have unique ids.' ,
		  },
      'MESSAGE_58' : {
                       message: 'Rule 58 Do not use the B element to style text.' ,
                       title:   'Rule 58 Do not use the B element.' ,
		  },
      'MESSAGE_59' : {
                       message: 'Rule 59 Do not use the I element to style text.' ,
                       title:   'Rule 59 Do not use the I element.' ,
		  },
      'MESSAGE_60' : {
                       message: 'Rule 60 Do not use the U element to style text.' ,
                       title:   'Rule 60 Do not use the U element.' ,
		  },
      'MESSAGE_61' : {
                       message: 'Rule 61 Title content should be concise (usually 60 or fewer characters in length).' ,
                       title:   'Rule 61 Title content should be concise.' ,
		  },
      'MESSAGE_62' : {
                       message: 'Rule 62 Title text must contain more than one word.' ,
                       title:   'Rule 62 Title text must contain more than one word.' ,
		  },
      'MESSAGE_63' : {
                       message: 'Rule 63 ARIA attribute %1$S is cannot be used with role=%2$S.' ,
                       title:   'Rule 63 Check aria properties and states for valid roles and properties' ,
		  },
      'MESSAGE_64' : {
                       message: 'Rule 64 attribute %1$S must use a predetermined value %2$S.' ,
                       title:   'Rule 64 ARIA attributes have valid values ' ,
		     },
      'MESSAGE_65' : {
                       message: 'Rule 65 attribute %1$S must use a predetermined value %2$S.' ,
                       title:   'Rule 65 ARIA ID references must be valid IDRefs' ,
		     },
      'MESSAGE_66' : {
                       message: 'Rule 66 %1$S is not a global aria state/property, it may only be used in conjunction with certain roles.' ,
                       title:   'Rule 66 ARIA attributes can only be used with certain roles' ,
		     },
      'MESSAGE_67' : {
                       message: 'Rule 67 The role %1$S must contain role %2$S.' ,
                       title:   'Rule 67 Roles must contain their required child roles' ,
		  },
      'MESSAGE_68' : {
                       message: 'Rule 68 The role %1$S must be contained by an element with role %2$S.' ,
                       title:   'Rule 68 Child roles must be contained by the proper parent role' ,
		  },
      'MESSAGE_69' : {
                       message: 'Rule 69 The role %1$S must have property %2$S.' ,
                       title:   'Rule 69 Required properties and states should be defined' ,
		  },
      'MESSAGE_70' : {
                       message: 'Rule 70 The role %1$S must have property %2$S.' ,
                       title:   'Rule 70 Required properties and states must not be empty' ,
		  },
      'MESSAGE_71' : {
                       message: 'Rule 71 The value %1$S is not a valid role.' ,
                       title:   'Rule 71 Role value must be valid' ,
		  },
      'MESSAGE_72' : {
                       message: 'Rule 72 The attribute %1$S is not a recognized ARIA attribute.' ,
                       title:   'Rule 72 Check that \'ARIA-\' attributes are valid properties and states' ,
                     },
      'MESSAGE_73' : {
                       message: 'Rule 73 A non-form (e.g. input, button, select and textarea elements) or non-anchor element (e.g. \'a\' element) has a onKeyXXX, onMouseXXX or onClick event handler and does not have a role attribute or the role value is not a valid ARIA role value.' ,
                       title:   'Rule 73 Check that non-form and non-anchor elements with event handlers have valid roles.' ,
    },
      'MESSAGE_74' : {
                       message: 'Rule 74 An element that includes onMouseXXX event handlers and ACTIVE-DESCENDANT attribute defined, must have a onKeyDown or onKeyPress event handlers.' ,
                       title:   'Rule 74 Check that elements with mouse event handlers also have key event handlers' ,
		     },
      'MESSAGE_75' : {
                       message: 'Rule 75 An element with ACTIVE-DESCENDANT attribute defined and is not disabled (e.g. aria-disabled=true), must have a tabindex value greater than or equal to 0.' ,
                       title:   'Rule 75 Check that enabled elements with ACTIVE-DESCENDANT have valid tab index' ,
		     },
      'MESSAGE_76' : {
                       message: 'Rule 76 An element with a role attribute with a container role value, is not disabled (e.g. aria-disabled=true) and does NOT have the ACTIVE-DESCENDANT attribute defined, must have at least one child element with a tabindex value greater than or equal to 0.' ,
                       title:   'Rule 76 Check that elements without \'aria-activedescendant\' that have roles requiring a container have focusable children' ,
		     },
      'MESSAGE_77' : {
                       message: 'Rule 77 Widgets that are not disabled and does not have the \'aria-activedescendant\' attribute, must have at least an keyboard event on the element or a child role element.' ,
                       title:   'Rule 77 Check that elements without \'aria-activedescendant\' that have roles requiring a container have key event handlers' ,
		     },
      'MESSAGE_78' : {
                       message: 'Rule 78 Non-decorative images that convey meaning must have descriptive alt text.' ,
                       title:   'Rule 78 ALT text must describe content or purpose of image' ,
		     },
      'MESSAGE_79' : {
                       message: 'Rule 79 If object, embed, applet or audio element is used to include prerecorded audio verify a text transcript of the audio is included or linked to the page.' ,
                       title:   'Rule 79 Prerecorded audio with no video or image tracks needs a text transcript which includes speaker information.' ,
		     },
      'MESSAGE_80' : {
                       message: 'Rule 80 If object, embed, applet or video element is used to include prerecorded video verify a text or audio description of the video is included or linked to the page.' ,
                       title:   'Rule 80 Prerecorded video with no audio track needs text or audio descriptions of the video content.' ,
		     },
      'MESSAGE_81' : {
                       message: 'Rule 81 If object, embed, applet or video element is used to include prerecorded video with audio track verify synchronized text captions are available for the audio track.' ,
                       title:   'Rule 81 Prerecorded video with audio track needs synchronized captions.' ,
		     },
      'MESSAGE_82' : {
                       message: 'Rule 82 If object, embed, applet or video element is used to include prerecorded video with audio track verify audio or text descriptions are available for the video track.' ,
                       title:   'Rule 82 Prerecorded video with audio track needs a audio or text description of the video content.' ,
		     },
      'MESSAGE_83' : {
                       message: 'Rule 83 If object, embed, applet, audio or video element is used to include live audio of speech must have synchronized captions.' ,
                       title:   'Rule 83 Live audio of speech requires realtime captioning of the speakers.' ,
		     },
      'MESSAGE_84' : {
                       message: 'Rule 84 If object, embed, applet or video element is used to include prerecordered video it must have synchronized audio descriptions of the video content.' ,
                       title:   'Rule 84 Synchronized audio descriptons of video.' ,
		     },
      'MESSAGE_85' : {
                       message: 'Rule 85 If object, embed, applet or video element is used to includes audio track it must have synchronized sign language of the audio content.' ,
                       title:   'Rule 85 Synchronized sign language for audio track.' ,
		     },
      'MESSAGE_86' : {
                       message: 'Rule 86 If object, embed, applet or video element is used to includes video and the audio track does not provide suffient time to include audio descriptions, extended audio descriptions of the video must be included.' ,
                       title:   'Rule 86 Extended audio description if audio track does not provided enhough time to fully describe video content.' ,
		     },
      'MESSAGE_87' : {
                       message: 'Rule 87 If object, embed, applet or video element is used to includes video or audio a text alterntive to the audio or video must also be provided.' ,
                       title:   'Rule 87 Text alternative to audio and video content' ,
		     },
      'MESSAGE_88' : {
                       message: 'Rule 88 If object, embed, applet or video element is used to include a live audio track then a text alternative to the live audio should also be provided.' ,
                       title:   'Rule 88 Provide text alternatives to live audio' ,
		     },
      'MESSAGE_89' : {
                       message: 'Rule 89 Verify that color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.' ,
                       title:   'Rule 89 Verify that color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.' ,
		     },

    },

    //
    //  OAA Rule Groups title and message string National Language Support (NLS)
    //
    groups: {
      'GROUP_1' : {
                     title:       'Unassigned Rule' ,
                     description: '' ,
                  },
      'GROUP_2' : {
                     title:       'Landmark and Header Rule' ,
                     description: '' ,
                  },
      'GROUP_3' : {
                     title:       'Data Table Rule' ,
                     description: '' ,
                  },
      'GROUP_4' : {
                     title:       'Image and Area Rule' ,
                     description: '' ,
                  },
      'GROUP_5' : {
                     title:       'Audio and Video Rule' ,
                     description: '' ,
                  },
      'GROUP_6' : {
                     title:       'Form/Widget Rule' ,
                     description: '' ,
                  },
      'GROUP_7' : {
                     title:       'Styling Rule' ,
                     description: '' ,
                  },
      'GROUP_8' : {
                     title:       'Frame Rule' ,
                     description: '' ,
                  },
      'GROUP_9' : {
                     title:       'Scripting Rule' ,
                     description: '' ,
                  },
      'GROUP_10' : {
                     title:       'Layout Rule' ,
                     description: '' ,
                  },
      'GROUP_11' : {
                     title:       'Link Rule' ,
                     description: '' ,
                  },
      'GROUP_12' : {
                     title:       'Language Rule' ,
                     description: '' ,
                  },
      'GROUP_13' : {
                     title:       'Accesskey Rule' ,
                     description: '' ,
		  },

    },

  }
);



