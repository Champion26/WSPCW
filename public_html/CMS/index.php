<?php
include '../api/database/addData.php';
?>
<div id="head"></div>
<header>
      <h1 id='pageTitle' data-edit="">Company Name</h1>
      <h1 >Content Management System and Admin</h1>

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
  <script src="CMS.js" type="text/javascript"></script>
  <script src="../lib/changeCSS.js" type="text/javascript"></script>
  <script src="../lib/postJSON.js" type="text/javascript"></script>

</body>



</html>
