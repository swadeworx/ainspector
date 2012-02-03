var AINSPECTOR_FB = AINSPECTOR_FB || {};

FBL.ns(function() {with (FBL) {
  
  var classNameReCache={};
  
  AINSPECTOR_FB.ainspectorUtil = {
	
	loadCSSToStylePanel : function(document){

	  this.loadCSS("chrome://ainspector/content/css/ainspector-panel.css", document);
      this.loadCSS("chrome://ainspector/content/css/fonts-min.css", document);
      this.loadCSS("chrome://ainspector/content/css/tabview.css", document);
      this.loadCSS("chrome://ainspector/content/css/allyGrade.css", document);
      this.loadCSS("chrome://ainspector/content/css/grid.css", document); 
    },
		  
	/**
     * @function loadCSS
     * 
     * @desc dynamically add a style sheet to the document.
     * 
     * @param url
     * @param doc
     * 
     * @return
     */
    loadCSS : function(url, doc) {
      
      if ( ! doc ) {
        return '';
      }
      var newCss = doc.createElement("link");
      newCss.rel = "stylesheet";
      newCss.type = "text\/css";
      newCss.href = url;
      doc.body.appendChild(newCss);

      return newCss;
    },  

    /**
     * @function AI_STR
     * 
     * @desc
     * 
     * @param name
     * 
     * @return
     */
    $AI_STR : function(name) {
      
      return document.getElementById("ainspector_stringbundle").getString(name);
    },

    /**
     * @function AI_STRF
     * 
     * @desc
     * 
     * @param name
     * @param args
     * 
     * @return
     */
    $AI_STRF : function(name, args) {
      
      return document.getElementById("ainspector_stringbundle").getFormattedString(name, args);
    },
    
    /**
     * @function sortColumn
     * 
     * @desc
     * 
     * @param table
     * @param column
     * @param order
     */
    sortColumn : function(table, column, order) {
      
      var colIndex = 0;
      if(!column) return;
      FBTrace.sysout("Inside sortColumn....");
      var numerical = !this.hasClass(column, "alphaValue");

      for (column = column.previousElementSibling; column; ) {
    	++colIndex;
    	column = column.previousElementSibling;
      }

      this.sort(table, colIndex, numerical, order);
    },

    /**
     * @funstion sort
     * 
     * @desc 
     * 
     * @param table
     * @param colIndex
     * @param numerical
     * @param order
     */
    sort: function(table, colIndex, numerical, order)  {
      var thead = table.firstChild;
      var headerRow = thead.firstChild;
      var tbody = table.lastChild;
      
      FBTrace.sysout("thead...", thead);
  	  FBTrace.sysout("headerRow...." ,  headerRow);
  	
      // Remove class from the currently sorted column
      var headerSorted = getChildByClass(headerRow, "gridHeaderSorted");
      removeClass(headerSorted, "gridHeaderSorted");
      
      if (headerSorted) headerSorted.removeAttribute("aria-sort");

      // Mark new column as sorted.
      var header = headerRow.childNodes[colIndex];
      
      FBTrace.sysout("header...", header);
      
      this.setClass(header, "gridHeaderSorted");
      
      // If the column is already using required sort order, bubble out.
      if ((order == "desc" && header.sorted == 1) || (order == "asc" && header.sorted == -1))  return;
      
      if (header) header.setAttribute("aria-sort", header.sorted === -1 ? "descending" : "ascending");
      
      var colID = header.getAttribute("id");
      FBTrace.sysout("colID.."+ colID);
      // Store current state into the preferences.
      var headerID = headerRow.getAttribute("id");
      FBTrace.sysout("headerID.."+ headerID);

      Preference.setPref(headerID + "sortCol", colID); 
      Preference.setPref(headerID + "sortDir", header.getAttribute("aria-sort")); 
      var values = [];
      for (var row = tbody.childNodes[0]; row; row = row.nextSibling) {
          var cell = row.childNodes[colIndex];
          var value = numerical ? parseFloat(cell.textContent) : cell.textContent;
          values.push({row: row, value: value});
      }

      values.sort(function(a, b) { return a.value < b.value ? -1 : 1; });

      if ((header.sorted && header.sorted == 1) || (!header.sorted && order == "asc")) {
    	removeClass(header, "sortedDescending");
        this.setClass(header, "sortedAscending");
        header.sorted = -1;

        for (var i = 0; i < values.length; ++i) {
          tbody.appendChild(values[i].row);
        
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      } else {
    	removeClass(header, "sortedAscending");
        this.setClass(header, "sortedDescending");

        header.sorted = 1;

        for (var i = values.length-1; i >= 0; --i) {
          tbody.appendChild(values[i].row);
          
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      }
      FBTrace.sysout("values: ", values);
      FBTrace.sysout("header after this.setClass is called: ", header);
    },
    
    /**
     * @function setClass
     * 
     * @desc
     * 
     * @param node
     * @param name
     * 
     * @return node|null
     */
    setClass : function(node, name) {
    
      if (!node || node.nodeType != 1 || name == '') return;

      if (name.indexOf(" ") != -1) {
        var classes = name.split(" "), len = classes.length;
        
        for (var i = 0; i < len; i++) {
          var cls = classes[i].trim();
          
          if (cls != "") this.setClass(node, cls);
        }
        return;
      }
      
      if (!this.hasClass(node, name)) node.className = node.className.trim() + " " + name;
    },
    
    /**
     * @function removeClass
     * 
     * @desc
     * 
     * @param node
     * @param name
     * 
     * @return node|null
     */
    removeClass : function(node, name) {
        
      if (!node || node.nodeType != 1 || node.className == '' || name == '') return;

      if (name.indexOf(" ") != -1) {
        var classes = name.split(" "), len = classes.length;
        
        for (var i = 0; i < len; i++) {
          var cls = classes[i].trim();
          
          if (cls != ""){
                    
            if (this.hasClass(node, cls) == false) this.removeClass(node, cls);
          }
        }
        return;
      }

      var re;
      
      if (name.indexOf("-") == -1) {
        re = classNameReCache[name] = classNameReCache[name] || new RegExp('(^|\\s)' + name + '(\\s|$)', "g");
      } else { 
        re = new RegExp('(^|\\s)' + name + '(\\s|$)', "g")
      }
      node.className = node.className.replace(re, " ");

    },
    
    /**
     * @function hasClass
     * 
     * @desc
     * 
     * @param node
     * @param name
     * 
     * @return 
     */
    hasClass : function(node, name) {
      if (!node || node.nodeType != 1 || !node.className || name == '') return false;

      if (name.indexOf(" ") != -1) {
        var classes = name.split(" "), len = classes.length, found=false;

        for (var i = 0; i < len; i++) {
          var cls = classes[i].trim();
                
          if (cls != "") {
        	if (this.hasClass(node, cls) == false) return false;
            found = true;
          }
        }
        return found;
      }
      var re;
      if (name.indexOf("-") == -1) {
        re = classNameReCache[name] = classNameReCache[name] || new RegExp('(^|\\s)' + name + '(\\s|$)', "g");
      } else { 
        re = new RegExp('(^|\\s)' + name + '(\\s|$)', "g")
      }
      return node.className.search(re) != -1;
    },
    
    /**
     * @function getChildByClass
     * 
     * @desc
     * 
     * @param node
     * 
     * @return node
     */
    getChildByClass : function(node) {
    	
      if (!node) {
        return null;
      }

      for (var i = 1; i < arguments.length; ++i) {
        var className = arguments[i];
        var child = node.firstChild;
        node = null;
        
        for (; child; child = child.nextSibling) {
                
          if (this.hasClass(child, className)) {
            node = child;
            break;
          }
        }
      }

      return node;
    },
    
    /**
     * @function isGridRow
     * 
     * @desc
     * 
     * @param node
     * 
     * @return 
     */
    isGridRow: function(node) {
	  
      return AINSPECTOR_FB.ainspectorUtil.hasClass(node, "gridRow");
	},
    
	/**
	 * @function getAncestorByClass
	 * 
	 * @desc
	 * 
	 * @param node
	 * @param className
	 */
    getAncestorByClass : function(node, className) {
      
	  for (var parent = node; parent; parent = parent.parentNode) {
            
		if (this.hasClass(parent, className)) return parent;
      }

      return null;
    },
    
    /**
     * @function findElementIndex
     * 
     * @desc
     * 
     * @param elem
     * 
     * @return
     */
    findElementIndex : function(elem) {
      
      var k=-1, e=elem;
      
      while (e) {
    	
    	if ( "previousSibling" in e ) {
    	
    	  e = e.previousSibling;
    	  k = k + 1;
    	
    	} else {
    	  k= -1;
    	  break;
    	}
      }
      return k;
    }
  };
  
  /**
   * toolbarUtil
   * 
   * @desc common helper functions for the tool bar buttons
   */
  AINSPECTOR_FB.toolbarUtil = {
    
    /**
     * @function getToolbarButtonClass
     * 
     * @param obj
     * @returns
     */
    getToolbarButtonClass : function(obj) {
      
      var className = "toolbarButtonView-" + obj.name;
      
      if (obj.selected) className += " selected";
      
      if (obj.first) className += " first";
    
      return className;
    },
    
    /**
     * @function selectTab
     * 
     * @param event
     * 
     * @returns
     */
    selectTab : function(event) {
      var elem = event.target;
      if (!elem) return;
      
      var category = getClassValue(elem, "toolbarButtonView");
      FBTrace.sysout("catewgory: ", category);
      FBTrace.sysout("elem: ", event);

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
        showOnSelectButton();
        
      }
    },
  
    /**
     * @function onToolbarFocus
     * 
     * @desc
     * 
     * @param event
     * @returns
     */
    onToolbarFocus : function(event) {
      toolbarUtil.selectTab(event);
    },
    
    /**
     * @function getTabIndex
     * 
     * @param obj
     * @returns
     */
    getTabIndex : function(obj) {
      
      return obj.selected ? "0" : "-1";
    },
    
    /**
     * @function onToolbarKeyPress
     * 
     * @desc
     * 
     * @param event
     * @returns
     */
    onToolbarKeyPress : function(event) {
      var key = event.keyCode;
      var tabs;
      switch(key) {
        case KeyEvent.DOM_VK_LEFT:
        case KeyEvent.DOM_VK_RIGHT:
        case KeyEvent.DOM_VK_UP:
        case KeyEvent.DOM_VK_DOWN:

          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          var tabList = getAncestorByClass(event.target, "focusTabList");
          //get all the tabs from the toolbar
          tabs = tabList.getElementsByClassName("focusTab");
          var currentIndex = Array.indexOf(tabs, event.target);
          
          if (currentIndex != -1) {
            var newIndex = forward ? ++currentIndex : --currentIndex;
            //get the focus back to the first tab on the tool bar from the last tab of the toolbar
            newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
            
            if (tabs[newIndex]) tabs[newIndex].focus();
          }
          event.stopPropagation();
          event.preventDefault();
          
          break;
        } //end switch
        //return tabs[newIndex];
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

    
    viewContainer : DIV({style : "display:none"})
  };
  
  AINSPECTOR_FB.flatListTemplateUtil = {

	/**
	 * @FUNCTION onKeyPressTable
	 * 
	 * @desc
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressTable : function(event){
	  
	  event.stopPropagation();
	  FBTrace.sysout("in onKeyPressTable(): ", event);
	  FBTrace.sysout("in onKeyPressTable(): " + event.keyCode);
	  
	  switch(event.keyCode) {
	  
	    case 38: //up
		  //var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
	    	var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) row.focus();
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  FBTrace.sysout("cell: ", cell);
		  AINSPECTOR_FB.flatListTemplateUtil.hightlightCell(event);
		  if (cell) cell.focus();
		  break;
		case 40: //down
		  var index = AINSPECTOR_FB.ainspectorUtil.findElementIndex(event.target);
		  var row = getAncestorByClass(event.target, "gridRow");
		  FBTrace.sysout("parent: ", row.parentNode);
		  if (event.target.id == "imgTableHeader") {
			row = row.parentNode.nextSibling.firstChild;
		  } else {
			row = row.nextSibling;
		  }
		  FBTrace.sysout("row: ", row);				
	   	  if (row) row.focus();
		  break;
		case 13:
		  var table = getAncestorByClass(event.target, "ai-table-list-items");
	      var column = getChildByClass(event.target, "gridCell");
	      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
		  break;
		  //cell.focus();
	  }
    },
    
    /**
     * hightlight
     *  
     * @desc
     * 
     * @param event event triggered when mouse click happens
     * 
     * @returns
     */
    hightlight: function (event) {
	    
	  var table = getAncestorByClass(event.target, "ai-table-list-items");
      var row =  getAncestorByClass(event.target, "gridRow");
      var tbody = null;
      FBTrace.sysout("inside highlight: ", event);
      FBTrace.sysout("table: ", table);
      FBTrace.sysout("row: ", row);
      var id = row.id;
      if (row.id == "imgTableHeader") 
    	tbody = table.children[0];
      else 
    	tbody = table.children[1];

     
      var i;
      var j;
      var k;
      var cell_selected = false;
      var child;
      var row;
      var cell;
      
      for (i = 0; i < tbody.children.length; i++) {
          var flag = false;
          var row = tbody.children[i];
          
          for (j = 0; j < row.children.length; j++) {
        	  cell = row.children[j];
        	  //cell_selected = getChildByClass(cell, "gridCellSelected");
        	 
        	  for (var k=0; k<cell.classList.length;k++) {
       	  
        		if (cell.classList[k] ==  "gridCellSelected") {
        		  cell_selected = true;
                AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
       		  flag = true;
                break;
             }
        	 }  
        	 if (flag == true) break;
         }
         if (flag == true) break;
       }

       var column = getAncestorByClass(event.target, "gridCell");
       AINSPECTOR_FB.ainspectorUtil.setClass(column, "gridCellSelected");

        //AINSPECTOR_FB.ainspectorUtil.setClass(row_cell, "gridCellSelected");
        //var row_cells = cell.childNodes;
      
    },
    
	/**
	 * @function onKeyPressRow
	 * 
	 * @desc focus on a row with the keyboard events
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressRow: function(event){
	  
	  event.stopPropagation();
	  FBTrace.sysout("in headingpress: ", event);

      switch(event.keyCode) {
		  
	    case 38: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) row.focus();
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  FBTrace.sysout("cell: ", cell);
		  if (cell) cell.focus();
		  break;
		case 40: //down
		  var row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) row.focus();
		  break;
	  }
    },
    
    /**
	 * @function onKeyPressRow
	 * 
	 * @desc focus on a row with the keyboard events
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressHeaderRow: function(event){
	  
	  event.stopPropagation();
	  FBTrace.sysout("in onKeyPressHeaderRow: ", event);
	  FBTrace.sysout("in onKeyPressHeaderRow key coode: "+ event.keyCode);


      switch(event.keyCode) {
		  
	    case 38: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) row.focus();
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridHeaderCell");
		  FBTrace.sysout("cell: ", cell);
		  AINSPECTOR_FB.flatListTemplateUtil.hightlightCell(event);
		  if (cell) cell.focus();
		  break;
		case 40: //down
		  var row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  FBTrace.sysout("row: ", row);

		  FBTrace.sysout("cell: ", cell);

		  if (row) row.focus();
		  break;
		case 13:
		  var table = getAncestorByClass(event.target, "ai-table-list-items");
	      var column = getChildByClass(event.target, "gridHeaderCell");
	      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
		  break;
		  //cell.focus();
	  }
    },
    
    /**
     * @function onKeyPressHeadingCell
     * 
     * @desc focus on a table header cell with the keyboard events
     * 
     * @param event event triggered when any keyboard's enter, right, left, up and down arrows are pressed
     */
    onKeyPressHeadingCell: function(event){
	    
	  event.stopPropagation();
	  FBTrace.sysout("in headingcellpress: ", event);
	  switch(event.keyCode) {
		  
	    case 13: //Enter
	      var table = getAncestorByClass(event.target, "ai-table-list-items");
	      var column = getAncestorByClass(event.target, "gridHeaderCell");
	      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
		  break;
		  
	    case 9: //tab	  
	      break;
	    default:
		  this.onKeyPressCell(event);
		  break;
	  }
    },
    
    /**
     * @function onKeyPressCell
     * 
     * @desc focus on a table cell with the keyboard events
     * 
     * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
     */
    onKeyPressCell: function(event){
  	  FBTrace.sysout("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", event);
  	  event.stopPropagation();
  	  switch(event.keyCode) {
		  
  	    case 13:
  		  var row = getAncestorByClass(event.target, "gridRow");
  		  var imageElement = row.repObject;
          var node = imageElement.dom_element.node;
  	      var panel = Firebug.chrome.selectPanel("html");
  	      panel.select(node);
  	      break;
  	  
  	    case 38: //up
			var index = AINSPECTOR_FB.ainspectorUtil.findElementIndex(event.target);
			var row = getAncestorByClass(event.target, "gridRow");
			row = row.previousSibling;
			if (row) {
			  var  cell = row.childNodes[index];
			  
			  if (cell) cell.focus();
			}
			break;
		  
  	    case 37: //left
		  var cell = event.target.previousSibling;
		
		  if (cell) {
		    cell.focus();
		  } else {
			var row = getAncestorByClass(event.target, "gridRow");
			row.focus();
		  }
		  break;
		
  	    case 39: //right
		  var cell = event.target.nextSibling;
			
		  if (cell) cell.focus();
		  break;
		
  	    case 40: //down
		  var index = AINSPECTOR_FB.ainspectorUtil.findElementIndex(event.target);
		  var row = getAncestorByClass(event.target, "gridRow");
   		  row = row.nextSibling;
			
   		  if (row) {
			var  cell = row.childNodes[index];
			
			if (cell) cell.focus();
		  }
		  break;
	   }  
     },
    
    /**
     * @function doubleClick
     * 
     * @desc double click on a row/cell takes to the HTML panel of Firebug from the ainspector panel
     * 
     * @param event
     */ 
    doubleClick: function(event){

      var element = event.target.repObject;
      var node = element.dom_element.node;
      var panel = Firebug.chrome.selectPanel("html");
      panel.select(node);
    },
    
    /**
     * hightlightCell
     *  
     * @desc
     * 
     * @param event event triggered when mouse click happens
     * 
     * @returns
     */
    hightlightCell: function (event) {
	    
	  var table = getAncestorByClass(event.target, "ai-table-list-items");
      var row =  getAncestorByClass(event.target, "tableRow");
      var tbody = table.children[1];

      if (!row) { //to highlight header cells
    	row =  getAncestorByClass(event.target, "gridHeaderRow");
    	tbody = table.children[0];
      }
      var i;
      var j;
      var k;
      var cell_selected = false;
      var child;
      var row;
      var cell;
      
      FBTrace.sysout("tbody: ", tbody);
      FBTrace.sysout("row: ", row);
      for (i = 0; i < tbody.children.length; i++) {
        var flag = false;
        var row = tbody.children[i];
        
        for (j = 0; j < row.children.length; j++) {
      	  cell = row.children[j];
      	  //cell_selected = getChildByClass(cell, "gridCellSelected");
      	 
      	  for (var k=0; k<cell.classList.length;k++) {
     	  
      		if (cell.classList[k] ==  "gridCellSelected") {
      		  cell_selected = true;
              AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
     		  flag = true;
              break;
           }
      	 }  
      	 if (flag == true) break;
       }
       if (flag == true) break;
     }

     var column = getAncestorByClass(event.target, "gridCell");
     if (!column) {
       if (cell_selected == true) {
    	   column = getChildByClass(event.target, "gridHeaderCell").nextSibling;
           //column = event.target.nextSibling;
     } else {
       column = getChildByClass(event.target, "gridHeaderCell");}
     }
     FBTrace.sysout("column: ", column);
     AINSPECTOR_FB.ainspectorUtil.setClass(column, "gridCellSelected");

      //AINSPECTOR_FB.ainspectorUtil.setClass(row_cell, "gridCellSelected");
      //var row_cells = cell.childNodes;
    },
     
    /**
     * @function onClickHeader
     * 
     * @desc sorts the table depending on the header selected
     * 
     * @param event event triggered when mouse click happens
     */
    onClickHeader : function(event){
  	  
      var table = getAncestorByClass(event.target, "ai-table-list-items");
      var column = getAncestorByClass(event.target, "gridHeaderCell");
      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
    }

  };
  
  var Preference = {
		  /**
		     * @private
		     */
		    _native : null,

		    /**
		     * Register native preference mechanism.
		     */
		    registerNative: function(o) {
		        this._native = o;
		    },

		    /**
		     * Get Preference with default value.  If the preference does not exist,
		     * return the passed default_value.
		     * @param {String} name name of preference
		     * @return preference value or default value.
		     */
		    getPref: function(name, default_value) {
		        if (this._native) {
		            return this._native.getPref(name, default_value);
		        }
		        return default_value;
		    },

		    /**
		     * Get child preference list in branch.
		     * @param {String} branch_name
		     * @return array of preference values.
		     * @type Array
		     */
		    getPrefList: function(branch_name, default_value) {
		      if (this._native) {
		        return this._native.getPrefList(branch_name, default_value);
		      }
		      return default_value;
		    },

		    /**
		     * Set Preference with passed value.
		     * @param {String} name name of preference
		     * @param {value type} value value to be used to set the preference
		     */
		    setPref: function(name, value) {
		      if (this._native) {
		        this._native.setPref(name, value);
		      }
		    },

		    /**
		     * Delete Preference with passed name.
		     * @param {String} name name of preference to be deleted
		     */
		    deletePref: function(name) {
		        if (this._native) {
		            this._native.deletePref(name);
		        }
		    }
          };
};
});