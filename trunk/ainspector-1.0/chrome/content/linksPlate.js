with (FBL) {
  
  /**
   * linksTableDomplate
   * 
   * @Domplate
   * 
   * @desc template to create a table for Links tab and pop up the values in it
   */
  var linksTableDomplate = domplate({
    
	layoutTag:
      TABLE({"class": "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", "role": "treegrid"},
        THEAD(
          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0"},
            TH({"class": "HeaderCell"}, "Order"),
            TH({"class": "HeaderCell"},"Link Text"),
            TH({"class": "HeaderCell"},"HREF")
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$links",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _link:"$object", onclick: "$hightlightRow"},//gridRow              
              TD({"class": "linksOrderCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridLabel", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "linksTextCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridLabel", _repObject:"$object"}, "$object.name")
              ),
              TD({"class": "linksHREFCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({id: "$object.document_order", class: "gridLabel"}, TAG("$attrTag", {linkObject: "$object"}) )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_linkElement: "$linkObject", class: "gridLabel", onclick: "$onLinkClick"},
                "$linkObject.href"
      ),
      
      /**
       * highlightRow
       *  
       * @param event
       * @returns
       */
      hightlightRow: function (event) {
	    //Firebug.InsideOutBox.highlight(event.target);
	    FBTrace.sysout("highlight: ", event);
	    var colorObj = {content: "SkyBlue", padding: "SlateBlue", border: "#444444", margin: "#EDFF64"};
	    var offset = getLTRBWH(Firebug.getRepObject(event.target));
        var x = offset.left, y = offset.top;
        var w = offset.width, h = offset.height;
        FBTrace.sysout("offset: ", offset);
        FBTrace.sysout("x: ", x);
        FBTrace.sysout("y: ", y);
     },
       
      /**
       * onLinkClick
       * 
       * @desc redirects to the HTML view of Firebug
       * 
       * @param event event triggered on a row in the Links Table
       */
      onLinkClick : function(event){
        
	    var linkEle = event.target.linkElement;
        var node = linkEle.dom_element.node;
        var panel = Firebug.chrome.selectPanel("html");
        panel.select(node);
      }      
   });
 
  var linksPanel = {
    
    /**
     * desplayLinkPanel
     * 
     * @desc
     * 
     * @param panel
     * @param links
     */
    displayLinksPanel : function(panel, links) {
    
	  FBTrace.sysout("links", links);
      panel.table = linksTableDomplate.layoutTag.append({links: links.link_elements}, panel.panelNode, null);
      Firebug.currentContext.getPanel('Rules').sView(true);

    }
  }; //end of linksPanel
};