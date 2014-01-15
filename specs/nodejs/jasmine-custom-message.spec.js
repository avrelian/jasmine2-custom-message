'use strict';

var path = '../common/';

require(path + 'jasmine-reporter').wrap();
require(path + 'jasmine').test();
require(path + 'jasmine-it-expect').wrap();
require(path + 'jasmine-custom-message').test();