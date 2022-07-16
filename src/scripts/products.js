const list = $(".products-menu__list");

list.on("click", ".product", function (e) {
  e.preventDefault();
  $(this).siblings("li").removeClass("product--active");
  $(this).toggleClass("product--active");
  let $content = $(this).find(".product__content");

  let curWidth = 0;
  let newWidth = 524;

  if ($(window).width() <= 768 && $(window).width() > 480) {
    curWidth = $(".product__title").width() * $(".product__title").length;
    newWidth = $(window).width() - curWidth;
  }

  if ($(window).width() <= 480) {
    curWidth = $(".product__title").width();
    newWidth = $(window).width() - curWidth;
  }

  list.find(".product__content").css("width", 0);

  if ($(this).hasClass("product--active")) {
    $content.css("width", `${newWidth}px`);
  }
});
