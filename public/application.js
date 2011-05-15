// Global. Unawesome.
var API_KEY = '1036d75d74f2ed2b0b5a3beabf0e36bec8149ae2';

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
    SlideManager.getSlide('purchase').setSlideContent('<img src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x200&maptype=roadmap&sensor=false"/>');

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