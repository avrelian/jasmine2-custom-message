jasmine-custom-message
======================

This project makes it possible to use your own failure message on any jasmine assertion. It wraps jasmine `expect` function so that it can accept an instance of a special `jasmine.customMessage.Actual` object as an argument. A `value` property of this object is your ordinary actual value. A `messages` property of this object holds all your custom messages for a given spec. A property name of a message is a sequential number of an assertion in the spec.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    var expected = 4;
    var actualValue = 2 * 2 * 2;
    var actual = new jasmine.customMessage.Actual(actualValue, {
      // 0 - sequential number of an assertion in the spec
      0: function() {
        return 'Custom message';
      }
    });

    expect(actual).toEqual(expected); // => 'Custom message'
  });
});
```

## Flexible

Custom failure message for a given assertion will be used only if `messages` property of `jasmine.customMessage.Actual` object contains property which name equals to a sequential number of the assertion.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    var expected = 4;
    var actualValue = 2 * 2 * 2;
    var actual = new jasmine.customMessage.Actual(actualValue, {
      // property '0' is missing
      1: function() {
        return 'Custom message';
      }
    });

    expect(actual).toEqual(expected); // => ordinary jasmine message
    expect(actual).toEqual(expected); // => 'Custom message'
  });
});
```

## Unobtrusive

You can use jasmine as you did before, since `expect` can accept your ordinary actual value.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    var expected = 4;
    var actual = 2 * 2 * 2;

    expect(actual).toEqual(expected); // => ordinary jasmine message
  });
});
```

## Lenient

You can pass a raw string instead of message function. Or even a raw string instead of the messages object if only one assertion is present in a given spec or if you are interested in only the first of the assertions.

#### Example

```
describe('test', function() {
  it('should be ok', function() {
    var expected = 4;
    var actualValue = 2 * 2 * 2;
    var actual = new jasmine.customMessage.Actual(actualValue, 'Custom message');

    expect(actual).toEqual(expected); // => 'Custom message'
  });
});
```

## Front-end usage
Include `<script src="PATH-TO/jasmine-custom-message.js"></script>` into your HTML file next to `jasmine` script.

## Node.js usage

Install npm packet `jasmine-custom-message` and require it in your spec file
```
require('jasmine-custom-message');
```
You can save the value returned by `require` into a variable but it already is saved in `jasmine` object as `customMessage`.

