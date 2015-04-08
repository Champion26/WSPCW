function postJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajaxObj.addEventListener("load",
  function() {
    callback(ajaxObj.responseText);
  }
);
  ajaxObj.send(variable);
}

function returnJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajaxObj.addEventListener("load",
    function() {
        console.log("received");
        callback(JSON.parse(ajaxObj.responseText));
    }
  );
  ajaxObj.send(variable);
}
