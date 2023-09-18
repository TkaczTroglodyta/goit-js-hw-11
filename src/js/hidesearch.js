const nav = document.querySelector('nav');
const navHeight = 192;
let lastScrollY = 0;
const delta = 10;

function searchScroll() {
  let sy = window.scrollY;
  if (Math.abs(lastScrollY - sy) > delta) {
    if (sy > lastScrollY && sy > navHeight) {
      nav.classList.add('nav-up');
    } else if (sy < lastScrollY) {
      nav.classList.remove('nav-up');
    }
    lastScrollY = sy;
  }
}

let didScroll = false;
window.addEventListener('scroll', function (e) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    searchScroll();
    didScroll = false;
  }
}, 250);
