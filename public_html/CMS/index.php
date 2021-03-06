<?php
include '../api/database/addData.php';
?>
<div id="head"></div>
<header>
  <section id="pageTitleSection">
      <h1 id='pageTitle' data-edit="">Company Name</h1>
      <h1>Content Management System (CMS)</h1>
    </section>
      <section id="basketImageArea">
      <img id="basketImage" onclick="basketLink()"  ondrop="dropImage(event)" ondragover="allowDrop(event)" src="http://localhost/WebScripting/Web-CW/public_html/images/images.jpg"></img>
    </section>
</header>
<form id="searchBar" >
  <fieldset>
    <input list="names" id="productN" name="productN"  ><br>
    <datalist id="names"></datalist>
    <input type="button" value="Search" onclick="searchByNameGlobal(event)">
  </fieldset>
</form>


<nav id='topNav'></nav>
<div id="dynamic"></div>
<body>

  <article>
    <section id="content">
      <nav id="sidebar">
        <div id="navPlacement"></div>
      </nav>
      <section id="mainContent">
      </section>
    </section>
  </article>
  <footer id="footer">
    <div id ="footerLinks"></div>
  </footer>
  <script src='../lib/ajaxget.js' type="text/javascript"></script>
  <script src="../lib/getJson.js" type="text/javascript"></script>
  <script src="../lib/Main.js" type="text/javascript"></script>
  <script src="../lib/changeCSS.js" type="text/javascript"></script>
  <script src="../lib/postJSON.js" type="text/javascript"></script>
  <script src='../lib/CMSLoad.js' type="text/javascript"></script>

</body>



</html>
