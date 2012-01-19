with (FBL) {
  
  panel : null;
  image_view : null;
  media_view : null;
  abbreviation_view: null;
  image_elements: null;
  media_elements: null;
  abbreviation_elements: null;
  
  /**
   * imageToolbarPlate
   * 
   * @Domplate
   * 
   * @desc template creates the content for navigation button
   */
  var imageToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
                TAG("$toolbarButtons", {toolbar_buttons : "$images_toolbar_buttons"}),
                BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|toolbarUtil.getSelectedState", onfocus : "$toolbarUtil.onToolbarFocus"},
                             "$obj.name"
                         )//end LI
                       )//end for
    
    ),
    
    /**
     * toHTMLPanel
     * 
     * @desc redirect to the HTML Panel of Firebug
     * 
     * @param event event triggered on a row in the Links Table
     */
    toHTMLPanel: function(event) {
      FBTrace.sysout("inside pane-images event", event);

      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
      FBTrace.sysout("inside pane-images table", table);

	  var row =  getChildByClass(event.target.offsetParent, "tableRow");
      var child;
      var tbody = table.children[1];
      var node = null;

      for (var i = 0; i < tbody.children.length; i++) {
        var flag = false;
        var row = tbody.children[i];
        node = row;
        for (var j = 0; j < row.children.length; j++) {
      	var cell = row.children[j];
        for (var k=0; k<cell.classList.length;k++) {
          if (cell.classList[k] ==  "gridCellSelected") {
            flag = true;
            break;
          }//end if
        }//end for
        if (flag == true) break;
      }
        if (flag == true) break;
      }
      node = node.repObject.dom_element.node;
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
    },

    /**
     * onClick
     * 
     * @desc
     * 
     * @param event
     */
    onClick : function(event) {
      var toolbar_button = event.currentTarget.id;
      this.onSelectButton(toolbar_button);
    },
    
    onToolbarKeyPress: function(event){
      
    	var key = event.keyCode;
        var tabs;
        FBTrace.sysout("keyCode in widget.js:" , event);
        switch(key) {
          case KeyEvent.DOM_VK_LEFT:
          case KeyEvent.DOM_VK_RIGHT:
          case KeyEvent.DOM_VK_UP:
          case KeyEvent.DOM_VK_DOWN:

            var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
            var tabList = getAncestorByClass(event.target, "focusTabList");
            tabs = tabList.getElementsByClassName("focusTab");
            FBTrace.sysout("keyCode in widget.js - tablist", tabList);
            FBTrace.sysout("keyCode in widget.js - tab:", tabs);
            var currentIndex = Array.indexOf(tabs, event.target);
            FBTrace.sysout("keyCode in widget.js - curIndex:"+ currentIndex);
            if (currentIndex != -1) {
              var newIndex = forward ? ++currentIndex : --currentIndex;
              newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
              
              if (tabs[newIndex]) {
            	  tabs[newIndex].focus();
                  FBTrace.sysout("newIndex: ", tabs[newIndex]);
                  var toolbar_button_id = tabs[newIndex].id;
                  this.onSelectButton(toolbar_button_id);
              }
            }
            event.stopPropagation();
            event.preventDefault();
            
            break;
          } //end switch
          
    },
    
    onSelectButton : function(toolbar_button_id) {
    	clearNode(panel.panelNode);
        clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
        
        if (toolbar_button_id == "Images") {
          
      	   imageObject.getToolBarButtons(image_view, toolbar_button_id);
    	    panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, image_view.panelNode, null);
    	    Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
        
        } else if (toolbar_button_id == "Media"){

      	imageObject.getToolBarButtons(media_view, toolbar_button_id);
      	panel.table = flatListMediaTemplate.tableTag.append( {media_elements: media_elements}, media_view.panelNode, null);
      	Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);
        } else if (toolbar_button_id == "Abbreviations") {
          
          imageObject.getToolBarButtons(abbreviation_view, toolbar_button_id);
    	    panel.table = flatListAbbreviationTemplate.tableTag.append( {abbreviation_elements: abbreviation_elements}, abbreviation_view.panelNode, null);
    	    Firebug.currentContext.getPanel('Rules').sView(true, abbreviation_elements[0]);
        
        } else {

      	imageObject.getToolBarButtons(abbreviation_view, toolbar_button);
        } 	
    },
    
    viewContainer : DIV({style : "display:none"})
  });
  
  var imageObject = {  
	      
    /**
	 * panelsView
	 * 
	 * @desc
	 * 
	 * @param toolbar_buttons
	 * @param toolbar
	 * @param panelView
	 * @param cacheResult
	 * @returns
	 */
	 imagePanelView : function(images_toolbar_buttons, toolbar, panelView, cache_object) {
	        
      var images_cache = cache_object.dom_cache.images_cache;

	  image_elements = images_cache.image_elements;
	  media_elements = cache_object.dom_cache.media_cache.media_elements;
	  abbreviation_elements = cache_object.dom_cache.abbreviations_cache.abbreviation_elements;

      imageToolbarPlate.toolbar.replace({images_toolbar_buttons : images_toolbar_buttons}, toolbar, imageToolbarPlate);
	  toolbar.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	        
	  panel = panelView;
	  image_view = panelView;
	  media_view = panelView;
	  abbreviation_view = panelView;
	  panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, null);

	  Firebug.currentContext.getPanel('Rules').sView(true, images_cache.image_elements[0]);
    },
    
    getToolBarButtons: function (panel, button_view) {

      var i;
      var images_toolbar_buttons = [{name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images"), selected: false},
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.mediaTab"), selected: false}, 
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.abbreviationTab"), selected: false},
                                     {name: ainspectorUtil.$AI_STR("ainspector.mainpanel.tab.images.rulesTab"), selected: false}];
      for (i=0; i < images_toolbar_buttons.length; i++){
    	if (images_toolbar_buttons[i].name == button_view) images_toolbar_buttons[i].selected = true;  
      }  
      
      ainspectorUtil.loadCSSToStylePanel(panel.document);

      var toolbar = panel.document.createElement("div");
      toolbar.id = "toolbarDiv";
      imageToolbarPlate.toolbar.replace({images_toolbar_buttons : images_toolbar_buttons}, toolbar, imageToolbarPlate);
	  toolbar.style.display = "block";
	  panel.panelNode.id = "ainspector-panel"; 
	  panel.panelNode.appendChild(toolbar);
    }
  };
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatListTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$flatListTemplateUtil.onClickHeader", onkeypress: "$flatListTemplateUtil.onKeyPressRow"},
              TH({"class": "gridHeaderCell gridCell", id: "imgOrderCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Order")),
              TH({"class": "gridHeaderCell gridCell", id: "imgTextCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "AltText")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell gridCell", id: "imgSrcCol", onkeypress: "$flatListTemplateUtil.onKeyPressHeadingCell"}, DIV({"class": "gridHeaderCellBox"}, "Source"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({"class": "tableRow a11yFocus gridRow", "role": "row", id: "$object.cache_id", _repObject:"$object", onkeypress: "$flatListTemplateUtil.onKeyPressRow", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.alt")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onkeypress: "$flatListTemplateUtil.onKeyPressCell", onclick: "$flatListTemplateUtil.hightlightCell", ondblclick: "$flatListTemplateUtil.doubleClick"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.source")
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_imageElement: "$imageObject", class: "gridLabel", onclick: "$onSourceClick"},
                "$imageObject.source"
      )
    });
  
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatListMediaTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
              TH({"class": "gridHeaderCell", id: "mediaOrderCol"}, DIV({"class": "gridHeaderCellBox"}, "Oder")),
              TH({"class": "gridHeaderCell", id: "mediaSrctCol"}, DIV({"class": "gridHeaderCellBox"}, "Source")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell", id: "mediaAudioCol"}, DIV({"class": "gridHeaderCellBox"}, "Audio")),
              TH({"class": "gridHeaderCell", id: "mediaVideoCol"}, DIV({"class": "gridHeaderCellBox"}, "Video")),
              TH({"class": "gridHeaderCell", id: "mediCaptionsCol"}, DIV({"class": "gridHeaderCellBox"}, "Captions")),
              TH({"class": "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({"class": "gridHeaderCellBox"}, "Audio Desc")),
              TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "HTML View"))

          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$media_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.tag_name")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_video")
              ),
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.is_audio")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.has_caption")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_audio_desc")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                BUTTON({_element: "$object", id: "$object.document_order", class: "gridContent", onclick: "$flatListTemplate.onClickHtmlView"}, "view" )
              )
              
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
       
      /**
       * onSourceClick
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      onSourceClick : function(event){
        
	    var linkEle = event.target.imageElement;
        var node = linkEle.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      },
      
      onClickHeader : function(event){
    	  
    	FBTrace.sysout("Inside onClickHeader................................", event.target);  
        var table = getAncestorByClass(event.target, "ai-table-list-items");
    	FBTrace.sysout("table..........", table);  

        var column = getAncestorByClass(event.target, "gridHeaderCell");
        FBTrace.sysout("column", column);
        ainspectorUtil.sortColumn(table, column);
      }
   });
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var flatListAbbreviationTemplate = domplate({
    
	  tableTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
              TH({"class": "gridHeaderCell", id: "abbEleCol"}, DIV({"class": "gridHeaderCellBox"}, "Element")),
              TH({"class": "gridHeaderCell", id: "abbAbbCol"}, DIV({"class": "gridHeaderCellBox"}, "Abbreviaiton")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell", id: "abbTitCol"}, DIV({"class": "gridHeaderCellBox"}, "Title"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$abbreviation_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.alt")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$flatListTemplate.hightlightCell"},
                DIV({id: "$object.document_order", class: "gridContent"}, TAG("$attrTag", {imageObject: "$object"}) )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_element: "$imageObject", class: "gridLabel", onclick: "$FlatListTemplate.onClickHtmlView"},
                "$imageObject.source"
      ),
      
     /**
       * onSourceClick
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      onSourceClick : function(event){
        
	    var linkEle = event.target.imageElement;
        var node = linkEle.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      },
      
      onClickHeader : function(event){
    	  
    	FBTrace.sysout("Inside onClickHeader................................", event.target);  
        var table = getAncestorByClass(event.target, "ai-table-list-items");
    	FBTrace.sysout("table..........", table);  

        var column = getAncestorByClass(event.target, "gridHeaderCell");
        FBTrace.sysout("column", column);
        ainspectorUtil.sortColumn(table, column);
      }
   });
  

}