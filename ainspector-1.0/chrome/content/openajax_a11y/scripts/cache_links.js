/**
 * Copyright 2011 OpenAjax Alliance
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

/* ---------------------------------------------------------------- */
/*                            LinkCache                            */
/* ---------------------------------------------------------------- */


/**
 * LinkCache
 *
 * @desc Constructor for LinkCache object which contains a list of 
 *    LinkElements representing the accessibility information of
 *    links in a document
 *
 * @constructs
 *
 * @return  LinkCache object 
 */

OpenAjax.a11y.cache.LinksCache = function (dom_cache) {

  this.dom_cache = dom_cache;
  this.area_elements = [];
  this.link_elements = [];
  this.links_sorted_by_href = [];
  this.links_sorted_by_name = [];
  this.duplicate_names = [];
  this.duplicate_hrefs = [];
  this.sort_property = 'document_order';
  this.sort_ascending = true;
  this.up_to_date = false;
  this.length = 0;

  return this;

}; 

/**
 * checkForDuplicateNAME
 *
 * @desc Checks for duplicatelink name
 *
 * @param link_element Object  link_element object to check 
 *
 * @return none
 */

OpenAjax.a11y.cache.LinksCache.prototype.checkForDuplicateName = function (link_element) {

  if (!link_element.name_for_comparison || link_element.name_for_comparison.length === 0) return;

  var i;
  var j;
  var count;
  var index_bottom;
  var index_top;

  var le;
  var dn;

  var links_sorted_by_name     = this.links_sorted_by_name;
  var links_sorted_by_name_len = links_sorted_by_name.length;

  if (links_sorted_by_name_len === 0) {
    this.links_sorted_by_name.push(link_element);
    return;
  }
  
  index_bottom = 0;
  index_top = links_sorted_by_name_len - 1;
  j = Math.round(index_top / 2);
  count = links_sorted_by_name_len;

  while (count > 0) {
    le = links_sorted_by_name[j];
    
    if (link_element.name_for_comparison === le.name_for_comparison) {
      break;
    }
    else {
      count = count / 2;
      if (link_element.href < le.href) {
        index_top = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }      
    }
  }  

  le = links_sorted_by_name[j];
    
  if (link_element.name_for_comparison === le.name_for_comparison) {
  
    dn = this.getDuplicateNameByName(link_element.name_for_comparison);

    if (dn) {
      dn.addLinkElement(link_element);
    }
    else {
      // Add duplciate HREF object
      dn = new OpenAjax.a11y.cache.DuplicateName(link_element.name, link_element.name_for_comparison);
      dn.addLinkElement(links_sorted_by_name[j]);
      dn.addLinkElement(link_element);
      this.duplicate_names.push(dn);
    }  
  }
  else {
    if (link_element.name_for_comparison < le.name_for_comparison) {
      this.links_sorted_by_name.splice(j,0,link_element);
    }
    else {
      this.links_sorted_by_name.splice(j+1,0,link_element);
    }
  }
  
  return;

};

/**
 * checkForDuplicateHREF
 *
 * @desc Checks for duplicate link href
 *
 * @param link_element Object  link_element object to check 
 *
 * @return none
 */

OpenAjax.a11y.cache.LinksCache.prototype.checkForDuplicateHREF = function (link_element) {

  if (!link_element.href || link_element.href.length === 0) return;

  var i;
  var j;
  var count;
  var index_bottom;
  var index_top;
  
  var le;
  var dh;

  var link_elements     = this.link_elements;
  var link_elements_len = link_elements.length;

  // check duplicate name list first
  
  var duplicate_hrefs     = this.duplicate_hrefs;
  var duplicate_hrefs_len = duplicate_hrefs.length;

  for (i = 0; i < duplicate_hrefs_len; i++) {
    dh = duplicate_hrefs[i];
    
    if (link_element.href.length && 
        link_element.href == dh.href) {
        dh.addLinkElement(link_element);
        return;
    } 
  
  } // end loop

  var links_sorted_by_href     = this.links_sorted_by_href;
  var links_sorted_by_href_len = links_sorted_by_href.length;

  if (links_sorted_by_href_len === 0) {
    this.links_sorted_by_href.push(link_element);
    return;
  }

  index_bottom = 0;
  index_top = links_sorted_by_href_len-1;
  j = Math.floor(index_top/2);
  count = links_sorted_by_href_len;

  while (count > 0) {
  
    le = links_sorted_by_href[j];

    if (link_element.href === le.href) {
      break;
    }
    else {
      count = Math.floor(count / 2);
      if (link_element.href < le.href) {
        index_top = j;
        j = Math.floor((index_top + index_bottom)/2);
      }
      else {
        index_bottom = j;
        j = Math.round((index_top + index_bottom)/2);    
      }
    }
  }

  le = links_sorted_by_href[j];
    
  if (link_element.href === le.href) {
  
    dh = this.getDuplicateHREFByHREF(link_element.href);
    
    if (dh) {
      dh.addLinkElement(link_element);
    }
    else {
      // Add duplciate HREF object
      dh = new OpenAjax.a11y.cache.DuplicateHREF(link_element.href);
      dh.addLinkElement(links_sorted_by_href[j]);
      dh.addLinkElement(link_element);
      this.duplicate_hrefs.push(dh);
    }  
  }
  else {
    if (link_element.href < le.href) {
      this.links_sorted_by_href.splice(j, 0, link_element);
    }
    else {
      this.links_sorted_by_href.splice((j+1), 0, link_element);
    }
  }
  return;

};

