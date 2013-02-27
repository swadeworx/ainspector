/**
 * Copyright 2013 University Of Illinois
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
define([
    "firebug/lib/object",
    "firebug/lib/trace",
],
function(Obj, FBTrace) {

// ********************************************************************************************* //
// Custom Module Implementation

Firebug.ElementsModule = Obj.extend(Firebug.Module, {

  initialize: function(owner){

    Firebug.Module.initialize.apply(this, arguments);

    // TODO: Module initialization (there is one module instance per browser window)

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; ElementsModule.initialize");
  },

  shutdown: function() {

    Firebug.Module.shutdown.apply(this, arguments);

    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; ElementsModule.shutdown");
  },

  calculateContrast: function(r1, g1, b1, r2, g2, b2) {

    function relativeLuminance(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var rl = r <= 0.03928 ? r / 12.92 : Math.pow((r+0.055) / 1.055, 2.4);
      var gl = g <= 0.03928 ? g / 12.92 : Math.pow((g+0.055) / 1.055, 2.4);
      var bl = b <= 0.03928 ? b / 12.92 : Math.pow((b+0.055) / 1.055, 2.4);

      return rl * 0.2126 + gl * 0.7152 + bl * 0.0722;
    }

    var l1 = relativeLuminance(r1, g1, b1);
    var l2 = relativeLuminance(r2, g2, b2);
    var lighterLuminance = l1 > l2 ? l1 : l2;
    var darkerLuminance = l1 < l2 ? l1 : l2;
    
    return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
  }
});

Firebug.registerModule(Firebug.ElementsModule);

return Firebug.ElementsModule;

});
