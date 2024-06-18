document.addEventListener("DOMContentLoaded", function () {
  // 기존 코드
  const imgElements = document.querySelectorAll(".containerB .itembox .img");

  imgElements.forEach(function (img) {
    // 이동 여부를 저장할 상태 변수 추가
    let isMoved = false;

    img.addEventListener("click", function () {
      if (isMoved) {
        // 원래 위치로 돌아가기
        img.style.transform = "translateY(0)";
      } else {
        // 아래로 이동
        img.style.transform = "translateY(305px)"; // 원하는 만큼 이동 거리 설정
      }
      img.style.transition = "transform 0.5s ease"; // 애니메이션 적용

      // 상태 토글
      isMoved = !isMoved;
    });
  });

  // 슬라이드쇼 코드
  const slideData = {
    A: [
      "./containerD/A1.png",
      "./containerD/A2.png",
      "./containerD/A3.png",
      "./containerD/A4.png",
    ],
    B: [
      "./containerD/B1.png",
      "./containerD/B2.png",
      "./containerD/B3.png",
      "./containerD/B4.png",
    ],
    C: [
      "./containerD/C1.png",
      "./containerD/C2.png",
      "./containerD/C3.png",
      "./containerD/C4.png",
    ],
  };

  const slideContainer = document.getElementById("slide-container");

  // 슬라이드쇼 코드
  const galleryImgElements = document.querySelectorAll(
    ".containerD .itembox .img"
  );
  const overlay = document.getElementById("overlay");
  let slideIndex = 0;
  let slideInterval;

  function createSlides(images) {
    slideContainer.innerHTML = ""; // 기존 슬라이드 제거
    images.forEach((src) => {
      const slide = document.createElement("div");
      slide.classList.add("slide");
      slide.style.backgroundImage = `url(${src})`;
      slideContainer.appendChild(slide);
    });
  }

  function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    const slideWidth = 1440; // 슬라이드 너비를 1440px로 고정
    slides.forEach((slide, i) => {
      const offset = (i - index) * slideWidth;
      slide.style.transform = `translateX(${offset}px)`;
    });
  }

  function startSlideShow() {
    slideInterval = setInterval(() => {
      slideIndex =
        (slideIndex + 2) % document.querySelectorAll(".slide").length;
      showSlide(slideIndex);
    }, 3000); // 슬라이드 전환 간격 설정 (3초)
  }

  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  galleryImgElements.forEach(function (img, index) {
    img.addEventListener("click", function () {
      const imgClass = img.classList[1]; // img 클래스에서 A, B, C 중 하나를 가져옴
      if (slideData[imgClass]) {
        createSlides(slideData[imgClass]); // 해당 클래스의 이미지로 슬라이드 생성
        slideIndex = 0; // 슬라이드 인덱스를 초기화
        showSlide(slideIndex);
        overlay.style.display = "flex";
        startSlideShow();
      }
    });
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
      stopSlideShow();
    }
  });

  // 페이지 로드 시 슬라이드 초기화
  showSlide(slideIndex);
});
