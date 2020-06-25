const router = require('express').Router();

const { postArticle, getArticles, delArticle } = require('../controllers/articles');
const { postArticleCelebrate, idCelebrate } = require('../celebrates/celebrates');

router.post('/', postArticleCelebrate, postArticle); // postCardCelebrate, postCard);
router.get('/', getArticles);
router.delete('/:_articleId', idCelebrate, delArticle);// idCelebrate, deleteCard);

module.exports = router;
