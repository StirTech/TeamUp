module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: { 
      dist_client: {
        files: {
          'client/dist/app.js' : ['client/app/**/*.js', 'client/app/*.js']
        }
      },
      // dist_lib: {
      //   files: {
      //     'client/dist/lib.js' : ['client/lib/jquery.js', 'public/lib/underscore.js',
      //      'public/lib/backbone.js', 'public/lib/handlebars.js'],
      //   }
      // }
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

    // cssmin: {
    //   target: {
    //     files: {
    //       'public/style.min.css' : ['public/style.css']
          
    //     }
    //   }
    // },

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
      // css: {
      //   files: 'public/*.css',
      //   tasks: ['cssmin']
      // }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

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
    'mochaTest'
  ]);

  //grunt.registerTask('heroku:development', 'cssmin');
  grunt.registerTask('heroku:production', ['concat', 'uglify']);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', ['concat', 'uglify']);

};
