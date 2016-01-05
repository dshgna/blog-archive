$(document).ready(function() {
  $("aside").load("http://codepen.io/dshgna/pen/qbqjmo.html"); 
  display_snippets();
});

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
        var item = "<article class='post-snippet'><h3>" + value.title + "</h3><h5>" + value.date 
           + "</h5><div class='snippet-text text-justify' id='" + index + "'></div>"
           + "<button class='toggle-content' onclick='toggle_content("+ index + ")'> Read More/Less -> </button>" 
           + "</article>";
       $("main").append(item);
       load_markdown(index, value.link); 
    });
  });
};