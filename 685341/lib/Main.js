/**
   @fileOverview This is the main .js file used for the website. It includes functions that are used in the customer, CMS and admin pages.

*/


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
var changedProducts = [];
var imageSize = 5;
var navHeight = 2;
var navWidth = 12;

/**

   @param e the event in question that called the function.
*/
function addToBasket(e) {
  var details = JSON.parse(e.currentTarget.dataset.detail);
  var prodCode = e.detail.prodCode;
  var prodName = e.detail.prodName;
  var price = e.detail.price;
  var newProduct = [prodCode, prodName];
  totalPrice = totalPrice + price;
  basket.push(newProduct);
}
function basketLink(){
  ajaxGet('../api/database/getBasketJS.html', function(data) {
    grabElement(data, 'mainContent');
    generateTable();
    getOrderDetails();
  });

  ajaxGet('../api/navigation/basketSidebar.html', function(data) {
    grabElement(data, 'sidebar');
  });
}
/**

   @description Function is used in conjunction with AJAX calls in order to grab and place page elements onto the document. Includes check if ID exists.
   @param response The response from the AJAX request.
*/
function grabElement(response, element) {
  var myElem;
  myElem = document.getElementById(element);
  if (myElem !== 'null') {
    document.getElementById(element).innerHTML = response;
  }
}

/**

  @description Function sets the generic page structure that exists on each page through AJAX calls for the header and footer.
*/
function setPageStructure() {
  /*Set head of page*/
  ajaxGet('../api/structure/head.html', function(data) { /*Defines file to grab*/
    grabElement(data, 'head'); /*Sets where to put file*/
  });
  ajaxGet('../api/structure/footer.html', function(data) {
    grabElement(data, 'footerLinks');
  });

}
/**

   @description Early attempt at DOM styling. No longer used.

*/
function setRed() {
  document.getElementByTagName("table").style.border = "1px solid red";
  document.getElementByTagName("th").style.border = "1px solid red";
  document.getElementByTagName("th").style.backgroundColor = "red";
  document.getElementByTagName("td").style.border = "1px solid red";
  document.getElementByTagName("nav").style.backgroundColor = "red";
  document.getElementByTagName("form").style.borderColor = "red";
}

/**
 *
 *
 * @description Function that sets the home page through the use of event listeners on 'a' links with ids and corresponding ajax calls.
 */
function setHome() {
  document.getElementById("home").addEventListener("click", function(data) { /*homepage sidebar*/

    ajaxGet('../api/navigation/homeSidebar.html', function(data) {
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
        ajaxGet('../api/navigation/changeColour.html', function(data) {
          grabElement(data, 'mainContent');
        });

      });
      ajaxGet('../api/database/contactUs.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
  }, false);
}

/**
 *
 *
 * @description Sets the search page through event listeners and AJAX.
 */
function setSearch() {
  document.getElementById("search").addEventListener("click", function(data) { /*homepage sidebar*/

    ajaxGet('../api/navigation/searchSidebar.html', function(data) {
      grabElement(data, 'sidebar');
    });
    ajaxGet('../api/database/search.html', function(data) {
      grabElement(data, 'mainContent');
    });

  }, false);
}

/**
 *
 *
 * @description Function uses an array full of product types (retrieved from the productSidebar table with getJSON function)
 * and then creates the product sidebar according to array contents.
 * @requires getJSON function
 */
function setProductSidebar() {
  var types=[];

  getJSON(
    '../api/database/getNewSidebar.php',
    function(data){
      for (var x = 0; x <data.length;x++){
        var pType = data[x];
        types.push(pType);
      }
      var target = document.getElementById("productSidebar");
      var list = document.createElement("ul");
      for (var i = 0; i < types.length; i++) {
        var listElement = document.createElement("li");
        var link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("id", types[i]);
        var name = types[i];
        var label = document.createTextNode(name);
        link.innerHTML = name;
        listElement.appendChild(link);
        list.appendChild(listElement);
      }
      target.appendChild(list);
      applyEventListeners(types);
    }
  );

}

/**
 *
 * @description Applies event listener to the previous created sidebar and sorts products according to type. It then calls
 * the product table page and uses the printProducts(type) function to print out the various types.
 * @requires applyEventListeners, setProductSidebar
 * @param {String} type
 * @param {Int} x
 * @param {Array} types
 *
 */
function applyIndividualListener(type, x, types) {

  document.getElementById(types[x]).addEventListener("click", function(data) {
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
      ajaxGet('../api/database/getProductTable.html', function(data) {
        grabElement(data, 'mainContent');
        console.log(type);
        document.getElementById("productTitle").innerHTML = type;
        printProducts(type);
        getButtons();
      });
    }
  });
}

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
 * @description This function produces a random int according to user input. It returns a random int between the two user
 * set values. Used in the creation of order numbers
 * @param {Int} min
 * @param {Int} max
 * @returns {Number}
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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
 * @description This function loops through the avaliable product types and then calls applyIndividualListeners  for each type.
 * @param {Array} types
 *
 */
