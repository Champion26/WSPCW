
/**

   @description Early attempt at DOM styling. No longer used.

*/
function setRed() {
  document.getElementByTagName("table").style.border = "1px solid red";
  document.getElementByTagName("th").style.border = "1px solid red";
  document.getElementByTagName("th").style.backgroundColor = "red";
  document.getElementByTagName("td").style.border = "1px solid red";
  document.getElementByTagName("nav").style.backgroundColor = "red";
  document.getElementByTagName("form").style.borderColor = "red";
}



/**
 *
 * @description This function merely loops through all elements on the page and then calls a series of functions if
 * the element has the 'data-edit' attribute.
 *
 */
function findEditableElements() {
  var all = document.getElementsByTagName("*");

  for (var i = 0; i < all.length; i++) {
    var element = all[i];

    if (element.hasAttribute("data-edit")) {

      applyEdits(element);
      saveChanges(element);
      element.setAttribute("ondrop", "dropTXTFile(event)");
      element.setAttribute("ondragover", "allowDrop(event)");


    }
  }
}
