'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'jasmine2-custom-message.js',
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
    },

    protractor: {
      options: {
      },
      jasmine_custom_message: {
        options: {
          configFile: 'specs/protractor/conf.js',
          args: {
            verbose: true
          }
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-protractor-runner');

  // `jasmine-node` does not yet support `jasmine`#v2.0.0
  // To test `jsamine-custom-message` you can use a browser
  grunt.registerTask('test', ['jshint','protractor']);

  grunt.registerTask('default', ['test']);

};
