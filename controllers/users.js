const User = require('../models/user');

const badRequest = 400;
const notFound = 404;
const internalServerError = 500;

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Ошибка валидации' });
      }
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Ошибка!' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res
        .status(notFound)
        .send({ message: 'Пользователь по указанному _id не найден.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(badRequest)
          .send({ message: 'Некорректный _id пользователя.' });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (user) {
        return res.send({ data: user });
      }
      return res
        .status(notFound)
        .send({ message: 'Пользователь с указанным _id не найден.' });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(badRequest)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((updateAvatar) => res.send({ data: updateAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(badRequest)
          .send({
            message: 'Переданы некорректные данные при создании карточки.',
          });
      }
      return res
        .status(internalServerError)
        .send({ message: 'Что-то пошло не так...' });
    });
};
