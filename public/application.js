// Global. Unawesome.
var API_KEY = '1036d75d74f2ed2b0b5a3beabf0e36bec8149ae2';

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

/**
 * This is the code that 
 */
$(function () {
  var renderEvery = 2000,
      items = [],
      zipsTracked = [];
  
  function fetchData() {
    $.ajax('http://api.zappos.com/Statistics?type=latestStyles&key=' + API_KEY, {
      dataType: 'jsonp'
    }).success(function (data) {
      items = data.results;
      render(items.pop());
    });
  }
  
  function render(item) {
    var slides = $('.col-0 .slide, .col-1 .slide');
    slides.eq(Math.round(Math.random() * slides.length)).setSlideContent('<img src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x200&maptype=roadmap&sensor=false"/>');

    if (items.length) {
      setTimeout(function() {
        var item = items.pop();
        while (items.length && zipsTracked.indexOf(item.zip) !== -1) {
          item = items.pop();
        }
        
        if (!items.length && !item) {
          // If we're out of items, go fetch some more
          return fetchData();
        }
        
        zipsTracked.push(item.zip);
        render(item);
      }, renderEvery);
    } else {
      
    }
  }
  
  fetchData();
  
  // Clear the zips displayed every 5 minutes
  setInterval(function () {
    zipsTracked = [];
  }, 300000);
});