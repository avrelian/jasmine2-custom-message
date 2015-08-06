var colors = require('colors');
colors.enabled = true;

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  specs: ['../nodejs/jasmine2-custom-message.spec.js', './test-jasmine2-custom-message.js']
};