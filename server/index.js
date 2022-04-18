require('dotenv/config');
const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const pgPool = require('./services/pg-pool');
const userTable = require('./services/user-table');
const allMiddlewares = require('./middlewares/all-middlewares');
const authMiddleware = require('./middlewares/auth-middleware');
const ClientError = require('./middlewares/client-error');
const errorMiddleware = require('./middlewares/error-middleware');

const db = pgPool();
const app = express();

allMiddlewares(app);

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  userTable.checkFields(username, password);
  userTable.checkUsernameTaken(username, db)
    .then(() => userTable.addUser(username, password, db))
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  userTable.checkFields(username, password);
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.use(authMiddleware); // AUTH HERE

app.use(errorMiddleware); // Must be at end

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
