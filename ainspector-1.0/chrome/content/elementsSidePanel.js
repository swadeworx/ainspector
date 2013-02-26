/* See license.txt for terms of usage */

define([
    "firebug/lib/object",
    "firebug/lib/trace",
    "firebug/lib/locale",
    "firebug/lib/domplate",
    "firebug/lib/events",
    "firebug/lib/dom",
    "firebug/lib/css",
    "ainspector/ainspectorUtil",
    "ainspector/sidePanelUtil"
],
function(Obj, FBTrace, Locale, Domplate, Events, Dom, Css, AinspectorUtil, SidePanelUtil) {

var panelName = "elements";

Firebug.ElementsSidePanel = function ElementsSidePanel() {};
Firebug.ElementsSidePanel.prototype = Obj.extend(Firebug.Panel, {
    
  name: panelName,
  title: "Elements",
  parentPanel: "ainspector",
  order: 1,

  initialize: function() {
        
    Firebug.Panel.initialize.apply(this, arguments);
    this.onCLick = Obj.bind(this.setSelection, this);
    if (FBTrace.DBG_AINSPECTOR)
      FBTrace.sysout("AInspector; ElementsSidePanel.initialize");

    // TODO: Panel initialization (there is one panel instance per browser tab)

  },


  initializeNode: function(oldPanelNode) {
    this.setSelection = Obj.bind(this.setSelection, this);
    this.mainPanel.panelNode.addEventListener("click", this.setSelection, false);
    
    Firebug.Panel.initializeNode.apply(this, arguments);
  },

  destroyNode: function() {
    Firebug.Panel.destroyNode.apply(this, arguments);
  },

  destroy: function(state) {
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.destroy");

    Firebug.Panel.destroy.apply(this, arguments);
  },

  show: function(state) {
    Firebug.Panel.show.apply(this, arguments);
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.show");
  },

  supportsObject: function(object, type){
    if (FBTrace.DBG_AINSPECTOR)
        FBTrace.sysout("AInspector; ElementsSidePanel.supportsObject", {object: object, type: type});

    return object instanceof window.Element;
  },

  setSelection : function(event){
    
    var rule_result_item = Firebug.getRepObject(event.target);
    this.node_results_array = [];
    
    if (!rule_result_item) return;
    
    this.updateSelection(rule_result_item);
    
  },
  
  updateSelection : function (rule_result_item, parentNode) {
    
    var rule_result_mesg = '';
    
    if (rule_result_item && rule_result_item.rule_result) rule_result_mesg = rule_result_item.rule_result.getMessage();
    else rule_result_mesg = rule_result_item.title;
    FBTrace.sysout("rule_result_item: ", rule_result_item);
    if (rule_result_item.filtered_node_results) this.rebuild(rule_result_mesg, rule_result_item.filtered_node_results, parentNode);
    else Firebug.RuleInfoSidePanel.prototype.rulestemplate.selectTag.replace({}, this.panelNode);
  },
  
  rebuild : function(rule_summary, filtered_node_results, parentNode) {
    
    if (!this.panelNode) this.panelNode = parentNode; 
      
    this.panelNode.id = "ainspector-side-panel";
    
    if (filtered_node_results.length > 0) {
      this.elementsTemplate.tag.replace({object: filtered_node_results, rule_summary: rule_summary}, this.panelNode);
    } 
  },
  
  getPanelViewMesg : function(panelNode, mesg) {
    if (FBTrace.DBG_AINSPECTOR) FBTrace.sysout("getPanelViewMesg: ", panelNode);
    if (mesg == "") mesg = Locale.$STR("ainspector.sidepanel.selectRow");
    SidePanelUtil.commonTemplate.selectTag.replace({message: mesg}, panelNode);
  }
});

// Register locales before the following template definition.
Firebug.registerStringBundle("chrome://ainspector/locale/ainspector.properties");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-list-template.css");
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector-sidepanels.css");
/**
 * Domplate template used to render panel's content. Note that the template uses
 * localized strings and so, Firebug.registerStringBundle for the appropriate
 * locale file must be already executed at this moment.
 */
with (Domplate) {
  Firebug.ElementsSidePanel.prototype.elementsTemplate = domplate({
    tag:
      DIV({class: "side-panel"},
        DIV({class: "element-select"}, "$rule_summary"),
          TABLE({class: "domTree domTable ai-sidepanel-table", cellpadding: 0, cellspacing: 0, onclick: "$onClick"},
            THEAD(
              TR({class: "gridHeaderRow", id: "tableTableHeader"},
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Result")),
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox"}, "Element")),
                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox", title: "show the element in the HTML panel"}, "Goto"))
//                TH({class: "gridHeaderCell"}, DIV({class: "gridHeaderCellBox", title: "show more information on the element selected"}, "More Info"))
              ) //end TR
            ), //end THEAD
            TBODY(
              FOR("member", "$object|memberIterator", TAG("$row", {member: "$member"}))
            ) //end TBODY
          )//end TABLE
        ),
        
        row:
          
          TR({class: "treeRow gridRow", $hasChildren: "$member.hasChildren", level: "$member.level",
           _newObject: "$member", _repObject: "$member.value", onclick: "$highlightRow"},
            
            TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
              TAG("$member.severity_label_style", {'member' :"$member", 'object': "$member"}) 
            ),
            TD({class: "memberLabelCell styleAction"}, "$member.tag_name"),
            TD({class: "gridCol", role: "gridcell"},
              DIV({class: "gridContent resultAlign"}, 
                BUTTON({onclick: "$gotoHTML", id: "html_panel_button"}, "HTML"))
            )
            /*TD({class: "gridCol", role: "gridcell"},
              DIV({class: "gridContent resultAlign"}, 
                BUTTON({onclick: "$getElementInformation"}, "more info"))
            )*/
        ),
        
      childrow :
        
        TR({class: "treeRow gridRow", _newObject: "$member", _repObject: "$member.value", level: "$member.level",
         onclick: "$highlightRow"},
          TD({class: "memberLabelCell", style: "padding-left: $member.indent\\px", _repObject: "$member.value"},
          "$member.propertyLabel"
          ),
          TD({class: "memberLabelCell", _repObject: "$member.value"}, "$member.propertyValue")
        ),
        
        selectTag :
          DIV({class: "element-select", style:"color:gray;"}, Locale.$STR("ainspector.sidepanel.wcag.selectRow")),
        
        strTagPass : DIV({class: "treeLabel passMsgTxt"}, "$member.severityLabel"),
        strTagViolation : DIV({class: "treeLabel violationMsgTxt"}, "$member.severityLabel"),
        strTagManual : DIV({class: "treeLabel manualMsgTxt"}, "$member.severityLabel"),
        strTagHidden : DIV({class: "treeLabel hiddenMsgTxt"}, "$member.severityLabel"),
        strTagWarn : DIV({class: "treeLabel warnMsgTxt"}, "$member.severityLabel"),
        stylePropTag: DIV({class: "styleLabel"}, "none"),
        
        loop:
          FOR("member", "$members", TAG("$childrow", {member: "$member"})),
        
        onClick : function (event){
        
          if (!Events.isLeftClick(event)) return;

          var row = Dom.getAncestorByClass(event.target, "treeRow");
          var label = Dom.getAncestorByClass(event.target, "treeLabel");
        
          if (label && Css.hasClass(row, "hasChildren")) this.toggleRow(row);
        },
        
        gotoHTML : function(event){
          
          AinspectorUtil.toHTMLPanel(event);
        },
        
        memberIterator : function(object) {
          
          return this.getMembers(object);
        },
        
        getMembers : function(object, level) {
          var members = [];
          if (!level) level = 0;
          for (var p in object) members.push(this.createMembers(p, object[p], level));
          
          return members;
        },
        
        /**
         * @function createMembers
         * 
         * @desc
         * 
         * @param key -
         * @param object
         */
        createMembers : function(key, object, level){
          
          var ct = parseInt(key) + 1;
          if (level !=0) { //if it is child
                    
            return {
              propertyLabel:object.label,
              propertyValue:object.value,
              value: object,
              level: level,
              indent: level * 16

            };
          } else {
            return {
              tag_name: 'element ' + ct + ': '+ this.getElement(object),
              severity_label_style : this.getSeverityLabel(object),
              severityLabel : object.getNLSSeverityLabel(),
              hasChildren: this.hasChildren(object),
              children: object.getRuleProperties(),
              value: object,
              level: level,
              indent: level * 16
            };
          }
        },
        
        getSeverityLabel : function(object){
          
          var severity_label = object.getNLSSeverityLabel();
        
          if (severity_label == 'Warning') return this.strTagWarn;
          
          if (severity_label == 'Manual Check') return this.strTagManual;
          
          if (severity_label == 'Pass') return this.strTagPass;
          
          if (severity_label == 'Hidden') return this.strTagHidden;
          
          if (severity_label == 'Violation') return this.strTagViolation;

//        return object.getNLSSeverityLabel();
        },
        
        hasChildren : function(object){
          
          var properties = object.getRuleProperties();
          
          var length = properties.length;
          
          if (length > 0) return true;
          
          else return false;
        
        },
        

        /**
         * @function closeRow
         */
        closeRow: function(row) {
      
          if (Css.hasClass(row, "opened")) {
            var level = parseInt(row.getAttribute("level"));
            
            Css.removeClass(row, "opened");
            
            var tbody = row.parentNode;
          
            for (var firstRow = row.nextSibling; firstRow; firstRow = row.nextSibling) {
            
              if (parseInt(firstRow.getAttribute("level")) <= level) break;
              tbody.removeChild(firstRow);
            }
          }
        },

        /**
         * @function openRow
         */
        openRow: function(row) {
      
          if (!Css.hasClass(row, "opened")) {
            
            var level = parseInt(row.getAttribute("level"));
            Css.setClass(row, "opened");
            var repObject = row.newObject;

            if (repObject) {
              var members = this.getMembers(repObject.children, level+1);
          
              if (members) this.loop.insertRows({members: members}, row);
          }
        }
      },
      
      /**
       * @function toggleRow
       */
      toggleRow: function(row) {
        
        if (Css.hasClass(row, "opened")) {
          this.closeRow(row);
        } else {
          this.openRow(row);
        }
      },
      
      /**
       * @function highlightRow
       * 
       * @desc highlights the selected row in a side panel
       * 
       * @param {Object} event - event triggered when a row is selected in a side panel 
       */
      highlightRow : function(event) {

        var table = Dom.getAncestorByClass(event.target, "ai-sidepanel-table");
        var row = Dom.getAncestorByClass(event.target, "treeRow");
        
        AinspectorUtil.highlightRow(event, table, row);
//        AINSPECTOR_FB.flatListTemplateUtil.unHighlight(table);
//        AINSPECTOR_FB.flatListTemplateUtil.highlight(row);
        
//        if (AINSPECTOR_FB.element_info_dialog) {
//          AINSPECTOR_FB.element_info_dialog.cache_item_properties.update(row.repObject.cache_item);
//          AINSPECTOR_FB.element_info_dialog.focus();
//        }
      },
       
      getElement : function(object) {
          
        return AinspectorUtil.truncateText(object.cache_item.toString());
      },
        
      getElementInformation : function(event) {
        
      }
        
})}

Firebug.registerPanel(Firebug.ElementsSidePanel);
Firebug.registerStylesheet("chrome://ainspector/skin/ainspector.css");

if (FBTrace.DBG_AINSPECTOR)
    FBTrace.sysout("AInspector; accessibilityPanel.js, stylesheet registered");

return Firebug.ElementsSidePanel;

// ********************************************************************************************* //
});
