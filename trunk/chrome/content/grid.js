/* See license.txt for terms of usage */

FBL.ns(function() { with (FBL) {

AINSPECTOR.grid = { 
    onClickHeader: function(event)
    {
        // Also support enter key for sorting
        if (!isLeftClick(event) && !(event.type == "keypress" && event.keyCode == 13))
            return;

        var table = getAncestorByClass(event.target, "netTable");
        var column = getAncestorByClass(event.target, "gridHeaderCell");
        AINSPECTOR.grid.sortColumn(table, column);
    },

    onKeyRow: function(event)
    {
		event.stopPropagation();

		switch(event.keyCode) {
		case 38: //up
            event.preventDefault();
			var row = findPrevious(event.target, AINSPECTOR.grid.isGridRow);
			if (row) row.focus();
			break;
		case 39: //right
            event.preventDefault();
			var cell = getChildByClass(event.target, "gridCell");
			if (cell) cell.focus();
			break;
		case 40: //down
            event.preventDefault();
			var row = findNext(event.target, AINSPECTOR.grid.isGridRow);
			if (row) row.focus();
			break;
		}
    },
    
	onKeyCell: function(event)
    {
        event.stopPropagation();

		switch(event.keyCode) {
		case 38: //up
            event.preventDefault();
			var index = findElementIndex(event.target);
			var row = getAncestorByClass(event.target, "gridRow");
			row = row.previousSibling;
			if (row) {
				var  cell = row.childNodes[index];
				if (cell) cell.focus();
			}
			break;
		case 37: //left
            event.preventDefault();
			var cell = event.target.previousSibling;
			if (cell) cell.focus();
			else {
				var row = getAncestorByClass(event.target, "gridRow");
				row.focus();
			}
			break;
		case 39: //right
            event.preventDefault();
			var cell = event.target.nextSibling;
			if (cell) cell.focus();
			break;
		case 40: //down
            event.preventDefault();
			var index = findElementIndex(event.target);
			var row = getAncestorByClass(event.target, "gridRow");
			row = row.nextSibling;
			if (row) {
				var  cell = row.childNodes[index];
				if (cell) cell.focus();
			}
			break;
        case 13: //Enter
            event.preventDefault();
            var links = event.target.getElementsByClassName('objectLink');
            links[0].focus();
            FBTrace.sysout("Enter :", links);
            FBTrace.sysout("link :", links[0]);
			break;
		}
    },

	onKeyHeadingCell: function(event)
    {
		event.stopPropagation();

		switch(event.keyCode) {
		case 13: //Enter
            event.preventDefault();
	        var table = getAncestorByClass(event.target, "netTable");
	        var column = getAncestorByClass(event.target, "gridHeaderCell");
	        AINSPECTOR.grid.sortColumn(table, column);
			break;
		default:
            event.preventDefault();
			AINSPECTOR.grid.onKeyCell(event);
			break;
		}
    },
	
	isGridRow: function(node) {
		return hasClass(node, "gridRow");
	},

    sortColumn: function(table, col, direction)
    {
       if (!col)
            return;

        var numerical = !hasClass(col, "alphaValue");

        var colIndex = 0;
        for (col = col.previousSibling; col; col = col.previousSibling)
            ++colIndex;

        AINSPECTOR.grid.sort(table, colIndex, numerical, direction);
    },

    sort: function(table, colIndex, numerical, direction)
    {
        var tbody = table.lastChild;
        var headerRow = tbody.firstChild;

        // Remove class from the currently sorted column
        var headerSorted = getChildByClass(headerRow, "gridHeaderSorted");
        removeClass(headerSorted, "gridHeaderSorted");
        if (headerSorted)
            headerSorted.removeAttribute("aria-sort");

        // Mark new column as sorted.
        var header = headerRow.childNodes[colIndex];
        setClass(header, "gridHeaderSorted");
        // If the column is already using required sort direction, bubble out.
        if ((direction == "desc" && header.sorted == 1) ||
            (direction == "asc" && header.sorted == -1))
            return;
        if (header)
            header.setAttribute("aria-sort", header.sorted === -1 ? "descending" : "ascending");
        var colID = header.getAttribute("id");
       	// Store current state into the preferences.
       	var headerID = headerRow.getAttribute("id");
       	AINSPECTOR.util.Preference.setPref(headerID + "sortCol", colID); 
        AINSPECTOR.util.Preference.setPref(headerID + "sortDir", header.getAttribute("aria-sort")); 

        var values = [];
        for (var row = tbody.childNodes[1]; row; row = row.nextSibling)
        {
            var cell = row.childNodes[colIndex];
            var value = numerical ? parseFloat(cell.textContent) : cell.textContent;
            values.push({row: row, value: value});
        }

        values.sort(function(a, b) { return a.value < b.value ? -1 : 1; });

        if ((header.sorted && header.sorted == 1) || (!header.sorted && direction == "asc"))
        {
            removeClass(header, "sortedDescending");
            setClass(header, "sortedAscending");
            header.sorted = -1;

            for (var i = 0; i < values.length; ++i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }
        else
        {
            removeClass(header, "sortedAscending");
            setClass(header, "sortedDescending");

            header.sorted = 1;

            for (var i = values.length-1; i >= 0; --i)
            {
                tbody.appendChild(values[i].row);
                if (values[i].info)
                    tbody.appendChild(values[i].info);
            }
        }
    },

    //
    // Provides menu items for header context menu.
    //
    getContextMenuItems: function(object, target, context)
    {
    	var panel = FirebugContext.getPanel("AInspector");

        var popup = $("fbContextMenu");
        if (popup.firstChild && popup.firstChild.getAttribute("command") == "cmd_copy")
            popup.removeChild(popup.firstChild);

        var items = [];

        // Iterate over all columns and create a menu item for each.
        var table = panel.table; //context.getPanel(panelName, true).table;
        var hiddenCols = table.getAttribute("hiddenCols");

        var lastVisibleIndex;
        var visibleColCount = 0;

        // Iterate all columns except of the first one for breakpoints.
        var header = getAncestorByClass(target, "gridHeaderRow");
        var columns = cloneArray(header.childNodes);
        for (var i=0; i<columns.length; i++)
        {
            var column = columns[i];
            var visible = (hiddenCols.indexOf(column.id) == -1);

            items.push({
                label: column.textContent,
                type: "checkbox",
                checked: visible,
                nol10n: true,
                command: bindFixed(AINSPECTOR.grid.onShowColumn, this, AINSPECTOR.view.yscontext, column.id)
            });

            if (visible)
            {
                lastVisibleIndex = i;
                visibleColCount++;
            }
        }

        // If the last column is visible, disable its menu item.
        if (visibleColCount == 1)
            items[lastVisibleIndex].disabled = true;

        items.push("-");
        items.push({
            label: $STR("net.header.Reset_Header"),
            nol10n: true,
            command: bindFixed(AINSPECTOR.grid.onResetColumns, this, AINSPECTOR.view.yscontext)
        });

        return items;
    },

    onShowColumn: function(context, colId)
    {
        var panel = FirebugContext.getPanel("AInspector");
        var table = panel.table; //context.getPanel(panelName, true).table;

        var hiddenCols = table.getAttribute("hiddenCols");

        // If the column is already presented in the list of hidden columns,
        // remove it, otherwise append.
        var index = hiddenCols.indexOf(colId);
        if (index >= 0)
        {
            table.setAttribute("hiddenCols", hiddenCols.substr(0,index-1) +
                hiddenCols.substr(index+colId.length));
        }
        else
        {
            table.setAttribute("hiddenCols", hiddenCols + " " + colId);
        }

        // Store current state into the preferences.
        AINSPECTOR.util.Preference.setPref("hiddenCols", table.getAttribute("hiddenCols"));
    },

    onResetColumns: function(context)
    {
    	var panel = FirebugContext.getPanel("AInspector"); //var panel = context.getPanel(panelName, true);
        var header = getElementByClass(panel.panelNode, "gridHeaderRow");

        // Reset widths
        var columns = header.childNodes;
        for (var i=0; i<columns.length; i++)
        {
            var col = columns[i];
            if (col.style)
                col.style.width = "";
        }

        // Reset visibility. Only the Status column is hidden by default.
        panel.table.setAttribute("hiddenCols", "colStatus");
        AINSPECTOR.util.Preference.setPref("hiddenCols", "colStatus");
     }
}

}});

function findElementIndex(elem) {
	var k=-1, e=elem;
	while (e) {
		if ( "previousSibling" in e ) {
			e = e.previousSibling;
			k = k + 1;
		} else {
			k= -1;
			break;
		}
	}
	return k;
}
