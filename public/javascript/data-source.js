var DataSource = function (options) {
  var items = [],
      loadCallbacks = [];
  
  this.loadData = function (callback) {
    if (!loadCallbacks.length) {
      $.ajax(typeof(options.url) === 'function' ? options.url() : options.url, {
        dataType: 'jsonp'
      }).success(function (data) {
        items = data[options.dataKey || 'results'];
        loadCallbacks.forEach(function (callback) {
          callback();
        })
        loadCallbacks = [];
      });
    }
    loadCallbacks.push(callback);
  }
  
  this.getItem = function (callback) {
    if (!items.length) {
      return this.loadData(function () {
        callWithItem(callback);
      });
    }
    callWithItem(callback);
  }
  
  function callWithItem(callback) {
    var item = items.pop();
    if (options.itemCanBeDisplayed) {
      while (item && !options.itemCanBeDisplayed(item)) {
        item = items.pop();
      }
    }
    
    if (item) {
      callback(item);
    }
  }
};