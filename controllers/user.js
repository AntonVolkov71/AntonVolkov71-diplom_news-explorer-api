const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');
const { JWT_SECRET } = require('../config')

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const getUser = (req, res, next) => {
  const validId = mongoose.Types.ObjectId.isValid(req.params._id);

  if (validId) {
    return User.findById(req.params._id)
      .then((user) => (user ? res.send({ data: user }) : Promise.reject(new NotFoundError('Пользователь не найден'))))
      .catch(next);
  }

  const error = new BadRequestError('Невалидный id');

  return next(error);
};

const postUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return User.existingUser(email)
    .then(() => bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((user) => res.status(201).send({
        data: user.omitPrivate(),
      })))
    .catch((err) => {
      let error = err;
      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError(err.message);
      }
      return next(error);
    });
};

const login = (req, res, next) => {

  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser, postUser, login
};
