// Type definitions for Jasmine2 custom messages
// Project: https://github.com/avrelian/jasmine2-custom-message
// Definitions by: Holger Jeromin <https://github.com/HolgerJeromin>
// Definitions: https://github.com/avrelian/jasmine2-custom-message

/// <reference types="jasmine" />

interface Jasmine2CustomMessageFncParam {
    /** The actual value */
    actual: any,
    /** The expected value */
    expected: any
}

interface ExpectWrapper {
  /**
   * Create an expectation for a spec.
   * @param spy
   */
  expect(spy: Function): jasmine.Matchers<any>;

  /**
   * Create an expectation for a spec.
   * @param actual
   */
  expect<T>(actual: ArrayLike<T>): jasmine.ArrayLikeMatchers<T>;

  /**
   * Create an expectation for a spec.
   * @param actual Actual computed value to test expectations against.
   */
  expect<T>(actual: T): jasmine.Matchers<T>;

  /**
   * Create an expectation for a spec.
   */
  expect(): jasmine.NothingMatcher;
}

/**
 * Add a dynamic custom message.
 * The original message from jasmine is available as this.message
 * The return value will be converted with toString()
 * If it is already a string #{actual} and #{expected} will be replaced with the current values.
 * #{message} will be replaced with the original message from jasmine.
 */
declare function since(messageGenerator: (this: Jasmine2CustomMessageFncParam) => any): ExpectWrapper;
/**
 * Add a custom message.
 * #{actual} and #{expected} will be replaced with the current values.
 * #{message} will be replaced with the original message from jasmine.
 */
declare function since(message: string): ExpectWrapper;
/**
 * Add a static custom message.
 */
declare function since(message: number | boolean): ExpectWrapper;

/**
 * Add a static custom message.
 * The text will be generated from toString() or JSON.stringify()
 */
declare function since(message: any): ExpectWrapper;
