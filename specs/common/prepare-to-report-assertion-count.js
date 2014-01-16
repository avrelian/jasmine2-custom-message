'use strict';

(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;


  // `Failed` assertion with a proper custom message should be treated as `passed`.
  // To determine what message belongs to what assertion
  // we should report a sequential number of the assertion in a given spec
  var wrapBuildExpectationResult = function() {
    jasmineRequire.buildExpectationResult = (function(buildExpectationResult) {
      return function() {
        return function(options) {
          var result = buildExpectationResult().call(this, options);
          if (typeof options.assertionCount !== 'undefined') {
            result.assertionCount = options.assertionCount;
          }
          return result;
        };
      };
    })(jasmineRequire.buildExpectationResult);
  };


  if (isBrowserEnv) {
    wrapBuildExpectationResult();
  } else {
    if (isCommonJS) {
      module.exports = wrapBuildExpectationResult();
    }
  }
})();