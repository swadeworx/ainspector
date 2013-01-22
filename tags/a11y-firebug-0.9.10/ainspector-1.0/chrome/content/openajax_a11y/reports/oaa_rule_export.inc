  <body>
    
   <style>
     ul#ID_UL_NAVIGATION {
       list-style: none;
       margin: 0;
       padding: 0;
     }

     ul#ID_UL_NAVIGATION LI {
       display: inline;
       margin: 0;
       padding: 0;
     }  

     ul#ID_UL_NAVIGATION LI A {
       display: inline;
       padding-left: 0.25em;
       padding-right: 0.25em;
       margin-left: 0.25em;
       margin-right: 0.25em;
     }

     ul#ID_UL_NAVIGATION LI:after {
       content: "|";
     }


   </style> 
     
    <div role="navigation">
      <h2>Rule Categories</h2>
      <ul id="ID_UL_NAVIGATION">
        <li><a onclick="showSection('ID_DIV_RULE_SUMMARY')" href="#">Show Rule Category Summary</a></li>
      </ul>
    </div>
    
    <div id="ID_DIV_MAIN" role="main" aria-labelledby="ID_H1_TITLE">
      <h1 id="ID_H1_TITLE"></h1>
      
      <section id="ID_DIV_RULE_SUMMARY">
        
      </section>  
      
    </div>
          
  </body>
