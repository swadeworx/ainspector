/**
 *  AINSPECTOR.view
 */

AINSPECTOR.view = function(panel, yscontext) {
    this.panel_doc = panel.document;
    this.buttonViews = {};
    this.curButtonId = "";
    this.panelNode = panel.panelNode;  
    
    function hasProperties(ob)
    {
        try
        {
            for (var name in ob)
                return true;
        } catch (exc) {}
        return false;
    };

//duplicate of what is in accessext.js    
(function($){
    $.fn.canTagHaveAlt = function(E) {
      	return ($.nodeName(E, 'img') || $.nodeName(E, 'area') || $.nodeName(E, 'applet') || $.nodeName(E, 'input'));
    };
    $.fn.textWithAlt = function( text ) {
    	if (typeof text !== "object" && text != null)
    		return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));

    	var ret = "";
    	$.each(text || this, function() {
    		$.each(this.childNodes, function() {
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
   
    /* SMF addition for displaying A11y and IITAA rule sets */
	with (FBL) {
		this.msgTreeRep = domplate(Firebug.Rep,
				{
				shortTag : FirebugReps.OBJECTLINK(
					SPAN({class: "selectorTag $object|FirebugReps.Element.getVisible"},
						"&lt;",
							SPAN({class: ""}, "$object|FirebugReps.Element.getSelectorTag"),
								FOR('attr', '$object|getAllAttribs',
									TAG("$attrTag", {attr : '$attr'})	
								),
							"&gt;", SPAN({class: ""}, "$object|getDisplayableText")
				          )
				  ),
	      		  attrTag : SPAN({class: "nodeAttr editGroup"},
	      					"&nbsp;", SPAN({class: "nodeName editable"}, "$attr.nodeName"), "=&quot;",
	      					SPAN({class: "nodeValue editable"}, "$attr.nodeValue"), "&quot;"
	      		  ),
				  tag:
				    TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
				      TBODY(
				        FOR("member", "$object|memberIterator",
				          TAG("$row", {member: "$member"}))
				      )
				  ),
				  row:
				    TR({class: "treeRow", $hasChildren: "$member.hasChildren",
				       _repObject: "$member", level: "$member.level"},
				       TD({style: "padding-left: $member.indent\\px"},
				       TAG("$member.tag", {'member' :"$member", 'object' :"$member.value"})
				      )
				  ),	
	              strTag : DIV({class: "treeLabel"},"$member.name"),   
	              strTagFail : DIV({class: "treeLabel failMsgTxt"},"$member.name"),   
	              strTagWarn : DIV({class: "treeLabel warnMsgTxt"},"$member.name"),   
	              strTagSuggestion : DIV({class: "treeLabel suggestionMsgTxt"},"$member.name"),   
	              strTagPass : DIV({class: "treeLabel passMsgTxt"},"$member.name"),   
	              
	              /* not used */
				  myObjectTag : DIV({class: "treeLabel"}, "$member.name"),  
				  myLinkTag : A({class: "treeLabel", _domObj : "$member.value", onclick : "$onLinkClick"}, "$member.name"),  
                  myNumberTag : DIV({class: "treeLabel"},"$member.name", ": ", "$member.value"), 
                  
                  onLinkClick : function(event)
                  {
                    var target = event.target
                    if (target.domObj)
                    {
                      console.log('You clicked on %o!', target.domObj);
                      //console.dirxml(target.domObj);
                    }
                  },    
	              /* end of not used */

      	          getAllAttribs : function(elem) {
      				var attribDetails = [];
      				var attrib;
        	        	for (var i = 0; i < elem.attributes.length; i++) {
      	        		attrib = elem.getAttribute(elem.attributes[i].name);
      	        		if (attrib !== null) {
      	        			attribDetails.push({nodeName : elem.attributes[i].name, nodeValue : attrib});
      	        		}
      	        	}
      	        	return attribDetails;
      	          },
      	          
      	          getDisplayableText: function (node) {
      	          	var nodeText = OpenAjax.a11y.util.getNodeTextRecursively(node);
      	          	return cropMultipleLines(nodeText, 80);
      	    	//return OpenAjax.a11y.util.getNodeTextRecursively(node);
       			  },   			

				  loop:
				    FOR("member", "$members",
				      TAG("$row", {member: "$member"})),
				  
				  memberIterator: function(object)
				  {
				    return this.getMembers(object);
				  },

				  onClick: function(event)
				  {
				    if (!isLeftClick(event))
				      return;

				    var row = getAncestorByClass(event.target, "treeRow");
				    var label = getAncestorByClass(event.target, "treeLabel");
				    if (label && hasClass(row, "hasChildren"))
				      this.toggleRow(row);
				  },

				  toggleRow: function(row)
				  {
				    var level = parseInt(row.getAttribute("level"));

				    if (hasClass(row, "opened"))
				    {
				      removeClass(row, "opened");

				      var tbody = row.parentNode;
				      for (var firstRow = row.nextSibling; firstRow;
				           firstRow = row.nextSibling)
				      {
				        if (parseInt(firstRow.getAttribute("level")) <= level)
				          break;
				        tbody.removeChild(firstRow);
				      }
				    }
				    else
				    {
				      setClass(row, "opened");

				      var repObject = row.repObject;
				      if (repObject) {
				        var members = this.getMembers(repObject.value, level+1);
				        if (members)
				          this.loop.insertRows({members: members}, row);
				      }
				    }
				  },

				  getMembers: function(object, level)
				  {
				    if (!level)
				      level = 0;

				    var members = [];
				    for (var p in object)
						members.push(this.createMember(p, object[p], level));

				    return members;
				  },
				  
				  createMember: function(name, value, level)
				  {
					  var hasChildren = (typeof(value) == "object");
				      var tag
				          if (value == null)
				          value = "";
				      switch(typeof value)
				      {
				        case "object" :
					        /* Fix me: language dependent!!! */
				        	if (value.nodeType== 1) tag =this.shortTag; 
				        	else if (name.indexOf('Pass:')>=0) tag=this.strTagPass;
				            else if (name.indexOf('Warn:')>=0 || name.indexOf('Potential Violation:')>=0) tag=this.strTagWarn;
					        else if (name.indexOf('Fail:')>=0 || name.indexOf('Violation:')>=0) tag=this.strTagFail;
				            else if (name.indexOf('Check:')>=0 ||name.indexOf('Recommendation:')>=0) tag=this.strTagSuggestion;
				            else tag = this.strArray;
				        break;
				        
				        case "string" :
				        /* Fix me: language dependent!!! */
				        if (name.indexOf('Pass:')>=0) tag=this.strTagPass;
			            else if (name.indexOf('Warn:')>=0 || name.indexOf('Potential Violation:')>=0) tag=this.strTagWarn;
				        else if (name.indexOf('Fail:')>=0 || name.indexOf('Violation:')>=0) tag=this.strTagFail;
			            else if (name.indexOf('Check:')>=0 ||name.indexOf('Recommendation:')>=0) tag=this.strTagSuggestion;
			            else tag = this.strTag;
				        if (name == "innerHTML" || name == "textContent")
				          value = "...";
				            break;    
				        
				        case "Number" :
				        tag = this.myNumberTag;
				        default :
				        tag = this.strArray;
				        break;   
				      } 					  
					return {
				      name:name,
					  label: hasChildren ? "" : value,
				      value: value,
				      level: level,
				      indent: level*16,
				      hasChildren: hasChildren,
					  tag: tag
				    };
				  }
				});
	};   /* SMF end addition for displaying A11y and IITAA rule sets */
	
	

	/* SMF addition for displaying A11y and IITAA rule sets */
	with (FBL) {
		this.landmarkTreeRep = domplate(Firebug.Rep,
				{
				  tag:
				    TABLE({class: "domTable", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
				      TBODY(
				        FOR("member", "$object|memberIterator",
				          TAG("$row", {member: "$member"}))
				      )
				  ),
				  row:
				    TR({class: "treeRow", $hasChildren: "$member.hasChildren",
				       _repObject: "$member", level: "$member.level"},
				       TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px"},
				       TAG("$member.tag", {'member' :"$member", 'object': "$member.value"})
				      ),
				       TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px"},
				       TAG("$member.node|getNaturalTag", {object: "$member.node"})
				      ),
				       TD({class: "memberLabelCell"}, "$member."),
				       TD({class: "memberLabelCell"},
				    		   FOR('issue', '$member.issues',	DIV('$issue') )   
						      )

				  ),				    
	              strTag : DIV({class: "treeLabel"},"$member.name"),   

	              getNaturalTag: function(value)
	              {
	                  var rep = Firebug.getRep(value);
	                  var tag = rep.shortTag ? rep.shortTag : rep.tag;
	                  return tag;
	              },
	              
				  loop:
				    FOR("member", "$members",
				      TAG("$row", {member: "$member"})),
				  
				  memberIterator: function(object)
				  {
				    return this.getMembers(object);
				  },

				  onClick: function(event)
				  {
				    if (!isLeftClick(event))
				      return;

				    var row = getAncestorByClass(event.target, "treeRow");
				    var label = getAncestorByClass(event.target, "treeLabel");
				    if (label && hasClass(row, "hasChildren"))
				      this.toggleRow(row);
				  },

				  toggleRow: function(row)
				  {
				    var level = parseInt(row.getAttribute("level"));

				    if (hasClass(row, "opened"))
				    {
				      removeClass(row, "opened");

				      var tbody = row.parentNode;
				      for (var firstRow = row.nextSibling; firstRow;
				           firstRow = row.nextSibling)
				      {
				        if (parseInt(firstRow.getAttribute("level")) <= level)
				          break;
				        tbody.removeChild(firstRow);
				      }
				    }
				    else
				    {
				      setClass(row, "opened");

				      var repObject = row.repObject;
				      if (repObject) {
				        var members = this.getMembers(repObject.subNodes, level+1);
				        if (members)
				          this.loop.insertRows({members: members}, row);
				      }
				    }
				  },

				  getMembers: function(object, level)
				  {
				    if (!level)
				      level = 0;

				    var members = [];
				    for (var p in object) members.push(this.createMember(p, object[p], level));

				    return members;
				  },

				  createMember: function(name, value, level)
				  {
					//  FBTrace.sysout(' createMember : ', value);
					return {
				      name: value.displayName, //name,
					  label: (value.subNodes != null) ? "" : value,
				      value: (value != null) ? value :'',
				      node: (value.node) ? value.node : 'NO NAME',
				      subNodes: (value.subNodes) ? value.subNodes : 'NO subNodes',
					  issues: (value.issuesObj.msg.length > 0) ? value.issuesObj.msg : ['Pass'],
				      level: level,
				      indent: level*16,
				      hasChildren: (value.subNodes != null),
					  tag: this.strTag
				    };
				  }
				});
	};   /* SMF end addition for displaying A11y and IITAA rule sets */
	
    with (FBL) {
        this.viewRep = domplate(this, {
            toolbar : DIV({class : "nav-menu"},
                TAG("$toolbarButtons", {categories : "$categories"}),
                TAG("$rulesetList", {rulesets : "$rulesets"}),
                DIV({style : "clear: both"})
            ),
            
            toolbarButtons : UL ({class : "yui-nav focusTabList toolbarLinks", role : "tablist", onkeypress : "$onToolbarKeyPress", "aria-label" :  "Rule Categories"},
                FOR("obj", "$categories", 
                    LI({class : "$obj|getToolbarButtonClass focusTab", tabindex : "$obj|getTabIndex", role : "tab", "aria-selected" : "$obj|getSelectedState", onfocus : "$onToolbarFocus"},
                        "$obj.name"
                    )
                )
            ),
            
            rulesetList : DIV({id : "toolbar-ruleset", class : "floatLeft", role : "toolbar"},
                LABEL({"for" : "toolbar-rulesetList"}, "Rulesets "),
                TAG("$rulesetSelect", {rulesets : "$rulesets"}),
         //       A({onclick : "$onEditRulesetsClick", role : "button", href : "#"},
         //           IMG({src : "chrome://ainspector/content/ainspector/img/bn_edit.gif", alt : "edit rulesets"})
         //       ),
                BUTTON({onclick : "$onRerunRuleset", role : "button", title : "Update report"}, "Update Report"),
                BUTTON({onclick : "$onEditRulesetsClick", role : "button", title : "Configure rulesets"}, "Configure"),
                SPAN({class : "padding100", role : "separator"}),
                A({role : "button", href : "#", onclick : "$onPrintableViewClick"},
                    IMG({class : "icon", src : "chrome://ainspector/content/ainspector/img/ico_print.gif"}),
                    "Printable View"
                )
            ),
            
            rulesetSelect : SELECT({id : "toolbar-rulesetList", name : "rulesets", onchange : "$onRulesetChange"},
                FOR("ruleset", "$rulesets", 
                    OPTION({id: "$ruleset.id", "$ruleset.selected" : "" }, "$ruleset.id") /* SMF TODO $ruleset.selected is never examined thus a ruleset is never selected */
                )
            ),
            
            selectTab : function(elem) {
                
                if (!elem)
                    return;
                var category = getClassValue(elem, "ruleCategory");
                if (category) {
                    var tabList = getAncestorByClass(elem, "focusTabList");
                    if (tabList) {
                        var oldTab = getElementByClass(tabList, "selected");
                        if (oldTab) {
                            oldTab.setAttribute("aria-selected", "false");
                            oldTab.setAttribute("aria-expanded", "false");
                            oldTab.setAttribute("tabindex", "-1")
                            removeClass(oldTab, "selected");
                        }
                    }
                    
                    elem.setAttribute("aria-selected", "true");
                    elem.setAttribute("aria-expanded", "true");
                    elem.setAttribute("tabindex", "0")
                    setClass(elem, "selected");
                    var currentView = this.panel_doc.ysview;
                    
                    if (currentView && typeof currentView["show" + category] == "function") {
                        currentView["show" + category]();                        
                    }
                }
                
            },
            
            getSelectedState : function (obj) {
                return obj.selected ? "true" : "false";
            },
            
            getTabIndex : function(obj) {
                return obj.selected ? "0" : "-1";
            },
            
            onEditRulesetsClick : function(event) {
                var currentView = this.panel_doc.ysview;
                currentView.showRuleSettings();
            },
            
            onRulesetChange : function(event) {
                var currentView = this.panel_doc.ysview;
                currentView.onChangeRuleset(event);
            },

            onPrintableViewClick : function(event) {
                var currentView = this.panel_doc.ysview;
                if (currentView)
                    currentView.openPrintableDialog(event);    
            },
            
            getToolbarButtonClass : function(obj) {
                var className = "ruleCategory-" + obj.name;
                if (obj.selected)
                    className += " selected";
                if (obj.first)
                    className += " first";
                return className;
            },
            
            onToolbarFocus : function(event) {
                this.selectTab(event.target);
            },
            
            onToolbarKeyPress : function(event) {
                
                var key = event.keyCode;
                switch(key) {
                    case KeyEvent.DOM_VK_LEFT:
                    case KeyEvent.DOM_VK_RIGHT:
                    case KeyEvent.DOM_VK_UP:
                    case KeyEvent.DOM_VK_DOWN:
                        
                        var forward = key == KeyEvent.DOM_VK_RIGHT || key == KeyEvent.DOM_VK_DOWN;
                        var tabList = getAncestorByClass(event.target, "focusTabList");
                        var tabs = tabList.getElementsByClassName("focusTab");
                        var currentIndex = Array.indexOf(tabs, event.target);
                        if (currentIndex != -1) {
                            var newIndex = forward ? ++currentIndex : --currentIndex;
                            newIndex = newIndex < 0 ? tabs.length -1 : (newIndex >= tabs.length ? 0 : newIndex);
                            if (tabs[newIndex])
                                tabs[newIndex].focus();
                        }
                        event.stopPropagation();
                        break;
                }
            },
            viewContainer : DIV({style : "display:none"})
        })
    };

	
    // save a pointer back to this object from the panel document.
    // this is used by javascript call in view content.
    this.panel_doc.ysview = this;

    this.loadCSS(this.panel_doc);
    
    var toolbar = this.panel_doc.createElement("div");
    toolbar.id = "toolbarDiv";
    //toolbar.innerHTML = this.getToolbarSource();
    var categories = [{name: "Report", selected : true, first : true}, 
                      {name : "Headings"}, 
                      {name : "Roles"}, 
                      {name : "Forms"}, 
                      {name : "Images"}, 
                      {name : "Links"},
                      {name : "Tools"}];
    this.viewRep.toolbar.replace({categories : categories, rulesets : this.getRulesetArray()}, toolbar, this.viewRep);
    
    toolbar.style.display = "block";

    var elem = this.panel_doc.createElement("div");
    elem.style.display = "block";

    // create modal dialog.
    var dialogHtml = '<div class="dialog-box"><div class="gradient"><h1><span></span><div class="dialog-text">text</div></h1></div><div class="dialog-more-text"></div><div class="buttons"><div id="middle"><input class="dialog-left-button" type="button" value="Ok" onclick="javascript:document.ysview.closeDialog(document)"><input class="dialog-right-button" type="button" value="Cancel" onclick="javascript:document.ysview.closeDialog(document)"></div><div id="bottom"></div></div></div>';

    var modaldlg = this.panel_doc.createElement('div');
    modaldlg.id = "dialogDiv";
    modaldlg.innerHTML = dialogHtml;
    modaldlg.style.display = "none";
    // save modaldlg in view, make look up easier.
    this.modaldlg = modaldlg;


    if (panel.panelNode) {
        panel.panelNode.id = "ainspectorDiv";
        panel.panelNode.appendChild(modaldlg);
        panel.panelNode.appendChild(toolbar);
        panel.panelNode.appendChild(elem);
     }
    
    this.viewNode = elem;
    this.viewNode.id = "viewDiv";
    this.viewNode.className = "yui-skin-sam";

    this.yscontext = yscontext;

};

AINSPECTOR.view.prototype = {

    defaultview: "ysPerfButton",

    /**
     * Update the document object store in View object.
     * @param {Document} doc New Document object to be store in View.
     */
    setDocument: function(doc) {
        this.panel_doc = doc;
    },

    /**
     * Load CSS needed for YSlow UI.
     * @param {Document} doc Document to load the CSS files.
     */
    loadCSS: function(doc) {
    	AINSPECTOR.util.loadCSS("chrome://ainspector/content/ainspector/yui/fonts-min.css", this.panel_doc);
        AINSPECTOR.util.loadCSS("chrome://ainspector/content/ainspector/yui/tabview.css", this.panel_doc);
   	    AINSPECTOR.util.loadCSS("chrome://ainspector/content/ainspector/ainspector.css", this.panel_doc);
   	    AINSPECTOR.util.loadCSS("chrome://ainspector/content/ainspector/allyGrade.css", this.panel_doc);
   	    AINSPECTOR.util.loadCSS("chrome://ainspector/content/ainspector/grid.css", this.panel_doc); //net.css
    },

    restoreView: function(yscontext) {
         if (yscontext) {
            if (yscontext.PAGE.overallScore) {
                var grade = AINSPECTOR.util.prettyScore(yscontext.PAGE.overallScore, false, true);
                AINSPECTOR.view.setStatusBar(grade, "ainspector_status_grade");
            }
            if (yscontext.PAGE.totalSize) {
                var size = AINSPECTOR.util.kbSize(yscontext.PAGE.totalSize);
                //AINSPECTOR.view.setStatusBar(size, "ainspector_status_size");
            }
            if (yscontext.PAGE.t_done) {
                var t_done = yscontext.PAGE.t_done/1000 + "s";
                AINSPECTOR.view.setStatusBar(t_done, "ainspector_status_time");
            }
        }
    },

    addButtonView: function(sButtonId, sHtml) {
        var btnView = this.getButtonView(sButtonId);
        btnView.innerHTML = sHtml;
        this.showButtonView(sButtonId);
    },

    showButtonView: function(sButtonId) {
        var btnView = this.getButtonView(sButtonId);

        if ( ! btnView ) {
            AINSPECTOR.util.dump("ERROR: AINSPECTOR.view.showButtonView: Couldn't find ButtonView '" + sButtonId + "'.");
            return;
        }
        // Hide all the other button views.
        for ( var sId in this.buttonViews ) {
            if ( this.buttonViews.hasOwnProperty(sId) && sId != sButtonId ) {
                this.buttonViews[sId].style.display = "none";
            }
        }
        btnView.style.display = "block";
        this.curButtonId = sButtonId;
    },

    getButtonView: function(sButtonId) {
        var btnView = ( this.buttonViews.hasOwnProperty(sButtonId) ? this.buttonViews[sButtonId] : undefined );
        if ( ! btnView ) {
            btnView = this.viewRep.viewContainer.append({}, this.viewNode, this.viewRep)
            this.buttonViews[sButtonId] = btnView;
        }
        return btnView;
    },

    setButtonView: function(sButtonId, sHtml) {
        var btnView = this.getButtonView(sButtonId);
        if ( ! btnView ) {
	    AINSPECTOR.util.dump("ERROR: AINSPECTOR.view.setButtonView: Couldn't find ButtonView '" + sButtonId + "'.");
	    return;
        }

        btnView.innerHTML = sHtml;
        this.showButtonView(sButtonId);
    },

    getCurButtonView: function() {
        return this.getButtonView(this.curButtonId);
    },

    setSplashView: function() {
        var sHtml = '<div id="splashDiv">'
                    + '<div id="splashDivLeft"></div>'
                    + '<div id="splashDivRight"></div>'
                    + '<div id="splashDivCenter">'
                    + '  <img id="splashImg" width="300" alt="splash image" src="chrome://ainspector/content/ainspector/img/land_tunnel.png">'
                    + '  <div id="left">'
                    + '    <h2>Firebug Accessibilty Inspector</h2>'
                    + '    <div id="content" class="padding50">'
                    + '      <h3><img width="18" height="18" src="chrome://ainspector/content/ainspector/img/land_logo.png" alt="Accessibility Inspector"> Features</h3>'
                    + '      <ul>'
                    + '        <li>Grades based on accessibility rule compliance</li>'
                    + '        <li>The ability define your own rules as an extension to A11y Inspector</li>'
                    + '        <li>View structural features like headings, widgets, forms, images and links</li>'
                    + '      <ul>'
                    + '      <div id="autorun_checkbox">'
                    + '        <label>'
                    + '          <input type="checkbox" name="autorun" onclick="javascript:document.ysview.setAutorun(event)"  tabindex="0"';

        if (AINSPECTOR.util.Preference.getPref("extensions.firebug.ainspector.autorun", true)) {
            sHtml += 'checked';
        }

        sHtml +=      '          > Auto run test every time you launch AInspector'
                    + '        </label>'
                    + '      </div>' /* END autorun_checkbox */
                    + '      <div id="runtestDiv">'
                    + '        <div id="runtestLeft"></div>'
                    + '        <div id="runtestRight"></div>'
                    + '        <div id="runtestCenter">'
                    + '          <a id="bn_runtest" href="javascript:document.ysview.runTest()" tabindex="0">'
                    + '            Create Report'
                    + '          </a>' 
                    + '        </div>'  /* END runtestCenter */
                    + '      </div>'  /* END runtestDiv */
                    + '      <div class="footer">'
                    + '        <div class="moreinfo"><a href="http://code.google.com/p/ainspector/" onclick="return false;"><b>&#187;</b>Learn more about AInspector</a></div>'
                    + '      </div>' /* END footer */
                    + '    </div>' /* END content */
                    + '  </div>' /* END left */
                    + '</div>' /* END splashDivCenter */
                  + '</div>'; /* END splashDiv */


        this.addButtonView('panel_about', sHtml);
    },

    genProgressView: function() {
	var textStyle = "color: #000000; font-size: 10pt; font-family: Arial,Helvetica;";
	var progTextStyle = "margin-left: 10px; color: #000000; font-size: 8pt; font-family: Arial,Helvetica;";

	var outerbarStyle = "position:relative; height:14px; width: 200px; vertical-align: middle; background-color: #CCC; border: 1px solid #666666; margin-left: 10px;";
	var progbarStyle = "position:absolute; top:0px; left:0px; height: 14px; width: 200px; font-size: 0px; background-color: #FFFFFF;";

	var sBody = '<div class="about"><p style="margin: 0px 0px 2px 0px; ' + textStyle + '">\n'
            + 'Finding components in the page:<br>\n'
            + '<div id="peelprogress" style="' + outerbarStyle + '">\n'
            + '  <div id="progbar" role="progressbar" aria-value-min="0" aria-value-max="100" aria-value-now="0" style="' + progbarStyle + '"></div>\n'
            + '</div>\n'
            + '<div id="progtext" style="' + progTextStyle + '"></div>'
            + '<p style="margin: 10px 0px 2px 0px; ' + textStyle + '">\n'
            + 'Getting component information:<br>\n'
            + '<div id="fetchprogress" style="' + outerbarStyle + '">\n'
            + '  <div id="progbar2" style="' + progbarStyle + '"></div>\n'
            + '</div>\n'
            + '<div id="progtext2" style="' + progTextStyle + '">start...</div>'
            + '</div>';

	this.setButtonView('panel_about', sBody);
    },

    updateProgressView: function(progress_type, progress_info) {

        var outerbar, progbar, progtext;
        var percent;
        var message = '';

        if (progress_type == 'peel') {
            outerbar = this.panel_doc.getElementById("peelprogress");
            progbar = this.panel_doc.getElementById("progbar");
            progtext = this.panel_doc.getElementById("progtext");
            message = progress_info.message;
            percent = (progress_info.current_step * 100) / progress_info.total_step;
        } else if (progress_type == 'fetch') {
            outerbar = this.panel_doc.getElementById("fetchprogress");
            progbar = this.panel_doc.getElementById("progbar2");
            progtext = this.panel_doc.getElementById("progtext2");
            message = progress_info.last_component_url;
            percent = (progress_info.current * 100) / progress_info.total;
        } else {
            return;
        }

        if (percent < 0) {
            percent = 0;
        }
        if (percent > 100) {
            percent = 100;
        }
        if ( outerbar && progbar ) {
            var maxwidth = outerbar.clientWidth;
            percent = 100 - percent;
            var width = (maxwidth*percent)/100;
            if ( width > maxwidth ) {
                width = maxwidth;
            }
            var left = maxwidth - parseInt(width);
            progbar.style["width"] = parseInt(width) + "px";
            progbar.style["left"] = parseInt(left) + "px";
            probar.setAttribute("aria-valuenow", percent);
        } else {
            AINSPECTOR.util.dump("AINSPECTOR.view.UpdateProgressView: Can't find progress bar elements");
        }
        if ( progtext ) {
            progtext.innerHTML = message;
        }

    },

    updateStatusBar: function(doc) {
        if ( !this.yscontext.PAGE.statusbar ) {
            // only set the bar once
            this.yscontext.PAGE.statusbar = true;

            // If some of the info isn't available, we have to run some code.
            if ( ! this.yscontext.PAGE.overallScore ) {
                // run lint
                AINSPECTOR.controller.lint(doc, this.yscontext);
            }

            var size = AINSPECTOR.util.kbSize(this.yscontext.PAGE.totalSize);
            var score = this.yscontext.PAGE.overallScore;
            var grade = AINSPECTOR.util.prettyScore(score, false, true);

            //AINSPECTOR.view.setStatusBar(size, "ainspector_status_size");

	    // Send a beacon.
	    if ( AINSPECTOR.util.Preference.getPref("optinBeacon", false) ) {
                AINSPECTOR.util.sendBeacon(doc.location.href, score, this.yscontext.result_set, size);
            }
 	}
    },
    
    getRulesetArray : function() {
        var rulesets = AINSPECTOR.controller.getRegisteredRuleset();
        var rulesetsArray = [];
		var selectedRulesetId = AINSPECTOR.util.Preference.getPref("defaultRuleset", 'WCAG_2_0');
        for (var id in rulesets) {
         	var retStruct = {
				id: rulesets[id].id,
				name: rulesets[id].name,
				selected: (rulesets[id].id == selectedRulesetId) ? 'selected' : '',
			}
            rulesetsArray.push(retStruct)
        }
        return rulesetsArray;
    },

    updateRulesetList: function() {
        var div = this.panel_doc.getElementById('toolbar-ruleset');
        if (div) {
            this.viewRep.rulesetSelect.replace({rulesets : this.getRulesetArray()}, div, this.viewRep);
        }
    },
    
    formatGridTable: function(table, tabName, headerID)
    {
    	table.setAttribute("id", this.yscontext.uniqueID + tabName);
    	var ruleset = AINSPECTOR.controller.getRuleset(AINSPECTOR.controller.default_ruleset_id)
    	table.setAttribute("summary", 'Ruleset applied: ' + ruleset.name);
        var panel = FirebugContext.getPanel("AInspector");
        var hiddenCols = AINSPECTOR.util.Preference.getPref("hiddenCols");
        if (hiddenCols)
        	table.setAttribute("hiddenCols", hiddenCols);
        
        var sortCol = AINSPECTOR.util.Preference.getPref(headerID + "sortCol");
        var sortDir = AINSPECTOR.util.Preference.getPref(headerID + "sortDir");
        if (sortCol && sortDir) {
            var sortColEle=panel.document.getElementById(sortCol);
            AINSPECTOR.grid.sortColumn(table, sortColEle, sortDir);
        }
      
        // Update columns width according to the preferences.
        var allHTMLTags=panel.document.getElementsByTagName("*");
        var header = panel.document.getElementById(headerID);
        var columns = header.getElementsByTagName("td");
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            var colId = col.getAttribute("id");
            if (!colId || !col.style)
                continue;

            var width = AINSPECTOR.util.Preference.getPref("ainspector." + colId + ".width");
            if (width)
                col.style.width = width + "px";
        }
    },

    show: function(sView, force) {
        if ( force === undefined ) force = false;  //SMF added force reload
        sView = sView || this.defaultview;
  /*      if ("ysPerfButton" == sView && this.yscontext.component_set === null) {
            FBTrace.sysout('need to run peeler first.');
           // need to run peeler first.
            AINSPECTOR.controller.run(window.top.content, this.yscontext);
            this.defaultview = sView;
        } else */{
        	if (this.yscontext.ruleset_id) AINSPECTOR.controller.setDefaultRuleset(this.yscontext.ruleset_id);
            var stext = "";
            var panel = FirebugContext.getPanel("AInspector");
            var btnView = this.getButtonView(sView);
            var panel = FirebugContext.getPanel("AInspector"); 
            if (btnView && !force && btnView.innerHTML != '') {
                // This view already exists, just toggle to it.
            	if ("ysHeadingsButton" == sView) panel.table = panel.headingsTable;
            	else if ("ysFormsButton" == sView) panel.table = panel.formsTable;
            	else if ("ysImagesButton" == sView) panel.table = panel.imgTable;
            	else if ("ysLinksButton" == sView) panel.table = panel.linkTable;
                this.showButtonView(sView);
            }
            else if ( "ysImagesButton" == sView ) {
                stext += this.yscontext.genTab('images');
                this.addButtonView("ysImagesButton", stext);
                
                //SMF append the appropriate DOMPlate        	    
  	            var parentNode = panel.document.getElementById(this.yscontext.uniqueID + 'images');
	            panel.table = panel.imgTable = AINSPECTOR.view.imagesTable.tableTag.append({}, parentNode, AINSPECTOR.view.imagesTable);
	            var tbody = panel.table.firstChild;
	            var row = AINSPECTOR.view.imageEntry.rowTag.insertRows({images: this.yscontext.images_set}, tbody.lastChild)[0];
                this.formatGridTable(panel.table, 'images', "imagesTableHeader");
            }
            else if ( "ysHeadingsButton" == sView ) {
                stext += this.yscontext.genTab('headings');
                this.addButtonView("ysHeadingsButton", stext);
               
                //SMF append to the appropriate DOMPlate        	    
  	            var parentNode = panel.document.getElementById(this.yscontext.uniqueID + 'headings');
	            panel.table = panel.headingsTable = AINSPECTOR.view.headingsTable.tableTag.append({}, parentNode, AINSPECTOR.view.headingsTable);
	            var tbody = panel.table.firstChild;
	            var row = AINSPECTOR.view.headingsEntry.rowTag.insertRows({headings: this.yscontext.headings_set}, tbody.lastChild)[0];
                this.formatGridTable(panel.table, 'headings', "headingsTableHeader");
            }
            else if ( "ysRolesButton" == sView) {
                stext += this.yscontext.genTab('roles');
                this.addButtonView("ysRolesButton", stext);
                
                //SMF append to the appropriate DOMPlate        	    
                 if (this.yscontext.roles_set.length > 0) {
                	var parentNode = panel.document.getElementById(this.yscontext.uniqueID + 'roles');
                	this.landmarkTreeRep.tag.append({object: this.yscontext.roles_set}, parentNode, this.landmarkTreeRep);  
                 } else {
                    this.addButtonView("ysRolesButton", stext + "<br>" + FBL.$STR('none', 'a11y_bundle'));
                 }
            }
            else if ( "ysFormsButton" == sView) {
                stext += this.yscontext.genTab('forms');
                this.addButtonView("ysFormsButton", stext);
                
                //SMF append to the appropriate DOMPlate        	    
 	            var parentNode = panel.document.getElementById(this.yscontext.uniqueID + 'forms');
	            panel.table = panel.formsTable = AINSPECTOR.view.formsTable.tableTag.append({}, parentNode, AINSPECTOR.view.formsTable);
	            var tbody = panel.table.firstChild;
	            var row = AINSPECTOR.view.formsEntry.rowTag.insertRows({forms: this.yscontext.forms_set}, tbody.lastChild)[0];
                this.formatGridTable(panel.table, 'forms', "formsTableHeader");
            }
            else if ( "ysLinksButton" == sView) {
                stext += this.yscontext.genTab('links');
                this.addButtonView("ysLinksButton", stext);

	            var parentNode = panel.document.getElementById(this.yscontext.uniqueID + 'links');
	            panel.table = panel.linkTable = AINSPECTOR.view.linksTable.tableTag.append({}, parentNode, AINSPECTOR.view.linksTable);
	            var tbody = panel.table.firstChild;
	            var row = AINSPECTOR.view.linkEntry.linkTag.insertRows({links: this.yscontext.links_set}, tbody.lastChild)[0];
                this.formatGridTable(panel.table, 'links', "linksTableHeader");
             }
            else if ( "ysToolButton" == sView) {
                stext += this.yscontext.genToolsView();
                this.addButtonView("ysToolButton", stext);
            }
            else if ( "ysRuleEditButton" == sView) {
                stext += this.yscontext.genRulesetEditView();
                this.addButtonView("ysRuleEditButton", stext);
            }
            else {           	
                // Default is Performance.
                this.yscontext.genPerformance();
                this.showButtonView("ysPerfButton");
                //this.addButtonView("ysPerfButton", stext);
                /* SMF addition for displaying A11y and IITAA rule sets */
	           try {  
	                var panel = FirebugContext.getPanel("AInspector");
	                 for (var i=0; i <  this.yscontext.result_set.results.length; i++) {
		                var result = this.yscontext.result_set.results[i];
		                var parentNode = panel.document.getElementById(this.yscontext.uniqueID + '_' + result.rule_id);
		
		                var messages = result.message.split('\n');
		
		                var tmp = new Object(); //Array
		                for (var j = 0; j < messages.length; j++) {         	
			                prop =  (typeof result.severity != 'undefined') ? result.severity[j] + ': ' + messages[j] : messages[j]
			                if (typeof result.components != 'undefined' && result.components[j] != null && result.components[j].length > 0) {
			 		            var ele = new Object();
			                    for (var k = 0; k < result.components[j].length; k++) {
			                    	if (result.components[j][k] && result.components[j][k] != null) {
				                    	if (typeof result.components[j][k].node == 'undefined') { // Node itself was passed in
						                	eleProp = 'obj' + k;
						                	ele[eleProp] = result.components[j][k];
				                    	}
				                    	else if (result.components[j][k].node != null) { //Accext format
						                	eleProp = 'obj' + k;
						                	ele[eleProp] = result.components[j][k].node;
						                } else {
					                    	ele = "";
						                }
			                    	}
			                	}
		                		tmp[prop] =  ele; 
			                }
			                else tmp[prop] = "";
		                }
		        	    this.msgTreeRep.tag.append({object: tmp}, parentNode, this.msgTreeRep);
	                }
	
	            } catch (exc) {
	            	FBTrace.sysout(exc.message);
	            }    /* SMF end addition for displaying A11y and IITAA rule sets */
              
            }
            
            this.panelNode.scrollTop = 0;
            this.panelNode.scrollLeft = 0;

            
            this.updateStatusBar(FirebugContext.window.document);
        }
    },
    
    /**
     * @private
     */
    updateToolbarSelection: function() {
        switch (this.curButtonId) {
        case "ysHeadingsButton":
        case "ysRolesButton":
        case "ysFormsButton":
        case "ysImagesButton":
        case "yslinksButton":
        case "ysPerfButton":
        case "ysToolButton":
            var elem = this.getElementByTagNameAndId(this.panelNode, 'li', this.curButtonId);
            if (elem) {
                if (elem.className.indexOf("selected") !== -1) {
                    // no need to do anything.
                    return;
                } else {
                    elem.className += " selected";
                }
            }
            break;
        default:
            break;
        }

        var ul_elem = getElementByClassName(this.panelNode, 'toolbarLinks');
        var child = ul_elem.firstChild;
        while (child) {
            if (child.id !== this.curButtonId && child.className.indexOf("selected") !== -1) {
                this.unselect(child);
                if (child.previousSibling) {
                    AINSPECTOR.view.removeClassName(child.previousSibling, 'off');
                }
            }
            child = child.nextSibling;
        }
    },

    showReport: function() {
        this.show('ysPerfButton');
    },

    showHeadings: function() {
        this.show('ysHeadingsButton');
    },

    showImages: function() {
        this.show('ysImagesButton');
    },
    
    showRoles: function() {
        this.show('ysRolesButton');
    },

    showForms: function() {
        this.show('ysFormsButton');
    },

    showLinks: function() {
        this.show('ysLinksButton');
    },
    
    showTools: function() {
        this.show('ysToolButton');
    },

    showRuleSettings: function() {
        this.show('ysRuleEditButton');
    },

    runTest: function() {
        AINSPECTOR.controller.run(window.top.content, this.yscontext,false);
    },

    setAutorun: function(event) {
        var checkbox = event.currentTarget;
        AINSPECTOR.util.Preference.setPref("extensions.firebug.ainspector.autorun", checkbox.checked);
    },
    
    onRerunRuleset: function(event) {
        var select = event.currentTarget; //tried target, explicitOriginalTarget; //
        var doc = select.ownerDocument;
        var  curButtonId = doc.ainspector_panel.ysview.curButtonId;
        doc.ysview.yscontext.result_set = null; //clear the old data out
        for (sView in doc.ysview.buttonViews) doc.ysview.setButtonView(sView, ''); //clear the old data out
        doc.ysview.show(curButtonId, true);  //SMF to get the screen refreshed with the new results
    },

    onChangeRuleset: function(event) {
        var select = event.currentTarget; //tried target, explicitOriginalTarget; //
        var option = select.options[select.selectedIndex];
        AINSPECTOR.controller.setDefaultRuleset(option.value);
        this.yscontext.ruleset_id = option.value;
        var doc = select.ownerDocument;
        
       	this.ruleset_id = option.value;
        var  curButtonId = doc.ainspector_panel.ysview.curButtonId;
        AINSPECTOR.view.restoreStatusBar(doc.ainspector_context);
        doc.ysview.updateToolbarSelection();
        doc.ysview.yscontext.result_set = null; //clear the old data out
        for (sView in doc.ysview.buttonViews) doc.ysview.setButtonView(sView, ''); //clear the old data out
        doc.ysview.show(curButtonId, true);  //SMF to get the screen refreshed with the new results
        return;
        
        // ask if want to rerun test with the selected ruleset.
        var line1 = 'Do you want to run the selected ruleset now?';
        var left_button_label = 'Create Report';
        var left_button_func = function(e) {
        	try {
        	this.ruleset_id = option.value;
            var  curButtonId = doc.ainspector_panel.ysview.curButtonId;
            doc.ysview.closeDialog(doc);
    //        if (doc.ainspector_context.component_set === null) { /* SMF - so it would stop crashing if the first thing you did was pick a new rule set */
    //         	AINSPECTOR.controller.run(doc.ainspector_context.document.defaultView, doc.ainspector_context, false);
    //        }
    //     	AINSPECTOR.controller.lint(doc.ainspector_context.document, doc.ainspector_context);

    //        var stext = doc.ainspector_context.genPerformance('html');
    //        doc.ysview.addButtonView("ysPerfButton", stext);
    //        doc.ysview.panelNode.scrollTop = 0;
    //        doc.ysview.panelNode.scrollLeft = 0;
            // update score in status bar.
            AINSPECTOR.view.restoreStatusBar(doc.ainspector_context);
            doc.ysview.updateToolbarSelection();
            doc.ysview.yscontext.result_set = null; //clear the old data out
            for (sView in doc.ysview.buttonViews) doc.ysview.setButtonView(sView, ''); //clear the old data out
            doc.ysview.show(curButtonId, true);  //SMF to get the screen refreshed with the new results
        	} catch (exc) {
            	FBTrace.sysout(exc.message);
        	}
        };
        this.openDialog(doc, 389, 150, line1, undefined, left_button_label, left_button_func);
    },

    /* TabView */
    onclickTabLabel: function(event) {
        var li_elem = event.currentTarget;
        var ul_elem = li_elem.parentNode;
        var div_elem = ul_elem.nextSibling; // yui-content div

        if (li_elem.className.indexOf('selected') !== -1 || li_elem.id.indexOf('label') === -1) {
            return false;
        }
        if (ul_elem) {
            var child = ul_elem.firstChild;
            var tab;
            var hide_tab_id, show_tab_id;

            while (child) {
                if (this.unselect(child)) {
                    hide_tab_id = child.id.substring(5);
                    break;
                }
                child = child.nextSibling;
            }

            // select new tab selected.
            li_elem.className += ' selected';
            show_tab_id = li_elem.id.substring(5);

            // Go through all the tabs in yui-content to hide the old tab and show the new tab.
            var hide = false, show = false;
            child = div_elem.firstChild;
            while (child) {
                if (hide_tab_id !== undefined && child.id.substring(3) == hide_tab_id) {
                    if (child.className.indexOf("yui-hidden") === -1) {
                        //set yui-hidden
                        child.className += " yui-hidden";
                    }
                    hide = true;
                }
                if (show_tab_id !== undefined && child.id.substring(3) == show_tab_id) {
                    var index = child.className.indexOf("yui-hidden");
                    if (index !== -1) {
                        var className = child.className.substring(0, index);
                        className += child.className.substring(index+10);
                        child.className = className;
                    }
                    show = true;
                }
                if ((hide || hide_tab_id === undefined) && (show || show_tab_id === undefined)) {
                    break;
                }
                child = child.nextSibling;
            }
        }
        return false;
    },

    /* Result TabView */
    onclickResult: function(event) {
        return this.onclickTabLabel(event);
    },

    unselect: function(elem) {
        if (elem.className !== undefined) {
            var index = elem.className.indexOf("selected");
            if (index !== -1) {
                var className = elem.className.substring(0, index);
                className += elem.className.substring(index+8);
                elem.className = className;
                return true;
            }
        }
        return false;
    },

    filterResult: function(doc, category) {
        var showAll = false;

        if (category == "all") {
            showAll = true;
        }

        /* go through tab-label to readject hidden state */
        var ul_elem = doc.getElementById("tab-label-list");
        if (ul_elem) {
            var child = ul_elem.firstChild;
            var firstTab, tab;
            var index, className;

            while (child) {
                tab = doc.getElementById("tab"+child.id.substring(5));

                if (showAll || child.className.indexOf(category) !== -1) {
                    child.style.display = "block";
                    if (firstTab === undefined) {
                        firstTab = tab;
                        index = tab.className.indexOf("yui-hidden");
                        if (index !== -1) {
                            className = tab.className.substring(0, index);
                            className += tab.className.substring(index+10);
                            tab.className = className;
                        }
                        if (child.className.indexOf("selected") === -1) {
                            /* set selected class */
                            child.className += " selected";
                        }
                        child = child.nextSibling;
                        continue;
                    }
                } else {
                    child.style.display = "none";
                }

                /* hide non-first tab */
                if (tab.className.indexOf("yui-hidden") === -1) {
                    tab.className += " yui-hidden";
                }

                /* remove selected from class */
                this.unselect(child);

                child = child.nextSibling;
            }
        }
    },

    updateFilterSelection: function(event) {
        var elem = event.currentTarget;
        if (elem.className.indexOf("selected") !== -1) {
            return;  /* click on something already selected */
        }
        elem.className += " selected";

        var index;
        var done = false;

        var li = elem.parentNode.firstChild;
        while (li) {
            if (li != elem && this.unselect(li)) {
                break;
            }
            li = li.nextSibling;
        }
        this.filterResult(elem.ownerDocument, elem.id);
    },

    onclickToolbarMenu: function(event) {
        var a_elem = event.currentTarget;
        var li_elem = a_elem.parentNode;
        var ul_elem = li_elem.parentNode;

        if (li_elem.className.indexOf("selected") !== -1) {
            /* selecting an already selected target, do nothing. */
            return;
        }
        li_elem.className += " selected";

        if (ul_elem) {
            var child = ul_elem.firstChild;
            while (child) {
                if (child != li_elem && this.unselect(child)) {
                    break;
                }
                child = child.nextSibling;
            }
        }
    },

    expandCollapseComponentType: function(doc, type, iconDiv) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        renderer.expandCollapseComponentType(doc, iconDiv, type);
    },

    expandAll: function(doc) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        renderer.expandAllComponentType(doc);
    },

    regenComponentsTable: function(doc, column_name, sortDesc) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        renderer.regenComponentsTable(doc, column_name, sortDesc, this.yscontext.component_set);
    },

    showComponentHeaders: function(headersDivId) {
        var elem = this.panel_doc.getElementById(headersDivId);
        if (elem) {
            if (elem.style.visibility == "visible") {
                elem.style.visibility = "collapse";
            } else {
                elem.style.visibility = "visible";
            }
        }
    },

    openLink: function(url) {
        AINSPECTOR.util.openLink(url);
    },

    runTool: function(tool_id, param) {
        AINSPECTOR.controller.runTool(tool_id, this.yscontext, param);
    },

    onclickRuleset: function(event) {
        var li_elem = event.currentTarget;
        var ruleset_id;

        var index = li_elem.className.indexOf('ruleset-');
        if (index !== -1) {
            var end = li_elem.className.indexOf(' ', index+8);
            if (end !== -1) {
                ruleset_id = li_elem.className.substring(index+8, end);
            } else {
                ruleset_id = li_elem.className.substring(index+8);
            }
            AINSPECTOR.renderer.initRulesetEditForm(li_elem.ownerDocument, AINSPECTOR.controller.getRuleset(ruleset_id));
        }

        return this.onclickTabLabel(event);
    },

    openSaveAsDialog: function(doc, form_id) {
        // set dialog text
        var text = doc.getElementById('dialog-text');
        text.innerHTML = '<label>Save as: <input type="text" id="saveas-name" class="text-input" name="saveas-name" length="100" maxlength="100"></label>';

        // set left button label and onclick event handler.
        var button = doc.getElementById('dialog-left-button');
        button.value = 'Save';
        button.onclick = function(e) {
            var doc = this.ownerDocument;
            var textbox = doc.getElementById('saveas-name');
            if (textbox) {
                if (AINSPECTOR.controller.checkRulesetName(textbox.value) === true) {
                    text.innerHTML += '<div class="error">' + textbox.value + 'already exists.</div>';
                } else {
                    var form = doc.getElementById(form_id);
                    var input = doc.createElement('input');
                    input.type = 'hidden';
                    input.name = 'saveas-name';
                    input.value = textbox.value;
                    form.appendChild(input);
                    form.submit();
                    doc.ysview.closeDialog();
                }
            }

        };

        this.openDialog(doc, 389, 150);
    },

    openPrintableDialog: function(event) {
       var select = event.currentTarget; // SMF added event
       var doc = select.ownerDocument;	 // SMF added getting the doc from the event
       /*
       if (doc.ysview.yscontext.result_set === null) {
            var line = 'Please run AInspector first before using Printable View.';
            this.openDialog(doc, 389, 150, line, '', 'Ok');
            return;
        }
        var line1 = 'Check which information you want to view or print<br>';
        var line2 = '<div id="printOptions">' +
            '<label><input type="checkbox" name="print-type" value="grade" checked>Grade</label>'+
            '<label><input type="checkbox" name="print-type" value="components" checked>Components</label>' +
            '<label><input type="checkbox" name="print-type" value="stats" checked>Statistics</label></div>';
        var left_button_label = 'Ok';
        var left_button_func = function(e) {
            var doc = e.currentTarget.ownerDocument;
            var aInputs = doc.getElementsByName('print-type');
            var print_type = {};
            for (var i = 0; i < aInputs.length; i++) {
                if (aInputs[i].checked) {
                    print_type[aInputs[i].value] = 1;
                }
            }
            doc.ysview.closeDialog(doc);
            doc.ysview.runTool('printableview', {'options': print_type, 'yscontext': doc.ainspector_context });
        };
        
        this.openDialog(doc, 389, 150, line1, line2, left_button_label, left_button_func);
*/     
       
        var print_this = {};
        switch (this.curButtonId) {
	        case "ysHeadingsButton": print_this['headings'] = 1; break;
	        case "ysRolesButton": print_this['roles'] = 1; break;
	        case "ysFormsButton": print_this['forms'] = 1; break;
	        case "ysImagesButton": print_this['images'] = 1; break;
	        case "ysLinksButton": print_this['links'] = 1; break;
	        case "ysPerfButton": {
	            if (doc.ysview.yscontext.result_set === null) {
	                var line = 'Please run AInspector first before using Printable View.';
	                this.openDialog(doc, 389, 150, line, '', 'Ok');
	                return;
	            }
	        	print_this['reportcard'] = 1; 
	        	break;
	        }
	        case "ysToolButton": print_this['reportcard'] = 1; break;
        }
        doc.ysview.runTool('printableview', {'options': print_this, 'yscontext': doc.ysview.yscontext });
    },

    /**
     * @private
     * helper function to get element with id and tagname in node.
     */
    getElementByTagNameAndId: function(node, tagname, id) {
        var arrElements;
        if (node) {
            arrElements = node.getElementsByTagName(tagname);
            if (arrElements.length > 0) {
                for (var i = 0; i < arrElements.length; i++) {
                    if (arrElements[i].id === id) {
                        return arrElements[i];
                    }
                }
            }
        }
        return null;
    },

    /**
     * Helper function for displaying dialog.
     * @param {Document} doc Document object of YSlow Chrome window
     * @param {Number} width desired width of the dialog
     * @param {Number} height desired height of the dialog
     * @param {String} text1 first line of text
     * @param {String} text2 second line fo text
     * @param {String} left_button_label left button label
     * @param {Functino} left_button_func onclick function of left button
     */
    openDialog: function(doc, width, height, text1, text2, left_button_label, left_button_func) {
        var overlay = this.modaldlg;
        var dialog, text, more_text;

        var elems = overlay.getElementsByTagName('div');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].className && elems[i].className.length > 0) {
                if (elems[i].className == "dialog-box") {
                    dialog = elems[i];
                } else if (elems[i].className == "dialog-text") {
                    text = elems[i];
                } else if (elems[i].className == "dialog-more-text") {
                    more_text = elems[i];
                }
            }
        }

        if (overlay && dialog && text && more_text) {
            text.innerHTML = (text1 ? text1: '');
            more_text.innerHTML = (text2 ? text2: '');

            var button;
            var inputs = overlay.getElementsByTagName('input');
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j].className == "dialog-left-button") {
                    button = inputs[j];
                }
            }
            if (button) {
                button.value = left_button_label;
                button.onclick = (left_button_func ? left_button_func :
                                      (function(e) {doc.ysview.closeDialog(doc);}) );
            }

            // position dialog to center of panel.
            var win = doc.defaultView;
            var pageWidth = win.innerWidth;
            var pageHeight = win.innerHeight;

            var left = Math.floor((pageWidth - width)/2);
            var top = Math.floor((pageHeight - height)/2);
            dialog.style.left = ((left && left > 0) ? left : 225) + 'px';
            dialog.style.top = ((top && top > 0) ? top : 80) + 'px';

            overlay.style.left = this.panelNode.scrollLeft + 'px';
            overlay.style.top = this.panelNode.scrollTop + 'px';
            overlay.style.display = "block";

            // put focus on the first input.
            if (inputs.length > 0) {
                inputs[0].focus();
            }
        }

    },
    closeDialog: function(doc) {
        var dialog = this.modaldlg;
        dialog.style.display = "none";
        
    },

    saveRuleset: function(doc) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        renderer.saveRuleset(doc);
    },

    deleteRuleset: function(doc) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        renderer.deleteRuleset(doc);
    },

    shareRuleset: function(doc) {
        var renderer = AINSPECTOR.controller.getRenderer('html');
        var ruleset_id = renderer.getEditFormRulesetId(this.panel_doc);
        var ruleset = AINSPECTOR.controller.getRuleset(ruleset_id);

        if (ruleset) {
            AINSPECTOR.Exporter.exportRuleset(ruleset);

            var text = doc.getElementById('dialog-text');
            text.innerHTML = '<label>A AINSPECTOR ruleset extension file (' + ruleset_id + '.xpi) has been created on your desktop.</label>';

            // set left button label and onclick event handler.
            var button = doc.getElementById('dialog-left-button');
            button.value = "Ok";
            button.onclick = function(e) {
                doc.ysview.closeDialog(doc);
            };

            this.openDialog(doc, 389, 150);
        }
    },

    createRuleset: function(button) {
        // unselect ruleset
        var li_elem = button.parentNode;
        var ul_elem = li_elem.parentNode;
        var child = ul_elem.firstChild;
        while (child) {
            this.unselect(child);
            child = child.nextSibling;
        }

        AINSPECTOR.renderer.initRulesetEditForm(this.panel_doc);
    },

    showHideHelp: function() {
        var help = this.panel_doc.getElementById('helpDiv');
        if (help) {
            if (help.style.visibility == "visible") {
                help.style.visibility = "hidden";
            } else {
                help.style.visibility = "visible";
            }
        }
    },

    smushIt: function(doc, url) {
        AINSPECTOR.util.smushIt(url,
                           function(resp) {
                               var text = doc.getElementById('dialog-text');
                               var txt = '<div class="smushItResult"><div>Image src: ' + resp.src + '</div>'
                                         + '<div>Original size: ' + resp.src_size + '</div>';

                               if (resp.error) {
                                   txt += '<br>' + resp.error;
                               } else {
                                   txt += '<div>Optimized size: ' + resp.dest_size + '</div>'
                                          + '<div>Optimized percentage: ' + resp.percent + '</div>'
                                          + '<div><a href="javascript:document.ysview.openLink(\'http://smush.it/' + resp.dest + '\')">Click here to view the optimized image.</a></div>';
                               }
                               txt += '</div>';
                               text.innerHTML = txt;

                               doc.ysview.openDialog(doc, 389, 150);
                           });
    }


};

