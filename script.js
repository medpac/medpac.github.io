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




