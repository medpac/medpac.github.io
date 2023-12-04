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
  




/* for Questionnaire */
var correctAnswers = {
  "question1": { answer: "20 seconds", explanation: "Handwashing for at least 20 seconds is recommended." },
  "question2": { answer: "Warm", explanation: "Warm water is more effective for removing germs." }
  // Add more questions as needed
};

function checkAnswers() {
  var totalCorrect = 0;
  var totalQuestions = Object.keys(correctAnswers).length;
  var allAcknowledged = true;

  for (var question in correctAnswers) {
      var selected = document.querySelector('input[name="' + question + '"]:checked');
      var feedbackElement = document.getElementById('feedback' + question[question.length - 1]);

      if (selected && selected.value === correctAnswers[question].answer) {
          feedbackElement.innerHTML = "Correct! ✔️";
          feedbackElement.className = "correct";
          totalCorrect++;
      } else {
          allAcknowledged = false;
          feedbackElement.innerHTML = `Incorrect ❌. Correct answer: ${correctAnswers[question].answer}.
              Explanation: ${correctAnswers[question].explanation}
              <br><input type="checkbox" id="acknowledge${question}" class="acknowledge-checkbox">
              <label for="acknowledge${question}">I have read and understand this</label>`;
          feedbackElement.className = "incorrect";
      }
  }

  document.getElementById('score').innerText = `Correct Answers: ${totalCorrect} / ${totalQuestions}`;
  checkAttestationEligibility();
}

function checkAttestationEligibility() {
  var totalQuestions = Object.keys(correctAnswers).length;
  var totalCorrect = document.querySelectorAll('.correct').length;
  var allAcknowledged = document.querySelectorAll('.acknowledge-checkbox:not(:checked)').length === 0;
  var attestationChecked = document.getElementById('attest').checked;

  var attestationButton = document.getElementById('attestation-button');
  attestationButton.disabled = !(totalCorrect === totalQuestions || (allAcknowledged && attestationChecked));
}

document.getElementById('quiz-form').addEventListener('change', function() {
  checkAttestationEligibility();
});

document.getElementById('attest').addEventListener('change', function() {
  checkAttestationEligibility();
});
