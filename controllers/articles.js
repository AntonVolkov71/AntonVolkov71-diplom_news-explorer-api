const mongoose = require('mongoose');

const Article = require('../models/articles');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const notArticlesError = require('../errors/textErrors/notArticlesError');
const nullArticleError = require('../errors/textErrors/nullArticleError');

const postArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  const { _id } = req.user;

  return Article.create({
    keyword, title, text, date, source, link, image, owner: _id,
  })
    .then((article) => {
      res.send({ data: article.omitPrivate() });
    })
    .catch((err) => {
      let error = err;

      if (error instanceof mongoose.Error.ValidationError) {
        error = new BadRequestError(err.message);
      }
      return next(error);
    });
};

const getArticles = (req, res, next) => {
  const { _id } = req.user;

  return Article.find({ owner: _id })
    .then((articles) => (articles.length
      ? res.send({ data: articles })
      : Promise.reject(new NotFoundError(notArticlesError))))
    .catch(next);
};

const delArticle = (req, res, next) => {
  const { _id } = req.user;

  const { _articleId } = req.params;

  return Article.find({ owner: _id, _id: _articleId })
    .then((article) => (article[0]
      ? Article.deleteOne(article[0]).then(res.send({ data: article[0] }))
      : Promise.reject(new NotFoundError(nullArticleError))))
    .catch(next);
};

module.exports = { postArticle, getArticles, delArticle };
