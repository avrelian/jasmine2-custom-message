'use strict';

(function(undefined) {
  var global = Function('return this')();
  var isBrowserEnv = global.window && global === global.window;
  var isCommonJS = typeof module !== 'undefined' && module.exports;

  var test = function() {

    describe('jasmine with jasmine-custom-message', function () {

      describe('should work as it did before', function() {

        it('with one assertion', function() {
          this.expectedMessages = [];

          expect(3).toEqual(2);
          this.expectedMessages.push("Expected 3 to equal 2.");
        });

        it('with number of assertions', function() {
          this.expectedMessages = [];

          expect(3).toEqual(2);
          this.expectedMessages.push("Expected 3 to equal 2.");

          expect(3).toEqual(2);
          this.expectedMessages.push("Expected 3 to equal 2.");

          expect(3).toEqual(2);
          this.expectedMessages.push("Expected 3 to equal 2.");
        });

      });

      describe('should generate', function() {

        describe('custom failure message when it is supplied', function() {

          describe('with an object containing a', function() {

            it('string', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("bla-bla-bla");
            }, {
              0: 'bla-bla-bla'
            });

            it('number', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push(5);
            }, {
              0: 5
            });

            it('boolean', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push(false);
            }, {
              0: false
            });


            describe('function returning a', function() {

              it('string', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("2 bla-bla-bla 3");
              }, {
                0: function(expected) {
                  return expected + ' bla-bla-bla ' + this.actual;
                }
              });

              it('number', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push(5);
              }, {
                0: function(expected) {
                  return 5;
                }
              });

              it('boolean', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push(false);
              }, {
                0: function(expected) {
                  return false;
                }
              });


              describe('another function returning a', function() {

                it('string', function() {
                  this.expectedMessages = [];

                  expect(3).toEqual(2);
                  this.expectedMessages.push("2 bla-bla-bla 3");
                }, {
                  0: function(expected) {
                    return function() {
                      return expected + ' bla-bla-bla ' + this.actual;
                    };
                  }
                });

                it('number', function() {
                  this.expectedMessages = [];

                  expect(3).toEqual(2);
                  this.expectedMessages.push(5);
                }, {
                  0: function(expected) {
                    return function() {
                      return 5;
                    };
                  }
                });

                it('boolean', function() {
                  this.expectedMessages = [];

                  expect(3).toEqual(2);
                  this.expectedMessages.push(false);
                }, {
                  0: function(expected) {
                    return function() {
                      return false;
                    };
                  }
                });

                it('an object', function() {
                  this.expectedMessages = [];

                  expect(3).toEqual(2);
                  this.expectedMessages.push('{"someProp":"someVal"}');
                }, {
                  0: function(expected) {
                    return function() {
                      return {someProp: 'someVal'};
                    };
                  }
                });

              });

            });


            describe('object', function() {

              var someObj = {
                someProp: 'someVal'
              };

              it('without overridden toString method', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push('{"someProp":"someVal"}');
              }, {
                0: someObj
              });

              it('with overridden toString method', function() {
                someObj.toString = function() {
                  return 'object bla-bla-bla';
                };

                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("object bla-bla-bla");
              }, {
                0: someObj
              });

            });


            describe('array', function() {

              var someArr = ['some', 'item'];

              it('without overridden toString method', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push('some,item');
              }, {
                0: someArr
              });

              it('with overridden toString method', function() {
                someArr.toString = function() {
                  return 'array bla-bla-bla';
                };

                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("array bla-bla-bla");
              }, {
                0: someArr
              });

            });

          });


          describe('with a', function() {

            it('function', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("2 bla-bla-bla 3");
            }, function(expected) {
              return expected + ' bla-bla-bla ' + this.actual;
            });

            it('string', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("bla-bla-bla");
            }, 'bla-bla-bla');


            it('number', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push(5);
            }, 5);

            it('boolean', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push(false);
            }, false);

          });

        });


        describe('custom failure messages for', function() {

          it('all assertions', function() {
            this.expectedMessages = [];

            expect(3).toEqual(2);
            this.expectedMessages.push("2 bla-bla-bla 3");

            expect(4).toEqual(5);
            this.expectedMessages.push("5 foo-bar-baz 4");
          }, {
            0: function(expected) {
              return expected + ' bla-bla-bla ' + this.actual;
            },
            1: function(expected) {
              return expected + ' foo-bar-baz ' + this.actual;
            }
          });

          it('some of the assertions', function() {
            this.expectedMessages = [];

            expect(3).toEqual(2);
            this.expectedMessages.push("Expected 3 to equal 2.");

            expect(4).toEqual(5);
            this.expectedMessages.push("5 foo-bar-baz 4");
          }, {
            1: function(expected) {
              return expected + ' foo-bar-baz ' + this.actual;
            }
          });

        });

      });

      describe('should not generate', function() {

        describe('custom failure message when it is supplied', function() {

          describe('with an object containing', function() {

            it('null', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("Expected 3 to equal 2.");
            }, null);

            it('undefined', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("Expected 3 to equal 2.");
            }, undefined);

          });


          describe('with', function() {

            it('null', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("Expected 3 to equal 2.");
            }, null);

            it('undefined', function() {
              this.expectedMessages = [];

              expect(3).toEqual(2);
              this.expectedMessages.push("Expected 3 to equal 2.");
            }, undefined);


            describe('function', function() {

              it('returning null', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("You cannot use `null` as a custom message");
              }, {
                0: function(expected) {
                  return null;
                }
              });

              it('returning undefined', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("You cannot use `undefined` as a custom message");
              }, {
                0: function(expected) {
                  return undefined;
                }
              });

            });


            describe('object', function() {

              var someObj = {
                someProp: 'someVal'
              };

              it('directly', function() {
                this.expectedMessages = [];

                expect(3).toEqual(2);
                this.expectedMessages.push("Expected 3 to equal 2.");
              }, someObj);

            });

          });

        });

      });

    });

  };

  if (isBrowserEnv) {
    if (global.jasmine && global.jasmine.initJasmineCustomMessage) {
      global.jasmine.initJasmineCustomMessage.testJasmineCustomMessage = test;
    }
  } else {
    if (isCommonJS) {
      exports.test = test;
    }
  }
})();
