const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signUpCelebrate, signInCelebrate } = require('../celebrates/celebrates');

const {
  postUser, login,
} = require('../controllers/users');

const users = require('./users');
const articles = require('./articles');
const notFound = require('./notFound');

router.post('/signin', signInCelebrate, login); // signInCelebrate, login);
router.post('/signup', signUpCelebrate, postUser);// signUpCelebrate, postUser);

router.use(auth);

router.use('/users', users);
router.use('/articles', articles);

router.all('*', notFound);

module.exports = router;
