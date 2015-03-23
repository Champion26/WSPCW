var myBasket = [];
var totalPrice;
var basketID = 0;
var productArray = [];
var productButton = [];
var buttonList = [];
var searchResults = [];
var searchArray = [];
var userSearch = [];
var productTypes= [];
var siteDescription;

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
        ajaxGet('content/contactUs.txt', function(data) {
          grabElement(data, 'mainContent');
        });
      });
      document.getElementById("description").addEventListener("click", function(data) {
        ajaxGet('api/database/description.html', function(data) {
          grabElement(data, 'mainContent');
          if (siteDescription === undefined){
            document.getElementById("siteDescription").innerHTML = "A description has not been set.";
          }else {
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
      ajaxGet('content/message.txt', function(data) {
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

function setProductSidebar(){

  var target = document.getElementById("productSidebar");
  var list = document.createElement("ul");
  for (var i = 0; i < productTypes.length; i++){
    var listElement = document.createElement("li");
    var link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("id", productTypes[i]);
    console.log(link.getAttribute("id"));
    var name = productTypes[i];
    var label = document.createTextNode(name);
    link.innerHTML = name;
    listElement.appendChild(link);
    list.appendChild(listElement);
  }
  target.appendChild(list);
  applyEventListeners();
}
function applyIndividualListener(type,x){
  document.getElementById(productTypes[x]).addEventListener("click", function(data){
    ajaxGet('api/database/getProductTable.php', function(data) {
      grabElement(data, 'mainContent');
      console.log(type);
      document.getElementById("productTitle").innerHTML = type;
      printProducts(type);
      getButtons();
    });
  });
}
function applyEventListeners(){
  for (var x = 0; x < productTypes.length; x++){
    var type = productTypes[x];
    console.log(type);
    applyIndividualListener(type,x);

  }
}
function setProducts() {

  document.getElementById("products").addEventListener("click", function(data) { /*products sidebar & page */

    ajaxGet('api/navigation/productSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      setProductSidebar();
    });

    ajaxGet('content/desktops.txt', function(data) {
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
  var prodName = document.getElementById("productN").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;

  var productDetails = "productCode=" + prodCode + "&productName=" + prodName + "&description=" + desc + "&productPrice=" + price + "&productQuantity=" + quantity + "&productType=" + type;
  console.log(productDetails);
  postJSON(
    productDetails,
    'api/database/updateProduct.php',
    function(data) {
      alert("You have updated " + prodName + ".");
    }
  );
}

function getSearch(e) {
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;

  var productDetails = "productCode=" + prodCode;
  returnJSON(
    productDetails,
    'api/database/returnSearch.php',
    function(data) {
      getSearchResult(data);
      console.log("working");

    }
  );

  if (searchResults.length > 1) {
    alert("There are too many results to display.");
  } else if (searchResults.length = 0) {
    alert("There are no results for " + prodCode);

  } else if (searchResults.length > 0) {
    document.getElementById("pCode").value = searchResults[0][0];
    document.getElementById("productN").value = searchResults[0][1];
    document.getElementById("description").value = searchResults[0][2];
    document.getElementById("productType").value = searchResults[0][3];
    document.getElementById("price").value = searchResults[0][4];
    document.getElementById("quantity").value = searchResults[0][5];

  }


}


function deleteType(e) {
  e.preventDefault();
  var prodType = document.getElementById("productT").value;

  var productDetails = "productType=" + prodType;
  returnJSON(
    productDetails,
    'api/database/deleteType.php',
    function(data) {
      console.log("working");

    }
  );


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
  console.log(searchResults);
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
      console.log("working");
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
    'api/database/searchByName.php',
    function(data) {
      getSearchBy(data);
      console.log("working");
      console.log(searchArray.length);

      ajaxGet('api/navigation/searchSidebar.php', function(data) {
        grabElement(data, 'sidebar');
      });
      ajaxGet('api/database/search.php', function(data) {
        grabElement(data, 'mainContent');
        document.getElementById("searchTable").innerHTML = "";
        printSearch();

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
      console.log("working");
      printSearch();

    }
  );
  console.log(searchArray.length);


}


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




function getResult(e) {
  e.preventDefault();
  var prodCode = document.getElementById("productCode").value;
  var prodName = document.getElementById("productName").value;
  var desc = document.getElementById("description").value;
  var price = document.getElementById("price").value;
  var quantity = document.getElementById("quantity").value;
  var type = document.getElementById("productType").value;
  type = type.toLowerCase();
  if (productTypes.indexOf(type) === -1){
    alert(type+" is not a valid type.");
  }else{
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
    var productDetails = "productCode=" + prodCode + "&productName=" + prodName + "&description=" + desc + "&productPrice=" + price + "&productQuantity=" + quantity + "&productType=" + type;
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
  document.getElementById("mainTitle").value = document.getElementById("pageTitle").innerHTML;
}

function submitSiteEdits() {
  var tabTitle = document.getElementById("tabTitle").value;
  var mainTitle = document.getElementById("mainTitle").value;
  var desc = document.getElementById("description").value;
  siteDescription = desc;
  console.log(siteDescription);
  document.getElementById("title").innerHTML = tabTitle;
  document.getElementById("pageTitle").innerHTML = mainTitle;
}

function getTypes() {
    var options = '';

    for (var x = 0; x < productTypes.length; x++) {
      options += '<option value="' + productTypes[x] + '" />';
    }

    document.getElementById('types').innerHTML = options;
  }



function setAdmin() {
  document.getElementById("admin").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('api/navigation/adminSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("addProduct").addEventListener("click", function(data) {
        ajaxGet('api/database/addJSON.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
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
        });
      });
      document.getElementById("setPageDetails").addEventListener("click", function(data) {
        ajaxGet('api/database/setSiteDetails.php', function(data) {
          grabElement(data, 'mainContent');
          setAdminFieldContent();
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
    setOffers();
    setBasket();
    setAdmin();
    setSearch();

  });
}

function pageLoad() {
  ajaxGet('api/navigation/homeSidebar.php', function(data) {
    grabElement(data, 'sidebar');
    document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
      /*Content*/
      ajaxGet('content/contactUs.txt', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("description").addEventListener("click", function(data) {
      ajaxGet('content/description.txt', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("changeCSS").addEventListener("click", function(data) {
      ajaxGet('api/navigation/changeColour.php', function(data) {
        grabElement(data, 'mainContent');
      });

    });
  });

  ajaxGet('content/message.txt', function(data) {
    grabElement(data, 'mainContent');
  });
  getJSON("api/database/selectTypeJSON.php", function(data) {
    getProducts(data);
  });
  getJSON("api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });

}

function refreshTypes(){
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

function getProductTypes(response){
  for (var i = 0; i < response.length; i++) {
    var type = response[i][1];
    productTypes.push(type);
}
console.log(productTypes);
}

function getProducts(response) {
  for (var i = 0; i < response.length; i++) {
    var product = response[i];
    productArray.push(product);
  }
};

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
  for (var i = 0; i < productArray.length; i++) {
    var product = productArray[i];
    var prodType = product[3];
    if (prodType === type) {
      productType.push(product);
    }
  }
  if (productType.length === 0){
    alert("There are no products for this category.");
  } else{
  // creating all cells
  for (var i = 0; i < productType.length; i++) {
    // creates a table row
    var row = document.createElement("tr");
    var item = productType[i];
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

};
