/**
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

//AINSPECTOR.navigation = function(panel) {

with (FBL) {
  
  panel : null;
  headings_panel : null;
  links_panel : null;
  cache : null;
  
  /**
   * navigationPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var navigationPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {nav_toolbar_buttons : "$nav_toolbar_buttons"}),
                  DIV({style : "clear: both"})        
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                       FOR("obj", "$nav_toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|getTabIndex", role : "tab", "aria-selected" : "$obj|getSelectedState", onfocus : "$onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
                
    ),
 
    /**
     * onClick
     * 
     * @desc
     * 
     * @param event
     */
    onClick : function(event) {
      var toolbar_button = event.currentTarget.id;
      
      if (toolbar_button == "Links") {
      	clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
          navigationPanel.getNavButtons(links_panel, toolbar_button);
          FBTrace.sysout("linksPanelk.........." , links_panel);
      	linksPanel.displayLinksPanel(links_panel, cache.dom_cache.links_cache);
        } 
        else if (toolbar_button == "Headings") {
          clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);

          navigationPanel.getNavButtons(panel, toolbar_button);
        }
        else if (toolbar_button == "Landmarks") {
          clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
          navigationPanel.getNavButtons(panel, toolbar_button);
        }
        else if (toolbar_button == "Widgets") {
          clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
          navigationPanel.getNavButtons(panel, toolbar_button);
        
        }
        else if (toolbar_button == "Forms") {
          clearNode(panel.panelNode);
          clearNode(Firebug.currentContext.getPanel('rulesSidePanel').panelNode);
          navigationPanel.getNavButtons(panel, toolbar_button);
        }

    },
            
    /**
     * selectTab
     * 
     * @param elem
     * @returns
     */
    selectTab : function(elem) {
    
      if (!elem) return;
      
      var category = getClassValue(elem, "ruleCategory");
    
      if (category) {
        var tabList = getAncestorByClass(elem, "focusTabList");
        
        if (tabList) {
          var oldTab = getElementByClass(tabList, "selected");
          
          if (oldTab) {
            oldTab.setAttribute("aria-selected", "false");
            oldTab.setAttribute("aria-expanded", "false");
            oldTab.setAttribute("tabindex", "-1");
            removeClass(oldTab, "selected");
          }
        }
        elem.setAttribute("aria-selected", "true");
        elem.setAttribute("aria-expanded", "true");
        elem.setAttribute("tabindex", "0");
        setClass(elem, "selected");
        var currentView = panel;
        
        if (currentView && typeof currentView["show" + category] == "function") {
          currentView["show" + category]();
        }
      }
    },
  
    /**
     * getSelectedState
     * 
     * @param obj
     * @returns
     */
    getSelectedState : function (obj) {
      return obj.selected ? "true" : "false";
    },

    /**
     * getTabIndex
     * 
     * @param obj
     * @returns
     */
    getTabIndex : function(obj) {
      
      return obj.selected ? "0" : "-1";
    },

    /**
     * getToolbarButtonClass
     * 
     * @param obj
     * @returns
     */
    getToolbarButtonClass : function(obj) {
      
      var className = "ruleCategory-" + obj.name;
      
      if (obj.selected) className += " selected";
      
      if (obj.first) className += " first";
    
      return className;
    },

    /**
     * onToolbarFocus
     * 
     * @desc
     * 
     * @param event
     * @returns
     */
    onToolbarFocus : function(event) {
      this.selectTab(event.target);
    },

    /**
     * onToolbarKeyPress
     * 
     * @desc
     * 
     * @param event
     * @returns
     */
    onToolbarKeyPress : function(event) {
      var key = event.keyCode;
      
      switch(key) {
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
        case KeyEvent.DOM_VK_UP:
        case KeyEvent.DOM_VK_DOWN:

          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          var tabList = getAncestorByClass(event.target, "focusTabList");
          var tabs = tabList.getElementsByClassName("focusTab");
          var currentIndex = Array.indexOf(tabs, event.target);
          
          if (currentIndex != -1) {
            var newIndex = forward ? ++currentIndex : --currentIndex;
            newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
            
            if (tabs[newIndex]) tabs[newIndex].focus();
          }
          event.stopPropagation();
          event.preventDefault();
          
          break;
        } //end switch
      },
            
      viewContainer : DIV({style : "display:none"})
    });
        
    var navigationPanel = {  
      
      /**
       * navigationView
       * 
       * @desc
       * 
       * @param nav_toolbar_buttons
       * @param toolbar
       * @param panelView
       * @param cacheResult
       * @returns
       */
      navigationView : function(nav_toolbar_buttons, toolbar, panelView, cacheResult) {
        
        navigationPlate.toolbar.replace({nav_toolbar_buttons : nav_toolbar_buttons}, toolbar, navigationPlate);
        toolbar.style.display = "block";
        panelView.panelNode.id = "ainspector-panel"; 
        panelView.panelNode.appendChild(toolbar);
        
        panel = panelView;
        links_panel = panelView;
        headings_panel = panelView;
        cache = cacheResult;
        FBTrace.sysout("panelView...", panelView.panelNode);
        linksPanel.displayLinksPanel(panelView, cacheResult.dom_cache.links_cache);
        Firebug.currentContext.getPanel('rulesSidePanel').sView(true);
      },
        
      /**
       * getNavButtons
       * 
       * @desc
       * 
       * @param panel
       * @param buttonView
       * @returns
       */
      getNavButtons : function(panel, buttonView){
         
    	var nav_toolbar_buttons = [
    	        {name: "Links", selected : false},
                {name : "Headings", selected : false},
                {name : "Landmarks", selected : false},
                {name : "Widgets", selected : false},
                {name : "Forms", selected : false}];
        
    	for (var i =0; i < nav_toolbar_buttons.length; i++) {
        
    	  if (nav_toolbar_buttons[i].name == buttonView) {
            nav_toolbar_buttons[i].selected = true;
          }
        }
        
    	this.loadCSS("chrome://ainspector/content/css/ainspector-panel.css", panel.document);
    	this.loadCSS("chrome://ainspector/content/css/ainspector-side-panel.css", panel.document);
    	this.loadCSS("chrome://ainspector/content/css/fonts-min.css", panel.document);
	    this.loadCSS("chrome://ainspector/content/css/tabview.css", panel.document);
	  //  this.loadCSS("chrome://ainspector/content/css/ainspector.css",panel.document);
	    this.loadCSS("chrome://ainspector/content/css/allyGrade.css", panel.document);
	    this.loadCSS("chrome://ainspector/content/css/grid.css", panel.document); //net.css
    	  
    	var toolbar = panel.document.createElement("div");
	    toolbar.id = "toolbarDiv";
	    
	    navigationPlate.toolbar.replace({nav_toolbar_buttons : nav_toolbar_buttons}, toolbar, navigationPlate);
        
	    toolbar.style.display = "block";
        panel.panelNode.id = "ainspector-panel"; 
        panel.panelNode.appendChild(toolbar);
       
      },
      
      /**
       * loadCSS
       * 
       * @desc
       * 
       * @param url
       * @param doc
       * @returns
       */
      loadCSS : function(url, doc) {
        
    	if ( ! doc ) return '';

    	var newCss = doc.createElement("link");
        newCss.rel = "stylesheet";
        newCss.type = "text\/css";
        newCss.href = url;
        
        doc.body.appendChild(newCss);

        return newCss;
      }
    };      
  };
  