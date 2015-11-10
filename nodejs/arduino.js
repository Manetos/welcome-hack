'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var serialport = require('serialport');

var SerialPort = serialport.SerialPort;

var Arduino = module.exports = function Arduino() {
    this.arduino = new SerialPort('/dev/ttyACM0', {
        baudrate: 9600,
        parser: serialport.parsers.readline('\r')
    });
    this.commandHandlers = {};
    this.commandHandlers.DEBUG = function(data) {
        console.log('debug: ' + data);
    };

    this.init();
};

util.inherits(Arduino, EventEmitter);

Arduino.prototype.init = function init() {
    function getCommand(line) {
        var colon = line.indexOf(':');
        if (colon <= 0) {
            return null;
        }
        return line.substring(0, colon);
    }

    function getData(line) {
        var colon = line.indexOf(':');
        if (colon <= 0) {
            return null;
        }
        return line.substring(colon + 2);
    }

    var self = this;
    this.arduino.on('open', function() {
        self.arduino.write('\n');

        self.arduino.on('data', function(data) {
            var line = data.trim();
            var command = getCommand(line);

            if (command in self.commandHandlers) {
                self.commandHandlers[command](getData(line));
            }
            else {
                var args = ['RAW:' + command];
                args.concat(data.split(/ /));
                self.emit.apply(self, args);
            }
        });
    });
};

if (require.main === module) {
    var arduino = new Arduino();
    arduino.on('RAW:PROXIMITY', function(data) {
        console.log('Got proximity event: ' + data);
    });
}
