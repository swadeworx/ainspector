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

//var AINSPECTOR_FB = AINSPECTOR_FB || {};

if (!AINSPECTOR_FB.highlightModule) {
  var Cu = Components.utils; 

  try {
	AINSPECTOR_FB.highlightModule = Cu["import"]("resource://ainspector/highlight.js");
//    FBTrace.sysout("in try block", AINSPECTOR_FB.highlightModule);
  } catch (error) {
    FBTrace.sysout("error while creating highlightModule Object ", error);	
  }
}

FBL.ns(function() { with (FBL) {
  
  var classNameReCache={};
  
  /**
   * gridHeaderColumnResize
   */
  AINSPECTOR_FB.gridHeaderColumnResize = {
		  
    resizing: false,
    currColumn: null,
    startX: 0,
    startWidth: 0,
    lastMouseUp: 0,

    /**
     * @function onMouseClick
     * @memberOf AINSPECTOR_FB.gridHeaderColumnResize
     * 
     * @desc avoid click event for sorting, if the resize has finished
     * 
     * @param {Event} event - event triggered on mouse click
     */
    onMouseClick: function(event) {
        
	  if (!isLeftClick(event)) return;

      // Avoid click event for sorting, if the resizing has been just finished.
      var rightNow = (new Date()).getTime();

      if ((rightNow - AINSPECTOR_FB.gridHeaderColumnResize.lastMouseUp) < 1000) cancelEvent(event);
    },
    
    /**
     * @function onMouseDown
     * @memberOf AINSPECTOR_FB.gridHeaderColumnResize
     * 
     * @desc resize header columns on mouse down
     * 
     * @param {Event} event - event triggered on mouse down 
     */
    onMouseDown: function(event) {
        
   	  if (!isLeftClick(event)) return;

      var target = event.target;
      
      if (!hasClass(target, "gridHeaderCellBox")) return;

      var header = getAncestorByClass(target, "gridHeaderRow");

      if (!header) return;

      AINSPECTOR_FB.gridHeaderColumnResize.onStartResizing(event);

      cancelEvent(event);
    },

    /**
     * @function onMouseMove
     * @memberOf AINSPECTOR_FB.gridHeaderColumnResize
     * 
     * @desc Update cursor if the mouse is located between two columns.
     * 
     * @param {Event} event - event triggered on mouse down
     */
    onMouseMove: function(event) {
        
      if (AINSPECTOR_FB.gridHeaderColumnResize.resizing) {
            
    	if (hasClass(target, "gridHeaderCellBox")) target.style.cursor = "e-resize";

        AINSPECTOR_FB.gridHeaderColumnResize.onResizing(event);
        return;
      }
      var target = event.target;

      if (!hasClass(target, "gridHeaderCellBox")) return;

      if (target) target.style.cursor = "";

      if (!AINSPECTOR_FB.gridHeaderColumnResize.isBetweenColumns(event)) return;

      // Update cursor if the mouse is located between two columns.
      target.style.cursor = "e-resize";
    },

    /**
     * @function onMouseUp
     * @memberOf AINSPECTOR_FB.gridHeaderColumnResize
     * 
     * @desc 
     * 
     * @param {Event} event
     */
    onMouseUp: function(event) {
        
      if (!AINSPECTOR_FB.gridHeaderColumnResize.resizing) return;

      AINSPECTOR_FB.gridHeaderColumnResize.lastMouseUp = (new Date()).getTime();
      AINSPECTOR_FB.gridHeaderColumnResize.onEndResizing(event);
      cancelEvent(event);
    },

    /**
     * @function onMouseOut
     * 
     * @desc
     * 
     * @param {} event
     */
    onMouseOut: function(event) {
        
      if (!AINSPECTOR_FB.gridHeaderColumnResize.resizing) return;

      if (FBTrace.DBG_COOKIES) {
        FBTrace.sysout("cookies.Mouse out, target: " + event.target.localName +
                ", " + event.target.className + "\n");
        FBTrace.sysout("      explicitOriginalTarget: " + event.explicitOriginalTarget.localName +
                ", " + event.explicitOriginalTarget.className + "\n");
      }
      var target = event.target;

      if (target == event.explicitOriginalTarget) AINSPECTOR_FB.gridHeaderColumnResize.onEndResizing(event);

      cancelEvent(event);
    },

    /**
     * @function isBetweenColumns
     * 
     * @desc
     * 
     * @param {} event
     */
    isBetweenColumns: function(event) {
        
      var target = event.target;
      var x = event.clientX;
      var y = event.clientY;

      var column = getAncestorByClass(target, "gridHeaderCell");
      var offset = getClientOffset(column);
      var size = getOffsetSize(column);

      if (column.previousSibling) {

    	if (x < offset.x + 4)
          return 1;   // Mouse is close to the left side of the column (target).
      }

      if (column.nextSibling) {
            
    	if (x > offset.x + size.width - 6)
          return 2;  // Mouse is close to the right side.
      }
      return 0;
    },

    /**
     * @function onStartResizing
     * 
     * @desc
     * 
     * @param {} event
     */
    onStartResizing: function(event){

      var location = AINSPECTOR_FB.gridHeaderColumnResize.isBetweenColumns(event);
      
      if (!location) return;

      var target = event.target;
      AINSPECTOR_FB.gridHeaderColumnResize.resizing = true;
      AINSPECTOR_FB.gridHeaderColumnResize.startX = event.clientX;

      // Currently resizing column.
      var column = getAncestorByClass(target, "gridHeaderCell");
      AINSPECTOR_FB.gridHeaderColumnResize.currColumn = (location == 1) ? column.previousSibling : column;

      // Last column width.
      var size = getOffsetSize(AINSPECTOR_FB.gridHeaderColumnResize.currColumn);
      AINSPECTOR_FB.gridHeaderColumnResize.startWidth = size.width;

      if (FBTrace.DBG_COOKIES) {
            
    	var colId = AINSPECTOR_FB.gridHeaderColumnResize.currColumn.getAttribute("id");
        FBTrace.sysout("cookies.Start resizing column (id): " + colId +
                ", start width: " + AINSPECTOR_FB.gridHeaderColumnResize.startWidth + "\n");
      }
    },

    /**
     * @function onResizing
     * 
     * @desc
     * 
     * @param {} event
     */
    onResizing: function(event) {
        
      if (!AINSPECTOR_FB.gridHeaderColumnResize.resizing) return;

      var newWidth = AINSPECTOR_FB.gridHeaderColumnResize.startWidth + (event.clientX - AINSPECTOR_FB.gridHeaderColumnResize.startX);
      AINSPECTOR_FB.gridHeaderColumnResize.currColumn.style.width = newWidth + "px";
        
      if (FBTrace.DBG_COOKIES) {
        var colId = AINSPECTOR_FB.gridHeaderColumnResize.currColumn.getAttribute("id");
        FBTrace.sysout("cookies.Resizing column (id): " + colId +
                ", new width: " + newWidth + "\n", AINSPECTOR_FB.gridHeaderColumnResize.currColumn);
      }
    },

    /**
     * @function endResizing
     * 
     * @desc
     * 
     * @param {} event
     */
    onEndResizing: function(event) {

      if (!AINSPECTOR_FB.gridHeaderColumnResize.resizing) return;

      AINSPECTOR_FB.gridHeaderColumnResize.resizing = false;

      var newWidth = AINSPECTOR_FB.gridHeaderColumnResize.startWidth + (event.clientX - AINSPECTOR_FB.gridHeaderColumnResize.startX);
      AINSPECTOR_FB.gridHeaderColumnResize.currColumn.style.width = newWidth + "px";

      // Store width into the preferences.
      var colId = AINSPECTOR_FB.gridHeaderColumnResize.currColumn.getAttribute("id");

      if (colId) {
        var prefName = "ainspector." + colId + ".width";
        AINSPECTOR_FB.Preference.setPref(prefName, newWidth);
      }

      if (FBTrace.DBG_COOKIES) {
        var colId = AINSPECTOR_FB.gridHeaderColumnResize.currColumn.getAttribute("id");
        FBTrace.sysout("cookies.End resizing column (id): " + colId +
                ", new width: " + newWidth + "\n");
      }
    }	  
  };
  
  AINSPECTOR_FB.ainspectorUtil = {
	
	hasProperty : function(elements){
	  var flag = true;
	
	  for(var key in elements) {
        if (elements.hasOwnProperty(key)) {
	      flag = false;
	      break;
	    }
	  }
	  return flag;
    },
    
    	
    /**
     * @function truncateText
     * 
     * @desc
     * 
     * @param {String} text_content - String to truncate
     * @return
     */
    truncateText : function(text_content){
    	
      var max_text_length = 40;
      var truncated_text = text_content.substring(0, max_text_length);
      
      if (text_content.length > 40) truncated_text = truncated_text + "...";
      
      return truncated_text;
    },
    
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
      
      // Remove class from the currently sorted column
      var headerSorted = getChildByClass(headerRow, "gridHeaderSorted");
      removeClass(headerSorted, "gridHeaderSorted");
      
      if (headerSorted) headerSorted.removeAttribute("aria-sort");

      // Mark new column as sorted.
      var header = headerRow.childNodes[colIndex];
      
      this.setClass(header, "gridHeaderSorted");
      
      // If the column is already using required sort order, bubble out.
      if ((order == "desc" && header.sorted == 1) || (order == "asc" && header.sorted == -1))  return;
      
      if (header) header.setAttribute("aria-sort", header.sorted === -1 ? "descending" : "ascending");
      
      var colID = header.getAttribute("id");
      // Store current state into the preferences.
      var headerID = headerRow.getAttribute("id");

      AINSPECTOR_FB.Preference.setPref(headerID + "sortCol", colID); 
      AINSPECTOR_FB.Preference.setPref(headerID + "sortDir", header.getAttribute("aria-sort")); 
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
        re = new RegExp('(^|\\s)' + name + '(\\s|$)', "g");
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
    },
    
    /**
     * @function 
     * 
     * @desc
     * 
     * @param {}
     * @param {}
     * 
     * @return
     */
     findNextRow: function(node, class_name){
      
      var table = getAncestorByClass(node, "ai-table-list-items");
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
        //showOnSelectButton();
        
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
      
      if (obj == 'temp') return 0;
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
          
        case KeyEvent.DOM_VK_TAB:
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
    	  if (obj == 'temp') return 'true';  
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
            if (cell.classList[k] ==  "gridRowSelected") {
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
       * @function getRulesetLEvel
       * 
       * @memberOf AINSPECTOR_FB.toolbarUtil
       * 
       * @desc returns a level in which the ruleset is evaluated
       * 
       * @param {Number} level
       * 
       * @return A, AA && AAA
       */
      getLevel : function (level){
    		
   	   if (level == 1) return "A";
   	   else if (level == 2) return "A & AA";
   	   else return "A, AA & AAA";
   		   
       },
       
      /**
       * @functon getRulesetTitle
       * 
       * @desc gets the ruleset tilte
       * 
       * @param {String} ruleset_id - ID of the ruleset
       * 
       * @return ruleset Title
       */
      getRulesetTitle : function (ruleset_id) {
      
        if (ruleset_id == 'WCAG20_ARIA_TRANS') 
        	return 'WCAG 2.0 ARIA Transitional';
        else if (ruleset_id == 'WCAG20_ARIA_STRICT')
        	return 'WCAG 2.0 ARIA Strict';
        else return 'IITAA 2.0';
      },

      viewContainer : DIV({style : "display:none"}),
    
    /**
     * @function getSelectedToolbarButton
     * 
     * @desc return toolbar button selected on the main panel
     * 
     * @param {Object} context - Firebug context
     * @property {String} toolbar_button - selected toolbar button
     * 
     * @return {String} toolbar_button
     */
    getSelectedToolbarButton : function(context){
    
      //var toolbarbuttons = context.browser.chrome.$("radio-toolbar").children;
    	  var toolbarbuttons = context.chrome.$("fbFirebugExtensionButtons").children;
   	  var toolbar_button;
   	  for (var i=1; i < toolbarbuttons.length; i=i+2){
   		if (toolbarbuttons[i].checked == true) {
   		  //if (i != 0) toolbarbuttons[i].checked = false;
   		  toolbar_button = toolbarbuttons[i].id;
   		  break;
   		}
   	  }
   	  return toolbar_button;
    }
  };
  
  AINSPECTOR_FB.flatListTemplateUtil = {

    /**
     * @functin getTableRowClass
     */
	getTableRowClass : function(object) {
	
	  if (object == null) { 
		  return "tableRowView-tabHeader";
	  
	  } else {
		  var className = "tableRowView-" + object.cache_id;
	      
	      if (object.selected) className += " selected";
	      
	      if (object.first) className += " first";

	      return className;  
	  }
	  
		
	},
	
    /**
	 * @function onKeyPressTable
	 * 
	 * @desc focus on a row with the keyboard events
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressTable: function(event){
	  
	  event.stopPropagation();
	  var table = getAncestorByClass(event.target, "ai-table-list-items");
	  
      switch(event.keyCode) {
        
        case KeyEvent.DOM_VK_LEFT: //  
	    case KeyEvent.DOM_VK_UP: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) {
		    row.focus();
		    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
		  }
		  break;
		case KeyEvent.DOM_VK_RIGHT: //right
		  //var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  //if (cell) cell.focus();
		  //break;
		case KeyEvent.DOM_VK_DOWN: //down

		  if (table.tabIndex == '0') {
			table.setAttribute('tabindex', '-1');
			table.rows[0].setAttribute('tabindex', '0');
			table.rows[0].focus();
			break;
		  }	
		  var all_rows = table.getElementsByClassName("gridRow");
		  
          var current_index = Array.indexOf(all_rows, event.target);
          var index = Array.indexOf(all_rows, event.target);
          var key = event.keyCode;
          var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
          
          if (current_index != -1) {
        	  var new_index = forward ? ++current_index : --current_index;
              //get the focus back to the first tab on the tool bar from the last tab of the toolbar
        	  new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
              
              if (all_rows[new_index]) { 
            	  var next_row = all_rows[new_index];

            	  //unhighlighting from rows in panel
            	  var current_row = all_rows[index];

            	  if (current_index != 0) {
            	    AINSPECTOR_FB.ainspectorUtil.removeClass(current_row, "gridRowSelected");
      	            for (var c=0; c< current_row.cells.length; c++) AINSPECTOR_FB.ainspectorUtil.removeClass(current_row.cells[c], "gridCellSelected");
            	  }

            	  //highlight rows from panel
      	          all_rows[new_index].focus();
            	  AINSPECTOR_FB.ainspectorUtil.setClass(next_row, "gridRowSelected");
      	          for (var i=0; i< next_row.cells.length; i++) AINSPECTOR_FB.ainspectorUtil.setClass(next_row.cells[i], "gridCellSelected");
//      	          this.highlightCacheItemOnBrowser(next_row.repObject);
      	        highLight.highlightModule.highlightNodes(next_row.repObject, window.content.document);

              }
              
          }
          event.stopPropagation();
          event.preventDefault();
          
          break;
          
        case KeyEvent.DOM_VK_TAB:
        	//var panel = Firebug.chrome.getSelectedPanel();
            var sidePanel = Firebug.chrome.getSelectedSidePanel();
//            if (sidePanel) {
//            	sidePanel.panelNode.setAttribute("tabindex", "0");
//                sidePanel.panelNode.focus();
//                setClass(sidePanel.panelNode, "focusRow");
//            }
        	break;
        }
    },
    
    onKeyPressTree : function (event) {
    
  	  event.stopPropagation();
  	  var table = getAncestorByClass(event.target, "domTree");
  	  
      switch(event.keyCode) {
          
          case KeyEvent.DOM_VK_LEFT: //  
  	      case KeyEvent.DOM_VK_UP: //up
  		    var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
  		  
  		    if (row) {
  		      row.focus();
  		      AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
  		    }
  		    break;
  		  case KeyEvent.DOM_VK_RIGHT: //right
  		    
  		  case KeyEvent.DOM_VK_DOWN: //down

  		  if (table.tabIndex == '0') {
  			table.setAttribute('tabindex', '-1');
  			table.rows[0].setAttribute('tabindex', '0');
  			table.rows[0].focus();
  			break;
  		  }	
  		  var all_rows = table.getElementsByClassName("gridRow");
  		  
            var current_index = Array.indexOf(all_rows, event.target);
            var index = Array.indexOf(all_rows, event.target);
            var key = event.keyCode;
            var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
            
            if (current_index != -1) {
          	  var new_index = forward ? ++current_index : --current_index;
                //get the focus back to the first tab on the tool bar from the last tab of the toolbar
          	  new_index = new_index < 0 ? all_rows.length -1 : (new_index >= all_rows.length ? 0 : new_index);
                
                if (all_rows[new_index]) { 
              	  var next_row = all_rows[new_index];

              	  //unhighlighting from rows in panel
              	  var current_row = all_rows[index];

              	  if (current_index != 0) {
              	    AINSPECTOR_FB.ainspectorUtil.removeClass(current_row, "gridRowSelected");
        	            for (var c=0; c< current_row.cells.length; c++) AINSPECTOR_FB.ainspectorUtil.removeClass(current_row.cells[c], "gridCellSelected");
              	  }

              	  //highlight rows from panel
        	          all_rows[new_index].focus();
              	  AINSPECTOR_FB.ainspectorUtil.setClass(next_row, "gridRowSelected");
        	          for (var i=0; i< next_row.cells.length; i++) AINSPECTOR_FB.ainspectorUtil.setClass(next_row.cells[i], "gridCellSelected");
//        	          this.highlightCacheItemOnBrowser(next_row.repObject);
        	          highLight.highlightModule.highlightNodes(next_row.repObject, window.content.document);

                }
                
            }
            event.stopPropagation();
            event.preventDefault();
            
            break;
        }
      	
    },
    
    /**
     * @function onFocus
     * 
     * @desc
     * 
     * @param {Event} event
     */
    onFocus : function(event) {

      var event_target = event.target;
      if (!event_target) return;
      
      var category = getClassValue(event_target, "tableRowView");
      //if (category) {
        var table_rows = getAncestorByClass(event_target, "gridRow");
        if (table_rows) {
          var old_row = getElementByClass(table_rows, "selected");

          if (old_row) {
        	  old_row.setAttribute("aria-selected", "false");
        	  old_row.setAttribute("tabindex", "-1");
              removeClass(old_row, "selected");
          }
        }

        event_target.setAttribute("aria-selected", "true");
        event_target.setAttribute("tabindex", "0");
        setClass(event_target, "selected");

      //}
    },
    
    /**
     * @function htmlButtonPress
     * 
     * @desc
     * 
     * @param {Event} event
     */
    htmlButtonPress : function(event) {
    
      switch(event.keyCode) {
		  
	    case 13: //Enter
//	      var table = getAncestorByClass(event.target, "ai-table-list-items");
//	      var column = getAncestorByClass(event.target, "gridHeaderCell");
//	      AINSPECTOR_FB.ainspectorUtil.sortColumn(table, column);
	      AINSPECTOR_FB.images.equivToolbarPlate.toHTMLPanel(event);
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
	onKeyPressRow: function(event){
	  
	  event.stopPropagation();
      
      switch(event.keyCode) {
		  
	    case 38: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) {
		    row.focus();
		    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
		  }
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  if (cell) cell.focus();
		  break;
		case 40: //down
		  var row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow, true);
		  if (row) {
		    row.focus();
		    AINSPECTOR_FB.flatListTemplateUtil.highlightRow(event, row);
		  }
		  break;
	  }
    },
    
    /**
	 * @function onKeyPressTreeRow
	 * 
	 * @desc focus on a row with the keyboard events
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressTreeRow: function(event){
	  
	  event.stopPropagation();
      
      switch(event.keyCode) {
		  
	    case 38: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) {
		    row.focus();
		    AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
		  }
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridCell");
		  if (cell) cell.focus();
		  break;
		case 40: //down
			  //FBTrace.sysout("event in keypress to highlight: ", event);
		  var row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  //FBTrace.sysout("row: ", row);
		  if (row) {
		    row.focus();
		    AINSPECTOR_FB.flatListTemplateUtil.highlightTreeRow(event, row);
		  }
		  break;
	  }
    },
    
    /**
	 * @function onKeyPressHeaderRow
	 * 
	 * @desc focus on a row with the keyboard events
	 * 
	 * @param event event triggered when any keyboard's right, left, up and down arrows are pressed
	 */
	onKeyPressHeaderRow: function(event){
	  
	  event.stopPropagation();

      switch(event.keyCode) {
		  
	    case 38: //up
		  var row = findPrevious(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);
		  if (row) row.focus();
		  break;
		case 39: //right
		  var cell = AINSPECTOR_FB.ainspectorUtil.getChildByClass(event.target, "gridHeaderCell");
		  AINSPECTOR_FB.flatListTemplateUtil.hightlightCell(event);
		  if (cell) cell.focus();
		  break;
		case 40: //down
		  var row = findNext(event.target, AINSPECTOR_FB.ainspectorUtil.isGridRow);

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
     * @function highlight
     * 
     * @desc highlight the first row when a toolbar button is clicked
     * 
     * @param {Object} row - row to highlight
     */
    highlight : function (row) {
      
      AINSPECTOR_FB.ainspectorUtil.setClass(row, "gridRowSelected");
      for (var i=0; i< row.children.length; i++) {
      	AINSPECTOR_FB.ainspectorUtil.setClass(row.children[i], "gridCellSelected");
      }
//      this.highlightCacheItemOnBrowser(row.repObject);
      highLight.highlightModule.highlightNodes([row.repObject], window.content.document);

    },
    
    /**
     * @function highlightRow
     *  
     * @desc highlight a row when a row is selected in a panel
     * Set the "gridRowSelected" and "gridCellSelected" classes to the selected Row and 
     * cells in that row remove these classes from earlier selected row.
     * 
     * 
     * @param {event} event triggered when mouse click happens
     * 
     * @returns 
     */
    highlightRow: function (event) {
	
      var table = getAncestorByClass(event.target, "ai-table-list-items");
      var current_row =  getAncestorByClass(event.target, "tableRow");
      var tbody = table.children[1]; //nomber of rows in a table
      var row;
      var cell;

      if (!current_row) { //to highlight header cells
    	current_row =  getAncestorByClass(event.target, "gridHeaderRow");
  	    tbody = table.children[0];
  	    
  	    if (event.keyCode == 38 || event.keyCode == 37) {
  	      	
    	  //current_row = table.children[1].children[]; 

        } else if (event.keyCode == 40 || event.keyCode == 39){
    	  table.children[0].children[0].blur();
    	  current_row = table.children[1].children[0]; 
    	  table.children[1].children[0].focus();
    	  AINSPECTOR_FB.ainspectorUtil.setClass(current_row, "gridRowSelected");
          
//          this.highlightCacheItemOnBrowser(current_row.repObject);
    	  highLight.highlightModule.highlightNodes(current_row.repObject, window.content.document);
          for (var c=0; c< current_row.children.length; c++) {
      	  AINSPECTOR_FB.ainspectorUtil.setClass(current_row.children[c], "gridCellSelected");
          }
          return;
        }
      }
    
      for (var i = 0; i < tbody.children.length; i++) {
        row = tbody.children[i];
        var count = 0;
        var no_of_cells = row.children.length;
        
        for (var j = 0; j < no_of_cells; j++) {
    	  cell = row.children[j];
    	 
    	  for (var k=0; k<cell.classList.length;k++) {
   	  
    	  	if (cell.classList[k] ==  "gridCellSelected") {
              AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
              count = count + 1;
              break;
    	  	}

    	  }  
    	  if (count >= no_of_cells) break;
        }
        if (count >= no_of_cells) {
    	  AINSPECTOR_FB.ainspectorUtil.removeClass(row, "gridRowSelected");
    	  if (event.keyCode == 38 || event.keyCode == 37) {
        	  current_row = tbody.children[i-1]; 

          } else if (event.keyCode == 40 || event.keyCode == 39){
        	  
        	  current_row = tbody.children[i+1]; 
          }
    	  break;
    	}
        
      }
      
        AINSPECTOR_FB.ainspectorUtil.setClass(current_row, "gridRowSelected");
        
        //this.highlightCacheItemOnBrowser(current_row.repObject);
        
        highLight.highlightModule.highlightNodes([current_row.repObject], window.content.document);

        for (var c=0; c< current_row.children.length; c++) {
    	  AINSPECTOR_FB.ainspectorUtil.setClass(current_row.children[c], "gridCellSelected");
        }
    },
    
    /**
     * @function highlightTreeRow
     *  
     * @desc highlight a row when a row is selected in a panel
     * Set the "gridRowSelected" and "gridCellSelected" classes to the selected Row and 
     * cells in that row remove these classes from earlier selected row.
     * 
     * 
     * @param {event} event triggered when mouse click happens
     * 
     * @returns 
     */
    highlightTreeRow: function (event) {
	
      var table = getAncestorByClass(event.target, "domTable");
      var current_row =  getAncestorByClass(event.target, "treeRow");
      var tbody = table.children[1]; //nomber of rows in a table
      var row;
      var cell;
      
      if (!current_row) { //to highlight header cells
    	current_row =  getAncestorByClass(event.target, "gridHeaderRow");
  	    tbody = table.children[0];
      }
    
      for (var i = 0; i < tbody.children.length; i++) {
        row = tbody.children[i];
        var count = 0;
        var no_of_cells = row.children.length;
        
        for (var j = 0; j < no_of_cells; j++) {
    	  cell = row.children[j];
    	 
    	  for (var k=0; k<cell.classList.length;k++) {
   	  
    	  	if (cell.classList[k] ==  "gridCellSelected") {
              AINSPECTOR_FB.ainspectorUtil.removeClass(cell, "gridCellSelected");
              count = count + 1;
              break;
    	  	}

    	  }  
    	  if (count >= no_of_cells) break;
        }
        if (count >= no_of_cells) {
    	  AINSPECTOR_FB.ainspectorUtil.removeClass(row, "gridRowSelected");
    	  if (event.keyCode == 38 || event.keyCode == 37) {
        	  current_row = tbody.children[i-1]; 

          } else if (event.keyCode == 40 || event.keyCode == 39){
        	  current_row = tbody.children[i+1]; 

          }
    	  break;
    	}
        
      }
      AINSPECTOR_FB.ainspectorUtil.setClass(current_row, "gridRowSelected");
//      this.highlightCacheItemOnBrowser(current_row.repObject);
      highLight.highlightModule.highlightNodes(current_row.repObject, window.content.document);
      for (var c=0; c< current_row.children.length; c++) {
    	AINSPECTOR_FB.ainspectorUtil.setClass(current_row.children[c], "gridCellSelected");
      }
      
    },
    
    /**
     * @function highlightCacheItemOnBrowser
     * 
     * @desc highlight the cache_item on the browser when selected on Firebug A11y Panel 
     * 
     * @param cache_item - OAA cache_item to highlight on the browser 
     */
    highlightCacheItemOnBrowser : function(cache_item){
	
      if (!cache_item) return;
      
      if (AINSPECTOR_FB.last_node_highlighted) AINSPECTOR_FB.last_node_highlighted.style.outline = ""; 
      
      // Test to see if the cache item has a dom_element property
	  if (cache_item.dom_element) {
	    if (cache_item.dom_element.image_only) {
	      node = cache_item.dom_element.node.getElementsByTagName("img")[0];
	    }
	    else {
	      node = cache_item.dom_element.node;
	    }
	  }
	  else {
	    if (cache_item.type == NODE_TYPE.ELEMENT) {
	      node = cache_item.node;
	    }
	    else {
	      if (cache_item.parent_element) node = cache_item.parent_element.node;
	    }
	  }

	  if (node) {
	    node.style.outline = "medium solid red";
	    node.style.background="url(chrome://ainspector/skin/twistyClosed.png)";
	    // If true, element is aligned with top of scroll area.
	    // If false, it is aligned with bottom.
	    node.scrollIntoView(false);
	    AINSPECTOR_FB.last_node_highlighted = node;
	  }

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
  
  AINSPECTOR_FB.Preference = {
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

AINSPECTOR_FB.event = {


	    /**
	     * Hash of subscribers where the key is the event name and the value is an array of callbacks-type objects
	     * The callback objects have keys "callback" which is the function to be called and "that" which is the value
	     * to be assigned to the "this" object when the function is called
	     */
	    subscribers: {},

	    /**
	     * Adds a new listener
	     *
	     * @param {String} event_name Name of the event
	     * @param {Function} callback A function to be called when the event fires
	     * @param {Object} that Object to be assigned to the "this" value of the callback function
	     */
	    addListener: function(event_name, callback, that) {
	        if (typeof this.subscribers[event_name] === 'undefined') {
	            this.subscribers[event_name] = [];
	        }
	        this.subscribers[event_name].push({callback: callback, that: that});
	    },

	    /**
	     * Removes a listener
	     *
	     * @param {String} event_name Name of the event
	     * @param {Function} callback The callback function that was added as a listener
	     * @return {Boolean} TRUE is the listener was removed successfully, FALSE otherwise (for example in cases when the listener doesn't exist)
	     */
	    removeListener: function(event_name, callback) {
	        var i;
	        for (i in this.subscribers[event_name]) {
	            if (this.subscribers[event_name][i].callback === callback) {
	                this.subscribers[event_name].splice(i, 1);
	                return true;
	            }
	        }
	        return false;
	    },

	    /**
	     * Fires the event
	     *
	     * @param {String} event_nama Name of the event
	     * @param {Object} event_object Any object that will be passed to the subscribers, can be anything
	     */
	    fire: function(event_name, event_object) {
	        var i, listener;

	        if (typeof this.subscribers[event_name] === 'undefined') {
	            return false;
	        }

	        for (i = 0; i < this.subscribers[event_name].length; i++) {
	            listener = this.subscribers[event_name][i];
	            listener.callback.call(listener.that, event_object);
	        }
	        return true;
	    },
	    
	    /**
	     * @function dispatchMouseEvent
	     * 
	     * @desc
	     * 
	     * @param {Object} node
	     * @param {Object} eventType
	     * @param {Object} clientX
	     * @param {Object} clientY
	     * @param {Object} button
	     */
	    dispatchMouseEvent : function (node, eventType, clientX, clientY, button) {
	        if (!clientX)
	            clientX = 0;
	        if (!clientY)
	            clientY = 0;
	        if (!button)
	            button = 0;
	        if (typeof node == "string")
	            node = $(node);
	        var doc = node.ownerDocument;
	        var event = doc.createEvent('MouseEvents');
	        event.initMouseEvent(eventType, true, true, doc.defaultView,
	            0, 0, 0, clientX, clientY, false, false, false, false, button, null);
	        node.dispatchEvent(event);
	    },
	};
  
AINSPECTOR_FB.tabPanelUtil = {
	  updateToolbar: function(panelType, toolbar_button)
	    {
	        var removeBtn = Firebug.chrome.$(toolbar_button);
	        var registered = Firebug.getPanelType(panelType);
	    },
	    
	    /**
	     * @function onRemoveSidePanel
	     * @memberOf AINSPECTOR_FB.tabPanelUtil
	     * 
	     * @desc removes/unregisters sidePanal from any main panel depending on panelType
	     * 
	     *  @param {Object} panelType - type of the Panel  
	     */
	    onRemoveSidePanel: function(panelType) {
   
	      Firebug.unregisterPanel(panelType);
	    },

	    /**
	     * @function onAppendSidePanel
	     * @memberOf AINSPECTOR_FB.tabPanelUtil
	     * 
	     * @desc add/registers sidePanal from any main panel depending on panelType
	     * 
	     *  @param {Object} panelType - type of the Panel  
	     */
	    onAppendSidePanel: function(panelType) {

	      Firebug.registerPanel(panelType);
	    },
	    
	    updateToolbarWidAppend: function(panelType, toolbar_button){
	        var appendBtn = Firebug.chrome.$(toolbar_button);
	        var registered = Firebug.getPanelType(panelType);
	    },
	
	    /**
	     * @function addAndRemoveSidePanels
	     */
	    addAndRemoveSidePanels : function(pref) {
	      
	      var panelType_rule = Firebug.getPanelType("rulesSidePanel");
	      var panelType_attributes = Firebug.getPanelType("attributesSidePanel");
	      var panelType_properties = Firebug.getPanelType("propertiesSidePanel");
	      var panelType_events = Firebug.getPanelType("eventsSidePanel");
	      var panelType_style = Firebug.getPanelType("styleSidePanel");
	      
	      if (pref == true){
	    	  AINSPECTOR_FB.rules_registered = panelType_rule;
	    	  AINSPECTOR_FB.attributes_registered = panelType_attributes;
	    	  AINSPECTOR_FB.style_registered = panelType_style;
	    	  AINSPECTOR_FB.properties_registered = panelType_properties;
	    	  AINSPECTOR_FB.events_registered = panelType_events;
	    	  if (panelType_rule) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_rule);
	    	  if (panelType_attributes) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_attributes);
	    	  if (panelType_style) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_style);
	    	  if (panelType_properties) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_properties);
	    	  if (panelType_events) AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_events);
	    	  return;
	      }
	      
	      if (panelType_rule) {

	      } else {
			panelType_rule = AINSPECTOR_FB.rules_registered;
		    AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_rule);
	      }
	      
	      if (panelType_style) {
		    AINSPECTOR_FB.style_registered = panelType_style;
			AINSPECTOR_FB.tabPanelUtil.onRemoveSidePanel(panelType_style);
	      }
		 
		  if (panelType_attributes) {
	     
		  } else {
	        panelType_attributes = AINSPECTOR_FB.attributes_registered;
		    AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_attributes);
	      }
		 
		  if (panelType_properties) {
	      
		  } else {
	        panelType_properties = AINSPECTOR_FB.properties_registered;
		    AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_properties);
	      }
		 
		  if (panelType_events) {
	     
		  } else {
	        panelType_events = AINSPECTOR_FB.events_registered;
		    AINSPECTOR_FB.tabPanelUtil.onAppendSidePanel(panelType_events);
	      }
	    }
     };
});