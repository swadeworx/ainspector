if (typeof OpenAjax.a11y.xbrowser == "undefined") {
    OpenAjax.a11y.xbrowser = {
        // modified from ECMA-262
        indexOf : function(anArray, elt /* , from */) {
            if (!anArray) {
                return -1;
            }

            // use the native version when possible
            if (anArray.indexOf) {
            	if (arguments.length == 3) {
            		return anArray.indexOf(elt, arguments[2]);
            	} else {
            		return anArray.indexOf(elt);
            	}
            }

            var t = Object(anArray);
            var len = t.length >>> 0;
            if (len === 0) {
                return -1;
            }

            var n = 0;
            if (arguments.length > 1) {
                n = Number(arguments[2]);
                if (n !== n) {
                    n = 0;
                } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
                }
            }

            if (n >= len) {
                return -1;
            }

            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

            for (; k < len; k++) {
                if (k in t && t[k] === elt)
                    return k;
            }
            return -1;
        },
        
        // assumes element is not null/undefined
        getTextContent : function(element) {
        	var content = null;
        	if (typeof element.innerText == "string") {
        		content = element.innerText;
        	} else if (element.nodeName == "#text") {
        		content = element.nodeValue;
        	} else {
        		content = element.textContent;
        	}
            if(content) {
            	return content;
            } else {
            	return "";
            }
        },
        
        hasAttribute : function(element, attributeName) {
        	var hasAttribute = false;
        	if (element.hasAttribute) {
        		hasAttribute = element.hasAttribute(attributeName);
        	} else if (element.attributes && element.attributes.getNamedItem) {
        		var attr = element.attributes.getNamedItem(attributeName);
        		hasAttribute = attr && attr.specified;
        	}
        	return hasAttribute;
        }
    }
}