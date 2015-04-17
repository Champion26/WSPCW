
/**
 *
 *
 * @description Function creates a series of input fields when the purchase button is pressed on the basket page.
 * This also includes a button which when physically submits the order into the system. All elements are created
 * within the DOM and then appended onto the document.
 *
 */
function getOrderDetails(){
  var orderButton = document.getElementById("purchaseButton");
  orderButton.onclick = function(){
    var target = document.getElementById("orderDetails");
    var form = document.createElement("form");
    var fieldset = document.createElement("fieldset");
    var breakLine = document.createElement("br");
    console.log(breakLine);
    form.appendChild(fieldset);
    var name = document.createElement("input");
    name.setAttribute("type", "text");
    name.setAttribute("id", "rName");
    var nameLabel = document.createElement("label");
    nameLabel.innerHTML = "Recipient Name:";
    fieldset.appendChild(nameLabel);
    fieldset.appendChild(name);
    fieldset.appendChild(breakLine);
    var address = document.createElement("input");
    address.setAttribute("type", "text");
    address.setAttribute("id", "address");
    var addressLabel = document.createElement("label");
    addressLabel.innerHTML = "Recipient Address:";
    fieldset.appendChild(addressLabel);
    fieldset.appendChild(address);
    fieldset.appendChild(breakLine);
    var postcode = document.createElement("input");
    postcode.setAttribute("type", "text");
    postcode.setAttribute("id", "postCode");
    var postcodeLabel = document.createElement("label");
    postcodeLabel.innerHTML = "Recipient Postcode:";
    fieldset.appendChild(postcodeLabel);
    fieldset.appendChild(postcode);
    fieldset.appendChild(breakLine);
    var emailLabel = document.createElement("label");
    emailLabel.innerHTML = "Recipient Email: ";
    fieldset.appendChild(emailLabel);
    var email = document.createElement("input");
    email.setAttribute("type", "text");
    email.setAttribute("id", "email");
    fieldset.appendChild(email);
    var confirm = document.createElement("button");
    confirm.setAttribute("id", "confirmButton");
    confirm.setAttribute("onclick", "createOrder()");
    confirm.innerHTML = "Confirm Order";
    fieldset.appendChild(confirm);
    form.appendChild(fieldset);
    target.appendChild(form);
  };
}

/**
 *
 * @description This function is run when the user submits  the order. It gathers the products involved in the order, retrieves
 * their IDs from the server and then runs sendOrder when a response is recieved.
 *
 */
function createOrder(){
  console.log("creating order");
  var orderContents = [];
  var totalPrice = 0;
  var orderNumber = getRandomInt(0, 9999999999);
  for (var i = 0; i < myBasket.length; i++){
     var product = myBasket[i];
     console.log(product);
     var price = Number(product['price']);
     totalPrice += price;
     orderContents.push(product['productCode']);

  }
  console.log("orderContents", orderContents.length);
  var productIDs = [];
  var received = false;
  for (var x = 0; x < orderContents.length; x++){
         var code = orderContents[x];
         console.log(code);
         var details = "code="+code;
         console.log(details);
        returnJSON(
          details,
          '../api/database/getProductIDs.php',
          function(data) {
            console.log("working",data);

            for (var y = 0; y<data.length; y++){
              var product = data[y];
              console.log(product, "this is product");
              productIDs.push(product);
            }
            sendOrder(totalPrice, productIDs, orderNumber);
            console.log(data);

          }
        );

      }
  console.log(productIDs);
  //now I have product keys, need to create order and get order id


}

/**
 *
 * @description This function is carried out once the product IDs of the order is recieved. This function creates an order
 * according to the user set information and the uses the product IDs and the ID of the order just created in order to fill
 * 'orderProduct' which is a table that lists what product was involved in what order.
 * @param {Int} totalPrice
 * @param {Array} productIDs
 * @param {Int} orderNumber
 *
 */
function sendOrder(totalPrice, productIDs, orderNumber){
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();

  if(dd<10) {
      dd='0'+dd;
  }

  if(mm<10) {
      mm='0'+mm;
  }

  date = mm+''+dd+''+yyyy;
  var name = document.getElementById("rName").value;
  var address = document.getElementById("address").value;
  var postcode = document.getElementById("postCode").value;
  var email = document.getElementById("email").value;
  var orderInfo = "date="+date+"&cost="+totalPrice+"&name="+name+"&address="+address+"&postcode="+postcode+"&orderNumber="+orderNumber+"&email="+email;
  var orderID;
  console.log(productIDs);
  returnJSON(
    orderInfo,
    '../api/database/newOrder.php',
    function(data) {
      if (data.length <= 0){
        console.log("no order");
      }
      console.log("order response", data);
      orderID = data[0];
      console.log(orderID, "this is order ID");

      for (var u = 0; u < productIDs.length ; u++){
        var id = productIDs[u];
        var orderProduct = "order="+orderID+"&id="+id;
        console.log(orderProduct);
        console.log("break");
        postJSON(
          orderProduct,
          '../api/database/addOrderProduct.php',
          function(data){}
        );
      }

    }
  );

}


