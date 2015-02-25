module.exports = function(grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //Load in the build configuration file.
    var userConfig = require( './build.config.js' );

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
                    'build/css/app.min.css': ['build/css/app.css']
                }
            }
        },

        //combine files like this: 'dist/js/output.js': ['js/input.js', 'js/input2.js']
        // uglify: {
        //     scriptz: {
        //         files: {
        //             'dist/js/app.js': 'js/app.js'
        //         }
        //     }
        // },

        copy: {
            main: {
                files: [{
                    src: ['fonts/*'],
                    dest: 'build/'
                }, {
                    src: ['images/*'],
                    dest: 'build/images/'
                }, {
                    src: ['js/*.js'],
                    dest: 'build/js/'
                },{
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
        }

    };

    grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

    grunt.registerTask('build', ['sass', 'cssmin', 'copy']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

};