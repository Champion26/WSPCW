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
 * @description Function clears the myBasket array and refreshes the basket page.
 *
 */
function clearBasket() {
  console.log(myBasket.length);
  myBasket = [];
  console.log(myBasket.length);
  console.log(myBasket);
  ajaxGet('../api/database/getBasketJS.php', function(data) {
    grabElement(data, 'mainContent');
    generateTable();
  });
  alert('You have cleared the contents of your basket.');
  localStorage.clear();

}
