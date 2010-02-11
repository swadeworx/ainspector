// obviously, other ways to do localization (e.g. properties files, different key schema)
OpenAjax.a11y.SEVERITY_CODES = {
    'level.violation' : 'Violation',
    'level.potentialViolation' : 'Potential Violation',
    'level.recommendation' : 'Recommendation',
    'level.potentialRecommendation' : 'Potential Recommendation',
    'level.manual' : 'Manual Check'
};

OpenAjax.a11y.RULESET_CODES = {
	'WCAG20.name' : 'WCAG 2.0',
	'WCAG20.description' : 'Web Content Accessibility Guidelines v2.0',
	
	'1.1.1' : '1.1.1 Non-text Content - Decoration, Formatting, Invisible',
	'WCAG20.description.1_1_1' : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
	'1.3.1' : '1.3.1 Info and Relationships',
	'WCAG20.description.1_3_1' : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
	'1.4.3' : '1.4.3 Contrast (Minimum)',
	'WCAG20.description.1_4_3' : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.',
	'2.1.1' : '2.1.1 Keyboard accessible',
	'WCAG20.description.2_1_1' : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the users movement and not just the endpoints.',
	'2.1.3' : '2.1.3 Keyboard (No Exception)',
	'WCAG20.description.2_1_3' : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
	'2.2.2' : '2.2.2 Pause, Stop, Hide',
	'WCAG20.description.2_2_2' : 'For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential.',
	'2.4.1' : '2.4.1 Bypass Blocks',
	'WCAG20.description.2_4_1' : ' A mechanism is available to bypass blocks of content that are repeated on multiple Web pages. .',
	'2.4.2' : '2.4.2 Page Titled',
	'WCAG20.description.2_4_2' : 'Web pages have titles that describe topic or purpose.',
	'2.4.6' : '2.4.6 Headings and Labels',
	'WCAG20.description.2_4_6' : 'Headings and labels describe topic or purpose.',
	'2.4.4' : '2.4.4 & 2.4.9 Link Purpose',
	'WCAG20.description.2_4_4' : '2.4.4 Link Purpose (In Context): The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.<br><br>2.4.9 Link Purpose (Link Only): A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general. ',
	'3.1.1' : '3.3.1 Language of Page',
	'WCAG20.description.3_1_1' : 'The default human language of each Web page can be programmatically determined. ',	
	'3.3.2' : '3.3.2 Labels or Instructions',
	'WCAG20.description.3_3_2' : 'Labels or instructions are provided when content requires user input. ' ,
	
	'IITAA10.name' : 'IITAA 1.0',
	'IITAA10.description' : 'Illinois Information Technology Accessibility Act Implementation Guidelines for Web-Based Information and Applications 1.0',
	
	'1.1' : '1.1 & 4.1 Alternate text for images ',
	'IITAA10.description.1_1' : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose.',
	'11.1' : '11.1, 11.2, 11.3, 10.1 & 1.5 Tables, form fields, Use lists to items, navigation menus',
	'IITAA10.description.1_3_1' : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
//	'1.4.3' : '1.4.3 Contrast (Minimum)',
//	'WCAG20.description.1_4_3' : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1.',
	'13.2' : '13.2 Keyboard and Mouse',
	'IITAA10.description.13_2' : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the users movement and not just the endpoints.',
//	'2.1.3' : '2.1.3 Keyboard (No Exception)',
//	'IITAA10.description.2_1_3' : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
//	'2.2.2' : '2.2.2 Pause, Stop, Hide',
//	'IITAA10.description.2_2_2' : 'For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential.',
	'9.2' : '9.2 Repetitive navigation links',
	'IITAA10.description.9_2' : ' A mechanism is available to bypass blocks of content that are repeated on multiple Web pages. .',
	'1.3' : '1.3 Provide meaningful page titles',
	'IITAA10.description.1_3' : 'Web pages have titles that describe topic or purpose.',
	'1.4' : '1.4 & 10.2 Headings and labels',
	'IITAA10.description.1_4' : 'Headings and labels describe topic or purpose.',
	'9.1' : '9.1 & 9.3 Links',
	'IITAA10.description.9_1' : '9.1 Link Purpose (In Context): The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.<br><br>2.4.9 Link Purpose (Link Only): A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general. ',
	'2.3' : '2.3 Identify the language of text',
	'IITAA10.description.2_3' : 'The default human language of each Web page can be programmatically determined.',	
	'10.1' : '10.1, 10.4 & 10.5 Forms',
	'IITAA10.description.10_1' : 'Labels or instructions are provided when content requires user input. '	

};
	
