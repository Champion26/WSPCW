function postJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajaxObj.load = function() {
    if (ajaxObj.responseText == "1"){
      alert("You have added a new product");
    }else{
      alert("The product was not added.");
    }
  };
  ajaxObj.send(variable);
}

function returnJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajaxObj.load = function() {
    callback(JSON.parse(ajaxObj.responseText));
  };
  ajaxObj.send(variable);
}
