let target = 0;
let current = 0;
const ease = 0.075;

const slider = document.querySelector(".slider");
const sliderWrapper = document.querySelector(".slider-wrapper");
const markerWrapper = document.querySelector(".marker-wrapper");
const activeSlide = document.querySelector(".active-slide");

// Set max scroll distance
let maxScroll = sliderWrapper.scrollWidth - window.innerWidth;

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function updateActiveSlideNumber(markerMove, markerMaxMove) {
  const partWidth = markerMaxMove / 10;
  let currentPart = Math.round((markerMove - 70) / partWidth) + 1;
  currentPart = Math.min(10, currentPart);
  activeSlide.textContent = `${currentPart}/10`;
}

function update() {
  // Linear interpolation for smooth scroll
  current = lerp(current, target, ease);

  // Update slider position
  sliderWrapper.style.transform = `translateX(${-current}px)`;

  // Calculate movement ratio and marker position
  const moveRatio = current / maxScroll;
  const markerMaxMove = window.innerWidth - markerWrapper.offsetWidth - 170;
  const markerMove = 70 + moveRatio * markerMaxMove;

  markerWrapper.style.transform = `translateX(${markerMove}px)`;

  // Update active slide indicator
  updateActiveSlideNumber(markerMove, markerMaxMove);

  requestAnimationFrame(update);
}

// Recalculate max scroll on resize
window.addEventListener("resize", () => {
  maxScroll = sliderWrapper.scrollWidth - window.innerWidth;
});

// Scroll handler
window.addEventListener("wheel", (e) => {
  target += e.deltaY;
  target = Math.max(0, Math.min(target, maxScroll));
});

// Start the animation loop
update();
