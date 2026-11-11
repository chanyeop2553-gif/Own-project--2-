var swiper = new Swiper(".hero", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".hero .swiper-pagination",
    },
});

var swiper = new Swiper(".slider2", {
    slidesPerView: 1.4,
    spaceBetween: 20,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },
    breakpoints: {
        601: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        769: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        961: {
            slidesPerView: 4,
            spaceBetween: 24,
        },
    },
});