function applyEventListeners(types) {
  for (var x = 0; x < types.length; x++) {
    var type = types[x];
    applyIndividualListener(type, x, types);

  }
}

/**
 *
 * @description This function sets the product page and sub pages through the use of event listeners on 'a' links
 * and AJAX calls for page elements.
 *
 */
function setProducts() {

  document.getElementById("products").addEventListener("click", function(data) { /*products sidebar & page */

    ajaxGet('../api/navigation/productSidebar.html', function(data) {
      grabElement(data, 'sidebar');
      setProductSidebar();
    });

    ajaxGet('../api/database/productsDesc.html', function(data) {
      grabElement(data, 'mainContent');
    });
  }, false);

}

/**
 *
 * @description This function was created in order to test the responses recieved from ajax related functions. It is no-
 * longer used as of the final version.
 * @param {Array} response
 *
 *
 */
function callbackAlert(response) {
  console.log(response);
  alert(response);
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
 * @description This function was created in conjunction with my editable anywhere idea in which an admin only has to click
 * on an element they wish to edit. This was orignally achieved through setting attributes through click event listeners.
 * This function has been abandoned for a more preferable and functional option.
 * @param {String} id
 *
 */
function makeEditable(id) {
  var change = document.getElementById(id);
  change.addEventListener("click", function() {
    change.setAttribute("contenteditable", "true");
    change.setAttribute("ondrop", "dropTXTFile(event)");
  });
}

/**
 *
 * @description the function applies two attributes (contenteditable which allows the element to be edited anytime and ondrop
 * which determines what happens when a user drops a dragged object onto it) to the passed element. This only occurs when the
 * element is 'clicked'.
 * @param {Element} element
 *
 */
function applyEdits(element) {
  element.addEventListener("click", function() {
    element.setAttribute("contenteditable", "true");
    element.setAttribute("ondrop", "dropTXTFile(event)");


  });
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
 * @description This function merely loops through all elements on the page and then calls a series of functions if
 * the element has the 'data-edit' attribute.
 *
 */
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
/**
 *
 * @description  Function applies the attribute 'contenteditable' to every element that is part of the class 'editable'.
 *
 */
function editable() {
  var classname = document.getElementsByClassName("editable");
  console.log(classname.length);

  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', function() {
      classname[i].setAttribute("contenteditable", "true");

    });
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
 * @description This function was created to be used with the ajaxGet function to upload all editable fields to the database
 * so that each id and content would not have to be entered manually. This needs to be run if ever the site has been expanded
 * so if editable elements are on those new pages they are saved to the database.
 *
 */
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

      ajaxGet('../api/navigation/searchSidebar.html', function(data) {
        grabElement(data, 'sidebar');

      });

      ajaxGet('../api/database/search.html', function(data) {
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
 * @description This function is used to highlight the page elements that the admin can edit. This requires the user to
 * press both (Shift and E ) which then sets border of said elements to a large red one. Once the user has stopped holding
 * said keys the style returns to normal. This is achieved  through
 * looping through all elements with the data-edit attribute and setting their style in the DOM.
 * @param {Event} e
 *
 */
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
/**
 *
 * @description This function resets the element's styles back to previous after they have been highlighted. This is achieved  through
 * looping through all elements with the data-edit attribute and setting their style in the DOM.
 * @param {Event} e
 *
 */
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
/**
 *
 * @description Event listener that calls showEditable when a key is pressed down.
 */
document.addEventListener("keydown", showEditable);

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

    console.log(formData);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../api/database/uploader.php', true);
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
 * @description This function sets the offers page through ajax and event listeners. The 'Offers' page was scrapped.
 *
 */
function setOffers() {

  document.getElementById("offers").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('../api/navigation/offerSidebar.html', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("offerOne").addEventListener("click", function(data) {
        ajaxGet('../api/database/offerOne.html', function(data) {
          grabElement(data, 'mainContent');
        });
      });
    });
    ajaxGet('content/offers.txt', function(data) {
      grabElement(data, 'mainContent');
    });
  }, false);
}

