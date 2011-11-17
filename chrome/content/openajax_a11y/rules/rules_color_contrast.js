//
// OpenAjax Alliance Rules 
// Rule group: Styling Rules
//
OpenAjax.a11y.addRules([
      
 // ------------------------
 // Color 1: Color contrast ratio must be > 4.5 for normal text, or > 3.1 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 {
   id              : 'COLOR_1', 
   lastUpdated     : '2011-07-11', 
   cacheDependency : 'color_contrast_cache',
   cacheProperties : ['font_size', 'font_weight', 'color_hex', 'background_color_hex', 'background_image', 'color_contrast_ratio'],
   language        : "",
   enabled         : true,  
   validate    : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 4.5;
      var MIN_CCR_LARGE_FONT =  3.1;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_elements_len;
      var de;

      var severity;
      var message_id;
      var args = [];
     
      for (i=0; i<color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];
   
        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = rule_result.rule_severity;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_elements_len = cci.dom_elements.length;

        for (j=0; j<dom_elements_len; j++) {
          de = cci.dom_elements[j];
          if (de.computed_style.graphical === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, de, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', []);
          }
        } // end loop
   
      } // end loop  
      
    } // end validate function
 },
 
 // ------------------------
 // Color 2: Color contrast ratio must be > 7 for normal text, and > 4.5 for large text
 // Group 7: Styling Rule
 // 
 // Last update: 2011-03-31
 // ------------------------
	     
 {
   id       : 'COLOR_2', 
   lastUpdated   : '2011-07-11', 
   cacheDependency : 'color_contrast_cache',
   cacheProperties : ['font_size', 'font_weight', 'color_hex', 'background_color_hex', 'background_image', 'color_contrast_ratio'],
   language    : "",
   enabled     : true,  
   validate    : function (dom_cache, rule_result) {
  
      var MIN_CCR_NORMAL_FONT = 7;
      var MIN_CCR_LARGE_FONT = 4.5;
  
      var SEVERITY = OpenAjax.a11y.SEVERITY;
  
      var i;
      var j;
  
      var color_contrast_len = dom_cache.color_contrast_cache.color_contrast_items.length;
      var cci;
   
      var dom_elements_len;
      var de;

      var severity;
      var message_id;
      var args = [];

     
      for (i=0; i<color_contrast_len; i++) {
   
        cci = dom_cache.color_contrast_cache.color_contrast_items[i];
   
        if ((cci.color_contrast_ratio >= MIN_CCR_NORMAL_FONT) ||
          ((cci.color_contrast_ratio >= MIN_CCR_LARGE_FONT) && (cci.is_large_font))) {
     
          // Passes color contrast requirements
          if (cci.background_image == "none") {
            severity  = SEVERITY.PASS;
            message_id = 'MESSAGE_PASS';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_PASS';
            args = [cci.color_contrast_ratio];
          }           
        }
        else {
        
          // Fails color contrast requirements
          if (cci.background_image == "none") {
            severity  = rule_result.rule_severity;
            message_id = 'MESSAGE_FAIL';
            args = [cci.color_contrast_ratio];
          }
          else {
            severity  = SEVERITY.MANUAL_EVALUATION;
            message_id = 'MESSAGE_MANUAL_FAIL';
            args = [cci.color_contrast_ratio];
          }     
        }

        // update all the DOM Element nodes associated with the Color Contrast Item

        dom_elements_len = cci.dom_elements.length;

        for (j=0; j<dom_elements_len; j++) {
          de = cci.dom_elements[j];
          if (de.computed_style.graphical === OpenAjax.a11y.VISIBILITY.VISIBLE) {
            rule_result.addResult(severity, de, message_id, args);
          } 
          else {
            rule_result.addResult(SEVERITY.HIDDEN, de, 'MESSAGE_HIDDEN', []);
          }
        } // end loop
   
      } // end loop    
    }
  }
       
      
 ]); 


    

