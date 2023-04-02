const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');

app.listen(PORT, () => {
  mongoose.connect('mongodb://localhost:27017/mestodb')
  console.log(`Express started on port ${PORT}`)
})