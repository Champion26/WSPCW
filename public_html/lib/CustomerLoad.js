
/**
 *
 * @description Function runs upon page load. Sets all intial details including page structure and local storage.
 *
 */
window.onload = function() {

  setPageCustomer();
  pageLoad();
  searchEvent();
  console.log(productArray);
  retrieveBasket();

};
