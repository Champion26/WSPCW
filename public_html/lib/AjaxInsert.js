/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var pageLoaded = function () {

	var xhr, target;

	xhr = new XMLHttpRequest();
	xhr.open("GET", "message.txt", false);
	xhr.send();

	target = document.getElementById("AjaxInsert");
	target.innerHTML = xhr.responseText;

};
