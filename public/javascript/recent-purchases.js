(function () {
  /**
   * The data source for recent purchases. It keeps track of what zips are
   * currently displayed on the map, and won't display any duplicates in
   * a 60 second window.
   */
  var purchases = (function () {
    var displayedZips = [];
    
    setInterval(function () {
      displayedZips = [];
    }, 60000);
    
    return new DataSource({
      url: 'http://api.zappos.com/Statistics?type=latestStyles&key=' + ZAPPOS_API_KEY,
      itemCanBeDisplayed: function (item) {
        var displayed = displayedZips.indexOf(item.zip) === -1;
        displayedZips.push(item.zip);
        return displayed;
      }
    });
  }());

  var viewHelpers = {
    staticMapTag: function (item) {
      return '<img class="map" src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x225&maptype=roadmap&sensor=false"/>';
    }
  };
  
  // Does the actual rendering of a slide every 2 seconds
  setInterval(function () {
    purchases.getItem(function (item) {
      var slide = SlideHelper.getSlide('purchase'),
          slideContent = $([
            '<div class="staticMap">' + viewHelpers.staticMapTag(item) + '</div>',
            SlideHelper.viewHelpers.productBar(item)
          ].join(''));
      
      slide.setSlideContent('purchase', slideContent, true);
      
      // Only have the slide display when the map is loaded, otherwise
      // we get a big ugly flash in Safari.
      slideContent.find('img.map').bind('load', function () {
        slide.trigger('slideContentReady');
      });
    });
  }, 2000);
}());