/**
 *
 * @description This function sets the input field values on the 'Set Site Details' page on the CMS.
 * This is done so the user can see what the details are already set to and adjust them accordingly if necessary.
 *
 */
function setAdminFieldContent() {
  console.log(document.getElementById("pageTitle").innerHTML);
  document.getElementById("tabTitle").value = document.getElementById("title").innerHTML;
  document.getElementById("siteColour").value =  pageColour;
  document.getElementById("standardText").value = textColour;
  document.getElementById("navText").value = navColour;
  document.getElementById("headingText").value = headingColour;
  document.getElementById("imageSize").value = imageSize;
  console.log(navHeight, navWidth);
  document.getElementById("navHeight").value = navHeight;
  document.getElementById("navWidth").value = navWidth;
  console.log(imageState);
  var radio = document.getElementById("imageState");
  if (imageState === true){
    radio.checked = "true";
  }


}
/**
 *
 * @description This function resets the page when the user changes site details.
 *
 */
function setAdminAfterColourChange(){

        ajaxGet('../api/database/setSiteDetails.html', function(data) {
          grabElement(data, 'mainContent');
          setAdminFieldContent();
        });
        ajaxGet('../api/structure/head.html', function(data) { /*Defines file to grab*/
          grabElement(data, 'head'); /*Sets where to put file*/
        });
        ajaxGet('../api/structure/footer.html', function(data) {
          grabElement(data, 'footerLinks');
        });
        ajaxGet('../api/structure/topNavCMS.html', function(data) {
          grabElement(data, 'topNav');
          setHome();
          setProducts();
          setBasket();
          setCMS();
          setSearch();
        });

}
/**
 *
 * @description This function submits the admin set site details to the server. It collects the input values and sends
 * them to the server in the form of a url in a post request. The global variables that determine page details are then set with
 * the user defined values.
 *
 */
function submitSiteEdits() {
  console.log("running");
  var tabTitle = document.getElementById("tabTitle").value;
  var siteColour = document.getElementById("siteColour").value;
  var standardText = document.getElementById("standardText").value;
  var navText = document.getElementById("navText").value;
  var headingText = document.getElementById("headingText").value;
  var state = document.getElementById("imageState");
  var imgSize = document.getElementById("imageSize").value;
  var navH= document.getElementById("navHeight").value;
  var navW = document.getElementById("navWidth").value;
  console.log(state.checked);
  if (state.checked){
    imageState = true;
  } else{
    imageState = false;
  }
  document.getElementById("title").innerHTML = tabTitle;
  console.log(availableColours.indexOf(siteColour));
  if (availableColours.indexOf(siteColour) === -1){
    alert("One of the colours is not correct.");
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
    imageSize = imgSize;
    navHeight = navH;
    navWidth = navW;
    console.log("the image size is", imageSize);
    colourDetails = "pageColour="+pageColour+"&textColour="+textColour+"&navColour="+navColour+"&headingColour="+headingColour+"&imageSize="+imageSize+"&navHeight="+navH+"&navWidth="+navW;
    postJSON(
      colourDetails,
      '../api/database/updateColourScheme.php',
      function(data) {
          alert("The site details have been updated.");
      }
    );
    setAdminAfterColourChange();
    console.log(pageColour, textColour, navColour);
  }
}
/**
 *
 * @description This function runs each time ajaxGet is called. It sets the various site details that determine aspects such
 * as the colour of the headings.
 * @param {String} colour
 * @param {String} textColour
 * @param {String} navColour
 * @param {String} headingColour
 * @param {Int} imageSize
 * @param {Int} navHeight
 * @param {Int} navWidth
 *
 */
