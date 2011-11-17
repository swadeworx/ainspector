
var tabProgressListener =
{
    QueryInterface : function(iid)
    {
        if (iid.equals(Components.interfaces.nsIWebProgressListener) ||
            iid.equals(Components.interfaces.nsISupportsWeakReference) ||
            iid.equals(Components.interfaces.nsISupports))
        {
            return this;
        }

        throw Components.results.NS_NOINTERFACE;
    },

    stateIsRequest: false,
    onLocationChange: function(progress, request, uri)
    {
        // Only watch windows that are their own parent - e.g. not frames
        if (progress.DOMWindow.parent == progress.DOMWindow)
        {
            AINSPECTOR.firefox.watchTopWindow(progress.DOMWindow);
        }
    },
    onStateChange : function() {},
    onProgressChange : function() {},
    onStatusChange : function() {},
    onSecurityChange : function() {},
    onLinkIconAvailable : function() {}
};

/**
 * Firefox integration
 *
 * @namespace AINSPECTOR
 * @class firefox
 * @static
 */

AINSPECTOR.firefox = {

    http_observer: null,

    panel: null,

    init: function() {

        if (AINSPECTOR.util.Preference.getPref("extensions.ainspector.observeNetwork", true) &&
            (!this.http_observer || typeof this.http_observer == "undefined")) {
            this.http_observer = new AINSPECTOR.firefox.observer();
        }
        window.addEventListener("load", function(event) {
                       //             AINSPECTOR.firefox.watchBrowser(gBrowser.selectedBrowser);
                                    gBrowser.addProgressListener(tabProgressListener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
                                }, false);

        AINSPECTOR.controller.init();

        // add rengine event listeners.
        AINSPECTOR.util.event.addListener("peelStart", this.onPeelStart, this);
        AINSPECTOR.util.event.addListener("peelProgress", this.showPeelProgress, this);
        AINSPECTOR.util.event.addListener("componentFetchProgress", this.showFetchProgress, this);
        AINSPECTOR.util.event.addListener("componentFetchDone", this.onFetchDone, this);
        
        AINSPECTOR.view.toggleStatusBar(AINSPECTOR.util.Preference.getPref("extensions.firebug.ainspector.hidestatusbar"));
    },

    startup: function(wmode) {
        this.windowMode = wmode;

        // Preference branch has been changed starting YSlow2, copy over the preference from YSlow1
 /*       var prefs = AINSPECTOR.util.Preference.getPrefList("extensions.firebug.ainspector.");
        if (prefs && prefs.length > 0) {
            for (var i = 0; i < prefs.length; i++) {
                if (AINSPECTOR.util.Preference.getPref(prefs[i].name) !== undefined) {
                	AINSPECTOR.util.Preference.setPref(prefs[i].name, prefs[i].value);
                }
                // delete old pref
                AINSPECTOR.util.Preference.deletePref("extensions.firebug.ainspector." + prefs[i].name);
            }
        }
*/
        
        if (typeof FirebugContext !== "undefined") {
        	/*            try {
            if (Firebug === null) {
                FBL.ns(function() {
                	AINSPECTOR.FBRengine.init();
                       });
            } else {
                AINSPECTOR.FBRengine.init();
            }
            } catch(err) {
            	AINSPECTOR.util.dump("AINSPECTOR.firefox.startup():" + err);
            }
 */
        	return;
        }

        AINSPECTOR.firefox.init();
    },

    shutdown: function() {

        if (!this.http_observer || typeof this.http_observer == "undefined") {
            this.http_observer.unregister();
            this.http_observer = null;
        }

        gBrowser.removeProgressListener(TabProgressListener);
        for (var i = 0; i < gBrowser.browsers.length; i++) {
            var browser = gBrowser.browsers[i];
            AINSPECTOR.firefox.unwatchTopWindow(browser.contentWindow);
        }

    },

    close: function() {

	var panel = document.getElementById("ainspector-content-box");
	var splitter = document.getElementById("ainspector-content-splitter");
	splitter.collapsed = panel.collapsed = true;

    },

    run: function(autorun) {

    	if (typeof FirebugContext !== "undefined") {
            Firebug.AInspector.run(autorun);
            return;
        }

        var context;
        if (this.panel && this.panel.ainspector_Context) {
            this.panel.getPanel();
            context = this.panel.ainspector_Context;
        } else {
            context = new AINSPECTOR.context(window.top.content.document, window.top.content);
        }
        AINSPECTOR.controller.run(this.win, context, autorun);

    },

    watchBrowser: function(browser) {
        return this.watchTopWindow(browser.contentWindow);
    },

    unwatchBrowser: function(browser) {
        return this.unwatchTopWindow(browser.contentWindow);
    },

    watchLoadedTopWindow: function(win) {
        var t_start;
        var now = Number(new Date());

        AINSPECTOR.view.clearStatusBar();

        var ainspector_Context;
        if (this.panel) {
            t_start = this.panel.browser.t_start;
            this.panel.getPanel();
            if (this.panel.ainspector_context) {
            	ainspector_Context = this.panel.ainspector_Context;
            } else {
            	ainspector_Context = new AINSPECTOR.context(window.top.content.document, window.top.content);
            }
            ainspector_Context.PAGE.loaded = true;

            if (t_start !== undefined && ainspector_Context) {
            	ainspector_Context.PAGE.t_done = now - t_start;
            	AINSPECTOR.view.setStatusBar( ainspector_Context.PAGE.t_done/1000 + "s", "ainspector_status_time" );
                this.panel.browser.t_start = undefined;
            }
        }

        // fire onload event.
        AINSPECTOR.util.event.fire('onload', {'time': now, 'window': win});
        if (AINSPECTOR.util.Preference.getPref("extensions.firebug.ainspector.autorun", false)) {
        	AINSPECTOR.controller.run(win, ainspector_Context, true);
        }
     	
    },

    watchTopWindow: function(win) {
        win.addEventListener("pageshow", AINSPECTOR.firefox.onPageShow, true);
        win.addEventListener("pagehide", AINSPECTOR.firefox.onPageHide, true);
        win.addEventListener("DOMContentLoaded", AINSPECTOR.firefox.onDOMContentLoaded, true);

        this.win = win;
        if (typeof FirebugContext === "undefined") {
            if (this.panel === null) {
                this.panel = new AINSPECTOR.firefox.Panel();
            }
        }
    },

    unwatchTopWindow: function(win) {
        if (this.panel) {
            this.panel.destroy();
        }
    },

    onPageShow: function(event) {
        var win = event.currentTarget;
        var browser = event.currentTarget;
        browser.removeEventListener("pageshow", AINSPECTOR.firefox.onPageShow, true);
        setTimeout(function() {
        	AINSPECTOR.firefox.watchLoadedTopWindow(win);
        });
    },

    onPageHide: function(event) {
        var win = event.currentTarget;
        win.removeEventListener("pagehide", AINSPECTOR.firefox.onPageHide, true);
        if (event.persisted) {
        	AINSPECTOR.firefox.unwatchTopWindow(win);
        } else {
            win.addEventListener("unload", AINSPECTOR.firefox.onUnload, true);
        }
    	
    },

    onDOMContentLoaded: function(event) {
        var win = event.currentTarget;
        var now = Number(new Date());
        setTimeout(function() {
        	AINSPECTOR.util.event.fire('onDOMContentLoaded', {'time': now, 'window': win});
        });
    },

    onUnload: function(event) {
        var win = event.currentTarget;
        var now = Number(new Date());
        win.removeEventListener("unload", AINSPECTOR.firefox.onUnload, true);
        AINSPECTOR.firefox.unwatchTopWindow(win);
        
        // fire onUnload event.
        AINSPECTOR.util.event.fire('onUnload', {'time' : now, 'window': win});

        // Clears SimpleResponseCache
        AINSPECTOR.firefox.SimpleResponseCache.clear();

        // Clear status bar
	AINSPECTOR.view.clearStatusBar();

	// Save the time this page UNloads, so we can determine the total load time of the NEXT page.
	// We save it in the browser object so that it is persistant ACROSS page loads, but separated
	// from one browser tab to another.
    if (AINSPECTOR.firefox.panel) {
    	AINSPECTOR.firefox.panel.browser.t_start = now;
    }
    },

    onClickStatusIcon: function() {

        if (typeof FirebugContext !== "undefined") {
            Firebug.AInspector.onClickStatusIcon();
            return;
        }

    // toggle panel
    this.togglePanel();

    },

    onClickStatusSize: function() {
        if (typeof FirebugContext !== "undefined") {
            Firebug.AInspector.onClickStatusSize();
            return;
        }

        // toggle panel
        this.togglePanel(true);
        this.panel.doView("ysStatsButton");
    },

    onClickStatusGrade: function() {
        if (typeof FirebugContext !== "undefined") {
            Firebug.AInspector.onClickStatusGrade();
            return;
        }

        // toggle panel
        this.togglePanel(true);
        this.panel.doView("ysPerfButton");
    },

    togglePanel: function(forceOpen) {
        var panel = document.getElementById("ainspector-content-box");
        var splitter = document.getElementById("ainspector-content-splitter");
	splitter.collapsed = panel.collapsed = (forceOpen === undefined) ? !panel.collapsed : !forceOpen;
    },

    /**
     * Called from .xul
     */
    onToggleOption: function(menuitem) {
        var option = menuitem.getAttribute("option");
        var checked = menuitem.getAttribute("checked") == "true";
        AINSPECTOR.util.Preference.setPref("extensions."+option, checked);
        if (option == "ainspector.hidestatusbar") {
            document.getElementById("ainspector-status-bar").hidden = checked;
        }
    },

    /**
     * Called from .xul
     */
    onOptionsShowing: function(popup) {
        for (var child = popup.firstChild; child; child = child.nextSibling)
        {
            if (child.localName == "menuitem")
            {
                var option = child.getAttribute("option");
                if (option)
                {
                    var checked = false;
                    checked = AINSPECTOR.util.Preference.getPref("extensions."+option);

                    child.setAttribute("checked", checked);
                }
            }
        }
    },

    gotoRengineHome: function() {
	gBrowser.selectedTab = gBrowser.addTab("http://wiki.codetalks.org");
    },


    onPeelStart: function(event_object) {
        this.panel.createProgressBar();
    },

    onFetchDone: function(event_object) {
        this.panel.removeProgressBar();
        this.panel.doView();
    },

    showPeelProgress: function(event_object) {
        this.panel.setPeelProgress(event_object);
    },

    showFetchProgress: function(event_object) {
        this.panel.setFetchProgress(event_object);
    }

};


/**
 * Use Firefox's native networking support
 *
 * @namespace AINSPECTOR.firefox
 * @class net
 * @static
 */
AINSPECTOR.firefox.net = {

    /**
     * Get detail info of the passed url gathered network response from http observation notification.
     * The callback is called with an info object that includes
     * <ul>
     * <li>url</li>
     * <li>status</li>
     * <li>headers</li>
     * <li>raw_headers</li>
     * <li>body</li>
     * <li>method</li>
     * <li>type</li>
     * <li>cookie</li>
     * <li>size</li>
     * <li>respTime</li>
     * <li>startTimestamp</li>
     * </ul>
     * The callback may be called before this function returns.
     *
     * @param url
     * @param callback
     * @param binary, pass true if requesting binary content.
     * @return true if info is found, otherwise returns false.
     */
    getInfo: function(url, callback, binary) {

        var item = AINSPECTOR.firefox.SimpleResponseCache.getItem(url);

        if (item && typeof item != "undefined") {
            if (item.raw_headers.length == 0) {
                // This may be cached data, try to get header from httpChannel before proceeding.
                AINSPECTOR.firefox.http_observer.saveInfoFromChannel(item.httpChannel);
                item =  AINSPECTOR.firefox.SimpleResponseCache.getItem(url);
            }

            var response = {};
            response.url = url;
            response.body = item.body;
            response.method = item.method;
            response.cookie = item.cookie;
            response.status = item.status;
            response.headers = item.headers;
            response.raw_headers = item.raw_headers;
            if (item.type !== undefined) {
                response.type = item.type;
            }
            if (item.size > 0) {
                response.size = item.size;
            }
            if (item.startTimestamp !== undefined) {
                response.startTimestamp = item.startTimestamp;
                if (item.endTimestamp !== undefined) {
                    response.respTime = item.endTimestamp - item.startTimestamp;
                }
            }

            if (item.body.length === 0 && item.headers['Location'] === undefined && item.httpChannel) {
                if (item.httpChannel instanceof Components.interfaces.nsICachingChannel) {
                    if (item.httpChannel.cacheKey) {
                        // Get response body here.
                        var content_loader = new AINSPECTOR.firefox.ContentLoader(item.httpChannel, response, callback);
                        content_loader.load();
                        return true;
                    }
                }
            }
            callback(response);
            return true;
        }
        return false;

    },

    /**
     * Get url of requests identified by type.
     * @param type
     * @return array of url
     */
    getResponseURLsByType: function(type) {

        return AINSPECTOR.firefox.SimpleResponseCache.getURLByType(type);

    }

};

/**
 * Firefox observer
 *
 * @todo call unregister to removeObserver.
 */
AINSPECTOR.firefox.observer = function() {
    this.register();
};

/**
 * Implement nsIObserver
 */
AINSPECTOR.firefox.observer.prototype = {

    observe: function(subject, topic, data) {

        try {

        switch (topic) {
        case "http-on-modify-request":
        case "http-on-examine-response":
        case "http-on-examine-merged-response":
            this.handleObserverHttpTopic(subject, topic);
            break;
        default:
            return;
        }

        } catch (err) {
            AINSPECTOR.util.dump("AINSPECTOR.firefox.observer.observe()" + err);
        }

    },

    register: function() {

        var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);

        observerService.addObserver(this, "http-on-modify-request", false);
        observerService.addObserver(this, "http-on-examine-response", false);
        observerService.addObserver(this, "http-on-examine-merged-response", false);

    },

    unregister: function() {
        var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);

        observerService.removeObserver(this, "http-on-modify-request");
        observerService.removeObserver(this, "http-on-examine-response");
        observerService.removeObserver(this, "http-on-examine-merged-response");

    },

    handleObserverHttpTopic: function(httpChannel, topic) {

        var group_observer, win, owner, obj;

        try {
            httpChannel.QueryInterface(Components.interfaces.nsIHttpChannel);
        } catch (err) {
            // can't proceed without httpChannel.
            return;
        }

        // check if this is just our response content loader
        if (httpChannel.owner) {
            try {
                owner = httpChannel.owner;
                owner.QueryInterface(Components.interfaces.nsISupportsString);
                if (owner.data == "AINSPECTOR.firefox.ContentLoaderFlagger") {
                    // this request is generated by our content loader, don't save.
                    return;
                }
            } catch (err2) {
                // not our own request, continue.
            }
        }

        if (httpChannel.loadGroup && httpChannel.loadGroup.groupObserver) {
            group_observer = httpChannel.loadGroup.groupObserver.QueryInterface(Components.interfaces.nsIWebProgress);
            win = group_observer.DOMWindow;

            if (win != AINSPECTOR.firefox.win) {
                return;
            }
        }

        if (topic == "http-on-modify-request") {
            httpChannel.notificationCallbacks = this;

            obj = AINSPECTOR.firefox.SimpleResponseCache.getItem( httpChannel.URI.asciiSpec );
            // first check if we have this url in SimpleResponseCache already.

            if (obj === null) {
                obj = {};
                obj.httpChannel = httpChannel;
                obj.status = 0;
                obj.method = httpChannel.requestMethod;
                obj.headers = {};
                obj.raw_headers = '';
                obj.body = '';
                if (httpChannel.loadFlags & Components.interfaces.nsIRequest.LOAD_BACKGROUND) {
                    obj.type = 'xhr';
                }
                // check cookie header
                try {
                    obj.cookie = httpChannel.getRequestHeader("Cookie");
                } catch (cerr) {
                    obj.cookie = '';
                }
                obj.size = 0;
                obj.startTimestamp = Number(new Date());
                AINSPECTOR.firefox.SimpleResponseCache.add( httpChannel.URI.asciiSpec, obj );
            }
        } else if (topic == "http-on-examine-response" || topic == "http-on-examine-merged-response") {
            this.saveInfoFromChannel(httpChannel);
        }

    },

    saveInfoFromChannel: function(httpChannel) {

        var visitor, obj;

        visitor = new AINSPECTOR.firefox.HttpHeaderVisitor();
        try { httpChannel.visitResponseHeaders(visitor); } catch (e) {};

        obj = AINSPECTOR.firefox.SimpleResponseCache.getItem( httpChannel.URI.asciiSpec );
        if (obj) {
            try { obj.status = httpChannel.responseStatus; } catch (e2) { obj.status = 0; }
            obj.headers = visitor.headers;
            obj.raw_headers = visitor.raw_headers;
            try {
            if (obj.type === undefined && httpChannel.contentType) {
                obj.type = AINSPECTOR.util.getComponentType(httpChannel.contentType);
            }
            } catch(e3) {
                // don't set type.
            }
            obj.endTimestamp = Number(new Date());
            AINSPECTOR.firefox.SimpleResponseCache.add(  httpChannel.URI.asciiSpec, obj );
        }

    },

    /*
     * nsIProgressEventSink API
     */
    onProgress: function(request, context, progress, progressMax) {

        var obj = AINSPECTOR.firefox.SimpleResponseCache.getItem( request.name );
        if (obj) {
            obj.size = progress;
            AINSPECTOR.firefox.SimpleResponseCache.add( request.name, obj );
        }

        return;

    },

    onStatus: function(request, context, status, statusArg) { return; },

    /*
     * nsISupports
     */
    QueryInterface: function(aIID) {
        if (aIID.equals(Components.interfaces.nsIProgressEventSink) ||
            aIID.equals(Components.interfaces.nsISupportsWeakReference) ||
            aIID.equals(Components.interfaces.nsISupports)) {
            return this;
        }
        throw Components.results.NS_ERROR_NO_INTERFACE;
    },

    /*
     * nsIInterfaceRequestor
     */
    getInterface: function(aIID) {
        if (aIID.equals(Components.interfaces.nsIProgressEventSink)) {
            return this;
        }
        throw Components.results.NS_ERROR_NO_INTERFACE;
    }

};

