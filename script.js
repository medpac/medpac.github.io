document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('hamburger-menu').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
  });
});

window.addEventListener('scroll', function() {
  var header = document.querySelector('header');
  var scrollPosition = window.scrollY;
  
  if (scrollPosition === 0) {
    header.style.opacity = '1';
  } else {
    header.style.opacity = '0.75';
  }
});



  window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50); // Adjust '50' to the desired scroll amount
  });


/* JavaScript for Carousel Functionality */

  document.addEventListener('DOMContentLoaded', function() {
    let scrollPosition = 0;
    const featureCarousel = document.querySelector('.feature-cards-container');
    const indicators = document.querySelectorAll('.dot');
  
    featureCarousel.addEventListener('scroll', function() {
      let index = Math.round(this.scrollLeft / window.innerWidth);
      if (scrollPosition !== index) {
        indicators[scrollPosition].classList.remove('active');
        indicators[index].classList.add('active');
        scrollPosition = index;
      }
    });
  
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        featureCarousel.scrollLeft = index * window.innerWidth;
      });
    });
  });
  




