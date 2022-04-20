const subscriptions = require('../server/services/subscriptions');

const checkArray = ['isActive', 'cost', 'serviceName'];
const params = {
  serviceName: 'Netflix',
  cost: true
};

subscriptions.checkSqlParamsIsValid(params, checkArray);
