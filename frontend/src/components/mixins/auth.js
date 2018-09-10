import validator from '../../utils/validator'

export default {
    computed: {
        validateUsername() {
            return validator.username(this.username);
        },
        validateEmail() {
            return validator.email(this.email);
        },
        validatePassword() {
            return validator.password(this.password);
        },
        validateInputs() {
            return (this.validateUsername && this.validateEmail && this.validatePassword)
        }
    },
    methods: {
        updateUsername(val) {
            this.username = val;
        },
        updateEmail(val) {
            this.email = val;
        },
        updatePassword(val) {
            this.password = val;
        }
    }
}
