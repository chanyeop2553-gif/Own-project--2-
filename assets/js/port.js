const horizontal = document.querySelector("#port");
const horSection = gsap.utils.toArray(".port_item");

gsap.to(horSection, {
    xPercent: -100 * (horSection.length - 1),
    ease: "none",

    scrollTrigger: {
        trigger: horizontal,
        start: "top 56px",
        // end: "+=3000",
        end: () => "+=" + horizontal.offsetWidth,

        pin: true,
        scrub: 1,

        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: false,
    },
});
