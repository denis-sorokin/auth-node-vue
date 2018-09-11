import AES from 'crypto-js/aes';
import config from '../config';

export default {
    encryptAes(data) {
        return AES.encrypt(JSON.stringify(data), config.PUBLIC_KEY).toString();
    }
}
