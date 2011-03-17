with (FBL) {
  AINSPECTOR.renderer = {
    sortBy: 'type',
    sortDesc: false,
    bPrintable: false,
    colors: {
      doc      : '#8963df',
      redirect : '#FC8C8C',
      iframe   : '#FFDFDF',
      xhr      : '#89631f',
      flash    : '#8D4F5B',
      js       : '#9fd0e8',
      css      : '#aba5eb',
      cssimage : '#677ab8',
      image    : '#d375cd',
      favicon  : '#a26c00',
      unknown  : '#888888'
    },
    reset: function() {
      this.primedCacheStats = null;
      this.emptyCacheStats = null;
      this.canvas_data = undefined;
    },
    printComponentExpires: function(expires) {
      var html = '&nbsp;';
      if (typeof expires == "object") {
        var month = expires.getMonth() + 1;
        html = expires.getFullYear() + "/" + month + "/" + expires.getDate();
      }
      return html;
    },
    genLandmarks: function(stats, bCacheFull) {
      var sText = '<div id="stats-detail">' + '<div class="summary-row">Header Tree View</div>';
      return sText;
    },
    getComponentHeadersTable: function(headers) {
      var sText = '<table>';
      for (var field in headers) {
        sText += '<tr><td class="param-name">' + field + '</td><td class="param-value">' + headers[field] + '</td></tr>';
      }
      sText += '</table>';
      return sText;
    },
    /**
      * Generate HTML table row code for a component.
      * @param fields table columns
      * @param comp Component
      * @param row_class 'odd' or 'even'
      * @param hidden
      * @return html code
      */
    genComponentRow: function(fields, comp, row_class, hidden) {
      if (typeof row_class != "string") {
        row_class = '';
      }
      if (comp.status >= 400 && comp.status < 500) {
        row_class += ' compError';
      }
      var headersDivId = 'compHeaders' + comp.id;
      var sHtml = '<tr class="' + row_class + ' type-' + comp.type + '"'+ (hidden ? ' style="visibility: collapse"' : '') + '>';
      for (var i in fields){
        if (i == "components") {
          sHtml += (AINSPECTOR.renderer.bPrintable ? '' : '<td>&nbsp;</td>' );
        } else {
          var sClass = i;
          var value = '';
          if (i == "type") {
            value += comp[i];
            if (comp.is_beacon) {
              value += ' B';
            }//end if
          } else if (i == "size") {
            value += AINSPECTOR.util.kbSize(comp.size);
          } else if (i == "url") {
            if (comp.status >= 400 && comp.status < 500) {
              sHtml += '<td class="' + sClass + '">' + AINSPECTOR.util.briefUrl(comp[i], 60) + ' (' + comp.status + ')</td>';
              // skip the rest of the fields if this component has error.
              continue;
            } else {
                value += AINSPECTOR.util.prettyAnchor(comp[i], comp[i], undefined, !AINSPECTOR.renderer.bPrintable, 60, 1, comp.type);
            }//end if
          } else if (i == "gzip") {
              value += (comp.size_compressed !== null ? AINSPECTOR.util.kbSize(comp.size_compressed): '');
          } else if (i == "etag") {
              value += comp.getEtag();
          } else if (i == "expires") {
              value += AINSPECTOR.renderer.printComponentExpires(comp.expires);
          } else if (i == "headers") {
            if (AINSPECTOR.renderer.bPrintable) {
              continue;
            }
            if (comp.raw_headers.length > 0) {
              value += '<a href="javascript:document.ysview.showComponentHeaders(\'' + headersDivId + '\')"><img src="chrome://ainspector/content/ainspector/img/magnify.gif""></a>';
            }
          } else if (i == "action") {
            if (AINSPECTOR.renderer.bPrintable) {
              continue;
            }
            if (comp.type == 'cssimage' || comp.type == 'image') {
              value += '<a href="javascript:document.ysview.smushIt(document, \'' + comp.url + '\')">smush.it</a>';
            }
          } else if (comp[i] !== undefined) {
            value += comp[i];
          }
          if (value.length === 0 && AINSPECTOR.renderer.bPrintable) {
            value += '&nbsp;';
          }
          sHtml += '<td class="' + sClass + '">' + value + '</td>';
        } //end if
      }//end for
      sHtml += '</tr>';
      if (comp.raw_headers.length > 0) {
        sHtml += '<tr id="' + headersDivId + '" class="headers" style="visibility: collapse"><td colspan="10">'
                  + '<div class="respHeaders">Response Headers</div>'
                  + this.getComponentHeadersTable(comp.headers)
                  + '</td></tr>';
      }
      return sHtml;
    },

    componentSortCallback: function(comp1, comp2) {
      var sortBy = AINSPECTOR.renderer.sortBy;
      var desc = AINSPECTOR.renderer.sortDesc;
      var a, b;

      a = b = '';
      switch (sortBy) {
        case 'type':
          a = comp1.type;
          b = comp2.type;
          break;
        case 'components':
          // what does it mean?
          break;
        case 'size':
          a = comp1.size ? Number(comp1.size): 0;
          b = comp2.size ? Number(comp2.size): 0;
          break;
        case 'gzip':
          a = comp1.size_compressed ? Number(comp1.size_compressed) : 0;
          b = comp2.size_compressed ? Number(comp2.size_compressed) : 0;
          break;
        case 'headers':
          // header exist?
          break;
        case 'url':
          a = comp1.url;
          b = comp2.url;
          break;
        case 'respTime':
          a = comp1.respTime ? Number(comp1.respTime) : 0;
          b = comp2.respTime ? Number(comp2.respTime) : 0;
          break;
        case 'etag':
          a = comp1.getEtag();
          b = comp2.getEtag();
          break;
        case 'action':
          // ??
          break;
        case 'expires':
          // special case - date type
          a = comp1.expires ? comp1.expires : 0;
          b = comp2.expires ? comp2.expires : 0;
          break;
      } //end switch

      if (a === b) {
        // secondary sorting by ID to stablize the sorting algorithm.
        if (comp1.id > comp2.id) {
          return (desc) ? -1 : 1;
        }
        if (comp1.id < comp2.id) {
          return (desc) ? 1 : -1;
        }
      } //end if
      // special case for sorting by type.
      if (sortBy == 'type') {
        var types = AINSPECTOR.peeler.types;
        for (var i = 0, max = types.length; i < max; i++) {
          if (comp1.type == types[i]) {
              return (desc) ? 1 : -1;
          }
          if (comp2.type == types[i]) {
              return (desc) ? -1 : 1;
          }
        }//end for
      }//end if

      // normal comparison
      if (a > b) {
          return (desc) ? -1 : 1;
      }
      if (a < b) {
          return (desc) ? 1 : -1;
      }
      return 0;
    },

    /**
     * Sort components, return a new array, the passed array is unchanged.
     * @param array of components to be sorted
     * @param field to sort by.
     * @return a new array of the sorted components.
     */
    sortComponents: function(comps, sortBy, desc) {
      var arr_comps = comps;
      this.sortBy = sortBy;
      this.sortDesc = desc;
      arr_comps.sort(this.componentSortCallback);
      return arr_comps;
    },

    genRulesCheckbox: function(ruleset) {
      var rules = AINSPECTOR.controller.getRegisteredRules();
      var j = 0;
      var col1Text, col2Text, col3Text;

      col1Text = '<div class="column1">';
      col2Text = '<div class="column2">';
      col3Text = '<div class="column3">';

      var weightsText = '';

      for (var id in rules) {
        var rule = rules[id];
        var sText = '<label><input id="rulesetEditRule' + id + '" name="rules" value="' + id + '" type="checkbox"'
                    + (ruleset.rules[id] !== undefined ? ' checked' : '' )
                    + '>' + rule.name + '</label><br>';

        if (ruleset.weights !== undefined && ruleset.weights[id] !== undefined) {
          weightsText += '<input type="hidden" name="weight-' + id + '" value="' + ruleset.weights[rule.id] + '">';
        }

        var column_id = (j % 3);
        switch (column_id) {
        case 0:
          col1Text += sText;
          break;
        case 1:
          col2Text += sText;
          break;
        case 2:
          col3Text += sText;
          break;
        }
        j++;
      }

      col1Text += '</div>';
      col2Text += '</div>';
      col3Text += '</div>';

      return '<div class="rulesColumns">' + col1Text + col2Text + col3Text
             + '<div id="rulesetEditWeightsDiv">' + weightsText + '</div></div>';
    },

    genRulesetEditForm: function(ruleset) {
        var contentHtml = '';

        contentHtml += '<div id="rulesetEditFormDiv"><h4><span id="rulesetEditFormTitle">' + ruleset.name + '</span> Ruleset</h4>'
                       + '<form id="edit-form" action="javascript:document.ysview.saveRuleset(document)">'
                       + AINSPECTOR.renderer.genRulesCheckbox(ruleset)
                       + '<div class="buttons"><input type="button" value="Save as ..." onclick="javascript:document.ysview.openSaveAsDialog(document, \'edit-form\')">'
                       + '<span id="rulesetEditCustomButtons" style="visibility: '
                           + (ruleset.custom === true ? 'visible' : 'hidden' )
                       + '">'
                       + '<input type="button" value="Save" onclick="this.form.submit()">'
                       + '<input type="button" value="Delete" onclick="javascript:document.ysview.deleteRuleset(document)">'
                       + '<input type="button" value="Share" onclick="javascript:document.ysview.shareRuleset(document)">'
                       + '</span>'
                       + '</div>'
                       + '<div id="rulesetEditRulesetId"><input type="hidden" name="ruleset-id" value="' + ruleset.id + '"></div>'
                       + '</form></div>';

        return contentHtml;
    },

    initRulesetEditForm: function(doc, ruleset) {
      var form = doc.getElementById('edit-form');
      var aElements = form.elements;

      var weightsText = '';

      // uncheck all rules
      for (var i = 0; i < aElements.length; i++) {
        if (aElements[i].name == "rules") {
          aElements[i].checked = false;
        }
      }

      // show save, delete and share for custom rules
      var buttons = doc.getElementById('rulesetEditCustomButtons');
      if (ruleset !== undefined && ruleset.custom === true) {
        // show the buttons
        buttons.style.visibility = 'visible';
      } else {
        // hide the buttons
        buttons.style.visibility = 'hidden';
      }

      var rulesetId = doc.getElementById('rulesetEditRulesetId');
      var title = doc.getElementById('rulesetEditFormTitle');
      if (ruleset !== undefined) {
        for (var id in ruleset.rules) {
          // check the checkbox.
          var checkbox = doc.getElementById('rulesetEditRule' + id);
          if (checkbox) {
            checkbox.checked = true;
          }
          if (ruleset.weights !== undefined && ruleset.weights[id] !== undefined) {
            weightsText += '<input type="hidden" name="weight-' + id + '" value="' + ruleset.weights[id] + '">';
          }
        }//end for
        rulesetId.innerHTML = '<input type="hidden" name="ruleset-id" value="' + ruleset.id + '">';
        title.innerHTML = ruleset.name;
      } else {
        rulesetId.innerHTML = '';
        title.innerHTML = 'New';
      }

      var div = doc.getElementById('rulesetEditWeightsDiv');
      div.innerHTML = weightsText;
    }

  }; //end of AINSPECTOR.renderer

  AINSPECTOR.registerRenderer({
    id: 'html',
    supports: {
      images: 1,
      reportcard: 1,
      headings: 1,
      landmarks: 1,
      roles: 1,
      forms: 1,
      links: 1,
      rulesetEdit: 1
    },

    reportcardPrintableView: function(results, overall_grade, ruleset) {
    	try {
//	    var html = '<div id="reportDiv"><table><tr class="header"><td colspan="2"><h3>Overall Grade: ' + overall_grade
//	                   + '  (Ruleset applied: ' + ruleset.name + ')</h3></td></tr>';
    	  var html = '<h3>Overall Grade: ' + overall_grade + '  (Ruleset applied: ' + ruleset.name + ')</h3>';
	      html += '<div id="reportDiv"><table summary="Grades and Rule definitions by Section"><tr class="header"><th>Grade</th><th style="text-align: left;">Section Name</th></td></tr>';
	      for (var i = 0; i < results.length; i++) {
	        var result = results[i];
	        if (typeof result === "object") {
	          var grade = AINSPECTOR.util.prettyScore(result.score);
            var messages = result.message.split('\n');
            if (messages) {
              result.message = messages.join('<br>');
	          }//end if
            html += '<tr><td class="grade grade-' + grade + '" style="font-weight: bold;">' + grade + '</td>'
                  + '<td class="desc"><p><h4 class="margin: 0;">' + result.name
                   + '</h4>'; //<div class="message" style="color: blue;">' + result.message + '</div>';
            if (typeof result.severityCode != 'undefined') {
              for (var j = 0; j <messages.length; j++) {
                if (result.severityCode[j] == 'msg.fail') html += '<div class="failMsgTxt">'
                else if(result.severityCode[j] == 'msg.warn') html += '<div class="warnMsgTxt"">'
                else if(result.severityCode[j] == 'msg.suggestion') html += '<div class="suggestionMsgTxt">'
                else if (result.severityCode[j] == 'level.violation') html += '<div class="failMsgTxt">'
                else if(result.severityCode[j] == 'level.potentialViolation') html += '<div class="warnMsgTxt"">'
                else if(result.severityCode[j] == 'level.recommendation') html += '<div class="suggestionMsgTxt">'
                else {
                 html += '<div class="passMsgTxt">'
                }
                html += result.severity[j] +  '<span class="message" style="color: black;">&nbsp;' + messages[j]+ '</span><br>';
              }//end for
            } else {
              html += '<div class="message" style="color: black;">' + result.message + '</div>';
            }//end if else

          /*  if (result.components && result.components.length > 0) {
                html += '<ul class="comps-list">';
                for (var j = 0; j < result.components.length; j++) {
                  if (typeof result.components[j] === "string") {
                    html += '<li>' + result.components[j] + '</li>';
                  } else if (result.components[j].url !== undefined) {
                    html += '<li>' + result.components[j].url + '</li>';
                  }
                }//end for
                html += '</ul><br>';
            }//end if */
	          html += '</p>'+ '</td></tr>';
	        }//end if
	      }//end for
        html += '</table></div>';
        return html;
      } catch (err) {
       	FBTrace.sysout('reportcardPrintableView: ' + err.message);
      }
    },

	  /* PBK begin */
	  /* printableView - outputs results in JSON object format onto the browser */
	  printableView: function(results) {

		  try {
        var count = 1;
        var singleSpaceFiller = "   ";   // 3 spaces
        var doubleSpaceFiller = singleSpaceFiller + singleSpaceFiller;
        var html = '<script type="text/javascript">';

        /* KH begin*/
        html += '\n\nwindow.onload = doReport;'; // TODO: trigger doReport() from the AInspector

        html += '\n\nfunction doReport() {';

        html += '\nvar reqNdx = 0;';
        html += '\nvar ruleNdx = 0;';
        html += '\nvar markup = \'<table id="results">\\n\';';

        html += '\nif (ainspector.evaluation.Results) {';

         // iterate through AInspector results structure.
        html += '\nfor (reqNdx = 0; reqNdx < ainspector.evaluation.Results.length; reqNdx++) {';

        html += '\n  var curReq = ainspector.evaluation.Results[reqNdx];';
        html += '\n  var numRules = curReq.rules.length;';
        html += '\n  var priority = curReq.requirementLevel.substr(6);';
        html += '\n  var bHaveFragments = false;';
        html += '\n  var ruleMarkup = \'\'; // used to build the rule info markup';

        html += '\n  var gradeCalc = calcGrade(curReq);';

        // iterate through the rules array, adding any rule with pass or fail nodes to ruleArray
        html += '\n  for (ruleNdx = 0; ruleNdx < curReq.rules.length; ruleNdx++) {';

        html += '\n    var curRule = curReq.rules[ruleNdx];';

        html += '\n    if (ruleNdx != 0) {';
        html += '\n      ruleMarkup += \'\\n\\t<tr class="middleRow">\';';
        html += '\n    }';
        html += '\n    else {';
        html += '\n      ruleMarkup += \'\\n\\t<tr>\';';
        html += '\n    }';
        html += '\n    ruleMarkup += \'\\n\\n\\t<th>&nbsp;</th>\';';
        html += '\n    ruleMarkup += \'\\n\\t\\t<td class="centerAlign \' + curRule.resultCode +\'">\' + curRule.result + \'</td>\';';
        html += '\n    ruleMarkup += \'\\n\\t\\t<td>\' + curRule.ruleTitle + \'</td>\';';

        html += '\n    if (curRule.resultCode != \'SEVERITY_PASS\' && curRule.failed.nodeFragments) {';

        html += '\n      var numFragments = curRule.failed.nodeFragments.length;';

        html += '\n      if (numFragments == 1) {';
        html += '\n        ruleMarkup += \'\\n\\t\\t<td>1 element failed:\';';
        html += '\n      }';
        html += '\n      else {';
        html += '\n        ruleMarkup += \'\\n\\t\\t<td>\' + numFragments + \' elements failed:\';';
        html += '\n      }';

        html += '\n      ruleMarkup += \' <input type="button" id="bn-\' + curRule.ruleID + \'" class="bnHideShow" aria-controls="rgn-\' + curRule.ruleID + \'" aria-expanded="true" value="Hide Code Fragments"/>\';';
        html += '\n      ruleMarkup += \'\\n\\t\\t<ol id="rgn-\' + curRule.ruleID + \'" aria-hidden="false">\';';

        html += '\n      for (ndx = 0; ndx < numFragments; ndx++) {';
        html += '\n        var tmp = curRule.failed.nodeFragments[ndx].replace(/</g, \'&lt;\');';
        html += '\n        tmp = tmp.replace(/>/g, \'&gt;\');';
        html += '\n        tmp = tmp.replace(/&lt;/g, \'<span class="code">&lt;\');';
        html += '\n        tmp = tmp.replace(/&gt;/g, \'&gt;</span>\');';
        html += '\n        ruleMarkup += \'\\n\\t\\t\\t<li>\' + tmp + \'</li>\';';
        html += '\n      }';

        html += '\n      ruleMarkup += \'\\n\\t\\t</ol>\';';

        html += '\n      bHaveFragments = true;';
        html += '\n    }';
        html += '\n    else {';
        html += '\n      ruleMarkup += \'\\n\\t\\t<td>&nbsp;</td>\';';
        html += '\n    }';
        html += '\n    ruleMarkup += "\\n\\t</tr>";\n';
        html += '\n  }';

        html += '\n  var headingMarkup = \'\'; // used to build the heading rows for the requirement';

        html += '\n  headingMarkup += \'\\n\\t<tr>\\n\\t\\t<th colspan="4" class="reqInfo">Grade <span="grade">\' + gradeCalc + \'</span> on \' + curReq.requirementTitle + \'</th>\\n\\t</tr>\';';
        html += '\n  var tmp = curReq.requirementDesc.replace(/</g, \'&lt;\');';
        html += '\n  tmp = tmp.replace(/>/g, \'&gt;\');';
        html += '\n  headingMarkup += \'\\n\\t<tr>\\n\\t\\t<th class="indent">&nbsp;</th><th colspan="3" class="ReqDesc">\' + tmp + \'</th>\\n\\t</tr>\';';

        html += '\n  headingMarkup += \'\\n\\t<tr>\';';
        html += '\n  headingMarkup += \'\\n\\n\\t<th>&nbsp;</th>\';';
        html += '\n  headingMarkup += \'\\n\\n\\t<th class="bottomBorder">Result</th>\';';
        html += '\n  headingMarkup += \'\\n\\n\\t<th class="bottomBorder">Rule</th>\';';

        html += '\n  if (bHaveFragments == true) {';
        html += '\n    headingMarkup += \'\\n\\n\\t<th class="bottomBorder">Code Fragments</th>\';';
        html += '\n  }\n  else {';
        html += '\n    headingMarkup += \'\\n\\n\\t<th class="bottomBorder">&nbsp;</th>\';';
        html += '\n  }';

        html += '\n  headingMarkup += \'\\n\\t</tr>\';';

        html += '\n  markup += headingMarkup + ruleMarkup;';
        html += '\n  }';

        html += '\n  var arrElem = document.getElementsByTagName("div");';
        html += '\n  for (ndx = 0; ndx < arrElem.length; ndx++) {';
        html += '\n    if (arrElem[ndx].className === "contentDiv") {';
        html += '\n      arrElem[ndx].innerHTML = markup + \'\\n</table>\';';
        html += '\n      break;';
        html += '\n    }';
        html += '\n  }';
        html += '\n}';
        // bind event handlers
        html += '\n\narrElem = document.getElementsByTagName("input");';
        html += '\n  for (ndx = 0; ndx < arrElem.length; ndx++) {';
        html += '\n    if (arrElem[ndx].className === "bnHideShow") {';
        html += '\n      arrElem[ndx].addEventListener("click", handleButtonClick, false);';
        html += '\n    }';
        html += '\n  }';
        html += '\n}';

        html += '\nfunction handleButtonClick() {';

        html += '\n  var rgnID = this.getAttribute("aria-controls");';
        html += '\n\n  var rgn = document.getElementById(rgnID);';

        html += '\n  if (this.getAttribute("aria-expanded") == "true") {';
        html += '\n    rgn.setAttribute("aria-hidden", "true");';
        html += '\n    this.setAttribute("aria-expanded", "false");';
        html += '\n    this.setAttribute("value", "Show Code Fragments");';
        html += '\n  }\n  else {';
        html += '\n    rgn.setAttribute("aria-hidden", "false");';
        html += '\n    this.setAttribute("aria-expanded", "true");';
        html += '\n    this.setAttribute("value", "Hide Code Fragments");';
        html += '\n  }';
        html += '\n}';

        html += '\nfunction calcGrade(reqObj) {';
        html += '\n   var numRules = reqObj.rules.length;';
        html += '\n   var vCount = 0;';
        html += '\n   var vPass = 0;';
        html += '\n   var rCount = 0;';
        html += '\n   var rPass = 0;';
        html += '\n   var bManualCheck = false;';

        // iterate through the rules and count the number of failures
        // potential violation or recommendations should trip the manual
        // check flag
        //
        html += '\n   for (ndx = 0; ndx < numRules; ndx++) {';
        html += '\n      var curRule = reqObj.rules[ndx];';
        html += '\n      switch (curRule.ruleSeverityCode) {';
        html += '\n         case \'SEVERITY_VIOLATION\' : {';
        html += '\n            vCount++;';
        html += '\n            if (curRule.resultCode == \'SEVERITY_PASS\') {';
        html += '\n               vPass++;';
        html += '\n            }';
        html += '\n            break;';
        html += '\n         }';
        html += '\n         case \'SEVERITY_RECOMMENDATION\' : {';
        html += '\n            rCount++;';
        html += '\n            if (curRule.resultCode == \'SEVERITY_PASS\') {';
        html += '\n               rPass++;';
        html += '\n            }';
        html += '\n            break;';
        html += '\n         }';
        html += '\n         case \'SEVERITY_POTENTIAL_VIOLATION\': { ';
        html += '\n            if (curRule.resultCode != \'SEVERITY_PASS\') {';
        html += '\n               bManualCheck = true;';
        html += '\n            }';
        html += '\n            break;';
        html += '\n         }';
        html += '\n         case \'SEVERITY_POTENTIAL_RECOMMENDATION\': { ';
        html += '\n            if (curRule.resultCode != \'SEVERITY_PASS\') {';
        html += '\n               bManualCheck = true;';
        html += '\n            }';
        html += '\n            break;';
        html += '\n         }';
        html += '\n      }';
        html += '\n   }';
      //  html += '\n   var vPercent =  (vCount > 0) ? Math.round((vPass/vCount)*100/numRules) : 0;';
      //  html += '\n   var rPercent =  (rCount > 0) ? Math.round((rPass/rCount)*100/numRules) : 0;';
        html += '\n   var vPercent =  (vCount > 0) ? Math.round((vCount-vPass)*100/numRules) : 0;';
        html += '\n   var rPercent =  (rCount > 0) ? Math.round((rCount-rPass)*100/numRules) : 0;';
        html += '\n   var grade = \'\';';
        html += '\n   if (rCount == 0 || vCount == 0) { // no recommendations and no violations';
        html += '\n     if (bManualCheck == true) {';
        html += '\n       grade = \'<span class="GradeM">M</span>\';';
        html += '\n       return grade';
        html += '\n     }';
        html += '\n   }';
        html += '\n   if (rCount == 0) { // no recommendations';
        html += '\n      if (vPass == vCount) { //all violations passed';
        html += '\n         grade = \'<span class="gradeA">A</span>\';';
        html += '\n         if (bManualCheck == true) {';
        html += '\n           grade += \'+<span class="GradeM">M</span>\';';
        html += '\n         }';
        html += '\n      }';
        html += '\n      else { // some Violations failed';
        html += '\n         if ((100 - vPercent) >= 90) {';
        html += '\n            grade = \'<span class="gradeC">C</span>\';';
        html += '\n            if (bManualCheck == true) {';
        html += '\n              grade += \'+<span class="GradeM">M</span>\';';
        html += '\n            }';
        html += '\n         }';
        html += '\n         else if ((100 - vPercent) >= 50) {';
        html += '\n            grade = \'<span class="gradeD">D</span>\';';
        html += '\n         }';
        html += '\n         else {';
        html += '\n            grade = \'<span class="gradeF">F</span>\';';
        html += '\n         }';
        html += '\n      }';
        html += '\n   }';
        html += '\n   else { // recommendations exist';
        html += '\n      if (vPass == vCount) {';
        html += '\n         if (rPass == rCount) { //all violations and recommendations passed';
        html += '\n            grade = \'<span class="gradeA">A</span>\';';
        html += '\n         }';
        html += '\n         else { // some recommendations failed';
        html += '\n            grade = \'<span class="gradeB">B</span>\';';
        html += '\n         }';
        html += '\n         if (bManualCheck == true) {';
        html += '\n           grade += \'+<span class="GradeM">M</span>\';';
        html += '\n         }';
        html += '\n      } ';
        html += '\n      else { // some violations failed';
        html += '\n         if ((100 - vPercent) >= 9*numRules) {';
        html += '\n            grade = \'<span class="gradeC">C</span>\';';
        html += '\n            if (bManualCheck == true) {';
        html += '\n              grade += \'+<span class="GradeM">M</span>\';';
        html += '\n            }';
        html += '\n         }';
        html += '\n         else if ((100 - vPercent) >= 5*numRules) {';
        html += '\n            grade = \'<span class="gradeD">D</span>\';';
        html += '\n         }';
        html += '\n         else {';
        html += '\n            grade = \'<span class="gradeF">F</span>\';';
        html += '\n         }';
        html += '\n      }';
        html += '\n   }';
        html += '\n   return grade;';
        html += '\n}';


        html += '</script>';
        /* KH end*/

        html += '\n <script type="text/javascript"> \n';

        for (var i = 0; i < results.length, count > 0; i++) {
          var result = results[i];
          if (i == (results.length - 1)) {
            count -= 1;
          }
          if(result.metaData != 'undefined' && result.metaData != ' ' && result.metaData != null) {
            var metaData = result.metaData.split(';');
            count = count - 1;
            for(var i=0; i < metaData.length; i++) {
              var text = metaData[i];
              text += (i == metaData.length-1) ? '': ';';

              html += text;
            } //end inner for
          }//end if
        }//end outer for
        html += '\n var ainspector = ainspector || {} ;';
        html += '\n ainspector.evaluation = ainspector.evaluation || {} ;';
        html += '\n ainspector.evaluation.Results = [';

        for (var i = 0; i < results.length; i++) {
          var result = results[i];
          var rid = new Array();
          if (typeof result === "object") {
            var messages = result.message.split('\n');
            if (messages) {
              result.message = messages.join('\n');
            }
            if (typeof result.severityCode != 'undefined') {

              /* ruleInfo is not available in results object. Try to get the ruleInfo from the requirement Number */
              var rule = AINSPECTOR.controller.getRule(results[i].requirementNumber);
              var requirementDesc = '';
              var requirementTitle = results[i].name;
              try {
                requirementTitle = requirementTitle.replace(/\"/g, "'");
                if (rule) {
                  requirementDesc = rule ? rule.info : '** To be added **';
                  requirementDesc = requirementDesc.replace(/\"/g, "'");
                }
              } catch (er) {
              }

              if (results[i].requirementNumber == '1.4.3') {
               requirementDesc = requirementDesc.replace(/\n/gi, "");
              }
              html += ' {';
              html += '\n' + singleSpaceFiller + ' "requirementNumber": "' + results[i].requirementNumber + '",';
              html += '\n' + singleSpaceFiller + ' "requirementTitle" : "' + requirementTitle + '",';
              html += '\n' + singleSpaceFiller + ' "requirementDesc"  : "' + requirementDesc + '",';
              html += '\n' + singleSpaceFiller + ' "requirementLevelCode"  : "' + rule.level + '",';
              html += '\n' + singleSpaceFiller + ' "requirementLevel" : "' + results[i].requirementLevel + '",';
              html += '\n' + singleSpaceFiller + ' "requirementUrl" : "' + results[i].requirementUrl + '",';
              html += '\n' + singleSpaceFiller + ' "rules" : ' + '[ ';

              rid = results[i].ruleID;
              var passIDs = result.drivenIDs.split('\n');
              if (passIDs) {
                passIDs.join('\n');
              } //end if
              var failIDs = result.failIDs.split('\n');
              if (failIDs) {
                failIDs.join('\n');
              } //end if

              for (var j=0; j < messages.length; j++) {
                if(passIDs[j] == 'not defined' || passIDs[j] == '') {
//                passIDs[j] = 'null';
                  passIDs[j] = '[ ]';
                } else {                 // passIDs[j] = '" ' +  passIDs[j] + '" ';
                var passIDArray = [];
                passIDArray =  passIDs[j].split(',');
                var newPassIDs = '[ ';
                for (var k=0; k<passIDArray.length; k++) {
                  newPassIDs = newPassIDs + '"' + passIDArray[k];
                  if (k == (passIDArray.length - 1)){
                    newPassIDs = newPassIDs + '" ';
                  } else {
                    newPassIDs = newPassIDs + '", ';
                  }
                }
                passIDs[j] = newPassIDs + ' ]';
              }//end ifelse
              if(failIDs[j] == 'not defined' || failIDs[j] == ''){
//              failIDs[j] = 'null';
                failIDs[j] = '[ ]';
                } else {
                  //failIDs[j] = '" ' + failIDs[j] + ' "';
                  failIDArray =  failIDs[j].split(',');
                  var newFailIDs = '[ ';
                  for (var k=0; k<failIDArray.length; k++) {
                    newFailIDs = newFailIDs + '"' + failIDArray[k];
                    if(k == (failIDArray.length - 1)){
                      newFailIDs = newFailIDs + '" ';
                    } else {
                      newFailIDs = newFailIDs + '", ';
                    }
                  }
                  failIDs[j] = newFailIDs + ' ]';
                }//end ifelse

                html += '\n' + singleSpaceFiller +' {\n' + doubleSpaceFiller +' "ruleID"    : "' + rid[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "ruleTitle"    : "' + result.ruleTitles[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "ruleMessage"  : "' + messages[j] + '" ,';
                html += '\n' + doubleSpaceFiller + ' "ruleSeverityCode" : "' + result.ruleSeverityCode[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "ruleSeverity" : "' + result.ruleSeverity[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "rulePriorityCode" : "' + result.priorityCode[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "rulePriority" : "' + result.priority[j] + '",';
                html += '\n'+ doubleSpaceFiller + ' "resultCode"    : "' + result.resultCode[j] + '",';
                html += '\n'+ doubleSpaceFiller + ' "result"        : "' + result.severity[j] + '",';
                html += '\n' + doubleSpaceFiller + ' "passed"       : { \n '+ doubleSpaceFiller + singleSpaceFiller +' "nodeID" : ' + passIDs[j] + '';
                html += '\n' + doubleSpaceFiller + '  },';
                html += '\n' + doubleSpaceFiller + ' "failed"       : {\n '+ doubleSpaceFiller + singleSpaceFiller +'"nodeID" : ' + failIDs[j] + ',';

                var elem = new Object();
                if ( result.components[j] != 0 && result.components[j] != "undefined" &&
                  typeof result.components[j] !== 'undefined' && result.components[j] != null && result.components[j].length > 0) {
                  var ele = new Object();
                  html += '\n'+ doubleSpaceFiller + singleSpaceFiller +' "nodeFragments" : [ ';
                  for (var k = 0; k < result.components[j].length; k++) {
                    if (result.components[j][k] && result.components[j][k] != null) {
                      if (typeof result.components[j][k].node == 'undefined') { // Node itself was passed in
                        ele[k] = result.components[j][k];
                      } else if (result.components[j][k].node != null) { //Accext format
                        ele[k] = result.components[j][k].node;
                      } else {
                        ele[k] = "";
                      }
                    }
                    html += '"<' + ele[k].nodeName;
                    if (typeof(ele[k].attributes) !== 'undefined' && ele[k].attributes != null && ele[k].attributes.length > 0 ) {
                      for (var attrName = 0; attrName < ele[k].attributes.length; attrName++) {
                        html +=  ' ' + ele[k].attributes[attrName].name + "='" + ele[k].attributes[attrName].value + "'";
                      } // end inner for
                    }//end if
                    html += ">";
                    var content = "";
                    content = ele[k].innerHTML;
                    try {
                      if (content != 'undefined' && content != " ") {
                        content = content.replace(/\n/gi, "\\n");
                        content = content.replace(/\r/gi, "");
                        content = content.replace(/\"/g, "'");
                      }
                    }catch (e) {
                    }
                    html += content;
                    html += (k == result.components[j].length-1) ? '"' : ('", \n' + doubleSpaceFiller + doubleSpaceFiller);
                  }// end outer for
                  html += ']';
                }//end if
                html += '\n  ' + doubleSpaceFiller + '},';
                html +=  '\n '+ singleSpaceFiller + "},";
              }//end for
              html += '\n ]},\n';
            } //end if
          }//end if
        }//endfor
        html += ']';

        html += '</script>';
        return html;

      } catch (err){
	    FBTrace.sysout('printableView: ' + err.message);
	  }
	  },
    /* PBK end */

	  getFilterCode: function(categories, total) {
      var html;
      var array = [];
      for (var id in categories) {
        if (categories[id]) {
          array.push(id);
        }
      }//end if
      array.sort();

      html = '<div id="filter"><ul>' +
          '<li class="first selected" id="all" onclick="javascript:document.ysview.updateFilterSelection(event)"><a href="#">ALL (' + total + ')</a></li>' +
          '<li class="first">FILTER BY: </li>';
      for (var i = 0; i < array.length; i++) {
         html += '<li';
          if (i === 0) {
              html += ' class="first"';
          }
          html += ' id="' + array[i] +
                  '" onclick="javascript:document.ysview.updateFilterSelection(event)"><a href="#">' +
                  array[i].toUpperCase() + ' (' + categories[array[i]] + ')</a></li>';
      }

      html += '</ul></div>';
      return html;
    },

    reportCardViewRep : domplate({
        outerDiv : DIV({id : "reportDiv"},
            TAG("$gradeStatusTag", {status : "$status"}),
            TAG("$innerDiv", {results : "$results"})
        ),

        gradeStatusTag : DIV({class : "summary", role : "status"},
            TABLE({role : 'presentation'},
                TR(
                    TD({class : "padding5"},
                        DIV({class : "bigFont"}, "$status.title")
                    ),
                    TD({class : "padding5"},
                        DIV({class : "overall-grade grade-$status.overallGrade"}, "$status.overallGrade")
                    ),
                    TD({class : "padding15"},"Overall performance score: $status.overallScore"),
                    TD({class : "padding15"},"Ruleset applied: $status.appliedRuleset"),
                    TD({class : "padding15"},"URL: $status.briefURL")
                )
            )
        ),
        innerDiv : DIV({class : "reportInnerDiv"},
            // add filter list here
            DIV({class : "result yui-navset yui-navset-left"},

                UL({class : "focusTabList yui-nav", id : "tab-label-list", role : "tablist", onkeypress : "$onKeyPress"},
                    FOR("result", "$results",
                        TAG("$resultTab", {result : "$result"})
                    )
                ),
                DIV({class : "aInspectorReportPanels yui-content"},
                    FOR("result", "$results",
                        TAG("$resultTabPanel", {result : "$result"})
                    )
                )
            )
        ),

        //javascript:document.ysview.onclickResult(event)
        resultTab : LI({class : "tab-$result.index $result.tabClass focusTab", role : "tab", tabindex : "$result.index|getTabIndex", onfocus : "$onFocus"},
            DIV({class : "gradeResult $result.gradeClass"},
                DIV({class : "tab-label"},
                    SPAN({class : "grade" },
                        "$result.grade"
                    ),
                    SPAN({class : "desc"},
                        "$result.name"
                    )
                )
            )
        ),

        resultTabPanel : DIV({role : "tabpanel", class : "panel-$result.index result-tab", "$yui-hidden" : "$result.index|isNotFirst"},
            "<h4>Grade $result.grade on $result.name</h4>",
            P({class : "rule-info"},
                "$result.ruleInfo",
                BR(),
                A({href : "javascript:document.ysview.openLink('$result.ruleURL')"},
                    STRONG("Read More")
                )
            ),
            HR(),
            DIV({id : "$result.uniqueId"})
        ),

        getTabIndex : function(index) {
            return this.isFirst(index) ? "0" : "-1";
        },

        isFirst : function(index) {
            return index - 1 === 0;
        },

        isNotFirst : function(index) {
            return index - 1 !== 0;
        },

        selectTab : function(elem) {
            if (!elem)
                return;
            var tabList = getAncestorByClass(elem, "focusTabList");
            if (tabList) {
                var oldTab = getElementByClass(tabList, "selected");
                if (oldTab) {
                    oldTab.setAttribute("aria-selected", "false");
                    oldTab.setAttribute("aria-expanded", "false");
                    oldTab.setAttribute("tabindex", "-1")
                    removeClass(oldTab, "selected");
                }
                var tabIndex = getClassValue(elem, "tab");
                var oldTabIndex = getClassValue(oldTab, "tab");
                var panelSet = getNextByClass(tabList, "aInspectorReportPanels");
                if (!tabIndex && !panelSet)
                    return;

                var oldPanel = getChildByClass(panelSet, "panel-" + oldTabIndex);
                if (oldPanel)
                    setClass(oldPanel, "yui-hidden");
            }
            elem.setAttribute("aria-selected", "true");
            elem.setAttribute("aria-expanded", "true");
            elem.setAttribute("tabindex", "0")
            setClass(elem, "selected");

            var newPanel = getChildByClass(panelSet, "panel-" + tabIndex);
            if (newPanel) {
                removeClass(newPanel, "yui-hidden");
                var ul_elem = elem.parentNode;
                var div_elem = ul_elem.nextSibling;
                this.positionResultTab(newPanel, div_elem, elem);
            }
        },

        positionResultTab: function(tab, container, label) {
            var doc = FirebugContext.getPanel("AInspector").document;
            var panelNode = FirebugContext.getPanel("AInspector").panelNode;
            var win = doc.defaultView;
            var pageHeight = win.offsetHeight? win.offsetHeight : win.innerHeight;

            var currentHeight = container.offsetHeight;
            var height = label.offsetTop + tab.offsetHeight;
            container.style.height = height + 'px';
            tab.style.position = "absolute";
            tab.style.left = label.offsetLeft + label.offsetWidth + "px";
            tab.style.top = label.offsetTop + "px";

            /* now make sure tab is visible */
            var y = tab.offsetTop;
            var parent = tab.offsetParent;
            while (parent !== null) {
                y += parent.offsetTop;
                parent = parent.offsetParent;
            }

            var padding = 5;
            if (y < panelNode.scrollTop ||
                y + tab.offsetHeight > panelNode.scrollTop + pageHeight) {

                if (y < panelNode.scrollTop) {
                    // scroll up
                    panelNode.scrollTop = y - padding;
                } else {
                    // scroll down
                    var delta = y + tab.offsetHeight - panelNode.scrollTop - pageHeight + padding;
                    if (delta > y - panelNode.scrollTop) {
                        delta = y - panelNode.scrollTop;
                    }
                    panelNode.scrollTop += delta;
                }
            }
        },

        getSelectedState : function (obj) {
            return obj.selected ? "true" : "false";
        },
        onFocus : function(event) {
            this.selectTab(event.target);
        },

        onKeyPress : function(event) {
            var key = event.keyCode;
            switch(key) {
                case KeyEvent.DOM_VK_LEFT:
                case KeyEvent.DOM_VK_RIGHT:
                case KeyEvent.DOM_VK_UP:
                case KeyEvent.DOM_VK_DOWN:
                event.stopPropagation();
                event.preventDefault();
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

                break;
            }
        },

    }),

    reportcardView: function(resultset, uniqueId) {
        var statusObj = {};
        var appliedRuleset = resultset.getRulesetApplied();
        var results = resultset.getResults();
        var url = resultset.url;
        statusObj.title = 'Grade';
        statusObj.overallGrade = AINSPECTOR.util.prettyScore(resultset.getOverallScore());
        statusObj.overallScore = parseInt(resultset.getOverallScore(), 10);
        statusObj.appliedRuleset = appliedRuleset.name;
        statusObj.briefURL = AINSPECTOR.util.briefUrl(url, 100);
        if (AINSPECTOR.doc){
          if (AINSPECTOR.doc.view_names && AINSPECTOR.doc.view_names.grade) {
              statusObj.title = AINSPECTOR.doc.view_names.grade;
          }
        }
        if (AINSPECTOR.renderer.bPrintable) {
          //return this.reportcardPrintableView(results,  statusObj.overallGrade, appliedRuleset);
			    return this.printableView(results);
        }
        var categories = {};
        var resultsObj = [], result, resultObj;
        for (var i = 0; i < results.length; i++) {
            result = results[i];
            resultObj = {};
            if (typeof result === "object") {
                resultObj.grade = AINSPECTOR.util.prettyScore(result.score);
                resultObj.index = i + 1;
                resultObj.gradeClass = 'grade-' + (resultObj.grade == "N/A" ? 'NA' : resultObj.grade);
                resultObj.score = parseInt(result.score, 10);
                resultObj.score = isNaN(resultObj.score) || result.score === -1 ? "n/a" : resultObj.score += "%";
                resultObj.name = result.name;
                resultObj.uniqueId = uniqueId + "_" + result.rule_id;
                resultObj.tabClass = "";
                if (i == 0)
                resultObj.tabClass += " first selected";
                if (result.category) {
                  for (var k = 0; k < result.category.length; k++) {
                    resultObj.tabClass += " " +result.category[k];
                    // update filter categories
                    if (categories[result.category[k]] === undefined) {
                        categories[result.category[k]] = 0;
                    }
                    categories[result.category[k]]++;
                  }
                }
                var rule = AINSPECTOR.controller.getRule(result.rule_id);
                resultObj.ruleInfo = resultObj.ruleURL = "";
                resultObj.readMore = "";
                if (rule) {
                    resultObj.ruleInfo = rule.info ? rule.info : '** To be added **';
                    if (rule.url !== undefined) {
                        resultObj.ruleURL = rule.url;
                    }
                }
                resultsObj.push(resultObj);
            }
        }
        var doc = FirebugContext.getPanel("AInspector").document;
        return this.reportCardViewRep.outerDiv.replace({ status : statusObj ,results : resultsObj}, doc.ysview.getButtonView("ysPerfButton"), this.reportCardViewRep);
	},

    gridTabPrintableView: function(tabName, tabData, titleText, ruleset, uniqueID) {
        var skip = '';
        var panel = FirebugContext.getPanel("AInspector");
        var topGrid = panel.document.getElementById(uniqueID + tabName);
        var topGridTable = topGrid.getElementsByTagName('table')[0];

        var header = panel.document.getElementById(tabName + 'TableHeader');
        var hiddenCols = AINSPECTOR.util.Preference.getPref("hiddenCols", '');
        var columns = header.getElementsByTagName("td");
        var html = '<div id="reportDiv"><table summary="' + topGridTable.getAttribute('summary') + '"><tr class="header">';
        for (var i=0; i<columns.length; i++) {
            if (hiddenCols.indexOf(columns[i].getAttribute("id")) == -1) {
              html += '<th>' + columns[i].textContent + '</th>';
            } else {
              skip += i + ' ';
            }  // endif
        }
	    html += '</tr>';

/*        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            var colId = col.getAttribute("id");
            if (!colId || !col.style)
                continue;

            var width = AINSPECTOR.util.Preference.getPref("ainspector." + colId + ".width");
            if (width)
                col.style.width = width + "px";
            if (hiddenCols.indexOf(colId) == -1) html += '<th>' + col.textContent + '</th>';
        } */
  //      var allTRTags=panel.document.getElementsByTagName("tr");

        var cn = "odd";
        var row_count = 0
        var headers = header.getElementsByTagName("td");
        var allTRTags = topGridTable.getElementsByTagName('tr');

        for (var r=1; r<allTRTags.length; r++) {
	        var columns = allTRTags[r].getElementsByTagName("td");

            row_count++;
	        if( row_count > 5 ) {
	          if( cn == "even" ) {
  	            cn = "odd";
  	          } else {
  	            cn = "even";
  	          } // endif
  	          row_count = 1;
	        } // endif

//	        FBTrace.sysout("Class Name" + cn + " Row count " + row_count, row_count );

		    html += '<tr class=' + cn + '>';
		    for (var i=0; i<columns.length; i++) {
		    	if (skip.indexOf(i + ' ') == -1) {
		    		html += '<td class=' + headers[i].textContent.toLowerCase() + '>' + columns[i].textContent.replace('<','&#60') + '</td>';
		    	}
		    }
		    html += '</tr>';
         } // endfor

       html += '</table></div>';
       return html;
	},

    treeTabPrintableView: function(tabName, tabData, titleText, ruleset, uniqueID) {
        var panel = FirebugContext.getPanel("AInspector");
//      var parentNode = panel.document.getElementById(uniqueID + 'roles');
        var parentNode = (tabName == 'roles') ? panel.document.getElementById(uniqueID + 'roles') : panel.document.getElementById(uniqueID + 'landmarks'); //PBK addition
        var topGridTable = parentNode.getElementsByTagName('table')[0];
        var html = '<div id="reportDiv"><table summary="' + topGridTable.getAttribute('summary') + '">';
        var allTRTags = topGridTable.getElementsByTagName('tr');
        for (var r=0; r<allTRTags.length; r++) {
	        var columns = allTRTags[r].getElementsByTagName("td");

            var cn = "even";
	        if( r%2 ) {
	          cn = "odd";
	        } // endif

		    html += '<tr class=' + cn + '>';
		    for (var i=0; i<columns.length; i++) {
		        var style = columns[i].getAttribute("style");
		    	html += '<td style = "' + style + '"><div>' + columns[i].textContent.replace('<','&#60') + '</div></td>';
		    }
		    html += '</tr>';
         }
        html += '</table></div>';

        return html;
	},

	tabView: function(tabName, tabData, titleText, uniqueID) {
        if (AINSPECTOR.renderer.bPrintable) {
        	if (tabName != 'roles' && tabName != 'landmarks')	return this.gridTabPrintableView(tabName, tabData, titleText, null, uniqueID);
        	else return this.treeTabPrintableView(tabName, tabData, titleText, null, uniqueID);;
        }

    	var sText = '';

        sText += '<div class="statsDiv">'
              + '<h4><span class="view-title">' + titleText + '</span></h4>';

        //SMF put in a place holder that will be accessed in view.js AINSPECTOR.view.show()
        sText += '<div id="' + uniqueID + tabName + '"></div>';
        return sText;
    },

   /*toolsView: function(tools) {

        var tableHtml = '<table>';

        for (var i = 0; i < tools.length; i++) {
            var tool = tools[i];
            //SMF where are the blank one coming from?
            //SMF remove the 'Printable View' since it should really be accessed via Printable View,
            //remove language specific text
            if (tool.name != '' && tool.name != 'Printable View') {
	            tableHtml += '<tr><td class="name"><b>'
	                         + tool.name
	                         + '</b></td><td>-</td><td>'
	                             + (tool.short_desc ? tool.short_desc : 'Short text here explaining what are the main benefits of running this App')
	                         + '</td><td class="launch-tool"><a href="javascript:document.ysview.runTool(\''
	                         + tool.id
	                         + '\', {\'yscontext\': document.ainspector_context })"><b>&#187;</b>Launch Tool</a></td></tr>';
            }
        }

        tableHtml += '</table>';

        var sText = '<div id="toolsDiv">'
                    + '<div id="summary"><span class="view-title">Tools</span>'
                    + 'The tools listed below may be use to further test the accessibility of your web page/site.</div>'
                    + '<div id="tools">' + tableHtml + '</div>'
                    + '</div>';

        return sText;
    },*/

    rulesetEditView: function(rulesets) {

        var settingsHtml = '<div id="settingsDiv" class="yui-navset yui-navset-left">';
        var navHtml, contentHtml;
        var index = 0;
        var custom = false;
        var selectedRuleset;

        navHtml = '<ul class="yui-nav"><li class="header">STANDARD SETS</li>';

        for (var id in rulesets) {
            var ruleset = rulesets[id];
            var tab_id = 'tab' + index;
            if (!custom && ruleset.custom == true) {
                navHtml += '<li class="new-section header">CUSTOM SETS</li>';
                custom = true;
            }
            navHtml += '<li id="label' + index  + '" class="' + 'ruleset-'+ruleset.id;
            if (index === 0) {
                selectedRuleset = rulesets[id];
                navHtml += ' selected"';
            }
            navHtml += '" onclick="javascript:document.ysview.onclickRuleset(event)"><a href="#' + tab_id + '">' + ruleset.name + '</a></li>';
            index++;
        }

        navHtml += '<li class="new-section create-ruleset"><input type="button" value="New Set" onclick="javascript:document.ysview.createRuleset(this)"></li></ul>';
        contentHtml = '<div class="yui-content">' + AINSPECTOR.renderer.genRulesetEditForm(selectedRuleset) + '</div>';

        settingsHtml += navHtml + contentHtml;

        var sText = '<div id="rulesetEditDiv">'
                    + '<div id="summary"><span class="view-title">Rule Settings</span>'
                    + 'Choose which ruleset better fit your specific needs. You can Save As an existing rule, based on an existing ruleset.</div>'
                    + settingsHtml + '</div>';

        return sText;
    },

    rulesetEditUpdateTab: function(doc, ruleset, updateAction) {
        var container = doc.getElementById('settingsDiv');
        if (container && ruleset.custom === true) {
            var ul_elem = container.firstChild;
            var content = ul_elem.nextSibling;

            var li_elem, prev_li_elem;
            if (updateAction < 1) {
                // for delete, we'll need to identify the tab to update.
                li_elem = ul_elem.firstChild;
                while (li_elem) {
                    var index = li_elem.className.indexOf('ruleset-');
                    if (index !== -1) {
                        var id = li_elem.className.substring(index+8);
                        index = id.indexOf(" ");
                        if (index !== -1) {
                            id = id.substring(0, index);
                        }
                        if (ruleset.id === id) {
                            index = li_elem.id.indexOf('label');
                            if (index !== -1) {
                                var tab_id = li_elem.id.substring(index+5);
                                if (li_elem.className.indexOf('selected') !== -1) {
                                    // the tab we're removing is the selected tab, select the last non-header tab.
                                    var event = {};
                                    event.currentTarget = prev_li_elem;
                                    doc.ysview.onclickRuleset(event);
                                }
                                ul_elem.removeChild(li_elem);
                            }
                            break;
                        } else {
                            prev_li_elem = li_elem;
                        }
                    }
                    li_elem = li_elem.nextSibling;
                }
            } else {
                var id;
                li_elem = ul_elem.lastChild;
                while (li_elem) {
                    var index = li_elem.id.indexOf('label');
                    if (index !== -1) {
                        id = li_elem.id.substring(index+5);
                        break;
                    }
                    li_elem = li_elem.previousSibling;
                }

                id = Number(id)+1;
                li_elem = doc.createElement('li');
                li_elem.className = 'ruleset-' + ruleset.id;
                li_elem.id = 'label' + id;
                li_elem.onclick = function(event) {
                    doc.ysview.onclickRuleset(event);
                };
                li_elem.innerHTML = '<a href="#tab' + id + '">' + ruleset.name + '</a>';
                ul_elem.insertBefore(li_elem, ul_elem.lastChild); // lastChild is the "New Set" button.

                var event = {};
                event.currentTarget = li_elem;
                doc.ysview.onclickRuleset(event);
            }
        }

    },

    expandCollapseComponentType: function(doc, iconDiv, type, expand) {
        var table = doc.getElementById('components-table');
        var classname, index;
        var hiding;

        if (iconDiv === undefined) {
            iconDiv = doc.getElementById('icon-'+type);
            if (iconDiv === null) {
                return;
            }
        }

        index = iconDiv.className.indexOf('expand');
        if (index !== -1) {
            hiding = false;
        } else {
            index = iconDiv.className.indexOf('collapse');
            if (index !== -1) {
                hiding = true;
            }
        }

        if (expand !== undefined && typeof expand == "boolean" && expand === hiding) {
            return;
        }
        if (!hiding) {
            classname = iconDiv.className.substring(0, index);
            classname += 'collapse';
            classname += iconDiv.className.substring(index+6);
            iconDiv.className = classname;
        } else {
            classname = iconDiv.className.substring(0, index);
            classname += 'expand';
            classname += iconDiv.className.substring(index+8);
            iconDiv.className = classname;
        }

        if (hiding !== undefined && table) {
            for (var i = 0; i < table.rows.length; i++) {
                var row = table.rows[i];
                if (row.className.indexOf('type-' + type) !== -1) {
                    if (hiding) {
                        row.style.visibility = "collapse";
                        // next sibling should be its header, collapse it too.
                        var header = row.nextSibling;
                        if (header.id.indexOf('compHeaders') !== -1) {
                            header.style.visibility = "collapse";
                        }
                    } else {
                        row.style.visibility = "visible";
                    }
                }
            }
        }

        // now check all type and see if we need to toggle "expand all" and "collapse all".
        var expandAllDiv = doc.getElementById('expand-all-text');
        if (expandAllDiv) {
            var types = AINSPECTOR.peeler.types;
            var checkExpand = false;

            if (expandAllDiv.innerHTML.indexOf('Expand') !== -1) {
                checkExpand = true;
            }

            for (var i = 0; i < types.length; i++) {
                var div = doc.getElementById('icon-' + types[i]);
                if (div) {
                    if (checkExpand) {
                        if (div.className.indexOf('expand') !== -1) {
                            break;
                        }
                    } else {
                        if (div.className.indexOf('collapse') !== -1) {
                            break;
                        }
                    }
                }
            }
            if (i === types.length) {
                // need to toggle
                if (checkExpand) {
                    expandAllDiv.innerHTML = 'Collapse All';
                } else {
                    expandAllDiv.innerHTML = 'Expand All';
                }
            }
        }
    },

    expandAllComponentType: function(doc) {
        var types = AINSPECTOR.peeler.types;
        var iconDiv, text;
        var expand = false;

        var elem = doc.getElementById('expand-all-text');
        if (elem) {
            if (elem.innerHTML.indexOf('Expand') !== -1) {
                expand = true;
            }
        }

        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            iconDiv = doc.getElementById('icon-'+type);
            if (iconDiv) {
                this.expandCollapseComponentType(doc, iconDiv, type, expand);
            }
        }

        if (elem) {
            elem.innerHTML = (expand ? 'Collapse All' : 'Expand All' );
        }
    },

    regenComponentsTable: function(doc, column_name, sortDesc, cset) {
        var table = doc.getElementById('components-table');

        if (table) {
            if (sortDesc === undefined) {
                sortDesc = false;
            }
            var tableHtml = this.genComponentsTable(cset.components, column_name, sortDesc);
            table.parentNode.innerHTML = tableHtml;
        }
    },

    saveRuleset: function(doc) {
        var form = doc.getElementById('edit-form');
        if (form) {
            var ruleset = {};
            ruleset.custom = true;
            ruleset.rules = {};
            ruleset.weights = {};

            var saveas_name;
            var ruleset_name;
            var ruleset_id;
            var weights = {};

            for (var i = 0; i < form.elements.length; i++) {
                var elem = form.elements[i];
                var index;

                // build out ruleset object with the form elements.
                if (elem.name == 'rules' && elem.type == 'checkbox') {
                    if (elem.checked) {
                        ruleset.rules[elem.value] = {};
                    }
                } else if (elem.name == 'saveas-name') {
                    saveas_name = elem.value;
                } else if (elem.name == 'ruleset-name') {
                    ruleset_name = elem.value;
                } else if (elem.name == 'ruleset-id') {
                    ruleset_id = elem.value;
                } else if ((index = elem.name.indexOf('weight-')) !== -1) {
                    weights[elem.name.substring(index)] = elem.value;
                }
            }
            for (var id in ruleset.rules) {
                if (weights[id] !== undefined) {
                    ruleset.weights[id] = weights[id];
                }
            }

            if (saveas_name !== undefined) {
                ruleset.id = saveas_name.replace(/\s/g, "-");
                ruleset.name = saveas_name;
            } else {
                ruleset.id = ruleset_id;
                ruleset.name = ruleset_name;
            }

            // register ruleset
            if (ruleset.id && ruleset.name) {
                AINSPECTOR.registerRuleset(ruleset);

                // save to pref
                if (ruleset.custom === true) {
                    var numCustomRuleset = AINSPECTOR.util.Preference.getPref("numCustomRuleset", 0);
                    numCustomRuleset++;
                    AINSPECTOR.util.Preference.setPref("customRuleset"+numCustomRuleset, JSON.stringify(ruleset, null, 2));
                    AINSPECTOR.util.Preference.setPref("numCustomRuleset", numCustomRuleset);
                }

                // update UI
                if (saveas_name !== undefined) {
                    this.rulesetEditUpdateTab(doc, ruleset, 1);
                    doc.ysview.updateRulesetList();
                }
            }
        }
    },

    deleteRuleset: function(doc) {
        var ruleset_id = this.getEditFormRulesetId(doc);
        var ruleset = AINSPECTOR.controller.removeRuleset(ruleset_id);
        if (ruleset) {
            // update UI
            this.rulesetEditUpdateTab(doc, ruleset, -1);
            doc.ysview.updateRulesetList();

            // To do: remove from pref
        }
    },

    getEditFormRulesetId: function(doc) {
        var aInputs = doc.getElementsByName('ruleset-id');
        if (aInputs.length > 0) {
            return aInputs[0].value;
        }
        return undefined;
    }

});
}