
<h2 id="siteEditTitle" data-edit="">Site Edit</h2>
<p id="siteEditIntro" data-edit="">This page will allow you to edit details about the site such as the title.</p>
<p id="editElementExplanation" data-edit="">Many elements of this site are editable by a simple click such as the main title. These elements will be highlighted in red when you hover over them or you can press and hold <strong>Shift + E</strong> to highlight all these editable elements.</p>
<p id="possibleColours"></p>
<form id="details">
  <fieldset>
  Site Tab Title:  <input type="text" id="tabTitle" name="tabTitle" ><br><br>
  Site Main Colour: <input list="colours" id="siteColour" name="siteColour"><br><br>
  <datalist id="colours"></datalist>
  Standard Text Colour: <input type="text" id="standardText"><br><br>
  Standard Nav Text Colour: <input type="text" id="navText"><br><br>
  Heading Text Colour: <input type="text" id="headingText"><br><br>
  Images (Enable or Disable): <input type="checkbox" id="imageState"name="imageState" value="true">

  <input type="button" value="Submit Changes" onclick="submitSiteEdits()">
</fieldset>
</form>
