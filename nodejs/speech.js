'use strict';
var spawn = require('child_process').spawn;

var Speech = module.exports = function Speech() {
};

Speech.prototype.greetUser = function greetUser(name) {
    var child = spawn('mpg123', ['./audio/welcome.mp3']);
    child.on('exit', function() {
        this._sayName(name);
    }.bind(this));
};

Speech.prototype._sayName = function _sayName(name) {
    var child = spawn('mpg123', ['./audio/' + name + '.mp3']);
    child.on('exit', function() {
        console.log('finish playing welcome to user');
    });
};

Speech.prototype.sayWelcome  = function sayWelcome(cb) {
    var child = spawn('mpg123', ['./audio/welcome_to_scypho.mp3']);
    var callback = cb || function() {};
    child.on('exit', function() {
        console.log('finish playing welcome_to_scypho');
        callback();
    });
};

Speech.prototype.identifyYourself = function identifyYourself() {
    var child = spawn('mpg123', ['./audio/identify.mp3']);
    child.on('exit', function() {
        console.log('finish playing identify');
    });
};

if (!module.parent) {
    var speech = new Speech();
    speech.sayWelcome(function(callback) {
        speech.greetUser('ebby');
    });
}
