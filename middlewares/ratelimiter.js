const rateLimit = require("express-rate-limit");

const ratelimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP"
});

module.exports = ratelimiter;
