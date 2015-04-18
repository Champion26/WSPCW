var myBasket = [];
var totalPrice;
var basketID = 0;
var productArray = [];
var productButton = [];
var buttonList = [];
var searchResults = [];
var searchArray = [];
var userSearch = [];
var productTypes = [];
var siteDescription;
var siteDetails = [];
var changesMade = [];
var dbRetrievedDetails = [];
var availableColours = ["aqua", "black", "blue", "fuchsia", "gray", "green", "lime", "maroon", "navy", "olive", "orange", "purple", "red", "silver", "teal", "white",  "yellow"];
var changableElements = ["table", "th", "td", "nav", "form"];
var pageColour= "green";
var textColour = "black";
var navColour = "white";
var headingColour = "black";
var imageState = true;


function addToBasket(e) {
  var details = JSON.parse(e.currentTarget.dataset.detail);
  var prodCode = e.detail.prodCode;
  var prodName = e.detail.prodName;
  var price = e.detail.price;
  var newProduct = [prodCode, prodName];
  totalPrice = totalPrice + price;
  basket.push(newProduct);
}


function grabElement(response, element) {
  var myElem;
  myElem = document.getElementById(element);
  if (myElem !== 'null') {
    document.getElementById(element).innerHTML = response;
  }
}

function setPageStructure() {
  /*Set head of page*/
  ajaxGet('api/structure/head.php', function(data) { /*Defines file to grab*/
    grabElement(data, 'head'); /*Sets where to put file*/
  });
  ajaxGet('api/structure/footer.php', function(data) {
    grabElement(data, 'footerLinks');
  });

}

function setRed() {
  document.getElementByTagName("table").style.border = "1px solid red";
  document.getElementByTagName("th").style.border = "1px solid red";
  document.getElementByTagName("th").style.backgroundColor = "red";
  document.getElementByTagName("td").style.border = "1px solid red";
  document.getElementByTagName("nav").style.backgroundColor = "red";
  document.getElementByTagName("form").style.borderColor = "red";
}

