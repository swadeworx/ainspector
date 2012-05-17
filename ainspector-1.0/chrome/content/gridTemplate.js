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

var AINSPECTOR_FB = AINSPECTOR_FB || {};
with (FBL) {
  
  panel : null;
  headings_panel : null;
  links_panel : null;
  cache : null;
  
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
          TR({"class": "gridHeaderRow", id: "linksTableHeader", "role": "row", tabindex: "0", onclick: "$onClickHeader"},
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Order")),
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Source")),
            TH({"class": "gridHeaderCell"}, DIV({"class": "gridHeaderCellBox"}, "Alt Text"))
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$image_elements",
            TR({"class": "tableRow a11yFocus", "role": "row", id: "$object.cache_id", _link:"$object", onclick: "$hightlightRow"},//gridRow              
              TD({"class": "gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({"class": "linksTextCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({"class": "gridContent", _repObject:"$object"}, "$object.alt")
              ),
              TD({"class": "linksHREFCol gridCell gridCol a11yFocus", "role": "gridcell", "tabindex": "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, TAG("$attrTag", {imageObject: "$object"}) )
              )
            )//end TR   
          ) //end FOR
        )// end TBODY
      ), // end inner TABLE
      
      attrTag : DIV({_linkElement: "$imageObject", class: "gridLabel", onclick: "$onLinkClick"},
                "$imageObject.source"
      ),
      
      /**
       * highlightRow
       *  
       * @param event
       * @returns
       */
      hightlightRow: function (event) {
	    //Firebug.InsideOutBox.highlight(event.target);
	    var colorObj = {content: "SkyBlue", padding: "SlateBlue", border: "#444444", margin: "#EDFF64"};
	    var offset = getLTRBWH(Firebug.getRepObject(event.target));
        var x = offset.left, y = offset.top;
        var w = offset.width, h = offset.height;
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
      },
      
      onClickHeader : function(event){
        var table = getAncestorByClass(event.target, "ai-table-list-items");
        var column = getAncestorByClass(event.target, "gridHeaderCell");
        AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
      }
   });
  
  AINSPECTOR_FB.emptyTemplate = domplate(AINSPECTOR_FB.BaseRep, {
	    
	    tag:
	      TABLE({class: "ai-sidepanel-table", cellpadding: 0, cellspacing: 0, role: "treegrid"},
	        THEAD(
	          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", "role": "row", tabindex: "0"},
	            FOR("header", "$header_elements",
	              TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "$header"))
	            )
	          )
	        ),  
	        TBODY(
	            TR({class: "tableRow gridRow", role: "row"},
	              TD(DIV({class: "gridCol gridCell gridContent"},"none"))
	            ) //end TR
	        ) //end TBODY  
	      )
	  });
  
  AINSPECTOR_FB.emptyPanelTemplate = domplate({
	    
	    tag:
	      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, role: "treegrid", onkeypress: "$AINSPECTOR_FB.flatListTemplateUtil.onKeyPressTable"},
	        THEAD(
	          TR({class: "gridHeaderRow gridRow", id: "rulesTableHeader", role: "row", tabindex: "0"},
	            FOR("header", "$header_elements",
	              TH({class: "gridHeaderCell gridCell", id: "ruleResultsCol"}, DIV({class: "gridHeaderCellBox"}, "$header"))
	            )
	          )
	        ),  
	        TBODY(
	            TR({class: "tableRow gridRow", role: "row"},
	              TD(DIV({class: "gridCell gridCol gridContent"},"none"))
	            ) //end TR
	        ) //end TBODY  
	      )
	  });
  AINSPECTOR_FB.BaseRep = domplate(Firebug.Rep, {
	    
	    /**
	     * getNaturalTag
	     * 
	     * @desc
	     * 
	     * @param value
	     */
		  getNaturalTag: function(value) {
	    
		  var rep = Firebug.getRep(value);
	      var tag = rep.shortTag ? rep.shortTag : rep.tag;
	      return tag;
	    }
	  });
  
  AINSPECTOR_FB.disablePanelTemplate = domplate({
	 mesgTag:  
	 DIV({class: "panelDisable"}, "$message") 
  });

}