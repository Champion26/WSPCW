<script>
    var myElem = window.getElementById('catOne');
    if (myElem == null) alert('does not exist!');
    </script>

    ajaxGet('api/homeSidebar.php', function(data){
      grabElement(data, 'sidebar')
      document.getElementById("contactUs").addEventListener("click", function(data){
        ajaxGet('content/message.txt', function(data){
          grabElement(data, 'mainContent')
        });}, false);
        document.getElementById("description").addEventListener("click", function(data){
          ajaxGet('content/description.txt', function(data){
            grabElement(data, 'mainContent')
          });}, false);
        });
