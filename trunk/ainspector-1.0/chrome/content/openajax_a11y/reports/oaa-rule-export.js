    <script type="text/javascript">

/**
 * @function replaceAll
 * @memberOf String
 */

if (typeof String.capitalize == "undefined") {
  String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
  }; 
}
      var OAA_RULE_EXPORT = {};

      OAA_RULE_EXPORT.CATEGORIES = {
        '1':    'Abbrevitations',
        '2':    'Audio',  
        '4':    'Color',
        '8':    'Form controls',
        '16':   'Headings',
        '32':   'Images',
        '64':   'Landmarks',
        '128':  'Language',
        '256':  'Links',
        '512':  'Lists',
        '1024': 'Tables',
        '2048': 'Video',
        '4096': 'Widgets',
        '8096': 'Content'
      };

      /**
       * @function OAA_RULE_EXPORT.removeEscapesFromJSON
       *
       * @desc Returns an unescaped string from a JSON string that has been escaped for single quotes and new line characters
       *
       * @param  {String}  str - string to un escape 
       *
       * @return {String}  String with escape characters removed
       */
 
       OAA_RULE_EXPORT.removeEscapesFromJSON = function(str) {

         if (typeof str === 'string' && str.length) {
           var return_str = str.replace("\\'", "'", "gi");
           return_str = return_str.replace("\\\"", "\"", "gi");
           return_str = return_str.replace("\\n", "\n", "gi");
           return return_str;
         }
         return str;  
       };
       

      /**
       * @function OAA_RULE_EXPORT.addElement 
       *
       * @desc Adds element as a child element to another DOM node 
       *
       * @param  {node}    node     - DOM node to add the tag
       * @param  {String}  element  - Tag name of the element to add
       * @param  {String}  id       - id of the element
       * @param  {String}  style    - styling class to add to the element
       * @param  {String}  text     - text content to add
       *
       * @return  {node}  New element node 
       */
       OAA_RULE_EXPORT.addElement = function(node, element, id, style, content ) {
       
         var node_element = document.createElement(element);
         
         if (id    &&    id.length) node_element.setAttribute('id', id);         
         if (style && style.length) node_element.setAttribute('class', style);
         if ((typeof content === 'string' || typeof content === 'number') && content.toString().length) {
           var node_text = document.createTextNode(content.toString());
           node_element.appendChild(node_text);
         }
         
         node.appendChild(node_element);
         
         return node_element;
         
       };


      /**
       * @function OAA_RULE_EXPORT.addTitle
       *
       * @desc Output rule information
       *
       */

       OAA_RULE_EXPORT.addTitle = function() {
       
         var node = document.getElementById('ID_TITLE');
         var title     = OAA_RULE_EXPORT.removeEscapesFromJSON(OAA_RULE_EXPORT.title);
         var text_node = document.createTextNode(title);
         node.appendChild(text_node);

         node = document.getElementById('ID_H1_TITLE');
         node.appendChild(text_node);

       };  

      /**
       * @function OAA_RULE_EXPORT.translateMessageCodes
       *
       * @desc Translate string codes to DOM nodes 
       *
       */

       OAA_RULE_EXPORT.translateMessageCodes = function(node, message) {
       
         function addTextNode(text) {
           if (text.length) {
             var text_node = document.createTextNode(text);
             node.appendChild(text_node);
           }         
         }

         var str = "";
         var end_tag = false; 
         
         message = message.replaceAll("%s", "must/should");
         
         for (var i = 0; i < message.length; i++) {
         
           if (message[i] === "@") {
             if (end_tag) {
                OAA_RULE_EXPORT.addElement(node, "code", "", "", str);
                end_tag = false;
             }
             else {             
               addTextNode(str);
               end_tag = true;
             }
             str = "";
           }
           else {
             str += message[i];
           }
        
         }
         
         addTextNode(str);
      };  

      /**
       * @function OAA_RULE_EXPORT.showRuleCategory
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showRuleCategory = function(node, category_id, category_name) {

        var section_node = OAA_RULE_EXPORT.addElement(node, "div", "ID_DIV_CATEGORY_" + category_id, "", "");
        section_node.setAttribute('role', 'region');
        section_node.setAttribute('aria-labelledby', ('ID_H2_' + category_id));
        
        OAA_RULE_EXPORT.addElement(section_node, "h2", ('ID_H2_' + category_id), "", "== " + category_name);
        
        var at_least_one = false;
       
         for (var i = 0; i < rules.length; i++) {
           
            var rule = rules[i];

            if (rule.rule_category === category_id) {
              var h3_node = OAA_RULE_EXPORT.addElement(section_node, "h3", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h3_node, "=== " + rule['nls_rule_id'] + ": " + rule['definition']);
              
              at_least_one = true;
            }  
                  
         }
         
         if (!at_least_one) {
            var message_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "");         
            OAA_RULE_EXPORT.addElement(message_node, "em", "", "", "no rules at this time");         
         }
         
       };  

      /**
       * @function OAA_RULE_EXPORT.showRules
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showRules = function() {
       
         var node = document.getElementById('ID_DIV_RULES');

         OAA_RULE_EXPORT.showRuleCategory( node, 1,    'Abbrevitation Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 2,    'Audio Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 4,    'Color Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 8,    'Form Control Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 16,   'Heading Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 32,   'Image Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 64,   'Landmark Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 128,  'Language Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 256,  'Link Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 512,  'List Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 1024, 'Table Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 2048, 'Video Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 4096, 'Widget Rules');
         OAA_RULE_EXPORT.showRuleCategory( node, 8096, 'Content Rules');

         
       };  

      /**
       * @function OAA_RULE_EXPORT.onload
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.onLoad = function() {

         OAA_RULE_EXPORT.title = "OAA Rule Export to JSON and Wiki Format";

         OAA_RULE_EXPORT.addTitle();
         
         OAA_RULE_EXPORT.showRules();
         
       }; 
    
       window.addEventListener("load", function () { OAA_RULE_EXPORT.onLoad();   }, false);
    </script>
