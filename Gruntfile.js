module.exports = function(grunt) {
    grunt.initConfig({
        concurrent: {
            target: {
                tasks: ['watch', 'connect'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            css: {
                files: 'src/assets/sass/*.scss',
                tasks: ['compass']
            }
        },
        compass: {
            dev: {
                options: {
                    basePath: 'src/assets',
                    httpPath: '../',
                    cssDir: 'css',
                    environment: 'development'
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: 'src',
                    hostname: '*',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['concurrent']);
};
