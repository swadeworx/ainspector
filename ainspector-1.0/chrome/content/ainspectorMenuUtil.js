/* See license.txt for terms of usage */

define(
[
 "firebug/lib/lib",
 "firebug/lib/trace",
 "firebug/lib/dom",
 "firebug/lib/locale",
 "firebug/chrome/menu",
 "ainspector/openajax_a11y/oaa_a11y_amd",
 "ainspector/ainspectorPreferences"
 ],
 
 function(FBL, FBTrace, Dom, Locale, Menu, OpenAjax, AinspectorPreferences) {
  
  Menu.removeMenuItem = function (element, item) {
    
//   FBTrace.sysout("item: ", item);
//    var label = item.nol10n ? item.label : Locale.$STR(item.label);
    var label = item.label ? item.label : item.attributes[0].nodeValue;
    element.removeAttribute("label", label);

    if (item.id)
        element.removeAttribute("id", item.id);

    if (item.type)
        element.removeAttribute("type", item.type);

    // Avoid closing the popup menu if a preference has been changed.
    // This allows to quickly change more options.
    if (item.type == "checkbox" && !item.closemenu)
        element.removeAttribute("closemenu", "none");

    if (item.checked){
        element.removeAttribute("checked", "true");
//        element.removeAttribute("selected", "true");
    }

    if (item.disabled)
        element.removeAttribute("disabled", "true");

    if (item.image)
    {
        element.removeAttribute("class", "menuitem-iconic");
        element.removeAttribute("image", item.image);
    }

    if (item.command)
        element.addEventListener("command", item.command, false);

    if (item.commandID)
        element.removeAttribute("command", item.commandID);

    if (item.option)
        element.removeAttribute("option", item.option);

    if (item.tooltiptext)
    {
//        var tooltiptext = item.nol10n ? item.tooltiptext : Locale.$STR(item.tooltiptext);
        var tooltiptext = item.tooltiptext ? irem.tooltiptext : '';

        element.removeAttribute("tooltiptext", tooltiptext);
    }

    if (item.className)
        Css.setClass(element, item.className);

    if (item.acceltext)
        element.removeAttribute("acceltext", item.acceltext);
    else if (item.key)
        element.removeAttribute("key", item.key);

    if (item.name)
        element.removeAttribute("name", item.name);

    if (item.items && (item.command || item.commandID))
        element.removeAttribute("type", "splitmenu");

   element.removeChild(item);
   
   return element;
  }
   
  var AinspectorListener = {
      
      /**
       * @function onGetPanelToolbarButtons
       * 
       * @desc Adds/deletes a menu item to the Reports menu on A11y Panel dynamically
       *       menu item could be any of eight rule categories given on the A11y Panel
       *       for e.g., if the Images menu item is selected in the Views menu on A11y panel, then 
       *       onGetPanelToolbarButtons() dynamically adds a menu item 'Image Elements' to the 'Reports' menu on the A11y Panel
       *       if the Widgets menu item is selected in the Views menu, then onGetPanelToolbarButtons() removes the 'Image Elements'
       *       menu item from 'Reports' menu and adds 'Widget Elements' menu item to 'Reports'
       *       If other than a rule category is selected in the 'Views' menu (i.e., summary related views), onGetPanelToolbarButtons()
       *       deletes the previously added rule categories menu item from 'Reports' menu 
       * 
       * @param ruleset_object
       * @param menuItem
       */
      onGetPanelToolbarButtons : function(ruleset_object, menuItem) {
      
        var panel = Firebug.currentContext.getPanel("ainspector");
        var buttons = Firebug.chrome.$("fbPanelToolbar");
        if (panel.name != "ainspector") return;

        var reports_menu = buttons.children[4].children[0];        
        
        if (FBTrace.DBG_AINSPECTOR)       
          FBTrace.sysout("AInspector; AinspectorListener.onGetPanelToolbarButtons-reports_menu: ", reports_menu);
        
        if (reports_menu.children[2]) Menu.removeMenuItem(reports_menu, reports_menu.children[2]);
        
        if (menuItem != null) {
            
        	var menu_item = {
            label  : menuItem,
            nol10n : true,
            command: function(){
              AinspectorListener.showElementReport(ruleset_object, menuItem);
            }
          };
          Menu.createMenuItem(reports_menu, menu_item);
        }

//      FBTrace.sysout("AInspector; AinspectorListener.onGetPanelToolbarButtons-children: ", reports_menu);

      },
      
      /**
       * @function showReport
       * 
       * @desc writes HTML and CSV report to a file and saves it locally on the disk
       * 
       *  @param {String}id - type of element report
       */
      showElementReport : function(ruleset_object, id) {
        
        Components.utils.import("resource://gre/modules/FileUtils.jsm");
        var rule_category;
        var preferences = AinspectorPreferences.getPreferences();
        var option;
        
        switch(id) {
        
          case 'Text Elements': 
            option = OpenAjax.a11y.ELEMENT_TYPE.TEXT; 
            break;
          case 'Heading and Landmark Elements':
            option = OpenAjax.a11y.ELEMENT_TYPE.HEADINGS_LANDMARKS;
            break;
          case 'Image Elements': 
            option = OpenAjax.a11y.ELEMENT_TYPE.IMAGES; 
            break;
          case 'Form Control Elements':
            option = OpenAjax.a11y.ELEMENT_TYPE.FORM_CONTROLS;
            break;
          case 'Link Elements': 
            option = OpenAjax.a11y.ELEMENT_TYPE.LINKS; 
            break;
          case 'Audio/Video/Object Elements':
            option = OpenAjax.a11y.ELEMENT_TYPE.AUDIO_VIDEO;
            break;
          case 'Table Elements': 
            option = OpenAjax.a11y.ELEMENT_TYPE.LAYOUT_TABLES; 
            break;
          case 'Widget Elements':
            option = OpenAjax.a11y.ELEMENT_TYPE.WIDGETS;
            break;
        }
        var element_results = ruleset_object.getCacheItemsByElementType(option, preferences.show_results_filter_value);
        
        OpenAjax.a11y.report_css                    = OpenAjax.a11y.util.initStringUsingURL('chrome://ainspector/content/openajax_a11y/reports/oaa_report.css');
        OpenAjax.a11y.report_element_type_view_js   = OpenAjax.a11y.util.initStringUsingURL('chrome://ainspector/content/openajax_a11y/reports/oaa_report_element_type_view.js');
        OpenAjax.a11y.report_element_type_view_body = OpenAjax.a11y.util.initStringUsingURL('chrome://ainspector/content/openajax_a11y/reports/oaa_report_element_type_view.inc');

        if (!element_results) return;

        var html = element_results.toHTML(id);

        var dir = FileUtils.getDir('TmpD', [], true, true);
        var file = FileUtils.getFile('TmpD', ['ai_report_element_summary.html']);
        var fileStream = FileUtils.openSafeFileOutputStream(file, 0x02 | 0x08 | 0x20, 0644, 0);
        
        fileStream.write(html, html.length);
        FileUtils.closeSafeFileOutputStream(fileStream);
            
        window.open("file:\\"+file.path,'mywindow','');

        file = FileUtils.getFile('TmpD', ['ai_report_element_summary.csv']);
        fileStream = FileUtils.openSafeFileOutputStream(file, 0x02 | 0x08 | 0x20, 0644, 0);  
        
        var csv = element_results.toCSV(id);

        fileStream.write(csv, csv.length);
        FileUtils.closeSafeFileOutputStream(fileStream);
      }
    };

//  Firebug.registerUIListener(AinspectorListener);
  
  return AinspectorListener;
});