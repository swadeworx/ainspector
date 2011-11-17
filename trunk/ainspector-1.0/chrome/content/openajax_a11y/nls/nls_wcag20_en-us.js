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
/* OpenAjax Alliance WCAG 2.0 Ruleset National Language Support (NLS): English */
/* --------------------------------------------------------------------------- */
   

OpenAjax.a11y.addNLSForRuleset('WCAG_2_0', 'en-us', {
    name: 'WCAG 2.0',
    description: 'Web Content Accessibility Guidelines v2.0',
    version: 'beta',
    date: '2011-05-13',

    /**
     * Level of important of a requirement
     */
    levels: {
        'LEVEL_A': 'A', // Most important requirements
        'LEVEL_AA': 'AA', // Important requirements
        'LEVEL_AAA': 'AAA' // Lower importance requirements
    },

    /**
     * Severity of not passing a rule for a particular requirement set, like WCAG 2.0
     */
    severities: ['not applicable',
                 'Pass',
                 'Violation',  // Content is hidden and not tested for accessibility
                 'Recommendation',
                 'Manual Evaluation',
                 'Warning',
                 'Hidden',
                 'Informational',
                 'Not Evaluated'
    ],  


    /**
     * Relative implementation priorities of complying to rule requirements
     */
    priorities:[ 'First Priority', 'Second Priority', 'Third Priority'],

    /**
     * Status of a rule for evaluating a requirement
     */
    status: ['Proposed', 'Accepted', 'Deprecated'],

    /**
     * Types of rule references to a requirement
     */
    references: ['Requirement', 'Coding Technique', 'Manual Evaluation', 'Best Practice', 'Authoring Technique', 'Other'],

    /**
     * Abbreviation for the types of rule references to a requirement
     */
    reference_abbreviations: ['R', 'C', 'ME', 'BP', 'A', 'O'],

    /**
     * Abbreviation for the types of rule references to a requirement
     */
    reference_media_contants: ['Undefined', 'No', 'Maybe', 'Yes'],

    /**
     *   WCAG 2.0 Success Criteria (i.e. requirements) National Language Support (NLS)
     */
    requirements: {
        //
        // Requirement 1.1.1 Non-text Content
        //
        '1.1.1': {
            label: '1.1.1 Non-text Content',
            description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
            url: 'http://www.w3.org/TR/WCAG20/#text-equiv',
            references:[ {
                type: OpenAjax.a11y.REFERENCES.BEST_PRACTICE, 
                title: 'Test 3', 
                url: 'http://test3.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.MANUAL_EVALUATION, 
                title: 'Test 4', 
                url: 'http://test4.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.OTHER, 
                title: 'Test 5', 
                url: 'http://test5.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.REQUIREMENT, 
                title: 'Test 1', 
                url: 'http://test1.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.AUTHORING_TECHNIQUE, 
                title: 'Test 1', 
                url: 'http://test1.org'
            },
            {
                type: OpenAjax.a11y.REFERENCES.CODING_TECHNIQUE, 
                title: 'Test 2', 
                url: 'http://test2.org'
            }]
        },
        //
        // Requirement 1.2.1 Audio-only and Video-only (Prerecorded)
        //
        '1.2.1': {
            label: '1.2.1 Audio-only and Video-only (Prerecorded)',
            description: 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
            references: []
        },
        //
        // Requirement 1.2.2 Captions (Prerecorded)
        //
        '1.2.2': {
            label: '1.2.2 Captions (Prerecorded)',
            description: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
            references: []
        },
        //
        // Requirement 1.2.3 Audio Description or Media Alternative (Prerecorded)
        //
        '1.2.3': {
            label: '1.2.3 Audio Description or Media Alternative (Prerecorded)',
            description: 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
            references: []
        },
        //
        // Requirement 1.2.4 Captions (Live)
        //
        '1.2.4': {
            label: '1.2.4 Captions (Live)',
            description: 'Captions are provided for all live audio content in synchronized media. ',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
            references: []
        },
        //
        // Requirement 1.2.5 Audio Description (Prerecorded)
        //
        '1.2.5': {
            label: '1.2.5 Audio Description (Prerecorded)',
            description: 'Audio description is provided for all prerecorded video content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
            references: []
        },
        //
        // Requirement 1.2.6 Sign Language (Prerecorded)
        //
        '1.2.6': {
            label: '1.2.6 Sign Language (Prerecorded)',
            description: 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
            references: []
        },
        //
        // Requirement 1.2.7 Extended Audio Description (Prerecorded)
        //
        '1.2.7': {
            label: '1.2.7 Extended Audio Description (Prerecorded)',
            description: 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
            references: []
        },
        //
        // Requirement 1.2.8 Media Alternative (Prerecorded)
        //
        '1.2.8': {
            label: '1.2.8 Media Alternative (Prerecorded)',
            description: 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
            references: []
        },
        //
        // Requirement 1.2.9 Audio-only (Live)
        //
        '1.2.9': {
            label: '1.2.9 Audio-only (Live)',
            description: 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
            url: 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
            references: []
        },
        //
        // Requirement 1.3.1 Info and Relationships
        //
        '1.3.1': {
            label: '1.3.1 Info and Relationships',
            description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
            references: []
        },
        //
        // Requirement 1.3.2 Meaningful Sequence
        //
        '1.3.2': {
            label: '1.3.2 Meaningful Sequence',
            description: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
            references: []
        },
        //
        // Requirement 1.3.3 Sensory Characteristics
        //
        '1.3.3': {
            label: '1.3.3 Sensory Characteristics',
            description: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
            url: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
            references: []
        },
        //
        // Requirement 1.4.1 Use of Color
        //
        '1.4.1': {
            label: '1.4.1 Use of Color',
            description: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
            references: []
        },
        //
        // Requirement 1.4.2 Audio Control
        //
        '1.4.2': {
            label: '1.4.2 Audio Control',
            description: 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
            references: []
        },
        //
        // Requirement 1.4.3 Contrast (Minimum)
        //
        '1.4.3': {
            label: '1.4.3 Contrast (Minimum)',
            description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
            references: []
        },
        //
        // Requirement 1.4.4 Resize text
        //
        '1.4.4': {
            label: '1.4.4 Resize text',
            description: 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
            references: []
        },
        //
        // Requirement 1.4.5 Images of Text
        //
        '1.4.5': {
            label: '1.4.5 Images of Text',
            description: 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
            references: []
        },
        //
        // Requirement 1.4.6 Contrast (Enhanced)
        //
        '1.4.6': {
            label: '1.4.6 Contrast (Enhanced)',
            description: 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
            references: []
        },
        //
        // Requirement 1.4.7 Low or No Background Audio
        //
        '1.4.7': {
            label: '1.4.7 Low or No Background Audio',
            description: 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
            url: 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
            references: []
        },
        //
        // Requirement 1.4.8 Visual Presentation
        //
        '1.4.8': {
            label: '1.4.8 Visual Presentation',
            description: 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
            references: []
        },
        //
        // Requirement 1.4.9 Images of Text (No Exception)
        //
        '1.4.9': {
            label: '1.4.9 Images of Text (No Exception)',
            description: 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
            url: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
            references: []
        },
        //
        // Requirement 2.1.1 Keyboard
        //
        '2.1.1': {
            label: '2.1.1 Keyboard',
            description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
            references: []
        },
        //
        // Requirement 2.1.2 No Keyboard Trap
        //
        '2.1.2': {
            label: '2.1.2 No Keyboard Trap',
            description: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
            references: []
        },
        //
        // Requirement 2.1.3 Keyboard (No Exception)
        //
        '2.1.3': {
            label: '2.1.3 Keyboard (No Exception)',
            description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
            references: []
        },
        //
        // Requirement 2.2.1 Timing Adjustable
        //
        '2.2.1': {
            label: '2.2.1 Timing Adjustable',
            description: 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
            references: []
        },
        //
        // Requirement 2.2.2 Pause, Stop, Hide
        //
        '2.2.2': {
            label: '2.2.2 Pause, Stop, Hide',
            description: 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
            references: []
        },
        //
        // Requirement 2.2.3 No Timing
        //
        '2.2.3': {
            label: '2.2.3 No Timing',
            description: 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
            references: []
        },
        //
        // Requirement 2.2.4 Interruptions
        //
        '2.2.4': {
            label: '2.2.4 Interruptions',
            description: 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
            references: []
        },
        //
        // Requirement 2.2.5 Re-authenticating
        //
        '2.2.5': {
            label: '2.2.5 Re-authenticating',
            description: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
            references: []
        },
        //
        // Requirement 2.3.1 Three Flashes or Below Threshold
        //
        '2.3.1': {
            label: '2.3.1 Three Flashes or Below Threshold',
            description: 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
            references: []
        },
        //
        // Requirement 2.3.2 Three Flashes
        //
        '2.3.2': {
            label: '2.3.2 Three Flashes',
            description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
            references: []
        },
        //
        // Requirement 2.4.1 Bypass Blocks
        //
        '2.4.1': {
            label: '2.4.1 Bypass Blocks',
            description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
            references: []
        },
        //
        // Requirement 2.4.2 Page Titled
        //
        '2.4.2': {
            label: '2.4.2 Page Titled',
            description: 'Web pages have titles that describe topic or purpose.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
            references: []
        },
        //
        // Requirement 2.4.3 Focus Order
        //
        '2.4.3': {
            label: '2.4.3 Focus Order',
            description: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
            references: []
        },
        //
        // Requirement 2.4.4 Link Purpose (In Context)
        //
        '2.4.4': {
            label: '2.4.4 Link Purpose (In Context)',
            description: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
            references: []
        },
        //
        // Requirement 2.4.5 Multiple Ways
        //
        '2.4.5': {
            label: '2.4.5 Multiple Ways',
            description: 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
            references: []
        },
        //
        // Requirement 2.4.6 Headings and Labels
        //
        '2.4.6': {
            label: '2.4.6 Headings and Labels',
            description: 'Headings and labels describe topic or purpose.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
            references: []
        },
        //
        // Requirement 2.4.7 Focus Visible
        //
        '2.4.7': {
            label: '2.4.7 Focus Visible',
            description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
            url: 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
            references: []
        },
        //
        // Requirement 2.4.8 Location
        //
        '2.4.8': {
            label: '2.4.8 Location',
            description: 'Information about the user\'s location within a set of Web pages is available.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
            references: []
        },
        //
        // Requirement 2.4.9 Link Purpose (Link Only)
        //
        '2.4.9': {
            label: '2.4.9 Link Purpose (Link Only)',
            description: 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
            references: []
        },
        //
        // Requirement 2.4.10 Section Headings
        //
        '2.4.10': {
            label: '2.4.10 Section Headings',
            description: 'Section headings are used to organize the content.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
            references: []
        },
        //
        // Requirement 3.1.1 Language of Page
        //
        '3.1.1': {
            label: '3.1.1 Language of Page',
            description: 'The default human language  of each Web page  can be programmatically determined. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
            references:[]
        },
        //
        // Requirement 3.1.2 Language of Parts
        //
        '3.1.2': {
            label: '3.1.2 Language of Parts',
            description: 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
            references:[]
        },
        //
        // Requirement 3.1.3 Unusual Words
        //
        '3.1.3': {
            label: '3.1.3 Unusual Words',
            description: 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
            references:[]
        },
        //
        // Requirement 3.1.4 Abbreviations
        //
        '3.1.4': {
            label: '3.1.4 Abbreviations',
            description: 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
            references:[]
        },
        //
        // Requirement 3.1.5 Reading Level
        //
        '3.1.5': {
            label: '3.1.5 Reading Level',
            description: 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
            references:[]
        },
        //
        // Requirement 3.1.6 Pronunciation
        //
        '3.1.6': {
            label: '3.1.6 Pronunciation',
            description: 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
            references:[]
        },
        //
        // Requirement 3.2.1 On Focus
        //
        '3.2.1': {
            label: '3.2.1 On Focus',
            description: 'When any component receives focus, it does not initiate a change of context.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
            references:[]
        },
        //
        // Requirement 3.2.2 On Input
        //
        '3.2.2': {
            label: '3.2.2 On Input',
            description: 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
            references:[]
        },
        //
        // Requirement 3.2.3 Consistent Navigation
        //
        '3.2.3': {
            label: '3.2.3 Consistent Navigation',
            description: 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
            references:[]
        },
        //
        // Requirement 3.2.4 Consistent Identification
        //
        '3.2.4': {
            label: '3.2.4 Consistent Identification',
            description: 'Components that have the same functionality within a set of Web pages are identified consistently.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
            references:[]
        },
        //
        // Requirement 3.2.5 Change on Request
        //
        '3.2.5': {
            label: '3.2.5 Change on Request',
            description: 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
            references:[]
        },
        //
        // Requirement 3.3.1 Error Identification
        //
        '3.3.1': {
            label: '3.3.1 Error Identification',
            description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
            references:[]
        },
        //
        // Requirement 3.3.2 Labels or Instructions
        //
        '3.3.2': {
            label: '3.3.2 Labels or Instructions',
            description: 'Labels or instructions are provided when content requires user input.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
            references:[]
        },
        //
        // Requirement 3.3.3 Error Suggestion
        //
        '3.3.3': {
            label: '3.3.3 Error Suggestion',
            description: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
            references:[]
        },
        //
        // Requirement 3.3.4 Error Prevention (Legal, Financial, Data)
        //
        '3.3.4': {
            label: '3.3.4 Error Prevention (Legal, Financial, Data)',
            description: 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
            references:[]
        },
        //
        // Requirement 3.3.5 Help
        //
        '3.3.5': {
            label: '3.3.5 Help',
            description: 'Context-sensitive help is available.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
            references:[]
        },
        //
        // Requirement 3.3.6 Error Prevention (All)
        //
        '3.3.6': {
            label: '3.3.6 Error Prevention (All)',
            description: 'For Web pages that require the user to submit information, at least one of the following is true',
            url: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
            references:[]
        },
        //
        // Requirement 4.1.1 Parsing Content
        //
        '4.1.1': {
            label: '4.1.1 Parsing Content',
            description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
            references:[]
        },
        //
        // Requirement 4.1.2 Name, Role, Value
        //
        '4.1.2': {
            label: '4.1.2 Name, Role, Value',
            description: 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
            url: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
            references:[]
        }
    },
    // end requirements


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
            MESSAGE_PASS:            'TABLE 1: The first row contains %1 headers, verify the headers accurately describe the content of the column.',
            MESSAGE_NOT_ALL_HEADERS: 'TABLE 1: Only %1 out of %2 table cells in the first row are headers.',
            MESSAGE_HIDDEN:          'TABLE 1: The table is hidden from people using assistive technologies.',
            TITLE:                   'TABLE 1: If a table is a data table, each table cell in the first row should be either a TH element or TD element with scope=col'
        },
        TABLE_2: {
            MESSAGE_PASS:            'TABLE 2: Data table has the caption "%1", verify the caption accurately describes the purpose of the table.',
            MESSAGE_CAPTION_MISSING: 'TABLE 2: Data table is missing a caption element or the caption is empty, the caption is important for describing the purpose of the table.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 2: Table is not a data table, and therefore should not have a caption.',
            MESSAGE_HIDDEN:          'TABLE 2: Table is hidden from users of assistive technologies, so they will not not know the table is present.',
            TITLE:                   'TABLE 2: If a table is a data table, it must have a caption element and it must have content (at least one printable character)'
        },
        TABLE_3: {
            MESSAGE_PASS:            'TABLE 3: Data table has the summary of "%1", verify the summary accurately describes the purpose or summarizes the content of the table.',
            MESSAGE_SUMMARY_MISSING: 'TABLE 3: Data table is missing a sumary attribute or the summary is empty, the summary is important for describing the purpose and/or the content of the table.',
            MESSAGE_NOT_DATA_TABLE:  'TABLE 3: Table is not a data table, and therefore should not have a summary.',
            MESSAGE_HIDDEN:          'TABLE 3: Table is not a data table or hidden, and therefore should not have a summary.',
            TITLE:                   'TABLE 3: If a table is a data table, it should use summary attribute to describe the content or purpose of tabular data.'
        },
        TABLE_4: {
            MESSAGE_UNIQUE:         'TABLE 4: summary content of the Data table is unique from the caption content.',
            MESSAGE_NOT_UNIQUE:     'TABLE 4: summary content of the Data table must be unique from the caption content.',
            MESSAGE_HIDDEN:         'TABLE 4: The table is hidden from people using assistive technologies.',
            TITLE:          'TABLE 4: If a table has both a caption element/aria-labelledby attribute and a summary/aria-describedby attribute, the summary content must be unique from the caption content'
        },
        TABLE_5: {
            MESSAGE_PASS:   'TABLE 5: Table is a data table with the first row/column has atleast one TH element',
            MESSAGE_FAIL:   'TABLE 5: The first row/column must have atleast one TH element',
            MESSAGE_HIDDEN: 'TABLE 5: The table is hidden from people using assistive technologies.',
            TITLE:          'TABLE 5: If a table is a data table, at least the first row should be TH elements'
        },
        TABLE_6: {
            MESSAGE_PASS:           'TABLE 6: Table header element has unique ID',
            MESSAGE_NO_CONTENT:     'TABLE 6: Table header does not contain content',
            MESSAGE_ID_NOT_UNIQUE:  'TABLE 6: Table header element has duplicate ID: \'%1\'',
            MESSAGE_ID_NOT_DEFINED: 'TABLE 6: Table header element is missing an ID attribute',
            MESSAGE_HIDDEN:         'TABLE 6: Table header is hidden',
            TITLE:                  'TABLE 6: Each TH element with content in a complex table must have an id attribute, whose id value must be unique on the page'
        },
        TABLE_7: {
            MESSAGE_PASS:            'TABLE 7: All data cells have headers.',
            MESSAGE_MISSING_HEADERS: 'TABLE 7: %1 data cells are missing headers.',
            MESSAGE_HIDDEN:          'TABLE 7: The table is hidden from people using assistive technologies.',
            TITLE:                   'TABLE 7: If a table is a complex data table, all the TD elements must have a headers attribute that point to TH elements in the same table'
        },
        TABLE_8: {
            MESSAGE_PASS:   'TABLE 8: Complex data table has the summary attribute with content',
            MESSAGE_FAIL:   'TABLE 8: Each complex data table must have summary attribute with content.',
            MESSAGE_HIDDEN: 'TABLE 8: The table is hidden from people using assistive technologies.',
            MESSAGE_NO_COMPLEX: 'TABLE 8: The table is not complex data table.',
            TITLE:                 'TABLE 8: If a table is a complex data table, it must have a summary attribute with content.'
        },
        TABLE_9: {
            MESSAGE_UNIQUE:     'TABLE 9: The data table summary attribute "%1" is unique, verify that it uniquely describes the contents of the table.',
            MESSAGE_NOT_UNIQUE: 'TABLE 9: The data table summary attrubute "%1" is NOT unique, review the summary content on your data table to help people orient the contents of each data table.',
            TITLE:              'TABLE 9: If there is more than one data table, the summary content must be unique'
        },
        TABLE_10: {
            MESSAGE_UNIQUE:     'TABLE 10: The data table caption element content "%1" is unique, verify that the caption uniquely describes the contents of the table.',
            MESSAGE_NOT_UNIQUE: 'TABLE 10: The data table caption element content "%1" is NOT unique, review the captions on your data to help people orient the contents of each data table.',
            TITLE:              'TABLE 10: If there is more than one data table, the caption content for each caption must be unique on the page'
        },
        TABLE_11: {
            MESSAGE_LAYOUT_INSIDE_DATA: 'TABLE 11: Do not use layout table inside a data table',
            MESSAGE_NESTED_LAYOUT:      'TABLE 11: nested layout tables are larger than 1 column wide',
            MESSAGE_ONE_COLUMN:         'TABLE 11: nested layout tables are 1 column wide',
            MESSAGE_TOP_LEVEL:          'TABLE 11: Top level table is a layout table with %1 rows and %2 columns',
            TITLE:                      'Table 11: Do not use nested tables larger than 1 column wide for positioning content outside of landmarks. Fails with one or more one levels of nesting.'
        },
        TABLE_12: {
            MESSAGE_PASS: 'TABLE 12: ',
            MESSAGE_FAIL: 'TABLE 12: ',
            MESSAGE_NA:   'TABLE 12: ',
            TITLE:        'Table 12: Do not use nested tables more than 1 column wide for positioning within a landmark. Fails with one or more one levels of nesting.'
        },
        TABLE_13: {
            MESSAGE_VERIFY:   'TABLE 13: Verify the content is meaningful as table markup is ignored.',
            MESSAGE_HIDDEN:   'TABLE 13: The table is hidden from people using assistive technologies',
            TITLE:            'Table 13: If tables more than 1 column wide are used for layout, verify the content is meaningful when table markup is ignored.'
        },
        TITLE_1: {
            MESSAGE_HAS_TITLE: 'TITLE 1: Document has a TITLE element with content.',
            MESSAGE_NO_TITLE:  'TITLE 1: Document TITLE element is missing or empty.',
            TITLE:             'TITLE 1: Document needs a title element with content.'
        },
        TITLE_2: {
            MESSAGE_H1_IS_NOT_LABEL: 'TITLE 2: H1 element \'%1\' is NOT a label for a MAIN landmark.',
            MESSAGE_H1_IS_LABEL:     'TITLE 2: H1 element \'%1\' is a label for a MAIN landmark.',
            MESSAGE_HIDDEN:          'TITLE 2: H1 element \'%1\' is hidden from assistive technology, so will not be seen.',
            TITLE:                   'TITLE 2: If a page contains both MAIN landmarks and H1 elements, each H1 element should be a label for a MAIN landmark.'
        },    
        TITLE_3: {
            MESSAGE_USES_H1:      'TITLE 3: The MAIN landmark uses H1 element as a label.',
            MESSAGE_H1_NOT_LABEL: 'TITLE 3: The MAIN landmark has an H1, but NOT used as a label.',
            MESSAGE_NO_H1:        'TITLE 3: MAIN landmark does NOT have an H1 element as a label.',
            MESSAGE_HIDDEN:       'TITLE 3: MAIN landmark is hidden.',
            TITLE:                'TITLE 3: Every MAIN landmark should use the H1 element as a label'
        }

    },
    // end rules

    //
    //  OAA Rule Groups title and message string National Language Support (NLS)
    //
    groups: {
        GROUP_1: {
            title: 'Unassigned Rule',
            description: ''
        },
        GROUP_2: {
            title: 'Landmark and Header Rule',
            description: ''
        },
        GROUP_3: {
            title: 'Data Table Rule',
            description: ''
        },
        GROUP_4: {
            title: 'Image and Area Rule',
            description: ''
        },
        GROUP_5: {
            title: 'Audio and Video Rule',
            description: ''
        },
        GROUP_6: {
            title: 'Form/Widget Rule',
            description: ''
        },
        GROUP_7: {
            title: 'Styling Rule',
            description: ''
        },
        GROUP_8: {
            title: 'Frame Rule',
            description: ''
        },
        GROUP_9: {
            title: 'Scripting Rule',
            description: ''
        },
        GROUP_10: {
            title: 'Layout Rule',
            description: ''
        },
        GROUP_11: {
            title: 'Link Rule',
            description: ''
        },
        GROUP_12: {
            title: 'Language Rule',
            description: ''
        },
        GROUP_13: {
            title: 'Accesskey Rule',
            description: ''
        }
    }
});
