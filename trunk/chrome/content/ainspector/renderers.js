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
    	var sText = '<div id="stats-detail">'
            + '<div class="summary-row">Header Tree View</div>';

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

        var sHtml = '<tr class="' + row_class + ' type-' + comp.type + '"'
                    + (hidden ? ' style="visibility: collapse"' : '')
                    + '>';
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
                    }
                } else if (i == "size") {
                    value += AINSPECTOR.util.kbSize(comp.size);
                } else if (i == "url") {
                    if (comp.status >= 400 && comp.status < 500) {
                        sHtml += '<td class="' + sClass + '">' + AINSPECTOR.util.briefUrl(comp[i], 60) + ' (' + comp.status + ')</td>';
                        // skip the rest of the fields if this component has error.
                        continue;
                    } else {
                        value += AINSPECTOR.util.prettyAnchor(comp[i], comp[i], undefined, !AINSPECTOR.renderer.bPrintable, 60, 1, comp.type);
                    }
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
            }
        }
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
        }

        if (a === b) {
            // secondary sorting by ID to stablize the sorting algorithm.
            if (comp1.id > comp2.id) {
                return (desc) ? -1 : 1;
            }
            if (comp1.id < comp2.id) {
                return (desc) ? 1 : -1;
            }
        }

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
            }
        }

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
            }
            rulesetId.innerHTML = '<input type="hidden" name="ruleset-id" value="' + ruleset.id + '">';
            title.innerHTML = ruleset.name;
        } else {
            rulesetId.innerHTML = '';
            title.innerHTML = 'New';
        }

        var div = doc.getElementById('rulesetEditWeightsDiv');
        div.innerHTML = weightsText;
    }

};

