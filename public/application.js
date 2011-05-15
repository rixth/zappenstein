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

var DataSource = function (options) {
  var items = [],
      loadCallbacks = [];
  
  this.loadData = function (callback) {
    if (!loadCallbacks.length) {
      $.ajax(typeof(options.url) === 'function' ? options.url() : options.url, {
        dataType: 'jsonp'
      }).success(function (data) {
        items = data[options.dataKey || 'results'];
        loadCallbacks.forEach(function (callback) {
          callback();
        })
        loadCallbacks = [];
      });
    }
    loadCallbacks.push(callback);
  }
  
  this.getItem = function (callback) {
    if (!items.length) {
      return this.loadData(function () {
        callWithItem(callback);
      });
    }
    callWithItem(callback);
  }
  
  function callWithItem(callback) {
    var item = items.pop();
    if (options.itemCanBeDisplayed) {
      while (item && !options.itemCanBeDisplayed(item)) {
        item = items.pop();
      }
    }
    
    if (item) {
      callback(item);
    }
  }
};

DataSource.purchases = (function () {
  var displayedZips = [];
  return new DataSource({
    url: 'http://api.zappos.com/Statistics?type=latestStyles&key=' + API_KEY,
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
 * This is the code that 
 */
$(function () {
  setInterval(function () {
    DataSource.purchases.getItem(function (item) {
      SlideManager.getSlide('purchase').setSlideContent('<img src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x200&maptype=roadmap&sensor=false"/>');
    });
  }, 2000)
});