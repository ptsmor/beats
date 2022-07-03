const openItem = item => {
const container = item.closest(".slider__item");
const contentBlock = container.find(".slider__description");
const textBlock = contentBlock.find(".slider__description--wrap");
const reqHeight = textBlock.height();

container.addClass(".slider__item--active")
contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
    const items = container.find(".slider__description");
    const itemContainer = container.find(".slider__item");

    itemContainer.removeClass(".slider__item--active");
    items.height(0);
}

$(".slider__name").click(e => {
    const $this = $(e.currentTarget);
    const container =$this.closest(".slider__list");
    const elemContainer = $this.closest(".slider__item");
    if (elemContainer.hasClass(".slider__item--active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }

});