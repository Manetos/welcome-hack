'use strict';

var util = require('util');

var UserDB = require('./user_db');

var WebCam = require('./webcam');
var Proximity = require('./proximity');
var Card = require('./card');
var Arduino = require('./arduino');

var arduino = new Arduino();

var cam = new WebCam();
var prox = new Proximity(arduino);
var card = new Card(arduino);

var userdb = new UserDB();

prox.on('motion', function() {
    console.log('Sensed motion');
    cam.capture(new Date().toISOString() + '.jpeg');
});

card.on('card', function(id) {
    userdb.getUser(id, function(err, user) {
        if (err) {
            console.log('Failed to read user from database', err);
            return;
        }

        if (user) {
            var msg = 'Welcome %s, your card id is %s';
            console.log(util.format(msg, user.name, id.toString(16)));
        }
        else {
            userdb.registerUser(id);
        }
    });
});