/**
 *
 * @description This function is used to update the product that the admin has edited on the edit page. This is achieved by taking
 * the values from the inputs on the document, creating a url (which a php page can handle) and then posting it to a specially
 * built php responder.
 * @param {Event} e
 *
 */
function submitChanges(e) {
  e.preventDefault();
  var prodCode = document.getElementById("pCode").value;
  var prodName = document.getElementById("productNa").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;
  var location = "../images/" + document.getElementById("imageName").value;
  console.log(location);
  if (productTypes.indexOf(type) === -1) {
    alert(type + " is not a valid type.");
  } else {

    var productDetails = "productCode=" + prodCode + "&productName=" + prodName + "&description=" + desc + "&productPrice=" + price + "&productQuantity=" + quantity + "&productType=" + type + "&location=" + location;
    console.log(productDetails);
    postJSON(
      productDetails,
      '../api/database/updateProduct.php',
      function(data) {

      }
    );
    document.getElementById("pCode").value = "";
    document.getElementById("productNa").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("productType").value = "";
    document.getElementById("imageName").value = "";
    alert("You have updated " + prodName + ".");
  }
}


/**
 *
 * @description This function merely sends its passed variable to a php responder. The responder in question updates
 * the individual aspects of the website such as the description or the title.
 * @param {String} changed
 *
 */
function postChanges(changed) {
  postJSON(
    changed,
    '../api/database/updateDetail.php',
    function(data) {
      alert("Your changes have been saved.");
    }
  );
}


/**
 *
 * @description This function is used to send the chages the admin makes to the page to the database. This is achieved through
 * checking the keys used in the event and if they match the criteria (Shift + E) then it loops through the changes made and
 * updates it in the database.
 * @param {Event} e
 *
 */
function sendDBChanges(e) {
  console.log("running");
  if (e.keyCode == 83 && e.shiftKey) {
    console.log("accepted", changesMade.length);
    for (var i = 0; i < changesMade.length; i++) {
      var id = changesMade[i][0];
      var content = changesMade[i][1];
      var changed = "id=" + id + "&content=" + content;
      console.log("posting");
      postChanges(changed);
    }
  }
}


/**
 *
 * @description Function loops through the changes array and if the element in question isn't found an array is created
 * containing the element's id and its innerHTML, this array is then pushed into the changes array.
 * @param {Element} element
 *
 */
function sendChanges(element) {
  var id = element.getAttribute("id");
  var content = element.innerHTML;
  var found = false;
  for (var i = 0; i < changesMade.length; i++) {
    if (id === changesMade[i][0]) {
      found = true;
      break;
    }
  }
  if (found === false) {
    var changes = [id, content];
    changesMade.push(changes);
  }



}


/**
 *
 * @description Function applies two event listeners to the element it is passed. If uses clicks the element the keypress listener is placed
 * and if that listener is activated then the system waits 3 seconds and calls the sendChanges function.
 * @param {Element} element
 *
 */
function saveChanges(element) {

  element.addEventListener("click", function() {
    element.addEventListener("keypress", function() {
      setTimeout(sendChanges, 3000, element);
    });


  });
}


/**
 *
 * @description Function retrieves the individual site details, such as the set description from the server.
 *
 */
function getDetails() {
  getJSON("../api/database/selectDetails.php", function(data) {
    console.log("details");
    addDetails(data);

  });
}


/**
 *
 * @description This function takes the details that were retrieved from the server and pushes them into a local array
 * named 'dbRetrievedDetails' and then calls loadSiteDetails.
 * @param {Array} data
 *
 */
function addDetails(data) {
  for (var i = 0; i < data.length; i++) {
    dbRetrievedDetails.push(data[i]);
  }
  loadSiteDetails();
}


/**
 *
 * @description This function loops through all elements on the page and if said element has the 'data-edit' attribute
 * then the function loops through the local 'dbRetrievedDetails' array and sets the elements innerHTML to what is stored in the array
 * according to it's id. This function is run at each page load.
 *
 */
function loadSiteDetails() {
  var all = document.getElementsByTagName("*");
  console.log("working");
  for (var i = 0; i < all.length; i++) {
    var element = all[i];

    if (element.hasAttribute("data-edit")) {
      for (var x = 0; x < dbRetrievedDetails.length; x++) {
        var id = element.getAttribute("id");
        if (id === dbRetrievedDetails[x][0]) {
          element.innerHTML = dbRetrievedDetails[x][1];
        }
      }
    }
  }
}


/**
 *
 * @description This function is used to retrieve the details of products according to their code for the admin(s) to edit
 * the product. This is acheived through posting a php responder the product code which returns the rest of the product's details.
 * These details are then set to the document's inputs values so the admin can edit said details.
 * @param {Event} e
 *
 */
