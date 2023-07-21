const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const ratelimiter = require('./middlewares/ratelimiter');
const index = require('./routes/index');

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const app = express();

app.use(ratelimiter);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// основной роут
app.use(index);

// Server Setup
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