AINSPECTOR.registerRenderer({
    id: 'html',
    supports: {
        images: 1,
        reportcard: 1,
        headings: 1,
        roles: 1,
        forms: 1,
        links: 1,
        tools: 1,
        rulesetEdit: 1
    },

    reportcardPrintableView: function(results, overall_grade, ruleset) {
    	try {
//	       var html = '<div id="reportDiv"><table><tr class="header"><td colspan="2"><h3>Overall Grade: ' + overall_grade
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
		            }
	
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
				            else {html += '<div class="passMsgTxt">' }
		                	html += result.severity[j] +  '<span class="message" style="color: black;">&nbsp;' + messages[j]+ '</span><br>';
		                }
	                }else {
	                	html += '<div class="message" style="color: black;">' + result.message + '</div>';
	                }
	 /*               if (result.components && result.components.length > 0) {
	                    html += '<ul class="comps-list">';
	                    for (var j = 0; j < result.components.length; j++) {
	                        if (typeof result.components[j] === "string") {
	                            html += '<li>' + result.components[j] + '</li>';
	                        } else if (result.components[j].url !== undefined) {
	                            html += '<li>' + result.components[j].url + '</li>';
	                        }
	                    }
	                    html += '</ul><br>';
	                }
	*/
	                html += '</p>'
	                        + '</td></tr>';
	            }
	        }
	        html += '</table></div>';
	        return html;
        } catch (err) {
        	FBTrace.sysout('reportcardPrintableView: ' + err.message);
        }
    },
    
    getFilterCode: function(categories, total) {
        var html;
        var array = [];
        for (var id in categories) {
            if (categories[id]) {
                array.push(id);
            }
        }
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

    reportcardView: function(resultset, uniqueID) {  
        var html = '<div id="reportDiv">';
        var appliedRuleset = resultset.getRulesetApplied();
        var results = resultset.getResults();
        var url = resultset.url;
        var title = 'Grade';

        if (AINSPECTOR.doc){
            if (AINSPECTOR.doc.view_names && AINSPECTOR.doc.view_names.grade) {
                title = AINSPECTOR.doc.view_names.grade;
            }
        }

        var overall_grade = AINSPECTOR.util.prettyScore(resultset.getOverallScore());

        if (AINSPECTOR.renderer.bPrintable) {
            return this.reportcardPrintableView(results, overall_grade, appliedRuleset);
        }

        html += '<div id="summary"><table><tr><td><div class="bigFont">' + title + '</div></td>' +
            '<td class="padding5"><div id="overall-grade" class="grade-' + overall_grade + '">' + overall_grade + '</div></td>' +
            '<td class="padding15">Overall performance score ' + parseInt(resultset.getOverallScore(), 10) + '</td>' +
            '<td class="padding15">Ruleset applied: ' + appliedRuleset.name + '</td>' +
            '<td class="padding15">URL: ' + AINSPECTOR.util.briefUrl(url, 100) + '</td>' +
            '</tr></table></div>';


        var tab_label_html = '';
        var tab_html = '';
        var categories = {};

        for (var i = 0; i < results.length; i++) {
            var result = results[i];
            if (typeof result === "object") {
                var grade = AINSPECTOR.util.prettyScore(result.score);
                var index = i + 1;
                var sClass = '';
                var grade_class = 'grade-' + (grade == "N/A" ? 'NA' : grade);
                var score = parseInt(result.score, 10);
                if (isNaN(score) || result.score === -1) {
                    score = "n/a";
                } else {
                    score += "%";
                }

                tab_label_html += '<li' + ' id="label' + index + '"';
                if (i === 0) {
                    sClass += "first selected";
                }
                if (result.category) {
                    for (var k = 0; k < result.category.length; k++) {
                        if (sClass.length > 0) {
                            sClass += ' ';
                        }
                        sClass += result.category[k];
                        // update filter categories
                        if (categories[result.category[k]] === undefined) {
                            categories[result.category[k]] = 0;
                        }
                        categories[result.category[k]]++;
                    }
                }
                if (sClass.length > 0) {
                    tab_label_html += ' class="' + sClass + '"';
                }
                tab_label_html += ' onclick="javascript:document.ysview.onclickResult(event)">' +
                    '<a href="#" class="' + grade_class + '">' +
                    '<div class="tab-label">' +
                    '<span class="grade" title="' + score + '">' + grade + '</span>' +
                    '<span class="desc">' + result.name + '</span></div></a></li>';

                tab_html += '<div id="tab' + index + '" class="result-tab';
                if (i !== 0) {
                    tab_html += ' yui-hidden';
                }
                
                // SMF modification for displaying A11y and IITAA rule sets 
                // SMF added uniqueID[used to track context] parameter to AINSPECTOR.renderer.reportcardView() & AINSPECTOR.controller.render()                 
         //       if (appliedRuleset.id == 'OAAWCAG20' || appliedRuleset.id == 'WCAG_2_0' || appliedRuleset.id == 'IITAA' || appliedRuleset.id == 'icita07'|| appliedRuleset.id == 'icita08') {
                    tab_html += '"><h4>Grade ' + grade + ' on ' + result.name + '</h4>' + '<p>'
   	                //put in a place holder that will be accessed in view.js AINSPECTOR.view.show()
    	                tab_html += '<div id="' + uniqueID + "_" + result.rule_id + '"></div>'; 
    	/*        } else {                
	                var messages = result.message.split('\n');
	                if (messages) {
	                    result.message = messages.join('<br>');
	                }
	                tab_html += '"><h4>Grade ' + grade + ' on ' + result.name + '</h4><p>' + result.message + '<br>';
	
	                if (result.components && result.components.length > 0) {
	                    tab_html += '<ul class="comps-list">';
	                    for (var j = 0; j < result.components.length; j++) {
	                        if (typeof result.components[j] === "string") {
	                            tab_html += '<li>' + result.components[j] + '</li>';
	                        } else if (result.components[j].url !== undefined) {
	                            tab_html += '<li>' + AINSPECTOR.util.prettyAnchor(result.components[j].url, result.components[j].url, undefined, true, 120, undefined, result.components[j].type) + '</li>';
	                        }
	                    }
	                    tab_html += '</ul><br>';
	                }
	                tab_html += '</p>';
    	        } //SMF end modification for displaying A11y and IITAA rule sets 
         */       
                var rule = AINSPECTOR.controller.getRule(result.rule_id);

                if (rule) {
                    tab_html += '<hr><p class="rule-info">' + (rule.info ? rule.info : '** To be added **' ) + '</p>';

                    if (rule.url !== undefined) {
                        tab_html += '<p class="more-info"><a href="javascript:document.ysview.openLink(\'' +
                            rule.url + '\')"><b>&#187;</b>Read More</a></p>';

                    }
                }

                tab_html += '</div>';
            }
        }

        html += '<div id="reportInnerDiv">' + this.getFilterCode(categories, results.length) +
            '<div id="result" class="yui-navset yui-navset-left">' +
            '<ul class="yui-nav" id="tab-label-list">' + tab_label_html + '</ul>' +
            '<div class="yui-content">' + tab_html + '</div>' +
    //        '<div id="copyright2">' + AINSPECTOR.doc.copyright + '</div>' +
            '</div></div></div>';

        return html;
     	
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
            if (hiddenCols.indexOf(columns[i].getAttribute("id")) == -1) html += '<th>' + columns[i].textContent + '</th>';
            else skip += i + ' ';
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

        var allTRTags = topGridTable.getElementsByTagName('tr');
        for (var r=1; r<allTRTags.length; r++) {
	        var columns = allTRTags[r].getElementsByTagName("td");
		    html += '<tr>';
		    for (var i=0; i<columns.length; i++) {
		    	if (skip.indexOf(i + ' ') == -1) {
		    		html += '<td>' + columns[i].textContent.replace('<','&#60') + '</td>';
		    	}
		    }
		    html += '</tr>';
         }
       html += '</table></div>';
       return html;
	},
	
    treeTabPrintableView: function(tabName, tabData, titleText, ruleset, uniqueID) {
        var panel = FirebugContext.getPanel("AInspector");
        var parentNode = panel.document.getElementById(uniqueID + 'roles');
        var topGridTable = parentNode.getElementsByTagName('table')[0];
        var html = '<div id="reportDiv"><table summary="' + topGridTable.getAttribute('summary') + '">';
        var allTRTags = topGridTable.getElementsByTagName('tr');
        for (var r=0; r<allTRTags.length; r++) {
	        var columns = allTRTags[r].getElementsByTagName("td");
		    html += '<tr>';
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
        	if (tabName != 'roles')	return this.gridTabPrintableView(tabName, tabData, titleText, null, uniqueID);
        	else return this.treeTabPrintableView(tabName, tabData, titleText, null, uniqueID);;
        }

    	var sText = '';

        sText += '<div id="statsDiv">'
              + '<div id="summary"><span class="view-title">' + titleText + '</span></div>';

        //SMF put in a place holder that will be accessed in view.js AINSPECTOR.view.show()
        sText += '<div id="' + uniqueID + tabName + '"></div>'; 
        return sText;
    },

    toolsView: function(tools) {

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
    },

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