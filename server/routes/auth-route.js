const express = require('express');
const pgPool = require('../services/pg-pool');
const userTable = require('../services/user-table');

const db = pgPool();
const router = express.Router();

// Add new user
router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;

  userTable.isParamsValid(username, password);
  userTable.isUsernameTaken(username, db)
    .then(() => userTable.add(username, password, db))
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

// Authorize user
router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;

  userTable.isParamsValid(username, password);
  userTable.isPasswordCorrect(username, password, db)
    .then(user => {
      const payload = { userId: user.userId, username };
      const token = userTable.createToken(payload);

      res.json({ user: payload, token });
    })
    .catch(err => next(err));
});

module.exports = router;
