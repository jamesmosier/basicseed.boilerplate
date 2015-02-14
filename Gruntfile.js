module.exports = function(grunt) {
    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //example taken from: http://thecrumb.com/2014/03/15/using-grunt-for-live-reload/
    grunt.initConfig({

        //https://github.com/gruntjs/grunt-contrib-connect
        connect: {
            server: {
                options: {
                    port: 1414,
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
                    'dist/css/basicseed.css': 'sass/app.scss'
                }
            }
        },

        //https://github.com/gruntjs/grunt-contrib-cssmin
        cssmin: {
            combine: {
                files: {
                    'dist/css/basicseed.min.css': ['dist/css/basicseed.css']
                }
            }
        },

        //combine files like this: 'dist/js/output.js': ['js/input.js', 'js/input2.js']
        uglify: {
            scriptz: {
                files: {
                    'dist/js/main.js': 'js/main.js'
                }
            }
        },

        copy: {
            main: {
                files: [{
                    src: ['fonts/*'],
                    dest: 'dist/'
                }, {
                    src: ['dist/css/*'],
                    dest: 'docs/_site/css/',
                    flatten: true,
                    filter: 'isFile',
                    expand: true
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

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            all: {
                files: ['*.html', 'sass/*.scss', 'sass/**/*.scss', 'css/basicseed.css', 'views/*.html'],
                tasks: ['sass', 'cssmin', 'copy'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['js/*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'copy']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

};