/**
 * This is a very simple object that dictates what columns display what type of
 * data, and manages *which* slide should be the next to receieve content,
 * based off how stale the existing data is.
 */
var SlideManager = new (function () {
  var columnMapping = ['purchase', 'randomProduct', 'tweet', 'randomProduct', 'purchase'],
      slides = {};
  
  columnMapping.forEach(function (type, colNumber) {
    slides[type] = slides[type] || [];
    $('.col-' + colNumber + ' .slide').each(function () {
      slides[type].push($(this));
    });
  });
  
  this.getSlide = function (type) {
    var slide = slides[type].shift();
    slides[type].push(slide);
    return slide;
  };
});

/**
 * A super-simple jQuery plugin to set the content on slides. It applies the
 * contentChange class, which triggers webkit animations.
 */
(function ($) {
  $.fn.setSlideContent = function (type, content) {
    return $(this).each(function () {
      var slide = $(this);
      slide.addClass('contentChange');      
      setTimeout(function () {
        slide.removeClass('contentChange').find('.content').attr('class', type + ' content').html(content);
      }, 600);
    });
  }
}(jQuery));