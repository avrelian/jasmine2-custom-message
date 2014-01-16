'use strict';

(function() {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var diff;
  if (isBrowserEnv) {
    diff = window.JsDiff;
  } else {
    if (isCommonJS) {
      diff = require('diff');
    }
  }


  var updateMessage = function(assertion, expectedMessage) {
    expectedMessage = expectedMessage ? expectedMessage.toString() : '';
    var actualMessage = assertion.message.toString();

    var colorize = function(value, color) {
      if (value.value) {
        value = value.value;
      }
      if (isBrowserEnv) {
        return '<span class="color-' + color + '">' + value + '</span>';
      } else {
        if (isCommonJS) {
          var colors = {
            addition: 'cyan',
            deletion: 'yellow',
            common: 'grey'
          };
          return value[colors[color]];
        }
      }
      return value;
    };

    var colorScheme = [
      ['with', 'common'],
      ['additions', 'addition'],
      ['and', 'common'],
      ['deletions', 'deletion']
    ].map(function(item) {
      return colorize(item[0], item[1]);
    }).join(' ');

    var messagesDiff = function() {
      if (typeof 'a'[0] === 'undefined') {
        // this browser does not support ES5 bracket notation on a string
        return colorize(expectedMessage, 'deletion') + '<br>' + colorize(actualMessage, 'addition');
      }

      return diff.diffChars(expectedMessage, actualMessage).reduce(function(result, part) {
        var color = part.added ? 'addition' : part.removed ? 'deletion' : 'common';
        return result + colorize(part, color);
      }, '');
    };

    var createMessage = function(prompt, colorScheme, messagesDiff) {
      if (isBrowserEnv) {
        var el = document.createElement('div');
        el.className = 'custom-message';
        el.innerHTML = '<div class="prompt">' + prompt + '</div>' +
          '<div class="color-scheme">' + colorScheme + ':</div>' +
          '<div class="message-diff">' + messagesDiff + '</div>';
        return el;
      }

      return prompt + ' ' + colorScheme + ':\n\t' + messagesDiff;
    };

    assertion.message = createMessage('See diff of expected and actual message', colorScheme, messagesDiff());
  };

  var reconsiderFailedExpectations = function(specResult, expectedMessages) {
    specResult.failedExpectations = specResult.failedExpectations.filter(function(item) {
      var expectedMessage = expectedMessages[item.assertionCount].toString();

      if (item.message !== expectedMessage) {
        updateMessage(item, expectedMessage);
        return true;
      }

      return false;
    });
  };

  // Since `failed` assertion with a proper custom message should be treated as `passed`,
  // we should wrap `it` function before `jasmine-custom-message` do it.
  var wrapIt = function() {
    if (global.jasmine && global.it) {
      global.it = (function(it) {
        return function(desc, func) {
          var newFunc = function() {
            func.call(userContext);
            reconsiderFailedExpectations(spec.result, userContext.expectedMessages);
          };
          var spec = it(desc, newFunc);
          var userContext = {spec: spec};
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