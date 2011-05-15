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
      return '<img src="http://maps.google.com/maps/api/staticmap?center=' + item.zip + ',' + item.state + '&zoom=12&size=263x200&maptype=roadmap&sensor=false"/>';
    }
  };
  
  // Does the actual rendering of a slide every 2 seconds
  setInterval(function () {
    purchases.getItem(function (item) {
      SlideManager.getSlide('purchase').setSlideContent([
        viewHelpers.staticMapTag(item)
      ].join(''));
    });
  }, 2000);
}());