
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
  ajaxGet('../api/structure/head.php', function(data) { /*Defines file to grab*/
    grabElement(data, 'head'); /*Sets where to put file*/
  });
  ajaxGet('../api/structure/footer.php', function(data) {
    grabElement(data, 'footerLinks');
  });

}


/**
 *
 *
 * @description Function that sets the home page through the use of event listeners on 'a' links with ids and corresponding ajax calls.
 */
function setHome() {
  document.getElementById("home").addEventListener("click", function(data) { /*homepage sidebar*/

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
  }, false);
}


/**
 *
 *
 * @description Sets the search page through event listeners and AJAX.
 */
function setSearch() {
  document.getElementById("search").addEventListener("click", function(data) { /*homepage sidebar*/

    ajaxGet('../api/navigation/searchSidebar.php', function(data) {
      grabElement(data, 'sidebar');
    });
    ajaxGet('../api/database/search.php', function(data) {
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
      ajaxGet('../api/database/getProductTable.php', function(data) {
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

    ajaxGet('../api/navigation/productSidebar.php', function(data) {
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
 * @description This function sets the offers page through ajax and event listeners. The 'Offers' page was scrapped.
 *
 */
function setOffers() {

  document.getElementById("offers").addEventListener("click", function(data) { /*offer sidebar & page */

    ajaxGet('../api/navigation/offerSidebar.php', function(data) {
      grabElement(data, 'sidebar');
      document.getElementById("offerOne").addEventListener("click", function(data) {
        ajaxGet('../api/database/offerOne.php', function(data) {
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

        ajaxGet('../api/database/setSiteDetails.php', function(data) {
          grabElement(data, 'mainContent');
          setAdminFieldContent();
        });
        ajaxGet('../api/structure/head.php', function(data) { /*Defines file to grab*/
          grabElement(data, 'head'); /*Sets where to put file*/
        });
        ajaxGet('../api/structure/footer.php', function(data) {
          grabElement(data, 'footerLinks');
        });
        ajaxGet('../api/structure/topNavCMS.php', function(data) {
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
 * @description Function sets the admin page and sub pages through event listeners and ajax calls.
 *
 */
function setAdmin(){
  document.getElementById("adminPage").addEventListener("click", function(data) {

    ajaxGet('../api/navigation/adminSidebar.php', function(data) {
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

    ajaxGet('../api/navigation/cmsSidebar.php', function(data) {
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
        ajaxGet('../api/database/addProductType.php', function(data) {
          grabElement(data, 'mainContent');
          getTypes();

        });
      });
      document.getElementById("editProduct").addEventListener("click", function(data) {
        ajaxGet('../api/database/editAdmin.php', function(data) {
          grabElement(data, 'mainContent');
          getTypes();
        });
      });
      document.getElementById("setPageDetails").addEventListener("click", function(data) {
        ajaxGet('../api/database/setSiteDetails.php', function(data) {
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
    ajaxGet('../api/database/getBasketJS.php', function(data) {
      grabElement(data, 'mainContent');
      generateTable();
      getOrderDetails();
    });

    ajaxGet('../api/navigation/basketSidebar.php', function(data) {
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
  ajaxGet('../api/structure/topNavCMS.php', function(data) {
    grabElement(data, 'topNav');
    setHome();
    setProducts();
    setBasket();
    setSearch();
    setCMS();
    setAdmin();

  });


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
  ajaxGet('../api/navigation/homeSidebar.php', function(data) {
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
      ajaxGet('../api/navigation/changeColour.php', function(data) {
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
        ajaxGet('../api/database/getBasketJS.php', function(data) {
          grabElement(data, 'mainContent');
          generateTable();
        });
      } else{
        product["quantity"] = quantity - 1;
        alert("You have removed one "+product["productName"]+".");
        localStorage.setItem("myBasket", JSON.stringify(myBasket));
        ajaxGet('../api/database/getBasketJS.php', function(data) {
          grabElement(data, 'mainContent');
          generateTable();
        });
      }
      }
    }

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
