(function () {
  /**
   * The data source for pictures.
   */
  var pictures = (function () {
    var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search' + 
              '&format=json&media=photos&extras=owner_name,date_upload,url_m' + 
              '&text=zappos OR shoes&api_key=' + FLICKR_API_KEY +
              '&page=';
              
    return new DataSource({
      url: function () {
        // Pick a random page between 1 and 4001
        return url + (Math.round(Math.random() * 4000) + 1);
      },
      ajax: {
        jsonp: 'jsoncallback'
      },
      resultsExtractor: function (rawData) {
        return rawData.photos.photo;
      }
    });
  }());
   
  function renderSingleSlide(triggerNext) {
    pictures.getItem(function (item) {
      var slide = SlideHelper.getSlide('picture'),
          slideContent = $([
            '<div class="img" style="background: transparent url(' + item.url_m + ') no-repeat center center">',
            '<div class="productBar">',
            '  <a target="_blank" href="http://www.flickr.com/photos/' + item.owner + '/' + item.id + '">' + item.title + '</a>',
            '  by ' + item.ownername,
            '</div>'
          ].join(''));
    
      slide.setSlideContent('picture', slideContent, false);
      
      if (triggerNext) {
        setTimeout(function () {
          renderSingleSlide(true)
        }, SlideHelper.randomDelay(1, 4));
      }
    });
  }
  
  // Display 8 slides, and tell the last one to start the render timer
  for (var i = 0; i < 8; i++) {
    renderSingleSlide(i === 7);
  }
}());