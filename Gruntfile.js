module.exports = function(grunt) {

    grunt.initConfig({

        jekyll: {
            build: {
                dest: '_site'
            }
        },

        sass: {
            dist: {
                files: {
                    'css/app.css': '_sass/app.scss'
                }
            }
        },

        watch: {
            sass: {
                files: '_sass/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            jekyll: {
                files: ['_layouts/*.html', '_includes/*.html', '_plugins/*', '_posts/*', 'css/app.css', 'index.html'],
                tasks: ['jekyll'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify']
            }
        },

        //http://stackoverflow.com/questions/21836478/grunt-watch-connect
        connect: {
            server: {
                options: {
                    port: 3333,
                    base: '_site',
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'css/app.min.css': ['css/app.css']
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'js/app.min.js': ['js/app.js']
                }
            }
        },

        buildcontrol: {
            options: {
                dir: '_site',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:whichgrid/whichgrid.github.io.git',
                    branch: 'master'
                }
            }
        },

        clean: [
            '_site'
        ],

    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jekyll');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Custom tasks
    grunt.registerTask('build', ['sass', 'cssmin', 'uglify', 'jekyll']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

    grunt.registerTask('prod', ['sass', 'jekyll', 'cssmin', 'uglify', 'buildcontrol']);


};