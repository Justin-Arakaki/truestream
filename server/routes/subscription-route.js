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
    .then(subs => res.status(200).json(subs))
    .catch(err => next(err));
});

// Add new subscription
router.post('', (req, res, next) => {
  const reqParams = req.body;
  const checked = [
    'serviceName',
    'isActive',
    'cost',
    'billingCycle',
    'cycleStart'
  ];

  subsTable.checkReqParamsIsValid(reqParams, checked);
  subsTable.add(reqParams, db)
    .then(subscription => res.status(201).json(subscription))
    .catch(err => next(err));
});

// Update subscription
router.patch('/:subscriptionId', (req, res, next) => {
  const subscriptionId = Number(req.params.subscriptionId);
  const { isActive } = req.body;
  const params = {
    subscriptionId: subscriptionId,
    isActive: isActive
  };
  const checked = ['subscriptionId', 'isActive'];

  subsTable.checkParams(params, checked);
  subsTable.updateIsActive(subscriptionId, isActive, db)
    .then(subs => res.json(subs))
    .catch(err => next(err));
});

module.exports = router;
