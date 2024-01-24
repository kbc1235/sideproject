const swiper = new Swiper(".swiper", {
  autoplay: {
    autoplay: true,
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
