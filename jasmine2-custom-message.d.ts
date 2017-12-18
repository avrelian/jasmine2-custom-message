// Type definitions for Jasmine2 custom messages
// Project: https://github.com/avrelian/jasmine2-custom-message
// Definitions by: Holger Jeromin <https://github.com/HolgerJeromin>
// Definitions: https://github.com/avrelian/jasmine2-custom-message

interface Jasmine2CustomMessageFncParam {
    /** The actual value */
    actual: any,
    /** The expected value */
    expected: any
}

/**
 * Add a dynamic custom message.
 * The return value will be converted with toString()
 * If it is already a string #{actual} and #{expected} will be replaced with the current values.
 */
declare function since(messageGenerator: (this: Jasmine2CustomMessageFncParam) => any): {
    expect: (spyOrActual: Function | any) => jasmine.Matchers;
}
/**
 * Add a custom message.
 * #{actual} and #{expected} will be replaced with the current values.
 */
declare function since(message: string): {
    expect: (spyOrActual: Function | any)=> jasmine.Matchers;
}
/**
 * Add a static custom message.
 */
declare function since(message: number | boolean): {
    expect: (spyOrActual: Function | any) => jasmine.Matchers;
}
/**
 * Add a static custom message.
 * The text will be generated from toString() or JSON.stringify()
 */
declare function since(message: any): {
    expect: (spyOrActual: Function | any) => jasmine.Matchers;
}
