const headerNav = document.querySelector(".header_nav");
const headerToggle = document.querySelector("#headerToggle");

headerToggle.addEventListener("click", () => {
    headerNav.classList.toggle("show");
});
