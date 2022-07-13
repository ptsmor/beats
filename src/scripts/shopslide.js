const slider = $(".shop__list").bxSlider({
  pager: false,
  controls: false,
});

$(".shop__btn_left").click((e) => {
  e.preventDefault();

  slider.goToPrevSlide();
});
$(".shop__btn_right").click((e) => {
  e.preventDefault();

  slider.goToNextSlide();
});
