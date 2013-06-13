                       =====================================================================  
                             **************** Version History ********************
                       =====================================================================

* Version alpha (V0.9.16 - Release)
  
  * OAA Evaluation library release (V2.0.5 - Release): API changes like getResultMessages() function returns a common message if everything has passed
  * performance: Highlight options 'None' as the default
  * document A11y extension 
  * keyboard support is stable in all the grids
  * Code reviews
  
  * Note : works with Firebug 1.11.3 and Firebug 1.11.4 and beta versions of Firebug 1.12.x
  
* Version alpha (V0.9.15 - Release)

  * keyboard support is been implemented in all the grids of A11y panel
  * Highlights elements with specific colors denotes the result of an element on the web page as passed/failed the rule
    or warning or a manual check.
  * Highlight options are None, All elements, selected elements and V/W only. 'All elements' being default.
  * OAA Evaluation library release (V2.0.4 - Release)
  
* Version alpha (V0.9.14 - Release)
 
  * Updates on Evaluation Library
  * Note: Install the latest Firebug 1.12.0aX.xpi beta for the menu bar in this extension 
    to work properly: https://getfirebug.com/releases/firebug/1.12/
    
* Version alpha (V0.9.13 - Release)

  * Updates on Evaluation Library
  
* Version alpha (V0.9.12 - Release)

 * Stable version
 * Reports menu is added to the A11y toolbar buttons
 * Added AInspector Logo to the extension to appear in Add-ons manager
 * Updates messages in side panel accordingly when a row is selected in the left panel
 * style of Manual Checks changed from red color and pink background to Purple color
 * bug fix: Fixed issues related to preferences.ruleset
 * bug fix: Fixed persisting of state of highlighting a row while toggles between Panels

* Version alpha (V0.9.11 - Release)

 * Bootstrap, restart-less application
 * Follows AMD syntax
 * Panel toolbar buttons are created using Firebug's getPanelToolbarButtons()
 * No use of XUL
 * A11y Panel has Menu's for Views, Rulesets, Filters and the WCAG Level
 * Preferences are moved to the main toolbar button
 * Fixed disappearance of Vertical scroll in all the views
 * RuleCategories? summary information to the Views menu

* Version alpha (V0.9.10 - Release)

  * Resizes/adjusts the columns/table in the A11y Panel as well the side panels of the A11y Panel
  * Side panel Elements shows the rule result message instead of rule description or summary
  * All Rules Panel shows the description of a rule in the rules column of the table
  * Adding some more rules to the rulesets
  * remove Rule ID information in the Rule Summary, Rule Details or Rule Result Message.
  * Version number changes from alpha to x.y.z

* Version alpha (V0.98 - Release) - Features

  * Added 'Expand All' and 'Collapse All' buttons to WCAG View
  * Modified the side panel name from Rules to Rule Info
  * Fixed a bug in Rule Info Side panel about opening a link in the new window
  * Fixed a bug in WCAG view to show the rule description
  * Changed the tooltips for the Properties, style & Positioning,style & Positioning and events side panels to state that these side panels content is calculated through OAA library
  * updated OAA cache library (includes ARIA rules)

* Version alpha (V0.97 - Release) - Features

  * Added Attributes, Properties, Events and Style & Position side panels to the rule categories.
  * Removed Element Info Button from the Rule Results side Panel
  * Fixed issue on changing between toolbar buttons to the side panels

* Version alpha (V0.96 - Release) - Features

  * Adding WCAG report to the AInspector for Firebug
  * Adding average PEPR score to the principle and Guide lines
  * Make the required column in bold if it’s value is yes
  * For the column ‘Element’, append with a string ‘element’ and the number of the element as part of every element. (for ex., a: can be element 1: a:)
  * Remove ‘element info’ button from the ‘Elements’ Side Panel and add it as a column ‘more info ’ to the table
  * Removed ‘Rule Information’ button from the ‘Elements’ Side Panel.
  * Added ‘Rule information’ as another side panel to the main panel ‘WCAG ’. The content of this side panel will be in the order of
    ID of the element
  * Basic rule information
  * Additional information of the rule if there is any

* Version alpha (V0.95 - Release) - Features

  * Major changes to Highlighting Module - highlighting the elements on webpage

* Version alpha (V0.94 - Release) - Features

  * Added Summary Panel that shows number of elements failed a particular rule, WCAG level (A, AA and AAA) and % of elements that pass the rule
  * Added Elements Side panel that is showed when you select the Summary Panel
  * Summary Panel will be default view
  * Incorparated the changes made in the OAA Cache libray
  * 'Rule Informaiton' and 'Element Information' buttons are moved to the side panels Elements, Rule Results and Font Properties side panels
  * Once a XUL window is opened by clicking on the 'Element Informaiton' and 'Rule Information' buttons, selecting an element or a Rule on the panel and side panel will update the XUL window with particular row selected and will be focussed.

* Version alpha (V0.93 - Release) - Features

  * modified the user interface design to mimic the Cache Inspector
  * Implemented the conceptual model in rule categories

* Version alpha (V0.92 - Release) - Features

  * Added a XUL window for "Preferences" in the A11Y toolbar to select a ruleset (i.e., WCAG2.0 Trans, WCAG 2.0 Strict and IITAA)
  * Highlights the element on the web page which ever selected on the A11Y Panel
  * "Style" side Panel exists only for the Color Contrast toolbar button and "Attributes", "Properties" and "Events" side panels doesnot exists for "ColorContrast?" toolbar button
  * Every Panel(i.e., Images, Media, Headings/Landmarks etc..) except "Preferences" in the A11Y toolbar displays the information about ruleset selected and the WCAG level (A, AA & AAA)
  * bug fix : Fixed styling issue for the toolbar buttons on MAC
  * Note : This build works only with the Firebug 1.10.a5 and later builds of Firebug. link to the Firebug-1.10.a5 http://blog.getfirebug.com/2012/03/09/firebug-1-10a5/

* Version alpha (V0.91 - Release) 

  * Images/Media are separated and made as two toolbar buttons.
  * Click on any row in any of the list and tree views will highlight the node on the website
  * "Style" side Panel exists only for the "ColorContrast?" toolbar buttons and is disabled for other toolbar buttons
  * "Attributes", "Properties" and "Events" side panels are disabled for Color Contrast toolbar button and enabled for other toolbar buttons.