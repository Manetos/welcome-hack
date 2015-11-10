'use strict';

var util = require('util');

var Greeting = module.exports = function Greeting(card, speech, userdb) {
    this.userdb = userdb;
    this.card = card;
    this.speech = speech;
};

Greeting.prototype.greet = function greet() {
    var self = this;
    this.timeout = null;
    this.cardListener = null;

    function onCard(id) {
        self.userdb.getUser(id, function(err, user) {
            if (self.timeout) {
                clearTimeout(self.timeout);
                self.timeout = null;
            }
            if (err) {
                console.log('Failed to read user from database', err);
                return;
            }

            if (user) {
                var msg = 'Welcome %s, your card id is %s';
                console.log(util.format(msg, user.name, id.toString(16)));
                self.speech.greetUser(user.name.toLowerCase());
            }
            else {
                self.userdb.registerUser(id);
                self.speech.identifyYourself();
            }
        });
    }

    this.cardListener = onCard;
    this.card.once('card', onCard);

    this.timeout = setTimeout(function() {
        if (self.cardListener) {
            self.card.removeListener('card', self.cardListener);
            self.cardListener = null;
        }

        self.speech.greetUser('guest');
    }, 5000);
};
