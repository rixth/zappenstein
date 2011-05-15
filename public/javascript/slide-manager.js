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