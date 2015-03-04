module.exports = function(grunt) {
  // Load Grunt tasks declared in the package.json file
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //Load in the build configuration file.
  var userConfig = require('./build.config.js');

  //Show time of execution for the tasks
  require('time-grunt')(grunt);

  //Give the Grunt plugins their instructions!
  var taskConfig = {

    //https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= build_dir %>',
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    },

    //https://github.com/gruntjs/grunt-contrib-sass
    sass: {
      dist: {
        files: {
          'build/css/app.css': 'sass/app.scss'
        }
      }
    },

    //https://github.com/gruntjs/grunt-contrib-cssmin
    cssmin: {
      combine: {
        files: {
          'build/css/app.css': ['build/css/app.css']
        }
      }
    },

    //combine files like this: 'dist/js/output.js': ['js/input.js', 'js/input2.js']
    uglify: {
        scriptz: {
            files: {
                'build/js/app.js': 'js/app.js'
            }
        }
    },

    copy: {
      main: {
        files: [{
          src: ['fonts/*'],
          dest: 'build/'
        }, {
          src: ['images/*'],
          dest: 'build/'
        }, {
          src: ['js/*.js'],
          dest: 'build/'
        }, {
          src: ['*.html'],
          dest: 'build/'
        }]
      },
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'js/*.js'
        ]
      }
    },

    //Empties folders to start fresh
    clean: [
      '<%= build_dir %>'
    ],

    // https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      all: {
        files: ['*.html', 'sass/*.scss', 'sass/**/*.scss', 'build/css/app.css', 'views/*.html'],
        tasks: ['sass', 'cssmin', 'copy'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['js/*.js'],
        tasks: ['jshint:all'],
        options: {
          livereload: true
        }
      }
    },


    /**
     * The `index` task compiles the `index.html` file as a Grunt template. CSS
     * and JS files co-exist here but they get split apart later.
     */
    index: {

      /**
       * During development, we don't want to have wait for compilation,
       * concatenation, minification, etc. So to avoid these steps, we simply
       * add all script files directly to the `<head>` of `index.html`. The
       * `src` property contains the list of included files.
       */
      build: {
        dir: '<%= build_dir %>',
        src: [
          '<%= build_dir %>/js/*.js',
          '<%= build_dir %>/css/*.css'
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: 'build/images/'
        }]
      }
    },

    changelog: {
      options: {
        //no options yet
      }
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('build', ['sass', 'copy', 'index', 'imagemin', 'changelog']);
  grunt.registerTask('prod', ['sass', 'cssmin', 'uglify', 'copy', 'index', 'imagemin', 'changelog']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);


  /**
   * A utility function to get all app JavaScript sources.
   */
  function filterForJS(files) {
    return files.filter(function(file) {
      return file.match(/\.js$/);
    });
  }

  /**
   * A utility function to get all app CSS sources.
   */
  function filterForCSS(files) {
    return files.filter(function(file) {
      return file.match(/\.css$/);
      //return file.match(/^(?:(?!.min\.css$).)*\.css$/);
    });
  }

  /**
   * The index.html template includes the stylesheet and javascript sources
   * based on dynamic names calculated in this Gruntfile. This task assembles
   * the list into variables for the template to use and then runs the
   * compilation.
   */
  grunt.registerMultiTask('index', 'Process index.html template', function() {
    var dirRE = new RegExp('^(' + grunt.config('build_dir') + ')\/', 'g');
    var jsFiles = filterForJS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });
    var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
      return file.replace(dirRE, '');
    });

    grunt.file.copy('index.html', this.data.dir + '/index.html', {
      process: function(contents, path) {
        return grunt.template.process(contents, {
          data: {
            scripts: jsFiles,
            styles: cssFiles,
            version: grunt.config('pkg.version')
          }
        });
      }
    });
  });



};
