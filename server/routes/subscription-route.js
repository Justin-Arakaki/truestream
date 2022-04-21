const express = require('express');
const pgPool = require('../services/pg-pool');
const subsTable = require('../services/subs-table');
const authMiddleware = require('../middlewares/auth-middleware');

const db = pgPool();
const router = express.Router();

router.use(authMiddleware);

// Get all users subscriptions
router.get('', (req, res, next) => {
  const { userId } = req.user;

  subsTable.getAll(userId, db)
    .then(subs => res.json(subs))
    .catch(err => next(err));
});

// Add new subscription
router.post('', (req, res, next) => {
  const reqParams = JSON.parse(JSON.stringify(req.body));
  const checked = [
    'serviceName',
    'cost',
    'billingCycle',
    'cycleStart',
    'photoUrl'
  ];
  const { userId } = req.user;

  subsTable.isParamsValid(reqParams, checked);
  subsTable.add(userId, reqParams, db)
    .then(subscription => res.status(201).json(subscription))
    .catch(err => next(err));
});

// Update user's subscription
router.patch('/:subscriptionId', (req, res, next) => {
  const subscriptionId = Number(req.params.subscriptionId);
  const reqParams = JSON.parse(JSON.stringify(req.body));
  const paramNames = Object.keys(reqParams);
  const checked = [...paramNames];
  const { userId } = req.user;

  subsTable.isParamsValid(reqParams, checked);
  subsTable.update(userId, subscriptionId, reqParams, db)
    .then(subs => res.json(subs))
    .catch(err => next(err));
});

module.exports = router;
