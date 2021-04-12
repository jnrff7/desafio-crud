const crypto = require('crypto');

module.exports = function (password) {
    return crypto.createHash('md5').update(password).digest("hex")
}