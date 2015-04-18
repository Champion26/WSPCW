<script> 
 var types = ["Desktop, Laptop"];
 var arrayLength = types.length;
 for (var i = 0; i < arrayLength; i++) {
   var element = types[i];
   var myElem;
   myElem === document.getElementById(element)
   if (myElem !=='null'){
     <?php
     $type = element;
     include 'selectByType.php';
     ?>
   }
 }


</script>
