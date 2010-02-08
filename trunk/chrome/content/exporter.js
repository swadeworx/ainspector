/**
 * This only works on Firefox 3.
 */

AINSPECTOR.Exporter = {

    exportRuleset: function(ruleset) {

        if (typeof ruleset == "object" && typeof ruleset.id == "string" && typeof ruleset.name == "string") {
            // lowercase ruleset.id, mozilla does not support mixed case in chrome.manifest.
            ruleset.id = ruleset.id.toLowerCase();

            var ext = new AINSPECTOR.Extension(ruleset);

            // create chrome.manifest
            ext.createChromeManifest();

            // create install.rdf
            ext.createInstallRDF();

            // create chrome/content/browser.xul
            ext.createBrowserXUL();

            // create chrome/content/ainspector_blog_rules.js
            ext.createMainFile();

            // include defaults/preferences/ainspector_blog_rules.js
            ext.createPreferenceFile();

            // include chrome/content/icon.png
            ext.createIconFile();

            // zip it up into .xpi file, put in Desktop directory
            ext.createXPIFile();

        }

    },

    CHROME_MANIFEST_TEMPLATE: "content \t %ruleset_id% \t chrome/content/ \n" +
        "overlay \t chrome://ainspector/content/browser.xul \t chrome://%ruleset_id%/content/browser.xul \n" +
        "overlay \t chrome://ainspector/content/firebugOverlay.xul \t chrome://%ruleset_id%/content/browser.xul",

    INSTALL_RDF_TEMPLATE: '<?xml version="1.0"?>\n' +
        '<RDF:RDF xmlns:em="http://www.mozilla.org/2004/em-rdf#"\n' +
        '    xmlns:NC="http://home.netscape.com/NC-rdf#"\n' +
        '    xmlns:RDF="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n' +
        '<RDF:Description RDF:about="rdf:#$41y0G2"\n' +
        '           em:id="{ec8030f7-c20a-464f-9b0e-13a3a9e97384}"\n' +
        '           em:minVersion="1"\n' +
        '           em:maxVersion="3.*" />\n' +
        '<RDF:Description RDF:about="urn:mozilla:install-manifest"\n' +
        '           em:id="%ruleset_id%@yahoo-inc.com"\n' +
        '           em:name="AInspector 2 Custom Rules (%ruleset_name%)"\n' +
        '           em:version="1.0"\n' +
        '           em:creator="AInspector 2.0"\n' +
        '           em:description="A AInspector Extension for %ruleset_name% Rules"\n' +
        '           em:homepageURL="http://performance.corp.yahoo.com"\n' +
        '           em:iconURL="chrome://%ruleset_id%/content/icon.png">\n' +
        '<em:targetApplication RDF:resource="rdf:#$41y0G2"/>\n' +
        '</RDF:Description>\n' +
        '</RDF:RDF>\n',

    BROWSER_XUL_TEMPLATE: '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" xmlns:html="http://www.w3.org/1999/xhtml" id="%ruleset_id%-overlay">\n' +
        '<script type="application/x-javascript" src="chrome://%ruleset_id%/content/%ruleset_id%.js"></script>\n' +
        '</overlay>',

    PREF_FILE_TEMPLATE: 'pref("extensions.%ruleset_id%.foo", "bar");',

    MAIN_FILE_TEMPLATE: 'var %ruleset_id% = { \n\n' +
        '    registerRules: function() { \n' +
        '        if (typeof AINSPECTOR !== "undefined") { \n' +
        '            AINSPECTOR.registerRuleset({ \n'+
        '                id: "%ruleset_id%", \n' +
        '                name: "%ruleset_name%", \n' +
        '                rules: { \n' +
        '                    %ruleset_rules% \n' +
        '                } \n' +
        '            }); \n' +
        '        } else { \n' +
        '            alert("AInspector is not loaded yet!"); \n' +
        '        } \n' +
        '    } \n' +
        '}; \n' +
        '%ruleset_id%.registerRules();'

};

AINSPECTOR.Extension = function(ruleset) {

    this.ruleset = ruleset;

    var file = Components.classes["@mozilla.org/file/directory_service;1"]
                    .getService(Components.interfaces.nsIProperties)
                    .get("TmpD", Components.interfaces.nsIFile);

    file.append(ruleset.id+"@yahoo-inc.com");
    if (file.exists()) {
        file.remove(true);
    }
    file.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
    this.file = file;

    // create chrome/content and defaults/preferences folder
    this.content_dir = this.createFolders("chrome", "content");
    this.pref_dir = this.createFolders("defaults", "preferences");


    const PR_RDONLY      = 0x01;
    const PR_WRONLY      = 0x02;
    const PR_RDWR        = 0x04;
    const PR_CREATE_FILE = 0x08;
    const PR_APPEND      = 0x10;
    const PR_TRUNCATE    = 0x20;
    const PR_SYNC        = 0x40;
    const PR_EXCL        = 0x80;

    var zfile = Components.classes["@mozilla.org/file/directory_service;1"]
                       .getService(Components.interfaces.nsIProperties)
                       .get("Desk", Components.interfaces.nsIFile);
    var zipWriter = Components.Constructor("@mozilla.org/zipwriter;1", "nsIZipWriter");
    var zipW = new zipWriter();

    zfile.append(this.ruleset.id+".xpi");
    zipW.open(zfile, PR_RDWR | PR_CREATE_FILE | PR_TRUNCATE);
    zipW.comment = "This is a AInspector Ruleset Extension";
    this.zipW = zipW;

};

