const ClientError = require('../middlewares/client-error');
const { servicesColumn } = require('../../database/servicesdb-info');

function getAll(db) {
  const sql = `
    select
      "${servicesColumn.serviceId}" as "serviceId",
      "${servicesColumn.serviceName}" as "serviceName",
      "${servicesColumn.serviceLogo}" as "serviceLogo",
      "${servicesColumn.regions}" as "regions"
    from "services"
    where "${servicesColumn.serviceType}" = 'sub'
    order by "${servicesColumn.serviceName}"
  `;
  const params = [];

  return db.query(sql, params)
    .then(result => {
      const services = result.rows;
      return services;
    });
}

exports.getAll = getAll;
