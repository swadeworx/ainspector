/**
 * Use Firebug's net panel
 *
 * @namespace AINSPECTOR.FB
 * @class net
 * @static
 */
AINSPECTOR.FB = {};
AINSPECTOR.FB.net = {

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

        if (typeof FirebugContext.netProgress === 'undefined') {
            /* Net Panel is disabled */
            return false;
        }

        for (var i = 0; i < FirebugContext.netProgress.files.length; i++) {
            if (url == FirebugContext.netProgress.files[i].href) {
                /* found it */
                var file = FirebugContext.netProgress.files[i];
		//If the component is cached or not modified, Net panel won't store the headers for it.
                if (file.status && file.status !== "304") {
                    var response = this.getComponentDetails(file);
                    callback(response);
                    return true;
                }
            }
        }
        return false;

    },

    /**
     * Get url of requests identified by type.
     * @param type
     * @return array of url
     */
    getResponseURLsByType: function(type) {
        var urls = [];

        if (typeof FirebugContext.netProgress !== 'undefined') {
            for (var i = 0; i < FirebugContext.netProgress.files.length; i++) {
                var file = FirebugContext.netProgress.files[i];
                if (typeof file.mimeType != "undefined" && AINSPECTOR.util.getComponentType(file.mimeType) == type) {
                    urls[urls.length] = file.href;
                }
            }
        }
        return urls;
    },

    getComponentDetails: function(file) {
        var response = {};

        response.url = file.href;
        response.status = file.status;
        response.respTime = file.endTime - file.startTime;
        response.startTimestamp = file.startTime;
        response.size = file.size;

        var respHeaders = this.getResponseHeaders(file);
        response.raw_headers = respHeaders.raw_headers;
        response.headers = respHeaders.headers;

        response.body = this.getResponseText(file, response.headers);
        response.method = file.method;
        response.type = this.getType(file);
        response.cookie = this.getCookie(file);

        return response;
    },

    getResponseHeaders: function(file) {
        var headers = {};
        var raw_headers = '';

        if (typeof file.responseHeaders != "undefined" && typeof file.responseHeaders.length != "undefined") {
            for (var i = 0; i < file.responseHeaders.length; i++) {
                headers[file.responseHeaders[i].name] = file.responseHeaders[i].value;
                raw_headers += file.responseHeaders[i].name + ": " + file.responseHeaders[i].value + "\n";
            }
        }
        return { 'headers': headers, 'raw_headers': raw_headers };
    },

    getResponseText: function(file, headers) {
        if (typeof file.responseText != "undefined") {
            return file.responseText;
        }
        if (headers['Connection'] == 'Close' || headers['Content-Length'] !== undefined) {
            return '';
        }
        return FirebugContext.netProgress.context.sourceCache.loadText(file.href, file.method, file);
    },

    getCookie: function(file) {
        var cookie = '';

        if (typeof file.requestHeaders != "undefined" && typeof file.requestHeaders.length != "undefined") {
            for (var i = 0; i < file.requestHeaders.length; i++) {
                if (file.requestHeaders[i].name == "Cookie") {
                    if (cookie.length > 0) {
                        cookie += '\n';
                    }
                    cookie += file.requestHeaders[i].value;
                }
            }
        }
        return cookie;
    },

    getType: function(file) {
        var type = undefined;
        if (typeof file.mimeType != "undefined") {
            type = AINSPECTOR.util.getComponentType(file.mimeType);
        }
        return type;
    }

};
