const bcrypt = require('bcryptjs');
const saltRounds = 8;

const plainPassword = 'admin';

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  console.log('Hashed password:', hash);
  // new hash password for admin
});