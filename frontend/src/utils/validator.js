export default {
    username(value) {
        return /^(\w{1,})$/.test(value);
    },
    email(value) {
        return /^((\w+(\.|\-|\+)?)(\w+))(@)(\w+)(\.\w{2,5})$/.test(value);
    },
    password(value) {
        return /^(\w+(\.|\#|\*|\$|\!|)*)+$/.test(value);
    }
}
