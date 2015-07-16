module.exports = function(grunt) {
    'use strict';

    //require('time-grunt')(grunt);

    // Define project configuration
    var project = {
        paths: {
            grunt: 'grunt/',
            js: 'js/',
			get config() {
				return this.grunt + 'config/';
			}
        },
        files: {
            js: [
                'js/*.js',
                '!js/*.min.js',
                'spec/*.js',
                '!spec/*.min.js'
            ],

            get config() {
                return project.paths.config + '*.js';
            },
            grunt: 'Gruntfile.js'
        },
        pkg: grunt.file.readJSON( 'package.json' )
    };

    // Load Grunt configurations and tasks
    require( 'load-grunt-config' )(grunt, {
        configPath: require( 'path' ).join( process.cwd(), project.paths.config ),
        data: project
    });
};