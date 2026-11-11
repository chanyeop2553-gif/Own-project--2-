/**
 * NUGU Cinematic Hotel - Main JavaScript File
 * Handles Swiper initialization, tabs, and interactive features.
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Hero Slider (In-Room Cinema) Initialization
    if (document.querySelector(".swiper.hero")) {
        const heroSwiper = new Swiper(".swiper.hero", {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    }

    // 2. Movie Slider (호S텔에서 상영 중) Initialization
    const movieSwipers = document.querySelectorAll(".swiper.slider2");
    movieSwipers.forEach((sliderEl, index) => {
        new Swiper(sliderEl, {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: false,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    });

    // 3. Movie Chart Tab Navigation Logic
    const movBtn = document.querySelectorAll(".movie_title ul li");
    const movCont = document.querySelectorAll(".movie_chart > div");

    if (movCont.length > 0) {
        movCont.forEach((cont) => {
            cont.style.display = "none";
        });
        if (movCont[0]) movCont[0].style.display = "block";

        movBtn.forEach((menu, index) => {
            menu.addEventListener("click", (e) => {
                e.preventDefault();

                movBtn.forEach((item) => {
                    item.classList.remove("active");
                });
                menu.classList.add("active");

                movCont.forEach((cont) => {
                    cont.style.display = "none";
                });
                if (movCont[index]) {
                    movCont[index].style.display = "block";
                }
            });
        });
    }

    // 4. 공지사항 탭메뉴
    const tabList = document.querySelectorAll(".notice > ul > li > a ");
    const tabContents = document.querySelectorAll(".notice > ul > li > ul");

    if (tabList.length > 0 && tabContents.length > 0) {
        tabContents.forEach((ul) => {
            ul.style.display = "none";
        });
        const activeDefault = document.querySelector(".notice > ul > li.active > ul");
        if (activeDefault) activeDefault.style.display = "block";

        tabList.forEach((a) => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                tabList.forEach((item) => {
                    item.parentElement.classList.remove("active");
                    if (item.nextElementSibling) {
                        item.nextElementSibling.style.display = "none";
                    }
                });
                a.parentElement.classList.add("active");
                if (a.nextElementSibling) {
                    a.nextElementSibling.style.display = "block";
                }
            });
        });
    }

    // 5. 모바일 메뉴
    const ham = document.querySelector("#mNav .ham");
    const mNavMenu = document.querySelector("#mNav ul");

    if (ham && mNavMenu) {
        ham.addEventListener("click", (e) => {
            e.preventDefault();
            mNavMenu.classList.toggle("active");
        });
    }

    // 6. 스크롤 이벤트
    window.addEventListener("scroll", () => {
        let scrollTop = window.scrollY + window.innerHeight / 2;

        let event = document.querySelector("#event");
        if (event) {
            let eventTop = event.offsetTop;
            let eLeft = document.querySelector(".event_left");
            let eRight = document.querySelector(".event_right");
            if (scrollTop >= eventTop) {
                if (eLeft) eLeft.classList.add("show");
                if (eRight) eRight.classList.add("show");
            } else {
                if (eLeft) eLeft.classList.remove("show");
                if (eRight) eRight.classList.remove("show");
            }
        }

        let opening = document.querySelector("#opening");
        if (opening) {
            let openingTop = opening.offsetTop;
            let openBox = document.querySelectorAll(".open_box > div");
            if (scrollTop > openingTop) {
                openBox.forEach((div) => div.classList.add("bounce"));
            } else {
                openBox.forEach((div) => div.classList.remove("bounce"));
            }
        }

        let newSection = document.querySelector("#new");
        if (newSection) {
            let newSectionTop = newSection.offsetTop;
            let nLeft = document.querySelector(".new_left");
            let nRight = document.querySelector(".new_right");
            if (scrollTop >= newSectionTop) {
                if (nLeft) nLeft.classList.add("show");
                if (nRight) nRight.classList.add("show");
            }
        }

        let help = document.querySelector("#help");
        if (help) {
            let helpTop = help.offsetTop;
            let helpBox = document.querySelectorAll(".help > div");

            if (scrollTop >= helpTop) {
                helpBox.forEach((div) => {
                    div.classList.add("show");
                });
            } else {
                // 💡 [수정 완료] 에러를 유발하던 범인 교체!
                helpBox.forEach((div) => {
                    div.classList.remove("show");
                });
            }
        }
    });
});
