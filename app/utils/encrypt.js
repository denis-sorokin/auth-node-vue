const CryptoJS = require("crypto-js");

module.exports = {
    getClientPassword(hash) {
        const result = CryptoJS.AES.decrypt(hash, process.env.PUBLIC_KEY);
        return JSON.parse(result.toString(CryptoJS.enc.Utf8));
    }
};
