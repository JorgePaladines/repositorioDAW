function addNew(autor, descripcion, pubDate){
  var pAutor = $("<p/>", {
    "class":"negrita",
    html: autor
  });

  var pDescripcion = $("<p/>", {
    html: descripcion
  });

   var pDate = $("<p/>", {
     "class":"text-right",
      html: pubDate
  });

  var divTweet = $( "<div/>", {
    "class":"col-12 tweet card-body"
  });

  pAutor.appendTo(divTweet);
  pDescripcion.appendTo(divTweet);
  pDate.appendTo(divTweet);

  divTweet.appendTo("#tweets");

}

function loadTweets(){
  $.ajax({
    type: "GET",
    url: "https://twitrss.me/twitter_user_to_rss/?user=BethesdaStudios",
    dataType: "xml",
    success: function(xml){
      $(xml).find('item').each(function(){
        var autor = $(this).find('dc\\:creator').text();
        autor = autor.slice(2,autor.length-1);
        var descripcion = $(this).find('description').text();
        var pubDate = $(this).find('pubDate').text();

        addNew(autor, descripcion, pubDate);

      });
    },
    error: function() {
      alert("Error al procesar el xml");
    }
  });
}

$("document").ready(function(){
  loadTweets();
  $('button').click(function(e){
    var texto = $("input#buscador").val();

    if(texto.length != 0){
      $("p#textoBuscado").text(texto);

      var descripcion = $("#tweets .card-body");
      descripcion.filter(function(){

        $(this).show();

        var tweet = $(this).text();
        if(tweet.indexOf(texto) == -1){
          $(this).hide();
        }

      });
    }
    else{
       $("p#textoBuscado").text("Texto Buscado");
      $("#tweets .card-body").each(function(){
        $(this).show();
      });
    }
  });
});