'use strict';

var _ = require('lodash');
var chalk = require('chalk');
var ssh = require('./lib/ssh.js');

module.exports = function(grunt){

    grunt.registerTask('ssh_setup', function(name){

        if (arguments.length === 0) {
            grunt.fatal([
                'You should provide an instance name.',
                'e.g: ' + chalk.yellow('grunt ssh_deploy:name')
            ].join('\n'));
        }
        // TODO nginx, users
        // TODO ssh-add the key in ec2_create_keypair so that rsync doesn't cough
        var done = this.async();
        var tasks = [[
            // setup rsync deployments
            'sudo mkdir -p /srv/rsync',
            'sudo chown ubuntu /srv/rsync' // TODO: create an rsync user, chown with him. AWS_RSYNC_USER
        ], [
            // install Node.js
            // TODO use node through a new user, too.
            'sudo apt-get install python-software-properties',
            'sudo add-apt-repository ppa:chris-lea/node.js -y',
            'sudo apt-get update',
            'sudo apt-get install nodejs -y'
        ]];

        var commands = _.flatten(tasks);
        ssh(commands, name, done);
    });
};
