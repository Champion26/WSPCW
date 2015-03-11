function getJSON(URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("GET", URL, true);
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200)
      if (ajaxObj.readyState === 4)
        callback(JSON.parse(ajaxObj.responseText));
      };
      ajaxObj.send();
    };
