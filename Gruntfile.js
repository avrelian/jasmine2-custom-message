'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'jasmine-custom-message.js',
        'Gruntfile.js',
        'specs/common/*.js',
        'specs/nodejs/*.js',
        'specs/browser/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jasmine_node: {
      // options have no effect in v0.1.0 of grunt-jasmine-node package
      test: {}
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'jasmine_node']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
