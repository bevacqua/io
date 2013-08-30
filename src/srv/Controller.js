'use strict';

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var viewBase = 'bin/views';

function Controller(name){
    this.name = name;
}

Controller.prototype.renderView = function(res, view){
    var file = path.join(viewBase, this.name, view);
console.log(file);
    fs.readFile(file, function(err, data){
        res.end(data);
    });
};

module.exports = function(){
    var args = _.toArray(arguments);
    return new (Function.prototype.bind.apply(Controller, [null].concat(args)));
};