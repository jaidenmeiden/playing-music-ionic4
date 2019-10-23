import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  slidesOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides = [{
    imagenSrc: "./assets/img/logo.png",
    imagenAlt: "Platzy Music Logo",
    title: "Este es el título 1",
    subTitle: "Este es el sub título 1",
    description: "Aquí va la descripción 1",
    icon: "play"
  }, {
    imagenSrc: "./assets/img/logo.png",
    imagenAlt: "Platzy Music Logo",
    title: "Este es el título 2",
    subTitle: "Este es el sub título 2",
    description: "Aquí va la descripción 2",
    icon: "play"
  }, {
    imagenSrc: "./assets/img/logo.png",
    imagenAlt: "Platzy Music Logo",
    title: "Este es el título 3",
    subTitle: "Este es el sub título 3",
    description: "Aquí va la descripción 3",
    icon: "play"
  }];

  constructor() {}

}
