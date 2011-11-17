/*
 (function($) {
$.fn.isnumeric = function(){ return true};  
$.fn.canTagHaveAlt = function( ) {
	return (this.nodeName(elem, 'img') || this.nodeName(elem, 'area') || this.nodeName(elem, 'applet') || this.nodeName(elem, 'input'));
};
$.fn.textWithAlt = function( text ) {
	if (typeof text !== "object" && text != null)
		return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));

	var ret = "";
	this.each(text || this, function() {
		this.each(this.childNodes, function() {
			if (this.nodeType != 8) { 
			   if (this.nodeType == 1) {
				   if ($(this).is('[alt]') && $(this).canTagHaveAlt(this)) {
				      if (ret != "") ret += " ";
				      ret += $(this).attr('alt');
				   } 
				}
				ret += this.nodeType != 1 ? this.nodeValue : jQuery.fn.text([this]);
			}
		});
	});
	return ret;
  };
  
})(jQuery);

jQuery.noConflict();
alert ('@@@@  isnumeric ' + jQuery("").isnumeric() );
*/