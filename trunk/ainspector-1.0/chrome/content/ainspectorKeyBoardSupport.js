/* See license.txt for terms of usage */
/**
 * @file ainspectorKeyBoardSupport.js
 * 
 */
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
    "ainspector/ainspectorUtil",
    "ainspector/ainspectorTreeTemplate",
    "ainspector/wcagSummaryTemplate"
  ],
  
  function (FBL, FBTrace, Locale, Firebug, Dom, Domplate, Css, Arr, HeaderResizer, AinspectorPreferences, 
  		OAA_WEB_ACCESSIBILITY, AinspectorUtil, AinspectorTreeTemplate, WcagSummaryTemplate) {
  	
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
          	
//          if the focus is on the first row key up button should stay at the first row
          	if (Css.hasClass(row, 'gridHeaderRow')) break;
          		
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
		  }
    }
  	
  	return AinspectorUtil;
 })