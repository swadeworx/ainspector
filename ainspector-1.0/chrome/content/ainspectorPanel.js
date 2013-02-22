/* See license.txt for terms of usage */

define([
  "firebug/lib/object",
  "firebug/lib/lib",
  "firebug/lib/trace",
  "firebug/lib/locale",
  "firebug/lib/dom",
  "ainspector/openajax_a11y/oaa_a11y_amd",
  "ainspector/headerResizer",
  "ainspector/highlighting/highlight",
  "ainspector/ainspectorUtil",
  "ainspector/ainspectorPreferences",
  "ainspector/ainspectorModule",
  "ainspector/ainspectorListTemplate",
  "ainspector/ainspectorTreeTemplate",
  "ainspector/ainspectorRulesTemplate",
  "ainspector/wcagSummaryTemplate"
  ],
  function(Obj, FBL, FBTrace, Locale, Dom, OpenAjax, HeaderResizer, 
      OAA_WEB_ACCESSIBILITY, AinspectorUtil, AinspectorPreferences) {
  
    var panelName = "ainspector";
  
    Firebug.AinspectorPanel = function AinspectorPanel() {};
  
    /**
     * An instance of the Panel Object is created by the Firebug Framework for each browser tab where Firebug is activated
     */ 
    Firebug.AinspectorPanel.prototype = Obj.extend(Firebug.ActivablePanel, {
  
      name: panelName,
      title: "A11y",
      ruleset_object: null,
      
      onActivationChanged: function(enable) {
      
        if (enable) {
          Firebug.AinspectorModule.addObserver(this);
        } else {
          Firebug.AinspectorModule.removeObserver(this);
        }
      },
  
      /**
       * @method initialize
       * 
       * @desc bind mouse events to the panel to inspect the events that are bound to DOM elements i.e., if
       * any thing goes wrong 
       * automatically called by Firebug Framework when A11y Panel is activated
       * calls the predecessor method (i.e., Firebug Panels initialize()) to
       *   1. set context object reference in panel
       *   2. do some initializations  
       */
      initialize: function() {
          
        if (FBTrace.DBG_AINSPECTOR) 
          FBTrace.sysout("AInspector; AinspectorPanel.initialize");
        
        var header_column_resizer = HeaderResizer.gridHeaderColumnResizer;
        
        this.onMouseClick = Obj.bind(header_column_resizer.onMouseClick, header_column_resizer); 
        this.onMouseDown  = Obj.bind(header_column_resizer.onMouseDown, header_column_resizer);
        this.onMouseMove  = Obj.bind(header_column_resizer.onMouseMove, header_column_resizer);
        this.onMouseUp    = Obj.bind(header_column_resizer.onMouseUp, header_column_resizer);
        this.onMouseOut   = Obj.bind(header_column_resizer.onMouseOut, header_column_resizer);
        
        this.refresh();
        
        Firebug.ActivablePanel.initialize.apply(this, arguments);

      },
      
      /**
       * @method initializeNode
       * 
       * @desc Add mouse event listeners to the panel to resize the column headers of a grid on the panel 
       * Only called by the Firebug at the end of initialize() method
       * 
       */
      initializeNode : function(){
        
        this.panelNode.id = "ainspector-panel";  
        
        this.panelNode.addEventListener("click", this.onMouseClick, true);
        this.panelNode.addEventListener("mousedown", this.onMouseDown, true);
        this.panelNode.addEventListener("mousemove", this.onMouseMove, true);
        this.panelNode.addEventListener("mouseup", this.onMouseUp, true);
        this.panelNode.addEventListener("mouseout", this.onMouseOut, true);
        
//        this.resizeEventTarget = Firebug.chrome.$('fbContentBox');

//        this.panelNode.addEventListener("resize", this.onResizer, true);
        
        Firebug.ActivablePanel.initializeNode.apply(this, arguments);
        
      },
      
      /**
       * @method destroy
       * 
       * @desc remove mouse eventListeners from the panel
       *       only called by Firebug Framework 
       */
      destroyNode: function(state) {
  
        if (FBTrace.DBG_AINSPECTOR)
          FBTrace.sysout("AInspector; AinspectorPanel.destroy");
  
        this.panelNode.removeEventListener("click", this.onMouseClick, true);
        this.panelNode.removeEventListener("mousedown", this.onMouseDown, true);
        this.panelNode.removeEventListener("mousemove", this.onMouseMove, true);
        this.panelNode.removeEventListener("mouseup", this.onMouseUp, true);
        this.panelNode.removeEventListener("mouseout", this.onMouseOut, true);
        
        Firebug.ActivablePanel.destroyNode.apply(this, arguments);
      },
      
      show: function(state) {
       
        Firebug.ActivablePanel.show.apply(this, arguments);

        this.showToolbarButtons("fbPanelToolbar", true);

        if (FBTrace.DBG_AINSPECTOR)
            FBTrace.sysout("AInspector; AinspectorPanel.show;");
      },

      hide: function() {
        
        Firebug.ActivablePanel.hide.apply(this, arguments);

        this.showToolbarButtons("fbPanelToolbar", false);

        if (FBTrace.DBG_AINSPECTOR)
            FBTrace.sysout("AInspector; AinspectorPanel.hide;");
      },
      
      /**
       * @function getContextMenuItems
       */
      getContextMenuItems: function(object, target) {
        return AinspectorUtil.contextMenu.getContextMenuItems(this, arguments);
      },
      
      /**
       * @function getPanelToolbarButtons
       * 
       * @desc Adds toolbar buttons to the A11y Panel
       *       Called by Firebug framework if it exists in the A11y panel
       */
      getPanelToolbarButtons : function() {
        
        var buttons = [];
        buttons.push(
          {
            type       : "menu",
            id         : "views",
            label      : "ainspector.menu.ruleCategories.views",
            items      : this.getRuleCategoriesMenu()
          },
          {
            type       : "menu",
            id         : "rulesets",
            label      : "ainspector.menu.rulesets",
            items      : this.getAllRulesetsMenu()
          },
          {
            type       : "menu",
            id         : "level",
            label      : "ainspector.menu.scLevel",
            tooltiptext: "ainspector.menu.scLevel.tooltip",
            items      : this.getSCLevelMenu()
          },
          {
            type       : "menu",
            id         : "filters",
            label      : "ainspector.menu.filters",
            tooltiptext: "ainspector.menu.filters.tooltip",
            items      : this.getFiltersMenu()
          }
        );
        
        return buttons;
      },
      
      /**
       * @function getRuleCategoriesMenu
       * 
       * @desc creates drop down menu; called by  getPanelToolbarButtons()
       */
      getRuleCategoriesMenu : function(){
        
        if (FBTrace.DBG_AINSPECTOR) 
          FBTrace.sysout("AInspector; AinspectorPanel.getRuleCategoriesMenu-fbPanelToolbar: ", Firebug.chrome.$("fbPanelToolbar").children);
        
        var items = [];
        items.push(
          {
            id     : "onClickRulesMenuItem",
            label  : "ainspector.menuitem.allRules",
            type   : "radio",
            checked: this.isSelected("onClickRulesMenuItem"),
            command: Obj.bindFixed(this.onClickRulesMenuItem, this)
          },
          {
            id     : "onClickCategoriesMenuItem",
            label  : "ainspector.menuitem.categories",
            type   : "radio",
            checked: this.isSelected("onClickCategoriesMenuItem"),
            command: Obj.bindFixed(this.onClickCategoriesMenuItem, this)
          },
          {
            id     : "onClickWCAGMenuItem",
            label  : "ainspector.menuitem.wcag",
            type   : "radio",
            checked: this.isSelected("onClickWCAGMenuItem"),
            command: Obj.bindFixed(this.onClickWCAGMenuItem, this)
          },
          {
            label  :   "-",
          },
          {
            id     : "onClickContentMenuItem",
            label  : "ainspector.menuitem.content",
            type   : "radio",
            checked: this.isSelected("onClickContentMenuItem"),
            command: Obj.bindFixed(this.onClickContentMenuItem, this)
          },
          {
            id     : "onClickHeadersMenuItem",
            label  : "ainspector.menuitem.headers",
            type   : "radio",
            checked: this.isSelected("onClickHeadersMenuItem"),
            command: Obj.bindFixed(this.onClickHeadersMenuItem, this)
          },
          {
            id     : "onClickImagesMenuItem",
            label  : "ainspector.menuitem.images",
            type   : "radio",
            checked: this.isSelected("onClickImagesMenuItem"),
            command: Obj.bindFixed(this.onClickImagesMenuItem, this)
          },
          {
            id     : "onClickControlsMenuItem",
            label  : "ainspector.menuitem.controls",
            type   : "radio",
            checked: this.isSelected("onClickControlsMenuItem"),
            command: Obj.bindFixed(this.onClickControlsMenuItem, this)
          },
          {
            id     : "onClickLinkMenuItem",
            label  : "ainspector.menuitem.links",
            type   : "radio",
            checked: this.isSelected("onClickLinkMenuItem"),
            command: Obj.bindFixed(this.onClickLinkMenuItem, this)
          },
          {
            id     : "onClickAudioMenuItem",
            label  : "ainspector.menuitem.audio",
            type   : "radio",
            checked: this.isSelected("onClickAudioMenuItem"),
            command: Obj.bindFixed(this.onClickAudioMenuItem, this)
          },
          {
            id     : "onClickTablesMenuItem",
            label  : "ainspector.menuitem.tables",
            type   : "radio",
            checked: this.isSelected("onClickTablesMenuItem"),
            command: Obj.bindFixed(this.onClickTablesMenuItem, this)
          },
          {
            id     : "onClickWidgetsMenuItem",
            label  : "ainspector.menuitem.widgets",
            type   : "radio",
            checked: this.isSelected("onClickWidgetsMenuItem"),
            command: Obj.bindFixed(this.onClickWidgetsMenuItem, this)
          }
        );
  
        return items;
      },
      
      /**
       * @function getAllRulesetsMenuItem
       * 
       * @desc Adds menu items for the Ruleset Menu in the A11y toolbar
       */
      getAllRulesetsMenu : function() {
        
        if (FBTrace.DBG_AINSPECTOR) 
          FBTrace.sysout("AInspector; AinspectorPanel.getAllRulesetsMenu-fbPanelToolbar: ", Firebug.chrome.$("fbPanelToolbar").children);
        
        
        var all_rulesets = OpenAjax.a11y.all_rulesets.getAllRulesets();
        
        var items = [];
        var ruleset = null;
        
//        for (var i=0; i<all_rulesets.length; i++) {
//          ruleset=all_rulesets[i];

          items.push({
              id     : all_rulesets[0].ruleset_id,
              nol10n : true,
              label  : all_rulesets[0].ruleset_title + " " + all_rulesets[0].ruleset_version,
              type   : "radio",
              checked: this.checkRuleset(all_rulesets[0].ruleset_id),
              command: Obj.bindFixed(this.setPreferences0, this)
            },
            {
              id     : all_rulesets[1].ruleset_id,
              nol10n : true,
              label  : all_rulesets[1].ruleset_title + " " + all_rulesets[1].ruleset_version,
              type   : "radio",
              checked: this.checkRuleset(all_rulesets[1].ruleset_id),
              command: Obj.bindFixed(this.setPreferences1, this)
            },
            {
            id     : all_rulesets[2].ruleset_id,
              nol10n : true,
              label  : all_rulesets[2].ruleset_title + " " + all_rulesets[2].ruleset_version,
              type   : "radio",
              checked: this.checkRuleset(all_rulesets[2].ruleset_id),
              command: Obj.bindFixed(this.setPreferences2, this)
            }
          );
//        }
        
        items.push(
          {
            label      :   "-",
          },
          {
            id         : "rrules",
            label      : "ainspector.menuitem.recRules.enable",
            type       : "checkbox",
            checked    : "false",
            command    : Obj.bindFixed(this.getRRules, this)
          }
        );
        
        return items;
      },
      
      getSCLevelMenu : function () {
        
        var items = [];
        items.push(
          {
            id         : OpenAjax.a11y.WCAG20_LEVEL.AAA,
            label      : "ainspector.menuitem.scLevel.AAA",
            tooltiptext: "ainspector.menuitem.scLevel.tooltip.AAA",
            type       : "radio",
            checked    : this.checkLevel(OpenAjax.a11y.WCAG20_LEVEL.AAA),
            command    : Obj.bindFixed(this.getAAA, this)
          },
          {
            id         : OpenAjax.a11y.WCAG20_LEVEL.AA,
            label      : "ainspector.menuitem.scLevel.AA",
            tooltiptext: "ainspector.menuitem.scLevel.tooltip.AA",
            type       : "radio",
            checked    : this.checkLevel(OpenAjax.a11y.WCAG20_LEVEL.AA),
            command    : Obj.bindFixed(this.getAA, this)
          },
          {
            id         : OpenAjax.a11y.WCAG20_LEVEL.A,
            label      : "ainspector.menuitem.scLevel.A",
            tooltiptext: "ainspector.menuitem.scLevel.tooltip.A",
            type       : "radio",
            checked    : this.checkLevel(OpenAjax.a11y.WCAG20_LEVEL.A), 
            command    : Obj.bindFixed(this.getA, this),
          }
        );
        return items;
      },
            
      /**
       * @function getFiltersMenu
       * 
       * @desc Add menu items for Filters menu
       */
      getFiltersMenu : function() {
        
        var items = [];
        items.push({
            id     : "emc",
            label  : "ainspector.menuitem.filters.elemc",
            type   : "checkbox",
            checked: this.checkFilterEmc(),
            command: function() {
                var checked = false;
                if (this.hasAttribute("checked")) checked = this.getAttribute("checked");
//                HeaderResizer.Preference.setPref("pass", checked);
                AinspectorUtil.is_emc = checked;

                Firebug.AinspectorPanel.prototype.setPreferences();
                
            }
              //Obj.bindFixed(this.getEMCFilter, this)
          },
          {
            id     : "pmc",
            label  : "ainspector.menuitem.filters.pagemc",
            type   : "checkbox",
            checked: this.checkFilterPmc(),
            command: function() {
              var checked = false;
              if (this.hasAttribute("checked")) checked = this.getAttribute("checked");
//              HeaderResizer.Preference.setPref("pmc", checked);
              AinspectorUtil.is_pmc = checked;
              Firebug.AinspectorPanel.prototype.setPreferences();
          } 
              //Obj.bindFixed(this.getPMCFilter, this),
          },
          {
            id     : "pass",
            label  : "ainspector.menuitem.filters.pass",
            type   : "checkbox",
            checked: this.checkFilterPass(),
            command:function() {
              var checked = false;
              if (this.hasAttribute("checked")) checked = this.getAttribute("checked");
//              HeaderResizer.Preference.setPref("emc", checked);
              AinspectorUtil.is_pass = checked;

              Firebug.AinspectorPanel.prototype.setPreferences();
            }  
              //Obj.bindFixed(this.getPassFilter, this)
          },
          {
            id     : "hidden",
            label  : "ainspector.menuitem.filters.hidden",
            type   : "checkbox",
            checked: this.checkFilterHideden(),
            command:function() {
              var checked = false;
              if (this.hasAttribute("checked")) checked = this.getAttribute("checked");
//              HeaderResizer.Preference.setPref("hidden", checked);
              AinspectorUtil.is_hidden = checked;
              Firebug.AinspectorPanel.prototype.setPreferences();
            }  
              //Obj.bindFixed(this.getHiddenFilter, this)
          }
        );
        
        return items;
      },
      
      refresh : function() {
        ruleset_object = Firebug.AinspectorModule.getRuleResultsObject();
      },
      
      /**
       * @function getPreferences
       * 
       * @desc makes a call to the preferences module
       */
      getPreferences: function(){
        
        window.openDialog("chrome://ainspector/content/preferences/preferences-dialog.xul", "", "chrome,centerscreen,resizable=yes", "");
      },
  
      /**
       * @function onClickRulesMenuItem
       * 
       * @desc response to Headers menu item
       */
      onClickRulesMenuItem : function(){
        if (FBTrace.DBG_AINSPECTOR) 
          FBTrace.sysout("AInspector; AinspectorPanel.getAllRulesetsMenu-fbPanelToolbar: ", Firebug.chrome.$("fbPanelToolbar").children);
        this.setSelectedView("onClickRulesMenuItem");
        
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();
        
        Firebug.AinspectorModule.AinspectorRulesTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.RULE_CATEGORIES.ALL, Locale.$STR("ainspector.views.rules"), "onClickRulesMenuItem");
        
      },
      
      onClickCategoriesMenuItem : function () {
        
        this.setSelectedView("onClickCategoriesMenuItem");
       
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.WcagSummaryTemplate.viewTag(ruleset_object, 
          OpenAjax.a11y.RULE_SUMMARY.CATEGORIES, Locale.$STR("ainspector.views.categories"), "onClickCategoriesMenuItem", "summary");
      },
      
      onClickWCAGMenuItem : function() {
        this.setSelectedView("onClickWCAGMenuItem");
       
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.WcagSummaryTemplate.viewTag(ruleset_object, 
          OpenAjax.a11y.RULE_SUMMARY.WCAG20, Locale.$STR("ainspector.views.wcag"), "onClickWCAGMenuItem", "WCAG 2.0");
      },
      
      /**
       * @function onClickContentMenuItem
       * 
       * @desc response to Text menu item
       */
      onClickContentMenuItem : function() {
        this.setSelectedView("onClickContentMenuItem");

        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorListTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.TEXT, Locale.$STR("ainspector.views.text"), "onClickContentMenuItem");
  
      },
      
      /**
       * @function onClickHeadersMenu
       * 
       * @desc response to Headers menu item
       */
      onClickHeadersMenuItem : function() {
        this.setSelectedView("onClickHeadersMenuItem");
      
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorListTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.HEADINGS_LANDMARKS, Locale.$STR("ainspector.views.headers"), "onClickHeadersMenuItem");
        
      },
      
      /**
       * @function onClickControlsMenu
       * 
       * @desc response to form controls menu item
       */
      onClickControlsMenuItem : function() {
        this.setSelectedView("onClickControlsMenuItem");
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorTreeTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.FORM_CONTROLS, Locale.$STR("ainspector.views.controls"), "onClickControlsMenuItem");
        
      },
      
      /**
       * @function onClickImagesMenuItem
       * 
       * @desc response to Images menu item
       */
      onClickImagesMenuItem : function() {
        this.setSelectedView("onClickImagesMenuItem");
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorListTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.IMAGES, Locale.$STR("ainspector.views.images"), "onClickImagesMenuItem");
      },
      
      /**
       * @function onClickLinksMenuItem
       * 
       * @desc response to Links menu item
       */
      onClickLinkMenuItem : function() {
        this.setSelectedView("onClickLinkMenuItem");
        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorListTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.LINKS, Locale.$STR("ainspector.views.links"), "onClickLinkMenuItem");
  
      },
      
      /**
       * @function onClickAudioMenu
       * 
       * @desc response to audio/video menu item
       */
      onClickAudioMenuItem : function() {
        this.setSelectedView("onClickAudioMenuItem");

        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorListTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.AUDIO_VIDEO, Locale.$STR("ainspector.views.audio"), "onClickAudioMenuItem");
  
      },
      
      /**
       * @function onClickTablesMenu
       * 
       * @desc response to form controls menu item
       */
      onClickTablesMenuItem : function() {
        this.setSelectedView("onClickTablesMenuItem");

        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorTreeTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.TABLES, Locale.$STR("ainspector.views.tables"), "onClickTablesMenuItem");
        
      },
      
      /**
       * @function onClickWidgetsMenu
       * 
       * @desc response to form controls menu item
       */
      onClickWidgetsMenuItem : function() {
        this.setSelectedView("onClickWidgetsMenuItem");

        OAA_WEB_ACCESSIBILITY.util.highlightModule.removeHighlight();

        Firebug.AinspectorModule.AinspectorTreeTemplate.viewTag(ruleset_object, 
            OpenAjax.a11y.ELEMENT_TYPE.WIDGETS, Locale.$STR("ainspector.views.widgets"), "onClickWidgetsMenuItem");
        
      },
      
      /**
       * @function getSelectedMenuItem
       * 
       * Firebug.chrome.$("fbPanelToolbar") gets the tool bar buttons in A11y Panel
       */
      getSelectedMenuItem : function() {
        var menu_popup = Firebug.chrome.$("fbPanelToolbar").children[1];
        var menu_items = menu_popup.children[0].children;
        
        for (var i=0; i<menu_items.length; i++) FBTrace.sysout("menu_item " + i + ": "+ menu_items[i].selected);
      },
      
      /**
       * @function setPreferences
       */
      setPreferences: function() {
        
        var toolbar = Firebug.chrome.$("fbPanelToolbar");
        
        var p = AinspectorPreferences.preferences;
        
        var rulesets = toolbar.children[1].children[0].children;

        /* set the selected ruleset in preferences*/
        for (var i=0; i< rulesets.length; i++) {
          if (i < 3 && rulesets[i].selected == true) {
            p.ruleset_id = rulesets[i].id;
          
          } else {
            if (rulesets[i].selected == true) {
              p.wcag20_recommended_rules_enabled = true;
            }
          }
        }
        
        /* set success criteria level in preferences*/
        var level = toolbar.children[2].children[0].children;
        
        for (var m = 0; m < level.length; m++) {
          if (level[m].selected == true) {
            p.wcag20_level = parseInt(level[m].id);
          } 
        }
        var filters = Firebug.chrome.$("fbPanelToolbar").children[3].children[0].children;
        
        /* update evaluation result filters in to the preferences */
        for (var j=0; j<filters.length; j++) {
          
          var filter = filters[j];
          var pref_filter;

          if (filter.id == "emc") {
            pref_filter =  AinspectorUtil.is_emc;

            if (pref_filter) p.show_results_element_manual_checks = true;
            else p.show_results_element_manual_checks = false;
//            if (filter.selected) p.show_results_element_manual_checks = true;
//            else p.show_results_element_manual_checks = false;
          }
          if (filter.id == "pmc") {
            pref_filter =  AinspectorUtil.is_pmc;

//            if (filter.selected) p.show_results_page_manual_checks = true;
//            else  p.show_results_page_manual_checks = false;
            if (pref_filter) p.show_results_page_manual_checks = true;
            else  p.show_results_page_manual_checks = false;
          }
          if (filter.id == "pass") {
            pref_filter =  AinspectorUtil.is_pass;

//            if (filter.selected) p.show_results_pass = true;
//            else p.show_results_pass = false;
            if (pref_filter) p.show_results_pass = true;
            else p.show_results_pass = false;
          } 
          if (filter.id == "hidden") {
            pref_filter =  AinspectorUtil.is_hidden;

//            if (filter.selected) p.show_results_hidden = true;
//            else p.show_results_hidden = false;
            if (pref_filter) p.show_results_hidden = true;
            else p.show_results_hidden = false;
          }
        }
        
        p.show_results_violations = true;
        p.show_results_not_applicable = true;
        p.show_results_warnings = true;
        AinspectorPreferences.setPreferences(p);
        
        var views = toolbar.children[0].children[0].children;
        
        for (var k=0; k<views.length; k++) {
          if (views[k].selected) {
            var v = views[k].id; 
            this[v]();
            break;
          } 
        }
      },
      
      setSelectedView : function(category) {
        var views = Firebug.chrome.$("fbPanelToolbar").children[0].children[0].children;
        this.setSelected(views, category);
      },
      
      setSelectedRuleset : function(ruleset) {
        var all_rulesets = Firebug.chrome.$("fbPanelToolbar").children[1].children[0].children;
        this.setSelected(all_rulesets, ruleset);
      },
      
      setSelectedLevel : function(level) {
        var all_levels = Firebug.chrome.$("fbPanelToolbar").children[2].children[0].children;
        this.setSelected(all_levels, level);
      },
      
      setSelectedFilter : function(filter) {
        var all_filters = Firebug.chrome.$("fbPanelToolbar").children[3].children[0].children;

        this.setSelectedFilters(all_filters, filter);
      },
      
      setSelected : function(views, view){
        var flag = false;

        for (var i=0; i<views.length; i++) {
          if (views[i].id != view && views[i].selected) {

            views[i].removeAttribute("selected", false);
            flag = true;
          }

          if (views[i].id == view) {
            views[i].setAttribute("selected", true);
            if (flag == true) break;
          }
          
        }
      },
      
      setSelectedFilters : function(filters, filter){

        for (var i=0; i<filters.length; i++) {
          if (filters[i].id == filter) {
            if (filters[i].selected)
              filters[i].removeAttribute("selected", false);
            else
              filters[i].setAttribute("selected", true);
          }
        }

      },
      
      setPreferences0 : function (){this.setSelectedRuleset("ARIA_TRANS"); this.setPreferences();},
      setPreferences1 : function() {this.setSelectedRuleset("ARIA_STRICT_GENERAL"); this.setPreferences();},
      setPreferences2 : function (){this.setSelectedRuleset("ARIA_INFO_WEBSITES"); this.setPreferences();},
      getA : function(){this.setSelectedLevel(OpenAjax.a11y.WCAG20_LEVEL.A); this.setPreferences();},
      getAA : function(){this.setSelectedLevel(OpenAjax.a11y.WCAG20_LEVEL.AA); this.setPreferences();},
      getAAA : function(){this.setSelectedLevel(OpenAjax.a11y.WCAG20_LEVEL.AAA); this.setPreferences();},
      getRRules : function(){this.setSelectedRuleset("rrules"); this.setPreferences();},
      getPassFilter: function(){this.setSelectedFilter("pass"); this.setPreferences();},
      getEMCFilter: function(){this.setSelectedFilter("emc"); this.setPreferences();},
      getPMCFilter: function(){this.setSelectedFilter("pmc"); this.setPreferences();},
      getHiddenFilter: function(){this.setSelectedFilter("hidden"); this.setPreferences();},
      
      checkRuleset : function(id) {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (id == pref.ruleset_id) return true; 
        
      },
      
      checkLevel : function(id) {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (id == pref.wcag20_level) return true; 
        
      },
      
      checkFilterPass : function() {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (pref.show_results_pass) return true; 
      },
      
      checkFilterEmc : function() {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (pref.show_results_element_manual_checks) return true; 
      },
     
      checkFilterHideden : function() {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (pref.show_results_hidden) return true; 
      },
      
      checkFilterPmc : function() {
        
        var pref = AinspectorPreferences.getPreferences();
        
        if (pref.show_results_page_manual_checks) return true; 
      },
      
      isSelected : function(view) {
        var already_selected_view = AinspectorUtil.selectedView; 
        
        if (view == already_selected_view) return true;
        else return false;
      }
  });
  
  Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
  
  // Registration of the A11y panel
  Firebug.registerPanel(Firebug.AinspectorPanel);
  Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");
  
  return Firebug.AinspectorPanel;
  
});
