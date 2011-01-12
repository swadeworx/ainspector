/**
 * @namespace AINSPECTOR
 * @class controller
 * @static
 */

AINSPECTOR.controller = {

    rules: {},

    rulesets: {},

    onloadTimestamp: null,

    renderers: {},

    default_ruleset_id: 'ydefault',
    
    run_pending: undefined,
    /**
     * Init code.  Add event listeners.
     */
    init: function() {

        // listen to onload event.
        AINSPECTOR.util.event.addListener("onload",
                                     function(e) {
                                         this.onloadTimestamp = e.time;
                                         setTimeout(function() { AINSPECTOR.controller.run_pending_event(); });
                                     }, this);

        // listen to onunload event.
        AINSPECTOR.util.event.addListener("onUnload",
                                     function(e) {
                                         this.onloadTimestamp = null;
                                         this.run_pending = undefined;
                                     }, this);

        // load custom ruleset
        var numCustomRuleset = AINSPECTOR.util.Preference.getPref("numCustomRuleset", 0);
        for (var i = 1; i <= numCustomRuleset; i++) {
            var value = AINSPECTOR.util.Preference.getPref("customRuleset"+i, "");
            if (value.length > 0) {
                var obj = JSON.parse(value, null);
                obj.custom = true;
                this.addRuleset(obj);
            }
        }  
 /*       var arr_rulesets = AINSPECTOR.util.Preference.getPrefList("customRuleset.", undefined);
        if (arr_rulesets && arr_rulesets.length > 0) {
            for (var i = 0; i < arr_rulesets.length; i++) {
                var value = arr_rulesets[i].value;
                if (typeof value === "string" && value.length > 0) {
                    var obj = JSON.parse(value, null);
                    obj.custom = true;
                    this.addRuleset(obj);
                }
            }
        } */
        

        this.default_ruleset_id = AINSPECTOR.util.Preference.getPref("defaultRuleset", 'WCAG_2_0');
        
        // load rule config preference
        this.loadRulePreference();
    },

    /**
     * Run controller to start peeler.
     *
     * @param win window object
     * @param yscontent ????
     * @param boolean value to indicate if triggered by autorun
     */
    run: function(win, yscontext, autorun) {

        var doc = win.document;
        var cset;

        if (!doc || ! doc.location || doc.location.href.indexOf("about:") == 0 ||
            "undefined" === typeof doc.location.hostname) {
            if (!autorun) {
                if (FBTrace.DBG_AINSPECTOR)
                    FBTrace.sysout("Ainspector.controller.run FAILS: Please enter a valid website address before running AInspector.");
            }
            return;
        }
      
        if (typeof yscontext == 'undefined') return;
        
        if (!yscontext.PAGE.loaded) {
            this.run_pending = {'win': win,  'yscontext': yscontext};
            // @todo: put up spining logo to indicate waiting for page finish loading.
 //           return;
        }

        AINSPECTOR.util.event.fire("peelStart", undefined);
        // Why was this line was commented out???
//        cset = AINSPECTOR.peeler.peel(doc, this.onloadTimestamp);
        // need to set yscontext_component_set before firing peelComplete,
        // otherwise, may run into infinite loop.
        yscontext.component_set = cset;
        AINSPECTOR.util.event.fire("peelComplete", {'component_set': cset });

        // notify ComponentSet peeling is done.
//        cset.notifyPeelDone();
        this.notified_fetch_done = true;
        AINSPECTOR.util.event.fire("componentFetchDone", {'component_set': this } );


    },

    /**
     * Start pending run function.
     */
    run_pending_event: function() {
        if (this.run_pending !== undefined) {
            this.run(this.run_pending.win, this.run_pending.yscontext, false);
            this.run_pending = undefined;
        }
    },

    lint: function(doc, yscontext, ruleset_id) {
        var ruleset = [], rule, i, results = [], conf;
        if (ruleset_id) {
            ruleset = this.rulesets[ruleset_id];
        } else if (this.default_ruleset_id) {
            ruleset = this.rulesets[this.default_ruleset_id];
        } else {
            // if no ruleset, take the first one available
            for (i in this.rulesets) {
                ruleset = this.rulesets[i];
                break;
            }
        }

 //       var weights = {};
        var total_weight = 0;
  /*      if (ruleset.weights !== undefined) {
            for (i in ruleset.rules) {
                var weight;
                if (ruleset.weights[i] === undefined) {
                    weight = 5; // default average
                } else {
                    weight = ruleset.weights[i];
                    if (weight < 0) {
                        weight = 0;
                    }
                    if (weight > 10) {
                        weight = 10;
                    }
                }
                total_weight += weight;
                weights[i] = weight;
            }
        }
*/
        var total_score = 0;

        for (i in ruleset.rules) {
            if (ruleset.rules[i] && i in this.rules) {
	            try {
	                rule = this.rules[i];
	                conf = AINSPECTOR.util.merge(rule.config, ruleset.rules[i]);

	                var result = rule.lint(doc, yscontext.component_set, conf);

	                // apply rule weight to result.
	                var weight = (ruleset.weights ? ruleset.weights[i]: undefined);
	                if (weight !== undefined) {
	                    weight = parseInt(weight, 10);
	                }
	                if (weight === undefined || weight < 0 || weight > 10) {
	                    weight = 5;
	                }
	                result.weight = weight;

	                if (result.score !== -1) {
	                    // -1 is reserved for n/a
	                    total_weight += result.weight;
	                    if (result.score < 0) {
	                        result.score = 0;
	                    }
	                }
	                if (result.score > 0) {
	                    total_score += result.score * ( result.weight !== undefined ? result.weight : 1 );
	                }

	                result.name = rule.name;
	                result.category = rule.category;
	                result.rule_id = i;

	                results[results.length] = result;
	            	
	            } catch (err) {
	                AINSPECTOR.util.dump("AINSPECTOR.controller.lint: " + i + "\n" + err);
	                AINSPECTOR.util.event.fire("lintError", {'rule': i, 'message': err });
	            }
            }
        }

        yscontext.PAGE.overallScore = total_score / (total_weight > 0 ? total_weight: 1);
        yscontext.result_set = new AINSPECTOR.ResultSet(results, yscontext.PAGE.overallScore, ruleset);
        yscontext.result_set.url = doc.URL ? doc.URL : doc.defaultView.location.href;
        return yscontext.result_set;

    },
    runTool: function(tool_id, yscontext, param) {
        var tool = AINSPECTOR.Tools.getTool(tool_id);
        try {
        if (typeof tool == "object") {
            var result = tool.run(window.top.content.document, yscontext.component_set, param);
            if (tool.print_output) {
                var html = '';
                if (typeof result == "object") {
                    html = result.html;
                } else if (typeof result == "string") {
                    html = result;
                }
                var doc = AINSPECTOR.util.getNewDoc();
                doc.body.innerHTML = html;
                var h = doc.getElementsByTagName('head')[0];
                var css;
                if (typeof result.css == "undefined") {
                    // use default.
                    var URI = 'chrome://ainspector/content/ainspector/css/tool.css';
                    var req2 = new XMLHttpRequest();
                    req2.open('GET', URI, false);
                    req2.send(null);
                    css = req2.responseText;
                } else {
                    css = result.css;
                }
                if (typeof css == "string") {
                    var l = doc.createElement("style");
                    l.setAttribute("type", "text/css");
                    l.appendChild(doc.createTextNode(css));
                    h.appendChild(l);
                }

                if (typeof result.js !== "undefined") {
                    var s = doc.createElement("script");
                    s.setAttribute("type", "text/javascript");
                    s.appendChild(doc.createTextNode(result.js));
                    h.appendChild(s);
                }           
            }
        } else {
            var message = tool_id + " is not a tool.";
            AINSPECTOR.util.dump(message);
            AINSPECTOR.util.event.fire("toolError", {'tool_id': tool_id, 'message': message});
        }
        } catch (err) {
            AINSPECTOR.util.dump("AINSPECTOR.controller.runTool: " + tool_id + "\n" + err);
            AINSPECTOR.util.event.fire("toolError", {'tool_id': tool_id, 'message': err});
        }
        return doc;
    },

    render: function(id, view, params, timestamp) {

        var renderer = this.renderers[id];
        var content = '';

        if (renderer.supports[view] !== undefined && renderer.supports[view] === 1) {
            switch (view) {
            case 'images':
                content = renderer.tabView(view, params.tabdata,FBL.$STR('imgGrid.title', 'a11y_bundle'), timestamp);
                break;
            case 'reportcard':
                content = renderer.reportcardView(params.result_set, timestamp);
                break;
            case 'headings':
                content = renderer.tabView(view, params.tabdata,FBL.$STR('headingsGrid.title', 'a11y_bundle'), timestamp);
                break;
            case 'roles':
                content = renderer.tabView(view, params.tabdata,FBL.$STR('rolesGrid.title', 'a11y_bundle'), timestamp);
                break;
            case 'forms':
                content = renderer.tabView(view, params.tabdata,FBL.$STR('formsGrid.title', 'a11y_bundle'), timestamp);
                break;
            case 'links':
                content = renderer.tabView(view, params.tabdata,FBL.$STR('linksGrid.title', 'a11y_bundle'), timestamp);
                break;
            case 'tools':
                content = renderer.toolsView(params.tools);
                break;
            case 'rulesetEdit':
                content = renderer.rulesetEditView(params.rulesets);
                break;
            }
        }
        return content;

    },

    getRenderer: function(id) {
        return this.renderers[id];
    },

    /**
     * @see AINSPECTOR.registerRule
     */
    addRule: function(rule) {
        // check AINSPECTOR.doc class for text
 /* SMF this code makes prevents my rulesets from loading
       if (AINSPECTOR.doc.rules && AINSPECTOR.doc.rules[rule.id]) {
            var doc_obj = AINSPECTOR.doc.rules[rule.id];
            if (doc_obj.name) {
                rule.name = doc_obj.name;
            }
            if (doc_obj.info) {
                rule.info = doc_obj.info;
            }
        }
*/
        var i, required = ['id','name', 'config', 'info' ,'lint'];
        for (i = 0; i < required.length; i++) {
            if (typeof rule[required[i]] === 'unefined') {
                throw new AINSPECTOR.Error('Interface error', 'Improperly implemented rule interface');
            }
        }
        if (this.rules[rule.id] !== undefined) {
            throw new AINSPECTOR.Error('Rule register error', rule.id + " is already defined.");
        }
        this.rules[rule.id] = rule;
    },

    addRuleset: function(ruleset) {
        var i, required = ['id', 'name', 'rules'];
        for (i = 0; i < required.length; i++) {
            if (typeof ruleset[required[i]] === 'undefined') {
                throw new AINSPECTOR.Error('Interface error', 'Improperly implemented ruleset interface');
            }
            if (this.checkRulesetName(ruleset.id) && update !== true) {
                throw new AINSPECTOR.Error('Ruleset register error', ruleset.id + " is already defined.");
            }
        }
        this.rulesets[ruleset.id] = ruleset;
    },

    removeRuleset: function(ruleset_id) {
        var ruleset = this.rulesets[ruleset_id];
        if (ruleset && ruleset.custom === true) {
            delete this.rulesets[ruleset_id];

            // if we are deleting the default ruleset, change default to 'ydefault'.
            if (this.default_ruleset_id == ruleset_id) {
                this.default_ruleset_id = 'ydefault';
                AINSPECTOR.util.Preference.setPref("defaultRuleset", this.default_ruleset_id);
            }
            return ruleset;
        }
        return null;
    },

    /**
     * Save ruleset to preference.
     * @param {AINSPECTOR.Ruleset} ruleset ruleset to be saved.
     */
    saveRulesetToPref: function(ruleset) {
        if (ruleset.custom === true) {
        	AINSPECTOR.util.Preference.setPref("customRuleset." + ruleset.id , JSON.stringify(ruleset, null, 2));
        }
    },

    /**
     * Remove ruleset from preference.
     * @param {AINSPECTOR.Ruleset} ruleset ruleset to be deleted.
     */
    deleteRulesetFromPref: function(ruleset) {
        if (ruleset.custom === true) {
        	AINSPECTOR.util.Preference.deletePref("customRuleset." + ruleset.id);
        }
    },

    getRuleset: function(ruleset_id) {
        return this.rulesets[ruleset_id];
    },

    addRenderer: function(renderer) {
        this.renderers[renderer.id] = renderer;
    },

    /**
     * Return an array of registered ruleset objects.
     */
    getRegisteredRuleset: function() {
        return this.rulesets;
    },

    /**
     * Return an array of registered rule objects.
     */
    getRegisteredRules: function() {
        return this.rules;
    },

    /**
     * Return the rule object identified by rule_id
     * @param rule_id
     * @return rule object.
     */
    getRule: function(rule_id) {
        return this.rules[rule_id];
    },

    /**
     * Check if name parameter is conflict with any existing ruleset name.
     * @param name
     * @return true if name conflicts, false otherwise.
     */
    checkRulesetName: function(name) {
        name = name.toLowerCase();
        for (var id in this.rulesets) {
            if (this.rulesets[id].id.toLowerCase() == name || this.rulesets[id].name.toLowerCase() == name) {
                return true;
            }
        }
        return false;
    },

    /*
     * This is intended to be called from UI when user chooses select a ruleset from toolbar.
     */
    setDefaultRuleset: function(id) {
        if (this.rulesets[id] !== undefined) {
            this.default_ruleset_id = id;
            // save to pref
            AINSPECTOR.util.Preference.setPref("defaultRuleset", id);
        }
    },

    /* 
    * Returns the ID of the default ruleset
    *
    * @return (string) id of the default rule set
    */

    getDefaultRuleset: function() {
        return this.rulesets[this.default_ruleset_id];
    },

    /* 
    * Returns the ID of the default ruleset
    *
    * @return (string) id of the default rule set
    */

    getDefaultRulesetId: function() {
        return this.default_ruleset_id;
    },

    /**
     * Load user preference for some rules. This is needed before enabling user writing ruleset yslow plugin.
     */
    loadRulePreference: function() {
        // CDN
        var cdn_hostnames = AINSPECTOR.util.Preference.getPref("cdnHostnames", "");
        if (cdn_hostnames && cdn_hostnames.length > 0) {
            var rule = this.getRule('ycdn');
            if (rule && rule.config.patterns) {
                var CDNs = cdn_hostnames.split(",");
                for (var i = 0; i < CDNs.length; i++) {
                    rule.config.patterns.push(CDNs[i]);
                }
            }
        }

        // minFutureExpiresSeconds
        var min_seconds = AINSPECTOR.util.Preference.getPref("minFutureExpiresSeconds", 2*24*60*60);
        if (min_seconds > 0) {
            var rule2 = this.getRule('yexpires');
            if (rule2) {
                rule2.config.howfar = min_seconds;
            }
        }
    },
    
    // ************************************************************************************************    
    
	getMaxSeverity: function(severityArr) {
		if (severityArr.length > 0) {
			var cssClass = ['failRow', 'warnRow', 'checkRow', 'checkRow', 'checkRow'];
			if (severityArr[0].indexOf('level.') != -1)	var level = ["level.violation", "level.potentialviolation", "level.recommendation", "level.potentialrecommendation", "level.manual"];
			else var level = ['msg.fail','msg.warn','msg.suggestion'];
			for (var i = 0; i < level.length; i++) {
				for (var j = 0; j < severityArr.length; j++) if (severityArr[j] == level[i]) return cssClass[i];
			}
		}
		return "passRow";
	},
	
    callAllParseNode: function(node) {
    	try {		
    		var targetRule;
			var retStruct = {
					msg: new Array(),
					attr: new Array(),
					severityCode: new Array()
				}
    		
    		var ruleset = this.rulesets[this.default_ruleset_id]; //AINSPECTOR.controller.getRuleset(AINSPECTOR.controller.default_ruleset_id); //'a11y'
            for (i in ruleset.rules) {
            	targetRule = AINSPECTOR.controller.rules[i];
            	// use the following to find which parseEle has failed
            	//FBTrace.sysout('callAllParseNode node.tagName: ' + node.tagName + ' targetRule ' + targetRule.id, targetRule);
    	        	if (targetRule.parseEle && node.tagName !== undefined) {
    		    	var issueObj = targetRule.parseEle(node.tagName.toLowerCase(),node);

    		    	if (issueObj != null) { //format the result for the A11y tab
    		    		if (targetRule.formatParseEleResults != undefined) {
    			    		targetRule.formatParseEleResults(issueObj, retStruct);
    		    		}
    		    	}
    	        }
            }//endfor
            return retStruct; 
            
    	} catch (exc){
    		FBTrace.sysout(exc);
    	}
    }

};