AINSPECTOR.Extension.prototype = {

    createFolders: function(folder_name, subfolder_name) {
        var aFile = Components.classes["@mozilla.org/file/local;1"]
                        .createInstance(Components.interfaces.nsILocalFile);

        var path = ((this.file.path.search(/\\/) != -1) ? this.file.path + "\\" : this.file.path + "/") + folder_name;
        aFile.initWithPath(path);
        aFile.create( Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);

        if (typeof subfolder_name == "string" && subfolder_name.length > 0) {
            aFile.append(subfolder_name);
            aFile.create(Components.interfaces.nsIFile.DIRECTORY_TYPE, 0777);
        }
        return aFile;
    },

    writeToArchive: function(dir, filename, aFile) {
        var prefix = '';
        if (this.file.path.length <= dir.path.length) {
            prefix = dir.path.substr(this.file.path.length);
            prefix += prefix.substr(0, 1);
            prefix = prefix.substr(1);
            prefix = prefix.replace(/\\/g, '/');
        }
        this.zipW.addEntryFile(prefix+filename, Components.interfaces.nsIZipWriter.COMPRESSION_DEFAULT, aFile, false);
    },

    writeTextFile: function(dir, filename, data) {
        var aFile = Components.classes["@mozilla.org/file/local;1"]
                        .createInstance(Components.interfaces.nsILocalFile);

        var path = ((dir.path.search(/\\/) != -1) ? dir.path + "\\" : dir.path + "/") + filename;
        aFile.initWithPath(path);
        aFile.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0600);

        var stream = Components.classes["@mozilla.org/network/file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);
        stream.init(aFile, 0x04 | 0x08 | 0x20, 0600, 0); // write, create, truncate

        stream.write(data, data.length);
        stream.close();

        // add to zip file.
        this.writeToArchive(dir, filename, aFile);
    },

    writeBinaryFile: function(dir, filename, data) {
        var aFile = Components.classes["@mozilla.org/file/local;1"]
                        .createInstance(Components.interfaces.nsILocalFile);

        var path = ((dir.path.search(/\\/) != -1) ? dir.path + "\\" : dir.path + "/") + filename;
        aFile.initWithPath(path);
        aFile.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 0600);

        var stream = Components.classes["@mozilla.org/network/safe-file-output-stream;1"]
                         .createInstance(Components.interfaces.nsIFileOutputStream);
        stream.init(aFile, 0x04 | 0x08 | 0x20, 0600, 0); // write, create, truncate

        stream.write(data, data.length);
        if (stream instanceof Components.interfaces.nsISafeOutputStream) {
            stream.finish();
        } else {
            stream.close();
        }

        // add to zip file.
        this.writeToArchive(dir, filename, aFile);
    },

    createChromeManifest: function() {
        var data = AINSPECTOR.Exporter.CHROME_MANIFEST_TEMPLATE.replace(/%ruleset_id%/g, this.ruleset.id);
        this.writeTextFile(this.file, "chrome.manifest", data);
    },

    createInstallRDF: function() {
        var data = AINSPECTOR.Exporter.INSTALL_RDF_TEMPLATE.replace(/%ruleset_id%/g, this.ruleset.id)
                       .replace(/%ruleset_name%/g, this.ruleset.name);
        this.writeTextFile(this.file, "install.rdf", data);
    },

    createBrowserXUL: function() {
        var data = AINSPECTOR.Exporter.BROWSER_XUL_TEMPLATE.replace(/%ruleset_id%/g, this.ruleset.id);
        this.writeTextFile(this.content_dir, "browser.xul", data);
    },

    createMainFile: function() {
        var ruleset_objs = '';

        for (var id in this.ruleset.rules) {
            if (ruleset_objs.length > 0) {
                ruleset_objs += ', \n';
            }
            ruleset_objs += id + ': \t{';

            var rule = this.ruleset.rules[id];
            var rule_txt = '';
            for (var j in rule) {
                if (rule_txt.length > 0) {
                    rule_txt += ', \n';
                }
                rule_txt += '\t\t ' + j + ': \t' + rule[j];
            }
            ruleset_objs += rule_txt + '\n';
            ruleset_objs += '}';
        }

        var data = AINSPECTOR.Exporter.MAIN_FILE_TEMPLATE.replace(/%ruleset_id%/g, this.ruleset.id)
                       .replace(/%ruleset_name%/g, this.ruleset.name)
                       .replace(/%ruleset_rules%/g, ruleset_objs);

        this.writeTextFile(this.content_dir, this.ruleset.id + ".js", data);
    },

    createPreferenceFile: function() {
        var data = AINSPECTOR.Exporter.PREF_FILE_TEMPLATE.replace(/%ruleset_id%/g, this.ruleset.id);
        this.writeTextFile(this.pref_dir, this.ruleset.id + ".js", data);
    },

    createIconFile: function() {

        var MY_ID = "rengine2@yahoo-inc.com";
        var em = Components.classes["@mozilla.org/extensions/manager;1"]
                     .getService(Components.interfaces.nsIExtensionManager);

        var file = em.getInstallLocation(MY_ID).getItemFile(MY_ID, "chrome");
        file.append("content");
        file.append("ainspector");
        file.append("img");
        if (file.exists()) {
            file.append("ruleset-icon.png");

            var istream = Components.classes["@mozilla.org/network/file-input-stream;1"]
                              .createInstance(Components.interfaces.nsIFileInputStream);
            istream.init(file, -1, -1, false);

            var bstream = Components.classes["@mozilla.org/binaryinputstream;1"]
                              .createInstance(Components.interfaces.nsIBinaryInputStream);
            bstream.setInputStream(istream);
            var bytes = bstream.readBytes(bstream.available());

            this.writeBinaryFile(this.content_dir, "icon.png", bytes);

        }
    },

    createXPIFile: function() {

        this.zipW.close();

        // don't forget to clean up temp files.
        this.file.remove(true);
    }

};