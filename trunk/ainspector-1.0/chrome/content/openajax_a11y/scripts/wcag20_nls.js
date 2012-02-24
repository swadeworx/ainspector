/*
 * Copyright 2011 and 2012 OpenAjax Alliance
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
/*                       WCAG20                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAG 2.0 information with properties with localized NLS values 
 *
 * @property  {Array}   nls - Associative array of WCAG 2.0 information 
 */

OpenAjax.a11y.WCAG20 = function() {

  this.nls = {};
  
};

/**
 * @method addNLS
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Adds a localized version of WCAG 2.0 requirements to the cache 
 *
 * @param  {string}  locale  - Language code of WCAG 2.0  
 * @param  {Object}  nls     - Localized WCAG 2.0 object
 */

OpenAjax.a11y.WCAG20.prototype.addNLS = function(locale, nls) {

  var item;
  var  p,  p_id,  np;  /* WCAG 2.0 Principle */
  var  g,  g_id,  ng;  /* WCAG 2.0 Guideline */
  var sc, sc_id, nsc;  /* WCAG 2.0 Success Criterion */

  // Validate the WCAG 2.0 NLS properties
  if (!nls.abbrev) OpenAjax.a11y.console("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  if (!nls.title)  OpenAjax.a11y.console("Missing title property for WCAG 2.0 with locale: "        + locale);
  if (!nls.url)    OpenAjax.a11y.console("Missing abbreviation property for WCAG 2.0 with locale: " + locale);
  
  var wcag20 = new OpenAjax.a11y.WCAG20NLS(locale, nls.abbrev, nls.title, nls.url);

//  OpenAjax.a11y.console("WCAG 2.0 " + nls.title + " for " + locale); 

  if (!nls.levels) OpenAjax.a11y.console("Missing levels object for WCAG 2.0 with locale: " + locale);

  
  if (!nls.principles || typeof nls.principles !== 'object') {
    OpenAjax.a11y.console("Missing principles object or not at an object for WCAG 2.0 with locale: " + locale);
    return;
  } else {
    for (p_id in nls.principles) {
    
      p = nls.principles[p_id];
      
//      OpenAjax.a11y.console("Principle " + p.title); 
      
      np = new OpenAjax.a11y.WCAG20NLSPrinciple(p_id, p.title, p.description, p.url);
      
      for (g_id in p.guidelines) {
      
        g = p.guidelines[g_id];
    
//        OpenAjax.a11y.console("  Guideline " + g.title); 
      
        ng = new OpenAjax.a11y.WCAG20NLSGuideline(np, g_id, g.title, g.description, g.url);

        for (sc_id in g.success_criteria) {
      
          sc = g.success_criteria[sc_id];
    
          sc = new OpenAjax.a11y.WCAG20NLSSuccessCriteria(np, ng, sc_id, sc.level, sc.title, sc.description, sc.url);
          
//          OpenAjax.a11y.console("    Success Criteria " + sc.title); 
      
          ng.success_criteria.push(sc); 
      
        } // end loop
        
        np.guidelines.push(ng); 
        
      } // end loop
      
      wcag20.principles.push(np); 
 
    } // end loop
  }
  
  this.nls[locale] = wcag20;
  
};

/**
 * @method getNLS
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements 
 *
 */

OpenAjax.a11y.WCAG20.prototype.getNLS = function() {

  return this.nls[OpenAjax.a11y.locale];
  
};



/**
 * @method getNLSItemById
 *
 * @memberOf OpenAjax.a11y.WCAG20
 *
 * @desc Returns an object with a localized version of WCAG 2.0 requirements 
 *
 */

OpenAjax.a11y.WCAG20.prototype.getNLSItemById = function(id) {

  var i, j, k;
  var p, g, sc;
  var wcag20_nls = this.nls[OpenAjax.a11y.locale];
  
  if (!wcag20_nls) return null;
  
  for (i = 0; i < wcag20_nls.principles.length; i++) {
  
     p = wcag20_nls.principles[i];

     if (p.principle_id == id) return p;

     for (j = 0; j < p.guidelines.length; j++) {
     
       g = p.guidelines[j];
       
       if (g.guideline_id == id) return g;
     
       for (k = 0; k < g.success_criteria.length; k++ ) {
       
         sc = g.success_criteria[k];
       
         if (sc.sc_id == id) return sc;
       
       } // end loop
     
     } // end loop
     
  } // end loop   
    
  return null;  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLS                                     */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLS
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAG 2.0 information with properties with localized NLS values 
 *
 * @param  {String}  locale - Language code 
 * @param  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @param  {String}  title  - Localized title of WCAG 2.0 guidelines 
 * @param  {String}  url    - URL to the translation of WCAG 2.0
 *
 * @property  {String}  locale - Language code 
 * @property  {String}  abbrev - Localized abbreviation of WCAG 2.0 guidelines
 * @property  {String}  title  - Localized title of WCAG 2.0 guidelines 
 * @property  {String}  url    - URL to the translation of WCAG 2.0
 *
 * @property  {Array}   principles - Array of WCAG 2.0 principle objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLS = function(locale, abbrev, title, url) {

  this.locale = locale;    
  this.abbrev = abbrev;    
  this.title  = title;    
  this.url    = url;   
  
  this.levels = [];
  
  this.principles = [];
  
};


/* ---------------------------------------------------------------- */
/*                       WCAG20NLSPrinciple                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSPrinciple
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAg 2.0 Principle information with properties with localized NLS values 
 *
 * @param  {String}  principle_id  - Principle id
 * @param  {String}  title         - Title of the requirement 
 * @param  {String}  description   - Description of principle 
 * @param  {String}  url           - URL to information on the requirement
 *
 * @property  {String}  principle_id  - Principle id 
 * @property  {String}  title         - Title of the principle 
 * @property  {String}  description   - Description of principle 
 * @property  {String}  url           - URL to information on the requirement
 *
 * @property  {Array}   guidelines - Array of WCAG 2.0 guideline objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSPrinciple = function(principle_id, title, description, url) {

  this.principle_id = principle_id;    
  this.title        = title;    
  this.description  = description;    
  this.url          = url;   
  
  this.guidelines = [];
  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSGuideline                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSGuideline
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc WCAg 2.0 Guideline information with properties with localized NLS values 
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 *
 * @param  {String}  guideline_id  - Guideline id 
 * @param  {String}  title         - Title of the guideline
 * @param  {String}  description   - Description of the guideline 
 * @param  {String}  url           - URL to information on the guideline
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 *
 * @property  {String}  guideline_id  - Guideline id 
 * @property  {String}  title         - Title of the guideline 
 * @property  {String}  description   - Description of the guideline 
 * @property  {String}  url           - URL to information on the requirement
 *
 * @property  {Array}   success_criteria  - Array of WCAG 2.0 success criteria objects associated with the principle
 */

OpenAjax.a11y.WCAG20NLSGuideline = function(principle, guideline_id, title, description, url) {

  this.principle     = principle;    
  
  this.guideline_id  = guideline_id;   
  
  this.title         = title;    
  this.discription   = description;    
  this.url           = url;   
  
  this.success_criteria = [];
  
};

/* ---------------------------------------------------------------- */
/*                       WCAG20NLSSuccessCriteria                    */
/* ---------------------------------------------------------------- */

/**
 * @constructor WCAG20NLSSuccessCriteria
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc  WCAG 2.0 Success Criteria information with properties with localized NLS values 
 *
 * @param  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @param  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @param  {String}  sc_id        - WCAG 2.0 Sucess cCriteria id   
 * @param  {String}  level        - Level of importance of a requirement
 * @param  {String}  title        - Title of the success criteria 
 * @param  {String}  description  - Description of the success criteria
 * @param  {String}  url          - URL to information on the requirement
 *
 * @property  {WCAG20NLSPrinciple}  principle  - Principle object reference 
 * @property  {WCAG20NLSGuideline}  guideline  - Guideline object reference
 *
 * @property  {String}  sc_id      - Requirement 
 * @property  {String}  title      - Title of the requirement 
 * @property  {String}  level      - Level of importance of a requirement
 * @property  {String}  url        - URL to information on the requirement
 * @property  {Array}   resources  - URL to information on the requirement
 */

OpenAjax.a11y.WCAG20NLSSuccessCriteria = function(principle, guideline, sc_id, level, title, description, url) {

  this.principle  = principle;    
  this.guideline  = guideline;    
  
  this.sc_id      = sc_id;    
  
  this.level       = level;   
  this.title       = title;    
  this.description = description;    
  this.url         = url;   
  
  this.resources = [];  
  
};

/**
 * @member addResource
 *
 * @memberOf OpenAjax.a11y.RequirementInfo
 *
 * @desc Add a resource with localized NLS values to the NLS requirement information 
 *
 * @param {ResourceInfo}  resource  - Resource object to add 
 */

OpenAjax.a11y.WCAG20NLSSuccessCriteria.prototype.addResource = function(resource) {

  this.resources.push(resource);
  
};

/* ---------------------------------------------------------------- */
/*                        ResourceInfo                              */
/* ---------------------------------------------------------------- */

/**
 * @constructor ResourceInfo
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Resource information with properties with localized NLS values 
 *
 * @param {String}  type   - Number of the requirement 
 * @param {String}  title  - Title of the requirement 
 * @param {String}  url    - URL to information on the requirement
 */

OpenAjax.a11y.ResourceInfo = function(type, title, url) {

  this.type  = type;      
  this.title = title;      
  this.url   = url;     
  
};

