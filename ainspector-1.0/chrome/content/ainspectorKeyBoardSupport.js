define(
  [
    "firebug/lib/lib",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/firebug",
    "firebug/lib/dom",
    "firebug/lib/domplate",
    "firebug/lib/css",
    "firebug/lib/array",
    "ainspector/headerResizer",
    "ainspector/ainspectorPreferences",
    "ainspector/highlighting/highlight",
    "ainspector/ainspectorUtil"
  ],
  
  function (FBL, FBTrace, Locale, Firebug, Dom, Domplate, Css, Arr, HeaderResizer, AinspectorPreferences, OAA_WEB_ACCESSIBILITY, AinspectorUtil) {
  	
  	AinspectorUtil.keyBoardSupport = {
      
	    /**
	     * @function getRowClass
	     * 
	     * @desc
	     * 
	     * @param 
	     * 
	     * @return {String} class name to style 
	     */
	    getRowClass : function(obj) {
        
  	    var className = "tableRowView-";
  	    
  	    if (obj.summary) className = className + obj.summary;
  	    if (obj.position) className = className + obj.position;
  	    
  	    if (obj.selected)
          className += " selected";
      
  	    if (obj.first)
          className += " first";
        
        return className;
      },
      
  	  /**    
  		 * @function getSelectedState    
  		 * @desc     
  		 * @param {Object} obj   
  		 */ 
    	getSelectedState : function (obj) {        
    		
    		if (obj == 'temp') return 'true';          
    		
    		return obj.selected ? "true" : "false";  
    	},
    	
    	/**    
  		 * @function getSelectedState    
  		 * @desc     
  		 * @param {Object} obj   
  		 */ 
    	getTabIndex : function(obj) {
    	  
    	  if (obj == 'temp') return 'true'; 
    		
    	  return obj.selected ? "0" : "-1"; 
    	},
      	
  		/** @function onFocus    
  		 *  
  		 *  @desc sets/removes selection of state with the ARIA attrubute "aria-selected"    
  		 *  
  		 *  @param {Event} event    
  		 */   
  		 onFocus : function(event) {      
  		 	
    	  var event_target = event.target;    
  		 	if (!event_target) return;            
  		 	 var table = Dom.getAncestorByClass(event_target, "ai-table-list-items");
  		 	 if (!table) table = Dom.getAncestorByClass(event_target, "domTable");
  		 	 var rows = table.rows;
  		 	 for (var row=0; row < rows.length; row++){
  	 	     if (Css.hasClass(rows[row], "selected")) {
  	 	       rows[row].setAttribute("aria-selected", "false");  
  	 	       rows[row].setAttribute("aria-label", "null");    
  	 	       rows[row].setAttribute("tabindex", "-1");     
             Css.removeClass(rows[row], "selected");
             break;
  	 	     }
  		 	 }
  		 	 event_target.setAttribute("aria-selected", "true");    
         event_target.setAttribute("tabindex", "0");   
         Css.setClass(event_target, "selected");
         
 		  },
 		  
      /**
       * @function onKeyPressGrid
       * 
       * @desc focus on a row with the keyboard events
       * 
       * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
       */
      onKeyPressGrid: function(event){
        
        var main_panel = Dom.getAncestorByClass(event.target, "main-panel");
        var table = Dom.getChildByClass(main_panel, "ai-table-list-items");
        if (!table) table = Dom.getChildByClass(main_panel, "domTable");
        
        switch(event.keyCode) {
            
          case KeyEvent.DOM_VK_LEFT: //  
       
          case KeyEvent.DOM_VK_UP: //up
            var row = Dom.findPrevious(event.target, this.isGridRow);
        
            if (row) {
              row.focus();
              AinspectorUtil.highlightRow(event, table, row);
            }
            event.stopPropagation();
            event.preventDefault();
            break;
        
          case KeyEvent.DOM_VK_RIGHT: //right
          case KeyEvent.DOM_VK_DOWN: //down
            
            var row = Dom.findNext(event.target, this.isGridRow);
            
            if (row) {
              row.focus();
              AinspectorUtil.highlightRow(event, table, row);
            }
            event.stopPropagation();
            event.preventDefault();
            break;
            
            /*var key = event.keyCode;
            var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;            
            var all_rows = table.getElementsByClassName("gridRow");
            var current_index = Array.indexOf(all_rows, event.target);
            var index = Array.indexOf(all_rows, event.target);

            var new_index;
            var flag = false;
            
            for (var i=0; i < all_rows.length; i++) {
              if (Css.hasClass(all_rows[i], "gridRowSelected")) {
                
                Css.removeClass(all_rows[i], "gridRowSelected");
                
                for (var c=0; c< all_rows[i].cells.length; c++) Css.removeClass(all_rows[i].cells[c], "gridCellSelected");
                
                new_index = forward ? ++i : --i;  
                new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
                flag = true;
                break;
              }
            }
            
            if (table.tabIndex == 0) {
              table.setAttribute('tabindex', '-1');
              
              if (flag) {
                table.rows[0].setAttribute('tabindex', '-1');
              
              } else {
                Css.setClass(table.rows[0], "headerRowSelected");
                table.rows[0].setAttribute('tabindex', '0');
                table.rows[0].focus();
                var side_panel = Firebug.chrome.getSelectedSidePanel();
                if (side_panel) side_panel.getPanelViewMesg(side_panel.panelNode, "");
                break;
              }
              
              
            }  
            if (current_index != -1) {
              if (!flag) {
                new_index = forward ? ++current_index : --current_index;
                //get the focus back to the first tab on the tool bar from the last tab of the toolbar
                new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
              }
              if (all_rows[new_index]) { 
                var next_row = all_rows[new_index];
//              unhighlighting from rows in panel
                var current_row = all_rows[index];
                var header_row = all_rows[index];

                if (current_index != 0) {
                  Css.removeClass(current_row, "gridRowSelected");
                  for (var c=0; c< current_row.cells.length; c++) Css.removeClass(current_row.cells[c], "gridCellSelected");
                } 

//              highlight rows from panel
                all_rows[new_index].focus();
                Css.setClass(next_row, "gridRowSelected");
                    
                for (var i=0; i< next_row.cells.length; i++) Css.setClass(next_row.cells[i], "gridCellSelected");
                if (next_row.repObject.filtered_rule_result && next_row.repObject.filtered_rule_result.filtered_node_results) {
                  OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightNodeResults(next_row.repObject.filtered_rule_result.filtered_node_results);
                } else {
                  OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems(next_row.repObject.cache_item_result);
                }
              }
            }
            event.stopPropagation();
            event.preventDefault();
              
            break;*/
              
          case KeyEvent.DOM_VK_TAB:
            var sidePanel = Firebug.chrome.getSelectedSidePanel();
            
            if (sidePanel) {
              sidePanel.panelNode.setAttribute("tabindex", "0");
              sidePanel.panelNode.focus();
              Css.setClass(sidePanel.panelNode, "focusRow");
            }
            event.stopPropagation();
            event.preventDefault();
            break;
            
          case KeyEvent.DOM_VK_RETURN:
            var lastChild = event.target.lastElementChild;
            if ( lastChild && lastChild.id == 'gridHTMLCol') AinspectorUtil.toHTMLPanel(event);
            event.stopPropagation();
            event.preventDefault();  
            break;
        } //end switch
      },
  		  
  		  isGridRow : function(node){
  		    
  		    return Css.hasClass(node, "gridRow");
  		  },
  		  
  		  onXXXKeyPressGrid: function(event){
          
          event.stopPropagation();

          var main_panel = Dom.getAncestorByClass(event.target, "main-panel");
          var table = Dom.getChildByClass(main_panel, "ai-table-list-items");
          if (!table) table = Dom.getChildByClass(main_panel, "domTable");
          
          switch(event.keyCode) {
              
            case KeyEvent.DOM_VK_LEFT: //  
              event.preventDefault();
              var row = Dom.getAncestorByClass(event.target, "treeRow");
              
              if (Css.hasClass(row, "opened")) { // if open
                this.closeRow(row); // close
              } else {
                var table = Dom.getAncestorByClass(event.target, "domTable");
                table.focus(); // focus parent;
              }
              break;         
            case KeyEvent.DOM_VK_UP: //up
              var row = Dom.findPrevious(event.target, this.isGridRow);
          
              if (row) {
                row.focus();
                AinspectorUtil.highlightRow(event, table, row);
              }
              break;
          
            case KeyEvent.DOM_VK_RIGHT: //right
            case KeyEvent.DOM_VK_DOWN: //down
              var key = event.keyCode;
              var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;            
              var all_rows = table.getElementsByClassName("gridRow");

              var current_index = Array.indexOf(all_rows, event.target);
              var index = Array.indexOf(all_rows, event.target);

              var new_index;
              var flag = false;
              
              for (var i=0; i < all_rows.length; i++) {
                if (Css.hasClass(all_rows[i], "gridRowSelected")) {
                  
                  Css.removeClass(all_rows[i], "gridRowSelected");
                  
                  for (var c=0; c< all_rows[i].cells.length; c++) Css.removeClass(all_rows[i].cells[c], "gridCellSelected");
                  
                  new_index = forward ? ++i : --i;  
                  new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
                  flag = true;
                  break;
                }
              }
              
              if (table.tabIndex == 0) {
                table.setAttribute('tabindex', '-1');
                
                if (flag) {
                  table.rows[0].setAttribute('tabindex', '-1');
                } else {
                  Css.setClass(table.rows[0], "headerRowSelected");
                  table.rows[0].setAttribute('tabindex', '0');
                  table.rows[0].focus();
                  var side_panel = Firebug.chrome.getSelectedSidePanel();
                  if (side_panel) side_panel.getPanelViewMesg(side_panel.panelNode, "");
                  break;
                }
                
              }  
              if (current_index != -1) {
                 
                if (!flag) {
                  
                  new_index = forward ? ++current_index : --current_index;
                
                  //get the focus back to the first tab on the tool bar from the last tab of the toolbar
                  new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
                }
                
                
                if (all_rows[new_index]) { 
                  var next_row = all_rows[new_index];

//                unhighlighting from rows in panel
                  var current_row = all_rows[index];
                  var header_row = all_rows[index];

                  if (current_index != 0) {
                    
                    Css.removeClass(current_row, "gridRowSelected");
                      
                    for (var c=0; c< current_row.cells.length; c++) Css.removeClass(current_row.cells[c], "gridCellSelected");
                  } 

//                highlight rows from panel
                  all_rows[new_index].focus();
                  Css.setClass(next_row, "gridRowSelected");
                      
                  for (var i=0; i< next_row.cells.length; i++) Css.setClass(next_row.cells[i], "gridCellSelected");
                  
                  if (next_row.repObject.filtered_rule_result && next_row.repObject.filtered_rule_result.filtered_node_results) {
                    OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightNodeResults(next_row.repObject.filtered_rule_result.filtered_node_results);
                  } else {
                    OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems(next_row.repObject.cache_item_result);
                  }
                }
              }
              event.stopPropagation();
              event.preventDefault();
                
              break;
                
            case KeyEvent.DOM_VK_TAB:
              var sidePanel = Firebug.chrome.getSelectedSidePanel();
              
              if (sidePanel) {
                sidePanel.panelNode.setAttribute("tabindex", "0");
                sidePanel.panelNode.focus();
                Css.setClass(sidePanel.panelNode, "focusRow");
              }
              break;
              
            case KeyEvent.DOM_VK_RETURN:
              var lastChild = event.target.lastElementChild;
              if ( lastChild && lastChild.id == 'gridHTMLCol') AinspectorUtil.toHTMLPanel(event);
                
              break;
          } //end switch
        }
     	}
  		return AinspectorUtil;
  	}
	)