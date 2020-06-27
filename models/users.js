const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UnathorizedError = require('../errors/unathorizedError');
const ExistingUserError = require('../errors/existingUserError');
const existUserError = require('../errors/textErrors/existUserError');
const unAthorError = require('../errors/textErrors/unAthorError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.methods.omitPrivate = function omitPrivate() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.statics.existingUser = function (email) {
  return this.findOne({ email })
    .then((user) => {
      if (user) {
        return Promise.reject(new ExistingUserError(existUserError));
      }
      return null;
    });
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnathorizedError(unAthorError));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnathorizedError(unAthorError));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
