const jwt = require('jsonwebtoken');

const badRequest = 400;
const Unauthorized = 401;

module.exports = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(Unauthorized).send('Ошибка авторизации');

    const authenticated = jwt.verify(token, process.env.JWT_SECRET);
    req.user = authenticated;
    next();
  } catch (error) {
    res.status(badRequest).send('Неверный токен');
  }
};
