'use strict';
var spawn = require('child_process').spawn;

var WebCam = module.exports = function WebCam(device, quality) {
    this.device = device || '/dev/video0';
    this.quality = quality || 75;
};

WebCam.prototype.capture = function capture(filename, cb) {
    var callback = cb || function() {};
    var child = spawn('streamer',
                      ['-c', this.device,
                       '-b', 16,
                       '-j', this.quality,
                       '-o', filename]);

    child.stdout.on('data', function(chunk) {
        callback(null, chunk);
    });

    child.on('exit', function() {
        console.log('exited');
        callback(null, 'exit');
    });

    child.on('error', function() {
        console.log('error');
        callback(null, 'error');
    });
};

if (!module.parent) {
    var webcam = new WebCam();
    webcam.capture(new Date().toISOString() + '.jpeg');
}
