var myBasket = [];
var totalPrice;
var basketID = 0;
var productArray = [];
var productButton = [];
var buttonList = [];

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
    ajaxGet('api/titles/homeTitle.php', function(data) {
      grabElement(data, 'title');
    });
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
        ajaxGet('content/description.txt', function(data) {
          grabElement(data, 'mainContent');
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



function setProducts() {

  document.getElementById("products").addEventListener("click", function(data) { /*products sidebar & page */
    ajaxGet('api/titles/productTitle.php', function(data) {
      grabElement(data, 'title');
    });
    ajaxGet('api/navigation/productSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("desktopPC").addEventListener("click", function(data) {
        ajaxGet('api/database/getDesktopJSON.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("Desktop");
          getButtons();

        });
      });
      document.getElementById("laptop").addEventListener("click", function(data) {
        ajaxGet('api/database/getLaptop.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("Laptop");
          getButtons();
        });
      });
      document.getElementById("parts").addEventListener("click", function(data) {
        ajaxGet('api/database/getPart.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("Parts");
          getButtons();
        });
      });
      document.getElementById("cpuCooler").addEventListener("click", function(data) {
        ajaxGet('api/database/getCpuCooler.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("CPU Cooler");
          getButtons();
        });
      });
      document.getElementById("monitors").addEventListener("click", function(data) {
        ajaxGet('api/database/getMonitors.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("Monitors");
          getButtons();
        });
      });
      document.getElementById("additional").addEventListener("click", function(data) {
        ajaxGet('api/database/getAdditional.php', function(data) {
          grabElement(data, 'mainContent');
          printProducts("Additional");
          getButtons();
        });
      });
    });

    ajaxGet('content/desktops.txt', function(data) {
      grabElement(data, 'mainContent');
    });
  }, false);

}

function callbackAlert(response){
    console.log(response);
    alert(response);
}

function getResult(e){
    e.preventDefault();
    var prodCode = document.getElementById("productCode").value;
    var prodName = document.getElementById("productName").value;
    var desc = document.getElementById("description").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    var type = document.getElementById("productType").value;

    var addProduct = {productCode: prodCode, productName: prodName, description: desc, productPrice: price, productQuantity: quantity, productType: type };
    console.log(addProduct);
    postJSON(
        addProduct,
        'api/database/addProduct.php',
        function(data) {
            callbackAlert(data);
            console.log("done");
        }
    );
   // setAdmin();
}


function setOffers() {

  document.getElementById("offers").addEventListener("click", function(data) { /*offer sidebar & page */
    ajaxGet('api/titles/offerTitle.php', function(data) {
      grabElement(data, 'title');
    });
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

function setAdmin() {
  document.getElementById("admin").addEventListener("click", function(data) { /*offer sidebar & page */
    ajaxGet('api/titles/adminTitle.php', function(data) {
      grabElement(data, 'title');
    });
    ajaxGet('api/navigation/adminSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("addProduct").addEventListener("click", function(data) {
        ajaxGet('api/database/addJSON.html', function(data) {
          grabElement(data, 'mainContent');
        });
      });
      document.getElementById("editProduct").addEventListener("click", function(data) {
        ajaxGet('api/database/editAdmin.php', function(data) {
          grabElement(data, 'mainContent');
        });
      });
    });
    ajaxGet('api/database/addJSON.html', function(data) {
      grabElement(data, 'mainContent');
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
    ajaxGet('api/titles/basketTitle.php', function(data) {
      grabElement(data, 'title');
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
  ajaxGet('api/titles/homeTitle.php', function(data) {
    grabElement(data, 'title');
  });
  ajaxGet('content/message.txt', function(data) {
    grabElement(data, 'mainContent');
  });
  getJSON("api/database/selectTypeJSON.php", function(data) {
    getProducts(data);
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
        console.log(price / basketObj.quantity, price*basketObj.quantity);
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





function generateTable() {
  // get the reference for the body
  var target = document.getElementById("basketTable");
  var basketLength = myBasket.length;
  if (myBasket.length === 0){
      var emptyTable = document.createElement("p");
      var emptyMessage = "Your basket is currently empty.";
      var addMessage = document.createTextNode(emptyMessage);
      emptyTable.appendChild(addMessage);
      target.appendChild(emptyTable);
        }else{
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
            console.log(Number(itemPrice),typeof totPrice, totPrice);
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

window.onload = function() {

  setPage();
  pageLoad();

};
