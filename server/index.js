require('dotenv/config');
const express = require('express');
const authRoute = require('./routes/auth-route');
const allMiddlewares = require('./middlewares/all-middlewares');
const authMiddleware = require('./middlewares/auth-middleware');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();

allMiddlewares(app);

app.use('/api/auth', authRoute);

app.use(authMiddleware); // AUTH HERE

app.use(errorMiddleware); // Must be at end

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
