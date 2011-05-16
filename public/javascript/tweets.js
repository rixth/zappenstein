(function () {
  /**
   * The data source for tweets.
   */
  var tweets = (function () {
    var page = 1;
    
    return new DataSource({
      url: function () {
        // Only cycle though recent tweets.
        if (page > 2) {
          page = 1;
        }
        return 'http://search.twitter.com/search.json?q=@zappos&result_type=recent&rpp=100&page=' + (page++);
      }
    });
  }());
   
  function renderSingleSlide(triggerNext) {
    tweets.getItem(function (tweet) {
      var slide = SlideHelper.getSlide('tweet'),
          slideContent = $([
            '<div class="tweetText">' + tweet.text + '</div>',
            '<div class="productBar">',
            '@' + tweet.from_user + ', ' + prettyDate(tweet.created_at),
            '</div>'
          ].join(''));
    
      slide.setSlideContent('tweet', slideContent, false);
      
      if (triggerNext) {
        setTimeout(function () {
          renderSingleSlide(true)
        }, SlideHelper.randomDelay(10, 15));
      }
    });
  }
  
  // Display 4 slides, and tell the last one to start the render timer
  for (var i = 0; i < 4; i++) {
    renderSingleSlide(i === 3);
  }
  
  /*
   * JavaScript Pretty Date
   * Copyright (c) 2008 John Resig (jquery.com)
   * Licensed under the MIT license.
   *
   * Takes an ISO time and returns a string representing how
   * long ago the date represents.
   */
  function prettyDate(time) {
  	var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
  		diff = (((new Date()).getTime() - date.getTime()) / 1000),
  		day_diff = Math.floor(diff / 86400);

  	if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31)
  		return;

  	return day_diff == 0 && (
  			diff < 60 && "just now" ||
  			diff < 120 && "1 minute ago" ||
  			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
  			diff < 7200 && "1 hour ago" ||
  			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
  		day_diff == 1 && "yesterday" ||
  		day_diff < 7 && day_diff + " days ago" ||
  		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
  }
}());