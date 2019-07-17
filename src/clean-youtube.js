(function() {
  var el;
  var del = function(el) {
    el && el.parentNode.removeChild(el);
  };
  while ((el = document.querySelector(".ytp-ce-element-show"))) del(el);
})();
