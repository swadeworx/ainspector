with (FBL) {
  
  var elementDomplate = domplate({
	
    tableTag : 
      TABLE({"class": "ai-table-list-items", cellpadding: 0, border: 1, cellspacing: 0, hiddenCols: "", "role": "grid"},
		THEAD(
		  TH(""),
		  TH("P"),
		  TH("V"),
		  TH("PV"),
		  TH("R"),
		  TH("PR"),
		  TH("W"),
		  TH("I")
		),
		TBODY()
      )	  
  });	
};