function setHome() {
  document.getElementById("home").addEventListener("click", function(data) { /*homepage sidebar*/

    ajaxGet('api/navigation/homeSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      /*Sidebar*/
      document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
        /*Content*/
        ajaxGet('api/database/contactUs.html', function(data) {
          grabElement(data, 'mainContent');
        });
      });
      document.getElementById("description").addEventListener("click", function(data) {
        ajaxGet('api/database/description.html', function(data) {
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
        ajaxGet('api/navigation/changeColour.php', function(data) {
          grabElement(data, 'mainContent');
        });

      });
      ajaxGet('api/database/contactUs.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
  }, false);
}


function setSearch() {
  document.getElementById("search").addEventListener("click", function(data) { /*homepage sidebar*/

    ajaxGet('api/navigation/searchSidebar.php', function(data) {
      grabElement(data, 'sidebar');
    });
    ajaxGet('api/database/search.php', function(data) {
      grabElement(data, 'mainContent');
    });

  }, false);
}

function setProductSidebar() {

  var target = document.getElementById("productSidebar");
  var list = document.createElement("ul");
  for (var i = 0; i < productTypes.length; i++) {
    var listElement = document.createElement("li");
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("id", productTypes[i]);
    var name = productTypes[i];
    var label = document.createTextNode(name);
    link.innerHTML = name;
    listElement.appendChild(link);
    list.appendChild(listElement);
  }
  target.appendChild(list);
  applyEventListeners();
}

function applyIndividualListener(type, x) {

  document.getElementById(productTypes[x]).addEventListener("click", function(data) {
    var productType = [];
    for (var i = 0; i < productArray.length; i++) {
      var product = productArray[i];
      var prodType = product[3];
      if (prodType === type) {
        productType.push(product);
      }
    }
    if (productType.length === 0) {
      alert("There are no products for this category.");
    } else {
      ajaxGet('api/database/getProductTable.php', function(data) {
        grabElement(data, 'mainContent');
        console.log(type);
        document.getElementById("productTitle").innerHTML = type;
        printProducts(type);
        getButtons();
      });
    }
  });
}


function applyEventListeners() {
  for (var x = 0; x < productTypes.length; x++) {
    var type = productTypes[x];
    applyIndividualListener(type, x);

  }
}

function setProducts() {

  document.getElementById("products").addEventListener("click", function(data) { /*products sidebar & page */

    ajaxGet('api/navigation/productSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      setProductSidebar();
    });

    ajaxGet('api/database/productsDesc.html', function(data) {
      grabElement(data, 'mainContent');
    });
  }, false);

}

function callbackAlert(response) {
  console.log(response);
  alert(response);
}


function submitChanges(e) {
  e.preventDefault();
  var prodCode = document.getElementById("pCode").value;
  var prodName = document.getElementById("productNa").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;
  var location = "images/" + document.getElementById("imageName").value;
  console.log(location);
  if (productTypes.indexOf(type) === -1) {
    alert(type + " is not a valid type.");
  } else {

    var productDetails = "productCode=" + prodCode + "&productName=" + prodName + "&description=" + desc + "&productPrice=" + price + "&productQuantity=" + quantity + "&productType=" + type + "&location=" + location;
    console.log(productDetails);
    postJSON(
      productDetails,
      'api/database/updateProduct.php',
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

function makeEditable(id) {
  var change = document.getElementById(id);
  change.addEventListener("click", function() {
    change.setAttribute("contenteditable", "true");
    change.setAttribute("ondrop", "dropTXTFile(event)");
  });
}

function applyEdits(element) {
  element.addEventListener("click", function() {
    element.setAttribute("contenteditable", "true");
    element.setAttribute("ondrop", "dropTXTFile(event)");


  });
}

function postChanges(changed) {
  postJSON(
    changed,
    'api/database/updateDetail.php',
    function(data) {
      alert("Your changes have been saved.");
    }
  );
}

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

function saveChanges(element) {

  element.addEventListener("click", function() {
    element.addEventListener("keypress", function() {
      setTimeout(sendChanges, 10000, element);
    });


  });
}

function getDetails() {
  getJSON("api/database/selectDetails.php", function(data) {
    console.log("details");
    addDetails(data);

  });
}

function addDetails(data) {
  for (var i = 0; i < data.length; i++) {
    dbRetrievedDetails.push(data[i]);
  }
  loadSiteDetails();
}

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

function findEditableElements() {
  var all = document.getElementsByTagName("*");

  for (var i = 0; i < all.length; i++) {
    var element = all[i];

    if (element.hasAttribute("data-edit")) {

      applyEdits(element);
      saveChanges(element);
      element.setAttribute("ondrop", "dropTXTFile(event)");
      element.setAttribute("ondragover", "allowDrop(event)");


    }
  }
}

function editable() {
  var classname = document.getElementsByClassName("editable");
  console.log(classname.length);

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function() {
      classname[i].setAttribute("contenteditable", "true");

    });
  }
}

function getSearch(e) {
  searchResults = [];
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;

  var productDetails = "productCode=" + prodCode;
  returnJSON(
    productDetails,
    'api/database/returnSearch.php',
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

function addPreset(presetElement) {

  postJSON(
    presetElement,
    'api/database/addSitePreset.php',
    function(data) {}
  );
}

function setAllContent() {
  console.log("setting");
  var all = document.getElementsByTagName("*");

  for (var i = 0; i < all.length; i++) {
    var element = all[i];
    if (element.hasAttribute("data-edit")) {
      var id = element.getAttribute("id");
      var content = element.innerHTML;
      var found = false;
      for (var x = 0; x < siteDetails.length; x++) {
        if (id === siteDetails[x][0]) {
          found = true;
          break;
        }
      }
      console.log(found);
      if (found === false) {
        var presetElement = "id=" + id + "&content=" + content;
        console.log(presetElement);
        var elementArray = [id, content];
        siteDetails.push(elementArray);
        addPreset(presetElement);
      }


    }
  }
  console.log(siteDetails);
}

function deleteType(e) {
  e.preventDefault();
  var prodType = document.getElementById("productT").value;

  var productDetails = "productType=" + prodType;
  returnJSON(
    productDetails,
    'api/database/deleteType.php',
    function(data) {


    }
  );
  refreshTypes();

}

function getSearchResult(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    searchResults.push(product);
    console.log("added");
  }
  console.log(searchResults);
}

function getSearchBy(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    searchArray.push(product);
    console.log("added");
  }
  console.log(searchArray);
}


function searchByName(e) {

  e.preventDefault();
  document.getElementById("searchTable").innerHTML = "";
  var prodName = document.getElementById("productName").value;
  document.getElementById("productName").value = "";
  var productDetails = "productName=" + prodName;
  returnJSON(
    productDetails,
    'api/database/searchByName.php',
    function(data) {
      getSearchBy(data);
      console.log(searchArray.length);

      printSearch();
    }
  );



}


function searchByNameGlobal(e) {

  e.preventDefault();

  var prodName = document.getElementById("productN").value;
  document.getElementById("productN").value = "";
  var productDetails = "productName=" + prodName;
  returnJSON(
    productDetails,
    'api/database/searchBar.php',
    function(dataTwo) {
      console.log("working");
      console.log(searchArray.length);

      ajaxGet('api/navigation/searchSidebar.php', function(data) {
        grabElement(data, 'sidebar');

      });

      ajaxGet('api/database/search.php', function(data) {
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



function searchByCode(e) {
  e.preventDefault();
  document.getElementById("searchTable").innerHTML = "";
  var prodCode = document.getElementById("productCode").value;
  document.getElementById("productCode").value = "";
  var productDetails = "productCode=" + prodCode;
  returnJSON(
    productDetails,
    'api/database/searchByCode.php',
    function(data) {
      getSearchBy(data);

      printSearch();

    }
  );
  console.log(searchArray.length);


}

function showEditable(e) {

  if (e.keyCode == 69 && e.shiftKey) {

    var all = document.getElementsByTagName("*");

    for (var i = 0; i < all.length; i++) {
      var element = all[i];
      if (element.hasAttribute("data-edit")) {
        element.style.border = "thick solid red";


      }
    }
  }
  document.addEventListener("keyup", resetEditables);
}

function resetEditables(e) {
  if (e.keyCode == 69 && e.shiftKey) {
    var all = document.getElementsByTagName("*");

    for (var i = 0; i < all.length; i++) {
      var element = all[i];
      if (element.hasAttribute("data-edit")) {
        element.style.border = "0px";
        element.style.borderColor = "";
      }
    }
  }
}
document.addEventListener("keydown", showEditable);


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


function addProductType(e) {
  e.preventDefault();
  var prodType = document.getElementById("productType").value;

  var productDetails = "productType=" + prodType;
  console.log(productDetails);
  postJSON(
    productDetails,
    'api/database/addType.php',
    function(data) {
      callbackAlert(data);
      console.log("done");
    }
  );
  alert("You have added " + prodType + " to the system.");
  refreshTypes();

  document.getElementById("productType").value = "";
}


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
    filepath= "images/noProduct.jpg";
  }else{
    filepath = "images/" + filename;
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
      'api/database/addProduct.php',
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
  data.open("POST", "api/database/addProduct.php");
  data.send(formData);
  console.log(formData);

}

function setOffers() {

  document.getElementById("offers").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('api/navigation/offerSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("offerOne").addEventListener("click", function(data) {
        ajaxGet('api/database/offerOne.php', function(data) {
          grabElement(data, 'mainContent');
        });
      });
    });
    ajaxGet('content/offers.txt', function(data) {
      grabElement(data, 'mainContent');
    });
  }, false);
}

function setAdminFieldContent() {
  console.log(document.getElementById("pageTitle").innerHTML);
  document.getElementById("tabTitle").value = document.getElementById("title").innerHTML;
  document.getElementById("siteColour").value =  pageColour;
  document.getElementById("standardText").value = textColour;
  document.getElementById("navText").value = navColour;
  document.getElementById("headingText").value = headingColour;
  console.log(imageState);
  var radio = document.getElementById("imageState");
  if (imageState === true){
    radio.checked = "true";
  }


}
function setAdminAfterColourChange(){

        ajaxGet('api/database/setSiteDetails.php', function(data) {
          grabElement(data, 'mainContent');
          setAdminFieldContent();
        });
        ajaxGet('api/structure/head.php', function(data) { /*Defines file to grab*/
          grabElement(data, 'head'); /*Sets where to put file*/
        });
        ajaxGet('api/structure/footer.php', function(data) {
          grabElement(data, 'footerLinks');
        });
        ajaxGet('api/structure/topNav.php', function(data) {
          grabElement(data, 'topNav');
          setHome();
          setProducts();
          setBasket();
          setAdmin();
          setSearch();
        });

}
function submitSiteEdits() {
  console.log("running");
  var tabTitle = document.getElementById("tabTitle").value;
  var siteColour = document.getElementById("siteColour").value;
  var standardText = document.getElementById("standardText").value;
  var navText = document.getElementById("navText").value;
  var headingText = document.getElementById("headingText").value;
  var state = document.getElementById("imageState");
  console.log(state.checked);
  if (state.checked){
    imageState = true;
  } else{
    imageState = false;
  }
  document.getElementById("title").innerHTML = tabTitle;
  console.log(availableColours.indexOf(siteColour));
  if (availableColours.indexOf(siteColour) === -1){
    alert("One of there colours is not correct.");
    var colourList;
    for (var i = 0; i < availableColours.length; i++){
        colourList += ", "+availableColours[i];
    }
    document.getElementById("possibleColours").innerHTML = "The possible colours are "+colourList+".";
  } else{
    pageColour = siteColour;
    textColour = standardText;
    navColour = navText;
    headingColour = headingText;
    colourDetails = "pageColour="+pageColour+"&textColour="+textColour+"&navColour="+navColour+"&headingColour="+headingColour;
    postJSON(
      colourDetails,
      'api/database/updateColourScheme.php',
      function(data) {
          alert("The site details have been updated.");
      }
    );
    setAdminAfterColourChange();
    console.log(pageColour, textColour, navColour);
  }
}
function setColour(colour, textColour, navColour, headingColour){
  var tables = document.querySelectorAll("table", "td", "th");
  var th = document.getElementsByTagName("th");
  var nav = document.getElementsByTagName("a");
  var form = document.getElementsByTagName("form");

  tagArray(tables, colour, "borderColor");
  tagArray(th, colour, "borderColor");
  tagArray(form, colour, "borderColor");
  tagArray(th, colour, "backgroundColor");
  tagArray(nav, colour, "backgroundColor");
  var text = document.querySelectorAll("p","td");
  var headings = document.querySelectorAll("h1", "h2", "h3", "h4");
  tagArray(text, textColour, "color");
  tagArray(headings, headingColour, "color");
  tagArray(nav, navColour, "color");

}

function tagArray(array, colour, option){
  for (var i = 0; i < array.length; i++){
    var element = array[i];
    if (option === "borderColor"){
      element.style.borderColor = colour;
    }else if (option === "backgroundColor"){
      element.style.backgroundColor = colour;
    } else if(option === "color"){
      element.style.color = colour;
    }

  }
}
function getTypes() {
  var options = '';

  for (var x = 0; x < productTypes.length; x++) {
    options += '<option value="' + productTypes[x] + '" />';
  }

  document.getElementById('types').innerHTML = options;
}

function createSetBar() {
  var target = document.getElementById("productLineup");
  var section = document.createElement("form");
  for (var i = 0; i < productTypes.length; i++) {
    var label = document.createTextNode(productTypes[i]);
    var textArea = document.createElement("p");
    textArea.setAttribute("id", productTypes[i]);
    textArea.appendChild(label);
    section.appendChild(textArea);
    var input = document.createElement("input");
    input.setAttribute("type", "integer");
    section.appendChild(input);
    var breakPoint = document.createElement("br");
    section.appendChild(breakPoint);
  }
  var submit = document.createElement("input");
  submit.setAttribute("type", "submit");
  submit.setAttribute("onclick", "setOrder(event)");
  section.appendChild(submit);
  target.appendChild(section);
}

function setOrder(e) {
  for (var i = 0; i < productTypes.length; i++) {
    var element = document.getElementById(productTypes[i]);
    var value = element.value;
    var place = productTypes.indexOf(productTypes[i]);
    productTypes.splice(place, 1);
    productTypes.splice(1, 0, value);
  }
}
function dropTXTFile(e){
  e.preventDefault();
  var all =e.target;
  var before = all.innerHTML;

    if (all.hasAttribute("data-edit")){
      e.preventDefault();
      var dt = e.dataTransfer;
      var files = dt.files;
      var reader = new FileReader();
      reader.onload = function(e){

        var text = reader.result;
        console.log(text);
        all.innerHTML = text;
        if (before === all.innerHTML){

        } else{
          setTimeout(sendChanges, 10000, all);
        }

      };
      reader.readAsText(files[0]);
    }


}

function dropFile(e){
     e.preventDefault();
     var dt = e.dataTransfer;
     var files = dt.files;
     document.getElementById("imageFile").files = files;
}

function createCanvas() {
  console.log("working");
  var target = document.getElementById("productLineup");
  var section = document.createElement("section");
  section.setAttribute("id", "order");
  for (var i = 0; i < productTypes.length; i++) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("data-order", i);
    canvas.setAttribute("id", productTypes[i]);
    canvas.setAttribute("ondrop", "drop(event)");
    canvas.setAttribute("ondragstart", "drag(event)");
    canvas.setAttribute("ondragover", "allowDrop(event)");
    canvas.setAttribute("draggable", "true");
    var ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText(productTypes[i], 10, 50);
    section.appendChild(canvas);
  }
  target.appendChild(section);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.getAttribute("id"));
}

