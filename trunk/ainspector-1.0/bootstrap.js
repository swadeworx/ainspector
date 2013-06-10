/*
 * Copyright 2011 University Of Illinois
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file bootstrap.js
 * 
 * Applies user interface to the application, programmatically inserts themselves 
 * into the application.
 * 
 * Contains functions that the browser calls to command the extension to 
 * install, uninstall, start up and shut down.
 * 
 * Application calls into bootstrap.js script file; the extension is responsible for 
 * adding and removing its user interface and handling any other setup and shutdown tasks. 
 */
var {classes: Cc, interfaces: Ci, utils: Cu} = Components;

//Extension installation path. Set within startup callback.
var installPath;

/**
 * @function install
 * 
 * @desc bootstrap script must include install() function and calls before the 
 *       first call to startup() is made after the exstension is installed, upgraded 
 *       or downgraded. 
 * 
 * @param {Object} data - bootstrap data structure
 * @param reason - one of the reason constants indicating why the extension is being installed.
 *                 (example., ADDON_INSTALL, ADDON_UPGRADE, or ADDON_DOWNGRADE)
 * @returns
 */
function install(data, reason) {}

/**
 * @function uninstall
 * 
 * @desc called after the last call to shutdown() before a particular version of extension is uninstalled
 *        uninstall() will not be called if install() was never called
 * 
 * @param {Object} data - bootstrap data structure
 * @param reason - one of the reason constants indicating why the extension is being uninstalled.
 *                (example., ADDON_UNINSTALL, ADDON_UPGRADE, or ADDON_DOWNGRADE)
 * @returns
 */
function uninstall(data, reason) {}

/**
 * @function startup
 * 
 * @desc key feature of bootstrapped extension
 * statup() is called:
 *   1. When the extension is first installed
 *   2. When the extension becomes enabled using add-on's manager
 *   3. When the application is started up, if the extension is enabled and compatible with the application
 * 
 * @param {Object} data - bootstrap data structure with the properties:
 *        1. {String}  id           - ID of add-on being bootstrapped
 *        2. {String}  version      - version of the add-on being bootstrapped
 *        3. {nsIFile} installPath  - The installation location of the add-on being bootstrapped
 *        4. {nsIURI}  resourceURI  - A URI pointing at the root of the add-ons files 
 * @param reason - reason constants to call the startup function (example., APP_STARTUP, 
 *        ADDON_ENABLE, ADDON_INSTALL, ADDON_UPGRADE, or ADDON_DOWNGRADE)
 *        
 * @returns
 */
function startup(data, reason){

  //Remember so, we can use later within firebugStartup callback.
  installPath = data.installPath;

  //Firebug extensions Start-up call back
  firebugStartup();
}

/**
 * @function shutdown
 * 
 * @desc key feature of bootstrapped extension
 * shutdown() is called:
 *  1. When the extension is uninstalled
 *  2. When the extension becomes disabled
 *  3. When the user quits the application i.e., firefox browser, if the extension is enabled
 * 
 * @param {Object} data - bootstrap data structure with the properties:
 *        1. {String}  id           - ID of add-on being bootstrapped
 *        2. {String}  version      - version of the add-on being bootstrapped
 *        3. {nsIFile} installPath  - The installation location of the add-on being bootstrapped
 *        4. {nsIURI}  resourceURI  - A URI pointing at the root of the add-ons files 
 * @param reason - reason constants indicating when the extension being shut down(example., APP_SHUTDOWN,
 *                 ADDON_DISABLE, ADDON_UNINSTALL, ADDON_UPGRADE, or ADDON_DOWNGRADE)
 */
function shutdown(data, reason) {
  
  // Firebug extensions Shut-down call back
  firebugShutdown();
  
}

/**
 * @function isFirebugLoaded
 * 
 * @desc Imports Firebug modules into this scope. 
 *       Fails if Firebug isn't loaded yet
 * 
 * @returns
 */
function isFirebugLoaded() {
  
  try {
    Cu.import("resource://firebug/loader.js");        
    Cu.import("resource://firebug/prefLoader.js");
    
    return true;
  } catch(e) {
    
  }
  return true;
}

/**
 * @function firebugStartup
 * Called by bootstrap's startup()
 * 
 * @desc Executed by Firebug framework when Firebug is started. 
 * Since the order of Firebug and its bootstrapped extensions is not guaranteed 
 * this function is executed twice. 
 *  1. When Firebug is loaded 
 *  2. When this extension is loaded 
 * 
 * @returns
 */
function firebugStartup() {
  
  if (!isFirebugLoaded()) return;
  
  //Loads firebug for each new tab when a location is specified on the address bar 
  FirebugLoader.registerBootstrapScope(this);
  
  //Load default preferences (prefs.js sets the logging options to show them on the Firebug's trace window)
  PrefLoader.loadDefaultPrefs(installPath, "prefs.js");
}

/**
 * @function firebugShutdown
 * Called by bootstrap's shutdown()
 * 
 * @desc Executed by Firefox when this extension shutdowns.
 * 
 * @returns
 */
function firebugShutdown() {
  
  try {
    FirebugLoader.unregisterBootstrapScope(this);
  } catch(e){
    Cu.reportError(e);
  }
}

/**
 * @function topWindowLoad
 * 
 * @desc Executed by Firebug framework for every browser window
 * 
 * @param {Window} win-The browser window
 * 
 * @returns
 */
function topWindowLoad(win) {
  
}

/**
 * @function topWindowUnload
 * 
 * @desc Executed by Firebug framework for every browser window
 * 
 * @param {Window} win-The browser window
 * 
 * @returns
 */
function topWindowUnload(win) {
  
}

/**
 * @function firebugFrameLoad
 * 
 * @desc  Executed by Firebug framework when the frame (Entire Firebug UI is 
 * running inside an iframe i.e., firebugFrame.xul) is loaded.
 * This loading happens only when the user requires Firebug to load for the first time
 *  1. Registers trace listener the customizes trace logs coming from this extension
 *  2. Registration process will automatically look for 'main' (main.js) module and loads it.
 *    
 * @param {Window} Firebug-The Firebug window
 * 
 * @returns
 */
function firebugFrameLoad(Firebug) {
  
  // * AInspector; is unique prefix of all messages that should be customized.    
  // * DBG_AINSPECTOR is a class name with style defined in the specified stylesheet.
  Firebug.registerTracePrefix("AInspector;", "DBG_AINSPECTOR", true, "chrome://ainspector/skin/ainspector.css");
  
  // The registration process will automatically look for 'main' module and load it.    
  // The is the same what happens in a XUL overlay applied on:   
  // chrome://firebug/content/firebugOverlay.xul
  var config = {id: "ainspector-fb@cita.illinois.edu"};    
  Firebug.registerExtension("ainspector", config);
}

/**
 * @function firebugFrameUnload
 * 
 * @desc
 * 
 * @param {Window} Firebug-The Firebug window
 * 
 * @returns
 */
function firebugFrameUnload(Firebug) {
  
  if (!Firebug.isInitialized) return;
  
  Firebug.unregisterExtension("ainspector");
  Firebug.unregisterTracePrefix("AInspector;");
}