function setColour(colour, textColour, navColour, headingColour, imageSize, navHeight, navWidth){
  var tables = document.querySelectorAll("table", "td", "th");
  var th = document.getElementsByTagName("th");
  var nav = document.getElementsByTagName("a");
  var form = document.getElementsByTagName("form");
  var image = document.getElementsByTagName("img");
  var aLinks = document.getElementsByTagName("a");

  setHeightWidth(aLinks, navHeight, navWidth);
  setImageSize(image, imageSize);
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
/**
 *
 * @description Function sets the width and height of the 'a' elements on the site by iterating through the array
 * of them.
 * @param {Array} array
 * @param {Int} height
 * @param {Int} width
 *
 */
function setHeightWidth(array, height, width){
    for (var i = 0; i < array.length; i++){
        var element = array[i];
        var h = height+"vw";
        var w = width+"vw";
        element.style.height = h;
        element.style.width = w;
    }
}
/**
 *
 * @description Function sets site-wide image side according to user defined values.
 * @param {Array} array
 * @param {Int} imageSize
 *
 */
function setImageSize(array, imageSize){
    for (var i = 0; i < array.length; i++){
        var element = array[i];
        var size = imageSize+"vw";
        element.style.height = size;
        element.style.width = size;
    }
}
/**
 *
 * @description This function is used to set various styling options, determined by the array, colour and option the function is set.
 * @param {Array} array
 * @param {String} colour
 * @param {String} option
 *
 */
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
/**
 *
 * @description  This function is used to fill drop down menus with the existing product types. Achieved by updating
 * the datalist of the forms with the details from the productTypes Array.
 *
 */
function getTypes() {
  var options = '';

  for (var x = 0; x < productTypes.length; x++) {
    options += '<option value="' + productTypes[x] + '" />';
  }

  document.getElementById('types').innerHTML = options;
}
/**
 *
 * @description Function abandoned. Kept for reference. Was used before moving canvas was implemented.
 *
 */
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

/**
 *
 * @description Function changes the order of the productTypes array to change product sidebar.
 * @param {Event} e
 *
 */
function setOrder(e) {
  for (var i = 0; i < productTypes.length; i++) {
    var element = document.getElementById(productTypes[i]);
    var value = element.value;
    var place = productTypes.indexOf(productTypes[i]);
    productTypes.splice(place, 1);
    productTypes.splice(1, 0, value);
  }
}
/**
 *
 * @description  This function is used in conjunction with the 'ondrop' attribute. This function reades the .txt file in question
 * and changes the innerHTML of the element to the txt file's contents if the element has the 'data-edit' attribute.
 * @param {Event} e
 *
 */
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
          setTimeout(sendChanges, 3000, all);
        }

      };
      reader.readAsText(files[0]);
    }


}
/**
 *
 * @description This function is used for dropping images onto the page for upload. It simply adds the file of the dragged object
 * to the upload file list.
 * @param {Event} e
 *
 */
function dropFile(e){
     e.preventDefault();
     var dt = e.dataTransfer;
     var files = dt.files;
     document.getElementById("imageFile").files = files;
}

/**
 *
 * @description Function creates the canvases that correspond to the existing product types. It loops through the existing array
 * and creates a canvas for each one and sets the attributes that allow for dragging and movement.
 *
 */
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

/**
 *
 * @description This function simply prevents the standard course of action when the dragged object is hovering over an element.
 * @param {Event} ev
 *
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *
 * @description This function allows for an element to be dragged.
 * @param {Event} ev
 *
 */
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.target.getAttribute("id"));
}

/**
 *
 * @description  This function moves the variables within the productTypes array according to the array its passed and using the splice function.
 * @param {Array} children
 *
 */
