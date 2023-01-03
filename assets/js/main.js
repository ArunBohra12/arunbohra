const initalizeWowAnimation = () => {
	new WOW().init();

	$('.wow').attr('data-wow-duration', '1.5s');
}

const backToTopButtonEffect = () => {
	const backToTopBtn = $('#back-to-top');

	if (!backToTopBtn) return;

	$(window).scroll(function() {
		const scrollPosition = scrollY;

		if (scrollY > 900) {
			backToTopBtn.addClass('visible');
		} else {
			backToTopBtn.removeClass('visible');
		}
	});
}

const technologiesCarousel = () => {
	const responsiveCarouselOptions = [
    {
      breakpoint: 2000,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 1200,
      settings: { slidesToShow: 3 }
    },
    {
      breakpoint: 650,
      settings: { slidesToShow: 2 }
    },
  ];

  const leftArrow = `<button class="slick-prev slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg><button>`;
	const rightArrow = `<button class="slick-next slick-arrow"><svg xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-180deg);" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg></button>`;

	$('.technologies').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: leftArrow,
    nextArrow: rightArrow,
    responsive: responsiveCarouselOptions,
	});
}

$(document).ready(function(argument) {
	initalizeWowAnimation(); // Wow animations init

	backToTopButtonEffect(); // Back to top btn appears after some scroll

	technologiesCarousel(); // Create carousel for technologies

	// setCarouselButtons(); // Make technology carousel buttons beautiful
});