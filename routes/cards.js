const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const {
  createCard,
  getCards,
  cardDelete,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegExp),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  cardDelete,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().required().hex().length(24),
    }),
  }),
  dislikeCard,
);

module.exports = router;
