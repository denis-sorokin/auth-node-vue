<template>
    <div class="register w-100">
        <div class="container">
            <div class="row">
                <div class="col-10 offset-1">
                    <h2 class="font-weight-bold text-company">{{ $t('main.register') }}</h2>
                    <div class="form-group mt-5 wp-max-content mx-auto pr-5">
                        <v-input :data="{
                        name: 'username', label: $t('auth.login'), valid: validateUsername,
                        type: 'text', validFeedback: 'Only chars and numbers', required: true }" @change="updateUsername"/>
                        <v-input :data="{
                        name: 'email', label: $t('auth.email'), valid: validateEmail,
                        type: 'text', validFeedback: 'char.-+char@email.com', required: true }" @change="updateEmail"/>
                        <v-input :data="{
                        name: 'password', label: $t('auth.password'), valid: validatePassword,
                        type: 'password', validFeedback: 'chars and numbers and _.-+', required: true }" @change="updatePassword"/>
                    </div>
                    <button class="btn btn-primary btn-lg mt-5" :disabled="!validateInputs" @click="signUp">{{ $t('auth.signUp') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import auth from '../components/mixins/auth'

    export default {
        name: 'Register',
        mixins: [ auth ],
        data () {
            return {
                email: null,
                password: null,
                username: null
            }
        },
        methods: {
            signUp() {
                this.$store.dispatch('SIGN_UP', { username: this.username, email: this.email, password: this.password })
                    .then(() => {
                        this.$router.push('/');
                    })
            }
        }
    }
</script>
