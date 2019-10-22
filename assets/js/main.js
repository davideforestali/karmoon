// GLOBAL VARS

const toggleMenu = document.querySelectorAll(".main-header__toggle-btn");

// OFF CANVAS MENU

const secondaryNav = document.querySelector(".secondary-nav");
const mainHeader = document.querySelector('.main-header');
const headerNavWrap = document.querySelector(".main-header__nav-wrapper");

toggleMenu.forEach(function(toggle) {
  toggle.addEventListener('click', function() {
    if(this.classList.contains("toggle-btn--active")) {
      this.classList.remove("toggle-btn--active");
      secondaryNav.classList.remove("secondary-nav--open");
      mainHeader.classList.remove('main-header--active');
      document.querySelector("body").style.overflowY = "initial";
      if (window.matchMedia("(max-width: 991px)").matches) {
        headerNavWrap.classList.remove("main-header__nav-wrapper--open");
      }
    }
    else {
      this.classList.add("toggle-btn--active");
      secondaryNav.classList.add("secondary-nav--open");
      mainHeader.classList.add('main-header--active');
      document.querySelector("body").style.overflowY = "hidden";
      if (window.matchMedia("(max-width: 991px)").matches) {
        headerNavWrap.classList.add("main-header__nav-wrapper--open");
      }
    }
  });
})

// MENU COLLECTION TILE

const headerNavItem = document.querySelectorAll('.main-header__nav-item');
const collectionTileActiveClass = 'menu-collection-tile--active';

headerNavItem.forEach(link => {
  const tileSelected = document.getElementById(link.dataset.tile);

  link.addEventListener('click', e => {

    // close secondary nav if open
    toggleMenu.forEach(function(toggle) {
      if (toggle.classList.contains('toggle-btn--active')) {
        toggle.click()
      }
    });

    // close every tile open first 
    document.querySelectorAll('.menu-collection-tile').forEach(tile => {
      tile.classList.remove(collectionTileActiveClass);
    })

    // finally open selected tile 
    tileSelected.classList.add(collectionTileActiveClass);
  });

});

// close if click on document
window.addEventListener('click', e => {
  const collectionTileActive = document.querySelector('.menu-collection-tile--active');
  if (collectionTileActive) {
    if (!e.target.matches('.menu-collection-tile, .menu-collection-tile *') && !e.target.matches('.main-header__nav-item')) {
        collectionTileActive.classList.remove(collectionTileActiveClass);
    }
  }
}, true)


// CAROUSEL

const slider = document.querySelector(".carousel__inner");
let slides = document.querySelectorAll(".carousel__slide");
const carouselControls = document.querySelectorAll(".carousel__control"); 
let moving = false;

// Move the last slide before the first so the user is able to immediately go backwards
slider.insertBefore(slides[slides.length - 1], slides[0]);

function disableInteraction() {
  moving = true;
  setTimeout(function() {
    moving = false;
  }, 300);
}

carouselControls.forEach(function(control) {
  control.addEventListener("click", function() {
    slides = document.querySelectorAll(".carousel__slide");
    const currentSlide = document.querySelectorAll(".carousel__slide--current");
    if(!moving) {
      disableInteraction();
      if (this.classList.contains("carousel__control--next")) {
        slider.insertBefore(slides[0], slides[slides.length - 1].nextSibling);
        currentSlide.forEach(slide => {
          slide.classList.remove('carousel__slide--current');
          slide.nextElementSibling.classList.add('carousel__slide--current');
        });
      }
      if (this.classList.contains("carousel__control--prev")) {
        slider.insertBefore(slides[slides.length - 1], slides[0]);
        currentSlide.forEach(slide => {
          slide.classList.remove('carousel__slide--current');
          slide.previousElementSibling.classList.add('carousel__slide--current');
        });
      }
    }
  });
});