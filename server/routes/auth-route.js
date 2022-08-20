const express = require('express');
const pgPool = require('../services/pg-pool');
const userTable = require('../services/user-table');

const db = pgPool();
const router = express.Router();

// Add new user
router.post('/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();

  userTable.isParamsValid(lowercaseUsername, password);
  userTable.isUsernameTaken(lowercaseUsername, db)
    .then(() => userTable.add(lowercaseUsername, password, db))
    .then(user => res.status(201).json(user))
    .catch(err => next(err));
});

// Authorize user
router.post('/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  const lowercaseUsername = username.toLowerCase();

  userTable.isParamsValid(lowercaseUsername, password);
  userTable.isPasswordCorrect(lowercaseUsername, password, db)
    .then(user => {
      const payload = { userId: user.userId, lowercaseUsername };
      const token = userTable.createToken(payload);

      res.json({ user: payload, token });
    })
    .catch(err => next(err));
});

module.exports = router;
