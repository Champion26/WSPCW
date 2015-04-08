function ajaxGet(URL, callback) {
  ifSend();
  searchArray = [];
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("GET", URL, true); // The TRUE implies asynchronous
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200){
      if (ajaxObj.readyState === 4){
        callback(ajaxObj.responseText);
        findEditableElements();
        setColour(pageColour, textColour, navColour, headingColour);

  }
}
  };
  ajaxObj.send(null);
  findEditableElements();

}
