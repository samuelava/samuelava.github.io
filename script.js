document.addEventListener('DOMContentLoaded', function
  () {
  const menuButton = document.getElementById('side-menu-button');
  const sidePanel = document.getElementById('side-panel');
  const closeButton = document.getElementById('close-button');
  const menuLinks = document.querySelectorAll('.side-panel ul li a');

  menuButton.addEventListener('click', function() {
    sidePanel.classList.add('open');
    menuButton.classList.add('active');
  });

  closeButton.addEventListener('click', function() {
    sidePanel.classList.remove('open');
    menuButton.classList.remove('active');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      sidePanel.classList.remove('open');
      menuButton.classList.remove('active');
    });
  });
});

const pictures = document.querySelector('.pictures');
const images = document.querySelectorAll('.pictures img');
const prevButton = document.querySelector('.arrow.left');
const nextButton = document.querySelector('.arrow.right');

let canClick = true;
let autoSlideInterval;
let cooldown = false;
const cooldownTime = 6000;

function shiftLeft() {
  pictures.appendChild(pictures.firstElementChild);
  pictures.style.transition = "none";
  pictures.style.transform = 'translateX(0)';
}

function shiftRight() {
  pictures.insertBefore(pictures.lastElementChild, pictures.firstElementChild);
  pictures.style.transition = "none";
  pictures.style.transform = `translateX(-${100}%)`;
}

function showNextImage() {
  pictures.style.transition = 'transform 0.5s ease-in-out';
  pictures.style.transform = `translateX(-${100}%)`;
  pictures.addEventListener('transitionend', shiftLeft, { once: true });
}

function showPrevImage() {
  pictures.style.transition = 'transform 0.5s ease-in-out';
  pictures.style.transform = `translateX(${100}%)`;
  pictures.addEventListener('transitionend', function() {
    shiftRight();
    pictures.style.transition = "none";
    pictures.style.transform = 'translateX(0)';
  }, { once: true });
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(function() {
    if (!cooldown) {
      showNextImage();
    }
  }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetCooldown() {
  cooldown = true;
  stopAutoSlide();
  setTimeout(function() {
    cooldown = false;
    startAutoSlide();
}, cooldownTime);
}

prevButton.addEventListener('click', function () {
  if (!canClick) return;

  canClick = false;
  resetCooldown();
  showPrevImage();

  setTimeout(function() {
    canClick = true;
  }, 500);
});

nextButton.addEventListener('click', function() {
  resetCooldown();
  showNextImage();
});

startAutoSlide();