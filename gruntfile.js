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
            standalone: 'MP'
        }
    };

    var options = {
        debug: false,
        browserifyOptions: {
            standalone: 'MP'
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
        karma: {
            unit: {
                configFile: 'karma.conf.js'
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
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('browser', ['clean:build', 'clean:dist', 'browserify:dist', 'browserify:distMinified']);

    //TODO: run tests against the minified JS
    grunt.registerTask('browser-tests', ['browser', 'karma']);
    grunt.registerTask('server-tests', ['mochaTest']);

    grunt.registerTask('test', ['server-tests']);

    grunt.registerTask('default', ['browser', 'test']);
};