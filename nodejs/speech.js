'use strict';
var spawn = require('child_process').spawn;

var Speech = module.exports = function Speech() {
};

Speech.prototype.sayWelcome = function sayWelcome(name) {
    var child = spawn('mpg123',
                      ['./audio/welcome.mp3']);
    child.on('exit', function() {
        this._sayName(name);
    }.bind(this));
};

Speech.prototype._sayName = function _sayName(name) {
    var child = spawn('mpg123',
                      ['./audio/' + name + '.mp3']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });
};

Speech.prototype.identifyYourself = function identifyYourself() {
    var child = spawn('mpg123',
                      ['./audio/identify.mp3']);
    child.on('exit', function() {
        console.log('finish playing welcome');
    });
};

if (!module.parent) {
    var speech = new Speech();
    speech.sayWelcome('ebby');
    speech.sayWelcome('linus');
    speech.identifyYourself();
}
