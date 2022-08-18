const express = require('express');

const jsonMiddleware = express.json();

function allMiddlewares(app) {
  app.use(jsonMiddleware);
}

module.exports = allMiddlewares;
