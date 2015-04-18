/**
* @description Function designed to retrieve a JSON object from a file and parse over it.
* -Based on examples provided by Kit Lester.
* @param {String} URL
* @param {Unknown} callback
*/
function getJSON(URL, callback) {
  var ajaxObj = new XMLHttpRequest();

  ajaxObj.open("GET", URL, true); // The TRUE implies asynchronous
  ajaxObj.onreadystatechange = function() {
    if (ajaxObj.status === 200)
      if (ajaxObj.readyState === 4)
        callback(JSON.parse(ajaxObj.responseText));
      };
      ajaxObj.send();

};
