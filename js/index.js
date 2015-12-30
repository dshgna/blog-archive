$(document).ready(function() {
  $("aside").load("templates/sidebar.html"); 
  display_snippets();
});

var display_snippets = function(){
    jQuery.each(posts, function(index, value) {
      var tags = ""
      jQuery.each(value.tags, function(index, tag) {
        tags = tags + "<span class='label label-primary'>" + tag + "</span>";
      });
      var item = "<article class='post-snippet'><h3>" + value.title + "</h3><h5>" + value.date + "</h5><div class='snippet-text text-justify'>" + value.text + "<a href='" + value.link +" target='_blank''> <b>Read More -> </b></a></div></article>";
    $("main").append(item);                 
  });
};


var posts = [
{ title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  date: "29th December 2015",
  link: "posts/template.html",
  tags: ["Python"],
  text: "Aliquam tempor odio sed velit convallis, id interdum orci viverra. In eget finibus ligula. Nunc auctor lorem sed elit finibus, sed condimentum elit tincidunt. Nam eget hendrerit velit, quis scelerisque eros. Quisque a nisl sit amet augue malesuada egestas. Ut accumsan lacus mollis felis semper, non ultrices felis sagittis. Maecenas eu consectetur nisi. Maecenas aliquam purus vel euismod mattis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque hendrerit, ipsum eget pulvinar sollicitudin, augue mauris vehicula neque, ac convallis libero velit quis nulla. Suspendisse ultrices elit quam, lobortis volutpat ante gravida vel."},
{ title: "Ut eget ante id ligula congue pellentesque sed nec sem",
  date: "29th December 2015",
  link: "posts/template.html",
  tags: ["Python"],
  text: "Nam ex felis, viverra nec gravida at, faucibus eget neque. Phasellus condimentum augue ut pellentesque vestibulum. Nullam blandit dolor augue, vel sagittis felis bibendum vestibulum. Mauris ultrices id mi et sagittis. Sed porttitor, nibh a faucibus lacinia, justo neque hendrerit diam, quis pulvinar sem nulla non lorem. In hac habitasse platea dictumst. Nulla sollicitudin eros at fermentum aliquam. Curabitur quis magna ac eros consequat rutrum nec nec enim."},
  { title: "Cras vel justo eu ex viverra rhoncus sed vel massa",
  date: "29th December 2015",
  link: "posts/template.html",
  tags: ["Python"],
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor quam risus, a aliquam ligula rutrum nec. Ut sodales elit ac massa auctor, ut aliquet sem rutrum. Nulla vitae urna leo. Sed id tempor augue, id hendrerit dui. In condimentum pharetra lorem nec posuere. Cras mollis pharetra auctor. Quisque tristique vehicula condimentum. Cras vitae magna laoreet, bibendum dui vel, porttitor arcu. Nunc vulputate tincidunt porta. Sed fringilla pulvinar fringilla. Integer sollicitudin mattis finibus. Nunc sit amet neque erat. In convallis vulputate urna sed elementum."},
{ title: "Nulla tristique lectus vitae est malesuada posuere quis quis dolor",
  date: "29th December 2015",
  link: "posts/template.html",
  tags: ["Python"],
  text: "Morbi orci mauris, vulputate sed urna a, congue consectetur enim. Curabitur sed orci id diam sollicitudin viverra. Sed aliquet volutpat purus ut vestibulum. In eget orci est. Vivamus pretium porta eros, sit amet luctus augue tempus nec. Curabitur gravida erat ut volutpat bibendum."},
{ title: "Mauris eget lectus eget ligula semper laoreet",
  date: "29th December 2015",
  link: "posts/template.html",
  tags: ["Python"],
  text: "Phasellus semper, est sed efficitur dapibus, felis risus cursus mauris, a blandit lectus arcu sagittis sem. Vestibulum sed justo libero. Aliquam erat volutpat. Proin est orci, congue porttitor congue tempor, placerat sed mi. Nulla sagittis tincidunt purus et ultrices. Nulla aliquam ex arcu, vitae ornare magna volutpat at. Suspendisse consequat nisl urna, in gravida enim hendrerit vulputate. Morbi leo nulla, venenatis id elit ac, interdum suscipit sapien. Etiam tincidunt vestibulum lectus, ac laoreet diam consectetur eu. Etiam nec felis interdum, imperdiet ante in, maximus elit. Donec sapien est, pharetra nec imperdiet ac, lacinia fermentum massa."}
];