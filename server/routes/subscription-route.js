const express = require('express');
const pgPool = require('../services/pg-pool');
const subsTable = require('../services/subs-table');
const servicesTable = require('../services/services-table');
const authMiddleware = require('../middlewares/auth-middleware');

const db = pgPool();
const router = express.Router();

router.use(authMiddleware);

// Get all user's subscriptions
router.get('', (req, res, next) => {
  const { userId } = req.user;

  subsTable.getAll(userId, db)
    .then(subs => res.json(subs))
    .catch(err => next(err));
});

// Get all possible streaming services
router.get('/services', (req, res, next) => {
  servicesTable.getAll(db)
    .then(services => res.json(services))
    .catch(err => next(err));
});

// Add new subscription
router.post('', (req, res, next) => {
  const reqParams = JSON.parse(JSON.stringify(req.body));
  const checked = [
    'serviceId',
    'cost',
    'billingCycle',
    'cycleStart'
  ];
  const { userId } = req.user;

  subsTable.isParamsValid(reqParams, checked);
  subsTable.add(userId, reqParams, db)
    .then(subscription => res.status(201).json(subscription))
    .catch(err => next(err));
});

// Update user's subscription
router.patch('/:subsId', (req, res, next) => {
  const subsId = Number(req.params.subsId);
  const reqParams = JSON.parse(JSON.stringify(req.body));
  const paramNames = Object.keys(reqParams);
  const checked = [...paramNames];
  const { userId } = req.user;

  subsTable.isParamsValid(reqParams, checked);
  subsTable.update(userId, subsId, reqParams, db)
    .then(subs => res.json(subs))
    .catch(err => next(err));
});
module.exports = router;
