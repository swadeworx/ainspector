/*
 * Copyright 2011-2012 OpenAjax Alliance
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
/*                            LogRuleItem                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor LogRuleItem 
 *
 * @memberOf OpenAjax.a11y.cache
 * 
 * @desc Constructor to log information about a rule and its execution time
 *
 * @property  {String}  id       - id of the rule
 * @property  {String}  message  - Message related to rule execution time or errors
 * @property  {Number}  time     - time to execute the rule in milleseconds 
 */

OpenAjax.a11y.LogRuleItem = function () {
 this.id = "";
 this.message = "";
 this.time  = 0;   
};

/* ---------------------------------------------------------------- */
/*                        LogRequirementItem                        */
/* ---------------------------------------------------------------- */

/**
 * @constructor LogRequirementItem 
 *
 * @memberOf OpenAjax.a11y
 * 
 * @desc Constructor to log information about a requirement and its execution time
 *
 * @property  {String}  id       - id of the rule
 * @property  {String}  message  - Message related to rule execution time or errors
 * @property  {Number}  time     - time to execute the rule in milleseconds 
 * @property  {Array}   rules    - List of log rule items associated with the requirement 
 */

OpenAjax.a11y.LogRequirementItem = function () {
 this.id = "";
 this.message = "";
 this.time = 0;
 this.rules = new Array(); 
};

/**
 * @method addLogRule 
 *
 * @memberOf OpenAjax.a11y.LogRequirementItem
 * 
 * @desc Adds a log rule object information to a requirement
 *
 * @param  {LogRuleItem}  rule_item  - Log rule item to add to list of rule items
 */

OpenAjax.a11y.LogRequirementItem.prototype.addLogRule = function ( rule_item ) {

 if ( rule_item ) {
  this.rules.push(rule_item);
 } // endif 

};

/* ---------------------------------------------------------------- */
/*                              Log                                 */
/* ---------------------------------------------------------------- */

/** 
 * @constructor Log 
 *
 * @memberOf OpenAjax.a11y
 * 
 * @desc Constructor for a Log Object that represents the progress 
 *    and stores the execution times of document evaluation
 *
 * @param  {String}  ruleset_id  -  Id of the current ruleset being used for evaluation  
 * @param  {String}  ruleset_name        - ruleset_name of the document being evaluates
 * @param  {Number}  total       - 
 *
 * @param  {Function}  progressCallBackFunction  - Function that is periodically called with progress information
 *
 * @propery  {String}  ruleset_id   -  Id of the ruleset used in the evaluation  
 * @propery  {String}  ruleset_name         -  ruleset_name of the ruleset being evaluated
 *
 * @propery  {Number}  rules_max   - Total number of rules to process
 * @propery  {Number}  rule_count  - Current number of rules processed
 * 
 * @propery  {Number}  cache_time  - Time to process the cache
 * @propery  {Number}  total_time  - Time to process the cache and rules 
 *
 * @propery  {Function}  progressCallBackFunction  - Call back function to provide information to the user on status
 *
 * @propery  {Array}  requirements  -  Array of requirement objects    
 *
 * @propery  {Number}  start_time   - Time the evaluation started         
 * @propery  {Number}  last_time    - Time of last rule         
 * @propery  {Number}  last_requirement_time - Time of last requirement
 *  
 * @propery  {LogRequirementItem}  last_requirement_item 
 */

OpenAjax.a11y.Log = function (ruleset_id, ruleset_name, total, progressCallBackFunction) {

 this.ruleset_id    = ruleset_id;
 this.ruleset_name  = ruleset_name;
 this.rules_max = total;
 this.cache_time  = 0;
 this.total_time  = 0;
 this.progressCallBackFunction = progressCallBackFunction;
 this.requirements = new Array();   
 
 this.start_time = new Date().getTime();
 this.last_time = this.start_time;
   
 this.last_requirement_item = null;
 this.last_requirement_time = this.start_time;
 
 this.rule_count = 0;

};

/** 
 * @method addLogRequirement 
 *
 * @memberOf OpenAjax.a11y.Log
 * 
 * @desc Adds a LogRequirementObject information to the Log
 */