/**
 * getDuplicateHREFByHREF
 *
 * @desc get DuplicateHREF by the href value
 *
 * @param href String href to be found
 *
 * @return DuplicateHREF Object | null 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateHREFByHREF = function (href) {

  var i;
  var dh;
  
  var duplicate_hrefs     = this.duplicate_hrefs;
  var duplicate_hrefs_len = duplicate_hrefs.length;

  if (href) {
    for (i = 0; i < duplicate_hrefs_len; i++) {
      dh = duplicate_hrefs[i];
      if (dh.href === href) return dh;
    } // end loop
  } 

  return null;

};

/**
 * getDuplicateNameByName
 *
 * @desc get DuplicateName by the name 
 *
 * @param name String href to be found
 *
 * @return DuplicateName Object | null 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getDuplicateNameByName = function (name) {

  var i;
  var dn;
  
  var duplicate_names     = this.duplicate_names;
  var duplicate_names_len = duplicate_names.length;

  if (name) {
    for (i = 0; i < duplicate_names_len; i++) {
      dh = duplicate_names[i];
      if (dh.name_for_comparison === name) return dh;
    } // end loop
  } 

  return null;

};


/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to a LinkCache object
 *
 * @param link_element Object  link_element object to add to the link cache
 *
 * @return length  Number  length is the number of elements in the cache
 */

OpenAjax.a11y.cache.LinksCache.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.checkForDuplicateHREF(link_element);
    this.checkForDuplicateName(link_element);

    this.length = this.length + 1;
    link_element.cache_id = "link_" + this.length; 
    link_element.document_order = this.length;
    this.link_elements.push(link_element);
    
    if (link_element.dom_element.tag_name === 'area') {
      this.area_elements.push(link_element);
    }
  } 
  
  return this.length;
};

/**
 * getLinkElementByCacheId
 *
 * @desc Returns the LinkElement object with the cache id
 *
 * @param cache_id String  cache id of the LinkElement object
 *
 * @return LinkElement object if found, or null if not found 
 */

OpenAjax.a11y.cache.LinksCache.prototype.getLinkElementByCacheId = function (cache_id) {

  var i;

  var link_elements_len = this.link_elements.length;

  if (cache_id && cache_id.length) {  
   for (i=0; i < link_elements_len; i++) {
     if (this.link_elements[i].cache_id == cache_id) {
       return this.link_elements[i];
     }
   } // end loop
 } 

 return null;
};

/**
 * emptyCache
 *
 * @desc Empties the linkCache of LinkElement objects 
 *
 * @return none
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.emptyCache = function () {

  this.link_elements = [];
  this.length = 0;
  this.sort_property = 'document_order';
  this.up_to_date = false;

};

/**
 * updateCacheItems
 *
 * @desc Updates the LinkCache object by checking to see if a DOMElement
 *    object should be added to this cache
 *  
 * @param dom_element Object DOMElement object to check fo inclusion in cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCacheItems = function (dom_element) {

  var link_element;

  if ((dom_element.tag_name == 'a') ||
      (dom_element.tag_name == 'area')) {

    link_element = new OpenAjax.a11y.cache.LinkElement(dom_element);    
    this.dom_cache.links_cache.addLinkElement(link_element);
  }
   
};

/**
 * transverseDOMElementsForLinkElements
 *
 * @desc Traverses the DOMElements to update link elements
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.transverseDOMElementsForLinkElements = function (dom_element) {
 
  var i;

  if (!dom_element) return;

  if (dom_element.type == NODE_TYPE.ELEMENT) {

    this.updateCacheItems(dom_element);
  
    for (i = 0; i < dom_element.children.length; i++) {
      this.transverseDOMElementsForLinkElements(dom_element.children[i]);
    } // end loop
  }  
  
}; 


/**
 * updateCache
 *
 * @desc Traverses the DOMElements to update the color contrast cache
 *
 * @return nothing
 */
 
OpenAjax.a11y.cache.LinksCache.prototype.updateCache = function () {

  var i;
  var children = this.dom_cache.element_cache.children;
  var children_len = children.length;
 
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_START, "Updating link elements cache.");
  for (i=0; i < children_len; i++) {
    this.transverseDOMElementsForLinkElements(children[i]);
  }  
  this.dom_cache.log.update(OpenAjax.a11y.PROGRESS.CACHE_END, "Completed link elements cache update, number of cache items is " + this.length);

  this.up_to_date = true;
 
};


