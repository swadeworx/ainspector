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
    		
//    		if (obj == 'temp') return 0;  
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
  			
  			switch(event.keyCode) {                
  			
  			  case KeyEvent.DOM_VK_LEFT: //             
  			  	
  			  case KeyEvent.DOM_VK_UP: //up         
  			  	
  			  	var row = Dom.findPrevious(event.target, Dom.hasClass("gridRow"));              
  			  	
  			  	if (row) {           
  			  		row.focus(); 
  			  		AinspectorUtil.highlightRow(event, table, row);         
  			  	} 
  			  	break;
  			  	
  			  case KeyEvent.DOM_VK_RIGHT: //right      
  			  	
  			  case KeyEvent.DOM_VK_DOWN: //down  
  			  	FBTrace.sysout("AInspector; ------------KeyboardSupport: ------------- ");

  			  	FBTrace.sysout("AInspector; KeyboardSupport: event - ", event);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: table - ", table);
  			  	if (table.tabIndex == '0') { 
  			  		table.setAttribute('tabindex', '-1');      
  			  		table.rows[0].setAttribute('tabindex', '0');
//  			  		table.rows[1].setAttribute('tabindex', '0');
//  			  		Css.setClass(table.rows[1], "headerRowSelected");
//  			  		table.rows[0].focus(); 
  			  		
//  			  		var side_panel = Firebug.chrome.getSelectedSidePanel();
  			  		
//  			  		if (AinspectorUtil.selected_row != null) side_panel.updateSelection(AinspectorUtil.selected_row.repObject, side_panel.panelNode);
//  			  		else side_panel.getPanelViewMesg(side_panel.panelNode, "");
//  			  		break;      
  			  	}
  			  	var all_rows = table.getElementsByClassName("gridRow");  
  			  	FBTrace.sysout("AInspector; KeyboardSupport: all_rows - ", all_rows);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: event.target - ", event.target);

  			  	var current_index = Array.indexOf(all_rows, event.target);          
  			  	var index = Array.indexOf(all_rows, event.target);    
  			  	var key = event.keyCode;     
  			  	var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;  
  			  	FBTrace.sysout("AInspector; KeyboardSupport: current_index - "+ current_index);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: index - "+ index);
  			  	FBTrace.sysout("AInspector; KeyboardSupport: forward or right key- "+ forward);

  			  	if (current_index != -1) {           
  			  		var new_index = forward ? ++current_index : --current_index;  
  			  		//get the focus back to the first tab on the tool bar from the last tab of the toolbar    
  			  		new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);   
    			  	FBTrace.sysout("AInspector; KeyboardSupport: new_index- "+ new_index);

  			  		if (all_rows[new_index]) {              
  			  			var next_row = all_rows[new_index];  
  			  			// unhighlighting from rows in panel             
  			  			var current_row = all_rows[index];             
  			  			var header_row = all_rows[index];              
  			  			if (current_index != 0) {                              
  			  				Css.removeClass(current_row, "gridRowSelected"); 
  			  				
  			  				for (var c=0; c< current_row.cells.length; c++) Css.removeClass(current_row.cells[c], "gridCellSelected");             
			  			  }  
  			  			// highlight rows from panel 
//  			  			current_row.blur();
  			  			all_rows[new_index].focus();        
  			  			Css.setClass(next_row, "gridRowSelected");               
  			  			for (var i=0; i< next_row.cells.length; i++) Css.setClass(next_row.cells[i], "gridCellSelected");         
  			  			FBTrace.sysout("AInspector; KeyboardSupport: all_rows- ", all_rows);
//    			  	if (next_row.repObject.filtered_node_results) OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightNodeResults(next_row.repObject.filtered_node_results);           
//    			  	else OAA_WEB_ACCESSIBILITY.util.highlightModule.highlightCacheItems(next_row.repObject);          
  			  		}
  			  	} else {
  			  		var new_index = 1;
  			  		all_rows[new_index].focus();        
			  			Css.setClass(all_rows[new_index], "gridRowSelected");               
			  			for (var i=0; i< all_rows[new_index].cells.length; i++) Css.setClass(all_rows[new_index].cells[i], "gridCellSelected");
  			  	}
//  			  	event.stopPropagation();         
//  			  	event.preventDefault();                   
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