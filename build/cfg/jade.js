'use strict';

module.exports = function(release){
    var views = 'src/client/views';
    
    return {
        expand: true,
        cwd: views,
        src: '**/*.jade',
        dest: 'bin/views',
        ext: '.html',
        options: {
            pretty: !release,
            basedir: views,
            data: function(){
                var stylesheets = require('./stylesheets.js');
                var scripts = require('./scripts.js');

                return {
                    stylesheets: stylesheets(),
                    scripts: scripts
                };
            }
        }
    };
};