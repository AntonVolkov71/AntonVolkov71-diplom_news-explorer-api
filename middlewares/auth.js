const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const UnathorizedError = require('../errors/unathorizedError');
const authError = require('../errors/textErrors/authError');

const auth = (req, res, next) => {
  const errorAuth = () => { throw new UnathorizedError(authError); };

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
