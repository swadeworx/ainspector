
  //
  // OpenAjax Alliance Rules
  // Rule group: Audio and Video Rules
  //
with (OpenAjax.a11y) {
  addRules([

    // ------------------------
    // Rule 79: Prerecorded audio with no video or image tracks needs a text transcript which includes speaker information.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_79",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_79",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {

    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );

    // if no object, embed, applet or audio elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 80: Prerecorded video with no audio track needs text or audio descriptions of the video content.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_80",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_80",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet or video elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 81: Prerecorded video with audio track needs synchronized captions.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_81",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_81",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );

    // if no object, embed, applet or audio elementsfound then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 82: Prerecorded video with audio track needs a audio or text description of the video content.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_82",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_82",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet or video elementsfound then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 83: Live audio of speech requires realtime captioning of the speakers.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_83",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_83",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet, video or audio elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 84: Synchronized audio descriptons of video.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_84",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_84",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet or video elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 85: Synchronized sign language for audio track.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_85",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_85",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet, video or audio elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 86: Extended audio description if audio track does not provided enhough time to fully describe video content.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_86",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_86",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet or video elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 87: Text alternative to audio and video content
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_87",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_87",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );
    nodes.concat( ruleContext.getElementsByTagName("video") );

    // if no object, embed, applet, audio or video elements found then rule is not applicable
    var passed = nodes.length == 0

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 88: Provide text alternatives to live audio
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_88",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_88",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    nodes.concat( ruleContext.getElementsByTagName("object") );
    nodes.concat( ruleContext.getElementsByTagName("embed") );
    nodes.concat( ruleContext.getElementsByTagName("applet") );
    nodes.concat( ruleContext.getElementsByTagName("audio") );

    // if no object, embed, applet or audio elements found then rule is not applicable
    var passed = nodes.length == 0;

	return new ValidationResult(passed, nodes, '', '', []);
} // endfunction


      },

    // ------------------------
    // Rule 89: Verify that color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
    // Group 5: Audio and Video Rule
    //
    // Last update: 2011-02-18
    // ------------------------

     {
      id            : "RULE_89",
      lastUpdated   : "2011-02-18",
      messageCode   : "MESSAGE_89",
      groupCode     : "GROUP_5",
      context: "document",
      validate: function (ruleContext) {
    var nodes = [];

    // Return false since this test almost always needs to be performed
    var passed = false;

	return new ValidationResult(passed, '', '', '', []);
} // endfunction


      },
  ]);
   }



