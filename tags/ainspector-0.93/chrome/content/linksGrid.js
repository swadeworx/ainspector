/* See license.txt for terms of usage */

// ************************************************************************************************

/**
 * @domplate Represents a template that is used to render basic content (table & headers) of the link grid panel
 */
FBL.ns(function() { with (FBL) {
AINSPECTOR.view.linksTable = domplate(Firebug.Rep, new Firebug.Listener(),
{
    inspectable: false,

    tableTag:

        TABLE({"class": "netTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
            TBODY({"class": "netTableBody", "role" : "presentation"},
                TR({"class": "gridHeaderRow gridRow focusRow outerFocusRow", id: "linksTableHeader",
					onclick: "$AINSPECTOR.grid.onClickHeader", "role": "row", tabindex: "0",
					onkeypress: "$AINSPECTOR.grid.onKeyRow" },

                    TD({id: "linksOrderCol", "class": "gridHeaderCell gridCell a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.order Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.order", "a11y_bundle"))
                    ),
                    TD({id: "linksTextCol", "class": "gridHeaderCell gridCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.linktext Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.linktext", "a11y_bundle"))
                    ),
                    TD({id: "linksTitleCol", "class": "gridHeaderCell gridCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.linktitle Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.linktitle", "a11y_bundle"))
                    ),
                    TD({id: "linksTypeCol", "class": "gridHeaderCell gridCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.type Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.type", "a11y_bundle"))
                    ),
                    TD({id: "linksHREFCol", "class": "gridHeaderCell gridCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.HREF Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.HREF", "a11y_bundle"))
                    ),
                    TD({id: "linksIssuesCol", "class": "gridHeaderCell gridCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "-1", onkeypress: "$AINSPECTOR.grid.onKeyHeadingCell"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("linkGrid.header.issues Tooltip", "a11y_bundle")},
                        $STR("linkGrid.header.issues", "a11y_bundle"))
                    )
                )
            )
        )
 });


//************************************************************************************************

/**
 * @domplate Represents a template that is used to render link Grid entries.
 */
AINSPECTOR.view.linkEntry = domplate(Firebug.Rep, new Firebug.Listener(),
{
	shortTag : FirebugReps.OBJECTLINK(
			SPAN({class: "selectorTag $object|FirebugReps.Element.getVisible"},
				"&lt;",
					SPAN({class: ""}, "$object|FirebugReps.Element.getSelectorTag"),
					//	FOR('attr', '$object|getAllAttribs',
					//		TAG("$attrTag", {attr : '$attr'})	
					//	),
					"&gt;", SPAN({class: ""}, "$object|getDisplayableText")
		          )
		  ),
  	attrTag : SPAN({class: "nodeAttr editGroup"},
					"&nbsp;", SPAN({class: "nodeName editable"}, "$attr.nodeName"), "=&quot;",
					SPAN({class: "nodeValue editable"}, "$attr.nodeValue"), "&quot;"
	),
		  
    linkTag: //added background color based on rule results
        FOR("object", "$links",
            TR({"class": "$object.severityClass gridRow a11yFocus", tabindex: "-1", //gridRow
				"role": "row", onkeypress: "$AINSPECTOR.grid.onKeyRow"
            	},       		
                TD({"class": "linksOrderCol gridCell gridCol a11yFocus", "role": "gridcell",
					onkeypress: "$AINSPECTOR.grid.onKeyCell", tabindex: "-1"},
                        DIV({"class": "gridLabel"}, "$object.order")
                    ),
                TD({"class": "linksTextCol gridCell gridCol a11yFocus", "role": "gridcell",
					onkeypress: "$AINSPECTOR.grid.onKeyCell",
                    onfocus: "$AINSPECTOR.grid.onFocus",tabindex: "-1"},
                        DIV({"class": "gridLabel"}, TAG("$shortTag", {object : '$object.node'}))
                    ),
                TD({"class": "linksTitleCol gridCell gridCol a11yFocus", "role": "gridcell" ,
					onkeypress: "$AINSPECTOR.grid.onKeyCell", tabindex: "-1"},
                        DIV({"class": "gridLabel"}, "$object.title")
                    ),
                TD({"class": "linksTypeCol gridCell gridCol a11yFocus", "role": "gridcell",
					onkeypress: "$AINSPECTOR.grid.onKeyCell", tabindex: "-1"},
                        DIV({"class": "gridLabel"}, "$object.type")
                    ),
                TD({"class": "linksHREFCol gridCell gridCol a11yFocus", "role": "gridcell",
					onkeypress: "$AINSPECTOR.grid.onKeyCell", tabindex: "-1"},
                        DIV({"class": "gridLabel"}, "$object.link")
                    ),
                TD({"class": "linksIssuesCol gridCell gridCol a11yFocus", "role": "gridcell",
					onkeypress: "$AINSPECTOR.grid.onKeyCell", tabindex: "-1"},
                        DIV({"class": "gridLabel"}, FOR('issue', '$object.msgs',	DIV('$issue') ))
                    )
        	)	
        ),

    getAllAttribs : function(elem) {
		var attribDetails = [];
		var attrib;
        for (var i = 0; i < elem.attributes.length; i++) {
	      	attrib = elem.getAttribute(elem.attributes[i].name);
	      	if (attrib !== null) {
	      		attribDetails.push({nodeName : elem.attributes[i].name, nodeValue : attrib});
	      	}
        }
        return attribDetails;
    },
        
    getDisplayableText: function (node) {
		if (node.tagName.toLowerCase() == "area") {
			var retStr = OpenAjax.a11y.util.getValueFromAttributes(node,['title'], null);
			if (retStr == null) {
				 retStr = OpenAjax.a11y.util.getValueFromAttributes(node,['alt'], null);
				 if (retStr != null) retStr = 'alt: ' + retStr;
				 else retStr = FBL.$STR('noAltOrTitle', 'a11y_bundle');
			}
			return retStr;
		} else {
			return OpenAjax.a11y.util.getNodeTextRecursively(node);
		}
    }
});

