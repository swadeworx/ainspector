// ************************************************************************************************

/**
 * @domplate Represents a template that is used to render basic content (table & headers) of the link grid panel
 */
FBL.ns(function() { with (FBL) {
AINSPECTOR.view.imagesTable = domplate(Firebug.Rep, new Firebug.Listener(),
{
    inspectable: false,

    tableTag:

        TABLE({"class": "netTable", cellpadding: 0, cellspacing: 0, id: "", hiddenCols: "", "role": "treegrid"},
            TBODY({"class": "netTableBody", "role" : "presentation"},
                TR({"class": "gridHeaderRow gridRow focusRow outerFocusRow", id: "imagesTableHeader", onclick: "$AINSPECTOR.grid.onClickHeader", "role": "row"},

                    TD({id: "imgOrderCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.order Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.order", "a11y_bundle"))
                    ),
                    TD({id: "imgTextCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.text Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.text", "a11y_bundle"))
                    ),
                    TD({id: "imgLinkCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.link Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.link", "a11y_bundle"))
                    ),
                    TD({id: "imgWidthCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.width Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.width", "a11y_bundle"))
                    ),
                    TD({id: "imgHeightCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.height Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.height", "a11y_bundle"))
                    ),
                    
                    TD({id: "imgRatioCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.ratio Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.ratio", "a11y_bundle"))
                    ),
                    TD({id: "imgLongdescCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.longdesc Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.longdesc", "a11y_bundle"))
                    ),
                    TD({id: "imgIssuesCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("imgGrid.header.issues Tooltip", "a11y_bundle")},
                        $STR("imgGrid.header.issues", "a11y_bundle"))
                    )
                )
            )
        )
 });


//************************************************************************************************

/**
 * @domplate Represents a template that is used to render link Grid entries.
 */
AINSPECTOR.view.imageEntry = domplate(Firebug.Rep, new Firebug.Listener(),
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
	
    rowTag: //added background color based on rule results
        FOR("object", "$images",
            TR({"class": "$object.severityClass" //gridRow
            	},       		
                TD({"class": "imgOrderCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.order")
                    ),
                TD({"class": "imgTextCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, TAG("$shortTag", {object : '$object.node'}))
                    ),
                TD({"class": "imgLinkCol gridCol a11yFocus", "role": "gridcell" },
                        DIV({"class": "gridLabel"}, "$object.link")
                    ),
                TD({"class": "imgWidthCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.width")
                    ),
                TD({"class": "imgHeightCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.height")
                    ),
                TD({"class": "imgRatioCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.ratio")
                    ),
                TD({"class": "imgLongdescCol gridCol a11yFocus", "role": "gridcell"},
                         DIV({"class": "gridLabel"}, "$object.longdesc")
                    ),
                TD({"class": "imgIssuesCol gridCol a11yFocus", "role": "gridcell"},
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
		return OpenAjax.a11y.util.getNodeTextRecursively(node);
    }
});

AINSPECTOR.view.getImagesEle = function(theWindow)  
{
	function imageObject(torder, tnode) {
		this.order = torder;
		this.parseNode(tnode);
	}
		
	imageObject.prototype = {
		node : null,
		order : 0,
		text : "",
		link : "",
		width : "",
		height : "",
		ratio : "",
		longdesc : "",
		issuesObj : "",
		msgs : "",
		severityClass : "",
		parseNode : function(node) {
			try {
				this.node = node;
				this.link = OpenAjax.a11y.util.getValueFromAttributes(node,['href','src'],FBL.$STR('noAddress', 'a11y_bundle'));
				this.text = OpenAjax.a11y.util.getValueFromAttributes(node,['alt','title'],FBL.$STR('noAltOrTitle', 'a11y_bundle'));
				this.width = node.clientWidth;
				this.height = node.clientHeight;
				if(this.height <= 0) {
					this.ratio = "0";
				} else {
					this.ratio = String(this.width/this.height);
				}		
				if(this.ratio.length > 6) {
					this.ratio = this.ratio.slice(0,5);
				}				
				this.longdesc = OpenAjax.a11y.util.getValueFromAttributes(node,['longdesc'],'');
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
		for (var j = 0; j < doc.images.length; j++) {
			loadArray[loadArray.length] = new imageObject(loadArray.length + 1,doc.images[j]);
		}
		AINSPECTOR.OAA_Nexus.runDocContextRules('1.1.1', doc, loadArray); // SMF this does not lend to additional rule sets
	}
	for (var i = 0; i < loadArray.length; i++) {
		loadArray[i].msgs = (loadArray[i].issuesObj.msg.length > 0) ? loadArray[i].issuesObj.msg : ['Pass'];
		loadArray[i].severityClass = AINSPECTOR.controller.getMaxSeverity(loadArray[i].issuesObj.severityCode);
	}
	return loadArray;
};

Firebug.registerRep(AINSPECTOR.view.imagesTable);

}});


