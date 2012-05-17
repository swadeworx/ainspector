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

var EXPORTED_SYMBOLS = ["highlightModule"];

var console = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);

var highlightModule = {
  
  last_highlighted_nodes: [],
  
  /**
   * @function highlightObject
   *
   * @memeberOf OAA.highlightModule
   *
   * @desc highlights set of nodes selected on a webpage
   *
   * @param {Array} items - one or more nodes to highlight
   * 
   * @param {Object} document
   */
  highlightNodes : function (items, document) {
	
	var node;
	var no_of_items = items.length;
	var style;
	var tag_name;

	if (this.last_highlighted_nodes.length > 0) {
	
	  this.unHighlightNodes(this.last_highlighted_nodes, document); 
	}
	
	for (var i = 0; i < items.length; i++) {
	  var item = items[i];
	  
	  if (item.dom_element) {
		
		if (item.dom_element.image_only) {
	      node = item.dom_element.node.getElementsByTagName("img")[0];
	    }
	    else {
	      node = item.dom_element.node;
	    }
		style = item.dom_element.computed_style;
		tag_name = item.dom_element.tag_name;
	  }
	  else {
  
	    if (item.type == 1) { //if node type is element
	      node = item.node;
	    }
	    else {
	      if (item.parent_element) node = item.parent_element.node;
	    }
	    style = item.computed_style;
	    tag_name = item.parent_element.tag_name;
	  }

	  if (node) {

//		check if the node is off screen or hidden from assistive technologies
		console.logStringMessage("style.visibility;" + style.visibility);
		console.logStringMessage("style.display;" + style.display);

		if (style.visibility == "hidden" || style.display == "none") {
		  this.isVisibletoAT(document, tag_name);
		} else {
		  node.style.outline = "medium solid red";

 	      // If true, element is aligned with top of scroll area.
	      // If false, it is aligned with bottom.
	      node.scrollIntoView(true);

	      this.last_highlighted_nodes.push(node);
		}
	  }
	} //end for
  },
  
  /**
   * @function unHighlightNodes
   * 
   * @desc unhighlights the nodes that are highlighted earlier and 
   * removes the informational message added to a page if the 
   * element is hidden from Assistive technlogies
   *
   * @param {Array} nodes - one or more nodes to unhighlight
   * @param {Object} document - document
   */
  unHighlightNodes : function(nodes, document) {
  
    if (!nodes) return;
	
	var length = nodes.length;
	
	var obj = document.getElementById("vId");
	if (obj)  document.body.removeChild(obj);

	for (var i = 0; i < length; i++) {
	  nodes[i].style.outline = ""; 
	}
  },
  
  /**
   * @function isVisibletoAT
   * 
   * @desc Position a div on the left side of the view port 
   * 
   * @param {Object} node
   */
  isVisibletoAT : function (document, element) {
	  
	var new_div_element = document.createElement('div');
	var style_div = 'width:220px; padding:10px; border:3px solid blue; margin:0px; color:red; font-size:20px; position:fixed; ';

	new_div_element.id = 'vId';
	new_div_element.setAttribute("style", style_div);
	new_div_element.innerHTML = element + ' is OffScreen ';
     
	document.body.insertBefore(new_div_element,document.body.childNodes[0]);	  
  }
};
