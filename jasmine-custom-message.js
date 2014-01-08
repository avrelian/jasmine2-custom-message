(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  if (global.jasmine && global.expect) {
    var wrapJasmine = function() {
      var customMessage = {
        Actual: function(value, messages) {
          this.value = value;
          this.messages = messages;
        },
        wrapExpect: function() {
          var jasmineExpect = global.expect;
          return function(actual) {
            if (actual instanceof customMessage.Actual) {
              var jasmineObj = jasmineExpect(actual.value);
              var assertionId = jasmineObj.spec.results_.totalCount;
              var message = actual.messages[assertionId];
              if (message) {
                jasmineObj.message = typeof message == 'function' ? message.bind(jasmineObj) : function() {
                  return message;
                };
              }
              return jasmineObj;
            }

            return jasmineExpect(actual);
          };
        }
      };

      global.expect = customMessage.wrapExpect();
      global.jasmine.customMessage = customMessage;

      return customMessage;
    };

    if (isBrowserEnv) {
      wrapJasmine();
    } else {
      if (isCommonJS) {
        module.exports = wrapJasmine();
      }
    }
  }
})();