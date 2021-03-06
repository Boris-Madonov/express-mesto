const badRequestError = (text) => ({
  message: text,
  statusCode: 400,
});

const unauthorizedError = (text) => ({
  message: text,
  statusCode: 401,
});

const notFoundError = (text) => ({
  message: text,
  statusCode: 404,
});

const conflictError = (text) => ({
  message: text,
  statusCode: 409,
});

module.exports = {
  badRequestError,
  unauthorizedError,
  notFoundError,
  conflictError,
};