AINSPECTOR.view.getLinkEle = function(theWindow)  
{
	function linkObject(torder, tnode) {
		this.order = torder;
		this.parseNode(tnode);
	}
		
	linkObject.prototype = {
		node : null,
		order : 0,
		id : false,
		type : "",
		title : "",
		rel : "",
		link : "",
		alt : "",
		issuesObj : "",
		msgs : "",
		severityClass : "",
		parseNode : function(node) {
			try {
				this.node = node;
				this.link = node.href;
				this.id = node.id;
				this.title = OpenAjax.a11y.util.getValueFromAttributes(node,['title'],'');
					
				this.type = this.getTypeFromNode();
				if (this.link != '') this.link = this.link.normalizeSpacing();
					
				this.issuesObj = AINSPECTOR.controller.callAllParseNode(node);
					
			} catch (ex) {
				FBTrace.sysout('parseNode exception: ' + ex);
			}
		},
			
		getTypeFromNode : function() {
			if(typeof(this.node.tagName) == 'undefined') {
				return  FBL.$STR('links.types.unknown', 'a11y_bundle');
			}
				
			var mapping = new Object();
			mapping['http://'] = 'links.types.http';
			mapping['https://'] = 'links.types.https';
			mapping['ftp://'] = 'links.types.ftp';
			mapping['file://'] = 'links.types.file';
			mapping['mailto:'] = 'links.types.email';
			mapping['news://'] = 'links.types.news';
			
			if (this.node.tagName.toLowerCase() == 'a') {
				for (var link in mapping) {
					if (this.node.href.indexOf(link) == 0) {
						return FBL.$STR(mapping[link], 'a11y_bundle');
					}
				}
				return FBL.$STR('links.types.other', 'a11y_bundle');
			} else if (this.node.tagName.toLowerCase() == 'area') {
				for (var link in mapping) {
					if (this.node.href.indexOf(link) == 0) {
						return FBL.$STRF('links.mapPrefix', [FBL.$STR(mapping[link], 'a11y_bundle')], 'a11y_bundle');
					}
				}
				return FBL.$STRF('links.mapPrefix', [FBL.$STR('links.types.other', 'a11y_bundle')], 'a11y_bundle');
			}
				
			return  FBL.$STR('links.types.other', 'a11y_bundle');
		}
	};
	
	var loadArray = new Array();
	var documents = AINSPECTOR.view.getDocuments(theWindow, new Array());
		
	for (var i =0; i < documents.length; i++) {
		var doc = documents[i];
		for (var j = 0; j < doc.links.length; j++) {
			loadArray[loadArray.length] = new linkObject(loadArray.length + 1,doc.links[j]);
		}
		AINSPECTOR.OAA_Nexus.runDocContextRules('2.4.4', doc, loadArray); // SMF this does not lend to additional rule sets
	}
	for (var i = 0; i < loadArray.length; i++) {
		loadArray[i].msgs = (loadArray[i].issuesObj.msg.length > 0) ? loadArray[i].issuesObj.msg : ['Pass'];
		loadArray[i].severityClass = AINSPECTOR.controller.getMaxSeverity(loadArray[i].issuesObj.severityCode);
	}
	return loadArray;
};

Firebug.registerRep(AINSPECTOR.view.linksTable);

}});


