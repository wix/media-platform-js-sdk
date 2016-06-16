module.exports = function(grunt) {

    var distOptions = {
        debug: false,
        transform : [['uglifyify', {
            global: true,
            preserveComments: false,
            dropDebugger: true,
            dropConsole: false
        }]],
        browserifyOptions: {
            standalone: 'media-platform'
        }
    };
	var buildOptions = {
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
                debug: true
            },
            dist: {
                options: distOptions,
                src: ['public/media-platform.js'],
                dest: 'dist/media-platform.min.js'
            },
            build: {
				options: buildOptions,
                src: ['public/media-platform.js'],
                dest: 'build/media-platform.min.js'
            },
            tests: {
                src: ['tests/browser/**/*-test.js'],
                dest: 'build/tests.js'
            }
        },
        mocha: {
            test: {
                src: ['tests/browser/mocha-runner.html'],
                options: {
                    run: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('browser', ['clean:dist', 'browserify:dist']);
    grunt.registerTask('browser-tests', ['clean:build', 'browserify:tests', 'mocha']);
};