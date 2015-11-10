'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Arduino = require('./arduino');

var Card = module.exports = function Card(arduino) {
    this.arduino = arduino || new Arduino();

    this.lastCard = null;
    this.init();
};

util.inherits(Card, EventEmitter);

Card.prototype.init = function init() {
    var self = this;
    this.arduino.on('RAW:CARD', function(rawId) {
        var cardId = parseInt(rawId, 16);
        if (cardId === self.lastCard) {
            return;
        }
        self.lastCard = cardId;

        self.emit('card', cardId);
    });
};

if (require.main === module) {
    var card = new Card();
    card.on('card', function(id) {
        console.log('Card: ' + id);
    });
}
