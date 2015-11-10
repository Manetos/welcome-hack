'use strict';
var spawn = require('child_process').spawn;

var Speech = module.exports = function Speech() {
};

Speech.prototype.sayWelcome = function sayWelcome(name) {
    var child = spawn('aplay',
                      ['-D', 'hw:1', './audio/welcome.wav']);
    child.on('exit', function() {
        this._sayName(name);
    }.bind(this));
};

Speech.prototype._sayName = function _sayName(name) {
    var child = spawn('aplay',
                      ['-D', 'hw:1', './audio/' + name + '.wav']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });
};

Speech.prototype.identifyYourself = function identifyYourself() {
    var child = spawn('vlc',
                      ['./audio/identify.wav']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });
};

if (!module.parent) {
    var speech = new Speech();
    speech.sayWelcome('ebby');
    speech.sayWelcome('linus');
}
