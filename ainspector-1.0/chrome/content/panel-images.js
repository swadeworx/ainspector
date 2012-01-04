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
                  DIV({style : "clear: both"})        
              ), 
  
    toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$toolbarUtil.onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                       FOR("obj", "$toolbar_buttons",
                         LI({id: "$obj.name", class : "$obj|toolbarUtil.getToolbarButtonClass focusTab", onclick: "$onClick", tabindex : "$obj|toolbarUtil.getTabIndex", role : "tab", "aria-selected" : "$obj|toolbarUtil.getSelectedState", onfocus : "$toolbarUtil.onToolbarFocus"},
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
      FBTrace.sysout("event.......................", event);	
      var toolbar_button = event.currentTarget.id;
      
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
      
      if (toolbar_button == "Images") {
      	
    	//elementDomplate.tableTag.replace({}, panel, elementDomplate);
        imageObject.getToolBarButtons(image_view, toolbar_button);

  	    panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, image_view.panelNode, null);
  	  
  	    Firebug.currentContext.getPanel('Rules').sView(true, image_elements[0]);
      
      } else if (toolbar_button == "Media"){
        FBTrace.sysout(".................", media_view);
        imageObject.getToolBarButtons(media_view, toolbar_button);
  	    FBTrace.sysout("media elements: ", media_elements);
    	panel.table = flatListMediaTemplate.tableTag.append( {media_elements: media_elements}, media_view.panelNode, null);
   
    	Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);

      } else if (toolbar_button == "Abbreviations") {
        
        imageObject.getToolBarButtons(abbreviation_view, toolbar_button);
        
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
	  
      FBTrace.sysout("image images_cache: ", images_cache);

      FBTrace.sysout("image ELements: ", image_elements);
      imageToolbarPlate.toolbar.replace({images_toolbar_buttons : images_toolbar_buttons}, toolbar, imageToolbarPlate);
	  toolbar.style.display = "block";
	  panelView.panelNode.id = "ainspector-panel"; 
	  panelView.panelNode.appendChild(toolbar);
	        
	  panel = panelView;
	  image_view = panelView;
	  media_view = panelView;
	  abbreviation_view = panelView;
	  FBTrace.sysout("panelView...", panelView.panelNode);
	  panel.table = flatListTemplate.tableTag.append( {image_elements: image_elements}, panel.panelNode, null);
	  FBTrace.sysout("images_cache11111111111111111...", images_cache.image_elements[0]);
	  FBTrace.sysout("panel.table...", panel.table);

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
          TR({"class": "gridHeaderRow a11yFocus", id: "imgTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
              TH({"class": "gridHeaderCell", id: "imgOrderCol"}, DIV({"class": "gridHeaderCellBox"}, "Order")),
              TH({"class": "gridHeaderCell", id: "imgTextCol"}, DIV({"class": "gridHeaderCellBox"}, "Alt Text")), //TAG("$headerTag", {header: "Source"}))),
              TH({"class": "gridHeaderCell", id: "imgSrcCol"}, DIV({"class": "gridHeaderCellBox"}, "Source")),
              TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "HTML View"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _repObject:"$object"},//gridRow              
              TD({"class": "imgOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "imgAltCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.alt")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                DIV({class: "gridContent", _repObject:"object"}, "$object.source")
              ),
              TD({"class": "imgSourceCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1", onclick: "$hightlightCell"},
                BUTTON({_element: "$object", id: "$object.document_order", class: "gridContent", onclick: "$onClickHtmlView"}, "view" )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_imageElement: "$imageObject", class: "gridLabel", onclick: "$onSourceClick"},
                "$imageObject.source"
      ),
      
      /**
       * highlightRow
       *  
       * @param event
       * @returns
       */
      hightlightCell: function (event) {
	    
        var table = getAncestorByClass(event.target, "ai-table-list-items");
        var row =  getAncestorByClass(event.target, "tableRow");
        var i;
        var j;
        var k;
        var cell_selected;
        var child;
        var row;
        FBTrace.sysout("table: ", table);
        var tbody = table.children[1];
        FBTrace.sysout("tbody: ", tbody);

        for (i = 0; i < tbody.children.length; i++) {
          var flag = false;
          var row = tbody.children[i];
          
          for (j = 0; j < row.children.length; j++) {
        	var cell = row.children[j];
        	var cell_selected = getChildByClass(cell, "gridCellSelected");
        	FBTrace.sysout("cell_selected: "+ cell_selected);
        	if (cell_selected) {
              ainspectorUtil.removeClass(cell, "gridCellSelected");
              flag = true;
              break;
            }
          }
          if (flag == true) break;
        }

        var column = getAncestorByClass(event.target, "gridCell");
        FBTrace.sysout("column bef: ", column);
        ainspectorUtil.setClass(column, "gridCellSelected");
        FBTrace.sysout("column aft: ", column);

        //ainspectorUtil.setClass(row_cell, "gridCellSelected");
        //var row_cells = cell.childNodes;
        //FBTrace.sysout("rowcells.....", row_cells);
     },
       
      /**
       * onClickHtmlView
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
     onClickHtmlView : function(event){
        
	    var element = event.target.element;
		FBTrace.sysout("event onSourceClick::::: ", event.target);

	    var node = element.dom_element.node;
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