function moveVariables(children) {
  console.log(children.length);
  for (var i = 0; i < (children.length - 1); i++) {
    var child = children[i].getAttribute("id");
    console.log(child);

    for (var x = 0; x < productTypes.length; x++) {
      var id = productTypes[x];

      if (id === child) {
        var location = productTypes.indexOf(id);
        productTypes.splice(location, 1);
        productTypes.splice(i, 0, id);
        //  console.log(productTypes[i], productTypes.indexOf(productTypes[i]));
      }
    }
  }
}

function insertAfter(parentNode, newNode, target, children) {
  parentNode.insertBefore(newNode, target);
  moveVariables(children);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var object = document.getElementById(data);
  var previous = ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target, document.getElementById(data).parentNode.getAttribute("id"));
  //ev.target.appendChild(document.getElementById(data));
  var children = document.getElementById("order").childNodes;
  console.log(children);
  var parentNode = document.getElementById("order");
  console.log(document.getElementById("order"));
  var node = ev.target;
  console.log(parentNode, object, node);
  insertAfter(parentNode, object, node, children);

  //change array position
}

function setAdmin() {
  document.getElementById("admin").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('api/navigation/adminSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("addProduct").addEventListener("click", function(data) {
        ajaxGet('api/database/addJSON.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
          sendImage();
        });
      });
      document.getElementById("addType").addEventListener("click", function(data) {
        ajaxGet('api/database/addProductType.php', function(data) {
          grabElement(data, 'mainContent');
          getTypes();

        });
      });
      document.getElementById("editProduct").addEventListener("click", function(data) {
        ajaxGet('api/database/editAdmin.php', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
        });
      });
      document.getElementById("setPageDetails").addEventListener("click", function(data) {
        ajaxGet('api/database/setSiteDetails.php', function(data) {
          grabElement(data, 'mainContent');
          setAdminFieldContent();

        });
      });
      document.getElementById("setProductLineup").addEventListener("click", function(data) {
        ajaxGet('api/database/productOrder.html', function(data) {
          grabElement(data, 'mainContent');
          //createSetBar();
          createCanvas();
        });
      });
    });
    ajaxGet('api/database/addJSON.html', function(data) {
      grabElement(data, 'mainContent');
      getTypes();
    });
  }, false);
}

