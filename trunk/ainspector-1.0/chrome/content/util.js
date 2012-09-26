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

FBL.ns(function() { with (FBL) {
  
  var classNameReCache={};
  
  /**
   * @namespace AINSPECTOR_FB.gridHeaderColumnResize
   */
  AINSPECTOR_FB.gridHeaderColumnResize = {
      
    resizing: false,
    currColumn: null,
    startX: 0,
    startWidth: 0,
    lastMouseUp: 0,

    /**
     * @function onMouseClick
     * 
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
     * 
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
     * 
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
  
  /**
   * @namespace AINSPECTOR_FB.ainspectorUtil
   */
  AINSPECTOR_FB.ainspectorUtil = {
  
  /**
   * @function hasProperty
   * @memberOf AINSPECTOR_FB.ainspectorUtil
   * @desc 
   * 
   * @param {Array} elements
   */    
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
   * @function colorToHex
   * @memberOf AINSPECTOR_FB.ainspectorUtil
   */
  colorToHex : function(color) {
      if (color.substr(0, 1) === '#') {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    if (digits == null) return "";
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
    },
    
      
    /**
     * @function truncateText
     * 
     * @memberOf AINSPECTOR_FB.ainspectorUtil
     * 
     * @desc
     * 
     * @param {String} text_content - String to truncate
     * @return
     */
    truncateText : function(text_content){
      
      var max_text_length = 60;
      var truncated_text = text_content.substring(0, max_text_length);
      
      if (text_content.length > 60) truncated_text = truncated_text + "...";
      
      return truncated_text;
    },
    
    /**
     * @function getFileName
     * @memberOf AINSPECTOR_FB.ainspectorUtil
     * 
     * @desc retrive file name from the URL 
     * 
     * @param {String} url - 
     */
    getFileName : function (url){
       
      if (url){
        var file_name = url.toString().match(/.*\/(.*)$/);

        if (file_name && file_name.length > 1){
          return decodeURI(file_name[1]);
        }
      }
      return "";
    },
    
    /**
     * @function loadCSSToStylePanel
     * @memberOf AINSPECTOR_FB.ainspectorUtil
     * 
     * @desc
     * 
     * @param {Object} document
     */
    loadCSSToStylePanel : function(document){

    this.loadCSS("chrome://firebug-a11y/content/css/ainspector-panel.css", document);
      this.loadCSS("chrome://firebug-a11y/content/css/fonts-min.css", document);
      this.loadCSS("chrome://firebug-a11y/content/css/tabview.css", document);
      this.loadCSS("chrome://firebug-a11y/content/css/allyGrade.css", document);
      this.loadCSS("chrome://firebug-a11y/content/css/grid.css", document); 
    },
      
  /**
     * @function loadCSS
     * @memberOf AINSPECTOR_FB.ainspectorUtil
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
     * @memberOf AINSPECTOR_FB.ainspectorUtil
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
     * @memberOf AINSPECTOR_FB.ainspectorUtil
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
     * @memberOf AINSPECTOR_FB.ainspectorUtil
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
     * @memberOf AINSPECTOR_FB.ainspectorUtil
     * 
     * @desc sort the table rows when clicked on header cell in all the views
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
     * @memberOf AINSPECTOR_FB.ainspectorUtil
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
     * @desc check if the node contains class name 'gridRow'
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
   * @param {Object} node
   * @param {String} className
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
     * @desc returns index of the given element 
     * 
     * @param {Object} elem
     * 
     * @return {Number}
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
     * @function findNextRow
     * 
     * @desc
     * 
     * @param {Object} node 
     * @param {String} class_name
     * 
     * @return
     */
     findNextRow: function(node, class_name){
      
      var table = getAncestorByClass(node, "ai-table-list-items");
    }
  };
  
  /**
   * @namespace AINSPECTOR_FB.Preference
   */
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
       * @function removeListener
       * 
       * @desc Removes a listener
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
});