function ajaxGet(URL, callback) {
  searchArray = [];
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("GET", URL, true); // The TRUE implies asynchronous
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200)
      if (ajaxObj.readyState === 4)
        callback(ajaxObj.responseText);
        findEditableElements();

  };
  ajaxObj.send(null);
  findEditableElements();

}
