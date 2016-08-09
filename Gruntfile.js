module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      dist_client: {
        files: {
          'client/dist/app.js' : ['client/app/**/*.js', 'client/app/*.js']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['server/spec/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'client/dist/app.min.js' : ['client/dist/app.js']
        }
      }
    },

    // eslint: {
    //   files: {
    //         options: {
    //             useEslintrc: false
    //         },
    //       src: ['public/dist/*.js']
    //   }
    // },  

    cssmin: {
      target: {
        files: {
          'client/styles/style.min.css' : ['client/styles/*.css']
          
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'client/app/**/*.js',
          'client/app/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['cssmin']
      }
    },

    karma: {
        unit: {
            configFile: 'karma.conf.js'
        }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    }
    grunt.task.run([ 'server-dev' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest',
    'karma'
  ]);

  //grunt.registerTask('heroku:development', 'cssmin');
  grunt.registerTask('heroku:production', ['concat', 'uglify', 'cssmin']);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('karma', ['karma']);

  grunt.registerTask('deploy', ['concat', 'uglify', 'cssmin']);

};
