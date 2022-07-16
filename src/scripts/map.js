let myMap;
const init = () => {
  myMap = new ymaps.Map("map", {
    center: [55.752137, 37.589335],
    zoom: 13,
    controls: [],
  });

  let coords = [
      [55.756012, 37.604021],
      [55.75092, 37.615746],
      [55.746988, 37.591715],
      [55.744078, 37.591413],
    ],
    myCollection = new ymaps.GeoObjectCollection(
      {},
      {
        draggable: false,
        iconLayout: "default#image",
        iconImageHref: "./img/marker8.png",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52],
      }
    );

  for (let i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable("scrollZoom");
};

ymaps.ready(init);