function getSearch(e) {
  searchResults = [];
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;

  var productDetails = "productCode=" + prodCode;
  returnJSON(
    productDetails,
    '../api/database/returnSearch.php',
    function(data) {
      getSearchResult(data);

      if (searchResults.length > 1) {
        alert("There are too many results to display.");
      } else if (searchResults.length === 0) {
        alert("There are no results for " + prodCode);

      } else if (searchResults.length > 0) {

        document.getElementById("pCode").value = searchResults[0][0];
        document.getElementById("productNa").value = searchResults[0][1];
        document.getElementById("description").value = searchResults[0][2];
        var type = productTypes[searchResults[0][3]];
        document.getElementById("productType").value = type;
        document.getElementById("price").value = searchResults[0][4];
        document.getElementById("quantity").value = searchResults[0][5];
        document.getElementById("imageName").value = searchResults[0][6];
      }
    }
  );
}


/**
 *
 * @description This function merely sends the passed variable to the php responder.
 * @param {String} presetElement
 *
 */
function addPreset(presetElement) {

  postJSON(
    presetElement,
    '../api/database/addSitePreset.php',
    function(data) {}
  );
}


/**
 *
 * @description This function's purpose is to just delete existing product types. All it does is send the product type on the
 * page's form to a php responder which then deletes said type from the system. It then retrieves the new list of types
 * from the database.
 * @param {Event} e
 *
 */
function deleteType(e) {
  e.preventDefault();
  var prodType = document.getElementById("productT").value;

  var productDetails = "productType=" + prodType;
  returnJSON(
    productDetails,
    '../api/database/deleteType.php',
    function(data) {


    }
  );
  refreshTypes();

}


/**
 *
 * @description This function takes the response from the ajax function and then pushes each record into the local results
 * array.
 * @param {Array} response
 *
 */
function getSearchResult(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    searchResults.push(product);
    console.log("added");
  }
  console.log(searchResults);
}

/**
 *
 * @description This function was created to handle the search results. It iterates through the response and adds the results
 * into the local array as long as the same result doesn't already exist in said array.
 * @param {Array} response
 *
 */
function getSearchBy(response) {
  console.log(response);
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    var found = false;
    if (searchArray.length === 0){
      searchArray.push(product);
    }else{
      for (var x = 0; x<searchArray.length;x++){
        var check = searchArray[x];
        if(product[1]===check[1]){
           found=true;
           break;
        }
      }
      if (found === false){
        searchArray.push(product);
      }
   }

  }
  console.log(searchArray);
}

/**
 *
 * @description This function takes the user input from the input and sends it to a php responder. Functions (such as getSearchBy
 * are then called to handle the response and print out the results into a table on the search page.
 * @param {Event} e
 *
 */
function searchByName(e) {

  e.preventDefault();
  document.getElementById("searchTable").innerHTML = "";
  var prodName = document.getElementById("productName").value;
  document.getElementById("productName").value = "";
  var productDetails = "productName=" + prodName;
  returnJSON(
    productDetails,
    '../api/database/searchByName.php',
    function(data) {
      getSearchBy(data);
      console.log(searchArray.length);

      printSearch();
    }
  );



}

/**
 *
 * @description This function is an evolution of the searchByName function, it is instead used by the search bar in the header.
 * This function works much like the searchByName function works in that it sends the input values to a php responder and then
 * prints out the results after the page has been changes to the 'search results' page.
 * @param {Event} e
 *
 */
function searchByNameGlobal(e) {

  e.preventDefault();

  var prodName = document.getElementById("productN").value;
  document.getElementById("productN").value = "";
  var productDetails = "productName=" + prodName;
  returnJSON(
    productDetails,
    '../api/database/searchBar.php',
    function(dataTwo) {
      console.log("working");
      console.log(searchArray.length);

      ajaxGet('../api/navigation/searchSidebar.php', function(data) {
        grabElement(data, 'sidebar');

      });

      ajaxGet('../api/database/search.php', function(data) {
        grabElement(data, 'mainContent');
        document.getElementById("searchTable").innerHTML = "";
        getSearchBy(dataTwo);
        console.log(searchArray);


        printSearch();
        getButtons();

      });

    }
  );




}


/**
 *
 * @description This function searches through the database according to the product code and then prints out the results in the
 * form of a table.
 * @param {Event} e
 *
 */
function searchByCode(e) {
  e.preventDefault();
  document.getElementById("searchTable").innerHTML = "";
  var prodCode = document.getElementById("productCode").value;
  document.getElementById("productCode").value = "";
  var productDetails = "productCode=" + prodCode;
  returnJSON(
    productDetails,
    '../api/database/searchByCode.php',
    function(data) {
      getSearchBy(data);

      printSearch();

    }
  );
  console.log(searchArray.length);


}


/**
 *
 * @description This function is used to print out the results of a search. This is achieved through .createElement
 * in order to create the structure of a html table and then the function iterates through the local searchArray in order
 * to fill said table.
 *
 */
