const router = require('express').Router();

const { postArticle, getArticles, delArticle } = require('../controllers/articles');
const { postArticleCelebrate, idCelebrate } = require('../celebrates/celebrates');

router.post('/', postArticleCelebrate, postArticle);
router.get('/', getArticles);
router.delete('/:_articleId', idCelebrate, delArticle);

module.exports = router;
