module.exports = function(grunt) {

    var distOptions = {
        debug: false,
        transform : [['uglifyify', {
            global: true,
            preserveComments: false,
            dropDebugger: true,
            dropConsole: true
        }]],
        browserifyOptions: {
            standalone: 'MediaPlatform'
        }
    };
	var buildOptions = {
		debug: false,
        browserifyOptions: {
            standalone: 'MediaPlatform'
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
                src: ['public/MediaPlatform.js'],
                dest: 'dist/MediaPlatform.min.js'
            },
            build: {
				options: buildOptions,
                src: ['public/MediaPlatform.js'],
                dest: 'build/MediaPlatform.min.js'
            },
            tests: {
                src: ['tests/browser/**/*-test.js'],
                dest: 'build/tests.js'
            }
        },
        mocha: {
            test: {
                src: ['tests/browser/MochaRunner.html'],
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