const slider = document.querySelector('.tour-slider');
const slides = [...document.querySelectorAll('.tour-slide')];
const tabs = [...document.querySelectorAll('[data-slide]')];
const dots = [...document.querySelectorAll('.dots i')];
const previous = document.getElementById('previous');
const next = document.getElementById('next');
let activeIndex = 0;
let scrollTimer;

function updateNavigation(index) {
  activeIndex = Math.max(0, Math.min(slides.length - 1, index));
  tabs.forEach((tab, i) => tab.setAttribute('aria-current', i === activeIndex ? 'true' : 'false'));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
  previous.disabled = activeIndex === 0;
  next.disabled = activeIndex === slides.length - 1;
}

function goTo(index) {
  const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
  if (!target) return;
  slider.scrollTo({ left: target.offsetLeft - slider.offsetLeft, behavior: 'smooth' });
  updateNavigation(Number(target.dataset.index));
}

tabs.forEach((tab) => tab.addEventListener('click', () => goTo(Number(tab.dataset.slide))));
previous.addEventListener('click', () => goTo(activeIndex - 1));
next.addEventListener('click', () => goTo(activeIndex + 1));
slider.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') goTo(activeIndex + 1);
  if (event.key === 'ArrowLeft') goTo(activeIndex - 1);
});
slider.addEventListener('scroll', () => {
  window.clearTimeout(scrollTimer);
  scrollTimer = window.setTimeout(() => {
    const center = slider.scrollLeft + slider.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const currentDistance = Math.abs(center - slideCenter);
      if (currentDistance < distance) { distance = currentDistance; nearest = index; }
    });
    updateNavigation(nearest);
  }, 80);
}, { passive: true });

updateNavigation(0);
