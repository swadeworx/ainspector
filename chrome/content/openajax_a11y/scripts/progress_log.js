  // ****************************************************** 
  //
  // Copyright 2011 OpenAjax Alliance
  //
  // Licensed under the Apache License, Version 2.0 (the "License");
  // you may not use this file except in compliance with the License.
  // You may obtain a copy of the License at
  //
  //  http://www.apache.org/licenses/LICENSE-2.0
  //
  // Unless required by applicable law or agreed to in writing, software
  // distributed under the License is distributed on an "AS IS" BASIS,
  // WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  // See the License for the specific language governing permissions and
  // limitations under the License.
  //
  // ****************************************************** 
  


/** ================================================================
*
* OpenAjax.a11y.LogRuleItem 
*
* @desc Constructor to log information about a rule and its execution time
*
* @return LogRuleItem object
*
* =============================================================== */

OpenAjax.a11y.LogRuleItem = function () {
 this.id = "";
 this.message = "";
 this.time  = 0;   
};

/** ================================================================
*
* OpenAjax.a11y.LogRequirementItem 
*
* @desc Constructor to log information about a requirement and its execution time
*
* @return LogRequirementItem object
*
* =============================================================== */

OpenAjax.a11y.LogRequirementItem = function () {
 this.id = "";
 this.message = "";
 this.time = 0;
 this.rules = new Array(); 
};

/** ================================================================
*
* OpenAjax.a11y.LogRequirementItem.addLogRule 
*
* @desc Adds a LogRuleObject information to a requirement
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.LogRequirementItem.prototype.addLogRule = function ( rule_item ) {

 if ( rule_item ) {
  this.rules.push(rule_item);
 } // endif 

};

/** ================================================================
*
* OpenAjax.a11y.Log 
*
* @desc Constructor for a Log Object that represents the progress 
*    and stores the execution times of document evaluation
*
* @return Log object
*
* =============================================================== */


OpenAjax.a11y.Log = function (ruleset_id, name, total, progressCallBackFunction) {

 this.id      = ruleset_id;
 this.name     = name;
 this.total_count  = total;
 this.cache_time  = 0;
 this.total_time  = 0;
 this.progressCallBackFunction = progressCallBackFunction;
 this.requirements = new Array();   
 
 this.start_time = new Date().getTime();
 this.last_time = this.start_time;
   
 this.last_requirement_item = null;
 this.last_requirement_time = this.start_time;
 
 this.count = 0;

};

/** ================================================================
*
* OpenAjax.a11y.Log.addLogRequirement 
*
* @desc Adds a LogRequirementObject information to the Log
*
* @return nothing
*
* =============================================================== */

OpenAjax.a11y.Log.prototype.addLogRequirement = function (requirement_item) {
  
 if ( requirement_item ) {
  this.requirements.push(requirement_item);
 } // endif 
  
 };  
  
/** ================================================================
*
* OpenAjax.a11y.Log.toString 
*
* @desc Generates a String of the log information
*
* @return String of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toString = function () {
  
 var str ="";
    
 var log_requirements_length = this.requirements.length;
    
 str += "ID         : " + this.id + "\n";
 str += "Name        : " + this.name + "\n";
 str += "Cache Creation Time : " + this.timeInMillisecondToString(this.cache_time) + "\n";
 str += "Rule Execution Time : " + this.timeInMillisecondToString(this.total_time-this.cache_time) + "\n";
 str += "Total Time     : " + this.timeInMillisecondToString(this.total_time) + "\n";   
    
 for (var i=0; i < log_requirements_length; i++ ) {

  str += "\nRequirement " + this.requirements[i].message + ": " + this.timeInMillisecondToString(this.requirements[i].time) + "\n";
     
  var log_rule_length = this.requirements[i].rules.length;
    
  for (var j=0; j <log_rule_length; j++) {
   str += " Rule " + this.requirements[i].rules[j].message + ": " + this.timeInMillisecondToString(this.requirements[i].rules[j].time) + "\n";    
  } // endloop
    
 } // end loop
    
 return str;
};  
  

/** ================================================================
*
* OpenAjax.a11y.Log.toXML 
*
* @desc Generates a XML representations of the log information
*
* @return XML formatted string text of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toXML = function () {
   
 var i, j;  
 var str = "<!-- All times are in milliseconds -->\n";
 str +="<oaa-log>\n";
    
 var log_requirements_length = this.requirements.length;
    
 str += " <id>"      + this.id  + "</ruleset-id>\n";
 str += " <name>"     + this.name + "</ruleset-title>\n";
 str += " <cache-time>"  + this.cache_time  + "</cache-time>\n";
 str += " <rule-time>"   + (this.total_time-this.cache_time) + "</rule-time>\n";
 str += " <total-time>"  + this.total_time  + "</total-time>\n";   

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
  

/** ================================================================
*
* OpenAjax.a11y.Log.toJSON 
*
* @desc Generates a JSON representations of the log information
*
* @return JSON formatted string text of the log information
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.toJSON = function () {
      
 var i, j;     
 var str ="{\n";
       
 str += " \"id\"     : \"" + this.id              + "\",\n";
 str += " \"name\"    : \"" + this.name             + "\",\n";
 str += " \"cache-time\" : " + this.cache_time          + ",\n";
 str += " \"rule-time\" : " + (this.total_time-this.cache_time) + ",\n";
 str += " \"total-time\" : " + this.total_time          + ",\n";   

 str += " \"requirements\" : [\n";   

 var log_requirements_length = this.requirements.length;

 for (i=0; i < log_requirements_length; i++ ) {

  str += "  { \"id\"   : \"" + this.requirements[i].id+ "\",\n";
  str += "   \"message\" : \"" + this.requirements[i].message + "\",\n";
  str += "   \"time\"  : " + this.requirements[i].time + ",\n";
     
  var log_rule_length = this.requirements[i].rules.length;

  if (log_rule_length) {
   str += "   \"rules\"  : [\n";   
   for (j=0; j <log_rule_length; j++) {

    str += "    { \"id\"   : \"" + this.requirements[i].rules[j].id + "\",\n";
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

/** ================================================================
*
* OpenAjax.a11y.Log.consoleStatusLog
*
* @desc Outputs progress information to the Firefox console
*
* @param message String Message to output to the console 
* @param time   Object DateTime object of the current time
* 
* @return nothing
*
* =============================================================== */
  
OpenAjax.a11y.Log.prototype.consoleStatusLog = function ( message, time ) {
 
 if (!OpenAjax.a11y.LOG_MESSAGES_TO_CONSOLE) return;
  
 if (typeof time == 'number') {
  OpenAjax.a11y.console( message + ": " + this.timeInMillisecondToString(time) + " (" + this.count + " of " + this.total_count +")");
 }
 else {
  OpenAjax.a11y.console( message );    
 }
}; 

/** ================================================================
*
* OpenAjax.a11y.Log.update
*
* @desc Calculates execution time and updates progress information
*
* @param state  Number Numerical value representing the current 
*             progress in updating the cache and evaluating rules 
* @param message String Progress message
* @param rule_id String id of the current rule being processed
* 
* @return nothing
*
* =============================================================== */
  
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
  this.count++; 
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
  var percent = Math.round((100 * this.count) / this.total_count);
  var progress_message = message + " (" + this.total_time + " milliseconds)";
  this.progressCallBackFunction(progress_message, percent);
 } 

}; 

/** ================================================================
*
* OpenAjax.a11y.Log.timeInMillisecondToString
*
* @desc Calculates execution time and updates progress information
*
* @param time Number Current time in milliseconds
* 
* @return String of the time in milliseconds
*
* =============================================================== */

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

  
