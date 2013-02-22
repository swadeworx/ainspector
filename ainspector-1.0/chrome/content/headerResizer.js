define([
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/events",
    "firebug/lib/css",
    "firebug/lib/dom"
  ],
  
  function(FBTrace, Locale, Events, Css, Dom) {
  
    var HeaderResizer = HeaderResizer || {};
    
    HeaderResizer.gridHeaderColumnResizer = {
        
      resizing: false,        /*resize the column*/
      currColumn: null,
      startX: 0,
      startWidth: 0,
      lastMouseUp: 0,

      /**
       * @function onMouseClick
       * 
       
       * @desc avoid click event for sorting, if the resize has finished
       * 
       * @param {Event} event - event triggered on mouse click
       */
      onMouseClick: function(event) {
          
        if (!Events.isLeftClick(event)) return;

        // Avoid click event for sorting, if the resizing has been just finished.
        var rightNow = (new Date()).getTime();

        if ((rightNow - this.lastMouseUp) < 1000) Events.cancelEvent(event);
      },
        
      /**
       * @function onMouseDown
       *
       * @memberOf AINSPECTOR_FB.gridHeaderColumnResize
       * 
       * @desc resize header columns on mouse down
       * 
       * @param {Event} event - event triggered on mouse down 
       */
      onMouseDown: function(event) {
        
        if (!Events.isLeftClick(event)) return;

        var target = event.target;
        
        if (!Css.hasClass(target, "gridHeaderCellBox")) return;

        var header = Dom.getAncestorByClass(target, "gridHeaderRow");
        if (!header) return;                
        
        if (!this.isBetweenColumns(event)) return;

        this.onStartResizing(event);

        Events.cancelEvent(event);
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

        if (this.resizing) {
              
          if (Css.hasClass(target, "gridHeaderCellBox")) target.style.cursor = "e-resize";

          this.onResizing(event);
          
          return;
        }
        var target = event.target;

        if (!Css.hasClass(target, "gridHeaderCellBox")) return;

        if (target) target.style.cursor = "";

        if (!this.isBetweenColumns(event)) return;

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
//          FBTrace.sysout("inside onMouseup: ", event);  
        if (!this.resizing) return;

        this.lastMouseUp = (new Date()).getTime();
        this.onEndResizing(event);
        Events.cancelEvent(event);
      },

      /**
       * @function onMouseOut
       * 
       * @desc
       * 
       * @param {} event
       */
      onMouseOut: function(event) {
//          FBTrace.sysout("inside onMouseout: ", event);
        if (!this.resizing) return;
        var target = event.target;

        if (target == event.explicitOriginalTarget) this.onEndResizing(event);

        Events.cancelEvent(event);
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
        
        var column = Dom.getAncestorByClass(target, "gridHeaderCell");
        var offset = Dom.getClientOffset(column);
        var size = Dom.getOffsetSize(column);

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
        
        var location = this.isBetweenColumns(event);
        
        if (!location) return;

        var target = event.target;
        this.resizing = true;
        this.startX = event.clientX;

        // Currently resizing column.
        var column = Dom.getAncestorByClass(target, "gridHeaderCell");

        this.currColumn = (location == 1) ? column.previousSibling : column;

        // Last column width.
        var size = Dom.getOffsetSize(this.currColumn);
        
        this.startWidth = size.width;

      },

      /**
       * @function onResizing
       * 
       * @desc
       * 
       * @param {} event
       */
      onResizing: function(event) {
          
        if (!this.resizing) return;
        FBTrace.sysout("event: ", event);
        var newWidth = this.startWidth + (event.clientX - this.startX);
        this.currColumn.style.width = newWidth + "px";
          
      },

      /**
       * @function endResizing
       * 
       * @desc
       * 
       * @param {} event
       */
      onEndResizing: function(event) {

        if (!this.resizing) return;

        this.resizing = false;

        var newWidth = this.startWidth + (event.clientX - this.startX);
        
        this.currColumn.style.width = newWidth + "px";

        // Store width into the preferences.
        var colId = this.currColumn.getAttribute("id");

        if (colId) {
          var prefName = "ainspector." + colId + ".width";
          HeaderResizer.Preference.setPref(prefName, newWidth);
        }
      }
    };
    
    HeaderResizer.Preference = {
        
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
    
    return HeaderResizer;
  }
)