AINSPECTOR.firefox.HttpHeaderVisitor = function() {

    /**
     * The url of the response header being visited.
     */
    this.headers = {};
    this.raw_headers = '';

};

AINSPECTOR.firefox.HttpHeaderVisitor.prototype = {

    visitHeader: function(name, value) {

        this.headers[name] = value;
        this.raw_headers = name + ": " + value + "\n";

    }

};

/**
 * A simple cache for responses we sniffed through observer.
 *
 * @namespace AINSPECTOR
 * @class firefox.SimpleResponseCache
 * @static
 *
 * @todo when window content changes, SimpleResponseCache needs to be cleared.
 */
AINSPECTOR.firefox.SimpleResponseCache = {

    cache_objs: {},

    /**
     * Add a object to the cache, index by url
     * @param url
     * @param object
     */
    add: function(url, obj) {

        this.cache_objs[url] = obj;

    },

    /**
     * Clear the cache.
     */
    clear: function() {

        this.cache_objs = [];

    },

    /**
     * Get item matching the passed url.
     * @param url
     * @return object matching the url.
     */
    getItem: function(url) {

        if (this.cache_objs[url] !== undefined) {

            return this.cache_objs[url];

        }
        return null;

    },

    /**
     * Get a list of URL by object type.
     * @param type
     * @return list of objects having the passed type.
     */
    getURLByType: function(type) {

        var urls = [];
        for (var i in this.cache_objs) {
            if (this.cache_objs[i].type !== undefined) {
                if (this.cache_objs[i].type == type) {
                    urls[urls.length] = i;
                }
            }
        }
        return urls;

    }

};