OpenAjax.a11y.Log.prototype.addLogRequirement = function (requirement_item) {
  
 if ( requirement_item ) {
  this.requirements.push(requirement_item);
 } // endif 
  
 };  
  
/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a text string representation of a Log object 
 *
 * @return {String} Returns a text string representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toString = function () {
  
 var str ="";
    
 var log_requirements_length = this.requirements.length;
    
 str += "Ruleset ID   : " + this.ruleset_id + "\n";
 str += "Ruleset Name : " + this.ruleset_name + "\n";
 str += "Cache Creation Time : " + this.timeInMillisecondToString(this.cache_time) + "\n";
 str += "Rule Execution Time : " + this.timeInMillisecondToString(this.total_time-this.cache_time) + "\n";
 str += "Total Time          : " + this.timeInMillisecondToString(this.total_time) + "\n";   
    
 for (var i=0; i < log_requirements_length; i++ ) {

  str += "\nRequirement " + this.requirements[i].message + ": " + this.timeInMillisecondToString(this.requirements[i].time) + "\n";
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (var j=0; j <log_rule_length; j++) {
   str += " Rule " + this.requirements[i].rules[j].message + ": " + this.timeInMillisecondToString(this.requirements[i].rules[j].time) + "\n";    
  } // endloop
    
 } // end loop
    
 return str;
};  
  

/**
 * @method toXML
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a xml representation of a Log object 
 *
 * @return {String} Returns a xml representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toXML = function () {
   
 var i, j;  
 var str = "<!-- All times are in milliseconds -->\n";
 str +="<oaa-log>\n";
    
 var log_requirements_length = this.requirements.length;
    
 str += " <ruleset-id>"   + this.ruleset_id   + "</ruleset-id>\n";
 str += " <ruleset-name>" + this.ruleset_name + "</ruleset-name>\n";
 str += " <cache-time>"   + this.cache_time   + "</cache-time>\n";
 str += " <rule-time>"    + (this.total_time-this.cache_time) + "</rule-time>\n";
 str += " <total-time>"   + this.total_time   + "</total-time>\n";   

 str += " <requirements>\n";   

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  <requirement id='"+ this.requirements[i].id+ "'>\n";
  str += "   <message>"   + this.requirements[i].message + "</message>\n";
  str += "   <time>"     + this.requirements[i].time + "</time>\n";
  str += "   <rules>\n";   
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (j=0; j <log_rule_length; j++) {

   str += "    <rule id='" + this.requirements[i].rules[j].id+ "'>\n";
   str += "     <message>" + this.requirements[i].rules[j].message + "</message>\n";
   str += "     <time>"  + this.requirements[i].rules[j].time + "</time>\n";
   str += "    </rule>\n";

  } // endloop

  str += "   </rules>\n";   
    
 } // end loop

 str += " </requirements>\n";   
 str +="</oaa-log>\n";

 return str;
};  
  

/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Creates a json representation of a Log object 
 *
 * @return {String} Returns a json representation of a Log object
 */
  
OpenAjax.a11y.Log.prototype.toJSON = function () {
      
 var i, j;     
 var str ="{\n";
       
 str += " \"ruleset_id\"     : \"" + this.id              + "\",\n";
 str += " \"ruleset_name\"    : \"" + this.ruleset_name + "\",\n";
 str += " \"cache-time\" : " + this.cache_time          + ",\n";
 str += " \"rule-time\" : " + (this.total_time-this.cache_time) + ",\n";
 str += " \"total-time\" : " + this.total_time          + ",\n";   

 str += " \"requirements\" : [\n";   

 var log_requirements_length = this.requirements.length;

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  { \"requirement_id\"   : \"" + this.requirements[i].id+ "\",\n";
  str += "   \"message\" : \"" + this.requirements[i].message + "\",\n";
  str += "   \"time\"  : " + this.requirements[i].time + ",\n";
     
  var log_rule_length = this.requirements[i].rules.length;

  if (log_rule_length) {
   str += "   \"rules\"  : [\n";   
   for (j=0; j <log_rule_length; j++) {

    str += "    { \"rule_id\"   : \"" + this.requirements[i].rules[j].id + "\",\n";
    str += "     \"message\" : \"" + this.requirements[i].rules[j].message + "\",\n";
    str += "     \"time\"  : " + this.requirements[i].rules[j].time + "\n";
    str += "    },\n";

   } // endloop
   str += "   ]\n";
  }
  else {
   str += "   \"rules\"  : []\n";   
  }
  str += "  },\n";
 } // end loop

 str += " ],\n";   
 str +="}\n";

 return str;
};  

