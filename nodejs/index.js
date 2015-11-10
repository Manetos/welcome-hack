'use strict';

var express = require('express');
var app = express();

var UserDB = require('./user_db');
var Greeting = require('./greeting');

var WebCam = require('./webcam');
var Proximity = require('./proximity');
var Card = require('./card');
var Arduino = require('./arduino');
var Speech = require('./speech');

var arduino = new Arduino();

var cam = new WebCam();
var prox = new Proximity(arduino, {
    sensitivity: 10
});
var card = new Card(arduino);
var speech = new Speech();

var userdb = new UserDB();

app.use(express.static(__dirname + '/images'));
// app.listen(8080);

function onMotion() {
    console.log('Sensed motion');
    cam.capture(new Date().toISOString() + '.jpeg');
    speech.sayWelcome();

    var greeting = new Greeting(card, speech, userdb);
    greeting.greet(function() {
        prox.once('motion', onMotion);
    });
}
prox.once('motion', onMotion);
