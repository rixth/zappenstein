(function () {
  /**
   * The data source for pictures.
   */
  var pictures = (function () {
    var pages = 200, // seed with a default value that we'll override
        url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search' + 
              '&format=json&media=photos&extras=owner_name,date_upload,url_m' + 
              '&text=zappos&api_key=' + FLICKR_API_KEY +
              '&per_page=20&page=';
              
    return new DataSource({
      url: function () {
        // Pick a random page
        return url + (Math.round(Math.random() * pages) + 1);
      },
      ajax: {
        jsonp: 'jsoncallback'
      },
      resultsExtractor: function (rawData) {
        // This 'technically' shouldn't go here
        pages = rawData.pages;
        
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