exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'jasmine2',
  specs: ['../nodejs/jasmine-custom-message.spec.js']
};