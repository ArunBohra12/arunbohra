const resetFormBtn = document.querySelector('.reset-form');
const contactForm = document.getElementById('contact-form');
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const showAlert = function (type, message) {
  const alertMessageContainer = document.getElementById('alert-message');

  if (alertMessageContainer.classList.contains('active')) return;

  const alertType = type === 'success' ? 'msg-success' : 'msg-danger';

  alertMessageContainer.textContent = message;
  alertMessageContainer.classList.add(alertType);
  alertMessageContainer.classList.add('active');

  alertMessageContainer.addEventListener('transitionend', function () {
    setTimeout(function () {
      alertMessageContainer.classList.remove('active');
      alertMessageContainer.classList.remove('msg-danger');
      alertMessageContainer.classList.remove('msg-success');
    }, 3000);
  });
};

const sendMessage = async function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    showAlert('danger', 'Please fill all of the details!');
    return;
  }

  if (!email.match(emailRegex)) {
    showAlert('danger', 'Please provide a valid email!');
    return;
  }

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: 'Message from portfolio site',
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const response = await fetch('https://formsubmit.co/ajax/e52b7649f41cbfbc1d20f15e59325b39', requestOptions);

  const data = await response.json();

  if (data.success === 'true') {
    showAlert('success', 'Message sent successfully!');
    contactForm.reset();
  } else {
    showAlert('danger', 'Sorry, something went wrong. Please try again!');
  }
};

resetFormBtn.addEventListener('click', () => contactForm.reset());

contactForm.addEventListener('submit', sendMessage);
