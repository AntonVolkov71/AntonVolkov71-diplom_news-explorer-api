const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config')

const UnathorizedError = require('../errors/unathorizedError');

const auth = (req, res, next) => {
  const errorAuth = () => { throw new UnathorizedError('Необходима авторизация'); };

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) errorAuth();


  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    errorAuth();
  }

  req.user = payload;

  return next();
};

module.exports = auth;
