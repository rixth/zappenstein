/**
 * This is a very simple object that dictates what columns display what type of
 * data, and manages *which* slide should be the next to receieve content,
 * based off how stale the existing data is.
 */
var SlideHelper = new (function () {
  var columnMapping = ['purchase', 'picture', 'tweet', 'picture', 'purchase'],
      slides = {};
  
  columnMapping.forEach(function (type, colNumber) {
    slides[type] = slides[type] || [];
    $('.col-' + colNumber + ' .slide').each(function () {
      slides[type].push($(this));
    });
    
    // Do a very inefficient shuffle. However, we do this once per load, and
    // on a max of 8 items, so it's only a little evil.
    slides[type].sort(function () {
      return 0.5 - Math.random();
    });
  });
  
  this.getSlide = function (type) {
    var slide = slides[type].shift();
    slides[type].push(slide);
    return slide;
  };
});

/**
 * A  jQuery plugin to set the content on slides. It applies the contentChange
 * class, which triggers webkit animations. It can also wait for the controller
 * to tell it that the slide is ready to display to the user.
 */
(function ($) {
  $.fn.setSlideContent = function (type, content, displayOnEvent) {
    return $(this).each(function () {
      var slide = $(this),
          slideIsReady = false,
          slideReadyCallbacks = [];

      // This code implements waiting for an event to fire before
      // showing the slide.
      slide.one('slideContentReady', function () {
        slideIsReady = true;
        slideReadyCallbacks.forEach(function (callback) {
          callback();
        })
      });
      
      // If the slide is ready, or we don't care, fire immediately, else wait
      // for the slideContentReady event
      function fireWhenReady(callback) {
        if (!displayOnEvent || slideIsReady) {
          callback();
        } else {
          slideReadyCallbacks.push(callback);
        }
      }
      
      slide.addClass('contentChange');
      setTimeout(function () {
        slide.find('.content').attr('class', type + ' content').html(content);
        fireWhenReady(function () {
          slide.removeClass('contentChange');
        })
      }, 600);      
    });
  }
}(jQuery));