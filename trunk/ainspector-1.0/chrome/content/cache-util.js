var AINSPECTOR_FB = AINSPECTOR_FB || {};

with (FBL) {

  AINSPECTOR_FB.cacheUtil = {
	
    /**
     * @function updateCache
     * 
     * @desc calls evaluate function of the rule set selected. 
     * 
     * @return ruleset_result_cache 
     */
    updateCache: function() {

      var ruleset_result_cache;
      try { 
        var doc = window.content.document;
      } catch(e) {
        var doc  = window.opener.parent.content.document;
      } // end try

      /*cache_object = new OpenAjax.a11y.RulesetEvaluation();
      FBTrace.sysout("cache_object: ", cache_object);
      cache_object.init('WCAG_2_0', 'en-us', doc.location.href, doc.title, doc, null);
      cache_object.evaluate(true);
      cache_object.dom_cache.links_cache.sortLinkElements('document_order', true);
      FBTrace.sysout("cache...............", cache_object);*/
      
      var ruleset_id = 'WCAG20_TRANS';
      var ruleset = OpenAjax.a11y.all_rulesets.getRuleset(ruleset_id);
      FBTrace.sysout("inside updateCache - ruleset : ", ruleset);

      if (ruleset) {
    	ruleset_result_cache = ruleset.evaluate(doc.location.href, doc.title, doc, null, true);
        FBTrace.sysout("Ruleset results object for: " , ruleset_result_cache);
      }
      else {
    	FBTrace.sysout("  ** Ruleset with the id '" + ruleset_id + "' not found!!");
      }
      
      return ruleset_result_cache;
    }
  };
};