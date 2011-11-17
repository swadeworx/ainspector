    
    /**
     *  Dynamically add a stylesheet to the document.
     */
    loadCSS = function(url, doc) {
        if ( ! doc ) {
            return '';
        }
        var newCss = doc.createElement("link");
        newCss.rel = "stylesheet";
        newCss.type = "text\/css";
        newCss.href = url;
        doc.body.appendChild(newCss);

        return newCss;
    }  
