module.exports = function(grunt) {
    grunt.initConfig({
        paths: {
            src: 'src',
            tmp: 'tmp',
            dist: 'dist'
        },
        concurrent: {
            target: {
                tasks: ['watch', 'connect:dev'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            css: {
                files: '<%= paths.src %>/assets/sass/*.scss',
                tasks: ['compass:dev']
            }
        },
        compass: {
            dev: {
                options: {
                    basePath: '<%= paths.src %>/assets',
                    httpPath: '../',
                    cssDir: 'css',
                    environment: 'development'
                }
            },
            dist: {
                options: {
                    basePath: '<%= paths.tmp %>/assets',
                    cssDir: '../',
                    specify: '<%= paths.tmp %>/assets/sass/styles.scss',
                    outputStyle: 'compressed'
                }
            }
        },
        connect: {
            dev: {
                options: {
                    base: '<%= paths.src %>'
                }
            },
            dist: {
                options: {
                    base: '<%= paths.dist %>'
                }
            },
            options: {
                hostname: '*',
                keepalive: true
            }
        },
        clean: {
            tmp: '<%= paths.tmp %>',
            dist: '<%= paths.dist %>'
        },
        copy: {
            tmp: {
                cwd: '<%= paths.src %>',
                src: '**',
                dest: '<%= paths.tmp %>',
                expand: true
            },
            dist: {
                cwd: '<%= paths.tmp %>',
                src: ['index.html', 'scripts.js', 'styles.css'],
                dest: '<%= paths.dist %>',
                expand: true
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: '<%= paths.tmp %>/assets',
                    mainConfigFile: '<%= paths.tmp %>/assets/js/main.js',
                    name: 'vendor/almond/almond',
                    include: 'js/main',
                    out: '<%= paths.tmp %>/scripts.js',
                    optimize: 'uglify2'
                }
            }
        },
        htmlrefs: {
            dist: {
                src: '<%= paths.tmp %>/index.html'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-htmlrefs');

    grunt.registerTask('default', ['concurrent']);
    grunt.registerTask('build', ['clean', 'copy:tmp', 'compass:dist', 'requirejs', 'htmlrefs', 'copy:dist', 'clean:tmp']);
};
