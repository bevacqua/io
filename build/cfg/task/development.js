'use strict';

var assets = require('../assets');

module.exports = {
    jshint: {
        client: assets.js.lint('src/client/js', ['src/client/js/**/*.js', '!src/client/js/vendor/**/*.js']),
        client_support: assets.js.lint('src/client/js', ['test/client']),
        server: assets.js.lint('src/srv', ['src/srv', 'src/lib', 'app.js']),
        server_support: assets.js.lint('src/srv', ['Gruntfile.js', 'build', 'deploy', 'test/server'])
    },
    mochaTest: {
        options: {
            reporter: 'spec'
        },
        unit: {
            src: ['test/server/unit/**/*.js']
        }
    },
    karma: {
        unit: {
            singleRun: true,
            browsers: ['PhantomJS'],
            options: {
                files: ['test/client/unit/**/*.js']
            }
        }
    },
    watch: {
        rebuild: { tasks: ['build:rebuild'], files: ['Gruntfile.js', 'build/**/*.js'] },
        test_client: { tasks: ['test:js_client', 'play:success'], files: ['src/client/js/**/*.js', 'test/client/**/*.js'] },
        test_server: { tasks: ['test:js_server', 'play:success'], files: ['src/srv/**/*.js', 'app.js', 'test/server/**/*.js'] },
        jshint_client_support: { tasks: ['jshint:client_support', 'play:success'], files: ['test/client/**/*.js'] },
        jshint_server_support: { tasks: ['jshint:server_support', 'play:success'], files: ['Gruntfile.js', 'build/**/*.js', 'deploy/**/*.js', 'test/server/**/*.js'] },
        images: { tasks: ['images:debug', 'play:success'], files: ['src/client/img/**/*.{png,jpg,gif,ico}'] },
        css: { tasks: ['css:debug', 'play:success'], files: ['src/client/css/**/*.styl', 'bin/.tmp/sprite/*.css', 'bower_components/**/*.css'] },
        js_sources: { tasks: ['copy:js_sources', 'play:success'], files: ['src/client/js/**/*.js'] },
        js_bower: { tasks: ['copy:js_bower_debug', 'play:success'], files: ['bower_components/**/*.js'] },
        views: { tasks: ['views:debug', 'play:success'], files: ['src/client/views/**/*.jade'] },
        livereload: { options: { livereload: true }, files: ['bin/public/**/*.{css,js}','bin/views/**/*.html'] }
    },
    nodemon: {
        dev: {
            options: {
                file: 'build/nodemon.js'
            }
        }
    },
    concurrent: {
        dev: {
            tasks: ['watch', 'nodemon:dev'],
            options: {
                logConcurrentOutput: true
            }
        }
    },
    play: {
        success: { file: 'build/sound/success.mp3' }
    }
};
