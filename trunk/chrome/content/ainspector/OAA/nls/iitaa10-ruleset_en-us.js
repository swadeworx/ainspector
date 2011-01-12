
OpenAjax.a11y.addNLSForRuleset('IITAA_1_0', 'en-us', 
  {
        //
        // OpenAjax Alliance Current IITAA 1.0 Ruleset National Language Support (NLS): English
        //

	  name : 'IITAA 1.0',
	  description : 'Illinois Information Technology Accessibility Act 1.0',
	  version: '0.9 beta',

	  severities : {
    	'level.pass'                    : 'Pass',
    	'level.violation'               : 'Violation',
    	'level.potentialViolation'      : 'Potential Violation',
    	'level.recommendation'          : 'Recommendation',
    	'level.potentialRecommendation' : 'Potential Recommendation'
	  },

	  priorities : {
    	'priority.p1' : 'First Priorty',
    	'priority.p2' : 'Second Priority',
    	'priority.p3' : 'Third Priority',
	  },
	
    requirements : {
     '1.1' : {
                 label : '1.1 Use valid, standard web programming code.',
                 description : 'For web pages, indicate the programming language you are using by starting your code with a standard document type declaration',
               },
     '1.2' : {
                 label : '1.2 Use appropriate markup to convey document structure.',
                 description : 'Identify headings, paragraphs, lists, quotations, etc., using the appropriate markup instead of relying solely on formatting. For example, use <h1> tags to identify the top-level heading rather than simply making its text large and bold. Do not misuse structural markup for formatting effects, such as using <blockquote> to indent a paragraph. Use Cascading Style Sheets (CSS) for formatting.',
               },
     '1.3' : {
                 label : '1.3 Provide meaningful page titles.',
                 description : 'Every web page should have a title. The title should indicate both the name of the site and the topic of the page and should be unique within the site whenever possible.',
               },
     '1.4' : {
                 label : '1.4 Use headings to introduce sections and sub-sections, and use them in the correct order.',
                 description : 'Start the main content area of each page with an <h1> heading that indicates the topic of the page as identified in the page title. If the page is long enough to be divided into sections, group each section in a <div> and begin each <div> with a heading of the appropriate level.',
               },
     '1.5' : {
                 label : '1.5 Use lists to identify series of related items, including navigation menus.',
                 description : 'Use ordered lists (<ol>) when the sequence of items is important; use unordered lists (<ul>) when the order does not matter. Use Cascading Style Sheets (CSS) to control the appearance of numbers and bullets, but do not use bullets on ordered lists or number-styles on unordered lists.',
               },
     '2.1' : {
                 label : '2.1 Use text to display text, unless formatting that cannot be achieved with CSS is required.',
                 description : 'Whenever possible, use actual text instead of images of text. Cascading Style Sheets (CSS) can be used to achieve specific sizes, colors, or effects. Text that requires exact formatting, such as logos and/or other branding elements, are appropriate exceptions.',
               },
     '2.2' : {
                 label : '2.2 Use relative sizes for fonts.',
                 description : 'Set font sizes using relative measurements or avoid setting font sizes altogether.',
               },
     '2.3' : {
                 label : '2.3 Identify the language of text.',
                 description : 'Use the lang attribute on the <html> element to identify the primary language of each document, for example, <html lang="en">, for English. Use the lang attribute on <span> or other elements to identify words or phrases in other languages. For example, a Spanish phrase within an English document could be coded as: <span lang="es">se habla espanol</span>.',
               },
     '2.4' : {
                 label : '2.4 Use images instead of "ASCII art."',
                 description : 'Use images with appropriate alternate text instead of ASCII art.',
               },
     '3.1' : {
                 label : '3.1 Do not convey information with color alone.',
                 description : 'Whenever color is used as an indicator, use a non-color-based indicator as well. For example, required form fields could be identified with an icon (an image with appropriate alternate text) in the label, as well as with color.',
               },
     '3.2' : {
                 label : '3.2 Use contrasting foreground and background colors.',
                 description : 'For text, use dark colors on light backgrounds, or vice versa. Avoid combinations of red and green as well as busy background images. Text must have a contrast ratio of at least 3:1.',
               },
     '4.1' : {
                 label : '4.1 Provide appropriate "alternate text" for all images.',
                 description : 'ALL images must have appropriate alternate text. As a rule of thumb, consider what you might say if you were reading the web page to someone over the telephone. You do not need to include the words "image of" or "graphic of."',
               },
     '4.2' : {
                 label : '4.2 Provide full descriptions for graphs, diagrams, and other meaningful images.',
                 description : 'Present a full description of a meaningful image either on the page on which the image appears or through a link immediately preceding or following the image. Use alternate text to provide a concise name for the image. For example, the alternate text of a graph should state its title and the full description should summarize its trends and/or present a table of its data.',
               },
     '5.1' : {
                 label : '5.1 Provide alternate text for each area in client-side image maps.',
                 description : 'Use alternate text that indicates the function or destination of the link for each area of a client-side image map. The image itself should have alternate text that indicates the overall function of the image map.',
               },
     '5.2' : {
                 label : '5.2 Use client-side image maps',
                 description : 'Whenever possible, use client-side image maps instead of server-side image maps. If server-side image maps must be used, provide an accessible alternative that includes the same content and functionality. In cases where it is impossible to create an equivalent accessible version, such as with some geographical imaging and mapping systems, exceptions may be necessary.',
               },
     '6.1' : {
                 label : '6.1 Do not convey information with sound alone.',
                 description : 'Whenever significant information is provided by sound, include a visual indicator that provides the same information as well.',
               },
     '6.2' : {
                 label : '6.2 Do not automatically play audio.',
                 description : 'Do not automatically play audio for more than 3 seconds. Provide a means for users to start audio playback when they desire (e.g., a "play" button).',
               },
     '6.3' : {
                 label : '6.3 Provide text transcripts for audio',
                 description : 'Provide a link to an HTML or text transcript of any audio presented on a web site. Transcripts should be posted at the same time the audio is made available. Communication Access Realtime Translation (CART) providers can transcribe live events.',
               },
     '7.1' : {
                 label : '7.1 Provide synchronized captions',
                 description : 'Whenever possible, captions should be implemented using Synchronized Multimedia Integration Language (SMIL) If multimedia contains essential audio but no essential video, a text transcript may be provided instead of captions.',
               },
     '7.2' : {
                 label : '7.2 Provide audio descriptions',
                 description : 'Carefully consider whether audio descriptions are necessary to present the significant information of a multimedia recording. Many speech-intensive events, such as speeches, lectures, or conferences, do not contain essential video and, therefore, do not need audio description. When necessary, audio descriptions are usually best implemented by a professional "audio describer".',
               },
     '8.1' : {
                 label : '8.1 Pausing any moving, blinking, scrolling, or auto-updating information.',
                 description : 'Avoid animation and movement unless it provides significant additional information. If animation is used, provide a means of pausing the animation.',
               },
     '8.2' : {
                 label : '8.2 Do not include content that flashes faster than 3 times per second.',
                 description : 'Do not include content that flashes faster than 3 times per second.',
               },
     '9.1' : {
                 label : '9.1 Ensure that links are understandable out of context.',
                 description : 'Use link text that is clear and unambiguous. Link text should usually match the title of the page to which the link points. Ensure that links that point to the same URL use the same link text, and that links that point to different URLs use different link text. If title attributes are used, repeat the text of the link as the beginning of the title, followed by the additional information.',
               },
     '9.2' : {
                 label : '9.2 Provide a means of skipping past repetitive navigation links.',
                 description : 'Provide a link at the beginning of navigation lists that points to a target at the beginning of the main content area of the page. This link must be visible to screen reader and keyboard users, but can be hidden from other users.',
               },
     '9.3' : {
                 label : '9.3 Avoid using small links.',
                 description : 'Make sure that images used for links are reasonably large, preferably 16 pixels by 16 pixels or larger. Use standard or enlarged font sizes for text links, and avoid using text links that are shorter than 4 characters in length. Avoid placing small links close together.',
               },
     '9.4' : {
                 label : '9.4 Ensure that same-page links move keyboard focus as well as screen focus.',
                 description : 'To ensure that same-page links work correctly in Internet Explorer 5, 6 & 7, set tabindex="-1" on same-page link targets.',
               },
     '10.1' : {
                 label : '10.1 Provide labels or titles for all form fields.',
                 description : 'Use a <label> element whenever possible to identify each form field\'s label. Set the label element\'s for attribute to match the corresponding field\'s id, or a title attribute to any form field that cannot be associated with a <label>. Because screen readers typically recognize either the <label> or the title (not both), the title must provide the full label, and a <label> should not be associated with the field.  For buttons (<input type="submit|reset|button">), use the value attribute to provide a label; for image buttons (<input type="image">), use the alt attribute for the label. ',
               },
     '10.2' : {
                 label : '10.2 Provide legends for groups of form fields.',
                 description : 'If possible, group related fields within a <fieldset> element and provide the group name or "question" in the fieldset\'s <legend>. If a fieldset cannot be used, apply a title attribute to each field in the group including the group name and the field\'s label. Because screen readers typically recognize either the <label> or the title (not both), the <label> elements should not be associated with their fields when using this technique. Also note that groups of radio buttons (and sometimes checkboxes) can usually be replaced by a single drop-down list or list box (<select>) with the "question" as the <label> and the "answers" as <option> elements.',
               },
     '10.3' : {
                 label : '10.3 Ensure that form fields are in a logical tab order.',
                 description : 'Make sure that fields appear in logical order in the HTML code or use the tabindex attribute on each field to set the appropriate order.  Note: Any element with a positive tabindex will come before all elements without tabindex in the tab order. As a result, tabindex must usually be applied to all or none of the focusable elements on a page.',
               },
     '10.4' : {
                 label : '10.4 Avoid placing non-focusable text between form fields.',
                 description : 'Instructions should be given within field labels if possible. If instructions are too long to fit within labels, they should be provided in an instructions section before the beginning of the form. If neither of these approaches works, consider using a technique to make the text elements focusable.  Note that disabled form fields (disabled="disabled") are non-focusable; fields may be made read-only (readonly="readonly") to keep them focusable.',
               },
     '10.5' : {
                 label : '10.5 Ensure that text in form fields can be enlarged.',
                 description : 'To ensure that text in form fields can be easily resized in Internet Explorer 5, 6 & 7, include a style rule such as the following: input, select, textarea, button { font-size: 100%; }',
               },
     '11.1' : {
                 label : '11.1 Identify a header cell for each column and row in simple data tables.',
                 description : 'Use <th> elements with scope="col" (for column headers) or scope="row" (for row headers) to identify column and row header cells. The cell that contains the most uniquely identifying information for the column or row should be the header; usually, this should be the first cell of each column and row. Do not include unnecessary columns or rows for formatting.',
               },
     '11.2' : {
                 label : '11.2 Identify relationships in complex data tables using id and headers attributes.',
                 description : 'Whenever possible, simplify complex tables by re-arranging or dividing them into separate tables. If a table cannot be simplified, use a unique id attribute on each header cell, for example: <th id="header1">, and a headers attributes on each data cell to list the id attributes of header cells that it relates to, for example: <td headers="header1 header2 header3">. Do not include unnecessary columns, rows, colspans, or rowspans for formatting.',
               },
     '11.3' : {
                 label : '11.3 Provide summary attributes for data tables.',
                 description : 'Provide the name of the table in the summary attribute of the <table> tag. A brief description of the content and structure of the table may also be included in the summary. (No summary should be used if a table is used for layout.)',
               },
     '12.1' : {
                 label : '12.1 Provide concise, unique, and understandable titles for frames.',
                 description : 'Give each frame and iframe a concise, unique, understandable title attribute that indicates the frame\'s function and is unique within the frameset. Do not include the word "frame." Set the <title> element of each page contained within a frame to match its title attribute or to identify the current content of that frame.',
               },
     '12.2' : {
                 label : '12.2 Avoid using hidden, empty, or non-essential frames.',
                 description : 'Use frames sparingly. If a frame is not necessary for page content, eliminate it. Minimize the nesting of frames. Recognize that information in hidden frames may be read by screen readers.',
               },
     '13.1' : {
                 label : '13.1 Ensure that scripted functions are usable with assistive technologies.',
                 description : 'Whenever scripts are used, it is the responsibility of the page developer to thoroughly test using assistive technologies to ensure that all information and functionality is accessible. Testing should confirm that content is usable with system large fonts and high contrast display settings, that interface elements are focusable and operable using the keyboard, that tab and reading order are appropriate, and that all content can be identified and operated with leading assistive technology tools. If there is any doubt, err on the safe side by ensuring that the essential elements of the page do not rely on scripts.  Scripting features that are purely decorative and do not present any significant information or functionality do not need to be made accessible.',
               },
     '13.2' : {
                 label : '13.2 Ensure that significant interactions can be performed with both keyboard and mouse.',
                 description : 'Whenever using a mouse-only event (e.g., onmouseover, onmouseout) to trigger a significant script action, use the corresponding keyboard event (e.g., onfocus, onblur). Ensure that scripts are attached to elements that can receive keyboard focus, such as links and form fields.  Also, make sure that keyboard events do not unintentionally trigger script actions. For example, when a keyboard user arrows through the options in a drop-down list (<select>), the onchange event fires once for each option; if a script attached to this event reloads the page (or causes some other significant change), it may be impossible for a keyboard user to operate the control.',
               },
     '13.3' : {
                 label : '13.3 Avoid changing focus unexpectedly.',
                 description : 'In most cases, changes to focus, location, or the current window should be initiated by a user activating (clicking) a link or button. If changes are initiated by other actions, make sure that there is an obvious cause-and-effect relationship between the action and the change. If changes are not likely to be expected, it may be necessary to provide explicit instructions to users before the changes occur.',
               },
     '13.4' : {
                 label : '13.4 Avoid changing content unexpectedly.',
                 description : 'In most cases, content should only be changed or added after the current point of focus in the tab/reading order. For example, if entering a value in a field causes text to appear, the text should appear after that field in the tab/reading order. It is also important to ensure that changes happen quickly enough that they are complete before the user reaches the changed element. For example, if selecting an item from a list box changes the value in a subsequent field, the change must be complete before the focus moves to the subsequent field. If content is changed above the user\'s focus, or if changes occur slowly enough that a user may move past the changed element before the change is complete, it may be necessary to provide an alert box or other instruction to direct the user to the changed element.',
               },
     '14.1' : {
                 label : '14.1 Use accessible embedded objects whenever possible.',
                 description : 'Check with the manufacturer and/or developer to determine if and how the technology can be made accessible.',
               },
     '14.2' : {
                 label : '14.2 If an inaccessible embedded object must be used, provide an accessible alternative that includes the same content and functionality.',
                 description : 'Wherever an inaccessible object is embedded, also provide or link to an accessible version. Make sure that the information and functionality is completely equivalent and up-to-date. Be sure to consider whether the inaccessible version is actually necessary. In cases where it is impossible to create an equivalent accessible version, such as with some geographical imaging and mapping systems, exceptions may be necessary.',
               },
     '15.1' : {
                 label : '15.1 Provide natively accessible downloadable documents whenever possible.',
                 description : 'Check with the manufacturer and/or publisher of the format of a downloadable document to determine if and how it can be made accessible. If accessibility techniques exist, ensure that the downloadable document fully implements these techniques and meets the functional performance criteria defined in these standards.',
               },
     '15.2' : {
                 label : '15.2 If a downloadable document cannot be made natively accessible, provide an accessible alternative that includes the same content and functionality.',
                 description : 'Wherever a link is provided to an inaccessible document, also provide a link to an accessible version, preferably in HTML format. Make sure that the information and functionality is completely equivalent and up-to-date. Be sure to consider whether the inaccessible version is actually necessary. If an accessible alternative cannot be provided electronically, provide information on how to obtain an alternate format (e.g., large print, Braille, audio recording) in a timely manner.',
               },
     '16.1' : {
                 label : '16.1 Notify users of time limits and provide a means to extend time if possible.',
                 description : 'Provide a clear explanation of any time limits. If possible, offer the user a way to extend or remove the limits. Avoid using time limits unnecessarily.',
               },
     '16.2' : {
                 label : '16.2 Do not automatically refresh the current page.',
                 description : 'Do not use http-equiv="refresh". If necessary, provide a link or control to allow the user to refresh a page at his or her discretion.',
               },
     '17.1' : {
                 label : '17.1 When using tables for layout, ensure that reading order is logical.',
                 description : 'Avoid using tables for layout whenever possible. If tables are used for layout, check the reading order by following the order in which the table cells appear in the code. If necessary, restructure the table to achieve an appropriate reading order.',
               },
     '17.2' : {
                 label : '17.2 When using style sheets for layout, ensure that reading order is logical.',
                 description : 'Check the reading order by following the order in which elements appear in the HTML code. Adjust the reading order by rearranging the order in which elements are defined in the code.',
               },
     '17.3' : {
                 label : '17.3 Avoid horizontal scrolling.',
                 description : 'Design pages so that they can resize to fit the width of the user\'s browser. Use relative widths and check for horizontal scrolling using a screen resolution of 800 by 600 pixels. If scrolling cannot be avoided, place the least important content in the rightmost part of the page.',
               },
     '18.1' : {
                 label : '18.1 Use separate accessible versions only as a last resort.',
                 description : 'Follow these standards to develop a single site that is universally accessible and efficient to maintain.',
               },

    },
	
    rules : {
             'message_29' : { message: 'The page should contain exactly one title element and the title element should not be empty.' },
             'message_30' : { message: 'Missing or empty H1 element.' },
             'message_31' : { message: 'The text content of an h1 element should not come solely from the alt attribute of img elements.' },
             'message_32' : { message: 'The words contained in each h1 element should match a subset of the words contained in the title element. Words (%1$S) in h1 elements should also be in the title element.' },
             'message_33' : { message: 'The page should contain no more than two h1 elements.' },
             'message_39' : { message: 'Each heading element (h1..h6) must have text content.' },
             'message_40' : { message: 'Each subheading element (h2..h6) should have text content exclusive of the alt text of any img elements it contains.' },
             'message_41' : { message: 'Heading content should be concise (usually 65 or fewer characters in length).' },
             'message_42' : { message: 'Heading elements that follow the last h1 should be properly nested.' },
             'message_43' : { message: 'The content of the headings of the same level within the same section should be unique.' },
             'message_44' : { message: 'Heading elements (h1..h6) should be used for structuring information on the page.' },
             'message_45' : { message: 'Each page must have a lang attribute on its html element.' },
             'message_46' : { message: 'lang attribute on html element must have a valid two-character language code.' },
             'message_1' : { message: 'Non-decorative images that convey meaning must have valid alt text.' },
             'message_2' : { message: 'An image file name may not be specified for valid alternative text.' },
             'message_3' : { message: 'Alt text containing the words image, picture, graph, photo are not valid for an image.' },
             'message_4' : { message: 'Make sure the alt attribute length is >= alt_min_length and <= alt_max_length.' },
             'message_5' : { message: 'The longdesc must point to a legitimate alternative resource (e.g. an .html file).' },
             'message_6' : { message: 'If an image has an alt or title attribute, it should not have a presentation role.' },
             'message_34' : { message: 'Avoid using text links that are shorter than four 4 characters in length.' },
             'message_35' : { message: 'Ensure that links that point to the same HREF use the same link text.' },
             'message_36' : { message: 'Ensure that links that point to different HREFs use different link text.' },
             'message_37' : { message: 'Avoid using images that are smaller than 16 pixels by 16 pixels as links.' },
             'message_38' : { message: 'If a link includes an img element and text content, and the words in the alt attribute content of the img element match the words in the text content of the link, then the alt attribute content should be set to be empty.' },
             'message_26' : { message: 'Every frame element must have a title attribute with content that describes the purpose of the frame.' },
             'message_27' : { message: 'The title attribute for each frame must be unique within a frameset.' },
             'message_28' : { message: 'Hidden or empty frames should not be used.' },
             'message_15' : { message: 'Foreground background color contrast ratio must be > 3 for large text' },
             'message_16' : { message: 'Foreground background color contrast ratio should be > 4.5' },
             'message_17' : { message: 'Do not use the FONT element to style text' },
             'message_23' : { message: 'Accesskey attribute values should be unique.' },
             'message_24' : { message: 'Accesskey attribute values should not interfere with Microsoft Internet Explorer menu shortcuts. The menu shortcuts for English version of Internet Explorer 7 are: A, E, F, H, T and V.' },
             'message_25' : { message: 'The blink and marquee elements must not be used. Blinking and moving text are an accessibility problems for people with photosenstive epilepsy and visual impairments.' },
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
             'message_61' : { message: 'Title content should be concise (usually 60 or fewer characters in length).' },
             'message_62' : { message: 'Title text must contain more than one word.' },
             'message_7' : { message: 'Data tables must use summary attribute to describe the content of the table or conclusions the author intends to convey through the data in the table.' },
             'message_8' : { message: 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows.' },
             'message_9' : { message: 'For each data table on the page, the summary attribute content must be unique.' },
             'message_10' : { message: 'For complex data tables, the th elements must have ids.' },
             'message_11' : { message: 'For complex data tables, the th element\'s ids must be unique. ID (%1$S) is not unique.' },
             'message_12' : { message: 'For complex data tables, the td elements must have headers attributes that point to associated th header ids.' },
             'message_13' : { message: 'For complex data tables, the ID(s) (%1$S) referenced by td element headers attribute must be found on the page.' },
             'message_14' : { message: 'Nested tables should not be used to layout content, use CSS for position' },
             'message_63' : { message: 'ARIA attribute %1$S is cannot be used with role=%2$S.' },
             'message_64' : { message: 'attribute %1$S must use a predetermined value %2$S.' },
             'message_65' : { message: 'attribute %1$S must use a predetermined value %2$S.' },
             'message_66' : { message: '%1$S is not a global aria state/property, it may only be used in conjunction with certain roles.' },
             'message_67' : { message: 'The role %1$S must contain role %2$S.' },
             'message_68' : { message: 'The role %1$S must be contained by an element with role %2$S.' },
             'message_69' : { message: 'The role %1$S must have property %2$S.' },
             'message_70' : { message: 'The role %1$S must have property %2$S.' },
             'message_71' : { message: 'The value %1$S is not a valid role.' },
             'message_72' : { message: 'The attribute %1$S is not a recognized ARIA attribute.' },
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

    },
  }
);



        
