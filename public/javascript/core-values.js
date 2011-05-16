(function () {
  $.ajax('http://api.zappos.com/CoreValue', {
    dataType: 'jsonp'
  }).success(function (data) {
    var values = data.values;
    
    function render() {
      var randomValue = values[Math.round(Math.random() * (values.length - 1))];
      $('#core_values span').animate({ opacity: 0 }, function () {
        $(this).html(randomValue.name.toLowerCase() + '.').animate({ opacity: 1 });
      });
    }
    
    setInterval(render, 30000);
    render();
  });
}());