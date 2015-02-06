function attachEvents(){
  document.getElementById("home").addEventListener("click", homePage, false);
  document.getElementById("pageOne").addEventListener("click", pageOne, false);
  if (document.getElementById("catOne") != null){
    document.getElementById("catOne").addEventListener("click", desktopPC, false);
  };

  };

 window.onload = attachEvents();
