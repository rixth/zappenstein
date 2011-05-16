$(function () {
  if ($('html').hasClass('csstransforms3d')) {
    // If we have 3d transforms available, turn them on
    $('#perspective_toggle').click(function () {
      var body = $('body').toggleClass('my-3d-glasses-are-on');
      $(this).find('span').html(body.hasClass('my-3d-glasses-are-on') ? 'on' : 'off');
    }).click();
    
    // Allow the user to move the perspective by mousing over
    (function () {
      var stage = $('#stage'),
          stageWidth = stage.width(),
          stageHeight = stage.height(),
          lastX, lastY;
      
      stage.mousemove(function (event) {
        var newX = event.layerX,
            newY = event.layerY,
            changeX, changeY;
        
        // If either value has changed more than 10% from the last tick
        // we assume this to be bad input.
        changeX = ((lastX - newX) / newX) * 100;
        changeY = ((lastY - newY) / newX) * 100;
        lastX = newX;
        lastY = newY;
        if (changeX > 10 || changeX < -10 || changeY > 10 || changeY < -10) {
          return;
        }
        
        stage.css({
          webkitPerspectiveOriginX: newX + 'px',
          webkitPerspectiveOriginY: newY + 'px'
        });
      });
      
      stage.mouseleave(resetPerspective);
      function resetPerspective() {
        stage.css({
          webkitPerspectiveOriginX: '50%',
          webkitPerspectiveOriginY: '0%'
        });
      }
    }());
  }
});