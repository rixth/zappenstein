(function () {
  setInterval(function (){
    var slides = $('.slide');
    slides.eq(Math.round(Math.random() * slides.length)).setSlideContent('<img src="http://maps.google.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=14&size=263x200&maptype=roadmap&sensor=false"/>');
  }, 1500);
}());

(function ($) {
  $.fn.setSlideContent = function (content) {
    return $(this).each(function () {
      var slide = $(this);
      slide.addClass('contentChange');      
      setTimeout(function () {
        slide.removeClass('contentChange').find('.content').html(content);
      }, 600);
    });
  }
}(jQuery));