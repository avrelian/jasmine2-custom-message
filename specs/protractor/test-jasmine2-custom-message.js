'use strict';

require('../common/expect-message-to-equal');
require('../../jasmine2-custom-message');

(function(undefined) {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var expectMessageToEqual = global.expectMessageToEqual;

  var test = function() {

    describe('jasmine with jasmine2-custom-message', function() {

      describe('should generate custom failure message', function() {

        describe('when actual value is', function() {

          describe('a fulfilled promise', function() {

            describe('and expectation is matching', function() {

              it('positively', function() {
                expectMessageToEqual("2 bla-bla-bla 3").
                since(function() {
                  return this.expected + ' bla-bla-bla ' + this.actual;
                }).
                expect(protractor.promise.fulfilled(3)).toEqual(2);
              });

              it('negatively', function() {
                expectMessageToEqual("3 bla-bla-bla 3").
                since(function() {
                  return this.expected + ' bla-bla-bla ' + this.actual;
                }).
                expect(protractor.promise.fulfilled(3)).not.toEqual(3);
              });

              describe('and original message is included', function() {
                it('positively', function() {
                  expectMessageToEqual("2 bla-bla-bla 3, that is, Expected 3 to equal 2.").
                  since(function() {
                    return this.expected + ' bla-bla-bla ' + this.actual + ', that is, ' + this.message;
                  }).
                  expect(protractor.promise.fulfilled(3)).toEqual(2);
                });

                it('negatively', function() {
                  expectMessageToEqual("3 bla-bla-bla 3, that is, Expected 3 not to equal 3.").
                  since(function() {
                    return this.expected + ' bla-bla-bla ' + this.actual + ', that is, ' + this.message;
                  }).
                  expect(protractor.promise.fulfilled(3)).not.toEqual(3);
                });
              });

            });

            describe('and expected value is', function() {

              describe('a fulfilled promise', function() {

                describe('and expectation is matching', function() {

                  it('positively', function() {
                    expectMessageToEqual("2 bla-bla-bla 3").
                    since(function() {
                      return this.expected + ' bla-bla-bla ' + this.actual;
                    }).
                    expect(protractor.promise.fulfilled(3)).toEqual(protractor.promise.fulfilled(2));
                  });

                  it('negatively', function() {
                    expectMessageToEqual("3 bla-bla-bla 3").
                    since(function() {
                      return this.expected + ' bla-bla-bla ' + this.actual;
                    }).
                    expect(protractor.promise.fulfilled(3)).not.toEqual(protractor.promise.fulfilled(3));
                  });

                  describe('and original message is included', function() {
                    it('positively', function() {
                      expectMessageToEqual("2 bla-bla-bla 3, that is, Expected 3 to equal 2.").
                      since(function() {
                        return this.expected + ' bla-bla-bla ' + this.actual + ', that is, ' + this.message;
                      }).
                      expect(protractor.promise.fulfilled(3)).toEqual(protractor.promise.fulfilled(2));
                    });

                    it('negatively', function() {
                      expectMessageToEqual("3 bla-bla-bla 3, that is, Expected 3 not to equal 3.").
                      since(function() {
                        return this.expected + ' bla-bla-bla ' + this.actual + ', that is, ' + this.message;
                      }).
                      expect(protractor.promise.fulfilled(3)).not.toEqual(protractor.promise.fulfilled(3));
                    });
                  });
                });

              });

            });

          });

        });

      });

    });

  };

  if (isBrowserEnv) {
    test();
  } else {
    if (isCommonJS) {
      module.exports = test();
    }
  }
})();