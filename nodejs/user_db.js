'use strict';

var readline = require('readline');
var redis = require('redis');

var UserDB = module.exports = function UserDB() {
    this.client = redis.createClient();

    this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
};

UserDB.prototype.createUser = function createUser(id, data) {
    this.client.hset('users', id, JSON.stringify({
        id: id,
        name: data.name,
    }), function(err) {
        if (err) {
            console.log('Failed to save user to redis: ' + err);
            return;
        }
        console.log('Saved user to redis!');
    });
};

UserDB.prototype.getUser = function getUser(id, cb) {
    this.client.hget('users', id, function(err, data) {
        if (err) {
            return cb(err);
        }
        cb(null, JSON.parse(data));
    });
};

UserDB.prototype.registerUser = function registerUser(id) {
    console.log('Whats your name?');
    var self = this;
    this.rl.once('line', function(line){
        if (line.length <= 0) {
            console.log('Aborted user creation');
            return;
        }
        self.createUser(id, {
            name: line
        });
    });
};

if (require.main === module) {
    var userdb = new UserDB();
    userdb.createUser('1234', {
        name: 'linus'
    });

    userdb.getUser('1235', function(err, user) {
        console.log(user);
    });
}
