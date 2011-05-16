(function () {
  /**
   * The data source for pictures.
   */
  var pictures = (function () {
    var page = 1,
        url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search' + 
              '&format=json&media=photos&extras=owner_name,date_upload,url_m' + 
              '&text=zappos OR shoes OR clothing&api_key=' + FLICKR_API_KEY +
              '&page=';
              
    return new DataSource({
      url: function () {
        return url + (page++);
      },
      ajax: {
        jsonp: 'jsoncallback'
      },
      resultsExtractor: function (rawData) {
        return rawData.photos.photo;
      }
    });
  }());


  setInterval(function () {
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
    });
  }, 2000);
}());

