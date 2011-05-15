// Global. Unawesome.
var ZAPPOS_API_KEY = '1036d75d74f2ed2b0b5a3beabf0e36bec8149ae2';

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

DataSource.purchases = (function () {
  var displayedZips = [];
  return new DataSource({
    url: 'http://api.zappos.com/Statistics?type=latestStyles&key=' + ZAPPOS_API_KEY,
    itemCanBeDisplayed: function (item) {
      var displayed = displayedZips.indexOf(item.zip) === -1;
      displayedZips.push(item.zip);
      return displayed;
    }
  });
  
  setInterval(function () {
    displayedZips = [];
  }, 300000);
}());

/**
 * This is the renderer for recent purchases.
 */
$(function () {
  setInterval(function () {
    DataSource.purchases.getItem(function (item) {
      SlideManager.getSlide('purchase').setSlideContent([
        staticMapTag(item)
      ].join(''));
    });
  }, 2000);
  
  function staticMapTag(item) {
    return '<img src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x200&maptype=roadmap&sensor=false"/>';
  }
});