const { celebrate, Joi } = require('celebrate');

const weburl = new RegExp(/^https?:\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([A-z][A-z0-9.-]+\.[A-z.]{2,}))([A-z0-9/-]+\u0023?)?(:\d{2,5})?/);

const signUpCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signInCelebrate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const postArticleCelebrate = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().regex(weburl).error(new Error('Bad URL')),
    image: Joi.string().regex(weburl).error(new Error('Bad URL')),
  }),
});

const idCelebrate = celebrate({
  params: Joi.object().keys({
    _articleId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  signUpCelebrate, signInCelebrate, postArticleCelebrate, idCelebrate,
};
