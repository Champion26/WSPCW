<?php
include '../api/database/addData.php';
?>
<div id="head"></div>
<header>
      <h1 id='pageTitle' data-edit="">Company Name</h1>
      <img id="basketImage"  ondrop="dropImage(event)" ondragover="allowDrop(event)" src="http://localhost/WebScripting/Web-CW/public_html/images/images.jpg"></img>
        <form id="searchBar" >
          <fieldset>
            <input list="names" id="productN" name="productN"  ><br>
            <datalist id="names"></datalist>
            <input type="button" value="Search" onclick="searchByNameGlobal(event)">
          </fieldset>
        </form>


  <nav id='topNav'></nav>
</header>
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

</body>



</html>
