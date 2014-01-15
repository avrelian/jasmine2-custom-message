/*
 * jasmine-custom-message
 * https://github.com/avrelian/jasmine-custom-message
 *
 * Copyright (c) 2014 Sergey Radchenko
 * Licensed under the MIT license.
 */

'use strict';

(function(undefined) {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var ofType = function(val) {
    var types = [].slice.apply(arguments).slice(1);
    var valType = val === null ? 'null' : typeof val;
    return types.indexOf(valType) > -1;
  };


  var wrapIt = function() {
    if (global.jasmine && global.it && ! global.it.wrappedForCustomMessages) {
      global.it = (function(it) {
        var wrappedIt = function(desc, func, customMessages) {
          var spec = it(desc, func);
          if (ofType(customMessages, 'function', 'string', 'number', 'boolean')) {
            customMessages = {0: customMessages};
          }
          if (customMessages) {
            spec.customMessages = customMessages;
          }
          return spec;
        };
        wrappedIt.wrappedForCustomMessages = true;
        return wrappedIt;
      })(global.it);
    }
  };

  var wrapExpect = function() {
    if (global.jasmine && global.expect && !global.expect.wrappedForCustomMessages) {
      global.expect = (function(expect) {
        var wrappedExpect = function(actual) {
          var assertion = expect(actual);
          var spec = assertion.spec;
          var assertionId = spec.results_.totalCount;
          var message = spec.customMessages && spec.customMessages[assertionId];
          if (! ofType(message, 'undefined', 'null')) {
            assertion.message = function() {
              while (! ofType(message, 'string', 'number', 'boolean')) {
                switch (true) {
                  case ofType(message, 'undefined', 'null'):
                    message = 'You cannot use `' + message + '` as a custom message';
                    break;
                  case ofType(message, 'function'):
                    message = message.apply(assertion, arguments);
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

              return message;
            };
          }
          return assertion;
        };
        wrappedExpect.wrappedForCustomMessages = true;
        return wrappedExpect;
      })(global.expect);
    }
  };

  var init = function() {
    wrapIt();
    wrapExpect();
  };
  // for separate testing of jasmine without and with the module
  init.wrapIt = wrapIt;
  init.wrapExpect = wrapExpect;

  if (isBrowserEnv) {
    if (global.jasmine) {
      global.jasmine.initJasmineCustomMessage = init;
    }
  } else {
    if (isCommonJS) {
      module.exports = init;
    }
  }
})();