AINSPECTOR.view.setStatusBar = function(text, sId) {
    sId = sId || "ainspector_status_grade";
    var sbelem = document.getElementById(sId);
    sbelem.value = text;  
};

AINSPECTOR.view.clearStatusBar = function() {
    this.setStatusBar("", "ainspector_status_time");
    this.setStatusBar("", "ainspector_status_grade");
    //this.setStatusBar("", "ainspector_status_size");
};

/**
 * Restore YSlow status bar text
 * @param {AINSPECTOR.context} yscontext YSlow context that contains page result and statistics.
 */
AINSPECTOR.view.restoreStatusBar = function(yscontext) {
    if (yscontext) {
        if (yscontext.PAGE.overallScore) {
            var grade = AINSPECTOR.util.prettyScore(yscontext.PAGE.overallScore);
            this.setStatusBar(grade, "ainspector_status_grade");
        }
        if (yscontext.PAGE.totalSize) {
            var size = AINSPECTOR.util.kbSize(yscontext.PAGE.totalSize);
            //this.setStatusBar(size, "ainspector_status_size");
        }
        if (yscontext.PAGE.t_done) {
            var t_done = yscontext.PAGE.t_done/1000 + "s";
            this.setStatusBar(t_done, "ainspector_status_time");
        }
    }
};

