'use strict';

(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var wrap = function() {
    describe('now wrapping jasmine `it` function', function() {

      if (isBrowserEnv) {
        global.jasmine.initJasmineCustomMessage.wrapIt();
      } else {
        if (isCommonJS) {
          require('../../jasmine-custom-message').wrapIt();
        }
      }

      it('and jasmine `expect` function', function() {
        if (isBrowserEnv) {
          global.jasmine.initJasmineCustomMessage.wrapExpect();
        } else {
          if (isCommonJS) {
            require('../../jasmine-custom-message').wrapExpect();
          }
        }
      });
    });
  };

  if (isBrowserEnv) {
    if (global.jasmine && global.jasmine.initJasmineCustomMessage) {
      global.jasmine.initJasmineCustomMessage.wrapItAndExpect = wrap;
    }
  } else {
    if (isCommonJS) {
      exports.wrap = wrap;
    }
  }
})();