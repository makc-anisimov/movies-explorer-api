const STATUS_OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const ACCESS_DENIED = 401;
const NOT_FOUND = 404;
const FORBIDDEN = 403;
const CONFLICT = 409;
const INTERNAL_SERVER_ERROR = 500;
const REGEXP_LINK = /^((https?):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
module.exports = {
  STATUS_OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  ACCESS_DENIED,
  FORBIDDEN,
  REGEXP_LINK,
};
