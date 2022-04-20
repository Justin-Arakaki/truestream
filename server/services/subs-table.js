const ClientError = require('../middlewares/client-error');

function getAll(userId, db) {
  const sql = `
    select *
    from "subscriptions"
    where "userId" = $1
    order by "serviceName"
  `;
  const params = [userId];

  return db.query(sql, params)
    .then(result => {
      const subs = result.rows;
      return subs;
    });
}

function add(reqParams, db) {
  const paramNames = [
    'userId',
    'serviceName',
    'cost',
    'billingCycle',
    'cycleStart',
    'photoUrl'
  ];
  const paramValues = paramNames.map(x => reqParams[x]);
  const sql = `
    insert into "subscriptions" ($1, $2, $3, $4, $5, $6)
    values ($7, $8, $9, $10, $11, $12)
    returning *
  `;
  const params = [...paramNames, ...paramValues];

  return db.query(sql, params)
    .then(result => {
      const subscription = result.rows;
      return subscription;
    });
}

function updateIsActive(subscriptionId, isActive, db) {
  const sql = `
    update "subscriptions"
    set
      "updatedAt" = now(),
      "isActive" = $1
    where "subscriptionId" = $2
    returning *
  `;
  const params = [isActive, subscriptionId];

  return db.query(sql, params)
    .then(result => {
      const subs = result.rows;
      if (!subs) {
        const errorMsg =
          `cannot find subscription with subscriptionId ${subscriptionId}`;
        throw new ClientError(404, errorMsg);
      }
      return subs;
    });
}

function checkParams(reqParams, checkArray) {
  const exampleParams = {
    subscriptionId: 4,
    serviceName: 'Netflix',
    isActive: true,
    cost: 10.99,
    billingCycle: 'monthly',
    photoUrl: 'https://cdn.watchmode.com/provider_logos/netflix_100px.png',
    cycleStart: '2022-04-14'
  };
  for (const x of checkArray) {
    if (!reqParams[x] || typeof reqParams[x] !== typeof exampleParams[x]) {
      const errorMsg =
        `${x} (${exampleParams[x]}) is a required field`;
      throw new ClientError(400, errorMsg);
    }
  }
}

exports.getAll = getAll;
exports.add = add;
exports.updateIsActive = updateIsActive;
exports.checkParams = checkParams;
