$(document).ready(function() {
  $("aside").load("http://dshgna.github.io/templates/sidebar.html"); 
  display_snippets();
  load_by_url()
});

var load_by_url = function(){
  var anchor = window.location.hash.split('#')[1]
  console.log(anchor)
  if (anchor!='') {
    $(document.getElementById(anchor)).toggle();
  } 
}


var toggle_content = function(index){
  $(document.getElementById(index)).toggle()
}

var load_markdown = function(index, filename){
  var path = 'http://dshgna.github.io/posts/' + filename;
  var md = new Remarkable();
  var txt = "";
  $.get(path, function(data) {
    $(document.getElementById(index)).append(md.render(data));
  }); 
}

var display_snippets = function(){
  $.getJSON('http://dshgna.github.io/posts.json', function(data) {
     $.each( data.posts, function( index, value ) {
        var item = "<article class='post'><h1>" + value.title + "</h1><p class='date'>" + value.date + "</p><br>"+
            "<div class='text-justify md-text' id='" + index + "'></div>"
           + "<button class='btn btn-default toggle-content' onclick='toggle_content("+ index + ")'> Read More/Less -> </button>" 
           + "</article>";
       $("main").prepend(item);
       load_markdown(index, value.link); 
    });
  });
};