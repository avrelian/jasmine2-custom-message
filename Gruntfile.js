'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'jasmine-custom-message.js',
        'Gruntfile.js',
        'specs/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jasmine_node: {
      // options have no effect in `grunt-jasmine-node`#v0.1.0
      test: {}
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  // `jasmine-node` does not yet support `jasmine`#v2.0.0
  // To test `jsamine-custom-message` you can use a browser
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('default', ['test']);

};
