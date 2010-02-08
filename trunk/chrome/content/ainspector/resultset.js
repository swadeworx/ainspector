/**
 * ResultSet class
 * @constructor
 */
AINSPECTOR.ResultSet = function(results, overall_score, ruleset_applied) {
    this.ruleset_applied = ruleset_applied;
    this.overall_score = overall_score;
    this.results = results;
};

AINSPECTOR.ResultSet.prototype = {

    getResults: function() {
        return this.results;
    },

    getRulesetApplied: function() {
        return this.ruleset_applied;
    },

    getOverallScore: function() {
        return this.overall_score;
    }

};