function moveVariablesOld(children) {
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
/**
 *
 * @description This function moves the nodes within the parent nodes using the passed variables.
 * @param {Element} parentNode
 * @param {Element} newNode
 * @param {Element} target
 * @param {Element} children
 *
 */
function insertAfter(parentNode, newNode, target, children) {
  parentNode.insertBefore(newNode, target);
  moveVariables(children);
}

/**
 *
 * @description This function retrieves all the information required to move the canvas' on the page. The insertAfter call actually moves the elements.
 * @param {Event} ev
 *
 */
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
 * @description Function sets the admin page and sub pages through event listeners and ajax calls.
 *
 */
function setAdmin(){
  document.getElementById("adminPage").addEventListener("click", function(data) {

    ajaxGet('../api/navigation/adminSidebar.html', function(data) {
      grabElement(data, 'sidebar');

      document.getElementById("stock").addEventListener("click", function(data) {
        ajaxGet('../api/database/stock.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
          generateReport();
        });
      });
      document.getElementById("orders").addEventListener("click", function(data) {
        ajaxGet('../api/database/orderList.html', function(data) {
          grabElement(data, 'mainContent');
          getOrders();

        });
      });
    });
    ajaxGet('../api/database/stock.html', function(data) {
      grabElement(data, 'mainContent');
      getTypes();
      generateReport();
    });
  }, false);
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
 * @description Function creates a bin image that is produced when the user enters a valid product code that is to be deleted.
 *
 */
function createBin(){
  var target = document.getElementById("binArea");
  var section = document.createElement("section");
  section.setAttribute("id", "binImage");
    var canvas = document.createElement("img");
    canvas.setAttribute("id", "bin");
    canvas.setAttribute("src", "../images/recycling-bin.jpg");
    canvas.setAttribute("data-product", "true");
    canvas.setAttribute("ondrop", "dropDeleteImage(event)");
    canvas.setAttribute("ondragstart", "drag(event)");
    canvas.setAttribute("data-product", "true");
    canvas.setAttribute("ondragover", "allowDrop(event)");
    canvas.setAttribute("draggable", "false");

    section.appendChild(canvas);
  target.appendChild(section);
}
/**
 *
 * @description Function defines what is to be done when the product image is dropped over the bin. Upon drop the code of
 * the product is sent to the server where said product is deleted from records.
 * @param {Event} ev
 *
 */
function dropDeleteImage(ev){


    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var object = document.getElementById(data);
    var target = ev.target;
    if (target.hasAttribute("data-product")){
        var code = document.getElementById("productCode").value;
        productDetails = "code="+code;
          postJSON(
            productDetails,
            '../api/database/deleteProduct.php',
            function(data) {

            }
          );
    }

    object.style.display = 'none';
    alert("Product "+object.getAttribute("id")+" has been deleted.");
    document.getElementById("productCode").innerHTML = null;
}

/**
 *
 * @description Function sets the CMS page page through event listeners that produce ajax calls.
 *
 *
 */
function setCMS() {
  document.getElementById("admin").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('../api/navigation/cmsSidebar.html', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("addProduct").addEventListener("click", function(data) {
        ajaxGet('../api/database/addJSON.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
          sendImage();
        });
      });
      document.getElementById("stocklevels").addEventListener("click", function(data) {
        ajaxGet('../api/database/stockLevels.html', function(data) {
          grabElement(data, 'mainContent');
          getQuantity();
        });
      });
      document.getElementById("remove").addEventListener("click", function(data) {
        ajaxGet('../api/database/removeProduct.html', function(data) {
          grabElement(data, 'mainContent');
          deletePage();
        });
      });
      document.getElementById("addType").addEventListener("click", function(data) {
        ajaxGet('../api/database/addProductType.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();

        });
      });
      document.getElementById("editProduct").addEventListener("click", function(data) {
        ajaxGet('../api/database/editAdmin.html', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
        });
      });
      document.getElementById("setPageDetails").addEventListener("click", function(data) {
        ajaxGet('../api/database/setSiteDetails.html', function(data) {
          grabElement(data, 'mainContent');
          console.log(navHeight);
          setAdminFieldContent();

        });
      });
      document.getElementById("setProductLineup").addEventListener("click", function(data) {
        ajaxGet('../api/database/productOrder.html', function(data) {
          grabElement(data, 'mainContent');
          //createSetBar();
          createCanvas();
        });
      });
    });
    ajaxGet('../api/database/addJSON.html', function(data) {
      grabElement(data, 'mainContent');
      getTypes();
    });
  }, false);
}

/**
 *
 * @description This function sets the basket page and sub pages through event listeners and ajax calls.
 *
 */
function setBasket() {
  document.getElementById("myBasket").addEventListener("click", function(data) { /*offer sidebar & page */
    ajaxGet('../api/database/getBasketJS.html', function(data) {
      grabElement(data, 'mainContent');
      generateTable();
      getOrderDetails();
    });

    ajaxGet('../api/navigation/basketSidebar.html', function(data) {
      grabElement(data, 'sidebar');
    });


  }, false);

}

/**
 *
 * @description Function sets intial page and general page structure through a series of function calls.
 *
 */
function setPage() {
  setPageStructure();
  ajaxGet('../api/structure/topNavCMS.html', function(data) {
    grabElement(data, 'topNav');
    setHome();
    setProducts();
    setBasket();
    setSearch();
    setCMS();


  });


}

/**
 *
 * @description Function sets intial page and general page structure through a series of function calls.
 *
 */
function setPageCustomer() {
  setPageStructure();
  ajaxGet('../api/structure/topNav.html', function(data) {
    grabElement(data, 'topNav');
    setHome();
    setProducts();
    setBasket();
    setSearch();


  });


}

/**
 *
 * @description Function sets intial page and general page structure through a series of function calls.
 *
 */
