const crypto = require("crypto")

const generateUsername = (email, name) => {
    const normalizedName = name.replace(/\s+/g, '').toLowerCase();
    const emailPrefix = email.split('@')[0].toLowerCase();
    const randomString = crypto.randomBytes(3).toString('hex');
    return `${normalizedName}_${emailPrefix}_${randomString}`;
  };

  module.exports = generateUsername