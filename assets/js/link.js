// 버튼을 클릭해서 이동하고 애니메이션 주기
const $li = document.querySelectorAll(".header_nav ul li a");

$li.forEach(function (li) {
    li.addEventListener("click", function (e) {
        e.preventDefault(); // #의 기본 기능을 차단

        const $href = document.querySelector(li.getAttribute("href"));
        $href.scrollIntoView({ behavior: "smooth" });
        // a링크의 애니메이션 만들기
    });
});