function printSearch() {
  // get the reference for the body
  var target = document.getElementById("searchTable");
  console.log("array length", searchArray.length, typeof searchArray);
  if (searchArray.length === 0) {
    var errorMsg = document.createTextNode("There are no records to display.");
    var errorBox = document.createElement("p");
    errorBox.appendChild(errorMsg);
    target.appendChild(errorBox);
  } else {
    // creates a <table> element and a <tbody> element
    console.log("table");
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
        titleContent = "Price";
      } else if (x === 4) {
        titleContent = "Quantity";
      } else if (x === 5) {
        titleContent = "Purchase";
      }
      var titleCell = document.createElement("th");
      var titleText = document.createTextNode(titleContent);
      titleCell.appendChild(titleText);
      tableTitles.appendChild(titleCell);
    }
    tblBody.appendChild(tableTitles);

    // creating all cells
    console.log(searchArray);
    for (var i = 0; i < searchArray.length; i++) {
      // creates a table row
      var row = document.createElement("tr");
      var item = searchArray[i];
      for (var j = 0; j <= 5; j++) {
        var cell = document.createElement("td");
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        if (j === 0) {
          cellContent = item[0];
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        } else if (j === 1) {
          cellContent = item[1];
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        } else if (j === 2) {
          cellContent = item[2];
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        } else if (j === 3) {
          cellContent = item[4];
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        } else if (j === 4) {
          cellContent = item[5];
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        } else if (j === 5) {
          var celButton = document.createElement("button");
          celButton.innerHTML = 'Add to Basket';
          var name = "addButton" + i;
          buttonList.push(name);
          celButton.setAttribute("id", name);
          var productObj = {
            productCode: item[0],
            productName: item[1],
            productType: item[3],
            description: item[2],
            price: item[4],
            quantity: item[5]
          };
          celButton.setAttribute("data-detail", JSON.stringify(productObj));

          productButton.push(productObj);

          cell.appendChild(celButton);

        }

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
}

/**
 *
 * @description This function is used to add new product types to the system. This is achieved through posting a php
 * responder the new type which then runs an SQL query to insert it. Once it has been submitted the product types
 * are refreshed.
 * @param {Event} e
 *
 */
function addProductType(e) {
  e.preventDefault();
  var prodType = document.getElementById("productType").value;

  var productDetails = "productType=" + prodType;
  console.log(productDetails);
  postJSON(
    productDetails,
    '../api/database/addType.php',
    function(data) {
      callbackAlert(data);
      console.log("done");
    }
  );
  alert("You have added " + prodType + " to the system.");
  refreshTypes();

  document.getElementById("productType").value = "";
}

/**
 *
 * @description This function generates a stock report in a .txt format as well as in a table. This is achieved through taking the values
 * from the inputs on the page (Author etc), retrieving the stock data from the system and then calling printTable when the stock data is received.
 *
 */
function generateReport() {

  var form = document.getElementById('generateFile');

  var uploadButton = document.getElementById('createReport');
  var removeButton = document.getElementById('removeTableButton');
  removeButton.onclick = function(event){
    console.log("removing");
    document.getElementById("reportTable").innerHTML = "";
  };
  uploadButton.onclick = function(event) {
    event.preventDefault();
    document.getElementById("reportTable").innerHTML = "";
    // Update button text.
    uploadButton.innerHTML = 'Uploading...';
    var title = document.getElementById("reportTitle").value;
    var author = document.getElementById("reportAuthor").value;
    var date = new Date();
    var type = document.getElementById("productType").value;
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    }

    if(mm<10) {
        mm='0'+mm;
    }

    date = mm+''+dd+''+yyyy;
    var stockData= [];
    console.log(typeof type);

    if (type === ""){
      getJSON("../api/database/getStockInfo.php", function(data) {
        for(var i = 0; i < data.length; i++){
            var object = data[i];
            stockData.push(object);
        }
        printTable(title, author, date, stockData);
      });
    }else{
      var typeDetails = "type="+type;

      returnJSON(typeDetails, "../api/database/getStockInfoType.php", function(data) {
        for(var i = 0; i < data.length; i++){
            var object = data[i];
            console.log(object);
            stockData.push(object);
        }
        console.log(stockData);
        printTable(title, author, date, stockData);
      });
    }

  }
};

/**
 *
 * @description This function handles the report and stock data. It first sends the report data to a php responder which creates the file
 * and then it loops through the stock data and sends that to a different php reponder, which appends the created file with the new
 * information.
 * @param {String} title
 * @param {String} author
 * @param {String} date
 * @param {Array} stockData
 *
 */
function printTable(title, author, date, stockData){
  reportDetails = "title="+title+"&author="+author+"&date="+date;
  console.log(stockData);
  postJSON(
    reportDetails,
    '../api/database/setFile.php',
    function(data) {

    }
  );
  console.log(stockData.length);

  generateReportTable(stockData);
  for (var x = 0; x < stockData.length; x++){
    var product = stockData[x];
    var code = product[0];
    var name = product[1];
    var quantity = product[2];

    var productDetails = "code="+code+"&name="+name+"&quantity="+quantity+"&date="+date;
    postJSON(
      productDetails,
      '../api/database/addProductsToReport.php',
      function(data) {

      }
    );
  }
}
/**
 *
 * @description This function generates the stock table in conjunction with the .txt report file. This is achieved through
 * creating the table structure in the DOM and then appending it to the document. The stock data array prodvides the information to fill
 * the cells.
 * @param {Array} stockData
 *
 */
