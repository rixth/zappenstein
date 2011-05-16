$(function () {
  if ($('html').hasClass('csstransforms3d')) {
    // If we have 3d transforms available, turn them on
    $('#perspective_toggle').click(function () {
      var body = $('body').toggleClass('my-3d-glasses-are-on');
      $(this).find('span').html(body.hasClass('my-3d-glasses-are-on') ? 'on' : 'off');
    }).click();
    
    // Allow the user to move the perspective by mousing over the stage
    // This code aggressively caches as the event handle is run *a lot*
    (function () {
      var stage = $('#stage'),
          stageOffsetX, stageOffsetY;
      
      function calculateOffset() {
        var offset = stage.offset();
        stageOffsetX = offset.left;
        stageOffsetY = offset.top;
      }    
      $(window).resize(calculateOffset);
      calculateOffset();
      
      stage.mousemove(function (event) {
        stage.css({
          webkitPerspectiveOriginX: (event.clientX - stageOffsetX) + 'px',
          webkitPerspectiveOriginY: (event.clientY - stageOffsetY) + 'px'
        });
      });
      
      stage.mouseleave(function () {
        stage.css({
          webkitPerspectiveOriginX: '50%',
          webkitPerspectiveOriginY: '0%'
        });
      });
    }());
    
    // Let the user change the perspective by arrowing up and down
    (function () {
      var stage = $('#stage');
      $(document).keydown(function (event) {
        if ([40, 38].indexOf(event.keyCode) !== -1) {
          var currentPerspective = +stage.css('-webkit-perspective');
          if (event.keyCode === 40) {
            if (currentPerspective * 1.1 < 2000) {
              stage.css('webkitPerspective', currentPerspective * 1.1);
            }
          } else {
            if (currentPerspective * .9 > 25) {
              stage.css('webkitPerspective', currentPerspective * .9);
            }
          }
          event.preventDefault();
        }
      });
    }());
  }
});