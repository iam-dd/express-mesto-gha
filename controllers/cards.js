const Card = require('../models/card');

const badRequest = 400;
const notFound = 404;
const internalServerError = 500;


module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(badRequest).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res
      .status(internalServerError)
      .send({ message: 'Что-то пошло не так...' }));
};

module.exports.cardDelete = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        return card.remove().then(() => res.status(200).send({ data: card })).catch(next);
      }
      return res
        .status(notFound)
        .send({ message: 'Карточка с указанным _id не найдена.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(badRequest)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        return res
          .status(notFound)
          .send({ message: 'Передан несуществующий _id карточки.' });
      }
      return res.send({ data: like });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(badRequest).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (like) {
        return res.send({ data: like });
      }
      return res
        .status(notFound)
        .send({ message: 'Передан несуществующий _id карточки.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(badRequest).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};
