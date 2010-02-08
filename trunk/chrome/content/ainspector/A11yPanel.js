/* See license.txt for terms of usage */

FBL.ns(function() { with (FBL) {
	var BaseModule = Firebug.ActivableModule ? Firebug.ActivableModule : Firebug.Module;
	
	Firebug.A11yModule = extend(BaseModule, {
		// Module life-cycle 
		initialize : function() {
			BaseModule.initialize.apply(this, arguments);
		//	*will cause ctrl+f to crash FF* if (wairoleProperties == null) {this.loadWairolesProperties();} 
		},
		initContext : function(context) {
			BaseModule.initContext.apply(this, arguments);
		},
		showContext : function(context) {		
		},
		destroyContext : function(context) {
			BaseModule.destroyContext.apply(this, arguments);
		},
	});	
	var A11yModule = Firebug.A11yModule;
	
	A11yModule.A11yObject = function(object, attrIndex, AEObj) {
		this.value =  object.attributes[attrIndex].nodeValue;
		this.init(object, attrIndex, AEObj);
	};

	A11yModule.A11yObject.prototype = {
		value : null,
		toString : function() { 
			try {
				return 'Issue Count: ' + this.issues.length; 
			} catch (e) {
				return 'attr';
			}
		},
/*			toString : function() { 
			try {
				try { 
					FBTrace.sysout("toString " + object.attributes[attrIndex].name)
					//return object.attributes[attrIndex].name + ' Issue Count: ' + this.issues.length;
					return 'Issue Count: ' + this.issues.length;
				} catch (e) {
					return object.attributes[attrIndex].name
				}
			} catch (e) {return object.attributes[attrIndex].name;}	
		}, */
		init : function(object, attrIndex, AEObj) {
			var attrName = object.attributes[attrIndex].name.toLowerCase();
			var issues = new Array();
			for (j = 0; j < AEObj.msg.length; j++) {
				if (AEObj.attr[j] == attrName) {
					issues.push(AEObj.msg[j]);
				}
			}
			if (issues.length > 0) {this.issues = issues;}
			
			if (object.attributes[attrIndex].name.substring(0, 5) == 'aria-') {
				if (object.attributes[attrIndex].name == 'aria-labelledby'){
					this.AccessibleName = getTextAssocWithIDsAT(object, 'name');
				}else if (object.attributes[attrIndex].name == 'aria-describedby'){
					this.AccessibleDescritpion = getTextAssocWithIDsAT(object, 'description');
				}

				var IDREFS = Firebug.A11yModule.getLinksToAssociatedObjects(object, attrIndex);
				if (IDREFS.length > 0) {
					if (IDREFS.length == 1) this.IDREF = IDREFS[0]; else this.IDREFS = IDREFS;
					
				}
			} 
				
			if (object.attributes[attrIndex].name.toLowerCase() == 'id') {
				var labelElement = getNodesAssociatedWithIDs(object.ownerDocument, this.value, "for", false);
				if (labelElement.length > 0) {
					if (labelElement.length == 1) this.labelElement = labelElement[0]; else this.labelElement = labelElement;
				}
			}
		},
	};

	function getNodesAssociatedWithIDs(doc, targetids, attrName, usefirstidonly) {
		try
		{
			var nodeArray = new Array();
			var targetArray = targetids.split(" ");
			if (usefirstidonly){
				var temp = targetArray[0];
				targetArray = [];
				targetArray.push(temp);
			}
			for(var i=0; i<targetArray.length; i++) {
				var selected = jQuery(doc).find("*[@" + attrName + "='" + targetArray[i] + "']");
		    	if (selected.length != 0) {
		    		nodeArray.push(selected[0]);
		    	} else {
		    		nodeArray.push(null);
		    	}
			}

			return nodeArray;
		} catch (exc) {
			FBTrace.sysout(exc);
		}
	};
	
	/*  to be used inplace of getTextAssociatedWithIDs() once we have access to the object */
	const nsIAccessibleRetrieval = Components.interfaces.nsIAccessibleRetrieval;
	function getTextAssocWithIDsAT(theDoc, field) {
		try {
			var accService = Components.classes["@mozilla.org/accessibleRetrieval;1"].getService(nsIAccessibleRetrieval);
			var accObject = accService.getAccessibleFor(theDoc);
			return accObject[field];
		} catch (exc) {
			FBTrace.sysout(exc);
		}
	}
/*		function getATObj(object) {
		try {
			var accService = Components.classes["@mozilla.org/accessibleRetrieval;1"].getService(nsIAccessibleRetrieval);
			var accObject = accService.getAccessibleFor(object[0].ownerElement);
			return accObject;
		} catch (exc) {
			FBTrace.sysout(exc);
		}
	}
*/		
	A11yModule.trim = function (str) { return str.replace(/^\s*|\s*$/g,"");	};
	
	A11yModule.cleanSpaces = function (str) { return A11yModule.trim(str.replace(/\s+/g,' '));	};
	
	A11yModule.getLinksToAssociatedObjects = function (object, attrIndex) {
		try
		{
			var IDREFS = new Array();
			var attr = object.attributes[attrIndex];
			switch (attr.name) {
				case 'aria-activedescendant': //IDREF
					if (A11yModule.cleanSpaces(attr.nodeValue) != '') {
						return getNodesAssociatedWithIDs(object.ownerDocument, attr.nodeValue, 'id', true);
					}
				case 'aria-controls':	//IDREFS
				case 'aria-flowto':	
				case 'aria-owns':	
					if (A11yModule.cleanSpaces(attr.nodeValue) != '') {
						return getNodesAssociatedWithIDs(object.ownerDocument, attr.nodeValue, 'id', false);
					}
			}
			return IDREFS;
		} catch (exc) {
			FBTrace.sysout(exc)
		}
	};
// ************************************************************************************************
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;
const jsdIStackFrame = Ci.jsdIStackFrame;

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const insertSliceSize = 18;
const insertInterval = 40;

const ignoreVars =
{
    "__firebug__": 1,
    "eval": 1,

    // We are forced to ignore Java-related variables, because
    // trying to access them causes browser freeze
    "java": 1,
    "sun": 1,
    "Packages": 1,
    "JavaArray": 1,
    "JavaMember": 1,
    "JavaObject": 1,
    "JavaClass": 1,
    "JavaPackage": 1,
    "_firebug": 1,
    "_FirebugConsole": 1,
    "_FirebugCommandLine": 1,
};

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const RowTag =
    TR({"class": "memberRow $member.open $member.type\\Row", _domObject: "$member",
        $hasChildren: "$member.hasChildren",
        role: "presentation",
        level: "$member.level",
        breakable: "$member.breakable",
        breakpoint: "$member.breakpoint",
        disabledBreakpoint: "$member.disabledBreakpoint"},
        TD({"class": "memberHeaderCell"},
        DIV({"class": "sourceLine memberRowHeader"},
             "&nbsp;"
        )
     ),
        TD({"class": "memberLabelCell", style: "padding-left: $member.indent\\px",
            role: 'presentation'},
            DIV({"class": "memberLabel $member.type\\Label"},
                
                SPAN("$member.name")
            )
        ),
        TD({"class": "memberValueCell", role : 'presentation'},
            TAG("$member.tag", {object: "$member.value"})
        )
    );

const SizerRow =
    TR({role : 'presentation'},
        TD(),
        TD({width: "30%"}),
        TD({width: "70%"})
        
    );

const DirTablePlate = domplate(Firebug.Rep,
{
    tag:
        TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
            TBODY(
                SizerRow,
                FOR("member", "$object|memberIterator", RowTag)
            )
        ),

    tableTag:
        TABLE({class: "domTable", cellpadding: 0, cellspacing: 0,
            _toggles: "$toggles", _domPanel: "$domPanel", onclick: "$onClick"},
            TBODY(
                SizerRow
            )
        ),

    rowTag:
        FOR("member", "$members", RowTag),

    memberIterator: function(object, level)
    {
        return getMembers(object, level);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

    onClick: function(event)
    {
		if (!isLeftClick(event))
            return;

        var row = getAncestorByClass(event.target, "memberRow");
        var label = getAncestorByClass(event.target, "memberLabel");
        if (label && hasClass(row, "hasChildren"))
        {
            var row = label.parentNode.parentNode;
            this.toggleRow(row);
        }
        else
        {
            var object = Firebug.getRepObject(event.target);
            if (typeof(object) == "function")
            {
                FirebugChrome.select(object, "script");
                cancelEvent(event);
            }
            else if (event.detail == 2 && !object)
            {
                var panel = row.parentNode.parentNode.domPanel;
                if (panel)
                {
                    var rowValue = panel.getRowPropertyValue(row);
                    if (typeof(rowValue) == "boolean")
                        panel.setPropertyValue(row, !rowValue);
                    else
                        panel.editProperty(row);

                    cancelEvent(event);
                }
            }
        }
    },

    toggleRow: function(row)
    {
        var level = parseInt(row.getAttribute("level"));
        var toggles = row.parentNode.parentNode.toggles;

        var panel = row.parentNode.parentNode.domPanel;
        var target = row.lastChild.firstChild;
        var isString = hasClass(target,"objectBox-string");
        
        if (hasClass(row, "opened"))
        {
            removeClass(row, "opened");

            if (isString)
            {
                var rowValue = panel.getRowPropertyValue(row);
                row.lastChild.firstChild.textContent = '"' + cropMultipleLines(rowValue) + '"';
            }
            else
            {
                if (toggles)
                {
                    var path = getPath(row);

                    // Remove the path from the toggle tree
                    for (var i = 0; i < path.length; ++i)
                    {
                        if (i == path.length-1)
                            delete toggles[path[i]];
                        else
                            toggles = toggles[path[i]];
                    }
                }
                
                var rowTag = this.rowTag;
                var tbody = row.parentNode;
    
                setTimeout(function()
                {
                    for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling)
                    {
                        if (parseInt(firstRow.getAttribute("level")) <= level)
                            break;
    
                        tbody.removeChild(firstRow);
                    }
                }, row.insertTimeout ? row.insertTimeout : 0);
            }
        }
        else
        {
            setClass(row, "opened");
            if (isString)
            {
                var rowValue = panel.getRowPropertyValue(row);
                row.lastChild.firstChild.textContent = '"' + rowValue + '"';
            }
            else
            {

                if (toggles)
                {
                    var path = getPath(row);

                    // Mark the path in the toggle tree
                    for (var i = 0; i < path.length; ++i)
                    {
                        var name = path[i];
                        if (toggles.hasOwnProperty(name))
                            toggles = toggles[name];
                        else
                            toggles = toggles[name] = {};
                    }
                }

                var context = panel ? panel.context : null;
                var members = getMembers(target.repObject, level+1, context);
    
                var rowTag = this.rowTag;
                var lastRow = row;
    
                var delay = 0;
                var setSize = members.length;
                var rowCount = 1;
                while (members.length)
                {
                    setTimeout(function(slice, isLast)
                    {
                        if (lastRow.parentNode)
                        {
                            var result = rowTag.insertRows({members: slice}, lastRow);
                            lastRow = result[1];
                            dispatch([Firebug.A11yModel], 'onMemberRowSliceAdded', [null, result, rowCount, setSize]);
                            rowCount += insertSliceSize;
                        }
                        if (isLast)
                            delete row.insertTimeout;
                    }, delay, members.splice(0, insertSliceSize), !members.length);
    
                    delay += insertInterval;
                }
    
                row.insertTimeout = delay;
            }
        }
    }
});

const ToolboxPlate = domplate(
{
    tag:
        DIV({class: "watchToolbox", _domPanel: "$domPanel", onclick: "$onClick"},
            IMG({class: "watchDeleteButton closeButton", src: "blank.gif"})
        ),

    onClick: function(event)
    {
        var toolbox = event.currentTarget;
        toolbox.domPanel.deleteWatch(toolbox.watchRow);
    }
});

// ************************************************************************************************
function DOMBasePanel() {}

DOMBasePanel.prototype = extend(Firebug.Panel,
{
    tag: DirTablePlate.tableTag,

    rebuild: function(update, scrollTop)
    {
        dispatch([Firebug.A11yModel], 'onBeforeDomUpdateSelection', [this]);
	    var members = getMembers(this.selection);

        expandMembers(members, this.toggles, 0, 0);

        this.showMembers(members, update, scrollTop);
    },

    showMembers: function(members, update, scrollTop)
    {
        // If we are still in the midst of inserting rows, cancel all pending
        // insertions here - this is a big speedup when stepping in the debugger
        if (this.timeouts)
        {
            for (var i = 0; i < this.timeouts.length; ++i)
                this.context.clearTimeout(this.timeouts[i]);
            delete this.timeouts;
        }

        if (!members.length)
            return this.showEmptyMembers();

        var panelNode = this.panelNode;
        var priorScrollTop = scrollTop == undefined ? panelNode.scrollTop : scrollTop;

        // If we are asked to "update" the current view, then build the new table
        // offscreen and swap it in when it's done
        var offscreen = update && panelNode.firstChild;
        var dest = offscreen ? this.document : panelNode;

        var table = this.tag.replace({domPanel: this, toggles: this.toggles}, dest);
        var tbody = table.lastChild;
        var rowTag = DirTablePlate.rowTag;

        // Insert the first slice immediately
        var setSize = members.length;
        var slice = members.splice(0, insertSliceSize);
        var result = rowTag.insertRows({members: slice}, tbody.lastChild);
        var rowCount = 1;
        var panel = this;
        dispatch([Firebug.A11yModel], 'onMemberRowSliceAdded', [panel, result, rowCount, setSize]);
        var timeouts = [];

        var delay = 0;
        while (members.length)
        {
            timeouts.push(this.context.setTimeout(function(slice)
            {
                result = rowTag.insertRows({members: slice}, tbody.lastChild);
                rowCount += insertSliceSize;
                dispatch([Firebug.A11yModel], 'onMemberRowSliceAdded', [panel, result, rowCount, setSize]);

                if ((panelNode.scrollHeight+panelNode.offsetHeight) >= priorScrollTop)
                    panelNode.scrollTop = priorScrollTop;
            }, delay, members.splice(0, insertSliceSize)));

            delay += insertInterval;
        }

        if (offscreen)
        {
            timeouts.push(this.context.setTimeout(function()
            {
                if (panelNode.firstChild)
                    panelNode.replaceChild(table, panelNode.firstChild);
                else
                    panelNode.appendChild(table);

                // Scroll back to where we were before
                panelNode.scrollTop = priorScrollTop;
            }, delay));
        }
        else
        {
            timeouts.push(this.context.setTimeout(function()
            {
                panelNode.scrollTop = scrollTop == undefined ? 0 : scrollTop;
            }, delay));
        }
        this.timeouts = timeouts;
    },


    showEmptyMembers: function()
    {
        FirebugReps.Warning.tag.replace({object: "NoMembersWarning"}, this.panelNode);
    },

    findPathObject: function(object)
    {
        var pathIndex = -1;
        for (var i = 0; i < this.objectPath.length; ++i)
        {
            if (this.getPathObject(i) == object)
                return i;
        }

        return -1;
    },

    getPathObject: function(index)
    {
        var object = this.objectPath[index];
        if (object instanceof Property)
            return object.getObject();
        else
            return object;
    },

    getRowObject: function(row)
    {
        var object = getRowOwnerObject(row);
        return object ? object : this.selection;
    },

    getRowPropertyValue: function(row)
    {
        var object = this.getRowObject(row);
        if (object)
        {
            var propName = getRowName(row);

            if (object instanceof jsdIStackFrame)
                return Firebug.Debugger.evaluate(propName, this.context);
            else
                return object[propName];
        }
    },

    copyProperty: function(row)
    {
        var value = this.getRowPropertyValue(row);
        copyToClipboard(value);
    },

    editProperty: function(row, editValue)
    {
        if (hasClass(row, "watchNewRow"))
            Firebug.Editor.startEditing(row, "");
        else if (hasClass(row, "watchRow"))
            Firebug.Editor.startEditing(row, getRowName(row));
        else
        {
            var object = this.getRowObject(row);
            this.context.thisValue = object;

            if (!editValue)
            {
                var propValue = this.getRowPropertyValue(row);

                var type = typeof(propValue);
                if (type == "undefined" || type == "number" || type == "boolean")
                    editValue = propValue;
                else if (type == "string")
                    editValue = "\"" + escapeJS(propValue) + "\"";
                else if (propValue == null)
                    editValue = "null";
                else if (object instanceof Window || object instanceof jsdIStackFrame)
                    editValue = getRowName(row);
                else
                    editValue = "this." + getRowName(row);
            }


            Firebug.Editor.startEditing(row, editValue);
        }
    },

    deleteProperty: function(row)
    {
        if (hasClass(row, "watchRow"))
            this.deleteWatch(row);
        else
        {
            var object = getRowOwnerObject(row);
            if (!object)
                object = this.selection;

            if (object)
            {
                var name = getRowName(row);
                try
                {
                    delete object[name];
                }
                catch (exc)
                {
                    return;
                }

                this.rebuild(true);
                this.markChange();
            }
        }
    },

    setPropertyValue: function(row, value)  // value must be string
    {
        var name = getRowName(row);
        if (name == "this")
            return;

        var object = this.getRowObject(row);
        if (object && !(object instanceof jsdIStackFrame))
        {
             // unwrappedJSObject.property = unwrappedJSObject
             Firebug.CommandLine.evaluate(value, this.context, object, this.context.window,
                 function success(result, context)
                 {
                     object[name] = result;
                 },
                 function failed(result, context)
                 {
                     try
                     {
                         // If the value doesn't parse, then just store it as a string.  Some users will
                         // not realize they're supposed to enter a JavaScript expression and just type
                         // literal text
                         object[name] = String(value);  // unwrappedJSobject.property = string
                     }
                     catch (exc)
                     {
                         return;
                     }
                  }
             );
        }
        else if (this.context.stopped)
        {
            try
            {
                Firebug.CommandLine.evaluate(name+"="+value, this.context);
            }
            catch (exc)
            {
                try
                {
                    // See catch block above...
                    object[name] = String(value); // unwrappedJSobject.property = string
                }
                catch (exc)
                {
                    return;
                }
            }
        }

        this.rebuild(true);
        this.markChange();
    },

    highlightRow: function(row)
    {
        if (this.highlightedRow)
            cancelClassTimed(this.highlightedRow, "jumpHighlight", this.context);

        this.highlightedRow = row;

        if (row)
            setClassTimed(row, "jumpHighlight", this.context);
    },

    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // extends Panel

    initialize: function()
    {
        this.objectPath = [];
        this.propertyPath = [];
        this.viewPath = [];
        this.pathIndex = -1;
        this.toggles = {};

        Firebug.Panel.initialize.apply(this, arguments);
    },

    destroy: function(state)
    {
        var view = this.viewPath[this.pathIndex];
        if (view && this.panelNode.scrollTop)
            view.scrollTop = this.panelNode.scrollTop;

        state.pathIndex = this.pathIndex;
        state.viewPath = this.viewPath;
        state.propertyPath = this.propertyPath;
        if (this.propertyPath.length > 0 && !this.propertyPath[1])
            state.firstSelection = persistObject(this.getPathObject(1), this.context);

        Firebug.Panel.destroy.apply(this, arguments);
    },

    show: function(state)
    {
        if (this.context.loaded && !this.selection)
        {
            if (!state)
            {
                this.select(null);
                return;
            }

            this.viewPath = state.viewPath;
            this.propertyPath = state.propertyPath;

            var selectObject = defaultObject = this.getDefaultSelection(this.context);

            if (state.firstSelection)
            {
                var restored = state.firstSelection(this.context);
                if (restored)
                {
                    selectObject = restored;
                    this.objectPath = [defaultObject, restored];
                }
                else
                    this.objectPath = [defaultObject];
            }
            else
                this.objectPath = [defaultObject];

            if (this.propertyPath.length > 1)
            {
                for (var i = 1; i < this.propertyPath.length; ++i)
                {
                    var name = this.propertyPath[i];
                    if (!name)
                        continue;

                    var object = selectObject;
                    try
                    {
                        selectObject = object[name];
                    }
                    catch (exc)
                    {
                        selectObject = null;
                    }

                    if (selectObject)
                    {
                        this.objectPath.push(new Property(object, name));
                    }
                    else
                    {
                        // If we can't access a property, just stop
                        this.viewPath.splice(i);
                        this.propertyPath.splice(i);
                        this.objectPath.splice(i);
                        selectObject = this.getPathObject(this.objectPath.length-1);
                        break;
                    }
                }
            }

            var selection = state.pathIndex <= this.objectPath.length-1
                ? this.getPathObject(state.pathIndex)
                : this.getPathObject(this.objectPath.length-1);

            this.select(selection);
        }
    },

    hide: function()
    {
        var view = this.viewPath[this.pathIndex];
        if (view && this.panelNode.scrollTop)
            view.scrollTop = this.panelNode.scrollTop;
    },

    supportsObject: function(object)
    {
        if (object == null)
            return 1000;

        if (typeof(object) == "undefined")
            return 1000;
        else if (object instanceof SourceLink)
            return 0;
        else
            return 1; // just agree to support everything but not agressively.
    },

    refresh: function()
    {
        this.rebuild(true);
    },

    updateSelection: function(object)
    {
        var previousIndex = this.pathIndex;
        var previousView = previousIndex == -1 ? null : this.viewPath[previousIndex];

        var newPath = this.pathToAppend;
        delete this.pathToAppend;

        var pathIndex = this.findPathObject(object);
        if (newPath || pathIndex == -1)
        {
            this.toggles = {};

            if (newPath)
            {
                // Remove everything after the point where we are inserting, so we
                // essentially replace it with the new path
                if (previousView)
                {
                    if (this.panelNode.scrollTop)
                        previousView.scrollTop = this.panelNode.scrollTop;

                    this.objectPath.splice(previousIndex+1);
                    this.propertyPath.splice(previousIndex+1);
                    this.viewPath.splice(previousIndex+1);
                }

                var value = this.getPathObject(previousIndex);
                if (!value)
                {
                    return;
                }

                for (var i = 0; i < newPath.length; ++i)
                {
                    var name = newPath[i];
                    var object = value;
                    value = value[name];

                    ++this.pathIndex;
                    this.objectPath.push(new Property(object, name));
                    this.propertyPath.push(name);
                    this.viewPath.push({toggles: this.toggles, scrollTop: 0});
                }
            }
            else
            {
                this.toggles = {};

                var win = this.context.window;
                if (object == win)
                {
                    this.pathIndex = 0;
                    this.objectPath = [win];
                    this.propertyPath = [null];
                    this.viewPath = [{toggles: this.toggles, scrollTop: 0}];
                }
                else
                {
                    this.pathIndex = 1;
                    this.objectPath = [win, object];
                    this.propertyPath = [null, null];
                    this.viewPath = [
                        {toggles: {}, scrollTop: 0},
                        {toggles: this.toggles, scrollTop: 0}
                    ];
                }
            }

            this.panelNode.scrollTop = 0;
            this.rebuild();
        }
        else
        {
            this.pathIndex = pathIndex;

            var view = this.viewPath[pathIndex];
            this.toggles = view.toggles;

            // Persist the current scroll location
            if (previousView && this.panelNode.scrollTop)
                previousView.scrollTop = this.panelNode.scrollTop;

            this.rebuild(false, view.scrollTop);
        }

    },

    getObjectPath: function(object)
    {
        return this.objectPath;
    },

    getDefaultSelection: function()
    {
        return this.context.window;
    },

    updateOption: function(name, value)
    {
        const optionMap = {showUserProps: 1, showUserFuncs: 1, showDOMProps: 1,
            showDOMFuncs: 1, showDOMConstants: 1, showRules: 1};  //Addition for A11y
        if ( optionMap.hasOwnProperty(name) )
            this.rebuild(true);
    },
    getOptionsMenuItems: function()
    {
        return [
            optionMenu("ShowUserProps", "showUserProps"),
            optionMenu("ShowUserFuncs", "showUserFuncs"),
            optionMenu("ShowDOMProps", "showDOMProps"),
            optionMenu("ShowDOMFuncs", "showDOMFuncs"),
            optionMenu("ShowDOMConstants", "showDOMConstants"),
            optionMenuA11y("showRules"), //Addition for A11y
           "-",
            {label: "Refresh", command: bindFixed(this.rebuild, this, true) }
        ]; 
    },
    getContextMenuItems: function(object, target)
    {
        var row = getAncestorByClass(target, "memberRow");

        var items = [];

        if (row)
        {
            var rowName = getRowName(row);
            var rowObject = this.getRowObject(row);
            var rowValue = this.getRowPropertyValue(row);

            var isWatch = hasClass(row, "watchRow");
            var isStackFrame = rowObject instanceof jsdIStackFrame;

            if (typeof(rowValue) == "string" || typeof(rowValue) == "number")
            {
                // Functions already have a copy item in their context menu
                items.push(
                    "-",
                    {label: "CopyValue",
                        command: bindFixed(this.copyProperty, this, row) }
                );
            }

            items.push(
                "-",
                {label: isWatch ? "EditWatch" : (isStackFrame ? "EditVariable" : "EditProperty"),
                    command: bindFixed(this.editProperty, this, row) }
            );

            if (isWatch || (!isStackFrame && !isDOMMember(rowObject, rowName)))
            {
                items.push(
                    {label: isWatch ? "DeleteWatch" : "DeleteProperty",
                        command: bindFixed(this.deleteProperty, this, row) }
                );
            }
        }

        items.push(
            "-",
            {label: "Refresh", command: bindFixed(this.rebuild, this, true) }
        );

        return items;
    },

    getEditor: function(target, value)
    {
        if (!this.editor)
            this.editor = new DOMEditor(this.document);

        return this.editor;
    }
});

// ************************************************************************************************

function AriaPanel() {}   //DOMSidePanel

AriaPanel.prototype = extend(DOMBasePanel.prototype, //DOMSidePanel
{
    // * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
    // extends Panel

    name: "Dom+",
	title: "Dom+",
    parentPanel: "html",
    order: 4,
    initializeNode: function(oldPanelNode)
    {
        dispatch([Firebug.A11yModel], 'onInitializeNode', [this, 'console']);
    },

    destroyNode: function()
    {
        dispatch([Firebug.A11yModel], 'onDestroyNode', [this, 'console']);
    },
});

// ************************************************************************************************
// Local Helpers

function DOMEditor(doc)
{
    this.box = this.tag.replace({}, doc, this);
    this.input = this.box;

    this.tabNavigation = false;
    this.tabCompletion = true;
    this.completeAsYouType = false;
    this.fixedWidth = true;

    this.autoCompleter = Firebug.CommandLine.autoCompleter;
}

DOMEditor.prototype = domplate(Firebug.InlineEditor.prototype,
{
    tag: INPUT({class: "fixedWidthEditor", type: "text",
                oninput: "$onInput", onkeypress: "$onKeyPress"}),

    endEditing: function(target, value, cancel)
    {
        // XXXjoe Kind of hackish - fix me
        delete this.panel.context.thisValue;

        if (cancel || value == "")
            return;

        var row = getAncestorByClass(target, "memberRow");
        if (!row)
            this.panel.addWatch(value);
        else if (hasClass(row, "watchRow"))
            this.panel.setWatchValue(row, value);
        else
            this.panel.setPropertyValue(row, value);
    }
});

// ************************************************************************************************
// Local Helpers

function getMembers(object, level)  // we expect object to be user-level object wrapped in security blanket
{
    if (!level)
        level = 0;

    var ordinals = [], userProps = [], userClasses = [], userFuncs = [],
        domProps = [], domFuncs = [], domConstants = [];

    try
    {
        var domMembers = getDOMMembers(object);

        if (object.wrappedJSObject)
            var insecureObject = object.wrappedJSObject;
        else
            var insecureObject = object;
        		
        for (var name in insecureObject)  // enumeration is safe
        {
            if (ignoreVars[name] == 1)  // javascript.options.strict says ignoreVars is undefined.
                continue;

            var val;
            try
            {
                val = insecureObject[name];  // getter is safe
            }
            catch (exc)
            {
                // Sometimes we get exceptions trying to access certain members
            }

            var ordinal = parseInt(name);
            if (ordinal || ordinal == 0)
            {
                addMember("ordinal", ordinals, name, val, level);
            }
            else if (typeof(val) == "function")
            {
                if (isClassFunction(val))
                    addMember("userClass", userClasses, name, val, level);
                else if (name in domMembers)
                    addMember("domFunction", domFuncs, name, val, level, domMembers[name]);
                else
                    addMember("userFunction", userFuncs, name, val, level);
            }
            else
            {			
                if (name in domMembers) 
					addMember("dom", domProps, name, val, level, domMembers[name]);
                else if (name in domConstantMap)
                    addMember("dom", domConstants, name, val, level);
                else
                    addMember("user", userProps, name, val, level);
            }
        }
		//Addition for A11y
        var rules = [];
        if (object.node) { 
    		AccessibilityRulesandARIA(object.node, level, "rule", rules);
        }else{
        	AccessibilityRulesandARIA(object, level, "rule", rules);
        }

    }
    catch (exc)
    {
        // Sometimes we get exceptions just from trying to iterate the members
        // of certain objects, like StorageList, but don't let that gum up the works
        //throw exc;
    }

    function sortName(a, b) { return a.name > b.name ? 1 : -1; }
    function sortOrder(a, b) { return a.order > b.order ? 1 : -1; }

    var members = [];

    members.push.apply(members, ordinals);

    if (Firebug.showUserProps)
    {
        userProps.sort(sortName);
        members.push.apply(members, userProps);
    }

    if (Firebug.showUserFuncs)
    {
        userClasses.sort(sortName);
        members.push.apply(members, userClasses);

        userFuncs.sort(sortName);
        members.push.apply(members, userFuncs);
    }

    if (Firebug.showDOMProps)
    {
        domProps.sort(sortOrder);
        members.push.apply(members, domProps);
    }

    if (Firebug.showDOMFuncs)
    {
        domFuncs.sort(sortName);
        members.push.apply(members, domFuncs);
    }

    if (Firebug.showDOMConstants)
        members.push.apply(members, domConstants);
       
    if (Firebug.getPref(Firebug.prefDomain, "showRules")) //Addition for A11y  
    {
	    rules.sort(sortName);
	    members.push.apply(members, rules);
    }
    
    return members;
}

function expandMembers(members, toggles, offset, level)  // recursion starts with offset=0, level=0
{
    var expanded = 0;
    for (var i = offset; i < members.length; ++i)
    {
        var member = members[i];
        if (member.level > level)
            break;

        if ( toggles.hasOwnProperty(member.name) )
        {
            member.open = "opened";  // member.level <= level && member.name in toggles.

            var newMembers = getMembers(member.value, level+1);  // sets newMembers.level to level+1

            var args = [i+1, 0];
            args.push.apply(args, newMembers);
            members.splice.apply(members, args);
            expanded += newMembers.length;
            i += newMembers.length + expandMembers(members, toggles[member.name], i+1, level+1);
        }
    }

    return expanded;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function isClassFunction(fn)
{
    try
    {
        for (var name in fn.prototype)
            return true;
    } catch (exc) {}
    return false;
}

function hasProperties(ob)
{
    try
    {
        for (var name in ob)
            return true;
    } catch (exc) {}
    return false;
}

function addMember(type, props, name, value, level, order)
{
	var rep = Firebug.getRep(value);    // do this first in case a call to instanceof reveals contents
	var tag = rep.shortTag ? rep.shortTag : rep.tag;
	
	var valueType = typeof(value);
	var hasChildren = hasProperties(value) && !(value instanceof ErrorCopy) &&
	    (valueType == "function" || (valueType == "object" && value != null)
	    || (valueType == "string" && value.length > Firebug.stringCropLength));
	
	props.push({
	    name: name,
	    value: value,
	    type: type,
	    rowClass: "memberRow-"+type,
	    open: "",
	    order: order,
	    level: level,
	    indent: level*16,
	    hasChildren: hasChildren,
	    tag: tag
	});
}

function getWatchRowIndex(row)
{
    var index = -1;
    for (; row && hasClass(row, "watchRow"); row = row.previousSibling)
        ++index;
    return index;
}

function getRowName(row)
{
    return row.firstChild.textContent;
}

function getRowValue(row)
{
    return row.lastChild.firstChild.repObject;
}

function getRowOwnerObject(row)
{
    var parentRow = getParentRow(row);
    if (parentRow)
        return getRowValue(parentRow);
}

function getParentRow(row)
{
    var level = parseInt(row.getAttribute("level"))-1;
    for (row = row.previousSibling; row; row = row.previousSibling)
    {
        if (parseInt(row.getAttribute("level")) == level)
            return row;
    }
}

function getPath(row)
{
    var name = getRowName(row);
    var path = [name];

    var level = parseInt(row.getAttribute("level"))-1;
    for (row = row.previousSibling; row; row = row.previousSibling)
    {
        if (parseInt(row.getAttribute("level")) == level)
        {
            var name = getRowName(row);
            path.splice(0, 0, name);

            --level;
        }
    }

    return path;
}

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//				Aria & Accessibility Rules:  code starts here
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

function getA11yString(stringName) {
	try {
		var a11yStrings = document.getElementById("a11y_bundle");
			if (a11yStrings) {
				if( (retStr = a11yStrings.getString(stringName)) != null ) {
						return retStr;
				}
			}
	} catch (e) {FBTrace.sysout(stringName + ' ' + e.message); return stringName;} 
}

function optionMenuA11y (option) //Addition for A11y
{
	try {
        var value = getA11yPref(Firebug.prefDomain + '.' + option); //Firebug.getPref(Firebug.prefDomain, option);
        var nameLabel = getA11yString(option);
        return {label: nameLabel, type: "checkbox", checked: value,
            command: bindFixed(Firebug.setPref, Firebug, Firebug.prefDomain, option, !value) };
	} catch (exc) 	{
		FBTrace.sysout(exc.message);
	}   
}

function getA11yPref(prefName) {
	try {	
	    const nsIPrefBranch = Ci.nsIPrefBranch;
	    const nsIPrefBranch2 = Ci.nsIPrefBranch2;
	    
	    const a11yPrefService = Cc["@mozilla.org/preferences-service;1"];
	    const rulesPrefs =a11yPrefService.getService(nsIPrefBranch2);
	    
	      var type = rulesPrefs.getPrefType(prefName);
	      if (type!=nsIPrefBranch.PREF_BOOL) {
	    	  try {
	    		  rulesPrefs.setBoolPref(prefName, true);
	    	  } catch(e) {FBTrace.sysout(e.message);}
	      }	else {
	    	  return rulesPrefs.getBoolPref(prefName);
	      }
		
	} catch (exc) {
		FBTrace.sysout(exc.message);
	}
}

function AccessibilityRulesandARIA(object, level, theType, theProps)
{
	try {
		var issues = new Array();
		var accMsg = getA11yString('a11yMsg'); //'Accessibility Msg';
		var ariaMSG = getA11yString('ariaMsg'); //'ARIA Msg';
		
		if (object.name && object.name != '') { 
			var objName = object.name.toLowerCase();
			
/*			var AEObj;
  			alert('in AccessibilityRulesandARIA');
			FBTrace.sysout('object', object);
			if (object.ownerElement) AEObj = AINSPECTOR.controller.callAllParseNode(object.ownerElement);
			else AEObj = AINSPECTOR.controller.callAllParseNode(object);
*/
			FBTrace.sysout('AccessibilityRulesandARIA object', object);
			
			var AEObj= AINSPECTOR.controller.callAllParseNode(object); //var AEObj= callAllParseNode(object.ownerElement);
			FBTrace.sysout('object.name: ' + object.name, AEObj);
			for (var i=0, nameLC = object.name.toLowerCase(); i < AEObj.msg.length; i++) {
				if (AEObj.attr[i] == nameLC) addMember(theType, theProps, accMsg, AEObj.msg[i], level);
			}
 
			// ARIA expand ID(s) found in aria-labelledby and aria-describedby
			if (objName == 'aria-labelledby'){
				var text = getTextAssocWithIDsAT(object.ownerElement, 'name');
				addMember(theType, theProps, 'Accessible Name', Firebug.A11yModule.cleanSpaces(text), level);	
				return;
			}
			if (objName == 'aria-describedby'){
				var text = getTextAssocWithIDsAT(object.ownerElement, 'description');
				addMember(theType, theProps, 'Accessible Descritpion', Firebug.A11yModule.cleanSpaces(text), level);	
				return;
			}
			//if (object.getNamedItem('aria-labelledby') != null || object.getNamedItem('aria-describedby') != null){
			//	var ATObj = getATObj(object);
			//	addMember(theType, theProps, 'Accessible Object', ATObj, level);	
			//}
			
		} else if (object.getNamedItem) { //might be an attributes object			
		}
		else { //no attributes
			var tagName = object.tagName.toLowerCase();
						
			var AEObj = AINSPECTOR.controller.callAllParseNode(object);
			for (var i=0; i < AEObj.msg.length; i++) {
				if (AEObj.attr[i] == '') addMember(theType, theProps, accMsg, AEObj.msg[i], level);
			}
		}
	}
	catch (exc)
	{
	//    FBTrace.sysout(exc.message);
	}
}

function A11yPanel() {}

A11yPanel.prototype = extend(DOMBasePanel.prototype,
{
    name: "A11y",
	title: "A11y",
    parentPanel: "html",
    order: 6,
    tag: DirTablePlate.tableTag,  
    rebuild: function(update, scrollTop)
    {
        dispatch([Firebug.A11yModel], 'onBeforeDomUpdateSelection', [this]);
	    var members = getAccessibleObjs(this.selection);
	    
        expandMembers(members, this.toggles, 0, 0);

        this.showMembers(members, update, scrollTop);
    },
    getOptionsMenuItems: function()
    {
    },
    initialize: function()
    {
        this.objectPath = [];
        this.propertyPath = [];
        this.viewPath = [];
        this.pathIndex = -1;
        this.toggles = {};

        Firebug.Panel.initialize.apply(this, arguments);
        this.loadNewCss();
    },
    
    initializeNode: function(oldPanelNode)
    {
        dispatch([Firebug.A11yModel], 'onInitializeNode', [this, 'console']);
    },

    destroyNode: function()
    {
        dispatch([Firebug.A11yModel], 'onDestroyNode', [this, 'console']);
    },
    
    loadNewCss: function () 
    {
        try
        {  
    	//	this.document.styleSheets[0].insertRule(".ruleLabel { color: #000000; }", this.document.styleSheets[0].cssRules.length) //{ color: #FF6600; font-weight: bold; } orange-bold
    		this.document.styleSheets[0].insertRule(".ruleLabel { color: #FF6600; font-weight: bold; }", this.document.styleSheets[0].cssRules.length) // orange-bold
        } catch (exc)    {
        	FBTrace.sysout(exc)
        }
    },
});

function accessext_nodeHanlder_LandmarkRoles(node) {
	try {
		var selected = jQuery(node).children();
		var pageRoles = selected.filter("*[@role]"); //"*[@role='complementary']|[@role='banner']"
		for (i = 0; i < pageRoles.length; i++) {
			switch (pageRoles[i].getAttribute('role').toUpperCase()) {
				case 'APPLICATION':
				case 'BANNER':
				case 'COMPLEMENTARY':
				case 'CONTENTINFO':
				case 'MAIN':
				case 'NAVIGATION':
				case 'SEARCH':
					alert('accessext_nodeHanlder_LandmarkRoles' + pageRoles[i].getAttribute('role'));
					break;
				default : // traverse all children except those with landmark roles
				//	accessext_nodeHanlder_LandmarkRoles(pageRoles[i]);  //.get(i)
			}	
		}
		var noRole = selected.filter("*[not exists(@role)]");  //*[not exists(@role)]   *[not @role]
		alert(' accessext_nodeHanlder_LandmarkRoles noRole.length' + noRole.length);
		
			
	    	
	} catch (ex) {
		FBTrace.sysout('accessext_nodeHanlder_LandmarkRoles exception: ', ex);
	}
}

function getAccessibleObjs(object, level)  
{
    if (!level)
        level = 0;

    var heading = [];
    
    try
    {  
    	// show a small subset of the DOM properties, aria info & broken rules
    	addMember("dom", heading, object.tagName, object, level);
    //	var textValue = getNodeText(object);
    //	addMember("dom", heading, "textContent", textValue, level);
    	
		var AEObj = AINSPECTOR.controller.callAllParseNode(object);
		if (AEObj.msg.length > 0) {
    		var accMsg = getA11yString('a11yMsg'); //'Accessibility Msg';
			for (var i=0; i < AEObj.msg.length; i++) {
				if (AEObj.attr[i] == '') addMember("rule", heading, accMsg, AEObj.msg[i], level);
			}
    	}

        var role= '';
		if (object.attributes != undefined) {
	        for(var i=0; i< object.attributes.length; i++ ) {
				if( object.attributes[i].name == 'role' ) { role = object.attributes[i].nodeValue; }
			}
			
	    	for(var i=0; i < object.attributes.length; i++) {
	 			var detailsObj = new Firebug.A11yModule.A11yObject(object, i, AEObj);
	 			if (detailsObj.issues) {
	 				addMember("rule", heading, object.attributes[i].name, detailsObj, level);
	 			} else {
	 				addMember("dom", heading, object.attributes[i].name, detailsObj, level);
	 			}
	    	}  
		}
     }
    catch (exc)
    {
    	FBTrace.sysout(exc)
    }

    function sortName(a, b) { return a.name > b.name ? 1 : -1; }
    function sortOrder(a, b) { return a.order > b.order ? 1 : -1; }

    var members = [];

    if (true) //(Firebug.showUserProps)
    {
    	heading.sort(sortName);
        members.push.apply(members, heading);
    }

    return members;
}
//************************************************************************************************

// ************************************************************************************************
Firebug.registerPanel(AriaPanel);
Firebug.registerPanel(A11yPanel);
Firebug.registerModule(Firebug.A11yModule);

// ************************************************************************************************

}});
