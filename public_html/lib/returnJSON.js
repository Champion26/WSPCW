function returnJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.readyState === 4) {
      if (ajaxObj.status === 200){
        callback(JSON.parse(ajaxObj.responseText));
        console.log(ajaxObj.responseText);
      }
    }
      };
  ajaxObj.send(variable);
}