/**
 * @method consoleStatusLog
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Outputs progress information to the Firefox console
 *
 * @param {String}  message  - Message to output to the console 
 * @param {Object}  time     - Object DateTime object of the current time
 */
  
OpenAjax.a11y.Log.prototype.consoleStatusLog = function ( message, time ) {
 
 if (!OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE) return;
  
 if (typeof time == 'number') {
  OpenAjax.a11y.logger.debug( message + ": " + this.timeInMillisecondToString(time) + " (" + this.rule_count + " of " + this.rules_max +")");
 }
 else {
  OpenAjax.a11y.logger.debug( message );    
 }
}; 

/**
 * @method update
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Calculates execution time and updates progress information
 *
 * @param  {Number}  state    - Numerical value representing the current 
 *                              progress in updating the cache and evaluating rules 
 * @param  {String}  message  - Progress message
 * @param  {String}  rule_id  - id of the current rule being processed
 */
  
OpenAjax.a11y.Log.prototype.update = function (state, message, rule_id) {

 var PROGRESS = OpenAjax.a11y.PROGRESS;   

 var time    = new Date().getTime();
 var change   = time - this.last_time;    
 
 this.total_time = time - this.start_time;    
 this.last_time = time;
    
 switch (state) {
    
 case PROGRESS.START:   
  this.start_time = time;
  this.consoleStatusLog(message, null); 
  break;
     
 case PROGRESS.CACHE_START:
  this.cache_start_time = time;
  this.consoleStatusLog(message, change); 
  break;

 case PROGRESS.CACHE_END:
  this.cache_time = this.cache_time + (time-this.cache_start_time);
  this.consoleStatusLog(message, change); 
  break;


 case PROGRESS.REQUIREMENT:
    
  var requirement_item = new OpenAjax.a11y.LogRequirementItem();
  requirement_item.id = rule_id;
  requirement_item.message = message;
     
  this.addLogRequirement( requirement_item );
     
  if (this.last_requirement_item) {
   this.last_requirement_item.time = time - this.last_requirement_time;
   this.consoleStatusLog(" Total Time for " + this.last_requirement_item.message, this.last_requirement_item.time);
  } 
  
  this.last_requirement_item = requirement_item;
  this.last_requirement_time = time;     
  this.consoleStatusLog(message, null); 
  break;

 case PROGRESS.RULE:
  var log_rule = new OpenAjax.a11y.LogRuleItem();
  log_rule.id = rule_id;
  log_rule.message = message;
  log_rule.time  = change;
  this.last_requirement_item.addLogRule( log_rule );
  this.consoleStatusLog(" " + message, change); 
  this.rule_count++; 
  break;

 case PROGRESS.COMPLETE:
     
  if (this.last_requirement_item) {
    this.last_requirement_item.time = time - this.last_requirement_time;
    this.consoleStatusLog(" Total Time for " + this.last_requirement_item.message, this.last_requirement_item.time);
  } 
     
  this.consoleStatusLog(message, this.total_time); 
  break;

 default:
  break;
  
 } // end switch
 
 if ( this.progressCallBackFunction ) {
  var percent = Math.round((100 * this.rule_count) / this.rules_max);
  var progress_message = message + " (" + this.total_time + " milliseconds)";
  this.progressCallBackFunction(progress_message, percent);
 } 

}; 

/**
 * @method timeInMillisecondToString
 *
 * @memberOf OpenAjax.a11y.Log
 *
 * @desc Converts a Number to a string
 *
 * @param {Number}  time  - Current time in milliseconds
 * 
 * @return {String}  Return time in milliseconds
 */

OpenAjax.a11y.Log.prototype.timeInMillisecondToString = function (time) {
    
 if (time === 0) {
    return "<1 millisecond";
 }
 else {
  if (time === 1) {
   return "1 millisecond";
  }
  else {
   return time + " milliseconds";      
  }
 } 
    
}; 

  
