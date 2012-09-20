/**
 * Copyright 2011 University Of Illinois
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

/**
 * @file panel-rule-categories.js
 * 
 * Create images Object in response to the Images toolbar button on the A11Y Panel
 *   1. Clear the Panel view if it has any old data on it
 *   2. Get the Control Rule Results from the OAA Cache library
 *   3. Calls the Generic template to display the rendered HTML on to the Images Panel
 */
var AINSPECTOR_FB = AINSPECTOR_FB || {};  

with (FBL) {
  
  panel : null;
  
  AINSPECTOR_FB.content = AINSPECTOR_FB.content || {};
  AINSPECTOR_FB.content.viewPanel = function(context, panel_name, cache_object) {
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.CONTENT_IN_LANDMARKS, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Content in Landmarks", "content");
  };
  
  AINSPECTOR_FB.headers = AINSPECTOR_FB.headers || {};
  AINSPECTOR_FB.headers.viewPanel = function(context, panel_name, cache_object) {
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.HEADINGS_LANDMARKS, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Headings and Landmarks", "headers");
  };
  
  AINSPECTOR_FB.images = AINSPECTOR_FB.images || {};
  AINSPECTOR_FB.images.viewPanel = function (context, panel_name, cache_object) {    
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.IMAGES, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Images", "images");
  };
  
  AINSPECTOR_FB.controls = AINSPECTOR_FB.controls || {};
  AINSPECTOR_FB.controls.viewPanel = function (context, panel_name, cache_object) {    
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.CONTROLS, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Form Controls", "controls");
  };
  
  AINSPECTOR_FB.links = AINSPECTOR_FB.links || {};
  AINSPECTOR_FB.links.viewPanel = function (context, panel_name, cache_object) {    
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.LINKS, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Links", "links");
  };
  
  AINSPECTOR_FB.media = AINSPECTOR_FB.media || {};
  AINSPECTOR_FB.media.viewPanel = function (context, panel_name, cache_object) {    
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.AUDIO_VIDEO, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Audio and Video", "media");
  };
  
  AINSPECTOR_FB.tables = AINSPECTOR_FB.tables || {};
  AINSPECTOR_FB.tables.viewPanel = function (context, panel_name, cache_object) {    
    AINSPECTOR_FB.toolbarUtil.viewPanel(context, panel_name, cache_object, OpenAjax.a11y.RULE_CATEGORIES.TABLES, 
        OpenAjax.a11y.RESULT_FILTER.ALL, "Tables", "tables");
  };
  
}
  