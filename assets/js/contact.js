import $ from 'jquery';

const resetFormBtn = $('.reset-form');
const contactForm = $('#contact-form');
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const showAlert = function (type, message) {
  const alertMessageContainer = $('#alert-message');

  if ($(alertMessageContainer).hasClass('active')) return;

  const alertType = type === 'success' ? 'msg-success' : 'msg-danger';

  $(alertMessageContainer).text(message);
  $(alertMessageContainer).addClass(alertType);
  $(alertMessageContainer).addClass('active');

  $(alertMessageContainer).on('transitionend', function () {
    setTimeout(function () {
      $(alertMessageContainer).removeClass('active');
      $(alertMessageContainer).removeClass('msg-danger');
      $(alertMessageContainer).removeClass('msg-success');
    }, 3000);
  });
};

const sendMessage = async function (e) {
  e.preventDefault();

  const name = $('#name').val();
  const email = $('#email').val();
  const message = $('#message').val();

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

  $.ajax({
    ...requestOptions,
    url: 'https://formsubmit.co/ajax/e52b7649f41cbfbc1d20f15e59325b39',
    success(res) {
      const data = JSON.parse(res);
      if (data.success === 'true') {
        showAlert('success', 'Message sent successfully!');
        $(contactForm).trigger('reset');
      } else {
        showAlert('danger', 'Sorry, something went wrong. Please try again!');
      }
    },
  });
};

$(function () {
  $(resetFormBtn).on('click', () => $(contactForm).trigger('reset'));

  $(contactForm).on('submit', sendMessage);
});
