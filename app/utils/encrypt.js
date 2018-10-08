const CryptoJS = require('crypto-js');
const _ = require('lodash');

module.exports = {
    getClientPassword(hash) {
        const result = CryptoJS.AES.decrypt(hash, process.env.PUBLIC_KEY);
        return result;
        // return JSON.parse(result.toString(CryptoJS.enc.Utf8));
    }
};
