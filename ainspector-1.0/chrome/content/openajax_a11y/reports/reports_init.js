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
/*         Initialize HMTL Report Content, Scripts and CSSS         */
/* ---------------------------------------------------------------- */

/**
 * Initialize css and scripts for report files
 */
 
OpenAjax.a11y.reportCSS = '  <style type="text/css">\n  <!-- Not initialized --> \n  </style>\n';
OpenAjax.a11y.reportJS  = '  <script type="text/javascript">\n  <!-- Not initialized --> \n  </script>\n';
OpenAjax.a11y.reportBodyCacheItems = '  <body>\n  <!-- Not initialized --> \n  </body>\n';

// This initialized some strings for use by reports
OpenAjax.a11y.reportCSS            = OpenAjax.a11y.util.initStringUsingURL('resource://report10/oaa-report.css');
OpenAjax.a11y.reportJS             = OpenAjax.a11y.util.initStringUsingURL('resource://report10/oaa-report.js');
OpenAjax.a11y.reportBodyCacheItems = OpenAjax.a11y.util.initStringUsingURL('resource://report10/oaa-report-body-cache-items.inc');
