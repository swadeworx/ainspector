/**
 *
 * Example of a tool object:
 *
 * <pre>
 * AINSPECTOR.registerTool({
 *
 *     id: 'mytool',
 *     name: 'Custom tool #3',
 *     print_output: true,
 *     run: function(doc, components) {
 *         return 'I am a custom tool';
 *     }
 * });
 * </pre>
 */

AINSPECTOR.Tools = {

    tools: {},

    custom_tools: [],

    addBuiltinTool: function(tool) {
        this.tools[tool.id] = tool;
    },

    addCustomTool: function(tool) {
        this.custom_tools[tool.id] = tool;
    },

    getTool: function(tool_id) {
        var tool = this.tools[tool_id];
        if (tool === undefined) {
            tool = this.custom_tools[tool_id];
        }
        return tool;
    },

    getCustomTools: function() {
        return this.custom_tools;
    },

    getAllTools: function() {
        var aTools = [];
        var id;
        for (id in this.tools) {
            aTools.push(this.tools[id]);
        }
        for (id in this.custom_tools) {
            aTools.push(this.custom_tools[id]);
        }
        return aTools;
    },
/*
    loadAllJS: function(doc, components, beautify) {

        var aComponents = components.getComponentsByType('js');
        var i;

        var renderer = new AINSPECTOR.ToolResult();
        renderer.addTitle(((beautify) ? '' : '') + " JavaScript for: " + AINSPECTOR.util.escapeHtml(doc.location.href));

        // Iterate over the external JS files.
        for (i = 0; i < aComponents.length; i++) {
            var compObj = aComponents[i];
            if (typeof compObj.body == "string" && compObj.body.length > 0) {
                var heading = AINSPECTOR.util.escapeHtml(compObj.url);
                var body = AINSPECTOR.util.escapeHtml((beautify !== undefined) ? js_beautify(compObj.body) : compObj.body );
                renderer.addContent(heading, body);
            }
        }

        // Iterate over the inline SCRIPT blocks
        var aScripts = doc.getElementsByTagName('script');
        var index = 0;
        for (i = 0; i < aScripts.length; i++) {
            var script = aScripts[i];
            if (!script.src) { // avoid external script objects
                index++;
                var heading = "inline script block #" + parseInt(index, 10);
                var body = AINSPECTOR.util.escapeHtml((beautify !== undefined) ? js_beautify(script.textContent) : script.textContent);
                renderer.addContent(heading, body);
            }
        }
        return renderer.htmlview();

    },

    loadAllCSS: function(doc, components) {

        var aComponents = components.getComponentsByType('css');
        var i;

        var renderer = new AINSPECTOR.ToolResult();
        renderer.addTitle("All CSS for: " + AINSPECTOR.util.escapeHtml(doc.location.href));

        // Iterate over the external files.
        for (i = 0; i < aComponents.length; i++) {
            var compObj = aComponents[i];
            if (typeof compObj.body == "string" && compObj.body.length > 0) {
                var heading = AINSPECTOR.util.escapeHtml(compObj.url);
                var body = AINSPECTOR.util.escapeHtml(compObj.body);
                renderer.addContent(heading, body);
            }
        }

        // Iterate over the inline STYLE blocks.
        var aElements = doc.getElementsByTagName('style');
        var bFirstInline = true;
        for (i = 0; i < aElements.length; i++) {
            var elem = aElements[i];
            if (elem.innerHTML) { // avoid external elem objects
                var heading = '';
                if (bFirstInline) {
                    heading = 'inline style blocks';
                    bFirstInline = false;
                }
                renderer.addContent(heading, AINSPECTOR.util.escapeHtml(elem.textContent));
            }
        }
        return renderer.htmlview();

    },
*/
    printable: function(doc, components, param) {
        AINSPECTOR.renderer.bPrintable = true;

        // read the ainspector logo as a binary stream, then base64 and use as data URI
        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
        var req = new XMLHttpRequest();
        req.open('GET', 'chrome://ainspector/content/ainspector/img/logo_32x32.png', false);
        req.overrideMimeType('text/plain; charset=x-user-defined');
        req.send(null);
        var logo = req.responseText;
        var logobytes = '';
        for (var i = 0; i < logo.length; i++) {
            logobytes += String.fromCharCode(logo.charCodeAt(i) & 0xff);
        }
        var data_uri = 'data:image/png;base64,' + btoa(logobytes);
        var plot_component = false;
        var cnt = '<div id="printableDiv">'
                  + '<div id="print-title"><h1><img src="' + data_uri +'" align="absbottom" alt="ally inspector logo"/>A11y Inspector for Firebug</h1></div>'
                  + '<hr />';

        //Print the website address:
        cnt += '<div class="pageURL"><span>URL:</span>'
               + '<span>'
               + AINSPECTOR.util.prettyAnchor(doc.location.href, doc.location.href)
               + '</span></div>' +

        '<div id="ainspectorDiv">';	//ainspectorDiv start
         if (param && param.yscontext) {
            if (param.options === undefined) {
                param.options = { 'reportcard': 1, 'headings': 1, 'roles': 1, 'forms': 1, 'images': 1, 'links': 1 };
            }
            for (var view in param.options) {
                var sText = '<div class="section">';
                
                var rulesetName = ' (' + FBL.$STR('rulesetApplied', 'a11y_bundle') + ': ' + AINSPECTOR.controller.rulesets[param.yscontext.ruleset_id].name + ') ';
                switch (view) {
                case 'reportcard':
                    sText += '<div class="title">Grade</div><div class="contentDiv">' + param.yscontext.genPerformance();
                    break;
                case 'headings':
                    sText += '<div class="title">' + FBL.$STR('headingsGrid.title', 'a11y_bundle') + rulesetName + '</div><div class="contentDiv">' + param.yscontext.genTab(view);
                    break;
                case 'roles':
                    sText += '<div class="title">' + FBL.$STR('rolesGrid.title', 'a11y_bundle') + rulesetName + '</div><div class="contentDiv">' + param.yscontext.genTab(view);
                    break;
                case 'forms':
                    sText += '<div class="title">' + FBL.$STR('formsGrid.title', 'a11y_bundle') + rulesetName + '</div><div class="contentDiv">' + param.yscontext.genTab(view);
                    break;
                case 'images':
                    sText += '<div class="title">' + FBL.$STR('imgGrid.title', 'a11y_bundle') + rulesetName + '</div><div class="contentDiv">' + param.yscontext.genTab(view);
                    break;
                case 'links':
                    sText += '<div class="title">' + FBL.$STR('linksGrid.title', 'a11y_bundle') + rulesetName + '</div><div class="contentDiv">' + param.yscontext.genTab(view);
                    break;
                default:
                    continue;
                }
                if (sText.length > 0) {
                    cnt += sText + '</div></div>';
                }
            }
        }

        cnt += '</div>\n' + //ainspectorDiv END
        '<br />';


        //If we were generating performance stats for a printable version, we should reset this flag after we are done.
        //This is required so that performance output on the FF panel remains unexpanded and correctly formated.
        AINSPECTOR.renderer.bPrintable = false;

        // add styling
        var URI = 'chrome://ainspector/content/ainspector/printable.css';
        var req2 = new XMLHttpRequest();
        req2.open('GET', URI, false);
        req2.overrideMimeType('text/css');
        req2.send(null);
        var css = req2.responseText;
        //SMF format for A11y Grade Printable View - look at contentBefore
        req2.open('GET', 'chrome://ainspector/content/ainspector/allyGrade.css', false);
        req2.overrideMimeType('text/css');
        req2.send(null);
        css += req2.responseText;
       
        return { 'css': css, 'html': cnt, 'plot_component': plot_component };

    }

};

