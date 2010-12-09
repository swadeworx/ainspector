/**
 * @namespace AINSPECTOR
 * @class util
 * @static
 */
AINSPECTOR.util = {

    /**
     * merges two objects together, the properties of the second
     * overwrite the properties of the first
     *
     * @param {Object} a Object a
     * @param {Object} b Object b
     * @return {Object} A new object, result of the merge
     */
    merge: function(a, b) {

        var i, o = {};
        for (i in a) {
            if (a.hasOwnProperty(i)) {
                o[i] = a[i];
            }
        }
        for (i in b) {
            if (b.hasOwnProperty(i)) {
                o[i] = b[i];
            }
        }
        return o;

    },


    /**
     * Dumps debug information in FB console, Error console or alert
     *
     * @param {Object} what Object to dump
     */
    dump: function(what) {

        var log = alert;

        if (window.console && window.console.log) { // bookmarklet+console
            log = window.console.log;
        } else if (window.top.content && window.top.content.console && window.top.content.console.log){ // FF
            log = window.top.content.console.log;
        } else if (typeof ddd !== 'undefined') { // error console
            log = function(what) {
                if (typeof what === 'string') {
                    ddd(what);
                } else {
                    ddd(JSON.stringify(what, null, 2));
                }
            };
        }

        log(what);

        AINSPECTOR.util.dump = log; // overwrite thyself

    },

    /**
     * Filters an object/hash using a callback
     *
     * The callback function will be passed two params - a key and a value of each element
     * It should return TRUE is the element is to be kept, FALSE otherwise
     *
     * @param {Object} hash Object to be filtered
     * @param {Function} callback A callback function
     * @param {Boolean} rekey TRUE to return a new array, FALSE to return an object and keep the keys/properties
     */
    filter: function(hash, callback, rekey) {

        var i;
        var result = rekey ? [] : {};

        for (i in hash) {
            if (callback(i, hash[i])) {
                result[rekey ? result.length : i] = hash[i];
            }
        }

        return result;
    },

    expires_month: {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    },


   /**
    * Make a pretty string out of an Expires date (eg, "Fri, 16 Oct 2015 20:08:00 GMT").
    *
    * @todo Remove or replace by a general-purpose date formatting method
    *
    * @param {String} s_expires Datetime string
    * @return {String} Prity date
    */
    prettyExpiresDate: function(s_expires) {

        var arr_date = s_expires.split(" ");

        if ( arr_date.length < 4 ) {
            return "";
        }

        var s_day = arr_date[1];
        if ( "0" == s_day.substring(0, 1) ) {
            sDay = s_day.substring(1); // strip a leading zero
        }
        var s_month = arr_date[2];
        var s_year = arr_date[3];

        if (!(s_month in AINSPECTOR.util.expires_month)) {
            return "invalid date format";
        }
        return AINSPECTOR.util.expires_month[s_month] + "/" + s_day + "/" + s_year;

    },

    /**
     * Converts cache-control: max-age=? into a JavaScript date
     *
     * @param {Integer} seconds Number of seconds in the cache-control header
     * @return {Date} A date object coresponding to the expiry date
     */
    maxAgeToDate: function(seconds) {

        var d = new Date();
        d = d.getTime() + parseInt(seconds, 10) * 1000;
        return new Date(d);

    },

    /**
     * Produces nicer sentences accounting for single/plural occurences.
     *
     * For example: "There are 3 scripts" vs "There is 1 script".
     * Currently supported tags to be replaced are:
     * %are%, %s% and %num%
     *
     *
     * @param {String} template A template with tags, like "There %are% %num% script%s%"
     * @param {Integer} num An integer value that replaces %num% and also deternmines how the other tags will be replaced
     * @return {String} The text after substitution
     */
    plural: function(template, number) {

        var res = template,
            i,
            repl = {
                are  : ['are', 'is'],
                s    : ['s', ''],
                'do' : ['do', 'does'],
                num  : [number, number]
            };


        for(i in repl) {
            if (repl.hasOwnProperty(i)) {
                res = res.replace(new RegExp('%' + i + '%', 'gm'), (number === 1) ? repl[i][1] : repl[i][0]);
            }
        }

        return res;

    },

    /**
     * Counts the number of expression in a given piece of stylesheet.
     *
     * Expressions are identified by the presence of the literal string "expression(".
     * There could be false positives in commented out styles.
     *
     * @param {String} content Text to inspect for the presence of expressions
     * @return {Integer} The number of expressions in the text
     */
    countExpressions: function(content) {

        var num_expr = 0, index;

        index = content.indexOf("expression(");
        while (index !== -1) {
            num_expr++;
            index = content.indexOf("expression(", index + 1);
        }

        return num_expr;
    },

    /**
     * Counts the number of AlphaImageLoader filter in a given piece of stylesheet.
     *
     * AlphaImageLoader filters are identified by the presence of the literal string "filter:" and
     * "AlphaImageLoader" .
     * There could be false positives in commented out styles.
     *
     * @param {String} content Text to inspect for the presence of filters
     * @return {Hash} 'filter type' => count. For Example, {'_filter' : count }
     */
    countAlphaImageLoaderFilter: function(content) {

        var num_filter = 0, num_hack_filter = 0, index,
            colon, filter_hack, value,
            result = {};

        index = content.indexOf("filter:");
        while (index !== -1) {
            filter_hack = false;
            if (index > 0 && content.charAt(index-1) === '_') {
                // check underscore.
                filter_hack = true;
            }
            // check literal string "AlphaImageLoader"
            colon = content.indexOf(";", index+7);
            if (colon != -1) {
                value = content.substring(index+7, colon);
                if (value.indexOf("AlphaImageLoader") != -1) {
                    if (filter_hack) {
                        num_hack_filter++;
                    } else {
                        num_filter++;
                    }
                }
            }
            index = content.indexOf("filter:", index + 1);
        }

        if (num_hack_filter > 0) {
            result.filter = num_hack_filter;
        }
        if (num_filter > 0) {
            result._filter = num_filter;
        }

        return result;

    },

    /**
     * Returns an array of unique domain names, based on a given array of components
     *
     * @param {Array} comps An array of components (not a @see ComponentSet)
     * @param {Boolean} exclude_ips Whether to exclude IP addresses from the list of domains (for DNS check purposes)
     * @return {Array} An array of unique domian names
     */
    getUniqueDomains: function(comps, exclude_ips) {

        var domains = {},
            retval = [],
            i, parts;

        for (i = 0; i < comps.length; i++) {

            parts = comps[i].url.split('/');
            if (!parts[2]) {
                continue;
            }
            domains[parts[2].split(':')[0]] = 1; // add to hash, but remove port number first

        }

        for (i in domains) {
            if (!exclude_ips) {
                retval.push(i);
            } else { // exclude ips, identify them by the pattern "what.e.v.e.r.[number]"
                parts = i.split('.');
                if (isNaN(parseInt(parts[parts.length-1], 10))) { // the last part is "com" or something that is NaN
                    retval.push(i);
                }
            }


        }

        return retval;
    },

    /**
     * Checks if a given piece of text (sctipt, stylesheet) is minified.
     *
     * The logic is: we strip consecutive spaces, tabs and new lines and
     * if this improves the size by more that 20%, this means there's room for improvement.
     *
     * @param {String} contents The text to be checked for minification
     * @return {Boolean} TRUE if minified, FALSE otherwise
     */
    isMinified: function(contents) {

        var len = contents.length,
            striplen;

        if (len === 0) { // blank is as minified as can be
            return true;
        }

        striplen = contents.replace(/\n| {2}|\t|\r/g, '').length; // poor man's minifier

        if (((len - striplen) / len) > 0.2) { // we saved 20%, so this component can get some mifinication done
            return false;
        }

        return true;

    },


    /**
     * Inspects the ETag.
     *
     * Returns FALSE (bad ETag) only if the server is Apache or IIS and the ETag format
     * matches the default ETag format for the server. Anything else, including blank etag
     * returns TRUE (good ETag).
     *
     * @param {String} etag ETag response header
     * @param {String} server Server response header
     * @return {Boolean} TRUE if ETag is good, FALSE otherwise
     */
    isETagGood: function(etag, server) {

        if (!server) {
            return true; //  we can't tell
        }
        if (!etag) {
            return true; // no etag is ok etag
        }

        var apache_re = new RegExp("^[0-9a-z]+-[0-9a-z]+-[0-9a-z]+$"),
               iis_re = new RegExp("^[0-9a-z]+:[0-9a-z]+$");

        etag = etag.replace(/"/g, ''); // strip "

        if (server.indexOf('Apache') !== -1 && apache_re.test(server)) {
            return false; // default apache includes inode - not good
        }

        if (server.indexOf('IIS') !== -1 && iis_re.test(server)) {
            return false; // default iis - not good
        }

        return true;

    },

    getComponentType: function(content_type) {

        var c_type = 'unknown';

        if (content_type && typeof content_type == "string") {

            if (content_type === "text/html") {
                c_type = 'doc';
            } else if (content_type === "text/css") {
                c_type = 'css';
            } else if (/javascript/.test(content_type)) {
                c_type = 'js';
            } else if (/flash/.test(content_type)) {
                c_type = 'flash';
            } else if (/image/.test(content_type)) {
                c_type = 'image';
            }

        }
        return c_type;

    },

    base64Encode: function(data) {

        var i, a, b, c,
            new_data = '',
            padding = 0;

        var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                   'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
                   '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/' ];

        for (i = 0; i < data.length; i+=3) {
            a = data.charCodeAt(i);
            if ((i + 1) < data.length) {
                b = data.charCodeAt(i+1);
            } else {
                b = 0;
                padding++;
            }
            if ((i + 2) < data.length) {
                c = data.charCodeAt(i+2);
            } else {
                c = 0;
                padding++;
            }

            new_data += arr[(a & 0xfc) >> 2];
            new_data += arr[((a & 0x03) << 4) | ((b & 0xf0) >> 4)];
            if (padding > 0) {
                new_data += "=";
            } else {
                new_data += arr[((b & 0x0f) << 2) | ((c & 0xc0) >> 6)];
            }
            if (padding > 1) {
                new_data += "=";
            } else {
                new_data += arr[(c & 0x3f)];
            }
        }

        return new_data;

    },


    /**
     * Creates x-browser XHR objects
     *
     * @return {XMLHTTPRequest} A new XHR object
     */
    getXHR: function() {

        var i = 0,
            xhr = null,
            ids = [
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];


        if (typeof XMLHttpRequest === 'function') {
            return new XMLHttpRequest();
        }

        for (i = 0; i < ids.length; i++) {
            try {
                xhr = new ActiveXObject(ids[i]);
                break;
            } catch(e){}

        }

        return xhr;

    },

    /**
     * Returns the computed style
     *
     * @param {HTMLElement} el A node
     * @param {String} st Style identifier, e.g. "backgroundImage"
     * @param {Boolean} get_url Whether to return a url
     * @return {String|Boolean} The value of the computed style, FALSE if get_url is TRUE and the style is not a URL
     */
    getComputedStyle: function(el, st, get_url) {

        var res = '';

        if (el.ownerDocument && el.ownerDocument.defaultView && document.defaultView.getComputedStyle) {
            res = el.ownerDocument.defaultView.getComputedStyle(el, '')[st];
        } else if (el.currentStyle) {
            res = el.currentStyle[st];
        }

        if (!get_url) {
            return res;
        }

        if (typeof res !== 'string' || res.indexOf('url(') !== 0) {
            return false;
        }



        res = res.replace(/url\(/, '');
        res = res.substr(0, res.length - 1);
        if (res.indexOf('"') === 0) {
            res = res.substr(1, res.length - 2);
        }

        return res;

    },

    escapeHtml: function(html) {
        html = html || "";
        var result = html.toString();
        result = result.replace(/</g, "&lt;");
        result = result.replace(/>/g, "&gt;");
        return result;
    },

    escapeQuotes: function(str, which) {
        if (which === 'single') {
            return str.replace(/\'/g, '\\\''); // '
        }
        if (which === 'double') {
            return str.replace(/\"/g, '\\\"'); // "
        }
        return str.replace(/\'/g, '\\\'').replace(/\"/g, '\\\"'); // ' and "
    },

    mod: function(divisee, base) {
        return Math.round(divisee - (Math.floor(divisee/base)*base));
    },

    // Just do the hostname and first few chars after the last slash.
    briefUrl: function(url, maxchars) {
        maxchars = maxchars || 100; // default 100 characters

        // We assume it's a full URL.
        var iDoubleSlash = url.indexOf("//");
        if ( -1 != iDoubleSlash ) {

            // remove query string
            var iQMark = url.indexOf("?");
            if ( -1 != iQMark ) {
                url = url.substring(0, iQMark) + "?...";
            }

            if (url.length > maxchars) {
                var iFirstSlash = url.indexOf("/", iDoubleSlash+2);
                var iLastSlash = url.lastIndexOf("/");
                if ( -1 != iFirstSlash && -1 != iLastSlash && iFirstSlash != iLastSlash ) {
                    url = url.substring(0, iFirstSlash+1) + "..." + url.substring(iLastSlash);
                } else {
                    url = url.substring(0, maxchars+1) + "...";
                }
            }
        }
        return url;
    },


    // Return a string with an anchor around a long piece of text.
    // (It's confusing, but often the "long piece of text" is the URL itself.)
    // Snip the long text if necessary.
    // Optionally, break the long text across multiple lines.
    prettyAnchor: function(text, url, sClass, bBriefUrl, maxChars, numLines, rel) {

        if ( "undefined" == typeof(url) ) {
                url = text;
        }
        if ( "undefined" == typeof(sClass) ) {
                sClass = "";
        }
        else {
                sClass = " class=\"" + sClass + "\"";
        }
        if ( "undefined" == typeof(maxChars) ) {
                maxChars = 100;
        }
        if ( "undefined" == typeof(numLines) ) {
                numLines = 1;
        }
        rel = (rel) ? ' rel="'+ rel +'"' : '';

        url = AINSPECTOR.util.escapeHtml(url);
        text = AINSPECTOR.util.escapeHtml(text);

        var sTitle = "";
        if ( bBriefUrl ) {
            text = AINSPECTOR.util.briefUrl(text, maxChars);
            sTitle = ' title="' + AINSPECTOR.util.escapeQuotes(url, 'double') + '"';
        }

        var sResults = "";
        var iLines = 0;
        while ( 0 < text.length ) {
            sResults += '<a' + rel + sClass + sTitle + ' href="' + AINSPECTOR.util.escapeQuotes(url, 'double') + '" onclick="javascript:document.ysview.openLink(\'' + AINSPECTOR.util.escapeQuotes(url) + '\'); return false;">' + text.substring(0, maxChars);
            text = text.substring(maxChars);
            iLines++;
            if ( iLines >= numLines ) {
                // We've reached the maximum number of lines.
                if ( 0 < text.length ) {
                    // If there's still text leftover, snip it.
                    sResults += "[snip]";
                }
                sResults += "</a>";
                break;
            }
            else {
                // My (weak) attempt to break long URLs.
                sResults += "</a><font style='font-size: 0px;'> </font>";
            }
        }

        return sResults;
    },

    /**
     *  Convert a number of bytes into a readable KB size string.
     */
    kbSize: function(size) {
	var remainder = size % (size > 100 ? 100 : 10);
	size -= remainder;
	return parseFloat(size/1000) + ( 0 == (size % 1000) ? ".0" : "" ) + "K";
    },

    prettyTypes: {
        "image": "Image",
        "doc": "HTML/Text",
        "cssimage": "CSS Image",
        "css": "Stylesheet File",
        "js": "JavaScript File",
        "flash": "Flash Object",
        "iframe": "IFrame",
        "xhr": "XMLHttpRequest",
        "redirect": "Redirect",
        "favicon": "Favicon",
        "unknown": "Unknown"
    },

    /*
     *  Convert a type (eg, "cssimage") to a prettier name (eg, "CSS Images").
     */
    prettyType: function(sType) {
	return AINSPECTOR.util.prettyTypes[sType];
    },

    /**
     *  Return a letter grade for a score.
     */
    prettyScore: function(iScore, bDark, bText) {

	if ( ! parseInt(iScore) && 0 != iScore ) {
		return iScore;
	}
    if ( iScore === -1 ) {
        return "N/A";
    }

	var sLetter = "F";

	if ( 90 <= iScore )
		sLetter = "A";
	else if ( 80 <= iScore )
		sLetter = "B";
	else if ( 70 <= iScore )
		sLetter = "C";
	else if ( 60 <= iScore )
		sLetter = "D";

	if ( bText ) {
		return sLetter;
	}

	return sLetter;
    },

    sendBeacon: function(thisUrl, score, results, size) {

        var beaconUrl = AINSPECTOR.getPref("beaconUrl", "http://rtblab.pclick.yahoo.com/images/ysb.gif") + '?';

        var qs = [];
        qs[qs.length] = 'w=' + parseInt(size, 10);
        qs[qs.length] = 'o=' + parseInt(score, 10);
        qs[qs.length] = 'u=' + escape(thisUrl);
        qs[qs.length] = 'r=' + AINSPECTOR.controller.PAGE.totalRequests;
        qs[qs.length] = 's=' + escape(AINSPECTOR.util.getPageSpaceid());


        for(var i in results) {
            if (results.hasOwnProperty(i)) {
                qs[qs.length] = i.toLowerCase() + '=' + parseInt(results[i], 10);
            }
        }

        beaconUrl += qs.join('&');
        new Image().src = beaconUrl;
    },

    /**
     *  Try to find a spaceid in the HTML document source.
     */
    getPageSpaceid: function(cset) {
        var aComponents = cset.getComponentsByType('doc');
        if ( aComponents[0] && typeof aComponents[0].body == 'string' && aComponents[0].body.length > 0 ) {
            var sHtml = aComponents[0].body;  // assume the first "doc" is the original HTML doc
            var aDelims =      ["%2fE%3d", "/S=", "SpaceID=", "?f="];   // the beginning delimiter
            var aTerminators = ["%2fR%3d", ":",   " ",        "&"];     // the terminating delimiter
            // Client-side counting (yzq) puts the spaceid in it as "/E=95810469/R=" but it's escaped!
            for ( var i = 0; i < aDelims.length; i++ ) {
                var sDelim = aDelims[i];
                if ( -1 != sHtml.indexOf(sDelim) ) {                 // if the delimiter is present
                    var i1 = sHtml.indexOf(sDelim) + sDelim.length;  // skip over the delimiter
                    var i2 = sHtml.indexOf(aTerminators[i], i1);     // find the terminator
                    if ( -1 != i2 && (i2 - i1) < 15 ) {              // if the spaceid is < 15 digits
                        var spaceid = sHtml.substring(i1, i2);
                        if ( spaceid == parseInt(spaceid) ) {        // make sure it's all digits
                            return spaceid;
                        }
                    }
                }
            }
        }

        return "";
    },

    /**
     *  Dynamically add a stylesheet to the document.
     */
    loadCSS: function(url, doc) {
        if ( ! doc ) {
            AINSPECTOR.util.dump('YAHOO.util.loadCSS: doc is not specified');
            return '';
        }

        var newCss = doc.createElement("link");
        newCss.rel = "stylesheet";
        newCss.type = "text\/css";
        newCss.href = url;
        doc.body.appendChild(newCss);

        return newCss;
    },

    /**
     *  Dynamically add a stylesheet to the document.
     */
    loadJavascript: function(url, doc) {
        if ( ! doc ) {
            AINSPECTOR.util.dump('YAHOO.util.loadCSS: doc is not specified');
            return '';
        }

        var element = doc.createElement("script");
        element.src = url;
        doc.body.appendChild(element);

        return element;
    },

    /**
     * Open a link.
     */
    openLink: function(url) {
        if (AINSPECTOR.util.Preference.getPref("browser.link.open_external") === 3) {
            gBrowser.selectedTab = gBrowser.addTab(url);
        } else {
            window.open(url, " blank");
        }
    },

    /**
     * Sends a URL to smush.it for optimization
     * Example usage:
     * <code>AINSPECTOR.util.smushIt('http://smush.it/css/skin/screenshot.png', function(resp){alert(resp.dest)});</code>
     * This code alerts the path to the optimized result image.
     *
     * @param {String} imgurl URL of the image to optimize
     * @param {Function} callback Callback function that accepts an object returned from smush.it
     */
    smushIt: function(imgurl, callback) {

        var smushurl = 'http://smush.it';
        var url = smushurl + '/ws.php?img=' + encodeURIComponent(imgurl);

        var req = AINSPECTOR.util.getXHR();
        req.open('GET', url, true);

        req.onreadystatechange = function (e) {
            var xhr = e.target;
            if (xhr.readyState === 4) {
                callback(JSON.parse(xhr.responseText));
            }
        };
        req.send(null);
    },

    getNewDoc: function() {
        var generatedPage = null;
        var request       = new XMLHttpRequest();
        getBrowser().selectedTab = getBrowser().addTab('about:blank');
        generatedPage = window;
        request.open("get", "about:blank", false);
        request.overrideMimeType('text/html');
        request.send(null);
        return generatedPage.content.document;
    },

    getHostname: function(url) {
        if (typeof url == "string" && url.length > 0) {
            var iSlashSlash = url.indexOf("//");
            var iPath = -1;

            if (iSlashSlash !== -1) {
                iPath = url.indexOf("/", iSlashSlash+2);
            }
            if (iSlashSlash !== -1 && iPath !== -1) {
                return url.substring(iSlashSlash+2, iPath);
            }
        }
        return '';
    }

};


/**
 * Class that implements the observer pattern.
 *
 * Oversimplified usage:
 * <pre>
 * // subscribe
 * AINSPECTOR.util.event.addListener('martiansAttack', alert);
 * // fire the event
 * AINSPECTOR.util.event.fire('martiansAttack', 'panic!');
 * </pre>
 *
 * More real life usage
 * <pre>
 * var myobj = {
 *   default_action: alert,
 *   panic: function(event) {
 *     this.default_action.call(null, event.message);
 *   }
 * };
 *
 * // subscribe
 * AINSPECTOR.util.event.addListener('martiansAttack', myobj.panic, myobj);
 * // somewhere someone fires the event
 * AINSPECTOR.util.event.fire('martiansAttack', {date: new Date(), message: 'panic!'});
 *
 *
 * @namespace AINSPECTOR.util
 * @class event
 * @static
 */
AINSPECTOR.util.event = {


    /**
     * Hash of subscribers where the key is the event name and the value is an array of callbacks-type objects
     * The callback objects have keys "callback" which is the function to be called and "that" which is the value
     * to be assigned to the "this" object when the function is called
     */
    subscribers: {},

    /**
     * Adds a new listener
     *
     * @param {String} event_name Name of the event
     * @param {Function} callback A function to be called when the event fires
     * @param {Object} that Object to be assigned to the "this" value of the callback function
     */
    addListener: function(event_name, callback, that) {
        if (typeof this.subscribers[event_name] === 'undefined') {
            this.subscribers[event_name] = [];
        }
        this.subscribers[event_name].push({callback: callback, that: that});
    },

    /**
     * Removes a listener
     *
     * @param {String} event_name Name of the event
     * @param {Function} callback The callback function that was added as a listener
     * @return {Boolean} TRUE is the listener was removed successfully, FALSE otherwise (for example in cases when the listener doesn't exist)
     */
    removeListener: function(event_name, callback) {
        var i;
        for (i in this.subscribers[event_name]) {
            if (this.subscribers[event_name][i].callback === callback) {
                this.subscribers[event_name].splice(i, 1);
                return true;
            }
        }
        return false;
    },

    /**
     * Fires the event
     *
     * @param {String} event_nama Name of the event
     * @param {Object} event_object Any object that will be passed to the subscribers, can be anything
     */
    fire: function(event_name, event_object) {
        var i, listener;

        if (typeof this.subscribers[event_name] === 'undefined') {
            return false;
        }

        for (i = 0; i < this.subscribers[event_name].length; i++) {
            listener = this.subscribers[event_name][i];
            listener.callback.call(listener.that, event_object);
        }
        return true;
    },
    dispatchMouseEvent : function (node, eventType, clientX, clientY, button) {
        if (!clientX)
            clientX = 0;
        if (!clientY)
            clientY = 0;
        if (!button)
            button = 0;
        if (typeof node == "string")
            node = $(node);
        var doc = node.ownerDocument;
        var event = doc.createEvent('MouseEvents');
        event.initMouseEvent(eventType, true, true, doc.defaultView,
            0, 0, 0, clientX, clientY, false, false, false, false, button, null);
        node.dispatchEvent(event);
    },
};

AINSPECTOR.util.Preference = {

	    /**
	     * @private
	     */
	    _native : null,

	    /**
	     * Register native preference mechanism.
	     */
	    registerNative: function(o) {
	        this._native = o;
	    },

	    /**
	     * Get Preference with default value.  If the preference does not exist,
	     * return the passed default_value.
	     * @param {String} name name of preference
	     * @return preference value or default value.
	     */
	    getPref: function(name, default_value) {
	        if (this._native) {
	            return this._native.getPref(name, default_value);
	        }
	        return default_value;
	    },

	    /**
	     * Get child preference list in branch.
	     * @param {String} branch_name
	     * @return array of preference values.
	     * @type Array
	     */
	    getPrefList: function(branch_name, default_value) {
	        if (this._native) {
	            return this._native.getPrefList(branch_name, default_value);
	        }
	        return default_value;
	    },

	    /**
	     * Set Preference with passed value.
	     * @param {String} name name of preference
	     * @param {value type} value value to be used to set the preference
	     */
	    setPref: function(name, value) {
	        if (this._native) {
	            this._native.setPref(name, value);
	        }
	    },

	    /**
	     * Delete Preference with passed name.
	     * @param {String} name name of preference to be deleted
	     */
	    deletePref: function(name) {
	        if (this._native) {
	            this._native.deletePref(name);
	        }
	    }


};
