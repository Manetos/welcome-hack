'use strict';
var spawn = require('child_process').spawn;

var Speech = module.exports = function Speech() {
};

Speech.prototype.sayWelcome = function sayWelcome() {
    var child = spawn('cvlc',
                      ['--play-and-exit', './hello.wav']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });
};

Speech.prototype.sayGoodbye = function sayGoodbye() {
    var child = spawn('vlc',
                      ['./hello.wav']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });

};

if (!module.parent) {
    var speech = new Speech();
    speech.sayWelcome();
}
