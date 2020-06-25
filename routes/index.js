const router = require('express').Router();

const auth = require('../middlewares/auth');
const { signUpCelebrate, signInCelebrate } = require('../celebrates/celebrates');

const {
  postUser, login,
} = require('../controllers/users');

const users = require('./users');
// const cards = require('./cards');
const notFound = require('./notFound');

router.post('/signin', signInCelebrate, login) //signInCelebrate, login);
router.post('/signup', signUpCelebrate, postUser)//signUpCelebrate, postUser);

router.use(auth);

router.use('/users', users);
//router.use('/article', cards);

router.all('*', notFound);

module.exports = router;
