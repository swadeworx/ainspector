define(
  [
    "firebug/lib/lib",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/dom",
    "firebug/lib/domplate",
    "firebug/lib/css",
    "firebug/lib/array",
    "ainspector/headerResizer",
    "ainspector/ainspectorPreferences",
    "ainspector/highlighting/highlight",
    "ainspector/ainspectorUtil"
  ],
  
  function (FBL, FBTrace, Locale, Dom, Domplate, Css, Arr, HeaderResizer, AinspectorPreferences, OAA_WEB_ACCESSIBILITY, AinspectorUtil) {
  	
  	AinspectorUtil.keyBoardSupport = {
      	
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
    		
    		FBTrace.sysout("AInspector; keyBoardSupport.getTabIndex(): obj- ", obj);
    		return obj.selected ? "0" : "-1"; 
    	},
      	
  		/** @function onFocus    
  		 *  @desc sets/removes selection of state with the ARIA attrubute "aria-selected"    
  		 *   @param {Event} event    
  		 */   
  		 onFocus : function(event) {      
  		 	
  		 	var event_target = event.target;    
  		 	var repObject = Firebug.getRepObject(event_target);           
  		 	FBTrace.sysout("AInspector; onFocus-event: ", event);
  		 	if (!event_target) return;            
  		 	
//  		 	var category = Css.getClassValue(event_target, "tableRowView");     
  		 	var table_rows = Dom.getAncestorByClass(event_target, "gridRow");      

  		 	if (table_rows) {       
  		 		var old_row = Dom.getElementByClass(table_rows, "selected");      
    		 	FBTrace.sysout("AInspector; onFocus-old_row: ", old_row);

  		 		if (old_row) {         
  		 			old_row.setAttribute("aria-selected", "false");  
  		 			old_row.setAttribute("aria-label", "null");    
  		 			old_row.setAttribute("tabindex", "-1");     
  		 			Css.removeClass(old_row, "selected");      
  		 		} 
  		 	}   
  		 	//Summary Panel     
  		/* 	if (repObject.rule_result){       
  		 		var rule = repObject.rule_result.rule.getNLSRuleId() + ': ' + repObject.rule_result.getRuleSummary();    
  		 		var resutlt = rule + 'with WCAG level' + repObject.rule_result.rule.getNLSWCAG20Level() + 'and' + repObject.getImplementationLevel() + '% of elements are passed the rule';    
 		  		event_target.setAttribute("aria-label", rule);     

 		  	} else {
 		  		var element;     
 		  		
 		  		if (repObject.cache_item) {  
 		  			element = 'element' + repObject.cache_item.toString()+ repObject.violations_count + 'violations and'+ repObject.warnings_count + 'warnings';     
 		  			event_target.setAttribute("aria-label", element);      
 		  		}    
 		  	}*/
 		  	event_target.setAttribute("aria-selected", "true");    
 		  	event_target.setAttribute("tabindex", "0");   
 		  	Css.setClass(event_target, "selected");   
 		  },
  		  
      onKeyPressGrid : function (event) {
    			
  			event.stopPropagation();          
  			
  			var main_panel = Dom.getAncestorByClass(event.target, "main-panel");     
  			var table = Dom.getChildByClass(main_panel, "ai-table-list-items");  
  			if (!table) table = Dom.getChildByClass(main_panel, "domTable");
  			switch(event.keyCode) {                
  			
  			  case KeyEvent.DOM_VK_LEFT: //             
  			  case KeyEvent.DOM_VK_UP: //up         
  			  case KeyEvent.DOM_VK_RIGHT: //right      
  			  case KeyEvent.DOM_VK_DOWN: //down  
  			  	FBTrace.sysout("AInspector; ------------KeyboardSupport: ------------- ");

  			  	FBTrace.sysout("AInspector; KeyboardSupport: event - ", event);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: table - ", table);
  			  	if (table.tabIndex == '0') { 
  			  		table.setAttribute('tabindex', '-1');      
  			  		table.rows[0].setAttribute('tabindex', '0');
//  			  		var side_panel = Firebug.chrome.getSelectedSidePanel();
  			  		
//  			  		if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode);
//  			  		else side_panel.getPanelViewMesg(side_panel.panelNode, "");
//  			  		break;      
  			  	}
  			  	var all_rows = table.getElementsByClassName("gridRow");  
  			  	FBTrace.sysout("AInspector; KeyboardSupport: all_rows - ", all_rows);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: event.target - ", event.target);

  			  	var key = event.keyCode;     
  			  	var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
  			  	var backward = key == KeyEvent.DOM_VK_LEFT || key == KeyEvent.DOM_VK_UP; 
  			  	FBTrace.sysout("AInspector; KeyboardSupport: forward or right key- "+ forward);
            var ind = 0;
  			  	 
			  	  for (var i=0; i < all_rows.length; i++) {
			  	    if (Css.hasClass(all_rows[i], "gridRowSelected")) {
			  	      Css.removeClass(all_rows[i], "gridRowSelected");
			  	      
			  	      if (forward) ind = (i == all_rows.length-1) ? 1 : i + 1;
			  	      else ind = i > 1 ? i - 1 : 1;
			  	      
			  	      for(var j=0; j < all_rows[i].cells.length; j++) Css.removeClass(all_rows[i].cells[j], "gridCellSelected");
			  	      
			  	      break;
			  	    } else {
			  	      if (i == all_rows.length-1) ind = 1;
			  	    }
			  	  }
  			  	
  			  	if (ind != 0) {
  			  	  Css.setClass(all_rows[ind], "gridRowSelected");               
              for (var i=0; i< all_rows[ind].cells.length; i++) Css.setClass(all_rows[ind].cells[i], "gridCellSelected"); 
//              all_rows[ind].focus();
  			  	}
  			  	
            break;  			  	
  			    /*case KeyEvent.DOM_VK_TAB:        
  			     *   //var panel = Firebug.chrome.getSelectedPanel();        
  			     *    var sidePanel = Firebug.chrome.getSelectedSidePanel();       
  			     *    if (sidePanel) {        
  			     *      sidePanel.panelNode.setAttribute("tabindex", "0");         
  			     *      sidePanel.panelNode.focus();        
  			     *      setClass(sidePanel.panelNode, "focusRow");   
  			     *    }  
  			     *    break;*/     
  			  } // end switch 
    		  }
      	}
  		return AinspectorUtil;
  	}
	)