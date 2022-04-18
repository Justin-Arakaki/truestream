const argon2 = require('argon2');

const password = 'donut1';

argon2
  .hash(password)
  .then(hashedPassword => {
    console.log(hashedPassword);
  });
