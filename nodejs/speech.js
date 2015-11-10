'use strict';
var play = require('play-audio');

var Speech = module.exports = function Speech() {
};

Speech.prototype.sayWelcome = function sayWelcome() {
    play('welcome.mp3').volume(0.3).controls().loop().on('ended', function() {
        console.log('End of the song reached');
    });
};

Speech.prototype.sayGoodbye = function sayGoodbye() {
    play('goodbye.mp3').volume(0.3).controls().loop().on('ended', function() {
        console.log('End of the song reached');
    });
};

if (!module.parent) {
    var speech = new Speech();
    speech.sayWelcome();
    speech.sayGoodbye();
}
