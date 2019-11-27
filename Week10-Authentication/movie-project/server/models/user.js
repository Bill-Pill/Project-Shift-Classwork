const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('../models/movie');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String,
  watchList: [{ type: Movie.MovieSchema }]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

// Create the model class
const ModelClass = mongoose.model('user', UserSchema);

// Export the model
module.exports = ModelClass;
