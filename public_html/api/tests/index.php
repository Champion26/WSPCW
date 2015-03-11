<script>
    function reqListener () {
      console.log(this.responseText);
    }

    var oReq = new XMLHttpRequest(); //New request object
    oReq.onload = function() {
        var target = document.getElementById("productTable");
        var arrayLength = this.responseText.length;
        console.log(arrayLength);
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var tableTitles = document.createElement("tr");
        for (var x = 0; x <= 5; x++) {
          if (x === 0) {
            titleContent = "Product Code";
          } else if (x === 1) {
            titleContent = "Product Name";
          } else if (x === 2) {
            titleContent = "Description";
          } else if (x === 3) {
            titleContent = "Product Type";
          } else if (x === 4) {
            titleContent = "Price";
          } else if (x === 5) {
            titleContent = "Quantity";
          }
          var titleCell = document.createElement("th");
          var titleText = document.createTextNode(titleContent);
          titleCell.appendChild(titleText);
          tableTitles.appendChild(titleCell);
        }
        tblBody.appendChild(tableTitles);
        // creating all cells
        for (var i = 0; i < arrayLength; i++) {
          // creates a table row
          var row = document.createElement("tr");
          var item = this.responseText[i];
          console.log(item);
          for (var j = 0; j <= 5; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            if (j === 0) {
              cellContent = item[0];
            } else if (j === 1) {
              cellContent = item[1];
            } else if (j === 2) {
              cellContent = item[2];
            } else if (j === 3) {
              cellContent = item[3];
            } else if (j === 4) {
              cellContent = item[4];
            } else if (j === 5) {
              cellContent = item[5];
            }

            var cell = document.createElement("td");
            var cellText = document.createTextNode(cellContent);
            cell.appendChild(cellText);
            row.appendChild(cell);
          }

          // add the row to the end of the table body
          tblBody.appendChild(row);

        }
        // put the <tbody> in the <table>
        tbl.appendChild(tblBody);
        // appends <table> into <body>
        target.appendChild(tbl);

      }

    oReq.open("get", "selectTypeJSON.php", true);
    //                               ^ Don't block the rest of the execution.
    //                                 Don't wait until the request finishes to
    //                                 continue.
    oReq.send();
</script>
