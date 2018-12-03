const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';
// next will read it from process.env when hosted
module.exports = {
  // Nodejs encryption with CTR
  encrypt(pass) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(pass, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt(pass) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(pass, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  },
};