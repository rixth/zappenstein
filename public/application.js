(function () {
  setInterval(function (){
    var slides = $('.slide');
    slides.eq(Math.round(Math.random() * slides.length)).flipSlide();
  }, 1500);
}());

(function ($) {
  $.fn.flipSlide = function () {
    return $(this).each(function () {
      var slide = $(this);
      slide.removeClass('flipTo flipFrom');

      setTimeout(function () {
        slide.addClass('flipTo');
        setTimeout(function () {
          slide.removeClass('flipTo').addClass('flipFrom');
        }, 600);
      }, 500);
    });
  }
}(jQuery));