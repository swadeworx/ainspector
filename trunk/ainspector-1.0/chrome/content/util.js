    
with (FBL) {

  var ainspectorUtil = {
	
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

    $HW_STR : function(name) {
      return document.getElementById("ainspector_stringbundle").getString(name);
    },

    $HW_STRF : function(name, args) {
      return document.getElementById("ainspector_stringbundle").getFormattedString(name, args);
    }
  };
};