<h2>Search</h2>
<section id="searchPage">
  <section id="codeSection">
      <form id="byCode" >
        <fieldset>
          Product Code:  <input type="text" id="productCode" name="productCode" ><br>
          <input type="button" value="Search" onclick="searchByCode(event)">
        </fieldset>
      </form>
  </section>
  <section id="nameSection">
    <form id="byName" >
      <fieldset>
        Product Name:  <input type="text" id="productName" name="productName" ><br>
        <input type="button" value="Search" onclick="searchByName(event)">
      </fieldset>
    </form>
  </section>
</section>
  <table id="searchTable"></table>
