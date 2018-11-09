var variable = (function () {
  'use strict';

  const add = function(a, b) {
    return a + b;
  };

  function main() {
    return add(1, 2);
  }

  return main;

}());
