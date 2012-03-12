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
  media_elements: null;
  
  AINSPECTOR_FB.media = {
		  
  /**
   * @function viewPanel 
   * 
   * @desc respond to "Media" button in the AInspector toolbar
   * 
   * @param {Object} context
   * @param {String} panel_name - name of the panel to identify in which panel are we
   * @param {Object} cache_object - container for all the element properties
   * @property {Array} toolbar_buttons - buttons to show on a toolbar
   * @property {Object} toolbar - dom element created to hold the content of the panel. will append to the panel 
   * @property {Object} cache_object - container for all the element properties
   * 
   */
  viewPanel: function(context, panel_name, cache_object) {		
	  AINSPECTOR_FB.tabPanelUtil.addAndRemoveSidePanels();
    if (!panel_name) panel_name = "AInspector";
	if (!cache_object) cache_object = AINSPECTOR_FB.result_ruleset;
	  
	//FBTrace.sysout("cache_object: ", cache_object);

	panel = context.getPanel(panel_name, true);

    /* Clear the panel before writing anything onto the report*/
    if (panel) {
      clearNode(panel.panelNode);
      clearNode(Firebug.currentContext.getPanel('Rules').panelNode);
    }

    AINSPECTOR_FB.ainspectorUtil.loadCSSToStylePanel(panel.document);

    var toolbar = panel.document.createElement("div");
    toolbar.id = "toolbarDiv";

    media_elements = cache_object.dom_cache.media_cache.media_elements;
    var is_empty_object = AINSPECTOR_FB.ainspectorUtil.hasProperty(media_elements);
    
	AINSPECTOR_FB.media.mediaToolbarPlate.toolbar.replace({}, toolbar, AINSPECTOR_FB.media.equivToolbarPlate);
	  
	var element = panel.document.createElement("div");
	element.style.display = "block";
	
	panel.panelNode.id = "ainspector-panel"; 
	panel.panelNode.appendChild(toolbar);
	panel.panelNode.appendChild(element);
	if (is_empty_object == true) {
      panel.table = AINSPECTOR_FB.emptyPanelTemplate.tag.append( {header_elements: ["Audio", "Video", "Captions", "Audio Desc", "Transcription", "A11y"]}, panel.panelNode, AINSPECTOR_FB.emptyTemplate);
      //this.select("none");
  	  Firebug.currentContext.getPanel('Rules').sView(false, "none");
    } else{
	  panel.table = AINSPECTOR_FB.media.mediaTemplate.tableTag.append( {media_elements: media_elements}, panel.panelNode, AINSPECTOR_FB.media.mediaTemplate);
	  this.select(media_elements[0]);
	  Firebug.currentContext.getPanel('Rules').sView(true, media_elements[0]);}
  },
    
    /**
     * @function select
     * 
     * @desc sets the first row object in to the panel and highlight() function to highlight the first row 
     * 
     * @param {Object} object - first image object in the images cache
     * @property {Object} selection - set an object to the panel to be used by the side panels when selected first time
     */
    select : function(object) {
  	  panel.selection = object;
  	  
      AINSPECTOR_FB.flatListTemplateUtil.highlight(panel.table.children[1].children[0]);
      
    }
  }; //end of media
  
  //AINSPECTOR_FB.toolbar_button = AINSPECTOR_FB.media;
  
  /**
   * @function mediaToolbarPlate
   * 
   * @desc template creates a Tool bar in ainpector panel 
   */
  AINSPECTOR_FB.media.mediaToolbarPlate = domplate({
    toolbar : DIV( {class : "nav-menu"},
              BUTTON({class: "button", onclick: "$toHTMLPanel"}, "HTML Panel" )
    ), 
    
    /**
     * @function toHTMLPanel
     * 
     * @desc redirect to the HTML Panel of Firebug
     * 
     * @param event event triggered on a row/cell of a images/media/abbreviation toolbar buttons
     */
    toHTMLPanel: function(event) {

      var table = getChildByClass(event.target.offsetParent, "ai-table-list-items");
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

    viewContainer : DIV({style : "display:none"})
  });
  
  /**
   * @domplate mediaTemplate
   * 
   * @desc template object, create HTML mark up showed upon clicking the media toolbar button
   * 
   * @return flat list of media elements to be displayed on the panel 
   */
  AINSPECTOR_FB.media.mediaTemplate = domplate({
    
	  tableTag:
      TABLE({class: "ai-table-list-items", cellpadding: 0, cellspacing: 0, hiddenCols: "", role: "treegrid"},
        THEAD(
          TR({class: "gridHeaderRow ", id: "imgTableHeader", role: "row", tabindex: "0", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.onClickHeader"},
              TH({class: "gridHeaderCell", id: "mediaAudioCol"}, DIV({class: "gridHeaderCellBox"}, "Audio")),
              TH({class: "gridHeaderCell", id: "mediaVideoCol"}, DIV({class: "gridHeaderCellBox"}, "Video")),
              TH({class: "gridHeaderCell", id: "mediCaptionsCol"}, DIV({class: "gridHeaderCellBox"}, "Captions")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Audio Desc")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Transcription")),
              TH({class: "gridHeaderCell", id: "mediaAudioDescCol"}, DIV({class: "gridHeaderCellBox"}, "Accessibility Summary"))
              
          ) //end TR
        ), //end THEAD
        TBODY(
          FOR("object", "$media_elements",
            TR({class: "tableRow ", role: "row", id: "$object.cache_id", _repObject:"$object", onclick: "$AINSPECTOR_FB.flatListTemplateUtil.highlightRow"},//gridRow              
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_video")
              ),
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.is_audio")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.has_caption")
              ),
              TD({class: "imgSourceCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({id: "$object.document_order", class: "gridContent"}, "$object.is_audio_desc")
              ),
              TD({class: "imgOrderCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent gridOrderCol", _repObject:"$object"}, "$object.document_order")
              ),
              TD({class: "imgAltCol gridCell gridCol ", role: "gridcell", tabindex: "-1"},
                DIV({class: "gridContent", _repObject:"$object"}, "$object.tag_name")
              )
              
            )//end TR   
          ) //end FOR
        )// end TBODY
      ) // end inner TABLE
   });
  
  
  }