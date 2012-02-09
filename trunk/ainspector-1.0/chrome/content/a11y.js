FBL.ns(function() { with (FBL) { 
  
	Firebug.AccessibilityModule = extend(Firebug.Module, {
	
	  initialize : function() {

		Firebug.Module.initialize.apply(this, arguments);
		Firebug.chrome.$("fbFirebugExtensionButtons").addEventListeners("keypress", this.onKeyPress, false);
	  },
	  
	  shutdown : function() {
		Firebug.Module.shutdown.apply(this, arguments);  
	  },
	  
	  onKeyPress: function(event) {
	    FBTrace.sysout("ally...", event);
	  }

	});
}
Firebug.registerModule(Firebug.AccessibilityModule);

});