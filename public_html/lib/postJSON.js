function postJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL);
  ajaxObj.load = function() {
    callback(ajaxObj.responseText);
  };
  ajaxObj.send(variable);
};
