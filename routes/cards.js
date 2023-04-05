const router = require('express').Router();
const {
  createCard,
  getCards,
  cardDelete,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', cardDelete);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
