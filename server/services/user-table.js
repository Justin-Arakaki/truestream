const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('../middlewares/client-error');

function isParamsValid(username, password) {
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
}

function isUsernameTaken(username, db) {
  const sql = `
    select 1
    from "users"
    where "username" = $1
  `;
  const params = [username];

  return db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (user) {
        throw new ClientError(401, 'choose different username');
      }
    });
}

function add(username, password, db) {
  return argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      return user;
    });
}

function isPasswordCorrect(username, password, db) {
  const sql = `
    select
      "userId",
      "hashedPassword"
    from "users"
    where "username" = $1
  `;
  const params = [username];

  return db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      return argon2
        .verify(user.hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          return user;
        });
    });
}

function createToken(payload) {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  return token;
}

exports.isParamsValid = isParamsValid;
exports.isUsernameTaken = isUsernameTaken;
exports.add = add;
exports.isPasswordCorrect = isPasswordCorrect;
exports.createToken = createToken;
