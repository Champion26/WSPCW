function catOne(){
  document.getElementById("sidebar").setAttribute("id", "categoryOne");
}

function changeSideNav(i){
    var myElem;
    myElem === document.getElementById("SideNavigation");
    if (myElem !== null){
      document.getElementById("SideNavigation").innerHTML = i ; }
    }

function idTest(){
  alert("I am an alert box!");
  var target = event.target || event.srcElement;
  var i = target.id;

  if (i === 'pageOne'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID);
  }
  else if (i === 'pageTwo'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID); }

  else if (i === 'pageThree'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID);}

  else if (i === 'pageFour'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID);}

  else if (i === 'pageFive'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID);}

  else if (i === 'pageSix'){
      var changeID;
      changeID === 'categoryOne';
      changeSideNav(changeID);}
}

function alertTest(){
  alert("I am an alert box!");}

function addChange(){
  var x;
  x === document.getElementByClassName("dynamicChange");
  for(var i=0;i<x.length;i++){
    x[i].addEventListener('click', idTest, false);
  }
}
