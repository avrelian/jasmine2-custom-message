/*
 * jasmine-custom-message
 * https://github.com/avrelian/jasmine-custom-message
 *
 * Copyright (c) 2014 Sergey Radchenko
 * Licensed under the MIT license.
 */

'use strict';

(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var ofType = function(val) {
    var types = [].slice.call(arguments, 1);
    var valType = val === null ? 'null' : typeof val;
    return types.indexOf(valType) > -1;
  };

  var getMessage = function(data, message) {
    while (! ofType(message, 'string', 'number', 'boolean')) {
      switch (true) {
        case ofType(message, 'undefined', 'null'):
          message = 'You cannot use `' + message + '` as a custom message';
          break;
        case ofType(message, 'function'):
          message = message.call(data);
          break;
        case message && ofType(message.toString, 'function') && message.toString().indexOf('[object ') !== 0:
          message = message.toString();
          break;
        case JSON && ofType(JSON.stringify, 'function'):
          message = JSON.stringify(message);
          break;
        default:
          message = 'N/A';
      }
    }

    return message.toString();
  };

  var wrapAddExpectationResult = function(spec, customMessages, assertionCount) {
    spec.addExpectationResult = (function(addExpectationResult) {
      return function(passed, data) {
        data.assertionCount = assertionCount;

        if (! passed && customMessages && ! ofType(customMessages[assertionCount], 'null', 'undefined') ) {
          data.message = getMessage(data, customMessages[assertionCount]);
        }

        assertionCount++;

        addExpectationResult.call(spec, passed, data);
      };
    })(spec.addExpectationResult);
  };

  var wrapIt = function() {
    if (global.jasmine && global.it) {
      global.it = (function(it) {
        return function(desc, func, customMessages) {
          var
            assertionCount = 0,
            spec = it(desc, func);

          if (ofType(customMessages, 'function', 'string', 'number', 'boolean')) {
            customMessages = {0: customMessages};
          }

          wrapAddExpectationResult(spec, customMessages, assertionCount);

          return spec;
        };
      })(global.it);
    }
  };

  if (isBrowserEnv) {
    wrapIt();
  } else {
    if (isCommonJS) {
      module.exports = wrapIt();
    }
  }
})();