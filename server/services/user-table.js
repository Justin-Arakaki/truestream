const ClientError = require('../middlewares/client-error');
const argon2 = require('argon2');

function Checkfields(username, password) {
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
}

function checkUsernameTaken(username, db) {
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

function checkPassword(username, password, db) {
  const sql = `
    select "userId",
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
      return user;
    });
}

function addUser(username, password, db) {
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
    });
}

exports.checkFields = Checkfields;
exports.checkUsernameTaken = checkUsernameTaken;
exports.checkPassword = checkPassword;
exports.addUser = addUser;