/**
 * Toggle YSlow in status bar.
 * @param {Boolean} bhide show or hide YSlow in status bar.
 */
AINSPECTOR.view.toggleStatusBar = function(bHide) {
    document.getElementById('ainspector-status-bar').hidden = bHide;
};

/**
 * Remove name from element's className.
 * @param {HTMLElement} element
 * @param {String} name name to be removed from className.
 * @return true if name is found in element's classname
 */
AINSPECTOR.view.removeClassName = function(element, name) {
    if (element && element.className && element.className.length > 0 && name && name.length > 0) {
        var names = element.className.split(" " );
        for (var i = 0; i < names.length; i++) {
            if (names[i] === name) {
                names.splice(i, 1);
                element.className = names.join(" ");
                return true;
            }
        }
    }
    return false;
};

AINSPECTOR.view.getDocuments = function(objWithFrames, documentList) {
	documentList.push(objWithFrames.document);
	
	if (null != objWithFrames.frames) {
		var framesList = objWithFrames.frames;
	      
		// Loop through the frames
		for(var i = 0; i < framesList.length; i++) {
			AINSPECTOR.view.getDocuments(framesList[i], documentList);
		}
	}
	
	return documentList;
};

AINSPECTOR.view.getLandmarks = function(theWindow, whichTab) {
	var a = new Array();
	var documents = AINSPECTOR.view.getDocuments(theWindow, new Array());
	
	for (var i =0; i < documents.length; i++) {
		a = a.concat(AINSPECTOR.view.getEleByType(documents[i], whichTab));
	}
	return a; 
};

