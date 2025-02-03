$(document).ready(function () {
  $(".accordion-header").click(function (e) {
    e.stopPropagation(); // Prevent event bubbling

    // Toggle active class on header
    $(this).toggleClass("active");

    // Toggle content visibility
    let content = $(this).next(".accordion-content");
    content.toggleClass("active");

    // Only close siblings at the same level
    let siblings = $(this).parent().siblings().find(".accordion-header");
    siblings.removeClass("active");
    siblings.next(".accordion-content").removeClass("active");
  });

  //   about links
  $("#MV_link1").click(function (e) {
    e.preventDefault();
    window.location.href = "https://www.eternityready.com/page.php?p=9";
  });
  $("#MV_movies1").click(function (e) {
    e.preventDefault();
    window.location.href =
      'href="https://www.eternityready.com/category.php?cat=movies';
  });
  $("#MV_language1").click(function (e) {
    e.preventDefault();
    window.location.href =
      'href="href="https://www.eternityready.com/category.php?cat=language';
  });
});
