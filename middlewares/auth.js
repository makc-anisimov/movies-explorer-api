require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const AccessDeniedError = require('../errors/access-denied-err');

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    next(new AccessDeniedError('Необходима авторизация'));
    return;
  }

  const jwt = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jsonwebtoken.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    req.user = payload;
    next();
  } catch (e) {
    const err = new AccessDeniedError('Необходима авторизация');
    next(err);
  }
};
module.exports = auth;
