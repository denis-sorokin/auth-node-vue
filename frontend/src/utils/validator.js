export default {
    username(value) {
        return /^(\w)+$/.test(value);
    },
    email(value) {
        return /^((\w+(\.|\-|\+)?)(\w+))(\@)(\w+)(\.\w{3})$/.test(value);
    },
    password(value) {
        return /^(\w+(\.|\#|\*|\$|\!|)*)+$/.test(value);
    }
}