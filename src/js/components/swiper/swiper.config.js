export default {
  modules: ['navigation', 'pagination', 'autoplay', 'effect-fade'],
  speed: 400,
  spaceBetween: 50,
  initialSlide: 0,
  autoHeight: false,
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  slidesPerView: 1,
  grabCursor: true,
};