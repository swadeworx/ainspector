/* See license.txt for terms of usage */

// ************************************************************************************************

/**
 * @domplate Represents a template that is used to render basic content (table & headers) of the link grid panel
 */
FBL.ns(function() { with (FBL) {
AINSPECTOR.view.headingsTable = domplate(Firebug.Rep, new Firebug.Listener(),
{
    inspectable: false,

    tableTag:

        TABLE({"class": "netTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
            TBODY({"class": "netTableBody", "role" : "presentation"},
                TR({"class": "gridHeaderRow gridRow focusRow outerFocusRow", id: "headingsTableHeader",
				onclick: "$AINSPECTOR.grid.onClickHeader", "role": "row"},

                    TD({id: "headingsOrderCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("headingsGrid.header.order Tooltip", "a11y_bundle")},
                        $STR("headingsGrid.header.order", "a11y_bundle"))
                    ),
                    TD({id: "headingsLevelCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("headingsGrid.header.level Tooltip", "a11y_bundle")},
                        $STR("headingsGrid.header.level", "a11y_bundle"))
                    ),
                    TD({id: "headingsTextCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("headingsGrid.header.text Tooltip", "a11y_bundle")},
                        $STR("headingsGrid.header.text", "a11y_bundle"))
                    ),
                    TD({id: "headingsIssuesCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("headingsGrid.header.issues Tooltip", "a11y_bundle")},
                        $STR("headingsGrid.header.issues", "a11y_bundle"))
                    )
                )
            )
        )
 });


//************************************************************************************************

/**
 * @domplate Represents a template that is used to render link Grid entries.
 */
AINSPECTOR.view.headingsEntry = domplate(Firebug.Rep, new Firebug.Listener(),
{
	shortTag : FirebugReps.OBJECTLINK(
			SPAN({class: "selectorTag $object|FirebugReps.Element.getVisible"},
				"&lt;",
					SPAN({class: ""}, "$object|FirebugReps.Element.getSelectorTag"),
					"&gt;", SPAN({class: ""}, "$object|getDisplayableText")
		          )
		  ),
  	attrTag : SPAN({class: "nodeAttr editGroup"},
					"&nbsp;", SPAN({class: "nodeName editable"}, "$attr.nodeName"), "=&quot;",
					SPAN({class: "nodeValue editable"}, "$attr.nodeValue"), "&quot;"
	),
	
    rowTag: //added background color based on rule results
        FOR("object", "$headings",
            TR({"class": "$object.severityClass" //gridRow
            	},       		
                TD({"class": "headingsOrderCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.order")
                    ),
                TD({"class": "headingsLevelCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.level")
                    ),
                TD({"class": "headingsTextCol gridCol a11yFocus", "role": "gridcell" },
                        DIV({"class": "gridLabel"}, TAG("$shortTag", {object : '$object.node'}))
                    ),
                TD({"class": "headingsIssuesCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, FOR('issue', '$object.msgs',	DIV('$issue') ))
                    )
        	)	
        ),
        
    getDisplayableText: function (node) {
		return OpenAjax.a11y.util.getNodeTextRecursively(node);
    }
});

AINSPECTOR.view.getheadingsEle = function(theWindow)  
{
	function headingsObject(torder, tnode) {
		this.order = torder;
		this.parseNode(tnode);
	}
		
	headingsObject.prototype = {
		node : null,
		order : 0,
		level : "",
		issuesObj : "",
		msgs : "",
		severityClass : "",
		parseNode : function(node) {
			try {
				this.node = node;
				if (node.tagName.toLowerCase() == 'title') this.level = FBL.$STR('none', 'a11y_bundle'); /*title node*/
				else this.level = node.tagName.charAt(1);
				this.issuesObj = AINSPECTOR.controller.callAllParseNode(node);
			} catch (ex) {
				FBTrace.sysout('parseNode exception: ' + ex);
			}
		}
	};
	
	var loadArray = new Array();
	var documents = AINSPECTOR.view.getDocuments(theWindow, new Array());
		
	for (var i =0; i < documents.length; i++) {
		var doc = documents[i];
		var xp = "//title|//h1|//h2|//h3|//h4|//h5|//h6"; 
		var elements = new Array();
		var xpathResult = doc.evaluate(xp, doc, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE,null);
		var r = xpathResult.iterateNext();
		while (r) {
			loadArray[loadArray.length] = new headingsObject(loadArray.length + 1,r);
			r = xpathResult.iterateNext();
		}
		AINSPECTOR.OAA_Nexus.runDocContextRules('2.4.2', doc, loadArray); // SMF this does not lend to additional rule sets
		AINSPECTOR.OAA_Nexus.runDocContextRules('2.4.6', doc, loadArray); // SMF this does not lend to additional rule sets
	}
	for (var i = 0; i < loadArray.length; i++) {
		loadArray[i].msgs = (loadArray[i].issuesObj.msg.length > 0) ? loadArray[i].issuesObj.msg : ['Pass'];
		loadArray[i].severityClass = AINSPECTOR.controller.getMaxSeverity(loadArray[i].issuesObj.severityCode);
	}
	return loadArray;
};

Firebug.registerRep(AINSPECTOR.view.headingsTable);

}});
