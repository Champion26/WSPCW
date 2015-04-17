/**
* @description Function designed to send a variable (typically a string url) to a file.
* -Based on examples provided by Kit Lester.
* @param {String} URL
* @param {Unknown} callback
*/
function postJSON(variable, URL, callback) {
  var ajaxObj = new XMLHttpRequest();
  ajaxObj.open("POST", URL, true);
  console.log("posting");
  ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  ajaxObj.addEventListener("load",
    function() {
        console.log("received");
        callback(ajaxObj.responseText);
    }
  );
  ajaxObj.send(variable);
}

/**
* @description Function designed to send a variable (typically a string url) to a file and then parse over the JSON response.
* Typically used for sending and immediately retrieving information from PHP responders.
* -Based on examples provided by Kit Lester.
* @param {String} URL
* @param {Unknown} callback
*/
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
