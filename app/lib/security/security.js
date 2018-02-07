'use strict';

//##########################################################################//
// Variables 
// 
//##########################################################################//

const crypto = require('crypto');
const ENCRYPTION_KEY = process.env['ENCRYPTION_KEY'];
const SALT_WORK_FACTOR = 16;


const randomStringGen = (length) =>
  crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);


const saltHashPassword = (password, salt) => {
  return {
    salt,
    passwordHash: crypto.createHmac('sha512', salt).update(password).digest('hex')  /** Hashing algorithm sha512 */
  };
};

const encryptPassword = (password) => {
  if (!password == null || !password == '') {
    return saltHashPassword(password, randomStringGen(SALT_WORK_FACTOR));
  }
}

module.exports.encrypt = (password) => {
  let iv = crypto.randomBytes(SALT_WORK_FACTOR);
  let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

module.exports.decrypt = (password) => {
  let textParts = password.split(':');
  let iv = new Buffer(textParts.shift(), 'hex');
  let encryptedText = new Buffer(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}