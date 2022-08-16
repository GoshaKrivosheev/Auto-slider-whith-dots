const sliderWindow = document.querySelector('.slider__wrapper'),
sliderField = sliderWindow.querySelector('.slider__inner'),
slides = sliderWindow.querySelectorAll('.slide'),
width = window.getComputedStyle(sliderWindow).width,
totalSlides = document.querySelector('#total'),
currentSlide = document.querySelector('#current'),
container = document.querySelector('.slider__container');
let sliderIndex = 1;
let sliderOffset = 0;
const autoMove = setInterval(showSlides, 5000);

function showSlides() {
  if (sliderOffset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
    sliderOffset = 0;
  } else {
    sliderOffset += +width.slice(0, width.length - 2);
  }

  // sliderOffset = +width.slice(0, width.length - 2);
  sliderField.style.transform = `translateX(-${sliderOffset}px)`;

  if (sliderIndex == slides.length) {
    sliderIndex = 1;
  } else {
    sliderIndex++;
  }
}

sliderWindow.style.overflow = 'hidden';
sliderField.style.display = 'flex';
sliderField.style.transition = 'all 0.8s ease-in';
sliderField.style.width = 100 * slides.length + '%';
slides.forEach((slide) => {
slide.style.width = width;
});
container.style.position = 'relative';
const indicators = document.createElement('ol');
const dots = [];
indicators.classList.add('carousel-indicators');
container.append(indicators);

for(let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1);
dot.style.cssText = `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 9px;
  height: 9px;
  margin: 0 3px;
  border-radius: 50%;
  outline: 0;
  cursor: pointer;
  background-color: #21201f;
  background-clip: padding-box;
  opacity: 0.4;
  transition: opacity 0.6s ease;
`;
if (i==0) {
    dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
}

dots.forEach (dot => {
dot.addEventListener('click', (e) => {
    const slideTo = e.target.getAttribute('data-slide-to');

    sliderIndex = slideTo;
    sliderOffset = +width.slice(0, width.length - 2) * (slideTo - 1);

    sliderField.style.transform = `translateX(-${sliderOffset}px)`;

    dots.forEach(dot => dot.style.opacity = '0.4');
    dots[sliderIndex - 1].style.opacity = 1;
});
});