/**
 * sortLinkElements
 *
 * @desc 
 *
 * @param property  String  property used to sort the cache
 * @param ascending  Boolean true if sort in ascending order; false in descending order
 *
 * @return true if list was sorted, false if not
 */

OpenAjax.a11y.cache.LinksCache.prototype.sortLinkElements = function(property, ascending ) {

  var swapped = false;
  var temp = null;
  var i;

  if (this.link_elements && this.link_elements.length && !this.link_elements[0][property]) {
    return false;
  } // endif

  var link_elements_len = this.link_elements.length;

  if( ascending ) {
    do{
      swapped = false;
      for (i=1; i < link_elements_len; i++) {
        if (this.link_elements[i-1][property] > this.link_elements[i][property]) {
          // swap the values
          temp = this.link_elements[i-1];
          this.link_elements[i-1] = this.link_elements[i];
          this.link_elements[i] = temp;
          swapped = true;
        } 
      } // end loop
    } while (swapped);
  }
  else {
    do {
      swapped = false;
      for (i=1; i<link_elements_len; i++) {
        if (this.link_elements[i-1][property] < this.link_elements[i][property]) {
        // swap the values
        temp = this.link_elements[i-1];
        this.link_elements[i-1] = this.link_elements[i];
     this.link_elements[i] = temp;
     swapped = true;
    } 
   } // end loop
  } while (swapped);
 } 

 this.sort_property = property;
 this.sort_ascending = ascending;

 return true;

};


/**
 * LinkElement
 *
 * @desc LinkElement is the object used to hold data about a link and references the DOMElement base object
 *
 * @constructs
 *
 * @param  dom_element     Object  dom_element object provides information about current dom node 
 *
 * @return  LinkElement | null
 */

OpenAjax.a11y.cache.LinkElement = function (dom_element) {

  var ano;
  var href = dom_element.node.href;

  function testIfHrefIsURL(url) {
  
    if (typeof href != 'string') return false;
  
    if (href.indexOf('http://') >= 0) return true;
    else
      if (href.indexOf('https://') >= 0) return true;
      else
        if (href.indexOf('ftp://') >= 0) return true;
        else
          if (href.indexOf('ftps://') >= 0) return true;
          else 
            if (href.indexOf('file://') >= 0) return true;
 
    return false;
  }

  if (!dom_element.node) {
    return null;
  } // endif   

  this.document_order = 0;
 
  this.dom_element = dom_element;

  this.href  = href;
  this.is_url = testIfHrefIsURL(href);
 
  this.tab_index = dom_element.node.tabIndex;
  this.name   = dom_element.node.getAttribute("name");
  this.target  = dom_element.node.getAttribute("target");

  ano = OpenAjax.a11y.cache.util.getNameFromChildrenObject(dom_element);
  
  this.name          = ano.name;
  this.name_for_comparison  = ano.name.toLowerCase();
  this.name_from_text_nodes  = ano.name_from_text_nodes;
  this.name_from_image_alt  = ano.name_from_image_alt;
  this.image_count      = ano.image_count;
  this.text_only_from_image  = (ano.name_from_text_nodes.length === 0) && (ano.name_from_image_alt.length > 0);
  
  this.height   = parseInt(dom_element.node.offsetHeight, 10);
  this.width   = parseInt(dom_element.node.offsetWidth, 10);
   
  // If the link is an image, use the image height and width
  if ((this.height === 0) && 
      (this.width === 0) && 
      (ano.height) > 0 && 
      (ano.width > 0 )) {
    this.height = ano.height;
    this.width = ano.width;
  } // endif

  return this;
   
};

/**
 * DuplicateName
 *
 * @desc 
 *
 * @constructs
 *
 * @param  name                String 
 *         name_for_comparison String
 *
 * @return  DuplicateName Object | null
 */

OpenAjax.a11y.cache.DuplicateName = function (name, name_for_comparison) {

  this.name                = name;
  this.name_for_comparison = name_for_comparison;
  this.link_elements = [];

};

/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to DuplicateName Object
 *
 * @param link_element Object  link_element object to add 
 *
 * @return length  Number  length is the number of elements with the duplicate name
 */

OpenAjax.a11y.cache.DuplicateName.prototype.addLinkElement = function (link_element) {

  // item must exist and have the position property
  if (link_element) {
    this.link_elements.push( link_element );
  } 

  return this.link_elements.length;

};

/**
 * DuplicateHREF
 *
 * @desc 
 *
 * @constructs
 *
 * @param  href   String 
 *
 * @return  DuplicateLink Object | null
 */

OpenAjax.a11y.cache.DuplicateHREF = function (href) {

  this.href = href;
  this.link_elements = [];

};

/**
 * addLinkElement
 *
 * @desc Adds a LinkElement object to DuplicateHREF Object
 *
 * @param link_element Object  link_element object to add
 *
 * @return length  Number  length is the number of elements with the duplicate href
 */

OpenAjax.a11y.cache.DuplicateHREF.prototype.addLinkElement = function (link_element) {

  // item must exist 
  if (link_element) {
    this.link_elements.push( link_element ); 
  } 

  return this.link_elements.length;

};
    

