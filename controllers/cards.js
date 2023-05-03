const Card = require('../models/card');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const Forbidden = require('../errors/Forbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (!card) {
        return next(new BadRequest('Переданы некорректные данные при создании карточки.'));
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.cardDelete = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена.'));
      }
      if (String(card.owner) !== req.user._id) {
        return next(new Forbidden('Нельзя удалять чужие карточки.'));
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        return next(new NotFound('Передан несуществующий _id карточки.'));
      }
      return res.send({ data: like });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (like) {
        return res.send({ data: like });
      }
      return next(new NotFound('Передан несуществующий _id карточки.'));
    })
    .catch(next);
};
