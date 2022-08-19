const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('../middlewares/client-error');
const { usersColumn } = require('../../database/usersdb-info');

function isParamsValid(username, password) {
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
}

function isUsernameTaken(username, db) {
  const sql = `
    select 1
    from "users"
    where ${usersColumn.username} = $1
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
        insert into "users" (
          "${usersColumn.username}",
          "${usersColumn.hashedPassword}"
        )
        values ($1, $2)
        returning
          "${usersColumn.userId}" as "userId",
          "${usersColumn.username}" as "username",
          "${usersColumn.createdAt}" as "createdAt"
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
      "${usersColumn.userId}" as "userId",
      "${usersColumn.hashedPassword}" as "hashedPassword"
    from "users"
    where "${usersColumn.username}" = $1
  `;
  const params = [username];
  console.log('isPasswordCorrect', {
    username,
    password,
    param: usersColumn.userId
  });

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
  console.log('createToken', {
    secret: process.env.TOKEN_SECRET,
    payload
  });
  const token = jwt.sign(payload, process, process.env.TOKEN_SECRET);
  return token;
}

exports.isParamsValid = isParamsValid;
exports.isUsernameTaken = isUsernameTaken;
exports.add = add;
exports.isPasswordCorrect = isPasswordCorrect;
exports.createToken = createToken;
