'use strict';

(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var test = function() {
    describe('original jasmine', function () {

      it('should work', function() {
        this.expectedMessages = [];

        expect(3).toEqual(2);
        this.expectedMessages.push("Expected 3 to equal 2.");
      });

      describe('has no property', function() {

        it('initJasmineCustomMessage', function() {
          expect(this.initJasmineCustomMessage).toBeUndefined();
        });

      });

      describe('spec', function() {

        it('has no property "customMessages"', function() {
          expect(this.customMessages).toBeUndefined();
        });

      });

    });
  };

  if (isBrowserEnv) {
    if (global.jasmine && global.jasmine.initJasmineCustomMessage) {
      global.jasmine.initJasmineCustomMessage.testJasmine = test;
    }
  } else {
    if (isCommonJS) {
      exports.test = test;
    }
  }
})();