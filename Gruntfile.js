'use strict';

var _ = require('lodash');
var cfg = require('./build/cfg');

process.env.NODE_ENV = 'grunt';

require('./env'); // globals and environment variables

module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.loadTasks('./build/tasks');
    grunt.initConfig(_.merge.apply({}, _.values(cfg)));

    // todo: screen shot diffs, integration/e2e tests
    // todo: register to (travis) ci

    function alias (name, tasks) {
        grunt.registerTask(name, tasks.split(' '));
    }

    // build tasks
    alias('images:debug', 'clean:images copy:images sprite');
    alias('images:release', 'images:debug imagemin:all');

    alias('css:debug', 'clean:css stylus:all csslint');
    alias('css:release', 'clean:css stylus:all cssmin:release rev:css');

    alias('js:debug', 'clean:js copy:js_sources copy:js_bower_debug jshint');
    alias('js:release', 'clean:js copy:js_sources uglify:js clean:after_uglify copy:js_bower_release rev:js');

    alias('views:debug', 'clean:views jade:debug');
    alias('views:release', 'clean:views jade:release');

    alias('build:debug', 'images:debug css:debug js:debug views:debug bump-only:build');
    alias('build:rebuild', 'build:debug play:success');
    alias('build:release', 'images:release css:release js:release views:release bump-only:build');

    // testing tasks
    alias('test', 'jshint csslint mochaTest:unit karma:unit_once');

    // development and debugging tasks
    alias('dev_setup', 'pem_decrypt:dev');
    alias('dev', 'clean build:rebuild karma:unit_background concurrent:dev');

    // continuous integration and deployment tasks
    alias('ci', 'clean build:release test');

    alias('deploy_setup', 'pem_decrypt:aws shell:deploy_setup');
    alias('deploy_prepare', 'clean build:release test changelog bump:patch');
    alias('deploy', 'deploy_prepare ec2_deploy:edge');
    alias('deploy_production', 'deploy_prepare ec2_deploy:production');

    alias('default', 'dev');
};
