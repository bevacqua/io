'use strict';

var path = require('path');
var chalk = require('chalk');
var exec = require('./lib/exec.js');
var sshCredentials = require('./lib/sshCredentials.js');

module.exports = function(grunt){

    grunt.registerTask('ssh_deploy', function(name){

        if (arguments.length === 0) {
            grunt.fatal([
                'You should provide an instance name.',
                'e.g: ' + chalk.yellow('grunt ssh_deploy:name')
            ].join('\n'));
        }

        var done = this.async();

        sshCredentials(name, function (c) {
            var local = '.';
            var remote = '/srv/apps/io/rsync';
            var exclude ='.rsyncignore';

            grunt.log.writeln('Deploying to %s using rsync...', chalk.cyan(c.id));

            exec('rsync -larve "ssh -i %s" %s %s@%s:%s --stats --progress --delete --exclude-from "%s"', [
                c.privateKeyFile, local, c.username, c.host, remote, exclude
            ], done);

            // then deploy according to version, etc.
        });

    });
};
