$(document).ready(function() {       
  $("aside").load("../templates/sidebar.html");                   
});

var disqus = function() {
  var d = document, s = d.createElement('script');
  s.src = '//dsgna.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
}();