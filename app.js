require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const notFound = 404;

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
const { PORT = 3000 } = process.env;

<<<<<<< HEAD
app.use(cookieParser());
=======
app.use(errors());
>>>>>>> 51dbc88a8678c760e305c9c3eb083426f9f64377
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => console.log('Connected')).catch((err) => (console.log(err.message)));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(notFound).send({ message: 'Такой страницы не существует' });
});

app.listen(PORT, () => {
  console.log(`Express started on port ${PORT}`);
});