function setBasket() {
  document.getElementById("myBasket").addEventListener("click", function(data) { /*offer sidebar & page */
    ajaxGet('api/database/getBasketJS.php', function(data) {
      grabElement(data, 'mainContent');
      generateTable();
    });

    ajaxGet('api/navigation/basketSidebar.php', function(data) {
      grabElement(data, 'sidebar');
    });


  }, false);

}

function setPage() {
  setPageStructure();
  ajaxGet('api/structure/topNav.php', function(data) {
    grabElement(data, 'topNav');
    setHome();
    setProducts();
    setBasket();
    setAdmin();
    setSearch();

  });
}

function pageLoad() {
  document.addEventListener("keypress", function(){
    sendDBChanges(event);
    }
    );
  ajaxGet('api/navigation/homeSidebar.php', function(data) {
    grabElement(data, 'sidebar');
    document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
      /*Content*/
      ajaxGet('api/database/contactUs.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("description").addEventListener("click", function(data) {
      ajaxGet('api/database/description.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("changeCSS").addEventListener("click", function(data) {
      ajaxGet('api/navigation/changeColour.php', function(data) {
        grabElement(data, 'mainContent');
      });

    });
  });

  ajaxGet('api/database/contactUs.html', function(data) {
    grabElement(data, 'mainContent');
  });
  getJSON("api/database/selectTypeJSON.php", function(data) {
    console.log(data);
    getProducts(data);

  });
  getJSON("api/database/getColourScheme.php", function(data) {
    getScheme(data);

  });

  getJSON("api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });
  getDetails();
}

function refreshTypes() {
  getJSON("api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });
}

var fireBasketEvent = function(detail, quantity) {
  //alert('basket fired');
  detail.quantity = quantity;
  document.dispatchEvent(
    new CustomEvent(
      'basket', {
        detail: detail
      }
    )
  );
};

var clicked = function(e) {
  //alert('clicked running');
  fireBasketEvent(
    JSON.parse(e.currentTarget.dataset.detail),
    1
  );
};

function getButtons() {
  var buttons = document.querySelectorAll("button");
  //alert('script loaded');
  //alert(buttons.length);
  for (var b = buttons.length - 1; b >= 0; b--) {
    buttons[b].addEventListener('click', clicked);
  }
}

document.addEventListener(
  "basket",
  function(e) {
    console.log(e.detail);
  }
);


var countItems = function(e) {
  var code = e.detail.productCode;
  var description = e.detail.description;
  var basket = localStorage.getItem("basket");
  var quan = e.detail.quantity;

  // if a basket was retrieved decde it,
  // if not create an empty one
  basket = basket ? JSON.parse(basket) : {};

  var found = false;
  var baskLength = myBasket.length;
  if (baskLength === 0) {
    alert(e.detail.productName + ' has been added to your basket.');
    found = true;
    myBasket.push({
      productID: basketID,
      productCode: e.detail.productCode,
      productName: e.detail.productName,
      productType: e.detail.productType,
      description: e.detail.description,
      price: e.detail.price,
      quantity: e.detail.quantity
    });

    // store it for later
    localStorage.setItem("basket", JSON.stringify(basket));


    basketID++;
  } else {
    for (var i = 0; i < myBasket.length; i++) {
      var basketObj = myBasket[i];
      console.log(basketObj.productCode, code);
      console.log(found);
      if (basketObj.productCode === code) {
        var itemName = basketObj.productName;
        alert('You have added another ' + itemName + ' to your basket.');

        var price = Number(basketObj.price);
        console.log(basketObj.quantity, basketObj.quantity);
        console.log(price / basketObj.quantity, price * basketObj.quantity);
        var newPrice = Number(basketObj.price);
        newPrice = price + (price / basketObj.quantity);
        basketObj.quantity = basketObj.quantity + 1;
        console.log(newPrice);
        var stringPrice = newPrice.toString();
        basketObj.price = stringPrice;
        console.log(basketObj.price);
        found = true;
        break;
      }

    }
  }
  console.log(found);
  if (found === false) {
    console.log("not found");
    alert(e.detail.productName + ' has been added to your basket.');
    myBasket.push({
      productID: basketID,
      productCode: e.detail.productCode,
      productName: e.detail.productName,
      productType: e.detail.productType,
      description: e.detail.description,
      price: e.detail.price,
      quantity: e.detail.quantity
    });

    // store it for later
    localStorage.setItem("basket", JSON.stringify(basket));


    basketID++;
  }

};



document.addEventListener('basket', countItems);

function getProductTypes(response) {
  for (var i = 0; i < response.length; i++) {
    var type = response[i][1];
    productTypes.push(type);
  }
  console.log(productTypes);
}
function getScheme(response){
      var scheme = response[0];
      pageColour = scheme[0];
      textColour = scheme[1];
      navColour = scheme[2];
      headingColour = scheme[3];

      ajaxGet('api/navigation/homeSidebar.php', function(data) {
        grabElement(data, 'sidebar');
        /*Sidebar*/
        document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
          /*Content*/
          ajaxGet('api/database/contactUs.html', function(data) {
            grabElement(data, 'mainContent');
          });
        });
        document.getElementById("description").addEventListener("click", function(data) {
          ajaxGet('api/database/description.html', function(data) {
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
          ajaxGet('api/navigation/changeColour.php', function(data) {
            grabElement(data, 'mainContent');
          });

        });
        ajaxGet('api/database/contactUs.html', function(data) {
          grabElement(data, 'mainContent');
        });
      });
    console.log("scheme");
}
function getProducts(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    productArray.push(product);
  }
  console.log(productArray);
}

function printProducts(type) {
  // get the reference for the body
  var target = document.getElementById("productTable");

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
  var productType = [];
  console.log(productArray);
  for (var i = 0; i < productArray.length; i++) {
    var product = productArray[i];
    var prodType = product[3];
    if (prodType === type) {
      productType.push(product);
    }
  }
  // creating all cells
  for (var i = 0; i < productType.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    var item = productType[i];
    for (var j = 0; j <= 5; j++) {
      var cell = document.createElement("td");
      console.log(productType);
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row

      if (j === 0) {
        cellContent = item[0];
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        setTDEventListener(cell, item, i);
      } else if (j === 1) {
        cellContent = item[1];
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        setTDEventListener(cell, item, i);
      } else if (j === 2) {
        cellContent = item[2];
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        setTDEventListener(cell, item, i);
      } else if (j === 3) {
        cellContent = item[4];
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        setTDEventListener(cell, item, i);
      } else if (j === 4) {
        cellContent = item[5];
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        setTDEventListener(cell, item, i);
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

function moveVariables(children) {
  console.log(children.length);
  for (var i = 0; i < (children.length - 1); i++) {
    var child = children[i].getAttribute("id");
    console.log(child);

    for (var x = 0; x < productTypes.length; x++) {
      var id = productTypes[x];

      if (id === child) {
        var location = productTypes.indexOf(id);
        productTypes.splice(location, 1);
        productTypes.splice(i, 0, id);
        //  console.log(productTypes[i], productTypes.indexOf(productTypes[i]));
      }
    }
  }
}

function insertAfter(parentNode, newNode, target, children) {
  parentNode.insertBefore(newNode, target);
  moveVariables(children);
}

function dropImage(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  var object = document.getElementById(data);
  var target = ev.target.getAttribute("id");
  if (target === "basketImage") {
    var imageDetails = document.getElementById("productImage").getAttribute("data-detail");
    fireBasketEvent(
      JSON.parse(imageDetails),
      1
    );
  }

}

function setTDEventListener(cell, item, i) {
  cell.addEventListener("click", function() {
    createProductPage(item[0], item[1], item[2], item[4], item[5], i, item, item[6]);
  });
}

function createProductPage(productCode, productName, desc, price, quantity, i, item, imageLocation) {
  ajaxGet('api/database/productPage.html', function(data) {
    console.log("create");
    grabElement(data, 'mainContent');
    setProductPage(productCode, productName, desc, price, quantity, i, item, imageLocation);

  });
}

function setProductPage(productCode, productName, desc, price, quantity, i, item, imageLocation) {
  document.getElementById("productPageCode").innerHTML = productCode;
  document.getElementById("productPageName").innerHTML = productName;
  document.getElementById("productPageDesc").innerHTML = desc;
  document.getElementById("productPagePrice").innerHTML = price;
  document.getElementById("productPageQuantity").innerHTML = quantity;
  if (imageState === false){
    var page = document.getElementById("productPage");
    var image = document.getElementById("productImage");
    page.removeChild(image);
  }else if (imageState === true){
  var path;
  var stringExample = typeof "sdaasd";
  var standardPath = typeof imageLocation;
  console.log(imageLocation.indexOf(".jpg"));
  if ((imageLocation.indexOf(".jpg") >0) || (imageLocation.indexOf(".png"))>0 ){

    path = "images/"+imageLocation;
  } else{

    path = "images/noProduct.jpg";
  }


  document.getElementById("productImage").setAttribute("src", path);
 }
  createProductButton(item, i);
  getButtons();

}

function createProductButton(item, i) {
  console.log("asd");
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
  var details = celButton.getAttribute("data-detail");
  if (imageState === true){
    document.getElementById("productImage").setAttribute("data-detail", details);
  }
  document.getElementById("productButton").appendChild(celButton);
}


function generateTable() {
  // get the reference for the body
  var target = document.getElementById("basketTable");
  var basketLength = myBasket.length;
  if (myBasket.length === 0) {
    var emptyTable = document.createElement("p");
    var emptyMessage = "Your basket is currently empty.";
    var addMessage = document.createTextNode(emptyMessage);
    emptyTable.appendChild(addMessage);
    target.appendChild(emptyTable);
  } else {
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
        titleContent = "Product Type";
      } else if (x === 3) {
        titleContent = "Description";
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
    var totPrice = 0;


    // creating all cells
    for (var i = 0; i < basketLength; i++) {
      // creates a table row
      var row = document.createElement("tr");
      var basketObject = myBasket[i];
      for (var j = 0; j <= 5; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        if (j === 0) {
          cellContent = basketObject["productCode"];
        } else if (j === 1) {
          cellContent = basketObject["productName"];
        } else if (j === 2) {
          cellContent = basketObject["productType"];
        } else if (j === 3) {
          cellContent = basketObject["description"];
        } else if (j === 4) {
          cellContent = "\u00A3" + basketObject["price"];
          var itemPrice = basketObject["price"];
          totPrice += totPrice + Number(itemPrice);
          console.log(Number(itemPrice), typeof totPrice, totPrice);
        } else if (j === 5) {
          cellContent = basketObject["quantity"];


        }
        if (basketObject === null) {
          cellContent = "N/A";
        }
        var cell = document.createElement("td");
        var cellText = document.createTextNode(cellContent);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);

    }

    var totalPrice = document.createElement("tr");
    for (var p = 0; p <= 5; p++) {
      if (p === 0) {
        priceContent = " ";
      } else if (p === 1) {
        priceContent = " ";
      } else if (p === 2) {
        priceContent = " ";
      } else if (p === 3) {
        priceContent = " ";
      } else if (p === 4) {
        priceContent = "Total Price: ";
      } else if (p === 5) {
        priceContent = "\u00A3" + totPrice.toString();

      }
      var priceCell = document.createElement("td");
      var priceText = document.createTextNode(priceContent);
      priceCell.appendChild(priceText);
      totalPrice.appendChild(priceCell);
    }
    tblBody.appendChild(totalPrice);

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    target.appendChild(tbl);
  }

}

function refreshProducts() {
  getJSON("api/database/selectTypeJSON.php", function(data) {
    getProducts(data);
  });
}

function clearBasket() {
  console.log(myBasket.length);
  myBasket = [];
  console.log(myBasket.length);
  console.log(myBasket);
  ajaxGet('api/database/getBasketJS.php', function(data) {
    grabElement(data, 'mainContent');
    generateTable();
  });
  alert('You have cleared the contents of your basket.');

}

function searchEvent() {
  document.getElementById("productN").addEventListener("change", function(data) {
    userSearch = [];
    for (var i = 0; i < productArray.length; i++) {
      var searchValue = document.getElementById("productN").value;
      console.log(searchValue, productArray[i][1]);
      if (productArray[i][1].indexOf(searchValue) >= 0) {
        userSearch.push(productArray[i]);
        console.log(userSearch.length);
      }
    }
    console.log(userSearch.length);
    var options = '';

    for (var x = 0; x < userSearch.length; x++) {
      options += '<option value="' + userSearch[x][1] + '" />';
    }

    document.getElementById('names').innerHTML = options;
  });
}

window.onload = function() {

  setPage();
  pageLoad();
  searchEvent();
  console.log(productArray);

};
//Matthew Champion
