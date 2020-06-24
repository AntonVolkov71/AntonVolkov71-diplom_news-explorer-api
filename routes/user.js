const router = require('express').Router();
const { idCelebrate } = require('../celebrates/celebrates');

const {
  getUser
} = require('../controllers/user');

router.get('/:_id',idCelebrate, getUser);

module.exports = router;