/**
 * AINSPECTOR.firefox.ContentLoader.
 * Get response body.
 */
AINSPECTOR.firefox.ContentLoader = function(httpChannel, response, callback) {

    this.httpChannel = httpChannel;
    this.response = response;
    this.callback = callback;

};

AINSPECTOR.firefox.ContentLoader.prototype = {

    load: function() {

        var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
        var channel;

        channel = ioService.newChannel(this.response.url, null, null);
        if (channel) {
            channel.loadFlags |= Components.interfaces.nsIChannel.LOAD_FROM_CACHE | Components.interfaces.nsIChannel.LOAD_TARGETED | Components.interfaces.nsIChannel.VALIDATE_NEVER;
            channel.owner = new AINSPECTOR.firefox.ContentLoaderFlagger();
        }

        if (channel instanceof Components.interfaces.nsICachingChannel) {
            var cacheChannel = channel;
            cacheChannel.QueryInterface(Components.interfaces.nsICachingChannel);
            cacheChannel.loadFlags |= Components.interfaces.nsICachingChannel.LOAD_ONLY_FROM_CACHE | Components.interfaces.nsIRequest.VALIDATE_NEVER;
            cacheChannel.cacheKey = this.httpChannel.cacheKey;
        }

        try
        {
            var listener = new AINSPECTOR.firefox.ContentLoaderStreamListener(this.response.url, this);
            channel.asyncOpen(listener, null);
        }
        catch(err)
        {
            this.callback(this.response);
        }

    }

};

