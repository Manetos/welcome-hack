'use strict';

var express = require('express');
var app = express.createServer();

var util = require('util');

var UserDB = require('./user_db');

var WebCam = require('./webcam');
var Proximity = require('./proximity');
var Card = require('./card');
var Arduino = require('./arduino');
var Speech = require('./speech');

var arduino = new Arduino();

var cam = new WebCam();
var prox = new Proximity(arduino);
var card = new Card(arduino);
var speech = new Speech();

var userdb = new UserDB();

app.use(express.static(__dirname + '/public'));
app.listen(8080);

prox.on('motion', function() {
    console.log('Sensed motion');
    cam.capture(new Date().toISOString() + '.jpeg');
    speech.sayWelcome();
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
            speech.greetUser(user.name.toLowerCase());
        }
        else {
            userdb.registerUser(id);
            speech.identifyYourself();
        }
    });
});

setTimeout(function(){
    card.emit('card', 'db8e87b');
}, 10000);
