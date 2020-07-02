const NotFoundError = require('../errors/notFoundError');

const notUrlError = require('../errors/textErrors/notUrlError');

const notFound = () => {
  throw new NotFoundError(notUrlError);
};

module.exports = notFound;
