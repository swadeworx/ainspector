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
        FBTrace.sysout("Firebug.chrome.children: ", toolbar.children);

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