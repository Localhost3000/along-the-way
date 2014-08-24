module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		jshint: {
			files: [
				'app/js/**/*.js',
				'routes.js',
				'server.js',
				'test/**/*.js'
			]
		},
		clean: {
			dev: {
				src: [
					'build/',
					'dist/'
				]
			}
		},
    sass: {
      dev: {
        files: {
          'app/styles.css': 'app/styles/styles.scss'
        }
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
						'hbisfy'
					],
					debug: true
				},
				src: ['test/mocha/backbone/**/*.js'],
				dest: 'test/testBundle.js'
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
					'app/**/*',
					'server.js',
					'routes.js'
				],
				tasks: [
					'jshint',
					'sass:dev',
					'clean:dev',
					'browserify:dev',
					'copy:dev'
				],
				options: {
					livereload: true
				}
			}
		}
		// Add CSSmin and Uglify for dist build
	});
	grunt.registerTask('default', [
		'jshint',
		'sass:dev',
		// 'browserify:backbonetest', // For testing Backbone
		// 'mocha:backbonetest', // For testing Backbone
		'clean:dev',
		'browserify:dev',
		'copy:dev',
		// Localhost/LiveReload init
		'express',
		'open',
		'watch:all'
	]);
};