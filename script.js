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

  for (var question in correctAnswers) {
      var selected = document.querySelector('input[name="' + question + '"]:checked');
      var feedbackElement = document.getElementById('feedback' + question[question.length - 1]);

      if (selected && selected.value === correctAnswers[question].answer) {
          feedbackElement.innerHTML = "Correct! ✔️";
          feedbackElement.className = "correct";
          totalCorrect++;
      } else {
          feedbackElement.innerHTML = `Incorrect ❌. Correct answer: ${correctAnswers[question].answer}.
              Explanation: ${correctAnswers[question].explanation}
              <br><input type="checkbox" id="acknowledge${question}" class="acknowledge-checkbox" onchange="checkIfAllAcknowledged()">
              <label for="acknowledge${question}">I have read and understand this</label>`;
          feedbackElement.className = "incorrect";
      }
  }



  document.getElementById('score').innerText = `Correct Answers: ${totalCorrect} / ${totalQuestions}`;



  
  var allAcknowledgementsChecked = true;
  document.querySelectorAll('.incorrect').forEach(function(item) {
    if (!item.querySelector('.acknowledge-checkbox:checked')) {
      allAcknowledgementsChecked = false;
    }
  });

  // Display the attestation section if all answers are correct or acknowledged
  if (totalCorrect === totalQuestions || allAcknowledgementsChecked) {
    document.getElementById('attestation').style.display = 'block';
  }
}

  // Disable the submit button after it has been clicked

function checkAttestationEligibility() {
  var totalQuestions = Object.keys(correctAnswers).length;
  var totalCorrect = document.querySelectorAll('.correct').length;
  var allAcknowledgementsChecked = true;
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

/* To include a function that checks if all questions have been answered and to disable the button after it's clicked */
document.getElementById('quiz-form').addEventListener('change', checkIfAllAnswered);

function checkIfAllAnswered() {
  var allAnswered = true;
  var questions = document.querySelectorAll('.question');

  questions.forEach(function(question) {
      if (!question.querySelector('input[type="radio"]:checked')) {
          allAnswered = false;
      }
  });

  // Only enable the submit button if the quiz has not been submitted
  if (!quizSubmitted) {
    document.getElementById('submit-quiz').disabled = !allAnswered;
  }
}  

// disable all radio buttons in the quiz after submission to prevent changing answers:
function disableQuizOptions() {
  var radios = document.querySelectorAll('#quiz-form input[type="radio"]');
  radios.forEach(function(radio) {
    radio.disabled = true;
  });
}


/* JavaScript parsing logic to handle this quirk.  Check if the last character of the URL is an =, and if so, remove it before parsing. */
window.onload = function() {
  var fullUrl = window.location.href;

  // Check if URL ends with '=' and remove it
  if (fullUrl.endsWith('=')) {
      fullUrl = fullUrl.substring(0, fullUrl.length - 1);
  }

  var queryPart = fullUrl.split('?')[1];
  var relevantPart = queryPart.split('?')[0];

  var userEmail = getQueryParam("email", relevantPart);
  var authCode = getQueryParam("code", relevantPart);

  
};

function getQueryParam(param, queryString) {
  var searchParams = new URLSearchParams(queryString);
  return searchParams.get(param);
}


// Function to check if a code is valid (Luhn Algorithm)
function isValidCode(code) {
  var sum = 0;
  var alt = false;
  for (var i = code.length - 1; i >= 0; i--) {
      var num = parseInt(code.charAt(i), 10);
      if (alt) {
          num *= 2;
          if (num > 9) {
              num -= 9;
          }
      }
      sum += num;
      alt = !alt;
  }
  return (sum % 10) === 0;
}

// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // ... existing logic for hamburger menu, scroll effect, carousel

  // URL parsing and message display logic
  var fullUrl = window.location.href;

  // Check if URL ends with '=' and remove it
  if (fullUrl.endsWith('=')) {
      fullUrl = fullUrl.substring(0, fullUrl.length - 1);
  }

  var queryPart = fullUrl.split('?')[1];
  var relevantPart = queryPart ? queryPart.split('?')[0] : "";

  var userEmail = getQueryParam("email", relevantPart);
  var authCode = getQueryParam("code", relevantPart);

  if (userEmail && authCode && isValidCode(authCode)) {
      document.getElementById('user-email').textContent = userEmail;
      document.getElementById('code').textContent = authCode;
      document.getElementById('valid-code-message').style.display = 'block';
  } else {
      document.getElementById('invalid-code-message').style.display = 'block';
  }

  // Event listeners for quiz and attestation
  document.getElementById('quiz-form').addEventListener('change', function() {
      checkAttestationEligibility();
      checkIfAllAnswered();
  });

  document.getElementById('attest').addEventListener('change', function() {
      checkAttestationEligibility();
  });

  document.getElementById('submit-quiz').addEventListener('click', checkAnswers);
});

// Additional scroll event listener
window.addEventListener('scroll', function() {
  // ... existing logic for header opacity on scroll
});

/* A global flag to track the submission state: */

var quizSubmitted = false;  // This flag will be true once the quiz is submitted


function submitAttestation() {
    // Hide all sections
    var sections = document.querySelectorAll('section, .main-content');
    sections.forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the thank you section
    var thankYouSection = document.getElementById('thank-you-section');
    thankYouSection.style.display = 'block';

    // Populate user details in the thank you section
    document.getElementById('display-name').textContent = 'Your User Name Here'; // Replace with actual user name
    document.getElementById('display-email').textContent = document.getElementById('user-email').textContent;
    document.getElementById('display-auth-code').textContent = document.getElementById('code').textContent;
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById('youtube').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('youtube').contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
  }
}
