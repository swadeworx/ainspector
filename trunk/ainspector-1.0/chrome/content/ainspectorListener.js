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
define(
[
 "firebug/lib/lib",
 "firebug/lib/trace",
 "firebug/lib/dom",
 ],
 
 function(FBL, FBTrace, Dom) {
   
  var AinspectorListener = {
      
      /**
       * @function onGetPanelToolbarButtons
       * 
       * @desc
       * 
       * @param panel
       * @param buttons
       */
      onGetPanelToolbarButtons : function(panel, buttons) {
      
        if (panel.name != "ainspector") return;
//        buttons[1].addEventListener("click", this.onClick, true);

        /*for (var i=0; i<buttons.length; i++) {
          FBTrace.sysout("button before: ", buttons[i+1]);
          buttons[i+1].addEventListener("click", this.onClickToolBarMenu, true);
          FBTrace.sysout("button after: ", buttons[i+1]);
        }*/
        var toolbar = Firebug.chrome.$("fbPanelToolbar");
//        toolbar.addEventListener("click", this.onClickToolBarMenu, true);
        if (FBTrace.DBG_AINSPECTOR) 
          FBTrace.sysout("AInspector; AinspectorListener.onGetPanelToolbarButtons-children: ", toolbar.children);

      },
      
      onClickToolBarMenu : function(event) {
        
        var toolbar = Firebug.chrome.$("fbPanelToolbar").children;
        for (var i=0; i<toolbar.length; i++) {
          if (toolbar[i].checked == true) toolbar[i].setAttribute("checked", false);
        }
        
        event.target.setAttribute("checked", true);
      },
      
      onClickPrefs : function(event) {
        
        var toolbar = Firebug.chrome.$("fbPanelToolbar").children;
        
        for (var i=0; i<toolbar.length; i++) {
          var menus = toolbar[i].children[0].children;

          for (var j=0; j<menus.length; j++) {
            var menu_item = menus[i];
          }
        
        
        
        }
      }
    };

  Firebug.registerUIListener(AinspectorListener);
  
  return AinspectorListener;
});