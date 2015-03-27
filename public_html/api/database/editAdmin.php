
<h2 id="editProductTitle" data-edit="">Edit Product</h2>
<p id="editSearchIntro" data-edit=""> Please enter the product code that you wish to search for.</p>


<form id="searchProduct" >
  <fieldset>
  Product Code:  <input type="text" id="productCode" name="productCode" ><br><br>
  <input type="button" value="Search" onclick="getSearch(event)">
</fieldset>
</form>

<p id="searchExplanation" data-edit="">The results will appear below</p>
<form id="viewProduct">
  <fieldset>
  <input type="hidden"  name="pCode" id="pCode" value=""><br>
  <br>
  Product Name:  <input type="text" name="productNa" id="productNa" value="" > <br>
  <br>
  Description:  <input type="text"   name="description" id="description" value=""> <br>
  <br>
  Product Type:  <input list="types" id="productType" name="productType" ><br>
  <datalist id="types"></datalist>
  <br>
  Price (£):  <input type="number" step="any" name="price" id="price" value="" > <br>
  <br>
  Quantity:  <input type="number"  name="quantity" id="quantity" value="" ><br><br>
  Image Name: <input type="string" name="imageName" id="imageName" value=""<br><br>

  <input type="button" name='submitEdit' value="Submit" onclick="submitChanges(event)">


</fieldset>
</form>
