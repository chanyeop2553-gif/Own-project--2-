let player = null;
let apiReady = false;
let pendingVideoId = null;

// 1) YouTube IFrame API 로드 (1회)
function loadYouTubeAPI() {
    return new Promise((resolve) => {
        if (window.YT && window.YT.Player) {
            apiReady = true;
            resolve();
            return;
        }

        // 이미 로딩 중이면 onYouTubeIframeAPIReady를 기다림
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => {
            apiReady = true;
            resolve();
        };
    });
}

// 2) 모달 열기
async function openTrailer(videoId) {
    if (!videoId) return;

    const blackout = document.getElementById("blackout");
    if (blackout) {
        blackout.classList.remove("is-hidden");
        blackout.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("modal_on");

    pendingVideoId = videoId;

    // API 준비
    await loadYouTubeAPI();

    // player가 없으면 생성, 있으면 영상만 교체
    if (!player) {
        player = new YT.Player("trailer", {
            videoId: pendingVideoId,
            playerVars: {
                autoplay: 1,
                rel: 0,
                modestbranding: 1,
                playsinline: 1,
            },
            events: {
                onReady: (e) => e.target.playVideo(),
            },
        });
    } else {
        player.loadVideoById(pendingVideoId);
    }
}

// 3) 모달 닫기
function closeTrailer() {
    const blackout = document.getElementById("blackout");
    if (blackout) {
        blackout.classList.add("is-hidden");
        blackout.setAttribute("aria-hidden", "true");
    }
    document.body.classList.remove("modal_on");

    // 영상 정지 (소리/재생 완전 종료)
    if (player && typeof player.stopVideo === "function") {
        player.stopVideo();
    }
}

// 💡 DOM 요소들이 실제로 존재할 때만 이벤트 리스너 안전하게 부착
const showBtn = document.getElementById("showTrailer");
const hideBtn = document.getElementById("hideTrailer");
const blackout = document.getElementById("blackout");

if (showBtn) {
    showBtn.addEventListener("click", () => {
        const videoId = showBtn.dataset.youtube;
        openTrailer(videoId);
    });
}

if (hideBtn) {
    hideBtn.addEventListener("click", closeTrailer);
}

// 오버레이 배경 클릭 시 닫기 (모달 내부 클릭은 제외)
if (blackout) {
    blackout.addEventListener("click", (e) => {
        if (e.target === blackout) closeTrailer();
    });
}

// ESC로 닫기
window.addEventListener("keydown", (e) => {
    const blackoutEl = document.getElementById("blackout");
    if (e.key === "Escape" && blackoutEl && !blackoutEl.classList.contains("is-hidden")) {
        closeTrailer();
    }
});
