function ajaxGet(URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("GET", URL, true); 
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200)
      if (ajaxObj.readyState === 4)
        callback(ajaxObj.responseText);
  };
  ajaxObj.send(null);
};
