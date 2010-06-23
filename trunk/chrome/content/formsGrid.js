/* See license.txt for terms of usage */

// ************************************************************************************************

/**
 * @domplate Represents a template that is used to render basic content (table & headers) of the link grid panel
 */
FBL.ns(function() { with (FBL) {
AINSPECTOR.view.formsTable = domplate(Firebug.Rep, new Firebug.Listener(),
{
    inspectable: false,

    tableTag:

        TABLE({"class": "netTable", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
            TBODY({"class": "netTableBody", "role" : "presentation"},
                TR({"class": "gridHeaderRow gridRow focusRow outerFocusRow", id: "formsTableHeader", onclick: "$AINSPECTOR.grid.onClickHeader", "role": "row"},

                    TD({id: "formsOrderCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.order Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.order", "a11y_bundle"))
                    ),
                    TD({id: "formsIDCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.id Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.id", "a11y_bundle"))
                    ),
                    TD({id: "formsTabOrderCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.taborder Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.taborder", "a11y_bundle"))
                    ),
                    TD({id: "formsLegendCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.legend Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.legend", "a11y_bundle"))
                    ),
                    TD({id: "formsLabelCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.label Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.label", "a11y_bundle"))
                    ),
                    TD({id: "formsTypeCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.type Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.type", "a11y_bundle"))
                    ),
                    TD({id: "formsAriaAttrCol", "class": "gridHeaderCell a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.ariaattr Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.ariaattr", "a11y_bundle"))
                    ),
                    TD({id: "formsValueCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.value Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.value", "a11y_bundle"))
                    ),
                    TD({id: "formsSourceCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.source Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.source", "a11y_bundle"))
                    ),
                    TD({id: "formsIssuesCol", "class": "gridHeaderCell alphaValue a11yFocus",
                        "role": "columnheader", tabindex: "0", onkeypress: "$AINSPECTOR.grid.onClickHeader"},
                        DIV({"class": "gridHeaderCellBox",
                        title: $STR("formsGrid.header.issues Tooltip", "a11y_bundle")},
                        $STR("formsGrid.header.issues", "a11y_bundle"))
                    )
                )
            )
        )
 });


//************************************************************************************************

/**
 * @domplate Represents a template that is used to render link Grid entries.
 */
AINSPECTOR.view.formsEntry = domplate(Firebug.Rep, new Firebug.Listener(),
{
	shortTag : FirebugReps.OBJECTLINK(
			SPAN({class: "selectorTag $object|FirebugReps.Element.getVisible"},
				"&lt;",
					SPAN({class: ""}, "$object|FirebugReps.Element.getSelectorTag"),
					//	FOR('attr', '$object|getAllAttribs',
					//		TAG("$attrTag", {attr : '$attr'})	
					//	),
					"&gt;", SPAN({class: ""}, "$object.type")
		          )
		  ),
  	attrTag : SPAN({class: "nodeAttr editGroup"},
					"&nbsp;", SPAN({class: "nodeName editable"}, "$attr.nodeName"), "=&quot;",
					SPAN({class: "nodeValue editable"}, "$attr.nodeValue"), "&quot;"
	),
	
    rowTag: //added background color based on rule results
        FOR("object", "$forms",
            TR({"class": "$object.severityClass" //gridRow
            	},       		
                TD({"class": "formsOrderCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.order")
                    ),
                TD({"class": "formsIDCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.id")
                    ),
                TD({"class": "formsTabOrderCol gridCol a11yFocus", "role": "gridcell" },
                        DIV({"class": "gridLabel"}, "$object.taborder")
                    ),
                TD({"class": "formsLegendCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.legend")
                    ),
                TD({"class": "formsLabelCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.label")
                    ),
                TD({"class": "formsTypeCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, TAG("$shortTag", {object : '$object.node'}))
                    ),
                TD({"class": "formsAriaAttrCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.ariaattr")
                    ),
                TD({"class": "formsValueCol gridCol a11yFocus", "role": "gridcell"},
                         DIV({"class": "gridLabel"}, "$object.value")
                    ),
                TD({"class": "formsSourceCol gridCol a11yFocus", "role": "gridcell"},
                        DIV({"class": "gridLabel"}, "$object.source")
                    ),
                TD({"class": "formsIssuesCol gridCol a11yFocus", "role": "gridcell"},
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

AINSPECTOR.view.getFormsEle = function(theWindow)  
{
	function formsObject(torder, tnode) {
		this.order = torder;
		this.parseNode(tnode);
	}
		
	formsObject.prototype = {
		node : null,
		order : 0,
		id : "",
		taborder : "",
		legend : "",
		label : "",
		type : "",
		ariaattr: "",
		value : "",
		source : "",
		issuesObj : "",
		msgs : "",
		severityClass : "",
		parseNode : function(node) {
			try {
				function formatAriaAtt(node, name) {
					var  attr = OpenAjax.a11y.util.getValueFromAttributes(node,[name], '');
					if (attr.length > 0) return ' ' + name + ': ' + attr;
					return '';
				}
				this.node = node;
				this.id = OpenAjax.a11y.util.getValueFromAttributes(node,['id'], FBL.$STR('none', 'a11y_bundle'));
				this.taborder = OpenAjax.a11y.util.getValueFromAttributes(node,['taborder'], '');
				this.legend = OpenAjax.a11y.util.getFieldSetNodeLegendForElement(node) || FBL.$STR('none', 'a11y_bundle');;
				var tmp = OpenAjax.a11y.util.parseLabel(node);
				this.label = tmp.label || FBL.$STR('none', 'a11y_bundle');
				this.source = FBL.$STR(tmp.source || 'forms.noLabel', 'a11y_bundle');
				this.type = OpenAjax.a11y.util.getValueFromAttributes(node,['type'], FBL.$STR('none', 'a11y_bundle'));
				tmp = formatAriaAtt(node,'aria-invalid') + formatAriaAtt(node,'aria-required') + formatAriaAtt(node,'aria-label') + formatAriaAtt(node,'aria-labelledby') + formatAriaAtt(node,'aria-describedby') 
				this.ariaattr = (tmp != '') ? tmp : FBL.$STR('none', 'a11y_bundle')
				this.value = OpenAjax.a11y.util.getValueFromAttributes(node,['value'], '');
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
		var xp = "//button|//input|//textarea|//select"; //form|
		var elements = new Array();
		var xpathResult = doc.evaluate(xp, doc, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE,null);
		var r = xpathResult.iterateNext();
		while (r) {
			loadArray[loadArray.length] = new formsObject(loadArray.length + 1,r);
			r = xpathResult.iterateNext();
		}
		AINSPECTOR.OAA_Nexus.runDocContextRules('3.3.2', doc, loadArray); // SMF this does not lend to additional rule sets
	}
	for (var i = 0; i < loadArray.length; i++) {
		loadArray[i].msgs = (loadArray[i].issuesObj.msg.length > 0) ? loadArray[i].issuesObj.msg : ['Pass'];
		loadArray[i].severityClass = AINSPECTOR.controller.getMaxSeverity(loadArray[i].issuesObj.severityCode);
	}
	return loadArray;
};

Firebug.registerRep(AINSPECTOR.view.formsTable);

}});
