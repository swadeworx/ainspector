
//
// OpenAjax Alliance IITAA 1.0 Ruleset National Language Support (NLS): English
//

OpenAjax.a11y.addNLSForRuleset('IITAA_1_0', 'en-us',
  {
	  name : 'IITAA 1.0',
	  description : 'Illinois Information Technology Accessibility Act 1.0',
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
    //  IITAA 1.0 requirements National Language Support (NLS)
    //
    requirements : {
     '1.1' : {
                 label : '1.1 Use valid, standard web programming code.',
                 description : 'For web pages, indicate the programming language you are using by starting your code with a standard document type declaration',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.1',
                 references  : [],
               },
     '1.2' : {
                 label : '1.2 Use appropriate markup to convey document structure.',
                 description : 'Identify headings, paragraphs, lists, quotations, etc., using the appropriate markup instead of relying solely on formatting. For example, use <h1> tags to identify the top-level heading rather than simply making its text large and bold. Do not misuse structural markup for formatting effects, such as using <blockquote> to indent a paragraph. Use Cascading Style Sheets (CSS) for formatting.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.2',
                 references  : [],
               },
     '1.3' : {
                 label : '1.3 Provide meaningful page titles.',
                 description : 'Every web page should have a title. The title should indicate both the name of the site and the topic of the page and should be unique within the site whenever possible.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.3',
                 references  : [],
               },
     '1.4' : {
                 label : '1.4 Use headings to introduce sections and sub-sections, and use them in the correct order.',
                 description : 'Start the main content area of each page with an <h1> heading that indicates the topic of the page as identified in the page title. If the page is long enough to be divided into sections, group each section in a <div> and begin each <div> with a heading of the appropriate level.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.4',
                 references  : [],
               },
     '1.5' : {
                 label : '1.5 Use lists to identify series of related items, including navigation menus.',
                 description : 'Use ordered lists (<ol>) when the sequence of items is important; use unordered lists (<ul>) when the order does not matter. Use Cascading Style Sheets (CSS) to control the appearance of numbers and bullets, but do not use bullets on ordered lists or number-styles on unordered lists.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web1.5',
                 references  : [],
               },
     '2.1' : {
                 label : '2.1 Use text to display text, unless formatting that cannot be achieved with CSS is required.',
                 description : 'Whenever possible, use actual text instead of images of text. Cascading Style Sheets (CSS) can be used to achieve specific sizes, colors, or effects. Text that requires exact formatting, such as logos and/or other branding elements, are appropriate exceptions.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.1',
                 references  : [],
               },
     '2.2' : {
                 label : '2.2 Use relative sizes for fonts.',
                 description : 'Set font sizes using relative measurements or avoid setting font sizes altogether.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.2',
                 references  : [],
               },
     '2.3' : {
                 label : '2.3 Identify the language of text.',
                 description : 'Use the lang attribute on the <html> element to identify the primary language of each document, for example, <html lang="en">, for English. Use the lang attribute on <span> or other elements to identify words or phrases in other languages. For example, a Spanish phrase within an English document could be coded as: <span lang="es">se habla espanol</span>.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.3',
                 references  : [],
               },
     '2.4' : {
                 label : '2.4 Use images instead of "ASCII art."',
                 description : 'Use images with appropriate alternate text instead of ASCII art.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web2.4',
                 references  : [],
               },
     '3.1' : {
                 label : '3.1 Do not convey information with color alone.',
                 description : 'Whenever color is used as an indicator, use a non-color-based indicator as well. For example, required form fields could be identified with an icon (an image with appropriate alternate text) in the label, as well as with color.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web3.1',
                 references  : [],
               },
     '3.2' : {
                 label : '3.2 Use contrasting foreground and background colors.',
                 description : 'For text, use dark colors on light backgrounds, or vice versa. Avoid combinations of red and green as well as busy background images. Text must have a contrast ratio of at least 3:1.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web3.2',
                 references  : [],
               },
     '4.1' : {
                 label : '4.1 Provide appropriate "alternate text" for all images.',
                 description : 'ALL images must have appropriate alternate text. As a rule of thumb, consider what you might say if you were reading the web page to someone over the telephone. You do not need to include the words "image of" or "graphic of."',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web4.1',
                 references  : [],
               },
     '4.2' : {
                 label : '4.2 Provide full descriptions for graphs, diagrams, and other meaningful images.',
                 description : 'Present a full description of a meaningful image either on the page on which the image appears or through a link immediately preceding or following the image. Use alternate text to provide a concise name for the image. For example, the alternate text of a graph should state its title and the full description should summarize its trends and/or present a table of its data.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web4.2',
                 references  : [],
               },
     '5.1' : {
                 label : '5.1 Provide alternate text for each area in client-side image maps.',
                 description : 'Use alternate text that indicates the function or destination of the link for each area of a client-side image map. The image itself should have alternate text that indicates the overall function of the image map.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web5.1',
                 references  : [],
               },
     '5.2' : {
                 label : '5.2 Use client-side image maps',
                 description : 'Whenever possible, use client-side image maps instead of server-side image maps. If server-side image maps must be used, provide an accessible alternative that includes the same content and functionality. In cases where it is impossible to create an equivalent accessible version, such as with some geographical imaging and mapping systems, exceptions may be necessary.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web5.2',
                 references  : [],
               },
     '6.1' : {
                 label : '6.1 Do not convey information with sound alone.',
                 description : 'Whenever significant information is provided by sound, include a visual indicator that provides the same information as well.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.1',
                 references  : [],
               },
     '6.2' : {
                 label : '6.2 Do not automatically play audio.',
                 description : 'Do not automatically play audio for more than 3 seconds. Provide a means for users to start audio playback when they desire (e.g., a "play" button).',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.2',
                 references  : [],
               },
     '6.3' : {
                 label : '6.3 Provide text transcripts for audio',
                 description : 'Provide a link to an HTML or text transcript of any audio presented on a web site. Transcripts should be posted at the same time the audio is made available. Communication Access Realtime Translation (CART) providers can transcribe live events.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web6.3',
                 references  : [],
               },
     '7.1' : {
                 label : '7.1 Provide synchronized captions',
                 description : 'Whenever possible, captions should be implemented using Synchronized Multimedia Integration Language (SMIL) If multimedia contains essential audio but no essential video, a text transcript may be provided instead of captions.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web7.1',
                 references  : [],
               },
     '7.2' : {
                 label : '7.2 Provide audio descriptions',
                 description : 'Carefully consider whether audio descriptions are necessary to present the significant information of a multimedia recording. Many speech-intensive events, such as speeches, lectures, or conferences, do not contain essential video and, therefore, do not need audio description. When necessary, audio descriptions are usually best implemented by a professional "audio describer".',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web7.2',
                 references  : [],
               },
     '8.1' : {
                 label : '8.1 Pausing any moving, blinking, scrolling, or auto-updating information.',
                 description : 'Avoid animation and movement unless it provides significant additional information. If animation is used, provide a means of pausing the animation.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web8.1',
                 references  : [],
               },
     '8.2' : {
                 label : '8.2 Do not include content that flashes faster than 3 times per second.',
                 description : 'Do not include content that flashes faster than 3 times per second.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web8.2',
                 references  : [],
               },
     '9.1' : {
                 label : '9.1 Ensure that links are understandable out of context.',
                 description : 'Use link text that is clear and unambiguous. Link text should usually match the title of the page to which the link points. Ensure that links that point to the same URL use the same link text, and that links that point to different URLs use different link text. If title attributes are used, repeat the text of the link as the beginning of the title, followed by the additional information.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.1',
                 references  : [],
               },
     '9.2' : {
                 label : '9.2 Provide a means of skipping past repetitive navigation links.',
                 description : 'Provide a link at the beginning of navigation lists that points to a target at the beginning of the main content area of the page. This link must be visible to screen reader and keyboard users, but can be hidden from other users.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.2',
                 references  : [],
               },
     '9.3' : {
                 label : '9.3 Avoid using small links.',
                 description : 'Make sure that images used for links are reasonably large, preferably 16 pixels by 16 pixels or larger. Use standard or enlarged font sizes for text links, and avoid using text links that are shorter than 4 characters in length. Avoid placing small links close together.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.3',
                 references  : [],
               },
     '9.4' : {
                 label : '9.4 Ensure that same-page links move keyboard focus as well as screen focus.',
                 description : 'To ensure that same-page links work correctly in Internet Explorer 5, 6 & 7, set tabindex="-1" on same-page link targets.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web9.4',
                 references  : [],
               },
     '10.1' : {
                 label : '10.1 Provide labels or titles for all form fields.',
                 description : 'Use a <label> element whenever possible to identify each form field\'s label. Set the label element\'s for attribute to match the corresponding field\'s id, or a title attribute to any form field that cannot be associated with a <label>. Because screen readers typically recognize either the <label> or the title (not both), the title must provide the full label, and a <label> should not be associated with the field.  For buttons (<input type="submit|reset|button">), use the value attribute to provide a label; for image buttons (<input type="image">), use the alt attribute for the label. ',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.1',
                 references  : [],
               },
     '10.2' : {
                 label : '10.2 Provide legends for groups of form fields.',
                 description : 'If possible, group related fields within a <fieldset> element and provide the group name or "question" in the fieldset\'s <legend>. If a fieldset cannot be used, apply a title attribute to each field in the group including the group name and the field\'s label. Because screen readers typically recognize either the <label> or the title (not both), the <label> elements should not be associated with their fields when using this technique. Also note that groups of radio buttons (and sometimes checkboxes) can usually be replaced by a single drop-down list or list box (<select>) with the "question" as the <label> and the "answers" as <option> elements.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.2',
                 references  : [],
               },
     '10.3' : {
                 label : '10.3 Ensure that form fields are in a logical tab order.',
                 description : 'Make sure that fields appear in logical order in the HTML code or use the tabindex attribute on each field to set the appropriate order.  Note: Any element with a positive tabindex will come before all elements without tabindex in the tab order. As a result, tabindex must usually be applied to all or none of the focusable elements on a page.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.3',
                 references  : [],
               },
     '10.4' : {
                 label : '10.4 Avoid placing non-focusable text between form fields.',
                 description : 'Instructions should be given within field labels if possible. If instructions are too long to fit within labels, they should be provided in an instructions section before the beginning of the form. If neither of these approaches works, consider using a technique to make the text elements focusable.  Note that disabled form fields (disabled="disabled") are non-focusable; fields may be made read-only (readonly="readonly") to keep them focusable.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.4',
                 references  : [],
               },
     '10.5' : {
                 label : '10.5 Ensure that text in form fields can be enlarged.',
                 description : 'To ensure that text in form fields can be easily resized in Internet Explorer 5, 6 & 7, include a style rule such as the following: input, select, textarea, button { font-size: 100%; }',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web10.5',
                 references  : [],
               },
     '11.1' : {
                 label : '11.1 Identify a header cell for each column and row in simple data tables.',
                 description : 'Use <th> elements with scope="col" (for column headers) or scope="row" (for row headers) to identify column and row header cells. The cell that contains the most uniquely identifying information for the column or row should be the header; usually, this should be the first cell of each column and row. Do not include unnecessary columns or rows for formatting.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.1',
                 references  : [],
               },
     '11.2' : {
                 label : '11.2 Identify relationships in complex data tables using id and headers attributes.',
                 description : 'Whenever possible, simplify complex tables by re-arranging or dividing them into separate tables. If a table cannot be simplified, use a unique id attribute on each header cell, for example: <th id="header1">, and a headers attributes on each data cell to list the id attributes of header cells that it relates to, for example: <td headers="header1 header2 header3">. Do not include unnecessary columns, rows, colspans, or rowspans for formatting.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.2',
                 references  : [],
               },
     '11.3' : {
                 label : '11.3 Provide summary attributes for data tables.',
                 description : 'Provide the name of the table in the summary attribute of the <table> tag. A brief description of the content and structure of the table may also be included in the summary. (No summary should be used if a table is used for layout.)',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web11.3',
                 references  : [],
               },
     '12.1' : {
                 label : '12.1 Provide concise, unique, and understandable titles for frames.',
                 description : 'Give each frame and iframe a concise, unique, understandable title attribute that indicates the frame\'s function and is unique within the frameset. Do not include the word "frame." Set the <title> element of each page contained within a frame to match its title attribute or to identify the current content of that frame.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web12.1',
                 references  : [],
               },
     '12.2' : {
                 label : '12.2 Avoid using hidden, empty, or non-essential frames.',
                 description : 'Use frames sparingly. If a frame is not necessary for page content, eliminate it. Minimize the nesting of frames. Recognize that information in hidden frames may be read by screen readers.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web12.2',
                 references  : [],
               },
     '13.1' : {
                 label : '13.1 Ensure that scripted functions are usable with assistive technologies.',
                 description : 'Whenever scripts are used, it is the responsibility of the page developer to thoroughly test using assistive technologies to ensure that all information and functionality is accessible. Testing should confirm that content is usable with system large fonts and high contrast display settings, that interface elements are focusable and operable using the keyboard, that tab and reading order are appropriate, and that all content can be identified and operated with leading assistive technology tools. If there is any doubt, err on the safe side by ensuring that the essential elements of the page do not rely on scripts.  Scripting features that are purely decorative and do not present any significant information or functionality do not need to be made accessible.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.1',
                 references  : [],
               },
     '13.2' : {
                 label : '13.2 Ensure that significant interactions can be performed with both keyboard and mouse.',
                 description : 'Whenever using a mouse-only event (e.g., onmouseover, onmouseout) to trigger a significant script action, use the corresponding keyboard event (e.g., onfocus, onblur). Ensure that scripts are attached to elements that can receive keyboard focus, such as links and form fields.  Also, make sure that keyboard events do not unintentionally trigger script actions. For example, when a keyboard user arrows through the options in a drop-down list (<select>), the onchange event fires once for each option; if a script attached to this event reloads the page (or causes some other significant change), it may be impossible for a keyboard user to operate the control.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.2',
                 references  : [],
               },
     '13.3' : {
                 label : '13.3 Avoid changing focus unexpectedly.',
                 description : 'In most cases, changes to focus, location, or the current window should be initiated by a user activating (clicking) a link or button. If changes are initiated by other actions, make sure that there is an obvious cause-and-effect relationship between the action and the change. If changes are not likely to be expected, it may be necessary to provide explicit instructions to users before the changes occur.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.3',
                 references  : [],
               },
     '13.4' : {
                 label : '13.4 Avoid changing content unexpectedly.',
                 description : 'In most cases, content should only be changed or added after the current point of focus in the tab/reading order. For example, if entering a value in a field causes text to appear, the text should appear after that field in the tab/reading order. It is also important to ensure that changes happen quickly enough that they are complete before the user reaches the changed element. For example, if selecting an item from a list box changes the value in a subsequent field, the change must be complete before the focus moves to the subsequent field. If content is changed above the user\'s focus, or if changes occur slowly enough that a user may move past the changed element before the change is complete, it may be necessary to provide an alert box or other instruction to direct the user to the changed element.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web13.4',
                 references  : [],
               },
     '14.1' : {
                 label : '14.1 Use accessible embedded objects whenever possible.',
                 description : 'Check with the manufacturer and/or developer to determine if and how the technology can be made accessible.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web14.1',
                 references  : [],
               },
     '14.2' : {
                 label : '14.2 If an inaccessible embedded object must be used, provide an accessible alternative that includes the same content and functionality.',
                 description : 'Wherever an inaccessible object is embedded, also provide or link to an accessible version. Make sure that the information and functionality is completely equivalent and up-to-date. Be sure to consider whether the inaccessible version is actually necessary. In cases where it is impossible to create an equivalent accessible version, such as with some geographical imaging and mapping systems, exceptions may be necessary.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web14.2',
                 references  : [],
               },
     '15.1' : {
                 label : '15.1 Provide natively accessible downloadable documents whenever possible.',
                 description : 'Check with the manufacturer and/or publisher of the format of a downloadable document to determine if and how it can be made accessible. If accessibility techniques exist, ensure that the downloadable document fully implements these techniques and meets the functional performance criteria defined in these standards.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web15.1',
                 references  : [],
               },
     '15.2' : {
                 label : '15.2 If a downloadable document cannot be made natively accessible, provide an accessible alternative that includes the same content and functionality.',
                 description : 'Wherever a link is provided to an inaccessible document, also provide a link to an accessible version, preferably in HTML format. Make sure that the information and functionality is completely equivalent and up-to-date. Be sure to consider whether the inaccessible version is actually necessary. If an accessible alternative cannot be provided electronically, provide information on how to obtain an alternate format (e.g., large print, Braille, audio recording) in a timely manner.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web15.2',
                 references  : [],
               },
     '16.1' : {
                 label : '16.1 Notify users of time limits and provide a means to extend time if possible.',
                 description : 'Provide a clear explanation of any time limits. If possible, offer the user a way to extend or remove the limits. Avoid using time limits unnecessarily.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web16.1',
                 references  : [],
               },
     '16.2' : {
                 label : '16.2 Do not automatically refresh the current page.',
                 description : 'Do not use http-equiv="refresh". If necessary, provide a link or control to allow the user to refresh a page at his or her discretion.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web16.2',
                 references  : [],
               },
     '17.1' : {
                 label : '17.1 When using tables for layout, ensure that reading order is logical.',
                 description : 'Avoid using tables for layout whenever possible. If tables are used for layout, check the reading order by following the order in which the table cells appear in the code. If necessary, restructure the table to achieve an appropriate reading order.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.1',
                 references  : [],
               },
     '17.2' : {
                 label : '17.2 When using style sheets for layout, ensure that reading order is logical.',
                 description : 'Check the reading order by following the order in which elements appear in the HTML code. Adjust the reading order by rearranging the order in which elements are defined in the code.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.2',
                 references  : [],
               },
     '17.3' : {
                 label : '17.3 Avoid horizontal scrolling.',
                 description : 'Design pages so that they can resize to fit the width of the user\'s browser. Use relative widths and check for horizontal scrolling using a screen resolution of 800 by 600 pixels. If scrolling cannot be avoided, place the least important content in the rightmost part of the page.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web17.3',
                 references  : [],
               },
     '18.1' : {
                 label : '18.1 Use separate accessible versions only as a last resort.',
                 description : 'Follow these standards to develop a single site that is universally accessible and efficient to maintain.',
               url         : 'http://www.dhs.state.il.us/IITAA/IITAAWebImplementationGuidelines.html#web18.1',
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



