$(document).ready(function() {
	$('.feedback__slider').slick({
	  dots: true,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true
	});
    $('.main__promoblock-btn').on("click", function() { $('.overlay').show() });
    $('.promoblock__text-btn').on("click", function() { $('.overlay').show() });
    $('.header__ordercall').on("click", function() { $('.overlay2').show() });
    $('.footer__contact-ordercall').on("click", function() { $('.overlay2').show() });
    $('.popup__close').on("click", function() { $('.overlay').hide() });
    $('.popup__close').on("click", function() { $('.overlay2').hide() });
    $('.overlay').on("click", function() { $('.overlay').hide() });
    $('.overlay').on("click", function() { $('.overlay2').hide() });
    $('.overlay2').on("click", function() { $('.overlay').hide() });
    $('.overlay2').on("click", function() { $('.overlay2').hide() });
});