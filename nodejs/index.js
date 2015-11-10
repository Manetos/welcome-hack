'use strict';

var WebCam = require('./webcam');
var Proximity = require('./proximity');

var cam = new WebCam();
var prox = new Proximity();

prox.on('motion', function() {
    console.log('Sensed motion');
    cam.capture(new Date().toISOString() + '.jpeg');
});

