require('dotenv/config');
const express = require('express');
const authRoute = require('./routes/auth-route');
const subscriptionRoute = require('./routes/subscription-route');
const allMiddlewares = require('./middlewares/all-middlewares');
const errorMiddleware = require('./middlewares/error-middleware');
const app = express();

allMiddlewares(app);

app.use('/api/auth', authRoute);

app.use('/api/subscriptions', subscriptionRoute);

app.use(errorMiddleware); // Must be at end

let port = process.env.PORT;
if (port === null || port === '') {
  port = 8000;
}
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
