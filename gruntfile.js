module.exports = function(grunt) {

    var minifiedOptions = {
        debug: false,
        transform : [['uglifyify', {
            global: true,
            preserveComments: false,
            dropDebugger: true,
            dropConsole: true
        }]],
        browserifyOptions: {
            standalone: 'media-platform'
        }
    };
    var options = {
        debug: false,
        browserifyOptions: {
            standalone: 'media-platform'
        }
    };

    grunt.initConfig({
        clean : {
            dist : {
                files: [
                    {
                        dot: true,
                        src: ['dist/*']
                    }
                ]
            },
            build : {
                files: [
                    {
                        dot: true,
                        src: [
                            'build/*'
                        ]
                    }
                ]
            }
        },
        browserify: {
            options: {
                debug: false
            },
            distMinified: {
                options: minifiedOptions,
                src: ['public/index.js'],
                dest: 'dist/media-platform.min.js'
            },
            dist: {
                options: options,
                src: ['public/index.js'],
                dest: 'dist/media-platform.js'
            },
            tests: {
                src: ['tests/browser/**/*-test.js'],
                dest: 'build/tests.js'
            }
        },
        mocha: {
            browserTest: {
                src: ['tests/browser/mocha-runner.html'],
                options: {
                    run: true
                }
            }
        },
        mochaTest: {
            serverTest: {
                src: ['tests/server/**/*-test.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('browser', ['clean:dist', 'browserify:dist', 'browserify:distMinified']);

    //TODO: run tests against the minified JS
    grunt.registerTask('browser-tests', ['clean:build', 'browserify:tests', 'mocha']);
    grunt.registerTask('server-tests', ['mochaTest']);

    grunt.registerTask('test', ['server-tests', 'browser-tests']);

    grunt.registerTask('default', ['browser', 'test']);
};