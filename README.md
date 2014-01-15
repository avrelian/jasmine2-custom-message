jasmine-custom-message
======================

This script makes it possible to use your own failure message on any jasmine assertion. It wraps jasmine `it` and `expect` functions. Wrapped `it` function accepts your custom failure messages as its third argument and saves it to the current jasmine `spec` object as `customMessages`. Wrapped `expect` function extracts a proper message from `customMessages` of the current jasmine `spec` object based on a sequential number of an assertion in the spec.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => '3 =/= 4'
  }, {
    // 0 - sequential number of an assertion in the spec
    0: function(expected) {
      return this.actual + ' =/= ' + expected;
    }
  });
});
```

## Flexible

Custom failure message for a given assertion will be used only if the third argument of `it` function has a property which name equals to a sequential number of the assertion.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => ordinary jasmine message
    expect(3).toEqual(4); // => 'Custom message'
  }, {
    // property '0' is missing
    1: function() {
      return 'Custom message';
    }
  });
});
```

## Unobtrusive

You can use jasmine as you did before.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => ordinary jasmine message
  });
});
```

## Lenient

You can pass any primitive value (except `null` and `undefined`) or an object instead of a message function.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => ordinary jasmine message
    expect(3).toEqual(4); // => 'Custom message'
  }, {
    1: 'Custom message'
  });
});
```

Or even a primitive value (except `null` and `undefined`) or a function instead of the messages object if only one assertion is present in a given spec or if you are interested in only the first of the assertions.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => 'Custom message'
  }, 'Custom message');
});
```

## Front-end usage
Include
```
<script src="PATH-TO/jasmine-custom-message.js"></script>
```
into your HTML file next to `jasmine` script and execute
```
window.jasmine.initJasmineCustomMessage();
```
function before your jasmine test declaration.

## Node.js usage

Install npm packet `jasmine-custom-message`, require it in your spec file, and execute returned function
```
require('jasmine-custom-message')();
```

## Change log

`v0.5.0` - 2014.01.15
  -- added support for nested message functions
  -- dropped automatic wrapping of jasmine `it` and `expect` functions in browsers
  -- added specs for Node.js
  -- added specs for browsers
  -- registered bower package
  -- made disambiguation and readability improvements

`v0.2.0` - 2014.01.10
  -- BROKEN COMPATIBILITY: custom messages is supplied as the third argument for jasmine `it` function

`v0.1.0` - 2014.01.08 - the first functional version  


## Release plan

`v0.3.0` - specs for browsers

`v0.4.0` - specs for Node.js

`v0.5.0` - bower package

`v0.6.0` - some new features (based on requests from Issues)
