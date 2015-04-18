
/**
 *
 * @description Function runs upon page load. Sets all intial details including page structure and local storage.
 *
 */
window.onload = function() {

  setPage();
  pageLoad();
  searchEvent();
  console.log(productArray);
  retrieveBasket();

};
