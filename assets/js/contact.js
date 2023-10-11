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
  const botInput = $('#bot-field').val();

  // This is to prevent bots from filling the contact form
  // They fill all of the inputs inside a form and if the hidden field (not meant for humans)
  // is also filled that means it's a bot and reject form submission
  if (botInput) {
    showAlert('danger', 'Sorry, something went wrong. Please try again!');
    $(contactForm).trigger('reset');
    return;
  }

  if (!name || !email || !message) {
    showAlert('danger', 'Please fill all of the details!');
    return;
  }

  if (!email.match(emailRegex)) {
    showAlert('danger', 'Please provide a valid email!');
    return;
  }

  $.ajax({
    url: '/.netlify/functions/message-me',
    method: 'POST',
    data: JSON.stringify({
      name,
      email,
      message,
      subject: 'Message from portfolio site',
    }),
    dataType: 'json',
    accepts: 'application/json',
    success(data) {
      showAlert('success', 'Message sent successfully');
      $(contactForm).trigger('reset');
    },
    error() {
      showAlert('danger', 'Sorry, something went wrong. Please try again!');
    },
  });
};

$(function () {
  $(resetFormBtn).on('click', () => $(contactForm).trigger('reset'));

  $(contactForm).on('submit', sendMessage);
});
