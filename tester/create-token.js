require('dotenv/config');
const jwt = require('jsonwebtoken');

const payload = {
  userId: 0,
  username: 'donut',
  password: 'donut1'
};

const token = jwt.sign(payload, process.env.TOKEN_SECRET);

console.log(token);