/**
 * AINSPECTOR.firefox.ContentLoaderStreamListener
 */
AINSPECTOR.firefox.ContentLoaderStreamListener = function(url, content_loader) {
    this.url = url;
    this.content_loader = content_loader;
    this.data = "";
};

AINSPECTOR.firefox.ContentLoaderStreamListener.prototype = {

    onStartRequest: function(request, context)
    {
    },

    onStopRequest: function(request, context, status) {

        var response = this.content_loader.response;
        this.done = true;

        if (status === 0)  {
            response.body = this.data;

            // update size.  this is to work around inconsistent chunk size with image.
            var obj = AINSPECTOR.firefox.SimpleResponseCache.getItem(response.url);
            if (response.size != obj.size) {
                response.size = obj.size;
            }
        }
        this.content_loader.callback(response);

    },

    onDataAvailable: function(request, context, input_stream, offset, count) {

        var stream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
        stream.setInputStream(input_stream);
        this.data += stream.readBytes(count);

    }

};

/**
 * AINSPECTOR.firefox.ContentLoaderFlagger
 *
 * Owner for content loader channel.
 * With this, observer will able to distinguish the request from content loader and don't put them in SimpleCache.
 */
AINSPECTOR.firefox.ContentLoaderFlagger = function() {
};

AINSPECTOR.firefox.ContentLoaderFlagger.prototype = {

    data: "AINSPECTOR.firefox.ContentLoaderFlagger",

    toString: function() {

        return "AINSPECTOR.firefox.ContentLoaderFlagger";

    },

    QueryInterface: function(iid) {

        if (iid.equals(Components.interfaces.nsISupportsString) ||
            iid.equals(Components.interfaces.nsISupports)) {
            return this;
        }
        throw Components.results.NS_NOINTERFACE;
    }
};

AINSPECTOR.firefox.Panel = function() {
    var panel = document.getElementById("ainspector-Output");
    var doc = panel.contentDocument;

    this.document = doc;
    if (panel !== null) {
        this.panelNode = doc.createElement("div");
        this.panelNode.ownerPanel = this;
        this.panelNode.id = "ainspectorDiv";
        this.panelNode.className = "panelNode panelNode-AInspector";
        doc.body.appendChild(this.panelNode);

        this.document.ainspector_context = new AINSPECTOR.context(window.top.content.document, window.top.content);

        this.ysview = new AINSPECTOR.view(this, this.document.ainspector_context);
        if (AINSPECTOR.util.Preference.getPref("extensions.firebug.ainspector.autorun", true))
            this.ysview.runTest();
        else 
            this.ysview.setSplashView();
    }

};

AINSPECTOR.firefox.Panel.prototype = {

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
    }

};

AINSPECTOR.firefox.controller = function() {

    if (typeof FirebugContext !== "undefined") {
        return;
    }

    AINSPECTOR.firefox.init();
    // register networking support from Firefox
    AINSPECTOR.net.registerNative(AINSPECTOR.firefox.net);
};
var yFFController = new AINSPECTOR.firefox.controller();