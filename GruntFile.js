module.exports = function(grunt) {

	// Load Grunt tasks declared in the package.json file
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({

		watch: {
			scripts: {
				files: [
					'src/js/**/*.js',
					'src/js/**/*.tmj',
					'!src/js/start.js'
				],
				tasks: ['build']
			},
			pages: {
				files: [
					'src/html/*.*'
				],
				tasks: ['copy:html']
			}
		},
		'http-server': {
			dev: {
				root: 'dist',
				port: 3116,
				runInBackground: true
			}
		},
		closureCompiler: {
			options: {
				compilerFile: 'node_modules/google-closure-compiler-java/compiler.jar',
				compilerOpts: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					language_out: 'ECMASCRIPT_2019',
					jscomp_off: 'checkVars',
					assume_function_wrapper: true
				},
			},
			targetName: {
				src: 'dist/js/index_prod.js',
				dest: 'dist/js/i.js'
			}
		},
		uglify: {
			options: {
				compress: {
					global_defs: {
						'DEBUG': false
					},
					dead_code: true
				},
				mangle: {
					//properties: true,
					reserved: ['TileMaps', 'world', 'layers']
				},
			},
			my_target: {
				files: {
					'dist/i.min.js': ['dist/js/i.js']
				}
			}
		},
		jshint: {
			options: {
				esversion: 8,
				evil: true,
				elision: true,
				"-W008": true	// leading 0 before decimal
			},
			all: ['src/js/**/*.js', '!src/js/lib/**.*js']
		},
		/*copy: {
			html: {
				src: '*.*',
				dest: 'dist/',
				cwd: 'src/html',
				expand: true
			}
		},*/
		clean: ['dist/*.html', 'dist/js/'],
		concat: {
			shared: {
				files: {
					'dist/index.html': [
						'src/html/index_dev.html'
					],
					'dist/js/index.js': [
						'src/js/lib/*.js',
						'src/js/main.js',
						'src/js/DEFS.js',
						'src/js/**/*.js',
						'src/js/start.js',
					]
				}
			},
			prod: {
				files: {
					'dist/index.html': [
						'src/html/index_prod.html'
					],
					'dist/js/index_prod.js': [
						'dist/lib/engine.all.release.js',
						'dist/js/index.js'
					]
				}
			}
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('processMap', 'get map data from Tiled', function () {
		let mapJson = grunt.file.readJSON('src/js/world.tmj');
		grunt.file.write(
			'src/js/start.js',
			'const mapData = [' + mapJson.layers[0].data.toString().replaceAll('0,', ',') + '];\n' +
			'const mapWidth = ' + mapJson.width + ';\n' +
			'const mapHeight = ' + mapJson.height + ';\n' +
			'init(); '
		);
	});
	grunt.registerTask('dev', [
		'watch'
	]);
	grunt.registerTask('build', ['clean', 'jshint', 'processMap', 'concat:shared']);
	grunt.registerTask('default', ['build', 'http-server', 'dev']);
	grunt.registerTask('prod', ['clean', 'concat:shared', 'concat:prod', 'closureCompiler', 'uglify', 'http-server', 'dev']);

};