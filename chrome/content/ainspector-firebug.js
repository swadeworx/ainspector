/**
 * Firebug integration
 *
 * @namespace AInspectorFB
 * @class firebug
 * @static
 */

FBL.ns(function() { with (FBL) {

    Firebug.AInspector = extend(Firebug.Module, {

        initialize: function(prefDomain, prefNames) {
//            AINSPECTOR.net.registerNative(AINSPECTOR.FB.net);

            AINSPECTOR.controller.init();

            // add ainspector event listeners.
            AINSPECTOR.util.event.addListener("peelStart", this.ysOnPeelStart, this);
            AINSPECTOR.util.event.addListener("peelProgress", this.ysShowPeelProgress, this);
            AINSPECTOR.util.event.addListener("componentFetchProgress", this.ysShowFetchProgress, this);
            AINSPECTOR.util.event.addListener("componentFetchDone", this.ysOnFetchDone, this);
            
 //           AINSPECTOR.view.toggleStatusBar(AINSPECTOR.util.Preference.getPref("extensions.ainspector.hidestatusbar"));
       },

        showContext: function(context) {
        	AINSPECTOR.view.clearStatusBar();
            if (context.ainspector_context) {
            	AINSPECTOR.view.restoreStatusBar(context.ainspector_context);
            }
        },

        loadedContext: function(context) {
            if (!context.ainspector_context) {
                context.ainspector_context = g_latest_ainspector_context;
            }
        },

        reattachContext: function(context) {
            if (!FirebugContext.getPanel("AInspector").document.ainspector_context ) {
                 // Save a pointer back to this object from the iframe's document:
                var panel = FirebugContext.getPanel("AInspector");
                panel.document.ainspector_panel = panel;
                panel.document.ainspector_context = FirebugContext.ainspector_context;
                panel.document.ysview = panel.ysview;
                // update the document object we store in ysview
                panel.ysview.setDocument(panel.document);
                // reload all css.
                panel.ysview.loadCSS(panel.document);
            }
        },

        destroyContext: function(context) {
            g_latest_ainspector_context = undefined;
        },

        shutdown: function() {
            if (Firebug.getPref('defaultPanelName') == 'AInspector') {
                /* optional */
                Firebug.setPref('defaultPanelname', 'console');
            }
        },

        showPanel: function(browser, panel) {
            var isAInspector = panel && panel.name == "AInspector";
            var AInspectorButtons = browser.chrome.$("fbAInspectorButtons");
            collapse(AInspectorButtons, !isAInspector);
        },

        watchWindow: function(context, win) {
        	if (win === win.top) {
        		context.window.addEventListener("load", this.ainspectorOnload, false);
        		context.window.addEventListener("beforeunload", this.ainspectorUnload, false);
        		context.window.addEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
        	}
        },

        unwatchWindow: function(context, win) {
        	if (win === win.top) {
        		content.window.removeEventListener("load", this.ainspectorOnload, false);
        		context.window.removeEventListener("beforeunload", this.ainspectorUnload, false);
        		context.window.removeEventListener("DOMContentLoaded", this.ainspectorOnDOMContentLoaded, false);
        	}
        },

        ainspectorOnload: function(event) {
            var now = Number(new Date());
            var win = event.currentTarget;
            var fbcontext;

            // onload event from another browser tab.
            // don't peel or update status bar, just save the page load time and return.
            if (win !== FirebugContext.window) {
                fbcontext = TabWatcher.getContextByWindow(win);
            } else {
                fbcontext = FirebugContext;
            }
            // This cause initialNode to be called, thus creating FirebugContext.ainspector_context.
            var t_start = fbcontext.browser.t_start;
            fbcontext.getPanel('AInspector');
            fbcontext.ainspector_context.PAGE['readyState'] = 'complete';

            // Display the page load time
            if (t_start !== undefined) {
                fbcontext.ainspector_context.PAGE.t_done = now - t_start;
                fbcontext.browser.t_start = undefined;
            }
            // fire onload event.
            AINSPECTOR.util.event.fire('onload', {'time': now, 'window': win });

            if (fbcontext !== FirebugContext) {
                return;
            }
            if (fbcontext.ainspector_context.PAGE.t_done) {
                AINSPECTOR.view.setStatusBar( fbcontext.ainspector_context.PAGE.t_done/1000 + "s", "ainspector_status_time" );
            }

            if (AINSPECTOR.util.Preference.getPref("extensions.ainspector.autorun", true)) {
                AINSPECTOR.controller.run(win, fbcontext.ainspector_context, true);
            }
        },

        ainspectorUnload: function(event) {
            var win = event.currentTarget;
            // fire onUnload event.
            var now = Number(new Date());
            var fbcontext;

            // unload event from another browser tab.
            // don't peel or update status bar, just save the page load time and return.
            if (win !== FirebugContext.window) {
                fbcontext = TabWatcher.getContextByWindow(win);
            } else {
                fbcontext = FirebugContext;
            }
            // Save the time this page UNloads, so we can determine the total load time of the NEXT page.
            // We save it in the browser object so that it is persistant ACROSS page loads, but separated
            // from one browser tab to another.
            fbcontext.browser.t_start = now;
            AINSPECTOR.util.event.fire('onUnload', {'time': now, 'window': win});

            if (fbcontext !== FirebugContext) {
                return;
            }

            // Clear status bar
            AINSPECTOR.view.clearStatusBar();

        },

        ainspectorOnDOMContentLoaded: function(event) {
            var win = event.currentTarget;
            var now = Number(new Date());
            AINSPECTOR.util.event.fire('onDOMContentLoaded', {'time': now, 'window': win});
        },
        
        ysOnPeelStart: function(event_object) {
            FirebugContext.getPanel("AInspector").createProgressBar();
        },

        ysOnFetchDone: function(event_object) {
            FirebugContext.getPanel("AInspector").removeProgressBar();
            FirebugContext.getPanel("AInspector").doView();
        },

        ysShowPeelProgress: function(event_object) {
            FirebugContext.getPanel("AInspector").setPeelProgress(event_object);
        },

        ysShowFetchProgress: function(event_object) {
            FirebugContext.getPanel("AInspector").setFetchProgress(event_object);
        },

        onClickStatusIcon: function() {
            Firebug.toggleBar();
        },

        onClickStatusSize: function() {
            Firebug.toggleBar(true, "AInspector");
            FirebugContext.getPanel("AInspector").doView("ysStatsButton");
        },

        onClickStatusGrade: function() {
            Firebug.toggleBar(true, "AInspector");
            FirebugContext.getPanel("AInspector").doView("ysPerfButton");
        }

    });

    function AInspectorFBPanel() {}
    AInspectorFBPanel.prototype = extend(Firebug.Panel, {

        name: "AInspector",
        title: "A11y Inspector",
        searchable: true,
        editable: false,

        initialize: function(context, doc) {
            this.context = context;
            this.document = doc;
            this.panelNode = doc.createElement("div");
            this.panelNode.ownerPanel = this;
            this.panelNode.id = "ainspectorDiv";
            setClass(this.panelNode, "panelNode panelNode-" + this.name);
            doc.body.appendChild(this.panelNode);
            
            var hcr = gridHeaderColumnResizer;
            this.onMouseClick = bind(hcr.onMouseClick, hcr);
            this.onMouseDown = bind(hcr.onMouseDown, hcr);
            this.onMouseMove = bind(hcr.onMouseMove, hcr);
            this.onMouseUp = bind(hcr.onMouseUp, hcr);
            this.onMouseOut = bind(hcr.onMouseOut, hcr);
             this.initializeNode(this.panelNode);
        },

        initializeNode: function() {
            if (this.document.ainspector_context) {
                AINSPECTOR.util.dump("AInspectorFBPanel.initializeNode: FirebugContenxt.ainspector_context already exists.");
            } else {
            	this.document.ainspector_context = new AINSPECTOR.context(this.context.window.document, window.top.content);
            }
            // Save a pointer back to this object from the iframe's document.
            this.document.ainspector_panel = this;

            this.document.ainspector_context.ruleset_id = AINSPECTOR.controller.default_ruleset_id;
            this.ysview = new AINSPECTOR.view(this, this.document.ainspector_context);
            this.ysview.setSplashView();
            
            // Register event handlers for table column resizing.
            this.document.addEventListener("click", this.onMouseClick, true);
            this.document.addEventListener("mousedown", this.onMouseDown, true);
            this.document.addEventListener("mousemove", this.onMouseMove, true);
            this.document.addEventListener("mouseup", this.onMouseUp, true);
            this.document.addEventListener("mouseout", this.onMouseOut, true);

        },
        
        destroyNode: function()
        {
            this.document.removeEventListener("mouseclick", this.onMouseClick, true);
            this.document.removeEventListener("mousedown", this.onMouseDown, true);
            this.document.removeEventListener("mousemove", this.onMouseMove, true);
            this.document.removeEventListener("mouseup", this.onMouseUp, true);
            this.document.removeEventListener("mouseout", this.onMouseOut, true);
        },
        
        show: function() {
        	g_latest_ainspector_context = FirebugContext.ainspector_context;

	    // There is only ONE DOCUMENT shared by all browser tabs. So if the user opens two
	    // browser tabs, we have to restore the appropriate yslowContext when switching between tabs.
	    this.document.ainspector_context = FirebugContext.ainspector_context;
            this.document.ysview = this.ysview;
        },

        search: function(text) {
            return false;
        },

        createProgressBar: function() {
            this.ysview.genProgressView();
        },

        removeProgressBar: function() {
        },

        setPeelProgress: function(progress) {
            this.ysview.updateProgressView('peel', progress);
        },

        setFetchProgress: function(progress) {
            this.ysview.updateProgressView('fetch', progress);
        },

        doView: function(sView) {
            this.ysview.show(sView);
        },


        // tooltip
        showInfoTip: function (infoTip, target, x, y) {
            if (target.nodeName === "A" && target.rel && (target.rel === 'image' || target.rel === 'cssimage')) {
                return Firebug.InfoTip.populateImageInfoTip(infoTip, target.href);
            }
            return false;
        },

        /**
         * Global Search
         */
        search: function(text) {
            if (!text) {
                delete this.currentSearch;
                return false;
            }

            var row;
            if (this.currentSearch && text == this.currentSearch.text) {
                row = this.currentSearch.findNext(true);
            } else {
                this.currentSearch = new TextSearch(this.panelNode, function(node){return node.parentNode;});
                row = this.currentSearch.find(text);
            }

            if (row) {
                var sel = this.document.defaultView.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.currentSearch.range);
                scrollIntoCenterView(row, this.panelNode);
                return true;
            }

            return false;
        },
        
        // ************************************************************************************************    

        getContextMenuItems: function(object, target)
        {
        	return AINSPECTOR.grid.getContextMenuItems.apply(this, arguments); 
        },

    });

  //Resizable column helper 
  //-----------------------------------------------------------------------------
  var gridHeaderColumnResizer =
  {
    resizing: false,
    currColumn: null,
    startX: 0,
    startWidth: 0,
    lastMouseUp: 0,

    onMouseClick: function(event)
    {
        if (!isLeftClick(event))
            return;

        // Avoid click event for sorting, if the resizing has been just finished.
        var rightNow = now();
        if ((rightNow - this.lastMouseUp) < 1000)
            cancelEvent(event);
    },

    onMouseDown: function(event)
    {
        if (!isLeftClick(event))
            return;

        var target = event.target;
        if (!hasClass(target, "gridHeaderCellBox"))
            return;

        var header = getAncestorByClass(target, "gridHeaderRow");
        if (!header)
            return;

        this.onStartResizing(event);

        cancelEvent(event);
    },

    onMouseMove: function(event)
    {
        if (this.resizing)
        {
            if (hasClass(target, "gridHeaderCellBox"))
                target.style.cursor = "e-resize";

            this.onResizing(event);
            return;
        }

        var target = event.target;
        if (!hasClass(target, "gridHeaderCellBox"))
            return;

        if (target)
            target.style.cursor = "";

        if (!this.isBetweenColumns(event))
            return;

        // Update cursor if the mouse is located between two columns.
        target.style.cursor = "e-resize";
    },

    onMouseUp: function(event)
    {
        if (!this.resizing)
            return;

        this.lastMouseUp = now();

        this.onEndResizing(event);
        cancelEvent(event);
    },

    onMouseOut: function(event)
    {
        if (!this.resizing)
            return;

        if (FBTrace.DBG_COOKIES)
        {
            FBTrace.sysout("cookies.Mouse out, target: " + event.target.localName +
                ", " + event.target.className + "\n");
            FBTrace.sysout("      explicitOriginalTarget: " + event.explicitOriginalTarget.localName +
                ", " + event.explicitOriginalTarget.className + "\n");
        }

        var target = event.target;
        if (target == event.explicitOriginalTarget)
            this.onEndResizing(event);

        cancelEvent(event);
    },

    isBetweenColumns: function(event)
    {
        var target = event.target;
        var x = event.clientX;
        var y = event.clientY;

        var column = getAncestorByClass(target, "gridHeaderCell");
        var offset = getClientOffset(column);
        var size = getOffsetSize(column);

        if (column.previousSibling)
        {
            if (x < offset.x + 4)
                return 1;   // Mouse is close to the left side of the column (target).
        }

        if (column.nextSibling)
        {
            if (x > offset.x + size.width - 6)
                return 2;  // Mouse is close to the right side.
        }

        return 0;
    },

    onStartResizing: function(event)
    {
        var location = this.isBetweenColumns(event);
        if (!location)
            return;

        var target = event.target;

        this.resizing = true;
        this.startX = event.clientX;

        // Currently resizing column.
        var column = getAncestorByClass(target, "gridHeaderCell");
        this.currColumn = (location == 1) ? column.previousSibling : column;

        // Last column width.
        var size = getOffsetSize(this.currColumn);
        this.startWidth = size.width;

        if (FBTrace.DBG_COOKIES)
        {
            var colId = this.currColumn.getAttribute("id");
            FBTrace.sysout("cookies.Start resizing column (id): " + colId +
                ", start width: " + this.startWidth + "\n");
        }
    },

    onResizing: function(event)
    {
        if (!this.resizing)
            return;

        var newWidth = this.startWidth + (event.clientX - this.startX);
        this.currColumn.style.width = newWidth + "px";
        
        if (FBTrace.DBG_COOKIES)
        {
            var colId = this.currColumn.getAttribute("id");
            FBTrace.sysout("cookies.Resizing column (id): " + colId +
                ", new width: " + newWidth + "\n", this.currColumn);

        }
    },

    onEndResizing: function(event)
    {
        if (!this.resizing)
            return;

        this.resizing = false;

        var newWidth = this.startWidth + (event.clientX - this.startX);
        this.currColumn.style.width = newWidth + "px";

        // Store width into the preferences.
        var colId = this.currColumn.getAttribute("id");
        if (colId)
        {
            var prefName = "ainspector." + colId + ".width";
            AINSPECTOR.util.Preference.setPref(prefName, newWidth);
        }

        if (FBTrace.DBG_COOKIES)
        {
            var colId = this.currColumn.getAttribute("id");
            FBTrace.sysout("cookies.End resizing column (id): " + colId +
                ", new width: " + newWidth + "\n");
        }
    }
  };
  
//Time Helpers
//-----------------------------------------------------------------------------

function now()
{
    return (new Date()).getTime();
}    

    Firebug.registerModule(Firebug.AInspector);
    Firebug.registerPanel(AInspectorFBPanel);

}});

