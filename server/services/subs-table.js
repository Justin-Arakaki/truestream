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

function add(userId, reqParams, db) {
  reqParams.userId = userId;
  const paramNames = [
    'userId',
    'serviceName',
    'cost',
    'billingCycle',
    'cycleStart',
    'photoUrl'
  ];
  const numParams = paramNames.length;
  const params = createParams(paramNames, reqParams);
  const colString = createColString(paramNames);
  const varString = createVarString(1, numParams);
  const sql = `
    insert into "subscriptions" (${colString})
    values (${varString})
    returning *
  `;

  return db.query(sql, params)
    .then(result => {
      const subscription = result.rows;
      return subscription;
    });
}

function update(userId, subscriptionId, reqParams, db) {
  const updateableParams = [
    'serviceName',
    'isActive',
    'cost',
    'billingCycle',
    'cycleStart',
    'photoUrl'
  ];
  const paramNames = updateableParams.filter(x => x in reqParams);
  const params = createParams(paramNames, reqParams);
  const setString = createSetString(paramNames);
  const sql = `
    update "subscriptions"
    set
      "updatedAt" = now(),
      ${setString}
    where "userId" = ${userId}
    and "subscriptionId" = ${subscriptionId}
    returning *
  `;

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

function isParamsValid(reqParams, checkArray) {
  const exampleParams = {
    userId: 3,
    subscriptionId: 4,
    serviceName: 'Netflix',
    isActive: true,
    cost: 10.99,
    billingCycle: 'monthly',
    photoUrl: 'https://cdn.watchmode.com/provider_logos/netflix_100px.png',
    cycleStart: '2022-04-14'
  };
  for (const x of checkArray) {
    if (
      typeof reqParams[x] === 'undefined' ||
      typeof reqParams[x] !== typeof exampleParams[x]
    ) {
      const errorMsg = `${x} (${typeof exampleParams[x]}) is a required field`;
      throw new ClientError(400, errorMsg);
    }
  }
}

// Private Helpers //

function createParams(paramNames, reqParams) {
  const params = paramNames.map(x => reqParams[x]);
  return params;
}

function createVarString(startNum, length) {
  let varString = '';
  for (let i = startNum; i <= length; i++) {
    varString += '$' + i;
    if (i < length) {
      varString += ', ';
    }
  }
  return varString;
}

function createColString(paramNames) {
  const formatted = paramNames.map(x => `"${x}"`);
  const colString = formatted.join(', ');
  return colString;
}

function createSetString(paramNames) {
  const formatted = paramNames.map(x => `"${x}" = $`);
  for (let i = 1; i <= formatted.length; i++) {
    formatted[i - 1] += i;
  }
  const setString = formatted.join(',\n      ');
  return setString;
}

exports.getAll = getAll;
exports.add = add;
exports.isParamsValid = isParamsValid;
exports.update = update;
