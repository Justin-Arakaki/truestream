const ClientError = require('../middlewares/client-error');
const { subsColumn } = require('../../database/subscriptionsdb-info');
const { servicesColumn } = require('../../database/servicesdb-info');

function getAll(userId, db) {
  const sql = `
    select
      "subs"."${subsColumn.subsId}" as "subsId",
      "subs"."${subsColumn.userId}" as "userId",
      "subs"."${subsColumn.serviceId}" as "serviceId",
      "subs"."${subsColumn.isActive}" as "isActive",
      "subs"."${subsColumn.cost}" as "cost",
      "subs"."${subsColumn.billingCycle}" as "billingCycle",
      "subs"."${subsColumn.cycleStart}" as "cycleStart",
      "serv"."${servicesColumn.serviceName}" as "serviceName",
      "serv"."${servicesColumn.serviceLogo}" as "serviceLogo"
    from "subscriptions" as "subs"
    join "services" as "serv" using ("${servicesColumn.serviceId}")
    where "${subsColumn.userId}" = $1
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
  const varString = createVarString(1, 5);
  const sql = `
    insert into "subscriptions" (
      "${subsColumn.userId}",
      "${subsColumn.serviceId}",
      "${subsColumn.cost}",
      "${subsColumn.billingCycle}",
      "${subsColumn.cycleStart}"
    )
    values (${varString})
    returning *
  `;
  const params = [
    userId,
    reqParams.serviceId,
    reqParams.cost,
    reqParams.billingCycle,
    reqParams.cycleStart
  ];

  return db.query(sql, params)
    .then(result => {
      const subscription = result.rows;
      return subscription;
    });
}

function update(userId, subsId, reqParams, db) {
  const sql = `
    update "subscriptions"
    set
      "${subsColumn.updatedAt}" = now(),
      "${subsColumn.serviceId}" = $3,
      "${subsColumn.isActive}" = $4,
      "${subsColumn.cost}" = $5,
      "${subsColumn.billingCycle}" = $6,
      "${subsColumn.cycleStart}" = $7
    where "${subsColumn.userId}" = $1
    and "${subsColumn.subsId}" = $2
    returning
      "${subsColumn.subsId}" as "subsId",
      "${subsColumn.userId}" as "userId",
      "${subsColumn.serviceId}" as "serviceId",
      "${subsColumn.isActive}" as "isActive",
      "${subsColumn.cost}" as "cost",
      "${subsColumn.billingCycle}" as "billingCycle",
      "${subsColumn.cycleStart}" as "cycleStart",
      "${subsColumn.updatedAt}" as "updatedAt"
  `;
  const params = [
    userId,
    subsId,
    reqParams.serviceId,
    reqParams.isActive,
    reqParams.cost,
    reqParams.billingCycle,
    reqParams.cycleStart
  ];

  return db.query(sql, params)
    .then(result => {
      const subs = result.rows;
      if (!subs) {
        const errorMsg =
          `cannot find subscription with subscriptionId ${subsId}`;
        throw new ClientError(404, errorMsg);
      }
      return subs;
    });
}

function isParamsValid(reqParams, checkArray) {
  const exampleParams = {
    subsId: 3,
    userId: 1,
    serviceId: 203,
    isActive: true,
    cost: 10.99,
    billingCycle: 'monthly',
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

exports.getAll = getAll;
exports.add = add;
exports.update = update;
exports.isParamsValid = isParamsValid;
