/**
* @description This function is used to load elements onto the page to give the illusion
that the page has changed.
-Based on examples provided by Kit Lester.
* @param {String} URL
* @param {Unknown} Callback
*/
function ajaxGet(URL, callback) {
  ifSend();
  searchArray = [];
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("GET", URL, true); // The TRUE implies asynchronous
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200){
      if (ajaxObj.readyState === 4){
        callback(ajaxObj.responseText);
      //  setAllContent();
        findEditableElements();
        setColour(pageColour, textColour, navColour, headingColour, imageSize, navHeight, navWidth);

  }
}
  };
  ajaxObj.send(null);
  findEditableElements();

}
