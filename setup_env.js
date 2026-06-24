const bcrypt = require('bcryptjs');
const fs = require('fs');
const crypto = require('crypto');

const password = '26%3GXwS9!VoiÑ@';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);

const jwtSecret = crypto.randomBytes(64).toString('hex');

const envContent = `\nJWT_SECRET=${jwtSecret}\nADMIN_USERNAME=admin-master\nADMIN_PASSWORD_HASH=${hash}\n`;
fs.appendFileSync('.env', envContent);

console.log('Environment updated with hashed password and secret');
