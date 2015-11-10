'use strict';

var WebCam = require('./webcam');
var Proximity = require('./proximity');
var Card = require('./card');
var Arduino = require('./arduino');

var arduino = new Arduino();

var cam = new WebCam();
var prox = new Proximity(arduino);
var card = new Card(arduino);

prox.on('motion', function() {
    console.log('Sensed motion');
    cam.capture(new Date().toISOString() + '.jpeg');
});

card.on('card', function(id) {
    console.log('Got a new card! ' + id.toString(16));
});

