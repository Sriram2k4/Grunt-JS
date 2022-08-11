module.exports = function (grunt) {

	var currentdate = new Date();
	var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth()
		+ "/" + currentdate.getFullYear() + " @ "
		+ currentdate.getHours() + ":"
		+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

	grunt.initConfig({
		copy: {
			main: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: 'bower_components/jquery/dist/*',
				dest: '../../htdocs/js/jquery/',
			},
		},
		concat: {
			options: {
				separator: '\n',
				sourceMap: true,
				banner: "/* Processed by Sriram on" + datetime + "*/\n\n",
			},
			css: {
				src: ['../css/**/*.css'],
				dest: 'dist/style.css',
			},
			js: {
				src: [
					'../js/**/*.js',
				],
				dest: 'dist/script.js',
			},
			scss: {
				src: [
					'../scss/**/*.scss',
				],
				dest: 'dist/app.scss',
			}
		},
		cssmin: {
			options: {
				mergeIntoShorthands: false,
				roundingPrecision: -1
			},
			css: {
				files: {
					'../../htdocs/css/style.min.css': ['dist/style.css']
				}
			},
			scss: {
				files: {
					'../../htdocs/css/app.min.css': ['../../htdocs/css/app.css']
				}
			},
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded'
				},
				files: {                         // Dictionary of files
					'../../htdocs/css/app.css': 'dist/app.scss',       // 'destination': 'source'
				}
			}
		},
		uglify: {
			js: {
				options: {
					sourceMap: true,
				},
				files: {
					'../../htdocs/js/script.min.js': ['dist/script.js']
				}
			}
		},
		obfuscator: {
			options: {
				banner: '// obfuscated with grunt-contrib-obfuscator.\n',
				debugProtection: true,
				debugProtectionInterval: true,
				domainLock: ['sriram.selfmade.technology'],
			},
			task1: {
				options: {
					// options for each sub task
				},
				files: {
					'../../htdocs/js/script.o.js': ['dist/script.js']
				}
			}
		},
		watch: {
			css: {
				files: [
					'../css/**/*.css',
				],
				tasks: ['concat:css', 'cssmin:css'],
				options: {
					spawn: false,
				},
			},
			js: {
				files: [
					'../js/**/*.js',
				],
				tasks: ['concat:js', 'uglify', 'obfuscator'],
				options: {
					spawn: false,
				},
			},
			scss: {
				files: [
					'../scss/**/*.scss',
				],
				tasks: ['concat:scss', 'sass', 'cssmin:scss'],
				options: {
					spawn: false,
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-obfuscator');

	grunt.registerTask('css', ['concat', 'cssmin']);
	grunt.registerTask('js', ['concat', 'uglify', 'obfuscator']);
	grunt.registerTask("default", ['copy', 'concat', 'sass', 'cssmin:css', 'cssmin:scss', 'uglify', 'obfuscator', 'watch']);

};