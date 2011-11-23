    
with (FBL) {

  var ainspectorUtil = {
	
	loadCSSToStylePanel : function(document){

	  this.loadCSS("chrome://ainspector/content/css/ainspector-panel.css", document);
      this.loadCSS("chrome://ainspector/content/css/fonts-min.css", document);
      this.loadCSS("chrome://ainspector/content/css/tabview.css", document);
      this.loadCSS("chrome://ainspector/content/css/allyGrade.css", document);
      this.loadCSS("chrome://ainspector/content/css/grid.css", document); 
    },
		  
	/**
     *  Dynamically add a stylesheet to the document.
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

    $AI_STR : function(name) {
      return document.getElementById("ainspector_stringbundle").getString(name);
    },

    $AI_STRF : function(name, args) {
      return document.getElementById("ainspector_stringbundle").getFormattedString(name, args);
    },
    
    sortColumn : function(table, column, order) {
      
      var colIndex = 0;
      if(!column) return;
      FBTrace.sysout("Inside sortColumn....");
      var numerical = !hasClass(column, "alphaValue");
      FBTrace.sysout("numerical...." +  numerical);

      for (column = column.previousElementSibling; column; ) {
    	FBTrace.sysout("column", column);
    	FBTrace.sysout("column.previousSibling"+ column.previousElementSibling);
    	++colIndex;
    	FBTrace.sysout("colIndex:  "+ colIndex);
    	column = column.previousElementSibling;
      }

      this.sort(table, colIndex, numerical, order);
    },

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
      
      setClass(header, "gridHeaderSorted");
      
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
      FBTrace.sysout("tbody childNodes...", tbody.childNodes[1]);
      var values = [];
      for (var row = tbody.childNodes[0]; row; row = row.nextSibling) {
          var cell = row.childNodes[colIndex];
          var value = numerical ? parseFloat(cell.textContent) : cell.textContent;
          values.push({row: row, value: value});
      }

      values.sort(function(a, b) { return a.value < b.value ? -1 : 1; });

      if ((header.sorted && header.sorted == 1) || (!header.sorted && order == "asc")) {
        FBTrace.sysout("111111111111111111");
    	removeClass(header, "sortedDescending");
        setClass(header, "sortedAscending");
        header.sorted = -1;

        for (var i = 0; i < values.length; ++i) {
          tbody.appendChild(values[i].row);
        
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      } else {
    	FBTrace.sysout("22222222222222222222222");
    	removeClass(header, "sortedAscending");
        setClass(header, "sortedDescending");

        header.sorted = 1;

        for (var i = values.length-1; i >= 0; --i) {
          tbody.appendChild(values[i].row);
          
          if (values[i].info) tbody.appendChild(values[i].info);
        }
      }
      FBTrace.sysout("values: ", values);
      FBTrace.sysout("header after setClass is called: ", header);
    },
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