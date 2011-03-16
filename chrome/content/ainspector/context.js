/**
 * @class AINSPECTOR.context
 */
AINSPECTOR.context = function(doc, theWin) {
	this.theWin = theWin;
	this.document = doc;
	this.ruleset_id = AINSPECTOR.controller.default_ruleset_id;
//    this.component_set = null;
    this.result_set = null;
    this.images_set = null;
    this.headings_set = null;
    this.landmarks_set = null;
    this.roles_set = null;
    this.forms_set = null;
    this.links_set = null;
    this.onloadTimestamp = null;
    this.uniqueID = null;     /* SMF added uniqueID[used to track context] parameter to AINSPECTOR.renderer.reportcardView() & AINSPECTOR.controller.render() */

    // reset renderer variables
    /* AINSPECTOR.renderer.reset();*/

    this.PAGE = {
        statusbar: false,
        overallScore: 0,

        t_done: undefined
    };

    this.output_format = 'html';
};

AINSPECTOR.context.prototype = {

    genPerformance: function(doc) {
        if (this.result_set === null) {
            if (doc === undefined) {
                doc = window.top.content.document;
            }
            AINSPECTOR.controller.lint(doc, this);

            var now = new Date();
            this.uniqueID = now.getTime()
        }

        return AINSPECTOR.controller.render(this.output_format, 'reportcard', { 'result_set': this.result_set }, this.uniqueID);
    },

    genTab: function(tabName) {
    	var tabdata = null;
        if ( !this.uniqueID ) {
            var now = new Date();
            this.uniqueID = now.getTime()
       }
      switch(tabName) {
        case "images": tabdata = this.images_set = AINSPECTOR.view.getImagesEle(this.theWin); break;
        case "headings": tabdata = this.headings_set = AINSPECTOR.view.getheadingsEle(this.theWin); break;
        case "landmarks": tabdata = this.landmarks_set = AINSPECTOR.view.getLandmarks(this.theWin, tabName); break;
        case "roles": tabdata = this.roles_set = AINSPECTOR.view.getLandmarks(this.theWin, tabName); break;
        case "forms": tabdata = this.forms_set = AINSPECTOR.view.getFormsEle(this.theWin); break;
        case "links": tabdata = this.links_set = AINSPECTOR.view.getLinkEle(this.theWin); break;
       }

       return AINSPECTOR.controller.render(this.output_format, tabName, { 'tabdata': tabdata }, this.uniqueID);
    },

    genToolsView: function() {
        var tools = AINSPECTOR.Tools.getAllTools();
        return AINSPECTOR.controller.render(this.output_format, 'tools', { 'tools' : tools });
    },

    genRulesetEditView: function() {
        return AINSPECTOR.controller.render(this.output_format, 'rulesetEdit', { 'rulesets' : AINSPECTOR.controller.getRegisteredRuleset() });
    }

};