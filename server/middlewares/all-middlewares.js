const express = require('express');
const staticMiddleware = require('./static-middleware');

const jsonMiddleware = express.json();

function allMiddlewares(app) {
  app.use(jsonMiddleware);
  app.use(staticMiddleware);
}

module.exports = allMiddlewares;
