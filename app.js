const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const index = require('./routes/index');

require('dotenv').config();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP"
});

const app = express();

app.use(limiter);
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
