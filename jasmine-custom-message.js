(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;


  var wrapIt = function() {
    if (global.jasmine && global.it) {
      global.it = (function() {
        var it = global.it;
        return function(desc, func, customMessages) {
          var spec = it(desc, func);
          if(typeof customMessages != 'object') {
            customMessages = {0: customMessages};
          }
          spec.customMessages = customMessages || {};
          return spec;
        }
      })();
    }
  };

  var wrapExpect = function() {
    if (global.jasmine && global.expect) {
      global.expect = (function() {
        var expect = global.expect;
        return function(actual) {
          var assertion = expect(actual);
          var spec = assertion.spec;
          var assertionId = spec.results_.totalCount;
          var message = spec.customMessages[assertionId];
          if (message) {
            assertion.message = function() {
              return typeof message == 'function' ? message.apply(assertion, arguments) : message;
            };
          }
          return assertion;
        };
      })();
    }
  };

  var init = function() {
    wrapIt();
    wrapExpect();
  };

  if (isBrowserEnv) {
    init();
  } else {
    if (isCommonJS) {
      // for separate testing of jasmine without and with the module
      init.wrapIt = wrapIt;
      init.wrapExpect = wrapExpect;
      module.exports = init;
    }
  }
})();