const express = require('express');
const pgPool = require('../services/pg-pool');
const userTable = require('../services/user-table');

const db = pgPool();
const router = express.Router();

router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  userTable.checkFields(username, password);
  userTable.checkUsernameTaken(username, db)
    .then(() => userTable.addUser(username, password, db))
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  userTable.checkFields(username, password);
  userTable.checkPassword(username, password, db)
    .then(user => {
      const payload = { userId: user.userId, username };
      const token = userTable.createToken(payload);
      res.json({ token, user: payload });
    })
    .catch(err => next(err));
});

module.exports = router;
