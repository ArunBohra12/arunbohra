const resetFormBtn = document.querySelector('.reset-form');
const contactForm = document.getElementById('contact-form');

resetFormBtn.addEventListener('click', () => contactForm.reset());
