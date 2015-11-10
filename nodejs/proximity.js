'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

var Arduino = require('./arduino');

var Proximity = module.exports = function Proximity(arduino, givenConfig) {
    this.arduino = arduino || new Arduino();

    var config = givenConfig || {};

    this.sensitivity = config.sensitivity || 2;
    this.lastState = null;
    this.lastChange = moment();
    this.init();
};

util.inherits(Proximity, EventEmitter);

Proximity.prototype.init = function init() {
    var self = this;
    this.arduino.on('RAW:PROXIMITY', function(state) {
        if (state === self.lastState) {
            return;
        }
        var secondsSinceLast = moment().diff(self.lastChange, 'seconds');
        if (secondsSinceLast > self.sensitivity) {
            self.lastChange = moment();
            self.emit('motion', secondsSinceLast);
            self.lastState = state;
        }
    });
};

if (require.main === module) {
    var proximity = new Proximity();
    proximity.on('motion', function() {
        console.log('Motion');
    });
}
