if (typeof OpenAjax.a11y.util == "undefined") {
	OpenAjax.a11y.util = {

			canNodeHaveAlt : function (node) {
				var name = node.tagName.toLowerCase();
				return name == "img" || name == "area" || name == "applet" || (name == "input" && node.type == "image");
			},
	
			/*
			 * get all of the text content of this and descendent nodes including
			 * the text of any alt or title attributes
			 * 
			 * @param node from which text is desired
			 * @return all textual content of the node and its descendents
			 */
			getNodeTextRecursively : function(node) {
				var text = "";
				for(var i = 0; i < node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					var name = childNode.nodeName.toLowerCase();
					if(name == "#text") {
						text += childNode.nodeValue + "";
					} else if(name == "img" ||  name == "applet" ||
						name == "embed" || name == "area") {
							text += childNode.getAttribute("alt") + " ";
					} else if(name == "object"){
						text += this.getNodeTextRecursively(childNode) + " ";
					} else if(name == "br") {
						text += " ";
					} else if(childNode.hasChildNodes()) {
						text += this.getNodeTextRecursively(childNode) + "";
					} else if(name == "input") { // 11/7/07 SMF otherwise no text is found for checkbox w/o text
						text += childNode.title.normalizeSpacing();
					}
				}
				return text.normalizeSpacing();
			},

			/*
			 * gets all of the alt text of the children of the given node
			 */
			getDisplayableAlt : function(node) { // 02/08/10 PKB modified getDisplayableAlt to be parallel with getNodeTextRecursively
				var text = "";
				for(var i = 0; i < node.childNodes.length; i++) {
					var childNode = node.childNodes[i];
					var name = childNode.nodeName.toLowerCase();
					if(name == "img" ||  name == "applet" ||
						name == "embed" || name == "area") {
						text += childNode.getAttribute("alt") + " ";
					} else if(childNode.hasChildNodes()) {
						text += this.getDisplayableAlt(childNode) + "";
					} 
				}
				return text.normalizeSpacing();
			},
				
			/*
			 * get the attribute values from the given node. The
			 * first attribute which is present and has a nonempty value is returned. If all of the specified
			 * attributes are either absent or have an empty value (""), then the
			 * default value is returned.
			 * 
			 *  @param node from which attributes are desired
			 *  @param array of attributes to lok for
			 *  @param default value if none of the specified attributes are present
			 *  @return first nonempty attribute value or the default value
			 */
			getValueFromAttributes : function(node,attributeArray,defaultValue) {
				var result = null;   
				for (var i=0; !result && i < attributeArray.length; i++) {
				      if (node.hasAttribute && node.hasAttribute(attributeArray[i])) {
				         var value = node.getAttribute(attributeArray[i]);
				         result = value.normalizeSpacing();
				      }
				   }
				   return result || defaultValue;
				},
				
				defaultNSResolver: function(prefix) {
				    var uri;
					switch (prefix) {
				      case 'html':
				         uri = 'http://www.w3.org/1999/xhtml';
				      case 'x2':
				         uri = 'http://www.w3.org/TR/xhtml2';
				      case 'x':
				         uri = 'http://www.w3.org/1999/xhtml';
				      case 'xhtml':
				         uri = 'http://www.w3.org/1999/xhtml';
				      default:
				         uri = null;
				   }
				   return uri;
				},
				
				getNodeDocPosition: function(node) {
					if (node != null) {
					   var r = new Object();
					   r.x = node.offsetLeft;
					   r.y = node.offsetTop;
					   r.width = node.offsetWidth;
					   r.height = node.offsetHeight;
					   var thisNode = node;
					   while (thisNode.offsetParent &&
					      (thisNode.offsetParent != node.ownerDocument)) {
					      thisNode = thisNode.offsetParent;
					      r.x += thisNode.offsetLeft;
					      r.y += thisNode.offsetTop;
					   }
					   return r;
					}
					return null;
				},

				
				/*
				 * form utilities
				 */
				FindLabelNodeForId: function(id,doc) {
					var a_labels = doc.getElementsByTagName("label");
					var i;
					for(i = 0; i < a_labels.length; i ++) {
						var m_node = a_labels[i];
						if(m_node.getAttribute) {
							var label = m_node.getAttribute("for");
							if(label == id) return m_node;
						}
					}
					return null;
				},
				
				parseLabelFromButton : function (buttonNode) {
					var aLabel = "",fromSrc = "";
					for (i = 0; i < buttonNode.childNodes.length && aLabel.length == 0; i++){
						var myName = buttonNode.childNodes[i].nodeName;
						if (buttonNode.childNodes[i].nodeName.toLowerCase()== '#text')	{ //3/4/08 SMF Use content first
							if (buttonNode.childNodes[i].textContent) { 
								aLabel += buttonNode.childNodes[i].textContent.normalizeSpacing();
								if (aLabel.length > 0) {fromSrc = "forms.source.content";aLabel += ' '}
							}	
						}
						if (buttonNode.childNodes[i].nodeName.toLowerCase()== 'img')	{
							aLabel += buttonNode.childNodes[i].getAttribute('alt').normalizeSpacing();
							if (aLabel.length > 0) {if (fromSrc == "") {fromSrc = "forms.source.alt";} aLabel += ' '}
						}
					}
					var retStruct = { label: aLabel, source: fromSrc};
					if (aLabel == "") retStruct.label = null;
					return retStruct;	       
				},
				
				parseLabel : function (node) {				
					const nsIAccessibleRetrieval = Components.interfaces.nsIAccessibleRetrieval;
					function getTextAssocWithIDsAT(node, field) {
						try {
							var accService = Components.classes["@mozilla.org/accessibleRetrieval;1"].getService(nsIAccessibleRetrieval);
							var accObject = accService.getAccessibleFor(node);
							if (accObject == null) return '*accessibleRetrieval failed'
							return accObject[field];
						} catch (exc) {
							FBTrace.sysout(exc);
						}
					}

					var retStruct = { label: null, source: null};
					var emptytitle = false;
		    		var type = '', title= '';
		    		if (node.hasAttribute("aria-label")) { /* SMF which should take precedence aria-label or aria-labelledby? */ 
		    			var aria = node.getAttribute('aria-label').normalizeSpacing();
						if (aria.length > 0) { retStruct.label = aria;  retStruct.source = "forms.source.arialabel"; return retStruct; }
		    		}
		    		if (node.hasAttribute("aria-labelledby")) { 
		    			var aria = node.getAttribute('aria-labelledby').normalizeSpacing();
						if (aria.length > 0) { 
							var text = getTextAssocWithIDsAT(node, 'name');
							retStruct.label = text;  
							retStruct.source = "forms.source.labelledby"; 
							return retStruct; 
						}
		    		}
		    		
					var tagName = node.tagName.toLowerCase();
					if (node.type) type = node.type.toLowerCase();
					if (node.hasAttribute("title")) title = node.getAttribute('title').normalizeSpacing();
					if (tagName == 'input' || tagName.indexOf('select') >= 0 || tagName == 'textarea' || tagName == 'button') {
						if (node.hasAttribute('title') && title.length == 0) { emptytitle = true; retStruct.source ="forms.source.title";}
					}
					if (tagName == 'button') {
						retStruct = this.parseLabelFromButton(node);
						if (retStruct.label != null) return retStruct;
					}
					if (tagName == 'input' && type == 'image') { // input <type=image>
						if (emptytitle) return null;
						if (node.hasAttribute('title')) { retStruct.label = title;  retStruct.source = "forms.source.title"; return retStruct; }
						if (node.hasAttribute('alt')) { 
							var alt = node.getAttribute('alt').normalizeSpacing(); 
							if (alt.length > 0) { retStruct.label = alt;  retStruct.source = "forms.source.alt"; return retStruct; }
						}
						return retStruct;
					}
					if (tagName == 'input' && (type == 'submit' || type == 'reset' || type == 'button')) {
						if (emptytitle) return null;
						if (node.hasAttribute('title')) { retStruct.label = title;  retStruct.source = "forms.source.title"; return retStruct; }
						if (node.hasAttribute('value')) { 
							var value = node.getAttribute('value').normalizeSpacing(); 
							if (value.length > 0) { retStruct.label = value;  retStruct.source = "forms.source.value"; return retStruct; }
						}
						return retStruct;
					}
					
					if (node.id) {
						var labelNode = this.FindLabelNodeForId(node.id,node.ownerDocument);
						if (labelNode) {
							retStruct.label = this.getNodeTextRecursively(labelNode);
							retStruct.source = "forms.source.label";
							return retStruct;
						}
					}
					if ((tagName.indexOf('select') >= 0 || tagName == 'textarea')) {
						if (node.hasAttribute('title')) { retStruct.label = title;  retStruct.source = "forms.source.title"; return retStruct; }
					}
					if (tagName == 'input' && (type == 'text' || type == 'file' || type == 'password' || type == 'checkbox'|| type == 'radio')) { 
						if (node.hasAttribute('title')) { retStruct.label = title;  retStruct.source = "forms.source.title"; return retStruct; }
					}
					return retStruct;
					
				},
				
				getFieldSetNodeLegendForElement: function(element) {
					var temp = element;
					while (temp != null && temp.tagName && temp.tagName.toLowerCase() != 'fieldset') temp = temp.parentNode;
					if (temp != null && temp.tagName && temp.tagName.toLowerCase() == 'fieldset') {
						for (var i = 0; i < temp.childNodes.length; i++) {
							if (temp.childNodes[i].tagName &&
									temp.childNodes[i].tagName.toLowerCase() == 'legend') {
								return temp.childNodes[i].textContent;
							}
						}
					}
					return null;
				},
				
				/*
				 * table utilities
				 */
				addToArray: function (id, idarray){ //return true id unique item added otherwise returns false
            		var k=0;
            		while(k < idarray.length && idarray[k] != id) {k++;}
            		if (k >= idarray.length) {idarray[idarray.length] = id; return true;} 
            		return false;
            	},	
				
            	dataTable: function (doc, notused){
            		var retArray = new Array();
               		var tableEleArr = OpenAjax.a11y.getCollectionViaDom('table', doc);
            		for (var i =0; i < tableEleArr.length; i++ ) {
            		   if (this.isDataTable(tableEleArr[i])) retArray.push(tableEleArr[i]);
            		}
            		return retArray;
            	}, 
            	
            	complexDataTable: function (doc, notused){
            		var retArray = new Array();
               		var tableEleArr = OpenAjax.a11y.getCollectionViaDom('table', doc);
            		for (var i =0; i < tableEleArr.length; i++ ) {
            		   if (this.isComplexDataTable(tableEleArr[i])) retArray.push(tableEleArr[i]);
            		}
            		return retArray;
            	}, 
            	
				isDataTable: function(tablenode) {
 					   var r, c;
					   if(tablenode.rows.length<2) return false;
					   if(tablenode.rows[0].cells.length>=2 || tablenode.rows[tablenode.rows.length-1].cells.length>=2) {
					      if (tablenode.tHead) return true; //has tHead row(s)
						  if (tablenode.caption && tablenode.caption.textContent.normalizeSpacing() != 0) return true;
						  if (tablenode.summary && tablenode.summary.normalizeSpacing() != 0) return true;
					   } 
					   for (r=0; r < tablenode.rows.length; r++) { //contains data from tablenode.tHead.rows &  tablenode.tFoot.rows
					      if(tablenode.rows[r].cells.length>=2 || tablenode.rows[tablenode.rows.length-1].cells.length>=2) {
							  for (c=0; c < tablenode.rows[r].cells.length; c++) {
						         if (tablenode.rows[r].cells[c].tagName.toLowerCase() == 'th') {
						            return true;
						         }else { // assume these are 'td' cells
								 	var headers = this.getValueFromAttributes(tablenode.rows[r].cells[c],['headers'],"");
								 	if (headers.length > 0) return true;
								 	if (this.getValueFromAttributes(tablenode.rows[r].cells[c],['scope'],"") != "") return true;
								 }
						      }
						  }
					   }
					   return false;
				},
				
				isComplexDataTable: function(node) {
						var r,c;
						var allTH = 0;
					    if (node.tHead && node.tHead.rows.length > 1) return true; //more than one row in a thead element 
						for (r=0; r < node.rows.length; r++) { 
							var foundTD = false;
							var thCount = 0;				
							for (c=0; c < node.rows[r].cells.length; c++) {
								if (node.rows[r].cells[c].tagName.toLowerCase() == 'th') thCount++;
								var span = this.getValueFromAttributes(node.rows[r].cells[c],['rowspan'],"");
								if (span != "" && span.isInteger() && span > 1) {return true;}
								span = this.getValueFromAttributes(node.rows[r].cells[c],['colspan'],"");
								if (span != "" && span.isInteger() && span > 1) {return true;}				
								if (node.rows[r].cells[c].tagName.toLowerCase() == 'td') {
									foundTD = true;
									var headersStr = this.getValueFromAttributes(node.rows[r].cells[c],['headers'],"");
									if (headersStr.length > 1) {
										var headers = headersStr.split(' ');
										if (headers.length > 2) {return true;}
									}
								}
							}
							if (thCount == node.rows[r].cells.length) {allTH++;}
							else if (foundTD && thCount > 1){return true;} //there is more than one th element in a row that also includes td elements
							if (allTH >= 2) {return true;} // there are two or more rows that contain only th elements in the table. 
						}
						return false;
				},
				
				/*
				 * Event utilities
				 */
/*				ParseDocumentForEvents: function(node, loadArray) {		
					var i;
					var found = false;
					var eventNames = new Array();
					var listener = Components.classes["@mozilla.org/eventlistenerservice;1"];
					if (listener != null && listener != undefined && node.tagName) {
						var els = listener.createInstance(Components.interfaces.nsIEventListenerService); 
			    		var infos = els.getListenerInfoFor(node, {});
					
						for (i = 0; i < infos.length; ++i) {
							var info = infos[i].QueryInterface(Components.interfaces.nsIEventListenerInfo);
							for (j = 0; j < _events.length; j ++) if (info.type == _events[j]) eventNames.push(_events[j]);
						}
						if (eventNames.length > 0) loadArray[loadArray.length] = new eventObject(loadArray.length + 1, node, eventNames);
					} else {  // does not pick up dynamically added events
						if(node.getAttribute) {
							for (i = 0; i < _events.length && !found; i ++) {
								if (node.hasAttribute('on' + _events[i])) {
									for(j in _events) 	{
										var e ='on' + _events[j];
										if (node.hasAttribute(e)) {
											var attrValue = cleanSpaces(GetValueFromAttributes(node,[e],""));
											if (attrValue != '') eventNames.push(e);
										}
									}
									found = true;
									loadArray[loadArray.length] = new eventObject(loadArray.length + 1, node, eventNames);
								}
							}
						}
					}
							
					if(node.childNodes) {
						for(var i = 0; i < node.childNodes.length; i ++)
							ParseDocumentForEvents(node.childNodes[i], loadArray);
					}
				}
*/				
			
				
	}
}