OpenAjax.a11y.MESSAGE_CODES = { 
    	//Images warning strings
    	'images.msg.altmissing' : 'Each img element should have alt text.',
    	'images.msg.altother' : 'No alt text provided, but alternate text was found on the title attribute.',
    	'images.msg.imgForStyle' : 'Every img element that is less than 8 pixels high or 8 pixels wide OR has an empty alt attribute value should be removed and CSS techniques should be used for styling content.',
    	'images.msg.altbadlen' : 'If the content of the alt attribute is not empty it should contain at least 7 characters and less than 90 characters. The text should provide people who cannot see the image orientation to the content and purpose of the image in the website.',
    	'images.msg.althasfileext' : 'The alt attribute content should not include file name of the image.',
    	'images.msg.altforbidenword' : 'The alt attribute content should not include redundant information with the img element.',
    	'images.msg.invalidLongdesc' : 'Invalid longdesc attribute; should point to valid static web content',
    	'images.msg.imgPresentationalWithAltOrTitle' : 'Image marked presentational with alt or title attribute present',
    	
    	//Datatable warning strings
    	'dataTables.msg.missingsummary' : 'Data tables must use summary attribute to describe the content of the table or conclusions the author intends to convey through the data in the table. ',
    	'dataTables.msg.missingheaders' : 'Data tables must use th elements to indicate header cells for the first cell in all the columns or rows. ',
    	'dataTables.msg.duplicatesummary' : 'For each data table on the page, the summary attribute content must be unique.',
    	'dataTables.msg.thmissingID' : 'For complex data tables, the th elements must have ids.',
    	'dataTables.msg.duplicateTHEleID' : 'For complex data tables, the th element\'s ids must be unique. ID (%1$S) is not unique.',
    	'dataTables.msg.tdmissingheaders' : 'For complex data tables, the td elements must have headers attributes that point to associated th header ids.',
    	'dataTables.msg.invalidIDREF' : 'For complex data tables, the ID(s) (%1$S) referenced by td element headers attribute was not found on this page.',
    	
    	//ColorContrast warnings
    	'colorcontrast.msg.belowminimal' : 'Contrast ratio is below the minimal acceptable level (3:1) color(%1$S) background-color(%2$S) luminosity(%3$S)',
    	'colorcontrast.msg.belowoptimal' : 'Contrast ratio is below the optimal acceptable level (4.5:1) color(%1$S) background-color(%2$S) luminosity(%3$S)',
    	'colorcontrast.msg.usesFontAttr' : 'Avoid using the deprecated color attribute on HTML elements for specifying color; use CSS instead.',

    	//Events warnings
    	'events.msg.missingonfocus' : 'Each focusable element with an onmouseover attribute should also have an onfocus attribute, and their associated event handlers should trigger the same or similar actions.',
    	'events.msg.missingonblur' : 'Each focusable element with an onmouseout attribute should also have an onblur attribute, and their associated event handlers should trigger the same or similar actions.',
    	'events.msg.nonfocusableonclick' : 'Every onClick event handler should be on a focusable element.',
    	'events.msg.nonfocusableonmouse' : 'Every onmouseover or onmouseout event handler that is not on a focusable element should use CSS :hover psuedo element to provide the stylistic changes.',
    	'events.msg.selectonchange' : 'onChange event handler should not be used with the select element to cause a automatic change of focus or load a web page.',
    	'events.msg.missingkeyequiv' : 'The functionality provided by onmousedown, onmouseup and onmousemove event handlers should have keyboard equivalents to perform the same functions that can be achieved with the mouse actions.',
   	
    	//Accesskey warning strings
    	'accesskey.msg.duplicateAccesskey' : 'Accesskey atrribute values should be unique.',
    	'accesskey.msg.ieconflict' : 'Accesskey atrribute values should not interfere with Microsoft Internet Explorer menu shortcuts. The menu shortcuts for English version of Internet Explorer 7 are: A, E, F, H, T and V. ',

    	//textstyling warning strings
    	'textstyling.msg.blinkmarquee' : 'The blink and marquee elements must not be used. Blinking and moving text are an accessibility problems for people with photosenstive epilepsy and visual impairments.',
    	
    	//frames warning strings
    	'frames.msg.framemissingtitle' : 'Every frame element must have a title attribute with content that describes the purpose of the frame.',
    	'frames.msg.frameduplicatetitle' : 'The title attribute for each frame must be unique within a frameset.',
    	'frames.msg.emptyframe' : 'Hidden or empty frames should not be used.',
    	
    	// Title dialog strings
    	'titles.msg.missingOrEmptyTitle' : 'The page should contain exactly one title element and the title element should not be empty.',
    	'titles.msg.missingOrEmptyH1' : 'Missing or empty H1 element',
    	'titles.msg.titlemissingh1words' : 'The words contained in each h1 element should match a subset of the words contained in the title element. Words (%1$S) in h1 elements should also be in the title element.',
    	'titles.msg.H1OnlyAlt' : 'The text content of an h1 element should not come solely from the alt attribute of img elements.',
    	'titles.msg.toomanyh1' : 'The page should contain no more than two h1 elements.',

    	// Header warning strings
    	'headers.msg.emptyheader' : 'Each heading element (h1..h6) must have text content. ',
    	'headers.msg.headerOnlyAlt' : 'Each subheading element (h2..h6) should have text content exclusive of the alt text of any img elements it contains.', 
    	'headers.msg.toolong' : 'Heading content should be concise (usually 65 or fewer characters in length).',
    	'headers.msg.impropernesting' : 'Heading elements that follow the last h1 should be properly nested. ',
    	'headers.msg.siblingDupName' : 'The content of the headings of the same level within the same section should be unique.',
    	'headers.msg.noHeaders' : 'Heading elements (h1..h6) should be used for structuring information on the page',

    	//Language/W3C warning strings
    	'languages.msg.langMissing' : 'Each page must have a lang attribute on its html element.',
    	'languages.msg.invalidLanguage' : 'lang attribute on html element must have a valid two-character language code.', 

    	//Forms warning strings
    	'forms.msg.missinglegend' : 'Each fieldset element should contain a legend element.',
    	'forms.msg.encapsulatinglabel' : 'The label element should not encapsulate select and textarea elements.',
    	'forms.msg.missinglabelandtitle' : 'Each input element with type=text | password | checkbox | radio | file and each select and textarea element should either be referenced by the for attribute of a label element via its id attribute, or have a title attribute.',
    	'forms.msg.missingaltandtitle' : 'Input element of type=[image] must have an alt or a title attribute. ',
    	'forms.msg.missingvalueandtitle' : 'Input elements where type=[button|submit|reset] must have a value ot title attribute.', 
    	'forms.msg.missingbuttoncontent' : 'Each button element must contain content.',
    	'forms.msg.duplicatelabel' : 'Each effective label (legend + label) should be unique.',
    	'forms.msg.emptylable' : 'Each label element must have text content. ',
    	'forms.msg.emptylegend' : 'Each legend element must have text content. ',
    	'forms.msg.emptytitle' : 'If the title attribute is defined for an input, select, textarea or button element it must also contain content since it will be used by assistive technologies as part of the effective label for the form control.',
    	'forms.msg.duplicateFormEleID' : 'ID (%1$S) is not unique. If a form control has an id attribute its value must be unique on the page. '
    	
};
