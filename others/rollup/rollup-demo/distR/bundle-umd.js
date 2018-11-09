(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.variable = factory());
}(this, (function () { 'use strict';

  const add = function(a, b) {
    return a + b;
  };

  function main() {
    return add(1, 2);
  }

  return main;

})));