AINSPECTOR.view.getEleByType = function(doc, whichTab)  
{
    try {
     	function landmarkObject(node, label) {
    		function Left(str, n){
    			if (n <= 0) return "";
    			else if (n > String(str).length) return str;
    			else return String(str).substring(0,n) + '...';
    		}
			with (OpenAjax.a11y.util) {
	    		this.node = node;
	    		var content = getNodeTextRecursively(node);
	    		var role = getValueFromAttributes(node,['role'],''); 
	    		var attrType = getValueFromAttributes(node,['type'],''); 
	    		var alt = getValueFromAttributes(node,['alt'],''); 
	//    		var id = getValueFromAttributes(node,['id'],''); 
	    	    if (role != '') role = " role='" + role + "'"; 
	    	    if (attrType != '') attrType = " type='" + attrType + "'";
	    	    if (alt != '') alt = " alt='" + alt + "'";
	//      	if (id != '') type = " id=" + id;
	    	    this.displayName =' <' + this.node.nodeName + role + attrType + alt + '> '
	    	    if (label != null) this.displayName += label;
	    	    else this.displayName += Left(getNodeTextRecursively(node), 256);
	    	    	
	     		this.issuesObj = AINSPECTOR.controller.callAllParseNode(node);
	     		this.ariaAttributes = 'test';
			}
    	}

    	landmarkObject.prototype = {
    		node : null,
    		displayName: '',
    		subNodes: null,
    		issuesObj: null,
    		ariaAttributes: null,
    	}
    	
    	function AddAsSubNode(parentNode, node) {
    		if (parentNode.subNodes == null) {
    			var children = [];
    			children.push(node);
    			parentNode.subNodes = children; 
    		}else {
    			parentNode.subNodes[parentNode.subNodes.length] = node;
    		}
    	}
    	
    	function isParent(doc, parent, child) {
    		var walker = doc.createTreeWalker(doc,NodeFilter.SHOW_ELEMENT,null,true);
			walker.currentNode = child;
				var cur = walker.parentNode();
				while (null != cur) if (cur == parent) return true; else cur = walker.parentNode();
			   return false;
    	}
    	
    	var nodelist = [];
    	var tmpList = [];
     	var landmarkList = [];
     	
     	if (whichTab == 'roles') {
			var xp = "//*[@role]";
			var elements = new Array();
			var xpathResult = doc.evaluate(xp, doc, OpenAjax.a11y.util.defaultNSResolver, XPathResult.ANY_TYPE,null);
			var r = xpathResult.iterateNext();
			while (r) {
				var LMObj = new landmarkObject(r, null);
				nodelist.push(LMObj); 
				tmpList.push(nodelist[nodelist.length-1]);
				r = xpathResult.iterateNext();
			}
			//SMF this does not lend to additional rule sets
			//AINSPECTOR.OAA_Nexus.runDocContextRules('3.3.2', doc, nodelist); // forms
    	}

    	
    	for (var i=nodelist.length-1; i >= 0; i--) {
    		nodelist[i].node.isChild = false;
    		for (var j=i-1; j >= 0 && !nodelist[i].node.isChild; j--) {
    			foundParent = isParent(doc, nodelist[j].node, nodelist[i].node)
    			if (foundParent) {
        			nodelist[i].node.isChild = true;
    				AddAsSubNode(tmpList[j], nodelist[i]);
    				break;
    			}
    		}
    	}			    	
     	
       	for (var i=0; i < nodelist.length; i++) if (!nodelist[i].node.isChild) landmarkList.push(tmpList[i]);
//        FBTrace.sysout('landmarkList', landmarkList);
        return landmarkList;
	} catch (exc)  {
    	FBTrace.sysout(exc.message)
    }
};

