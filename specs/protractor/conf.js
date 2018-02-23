var colors = require('colors');
colors.enabled = true;

exports.config = {
  framework: 'jasmine2',
  specs: ['../nodejs/jasmine2-custom-message.spec.js', './test-jasmine2-custom-message.js'],
};
