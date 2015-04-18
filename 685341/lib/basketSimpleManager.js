var basket = {};

var countItems = function (e) {

    var current = basket[e.detail.productCode];
    if (current) {
        // the entry exists, so add the quantity to it
        current.quantity += e.detail.quantity;
    } else {
        // it's a new entry so just use the detail object
        current = e.detail;
        basket[e.detail.productCode] = current;
    }

    console.log(basket);
};

document.addEventListener('basket', countItems);
