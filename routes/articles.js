const router = require('express').Router();

const { postArticle, getArticle, delArticle } = require('../controllers/articles');
// const { postCardCelebrate, idCelebrate } = require('../celebrates/celebrates');

router.get('/', getArticle);
router.post('/', postArticle); // postCardCelebrate, postCard);
router.delete('/:_articleId', delArticle);// idCelebrate, deleteCard);

module.exports = router;