function generateReportTable(stockData) {
  // get the reference for the body
    var target = document.getElementById("reportTable");

    // creates a <table> element and a <tbody> element

    var tblBody = document.createElement("tbody");
    var tableTitles = document.createElement("tr");
    for (var x = 0; x <= 2; x++) {
      if (x === 0) {
        titleContent = "Product Code";
      } else if (x === 1) {
        titleContent = "Product Name";
      } else if (x === 2) {
        titleContent = "Quantity";
      }
      var titleCell = document.createElement("th");
      var titleText = document.createTextNode(titleContent);
      titleCell.appendChild(titleText);
      tableTitles.appendChild(titleCell);
    }
    tblBody.appendChild(tableTitles);



    // creating all cells
    for (var i = 0; i < stockData.length; i++) {
      // creates a table row
      var row = document.createElement("tr");
      var basketObject = stockData[i];
      console.log(basketObject);
      for (var j = 0; j <= 2; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        if (j === 0) {
          cellContent = basketObject[0];
        } else if (j === 1) {
          cellContent = basketObject[1];
        } else if (j === 2) {
          cellContent = basketObject[2];
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

    // appends <table> into <body>
    target.appendChild(tblBody);
  }


/**
 *
 * @description This function is called when an admin is adding a new product. To begin the function checks if the file upload
 * input has a file, if so it uses a php responder to upload said file (in this instance an image) and set it in the '/images' directory
 * and then takes the rest of the product information and sends that to the server in the form of getResult call.
 *
 */
function sendImage() {

  var form = document.getElementById('addProduct');
  var fileSelect = document.getElementById('imageFile');
  var uploadButton = document.getElementById('sendButton');
  uploadButton.onclick = function(event) {
    event.preventDefault();

    // Update button text.
    uploadButton.innerHTML = 'Uploading...';
    var filename;
    var files = fileSelect.files;
    console.log(files.legnth);
    if (files.length ===0){
      getResult(event, filename);
    } else{
    var formData = new FormData();
    for (var i = 0; i < 1; i++) {
      var file = files[i];

      // Check the file type.
      if (!file.type.match('image.*')) {
        continue;
      }

      // Add the file to the request.
      formData.append('images', file, file.name);
      filename = file.name;

    }
    var all = formData.getAll('images');
    console.log(all);

    console.log(formData);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'uploader.php', true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        // File(s) uploaded.
        uploadButton.innerHTML = 'Upload';
        getResult(event, filename);
      } else {
        alert('An error occurred!');
      }
    };
    xhr.send(formData);
  }
};
}

/**
 *
 * @description This function is called when the image has been uploaded (or if no image was uploaded at all). The values are
 * taken from the document's inputs and the sent to the server to be uploaded. The inputs on the page are then emptied.
 * @param {Event} e
 * @param {String} filename
 *
 */
function getResult(e, filename) {
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;
  var prodName = document.getElementById("productName").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;
  var image = document.getElementById("imageFile").value;
  console.log(filename);
  var filepath;
  if (filename===undefined){
    filepath= "../images/noProduct.jpg";
  }else{
    filepath = "../images/" + filename;
  }



  if (productTypes.indexOf(type) === -1) {
    alert(type + " is not a valid type.");
  } else {

    type = productTypes.indexOf(type);
    console.log(type);
    var addProduct = {
      productCode: prodCode,
      productName: prodName,
      description: desc,
      productPrice: price,
      productQuantity: quantity,
      productType: type
    };
    var productDetails = "productCode=" + prodCode + "&productName=" + prodName + "&description=" + desc + "&productPrice=" + price + "&productQuantity=" + quantity + "&productType=" + type + "&filepath=" + filepath;
    console.log(productDetails);
    postJSON(
      productDetails,
      '../api/database/addProduct.php',
      function(data) {
        callbackAlert(data);
        console.log("done");
      }
    );
    alert("You have added " + prodName + " to the system.");
    refreshProducts();

    document.getElementById("productCode").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("productType").value = "";


  }
}
/**
 *
 * @description This function was created with the purpose of sending new product information to the server through formData.
 * This idea was scrapped and this function is unused but kept as a point of reference.
 * @param {Event} e
 *
 */
function getResultForm(e) {
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;
  var prodName = document.getElementById("productName").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;

  var formData = new FormData();
  formData.append("productCode", prodCode);
  formData.append("productName", prodName);
  formData.append("description", desc);
  formData.append("productPrice", price);
  formData.append("productQuantity", quantity);
  formData.append("productType", type);

  var data = new XMLHttpRequest();
  data.open("POST", "../api/database/addProduct.php");
  data.send(formData);
  console.log(formData);

}


/**
 *
 * @description This function encompasses two buttons. The first uses a server request to provide the user
 * the quantity of a product according to the set product code. The second takes the quantity change details and sends them to the server in order to change the
 * quantity on the system.
 *
 */
function getQuantity(){
  var getOldButton = document.getElementById("getQuantity");
  var updateButton = document.getElementById("updateQuantity");
  getOldButton.onclick = function(){
    console.log("button clicked");
    var code = document.getElementById("productCode").value;
    var productInfo = "code="+code;
    var results = [];
    returnJSON(
        productInfo,
        '../api/database/getQuantities.php',
        function(data) {
          console.log(data.length);
          for (var i = 0; i < data.length; i++){
            var product = data[i];
            results.push(product);
          }
          console.log(results);
          document.getElementById("oldQuantity").value = results[0][1];

        }
    );
  };
  updateButton.onclick = function(){
    var oldQuantity = Number(document.getElementById("oldQuantity").value);
    var increaseBy = Number(document.getElementById("increaseQuantity").value);

    var newValue = oldQuantity + increaseBy;
    var code = document.getElementById("productCode").value;
    var newDetails = "code="+code+"&newValue="+newValue;

      postJSON(
        newDetails,
        '../api/database/updateQuantity.php',
        function(data) {

        }
      );

  }

}


/**
 *
 * @description Function takes the code value from the page and checks if it is an existing product if so it produces an
 * alert stating this with a call to createDeleteImages.
 *
 */
function deletePage(){
  var checkButton = document.getElementById("deleteButton");

  var deleteOption = false;
  checkButton.onclick= function(){
    var code = document.getElementById("productCode").value;
    var codeDetails= "code="+code;
    for (var i = 0; i < productArray.length; i++){
      var product = productArray[i];
      console.log(product[0], code);
      if (product[0] === code){
        deleteOption = true;
        break;
      }
    }
    if (deleteOption === true){
          alert("This product exists. You can either press the delete button below or drag the image onto the bin.");
        deleteOption = true;
        createDeleteImages(code);
      }else{
        alert("This product does not exists. Please enter a correct code.");
    }
  };


}
/**
 *
 * @description Function creates a product image and appends onto the page as well as setting attributes that allow the
 * image to be dragged and dropped. Once image has been appended a call to createBin is made.
 * @param {String} code
 *
 */
function createDeleteImages(code){
  console.log("working");
  document.getElementById("binArea").innerHTML = '';
  var target = document.getElementById("imageArea");
  var section = document.createElement("section");
  section.setAttribute("id", "codeImage");
    var canvas = document.createElement("img");
    canvas.setAttribute("id", code);
    canvas.setAttribute("src", "../images/product.png");
    canvas.setAttribute("ondrop", "dropDeleteImage(event)");
    canvas.setAttribute("ondragstart", "drag(event)");
//    canvas.setAttribute("data-product", "true");
    canvas.setAttribute("ondragover", "allowDrop(event)");
    canvas.setAttribute("draggable", "true");

    section.appendChild(canvas);
  target.appendChild(section);
  createBin();

}

/**
 *
 * @description Function creates a loading image and then makes a server call to retrieve the orders. Once a response
 * is recieved a table with all the orders is created.
 *
 */
function getOrders(){
  var loading = document.createElement("img");
  loading.setAttribute("src", "../images/loading.gif");

  document.getElementById("orderSection").appendChild(loading);
  getJSON('../api/database/getOrders.php', function(data){
    buildOrderTable(data);
  }

);
}
/**
 * @class Represents an order.
 * @description This class represents an order. Includes all the information necessary to reference an order on the system.
 * @param {String} name
 * @param {String} date
 * @param {Int} cost
 * @param {String} recipient
 * @param {String} address
 * @param {String} postcode
 * @param {Int} orderNumber
 * @param {String} shipped
 * @param {String} email
 * @returns {Order}
 */
var Order = function(name, date, cost, recipient, address, postcode, orderNumber, shipped, email){
  this.orderName = name;
  this.date = date;
  this.cost = cost;
  this.recipient = recipient;
  this.address = address;
  this.postcode = postcode;
  this.orderNumber = orderNumber;
  this.shipped = shipped;
  this.email = email;
};
/**
 * @class Represents an individual product;
 * @param {String} name
 * @param {String} order
 * @param {Int} price
 * @param {String} code
 * @returns {Product}
 */
var Product = function(name, order, price, code){
  this.productName = name;
  this.order = order;
  this.price = price;
  this.productCode = code;
  this.quantity = 1;
};
/**
 *  Function uses passed variable to retrieve details on individual orders and products associated with those orders.
 * This data is then grouped together and the necessary elements are created in the DOM and appended to produce lists of orders
 * and their details on the Admin-order page.
 * @param {Array} data
 *
 */
function buildOrderTable(data){
   console.log(data);
   var orders = [];
   var products =[];
   for (var i = 0; i < data.length; i++){
     var detail = data[i];
     var order = detail[1];
     var product = detail[0];
     var orderFound = false;
     var productFound = false;
     var productCode = "code="+product;
     returnJSON(
       productCode,
       '../api/database/getProductName.php',
       function(data){
         var productResult = data[0];
           var productN = productResult[0];
           var productC = productResult[1];
           var price = productResult[2];
           var orderCode = "code="+order;
           returnJSON(
             orderCode,
             '../api/database/getOrderDetails.php',
             function(data){
               console.log(data);
               var orderResult = data[0];
               console.log(orderResult);
               var date = orderResult[0];
               var cost = orderResult[1];
               var name = orderResult[2];
               var address = orderResult[3];
               var postcode = orderResult[4];
               var orderNumber = orderResult[5];
               var shipped = orderResult[6];
               var email = orderResult[7];
               console.log(date, cost, name,address, postcode, orderNumber);
               if (orders.length <= 0){
                 var orderObject = new Order(name, date, cost, name, address, postcode, orderNumber, shipped, email);
                 console.log(orderObject.orderName);
                 orders.push(orderObject);
               } else{
                   for (var x = 0; x < orders.length; x++){
                     var existing = orders[x];
                     if (order ===  existing.orderName){
                       orderFound = true;
                        break;
                     }
                   }
                   if (orderFound === false){
                     var orderObject = new Order(name, date, cost, name, address, postcode, orderNumber, shipped, email);
                     console.log(orderObject.orderName);
                     orders.push(orderObject);
                   }
               }
               if (products.length <= 0){
                 var newProduct = new Product(productN, name, price, productC);
                 products.push(newProduct);
               }else{
                   for (var y = 0; y < products.length; y++){
                      var existingProduct = products[y];
                      if (product === existingProduct.productName){
                          productFound= true;
                          existingProduct.quantity = existingProduct.quantity + 1;
                          break;
                      }
                   }
                   if (productFound === false){
                     var newProduct = new Product(productN, name, price, productC);
                     products.push(newProduct);
                   }
               }


             console.log(orders);
             console.log(products);

             var target = document.getElementById("orderSection");
             target.innerHTML = '';
             for (var b = 0 ; b < orders.length; b++){
                var order = orders[b];
                console.log(order.shipped);
                var tbl = document.createElement("section");
                tbl.setAttribute("class", "orderSection");
                var orderLabel = document.createElement("strong");
                orderLabel.innerHTML = "Order Details";
                tbl.appendChild(orderLabel);
                //NEED to set details such as address
                var orderNo = document.createElement("p");
                orderNo.innerHTML = "Order Number: "+order.orderNumber;
                tbl.appendChild(orderNo);
                var rName = document.createElement("p");
                rName.innerHTML = "Recipient Name: "+order.recipient;
                tbl.appendChild(rName);
                var rAddress= document.createElement("p");
                rAddress.innerHTML= "Recipient Address: "+order.address;
                tbl.appendChild(rAddress);
                var rPostcode = document.createElement("p");
                rPostcode. innerHTML = "Recipient Postcode: "+order.postcode;
                tbl.appendChild(rPostcode);
                var rEmail = document.createElement("p");
                rEmail.innerHTML = "Recipient Email: "+ order.email;
                tbl.appendChild(rEmail);
                var issueButton = document.createElement("button");
                issueButton.innerHTML = "Report a Problem with the Order";
                issueButton.setAttribute("onclick", "sendOrderMessage(event)");
                issueButton.setAttribute("data-email", order.email);

                tbl.appendChild(issueButton);
                var reportTarget = document.createElement("section");
                reportTarget.setAttribute("id", "emailText");
                tbl.appendChild(reportTarget);
                var orderState = document.createElement("p");
                var status;
                console.log(order.shipped, typeof order.shipped);
                if (order.shipped === "0"){
                  console.log("false");
                  status = "Not Shipped";

                } else if (order.shipped === "1"){
                  console.log("true");
                  status = "Shipped";
                }
                console.log()
                orderState.innerHTML = "Status: "+status;
                tbl.appendChild(orderState);
                if (order.shipped ==="0"){
                  var changeState = document.createElement("button");
                  changeState.innerHTML = "Ship Order";
                  changeState.setAttribute("onclick", "shipOrder(event)");
                  changeState.setAttribute("data-number", order.orderNumber)
                  tbl.appendChild(changeState);
                  tbl.appendChild(document.createElement("br"));
                }
                var productLabel = document.createElement("strong");
                productLabel.innerHTML = "Products:";
                tbl.appendChild(productLabel);


                for(var c = 0; c < products.length; c++){
                  tbl.appendChild(document.createElement("br"));
                  var productArea = document.createElement("section");
                  productArea.setAttribute("class", "productArea");
                  var product = products[c];
                  console.log(product);
                  if (order.orderName === product.order){
                    var productCodeActual = document.createElement("p");
                    productCodeActual.innerHTML = "<strong>Product Code: </strong>"+product.productCode;
                    productArea.appendChild(productCodeActual);
                    var productActual = document.createElement("p");
                    productActual.innerHTML = "<strong>Product Name: </strong>"+product.productName;
                    productArea.appendChild(productActual);
                    var productPriceActual = document.createElement("p");
                    productPriceActual.innerHTML = "<strong>Price: £</strong>"+product.price;
                    productArea.appendChild(productPriceActual);
                    var productQuantityActual = document.createElement("p");
                    productQuantityActual.innerHTML = "<strong>Quantity: </strong>"+product.quantity;
                    productArea.appendChild(productQuantityActual);
                    tbl.appendChild(productArea);
                    tbl.appendChild(document.createElement("br"));
                  }
                }
                target.appendChild(tbl);
             }
             }
           );



       }
     );


}
}
/**
 *
 * @description  Function takes details from the button that fired the event and creates an input field and button that allows
 * the admin to send a message to the customer if there is an issue.
 * @param {Event} ev
 *
 */
function sendOrderMessage(ev){
  var order = ev.target;
  var email = order.getAttribute("data-email");
  var target =document.getElementById("emailText");
  var area = document.createElement("input");
  area.setAttribute("type", "text");
  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Send Message";
  submitButton.onclick = function(){
    alert("You have sent "+email+" the message.");
  }
  target.appendChild(area);
  target.appendChild(submitButton);
}

 /**
 *
 * @description Function takes the order number (which was set as an attribute on the button that fired the event), sends it to the
 * server where the shipped status is changed to 'shipped' and the order page is then refreshed.
* @param {Event} ev
*
*/
function shipOrder(ev){
   var order = ev.target;
   var number = order.getAttribute("data-number");
   console.log("number", number);
   var details = "number="+number;
  postJSON(
     details,
     '../api/database/shipOrder.php',
     function(data){

     }
   );
   alert("Order: "+number+" has been shipped. This page will now refresh.");
   ajaxGet('../api/database/orderList.html', function(data) {
     grabElement(data, 'mainContent');
     getOrders();

   });
}


 /**
 *
 * @description Function iterates through the ajax response and pushes each result into the local array for product
 * types.
 * @param {Array} response
 *
 */
function getProductTypes(response) {
  for (var i = 0; i < response.length; i++) {
    var type = response[i][1];
    productTypes.push(type);
  }
  console.log(productTypes);
}
/**
 *
 * @description Function handles the response from the server and retrieves the individual site details and then
 * sets the global variables to said details. Function then resets the page.
 * @param {Array} response
 *
 */
function getScheme(response){
      var scheme = response[0];
      pageColour = scheme[0];
      textColour = scheme[1];
      navColour = scheme[2];
      headingColour = scheme[3];
      console.log(imageSize);
      imageSize = scheme[4];
      console.log(scheme[5], scheme[6]);
      navHeight = scheme[5];
      navWidth = scheme[6];

      ajaxGet('../api/navigation/homeSidebar.php', function(data) {
        grabElement(data, 'sidebar');
        /*Sidebar*/
        document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
          /*Content*/
          ajaxGet('../api/database/contactUs.html', function(data) {
            grabElement(data, 'mainContent');
          });
        });
        document.getElementById("description").addEventListener("click", function(data) {
          ajaxGet('../api/database/description.html', function(data) {
            grabElement(data, 'mainContent');
            if (siteDescription === undefined) {
              document.getElementById("siteDescription").innerHTML = "A description has not been set.";
            } else {
              document.getElementById("siteDescription").innerHTML = siteDescription;
            }
            console.log(siteDescription);
          });
        });
        document.getElementById("changeCSS").addEventListener("click", function(data) {
          ajaxGet('../api/navigation/changeColour.php', function(data) {
            grabElement(data, 'mainContent');
          });

        });
        ajaxGet('../api/database/contactUs.html', function(data) {
          grabElement(data, 'mainContent');
        });
      });
    console.log("scheme");
}
/**
 *
 * @description Function takes response from ajax call and pushes results into local product array.
 * @param {Array} response
 *
 */