function setPageAdmin() {
  setPageStructure();
  //adminPageStructure();


}

/**
*
*/
function adminPageStructure(){
  ajaxGet('../api/navigation/adminSidebar.html', function(data) {
    grabElement(data, 'sidebar');

    document.getElementById("stock").addEventListener("click", function(data) {
      ajaxGet('../api/database/stock.html', function(data) {
        grabElement(data, 'mainContent');
        getTypes();
        generateReport();
      });
    });
    document.getElementById("orders").addEventListener("click", function(data) {
      ajaxGet('../api/database/orderList.html', function(data) {
        grabElement(data, 'mainContent');
        getOrders();

      });
    });
  });
  ajaxGet('../api/database/stock.html', function(data) {
    grabElement(data, 'mainContent');
    getTypes();
    generateReport();
  });
}
/**
 *
 * @description Page sets elements of intial page load for the admin page.
 *
 */
function pageLoadAdmin() {
  document.addEventListener("keypress", function(){
    sendDBChanges(event);
    }
    );
  adminPageStructure();
  getJSON("../api/database/selectTypeJSON.php", function(data) {
    console.log(data);
    getProducts(data);

  });

  getJSON("../api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });
  getDetails();
}
/**
 *
 * @description Page sets elements of intial page load.
 *
 */
function pageLoad() {
  document.addEventListener("keypress", function(){
    sendDBChanges(event);
    }
    );
  ajaxGet('../api/navigation/homeSidebar.html', function(data) {
    grabElement(data, 'sidebar');
    document.getElementById("contactUs").addEventListener("click", function(data) { /*sets contact us button with content grab */
      /*Content*/
      ajaxGet('../api/database/contactUs.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("description").addEventListener("click", function(data) {
      ajaxGet('../api/database/description.html', function(data) {
        grabElement(data, 'mainContent');
      });
    });
    document.getElementById("changeCSS").addEventListener("click", function(data) {
      ajaxGet('../api/navigation/changeColour.html', function(data) {
        grabElement(data, 'mainContent');
      });

    });
  });

  ajaxGet('../api/database/contactUs.html', function(data) {
    grabElement(data, 'mainContent');
  });
  getJSON("../api/database/selectTypeJSON.php", function(data) {
    console.log(data);
    getProducts(data);

  });
  getJSON("../api/database/getColourScheme.php", function(data) {
    getScheme(data);

  });

  getJSON("../api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });
  getDetails();
}

/**
 *
 * @description Function retrieves existing product types from the server.
 *
 */
function refreshTypes() {
  getJSON("../api/database/selectProductType.php", function(data) {
    getProductTypes(data);
  });
}

/**
 *
 * @class Creates custom event that listens for products to be added to the basket.
 * - Based on examples provided from Dr Rich Boakes.
 * @param {Object} detail
 * @param {Int} quantity
 *
 */
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

/**
 * @class Fires basket event using the product details on each product button (JSON object) and parsing of said JSON object.
 * - Based on examples provided from Dr Rich Boakes.
 * @param {Event} e
 *
 */
var clicked = function(e) {
  //alert('clicked running');
  fireBasketEvent(
    JSON.parse(e.currentTarget.dataset.detail),
    1
  );
};

/**
 *
 * @description Function applies event listeners to all buttons, calls 'clicked' when intiated.
 *
 */
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

/**
 * @class Class uses details on the event button to create objects and add them to the 'myBasket' local array. This
 * array is then submitted to local storage. If the product that is trying to be added already exists in the array then the
 * quantity is just increased.
 * @param {Event} e
 *
 */
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
    console.log(typeof myBasket);
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
  localStorage.setItem("myBasket", JSON.stringify(myBasket));
};



document.addEventListener('basket', countItems);

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
      ajaxGet('../api/navigation/homeSidebar.html', function(data) {
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
          ajaxGet('../api/navigation/changeColour.html', function(data) {
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
 * @description This function creates and appends table according to the product array. It only prints products according to
 * passed product type. Table structure is created in DOM and then appended to document.
 * @param {String} type
 *
 */
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
        console.log(item[5]);
        if (item[5] <= 0){
          cellContent = "Out of Stock";
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
          setTDEventListener(cell, item, i);
          } else {
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
/**
 *
 * @description  This function moves the variables within the productTypes array according to the array its passed and using the splice function.
 * @param {Array} children
 *
 */
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
  saveNewProductOrder();
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
 * @description Function that handles the dropping of product images onto the basket image. On drop a basket event is fired
 * using the data-detail attribute set on the product image.
 * @param {Event} ev
 *
 */

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
/**
 *
 * @description  Function applies event listeners to the individual rows on a product table and calls createProductPage.
 * @param {Element} cell
 * @param {Array} item
 * @param {Int} i
 *
 */
function setTDEventListener(cell, item, i) {
  cell.addEventListener("click", function() {
    createProductPage(item[0], item[1], item[2], item[4], item[5], i, item, item[6]);
  });
}
/**
 *
 * @description Function retrieves product information from page, creates object and inserts it into the changedProducts array.
 *
 */
function getProductDetails(){
  console.log("getting changes");
  var code= document.getElementById("productPageCode").innerHTML;
  var name= document.getElementById("productPageName").innerHTML;
  var desc= document.getElementById("productPageDesc").innerHTML;
  var price=document.getElementById("productPagePrice").innerHTML;
  var quantity=document.getElementById("productPageQuantity").innerHTML;
  var found = false;
  for (var x = 0; x <changedProducts.length; x++){
    var item = changedProducts[x];
    if (item[0] === code){
      item[1] = name;
      item[2] = desc;
      item[3] = price;
      item[4] = quantity;
      found =true;
    }
  }
  if (found === false){
      changedProducts.push({
        productCode: code,
        productName: name,
        description: desc,
        price: price,
        quantity: quantity
      });

  }
}
/**
 *
 * @description Function iterates through all elements on the page and if criteria (has data-edit attribute) is met then
 * a call to getProductDetails is made after 3 seconds.
 *
 */
function getProductChanges(){
  console.log("running changes");
  var all = document.getElementsByTagName("*");
  for (var i = 0; i < all.length; i++){
    var element = all[i];
    if (element.hasAttribute("data-edit")){
      console.log("has");
      element.addEventListener("click", function(){
        console.log("click");
        document.addEventListener("keypress", function(){
          console.log("press");
          setTimeout(getProductDetails, 3000);
        });
        });
        element.addEventListener("mouseover", function(){
          element.addEventListener("keypress", function(){
            setTimeout(getProductDetails, 3000);
          });
        });
      }
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
 * @description Function clears changedProductArray and refreshers the list of products.
 *
 */
function whenChangesSet(){
  changedProducts=[];
  refreshProducts();

}
/**
 *
 * @description If an element with the id 'productPage' is present a call to sendProductChanges is made else no action.
 *
 */
function ifSend(){
      console.log(document.getElementById("productPage"));
      if(document.getElementById("productPage")=== null){

      }else{
        sendProductChanges();
        console.log("sent");

        console.log(changedProducts);

      }
}
/**
 *
 * @description Function uses ajax function to call the productPage.html and calls functions to create the html elements
 * such as the product details and image.
 * @param {String} productCode
 * @param {String} productName
 * @param {String} desc
 * @param {Int} price
 * @param {Int} quantity
 * @param {Int} i
 * @param {Array} item
 * @param {String} imageLocation
 *
 */
function createProductPage(productCode, productName, desc, price, quantity, i, item, imageLocation) {
  ajaxGet('../api/database/productPage.html', function(data) {
    console.log("create");
    grabElement(data, 'mainContent');
    setProductPage(productCode, productName, desc, price, quantity, i, item, imageLocation);
    getProductChanges();

  });
}

/**
 *
 * @description Function determines what details are set on the product page, specifically image. Function sets the product image according
 * to relative path associated with the image, if there is no image path set for the product then the placeholder image is set.
 * @param {String} productCode
 * @param {String} productName
 * @param {String} desc
 * @param {Int} price
 * @param {Int} quantity
 * @param {Int} i
 * @param {Array} item
 * @param {String} imageLocation
 *
 */
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

    path = "../images/"+imageLocation;
  } else{

    path = "../images/noProduct.jpg";
  }


  document.getElementById("productImage").setAttribute("src", path);
 }
  createProductButton(item, i);
  getButtons();

}

/**
 *
 * @description   Function creates product button according to the variables passed.
 * @param {Array} item
 * @param {Int} i
 *
 */
function createProductButton(item, i) {
  console.log("asd");
  if(item[5] <= 0){
      var text = "Out of Stock";
      var node = document.createTextNode(text);
      var celButton = document.createElement("p");
      celButton.appendChild(node);
      document.getElementById("productImage").removeAttribute("ondragover");
      document.getElementById("productImage").removeAttribute("ondragstart");
      document.getElementById("basketImage").removeAttribute("ondrop");
  }else {
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
      if(document.getElementById("basketImage").hasAttribute("ondrop")){
      }else{
        document.getElementById("basketImage").setAttribute("ondrop", "dropImage(event)");
      }
    }
  document.getElementById("productButton").appendChild(celButton);
}

/**
 *
 * @description Function generates table through DOM element creation and the contens of myBasket local array. This also includes
 * an overall total price calculation thats printed at the bottom of the table.
 *
 */
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
    for (var x = 0; x <= 6; x++) {
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
      else if (x === 6) {
        titleContent = "Remove?";
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
      var removeButton = document.createElement("button");
      for (var j = 0; j <= 6; j++) {
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
          totPrice += Number(itemPrice);
          console.log(Number(itemPrice), typeof totPrice, totPrice);
        } else if (j === 5) {
          cellContent = basketObject["quantity"];


        }
        else if (j === 6) {

          removeButton.setAttribute("data-code", basketObject["productCode"]);
          removeButton.setAttribute("onclick", "removeProductBasket(event)");
          removeButton.innerHTML = "Remove";
        }
        if (basketObject === null) {
          cellContent = "N/A";
        }
        var cell = document.createElement("td");
        if (j===6){
          cell.appendChild(removeButton);
        } else{
          var cellText = document.createTextNode(cellContent);
          cell.appendChild(cellText);
        }

        row.appendChild(cell);
      }

      // add the row to the end of the table body
      tblBody.appendChild(row);

    }

    var totalPrice = document.createElement("tr");
    for (var p = 0; p <= 6; p++) {
      if (p === 0) {
        priceContent = " ";
      } else if (p === 1) {
        priceContent = " ";
      } else if (p === 2) {
        priceContent = " ";
      } else if (p === 3) {
        priceContent = " ";
      } else if (p === 4) {
        priceContent = " ";
      }else if (p === 5) {
        priceContent = "Total Price: ";
      } else if (p === 6) {
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
/**
 *
 * @description Function removes products from the basket. If product quantity is more than one the quantity
 * is just reduced but if quantity is equal to 1 then the product is removed from the myBasket array.
 * @param {Event} ev
 *
 */
function removeProductBasket(ev){
  var button = ev.target;
  var code = button.getAttribute("data-code");
  for (var i =0; i<myBasket.length; i++){
    var product = myBasket[i];
    if (code === product["productCode"]){
      var quantity = Number(product["quantity"]);
      if (quantity === 1){
      var location = myBasket.indexOf(product);
      myBasket.splice(location, 1);
      alert("You have removed one "+product["productName"]+".");
      localStorage.setItem("myBasket", JSON.stringify(myBasket));
      ajaxGet('../api/database/getBasketJS.html', function(data) {
        grabElement(data, 'mainContent');
        generateTable();
      });
    } else{
      product["quantity"] = quantity - 1;
      alert("You have removed one "+product["productName"]+".");
      localStorage.setItem("myBasket", JSON.stringify(myBasket));
      ajaxGet('../api/database/getBasketJS.html', function(data) {
        grabElement(data, 'mainContent');
        generateTable();
      });
    }
    }
  }

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

/**
 *
 * @description Function clears the myBasket array and refreshes the basket page.
 *
 */
function clearBasket() {
  console.log(myBasket.length);
  myBasket = [];
  console.log(myBasket.length);
  console.log(myBasket);
  ajaxGet('../api/database/getBasketJS.html', function(data) {
    grabElement(data, 'mainContent');
    generateTable();
  });
  alert('You have cleared the contents of your basket.');
  localStorage.clear();

}

/**
 *
 * @description Function adds values to the datalist used by the searchbar according to what the
 * user types in making it look like the search bar is predicting what the user is looking for.
 * This is achieved through searching through the productArray looking for matches.
 *
 */
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

/**
 *
 * @description This function retrives the basket that each user has stored in local storage.
 * The rertrieved data is then parsed over and inserted back into the myBasket local array.
 *
 */
function retrieveBasket(){
  var localBasket = JSON.parse(localStorage.getItem("myBasket"));
  console.log(typeof localBasket, localBasket);
  if (localBasket === null){


  }else {
    for (var i = 0; i <localBasket.length; i++){
      var item = localBasket[i];
      myBasket.push(item);
    }
  }

}

//Matthew Champion
