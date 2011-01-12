OpenAjax.a11y.colorUtil = {
		
	createContrastElement: function(objElement) {
		objElementDetails = {};
	
		objElementDetails.node = objElement; //Added for AccessExt
		objElementDetails.element = objElement.tagName;
		if(objElement.type != undefined && objElement.type != '') objElementDetails.element = objElementDetails.element + "-" + objElement.type;
		objElementDetails.className = objElement.className;
		objElementDetails.IDName = objElement.id;
		objElementDetails.BGColor = objElement.getAttribute('bgcolor');
		objElementDetails.FGColor = objElement.getAttribute('color');
		objElementDetails.hexFGColor = this.getHex(objElement, 'color');
		objElementDetails.hexBGColor = this.getHex(objElement, 'background-color');
		objElementDetails.forecolour = this.getColour(objElement, 'color');
		objElementDetails.backcolour = this.getColour(objElement, 'background-color');
		objElementDetails.luminosity = this.getLuminosity(objElementDetails.forecolour, objElementDetails.backcolour);
		return objElementDetails;
	},
	
	getColour: function(objElement, strProperty)	{
		var objColourDetails = {};
		var arColour = this.getColourParts(objElement, strProperty);
	
		objColourDetails.hexcolour = this.getHex(objElement, strProperty);
		objColourDetails.red = arColour[0];
		objColourDetails.green = arColour[1];
		objColourDetails.blue = arColour[2];
	
		return objColourDetails;
	},
	
	getColourParts: function(objElement, strProperty)	{
		var arColour = [];
		if (objElement.ownerDocument.defaultView && objElement.ownerDocument.defaultView.getComputedStyle) {
			arColour = this.getColourPartsWithComputedStyle(objElement, strProperty);
		} else {
			arColour = this.getColourPartsInIE(objElement, strProperty);
		}
		return arColour;
	},
	
	getColourPartsWithComputedStyle: function(objElement, strProperty) {
		var arColour = [];
	
		var objStyle = objElement.ownerDocument.defaultView.getComputedStyle(objElement, null);
		var objColour = objStyle.getPropertyCSSValue(strProperty);
		
		if (objColour && objColour.primitiveType == CSSPrimitiveValue.CSS_RGBCOLOR)		{
			var objRGB = objColour.getRGBColorValue();
	
			var iRed = parseInt(objRGB.red.getFloatValue(CSSPrimitiveValue.CSS_NUMBER), 10);
			var iGreen = parseInt(objRGB.green.getFloatValue(CSSPrimitiveValue.CSS_NUMBER), 10);
			var iBlue = parseInt(objRGB.blue.getFloatValue(CSSPrimitiveValue.CSS_NUMBER), 10);
			arColour = [iRed, iGreen, iBlue];
		} else {
			try	{
				arColour = this.getColourPartsWithComputedStyle(objElement.parentNode, strProperty);
			} catch (err) {
				if (strProperty == 'color') {
					arColour = [0, 0, 0];
				} else {
					arColour = [255, 255, 255];
				}
			}
		}
	
		return arColour;
	},
	
	getColourPartsInIE: function(objElement, strProperty) {
		var arColour = [];
		
		strProperty = this.convertStyleToPropertyInIE(strProperty);
		var colour = objElement.currentStyle.getAttribute(strProperty);
		if (colour && colour != "transparent") {
			colour = this.getHexColourFromGeneralColourInIE(colour);
			colour = colour.replace("#", "0x");
			var r = (colour & 0xff0000) >> 16;
			var g = (colour & 0x00ff00) >> 8;
			var b = colour & 0x0000ff ;
			arColour = [r, g, b];
		} else {
			try	{
				arColour = this.getColourParts(objElement.parentNode, strProperty);
			} catch (err) {
				if (strProperty == 'color') {
					arColour = [0, 0, 0];
				} else {
					arColour = [255, 255, 255];
				}
			}
		}
		return arColour;
	},
	
	getHex: function(objElement, strProperty) {
		var strColour;
		if (objElement.ownerDocument.defaultView && objElement.ownerDocument.defaultView.getComputedStyle) {
			strColour = this.getHexWithComputedStyle(objElement, strProperty);
		} else {
			strColour = this.getHexInIE(objElement, strProperty);
		}
		return strColour;
	},
	
	getHexWithComputedStyle: function(objElement, strProperty) {
		var objStyle = objElement.ownerDocument.defaultView.getComputedStyle(objElement, null);
		var objColour = objStyle.getPropertyCSSValue(strProperty);
		var strColour;
	
		if (objColour && objColour.primitiveType == CSSPrimitiveValue.CSS_RGBCOLOR)	{
			objRGB = objColour.getRGBColorValue();
	
			var strRed = objRGB.red.getFloatValue(CSSPrimitiveValue.CSS_NUMBER).toString(16);
			var strGreen = objRGB.green.getFloatValue(CSSPrimitiveValue.CSS_NUMBER).toString(16);
			var strBlue = objRGB.blue.getFloatValue(CSSPrimitiveValue.CSS_NUMBER).toString(16);
	
			if (strRed.length == 1) strRed = '0' + strRed;
			if (strGreen.length == 1) strGreen = '0' + strGreen;
			if (strBlue.length == 1) strBlue = '0' + strBlue;
	
			strColour = '#' + strRed + strGreen + strBlue;
		} else {
			try	{
				strColour = this.getHexWithComputedStyle(objElement.parentNode, strProperty);
			} catch (err) {
				if (strProperty == 'color') strColour = '#000000'; else strColour = '#ffffff';
			}
		}
		return strColour;
	},
	
	getHexInIE: function(objElement, strProperty) {
		var strColour;
		
		strProperty = this.convertStyleToPropertyInIE(strProperty);
		var colour = objElement.currentStyle.getAttribute(strProperty);
		if (colour && colour != "transparent") {
			strColour = this.getHexColourFromGeneralColourInIE(colour);
		} else {
			try	{
				strColour = this.getHexInIE(objElement.parentNode, strProperty);
			} catch (err) {
				if (strProperty == 'color') strColour = '#000000'; else strColour = '#ffffff';
			}
		}
		return strColour;
	},
	
	// This function only works in IE.
	// Other browser ought to have different ways to get the color value anyway
	getHexColourFromGeneralColourInIE: function(colour) {
		var tempNode = document.createElement("table");
		tempNode.bgColor = colour;
		return tempNode.bgColor;
	},
	
	getLuminosity: function(objForeColour, objBackColour) {
		var fFore, fBack, fL1, fL2, fDifference, strResult;
		var fPlaces = Math.pow(10, 2);
	
		fFore = this.calculateLuminosity(objForeColour.red, objForeColour.green, objForeColour.blue, 255);
		fBack = this.calculateLuminosity(objBackColour.red, objBackColour.green, objBackColour.blue, 255);
	
		if (fFore > fBack) {
			fL1 = fFore;
			fL2 = fBack;
		} else {
			fL1 = fBack;
			fL2 = fFore;
		}
	
		fDifference = (fL1 + 0.05) / (fL2 + 0.05);
	
		fDifference = Math.round(fDifference * fPlaces) / fPlaces;

		return fDifference;
	},
	
	calculateLuminosity: function(fRed, fGreen, fBlue, fFullScale) {
		var fRedRGB = fRed / fFullScale;
		var fGreenRGB = fGreen / fFullScale;
		var fBlueRGB = fBlue / fFullScale;
		var fLinearisedRed, fLinearisedGreen, fLinearisedBlue;
	
		if (fRedRGB <= 0.03928) fLinearisedRed = fRedRGB / 12.92;
		else fLinearisedRed = Math.pow(((fRedRGB + 0.055)/1.055), 2.4);
	
		if (fGreenRGB <= 0.03928) fLinearisedGreen = fGreenRGB / 12.92;
		else fLinearisedGreen = Math.pow(((fGreenRGB + 0.055)/1.055), 2.4);
	
		if (fBlueRGB <= 0.03928) fLinearisedBlue = fBlueRGB / 12.92;
		else fLinearisedBlue = Math.pow(((fBlueRGB + 0.055)/1.055), 2.4);
	
		return (0.2126 * fLinearisedRed + 0.7152 * fLinearisedGreen + 0.0722 * fLinearisedBlue);
	},
	
	// TY right now this only converts the background-color property, since that
	// is the only property used in this code that needs conversion.
	convertStyleToPropertyInIE: function(styleName) {
		switch(styleName) {
		case "background-color": return "backgroundColor";
		default: return styleName;
		}
	}
};