function getProducts(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    productArray.push(product);
  }

}


/**
 *
 * @description Function produces server call to delete current sidebar in productTable and then posts each
 * productType to server to add to newly emptied table.
 *
 */
function saveNewProductOrder(){
  getJSON(
    '../api/database/deleteCurrentSidebar.php',
    function(data){}
  );
  for (var i =0; i < productTypes.length; i++){
    var details = "type="+productTypes[i];
    console.log("saving type", productTypes[i], productTypes.length);
    postJSON(
      details,
      '../api/database/addNewSidebar.php',
      function(data){}
    );
  }
}


/**
 *
 * @description Function iterates through the changedProducts array and sends each record to the server. Call to
 * whenChangesSet once all of array is sent.
 *
 *
 */
function sendProductChanges(){
  for (var i = 0; i <changedProducts.length; i++){
    var product = changedProducts[i];
    var productDetails = "productCode="+product.productCode+"&productName="+product.productName+"&desc="+product.description+"&price="+product.price+"&quantity="+product.quantity;



  postJSON(
    productDetails,
    '../api/database/updateEditedProduct.php',
    function(data) {
      console.log("refreshing");
    }
  );

}
setTimeout(whenChangesSet, 1000);
}


/**
 *
 * @description Function uses a server request to refresh the list of products.
 *
 */
function refreshProducts() {
  getJSON("../api/database/selectTypeJSON.php", function(data) {
    getProducts(data);
  });
}
