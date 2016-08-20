// Karma configuration
// Generated on Tue Aug 09 2016 12:01:52 GMT+0300 (Jordan Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [
      // angular source
      'http://maps.google.com/maps/api/js',
      'client/lib/angular/angular.js',
      'client/lib/ngmap/build/scripts/*.js',
      'client/lib/angular-route/angular-route.js',
      'client/lib/angular-mocks/angular-mocks.js',
      'client/lib/ng-file-upload/ng-file-upload.min.js',
      'client/lib/ng-file-upload/ng-file-upload-shim.min.js',
      'client/lib/angular-animate/*.js',
      'client/lib/angular-messages/*.js',

      // our app code
      'client/app/app.js',
      'client/app/**/*.js',

      // our spec files
      'specs/client/routingSpec.js',
      'specs/client/servicesSpec.js',
      'specs/client/profileSpec.js',
      'specs/client/editProfileSpec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'client/app/**/*.js' : 'coverage'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'nyan', 'coverage'],

    coverageReporter : {
      type : 'html',
      dir : 'coverage/',
      file : 'coverage.txt'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // captureTimeout: 60000,

    // browserNoActivityTimeout: 10000,
    // browserDisconnectTimeout : 10000, // default 2000
    //browserDisconnectTolerance : 1, // default 0

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
