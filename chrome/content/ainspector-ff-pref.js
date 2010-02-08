/**
 * Preferences
 */

AINSPECTOR.firefox.Preference = {

    /**
     * Get Preference value from Mozilla preferences-service.
     * @param name of preference to get.
     * @return preference value
     */
    getPrefValue: function(name) {
        var nsIPrefBranch = Components.interfaces.nsIPrefBranch;
        var nsIPrefBranch2 = Components.interfaces.nsIPrefBranch2;
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(nsIPrefBranch2);
        var prefDomain = "extensions.ainspector";

        //Check if this is global firefox preference.
        var prefName;
        if ( name.indexOf("extensions.") !== -1 || name.indexOf("browser.") !== -1)  {
            prefName = name;
        } else {
            prefName = prefDomain + "." + name;
        }

        var type = prefs.getPrefType(prefName);
        if (type == nsIPrefBranch.PREF_STRING) {
            return prefs.getCharPref(prefName);
        } else if (type == nsIPrefBranch.PREF_INT) {
            return prefs.getIntPref(prefName);
        } else if (type == nsIPrefBranch.PREF_BOOL) {
            return prefs.getBoolPref(prefName);
        }
        return undefined;
    },

    /**
     * Get Preference with default value.  If the preference does not exist,
     * return the passed default_value.
     * @param preference name
     * @return preference value or default value.
     */
    getPref: function(name, default_value) {
        var val = this.getPrefValue(name);
        return (("undefined" == typeof val) ? default_value : val);
    },

    /**
     * Set Preference.
     * @param preference name
     * @param preference value
     */
    setPref: function(name, value) {
        var nsIPrefBranch = Components.interfaces.nsIPrefBranch;
        var nsIPrefBranch2 = Components.interfaces.nsIPrefBranch2;
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(nsIPrefBranch2);
        var prefDomain = "extensions.ainspector";

        //Check if this is global firefox preference.
        var prefName;
        if ( name.indexOf("extensions.") !== -1) {
            prefName = name;
        } else {
            prefName = prefDomain + "." + name;
        }

        if (typeof value == "string") {
            prefs.setCharPref(prefName, value);
        } else if (typeof value == "number") {
            prefs.setIntPref(prefName, value);
        } else if (typeof value == "boolean") {
            prefs.setBoolPref(prefName, value);
        } else {
            prefs.setCharPref(prefName, value.toString());
        }
    }

};
AINSPECTOR.util.Preference.registerNative(AINSPECTOR.firefox.Preference);

