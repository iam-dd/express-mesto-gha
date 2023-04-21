const jwt = require('jsonwebtoken');

const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) next(new Unauthorized('Неверный токен'));

    const authenticated = jwt.verify(token, process.env.JWT_SECRET);
    req.user = authenticated;
    next();
  } catch (error) {
    res.status(BadRequest).send('Неверный токен');
  }
};
