'use strict';

(function(undefined) {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var expectMessageToEqual = global.expectMessageToEqual;

  var test = function() {

    describe('jasmine with jasmine-custom-message', function () {

      describe('should work as it did before', function() {

        it('with one assertion', function() {
          expectMessageToEqual("Expected 3 to equal 2.").
          expect(3).toEqual(2);
        });

        it('with number of assertions', function() {
          expectMessageToEqual("Expected 3 to equal 2.").
          expect(3).toEqual(2);

          expectMessageToEqual("Expected 3 to equal 2.").
          expect(3).toEqual(2);

          expectMessageToEqual("Expected 3 to equal 2.").
          expect(3).toEqual(2);
        });

        it('with inverse assertion', function() {
          expectMessageToEqual("Expected 2 not to equal 2.").
          expect(2).not.toEqual(2);
        });

      });

      describe('should generate', function() {

        describe('custom failure message when it is supplied', function() {

          describe('with a', function() {

            it('string', function() {
              expectMessageToEqual("bla-bla-bla").
              since('bla-bla-bla').
              expect(3).toEqual(2);
            });

            it('number', function() {
              expectMessageToEqual(5).
              since(5).
              expect(3).toEqual(2);
            });

            it('boolean', function() {
              expectMessageToEqual(false).
              since(false).
              expect(3).toEqual(2);
            });


            describe('function returning a', function() {

              it('string', function() {
                expectMessageToEqual("2 bla-bla-bla 3").
                since(function() {
                  return this.expected + ' bla-bla-bla ' + this.actual;
                }).
                expect(3).toEqual(2);
              });

              it('number', function() {
                expectMessageToEqual(5).
                since(function() {
                  return 5;
                }).
                expect(3).toEqual(2);
              });

              it('boolean', function() {
                expectMessageToEqual(false).
                since(function() {
                  return false;
                }).
                expect(3).toEqual(2);
              });


              describe('another function returning a', function() {

                it('string', function() {
                  expectMessageToEqual("2 bla-bla-bla 3").
                  since(function() {
                    return function() {
                      return this.expected + ' bla-bla-bla ' + this.actual;
                    };
                  }).
                  expect(3).toEqual(2);
                });

                it('number', function() {
                  expectMessageToEqual(5).
                  since(function() {
                    return function() {
                      return 5;
                    };
                  }).
                  expect(3).toEqual(2);
                });

                it('boolean', function() {
                  expectMessageToEqual(false).
                  since(function() {
                    return function() {
                      return false;
                    };
                  }).
                  expect(3).toEqual(2);
                });

                it('an object', function() {
                  expectMessageToEqual('{"someProp":"someVal"}').
                  since(function() {
                    return function() {
                      return {someProp: 'someVal'};
                    };
                  }).
                  expect(3).toEqual(2);
                });

              });

            });


            describe('object', function() {

              var someObj = {someProp: 'someVal'};

              it('without overridden toString method', function() {
                expectMessageToEqual('{"someProp":"someVal"}').
                since(someObj).
                expect(3).toEqual(2);
              });

              it('with overridden toString method', function() {
                someObj.toString = function() {
                  return 'object bla-bla-bla';
                };

                expectMessageToEqual("object bla-bla-bla").
                since(someObj).
                expect(3).toEqual(2);
              });

            });


            describe('array', function() {

              var someArr = ['some', 'item'];

              it('without overridden toString method', function() {
                expectMessageToEqual('some,item').
                since(someArr).
                expect(3).toEqual(2);
              });

              it('with overridden toString method', function() {
                someArr.toString = function() {
                  return 'array bla-bla-bla';
                };

                expectMessageToEqual("array bla-bla-bla").
                since(someArr).
                expect(3).toEqual(2);
              });

            });

          });

        });

        describe('custom failure messages for', function() {

          it('all assertions', function() {
            expectMessageToEqual("2 bla-bla-bla 3").
            since(function() {
              return this.expected + ' bla-bla-bla ' + this.actual;
            }).
            expect(3).toEqual(2);

            expectMessageToEqual("5 foo-bar-baz 4").
            since(function() {
              return this.expected + ' foo-bar-baz ' + this.actual;
            }).
            expect(4).toEqual(5);
          });

          it('some of the assertions', function() {
            expectMessageToEqual("Expected 3 to equal 2.").
            expect(3).toEqual(2);

            expectMessageToEqual("5 foo-bar-baz 4").
            since(function() {
              return this.expected + ' foo-bar-baz ' + this.actual;
            }).
            expect(4).toEqual(5);
          });

          it('inverse assertion', function() {
            expectMessageToEqual("2 bla-bla-bla 2").
            since("2 bla-bla-bla 2").
            expect(2).not.toEqual(2);
          });

        });

      });

      describe('should not generate', function() {

        describe('custom failure message when it is supplied', function() {

          describe('with', function() {

            it('null', function() {
              expectMessageToEqual("Expected 3 to equal 2.").
              since(null).
              expect(3).toEqual(2);
            });

            it('undefined', function() {
              expectMessageToEqual("Expected 3 to equal 2.").
              since(undefined).
              expect(3).toEqual(2);
            });


            describe('function returning', function() {

              it('null', function() {
                expectMessageToEqual("Expected 3 to equal 2.").
                since(function() {
                  return null;
                }).
                expect(3).toEqual(2);
              });

              it('undefined', function() {
                expectMessageToEqual("Expected 3 to equal 2.").
                since(function() {
                  return undefined;
                }).
                expect(3).toEqual(2);
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