AINSPECTOR.ToolResult = function() {
    this.title = '';
    this.content = [];
};

AINSPECTOR.ToolResult.prototype = {

    addTitle: function(title) {
        this.title = title;
    },

    addContent: function(heading, body) {
        this.content[this.content.length] = {'heading': heading, 'content': body };
    },

    htmlview: function() {
        var html = '';
        var toc = '';

        toc += '<ol>';
        if (this.content.length > 0) {
            html += '<pre>';
            for (var j = 0; j < this.content.length; j++) {
                toc += '<li><a href="about:blank#' + j + '">' + this.content[j].heading + '</a></li>';
                html += '<div id="#' + j + '">' +  '\n\n/*******************************************************************************\n  ' +
                    this.content[j].heading +
                    '\n*******************************************************************************/\n</div>';
                html += this.content[j].content;
            }
            html += '</pre>';
        }
        toc += '</ol>';

        html = toc + html;
        if (typeof this.title == "string" && this.title.length > 0) {
            html = '<h1>' + this.title + '</h1>' + html;
        }

        return html;
    }

};

/**
 * Register tools
 */

AINSPECTOR.Tools.addBuiltinTool({
    id: 'printableview',
    name: 'Printable View',
    short_desc: 'Show a printable view of grades',
    print_output: true,
    run: function(doc, components, param) {
        return AINSPECTOR.Tools.printable(doc, components, param);
    }
});

