jasmine-custom-message
======================
> **works with jasmine 2.0.0**



This script makes it possible to use your own failure message on any jasmine assertion. It wraps jasmine `it` function so that it accepts your custom failure messages as its third argument. When one of your assertions fails it extracts a proper message from the custom messages object provided to wrapped `it` function based on a sequential number of an assertion in the spec.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => 'Custom message'
  }, {
    // 0 - sequential number of an assertion in the spec
    0: function() {
      return 'Custom message';
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

## Powerful

You can use expected and actual value of the assertion in your custom message.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    expect(3).toEqual(4); // => '3 =/= 4'
  }, {
    0: function() {
      return this.actual + ' =/= ' + this.expected;
    }
  });
});
```

## Front-end usage
 *  install npm packet `jasmine-custom-message`
```
bower install jasmine-custom-message --save-dev
```
  * include `jasmine-custom-message.js` into your HTML file next to `jasmine` script
```
<script src="PATH-TO/jasmine.js"></script>
<script src="PATH-TO/jasmine-custom-message.js"></script>
```

## Node.js usage

 *  install npm packet `jasmine-custom-message`
```
npm install jasmine-custom-message --save-dev
```

 *  require it in your spec file before your tests
```
require('jasmine-custom-message');
```

## Change log

`v0.5.0` - 2014.01.15
  * added support for nested message functions
  * dropped automatic wrapping of jasmine `it` and `expect` functions in browsers
  * added specs for Node.js
  * added specs for browsers
  * registered bower package
  * made disambiguation and readability improvements

`v0.2.0` - 2014.01.10
  * BROKEN COMPATIBILITY: custom messages is supplied as the third argument for jasmine `it` function

`v0.1.0` - 2014.01.08
  * the first functional version  


## Release plan

`v0.6.0` - some new features (based on requests from Issues)
