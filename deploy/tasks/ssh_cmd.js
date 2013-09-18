'use strict';

var util = require('util');
var chalk = require('chalk');
var sshCredentials = require('./lib/sshCredentials.js');

module.exports = function(grunt){

    grunt.registerTask('ssh_cmd', function(name){

        if (arguments.length === 0) {
            grunt.fatal([
                'You should provide an instance name.',
                'e.g: ' + chalk.yellow('grunt ssh_cmd:name')
            ].join('\n'));
        }

        var done = this.async();

        sshCredentials(name, function (c) {
            if (!c) {
                grunt.fatal('This instance is refusing SSH connections for now');
            }

            var command = util.format('ssh -i %s %s@%s', c.privateKeyFile, c.username, c.host);

            grunt.log.writeln('Connect to the %s instance using:', chalk.cyan(c.id));
            grunt.log.writeln(chalk.blue(command));

            done();
        });

    });
};
