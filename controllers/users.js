const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(err);
      } else {
        next(err);
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
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'переданы некорректные данные для обновления профиля' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'переданы некорректные данные для обновления аватара пользователя' }));
};
