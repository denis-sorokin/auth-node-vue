const CryptoJS = require('crypto-js');

module.exports = {
	getDataFront(hash) {
	    let result = null;
	    try {
		    result = CryptoJS.AES.decrypt(hash, process.env.PUBLIC_KEY).toString(CryptoJS.enc.Utf8);
		    return JSON.parse(result);
	    } catch (err) {
            console.error(err)
	    }
    }
};
