module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');

	grunt.initConfig({
		jshint: {
			files: [
				'app/js/**/*.js',
				'routes.js',
				'server.js',
				'test/**/*.js'
			],
		options: {
				'jshintrc': true
			}
		},
		clean: {
			dev: {
				src: [
					'build/',
					'dist/'
				]
			},
			test: {
				src: ['test/testBundle.js']
			}
		},
    sass: {
      dev: {
        files: {
          'app/styles.css': 'app/styles/styles.scss'
        }
	    }
    },
		browserify: {
			dev: {
				options: {
					transform: [
						'debowerify',
						'hbsify'
					],
					debug: true
				},
				src: ['app/js/**/*.js'],
				dest: 'build/bundle.js'
			},
			backbonetest: {
				options: {
					transform: [
						'debowerify',
						'hbsify'
					],
					debug: true
				},
				src: ['test/backbone/**/*.js'],
				dest: 'test/testBundle.js'
			}
		},
		mocha: {
			backbonetest: {
        src: ['test/test.html'],
        options: {
          run: true
        }
			}
		},
		copy: {
			dev: {
				expand: true,
				cwd: 'app/',
				src: [
					'*.html',
					'*.css'
				],
				dest: 'build/',
				filter: 'isFile'
			}
		},
		express: {
      all: {
        options: {
          port: 3000,
          hostname: 'localhost',
          livereload: true,
          bases: 'build/'
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
		watch: {
			all: {
				files: [
					'app/js/**/*',
					'app/index.html',
					'app/styles/**/*.scss',
					'server.js',
					'routes.js'
				],
				tasks: [
					// 'clean:test',
					'clean:dev',
					'jshint',
					'sass:dev',
					'browserify:dev',
					'copy:dev'
				],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['app/styles/**/*.scss'],
				tasks: [
				'sass:dev'
				],
				options: {
					livereload: true
				}
			}
		}
		// Add CSSmin and Uglify for dist build
	});
	grunt.registerTask('default', [
		// 'clean:test',
		'jshint',
		// 'browserify:backbonetest', // Test Backbone
		// 'mocha:backbonetest', // Test Backbone
		'clean:dev',
		'sass:dev',
		'browserify:dev',
		'copy:dev',
		// Localhost/LiveReload init
		// 'express',
		// 'open',
		'watch:all'
	]);

	grunt.registerTask('test', ['browserify:backbonetest', 'mocha:backbonetest']);
};
